# Plan D: NullRelay, a relayerless Tornado Cash withdrawal on the ERC-8421 alt mempool, and how to break and fix it

Target: ETHGlobal Mumbai, 5 to 7 Nov 2026 (hacking Thu 5 Nov 21:00 IST to Sat 7 Nov 09:00 IST). EF prize "Best use of the Frame Transaction Alternative Mempool" plus the ETHGlobal finalist track.

Status: a plan only. It contains no project code and must not be copied into the project repo before 21:00 Thursday (see section 7.4).

## How to read this plan

Source tags point to the research notes in `research_notes/EF tracks and Whitechain ideas/` and to pages I checked on 2026-10-27:

| Tag | Source |
|---|---|
| [FT Qn] | `frame_tx_alt_mempool.md`, question n |
| [JC Qn] | `judging_criteria.md`, question n |
| [EG Qn] | `ef_goals_and_gaps.md`, question n |
| [PS] | `privacy_stack_gaps.md` |
| [W1] to [W12] | Web pages and npm metadata checked on 2026-10-27, listed at the end |

A tag means the statement is sourced. Anything marked **J:** is my own judgement, estimate or inference. Gas figures marked J are estimates to be replaced by `eth_estimateFrameTransactionGas` output during the event.

## 0. The decision in one paragraph

Build **NullRelay**: a staked paymaster contract that turns the real, unmodified Tornado Cash 0.1 ETH pool already replayed on the alt-mempool devnet [FT Q2] into a relayerless withdrawal service. A fresh address holding 0 ETH signs a 4-frame EIP-8141 transaction. The paymaster's VERIFY frame checks the Groth16 proof, Tornado's root and nullifier state, and the exact SENDER frame that will run, then approves payment. Tornado pays the fee back to the paymaster inside the same transaction. The canonical mempool rejects this transaction, the alt mempool rejects it from an unstaked paymaster, and it admits it from a staked one. Then we attack our own design ("break the rules"): one note fans out into many admitted transactions, a single inclusion invalidates all but one of them, and under ERC-8421's blame rules the honest paymaster is the one that pays in reputation. Last, we fix it with a gateway variant that uses the nullifier as an EIP-8250 nonce key, so the sidecar itself refuses the duplicates [W5]. This combines candidate (2) with a focused slice of (5) and a small slice of (4). **J:** it is the best fit for a DeFi-security team, it avoids the SIGDATACOPY risk entirely, and it gives a finalist demo that a non-specialist can follow.

## 1. Verifiable promise and pitch

**One-sentence promise (what judges watch being proven live):** a never-funded address withdraws 0.1 ETH from the unmodified, already-deployed Tornado Cash pool with no relayer and no server; the public mempool rejects the frame transaction, the alt mempool admits it, and the explorer shows a staked contract paid the gas and was repaid inside the same transaction.

**3-line pitch:**
1. Withdrawing from a privacy pool to a fresh address needs gas in that address, so today you either link yourself by funding it or trust a relayer. Vitalik calls these intermediaries "honestly embarrassing" [EG Q4].
2. NullRelay replaces the relayer with a staked paymaster contract that verifies the Tornado proof inside an EIP-8141 VERIFY frame and is repaid by the withdrawal itself. Only the ERC-8421 alt mempool can carry it.
3. Then we attack it: one note becomes many admitted transactions that one inclusion invalidates, and the paymaster's reputation burns. Our nullifier-keyed gateway makes the mempool refuse the duplicates, and we propose the rule text.

## 2. Prize targets

| Target | Decision | Why |
|---|---|---|
| EF "Best use of the Frame Transaction Alternative Mempool" ($5,000: $2,500 / $1,500 / $1,000) [JC Q2] | **Primary and only EF prize.** | It covers build areas 1 (a) and (b) and area 3 of the prize text [JC Q2]. |
| Other EF prizes (CROPS App, Anon-RPC) | Do not select. Include a CROPS section in the README anyway. | EF places each project in at most one EF prize [JC Q2]. **J:** ticking CROPS as well would cost no extra partner slot, but the user wants one EF prize and our fit is strongest here. The README CROPS section still helps, because EF judges decide placement. |
| Other partner prizes (max 3, EF counts as 1) [JC Q1, Q4] | **None.** | **J:** none fits without bolted-on scope. Whitechain needs USDT on Whitechain Sepolia. Uniswap needs a Uniswap integration (Himitsu already did private trading [W3]). World IDKit would add an identity gate that cuts against the privacy story. Chainlink, ENS, Arc, Hedera, 0G, 1inch and Definitive are unrelated. Arkiv is unpublished; glance at its Thu 16:00 workshop, but do not add scope. |
| ETHGlobal Finalist track (separate from partner prizes) [JC Q1] | **Yes.** Opt into "Finalist and Partner Prizes". | It requires the 7-minute live session (4 min demo, 3 min Q&A) on Sat 09:30 to 12:30 [JC Q1]. |

## 3. Criteria matrix

### 3.1 EF alt mempool prize (verbatim criteria and requirements from [JC Q2])

| Verbatim criterion or requirement | How NullRelay scores | Evidence judges see | Risk to the score (J) |
|---|---|---|---|
| "creativity" | It retrofits a contract deployed years before frames existed, with no change to Tornado: the relayer becomes a contract. We then attack our own design and fix it. | Frames diagram; the attack and fix demo. | Overlap with MacWha's 4337 privacy paymaster [W6] and Himitsu [W3]. Answered in section 4. |
| "usefulness" | It removes the relayer for existing pools, which hold the anonymity sets. The pattern works for any Groth16 pool whose proof binds relayer and fee. The attack data is directly useful to the ERC-8421 authors. | README "Generalising" and the rule proposal. | Devnet-only anonymity set. Disclosed. |
| "practicality" | Deployed bytecode, the real 2020 proving key, the real sidecar, one CLI command, and a fee that covers max cost. | Quick start; measured gas table. | Double proof verification costs about 240k extra gas (trade-off, section 10). |
| "how well it works" | A live admitted transaction, three lanes reproducible from the CLI, and measured fan-out numbers with tx hashes. | Explorer links; results JSON in the repo. | Devnet outage. Recordings and saved links are the fallback (section 11). |
| "relation to the alt mempool" | It uses a staked payer, STORAGE-032 non-entity reads, per-entity budgets, reputation and blame, keyed-nonce identity and payer balance reservation [FT Q1] [W5]. It contributes a measured attack and a rule proposal. | The "Why only the alt mempool" table in the README. | None. This is the core of the project. |
| "Show real alt mempool usage: a link to your admitted transaction on the devnet explorer, or code that submits one." | Both: an admitted-tx table in the README, and `nullrelay withdraw`, which submits one. | README top section. | Devnet reset removes links. Keep the raw signed tx JSON and the CLI as proof. |
| "Your team must be able to explain the design, the code and the trade-offs." | Each person owns one layer and rehearses section 12. | Q&A. | Low, if the rehearsal happens. |
| Area 1: "verification budget higher than 100k ... PQ-secure privacy protocols" and "(b) more flexible state access in sender or paymaster" | The pay frame uses about 260k to 320k gas (J) and reads Tornado's storage, which canonical rules forbid [FT Q1]. | Lane A and B rejection strings. | None. |
| Area 3: "break the rules and improve them: DoS vectors and vulnerabilities, new rules, simulators and fuzzers" | Nullifier fan-out (mass invalidation against an honest payer), reservation squatting, a GAS-rule incompatibility in the deployed verifier, and two rule proposals. | `docs/findings`, demo beat 2. | The experiment may need organiser permission. |
| Area 2: "developer tooling ... an admission simulator" | Small slice only: an explain panel built on `ethrex_simulateFrameTransaction` (stretch S2). | UI lane cards. | Optional. |

### 3.2 ETHGlobal finalist rubric (verbatim from [JC Q1])

| Verbatim criterion | How NullRelay scores |
|---|---|
| "Technicality: How complex is the problem you're addressing, and how sophisticated is your solution?" | Groth16 checked inside a VERIFY frame, cross-frame binding through FRAMEPARAM and FRAMEDATACOPY, staking and reputation economics, an EIP-8250 nonce-key dedupe, and a GAS-rule-compliant verifier with the same verifying key. |
| "Originality: Is your project introducing a new idea or creatively solving an existing problem?" | The first frame-native retrofit of an unmodified legacy pool on the real alt mempool, plus a measured mempool-level attack on the design ERC-8421 names as a use case [FT Q5]. |
| "Practicality: How complete and functional is your project? Could it be used by its target audience today?" | It works end to end on the devnet, with one command for the user. Honest limit: Hegota is not live [FT Q1]. |
| "Usability (UI/UX/DX): How intuitive is your project? Have you made it easy for users to interact with your solution?" | A one-screen UI (paste note, new address, Withdraw) with three lane cards and explorer links, plus a `--json` CLI for developers. |
| "WOW Factor: Does your project leave a lasting impression? This is the catch-all for anything unique or impressive that may not fit into the other categories." | The balance flips from 0 to 0.098 ETH beside the canonical rejection. Then "we just got our own paymaster blamed for 19 invalid transactions with one note". |

### 3.3 Compliance items that can cost eligibility

| Rule (verbatim or close, source) | Plan |
|---|---|
| "Submissions with large single commits or missing histories may be disqualified." [JC Q1] | Each person commits every 30 to 60 minutes. Never squash. |
| "Clearly distinguish between what's new and what's reused." [JC Q1] | README table "New at Mumbai vs reused" (section 10). |
| Video "between 2 and 4 minutes", no "AI Voiceover", at least 720p, no speed-up, intro of 20 s at most, at most 4 bullets per slide [JC Q1] | Target 2:35 to 2:50 at 1080p with a human voice (section 9.2). |
| AI "Attribution", "Involvement", "Spec-Driven Development" [JC Q1] | Section 13. |
| Classic track: no prior project-specific code, designs or assets [JC Q1] | Section 7.4. |
| Partner prizes are judged only from the materials [JC Q1] | The README and video must stand alone for EF. |

## 4. Prior art and differentiation

### 4.1 Prior art

| Project | What it does | Overlap | How NullRelay differs |
|---|---|---|---|
| Robert MacWha, `privacy-paymaster` (4337) [W6] | ERC-4337 paymasters for Tornado Cash and Railgun "to enable private unshields to new user accounts without needing a trusted per-protocol relayer". The paymaster validates and executes the proof in `validatePaymasterUserOp`. Its threat docs cover front-run griefing (ratios of 1.67:1 to 5.4:1) and insufficient-execution-gas griefing. Kohaku's Tornado plugin depends on its SDK [W7]. | Same goal, same pool. | Frame-native: no bundler, no EntryPoint, and the real ERC-8421 sidecar. Its griefing analysis assumes one spend invalidates one op. We show that at the mempool layer one spend invalidates K pending duplicates, so the ratio becomes 1:K, and we measure what that does to reputation. **J:** expect the judges to know this repo. Cite it first. |
| Robert MacWha, `minimal-shielded-pool` [FT Q6] [W8] | A new pool that is sender and payer, with nullifiers as nonce keys at sequence 0, a pinned frame layout, and credits for recipients. | The nonce-key dedupe idea we use in V2. | We apply the pattern to an unmodified legacy pool through a gateway, and measure the failure it prevents (V1 against V2). |
| Himitsu (ETHGlobal Tokyo 2026) [W3] | "Private trading without an app relayer, powered by EIP-8141 frame transactions": its own privacy pool is the sender, a separate prefunded paymaster pays, it uses Uniswap V2, and the team patched ethrex's mempool validation. | "No relayer" privacy spends as frame txs. | We use the real Tornado bytecode and the stock alt-mempool sidecar with staking and reputation, without patching any node. |
| lfglabs SPHINCS- frame account, EVM PORST (Cannes 2026 finalist), "Lamport" (same track, repo 404), Kohaku pq-account, Zkipper [FT Q7] [JC Q5] [PS] | Post-quantum signatures on EVM or frames. | Candidate (1) only. | Not our variant. This is the main reason we avoided PQ (section 4.2). |
| ERC-8421 rationale, MATCHA [FT Q4] | Both name mass invalidation and privacy shared senders. | Threat framing. | We show it concretely against the third-party payer design that ERC-8421 lists among its supported use cases ("privacy pool withdrawals") [FT Q5]. |

### 4.2 Why this variant over the other candidates

| Candidate | Prize fit | Originality against prior art | Devnet opcode risk | Team fit | WOW for finalists | 36 h feasibility (J) |
|---|---|---|---|---|---|---|
| (1) PQ wallet (SPHINCS- or Falcon-512) | Strong (it is the headline example) | Low: the lfglabs frame account already exists, along with EVM PORST, Lamport, Kohaku pq-account and Zkipper [FT Q7] [JC Q5] | **High**: SIGDATACOPY is unverified on chain 1337 and halts on 3151908 [FT Q3] | Low (signature cryptography) | Medium | M |
| **(2) Relayerless Tornado + (5) fan-out attack + fix** | Strong (areas 1a, 1b, 3) | Medium for (2) alone, high with the attack and the legacy retrofit | Medium: needs TXPARAM, FRAMEPARAM and FRAMEDATACOPY (verified on 3151908, from the EIP text on 1337 [W2]); **no SIGDATACOPY** | **High** (paymaster safety) | High | M |
| (3) ERC-20 paymaster + footgun scanner | Strong (named in the prize) | Low to medium: obvious and done in the EIP's own example [FT Q1] | Medium (FRAMEPARAM status) | High | Low | L/M |
| (4) viem-frames + admission linter | Strong (named) | Low to medium: hegota-support already ships the codec and `explainRejection()` [FT Q3] | Low | Medium | Low | M |
| (5) Fuzzer or economics study alone | Strong (named) | High but abstract | Medium; it needs a local stack to be polite | High | Low to medium | M |

**J:** (2)+(5) wins on originality-adjusted fit, team fit and WOW. It keeps PQ's SIGDATACOPY risk off the critical path, and the attack half still produces a finding if the build half is only partly done.

### 4.3 What is new at Mumbai (the differentiation list for the README)

1. A frame-native, staked third-party payer for the unmodified Tornado pool on the stock sidecar (V1).
2. A measured "nullifier fan-out": one note gives K admitted txs, one inclusion, and K-1 invalidations, with reputation and balance-reservation effects. The workshop says organic reputation burn "cannot be reproduced reliably on this devnet" [W4]. We produce it through a real mechanism, or we show it is not penalised; either outcome is a finding.
3. **J (verify at hour 1):** the replayed Tornado Verifier runs `staticcall(sub(gas(), 2000), ...)` [W9], so GAS is not immediately followed by a CALL. The canonical rules ban that [FT Q1], so the original verifier cannot run in any validation frame. We ship `VerifierCompat` (same verifying key, `gas()` passed straight to the call) and a lane that shows the difference.
4. V2 gateway: the nullifier becomes the nonce key at sequence 0, so the sidecar's rule "one pending transaction per (sender, key)" [W5] refuses the duplicates. A failed attempt consumes the key, so per-note griefing is bounded by the protocol.
5. Two ERC-8421 rule proposals with their trade-offs (section 10, "Proposal").

## 5. Architecture

### 5.1 Overview

```
 user laptop: no server of ours anywhere
 +-------------------------------------------------------------+
 |  NullRelay web app (static, Vite) or CLI                    |
 |   note (stays local) -> Merkle path from Deposit events     |
 |   -> Groth16 proof (local prover, 2020 Tornado key)         |
 |   -> frame tx builder (@forshtat/hegota-support/tx)         |
 |   -> sign with fresh key R (V1) or no key at all (V2)       |
 +----------------------+--------------------------------------+
                        |
     lane A: eth_sendRawTransaction        lanes B, C, D: eth_sendFrameTransaction
                        |                                |
                        v                                v
 +----------------------------------------+   gossip   +-------------------------+
 | gateway sidecar (Skandha fork, ERC-8421 |----------->| ethrex eip8141-tracer   |
 | rules: stake, reputation, budgets)      |  submit    | canonical rules, blocks |
 +----------------------------------------+            +------------+------------+
                                                                    |
 on chain, V1 withdrawal                                            v
  F0 VERIFY  R (default code, SECP256K1 sig)          approve EXECUTION
  F1 VERIFY  NullRelayPaymaster P
               staticcall VerifierCompat  (precompiles 0x06, 0x07, 0x08)
               staticcall Tornado.isKnownRoot, isSpent
               FRAMEPARAM / FRAMEDATACOPY on F2 and F3    approve PAYMENT
  F2 SENDER  Tornado.withdraw(proof, root, n, R, relayer=P, fee, 0)
               R receives 0.1 - fee, P receives fee
  F3 DEFAULT P.postWithdraw()   if n still unspent then banned[n] = true
```

### 5.2 Contracts

| Contract | Inherits or uses | Purpose | Key functions |
|---|---|---|---|
| `VerifierCompat` | Derived from Tornado `Verifier.sol` (SPDX MIT header [W9]), with the same hardcoded verifying key | A Groth16 check that is legal in a validation frame. Its three `staticcall`s take `gas()` directly, and it has no `invalid()` path. | `verifyProof(bytes, uint256[6]) view returns (bool)` |
| `TornadoWithdrawCodec` (library) | none | Decodes and checks the exact canonical ABI layout of `withdraw(bytes,bytes32,bytes32,address,address,uint256,uint256)` taken from frame data. It rejects non-canonical offsets and lengths, so the paymaster and Tornado cannot read different values. | `decode(bytes) returns (Args)` |
| `NullRelayPaymaster` (V1) | `HegotaSupport(Devnet.<profile>)` [W2] | The staked third-party payer. | `validate()` (VERIFY entry, a named selector), `postWithdraw()` (DEFAULT post_op), `receive()` (accepts the Tornado fee and never approves), `stake(uint32) payable onlyOwner` (calls `addStake` so the registry keys the stake on the paymaster [W4]), `unlockStake`, `withdrawStake`, `withdrawFloat` (owner only) |
| `NullRelayGateway` (V2, stretch S1) | `HegotaSupport` | Shared sender and payer; nullifier as nonce key. | `validate()`, `receive()`, the same stake functions |
| Deployed instances | | `P_s` (staked, the main lane), `P_u` (unstaked, lane B), `P_o` (staked but calling the original Tornado Verifier, lane D, stretch S2), `G` (V2) | |

Why no `pre_verify`: VERIFY can read everything we need, and `pre_verify` could not write Tornado's storage anyway, because it is not storage associated with the entity [FT Q1]. Why not the canonical paymaster: its code is not pinned [FT Q1], and it cannot check proofs.

Why the VERIFY entry must not be `fallback`: the workshop paymaster puts APPROVE in `fallback` [W4]. Tornado pays the relayer with a plain ETH call [W9]. A paymaster built like the workshop template would therefore revert every withdrawal and pay gas for nothing. **J:** this is a footgun worth one README line.

### 5.3 Paymaster safety checks in `validate()` (the DeFi-security core)

Every check runs again on chain at inclusion, because VERIFY executes inside the transaction [FT Q1]. If state goes stale (the root rotates out, or the note is spent), the tx simply becomes invalid and the paymaster loses nothing.

| # | Check (V1; the V2 differences follow the table) | Opcode or helper | Attack it closes |
|---|---|---|---|
| 1 | `CURRENT_FRAME_INDEX == 1`, `FRAME_COUNT == 4` | TXPARAM [W2] | Extra gas-burning frames; layout confusion |
| 2 | F0 has MODE VERIFY and RESOLVED_TARGET == TXPARAM SENDER | FRAMEPARAM | Shape spoofing |
| 3 | F2: MODE SENDER, target == TORNADO, VALUE 0, FLAGS 0, EXECUTION_GAS_LIMIT >= MIN_WITHDRAW, STATE_GAS_LIMIT >= MIN_STATE, DATA_LENGTH == 516 | FRAMEPARAM | Pay without a withdrawal (out-of-gas griefing; MacWha's threat 002 [W6]) |
| 4 | Decode F2's data with the codec: selector `withdraw`, canonical layout | FRAMEDATACOPY | ABI malleability between the paymaster's and Tornado's views |
| 5 | `relayer == address(this)`, `refund == 0` | | The fee going elsewhere; the ETH instance requires refund 0 [W9] |
| 6 | `fee == FIXED_FEE`, `fee >= MAX_COST + margin`, `fee <= denomination` | TXPARAM MAX_COST (0x06, ethrex) [W2] | Underpayment; fee fingerprinting |
| 7 | `recipient == TXPARAM SENDER` | TXPARAM | A recipient that reverts on receive: R is the default-code signer |
| 8 | `!banned[n]` in the paymaster's own storage | SLOAD own storage (staked, STORAGE-031) [FT Q1] | Repeat griefing after a failed SENDER frame |
| 9 | `!Tornado.isSpent(n)`, `Tornado.isKnownRoot(root)` | staticcall into non-entity storage (staked, STORAGE-032) | Stale proofs |
| 10 | `VerifierCompat.verifyProof(proof, [root, n, recipient, relayer, fee, refund])` | staticcall plus precompiles | An invalid proof would make Tornado revert while the paymaster still pays |
| 11 | F3: MODE DEFAULT, target == this, data == `postWithdraw()` selector, EXECUTION_GAS_LIMIT >= MIN_POST | FRAMEPARAM, FRAMEDATALOAD | Disabling the failure record |
| 12 | `postWithdraw()` requires `msg.sender == ENTRY_POINT` and `CURRENT_FRAME_INDEX == 3`, re-reads `n` from F2's data, and requires F1 to be this contract's VERIFY | TXPARAM, FRAMEPARAM, FRAMEDATACOPY | **J:** without this, anyone could put a DEFAULT frame calling `postWithdraw(n_victim)` into their own tx and ban a pending victim's nullifier |

V2 (`NullRelayGateway`) changes: it is the sender, so the approval scope is EXECUTION_AND_PAYMENT. It also requires `FRAME_COUNT == 2`, `NONCE_KEY_COUNT == 1`, `NONCE_KEY_0 == k(n)` and `NONCE == 0` (all TXPARAM ids in the chain-1337 profile [W2]). It drops checks 2, 7, 8, 11 and 12, because a failed attempt consumes the nonce key and the protocol refuses a retry (J, following [W8]: "running out after approval burns the notes"). The recipient can be any address. Residual risk: a reverting recipient wastes the gateway's gas once per note.

### 5.4 Frames layout per transaction

Modes: DEFAULT 0, VERIFY 1, SENDER 2. Flags bits 0 to 1 hold the allowed approval scope (PAYMENT 0x1, EXECUTION 0x2, both 0x3), and bit 2 is ATOMIC_BATCH [FT Q1]. Gas columns are J estimates; replace them with `eth_estimateFrameTransactionGas` output plus 20%. Deployments use legacy txs with a 6,000,000 gas limit [W4].

**T0 deposit.** A legacy tx through the gateway (canonical path): `Tornado.deposit(commitment)`, value 0.1 ETH, gas limit 3,000,000 (J).

**T1 stake.** A legacy tx from the owner: `P_s.stake{value: 0.012 ETH}(unstakeDelay)`. 0.012 ETH is above the devnet's 0.01 minStake [FT Q2] [W4].

**T3 V1 withdrawal (lanes A, B, C).** Sender R (fresh), `nonceKeys [0]`, `nonceSeq 0`; signatures `[SECP256K1, signer R, msg empty]`; fees per profile (the workshop uses `maxFeePerGas` 2 gwei; the base fee was 7 wei [W4]).

| Frame | Mode | Flags | Target | Value | Data | Exec limit (J) | State limit (J) | Role |
|---|---|---|---|---|---|---|---|---|
| F0 | VERIFY | 0x02 | sender (null) | 0 | empty | 30,000 | 0 | only_verify through default code [FT Q1] |
| F1 | VERIFY | 0x01 | P_s (P_u in lane B, P_o in lane D) | 0 | `validate()` selector | 400,000 | 0 | pay |
| F2 | SENDER | 0x00 | Tornado 0.1 ETH pool | 0 | `withdraw(proof, root, n, R, P, FIXED_FEE, 0)`, 516 bytes | 550,000 | 250,000 | execution body |
| F3 | DEFAULT | 0x00 | same paymaster as F1 | 0 | `postWithdraw()` selector | 40,000 | 30,000 | post_op |

Prefix shape: `[only_verify, pay]` [FT Q1].

**T4 fan-out (the attack).** K copies of T3 that share one note: K fresh senders R_i, each with its own proof (recipient R_i), all against `P_s`.

**T5 V2 withdrawal (stretch S1).** Sender G, `nonceKeys [k(n)]`, `nonceSeq 0`, no signatures (J: confirm the profile accepts an empty list).

| Frame | Mode | Flags | Target | Value | Data | Exec limit (J) | State limit (J) | Role |
|---|---|---|---|---|---|---|---|---|
| F0 | VERIFY | 0x03 | sender G (null) | 0 | `validate()` selector | 400,000 | 100,000 (a new nonce key; MacWha's pool measured 195,840 for two keys [W8]) | self_verify |
| F1 | SENDER | 0x00 | Tornado 0.1 ETH pool | 0 | `withdraw(proof, root, n, X, G, FIXED_FEE, 0)` | 550,000 | 250,000 | execution body |

### 5.5 Expected admission per lane

| Lane | Path | Expected | Basis |
|---|---|---|---|
| A | Canonical (raw tx through the gateway to ethrex) | Rejected: the payer reads non-sender storage (ethrex reports `StorageReadNonSender` for this case), and the prefix is above MAX_VERIFY_GAS 100,000 | [FT Q1]; the ViolatingWallet comment [W4] |
| B | Alt mempool, unstaked `P_u` | Rejected: "unstaked payer accessed … slot …" | [W4] |
| C | Alt mempool, staked `P_s` | Admitted, then included. STORAGE-032 allows the reads; the budget is 1M (ERC-8421) or 10M (sidecar config) | [FT Q1, Q2] |
| D (S2) | Alt mempool, staked `P_o` with the original verifier | J: rejected for the GAS opcode. If it is admitted, that is a rule divergence we report. | [W9] [FT Q1] |
| Fan-out | K txs against `P_s` | J: all K admitted while P's balance covers K times max cost, 1 included, K-1 dropped. Reputation: measured. | [W5] (the balance rule) |
| V2 fan-out (S1) | K txs against `G` | 1 admitted. The rest are rejected ("nonce key … is already held by pending transaction …") or need a 10% fee bump to replace. | [W5] |

The sidecar explorer logs "every admission with the rule-by-rule reason a transaction was accepted or turned away" [W5], so lanes B, C and D can sit side by side on the explorer itself. Lane A is an RPC error, shown in our UI (ask whether the explorer logs canonical rejections too).

### 5.6 Gas reference

| Item | Gas | Basis |
|---|---|---|
| BN254 pairing check | about 181k | [FT Q6] |
| Minimum single-note privacy spend | 211,828 | [FT Q6] |
| Tornado validation in MacWha's 4337 paymaster | about 240k | [W6] |
| Tornado withdraw | about 400k | [W6] |
| Our F1 (verify, roots, nullifier, introspection helpers) | 260k to 320k | J |
| Whole V1 tx | 0.8M to 1.1M execution plus state gas | J |
| Canonical cap / ERC-8421 unstaked and staked / landing page / sidecar config | 100k / 100k and 1M / 250k and 2.5M / 10M | [FT Q1, Q2, Q4] |

### 5.7 Off-chain components

| Component | Responsibility | Notes |
|---|---|---|
| `core/note` | Parse and create Tornado notes, Pedersen commitment, nullifier hash | The note never leaves the device |
| `core/tree` | Rebuild the depth-20 MiMC tree from `Deposit` events on the devnet | Check against `getLastRoot()` |
| `core/prove` | Groth16 withdraw proof with the 2020 ceremony key | Prover choice is settled before the event (7.1) |
| `core/frames` | Build T3, T4 and T5 with hegota-support, estimate, sign | Profile-parameterised |
| `core/lanes` | Submit to A, B, C, D; poll `skandha_frameTransactionStatus`; fetch `eth_getFrameTransactionReceipt` | [FT Q3] |
| `core/explain` (S2) | `ethrex_simulateFrameTransaction(raw, block, {trace:true})` for `valid`, `prefixShape`, `payer`, `violation` and `erc7562Trace`; `explainRejection()` | [FT Q3] |
| `experiments/fanout` | Run T4 and record admitted, included and dropped counts, reservation refusals, and reputation before and after | Read-only `debug_bundler_dumpReputation` and `debug_bundler_dumpMempool` only. Never `set*` or `clear*` on shared nodes [FT Q8] |
| `apps/cli` | `nullrelay deposit | withdraw | fanout | explain`, all with `--json` | This is the "code that submits one" |
| `apps/web` | A static one-screen app plus a localhost prover service (until S4) | No analytics or trackers |

### 5.8 Packages and versions (npm, checked 2026-10-27 [W10])

| Package | Pin | Use |
|---|---|---|
| Node.js | 22 LTS (hegota-support needs 20.12 or later) | Runtime |
| `@forshtat/hegota-support` | 0.0.1 (published 2026-10-25, MIT; peers solc 0.8.28 and viem ^2.57.0). Re-check for a newer version or git commit at kickoff. | Codec, signing, RPC, `HegotaSupport.sol` |
| `viem` | 2.57.11 | ABI, keys, RPC |
| solc | 0.8.28 | Contracts |
| Foundry (forge) | Stable at the event; record `forge --version` in the README | Build, plus tests of pure logic only (Forge cannot run frame opcodes [FT Q3]) |
| `tsx` 4.23.15, `typescript` 7.0.2, `vitest` 5.x | Same as the workshop [W4] | Dev tooling |
| `@kohaku-eth/tornado-cash` | 0.1.0-alpha.29 (MIT, 2026-10-24; depends on `micro-zk-proofs` 0.3.1 and `@kohaku-eth/mimc-tree` 0.0.3) | Primary candidate for note, tree and prover |
| `snarkjs` 0.7.6, `websnark` 0.0.5 | | Fallback prover paths |
| `circomlibjs` 0.1.7, `fixed-merkle-tree` 0.7.3 | | Fallback MiMC tree and Pedersen |
| `vite` 8.3.5, `react` 19.3.1 | | UI |
| Skandha sidecar (`forshtat/mempool-workshop-sidecar`, MIT) and ethrex `eip8141-tracer` (workshop pin `9aa3645d`, or the event tag), Docker, Bun | | Local stack for S3 and as a demo fallback [FT Q2] [W5] |
| Tornado 2020 ceremony artifacts (`withdraw.json`, `withdraw_proving_key.bin`, or whatever the chosen prover loads) | Record the hash | Must match the devnet Verifier's verifying key |

### 5.9 Repos reused and licences

| Repo | Licence | How we use it |
|---|---|---|
| `forshtat/hegota-support` | MIT [W1] | Dependency |
| `forshtat/mempool-workshop` | No LICENSE file found [W4] | **Reference only; copy no code.** Rewrite builders on top of hegota-support |
| `forshtat/mempool-workshop-sidecar` | MIT [W5] | Local stack |
| `tornadocash/tornado-core` | Repo GPL-3.0; `Verifier.sol` has an MIT header [W9] | Deployed bytecode (unmodified); `VerifierCompat` derives from `Verifier.sol` |
| `ethereum/kohaku` | MIT [W7] | Prover and tree packages |
| `Robert-MacWha/privacy-paymaster`, `minimal-shielded-pool` | (check) | Cited for design and threat format, no code |

Project licence: **GPL-3.0-or-later** (J: safe if any Tornado JavaScript gets vendored, and the EF Mandate says copyleft is "appreciated" [EG Q1]). If the team is sure nothing GPL is vendored, MIT is also fine.

### 5.10 Repo layout

```
nullrelay/
  contracts/src/VerifierCompat.sol
  contracts/src/TornadoWithdrawCodec.sol
  contracts/src/NullRelayPaymaster.sol
  contracts/src/NullRelayGateway.sol
  contracts/test/
  packages/core/src/
  apps/cli/
  apps/web/
  experiments/fanout/
  docs/findings/
  docs/proposal-erc8421.md
  docs/ai/
```

Testing (J): Forge for pure logic (codec, fee maths, `VerifierCompat` against the original on fixture proofs), with frame reads behind internal virtual functions so that a test harness can override them. The real integration loop is `ethrex_simulateFrameTransaction`, which costs no gas and returns the violation and the trace; then a scripted end-to-end run on the devnet.

## 6. Scope

### 6.1 MVP (must work end to end)

1. Deposit a note into the replayed Tornado 0.1 ETH pool on the target devnet (T0).
2. Generate a local proof with recipient = fresh R, relayer = `P_s`, fee = FIXED_FEE.
3. Deploy `VerifierCompat`, `P_s` (staked) and `P_u` (unstaked), and fund their floats.
4. Submit the same withdrawal to lanes A, B and C. Capture the A and B rejection reasons. C is admitted and included, with an explorer link, R's balance going from 0 to 0.1 minus fee, and `P_s`'s balance changing by fee minus gas.
5. Fan-out with K of at most 20 on the shared devnet, with organiser permission: admitted, included and dropped counts, reputation counters before and after, and any balance-reservation refusals of an honest withdrawal. Results go in the README with tx hashes.
6. A README with design, frames, safety checks, trade-offs, links, limitations and CROPS, and a CLI that reproduces everything.
7. A thin UI showing the three lane cards and the explorer link. It may call a localhost service.

### 6.2 Stretch goals, in priority order

| # | Goal | Value |
|---|---|---|
| S1 | V2 `NullRelayGateway` with a nullifier nonce key; rerun the fan-out to get 1 admitted and the rest refused | Completes the break-and-fix story |
| S2 | Lane D (original verifier, GAS rule) plus an explain panel per lane from `ethrex_simulateFrameTransaction` | A finding plus a tooling slice |
| S3 | Scale the fan-out on a local stack until THROTTLED or BANNED appears organically; compare with the formula | Hard numbers for the rule proposal |
| S4 | A naive paymaster (no frame binding) and a drain demo | A security teaching lane |
| S5 | In-browser proving (Kohaku or micro-zk-proofs), removing the localhost service | UX and CROPS |
| S6 | Post the rule proposal on the ERC-8421 Magicians thread | Ecosystem value |

### 6.3 Explicit non-goals

Mainnet or Sepolia deployment. Any change to Tornado. ERC-20 Tornado pools, Railgun, Privacy Pools or ASP compliance. PQ signatures. A general-purpose SDK. FOCIL integration. A custom mempool topic. Running a public devnet. Mobile.

### 6.4 Mocked or simplified parts (disclose in the README)

- The anonymity set on the devnet is only our own deposits. The demo proves a mechanism, not privacy in practice.
- Notes are deposited by us during the event, minutes before each demo.
- The fee is a fixed FIXED_FEE with a generous margin. There is no price oracle.
- The paymaster float and stake come from the faucet. The devnet minStake is 0.01 ETH and the sidecar's unstake delay is 0, against ERC-8421's roughly $1000 and 86,400 s [FT Q1, Q2].
- The sidecar runs the PR #6 rules, which are "not equivalent" to ERC-8421 [W4]. Thresholds that do not appear organically are extrapolated from ERC-8421 constants and the sidecar's 10/10/50 reputation config [FT Q2].
- Unless S5 lands, proving runs in a localhost service.
- `VerifierCompat` is our patch of Tornado's verifier (same verifying key) and gates only payment. Tornado's own verifier still guards the funds in F2.
- Single denomination (0.1 ETH). Gas limits are pinned from measurements on one devnet.
- Submissions go over plain HTTPS to one gateway, which sees the user's IP.
- The rule proposals are text; they are not implemented in the sidecar.

## 7. Pre-event de-risking (no project code)

### 7.1 Before Thu 5 Nov

| By | Who | Task | Pass condition |
|---|---|---|---|
| Thu 30 Oct 23:59 | All | Apply on ETHGlobal (the application deadline) [JC Q1]. Register the team of 3. | Accepted |
| Fri 31 Oct | All | Read: the EIP-8141 sections on the mempool, APPROVE, FRAMEPARAM and security considerations; ERC-8421 STORAGE, BUDGET, REPUTATION, blame and LIFECYCLE [FT Q1]; the sidecar README's keyed-nonce rules [W5]; MacWha's `security.md` and `threats/` [W6]; the minimal-shielded-pool README [W8]; the Himitsu page [W3]; Tornado's `Tornado.sol`, `ETHTornado.sol` and `Verifier.sol` [W9] | Each person can explain the 12 checks in 5.3 |
| Sat 1 Nov | C | Clone the public workshop. Run `yarn step_1_check` through `step_13` with `--json` against chain 1337 and save the outputs **outside any project repo**. Capture step 3 (a 0-ETH sender with a paymaster), step 6 (the exact ethrex error text), steps 7 and 8 (stake, then admission), step 11 (the debug output schema), and step 12 (keyed nonces) [W4] | All steps exit 0; error strings recorded |
| Sun 2 Nov | B | Use public Tornado tooling only: deposit into `0xF8d72424D07721aB219cdbd2852657F3301673fC` on chain 1337 [FT Q2], then withdraw with a normal self-funded tx, using Kohaku's tornado plugin or tornado-cli **configured, not modified**. Record proving time, the artifact source and hash, verifyProof gas (`eth_estimateGas` on the Verifier at `0xECD2eE825ebCA4D6BEbD269FCA033229addf9f01`), withdraw gas, and whether the tree rebuild from devnet events works. If a tool needs code changes, stop; that becomes a day-one task. | A valid proof is accepted by the devnet Verifier |
| Sun 2 Nov | A | Without writing code: run `cast code` on the devnet Verifier, `cast disassemble` it, and confirm the sequence GAS, PUSH2 0x07d0, SUB before STATICCALL. Compare its bytecode with mainnet Tornado's verifier. Read the hegota-support Yul headers for each opcode's status [W2]. | Item 3 of section 4.3 confirmed or refuted |
| Mon 3 Nov | B | Try the local stack: the sidecar's `test/e2e/ethrex-devnet.sh`, Docker build and Bun build [W5]. Time the boot. Write no deployment scripts for Tornado. | Local sidecar admits a workshop tx, or a note on why not |
| Mon 3 Nov | A | Ask async in the ETHGlobal partner channel or on the Magicians ERC-8421 thread: the devnet1-3 profile and chain IDs, opcode status, whether the 2026-10-24 probe contracts are public [W2], and permission for a K of at most 20 fan-out against our own paymaster | Answers logged |
| Tue 4 Nov | All | Laptops: Node 22, yarn 1, pnpm, Foundry, Docker, Bun, OBS at 1080p, a USB mic. A GitHub org and an empty repo name reserved (create nothing). Devnet keys in a password manager, never in a repo. | Checklist ticked |
| Thu 5 Nov morning | C | Re-read the prize page (the CROPS text is "(tbc: final review pending)" [JC Q2]; watch for alt-mempool text changes) and probe the devnet1-3 and gateway URLs | Changes noted |

SIGDATACOPY: this variant never reads signature bytes, so no probe is needed. **J:** if the team wants to keep a PQ pivot open, ask Alex rather than writing a probe.

### 7.2 Thu 5 Nov 17:00 to 21:00 with Pierre and Alex (the EF workshop is at 17:00 [JC Q1])

1. Which devnet should prize submissions use (devnet1, 2 or 3, or chain 1337)? Its chain ID, explorer URL, faucet and reset plans, and which hegota-support profile or git commit matches it.
2. Are the Tornado 0.1 ETH pool, Hasher and Verifier replayed there, and at which addresses? (Addresses can change on a reset [FT Q2].)
3. Opcode status on that devnet: TXPARAM `FRAME_COUNT`, `CURRENT_FRAME_INDEX`, `SENDER`, `MAX_COST` (0x06), `NONCE`, `NONCE_KEY_COUNT` and `NONCE_KEY_0`; FRAMEPARAM `RESOLVED_TARGET`, `MODE`, `FLAGS`, `VALUE`, `EXECUTION_GAS_LIMIT`, `STATE_GAS_LIMIT` and `DATA_LENGTH`; and FRAMEDATACOPY across frames [W2].
4. The effective per-entity budgets, unstaked and staked: 100k and 1M, 250k and 2.5M, or the 10M validationGasLimit [FT Q2, Q4]? Also minStake and unstake delay.
5. Does the sidecar ban GAS not followed by a CALL for staked entities? (This is the basis of `VerifierCompat`.)
6. "Third-party payers and factories are capped as before" [W5]: what is the cap for a staked payer?
7. When a pending tx is dropped because another inclusion invalidated it, does the sidecar count it as seen without included? The workshop's step 9 says organic burn "cannot be reproduced reliably" [W4]. May we run K of at most 20 against our own staked paymaster, and when? Or would they prefer a local stack?
8. Is the read-only `debug_bundler_dumpReputation` available on the hackathon gateways?
9. EIP-8250 key width: can `k(n)` be the nullifier hash itself, or must it be hashed or truncated? Does the approving frame pay the state gas for a new key?
10. Is EXTCODESIZE on `tx.sender` allowed inside a payer's VERIFY frame? (This would harden V1 against 7702-delegated senders.)
11. Does the explorer log canonical-path rejections, or only the sidecar's admissions?
12. Faucet limits: we need about 1.5 ETH (about 10 notes plus floats and stakes).

### 7.3 Go/no-go gates in the first hours

| Gate | Time (IST) | Pass | If it fails |
|---|---|---|---|
| G1 | Thu 23:00 | An opcode probe (our first contract at the event) returns correct values through `ethrex_simulateFrameTransaction` | Fallback ladder step L2 or L3 (section 11) |
| G2 | Fri 01:00 | Our proof is accepted by the devnet Verifier through `eth_call` | Prover ladder (risk R4) |
| G3 | Fri 12:00 | The first admitted V1 withdrawal | Drop binding checks one at a time until it is admitted, by 14:00; disclose each one dropped |
| G4 | Fri 19:00 | The V2 gateway is admitted and a duplicate is refused | Ship V2 as a written proposal only |

### 7.4 Classic-track hygiene

No repo, contracts, scripts, UI mock-ups or README text before 21:00 Thursday [JC Q1]. Reading, configuring and running public tools is fine. This plan stays in the private ideas repo. **J:** at the event, adding a copy under `docs/ai/planning/` with the note "written before the event, contains no code" is transparent and satisfies the spec-driven disclosure rule [JC Q1].

## 8. 36-hour timeline by role (IST)

Roles: **A** is the contracts and security lead (Solidity). **B** is the ZK and attack lead (TypeScript). **C** is the frames, UI and story lead (TypeScript and frontend, plus the video). **J:** this matches a team of three Solidity and security people who are comfortable with TypeScript; C should be the strongest frontend person.

| Time (IST) | A: contracts and security | B: ZK and attack | C: frames, UI, story |
|---|---|---|---|
| Thu 17:00-21:00 (pre-hack) | EF workshop; ask the 7.2 questions | Faucet; confirm the Tornado addresses | Re-run workshop steps 1, 3 and 6 to 8 on the hackathon devnet |
| Thu 21:00-22:00 | Repo init (LICENSE, README stub, foundry, pnpm workspace), first commit | Prover project skeleton; fetch the ceremony artifacts | hegota-support profile wiring; the gateway client |
| Thu 22:00-01:30 | Opcode probe contract and simulate check (**G1 at 23:00**); `VerifierCompat` plus the codec; Forge parity test against the original verifier | Deposit T0; tree rebuild; first proof; `eth_call` on the Verifier (**G2 at 01:00**) | T3 builder and signing; lane A, B and C submission and status polling, tested with a throwaway sponsor contract |
| Fri 01:00 | **IP0**: probe results, a valid proof, the lane harness | | |
| Fri 01:30-07:00 | Sleep 02:00-07:00 | Start the local stack build, then sleep 02:00-07:00 | Sleep 01:30-06:30, then pull and test at 06:30 |
| Fri 07:00-12:00 | `NullRelayPaymaster` checks 1 to 12; deploy `P_s` and `P_u`; stake `P_s` (T1); fund the floats | Withdraw-args encoder (relayer = P, FIXED_FEE); `nullrelay withdraw` CLI | End-to-end integration; receipts, explorer links, balances; check-in with Alex at 10:00 |
| Fri 12:00 | **IP1 / G3**: first admitted V1 withdrawal on the explorer | | |
| Fri 12:00-13:00 | Lunch | Lunch | Record an insurance capture of the CLI flow; tag v0.1 |
| Fri 13:00-19:00 | `NullRelayGateway` (S1); deploy and stake G; Forge tests for decode and fee maths | Fan-out harness (K=5 dry run, then K=20 with permission); reputation and mempool dumps; results JSON; check-in with Pierre at 15:00 | Web UI: note input, new address, three lane cards, frames diagram, explorer links |
| Fri 19:00 | **IP2 / G4**: fan-out results; V2 duplicate test; UI shows the V1 flow live | | |
| Fri 19:00-00:00 | Self-audit against 5.3; residual-risk table; measured gas table; lane D `P_o` (S2) | Findings write-up and ERC-8421 proposal; S3 on the local stack if it is up | UI polish; explain panel (S2); insurance capture #2 at 21:00; **full dry run at 22:30** (all three, 20 min) |
| Sat 00:00 | **FEATURE FREEZE**: only bug fixes, docs and links after this | | |
| Sat 00:00-01:30 | README: design, checks, trade-offs | README: attack, proposal, numbers | Until 01:00: README quick start, CROPS, AI usage; run the instructions from a clean clone |
| Sat 01:30-05:00 | Sleep 01:30-05:00 | Sleep 01:30-05:00 | Sleep 01:00-04:30 |
| Sat 04:30-06:45 | Drive the demo for recording (05:00-06:30) | Re-run everything on the live devnet; refresh the admitted-tx links; push | Set up OBS (04:30); narrate the recording (05:00-06:30); edit to 2:35-2:50; upload |
| Sat 06:45-08:15 | Final security pass on the README claims | Verify every link and hash | Fill the submission form: description, repo, video, EF alt mempool prize, finalist opt-in, AI attribution |
| Sat 08:15-09:00 | **Buffer** (submissions close at 09:00 [JC Q1]) | | |
| Sat 09:00-09:30 | Rehearse Q&A (section 12) | Check the devnet is live; preload proofs | Open tabs; ready the fallback video at the right timestamps |

Sleep totals: A and B get 8.5 h each, C gets 8.5 h. Commits: everyone commits at least hourly while awake.

## 9. Demo scripts

### 9.1 Live finalist demo (4:00, then 3:00 Q&A [JC Q1])

| Time | Speaker | Beat | On screen |
|---|---|---|---|
| 0:00-0:20 | C | "To get money out of a privacy pool into a fresh address, that address needs gas. So you either fund it and link yourself, or you trust a relayer. We made the relayer a contract." | Title slide (3 bullets at most) |
| 0:20-0:45 | C | "This is the real Tornado Cash contract, unmodified, replayed on the alt-mempool devnet. We deposited this note an hour ago. Here is a brand-new address: zero ETH." | Explorer: deposit tx; R's balance 0; the frames diagram |
| 0:45-1:45 | C | Click Withdraw. "The proof is made on this laptop. We send the same withdrawal down three paths." Lane A goes red: the canonical mempool rejects it (non-sender storage, over 100k). Lane B goes red: the alt mempool rejects it from an unstaked paymaster. Lane C goes green: admitted, then on chain. **The moment it matters:** refresh the explorer. R now holds 0.098 ETH, the payer is the paymaster contract, frame 2 is `Tornado.withdraw`, and the paymaster was repaid. "No relayer, no server, and that address never held gas." | Three lane cards; explorer tx page |
| 1:45-2:45 | B | "Now we attack our own paymaster." Run the fan-out with K=20 from one note: 20 admitted, one block later 1 included and 19 dropped. Show the reputation counters before and after, and an honest withdrawal refused while the duplicates hold the paymaster's balance (if observed). **The moment it matters:** "one state change invalidated 19 admitted transactions, and the rules blame the honest paymaster. About 120 duplicates throttle a fresh paymaster and about 520 ban it, which censors every user's withdrawals, for the price of one note we get back." | Fan-out counter; reputation dump; formula slide |
| 2:45-3:35 | A | "The fix: the nullifier becomes the nonce key on a shared gateway." Same fan-out against G: 1 admitted, 19 refused with "nonce key already held". The withdrawal lands at an address that does not even need a key. "The mempool's own identity rule now does the dedup, and a failed attempt burns the key, so griefing is bounded per note." | Lane cards; explorer |
| 3:35-4:00 | A | Reused (Tornado bytecode, hegota-support, the 2020 proving key) against new (all four contracts, binding, attack, gateway, proposal). "Every number here has a tx link in the README." | Closing slide with the repo QR code |

If V2 is not done, replace 2:45-3:35 with the proposal slide plus MacWha's minimal-shielded-pool nonce-key pattern as evidence the fix works. If the devnet is slow, cut to the recording at the same beat; C keeps it cued.

### 9.2 Submission video (target 2:35 to 2:50; must be 2:00 to 2:59)

| Time | Beat |
|---|---|
| 0:00-0:15 | Problem slide: fresh address, no gas, relayer or linkage (intro of 20 s at most [JC Q1]) |
| 0:15-0:35 | Design slide: the 4-frame diagram; "the relayer is a contract, repaid by the withdrawal" |
| 0:35-1:20 | Screen capture: three lanes; **the moment it matters** is the canonical rejection next to the alt-mempool admission, then the explorer showing 0 to 0.098 ETH with the payer being the paymaster |
| 1:20-1:55 | Fan-out: 20 admitted, 1 included, 19 dropped; reputation numbers; the censorship consequence |
| 1:55-2:25 | Fix: the V2 duplicates refused; one-line rule proposal |
| 2:25-2:45 | Trade-offs and limits slide (4 bullets): double verification, devnet anonymity set, stake and float custody, IP visible to the gateway |
| 2:45-2:55 | Links: repo, admitted tx, "AI use documented in the README" |

Rules: a human voice (no AI voiceover), at least 720p, not sped up, no music-only text, recorded on a laptop rather than a phone [JC Q1].

## 10. README skeleton

```
NullRelay
  One-sentence promise
  Demo video link
  Admitted transactions
    table: lane | devnet and chain id | tx hash | explorer link | block | result
  Quick start
    pnpm install
    pnpm nullrelay deposit
    pnpm nullrelay withdraw --lanes A,B,C
    pnpm nullrelay fanout --k 20
  New at Mumbai vs reused
    table: component | new or reused | source and licence
  Design
    Problem: fresh-address gas, relayers, linkage
    V1: staked third-party payer
    V2: nullifier-keyed gateway
  Frames diagram (V1 and V2)
  Why only the alt mempool
    table: lane | rule | exact rejection or admission text
  Paymaster safety checks (the 12-row table from 5.3) and residual risks
  Finding 1: nullifier fan-out (method, K, counts, reputation, reservation, ethics)
  Finding 2: deployed Tornado verifier against the GAS rule
  Proposal for ERC-8421
  Trade-offs
  Gas table (measured)
  Limitations and mocked parts
  CROPS
  AI usage
  Licence and acknowledgements
```

Content notes for the sections that need care:

- **Trade-offs:**
  1. Double proof verification, about 240k extra gas [W6], is the price of not modifying Tornado.
  2. V1 allows tail calls and a user-signed binding, but is open to fan-out. V2 dedupes in the mempool and needs no user key, but pins the layout (no tail calls) and adds keyed-nonce state on top of Tornado's nullifier slot. That ties into the VOPS state-growth debate [FT Q4].
  3. Stake is locked capital and is never slashed [FT Q1].
  4. The owner can withdraw the float and unstake. That stops the service but cannot touch user funds, and anyone can redeploy the same code.
  5. Alt-mempool-only txs may not be FOCIL-eligible while EIP-8369 is unsettled [FT Q4].
  6. Tornado's root history is 30 entries [W9], so 30 deposits invalidate all pending withdrawals that use older roots. The attacker pays about 30M gas for that (J).
- **Proposal for ERC-8421 (J):**
  - **A (rationale or security text):** "A payer whose approval depends on a one-time-use slot in non-entity storage (a nullifier) SHOULD be the transaction sender and SHOULD bind that slot to an EIP-8250 nonce key at sequence 0, so that duplicates are replacements."
  - **B (rule):** "When a pending tx is dropped because an included tx with the same payer changed a non-entity slot that both validations read, nodes SHOULD count it as a replacement, not toward the payer's `seen`." Trade-off: B protects honest payers but not node work, so pair it with A.
  - **C (idea only):** cap pending txs per staked payer per non-entity slot that was read as zero. This targets nullifier-style flags, not shared roots. It needs extra trace bookkeeping.
- **CROPS (one or two lines per letter, answering the prompts from [JC Q2]):**
  - C: we run no relayer or server. The paymaster is a contract; if its owner unstakes it, anyone can redeploy it or withdraw directly. Any sidecar node can carry the tx. This is the "zero option" [EG Q1], W-4 and P-2 [EG Q3].
  - O: GPL-3.0; it builds and runs from the repo alone, with public devnet configs.
  - P: the gateway sees the IP and the tx. Chain observers see a proof that hides the deposit link. The fixed fee avoids fingerprinting. The devnet anonymity set is tiny.
  - S: the note and the fresh key stay on the device. The contracts are unaudited. Trust assumptions: Tornado's 2020 setup, `VerifierCompat` parity, the sidecar's rules.

## 11. Risks and fallbacks

| # | Risk | Likelihood (J) | Early signal | Fallback |
|---|---|---|---|---|
| R1 | **Hackathon devnet profile mismatch.** devnet1-3 may run a newer layout than chain 1337 (for example the `max_fee` budget or a changed TXPARAM) [FT Q1, Q2] | High | `decodeTx` count mismatch; errors from the sidecar | Use the always-on chain 1337, which the prize accepts as "the devnet explorer, or code that submits one" [JC Q2]. Add a profile with hegota-support's `yarn new-profile` [W2]. Everything takes the profile as a parameter. |
| R2 | **Frame-introspection opcodes** (TXPARAM, FRAMEPARAM, FRAMEDATACOPY) are only "from the EIP text" on chain 1337 [W2] | Medium | G1 probe values wrong, or the opcode halts | L2: move to a devnet where they work. L3: a paymaster without SENDER-frame binding (proof, relayer and fee only, plus a small float), with the drain risk disclosed as a known gap, so that MacWha's threat 002 [W6] applies. L4: the CLI as "code that submits one". |
| R3 | **Gas model.** Two-dimensional limits, Amsterdam+ state gas (183,600 for a new account) and 6M deploys [FT Q2] | High | Out-of-gas in F2 or F3; state-gas errors | Use `eth_estimateFrameTransactionGas` per frame plus 20%; generous state limits; pin MIN_WITHDRAW from measurements; compute the fee from TXPARAM MAX_COST or MAX_FEE |
| R4 | **Tornado proving toolchain** (2020 key, Pedersen and MiMC compatibility, tree from devnet events) | Medium | G2 fails | Kohaku plugin, then tornado-cli with websnark, then snarkjs with a converted key. Last resort: deploy a fresh Tornado instance from a new dev setup with a matching verifier, and disclose that it is "not the original key" |
| R5 | **Verifier gas or GAS rule.** The original verifier is rejected, or `VerifierCompat` is over budget | Medium (rule) / Low (budget) | Lane D result; F1 `gasUsed` | `VerifierCompat` already planned. The F1 budget sits well inside the staked 1M; if a devnet has a lower staked cap, trim helper calls and raise the limit as far as the cap allows |
| R6 | **Opcodes or reads banned for the payer** (for example the helper call pattern, EXTCODE*, or reading Tornado through a call) | Low | Lane C rejection text | Read Tornado's slots through calls exactly as the ViolatingWallet does (a staticcall into a foreign contract is admitted once staked [W4]); `explain` shows the rule |
| R7 | **Fan-out not permitted, or reputation does not move** | Medium | Organisers say no; counters unchanged | Run it on the local stack. "Mass invalidation is not penalised on the reference node" is itself a finding. Never use `debug_bundler_set*` on shared nodes [FT Q8] |
| R8 | **Third-party payer cap** limits K [W5] | Medium | Rejections after N | Run several smaller batches; report the cap as a mitigating factor and adjust the formula |
| R9 | **V2 nonce-key read** (`NONCE_KEY_0`) unavailable, or the key width forces hashing | Medium | Gateway check fails | Ship V2 as a proposal, with evidence from minimal-shielded-pool [W8] |
| R10 | **Devnet reset or outage** during the event or judging | Medium | Explorer 404s on our links | Idempotent deploy scripts (under 10 min); raw signed txs saved; insurance captures; local stack |
| R11 | **Faucet shortfall** | Low | Balance under 1 ETH | Ask Alex; reuse notes by withdrawing them; keep the floats small |
| R12 | **Time overrun** | Medium | IP1 slips past 14:00 | Cut in this order: S5, S4, S3, S2, S1, UI polish. **Never cut** the admitted tx, the fan-out measurement or the README trade-offs |

## 12. Likely judge Q&A (Pierre and Alex)

1. **Why does this need the alt mempool rather than a higher canonical cap, such as the 250k proposal [FT Q4]?** For three independent reasons: the payer reads a non-sender contract's storage, which canonical rules forbid for any payer [FT Q1]; the prefix is over 100k; and V2 needs many pending txs from one sender. Even at a 250k cap, the storage rule still rejects it. Only staked entities may read non-entity storage (STORAGE-032).
2. **What stops someone getting your paymaster to pay for a tx that does not withdraw?** Checks 1 to 12: the exact layout, F2 bound byte for byte, gas floors, and a fee of at least the max cost. Any remaining failure mode is capped at one per note by the `banned[n]` record. The record cannot itself be griefed, because `postWithdraw()` re-derives `n` from F2 and requires F1 to be our own VERIFY.
3. **What if the note is spent between admission and inclusion?** VERIFY runs again on chain, so the tx becomes invalid and is never included, and we pay nothing. The cost moves to the mempool, as reputation, and that is exactly our fan-out finding.
4. **Isn't the fan-out intended behaviour? A staked entity is accountable for its dependencies.** Yes. ERC-8421 makes the payer accountable [FT Q1]. We show that this accountability becomes a censorship lever against an honest privacy payer, at close to zero cost to the attacker, which breaks the N*X condition ERC-8421 itself states [FT Q4]. The fix is V2 plus proposals A and B.
5. **Why not just use minimal-shielded-pool, or modify Tornado?** Existing pools hold the anonymity sets and cannot be redeployed. A retrofit needs no migration. The cost is the second proof verification, about 240k gas.
6. **Why your own verifier instead of the deployed one?** The deployed one passes `sub(gas(), 2000)` to its staticcalls [W9], and GAS is banned unless a CALL immediately follows it [FT Q1]. Ours has the same verifying key and passes parity tests against the original, and it gates only payment. Tornado's original verifier still guards the funds in F2.
7. **How does V2 stop duplicates, and what does replacement churn cost?** The sidecar allows one pending tx per (sender, key) and requires a 10% fee bump to replace [W5]. The fee is a public input of the proof, so each bump needs a new proof, and the final fee is paid to the gateway out of the attacker's note (J).
8. **What leaks?** The gateway sees the IP and the tx. The fee is fixed, so it does not fingerprint. The payer is a shared public contract. The proof binds the recipient. The devnet anonymity set is ours alone. Tor submission is out of scope.
9. **What about keyed-nonce state growth and FOCIL?** V2 adds one key per withdrawal on top of Tornado's nullifier slot, which is double state [FT Q4]. FOCIL eligibility for alt-mempool-only txs depends on EIP-8369, which is not settled [FT Q4] [W8].
10. **How did you get the thresholds, and do they match the sidecar?** From ERC-8421's constants: `max_seen = seen // 10`; THROTTLED above included + 10; BANNED above included + 50 [FT Q1]. With included = 1, that gives about 120 and 520 (J arithmetic, before hourly decay). The sidecar reports 10/10/50 [FT Q2]; the measured values are in the README.

ETHGlobal's standard prompts [JC Q1], "What inspired your project? What tools did you use, and why? What challenges did you solve, and how?", are answered by beats 1, 2 and 3 of the demo. C keeps a 20-second answer ready for each.

## 13. AI usage and attribution plan

Rules [JC Q1]: AI use is allowed with "Attribution" by file or part; "Involvement" (AI "should be used to assist", not to create the entire project); spec-driven workflows must include "all spec files, prompts, and planning artifacts"; no AI voiceover.

| Item | Plan |
|---|---|
| Pre-event | Disclose in the README that the research notes and this plan were produced with an AI assistant (Claude) before the event, and that they contain no code. Add a copy under `docs/ai/planning/` at the event. |
| During the event | Record each AI tool used (for example Claude Code or Copilot) and what it was used for. |
| Human-owned code | Paymaster and gateway checks, `TornadoWithdrawCodec`, the `VerifierCompat` diff and the fan-out methodology are written by A or B and reviewed line by line by another team member. Note this in the README. |
| AI-assisted code | UI components, CLI plumbing, test scaffolding and first drafts of docs. List each file in a README table: file, tool, what the AI did, who reviewed it. |
| Prompts and specs | Store them in `docs/ai/prompts/`, committed as they are used, not dumped at the end. |
| Video | The team's own voices only. |
| Submission form | Paste the README's "AI usage" summary into the AI field. |

## Sources checked on 2026-10-27

| Tag | Source |
|---|---|
| [W1] | npm `@forshtat/hegota-support` 0.0.1 metadata (MIT, peers solc 0.8.28 and viem ^2.57.0): https://registry.npmjs.org/@forshtat/hegota-support |
| [W2] | hegota-support README and package files (`Params.sol` TxParam ids including MAX_COST, NONCE_KEY_COUNT and NONCE_KEY_0; Yul headers marked "From the EIP text, not yet exercised on the devnet"; opcodes verified on 3151908 by probes on 2026-10-24): https://github.com/forshtat/hegota-support |
| [W3] | Himitsu showcase page (own privacy pool as sender, separate prefunded paymaster, Uniswap V2, patched ethrex mempool validation): https://ethglobal.com/showcase/himitsu-y62cx |
| [W4] | mempool-workshop README, `workshop.config.json5` and `contracts/src` (the step 9 "cheats" caution; ViolatingWallet rejection strings; SponsorPaymaster `fallback` APPROVE; registry "keyed on msg.sender"; base fee 7 wei; deploy gas 6M; no LICENSE file at the repo root): https://github.com/forshtat/mempool-workshop |
| [W5] | mempool-workshop-sidecar README (one pending tx per (sender, key); 10% replacement bump; balance rule for payers; third-party payers "capped as before"; explorer admission log; local devnet script; MIT): https://github.com/forshtat/mempool-workshop-sidecar |
| [W6] | Robert MacWha `privacy-paymaster` README and docs (`architecture.md`, `cost.md`, `security.md`, `threats/`): https://github.com/Robert-MacWha/privacy-paymaster |
| [W7] | npm `@kohaku-eth/tornado-cash` 0.1.0-alpha.29 (MIT; depends on `@privacy-paymasters/sdk` 0.0.5, `micro-zk-proofs` 0.3.1 and `@kohaku-eth/mimc-tree` 0.0.3): https://registry.npmjs.org/@kohaku-eth/tornado-cash |
| [W8] | Robert MacWha `minimal-shielded-pool` README (pool as sender and payer; nullifiers as nonce keys at sequence 0; frame gas table; "running out after approval burns the notes"): https://github.com/Robert-MacWha/minimal-shielded-pool |
| [W9] | tornado-core `Verifier.sol` (`staticcall(sub(gas(), 2000), ...)` and `invalid()`; SPDX MIT), `Tornado.sol`, `ETHTornado.sol`, `MerkleTreeWithHistory.sol` (ROOT_HISTORY_SIZE 30); repo LICENSE GPL-3.0: https://github.com/tornadocash/tornado-core |
| [W10] | npm versions: viem 2.57.11, snarkjs 0.7.6, websnark 0.0.5, circomlibjs 0.1.7, fixed-merkle-tree 0.7.3, vite 8.3.5, react 19.3.1, typescript 7.0.2, tsx 4.23.15: https://registry.npmjs.org/ |
| [W11] | ETHGlobal Tokyo 2026 showcase search for Himitsu: https://ethglobal.com/showcase?events=tokyo2026&search=himitsu |
| [W12] | Web search on Himitsu and EIP-8141 privacy (secondary context only) |
