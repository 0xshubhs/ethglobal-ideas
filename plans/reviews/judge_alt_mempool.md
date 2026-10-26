# Judge review: Plan D "NullRelay" for "Best use of the Frame Transaction Alternative Mempool"

Written in the voice of Pierre and Alex, ERC-8421 alt mempool team, judging at ETHGlobal Mumbai (5 to 7 Nov 2026). Review date 2026-10-27. Plan reviewed: `plans/D_alt_mempool.md` (not edited).

## 0. Verdict in five lines

1. The design is the right one for our ruleset: read-only validation, a staked third-party payer, a SENDER frame bound byte for byte, a post_op that cannot be griefed. It is the compliant analogue of MacWha's 4337 paymaster, and it touches more ERC-8421 rules than almost anything else a team could build in 36 hours.
2. As written it would not be admitted. The sidecar source that runs chain 1337 applies the canonical `MAX_VERIFY_GAS = 100,000` to every frame transaction, staked or not, before it looks up stake. There is no BUDGET-010 code path. Lanes B and C would fail with the same "structure" error, and the plan's fallback ("use the always-on chain 1337") is the configuration that fails.
3. The Tornado facts are off in ways that cost hours: the replayed pool is the Dec 2019 v2.0 deployment with the pre-ceremony key (not the "2020 ceremony key"), its root history is 100 (not 30), and the devnet's own notes say websnark's WASM prover produces wrong proofs for this key.
4. The "break and fix" half is weaker than the plan thinks: the fan-out is ERC-8421's own defined mass invalidation and REPUTATION-310 blames the payer by design; the fix (nullifier as nonce key on a shared sender) is EIP-8250's leading example and ERC-8421's rationale. At K of at most 20 no reputation state changes.
5. Score 6.2 of 10 as written; about 7.5 with the must-fixes. Forecast: 2nd place if the event devnet has per-entity budgets and a live withdrawal lands; 1st only with an upstreamable sidecar change (BUDGET-010 or a per-slot fan-out cap) plus that live link; none if no withdrawal is ever admitted.

## 1. What we checked (primary sources, read 2026-10-27)

| Source | Revision | Used for |
|---|---|---|
| ERC-8421 draft, `ethereum/ERCs` PR #2028, `ERCS/erc-8421.md` | `493ba8ac` | BUDGET, OPCODES, STORAGE, SOLVENCY, REPUTATION, LIFECYCLE, PROPAGATION, LOCAL rule text |
| `forshtat/mempool-workshop-sidecar` master | `2e22ff0a` (2026-10-25) | What chain 1337 actually enforces: `validationPrefix.ts`, `validators/frameTx.ts`, `MempoolService/{service,reputation}.ts`, `ReputationEntry.ts`, `BundlingService/reconciliation.ts`, `deployments/devnet.md`, `deploy/devnet/devnet-readme.md` |
| `forshtat/ethrex` branch `eip8141-tracer` | branch head | `crates/vm/levm/src/erc7562_tracer.rs` (GAS lookback rule) |
| `forshtat/mempool-workshop` master | `d2f342a1` | Step 3, 6, 8 builders and gas limits; `SponsorPaymaster.sol`, `ViolatingWallet.sol`; the step 9 caution |
| `forshtat/hegota-support` main | `2377188a` | Helper mechanism (CREATEd Yul helpers, staticcall and delegatecall), opcode verification status, `Params.sol` ids |
| `forshtat/mempool-workshop-documentation` | `28aef286` | `project/differences.md`, `rules/budget.md`, `guides/use-cases.md` |
| EIP-8141 on master, and at the devnet pin `4a9ad32c` | master and `4a9ad32c` | Banned opcodes (GAS rule), APPROVE state gas, canonical caps |
| EIP-8250 at the devnet pin `81b976ac` | `81b976ac` | Key width, `KEYED_NONCE_FIRST_USE_GAS`, TXPARAM ids, motivation |
| `tornadocash/tornado-core` tag `v2.0` and master | `7033f344`, master | `MerkleTreeWithHistory.sol` (ROOT_HISTORY_SIZE), `ETHTornado.sol`, `Verifier.sol` |
| `Robert-MacWha/privacy-paymaster` | `5648ec01` | 4337 design, threat 002, `security.md`, `cost.md`, SDK bundler harness |
| `Robert-MacWha/minimal-shielded-pool` | `bb45b3b9` | Shared sender, nullifiers as keys, gas table |
| ethresear.ch t/24666 "Frame Transactions and the Three Gates to Privacy" (Nero_eth, 2026-04-16) | | Prior art the plan does not cite |
| Himitsu showcase (ETHGlobal Tokyo 2026) | | Prior art |

No transaction or RPC call was sent to any devnet.

## 2. Rule-by-rule correctness review

### 2.1 The gating issue: there is no staked budget on the chain 1337 sidecar

What the code does, in order (`validators/frameTx.ts`, `validate()`):

1. `recognizeValidationPrefix` (shape check).
2. `validateStructuralRules(tx, prefix)` at line 310, which sums `limits.execution` over every prefix frame plus the per-signature cost (SECP256K1 2,800) and rejects if the total exceeds `MAX_VERIFY_GAS = BigInt(100_000)` (`utils/validationPrefix.ts` lines 10 and 282 to 292), with the reason string `validation prefix execution gas sum ... exceeds MAX_VERIFY_GAS 100000`. It also caps prefix state gas at 500,000.
3. Signatures, simulation, then per-entity stake lookups and the opcode and storage rules.

Stake is never consulted before step 2. `validationGasLimit` (10M, the value the gateway reports in `skandha_config`) is read nowhere in the validation path: it appears only in `config.ts`, `interfaces.ts` and the `skandha_config` report (`modules/skandha.ts` line 115). The explorer's rule list has a `structure` rule and no budget rule. The workshop's own test asserts `verifyGas <= 100_000n // EIP-8141 MAX_VERIFY_GAS` for its paymaster shape, and every workshop transaction stays under 100k.

The docs disagree with the code: `devnet-readme.md` step 4 says the admission report shows `MAX_VERIFY_GAS_STAKED_ENTITY` as the effective cap, and `differences.md` says "a separate staked budget". We found no such code. Either the deployed gateway runs something other than master, or the docs describe intent.

Consequence for NullRelay V1 (F0 30,000 + F1 400,000 + signature 2,800 = 432,800) and V2 (F0 400,000): rejected at `structure` on chain 1337 for `P_u`, `P_s`, `P_o` and `G` alike. Section 5.5 lane C ("the budget is 1M (ERC-8421) or 10M (sidecar config)"), section 5.6's gas table ("sidecar config 10M"), R1's fallback ("use the always-on chain 1337") and Q&A answer 1 all rest on a budget that does not exist in the source. This also means every area 1(a) project (ZK privacy, PQ wallets) is blocked on chain 1337 today, while ERC-20 and quota paymasters under 100k are not. The prize text promises "verification budget higher than 100k", so expect the event devnets to ship BUDGET-010, but the team must confirm it before writing a line of the paymaster.

### 2.2 V1 frames (T3), admissibility per frame

| Frame | Sidecar on chain 1337 (source at `2e22ff0a`) | ERC-8421 draft | Verdict and fixes |
|---|---|---|---|
| F0 VERIFY, flags 0x02, target null (R, default code), 30,000 / 0 | The shape `[only_verify, pay]` is recognized (the workshop step 3 shape, which is mined with these exact F0 limits). It contributes 30,000 + 2,800 to the flat 100k sum. | PREFIX-100: a default-code target is exempt from opcode, call and storage rules, but limits still apply. BUDGET-010: 32,800 counts toward R's 100k. | Admissible alone. The plan assumes R is default code but never checks it (see 2.3, check 7). |
| F1 VERIFY, flags 0x01, target P, 400,000 / 0 | **Rejected at `structure`** (432,800 > 100,000). If that gate were lifted: Tornado slot reads need stake (`frameTx.ts` lines 753 to 799, message `unstaked payer accessed <addr> slot <slot>`); GAS is banned for every role, only BALANCE and SELFBALANCE are relaxed and only for `stake > minStake` strictly (lines 68 to 80, 699 to 707); `outOfGasExists` rejects any revert on OOG; CODE_ACCESS allows precompiles. | BUDGET-010: 400,000 within the staked 1M. STORAGE-031 covers `banned[n]`; STORAGE-032 covers `roots`, `currentRootIndex`, `nullifierHashes`. OPCODES inherits EIP-8141's banned list, so GAS not followed by a CALL is banned for staked entities too. CALLING-040 allows 0x06, 0x07, 0x08. OPCODES-040 bans revert on OOG. SOLVENCY-010 reserves max cost against P. | Admissible under the draft once sized correctly. Not admissible on the current sidecar. Size F1 for the worst case: `isKnownRoot` on the replayed v2.0 pool scans up to 100 cold `roots[i]` slots (about 220k extra for a stale root); with VerifierCompat (about 240k) and the helper calls that can pass 400k and trip OPCODES-040. On EIP-8141 master, APPROVE's nonce increment that creates a fresh sender's account charges state gas in the approving frame (F1). Chain 1337 accepts state 0 there (workshop step 3), a master-aligned devnet may not. |
| F2 SENDER, Tornado, 550,000 / 250,000 | Execution body, unrestricted. Creating R's account by value transfer needs state gas (`devnet-readme.md` gotcha 1). | Execution body, outside the rules. | Admissible. 250,000 state must cover R's account (183,600) plus the new `nullifierHashes` slot; measure it. Tornado's own verifier, GAS pattern included, is fine here. |
| F3 DEFAULT, P.postWithdraw, 40,000 / 30,000 | Body (post_op). | After the prefix, so PREFIX-120 does not apply. | Admissible. 30,000 state must cover one new slot; check 11 should floor the state limit too, or an attacker sets it to 0 and the `banned[n]` write halts. |

Prefix shape, flags and ordering are right: F0 approves EXECUTION only, F1 approves PAYMENT after `sender_approved`, no ATOMIC_BATCH in the prefix (PREFIX-040), no VERIFY after the prefix (PREFIX-050).

### 2.3 The twelve paymaster checks

| # | Plan | Our assessment |
|---|---|---|
| 1 | `CURRENT_FRAME_INDEX == 1`, `FRAME_COUNT == 4` | Correct and necessary: approval covers every later SENDER frame, so pinning the count is the only way P stops paying for extra work. |
| 2 | F0 is VERIFY and targets the sender | Correct. |
| 3 | F2 mode, target, value 0, flags 0, gas floors, length 516 | Correct; 516 = 4 + 7 x 32 + 32 + 256 for the v2.0 `withdraw` ABI. Also pin F2 and F3 limits from above, or rely on check 6 (it does bound them via MAX_COST). |
| 4 | Canonical-ABI codec | The best check in the plan. Non-canonical `bytes` offsets are a real source of P and Tornado reading different proofs. |
| 5 | `relayer == this`, `refund == 0` | Correct for `ETHTornado` v2.0 (`require(_refund == 0)`). |
| 6 | `fee == FIXED_FEE >= MAX_COST + margin` | Correct mechanism, wrong demo arithmetic. Sum of limits is about 1.3M gas; at the workshop's 2 gwei MAX_COST is about 0.0026 ETH, so the demo's 0.098 ETH to R (fee 0.002) fails this check. Use maxFeePerGas of 1 gwei or less (the base fee is 7 wei) or a fee of at least 0.003. TXPARAM 0x06 is ethrex-only; devnet1-3 may expose `max_fee` instead. Confirm MAX_COST includes intrinsic and signature bytes; otherwise also pin `SIGNATURE_COUNT == 1`, or an attacker pads an ARBITRARY signature that P pays for. |
| 7 | `recipient == TXPARAM SENDER` | Necessary but not sufficient. Nothing enforces that R has no code. An attacker uses an R that is 7702-delegated (or a contract) whose VERIFY approves and whose receive reverts: F2 reverts, P pays max cost, `banned[n]` is set, the note is unspent and is withdrawn elsewhere, and the cycle repeats per note at roughly 1:1 cost. Add `EXTCODESIZE(SENDER) == 0` (the sidecar's CODE_ACCESS rule skips the sender, and EIP-8141 exempts sender default-code behaviour). |
| 7b (missing) | | Pin `NONCE_KEY_COUNT == 1`, `NONCE_KEY_0 == 0` and nonce 0. The sidecar has no per-sender cap on keyed transactions, so without this one R carries K duplicates on K nonce keys with **one** proof; the plan's fan-out assumes K senders and K proofs. With the pin, each fresh R holds one pending withdrawal and duplicates cost one proof each. |
| 8 | `!banned[n]` | Correct (STORAGE-031). |
| 9 | `!isSpent(n)`, `isKnownRoot(root)` | Correct, but use a root-index hint in VERIFY data and check `Tornado.roots(idx) == root` (the v2.0 `bytes32[100] public roots` getter): one SLOAD instead of a scan of up to 100, a constant F1 cost, and Tornado's own `isKnownRoot` in F2 still passes. Run 8 and 9 before the pairing so invalid transactions cost nodes the least. |
| 10 | VerifierCompat on the six inputs | Correct in shape. See 2.6 for the key and range-check requirements. |
| 11 | F3 layout and gas floor | Add a state-limit floor, value 0 and flags 0. |
| 12 | `postWithdraw` guards | Correct and well reasoned: without the F1-ownership check anyone could ban a pending victim's nullifier from their own transaction. |

### 2.4 Which entity is blamed for what

V1 entities: sender R (unstaked, default code), payer P (staked). V2: G is sender and payer (staked).

| Event after admission | ERC-8421 draft | Sidecar on chain 1337 |
|---|---|---|
| Another inclusion spends n (the fan-out) | P's VERIFY frame flips; REPUTATION-310 exonerates the payer only for sender or factory failures, so P keeps the `seen`. Blamed: P. | `seen` was bumped at admission (`updateSeenStatus`), revalidation cancels the entry, no attribution code exists. Blamed: P. |
| 100 deposits evict the root | P's frame flips. Blamed: P. | Same. |
| R gains code (7702) and its VERIFY stops approving | REPUTATION-310: P's `seen` is decremented. Blamed: R. | No REPUTATION-310: P keeps the `seen`. Blamed: P. A real divergence worth reporting. |
| P's balance drops below its reservations | SOLVENCY-010 eviction; no rule decrements `seen`. Effectively P. | `enforceBalances` drops the newest entries first; P keeps the `seen`. |
| P calls `unlockStake` | LIFECYCLE-040 revalidates; STORAGE-032 no longer applies. Blamed: P. | Same, via the full revalidation sweep. |
| Included, but F2 reverts (reverting recipient) | Counts as included; no reputation loss; P loses gas. | Same. |
| V2 duplicate (same `(G, [k(n)], 0)`) | A replacement, not a new `seen` (REPUTATION-040); needs +10% on both fee fields (LIFECYCLE-020). | Needs a 10% bump, but `updateSeenStatus` runs on replacements too (`MempoolService/service.ts` line 311), so each bump adds `seen`. Divergence. |
| Any V2 failure | REPUTATION-330: staked sender G absorbs every failure. | G is bumped as payer (the self-relay shape has no separate sender entry). |

SAME_SENDER limits: V1's R is unstaked, so ERC-8421 allows 64 pending per sender (LIFECYCLE-030); the sidecar caps linear transactions at 4 per sender and does not cap keyed ones. V2's G is staked and ACTIVE, so neither ruleset caps it sender-wide. A staked third-party payer has no pending cap in either while ACTIVE (`checkEntityCountInMempool` lets `checkStake` pass); THROTTLED limits it to 4.

### 2.5 Lanes: is each contrast real?

| Lane | Plan's claim | What actually happens |
|---|---|---|
| A, canonical (`eth_sendRawTransaction`, which the gateway forwards to ethrex; the plan's diagram is right) | Rejected for non-sender storage and the 100k cap | Rejected, real but overdetermined: the declared 432,800 fails `MAX_VERIFY_GAS` without any trace. Expect the cap message, not `StorageReadNonSender`; narrate whatever ethrex returns. |
| B, unstaked `P_u` | Rejected with "unstaked payer accessed ... slot ..." | On the current sidecar: rejected at `structure`, same as C. Under BUDGET-010: rejected by budget (400,000 > 100,000, and also > the landing page's 250,000), so the storage message never appears. To show STORAGE-032, add a lane B' whose `P_u` stays under the unstaked budget and only reads `isSpent` before APPROVE. |
| C, staked `P_s` | Admitted and included | Not on the current sidecar. Under BUDGET-010: admissible if F1 is sized for OPCODES-040. |
| D, staked original verifier | Rejected for GAS | Correct under both rulesets (see 2.6); on the current sidecar it is masked by `structure`. |

Even when everything works, A to B to C is our workshop's steps 6 to 8 (ViolatingWallet rejected, stake, admitted). We will credit it as qualification, not creativity. Under the observed config, `minStake` 0.01 ETH is met by 0.012; `minUnstakeDelay 0` makes any delay count as staked, which makes the Sybil cost meaningless on the devnet. Stake with `unstakeDelay >= 86400` anyway, which costs nothing and shows ERC conformance (the registry's own smoke test uses `addStake(86400)`).

### 2.6 The GAS rule and VerifierCompat

The concern is correct. EIP-8141 bans GAS in the prefix "except when followed immediately by a `*CALL` instruction"; ERC-8421's OPCODES section inherits that list for every validation frame except the PREFIX-100 exemptions, so stake does not help. ethrex's tracer mirrors geth's erc7562 tracer: GAS is counted unless the next opcode is CALL, CALLCODE, DELEGATECALL, STATICCALL, RETURN or REVERT (`erc7562_tracer.rs`, `suppresses_gas_lookback`), and the sidecar bans counted GAS for every role. `staticcall(sub(gas(), 2000), ...)` puts SUB after GAS, so it is flagged. Two corrections to the plan:

- The disassembly to look for is `PUSH2 0x07d0, GAS, SUB, STATICCALL` (Yul evaluates arguments right to left), not "GAS, PUSH2 0x07d0, SUB". Searching for the wrong order would "refute" a true finding at hour 1.
- `invalid()` matters only on a failed precompile call, which invalidates the transaction anyway. Removing it is fine but cosmetic.

The fix (`staticcall(gas(), ...)`, which is exactly what solc emits for a high-level call) is acceptable, with three conditions:

1. **The verifying key must come from the devnet, not GitHub master.** The devnet replays the Dec 2019 deployment "before a later governance-only verifier swap", and its Tornado proof was made with "the real, original v2.0 circuit and proving key (matching this pool's genuine 2019 verifying key, not the later governance-updated one)" (`deployments/devnet.md`). Master's `Verifier.sol` is the 0.7 rewrite. Extract the VK constants from the bytecode at `0xECD2eE825ebCA4D6BEbD269FCA033229addf9f01`.
2. Keep both range checks (`p[i] < PRIME_Q`, `input[i] < SNARK_SCALAR_FIELD`). If VerifierCompat is more permissive than the deployed verifier, then `n + r` style inputs pass F1 and fail F2, and every such variant drains P once.
3. Run parity by `eth_call` against the deployed verifier (accepted proofs, rejected proofs and non-canonical inputs), not only in Forge against a GitHub copy.

### 2.7 Does double verification matter?

Yes, in four ways, none fatal. (1) About 240k extra gas per withdrawal, paid by the user through FIXED_FEE. (2) It creates the parity risk in 2.6. (3) Node work: P's validation (about 300k to 500k) is re-simulated on every block while pending, because the sidecar revalidates every `New` entry every block (`selectCandidatesForRevalidation` returns all entries). (4) Under ERC-8421's dependency-filtered revalidation (LIFECYCLE-040), every deposit rewrites `currentRootIndex` and `roots[]` and every NullRelay inclusion changes P's balance, so each of those forces revalidation of every pending NullRelay transaction. That amplification is the DoS-relevant number, and the plan does not measure it.

The plan's justification is incomplete. Double verification is the price of read-only validation as much as of an unmodified pool. MacWha's 4337 paymaster avoids it by executing the fee payment, the Tornado withdrawal itself, inside `validatePaymasterUserOp` (threat 002 is "Obsolete" for that reason). That writes Tornado's `nullifierHashes`, which is not associated storage, so ERC-7562 forbids it, and his SDK's test harness starts Alto with `safeMode` defaulting to false. In frames the equivalent would be a `pre_verify` write, which STORAGE-033 forbids for the same reason. Say this in the README: it is NullRelay's real delta over the 4337 work.

### 2.8 Tornado facts the plan gets wrong

| Plan says | Source says | Impact |
|---|---|---|
| "the real 2020 proving key", "2020 ceremony artifacts" (sections 3.1, 5.7, 5.8, 9.1, R4) | The pool and verifier use the v2.0 (2019) key; proofs with the ceremony key will not verify | G2 fails until fixed; also an embarrassing pitch line in front of the people who replayed it |
| ROOT_HISTORY_SIZE 30 (trade-off 6) | v2.0 `MerkleTreeWithHistory.sol`: `ROOT_HISTORY_SIZE = 100`, `bytes32[100] public roots` (30 is master) | Root eviction takes about 100 deposits; F1 gas grows with root age |
| Prover ladder: Kohaku, then tornado-cli with websnark, then snarkjs | The devnet operators report websnark's WASM prover produced "cryptographically wrong" proofs for this key; snarkjs worked only after parsing points at infinity correctly, validated against MacWha's `websnark-rs` | Drop websnark; go straight to snarkjs with the corrected key parse or a `websnark-rs` conversion; confirm Kohaku's plugin can load the 2019 key |
| Anonymity set | `deployments/devnet.md`: the 2026-10-08 reset wiped the earlier deposits | Fine; already disclosed |

### 2.9 Is the fan-out measuring something real?

Partly. On this sidecar, K duplicates against `P_s` are admitted (a staked payer has no pending cap while ACTIVE), limited only by SOLVENCY (the float must cover K times max cost). With the default config the relayer submits up to `bundleSize` 4 entries per 10 s `bundleInterval`, so expect up to 4 duplicates to reach ethrex, one to be included and the others to be dropped at block building (EIP-8141's "unpaid validation at block building"); record this on the local stack, where the config is known. The rest are cancelled by the next revalidation sweep. P's `seen` rises by K and `included` by 1 on each sidecar node (the gateway and the miner node count separately). No `crashedHandleOps` penalty is applied (`relayers/base.ts`), so there is no instant ban.

What it does not show: at K of at most 20, `floor(21 / 10) = 2 <= 1 + 10`, so the status stays `ok`. THROTTLED needs about 120 and BANNED about 520 (the plan's arithmetic matches `ReputationEntry.ts`; the sidecar decays linearly per hour, not by 23/24). The "honest paymaster is blamed" beat is counter arithmetic plus extrapolation, which is why our workshop's step 9 cheats.

What is real and demonstrable at K of at most 20: **reservation squatting**. Size P's float to K times max cost, let the attacker set the highest maxFeePerGas that check 6 allows, and an honest withdrawal in the same block is refused for payer balance. The cost to the attacker per block is about one deposit plus FIXED_FEE (which goes to P), so the censorship is real but priced. Make that the deterministic headline of beat 2, with counters as the secondary panel. Also report which part is sidecar-specific (no blame attribution, no REPUTATION-040, full-sweep revalidation) rather than presenting it as ERC-8421 behaviour.

The best framing available: Nero_eth's "Three Gates" post says nullifier invalidation is "per-tx and individually targeted, never mass". NullRelay shows that with a third-party payer, one nullifier write invalidates K pending transactions. Cite it and measure exactly that.

### 2.10 Is the nullifier-as-nonce-key gateway sound and novel?

Sound for its target. Keys are `uint256` at the devnet pin (EIP-8250 `81b976ac`), so `k(n)` can be the nullifier hash itself; this answers the plan's question 9. Duplicates share `(G, [k(n)], 0)` and are rejected or must replace (the sidecar's "one pending transaction per (sender, key)"); requiring nonce 0 in VERIFY blocks sequences 1 to 3 that SAME_NONCE_KEY_MEMPOOL_COUNT would otherwise allow. Corrections:

- First use of a key costs `KEYED_NONCE_FIRST_USE_GAS = 20,000` of the approving frame's **execution** gas at the 1337 pin, not state gas; MSP's 195,840 state figure is from a different profile. Size F0 accordingly.
- TXPARAM ids at the pin are `NONCE_KEY_COUNT 0x0D` and `NONCE_KEY_0 0x10`; confirm which id returns `nonce_seq`.
- Q&A answer 7 is wrong: the proof binds Tornado's `fee`, not `maxFeePerGas`, so anyone can fee-bump a V2 transaction without a new proof (V2 carries no signature) until MAX_COST reaches FIXED_FEE minus the margin. That is bounded and harmless to the user, but on the sidecar each bump adds `seen` to G.
- The per-note grief from a reverting recipient X remains, and G cannot check X's code in VERIFY (EXTCODESIZE on an address without code is a CODE_ACCESS violation).

Not novel. EIP-8250's motivation names exactly this pattern ("one derived from a privacy nullifier"), ERC-8421's rationale says privacy protocols select "a fresh nonce key at sequence 0" on a shared sender, our docs' use-cases page says the same, and minimal-shielded-pool implements it. The only new part is the gateway over an unmodified pool and the V1 against V2 measurement. Proposal A restates our rationale.

### 2.11 The rule proposals

- **A:** already in ERC-8421's rationale. Drop it or cite it.
- **B** (do not count such drops toward the payer's `seen`): we would reject it. It removes the only throttle on unpaid node work for a whole class of payers, which reopens exactly the attack ERC-8421 exists to bound.
- **C** (cap pending transactions per staked payer per non-entity slot read as zero): the interesting one, and the plan files it as "idea only". The sidecar already records each entry's accessed slots (`accessedSlotsCache` in `reconciliation.ts`), so a local rule (LOCAL family, no reputation effect) is a small patch. Implement it on the local stack, rerun V1's fan-out with and without it, and state the false-positive analysis (for example `currentRootIndex` can legitimately be zero).

### 2.12 Answers to the plan's section 7.2 questions, from source

| Q | Answer |
|---|---|
| 4 Budgets | Chain 1337 sidecar: a flat 100,000 execution and 500,000 state over the whole prefix; no per-entity budget code. ERC-8421: 100k and 1M per entity. Landing page: 250k and 2.5M. |
| 5 GAS for staked entities | Banned for every role; only BALANCE and SELFBALANCE are relaxed, for `stake > minStake` strictly. |
| 6 Third-party payer cap | Unstaked: `10 + floor(10 x inclusionRate) + min(included, 10000)`. Staked and not throttled: none. Throttled: 4. |
| 7 Dropped on revalidation | Counted in `seen` at admission, never included, never decremented: effectively seen without included. |
| 9 Key width | `uint256`; use the nullifier hash directly. |
| 10 EXTCODESIZE on the sender | Allowed: the sidecar's CODE_ACCESS skips the sender, and EIP-8141 exempts sender default-code behaviour. |
| 11 Canonical rejections in the explorer | The explorer records sidecar admissions and rejections; a raw transaction forwarded to ethrex is not a sidecar admission, so expect lane A only in your own UI. |

## 3. Scores (verbatim criteria)

| Criterion | Score | Justification |
|---|---|---|
| "creativity" | 6 | The retrofit of an unmodified legacy pool on the stock ruleset, the canonical-ABI codec and the post_op guard are genuinely thoughtful. But the use case is named in ERC-8421's motivation ("privacy pool withdrawals"), MacWha built it for 4337, Nero_eth described it for frames in April, the devnet replays Tornado to invite it, the A/B/C lanes are our workshop, and the fix is EIP-8250's leading example. |
| "usefulness" | 7 | A compliant reference payer for existing pools is directly useful to Kohaku and to us as a conformance target (STORAGE-032, BUDGET-010, GAS rule, SOLVENCY). The fan-out and squatting numbers, labelled sidecar against draft, are useful input to the rules. |
| "practicality" | 5 | Double verification, a fixed fee with no oracle, float and stake custody, an F1 cost that depends on root age, a staked budget the current node lacks, the 2019 key and prover pitfalls, and a 36-hour scope with two unverified opcode families on chain 1337. |
| "how well it works" | 4 as written (7 if fixed) | As written, nothing past the deposit is admitted on chain 1337, and G2 fails on the wrong key. With the must-fixes and an event devnet that has BUDGET-010, a live admitted withdrawal is likely. |
| "relation to the alt mempool" | 9 | It exercises nearly every rule family we wrote: staked payer, STORAGE-031/032, BUDGET-010, OPCODES (GAS), SOLVENCY-010, REPUTATION-310/330/040, LIFECYCLE-020/030/040, keyed-nonce identity. It also produces findings about our implementation. |

**Overall: 6.2 of 10 as written; about 7.5 with the must-fixes.**

**Placement forecast.** As written: 3rd at best, none if no withdrawal is admitted (a rejected transaction is not "real alt mempool usage"). With the fixes and a BUDGET-010 devnet: 2nd most likely, because it is the most rule-literate privacy entry we expect, but its novelty is capped by MacWha's privacy-paymaster, Himitsu (no-relayer privacy via frames at Tokyo, though with its own pool and a patched ethrex) and minimal-shielded-pool (the V2 pattern). Expect one or two other Mumbai teams to try "Tornado through a paymaster", since our devnet docs and the replay advertise it. It reaches 1st only with a live admitted withdrawal plus an upstreamable sidecar change: BUDGET-010 per-entity budgets, REPUTATION-310/040, or proposal C as a local rule. If the event devnets keep the flat 100k cap, the ERC-20 and quota paymaster entries and the tooling entries win by default, and NullRelay cannot qualify on the explorer.

## 4. Top 3 strengths

1. **A correct, compliant payer design.** Read-only validation, frame-count pinning, byte-level binding of the SENDER frame, the canonical-ABI codec, fee at least max cost, and a post_op that re-derives n and checks F1 ownership. This is the ERC-8421-legal version of a privacy paymaster, which the 4337 prior art is not.
2. **Depth of relation to our rules.** It needs STORAGE-032 for a real reason, needs a staked budget for a real reason, trips the GAS rule in real deployed bytecode, and stresses SOLVENCY and reputation with a measurable experiment. It also caught a real footgun our workshop teaches: APPROVE in `fallback` makes any plain ETH transfer (Tornado's fee payment) halt.
3. **Honesty and self-attack.** A mocked-parts list, an explicit trade-off section, a fallback ladder, and a plan to measure its own failure mode on our infrastructure, with read-only debug calls only.

## 5. Top 5 weaknesses (most serious first)

1. **The admission premise is contradicted by the sidecar source.** A flat 100k prefix cap applies before stake is considered; `validationGasLimit` is unused; lanes B and C fail identically on chain 1337; the chain 1337 fallback is backwards.
2. **Wrong Tornado assumptions.** The 2019 v2.0 key (not 2020), root history 100 (not 30), a known-bad websnark path, and a VerifierCompat VK that would be copied from the wrong source. Each costs hours at G2 and invites a parity bug that drains P.
3. **The break-and-fix story is mostly ours already.** The fan-out is ERC-8421's defined mass invalidation, REPUTATION-310 blames the payer by design, K of at most 20 changes no state, the fix is EIP-8250's motivating example, proposal A restates our rationale and proposal B would reopen the attack. The one genuinely new rule idea (C) is parked as "idea only".
4. **Lane narration and edge cases are inaccurate.** Lane A and B messages are predicted wrongly; the R-has-no-code assumption is unenforced (a per-note grief); one sender can carry K keyed duplicates with one proof; the demo fee fails check 6 at 2 gwei; the Q&A claim that a fee bump needs a new proof is wrong; on master-aligned profiles F1 needs state gas for the sender's account creation.
5. **Scope against risk.** Tornado proving, tree rebuild, a twelve-check paymaster, V2, a fan-out harness, a UI and a video in 36 hours, with gates G1 to G3 inside the first 15 hours and TXPARAM, FRAMEPARAM and FRAMEDATACOPY unverified on chain 1337. The L3 fallback (drop SENDER binding) ships a paymaster that anyone can drain by replaying one proof forever, which a DeFi-security team should never demo.

## 6. Must-fix changes

1. **Add gate G0 now (async, by Mon 3 Nov):** ask Alex which event devnet enforces BUDGET-010, citing `validationPrefix.ts` line 288 at `2e22ff0a`. A read-only `eth_estimateFrameTransactionGas` on a 432,800-gas prefix also answers it, because the estimate path runs `validate()`. If no devnet has it, the plan B is: implement per-entity budgets in a sidecar fork on the local stack, open it upstream as a PR, and ask on site whether an admission on that node counts. Delete every "10M sidecar budget" statement.
2. **Fix the Tornado facts:** the v2.0 artifacts; snarkjs with the point-at-infinity fix or `websnark-rs`, no websnark WASM; VK constants extracted from `0xECD2...`; `eth_call` parity tests including non-canonical inputs; ROOT_HISTORY_SIZE 100; a `roots(idx)` hint instead of the `isKnownRoot` scan.
3. **Harden V1:** require `EXTCODESIZE(SENDER) == 0`; pin `NONCE_KEY_COUNT == 1`, key 0 and nonce 0; floor F3's state limit; pin the signature count unless MAX_COST provably includes intrinsic bytes; run the cheap checks before the pairing.
4. **Correct the lanes:** predict lane A as the cap message; expect lane B to fail on budget under BUDGET-010 and add a B' lane that shows STORAGE-032; record actual strings from the explorer admission report.
5. **Fix the numbers:** maxFeePerGas of 1 gwei or less (or a larger FIXED_FEE) so that check 6 passes; derive every figure from `eth_estimateFrameTransactionGas` per profile, including F1 state gas on master-aligned devnets and the 20,000 first-use gas in V2's F0.
6. **Re-scope the attack beat:** make reservation squatting the deterministic demo; show reputation counters as secondary; label sidecar-specific behaviour (no blame attribution, `seen` on replacement, full-sweep revalidation) separately from ERC-8421 behaviour.
7. **Replace proposal B** with an implemented proposal C (local per-slot cap) measured on the local stack, and cite ERC-8421's rationale instead of presenting proposal A as new.
8. **Replace fallback L3** (drop binding) with "pivot to V2 only" or "local stack only". Never ship an unbound payer.
9. **Cite prior art properly:** Nero_eth's "Three Gates" post (ring-buffer mass invalidation; "never mass" for nullifiers) and MacWha's withdraw-in-validation design with its non-safe-mode harness. Drop "first frame-native retrofit" unless you can stand behind it under questioning.
10. **Stake with `unstakeDelay >= 86400`**, even though the sidecar accepts 0.

## 7. Nice-to-haves

- Measure node work on the local stack: admission and revalidation simulation time per pending NullRelay transaction; revalidations triggered by one deposit with N pending (LIFECYCLE-040 amplification); block-builder drops when K duplicates are relayed in one pass.
- Upstream small sidecar fixes found along the way (REPUTATION-310 attribution, REPUTATION-040 on replacement). We would weigh a merged or mergeable PR heavily.
- Ship the paymaster as a Kohaku Tornado plugin adapter, since trebor is building exactly this class of paymaster.
- Per-lane explorer deep links (`skandha_explorer_getTransaction`) next to the UI cards.
- A one-paragraph comparison table of V1 against V2: user signature binding and tail calls against protocol dedupe, shared-sender state and FOCIL/VOPS cost.

## 8. Questions we would ask in Q&A

1. "Our sidecar enforces `MAX_VERIFY_GAS` 100k at `structure`. On which devnet was your withdrawal admitted, and what budget did the admission report show for your payer?"
2. "Which verifying key does VerifierCompat embed, and how did you prove parity with `0xECD2...`? Did you test inputs at or above the scalar field?"
3. "Walk us through an R that is 7702-delegated to a contract that approves in VERIFY and reverts on receive."
4. "REPUTATION-310 blames the payer whose frame flipped. If not the payer, who bounds the node's unpaid work in your fan-out?" (This is the test of proposal B.)
5. "At K of 20 nothing changed status. What exactly did you measure, and which parts are specific to our sidecar rather than the draft?"
6. "Every Tornado deposit rewrites `currentRootIndex`. With N NullRelay withdrawals pending, how many revalidations does one deposit cause under LIFECYCLE-040, and is that a DoS?"
7. "Why not execute the withdrawal in a `pre_verify` frame and skip the second proof check?" (Expected: STORAGE-033 allows writes only to slots associated with the entity; `nullifierHashes[n]` is not.)
8. "V2 transactions are unsigned. What can a third party change, and what is the worst outcome for the user and for G?"
9. "Why does V1 exist at all if V2 dedupes? What does a user-signed, third-party-payer design give that a shared sender does not?"
10. "Could EIP-8272 recent roots remove your dependency on Tornado's ring buffer? What would move from mempool invalidation to on-chain failure if you tried?"
11. "What is max cost relative to FIXED_FEE at our 7 wei base fee, and what happens to a fixed fee at mainnet base fees?"
12. "Name one sentence of ERC-8421 you would change, as a PR, and the trade-off it introduces."

## 9. Plans A, B, C and E: frame transactions and the alt mempool

- **A (Lightfoot, verified anonymous reads):** makes no frame-transaction claims; lists "private writes, transaction broadcast, the alt mempool" as explicit non-goals. An alt-mempool component would be bolted on (reads are not sends), and EF places a project in one prize anyway. Not credible.
- **B (Dapp Leak Report):** no frame-transaction claims; it skips the prize because "we send no transactions". It could flag dapps that depend on one bundler or relayer endpoint, but that is not alt-mempool usage. Not credible.
- **C (Chupke on Whitechain):** no frame-transaction claims; it skips the prize because admission must be on EF devnets. The only credible add-on is a separate chain-1337 side demo of the same checkout as an ERC-20 paymaster on the replayed USDC or USDT (pull with `transferFrom` in `pre_verify`, which uses associated slots; an EIP-3009 pull would write a nested `_authorizationStates` slot that is not associated with the sender). It would not carry over to Whitechain and would split focus. Not recommended.
- **E (SameBuild, verified frontend):** no frame-transaction claims ("no transaction-type need"). Not credible.
