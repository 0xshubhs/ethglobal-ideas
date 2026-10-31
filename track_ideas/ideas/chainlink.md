# Chainlink: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: Chainlink's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only.

In scope, both fresh (category `building-from-scratch`): **Best workflow with CRE** ($1,500 USDC, single winner) and **Best use of Chainlink CCIP 2.0** ($3,500 USDC, 2 x $1,750). Chainlink has no Continuity track at Mumbai and no workshop on the schedule. ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink); [event page](https://ethglobal.com/events/mumbai))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim Mumbai text, fetched 2026-10-31), `track_ideas/history/chainlink.md` (dossier, cited as [H] with its section numbers), `track_ideas/ideas_draft/chainlink.md` (draft, ideas C1 to C5 and P1 to P5), `track_ideas/00_season.md` (season brief, cited as [S]). ETHGlobal pages were not re-fetched; the 31 Oct snapshot is a few hours old.

**Re-checked today.** The direct CCIP doc pages the dossier cites (`/ccip/concepts/execution-latency/ftf-dapps`, `/ccip/ccv-starter-kit/evm/test-your-setup`) answered HTTP 404 to the fetch tool this morning, but the same pages, with the same `Source:` URLs, are served inside the official docs bundle [docs.chain.link/ccip/llms-full.txt](https://docs.chain.link/ccip/llms-full.txt) (downloaded 2026-10-31, HTTP 200). Every CCIP 2.0 fact marked "(bundle)" below was read there today.

---

## 1. What Chainlink's judges reward

### Sourced facts

- The CRE text is the Buenos Aires 2025 to New York 2026 text with "first" removed and a single winner: "Build, simulate, or deploy a CRE Workflow that's used as an orchestration layer within your project", "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent", "Demonstrate a successful simulation (via the CRE CLI) or a live deployment on the CRE network", "Be meaningfully used in your project", and "It is NOT mandatory to deploy it during the hackathon, simulation is enough!" ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink); [H] 2.4)
- The CCIP text is the 2024 CCIP text renamed "CCIP 2.0", with CRE added to the encouraged list: "Each project must use Chainlink CCIP in some form to make a state change on a blockchain", "a front end simply reading from Chainlink Data Feeds doesn't count", "Using Chainlink CCIP inside your smart contracts is required, though you are encouraged to utilize Chainlink Runtime Environment (CRE), Chainlink Data Feeds, Chainlink Data Streams and Chainlink VRF." ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink))
- CCIP 2.0 launched on 28 Sep 2026 with Cross-Chain Verifiers (CCVs), faster-than-finality (FTF) and ACE hooks; no ETHGlobal winner has used it yet ([Chainlink blog](https://chain.link/blog/introducing-ccip-2-0); [H] 3).
- All 8 past "Best workflow with CRE" winners also won another partner prize or a finalist slot ([H] 3). Past CRE winners made the workflow's report the only key that moves value: ENShell ("can only be updated by the ChainLink CRE final forwarding call"), Vouch DeFi, OpenPop, Deflow ([H] 4.2).
- Non-winners that copied official templates (Remote Minter, Enclave Portfolio), wrote an unenforced score (Ketchup) or let a backend own the write (Envelope) did not place ([H] 4.4).
- Neither track publishes numeric judging criteria, a "What we want to see" list or a "Won't place" list beyond the Data Feeds sentence (`track_ideas/00_current_tracks.md`). Partner prizes are judged from repo, README and video only ([details page](https://ethglobal.com/events/mumbai/info/details)).

### Judgement: what these judges will reward (ranked, from [H] 4.5)

1. The Chainlink output is the gate on a real state change, and the README links the enforcing line.
2. The season's newest capability used for its purpose. At Mumbai that means CCIP 2.0 features (per-sender `allowedFinalityConfig`, required CCVs, V2 pools with FTF buckets), not a v1-style `ccipSend`.
3. A real external system or a real second chain, with mocks named.
4. Evidence: `cre workflow simulate --broadcast` logs and tx hashes, CCIP Explorer links, Foundry tests.
5. For the single CRE prize, a whole product; for CCIP 2.0, depth on the new protocol.
6. Never a template, never a score nothing enforces, never an overclaim.

### Judgement: the obvious entries we assume several teams will submit

- CRE: an AI trading or yield agent on a cron; an LLM resolving a prediction market (an official template); a liquidation-protection bot (template and the ETHOnline 2026 challenge); a KYC-gated vault with a mock KYC API; an LLM "agent firewall"; and, this week, a Binance-style EIP-7702 hot-wallet monitor.
- CCIP: a CCT token bridge or launchpad; a cross-chain yield aggregator; cross-chain USDC remittance with an India or UPI angle; a "multihop router" (listed in the prize text); cross-chain NFT mints and DAO votes.

Each final idea must beat these on at least one property a judge can check from the README.

---

## 2. Rubric used (Judgement)

Neither track has numeric criteria or "What we want to see" items, so the criteria are the verbatim requirement sentences, plus the two task criteria.

**Best workflow with CRE**

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| O | Workflow is the orchestration layer | "used as an orchestration layer within your project" | 15% |
| I | Blockchain integrated with a real external system | "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent" | 10% |
| E | Execution evidence | "Demonstrate a successful simulation (via the CRE CLI) or a live deployment" | 10% |
| M | Meaningful use, product completeness | "Be meaningfully used in your project" | 15% |
| Nov | Novelty versus past winners and the expected field | task | 25% |
| Fea | Feasibility in 36 hours for this team | task | 25% |

**Best use of Chainlink CCIP 2.0**

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| S | CCIP makes the state change, inside the team's contracts | "use Chainlink CCIP in some form to make a state change"; "Using Chainlink CCIP inside your smart contracts is required" | 15% |
| V | Depth of CCIP 2.0-specific features | track title "Best use of Chainlink CCIP 2.0" | 20% |
| X | Encouraged services used for a reason | "encouraged to utilize ... CRE, ... Data Feeds, ... Data Streams and ... VRF" | 5% |
| U | Value as a cross-chain application | "Possible use cases: Cross-chain DeFi app ... yield aggregator ... Token bridge ... Multihop CCIP Router" | 10% |
| Nov | Novelty | task | 25% |
| Fea | Feasibility | task | 25% |

Overall = weighted sum, one decimal.

Qualification checks applied to every idea:

- CRE R1 to R4 as quoted above. Implied won't-place, inferred from past Chainlink pages, not on the Mumbai page: "Please use CRE instead of using Chainlink Functions or Automation" (Buenos Aires) and "A placeholder handler or an isolated example that does not contribute to the application will not qualify" (ETHOnline 2026) ([H] 2.3).
- CCIP Q1 (state change), Q2 (CCIP inside contracts), Q3 (encouraged services, optional), won't-place W ("a front end simply reading from Chainlink Data Feeds doesn't count").
- ETHGlobal rules ([details page](https://ethglobal.com/events/mumbai/info/details)): all code after Thu 5 Nov 21:00 IST; steady commits; AI-use attribution and spec files committed; video 2 to 4 minutes, human voice.
- No idea may depend on pre-existing project code. The team's earlier proposals (for example Truthsign in `reports/ETHGlobal finalist ideas 2023 to 2026.md`) are ideas, not code, so reusing them is allowed.

### Facts re-checked on 2026-10-31 that change the ideas (bundle)

- **Receiver finality policy is per sender.** The V2 receiver hook is `getCCVsAndFinalityConfig(uint64 sourceChainSelector, bytes sender)` returning `requiredCCVs`, `optionalCCVs`, `optionalThreshold`, `allowedFinalityConfig`; the `CCIPReceiver` default returns `WAIT_FOR_FINALITY_FLAG`. But the docs' `CCIPClientExample` configures FTF **per source chain** with `enableChain(remoteChainSelector, extraArgs, allowedFinalityConfig)`, so a receiver copied from the example admits FTF from every sender on that chain. "Full finality (`0x00000000`) is always accepted, regardless of `allowedFinalityConfig`." ([bundle](https://docs.chain.link/ccip/llms-full.txt), pages `/ccip/evm/tutorials/application-developers/send-arbitrary-data` and `/ccip/concepts/execution-latency/ftf-dapps`) **Consequence:** P1 works as designed, and the per-chain example is a real footgun for a fuzzer to find (new idea Receiver Lab).
- **Destination rejection is not a revert.** "the message is already committed on the source chain. The OffRamp's finality check fails, the execution state becomes FAILURE, and the message can be re-executed once the receiver's finality configuration admits it." Also: "For pure token transfers (no data and a zero gas limit), the OffRamp does not call the receiver or check its finality configuration." (bundle, `/ccip/concepts/execution-latency/ftf-dapps`)
- **FTF on testnet works for data-only messages.** A Sepolia-source tutorial passes `--finality 32` and says it is "Supported for data-only sends; for token / data-and-token sends, only if your token pool supports it [dash replaced] the starter kit's TEST [two-way arrow replaced] LINK pool does not, and only supports default finality." (bundle, `/ccip/canton/tutorials/destination/arbitrary-messaging` and its prerequisites page) **Consequence:** P1's fast pause is data-only and should work; any FTF token leg needs the team's own V2 pool.
- **Pool FTF control is split between roles.** `setAllowedFinalityConfig(bytes4)` sets the pool's floor; "The rate limit admin ... can call `setRateLimitConfig`", including the `fastFinality: true` bucket; V2 pools "maintain separate rate-limit buckets for faster-than-finality transfers." (bundle, `/ccip/concepts/cross-chain-token/token-issuer-guide`) **Consequence:** a CRE consumer contract can be a pool's `rateLimitAdmin` without owning the pool (new idea FTF Governor).
- **The CCV Starter Kit is heavier than the draft assumed.** "The CCV Starter Kit is a brownfield kit: it deploys into a Kubernetes cluster"; a `local/` docker-compose stack exists "for experimentation only"; the onchain kit deploys a CREATE2 factory, a `VersionedVerifierResolver`, the committee verifier and lane config "on both the source and destination chains", in two passes around the signer key; the documented test is `ccip-cli manual-exec <src-tx> --verifiers grpcs://<your-aggregator-host>:443`; the aggregator certificate "must be issued by a publicly trusted certificate authority"; a Sepolia finalized message waits "roughly 13 to 17 minutes". (bundle, `/ccip/ccv-starter-kit/prerequisites`, `/evm/deploy-your-first-cell`, `/evm/test-your-setup`)
- **Policy hook semantics.** The verifier POSTs to `<base_url>/v1/evaluate` and expects `{"decision":"PASS"}` or `{"decision":"FAIL"}`; "FAIL: the node drops the message and never signs it"; "In a 2-of-2 committee one FAIL is decisive"; "A degraded endpoint must return an error, never FAIL"; timeout "defaults to 5 seconds and cannot exceed 15"; `HOLD` "is not implemented". (bundle, `/ccip/ccv-starter-kit/how-to/add-a-custom-policy-hook`) **Consequence:** the draft P2 demo was internally inconsistent (section 3); fixed below.

---

## 3. Vetting the ten draft ideas

### Best workflow with CRE

| Draft idea | O | I | E | M | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| C1 Refill Guard | 6 | 5 | 8 | 5 | 4 | 8 | 6.0 | R4 at risk: a 7702-delegated EOA's code is `0xef0100 \|\| delegate` ([EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)), so `Treasury.refill` can check `hot.code.length == 0` onchain with no workflow at all. The "external" allowlist is the team's own JSON. The Binance monitor is the most obvious security idea this week | **Revise** into Ledger Match: reconcile outflows against an offchain withdrawal ledger, which no onchain check can see |
| C2 Sealed PoC Bounty | 9 | 7 | 7 | 8 | 9 | 5 | 7.5 | None formal. The fork endpoint is the team's own Anvil, so R2's "external system" is weak and consensus across nodes is unproven | **Revise**: use a third-party simulation API pinned to a block, stage the TEE as an upgrade |
| C3 Dead Address Guard | 6 | 4 | 8 | 6 | 5 | 5 | 5.5 | R2 rests on a mock exchange API the team writes; "CRE is the only writer of ENS records" is ENShell's and Immunity's pattern ([H] 4.2); depends on ENSv2 tooling this week | **Drop**, replaced by Veto Window |
| C4 Descriptor Notary | 6 | 8 | 8 | 7 | 7 | 6 | 6.8 | None. A judge can say a deterministic descriptor check is a CI job, so O is weak unless the onchain verdict is what the wallet enforces | **Revise**: log-triggered notary, wallet refuses on chain verdict |
| C5 Hookwatch | 7 | 7 | 8 | 7 | 3 | 6 | 5.9 | None formal. At least five hook-risk scanners at ETHOnline 2026 won nothing, and the Uniswap panel lists a hook risk scanner as an obvious entry (`track_ideas/ideas/uniswap.md` section 1) | **Drop**, replaced by FTF Governor |

### Best use of Chainlink CCIP 2.0

| Draft idea | S | V | X | U | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| P1 Pause Fast, Unpause Slow | 9 | 9 | 7 | 6 | 8 | 8 | 8.1 | None. The gate (does testnet admit block-depth data messages) is now largely answered by the bundle | **Keep**, small revision: add a measured latency table, drop the "extra CCV for admin" unless P2's cell exists |
| P2 Conservation Verifier | 8 | 10 | 4 | 6 | 9 | 4 | 7.3 | Logic error: an unbacked mint on the source chain breaks a global supply invariant for every later transfer, so "a normal user's transfer goes through seconds later" cannot hold. The kit needs a public-CA TLS aggregator and two-pass onchain deploys | **Revise**: per-lane cumulative invariant against the lock box, planted pool accounting bug |
| P3 Float (Arc) | 8 | 8 | 6 | 7 | 5 | 4 | 6.1 | Arc Studio must be the starting point and shown in the demo (`00_current_tracks.md`); whether CCIP receivers can be written in Studio is unknown; fronting liquidity before finality is the Across pattern, and generic bridging is fading [S] 4 | **Revise**: narrow to merchant refunds with a priced reorg budget; stays rank 5 |
| P4 Remote Bidder (Uniswap CCA) | 9 | 6 | 4 | 8 | 6 | 5 | 6.3 | None. Only `ExtraArgsV3` is CCIP 2.0-specific; two full-finality round trips per bidder make the demo slow | **Revise**: V2 pool for the auctioned token, invariant test as the headline |
| P5 Coupon Lane (Hedera) | 8 | 7 | 4 | 7 | 7 | 3 | 6.0 | Whether an ATS token can sit behind a CCIP burn and mint pool on Hedera testnet is unknown; ACE on testnet unknown; CRE cannot write to Hedera ([H] 6) | **Drop**, replaced by Receiver Lab |

No draft idea depends on pre-existing project code. None of plans A to E uses Chainlink, and plans A, B, C and E say a CRE add-on would be cosmetic there (`plans/`), so a Chainlink entry means choosing one of the builds below as the project.

---

## 4. Final ranked tables

### Best workflow with CRE ($1,500, one winner)

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Sealed PoC Bounty: a bounty that pays only when the exploit moves funds on a pinned fork | 7.9 | Revise (done below) | Chainlink (CRE) only |
| 2 | Veto Window: a timelocked upgrade that a CRE workflow cancels if its simulation breaks the protocol | 7.8 | New (replaces Dead Address Guard) | Chainlink (CRE) only; optional EF CROPS as "Secure" (weak) |
| 3 | Ledger Match: the hot wallet is refilled only when every outflow matches a withdrawal ticket | 7.7 | Revise of Refill Guard (done below) | Chainlink (CRE, plus CCIP via P1) |
| 4 | FTF Governor: a CRE workflow that tightens a token's fast-finality budget when the source chain looks unsafe | 7.3 | New (replaces Hookwatch) | Chainlink (CRE and CCIP, one partner) |
| 5 | Descriptor Notary: clear-signing descriptors checked against bytecode, and a wallet that refuses on a FAIL | 7.1 | Revise (done below) | Chainlink (CRE), EF Best CROPS App, Arkiv Mirror |

### Best use of Chainlink CCIP 2.0 ($3,500, two winners)

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Pause Fast, Unpause Slow: pauses travel faster than finality, unpauses never do | 8.2 | Keep (small revision) | Chainlink (both tracks with a CRE detector) |
| 2 | Receiver Lab: an invariant fuzz kit for CCIP 2.0 receivers on Chainlink Local | 7.8 | New (replaces Coupon Lane) | Chainlink (CCIP) only |
| 3 | Conservation Verifier: a custom CCV whose policy hook refuses unbacked mints | 7.6 | Revise (done below) | Chainlink (both tracks with a CRE snapshot) |
| 4 | Remote Bidder: bid in a Uniswap CCA from another chain with refunds exact to the wei | 6.3 | Revise (done below) | Chainlink (CCIP), Uniswap |
| 5 | Float: instant merchant refunds on Arc inside a priced reorg budget | 6.1 | Revise (done below) | Chainlink (CCIP), Arc Advanced Stablecoin Logic |

**Shared harness (Judgement).** CRE ideas 1 and 2 share a "simulate at a pinned block, then judge the deltas" workflow; CRE 3 and CCIP 1 are one repo (K1 below); CRE 4 and CCIP 3 both need a team-deployed V2 token pool. Build one; if its gate fails, pivot to the idea that reuses its harness.

---

## 5. The final ideas in full: Best workflow with CRE

### CRE rank 1. Sealed PoC Bounty: a bounty that pays only when the exploit moves funds on a pinned fork

**Pitch.** Bug bounty payouts today depend on a platform's triage. Here a whitehat submits an encrypted proof of concept; a CRE workflow decrypts it, runs it on a simulation of the target at a pinned block through a third-party simulation API, measures how much value left the target, and pays the escrowed bounty in the same run if the delta clears the threshold. The PoC is never published onchain, only its hash.

**Falsifiable promise.** "A PoC that moves at least the stated threshold out of `TargetVault` at block B is paid in the same workflow run; one that does not is paid nothing; the PoC bytes appear in no calldata, event or log, only `keccak256(poc)`. Re-running `cre workflow simulate` on the same submission gives the same verdict."

**Demo moment (20 seconds).** Two submissions against the team's deliberately vulnerable vault (a donation-style share-price bug, the pattern behind Tectonic's $124.5M loss [S] 1.1). The fake PoC: the workflow log prints "delta 0, threshold 10,000 USDC, no payout" and `BountyEscrow` emits `Rejected(hash)`. The real PoC: "delta 48,210 USDC" and the escrow pays 500 test USDC; the explorer shows only the payout and the hash.

**How it works.**
- `BountyEscrow.sol` on Sepolia: holds the bounty, the target address, block number B and threshold; `onReport` (built on the CRE `ReceiverTemplate` pattern, callable only through the forwarder) pays or rejects.
- Workflow (TypeScript SDK): HTTP trigger on submission; fetch the ciphertext from the escrow event; decrypt with a key held as a Vault DON secret; call the simulation API with the PoC transactions at block B plus balance reads before and after; compute the delta deterministically; write the report.
- Simulation provider: Tenderly's simulation API is the first choice (Judgement: a real third-party system; not verified this pass, see question 7). Fallback: the team's own Anvil fork behind HTTPS, stated as a trust move in the README.
- Stage 2 only if stage 1 works by Fri 12:00 IST: Confidential HTTP so the API key stays sealed, and `handlerInTee` so decryption happens in the enclave. Both run in the simulator ([CRE TS docs](https://docs.chain.link/cre/ts/llms-full.txt); [CRE release notes](https://docs.chain.link/cre/release-notes)).

**Go or no-go gate (hours 0 to 6).** One simulation API call from inside `cre workflow simulate` returns identical JSON twice for the same block; response size fits CRE's HTTP limits ([Service quotas](https://docs.chain.link/cre/service-quotas)). If not, fall back to the team's Anvil endpoint.

**Requirement checklist.**
- [x] R1: the workflow is the adjudicator; no other path pays.
- [x] R2: Sepolia escrow plus a third-party simulation API (fallback: team endpoint, disclosed).
- [x] R3: `cre workflow simulate --broadcast` with payout and rejection tx hashes in the README.
- [x] R4: delete the workflow and nothing can ever be paid.
- [x] Implied won't-place: no Functions or Automation; the TEE handler, if used, does the decryption, so it is not a placeholder.
- [x] Fresh build; public libraries only (CRE SDK, Foundry, viem).
- [ ] Risk: framing. The target is the team's own planted vault; the README must say so and frame it as payout automation, not an exploit tool.

**Why it beats rivals (Judgement).** Every other security-flavoured CRE entry this week will have an LLM score something. This verdict comes from executing the exploit and measuring a balance, which an oracle team trusts more than a model, and it moves money to a person.

**Closest prior winners.** [ENShell](https://ethglobal.com/showcase/enshell-6t95y) (Cannes 2026 CRE winner and finalist: Claude scores an agent action in the Vault DON); SentinelCRE (Convergence 1st, anomaly-triggered circuit breakers, [Convergence winners](https://chain.link/blog/convergence-hackathon-winners)); [Deflow](https://ethglobal.com/showcase/deflow-4it5u) (escrow with two exits). Difference: proof by execution, deterministic at a block.

**Honest gap for the README.** The simulation provider sees the PoC in plaintext. Trust moves from a bounty platform's triage to a simulator.

**Stack.** Chainlink only. Finalist track separately: strong WOW if the live payout works.

**Difficulty.** Medium to high. The time sink is deterministic consensus over a large simulation response.

**Scores.**

| O | I | E | M | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 8 | 8 | 9 | 6 | **7.9** |

**Judge notes (Judgement).**
- Chainlink judge: "This is what 'orchestration layer' means: chain state, an external simulator, a secret, and a payout, with nothing else able to pay."
- Chainlink judge: "Show us two nodes would agree. Pin the block, strip timestamps from the response, and say how."
- Veteran: "Ship the plain HTTP version first. The TEE is a bonus, not the demo."

---

### CRE rank 2. Veto Window: a timelocked upgrade that a CRE workflow cancels if its simulation breaks the protocol

**Pitch.** Upgrade hijacks are one of 2026's loss shapes (DefiLlama classes Drift's $295M on 1 Apr as "proxy upgrade hijack"; Drift is a Solana program, so the EVM case is the analogue) ([DefiLlama hacks API](https://api.llama.fi/hacks); [S] 1.1). On an OpenZeppelin `TimelockController`, the `CANCELLER_ROLE` can cancel any queued operation ([OpenZeppelin TimelockController](https://docs.openzeppelin.com/contracts/5.x/api/governance#TimelockController)). Veto Window gives that role to a CRE consumer contract: when a `CallScheduled` event appears, the workflow simulates the queued batch at the current block, runs the protocol's declared invariants on the post-state, and cancels the operation if any fails.

**Falsifiable promise.** "For any operation queued on our demo protocol's timelock, the workflow posts PASS or cancels it in its first run after the `CallScheduled` log. A benign upgrade passes and later executes. An upgrade whose new implementation adds a hidden `sweep` path or shifts a storage slot fails the declared invariant and is cancelled with `Vetoed(id, invariantIndex)`."

**Demo moment (20 seconds).** The DAO console queues two upgrades. Upgrade A passes. Upgrade B looks identical in the proposal text, but its implementation writes the owner into the slot that held `totalAssets`; the workflow log prints "invariant 2 failed: totalAssets() 1,000,000 then 0" and the timelock row flips to "Cancelled by Veto Window". Then the attacker tries to revoke the canceller role: that is itself a timelocked operation, and it is vetoed too.

**How it works.**
- `InvariantRegistry.sol`: the protocol declares view calls and expected relations (for example `totalAssets()` unchanged by an upgrade, `owner()` unchanged, implementation code hash on an allowlist).
- Workflow: EVM Log trigger on `CallScheduled`; read the batch; call the simulation API with the batch plus the invariant view calls at the current block; compare; if any fails, write a report the consumer turns into `timelock.cancel(id)`.
- Optional: fetch verified source of the new implementation from Sourcify and show it in the dashboard (display only).

```solidity
interface IVetoWindow {
    struct Invariant { address target; bytes4 selector; uint8 relation; }
    function invariants(address timelock) external view returns (Invariant[] memory);
    function onReport(bytes calldata metadata, bytes calldata report) external;
    event Vetoed(bytes32 indexed id, uint256 invariantIndex);
    event Passed(bytes32 indexed id);
}
```

**Go or no-go gate (hours 0 to 6).** The same simulation call as CRE rank 1 returns deterministic results; the EVM Log trigger fires in simulation on a Sepolia `CallScheduled` event.

**Requirement checklist.**
- [x] R1: the workflow is the only holder of `CANCELLER_ROLE`.
- [x] R2: Sepolia timelock plus a simulation API (plus Sourcify, display only).
- [x] R3: simulate with `--broadcast`; the cancel tx hash is in the README.
- [x] R4: without the workflow, no veto exists.
- [x] Implied won't-place: none hit. Fresh build; OpenZeppelin and CRE SDK are public libraries.
- [ ] Risk: a malicious proposer can re-queue. State it; the point is that every re-queue is checked.

**Why it beats rivals (Judgement).** Upgrade monitors exist offchain (alerting); none of the past CRE winners holds a protocol role and uses it. The "revoking the veto is itself vetoed" beat follows from OpenZeppelin's design (the timelock is its own admin) and is easy to check in Q and A.

**Closest prior winners.** SentinelCRE (Convergence 1st, circuit breakers); [ENShell](https://ethglobal.com/showcase/enshell-6t95y) (CRE as the only writer); [Safe City](https://ethglobal.com/showcase/safe-city-qbgmm) (Brussels Connect, contract safety signal). Difference: an enforced cancel on queued governance, decided by simulation.

**Stack.** Chainlink only. EF "Best CROPS App" under "Secure" is possible but weak (Judgement). Finalist: medium to strong, a live veto is a clean refusal.

**Difficulty.** Medium. **Team fit:** very high (storage collisions and upgrade bugs are audit staples).

**Scores.**

| O | I | E | M | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 8 | 7 | 8 | 7 | **7.8** |

**Judge notes (Judgement).**
- Chainlink judge: "Holding a real role on a real timelock is the W1 pattern. Link the `cancel` line in the README."
- Veteran: "Invariants are declared by the protocol, so a lazy protocol declares none. Ship three sensible defaults and say what they miss."

---

### CRE rank 3. Ledger Match: the hot wallet is refilled only when every outflow matches a withdrawal ticket

**Pitch.** In the Binance drain, one transaction carried 50 EIP-7702 authorizations for consecutive nonces and the hot wallet became a sweeper ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). Any key compromise produces outflows the exchange's own withdrawal system never approved. Ledger Match makes a CRE workflow the only refiller of the hot wallet: before each refill it reconciles every outflow since the last refill against signed withdrawal tickets from the exchange's backend. One unmatched outflow, or a delegation the onchain check sees, and the refill does not happen.

**Falsifiable promise.** "After any hot-wallet outflow without a matching ticket, the treasury's next refill is refused with `Unreconciled(txHash)`, and the vault pause fans out over CCIP (CCIP rank 1); a refill after only ticketed withdrawals succeeds. The cheap onchain rule `hot.code.length == 0` blocks a 7702 delegation even if the backend is down."

**Demo moment (20 seconds).** Ten ticketed withdrawals reconcile green. The attacker script replays the Binance shape on Sepolia against the team's own test hot wallet and sweeps the 0.1 ETH float. Next workflow run: "1 unmatched outflow, 0.1 ETH, tx 0x..."; the 5 ETH refill goes red; "float lost 0.1 ETH, treasury 10 ETH intact".

**How it works.**
- `Treasury.sol`: `refill` only via the forwarder report; also reverts if the hot wallet has code (the EIP-7702 delegation designator, [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)).
- Exchange backend (team-built, disclosed as a demo enterprise system): issues EIP-712 signed withdrawal tickets; the workflow fetches them with Confidential HTTP so the API key stays sealed.
- Workflow: Cron trigger (30 s minimum, [Service quotas](https://docs.chain.link/cre/service-quotas)) plus EVM Log trigger on refill requests; reads outflows from an indexer or RPC logs; verifies ticket signatures; writes the refill or a refusal.

**Requirement checklist.**
- [x] R1: the workflow is the only refill path.
- [x] R2: Sepolia plus an enterprise system (the withdrawal ledger). The ledger is a team-built stand-in; question 6 asks whether that is acceptable.
- [x] R3: simulate with `--broadcast`, both tx hashes.
- [x] R4: without the workflow the treasury cannot refill at all.
- [x] Defensive framing: the attacker script runs only against the team's own wallets ([S] 1.1).
- [x] Fresh build, public libraries only.

**Why it beats rivals (Judgement).** Several teams will show a 7702 monitor that alerts. This one reconciles against the business's own ledger, which catches any key compromise (7702 or a plain transfer), and it refuses money rather than raising an alert. It also answers "why not just check onchain?" directly: the onchain check is included, and the ticket ledger is what only CRE can join.

**Closest prior winners.** [Wolfy](https://ethglobal.com/showcase/wolfy-r87tb) (Buenos Aires CRE winner, 7702 wallet with CRE); Chainlink's `circuit-breaker` template ([cre-templates](https://github.com/smartcontractkit/cre-templates)); [OpenPop](https://ethglobal.com/showcase/openpop-grkq2) (screening proof gates an escrow). Difference: custodial treasury reconciliation, deterministic, no LLM.

**Stack.** Chainlink, entered in both tracks when built with CCIP rank 1 (combo K1). Finalist: strong, because it is the week's headline turned into a refusal.

**Difficulty.** Low to medium. **Team fit:** high.

**Scores.**

| O | I | E | M | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 8 | 8 | 7 | 7 | **7.7** |

**Judge notes (Judgement).**
- Chainlink judge: "Exactly the CRE pitch: blockchains joined to an enterprise system. Say plainly that the backend is a stand-in."
- Veteran: "Novelty is capped by how many Binance demos we will see. The reconciliation is your differentiator; lead with it, not the hack replay."

---

### CRE rank 4. FTF Governor: a CRE workflow that tightens a token's fast-finality budget when the source chain looks unsafe

**Pitch.** CCIP 2.0 lets a token move faster than finality inside a separate rate-limit bucket set by the issuer (bundle, `/ccip/concepts/cross-chain-token/token-issuer-guide`). Those buckets are static. FTF Governor makes them respond: a CRE workflow reads source-chain finality health from the beacon API (finality checkpoint lag) and, on L2 sources, Chainlink's L2 sequencer uptime feed ([L2 sequencer feeds](https://docs.chain.link/data-feeds/l2-sequencer-feeds)), and as the pool's `rateLimitAdmin` it shrinks the fast bucket when finality lags. The consumer contract can tighten without limit but can loosen only up to the issuer's cap and only after N healthy runs.

**Falsifiable promise.** "When the configured drill threshold is crossed, the next workflow run cuts the fast bucket to the floor, and a 32-block transfer above it reverts at the source while a full-finality transfer of the same size still succeeds. The consumer can never set a fast bucket above the issuer's cap."

**Demo moment (20 seconds).** Dashboard: "finality lag 2 epochs, fast bucket 5,000 TKN". Drill: set the threshold to 1 epoch. Next run: the bucket drops to 100; the 1,000 TKN FTF send reverts; the full-finality send goes through and shows as waiting in the CCIP Explorer.

**How it works.**
- The team deploys its own CCT with V2 pools on Sepolia and Base Sepolia (CCT Foundry tutorials, [docs-cct-foundry](https://github.com/smartcontractkit/docs-cct-foundry)), sets `setAllowedFinalityConfig` to a block depth, and assigns `rateLimitAdmin` to the `GovernorConsumer`.
- Workflow: Cron trigger; HTTP GET `/eth/v1/beacon/states/head/finality_checkpoints` from two public beacon endpoints ([Beacon API](https://ethereum.github.io/beacon-APIs/)); EVM read of the sequencer uptime feed where one exists; writes `setRateLimitConfig` with `fastFinality: true` through the consumer.
- `GovernorConsumer` enforces "tighten freely, loosen slowly, never above cap".

**Go or no-go gate (hours 0 to 6).** Self-serve registration of a team CCT with V2 pools on two testnets, and a `setRateLimitConfig` call from a non-owner `rateLimitAdmin`. Fallback: a Chainlink Local fork in Foundry for the pool, CRE writes to a mirror contract on Sepolia.

**Requirement checklist.**
- [x] R1: the workflow is the only party adjusting the fast bucket.
- [x] R2: two chains plus the beacon API (real) and a Data Feed.
- [x] R3: simulate with `--broadcast`.
- [x] R4: without it the bucket is static, which is the status quo it replaces.
- [x] CCIP Q1 and Q2 also met (the team's pools and transfers), so it enters both tracks.
- [ ] Risk: the demo uses a drill threshold, because real non-finality cannot be staged. Say so.

**Why it beats rivals (Judgement).** It is the only idea in either list that makes CCIP 2.0's newest risk control adaptive, and Chainlink's own `multi-chain-token-manager` template does not touch FTF buckets ([cre-templates](https://github.com/smartcontractkit/cre-templates)).

**Closest prior winners.** None used FTF ([H] 3). [Rebalancor](https://ethglobal.com/showcase/rebalancor-f6pgy) (Sydney, automation plus feeds) is the nearest "parameters move with data" winner.

**Stack.** Chainlink only (both tracks). Finalist: weak to medium; the story needs a minute of explanation.

**Difficulty.** Medium to high. **Team fit:** medium to high.

**Scores.**

| O | I | E | M | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 7 | 7 | 7 | 9 | 5 | **7.3** |

**Judge notes (Judgement).**
- Chainlink judge: "We would love to see FTF buckets driven by data. Show the issuer cap enforced in the consumer, or it reads like a key with too much power."
- Veteran: "The CCT registration is the risk. If it is not done by Friday 03:00, ship the fork fallback."

---

### CRE rank 5. Descriptor Notary: clear-signing descriptors checked against bytecode, and a wallet that refuses on a FAIL

**Pitch.** Clear signing shows humans what a transaction does, but only if the descriptor is honest; WazirX's signers approved what their screens showed ([S] 0, signal 6). A CRE workflow, triggered when a descriptor is registered, checks every ERC-7730 descriptor ([ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)) against the deployed bytecode's selectors and the verified ABI, and writes PASS or FAIL onchain. The team's wallet demo reads the verdict and refuses to render friendly text for a FAIL.

**Falsifiable promise.** "A descriptor that labels `transferFrom` as 'Claim rewards', or maps the wrong parameter as the recipient, gets FAIL with the offending selector; the wallet shows 'Unverified descriptor' instead of the label; the honest descriptor passes; re-running the simulation gives the same verdict hash."

**Demo moment (20 seconds).** Two descriptors for the same contract; one workflow run; the registry shows FAIL for the lying one, and the wallet screen flips from green to red.

**How it works.** EVM Log trigger on `DescriptorSubmitted`; HTTP to the public ERC-7730 registry on GitHub and to Sourcify for the verified ABI; selector extraction from bytecode via a lens contract or the ABI; deterministic checks; report to `DescriptorRegistry`. The registry contents are mirrored to Arkiv for the Arkiv stack.

**Requirement checklist.**
- [x] R1 and R4: the registry accepts verdicts only from the workflow, and the wallet enforces them.
- [x] R2: GitHub registry and Sourcify (both real) plus chain reads.
- [x] R3: simulate with `--broadcast`.
- [x] EF CROPS and Arkiv requirements are in their own sponsor files (`track_ideas/ideas/ef.md`, `track_ideas/ideas/arkiv.md`).

**Why it beats rivals (Judgement).** A check that is enforced by a wallet beats a report. The weakness is that a judge can say a CI job could do it; the answer is that a DON verdict onchain is something any wallet can trust without trusting the team.

**Closest prior winners.** [Safe City](https://ethglobal.com/showcase/safe-city-qbgmm) (Brussels Connect, safety score before signing); the team's own Truthsign proposal (an idea, no code). Difference: deterministic, registry-wide, enforced.

**Stack.** Chainlink (CRE), EF "Best CROPS App" as the one EF prize, Arkiv "Mirror something Ethereum depends on". The best three-partner stack in this file.

**Difficulty.** Medium. **Team fit:** high.

**Scores.**

| O | I | E | M | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 8 | 8 | 8 | 7 | 6 | **7.1** |

**Judge notes (Judgement).**
- Chainlink judge: "The CRE part is the weakest of the three sponsors here. Make the log trigger and the onchain verdict obvious, or we will see a script."
- Veteran: "Three sponsors means three READMEs worth of evidence. Budget six hours for submission material."

---

## 6. The final ideas in full: Best use of Chainlink CCIP 2.0

### CCIP rank 1. Pause Fast, Unpause Slow: pauses travel faster than finality, unpauses never do

**Pitch.** A pause can only stop things, so the worst a reorg can do to a fast pause is cause a needless pause. This design lets pause messages travel at block depth while unpause messages must wait for full finality, enforced by each vault's CCIP 2.0 receiver policy per sender. When combined with Ledger Match (CRE rank 3), the CRE workflow is the detector that fires the pause.

**Falsifiable promise.** "A pause sent from Ethereum Sepolia lands on vaults on Base Sepolia, Arbitrum Sepolia and OP Sepolia before the attacker's next withdrawal there, and the README table shows its measured latency next to a full-finality message on the same lane. A forged fast unpause from the admin sender fails at the destination (state FAILURE) and becomes executable only after full finality."

**Demo moment (20 seconds).** Three vault panels with timers. The compromise on one chain triggers the pause: "Paused at +N s" on each; the attacker's withdrawal on Base Sepolia reverts `Paused()`; the unpause sits in the CCIP Explorer as waiting for finality, about 13 to 17 minutes on Sepolia (bundle, test-your-setup page).

**How it works.**
- Two sender contracts on the source: `GuardianSender` requests `FinalityCodec._encodeBlockDepth(d)` in `ExtraArgsV3`; `AdminSender` requests `0x00000000`.
- Each vault's receiver overrides `getCCVsAndFinalityConfig(sourceChainSelector, sender)`: block depth for `GuardianSender`, `WAIT_FOR_FINALITY_FLAG` for everyone else. Guardian messages may only set `paused = true`.
- The revision: a latency table built from the CCIP REST API (`https://api.ccip.chain.link/v2/messages/<id>`, bundle) for every demo message, a replayable number in the TARE style [S] 3. The "extra required CCV for admin" from the draft is dropped unless CCIP rank 3's cell is running.

```solidity
function getCCVsAndFinalityConfig(uint64 sourceChainSelector, bytes calldata sender)
    external
    view
    returns (address[] memory requiredCCVs, address[] memory optionalCCVs, uint8 optionalThreshold, bytes4 allowedFinalityConfig)
{
    address s = abi.decode(sender, (address));
    bool fast = sourceChainSelector == HOME_SELECTOR && s == guardianSender;
    return (new address[](0), new address[](0), 0, fast ? FinalityCodec._encodeBlockDepth(GUARDIAN_DEPTH) : FinalityCodec.WAIT_FOR_FINALITY_FLAG);
}
```

**Go or no-go gate (hours 0 to 4).** Send one block-depth data message from Sepolia to Base Sepolia to a V2 receiver; the bundle says data-only FTF is supported, so the remaining questions are which lanes and how fast the default executor picks it up (question 2). Fallback: show the asymmetry on a Chainlink Local fork (v0.3.0 supports CCIP 2.0 lanes, [chainlink-local releases](https://github.com/smartcontractkit/chainlink-local/releases)) and the waiting unpause on testnet.

**Requirement checklist.**
- [x] Q1: CCIP messages set `paused` on three chains.
- [x] Q2: sends and receives are in the team's contracts.
- [x] Q3: CRE is the detector (enters the CRE track too); Data Feeds price the exposure on the dashboard.
- [x] W: no front-end-only read anywhere.
- [x] Fresh build; `@chainlink/contracts-ccip` 2.0.0 and Chainlink Local are public libraries.

**Why it beats rivals (Judgement).** The obvious CCIP entries are bridges and routers that would work identically on CCIP 1.x. This one exists only because CCIP 2.0 lets a receiver choose finality per sender, and it argues a security property out of that choice.

**Closest prior winners.** [DualSign](https://ethglobal.com/showcase/dualsign-q0exs) and [Defi Guardian](https://ethglobal.com/showcase/defi-guardian-223a5) (security flows over CCIP); [Samvad](https://ethglobal.com/showcase/samvad-mpnxv) (multi-step messaging). No past winner used CCIP 2.0 ([H] 3).

**Stack.** Chainlink, both tracks (one partner slot). Finalist: strong, timers are a clean WOW.

**Difficulty.** Medium. **Team fit:** high.

**Scores.**

| S | V | X | U | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 9 | 7 | 7 | 8 | 8 | **8.2** |

**Judge notes (Judgement).**
- Chainlink judge: "Per-sender finality is the feature we hoped someone would explain. Put the policy function at the top of the README."
- Chainlink judge: "Say what happens to a fast pause that is reorged: our committee quarantines it until finality (bundle, CCV overview). That answer wins Q and A."
- Veteran: "A compromised guardian can grief with pauses. Admit it and show the cap on how often it can pause."

---

### CCIP rank 2. Receiver Lab: an invariant fuzz kit for CCIP 2.0 receivers on Chainlink Local

**Pitch.** CCIP 2.0 adds new ways for a receiver to be wrong: FTF admitted per chain when it should be per sender (the docs example configures it per chain), state that changes between a FAILURE and a later re-execution, and token-only arrivals that skip the receiver's finality check entirely (all bundle facts, section 2). Receiver Lab is a Foundry kit that drives any V2 receiver through Chainlink Local's CCIP 2.0 lanes with stateful fuzzing and ships invariants for each of these classes, then proves a fixed receiver on a live testnet lane.

**Falsifiable promise.** "On three sample receivers written from the official tutorials, the kit finds: FTF admitted from an untrusted sender, a double credit when a FAILURE message is re-executed after a config change, and an accounting assumption broken by a token-only transfer. Each finding is a failing test a judge can run with one `forge test` command; the fixed receiver passes all of them and executes a real message on Sepolia to Base Sepolia."

**Demo moment (20 seconds).** `forge test --match-contract ReceiverLab` on the tutorial receiver: three red invariants with minimal call sequences printed. Apply the one-line fixes; all green. Then the CCIP Explorer link for the fixed receiver's live message.

**How it works.** Handler contracts wrap Chainlink Local's simulator routers; actors send with random `requestedFinalityConfig`, senders and token amounts; a "re-execute" action replays FAILURE messages after random config changes; invariants express "no FTF from a non-allowlisted sender", "each message ID credits once", "credited balance equals tokens received". An optional Echidna or Medusa harness is generated with the same properties.

**Go or no-go gate (hours 0 to 4).** Chainlink Local v0.3.0 can produce FAILURE-then-re-execute on a V2 receiver in Foundry. If not, implement re-execution by calling the local OffRamp's manual execution path directly.

**Requirement checklist.**
- [x] Q1 and Q2: the fixed receiver and sender run real CCIP state changes on testnet; the kit itself is CCIP contract code.
- [ ] Q3: no encouraged service is natural (Judgement: do not bolt one on).
- [x] W: none.
- [x] Fresh build, public libraries only.

**Why it beats rivals (Judgement).** Nobody else will ship tooling for a protocol version five weeks old, and this is the team's daily craft. The risk is that judges read "best use" as an application; Scaffold Chainlink won a CCIP prize as pure tooling ([Scaffold Chainlink](https://ethglobal.com/showcase/scaffold-chainlink-pwkxb)).

**Closest prior winners.** [Scaffold Chainlink](https://ethglobal.com/showcase/scaffold-chainlink-pwkxb) (ETHOnline 2024 CCIP, starter kit); [CCTUP](https://ethglobal.com/showcase/cctup-cp7sa) (Cannes 2025 CCIP, record and replay). Difference: correctness properties for CCIP 2.0's new surfaces.

**Stack.** Chainlink only. Finalist: weak (tooling demos poorly to generalists).

**Difficulty.** Low to medium. **Team fit:** very high.

**Scores.**

| S | V | X | U | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 9 | 3 | 5 | 9 | 8 | **7.8** |

**Judge notes (Judgement).**
- Chainlink judge: "If the per-chain FTF footgun is real in our own example, we want to know, and we would credit it."
- Veteran: "Report doc issues to Chainlink as feedback, not as a 'bug in Chainlink'. The example is an example."

---

### CCIP rank 3. Conservation Verifier: a custom CCV whose policy hook refuses unbacked mints

**Pitch.** Liquid Network lost $320M to an "unbacked cross-chain mint" and Kelp $293M to "cross-chain message spoofing" ([DefiLlama hacks API](https://api.llama.fi/hacks)). CCIP 2.0 lets an issuer require its own verifier in addition to Chainlink's committee. This team runs one, from the CCV Starter Kit, whose policy hook signs a transfer only if the lane still conserves: cumulative minted on the destination plus this amount is at most what the source lock box actually received.

**Falsifiable promise.** "With the team's pool requiring the Conservation CCV, a transfer whose message claims more than the lock box received gets FAIL from the hook with the shortfall in `reason`, and never executes; ordinary transfers before and after it are attested and execute with status SUCCESS via `ccip-cli manual-exec --verifiers`."

**Demo moment (20 seconds).** The demo pool has a planted accounting bug (it records the requested amount but a fee-on-transfer path delivers less, a classic audit finding). The attacker uses that path: the hook log prints "FAIL: minted 1,000 + 1,000 > locked 1,980", and the destination balance never moves. A normal user's transfer is signed and executed a minute later, because the lock box keeps the slack (the revision that fixes the draft's inconsistency).

**How it works.** The onchain kit deploys the resolver, verifier and lane config on Sepolia and Base Sepolia in two passes; the off-chain kit's `local/` docker-compose runs one verifier and one aggregator; the aggregator is exposed through a tunnel with a publicly trusted certificate; the policy hook is a small TypeScript service implementing `/v1/evaluate` that reads the lock box on the source and the minted total on the destination. A single-cell committee makes one FAIL decisive (bundle). Optional CRE workflow posts a supply snapshot onchain, which enters the CRE track.

**Go or no-go gate (hours 0 to 8).** A message requiring the team's CCV executes via `manual-exec` against the team's aggregator. If not by Fri 05:00 IST, switch to CCIP rank 1 (the receivers and senders carry over).

**Requirement checklist.**
- [x] Q1 and Q2: pool, receiver and verifier contracts on two testnets; mints and releases are the state changes.
- [x] Q3: optional CRE snapshot.
- [x] W: none.
- [x] Fresh build; the CCV Starter Kit is an official starter kit.
- [ ] The docs say a single cell "is for learning, not production"; say so in the README.

**Why it beats rivals (Judgement).** A working third-party CCV is the deepest possible CCIP 2.0 entry and probably unique at Mumbai. The cost is a full person-day on infrastructure.

**Closest prior winners.** [Link-proxy](https://ethglobal.com/showcase/link-proxy-92s2y) (ETHOnline 2024 CCIP, attestation before finality with Sign Protocol). None ran a verifier in the message path.

**Stack.** Chainlink, both tracks if the CRE snapshot is built. Finalist: strong Technicality, weak Usability.

**Difficulty.** High. **Team fit:** very high for the invariant, medium for the infrastructure.

**Scores.**

| S | V | X | U | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 10 | 5 | 7 | 9 | 4 | **7.6** |

**Judge notes (Judgement).**
- Chainlink judge: "Keep the committee verifier as default and add yours as defense in depth. That is our own guidance."
- Veteran: "Docker, two chains, TLS and a two-pass signer registration in 36 hours is a lot. One person owns it from minute one."

---

### CCIP rank 4. Remote Bidder: bid in a Uniswap CCA from another chain with refunds exact to the wei

**Pitch.** A Continuous Clearing Auction lives on one chain. Remote Bidder lets a bidder on Base Sepolia bid with one programmable token transfer and receive the fill and the unspent currency back on their own chain, with an accounting invariant as the headline.

**Falsifiable promise.** "For every bidder, deposits equal spent plus refunded to the wei, in a Foundry invariant test on a Chainlink Local fork and in a live run; a remote bidder never touches the auction chain."

**Demo moment (20 seconds).** Two remote bidders and one local; the auction clears; fills and refunds return over CCIP (pre-sent, since each leg waits for finality); the reconciliation table shows zero difference per bidder.

**How it works.** Bid router on the auction chain restricted by the CCA validation hook ([continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction)); the auctioned token deployed as a CCT with V2 pools so fills can return; full finality for every value leg; a CRE settlement run optional.

**Requirement checklist.** [x] Q1 and Q2 (bids and refunds are CCIP state changes in contracts); [x] Q3 optional CRE; [x] W none; [x] Uniswap FEEDBACK.md and form (`track_ideas/ideas/uniswap.md`); [x] fresh build.

**Why it beats rivals (Judgement).** It is the listed "Cross-chain DeFi app" on a 2026 primitive. Its CCIP 2.0 depth is shallow (only `ExtraArgsV3` and V2 pools), which is why it ranks fourth.

**Closest prior winners.** [Bazaara](https://ethglobal.com/showcase/bazaara-49peb) (order flow to a hub over CCIP); Kura (Tokyo 2026 Uniswap 1st with CCA, `track_ideas/ideas/uniswap.md`).

**Stack.** Chainlink (CCIP) and Uniswap. Finalist: medium.

**Difficulty.** Medium to high. **Team fit:** high.

**Scores.**

| S | V | X | U | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 6 | 4 | 8 | 6 | 5 | **6.3** |

**Judge notes (Judgement).**
- Chainlink judge: "Solid, but it would work on CCIP 1.6. Tell us what 2.0 adds."
- Veteran: "Four 15-minute finality waits do not fit a 4 minute demo. Pre-send everything and show explorer links."

---

### CCIP rank 5. Float: instant merchant refunds on Arc inside a priced reorg budget

**Pitch.** Narrowed from the draft. A merchant on Arc testnet refunds a customer on Ethereum Sepolia instantly: a data-only block-depth CCIP message tells a small refund pool on the customer's side to pay now, and the finalized token transfer repays the pool later. A USD budget priced with Data Feeds caps unrepaid exposure.

**Falsifiable promise.** "Two refunds land in seconds; a third that would exceed the budget waits for the finalized transfer, shown with timestamps; the pool's exposure never exceeds the budget."

**Demo moment (20 seconds).** Three refunds in a row; the third shows "over budget, waiting for finality"; the finalized transfer arrives and the exposure bar drops to zero.

**How it works.** Fast leg: data-only FTF message (supported on testnet, bundle). Token leg: full finality through the test token pool, which supports only default finality (bundle). Receiver admits block depth only from the merchant's refund sender. Contracts started in Arc Studio, as Arc requires.

**Requirement checklist.** [x] Q1 to Q3 (Data Feeds price the budget); [x] W none; [ ] Arc: "Arc Studio as the starting point" and Studio shown in the demo; whether Studio can build CCIP receivers is unknown (`00_current_tracks.md`); [x] fresh build.

**Why it beats rivals (Judgement).** Refunds are a payments problem nobody pitches, and the budget makes the reorg risk explicit. Still close to fast-fill bridging, which is fading [S] 4.

**Closest prior winners.** [Full Circle](https://ethglobal.com/showcase/full-circle-b091b), [TapPay](https://ethglobal.com/showcase/tappay-941om) (payments with Chainlink); [DeltaFX](https://ethglobal.com/showcase/deltafx-9fewc) (CCIP between Arc and Sepolia).

**Stack.** Chainlink (CCIP) and Arc "Best Smart Contracts with Advanced Stablecoin Logic, In Arc Studio". Finalist: medium.

**Difficulty.** Medium to high. **Team fit:** medium.

**Scores.**

| S | V | X | U | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 8 | 8 | 6 | 7 | 5 | 4 | **6.1** |

**Judge notes (Judgement).**
- Chainlink judge: "Good use of FTF on a data message. The Arc lane must exist for your token; check the directory first."
- Veteran: "Arc Studio is a second learning curve. Only build this if Arc is the lead sponsor."

---

## 7. Track combination pass (fresh builds only)

Rules (sourced, [event page FAQ](https://ethglobal.com/events/mumbai); [details page](https://ethglobal.com/events/mumbai/info/details)): at most 3 partner prizes; a partner with several tracks counts as one ("you can be eligible for all of them"); the EF places a project in at most one EF prize; the finalist track is separate. Both Chainlink tracks therefore cost one partner slot.

| Combo | Build | Partner picks (max 3) | EF prize | Prize chances | Judgement |
|---|---|---|---|---|---|
| K1 | Ledger Match detects, Pause Fast fans out (one repo) | Chainlink (CRE and CCIP) | none | $1,500 CRE, 2 x $1,750 CCIP, finalist | Best odds per hour, timely, leaves two partner slots free |
| K2 | Sealed PoC Bounty plus Veto Window as a second workflow on the same simulation harness | Chainlink (CRE) | none | $1,500, finalist | Strongest CRE entry; one prize only, so finalist matters |
| K3 | Conservation Verifier with a CRE snapshot | Chainlink (both) | none | both Chainlink tracks | Deepest CCIP 2.0 entry, highest risk |
| K4 | FTF Governor | Chainlink (both) | none | both Chainlink tracks | Novel, weak finalist story |
| K5 | Descriptor Notary | Chainlink (CRE), EF, Arkiv | Best CROPS App | three sponsors | Best three-partner stack; CRE is the weakest of the three |
| K6 | Receiver Lab | Chainlink (CCIP) | none | $1,750 | Cheapest to build; pair with K1 only if the team splits |
| K7 | Remote Bidder | Chainlink (CCIP), Uniswap | none | CCIP plus Uniswap's four places | Only if Uniswap is the lead |
| K8 | Float | Chainlink (CCIP), Arc | none | CCIP plus Arc $3,000 | Only if Arc is the lead |

Combos to avoid (Judgement):
- **Chainlink with Whitechain:** no CCIP lane and not a CRE network ([H] 6).
- **Chainlink with Hedera for CRE writes:** Hedera is not a CRE network ([H] 6); the Coupon Lane drop follows from this.
- **Two Chainlink stories in one video:** K1 is one story (detect then pause). Do not add Receiver Lab or Veto Window to the same 4 minutes.
- **A CRE add-on to plans A to E:** the plans say it would be cosmetic (`plans/`).

---

## 8. Chainlink's top 3 overall

1. **K1: Ledger Match plus Pause Fast, Unpause Slow (CCIP 8.2, CRE 7.7).** One repo enters both Chainlink tracks for one partner slot. The CCIP half is the clearest CCIP 2.0 showcase in this file (per-sender finality, verified today), the CRE half joins the chain to an enterprise ledger, and the demo is this week's headline turned into two refusals. Medium difficulty with a Chainlink Local fallback.
2. **Sealed PoC Bounty (CRE 7.9).** The most original CRE entry and the best finalist beat: an exploit pays a person only by moving funds on a pinned simulation. The single $1,500 CRE prize goes to a whole product; this is one.
3. **Receiver Lab (CCIP 7.8).** Highest feasibility of the deep CCIP 2.0 ideas and squarely the team's craft; it targets one of two CCIP prizes with little competition. Veto Window (CRE 7.8) is the close alternative if the team wants a CRE entry instead.

---

## 9. Questions for the Chainlink workshop and booth

Chainlink has **no workshop** on the Mumbai schedule ([event page](https://ethglobal.com/events/mumbai)). Ask in the ETHGlobal Discord Chainlink channel now and at the Chainlink booth on Thu 5 Nov before 21:00 IST. Most decisive first.

1. **CCIP 2.0 weighting:** will an entry built on 2.0 features (per-sender `allowedFinalityConfig`, required CCVs, V2 pools with FTF buckets) be scored above a v1-style `ccipSend` integration? Does a developer tool such as an invariant fuzz kit for V2 receivers count as "best use"? (decides CCIP ranks 1 to 4)
2. **FTF on testnet:** which testnet lanes accept a block-depth `requestedFinalityConfig` for data-only messages today (Sepolia to Base Sepolia, Arbitrum Sepolia, OP Sepolia, Arc), does the default executor pick them up automatically, and what latency should we expect? (P1, Float)
3. **Both tracks:** can one project win both "Best workflow with CRE" and a CCIP 2.0 place, or is it placed in one? (K1, K3, K4)
4. **CRE evidence:** is `cre workflow simulate --broadcast` with tx hashes through the real Sepolia forwarder enough, or do judges prefer a live CRE deployment, and is deploy access offered at Mumbai as it was in Buenos Aires? Which CLI and TS SDK versions should we pin (the dossier lists CLI 1.39.0)?
5. **Custom CCV on testnet:** can a team use the CCV Starter Kit `local/` docker-compose cell on public testnet lanes with `ccip-cli manual-exec --verifiers`, can the aggregator be reached on localhost by our own `ccip-cli`, or must it be `grpcs` with a publicly trusted certificate? Is the onchain kit's CREATE2 factory deployable by anyone on Sepolia and Base Sepolia? (Conservation Verifier)
6. **External systems:** is a team-built stand-in for an enterprise system (an exchange's withdrawal-ticket API) acceptable as R2's "external API, system", or do judges want a third-party API? (Ledger Match)
7. **HTTP limits and determinism:** what response size and timeout limits apply to CRE HTTP calls in simulation, and how should a workflow reach consensus over a large third-party simulation response (for example a simulation API pinned to a block)? May API keys for such services be Vault DON secrets in simulation? (Sealed PoC Bounty, Veto Window)
8. **Roles held by workflows:** is it acceptable for a `ReceiverTemplate` consumer to hold protocol roles (`TimelockController` `CANCELLER_ROLE`, a CCIP pool's `rateLimitAdmin`)? Can a self-registered testnet CCT with V2 pools assign `rateLimitAdmin` to a contract, or does Chainlink assign it? (Veto Window, FTF Governor)
9. **Docs example:** the FTF guide's `CCIPClientExample` sets `allowedFinalityConfig` per source chain, not per sender. Is per-sender policy the intended pattern, and would you welcome findings like this from a fuzz kit? (Receiver Lab, P1)
10. **Confidential features:** with no privacy track at Mumbai, do Confidential HTTP or `handlerInTee` still earn credit in the CRE track, and are they available to fresh teams in simulation without early access? (Sealed PoC Bounty, Ledger Match)
11. **Faucets and fees:** current faucet amounts for LINK and CCIP test tokens on Sepolia, Base Sepolia, Arbitrum Sepolia and Arc testnet; should we pay fees in LINK or native; is there an event top-up?
12. **Networks during Glamsterdam:** is Sepolia or Hoodi preferred for CRE writes this week, given the release-note caution on gas limits ([CRE release notes](https://docs.chain.link/cre/release-notes)), and does Arc testnet have a CRE forwarder yet? (Float, any Arc stack)
13. **Data Feeds on testnet:** is the L2 sequencer uptime feed available on any testnet we can read from CRE? (FTF Governor)
14. **Security demos:** any concern with a planted vulnerable vault and a working PoC in a public repo, given it targets only our own contracts? (Sealed PoC Bounty)

---

## 10. Gaps and caveats

- No Mumbai judges are named (`track_ideas/00_current_tracks.md`); "what judges reward" is inferred from past winners' descriptions in [H], not from videos or repos.
- Two dossier doc URLs returned 404 to the fetch tool today; their content was read from the official docs bundle instead. Treat any 404 at build time as a page move, not a removed feature.
- Not verified this pass: the Tenderly simulation API's determinism and limits, the public ERC-7730 registry's current location, L2 sequencer feeds on testnets, self-serve V2 CCT registration on testnet, and whether Arc Studio can build CCIP receivers. Each idea names its gate.
- Scores are this panel's judgement. The single CRE prize makes any CRE ranking fragile: one strong all-round product in the field takes it.
