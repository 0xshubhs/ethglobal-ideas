# 09 Reserve Gate: build guide

Rank 9 of 10 (revised; judge average 6.00, projected 7.0 if CRE reads forks; P(demo) 55%). Source design: `track_ideas/finalist_ideas.md` section 3.9, `track_ideas/ideas/1inch.md` rank 2, `track_ideas/ideas/chainlink.md` sections 1 and 9, `track_ideas/finalist_judges/feasibility.md` candidate 5. Read `00_common.md` first; the 1inch fork harness is the same as in `06_greenshoe.md` sections 3 to 4.

## 1. Summary, promise, prize stack

**Summary.** On L2s, bridged liquid staking tokens are claims on an escrow on Ethereum. When Kelp's adapter released 116,500 rsETH in April, the L2 copies kept their exchange rate and their market price while the escrow behind them fell to about 26% of what was outstanding. Reserve Gate is an Aqua maker on Arbitrum whose SwapVM program refuses to buy any token whose **backing** (escrow balance against L2 supply, posted by a Chainlink CRE workflow) falls below the maker's floor or is stale. The demo puts three makers built from the same pricing code side by side: rate-pegged, price-anchored, and Reserve Gate. Only the backing check refuses.

**Falsifiable promise.** "Replay a Kelp-sized escrow release on an Ethereum fork, post the backing to an Arbitrum fork, and let any holder of the bridged token sell into three makers built from the same pricing code: a rate-pegged one fills in full, a price-anchored one fills in full because neither the rate nor the price moved, and Reserve Gate pays not one wei, while an honest wstETH sale into Reserve Gate still fills."

**Prize stack (two partner picks).**

| Prize | Verbatim requirement (Facts) | How this build meets it |
|---|---|---|
| 1inch "Build an Aqua App" ($2,500 / $1,500 / $1,000) | as in `06_greenshoe.md` section 1 ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)) | One ETH balance making markets in several LSTs, each with its own backing floor; appended instructions on a redeployed router pointed at the official Aqua on an Arbitrum fork; WETH, rsETH and wstETH transfers on the fork |
| Chainlink "Best workflow with CRE" ($1,500, one winner) | "Build, simulate, or deploy a CRE Workflow that's used as an orchestration layer within your project"; "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent"; "Demonstrate a successful simulation (via the CRE CLI) or a live deployment on the CRE network"; "Be meaningfully used in your project"; "It is NOT mandatory to deploy it during the hackathon, simulation is enough!" ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink), via `ideas/chainlink.md` section 1) | The workflow reads the escrow on Ethereum, L2 supply, and the LayerZero message status API, computes backing, and writes the report to the receiver the maker reads. Past CRE winners made the workflow's report the only key that moves value (`ideas/chainlink.md` section 1); here it is the only thing that can raise backing above the floor |

Judgement: combo 7, rated "Sound" by the checker. If CRE cannot read a local fork by hour 2, enter 1inch alone and spend the CRE hours on the fuzz property and the video.

## 2. Architecture

```
  Ethereum mainnet fork (saved)                      Arbitrum mainnet fork (saved)
    rsETH adapter (escrow)  <- synthetic release        official Aqua + redeployed AquaSwapVMRouter
       impersonated to match Galaxy's figures           three makers, same pricing code:
                                                          A: RateCurve                     (rate-pegged)
  [CRE workflow, simulated by the CRE CLI]                B: RateCurve + PriceAnchor       (Ballast shape)
    reads: adapter balance (Ethereum fork RPC)            C: RateCurve + BackingFloor      (Reserve Gate)
           L2 supplies at pinned blocks                 BackingReceiver: (backingBps, updatedAt) per token,
           LayerZero message status API (cached, timestamped)   writable only by the CRE forwarder
    computes backing per token                         holder sells 500 rsETH into A, B, C; 1 wstETH into C
    writes report -> BackingReceiver on the Arbitrum fork
```

**Instructions in plain English.**
- **RateCurve:** quotes the token at its own onchain exchange rate times a maker spread, clamped to a maker-set share of the shared ETH balance. Written by the team, because `OraclePriceAdjuster` is not in the Aqua router's opcode set (`ideas/1inch.md` section 1).
- **PriceAnchor (comparator B):** refuses when the market price feed deviates from the rate by more than a threshold. In April neither moved, so it fills; that is the point of the comparison.
- **BackingFloor (Reserve Gate):** reads `(backingBps, updatedAt)` for the token from the receiver; refuses when backing is below the maker's floor or the reading is older than the maker's maximum age.
- **Supply-velocity check:** cut in the revision; mention only as future work.
- **Fallback without a redeploy:** the same logic as one `Extruction` target on the deployed router.

**Who the actor is (say it right).** The attacker held L1 rsETH. The people selling into an L2 maker are L2 holders whose tokens lost backing. Reserve Gate protects L2 makers from L2 holders, not from the attacker (`ideas/1inch.md` judge note).

## 3. Repo layout and scaffold

```
reserve-gate/
  contracts/   RateCurve, PriceAnchor, BackingFloor, router build, BackingReceiver, tests, fuzz
  workflow/    CRE workflow project (TypeScript SDK), config for fork RPCs, simulation script
  packages/encoder/   program encoder with byte parity
  app/         three-maker replay page, backing gauge
  fixtures/    Ethereum and Arbitrum fork states, cached LayerZero response with timestamp, report bytes and hash
```

At 21:00: the 1inch harness as in `06_greenshoe.md` section 3; `npm i @chainlink/cre-sdk@1.23.0` in `workflow/`; install the CRE CLI (the dossier lists CLI 1.39.0; pin what Chainlink recommends, Chainlink question 4) (verify).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Kelp figures | "The adapter then released 116,500 rsETH to the attacker's address on the Ethereum L1 in a single transaction"; the adapter holds 40,373 rsETH against 152,577 rsETH outstanding on L2s; "Mainnet rsETH is not directly affected by the adapter shortfall" | Fact ([Galaxy Research](https://www.galaxy.com/insights/research/kelpdao-layerzero-exploit-defi)); 40,373 / 152,577 is about 26.5% (our arithmetic) |
| Loss size | Kelp, 18 Apr 2026, about $292M | Fact ([CoinDesk](https://www.coindesk.com/tech/2026/04/19/2026-s-biggest-crypto-exploit-kelp-dao-hit-for-usd292-million-with-wrapped-ether-stranded-across-20-chains)) |
| Aqua | official Aqua and router on Arbitrum at the addresses in `06_greenshoe.md` section 4 | Fact |
| CRE | `@chainlink/cre-sdk` 1.23.0; simulation via the CRE CLI is enough | Fact (npm; prize text) |
| CRE against forks | whether `cre workflow simulate` accepts a localhost RPC | **Unknown: the hour 2 gate** |
| Addresses | rsETH adapter on Ethereum, rsETH on Arbitrum, its rate getter, wstETH bridge escrow and L2 token, the price feed for comparator B | (verify) on day one from official docs |
| LayerZero | message status API for the release's message trail | (verify) endpoint; cache the response with its timestamp |

## 5. Core algorithms in plain English

**Synthetic release (Ethereum fork).** Impersonate the adapter's owner path (or the adapter itself) and move rsETH out until the adapter's balance equals Galaxy's 40,373 figure; record the block. The README says this is a synthetic release on real contracts, not Kelp's transaction (unless the April blocks replay on an archive RPC).

**Workflow.** Read the adapter balance at the pinned Ethereum fork block; read L2 supplies at pinned blocks for the configured chains (Arbitrum fork plus the others in the config); read and cache the LayerZero status response; compute backing in basis points; encode the report; write it through the forwarder to the receiver on the Arbitrum fork. The posted report's hash equals the simulation output's hash, and the README shows both.

**Three-way sale.** From one holder on the Arbitrum fork: sell 500 rsETH into A, B and C; A and B fill in full; C reverts with "backing below floor" (2,646 against a floor of 9,800 basis points); then sell 1 wstETH into C, which fills.

**Fuzz property.** For any release sequence that drops backing below the floor, maker ETH out of C equals zero; for any stale reading, C refuses; every quote equals its swap.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | **CRE against a local fork** (hour 2) | `cre workflow simulate` reads `eth_blockNumber` and one balance from a local Anvil RPC | B |
| M2 | Real adapter balance on an Ethereum fork and L2 supply on an Arbitrum fork | both printed with blocks | A |
| M3 | 1inch harness on the Arbitrum fork (router redeployed, official Aqua, one fill) | tokens move | A |
| **Gate 1, Fri 01:00** | M1 to M3 | CRE gate passed (else enter 1inch alone: section 7) | A, B |
| M4 | RateCurve, PriceAnchor, BackingFloor and the receiver | unit tests per instruction; receiver accepts only the forwarder | A |
| M5 | Synthetic release and workflow end to end | receiver shows backing 26.5% for rsETH; report hash equals simulation hash | B |
| **Spine, Fri 09:00** | three-way sale | A and B fill; C reverts; wstETH fills on C | A, B |
| M6 | Fuzz property and CoreInvariants | pass; counts in README | A |
| M7 | Replay page | three columns and a timeline a judge reads in five seconds | C |
| M8 | Cached LayerZero response with timestamp shown as a freshness input | visible in the workflow output and the UI | B |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M9 | README, CRE evidence (simulation logs, report bytes, hash), video | checklist done | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 23:00 | Fork states; M2 | **M1 CRE gate by 23:00** | Replay page layout on fixtures |
| 23:00 to 01:00 | M3 | Workflow skeleton or, if M1 failed, the keeper fallback | Backing gauge |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M4 | M5 | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | Three makers shipped | Sleep 07:30 to 11:30 | Page wired to forks |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M6 | (from 11:30) M8 | Timeline animation, demo mode |
| 12:00 to 16:00 | Sleep (fuzz running) | Simulation evidence capture | Rehearsal prep |
| 16:00 to 18:00 | Fuzz results | README CRE section | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 onward | as in `00_common.md` section 2 | | |

**Pivot rule.** CRE cannot target forks: a keeper posts the simulation's exact report bytes, with the hash in the README; or drop Chainlink and enter 1inch alone. Appended opcodes refused: one `Extruction` target. Archive RPC slow: cache state Thursday night. If the whole idea stalls: **Standing Repo** (`ideas/1inch.md` rank 4) on the same harness. **Cut order:** LayerZero input, then wstETH escrow reading (hard-code from a pinned read, stated), never the three-way split.

## 8. Pre-event checklist

- [ ] Read Galaxy's Kelp write-up end to end; note every figure and that they "don't fully reconcile".
- [ ] Find the rsETH adapter, the Arbitrum rsETH token and rate getter, the wstETH escrow and the price feed (research only).
- [ ] Ethereum and Arbitrum archive RPC keys.
- [ ] Install the CRE CLI and read the TypeScript SDK docs; do not write the workflow.
- [ ] Chainlink Discord and booth (no workshop): is `cre workflow simulate --broadcast` enough evidence, and can a workflow read a fork RPC (`ideas/chainlink.md` section 9, item 4; `workshop_questions.md` 4.11).
- [ ] 1inch 17:30 Room 2: appended opcodes, instructions that read another contract's getter (questions 1, 2, 5).
- [ ] Prepare the "why not Proof of Reserve feeds?" answer.
- [ ] Not allowed before 21:00: instructions, workflow, receiver.

## 9. Test plan

- **Unit:** each instruction; receiver access control; stale reading refused.
- **Fork tests:** three-way sale on the saved states; wstETH fill.
- **Fuzz and CoreInvariants** as in section 5.
- **Fixtures:** both fork states, the release block, the report bytes and hash, the cached LayerZero response with timestamp.

## 10. Demo

**20 second hook (C).** "In April the token's price said 1:1 and its exchange rate said 1:1. The vault behind it held 26 cents on the dollar. Three market makers, same code, one check different: two paid out, one refused."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | One line: price 1:1, rate 1:1, backing 26%; the actor named correctly: L2 holders selling | slide |
| 0:15 | Three columns on the Arbitrum fork with official Aqua: rate-pegged, price-anchored, Reserve Gate | screenshot |
| 0:30 | **The moment:** the release replays to Galaxy's figures; the workflow writes "backing 26.5%"; a holder sells 500 into all three; two fill, Reserve Gate reverts; then 1 wstETH fills on Reserve Gate. Lands by 0:45 | recording |
| 1:40 | The fuzz property; the posted report hash equals the simulation output | slide |
| 2:30 | Limits: a synthetic release on real contracts, not Kelp's transaction | slide |

Say "backing" throughout, never "coverage".

**Video (2:00 to 2:59).** Same, with the CRE simulation log on screen for 10 seconds.

## 11. README draft

Order: promise; three-column screenshot; quick start (load both states, run the workflow simulation, run the sale script); how it works; the instructions with permalinks and opcode numbers; the swap-vm tag; **Chainlink CRE section** (what the workflow reads, the external API, the simulation command and log, the report hash, the receiver's access control; why not Proof of Reserve feeds: no feed publishes per-L2 backing against an escrow); tests and counts; prior art (coldcascade, Solvent, Ballast, Wamia, Canary, RateSpace, Aquawrap) with the one-sentence difference; limits; AI usage; licence.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Replay page | A timeline across the top (release on Ethereum, workflow posts backing, holder sells) and three columns below, one per maker, each with ETH balance before and after and the outcome chip (Paid out / Refused) | each step can be stepped with a key in demo mode |
| Backing gauge | rsETH backing 26.5% against a floor of 98%, last updated time, source chain blocks | stale reading: grey with "too old" |
| Maker detail | The program's instructions in plain words, the floor and maximum age | |

Copy: "backing", "paid out", "refused"; acronyms (LST, CRE, OFT) only in the technical drawer.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| CRE cannot read forks | M1 at hour 2 | keeper posts the exact report bytes with the hash, or 1inch alone |
| L2 supply list too long | M5 | pinned reads for the configured chains, Galaxy's total as a cross-check, stated |
| LayerZero API down on venue Wi-Fi | demo | cached response with timestamp |
| Appended opcodes refused | 1inch answer | one `Extruction` |
| Archive RPC slow | Thursday night | cache states early |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Why not Proof of Reserve feeds?" | No feed publishes per-L2 backing against a bridge escrow; the workflow computes it from the escrow and the supplies | CRE section |
| "Who was the attacker here?" | The attacker held L1 rsETH; the sellers into an L2 maker are L2 holders whose tokens lost backing | slide |
| "A price-depeg guard would catch it." | The price did not move in April; column B is that guard, and it paid out | column B |
| "Is the release real?" | Synthetic, on the real contracts, to Galaxy's figures; we say so | limits |
| "What if the workflow is down?" | Stale readings are refused, so the maker stops buying rather than buying blind | stale state |
| "Can a holder front-run the update?" | Until the report lands the maker quotes on the last reading within the maximum age; the age is the maker's choice | maker detail |
| "Why SwapVM?" | The refusal lives in the program bytes, not in an off-chain bot | instruction list |
| "Does wstETH ever get refused?" | Only if its escrow stops backing it; here it is fully backed and fills | wstETH fill |

## 15. AI usage

Follow `00_common.md` section 8. A writes the instructions and the receiver by hand; AI may help with the workflow boilerplate and the replay page.
