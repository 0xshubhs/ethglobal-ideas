# World: fresh-build ideas for ETHGlobal Mumbai (draft)

Date: 2026-10-31. Sponsor: World ($12,500 total; $7,500 open to fresh builds). Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build only, no existing code; public SDKs and starter kits only. The two Continuity tracks (the Continuity "World ID Agent Pass" and "[Cont] Best IDKit Use Case") are ignored throughout.

Tracks covered (verbatim text in `track_ideas/00_current_tracks.md`, World section; source [Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world), fetched 2026-10-31):

1. **World ID Agent Pass**: $5,000 USDC (1st $2,500, 2nd $1,500, 3rd $1,000).
2. **Best Use of IDKit**: $2,500 USDC (2 x $1,250).

History and evidence: `track_ideas/history/world.md`, cited below as [H §n]. Facts carry a URL or an [H] pointer; everything labelled **Judgement** is this designer's opinion.

---

## 0. What the evidence says, in six lines

- Both Mumbai fresh tracks are near-copies of Tokyo 2026 (25 to 27 Sep). "Best Use of World ID for Agents" became "World ID Agent Pass" with the same five qualifications, and "Best Use of IDKit" is word for word the same ([Tokyo prizes](https://ethglobal.com/events/tokyo2026/prizes/world); [H §2.8, §2.9]). Tokyo's five fresh winners are the best guide to this judging team.
- Tokyo Agent winners made the fresh human check the hinge of a new economic relationship: an insurance claim payout ([Surety](https://ethglobal.com/showcase/surety-ms4gx)), a debt owed by a person ([Lifeline](https://ethglobal.com/showcase/lifeline-mygz6)), consent to send confidential data to a model ([Airlock](https://ethglobal.com/showcase/airlock-ph6bx)) [H §4.1].
- Correct integration is not enough. Axis (Tokyo, no prize) met every qualification: "A World ID approval is bound to a single proposal and can only be used once. It has to be recent (≤ 120s), and it must come from the same verified human who owns the treasury, matched on World ID's pairwise subject. If the user cancels ... the proposal is rejected" ([Axis](https://ethglobal.com/showcase/axis-ybtp8)). Its action was "agent trades, a human approves big ones", which at least nine Tokyo entries shared [H §4.1].
- Tokyo IDKit winners bound the proof to an object that then travels or is enforced: a Secure Enclave key that signs photos ([Pupille](https://ethglobal.com/showcase/pupille-2o0q0)), and wallets in an ad auction with a plain statement of what the proof does not verify ([Placed](https://ethglobal.com/showcase/placed-eijhx)). "One human, one entry" drops (ScalpLess, Tenjō, GomiGo) did not place [H §4.1].
- World openly retires winning patterns. Cannes 2026's AgentKit 1st was free trial calls for human-backed agents ([AgentGate](https://ethglobal.com/showcase/agentgate-scs65)); by Lisbon, "Human-backed benefits for AI agents (i. e API calls,discounts)" and "Agent reputation" were listed under "Will not qualify" ([Lisbon prizes](https://ethglobal.com/events/lisbon2026/prizes/world)) [H §6].
- **Judgement:** the open seam for this team is security-critical protocol actions (unpause, upgrade, signer changes, payout destination changes, recovery), where "a fresh, specific, distinct human" is the property a stolen key or a prompt-injected agent cannot fake. No World winner in the window has worked there [H §5], and it matches the Binance 7702 drain every judge will know (`track_ideas/00_season.md`, signal 1).

## 1. Rules and technical facts that shape every idea

- **Partner cap:** at most three partner prizes; "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize" ([Mumbai event page](https://ethglobal.com/events/mumbai)). One project may therefore enter both World tracks for one slot. The EF places a project in at most one EF prize. The ETHGlobal finalist track does not count.
- **Judging inputs:** partner prizes are judged only from repo, README and video. Every World entry needs, on video: the request, the user completing it, the validated result, the protected action, and a failed path where the action does not happen. In the repo: a debrief file covering "time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact" (both tracks require it).
- **Agent Pass facts** (from World's docs, fetched 2026-10-31):
  - OIDC issuer at `https://auth.world.org`; "`max_age=0`: Require fresh authentication for this transaction, even with an existing browser session"; "`prompt=login`: Require fresh authentication" ([step-up guide](https://auth.world.org/docs/guides/step-up)).
  - Essential claim syntax `{ "id_token": { "acr": { "essential": true, "values": ["https://world.org/oidc/acr/orb-face"] } } }`; "An explicit `claims.id_token.acr` request takes precedence over `acr_values`"; if no requested class is supported, "the request fails with `unmet_authentication_requirements`" ([step-up guide](https://auth.world.org/docs/guides/step-up)).
  - A specific human can be demanded: "A mismatch ends the request with `access_denied`" when a requested `claims.id_token.sub` does not match the authenticating account ([step-up guide](https://auth.world.org/docs/guides/step-up)). This gives a clean "wrong human" failure path.
  - Device flow (headless agents): it "already requires fresh authentication and explicit approval. It does not implement `max_age` or `prompt`" ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop)); "If the mobile response cannot satisfy an essential requirement, token polling returns `access_denied`, never a downgraded token" ([step-up guide](https://auth.world.org/docs/guides/step-up)); the `device_code` "expires 20 minutes after creation and can be redeemed once" ([OIDC guide](https://auth.world.org/docs/guides/oidc)).
  - Binding is the app's job: "Bind a fresh OAuth `state`, `nonce`, and PKCE verifier to this attempt"; "Authentication alone does not authorize a payment, redemption, or account change"; "The ID token contains authentication context, not terms for a separate business operation or a signed action digest" ([step-up guide](https://auth.world.org/docs/guides/step-up)); "The World ID issuer does not receive, display, or approve the pending business action" ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop)).
  - APIs and MCP servers: "use the authentication challenge and retry flow (RFC 9470)" ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop)); "Do not send the ID token from the World ID issuer directly to a downstream MCP server" ([step-up guide](https://auth.world.org/docs/guides/step-up)).
  - The Mumbai page says "We are mocking proofs now, so you don't need sandbox app anymore" and "Proofs are using fake identities, DO NOT rely in them for production" ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- **IDKit facts** ([IDKit integrate](https://docs.world.org/world-id/idkit/integrate); [IDKit credentials](https://docs.world.org/world-id/idkit/credentials)):
  - The backend signs an RP request ("Never generate RP signatures on the client"); the payload goes to `POST https://developer.world.org/api/v4/verify/{rp_id}`; "your backend must check that the nullifier hasn't been used before", with `UNIQUE (nullifier, action)` in the sample schema; the optional `signal` binds context (user ID or wallet) and "Your backend should enforce the same value".
  - Presets: `proofOfHuman` ("The user is a unique human, backed by anonymous biometric verification by the Orb"); `passport`; `selfieCheck` ("A medium-assurance biometric credential using the device camera for liveness and facial similarity", returns `sybil_score` and `integrity_bundle`, range not documented); `identityCheck` (preview; attributes `document_type`, `issuing_country`, `minimum_age`, `nationality` and others; the response carries `identity_attested`); `require_user_presence` fails with `user_presence_failed`. The docs describe no exclusion lists and no AND or OR across credentials.
  - Testing uses the simulator with `environment: "staging"`; production must reject "staging and sandbox" proofs.
- **Judgement:** demos can run without an Orb, but any claim about real-world uniqueness must be stated as a design property, not shown with real people.

## 2. Track 1: World ID Agent Pass ($5,000)

Verbatim requirements (R1 to R5) and the one "Won't place" signal:

- R1 "Integrate with the official World ID Agent Pass."
- R2 "Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action."
- R3 "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur."
- R4 "Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization."
- R5 "Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact."
- Won't place: "not simply a login screen added to an existing product." **Judgement:** also avoid the Tokyo non-winner shape "agent pays or trades, above a limit a human approves", and Lisbon's retired patterns (agent reputation, free API calls or discounts for human-backed agents).

**Common build (Judgement):** a Hono or Next.js backend as a confidential OIDC client (secret never in the browser); authorization code flow with PKCE for browser users and the RFC 8628 device flow for headless agents; ID token checked against World's JWKS for `iss`, `aud`, `nonce`, `auth_time`, `acr`, and a requested `sub` where a specific human is required. The `nonce` (browser) or a server-side record keyed by `device_code` (device flow) binds the approval to a hash of the exact action. The backend then signs a one-time EIP-712 approval with a short expiry, and a Solidity gate contract verifies it, so the chain refuses anything the backend did not approve. Foundry tests cover replay, expiry, wrong action hash, wrong `sub` and wrong `acr`. Ship `WORLD_DEBRIEF.md` from hour one and fill it as friction happens.

### A1. Breakglass: the agent may only make things safer (stacks with Uniswap)

- **Pitch:** a protocol-monitoring AI agent can pause a Uniswap v4 pool or cut a vault cap on its own in one block, but nothing that restores or increases risk (unpause, raise a cap, release funds) happens until the named on-call human completes a fresh Agent Pass check bound to that exact call.
- **Falsifiable promise:** "With the agent's key and a prompt-injected instruction, the pool cannot be unpaused; the same unpause executes within a minute of the guardian approving on their phone, and an approval for a different pool or a different cap value is rejected."
- **20 second demo:** a mainnet-fork exploit replay starts draining a pool; the agent pauses it in the next block (risk down, no human); an injected support ticket tells the agent "all clear, unpause"; the unpause reverts on screen with `NoFreshHuman()`; the guardian's phone shows the Agent Pass prompt; they approve; the unpause lands. A second run in which a different person approves ends in `access_denied`, and the pool stays paused.
- **How it meets each requirement:** R1 Agent Pass is the only path to the risk-up role. R2 request (the agent opens an approval for `unpause(poolId)`), completion (guardian authenticates with `max_age=0`, an essential `acr` of `orb-face` and the roster `sub` requested), validated result (backend checks the ID token), protected action (the hook flag is cleared onchain). R3 three failed paths: cancel, timeout, and a valid World user who is not the guardian (`access_denied` from the requested `sub`). R4 confidential client; the contract trusts only the backend's EIP-712 signature. R5 debrief. Not a login screen: there is no login at all; the human step is a role in a state machine.
- **Why World's judges would pick it:** it has Tokyo's winning shape (the human step is the hinge of an asymmetric authority model, not a spend cap) and Surety's evidence style (a real attack, onchain enforcement, Foundry tests) [H §4.1, §5]. The action plainly "needs a human identity or approval layer".
- **Closest past work and the difference:** Tripwire (Tokyo 2026, no World prize) "pauses before humans can react" with no human at all ([Tripwire](https://ethglobal.com/showcase/tripwire-7bqxn)); Axis (Tokyo, no prize) asks a human before big trades ([Axis](https://ethglobal.com/showcase/axis-ybtp8)). Breakglass is the ratchet between them: risk down is instant and agent-only, risk up is human-only and specific-human.
- **Stack options:** Uniswap Foundation "Build with Uniswap" ($10,000; the pause lives in a v4 hook's `beforeSwap`; FEEDBACK.md plus form). Third slot: Chainlink "Best workflow with CRE" ($1,500 single prize; the monitoring job as a CRE workflow, "simulation is enough") or none. No EF prize, because a backend signer weakens the "C" in CROPS.
- **Difficulty (36 h):** medium. Hook and gate contracts take this team about a day; the OIDC client half a day; the fork exploit replay is the main risk.
- **Team fit:** high. Incident response and pause design are audit-room topics; fuzz the gate against "risk-up disguised as risk-down" calls (for example a cap change that rounds up).

### A2. Upgrade Pass: agents can ship, only a person can change code that holds money (narrow World entry)

- **Pitch:** an AI coding agent keeps full deploy rights on testnets and fresh contracts, but `upgradeToAndCall`, ownership transfer and module enablement on a live proxy go through a gate that needs a fresh Agent Pass approval bound to the new implementation's code hash and storage-layout diff.
- **Falsifiable promise:** "The agent holds the deployer key and still cannot upgrade the proxy; after the human approves, the upgrade lands, and changing one byte of the implementation after approval makes the same approval revert."
- **20 second demo:** in a terminal the agent runs `forge script Upgrade`; the gate reverts; the agent's CLI prints the device-flow code and link; the human sees "Upgrade Vault proxy to 0xabc..., codehash 0x12..., storage: slot 5 `feeBps` inserted before `owner` (collision)" and denies; a clean build is approved and executes; a tampered build presented with the old approval reverts.
- **How it meets each requirement:** R1 the device flow is the only route to the upgrade role (the agent is headless, which is what the device flow is for). R2 request from the CLI, completion in World App, validated ID token, protected action is the upgrade transaction. R3 denial, expiry (20 minute device code), and "approval for a different codehash", each with the proxy unchanged. R4 the backend computes the code hash from chain (`extcodehash`) and the layout diff from build artifacts itself; it never trusts what the agent says it is upgrading to. R5 debrief. Note for the README: the device flow ignores `max_age`, but World says it "already requires fresh authentication" ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop)).
- **Why World's judges would pick it:** World paid Commitment Issues (Lisbon 2026, Selfie Check 2nd) for a human signing an agent's git commits ([Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h)); this moves the idea to the point where money is at risk and binds the approval to bytecode, the "validated result tied to the protected action" the track asks for [H §5].
- **Closest past work and the difference:** Commitment Issues gates commit signatures; NpmGuard audits packages ([NpmGuard](https://ethglobal.com/showcase/npmguard-wt7wh)); neither gates an onchain upgrade or shows the human a storage-layout diff. No World-tagged project in the saved listings mentions upgrades [H §5].
- **Stack options:** narrow by design (World only, plus the finalist track). Hard mode if time allows: verify World's RS256 ID token signature onchain through the modexp precompile so the gate needs no backend signer; that could justify EF "Best CROPS App" as a secure dev tool, but it publishes the pairwise `sub` onchain and must handle JWKS rotation. **Judgement:** keep EF out unless hard mode works by Friday noon.
- **Difficulty:** medium (hard mode: high).
- **Team fit:** very high. Proxy patterns, storage layouts and upgrade incidents are daily work for auditors.

### A3. Slopstop: every AI-found bug report has a human of record (narrow World entry)

- **Pitch:** an intake API for bug bounty programs where AI audit agents can file findings, but a report enters triage only after its human of record completes Agent Pass from the agent's CLI. The program sees only a pairwise `sub`, so it can cap open reports per person, ban a person (not an email), and pay only the person who filed.
- **Falsifiable promise:** "A banned reporter who returns with a new email, a new wallet and a new agent is refused, because the same human yields the same `sub`; an agent that files 50 reports gets 3 into triage and 47 expire untouched."
- **20 second demo:** the agent fires 50 findings; the CLI shows one device code; the human approves; the dashboard shows 3 in triage (per-human quota) and 47 "no human of record" fading out; the triager bans the reporter; the same mocked identity on a fresh account is refused; the payout button for an accepted report asks for the same `sub` again, and a different human gets `access_denied`.
- **How it meets each requirement:** R1 Agent Pass for both filing and payout. R2 request (report submission), completion (device flow), validated result (ID token), protected action (report enters triage; payout released). R3 expired device code, cancellation, banned `sub`, wrong human at payout. R4 confidential client; reports link to `(iss, sub)` only on the server; the API returns an RFC 9470 `insufficient_user_authentication` challenge to the agent instead of trusting anything the agent says. R5 debrief.
- **Why World's judges would pick it:** curl ended its bug bounty after a flood of AI-generated reports ([BleepingComputer](https://bleepingcomputer.com/news/security/curl-ending-bug-bounty-program-after-flood-of-ai-slop-reports/); [Hackaday, 26 Jan 2026](https://hackaday.com/2026/01/26/the-curl-project-drops-bug-bounties-due-to-ai-slop)), so the problem is real. Lisbon's text names "moderation, or accountability" as targets ([Lisbon prizes](https://ethglobal.com/events/lisbon2026/prizes/world)); this is accountability without doxxing.
- **Risk:** Lisbon retired "Agent reputation". **Judgement:** the README must say Slopstop stores no score; it enforces quota, bans and payout identity per human.
- **Closest past work and the difference:** not so secret agent (London 2024, Worldcoin Best World ID Usage 3rd) blocked slashed oracle stakers so "they can't re-stake from a new account" ([not so secret agent](https://ethglobal.com/showcase/not-so-secret-agent-vmnas)), the same ban-a-person mechanic two years earlier; Truth Skills (Tokyo, no World prize) grades AI skills by verified humans ([Truth Skills](https://ethglobal.com/showcase/truth-skills-24g62)); Mars (NY 2026, AgentKit 2nd) made auditor agents human-backed for staking ([Mars](https://ethglobal.com/showcase/mars-ua1qc)). Twist: Slopstop is the intake and payout side of a real bounty program, with a fresh Agent Pass check from a headless agent's CLI per filing and per payout, rather than a one-time World ID at signup.
- **Stack options:** narrow (World only). **Judgement:** an Arc payout leg would add a partner but Arc requires building in Arc Studio, which costs time.
- **Difficulty:** low to medium (mostly backend and dashboard).
- **Team fit:** high on domain (the team knows triage pain), lower on Solidity depth, so finalist odds are below A1 and A2.

### A4. Payee Lock: an agent can run a merchant's ENS name, but only the owner can change where money goes (stacks with ENS)

- **Pitch:** a merchant's ENSv2 name is managed by an AI operations agent through Enhanced Access Control; the agent may edit menus, hours and text records, but the `addr` record and payout text records sit behind a gate contract that alone holds that role and needs a fresh Agent Pass approval from the owner, bound to the new address.
- **Falsifiable promise:** "A prompt-injected agent that tries to point `shop.eth` at an attacker's address is refused onchain; the owner's approved change lands, and an approval for address A cannot set address B."
- **20 second demo:** a fake "supplier email" tells the agent to update the payout address; the agent's write to the Permissioned Resolver reverts (it lacks the role); the owner gets the prompt, sees old and new address with an address-poisoning warning (the first and last four characters match a known contact), and denies; the address stays.
- **How it meets each requirement:** R1, R2 and R4 as in the common build; the protected action is the resolver write by the gate. R3 deny, expiry, and replay with a different address. R5 debrief.
- **Why World's judges would pick it:** it changes "authorization ... payments, commerce" (Lisbon wording) for a concrete fraud class (payee redirection), and the human guards the money's destination rather than an amount, which is new among World entries [H §4].
- **Closest past work and the difference:** Airlock gated approvers through ENS subname roles ([Airlock](https://ethglobal.com/showcase/airlock-ph6bx)); Meigi (Tokyo, no World prize) did "Confirmation of Payee for stablecoins and AI agents" ([Meigi](https://ethglobal.com/showcase/meigi-mingyi-qzc2i)); Itonami Cloud (Tokyo) screened payees. Payee Lock makes the ENS record itself the protected object.
- **Stack options:** ENS "Best Use of ENSv2" ($7,000; "ENSv2 features should be central to the product, not a cosmetic add-on"; must run on mainnet or Sepolia) plus World; optional third: Whitechain "Operate" if checkout settles in USDT on Whitechain Sepolia (needs a real USDT payment and WHITECHAIN_FEEDBACK.md). No EF.
- **Difficulty:** medium (ENSv2 Sepolia deployment details and Enhanced Access Control roles).
- **Team fit:** medium to high.

### A5. Nonce Fence: one human event, one 7702 authorization (seasonal)

- **Pitch:** a signer service for agent wallets that produces an EIP-7702 authorization tuple (or a delegate change) only after a fresh Agent Pass approval bound to `(chain_id, delegate codehash, exact nonce)`, and never for a range of nonces.
- **Falsifiable promise:** "The 29 October Binance pattern (one pre-signed authorization per consecutive nonce, about 50 in all) cannot be produced: a request for nonces n to n+49 yields one signed tuple after one human approval and 49 refusals."
- **20 second demo:** a script replays the batch request; one approval; one tuple; 49 refusals logged; the single tuple delegates to an allowlisted, verified delegate; a request for an unverified delegate is refused even with approval.
- **How it meets each requirement:** R1 to R5 as in the common build; the protected action is signing by a key the agent never holds.
- **Why World's judges would pick it:** a timely headline (`track_ideas/00_season.md`, signal 1) and a clear "what breaks without a fresh human". **Judgement:** weaker than A1 or A2 for World, because to a judge it may read as "human approves a signature", the crowded Tokyo shape; strongest folded into A2 as a second protected action.
- **Closest past work:** maki (Cannes 2026 finalist, no World prize) checks every write before hardware approval ([maki](https://ethglobal.com/showcase/maki-564eg)); the Tripwire proposal in `reports/ETHGlobal finalist ideas 2023 to 2026.md` enforces intent at inclusion. The twist is nonce-exact binding as the refused property.
- **Stack options:** EF "Best CROPS App" only if keys stay on the user's device (passkey or Secure Enclave signer instead of a server key); otherwise none.
- **Difficulty:** medium. **Team fit:** high.

## 3. Track 2: Best Use of IDKit ($2,500, 2 x $1,250)

Verbatim requirements (Q1 to Q5) and "Won't place":

- Q1 "Integrate IDKit in a functioning application, mini app, or onchain flow."
- Q2 "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate."
- Q3 "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance."
- Q4 "Demonstrate a successful verification and one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user."
- Q5 "Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact."
- Won't place: "We are not rewarding the most credentials used." Rewarded: "the best decision about which credential is needed, why it is needed, and how it improves a real product experience."

**Common pattern (Judgement, from Placed, Pupille, Hands Unchained and ArcAsset [H §5]):** one credential; a README table "trust event, what could go wrong, why weaker credentials fail, why stronger ones over-collect"; the `signal` bound to the exact object (wallet, config hash, document); nullifier uniqueness enforced in a database or contract; a demo of the ineligible path; and a sentence on what the proof does not verify (Placed's habit).

### I1. Distinct Quorum: a 3-of-5 multisig that provably means three people (narrow World entry)

- **Pitch:** a Safe guard that binds every signer address to a distinct Proof of Human nullifier at enrollment, so a threshold counts humans, not keys; one person cannot hold two seats.
- **Falsifiable promise:** "One person enrolling a second signer key gets the same nullifier and is rejected; a transaction signed by three keys that belong to two humans does not execute."
- **20 second demo:** the treasurer tries to add their second laptop key as signer 4; IDKit returns the same nullifier; the guard refuses; a transaction with three signatures from two humans reverts in `checkTransaction`; with a third human it executes.
- **Trust event and credential choice (Q3):** the event is "adding a signer or executing a treasury transaction". What must be known is distinctness, not identity. Proof of Human is the minimum that gives distinctness; Selfie Check is "medium-assurance", which is not enough for a large treasury; Passport proves possession of a document, one person can hold several, and it over-collects. The `signal` is the signer address, so the proof cannot move to another key.
- **How it meets each requirement:** Q1 Safe, guard and web enrollment. Q2 onchain verification if a World ID 4.0 verifier exists on the target chain (Lortnoc Tahc used "the WorldIDVerifier contract on World Chain", [Lortnoc Tahc](https://ethglobal.com/showcase/lortnoc-tahc-49c6e)), else backend `POST /api/v4/verify/{rp_id}` plus a backend-signed enrollment the guard checks. Q4 duplicate human (rejected), cancellation, no Orb credential (cannot hold a seat; README explains why). Q5 debrief.
- **Why World's judges would pick it:** it is the cleanest "minimum sufficient assurance" argument about a product event whose failures are famous: WazirX in India (2024; `track_ideas/00_season.md`, signal 6) and Bybit (Feb 2025, about $1.5B through a compromised Safe front end; [The Block](https://www.theblock.co/post/343530/lazarus-appears-to-compromise-safe-developer-machine-in-lead-up-to-1-5-billion-bybit-hack-report)). Honest limit for the README: distinct humans do not stop a lying UI (Bybit's signers were real, distinct people); it stops one insider or one stolen laptop from being two seats.
- **Closest past work and the difference:** Clade Club (Istanbul 2023) and 0xPoll (Sydney 2024, Worldcoin Best Governance App) used World ID for one-human-one-vote governance ([0xPoll](https://ethglobal.com/showcase/0xpoll-4j05w)); no World entry in the window applied it to a wallet's signer set [H §5].
- **Stack options:** narrow. Optional EF "Best CROPS App" only with fully onchain verification and a CROPS README section, and with the EF Mandate's biometric-ID caution addressed (see `plans/C_private_invoicing_whitechain.md`). **Judgement:** best IDKit idea for this team.
- **Difficulty:** low to medium (Safe guard patterns are well known). **Team fit:** very high.

### I2. Same Human: recovery and 7702 delegate changes need the person who set up the account (stacks with EF)

- **Pitch:** a smart account (EIP-7702 delegate or ERC-4337) whose three dangerous actions (change delegate, add a withdrawal address, rotate the owner key) need a World ID proof whose nullifier equals the one recorded at setup, with the new configuration hash as `signal`; key-loss recovery uses the same proof plus a 48 hour delay the current key can cancel.
- **Falsifiable promise:** "Someone with the user's phone and private key still cannot change the delegate; the real user can recover the account with no server of ours running."
- **20 second demo:** the attacker (holding the key) calls `setDelegate` and it reverts; a different World ID proves fine but carries the wrong nullifier and reverts; the enrolled human proves, the change queues and the timer runs; the backend is switched off live and recovery still completes from the contract.
- **Trust event and credential choice (Q3):** "this is the same person who owns the account". Proof of Human with the same nullifier is the minimum; Passport proves holding a document, which a thief may also hold; Selfie Check could be enrolled by whoever holds the phone. Ineligible path: a user without an Orb credential falls back to social guardians, and the README says so.
- **How it meets each requirement:** Q1 onchain flow; Q2 onchain verification where available (else backend verification plus a signed attestation, stated); Q4 wrong human, cancellation, timelock cancelled by the current key; Q5 debrief.
- **Why World's judges would pick it:** "recovery or protection of an important account action" is in the IDKit text itself, and the Binance drain makes the delegate-change case current.
- **Closest past work and the difference:** Cache Coherence (Sydney 2024) recovered a lost-key 4337 wallet with World ID over CCIP and won Worldcoin "Best World ID Usage 2nd Prize" ([Cache Coherence](https://ethglobal.com/showcase/cache-coherence-1nq6z)). Twist: same-nullifier binding for 7702 delegate changes and withdrawal allowlists (protection, not only recovery), a cancellable delay, and no server in the recovery path.
- **Stack options:** EF "Best CROPS App" ($3,500; its list starts with "a wallet a user can fully recover with nothing from you: no server, API or relayer"); needs onchain verification and a CROPS README section. Optional Chainlink CCIP if verification happens on World Chain and the account lives elsewhere (Cache Coherence's architecture, so only if forced).
- **Difficulty:** medium to high (depends on onchain World ID 4.0 verification on the target chain; workshop question 4). **Team fit:** high.

### I3. Licence Gate: tokenized notes that only eligible investors can hold (stacks with Whitechain Tokenize)

- **Pitch:** a USDT-coupon note on Whitechain Sepolia whose transfer rule admits only wallets bound to an adult whose nationality matches the single jurisdiction the issuer is licensed for, checked with one Identity Check request; no names or documents are stored.
- **Falsifiable promise:** "A wallet that passed the check can buy and receive coupons; a transfer to any wallet that has not passed reverts, including on the secondary market, and an ineligible user cannot subscribe."
- **20 second demo:** an investor verifies, subscribes with USDT, receives a coupon; tries to sell to a fresh wallet, which reverts; a mocked user of another nationality sees "not eligible" and no tokens move.
- **Trust event and credential choice (Q3):** the event is "subscribing to or receiving a restricted security". Proof of Human says nothing about jurisdiction; full KYC over-collects for a check that needs two facts; Identity Check with `nationality` and `minimum_age` returns only `identity_attested` ([IDKit credentials](https://docs.world.org/world-id/idkit/credentials)). The wallet is the `signal`, so eligibility cannot be lent.
- **How it meets each requirement:** Q1 onchain flow on Whitechain; Q2 backend verification (no World verifier on Whitechain) plus a backend-signed eligibility record that the token checks on every transfer; Q4 ineligible user and unavailable credential; Q5 debrief.
- **Why World's judges would pick it:** Hands Unchained won Identity Check 1st with "one attribute requested, one value kept" ([Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3)); this applies the same minimisation to a regulated asset.
- **Risk:** Identity Check is a "preview", and the docs describe no exclusion lists, so a "not US" rule is not expressible; a positive single-country rule is. If Identity Check is not enabled at Mumbai, fall back to `passport` plus an `issuing_country` rule and state what that costs (workshop question 5). **Judgement:** nationality is not residency; the README must say that a real offering would need residency, which World does not attest.
- **Closest past work and the difference:** Seikyu (Tokyo, no World prize) sold invoices "to World ID-verified investors" ([Seikyu](https://ethglobal.com/showcase/seikyu-dyqh3)); explorador.pt (Lisbon finalist) used World ID for Portuguese residency ([explorador.pt](https://ethglobal.com/showcase/explorador-pt-35okq)). Neither enforced eligibility on every transfer. The Hundi proposal in `reports/ETHGlobal finalist ideas 2023 to 2026.md` names IDKit for an investor allowlist; Licence Gate is the stricter transfer-time version.
- **Stack options:** Whitechain "Tokenize" ($4,000; USDT payment on Whitechain Sepolia, explorer link, WHITECHAIN_FEEDBACK.md, a video showing each party) plus World; optionally Uniswap CCA for the primary sale (adds scope).
- **Difficulty:** medium. **Team fit:** high (transfer-restricted tokens are standard audit material).

### I4. Rescue Gas: free gas for drained-wallet victims that farmers cannot drain (Selfie Check)

- **Pitch:** victims whose keys leaked (a sweeper bot takes any ETH sent in) need someone to pay gas for one bundle that pulls out their remaining tokens; Rescue Gas sponsors one rescue per person, using Selfie Check because the benefit is small and most victims have no Orb access.
- **Falsifiable promise:** "A compromised wallet with zero ETH rescues its tokens in one sponsored transaction and the sweeper gets nothing; a second rescue by the same face is refused; a low Sybil score goes to manual review instead of auto-approval."
- **20 second demo:** a fork with a live sweeper script; ETH sent the normal way is swept in one block; the rescue bundle (sponsor pays gas, tokens move to a safe address) lands with nothing swept; the same person asks again and is refused.
- **Trust event and credential choice (Q3):** the scarce benefit is a few dollars of gas; Proof of Human would exclude most victims; Passport over-collects; Selfie Check ("medium-assurance") is proportionate, and its `sybil_score` sets auto-approve versus review.
- **How it meets each requirement:** Q1 web app plus relayer; Q2 backend verification; Q4 low score, cancellation, used nullifier; Q5 debrief, including the Sybil score's usefulness (World asked for exactly that feedback at Lisbon [H §2.6]).
- **Why World's judges would pick it:** World ran Selfie Check tracks at Lisbon and ETHOnline asking where "a low-friction, low-assurance biometric credential is useful"; its winners argued why low assurance was enough (ArcAsset, Creance) [H §3.2]. This is a security-native example.
- **Closest past work:** none among World winners. The Lastgas proposal in `reports/ETHGlobal finalist ideas 2023 to 2026.md` (a zero-ETH loan rescue on the alt mempool) is related; Rescue Gas differs in user (victims) and adds the World gate.
- **Stack options:** EF "Frame Transaction Alternative Mempool" if the sponsored rescue is a frame transaction with a sponsor frame on the EF devnet (heavier); otherwise none.
- **Difficulty:** medium (private bundle submission on a testnet or fork is the risk). **Team fit:** high.

### I5. Warden One: one human, one warden in audit contests (narrow World entry)

- **Pitch:** an audit-contest module where each warden account is bound to one Proof of Human nullifier, so one auditor cannot file the same finding from three accounts to farm the duplicate split, and the platform learns nothing else about them.
- **Falsifiable promise:** "Three accounts run by one person submit the same high; only one is eligible for payout, and the pot split for honest wardens is recomputed live."
- **20 second demo:** leaderboard before and after: the farmer's three duplicate entries collapse into one, and the honest warden's share rises from 25% to 50%.
- **Trust event and credential choice (Q3):** the event is "a finding becomes eligible for payout". The question is "how many accounts does this person run", so uniqueness is enough; Passport or KYC would expose identities many auditors keep pseudonymous; Selfie Check is too weak for payouts of thousands of dollars.
- **How it meets each requirement:** Q1 web app; Q2 backend verification with `UNIQUE (nullifier, action)`; Q4 duplicate human, cancellation, no Orb credential (can compete unpaid); Q5 debrief.
- **Why World's judges would pick it:** a clean scarce-benefit story in a niche the judges have not seen, told by people who live it. **Judgement:** lower WOW than I1 and close in shape to the "one human, one entry" drops that lost at Tokyo, so the live payout recomputation must carry it.
- **Closest past work and the difference:** ScalpLess and Tenjō (Tokyo) gated drops and ballots ([ScalpLess](https://ethglobal.com/showcase/scalpless-15fnr)); Void Tactics (NY 2026, Continuity) gated tournament brackets ([Void Tactics](https://ethglobal.com/showcase/void-tactics-ag25f)). Warden One changes payouts in a competition where duplicates are the core economic attack.
- **Stack options:** narrow.
- **Difficulty:** low. **Team fit:** high on domain, low on technical depth.

## 4. Track combo pass (Judgement)

### 4.1 Coverage check against the brief

| Track | Stacks with another sponsor | Narrow, World judges only |
|---|---|---|
| World ID Agent Pass | A1 Breakglass (Uniswap, optional Chainlink CRE), A4 Payee Lock (ENS, optional Whitechain Operate) | A2 Upgrade Pass, A3 Slopstop |
| Best Use of IDKit | I2 Same Human (EF CROPS App), I3 Licence Gate (Whitechain Tokenize) | I1 Distinct Quorum, I5 Warden One |

A5 and I4 are seasonal or experimental. None of the ten needs existing project code, and none enters a Continuity track.

### 4.2 One project, both World tracks (one partner slot)

Both World tracks count as one partner ([Mumbai event page](https://ethglobal.com/events/mumbai)), so a project that genuinely needs both a persistent "who" and a fresh "now" can enter both for one slot. The IDKit README must still argue a single credential for its own event.

| Combined build | Agent Pass event | IDKit event and single credential | Why it is coherent |
|---|---|---|---|
| A1 + I1 "Breakglass Council" | Fresh, specific guardian approves unpause | Guardian enrollment needs distinct Proof of Human, so the council of 3 is 3 people | Distinctness at enrollment, presence at action; two different trust events |
| A2 + I1 "Upgrade Council" | Fresh approval bound to codehash | Upgrade signers enroll with distinct Proof of Human | Same as above, for upgrades |
| A4 + I3 | Owner approves payout change | Buyer eligibility for a restricted product | **Judgement:** weak; two unrelated stories in one demo. Avoid |

### 4.3 Cross-sponsor stacks within the 3-partner cap

| Idea | Partner 1 | Partner 2 | Partner 3 | EF (at most one) | Extra files | Verdict |
|---|---|---|---|---|---|---|
| A1 (+ I1) | World (both tracks) | Uniswap "Build with Uniswap" ($10,000) | Chainlink CRE ($1,500) or none | none | WORLD_DEBRIEF.md, FEEDBACK.md and form | Best money and finalist fit |
| A2 (+ I1) | World | none | none | CROPS App only in hard mode | WORLD_DEBRIEF.md | Narrow, deepest for this team |
| A4 | World | ENS "Best Use of ENSv2" ($7,000) | Whitechain Operate (optional) | none | WORLD_DEBRIEF.md, WHITECHAIN_FEEDBACK.md | Good ENS fit |
| I2 | World | Chainlink CCIP (only if forced) | none | CROPS App | CROPS section | Depends on onchain verifier |
| I3 | World | Whitechain Tokenize ($4,000) | Uniswap CCA (optional) | none | WHITECHAIN_FEEDBACK.md, FEEDBACK.md | Good RWA story; depends on Identity Check |
| I4 | World | none | none | Frame Tx Alt Mempool | devnet notes | Experimental |

- **Do not combine** World with EF Anon-RPC, or with the alt mempool as the core story, unless the identity step is clearly separate from the private path: an identity gate cuts against those prizes' story (`plans/A_verified_anon_reads.md` and `plans/D_alt_mempool.md` both skipped World for this reason; plans B, C and E also skipped IDKit because "No credential is needed").
- **With existing plans:** none of plans A to E uses World. A2 Upgrade Pass could sit beside plan E (verified frontend) as a second "verify what you sign" artefact, but should be its own fresh repo.

### 4.4 Ranking

| Rank | Idea | Track(s) | Best stack | Why |
|---|---|---|---|---|
| 1 | A1 Breakglass (+ I1 enrollment) | Agent Pass and IDKit | World + Uniswap (+ CRE) | New authority model, live attack demo, central integration for two sponsors |
| 2 | I1 Distinct Quorum | IDKit | World only | Cleanest "minimum sufficient assurance" argument; low build risk |
| 3 | A2 Upgrade Pass (A5 folded in) | Agent Pass (+ IDKit via I1) | World only | Deep, team-native, finalist-grade refusal on stage |
| 4 | I2 Same Human | IDKit | World + EF CROPS | Strong if an onchain 4.0 verifier is confirmed |
| 5 | I3 Licence Gate | IDKit | World + Whitechain Tokenize | Good money stack; depends on Identity Check |
| 6 | A4 Payee Lock | Agent Pass | World + ENS (+ Whitechain Operate) | Good ENS fit, medium World novelty |
| 7 | I4 Rescue Gas | IDKit | World (+ EF alt mempool) | Original, risky plumbing |
| 8 | A3 Slopstop | Agent Pass | World only | Real problem, thin Solidity |
| 9 | I5 Warden One | IDKit | World only | Easy, close to crowded patterns |

## 5. Workshop questions for World (Thu 5 Nov 17:30 to 18:00 IST, Workshop Room 1)

It clashes with the 1inch Aqua workshop (17:30, Room 2), so one teammate goes to each ([event page](https://ethglobal.com/events/mumbai)). Questions the docs answered on 2026-10-31 were removed: the device flow ignores `max_age` and `prompt` but enforces essential `acr` with `access_denied` ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop); [step-up guide](https://auth.world.org/docs/guides/step-up)).

1. Is `https://auth.world.org` itself the mocked-proof environment for Mumbai, or is there an event issuer like Tokyo's `sandbox.auth.world.org`? Do mocked identities return `acr` `orb-face` and honour an essential `claims` request? (All A ideas.)
2. Does requesting `claims.id_token.sub` work in the device flow as well as the code flow? (A1 and A3 wrong-human paths.)
3. Is the pairwise `sub` stable for the same mocked human across days and across two client registrations of one team? (A3 bans, A1 roster.)
4. Which chains have a World ID 4.0 verifier contract today (World Chain, Ethereum Sepolia, Base Sepolia), at what address, and does it accept staging or simulator proofs? (I1, I2.)
5. Is Identity Check enabled for Mumbai teams, and is `nationality` checked against one value per request? (I3.)
6. What is the range and meaning of Selfie Check's `sybil_score`, and do simulator proofs return one? (I4.)
7. Would also verifying the ID token's RS256 signature onchain count toward "Validate identity results in a secure backend", or confuse judges? (A2 hard mode.)
8. Can one project win both Agent Pass and Best Use of IDKit? Is there a required file name or location for the debrief?
9. Does World's MCP server support the RFC 9470 challenge today, and would an MCP gate built on it count as "the protected application or agent action"? (A3.)
10. Of Tokyo's agent entries, what separated Airlock, Surety and Lifeline from the many correct payment-approval entries such as Axis, in the judges' own words?

## 6. Sources

- [Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world); [Tokyo 2026 World prizes](https://ethglobal.com/events/tokyo2026/prizes/world); [Lisbon 2026 World prizes](https://ethglobal.com/events/lisbon2026/prizes/world); [Mumbai event page](https://ethglobal.com/events/mumbai)
- [Agent Pass docs](https://auth.world.org/docs); [OIDC guide](https://auth.world.org/docs/guides/oidc); [step-up guide](https://auth.world.org/docs/guides/step-up); [human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop)
- [IDKit integrate](https://docs.world.org/world-id/idkit/integrate); [IDKit credentials](https://docs.world.org/world-id/idkit/credentials)
- Showcase pages cited inline; full winner lists and comparisons in `track_ideas/history/world.md`.
- [BleepingComputer on curl's bounty](https://bleepingcomputer.com/news/security/curl-ending-bug-bounty-program-after-flood-of-ai-slop-reports/); [Hackaday, 26 Jan 2026](https://hackaday.com/2026/01/26/the-curl-project-drops-bug-bounties-due-to-ai-slop); [The Block on Bybit](https://www.theblock.co/post/343530/lazarus-appears-to-compromise-safe-developer-machine-in-lead-up-to-1-5-billion-bybit-hack-report)
