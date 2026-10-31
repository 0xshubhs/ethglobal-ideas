# Uniswap Foundation: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: the Uniswap Foundation's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only.

In scope: **Build with Uniswap** ($10,000 USDC; 1st $4,000, 2nd $3,000, 3rd $2,000, 4th $1,000; category `building-from-scratch`). Out of scope: the $5,000 "Build with Uniswap" twin, which is Continuity only. ([Mumbai Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria, fetched 2026-10-31), `track_ideas/history/uniswap.md` (dossier, cited as [H]), `track_ideas/ideas_draft/uniswap.md` (draft), `track_ideas/00_season.md` (season brief), the finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` (cited as [CAT]) and `plans/`. ETHGlobal pages were not re-fetched, since the 31 Oct snapshot already holds them verbatim. On 2026-10-31 I re-checked the Uniswap docs and the exploit post-mortems that the ideas depend on (links inline).

---

## 1. What the Uniswap Foundation's judges reward

### Sourced facts

- The Mumbai track text is word for word the text of Tokyo 2026's and ETHOnline 2026's "Best Uniswap Stack Contribution", renamed, with the largest fresh pool since Buenos Aires 2025 and a 4th place ([H] sections 2.6 and 6; [Tokyo 2026 prizes](https://ethglobal.com/events/tokyo2026/prizes/uniswap-foundation)).
- Scope, verbatim: "Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol. This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem." ([Mumbai Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation))
- Qualifications, verbatim: "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file." Then: "Submissions without it will be reviewed and audited before winners are finalized. Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration." (same page)
- No numeric rubric, no "What we want to see" list and no "Won't place" list are published. (same page; `track_ideas/00_current_tracks.md`)
- Partner prizes are judged only from the repo, README and video: "partners will evaluate submissions based on the materials you provide." ([details page](https://ethglobal.com/events/mumbai/info/details))
- Fresh-era winners at the two events with this exact text: Tokyo 2026 fresh 1st **Kura** (CCA whose validation hook admits only World ID humans, settlement into a v4 pool, fork tests "against the real Uniswap, Permit2, USDC and ENS contracts"), 2nd **Bailiff** (liquidates restricted RWA collateral through a v4 permissioned pool; "If the sale cannot cover the debt, everything reverts"), 3rd **OniBlock** (AI-set fee sensitivity that "loses power if it's wrong"); ETHOnline 2026 pool **TARE** ("an inert 89-byte stub", "125,072 measurements, 7,817 pools, 112 hooks") and **Otter** (an IACR ePrint MEV-resilient AMM as a hook, attacker captures "92% of the victim's trade on a plain pool") ([H] section 3.3; [Kura](https://ethglobal.com/showcase/kura-so3wx); [Bailiff](https://ethglobal.com/showcase/bailiff-368x0); [TARE](https://ethglobal.com/showcase/tare-ozced); [Otter](https://ethglobal.com/showcase/otter-barha)).
- Non-winners at the same events: at least five hook-risk scanners at ETHOnline 2026 (Pool Party hookrisk, AlphaScanner, ALFQuote, SwapGuard, reCEPTION Swap) and HookLens at Open Agents won nothing; at Tokyo, Recycle CCA, Hank0, Sworn and many agent-permission builds won nothing ([H] section 4.5).
- Field size: online and agent-themed events drew 50 to 100 Uniswap-mentioning entries for 3 to 6 prizes (HackMoney 96, ETHOnline 80, Tokyo 50) ([H] section 4.1).
- Uniswap's docs now present CCA and the Liquidity Launchpad, Uniswap Labs Hooks (Permissioned Pools, StablePair, VolatilePair), TJAR, The Compact and Calibur ([docs index](https://developers.uniswap.org/llms.txt)); the workshop covers "the Uniswap API, v4 hooks, Uniswap AI, and open-source tooling" (Thu 5 Nov 16:30 IST, Workshop Room 1, Angela Ocando) ([event page](https://ethglobal.com/events/mumbai)).

### Judgement: what these judges will reward (ranked)

1. **Centrality.** Delete the Uniswap part and the product disappears. Every 1st place from Buenos Aires to Tokyo passes this test ([H] 4.6).
2. **The newest surface in the scope sentence, used correctly.** CCA won its first prize at Tokyo, two events after it entered the text; permissioned pools placed the same week they appeared in the docs. TJAR and Uniswap AI have no winner yet.
3. **A number or a refusal a judge can replay.** TARE and Otter beat the scanners because each row carries a reproduction command. The README must point at lines (it is a written qualification now).
4. **FEEDBACK.md as real developer research.** The form and FEEDBACK.md are mandatory, and Uniswap has asked for "bugs you hit, docs gaps, DX friction, missing endpoints" since Open Agents ([H] 2.5). Specific, reproducible friction is cheap points.
5. **Not rewarded:** LLM wrappers in front of an existing swap, MCP servers, chat UIs, hook scanners that label instead of measuring, and plain dynamic-fee hooks.

### Judgement: the obvious entries we assume several teams will submit

- An AI agent that rebalances v4 LP positions through the Uniswap API.
- A dynamic-fee or "MEV tax" hook (volatility, oracle, Kalman filter).
- A CCA token launchpad gated by World ID, copied from Kura.
- An AI hook auditor or hook risk scanner with a red, amber, green score.
- A Telegram, X or chat bot that swaps through the Trading API, possibly with a UPI or INR on-ramp for the Mumbai crowd.

Each final idea below must beat all five on at least one property a judge can check.

---

## 2. Rubric used (Judgement)

The track has no numeric criteria and no "What we want to see" items, so the criteria are taken from the only verbatim sentences that say what is wanted: the scope sentence and the README qualification.

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| C | Centrality and depth of the Uniswap integration | "Build on or integrate any part of the Uniswap stack" | 25% |
| E | Value to the broader ecosystem or official repositories | "improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem" | 15% |
| V | Verifiability from repo, README and video | "points to the relevant contracts and lines of code so we can verify your integration" | 10% |
| Nov | Novelty versus past Uniswap winners and the expected Mumbai field | Task | 25% |
| Fea | Feasibility in 36 hours for this team | Task | 25% |

Overall = weighted sum, rounded to one decimal. Novelty and Feasibility carry half the weight because the qualifications are pass or fail and every entrant can claim centrality.

Qualification checks applied to every idea (sources: [Mumbai Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation), [details page](https://ethglobal.com/events/mumbai/info/details)):

- **R1** in scope (the scope sentence above).
- **R2** public open-source repo, `FEEDBACK.md`, and the Developer Feedback Form completed with the FEEDBACK.md link.
- **R4** README "Uniswap integration" section with GitHub permalinks to every contract and call site, plus addresses and transaction hashes.
- **ETHGlobal rules:** all code written after Thu 5 Nov 21:00 IST; steady commits ("Submissions with large single commits or missing histories may be disqualified"); AI-use attribution and any spec files committed; video 2 to 4 minutes, human voice.
- **Won't place:** none published. Implied disqualifiers (Judgement): missing FEEDBACK.md or form, closed code, a README a judge cannot trace, pre-existing project code.

---

## 3. Vetting the five draft ideas

| Draft idea | C | E | V | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1. Bidproof (CCA bid that refuses a rigged auction) | 9 | 7 | 9 | 8 | 7 | 8.0 | None. The demo uses only auctions the team built, so it proves the tool, not the problem. The draft quotes the CCA doc in wording that the current doc no longer carries (re-checked below) | **Revise**: add a scan of every real CCA ever created by the factory; fix the quotes; be precise about who loses |
| 2. Exit Ledger (can an LP leave this hooked pool?) | 8 | 7 | 9 | 5 | 6 | 6.7 | None formal. Arkiv requires that "The data's license allows republishing"; the `uniroute-public` allowlist licence is unknown. Null-result risk: few hooks with real TVL have `beforeRemoveLiquidity`, so "all OK" is likely and reads like a scanner | **Revise**: measure exit cost and owner powers, mirror only chain-derived data |
| 3. Leakproof (fuzzing the Permissioned Pools promise) | 8 | 8 | 8 | 6 | 4 | 6.5 | The overview page names no public repo, no testnet deployment and no audit ([Permissioned Pools overview](https://developers.uniswap.org/docs/protocols/uniswap-labs-hooks/permissioned-pools/overview)). If the campaign finds a real bug, it cannot be published in a public hackathon repo, so the shippable demo is only planted mutants | **Drop**, replaced by HookBreak |
| 4. Residue-free swap (Permit2 in one frame tx) | 4 | 5 | 7 | 7 | 3 | 5.0 | None formal, but the novelty sits in the EF primitive and Uniswap is the venue only; depends on which devnet has ASSERT frames plus Permit2 and Universal Router | **Drop**, replaced by Jarwatch. Keep it as a third slot for an EF-led project (section 6) |
| 5. Humancap (one human, one capped CCA allocation) | 9 | 5 | 8 | 3 | 7 | 6.3 | None. "CCA plus World ID" is the obvious post-Kura idea at Mumbai and the closest to a past 1st place | **Revise**: lead with the split attack, publish the price-discovery effect, ship as the World stack |

No draft idea depends on pre-existing project code. Plans A to E use Uniswap only as a conditional third slot (Plan A, gate G3) or skip it (B, C, D, E) (`plans/A_verified_anon_reads.md`, `plans/B_dapp_leak_report.md`, `plans/C_private_invoicing_whitechain.md`, `plans/D_alt_mempool.md`, `plans/E_verified_frontend.md`).

### Facts re-checked on 2026-10-31 that change the ideas

- CCA technical documentation, as served today: "It is the responsibility of the bidder to validate all parameters before participating in an auction"; "the last block of the auction MUST sell a significant amount of tokens"; small tick spacing "can result in a DoS attack where the auction cannot finish"; the validation hook is `function validate(uint256 maxPrice, uint128 amount, address owner, address sender, bytes calldata hookData) external;`; `lbpInitializationParams()` returns the final clearing price, tokens cleared and post-fee currency raised for "a downstream `ILBPInitializer` strategy that initializes a Uniswap v4 pool"; and "no bids can be exited before the auction has graduated" (the `exitBid` section words this differently, so check the code) ([CCA TechnicalDocumentation.md](https://raw.githubusercontent.com/Uniswap/continuous-clearing-auction/main/docs/TechnicalDocumentation.md)). **Consequence:** a bid is locked once placed, so a pre-bid check is the only protection a bidder has.
- CCA Factory v2.1.0 `0x000000001F26a0044BaA66024e7b6599c61963F8` on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain and Sepolia ("versions before v2.0.0 should not be used"); LiquidityLauncher v3.2.0 `0x0000FffFBE8efE702c8703aE3477FF5dE3d319C0`; LBPStrategy v3.3.0 per chain, including Sepolia `0x95434E898Af471945Cab33D5064d2aC1A6Ba2000`, Base Sepolia `0x73ad52384798AdADfBe19fCfD28ff09D2CC82000` and Arc `0x542BCDA1015485ef0B1cD11B835DC58DF5102000`. No CCA factory is listed for Arc ([Liquidity Launchpad deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)).
- TJAR: "a pair of immutable contracts" that turn fees in many assets into one chosen token; the Releaser "releases the jar's contents to any searcher who sends a fixed amount of a token the jar's operator chooses", via `release(nonce, assets, recipient, maxFee)`; "No oracle sets the price"; Uniswap uses it for its own protocol fees "where the chosen token is UNI and the destination is a burn address" ([TJAR overview](https://developers.uniswap.org/docs/protocols/tjar/overview)). Factory `0xfAc70EEEE259F2140CBbB8e3157b75A52ce39fee` and FeeController `0xfEeC0FEE579Be52a5409cd75a42bCc9E6b149EF8` on Ethereum, Optimism, BNB Chain, Polygon, Base, Arbitrum and Robinhood Chain; jars are found through `JarDeployed` events ([TJAR deployments](https://developers.uniswap.org/docs/protocols/tjar/deployments)). For protocol fees, `Firepit.threshold()` is the UNI amount required to call `release()` and governance can change it ([Protocol fees](https://developers.uniswap.org/docs/protocols/protocol-fee/overview)).
- Hook exploits: Cork Protocol (28 May 2025, about $11M to $12M, 3,761 wstETH): `CorkHook` did not restrict who could call `beforeSwap`, and the attacker called it directly with crafted parameters ([Dedaub](https://dedaub.com/blog/the-11m-cork-protocol-hack-a-critical-lesson-in-uniswap-v4-hook-security/); [BlockSec](https://blocksec.com/blog/cork-protocol-incident-two-independent-flaws-combine-into-one-devastating-exploit-chain); [Cork post-mortem](https://www.cork.tech/blog/post-mortem)). Bunni v2 (2 Sep 2025, about $8.4M): rounding direction when updating idle balances during withdrawals, exploited with a flash-loaned swap, 44 tiny withdrawals and a sandwich; Bunni later shut down ([BlockSec](https://blocksec.com/blog/bunni-incident-repeated-small-withdrawals-compound-a-rounding-error-into-an-8.4m-drain); [The Block](https://www.theblock.co/post/369564/bunni-smart-contract-rounding-error); [The Block, shutdown](https://www.theblock.co/post/375813/bunni-dex-shuts-down)).
- Prior art to beat: Aegis402 (2026 finalist, no partner prize) demoed blocking payments to "a deliberately vulnerable Uniswap v4 hook" (missing access control, tx.origin auth, replayable IDs) ([CAT] `finalists_2026.md`). An official Uniswap AI skill already exists for protocol-fee searchers ("seek-protocol-fees"), and `v4-security-foundations` exists for hook authors ([Uniswap Skills](https://developers.uniswap.org/docs/uniswap-ai/skills)).

---

## 4. Final ranked table: Build with Uniswap

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Bidproof: every real CCA checked before you bid, and a bid that refuses a rigged one | 8.4 | Revise (done below) | Uniswap only (finalist track separately) |
| 2 | Jarwatch: a replayable ledger of every protocol-fee release, and a jar for your own hook | 7.5 | New (replaces Residue-free swap) | Uniswap (+ Arkiv Mirror, optional and weak) |
| 3 | HookBreak: a hook fuzz kit that rediscovers the Cork and Bunni exploits from scratch | 7.3 | New (replaces Leakproof) | Uniswap only (finalist track separately) |
| 4 | Exit Ledger: what it costs an LP to leave each hooked pool, and who can change that tomorrow | 7.2 | Revise (done below) | Uniswap + Arkiv "Mirror something Ethereum depends on" |
| 5 | Humancap: one budget per human across all wallets in a CCA, with the split attack shown failing | 6.6 | Revise (done below) | Uniswap + World "Best Use of IDKit" |

**Shared gates (Judgement).** Ideas 1 and 5 both need a working CCA on Sepolia or a fork; ideas 3 and 4 share a fork-and-impersonate harness. Build one project; if its gate fails, the pivot is the idea that reuses its harness (1 to 5, 3 to 4).

---

## 5. The final ideas in full

### Rank 1. Bidproof: every real CCA checked before you bid, and a bid that refuses a rigged one

**Pitch.** Uniswap's CCA documentation says it is "the responsibility of the bidder to validate all parameters", and a bid cannot leave before graduation. Bidproof does that validation for every CCA ever created through the factory, publishes the result with a replay command per auction, and ships a router whose `submitBidIfSafe` reverts on an auction that fails the bidder's policy. Uniswap AI ships skills for auction creators; Bidproof is the bidder's side.

**Falsifiable promise.** "For every auction the v2 factories have created on Ethereum, Base, Unichain and Arbitrum, our table states its final-step share, tick spacing against floor, token decimals and transfer behaviour, validation hook, and LP recipient lockup. Pick any row and one command recomputes it from chain state at the stated block. For any auction we mark 'handoff movable', we push the handoff price by the stated percentage for the stated cost on a fork in front of you; and the same bid that fills on an honest auction reverts on a rigged one."

**Demo moment (20 seconds).** The scan header: "N auctions scanned, K with a final step under 1% of supply" (the real numbers, whatever they are). Then two auctions of the same token on a Sepolia fork, both created through the real factory: the honest one fills; the rigged one (final step 0.2% of supply, LP recipient a bare EOA) reverts with `Unsafe(FINAL_STEP_SHARE, LP_UNLOCKED)`. The simulator spends the printed amount in the last block, and the v4 pool initializes at the predicted tick.

**How it works.**
- `scan`: TypeScript indexer over factory creation events on four chains; for each auction reads parameters and the step schedule, the LBPStrategy and position recipient, and probes the token on a fork (decimals, fee-on-transfer via a transfer inside a call that reverts and reports the balance delta). Output: a JSON table plus a static page, each row carrying `block` and a `cast`/Foundry replay command.
- `BidproofRouter.sol`: reads the same fields on chain, checks them against a caller-supplied policy, then forwards to the auction's bid entry point. Policy fields: minimum final-step share, minimum tick spacing as a share of floor, minimum decimals, validation hook code hash allowlist, LBPStrategy address on the published deployments list, recipient lock.
- `sim`: Foundry script that searches last-block bid sizes (brute force first, bisection later) for the cheapest bid that moves `lbpInitializationParams()` clearing price by a target, and prints the cost.
- Optional upstream: a `cca-bid-check` skill PR to `uniswap/uniswap-ai`.

```solidity
interface IBidproofRouter {
    struct Policy {
        uint16 minFinalStepBps;
        uint16 minTickSpacingBpsOfFloor;
        uint8 minDecimals;
        bool requireLockedRecipient;
        bytes32[] allowedHookCodeHashes;
    }
    function check(address auction, Policy calldata policy) external view returns (bool ok, uint256 failureMask);
    function submitBidIfSafe(address auction, uint256 maxPrice, uint128 amount, Policy calldata policy, bytes calldata hookData) external payable returns (uint256 bidId);
}
```

**Go or no-go gate (hours 0 to 4).** (a) Count factory auctions on mainnet and Base; if fewer than 10 real auctions exist, the scan becomes a short appendix and the router plus simulator carry the entry. (b) Confirm the step schedule and recipient are readable on chain (if the schedule is only in creation calldata, decode it from the creation transaction). (c) Create one auction through the Sepolia factory and fill one bid.

**Requirement checklist.**
- [x] R1: CCA, Liquidity Launcher, LBPStrategy and the v4 pool handoff are the subject; the scan is "tooling or solutions built for the broader ecosystem"; the skill PR is an official-repo improvement.
- [x] R2: MIT repo; FEEDBACK.md written during the build (the CCA docs disagree with themselves on exits, which is exactly the feedback Uniswap asks for); form submitted with the link.
- [x] R4: README table with permalinks to each factory read, `lbpInitializationParams` call, bid forwarding line and fork test; Sepolia addresses and tx hashes.
- [x] Fresh build; public libraries only (Foundry, viem, CCA interfaces).
- [x] No pre-existing code. Won't place: none published; no implied disqualifier hit.
- [ ] Risk: publishing per-auction "unsafe" labels about named live auctions. Show counts and rule failures; ask the workshop whether to name auctions (question 2).

**Why it beats rivals (Judgement).** The obvious CCA entries are launchpads and Kura clones, all on the creator side. Bidproof is the only one on the side the docs leave exposed, and it brings a population number (TARE's winning recipe) plus a live refusal (Bailiff's). It also beats the hook scanners because each verdict is a recomputable fact, not a risk score.

**Closest prior winners.**
- [Kura](https://ethglobal.com/showcase/kura-so3wx), Tokyo 2026 fresh 1st: CCA made safe for the seller against bots. Bidproof makes it safe for the bidder against the seller.
- [TARE](https://ethglobal.com/showcase/tare-ozced), ETHOnline 2026: population measurement of hooks with replayable rows. Bidproof applies the method to auctions.
- Recycle CCA (Tokyo 2026, no prize): re-bids stranded capital; a bidder tool without a safety claim ([H] 4.5).

**Stack.** Uniswap only. EF CROPS as a "Secure" tool is a weak fit (the CROPS property is not why the app exists). Finalist track: strong, because the 4 minute demo has a number, a refusal and a live attack.

**Difficulty.** Medium. The time sink is the multi-chain indexer; cap it at four chains and v2.0.0 plus v2.1.0 factories.

**Scores.**

| C | E | V | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 9 | 8 | 9 | 9 | 7 | **8.4** |

**Judge notes (Judgement).**
- Uniswap judge: "Our docs literally tell bidders to do this and nobody built it. If the scan is honest about the auctions that pass, we will trust the ones that fail."
- Uniswap judge: "Do not call our auctions rigged in the README. Say which rule failed and let the reader decide."
- Veteran: "Be exact about who loses when the handoff price is pushed: the last-block buyers and whoever trades against the seeded pool, not every bidder. A wrong victim claim in Q and A sinks the finalist pitch."

---

### Rank 2. Jarwatch: a replayable ledger of every protocol-fee release, and a jar for your own hook

**Pitch.** Since the fee switch, Uniswap's protocol fees pile up in a TokenJar and leave only when a searcher burns a fixed amount of UNI through the Firepit releaser; no oracle sets the price. Jarwatch prices every release at its block and publishes the gap between what the searcher took and the UNI burned, so the DAO can see what its threshold leaves on the table. Then it uses the same TJAR primitive for something new: a v4 hook whose hook fees go into its own jar, with a threshold calibrated from that history.

**Falsifiable promise.** "For every `release` on the chains where the protocol fee is on, we print the assets taken, their value at that block from Uniswap pool prices, the UNI burned and its value, and the searcher's surplus to the wei. Pick any release: one command forks the block before it, replays the call and reproduces our numbers. Our hook's jar releases on a fork only when the burn covers the jar within the margin we published."

**Demo moment (20 seconds).** A chart of searcher surplus per release since the fee switch, with the largest one highlighted; a judge picks a row and the fork replay prints the same surplus. Then the hook demo: three swaps through a v4 pool with the team's hook fill a jar deployed by the real TJAR Factory; a searcher bot burns the project token and empties it; a second attempt with too small a burn reverts.

**How it works.**
- Indexer: TokenJar and Firepit addresses for each chain (from deployments or `JarDeployed` events on the Factory), `release` calls and transfers out of the jar, priced at the block from Uniswap v3 or v4 pool state via archive RPC; long-tail assets with no pool are listed unpriced, not guessed.
- Replay: Foundry fork at `block - 1`, `vm.prank` the searcher, call `release` with the recorded arguments, diff balances.
- `JarFeeHook.sol`: a v4 hook that takes a hook fee on swaps (`afterSwap` with return delta) and settles it to a jar created through the TJAR Factory; a `threshold` suggestion script fits the historical fee flow.
- Output also as a CSV and a static page; optional mirror to Arkiv (section 6).

**Go or no-go gate (hours 0 to 4).** (a) Find the mainnet TokenJar and Firepit and count releases; if fewer than 30, extend to every chain with the fee on, or lead with the hook. (b) Confirm the archive RPC can price assets at historic blocks. (c) Deploy one jar through the Factory on a fork and release it.

**Requirement checklist.**
- [x] R1: TJAR and the protocol fee are "any other Uniswap protocol"; the hook is a "new v4 hook"; the ledger is ecosystem tooling.
- [x] R2: repo, FEEDBACK.md (TJAR docs omit Uniswap's own jar addresses and say nothing about nonces, both real friction found today), form.
- [x] R4: permalinks to the release replay, the hook's `afterSwap` fee path and the Factory call.
- [x] Fresh build, public libraries only. Won't place: none published.
- [ ] Risk: the result may say "the threshold is efficient", which is still a finding, but a weaker video.

**Why it beats rivals (Judgement).** Nobody at an ETHGlobal event has built on TJAR, and the protocol fee is the Uniswap Foundation's biggest economic change in years. Dashboards count UNI burned; none prices what each searcher took, and none offers TJAR to hook authors as a fee sink. It is a data product with an exact claim, the shape that beat scanners at ETHOnline.

**Closest prior winners.**
- [TARE](https://ethglobal.com/showcase/tare-ozced), ETHOnline 2026: per-swap measurement of hook take. Jarwatch measures per-release value leakage of the fee mechanism.
- [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6), San Francisco 2024 1st: replays real history into a model. Jarwatch replays real releases.
- The official "seek-protocol-fees" skill helps searchers profit; Jarwatch shows the DAO what that profit is.

**Stack.** Uniswap. Arkiv "Mirror something Ethereum depends on" is possible (fee releases are public chain data with no licence issue) but its Reach criterion is thin: few apps depend on release history. Finalist track: medium; the chart is good, the WOW is modest.

**Difficulty.** Medium. Historical pricing is the hard part; restrict to assets with a Uniswap pool.

**Scores.**

| C | E | V | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 7 | 9 | 7 | 7 | **7.5** |

**Judge notes (Judgement).**
- Uniswap judge: "We would read this. Show us the threshold that would have burned more UNI, and FEEDBACK.md on TJAR docs is a bonus."
- Veteran: "Searcher surplus is the design working, not a bug. Frame it as calibration data, or a governance-minded judge will think you misunderstood the mechanism."
- Veteran: "The hook half keeps this from being only a dashboard. Do not cut it."

---

### Rank 3. HookBreak: a hook fuzz kit that rediscovers the Cork and Bunni exploits from scratch

**Pitch.** Two v4 hook exploits cost about $20M in 2025: Cork's `beforeSwap` could be called by anyone, and Bunni's withdrawals rounded the wrong way. HookBreak is a drop-in Foundry and Medusa harness for any hook: it deploys the hook in a real PoolManager on a fork, drives swaps, liquidity changes, donations and direct callback calls from attacker actors, and checks invariants every hook should keep. Pointed at the pre-exploit blocks, it finds both bugs again, with no hint of where they were.

**Falsifiable promise.** "Fork mainnet at the block before each exploit, point HookBreak at the hook address, and press run: it prints a call sequence that breaks 'only the PoolManager can drive a callback' for Cork, and 'no actor ends a round trip with more value than it started' for Bunni, as a Foundry test that passes red on the vulnerable block. On the hooks that pass, it prints the number of calls survived."

**Demo moment (20 seconds).** A terminal counts calls; within a minute the Cork property fails and a ten-line Foundry test appears; running it on the fork drains the same asset the attacker took. The Bunni run is shown from a recorded campaign with its call count and wall-clock time, then the generated test replays live in seconds.

**How it works.**
- `HookHarness.sol`: actors (LP, trader, attacker contract, attacker hook), a handler that wraps PoolManager `unlock` with swap, modify-liquidity, donate and take or settle; plus a raw-call handler that calls each hook callback directly.
- Properties: P1 direct callback from a non-PoolManager caller reverts or changes nothing; P2 every LP can exit (remove all liquidity and take); P3 no actor's value after a round trip (deposit then withdraw, swap then swap back) exceeds its start plus a tolerance; P4 PoolManager deltas net to zero after each unlock; P5 hook-held balances cover hook-tracked claims.
- Medusa for depth, with action weights favouring tiny amounts and repeated withdrawals (honest note in the README: the weights are generic, not tuned to Bunni); Foundry invariant tests as the shippable suite; a CLI that takes `--hook`, `--pool-key` and `--fork-block`.
- Upstream: the property list as a PR or issue to the `v4-security-foundations` skill in `uniswap/uniswap-ai`, and a template for `v4-template` users.
- Disclosure rule: live hooks are run only privately; the public repo shows the two historical exploits and pass counts. Any live finding goes to the hook author through a private channel (ask the workshop which).

**Go or no-go gate.** By Fri 06:00 IST: Cork reproduced on a fork. If not, the entry ships P1 to P5 against hooks the team writes with planted bugs, and drops to rank 4 strength. Bunni is the stretch target until Fri 18:00; if not found, report the honest call count and keep Cork as the demo.

**Requirement checklist.**
- [x] R1: v4 PoolManager and hooks are the subject; "tooling or solutions built for the broader ecosystem"; an official-repo contribution.
- [x] R2: repo, FEEDBACK.md (fork fuzzing friction against PoolManager, hook address mining in tests), form.
- [x] R4: permalinks to each property, the handler functions and the two reproduction tests.
- [x] Fresh build; Foundry, Medusa and v4-core and v4-periphery are public libraries. Won't place: none published.
- [ ] Risk: Bunni's pool used custom accounting; the generic harness may need a Bunni-specific adapter, which must be disclosed.

**Why it beats rivals (Judgement).** The expected "AI audits your hook" entries produce opinions; HookBreak produces a failing test on a real exploit block. Scanners lost because they labelled; this one reproduces about $20M of real losses, which is the strongest refusal-plus-number pair in the track and the team's core craft.

**Closest prior winners.**
- [TARE](https://ethglobal.com/showcase/tare-ozced), ETHOnline 2026: fork-based measurement of real hooks. HookBreak tests safety, not take.
- [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6), San Francisco 2024 1st, in a track that listed "Testing toolkits".
- [Aegis402](https://ethglobal.com/showcase/aegis402-o8x6z), 2026 finalist (no partner prize): blocked payments to a deliberately vulnerable hook it wrote itself. HookBreak works on hooks it did not write.

**Stack.** Uniswap only. No EF prize fits (the alt mempool track invites mempool fuzzers, not hook fuzzers). Finalist track: strong if Cork reproduces live.

**Difficulty.** High. Fork fuzzing is slow; cache fork state locally and run the long Bunni campaign overnight on a spare machine.

**Scores.**

| C | E | V | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 9 | 9 | 7 | 5 | **7.3** |

**Judge notes (Judgement).**
- Uniswap judge: "If this runs in CI for hook authors, it is the best ecosystem contribution in the track."
- Veteran: "Cork's bug is one property and a direct call; a judge may say that is a static check, not fuzzing. Bunni is what makes it a fuzzer. Say clearly which one you found with what hints."
- Veteran: "Never run it against live hooks in the public repo. One accidental public zero-day ends your weekend."

---

### Rank 4. Exit Ledger: what it costs an LP to leave each hooked pool, and who can change that tomorrow

**Pitch.** Routers and wallets add liquidity to hooked v4 pools, but nobody publishes what it costs to get out. For the top hooked pools by TVL, Exit Ledger withdraws a real holder's position on a fork, measures the exit cost in basis points against a no-hook baseline, records whether the hook's owner can change exit behaviour (proxy, owner setters, pause), and mirrors every row to Arkiv so anyone can filter it.

**Falsifiable promise.** "Pick any row: one command forks the stated block, impersonates the stated holder, removes all liquidity through PositionManager and prints the exact amounts and the exit cost we published, or the hook's revert. Every 'owner can change' flag points at the storage slot or function that grants it."

**Demo moment (20 seconds).** The judge filters the Arkiv-backed table for "exit cost above 0 bps or owner can pause" and picks a row; the terminal replays the withdrawal and prints the same numbers. The same query runs against the Arkiv indexer directly.

**How it works.**
- Indexer: PoolManager `Initialize` events with a non-zero hook on Unichain, Base and Ethereum; TVL from StateView; permission bits decoded from the hook address.
- Prover: for the top 50 pools per chain, find real holders from PositionManager events; on Anvil, run `decreaseLiquidity` and `take`; run again with the hook's code replaced by a stub (the TARE method applied to exits); difference = exit cost. Admin surface from EIP-1967 slots, `owner()` and known setter selectors.
- Arkiv: one entity per hooked pool (chain, pool id, hook, permission bits, exit cost bps, blocked flag, owner powers, block, replay command) written with `@arkiv-network/sdk`; only chain-derived data, so no licence question (the `uniroute-public` allowlist is added only if its licence allows republishing).

**Requirement checklist.**
- [x] R1: v4 PoolManager, PositionManager and StateView are the subject.
- [x] R2 and R4 as above, with permalinks to the PositionManager and StateView call sites.
- [x] Arkiv: fresh build, licence linked, import script re-runnable, writes to the current testnet and the UI reads from Arkiv, wallet addresses and one query in README, `/arkiv/schema.md`, `/arkiv/friction.md`, `/arkiv/reach.md`, `/arkiv/why-arkiv.md`, `/arkiv/data-quality.md` ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).
- [x] Not Sourcify data. Won't place: none published for Uniswap.
- [ ] Risk: if every top pool exits at 0 bps with no owner powers, the headline is "safe", so publish owner powers as the second column from the start.

**Why it beats rivals (Judgement).** Hook scanners won nothing; this differs by measuring the LP side with real positions and replay commands, and by having a second sponsor whose rubric pays for reach and data quality. It is the weakest on novelty of the five because TARE already owns "measure hooks on a fork".

**Closest prior winners.** [TARE](https://ethglobal.com/showcase/tare-ozced) (swap take; Exit Ledger measures exit take); [Sentinel](https://ethglobal.com/showcase/sentinel-yaqmj), Lisbon 2026 API 1st (automates an LP's exit but never asks whether the pool lets it succeed); HookLens, Open Agents (simulated swaps, no prize).

**Stack.** Uniswap + Arkiv Mirror ($4,000; 25% each on feedback, reach, why Arkiv, data quality). Third slot open; ENSv2 only if verdicts are central records, which they are not.

**Difficulty.** Medium. Cap indexing at 50 pools per chain.

**Scores.**

| C | E | V | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 7 | 9 | 6 | 7 | **7.2** |

**Judge notes (Judgement).**
- Uniswap judge: "The owner-powers column is what our routing reviewers would actually use. Lead with it if exits are all clean."
- Veteran: "Arkiv will ask who reads this after Mumbai. Name two wallets or routers and the query they would run in `reach.md`."

---

### Rank 5. Humancap: one budget per human across all wallets in a CCA, with the split attack shown failing

**Pitch.** Kura proved World ID can gate a CCA, one wallet per human. Humancap caps the **amount** a human can commit across any number of wallets, so a whale who splits across 50 addresses gets one person's share, and it publishes how much the split attack would have moved the clearing price without the cap.

**Falsifiable promise.** "One person, three wallets, a $500 cap: the first two bids fill up to $500, the third reverts with `CapExceeded`, and with 40 simulated honest bidders the clearing price path with the attacker matches the path without them to within one tick."

**Demo moment (20 seconds).** A judge verifies on a phone, bids $300 from wallet A and $300 from wallet B; B is cut to $200; wallet C reverts. A chart shows the uncapped split attack raising the clearing price and the capped run tracking the honest baseline.

**How it works.** `HumancapHook` implements the CCA `validate` interface; `hookData` carries a short-lived EIP-712 ticket signed by the app's server after IDKit verification (the server verifies the World ID proof, as the IDKit prize allows "on the server or onchain"), binding nullifier, auction and cap; the hook keeps nullifier to committed amount. Alternative path for IDKit: no credential means an "unverified" tier with a small cap, not a lockout. Simulation in Foundry over the real CCA contracts on a Sepolia fork.

```solidity
interface IHumancapHook {
    function validate(uint256 maxPrice, uint128 amount, address owner, address sender, bytes calldata hookData) external;
    function committed(bytes32 nullifier) external view returns (uint256);
    function capOf(bytes32 tier) external view returns (uint256);
}
```

**Requirement checklist.**
- [x] R1: CCA, its validation hook and the v4 handoff. R2 and R4 as above.
- [x] World IDKit: functioning flow, Proof of Human verified on the server, the specific trust event ("a fair share of a scarce allocation") and why Proof of Human is the minimum (nationality and face match are irrelevant to a fair share), success plus the unverified-tier path, integration debrief ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- [x] Fresh build. Won't place: World's "We are not rewarding the most credentials used" is met by using one.
- [ ] Risk: the server-signed ticket is a trust point; say so in the README.

**Why it beats rivals (Judgement).** It does not beat the field on novelty: several Mumbai teams will submit "CCA plus World ID". It wins only if the split attack and the price chart lead the video, because that is a measured property no Kura clone will show.

**Closest prior winners.** [Kura](https://ethglobal.com/showcase/kura-so3wx), Tokyo 2026 fresh 1st and ENSv2 3rd: gate per wallet. Humancap: budget per human, measured effect.

**Stack.** Uniswap + World "Best Use of IDKit" ($2,500, 2 x $1,250). Third slot: none fits. The World workshop (Thu 17:30) clashes with 1inch.

**Difficulty.** Medium. Small contract; most work is the simulation and the IDKit flow.

**Scores.**

| C | E | V | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 9 | 5 | 8 | 4 | 7 | **6.6** |

**Judge notes (Judgement).**
- Uniswap judge: "We have seen this; show us something about price discovery we did not know."
- Veteran: "This is the safest two-sponsor build in the list, and the one most likely to be beaten by an identical team with a nicer UI."

---

## 6. Track combination pass (Judgement)

Rules (sourced: [event page FAQ](https://ethglobal.com/events/mumbai), [details page](https://ethglobal.com/events/mumbai/info/details)): at most 3 partner prizes; a partner with several tracks counts as one; the EF places a project in at most one EF prize; the ETHGlobal finalist track is separate and does not count. Arkiv pays at most one Arkiv track per team ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).

| Build | Partner picks | Extra submission work | Finalist fit |
|---|---|---|---|
| Bidproof | Uniswap | none beyond FEEDBACK.md and form | Strong: number, refusal, live attack |
| Jarwatch | Uniswap (+ Arkiv Mirror, weak on Reach) | five `/arkiv/*.md` files if Arkiv | Medium |
| HookBreak | Uniswap | none | Strong if Cork reproduces live |
| Exit Ledger | Uniswap + Arkiv Mirror | `/arkiv/*.md` files, import script, writer wallets | Medium |
| Humancap | Uniswap + World IDKit | IDKit debrief, minimum-credential paragraph | Medium |
| EF-led plan (A or D) with Uniswap third | EF + Uniswap | FEEDBACK.md, form, permalinks; only if a swap or LP action is load-bearing | as the plan |

Combos to avoid (Judgement, from the draft and `plans/`):
- **Uniswap + Whitechain:** no Uniswap deployment on Whitechain Sepolia and prize USDT has about 10 holders (`plans/C_private_invoicing_whitechain.md`).
- **Uniswap + Arc:** an LBPStrategy is deployed on Arc, but no CCA factory is listed there and every Arc prize "requires using Arc Studio as the starting point" ([Liquidity Launchpad deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments); `track_ideas/00_current_tracks.md`).
- **Bidproof + Humancap merged:** both are CCA, but two stories in four minutes dilute both. Pick one.
- **Residue-free swap as a Uniswap lead:** keep it as EF alt mempool lead with Uniswap third only if Permit2 and Universal Router are on the ASSERT devnet (`plans/D_alt_mempool.md`).

Workshop logistics (sourced, [event page](https://ethglobal.com/events/mumbai)): Uniswap Thu 16:30 Room 1 clashes with Whitechain only; Arkiv 16:00 Room 2 and World 17:30 Room 1 do not clash with Uniswap.

---

## 7. Uniswap Foundation's top 3 overall

1. **Bidproof (8.4).** Highest centrality and novelty: it fills a gap Uniswap's own CCA docs name, on the newest primitive in the scope sentence, with a population scan and a live refusal. Medium difficulty and a clean fallback if few auctions exist.
2. **Jarwatch (7.5).** The only idea on TJAR and the protocol fee, which no ETHGlobal winner has touched and which matters most to the Uniswap Foundation this year. Lower WOW, low technical risk, and FEEDBACK.md material already found.
3. **HookBreak (7.3).** The best use of the team's craft and the strongest finalist beat (about $20M of real exploits reproduced). Ranked third only for feasibility; if Cork reproduces by Fri 06:00 IST it is a 1st-place contender.

Best two-sponsor alternative: Exit Ledger with Arkiv (7.2 here plus a fair shot at Arkiv's $3,000).

---

## 8. Questions for the Uniswap Foundation workshop and booth

Workshop: Thu 5 Nov 16:30 to 16:50 IST, Workshop Room 1, "How to Navigate the Uniswap Stack", Angela Ocando ([event page](https://ethglobal.com/events/mumbai)). Ask in the ETHGlobal Discord Uniswap channel now and at the booth before 21:00 IST. Most decisive first.

1. **Centrality of analysis tools:** does a project that scans and guards CCAs it did not create (Bidproof), measures protocol-fee releases (Jarwatch) or fuzzes hooks it did not write (HookBreak) count as "build on or integrate" the stack, or do judges expect the team to deploy its own Uniswap contracts as well?
2. **Disclosure:** if a scan or fuzz campaign flags a live auction or live hook during the event, what path does Uniswap want (Uniswap Foundation security contact, the hook author, a bug bounty), and is a submission that reports only counts and historical exploits judged as complete? May we name live auctions that fail a rule?
3. **TJAR:** where are Uniswap's own TokenJar and Firepit addresses per chain, what is the live `threshold()`, is a release-efficiency ledger welcome, and does a hook that sends its fees to a jar from the TJAR Factory count as "any other Uniswap protocol"?
4. **Chains and demos:** which chain do you want CCA and v4 demos on (Sepolia, Base Sepolia, Unichain Sepolia, or mainnet forks)? Are fork-only demos with replay commands enough, or do judges want testnet or mainnet transaction hashes, as Buenos Aires and Cannes required?
5. **How judging works:** how many judges read each entry, do they run the repo or only read the README and video, and how is the 4th place decided?
6. **R3 wording:** "Submissions without it will be reviewed and audited before winners are finalized." Does a missing FEEDBACK.md or form make an entry ineligible or only delay it, and what does "audited" involve?
7. **Official repositories:** does an opened but unmerged PR to `uniswap/uniswap-ai` (a CCA bidder-check skill, hook properties for `v4-security-foundations`) or to `v4-template` count as an "improvement to official Uniswap repositories"?
8. **CCA docs:** the technical doc says no bid can be exited before graduation, while the `exitBid` section says bids can be exited when outbid or when the auction ends. Which is correct for v2.1.0? Are step schedules and the position recipient readable on chain?
9. **Developer Platform:** is a Developer Platform API key or Trading API use scored higher than contracts-only builds, and are there credits or raised rate limits for the event?
10. **Routing data:** may the `uniroute-public` hook allowlist be republished (licence), and would the routing team use an exit-cost and owner-powers feed (Exit Ledger, Arkiv stack)?
11. **World ID in CCA:** is a server-signed ticket in `hookData` after server-side World ID verification acceptable, or do judges prefer on-chain proof verification in the validation hook (Humancap)?

---

## 9. Gaps and caveats

- No Mumbai judges are named (`track_ideas/00_current_tracks.md`); "what judges reward" is inferred from past winners in [H], whose placement data is partial.
- Not verified from here: the number of real CCAs per chain, Uniswap's TokenJar and Firepit addresses and release count, whether Bunni's pre-exploit state is reproducible with a generic harness, and Permissioned Pools source availability. Each idea names its gate.
- Bunni details come from security-firm and press write-ups; I did not reach Bunni's original post-mortem.
- The CCA documentation contradicts itself on bid exits (question 8).
- ETHGlobal pages were not re-fetched; the verbatim track text is the 2026-10-31 snapshot.
