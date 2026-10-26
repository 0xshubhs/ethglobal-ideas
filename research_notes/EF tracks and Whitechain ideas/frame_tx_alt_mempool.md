# EIP-8141 Frame Transactions and the ERC-8421 Alternative Mempool: spec, tooling, gaps and hackathon builds (ETHGlobal EF prize "Best Use of the Frame Transaction Alternative Mempool")

Research date: 2026-10-26. Primary sources were read directly: the EIP-8141 markdown on `ethereum/EIPs` master (last commit 2026-10-25), the ERC-8421 draft in `ethereum/ERCs` PR #2028 (last commit 2026-10-01), and the alt-mempool workshop, sidecar, docs and `@forshtat/hegota-support` repos. I also probed the live RPC endpoints myself on 2026-10-26. A lot of secondhand material on EIP-8141 (blogs, Medium, older Magicians posts) describes earlier layouts, for example `frames = [mode, target, gas_limit, data]`, a `signature_type` byte in EOA frame data, and per-gas fee caps. Those layouts are **outdated**, and the notes below say so wherever it matters.

## Q1. What is the latest text of EIP-8141 and ERC-8421, who wrote them, and what changed recently?

### Takeaway
EIP-8141 is still Draft, but it has been Scheduled for Inclusion in Hegota and is edited almost daily; the latest change was on 2026-10-25. In its current form a type-0x06 transaction carries a separate `signatures` list, per-frame two-dimensional gas `limits = [execution, state]`, a per-frame `value`, and one aggregate `max_fee` budget. There are three modes (DEFAULT 0, VERIFY 1, SENDER 2), the APPROVE opcode (0xaa), and five introspection opcodes (0xb0-0xb5). ERC-8421 is a Draft ERC created on 2026-09-21 and still sits in an unmerged PR. It extends the canonical mempool with a staking registry, per-entity verification budgets (100k unstaked, 1M staked), a `pre_verify` frame that may write state, associated-storage rules, and ERC-7562-style reputation.

### Cited Findings
**EIP-8141 metadata and status**
- Title "Frame Transaction", status Draft, Standards Track Core, created 2026-01-29. Authors: Vitalik Buterin, lightclient, Felix Lange, Yoav Weiss, Alex Forshtat, Dror Tirosh, Shahaf Nacson, Derek Chiang, Toni Wahrstatter, Stavros Vlachakis. Requires 1559, 2718, 2780, 3529, 3607, 4844, 7594, 7702, 7708, 7778, 7825, 7976, 8037. Discussion is on Magicians t/27617. ([EIP-8141 source on master](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8141.md))
- The Hegota meta EIP-8081 lists EIP-8141 and EIP-7805 (FOCIL) under "Scheduled for Inclusion". It lists EIP-8250 (keyed nonces) and EIP-8272 (recent roots) only as "Considered for Inclusion". ([EIP-8081](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8081.md))
- Press coverage says 8141 moved from CFI to SFI on the 2026-08-27 ACDE call. It had received only CFI on 2026-03-26, after Besu's Daniel Lehrner called it "too complex for what it delivers". ([Tech Times, 2026-09-09](https://www.techtimes.com/articles/327061/20260909/ethereum-locks-protocol-that-eliminates-eth-requirement-gas-payments.htm))
- Secondary sources put Glamsterdam in Q4 2026 and Hegota in 2027, with no confirmed date. ([24/7 Wall St, 2026-09-07](https://247wallst.com/investing/cryptocurrency/2026/09/07/ethereums-eip-8141-would-let-you-pay-gas-fees-in-stablecoins-instead-of-eth-will-it-actually-launch-with-hegota-in-2027/))

**EIP-8141 current payload (master, 2026-10-25)**
- `[chain_id, nonce, sender, frames, signatures, fees, blob_versioned_hashes]`. Each frame is `[mode, flags, target, limits, value, data]`, with `limits = [execution, state]`, `signatures = [[scheme, signer, msg, signature], ...]` and `fees = [max_fee, max_priority_fee_per_gas]`. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Constants: FRAME_TX_TYPE 0x06; FRAME_TX_INTRINSIC_COST 12000; FRAME_TX_PER_FRAME_COST 475; ENTRY_POINT address(0xaa); EXPIRY_VERIFIER at 0x81413f0cF12e9b6a49B1D0439E081c577D57FfFf; MAX_FRAMES 64. The tx execution gas is capped at 16,777,216 (EIP-7825). ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Modes. DEFAULT (0) executes with caller = ENTRY_POINT. VERIFY (1) runs as a STATICCALL, must not fail (a failure invalidates the whole tx), and can change transaction context only through APPROVE. SENDER (2) executes with caller = `tx.sender` and requires `sender_approved`. Only SENDER frames may carry non-zero `value`. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Flags. Bits 0-1 are the approval scope. Bit 2 (0x4) is ATOMIC_BATCH: frames with the flag are all-or-nothing with the following frames. A VERIFY frame may not be in a batch, and frames in a batch may not carry an approval scope. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Signature schemes: ARBITRARY 0x0 (100 gas, not checked by the protocol), SECP256K1 0x1 (2800 gas), P256 0x2 (6700 gas). Every protocol-validated signature is checked before any frame runs. Raw bytes of protocol-validated sigs are deliberately hidden from the EVM so that they can be aggregated later. ARBITRARY bytes can be read with SIGDATACOPY. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Signature hash. `compute_sig_hash` elides the raw bytes of any signature with empty `msg`, replacing them with their **length**, so that a sig can sign the hash. Variable-length schemes must pad to a fixed length. Elided bytes are priced as if every byte were non-zero (floor tokens), so the payer's charge is fixed by the sig hash. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- APPROVE (0xaa), stack `offset, length, scope`. It exits the frame like RETURN. It reverts if `ADDRESS != resolved_target` or the scope is not allowed in `frame.flags`. Scopes: PAYMENT 0x1, EXECUTION 0x2 (only when the target is `tx.sender`), EXECUTION_AND_PAYMENT 0x3. Approving payment requires `sender_approved`, increments the nonce, sets `payer`, and collects `max_cost`. DELEGATECALLed code can also APPROVE. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Introspection opcodes (they halt outside a frame tx):
  - TXPARAM 0xb0: type, nonce, sender, max priority fee, max_fee, blob count, sig hash (0x08), frame count, current frame index, signature count, state gas left.
  - FRAMEDATALOAD 0xb1 and FRAMEDATACOPY 0xb2.
  - FRAMEPARAM 0xb3: resolved target, gas limits, mode, flags, data length, status (0x05, only for past frames), allowed scope, atomic flag, value, gas used.
  - SIGPARAM 0xb4: resolved signer, scheme, msg, ARBITRARY sig length.
  - SIGDATACOPY 0xb5.
  ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Default code: an account with empty code can still use frame txs. In VERIFY it requires a SECP256K1 signature with empty `msg` at index 0 (execution scope) or index 1 (payment-only) whose signer equals the target, and then calls APPROVE. EOAs can therefore use sponsorship, batching and ERC-20 fees, and any EOA can act as a "gas account" paymaster. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- The validation prefix is the frames up to and including the first frame after which `payer` is set. Everything after it is the execution body, which the mempool does not restrict. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))

**EIP-8141 recent changes (git log of EIPS/eip-8141.md)**
- 2026-10-25: charge the EIP-8037 legacy share as extra execution gas.
- 2026-10-22: `max_fee` is now the single cost bound (#12414), replacing per-gas fee caps. The sig hash commits to elided signature lengths (#12502). GASPRICE is specified under the budget. The mode section moved.
- 2026-10-09: validation prefix and execution body defined; TXPARAM, FRAMEPARAM and SIGPARAM params named.
- 2026-10-08: the approval context rolls back when a call reverts.
- 2026-10-06: the expiry verifier is deployed as an ordinary contract (#12387).
- 2026-09-29: EIP-7623 replaced by EIP-7976; producer-side re-execution of a non-approving prefix is bounded.
- 2026-08-18: banned-opcode list relaxed (#12167); SIGDATACOPY added (#12187).
- 2026-08-13: explicit state-gas dimension per frame (#12062).
- 2026-08-11: SLOTNUM banned in the prefix.
- 2026-07-28: replacement, eviction and payer-exposure rules.
- 2026-07-23: APPROVE gas, direct evaluation of protocol-defined prefixes, blob support.

([commit history](https://github.com/ethereum/EIPs/commits/master/EIPS/eip-8141.md))
- Earlier changes, from the Magicians thread: a `value` field was added to frames around 2026-04-17. In 2026-06 a bug report showed that custom signature schemes could not use the canonical hash, and lightclient promised to restore an arbitrary-bytes signature type. ([Magicians #139](https://ethereum-magicians.org/t/frame-transaction/27617/139), [#161](https://ethereum-magicians.org/t/frame-transaction/27617/161), [#164](https://ethereum-magicians.org/t/frame-transaction/27617/164))

**EIP-8141 canonical (public) mempool rules**
- MAX_VERIFY_GAS = 100,000: the prefix's execution limits plus the intrinsic cost of signature validation. MAX_VERIFY_STATE_GAS = 500,000. MAX_PENDING_TXS_USING_NON_CANONICAL_PAYMASTER = 1. ([EIP-8141 Mempool](https://eips.ethereum.org/EIPS/eip-8141#mempool))
- Only four prefix shapes are recognized: `[self_verify]`, `[deploy, self_verify]`, `[only_verify, pay]`, `[deploy, only_verify, pay]`, each optionally preceded by a leading `expiry_verify` frame. No VERIFY frame may follow the prefix. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Banned in the prefix: GASPRICE, BLOCKHASH, COINBASE, TIMESTAMP (except in the canonical expiry verifier), NUMBER, PREVRANDAO, GASLIMIT, BASEFEE, BLOBBASEFEE, SLOTNUM, GAS (unless immediately followed by a *CALL), CREATE, CREATE2 and SETDELEGATE (except in the first deploy frame), INVALID, SELFDESTRUCT, BALANCE, SELFBALANCE, SSTORE (except sender storage in deploy).
- SLOAD is allowed only on `tx.sender` storage. CALL* and EXTCODE* may target any existing non-delegated contract or a precompile.

([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Paymasters. A "canonical paymaster" is identified by an exact runtime-code match. Its ETH can leave only as tx payment or after a delay. Nodes reserve `max_fee` against `balance - reserved_pending_cost - pending_withdrawal`. A non-canonical paymaster may back only 1 pending tx. At most one pending frame tx is allowed per sender. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- The EIP itself admits that its ERC-20 paymaster example accepts front-running risk in the public mempool. lightclient confirmed on Magicians that a canonical-mempool sponsor cannot check ERC-20 balances on chain, and that gating validity on ERC-20 payment has been postponed. ([EIP-8141 Example 3](https://eips.ethereum.org/EIPS/eip-8141), [Magicians #158](https://ethereum-magicians.org/t/frame-transaction/27617/158))
- The canonical paymaster's bytecode is not in the EIP text. A 355-byte runtime with code hash 0xda42f0d1... is specified in EIPs PR #12012, and Nethermind's assembler and conformance suite for it (PR #12612) is still open. Geth's frame subpool says "no canonical paymaster yet since its code isn't pinned". ([Nethermind PR #12612](https://github.com/NethermindEth/nethermind/pull/12612), [geth PR #35891](https://github.com/ethereum/go-ethereum/pull/35891))

**ERC-8421 metadata and status**
- Title "Frame Transaction Alternative Mempools", Draft, created 2026-09-21. Authors: Yoav Weiss, Dror Tirosh, Alex Forshtat, Shahaf Nacson, dmpierre, Mohammad Jahanara, Robert MacWha. Requires 1153, 7819, 7951, 8037, 8141, 8250. ([ERC-8421 draft file in PR #2028](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- PR #2028 was opened by forshtat on 2026-09-22 and is still open and unmerged. The bot says it needs one more editor review. The last commit, on 2026-10-01, is "align nonce rules with EIP-8250 keyed nonces". ([ethereum/ERCs PR #2028](https://github.com/ethereum/ERCs/pull/2028))
- After review on Magicians (2026-10-01), LIFECYCLE-010 was fixed for transactions with several nonce keys, and SAME_SENDER_MEMPOOL_COUNT stopped applying to staked senders. That second change matters for shared-sender privacy pools. ([Magicians ERC-8421 thread](https://ethereum-magicians.org/t/erc-8421-frame-transaction-alternative-mempools/29800))

**ERC-8421 rules (draft text)**
- Constants:

| Constant | Value |
|---|---|
| MAX_VERIFY_GAS_PER_ENTITY | 100,000 |
| MAX_VERIFY_GAS_STAKED_ENTITY | 1,000,000 |
| MIN_UNSTAKE_DELAY | 86,400 s |
| MIN_STAKE_VALUE | about USD 1000 in the native token |
| SAME_NONCE_KEY_MEMPOOL_COUNT | 4 |
| SAME_SENDER_MEMPOOL_COUNT | 64 (unstaked only) |
| SAME_UNSTAKED_ENTITY_MEMPOOL_COUNT | 10 |
| THROTTLED_ENTITY_MEMPOOL_COUNT | 4 |
| THROTTLED_ENTITY_LIVE_BLOCKS | 10 |
| THROTTLED_ENTITY_BLOCK_COUNT | 4 |
| MIN_INCLUSION_RATE_DENOMINATOR | 10 |
| THROTTLING_SLACK | 10 |
| BAN_SLACK | 50 |

([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Entities are the sender, the payer (the target of the payment-approving frame) and the factory (the deploy target). A default-code entity is exempt from the opcode, call and storage rules. Gas budgets are tracked **per entity** (BUDGET-010). A `pre_verify` frame counts toward the entity whose approving frame follows it, and the sig-validation intrinsic counts toward the sender. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- New `pre_verify` subclass: a DEFAULT frame with the same target as the approving VERIFY frame right after it, at most one per approving frame. It may write state, for example a paymaster pulling ERC-20 before approving. The approving frame MUST check the `pre_verify` frame's status with FRAMEPARAM 0x05, because a failed DEFAULT frame does not invalidate the tx. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Prefix shapes are the same four as the canonical mempool, plus optional `pre_verify` frames and a leading `expiry_verify`. Frames that target default code, the canonical paymaster or EXPIRY_VERIFIER are exempt from the rules. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Relaxations relative to the canonical mempool:
  - BALANCE and SELFBALANCE are allowed for staked entities.
  - SSTORE is governed by the storage rules.
  - Storage associated with the sender in an external contract is readable once the sender exists (STORAGE-021), or with a staked factory (STORAGE-022). "Associated" means the slot value equals the address, or the slot is `keccak256(A||x)+n` with n in 0..128.
  - A staked entity may access its own storage (STORAGE-031), read any non-entity storage (STORAGE-032), and write slots associated with itself (STORAGE-033).
  - Precompiles 0x01-0x11 and P256VERIFY are allowed.
  - Revert on out-of-gas is forbidden.
  - The state-gas cap is removed.

([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Staking registry interface: `IStakingRegistry` with `addStake(uint32 unstakeDelaySec) payable`, `unlockStake()`, `withdrawStake(address)` and `getDepositInfo(address)`. There is no slashing; the stake exists only as a Sybil cost. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Reputation:
  - Counters `seen` and `included` decay by `x*23//24` every hour.
  - `max_seen = seen // 10`. An entity is BANNED if `max_seen > included + 50` and THROTTLED if it is above `included + 10`.
  - An unstaked sponsoring payer gets `opsAllowed = 10 + inclusionRate * min(included, 10000)`.
  - Blame: when the factory or sender fails, the payer's `seen` is decremented. A staked sender absorbs every failure in its transactions.
  - Counters are kept separately for each mempool.

([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Lifecycle and propagation:
  - A pending tx is identified by `(sender, nonce_keys, nonce_seq)` (EIP-8250).
  - Nonces must be contiguous per key, and conflicting txs are replacements that need a 10% fee bump.
  - Each tx is broadcast with the block hash it was validated against. A peer that relays a tx invalid even at that block is marked a spammer.
  - Each alternative mempool is identified by a topic, conventionally the IPFS hash of its rules document.

([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))

### Inferences
- Do not code against the newest EIP text. The public devnet pins EIP-8141 at commit 4a9ad32c (2026-07-30) (see Q2), so the 2026-08 to 2026-10 changes are probably absent there: the `max_fee` budget, the length-committed sig hash, SIGDATACOPY as a separate opcode, the expiry verifier as an ordinary contract, and possibly the state-gas limits. Build against the devnet profile in `@forshtat/hegota-support` instead.
- Timeline: SFI on 2026-08-27 and a Hegota release in 2027 mean a hackathon build in late 2026 is aimed at a fork roughly a year out. The SDKs and rules are therefore still unsettled.
- The canonical mempool cannot check ERC-20 balances, cannot verify ZK proofs (a BN254 pairing alone costs about 181k, see Q6), cannot verify PQ signatures in EVM above about 100k, and allows only one pending tx per sender. Every category in the prize description lives exactly in those gaps.

### Gaps
- I did not diff EIP-8141 commit 4a9ad32c against master line by line. The exact layout the chain-1337 devnet expects is recorded only in the `hegota-support` profile and the ethrex fork.
- EIPs PR #12012 (the canonical paymaster spec) was not read directly.

## Q2. Which devnets exist, which clients implement frame transactions, and is there a public explorer?

### Takeaway
There are two separate devnet families.
- **Alt-mempool devnets.** These are run by Alex Forshtat's team on a fork of ethrex (`forshtat/ethrex`, branch `eip8141-tracer`) plus a fork of the Skandha bundler (the "sidecar"). They are the ones the prize requires, because the qualification is an *admitted alt-mempool tx*. The always-on network is chain 1337; the ETHGlobal page also lists hackathon devnets 1, 2 and 3.
- **Official multi-client Bogota devnets.** These are run by ethpandaops (bogota-devnet-1, formerly frames-devnet-1) with geth, reth and ethrex at genesis, plus Nethermind and Besu joining as non-validating nodes. They exercise only the canonical client mempools.

### Cited Findings
**Prize page devnet list**
- ETHGlobal's EF prize page lists: devnet explorer https://altmempoolexplorer.forshtat.com; RPCs https://devnet1.altmempool.wtf, https://devnet2.altmempool.wtf and https://devnet3.altmempool.wtf; gateways https://gateway1.altmempool.wtf, gateway2 and gateway3; docs https://docs.altmempool.wtf/; starter page https://www.altmempool.wtf/. It also links the sidecar repo, the ethrex tracer branch, EIP-8141 and ERC-7562. ([ETHGlobal Mumbai EF prizes](https://ethglobal.com/events/mumbai/prizes))
- The same page says multiple devnets will run during the hackathon with keyed nonces and recent roots, that a faucet will be provided (no URL listed), and that "Pierre and Alex from the alt mempool team" will be on site. ([ETHGlobal Mumbai EF prizes](https://ethglobal.com/events/mumbai/prizes))

**Always-on alt-mempool devnet (chain 1337)**

| Item | Value |
|---|---|
| Chain ID | 1337 (0x539) |
| Block time | 6 s |
| Execution RPC (ethrex) | https://altmempool.forshtat.com |
| Mempool RPC (sidecar) | https://altmempool.forshtat.com/rpc |
| WebSocket | wss://altmempool.forshtat.com/rpc |
| Explorer | https://explorer.altmempool.wtf/ |
| Gateway used by the workshop | https://altmempoolgateway.forshtat.com/rpc |

([alt-mempool docs: devnet](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/devnet.md), [workshop README](https://github.com/forshtat/mempool-workshop))
- My own probe on 2026-10-26:
  - https://altmempool.forshtat.com returned chainId 0x539, client `ethrex/v23.0.0-eip8141-tracer-9aa3645d...` and block 0x3feaf.
  - https://altmempoolgateway.forshtat.com/rpc returned `skandha/v4.1.1-`.
  - Both explorer URLs and www.altmempool.wtf returned HTTP 200.
  - devnet1.altmempool.wtf and gateway1.altmempool.wtf/rpc returned empty responses, so they were not live yet.

([probe target](https://altmempool.forshtat.com))
- `skandha_config` on the gateway reported minStake 0.01 ETH, minUnstakeDelay 0, reputation parameters 10/10/50, validationGasLimit 10,000,000, standardMempoolId QmcFZKUX9qoo3StwVycJTAhwdiqbEjcwNvQVK246p3z1rk, and entry point 0x...aa (my probe, 2026-10-26). ([gateway](https://altmempoolgateway.forshtat.com/rpc))
- Versions pinned by the workshop:
  - ethrex `forshtat/ethrex@9aa3645d` (branch `eip8141-tracer`, 2026-10-01).
  - EIP-8141 at `4a9ad32c` (2026-07-30).
  - EIP-8250 at `81b976ac` (2026-08-03), NONCE_MANAGER at 0x...8250.
  - EIP-8272 at `d8636a33`, RECENT_ROOT_ADDRESS at 0x...8272.
  - Alt-mempool rules from `forshtat/ERCs` PR #6 at commit 74a868cd. These predate ERC-8421 and are "not equivalent" to it.

([workshop README](https://github.com/forshtat/mempool-workshop))
- Funding and gas on chain 1337:
  - The docs say there is no faucet. One genesis account's key is published in the sidecar repo, and the workshop's `step_1_check` funds a fresh key from it. The ETHGlobal page says a faucet will exist on site.
  - Under the Amsterdam+ gas model, a transfer to a new account needs 204,600 or more gas because of 183,600 state gas.
  - Contract creation needed a gas limit of about 6M; 900k reverted.

([devnet docs](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/devnet.md), [workshop config](https://github.com/forshtat/mempool-workshop/blob/HEAD/workshop.config.json5))
- Real mainnet contracts were replayed onto chain 1337 (devnet reset on 2026-10-08):

| Contract | Address |
|---|---|
| LINK | 0x7BF399a347FC0757e668058f11D3B696932353e4 |
| USDT | 0xdb6785eB39E80a1770699C5dF8Ab7d4AC683b4D9 (deployer can mint) |
| BAYC | 0x4F07c6E07C502f43373E5ecb42adBb92b41e192d |
| Tornado Cash 0.1 ETH pool | 0xF8d72424D07721aB219cdbd2852657F3301673fC |
| Tornado Hasher | 0x4500a5B572903a1DE1615d13A366cF2B324675E2 |
| Tornado Verifier | 0xECD2eE825ebCA4D6BEbD269FCA033229addf9f01 |
| USDC (FiatTokenV2_2) | 0xEFe0D421fD473564c9C9b0cDCeB194cF476D6AF5 |
| NaiveStakingRegistry | 0xd51c04d7a0b01124e84de152f4e56d9eecb22d2f |

  WETH9, Permit2, Uniswap v4 and Railgun are also deployed. Addresses can change on a reset. ([sidecar deployments/devnet.md](https://github.com/forshtat/mempool-workshop-sidecar/blob/HEAD/deployments/devnet.md), [devnet docs](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/devnet.md))
- Life of a tx: `eth_sendFrameTransaction` goes to the sidecar, which makes one `ethrex_simulateFrameTransaction` call with tracing and enforces the rules per role. The sidecar then gossips the tx over libp2p and relays it through the unauthenticated `ethrex_submitPrivilegedFrameTransaction`. Sending a type-0x06 tx straight to ethrex with `eth_sendRawTransaction` applies the canonical rules instead. ([devnet docs](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/devnet.md))

**Second alt-mempool-team devnet (EIP-7906)**
- Chain 3151908, `ethrex-hegota-devnet`, used for the EIP-7906 assertions workshop. It adds a POST_TX frame mode (mode 3; the EIP now calls it ASSERT) with TXTRACE and EVENTDATACOPY, and uses a different payload layout with 11 items. ([hegota-support README on npm](https://www.npmjs.com/package/@forshtat/hegota-support))

**Official Bogota devnets (ethpandaops)**
- bogota-devnet-1 is the second frames devnet. It covers EIP-8141 at spec `af3a7802` plus EIP-8250, EIP-8272 and EIP-7906.
  - Validating EL clients at genesis: geth (`ethpandaops/geth:bogota-devnet-1`), reth and ethrex, all passing every EIP and finalizing in kurtosis.
  - Nethermind is pending. Besu fails: it lacks the 8250 access cost and the 8272 and 7906 changes. Erigon and nimbus-eth1 do not participate.
  - Known issue: Nethermind accepts frame txs over MAX_VERIFY_GAS into its public mempool.

([bogota-devnet-1 spec](https://notes.ethereum.org/@ethpandaops/bogota-devnet-1))
- Its endpoints are https://rpc.bogota-devnet-1.ethpandaops.io, https://faucet.bogota-devnet-1.ethpandaops.io and the Dora explorer at https://dora.bogota-devnet-1.ethpandaops.io. My probe on 2026-10-26 returned chainId 0x1a38c5b87 (7038851975) and `Geth/v1.17.6-unstable-8dfba15f`. Devnet-0 (frames-devnet-0, genesis 2026-09-24) was torn down on 2026-10-15. ([bogota-devnets repo](https://github.com/ethpandaops/bogota-devnets), [landing page](https://bogota-devnet-1.ethpandaops.io/))
- On frames-devnet-0, geth, nethermind and reth agreed on consensus, but geth's JSON-RPC dropped the `frames`, `frameReceipts` and `payer` fields and reported a wrong receipt status. ([geth issue #35783](https://github.com/ethereum/go-ethereum/issues/35783))
- The ethpandaops repos were renamed: frames devnets became bogota-devnet-N and FOCIL devnets became heze-devnet-N (2026-10-26). spamoor has `frametx` and `frametx-fuzz` scenarios, and Dora indexes frame txs. ([cartographoor PR #120](https://github.com/ethpandaops/cartographoor/pull/120), [bogota-devnet-1 spec](https://notes.ethereum.org/@ethpandaops/bogota-devnet-1))

**Client implementation status**
- Geth: a dedicated frame-tx subpool implementing the EIP-8141 public mempool rules was merged on 2026-10-09 (lightclient). It is stricter than the EIP: it rejects nested out-of-gas, reads of an earlier frame's gas used, and 7702-delegated factories. It also notes that a rejection costs about 4 ms of EVM work. ([geth PR #35891](https://github.com/ethereum/go-ethereum/pull/35891))
- Nethermind: frame txs with 8250, 8272 and blobs merged (PR #12526). A default-off MATCHA-style policy is in PR #13619. ([PR #12526](https://github.com/NethermindEth/nethermind/pull/12526))
- Reth: EIP-8250 keyed nonces are an open PR (#27528). The earlier frame-support PR #27153 is closed, and reth runs on the Bogota devnets from the ethpandaops branch. ([reth PR #27528](https://github.com/paradigmxyz/reth/pull/27528), [bogota-devnet-1 spec](https://notes.ethereum.org/@ethpandaops/bogota-devnet-1))
- Besu: draft PR #11736 adds the 0x06 model and codec, but the decoder is not registered yet. ([besu PR #11736](https://github.com/besu-eth/besu/pull/11736))
- Erigon: open PR #25243 (2026-10-26) replaces RIP-7560 with 8141 frames plus 8250 at bogota-devnet-1 level. ([erigon PR #25243](https://github.com/erigontech/erigon/pull/25243))
- Ethrex: many 8141 PRs upstream (`lambdaclass/ethrex`). The ERC-7562 tracer and the `ethrex_*` simulate and submit methods live in the forshtat fork. ([ethrex PR search](https://github.com/lambdaclass/ethrex/pulls?q=8141))
- Execution-specs: EIP-8141 implementation and tests are in open PR #3878, with test release `tests-bogota-devnet@v1.1.0`. ([execution-specs PR #3878](https://github.com/ethereum/execution-specs/pull/3878))

### Inferences
- For the prize, the qualifying artifact is a frame tx accepted by the sidecar on the hackathon devnets, visible on altmempoolexplorer.forshtat.com or explorer.altmempool.wtf. The ethpandaops Bogota devnet is useful only for cross-checking canonical-mempool behaviour across clients, because its client pools apply the strict EIP-8141 rules and do not speak ERC-8421.
- Expect devnet1-3.altmempool.wtf to come up at the event, probably running the newer layout with keyed nonces and recent roots. Ask Pierre or Alex on site which `hegota-support` profile matches them before writing encoders.
- The live gateway's `validationGasLimit` (10M) and `minUnstakeDelay` (0) differ from the ERC-8421 draft (1M staked, 86,400 s). The effective budgets on the devnet must therefore be probed empirically rather than assumed.

### Gaps
- No public chain ID, faucet URL or explorer URL was available for devnet1, devnet2 or devnet3.altmempool.wtf before the event.
- The ETHGlobal Mumbai event dates were not shown on the prize page and could not be confirmed.
- The ethrex fork's exact divergences from EIP master are recorded only in `hegota-support` profile notes and the fork's `docs/eip-*.md` (not read).

## Q3. What SDK support exists (viem, ethers, alloy, permissionless.js), and what is missing for developers?

### Takeaway
No released JS SDK supports frame transactions. viem's EIP-8141 stack (jxom, PRs #5118, #5119 and #5121) was developed and then closed without merging into main; only a preview build exists. ethers and permissionless.js have nothing. Alloy (Rust) has a `TxEip8141` type and helpers merged, with alignment to bogota-devnet-2 in progress. The working toolkit for the alt-mempool devnet is `@forshtat/hegota-support` 0.0.1, published on 2026-10-25. It provides a profile-driven TypeScript codec, signing and RPC helpers on top of viem, and `HegotaSupport.sol`, which exposes the frame opcodes to Solidity through Yul helper contracts.

### Cited Findings
**viem**
- PR #4486 (ch4r10t33r) was closed on 2026-09-29 "in favor of #5118". jxom's PR #5118 (codecs, with a docs preview) was closed unmerged on 2026-09-30. #5119 (RPC) and #5121 (sign and send) merged only into the #5118 branch. A preview build is installable with `npm i https://pkg.pr.new/viem@5118`. ([viem PR #5118](https://github.com/wevm/viem/pull/5118), [viem PR #4486](https://github.com/wevm/viem/pull/4486))
- My own check: the published viem 2.57.11 (2026-10-24) and 3.0.0-next.14 tarballs contain no `eip8141` or `frameReceipts` strings. ([viem on npm](https://www.npmjs.com/package/viem))

**Other SDKs and tools**
- GitHub issue search returns zero hits for "8141" in pimlicolabs/alto, alchemyplatform/rundler, eth-infinitism/bundler, pimlicolabs/permissionless.js and ethers-io/ethers.js (my search, 2026-10-26). ([GitHub search example](https://github.com/pimlicolabs/permissionless.js/issues?q=8141))
- Alloy: PR #4280 (EIP8141_TX_TYPE_ID and helpers) is merged. Open: #4443 (align with bogota-devnet-2: total fee budget, length-committed witnesses, 8250 rules) and #4282 (RPC types). ([alloy PR #4443](https://github.com/alloy-rs/alloy/pull/4443), [alloy PR #4280](https://github.com/alloy-rs/alloy/pull/4280))
- Execution-apis PR #860 (frame receipt fields) is closed unmerged. The JSON-RPC shapes are not standardized yet. ([execution-apis PR #860](https://github.com/ethereum/execution-apis/pull/860))

**@forshtat/hegota-support**
- Exports `/tx` (build, encode, decode, hash, sign), `/rpc` (`toWire`, `rpc()`, `explainRejection()`, which maps node errors to rule families), `/profiles` and `HegotaSupport.sol`. It covers EIPs 8141, 8250, 8272 and 7906. The README says "every devnet implements a different revision, so everything here is parameterised by a profile". Profiles: `ethrex-eip8141-tracer` (chain 1337, 9-item payload) and `ethrex-hegota-devnet` (chain 3151908, 11 items, adds POST_TX). ([npm @forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support))
- Chain-1337 envelope in the profile: `[chainId, nonceKeys, nonceSeq, sender, frames, signatures, fees, blobVersionedHashes, recentRootReferences]`. The README example uses `fees: { maxFeePerGas }`, not the newer `max_fee` budget. ([npm @forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support))
- Known divergences recorded in the package:
  - The devnets carry a top-level `recent_root_references` field, which current EIP-8272 does not have.
  - Predeploys sit at 0x...8250 and 0x...8272 instead of the EIP addresses.
  - ethrex answers TXPARAM 0x06 (not in the EIP) with max cost.

([npm @forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support))
- Opcode verification status in the package:
  - On chain 1337 (ERC8421_WORKSHOP), only APPROVE and SIGPARAM were verified on the devnet. TXPARAM, FRAMEDATALOAD, FRAMEDATACOPY, FRAMEPARAM and SIGDATACOPY come "from the EIP text" and "may differ from what the client implements".
  - On chain 3151908, SIGDATACOPY (0xb5) halts.
  - Forge and Hardhat cannot execute these opcodes, so the opcodes are tested only on a devnet.

([npm @forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support))

**Sidecar RPC surface**
- `eth_sendFrameTransaction` (JSON tx).
- `eth_estimateFrameTransactionGas`, which returns per-frame `{execution, state}`.
- `eth_getFrameTransactionByHash` and `eth_getFrameTransactionReceipt`, which return `frameReceipts` and `payer`.
- `skandha_frameTransactionStatus` (New, Pending, Submitted, OnChain, Reverted and so on), `skandha_subscribe` (WebSocket) and `skandha_explorer_*`.
- `debug_bundler_*` admin methods, open on the public devnet.
- On ethrex: `ethrex_simulateFrameTransaction(rawTx, block, {trace:true})`, which returns `valid`, `prefixShape`, `payer`, `maxCost`, `violation` and a full `erc7562Trace`. `debug_trace*` supports `erc7562FrameTracer`.

([alt-mempool docs: RPC methods](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/reference/rpc-methods.md))

**Community tooling and docs**
- `polus-arcticus/awesome-frames` is a Hardhat v3 and rocketh playground with a standalone viem-based encoder. It does not hook into viem's serializer extension point. It also says geth PR #33954 was closed in favour of a from-scratch implementation. ([awesome-frames](https://github.com/polus-arcticus/awesome-frames))
- The docs site states that it was generated from source with AI and marks conflicts "(TBD)". It also notes the sidecar has no plugin mechanism for custom rule sets, and that registering a mempool topic is undocumented. ([docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md), [docs: custom mempool](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/custom-mempool.md))

### Inferences
**What is missing (each item is a candidate tooling build)**
- A viem `chain.serializers` and `sendFrameTransaction` action extension that wraps `hegota-support` profiles. It would include ERC-8421-aware prefix construction (`pre_verify`, `pay`, `post_op`) and gas estimation through `eth_estimateFrameTransactionGas`.
- An ethers v6 plugin.
- A permissionless.js-style "smart account" abstraction for frame accounts.
- A wallet-side frame decoder that warns that APPROVE_EXECUTION authorizes every later SENDER frame.
- Local testing: no Forge or Hardhat support for the opcodes. A revm or ethrex-backed local node, or a Foundry fork mode pointed at the devnet, would be high-value.
- A rule-engine library that takes `erc7562Trace` output and reports ERC-8421 rule IDs (BUDGET-010, STORAGE-021, ...). This would be a client-side "admission simulator" independent of the sidecar.

### Gaps
- I could not confirm whether viem plans to land #5118 in v3 or why it closed. No closing comment was found in the fetched data.
- I did not check Python (web3.py or eth-account) or Go client libraries for 8141 encoders.

## Q4. What are the known DoS concerns and open research questions about the alt mempool rules?

### Takeaway
The central threat is **mass invalidation**: many admitted txs that one cheap state change turns invalid, wasting unpaid node work. Two things are actively debated. First, how big the verification budget should be: 100k is too small for ZK privacy (the floor is about 212k), and Nethermind argues that gas is a poor proxy for node work. Second, how to admit several txs from a shared sender: ERC-8421 counts seen and included txs, while MATCHA spends "width" earned from finalized gas. Concrete open issues include ecrecover becoming code-dependent under EIP-8151, stake without slashing, the `pre_verify` failure footgun, default-code payers draining their balance, unpaid validation at block building, and FOCIL and VOPS eligibility of keyed-nonce txs.

### Cited Findings
**Threats named in ERC-8421**
- It defines the mass invalidation attack. It calls the attack non-viable only if invalidating N txs costs the attacker N*X for a sufficiently large X. Stake and reputation are its answer, and stake is never slashed. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- A staked entity can still cause "`BAN_SLACK * MIN_INCLUSION_RATE_DENOMINATOR / 24` invalid transactions per hour, plus whatever throttling then allows... a rate limit, not a guarantee". ([ERC-8421 Security Considerations](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- Other risks it lists:
  - A default-code payer that moves its balance invalidates all of its sponsored pending txs, up to the balance it showed.
  - A `pre_verify` frame that reverts on chain does not invalidate the tx, so the payer bears the loss if its approving frame ignores the status.
  - Correctness of the staking registry is critical.
  - A node that does not filter which txs to revalidate opens a load attack proportional to the size of its mempool.

([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))

**Threats named in EIP-8141**
- Validation that reads `block.timestamp` outside the expiry verifier becomes invalid with no on-chain action.
- Deploy-frame front-running.
- Explicit-sender state-read amplification: invalid txs that name arbitrary senders force state reads.
- Cross-frame visibility: paymasters can see SENDER frame data before approving.
- ARBITRARY-signature malleability.
- One approval authorizes *all* later SENDER frames.
- Unpaid validation at block building: a producer SHOULD bound repeated build attempts for a non-approving prefix.

([EIP-8141 Security Considerations](https://eips.ethereum.org/EIPS/eip-8141#security-considerations))

**Verification-budget debate**
- mmjahanara (an ERC-8421 co-author, 2026-09-02) shows that the minimum budget for a privacy spend is 211,828 gas and recommends raising MAX_VERIFY_GAS to at least 250k. ([ethresear.ch: minimum validation budget for privacy](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- AnkushinDaniil (Nethermind) replied that gas is a poor proxy for the DoS surface. The worst adversarial payload is a ceiling packed with secp256k1 signature entries, and the prefix simulator is serialized behind a single lock while signature checks are not. He proposed redefining MAX_VERIFY_GAS as a shared *floor* that every node must propagate, with each node allowed local headroom above it. ([same thread](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- Geth's frame subpool also throttles peers whose frame txs fail validation, since each rejection can cost about 4 ms of EVM work. ([geth PR #35891](https://github.com/ethereum/go-ethereum/pull/35891))

**Shared-sender admission (MATCHA vs ERC-8421)**
- MATCHA (Thomas Thiery, with Vitalik and Toni, 2026-09-08) is a local policy for admitting several keyed-nonce txs from one sender. Each extra admission spends "width", which is earned only from gas used in finalized blocks and is never refunded. It names a fake privacy app as the attack: one setting change invalidates the whole set, the attacker restores it, and repeats. It also covers squatting a shared sender's capacity with low-fee valid txs, and relies on FOCIL for frame txs (EIP-8369) as a deterrent. ([ethresear.ch: MATCHA](https://ethresear.ch/t/mempool-account-transaction-capacity-from-historical-activity-matcha/25949))
- Forshtat describes ERC-8421 reputation as similar to MATCHA, with the unit of accounting as the main difference: txs seen versus gas used. ([Magicians ERC-8421](https://ethereum-magicians.org/t/erc-8421-frame-transaction-alternative-mempools/29800))

**Spec issues and smaller open questions**
- EIP-8151 (CFI for Hegota) makes `ecrecover` return empty output when the recovered address has regular code. Combined with EIP-8298 SETCODEFROM, a prefix that recovers a non-sender address would depend on third-party mutable code. Read literally, the canonical rules would reject every such prefix. This was raised on 2026-10-21 and is still open. ([Magicians #179](https://ethereum-magicians.org/t/frame-transaction/27617/179))
- ERC-20 paymaster example: if `transfer(sponsor, fees)` fails, the user's call still runs for free. An atomic batch alone does not fix this, so a transfer-check frame is needed. Tokens that return false instead of reverting also need handling. ([Magicians #178](https://ethereum-magicians.org/t/frame-transaction/27617/178), [#180](https://ethereum-magicians.org/t/frame-transaction/27617/180))
- Payer griefing by padding ARBITRARY signature bytes, which are priced but were not committed. This was fixed by committing to lengths (merged 2026-10-22). ([Magicians #167](https://ethereum-magicians.org/t/frame-transaction/27617/167), [EIPs commit log](https://github.com/ethereum/EIPs/commits/master/EIPS/eip-8141.md))
- VERIFY frames must not SSTORE so that builders can strip and aggregate them, for example large PQ signatures. That rationale conflicts with state-writing approval logic, which ERC-8421 moves into `pre_verify`. ([Magicians #152](https://ethereum-magicians.org/t/frame-transaction/27617/152))
- Keyed nonces used as nullifiers grow VOPS state that stateless nodes and FOCIL includers must hold. A Bloom-filter design, with a nonce-type tag byte, is proposed to curb this. ([ethresear.ch: Bloom filters and keyed nonces](https://ethresear.ch/t/bloom-filters-and-keyed-nonces/25950))
- EIP-8369 "VOPS Profiles for FOCIL Eligibility" (Draft, 2026-08-05) defines which frame txs are FOCIL-eligible. ([EIP-8369](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8369.md))

**Rule-set divergence**
- The landing page uses 250k unstaked and 2.5M staked budgets, while ERC-8421 says 100k and 1M. The landing page was updated after review and the draft was not. ([docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md))
- The sidecar implements the earlier PR #6 rules:

| Rule | Sidecar | ERC-8421 draft |
|---|---|---|
| Linear txs per sender | 4 | |
| Keyed txs per sender | no cap | |
| Pending txs per `(sender, key)` | | 4 |
| Pending txs per unstaked sender | | 64 |
| Unstake delay | 0 | 86,400 s |

([docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md))

### Inferences
- From the constants: 50 * 10 / 24 is about 21 invalidations per hour per staked entity before the ban threshold bites. Combined with MIN_STAKE of about $1000 and no slashing, an attacker with k staked entities gets roughly 21k free invalidations per hour while their capital sits locked but is recoverable. Quantifying that, and comparing it to MATCHA's width model, would be a strong "breaking the rules" deliverable.
- The ASSOC-010 rule ("a slot is associated with A if its value equals A") and the ASSOC-020 offset window (n up to 128) look like plausible surfaces for constructing shared-dependency slots across many senders. This is speculative and needs testing against LOCAL-020.
- Because the rules behave differently across the sidecar, the ERC-8421 draft, the landing page, the geth subpool and Nethermind (which over-admits above MAX_VERIFY_GAS), a differential admission fuzzer is a natural research tool.
- Alt-mempool txs that need a staked entity or more than 100k of validation may never be FOCIL-protected. That would weaken the censorship-resistance pitch for privacy unless the canonical budget rises. This depends on the final EIP-8369 text, which I did not read.

### Gaps
- I did not read the full EIP-8369 text, so I cannot say whether alt-mempool-only txs are excluded from FOCIL eligibility.
- No published benchmark of sidecar admission latency per gas was found.
- The `MAX_VERIFY_GAS` floor PR mentioned by Nethermind was not located.

## Q5. How do ERC-4337 bundlers and paymasters map onto frame transactions, and what existing 4337 tooling could be ported?

### Takeaway
ERC-8421 is explicitly designed to keep the ERC-7562 use cases: each 4337 concept has a direct frame analogue (table below). The reference alt-mempool node is already a port of Etherspot's Skandha bundler. It relays each frame tx as is instead of batching it, and keeps reputation, staking and libp2p gossip. No other bundler (Alto, Rundler, the Infinitism bundler) or SDK (permissionless.js) has started.

| ERC-4337 | Frame transactions |
|---|---|
| `validateUserOp` | `self_verify` / `only_verify` frame |
| `validatePaymasterUserOp` | `pay` frame, optionally preceded by `pre_verify` for state writes |
| `postOp` | `post_op` DEFAULT frame after the prefix |
| `initCode` | `deploy` frame |
| EntryPoint | the 0xaa sentinel |
| userOpHash | TXPARAM 0x08 |
| 2D nonce | EIP-8250 keyed nonces |
| EntryPoint stake | `IStakingRegistry` |
| handleOps bundles | gone |

### Cited Findings
- ERC-8421 says it "maintains a full backward compatibility with use cases that existed in ERC-4337, like autonomous ERC-20 Token Paymasters, privacy pool withdrawals and more". It says a contract written against ERC-7562's rules "needs no change in its core validation architecture". The interfaces change: `validateUserOp` and `validatePaymasterUserOp` become `self_verify`/`only_verify` and `pay` frames, and `initCode` becomes the `deploy` frame. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- The `pre_verify` rationale: 4337 validation may write storage under the associated-storage and stake rules, for example a paymaster pulling ERC-20 during validation. Because VERIFY frames are static, the same guarantee needs a non-static frame that runs first. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- EIP-8141's per-frame state-gas budgets replace 4337's postOp gas reservation inside the EntryPoint: "here the reservation is part of the transaction". FRAMEPARAM and TXPARAM expose state budgets so that a paymaster can check them before approving. ([EIP-8141 Rationale](https://eips.ethereum.org/EIPS/eip-8141))
- The sidecar is a fork of Etherspot's Skandha. It has "no EntryPoint contract and no eth_sendUserOperation". Its config's entry points and mempool IDs must be the 0x...aa sentinel. It keeps the 4337-era options for reputation, `whitelistedEntities`, `minStake` and bundle intervals. ([sidecar README](https://github.com/forshtat/mempool-workshop-sidecar))
- The ethrex fork adds an `erc7562FrameTracer` for `debug_trace*` and returns an `erc7562Trace` from `ethrex_simulateFrameTransaction`, so 4337-style trace validation carries over. ([docs: RPC methods](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/reference/rpc-methods.md))
- The workshop shows the ERC-4337-style flow end to end:
  1. Deploy a wallet whose fallback checks `sigparam(0, RESOLVED_SIGNER) == owner` and then calls `approve(EXECUTION_AND_PAYMENT)`.
  2. Send a tx that violates the canonical rules and see it rejected.
  3. Stake through the registry and see the same tx admitted by the alt mempool.
  4. Burn reputation and see it rejected.
  5. Use keyed nonces and recent roots.

([workshop README](https://github.com/forshtat/mempool-workshop), [ExampleWallet.sol](https://github.com/forshtat/mempool-workshop/blob/HEAD/contracts/src/ExampleWallet.sol))
- GitHub search found no EIP-8141 issues or PRs in pimlicolabs/alto, alchemyplatform/rundler, eth-infinitism/bundler or pimlicolabs/permissionless.js (2026-10-26). ([alto search](https://github.com/pimlicolabs/alto/issues?q=8141))

### Inferences
**Portable 4337 assets (inference; each would need a frame-tx adapter)**
- Pimlico- or Circle-style ERC-20 paymasters, as `pre_verify` pull plus `pay` approve plus `post_op` refund.
- Verifying (signature) paymasters. These map naturally to the canonical paymaster or to a staked custom paymaster.
- The 4337 validation logic of Safe, Kernel, Nexus and Coinbase Smart Wallet, moved into a VERIFY-frame fallback.
- ERC-7562 tracers and rule checkers from the Infinitism bundler, adapted to `erc7562Trace`.
- UserOp explorers (jiffyscan-like), adapted to `skandha_explorer_*` and `frameReceipts`.
- permissionless.js-style account abstractions over `hegota-support`.

**Differences that break naive ports**
- There is no EntryPoint deposit; the payer's ETH balance is reserved directly.
- Approval is all-or-nothing for later SENDER frames.
- The paymaster must check `pre_verify` status itself.
- Gas is two-dimensional and declared per frame.
- Forge cannot run the opcodes, so 4337 test suites will not run locally.

### Gaps
- No published side-by-side gas comparison of the same account under 4337 and frame txs was found. The SPHINCS- repo has one data point, below.
- No list of which 4337 paymaster code bases have been audited for frame use.

## Q6. Which privacy use cases specifically need the alt mempool, and what has already been built?

### Takeaway
ZK-based privacy (Tornado- or Railgun-style withdrawals, shielded pools) cannot fit the canonical 100k budget: a BN254 Groth16 pairing check alone costs about 181k. The minimum single-note spend, with every optimization applied, is 211,828 gas. The privacy design that frame txs enable has four parts:
- The pool contract is a shared sender and payer.
- EIP-8250 keyed nonces act as the nullifiers.
- EIP-8272 recent roots replace the root SLOAD.
- The proof travels in an ARBITRARY signature entry with the sig hash as a public input.

That design needs the alt mempool for two reasons: the verification budget (unless the canonical cap rises above 250k) and multiple pending txs per shared sender. The chain-1337 devnet already hosts real Tornado Cash and Railgun bytecode, and the ERC-8421 co-authors have published a benchmark repo and a minimal shielded pool prototype.

### Cited Findings
**Gas budget for ZK privacy (mmjahanara, 2026-09-02)**
- "Privacy applications like Tornado Cash and RAILGUN may be able to use EIP-8141 frame transactions to drop their off-chain relayers and have strong censorship resistance guarantees." That requires public-mempool propagation, which the 100k cap prevents. ([ethresear.ch 25889](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- Minimum costs, with one public input and all optimizations:

| Shape | Nullifiers | Gas |
|---|---|---|
| Tornado withdrawal or RAILGUN 1x2 | 1 | 211,828 = 190,628 verification + 20,000 nullifier + 1,200 overhead |
| RAILGUN 2x2 | 2 | 231,828 |
| RAILGUN 8x2 | 8 | 351,828 |
| MAX_NONCE_KEYS | 16 | 511,828 |

  "Nothing fits in 100,000". Recommended caps: 250k covers every common shape, and 400k covers RAILGUN 8x2. ([ethresear.ch 25889](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- Techniques from the same post:
  - Keyed nonces replace the nullifier SSTORE (20,000 vs 22,100).
  - Recent roots remove the root-history read (RECENTROOTREFLOAD costs 3 gas).
  - Note insertion and transfers move into SENDER frames (for RAILGUN, 503,472 gas of Poseidon insertions move out of the cap).
  - The sig hash becomes a public input, which removes the recipient, relayer, fee and refund inputs. The proof must sit in an ARBITRARY sig entry to avoid circularity.
  - All public inputs fold into one hash (each extra input costs 6,645).
  - The verifying key is hardcoded in code.

  ([ethresear.ch 25889](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- A verifying key stored in contract storage is a sender-storage read. Keyed-nonce concurrency for a shared sender requires a validation trace with no sender storage reads, and RAILGUN reads its key from storage (64,288-88,393 gas of cold slots). ([ethresear.ch 25889](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- Because the sig hash covers the fee fields, a pending privacy tx cannot be fee-bumped without a new proof. The post's Appendix B proposes a fix. ([ethresear.ch 25889](https://ethresear.ch/t/eip-8141-and-minimum-required-validation-budget-for-privacy-applications/25889))
- Benchmark code: [mmjahanara/frame-transactions-privacy-protocols-benchmark](https://github.com/mmjahanara/frame-transactions-privacy-protocols-benchmark) (linked from the post).

**Existing prototypes and on-devnet contracts**
- `Robert-MacWha/minimal-shielded-pool` (Robert MacWha is an ERC-8421 co-author) is an immutable native-ETH shielded pool on the ethrex Hegota testnet using 8141, 8250 and 8272, marked research only.
  - The pool is the sender **and payer** of every spend.
  - The two nullifiers are the nonce keys at sequence 0.
  - Frames: `VERIFY(0x...8272, root tuple)`, then `VERIFY(pool, proof)`, which checks the proof and frame layout and approves execution and payment, then `SENDER(pool, settle)`.
  - It uses hybrid statement compression (ePrint 2025/1500) to reduce the public signals to 3.

([minimal-shielded-pool](https://github.com/Robert-MacWha/minimal-shielded-pool))
- The alt-mempool docs describe the privacy use case as a shared sender with a keyed nonce per user, often derived from the nullifier, and a proof check of about 200k gas that needs more than the canonical 100k. A staked sender has no sender-wide pending cap while ACTIVE (LIFECYCLE-030). ([docs: use cases](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/use-cases.md))
- The real Tornado Cash 0.1 ETH pool, with its Hasher and Verifier, and Railgun are deployed on chain 1337 (addresses in Q2). ([sidecar deployments](https://github.com/forshtat/mempool-workshop-sidecar/blob/HEAD/deployments/devnet.md))
- The ERC-8421 rationale names "shielded pools with Merkle roots as paymasters" and "an ERC-20 token paymaster with budgeting code and its own storage" as use cases the canonical mempool cannot host. ([ERC-8421](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md))
- trebor (Kohaku) said on Magicians that he has been building "alternative privacy-focused paymasters for Kohaku" that need more paymaster flexibility than the canonical rules allow. ([Magicians #157](https://ethereum-magicians.org/t/frame-transaction/27617/157))
- EIP-8250 keyed nonces: up to 16 keys per tx. NONCE_MANAGER sits at 0x8250968C12e01A19d6F667b9B2F3b3A4d0e51cB7 in the EIP; the chain-1337 devnet uses 0x...8250. Status Draft, CFI for Hegota. On bogota-devnet-1, each non-zero key adds a KEYED_NONCE_ACCESS_COST of 12,100 gas to intrinsic gas. ([EIP-8250](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8250.md), [bogota-devnet-1 spec](https://notes.ethereum.org/@ethpandaops/bogota-devnet-1))
- EIP-8272 recent roots: RECENT_ROOT_ADDRESS at 0x8272D9679689Ea2f307140CdF9002D27dC00Ffff, an 8,192-entry ring buffer with an 8,191-slot usable window, and up to 16 references per tx. On chain 1337 the references are a top-level tx field (`recentRootReferences`), checked against the slot window before simulation. ([EIP-8272](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8272.md), [docs: keyed nonces](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/keyed-nonces.md))
- Observed on the devnet: a VERIFY frame with 7 nonce keys ran out of gas at 30,000 and succeeded at 80,000. ([docs: keyed nonces](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/keyed-nonces.md))

### Inferences
**Relayerless gas payment from a shielded pool**
- The pool itself is the payer (`APPROVE_EXECUTION_AND_PAYMENT` from its ETH balance), and the fee is a public amount deducted from the note in settlement (the pattern in minimal-shielded-pool). This removes the relayer entirely. The pool's balance is shared, so the mempool's solvency reservation applies.

**Tornado withdrawal through a staked paymaster, without modifying Tornado (my design, not found in sources)**
- The user's fresh default-code EOA runs `only_verify`, using a SECP256K1 sig at index 0 with flags 0x2.
- A staked paymaster's `pay` frame staticcalls the deployed Tornado Verifier on the proof and checks `isKnownRoot` and `!isSpent`. Reading non-entity storage is allowed for staked entities (STORAGE-032). It approves payment.
- A SENDER frame calls `Tornado.withdraw(proof, root, nullifierHash, recipient, relayer=paymaster, fee)`, so the paymaster recovers its fee inside Tornado.
- Validation cost would be roughly the 244k verifier plus overhead, above 100k, so it needs the staked 1M budget.
- Caveat: Tornado's own `withdraw` re-verifies the proof in the SENDER frame, so the tx pays verification twice.

**Privacy Pools and Railgun**
- Privacy Pools (0xbow) style ASP-gated withdrawals map the same way. The ASP root could come through EIP-8272 recent roots instead of a storage read.
- Railgun on the devnet is a heavier target: Poseidon insertions, a storage-held verifying key, and multi-nullifier spends.

### Gaps
- Railgun's devnet address and whether its relay adapter works on chain 1337 were not checked; the deployments file was truncated after USDC.
- I found no Privacy Pools (0xbow) deployment on the devnet.
- I did not check whether `sha256`, `ecPairing` and the other precompiles needed by Groth16 verifiers behave normally on the ethrex fork. Precompiles 0x01-0x11 are allowed by CALLING-040.

## Q7. What would a post-quantum smart wallet on frame transactions require, and what PQ verifiers already exist in Solidity, at what gas cost?

### Takeaway
A PQ wallet on frame txs puts the PQ signature in an ARBITRARY signature entry with empty `msg`, so it signs the canonical sig hash. Its VERIFY frame reads the bytes with SIGDATACOPY (0xb5), verifies them in EVM against a key held in its own storage or code, and calls APPROVE. Today's best Solidity verifiers cost between about 94k-127k (SPHINCS- hash-based variants) and 450k-1.2M (Falcon and ML-DSA lattice schemes). All of them exceed or sit at the edge of the 100k canonical and unstaked budgets, so a **staked** sender is needed under the ERC-8421 draft (1M). NIST ML-DSA-44 (about 1.2M) does not even fit that. The main practical risk on the devnet is that SIGDATACOPY is unverified on chain 1337 and halts on chain 3151908.

### Cited Findings
**Spec requirements**
- EIP-8141's motivation lists "a native off-ramp from the elliptic curve based cryptographic system... to post-quantum (PQ) secure systems" and native key rotation. Bespoke schemes "must place their witness bytes in an ARBITRARY signature entry rather than in frame data when the witness signs the canonical transaction signature hash". ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Variable-length signature outputs must be padded to a length fixed in advance because the sig hash commits to the length. Verifiers should reject non-canonical padding and unused bytes, or the tx hash becomes malleable. ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141))
- Elided ARBITRARY bytes are charged at the floor rate of 4 tokens per byte at STANDARD_TOKEN_COST 4, i.e. 16 gas per byte, in intrinsic gas. Only the 100-gas "validation" of an ARBITRARY entry counts against MAX_VERIFY_GAS. ([EIP-8141 Gas Accounting](https://eips.ethereum.org/EIPS/eip-8141))
- The rationale sketches future "public key aliases" (`0xef02 || version || key_type || pubkey`, plus a PUBLISHPK opcode) for large PQ keys. These are not specified. ([EIP-8141 Rationale](https://eips.ethereum.org/EIPS/eip-8141))
- The authors' intent is that VERIFY frames stay static so builders can strip and aggregate them, "which is what allows VERIFY frames to carry large quantum signatures". ([Magicians #152](https://ethereum-magicians.org/t/frame-transaction/27617/152))
- The alt-mempool docs say PQ signatures run in plain EVM code without precompiles, at about 700k gas or more by the landing page's figure, and need a staked sender's higher budget. ([docs: use cases](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/use-cases.md))

**Existing Solidity verifiers and their costs**
- ZKNox ETHFALCON (MIT; updated 2026-10-21), main-branch benchmarks: NIST Falcon `verify` 3.9M, ETHFALCON (Keccak instead of SHAKE) 1.5M, EPERVIER (Falcon with recovery, like ecrecover) 1.6M. ([ETHFALCON](https://github.com/ZKNoxHQ/ETHFALCON))
- ETHFALCON experimental branches (`exp/pq-verifier-gas`, `exp/falcon1024`):

| Verifier | Execution gas |
|---|---|
| falcon_fast | 1,975,365 |
| falcon_turbo | 1,315,105 |
| falcon_fused | 726,900 |
| **falcon8 (NIST Falcon-512)** | **447,047** |
| **Falcon-1024** | **845,839** |

  As a plain tx, Falcon-512 totals about 500,400 gas: 447,047 execution, 32,320 calldata for 2,404 bytes, and 21,000 base. These verifiers use an external Keccak-f[1600] helper contract. ([ETHFALCON](https://github.com/ZKNoxHQ/ETHFALCON))
- ZKNox ETHDILITHIUM:

| Verifier | Branch | Gas |
|---|---|---|
| Dilithium (NIST ML-DSA) | main | 8.1M |
| ETHDilithium | main | 4.9M |
| ML-DSA-44 | `exp/packed-verifier` | 1,196,707 |
| ETHDilithium | `exp/packed-verifier` | 847,709 |
| ML-DSA-65 | `exp/packed-verifier` | 1.54M |

  Fireblocks' `evm-ml-dsa-verifier` measures 1,224,368 on ML-DSA-44. ZKNox says Dilithium's appeal is a simple signer for hardware wallets, and that it "is not feasible to reach the same cost as Falcon". ([ETHDILITHIUM](https://github.com/ZKNoxHQ/ETHDILITHIUM), [fireblocks-labs/evm-ml-dsa-verifier](https://github.com/fireblocks-labs/evm-ml-dsa-verifier))
- SPHINCS- (lfglabs, research prototype; Keccak in place of SHAKE, reduced signature budget):

| Variant | Signature | Pure verify | Total EIP-8141 frame tx on ethrex | ERC-4337 handleOps |
|---|---|---|---|---|
| C13 | 3,688 B | 105K | 188K | 293K |
| C7 | 3,704 B | 127K | 210K | 318K |
| C11 | 3,976 B | 116K | 202K | |
| C12 (vanilla SPHINCS+) | 6,512 B | 276K | | |
| SLH-DSA-SHA2-128-24 | 3,856 B | about 142K | | |
| SLH-DSA-Keccak-128-24 | 3,856 B | about 94K | | |

  The repo has frame-account wiring for some variants on ethrex. ([lfglabs SPHINCS-](https://github.com/lfglabs-dev/SPHINCS-), [ethresear.ch SPHINCS-](https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165))
- poqeth (ePrint 2025/091) implements WOTS+, XMSS, SPHINCS+ and MAYO verification on Ethereum with Keccak-256. It also proposes "Naysayer" (optimistic, fraud-proof) verification as more gas-efficient. ([poqeth](https://eprint.iacr.org/2025/091.pdf))
- sig.golf is a Yukon Research and EF competition for stateless hash-based PQ signatures with Lean security proofs, scored on signature size times verification cycles. ([Etherspot digest](https://dev.to/etherspot/erc-8421-rethinks-frames-mempools-siggolf-targets-post-quantum-signatures-eip-8430-splits-base-3c7d), [sig.golf](https://www.yukon.org/sig.golf))

**Devnet opcode status**
- On chain 1337, SIGDATACOPY in `HegotaSupport` is "from the EIP text" and unverified. On chain 3151908 the devnet "halts on 0xb5, even for a zero-length copy of an ARBITRARY signature", although SIGPARAM can read the length. ([npm @forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support))
- The EIP added SIGDATACOPY on 2026-08-18 "so that stack requirement for sigparam is static". The chain-1337 devnet pins an EIP revision from 2026-07-30, whose 2026-07-30 commit is titled "align SIGPARAM copy operand order with CALLDATACOPY". ([EIPs commit log](https://github.com/ethereum/EIPs/commits/master/EIPS/eip-8141.md), [workshop README](https://github.com/forshtat/mempool-workshop))

### Inferences
**Copy-mechanism risk on chain 1337**
- From the commit dates, the chain-1337 devnet probably exposes ARBITRARY bytes through a SIGPARAM copy variant rather than a separate 0xb5 opcode. Any PQ-wallet team should first deploy a probe contract that reads an ARBITRARY entry's bytes on the target devnet. Fallback options are the SIGPARAM-copy form, or putting the witness in VERIFY frame data while signing an explicit 32-byte `msg` computed over the other frames (more complex and more costly).

**Budget fit, using the sourced numbers**

| Verifier | Pure verify | Fits canonical / unstaked 100k? | Fits staked 1M? |
|---|---|---|---|
| SLH-DSA-Keccak-128-24 | about 94K | borderline once frame entry and helper calls are added | yes |
| SPHINCS- C13 | 105K | no | yes |
| Falcon-512 (falcon8) | 447K | no | yes |
| Falcon-1024 | 846K | no | yes, tight |
| ETHDilithium packed | 848K | no | yes, tight |
| NIST ML-DSA-44 | about 1.2M | no | no; only under the landing page's 2.5M |

**Calldata cost (outside the cap)**
- A 3,688 B SPHINCS- C13 signature costs about 59k intrinsic gas at 16 gas per byte. The 2,404-byte Falcon-512 call payload (signature plus NTT public key) is cheaper. Keeping the public key in the wallet's code or storage instead of the tx reduces intrinsic gas.

**Minimal concrete demo (about 36 h)**
1. Fork the lfglabs SPHINCS- frame account, or wrap ZKNox `falcon8` in a `HegotaSupport(Devnet.ERC8421_WORKSHOP)` wallet. Its fallback: read the sig hash with `txparam(SIG_HASH)`, copy the ARBITRARY bytes, call the verifier, then `approve(EXECUTION_AND_PAYMENT)`.
2. Deploy and fund it.
3. Stake it through the registry at 0xd51c04d7....
4. Submit `[self_verify, SENDER transfer]` through `eth_sendFrameTransaction`, using a JS or Python signer: ZKNox ships Python signers, and noble or the lfglabs tooling cover the others.
5. Show the canonical rejection (ethrex `eth_sendRawTransaction`, over 100k) next to the alt-mempool admission on the explorer.

**Possible extensions**
- A hybrid wallet that requires both ECDSA and PQ signatures.
- PQ key rotation in a SENDER frame.
- Stateful one-time WOTS or Lamport keys rotated per tx.
- An EPERVIER recovery-style address derivation.

### Gaps
- Signature and key sizes for Falcon-512, ML-DSA-44 and ML-DSA-65 were not fetched from FIPS 204 or the Falcon spec in this session.
- Whether the ZKNox experimental verifiers (external Keccak helper "bound by code hash") pass the alt-mempool trace rules was not tested. EXTCODEHASH on an existing contract should be allowed, but this is unverified.
- None of the gas numbers were re-measured on the ethrex fork, which uses the Amsterdam+ gas model (they were measured on Cancun or Sepolia EVM settings).
- An ETHGlobal Mumbai project "Lamport" reportedly targeted this same track. Its repo (`jhon0002/Lamp`) returned 404 on 2026-10-26, so its contents and outcome are unknown.

## Q8. What could a 2-3 person team build in about 36 hours? (prototype list with difficulty estimates)

### Takeaway
The strongest entries combine an "only the alt mempool makes this possible" demo (PQ wallet, privacy withdrawal, stateful paymaster) with visible proof: a canonical rejection and an alt-mempool admission of the same tx, shown on the explorer. Tooling entries (SDK, admission simulator, monitor) are lower risk and fill clear gaps. "Breaking the rules" entries can lean on the open debates in Q4.

### Cited Findings
- The prize offers $5,000 total (1st $2,500, 2nd $1,500, 3rd $1,000) and is open to all participants; each project can win at most one EF prize. The three build areas:
  1. Something only an alt mempool makes possible, such as verification budgets above 100k (PQ wallets, privacy protocols) or more flexible state access (ERC-20 or quota paymasters).
  2. Developer tooling (viem or ethers SDK, admission simulator, mempool monitoring).
  3. Breaking and improving the rules (DoS vectors, new rules, simulators, fuzzers).

  Qualification: a link to an admitted tx on the devnet explorer, or code that submits one, and the team must be able to explain the design and its trade-offs. Judging: creativity, usefulness, practicality, how well it works, and relation to the alt mempool. ([ETHGlobal Mumbai EF prizes](https://ethglobal.com/events/mumbai/prizes))
- Idea lists from the organizers: privacy protocols; stateful paymasters (token, quota, subscriptions, credits); keystore contracts; PQ crypto; ZK proof verification; custom mempool rules. Proof aggregation and mempool encryption are mentioned as possibilities. ([altmempool.wtf landing page](https://www.altmempool.wtf/), [docs: use cases](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/guides/use-cases.md))
- The workshop repo already provides a TypeScript frame-tx codec and builders, SponsorPaymaster, ExampleWallet and ViolatingWallet contracts, staking, a reputation cheat and admission debugging (`step_11_debug`). It has an AGENTS.md for AI agents and `--json` output for every step. ([workshop repo](https://github.com/forshtat/mempool-workshop))

### Inferences
Difficulty key for 2-3 people in about 36 h: **L** = done in under 12 h, leaving time for polish. **M** = fits 36 h with some integration risk. **H** = a stretch; plan a fallback.

**A. Only possible with the alt mempool**
1. **Falcon-512 PQ wallet (staked sender)** (M/H). Wrap ZKNox `falcon8` (447k) in a HegotaSupport wallet, using an ARBITRARY sig over the sig hash, and add a PQ key-rotation SENDER frame. Main risks: the SIGDATACOPY/SIGPARAM-copy opcode on the devnet, the external Keccak helper under the trace rules, and a JS/Python signer that matches ZKNox encodings.
2. **SPHINCS- or SLH-DSA hash-based PQ wallet** (M). This is the lowest-risk PQ path: lfglabs already wires frame accounts on ethrex, and verification costs 94-127k. Show that it fails the 100k canonical budget and passes as staked. Optional variant: a hybrid ECDSA plus SPHINCS- wallet requiring both.
3. **Stateful one-time-signature wallet (Lamport or WOTS+) with automatic key rotation** (L/M). The next key commitment is written in the SENDER frame; validation reads sender storage only. Tell the story of a cheap PQ wallet whose next key is committed in sender storage. Check prior art from ETHGlobal Mumbai first (the "Lamport" project, Q7 Gaps).
4. **Relayerless Tornado withdrawal through a staked paymaster on the replayed Tornado pool** (M). The paymaster's `pay` frame verifies the Groth16 proof through the deployed Verifier and reads `isKnownRoot` and `nullifierHashes` (STORAGE-032). It gets reimbursed through Tornado's `relayer`/`fee` parameters. Demo: deposit, then withdraw to a fresh EOA holding zero ETH.
5. **Native-AA shielded pool** (M/H). Fork `minimal-shielded-pool` onto the hackathon devnet profile and show several pending spends from one staked shared sender with keyed-nonce nullifiers. The canonical rule is one pending tx per sender. Add recent roots and, optionally, a fee paid from the note.
6. **ERC-20 gas paymaster with `pre_verify` pull** (M). Demo flow: `pre_verify` does `transferFrom` of USDC/USDT, `pay` checks FRAMEPARAM status and approves, and `post_op` refunds using FRAMEPARAM gas-used. Handle the Magicians #178 and #180 edge cases (failed transfer, false-returning tokens).
7. **Daily-quota, subscription or credits paymaster** (L/M). Per-user counters live in slots associated with the sender, increment in `pre_verify`, and the paymaster is staked. Pair it with an ERC-20 top-up or a sign-in-with-Ethereum allowlist.
8. **Keystore wallet** (M). The signing key or authorized-signer set lives in an external keystore contract under slots associated with the sender (STORAGE-021). Optionally deploy through a staked factory (STORAGE-022), or prove keystore state from another chain with recent roots (H).
9. **ZK-credential wallet or paymaster** (M/H). A Groth16 or Semaphore membership proof, at about 190-250k, gates execution or sponsorship ("sponsored gas for verified humans or group members"). It needs the staked budget.
10. **BLS-aggregated multisig account** (M). It uses the BLS12-381 precompiles (allowed range 0x01-0x11) for an N-of-M aggregate check above 100k. Verify the gas first.

**B. Developer tooling**

11. **viem extension `viem-frames`** (L/M). Profile-aware serializers, `sendFrameTransaction`, `estimateFrameGas` and `getFrameReceipt` actions. Prefix builders for canonical vs ERC-8421 shapes (`pre_verify`/`pay`/`post_op`), plus typed rejection decoding via `explainRejection`. Port the #5118 API surface onto `hegota-support`.
12. **ethers v6 plugin or Python (web3.py) encoder** (L). Same as 11, for other ecosystems.
13. **Admission simulator and linter** (M). Take a raw tx, call `ethrex_simulateFrameTransaction` with trace, and apply a local rule engine for EIP-8141 canonical, ERC-8421 draft and sidecar PR-6 rules. Print per-rule pass or fail with rule IDs and a suggested fix, with CLI and web UI modes.
14. **Budget and rules prober** (L). Automatically find the effective verification-gas, state-gas and pending-count limits each devnet enforces (canonical ethrex, sidecar, Bogota clients), then publish a compatibility matrix. This fills the documented landing-page vs draft vs sidecar discrepancies.
15. **Mempool and reputation monitor** (L/M). Dashboard over `skandha_subscribe`, `debug_bundler_dumpReputation` and `skandha_explorer_*`: per-entity seen/included, THROTTLED/BANNED transitions, payer `reserved_pending_cost`, and keyed-nonce lanes per shared sender.
16. **Frame-tx wallet decoder and signing UI** (M). Show the user every frame, its mode, its scope and its gas dimensions. Warn when an approval covers unchecked SENDER frames, or when a paymaster sees user data.
17. **Local dev environment** (H). Foundry/Hardhat plugin or revm-based node that runs the frame opcodes locally, which Forge cannot do today. Fallback (M): a Foundry script runner that deploys to the devnet and asserts on receipts.
18. **4337-to-frames adapter** (M). Wrap an existing ERC-4337 account (Safe, Kernel or SimpleAccount) or a verifying paymaster so the same validation code runs from a VERIFY-frame fallback. Show the gas difference.

**C. Breaking and improving the rules**

19. **Mass-invalidation fuzzer** (M). Generate prefixes that pass admission but share a hidden dependency (associated slots, BALANCE as a staked entity, default-code payer balance, `pre_verify` writes), then trigger invalidation and measure revalidation load and reputation effects on the sidecar. Base it on spamoor `frametx-fuzz` ideas.
20. **Staked-entity economics analysis** (L/M). Simulate the BAN_SLACK and THROTTLING dynamics (about 21 invalidations per hour per entity, decaying counters, no slashing) against MATCHA width. Propose parameter changes or an alternative "gas-weighted" reputation, with a written rule proposal.
21. **CPU-per-gas DoS benchmark** (M). Find prefixes that maximize node work per gas: many secp256k1 entries, MODEXP, pairing, cold EXTCODE* reads. Time admission on ethrex and the sidecar, and compare with the Nethermind argument that gas is a poor proxy.
22. **Differential admission tester** (M/H). Send the same corpus to the geth, reth and ethrex Bogota mempools and to the alt-mempool sidecar, and report divergences (Nethermind's over-admission is a known example).
23. **`pre_verify` footgun scanner** (L). Static or bytecode check that an approving frame reads FRAMEPARAM status of its `pre_verify` frame before APPROVE, plus an exploit demo against a naive paymaster.
24. **Custom alternative mempool** (H). Fork the sidecar, write a new ruleset document, and run it on its own IPFS-hash topic. Examples: a "PQ mempool" that verifies Falcon natively in TypeScript or Rust instead of EVM, an audited-contract allowlist mempool, or a privacy mempool with MATCHA-style width.
25. **EIP-8151 ecrecover dependency PoC or write-up** (L/M). Show how a prefix recovering a non-sender address becomes dependent on mutable state, and propose a mempool rule (Magicians #179).

**Practical notes**
- Use the `hegota-support` profile for the target devnet rather than the EIP master text.
- Budget at least 6M gas for contract deployments and at least 204,600 gas for transfers to new accounts.
- Keep stake above the gateway's `minStake` (0.01 ETH observed).
- Do not call `debug_bundler_clear*` or `set*` on shared devnets.

### Gaps
- Difficulty ratings are my estimates; I did not prototype any of them.
- Whether the judges weight "breaking the rules" research write-ups as highly as working demos is not stated beyond the listed criteria.
- Final hackathon devnet parameters (budgets, profile, faucet) will only be known on site.
