# Uniswap Foundation at ETHGlobal Mumbai: idea draft

Track: **Build with Uniswap** ($10,000; 1st $4,000, 2nd $3,000, 3rd $2,000, 4th $1,000), fresh builds only. The $5,000 Continuity twin is ignored. Written 2026-10-31 for a 3 person team with a DeFi and smart contract security background (Solidity, Foundry, fuzzing, auditing; TypeScript and React). Companion dossier: `track_ideas/history/uniswap.md`, which these ideas cite as [H].

Labels: lines marked **Fact** carry a URL. Lines marked **Judgement** are this draft's own reading. Nothing here is project code; the snippets are interface signatures copied from Uniswap docs.

---

## 0. What the track asks for, and what it rewards

### 0.1 Verbatim requirements ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation), fetched 2026-10-31)

- R1 scope: "Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol. This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem."
- R2: "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file."
- R3: "Submissions without it will be reviewed and audited before winners are finalized."
- R4: "Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration."
- "What we want to see" and "Won't place": **none published**. The only implied disqualifiers are R2 and R4 failures (no FEEDBACK.md, no form, closed code, a README a judge cannot trace to call sites) and, for a fresh build, any pre-existing project code.

### 0.2 The winner patterns these ideas are tuned to (summary of [H] section 4.6)

**Judgement**, from the winners and non-winners compared in [H]:

- P1. **The Uniswap primitive is load-bearing.** Every 2026 winner breaks if you delete the Uniswap part: Kura's sale *is* a CCA whose validation hook admits only verified humans, Bailiff's liquidation *is* a swap through a v4 permissioned pool, TARE's product *is* a measurement of v4 hooks ([H] 3.3, 4.5).
- P2. **The newest surface wins disproportionately.** CCA appeared in the scope sentence at New York 2026 (June, continuity text) and a CCA build took Tokyo 1st; Uniswap Labs shipped Permissioned Pools and Bailiff took Tokyo 2nd with them ([H] 3.3, 5.2).
- P3. **A replayable number or a refusal beats a dashboard.** TARE ("96.74 bps quoted, 96.74 bps executed, to the wei") won the 2026 Stack Contribution prize at ETHOnline while at least five hook-risk scanners at the same event (Pool Party hookrisk, AlphaScanner, ALFQuote, SwapGuard, reCEPTION Swap) did not ([H] 4.5).
- P4. **Working code over polish.** From Brussels 2024 to Cannes 2026 nearly every Uniswap track said some version of "A user interface is not required, but projects must provide clear evidence of functional code"; the current wording moved that burden into R4 ("points to the relevant contracts and lines of code") ([H] 2).
- P5. **AI agent wrappers and generic routers are now the losing bulk.** HackMoney 2026 had about 96 submissions mentioning Uniswap and 6 winners; Open Agents had about 54 and 3; losing entries were dominated by agent LP managers, chat front ends and MCP wrappers ([H] 4.1, 4.3, 4.4).

### 0.3 The team's edge

**Judgement.** Fuzzing, invariant writing and fork-based adversarial testing are exactly what P1 and P3 need and what most Uniswap entrants lack. The five ideas below therefore turn a Uniswap surface that is new in 2025 or 2026 (CCA, Permissioned Pools, the v4 hook population, Permit2 on the EIP-8141 devnets, CCA validation hooks) into a claim a judge can falsify.

---

## 1. Five ideas for "Build with Uniswap"

| # | Idea | Uniswap surface | Stack with | Type | Difficulty | Team fit |
|---|---|---|---|---|---|---|
| 1 | **Bidproof**: a CCA bid that refuses a rigged auction | CCA, Liquidity Launcher, v4 pool handoff, Uniswap AI skills | none needed | **Narrow, Uniswap judges only** | Medium | Excellent |
| 2 | **Exit Ledger**: can an LP actually leave this hooked pool? | v4 PoolManager, PositionManager, StateView, hook allowlist | **Arkiv** "Mirror something Ethereum depends on" | **Stacks naturally** | Medium | Excellent |
| 3 | **Leakproof**: fuzzing the Permissioned Pools promise | Uniswap Labs Permissioned Pools hook, Universal Router, PositionManager | none needed | **Narrow, Uniswap judges only** | Medium-high | Excellent |
| 4 | **Residue-free swap**: a Permit2 approval that lives for one frame transaction | Permit2, Universal Router, v4 on the alt mempool devnet | **EF** "Best use of the Frame Transaction Alternative Mempool" | **Stacks naturally** | High | Good |
| 5 | **Humancap**: one human, one capped allocation in a CCA | CCA validation hook (`IValidationHook`) | **World** "Best Use of IDKit" | **Stacks naturally** | Medium | Good |

### 1.1 Bidproof: a CCA bid that refuses a rigged auction

**One-line pitch.** Before your bid lands in a Uniswap Continuous Clearing Auction, Bidproof checks the auction against every hazard Uniswap's own documentation says the bidder must vet, and reverts if it fails.

**Why this gap exists (Fact).** The CCA technical documentation lists bidder-side hazards and leaves them to the bidder: "Bidders are responsible for vetting parameters, including excessive floor prices, extreme block windows, honeypot tokens, unrealistic `requiredCurrencyRaised`, and a `positionRecipient` who might withdraw liquidity immediately"; it also warns that "The final auction step must sell a meaningful amount of tokens, since a small final sale makes the handoff price easy to manipulate", that very small tick spacing "in specific cases, enable a DoS that blocks completion", and that low-decimal and fee-on-transfer tokens are unsafe ([CCA TechnicalDocumentation.md](https://raw.githubusercontent.com/Uniswap/continuous-clearing-auction/main/docs/TechnicalDocumentation.md)). Uniswap's AI skills ship a `configurator` and a `deployer` for auction **creators**, and nothing for bidders ([Uniswap Skills](https://developers.uniswap.org/docs/uniswap-ai/skills)).

**Falsifiable promise.** "Point Bidproof at any CCA. If it says the handoff price can be pushed X% for Y USDC, we push it exactly X% for Y USDC on a fork in front of you; if it says the auction is unsafe, the same bid that fills on the honest auction reverts on the rigged one."

**20 second demo moment.** Two auctions of the same token side by side on a Sepolia fork, created through the real `ContinuousClearingAuctionFactory` (v2.1.0, `0x000000001F26a0044BaA66024e7b6599c61963F8`, same address on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain and Sepolia per [Liquidity Launchpad deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)). The left one fills. The right one, whose last step sells 0.2% of supply and whose `positionRecipient` is a bare EOA, reverts with `Unsafe(FINAL_STEP_SHARE, POSITION_UNLOCKED)`. Then the attack script buys the final block and the v4 pool initializes at the price Bidproof predicted, to the tick.

**How it works (36 hour scope).**
- `BidproofRouter.sol`: `submitBidIfSafe(auction, maxPrice, amount, policy)` reads the auction's immutable parameters and step schedule, checks them against a policy struct (minimum final-step share, tick spacing at least 1 bp of floor price per the doc's guidance, token decimals at least 6, validation hook code hash on an allowlist or absent, Liquidity Launcher strategy address on the published deployments list, `claimBlock` and end block gap, protocol fee controller code hash), then forwards to `submitBid`. Fee-on-transfer and honeypot probes use a revert-to-report helper (transfer inside a call that always reverts and returns the observed balance delta).
- `bidproof-sim` (TypeScript plus Foundry): replays the auction on an Anvil fork, solves for the cheapest last-block bid that moves `lbpInitializationParams().initialPriceX96` by a target, and prints the cost. That number is what the live attack in the demo spends.
- A `cca-bid-check` skill in the format of the official `uniswap/uniswap-ai` repo, opened as a pull request (this is R1's "improvements to official Uniswap repositories").

**Requirement mapping.**
- R1: CCA, Liquidity Launcher strategy and the v4 pool handoff are central; the skill PR is an official-repo improvement; the router is "tooling for the broader ecosystem".
- R2: public MIT repo, FEEDBACK.md written during the build (CCA docs friction is real material), form submitted with the FEEDBACK.md link.
- R4: README table "Uniswap integration" with permalinks to every `submitBid`, `lbpInitializationParams`, factory and StateView call site.
- Won't place: none published; the R2 and R4 failure modes are covered by a pre-submission checklist (section 3).

**Why Uniswap judges would pick it over rivals (Judgement).** CCA is the newest primitive in the scope sentence (P2) and has had five or so hackathon entries, all on the creator or bidder-UX side: Kura (validation hook for verified humans, Tokyo 1st), Recycle CCA (re-bids stranded capital, Tokyo, no prize), BlindPool (sealed-bid fork, HackMoney, no prize), nyx (HackMoney) and Vesta (ETHOnline 2026), launchpads, no prize ([H] 4.5). Nobody has built the bidder's safety check that the CCA doc itself asks for. The live attack is a P3 replayable number, and the refusal is a P3 refusal.

**Closest past entries and the difference.** Kura made a CCA safe for the *seller* against bots; Bidproof makes it safe for the *bidder* against the seller. TARE measured what a hook takes; Bidproof measures what a rigged auction can take, before you join.

**Stack options (within 3 partners, at most 1 EF).** Built as a narrow entry. Optional: EF "Best CROPS App" as a Secure dev tool if the preflight runs fully client side against a user-chosen RPC (weak fit; the CROPS judges want a CROPS property as the reason the app exists). The ETHGlobal finalist track is separate and the live attack is a good finalist beat.

**Difficulty.** Medium. The risky part is the manipulation solver; fall back to a brute-force search over last-block bid sizes, which is enough for a demo.

**Team fit.** Excellent: this is an audit checklist turned into an on-chain guard plus a PoC exploit, the team's daily work.

### 1.2 Exit Ledger: can an LP actually leave this hooked pool?

**One-line pitch.** For every hooked Uniswap v4 pool with real liquidity, Exit Ledger withdraws a real LP's position on a fork and publishes "exit OK" or "exit blocked" with a replay command, mirrored to Arkiv so routers and wallets can query it without asking anyone.

**Why this gap exists (Fact).** The Uniswap Foundation's v4 Security Framework scores hooks on nine dimensions including upgradeability, autonomous parameter updates and whether the hook "holds its own liquidity or manages external liquidity", and invites "Future Extensions Community Driven" ([v4 Security Framework](https://developers.uniswap.org/docs/protocols/v4/security); [framework repo](https://github.com/uniswapfoundation/security-framework/tree/main)). Uniswap Labs routing "picks up many hooks automatically" while "some hooks have to be reviewed and allowlisted" ([Integrated Routing with UniswapX](https://developers.uniswap.org/docs/protocols/v4/concepts/hook-routing); [allowlist file](https://github.com/Uniswap/uniroute-public/blob/main/src/lib/poolCaching/util/hooksAddressesAllowlist.ts)). The Uniswap Foundation reports 700+ initialized v4 hooks (`track_ideas/00_season.md`, citing [UF roadmap](https://uniswapfoundation.org/blog/a-roadmap-for-programmable-liquidity)).

**Falsifiable promise.** "Pick any row. If it says exit OK, we withdraw that LP's real position on a fork at the stated block and you get the amounts we printed; if it says blocked, you see the exact revert from the hook."

**20 second demo moment.** A judge picks a row from the live table; one command forks Unichain at the recorded block, impersonates the position owner, calls `decreaseLiquidity` and `take` through PositionManager, and the terminal prints the same token amounts as the table, or the hook's revert string. Then the same query runs against Arkiv.

**How it works.**
- Indexer: PoolManager `Initialize` events with a non-zero hook on Unichain and Base, TVL from StateView, permission bits decoded from the hook address (`beforeRemoveLiquidity`, `afterRemoveLiquidity`, return-delta flags).
- Prover: for the top N pools by TVL, find real position holders from PositionManager events, simulate a full exit on Anvil, compare the received amounts with the no-hook expectation from StateView math (the TARE-style "inert stub" comparison applied to exits, not swaps), and record admin surface (proxy slots, owner, pause flags) against the Security Framework dimensions.
- Arkiv mirror: one entity per hooked pool (pool id, hook, chain, permission bits, allowlist status, exit verdict, block, replay command), written with `@arkiv-network/sdk`, plus the import script.

**Requirement mapping.** R1: v4 core and periphery are the whole subject; "tooling or solutions built for the broader ecosystem". R2 and R4 as in 1.1, with permalinks to the PositionManager and StateView call sites. Arkiv: its own `/arkiv/*.md` files are mandatory (see 2.2).

**Why Uniswap judges would pick it (Judgement).** Hook scanners are a crowded, losing lane (P3: Pool Party hookrisk, AlphaScanner, ALFQuote, HookLens, Sworn won nothing), so the twist must be measurement on the other side of the pool: **LP exits**, proven by real withdrawals, which no past entry did. It is the TARE recipe (exact, replayable, per-pool) applied to the question LPs and the hook allowlist reviewers both ask.

**Closest past entries and the difference.** TARE (ETHOnline 2026, Stack Contribution) measured swap take with a bytecode stub; Sentinel (Lisbon 2026, API 1st) automates an LP's own exit through the LP API but never asks whether a hooked pool lets the exit succeed; HookLens (Open Agents, no prize) simulated swaps; MIRAGE (ETHOnline 2026, no prize) quoted "Uniswap exit quotes" for treasuries, not LP withdrawals. Exit Ledger is the first per-pool, real-position exit proof.

**Stack options.** Arkiv "Mirror something Ethereum depends on" ($4,000; judged 25% each on friction, reach, why Arkiv, data quality). Mirroring the v4 hook registry plus the official routing allowlist is public data routers and wallets depend on; the license of `uniroute-public` must be checked before mirroring it (workshop question). Third slot open (for example ENSv2 if verdicts are published as records under a name with Enhanced Access Control, but only if that is central, which is doubtful). No EF prize fits naturally.

**Difficulty.** Medium. Indexing two chains is the time sink; cap it at the top 50 hooked pools per chain.

**Team fit.** Excellent: fork impersonation and differential testing.

### 1.3 Leakproof: fuzzing the Permissioned Pools promise

**One-line pitch.** Uniswap Labs says a permissioned pool never lets a non-allowlisted address gain exposure to the token, "including through multi-hop routes"; Leakproof turns that sentence into a stateful fuzz campaign anyone can rerun, and contributes the suite upstream.

**Why this gap exists (Fact).** The Permissioned Pools docs list core invariants verbatim: "Only allowlisted addresses can swap or provide liquidity", "Disallowed addresses cannot gain exposure to the permissioned token, including through multi-hop routes", "Liquidity position NFTs are non-transferable, so allowlist checks cannot be bypassed", and "funds leave the pool only through swaps, position withdrawals, and claim redemptions, never through the virtual token directly" ([Permissioned Pools overview](https://developers.uniswap.org/docs/protocols/uniswap-labs-hooks/permissioned-pools/overview)). The design uses a Permissions Adapter that issues a virtual token, which is exactly where accounting bugs hide.

**Falsifiable promise.** "We plant five realistic bugs in a copy of the adapter and hook; the campaign finds every one in under a minute on stage. Then the same campaign runs against the real contracts and either prints a counterexample as a Foundry test or prints the call count it survived."

**20 second demo moment.** A mutation is toggled on (the adapter skips the allowlist check when minting ERC-6909 claims); the fuzzer prints a three-call sequence in which a disallowed address ends up holding the virtual token through a two-hop Universal Router route. The test file is generated and passes red on the mutant, green on the original.

**How it works.** Deploy the published Permissioned Pools stack on a fork following [Deploy a Permissioned Pool](https://developers.uniswap.org/docs/protocols/uniswap-labs-hooks/permissioned-pools/deploy-a-permissioned-pool), with an ERC-3643-style allowlisted token; actors include allowlisted, disallowed and revoked addresses; actions span Universal Router multi-hop swaps through a neighbouring unpermissioned pool, Permissioned Position Manager mints and burns, 6909 claims, flash accounting via an unlock callback contract, issuer halt and unwind. Invariants are the docs' sentences, one per test. Medusa or Echidna for depth, Foundry invariant tests for the shippable suite.

**Requirement mapping.** R1: "improvements to official Uniswap repositories" (a pull request with the invariant suite to the hooks repository) and "tooling for the broader ecosystem". R2, R4 as above, with the README pointing at each invariant and the exact contract functions it exercises.

**Why Uniswap judges would pick it (Judgement).** RWA and permissioned liquidity are in season (00_season.md section 1.6), Uniswap shipped this hook for issuers, and Bailiff placed at Tokyo by using it (P2). A security team that tests the promise Uniswap makes to issuers speaks directly to the people who wrote it. Risk: if nothing breaks, the WOW factor depends on the mutation demo, so the planted-bug score must be impressive and honest.

**Closest past entries and the difference.** Bailiff (Tokyo, Uniswap prize) liquidates restricted RWA through permissioned pools; Hank0 (Tokyo, no prize) used ENS names as trading permissions for one. Both use the pools; neither attacks them.

**Stack options.** Narrow by design. Possible but weak: Whitechain Tokenize or Hedera Tokenize would need Uniswap v4 deployed on their chains, which the notes do not show (`plans/C_private_invoicing_whitechain.md` rejected exactly this as a bolt-on). Finalist track: medium odds; security finalists like Leek DIY and watermark won with refusals, but a fuzzer is harder to stage.

**Difficulty.** Medium-high (the adapter and virtual-token plumbing must deploy cleanly on a fork; gate it by Friday 03:00).

**Team fit.** Excellent: this is the team's core craft.

### 1.4 Residue-free swap: a Permit2 approval that lives for one frame transaction

**One-line pitch.** After the Binance drain, the blast radius of a signature is the approvals and delegations it leaves behind; this swap grants Permit2 an allowance, swaps through Universal Router and revokes, all in one EIP-8141 frame transaction, and the alt mempool refuses any variant that would leave an allowance standing.

**Why now (Fact).** The 29 Oct Binance drain used pre-signed EIP-7702 authorizations (`track_ideas/00_season.md` section 1.1, citing [Chainalysis](https://www.chainalysis.com/blog/binance-exploit-latest-findings-and-response/)). The EF alt mempool devnet has "WETH9, Permit2, Uniswap v4 and Railgun" deployed ([sidecar deployments/devnet.md](https://github.com/forshtat/mempool-workshop-sidecar/blob/HEAD/deployments/devnet.md)). EIP-8141 frames carry an ATOMIC_BATCH flag ("frames with the flag are all-or-nothing with the following frames"), and a second devnet adds the EIP-7906 ASSERT frame mode with TXTRACE ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141); `research_notes/EF tracks and Whitechain ideas/frame_tx_alt_mempool.md`).

**Falsifiable promise.** "Read Permit2 `allowance(owner, token, router)` one block after our swap: it is zero, and a version of the same transaction without the revoke frame is rejected by the mempool, not by our frontend."

**20 second demo moment.** Two submissions to the devnet gateway: the full frame transaction is admitted and lands (explorer link, output token received, allowance zero); the variant with the revoke frame removed is rejected with the ASSERT failure shown by `explainRejection()`.

**How it works.** Frames: `self_verify`; then an atomic batch of SENDER frames (Permit2 `approve`, Universal Router `execute` with a v4 swap, Permit2 `approve(…, 0, 0)` or `lockdown`); then an ASSERT frame that checks the owner's Permit2 allowance is zero and the received amount is at least the quoted minimum. A small TypeScript builder wraps `@forshtat/hegota-support` profiles.

**Requirement mapping.** R1: Permit2 and Universal Router are listed Uniswap protocols ([Uniswap docs index](https://developers.uniswap.org/llms.txt)), v4 is the venue. R2 and R4 as above. EF alt mempool qualification: "a link to your admitted transaction on the devnet explorer, or code that submits one".

**Why Uniswap judges would pick it (Judgement).** Moderate: it is a new transaction shape for Permit2, the Uniswap contract with the largest standing-approval surface, but the novelty lives in the EF primitive. Rank it as a stack play where Uniswap is the third slot, not the lead.

**Closest past entries and the difference.** Himitsu (Tokyo 2026) used frame transactions with Uniswap v2 for private trading through its own privacy pool (`plans/D_alt_mempool.md`); Plan A's Permit2 `lockdown` revokes after the fact. Here no allowance ever outlives the transaction. It also builds on the report's Tripwire concept (`reports/ETHGlobal finalist ideas 2023 to 2026.md`), specialised to Permit2, without copying it.

**Stack options.** EF "Best use of the Frame Transaction Alternative Mempool" (the one EF prize) plus Uniswap; a third partner is unlikely to fit. Finalist odds: good if the rejection is shown live, because it is a refusal tied to the week's headline.

**Difficulty.** High. Gates: which devnet has both ASSERT and the Uniswap deployments (the 7906 devnet is chain 3151908, the Uniswap list is for the workshop devnet), and whether Universal Router is deployed there or must be deployed by the team.

**Team fit.** Good: the team knows Permit2 and approval exploits; frame transaction tooling is new to everyone.

### 1.5 Humancap: one human, one capped allocation in a CCA

**One-line pitch.** A CCA validation hook that caps how much currency any one human can commit across all their wallets, using a World ID nullifier, so a scarce allocation is shared by people instead of being won by whoever splits a whale across 50 addresses.

**Why this fits (Fact).** The CCA validation hook interface is `function validate(uint256 maxPrice, uint128 amount, address owner, address sender, bytes calldata hookData) external;` and "must revert to reject a bid" ([CCA TechnicalDocumentation.md](https://raw.githubusercontent.com/Uniswap/continuous-clearing-auction/main/docs/TechnicalDocumentation.md)). World's IDKit prize rewards "the best decision about which credential is needed, why it is needed", names "fair access to a scarce benefit", and requires "one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user" ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)).

**Falsifiable promise.** "One person, three wallets, $500 cap: the first two bids fill up to $500, the third reverts with `CapExceeded(nullifier)`, and the clearing price for the 40 simulated honest bidders is the same as if the whale had never tried."

**20 second demo moment.** A judge verifies with World ID on a phone, bids $300 from wallet A and $300 from wallet B; wallet B's bid is cut to $200 by the hook (or reverts, depending on mode), then a chart shows the clearing price path with and without the split attack.

**How it works.** `HumancapHook` implements `IValidationHook` and `ValidationHookIntrospection`; `hookData` carries a World ID proof (verified on chain where supported, or a short-lived server-signed ticket as Kura did); a mapping from nullifier to cumulative committed currency enforces the cap. The alternative path for IDKit is a lower "unverified" tier with a tiny cap, so a person without the credential is not shut out entirely.

**Requirement mapping.** R1: CCA plus its validation hook, factory and Liquidity Launcher handoff to a v4 pool. R2, R4 as above. World: IDKit integration, chosen credential and why it is the minimum (Proof of Human, not Passport, because nationality is irrelevant to a fair share), a verified success and an ineligible path, and the integration debrief.

**Why Uniswap judges would pick it (Judgement).** It extends the exact pattern that won Tokyo 1st (P1, P2) with one new property, a per-human *cap* rather than a gate, and it measures the effect on price discovery, which speaks to the CCA's own goal. It is the safest stack in this list, but also the closest to a past winner, so the twist must be visible on stage.

**Closest past entries and the difference.** Kura (Tokyo, Uniswap 1st, ENSv2 3rd): "Auctions admit only World ID bidders", one wallet per human. Humancap allows several wallets but one budget per human, and proves the split attack fails. Flagged: if a judge sees it as "Kura again", it loses, so lead the demo with the split attack.

**Stack options.** World "Best Use of IDKit" ($2,500) plus Uniswap; the third slot could be ENSv2 only if bidders' allocations become ENS subnames with real permissions (doubtful). No EF prize fits.

**Difficulty.** Medium. World ID on-chain verification on Sepolia must be confirmed at the World workshop (Thu 17:30, which clashes with 1inch).

**Team fit.** Good: small Solidity surface, most work is the simulation and the IDKit flow.

---

## 2. Track combo pass (fresh builds only)

### 2.1 Rules that bind ([Mumbai event FAQ](https://ethglobal.com/events/mumbai); `track_ideas/00_current_tracks.md`)

- At most 3 partner prizes; a partner with several tracks counts once; the EF places a project in at most one EF prize; the finalist track is separate.
- Partner prizes are judged from the repo, README and video only, so every extra partner costs README sections and a feedback file: Uniswap `FEEDBACK.md` plus form, Arkiv `/arkiv/*.md` files, World integration debrief, EF CROPS section if CROPS.

### 2.2 Combos that make sense with Uniswap (Judgement)

| Combo | Idea | Extra cost | Conflicts |
|---|---|---|---|
| Uniswap + Arkiv Mirror | 2 | Arkiv SDK writes, import script, five `/arkiv/*.md` files | Arkiv and ENS workshops clash at 16:00; Uniswap and Whitechain clash at 16:30 |
| Uniswap + EF alt mempool | 4 | devnet setup, explorer link | EF counts as one partner; leaves one slot, which nothing else fills naturally |
| Uniswap + World IDKit | 5 | IDKit flow, credential rationale, debrief | World workshop 17:30 clashes with 1inch |
| Uniswap only | 1, 3 | none | the two unused partner slots stay empty; one project carries one stack, so pick the stack before building |
| Uniswap + Arkiv + World | 2 and 5 merged | high | do not merge: two unrelated stories dilute the demo |

Combos to avoid:
- **Uniswap + Whitechain**: no Uniswap deployment on Whitechain Sepolia and prize USDT has about 10 holders (`plans/C_private_invoicing_whitechain.md`), so any pool is a bolt-on.
- **Uniswap + 1inch Aqua**: real, but already done by Iceberg and VexiHakari (Tokyo), Lotus (New York 2026) and RWA Outlet (Lisbon); only enter with a SwapVM opcode twist.
- **Uniswap + Arc**: Uniswap v4 and the Liquidity Launcher are deployed on Arc ([v4 deployments](https://developers.uniswap.org/docs/protocols/v4/deployments); [Launchpad deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)), and the Arc DeFi track names "trading with tokenized real-world assets", but every Arc prize "requires using Arc Studio as the starting point" and the CCA factory list does not name Arc. Only consider it if the Arc workshop confirms a CCA factory and a testnet path.

### 2.3 Recommended pick (Judgement)

- **Strongest Uniswap-only entry:** idea 1 (Bidproof). Highest P1 and P2 fit, smallest build, a live attack for the finalist room.
- **Strongest stack:** idea 2 (Exit Ledger) with Arkiv, because the Arkiv judging weights reward exactly the reach and data-quality story Exit Ledger already needs.
- If the team instead builds an EF-led project from plans A to E, Uniswap is a cheap third slot only where the swap or LP action is load-bearing (Plan A's v3 oracle reads were judged "low to moderate" for this reason in `plans/A_verified_anon_reads.md`).

---

## 3. Submission checklist for any Uniswap entry

- Public repo, open-source license, steady commits from Thu 21:00 IST (fresh build).
- `FEEDBACK.md` in the repo root, written as you go: docs gaps, API or SDK friction, missing endpoints, what you wish existed (the Open Agents wording asked for exactly this; [H] 2.5).
- The Uniswap Developer Feedback Form completed with the FEEDBACK.md link (https://developers.uniswap.org/hackathon-feedback). Do this before Sat 09:00 IST; R3 says submissions "without it will be reviewed and audited before winners are finalized".
- README section "Uniswap integration": each contract and line, as GitHub permalinks, plus deployed addresses and transaction hashes.
- Demo video between 2:00 and 2:59 so it satisfies every partner's length rule at once.

---

## 4. Questions for the Uniswap workshop (Thu 5 Nov 16:30 IST, Workshop Room 1, "How to Navigate the Uniswap Stack", Angela Ocando)

The workshop clashes with Whitechain at 16:30 (`track_ideas/00_current_tracks.md`); send the person who owns the Uniswap integration.

1. Does a bidder-side tool that never deploys its own auction (Bidproof) count as "integrate any part of the Uniswap stack", or do judges want a CCA created by the team? (Idea 1)
2. Which chain do you want CCA demos on this week: Sepolia, Base Sepolia or Unichain Sepolia? Is the v2.1.0 factory the one to use, and is there a CCA factory on Arc? (Ideas 1, 5)
3. Would a pull request to `uniswap/uniswap-ai` (a bidder-check skill) or to the hooks repository (an invariant suite) count as "improvements to official Uniswap repositories" if it is opened but not merged by Saturday? (Ideas 1, 3)
4. Are the Permissioned Pools contracts deployed on any testnet, and may a team fork and mutate them for a fuzzing demo? Who should receive a finding if the campaign breaks an invariant (responsible disclosure path)? (Idea 3)
5. Can `uniroute-public`'s hook allowlist be republished (license), and would the routing team use an exit-verdict feed? (Idea 2)
6. Does Permit2 used inside an EIP-8141 frame transaction on the EF devnet count as a Uniswap integration if the swap venue is a v4 pool the team deploys there? (Idea 4)
7. Is a World ID proof inside CCA `hookData` an acceptable validation-hook pattern, or does the team prefer an attestation contract the hook reads? (Idea 5)
8. R3 says submissions without the FEEDBACK.md and form "will be reviewed and audited before winners are finalized". Does that mean they are still eligible, and what does "audited" involve?
9. How many judges read each submission, and do they run the repo or only read the README and video?

---

## 5. Gaps and caveats

- The 20 second demos depend on testnet deployments that were not tested from here; each idea names its gate.
- Exit Ledger's TVL filter and Humancap's on-chain World ID verification were not checked against live contracts.
- "700+ initialized v4 hooks" comes from the season brief's citation of the Uniswap Foundation roadmap and was not re-fetched.
- Placement-level winner data for several 2026 events is partial (see [H] gaps); patterns P1 to P5 rest on the winners that could be read.
