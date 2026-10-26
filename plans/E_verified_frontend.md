# Plan E: SameBuild, a verified frontend (ETHGlobal Mumbai, 5 to 7 Nov 2026)

Working name: **SameBuild**. Tagline: "The code you run is the code in the repo, or it does not run." (No npm package named `samebuild` existed at the live check; several small GitHub repos are named "verifront", so that name was avoided.)

Event: ETHGlobal Mumbai, Jio World Convention Centre, alongside Devcon 8 India. Hacking starts Thu 5 Nov 21:00 IST; submissions due Sat 7 Nov 09:00 IST; finalist judging Sat 09:30 to 12:30 IST [JC].

## How to read this plan

Sourced facts carry a tag. Everything untagged, and everything labelled "Judgement", is my own reasoning.

| Tag | Source |
|---|---|
| [JC] | `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` |
| [PSG] | `research_notes/EF tracks and Whitechain ideas/privacy_stack_gaps.md` |
| [EFG] | `research_notes/EF tracks and Whitechain ideas/ef_goals_and_gaps.md` |
| [ARPC] | `research_notes/EF tracks and Whitechain ideas/anon_rpc.md` |
| [LC] | My live check on 26 Oct 2026 (UTC): npm registry versions; GitHub `freedomofpress/webcat` and `freedomofpress/webcat-spec`; GitHub `ensdomains/contracts-v2` (README, interfaces, `docs/addresses/sepolia.md`); the `@corpus-core/colibri-stateless@3.0.2` README and type definitions; `@freedomofpress/sigstore-browser@0.1.15` README. |
| [GK] | General knowledge that is not in the notes. Verify it before saying it on stage. |

## 0. Decisions at a glance

| Decision | Choice | Why (short) |
|---|---|---|
| Product | GitHub Action plus CLI that reproducibly builds a tagged commit and publishes per-file hashes to Ethereum; independent rebuilders co-sign; a Chromium extension holds every response from an enrolled dapp until its bytes match | It is the CROPS prize's own listed idea, built deep enough to stand out [JC], [PSG] |
| EF prize | Best CROPS App, lead property **Secure** (it is what makes **Open source** enforceable) | The listed idea is "a tool that proves the shipped frontend or extension matches the public repo" [JC] |
| Partner prizes | ENS "Best Use of ENSv2" **only if** the ENSv2 release namespace passes a go/no-go at Fri 12:00 IST; no other partner | ENS requires ENSv2 to be "central" [JC]; nothing else fits honestly |
| Chain | Ethereum Sepolia | ENSv2 is deployed there, with no mainnet address file yet [LC]; Colibri ships Sepolia defaults [LC] |
| Trustless reads | Colibri light client in `VerifiedOnly` mode, with its `fetch` routed through an Anon-RPC worker (Nym by default) | Colibri has a `fetch` hook; Helios has none [ARPC] |
| Enforcement on Chromium | `chrome.debugger` with the DevTools Protocol `Fetch` domain at the response stage, behind a gate page | Chromium MV3 gives extensions no other way to read and block response bodies before execution [GK]; WEBCAT is Firefox-only, and its grant funds "Chromium research" [EFG] |
| Registry | Own small contracts shaped like the Anon-RPC specifier (`releaseHash()`, `releaseResolvers()`), with an activation delay, no rollback and no admin | Mirrors the EF Access Layer's own hash-pinning pattern [ARPC] |
| Manifest | WEBCAT's `manifest` object fields (`files` as base64url SHA-256, `default_csp`, `default_index`, `default_fallback`, `wasm`, `extra_csp`) | Composes with the 1TS-funded WEBCAT library and ERC instead of competing with them [EFG], [LC] |
| Supported dapps | Vite static builds only | Next.js and SSR builds are a reproducibility rabbit hole for 36 hours |
| Biggest risk | Pre-execution blocking on Chromium (cache, service-worker lifetime, navigation race), plus judges reading the debugger banner as "unshippable" | See section 11 |

Team fit (judgement): the critical path is TypeScript and browser work, not Solidity. The three-person split below works if the person playing role C has touched Chrome extensions or the DevTools Protocol before. If nobody has, give role C to the strongest TypeScript engineer and keep the strongest Solidity engineer on role A (contracts, chain reads, ENS). A fourth person, if available, should own the popup, block page, explorer and video.

## 1. Verifiable promise and pitch

**One-sentence verifiable promise (the claim judges watch being proven):**
Change one byte of this dapp on its server, or make the RPC lie about which release is official, and Chrome refuses to run it; leave it alone and the badge names the public commit that independent rebuilders reproduced byte for byte.

**3-line pitch:**
1. "Open source" protects nobody if the server can send different code: the Bybit theft was a frontend hack ([PSG] and [EFG] cite the ipshipyard and IPFS posts on it; the "one modified JavaScript file on Safe's host" detail is [GK, verify]), and today nothing in Chrome checks what a dapp actually serves.
2. SameBuild makes the public repo the authority: a GitHub Action rebuilds every tag in a pinned container and publishes the file hashes to Ethereum, and anyone can rerun the build and co-sign the result.
3. Our Chromium extension holds every file until it matches, and it learns the expected hashes through a light client over Anon-RPC, so no CDN, no RPC provider and not even the dapp's own team can get different code past it.

Stage line (judgement): "Open source lets you read the code. SameBuild proves it is the code you run." This deliberately echoes VEIL VPN's finalist line "Open source lets you read the code. Attestation proves it's running." [JC].

## 2. Prize targets

### 2.1 EF: Best CROPS App (the single EF prize)

Facts:
- $3,500 (1st $2,000, 2nd $1,000, 3rd $500); criteria marked "(tbc: final review pending)" [JC].
- The prize's own idea list includes, verbatim, "a tool that proves the shipped frontend or extension matches the public repo" [JC].
- 1TS lists "Verifiable Frontend Hashes: Publishing signed content hashes onchain enables browser extensions to verify loaded bundles match audited builds. Research stage." [EFG].
- The 1TS WEBCAT grant says: "HTTPS authenticates the site you connect to ... but it does not prove that the code the site serves matches what its developers published." It funds "a WEBCAT verification library that wallets can integrate", Chromium research, an audit and an ERC; "the current alpha Firefox extension prevents the page from loading" [EFG].
- The Mandate's Quandary 5 warns against "thinking only about the 'happy case' ... but not about the 'unhappy case' ... where the team itself disappears or is hacked or an insider turns hostile" [EFG].

Lead property: **Secure**, in the Mandate's sense "Things must do what they claim to do, no more and no less" [EFG]. Judgement: the property is structural, not a setting. The check runs on the user's device against Ethereum state, and it keeps working if our team, servers and domain disappear.

EF prizes deliberately not selected:
- Best Use of Anon-RPC: we route 100% of the extension's own chain reads through Anon-RPC, but that rubric scores "how much of the app's traffic goes through Anon-RPC" [JC]. The dapp's page traffic does not go through it, and the tool exists for integrity, not anonymity. EF places a project in at most one prize [JC]. So we select **only** Best CROPS App in the submission form and say "Lead EF target: Best CROPS App" in the README.
- Frame Transaction Alt Mempool: no transaction-type need.
- Best CROPS Upgrade: Continuity Track only [JC]; we are Classic.

### 2.2 ENS: Best Use of ENSv2 (conditional partner prize)

Facts:
- $7,000 (1st $3,000, 2nd $2,000, 3rd $1,000, plus a second 3rd at $1,000) [JC].
- The requirement, verbatim: "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values. Upon submission, your project showcase must have a link to a live demo and the code needs to be open source." [JC]
- The prize page names wildcard resolution, subname registries, "Enhanced Access Control", "Permissioned Resolver" and record and namespace aliasing, and adds "Bonus points if you bring AI agents into the mix." [JC]
- ENSv2 is deployed on Sepolia (address doc generated 2026-06-29): ETHRegistry `0x67b728a792e789a8978b30cf1b3b641f19354b43`, ETHRegistrar `0xa4449a0dd2b83007553d9b1d28b583a46a805a30`, PermissionedResolverImpl `0x7e4b2d59938930168024201752ee5503df402303`, UserRegistryImpl `0x840fa461059862ea466a711e8c98c8de732061c0`, VerifiableFactory `0x118bc31a50d559f7015a8da26d54b3b030cdb70f`, UniversalResolverV2 proxy `0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe`. The repo's README links a mainnet address page that does not exist yet [LC].
- In ENSv2, "Each name has its own registry contract managing its subdomains". `ROLE_REGISTRAR` is root-only. "Emancipated" names come from "a subregistry where the owner has no root roles". PermissionedResolver scopes Enhanced Access Control roles to `keccak256(node, part)`, which allows per-name, per-record permissions (`ROLE_SET_CONTENTHASH`, `ROLE_SET_TEXT`, `ROLE_SET_ALIAS`, `ROLE_UPGRADE` and others), and it exposes `setAlias(fromName, toName)` [LC].

Design that makes ENSv2 central (judgement):
- The app's identity is an ENSv2 name, for example `samebuild-demo.eth`. Users enroll an app by that name.
- Every release is an immutable subname, `v1-0-1.samebuild-demo.eth`, in the app's own subregistry (a subname registry). Its PermissionedResolver records hold `contenthash` (the IPFS CID), `samebuild:manifest` (the manifest hash), `samebuild:commit` and `samebuild:repo`.
- Our `ReleaseSpecifier` contract is the only holder of root `ROLE_REGISTRAR` on that subregistry, and of `ROLE_SET_CONTENTHASH | ROLE_SET_TEXT | ROLE_SET_ALIAS` on the resolver (Enhanced Access Control). After setup the app owner revokes their own root roles and the resolver's `ROLE_UPGRADE`. The specifier's code never rewrites a published release, so releases are immutable by construction.
- The update channel is a namespace alias: `samebuild-demo.eth` resolves to the active release through `setAlias`, which only the specifier can call, and only after the activation delay.
- Any ENS-aware client resolving `samebuild-demo.eth` therefore gets the contenthash of the active, delay-gated, rebuild-attested release, not a value one key can silently change.

Go/no-go at Fri 12:00 IST. All three must pass:
1. `samebuild-demo.eth` is registered on Sepolia ENSv2, with a subregistry and a PermissionedResolver we control.
2. Our contract registered one release subname and wrote its contenthash and text records.
3. A Colibri-verified `eth_call` through UniversalResolverV2 returned that text record in under 10 seconds.

If any fails, we **do not** submit to ENS. A plain contenthash on a name is exactly the "cosmetic add-on" the rules exclude (judgement, consistent with the [JC] inference that "A bare contenthash on a name is likely cosmetic").

We decline the AI-agent bonus: adding an agent would be cosmetic.

### 2.3 Third partner slot: none

| Partner | Verbatim hook [JC] | Verdict |
|---|---|---|
| Whitechain | "At least one payment in USDT ... settled on Whitechain in your main flow" | Skip: no payment flow in this product |
| Uniswap Foundation | "Build on or integrate any part of the Uniswap stack" | Skip: verifying someone's frontend is not integrating their stack |
| World (IDKit, Agent Pass) | "the best decision about which credential is needed" | Skip: identity adds a trusted party and no value here |
| Chainlink CRE | "Integrate at least one blockchain with an external API" | Skip: a CRE watcher would be an extra oracle the design does not need, and that is cosmetic |
| Arc | "Every Arc prize requires using Arc Studio as the starting point" | Skip: conflicts with Classic from-scratch and the CROPS O line |
| 0G, 1inch, Hedera, Definitive | AI compute, AMM, x402, trading | Skip: no fit |
| Arkiv | "Prize details coming soon" | Re-check at the Thu 16:00 workshop. Adopt only if its text rewards a verifiable release log role and costs under 3 hours. Default: skip. |

### 2.4 ETHGlobal Finalist track

Facts: the finalist track is separate and does not count as a partner prize. Each team gets 7 minutes (4 minute demo, 3 minute Q&A), scored on Technicality, Originality, Practicality, Usability and WOW Factor. Recent 2026 events named a top 10, and the NYC 2026 pack paid 1000 USDC per finalist team member [JC]. About a third of recent IRL finalists were security, privacy or self-custody projects, including npmguard (Cannes 2026), and they won with "a one-sentence verifiable promise plus a live proof of it" [JC]. Judgement: the live tamper-and-block moment is that pattern exactly.

## 3. Criteria matrix

### 3.1 EF Best CROPS App: judging criteria (verbatim [JC])

| Criterion | How we score | Evidence |
|---|---|---|
| "works end to end in the demo" | Real tag, real Action run, real Sepolia transactions, real rebuild attestations, real extension blocking a real tampered file, with no mocked path in the demo flow | Video 0:35 to 2:05; tx links in README |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | Verification runs on the user's device against immutable contracts, with no owner, proxy or pause. Mirrors are untrusted because bytes are hash-checked. Rebuilds can be done by anyone. The demo shows that the dapp's own server and a lying RPC both lose. | Live beats 2 and 3; README "Trust model" |
| "the other three still hold, or trade-offs are stated in the README" | C: no team server at check time. O: FOSS, reproducible including the extension itself. P: reads go over Anon-RPC and refresh on a timer, not on navigation. S: no keys. The trade-offs (debugger banner, worker download, prover availability, demo-only rebuilders) are listed. | README CROPS and "Mocked or simplified" |
| "UX: would someone use it without knowing what CROPS means" | One badge, plain-language copy ("Same as the public code at github.com/x/y, version 1.0.1"), and a block page that says what happened and what to do, with no hashes unless "Details" is opened | Popup and block page screenshots |
| "could it ship after the hackathon" | Any Vite dapp adopts with one workflow file. The verifier core is a separate library a wallet (or the WEBCAT library) can absorb. The manifest uses WEBCAT field names. The path to production is a Chromium API or wallet integration, stated plainly. | README "Roadmap" |

### 3.2 EF Best CROPS App: qualification requirements (verbatim [JC])

| Requirement | Plan |
|---|---|
| "Public repo under a free and open-source license (MIT, Apache-2.0, GPL, MPL or similar), with a README a judge can run it from." | MIT for contracts and `packages/core`; GPL-3.0-or-later for the extension and CLI; `docker compose` quick start; prebuilt extension zip on the GitHub release |
| "The README has a section titled CROPS, one or two lines per letter" | Draft in section 10, answering each prompt exactly as asked |
| "C: what you control that the user depends on (domain, server, RPC, relayer) and what happens if it goes away or refuses them" | Answered in the C line |
| "O: the license, and whether a user can build and run it from the repo alone" | Answered, plus a no-relicense pledge (the Mandate asks supported projects to pledge this [EFG]) |
| "P: what each third party (your server, RPC provider, analytics, indexers) learns about the user" | Per-party answer: dapp host, RPC, Colibri prover, Nym, CDN serving the worker bundle |
| "S: how keys and user data are protected, and the trust assumptions" | Answered, with the full assumption list |
| "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters" | Cut at 2:45 to 2:55. The moment: a tampered file on the server is blocked before it runs, and a lying RPC is refused. |
| "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not." | None in the extension or demo dapp. The dapp uses only the injected wallet connector, not WalletConnect, so no relay or project ID calls. Settings stay in `chrome.storage.local`. |
| "One EF prize per project ... EF judges decide where it fits best." | Only Best CROPS App is selected |

### 3.3 ENS Best Use of ENSv2 (only if go; verbatim [JC])

| Requirement | Plan |
|---|---|
| "Project must be built on ENSv2 on Ethereum mainnet or Sepolia." | Sepolia ENSv2 contracts at the [LC] addresses |
| "ENSv2 features should be central to the product, not a cosmetic add-on." | Subname registry per app (releases are names); Enhanced Access Control (our contract is the sole registrar and record writer, the owner's roles are revoked); Permissioned Resolver records (contenthash, manifest, commit); namespace aliasing (active release pointer). Enrollment and display are by ENS name. |
| "Your demo must be functional and not just include hard-coded values." | The explorer and extension resolve any name typed in; the demo publishes a new release live (the v1.0.2 tag), and the alias moves |
| "Upon submission, your project showcase must have a link to a live demo" | Release Explorer on GitHub Pages: type a name, see releases, records, rebuild attestations, and an in-browser CID check with `@helia/verified-fetch` |
| "the code needs to be open source." | Same repos and licenses |
| "Bonus points if you bring AI agents into the mix." | Declined on purpose |

### 3.4 ETHGlobal finalist criteria (verbatim [JC])

| Criterion | How we score |
|---|---|
| "Technicality: How complex is the problem you're addressing, and how sophisticated is your solution?" | Four hard pieces composed: hermetic reproducible builds; light-client-verified reads over a mixnet; pre-execution byte blocking in Chromium through the DevTools Protocol; contracts with activation delay, monotonic no-rollback and fuzzed invariants |
| "Originality: Is your project introducing a new idea or creatively solving an existing problem?" | Prior tools either trust a developer-asserted hash (TEE Shield), only check CID integrity (dapp3.eth, IPFS tooling), or are Firefox-only with permissioned enrollment (WEBCAT). Repo to rebuild to chain to Chromium enforcement, with no trusted RPC, is not found in prior art [PSG]. |
| "Practicality: How complete and functional is your project? Could it be used by its target audience today?" | Dapp teams: one workflow file today. Users: install the extension zip today. Honest gap: the debugger banner. |
| "Usability (UI/UX/DX): How intuitive is your project? Have you made it easy for users to interact with your solution?" | Users get a badge and plain words. Developers get six lines of YAML and `npx samebuild rebuild <repo> <tag>`. |
| "WOW Factor: Does your project leave a lasting impression? This is the catch-all for anything unique or impressive that may not fit into the other categories." | A live drainer swap on the server is blocked before it executes, while the unprotected browser beside it gets drained (Sepolia). Then the RPC lies and loses too. |

### 3.5 ETHGlobal rules compliance (verbatim rules [JC])

| Rule | Plan |
|---|---|
| Video "Must be between 2 and 4 minutes"; CROPS "3 minutes max" | Target 2:50, hard limits 2:00 to 2:59 |
| "DO NOT use a text to speech synthesizer / AI Voiceover"; "DO NOT speed up the video"; "no more than 4 bullet points per slide"; not under 720p; no phone recording; intro under 20 seconds | Live voices, OBS at 1080p, three slides of four bullets or fewer, 15 second intro |
| "Submissions with large single commits or missing histories may be disqualified." | Small commits by each person at least hourly; no squash merges |
| "all work on your project must begin after the hackathon officially starts" | Repos created after 21:00 Thu; this plan disclosed in `docs/pre-event-plan.md` as a pre-event idea document; no code, designs or assets before 21:00 |
| AI "Attribution" and "Spec-Driven Development ... you must include all spec files, prompts, and planning artifacts" | `AI_USAGE.md` plus `specs/` (section 13) |
| "Clearly distinguish between what's new and what's reused." | README "Reused" table (section 5.9) |

## 4. Prior art and differentiation

| Prior art | What it does | What it does not do | Source |
|---|---|---|---|
| WEBCAT (Freedom of the Press Foundation) | Signed per-release manifest; a Firefox MV3 alpha extension that blocks pages failing checks; enrollment through a permissioned CometBFT chain of partner orgs, with oracles watching `/.well-known/webcat/enrollment.json` and a cooldown delay; signers via Sigsum Ed25519 keys with a threshold, or a Sigstore enrollment type with certificate claims such as the GitHub workflow repository | Firefox only; trusts signers, not an independent rebuild; enrollment is permissioned; the wallet library, Chromium support and ERC are still being funded | [PSG], [EFG], [LC] |
| 1TS "Verifiable Frontend Hashes" | The control itself, rated "Research stage" | Not built | [EFG] |
| TEE Shield (ETHGlobal Trifecta 2025) | Frontend hash onchain; a Chrome extension alerts on mismatch; Marlin TEE PCR checks | Hash asserted by the developer; alert, not block; no prize listed | [PSG] |
| dapp3.eth | Helios-verified ENS lookups; serves content from a local Kubo node | Proves bytes match a CID, not that the CID is the repo's build | [PSG] |
| EthStorage plus Colibri prototype | Checks gateway bytes against onchain commitments | Onchain-stored frontends only; no source link | [PSG] |
| IPFS CIDs, Service Worker Gateway, `@helia/verified-fetch`; Uniswap publishes a CID per release | Content integrity by CID | "users get no integrity benefit without their own node"; nothing ties the CID to source | [PSG] |
| ENS contenthash plus gateways ("Decentralized Hosting + ENS Gateways", 1TS Live) | Removes the DNS registrar attack surface | Gateway trust; contenthash changed by one key | [EFG] |
| Anon-RPC specifier | keccak256 of a worker bundle pinned onchain; the harness refuses other bytes; Nox publishes one immutable specifier per release | Worker bundles only, not app frontends; owners are single EOAs | [ARPC] |
| Sigstore and cosign (1TS "Ongoing"); GitHub artifact attestations | Bind an artifact digest to a CI workflow identity | Nobody checks at page load; provenance is not reproducibility | [EFG], [GK] |
| Walletbeat "release process" | Rates wallets on changelog, lockfile, signed artifacts, reproducible or hermetic builds | A rating, not enforcement | [PSG] |
| Sourcify | Verifies contract source | Contracts only | [PSG] |
| Recomputable Agents (ETHGlobal) | ENS contenthash to IPFS frontend | No rebuild or enforcement | [PSG] |
| Subresource Integrity | Hashes in HTML for subresources | The HTML carrying the hashes comes from the same untrusted server | [GK] |
| Meta Code Verify (2022) | Extension comparing WhatsApp Web scripts to hashes published via Cloudflare | First-party only, one central hash publisher | [GK, verify] |
| WAICT working group | Browser-native integrity and transparency effort that WEBCAT says it works with | Not shipped in Chromium as far as the notes show | [LC] name only; details [GK, verify] |

What is new here (judgement, grounded in the gaps above):
1. **Rebuild, not assertion.** The badge goes green only when K of N rebuilders that the user chose (not the developer) produced the identical manifest from the public commit. The [PSG] inference is that differentiation "must come from depth (for example verifying a reproducible build, not just comparing a hash typed into a contract)".
2. **Resolution that trusts no RPC and leaks no browsing.** Release records are proof-checked by Colibri against the sync committee, fetched through Anon-RPC, and refreshed on a timer for all enrolled apps. WEBCAT reaches lookup privacy with snapshots [EFG]; we reach it on Ethereum with the EF's own Access Layer tools.
3. **Block before execution on Chromium**, which WEBCAT does not do yet [EFG].
4. **Release policy enforced by contract:** activation delay (time to inspect the diff), monotonic index (no rollback to an older signed release), guardian revoke that can only make the extension block, and no upgrade path.
5. **WEBCAT-shaped manifest**, so the same release can later be signed for WEBCAT and checked by its library. We position SameBuild as an experiment in the Ethereum enrollment and Chromium enforcement that the 1TS-funded ERC is meant to standardize, not as a rival.

What we deliberately do not claim: that the public code is safe (audits do that); that we hide which app was checked from the endpoint (the [ARPC] threat map says none of the networks hides "what the wallet asks (that needs PIR)"); protection against malicious browser extensions or a compromised OS.

## 5. Architecture

### 5.1 Components and where they run

| Component | Runs where | Tech | Owner |
|---|---|---|---|
| `contracts/`: `ReleaseSpecifier`, `SpecifierFactory`, `RebuildAttestations`, ENS mode (stretch) | Ethereum Sepolia | Solidity, Foundry v1.8.6 | A |
| `packages/core`: manifest schema, RFC 8785 canonical JSON, SHA-256 base64url, release resolution, trust policy (K of N, delay, revoke, max age) | Shared by CLI, extension, explorer | TypeScript | A |
| `packages/cli` (`samebuild build | publish | rebuild | verify-dir`) | Developer laptop, CI, rebuilder machines | Node 24.22.1 LTS, Docker | B |
| `action/` composite GitHub Action | GitHub-hosted runner | YAML wrapping the CLI | B |
| `extension/`: service worker, offscreen document, gate, blocked and popup pages | User's Chromium | MV3, Vite multi-entry build | C (A owns the offscreen chain-read module) |
| `samebuild-demo-dapp` (separate public repo) | Any static host | Vite, React, wagmi (injected connector only) | B |
| `tools/attack-server` | Laptop or VPS ("the CDN") | Node static server with `/admin/tamper`, `/admin/restore`, `/attacker/log` | B |
| `tools/lying-rpc` plus `tools/naive-check` | Laptop | Node proxy that rewrites proofs or values for our specifier's slots | B |
| `explorer/` (ENS stretch) | GitHub Pages, also pinned on IPFS | Vite, viem, `@helia/verified-fetch` | B |

### 5.2 Diagram

```
DEVELOPER                         ETHEREUM SEPOLIA                       REBUILDERS
+---------------------------+     +--------------------------------+     +----------------------+
| tag v1.0.1 on public repo |     | ReleaseSpecifier (per app)     |     | anyone, any machine  |
| samebuild Action:         |---->|  publish, pending, activate    |<----| samebuild rebuild    |
|  2 builds, pinned Docker  | tx  |  delay, no rollback, no admin  | tx  |  same image, compare |
|  manifest (SHA-256/file)  |     | RebuildAttestations            |     |  attest if identical |
|  CID, Sigstore signature  |     | ENSv2 release names (stretch)  |     +----------------------+
+-------------+-------------+     +---------------+----------------+
              | upload                            ^
              v                                   | eth_call and proofs, checked locally
+---------------------------+     +---------------+----------------+
| MIRRORS (untrusted)       |     | ANON-RPC WORKER (Nym mixnet)   |
| GitHub release, IPFS,     |     | sandboxed iframe, hash-pinned  |
| content-addressed branch  |     +---------------+----------------+
+-------------+-------------+                     ^ worker.fetch
              | manifest.json, hash-checked       |
              v                                   |
+-------------+-----------------------------------+----------------+
| CHROMIUM EXTENSION (user device)                                  |
|  offscreen: Colibri light client (VerifiedOnly), release policy   |
|  service worker: gate page, chrome.debugger Fetch interception    |
|  every response from an enrolled origin: SHA-256 vs manifest      |
|  match: release bytes to page    mismatch: fail request, block    |
+--------------------------------+----------------------------------+
                                 ^ bytes as actually served
                     +-----------+-----------+
                     | DAPP HOST / CDN       |  untrusted (the attacker in the demo)
                     +-----------------------+
```

### 5.3 Data flows

**Release (developer).** Pushing tag `v1.0.1` triggers the Action. It:
1. Checks out the tagged commit and builds twice in fresh `node:24.22.1-bookworm-slim` containers (pinned by digest, `--platform linux/amd64`, `SOURCE_DATE_EPOCH` set to the commit time, `TZ=UTC`, `npm ci`), then fails if the two manifests differ.
2. Writes `samebuild.json` (5.5) and computes `manifestHash = sha256(JCS(manifest))`.
3. Computes the UnixFS root CID of `dist/` with `ipfs-car`.
4. Signs the manifest digest keyless with Sigstore from the workflow's OIDC identity, and also runs `actions/attest-build-provenance`.
5. Uploads `samebuild.json`, `dist.car` and the Sigstore bundle to the GitHub release and to a content-addressed branch. This is the same trick as Anon-RPC's `publish-worker.mjs --github`, which also "verifies each resolver serves the pinned bytes before spending gas" [ARPC]; we copy that check.
6. Calls `publish(manifestHash, commit, version, cid, resolvers)` on the app's `ReleaseSpecifier` with a publisher key that can only publish. The release becomes pending for `activationDelay`.

**Rebuild (independent).** `npx samebuild rebuild https://github.com/samebuild/samebuild-demo-dapp v1.0.1 --attest` clones at the commit recorded onchain, runs the same container build, recomputes `manifestHash`, compares it with the onchain value, and only on a match sends `attest(specifier, index, manifestHash)`. Demo rebuilders: one teammate's laptop and one VPS on a different provider. Both are team-controlled, and we disclose that.

**Verify (user).**
1. The user enrolls an app (an origin plus a specifier address, or an ENS name in ENS mode). At enrollment the extension fetches `https://<origin>/.well-known/samebuild.json` once and requires it to point back at the same specifier or name (TOFU, disclosed).
2. A timer (every 5 minutes, plus at startup) refreshes every enrolled app through Colibri over Anon-RPC: the current release, its activation time and revoked flag, the rebuild attestations from the user's trusted rebuilders, and (stretch) the ENS records. The results are cached with the verified block number. Refreshing everything on a timer means lookups do not reveal when the user opens an app.
3. The manifest is fetched from any resolver and accepted only if its canonical hash equals the onchain `manifestHash`.
4. Navigation to an enrolled origin is redirected by a session DNR rule to `gate.html`. The gate attaches `chrome.debugger`, enables `Fetch` at the response stage, removes the tab from the redirect rule (`excludedTabIds`), and navigates on.
5. Every paused response is hashed. Same-origin paths in the manifest must match. Same-origin executable types not in the manifest (Document, Script, Stylesheet, worker scripts) are blocked. JSON data is allowed. Cross-origin scripts, styles and frames are blocked unless listed.
6. All match: the response continues and the badge goes green. Any mismatch: the request fails, the tab is sent to `blocked.html`, and the details are shown.
7. Debugger detach, or a cache older than max age with no successful refresh: fail closed, hold the page and explain why.

### 5.4 Contracts

Interfaces (Solidity 0.8.x, pinned in `foundry.toml` at kickoff):

```solidity
interface IReleaseSpecifier {
    struct Release {
        bytes32 manifestHash;
        bytes20 commit;
        uint64 publishedAt;
        uint64 activatesAt;
        bool revoked;
        string version;
        string cid;
    }

    event ReleasePublished(uint256 indexed index, bytes32 indexed manifestHash, bytes20 commit, string version, uint64 activatesAt);
    event ReleaseActivated(uint256 indexed index, bytes32 indexed manifestHash);
    event ReleaseRevoked(uint256 indexed index);
    event PublisherRotationQueued(address indexed next, uint64 effectiveAt);

    function releaseHash() external view returns (bytes32);
    function releaseResolvers() external view returns (string[] memory);
    function current() external view returns (uint256 index, Release memory release);
    function releaseAt(uint256 index) external view returns (Release memory);
    function releaseCount() external view returns (uint256);
    function activationDelay() external view returns (uint64);

    function publish(bytes32 manifestHash, bytes20 commit, string calldata version, string calldata cid, string[] calldata resolvers) external returns (uint256 index);
    function activate(uint256 index) external;
    function revoke(uint256 index) external;
}

interface IRebuildAttestations {
    event Rebuilt(address indexed rebuilder, address indexed specifier, uint256 indexed index, bytes32 manifestHash);

    function attest(address specifier, uint256 index, bytes32 manifestHash) external;
    function hasRebuilt(address rebuilder, address specifier, uint256 index) external view returns (bool);
}
```

Rules:
- `releaseHash()` and `releaseResolvers()` deliberately mirror Anon-RPC's `workerHash()` and `workerResolvers()` [ARPC], so a harness-style loader can pin a whole frontend the way Anon-RPC pins a worker.
- Only `publisher` can publish, and `activatesAt = block.timestamp + activationDelay`. `activate(index)` is permissionless after `activatesAt`, requires `index > currentIndex` (no rollback), and requires `!revoked`. Nobody has to be online for a release to go live.
- `guardian` (the app's Safe) can `revoke` a pending or active release and can queue a publisher rotation that takes effect after the same delay. The guardian cannot publish. If the current release is revoked, `releaseHash()` returns zero and the extension blocks (fail closed).
- No owner, no proxy, no pause, no `selfdestruct`. `activationDelay` is immutable (120 seconds in the demo; 24 to 72 hours recommended in production).
- `SpecifierFactory` deploys one specifier per app with CREATE2.
- `RebuildAttestations` is permissionless. `attest` checks `releaseAt(index).manifestHash == manifestHash` through a view (STATICCALL), so attestations always refer to a published release. Users decide whose attestations count.

Foundry invariant suite (A, using the team's security background):
1. A published release's fields never change, except `revoked` going from false to true.
2. `currentIndex` never decreases.
3. If `releaseHash() != 0`, then the current release has `activatesAt <= block.timestamp` and `!revoked`.
4. `releaseCount` only grows through calls from the publisher.
5. For every release, `activatesAt - publishedAt` equals the delay in force at publish time.

Also run Slither or Aderyn and fix findings before deploy. Verify on Sourcify.

ENS mode (stretch S2):
- The specifier's constructor also takes the app's ENSv2 UserRegistry, its PermissionedResolver and the parent name.
- `publish` registers `v<major>-<minor>-<patch>` under the parent with the specifier as owner, then writes `contenthash` and the `samebuild:*` text records for the new node.
- `activate` calls `setAlias(parentName, releaseName)`.
- A setup script creates the subregistry and resolver through VerifiableFactory, grants the specifier its roles, then revokes the owner's root roles and the resolver's `ROLE_UPGRADE`.
- Exact `register` and `setAlias` signatures come from `IPermissionedRegistry` and `IPermissionedResolver` in `ensdomains/contracts-v2` [LC]; confirm them at the ENSv2 workshop.

### 5.5 Manifest format

`samebuild.json`. The `manifest` object uses WEBCAT field names from `webcat-spec/manifest.md` [LC]; `manifestHash` is SHA-256 over its RFC 8785 canonical form. WEBCAT likewise verifies signatures "over the canonicalized `manifest` object" [LC]; confirm that it uses the same canonicalization.

```json
{
  "manifest": {
    "app": "https://github.com/samebuild/samebuild-demo-dapp",
    "version": "v1.0.1",
    "default_csp": "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; connect-src 'self' https:; object-src 'none'; frame-src 'none'",
    "files": {
      "/index.html": "q3m5c0p2R0yq3d3rS8Yv1dQm9fV6m6p0b4l1J2kq8xA",
      "/assets/index-4f9a1c2e.js": "Zb6m8c1yP0aQ7dE2vN5tK3rS9wX4hJ6uL1oB8gF0iMs",
      "/assets/index-7c2d9e10.css": "Hk2p9vR4sT7wY1zA3cE5gI8kM0oQ2uW4yB6dF8hJ0lN"
    },
    "default_index": "/index.html",
    "default_fallback": "/index.html",
    "timestamp": "",
    "wasm": [],
    "extra_csp": {}
  },
  "signatures": {},
  "samebuild": {
    "schema": 1,
    "commit": "a1b2c3d4e5f60718293a4b5c6d7e8f9012345678",
    "builder_image": "node:24.22.1-bookworm-slim@sha256:<digest pinned at kickoff>",
    "build_command": "npm ci && npm run build",
    "cid": "bafybeigdyrexamplecid0000000000000000000000000000000000"
  }
}
```

WEBCAT gaps (disclosed): WEBCAT requires `timestamp` as a Sigsum tree head, and `signatures` as Sigsum proofs (or a Sigstore enrollment) [LC]. We leave both empty in the MVP. Full WEBCAT interop is stretch S6.

### 5.6 Extension internals

- **Manifest permissions:** `debugger`, `declarativeNetRequest`, `offscreen`, `storage`, `tabs`, `webNavigation`; host permissions for enrolled origins.
- **Sandbox and CSP:** `sandbox.pages: ["anon-rpc/*/sandbox.html"]` with a sandbox CSP allowing `blob:` in `script-src`, as the extension harness README requires [ARPC]. Extension-pages CSP: `script-src 'self' 'wasm-unsafe-eval'; object-src 'self'` for Colibri's WASM. Chrome's MV3 remote-code ban has a carve-out for sandboxed iframes, which is what lets the Anon-RPC worker run [ARPC].
- **Offscreen document (A):** boots the Anon-RPC extension harness with the Nym worker (mainnet specifier `0x3aCD9742C68F6d993066Ae25533e09b9e1f60eD0`, no config needed), and pins the expected worker hash. This is the Privacy Pools pattern of intercepting the `workerHash()` call (selector `0x3898587d`) and refusing a different hash [ARPC], so the bootstrap RPC, which "is trusted for one read" [ARPC], cannot swap the worker. There is a 90 second boot timeout (Kiwi News uses 90 s because "the harness itself has no boot timeout" [ARPC]). It then runs Colibri with `fetch: worker.fetch`.
- **Fallback network:** tor-js (specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e`) through our own tor-js-gateway, since the demo gateway "may disappear at any time" [ARPC].
- **Measured cost:** Nym boot is about 10.7 s and p50 about 0.76 s per request; tor-js boot is about 8.1 s and p50 about 0.81 s [ARPC]. That is why reads are cached and refreshed on a timer, never on navigation.

```ts
import { AnonRpcWorker } from "@anon-rpc/browser-extension-harness";
import Colibri, { Strategy, set_wasm_url } from "@corpus-core/colibri-stateless";

const NYM_SPECIFIER = "0x3aCD9742C68F6d993066Ae25533e09b9e1f60eD0";

export async function startReader(bootstrap: Eip1193, rpcUrl: string) {
  const worker = new AnonRpcWorker({
    address: NYM_SPECIFIER,
    config: undefined,
    preExisting: { rpcProvider: pinWorkerHash(bootstrap, PINNED_NYM_HASH) },
  });
  await withTimeout(worker.ready, 90_000);
  set_wasm_url(chrome.runtime.getURL("c4w.wasm"));
  return new Colibri({
    chainId: 11155111,
    prover_mode: "hybrid",
    rpcs: [rpcUrl],
    proofStrategy: Strategy.VerifiedOnly,
    fetch: worker.fetch,
  });
}
```

Notes on this snippet. Colibri option names come from its 3.0.2 README and types [LC]: `Strategy.VerifiedOnly` "throws an exception if verifaction fails or a non verifieable function is called"; in `hybrid` mode the prover serves header proofs while EL data comes from the RPC and "are verified locally". That is what makes the lying-RPC demo meaningful. The extension harness's export name is confirmed at kickoff; its host API follows SPEC §5 [ARPC].

**Service worker interception (C).** CDP `Fetch` semantics are [GK]; confirm in day-one check D3.

```ts
const PROTOCOL = "1.3";

export async function protect(tabId: number) {
  const target = { tabId };
  await chrome.debugger.attach(target, PROTOCOL);
  await chrome.debugger.sendCommand(target, "Network.enable");
  await chrome.debugger.sendCommand(target, "Network.setCacheDisabled", { cacheDisabled: true });
  await chrome.debugger.sendCommand(target, "Network.setBypassServiceWorker", { bypass: true });
  await chrome.debugger.sendCommand(target, "Fetch.enable", {
    patterns: [{ urlPattern: "*", requestStage: "Response" }],
  });
}

chrome.debugger.onEvent.addListener(async (source, method, params) => {
  if (method !== "Fetch.requestPaused" || source.tabId === undefined) return;
  const paused = params as FetchRequestPaused;
  const verdict = await judge(source, paused);
  if (verdict.allow) {
    await chrome.debugger.sendCommand(source, "Fetch.continueRequest", { requestId: paused.requestId });
  } else {
    await chrome.debugger.sendCommand(source, "Fetch.failRequest", { requestId: paused.requestId, errorReason: "BlockedByClient" });
    await showBlockPage(source.tabId, verdict);
  }
});
```

`judge` passes redirects through, calls `Fetch.getResponseBody` (decoded bytes), hashes them with WebCrypto, maps the URL path to a manifest key (with `default_index` and `default_fallback` for navigations), and applies the policy in 5.3 step 5.

**UI states:**
- Checking (gate page with spinner and plain copy).
- Same as public code (green): repo, short commit, version, "rebuilt by 2 of 2 builders you trust", "checked against Ethereum by a light client", "lookup sent over Nym".
- Update pending (blue): "v1.0.2 goes live in 1:40", with a link to the GitHub compare view.
- Blocked (red): what happened, which file, "it was stopped before it could run", Go back, Details.
- Cannot check (amber, fail closed): "Can't reach the privacy network. Wait, switch network, or check once without privacy (the RPC provider will learn which app you are checking)."

### 5.7 Adopting the Action (developer view)

```yaml
name: samebuild-release
on:
  push:
    tags: ["v*"]
permissions:
  contents: write
  id-token: write
  attestations: write
jobs:
  release:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v7.0.1
      - uses: samebuild/samebuild/action@v0.1.0
        with:
          specifier: "0xYourReleaseSpecifier"
          chain-id: "11155111"
          rpc-url: ${{ secrets.SEPOLIA_RPC_URL }}
          publisher-key: ${{ secrets.SAMEBUILD_PUBLISHER_KEY }}
```

In the real repo every third-party action is pinned by commit SHA rather than tag. Inside, the composite action uses `docker/setup-buildx-action` v4.4.1, `actions/attest-build-provenance` v4.2.2 and `actions/upload-artifact` v7.0.2 [LC].

CLI surface:

```bash
npx samebuild build --out dist
npx samebuild publish --specifier 0xYourReleaseSpecifier --rpc "$SEPOLIA_RPC_URL"
npx samebuild rebuild https://github.com/samebuild/samebuild-demo-dapp v1.0.1 --attest
npx samebuild verify-dir "$HOME/.config/google-chrome/Default/Extensions/<extension-id>/<version>" --release 0xSpecifier#3
```

### 5.8 Packages and versions

All npm versions are from the registry on 26 Oct 2026 [LC]. Pin exact versions in lockfiles at kickoff and re-run `npm view` for patch releases.

| Package / tool | Version | Use |
|---|---|---|
| Node.js | 24.22.1 LTS "Krypton" | CLI and builds; Docker `node:24.22.1-bookworm-slim` pinned by digest |
| Foundry | v1.8.6 | forge, cast, anvil |
| `@openzeppelin/contracts` | 5.6.1 | Only if needed (e.g. `ShortStrings`); otherwise none |
| `ensdomains/contracts-v2` | git submodule, pinned commit | `IPermissionedRegistry`, `IPermissionedResolver`, role libraries (ENS mode) |
| `@anon-rpc/browser-extension-harness` | 0.3.3 | Worker host in the offscreen document; npm is one spec behind main, which only matters for `isolationKey` [ARPC], and we do not need it |
| Nym worker (by specifier) | `@nymproject/anon-rpc-worker` 0.1.0 | Default anonymity network; loaded by hash, not imported |
| `tor-js` | 0.4.3 | Fallback worker (by specifier) |
| `@corpus-core/colibri-stateless` | 3.0.2 | Verified `eth_call` with a `fetch` hook; Sepolia defaults include prover and beacon endpoints [LC] |
| `@lodestar/prover` | 1.43.0 | Fallback verified provider over an Anon-RPC EIP-1193 wrapper [ARPC] |
| `@a16z/helios` | 0.12.0 | Last-resort verified reads without Anon-RPC (no fetch hook [ARPC]) |
| `viem` | 2.57.11 | ABI encoding, transactions in the CLI, naive-check script; `http({ fetchFn })` exists in source [ARPC] |
| `wagmi` | 3.7.9 | Demo dapp, injected connector only |
| `react` | 19.3.1 | Demo dapp, popup, explorer |
| `vite` | 8.3.5 | All web builds (multi-entry for the extension, no plugin) |
| `create-vite` | 9.3.1 | Demo dapp scaffold at kickoff |
| `typescript` | 7.0.2 | If any tool breaks on 7.x, drop to the last 5.x |
| `@types/chrome` | 0.3.6 | Extension types |
| `@noble/hashes` | 2.4.0 | keccak for selectors in Node; SHA-256 uses WebCrypto in the browser |
| `canonicalize` | 5.1.0 | RFC 8785 JSON canonicalization |
| `ipfs-car` | 3.1.0 | CAR and root CID of `dist/` |
| `@ipld/car`, `multiformats`, `ipfs-unixfs-importer` | 5.4.7, 14.0.5, 17.1.1 | Only if `ipfs-car` output needs control |
| `sigstore` | 5.0.0 | Keyless signing of the manifest digest in CI |
| `@freedomofpress/sigstore-browser` | 0.1.15 | Stretch S3: verify the Sigstore bundle inside the extension (WEBCAT's own browser verifier, MIT, "has not received an independent security audit") [LC] |
| `@helia/verified-fetch` | 8.1.2 | Explorer: in-browser CID verification |
| `@ensdomains/ensjs` | 5.2.6 | Explorer, only if it supports ENSv2 on Sepolia; otherwise raw viem calls to UniversalResolverV2 |
| `commander`, `tsx` | 15.0.0, 4.23.15 | CLI |
| GitHub actions | checkout v7.0.1, setup-node v7.1.0, attest-build-provenance v4.2.2, upload-artifact v7.0.2, setup-buildx-action v4.4.1 | Pinned by SHA |

### 5.9 Repos and code to reuse (check each license before copying; prefer reimplementing patterns)

| Source | What we take | Source tag |
|---|---|---|
| `ethereum/anon-rpc` (`impl/specifier/WorkerSpecifier.sol`, `publish-worker.mjs`, `impl/demo-extension`, SPEC 0.4.0) | Specifier interface shape; "verify resolvers before spending gas"; MV3 harness wiring | [ARPC] |
| `0xbow-io/privacy-pools-website-v2` `services/tor-fetch.ts` | Worker-hash pinning via selector `0x3898587d`; fail-closed egress | [ARPC] |
| `attestate/kiwistand` `anon-transport.mjs` | 90 s boot timeout and fail-fast pattern | [ARPC] |
| `freedomofpress/webcat-spec` | Manifest object fields; enrollment and cooldown ideas | [LC] |
| `walletbeat/walletbeat` `src/tools/l1-lying-rpc-proxy` | Idea, possibly code, for the lying RPC demo | [PSG] |
| `ensdomains/contracts-v2` | ENSv2 interfaces, Sepolia addresses | [LC] |

### 5.10 Repo layout

```
samebuild/
  contracts/
  packages/core/
  packages/cli/
  action/
  extension/
  explorer/
  tools/attack-server/
  tools/lying-rpc/
  tools/naive-check/
  specs/
  docs/
  docker-compose.yml
samebuild-demo-dapp/
  .github/workflows/samebuild-release.yml
  src/
```

## 6. Scope

### 6.1 MVP (must work end to end)

1. **Demo dapp** (separate repo): one page, "send 0.001 Sepolia ETH to the treasury", injected wallet only.
2. **Action and CLI `build` / `publish`:** double build in a pinned container, manifest, CID, Sigstore signature, uploads, `publish()` on Sepolia.
3. **Contracts** deployed and verified on Sepolia, with unit and invariant tests green.
4. **`samebuild rebuild --attest`** run from two machines, giving two attestations onchain.
5. **Extension:** Nym worker and Colibri `VerifiedOnly` reads of release and attestations; manifest fetch and hash check; DNR gate and CDP interception; green, red and amber states; popup; settings for trusted rebuilders, threshold K and network.
6. **Attack server** with a tamper toggle (same filename, targeted recipient swap) and an attacker log.
7. **End-to-end flows shown in the video:**
   - Honest load goes green.
   - Tamper is blocked, and the attacker log shows 0 executions.
   - An unprotected profile gets the swap, and the log shows 1.
   - Tag v1.0.2 publishes, sits pending, activates after 120 s, and goes green with the new commit.
8. **README** with CROPS, trust model, mocked list, reused list, AI usage, licenses, Sepolia addresses and transaction links.

### 6.2 Stretch goals, in priority order

| # | Stretch | Owner | Est. | Why this rank |
|---|---|---|---|---|
| S1 | Lying RPC demo: Colibri `hybrid` with a user-chosen RPC; `tools/lying-rpc` rewrites the specifier's storage value to the attacker's manifest hash; the extension refuses; `tools/naive-check` (plain viem) is fooled | B | 2 to 3 h | Cheapest proof of "without trusting an RPC"; strengthens EF and WOW |
| S2 | ENSv2 release namespace (section 2.2) plus Release Explorer (live demo link) | A (contracts, extension resolution), B (explorer) | 7 to 9 h | Unlocks the ENS prize; gated at Fri 12:00 |
| S3 | Sigstore verification inside the extension with `@freedomofpress/sigstore-browser`, showing "built by github.com/x/y/.github/workflows/samebuild-release.yml at refs/tags/v1.0.1" | C | 2 to 3 h | Provenance in the badge; WEBCAT library alignment |
| S4 | `samebuild verify-dir`: check an installed extension directory (ignoring the store-added `_metadata/` [GK]) against a release; demo on our own extension | A or B | 2 h | Answers "who verifies the verifier"; touches the "or extension" half of the prize idea |
| S5 | Enforce the manifest's `default_csp` on documents (CDP response header rewrite) and auto-attach to workers and iframes | C | 3 h | Closes the XSS and worker gaps |
| S6 | Full WEBCAT interop: emit a Sigstore-type enrollment and signature; test with the WEBCAT Firefox alpha | B | 3 h | Nice, not needed |
| S7 | Scaffold-ETH 2 (Next.js static export with a fixed `generateBuildId`) support | B | 4 h+ | The CROPS prize links SE-2 [JC], but reproducibility risk is high |
| S8 | Firefox port of the interception layer | C | 4 h | WEBCAT already covers Firefox |

### 6.3 Non-goals

- Firefox, Safari, mobile.
- Server-rendered or non-reproducible frontends.
- Decentralized origin enrollment (DNSSEC proofs, consensus).
- Verifying that the source code is safe.
- Content privacy of lookups (needs PIR).
- Malicious browser extensions or OS.
- Chrome Web Store listing.
- EAS integration.
- Gasless or EIP-712 rebuilder attestations.
- L2 releases.
- A hosted monitoring or alerting service.
- `isolationKey` support.

### 6.4 Mocked or simplified parts (disclose in README)

1. Rebuilders in the demo are team-controlled machines (a laptop and a VPS). Production needs independent organizations.
2. Origin enrollment is user-added with a `.well-known` back-pointer (trust on first use). In ENS mode the name is the identity, but the origin claim is still self-declared plus the back-pointer.
3. The "CDN" is our own server, and the attack is staged on Sepolia with test ETH.
4. The activation delay is 120 seconds for the demo.
5. Interception uses `chrome.debugger`. Chrome shows its "started debugging this browser" banner. This is a prototype enforcement path, not a store-ready UX.
6. The Nym worker bundle downloads from public CDNs on first boot (hash-pinned). The bootstrap read of the worker specifier uses a public mainnet RPC.
7. Colibri uses the public Colibri prover and checkpoint servers. They are not trusted for integrity, but they are an availability dependency.
8. Workers, iframes and service workers inside the dapp are not intercepted in the MVP. The demo dapp has none, and we bypass service workers.
9. Only Vite static builds; Sepolia only.
10. The "check once without privacy" escape hatch exists and needs explicit consent.

### 6.5 Cut order if behind schedule (first cut first)

S8, S7, S6, S5, S4, S3, then S2 (at the go/no-go, never after 18:00 Fri). After that: the update-pending UI polish, then the second rebuilder (keep one). Never cut: tamper blocked before execution, Colibri-verified reads, the CROPS README, or the video.

## 7. Pre-event de-risking checklist

Rule for this phase: nothing written here goes into the project repos. Read docs, run official examples unmodified, use DevTools by hand, and register accounts. Anything typed for a test is thrown away.

### 7.1 Before Thu 5 Nov

| # | Check | How (no project code) | Pass criterion |
|---|---|---|---|
| P1 | Prize texts | Re-read the EF CROPS ("tbc") and ENS sections; check whether Arkiv published | Note any change in criteria wording |
| P2 | Anon-RPC in an extension | Build and load the official `impl/demo-extension` from `ethereum/anon-rpc` per its README, with the Nym specifier | Nym boots in under 30 s on venue-like Wi-Fi (phone hotspot) |
| P3 | Colibri on Sepolia | Run the Colibri README examples unmodified with `chainId` 11155111 against a known Sepolia contract | Verified `eth_call` in under 5 s; `VerifiedOnly` throws on a broken RPC URL |
| P4 | Colibri endpoints through mixnets | Use the Anon-RPC hosted demo page with the Nym worker to GET `sepolia.colibri-proof.tech` and a Sepolia beacon API | No Cloudflare challenge or 403 from Nym or Tor exits |
| P5 | CDP interception by hand | Chrome DevTools, Protocol monitor (experimental): send `Fetch.enable` with a Response-stage pattern on a test page, then `Fetch.getResponseBody` and `Fetch.failRequest` on a script | The blocked script never executes; check again after a reload with "Disable cache" |
| P6 | DNR session rules | Read the Chrome docs for `excludedTabIds` on session rules and for extension-page redirects | Confirmed supported in current stable |
| P7 | Reproducible public template | On two machines (x86 Linux and Apple Silicon), run the script under this table twice each | All four outputs identical |
| P8 | ENSv2 flow | Read the `contracts-v2` README and `docs/addresses/sepolia.md`; learn registration with a throwaway name in the ENS app on Sepolia if it supports v2 | Know which calls register a name, set a subregistry and set a resolver |
| P9 | WEBCAT spec | Read `webcat-spec` manifest, server and enrollment docs; find the canonicalization used | Canonicalization known |
| P10 | Accounts and infra | 2 Sepolia ETH in each of 3 wallets (faucets); empty GitHub org `samebuild` with Actions enabled; a VPS on a second provider with Docker; a cheap domain for the demo "CDN"; a mainnet RPC for the Anon-RPC bootstrap | All ready |
| P11 | Recording kit | OBS at 1080p, a USB mic, HDMI adapters, a second Chrome profile, a phone hotspot | Test recording made |
| P12 | Rules | Ask ETHGlobal (Discord) whether a disclosed pre-event plan document is fine for Classic | Written answer saved |

P7 script:

```bash
docker run --rm --platform linux/amd64 -e TZ=UTC -e SOURCE_DATE_EPOCH=1767225600 node:24.22.1-bookworm-slim sh -c "npm create vite@9.3.1 app -- --template react-ts && cd app && npm install && npm run build && find dist -type f -exec sha256sum {} + | sort"
```

### 7.2 Thu 5 Nov, before 21:00 (workshops [JC])

- 16:00: A attends ENSv2, and asks about `register` and `setAlias` signatures, UniversalResolverV2 behavior on aliased names, and whether ENS judges count our design as central. B attends Arkiv to check prize fit.
- 17:00: all attend the Ethereum Foundation workshop. Ask whether the CROPS criteria changed, whether EF sees the debugger approach as acceptable for a prototype, and whether the WEBCAT ERC has a draft we should align with.
- 20:00: opening ceremony. At 21:00 create the repos.

### 7.3 Day-one checks (Thu 21:00 to Fri 01:00)

| # | Check | Pass | Fallback trigger and action |
|---|---|---|---|
| D1 | Final prize text on the live page | Matches plan | Adjust the README wording |
| D2 | Demo dapp double build in the pinned image | Identical manifests | Fri 01:00: strip offenders (sourcemaps, `.vite/`); drop dependencies; else limit the claim to "same image, independent machines" |
| D3 | CDP blocks a script before execution in our extension skeleton, including after reload | Script never runs | Fri 03:00: switch to fallback F2 (section 11) |
| D4 | Service worker lifetime with the debugger attached during 5 idle minutes | Still attached | Add an offscreen keepalive port; on `onDetach` fail closed |
| D5 | Colibri verified `eth_call` on our deployed specifier, through Nym, inside the offscreen document | Under 10 s cold, under 4 s warm | Fri 15:00: Lodestar prover fallback; Fri 18:00: Helios without Anon-RPC (disclosed) |
| D6 | GitHub OIDC keyless signing in the Action | Bundle produced | Drop Sigstore and keep `attest-build-provenance` |
| D7 | Faucet balances, VPS reachable, venue Wi-Fi allows WebRTC | Yes | Phone hotspot; tor-js via our gateway |

## 8. 36-hour timeline by role (IST)

A = contracts, chain reads, ENS, CROPS write-up. B = build pipeline, CLI, Action, demo dapp, attack and lying servers, explorer, video. C = extension.

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | **All:** create both public repos; LICENSE files; README skeleton with CROPS headings; `AI_USAGE.md`; `specs/` with the first prompt log; freeze interfaces (manifest schema v1, contract ABI, extension message types); ENS tentative call from the workshop | (same) | (same) |
| Thu 22:00 to Fri 02:00 | `ReleaseSpecifier`, `SpecifierFactory`, `RebuildAttestations`; unit tests; invariant tests I1 to I5 | Demo dapp scaffold; pinned Dockerfile; `samebuild build` (manifest, canonical JSON, SHA-256, CID); D2 double-build check | MV3 skeleton; DNR gate; CDP interception against a hard-coded manifest on a local server; D3 and D4 |
| Fri 02:00 to 05:00 | Slither pass; deploy to Sepolia; Sourcify verify; export ABIs to `packages/core`; start the offscreen harness boot (Nym) | **Sleep 02:00 to 06:00** | Hashing, verdicts per tab, block page v0, cache and service-worker bypass; **sleep 03:30 to 07:30** |
| Fri 05:00 to 09:00 | **Sleep 05:00 to 09:00** | From 06:00: Action wrapper (double build, compare, upload release assets and content-addressed branch); `samebuild publish` (Sigstore, viem transaction) | From 07:30: release fetch through `packages/core` (temporarily plain viem), manifest fetch and hash check |
| Fri 09:00 to 09:30 | **Integration point 1 (all):** tag on the demo repo, Action, `publish` on Sepolia, extension reads the release (unverified for now), verifies files served by the attack server, green and blocked both work | (same) | (same) |
| Fri 09:30 to 15:00 | Colibri over `worker.fetch` in offscreen (D5); policy engine (K of N, delay, revoke, max age, no rollback); timer refresh and cache; ENS spike on Sepolia with `cast`; **12:00 ENS go/no-go** | `samebuild rebuild --attest`; VPS rebuilder; attack server with tamper toggle and attacker log; targeted-swap variant of the chunk kept only in `tools/attack-server` | Popup, gate and block page final; settings (rebuilders, K, network); amber fail-closed states (90 s boot timeout, debugger detached) |
| Fri 15:00 to 15:30 | **Integration point 2 (all):** verified and private reads live; two attestations; policy enforced; v1.0.1 green through Colibri | (same) | (same) |
| Fri 15:30 to 21:00 | If ENS go: ENS mode in the specifier, setup and lock script, extension enrollment by name through UniversalResolverV2. If no-go: S4 `verify-dir` and help C with S3. | S1 lying RPC and `naive-check`; if ENS go, Release Explorer on GitHub Pages; `docker compose` quick start | Hardening (redirects, large bodies, detach handling, keepalive); reproducible build of the extension itself; S3 if time |
| Fri 21:00 to 22:00 | **Integration point 3 (all):** two full dry runs of the 4 minute demo with a timer; triage the bug list; final cut decisions | (same) | (same) |
| Fri 22:00 to Sat 01:00 | Fix bugs; CROPS section, trust model, ENS README section; Q&A prep sheet | Video script, three slides (four bullets or fewer); record backup clips of every demo beat | UI copy pass in plain language; extension zip on the GitHub release; demo profiles set up |
| **Sat 01:00** | **Feature freeze (all).** Tag `samebuild` v0.1.0. Demo dapp v1.0.1 live; v1.0.2 prepared for the update beat. | (same) | (same) |
| Sat 01:00 to 02:30 | Bug bash only; three full demo runs; README final pass | AI_USAGE table final; links check | Bug bash; clean-profile install test from the zip |
| Sat 02:30 to 04:30 | Voice for the architecture and CROPS beats | Drive the screen recording; edit to 2:45 to 2:55; export 1080p; upload unlisted | Voice for the demo beats; second-screen capture |
| Sat 04:30 to 07:00 | **Sleep 04:30 to 07:00** | Submission draft (text, prize selection, links); **sleep 05:30 to 07:30** | **Sleep 04:30 to 07:00** |
| Sat 07:00 to 08:00 | Final link check in a clean browser; repos public; commit history check | From 07:30: review the submission | Pre-warm demo machine; hotspot test |
| **Sat 08:00** | **Submit** (one hour of buffer before the 09:00 deadline [JC]) | (same) | (same) |
| Sat 08:00 to 09:30 | Rehearse the live demo twice; Q&A drill | Backup laptop ready with recorded clips | Nym booted, cache fresh, both Chrome profiles open |
| Sat 09:30 to 12:30 | Finalist judging window [JC] | (same) | (same) |

Sleep totals: about 6.5 hours each. Someone commits every hour while awake, so history stays steady.

## 9. Demo scripts

### 9.1 Live finalist demo (4:00)

Setup:
- Laptop A runs Chrome profile "Protected" (extension, pre-warmed, Nym up) on the left half of the screen and profile "Unprotected" on the right.
- A terminal shows `tamper`, `restore` and `attacker-log`.
- The demo dapp is served from the attack server at `demo.samebuild.xyz` (with a hosts-file fallback to localhost if venue DNS fails).
- The victim wallet is connected on Sepolia in both profiles.

| Time | Beat | What judges see and hear |
|---|---|---|
| 0:00 to 0:20 | Hook ([GK] detail, verify wording) | "Bybit's frontend hack was one changed JavaScript file on a host. Open source did not help, because nobody checks that what runs is what is in the repo. SameBuild checks every file, before it runs." |
| 0:20 to 0:55 | Honest load | Open the dapp in Protected: the gate flashes "Checking this app's code", then the app loads and the badge goes green. Popup: "Same as the public code: github.com/samebuild/samebuild-demo-dapp @ a1b2c3d, v1.0.1. Rebuilt by 2 of 2 builders you trust. Checked against Ethereum by a light client. Lookup sent over the Nym mixnet." Click the commit link. |
| 0:55 to 1:55 | **The moment it matters** | A teammate, playing a hacked CDN, runs `tamper`, which swaps one JS chunk under the same filename with a version that redirects payments for this wallet. Reload Protected: red page, "This app's code does not match its public repo. /assets/index-4f9a1c2e.js was stopped before it could run." Show `attacker-log`: 0 executions. Reload Unprotected: the recipient field silently changes to the attacker; the log shows 1. Run `restore`. |
| 1:55 to 2:40 | The RPC cannot lie either | "What if the attacker also runs your RPC?" Settings: RPC set to the lying endpoint, which claims the tampered bundle is official. Run `naive-check` in the terminal: "MATCH, release is official" (a normal verifier is fooled). Protected: "Release record failed the light-client proof. Not trusted." The page stays blocked. Switch back. |
| 2:40 to 3:25 | Developer and rebuilder side | GitHub Actions run: two builds with identical hashes, a Sigstore signature, the publish transaction on Sepolia. Laptop B terminal: `npx samebuild rebuild ... v1.0.1` reports an identical manifest hash and the attest transaction. If ENS is go, the explorer shows `samebuild-demo.eth` aliased to `v1-0-1.samebuild-demo.eth` with its records. One line: "New releases wait out a delay before any browser accepts them, and old ones can never come back." |
| 3:25 to 4:00 | Close | "Nothing here needs us: contracts with no admin, mirrors that cannot cheat, rebuilds anyone can run. Six lines of YAML for any Vite dapp. This is the 1TS 'Verifiable Frontend Hashes' control, built for Chromium." Stop. |

If the network dies mid-demo: the extension shows its cached verified state ("verified at block N, 3 minutes ago"). Beats 2 and 3 still work from that cache. Backup clips sit on the second laptop.

### 9.2 Video (target 2:50; hard window 2:00 to 2:59)

| Time | Beat | Content |
|---|---|---|
| 0:00 to 0:15 | Hook | Voice over slide 1 (three bullets): servers can change dapp code; open source does not stop it; SameBuild does. |
| 0:15 to 0:35 | What it is | Slide 2: the diagram from 5.2, simplified; one sentence per box. |
| 0:35 to 1:05 | Developer and rebuilder | Tag push, Action log (identical double build, Sigstore, publish transaction), rebuilder terminal and attest transaction, release pending then active. |
| 1:05 to 1:25 | User, honest case | Gate, green badge, popup details. |
| 1:25 to 2:00 | **The moment it matters** | Split screen. Tamper on the server; Protected is blocked before execution with the attacker log at 0; Unprotected gets the swap with the log at 1. |
| 2:00 to 2:20 | Lying RPC | `naive-check` fooled; extension refuses the forged release record. |
| 2:20 to 2:40 | CROPS recap | Slide 3, four bullets: C, nothing of ours is needed; O, licenses and you can rebuild us too; P, lookups over Nym on a timer; S, no keys, trust assumptions listed. |
| 2:40 to 2:50 | Close | Repo URL, "Rebuild it yourself: npx samebuild rebuild", team names. |

Rules: live human voice only, no speed-up, no music with captions instead of speech, at least 1080p, no phone recording [JC].

## 10. README skeleton, CROPS draft and required files

````markdown
# SameBuild

The code you run is the code in the repo, or it does not run.

Lead EF target: Best CROPS App (lead property: Secure). Partner: ENS Best Use of ENSv2 (if listed in the submission).

- Demo video: <YouTube link, 2:50>
- Live demo: <demo dapp URL> and <Release Explorer URL>
- Extension zip: <GitHub release link>
- Sepolia contracts: SpecifierFactory <addr>, RebuildAttestations <addr>, demo ReleaseSpecifier <addr>; tx links for publish, attest, activate

## What it does
Three bullets: build and publish, rebuild and co-sign, verify before execution.

## How it works
Diagram and the three flows (release, rebuild, verify).

## Run it yourself (judges start here)
```bash
git clone https://github.com/samebuild/samebuild && cd samebuild
docker compose run --rm build
docker compose up attack-server
```
Load `extension/dist` as an unpacked extension, enroll the demo, then:
```bash
curl -X POST http://localhost:8080/admin/tamper
docker compose run --rm rebuild https://github.com/samebuild/samebuild-demo-dapp v1.0.1
```

## CROPS
- **C:** We run nothing a user needs at check time: verification happens in the extension against immutable contracts on Ethereum (no owner, proxy or pause), manifests come from any mirror and are hash-checked, and anyone can rebuild. If our domain, GitHub org or team disappear, enrolled apps keep verifying. What can still refuse you: the privacy network or the Colibri prover being down (switch network, or consent to one non-private check), or an app's guardian revoking a release, which can only make the extension block, never accept new code.
- **O:** Contracts and `packages/core` are MIT; the extension and CLI are GPL-3.0-or-later; we pledge never to move to a non-free license. Everything builds from this repo alone with `docker compose run --rm build`, and the extension's own build is reproducible and checkable with `samebuild verify-dir`.
- **P:** The dapp host learns nothing new. The RPC provider and Colibri prover see which app's release was checked, but not your IP, because every read goes through Anon-RPC over the Nym mixnet, on a timer for all enrolled apps rather than when you open one. The public CDN that serves the hash-pinned Nym worker on first boot learns that your IP uses Anon-RPC. There are no analytics, no accounts and no servers of ours.
- **S:** No wallet keys or personal data are touched; settings stay in `chrome.storage.local`. You trust Ethereum consensus (checked by Colibri), SHA-256, the K of N rebuilders you choose, the public repo at the attested commit (we prove you run the public code, not that it is safe), Chrome's debugger API to hand us the real bytes, and this extension, which you can rebuild yourself.

## Trust model and threat table
Attacker capabilities (CDN, RPC, prover, publisher key, guardian key, repo write access, one rebuilder) mapped to outcomes.

## Mocked or simplified
The section 6.4 list, verbatim.

## Prior art and what is new
Short version of section 4.

## ENSv2 (partner prize section)
Which ENSv2 features we use and where: file and line links for the registrar role grant, record writes, alias update, and the extension's resolution path.

## What was built at the hackathon vs reused
Libraries table with versions; patterns taken from anon-rpc, Privacy Pools, Kiwi News and webcat-spec with links; a statement that this repo was created after 21:00 IST on 5 Nov; a pointer to `docs/pre-event-plan.md`.

## AI usage
Summary and a link to `AI_USAGE.md` and `specs/`.

## Roadmap
Chromium API proposal, wallet library integration, WEBCAT interop, mainnet, independent rebuilder set.

## License
MIT (contracts, packages/core) and GPL-3.0-or-later (extension, CLI). No-relicense pledge.
````

Required files checklist:
- `LICENSE-MIT` and `LICENSE-GPL` with SPDX headers per package.
- README with the "CROPS" section titled exactly that [JC].
- `AI_USAGE.md` and `specs/` [JC].
- `docs/pre-event-plan.md` (this plan, disclosed).
- `docs/reused.md` if the README table grows.
- No partner feedback file is required for EF or ENS [JC]. (Uniswap's FEEDBACK.md and Whitechain's WHITECHAIN_FEEDBACK.md do not apply because we skip those prizes.)
- The ENS showcase must carry the live demo link [JC].

## 11. Risks and fallbacks

| # | Risk | Likelihood / impact | Detection | Fallback (concrete) |
|---|---|---|---|---|
| R1 | **Build not reproducible** (bundler nondeterminism, optional native dependencies, platform differences, `npm ci --ignore-scripts` breaking binaries) | Medium / High | D2 at Fri 01:00 | Build only in `linux/amd64` Docker on all machines; disable sourcemaps; delete `dist/.vite`; pin every dependency exactly; drop dependencies until it reproduces (the demo dapp is tiny). Worst case, claim "identical in the same pinned image on independent machines" and disclose. |
| R2 | **Chromium pre-execution blocking fails**: memory cache skips interception, the service worker dies and the debugger detaches, the first navigation races, child targets escape | Medium / Critical | D3 and D4 by Fri 03:00 | **F1:** `Network.setCacheDisabled` plus `Page.reload` with `ignoreCache`, an offscreen keepalive port, fail closed on `onDetach`. **F2:** "verify then load": the gate page downloads every manifest file itself, verifies, then lets navigation proceed while CDP checks served bodies, killing the tab on mismatch (disclosed as detect-and-kill, weaker). **F3:** Firefox with `webRequest.filterResponseData`, as WEBCAT does on Firefox [GK], while still keeping our Ethereum enrollment. |
| R3 | **Judges see the debugger banner as unshippable** | High / Medium | Q&A | Say it first: it is the only Chromium mechanism today; the core is a library; the path is wallet integration (the WEBCAT grant's model [EFG]) or a Chromium API; Firefox works now. |
| R4 | **Anon-RPC worker boot slow or failing at the venue** (Nym about 11 s boot [ARPC], WebRTC blocked, exits blocked by Colibri endpoints) | Medium / High | P2, P4, D5, D7 | Pre-warm and cache; tor-js through our own gateway on the VPS; phone hotspot; the amber state with the consented non-private check; at worst, record beat 3 earlier and show the cached verified state live. |
| R5 | **Colibri cannot verify our `eth_call` on Sepolia** (prover capacity, access-list support on the RPC, WASM in offscreen) | Low to Medium / High | D5 | Lodestar prover 1.43.0 over an Anon-RPC EIP-1193 wrapper (beacon REST leaves directly; disclosed) [ARPC]; then Helios 0.12.0 with direct RPC (verified, not private; disclosed); then a two-network quorum (Nym plus Tor) with mismatch meaning block (unverified; disclosed). Design the specifier views with no external calls so few proofs are needed. |
| R6 | **ENSv2 integration stalls** (unknown signatures, alias semantics, Universal Resolver behavior) | Medium / Medium | 12:00 Fri go/no-go | Drop the ENS prize entirely rather than ship a cosmetic integration; A moves to S4 and hardening. |
| R7 | **Sigstore keyless signing or OIDC trouble in Actions** | Low / Low | D6 | Keep `attest-build-provenance` only; the onchain publish plus rebuild attestations carry the claim. |
| R8 | **Publisher key in GitHub secrets is stolen** | Low / Medium (design question) | Threat table | The key can only publish. A malicious release is pending for the delay, gets no honest rebuild attestations unless it matches a public commit, and can be revoked by the guardian. Say so in the README. |
| R9 | **Integration hell or scope creep** | Medium / High | Integration points 1 to 3 | Interface freeze at hour 1; integration points with hard pass criteria; the cut order in 6.5. |
| R10 | **Rule compliance** (commit history, AI attribution, pre-event plan) | Low / Critical | Sat 07:00 check | Hourly commits; `AI_USAGE.md` and `specs/` kept current; the plan disclosed; P12 answer saved. |

## 12. Likely judge Q&A

1. **"Isn't this just SRI, Code Verify or WEBCAT?"** SRI hashes live in HTML that the same server can change. Code Verify relies on one publisher's hashes [GK]. WEBCAT is the closest and we reuse its manifest format, but it is Firefox-only, trusts named signers rather than an independent rebuild, and enrolls through a permissioned validator chain [LC], [EFG]. We add rebuild-from-source, Ethereum as the permissionless enrollment and release log, light-client checking over Anon-RPC, and Chromium enforcement.
2. **"Who verifies the verifier?"** The extension is reproducibly built by the same pipeline, so `samebuild verify-dir` checks the installed copy against its tagged release. The worker it runs is pinned by hash, as Privacy Pools does [ARPC].
3. **"Chrome shows a debugging banner. How does this ship?"** It is the only Chromium mechanism today that sees and stops bytes before they run. That gap is why 1TS funds WEBCAT's "Chromium research" and a wallet-integrable library [EFG]. Our check logic is a separate library for exactly that integration. We show the banner rather than hide it.
4. **"What if the repo itself is compromised and a malicious commit is tagged?"** We prove you run the public code at the attested commit, not that the code is good. The attack becomes public, attributable and delayed: the activation delay gives watchers and users time, the popup links the diff, and the guardian can revoke. That beats today's silent CDN swap.
5. **"Rebuilders can collude, and in your demo they are you."** Correct for the demo, and disclosed. The user picks rebuilders and the threshold, not the developer. That follows the Mandate's "choice of independent locally-verifiable filters" [EFG]. Anyone can become a rebuilder with one command and one transaction.
6. **"Why Ethereum instead of Sigstore's log or WEBCAT's chain?"** Anyone can enroll without permission. A browser can check the state with a light client. The contract enforces the delay, no-rollback and immutability. It composes with ENS names and wallets. We still sign with Sigstore for provenance.
7. **"Does it slow page loads, and does checking leak my browsing?"** Hashing costs milliseconds. Chain reads happen on a timer for all enrolled apps, over Nym, so opening an app triggers no lookup. Only a cold start holds the page, until the first verified read (around 10 to 20 s; Nym boot alone is about 11 s [ARPC]).
8. **"Can an attacker serve an old, legitimately published version with a known bug?"** No. Only the current active release is accepted, `currentIndex` can never decrease (fuzzed invariant), and revoked releases block.
9. **"What about third-party scripts, server-rendered pages, workers?"** Executable responses must be in the manifest; cross-origin scripts are blocked unless listed; data (JSON) passes. SSR is out of scope. Workers and iframes are the next step (S5), and the demo has none. All of this is in the README.
10. **"Why both an IPFS CID and per-file SHA-256?"** Browsers load files one by one over HTTP, so per-file SHA-256 is what can be checked at load time. The CID makes the same release fetchable and checkable from IPFS (the explorer) and gives the ENS contenthash.

Also prepare ETHGlobal's three standard prompts [JC]:
- "What inspired your project?" The Bybit-style frontend swap, and the 1TS control sitting at "Research".
- "What tools did you use, and why?" Anon-RPC, Colibri, ENSv2, Sigstore, Foundry.
- "What challenges did you solve, and how?" Chromium interception and reproducibility.

## 13. AI usage and attribution plan

Facts: AI is allowed with "Attribution" naming "which parts of the code, specific files, or assets were generated or assisted by AI". Projects that "rely entirely on AI" may lose eligibility. Spec-driven workflows must commit "all spec files, prompts, and planning artifacts" [JC].

Plan:
- **Human-owned, no AI generation, AI review allowed:** contract logic and invariants (A); interception policy and the `judge` function (C); the trust model and CROPS text (A). These are what judges will probe in Q&A, so the people presenting them wrote them.
- **AI-assisted:** boilerplate (MV3 manifest, Vite configs, CLI argument parsing, React popup layout), test scaffolding, Docker and Action YAML first drafts, README prose drafts, and the explorer UI. Each is reviewed and edited by a named teammate.
- **Files:**
  - `AI_USAGE.md` holds a table: file or directory, tool (Claude Code, Copilot, other), share (generated, assisted, none), reviewer.
  - `specs/` holds the frozen interface spec from hour 1, exported prompt logs from each AI session (exported at least at each integration point), and this pre-event plan. The plan was drafted with an AI assistant from the team's research notes, and that is stated.
- **Commits:** attribution lives in `AI_USAGE.md` and `specs/`, not in commit trailers, following the team lead's standing rule of no AI co-author trailers. Commit messages describe the change.
- **Video:** no AI voiceover and no generated voice [JC]. Slides are made by hand.
- **Final check, Sat 07:00:** every file in the repo is either listed in `AI_USAGE.md` or written by hand, and `specs/` has the latest prompt exports.
