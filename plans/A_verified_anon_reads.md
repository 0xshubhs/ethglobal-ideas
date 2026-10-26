# Plan A: "Lightfoot", verified anonymous reads

Build plan for ETHGlobal Mumbai (hacking Thu 5 Nov 21:00 IST to Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India). Written 2026-10-27 as pre-event ideation. It contains no project code; the short code sketches in section 5 are to be written fresh after hacking starts.

Targets: EF "Best Use of Anon-RPC" (the single EF prize), the ETHGlobal Finalist track, and Uniswap Foundation "Build with Uniswap" only if gate G3 passes.

**How to read this plan**
- Square-bracket tags are sourced facts from `research_notes/EF tracks and Whitechain ideas/`: [JC] judging_criteria.md, [AR] anon_rpc.md, [EG] ef_goals_and_gaps.md, [PS] privacy_stack_gaps.md, [WC] whitechain.md, followed by the question number, for example [AR Q6].
- Lines starting "Judgement:", and every target, estimate, ranking and recommendation, are my own reasoning.
- "(verify)" marks a fact from general knowledge that is not in the notes and must be checked before anyone relies on it.
- Verbatim prize and source text is in double quotes.

**Decisions at a glance (Judgement)**

| Question from the brief | Decision | Why |
|---|---|---|
| App shape | Keep the wallet companion, but make it watch-only: balances, token approvals (ERC-20 and Permit2), ENS names | No keys means the privacy claim is not muddied by wallet writes, and judges can safely try it on any address |
| Verification | Colibri with its `fetch` routed through the Anon-RPC worker, one instance per lane. Fallback: a two-endpoint cross-check | Colibri documents a custom `fetch` "to route traffic through Tor" [AR Q5]; Helios TS has no fetch hook [AR Q5]; the Lodestar prover does not support batch requests and does not list `eth_getLogs` [AR Q5] |
| Verified specifier bootstrap | Yes, in a sharper form: boot with zero clearnet RPC reads (pinned specifier answers plus worker bundles served from the app's own origin), then re-check the on-chain hash through the anonymous, verified route | Closes "the bootstrap provider 'is trusted for one read'" [AR Q5] and "bootstrapping needs a pre-existing RPC connection" [EG Q3]. Pinning has precedent (Privacy Pools [AR Q2]); zero-read boot plus verified re-check does not |
| Endpoint discovery and failover | Failover yes, a discovery protocol no | "No protocol enumerates serving endpoints" is an open protocol problem [EG Q3]. Once answers are proof-checked, an endpoint can refuse but not lie, so a measured pool with failover is enough for an app. We publish the exit-acceptance data the notes say nobody has [AR Q6 Gaps] |
| Whitechain Sepolia arm | Skip | Section 2.5 |
| Other partner prizes | Uniswap only, conditional on G3. Nothing else fits | Section 2 |

---

## 1. One-sentence verifiable promise and pitch

**Promise:** Every read Lightfoot makes leaves your browser through Tor or Nym and is checked against Ethereum's own consensus before it is shown, so no RPC provider learns your IP or can show you a false balance, and if the private route dies the app stops instead of leaking.

**What judges watch being proven live**
1. *Provider's view.* A terminal tails the access log of a stand-in RPC provider (our proxy). Every line is a Tor exit IP, tagged against the public Tor exit list. The venue IP never appears.
2. *It cannot be lied to.* We switch the endpoint to a lying RPC proxy. The forged balance is rejected with a red "failed proof" row, while an unverified client next to it shows the fake number.
3. *It fails closed.* We stop our Tor gateway on stage. The app shows "Paused: no private route", and DevTools shows zero RPC requests. It resumes on Nym, and the provider log switches to new exit IPs.
4. *Traffic share.* The ledger header reads "RPC traffic through Anon-RPC: 100%". The list of direct requests contains only the app's own origin, at boot included.

**Three-line pitch**
1. Your wallet's RPC provider sees your IP next to every address you look up, and your wallet shows whatever numbers that provider sends back.
2. Lightfoot is a watch-only wallet companion (balances, approvals including Permit2, ENS names). Every read goes through Anon-RPC and is proof-checked by a light client, starting from a boot that makes zero clearnet RPC reads.
3. Kill Tor and it stops rather than leak; feed it a lying RPC and it refuses the lie; a live privacy ledger shows where every request went.

**Limits we state ourselves, before judges find them**
- Anonymity networks hide who asks, not what is asked. The endpoint still sees which addresses are queried: "none hides what the wallet asks (that needs PIR)" [AR Q4].
- Timing correlation is still possible (the TRAP attack is cited at 95.33% IP-to-address on mainnet tests [AR Q6]). We reduce it with per-account lanes and jitter, but do not claim to defeat it.
- Revoke and lockdown transactions are signed and sent by the user's own wallet, through that wallet's RPC.

---

## 2. Prize targets

### 2.1 EF: "Best Use of Anon-RPC" (the single EF prize)

Facts [JC Q2]:
- $5,000: 1st $2,500, 2nd $1,500, 3rd $1,000.
- Description: "Use Anon-RPC as an app that consumes it, or produces anonymity via a new Anon-RPC worker, or both."
- The "Ideas we'd love to see" include "portfolio dashboard" and "combine anon-rpc with a light client or proof verification".
- Qualification: "Your app routes its RPC reads through Anon-RPC by default."
- Placement: "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best."

Judgement on fit: Lightfoot combines two listed ideas (a portfolio dashboard and light-client verification) and attacks two gaps in EF's own words: the bootstrap trust read, and "Origin privacy and correctness proofs remain an open problem at RPC latency and cost" [EG Q3]. The README will also meet the CROPS App qualification, so EF can place us there if it prefers. We do not ask for that placement.

### 2.2 ETHGlobal Finalist track

Facts [JC Q1]:
- "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize."
- Format: "7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A".
- Judging uses five categories (Technicality, Originality, Practicality, Usability, WOW Factor). Recent events name a top 10 who demo at the closing ceremony.

Judgement: the live kill-switch and lying-RPC beats are designed for this room. About a third of recent IRL finalists were security, privacy or self-custody projects with one sharp, demonstrable claim [JC Q5, researcher's classification].

### 2.3 Partner prize 2: Uniswap Foundation "Build with Uniswap" (conditional)

Facts [JC Q4]:
- $10,000 ($4,000 / $3,000 / $2,000 / $1,000).
- Scope: "Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol."
- Requirements: "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file." and "Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration."
- Past Uniswap privacy winners were Pampalo and PrivBatch [JC Q5].

How Lightfoot integrates (Judgement):
- **Permit2 audit and lockdown.** Read `allowance(owner, token, spender)` on Permit2 for a fixed token-by-spender matrix, show amounts and expiries, and revoke in one transaction with Permit2's `lockdown` (function name and signature to verify).
- **Price source.** USD prices come from Uniswap v3 pool oracles (`observe`), not a price API, so no price service learns which tokens a user cares about. The reads are anonymous and proof-checked.

Odds (Judgement): low to moderate. This is a credible, privacy-motivated use of Permit2 and the v3 AMM, not an AMM innovation. It costs about 4 to 5 hours, including FEEDBACK.md and the form, and it reuses the DeFi security background of the team. **Gate G3 (Fri 19:00):** if lockdown and oracle prices are not both working, do not select Uniswap.

### 2.4 Partner prize 3: none

Judgement: no third partner fits without building a second product (section 2.5). An empty slot costs nothing.

### 2.5 Deliberately skipped

| Prize | Verbatim blocker | Judgement |
|---|---|---|
| Whitechain (Operate, Tokenize, Scale) | "At least one payment in USDT (0xcedf...55a7) settled on Whitechain in your main flow" and "Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified" [JC Q3]; Operate "Won't place. A pay button that sends a plain transfer..." [JC Q3] | A read-only app has no payment flow, and bolting one on would be contrived. A Whitechain read arm would be anonymous but unverified (Colibri support for this OP Stack L2 is not in the notes, verify), which breaks the promise. The public RPC allows "50 requests/s per IP" [WC Q3], shared by every user behind one exit [AR Q9]. Distracts. |
| Whitechain Continuity | "only available to Continuity Track participants" [JC Q3] | Not eligible. |
| ENS "Best Use of ENSv2" | "ENSv2 features should be central to the product, not a cosmetic add-on" [JC Q4] | We only resolve names. That is cosmetic for this prize. |
| World (Agent Pass, IDKit) | Agent Pass: "Validate identity results in a secure backend"; IDKit rewards "the best decision about which credential is needed" [JC Q4] | We need no credential, and a backend conflicts with the design. |
| Chainlink (CRE, CCIP) | CCIP: "a front end simply reading from Chainlink Data Feeds doesn't count"; CRE: "Integrate at least one blockchain with an external API..." [JC Q4] | A CRE workflow is a backend job with no role here. |
| Arc | "Every Arc prize requires using Arc Studio as the starting point" [JC Q4] | Conflicts with CROPS O and with settling nothing. |
| 0G, Hedera, 1inch, Definitive | AI compute, x402 on Hedera, Aqua/SwapVM, Flash orders [JC Q4] | Unrelated mechanics. |
| Arkiv | "Prize details coming soon" [JC Q4] | One person checks at the Thu 16:00 workshop. Add it only if a fit is obvious (unlikely). |
| EF alt mempool, EF CROPS Upgrade | One EF prize per project; CROPS Upgrade is "only available to Continuity Track participants" [JC Q2] | Not our lane. |

---

## 3. Criteria matrix

### 3.1 EF "Best Use of Anon-RPC" (verbatim criteria [JC Q2])

| Criterion | How Lightfoot scores | Evidence a judge sees |
|---|---|---|
| "works end to end in the demo" | Full live path on mainnet for two real accounts: pinned boot, tor-js, Colibri, UI. Kill-switch and lying-RPC beats. A recorded run is the fallback | Live demo; video 0:15 to 2:10 |
| "quality of user experience in demo" | Instant first paint from the on-device cache, labelled "as of block N". Staged boot progress. Plain-language badges ("Private", "Checked"). No settings needed. The coalescer keeps a full refresh to a handful of round trips (target: 10 or fewer for 3 accounts, Judgement) | Demo; ledger "naive vs actual calls" counter |
| "how much of the app's traffic goes through Anon-RPC (if an app)" | 100% of RPC reads and 100% of address-bearing requests, by construction: one egress module, no direct code path, and a runtime guard that blocks anything else. The ledger shows the share by count and by bytes | Ledger header; README "Traffic" table; ledger JSON export in the repo |
| "if you choose to exclude some traffic as an intentional performance/anonymity tradeoff instead of implementation difficulty, that can be a good thing, just let us know" | Listed with reasons: (1) app shell and worker bundles from the app's own origin; (2) the optional "follow on-chain worker" mode, which makes one verified direct specifier read; (3) transactions sent by the user's wallet; (4) one deliberate trade-off: the public lane shares head and price reads (no address content) across the session | README "Intentional exclusions" |
| "could this be shipped for real after the hackathon" | Static site, no backend, MIT. The lane, verify and fail-closed layer is packaged as an EIP-1193 provider that any viem or ethers app can drop in (S8). The only team-run piece, the gateway, can be swapped for any tor-js gateway or for Nym | README "Run it yourself"; npm package (stretch) |
| "technical depth" | (1) A light client over an anonymous transport, a composition not found anywhere [AR Q5]. (2) A boot with zero clearnet reads, plus a verified re-check. (3) Lane-scoped coalescing that batches without linking accounts. (4) A fail-closed state machine with a hot-standby network. (5) A measured exit-acceptance matrix | Section 5; Q&A |
| Qualification: "Your app routes its RPC reads through Anon-RPC by default." | Default and only route. There is no direct mode to switch to | `src/egress/` is the only module the lint rule lets touch the network |

### 3.2 ETHGlobal finalist categories (verbatim [JC Q1])

| Criterion | How Lightfoot scores |
|---|---|
| "Technicality: How complex is the problem you're addressing, and how sophisticated is your solution?" | Three constraints at once. Anonymity costs about 1 s per call and an 8 to 11 s boot [AR Q6]. Correctness needs light-client proofs. Unlinkability across accounts forbids naive batching. The solution: lanes, coalescing, verified boot and a fail-closed router |
| "Originality: Is your project introducing a new idea or creatively solving an existing problem?" | No existing composition of anonymized and verified reads [AR Q5]. No 2025 to 2026 ETHGlobal Tor, Helios or Anon-RPC app surfaced [PS]. The bootstrap trust gap is closed in a new way |
| "Practicality: How complete and functional is your project? Could it be used by its target audience today?" | Works on mainnet with real addresses today, at a deployed URL. Watch-only, so trying it is risk-free. Audience: people who check balances or approvals for addresses they do not want tied to their IP (privacy users, security responders checking a victim's approvals, treasurers) |
| "Usability (UI/UX/DX): How intuitive is your project? Have you made it easy for users to interact with your solution?" | Paste an address or ENS name; no jargon; cached first paint; clear paused state. DX: one-call provider for other dapps |
| "WOW Factor: Does your project leave a lasting impression? This is the catch-all for anything unique or impressive that may not fit into the other categories." | Killing Tor on stage while the provider log flips from Tor exits to Nym exits and the app refuses to fall back; catching a lying RPC live |

### 3.3 Uniswap Foundation (conditional; no rubric is published, so these are the verbatim requirements [JC Q4])

| Requirement | How Lightfoot meets it |
|---|---|
| "Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol." | Permit2 allowance audit and `lockdown` batch revoke; USD prices from v3 pool `observe`, read privately and proof-checked |
| "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form ... that includes the link to your FEEDBACK.md file." | FEEDBACK.md drafted Fri 16:00 to 19:00; form sent Sat 02:30 to 03:30 |
| "Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration." | README "Uniswap integration" section with contract addresses and permalinks to each call site |

### 3.4 EF "Best CROPS App", in case EF places us there (verbatim [JC Q2])

| Criterion | How Lightfoot scores |
|---|---|
| "works end to end in the demo" | As in 3.1 |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | Lead property: P. Structural, not a setting: there is no direct route in the code, the runtime guard blocks any other egress, and the app works with our gateway switched off (Nym) |
| "the other three still hold, or trade-offs are stated in the README" | C: no backend, gateway replaceable. O: MIT, builds from the repo. S: no keys, answers verified. Trade-offs listed in the CROPS section |
| "UX: would someone use it without knowing what CROPS means" | The user sees balances and approvals; privacy is the default and needs no explanation |
| "could it ship after the hackathon" | As in 3.1 |
| Qualification items: FOSS license, CROPS section, "A demo video (3 minutes max)", "No third-party trackers or analytics in the client" | MIT; section 10 draft; 2:00 to 2:59 cut; no analytics, CDNs or web fonts |

---

## 4. Prior art and differentiation

### 4.1 What already exists (facts)

| Prior work | What it does | What it lacks for this claim | Source |
|---|---|---|---|
| Privacy Pools v2 web app | Optional "Connect with Tor", off by default. Egress-policed viem transport that "does not fall back to a direct fetch". Pins the expected `workerHash` by intercepting `eth_call` selector `0x3898587d` | Opt-in, one network, no response verification | [AR Q1], [AR Q2] |
| Kiwi News | "anon-rpc switch", off by default. 90 s boot timeout, 60 s fail-fast, one shared worker per page, fails over "If an RPC provider refuses Tor traffic" | Off by default, no verification | [AR Q1], [AR Q2] |
| Kohaku `@kohaku-eth/provider` | Ships anon, Helios and Colibri as separate, mutually exclusive providers. The anon provider is a "Browser-only proof of concept" | No composition | [AR Q2], [AR Q5], [PS] |
| Ambire | Optional Colibri verification for balance and ENS lookups | Not anonymized | [PS] |
| Official anon-rpc demo and MV3 demo extension | "Balance watcher" demo | One read, not an app | [AR Q1], [AR Q10] |
| Anon wallet (dev builds) | tor-js in a wallet extension; measured "five accounts left through one exit" without isolation | Unreleased, no verification | [AR Q1], [EG Q3] |
| Dev-only bench | Latency numbers per worker | CI only, "does not reach Pages" | [AR Q6] |
| Threat map (andyguzmaneth) | Lists "Fail-closed default", "Clearnet bootstrap" and coalescing as open or unimplemented | Analysis, not code | [AR Q6] |
| clawd-research spike | "viem reads through the sandboxed mainnet worker" | Spike | [AR Q2] |
| dapp3.eth; EthStorage with Colibri | Light-client-verified ENS or content | Not anonymized | [PS] |
| ETHGlobal 2025 to 2026 showcase | "no 2025 to 2026 Helios, Tor, or Anon-RPC app surfaced"; older OpenRPC and Light Client Proof exist | No current entry | [PS] |
| Walletbeat | All 24 rated software wallets have `lightClient.ethereumL1` "notSupported" or unrated | Shows the gap | [PS] |
| Approval checkers (revoke.cash style) | Rely on indexers or backends that see the queried address (general knowledge, verify) | Not private, not verified | (verify) |

The anon_rpc.md inventory rates the relevant pieces. "Verified private portfolio" is "Novelty Open (composition)". "Colibri plus anon-rpc provider package" is "Open", and so is "Verified specifier bootstrap". "Fail-closed network router" and "Private approvals and revoke checker" are "Partial", and "Request shaping" is "Open" [AR Q10]. Already done, and so not to be pitched as new: "a basic opt-in Tor toggle", "an EIP-1193 wrapper (Kohaku)", "viem `fetchFn` wiring (Privacy Pools)" [AR Q10].

### 4.2 Why this is new (Judgement)

1. **Anonymous and verified at once.** Nobody ships Anon-RPC transport under a light client [AR Q5]. EF's Reads team names exactly this as open: "Origin privacy and correctness proofs remain an open problem at RPC latency and cost" [EG Q3]. Lightfoot is a working, measured browser instance of it.
2. **A boot that touches no RPC.** The harness's single trusted read is answered from pinned values, and the bundle comes from the app's own origin and is hash-checked. The on-chain value is then re-checked through the private, verified route. This removes both the trust gap and the "Clearnet bootstrap reveals anon-rpc use" leak [AR Q6].
3. **Private by default, with no switch.** Prior adopters ship a toggle that is off by default [AR Q1]. Lightfoot has no direct route to toggle on.
4. **Batching that does not link.** Coalescing is the standard answer to 1 s calls [AR Q6], but naive batching merges several accounts into one request. Lane-scoped coalescing keeps the speed without the linkage.
5. **It measures itself.** A live ledger quantifies the judged traffic-share criterion, and a published exit-acceptance matrix fills a gap the notes call a deliverable [AR Q6 Gaps].

---

## 5. Architecture

### 5.1 Components and what runs where

| Component | Runs where | Owner | Role |
|---|---|---|---|
| UI (React, static build) | User's browser | P3 | Accounts, portfolio, approvals, ENS, revoke handoff, ledger panel |
| Read scheduler | Browser | P3 | Per-lane coalescer, Multicall3 batching, singleflight, block pinning, memory and IndexedDB cache |
| Verified providers | Browser | P2 | One Colibri instance per lane, exposed as EIP-1193 to viem `custom()`; tags each result proved, cross-checked, anon-only or rejected |
| Egress router (`src/egress/`) | Browser | P1 | The only module allowed to call the network. Worker pool (tor-js active, Nym standby), fail-closed state machine, lane fetch, endpoint pool and health, ledger events |
| Runtime egress guard | Browser main thread | P1 | Wraps `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` and `sendBeacon`; allows the app's own origin only; blocks and logs anything else. A `PerformanceObserver` lists every resource load for the ledger |
| Bootstrap (`src/bootstrap/`) | Browser | P2 | Pinned specifier answers, same-origin resolver URLs, post-boot on-chain re-check, watchdog banner |
| Anon-RPC workers | Sandboxed null-origin iframe, then Web Worker | Upstream | tor-js 0.4.3 and Nym 0.1.0 bundles, accepted only if keccak256 matches [JC Q2] |
| tor-js-gateway | Team VPS (Mumbai region) | P1 | Unmodified upstream gateway: a blind KPS relay into Tor [AR Q4]. The EF demo gateway is the second entry |
| Stand-in provider (logging proxy) | Team VPS, Caddy TLS on an sslip.io hostname (verify) | P2 | Demo fixture: forwards to a public RPC or prover and logs source IP and method, tagged against the Tor bulk exit list. Not in the default config |
| Lying proxy | Team VPS | P2 | Demo fixture: Walletbeat `l1-lying-rpc-proxy` [PS], or a byte-flipping proxy if Colibri runs in remote-prover mode. Not in the default config |
| Static host | Vercel or GitHub Pages, plus an IPFS pin (S6) | P3 | Serves the app shell and `/workers/<keccak>.js` with `Access-Control-Allow-Origin: *` |
| Third parties | Internet | n/a | Tor relays, Nym mixnet, Colibri provers, public RPC endpoints |

### 5.2 Diagram

```
 +---------------------------- user's browser tab (static site, no backend) ---------------------------+
 |                                                                                                      |
 |  React UI --> Read scheduler (per-lane coalescer, Multicall3, singleflight, block-pinned cache)       |
 |                       |                                                                              |
 |                       v                                                                              |
 |               Colibri per lane (EIP-1193, proofs checked locally)  --> badge: proved / rejected      |
 |                       |  fetch = router.fetch(lane, ...)                                             |
 |                       v                                                                              |
 |               Egress router  (only module allowed to touch the network)                              |
 |                 state: BOOTING > READY > DEGRADED > PAUSED > PROMOTE STANDBY > READY                 |
 |                 never: DIRECT                                                                        |
 |                 emits ledger rows (lane, method, route, bytes, ms, check)                            |
 |                       |                                         |                                    |
 |        AnonRpcWorker [tor-js] (active)             AnonRpcWorker [nym] (hot standby)                 |
 |        null-origin sandboxed iframe > Web Worker   null-origin sandboxed iframe > Web Worker          |
 |                                                                                                      |
 |  Bootstrap: pinned specifier answers + /workers/<keccak>.js from own origin (no RPC read)            |
 |  Guard: main-thread fetch/XHR/WebSocket allowlist = own origin only; PerformanceObserver to ledger   |
 +-----------|-----------------------------------------------|------------------------------------------+
             | KPS over WebRTC                               | WebSocket
             v                                               v
     tor-js-gateway (team VPS, blind relay)          Nym gateway > mixnet > IP Packet Router
             v                                               |
     Tor guard > middle > exit                               |
             +-------------------------+---------------------+
                                       v
          Colibri provers and public RPC endpoints (untrusted pool, health-checked, failover)
          demo only: stand-in provider log, lying proxy (team VPS)
```

### 5.3 Data flows

**(a) Boot, no clearnet RPC read**
1. The page loads from the static host, the only clearnet contact.
2. `new AnonRpcWorker({ address: TOR_SPECIFIER, preExisting: { rpcProvider: pinnedBootstrap } })`. The harness reads `workerHash()` and `workerResolvers()` through `preExisting.rpcProvider`, "used only to read the specifier" [AR Q1]. Our provider answers from build-pinned values. Its resolver list points at our own origin (absolute URL built from `location.origin`), followed by the on-chain resolvers.
3. The harness fetches the bundle, checks keccak256 against the pinned hash and boots. A mismatch rejects `ready` [AR Q1].
4. The Nym worker boots the same way, as a hot standby.
5. Colibri instances start with `fetch` bound to the router, so light-client sync data also goes through the worker.
6. Once ready, a public-lane read of `workerHash()` on both specifiers goes through the private, verified route and is compared with the pinned values. On mismatch, a banner reads "This network's operator published a new worker; Lightfoot keeps the pinned one until you choose". The live owners are EOAs, not renounced [AR Q1], which is why we never auto-follow.
7. Optional mode "follow on-chain worker": `preExisting.rpcProvider` is a Colibri instance on plain fetch, so the one bootstrap read is direct but verified. The ledger shows it as a disclosed exclusion.

**(b) One read**
1. The UI asks for `balanceOf` for 20 tokens on account lane `acct:7f3a`. The scheduler collects for 30 to 50 ms, dedupes, and builds one Multicall3 `aggregate3` at the lane's pinned block.
2. viem sends `eth_call` to that lane's Colibri instance. Colibri requests proof data through `router.fetch("acct:7f3a", ...)`, and the router calls `worker.fetch(url, { ...init, anonOptions: { isolationKey: "acct:7f3a" } })`.
3. Colibri verifies and returns, or throws. The result is badged "proved" and cached under (lane, call, block). Ledger row: lane, method, route tor-js, endpoint, bytes, ms, coalesced 20, check proved.

**(c) Failover**
Two consecutive failures or a 15 s timeout move the route to DEGRADED, then PAUSED. The UI greys data with its age and disables refresh, and no request leaves. If "auto-switch to backup private network" is on (default on), the Nym standby is promoted and pending reads are retried on it (reads are idempotent). Errors branch on `RpcError.code`, never `message` [AR Q1]. There is no transition to a direct route, and no code for one.

**(d) Rejection**
On a proof failure the value is not shown. The last proved value stays, with its age. The endpoint gets a strike and the read retries on the next endpoint. The ledger row turns red ("failed proof").

### 5.4 Lane, coalescer and cache rules (the unlinkability design)

- **Lanes.** `public` carries head tracking, prices, token metadata and specifier re-checks; it never holds an address. Each watched account gets a lane with a random local id, never derived from the address. The ENS lookup that adds an account runs on that account's new lane.
- **No cross-lane data.** A request never carries data from two lanes. Each lane has its own Multicall3 batches, its own Colibri instance and its own cache namespace.
- **Input-independent public reads.** The public lane always prices the full bundled token list, whatever a user holds, so the price request set does not fingerprint holdings. Account lanes always query the full fixed allowance matrix for the same reason.
- **Isolation key.** Every lane passes `anonOptions: { isolationKey: laneId }` (spec 0.4.0 [AR Q1]). The npm harness 0.3.3 predates this and "drops unknown fields" [AR Q1], and no merged worker honours the key yet [AR Q6]. The app is correct the day a worker does. Until then accounts may share a circuit, and the UI says so. Real separation today is stretch S2 (one worker instance per account lane).
- **Timing.** Lanes refresh on independent jittered timers (0 to 20 s), not all on the same new block. Constant-rate refresh is S7.
- **Cache.** Keyed by lane, call and block. Memory plus IndexedDB, stale-while-revalidate. Token decimals and symbols ship with the build. A full refresh is pinned to one Colibri-verified block, so balances and prices agree.
- **Budget (Judgement targets, to be measured).** Per account, the naive count is about 1 ETH balance + 20 `balanceOf` + 160 ERC-20 allowances (20 tokens x 8 spenders) + 20 Permit2 reads, roughly 200 calls. Target: 3 or fewer verified round trips per account, and 3 or fewer for the public lane. At the measured tor-js p50 of 810 ms and Nym p50 of 764 ms [AR Q6], with lanes in parallel, a 3-account refresh should land in about 3 to 6 s. Proof download size is the unknown (5.7).

### 5.5 Privacy ledger

- **Row fields:** time, lane, method, target label, route (tor-js, nym, own-origin), endpoint host, bytes out, bytes in, ms, coalesced count, cache hit, check (proved, cross-checked, anon-only, rejected).
- **Header metrics:**
  - RPC requests via Anon-RPC, by count and by bytes.
  - Address-bearing requests via Anon-RPC (must be 100%; any breach is blocked by the guard and shown red).
  - Direct egress list from `PerformanceObserver` (expected: own origin only).
  - Naive vs actual calls (coalescing ratio).
  - Verified share.
- **Not counted:** network-level overhead (Tor cells, Nym cover traffic, which is on by default [AR Q4]) is excluded from bytes, and the README says so.
- **Export:** JSON download, and a sample ledger from the demo run committed as `docs/ledger-sample.json`.
- **Why a runtime guard as well as a lint rule:** library internals leak. Privacy Pools recorded "108 per-nullifier `eth_call`s issued by SDK internals during a single send" [AR Q2].

### 5.6 Endpoint pool and exit acceptance

- **Verified methods** go to Colibri provers: the public ones, plus a self-hosted prover on the VPS if Colibri ships one (verify). Because proofs are checked, the choice of prover only affects liveness.
- **The cross-check fallback** uses 5 to 8 public RPC endpoints, picked from the pre-event exit-acceptance test.
- **Health:** rolling success rate, latency, and status class. A 403, a 429 or an HTML challenge page counts as "refuses exits". The router rotates on refusal.
- **S3:** a panel and README table of endpoint x network (tor-js, Nym) acceptance, dated. The notes say no such per-provider data is public [AR Q6 Gaps].

### 5.7 Packages and versions

| Package or artifact | Version | Source | Note |
|---|---|---|---|
| `@anon-rpc/browser-harness` | 0.3.3 (npm, 2026-10-13); move to 0.4.x if published by 5 Nov | [AR Q1] | 0.4.0 exists only on repo main (merge commit c8980fb) with `harness-core@0.4.0`, which returns 404 on npm [AR Q1] |
| `@kpstreams/webrtc-client` | ^0.2.1 (transitive) | [AR Q1] | KPS transport |
| tor-js worker bundle | 0.4.3, 6,767,013 bytes, specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e` (mainnet) | [AR Q1] | Default route |
| Nym worker bundle `@nymproject/anon-rpc-worker` | 0.1.0, 18,283,862 bytes, specifier `0x3aCD9742C68F6d993066Ae25533e09b9e1f60eD0` (mainnet) | [AR Q1] | Hot standby; no config needed [AR Q1] |
| Passthrough worker | specifier `0x4fd77be300f31c5fe6ab266d35d27750a3478d27` | [AR Q1] | Dev builds only, compiled out of production; not anonymous |
| Nox worker | 0.4.1, Sepolia specifier | [AR Q1] | Not used: Sepolia bootstrap, did not boot in the bench, "today one team runs every node in one cloud" [AR Q4], [AR Q6] |
| `@corpus-core/colibri-stateless` | 3.0.2 | [AR Q5] | `fetch`, `prover_mode`, `zk_proof`, `logs_completeness` in its Config [AR Q5]; export name and EIP-1193 surface (verify) |
| `viem` | 2.57.11 | [AR Q2] | `http()` accepts `fetchFn` in source; client `ccipRead.request` option for CCIP-read gateways (verify) |
| `@lodestar/prover` | 1.43.0 | [AR Q5] | Not installed unless G1 fails and the cross-check is not enough |
| `@kohaku-eth/provider` | 0.1.0-alpha.13 | [AR Q2] | Read as reference for wiring anon and Colibri; dependency only if it saves time |
| tor-js-gateway | `crates/tor-js-gateway` in ethereum/tor-js at the tag matching 0.4.3 | [AR Q4] | Rust build on the VPS |
| Walletbeat `l1-lying-rpc-proxy` | walletbeat/walletbeat beta branch, `src/tools` | [PS] | Lying RPC fixture |
| React, Vite, TypeScript, ESLint, `idb` | Latest stable at H0, pinned exactly by the lockfile and listed in the README | (not in notes) | No wallet SDK, no WalletConnect (it contacts a third-party relay); EIP-6963 discovery hand-rolled in about 20 lines |
| Caddy 2, Node 22 LTS | Pinned at H0 | (not in notes) | VPS fixtures |

Every vendored worker bundle ships with its upstream license file next to it (check each license pre-event).

### 5.8 Repos reused (patterns or code, credited in README)

- ethereum/anon-rpc: harness, specifier ABI, `docs/integrate-wallet.md` [AR Q1].
- ethereum/tor-js: gateway crate and worker bundle [AR Q4].
- nymtech/anon-rpc-worker: worker bundle [AR Q1].
- 0xbow-io/privacy-pools-website-v2: `services/egress-transport.ts` (fail-closed egress policing) and `services/tor-fetch.ts` (hash pinning), plus `vendor/ANON_RPC_PATCHES.md` (the harness `close()` race) [AR Q2], [AR Q3]. Re-implement the pattern rather than copying, unless the license allows copying with attribution.
- attestate/kiwistand `src/web/src/anon-transport.mjs`: boot timeout, fail-fast, failover [AR Q2].
- ethereum/kohaku `packages/provider/src/anon` and the colibri backend [AR Q2], [PS].
- walletbeat/walletbeat `src/tools/l1-lying-rpc-proxy` [PS].

### 5.9 Contracts

None deployed. Judgement: nothing to trust and nothing to audit is a feature for the C and S lines. The team's Solidity and security depth goes into what to read, allowance and Permit2 semantics, plausible forgeries for the lying proxy, and reading the specifier ABI.

Read-only addresses:
- Specifiers (5.7).
- Multicall3 `0xcA11bde05977b3631167028862bE2a173976CA11` (prefix confirmed in [WC Q3]; full address verify).
- Permit2 `0x000000000022D473030F116dDEE9F6B43aC78BA3` [WC Q5].
- Uniswap v3 Factory `0x1F98431c8aD98523631AE4a59f267346ea31F984` (verify).
- The ENS UniversalResolver that viem uses (verify).
- About 20 top mainnet ERC-20s and about 8 well-known spenders, curated at H0 from public lists.

### 5.10 Code sketches (API names from [AR Q1] and [AR Q5]; verify at H0; write fresh after 21:00)

Boot with pinned specifier answers:

```ts
import { AnonRpcWorker } from "@anon-rpc/browser-harness";
import { PINNED, answerSpecifierCall } from "./pinned";
import { OWN_GATEWAY } from "./gateways";

const TOR_SPECIFIER = "0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e";
const EF_DEMO_GATEWAY = "152.236.3.22:12298:uEiCH0VdbhryzJcMtCfB0vLA4sOvHdQ4hq5w7CopcwU59bQ";

const pinnedBootstrap = {
  request: async ({ method, params }: { method: string; params: unknown[] }) => {
    if (method !== "eth_call") throw new Error(`pinned bootstrap only answers eth_call, got ${method}`);
    return answerSpecifierCall(PINNED[TOR_SPECIFIER.toLowerCase()], params);
  },
};

export const torWorker = new AnonRpcWorker({
  address: TOR_SPECIFIER,
  config: { gateways: [OWN_GATEWAY, EF_DEMO_GATEWAY] },
  preExisting: { rpcProvider: pinnedBootstrap },
});
```

Lane client, verified and anonymous:

```ts
import { createPublicClient, custom } from "viem";
import { mainnet } from "viem/chains";
import { Colibri } from "@corpus-core/colibri-stateless";
import { router } from "./egress/router";

export function laneClient(lane: string) {
  const laneFetch: typeof fetch = (input, init) => router.fetch(lane, input, init);
  const verified = new Colibri({ chainId: 1, fetch: laneFetch });
  return createPublicClient({ chain: mainnet, transport: custom(verified) });
}
```

The router's fetch, which fails closed:

```ts
async fetch(lane: string, input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const worker = this.activeOrThrow();
  const started = performance.now();
  const res = await worker.fetch(input, { ...init, anonOptions: { isolationKey: lane } } as RequestInit);
  this.ledger.record({ lane, route: worker.name, started, init, res });
  return res;
}
```

`activeOrThrow()` throws `NoPrivateRoute` in PAUSED, and nothing catches that by falling back to `globalThis.fetch`.

Lint intent (egress only from `src/egress/`):

```json
{
  "rules": {
    "no-restricted-globals": ["error", "fetch", "XMLHttpRequest", "WebSocket", "EventSource"],
    "no-restricted-properties": ["error", { "object": "navigator", "property": "sendBeacon" }]
  },
  "overrides": [{ "files": ["src/egress/**"], "rules": { "no-restricted-globals": "off" } }]
}
```

---

## 6. Scope

### 6.1 MVP (must work end to end; definition of done: the four watchable proofs in section 1 succeed twice in a row on a phone hotspot)

| # | Item | Owner |
|---|---|---|
| M1 | Private transport: tor-js through our gateway (EF demo gateway second), Nym as hot standby, 90 s boot timeout, fail-closed state machine, failover between private networks only | P1 |
| M2 | Verified reads: Colibri per lane with `fetch` through the router; per-value badges; reject on proof failure; retry on the next endpoint | P2 |
| M3 | Zero-read boot: pinned specifier answers, same-origin bundles (CORS), post-boot verified re-check, watchdog banner | P2 |
| M4 | Read scheduler: lane-scoped coalescing into Multicall3, singleflight, block pinning, IndexedDB cache, stale-while-revalidate, jittered refresh | P3 |
| M5 | App: up to 3 watch-only accounts (address or ENS name); ETH and about 20 ERC-20 balances; approvals matrix (about 20 tokens x 8 spenders, plus Permit2 allowances and expiries); unlimited approvals flagged; "Revoke" hands an `approve(spender, 0)` to an EIP-6963 wallet, labelled "sent by your wallet, through its RPC" | P3 |
| M6 | Privacy ledger panel, header metrics, JSON export; runtime egress guard; `PerformanceObserver` egress list; lint rule | P1 |
| M7 | Demo fixtures on the VPS: stand-in provider log (Tor exit tagging) and lying proxy; an "unverified view" panel (plain viem through the same worker, no Colibri) for contrast | P2 |
| M8 | Deployed static site; README with CROPS, traffic table, exclusions, verification coverage; AI_USAGE.md; video | All |

### 6.2 Stretch goals, in priority order

1. **S1 Uniswap (gate G3):** v3 oracle USD prices on the public lane, Permit2 `lockdown` batch revoke, FEEDBACK.md and README pointers. P3, about 4 to 5 h.
2. **S2 Real per-account isolation (gate G2):** one tor-js worker instance per account lane (up to 3), plus an opt-in "Show the IP the internet sees" probe per lane through the worker (an IP echo service such as the Tor Project's check API, verify). P1, about 3 to 4 h. The Anon wallet found that per-account keying produced "5 exits for 5 accounts" at no extra cost [AR Q6].
3. **S3 Exit-acceptance matrix:** live panel and dated README table, endpoint x network. P1, about 3 h.
4. **S4 Recent approvals scan:** `eth_getLogs` for `Approval` events with the owner topic over a recent window, to catch spenders outside the fixed list. Verified if Colibri covers logs (`logs_completeness` exists in its Config [AR Q5]; behaviour verify). P2 or P3, about 3 h.
5. **S5 Fast tor-js boot:** host-supplied directory snapshot via `config.bootstrap` (tor-js PR #21 cut that step from 8.1 s to 0.4 s [AR Q6]), only if the pinned 0.4.3 bundle supports it. P1, about 2 h.
6. **S6 IPFS-hosted build** with its CID and the build hash in the README. P3, about 2 h.
7. **S7 Constant-rate refresh per lane** (request shaping [AR Q10]). P1, about 2 h.
8. **S8 Package `anon-verified-provider`**: an EIP-1193 provider for any viem or ethers app, with a 10-line README. P2, about 2 h.
9. **S9 Upstream notes:** an issue or PR on ethereum/anon-rpc describing the pinned-plus-verified bootstrap pattern and sharing the exit-acceptance data. P2, about 1 h.

### 6.3 Explicit non-goals

- Private writes, transaction broadcast, the alt mempool.
- A new worker or a new harness.
- Query-content privacy (PIR).
- An endpoint discovery protocol.
- Full-history token discovery or full-history approvals (that needs an indexer, which defeats the point).
- Chains other than Ethereum mainnet, including Whitechain and L2s.
- Safari, Firefox and mobile (Nym is "Not yet confirmed working on Safari" [AR Q3]); the demo runs on desktop Chrome.
- Any user-facing backend.
- Holding or managing keys.

### 6.4 Mocked or simplified parts (disclosed in README and video)

- The "provider's view" is our own logging proxy in front of a public endpoint, standing in for a real provider's logs.
- The lying RPC is our own proxy (Walletbeat's tool or a byte-flipper).
- The tor-js gateway is run by the team, so a single operator sees client IPs and guard connections; "each gateway observes all of a client's relay connections" [AR Q6].
- The token list, spender list and pool list are curated and bundled, not exhaustive. Unknown spenders are missed unless S4 ships.
- Pinned worker hashes and the Colibri trust checkpoint are fixed at build time.
- Isolation keys are passed but not honoured by any current worker, unless S2 ships.
- Prices are 30-minute TWAPs for listed pools only.
- The "unverified view" panel exists only to show contrast.

### 6.5 Cut order if behind (Judgement)

Cut first: S9 to S2 in reverse priority, then S1 oracle prices (show token amounts only), then S1 lockdown, then the revoke handoff, then ENS reverse names, then auto-promotion of Nym (keep a manual switch).

Never cut: private transport, fail-closed, verification (or its cross-check fallback), zero-read boot, the ledger, and the lying-RPC beat.

---

## 7. Pre-event de-risking (no project code) and day-one checks

### 7.1 Before Thu 5 Nov 21:00

Rule for all of these: read docs and source, run official demos and upstream software unmodified, take notes. Do not write or keep code for the project; anything typed into a scratch file is deleted, not reused [JC Q1 Classic rule].

| # | Check | Owner | Done when |
|---|---|---|---|
| 1 | Re-read the prize page on 4 Nov and again Thu 20:00; CROPS is "(tbc: final review pending)" [JC Q2] | P2 | Diff noted |
| 2 | npm: is `@anon-rpc/browser-harness` 0.4.x out? Is tor-js PR #20 (per-key circuits) merged and published under a new specifier? [AR Q1], [AR Q6] | P1 | Versions written down |
| 3 | Run the official demo (https://ethereum.github.io/anon-rpc/demo/) with tor-js and with Nym on home broadband, a Jio hotspot and an Airtel hotspot. Record boot time and per-call latency. Repeat Thu afternoon on venue Wi-Fi | P1, P3 | Spreadsheet with 6+ runs |
| 4 | Point the official demo's custom RPC URL at candidates (Colibri prover URLs from its README, publicnode, llamarpc, drpc, 1rpc, ankr, merkle, flashbots) through tor-js and Nym. Record status codes: does anyone answer exits with 403, 429 or a challenge page? The notes suggest this kind of test [AR Q9] | P1 | Accept or refuse table |
| 5 | Read the Colibri package README and `types.d.ts`. Confirm: does `fetch` cover every HTTP request? EIP-1193 `request`? Verified methods (`eth_call`, `eth_getLogs`, `eth_getStorageAt`, `eth_blockNumber`)? Mainnet support? Default prover URLs? What `prover_mode` means? Trust checkpoint config? WASM loading under Vite? A self-hostable prover? License? | P2 | One-page notes with answers |
| 6 | Read harness source (`impl/browser-harness`, `impl/harness-core`). Check: exact calls made through `preExisting.rpcProvider` (method, params, block tag); whether the bundle is fetched from the parent or the iframe (CORS); `iframeUrl` and CSP needs; storage sharing between two instances of the same specifier; `ready` failure codes; the `close()` race 0xbow patched [AR Q3] | P2 | Notes; the pinned-bootstrap plan confirmed or adjusted |
| 7 | Read tor-js config docs (`gateways`, `bootstrap`), gateway build steps and ports (UDP for WebRTC) | P1 | Notes |
| 8 | Dry-run tor-js-gateway, unmodified, on a throwaway VPS in Mumbai or Bengaluru; note build time and ports; destroy the VPS, keep the account | P1 | Steps written down |
| 9 | Read the Nym worker README: config, "Abort is not cancel", browser support [AR Q6], [AR Q3] | P1 | Notes |
| 10 | Read Walletbeat `l1-lying-rpc-proxy`: what it forges and how it is configured | P2 | Notes |
| 11 | Read the Privacy Pools, Kiwi and Kohaku sources in 5.8; note licenses | P2, P3 | Notes |
| 12 | Confirm from official docs: Multicall3, Permit2 and the `lockdown` signature, Uniswap v3 Factory, viem's ENS UniversalResolver, the viem `fetchFn` and `ccipRead.request` options | P3 | Address sheet |
| 13 | Gear: two laptops with Chrome stable and 16 GB or more; a clean Chrome profile with one wallet extension only; two hotspots on different carriers with data packs; USB mic; OBS profile tested at 1080p; HDMI and USB-C adapters; power bank | P3 | Checklist ticked |
| 14 | Accounts: VPS, static host, GitHub (create the repo at H0, empty until then); a mainnet wallet with about 0.005 ETH for demo approvals and a revoke | P3 | Ready |
| 15 | Q&A reading: TRAP abstract, threat map, EF Mandate quandary 5 [EG Q1], Colibri trust model | All | Each can explain them in 30 s |
| 16 | Thu workshops: Arkiv 16:00 (one person, prize check), Uniswap Foundation 16:30 (P3: does Permit2 count as "any other Uniswap protocol"?), EF 17:00 (all: event gateway capacity, 0.4.0 on npm, isolation status, opinion on the pinned bootstrap) [JC Q1] | All | Answers noted |

### 7.2 Day-one checks (Thu 21:00 to Fri 03:00)

- **D1 (by 22:00):** does tor-js KPS (UDP) boot on venue Wi-Fi and on the hotspot? Does Nym (WebSocket) boot? Pick the demo network.
- **D2 (by 00:30):** our gateway is deployed fresh and reachable; the EF demo gateway is listed second.
- **D3 (by 01:00):** Colibri verifies `eth_getBalance` through `worker.fetch` inside the app.
- **D4 (by 02:00):** Colibri proof requests are accepted from Tor and Nym exits; record proof sizes and latency for a 20-token Multicall3.
- **D5 (by Fri 10:00):** the harness boots from pinned answers and a same-origin bundle.
- **D6 (by Fri 12:00):** tor-js, Nym and 4 Colibri instances in one tab stay under about 2 GB of memory (Judgement threshold).

### 7.3 Go or no-go gates

- **G1, Fri 03:00 (P2):** Colibri verifies `eth_getBalance` and a Multicall3 `eth_call` through the worker. If not, switch to cross-check mode: the same read through two endpoints on two lanes, compared byte for byte. Rename "proved" to "cross-checked" everywhere, and soften the claim to "a single lying provider gets caught".
- **G2, Fri 12:00 (P1):** two tor-js instances boot in one tab and show different exit IPs. If not, ship the isolation key only, disclose it, and skip S2.
- **G3, Fri 19:00 (P3):** Permit2 lockdown and oracle prices both work. If not, drop Uniswap from the submission.
- **Feature freeze: Fri 22:00.**

---

## 8. 36-hour timeline by role

Roles (Judgement on the team mix): the build is TypeScript and browser plumbing (iframes, Web Workers, WebRTC, WASM), not Solidity. Give transport to whoever is strongest at browser debugging. The security background fits verification, the adversary fixtures and approvals semantics. No change of team is needed, but P1 must have done checks 6 to 8 beforehand.
- **P1 Transport:** harness, workers, gateway, router, guard, ledger data; S2, S3, S5, S7.
- **P2 Verification and adversary:** Colibri, bootstrap, watchdog, VPS fixtures, failure-path tests, CROPS and trust text; owns technical Q&A.
- **P3 Product and demo:** UI, scheduler and cache, portfolio, approvals, ENS, Uniswap, deploy, video narration; presents live.

Everyone commits at least every 45 minutes while awake, on small branches merged often. No end-of-event squash ("Submissions with large single commits or missing histories may be disqualified" [JC Q1]).

| Time (IST) | P1 Transport | P2 Verification | P3 Product | Integration, gates |
|---|---|---|---|---|
| Thu 21:00-22:00 | Create repo (LICENSE, README skeleton, AI_USAGE.md, `specs/`); Vite React TS scaffold; ESLint egress rule | Install Colibri; read its types; Vite WASM config | Curate token, spender and pool lists from public sources; UI skeleton | First commit by 21:15; D1 |
| Thu 22:00-Fri 00:00 | Boot tor-js (EF demo gateway) and Nym through the harness; first `eth_blockNumber` via `worker.fetch`; start a fresh gateway deploy on the VPS | Colibri `eth_getBalance` through `worker.fetch` as soon as P1 has a worker | viem lane clients; unverified Multicall3 balances; accounts UI; ENS forward lookup | |
| Fri 00:00-02:00 | Own gateway live, two gateways in config; router state machine; boot timeout; ledger event bus | Colibri behind viem `custom()`; Multicall3 `eth_call` verified; measure proof bytes and latency | Scheduler v1 (window, singleflight, block pin); IndexedDB cache | D2, D3 |
| Fri 02:00-02:30 | Integration | Integration | Integration | **I1:** vitalik.eth balances through tor-js in the UI, with ledger rows |
| Fri 02:30-03:30 | Harden the router; retry on promotion | G1 decision at 03:00; write the badge model | Asleep 02:30-07:30 | **G1**, D4 |
| Fri 03:30-05:00 | Nym standby promotion; runtime egress guard; optional overnight exit probe left running in a tab | Asleep 03:30-08:30 | Asleep | |
| Fri 05:00-07:30 | Asleep 05:00-10:00 | Asleep | Asleep | Nobody awake; gateway under systemd with restart |
| Fri 07:30-08:30 | Asleep | Asleep | Approvals matrix and Permit2 reads; unlimited flags | |
| Fri 08:30-10:00 | Asleep | Pinned bootstrap provider; same-origin bundles with CORS; post-boot re-check | Portfolio and approvals UI | D5 |
| Fri 10:00-12:00 | Ledger header metrics; `PerformanceObserver` list; failover tests | Rejection path, last-proved retention, watchdog banner | ENS reverse names on account lanes; cache paint | |
| Fri 12:00-12:45 | Integration | Integration | Integration | **I2:** two accounts, verified, zero-read boot, ledger at 100%. **G2**, D6 |
| Fri 12:45-16:00 | S2 per-lane instances and exit probe (if G2 passes), else S3 | VPS fixtures: Caddy TLS, stand-in provider log with Tor exit tagging, lying proxy; "unverified view" panel | S1: oracle prices; revoke via EIP-6963; Permit2 lockdown; set demo approvals on mainnet | |
| Fri 16:00-19:00 | S3 exit matrix; performance (split multicalls, lazy verification); jitter | Failure-path tests (kill gateway, lying proxy, boot timeout); verification coverage table; cross-check fallback if needed | UX polish (boot stages, badges, ledger panel); deploy; FEEDBACK.md draft | |
| Fri 19:00-20:00 | Kill-switch operator | Judge stand-in | Presenter | **I3:** timed full dry run on a hotspot; bug list. **G3** |
| Fri 20:00-22:00 | Fixes; stability (memory, long runs) | README: CROPS, trust, traffic, exclusions | Fixes; deploy; README demo section | |
| Fri 22:00 | | | | **FEATURE FREEZE** |
| Fri 22:00-Sat 00:00 | Dry run 2; kill scripts ready | Dry run 2; Q&A drill | Dry run 2; script cards | Blockers only |
| Sat 00:00-02:30 | Screen operator for the video; exit-acceptance table; AI_USAGE.md final | Video edit; README final | Narration (human voice); slides of 4 bullets or fewer | Video locked by 02:30 |
| Sat 02:30-03:30 | Check the repo is public and links work | Upload the video; draft the submission text | Uniswap feedback form (if G3 passed); submit v1 | **Submission v1** |
| Sat 03:30-07:00 | Asleep | Asleep | Asleep | Gateway and site stay up |
| Sat 07:00-08:30 | Re-warm demo; health checks | Re-read the prize page; final README edits | Final submission edit | **Final submit by 08:30** (30 min buffer) |
| Sat 08:30-09:30 | Hotspot test in the judging room | Q&A rehearsal | Rehearse the 4 minutes twice | Judging 09:30-12:30; finalists notified 15:15 [JC Q1] |

Sleep per person: about 5 h plus 3.5 h.

---

## 9. Demo scripts

### 9.1 Live finalist demo (4:00)

Setup: one laptop on a hotspot. Chrome on the left two thirds (app, with DevTools Network docked), a terminal on the right third (tailing the stand-in provider's log). The app was opened 3 minutes earlier, so tor-js and Nym are booted and caches are warm. P3 drives, P1 runs the kill-switch, P2 is ready for Q&A.

| Time | On screen | P3 says (gist) | Operator |
|---|---|---|---|
| 0:00-0:20 | Title card, then the app | "Your wallet's RPC provider sees your IP next to every address you check, and you believe whatever number it sends. Lightfoot makes both impossible." | |
| 0:20-1:05 | Add `vitalik.eth` and our demo account; balances, prices, approvals fill in with "Checked" badges; ledger rows stream; header shows 100% | "Every read went through Tor, and every number was checked against Ethereum itself by a light client in this tab. About 400 reads went out as a handful of requests." | |
| 1:05-1:30 | Terminal: provider log lines, each a Tor exit IP tagged `[tor-exit]`; venue IP absent | "This is what the RPC provider sees: Tor exits, never us." | |
| 1:30-2:20 | **The moment it matters (1): kill Tor.** Status turns amber, then red: "Paused: no private route. Not falling back." DevTools: zero requests. Then "Switched to Nym"; rows resume; the log shows new, non-Tor exit IPs | "A normal app would quietly fall back to a direct connection. Ours has no code that can." | P1 runs `ssh vps systemctl stop tor-js-gateway` |
| 2:20-3:05 | **The moment it matters (2): a lying RPC.** Switch the endpoint to the lying proxy. The unverified panel shows vitalik.eth with 10,000 ETH; Lightfoot shows a red "failed proof", keeps the last checked value and moves to the next endpoint | "Anonymity alone is not enough; the server can still lie. Here it lies, and the proof catches it." | P2 flips the endpoint in the demo panel |
| 3:05-3:35 | Ledger "Direct egress": only our own origin, at boot included. Watchdog: "On-chain worker hash re-checked through Nym: matches pinned" | "Booting Anon-RPC usually needs one trusted, non-private RPC read. We boot with none, then verify that value privately." | |
| 3:35-3:55 | The unlimited USDC approval, Revoke, then the wallet popup (cancel) | "Your approvals, checked privately. The revoke itself is sent by your wallet, and we say so." | |
| 3:55-4:00 | Promise card and repo URL | "Static site, no backend, MIT." | P1 restarts the gateway |

If the room network fails, play the matching 60 s clip from the recorded video and narrate over it, then take questions.

### 9.2 Submission video (target 2:45; hard limits 2:00 to 2:59)

Rules [JC Q1]: 720p or higher (record 1080p), no speed-up, no music with text instead of talking, no AI voiceover, no phone recording, slides of 4 bullets or fewer, intro under 20 s. EF wants "3 minutes max" and "the moment it matters" [JC Q2].

| Time | Beat |
|---|---|
| 0:00-0:15 | Hook and promise, spoken over the app's first screen |
| 0:15-0:40 | Add two accounts; checked balances and approvals appear; ledger at 100% |
| 0:40-1:05 | Split screen: the stand-in provider log shows only Tor exits |
| 1:05-1:40 | **Kill-switch:** stop the gateway; paused, zero requests in DevTools, no fallback; Nym takes over; the log shows new exits |
| 1:40-2:10 | **Lying RPC:** the unverified panel shows the forged balance; Lightfoot rejects it with "failed proof" |
| 2:10-2:30 | Approvals and Permit2 `lockdown` through the wallet (only if G3 passed; otherwise the zero-read boot ledger view) |
| 2:30-2:45 | Slide, 4 bullets: architecture; what is verified; what is mocked; repo and live URL |
| 2:45 | End |

---

## 10. README skeleton

Section order for `README.md`:

1. **Lightfoot**: one-line promise; license badge.
2. **Demo**: video link, live URL, IPFS CID (S6).
3. **Check the claim yourself**: open DevTools Network and see only this origin; export the ledger; point the app at the lying proxy (`infra/lying-proxy`) and watch it refuse.
4. **What it does**: accounts, portfolio, approvals and Permit2, ENS, revoke handoff.
5. **How it works**: diagram, lanes, verification, zero-read boot, fail-closed router.
6. **Traffic**: one row per request type with route, lane, check and reason. Rows: balances, token balances, allowances, Permit2, ENS forward and reverse, CCIP-read gateway fetches, prices, head, Colibri sync data, specifier re-check, exit probe (opt-in), worker bundles (own origin), app shell (own origin), wallet transactions (outside the app), "follow on-chain" bootstrap (optional, direct but verified).
7. **Intentional exclusions** and why.
8. **Verification coverage**: method by status (proved, cross-checked, anon-only).
9. **Exit acceptance**: endpoint x network table, dated (S3).
10. **CROPS** (draft below).
11. **Trust assumptions and limits**.
12. **Run it yourself**: `pnpm install`, `pnpm build`, serve `dist/`; how to run your own tor-js-gateway; how to start the demo fixtures.
13. **What is new and what is reused**: required by "Clearly distinguish between what's new and what's reused" [JC Q1].
14. **Mocked or simplified** (section 6.4).
15. **Uniswap integration**: contract addresses and permalinks to the Permit2 reads, `lockdown` and `observe` call sites (only if G3 passed).
16. **AI usage**: link to AI_USAGE.md and `specs/`.
17. **License and pledge**: MIT; we will not relicense to a non-open license (the Mandate asks supported projects to pledge this [EG Q1]).
18. **Team**.

### Draft CROPS section (answers the four prompts as worded [JC Q2])

**C (what we control that you depend on, and what happens if it goes away or refuses you):** We control the static site at <domain> and one tor-js gateway. If the site goes away, build it from this repo or open the IPFS CID. If our gateway goes away or refuses you, Lightfoot uses the EF demo gateway or Nym, which needs nothing from us. We run no backend, relayer or RPC in your path; the logging and lying proxies are demo fixtures and are off by default.

**O (license, and whether you can build and run it from the repo alone):** MIT. `pnpm install && pnpm build` produces the whole app from this repo. Worker bundles are public files, accepted only if they match on-chain keccak256 hashes. The gateway is unmodified tor-js-gateway from ethereum/tor-js.

**P (what each third party learns):**
- Static host: your IP and that you loaded Lightfoot, not your addresses.
- Our gateway: your IP and that you use Tor, not what you ask.
- Tor or Nym exit: which endpoint you reach, not your IP.
- RPC endpoints and Colibri provers: which addresses and tokens are queried and when, from an exit IP, one account per lane. They cannot tie your accounts together except through timing.
- No analytics, trackers, CDNs or web fonts.

**S (how keys and data are protected, and the trust assumptions):** No keys: Lightfoot is watch-only, and revokes are signed and sent by your own wallet, through its RPC. Watched addresses and cached results stay in your browser's IndexedDB. Workers run in a sandboxed null-origin iframe with no access to the page, and their bytes must match pinned hashes. Each balance and allowance shown is checked by Colibri against sync-committee-signed headers. We trust an honest sync-committee supermajority (verify the wording against Colibri's docs), the checkpoint pinned in the build, and the code served to you, so build it yourself if that matters.

### Required files

| File | Why |
|---|---|
| `LICENSE` (MIT) | EF CROPS: "Public repo under a free and open-source license" [JC Q2] |
| `README.md` with the CROPS section | EF CROPS qualification; partner judging uses submission materials only [JC Q1] |
| `FEEDBACK.md` | Uniswap requirement [JC Q4], if G3 passed |
| `AI_USAGE.md` and `specs/` | "Attribution" and "Spec-Driven Development" rules [JC Q1] |
| `docs/ledger-sample.json`, `docs/provider-view.md`, `docs/exit-acceptance.md` | Evidence for the traffic-share criterion and the demo |
| `public/workers/*.js` with upstream LICENSE files | Same-origin resolvers |
| `infra/` (gateway unit, Caddyfile, proxy configs) | So anyone can reproduce the demo |
| Not needed: `WHITECHAIN_FEEDBACK.md` | Whitechain skipped |

---

## 11. Risks and fallbacks

| # | Risk | Early signal | Fallback |
|---|---|---|---|
| 1 | Venue Wi-Fi blocks UDP, which kills tor-js over KPS (WebRTC), or blocks WebSocket ports for Nym | D1 fails on venue Wi-Fi | Demo on a Jio hotspot, Airtel as backup; Nym runs over WebSocket on TCP; recorded clips ready |
| 2 | The EF demo gateway disappears ("may disappear at any time" [AR Q1]) | Boot fails on the demo gateway | Our own gateway first in config; a second VPS in another region as a third entry; Nym needs no gateway |
| 3 | Colibri does not work through `worker.fetch`, in the browser, or for `eth_call` | G1 fails | Cross-check mode (two endpoints, two lanes, byte compare) with honest renaming; `@lodestar/prover` for `eth_getBalance` and `eth_call` only if time allows |
| 4 | Colibri provers or public RPCs refuse Tor exits (for example Cloudflare challenges) | Pre-event check 4, D4 | Prefer Nym exits for verified calls; self-hosted prover if one exists; rotate the pool; publish the refusals as data (S3) |
| 5 | Boot is slow (tor-js about 8 s, Nym about 11 s, one sample each [AR Q6]; Nym "tens of seconds" first response [AR Q6]) and stalls the demo | I3 timings | Pre-warm 3 minutes before the slot; instant cached first paint; hot standby; S5 snapshot |
| 6 | Proof bytes for a 200-call multicall are too large over Tor | D4 measurement | Split multicalls by contract group; verify balances first and allowances lazily; shrink the spender list; show "checking" badges progressively |
| 7 | The isolation key is ignored and accounts share one exit | Exit probe shows one IP | Disclose it in the UI and README; S2 per-lane instances; never claim isolation that is not shown |
| 8 | Two harness instances of one specifier clash on shared storage | G2 fails | Stagger boots; or one tor-js plus one Nym, with accounts split across networks; else ship the key only |
| 9 | Harness bugs (the `close()` race [AR Q3]; no boot timeout [AR Q6]) | Hangs in testing | Long-lived workers, never close and reopen; our own 90 s timeout (Kiwi precedent [AR Q2]); vendor the 0xbow patch with credit if needed |
| 10 | The pinned bootstrap does not fit harness internals (unexpected methods or block tags; bundle fetched from the iframe without CORS) | Check 6, D5 | Answer the extra methods; set `Access-Control-Allow-Origin: *` on `/workers/`; worst case, a Colibri-verified direct bootstrap read (still verified, disclosed) |
| 11 | Exit 429s and rate limits on shared exits | Ledger error codes | Coalescing and cache cut request volume; honour `Retry-After`; endpoint rotation |
| 12 | Tab memory with several WASM workers | D6 | Cap at 3 account lanes; drop the Nym hot standby to warm-on-demand; 16 GB laptops |
| 13 | The wallet popup misbehaves on stage | Dry runs | Revoke is shown in the video; live, cancel at the popup |
| 14 | A specifier owner updates a hash mid-event | Watchdog banner | Pinned hashes keep the app working; show the banner as a feature |
| 15 | Schedule slips | Missed gate | Cut order in 6.5; feature freeze holds at 22:00 regardless |
| 16 | Disqualification on history or AI rules | n/a | Commits every 45 minutes; AI_USAGE.md kept up to date; `specs/` committed |
| 17 | VPS outage during judging | Health check at 07:00 | systemd restart; second VPS; Nym needs neither |

---

## 12. Likely judge Q&A

1. **"Tor hides your IP, but the RPC still sees which addresses you ask about. Isn't that still a leak?"** Yes, and we say so. Hiding query content needs PIR, which EF has as a Q4 2026 mainnet demo [AR Q4]. What we stop is the IP-to-address link and cross-account linking: one lane per account, no shared batches, separate caches, and separate circuits where the worker allows. Timing remains a residual risk.
2. **"Why verify? Tor already makes you anonymous."** Anonymity hides who asks, not whether the answer is true. A provider can still lie about a balance or an approval. Worse, the harness's one bootstrap read decides which worker code runs, so a lying bootstrap could swap in a hostile worker. Proofs turn every endpoint into an untrusted pipe.
3. **"What does Colibri trust?"** The sync committee's signatures, starting from a checkpoint pinned in our build. A prover can refuse to answer but cannot forge one; proofs are checked in WASM in the tab. (Have the exact Colibri wording ready from pre-event check 5.)
4. **"How do you get 100% and still feel fast at about 1 s a call?"** About 200 logical reads per account become 3 or fewer requests through Multicall3 and lane-scoped coalescing; the cache paints instantly; lanes run in parallel; the standby network is already booted. The ledger shows naive versus actual counts live.
5. **"Doesn't batching link accounts together?"** It would, which is why batches never cross lanes. Public-lane reads are the same for every user, so they fingerprint nothing.
6. **"Your build pins the worker hash. Doesn't that defeat the specifier's upgradability?"** It turns an automatic upgrade into an informed one. Live specifier owners are single EOAs, not renounced [AR Q1], and the owner key "is the supply chain for every host pinned to that address" [AR Q6]. We re-check the on-chain value privately after boot and show a banner on change. Privacy Pools pins too [AR Q2]; what we add is booting with no RPC read at all.
7. **"What if Tor is blocked or down?"** The router fails closed: paused, no requests. Then it promotes Nym. No code path exists to a direct connection, the lint rule enforces that, and the runtime guard blocks library leaks.
8. **"Could this ship tomorrow?"** It is a static site with no backend. The provider layer is one EIP-1193 object, and Kohaku already has both an anon and a Colibri backend that are mutually exclusive today [AR Q5], so an upstream composition is the obvious next PR. The gateway we run can be replaced by anyone's.
9. **"Why Colibri and not Helios?"** Helios TS has no fetch injection [AR Q5], so routing it through Anon-RPC means patching its Rust and WASM HTTP layer. Colibri documents a `fetch` hook for exactly this [AR Q5].
10. **"What did you build, and what did you reuse?"** Reused: the harness, the tor-js and Nym workers, Colibri, viem, the tor-js-gateway and Walletbeat's lying proxy. Built: the router and fail-closed state machine, lanes and coalescer, the zero-read bootstrap and watchdog, the ledger and egress guard, the approvals and Permit2 logic, the UI, the fixtures and the exit-acceptance data.

The three prep questions ETHGlobal lists [JC Q1]:
- **Inspiration:** Vitalik's "our wallets don't even verify the chain, send our private data out to a dozen third-party servers" [EG Q4], and Walletbeat's 24 of 24 wallets without a default light client [PS].
- **Tools and why:** see Q9.
- **Challenges:** latency versus unlinkability (Q4, Q5), and the bootstrap trust read (Q6).

---

## 13. AI usage and attribution plan

Facts [JC Q1]:
- AI use is allowed with "Attribution: Clearly document in your submission where and how AI tools were used".
- "Involvement: AI tools should be used to assist your development process, not to create the entire project".
- Spec-driven workflows must "include all spec files, prompts, and planning artifacts".
- The video must not use "a text to speech synthesizer / AI Voiceover".

Plan (Judgement):
- **Tools to declare:** whatever the team actually uses (for example Claude Code, Cursor, Copilot), each listed by name in AI_USAGE.md.
- **Where AI helps:** React components and styling, ABI encoding helpers, test scaffolding, README prose drafts.
- **Where humans decide:** the architecture (lanes, fail-closed, bootstrap), the trust analysis, the CROPS text, the lying-proxy scenarios, and every security-relevant line in `src/egress/` and `src/bootstrap/`, which are hand-written or line-by-line reviewed.
- **`AI_USAGE.md`:** a table of file or folder, tool, what the AI did, and the human reviewer, updated at each integration point (I1, I2, I3) so it is not reconstructed at 02:00.
- **`specs/`:** this plan as `specs/PLAN.md`, labelled "pre-event ideation written 2026-10-27, AI-assisted (Claude), no code", plus one short spec per MVP item and the prompts that produced generated code (`specs/prompts/<date>-<topic>.md`).
- **Attribution goes in the repo files above and in the submission text,** not in commit trailers. That follows the team's rule of no AI attribution in commit messages or PR descriptions; ETHGlobal asks for attribution "in your submission", which these files provide.
- **Video:** narrated live by P3 in a human voice. No AI voice, no AI-generated music, no AI-generated footage.
- **Q&A readiness:** each person can explain any file they own without looking at the AI transcript. That is the practical test of the "Involvement" clause.
