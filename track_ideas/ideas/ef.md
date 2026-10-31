# Ethereum Foundation at ETHGlobal Mumbai: vetted ideas (fresh builds only)

Written 2026-10-31 by a simulated panel: the Ethereum Foundation's own prize judges (Access Layer team for Anon-RPC and CROPS, the alt mempool team for frame transactions) plus one skeptical hackathon veteran who checks 36 hour feasibility. Team: 3 people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project.

**Scope.** Only the three fresh-build EF prizes are judged: "Best Use of Anon-RPC" ($5,000), "Best use of the Frame Transaction Alternative Mempool" ($5,000) and "Best CROPS App: Censorship Resistant, Open Source, Private, Secure" ($3,500). "Best CROPS Upgrade to an Existing Project" is Continuity only and is ignored. No idea below depends on pre-existing project code; public libraries, SDKs, starter kits and public repos (anon-rpc, hegota-support, the workshop and sidecar repos, Scaffold-ETH 2) are allowed by the Classic rules ([details page](https://ethglobal.com/events/mumbai/info/details)).

**Inputs.** Rubric: the EF section of `track_ideas/00_current_tracks.md` (verbatim, fetched 2026-10-31). History: `track_ideas/history/ef.md`. Draft: `track_ideas/ideas_draft/ef.md` (15 ideas). Season: `track_ideas/00_season.md`. Feasibility facts: `research_notes/EF tracks and Whitechain ideas/anon_rpc.md` and `frame_tx_alt_mempool.md`, and the simulated reviews in `plans/reviews/`. On 2026-10-31 we fetched [the EF prize page](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation) once more (HTTP 200, no bot check): "(tbc: final review pending)" is still present, and the qualification sentences for all three prizes, "keyed nonces and recent roots" and "daily quota paymasters" are unchanged. Nothing else was re-fetched; devnets were not probed today.

**How to read.** Lines marked **Fact** carry a URL or a repo path. Pitches, promises, demo moments, scores, verdicts and judge notes are **Judgement** (ours, not the EF's). The section headed "Questions for the Ethereum Foundation workshop and booth" lists what would change these judgements.

**Scoring method (Judgement).** Each idea is scored 1 to 10 on every verbatim criterion of its track, plus Novelty (against past EF winners and recent finalists) and Feasibility (36 hours, this team). Overall is the plain mean of all rows, one decimal. EF publishes no weights, so we invented none. For Anon-RPC, the sub-bullet "if you choose to exclude some traffic ... just let us know" is folded into the traffic row.

---

## 1. What Ethereum Foundation judges reward (from the history dossier)

Facts (from `track_ideas/history/ef.md`, which links every page):

- **The sponsor technology is the mechanism.** Banganoir made the Anon Aadhaar proof the ERC-4337 userOp signature and won ([Banganoir](https://ethglobal.com/showcase/banganoir-sozqd)). Projects that only named the tool took nothing (AadhaarChain, [page](https://ethglobal.com/showcase/aadhaarchain-duh5d)).
- **The literal gate decides eligibility.** Cannes 2025 excluded server and webview proving; Buenos Aires 2025 asked for "relevant transaction payloads attached"; oneSig, "EIP inspired" without the SDK, placed nowhere ([oneSig](https://ethglobal.com/showcase/onesig-6wdvo); [Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes)).
- **Work that helps the sponsor team wins.** maci-subgraph built a listed idea and sent PR #1203 ([page](https://ethglobal.com/showcase/maci-subgraph-89h7c)); SkaffoldMACI found and fixed a bug in PR #1304 ([page](https://ethglobal.com/showcase/skaffoldmaci-zkosios-2no6q)); dnsRegistry-AVS removed zkEmail's oracle dependency ([page](https://ethglobal.com/showcase/dnsregistry-avs-wb52m)); Open Paymaster, a trustless ERC-4337 paymaster, took EIL 1st ([page](https://ethglobal.com/showcase/open-paymaster-61jq1)). A pure port did not: eil-rs placed nowhere ([page](https://ethglobal.com/showcase/eil-rs-hfqp9)).
- **Composition beats single-primitive demos.** Votelik Pollerin (MACI, World ID, Pimlico) and Zkipper (EIP-7702 roles, Falcon, ZK) placed ([Votelik](https://ethglobal.com/showcase/votelik-pollerin-u0dcs); [Zkipper](https://ethglobal.com/showcase/zkipper-czc3z)); EZKPoll and zkElect did not.
- **Stated limits do not hurt.** Zkipper listed "Mocked parts"; Proof Royale named TLSNotary's failures on most sites; both placed ([Proof Royale](https://ethglobal.com/showcase/proof-royale-fsivf)).
- **Polish decides the lower places.** Proov's 3rd was credited to "exceptional UI/UX design" ([Mopro blog](https://zkmopro.org/blog/ethglobal-cannes-2025)).
- **EF prizes and finalist slots rarely coincide.** Of 39 EF or PSE winners, only Individuum was also a finalist ([Individuum](https://ethglobal.com/showcase/individuum-nyee0)).
- **This is a new judging team.** No ETHGlobal event in 2026 had an EF prize before Mumbai, and the Access Layer cluster dates from the June 2026 restructuring ([EF structure](https://blog.ethereum.org/en/2026/06/23/ef-structure)). The alt mempool track continues the ERC-4337 lineage of the EIL track; Alex Forshtat, named as on site, is an ERC-4337 author ([ERC-4337](https://eips.ethereum.org/EIPS/eip-4337)).

Judgement:

- Mumbai's rubrics read like acceptance tests: a traffic share, an admitted transaction link, a README CROPS section, a video moment where the backend is switched off. Meet the gate in the first hours, then spend the rest on depth.
- The alt mempool reviewers are the authors of the rules. A build that finds a real divergence or fixes their sidecar is worth more to them than a polished app that any 4337 team could make.
- The Access Layer judges break ties on "structural (works without you) beats cosmetic (a setting)". A measurement tool loses that tiebreak to a working structural app unless it changes what ships. Our simulated panel said exactly this about the Dapp Leak Report (`plans/reviews/judge_ef_access_layer.md`).

**Expected rivals (Judgement, adversarial).** Assume several teams submit each of these: an Anon-RPC "Tor toggle" portfolio dashboard or block explorer, a fork of a dapp with `fetchFn: worker.fetch`, a network health checker; an ERC-20 gas paymaster, a viem frame-transaction plugin, a PQ wallet, a Tornado or shielded-pool withdrawal without a relayer; a social-recovery wallet, a leak or tracker scanner, an IPFS-hosted frontend, a stealth-address payment app. Every idea below was checked against these.

---

## 2. Gates every idea is checked against (verbatim)

Fact, all from [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation) via `00_current_tracks.md`:

- **All EF prizes:** "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best."
- **Anon-RPC qualification:** "Your app routes its RPC reads through Anon-RPC by default. If you're building a worker or the harness, a simple demo app is enough." Criteria: "works end to end in the demo"; "quality of user experience in demo"; "how much of the app's traffic goes through Anon-RPC (if an app)" (with the exclusion note); "could this be shipped for real after the hackathon"; "technical depth". Won't place: none published.
- **Alt mempool qualification:** "Show real alt mempool usage: a link to your admitted transaction on the devnet explorer, or code that submits one. Your team must be able to explain the design, the code and the trade-offs." Criteria: "creativity"; "usefulness"; "practicality"; "how well it works"; "relation to the alt mempool". Won't place: none published.
- **CROPS qualifications:** (1) FOSS licence and a README a judge can run it from; (2) a README section titled CROPS with C, O, P and S lines; (3) "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters"; (4) "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not."; (5) one EF prize. Criteria (still "(tbc: final review pending)"): "works end to end in the demo"; "depth of the lead property: structural (works without you) beats cosmetic (a setting)"; "the other three still hold, or trade-offs are stated in the README"; "UX: would someone use it without knowing what CROPS means"; "could it ship after the hackathon". Won't place: qualification 4.
- **ETHGlobal rules** ([details page](https://ethglobal.com/events/mumbai/info/details)): all work after Thu 5 Nov 21:00 IST; video 2 to 4 minutes, no AI voiceover; steady commit history ("large single commits ... may be disqualified"); AI use attributed, and with a spec-driven workflow "you must include all spec files, prompts, and planning artifacts". **Judgement:** cut every EF video between 2:00 and 2:59 so it also meets the CROPS 3 minute cap; if these notes are used as a spec, commit them to the repo.

---

## 3. Best Use of Anon-RPC ($5,000: $2,500 / $1,500 / $1,000)

### 3.1 Ranked table

| Rank | Idea | Overall | Verdict | Stack |
|---|---|---|---|---|
| 1 | A1 Slowlane: a timelocked worker specifier, a delayed-pin harness policy and a watchdog | 7.6 | New (replaces R5 Quiet Quorum) | EF Anon-RPC only |
| 2 | A2 Blindfork: a localhost Anon-RPC endpoint for Foundry, cast and wallets, with proof-checked fork reads | 7.4 | Revise (R2) | EF Anon-RPC only |
| 3 | A3 Twofold: an Oblivious HTTP worker, a new network for Anon-RPC | 7.4 | New (replaces R3 Chaff) | EF Anon-RPC only |
| 4 | A4 Afterdrain: a private 7702 delegation and approval checkup that fails closed | 7.3 | Revise (R1) | EF Anon-RPC + Uniswap Foundation (gated) |
| 5 | A5 Hush: private ENSv2 resolution with role-scoped address rotation | 6.9 | Revise (R4) | EF Anon-RPC + ENS |

### 3.2 Verdicts on the draft

- **R1 Afterdrain: revise.** It sits in the most crowded lane ("portfolio dashboard"). Three defects: approvals to unknown spenders need `eth_getLogs` by owner topic, which free RPCs cap by block range and which costs about 0.8 s per call over Tor; dapps cannot request a raw EIP-7702 re-delegation from MetaMask-class wallets, so the "lockdown" re-delegation is not a dapp write; the Uniswap work earns nothing in this prize. Improved version is A4.
- **R2 Blindfork: revise.** Strong lane ("new harness"), but the draft trusts headers from the same RPC it is checking, and calls a headless-Chromium bridge a "new harness". Improved version is A2.
- **R3 Chaff: drop.** Decoy reads are broken by intersection across sessions unless the decoy set is fixed per user, they multiply load on Tor and public RPCs, and the demo is abstract. Replaced by A3 Twofold, a new network the notes rate as "most weekend-feasible" (`anon_rpc.md` Q4). Draft scores: 7, 4, 9, 4, 7; Novelty 7; Feasibility 7; overall 6.4.
- **R4 Hush: revise.** Good open gap, but the draft's local storage-proof walk of the ENSv2 hierarchy is too much for 36 hours. Improved version is A5.
- **R5 Quiet Quorum: drop.** Bybit was a compromised Safe frontend, which removing the transaction service does not fix; independent safeTxHash recomputation already exists in public tools (Judgement); replacing the Safe service with Arkiv swaps one dependency for another; it fits CROPS better than Anon-RPC. Replaced by A1 Slowlane. Draft scores: 7, 7, 7, 6, 6; Novelty 5; Feasibility 6; overall 6.3.

### 3.3 A1 Slowlane: no worker update reaches users without a public delay (rank 1, 7.6, new)

- **Pitch.** Every Anon-RPC host trusts one specifier contract to name the worker bundle it runs, and every live specifier is owned by a single EOA. Slowlane ships a timelocked, vetoable specifier contract, a host-side pin policy that only accepts a new worker hash after it has been public for the delay, and a watchdog that shows the owner type and update history of every known worker.
- **Facts it rests on.** The specifier owner key "is the supply chain for every host pinned to that address" ([specifier README](https://github.com/ethereum/anon-rpc/blob/main/impl/specifier/README.md)). The live passthrough, tor-js and Nym specifiers on mainnet and Nox on Sepolia are owned by EOAs and none is renounced (`anon_rpc.md` Q1, with Etherscan links such as [tor-js specifier](https://etherscan.io/address/0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e#readContract)). The spec requires only `workerHash()` and `workerResolvers()` and defines no upgrade governance ([SPEC](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md); [threat map](https://andyguzmaneth.github.io/anon-rpc-threat-map/) lists "Upgrade governance for specifiers" as open). The bootstrap provider "is trusted for one read" ([wallet guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-wallet.md)). Privacy Pools already pins the hash client side by intercepting the `0x3898587d` call ([tor-fetch.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts)).
- **Falsifiable promise.** "If the specifier owner key is stolen and points every host at a malicious worker, no Slowlane host runs it for 48 hours, any guardian can veto it in that window, and the watchdog shows the pending change to anyone. A host on a stock EOA specifier runs the malicious bundle on its next boot."
- **Demo moment (20 s).** Two tabs, same demo wallet, both reading through tor-js. The team, as owner of its own test specifiers on Sepolia, pushes a canary worker that posts every request to a logging endpoint. The stock-specifier tab reboots and the canary log fills. The Slowlane tab shows "worker update pending, 47:59:40 left, vetoable" and keeps running the old bundle; a guardian clicks veto; the watchdog row turns green. Never touch the real specifiers.
- **Requirement checklist.**
  - Qualification "routes its RPC reads through Anon-RPC by default": the watchdog and demo wallet use `worker.fetch` for every read, with a fail-closed egress guard; the specifier read itself is pinned and then re-checked privately through the worker. Pass.
  - "If you're building a worker or the harness, a simple demo app is enough": the pin policy is a fork of the harness's specifier-trust step in `@anon-rpc/harness-core`; the demo wallet is the simple app. Pass, subject to workshop question 6.
  - Traffic share: 100% of reads; exclusions stated: none for RPC, the static host and the canary endpoint (demo only).
  - One EF prize: Anon-RPC preferred; EF may place it in CROPS (lead S). Either is fine.
  - ETHGlobal: fresh code, contracts fuzzed in Foundry, video 2:00 to 2:59.
- **Why it beats rivals (Judgement).** Nobody else will touch specifier governance: rival entries consume anonymity or add networks. It is the Open Paymaster pattern (remove a trusted operator from the sponsor's own stack) and the dnsRegistry-AVS pattern (fix the sponsor's dependency), and it is Solidity plus invariant fuzzing, the team's core skill. It gives the judges a PR-shaped artifact: a `TimelockWorkerSpecifier.sol` and a pin policy they can merge.
- **Closest prior winners.** dnsRegistry-AVS (Brussels 2024 ZK Email 1st); Open Paymaster (Buenos Aires 2025 EIL 1st); maci-subgraph (Circuit Breaker 2024, upstream PR). No prior Anon-RPC prize exists.
- **Stack.** Solidity and Foundry (timelock specifier with propose, veto, activate, renounce; invariant tests: the active hash never changes before the delay, a veto always clears the pending hash, no owner path skips the delay); TypeScript wrapper around `@anon-rpc/browser-harness`; React watchdog; tor-js worker, Nym as fallback.
- **Difficulty.** Low to medium. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 8 | Everything runs on the team's own Sepolia specifiers |
| quality of user experience in demo | 5 | Operator-facing; the user sees only a banner |
| how much traffic through Anon-RPC | 9 | 100% of reads; the bootstrap read is pinned and re-checked |
| could ship after the hackathon | 8 | Small contracts and a host policy any adopter can take |
| technical depth | 7 | Spec-level supply chain fix with fuzzed invariants; little networking depth |
| Novelty | 8 | Open item on the threat map; no prior build found |
| Feasibility | 8 | Mostly Solidity and a thin wrapper |
| **Overall** | **7.6** | |

- **Judge notes.** EF judge: "This is the governance gap we left open. We would ask whether a 48 hour delay also delays emergency security fixes, so show the guardian fast-path and its trust cost." Veteran: "Low WOW for the finalist room. Do not let the watchdog UI eat the hours; the contract, the policy and the two-tab beat are the product."

### 3.4 A2 Blindfork: point Foundry at localhost and nobody learns what you are probing (rank 2, 7.4, revise)

- **Pitch.** A local JSON-RPC endpoint (`127.0.0.1:8545`) that sends every read through an Anon-RPC worker and checks fork state against a verified header, so `forge test --fork-url`, `cast` and wallets with a custom RPC get anonymous, verified reads with no code change.
- **What changed from the draft.** (1) Headers come from Colibri with `fetch: worker.fetch`, not from the same RPC; each fork block gets one verified header and every slot is checked with `eth_getProof` against its state root. (2) The honest label is "a Node host around the official browser harness running in headless Chromium"; a conforming Deno harness is a stretch. (3) The forgery beat is well-formed: a lying upstream returns a valid-looking value and proof that cannot match the verified root, as our simulated panel required for Lightfoot (`plans/reviews/judge_ef_access_layer.md`).
- **Facts it rests on.** "Not yet a conforming harness" for Node, with no WebAssembly in its isolate, so every real worker runs only in browsers ([node-harness README](https://github.com/ethereum/anon-rpc/blob/main/impl/node-harness/README.md)). tor-js p50 about 810 ms and boot about 8 s ([bench run](https://github.com/ethereum/anon-rpc/actions/runs/40303047893)). Colibri's config accepts a custom `fetch` "to route traffic through Tor" ([Colibri on npm](https://www.npmjs.com/package/@corpus-core/colibri-stateless)). No merged worker honours `isolationKey`; tor-js PR #20 is open ([tor-js PR #20](https://github.com/ethereum/tor-js/pull/20)).
- **Falsifiable promise.** "`forge test --fork-url http://127.0.0.1:8545` against a live mainnet protocol passes; every `eth_getStorageAt`, `eth_getCode` and `eth_getBalance` Anvil made left through Tor and matched a proof against a light-client-verified header. Feed one forged slot and the run aborts with the slot number."
- **Demo moment (20 s).** Split screen: a short Foundry invariant test forking a Uniswap v4 pool goes green on a warm cache (cold-run time shown from a recorded run); Blindfork's log shows exit IP and "proof OK" per slot. The team switches the upstream to its lying proxy for one slot; the test halts with "slot 0x...: proof mismatch against verified root".
- **Requirement checklist.**
  - "If you're building a worker or the harness, a simple demo app is enough": the demo app is a Foundry test. Pass if EF accepts a hosted browser harness as harness work (workshop question 6); otherwise it still qualifies as an app routing 100% of reads.
  - Traffic share: 100% of reads; exclusions: none. Writes are out of scope (forks do not broadcast).
  - Technical depth: verified header, batched proofs per account, content-addressed proof cache, prefetch from a recorded access list, several worker instances as separate circuits (memory cost stated) because `isolationKey` is not honoured.
- **Why it beats rivals (Judgement).** Our simulated EF panel said a local JSON-RPC proxy or new harness is what could beat a verified dashboard, because it "produces" rather than consumes anonymity. Few teams will attempt a harness; the team are its real users, which makes the README story credible.
- **Closest prior winners.** FeFe (Istanbul 2023 Fe winner, test tooling for the sponsor's stack); SkaffoldMACI (London 2024 2nd, reusable developer tooling). Proposal: Quiet Port (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).
- **Stack.** Node and Playwright (headless Chromium hosting `@anon-rpc/browser-harness` with a pinned tor-js worker), Colibri, an MPT proof verifier (for example `@ethereumjs/trie`), Foundry for the demo.
- **Difficulty.** Medium to high. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 7 | Warm cache makes it reliable; cold forks are slow |
| quality of user experience in demo | 6 | CLI only, but drop-in `--fork-url` is excellent DX |
| how much traffic through Anon-RPC | 10 | The endpoint is the transport |
| could ship after the hackathon | 7 | npm CLI; depends on headless Chromium and a gateway |
| technical depth | 8 | Verified header plus per-slot proofs plus lanes |
| Novelty | 8 | No public non-browser host for real workers |
| Feasibility | 6 | Colibri over the worker is unproven; Anvil makes many reads |
| **Overall** | **7.4** | |

- **Judge notes.** EF judge: "We will ask what the exit learns from the access pattern of a fork: the set of contracts and slots is itself a fingerprint of what you are researching. Say it in the README." Veteran: "Kill criterion by Fri 12:00: if Colibri cannot fetch through `worker.fetch`, ship cross-checked reads through two networks and rename the claim."

### 3.5 A3 Twofold: Oblivious HTTP as a new Anon-RPC network (rank 3, 7.4, new)

- **Pitch.** A new worker that wraps each JSON-RPC request in Oblivious HTTP: a relay sees your IP but not your query, a gateway sees your query but not your IP, at a fraction of Tor's latency. Published through its own specifier so any Anon-RPC host can switch to it by address.
- **Facts it rests on.** Workers exist for Tor, Nym and Nox only; OHTTP has none and is rated the most weekend-feasible missing network ("Only OHTTP and proxy-js look realistic in 36 hours", `anon_rpc.md` Q4). An Algorand demo already runs RPC over OHTTP ([algorand demo](https://github.com/algorandecosystem/algorand-anonymous-rpc-demo)); `ohttp-ts` is on npm ([ohttp-ts](https://www.npmjs.com/package/ohttp-ts)). Workers may use ambient `fetch` ([SPEC §3.2](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)); the passthrough worker does. The opaque-origin sandbox paid a CORS preflight per request, about 280 ms, in the first bench ([PR #4](https://github.com/ethereum/anon-rpc/pull/4)). `publish-worker.mjs` verifies resolvers serve the pinned bytes before deploying a specifier ([specifier README](https://github.com/ethereum/anon-rpc/blob/main/impl/specifier/README.md)). The prize lists "new network" as an idea.
- **Falsifiable promise.** "On the same bench, our OHTTP worker's p50 for `eth_getBalance` is below tor-js's, the relay's log holds IPs and ciphertext only, and the gateway's log holds queries and the relay's IP only. Neither log alone links a user to an address."
- **Demo moment (20 s).** Demo wallet reads balances; three log panes scroll: relay (IP, opaque bytes), gateway (JSON-RPC body, relay IP), RPC (gateway IP). A latency chart compares OHTTP, tor-js and Nym arms from runs made at the venue. Then the team stops the relay: the wallet fails closed.
- **Requirement checklist.**
  - "produces anonymity via a new Anon-RPC worker": yes; simple demo app suffices. Pass.
  - Traffic share in the demo app: 100% of reads.
  - Shippable: the worker and gateway are open source; the non-collusion property needs a relay run by someone other than the gateway operator. Self-running both breaks it; the README says so in its first line.
  - Technical depth: HPKE encapsulation, key config pinned in the worker config, response padding to buckets, a bench arm.
- **Why it beats rivals (Judgement).** A new network is listed by the sponsor and almost nobody else will build one. It also gives the EF a latency and privacy trade-off they can put in their bench. The risk is a "privacy theatre" reading if relay and gateway share an operator, which the README must confront head on.
- **Closest prior winners.** Brussels 2024 "Prize Pool for Plugin Developers" (Butlerian Jihad, ZapDL: new plugins for the sponsor's stack, [ZapDL](https://ethglobal.com/showcase/zapdl-q05vf)); New Delhi 2025 "Best Infrastructure on Client-Side Privacy" (AccessFi).
- **Stack.** TypeScript worker as a single IIFE (template from the network guide), `ohttp-ts`, a small gateway in front of an Ethereum RPC and a relay (two VPSs on two providers), specifier deploy on Sepolia and mainnet.
- **Difficulty.** Medium. **Team fit:** medium (networking and TypeScript heavy; little Solidity).
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 7 | Three services the team controls |
| quality of user experience in demo | 7 | Fast reads make the demo app feel normal |
| how much traffic through Anon-RPC | 9 | 100% in the demo app |
| could ship after the hackathon | 6 | Needs an independent relay operator |
| technical depth | 8 | New transport, pinned keys, padding, bench |
| Novelty | 9 | No worker and no public Ethereum OHTTP gateway found |
| Feasibility | 6 | CORS from the sandbox and HPKE wiring are the risks |
| **Overall** | **7.4** | |

- **Judge notes.** EF judge: "Show us that a malicious gateway cannot learn the IP even with timing, or tell us it can. Recruit a second party at the event to run the relay." Veteran: "Weakest team fit of the five. Pick it only if one teammate is comfortable with HPKE and server ops."

### 3.6 A4 Afterdrain: check your delegations and approvals without telling an RPC company which wallet you fear for (rank 4, 7.3, revise)

- **Pitch.** A static page that audits one address for an EIP-7702 delegation, ERC-20 approvals and Permit2 allowances, with every read through Anon-RPC and the delegation pointer checked by a light client, and that refuses to load anything if the anonymity network is down.
- **What changed from the draft.** (1) Approval discovery uses `eth_getLogs` on the owner topic in chunked ranges with an IndexedDB cache and a measured per-provider table of which RPCs answer wide ranges over Tor. (2) The 7702 re-delegation write is dropped: the page detects and explains, and the wallet does the re-delegation in its own UI. (3) ERC-20 revokes and Permit2 `lockdown` are sent by the user's wallet, stated as an exclusion. (4) Colibri verifies `eth_getCode` so a lying RPC cannot hide a delegation. (5) Uniswap is optional and gated.
- **Facts it rests on.** The Binance drain used 50 EIP-7702 authorizations over consecutive nonces ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). Early studies linked a large share of 7702 delegations to sweepers ([Protos](https://protos.com/48-of-ethereum-eip-7702-uses-linked-to-crime-says-wintermute)). Privacy Pools' egress transport fails closed and "does not fall back to a direct fetch" ([egress-transport.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/egress-transport.ts)). Our simulated panel faulted Lightfoot for missing approvals to unknown spenders and for Uniswap work that "earn[s] nothing in this prize" (`plans/reviews/judge_ef_access_layer.md`).
- **Falsifiable promise.** "Every read this page makes about your address leaves through Tor or Nym and the delegation check is proof-verified; if the network is down the page shows nothing rather than going direct, and our egress meter shows the count."
- **Demo moment (20 s).** Paste a team test address delegated to the team's own sweeper-shaped contract: a red card names the delegate; approval cards fill from logs; the meter reads "63 of 63 reads via tor-js, 0 direct". The team kills the gateway: next refresh fails closed, DevTools shows no request leaving.
- **Requirement checklist.** Reads by default: yes, no toggle. Traffic share: 100% of reads; exclusions: the static host and the user's wallet for revokes. Works end to end: mainnet reads plus one Sepolia revoke. Shippable: static, no backend.
- **Why it beats rivals (Judgement).** It is still a dashboard, so it must win on UX and the fail-closed beat. Its edge over "Tor toggle" dashboards is the timely 7702 check and full approval discovery. Its edge is small; this is the safe, finishable entry.
- **Closest prior winners.** Zkipper (Cannes 2025 Mopro 2nd, 7702 roles against Bybit-style attacks); How Doxxed Am I? (Taipei finalist, exposure report, [page](https://ethglobal.com/showcase/how-doxxed-am-i-ftbux)).
- **Stack.** React, viem with `fetchFn: worker.fetch`, `@anon-rpc/browser-harness`, Colibri, Permit2 reads. Optional: Uniswap Foundation (see combo pass).
- **Difficulty.** Low to medium. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 8 | Few moving parts |
| quality of user experience in demo | 8 | One box, plain cards |
| how much traffic through Anon-RPC | 9 | 100% of reads, writes disclosed |
| could ship after the hackathon | 7 | Static; log scanning depends on provider ranges |
| technical depth | 6 | Verified code reads and chunked logs; otherwise a dashboard |
| Novelty | 5 | Crowded lane; close to the team's own Lightfoot plan |
| Feasibility | 8 | Mostly reads |
| **Overall** | **7.3** | |

- **Judge notes.** EF judge: "Log scanning by owner topic tells the RPC which address you care about, even if not who you are. Say so." Veteran: "Do the Uniswap add-on only if the core is done by Fri 18:00."

### 3.7 A5 Hush: look up ENSv2 names without telling anyone which names (rank 5, 6.9, revise)

- **Pitch.** An ENSv2 lookup and "pay a name" page whose resolution calls go through Anon-RPC and are verified, plus a role-scoped hot key that can rotate only the receiving address.
- **What changed from the draft.** Resolution uses the Universal Resolver `eth_call`, verified by Colibri, instead of a hand-written storage-proof walk; CCIP-read gateway calls go through `worker.fetch` (the gateway learns the name, not the IP), stated as an exclusion from verification.
- **Facts it rests on.** ENSv2 went live on mainnet on 27 Oct 2026 ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)). ENS requires "built on ENSv2 on Ethereum mainnet or Sepolia", features "central to the product, not a cosmetic add-on", a functional demo "not just include hard-coded values", and a live demo link ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)). Enhanced Access Control can "delegate specific rights, like letting an account edit only certain text records" (same page). Private name lookup has no prior art in our notes (`privacy_stack_gaps.md` idea 14).
- **Falsifiable promise.** "Resolving a name sends no unverified, non-anonymous request; a forged address record fails verification; the hot key can change the address record and nothing else."
- **Demo moment (20 s).** Type a teammate's name: trace shows each call "via Nym, verified". Pay 1 USDC. The teammate's hot key rotates the address; the next lookup follows; the same key's attempt to edit the avatar reverts.
- **Requirement checklist.** EF: reads by default, 100% except the payment send and CCIP-read verification. ENS: ENSv2 central (EAC role and resolver are the mechanism), live link, open source.
- **Why it beats rivals (Judgement).** Two prizes for one coherent build, and an open gap. Risk: ENS judges may see "private resolution" as not using ENSv2's new features enough, so the role-scoped rotation must be visible.
- **Closest prior winners.** ZeroSurf (New Delhi 2025 3rd, privacy in a browser flow, [page](https://ethglobal.com/showcase/zerosurf-9988k)); Kura (Tokyo 2026 ENSv2 3rd, per `00_season.md`).
- **Stack.** React, viem, Colibri, `@anon-rpc/browser-harness`, ENSv2 contracts on Sepolia or mainnet.
- **Difficulty.** Medium. **Team fit:** medium to high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 6 | ENSv2 is days old; Colibri verified `eth_call` on Sepolia is unconfirmed |
| quality of user experience in demo | 7 | Familiar "pay a name" flow |
| how much traffic through Anon-RPC | 8 | All reads; CCIP-read unverified, send excluded |
| could ship after the hackathon | 7 | A resolver client wallets could embed |
| technical depth | 7 | Verified resolution plus role scoping |
| Novelty | 8 | No private ENS resolver found |
| Feasibility | 5 | Two new surfaces at once |
| **Overall** | **6.9** | |

- **Judge notes.** EF judge: "Name lookups are frequent and revealing; good target." Veteran: "Confirm ENSv2 on Sepolia at the ENS workshop (16:00, Room 1) before committing."

---

## 4. Best use of the Frame Transaction Alternative Mempool ($5,000: $2,500 / $1,500 / $1,000)

**Facts that bound every idea here.**
- The chain 1337 sidecar source (read 2026-10-27) sums prefix execution gas and rejects above `MAX_VERIFY_GAS = 100,000` before it looks up stake, so the staked 1M budget of ERC-8421 is not enforced there (`plans/reviews/judge_alt_mempool.md` 2.1, citing [mempool-workshop-sidecar](https://github.com/forshtat/mempool-workshop-sidecar) `utils/validationPrefix.ts` at `2e22ff0a`). Every idea below keeps validation under 100k.
- Forge and Hardhat cannot execute frame opcodes; on chain 1337 only APPROVE and SIGPARAM were verified on the devnet, the rest come "from the EIP text" ([@forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support)).
- The canonical mempool allows SLOAD only on `tx.sender` storage, bans TIMESTAMP and SSTORE in the prefix, and allows one pending frame transaction per sender ([EIP-8141 mempool](https://eips.ethereum.org/EIPS/eip-8141#mempool)). ERC-8421 adds associated storage (STORAGE-021), staked reads (STORAGE-031, -032), state-writing `pre_verify` and per-key nonce limits ([ERC-8421 PR #2028](https://github.com/ethereum/ERCs/pull/2028)).
- The sidecar runs the earlier PR #6 rules: 4 linear transactions per sender, no cap on keyed ones, unstake delay 0 ([docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md)). Sending a type-0x06 transaction straight to ethrex with `eth_sendRawTransaction` applies the canonical rules instead (`frame_tx_alt_mempool.md` Q2).
- Chain 1337 has replayed USDT, USDC, Permit2, Uniswap v4 and a staking registry ([deployments/devnet.md](https://github.com/forshtat/mempool-workshop-sidecar/blob/HEAD/deployments/devnet.md)); the event devnets 1 to 3 had no public parameters before the event.

### 4.1 Ranked table

| Rank | Idea | Overall | Verdict | Stack |
|---|---|---|---|---|
| 1 | B1 RuleDiff: fuzz the admission node against its own spec | 7.6 | New (replaces M3 Framekit) | EF alt mempool only |
| 2 | B2 Paymaster Gauntlet: attack any alt mempool paymaster before an attacker does | 7.4 | Keep (M2) | EF alt mempool only |
| 3 | B3 Lanes: a hot wallet with parallel, single-use, cold-approved withdrawals | 7.1 | New (replaces M5 Keyring) | EF alt mempool only |
| 4 | B4 Brakeline: a spend budget and a guardian freeze read from outside the account | 6.6 | Revise (M1) | EF alt mempool only |
| 5 | B5 Swapgas: pay gas from a Uniswap v4 swap, with bounded invalidation | 6.3 | Revise (M4) | EF alt mempool + Uniswap Foundation |

### 4.2 Verdicts on the draft

- **M1 Brakeline: revise.** The draft's promise ("49 refused by the alt mempool because the quota counter ... is spent") is wrong: pending transactions are validated against current state, so all 50 pass simulation until the first is included; the sidecar caps linear transactions per sender at 4 anyway. A "daily" quota needs a time source and TIMESTAMP is banned in the prefix. A quota held in the account's own storage and updated in the body is canonical-compatible, so it does not show "relation to the alt mempool". Chainlink CRE is removed: **Judgement (verify)**, a CRE workflow writing to an ad hoc devnet is unlikely to be supported. Improved version is B4.
- **M2 Paymaster Gauntlet: keep.** Team-native, reusable, and the exploit transactions are themselves admitted transactions. Two fixes: it cannot run in Forge, so every check is a devnet transaction; and its central `pre_verify` check depends on FRAMEPARAM status 0x05 working on the event devnet.
- **M3 Framekit: drop.** `hegota-support` already ships `explainRejection()`, which maps node errors to rule families, so the "why was I rejected" decoder exists; a viem plugin is the named, obvious tooling idea and several teams will submit it; the promise depends on other teams adopting it by Friday night. Replaced by B1 RuleDiff. Draft scores: 5, 7, 7, 7, 7; Novelty 4; Feasibility 8; overall 6.4.
- **M4 gasless v4 swap: revise.** Reading live pool state in validation makes every pending sponsored swap invalid after any swap on that pool, which is the mass invalidation case ERC-8421 is built to stop; the alt mempool judges will ask this first. Improved version is B5.
- **M5 Keyring: drop.** If guardians live in the account's own storage, the canonical mempool already accepts the recovery, so "relation to the alt mempool" is weak; recovery wallets are saturated among finalists (`reports/ETHGlobal finalist ideas 2023 to 2026.md`). Replaced by B3 Lanes, whose core contrast exists only in the alt mempool. Draft scores: 5, 6, 6, 6, 5; Novelty 4; Feasibility 7; overall 5.6.

### 4.3 B1 RuleDiff: fuzz the admission node against its own spec (rank 1, 7.6, new)

- **Pitch.** RuleDiff turns the ERC-8421 draft into an executable rulebook keyed by rule ID, generates frame transactions that sit on rule boundaries, and runs each through three judges: canonical ethrex, the alt mempool sidecar and the rulebook. Every disagreement comes with a reproducing transaction, and the worst one comes with a sidecar PR.
- **Facts it rests on.** The prize's third area asks for "DoS vectors and vulnerabilities, new rules, simulators and fuzzers". The workshop README says the devnet rules are "not equivalent" to ERC-8421 ([mempool-workshop](https://github.com/forshtat/mempool-workshop)); the docs quote 250k and 2.5M budgets where the draft says 100k and 1M ([docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md)); the sidecar applies a flat 100k cap before stake (`plans/reviews/judge_alt_mempool.md`). `ethrex_simulateFrameTransaction` returns `valid`, `prefixShape`, `violation` and a full `erc7562Trace`, and `eth_estimateFrameTransactionGas` runs the sidecar's validation path ([rpc-methods](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/reference/rpc-methods.md)). Nethermind is known to admit frame transactions over MAX_VERIFY_GAS ([bogota-devnet-1](https://notes.ethereum.org/@ethpandaops/bogota-devnet-1)). Our simulated alt mempool reviewers said they "would weigh a merged or mergeable PR heavily".
- **Falsifiable promise.** "Every divergence RuleDiff reports replays from a single command against the named devnet, with the rule ID it violates and both verdicts; we report the count, including zero."
- **Demo moment (20 s).** A divergence table fills: "staked payer, prefix 140k: draft ADMIT (BUDGET-010), sidecar REJECT (structure), canonical REJECT". Click a row: the reproducing transaction replays live, then the patched sidecar from the team's PR admits it on the local stack. One admitted transaction link from the event devnet closes the beat.
- **Requirement checklist.**
  - Qualification: code that submits admitted transactions (every passing corpus entry) plus explorer links. Pass.
  - "explain the design, the code and the trade-offs": the rulebook is the explanation; each rule cites its draft ID.
  - Shared devnet etiquette: most of the corpus runs through the read-only estimate and simulate paths or a local ethrex plus sidecar; only a handful of transactions go to the shared devnet; no `debug_bundler_clear*` or `set*` calls (`frame_tx_alt_mempool.md` Q8).
- **Why it beats rivals (Judgement).** The judges wrote the rules and the sidecar; a tool that finds where their code and their spec disagree is the most direct "relation to the alt mempool" possible. Fuzzing is the team's home ground. Expect at most one rival fuzzer.
- **Closest prior winners.** SkaffoldMACI (London 2024 2nd, found and fixed a protocol bug, PR #1304); maci-subgraph (Circuit Breaker 2024, upstream PR #1203). No finalist targeted mempool rules (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).
- **Stack.** TypeScript, `@forshtat/hegota-support` (codec and profiles), a rulebook evaluator over `erc7562Trace`, local ethrex (`forshtat/ethrex` branch `eip8141-tracer`) and the sidecar in Docker, Solidity probe contracts.
- **Difficulty.** Medium. **Team fit:** maximal.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| creativity | 7 | Differential testing is known; applying it to a draft ERC and its reference node is new |
| usefulness | 8 | The rule authors and every client team can use the divergence list |
| practicality | 7 | Runs locally; corpus reusable as conformance tests |
| how well it works | 7 | Known divergences seed it, so it cannot come back empty |
| relation to the alt mempool | 10 | It is about the alt mempool rules themselves |
| Novelty | 7 | No prior build; our own proposal |
| Feasibility | 7 | Local stack setup is the main risk |
| **Overall** | **7.6** | |

- **Judge notes.** Alt mempool judge: "Label which divergences are sidecar bugs and which are spec ambiguities. A PR we can merge this weekend beats ten findings." Veteran: "Jargon-heavy for the finalist room; keep the video on one divergence and one fix. Get the local stack running Thursday night or fall back to estimate-only on the devnet."

### 4.4 B2 Paymaster Gauntlet: attack any alt mempool paymaster before an attacker does (rank 2, 7.4, keep)

- **Pitch.** A devnet test suite that runs a paymaster through every documented frame-transaction paymaster failure and reports which ones drain it, plus a reference ERC-20 paymaster that passes all of them.
- **Facts it rests on.** If `transfer(sponsor, fees)` fails, the user's call still runs for free ([Magicians #178](https://ethereum-magicians.org/t/frame-transaction/27617/178)); false-returning tokens need handling ([#180](https://ethereum-magicians.org/t/frame-transaction/27617/180)); a reverted `pre_verify` does not invalidate the transaction, so an approving frame that ignores FRAMEPARAM status pays for it ([ERC-8421 PR #2028](https://github.com/ethereum/ERCs/pull/2028)); an attacker can set a post_op state limit to 0 so the charge write halts (`plans/reviews/judge_alt_mempool.md` 2.2). The prize names "ERC20 paymasters".
- **Falsifiable promise.** "Point the Gauntlet at a paymaster; within ten minutes it either lands a devnet transaction that makes the paymaster pay for a free or reverted call, or prints a green scorecard. The naive example fails; our reference passes."
- **Demo moment (20 s).** Naive paymaster: red rows with explorer links ("pre_verify transfer failed, APPROVE still ran, paymaster paid"). Reference paymaster: green.
- **Requirement checklist.** Admitted transactions: the exploit transactions and the reference sponsored transactions. Trade-offs: which checks are paymaster logic and which are mempool rules. Only the team's own paymasters are attacked.
- **Why it beats rivals (Judgement).** Several teams will build an ERC-20 paymaster; this attacks theirs (with consent) and ships the safe one. It is usable on Saturday morning by the judges.
- **Closest prior winners.** Open Paymaster (Buenos Aires 2025 EIL 1st); maci-subgraph.
- **Stack.** Solidity (`HegotaSupport.sol` helpers, starting from the workshop's public `SponsorPaymaster`), TypeScript runner on `hegota-support`, replayed USDT and USDC.
- **Difficulty.** Medium. **Team fit:** maximal.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| creativity | 6 | Edge cases are already documented |
| usefulness | 8 | Every paymaster author needs it |
| practicality | 8 | Runs against any devnet address |
| how well it works | 8 | Deterministic checks |
| relation to the alt mempool | 9 | `pre_verify`, solvency and ERC-20 paymasters are alt mempool features |
| Novelty | 6 | Known failure list, new executable form |
| Feasibility | 7 | No Forge; FRAMEPARAM unverified on chain 1337 |
| **Overall** | **7.4** | |

- **Judge notes.** Alt mempool judge: "Add one check we have not written down yet and it moves from useful to creative." Veteran: "Can be folded into RuleDiff as its application-level suite if the team wants one entry."

### 4.5 B3 Lanes: a hot wallet that cannot be pre-signed away (rank 3, 7.1, new)

- **Pitch.** A treasury or exchange hot wallet as a frame-transaction account. Each withdrawal uses its own nonce key derived from a withdrawal ID, so twenty withdrawals sit in the alt mempool at once where the canonical pool allows one, and validation admits a withdrawal only if the cold side has posted an approval root that contains it.
- **Facts it rests on.** Canonical rule: at most one pending frame transaction per sender ([EIP-8141 mempool](https://eips.ethereum.org/EIPS/eip-8141#mempool)). The sidecar has no cap on keyed transactions per sender ([docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md)); the event devnets will run "keyed nonces and recent roots live" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). The Binance drain relied on authorizations signed "for 50 consecutive nonces" so "one would still be valid" ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). ERC-8421 calls mass invalidation non-viable only if invalidating N transactions costs N times X ([ERC-8421 PR #2028](https://github.com/ethereum/ERCs/pull/2028)).
- **Falsifiable promise.** "Twenty approved withdrawals are pending at once from one sender in the alt mempool, while canonical ethrex refuses the second. A stolen hot key signing fifty unapproved withdrawals gets none admitted and burns no gas. Revoking one approval invalidates exactly one pending transaction."
- **Demo moment (20 s).** Explorer shows 20 pending lanes from one account; the same batch sent to canonical ethrex stops at one. The "attacker" script signs 50 withdrawals with the hot key: 0 admitted, rejection reason shown. The cold key revokes one ID: one lane disappears, nineteen settle.
- **Requirement checklist.** "something only an alt mempool makes possible": many pending transactions per sender through keyed nonces. Admitted transactions: 20 links. Trade-offs: validation reads only the account's own storage (approval roots and a revoked bitmap), so invalidation is one transaction per cold write; binding of the transfer to the approved leaf is re-checked in the SENDER frame, which avoids depending on FRAMEDATALOAD. Honest limit: a compromise of both the hot key and the cold approval pipeline still drains, as it might have at Binance.
- **Why it beats rivals (Judgement).** It shows the cleanest canonical-versus-alt contrast in one screen, uses the keyed nonces the organisers advertise, and speaks to the week's headline without overclaiming. Few teams will think of throughput plus single-use signatures.
- **Closest prior winners.** REIL (Buenos Aires 2025 EIL 2nd, batch transaction construction, [page](https://ethglobal.com/showcase/reil-v8bq8)); Open Paymaster.
- **Stack.** Solidity account on `HegotaSupport.sol`, Merkle approvals, TypeScript signer and batch submitter on `hegota-support`, replayed USDT.
- **Difficulty.** Medium. **Team fit:** high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| creativity | 7 | Keyed nonces as single-use withdrawal lanes |
| usefulness | 7 | Exchanges, payroll and payout engines |
| practicality | 7 | Validation under 30k gas, own storage only |
| how well it works | 7 | Depends on keyed nonces being live as advertised |
| relation to the alt mempool | 8 | Parallel pending is alt-only; security part is not |
| Novelty | 7 | No prior build found |
| Feasibility | 7 | Small contract, scripted demo |
| **Overall** | **7.1** | |

- **Judge notes.** Alt mempool judge: "Tell us what SAME_NONCE_KEY and per-sender limits you hit and whether a staked sender changes them." Veteran: "Lanes and Brakeline share a theme; build one, not both."

### 4.6 B4 Brakeline: a spend budget and a guardian freeze read from outside the account (rank 4, 6.6, revise)

- **Pitch.** A personal or agent hot wallet whose validation checks a declared amount against a refillable spend budget and reads a freeze flag from an external guardian registry; a watchtower subscribed to the alt mempool sees a pending drain and freezes the account before inclusion.
- **What changed from the draft.** No daily clock (budget refilled only by the cold key, so no TIMESTAMP); the declared amount travels in the VERIFY frame's calldata and the SENDER frame enforces actual outflow at most the declared amount; the alt-only part is named honestly: the guardian flag sits in an external contract slot associated with the sender (STORAGE-021), which the canonical mempool cannot read; the promise counts inclusions, not admissions; CRE is removed.
- **Facts it rests on.** Canonical SLOAD only on sender storage, TIMESTAMP banned ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141#mempool)); associated storage readable once the sender exists (STORAGE-021, [ERC-8421](https://github.com/ethereum/ERCs/pull/2028)); `skandha_subscribe` streams pending frame transactions ([rpc-methods](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/reference/rpc-methods.md)); chain 1337 has 6 s blocks (`frame_tx_alt_mempool.md` Q2).
- **Falsifiable promise.** "Over 20 trials, a drain submitted with a stolen hot key is included in at most N of them, where N is measured and shown; with the guardian flag set, none is admitted; the canonical mempool refuses the account's transactions because validation reads the guardian registry."
- **Demo moment (20 s).** The attacker script submits a drain; the watchtower pane flashes "pending drain from 0x..., freezing"; the explorer shows the freeze included and the drain dropped. The trial counter shows the measured race outcome.
- **Requirement checklist.** Area 1 ("more flexible state access in sender"); admitted transactions; trade-offs: the freeze is a race the watcher can lose, and a shared guardian can invalidate many accounts' pending transactions at the cost of one SSTORE each.
- **Why it beats rivals (Judgement).** "The mempool is the tripwire" is a new idea, but the race makes it fragile, and B3 makes the same point with less risk.
- **Closest prior winners.** Zkipper (Cannes 2025 Mopro 2nd); Banganoir (Circuit Breaker 2024, 4337 wallet).
- **Stack.** Solidity account and guardian registry on `HegotaSupport.sol`, TypeScript watchtower on `skandha_subscribe`.
- **Difficulty.** Medium to high. **Team fit:** high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| creativity | 8 | Watchtower on the alt mempool itself |
| usefulness | 7 | Hot wallets and agents |
| practicality | 6 | Post-Hegota only; race-dependent |
| how well it works | 6 | Freeze ordering is not under the team's control |
| relation to the alt mempool | 7 | External guardian read and mempool visibility |
| Novelty | 7 | Not seen before |
| Feasibility | 5 | FRAMEPARAM and ordering unknowns |
| **Overall** | **6.6** | |

- **Judge notes.** Alt mempool judge: "Why not just enforce the budget in the body? Have the answer ready: invalid transactions are never included and pay nothing." Veteran: "Only if Lanes is ruled out at the workshop."

### 4.7 B5 Swapgas: a zero-ETH wallet pays gas out of its own Uniswap v4 swap (rank 5, 6.3, revise)

- **Pitch.** A staked paymaster sponsors a USDC to ETH v4 swap and is repaid from the output in the same transaction. Validation reads a price snapshot that a keeper may update at most once every k blocks, so pending sponsored swaps are invalidated at most once per k blocks instead of after every swap on the pool.
- **What changed from the draft.** The direct pool read stays as a measured comparison mode, not the design; the hook is a stretch; the README reports "pending sponsored swaps invalidated per pool swap" in both modes.
- **Facts it rests on.** Prize text names ERC-20 paymasters; staked entities may read their own and non-entity storage (STORAGE-031, -032, [ERC-8421](https://github.com/ethereum/ERCs/pull/2028)); v4 and Permit2 are replayed on chain 1337 ([deployments/devnet.md](https://github.com/forshtat/mempool-workshop-sidecar/blob/HEAD/deployments/devnet.md)); Uniswap requires a public repo, FEEDBACK.md, the feedback form, and a README that points to the lines ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- **Falsifiable promise.** "A wallet with 0 ETH completes a v4 swap and pays its own gas; with the snapshot rule, one pool swap invalidates zero pending sponsored swaps until the next snapshot; in direct-read mode it invalidates all of them, and we show both counts."
- **Demo moment (20 s).** Balance 0 ETH, swap, explorer shows the paymaster repaid. A bot swaps the pool ten times: the direct-mode counter jumps, the snapshot-mode counter stays flat.
- **Requirement checklist.** EF: admitted transactions; the trade-off is that the snapshot can be stale, so the paymaster prices a margin. Uniswap: v4 swap code lines in the README, FEEDBACK.md, form.
- **Why it beats rivals (Judgement).** Rivals will ship ERC-20 paymasters that read live state; the invalidation measurement is the differentiator. Integration risk is the highest in the track.
- **Closest prior winners.** Open Paymaster; DeCredit Wallet (LFGHO 2024, per the draft).
- **Stack.** Solidity paymaster and keeper, v4 PoolManager swap, `hegota-support`, staking registry.
- **Difficulty.** Medium to high. **Team fit:** high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| creativity | 7 | Invalidation-bounded oracle |
| usefulness | 7 | The flagship use case |
| practicality | 5 | Devnet only; v4 on event devnets unknown |
| how well it works | 5 | Many integration points |
| relation to the alt mempool | 9 | Staked reads and the invalidation question |
| Novelty | 6 | ERC-20 paymasters are the obvious entry |
| Feasibility | 5 | Stake, v4, swap repayment, measurement |
| **Overall** | **6.3** | |

- **Judge notes.** Alt mempool judge: "The counter comparison is what we want to see." Veteran: "Do not start unless v4 is on the event devnet you will use."

---

## 5. Best CROPS App ($3,500: $2,000 / $1,000 / $500)

### 5.1 Ranked table

| Rank | Idea | Overall | Verdict | Stack |
|---|---|---|---|---|
| 1 | C1 Truthsign: the clear-signing screen must match what the transaction does | 7.3 | New (replaces C5 Gasdiff) | EF CROPS + Arkiv Mirror (optional) + Chainlink CRE (optional) |
| 2 | C2 Walkaway: leave a DeFi position with the protocol's site, API and RPC companies gone | 7.1 | New (replaces C3 Namesake) | EF CROPS + Uniswap Foundation |
| 3 | C3 CROPS Check: a CI gate that keeps trackers and keyed RPCs out of what ships | 7.1 | Keep (C4) | EF CROPS only |
| 4 | C4 Fire Drill: prove a wallet can be recovered if its company disappears | 7.0 | Revise (C2) | EF CROPS only |
| 5 | C5 Sieve: local signing rules fed by lists no single host controls | 6.9 | Revise (C1) | EF CROPS + Arkiv Mirror |

### 5.2 Verdicts on the draft

- **C1 Sieve: revise.** MetaMask-class wallets do not let dapps request batches of raw 7702 authorizations, so the "test dapp asks for 50 authorizations" beat is unrealistic; signing firewalls are a crowded finalist genre (maki, ENShell, Aegis402, Oh Snap!). The real CROPS point is that vendor security extensions see every transaction you sign. Improved version is C5.
- **C2 Fire Drill: revise.** A real user cannot sign as their guardians on a fork, so the drill must say what it proves: the onchain path completes with vendor domains blocked, given guardian signatures, and it names any guardian key the vendor holds. Improved version is C4.
- **C3 Namesake: drop.** Recovery is saturated; an ENS name that expires takes the account's key record with it (a C dependency the draft does not state); two prizes pull the scope apart. Replaced by C2 Walkaway, the finalist report's first recommendation. Draft scores: 7, 7, 6, 7, 6; Novelty 6; Feasibility 6; overall 6.4.
- **C4 CROPS Check: keep,** with two fixes: emit an evidence table and a coverage line instead of drafting README prose (judges may read generated CROPS lines as gaming their own qualification), and never call a result an EF rating.
- **C5 Gasdiff: drop.** The draft itself rates its CROPS fit "Low for EF"; it needs a client with the EIP-8037 and -8038 schedules; it is a finalist-only bet with no EF home. Replaced by C1 Truthsign. Draft scores: 6, 4, 8, 4, 6; Novelty 8; Feasibility 4; overall 5.7.

### 5.3 C1 Truthsign: the signing screen must match the effect (rank 1, 7.3, new)

- **Pitch.** A library a wallet calls before it clear-signs: it runs the transaction on a fork and checks that every field the ERC-7730 descriptor puts on screen matches what the transaction actually does. If a field lies, the wallet refuses to clear-sign and falls back to a raw warning. A registry-wide sweep reports how many public descriptors disagree with their contracts.
- **Facts it rests on.** Clear Signing still needs "accuracy verification and expert attestations" ([EF blog, 12 May 2026](https://blog.ethereum.org/en/2026/05/12/clear-signing-announcement)); the EF hosts the descriptor registry ([clear-signing-erc7730-registry](https://github.com/ethereum/clear-signing-erc7730-registry)); Trezor shipped ERC-7730 with descriptors from 1inch, Aave, Lido, Tether, LiFi and Hyperliquid ([Crypto Briefing](https://cryptobriefing.com/trezor-clear-signing-erc-7730/)). Prior art: Clear Signing Studio (Cannes 2025), a descriptor toolkit that generates metadata but does not verify it ([showcase](https://ethglobal.com/showcase/clear-signing-studio-6hs1z)). Signing-safety finalists check other things: LeekDIYHardwareWallet refuses what it cannot display ([page](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg)), Oh Snap! shows community notes ([page](https://ethglobal.com/showcase/oh-snap-4u2kv)), maki simulates and policy-checks ([page](https://ethglobal.com/showcase/maki-564eg)).
- **Falsifiable promise.** "For a descriptor that maps 'recipient' to the wrong argument, Truthsign blocks clear-signing every time; across the registry we publish the number of descriptor fields whose displayed value disagrees with the fork effect under fuzzing, including zero, with a replay command for each."
- **Demo moment (20 s).** Left: a wallet screen reads "Send 100 USDC to alice.eth". Right: the fork shows 100 USDC landing at another address. Truthsign blocks and shows raw calldata. Closing card: "N of M registry descriptors disagreed; reports filed upstream".
- **Requirement checklist.**
  - Q1: MIT or Apache-2.0, README runnable with one command. Q2: CROPS lines (C: needs only a fork source, which can be the user's own node; O: licence and build; P: user-side checks read through Anon-RPC, the CI sweep uses the team's RPC key, stated; S: deterministic checks, the trust assumption is the fork's state source). Q3: video under 3:00 with the block moment. Q4: no trackers; nothing leaves the device beyond the reads. Q5: one EF prize.
  - Lead property S ("Things must do what they claim to do"), made structural by running inside the signing path.
  - Won't place (trackers): none.
- **Why it beats rivals (Judgement).** Nobody verifies descriptors against code; the method is differential fuzzing, which is this team's craft; and it ties to WazirX (a multisig that signed what it could not see) and the Binance week. It is also the EF idea with the best finalist chance.
- **Closest prior winners.** Zkipper (Cannes 2025 Mopro 2nd, signing roles against Bybit-style attacks); MobiScale (Cannes 2025 Mopro 1st, praised for "practical approach"). Finalists above as non-EF comparisons.
- **Stack.** TypeScript renderer for a subset of ERC-7730 formats (token amount, address name, raw), Anvil fork, a fuzzer for descriptor parameters, effect extraction from Transfer and Approval logs and balance diffs, an EIP-1193 wrapper demo wallet. Optional partners in the combo pass.
- **Difficulty.** Medium. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 7 | Planted case is deterministic; the sweep is the risk |
| depth of the lead property | 8 | Refusal sits in the signing path, not in a report |
| the other three still hold | 7 | Fork data source is the stated dependency |
| UX without knowing CROPS | 7 | "The screen lied, so we stopped" needs no glossary |
| could ship after the hackathon | 7 | A library and a CI sweep the registry can adopt |
| Novelty | 9 | Unaddressed gap the EF names |
| Feasibility | 6 | ERC-7730 format learning curve |
| **Overall** | **7.3** | |

- **Judge notes.** EF judge: "Show completeness too: a transaction that moves funds the screen never mentions should also fail." Veteran: "Ship the planted case first, then the sweep. Disclose any real mismatch to the registry before the video names it."

### 5.4 C2 Walkaway: leave a DeFi protocol without its team (rank 2, 7.1, new)

- **Pitch.** One local HTML file that withdraws your Aave, Morpho vault or Uniswap position with the protocol's site, its API and every RPC company blocked; reads arrive through Anon-RPC and are checked by a light client; where you cannot leave, it names the key, keeper or hook that can stop you.
- **Facts it rests on.** The CROPS prize lists "a frontend that keeps working when its domain, backend or RPC provider disappears"; the Mandate's walkaway test asks layers to keep working "even if the Foundation and today's core developers disappeared tomorrow" ([Mandate](https://blog.ethereum.org/2026/03/13/ef-mandate)); no finalist exits third-party positions without their frontends (`reports/ETHGlobal finalist ideas 2023 to 2026.md`); the tor-js demo gateway "may disappear at any time" ([adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)); Privacy Pools pins the worker hash client side ([tor-fetch.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts)).
- **Falsifiable promise.** "With app.aave.com, the Uniswap interface and the major RPC hosts blocked in the hosts file, a real $5 mainnet position leaves Aave from a file on a USB stick; on a fork with the vault's keeper switched off, Walkaway shows red and names the keeper."
- **Demo moment (20 s).** Hosts file edited on screen; `walkaway.html` opens from a USB stick; the Aave card withdraws; the explorer confirms. A second card turns red: "this v4 pool's hook has beforeRemoveLiquidity permission and can refuse your exit".
- **Requirement checklist.**
  - Q1 to Q5 as for C1. C line names what remains: the tor-js gateway (user can add gateways), the Colibri prover, and the wallet that signs. P line: the user's wallet broadcasts through its own RPC unless it can sign raw transactions (Ledger over WebHID is the stretch); Walkaway itself broadcasts signed raw transactions through Anon-RPC. S: no keys in the file.
  - Lead property C, structural: nothing of the team's is in the path.
  - EF may place it in Anon-RPC instead, since reads go through Anon-RPC by default; either is fine.
- **Why it beats rivals (Judgement).** Rivals will pin an IPFS copy of one protocol's frontend; Walkaway exits positions the user already holds across protocols and states who can still block them, which is the Mandate's test applied rather than quoted.
- **Closest prior winners.** BackItUp (ETHIndia 2023 EF 1st, recovery without the vendor, [page](https://ethglobal.com/showcase/backitup-oghff)); UNSU (2026 finalist, a wallet with no app or account, [page](https://ethglobal.com/showcase/unsu-o1e71)).
- **Stack.** Vite single-file build, `@anon-rpc/browser-harness` with a pinned tor-js worker, Colibri, viem, raw exit calldata for Aave v3, Morpho ERC-4626 vaults and Uniswap v3 and v4 positions, v4 hook permission decoding.
- **Difficulty.** Medium. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 7 | Real mainnet exit; Tor latency needs pre-warming |
| depth of the lead property | 9 | Works with the team and the protocol gone |
| the other three still hold | 7 | Gateway, prover and signing wallet are stated dependencies |
| UX without knowing CROPS | 7 | "Get your money out if the app is gone" |
| could ship after the hackathon | 6 | Exit adapters rot as protocols upgrade |
| Novelty | 8 | No finalist did it |
| Feasibility | 6 | Colibri through the worker and the write path |
| **Overall** | **7.1** | |

- **Judge notes.** EF judge: "The write path is where CROPS apps usually cheat. Tell us exactly which RPC your signer used." Veteran: "Three adapters maximum; Aave and Uniswap v4 first."

### 5.5 C3 CROPS Check: a CI gate that keeps trackers, keyed RPCs and remote scripts out of what ships (rank 3, 7.1, keep)

- **Pitch.** A GitHub Action and CLI that builds the client, scans the bundle and a headless run, fails the PR when a third-party tracker, an API-keyed RPC URL, a remote script or a non-FOSS dependency appears, and emits a strict CSP that the app then ships, so the browser blocks anything CI missed.
- **Fixes from this pass.** Output is an evidence table plus a coverage line ("observed in: load, connect; not tested: signing, swaps"), not generated README prose; no grades; "Not an EF rating" on every report.
- **Facts it rests on.** Qualification 4 bans "third-party trackers or analytics in the client"; the prize lists "a tool that shows what an app leaks"; our simulated panel's main fix for a leak tool was to "Emit and enforce a CSP allowlist ... so the tool changes what ships" (`plans/reviews/judge_ef_access_layer.md`); Privacy Pools recorded "108 per-nullifier `eth_call`s issued by SDK internals during a single send" ([egress-transport.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/egress-transport.ts)); the Mandate says the EF does not "certify or endorse projects" (quoted in the same review).
- **Falsifiable promise.** "Add one analytics snippet or one keyed RPC URL to a passing repo and the PR goes red with file and line; remove it and it goes green; and the deployed CSP blocks the snippet even if CI is bypassed."
- **Demo moment (20 s).** A PR adds a tracker: red check. Merge blocked. On the live site with the generated CSP, an injected tracker is blocked in the console.
- **Requirement checklist.** Q1 to Q5 met by design; lead P and O; structural because the CSP ships with the app.
- **Why it beats rivals (Judgement).** Several leak reporters will appear; this one prevents. Low WOW, high certainty.
- **Closest prior winners.** SkaffoldMACI (reusable developer tooling); How Doxxed Am I? (finalist, reporting only).
- **Stack.** Node CLI, Playwright, open tracker lists with compatible licences, a CSP generator, a GitHub Action.
- **Difficulty.** Low to medium. **Team fit:** medium to high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 8 | Fully under the team's control |
| depth of the lead property | 6 | Enforced CSP is structural; adoption is opt-in |
| the other three still hold | 8 | Local, FOSS, no data leaves |
| UX without knowing CROPS | 6 | Developer audience |
| could ship after the hackathon | 8 | An Action anyone can add |
| Novelty | 5 | Leak tools are common; enforcement is the twist |
| Feasibility | 9 | Well-trodden tooling |
| **Overall** | **7.1** | |

- **Judge notes.** EF judge: "Useful, and every CROPS entrant this weekend could use it. It will not beat a working structural app on the tiebreak." Veteran: "Good fallback if a riskier build dies on Friday."

### 5.6 C4 Fire Drill: prove your wallet can be recovered if its company disappears (rank 4, 7.0, revise)

- **Pitch.** Paste a smart account address; Fire Drill reads its recovery path from chain state (owners, modules, guardians, delays), forks mainnet, blocks the vendor's domains, and executes the recovery end to end, given the guardian signatures. Where a guardian key is held by the vendor, it says so.
- **What changed from the draft.** The claim is narrowed to "the onchain path completes without vendor servers, given guardian signatures"; it flags vendor-held guardian keys; three adapters (Safe with owners and a recovery module, a passkey smart wallet, a 7702-delegated EOA); reads through Anon-RPC.
- **Facts it rests on.** The prize lists "a wallet a user can fully recover with nothing from you: no server, API or relayer"; Walletbeat rates wallets on these properties by hand ([Walletbeat](https://walletbeat.eth.limo)); the EF's payments domain asks for "a user-broadcastable equivalent" of relayer flows ([payments domain](https://github.com/ethereum/access-layer-resources/blob/HEAD/domains/payments.md)).
- **Falsifiable promise.** "For each supported account type, Fire Drill either completes recovery on a fork with the vendor's domains blocked, or names the server or vendor-held key the recovery depends on."
- **Demo moment (20 s).** A Safe with a recovery module: drill passes with the vendor domain blocked. A second account: red, "guardian 0x... is operated by the vendor".
- **Requirement checklist.** Q1 to Q5; lead C (the walkaway test as a tool); P holds through Anon-RPC reads.
- **Why it beats rivals (Judgement).** Rivals build one more recovery wallet; Fire Drill tests all of them. It still loses the structural tiebreak to a working wallet, which caps it below C1 and C2.
- **Closest prior winners.** BackItUp (ETHIndia 2023 EF 1st, Safe recovery module).
- **Stack.** Anvil, viem, adapters per account type, React report, `@anon-rpc/browser-harness`.
- **Difficulty.** Medium. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 7 | Team-made accounts on a fork |
| depth of the lead property | 7 | Measures structure rather than providing it |
| the other three still hold | 8 | Local, FOSS, private reads |
| UX without knowing CROPS | 7 | "Can you recover if the company dies?" |
| could ship after the hackathon | 6 | Adapters need upkeep |
| Novelty | 8 | No executable recovery drill found |
| Feasibility | 6 | Adapter work |
| **Overall** | **7.0** | |

- **Judge notes.** EF judge: "Send the results to Walletbeat and this becomes infrastructure." Veteran: "Two adapters done well beat three half done."

### 5.7 C5 Sieve: signing rules that run on your device, fed by lists no single host controls (rank 5, 6.9, revise)

- **Pitch.** A browser extension that wraps the wallet's provider and checks every transaction and typed-data request locally against transparent rules and open lists, with no request to a security vendor; lists are mirrored to Arkiv so no single host can censor or watch list updates.
- **What changed from the draft.** Targets the requests dapps can actually make (unlimited approvals and Permit or Permit2 signatures to unlisted spenders, setApprovalForAll to fresh contracts, transfers to listed drainers, wallet_sendCalls batches); the pitch leads with "vendor security extensions see every transaction you sign"; 7702 batch detection is for self-hosted signers only.
- **Facts it rests on.** The EF's wallet guarantee for "locally verifiable filters and community-maintained lists with override paths" has no card yet (`ef_goals_and_gaps.md` Q7); Arkiv's Mirror track lists "address labels" and requires that "The data's license allows republishing" ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).
- **Falsifiable promise.** "With the network off, a Permit2 signature to an unlisted spender is refused, the screen names the rule and list, and no request leaves the device; switching off one list host changes nothing because the Arkiv mirror serves the list."
- **Demo moment (20 s).** Airplane mode; a test dapp asks for a Permit2 signature to an unknown spender; Sieve blocks and names the rule; override requires typing the spender. Network back; one list host is down; sync continues from Arkiv.
- **Requirement checklist.** Q1 to Q5; lead S with P; no telemetry by design.
- **Why it beats rivals (Judgement).** Signing firewalls are crowded; Sieve's only edge is no vendor in the loop. That is a real CROPS edge but a modest one.
- **Closest prior winners.** maki, ENShell and Oh Snap! are finalists in the same genre (non-EF); no EF winner.
- **Stack.** MV3 extension, EIP-6963 provider proxy, local ABI decoding, rule engine, Arkiv SDK.
- **Difficulty.** Medium. **Team fit:** very high.
- **Scores.**

| Criterion | Score | Reason |
|---|---|---|
| works end to end in the demo | 8 | Scripted test dapp |
| depth of the lead property | 7 | Local by construction |
| the other three still hold | 7 | List licences and Arkiv dependency stated |
| UX without knowing CROPS | 7 | Clear refusal screen |
| could ship after the hackathon | 6 | Provider wrapping is fragile; lists need curators |
| Novelty | 6 | Crowded genre |
| Feasibility | 7 | Known extension patterns |
| **Overall** | **6.9** | |

- **Judge notes.** EF judge: "Show the override path; the Mandate asks for one." Veteran: "Check list licences before the Arkiv import, or the Arkiv entry fails its own qualification."

---

## 6. Track combo pass (fresh-build tracks only)

Facts: at most 3 partner prizes; a partner with several tracks counts once; EF places a project in at most one EF prize; Arkiv pays one track plus the $500 Swarm bonus; the finalist track is separate ([event FAQ](https://ethglobal.com/events/mumbai); [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation); [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)). Partner prizes are judged only from repo, README and video ([details page](https://ethglobal.com/events/mumbai/info/details)). Continuity tracks are excluded.

| Idea | EF prize | Partner 2 | Partner 3 | Extra deliverables | Combo risk (Judgement) |
|---|---|---|---|---|---|
| A1 Slowlane | Anon-RPC | none | none | none | none |
| A2 Blindfork | Anon-RPC | none | none | none | none |
| A3 Twofold | Anon-RPC | none | none | none | none |
| A4 Afterdrain | Anon-RPC | Uniswap Foundation (Permit2 audit and `lockdown`) | none | FEEDBACK.md, feedback form, README line pointers | Whether Permit2 counts as "any other Uniswap protocol" is unconfirmed; gate at Fri 18:00 |
| A5 Hush | Anon-RPC | ENS "Best Use of ENSv2" | none | live demo link | ENSv2 on Sepolia unconfirmed |
| B1 RuleDiff | Alt mempool | none | none | none | none |
| B2 Gauntlet | Alt mempool | none | none | none | none |
| B3 Lanes | Alt mempool | none | none | none | Different chain from Whitechain, so no Whitechain stack |
| B4 Brakeline | Alt mempool | none | none | none | CRE dropped (devnet support unlikely, verify) |
| B5 Swapgas | Alt mempool | Uniswap Foundation | none | FEEDBACK.md, form, README lines | v4 must exist on the event devnet |
| C1 Truthsign | CROPS | Arkiv "Mirror something Ethereum depends on" (descriptors with verification status) | Chainlink "Best workflow with CRE" (scheduled registry sweep that fetches from GitHub and writes an attestation; "simulation is enough") | `/arkiv/*.md` files, writer address and one query, CRE CLI simulation output | Registry licence must allow republishing; CRE must be "meaningfully used" |
| C2 Walkaway | CROPS (may be placed in Anon-RPC) | Uniswap Foundation (v3 and v4 position exits, hook permission check) | none | FEEDBACK.md, form | none |
| C3 CROPS Check | CROPS | none | none | none | none |
| C4 Fire Drill | CROPS | none | none | none | none |
| C5 Sieve | CROPS | Arkiv "Mirror something Ethereum depends on" (lists) | none | `/arkiv/*.md`, re-runnable import | List licences |

Combos to avoid (Judgement, from verbatim rules in `00_current_tracks.md`): Arc with any CROPS entry ("Every Arc prize requires using Arc Studio as the starting point" pulls against O); Whitechain with any alt mempool entry (different chains); Hedera "No Solidity Allowed" with anything here; World Agent Pass with CROPS unless the backend is explained ("Validate identity results in a secure backend").

Best portfolios (Judgement):
1. **Highest EF odds:** B1 RuleDiff with B2's paymaster checks folded in as its application suite. EF only; finalist odds low.
2. **Most prize money from one build:** C1 Truthsign with Arkiv Mirror and Chainlink CRE (three partners), or C2 Walkaway with Uniswap Foundation (the largest single fresh prize, $10,000 over four places).
3. **Finalist shot that still fits EF:** C1 Truthsign or C2 Walkaway; both have one binary moment the team controls.

---

## 7. Ethereum Foundation's top 3 ideas overall (Judgement)

1. **B1 RuleDiff (7.6).** The alt mempool judges wrote the rules and the sidecar, and RuleDiff shows them where the two disagree, with a fix. Known divergences mean it cannot come back empty, almost no rival will attempt it, and fuzzing is the team's strongest skill. Weakness: little WOW for the finalist room.
2. **A1 Slowlane (7.6).** It closes a gap the Anon-RPC ecosystem lists as open (specifier upgrade governance) with a small, fuzzed contract and a host policy the EF can merge, and its two-tab beat is unambiguous. It follows the dnsRegistry-AVS and Open Paymaster pattern of removing a trusted operator from the sponsor's own stack. Weakness: placement depends on the EF accepting harness-policy work in this prize (workshop question 6).
3. **C1 Truthsign (7.3).** The most novel CROPS idea, aimed at a gap the EF names in its own clear-signing post, built with differential fuzzing, and the only EF idea here with a realistic finalist case. It ranks above higher-scoring Blindfork, Twofold and the Gauntlet because it covers a different EF prize, faces fewer rivals in that prize, and carries finalist and partner upside.

Runner-up: A2 Blindfork, if the team would rather use itself as the customer.

---

## 8. Questions for the Ethereum Foundation workshop and booth

Where and when: EF workshop Thu 5 Nov 17:00 to 17:30 IST, Workshop Room 2, no speaker listed; it clashes with Arc (17:00, Room 1), which is in no combo above ([event page](https://ethglobal.com/events/mumbai)). Pierre and Alex from the alt mempool team "will be on site to help" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). Ordered by how much the answer changes what to build or how to qualify; the ideas each answer affects are in brackets.

1. **Alt mempool devnets.** Which of devnet 1, 2 and 3 will be up from 21:00 Thursday, which `hegota-support` profile matches each, which rule set runs (sidecar PR #6 or the ERC-8421 draft), and does any enforce per-entity budgets (BUDGET-010) instead of the flat 100,000 prefix cap applied before stake? [B1 baseline; B5; whether any build above 100k is possible]
2. **Opcodes and `pre_verify`.** Are FRAMEPARAM (including status 0x05), FRAMEDATALOAD and TXPARAM verified on the event devnets, and is the state-writing `pre_verify` frame live? [B2 central check, B4, B5]
3. **Keyed nonces.** On the event devnets, how many pending transactions are allowed per (sender, key) and per sender for keyed transactions, does a staked sender change that, and does canonical ethrex still allow only one pending frame transaction per sender? [B3 core contrast]
4. **Fuzzing etiquette and where admission counts.** Is fuzzing and exploit traffic against our own contracts welcome on the shared devnets, at what rate; does an admission on a local ethrex and sidecar stack count, or must the qualifying transaction be on the public explorer; will you review a sidecar PR during the event, and does a mergeable PR count toward "usefulness"? [B1, B2]
5. **Storage rules and stake.** Are STORAGE-021, -031 and -032 enforced as drafted; what are minimum stake and unstake delay; what is the faucet URL and how much does it give? [B4 guardian slot, B5 staked paymaster]
6. **Placement of harness work.** Would you judge a timelocked specifier plus a host pin policy, or a Node host that runs the official browser harness in headless Chromium behind `localhost:8545`, as "implement/fork the anon-rpc harness" in Best Use of Anon-RPC, or move it to CROPS? [A1, A2]
7. **A new network.** Is an OHTTP worker acceptable if the team runs both relay and gateway and states that non-collusion is broken, may it use ambient `fetch` to the relay under SPEC §3.2, and would you add an OHTTP arm to the weekly bench? [A3]
8. **Traffic share.** Do you count writes (`eth_sendRawTransaction`) or reads only; does a pinned worker hash that skips the clearnet bootstrap read count as zero clearnet reads; is a fail-closed design with no direct path scored as 100%? [A1, A4, A5, C2]
9. **Gateways and isolation.** Will the EF run a tor-js gateway with weekend capacity, or should teams run their own; will any worker honour `isolationKey` (tor-js PR #20) by Thursday? [A2 lanes, every live demo]
10. **CROPS rubric.** Is the "(tbc: final review pending)" rubric final, and has any of the five qualifications changed? [all C ideas]
11. **Libraries and dev tools.** Do a library a wallet calls before rendering (Truthsign), a CI gate (CROPS Check) and a test tool (Fire Drill) compete on equal terms with end-user apps, and does "runs inside the signing path" count as structural? [C1, C3, C4]
12. **The video moment for a refusal.** For an S-led project whose key moment is a refusal, what do you want to see in the 3 minute video? [C1, C5]
13. **The write path.** If the user's wallet broadcasts through its own RPC, is a stated trade-off enough, or do you expect broadcast through Anon-RPC? [C2, A4]
14. **Fork data in CI.** Is a registry-wide sweep run on a mainnet fork with the team's own RPC key acceptable if every user-side check reads through Anon-RPC? [C1]
15. **Naming a preferred prize.** Should we name our preferred EF prize in the README, and does that limit where you place us? [all]
16. **Replayed contracts.** Are Uniswap v4, Permit2, USDT and USDC deployed on devnets 1 to 3 as on chain 1337, and at which addresses? [B5, B3, B2]
17. **Assertions.** Does any alt mempool event devnet run EIP-7906 assertions? [a possible post-condition extension of B3 or B4; not needed by any final idea]

---

## 9. Gaps

- Only the EF prize page was re-fetched today; partner track text comes from `00_current_tracks.md` (fetched earlier on 2026-10-31).
- Sidecar behaviour (flat 100k cap, PR #6 rules) comes from the team's source read of 2026-10-27; the event devnets may differ, which is why questions 1 to 5 come first.
- Colibri verification through `worker.fetch`, ENSv2 on Sepolia, the ERC-7730 registry licence and CRE support for devnets are unverified and marked where used.
- No idea was prototyped; difficulty and feasibility scores are estimates.
