# ETHGlobal idea bank: EF tracks, CROPS, Whitechain

Working notes for picking a hackathon build. Status: brainstorm. Facts marked "verify" still need checking against primary sources. Deeper research notes will land in `research_notes/` and `reports/`.

## Prize tracks (Ethereum Foundation)

| Track | Pool | Summary |
|---|---|---|
| Best Use of Anon-RPC | $5,000 (1st $2,500) | An app, worker, or harness built around Anon-RPC |
| Best Use of the Frame Transaction Alternative Mempool | $5,000 (1st $2,500) | Build on EIP-8141 frame transactions and the ERC-8421 alt mempool |
| Best CROPS App | $3,500 (1st $2,000) | Any app, wallet feature, or dev tool where one CROPS property is the reason it exists |
| Best CROPS Upgrade to an Existing Project | $1,500 | Continuity Track only: add one CROPS property to an existing project |

Rules to remember:

- You can submit to several, but you are placed in only one EF prize.
- Anon-RPC apps must route RPC reads through Anon-RPC by default. Workers and harnesses need only a simple demo app.
- Anon-RPC judging: works end to end, UX, share of traffic through Anon-RPC, shippability, technical depth. Excluding some traffic on purpose (latency vs anonymity) is fine if the tradeoff is stated.
- Alt mempool: must show real usage, either a link to an admitted tx on the devnet explorer or code that submits one. Devnets, a faucet, and two team members are on site.
- CROPS App: public repo under an open-source license, README with a CROPS section, demo video of 3 minutes or less, no third-party analytics.

## Background

### CROPS

From the EF Mandate (March 2026): Censorship resistant, Open source, Private, Secure. The core claim is user self-sovereignty, and these properties are not to be traded away for convenience. The Mandate also asks for self-sovereign use that is "extraction-resistant and experience seamless", so usability counts too.

| Letter | Meaning | Failure it guards against |
|---|---|---|
| C | No one can block you | A frontend that only lives on one domain |
| O | You can inspect and rebuild it | Closed software you must trust |
| P | Others learn nothing about you | An RPC provider seeing every address you look up |
| S | Keys and data stay yours | A wallet you cannot recover without the vendor |

### Why Anon-RPC exists

Chain data is public; the leak is who is asking. A normal JSON-RPC provider (Infura, Alchemy) sees your IP, every address you query, and timing, so it can tie your identity to your wallets without you ever sending a transaction.

### How Anon-RPC works

- It is a standard plus a sandbox, not a network.
- A specifier contract on-chain stores the keccak256 hash of an anonymizing network's client bundle (the "worker").
- A harness downloads the bundle from anywhere (CDN, mirror, IPFS) and runs it only if the hash matches.
- The worker runs in a Web Worker inside a null-origin iframe. No access to keys, cookies, or DOM. Capability API: fetch, KPS P2P transport, logs, scoped storage.
- KPS: direct connections to a node pinned by certificate hash, with no domain, CA, or signalling server.
- Integration is roughly one line: pass a specifier address, get back an anonymized fetch.
- The specifier owner can ship a new hash or freeze it forever, so users are not locked into one privacy vendor.

Existing workers:

| Worker | What it does | Notes |
|---|---|---|
| Passthrough | Plain fetch | Not anonymous; reference for the sandbox and hash pinning |
| tor-js | Tor client in WASM, circuits built in the browser | Bootstrap delay, higher latency; demo gateways relay into Tor |
| Nym | Nym mixnet client in WASM, Sphinx packets | About 18 MB bundle, a few seconds to bootstrap |
| Nox | Sphinx mixnet over KPS, TLS terminates inside the worker | Sepolia only, per-hop mixing delay |

Existing harnesses: two npm packages, browser and browser extension. No mobile or native harness seen.

Known adopters: Privacy Pools and Kiwi News, both opt-in, both on tor-js. No wallet listed (verify `adopters.json5`).

Known limits:

- Cost is bundle size and bootstrap time, not hashing. Workers run off the main thread; immutable cache headers help repeat loads.
- Every call is multi-hop and slower than direct. Mixnets add delay on purpose. Apps making many calls need batching, caching, parallelism, and a decision on which reads go anonymous. No published latency numbers found yet (verify).
- `isolationKey` asks the worker to keep calls under different keys unlinkable (usually separate circuits, more latency).
- Weak points: demo gateways have limited capacity and are DoS targets; shared exit IPs get blocked by RPC providers (Kiwi News fails over to another provider); a censor can block WebRTC wholesale; you still trust the pinned bytes, and a specifier owner who has not renounced ownership can ship new code.
- It is a library, not an endpoint: you cannot paste it into MetaMask's custom RPC field. The wallet's own code has to use it.

### Frame transactions and the alt mempool

- EIP-8141 (Draft): tx type 0x06, up to 64 frames, each an ordinary contract call with mode, flags, target, gas limit, value, data. Frames split validation, gas payment, and execution.
- Unlocks native gas sponsorship, ERC-20 fee payment, batching, key rotation, spending limits, social recovery, alternative and post-quantum signatures. Targeted for the Hegota upgrade (not live).
- Since account code decides validity, nodes must run it before forwarding, which is a DoS risk. The public mempool accepts only simple shapes.
- ERC-8421 alt mempool accepts the rest, with ERC-7562-style staking and reputation: verification budgets above 100k gas (post-quantum signatures need this) and more flexible state access (ERC-20 and daily-quota paymasters need this).
- Much secondhand material on EIP-8141 is outdated. Read the current EIP and ERC-8421 and ask the team on site.

## Ideas

### Anon-RPC

1. **App leak detector ("what does this app leak").** Browser extension that watches a dapp's RPC traffic, lists which addresses each provider learned and when, scores the app, then reroutes reads through Anon-RPC with one click and shows the before and after. Fits Anon-RPC and CROPS (only one EF prize can be won).
2. **viem / wagmi / ethers transport for Anon-RPC.** A drop-in transport so any dapp switches with one config line, plus a demo dapp. Check first whether one already exists.
3. **Fork an open-source wallet or dapp with Anon-RPC on by default.** Candidates: Rabby, Frame, Ambire, Safe{Wallet}, Uniswap interface, Otterscan. Gives a clean before and after for judges. Verify each fork's RPC layer before choosing.
4. **Private portfolio dashboard or block explorer.** All reads through Anon-RPC, with batching, caching, and one `isolationKey` per account so the network cannot link your wallets to each other.
5. **Anonymous and verified reads.** Combine Anon-RPC with a light client (for example Helios) so responses are proof-checked, not only anonymized.
6. **Network health checker and benchmark.** Measures bootstrap time, per-call latency, failure rate, and provider refusal rates across passthrough, tor-js, Nym, and Nox, on several chains. Publishes the first real latency numbers.
7. **Smart routing layer.** Policy per call: anonymous vs direct, isolation per account, multi-provider failover when an RPC blocks exit IPs, local cache for immutable data (old blocks, receipts).
8. **New harness.** React Native, Electron, Tauri, or a Node CLI. React Native unlocks mobile wallets, which have nothing to plug in today.
9. **New worker.** Oblivious HTTP relay, I2P, HOPR, or a PIR scheme. Check what is realistic in WASM within the weekend.
10. **Gateway operator kit.** One-command deploy of a KPS gateway so the community can add capacity, with rate limits and a status page.
11. **Specifier watchdog.** Monitors specifier contracts, alerts when the pinned hash changes or ownership is not renounced, and keeps a public log of bundle hashes mapped to source commits.

### Frame transaction alt mempool

1. **Post-quantum smart account.** Falcon or ML-DSA signature check in the validation frame, using more than 100k gas, admitted through the alt mempool. Look for existing Solidity PQ verifiers first.
2. **ERC-20 paymaster** or **daily-quota paymaster** (for example, an app sponsors N free txs per user per day).
3. **Gasless private withdrawal.** A Privacy Pools style withdrawal whose gas is paid by a paymaster frame, removing the relayer.
4. **viem or ethers SDK** for building, signing, and submitting frame txs.
5. **Admission simulator.** Paste a tx and see whether the public pool or the alt pool would admit it, and which rule rejects it.
6. **Mempool monitor.** Live dashboard of alt mempool contents, rejections, and reputation and stake state.
7. **Rule fuzzer.** Hunt for DoS vectors in the admission rules and propose fixes.

### CROPS App

1. **Wallet you can fully recover with no server, API, or relayer.** On-chain guardians or social recovery, all from a static frontend.
2. **Frontend that survives losing its domain, backend, or RPC.** IPFS plus ENS contenthash, multi-RPC fallback including Anon-RPC, local-first state.
3. **Frontend integrity verifier.** Extension that checks the served bundle against a reproducible build of the public repo.
4. **Metadata-private payments or messaging.** Server learns nothing about who talks to whom.
5. **App leak detector.** Same as Anon-RPC idea 1.

### Whitechain and private business payroll (to verify)

Open questions first:

- Confirm Whitechain is the WhiteBIT EVM chain, and whether it sponsors this ETHGlobal event, with what prizes.
- Check its EVM version and precompiles (BN254 pairing is needed for most ZK verifiers), testnet, faucet, explorer, and whether ERC-4337 is deployed.

Preliminary payroll concept:

- The employer funds a payroll contract once per cycle.
- Each employee receives to fresh stealth addresses (ERC-5564), so salaries cannot be linked to their identity or to each other.
- A batch payout with a ZK proof that totals match the funded amount, without exposing individual amounts.
- Viewing keys for the accountant or auditor (selective disclosure).
- Employees can produce a ZK proof of income ("I earn more than X") for a landlord or lender without revealing the amount or address.
- Employee wallet reads go through Anon-RPC, so the RPC provider does not learn who the employees are.
- FHE confidential tokens (ERC-7984 / Zama) need a coprocessor that Whitechain probably lacks; the ZK and stealth address design is more portable (verify).

## Pick list (current lean)

- Lowest risk: Anon-RPC idea 1 (leak detector) or 2 (viem transport plus demo). Builds on existing harnesses.
- Highest technical depth: alt mempool idea 1 (post-quantum account) or Anon-RPC idea 5 (verified anonymous reads).
- Sponsor stacking: private payroll on Whitechain, if Whitechain is a sponsor and its chain supports the needed precompiles.

## Sources

- Anon-RPC homepage, GitHub, adopters page, network guide, KPS spec and security notes
- EF Mandate announcement
- EIP-8141, ERC-8421, "Mempool strategies for EIP-8141" (HackMD)
