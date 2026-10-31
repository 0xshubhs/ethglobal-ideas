# Hedera: fresh-build ideas for ETHGlobal Mumbai (draft)

Sponsor: Hedera, $15,000 total, $13,500 open to fresh builds ([Mumbai Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera), verbatim copy in `track_ideas/00_current_tracks.md`). Written 2026-10-31 for a 3-person team with a DeFi and smart contract security background (Solidity, Foundry, fuzzing, auditing, TypeScript, React), Classic track, fresh build only. The Continuity track "Built on Hedera" is ignored.

Companion dossier: `track_ideas/history/hedera.md` (past tracks, winners, why they won). Section references below such as [H4] point to its sections.

## How to read this file

- Lines labelled **Fact** carry a URL or point to a section of the history dossier that does.
- Everything labelled **Judgement**, plus every idea, difficulty rating, ranking and stack suggestion, is our own reasoning.
- "(verify)" marks something we believe but did not confirm; check it before relying on it, ideally at the Hedera workshop (Thu 5 Nov 15:30 IST, Workshop Room 2).
- All three tracks belong to one partner, so one Hedera selection makes a project eligible for all three Hedera tracks while using one of the three partner slots ([Mumbai FAQ](https://ethglobal.com/events/mumbai)). Hedera wants a video of "5 minutes or less" and ETHGlobal rejects anything outside 2 to 4 minutes, so every idea assumes a 2:00 to 2:59 cut.

## What Hedera's judges reward (summary of the dossier)

**Fact.** Hedera's own published hackathon rubric, shipped in the `hackathon-helper` plugin that its Mumbai workshop will install, weights Innovation 10%, Feasibility 10%, Execution 20%, Integration 15%, Validation 15%, Success 20% and Pitch 10%. Integration scores 5 only when "A Hedera service is integrated in a way that was not obvious"; "Mirror node queries only = 1 point". Success asks whether the solution drives "more Hedera accounts", "monthly active Hedera accounts" and "greater TPS". ([judging-criteria.md](https://github.com/hedera-dev/hedera-skills/blob/master/plugins/hackathon-helper/skills/validate-submission/references/judging-criteria.md); [validate-submission SKILL.md](https://github.com/hedera-dev/hedera-skills/blob/master/plugins/hackathon-helper/skills/validate-submission/SKILL.md); [H6])

**Judgement, from the winner comparison in [H5]:**
1. Hedera must be load-bearing, with several native services doing distinct jobs (HTS for value, HCS for ordering or audit, Scheduled Transactions for time, Mirror Node for verification). Winners describe exactly which service does what; losers say "logs to Hedera".
2. A non-obvious use of a native primitive beats a long feature list: Pastel's HCS topic as an event-sourced order book, Wafer's contract holding the HTS KYC and freeze keys itself, Tally's consensus-enforced HTS allowance cap, Rialto's HIP-1215 scheduled call that closes a loan.
3. Spending guards for agents are now the most crowded lane at Hedera booths. At Lisbon 2026 Planbound, AEGIS, Yareon and Pixport all built bounded agent spending with Hedera and none won a Hedera prize, while Ognef did; at Cannes 2026 Bound and AegisPay did not win. A guard needs an enforcement point nobody else used.
4. Real data or real hardware lifts entries: ZoneProof served 434,000 real parcels, Azimuth received real satellites, Vouch checked real sensors.
5. Upstream or ecosystem contributions are rewarded explicitly: Agent Kit plugin prizes (late 2025), the Hedera Harness track (ETHOnline 2026), "Contributions back to ATS or Stablecoin Studio" (Mumbai). Hedera's own x402 bounty paid Tally for an `upto` scheme it submitted upstream.
6. Stacking is normal but rarely pays twice: most 2026 Hedera winners also integrated World, ENS, 0G, Arc, Ledger or Sui/Walrus, yet only 6 of 40 also won another sponsor's prize (for example MARS: Arc 1st and World 2nd; Azimuth: Sui and ENS 3rd). Hedera does not penalize a multi-chain build if Hedera has a named job.
7. The rubric's Validation and Success rows (35% together) reward a README that names users, a feedback cycle and how many accounts and transactions the product would create. Few hackathon entries write this down, so it is cheap points.

## Fresh facts that shape these ideas

- **Fact.** The Hedera x402 `exact` spec gained a second asset transfer method, `transferExecutor`, for funds that a contract controls or that sit behind a HIP-336 allowance to a contract, explicitly naming "delegation, session-key, spend-policy, subscription and agent-wallet contracts"; admission is "default deny". It merged on 2026-08-19 (PR #3205). The implementation PR #4030, by a Blocky402 developer, opened on 2026-10-28 and is still open. ([spec](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme_exact_hedera.md); [PR #3205](https://github.com/x402-foundation/x402/pull/3205); [PR #4030](https://github.com/x402-foundation/x402/pull/4030))
- **Fact.** Open PR #3061 says the reference Hedera facilitator "never checked the **effective** balance changes", so HTS tokens with fractional or net-of-transfers custom fees "settle `SUCCESS` while the payee receives less than the required amount". ([PR #3061](https://github.com/x402-foundation/x402/pull/3061))
- **Fact.** Hedera has only the `exact` scheme merged; `upto` (PR #2919) and `batch-settlement` (PR #3466) for Hedera are open PRs. ([x402 repo](https://github.com/x402-foundation/x402); [PR #2919](https://github.com/x402-foundation/x402/pull/2919); [PR #3466](https://github.com/x402-foundation/x402/pull/3466))
- **Fact.** Facilitators listed for Hedera: Official x402 (testnet, `https://x402.org/facilitator`), Launa (testnet and mainnet) and Blocky402 (testnet `https://api.testnet.blocky402.com`, mainnet `https://api.blocky402.com`). The Mumbai track names "Official x402, Ax402, or Blocky402" or a self-run facilitator. ([facilitators](https://docs.hedera.com/solutions/ai/x402/facilitators); [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes/hedera))
- **Fact.** Asset Tokenization Studio is a diamond with "modular facets (ERC-1400, ERC-3643, Hold, Clearing)", "partial support for ERC-3643", a Mass Payout framework for coupons and dividends, and custodian integrations; Stablecoin Studio has facets for Burn, CashIn, Freeze, KYC, Pause, Rescue, Reserve, Roles, Wipe and Hold, with "Proof of Reserve integration via Chainlink AggregatorV3Interface" and multisig via Hedera `keyList` and `thresholdKey`. ([ATS README](https://github.com/hashgraph/asset-tokenization-studio); [Stablecoin Studio README](https://github.com/hashgraph/stablecoin-studio))
- **Fact.** ETHOnline 2026's ATS track listed "A secondary market for ATS-issued assets, which the Studio does not have today". ([ETHOnline 2026 Hedera prizes](https://ethglobal.com/events/ethonline2026/prizes/hedera))
- **Fact.** Scheduled transactions can wait up to 62 days, execute at expiry with `wait_for_expiry`, collect signatures through `ScheduleSignTransaction`, and cannot be modified once submitted. ([Hedera docs](https://docs.hedera.com/hedera/core-concepts/scheduled-transaction))
- **Fact.** Chainlink CRE's supported-network list (updated 2026-10-19) does not include Hedera, so a CRE workflow cannot write to Hedera directly. ([CRE supported networks](https://docs.chain.link/cre/supported-networks-ts))
- **Fact.** Hedera Agent Accounts (caps, per-transaction limits, payee allowlists, x402-compatible) were announced on 13 Oct 2026 with a limited partner testnet in Q4 2026 and mainnet targeted for Q2 2027 ([ChainCatcher](https://www.chaincatcher.com/en/article/2295860); `track_ideas/00_season.md`).

---

# Track 1: AI Agents That Pay: x402 on Hedera ($6,500: $3,000 / $2,000 / $1,500)

Verbatim qualifications, used as R1 to R4 below ([Mumbai Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)):
- R1 "At least one x402-protected endpoint that settles on Hedera testnet or mainnet through any facilitator listed in the Hedera docs (Official x402, Ax402, or Blocky402), or through a facilitator you run yourself."
- R2 "An agent or client that finds the endpoint and completes at least one paid request end to end, with no human approving."
- R3 "A public GitHub repo with a README that covers setup, architecture, and the payment flow, including the Hedera transaction ID of at least one settled payment."
- R4 "A demo video of 5 minutes or less that shows a payment settling and links to it on HashScan."
- Extra points: spending controls; HCS-14 or ERC-8004 identity; an HCS audit log; A2A or ACP negotiation; settling in an HTS token or using HTS custom fees; Scheduled Transactions for recurring payments; Hedera Agent Kit or Hedera Network MCP.
- Won't place: none published.

**Judgement on the lane.** x402 wrappers, routers and agent firewalls are the most crowded theme at both the finalist table and the Hedera booth [H5]. Every idea below therefore puts its weight on an enforcement or verification point inside the Hedera payment path, which is where this team is strongest.

### 1A. Leash: the agent's spending limit lives in the settlement path (stacks with World ID Agent Pass)

- **Pitch.** The first open-source spend-policy executor for the new x402 `transferExecutor` method: an agent pays x402 quotes from its owner's funds through a HIP-336 allowance to a policy contract that enforces per-merchant caps, a daily budget, a payee allowlist and single-use authorizations, and asks for a fresh World ID Agent Pass approval above a set amount.
- **Falsifiable promise.** "Give the attacker the agent's key: the most it can move is the remaining daily budget to allowlisted merchants, and our facilitator's simulation refuses everything else before a single tinybar moves."
- **20 second demo moment.** A prompt-injected agent fires 20 paid requests at an attacker's 402 endpoint. The terminal shows 20 `simulation_reverted` lines, the attacker's HashScan page shows no inbound transfer, while one legitimate call to the allowlisted merchant settles and its HashScan link opens. A 25 USDC purchase then pauses for an Agent Pass approval on a phone; the judge taps deny and nothing settles.
- **Requirement fit.** R1: a self-run facilitator built on the public PR #4030 branch serves `transferExecutor`; a second endpoint settles a plain `cryptoTransfer` through Blocky402 testnet so at least one payment uses a listed facilitator. R2: an agent discovers both endpoints through each server's payment requirements and `/supported`, then pays with no human in the loop below the threshold. R3: README with setup, an architecture diagram, the policy rules, and the transaction IDs of the settled payments. R4: the video shows the settle and clicks the HashScan link. Extra points hit: spending controls (the core), HCS audit log (each authorization and refusal is an HCS message), HTS USDC settlement, Agent Kit for the agent's tools.
- **Why Hedera's judges would pick it.** It turns Hedera's newest x402 spec text into working code before the hosted facilitators ship it, and it is the open preview of the Agent Accounts Hedera announced on 13 Oct. That is the "not obvious" integration the rubric pays 5 for (a HIP-336 allowance to a policy contract, settled through a facilitator's default-deny executor admission). It is not the off-chain proxy that Planbound, AEGIS, Yareon, Pixport, Bound and AegisPay shipped without winning [H5].
- **Closest past entries and the difference.** AutoVoyage (ETHOnline 2026, Hedera winner: the user grants a HIP-336 HBAR allowance to the agent's own key and a self-hosted facilitator settles, so the only on-chain limit is the allowance total); Ognef (Lisbon 2026, Hedera winner: mandates and hard limits checked off-chain, provenance on Hedera); Planbound (Lisbon 2026, not a Hedera winner: "Hedera-enforced spending accounts"); Tally (Hedera x402 bounty: consensus-capped HTS allowance for the `upto` scheme). Twist: the allowance goes to a policy contract, not to the agent, so per-merchant, per-day and allowlist rules are enforced inside the x402 settlement transaction through the standard `transferExecutor` method that any conforming facilitator can settle; neither a compromised agent nor a compromised facilitator can exceed them. AutoVoyage's finding that the spender must own the transaction ID for an allowance-debited transfer is a day-one check for this design.
- **Stack options.** World ID Agent Pass ($5,000): the above-threshold approval is "a meaningful action that needs a human identity or approval layer", and the deny path satisfies its "denied, expired, cancelled" requirement. A third slot is optional: ENSv2 only if merchant allowlists were ENS names resolved on Sepolia, which risks reading as cosmetic. No EF prize fits (Hedera is not an Ethereum network).
- **Difficulty for 36 hours.** Medium-high. Risks: PR #4030 may change; HIP-336 allowance semantics to a contract and HTS association need a day-one spike; the facilitator must read child records as the spec requires.
- **Team fit.** Very high: Solidity policy contract, Foundry invariant tests on the policy ("sum of settled spend never exceeds the budget"), adversarial demo.

### 1B. Range402: attack your own facilitator, then ship one that passes (narrow, Hedera only)

- **Pitch.** A replayable conformance and attack range for Hedera x402 facilitators, plus a hardened open-source facilitator that passes every case. The facilitator then sells its scorecard to agents per call, so the paid endpoint is the product.
- **Cases.** A token with a fractional custom fee (the PR #3061 underpayment class), a fixed fee with net-of-transfers, the same signed bytes submitted twice inside the validity window, the same payload raced to two facilitators, the fee payer as net sender, a `ScheduleCreate` wrapper, a second token in the transfer list, a wrong CAIP-2 network, alias auto-account creation, and a `transferExecutor` payload naming an unlisted executor.
- **Falsifiable promise.** "Pay a 1,000-unit quote with a token that skims 5%: the reference flow reports success while the payee receives 950; our facilitator reports `settlement_transfer_amount_mismatch` with the transaction ID, and anyone can rerun the case from the repo."
- **20 second demo moment.** A grid of 12 attack cases turns red or green live against two facilitators we run ourselves: the reference code at a pinned commit and ours. The skim case is clicked open: HashScan shows 950 to the payee and 50 to the fee collector.
- **Requirement fit.** R1: the hardened facilitator is self-run and settles the scorecard endpoint on testnet. R2: a security agent finds the scorecard endpoint, pays per query and reads the result with no human. R3: README with the case list, the architecture and the settled transaction IDs. R4: the video shows a paid query settling and its HashScan link. Extra points: HCS audit log of every case result; HTS USDC settlement.
- **Responsible-testing rule (Judgement).** Run attacks only against facilitators the team deploys from public code. Test hosted facilitators (Official x402, Launa, Blocky402) only with the operator's permission, asked at the Hedera booth or in Discord, disclose anything found privately, and never publish an operator's score without consent. The resource server that gets underpaid is always our own.
- **Why Hedera's judges would pick it.** It is a listed idea verbatim ("An open-source Hedera x402 facilitator with its own safety checks and replay protection"), it protects Hedera's own x402 push, and it continues what Hedera rewards repeatedly: ecosystem tooling (Agent Kit plugin prizes, the Harness track, Hanvil) [H3, H5].
- **Closest past entries and the difference.** Hanvil (ETHOnline 2026, Hedera winner: local Hedera network with an x402 rail); Scenario Engine (ETHOnline 2026, Hedera winner: harness scenarios checked against the mirror); Qisma and Tally (Hedera x402 bounty: new schemes). Twist: nobody has shipped an adversarial conformance suite for Hedera facilitators.
- **Stack options.** None by design; this is the narrow entry. An upstream PR of the test vectors to `x402-foundation/x402` is extra evidence for Hedera's judges.
- **Difficulty for 36 hours.** Medium. Creating custom-fee HTS tokens, a local facilitator and a test runner is SDK work; the risk is scope creep in the case list.
- **Team fit.** Very high: this is an audit turned into a product.

### 1C. KeyCheck: agents pay a cent to learn whether a Hedera token can hurt them (stacks with Arkiv "Build on Arkiv")

- **Pitch.** An x402-gated risk oracle for HTS tokens and Hedera accounts. An agent about to accept payment in a token, or pay into an account, asks whether its admin, wipe, freeze, KYC, pause, supply or fee schedule keys or its custom fees can take value away, and pays per fresh verdict. Cached verdicts are public Arkiv entities that expire when the token's keys could have changed.
- **Falsifiable promise.** "A token whose fee schedule key can add a 100% fractional fee later is flagged, and the paying agent refuses to be paid in it; every verdict cites the mirror-node consensus timestamp it was computed at, so anyone can recompute it."
- **20 second demo moment.** Two look-alike "USDC" tokens. The agent pays one cent for each verdict (two HashScan links), accepts the clean one, and refuses the one with a live wipe key and fee schedule key. The team then uses the fee schedule key to add a 50% fee on the bad token, and the next agent's payment is refused instantly from the expired cache entry.
- **Requirement fit.** R1: the verdict endpoint settles through Blocky402 testnet in HTS USDC. R2: an Agent Kit agent (or a plugin) queries Arkiv first, pays for a fresh verdict when the cache has expired, then decides. R3 and R4: as standard. Extra points: Agent Kit use (KeyCheck shipped as an Agent Kit plugin), an HCS log of verdicts, HTS settlement, ERC-8004 or HCS-14 identity for the oracle.
- **Why Hedera's judges would pick it.** It is a Hedera-only problem: HTS keys and custom fees have no ERC-20 equivalent, so the "Does this exist cross-chain?" Innovation question answers itself. Agent Kit plugins have been their own Hedera prize twice [H3].
- **Closest past entries and the difference.** Turnstile (ETHOnline 2026, Hedera winner: pay-per-call onchain analysis for agents); npmguard (2026 finalist: paid audit verdicts for npm packages). Twist: verdicts on Hedera-native token powers, which no prior entry covered, and the payment decision is automated on the result.
- **Stack options.** Arkiv "Build on Arkiv (from scratch)" ($4,000): verdicts are expiring, owner-signed entities that agents filter by token and risk, so "Why Arkiv" and "How you use Arkiv" have concrete answers; it needs the four `/arkiv/*.md` files. Arkiv counts as one partner slot. A third slot is open (for example World Agent Pass, if a human must approve accepting a flagged token).
- **Difficulty for 36 hours.** Low-medium.
- **Team fit.** High: token-risk analysis is audit work.

### 1D. FuzzMeter: a metered MCP fuzzing tool with receipts anyone can replay (narrow)

- **Pitch.** A metered MCP server whose tool `fuzz_invariant` charges per batch of fuzz runs over x402 on Hedera. A coding agent with a budget buys runs until it finds a counterexample or the budget ends, and every batch writes an HCS receipt with the target's code hash, the seed, the run count and a result hash.
- **Falsifiable promise.** "Every fuzz campaign an agent paid for can be replayed by anyone from its HCS receipt: same seed, same counterexample, same bill."
- **20 second demo moment.** Claude Code, given a 0.50 USDC budget, fuzzes a deliberately vulnerable ERC-4626 vault. Batch three finds the share-inflation attack; the spend meter reads 0.06 USDC with three HashScan links. A judge pastes the receipt's seed into `forge test` on a clean machine and gets the same trace.
- **Requirement fit.** R1: the MCP tool's HTTP endpoint is x402-protected and settles through Blocky402 or the Official facilitator. R2: the agent discovers the tool from the MCP listing and pays with no human approving. R3 and R4: as standard. Extra points: per-call metering, an HCS audit log, HTS USDC settlement, Hedera Network MCP alongside.
- **Why Hedera's judges would pick it.** "A metered MCP server whose tools charge per call" is a listed idea, and the replayable receipt answers the trust question every paid-compute entry skips. ETHOnline 2026's text rewarded "compute metering rather than a flat per-request charge" [H3].
- **Closest past entries and the difference.** AudiThor (Cannes 2026, Hedera "No Solidity" winner: audits billed by micropayments streamed every five seconds to a per-session escrow account); Pinout (Hedera x402 bounty: per-second metered compute). Twist: deterministic, replayable proof of the work paid for, rather than an LLM's opinion or a time meter.
- **Stack options.** None strong; narrow entry. The vulnerable fixtures could later feed a security-tool pitch to the EF judges, but the product settles on Hedera, so no EF prize fits.
- **Difficulty for 36 hours.** Medium (Foundry in a sandbox, seed capture, MCP server, x402 middleware).
- **Team fit.** Very high.

### 1E. Bolo Meter: pay-per-second Indic speech-to-text that an app's agent buys on its own (stacks with 0G "Build with 0G PC")

- **Pitch.** A shop-counter voice ledger: a shopkeeper speaks in Hindi or Marathi and the app transcribes and books the entry. Behind it, the app's agent buys transcription per second of audio from an x402 endpoint that runs `whisper-large-v3` on 0G Private Computer and settles each call on Hedera in HTS USDC.
- **Falsifiable promise.** "The bill equals audio seconds times the posted price, and each charged second maps to a 0G request ID and an HCS receipt that anyone can sum."
- **20 second demo moment.** A 14-second Marathi voice note becomes a ledger line; the meter shows 14 seconds and 0.014 USDC, with the HashScan link and the 0G request ID side by side; a 0-second empty clip costs nothing.
- **Requirement fit.** R1 to R4 as standard (Blocky402 testnet, the app's agent pays without approval under a daily cap). Extra points: per-call metering, HCS receipts, HTS USDC, a spending cap.
- **Why Hedera's judges would pick it.** "regional-language speech-to-text, priced per request" is named in the track's own ideas, and the rubric's Success row likes products that would create many small Hedera transactions. **Judgement:** India framing alone did not place at New Delhi [H5], so the metering proof must carry the pitch.
- **Closest past entries and the difference.** Xorv and Pinout (Hedera x402 bounty) metered compute; AgentRouter (Lisbon 2026, Hedera winner) sold per-request inference. Twist: per-second metering reconciled against a third party's request IDs.
- **Stack options.** 0G "Build with 0G PC" ($5,000) requires inference on 0G PC "in your main user flow, with request IDs" and a consumer app; its "Not wanted" list excludes chat wrappers, which this is not. A third slot could be World IDKit if shop accounts need one-human-one-shop.
- **Difficulty for 36 hours.** Low-medium.
- **Team fit.** Medium: little security depth, so it is the fallback if the team wants an easy second product.

---

# Track 2: Tokenize Anything with Hedera Studios ($5,000: $2,500 / $1,500 / $1,000)

Verbatim qualifications, used as Q1 to Q4 below:
- Q1 "Use ATS or Stablecoin Studio (SDK, contracts, web app, or a combination) to issue or manage a tokenized asset or stablecoin."
- Q2 "Deploy and demo on Hedera testnet."
- Q3 "A public GitHub repo, with contracts verified on HashScan where applicable."
- Q4 "A demo video of 5 minutes or less that covers issuance, configuration, and at least one lifecycle operation (for example a coupon payment, redemption, freeze, or reserve update)."
- Extra points: compliance controls (KYC, freezes, transfer restrictions, pauses); custom fees and distributions; oracle pricing or NAV feeds; Scheduled Transactions for coupons, vesting or recurring payouts; contributions back to ATS or Stablecoin Studio.
- Won't place: none published.

**Judgement on the lane.** Invoice factoring is already well covered at Hedera booths (cashmeifyoucan, Facture, Finvoice, CreditMesh), and so are bonds with KYC (Namegate) and lending against tokenized securities (Rialto) [H4]. Two things are open and explicitly wanted: a secondary market for ATS assets, and upstream contributions. Both are security-shaped problems.

### 2A. Settle or Nothing: delivery-versus-payment for ATS securities with Stablecoin Studio cash (narrow)

- **Pitch.** The secondary market ATS lacks: an order book whose matched trades settle through a DvP contract that executes an ATS Hold on the security and a Stablecoin Studio Hold on the cash in one transaction, re-checking compliance at execution.
- **Falsifiable promise.** "Either both legs move in one transaction or neither does. A buyer who loses KYC between match and settlement gets nothing and keeps his cash; a seller frozen mid-trade keeps his bonds."
- **20 second demo moment.** Two matched trades. The issuer revokes buyer two's KYC after the match. Trade one settles (one HashScan transaction with both legs), trade two reverts at settlement, both holds expire, and balances return to where they started on the dashboard.
- **Requirement fit.** Q1: ATS SDK issues a bond (ERC-1400 partitions with ERC-3643 compliance) and Stablecoin Studio issues the cash token. Q2: testnet. Q3: DvP contract verified on HashScan. Q4: the video covers issuance, configuration (control list, KYC grant), and lifecycle operations (hold, transfer, freeze, KYC revoke). Extra points: compliance controls at transfer, a trading fee through custom fees on the stablecoin, a scheduled hold expiry.
- **Why Hedera's judges would pick it.** It answers Hedera's own stated gap ("which the Studio does not have today", ETHOnline 2026), it uses both studios, and it is the kind of "previously unseen" capability the Innovation rubric pays 5 for.
- **Closest past entries and the difference.** Namegate (ETHOnline 2026, Hedera winner: ENSv2 subnames as the KYC layer for a Hedera bond); Rialto (ETHOnline 2026, Hedera winner: auction lending against tokenized bonds); Covenant (Lisbon 2026, not a Hedera winner: transfers refused to unverified wallets). Twist: two-studio atomic settlement with holds, which none of them built.
- **Stack options.** None by design. Uniswap's CCA is not deployed on Hedera (verify), so it does not stack.
- **Difficulty for 36 hours.** Medium-high: both studios' Hold facets and their role setup must be understood on day one.
- **Team fit.** Very high: atomicity, invariant tests ("no settlement changes total supply of either asset"), adversarial ordering.

### 2B. Reg S Gate: a bond only non-US passport holders can ever hold (stacks with World "Best Use of IDKit")

- **Pitch.** An ATS bond offered under Regulation S, where a buyer proves non-US nationality with a World ID Passport credential, the backend grants the ATS KYC and control-list entry, and the restriction holds on every secondary transfer and at every coupon record date.
- **Falsifiable promise.** "A wallet whose owner cannot prove a non-US passport can never hold the bond, not through issuance, a secondary transfer or a coupon; one passport fills one investor slot."
- **20 second demo moment.** An investor scans a passport in World App and buys; a second wallet controlled by the same person is refused a transfer because the nullifier is already bound; the scheduled coupon pays only the verified holder (HashScan link).
- **Requirement fit.** Q1: ATS bond with control lists and KYC; Mass Payout or a scheduled transaction pays the coupon. Q2 to Q4: testnet, verified contracts, a video covering issuance, configuration and a coupon payment. Extra points: compliance controls, scheduled coupons.
- **Why Hedera's judges would pick it.** **Fact:** ATS says it aims for compliance with "SEC Regulation D (506-b and 506-c) and Regulation S" ([ATS docs](https://docs.hedera.com/solutions/tokenization/ats)). The idea takes that claim literally and makes it enforceable on-chain.
- **Closest past entries and the difference.** NameGate (ETHOnline 2026, Hedera winner: the issuer writes KYC status and jurisdiction into ENSv2 subname records, carried to an ATS `IExternalControlList` over CCIP, with a custom coupon distributor because "ATS's bond can declare and calculate a coupon but has no payout function at all"); Covenant (Lisbon 2026, not a Hedera winner: World-gated property shares). Twist: the jurisdiction claim is a holder-presented credential checked at the moment of transfer, not a status the issuer writes, and it is chosen for one legal predicate (nationality outside the US), which is the proportionality World's IDKit judges ask for.
- **Stack options.** World "Best Use of IDKit" ($2,500): "We are rewarding the best decision about which credential is needed, why it is needed". Whether the Passport credential exposes a nationality predicate is unknown (verify at the World workshop, Thu 17:30). If it does not, fall back to Proof of Human for one-person-one-slot and drop the Reg S framing.
- **Difficulty for 36 hours.** Medium.
- **Team fit.** Medium-high.

### 2C. Reserve-Locked Rupee Corridor: a remittance stablecoin that cannot be minted past its reserve (narrow)

- **Pitch.** A Stablecoin Studio stablecoin for the UAE to India corridor whose cash-in is hard-capped by an attested reserve feed (the Studio's Reserve facet reads an AggregatorV3-compatible feed), with KYC per account, freeze on a sanctions hit and a corridor fee through HTS custom fees.
- **Falsifiable promise.** "Mint one unit beyond the attested reserve and it reverts; drop the reserve and cash-in stops within one feed update, with no admin action."
- **20 second demo moment.** The reserve feed reads 10,000; minting 10,001 reverts on HashScan. The attestor posts a reserve update to 8,000 and the next mint of 500 also reverts because supply is already 9,800; a flagged account is frozen mid-transfer.
- **Requirement fit.** Q1: Stablecoin Studio. Q4: "reserve update" is the lifecycle operation named in the qualification. Extra points: compliance controls, custom fees, an oracle-style feed.
- **Why Hedera's judges would pick it.** "A stablecoin for cross-border remittances, with compliance controls" is a listed idea, and the reserve gate is the Studio's own feature made visible. **Judgement:** pitch the verifiable control, not the INR market; the season brief notes the RBI prefers a digital rupee and that INR ramps did not place at New Delhi.
- **Closest past entries and the difference.** F2F Cross-Border (Lisbon 2026, Hedera winner: walletless transfers anchored on Hedera). Twist: an enforced reserve invariant instead of an audit trail.
- **Stack options.** None; Chainlink CRE cannot write to Hedera (fact above), so the reserve attestor is our own signer, stated honestly in the README.
- **Difficulty for 36 hours.** Low-medium.
- **Team fit.** High (invariant: supply never exceeds reserve), but less novel than 2A.

### 2D. ATS Proof Pack: invariant fuzzing for the Asset Tokenization Studio, sent upstream (narrow)

- **Pitch.** Issue a real bond with ATS on testnet, then ship a Foundry and Medusa invariant suite for the ATS diamond (partitions, ERC-3643 compliance, Hold, Clearing, snapshots and coupon entitlement) as a pull request to the ATS repo, with any findings disclosed privately first.
- **Falsifiable promise.** "After ten million random operations across issue, transfer, hold, clear, freeze and snapshot, partition balances still sum to total supply and every coupon entitlement equals the snapshot balance times the rate; the suite is in the upstream PR for anyone to run."
- **20 second demo moment.** The issuance and a coupon payment run on testnet; then the fuzzer's dashboard shows the invariant counters climbing, and a deliberately broken facet (a one-line bug the team plants in a fork) is caught within seconds with a shrunk counterexample.
- **Requirement fit.** Q1: the ATS SDK issues and manages the bond. Q2 to Q4: testnet issuance, verified contracts, a video showing issuance, configuration and a coupon. Extra points: "Contributions back to ATS or Stablecoin Studio", stated verbatim.
- **Why Hedera's judges would pick it.** It is the only idea that scores directly on the "contributions back" extra point, and it helps every future ATS issuer. **Judgement:** its weakness is the Success row (it creates few accounts), so the README must argue that safer ATS contracts unblock institutional issuers.
- **Closest past entries and the difference.** Scenario Engine and Hanvil (ETHOnline 2026, Hedera winners for tooling). No past entry tested ATS itself, although ATS integrators reported rough edges: NameGate hit "an orphaned control list from a prior redeploy that silently blocked every transfer", and Rialto built a ComplianceLens because "a blocked ERC-3643 transfer reverts with nothing at all" ([NameGate](https://ethglobal.com/showcase/namegate-63d0m); [Rialto](https://ethglobal.com/showcase/rialto-psod2)).
- **Stack options.** None; narrow.
- **Difficulty for 36 hours.** Medium (diamond setup in Foundry is the main cost; ATS ships Hardhat tests that show the deployment order).
- **Team fit.** Exceptional; the lowest-risk build for this team.

### 2E. Warehouse Lien: tokenized warehouse receipts a lender can pledge across chains (stacks with Chainlink "Best use of Chainlink CCIP 2.0")

- **Pitch.** Electronic warehouse receipts for stored grain issued as ATS tokens; a lender on another chain funds a loan against a receipt, the receipt is locked by an ATS Hold as a lien, and repayment or default is carried by CCIP messages.
- **Falsifiable promise.** "A pledged receipt cannot be redeemed, sold or pledged again until the loan's CCIP repayment message arrives; on default it moves only to the lender."
- **20 second demo moment.** A lender on Sepolia funds 1,000 USDC; on Hedera the receipt shows "held". The farmer tries to sell it and the transfer reverts. Repayment on Sepolia sends a CCIP message, the hold releases, and the receipt is redeemed for grain (a lifecycle burn).
- **Requirement fit.** Q1: ATS receipt token with Hold. Q4: issuance, configuration, hold, release, redemption. Extra points: compliance controls, an oracle price for haircuts (a Chainlink Data Feed on the lender's chain).
- **Why Hedera's judges would pick it.** "Fractional ownership of gold, real estate, or warehouse receipts" is a listed idea and no past Hedera winner did warehouse receipts. **Judgement:** keep the India warehouse framing as setting only.
- **Closest past entries and the difference.** KinXP (ETHOnline 2025, Hedera winner: lock assets elsewhere, borrow on Hedera); Rialto (lending against tokenized securities). Twist: the lien is the ATS Hold facet, driven cross-chain.
- **Stack options.** Chainlink CCIP 2.0 ($3,500): "Using Chainlink CCIP inside your smart contracts is required". NameGate (ETHOnline 2026) sent messages from Sepolia to Hedera testnet over CCIP in September 2026, so a lane existed then ([NameGate](https://ethglobal.com/showcase/namegate-63d0m)); confirm it is still live and that CCIP 2.0 is the version on it (verify).
- **Difficulty for 36 hours.** High (two chains, CCIP latency during the demo).
- **Team fit.** High technically, but the riskiest in this track.

---

# Track 3: "No Solidity Allowed": Build with Hedera SDKs ($2,000: 2 x $1,000)

Verbatim qualifications, used as N1 to N4 below:
- N1 "Use the Hedera JavaScript/TypeScript SDK or Python SDK, with no Solidity smart contracts."
- N2 "Use at least two native Hedera services (for example, HTS and HCS)."
- N3 "A public GitHub repo with a README covering setup and usage."
- N4 "A demo video of 5 minutes or less."
- Extra points: a coherent end-to-end user experience; Mirror Node REST API; creative use of HCS for data integrity, logging, or messaging; the Hedera Agent Kit for AI-driven workflows; "A thoughtful security approach (key management, access controls)".
- Won't place: any Solidity smart contract (N1).

**Judgement on the lane.** This is the smallest Hedera prize, but its "thoughtful security approach (key management, access controls)" line is written for this team, and Hedera's native keys (KeyList, threshold keys, schedule admin keys, `receiverSigRequired`) can do what other chains need contracts for. Past winners used three or four native services each (Dead Men Tell Tales used Schedule, HCS, File Service and Mirror Node) [H4].

### 3A. Slowvault: a treasury that cannot be drained in one block, built without a contract (narrow)

- **Pitch.** A team treasury on a native Hedera account whose key is a 2-of-3 threshold key, where every outgoing transfer must be a scheduled transaction with `wait_for_expiry` set to a delay, and a guardian holding the schedule admin key can delete a malicious schedule during the delay after reading a plain-language decode of it.
- **Falsifiable promise.** "Even with two of three signer keys stolen, no funds leave before the delay ends, and the guardian can kill the transfer with one signature."
- **20 second demo moment.** The "attacker" signs a 9,000 HBAR transfer with two stolen keys; a watcher posts the decoded intent to an HCS topic and a phone alert reads "9,000 HBAR to an unknown account, executes in 10:00". The guardian deletes it; the mirror node shows the schedule deleted and the balance unchanged. A legitimate payroll schedule executes on time.
- **Requirement fit.** N1: TypeScript SDK only. N2: Scheduled Transactions, accounts with threshold keys, HCS (alerts and audit log), HTS (a USDC payroll leg) and Mirror Node. N3 and N4 as standard. Extra points: the security approach is the product; Mirror Node; creative HCS.
- **Why Hedera's judges would pick it.** It shows a Safe-plus-timelock security model with zero contracts, which is the track's own thesis ("Show what you can ship when the network does the heavy lifting"). **Fact for the pitch:** WazirX lost about $230M in July 2024 from a multisig that signed what it could not see (season brief and finalist report).
- **Closest past entries and the difference.** Dead Men Tell Tales (NY 2026, Hedera winner: schedule-driven release); Noah (2025 finalist: dead man's switch, contract-based). Twist: the schedule is a defensive delay with a veto, not a release trigger.
- **Stack options.** None; narrow.
- **Difficulty for 36 hours.** Low-medium.
- **Team fit.** Very high.

### 3B. Ask a Human: an ops agent that can draft any transaction but never execute one (stacks with World ID Agent Pass)

- **Pitch.** A Hedera Agent Kit agent that runs a small company's treasury chores (payroll, vendor payments, token association, top-ups) by creating scheduled transactions only; a human must pass a fresh World ID Agent Pass check before their `ScheduleSign` is accepted by the signing service.
- **Falsifiable promise.** "The agent's key is not on the treasury account at all; nothing it drafts can execute until a verified human signs, and an unsigned draft dies at expiry."
- **20 second demo moment.** The agent drafts a 3-line payroll as a schedule; an Agent Pass check pops up on a phone and the human approves; the schedule executes (HashScan link). The agent then drafts "send everything to vendor X" after a poisoned email; the human denies, and at expiry the mirror node shows the schedule expired with no transfer.
- **Requirement fit.** N1: TypeScript SDK and Agent Kit (which "counts as SDK usage" in Hedera's earlier wording). N2: Scheduled Transactions, HTS, HCS (each draft and decision logged), Mirror Node. Extra points: Agent Kit, security approach, coherent UX.
- **Why Hedera's judges would pick it.** It combines the Agent Kit with native scheduling in a way that matches the earlier "human-in-the-loop modes" bonus Hedera wrote into its 2025 Agent Kit tracks [H3].
- **Closest past entries and the difference.** YourTurn Concierge (NY 2026, Hedera winner: bounded agent plus human approval, then a scheduled refund); Ognef (Lisbon 2026). Twist: the agent holds no key on the treasury at all; authority is structural.
- **Stack options.** World ID Agent Pass ($5,000), with the denied path built in. **Judgement:** do not run 3B and 1A together; both spend the World slot on the same story.
- **Difficulty for 36 hours.** Low-medium.
- **Team fit.** High.

### 3C. First Finder: a vulnerability disclosure ledger with provable priority (stacks with Arkiv "Build on Arkiv")

- **Pitch.** Researchers commit a hash of a vulnerability report to an HCS topic, which fixes their priority by consensus timestamp; the project's triage keys co-sign a scheduled bounty payment in HTS USDC; the reveal happens after the embargo; and the public status board of open embargoes lives in Arkiv entities that expire when the embargo ends.
- **Falsifiable promise.** "Whoever committed first is provably first, by consensus time, even if a second researcher reveals the same bug earlier; the bounty executes only when two of three triage keys sign."
- **20 second demo moment.** Two researchers submit the same bug; researcher B reveals first in chat, but the HCS timestamps show A committed 41 seconds earlier. The schedule pays A, and the Arkiv board flips the embargo from "open" to "disclosed" at its expiry.
- **Requirement fit.** N1 to N4: SDK only; HCS, Scheduled Transactions with threshold keys, HTS and Mirror Node. Extra points: creative HCS for data integrity (commit-reveal), security approach.
- **Why Hedera's judges would pick it.** HCS consensus timestamps are a native primitive with no direct equivalent on EVM chains, used here for something that needs an ordering nobody can dispute.
- **Closest past entries and the difference.** ProvenanceChain (Cannes 2026, Hedera winner: document notary), SealSign (Cannes 2026, not a winner). Twist: priority races between adversaries and payout on top, not plain notarisation.
- **Stack options.** Arkiv "Build on Arkiv (from scratch)" ($4,000): embargo entries with owners and expirations that the board reads; the `/arkiv/*.md` files are required.
- **Difficulty for 36 hours.** Low-medium.
- **Team fit.** Very high (the team lives in disclosure workflows).

### 3D. Reserve Clock: proof of reserves an exchange cannot backdate (narrow)

- **Pitch.** After the Binance drain, an exchange publishes a Merkle root of user liabilities to an HCS topic every hour; reserves are the HBAR and HTS balances of its Hedera accounts at the same consensus timestamp from the Mirror Node; each user can verify their own leaf and the totals.
- **Falsifiable promise.** "Any user can check that their balance is in the published liabilities and that reserves covered liabilities at that exact consensus second; the exchange cannot publish a root after the fact without the timestamp showing it."
- **20 second demo moment.** A user pastes their account ID and sees "included, leaf 3,812 of 10,000; reserves 104% at 14:00:00.000". The team moves reserve tokens out and back between snapshots; the next root shows 97% in red.
- **Requirement fit.** N1 to N4: SDK only; HCS (roots), HTS (reserve tokens), Mirror Node (balances at timestamp), accounts with threshold keys for the publisher. Extra points: Mirror Node, creative HCS, security approach.
- **Why Hedera's judges would pick it.** It turns "Mirror Node balance at a timestamp" plus HCS ordering into an audit primitive, and the Success row likes products that put real institutions on Hedera.
- **Closest past entries and the difference.** No Hedera winner did proof of reserves. Twist over generic PoR: snapshot and root are bound to one consensus timestamp.
- **Stack options.** None; narrow.
- **Difficulty for 36 hours.** Low-medium (Merkle tree, Mirror Node historical balance queries need a check: verify the `timestamp` parameter on `/api/v1/balances`).
- **Team fit.** High.

### 3E. Schedule Lens: clear signing for Hedera scheduled transactions (narrow, Agent Kit plugin)

- **Pitch.** A Hedera Agent Kit plugin and a small web signer that decodes any pending schedule from the Mirror Node into plain language, simulates its effect and flags dangerous bodies (a scheduled `AccountUpdate` that replaces your key, an allowance approval, a transfer to an account with `receiverSigRequired` off) before anyone signs it.
- **Falsifiable promise.** "A scheduled key-replacement disguised as a payroll payment is shown as 'This replaces your account key' and refused by the agent's policy; the same schedule signed blind would hand over the account."
- **20 second demo moment.** A phishing link asks the user to co-sign "Payroll October". Schedule Lens shows "replaces account key 0.0.x with an unknown key" in red, and the agent refuses; in the side-by-side blind wallet, signing it changes the account key on HashScan.
- **Requirement fit.** N1 to N4: SDK and Agent Kit only; Scheduled Transactions, accounts, Mirror Node, HCS (signed decode receipts). Extra points: Agent Kit, security approach, Mirror Node.
- **Why Hedera's judges would pick it.** It is the Hedera version of the clear-signing story every security team is telling after the Binance authorization drain (season signal 1), and Agent Kit plugins have their own history of Hedera prizes [H3].
- **Closest past entries and the difference.** Hedera Agent Trust (ETHOnline 2025, Hedera winner: an identity plugin for Agent Kit); Truthsign in our own finalist report targets EVM descriptors. Twist: Hedera-native schedule bodies, which no wallet decodes today (verify against HashPack's current schedule view).
- **Stack options.** None; narrow.
- **Difficulty for 36 hours.** Medium (protobuf decoding of every schedulable body is the work).
- **Team fit.** Very high.

---

## Ranking and recommended combinations (Judgement)

| Rank | Idea | Track | Why |
|---|---|---|---|
| 1 | 1A Leash | x402 | Newest Hedera spec, open Agent Accounts preview, strongest security story; it uses Solidity, so it cannot also enter Track 3 |
| 2 | 2A Settle or Nothing | Tokenize | Fills the gap Hedera named; two studios; invariant-heavy |
| 3 | 1B Range402 | x402 | Listed idea, zero partner dependence, audit skills shown directly |
| 4 | 2D ATS Proof Pack | Tokenize | Lowest risk, only idea on "contributions back" |
| 5 | 3A Slowvault | No Solidity | Cheapest strong entry; can be a side build by one person |

- **One product, two Hedera tracks.** 1B or 1C can carry a "NAV or token risk data over x402" endpoint for 2A's assets, which the Tokenize track lists as linking to Track 1, so a single submission can be judged in both Hedera tracks for one partner slot. A Solidity-free product cannot also use ATS contracts, so Track 3 always needs its own product.
- **Best three-slot stacks.** 1A Leash with Hedera + World ID Agent Pass (+ open slot); 1C KeyCheck with Hedera + Arkiv + World Agent Pass; 2B Reg S Gate with Hedera + World IDKit.
- **Relation to plans A to E.** None of the existing plans target Hedera (plans A, B, C, D and E all mark Hedera as "Skip"). A Hedera entry is therefore either a second product or a replacement for a plan; it does not combine with the EF prizes, which run on Ethereum networks.

## Questions for the Hedera workshop (Thu 5 Nov 15:30 IST, Room 2) and booth

1. Will Blocky402 or the Official facilitator support `transferExecutor` (PR #4030) during the event, and may a submission run its own facilitator from that branch? (Decides 1A.)
2. Does a self-run facilitator count as fully as a listed one for R1, and is a mainnet settlement scored higher than testnet?
3. May we run the Range402 attack cases against the hosted testnet facilitators, and who receives private disclosures? (Decides 1B's scope.)
4. Is there a reference deployment of ATS and Stablecoin Studio factories on testnet that we should use, and do both studios' Hold facets work together for DvP? (Decides 2A.)
5. What counts as a "contribution back to ATS": an open PR, a merged PR, or tests only? (Decides 2D.)
6. Is Hedera Agent Kit's human-approval (return-bytes) mode current, and does the hosted Hedera Network MCP support scheduled transactions? (3B, 3E.)
7. For "No Solidity Allowed", does using an existing contract (for example the HTS system contracts) count as Solidity, or only contracts we write? (Scope check for every Track 3 idea.)
8. How are Validation and Success judged for a 36-hour build: do they want projected account and TPS numbers in the README?
