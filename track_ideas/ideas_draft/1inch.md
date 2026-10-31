# 1inch at ETHGlobal Mumbai: five fresh-build ideas for "Build an Aqua App"

Written 2026-10-31 for a three person Classic track team (DeFi and smart contract security; Solidity, Foundry, fuzzing, auditing; TypeScript and React). Fresh build only: every idea starts from public repos (1inch `aqua`, `swap-vm`, `swap-vm-template`, `@1inch/aqua-sdk`, `@1inch/swap-vm-sdk`, Uniswap, Chainlink and Whitechain public code) after Thu 5 Nov 21:00 IST. The Continuity track ("Build an Aqua App - Continuity Track", $2,000) is ignored.

Companion dossier: `track_ideas/history/1inch.md` (every 1inch track at ETHGlobal from Istanbul 2023 to Tokyo 2026, the winners, and why they won). Lines marked **Judgement** are this researcher's opinion. Everything else carries a URL or a repo path.

---

## 0. The track, verbatim, and what it implies

Source: [Mumbai 1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch), fetched 2026-10-31; identical to Tokyo 2026, ETHOnline 2026 and Lisbon 2026 ([Tokyo](https://ethglobal.com/events/tokyo2026/prizes/1inch), [ETHOnline](https://ethglobal.com/events/ethonline2026/prizes/1inch), [Lisbon](https://ethglobal.com/events/lisbon2026/prizes/1inch)).

**Build an Aqua App**, $5,000 USDC (1st $2,500, 2nd $1,500, 3rd $1,000).

> Create a custom Aqua app that implements a sophisticated DeFi position. If you use SwapVM, you may modify SwapVM opcodes and define your own instructions. The final positions must be demonstrated through tests scripts or a UI.
>
> Projects that utilize SwapVM will be scored higher during the final judging.

Qualifications:

> - Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)
> - Onchain execution of token transfers should be presented during the final demo (local forks are ok)
> - Proper Git commit history (no single-commit entries on the final day)

Won't place: none published. **Judgement:** treat the three qualifications as hard gates and add two unofficial ones learned from history: (a) the position must be a financial product with a named user, not a tool around Aqua (Solvent-aqua, AquaPilot, QilinSwap and Sluice built tools and placed nowhere; see the dossier, section 5); (b) SwapVM must carry the core rule, through appended opcodes on a redeployed `AquaSwapVMRouter` or an `Extruction` on the deployed one (every fresh winner since NYC 2026 did one of the two).

Requirement checklist used for every idea below:

| ID | Requirement | Source |
|---|---|---|
| R1 | "custom Aqua app that implements a sophisticated DeFi position" | track description |
| R2 | "demonstrated through tests scripts or a UI" | track description |
| R3 | SwapVM use ("scored higher") | track description |
| R4 | "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)" | qualifications |
| R5 | "Onchain execution of token transfers should be presented during the final demo (local forks are ok)" | qualifications |
| R6 | "Proper Git commit history (no single-commit entries on the final day)" | qualifications |

Facts every idea relies on:
- SwapVM programs are bytes of `[opcode][argsLength][args]`; a custom instruction is "a library with `opcode`, `build(...)`, `parse(...)` and `exec(ctx, args)`", wired by overriding `_dispatch` in a router that inherits `SwapVM` and an opcode set ([swap-vm README](https://github.com/1inch/swap-vm); [DESCRIPTION.md](https://github.com/1inch/swap-vm/blob/main/docs/DESCRIPTION.md)).
- `Extruction` delegates registers to a maker-chosen contract; "`Extruction` targets must be deterministic and behave identically in view and mutable mode; they may read storage in quotes but write only in swaps" (DESCRIPTION.md). Wamia ran its whole strategy as one `Extruction` on 1inch's "deployed, unmodified contracts: Aqua v1.0.0 and AquaSwapVMRouter (swap-vm v1.0.2)" ([Wamia](https://ethglobal.com/showcase/wamia-z11ah)).
- "A program that runs is not a program that is safe. The VM does not check jump targets, instruction order, flag alignment or parameter sanity" (DESCRIPTION.md).
- SwapVM ships `CoreInvariants` (symmetry, quote/swap consistency, monotonicity, additivity, rounding favours the maker, balance sufficiency, liveness) (DESCRIPTION.md). OddsFlow ran them against its own opcode ([OddsFlow](https://ethglobal.com/showcase/oddsflow-fwsnb)).
- Aqua "doesn't hold tokens - it maintains allowance records"; `ship(app, strategy, tokens, amounts)`, `dock(...)`, `pull(...)`, `push(...)`; strategies are "Immutable once shipped" ([aqua README](https://github.com/1inch/aqua)).
- Deployed addresses, "deterministic deployments with the same address on every chain": Aqua `0x1111113ccf1426a8e30e2bff5e005d929bf6a90a`, SwapVM router `0x111111338c5091e8440b67b168bae16a668ac0de`, on 17 chains: Ethereum, Base, Optimism, Polygon, Arbitrum One, Avalanche, BNB Smart Chain, Linea, Sonic, Unichain, Gnosis, zkSync Era, Robinhood Chain (4663), Cronos, Monad, HyperEVM and Arc (5042). No testnet is listed ([aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md)). The deployed v1.0.2 opcode table differs from swap-vm HEAD: Lotus reports that a fork test found the deployed router to be an older build with 28 opcodes ([Lotus](https://ethglobal.com/showcase/lotus-9vnou)) and Solvent-aqua had to add a translator to its fork tests ([Solvent-aqua](https://ethglobal.com/showcase/solvent-aqua-mnxcm)).
- Starter: `1inch/swap-vm-template` (Hardhat, `AquaAMM`, `MockTaker`, deploy scripts that deploy Aqua, AquaAMM and AquaSwapVMRouter) is linked from the NYC 2026 prize page and is archived read-only ([template](https://github.com/1inch/swap-vm-template); [NYC 2026 prizes](https://ethglobal.com/events/newyork2026/prizes/1inch)).

---

## 1. Summary table (Judgement)

| # | Idea | Type | Partner stack (max 3) | EF | Difficulty | Team fit | Rank |
|---|---|---|---|---|---|---|---|
| 1 | **Reserve Gate**: an LST and bridged-asset maker that will not buy unbacked supply | Natural stack | 1inch + Chainlink CRE | none | Medium | Excellent | 1 |
| 2 | **Greenshoe**: post-auction price stabilisation from the issuer's own wallet | Natural stack | 1inch + Uniswap (CCA) | none | Medium-high | Good | 2 |
| 3 | **Plimsoll**: a shared maker vault that refuses to ship an unsafe SwapVM program | Narrow, 1inch only | 1inch only | none (CROPS "Secure dev tool" is a stretch) | Medium-high | Excellent | 3 |
| 4 | **Closing Bell**: a tokenized-stock maker that knows when the exchange is shut | Natural stack | 1inch + Chainlink CRE | none | Medium | Good | 4 |
| 5 | **Repo Desk**: delivery-versus-payment term repo quoted from a lender's wallet | Natural stack | 1inch + Whitechain Tokenize | none | High | Good | 5 (rule risk) |

**Judgement on the pattern each idea leans on.** The last five Aqua rooms paid for (a) a named financial user with a dated real-world failure (Wamia's Pendle PT attack of 25 Aug 2026, watermark's ENS DAO sale of 10,000 ETH at 2% slippage), (b) custom SwapVM opcodes that make the position refuse something on chain, and (c) evidence a judge can rerun (fork replays, `CoreInvariants`, byte-for-byte TypeScript and Solidity parity, FEEDBACK.md). Ideas 1, 3 and 4 put a refusal on stage; ideas 2 and 5 port a TradFi instrument (greenshoe, repo) that no Aqua entry has built.

---

## 2. Idea 1: Reserve Gate

**One-line pitch.** An Aqua maker on an L2 that quotes ETH against bridged and restaked tokens (rsETH, wstETH and similar) at their live rate from one shared ETH balance, but whose SwapVM program refuses to buy any token whose L2 supply is no longer covered by the escrow or staking contract that backs it on Ethereum.

**Why now (sourced).** On 18 Apr 2026 at 17:35 UTC a forged LayerZero packet, presented as coming from Unichain, made Kelp's rsETH OFT adapter release 116,500 rsETH from the Ethereum escrow in one transaction; 112,204 rsETH, about 15% of post-exploit supply, became unbacked; the attacker borrowed an estimated $236 million in WETH and wstETH against rsETH on Aave, Compound and Euler rather than selling on DEXs; Kelp paused after 46 minutes and Aave froze rsETH markets after 77 ([Galaxy Research, 22 Apr 2026](https://www.galaxy.com/insights/research/kelpdao-layerzero-exploit-defi); summary of the page). DefiLlama also lists Liquid Network, $320M on 6 Sep 2026, as an "unbacked cross-chain mint" ([DefiLlama hacks API](https://api.llama.fi/hacks), via `track_ideas/00_season.md` section 1.1). Oracle-rate makers for LSTs and wrapped assets were a popular Aqua pattern in 2026: RateSpace and Aquawrap at Tokyo, Aquifer at ETHOnline, none placed ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026); [Aquifer](https://ethglobal.com/showcase/aquifer-gy9hw)). **Judgement:** any venue that accepts a bridged token at its rate is the exit for an escrow break; in April it was lending markets, and an Aqua maker quoting rsETH at its rate on Arbitrum would have been the same exit. The tell was cross-chain: Ethereum supply did not change, the escrow did.

**Falsifiable promise.** "Replay an escrow release like Kelp's on a fork and try to sell the now-unbacked tokens to Reserve Gate: not one wei of the maker's ETH leaves the wallet. The same sale into the plain rate-pegged strategy built from stock opcodes is filled in full."

**The 20 second demo moment.** Split screen on an Arbitrum fork (official Aqua is deployed there). Left: a stock `AquaSwapVMRouter` program (`OraclePriceAdjuster` plus `PeggedSwap`) shipped from wallet A. A script replays the escrow release on an Ethereum fork, the CRE workflow posts the new coverage to Arbitrum, and the attacker sells rsETH: wallet A pays out in full. Right: the same sale against wallet B's Reserve Gate program reverts with `CoverageBelowFloor(escrow, l2Supply)`; wallet B's ETH is unchanged. Then an honest 1 wstETH sell fills on the right and moves tokens.

**How it works.**
- Router: a redeployed `AquaSwapVMRouter` (swap-vm v1.0.2 tag) with three opcodes appended after the official table, so no official index moves (OddsFlow's pattern), against the official Aqua deployed on the fork. Fallback with zero redeploy: the same logic as one `Extruction` target on the deployed router (Wamia's pattern).
- `SupplyVelocity` (stateful, writes only in swaps): stores `(block, totalSupply)` per token; refuses when local supply grew more than a maker-set bps within N blocks (catches unbacked mints such as Liquid Network's; it would not have caught Kelp, whose Ethereum supply did not move).
- `ReserveCoverage`: reads a coverage figure (escrow or staking balance on Ethereum divided by circulating supply on this chain) from a receiver contract fed by a Chainlink CRE workflow that reads both chains, for example the OFT adapter's escrow balance for rsETH or `stETH.getTotalPooledEther()` for wstETH; refuses when coverage drops below a floor or the reading is stale. This is the check that catches a Kelp-style release.
- `RateAnchor`: prices at the token's own exchange rate with a maker spread; size is clamped so a single fill cannot exceed a maker-set share of the shared ETH balance.
- Foundry: fork tests against real wstETH and rsETH contracts, `CoreInvariants` on the composed program, a fuzz property: for any escrow release or mint sequence that drops coverage below the floor, maker ETH out equals 0.

**Requirement fit.** R1: an LP position that market-makes several LSTs from one ETH balance with per-asset risk rules. R2: Foundry fork tests plus a small React page (ship, dock, replay). R3: three custom SwapVM instructions carry the rule. R4: official Aqua; modified SwapVM router redeployed (allowed), or `Extruction` on the deployed router. R5: real WETH and rsETH or wstETH transfers on Arbitrum and Ethereum forks. R6: commit plan in section 7. Won't place: none published.

**Why 1inch judges would pick it over rivals (Judgement tied to section 5 of the dossier).** It repeats Wamia's winning recipe (2nd, Tokyo): a dated real loss (Kelp, 18 Apr 2026), a fork replay, a position that "refused to quote" when the signal looked wrong, and live onchain reads "never from taker-supplied data". It also has Ballast's measurable before-and-after (4th, NYC: on a pool set 2x off-market, about 11.9 ETH for 10,000 DAI without its anchor versus 5.94 WETH with it, per the project page) ([Ballast](https://ethglobal.com/showcase/ballast-7jpyp)). Rivals at Mumbai will likely bring oracle-rate makers without a supply check, or solvency checkers about the maker's own balance (both Solvents).

**Closest past entries and the difference.**
- Wamia (Tokyo 2nd): guards against price manipulation of Pendle PT; Reserve Gate guards against counterfeit supply of the asset being bought.
- Solvent (ETHOnline 2026 winner) and Solvent-aqua (no prize): the maker's own overcommitment; Reserve Gate checks the asset's backing, not the maker's.
- RateSpace, Aquawrap, Aquifer (no 1inch prize): oracle-rate pricing with no backing check. The twist is the supply-side refusal.

**Stack options.** Chainlink "Best workflow with CRE" ($1,500): the reserve reader is a CRE workflow that reads one chain and writes another, which matches "Integrate at least one blockchain with an external API, system, data source" and accepts a CLI simulation ([Mumbai Chainlink](https://ethglobal.com/events/mumbai/prizes/chainlink)). Third slot optional: Arkiv "Mirror something Ethereum depends on" only if the reserve history is mirrored there (**Judgement:** weak, skip unless the Arkiv workshop says reserve feeds count). EF: none fits honestly.

**Difficulty for 36 hours.** Medium. Hard part: making the replay credible across two forks. If the April blocks are not replayable on a public archive RPC, run a "synthetic replay": impersonate the adapter on a fork of the real rsETH contracts, release from the escrow, and say so on stage. Do not present it as Kelp's exact transaction unless it is.

**Team fit.** Excellent: it is an audit finding turned into an opcode, and the fuzzing and fork-test skills are the product.

---

## 3. Idea 2: Greenshoe

**One-line pitch.** After a Uniswap Continuous Clearing Auction clears, the issuer ships a slice of the proceeds to an Aqua strategy that buys its token back only below the auction's own clearing price, for a fixed window and budget, which is what an IPO underwriter's greenshoe does, except the cash never leaves the issuer's Safe.

**Why now (sourced).** CCA launched in November 2025, reached the Uniswap web app in February 2026 and got no-code creation in June 2026 (`track_ideas/00_season.md`, section 1.6, citing [The Block](https://www.theblock.co/post/378864/uniswap-continuous-clearing-auctions) and [Uniswap blog](https://blog.uniswap.org/token-auctions-are-coming-to-the-uniswap-web-app)). CCA factories are deployed at canonical addresses, for example v2.1.0 `0x000000001F26a0044BaA66024e7b6599c61963F8` ([CCA repo](https://github.com/Uniswap/continuous-clearing-auction)). Kura (Tokyo finalist, Uniswap 1st) used a CCA ([Kura](https://ethglobal.com/showcase/kura-so3wx)).

**Falsifiable promise.** "For 30 days after the auction, no seller can get a price below 97% of the clearing price while the budget lasts, and the issuer's USDC moves only in a fill that delivers tokens to the issuer at or below the clearing price."

**The 20 second demo moment.** The auction clears at P on a fork. A whale dumps 5% of supply. The chart shows each fill landing on the 0.97 P line and the Safe's token balance rising as USDC leaves. The script then warps 31 days and repeats the dump: Greenshoe returns zero and the swap reverts with `WindowClosed`.

**How it works.**
- `ClearingAnchor` reads the CCA's own `clearingPrice()` (a Q96 price) once `block.number > endBlock()` and `isGraduated()` is true, so the anchor is the market's own price discovery, not an oracle ([IContinuousClearingAuction.sol](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IContinuousClearingAuction.sol)). The interface documentation warns that the live value can run ahead of the latest checkpoint, so the opcode calls it only after the end block and the first stabilisation fill pins it.
- `StabilisationBand` bids only below the anchor, at a maker-set discount; there is no ask side by default.
- `BudgetWindow` caps cumulative USDC out (stateful, written in swaps) and stops at the window end; `PerBlockCap` limits a single block's buyback.
- Optional overallotment leg: tokens the issuer kept back are offered only above P (the other half of a greenshoe).
- UI: one page for the issuer (ship from Safe, budget left, fills) and one for the public (band, fills, "remaining defence").

**Requirement fit.** R1: issuer-side stabilisation book, a structured position with budget, window and band. R2: Foundry fork tests and the UI. R3: three appended opcodes. R4: official Aqua on a mainnet fork, modified router redeployed. R5: USDC and token transfers in the fills. R6: section 7.

**Why 1inch judges would pick it (Judgement).** It is a new financial instrument in the style of Lotus (2nd, NYC: "sell on the way up, never re-buy") and watermark (3rd, Tokyo: a treasury that quotes instead of taking), with a TradFi name every judge recognises. It uses the Aqua property that matters most (the budget stays in the Safe until a fill).

**Closest past entries and the difference.** Lotus (one-way sell liquidity), watermark (treasury market making with caps), Dry Powder (ETHOnline, shared-reserve dip buying, no prize). Twist: the anchor is a completed CCA's clearing price read on chain, plus the greenshoe's budget and window semantics.

**Stack options.** Uniswap Foundation "Build with Uniswap" ($10,000, four places): CCA is named in scope, and the qualification needs a public repo, FEEDBACK.md and the feedback form ([Mumbai Uniswap](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)). Third slot: none natural. EF: none.

**Difficulty.** Medium-high: CCA setup and settlement on a fork is the unknown. Fallback: read the clearing price from a CCA deployed by the team on the fork from the public factory.

**Team fit.** Good: the hard part is DeFi mechanism design and fork testing.

---

## 4. Idea 3: Plimsoll (narrow entry, tuned to 1inch only)

**One-line pitch.** A shared vault whose address is the Aqua maker; outside strategists propose SwapVM programs to run on the depositors' balance, and the vault's on-chain verifier refuses to ship any program that breaks the safety rules SwapVM's own documentation lists.

**Why 1inch specifically (sourced).** SwapVM's own docs, under "Not guaranteed": "A program that runs is not a program that is safe. The VM does not check jump targets, instruction order, flag alignment or parameter sanity; production integrations should admit only reviewed shapes with bounded parameters, and every reachable branch, including `Extruction` targets, needs the same review." They add that "Jump targets are absolute byte offsets (`uint16`) that must land on instruction boundaries; compute them from `sizeOf()`", that the curve goes "last", that `FeeProtocol` fees must stay "outside `DynamicBalances`", and that "Hooks, callbacks, `Extruction` targets and `IProtocolFeeProvider` contracts are external code chosen by the maker or taker" ([DESCRIPTION.md](https://github.com/1inch/swap-vm/blob/main/docs/DESCRIPTION.md)). The repo's `Strategies` contract builds three canonical shapes "behind an allow-listed prefix of validation-only instructions" ([swap-vm README](https://github.com/1inch/swap-vm)); nothing admits arbitrary third-party programs. **Judgement:** Plimsoll is the "admit only reviewed shapes with bounded parameters" sentence turned into a contract.

**Falsifiable promise.** "No program that breaks a published rule can be shipped from the vault's balance; a program that passes can, and fills on stage."

**The 20 second demo moment.** Four strategist submissions in a row on a fork: a misaligned jump, a program with no `RequireMinRate` floor, an `Extruction` to an unlisted contract, and a clean concentrated-liquidity program. The first three revert with `RuleBroken(3, "jump target not on instruction boundary")` and so on; the fourth ships and a taker fill moves tokens out of the vault in the same minute.

**How it works.**
- `PlimsollVault` (ERC-4626 style shares) is the Aqua maker; only the vault calls `ship` and `dock`.
- `ProgramVerifier` walks the bytecode on chain with the instruction size table of the router build it targets (v1.0.2 table, handling the HEAD mismatch the Lotus and Solvent-aqua teams hit), and enforces about ten named rules: jump targets on boundaries and forward-only, a curve as the last instruction on every reachable path, `Deadline` present, `RequireMinRate` floor within a maker-set band of a Chainlink price, fee placement, `Extruction` only to allowlisted, code-hashed targets, a per-program virtual balance cap.
- A custom opcode `VaultGuard` is prepended to every shipped program and refuses fills once the program's realised loss against the oracle passes its budget.
- CI evidence: SwapVM's `CoreInvariants` and `RoundingInvariants` run as a Foundry fuzz suite against every accepted program, and the results hash is stored with the shipment.

**Requirement fit.** R1: the position is delegated market making on pooled, still self-custodied liquidity, with bounded strategist risk. R2: tests plus a strategist console. R3: SwapVM is the subject and the guard. R4: official Aqua; a modified router only for `VaultGuard` (or `Extruction`). R5: fills transfer vault tokens on a fork. R6: section 7.

**Why 1inch judges would pick it (Judgement).** It speaks to the team that wrote the warnings, and it is the kind of contribution the 1inch room has already paid for: KSwap-VM won 3rd at Lisbon with "formal semantics for 1inch's swap-vm" and bug reports ([KSwap-VM](https://ethglobal.com/showcase/kswap-vm-aix5n)); Wamia sent "integration notes and suggestions" in FEEDBACK.md. The risk is being read as tooling: Solvent-aqua and AquaPilot, both checkers or composers, won nothing. The vault, the depositors and the strategist fee are what make it a position, so the demo opens with a depositor, not with the verifier.

**Closest past entries and the difference.** Cleverly Using Money (Buenos Aires, Aqua 2nd): an AquaVault funded from a Noir private vault, "extends it with various strategies that may be submitted through curator(s)" under ownership controls; the page describes curator control, not checks on the submitted programs ([Cleverly Using Money](https://ethglobal.com/showcase/cleverly-using-money-pogqu)); VexiHakari's AquaVault (Tokyo Continuity 1st) as a shared maker. KSwap-VM (offline proofs in K), AquaPilot (Lisbon, off-chain composer and validator, no prize), Substrat, Batas and mandate-app (ETHOnline: ENS-role delegation of positions to agents). Twist: enforcement at ship time, on chain, for arbitrary third-party programs, plus loss budgets per program.

**Stack options.** Narrow by design: no partner fits without bolted-on scope. EF "Best CROPS App" names "a dev tool where one CROPS property is the reason it exists"; Secure could be argued, but its judges want censorship resistance and privacy to hold too, so **Judgement:** do not spend the EF slot here.

**Difficulty.** Medium-high: the on-chain parser is careful byte work; the gas is fine because programs are a few hundred bytes.

**Team fit.** Excellent: it is an audit checklist compiled into a contract.

---

## 5. Idea 4: Closing Bell

**One-line pitch.** Tokenized stocks trade around the clock but their prices are only discovered when the exchange is open; Closing Bell's opcodes quote tight around the oracle during the session, shrink to a small band around the last official close when the market is shut, and stop on a split or dividend until the adjustment is posted.

**Why now (sourced).** Tokenized equities did about $37B of onchain volume in Q3 2026 (`track_ideas/00_season.md`, signal 10, marked there as resting on weak press). The weekend gap is documented by a 1inch winner: on Robinhood Chain's "stock-token weekend of 2026-08-30, while minting was closed, pushing the HIMS/USDG pool 10% cost 12 USDG in fees, and later that night the pool stood at 54.50 against a Friday close of 28.84" ([VexiHakari](https://ethglobal.com/showcase/vexihakari-y7trp)).

**Falsifiable promise.** "Between Friday's close and Monday's open, nobody can buy from the maker more than the band allows at more than 2% from Friday's close, however far the other venues move."

**The 20 second demo moment.** A timeline slider. At Friday 16:00 New York the quote widens and the size shrinks; a Saturday buy at the pumped price on another venue tries to sell into the maker at 54 and reverts with `OutsideSessionBand(28.84, 54.50)`; Monday 09:30 the band reopens and a normal fill moves tokens.

**How it works.** `SessionGate` reads a session registry (open, closed, holiday, halted) written by a Chainlink CRE workflow from an exchange calendar API, with an on-chain weekly fallback computed from `block.timestamp`; `GapBand` sets price band and decaying size from hours since close; `CorporateActionHalt` stops quoting when a split or dividend flag is set until the factor is posted. Assets: Aqua and the router are deployed on Robinhood Chain (4663) ([aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md)), where VexiHakari forked mainnet stock tokens, so a Robinhood Chain fork gives real stock tokens and official Aqua in one place (public RPC and archive depth to confirm on day one). Fallback: test tokens on an Ethereum fork.

**Requirement fit.** R1: an equity market-making position with session-aware risk. R2: tests and a timeline UI. R3: three opcodes. R4: official Aqua plus redeployed modified router. R5: fork transfers. R6: section 7.

**Why 1inch judges would pick it (Judgement).** It brings the RWA lane (in season, almost empty among finalists) into Aqua with a refusal judges can watch, and cites a 1inch winner's own measurement.

**Closest past entries and the difference.** VexiHakari (Continuity 1st at Tokyo; options on stock tokens guarded by a Uniswap v4 price), Tora-x125 and RWA Outlet (no prize), Ballast (oracle anchor). Twist: the guard is the trading calendar and corporate actions, not a price deviation.

**Stack options.** Chainlink CRE ($1,500): the calendar and halt workflow. Uniswap only if the off-hours reference is a v4 TWAP (VexiHakari's idea, so a weaker twist). EF: none.

**Difficulty.** Medium. Risk: choosing an asset and chain where Aqua is deployed; the fallback is test tokens on a fork, which weakens the story.

**Team fit.** Good.

---

## 6. Idea 5: Repo Desk

**One-line pitch.** A lender quotes term repo on a tokenized bond from its own wallet: the bond and the cash change hands in one Aqua fill, and an opcode-bound repurchase leg lets only that borrower buy the bond back at the agreed price before maturity; after maturity the lender keeps the collateral.

**Falsifiable promise.** "The borrower can always repurchase at principal plus accrued interest before maturity, nobody else can, and after maturity the repurchase reverts and the bond stays with the lender."

**The 20 second demo moment.** Open: one fill moves 100 bond tokens to the lender and 95 USDT (5% haircut) to the borrower. A third party tries to buy the bond back and reverts with `NotRepoCounterparty`. The borrower repurchases at day 7 for 95.09 USDT. A second repo is left to mature; the repurchase then reverts with `RepoMatured`.

**How it works.** One shipped program with two branches selected by `JumpIfTokenIn`: the open branch buys collateral at the haircut price and records `(borrower, amount, openedAt)` (stateful, written in swaps); the close branch sells it back only to the recorded borrower at `principal * (1 + rate * elapsed)` before maturity. Bond token: an allowlisted ERC-20 with a maturity date and coupon schedule.

**Requirement fit.** R1: secured term lending as a position. R2: tests and a two-party UI. R3: two opcodes. R4: see the risk below. R5: transfers on chain. R6: section 7.

**Why 1inch judges would pick it (Judgement).** "Lending" was one of the four examples on the first Aqua prize page ([Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes/1inch)), and fixed-income positions have placed (TenorFi, 3rd at NYC). It uses SwapVM's control flow (`JumpIfTokenIn` branches and a stateful opcode that remembers the counterparty), which no winner has shown for a two-leg trade, and it inherits the Era B habit of rewarding a TradFi instrument rebuilt on a 1inch primitive (1Option's options on the Limit Order Protocol). The nearest rival, AquaTerm (Tokyo, no prize), described "Fixed-rate term JIT lending with shared collateral across maturities"; the stage difference to show is the second leg bound to the first counterparty and the default path.

**Stack options.** Whitechain "Tokenize · Real World Finance on Whitechain" ($4,000) lists "Repo or short term lending agreements with delivery versus payment, where the asset and the stablecoin move in one transaction" as an idea, and needs Whitechain Sepolia deployment, a real USDT payment, WHITECHAIN_FEEDBACK.md and a video that shows each party ([Mumbai Whitechain](https://ethglobal.com/events/mumbai/prizes/whitechain)).

Alternative stack: Arc "Best DeFi / Onchain Finance App Built End to End in Arc Studio" ($3,000) names "Lending and borrowing, credit, and collateral systems", and official Aqua is deployed on Arc (5042) ([aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md)), but "Every Arc prize requires using Arc Studio as the starting point" ([Mumbai Arc](https://ethglobal.com/events/mumbai/prizes/arc)).

**The rule risk (Judgement).** Aqua is not deployed on Whitechain, so the Whitechain variant needs the team to deploy unmodified Aqua and a modified router there. Aqua0 deployed Aqua itself on World Chain and placed 4th at Buenos Aires, but that track did not yet say "Official Aqua/SwapVM contracts must be used" ([Aqua0](https://ethglobal.com/showcase/aqua0-u2krx); [Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes/1inch)). The Arc variant avoids that risk but takes on Arc Studio as the required starting point, and whether chain 5042 in the deployment list is Arc mainnet or its testnet must be checked. Ask at the workshop (section 8) before building.

**Closest past entries and the difference.** AquaTerm (Tokyo, JIT term lending, no prize), TenorFi (NYC 3rd, funding-rate swaps), Intentional (Lisbon, factoring withdrawal claims). Twist: a true two-leg DvP repo with counterparty-bound repurchase and a default path.

**Difficulty.** High (two chains' tooling plus the rule question). **Team fit.** Good.

---

## 7. Shared build notes (Judgement)

- **Day-one checks (Thu 21:00 to 23:00):** clone `1inch/aqua` and `1inch/swap-vm` at the release tags the deployed contracts use (Wamia named "Aqua v1.0.0 and AquaSwapVMRouter (swap-vm v1.0.2)"); confirm the deployed router's opcode table on the fork before writing indices (Lotus and Solvent-aqua both hit a mismatch); write the TypeScript and Solidity program encoders and a byte-for-byte parity test first (OddsFlow: "that parity test caught a real divergence before the UI existed").
- **Commit history (R6):** small commits from the first hour; one branch per opcode; a tagged commit when each fork test goes green; no squash at the end.
- **Evidence a judge can rerun:** one command that runs the fork demo end to end; `CoreInvariants` and the idea's own fuzz properties in CI; a FEEDBACK.md for 1inch (Wamia) and for any stacked partner that asks for one (Uniswap and Whitechain do).
- **Video:** 2:00 to 2:59 satisfies every combination at Mumbai (`track_ideas/00_current_tracks.md`).

---

## 8. Workshop questions for 1inch (Thu 5 Nov, 17:30 to 18:00 IST, Workshop Room 2, "Reimagining the AMM with 1inch Aqua", Tanner Moore)

Source of slot: [Mumbai event page](https://ethglobal.com/events/mumbai), via `track_ideas/00_current_tracks.md`. It clashes with World (17:30, Room 1); send one person.

1. Does a redeployed `AquaSwapVMRouter` with opcodes appended after the official table, pointed at the official Aqua, satisfy "Official Aqua/SwapVM contracts must be used"? Does an `Extruction` on the deployed router count as much as custom opcodes for "Projects that utilize SwapVM will be scored higher"?
2. Is deploying unmodified Aqua to a chain where 1inch has not deployed it (Whitechain Sepolia) acceptable, or must the demo run where the canonical Aqua lives? (Decides idea 5.)
3. Which router build and opcode table is live on which chains, and which `swap-vm` tag matches it? Lotus found a 28-opcode build and Solvent-aqua needed a translator.
4. Is there an official Aqua deployment on any testnet (watermark says "Live on Sepolia, on the official Aqua registry"; OddsFlow says "Aqua has no testnet")? Do judges weigh a mainnet fork the same as a public testnet?
5. Does a vault contract acting as the Aqua maker (ideas 3 and 5; VexiHakari's AquaVault) count as a "position", or do judges want an end user's wallet as the maker?
6. For an `Extruction` or stateful opcode, may it write storage during swaps (DESCRIPTION.md: they "may read storage in quotes but write only in swaps"), and are there reentrancy expectations beyond the per-order transient lock?
7. Will 1inch read a FEEDBACK.md, and is reporting a SwapVM issue found while fuzzing welcome during the event (the README asks for private disclosure)?
8. Is a 4th place possible (NYC 2026 had four places; Mumbai lists three)?

---

## 9. Track combo pass (Judgement)

Rules: at most 3 partner prizes; a partner with several tracks counts once; at most one EF prize; the ETHGlobal finalist track does not count ([Mumbai FAQ](https://ethglobal.com/events/mumbai), via `track_ideas/00_current_tracks.md`).

| Idea | Partner 1 | Partner 2 | Partner 3 | EF | Finalist bet |
|---|---|---|---|---|---|
| Reserve Gate | 1inch Build an Aqua App ($5,000) | Chainlink Best workflow with CRE ($1,500) | (open; only add a third partner whose requirement the build already meets) | none | Yes: a refusal plus a fork replay of a dated 2026 loss |
| Greenshoe | 1inch | Uniswap Build with Uniswap ($10,000) | (open) | none | Possible: TradFi instrument, clear chart |
| Plimsoll | 1inch | none | none | none | Weak for generalists; strong for 1inch |
| Closing Bell | 1inch | Chainlink CRE | Uniswap only with a v4 TWAP reference | none | Possible |
| Repo Desk | 1inch | Whitechain Tokenize ($4,000) or Arc DeFi in Arc Studio ($3,000), not both | (open) | none | Possible if the chain question is settled |

- **Pairing with the team's plans (A to E).** None of the plans uses Aqua (plans/A to E list 1inch as "Skip" or "no fit"), so a 1inch entry is a separate project, not a stack. **Judgement:** a 1inch idea replaces a plan rather than stacking on it; with three people, do not split across two builds. If the team stays with a plan, the 1inch prize is simply not in play.
- **Best single combo for prize expectation:** Greenshoe (1inch $5,000 + Uniswap $10,000 pool, both with three or four places). **Best combo for the finalist room:** Reserve Gate (security refusal on stage, in-season loss story, replayable numbers).
