# Ethereum Foundation at ETHGlobal Mumbai: idea draft (fresh builds only)

Written 2026-10-31 for a 3 person team (DeFi and smart contract security, strong Solidity, Foundry, fuzzing, auditing; TypeScript and React). Classic track, fresh build, no existing project. Continuity-only tracks ("Best CROPS Upgrade to an Existing Project") are ignored.

Companion file: `track_ideas/history/ef.md` (past EF tracks, winners and what the judges rewarded). Pattern tags used below (H1 to H7) are defined in section 6 of that file and summarised here:

- **H1 Centrality:** winners make the sponsor technology the mechanism, not a checkbox (Banganoir signs userOps with an Anon Aadhaar proof; ChillVille gates MACI sign-up with zkTLS).
- **H2 Hard gate first:** winners satisfy the literal qualification (proof on device, payloads attached, code in Fe), and teams that miss it vanish from the list.
- **H3 Ecosystem contribution:** infrastructure that other builders reuse wins (maci-subgraph with an upstream PR, FeFe's Fe test harness, Open Paymaster).
- **H4 One honest claim, demo-able:** winners state limits and mocks openly (Zkipper's "Mocked parts"), and Mopro's own write-up praises "practical" over grand.
- **H5 Composition:** 2 to 3 primitives composed into one product beat single-SDK demos (Votelik Pollerin: MACI plus World ID plus Pimlico; Zkipper: 7702 plus Falcon plus ZK).
- **H6 UX still counts:** third places go to the most polished app (Proov, ZeroSurf, Aadhaar Shield's QR compression).
- **H7 Thin wrappers lose:** apps that only "use X for voting" or "use X for age" without a new mechanism took no EF prize (zkElect, EZKPoll, AadhaarChain, ZKAge Proof Mobile).

How to read: sourced facts carry a URL or a repo path. Everything labelled **Judgement** (and all difficulty, odds and design choices) is our own reasoning.

---

## 0. Track requirements this draft is checked against (verbatim, from `track_ideas/00_current_tracks.md`, fetched 2026-10-31 from [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation))

**Rule across all three:** "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best."

**Best Use of Anon-RPC ($5,000: 2,500 / 1,500 / 1,000)**
- Qualification: "Your app routes its RPC reads through Anon-RPC by default. If you're building a worker or the harness, a simple demo app is enough."
- Criteria: "works end to end in the demo"; "quality of user experience in demo"; "how much of the app's traffic goes through Anon-RPC (if an app)" (with "if you choose to exclude some traffic as an intentional performance/anonymity tradeoff ... just let us know"); "could this be shipped for real after the hackathon"; "technical depth".
- Won't place: none published. **Judgement:** the implied trap is an opt-in toggle, which fails "by default".

**Best use of the Frame Transaction Alternative Mempool ($5,000: 2,500 / 1,500 / 1,000)**
- Areas: "something only an alt mempool makes possible" (verification above 100k, or "more flexible state access in sender or paymaster (e.g. ERC20 paymasters, daily quota paymasters)"); "developer tooling"; "break the rules and improve them".
- Qualification: "Show real alt mempool usage: a link to your admitted transaction on the devnet explorer, or code that submits one. Your team must be able to explain the design, the code and the trade-offs."
- Criteria: "creativity"; "usefulness"; "practicality"; "how well it works"; "relation to the alt mempool".
- Won't place: none published. **Judgement:** the implied trap is a build the public mempool would also accept, which scores zero on "relation to the alt mempool".

**Best CROPS App ($3,500: 2,000 / 1,000 / 500)**
- Qualifications 1 to 5: FOSS licence and a runnable README; a README section titled CROPS with C, O, P and S lines; "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters"; "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not."; one EF prize per project.
- Criteria (marked "(tbc: final review pending)"): "works end to end in the demo"; "depth of the lead property: structural (works without you) beats cosmetic (a setting)"; "the other three still hold, or trade-offs are stated in the README"; "UX: would someone use it without knowing what CROPS means"; "could it ship after the hackathon".
- Won't place: Qualification 4 ("No third-party trackers or analytics in the client").

**ETHGlobal rules that bind every idea** ([details page](https://ethglobal.com/events/mumbai/info/details)): all work starts after 21:00 IST Thu 5 Nov; public libraries and starter kits allowed; video 2 to 4 minutes, no AI voiceover (cut at 2:00 to 2:59 to satisfy the CROPS 3 minute cap too); steady commits; AI use attributed and spec files committed.

---

## 1. Best Use of Anon-RPC: five ideas

### R1. Afterdrain: a private 7702 and Permit2 checkup with one-click lockdown (stacks with Uniswap Foundation)

- **Pitch:** After the Binance drain, everyone wants to check their delegations and approvals; Afterdrain does it without telling an RPC company who is worried about which wallet.
- **Falsifiable promise:** "Every read this app makes to audit your address goes through Anon-RPC, and our own RPC log shows only Tor or Nym exits. If the anonymity network is down, the app shows nothing rather than falling back to direct."
- **20 second demo:** Paste a team test address. Cards fill: an EIP-7702 delegation to an unknown contract (code `0xef0100...`), two unlimited ERC-20 approvals, three Permit2 allowances. A traffic meter reads "41 of 41 reads via tor-js". Click "Lock down": one Permit2 `lockdown` call plus a 7702 re-delegation to the zero address. Then the team kills the gateway: the next refresh fails closed with a red banner, no direct request leaves the browser (DevTools network tab on screen).
- **Requirements:** reads through Anon-RPC by default (harness boots before the first read, no toggle); "how much traffic": a built-in egress meter counts every fetch, XHR and WebSocket and lists the deliberate exclusions (the write itself goes through the user's wallet, stated as a trade-off, as the criterion invites); "works end to end": mainnet or Sepolia reads plus a real lockdown tx; "shippable": static site, no backend; "technical depth": multicall batching to fit about 0.8 s per call ([bench](https://github.com/ethereum/anon-rpc/actions/runs/40303047893), via `reports/EF tracks and Whitechain ideas.md`), plus log scanning for Permit2 `Approval` events without leaking the address to an indexer.
- **Why EF judges would pick it (H1, H6):** it is the listed "portfolio dashboard" idea made urgent by the week's biggest story, with 100% of traffic accounted for. The fail-closed moment is the structural proof. **Judgement:** rival "Tor toggle" dashboards will be opt-in and partial.
- **Closest prior work:** Plan A Lightfoot (watch-only approvals with light-client verification, `plans/A_verified_anon_reads.md`); revoke-style tools; "How Doxxed Am I?" (exposure report, no fix). **Twist:** adds 7702 delegation auditing (new since the drain), the Permit2 lockdown write path, and a fail-closed egress guard; verification is a stretch, not the core.
- **Stack:** EF Anon-RPC (lead) + Uniswap Foundation "Build with Uniswap" (Permit2 is Uniswap's contract; README must point at the exact lines calling `lockdown` and reading `allowance`, plus FEEDBACK.md and the form). Optional third: none needed. **Judgement:** Uniswap's prize is the largest fresh pool ($10,000, four places), and "tooling or solutions built for the broader ecosystem" covers a Permit2 safety tool.
- **Difficulty:** Low to medium. **Team fit:** very high (approval and delegation mechanics are audit bread and butter).

### R2. Blindfork: fork mainnet for security research without telling anyone what you are probing (narrow EF entry)

- **Pitch:** A localhost JSON-RPC endpoint for Foundry and Anvil that sends every fork read through Anon-RPC and checks every storage slot against the block's state root.
- **Falsifiable promise:** "`forge test --fork-url http://127.0.0.1:8545` against a live protocol works, every `eth_getStorageAt` and `eth_getCode` your fork loads left through Tor, and every value matches an `eth_getProof` against the block header. Feed it one forged slot and the fork aborts."
- **20 second demo:** Split screen. Left: a Foundry invariant test forking Aave or a Uniswap v4 pool, green. Right: Blindfork's log, each slot with exit IP and "proof OK". The team flips a proxy into lying mode for one slot: the test run halts with "slot 0x...: proof mismatch".
- **Requirements:** this is the "new harness" lane: "If you're building a worker or the harness, a simple demo app is enough", so the demo app is a Foundry test. The harness runs the official browser harness in a headless Chromium page (official npm packages, a starter kit, not prior code) and bridges it to a local HTTP port. "Technical depth": proof verification, a content-addressed slot cache and prefetch on parallel circuits (`anonOptions.isolationKey` per lane if a worker honours it; ask at the workshop).
- **Why EF judges would pick it (H3, H2):** it turns Anon-RPC from a browser library into an endpoint for the tools developers already use, which the notes found nobody has shipped ("Not yet a conforming harness", [node-harness README](https://github.com/ethereum/anon-rpc/blob/main/impl/node-harness/README.md)). Verified reads hit the listed idea "combine anon-rpc with a light client or proof verification".
- **Closest prior work:** Quiet Port (a proposed localhost endpoint in `reports/ETHGlobal finalist ideas 2023 to 2026.md`); interceptor (New Delhi 2025, a JSON-RPC proxy without anonymity). **Twist:** fork-shaped workload (storage proofs, cache, prefetch) and the whitehat opsec story. **Judgement:** that RPC logs can reveal what a researcher is investigating is our inference, not a documented incident; say so in the README.
- **Stack:** EF only. **Judgement:** keep it narrow; no partner gains from it.
- **Difficulty:** Medium to high (Anvil makes many reads; at about 0.8 s each a cold fork is slow, so the demo needs a warm cache and a short test). **Team fit:** very high (the team are the users).

### R3. Chaff: a decoy worker that hides which address you are asking about (narrow EF entry, new worker)

- **Pitch:** Anonymity networks hide your IP but not your question; Chaff wraps any Anon-RPC worker and sends each balance or nonce read inside a crowd of k decoy reads on separate circuits.
- **Falsifiable promise:** "Given the RPC endpoint's full request log for a session, a judge cannot pick which of the k addresses belongs to the user better than 1 in k, for the call types we cover; we publish the overhead."
- **20 second demo:** The endpoint log scrolls with 8 addresses per real read. A judge is handed the log and guesses; the reveal shows the guess was wrong (or right, which the README treats as data). A small table shows latency and call overhead at k = 4, 8, 16.
- **Requirements:** "produces anonymity via a new Anon-RPC worker" is named in the description; a simple demo wallet panel is enough. "Technical depth": decoy sampling from a public holder set matched by token and balance band, constant-rate scheduling and response-size padding. "Exclusions": calls Chaff cannot disguise (sending, receipts for your own tx) are listed in the README as intentional.
- **Why EF judges would pick it (H3, H4):** it addresses the limit the EF's own threat map states: every network hides the IP "and none hides what the wallet asks (that needs PIR)" ([threat map](https://github.com/andyguzmaneth/anon-rpc-threat-map), via `reports/EF tracks and Whitechain ideas.md`). An honest measured limit beats a grand claim.
- **Closest prior work:** Nox pads requests only (`research_notes/EF tracks and Whitechain ideas/anon_rpc.md` Q10 item 10); kohaku-rs PIR experiment. **Twist:** decoys as a cheap, measurable stand-in for PIR, shipped as a composable worker.
- **Stack:** EF only.
- **Difficulty:** Medium. **Team fit:** high (adversarial thinking; the hard part is the threat model, not the code).

### R4. Hush: private name lookups for ENSv2 (stacks with ENS)

- **Pitch:** An ENSv2 resolution client and "pay a name" page where every registry hop and record read goes through Anon-RPC and is proof-checked, plus a delegated-record pattern so a hot key can rotate only your receiving address.
- **Falsifiable promise:** "Resolving a name walks the ENSv2 registry hierarchy locally; no RPC provider, gateway or indexer learns which names you looked up, and a forged record fails its storage proof."
- **20 second demo:** Type a teammate's name, the resolver trace shows root registry, parent registry, per-name registry and Permissioned Resolver, each hop "via Nym, proof OK". Pay 1 USDC. Then the teammate's hot key, granted only the address role through Enhanced Access Control, rotates the address; the next lookup picks it up; an attempt by the same key to edit the avatar record reverts.
- **Requirements (EF):** reads by default through Anon-RPC; the egress meter shows 100% except the payment send. **Requirements (ENS):** "built on ENSv2 on Ethereum mainnet or Sepolia"; ENSv2 central (the resolver walk and the role-scoped record are the product); "not just include hard-coded values"; live demo link and open source.
- **Why EF judges would pick it (H1, H5):** name lookup is one of the most frequent reads a wallet makes and nobody has made it private (`privacy_stack_gaps.md` idea 14, "Prior art: none found"). ENSv2 shipped on 27 Oct ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)), which gives the "standard that just shipped" pattern.
- **Closest prior work:** dapp3.eth (ENS via Helios, no anonymity); Kondor (Cannes 2026, fresh addresses via an ENS resolver, routed via Railgun). **Twist:** ENSv2-native hierarchy walk plus anonymity plus role-scoped rotation.
- **Stack:** EF Anon-RPC + ENS "Best Use of ENSv2". Optional third: Arkiv "Build on Arkiv" only if a public contact directory keyed by ENS names is added ("Names and identity: profiles or service directories keyed by ENS names"), which **Judgement** dilutes the privacy story.
- **Difficulty:** Medium (ENSv2 contract surface is new; CCIP-read gateways must be excluded or routed and stated). **Team fit:** medium to high.

### R5. Quiet Quorum: review and co-sign a Safe transaction with no Safe API and no RPC that knows which treasury you guard (stacks with Arkiv)

- **Pitch:** Multisig signers are the target of the biggest hacks; Quiet Quorum lets them fetch pending proposals from Arkiv, re-derive the safeTxHash, simulate and read chain state through Anon-RPC, and sign without touching a hosted transaction service.
- **Falsifiable promise:** "A 2 of 3 Safe on Sepolia executes a proposal that no hosted Safe service ever saw, and every chain read the signers made, including the Arkiv reads, went through Anon-RPC."
- **20 second demo:** Proposer posts a transfer; it appears as an Arkiv entity owned by the proposer wallet and expiring at the proposal deadline. Signer 2 opens the page, sees decoded calldata, the locally computed hash matches, the meter reads 100% anonymous. A tampered proposal (calldata swapped) is flagged because its hash no longer matches the signed one. Execute; explorer link.
- **Requirements (EF):** reads by default through Anon-RPC, including Arkiv's JSON-RPC if a worker can reach it (check CORS on `rpc.rabdi.db-chain.testnet.arkiv.network`; if not, list Arkiv reads as an exclusion). **Requirements (Arkiv, "Build on Arkiv (from scratch)"):** writes to Arkiv's current testnet with `@arkiv-network/sdk`, a user-facing feature reads it, README lists writer addresses and one query, `/arkiv/schema.md`, `/arkiv/friction.md` and one file per criterion.
- **Why EF judges would pick it (H5, H1):** it applies the Anon-RPC "fork of an existing dApp" idea to the place where reads are most sensitive. **Judgement:** the Bybit theft (Feb 2025) went through a compromised Safe frontend (IPFS blog post cited in `ef_goals_and_gaps.md`), so "no hosted service in the signing path" is a story judges already know.
- **Closest prior work:** Octopus AI (Agents 2025 finalist, AI co-signer inside Safe, server based); InteropSafe (Buenos Aires 2025, EIL multisig UX, no prize). **Twist:** removes the transaction service and the RPC as observers, rather than adding an AI reviewer.
- **Stack:** EF Anon-RPC + Arkiv "Build on Arkiv (from scratch)". Third slot optional (ENS for signer names). Arkiv counts as one partner.
- **Difficulty:** Medium (Safe contracts and hashing are well documented; Arkiv SDK is new to the team). **Team fit:** high.

---

## 2. Best use of the Frame Transaction Alternative Mempool: five ideas

All five need the hackathon devnets ("Multiple devnets will run during the hackathon with keyed nonces and recent roots live, plus a faucet"). **Judgement:** none of them can share a product with Whitechain or a mainnet-only partner; the stack ideas below use partners whose prize text allows a devnet or a simulation.

### M1. Brakeline: a hot wallet whose stolen key is worth one day's quota (stacks with Chainlink CRE)

- **Pitch:** The Binance pattern was a stolen signer and dozens of pre-signed authorizations over consecutive nonces ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history), via `track_ideas/00_season.md`). Brakeline is a frame-transaction account whose own validation enforces a per-day outflow quota and a guardian freeze flag, so a stolen key cannot drain it and one freeze transaction invalidates every pre-signed transaction at once.
- **Falsifiable promise:** "Sign 50 transfers on consecutive nonces and hand them to the attacker. The first one under quota is admitted; the rest are refused by the alt mempool because the quota counter, written in `pre_verify`, is spent. After the guardian freezes, none of them can be included."
- **20 second demo:** A script submits the 50 pre-signed transactions. Explorer: 1 admitted, 49 rejected with the quota reason. The CRE workflow, watching an outflow feed, calls `freeze`; a fresh signed tx is rejected. Then the canonical mempool rejects even the first one (state write in validation), which is the "relation to the alt mempool" beat.
- **Requirements:** "something only an alt mempool makes possible ... more flexible state access in sender" (quota counter and an associated guardian slot); admitted tx link on the devnet explorer; the team explains the trade-off (a staked sender or guardian can cause mass invalidation, which ERC-8421 rate-limits, `frame_tx_alt_mempool.md` Q4).
- **Why EF judges would pick it (H1, H4):** the prize names "daily quota paymasters"; Brakeline moves the quota into the sender, ties it to the week's headline, and gives the mempool team a concrete invalidation case to discuss. **Judgement:** strong on "usefulness" and "creativity".
- **Closest prior work:** Zkipper (Cannes 2025 EF Mopro 2nd, 7702 roles against "Bybit-style" attacks, [showcase](https://ethglobal.com/showcase/zkipper-czc3z)); Tripwire and Lastgas (proposals in the finalist report). **Twist:** enforcement at mempool admission and inclusion via sender state, not role separation or post-conditions.
- **Stack:** EF alt mempool + Chainlink "Best workflow with CRE" (simulation is enough; the workflow joins chain events with an external API, here a threat feed or exchange status page, and calls `freeze`). **Judgement:** CRE's "meaningfully used" test is met only if freeze really depends on it; keep a manual guardian path too.
- **Difficulty:** Medium (depends on `pre_verify` writes being live on the event devnet; ask first). **Team fit:** very high.

### M2. Paymaster Gauntlet: attack any alt-mempool paymaster before an attacker does (narrow EF entry)

- **Pitch:** A property and exploit suite that runs a paymaster through every documented frame-transaction failure mode on the devnet, plus a reference USDT gas paymaster that passes all of them.
- **Falsifiable promise:** "Point the Gauntlet at a paymaster address; within five minutes it either produces a devnet transaction that makes the paymaster pay for a reverted or free call, or a green scorecard. Our reference paymaster gets the green card; the naive EIP example does not."
- **20 second demo:** Run against the naive ERC-20 paymaster: red rows ("pre_verify transfer failed but APPROVE still ran: paymaster paid 0.004 ETH for a free call", "false-returning token accepted"). Run against the reference paymaster: green. Each red row links to the explorer.
- **Requirements:** "break the rules and improve them: DoS vectors and vulnerabilities ... simulators and fuzzers" plus "something only an alt mempool makes possible" for the ERC-20 paymaster; admitted transactions on the explorer.
- **Why EF judges would pick it (H3, H2):** the edge cases are already documented by reviewers (Magicians #178 and #180, ERC-8421's `pre_verify` warning, `reports/EF tracks and Whitechain ideas.md`), so the suite is useful the day it ships. **Judgement:** the alt mempool judges in our simulated review weighted mergeable, reusable work heavily (`plans/reviews/judge_alt_mempool.md`).
- **Closest prior work:** Open Paymaster (Buenos Aires 2025 EIL 1st, a decentralized 4337 paymaster, [showcase](https://ethglobal.com/showcase/open-paymaster-61jq1)); RuleDiff (proposal, fuzzes mempool admission rules). **Twist:** targets application paymasters, not the mempool's rules, and ships both attacker and defender.
- **Stack:** EF only.
- **Difficulty:** Medium. **Team fit:** maximal (fuzzing and exploit writing).

### M3. Framekit: first admitted frame transaction in ten minutes, measured on other Mumbai teams (narrow EF entry, tooling)

- **Pitch:** viem actions, wagmi hooks and a Scaffold-ETH 2 extension for frame transactions, with a "why was I rejected" decoder that maps sidecar errors to rule names.
- **Falsifiable promise:** "A developer who has never seen EIP-8141 gets an admitted transaction on the devnet within ten minutes using our README; we will report how many other Mumbai teams did, with their tx links."
- **20 second demo:** `npx create-eth` plus the extension, one hook call, explorer shows admitted. Then a deliberately bad VERIFY frame: the decoder prints the rule, the offending opcode or slot and a fix.
- **Requirements:** "developer tooling: a viem/ethers SDK with the developer experience people expect today, an admission simulator"; admitted tx link; code that submits one.
- **Why EF judges would pick it (H3, H6):** viem's frame-transaction stack was "closed unmerged" ([viem PR #5118](https://github.com/wevm/viem/pull/5118)) and the working toolkit is `@forshtat/hegota-support` 0.0.1 (`frame_tx_alt_mempool.md`). Tooling that other teams use during the event is direct evidence for "usefulness" and "practicality". **Judgement:** real adoption by Friday night is the differentiator over other SDK entries.
- **Closest prior work:** the workshop repo's TypeScript codec ([mempool-workshop](https://github.com/forshtat/mempool-workshop)); maci-subgraph (Circuit Breaker 2024 PSE MACI winner) as the precedent for "build the layer other builders need". **Twist:** DX measured on real users at the event, plus the rejection explainer.
- **Stack:** EF only (Scaffold-ETH is a CROPS resource, but this is an alt mempool entry).
- **Difficulty:** Low to medium. **Team fit:** medium (TypeScript heavy, less security depth; pair it with M2's decoder work).

### M4. Gasless swap on Uniswap v4: a zero-ETH wallet pays gas out of the swap it is making (stacks with Uniswap Foundation)

- **Pitch:** A frame transaction swaps USDC to ETH on a Uniswap v4 pool deployed on the devnet; a staked paymaster approves only if the quoted output covers gas, and a v4 hook pays the paymaster from the output in the same transaction.
- **Falsifiable promise:** "A wallet holding 0 ETH and 100 USDC completes a v4 swap and pays its own gas from the swap output; if the pool moves so that the output cannot cover gas, the mempool refuses the transaction before the paymaster risks anything."
- **20 second demo:** Balance 0 ETH, swap, explorer shows paymaster repaid by the hook. Then the team moves the pool price; resubmission is rejected at admission with the paymaster's reason.
- **Requirements (EF):** "more flexible state access in sender or paymaster (e.g. ERC20 paymasters ...)" (the paymaster reads pool state in validation); admitted tx; explain trade-offs (reading pool state makes validity depend on shared state, a mass-invalidation surface the README must quantify). **Requirements (Uniswap):** public repo, FEEDBACK.md and the feedback form; README points to the hook and paymaster lines.
- **Why EF judges would pick it (H5, H1):** it composes the alt mempool's flagship use case with a real protocol rather than a toy token. **Judgement:** Uniswap judges see a new v4 hook with a clear job; EF judges see the paymaster edge cases handled.
- **Closest prior work:** DeCredit Wallet (LFGHO 2024, flash-minted GHO for purchases); Lastgas (proposal, collateral pays for rescue). **Twist:** gas paid from swap output under a hook, with admission-time refusal.
- **Stack:** EF alt mempool + Uniswap Foundation. **Judgement:** check v4-core's licence for devnet deployment before relying on it, and confirm that the devnet supports transient storage.
- **Difficulty:** Medium to high. **Team fit:** high (DeFi plus Solidity).

### M5. Keyring: account recovery that needs no bundler, relayer or server (narrow EF entry)

- **Pitch:** Keys and guardians live in a keystore contract; a recovery frame transaction verifies a guardian quorum (passkeys through P-256 verification) by reading that keystore in VERIFY, rotates the key after a delay, and pays its own gas from the account.
- **Falsifiable promise:** "Delete the owner key. Two of three guardians sign on their phones; any one of them can submit the recovery frame transaction directly to the alt mempool, and after the delay the account obeys only the new key. Nothing from us is in the path."
- **20 second demo:** Owner key wiped on screen. Two passkey prompts. Submit; explorer shows admitted. Fast-forward the delay on the devnet; old key rejected, new key works. The canonical mempool rejects the same transaction because VERIFY reads the keystore's storage.
- **Requirements:** "more flexible state access in sender" via the keystore pattern ("Keystore wallet", `frame_tx_alt_mempool.md` Q8 item 8); admitted tx link; trade-offs (delay versus theft, guardian collusion).
- **Why EF judges would pick it (H2, H4):** it is the EF's zero option for recovery: "Relayer- and paymaster-based flows need a user-broadcastable equivalent" ([payments domain](https://github.com/ethereum/access-layer-resources/blob/HEAD/domains/payments.md), via `reports/EF tracks and Whitechain ideas.md`). **Judgement:** if placed in CROPS instead, the structural claim still holds.
- **Closest prior work:** BackItUp (ETHIndia 2023 EF 1st, Safe recovery module with Chainlink Functions); Banganoir (Circuit Breaker 2024 PSE Anon Aadhaar winner, 4337 wallet); Carte Bleue (Lisbon 2026 finalist). **Twist:** no bundler and no relayer, because the frame transaction itself carries the recovery logic.
- **Stack:** EF only.
- **Difficulty:** Medium. **Team fit:** high.

---

## 3. Best CROPS App: five ideas

### C1. Sieve: local, inspectable signing filters fed by lists anyone can mirror (stacks with Arkiv "Mirror something Ethereum depends on")

- **Pitch:** An open-source wallet companion that checks every signature request on the device against transparent rules and several community lists, never calls a security vendor, and lets the user override with a reason. The lists (address labels, known drainer delegates, phishing domains) are mirrored to Arkiv so no single list host can censor or track lookups.
- **Falsifiable promise:** "The Binance-pattern request (a batch of 7702 authorizations over consecutive nonces, or any authorization to an unlisted delegate) is refused with zero network calls at signing time, and the screen names the rule and the list that fired."
- **20 second demo:** Airplane mode on. A test dapp asks for 50 authorizations; Sieve blocks and shows "Rule 7702-batch: 50 nonces, delegate not on any allowlist (lists: A, B)". Override requires typing the delegate address. Airplane mode off: the list sync reads from Arkiv; the team switches off one list host and the filter keeps working from the mirror.
- **Requirements:** lead property S with P (no telemetry: Qualification 4 met by design); "structural": filters run locally and lists have independent sources; README CROPS lines (C: lists survive any one host; O: MIT plus list licences; P: no request leaves the device at signing time; S: rule engine is deterministic and auditable); video shows the airplane-mode refusal.
- **Why EF judges would pick it (H1, H4):** the EF's wallet guarantee W-5 asks for "locally verifiable filters and community-maintained lists with override paths" and has "no card yet" (`ef_goals_and_gaps.md` Q7 row 11), and the Mandate's wallet quandary endorses exactly "a choice of independent locally-verifiable filters with transparent rules" (`reports/EF tracks and Whitechain ideas.md`).
- **Closest prior work:** maki and ENShell (2026 finalists, policy and AI checks, partly server side); Oh Snap! (community notes before signing). **Twist:** no vendor and no model in the loop, lists mirrored on Arkiv, and a rule set written for 7702 authorizations.
- **Stack:** EF CROPS + Arkiv "Mirror something Ethereum depends on" (listed ideas include "address labels"; Arkiv requires that "The data's license allows republishing", so pick lists with open licences and link them; "Not Sourcify data"). Third optional: none.
- **Difficulty:** Medium. **Team fit:** very high.

### C2. Fire Drill: prove your wallet can be recovered if its company disappears (narrow EF entry)

- **Pitch:** Enter a smart account address; Fire Drill discovers its recovery path from chain state alone (modules, guardians, delays), forks mainnet, blocks the vendor's domains and APIs, and executes the recovery end to end.
- **Falsifiable promise:** "For each supported account type we either complete a recovery on a fork using only onchain state and public code, or name the exact server the recovery depends on."
- **20 second demo:** A Safe with a recovery module: drill passes in about a minute with the vendor domain blocked in `/etc/hosts`. A second account type: drill fails, "recovery requires api.vendor.example to return a signed challenge". Output is a shareable report plus a draft README C and S line for that wallet.
- **Requirements:** lead property C ("a wallet a user can fully recover with nothing from you" turned into a test anyone can run); reads through Anon-RPC so that checking does not leak the address (P holds); FOSS; video shows the blocked-domain drill.
- **Why EF judges would pick it (H3, H4):** it is the Mandate's walkaway test as a tool, and it applies to every wallet rather than adding one more recovery wallet to a crowded field. **Judgement:** EF judges reward "structural (works without you)"; a tool that measures structure for others is a strong fit, though the simulated panel ranked measurement tools below working structural apps (`plans/reviews/judge_ef_access_layer.md`).
- **Closest prior work:** Walkaway (proposal, exits DeFi positions without frontends); Walletbeat (manual ratings); BackItUp (ETHIndia 2023 EF 1st, recovery module). **Twist:** an executable recovery drill on a fork, for wallets.
- **Stack:** EF only.
- **Difficulty:** Medium (each account type needs an adapter; ship two or three). **Team fit:** very high (fork testing).

### C3. Namesake: your ENSv2 name is your recovery (stacks with ENS)

- **Pitch:** A smart account that takes its owner key from your ENSv2 name, with guardians holding an Enhanced Access Control role that can change only that record, only after a delay you can veto.
- **Falsifiable promise:** "Lose every key: two of three friends rotate the owner record of alice.eth, and after 48 hours (shortened on Sepolia for the demo) the account and every payment to alice.eth follow the new key. Any guardian can broadcast; nothing from us is needed."
- **20 second demo:** Owner key deleted. Two guardians approve on their phones; the role-scoped write lands; the veto window shows a countdown; time passes; the old key fails and the new key moves funds. A guardian trying to change the avatar record reverts (role limited to one record).
- **Requirements (EF):** lead property C (recovery with nothing from the builder), S (role-scoped, delayed, vetoable); README CROPS lines; no trackers; keys on device. **Requirements (ENS):** built on ENSv2 on Sepolia; Enhanced Access Control and the Permissioned Resolver are the mechanism; functional, not hard-coded; live demo link.
- **Why EF judges would pick it (H1, H5):** recovery is a listed idea and the guardian set is public, auditable and human-readable instead of living in a vendor database. **Judgement:** ENS judges get a non-cosmetic ENSv2 use (roles carrying security weight).
- **Closest prior work:** Carte Bleue (Lisbon 2026 finalist, bank-card recovery); Shadow Guardians, Keyless Recovery (showcase); Banganoir (PSE Anon Aadhaar winner). **Twist:** ENSv2 roles as the keystore and the name as the continuity of identity and payments. **Judgement:** recovery is crowded; the twist must be visible in the first 20 seconds.
- **Stack:** EF CROPS + ENS. Optional third: World "Best Use of IDKit" if one guardian is a World ID check, since IDKit's text lists "recovery or protection of an important account action"; this requires onchain or server verification of the proof and a stated trade-off against CROPS P and C. **Judgement:** add World only if onchain verification on Sepolia is confirmed at the World workshop.
- **Difficulty:** Medium. **Team fit:** high.

### C4. CROPS Check: a CI gate that keeps trackers, keyed RPCs and closed deps out of your client (narrow EF entry, dev tool)

- **Pitch:** A GitHub Action and CLI that builds the client, inspects the bundle and a headless run, fails the PR when a third-party tracker, a keyed RPC URL, a remote script or a non-FOSS dependency appears, emits a CSP allowlist that the app then ships, and drafts the README CROPS section from evidence.
- **Falsifiable promise:** "Add one analytics snippet or one API-keyed RPC URL to a passing repo and the PR goes red with the file and line; remove it and it goes green, and the deployed CSP blocks the snippet even if someone bypasses CI."
- **20 second demo:** PR adds a tracker; red check with the offending request and domain. Merge blocked. The live site with the generated CSP: the injected tracker is blocked in the console. The generated CROPS section appears in the README diff.
- **Requirements:** lead property O and P ("a tool that shows what an app leaks", made preventive); Qualification 4 is literally what it enforces; FOSS; video shows the red PR.
- **Why EF judges would pick it (H3):** every Mumbai CROPS entrant must meet Qualification 4 and write a CROPS section, so the tool can be used by other teams during the event. **Judgement:** the simulated EF panel's main fix for Plan B was "Emit and enforce a CSP allowlist ... so the tool changes what ships" (`plans/reviews/judge_ef_access_layer.md`); this idea starts from that fix.
- **Closest prior work:** Plan B Dapp Leak Report (canary wallet tracing, `plans/B_dapp_leak_report.md`); dapp-frontend-check (static, partial, `privacy_stack_gaps.md`). **Twist:** preventive, in CI, with an enforced CSP and a README generator.
- **Stack:** EF only.
- **Difficulty:** Low to medium. **Team fit:** medium to high.

### C5. Gasdiff: find which of your contracts break under Glamsterdam's new gas rules (narrow EF entry, finalist wildcard)

- **Pitch:** Replays a contract's recent transactions on a fork under current and EIP-8037/8038 gas schedules and flags calls whose safety depends on gas (insufficient-gas griefing, fixed-gas external calls, refund assumptions).
- **Falsifiable promise:** "On our own deliberately vulnerable relayer contract, Gasdiff produces a transaction that succeeds today and is griefable under the new schedule, and it produces no finding on the fixed version."
- **20 second demo:** Two columns, old and new gas; a red row with the call, the gas forwarded, and the griefing replay; the patched contract goes green.
- **Requirements:** lead property S ("Things must do what they claim to do"); FOSS; local tool, no telemetry; video shows the griefing replay on the team's own contract (never on third-party victims).
- **Why EF judges would pick it (H4):** the Hoodi fork was postponed "to allow for further investigation of interactions of EIP-8037 with mainnet smart contracts" ([EF blog](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay), via `00_season.md`). **Judgement:** CROPS fit is the weakest of the five (Access Layer cares about users more than gas schedules); the real upside is the finalist room, where it is the most timely idea found this week.
- **Closest prior work:** TARE (2026 finalist, replayable v4 measurement). **Twist:** protocol gas regression measured per contract.
- **Stack:** EF only.
- **Difficulty:** Medium to high (needs a client or EVM build with the new schedule). **Team fit:** maximal.

---

## 4. Track combo pass (fresh-build tracks only)

Constraints: at most 3 partner prizes; EF counts once and places in one EF prize; Arkiv counts once and pays one track plus the $500 Swarm bonus; finalist track is separate ([event FAQ and EF and Arkiv prize text](https://ethglobal.com/events/mumbai/prizes)).

| Idea | Lead EF prize | Partner 2 | Partner 3 | Combo conflicts and extra deliverables |
|---|---|---|---|---|
| R1 Afterdrain | Anon-RPC | Uniswap Foundation (Permit2) | none | FEEDBACK.md and form; README line pointers |
| R2 Blindfork | Anon-RPC | none | none | none |
| R3 Chaff | Anon-RPC | none | none | none |
| R4 Hush | Anon-RPC | ENS (ENSv2) | Arkiv (optional) | ENS needs a live demo link; Arkiv files if added |
| R5 Quiet Quorum | Anon-RPC | Arkiv (Build from scratch) | ENS (optional) | Arkiv `/arkiv/*.md` files, writer addresses, one query |
| M1 Brakeline | Alt mempool | Chainlink CRE | none | CRE CLI simulation output in repo |
| M2 Gauntlet | Alt mempool | none | none | none |
| M3 Framekit | Alt mempool | none | none | none |
| M4 v4 gasless swap | Alt mempool | Uniswap Foundation | none | FEEDBACK.md; v4 deployed on devnet |
| M5 Keyring | Alt mempool | none | none | none |
| C1 Sieve | CROPS | Arkiv (Mirror) | none | list licences linked; import script re-runnable |
| C2 Fire Drill | CROPS | none | none | none |
| C3 Namesake | CROPS | ENS | World IDKit (optional) | IDKit debrief; World verification trade-off in CROPS P line |
| C4 CROPS Check | CROPS | none | none | none |
| C5 Gasdiff | CROPS | none | none | none |

Combos to avoid (**Judgement**, from the verbatim rules in `00_current_tracks.md`): Arc with any CROPS entry ("Every Arc prize requires using Arc Studio as the starting point" pulls against "O"); Whitechain with any alt mempool entry (different chains); Hedera "No Solidity Allowed" with anything here; World Agent Pass with CROPS unless the backend validation is explained, because it requires validation "in a secure backend".

Best three portfolios for this team (**Judgement**):
1. **Max EF depth plus finalist shot:** M1 Brakeline (alt mempool + Chainlink CRE). Timely, security-native, demo of 49 refusals.
2. **Max prize count:** R1 Afterdrain (Anon-RPC + Uniswap) or C1 Sieve (CROPS + Arkiv Mirror).
3. **Lowest risk EF placement:** M2 Paymaster Gauntlet (alt mempool only) with the M3 decoder folded in.

---

## 5. Questions for the EF workshop (Thu 5 Nov 17:00 to 17:30 IST, Workshop Room 2)

The EF slot clashes with Arc (17:00, Room 1). **Judgement:** send two people to EF; Arc is not in any combo above.

Anon-RPC:
1. Does any merged worker in 0.4.0 honour `anonOptions.isolationKey` (needed for R2 parallel lanes and R3 decoys on separate circuits)?
2. Will EF run a tor-js gateway near the venue for the weekend, and what request rate can a team assume?
3. For "how much of the app's traffic", do you count the write path (signing and broadcast) or reads only? Is a fail-closed design with zero direct reads scored as 100%?
4. Does a headless-Chromium bridge to a localhost port count as a "new harness" (R2), or must the harness host workers natively?
5. Can a worker issue several upstream calls per accepted call (needed for R3 decoys) without breaking the spec?
6. Can workers reach non-Ethereum JSON-RPC endpoints such as Arkiv's testnet (R5)?

Alternative mempool (ask Pierre and Alex):
7. Which `hegota-support` codec profile and which ERC-8421 budgets do devnet1 to devnet3 enforce, and do they differ from chain 1337's 100k cap applied before stake lookup?
8. Is the state-writing `pre_verify` frame live on the event devnets (M1 quota counter, M2 tests)?
9. Which "associated storage" reads are allowed for a staked sender or paymaster (M1 guardian slot, M4 pool state, M5 keystore)?
10. Is EIP-7906 assertion support running on any event devnet?
11. Are exploit demonstrations against our own paymaster contracts on the shared devnet welcome, and is there a rate we must stay under so we do not degrade other teams (M2)?
12. Are Uniswap v4 contracts (or transient storage) available on the devnets (M4)?

CROPS:
13. Is the "(tbc: final review pending)" rubric final, and has anything changed in the qualifications?
14. Do dev tools that measure or enforce CROPS for other projects (C2, C4, C5) compete on equal terms with end-user apps?
15. If a project leads on S, how should it show "the moment it matters" in a 3 minute video when the failure is a refusal (C1)?
16. If a World ID credential is one of several recovery guardians (C3), how do you weigh the dependency on World's infrastructure in the C and P lines?

Placement:
17. If a project qualifies for two EF prizes (for example R4 for Anon-RPC and CROPS), do you prefer that we name one in the README, and does naming one restrict where you place it?

Other workshops that matter for these combos: Uniswap Foundation 16:30 Room 1 (Permit2 as "Uniswap stack" for R1; v4 on a devnet for M4), ENS 16:00 Room 1 (ENSv2 role scope for R4 and C3; Sepolia addresses), Arkiv 16:00 Room 2 (list licences and freshness for C1; Safe proposal entities for R5). ENS and Arkiv clash; split the team.

---

## 6. Ranking (Judgement)

| Rank | Idea | EF odds | Finalist odds | Why |
|---|---|---|---|---|
| 1 | M1 Brakeline | High | Good | Timely, structural, refusal on stage, team-native |
| 2 | C1 Sieve | High | Moderate | Named EF gap W-5, Binance hook, Arkiv stack |
| 3 | R1 Afterdrain | Medium to high | Moderate | Easy to finish, 100% traffic story, Uniswap stack |
| 4 | M2 Gauntlet | High | Low | Reusable, team-native, low WOW |
| 5 | R2 Blindfork | Medium to high | Low to moderate | Deep, but latency risk |
| 6 | C3 Namesake | Medium | Moderate | ENS stack, crowded theme |
| 7 | R4 Hush | Medium | Low to moderate | Open gap, ENS stack |
| 8 | R5 Quiet Quorum | Medium | Moderate | Strong story, more moving parts |
| 9 | C2 Fire Drill | Medium | Moderate | Strong idea, adapter-heavy |
| 10 | M5 Keyring | Medium | Low to moderate | Recovery crowded, but zero-relayer twist |
| 11 | R3 Chaff | Medium | Low | Deep but abstract on stage |
| 12 | M4 v4 gasless swap | Medium | Moderate | Highest integration risk |
| 13 | M3 Framekit | Medium | Low | Depends on other teams adopting it |
| 14 | C4 CROPS Check | Medium | Low | Useful, low WOW |
| 15 | C5 Gasdiff | Low for EF | Good | Better as a finalist-only bet |
