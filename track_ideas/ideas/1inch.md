# 1inch: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: 1inch's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only.

In scope: **Build an Aqua App** ($5,000 USDC; 1st $2,500, 2nd $1,500, 3rd $1,000; category `building-from-scratch`). Out of scope: "Build an Aqua App - Continuity Track" ($2,000), which is Continuity only. ([Mumbai 1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria, fetched 2026-10-31), `track_ideas/history/1inch.md` (dossier, cited as [H]), `track_ideas/ideas_draft/1inch.md` (draft, cited as [D]), `track_ideas/00_season.md` (season brief, cited as [S]) and `plans/`. ETHGlobal pages were not re-fetched, because the 31 Oct snapshot already holds the 1inch text verbatim and the dossier notes that ETHGlobal was serving bot checks and HTTP 429 that day. On 2026-10-31 I re-checked the GitHub and paper facts the ideas depend on (section 3, links inline).

---

## 1. What 1inch's judges reward

### Sourced facts

- The Mumbai text is the fourth identical run of "Build an Aqua App" (Lisbon, ETHOnline and Tokyo 2026 carried the same words and the same $2,500 / $1,500 / $1,000 split) ([H] 4.1; [Tokyo 2026 prizes](https://ethglobal.com/events/tokyo2026/prizes/1inch)).
- Description, verbatim: "Create a custom Aqua app that implements a sophisticated DeFi position. If you use SwapVM, you may modify SwapVM opcodes and define your own instructions. The final positions must be demonstrated through tests scripts or a UI." and "Projects that utilize SwapVM will be scored higher during the final judging." ([Mumbai 1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch))
- Qualifications, verbatim: "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)"; "Onchain execution of token transfers should be presented during the final demo (local forks are ok)"; "Proper Git commit history (no single-commit entries on the final day)". No "Won't place" list and no numeric rubric are published. (same page)
- ETHGlobal partner judging uses only the submitted materials: "partners will evaluate submissions based on the materials you provide." ([details page](https://ethglobal.com/events/mumbai/info/details))
- Every one of the 13 fresh Aqua winners from NYC 2026 to Tokyo 2026 put the core rule into SwapVM, through appended opcodes on a redeployed router or one `Extruction` on the deployed router ([H] section 5, item 1). Examples: OddsFlow (Tokyo 1st, three opcodes "appended after the official set, so no official index moves", "55 Foundry tests", "Contract coverage is 97%") ([OddsFlow](https://ethglobal.com/showcase/oddsflow-fwsnb)); Wamia (Tokyo 2nd, one `Extruction` on "deployed, unmodified contracts", a fork replay of the 25 Aug 2026 Pendle attack taking liquidatable debt "from $37.35M down to $0") ([Wamia](https://ethglobal.com/showcase/wamia-z11ah)); Solvent (ETHOnline 1st, "78 of the 88 books that ever held more than $100 were under-backed at some point") ([Solvent](https://ethglobal.com/showcase/solvent-7uphp)).
- Two 1st places implemented a published AMM paper as SwapVM logic: RiverSwap (NYC 2026, Adams et al.'s auction-managed AMM) ([RiverSwap](https://ethglobal.com/showcase/riverswap-bat5v)) and Aqua Outcome Market (Buenos Aires 2025, Moallemi and Robinson's pm-AMM) ([Aqua Outcome Market](https://ethglobal.com/showcase/aqua-outcome-market-0va0j)).
- Tools around Aqua placed nowhere: AquaPilot, QilinSwap, Sluice and Wave at Lisbon; AutoAMM, Naumachy, Solvent-aqua, Overdraft and AquaQoS at ETHOnline ([H] 4.2 and 5). The exception is KSwap-VM (Lisbon 3rd), formal semantics for SwapVM itself plus a small verified app ([KSwap-VM](https://ethglobal.com/showcase/kswap-vm-aix5n)).
- Field size grew from about 5 Aqua entries at NYC to 19 at Lisbon, about 30 at Tokyo and 62 at ETHOnline, all keyword counts ([H] 6).
- 1inch's own events grant request lists "Aqua-related integrations and experimentation" among its KPIs ([1inch governance forum](https://gov.1inch.network/t/1inch-ethglobal-events-grant-proposal-2026-2027/935), via [H] 6).

### Judgement: what these judges will reward (ranked)

1. **SwapVM carries the rule.** Custom instructions or an `Extruction` are table stakes now; a stock curve behind a UI is a losing entry.
2. **A named financial position with a named user.** A treasury, an issuer, an LP, a lender. Not a compiler, a linter or a dashboard about Aqua.
3. **A dated failure or a cited paper, replayed with numbers.** Wamia, coldcascade and Solvent won with before-and-after numbers; RiverSwap and Aqua Outcome Market won with a paper as the yardstick.
4. **Evidence a judge can rerun from the repo.** Fork tests against the official deployments, SwapVM's `CoreInvariants` run against the new opcode, fuzzing, TypeScript and Solidity byte parity.
5. **Respect for the official contracts.** Pinned release tags, appended opcodes that move no official index, and notes on mismatches with the deployed build.
6. **Not rewarded:** front-end polish for its own sake, agents as the headline, a second sponsor bolted on.

### Judgement: the obvious entries we assume several teams will submit

- An LST or wrapped-asset maker pegged to an oracle rate with a "depeg guard" (Kelp and the Binance drain make this the default idea this month).
- An options or covered-call vault on Aqua.
- An AI agent that ships and docks Aqua strategies for a user.
- A natural-language or drag-and-drop SwapVM program builder.
- An overcommitment or solvency guard (six at ETHOnline alone).
- Copies of the Tokyo winners: a prediction-market maker in OddsFlow's shape, a treasury desk in watermark's shape.

Each final idea below is tested against this list.

---

## 2. Rubric used (Judgement)

The track has no numeric criteria. Its only "What we want to see" sentence is the SwapVM note, so the criteria are the verbatim sentences of the description, plus the two the task adds.

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| P | Sophistication of the DeFi position | "implements a sophisticated DeFi position" | 20% |
| S | Depth of SwapVM use (custom instructions that carry the rule) | "If you use SwapVM, you may modify SwapVM opcodes and define your own instructions" and "Projects that utilize SwapVM will be scored higher" | 20% |
| D | Demonstration and verifiability | "The final positions must be demonstrated through tests scripts or a UI" | 15% |
| Nov | Novelty versus past 1inch winners and the expected Mumbai field | Task | 25% |
| Fea | Feasibility in 36 hours for this team | Task | 20% |

Overall = weighted sum, rounded to one decimal (half up).

Qualification checks applied to every idea (sources: [Mumbai 1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch), [details page](https://ethglobal.com/events/mumbai/info/details)):

- **Q1** official Aqua and SwapVM contracts; a redeployed modified SwapVM router is allowed. **Judgement:** Aqua itself must be the official deployment, so the build runs on a fork of a chain where Aqua is deployed.
- **Q2** onchain execution of token transfers in the demo; local forks are fine. **Judgement:** because partner judging reads only the repo, README and video, the transfers must appear in the video and the README must list fork transaction hashes and a one-command replay.
- **Q3** proper Git commit history, no single commit on the final day.
- **ETHGlobal rules:** all code written after Thu 5 Nov 21:00 IST; AI use attributed and any spec files committed; video 2 to 4 minutes with a human voice.
- **Won't place:** none published. Implied disqualifiers (Judgement): a redeployed Aqua instead of the official one, transfers shown only as mocks, pre-existing project code.

---

## 3. Vetting the five draft ideas

| Draft idea | P | S | D | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1. Reserve Gate (LST maker that will not buy unbacked supply) | 8 | 9 | 8 | 6 | 7 | 7.5 | None formal. The demo casts "the attacker" selling rsETH on Arbitrum, but Kelp's attacker received L1 rsETH and borrowed against it; the unbacked claims were the L2 copies. The draft also relies on `OraclePriceAdjuster`, which is not in the Aqua router's opcode set (re-checked below). Sits next to the most obvious Mumbai entry (oracle-peg maker with a depeg guard) | **Revise** |
| 2. Greenshoe (post-auction stabilisation from the issuer's wallet) | 8 | 8 | 8 | 9 | 7 | 8.1 | None. The bid is funded only by an issuer top-up, while a real greenshoe is funded by the overallotment sale; `LimitSwap` is not in the Aqua router; the CCA price getter warns "Callers MUST ensure that the latest checkpoint is up to date" | **Revise** |
| 3. Plimsoll (vault that refuses unsafe SwapVM programs) | 6 | 9 | 8 | 6 | 6 | 6.9 | None formal. Reads as a tool around Aqua (the losing lane), "about ten rules" is too much on-chain parsing for 36 hours | **Revise** (narrowed) |
| 4. Closing Bell (tokenized-stock maker that knows the exchange is shut) | 6 | 7 | 6 | 5 | 5 | 5.8 | The demo is internally inconsistent (a seller "selling into the maker at 54" is a maker bid the maker would never post, so the revert proves nothing); the weekend-gap evidence is VexiHakari's (Tokyo Continuity 1st), whose team may return; an equity price source on Robinhood Chain is unverified | **Drop**, replaced by Replica |
| 5. Repo Desk (DvP term repo from a lender's wallet) | 8 | 7 | 7 | 7 | 4 | 6.6 | **Q1 risk** on the Whitechain variant: Aqua is not deployed on Whitechain, and the qualification allows redeploying a modified SwapVM, not Aqua. `JumpIfTokenIn` is not in the Aqua router | **Revise**: official chain fork, standing-facility framing, Whitechain only if 1inch says yes |

No draft idea depends on pre-existing project code. Plans A to E do not use Aqua and list 1inch as skip or no fit, so a 1inch entry is a separate build, not a stack ([D] section 9; `plans/`).

### Facts re-checked on 2026-10-31 that change the ideas

- **Deployments.** Aqua `0x1111113ccf1426a8e30e2bff5e005d929bf6a90a` and the SwapVM router `0x111111338c5091e8440b67b168bae16a668ac0de` on 17 chains (Ethereum, Base, Optimism, Polygon, Arbitrum One, Avalanche, BNB Smart Chain, Linea, Sonic, Unichain, Gnosis, zkSync Era, Robinhood Chain 4663, Cronos, Monad, HyperEVM 999, Arc 5042); "Both are deterministic deployments with the same address on every chain"; no testnet listed ([aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md)). **Consequence:** every demo is a mainnet fork; Whitechain is out for the core build.
- **The Aqua router's opcode set is small.** SwapVM's docs define three routers: "**F** `SwapVMRouter` (`Opcodes`)", "**L** `LimitSwapVMRouter` (`LimitOpcodes`)" and "**A** `AquaSwapVMRouter` (`AquaOpcodes`)". Router A lists `Salt`, `Deadline`, `Jump`, `JumpIfDirection`, the `OnlyTaker...` and `OnlyTxOrigin...` guards, `Extruction`, `DynamicBalances`, `XYCSwap`, `XYCConcentrateSwap`, `PeggedSwap`, `FeeFlatIn`, `FeeProtocol`, `RequireMinRate` and `Decay`; it has no `OraclePriceAdjuster`, no `JumpIfTokenIn`, no `LimitSwap` and no auction adjusters. The opcode space note reads "0xd0..0xef is unallocated and 0xf0..0xff reserved." The `Context` exposes `orderHash`, `maker`, `taker`, `tokenIn`, `tokenOut`, `isExactIn` to every instruction. `Extruction` targets "may read storage in quotes but write only in swaps", and "Given the same chain state and inputs, `quote` returns exactly what `swap` executes." ([swap-vm DESCRIPTION.md](https://github.com/1inch/swap-vm/blob/main/docs/DESCRIPTION.md)). This is the HEAD documentation; the deployed build is older (Lotus found a 28-opcode build) ([Lotus](https://ethglobal.com/showcase/lotus-9vnou)). **Consequence:** every idea writes its own pricing instruction instead of leaning on F-only opcodes, and appends it in the unallocated range.
- **Kelp, precisely.** "The adapter then released 116,500 rsETH to the attacker's address on the Ethereum L1 in a single transaction"; "112,204 rsETH (roughly 15% of post-exploit supply) became unbacked on the bridge adapter"; the adapter holds 40,373 rsETH against 152,577 rsETH outstanding on L2s; "Mainnet rsETH is not directly affected by the adapter shortfall"; the attacker posted rsETH on Aave, Compound and Euler "mainly on Ethereum L1 and Arbitrum" ([Galaxy Research](https://www.galaxy.com/insights/research/kelpdao-layerzero-exploit-defi)). **Consequence:** Reserve Gate protects makers on L2s from holders of L2 rsETH, whose backing fell to about 26% (40,373 / 152,577, our arithmetic), not from the attacker.
- **CCA price getter.** `function clearingPrice() external view returns (uint256);` with the NatSpec "Callers MUST ensure that the latest checkpoint is up to date before using this function."; `isGraduated()` and `endBlock()` exist; no getter returns total tokens cleared ([IContinuousClearingAuction.sol](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IContinuousClearingAuction.sol)).
- **Replicating market makers.** Angeris, Evans and Chitra, "Replicating Market Makers" (26 Mar 2021) show that payoffs with the right convexity and homogeneity properties and convex CFMMs are "equivalent" ([arXiv 2103.14769](https://arxiv.org/abs/2103.14769)). Sterrett, Jepsen and Kim, "Replicating Portfolios: Constructing Permissionless Derivatives" (19 May 2022): "We leverage RMMs to replicate the approximate payoff of a Black-Scholes covered call option." ([arXiv 2205.09890](https://arxiv.org/abs/2205.09890)). Primitive's `solstat` library provides the Gaussian CDF, inverse CDF and an RMM-01 `Invariant.sol`; it is AGPL-3.0 and was archived on 3 Oct 2026 ([solstat](https://github.com/primitivefinance/solstat)).
- **Repo stress anchor.** On 17 Sep 2019 "the SOFR increased to above 5 percent" and the effective federal funds rate "moved above the top of the target range to 2.3 percent" ([Federal Reserve FEDS Notes, 27 Feb 2020](https://www.federalreserve.gov/econres/notes/feds-notes/what-happened-in-money-markets-in-september-2019-20200227.html)).

---

## 4. Final ranked table: Build an Aqua App

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Greenshoe: a post-auction stabilisation book funded by its own overallotment, in the issuer's Safe | 8.5 | Revise (done below) | 1inch + Uniswap Foundation |
| 2 | Reserve Gate: an L2 LST maker that stops buying when the bridge escrow no longer backs the token | 7.9 | Revise (done below) | 1inch + Chainlink CRE |
| 3 | Replica: an oracle-free covered call from your wallet, the RMM-01 curve as a SwapVM instruction | 7.8 | New (replaces Closing Bell) | 1inch only |
| 4 | Standing Repo: a lender's always-on repo facility whose buyback leg only the original borrower can take | 7.4 | Revise (done below) | 1inch only (Whitechain or Arc only if 1inch approves) |
| 5 | Plimsoll: a shared maker vault that ships only programs passing six published SwapVM safety rules | 7.1 | Revise (narrowed) | 1inch only |

**Shared gates (Judgement).** All five need the same first four hours: a Base or Arbitrum mainnet fork, the official Aqua, a redeployed `AquaSwapVMRouter` from the swap-vm tag that matches the deployed build, one appended opcode in the unallocated range, a TypeScript encoder with a byte-parity test, and one fill that moves tokens. Build that harness first, then the idea. If an idea's own gate fails, pivot to the next idea on the same harness: Greenshoe to Replica (both are a custom curve on one shipped strategy), Reserve Gate to Standing Repo (both read an external rate inside an opcode).

---

## 5. The final ideas in full

### Rank 1. Greenshoe: a post-auction stabilisation book funded by its own overallotment, in the issuer's Safe

**Pitch.** In an IPO, the underwriter sells about 15% more shares than offered; if the price falls below the offer price, it buys them back in the market with that cash, and if the price rises it takes the extra shares from the issuer. Greenshoe does this for a token launched through Uniswap's Continuous Clearing Auction, with one Aqua strategy shipped from the issuer's Safe: the overallotment tokens are offered only above the auction's own clearing price, every USDC they raise joins the stabilisation bid below it, and the whole thing expires on a date set at ship time. The cash never leaves the Safe until a fill delivers tokens back to it.

**Falsifiable promise.** "For 30 days after the auction graduates, while the bid budget lasts, nobody can sell the token into the issuer's Safe below 97% of the clearing price or buy the issuer's tokens below 103% of it; every USDC paid out by the bid arrives in the same transaction as the tokens; and after day 30 the strategy quotes zero on both sides."

**Demo moment (20 seconds).** A Base fork. The CCA graduates at P; the LBPStrategy seeds the v4 pool. A buyer rush lifts the price: the overallotment side sells at 1.03 P and the "defence budget" counter rises by exactly the USDC received. A whale then dumps 5% of supply into the v4 pool; the arbitrage route lands every fill on the 0.97 P line, the Safe's token balance rises as USDC leaves, and the counter falls. Warp 31 days and repeat the dump: the Aqua quote is zero and the swap reverts with `WindowClosed(endTs)`.

**How it works.**
- Router: `AquaSwapVMRouter` from the swap-vm release tag that matches the deployed build, redeployed with three instructions appended in the unallocated range `0xd0..0xef`, pointed at the official Aqua on a Base fork. Fallback without a redeploy: the same logic as one `Extruction` target on the deployed router.
- `ClearingAnchor`: reads `clearingPrice()` from the named CCA only when `isGraduated()` is true and `block.number > endBlock()`, and pins the value in storage on the first swap (writes only in swaps, as SwapVM requires), so later reads are the pinned anchor and the checkpoint warning cannot bite.
- `GreenshoeBand` (the curve): exact-in token sells get `amountIn * 0.97 P`; exact-in USDC buys get `amountIn / (1.03 P)`; both clamp to a per-block cap and to the strategy's Aqua balance; no fill between the two lines.
- `StabilisationWindow`: refuses after `endTs` and once the cumulative bid spend exceeds its cap. Because the overallotment proceeds land in the same strategy's `DynamicBalances`, the bid's budget grows by exactly what the overallotment raised, which is the greenshoe's funding rule.
- UI: issuer page (ship from Safe, budget, fills) and public page (band, fills, "remaining defence", days left).
- Evidence: Foundry fork tests against the real CCA factory v2.1.0 and official Aqua; `CoreInvariants` (monotonicity, additivity, rounding favours the maker, balance sufficiency) on the composed program; fuzz property "for any sequence of fills, USDC out never exceeds 0.97 P times tokens in, and no token leaves the Safe below 1.03 P".

```solidity
interface IGreenshoe {
    struct Terms {
        address auction;
        uint16 bidDiscountBps;
        uint16 askPremiumBps;
        uint64 endTs;
        uint128 maxBidSpend;
        uint128 perBlockCap;
    }
    function anchor(bytes32 orderHash) external view returns (uint256 priceQ96, bool pinned);
    function remainingDefence(bytes32 orderHash) external view returns (uint256 usdc);
}
```

**Go or no-go gate (hours 0 to 4).** (a) Create and graduate one CCA through the Base factory on the fork and read a non-zero `clearingPrice()`; (b) one Aqua fill through the redeployed router moves tokens. If (a) fails by Fri 01:00 IST, deploy the CCA from the public factory code on an Ethereum fork; if it still fails, pivot to Replica on the same harness.

**Requirement checklist.**
- [x] P: an issuer-side two-sided stabilisation position with a budget, a band, a window and a funding rule.
- [x] D: Foundry fork tests and the two-page UI.
- [x] S: three appended instructions carry the whole rule.
- [x] Q1: official Aqua on a Base fork; only the SwapVM router is redeployed.
- [x] Q2: USDC and token transfers in every fill, shown in the video with hashes in the README.
- [x] Q3: one branch per instruction, small commits from hour one.
- [x] Fresh build; public libraries only (swap-vm, aqua, CCA, Safe, Foundry, viem). Won't place: none published; no implied disqualifier hit.
- [ ] Risk: whether 1inch counts a Safe as the maker (question 4).

**Why it beats rivals (Judgement).** No Mumbai rival list above contains it: it is not a peg, an options vault, an agent or a guard. It has the two things the last rooms paid for: a TradFi instrument every judge can name (the Lotus and watermark pattern) and a refusal on stage. It uses the Aqua property that matters (the budget stays in the issuer's wallet) and the SwapVM property that matters (one shipped program whose own fills fund its other side).

**Closest prior winners.**
- [Lotus](https://ethglobal.com/showcase/lotus-9vnou), NYC 2026 2nd: one-way sell liquidity for big holders. Greenshoe is two-sided and self-funding, anchored to an auction.
- [watermark](https://ethglobal.com/showcase/watermark-68230), Tokyo 2026 3rd: a treasury quoting from its Safe with a 50 ETH fill cap. Greenshoe is an issuer, a window and a funding rule.
- [Kura](https://ethglobal.com/showcase/kura-so3wx), Tokyo 2026 finalist and Uniswap 1st: a CCA launch. Greenshoe starts where Kura ends.
- Dry Powder (ETHOnline 2026, no prize, per [D]): shared-reserve dip buying without an anchor or a funding rule.

**Stack.** Uniswap Foundation "Build with Uniswap" ($10,000, four places): the CCA and its LBPStrategy-seeded v4 pool are the launch being defended, which is in the scope sentence ("CCA"); needs FEEDBACK.md and the feedback form ([Mumbai Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)). **Judgement:** Uniswap centrality is moderate (it reads one CCA getter and the dump happens in the v4 pool); make the README point at those lines. No third partner fits honestly. EF: none.

**Difficulty.** Medium to high. The unknowns are CCA setup on a fork and pinning the anchor.

**Scores.**

| P | S | D | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 9 | 9 | 8 | 9 | 7 | **8.5** |

**Judge notes (Judgement).**
- 1inch judge: "A position that funds its own defence from its own fills is exactly what shared balances were for. Show the counter moving by the exact USDC."
- 1inch judge: "Tell us which swap-vm tag you redeployed and prove no official opcode index moved."
- Veteran: "Do not call it price support that cannot fail. Say the band holds while the budget lasts and show the moment it runs out. Q and A will ask whether this is market manipulation: answer that greenshoes are a disclosed, regulated practice in equity markets and that every parameter is in the program bytes."

---

### Rank 2. Reserve Gate: an L2 LST maker that stops buying when the bridge escrow no longer backs the token

**Pitch.** On L2s, bridged LSTs are claims on an escrow on Ethereum. When Kelp's adapter released 116,500 rsETH on 18 Apr 2026, the L2 copies kept their exchange rate while the escrow behind them fell to 40,373 rsETH against 152,577 outstanding. Every rate-pegged venue on those L2s kept quoting. Reserve Gate is an Aqua maker on Arbitrum that quotes ETH against bridged LSTs from one shared ETH balance at their rate, but whose program refuses to buy any token whose escrow coverage falls below the maker's floor or whose coverage reading is stale.

**Falsifiable promise.** "Replay a Kelp-sized escrow release on an Ethereum fork, post the coverage to an Arbitrum fork, and let any holder of L2 rsETH sell into Reserve Gate: not one wei of the maker's ETH leaves the wallet. The same sale into a plain rate-pegged program built from the same pricing code without the coverage instruction fills in full. An honest wstETH sale on the same strategy still fills."

**Demo moment (20 seconds).** Split screen on an Arbitrum fork, official Aqua. Left wallet: rate-pegged program. Right wallet: Reserve Gate. A script empties the adapter on the Ethereum fork to the Galaxy numbers; the CRE workflow simulation reads both forks and writes "coverage 26.5%" to the Arbitrum receiver. An L2 rsETH holder sells 500 rsETH: the left wallet pays out in full; the right reverts with `CoverageBelowFloor(2646, 9800)`. Then 1 wstETH sells into the right wallet and fills.

**How it works.**
- Router: redeployed `AquaSwapVMRouter` with three appended instructions, official Aqua on the Arbitrum fork; fallback as one `Extruction` (Wamia's pattern).
- `ReserveCoverage`: reads `(coverageBps, updatedAt)` for the token from a receiver contract; refuses below the maker's floor or when the reading is older than a maker-set age. The receiver is written by a Chainlink CRE workflow that reads the escrow balance on Ethereum and the token's supply on each L2 (rsETH: adapter balance against L2 outstanding; wstETH: the bridge escrow balance against L2 supply).
- `SupplyVelocity`: stores `(block, totalSupply)` per token on swaps and refuses when local supply jumped more than a maker-set share within N blocks (the Liquid Network shape, an "unbacked cross-chain mint" of $320M on 6 Sep 2026, per [S] 1.1 citing the [DefiLlama hacks API](https://api.llama.fi/hacks)).
- `RateCurve`: the token's own on-chain exchange rate times a maker spread, with the fill clamped to a maker-set share of the shared ETH balance. Written by the team because `OraclePriceAdjuster` is not in the Aqua router.
- Evidence: fork tests against the real rsETH and wstETH contracts on both chains; `CoreInvariants` on the composed program; fuzz property "for any release sequence that drops coverage below the floor, maker ETH out equals 0".

**Go or no-go gate (hours 0 to 4).** (a) Read the real rsETH adapter balance on an Ethereum fork and the L2 rsETH supply on an Arbitrum fork; (b) run the CRE CLI simulation against fork RPC URLs. If (b) fails, a TypeScript keeper writes the same receiver and the Chainlink slot is dropped (the 1inch entry is unaffected).

**Requirement checklist.**
- [x] P: one ETH balance market-making several LSTs, each with its own backing floor.
- [x] D: fork tests plus a small React replay page.
- [x] S: three appended instructions.
- [x] Q1: official Aqua on the fork; SwapVM router redeployed.
- [x] Q2: WETH, rsETH and wstETH transfers on the fork.
- [x] Q3: commit plan as in section 4.
- [x] Fresh build; public libraries only. Won't place: none published.
- [ ] Honesty: the replay is a synthetic release on real contracts (impersonated adapter), not Kelp's transaction, unless the April blocks replay on an archive RPC. Say so on stage.

**Why it beats rivals (Judgement).** The obvious Mumbai entry is a rate-pegged LST maker with a price-depeg guard. That guard would not have fired in April, because the rate never moved. Reserve Gate checks backing, not price, and its numbers come from Galaxy's own post-mortem. It repeats Wamia's recipe (a dated loss, a fork replay, a refusal) in a lane Wamia did not touch.

**Closest prior winners.**
- [Wamia](https://ethglobal.com/showcase/wamia-z11ah), Tokyo 2026 2nd: guards a bid against price manipulation of Pendle PT. Reserve Gate guards against counterfeit backing.
- [Ballast](https://ethglobal.com/showcase/ballast-7jpyp), NYC 2026 4th: Chainlink-anchored leverage with a measured before-and-after.
- [Solvent](https://ethglobal.com/showcase/solvent-7uphp), ETHOnline 2026 1st: the maker's own overcommitment, not the asset's backing.
- [RateSpace](https://ethglobal.com/showcase/ratespace-ke33e), [Aquawrap](https://ethglobal.com/showcase/aquawrap-povv5), [Aquifer](https://ethglobal.com/showcase/aquifer-gy9hw): oracle-rate makers, no 1inch prize.

**Stack.** Chainlink "Best workflow with CRE" ($1,500, one winner): "Integrate at least one blockchain with an external API, system, data source" and "Demonstrate a successful simulation (via the CRE CLI)" ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)). **Judgement:** a two-chain read is a reasonable reading of "system"; add the LayerZero scan API for the message trail if the judges want an off-chain source. EF: none.

**Difficulty.** Medium. Two forks and a cross-fork workflow are the time sink.

**Scores.**

| P | S | D | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 9 | 9 | 7 | 7 | **7.9** |

**Judge notes (Judgement).**
- 1inch judge: "Strong on evidence. Novelty takes a hit only because we will see five rate-pegged LST makers this weekend; lead with why theirs would have paid out."
- Chainlink-minded judge: "Expect the question 'why not Proof of Reserve feeds?'. Answer with the per-L2 coverage number no feed publishes, or do not claim it."
- Veteran: "Get the actor right. The attacker held L1 rsETH. The people dumping on your L2 maker are L2 holders. One wrong sentence here and the Q and A is lost."

---

### Rank 3. Replica: an oracle-free covered call from your wallet, the RMM-01 curve as a SwapVM instruction

**Pitch.** Covered-call vaults take custody of your ETH and auction options weekly. Replica ships one Aqua strategy from the holder's wallet whose curve is Primitive's RMM-01 trading function, the published construction that makes a CFMM's value approximate a Black-Scholes covered call: as expiry nears the curve tightens, arbitrageurs pay the premium through trading, and at expiry the wallet holds USDC if ETH ended above the strike and ETH if it did not. No oracle, no deposit, no option token.

**Falsifiable promise.** "On a Base fork, over 200 simulated price paths with an arbitrageur trading to each path, the wallet's value at expiry is reported next to the Black-Scholes covered-call payoff for the same strike and volatility, and the tracking error we print is what the script measures. At no point does a taker get the maker's ETH for less than the curve's price, and after expiry the strategy sells ETH only at or above the strike."

**Demo moment (20 seconds).** A chart of one path: ETH climbs through the strike. The wallet's ETH balance drains into USDC along the curve, finishing at the strike line; the dotted Black-Scholes covered-call value sits on top of the solid wallet value. Then the expiry block: a taker tries to buy 1 ETH at 0.9 K and receives nothing (`BelowStrikeAfterExpiry`); at K it fills.

**How it works.**
- `RmmCurve` (appended instruction, the curve of the program): args `strike`, `sigma`, `expiry`. With reserves per unit of liquidity `x` (ETH) and `y` (USDC), the trading function is `y = K * Phi(PhiInv(1 - x) - sigma * sqrt(tau)) + k`, and both swap directions have closed forms, so no iteration. The invariant `k` is recomputed from current balances and the current `tau` before each swap and required not to fall after it, so the instruction holds no state.
- Gaussian maths in fixed point: port `solstat` (AGPL-3.0, archived) or write an MIT version from standard approximations; decide at hour 0 because AGPL binds the whole repo.
- Program: `Deadline`, `DynamicBalances`, `RmmCurve`, `RequireMinRate` (all in, or appended to, router A).
- Evidence: TypeScript reference model with byte and value parity against the Solidity curve; Foundry fork test that drives an arbitrageur along each path and records the wallet value; `CoreInvariants` (monotonicity, additivity, rounding favours the maker) on the curve; a fuzz property that the post-swap invariant never falls.

```solidity
interface IRmmCurve {
    struct Params {
        uint256 strikeWad;
        uint256 sigmaWad;
        uint64 expiry;
    }
    function quoteOut(Params calldata p, uint256 xWad, uint256 yWad, uint256 amountIn, bool ethIn, uint64 nowTs) external pure returns (uint256 amountOut);
}
```

**Go or no-go gate (hours 0 to 6).** `Phi` and `PhiInv` in Solidity matching the TypeScript model to 1e-9 over 10,000 random inputs, and one fill on the fork. If not met by Fri 03:00 IST, fall back to a piecewise-linear approximation of the same curve and say so.

**Requirement checklist.**
- [x] P: a covered call written by a wallet, with theta captured through trading.
- [x] D: path simulation script, fork tests and the chart.
- [x] S: the curve itself is the custom instruction.
- [x] Q1: official Aqua on a Base fork; SwapVM router redeployed.
- [x] Q2: WETH and USDC transfers on every arbitrage fill.
- [x] Q3: as section 4.
- [x] Fresh build; public libraries only; licence decided at hour 0. Won't place: none published.

**Why it beats rivals (Judgement).** Options on Aqua is a crowded lane, but every entry so far was a marketplace, a vault with an oracle or a payoff wrapper (smile, MAMORI, SeaWall, Strikeline). Replica is the only one where the option is the curve, and it brings the paper-as-yardstick pattern that produced two 1st places. The weakness is novelty against Primitive itself, so the pitch must say "ported and measured on Aqua", not "invented".

**Closest prior winners.**
- [Aqua Outcome Market](https://ethglobal.com/showcase/aqua-outcome-market-0va0j), Buenos Aires 2025 1st: pm-AMM paper as SwapVM logic.
- [RiverSwap](https://ethglobal.com/showcase/riverswap-bat5v), NYC 2026 1st: am-AMM paper as SwapVM logic.
- [smile](https://ethglobal.com/showcase/smile-mfvz7), ETHOnline 2026 Continuity 2nd: options marketplace on Aqua.
- [Strikeline](https://ethglobal.com/showcase/strikeline-bthin), ETHOnline 2026, no prize: covered calls without a replicating curve.

**Stack.** 1inch only. **Judgement:** nothing else is load-bearing; do not bolt on a feed.

**Difficulty.** High on maths, low on integration.

**Scores.**

| P | S | D | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 9 | 9 | 8 | 7 | 6 | **7.8** |

**Judge notes (Judgement).**
- 1inch judge: "This is the 'positions nobody can build in a pool contract' argument, except Primitive did. Show what Aqua adds: the ETH never leaves the wallet and the same wallet can run other strategies."
- 1inch judge: "Run our `CoreInvariants` against the curve and put the result in the README."
- Veteran: "The paper says approximate. Print the tracking error you measure, including fees and gas, and never say 'exact'. Expect a question on what happens if no arbitrageur shows up."

---

### Rank 4. Standing Repo: a lender's always-on repo facility whose buyback leg only the original borrower can take

**Pitch.** A treasury with idle USDC posts a standing repo facility, the onchain version of the Federal Reserve's Standing Repo Facility: any holder of wstETH can sell it to the treasury's Aqua strategy at a haircut and get USDC in the same transaction, and only that same address can buy the same collateral back before maturity at principal plus interest. After maturity the collateral stays with the lender. Both legs are one shipped SwapVM program on one shared USDC balance.

**Falsifiable promise.** "The borrower can always repurchase at principal plus accrued interest before maturity; nobody else can repurchase that collateral at any price; after maturity the repurchase reverts and the collateral stays in the lender's wallet; the facility never lends more than its cap."

**Demo moment (20 seconds).** An Ethereum fork. Borrower A sells 10 wstETH and receives USDC at a 10% haircut in one fill. Address B tries to buy that wstETH back and reverts with `NotRepoCounterparty(B)`. Warp seven days: A repurchases and pays principal plus seven days of interest. A second repo is left past maturity; its repurchase reverts with `RepoMatured`, and the wstETH stays with the lender.

**How it works.**
- Program on a redeployed `AquaSwapVMRouter` (official Aqua on the fork): `JumpIfDirection` (in router A) splits the two legs.
- `RepoOpen`: prices collateral from on-chain reads only (the wstETH rate and the Chainlink ETH/USD feed) times `(1 - haircut)`, records `(taker, collateral, principal, openedAt)` keyed by `orderHash` and `ctx.query.taker`, and enforces per-borrower and total caps (writes only in swaps).
- `RepoClose`: accepts USDC only from a taker with an open record, prices the buyback at `principal * (1 + rate * elapsed)`, allows partial closes, refuses after maturity.
- Evidence: fork tests on real wstETH and the real feed; fuzz properties for the four promises; `CoreInvariants` where they apply (symmetry does not, by design, and the README says so).

**Go or no-go gate (hours 0 to 4).** A stateful instruction that writes in swaps and reads `ctx.query.taker`, with quote and swap agreeing on the fork. If the quote path cannot know the taker, use `Extruction` with a taker-keyed ledger.

**Requirement checklist.**
- [x] P: secured term lending with delivery versus payment and a default path.
- [x] D: tests and a two-party UI.
- [x] S: two appended stateful instructions and SwapVM control flow.
- [x] Q1: official Aqua on an Ethereum fork. The Whitechain variant is not built unless 1inch says a self-deployed Aqua counts (question 8).
- [x] Q2: wstETH and USDC transfers in both legs.
- [x] Q3: as section 4.
- [x] Fresh build. Won't place: none published.

**Why it beats rivals (Judgement).** No winner has shown a two-leg trade bound to its first counterparty. "Lending" was one of the four examples on the first Aqua prize page ([Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes/1inch)), and fixed income has placed (TenorFi). The September 2019 repo spike, when "the SOFR increased to above 5 percent", gives the "why a standing facility" line a source.

**Closest prior winners.**
- [TenorFi](https://ethglobal.com/showcase/tenorfi-06wnb), NYC 2026 3rd: fixed funding rate as an opcode.
- [AquaTerm](https://ethglobal.com/showcase/aquaterm-mdmbt), Tokyo 2026, no prize: term JIT lending with shared collateral, no counterparty-bound leg.
- [Intentional](https://ethglobal.com/showcase/intentional-so-77n1c), Lisbon 2026, no prize: factoring withdrawal claims.

**Stack.** 1inch only by default. Whitechain "Tokenize" names "Repo or short term lending agreements with delivery versus payment" but needs Whitechain Sepolia, where Aqua is not deployed; Arc "Best DeFi / Onchain Finance App" fits lending and Aqua is deployed on Arc (5042), but "Every Arc prize requires using Arc Studio as the starting point" ([Mumbai Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain); [Mumbai Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc)). **Judgement:** take neither unless the workshop clears it.

**Difficulty.** Medium to high: state keyed by taker, partial closes and the quote path.

**Scores.**

| P | S | D | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 8 | 8 | 7 | 6 | **7.4** |

**Judge notes (Judgement).**
- 1inch judge: "Why Aqua and not a lending contract? Because the lender's USDC is the same balance its other strategies quote from. Show a second strategy on the same balance."
- Veteran: "A borrower whose collateral falls below principal simply walks away. Say that the haircut is the lender's only protection and show the loss bound."

---

### Rank 5. Plimsoll: a shared maker vault that ships only programs passing six published SwapVM safety rules

**Pitch.** Depositors pool ETH and USDC in a vault that is itself the Aqua maker; outside strategists earn a fee for proposing SwapVM programs to run on that balance. SwapVM's own docs say "A program that runs is not a program that is safe. The VM does not check jump targets, instruction order, flag alignment or parameter sanity." Plimsoll's vault checks them on chain before it ships anything, and prepends a loss-budget guard to every program it does ship.

**Falsifiable promise.** "No program that breaks one of the six rules can be shipped from the vault's balance, and a shipped program stops quoting once its realised loss against the oracle passes its budget; a program that passes ships and fills in the same minute."

**Demo moment (20 seconds).** The depositor view first: 100 ETH and 300,000 USDC in the vault. Four strategist submissions: a jump into the middle of an instruction, a program with no `RequireMinRate`, an `Extruction` to an unlisted contract, and a clean concentrated-liquidity program. The first three revert with `RuleBroken(2, ...)`, `RuleBroken(5, ...)`, `RuleBroken(6, ...)`; the fourth ships and a taker fill moves vault tokens.

**How it works.**
- `PlimsollVault` (ERC-4626 shares) is the only caller of `ship` and `dock`.
- `ProgramVerifier` walks the bytes (each instruction is length-prefixed, so the walk is linear) against the opcode table of the targeted router build. Six rules: (1) every opcode is in router A's table plus `VaultGuard`; (2) every jump target lands on an instruction boundary and points forward; (3) every reachable path ends in `XYCSwap`, `XYCConcentrateSwap` or `PeggedSwap`; (4) `Deadline` present and within the vault's horizon; (5) `RequireMinRate` present and within a band of a Chainlink price; (6) `Extruction` targets only on an allowlist pinned by code hash.
- `VaultGuard` (appended, stateful) is prepended to every shipped program and refuses fills once that program's realised loss passes its budget.
- Evidence: `CoreInvariants` as a Foundry fuzz suite run against each accepted program in CI; a mutation suite of rule-breaking programs that must all be refused.

**Go or no-go gate (hours 0 to 4).** The verifier parses a real program built by the official SDK for the deployed build. If the deployed table differs from HEAD (Lotus's finding), the verifier is parameterised by the table, and the README says which build it targets.

**Requirement checklist.**
- [x] P: delegated market making on pooled, self-custodied liquidity with bounded strategist risk.
- [x] D: tests and a strategist console.
- [x] S: SwapVM is both the subject and the guard.
- [x] Q1: official Aqua; router redeployed only to add `VaultGuard`.
- [x] Q2: vault tokens move in fills on the fork.
- [x] Q3: as section 4.
- [x] Fresh build. Won't place: none published.
- [ ] Risk: read as a tool around Aqua; the demo must open with depositors.

**Why it beats rivals (Judgement).** The obvious "safety" entries at Mumbai will be off-chain linters and AI program builders, which have placed nowhere. Plimsoll is enforcement at ship time, on chain, for third-party programs, which is what SwapVM's docs ask production integrations to do. It ranks last because the tool lane has lost every time except KSwap-VM.

**Closest prior winners.**
- [KSwap-VM](https://ethglobal.com/showcase/kswap-vm-aix5n), Lisbon 2026 3rd: formal semantics of SwapVM, proofs offline.
- [Cleverly Using Money](https://ethglobal.com/showcase/cleverly-using-money-pogqu), Buenos Aires 2025 2nd: a curated Aqua vault without program checks.
- [AquaPilot](https://ethglobal.com/showcase/aquapilot-03izt) and [Solvent-aqua](https://ethglobal.com/showcase/solvent-aqua-mnxcm): off-chain validator and external checker, no prize.

**Stack.** 1inch only. EF "Best CROPS App" as a "Secure" dev tool is a stretch, because its judges want the other three properties to hold too ([Mumbai EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). **Judgement:** do not spend the EF slot here.

**Difficulty.** Medium to high: path analysis for rule 3 is the hard part.

**Scores.**

| P | S | D | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 7 | 9 | 8 | 6 | 6 | **7.1** |

**Judge notes (Judgement).**
- 1inch judge: "We wrote that warning. A contract that enforces it is welcome; a dashboard about it is not."
- Veteran: "Six rules, not ten. Rule 3 needs real path analysis; if it slips, ship five and say so."

---

### Dropped: Closing Bell (5.8)

Kept here for the record. A tokenized-stock maker that widens and shrinks quotes outside exchange hours is a reasonable product, but the draft's demo did not test its own rule, its strongest evidence belongs to a Tokyo Continuity winner, and the equity price source on Robinhood Chain is unverified. Its lane (oracle-rate makers with a time-of-day band) sits beside Iceberg, Tide and Holster, none of which placed ([H] 4.2). Replaced by Replica.

---

## 6. Track combination pass (Judgement)

Rules (sourced: [event page FAQ](https://ethglobal.com/events/mumbai), [details page](https://ethglobal.com/events/mumbai/info/details)): at most 3 partner prizes; a partner with several tracks counts as one; the EF places a project in at most one EF prize; the ETHGlobal finalist track is separate and does not count.

| Build | Partner picks | Extra submission work | Finalist fit |
|---|---|---|---|
| Greenshoe | 1inch + Uniswap Foundation | FEEDBACK.md, Uniswap feedback form, README permalinks to CCA and v4 lines | Good: a named instrument, a chart, a refusal |
| Reserve Gate | 1inch + Chainlink CRE | CRE workflow and CLI simulation log | Strong: dated 2026 loss, replay, refusal |
| Replica | 1inch | none | Medium: impressive maths, harder to show in 4 minutes |
| Standing Repo | 1inch (Whitechain or Arc only if cleared) | WHITECHAIN_FEEDBACK.md or Arc Studio use, if taken | Medium |
| Plimsoll | 1inch | none | Weak for generalists |

- **With the team's plans (A to E).** None uses Aqua, so a 1inch entry replaces a plan rather than stacking on it; with three people, build one project.
- **Combos to avoid.** Any Whitechain stack for an Aqua build (no Aqua deployment, and Q1 forbids redeploying Aqua itself); Arc stacks unless the team accepts Arc Studio as the starting point; Greenshoe plus Bidproof (the Uniswap panel's rank 1) in one project, because two CCA stories dilute both.
- **Best expected prize value:** Greenshoe (1inch $5,000 over three places plus Uniswap $10,000 over four). **Best finalist bet:** Reserve Gate.
- **Workshop clash:** 1inch (Thu 17:30, Workshop Room 2) runs at the same time as World (17:30, Room 1) ([event page](https://ethglobal.com/events/mumbai)); send one person to 1inch.

---

## 7. 1inch's top 3 overall

1. **Greenshoe (8.5).** The most original position on the table, built from the two properties 1inch sells (balances stay in the wallet, one program can fund its own other side), with a TradFi name every judge knows and a second sponsor whose scope already includes CCA.
2. **Reserve Gate (7.9).** The strongest evidence story: Galaxy's own numbers, a refusal a rate-pegged maker cannot make, and a recipe (Wamia's) that this room already paid for. It loses a point on novelty only because rate-pegged LST makers will be everywhere this weekend.
3. **Replica (7.8).** The paper-as-yardstick pattern behind two 1st places, applied to the crowded options lane in the one way nobody has tried. Highest technical ceiling, highest maths risk, and a clean pivot from Greenshoe on the same harness.

---

## 8. Questions for the 1inch workshop and booth

Workshop: Thu 5 Nov 17:30 to 18:00 IST, Workshop Room 2, "Reimagining the AMM with 1inch Aqua", Tanner Moore ([event page](https://ethglobal.com/events/mumbai)). Ask in the ETHGlobal Discord 1inch channel now and at the booth before 21:00 IST. Most decisive first.

1. **Official contracts:** does a redeployed `AquaSwapVMRouter` with our instructions appended in `0xd0..0xef`, pointed at the official Aqua, satisfy "Official Aqua/SwapVM contracts must be used"? Does one `Extruction` on the deployed router score as well as custom opcodes under "scored higher"? (Decides the architecture of all five ideas.)
2. **Deployed build:** which swap-vm release tag and `AquaOpcodes` table match the router at `0x111111338c5091e8440b67b168bae16a668ac0de` on Base, Arbitrum and Ethereum (Lotus found a 28-opcode build)? Is `0xd0..0xef` safe to use, or will 1inch allocate it?
3. **"Final demo":** partner judging reads only the repo, README and video. Is a video of fork transactions plus hashes and a one-command replay in the README enough for "Onchain execution of token transfers should be presented during the final demo", or do judges want a booth demo on Sat 09:30 to 12:30, or a small mainnet transaction?
4. **Contract makers:** does a Safe (Greenshoe), an ERC-4626 vault (Plimsoll) or a treasury contract (Standing Repo) count as the maker of a "position", or do judges expect an end-user wallet?
5. **Stateful instructions:** are instructions that write storage in swaps (Greenshoe's pinned anchor and budget, Reserve Gate's supply snapshots, Standing Repo's borrower ledger) acceptable, and must they still pass `CoreInvariants`? Is reading another protocol's getter (CCA `clearingPrice()`, a CRE-fed receiver, a Chainlink feed) inside an instruction preferred over an `Extruction`?
6. **Published mechanisms:** is porting a published AMM (RMM-01, with Primitive's AGPL-3.0 `solstat`) judged as original work, and does an AGPL repo cause any problem for 1inch?
7. **What judges run:** do the judges run the Foundry tests, and do they read a FEEDBACK.md? Who is on the panel, and how is 3rd place decided against 2nd?
8. **Chains:** is any official Aqua deployment on a testnet? Is deploying unmodified Aqua ourselves on a chain 1inch has not deployed to (Whitechain Sepolia) ever acceptable? Is chain 5042 Arc mainnet or testnet?
9. **Disclosure:** if fuzzing finds a SwapVM issue during the event, what path does 1inch want, given the README asks for private disclosure, and is a submission that reports it only privately still complete?

---

## 9. Gaps and caveats

- No Mumbai judges are named (`track_ideas/00_current_tracks.md`); what judges reward is inferred from past winners in [H].
- The router A opcode list comes from swap-vm HEAD documentation; the deployed build is older and was not inspected from here (question 2).
- Not verified: CRE CLI simulation against fork RPCs, the existence of a per-L2 rsETH coverage feed, CCA creation on a Base fork, gas for fixed-point `PhiInv`, and whether the SwapVM quote path can see the taker for Standing Repo. Each idea names its gate.
- Galaxy's Kelp figures "don't fully reconcile" by its own account (116,500 released, 112,204 unbacked); Reserve Gate uses the adapter and L2 outstanding figures only.
- ETHGlobal pages were not re-fetched; the verbatim track text is the 2026-10-31 snapshot.
