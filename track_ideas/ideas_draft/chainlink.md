# Chainlink at ETHGlobal Mumbai: idea drafts for the two fresh-build tracks

Draft date: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST. Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React; Classic track, fresh build only. Both Chainlink tracks are open to fresh builds; Chainlink has no Continuity track at Mumbai. Nothing here depends on pre-existing project code; public libraries, SDKs and starter kits only.

Companion dossier: `track_ideas/history/chainlink.md` (tracks since 2023, 81 winners, why they won). Section numbers like "H4.2" point into it.

**How to read this file.** Facts carry a URL or point to the dossier section that sources them. Everything labelled **Judgement** is this researcher's opinion. Difficulty and odds are judgement throughout.

---

## 0. The two tracks, the rules that bind every idea, and what wins

### 0.1 Requirements (verbatim, from [Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink), copied in `track_ideas/00_current_tracks.md`)

**Best workflow with CRE ($1,500, single winner)**
- R1 "Build, simulate, or deploy a CRE Workflow that's used as an orchestration layer within your project." "It is NOT mandatory to deploy it during the hackathon, simulation is enough!"
- R2 "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent."
- R3 "Demonstrate a successful simulation (via the CRE CLI) or a live deployment on the CRE network."
- R4 "Be meaningfully used in your project"
- Won't place: none published. Inferred from past Chainlink pages (H2.3): "Please use CRE instead of using Chainlink Functions or Automation"; "A placeholder handler or an isolated example that does not contribute to the application will not qualify" (ETHOnline 2026 wording).

**Best use of Chainlink CCIP 2.0 ($3,500, 2 x $1,750)**
- Q1 "Each project must use Chainlink CCIP in some form to make a state change on a blockchain, otherwise it will not be eligible for the Chainlink core prizes."
- Q2 "Using Chainlink CCIP inside your smart contracts is required"
- Q3 Encouraged: "Chainlink Runtime Environment (CRE), Chainlink Data Feeds, Chainlink Data Streams and Chainlink VRF"
- Won't place: "a front end simply reading from Chainlink Data Feeds doesn't count."
- Listed use cases: "Cross-chain DeFi app with liquidity across multiple chains Cross Chain DeFi yield aggregator Token bridge powered by CCIP Multihop CCIP Router."

**Stacking.** Both Chainlink tracks count as one partner prize, so one project can enter both ([Mumbai FAQ](https://ethglobal.com/events/mumbai), quoted in `00_current_tracks.md`). At most 3 partners; at most one EF prize; the finalist track is separate. Partner judges see only the repo, README and video.

### 0.2 What Chainlink's judges have rewarded (from H4.5, Judgement)

- W1 The Chainlink output is the only key to a real state change, and the README points to the enforcing line (ENShell, Vouch DeFi, OpenPop, Deflow).
- W2 The season's newest capability, used for its purpose (CCT in 2025, Confidential HTTP and TEE in 2026). At Mumbai: CCIP 2.0 (CCVs, faster-than-finality, `ExtraArgsV3`, ACE hooks), launched 28 Sep 2026 ([Chainlink blog](https://chain.link/blog/introducing-ccip-2-0)). No ETHGlobal winner has used it yet (H3).
- W3 Real external systems and real second chains, with gaps stated honestly.
- W4 Evidence: CLI simulation logs, `--broadcast` tx hashes, CCIP Explorer links, tests.
- W5 For the general CRE prize: a complete product that other sponsors would also reward (all 8 past CRE-track winners won another prize or a finalist slot, H3). For a feature-named prize: depth on that feature.
- W6 Never a copy of an official template (Remote Minter, Enclave Portfolio lost, H4.4), never a score nothing enforces (Ketchup), never an overclaim (CrossChainPort).

### 0.3 Facts every idea relies on (sourced in H6)

- CCIP 2.0 receivers can implement `getCCVsAndFinalityConfig(sourceChainSelector, sender)` returning `requiredCCVs`, `optionalCCVs`, `optionalThreshold`, `allowedFinalityConfig`. Finality is chosen at send time (`requestedFinalityConfig` in `ExtraArgsV3`) and allowed at receive time; legacy receivers never accept faster-than-finality (FTF) messages; a rejected message sits in FAILURE and can be re-executed later ([FTF for dApps](https://docs.chain.link/ccip/concepts/execution-latency/ftf-dapps)).
- Custom CCVs: the CCV Starter Kit ships a docker-compose `local/` stack and a PASS or FAIL policy hook; a non-onboarded verifier is tested by requiring it in a receiver and running `ccip-cli manual-exec <src-tx> --verifiers grpcs://...` ([test your setup](https://docs.chain.link/ccip/ccv-starter-kit/evm/test-your-setup); [policy hook](https://docs.chain.link/ccip/ccv-starter-kit/how-to/add-a-custom-policy-hook)).
- Chainlink Local v0.3.0 supports CCIP 2.0 lanes in Foundry ([releases](https://github.com/smartcontractkit/chainlink-local/releases)).
- CRE: Cron (30 s minimum), HTTP and EVM Log triggers; `--broadcast` sends real writes from simulation; Confidential HTTP and `handlerInTee` run in the simulator; Arc Testnet and World Chain Sepolia are supported networks, Hedera and Whitechain are not ([CRE docs](https://docs.chain.link/cre/llms.txt)).
- CCIP testnet lanes exist for Arc testnet, Hedera testnet, 0G Galileo, World Chain Sepolia and Unichain Sepolia; not Whitechain ([CCIP testnet directory](https://docs.chain.link/ccip/directory/testnet)).

### 0.4 In-season hooks used below (from `track_ideas/00_season.md`)

- Binance, 29 Oct 2026, about $6.36B: one transaction carried 50 EIP-7702 authorizations for consecutive nonces and the hot wallet became a sweeper ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)).
- Liquid Network, 6 Sep 2026, $320M "unbacked cross-chain mint"; Kelp, 18 Apr 2026, $293M "cross-chain message spoofing" ([DefiLlama hacks API](https://api.llama.fi/hacks)).
- CoinDCX confirmed a $15.99M loss from retired wallets on 25 Oct 2026, and some user deposits went to the compromised addresses ([The Block](https://theblock.co/news/business/2026-10-25-coindcx-confirms-16-million-loss-from-retired-wallets-days-after-ceo-called-breach-reports-a-false-alarm-431617)). WazirX lost $234.9M in 2024 to "Signer Phishing" ([DefiLlama hacks API](https://api.llama.fi/hacks)).
- CRE's release notes warn that Glamsterdam changes Ethereum gas and writes may fail around each fork; "No action is required unless your workflow sets a gas limit" ([CRE release notes](https://docs.chain.link/cre/release-notes)). **Judgement:** do not hard-code gas limits in any workflow below, and prefer Sepolia or Base Sepolia over Hoodi for writes during the event.

---

## 1. Best workflow with CRE: five ideas

### C1. Refill Guard: a treasury that stops refilling a hot wallet the moment its code changes (narrow, Chainlink-only)

- **Pitch.** After Binance, the cheapest control is not detection, it is refusing to send more money to a hot wallet that has just been turned into someone else's contract.
- **Falsifiable promise.** After the hot wallet signs a batch of EIP-7702 authorizations to a delegate that is not on the allowlist, the treasury's next refill reverts with `HotWalletDelegated(hot, codehash)` on the first workflow run after the delegation, while the same refill to a clean hot wallet succeeds.
- **20 second demo.** Left pane: an attacker script replays the Binance shape on Sepolia (five authorizations, consecutive nonces, one transaction) and the sweeper drains the 0.1 ETH float. Right pane: the treasury's scheduled refill of 5 ETH goes red with the revert reason; the counter reads "float lost 0.1 ETH, treasury 10 ETH intact".
- **Requirements.** R1: the workflow is the only path by which `Treasury.refill` executes (consumer contract built on `ReceiverTemplate`, callable only through the forwarder). R2: blockchain reads (EXTCODEHASH through a small lens contract via `callContract`, refill events via EVM Log trigger) joined with external systems: a published delegate allowlist (JSON over HTTP) and Etherscan or Sourcify for "is this delegate verified source". R3: `cre workflow simulate --broadcast` with tx hashes in the README. R4: remove the workflow and the treasury cannot refill at all. Not a template: Chainlink's `circuit-breaker` template pauses on event anomalies; this checks delegated code identity before each outflow, which no template does ([cre-templates](https://github.com/smartcontractkit/cre-templates)).
- **Why these judges pick it.** W1 (the report is the only key), W3 (real 7702 delegation on Sepolia, real allowlist), the security framing that won ENShell and SentinelCRE (H4.2, H7), and the most-read story in the room this week.
- **Closest past work.** Wolfy (Buenos Aires CRE winner) is a 7702 wallet using CRE; SentinelCRE (Convergence 1st) triggers circuit breakers on anomalies; Chainlink's circuit-breaker template. Difference: this protects the treasury side of a custodial setup against a compromised signer, with a deterministic code-hash rule and no LLM.
- **Stack options.** None needed. It can also feed idea P1 (same repo, enter both Chainlink tracks as one partner). No EF prize fits well (Judgement: CROPS "Secure" is aimed at user-facing apps).
- **Difficulty (36 h).** Low to medium: two contracts, one TypeScript workflow, one attacker script. **Team fit:** high; the attacker script and Foundry tests are the team's daily work.

### C2. Sealed PoC Bounty: an exploit proof runs inside a CRE enclave and the bounty pays only if funds actually move (narrow, tuned to Chainlink)

- **Pitch.** A bug bounty escrow that pays a whitehat automatically when their exploit drains a fork of the target, without the exploit ever being published before the fix.
- **Falsifiable promise.** A proof of concept that moves at least the threshold out of the target on a fork pinned to a stated block is paid in the same workflow run; one that does not is paid nothing; the PoC bytes appear in no log, calldata or event (only a commitment hash).
- **20 second demo.** Two submissions against the team's deliberately vulnerable vault (a donation-style rounding bug, the Tectonic pattern from the season brief). The fake one reverts: "delta 0, no payout". The real one: `BountyEscrow` pays 500 test USDC; the explorer shows only the payout and a hash.
- **Requirements.** R1: the workflow is the adjudicator; `BountyEscrow.payout` accepts only the forwarder's report. R2: blockchain (escrow and target state) plus an external system, a fork simulation service (a Tenderly Virtual TestNet or the team's own Anvil fork behind HTTPS) called through Confidential HTTP with the API key as a Vault DON secret; the PoC is decrypted inside `handlerInTee`. R3: simulation through the CLI, with the Confidential Workflow running in the local simulator ([CRE TS docs](https://docs.chain.link/cre/ts/llms-full.txt)). R4: no workflow, no payout. Not a placeholder handler: the enclave does the decryption and the verdict.
- **Why these judges pick it.** W2 (Confidential Workflows are Chainlink's 2026 push, with an "AI Smart Contract Audit Firewall Template" in their own bootcamp list, H2.3), W1, W3, and a real security market. Judgement: the execution-based verdict is more convincing to an oracle team than an LLM score.
- **Closest past work.** ENShell (Claude scores an agent action in the Vault DON; Cannes 2026 CRE winner and finalist); Chainlink's audit-firewall template; Immunity. Difference: proof by execution with value deltas, paying a person, with consensus over a deterministic fork result (pinned block number, identical-aggregation consensus).
- **Honest gap to state in the README.** The fork provider sees the PoC; trust moves from a bounty platform to the simulator. Running the team's own fork endpoint narrows it but does not remove it.
- **Stack options.** None natural; enter Chainlink only. Finalist angle: strong WOW if the live payout works.
- **Difficulty.** Medium to high (TEE handler, secrets, deterministic consensus over a simulation response). **Team fit:** very high; writing the vulnerable vault and the PoC is the team's core skill.

### C3. Dead Address Guard: exchange deposit addresses as ENSv2 names that only a CRE workflow can change (stack with ENS)

- **Pitch.** CoinDCX's users sent deposits to retired, compromised wallets; here each deposit address lives under an ENSv2 name whose records only the workflow can update, and a send router refuses anything retired.
- **Falsifiable promise.** After the exchange retires an address, sending 10 USDC to `deposit.<user>.<exchange>.eth` through the router reverts with `Retired(addr, since)`, and the same name resolves to the new address on the next workflow run.
- **20 second demo.** Exchange console marks an address retired; one workflow run later the wallet's send turns red, then the name re-resolves to the rotated address and the send settles.
- **Requirements.** R1 and R4: the workflow is the only writer of the deposit records and the retirement flag (ENSv2 per-name permissions granted to the forwarder-fed consumer contract). R2: blockchain plus the exchange's deposit-address API, called with Confidential HTTP so the API key stays sealed. Judgement: no Indian exchange offers a public sandbox for this, so the demo uses a small mock exchange API the team writes, stated plainly; a real exchange testnet API can be added if one supports deposit-address reads. R3: CLI simulation with `--broadcast`.
- **Why these judges pick it.** W1 (records "can only be updated by the ChainLink CRE final forwarding call" is the exact pattern that won ENShell, H4.2), W3, a local story told through a global mechanism (the season brief's India rule).
- **Closest past work.** ENShell and Immunity (ENS records written only by CRE), Kondor (ENS plus CRE, ENS 2nd at Cannes 2026), Autonome (ENS subnames for sites). Difference: deposit-address lifecycle and a router that refuses, on ENSv2.
- **Stack options.** ENS "Best Use of ENSv2" ($7,000), which requires ENSv2 to be central, not cosmetic (`00_current_tracks.md`). Optional third: none needed. No EF prize.
- **Difficulty.** Medium; depends on ENSv2 testnet tooling (ENS workshop question below). **Team fit:** medium to high.

### C4. Descriptor Notary: clear-signing descriptors checked against bytecode by a CRE workflow (stack with EF CROPS App and Arkiv)

- **Pitch.** WazirX's signers approved what their screens showed; this workflow checks every ERC-7730 descriptor against the deployed bytecode and verified ABI, and publishes a pass or fail a wallet can enforce.
- **Falsifiable promise.** A descriptor that labels `transferFrom` as "Claim rewards", or maps the wrong parameter as the recipient, fails; the wallet demo then shows "Unverified descriptor" instead of the friendly text; the honest descriptor passes; anyone re-running `cre workflow simulate` gets the same verdict hash.
- **20 second demo.** Two descriptors for the same contract side by side; one workflow run; the registry shows FAIL for the lying one with the offending selector, and the wallet screen flips from green to red.
- **Requirements.** R2: external systems (the public ERC-7730 registry on GitHub, Sourcify for verified ABIs) joined with chain reads (code and dispatch-table selectors via a lens contract). R1 and R4: the registry on Sepolia accepts verdicts only from the workflow; the wallet reads it before rendering. R3: CLI simulation plus broadcast.
- **Why these judges pick it.** W1, W3, W6 (not a template), and security framing; Safe City won Chainlink's Connect track in Brussels with a contract safety signal before signing (H3).
- **Closest past work.** The team's own Truthsign proposal (`reports/ETHGlobal finalist ideas 2023 to 2026.md`, proposal 2), Safe City (Brussels), ENShell's unshipped ERC-7730 file. Twist: a registry-wide, deterministic bytecode check run as a CRE workflow and enforced by the wallet, not a report.
- **Stack options.** EF "Best CROPS App" (Secure) as the one EF prize, and Arkiv "Mirror something Ethereum depends on" (mirror the verdicts and descriptors so no single gatekeeper controls them). That is three partners: Chainlink, EF, Arkiv.
- **Difficulty.** Medium. **Team fit:** high (ABI and selector analysis is audit work).

### C5. Hookwatch: a CRE workflow that vets new Uniswap v4 hooks and a router that refuses flagged ones (stack with Uniswap)

- **Pitch.** Every new v4 pool's hook is checked by a workflow (verified source, permission flags, a fork round-trip swap), and a guarded router refuses to route through hooks that fail.
- **Falsifiable promise.** A hook the team deploys that skims 1% on `afterSwap` is flagged within one workflow run of its pool's `Initialize` event, after which the guarded router reverts `HookFlagged(hook)`; a benign hook passes and the same swap succeeds.
- **20 second demo.** Deploy the skimming hook, initialize a pool, the workflow fires on the log, the dashboard shows the fork result "user received 0.99, expected 1.00", and the router swap goes red.
- **Requirements.** R2: EVM Log trigger on PoolManager `Initialize`, plus external systems (Sourcify for source, the team's fork-simulation endpoint). R1 and R4: `HookRegistry` accepts flags only from the workflow; the router consults it. R3: CLI simulation and broadcast.
- **Why these judges pick it.** W1, W3, W5 (a product Uniswap would also reward). TARE (a v4 hook measurement tool) was a 2026 finalist (`00_season.md` section 3), so measurement of hooks is a proven stage line.
- **Closest past work.** npmguard (CRE cron audits npm releases; ENS 3rd), Safe City, TARE. Difference: v4 specific checks with enforcement at routing time.
- **Stack options.** Uniswap "Build with Uniswap" ($10,000, four places; needs FEEDBACK.md and the feedback form). Optional third: Arkiv mirror of hook verdicts. No EF prize.
- **Difficulty.** Medium. **Team fit:** high.

---

## 2. Best use of Chainlink CCIP 2.0: five ideas

### P1. Pause Fast, Unpause Slow: a cross-chain kill switch built on CCIP 2.0 finality rules (narrow, Chainlink-only; enters both Chainlink tracks)

- **Pitch.** A pause message can only stop things, so a reorg can at worst cause a spurious pause; this design lets pauses travel faster than finality while unpauses must wait for full finality and an extra verifier.
- **Falsifiable promise.** A pause sent from Ethereum Sepolia lands on the vaults on Base Sepolia, Arbitrum Sepolia and OP Sepolia before the attacker's next withdrawal there, measurably sooner than a full-finality message on the same lane; an unpause sent at the same moment cannot execute until full finality; a forged fast unpause fails with `InvalidRequestedFinality`.
- **20 second demo.** Binance-style compromise on one chain (reuse C1's attacker script). Three vault panels with timers: "Paused at +N s" on each; the attacker's withdrawal on Base Sepolia reverts `Paused`; the unpause message shows as waiting for finality in the CCIP explorer.
- **How it uses CCIP 2.0.** Two sender contracts on the source chain: `GuardianSender` requests a block-depth finality in `ExtraArgsV3`; `AdminSender` requests full finality. Each vault is a V2 receiver whose `getCCVsAndFinalityConfig` returns a block-depth `allowedFinalityConfig` only for `GuardianSender`, full finality for `AdminSender`, and an extra required CCV for `AdminSender` where one is available. Receivers enforce that guardian messages can only set `paused = true`.
- **Requirements.** Q1 and Q2: CCIP sends and receives inside the contracts change state on three chains. Q3: a CRE workflow is the detector that triggers `GuardianSender` (entered in the CRE track too); Data Feeds can price the exposure shown on the dashboard. Won't place: there is no front-end-only read anywhere.
- **Why these judges pick it.** W2 at its purest (per-sender finality and CCVs are new in 2.0, and Aave, Re and Maple are adopting FTF, H6), W1, W4 (explorer links per message), and the Binance drain spread across ten chains (`00_season.md`).
- **Closest past work.** No past Chainlink winner used CCIP 2.0 (H3). Cache Coherence (2024 finalist) bridged a World ID recovery check over CCIP; DualSign and Defi Guardian used CCIP for safety flows. Difference: the security property comes from the protocol's new finality and verifier controls, not from app logic alone.
- **Gate.** Whether public testnet lanes accept block-depth requests today (Chainlink desk question 2). Fallback: show the asymmetry on a Chainlink Local fork in Foundry, and on testnet show the unpause still waiting for finality.
- **Stack options.** Chainlink only (both tracks, one partner). Finalist: good, the timers are a clean WOW.
- **Difficulty.** Medium. **Team fit:** high.

### P2. Conservation Verifier: a custom CCV that refuses to sign transfers that would break cross-chain supply (narrow, deepest CCIP 2.0 entry)

- **Pitch.** Kelp lost $293M to a spoofed cross-chain message and Liquid Network $320M to an unbacked cross-chain mint; this is an independent verifier, run as a CCIP 2.0 CCV, whose policy hook signs only when supply across chains still balances.
- **Falsifiable promise.** With the team's token pool requiring the Conservation CCV, a transfer that would mint more on the destination than is backed fails at the policy hook (the message stays UNTOUCHED with the hook's reason logged), while a legitimate transfer is attested and executes via `ccip-cli manual-exec` with status SUCCESS.
- **20 second demo.** The demo token has a deliberately buggy source-chain mint (the Liquid Network pattern). The attacker mints unbacked tokens and sends them over CCIP: the policy hook log prints "FAIL: remote supply would exceed locked by X", and the destination balance never moves. A normal user's transfer goes through seconds later.
- **How it uses CCIP 2.0.** CCV Starter Kit verifier and aggregator from the `local/` docker-compose stack, a PASS or FAIL policy hook written by the team (reads supply and locked balances on every lane chain), the pool's required CCV list (or a receiver's `requiredCCVs`), and `ccip-cli manual-exec --verifiers` because a non-onboarded cell is executed manually (H6).
- **Requirements.** Q1 and Q2: the pool and receiver contracts are CCIP 2.0 contracts on two testnets; state changes are mints and releases. Q3: optionally a CRE workflow refreshes a supply snapshot onchain that the hook reads, which also lets the project enter the CRE track.
- **Why these judges pick it.** W2 (the headline feature of CCIP 2.0 and the reason Lombard adopted it, H6), W1, and a security story told through the year's two biggest bridge losses. Judgement: Chainlink's interop team has few demos of third-party CCVs, so a working one is rare.
- **Closest past work.** Link-proxy (ETHOnline 2024) attested messages with Sign Protocol before finality; none used a CCV. Difference: verification is in the protocol path and blocks execution.
- **Gate.** Hour 0 to 6: get the starter kit's local stack signing on Sepolia and Base Sepolia (desk question 3). If it fails, fall back to Chainlink Local in Foundry with a forged committee attestation to show the extra CCV blocking it.
- **Stack options.** Chainlink only. Finalist: strong Technicality, weaker Usability.
- **Difficulty.** High (offchain cell, two-chain contracts, policy service). **Team fit:** very high (invariants and fuzzing are the product).

### P3. Float: merchants paid in seconds on faster-than-finality messages, within a reorg budget (stack with Arc)

- **Pitch.** A data-only CCIP message travels faster than finality and tells a liquidity pool on Arc to pay the merchant now; the finalized token transfer repays the pool later; a USD budget caps how much can be in flight.
- **Falsifiable promise.** A 40 USDC payment from Ethereum Sepolia credits the merchant on Arc testnet well before the token transfer finalizes; the pool's unrepaid exposure never exceeds the budget, so a payment that would exceed it waits for the finalized transfer (shown with timestamps).
- **20 second demo.** Three payments in a row: two land in seconds, the third shows "over budget, waiting for finality"; then the finalized transfer arrives and the pool's exposure bar drops to zero.
- **How it uses CCIP 2.0.** A small-payment sender requests block-depth finality for the data message; the Arc receiver allows block depth only from that sender; the token leg uses the pool's own finality floor. The budget is priced with Chainlink Data Feeds on the source chain for non-USDC payment assets.
- **Requirements.** Q1 to Q3 met in contracts on both chains; the front end only displays state.
- **Why these judges pick it.** W2 (faster-than-finality is the 2.0 feature institutions adopted first, H6), W5 (an Arc entry too), W3.
- **Closest past work.** Full Circle, Swap Pay and TapPay (payments with Chainlink); Link-proxy's "before finality" attestation. Difference: a bounded credit line priced by reorg risk, enforced by receiver finality rules.
- **Stack options.** Arc "Best Smart Contracts with Advanced Stablecoin Logic, In Arc Studio" ($3,000), which lists "Crosschain conditional transfer" and gives a bonus for reusable contracts; it requires building in Arc Studio and showing Studio in the demo (`00_current_tracks.md`). No EF prize.
- **Gate.** Which test tokens a Sepolia to Arc testnet lane carries, and whether block-depth requests are accepted there (desk question 2).
- **Difficulty.** Medium to high. **Team fit:** medium (DeFi accounting is strong; Arc Studio is new to the team).

### P4. Remote Bidder: bid in a Uniswap Continuous Clearing Auction from another chain, with exact refunds (stack with Uniswap)

- **Pitch.** A CCA lives on one chain; this lets bidders on other chains bid with one CCIP programmable token transfer and get their fill and their unspent currency back on their own chain.
- **Falsifiable promise.** A bidder on Base Sepolia who never touches the auction chain ends with their allocated tokens and an exact refund on Base Sepolia, and for every bidder deposits equal spent plus refunded to the wei (a Foundry invariant test run on a Chainlink Local fork, and a live run).
- **20 second demo.** Two remote bidders and one local bidder; the auction clears; the bid router sends fills and refunds back over CCIP; the reconciliation table shows zero difference per bidder.
- **How it uses CCIP 2.0.** Programmable token transfers in both directions with `ExtraArgsV3`; the auctioned token is deployed as a cross-chain token with V2 pools so fills can return; full finality for value legs.
- **Requirements.** Q1 to Q3: bids and refunds are CCIP state changes; CRE can trigger the post-auction settlement run (and enter the CRE track).
- **Why these judges pick it.** It is the listed "Cross-chain DeFi app with liquidity across multiple chains" done on a 2026 primitive; two-way messaging won before (Samvad, Defi Guardian, Bazaara, H4.1); W5.
- **Closest past work.** Bazaara (cross-chain order flow to a hub), Kura (a 2026 finalist with a CCA, `00_season.md`). Difference: remote participation in a CCA with an accounting invariant.
- **Stack options.** Uniswap "Build with Uniswap" ($10,000; CCA is in scope; the auction's validation hook restricts remote bids to the router, see the CCA repo's validation hooks: [continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction)). Optional ENSv2 is not natural; skip. No EF prize.
- **Difficulty.** Medium to high (auction plus two-way CCIP plus a CCT). **Team fit:** high.

### P5. Coupon Lane: a Hedera bond that crosses chains only to allowlisted holders and pays coupons on both sides (stack with Hedera)

- **Pitch.** A bond issued with Hedera's Asset Tokenization Studio becomes a cross-chain token whose pool refuses non-allowlisted holders before burning, and whose coupon reaches holders on Ethereum Sepolia over CCIP.
- **Falsifiable promise.** A transfer of bond units to a non-allowlisted Sepolia wallet reverts on Hedera before anything is burned; an allowlisted holder on Sepolia receives the scheduled coupon via CCIP on the stated date, and the cap table on both chains sums to the issued supply.
- **20 second demo.** One blocked transfer with the revert reason, one allowed transfer, then the coupon run: two holders, two chains, both paid.
- **How it uses CCIP 2.0.** V2 token pools with full-finality floors, source-side eligibility checks before lock or burn (ACE preflight if available on testnet, otherwise the team's own pool check), coupon messages from Hedera to Sepolia.
- **Requirements.** Q1 to Q3 met in contracts; Data Feeds can price the coupon if it is set in another currency.
- **Why these judges pick it.** W2 (compliant cross-chain tokens are the institutional story CCIP 2.0 is sold on, H6), W5, tokenized RWAs are in season and nearly empty at the finalist table (`00_season.md`).
- **Closest past work.** Defi Guardian (Hedera plus CCIP, New York 2025 winner), OpenCompliance (ACE on Arc). Difference: an issuer-grade token crossing chains with holder rules enforced at the pool.
- **Stack options.** Hedera "Tokenize Anything with Hedera Studios" ($5,000; must use ATS or Stablecoin Studio, demo on Hedera testnet, cover a lifecycle operation; extra points for compliance controls, oracle pricing and Scheduled Transactions) (`00_current_tracks.md`). CRE cannot write to Hedera (not a supported network), so this is a CCIP-only Chainlink entry.
- **Gate.** Whether an ATS token can sit behind a CCIP burn and mint pool on Hedera testnet (mint and burn roles), checked in the first four hours.
- **Difficulty.** High. **Team fit:** medium.

---

## 3. Track combo pass (fresh builds only; at most 3 partners, at most one EF prize)

| Combo | Build | Partner picks (3 max) | EF prize | Why it holds together (Judgement) |
|---|---|---|---|---|
| K1 | P1 plus C1 in one repo ("Refill Guard detects, Pause Fast fans out") | Chainlink (both tracks, counts once) | none | One security story, one partner slot, three prize chances ($1,500 CRE, 2 x $1,750 CCIP) plus finalist |
| K2 | P2 with a CRE supply snapshot | Chainlink (both tracks) | none | Deepest CCIP 2.0 entry; CRE adds the second Chainlink track at low cost |
| K3 | C4 Descriptor Notary | Chainlink CRE, EF, Arkiv | Best CROPS App | Each sponsor gets a central role: CRE checks, Arkiv mirrors, the wallet enforces |
| K4 | C5 Hookwatch | Chainlink CRE, Uniswap, optional Arkiv | none | Uniswap's biggest fresh pool plus the CRE prize |
| K5 | P4 Remote Bidder (plus a CRE settlement run) | Chainlink (both tracks), Uniswap | none | CCA is explicitly in Uniswap scope; CCIP is the core |
| K6 | C3 Dead Address Guard | Chainlink CRE, ENS | none | ENSv2 central; CRE as the sole writer |
| K7 | P3 Float | Chainlink CCIP, Arc | none | Arc Studio overhead is the cost; Arc winners have also won Chainlink CRE prizes before (Vouch DeFi, OpenPop, H3) |
| K8 | P5 Coupon Lane | Chainlink CCIP, Hedera | none | High risk, high fit with Hedera's "Extra points" list |

- None of the team's plans A to E uses Chainlink, and plans A, B, C and E state why a CRE add-on would be cosmetic there (`plans/A_verified_anon_reads.md`, `plans/B_dapp_leak_report.md`, `plans/C_private_invoicing_whitechain.md`, `plans/E_verified_frontend.md`). Judgement: do not bolt Chainlink onto those plans; a Chainlink entry means choosing one of K1 to K8 as the project.
- Whitechain cannot be combined with any CCIP idea (no CCIP lane) or any CRE write (not a CRE network), per H6.
- Judgement on ranking for this team: K1 (best odds per hour, timely, two Chainlink tracks), then K2 (most original, highest risk), then K3 (best three-partner stack, reuses the team's own Truthsign idea).

---

## 4. Workshop and desk questions for this pass

Chainlink has no workshop at Mumbai; ask at the Chainlink desk Thursday before 21:00 (full list in H8):
1. Will a CCIP 2.0 feature (`getCCVsAndFinalityConfig`, faster-than-finality, a custom CCV) be weighted above a v1-style `ccipSend` integration? (P1 to P5)
2. Which testnet lanes accept block-depth `requestedFinalityConfig` today, and what floors do the test token pools allow? (P1, P3)
3. Can a team require its own CCV on a public testnet lane using the CCV Starter Kit `local/` stack and `ccip-cli manual-exec --verifiers`? (P2)
4. Is ACE usable on testnet without an access request? (P5)
5. Is a `--broadcast` simulation with tx hashes sufficient for the CRE prize? Is a project in both Chainlink tracks judged in each? (all)

Other sponsors' workshops that decide a combo (all Thu 5 Nov, times IST, from `00_current_tracks.md`):
- ENS, 16:00, Room 1: which ENSv2 permission features (per-name registries, scoped resolvers) are callable on Sepolia this week, and does "only a CRE forwarder may write these records" count as central? (C3)
- Arkiv, 16:00, Room 2: does mirroring ERC-7730 descriptors and verdicts, or v4 hook verdicts, count as "something Ethereum depends on", and what freshness is expected? (C4, C5)
- Uniswap Foundation, 16:30, Room 1: is a cross-chain bid router for CCA, or a hook-vetting router, "integrating the Uniswap stack" enough for a top place? Any CCA factory already on Unichain Sepolia or Sepolia? (P4, C5)
- Arc, 17:00, Room 1: can contracts that receive CCIP messages be written and deployed from Arc Studio, and does Arc testnet have a CRE forwarder now? (P3)
- EF, 17:00, Room 2: would a descriptor-versus-bytecode notary with wallet enforcement count as a CROPS App under "Secure"? (C4)
- Hedera, 15:30, Room 2 (clashes with 0G only): can an ATS security token be minted and burned by a CCIP pool on Hedera testnet? (P5)

---

## 5. Risks shared by all ideas (Judgement)

- A single $1,500 CRE winner means the CRE entry must be a strong whole product (W5); a narrow CRE-only demo is better aimed at the finalist room than at this prize.
- CCIP testnet finality on Ethereum Sepolia is about 13 to 17 minutes for finalized messages (stated in the CCV Starter Kit test guide, H6). Plan demo timing around it, or pre-send messages and show the explorer.
- Keep every claim checkable: past winners stated their mocks; CrossChainPort's overclaim did not place (H4.1).
- Partner judging is repo, README and video only: put contract line links for every Chainlink call at the top of the README, plus simulation logs and explorer links.
