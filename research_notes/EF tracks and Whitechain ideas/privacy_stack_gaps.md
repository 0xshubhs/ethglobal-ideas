# Ethereum privacy stack and CROPS app ecosystem: gaps a 36-hour team can fill (ETHGlobal Mumbai, 5 to 7 Nov 2026)

Research date: 2026-10-26. Repo facts were read directly from GitHub on that date (clones and API). "Inferences" are my own reasoning, not documented facts.

## What do the ETHGlobal Mumbai EF prizes ("Best CROPS App", "Best Use of Anon-RPC") actually require?

### Takeaway
Mumbai (5 to 7 Nov 2026) is the first ETHGlobal event I found with EF CROPS prizes. CROPS judging rewards one structural (not cosmetic) CROPS property while the other three hold, and hard rules ban third-party trackers and require a README "CROPS" section; a project can win at most one EF prize.

### Cited Findings
- ETHGlobal Mumbai runs 5 to 7 Nov 2026 (Thu to Sat); Pragma Mumbai is 6 Nov 2026. [ETHGlobal events](https://ethglobal.com/events)
- The EF Access Layer team brings two tools: Anon-RPC (anonymizes RPC reads) and an alternative mempool for EIP-8141 frame transactions (ERC-8421). [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Best Use of Anon-RPC: $5,000 ($2,500 / $1,500 / $1,000). Scope: use Anon-RPC in an app, build a new Anon-RPC worker, or implement/fork the harness for a new platform. Example ideas: portfolio dashboard, block explorer, dApp fork, network health checker, Anon-RPC plus light client or proof verification, new network, new harness. Judging: works end to end; UX; share of app traffic routed through Anon-RPC (excluding some traffic for a stated tradeoff is acceptable); could ship; technical depth. Qualification: apps must route RPC reads through Anon-RPC by default. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Best CROPS App: $3,500 ($2,000 / $1,000 / $500). Build an app, wallet feature, or dev tool where one CROPS property is the core reason it exists, without giving up the other three; EF tooling optional. Example ideas: a wallet fully recoverable with nothing from the builder; a frontend that survives loss of its domain, backend, or RPC provider; a payment/messaging/social app where the server learns nothing about who talks to whom; a tool that reveals what an app leaks (RPC calls, trackers, metadata); a tool that verifies a shipped frontend or extension matches its public repo. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- CROPS judging: works end to end; depth of the lead property ("structural beats cosmetic"); other three hold or tradeoffs stated in README; UX for someone who does not know what CROPS means; could ship. Qualification: FOSS-licensed public repo with runnable README; README section titled CROPS with one or two lines per letter; demo video of 3 minutes or less showing the moment the lead property matters; no third-party trackers or analytics in the client; keys and personal data stay on-device or README says why not. The section was marked "tbc: final review pending" when fetched. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Listed CROPS resources include the EF CROPS mandate post, Scaffold-ETH 2, Anon-RPC, alt mempool explorer, the Kohaku privacy SDK, and Walletbeat. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- "Best CROPS Upgrade to an Existing Project" ($1,500) is Continuity Track only; same criteria but only hackathon work is judged, with before/after shown. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Only one EF prize per project (Anon-RPC, alt mempool, or CROPS); EF judges pick the fit. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Earlier EF prizes at ETHGlobal were different: New Delhi 2025 had "Best Infrastructure on Client-Side Privacy" ($1,500) and "Best Applications on General Privacy" ($3,500), both requiring Mopro or zkPDF. [New Delhi prizes](https://ethglobal.com/events/newdelhi/prizes); Buenos Aires 2025 EF prize was "Best use of the EIL SDK" ($6,000). [Buenos Aires EF prize](https://ethglobal.com/events/buenosaires/prizes/ethereum-foundation)
- Tokyo 2026 and Lisbon 2026 prize pages list no Ethereum Foundation section. [Tokyo 2026 prizes](https://ethglobal.com/events/tokyo2026/prizes); [Lisbon 2026 prizes](https://ethglobal.com/events/lisbon2026/prizes)
- Devcon is also in Mumbai: PSE's Private Transactions Research page says L1 privacy implementation "continues toward Devcon Mumbai". [PSE project page source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/projects/private-transactions-research.md)

### Inferences
- The judging rubric maps cleanly to "tools that measure or enforce CROPS" (leak scanners, frontend verifiers, recovery-without-builder). These are explicitly listed as example ideas, so judges will see several; differentiation must come from depth (for example verifying a reproducible build, not just comparing a hash typed into a contract).
- Because the CROPS rules forbid trackers and require on-device keys, any build on top of the current Kohaku reference extension must remove or justify its Alchemy, Envio HyperSync and Pimlico dependencies (see Kohaku section), or the "P" and "C" claims will look cosmetic.
- An Anon-RPC app and a CROPS app compete for the same single EF slot; a team should decide upfront which prize it targets and say so in the README.

### Gaps
- No winners exist yet for these Mumbai prizes; I found no earlier ETHGlobal event with a "CROPS" prize, so there is no judged precedent.
- The CROPS mandate blog post itself was out of scope (another researcher covers EF blog strategy).

## What is the state of the privacy and CROPS tool stack, by layer (mature, prototype, missing)?

### Takeaway
Private writes (Privacy Pools v2, Railgun, stealth addresses) and identity proofs (zkPassport, Self, Anon Aadhaar, ZK Email, TLSNotary) are the most mature; private reads (Anon-RPC, PIR), wallet-native light clients, frontend integrity, and metadata measurement are prototype-stage or missing, which is where hackathon-sized CROPS gaps concentrate.

### Cited Findings

**Private reads (RPC, light clients, PIR)**
- EF Private Reads project index (reads.ethereum.foundation): anon-RPC "In development" (spec 0.3.0 and browser demo at privacy-ethereum.github.io/anon-rpc); tor-js "Shipped" (Arti compiled to WASM, fetch-compatible, reproducible builds); KPS "In development" (WebRTC path to servers without CA certificates); Access-Layer abstraction "In development" (swap Tor, Nym, HOPR, Nox behind one API); Sharded PIR "Research"; PIR specifications "Shipped" (Plinko, RMS24, VIA); insPIRe on GPU "In development"; Universal PIR interface "In development"; Binary trie clients "Paused" since Q3 2026 after a team change. [EF Private Reads projects](https://reads.ethereum.foundation/projects/)
- Private Reads roadmap: tor-js integrations (ethers.js first) and WebRTC transport due Q3 2026; external security audit needed before production use; edge-to-P2P transaction broadcasting "Later"; live mainnet demo routing Kohaku wallet reads through GPU-served PIR "Now, Q4 2026"; production-ready PIR 2027; verifiable PIR Q1 2027; PIR on home nodes undated. [EF Private Reads roadmap](https://reads.ethereum.foundation/roadmap/)
- Six documented open problems: browsers cannot dial native transports (RLPx, libp2p TCP, QUIC); ENRs lack a field for HTTPS/WebTransport endpoints; edge clients cannot join discv5 (UDP); full nodes behind NAT cannot serve; no protocol enumerates serving endpoints; CA-issued certificate barrier favors professional operators. [EF Private Reads foundations](https://reads.ethereum.foundation/foundations/)
- "Power to the Edges" (Anon-RPC architecture, 2 Jun 2026, Andrew Morris and Ali Atiia): sandboxed iframe harness plus sandboxed Web Worker clients per anonymity network; worker bundle hash and suggested resolvers published in an Ethereum contract so bytes can come from any source; draft spec and reference implementation promised; WebRTC wire format still to be decided; Node/Bun/native support beyond Deno subprocess missing. [EF Reads blog](https://reads.ethereum.foundation/blog/anon-rpc/)
- PSE PIR project lists Rust implementations (rms24-rs, plinko-rs, inspire-rs, inspire-exex for private state queries, morphogenesis GPU 2-server DPF-PIR). [PSE PIR project source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/projects/pir-ethereum-data.md)
- kohaku-rs ships `kohaku-tor-rpc` (Alloy JSON-RPC over Arti with shared or session-isolated circuits) and an experiment `kohaku-privacy-rpc` (PIR for private account reads, fallback JSON-RPC, optional Tor). [kohaku-rs README](https://github.com/ethereum/kohaku-rs)
- Helios: about 2 second sync, local JSON-RPC on 8545, supports Ethereum and OP Stack; still relies on weak subjectivity checkpoints and an upstream execution endpoint. [CryptoSlate](https://cryptoslate.com/ethereum-may-finally-kill-trust-me-wallets-in-2026-and-vitalik-says-the-fix-is-already-shipping/)
- Colibri (corpus.core stateless client) is an optional feature in Ambire for balance and ENS lookups on Ethereum and Gnosis. [Ambire help](https://help.ambire.com/en/articles/16106392-how-to-enable-colibri-verification); EthCC talk (1 Apr 2026) on Colibri inside Kohaku. [EthCC agenda](https://test.ethcc.io/ethcc-9/agenda/executing-the-trustless-manifesto-colibri-inside-ethereums-wallet-sdk-kohaku)
- Walletbeat data (beta branch, 26 Oct 2026): every one of the 24 rated software wallets has `lightClient.ethereumL1` set to `notSupported` or `null` (unrated), including MetaMask, Rabby, Rainbow, Zerion, Uniswap, Safe, Ambire. [Walletbeat software-wallets data](https://github.com/walletbeat/walletbeat/tree/beta/data/software-wallets). This conflicts with Ambire's optional Colibri feature above, presumably because Walletbeat rates default behavior (my reading).
- Other private-read networks: Anyone Network hidden RPC for Sepolia (requires client) [Anyone docs](https://docs.anyone.io/sdk/integrations/sepolia-rpc); EdenBlockVC "spook" routes RPC through Nym (proof of concept). [GitHub spook](https://github.com/EdenBlockVC/spook)

**Private writes / sends**
- Privacy Pools v2 launched 21 Oct 2026 on Ethereum, Arbitrum, Base, BNB Chain, Citrea, OP Mainnet, Robinhood Chain: private payments to any EVM address, payment links, Aave yield inside the pool, LI.FI swaps; ASP must approve deposits and can revoke; public "ragequit" exit remains; all features in 0xbow SDK, Rust SDK due Q4; Kohaku integrating, Ambire among first adopters. [Bankless](https://www.bankless.com/read/news/privacy-pools-v2-goes-live-with-bigger-feature-suite)
- L2BEAT now has a privacy section (16 projects) that "follows CROPS principles" and rates what each protocol hides from each adversary, with exit windows: Railgun (no operator, RAIL governance, exit window 7d), Privacy Pools v1 (Infinite), Privacy Pools v2 (None), Tornado Cash, Umbra, Fluidkey, Cloaked, Zama confidential tokens (KMS committee), Privacy Boost (TEE operator), zk.money on Aztec, Payy, STRK-20 (single auditor key), Monero via Cake Wallet, Zcash via NEAR Intents, zkAPI (only "anonymous access" entry), Interfold CRISP (only "secret ballots" entry). No methodology page link and no RPC or wallet-metadata ratings. [L2BEAT privacy](https://l2beat.com/privacy)
- PSE Private Transfers Dashboard (22 May 2026) compares 11 protocols (Curvy, Fluidkey, Hinkal, Intmax, Monero, Privacy Pools, Railgun, Redact, Tongo, Tornado Cash, Zcash) on 30+ properties including client-side proving, escape hatch, external network dependence, compliance model. [PSE dashboard post source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/announcing-private-transfers-dashboard.md); [dashboard](https://private-transfers.pse.dev/)
- Stealth addresses: a rescan of Umbra and ERC-5564 payments found 38.92% of withdrawn stealth addresses traced to their owner via withdrawal habits (H1 registrant reuse, H2 sender equals receiver, H3 collector clusters, H4 unique priority fee, H5 gas funding); results are lower bounds. [ephemeral.money method](https://ephemeral.money/docs/research/method). The same team proposes receive-side withdrawal defaults H1 to H5 with 18 conformance vectors for Kohaku. [Kohaku issue #324](https://github.com/ethereum/kohaku/issues/324)
- PSE user research: receiving privately via stealth addresses is "solved" but spending without linking to a public gas payer remains difficult; no unified balance breaks AMM/lending integrations. [PSE user research source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/private-transfers-engineering-user-research.md)
- Aztec: Ignition mainnet went live Nov 2025 with partial functionality and no smart contract execution at launch. [Cointelegraph](https://cointelegraph.com/news/aztec-launches-actually-decentralized-and-private-eth-l2-mainnet-almost?rand=50490); a critical proving-system vulnerability was disclosed March 2026 with fixes targeted for a July 2026 "v5" (shipping not confirmed). [Aztec blog](https://aztec.network/blog/testnet-retro---launch-day)
- Encrypted mempool: Shutter is live on Gnosis Chain since July 2024 (users add a Shutterized RPC manually); keyper set is permissioned and inclusion averages about 3 minutes; no Ethereum mainnet deployment found. [The Block](https://www.theblock.co/post/305028/gnosis-shutter-mev); [Cointelegraph](https://cointelegraph.com/features/applied-mev-protection-via-shutter-s-threshold-encryption)
- Unlink SDK sponsored privacy prizes at Cannes 2026 and New York 2026 (private payments on Base Sepolia / Arc). [Cannes 2026 prizes](https://ethglobal.com/events/cannes2026/prizes); [NY 2026 prizes](https://ethglobal.com/events/newyork2026/prizes)

**Censorship resistance (inclusion)**
- FOCIL (EIP-7805) was scheduled as the Hegota consensus-layer headliner in Feb 2026; EIP-8141 frame transactions got "considered for inclusion", not headliner, on the 26 Mar call. [The Block](https://www.theblock.co/amp/post/387368/ethereum-researchers-propose-focil-as-censorship-resistance-headliner-for-hegota-upgrade); [Datawallet](https://www.datawallet.com/crypto/ethereum-hegota-upgrade-explained)
- Walletbeat "transaction inclusion" requires wallets to build L1 force-withdrawal transactions for L2s and broadcast them without an external service (p2p gossip or self-hosted node). [Walletbeat attribute source](https://github.com/walletbeat/walletbeat/blob/beta/src/schema/attributes/self-sovereignty/transaction-inclusion.ts)

**Private identity**
- PSE project statuses: Anon Aadhaar active; Self (PSE grant) active; ZK Email and POD2 active collaborations; TLSNotary active; zkID active; Semaphore and Scaling Semaphore maintained; Web2-ID nullifiers via vOPRF maintained. [pse.dev content/projects](https://github.com/privacy-scaling-explorations/pse.dev/tree/main/content/projects)
- zkPassport reads NFC chips of passports/IDs from 130+ countries with on-device proving; founders joined Aztec Labs. [Dealroom](https://app.dealroom.co/companies/obsidion_labs_zkpassport); Safe Research demoed zkPassport-based Safe recovery with scoped identifiers (Sept 2025). [Safe Research](https://safefoundation.org/blog/safe-research-zk-passport-where-are-we-now)
- At New Delhi 2025, Self's onchain SDK worked only on Celo mainnet/testnet. [New Delhi prizes](https://ethglobal.com/events/newdelhi/prizes)

**Private messaging**
- XMTP planned mainnet completion by March 2026 with 7 independent v1 nodes (scaled down from 20+), a Security Council that can remove nodes, max 3 operators per jurisdiction. [XMTP Jan 2026 update](https://blog.xmtp.org/xmtps-decentralization-update-jan-2026/); a docs page gave 9 Dec 2025 as the cutover date (conflict). [XMTP decentralization](https://xmtp.org/decentralization)
- PSE's Discreetly (anonymous chat) and Rate-Limiting Nullifier are marked inactive. [pse.dev content/projects](https://github.com/privacy-scaling-explorations/pse.dev/tree/main/content/projects)

**Wallet privacy**
- Walletbeat privacy attributes: address correlation, multi-address correlation (bulk requests, shared identifiers, IP/time correlation), privacy hygiene (no browsing history, no analytics without consent), private transfers by default (recognizes ERC-5564, Tornado Cash Nova, Privacy Pools, Railgun), app isolation (distinct account per app by default), hardware privacy. [Walletbeat attributes](https://github.com/walletbeat/walletbeat/tree/beta/src/schema/attributes/privacy)
- PoPETs 2026 study of 85 Chrome wallet extensions (about 35.16M users): routine RPC calls leak links between a user's addresses; most Ethereum wallets keep exposing revoked addresses across sessions; many inject providers into cross-origin iframes enabling passive cross-site tracking. Artifact repo: podiumdesu/wallet-privacy-threats. [PoPETs 2026](https://www.petsymposium.org/popets/2026/popets-2026-0094.php)

**Metadata leakage (dapps, analytics, ENS)**
- "Is Your Wallet Snitching On You?": 616 dApps and 100 wallets; over 2,000 leaks across 211 dApps and over 300 leaks across 13 wallets. [arXiv 2306.08170](https://arxiv.org/html/2306.08170v1)
- 78 DeFi sites: about two thirds embed third-party scripts; 17% send users' Ethereum addresses to third parties. [arXiv 2109.06836](https://arxiv.org/pdf/2109.06836)
- ENS CCIP-Read: the client itself fetches from the resolver-named gateway, which validates integrity on-chain but says nothing about requester privacy. [OWASP SCS handbook](https://scs.owasp.org/handbooks/02-dns-hosting-security/part3-ens-ethereum-name-service/); an ENS RFC proposes stealth-address resolution. [ENS forum](https://discuss.ens.domains/t/rfc-privacy-preserving-names-ensip-for-stealth-address-resolution/22354/1)

**Frontend integrity**
- WEBCAT (Freedom of the Press Foundation): signed per-release manifest, public enrollment record, alpha Firefox extension that blocks failing pages; 1TS grant (5 Aug 2026) funds a wallet-integrable verification library, Chromium research, audit, and an ERC. [EF blog 1TS grant](https://blog.ethereum.org/2026/08/05/1ts-grant)
- IPFS team: users get no integrity benefit without their own node; DNSLink/ENS resolution through gateways is unverifiable; SRI has limited use for CIDs; Uniswap publishes a CID per release. [IPFS blog, Jan 2024](https://blog.ipfs.tech/dapps-ipfs/)
- dapp3.eth extension verifies ENS lookups with an embedded Helios light client and serves content from a local Kubo node. [Chrome Web Store](https://chromewebstore.google.com/detail/dapp3eth/gagojfdpbmahciaapdcejmmaeehgpmib); EthStorage prototype uses Colibri to check gateway bytes against on-chain commitments. [EthStorage blog](https://blog.ethstorage.io/client-side-verification-for-on-chain-frontends/)
- Sourcify verifies contract source only, not frontend bundles. [Sourcify](https://sourcify.dev/)
- Walletbeat "release process" passes a wallet only with public changelog, lockfile, signed artifacts, and reproducible or hermetic builds. [Walletbeat attribute source](https://github.com/walletbeat/walletbeat/blob/beta/src/schema/attributes/transparency/release-process.ts)

**Security (clear signing, simulation, recovery, passkeys)**
- Clear Signing launched 12 May 2026: ERC-7730 descriptors, a 1TS-hosted registry, independent review/attestation model, Rust and TypeScript libraries (clearsigning.org); no list of shipping wallets in the post. [EF blog](https://blog.ethereum.org/2026/05/12/clear-signing-announcement); ERC-8176 auditor attestations described by [The Defiant](https://thedefiant.io/news/blockchains/ethereum-foundation-launches-clear-signing-standard)
- Walletbeat transaction legibility checks ERC-7730 calldata decoding for approvals, DeFi calls, Safe nested and multisend batches. [Walletbeat attribute source](https://github.com/walletbeat/walletbeat/blob/beta/src/schema/attributes/security/transaction-legibility.ts)
- EIP-7951 (P-256 verification precompile at 0x100, 3,450 gas) targets Secure Enclave, Android Keystore, WebAuthn; live on mainnet with Fusaka per a community forum post (not an official source). [EIP-7951](https://eips.ethereum.org/EIPS/eip-7951); [Magicians thread](https://ethereum-magicians.org/t/eip-7212-precompiled-for-secp256r1-curve-support/14789?page=7)

### Inferences
- Maturity map (my synthesis): Mature: Privacy Pools v1/v2, Railgun, Tornado Cash contracts, Umbra/Fluidkey stealth payments, Semaphore, MACI, ZK Email, zkPassport, Self, Anon Aadhaar, TLSNotary, ERC-7730 format, tor-js. Prototype: Anon-RPC, KPS, Access-Layer abstraction, PIR (GPU insPIRe, kohaku-rs privacy-rpc), Kohaku SDK and extension, Colibri/Helios in wallets, WEBCAT, Social Recovery SDKs, Shutter outside Gnosis, Aztec contracts. Missing: wallet-default light clients, dapp-level leak reports, verified-frontend standard in Chromium, stealth-address spend hygiene in wallets, browser-to-p2p transaction broadcast, privacy rating of RPC/metadata behavior (L2BEAT and Walletbeat do not cover dapps).
- The most hackathon-tractable gaps are client-side: things that can be built as a browser extension, a static page on IPFS, or a CLI against existing primitives (tor-js, Anon-RPC harness, Helios/Colibri, Walletbeat proxies, Kohaku plugins).

### Gaps
- Waku/Logos messaging status in 2026: no reliable source found.
- Aztec v5 shipping and whether private contracts are live on Aztec mainnet as of Oct 2026: not confirmed.
- Railgun official 2026 metrics: only a secondary blog figure (over $5.16B cumulative shielded volume by June 2026) which I could not verify. [xgram blog](https://xgram.io/blog/how-to-use-railgun-for-shielded-defi-swaps)
- Which wallets actually ship ERC-7730 rendering: not found.
- Fluidkey, Umbra and Semaphore 2026 changelogs were not checked individually.

## What does the Kohaku wallet / SDK provide today, what is missing, and which wallets have integrated it?

### Takeaway
Kohaku (as of 26 Oct 2026) is an unaudited, actively developed JS SDK whose working plugins are Privacy Pools and Tornado Cash (Railgun is currently a placeholder stub), plus a provider abstraction (ethers, viem, Helios, Colibri) and a PQ 4337 account; the reference wallet is a Sepolia-only Ambire fork, and stealth addresses, security utilities, social recovery, devp2p reads and new protocol plugins are still open issues or unmerged PRs.

### Cited Findings
- README status table: `@kohaku-eth/railgun` under maintenance; `tornado-cash`, `privacy-pools`, `plugins` (standard plugin interface), `provider` (ethers, viem, helios, colibri), `pq-account` (post-quantum ERC-4337 account) marked done; whole repo "NOT READY FOR PRODUCTION USE" and "UNAUDITED". 414 stars, 85 forks at fetch time. [Kohaku GitHub](https://github.com/ethereum/kohaku)
- `packages/railgun/README.md` is a placeholder kept "while the real implementation is reintroduced"; docs landing page says "Add shield and unshield for Privacy Pools and Tornado Cash". [Kohaku railgun README](https://github.com/ethereum/kohaku/blob/master/packages/railgun/README.md); [Kohaku docs source](https://github.com/ethereum/kohaku/blob/master/docs/pages/index.mdx)
- Provider interface used by plugins: getChainId, getBlockNumber, getLogs (the expensive cold-start call), call, getBalance/getCode, estimateGas/getGasPrice, getTransactionCount, receipts, raw request. [Kohaku provider docs](https://github.com/ethereum/kohaku/blob/master/docs/pages/provider.mdx)
- Reference integration is kohaku-cli (encrypted storage, chunked getLogs, Tor on `host.network.fetch`); Privacy Pools mainnet history is pulled from a "saga CDN" with an RPC tail. [Kohaku examples docs](https://github.com/ethereum/kohaku/blob/master/docs/pages/examples.mdx); kohaku-cli covers Tornado, Railgun, Privacy Pools v1, ENS/GNS/WNS, EIP-5564 stealth "profiles" and warns not to use on mainnet. [kohaku-cli](https://github.com/kassandraoftroy/kohaku-cli)
- Kohaku Wallet (kohaku-extension) is a reference browser wallet, a fork of Ambire, Sepolia only, with a March 2026 demo build on IPFS; building it requires ALCHEMY_API_KEY, an Envio HYPERSYNC_API_KEY and a Pimlico key; RPC_PROVIDER defaults to colibri. [kohaku-extension](https://github.com/ethereum/kohaku-extension)
- Repo `examples/` contains `anon-rpc-poc` and `pq-account`. [Kohaku examples dir](https://github.com/ethereum/kohaku/tree/master/examples)
- Open issues/PRs (26 Oct 2026, selected): #338 social recovery SDK PR by Wonderland (`@kohaku-eth/social-recovery` 0.0.1, methods: wallet, passkey, zkPassport, Aadhaar; 607 files) [PR #338](https://github.com/ethereum/kohaku/pull/338); #324 stealth receive-side withdrawal defaults [issue #324](https://github.com/ethereum/kohaku/issues/324); #341 Tacit EVM pool plugin, #149 Curvy plugin, #43 Bermuda Bay package, #258 Privacy Pools v2 SDK integration; #225 Nimbus verified proxy provider; #192 "remove integrations into permissioned or centralized providers"; #135 direct devp2p backend for Helios to spread reads across peers and submit to mempool via devp2p [issue #135](https://github.com/ethereum/kohaku/issues/135); #134 security utilities (blocklists, approval management, phishing detection, aligned with Walletbeat/1TS) [issue #134](https://github.com/ethereum/kohaku/issues/134); #275 move Railgun proving off the main thread; #277 Railgun POI submission has no recovery path; #256 pq-account security findings; #356 snapshot-sync edge cases; #335 kohaku-py; #12 Rust/Swift bindings request. [Kohaku issues](https://github.com/ethereum/kohaku/issues)
- kohaku-rs: tornadocash crates, userop-kit (4337), tor-rpc, PIR privacy-rpc experiment. [kohaku-rs](https://github.com/ethereum/kohaku-rs)
- SDK release covered as 25 May 2026 (v0.0.1-alpha.21 with 4337 mempool relaying via Railgun at that time). [The Defiant](https://thedefiant.io/news/blockchains/ethereum-foundation-kohaku-sdk-privacy-wallet-integration-bb4t52) (secondary; later superseded by the Railgun stub state above)
- Wallet adoption: Ambire is among the first wallets adopting Privacy Pools via Kohaku. [Bankless](https://www.bankless.com/read/news/privacy-pools-v2-goes-live-with-bigger-feature-suite); MetaMask/Rainbow/Ambire "signaled support" claims are unconfirmed social posts. [CoinMarketCap AI summary](https://coinmarketcap.com/cmc-ai/railgun/latest-updates/)

### Inferences
- Gaps a team can fill as a Kohaku plugin or host feature in 36 hours: stealth-address receive plus safe-withdraw (issue #324 rules), a security-utilities module (issue #134), a CDN-free private state sync (replace saga CDN with IPFS snapshot verified against on-chain roots), an Anon-RPC-backed `Host` provider, or a Privacy Pools v2 flow in a non-Ambire wallet.
- Using kohaku-extension as-is contradicts CROPS "no server learns" claims because of Alchemy, HyperSync and Pimlico keys; swapping these for Anon-RPC plus Colibri is itself a structural CROPS upgrade.

### Gaps
- No public Kohaku roadmap document exists in the repo; the README and docs list no roadmap.
- Exact production wallet integrations (shipped, not planned) beyond Ambire are unconfirmed.

## What is the state of the PSE roadmap, and which PSE projects are sunset or seeking contributors?

### Takeaway
PSE (now "Privacy Stewards of Ethereum") reorganized in Sept 2025 around private writes, private reads and private proving; its project catalog marks about 31 projects inactive or archived and 18 active, but no project is explicitly flagged as seeking contributors.

### Cited Findings
- Roadmap (Sept 2025): problem-focused, privacy by default, coordinate rather than own; tracks private writes, private reads, private proving; near-term PlasmaFold, Kohaku PoC, private voting with Aragon, Institutional Privacy Task Force. [Ethereum Magicians](https://ethereum-magicians.org/t/pse-roadmap-2025-and-beyond/25423); [Bankless](https://www.bankless.com/read/ethereums-new-privacy-roadmap)
- Catalog status counts from pse.dev content: projectStatus active 18, maintained 11, inactive 31; section archived 14. [pse.dev content/projects](https://github.com/privacy-scaling-explorations/pse.dev/tree/main/content/projects)
- Active: Anon Aadhaar, Client-Side Proving, MachinaIO (iO), Mopro, mpz, Plasma Fold, PIR for Ethereum Data, Private Transactions Research, Sonobe, TLSNotary, tor-js, Verifiable UBT, zkID; collaborations POD2 and ZK Email; grants Cursive, Self, ZKP2P. [pse.dev content/projects](https://github.com/privacy-scaling-explorations/pse.dev/tree/main/content/projects)
- Maintained: Excubiae, MACI, Post-Quantum Cryptography, Private proof delegation, PSE-Halo2, Scaling Semaphore, Semaphore, Web2-ID Nullifiers (vOPRF), ZK-Kit, p0tion, Perpetual Powers of Tau. [pse.dev content/projects](https://github.com/privacy-scaling-explorations/pse.dev/tree/main/content/projects)
- Inactive (sunset): Bandada, chiquito, Circom-MPC, Discreetly, DSL WG, ECIP Halo2, MACI Platform, MPC Framework, MPCStats, P256 (passkey smart wallet), PSE Security, publicly verifiable garbled circuits, Rate-Limiting Nullifier, Scaling Semaphore PIR (completed), Summa, WAX, zkEVM Community Edition, ZKML, VoiceDeck; archived: AnonKlub, Channel 4, COCO, CryptKeeper, EigenTrust, Interep, jubmoji.quest, Pollen Labs, Trusted Setups, UniRep, Zkitter, ZKOPRU. [pse.dev content/projects](https://github.com/privacy-scaling-explorations/pse.dev/tree/main/content/projects)
- Private Transactions Research plan Q2/Q3 2026: Sonobe production release and ZK layer; PlasmaBlind paper (sub-100 ms client proving, about 36k TPS centralized) [eprint 2026/634](https://eprint.iacr.org/2026/634.pdf); Lean Staking EIP-8222 (staking contract as ETH shielding with two-sided plausible deniability) [EIP-8222 thread](https://ethereum-magicians.org/t/eip-8222-lean-staking/28196); L1 PQ private transfer writeup; OMR go/no-go; PIR integration sketch; hardware wallet signer prototype. [PSE project source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/projects/private-transactions-research.md)
- PSE Social Recovery SDK (2 Mar 2026): N-of-M guardians with timelocks, EOA, passkey and Google zkJWT (Noir) guardians, monolithic RecoveryManager, 155 tests; repo privacy-ethereum/social-recovery-sdk. [PSE blog source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/social-recovery-sdk.md)
- The pse.dev repo's last commit is 23 Jun 2026, while newer PSE code lives under the `privacy-ethereum` GitHub org (tor-js, social-recovery-sdk). [pse.dev repo](https://github.com/privacy-scaling-explorations/pse.dev); [tor-js](https://github.com/privacy-ethereum/tor-js)

### Inferences
- Sunset projects with reusable code and a CROPS angle: Discreetly + RLN (anonymous, spam-resistant chat), CryptKeeper (identity extension), Bandada (group management), P256 wallet (now easier with EIP-7951), Summa (proof of solvency). Reviving one with a CROPS framing is a valid "extend" path but judges may see it as old.
- Anon Aadhaar is active and India-specific, which may resonate with Mumbai judges.

### Gaps
- No "seeking contributors / maintainers" flag exists in the catalog schema (statuses are only active, inactive, maintained).
- Whether pse.dev moved to a new repo after June 2026 is unverified.

## What open issues and wishlists exist from the Privacy Stewards, the EF privacy cluster, and Ethereum privacy roadmap posts?

### Takeaway
The documented wishlists converge on: cheaper and faster proving, DeFi composability, deposit/withdraw leakage, missing wallet-native privacy, reliance on relayers and centralized services, private state sync, and browser-level transport/certificate problems for private reads.

### Cited Findings
- PSE user research (38 team interviews, 8 May 2026) top mentions: ZK proof generation time (14 teams), verification gas (13), regulatory uncertainty (11), DeFi composability (11), deposit/withdrawal leakage (10), lack of native wallet support (10), reliance on external networks (9), hash inefficiency (8), lack of standards (8), resource constraints (8), legal risk (7), low PMF (6), private state sync (6), tooling (5), fragmented anonymity sets (5), relayer reliance (3). [PSE user research source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/private-transfers-engineering-user-research.md)
- Same research: relayers introduce censorship risk and gas sponsorship is usually traceable to the relayer; hardware wallets lack ZK-friendly curves (BabyJubJub EdDSA); single viewing keys are not programmable enough for selective disclosure; developer tooling lacks support for private state. [PSE user research source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/private-transfers-engineering-user-research.md)
- PSE Privacy Experience report (2 Dec 2025, 5 think-aloud interviews with Fluidkey, Railgun, Privacy Pools, Flashbots, Shutter shielded voting): unclear privacy boundaries, trust without proof, overly technical setup (ENS, RPCs), unsafe defaults, verification anxiety, need for test modes; one user noted heavy leaks when the dapp used Alchemy. [PSE report source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/privacy-experience-report.md)
- PSE PX survey (8 Jan 2026): 86% abandoned a privacy flow at least once; complexity is the top blocker (58%); manual tools reach about 70% but only 15 to 17% habitual use, while passive tools (private mempools, RPCs) are stickier (23% daily); 73% prefer private by default; strongest trust signals are open source (61%) and transaction previews/simulations (52%); "missing in my wallet" a top blocker (30%). [PSE survey source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/px-user-survey-2025.md)
- Private reads open problems and roadmap gaps: see layer section (six transport/discovery/certificate problems; external audit pending; edge-to-P2P broadcast later; PIR on home nodes needs payment incentive). [EF Private Reads foundations](https://reads.ethereum.foundation/foundations/); [roadmap](https://reads.ethereum.foundation/roadmap/)
- Social recovery open questions: private salt sync between owner and zkJWT guardian (left to manual handoff), DKIM key registry and trustless rotation (DNSSEC coverage incomplete), cross-chain recovery without keystores (RIP-7728). [PSE blog source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/social-recovery-sdk.md)
- Clear Signing next steps: wallet adoption, app descriptors, security attestations, ecosystem tooling. [EF blog](https://blog.ethereum.org/2026/05/12/clear-signing-announcement)
- WEBCAT adoption needs wallet integration of the library and app teams enrolling domains with signed manifests. [EF blog 1TS grant](https://blog.ethereum.org/2026/08/05/1ts-grant)

### Inferences
- "Passive, default-on" privacy (RPC, light client, mempool) is both what users stick with (survey) and what the EF Access Layer is building, so a CROPS app that makes privacy invisible by default is better aligned than another manual mixer UI.
- "Trust without proof" plus "open source is the top trust signal" argues for tools that make verification visible to users (leak reports, verified-build badges).

### Gaps
- No single 2026 "Ethereum privacy roadmap" post from the Privacy Stewards was found beyond the Sept 2025 roadmap and team pages; the EF "strawmap" L1 private transfer plan is referenced but was not read.

## What tools exist to measure what a dapp or wallet leaks, and is there a privacy score?

### Takeaway
Wallet-level scoring exists (Walletbeat privacy attributes with a mitmproxy capture tool; academic measurement artifacts), protocol-level scoring exists (L2BEAT privacy, PSE dashboard), but there is no dapp-level "leak report" or privacy score for RPC calls, third-party scripts and wallet fingerprinting, which matches an explicit Mumbai CROPS example idea.

### Cited Findings
- Walletbeat ("the L2BEAT of wallets") rates wallets with attributes across privacy, security, self-sovereignty, transparency, ecosystem; site at beta.walletbeat.eth.limo. [Walletbeat repo](https://github.com/walletbeat/walletbeat)
- Walletbeat's wallet-data-collection CLI runs mitmproxy captures per UX flow (install, onboarding, send ETH/USDC, swap, app connection) and classifies domains, request purposes, and data; it automates capture/analysis but the human still drives the wallet. Captures exist for Ambire, MetaMask, Rabby, Rainbow, Uniswap Wallet. [Walletbeat tool README](https://github.com/walletbeat/walletbeat/tree/beta/src/tools/wallet-data-collection); [captures](https://github.com/walletbeat/walletbeat/tree/beta/data/software-wallets/collection)
- Walletbeat also ships `l1-lying-rpc-proxy` (tests chain verification), `rpc-filtering-proxy` (tests provider independence), `ens-content-hash-checker`, `ipfs-availability-checker`. [Walletbeat tools](https://github.com/walletbeat/walletbeat/tree/beta/src/tools)
- Walletbeat ran a "Wallet Privacy in Practice" workshop at BREW Berlin (20 Jun 2026). [Luma](https://luma.com/walletbeat)
- L2BEAT privacy covers protocols, not wallets or dapps; no RPC dimension. [L2BEAT privacy](https://l2beat.com/privacy)
- Web3Privacy Now maintains an explorer of 750+ privacy projects (explorer.web3privacy.info, YAML data on GitHub); no scoring found. [QuickNode builders guide](https://www.quicknode.com/builders-guide/tools/wallet-privacy-by-fluidkey) (secondary)
- Academic tooling: PoPETs 2026 artifact repo podiumdesu/wallet-privacy-threats [PoPETs 2026](https://www.petsymposium.org/popets/2026/popets-2026-0094.php); 2023 dApp/wallet leak study [arXiv 2306.08170](https://arxiv.org/html/2306.08170v1); DeFi third-party script study [arXiv 2109.06836](https://arxiv.org/pdf/2109.06836).
- Stealth address leak scanner (Node, one RPC key, aggregate output) from ephemeral.money. [ephemeral.money method](https://ephemeral.money/docs/research/method)
- Static source scanner dapp-frontend-check flags risky patterns (RPC URLs with API keys, unlimited approvals, eth_sign) but does not inspect runtime traffic. [GitHub](https://github.com/INNERLUXES/dapp-frontend-check)

### Inferences
- A "CROPS leak report" for any dapp URL (headless Chromium plus an injected EIP-1193 test wallet, recording every third-party domain, every RPC method and which addresses appear, iframe provider exposure, ENS/CCIP gateways contacted, fingerprinting APIs) is under-served and fits the judging rubric well. It can reuse Walletbeat's classification ideas and the PoPETs threat taxonomy.
- A companion "wallet leak test page" (connect your wallet, see whether it leaks revoked addresses, injects into cross-origin iframes, batches multi-address RPC) would operationalize the PoPETs findings for end users.

### Gaps
- I did not find a maintained "walletscrutiny-style" project for Ethereum dapps; WalletScrutiny itself was not checked.

## What exists for verifying a deployed frontend matches a public repo, and what is missing?

### Takeaway
Pieces exist (IPFS CIDs, ENS contenthash, light-client-verified ENS, WEBCAT signed manifests in alpha Firefox, Walletbeat reproducible-build criteria) but no Chromium-ready, wallet-integrated verifier that ties a served bundle back to a reproducible build of a tagged public commit.

### Cited Findings
- WEBCAT alpha Firefox extension; Chromium unsupported; 1TS funds wallet-integrable library and an ERC. [EF blog 1TS grant](https://blog.ethereum.org/2026/08/05/1ts-grant); WEBCAT announcement. [FPF](https://freedom.press/tech/news/introducing-webcat-web-based-code-assurance-and-transparency/)
- An experimental thesis project uses Sigsum for per-domain authorized signers and Sigstore to sign web assets (its relation to production WEBCAT is unverified). [Sigsum list](https://lists.sigsum.org/mailman3/hyperkitty/list/sigsum-general@lists.sigsum.org/thread/U6T465DCAW4F665EEYMMNWI2AXQIM7TC/)
- IPFS: local node needed for real verification; Service Worker Gateway and @helia/verified-fetch are the workarounds; generate CID in the build process rather than trusting a pinning service; publish source and CID together. [IPFS blog](https://blog.ipfs.tech/dapps-ipfs/)
- ipshipyard argues IPFS-based verification could have mitigated the Bybit frontend hack. [ipshipyard](https://ipshipyard.com/blog/2025-could-ipfs-prevent-bybit-hack/)
- Light-client verification of names/content: dapp3.eth (Helios + Kubo) [Chrome Web Store](https://chromewebstore.google.com/detail/dapp3eth/gagojfdpbmahciaapdcejmmaeehgpmib); EthStorage + Colibri prototype. [EthStorage blog](https://blog.ethstorage.io/client-side-verification-for-on-chain-frontends/)
- Anon-RPC itself verifies worker bundles by a hash published in an Ethereum contract. [EF Reads blog](https://reads.ethereum.foundation/blog/anon-rpc/)
- Tornado Cash's app is pinned on ENS by token governance (L2BEAT description). [L2BEAT privacy](https://l2beat.com/privacy)
- Prior art: TEE Shield (ETHGlobal Trifecta TEE) stores a frontend hash on-chain and a Chrome extension alerts on mismatch, with Marlin TEE PCR checks; no prize listed. [ETHGlobal showcase](https://ethglobal.com/showcase/tee-shield-6fx8p)

### Inferences
- Missing pieces a team can build: (1) a GitHub Action that does a reproducible build, computes the IPFS CID, signs it (Sigstore/Sigsum or an Ethereum attestation), and publishes to an on-chain registry keyed by ENS name; (2) a Chromium extension or in-wallet check that fetches the ENS contenthash through Anon-RPC plus Helios/Colibri, verifies served bytes against the CID, and shows "matches commit X of repo Y"; (3) the same for browser-extension wallets (compare installed extension files to a reproducible build of the release tag).
- Differentiation versus TEE Shield: verify against a rebuild from source, not a developer-asserted hash, and resolve the hash without trusting an RPC.

### Gaps
- Safe's and Uniswap's current (2026) IPFS release practice was not re-verified; the IPFS blog source is Jan 2024.
- Whether Chrome's Isolated Web Apps or other browser-native integrity features are usable for dapps was not researched.

## What recovery mechanisms work with no server, API, or relayer?

### Takeaway
On-chain guardian recovery with timelocks is well specified (PSE Social Recovery SDK, Kohaku social-recovery PR, ZK Email module, zkPassport/Aadhaar guardians), but each still has hidden off-device dependencies (OAuth/DKIM keys, bundlers/paymasters, salt handoff, per-chain setup), so "recover with nothing from the builder" is not solved end to end.

### Cited Findings
- PSE Social Recovery SDK: EOA, passkey, zkJWT guardians; N-of-M with timelock; demo needs Google OAuth config for zkJWT; open questions on salt sync, DKIM registry rotation, cross-chain keystores. [PSE blog source](https://github.com/privacy-scaling-explorations/pse.dev/blob/main/content/articles/social-recovery-sdk.md); [repo](https://github.com/privacy-ethereum/social-recovery-sdk/)
- Kohaku PR #338 adds `@kohaku-eth/social-recovery` with wallet, passkey, zkPassport and Aadhaar methods (zkPassport and Anon Aadhaar as optional peers). [PR #338](https://github.com/ethereum/kohaku/pull/338)
- ZK Email recovery: Universal Email Recovery Module for Safe 1.4 (ERC-7579), guardians confirm by replying to an email; guardian email hidden behind a salted hash; 48 hour timelock in the proposal; depends on email servers' DKIM keys. [ZK Email docs](https://docs.zk.email/account-recovery/setup); [Safe forum SEP 43](https://forum.safe.global/t/sep-43-obra-zk-email-account-recovery-zk-email/5387)
- Walletbeat account-recovery passes only if: recovery works after device loss; survives any single provider going out of business; no single provider can take over the account. [Walletbeat attribute source](https://github.com/walletbeat/walletbeat/blob/beta/src/schema/attributes/security/account-recovery.ts)
- zkPassport-based Safe recovery with scoped identifiers was demonstrated by Safe Research, noting device limits and replay risks. [Safe Research](https://safefoundation.org/blog/safe-research-zk-passport-where-are-we-now)
- EIP-7951 P-256 precompile enables passkey verification on L1 (mainnet status per forum post). [EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- Prior ETHGlobal recovery projects: Shadow Guardians (Buenos Aires 2025, private 2-of-N guardians) [showcase](https://ethglobal.com/showcase/shadow-guardians-8obhq); WalletRecover (New Delhi 2025, Self plus secondary wallet) [showcase](https://ethglobal.com/showcase/walletrecover-186rn); Keyless Recovery (ETHOnline 2026) [showcase](https://ethglobal.com/showcase/keyless-recovery-sb6rg); Guardian Vault (ETHOnline 2025) [showcase](https://ethglobal.com/showcase/guardian-vault-327kx); NovaVault (HackMoney 2026, prize badge) [showcase](https://ethglobal.com/showcase/novavault-94s8n); DefiGuardian (Lisbon 2026, Telegram wallet) [showcase](https://ethglobal.com/showcase/defiguardian-jnrga); Name Inheritance (Tokyo 2026, ENS will with no key holder) [showcase](https://ethglobal.com/showcase/name-inheritance-nd55v).

### Inferences
- A structural "recover with nothing from the builder" demo should: use an EIP-7702 or 4337 account with an on-chain RecoveryManager; guardians that need no server (passkeys, Anon Aadhaar or zkPassport proofs generated on-device, other EOAs); submit recovery txs as plain L1 transactions (no bundler or paymaster dependency, or a fallback path); serve the recovery UI from IPFS/ENS with reads via Anon-RPC; and include a "recovery drill" that proves the setup still works (Walletbeat's periodic-verification point).
- Shamir/SLIP-39 style off-chain backup is complementary and serverless but has no on-chain policy; combining Shamir shares distributed via QR with an on-chain timelock is under-explored at ETHGlobal (only name-search evidence).

### Gaps
- No sources gathered on Shamir/SLIP-39 adoption in Ethereum wallets in 2026, Candide or other 7579 recovery modules, or whether any production wallet passes Walletbeat's account-recovery attribute.

## Which ETHGlobal 2025 to 2026 projects already tackled privacy or CROPS themes?

### Takeaway
Private payments via stealth addresses or shielded pools are crowded (many 2025 to 2026 entries, several with prizes); frontend verification, dapp leak measurement, light-client or Anon-RPC reads, and serverless recovery have only a handful of thin prior attempts.

### Cited Findings
Method: ETHGlobal showcase supports `?q=` name search (single words only; results appear to match project names, not descriptions); I swept about 90 keywords and filtered to 2025 to 2026 events. Prize counts are badge counts on cards, not sponsor names. [ETHGlobal showcase](https://ethglobal.com/showcase?q=privacy)
- Private wallets and payments: PrivacyLinks (Cannes 2025 finalist, Chainlink prize): privacy-by-default Chrome wallet using a fresh address per dApp funded through Privacy Pools (demo used a mock pool). [showcase](https://ethglobal.com/showcase/privacylinks-y30gr); POAPrivacy (Cannes 2025, 2 prizes): POAPs to ERC-5564 stealth addresses. [showcase](https://ethglobal.com/showcase/poaprivacy-ykk5a); CloakPay (Cannes 2026, 1 prize): merchant never sees payer address. [showcase](https://ethglobal.com/showcase/cloakpay-x7w9x); Cloak (Cannes 2026): private freelancer invoicing. [showcase](https://ethglobal.com/showcase/cloak-7zm7s); ENStealth Unlinked (Cannes 2026). [showcase](https://ethglobal.com/showcase/enstealth-unlinked-z4e39); Kondor (Cannes 2026): ENS resolver returning fresh addresses, routed via Railgun. [showcase](https://ethglobal.com/showcase/kondor-4bvt5); Pampalo Private Swap (NY 2026, 1 prize). [showcase](https://ethglobal.com/showcase/pampalo-private-swap-2g5bs); PrettyGoodPrivacy (NY 2026): fund fresh wallet via privacy pool. [showcase](https://ethglobal.com/showcase/prettygoodprivacy-dbz36); new-wallet-fundr (HackMoney 2026): Railgun shield/unshield with pool-activity timing tool. [showcase](https://ethglobal.com/showcase/new-wallet-fundr-x755a); Cypher Wallet (New Delhi 2025): public account plus ZK-shielded vault. [showcase](https://ethglobal.com/showcase/cypher-wallet-166t5); stealth-wallet and Stealth SDK (New Delhi 2025). [showcase](https://ethglobal.com/showcase/stealth-wallet-cpouh); GhostWallet (ETHOnline 2025). [showcase](https://ethglobal.com/showcase/ghostwallet-jtjdc); Himitsu (Tokyo 2026): privacy pool spends as EIP-8141 frame transactions with no app relayer. [showcase](https://ethglobal.com/showcase/himitsu-y62cx); Mercury (iOS USDC wallet with per-payment ERC-5564). [showcase](https://ethglobal.com/showcase/mercury-rgq4m)
- dApp anonymizers: AnonyMaus (HackMoney 2026): extension turns dApp txs into encrypted intents executed by a TEE-run executor contract (TEE trust). [showcase](https://ethglobal.com/showcase/anonymaus-macka); GhostRoute (HackMoney 2026): ZK layer anonymizing msg.sender. [showcase](https://ethglobal.com/showcase/ghostroute-hy877)
- Censorship resistance: ZKFOCIL Private ILs (Trifecta ZK 2025, 2 prizes): PoC and benchmarks of private inclusion lists. [showcase](https://ethglobal.com/showcase/zkfocil-private-ils-0oos6); Android dApp Store (Buenos Aires 2025). [showcase](https://ethglobal.com/showcase/android-dapp-store-boj7g); LORA Meshtastic eth (Cannes 2026): wallet-signed LoRa chat. [showcase](https://ethglobal.com/showcase/lora-meshtastic-eth-rrb86); Anonymous News Forum (ETHOnline 2025, IPFS). [showcase](https://ethglobal.com/showcase/anonymous-news-forum-kmacz)
- Frontend integrity: TEE Shield (Trifecta TEE 2025, no prize listed). [showcase](https://ethglobal.com/showcase/tee-shield-6fx8p); Recomputable Agents serves its frontend via ENS contenthash to IPFS with in-browser verification of results. [showcase](https://ethglobal.com/showcase/recomputable-agents-f22qq)
- Leak awareness: No Privacy (Prague 2025, 1 prize): shows what minimal on-chain data reveals. [showcase](https://ethglobal.com/showcase/no-privacy-65n0g); interceptor (New Delhi 2025): Rust JSON-RPC proxy that intercepts calls. [showcase](https://ethglobal.com/showcase/interceptor-zdp2n)
- Security: Clear Signing Studio (Cannes 2025): ERC-7730 metadata toolkit. [showcase](https://ethglobal.com/showcase/clear-signing-studio-6hs1z); Repo Shield (ETHOnline 2026): scans GitHub repos for fake-interview malware. [showcase](https://ethglobal.com/showcase/repo-shield-pbqyg)
- Messaging/identity: GhostLink (New Delhi 2025, 1 prize): anonymous E2EE chat with payments for World App. [showcase](https://ethglobal.com/showcase/ghostlink-cxxm3); whisper (ETHOnline 2025): send messages/files to an address without revealing sender. [showcase](https://ethglobal.com/showcase/whisper-v50ju); Nymph (New Delhi 2025): anonymous ENS-verified discussion. [showcase](https://ethglobal.com/showcase/nymph-xct4u); Aztec Semaphore (Buenos Aires 2025, 1 prize). [showcase](https://ethglobal.com/showcase/aztec-semaphore-9p80j); ShieldRamp (New Delhi 2025, 1 prize): P2P crypto to INR off-ramp via UPI and TEE web proofs. [showcase](https://ethglobal.com/showcase/shieldramp-okrzw)
- Light clients / RPC: older Light Client Proof (Helios headers into SP1) and OpenRPC (privacy-preserving RPC endpoints) exist; no 2025 to 2026 Helios, Tor, or Anon-RPC app surfaced. [Light Client Proof](https://ethglobal.com/showcase/light-client-proof-28x3u); [OpenRPC](https://ethglobal.com/showcase/openrpc-jej8r)

### Inferences
- Under-served at ETHGlobal (based on name search): dapp leak reports, Anon-RPC or tor-js routed apps, light-client-verified frontends, reproducible-build verification, stealth-address spend hygiene, recovery drills, CDN-free private state sync.
- Crowded: private payment links, burner/fresh wallets funded via pools, private prediction markets, AI-agent private payments.

### Gaps
- Showcase search is name-only and capped (about 33 results per query), so projects with generic names were missed; winner/sponsor mapping per prize was not available from prize pages.

## Which concrete hackathon-sized CROPS app ideas map to the gaps, and which are under-served?

### Takeaway
The strongest Mumbai bets are measurement and verification tools (leak report, frontend/extension build verifier, RPC-honesty checker) and wallet features that make privacy default (stealth spend guard, serverless recovery with Aadhaar/zkPassport guardians), each built on existing primitives so 36 hours is enough.

### Cited Findings
- Mumbai CROPS example ideas: builder-free recovery, frontend surviving domain/backend/RPC loss, server-learns-nothing comms, app leak revealer, frontend/extension-matches-repo verifier. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Anon-RPC example ideas: portfolio dashboard, block explorer, dApp fork, network health checker, Anon-RPC plus light client or proof verification, new harness. [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- Reusable building blocks: tor-js npm [tor-js](https://www.npmjs.com/package/tor-js); Anon-RPC spec and demo [anon-rpc](https://privacy-ethereum.github.io/anon-rpc/); Kohaku plugins and provider [Kohaku](https://github.com/ethereum/kohaku); kohaku-rs tor-rpc and PIR experiment [kohaku-rs](https://github.com/ethereum/kohaku-rs); Walletbeat proxies and capture tool [Walletbeat tools](https://github.com/walletbeat/walletbeat/tree/beta/src/tools); Social Recovery SDKs [PSE](https://github.com/privacy-ethereum/social-recovery-sdk/), [Kohaku PR #338](https://github.com/ethereum/kohaku/pull/338); stealth withdrawal rules with conformance vectors [Kohaku issue #324](https://github.com/ethereum/kohaku/issues/324); Privacy Pools v2 SDK [Bankless](https://www.bankless.com/read/news/privacy-pools-v2-goes-live-with-bigger-feature-suite); ERC-7730 libraries [EF blog](https://blog.ethereum.org/2026/05/12/clear-signing-announcement).

### Inferences
Ideas (lead CROPS letter in brackets; "prior art" from the showcase sweep; "fit" is my judgment):
1. Dapp Leak Report [P]: paste a dapp URL or run a CLI; headless Chromium with an injected test wallet records third-party domains, scripts and trackers, RPC providers and methods, which addresses are sent where, ENS/CCIP gateways, iframe provider exposure, fingerprinting APIs; outputs a shareable report and a draft README CROPS section. Prior art: none found for dapps (Walletbeat covers wallets manually). Fit: very high, matches an example idea; under-served.
2. Wallet Leak Lab [P]: a static IPFS page a user connects a wallet to, which tests PoPETs 2026 threats (revoked-address exposure, cross-origin iframe injection, bulk multi-address RPC) and Walletbeat app-isolation, then scores the wallet. Prior art: none found. Fit: high.
3. Verified Frontend extension [S/O]: resolve ENS contenthash via Anon-RPC plus Helios/Colibri, fetch via verified-fetch, compare against a reproducible build attestation of a tagged commit (GitHub Action producing CID plus Sigstore or EAS attestation), show "matches repo@commit". Prior art: TEE Shield (hash in contract, no rebuild), dapp3.eth (ENS via Helios). Fit: very high if the rebuild step is real.
4. Extension Build Verifier [S/O]: compare an installed wallet extension's files with a reproducible build of its release tag (Walletbeat release-process criterion). Prior art: none found. Fit: high; demoable on an open-source wallet such as Rabby or the Kohaku extension.
5. Unkillable Frontend kit [C]: Scaffold-ETH 2 template that builds a single-file app, pins to IPFS, sets ENS contenthash, routes all reads via Anon-RPC with Helios verification and a rotating fallback list, stores state local-first; demo the moment the domain and RPC are killed. Prior art: Recomputable Agents (ENS to IPFS only). Fit: high; could alternatively target the Anon-RPC prize.
6. RPC Honesty Checker [S/C]: using Walletbeat's lying-RPC proxy idea, show which wallets and dapps accept forged balances/ENS answers, and a drop-in provider (Kohaku `provider` with Colibri) that rejects them. Prior art: none found. Fit: medium-high.
7. Anon-RPC Portfolio / Explorer [P] (Anon-RPC prize): balances and history read through Anon-RPC workers, with balance lookups via the kohaku-rs PIR experiment where possible; measure the share of traffic routed (a judging criterion). Prior art: none. Fit: high for Anon-RPC prize.
8. Stealth Spend Guard [P]: Kohaku plugin or wallet module implementing receive-side H1 to H5 withdrawal rules, passing the 18 published conformance vectors, plus gas funding via a privacy-pool-funded paymaster so the gas payer does not link. Prior art: many stealth payment apps, none enforcing withdrawal hygiene. Fit: high; addresses a measured 38.92% linkage.
9. Builder-free Recovery for India [S]: EIP-7702/4337 account with on-chain RecoveryManager and guardians proven by Anon Aadhaar or zkPassport on-device, plus passkeys (EIP-7951); recovery UI on IPFS, reads via Anon-RPC, txs submittable as plain L1 txs; includes a recovery drill. Prior art: WalletRecover (Self), Shadow Guardians, Keyless Recovery. Fit: high if it demonstrably needs nothing from the builder; extends Kohaku PR #338.
10. Guardian salt handoff without side channels [P/S]: solve the PSE open question by deriving or exchanging the zkJWT salt via an encrypted QR or ECDH between owner and guardian wallets, no server. Prior art: none found. Fit: medium (narrow but structural).
11. CDN-free private state sync [C]: replace Kohaku's saga CDN for Privacy Pools history with content-addressed snapshots (IPFS) verified against on-chain roots, fetched over tor-js. Prior art: none. Fit: medium (dev tool; judges must see the "moment it matters").
12. Privacy Pools v2 in a non-Ambire wallet with default-private sends [P]: fresh address per dapp plus pool-funded gas. Prior art: PrivacyLinks (mock pool). Fit: medium; differentiate by using the real v2 SDK and Anon-RPC reads.
13. Metadata-private messaging [P]: wallet-to-wallet messaging over Waku or XMTP where transport goes through tor-js and the contact graph never leaves the device. Prior art: GhostLink, whisper. Fit: medium; must prove "server learns nothing about who talks to whom".
14. ENS lookup privacy [P]: resolver that performs ENS and CCIP-read lookups through Anon-RPC or tor-js, and an audit of how many popular dapps leak lookups to third parties. Prior art: none found. Fit: medium.
15. Deposit/withdraw timing and amount advisor [P]: on-device analysis that warns before a linkable withdrawal (address reuse, timing, unique fees). Prior art: new-wallet-fundr timing tool. Fit: medium.
16. CROPS CI check [O/P]: GitHub Action that fails a build if the client bundle contains known tracker/analytics domains, unlicensed deps, or hardcoded API-keyed RPC URLs, and generates the README CROPS section. Prior art: dapp-frontend-check (static, partial). Fit: medium; useful for every Mumbai team, could be shipped early.
17. Browser-to-p2p tx broadcast [C]: experimental devp2p or WebRTC bridge so a browser wallet can broadcast without an RPC (EF roadmap "later", Kohaku issue #135). Prior art: none. Fit: high depth, high risk for 36 hours.
18. Clear-sign attest-and-render [S]: ERC-7730 descriptor generator plus ERC-8176 attestation and an in-wallet renderer. Prior art: Clear Signing Studio (Cannes 2025). Fit: medium, partially done.
- Lower priority (crowded or done): private payment links, burner wallets, private prediction markets, inheritance/dead-man switches, private DAO voting.

### Gaps
- Exact Anon-RPC worker/harness APIs and supported networks at hackathon time are covered by another researcher.
- Whether EF judges will count tools that rely on Walletbeat code or Kohaku plugins as "structural" is not documented.
