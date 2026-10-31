# 06 Greenshoe: build guide

Rank 6 of 10 (revised; judge average 6.67, projected 7.0; P(demo) 50% to 60%). Source design: `track_ideas/finalist_ideas.md` section 3.6, `track_ideas/ideas/1inch.md` rank 1, `track_ideas/finalist_judges/feasibility.md` candidate 4. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** In an IPO the underwriter sells about 15% more shares than offered; if the price falls below the offer price it buys shares back with that cash, and if the price rises it takes the extra shares from the issuer. Greenshoe does this for a token launched through Uniswap's Continuous Clearing Auction (CCA), with one Aqua strategy shipped from the issuer's wallet: overallotment tokens are offered only at 103% of the auction's own clearing price, every USDC they raise joins a stabilisation bid at 97% of it, and the whole thing expires on a date fixed at ship time. Disclosed, time-boxed, and every parameter is in the program bytes.

**Falsifiable promise.** "For 30 days after a Uniswap CCA graduates, while the bid budget lasts, nobody can sell the token into the issuer's book below 97% of the clearing price or buy the issuer's tokens below 103% of it. Every USDC paid out arrives in the same transaction as the tokens, the budget grows by exactly what the overallotment raised, and after day 30 the strategy quotes zero on both sides."

**Prize stack (two partner picks).**

| Prize | Verbatim requirement (Facts) | How this build meets it |
|---|---|---|
| 1inch "Build an Aqua App" ($2,500 / $1,500 / $1,000) | "Create a custom Aqua app that implements a sophisticated DeFi position. If you use SwapVM, you may modify SwapVM opcodes and define your own instructions. The final positions must be demonstrated through tests scripts or a UI."; "Projects that utilize SwapVM will be scored higher"; "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)"; "Onchain execution of token transfers should be presented during the final demo (local forks are ok)"; "Proper Git commit history (no single-commit entries on the final day)" ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)) | Three instructions appended to a redeployed `AquaSwapVMRouter`, pointed at the official Aqua on a Base fork; fills move USDC and the token on the fork; Foundry tests plus a two-page UI |
| Uniswap Foundation "Build with Uniswap" | scope includes "CCA"; FEEDBACK.md plus the feedback form; README points to contracts and lines ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)) | The CCA's clearing price is the anchor and the dump happens in the LBPStrategy-seeded v4 pool. Judgement: Uniswap centrality is moderate; expect 3rd or 4th there |

Judgement: combo 1 in `track_combos.md`, rated "Sound" by the checker; no mainnet fill.

## 2. Architecture

```
  Base mainnet fork (saved state after the CCA graduated)
    CCA factory v2.1.0 -> auction -> graduates at clearing price P -> LBPStrategy seeds a v4 pool
                                         |
                                         | clearingPrice() read once, pinned on first swap
                                         v
    issuer wallet (EOA until 1inch confirms a Safe may be the maker)
      ships ONE Aqua strategy through the redeployed AquaSwapVMRouter:
        [ClearingAnchor]  pin P from the graduated auction
        [StabilisationWindow]  refuse after endTs; refuse once bid spend exceeds the cap
        [GreenshoeBand]  sell tokens at 1.03 P (overallotment side), buy tokens at 0.97 P (bid side),
                         clamp to per-block cap and to the strategy's balances
      official Aqua holds the strategy's balances (DynamicBalances): USDC from overallotment sales
      is the same balance the bid spends
    scripted arbitrage taker: buys on the v4 pool when cheap, sells into the 0.97 P bid
  UI: issuer page (ship, budget, fills) and public page (band chart, remaining defence, days left)
```

**Instructions in plain English.**
- **ClearingAnchor:** reads the named auction's `clearingPrice()` only when `isGraduated()` is true and the current block is past `endBlock()`, and stores it on the first swap (SwapVM allows writes only in swaps), so later reads use the pinned value and the "Callers MUST ensure that the latest checkpoint is up to date" warning cannot bite ([IContinuousClearingAuction.sol](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IContinuousClearingAuction.sol)).
- **GreenshoeBand:** for exact-in token sells into the book, pays `amountIn * 0.97 P`; for exact-in USDC buys from the book, delivers `amountIn / (1.03 P)`; nothing fills between the lines; both sides clamp to a per-block cap and to the strategy's balance.
- **StabilisationWindow:** quotes zero and reverts with a named "window closed" error after `endTs`; stops the bid side once cumulative bid spend reaches its cap.
- **Fallback without a redeploy:** the same logic as one `Extruction` target on the deployed router (Wamia's pattern, `ideas/1inch.md` section 1).

## 3. Repo layout and scaffold

```
greenshoe/
  contracts/
    lib/          aqua, swap-vm (pinned to the tag matching the deployed router), continuous-clearing-auction, v4-core, v4-periphery
    src/          the three instructions, a router build with them appended, a launch script
    test/         fork tests, CoreInvariants run, fuzz property
  packages/encoder/   TypeScript program encoder with a byte-parity test against Solidity
  app/            issuer page, public page
  fixtures/       graduated-auction fork state, taker script output
  FEEDBACK.md
```

At 21:00: common scaffold, then `forge install 1inch/aqua 1inch/swap-vm Uniswap/continuous-clearing-auction Uniswap/v4-core Uniswap/v4-periphery` pinned (which swap-vm tag matches the deployed build is 1inch question 2).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Aqua and router | Aqua `0x1111113ccf1426a8e30e2bff5e005d929bf6a90a`, SwapVM router `0x111111338c5091e8440b67b168bae16a668ac0de`, same address on 17 chains incl. Base and Arbitrum; no testnet | Fact ([aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md)) |
| Router A opcodes | `AquaSwapVMRouter` lists `Salt`, `Deadline`, `Jump`, `JumpIfDirection`, taker and tx-origin guards, `Extruction`, `DynamicBalances`, `XYCSwap`, `XYCConcentrateSwap`, `PeggedSwap`, `FeeFlatIn`, `FeeProtocol`, `RequireMinRate`, `Decay`; "0xd0..0xef is unallocated and 0xf0..0xff reserved"; `Context` exposes `orderHash`, `maker`, `taker`, `tokenIn`, `tokenOut`, `isExactIn`; "Given the same chain state and inputs, `quote` returns exactly what `swap` executes." | Fact ([swap-vm DESCRIPTION.md](https://github.com/1inch/swap-vm/blob/main/docs/DESCRIPTION.md), HEAD docs; deployed build is older) |
| CCA | Factory v2.1.0 `0x000000001F26a0044BaA66024e7b6599c61963F8` on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain, Sepolia; LiquidityLauncher v3.2.0 `0x0000FffFBE8efE702c8703aE3477FF5dE3d319C0`; LBPStrategy v3.3.0 per chain | Fact ([Liquidity Launchpad deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)); Base LBPStrategy address (verify) |
| CCA getters | `clearingPrice()`, `isGraduated()`, `endBlock()`; no getter returns total tokens cleared; price encoding (verify Q96) | Fact (interface file) |
| Evidence | SwapVM `CoreInvariants` (monotonicity, additivity, rounding favours the maker, balance sufficiency) | Fact (`ideas/1inch.md` section 1) |
| Base archive RPC | for the fork | (verify) |

## 5. Core algorithms and properties

**Launch sequence (fork, run once on Friday morning, then `--dump-state`).** Create a token; create a CCA through the factory with a short block schedule; place bids from three funded accounts; roll blocks to the end; graduate; let the LBPStrategy seed the v4 pool; read and record P. Then the issuer ships the Greenshoe strategy with the overallotment tokens (15% of the auction supply) and zero USDC; run a buyer rush through the 1.03 P side so the budget fills. Dump this state.

**Taker script.** Whale sells 5% of supply into the v4 pool; while the pool price is below 0.97 P, the taker buys from the pool and sells into the Aqua bid; print each fill with price, tokens in, USDC out, and remaining defence. Then run until the budget is spent and show the band stop holding. Then warp 31 days and repeat: zero quote, revert.

**Fuzz property.** For any sequence of fills, USDC out of the strategy never exceeds 0.97 P times tokens in, no token leaves below 1.03 P, total USDC paid out never exceeds total USDC raised by the overallotment side, and every quote equals its swap.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Base fork harness: official Aqua, router redeployed from the matching tag with one appended no-op instruction | a fill through the redeployed router moves tokens; no official opcode index moved (test compares the opcode table) | A |
| M2 | CCA on the fork | auction created through the factory, graduated, non-zero `clearingPrice()` read | B |
| **Gate 1, Fri 01:00** | M1 and M2 | both pass; if M2 fails, deploy the CCA from the public factory code on an Ethereum fork; if still failing, pivot (section 7) | A, B |
| M3 | Encoder with byte parity | TypeScript and Solidity produce identical program bytes for the same terms | B |
| M4 | ClearingAnchor, GreenshoeBand, StabilisationWindow | unit tests per instruction, including the pin-on-first-swap and the window close | A |
| M5 | Launch sequence and `--dump-state` | `fixtures/graduated.json` loads and shows P and the seeded pool | B |
| **Spine, Fri 09:00** | taker script prints fills on the 0.97 P line from the saved state | demo moment runs from the CLI | A, B |
| M6 | CoreInvariants and the fuzz property | both pass; counts in README | A |
| M7 | Issuer and public pages | band chart with fills, remaining defence, days left | C |
| M8 | Budget run-out and day-31 beats | both print as promised | A |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M9 | FEEDBACK.md, Uniswap form, README with lines, video | checklist done | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 01:00 | M1 router harness | M2 CCA on the fork | Band chart and pages on fixtures |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M4 instructions | M3 encoder | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M4 tests | Sleep 07:30 to 11:30 (M5 first thing after waking) | Pages wired to fork RPC |
| **Fri 09:00** | **Spine** (use a partial launch state if M5 is not done) | | |
| 09:00 to 12:00 | Taker script | (from 11:30) **M5 launch and dump state** | Issuer page ship flow |
| 12:00 to 16:00 | Sleep (start fuzz run first) | M8 beats | Demo mode |
| 16:00 to 18:00 | M6 | Rehearse the taker output | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | README instruction table and opcode proof | FEEDBACK.md | Copy pass |
| **Sat 00:00** | **Freeze**; final state dumps | | |
| 00:00 to 09:00 | as in `00_common.md` section 2 | | |

**Pivot rule.** If 1inch rejects appended opcodes: one `Extruction` target on the deployed router. If 1inch rejects a contract maker: the issuer's EOA (already the default). If both the CCA and the router fail by Fri 01:00: pivot to **Replica** (`ideas/1inch.md` rank 3) on the same harness. **Cut order:** the Uniswap prize files last; first cut the issuer page (keep the public page), then the day-31 beat (keep it as a test).

## 8. Pre-event checklist

- [ ] Read swap-vm DESCRIPTION.md, the Aqua README, the CCA technical documentation and LBPStrategy.
- [ ] Base archive RPC key; check forking speed from home.
- [ ] 1inch Discord, then 17:30 Room 2 (A attends; B takes World only if no World idea is in play): questions 1, 2, 4, 5 in `ideas/1inch.md` section 8.
- [ ] Uniswap 16:30 Room 1: is reading the CCA price and defending its v4 pool central enough?
- [ ] Prepare the manipulation answer (section 14) in one sentence.
- [ ] Not allowed before 21:00: instructions, encoder, launch script.

## 9. Test plan

- **Unit:** each instruction; anchor pins once; window closes; per-block cap; balance clamp.
- **CoreInvariants** on the composed program; the fuzz property in section 5.
- **Fork tests** against the real factory and official Aqua; opcode table unchanged.
- **Fixtures:** `graduated.json`, the taker output, the run-out and day-31 outputs.

## 10. Demo

**20 second hook (C).** "This is disclosed, time-boxed price support: the same rule regulated IPOs use, called a greenshoe. Watch a whale dump 5% of supply. Every fill lands exactly on the line, paid for by the launch's own buyers, and the cash never left the issuer's wallet."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | The manipulation answer first: disclosed, time-boxed, every parameter in the program bytes | none |
| 0:15 | **The moment:** saved Base fork state after graduation; the whale dumps 5%; the taker's fills print on the 0.97 line; USDC falls as tokens rise. Lands by 0:30 | recorded |
| 0:50 | Rewind: the overallotment side sold at 1.03 and the remaining-defence counter rose by exactly the USDC received | saved output |
| 1:40 | The budget runs out and the band stops holding, as promised | saved output |
| 2:20 | Warp 31 days: zero quote, "window closed" | saved output |
| 2:50 | The difference from watermark and Brick Finance (anchored to the auction's own clearing price, funded only by overallotment, expires), the anchor fork test, CoreInvariants | slide |

**Video (2:00 to 2:59).** Same order, chart-first.

## 11. README draft

Order: promise; the band chart; quick start (`anvil --load-state fixtures/graduated.json`, `forge script Taker`); how it works; the three instructions with permalinks and opcode numbers; proof no official opcode moved; the swap-vm tag used; tests and invariant counts; **Uniswap** (CCA getter lines, v4 pool interaction lines, FEEDBACK.md); prior art (watermark, Lotus, Kura, Holster, Brick Finance, Burra Vault) with the three-part difference; limits (holds while the budget lasts); AI usage; licence.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Public page | A price chart of the v4 pool with the band shaded between 0.97 P and 1.03 P, fills as dots on the lines, a big "Remaining defence: 4,210 USDC", "Days left: 29", the one-sentence disclosure | budget empty: band greyed, "Support has ended: budget used"; window closed: "Support ended on <date>" |
| Issuer page | Ship the strategy (terms in plain words, the program bytes hash), live budget, fills table | before graduation: "Waiting for the auction to finish" |
| Fill detail | Transaction with tokens in and USDC out, the price as a share of P | |

Copy: say "price support" and "greenshoe"; never "stabilisation book" on the main page; always show "while the budget lasts" next to the band.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Appended opcodes refused | 1inch answer | one `Extruction` on the deployed router |
| Safe maker refused | 1inch answer | EOA maker (default) |
| CCA setup eats Friday | M2 at Fri 01:00 | Ethereum fork from public factory code, then Replica |
| Long Anvil replay times out | rehearsal | always load the dumped state |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Isn't this market manipulation?" | Greenshoes are a disclosed, regulated practice in equity markets; here every parameter is in the program bytes, the window expires, and the budget is only what the overallotment raised | disclosure line |
| "What if the price keeps falling?" | The band holds while the budget lasts, then stops; we show that moment | run-out beat |
| "Who funds it?" | The launch's own buyers who paid 1.03 P; the budget grows by exactly that USDC | counter |
| "Can someone game the anchor?" | It is read once from a graduated auction past its end block and pinned | anchor test |
| "Why Aqua?" | The cash stays in the issuer's wallet until a fill delivers tokens back | Aqua balances |
| "How is this not watermark?" | Anchored to the auction's clearing price, funded only by overallotment, and it expires | slide |
| "Did you change SwapVM?" | We appended three instructions in the unallocated range on a redeployed router; no official index moved | opcode test |
| "Why only Base fork?" | Aqua has no testnet; local forks are allowed by the rules | rule quote |

## 15. AI usage

Follow `00_common.md` section 8. A writes the instructions and the fuzz property by hand; AI may help with the encoder, the chart and scripts.
