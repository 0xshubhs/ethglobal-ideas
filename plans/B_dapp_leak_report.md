# Build plan B: Dapp Leak Report (canary-wallet leak tracing for any dapp)

ETHGlobal Mumbai, 5 to 7 November 2026, Jio World Convention Centre, alongside Devcon 8 India. Plan written 27 Oct 2026 for a 3 person Classic track team.

## How to read this plan

- Every sourced fact carries a tag. The four source notes live in `research_notes/EF tracks and Whitechain ideas/`:
  - [JC] `judging_criteria.md`
  - [PSG] `privacy_stack_gaps.md`
  - [EFG] `ef_goals_and_gaps.md`
  - [ARPC] `anon_rpc.md`
  - [CHK] a check I ran while writing this plan (npm registry, GitHub API, Foundry `cast`) on 26 and 27 Oct 2026. Re-verify these on day one.
- Text labelled **Judgement** is my own reasoning, not a sourced fact. Untagged design detail (what we build and how) is also my proposal.
- Roles used throughout: **A** = engine lead (browser, canary wallet, capture), **B** = analysis and Anon-RPC lead (taint matching, scoring, fix mode, GitHub Action), **C** = product and demo lead (UI, fixture dapp, leaderboard, README, video, presenter).

## 0. Decision summary

| Decision | Choice |
|---|---|
| What we build | A local CLI and UI that connects a freshly minted "canary" wallet to any dapp in real Chromium, traces every place that address (and your IP) goes, scores the result against the EF access-layer guarantees, writes a draft CROPS "P" line, then re-runs with RPC forced through Anon-RPC to show the fix. Plus a GitHub Action that fails a build when a new leak appears. |
| Single EF prize | **Best CROPS App** (lead property: Private). We stay qualified for Anon-RPC as EF's fallback placement at no extra cost (section 2.1). |
| Other partner prizes | **None.** No partner's verbatim requirements fit without bolting on something cosmetic (section 2.2). Arkiv is a conditional check only. |
| ETHGlobal finalist track | Yes, this is the main target alongside EF. |
| Cut from the starting concept | The "wallet leak lab" page: the PoPETs 2026 authors already host demo pages for those wallet threats [CHK]. |
| Moved to stretch | Public leaderboard (stretch 1), Anon-RPC coverage audit (stretch 2). |
| Team fit | No Solidity is needed. The security mindset carries over (taint tracking, ground-truth fixtures, audit-style findings, calldata decoding); Solidity skills do not. Section 5.13. |
| Biggest risk | Automating "connect wallet" on arbitrary real dapps (bot checks, custom modals). Fallbacks are in section 11. |

## 1. Verifiable promise and pitch

**One-sentence verifiable promise:** Name any dapp; we mint a wallet address in front of you that has never existed before, connect it in a real browser, and within about a minute show byte-level proof of every third party that received it, then re-run the same session through Anon-RPC and prove the RPC provider now sees a Tor exit instead of you.

Why judges can watch it being proven (**Judgement**):
- A fresh random 160-bit address can only reach a third party through this session, so every red row proves itself. Clicking it shows the raw request with the address highlighted. No trust in our tracker lists is needed for the core claim.
- Judges pick the dapp from a pre-verified list, or name their own.
- The Tor claim is checked by the Tor Project's own `check.torproject.org/api/ip`, called through the same Anon-RPC worker that carries the dapp's RPC calls: `IsTor: false` before, `IsTor: true` after.
- For the fixture dapp, which we control, the "third party" server log contains the canary before and nothing identifying after. That is exactly EF's suggested proof: "show server logs with nothing identifying in them" [JC Q2].

**Three-line pitch:**
1. Every dapp you connect quietly hands your wallet address, and your IP, to RPC providers, analytics, screening vendors and embedded widgets. Nobody measures it, so nobody fixes it.
2. Dapp Leak Report connects a brand-new canary wallet to any dapp and traces exactly where that address goes. The result is scored against the EF's own access-layer guarantees and comes with a ready-to-paste CROPS "P" line.
3. One click re-runs it with reads forced through Anon-RPC to show the fix, and a GitHub Action makes "no new leaks" a failing build check. Everything runs locally from a GPL repo, with no server of ours.

**Sourced motivation for the pitch:**
- About two thirds of 78 DeFi sites embed third-party scripts, and 17% send users' Ethereum addresses to third parties [PSG, arXiv 2109.06836].
- One study found over 2,000 leaks across 211 of 616 dApps [PSG, arXiv 2306.08170].
- Even a privacy app regressed: Privacy Pools records that "the 2026-08-26 leak was 108 per-nullifier `eth_call`s issued by SDK internals during a single send" [ARPC Q2]. A CI leak gate exists to catch exactly that kind of regression.
- The 1TS dashboard names the risk: "Reliance on centralized or opaque RPC providers exposes wallet and transaction metadata" [EFG Q3].
- The research found no dapp-level leak report or privacy score. Walletbeat and L2BEAT do not cover dapps [PSG].

**Variant chosen (Judgement):** Keep the starting concept, but make the **canary wallet** the core primitive and centre the pitch on its self-proving evidence. Then:
- Drop the wallet leak lab (prior art below).
- Keep the GitHub Action in the MVP in a minimal form, because it is the "could it ship" story.
- Move the leaderboard to stretch 1. It is cheap once the engine is stable, but it depends on the engine being robust across many dapps.

## 2. Prize targets

### 2.1 Single EF prize: Best CROPS App (primary), with Anon-RPC as EF's fallback placement

Facts:
- Best CROPS App is $3,500 (1st $2,000, 2nd $1,000, 3rd $500). Its idea list includes, verbatim, "a tool that shows what an app leaks (RPC calls, trackers, metadata)" [JC Q2].
- Best Use of Anon-RPC is $5,000 (1st $2,500, 2nd $1,500, 3rd $1,000). Qualification: "Your app routes its RPC reads through Anon-RPC by default." [JC Q2]
- "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best." [JC Q2]
- Anon-RPC hides the IP, not the query: every network hides the IP "and none hides what the wallet asks (that needs PIR)" [ARPC Q4]. The threat map also lists "Everything outside RPC" (price APIs and indexers leak) as open [ARPC Q6].
- The CROPS criteria are marked "(tbc: final review pending)" [JC Q2].

**Judgement: CROPS App is the better primary target.**
1. The idea is a near-verbatim match for a listed CROPS example.
2. Most of what the tool finds will sit outside RPC (analytics, screening, widgets, fingerprinting), which Anon-RPC cannot fix. The product's core value is P across all third parties, not RPC routing.
3. The Anon-RPC criterion "how much of the app's traffic goes through Anon-RPC" is about the submitting app's own traffic. Our baseline mode deliberately lets the scanned dapp leak, which is awkward to defend under that criterion.
4. EF places the project, so we keep Anon-RPC eligibility for free:
   - All of our own RPC reads (canary wallet reads, exit-IP checks) go through Anon-RPC by default.
   - Fix mode is an Anon-RPC demo.
   - Stretch 2 measures EF's traffic-share criterion for other apps.

**Counter-argument, stated honestly:** the Anon-RPC pool is larger, and because the leak tool is a listed CROPS example, judges "will see several" similar tools [PSG, inference]. We answer that with depth:
- canary proof;
- W and P scoring;
- an honest before and after;
- the CI gate;
- a ground-truth fixture;
- the Anon-RPC coverage audit.

**Submission mechanics:** select Ethereum Foundation once in the partner step (it counts as 1 of the 3 partner slots) and tick both CROPS App and Anon-RPC if the form offers per-track boxes. The README states "Primary: Best CROPS App" and includes an Anon-RPC usage table, so either placement is easy to judge.

**Ask EF at the Thu 17:00 IST workshop:**
- Would a leak auditor with an Anon-RPC fix mode be placed in CROPS or Anon-RPC?
- Is applying the wallet guarantees (W-1 to W-3) to dapps acceptable?
- Is an Anon-RPC 0.4.0 npm release coming?

### 2.2 Other partner prizes: none genuinely fit

| Partner (pool) [JC Q4] | Verbatim hook | Verdict | Reason (Judgement) |
|---|---|---|---|
| ENS ($10,000) | "ENSv2 features should be central to the product, not a cosmetic add-on" | Skip | We measure ENS and CCIP-Read lookups but do not build on ENSv2. Publishing reports under subnames would be the cosmetic add-on the text rules out. |
| Chainlink CRE ($1,500) | "Integrate at least one blockchain with an external API ... Be meaningfully used" | Skip | A CRE workflow that posts scores onchain would be decoration and would add a Chainlink dependency to the C line. |
| Uniswap Foundation ($15,000) | "Build on or integrate any part of the Uniswap stack" | Skip | Scanning app.uniswap.org is not an integration. |
| Whitechain ($15,000) | "At least one payment in USDT ... settled on Whitechain in your main flow" | Skip | There is no payment flow. |
| World IDKit ($2,500) | "minimum sufficient assurance" | Skip | No credential is needed. Adding one adds a third party. |
| 0G Wildcard ($2,000) | "a 0G Compute request id ... a 0G Storage root hash ..." | Skip | Forced fit. An AI summary on 0G Compute would add a third party to a privacy tool. |
| Arc ($15,000) | "Every Arc prize requires using Arc Studio as the starting point" | Skip | A hosted AI builder start conflicts with O and with our Classic workflow. |
| Hedera, 1inch, Definitive | x402 on Hedera, Aqua/SwapVM, Flash orders | Skip | Unrelated domains. |
| Arkiv ($15,000) | "Prize details coming soon" | Conditional, default skip | Check at the Thu 16:00 workshop. Go only if the text rewards publishing open datasets and integration costs under 3 hours (leaderboard data). Otherwise skip. |

Skipped EF prizes:
- **Frame Transaction Alternative Mempool:** it requires "a link to your admitted transaction on the devnet explorer, or code that submits one" [JC Q2], and we send no transactions.
- **Best CROPS Upgrade to an Existing Project:** it is Continuity-only [JC Q2], and we are Classic.

### 2.3 ETHGlobal finalist track

Facts:
- The finalist track is separate and "does not count as a Partner Prize". Teams opting into "Finalist and Partner Prizes" get "7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A" on Sat 7 Nov, 09:30 to 12:30 IST [JC Q1].
- Recent 2026 events named a top 10 [JC Q1].
- By the researcher's own count, about a third of 30 recent IRL finalists are security, privacy or self-custody projects. They include npmguard (Cannes 2026), a developer-security tool by its name [JC Q5].
- The recurring finalist pattern is "a one-sentence verifiable promise plus a live proof of it" [JC Q5, inference].

**Judgement:** the canary demo is built for that pattern.

## 3. Criteria matrix

### 3.1 EF Best CROPS App: judging criteria (verbatim [JC Q2], marked "(tbc: final review pending)")

| Criterion | How the plan scores | What judges see |
|---|---|---|
| "works end to end in the demo" | Live path: paste URL, scan, report, fix mode, diff, on a dapp the judges pick from a list pre-verified on Friday night. Also the fixture dapp with a 9 of 9 ground-truth check. | Real browser, live findings stream, before and after. A cached report is one keypress away if the venue network fails. |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | 1. The evidence proves itself (fresh canary plus raw bytes), so the core claim needs no trust in us. 2. There is no server of ours: the CLI and Action run from the repo. 3. The CI gate turns "no new leak" into a build invariant rather than a policy. 4. Fix mode changes the transport, which is what a dapp gets by adopting Anon-RPC. | The fixture tracker's server log before (canary present) and after (nothing identifying). The CI run going red on a PR that adds a tracker. |
| "the other three still hold, or trade-offs are stated in the README" | C: runs locally, with documented fallbacks for the gateway. O: GPL-3.0-or-later and builds from the repo alone. S: throwaway in-memory key that never enters the page; sandboxed worker with a pinned hash. Trade-offs stated: a scan visits the dapp from your IP; our gateway sees your IP; one bootstrap read; W-2 is not fixed by fix mode. | The README CROPS section (section 10) and a "Trade-offs" table. |
| "UX: would someone use it without knowing what CROPS means" | The headline is plain language, for example "4 companies received your wallet address. 11 saw your IP." W and P guarantees sit in an expandable panel. One URL box or one command. | The judge reads the headline without a glossary. |
| "could it ship after the hackathon" | npm CLI, a GitHub Action and a static leaderboard. Zero infrastructure to run. Entity data can be upstreamed to Walletbeat (MIT). Every CROPS team needs a P line. | Install line, Action YAML, and a demo PR in the fixture repo. |

### 3.2 EF CROPS qualification requirements (verbatim [JC Q2])

| Requirement | How we meet it |
|---|---|
| "Public repo under a free and open-source license (MIT, Apache-2.0, GPL, MPL or similar), with a README a judge can run it from." | GPL-3.0-or-later. The Mandate says "viral copyleft licenses are appreciated" [EFG Q1], and GPL lets us vendor the EasyPrivacy list (license to verify pre-event). Running it takes `pnpm i`, `pnpm build`, `pnpm leakreport scan <url>`. B tests a clean clone at Sat 05:30. |
| "The README has a section titled CROPS, one or two lines per letter" (C, O, P, S prompts) | Drafted in section 10, answering each prompt as worded. |
| "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters" | Video cut at about 2:45 (section 9.2). The moment is the canary in a third-party request, then the empty tracker log and Tor exit proof after the fix. |
| "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not." | The UI and leaderboard load nothing external (system fonts, everything bundled). Our Action scans our own UI on every push ("dogfood: 0 third-party requests"). The canary key lives only in Node memory. Reports redact cookies, auth headers and the scanning machine's IP. |
| "One EF prize per project." | We select EF once and state CROPS App as primary. |

### 3.3 EF Best Use of Anon-RPC (fallback placement only; verbatim [JC Q2])

| Criterion | How the plan scores |
|---|---|
| "works end to end in the demo" | Fix mode boots tor-js (Nym as fallback), and the dapp works through it. |
| "quality of user experience in demo" | The sidecar is pre-warmed, so there is no visible 8 s boot. A progress bar shows each routed call. |
| "how much of the app's traffic goes through Anon-RPC (if an app)" | 100% of our own RPC reads, except one disclosed specifier bootstrap read. Fix mode shows a traffic-share meter for the scanned dapp. |
| "if you choose to exclude some traffic as an intentional performance/anonymity tradeoff ... just let us know" | The README Anon-RPC table lists exclusions: the bootstrap read and WebSocket RPC in the MVP. |
| "could this be shipped for real after the hackathon" | Same as CROPS. Stretch 4 (a local anonymized JSON-RPC proxy) is a reusable piece. |
| "technical depth" | Playwright-hosted harness sidecar, route-level JSON-RPC rerouting with CORS handling, honest residuals (W-2 still fails through one exit). |
| Qualification: "Your app routes its RPC reads through Anon-RPC by default." | Our own reads do by default. The scanned dapp's reads are rerouted in fix mode. |

### 3.4 ETHGlobal finalist criteria (verbatim [JC Q1])

| Criterion | How the plan scores |
|---|---|
| "Technicality: How complex is the problem you're addressing, and how sophisticated is your solution?" | A synthetic EIP-1193 and EIP-6963 wallet injected into every frame, with frame attribution. Taint matching across many encodings (ABI-padded, checksummed, hashed, base64, gzip bodies, ENS reverse namehash, WebSocket frames). Route-level Anon-RPC rerouting. A ground-truth fixture with 9 planted leaks. |
| "Originality: Is your project introducing a new idea or creatively solving an existing problem?" | The canary-wallet method for dapps, scored in EF vocabulary. No dapp-level leak report was found in the research [PSG]. |
| "Practicality: How complete and functional is your project? Could it be used by its target audience today?" | Dapp teams can run the CLI and Action today. Stretch: offer scans to consenting Mumbai CROPS teams on Friday night, giving real users before judging. |
| "Usability (UI/UX/DX): How intuitive is your project? Have you made it easy for users to interact with your solution?" | One URL box. Plain-language headline. Each finding has evidence, an explanation and a fix snippet. One YAML block for CI. |
| "WOW Factor: Does your project leave a lasting impression? ..." | A judge-picked dapp, an address born on screen showing up at a vendor, `IsTor: true` after one switch, and a red CI check. |

### 3.5 ETHGlobal submission rules we must satisfy [JC Q1]

- Video "between 2 and 4 minutes", ">= 720p", no speed-up, no "text to speech synthesizer / AI Voiceover", intro under 20 s, "no more than 4 bullet points per slide". We cut **2:00 to 2:59** so the same file also meets EF's "3 minutes max".
- "Submissions with large single commits or missing histories may be disqualified". We push at least hourly from all three laptops.
- "Clearly distinguish between what's new and what's reused": the README has a "New vs reused" table.
- AI: "Attribution", "Involvement", and for spec-driven work "you must include all spec files, prompts, and planning artifacts" (section 13).
- Classic: "all work on your project must begin after the hackathon officially starts" (Thu 21:00 IST). Section 7 keeps pre-event work to reading, installing and manual checks.

## 4. Prior art and differentiation

| Prior art | What it does | Why we are not it | Source |
|---|---|---|---|
| Walletbeat wallet-data-collection CLI | mitmproxy captures of wallet UX flows. It classifies domains, purposes and data, "but you still need to manually interact with the wallet". | Covers wallets, not dapps. Manual flow, no canary. | [PSG], README read [CHK] |
| Walletbeat `entity-domains.json` | Domain-to-entity map, 26 entries on the beta branch. | Small seed. We extend it with web3 entities and can upstream them (MIT). | [CHK] |
| PoPETs 2026 "The Masks We (Think We) Wear" plus its artifact | 85 wallet extensions: RPC address linking, stale revoked addresses, provider injection into cross-origin iframes. The artifact hosts demo pages for EIP-6963 detection, revoke support and never-connected exposure. | The wallet side is covered, and the demos already exist, so we do not build a wallet leak lab. We borrow the iframe-exposure threat at dapp level. | [PSG], repo read [CHK] |
| "Is Your Wallet Snitching On You?" (arXiv 2306.08170) | 616 dApps and 100 wallets; over 2,000 leaks across 211 dApps. | A one-off study, not a tool a team runs in CI. | [PSG] |
| DeFi third-party script study (arXiv 2109.06836) | 78 DeFi sites; 17% send addresses to third parties. | A study, and old. | [PSG] |
| dapp-frontend-check | A static source scanner for API-keyed RPC URLs, unlimited approvals and `eth_sign`. | No runtime behaviour. We reuse the idea for our static check and credit it. | [PSG], license MIT [CHK] |
| interceptor (ETHGlobal New Delhi 2025) | A Rust JSON-RPC proxy that intercepts calls. | RPC only, with no trackers, scoring or fix. | [PSG] |
| No Privacy (ETHGlobal Prague 2025) | Shows what minimal onchain data reveals. | A different layer (chain data, not app egress). | [PSG] |
| Privacy Pools egress allowlist | A fail-closed allowlist in one app's transport. | Enforcement for one app, not measurement for any app. Their incident motivates our CI gate. | [ARPC Q2] |
| Anon-RPC bench | Measures worker boot and latency. | Measures workers, not app coverage. | [ARPC Q6] |
| L2BEAT privacy, PSE Private Transfers Dashboard | Protocol-level privacy ratings. | No dapp or RPC dimension. | [PSG] |
| OpenWPM (GPL v3) | General web privacy measurement framework. | Not wallet-aware: no canary address, no RPC semantics. | License [CHK]; Judgement |

What is new (**Judgement**):
1. **Canary taint tracking for wallets.** A fresh address per run makes address-leak attribution free of false positives by construction. Misses are possible and disclosed.
2. **A synthetic wallet that dapps accept.** EIP-6963 announce, wagmi-compatible reconnect, frame-attributed provider calls, and signing in Node so the key never enters the page.
3. **EF vocabulary.** Findings map to W-1 to W-6 and P-1 to P-4, with "not measured" stated honestly, and the tool writes the README P line that every CROPS team must produce.
4. **An honest before and after with Anon-RPC.** It includes residuals Anon-RPC cannot fix: query content, W-2 through one exit, and non-RPC trackers.
5. **Privacy as a CI invariant.** A Foundry-invariant mindset applied to egress.
6. **A ground-truth fixture.** "Damn Leaky Dapp" (in the spirit of Damn Vulnerable DeFi) has 9 planted leaks and a test that the scanner finds all of them.

## 5. Architecture

### 5.1 Components

| Component | Runs where | Owner | What it does |
|---|---|---|---|
| `packages/canary-wallet` | Init script in every frame of the dapp tab, plus a Node bridge | A | EIP-1193 provider and EIP-6963 announce. Every call crosses to Node through `exposeBinding`, which records the calling frame. Node signs with the throwaway key and forwards reads through the sidecar. |
| `packages/engine` | Node 24 plus Playwright Chromium | A | Contexts, scripted flow (load, connect, dwell, switch account, dwell), and capture of requests, responses, beacons, WebSocket frames, provider calls, fingerprinting calls and screenshots into a JSONL event log. |
| `packages/analyzer` | Node | B | Taint matcher, JSON-RPC parser, entity classifier, guarantee scorer, P line generator, before and after diff. Calldata decoding is stretch 3. |
| `packages/anon-sidecar` | A localhost page in a separate browser context | B | Boots `AnonRpcWorker` (tor-js by default, Nym as fallback) and exposes `anonFetch`. Used for fix-mode rerouting, the wallet's own reads and the exit-IP check. |
| `packages/cli` | Node | B | `leakreport scan`, `--fix`, `ui`, `static`, and `proxy` (stretch). |
| `apps/ui` | Served by the CLI on 127.0.0.1 | C | URL box, live findings stream over SSE, report view. The same React report component is compiled into a self-contained `report.html`. |
| `fixtures/damn-leaky-dapp` | Laptop or CI, on `*.localhost` hostnames | C | A wagmi dapp with 9 planted leaks, plus mock third-party servers that log what they receive. |
| `action/` | GitHub-hosted runner | B | Composite Action: static bundle scan plus dynamic scan, job summary, report artifact, non-zero exit on findings. |
| `apps/leaderboard` (stretch 1) | Static, on GitHub Pages | C | Table generated from committed `data/scans/*.json`. |
| tor-js gateway | Our VPS, UDP 12298 | B | A blind KPS relay to Tor relays, run from the public `ethereum/tor-js` crate. It is a demo convenience, not a dependency. |

### 5.2 Diagram

```
+--------------------------- your laptop or CI runner ----------------------------+
|                                                                                 |
|  leakreport CLI (Node 24, TypeScript)                                           |
|     |                                                                           |
|     +--> Playwright 1.64.1 --> Chromium                                         |
|     |      [dapp context]  temp profile, service workers blocked                |
|     |         init script in every frame: canary wallet (EIP-1193 + EIP-6963), |
|     |         fingerprint hooks          --exposeBinding-->  Node wallet bridge |
|     |         network + WebSocket listeners -----------------> events.jsonl     |
|     |         fix mode: context.route(JSON-RPC) --> Node --> sidecar            |
|     |      [sidecar context]  127.0.0.1 page: @anon-rpc/browser-harness         |
|     |         AnonRpcWorker (tor-js, Nym fallback) in null-origin sandbox       |
|     |                                                                           |
|     +--> analyzer: taint match, classify, score W/P, P line, diff               |
|     +--> report.json + report.html (self-contained) + local UI on 127.0.0.1     |
+---------------------------------------------------------------------------------+
        | baseline: dapp traffic leaves directly        | fix mode: dapp JSON-RPC and
        v                                               v our own reads
  RPC providers, analytics, screening,          KPS over WebRTC --> tor-js gateway
  widgets, CCIP-Read gateways (they see         --> Tor circuit --> same RPC provider
  your IP plus the canary)                      (it sees a Tor exit plus the canary)
```

### 5.3 Data flow

Baseline scan (about 60 s):
1. Generate canary accounts A and B in Node memory (`viem/accounts`).
2. Launch a Chromium context with a temp profile and `serviceWorkers: 'block'`, and install the init script in all frames.
3. Navigate and wait for network idle, bounded at 15 s.
4. Connect, in this order: wagmi reconnect storage seeding, then a per-dapp recipe if one exists, then the button heuristic, then assist mode (a human clicks, headed).
5. Dwell 20 s. Emit `accountsChanged` to B. Dwell 15 s. Screenshot after each step.
6. Run the analyzer over `events.jsonl` to produce `report.json`, then `report.html`.

Fix mode (about 90 s):
1. Pre-warm the sidecar (tor-js boot is about 8 s [ARPC Q6]).
2. Run the same flow with `context.route` installed:
   - JSON-RPC POST (detected by body shape): forward the body to the sidecar, which calls `anonFetch(originalUrl, init)`, then `route.fulfill` with CORS headers for the page origin.
   - Tracker domains (EasyPrivacy plus our map): `route.abort`.
   - Everything else: `route.continue`.
3. The provider sees a Tor exit, so we record any refusal (HTTP 403 or 429, a Cloudflare challenge). A refusal is itself a C finding: "this dapp's RPC provider refuses anonymous users". Optional: swap to a keyless provider for chain 1.
4. Call `check.torproject.org/api/ip` through `anonFetch` and directly. Show both results.
5. Diff baseline against fix mode: third parties holding the canary, parties seeing your IP, Anon-RPC traffic share, guarantee changes.

### 5.4 The canary wallet (spec written by A at 21:00 into `specs/canary-wallet.md`)

| Method or event | Behaviour |
|---|---|
| `eth_chainId` | Answered locally (default `0x1`). |
| `eth_accounts` | `[]` before connect, `[A]` after, then `[B]` after the switch. Top frame only. Cross-origin frames get `[]` and the attempt is logged with the frame URL. |
| `eth_requestAccounts`, `wallet_requestPermissions` | Auto-approve with standard shapes. |
| `personal_sign`, `eth_signTypedData_v4` | Signed in Node with the throwaway key and logged (for example, SIWE goes to the dapp backend). |
| `eth_sendTransaction`, `wallet_sendCalls` | Always rejected with 4001. Calldata is logged for P-3 (stretch). |
| `wallet_switchEthereumChain` | Accept for known chains and emit `chainChanged`. |
| Read methods (`eth_call`, `eth_getBalance`, `eth_blockNumber`, ...) | Forwarded from Node through the sidecar's Anon-RPC worker to a keyless RPC. They never come from the page, so they never pollute the dapp's capture. |
| Anything else | Error 4200. |
| EIP-6963 | Announce on load and on `eip6963:requestProvider`. Profile `metamask-compat` (default) sets `isMetaMask` and MetaMask-like info, because many modals only list MetaMask. This is disclosed in the methodology. Profile `honest` announces as "Leak Report Canary". |

**Judgement:** signing in Node matters for S. The target dapp's JavaScript can never read the key, because the key is never in the page.

### 5.5 Taint matcher encodings (B, with unit tests)

For each canary we search request URLs, headers, bodies (gunzipped or inflated when `content-encoding` is set), cookies and WebSocket frames for:
- lowercase hex, with and without `0x`;
- EIP-55 checksummed and uppercase forms;
- ABI-padded forms (covered by the substring search);
- URL-encoded forms;
- base64 and base64url of the 20 raw bytes and of the ASCII string;
- sha256, sha1, md5 and keccak256 of the lowercase and checksummed strings (hex and base64);
- the ENS reverse node `namehash("<hex>.addr.reverse")`, so a hashed reverse lookup still counts.

A request carrying both A and B is flagged for W-2.

**Judgement:** a hash of a fresh random address is as unique an identifier as the address itself. So a hashed leak is a leak, and the report says so in plain words.

### 5.6 Classification, severity and guarantee mapping

Classification:
- The party is the eTLD+1 from `tldts`. Fixture hostnames under `*.localhost` count as separate parties.
- Entity and category come from a curated web3 map: RPC providers, screening vendors, portfolio and indexer APIs, wallet infrastructure, ENS and CCIP gateways, analytics, session replay, error telemetry. The map is seeded from Walletbeat's mapping (MIT) [CHK], with EasyPrivacy filter matching through `@ghostery/adblocker`.
- Unknown domains are shown as "unclassified third party", never hidden.
- Evidence (the raw bytes) never depends on classification. Only the label does.

Severity (audit style, with IDs such as `DLR-H-01`):
- **High:** canary received by analytics, session replay, ads, a fingerprinting vendor or an unclassified third party, or by a cross-origin frame.
- **Medium:** canary received by a screening vendor or portfolio API; an API-keyed RPC URL; W-2 linkage; third-party fingerprinting API use.
- **Low:** canary received by the dapp's RPC provider (functionally needed, and fixable with Anon-RPC); ENS or CCIP lookups through third-party gateways.
- **Info:** third parties that saw your IP but not the canary.

Guarantee IDs and wording come from the EF access-layer-resources catalog [EFG Q3]. Those W guarantees are written for wallets, so applying them to dapps is our adaptation and the report says so.

| Guarantee [EFG Q3] | Measured as | MVP status |
|---|---|---|
| W-1 address-to-IP unlinkability | FAIL if any canary-bearing request leaves directly from your IP to a non-RPC party. PARTIAL if only RPC providers receive it. PASS if every canary-bearing request goes through Anon-RPC. | Measured |
| W-2 address-to-address unlinkability | FAIL if one party receives both A and B in a session, or if one request carries both. Walletbeat lists IP and time correlation as multi-address correlation [PSG]. | Measured |
| W-3 no usage-data exfiltration | FAIL if analytics, session replay or fingerprinting vendors are contacted at all, with or without the canary. | Measured |
| W-4 zero option | Does the app still read state when its default RPC provider is blocked? | Not measured (stretch 5) |
| W-5 user-controlled safety features | Wallet feature | N/A |
| W-6 key lifecycle without custody or linkage | Wallet keys | N/A |
| P-1 counterparty privacy | Needs a payment flow | Not measured |
| P-2 "No intermediary can block a payment" | Info only: bundler, paymaster and relayer endpoints observed (for example `eth_sendUserOperation`) | Partial (info) |
| P-3 bounded recurring authority | Decode approve or permit amounts in rejected transactions | Not measured (stretch 7) |
| P-4 independently verifiable settlement | Needs a payment flow | Not measured |

Grade:
- **A** requires W-1 PASS and no Medium or High findings.
- **B** means nothing above Low.
- **C** means any Medium.
- **D** means any High.
- **F** means High findings from 3 or more parties.

The rubric lives in `docs/methodology.md`.

**Draft P line generator output format** (filled from findings; the bracketed parts are placeholders, not measured results):

> P (measured by Dapp Leak Report v0.1.0 on [date], connect flow only, fresh canary): the connected address is sent to [3] third parties: [rpc host] (RPC reads, together with your IP), [analytics host] (analytics identify), [screening host] (address screening). [9] further third-party domains see your IP and the page you are on. Fingerprinting APIs used by: [none]. RPC reads do not use Anon-RPC.

### 5.7 Fix mode suggestions shown in the report

The report shows the documented integration shape [ARPC Q1, Q2]. `fetchFn` exists in viem's `http()` source but not its docs [ARPC Q2], so verify it on day one.

```ts
import { AnonRpcWorker } from "@anon-rpc/browser-harness";
import { http } from "viem";

const worker = new AnonRpcWorker({
  address: "0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e",
  config: { gateways: [GATEWAY_ADDRESS] },
  preExisting: { rpcProvider: bootstrapProvider },
});

export const transport = http(RPC_URL, { fetchFn: worker.fetch });
```

Further suggestions:
- Remove or consent-gate the listed analytics.
- Stop sending the address to screening from the client, or move screening behind the user's explicit action.
- Use a keyless RPC or the wallet's provider for reads.

### 5.8 GitHub Action (B)

Static scan of `dist/`:
- API-keyed RPC URL patterns (Alchemy `/v2/<key>`, Infura `/v3/<32 hex>`, QuickNode token paths and similar). Verify the patterns against real URLs on day one; the idea comes from dapp-frontend-check [PSG].
- Tracker and analytics SDK hostnames.
- Output as `file:line`.

Dynamic scan:
- Serve `dist/` locally and run `leakreport scan`.
- Fail if any canary reaches a host not in `allow`, or if a finding meets `fail-on`.

Output:
- Markdown to `$GITHUB_STEP_SUMMARY`.
- `report.html` through `actions/upload-artifact`, which is GitHub's own service, not a third party.

```yaml
name: leak-gate
on: [pull_request]
jobs:
  leaks:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: pnpm install --frozen-lockfile && pnpm build
      - uses: OUR_ORG/dapp-leak-report/action@v0
        with:
          serve-dir: dist
          allow: ethereum-rpc.publicnode.com
          fail-on: medium
```

Latest release tags on 27 Oct 2026 [CHK]: `actions/checkout` v7.0.1, `actions/setup-node` v7.1.0, `pnpm/action-setup` v6.1.0, `actions/upload-artifact` v7.0.2.

### 5.9 Exact packages and versions

Latest on the npm registry, checked 26 to 27 Oct 2026 [CHK]. Lock exact versions with a lockfile at Thu 21:00.

| Package | Version (published) | License | Use |
|---|---|---|---|
| Node.js | 24 LTS (24.14.1 on the dev machine) | MIT | Runtime |
| `playwright` | 1.64.1 (14 Oct 2026) | Apache-2.0 | Browser automation: `addInitScript`, `exposeBinding`, `route`, `routeWebSocket`, `websocket` events |
| `viem` | 2.57.11 (24 Oct 2026) | MIT | Key generation, checksums, keccak, namehash, signing, ABI decoding |
| `@anon-rpc/browser-harness` | 0.3.3 (13 Oct 2026) | MIT | Sidecar harness. Repo main is 0.4.0 (adds `isolationKey`), but no merged worker honours that key, so 0.3.3 is enough [ARPC Q1, Q6] |
| tor-js worker | specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e` (mainnet) | Apache-2.0 [CHK] | Default worker, fetched by hash [ARPC Q1] |
| Nym worker | specifier `0x3aCD9742C68F6d993066Ae25533e09b9e1f60eD0` (mainnet) | (worker repo) | Fallback. Uses WebSocket, so it works where UDP or WebRTC is blocked [ARPC Q3] |
| passthrough worker | specifier `0x4fd77be300f31c5fe6ab266d35d27750a3478d27` | MIT | Plumbing tests only (not anonymous) |
| tor-js-gateway | from `ethereum/tor-js` `crates/tor-js-gateway`, Rust 1.91+ | Apache-2.0 | Our own gateway (UDP 12298) [CHK] |
| `@noble/hashes` | 2.4.0 | MIT | sha256, sha1, md5 encodings |
| `tldts` | 7.4.19 | MIT | eTLD+1 |
| `@ghostery/adblocker` | 2.20.1 | MPL-2.0 | Filter-list matching (EasyPrivacy) |
| EasyPrivacy list | snapshot vendored at Thu 21:00 | GPLv3 or CC BY-SA (verify) | Tracker classification |
| `commander` | 15.0.0 | MIT | CLI |
| `zod` | 4.6.7 | MIT | Event and report schemas |
| `react`, `react-dom` | 19.3.1 | MIT | UI |
| `vite` | 8.3.5 | MIT | UI and fixture build |
| `@vitejs/plugin-react` | 6.1.2 | MIT | |
| `vite-plugin-singlefile` | 2.3.4 | MIT | Self-contained `report.html` |
| `tailwindcss` | 4.3.3 | MIT | Styling (no external fonts) |
| `typescript` | 5.9.3 (pin 5.9, not the new 7.0 compiler, to avoid tooling surprises) | Apache-2.0 | |
| `tsx` | 4.23.15 | MIT | Run TS in dev |
| `vitest` | 5.0.5 | MIT | Unit tests, fixture ground-truth test |
| `@actions/core` | 3.0.1 | MIT | Action summary and outputs |
| `wagmi` (fixture only) | lock at kickoff | MIT | Realistic fixture dapp |

Deliberately not used: `@ghostery/trackerdb` and DuckDuckGo Tracker Radar. The former is CC-BY-NC-SA-4.0 [CHK], and non-commercial terms are not FOSS, which would weaken the O line.

### 5.10 Repos and code to reuse

| Repo | Reuse | License |
|---|---|---|
| `ethereum/anon-rpc` | Harness, SPEC section 5 host API, wallet guide [ARPC Q1] | MIT [CHK] |
| `ethereum/tor-js` | Gateway crate, worker [ARPC Q4] | Apache-2.0 [CHK] |
| `0xbow-io/privacy-pools-website-v2` `services/tor-fetch.ts`, `egress-transport.ts` | Read only. Patterns: fail closed, `credentials: 'omit'`, pin `workerHash` by intercepting selector `0x3898587d` [ARPC Q2]. `cast sig "workerHash()"` confirms `0x3898587d` [CHK] | Check before copying any code |
| `attestate/kiwistand` `anon-transport.mjs` | Read only. Boot timeout and failover patterns (90 s boot, 60 s fail-fast) [ARPC Q2] | Check before copying |
| `walletbeat/walletbeat` | Entity-domain seed, string-entropy idea, multi-address correlation idea [PSG] | MIT [CHK] |
| `podiumdesu/wallet-privacy-threats` | Threat taxonomy, iframe-exposure method [PSG] | MIT [CHK] |
| `INNERLUXES/dapp-frontend-check` | Static pattern ideas [PSG] | MIT [CHK] |
| EasyList/EasyPrivacy | Tracker rules | GPLv3 or CC BY-SA (verify) |

### 5.11 What runs where

| Thing | Where | Who it talks to |
|---|---|---|
| CLI, engine, analyzer, UI | User laptop or CI runner | Only the target dapp (that is the scan itself) and, in fix mode, the Anon-RPC path |
| Canary key | Node process memory, discarded at exit | Nobody |
| Sidecar plus worker | Separate Chromium context on the same machine | Specifier bootstrap read (one keyless RPC call), worker resolvers (fetched by hash), gateway |
| tor-js gateway | Our VPS (demo); anyone can run their own | Sees the client IP and opaque Tor cells only [CHK, gateway README] |
| Leaderboard (stretch) | GitHub Pages, static | No third-party requests (dogfooded) |
| Fixture third-party servers | Local, on `tracker.localhost`, `widget.localhost`, `rpc.localhost`, `ccip.localhost` | Nobody |

### 5.12 Repo layout

```
dapp-leak-report/
  LICENSE
  README.md
  AI_USAGE.md
  specs/
  prompts/
  docs/methodology.md
  packages/canary-wallet/
  packages/engine/
  packages/analyzer/
  packages/anon-sidecar/
  packages/cli/
  apps/ui/
  apps/leaderboard/
  fixtures/damn-leaky-dapp/
  action/action.yml
  data/entities/web3-entities.json
  data/filters/easyprivacy.txt
  data/recipes/
  data/scans/
```

CLI surface:

```
pnpm leakreport scan https://app.example.org --out reports/example
pnpm leakreport scan https://app.example.org --fix --worker tor-js
pnpm leakreport ui
pnpm leakreport static ./dist
```

### 5.13 Team mix

**Judgement:** the plan needs no Solidity.
- A should be whoever is most at home with automation and debugging (Foundry fork-test people usually are).
- C should be the strongest React person and the clearest speaker.
- B should be the most careful reasoner, since B owns the scoring rubric and the README claims.

If the team can add a fourth person (the cap is five [JC Q1]), a front-end developer would take UI load off C. That is not required.

If the team would rather do a Solidity-heavy build, this is the wrong idea for them.

## 6. Scope

### 6.1 MVP (must work end to end), with acceptance tests

1. **Scan:** `leakreport scan <url>` on the fixture finds all **9 planted leaks** (vitest ground-truth test), and on at least 3 of 5 pre-verified real dapps produces a report with an auto-connected canary.
2. **Report:**
   - plain-language headline;
   - "who got your address" table with evidence drawers (raw request, canary highlighted);
   - "who saw your IP" list;
   - fingerprinting calls by script;
   - cross-origin frame provider attempts;
   - W-1 to W-3 verdicts plus the honest status of the other guarantees;
   - copyable P line;
   - self-contained `report.html`.
3. **Local UI:** URL box, live findings stream, report view, both modes.
4. **Fix mode:**
   - JSON-RPC rerouted through Anon-RPC (tor-js, Nym fallback) and trackers blocked;
   - diff view;
   - Tor exit proof (`IsTor` before and after);
   - Anon-RPC traffic-share meter with exclusions listed.

   Fixture acceptance: the tracker server log is empty of canary encodings in fix mode.
5. **GitHub Action:** static plus dynamic scan with summary and exit code, demonstrated by a fixture PR that adds an analytics call and turns CI red. The same Action dogfoods our own UI on every push.
6. **Docs:** README with CROPS section, New vs reused, Mocked parts, Anon-RPC table, `docs/methodology.md`, `AI_USAGE.md`, `specs/`, `prompts/`.

The 9 planted fixture leaks are:
1. API-keyed RPC carrying a `balanceOf(canary)` call;
2. analytics identify with the address in JSON;
3. `sendBeacon` with sha256 of the address;
4. a gzip-compressed error-telemetry envelope;
5. a cross-origin widget iframe calling `eth_accounts` and posting home;
6. canvas plus WebGL fingerprinting;
7. an ENS reverse lookup through a CCIP-Read-style gateway;
8. a WebSocket `eth_subscribe` log filter with the padded address;
9. a tracker receiving both A and B (W-2).

### 6.2 Effort budget (Judgement)

About 78 person-hours are available (3 people times roughly 26 working hours).

| Work item | Hours |
|---|---|
| Canary wallet, bridge, signing | 5 |
| Engine capture, flow, connect automation, recipes | 10 |
| Taint matcher, encodings, tests | 4 |
| Classifier, entity map (about 150 domains), EasyPrivacy | 5 |
| Scorer, P line, diff, meter | 4 |
| Sidecar, gateway, fix routing, CORS, Tor proof | 8 |
| UI (live plus report, single-file export) | 8 |
| Fixture dapp, mock third parties, ground-truth test | 6 |
| GitHub Action, demo PR, dogfood | 4 |
| README, CROPS, methodology, AI docs, specs | 4 |
| Video, demo prep, rehearsal | 6 |
| Integration and bug buffer | 10 |
| **MVP total** | **74** |

That leaves about 4 hours of slack. Stretch goals start only if M3 (Fri 19:00) is green. This is why the leaderboard and the coverage audit are not in the MVP.

### 6.3 Stretch goals, in priority order

1. **S1 Leaderboard.** Batch-scan 15 to 20 popular dapps (candidates in section 7) from the venue on Friday evening. Publish a static table with grade, number of parties holding the canary, and connect status. Mark dapps that block automation as such; never guess. About 3 h (C and A).
2. **S2 Anon-RPC coverage audit.** For apps that already use Anon-RPC (Privacy Pools v2 with "Connect with Tor", Kiwi News with its anon-rpc switch [ARPC Q1]):
   - detect the specifier bootstrap read (`eth_call` with selector `0x3898587d` [ARPC Q2, CHK]) and the worker bundle fetch;
   - name the worker;
   - count the RPC calls still leaving in the clear;
   - output "share of this app's RPC traffic through Anon-RPC", which is EF's own judging criterion.

   About 3 h (B). **Judgement:** this is the strongest single WOW for EF judges.
3. **S3 Calldata decoding.** Decode `eth_call` data (ERC-20 `balanceOf` and `allowance`, multicall3 `aggregate3` `0x82ad56cb`, ENS `resolve(bytes,bytes)` `0x9061b923` [CHK]) to show "the RPC provider learned which N tokens you checked". About 2 h (A).
4. **S4 Local anonymized JSON-RPC proxy.** `leakreport proxy --port 8545` reuses the sidecar so MetaMask custom networks, `cast` and Foundry get Tor-routed reads. Listed as open, Medium difficulty [ARPC Q3, Q10 item 31]. About 3 h (B).
5. **S5 RPC kill test (C letter, W-4).** Block the dapp's RPC provider and check whether state still renders (screenshot diff). About 2 h.
6. **S6 Leaky-wallet profile.** Return accounts to cross-origin frames, as the leaky wallets in the PoPETs study do [PSG], and see whether embedded third parties exfiltrate them. About 1.5 h.
7. **S7 P-3 approvals panel.** Decode approve and permit requests the canary rejected and flag unlimited amounts. About 1.5 h.
8. **S8 WebSocket RPC in fix mode** through `routeWebSocket`. About 2 h.
9. **S9 Real users.** Friday night, offer scans to consenting Mumbai CROPS teams and record who used it. Near-zero cost if the tool works.

### 6.4 Explicit non-goals

- **Wallet leak lab page.** The PoPETs authors already host demo pages for those threats [CHK]. We link to them instead.
- **Wallet behaviour.** Measuring what MetaMask or Rabby leak is covered by Walletbeat and PoPETs [PSG]. Our synthetic wallet isolates the dapp.
- **Transaction flows** (swaps, deposits) and anything that sends a transaction.
- **A browser extension.** It would not fit in 36 hours, and the extension harness has open MV3 issues [ARPC Q3].
- **A hosted multi-tenant scanning service.** It would make us a P and C dependency.
- **Onchain attestations of reports.** Cosmetic.
- **Any LLM in the product.** The Mandate warns against "an uninspectable proprietary model" in safety tooling [EFG Q1]. Our rules are inspectable files.
- **Query-content privacy (PIR).** That is research [ARPC Q4].
- **Changing the real dapp.** Fix mode simulates the fix in our browser only.
- **Mobile apps.**

### 6.5 Mocked or simplified parts (disclose in the README)

- The canary accounts are empty, so dapps that fetch more for funded accounts will under-report. Findings are **lower bounds**.
- Only load, connect, dwell and account switch are exercised. Transactions are always rejected.
- Auto-connect works for wagmi-style dapps (RainbowKit, AppKit, ConnectKit and similar). Others need assist mode or a recipe file written during the hackathon.
- The `metamask-compat` profile impersonates MetaMask's injected flags in the local test browser, to get through modals.
- The encoding list is fixed. Salted hashes, encryption and server-side joins are invisible to us, so they are false negatives.
- W-4 to W-6 and P-1, P-3, P-4 are "not measured" or "N/A" in the MVP.
- Fix mode reroutes at the browser layer. The dapp itself is unchanged.
- Fix mode does not fix W-2 for the RPC provider: both canaries leave through one exit, because no merged worker honours `isolationKey` [ARPC Q6, issue #10].
- The demo uses a tor-js gateway run by the team. It sees the client IP but only Tor-encrypted cells.
- The one specifier bootstrap read goes to a keyless public RPC, and "Clearnet bootstrap reveals anon-rpc use" [ARPC Q6].
- Leaderboard results (if built) are a one-time snapshot from the venue network on 6 Nov.
- The fixture's leaks are synthetic and planted.

## 7. De-risking

### 7.1 Pre-event checklist (before Thu 5 Nov 21:00; no project code)

Rule for the team: before 21:00 we read, install, provision and click. Nothing written before 21:00 goes into the repo. Throwaway experiments with public libraries stay off the repo and are deleted. Classic rule: "Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits" [JC Q1].

| Item | How to verify | If it fails |
|---|---|---|
| Rules | Re-read the Mumbai details page and the EF prize text on 4 Nov and again at Thu 21:00. The CROPS text is "tbc" [JC Q2]. | Adjust the README and the video to the final text. |
| Toolchain on 3 laptops | Node 24, pnpm, `npx playwright@1.64.1 install chromium` (downloads about 150 MB; do it at home), Rust 1.91+ on the VPS, OBS plus a USB mic | Pair on one machine. |
| Anon-RPC at home | Open the official demo (ethereum.github.io/anon-rpc/demo) with tor-js and with Nym. Note boot times against the bench (tor-js about 8 s, Nym about 11 s [ARPC Q6]). | Default to Nym if tor-js is flaky. |
| VPS for the gateway | Provision a VPS with public IPv4 and open UDP 12298. Do a test `cargo install` of the public gateway crate to confirm it compiles. This is public software, not project code. Generate the real key on Thu after 21:00. | Use the official demo gateway, which "may disappear at any time" [ARPC Q1], or Nym. |
| Tor proof endpoint | Open `check.torproject.org/api/ip` in a browser and confirm the JSON shape. | Use an IP echo service and compare against Tor's published exit list. |
| Candidate dapps | Open about 25 dapps manually with DevTools: app.uniswap.org, app.aave.com, curve.finance, stake.lido.fi, app.1inch.io, swap.cow.fi, app.ens.domains, app.safe.global, app.compound.finance, balancer.fi, app.morpho.org, app.pendle.finance, jumper.exchange, opensea.io, app.zerion.io, app.euler.finance, app.spark.fi, the Privacy Pools v2 web app, news.kiwistand.com. Note bot challenges and the modal library. Keep notes in a personal notebook, not the repo. | Drop dapps with hard bot walls from the demo list. |
| Learning (reading only) | Playwright docs: `addInitScript`, `exposeBinding` (source frame), `route`/`fulfill`, `routeWebSocket`, `websocket` events, `serviceWorkers`. EIP-1193 and EIP-6963. wagmi reconnect storage. Anon-RPC SPEC section 5 and the wallet guide. Privacy Pools `tor-fetch.ts`. Walletbeat entity data. `@ghostery/adblocker` API. | Not applicable |
| Licenses | Confirm EasyPrivacy's license text. Confirm GPL-3.0-or-later works for all dependencies. | Fetch lists at runtime instead of vendoring. |
| Questions for EF (Thu 17:00) | Placement (CROPS or Anon-RPC); W guarantees applied to dapps; 0.4.0 npm timing; whether they object to a public leaderboard | Not applicable |
| Arkiv (Thu 16:00) | Go only if the prize rewards open datasets and costs under 3 h. | Skip, which is the default. |
| Venue network | On Thu afternoon, rerun the official Anon-RPC demo on venue Wi-Fi to see whether UDP and WebRTC are blocked. | Phone hotspot, or Nym (WebSocket). |
| Logistics | Sleep plan, presenter (C), HDMI and USB-C adapters, power strip, two hotspots | Not applicable |

### 7.2 Day-one checks (Thu 21:00 to 23:00, in the repo, as spikes)

| ID | Check | Owner | Pass condition | Fallback decided at M1 (00:30) |
|---|---|---|---|---|
| D1 | `AnonRpcWorker` boots on a 127.0.0.1 page inside Playwright Chromium (headless) with our gateway | B | Ready in under 30 s | Headed mode. Nym. Official gateway. |
| D2 | `route.fulfill` for a cross-origin JSON POST passes CORS, including preflight | B | Fixture dapp receives the response | Option 1: inject a fetch and XHR wrapper that calls an exposed binding (no CORS involved). Option 2: launch Chromium with `--proxy-server` pointing at a local Node proxy. |
| D3 | Init script and binding are present in cross-origin iframes, and the binding reports the source frame URL | A | Widget frame call is logged with its URL | Inject through a CDP `Page.addScriptToEvaluateOnNewDocument` session per target. |
| D4 | Requests from dedicated workers, `sendBeacon` and WebSocket frames appear in capture | A | All three are seen on the fixture | Add a CDP `Network` domain listener. |
| D5 | Two real wagmi dapps auto-connect with the canary | A | `eth_requestAccounts` answered and the UI shows the address | Recipes plus assist mode. |
| D6 | `check.torproject.org/api/ip` through `anonFetch` returns `IsTor: true` | B | JSON shows `true` | Nym exit plus an IP echo comparison. |
| D7 | viem 2.57.11 `http()` accepts `fetchFn` (source check) | B | Present | Show the ethers `getUrlFunc` variant instead [ARPC Q2]. |

## 8. 36-hour timeline by role (IST)

Milestones:
- **M0** spec contract frozen;
- **M1** walking skeleton;
- **M2** end to end;
- **M3** stretch go or no-go;
- **FREEZE**;
- **M4** submitted.

Everyone pushes at least hourly to feature branches and merges to `main` at each milestone, so the history shows steady progress [JC Q1].

| Time (IST) | A: engine | B: analysis and Anon-RPC | C: product and demo |
|---|---|---|---|
| Thu 14:30 to 20:00 | EF workshop 17:00 (all). Manual venue checks. | EF workshop. Venue Anon-RPC demo test. | Arkiv workshop 16:00. EF workshop. |
| Thu 20:00 to 21:00 | Opening ceremony | Opening ceremony | Opening ceremony |
| Thu 21:00 to 22:00 | Write `specs/canary-wallet.md`. Repo scaffold (pnpm workspace). | Write `specs/event-schema.md` and `specs/report.md`. Init and run the gateway on the VPS. Lock versions. | Create repo, LICENSE, README skeleton, `AI_USAGE.md`. Write `specs/fixture.md`. **M0 at 22:00.** |
| Thu 22:00 to 00:30 | Playwright runner, temp profile, capture listeners to JSONL. Canary init script plus binding bridge. D3, D4. | D1, D2, D6, D7. Taint matcher plus encodings plus vitest. | Fixture dapp with 9 planted leaks. Mock third-party servers with a log view. |
| Fri 00:30 to 01:00 | **M1 walking skeleton:** scan fixture to findings JSON, at least 5 of 9 found. Pick the CORS fallback if D2 failed. | **M1** | **M1** |
| Fri 01:00 to 02:00 | Connect automation: wagmi storage seeding, button heuristic | Sidecar package. Fix-mode routing on the fixture. | **Sleep 01:00 to 06:00** |
| Fri 02:00 to 03:00 | **Sleep 02:00 to 07:00** | Fix mode on fixture: tracker log empty. Commit. | (sleep) |
| Fri 03:00 to 06:00 | (sleep) | **Sleep 03:00 to 08:00** | (sleep) |
| Fri 06:00 to 08:00 | 07:00: real-dapp trials on 3 dapps; fix the connect flow | (sleep) | Report component v0 from `report.json`. Single-file export. |
| Fri 08:00 to 09:00 | Breakfast standup. Merge. Rerun the fixture. | Breakfast standup | Breakfast standup |
| Fri 09:00 to 13:00 | Account switch (W-2), frame attempts, fingerprint hooks, WebSocket capture, screenshots, timeouts | Classifier (entity map, EasyPrivacy), W and P scorer, P line, diff, traffic meter, fix mode on real dapps, Tor-refusal detection | Live UI: URL box, SSE stream, evidence drawer, W and P grid, copy P line. Dogfood scan of our own UI. |
| Fri 13:00 to 14:00 | **M2 end to end:** fixture 9 of 9 baseline; fixture fix mode with empty tracker log; 3 real dapps baseline and fix. Lunch. | **M2** | **M2** |
| Fri 14:00 to 19:00 | Robustness on about 20 candidates: recipes YAML, assist mode, bot-challenge detection. From 17:00, batch scans with C. | GitHub Action: static plus dynamic, summary, artifact. Demo PR in the fixture repo that turns CI red. | README, CROPS section, `methodology.md`. Leaderboard skeleton. Start the batch scan at 17:00. |
| Fri 19:00 to 20:00 | **M3 go or no-go on stretch.** Pre-fill the submission form text. Dinner. Record a full backup run of the demo. | **M3** | **M3** |
| Fri 20:00 to Sat 01:00 | S3 calldata decoding, then S6 | S2 coverage audit, then S4 proxy if S2 is done by 23:00 | S1 leaderboard page. S9 scans for consenting teams. Video script draft. |
| Sat 01:00 | **FEATURE FREEZE.** Tag `v0.1.0`. Only demo-path bug fixes after this. | **FREEZE** | **FREEZE** |
| Sat 01:00 to 01:45 | Bug bash on the demo path. Record fallback clips of every demo beat. Cache reports for the demo dapps. | Bug bash | Bug bash |
| Sat 01:45 to 05:00 | **Sleep 02:00 to 05:00** | Clean-clone build test, README pass. **Sleep 02:30 to 05:30.** | **Sleep 01:45 to 04:30** |
| Sat 04:30 to 06:30 | 05:00: video operator (drives the screen) | (sleep until 05:30). Then `AI_USAGE.md`, prompts export, dash and comment checks, verifying the CROPS lines against the build. | Record the video (target 2:45, real voice) |
| Sat 06:30 to 07:30 | Prepare the live demo machine: warm the sidecar, cached reports, hotkeys | Check video rules: 2:00 to 2:59, at least 720p, no speed-up, no AI voice | Edit the video |
| Sat 07:30 to 08:15 | Support | Fill and check the submission form: EF selection, AI attribution, new vs reused | Upload the video and submit. **M4 by 08:15.** |
| Sat 08:15 to 09:00 | **Buffer.** Resubmit if the upload fails. No new commits after submission. | Buffer | Buffer |
| Sat 09:00 to 09:30 | Rehearse the 4 minute demo twice. Pre-boot the sidecar. | Rehearse the Q&A (section 12) | Rehearse as presenter |
| Sat 09:30 to 12:30 | Judging slot | Judging slot | Judging slot |

Sleep totals:
- A: 5 h plus 3 h.
- B: 5 h plus 3 h.
- C: 5 h plus about 2.75 h.

## 9. Demo scripts

### 9.1 Four minute live finalist demo

C presents and A drives. Before the slot:
- the sidecar is booted;
- reports are cached for every demo dapp (hotkey `F9` opens the cached version of the current step);
- the fixture servers are running locally.

| Time | Beat | On screen | Fallback |
|---|---|---|---|
| 0:00 to 0:20 | Hook: "When you connect a wallet to a dapp, who gets your address? Nobody measures it. We do, with an address that did not exist 10 seconds ago." | Title plus one line. | None needed |
| 0:20 to 0:35 | The judge picks a dapp from 5 pre-verified cards, or names one. A clicks Scan. A new canary address appears on screen. | URL box, canary address in large type. | If the judge's own pick fails to connect, say so honestly, switch to assist mode (the judge can click Connect), or take a card. |
| 0:35 to 1:20 | Live stream: domains appear and rows turn red when the canary is found. **The moment it matters:** click a red row; the raw request opens with the canary highlighted inside an analytics or screening payload. "This company now has your address and your IP, from a wallet that is 40 seconds old." | Live list, evidence drawer. | Cached report of the same dapp, opened at the same row. |
| 1:20 to 2:00 | Report: headline ("N companies got your address"), W-1, W-2 and W-3 verdicts in plain words, the P line generated and copied. | Report page. | Cached report |
| 2:00 to 3:00 | Fix mode on the same dapp (sidecar pre-warmed). Split view: before `IsTor: false` with the venue IP, after `IsTor: true`. RPC calls are rerouted, trackers blocked, the dapp still renders. Traffic meter: "RPC via Anon-RPC: 0% before, about 95% after; excluded: 1 WebSocket stream (disclosed)." Then the fixture tracker log: canary before, nothing identifying after. | Diff view, fixture log. | Pre-recorded fix-mode clip from Fri 19:00. |
| 3:00 to 3:35 | CI: open the fixture PR "add analytics"; the Action is red; the job summary says the canary reached the tracker host. "Privacy is now a failing test, not a policy." | GitHub PR checks. | Screenshot. |
| 3:35 to 4:00 | Close: "Runs on your laptop or CI, no server of ours, GPL. Our own UI scores zero third-party requests. Leaderboard: N dapps." (Drop the leaderboard line if S1 was cut.) | Leaderboard or README CROPS section. | None needed |

Q&A prep for the 3 minutes uses ETHGlobal's own prompts, "What inspired your project? What tools did you use, and why? What challenges did you solve, and how?" [JC Q1], plus section 12.

### 9.2 Video (target 2:45; hard limits 2:00 to 2:59)

Real voice (C). Screen capture at 1080p, no speed-up, no music with text. Slides have at most 4 bullets [JC Q1].

| Time | Beat |
|---|---|
| 0:00 to 0:15 | Hook and promise, one slide. |
| 0:15 to 0:55 | Scan of a real dapp: canary minted, live stream. **Moment it matters:** the evidence drawer shows the canary inside a third-party payload. |
| 0:55 to 1:20 | Report: headline, W-1 to W-3, the P line copied into a README. |
| 1:20 to 2:00 | Fix mode: `IsTor` false to true, traffic meter, honest residual ("the provider still sees which address; hiding that needs PIR"). Then the fixture third-party **server log**: canary before, nothing identifying after. This is EF's own example of the moment [JC Q2]. |
| 2:00 to 2:20 | CI gate: PR goes red, job summary. |
| 2:20 to 2:45 | Structural claims: no server of ours, runs from the repo; dogfood scan of our own UI shows 0 third-party requests; leaderboard if built; GPL; one slide on what is mocked. |

## 10. README skeleton, with a draft CROPS section

README sections, in order:
1. **Dapp Leak Report**: one-line promise plus a screenshot.
2. **Quick start**: `pnpm i`, `pnpm build`, `pnpm leakreport scan <url>`, `pnpm leakreport ui`.
3. **What it measures**: canary method, encodings, guarantees table with honest status.
4. **CROPS** (EF qualification; draft below).
5. **Anon-RPC usage**: a table of every RPC call our tool makes, whether it goes through Anon-RPC, and why if not (bootstrap read; WebSocket in fix mode).
6. **Trade-offs**: scanning visits from your IP; our gateway; W-2 residual; lower bounds.
7. **GitHub Action**: the YAML from 5.8.
8. **Methodology and ethics**: link to `docs/methodology.md`. We record only what any visitor's browser sends. We publish no private data. Reports redact cookies, auth headers and the scanning IP. Neutral wording; dapps can request a re-scan.
9. **Architecture**: the diagram from 5.2.
10. **New vs reused**: built during the hackathon versus libraries and data reused (5.10).
11. **Mocked or simplified parts**: the list from 6.5.
12. **AI usage**: summary plus a link to `AI_USAGE.md`, `specs/` and `prompts/`.
13. **Team, license** (GPL-3.0-or-later, with a no-relicense pledge).

Partner-required files: none, since no partner prize is targeted. ETHGlobal-required artifacts are `AI_USAGE.md`, `specs/` and `prompts/` [JC Q1]. EF requires only the README section and the video. Optional goodwill, not required: `ANON_RPC_FEEDBACK.md` with honest notes on the harness for the Access Layer team.

**Draft CROPS section** (each line answers EF's prompt as worded [JC Q2]):

> **CROPS** (lead property: **P**rivate)
>
> **C** (what we control that you depend on, and what happens if it goes away): At run time, nothing. Dapp Leak Report runs on your machine or your CI runner, and scan mode needs only the site you are scanning. Fix mode depends on:
> - an Anon-RPC worker, fetched by hash from the resolvers named in the onchain tor-js specifier `0x700d...659e`;
> - a tor-js gateway: we run one for the demo, and the official gateway, Nym, or your own (`tor-js-gateway init`) are drop-in fallbacks;
> - one bootstrap read of the specifier from a keyless public RPC.
>
> If our gateway disappears or refuses you, fix mode switches to Nym; nothing else changes.
>
> **O** (license, and whether you can build and run it from the repo alone): GPL-3.0-or-later, with a pledge not to relicense. `pnpm i && pnpm build && pnpm leakreport scan <url>` works from a clean clone. Filter lists and entity data are vendored in `data/`. No proprietary API, no account, no key.
>
> **P** (what each third party learns about you):
> - Our tool sends nothing about you anywhere: no analytics, telemetry, crash reporting or hosted backend. Our Action scans our own UI on every push and reports 0 third-party requests.
> - A scan is a visit: the target dapp and its third parties see your IP and a throwaway canary address, never your real one. Use fix mode or your own VPN if your IP matters.
> - In fix mode, the RPC provider sees a Tor exit IP and the canary, not your IP. The gateway sees your IP and opaque Tor cells only. The bootstrap RPC learns that someone read the tor-js specifier.
> - The leaderboard is static and makes no third-party requests.
>
> **S** (how keys and data are protected, and trust assumptions):
> - Each run generates fresh keys in Node memory. They are never funded, never injected into the page (the dapp cannot read them), and discarded at exit. Transactions are always rejected; messages are signed only with the throwaway key.
> - Target dapps run in an isolated Chromium context with a temp profile, deleted after the run.
> - The Anon-RPC worker runs in the harness's null-origin sandbox and is accepted only if its keccak256 matches the onchain hash. We also pin the expected hash in config.
> - Trust assumptions: Chromium and Playwright; the filter lists (they affect labels only, never the evidence); the worker network's anonymity; the specifier owner key, which is a single EOA today [ARPC Q1].
> - Reports stay on your disk and redact cookies, auth headers and your IP.

## 11. Risks and fallbacks

| Risk | Likelihood (J) | Impact | Fallback | Trigger |
|---|---|---|---|---|
| Auto-connect fails on many real dapps (custom modals, required ToS checkboxes, chain prompts) | High | Undercuts "any dapp" | 1. wagmi reconnect storage seeding. 2. Per-dapp recipe YAML for the demo and leaderboard dapps. 3. Headed assist mode (a human clicks Connect; our wallet is listed through EIP-6963). 4. Cached reports. The README promise reads "any wagmi-style dapp automatically; any dapp with one click". | D5 fails, or fewer than 3 of 5 dapps connect at M2 |
| Bot protection or headless detection (Cloudflare challenge) | Medium | Some dapps unscannable | Headed mode, `channel: 'chrome'`, mark "blocked automated scan" honestly, drop from the demo list | Challenge page detected |
| tor-js gateway down, or venue blocks UDP and WebRTC | Medium | Fix mode stalls live | Own VPS gateway; Nym (WebSocket) fallback; phone hotspot; pre-recorded fix-mode clip | D1 or D6 fail, or boot over 30 s at the venue |
| RPC providers refuse Tor exits | Medium | Dapp breaks in fix mode | Report it as a C finding; optional swap to a keyless Tor-friendly RPC (EF's "swap the RPC provider" example [JC Q2]); Nym exit | 403, 429 or challenge on rerouted calls |
| CORS or preflight issues with `route.fulfill` | Medium | Fix mode broken | Fetch and XHR wrapper over an exposed binding; or `--proxy-server` to a local Node proxy | D2 fails |
| Tor latency makes fix-mode runs slow (dapps with 100+ calls) | Medium | Demo drags | Pre-warm; 120 s budget with a progress bar; pick a mid-size dapp for the live fix; recorded clip | Fix run over 90 s on the demo dapp |
| False negatives (encodings we do not cover) | Medium | Under-reporting | Disclosed as lower bounds; fixture ground truth; unclassified parties always shown | Not applicable |
| Competing leak tools at CROPS | Medium | Judges compare | Lead with canary proof, W and P scoring, honest residuals, CI gate, coverage audit (S2) | Seen at the venue |
| A named dapp objects to the leaderboard | Low | Reputation | Neutral wording, reproducible evidence, no vulnerability claims, takedown and re-scan on request; skip S1 if EF objects at the workshop | Feedback |
| Integration hell between the three packages | Medium | Late MVP | Spec contracts frozen at M0; walking skeleton at M1; JSONL event log as the only interface | M1 not met by 01:00 |
| CROPS criteria change (tbc) | Low | README or video mismatch | Re-read at 21:00 Thu and at M3; adjust | Page diff |
| AI Involvement clause | Low | Finalist eligibility | Human-written core modules, spec files, prompts and attribution (section 13) | Not applicable |
| Laptop or video failure at the end | Low | Missed deadline | Backup run recorded at M3; submission by 08:15 with 45 min buffer | Upload error |

**Biggest risk:** the first row. The demo is designed so that a connect failure is shown honestly and recovered with assist mode in under 10 seconds.

## 12. Likely judge Q&A

1. **"Isn't this just a tracker blocker or a privacy scanner with a crypto skin?"** Generic scanners do not have a wallet. The canary wallet makes the address leak provable to the byte, and the JSON-RPC parser tells "your RPC provider needed this" apart from "an analytics vendor got this". Then we score it in EF's W and P terms, fix it with Anon-RPC, and gate it in CI. The research found no dapp-level leak report [PSG].
2. **"How do you know the vendor got your address and not just some ID?"** The canary is a fresh random 160-bit value. Any appearance in raw form, checksummed, ABI-padded, base64 or hashed can only come from this session. The drawer shows the exact bytes. A hash of a fresh address is still a unique identifier.
3. **"Doesn't your scan itself leak?"** Yes, by design: a scan is a visit, so the dapp sees your IP and a throwaway address, never your real one. Our tool contacts nothing else, and we prove that by scanning our own UI in CI. If your IP matters, run it in fix mode or behind your own VPN.
4. **"Anon-RPC hides the IP, but the provider still sees the address. What does fix mode buy?"** The IP side of W-1, as the Anon-RPC maturity card itself says [EFG Q3]. Query content needs PIR: "none hides what the wallet asks (that needs PIR)" [ARPC Q4]. The report shows that residual, and also that W-2 still fails through one exit because no merged worker honours `isolationKey` yet [ARPC Q6].
5. **"Why CROPS and not Anon-RPC?"** Most leaks are outside RPC, so the lead property is P across all third parties. We still route all of our own reads through Anon-RPC by default, and S2 measures your Anon-RPC traffic-share criterion for any app.
6. **"Dapps behave differently under automation."** Results are lower bounds. We use real Chromium, headed mode on request, and mark blocked dapps instead of guessing. The fixture provides the ground truth: 9 of 9.
7. **"What about the wallet's own leaks, like MetaMask calling its RPC?"** Out of scope on purpose; Walletbeat and the PoPETs study cover wallets [PSG]. Our synthetic wallet's reads go from Node through Anon-RPC, so they never pollute the dapp's capture.
8. **"How is this structural rather than cosmetic?"**
   - The evidence proves itself, and anyone can rerun it with a new canary.
   - Nothing of ours has to stay up.
   - The CI gate makes leaks a failing build. Privacy Pools' own 108-call regression [ARPC Q2] is the case it catches.
9. **"Would dapp teams use something that shames them?"** It is a developer tool first: a CI gate, a generated P line, and fix snippets. Every CROPS team at this event must write a P line [JC Q2]. The leaderboard is a stretch with neutral wording.
10. **"What did you build versus reuse, and what did AI write?"** Reused: Playwright, the Anon-RPC harness and workers, EasyPrivacy, Walletbeat seed data. Built: canary wallet, taint engine, classifier map, scorer, sidecar routing, UI, fixture, Action. `AI_USAGE.md` lists AI help per file, and the core logic is human-written (section 13).

## 13. AI usage and attribution plan

Facts [JC Q1]:
- AI is permitted with "Attribution", meaning "specifying which parts of the code, specific files, or assets were generated or assisted by AI".
- "Involvement": "Submissions that rely entirely on AI without meaningful contributions from team members may not be eligible".
- Spec-driven work "must include all spec files, prompts, and planning artifacts".
- The video must not use an AI voiceover.

Plan:
- **Specs first, by hand (Thu 21:00 to 22:00):** `specs/event-schema.md`, `specs/canary-wallet.md`, `specs/report.md`, `specs/fixture.md`, `specs/fix-mode.md`. These are the contracts between people and the prompts for AI help. They are committed at M0 and updated in place with history.
- **Human-written core:**
  - taint matcher and encoding list (B);
  - canary wallet semantics and signing bridge (A);
  - scoring rubric and guarantee mapping (B);
  - entity map curation (A and B);
  - CROPS section and all README claims (B and C).
- **AI-assisted (allowed and attributed):**
  - UI components and styling;
  - Playwright boilerplate;
  - test scaffolding;
  - the leaderboard page;
  - Action YAML;
  - regex drafts, each checked against real URLs.
- **Prompt log:** export the key prompts and sessions into `prompts/` at each milestone (M1, M2, M3, FREEZE), named by milestone and owner.
- **`AI_USAGE.md`:** a table of file or folder, tool used (for example Claude Code), human or AI-assisted or AI-generated, and reviewer. Updated at each milestone, not reconstructed at 07:00.
- **Commits:** go out under team members' own names, with no AI co-author trailers (the user's standing rule). Attribution lives in `AI_USAGE.md`, `specs/` and `prompts/`, which is where ETHGlobal asks for it.
- **Video and assets:** C narrates live in their own voice. Any AI-generated image or icon is listed in `AI_USAGE.md`.
- **Pre-submit check (B, Sat 05:30):**
  - every file in `apps/` and `packages/` is covered by the `AI_USAGE.md` table;
  - `specs/` and `prompts/` are pushed;
  - the README "AI usage" section links to them.
