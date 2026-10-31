# World: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: World's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only (IDKit 4.x, an OIDC client library, viem, Foundry, Safe contracts).

In scope (fresh, category `building-from-scratch`):

1. **World ID Agent Pass**: $5,000 USDC (1st $2,500, 2nd $1,500, 3rd $1,000).
2. **Best Use of IDKit**: $2,500 USDC (2 x $1,250).

Out of scope: the Continuity "World ID Agent Pass" ($2,500) and "[Cont] Best IDKit Use Case" ($2,500), both Continuity only. ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria, fetched 2026-10-31), `track_ideas/history/world.md` (dossier, cited as [H]), `track_ideas/ideas_draft/world.md` (draft, cited as [D]), `track_ideas/00_season.md` (season brief), the other sponsors' judged files in `track_ideas/ideas/`, and `plans/`. ETHGlobal pages were not re-fetched: the 31 Oct snapshot already holds the World text verbatim. On 2026-10-31 two World docs pages were re-read (IDKit integrate and IDKit onchain verification); no bot check was met there. The Agent Pass guides were re-read by the dossier the same day and are cited from it.

---

## 1. What World's judges reward

### Sourced facts

- Both Mumbai fresh tracks are near-copies of Tokyo 2026 (25 to 27 Sep). Tokyo's "Best Use of World ID for Agents" became "World ID Agent Pass" with the same five qualifications (only the product name, the issuer and the "dev environment" line changed), and "Best Use of IDKit" is word for word the same. Money fell from $7,500 to $5,000 (Agent Pass) and from $5,000 to $2,500 (IDKit) ([Tokyo 2026 World prizes](https://ethglobal.com/events/tokyo2026/prizes/world); [Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world); [H] sections 2.8, 2.9, 7).
- Agent Pass "Strong submissions" sentence, verbatim: "Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product." and "We are especially interested in agentic products, but any compelling use case is eligible." The page also says "We are mocking proofs now, so you don't need sandbox app anymore" and "Proofs are using fake identities, DO NOT rely in them for production" ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- IDKit judging sentence, verbatim: "We are not rewarding the most credentials used. We are rewarding the best decision about which credential is needed, why it is needed, and how it improves a real product experience." It names "Proof of Human, Passport/NFC, or Selfie Check (Now live with Sybil score)" and lists "fair access to a scarce benefit, a privacy-preserving eligibility check, recovery or protection of an important account action, or a workflow that becomes safer or simpler" (same page).
- Tokyo Agent winners: [Airlock](https://ethglobal.com/showcase/airlock-ph6bx) (approval "bound to the payload's hash"; "The OIDC nonce is a hash of the approval id and payloadHash"), [Surety](https://ethglobal.com/showcase/surety-ms4gx) (claim paid only after "a fresh World ID for Agents check, bound to the same human who bought the policy"; "135 Foundry tests"; a live prompt-injection attack), [Lifeline](https://ethglobal.com/showcase/lifeline-mygz6) ("the debt goes to the human, not the agent") ([H] 3.1).
- Tokyo Agent non-winners that met the qualifications: [Axis](https://ethglobal.com/showcase/axis-ybtp8) ("bound to a single proposal and can only be used once ... recent (≤ 120s) ... same verified human ... matched on World ID's pairwise subject"), DSAP Protocol, x402 Interlock, hanko, JPYC EC Agents, Human Gate, Proviso and others, nearly all "an agent spends, a human approves above a limit" ([H] 4.1).
- Tokyo IDKit winners: [Pupille](https://ethglobal.com/showcase/pupille-2o0q0) (proof signal commits to "the user's pseudonymous handle and device public key"; "Editing one pixel ... causes verification to fail") and [Placed](https://ethglobal.com/showcase/placed-eijhx) (proofs bound to wallets in an ad auction; "It verifies participant uniqueness, not asset ownership or fulfillment"). Non-winners included ScalpLess, Tenjō, GomiGo, Haulie, Basecamp Pass, CryptoWill ([H] 4.1).
- Credential-beta winners argued minimum assurance: [HORS](https://ethglobal.com/showcase/hors-9j0w8) ("not used as generic login, reputation, or KYC"), [Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h) ("deliberately not all or nothing"), [Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3) ("one attribute requested, one value kept"), [ArcAsset](https://ethglobal.com/showcase/arcasset-av1gr) ("Selfie Check gates issuance and nothing else"), [Creance](https://ethglobal.com/showcase/creance-egdz5) (fresh check at claim compared with the nullifier captured at purchase) ([H] 4.2).
- World retires winning patterns: Lisbon 2026's AgentKit track said projects "that reuse patterns from prior hackathons without a genuinely new workflow, vertical, or trust model" will not qualify, naming "Agent reputation", "Human-backed agent interactions in simple content generation use cases" and "Human-backed benefits for AI agents (i. e API calls,discounts)" ([Lisbon 2026 World prizes](https://ethglobal.com/events/lisbon2026/prizes/world)). The Mumbai page has no such list.
- Robots have won World prizes twice in 2026: [pinch](https://ethglobal.com/showcase/pinch-fvnm7) (NY Track B 1st) and [Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3) (Lisbon Identity Check 1st) ([H] 3.3, 3.4).
- India precedent: at New Delhi 2025, World's 1st went to a DeFi build ([FlashArb](https://ethglobal.com/showcase/flasharb-r239w), Uniswap v4 hooks plus World ID rate limiting) ([H] 4.4).
- Field size at Tokyo: 37 of 254 listed projects mentioned World ID, IDKit, World App or human-backed agents in the tagline; 6 carry a World badge (5 fresh) ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026); [H] 4).
- No World-tagged project in the saved listings from 2023 to Tokyo 2026 gated a contract upgrade, a multisig signer set, a bug bounty intake or a pause and unpause ratchet ([H] 5, point 7).
- Workshop: Thu 5 Nov 17:30 to 18:00 IST, Workshop Room 1, "World Workshop", no speaker listed, status "proposal"; it clashes with 1inch Aqua (17:30, Room 2) ([event page](https://ethglobal.com/events/mumbai)).

### Judgement: what these judges will reward (ranked)

1. **The human step creates, settles or unlocks something an attacker wants, and the build shows the attacker failing.** Tokyo's winners made a fresh check the hinge of a claim, a debt or a consent; Surety put a live attack on screen. "Human approves above a threshold" lost nine times at Tokyo even when correct.
2. **Binding that a judge can read.** The README names the exact bound object (call hash, code hash, signer address, claim address) and the video shows a mismatch failing.
3. **One credential, argued.** For IDKit, a table of "what goes wrong with a weaker credential, what is over-collected with a stronger one" and one honest sentence on what the proof does not verify.
4. **Rigour signals.** Foundry tests and fuzz invariants with counts in the README, runs against the real issuer, a security council or auditor's tone. This is where a security team is strongest.
5. **Use the product the way World now pitches it**: Agent Pass as an OIDC step-up issuer (`max_age=0`, essential `acr`, a requested `sub`, the RFC 8628 device flow for headless agents), and Selfie Check's new Sybil score where low assurance is enough. World's bank-suite launch (18 Oct) suggests enterprise controls fit the current story ([The Block, 18 Oct 2026](https://www.theblock.co/news/ecosystems/2026-10-18-world-launches-world-id-suite-banks-418869)).
6. **A precise debrief.** Both tracks require it and pools are smaller; it is cheap points and World reads it.
7. **Not rewarded:** a login screen; one human, one entry drops and raffles with nothing new; agent spending caps with a human approval above the cap; benefits or discounts for human-backed agents; several credentials stacked.

### Judgement: the obvious entries we assume several teams will submit

Agent Pass:
- An agent wallet or shopping agent whose payments above a limit need a fresh World approval (the Axis, DSAP and Arc "Ask Me First" shape).
- An MCP or API gateway that challenges agents for a human approval (Human Gate, Airlock clones).
- "Agent posts to X or sends email only after the human approves."
- Agent insurance or credit, copied from Surety and Lifeline.

IDKit:
- One human, one ticket for Devcon side events, a raffle or a drop (ScalpLess, Tenjō clones).
- A World ID gated token launch or CCA (a Kura copy; our own Uniswap file lists Humancap here).
- Sybil-resistant airdrop or faucet; one-human-one-vote polls; reviews by verified humans.
- Age or nationality gates with Identity Check; UPI or Aadhaar flavoured eligibility for the Mumbai crowd.

Each final idea below must beat all of these on at least one property a judge can check.

---

## 2. Rubrics used (Judgement)

Neither track has numeric criteria. The criteria are taken from each track's "Strong submissions" or "We are rewarding" sentence and its qualifications; the debrief is pass or fail.

**World ID Agent Pass**

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| H | Meaningful action that needs a human approval layer, not a login | "a meaningful action that needs a human identity or approval layer, not simply a login screen" | 20% |
| AG | Agentic product | "We are especially interested in agentic products" | 10% |
| J | Complete journey and a failed path, shown | "Demonstrate the complete journey ..."; "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur." | 10% |
| B | Secure backend validation and binding to the action | "Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization." | 10% |
| Nov | Novelty versus past World winners and the expected Mumbai field | Task | 25% |
| Fea | Feasibility in 36 hours for this team | Task | 25% |

**Best Use of IDKit**

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| T | A real trust moment | "solve a real trust moment: an event where a product needs to know something meaningful about a person" | 15% |
| P | Proportionate credential, minimum sufficient assurance | "the best decision about which credential is needed, why it is needed"; "why the chosen credential is the minimum sufficient assurance" | 20% |
| X | Improves a real product experience | "how it improves a real product experience" | 15% |
| Alt | Success plus one meaningful alternative path | "Demonstrate a successful verification and one meaningful alternative path" | 5% |
| Nov | Novelty | Task | 25% |
| Fea | Feasibility | Task | 20% |

Overall = weighted sum, rounded to one decimal (half up).

**Qualification checks applied to every idea** (sources: [Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world); [details page](https://ethglobal.com/events/mumbai/info/details)):

- Agent Pass R1 "Integrate with the official World ID Agent Pass."; R2 complete journey; R3 failed path; R4 secure backend validation, no client secrets exposed; R5 integration debrief ("time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact"). Won't place: "not simply a login screen added to an existing product".
- IDKit Q1 "Integrate IDKit in a functioning application, mini app, or onchain flow."; Q2 at least one supported credential, verified "on the server or onchain as appropriate"; Q3 the trust event and "why the chosen credential is the minimum sufficient assurance"; Q4 success plus one alternative path; Q5 debrief. Won't place: "We are not rewarding the most credentials used."
- ETHGlobal: all code after Thu 5 Nov 21:00 IST; steady commits ("Submissions with large single commits or missing histories may be disqualified"); AI use attributed and any spec files committed; video 2 to 4 minutes, human voice, no AI voiceover.
- Fresh build: none of the ideas below depends on pre-existing project code. Plans A to E in `plans/` do not use World, and nothing here reuses them.

---

## 3. Facts re-checked on 2026-10-31 that change the ideas

- **Onchain v4 verification exists, but only on World Chain and Arc.** "For v4 uniqueness proofs, call `verify(...)` on the `WorldIDVerifier` or `WorldIDSatellite` proxy"; `WorldIDVerifier` production on World Chain at `0x00000000009E00F9FE82CfeeBB4556686da094d7`, staging on World Chain at `0x703a6316c975DEabF30b637c155edD53e24657DB`, and a production `WorldIDSatellite` on Arc at `0x304E14e4dC0508C0927e3b307a2C18422C07E394`. The action must be hashed with `hash_to_field`, "not a raw keccak hash". Legacy v3 `WorldIDRouter` addresses exist on Ethereum, Base, Optimism and World Chain testnets. The page does not say whether simulator proofs verify against the staging verifier, nor which World Chain network the staging address is on ([IDKit onchain verification](https://docs.world.org/world-id/idkit/onchain-verification)). **Consequence (Judgement):** Distinct Quorum, Same Human and Small Holders First can verify onchain if they live on World Chain; on Ethereum Sepolia or Base Sepolia they fall back to backend verification plus a backend-signed attestation, which the README must state. This is workshop question 3.
- **Backend verification path.** "forward it directly to `POST https://developer.world.org/api/v4/verify/{rp_id}`", "Forward the IDKit result payload as-is", "your backend must check that the nullifier hasn't been used before"; the `signal` binds context and "Your backend should enforce the same value"; packages `@worldcoin/idkit-core` and `@worldcoin/idkit`, "Use the latest `4.x` version"; simulator testing uses `staging` ([IDKit integrate](https://docs.world.org/world-id/idkit/integrate)).
- **Agent Pass mechanics** (from the dossier's re-read of the same day, [H] 2.10): `max_age=0` or `prompt=login` forces a new proof; an essential `claims` request enforces an `acr` class, and an unmet one fails with `unmet_authentication_requirements` (code flow) or `access_denied` (device flow, "never a downgraded token"); a requested `claims.id_token.sub` that does not match "ends the request with `access_denied`"; the device flow "already requires fresh authentication and explicit approval. It does not implement `max_age` or `prompt`"; the `device_code` "expires 20 minutes after creation and can be redeemed once"; "The World ID issuer does not receive, display, or approve the pending business action"; "Do not send the ID token from the World ID issuer directly to a downstream MCP server" ([step-up guide](https://auth.world.org/docs/guides/step-up); [human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop); [OIDC guide](https://auth.world.org/docs/guides/oidc)).
- **Judgement on the device flow and R4:** the token endpoint is called with the client secret, so the device authorization must be started and polled by our backend, not by the agent's CLI. The agent only receives the `user_code` and verification link from our API. Any idea that lets the agent hold the client secret fails R4.
- **Judgement on binding:** because the issuer never sees the action, our page must show the action before redirecting, and the `nonce` (code flow) or the server record keyed by `device_code` (device flow) must commit to a hash of that exact action. The contract must then trust only a backend EIP-712 signature over the same hash.

---

## 4. Vetting the ten draft ideas

### 4.1 World ID Agent Pass drafts

| Draft idea [D] | H | AG | J | B | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| A1 Breakglass (agent pauses, only the guardian unpauses; Uniswap hook) | 9 | 8 | 9 | 9 | 7 | 6 | 7.7 | None formal. A pause flag in `beforeSwap` is thin for Uniswap's "central" test (our Uniswap file has no pause idea for that reason); the mainnet-fork exploit replay is the schedule risk; "risk up" was decided by selector, so a cap setter that rounds up could slip through | **Revise**: risk direction checked onchain from old versus new values, a planted bug on Sepolia instead of a fork replay, Uniswap optional only |
| A2 Upgrade Pass (only a person can upgrade a live proxy) | 9 | 7 | 9 | 9 | 9 | 6 | 8.1 | None formal. "Hard mode" (RS256 onchain) costs a day and puts the pairwise `sub` onchain; the draft let the backend read the layout "from build artifacts", which the agent supplies | **Revise**: backend recompiles the submitted source and checks it against `extcodehash`, folds A5's 7702 delegate change in as a second protected action, drops hard mode |
| A3 Slopstop (bug reports need a human of record; per-human quota) | 6 | 8 | 8 | 8 | 5 | 8 | 6.9 | Not a Mumbai rule, but the per-human quota is the Lisbon "Human-backed benefits ... API calls" pattern and its bans drift toward "Agent reputation"; nothing is settled by the human step | **Drop**, replaced by Owed (same domain, the human step now settles an obligation on both sides) |
| A4 Payee Lock (agent runs a merchant's ENS name; `addr` changes need the owner) | 8 | 8 | 9 | 8 | 5 | 6 | 6.9 | None formal. Close to Proviso (Tokyo, no prize: "bound by rules on ENSv2 and World ID approvals") and to our ENS file's Quarantine; the Whitechain third slot was unrelated to the story | **Revise** into Name Lock: protect the records that redirect money or users (`addr`, coin addresses and `contenthash`), drop Whitechain |
| A5 Nonce Fence (one approval, one 7702 authorization) | 7 | 3 | 8 | 8 | 6 | 7 | 6.6 | No agent; reads as "a human approves a signature", the crowded Tokyo shape | **Drop**, folded into Upgrade Pass; replaced by Two-Key Rover (from our 0G file, robots have won World twice) |

### 4.2 Best Use of IDKit drafts

| Draft idea [D] | T | P | X | Alt | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| I1 Distinct Quorum (a Safe whose signers are distinct humans) | 9 | 9 | 7 | 9 | 8 | 7 | 8.1 | None. The onchain path was open; it is now confirmed on World Chain | **Keep** (one fix: deploy on World Chain, verify onchain, per-Safe action) |
| I2 Same Human (recovery and delegate changes need the setup nullifier) | 9 | 7 | 7 | 8 | 6 | 5 | 6.7 | The promise "someone with the user's phone and private key still cannot" is false: the World ID lives in World App on that phone. Cache Coherence (Sydney 2024) already won recovery with World ID | **Revise**: promise narrowed to "key alone"; protection before recovery; World Chain onchain verification |
| I3 Licence Gate (Identity Check nationality gate on a Whitechain note) | 7 | 4 | 6 | 8 | 5 | 5 | 5.4 | **Q3 fails**: the draft itself says "nationality is not residency", so the credential is not sufficient for the securities rule it claims to enforce. Identity Check is a preview and is not named in the Mumbai text. Seikyu (Tokyo, no prize) did the same shape | **Drop**, replaced by Small Holders First |
| I4 Rescue Gas (Selfie Check for one sponsored rescue per victim) | 8 | 9 | 7 | 8 | 9 | 5 | 7.7 | None formal. "Private bundle submission" was the risk and was not designed; the draft did not say that the attacker also holds the key | **Revise**: one EIP-7702 sponsored transaction (no ETH ever reaches the victim), honest limit stated, Sybil score used for review |
| I5 Warden One (one human, one warden in audit contests) | 7 | 8 | 5 | 8 | 4 | 9 | 6.6 | None formal. "One human, one entry", the shape that lost at Tokyo | **Revise**: per-contest action so auditors stay unlinkable across contests; lead with the payout recomputation |

---

## 5. Track 1: World ID Agent Pass ($5,000)

### 5.1 Final ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Upgrade Pass: agents can ship, only a named person can change code that holds money | 8.4 | Revise (done below) | World (both tracks with the Council option); Foundry, Hono, OIDC client, Sepolia |
| 2 | Breakglass: the agent may only make things safer | 8.2 | Revise (done below) | World (+ IDKit council); Uniswap optional and weak |
| 3 | Owed: a bug bounty where only a human can say no, and only the finder can get paid | 7.9 | New (replaces Slopstop) | World only (finalist track separately) |
| 4 | Name Lock: an agent runs your ENS name, only you can change where money or users go | 7.4 | Revise (from Payee Lock) | World + ENS "Best Use of ENSv2" |
| 5 | Two-Key Rover: restricted zones need a named supervisor, fresh | 7.3 | New (replaces Nonce Fence) | World + 0G "Physical AI: Agents with a Body" |

### 5.2 Common build for all five (Judgement)

- Backend (Hono on Node) is a confidential OIDC client of `https://auth.world.org`. Browser approvals use the authorization code flow with PKCE, `max_age=0` and an essential `claims` request (`acr` class and, where a named human is needed, `sub`). Headless agents get a `user_code` and link from our API; our backend starts the device authorization and polls the token endpoint with its secret.
- Action binding: our approval page renders the action from our own database (never from what the agent says), and the `nonce` is `keccak256(approvalId, actionHash)`; in the device flow the backend keys the pending action by `device_code`. On success the backend checks `iss`, `aud`, `nonce`, `auth_time`, `acr` and `sub` against World's JWKS and signs an EIP-712 `HumanApproval{actionHash, approver, expiry, nonce}` that the contract verifies once.
- Foundry tests for replay, expiry, wrong action hash, wrong approver and a forged signature; the counts go in the README.
- `WORLD_DEBRIEF.md` from hour one, with timestamps for "time to first success" and each friction point as it happens.
- Video: the request, the human completing it, the validated result, the protected action landing, and at least two failed paths with the action not happening, all in the first 90 seconds.

### 5.3 Rank 1. Upgrade Pass: agents can ship, only a named person can change code that holds money

**Pitch.** An AI coding agent keeps full deploy rights for new contracts and testnets, but the upgrade role on live proxies (and, optionally, the 7702 delegate of the treasury hot wallet) belongs to a gate contract. The gate executes an upgrade only with a fresh Agent Pass approval from a named engineer, bound to the new implementation's code hash, and the engineer approves an "upgrade card" that our backend computed from chain and from its own compilation, not from the agent's description.

**Falsifiable promise.** "The agent holds the deployer key and still cannot upgrade the vault proxy. After the named engineer approves, the upgrade lands; an approval for implementation A cannot install implementation B, a different person's approval ends in `access_denied`, and an expired device code leaves the proxy unchanged."

**Demo moment (20 seconds).** In a terminal, the agent runs `forge script Upgrade` against the Sepolia vault proxy; the call to the gate returns a challenge and the CLI prints a code and link. The engineer's phone shows World's prompt; the laptop shows our upgrade card: "VaultV2, codehash 0x12..., storage: `feeBps` inserted at slot 5 before `owner` (collision), new external function `sweep(address)`". The engineer denies; the proxy is unchanged. A prompt-injected instruction in a "release note" makes the agent retry with a build that hides `sweep` behind a different name; the card shows it again. A clean build is approved and lands. Then the old approval is replayed with a tampered implementation and reverts with `CodehashMismatch`.

**How it works.**
- `UpgradeGate.sol` owns the `ProxyAdmin` (transparent proxies) or holds the UUPS upgrade role. It accepts `upgrade(proxy, impl, data, approval)` only with a backend EIP-712 signature over `(proxy, impl, impl.codehash, keccak256(data), expiry, nonce)` and re-checks `impl.codehash` at execution.
- Upgrade witness (backend): the agent submits source and compiler settings; the backend compiles with pinned `solc` through Forge, checks the runtime bytecode against `extcodehash(impl)` (immutables masked), computes the storage layout diff against the current implementation's verified layout, and lists new external selectors and any `delegatecall` or `selfdestruct` in the new code. The card is stored server side and its hash is the `actionHash`.
- Optional second protected action: an EIP-7702 delegate change for the protocol's hot wallet, approved the same way and bound to `(chainId, delegate codehash, exact nonce)`; a request covering a range of nonces is refused (the Binance pattern: "50 EIP-7702 authorizations signed by the hot wallet for 50 consecutive nonces", [TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). Only if hours allow.
- Foundry: unit tests for each failed path, and a fuzz test that no sequence of agent calls changes the implementation slot without a valid approval.

```solidity
interface IUpgradeGate {
    error CodehashMismatch(address impl, bytes32 expected, bytes32 actual);
    error ApprovalExpired(uint256 expiry);
    error ApprovalUsed(bytes32 approvalId);
    error BadApprover(address signer);
    struct HumanApproval {
        address proxy;
        address impl;
        bytes32 implCodehash;
        bytes32 dataHash;
        uint64 expiry;
        bytes32 approvalId;
    }
    function upgrade(address proxy, address impl, bytes calldata data, HumanApproval calldata a, bytes calldata sig) external;
}
```

**Requirement checklist.**
- [x] R1: Agent Pass device flow is the only route to the upgrade role (the agent is headless, which is what the device flow is for).
- [x] R2: request (gate challenge from the CLI), completion (World App), validated result (ID token checked, `sub` matches the roster), protected action (the upgrade transaction).
- [x] R3: denial, expiry (20 minute device code), wrong human (`access_denied` from the requested `sub`), and a tampered implementation, each with the proxy unchanged.
- [x] R4: confidential client; the backend starts and polls the device flow; the contract trusts only the backend signature; the card comes from chain and our own compile.
- [x] R5: `WORLD_DEBRIEF.md`, including the README note that the device flow ignores `max_age` but "already requires fresh authentication".
- [x] Not a login screen: there is no login; the human step is a role in the upgrade path. Fresh build; public libraries only.
- [ ] Risk: whether a requested `sub` works in the device flow with mocked identities (question 2). Fallback: code flow on the engineer's laptop with the CLI waiting.

**Why it beats rivals (Judgement).** It is the "agent does X, human approves Y" shape done where it matters most in 2026: DefiLlama classes Drift's $295M loss on 1 Apr 2026 as a "proxy upgrade hijack" ([DefiLlama hacks](https://defillama.com/hacks); `00_season.md` 1.1). No World entry in the window has gated an upgrade [H] 5. The upgrade card is what separates it from Axis-style approvals: the human sees facts the agent cannot forge, and the video shows a storage collision caught by a person.

**Closest prior winners.**
- [Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h), Lisbon 2026 Selfie Check 2nd: a human check before an agent's git commit is signed. Upgrade Pass moves the human to the transaction that changes live money-holding code and binds the approval to bytecode.
- [Airlock](https://ethglobal.com/showcase/airlock-ph6bx), Tokyo 2026: approval bound to a payload hash. Same binding discipline, different object.
- Non-winner contrast: [Axis](https://ethglobal.com/showcase/axis-ybtp8) (Tokyo): correct binding, crowded action.

**Stack.** Solidity and Foundry (OpenZeppelin proxies) on Ethereum Sepolia; Hono backend with an OIDC client (`openid-client`) and viem; a small React page for the card. Partner prizes: World (Agent Pass; add IDKit through the Council option in section 7). No EF prize: a backend signer weakens the "C" in CROPS.

**Difficulty.** Medium. Gate and tests about 8 hours; witness (compile, compare, layout diff) about 10; OIDC and device flow about 6; card UI and video the rest.

**Scores.**

| H | AG | J | B | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 9 | 9 | 9 | 7 | **8.4** |

**Judge notes (Judgement).**
- World judge: "This is the first upgrade gate we have seen. Show the card and the denial before the approval."
- World judge: "Tell us in the debrief what you needed from the device flow that it did not give you. We will read it."
- Veteran: "Immutables make bytecode comparison fiddly. Mask them on day one or the demo fails at 4 a.m."

---

### 5.4 Rank 2. Breakglass: the agent may only make things safer

**Pitch.** A protocol's monitoring agent holds a role that can only lower risk: pause, lower a cap, lower a loan-to-value, revoke an operator. Anything that raises risk (unpause, raise a cap, list collateral, move reserves) needs a fresh Agent Pass approval from the named on-call guardian, bound to that exact call. The direction is decided onchain by comparing new and current values, so a "risk down" selector cannot be used to raise risk.

**Falsifiable promise.** "With the agent's key and a prompt-injected 'all clear', the vault cannot be unpaused or its cap raised. The guardian's approval unpauses it within a minute; an approval for one call cannot execute another, and a different person's approval ends in `access_denied`."

**Demo moment (20 seconds).** A planted bug in a demo lending vault on Sepolia is being drained by an exploit script. The agent pauses in the next block with no human. A forum post written by the attacker tells the agent "patched, unpause"; the agent tries and the call reverts with `RiskUpNeedsHuman()`. The agent also tries `setCap(cap + 1)` through the risk-down role and it reverts. The guardian approves on their phone; the unpause lands. A teammate (a valid mocked World user, not the guardian) tries the same approval and gets `access_denied`.

**How it works.**
- `Breakglass.sol` sits in front of the protected contract as its only admin. A deploy-time table maps each selector to a direction rule: always down (pause), always up (unpause), or "compare" (for setters, it reads the current value and classifies the call by the sign of the change).
- The agent holds `RISK_DOWN`; `RISK_UP` executes only with a backend EIP-712 approval over `keccak256(target, calldata)` after Agent Pass validation (code flow, `max_age=0`, essential `acr`, requested `sub` from the roster).
- Invariant suite: no sequence of `RISK_DOWN` calls raises any monitored parameter or clears the pause flag; a fuzzer searches for rounding or encoding tricks (for example a cap expressed in different decimals).
- The agent is an LLM watcher with three tools (read state, pause, propose); the injected post is its input, which makes the attack honest.

**Requirement checklist.**
- [x] R1: Agent Pass is the only path to `RISK_UP`.
- [x] R2: request (the agent proposes the unpause), completion (guardian approves), validated result (ID token checks), protected action (unpause onchain).
- [x] R3: cancel, timeout, wrong human, and a risk-up call disguised as risk-down, each leaving the vault paused.
- [x] R4: confidential client; the contract trusts only the backend signature over the exact call.
- [x] R5: debrief. Not a login screen. Fresh build.
- [ ] Risk: whether mocked identities return the `acr` and honour the essential claims request (question 1).

**Why it beats rivals (Judgement).** It is an authority model, not a spend cap: the agent is faster than any human in the safe direction and powerless in the unsafe one. Nobody in World's history has built the pause and unpause ratchet [H] 5. Its weakness against Upgrade Pass is that a judge may read "unpause needs a human" as a threshold rule; the onchain direction check and the disguised call are what answer that.

**Closest prior winners.**
- [Surety](https://ethglobal.com/showcase/surety-ms4gx), Tokyo 2026: a live prompt-injection attack plus onchain enforcement. Same evidence style.
- Tripwire (Tokyo 2026, no World prize) "pauses before humans can react" with no human ([Tripwire](https://ethglobal.com/showcase/tripwire-7bqxn)); Axis asks a human before big trades. Breakglass is the ratchet between them.

**Stack.** Solidity and Foundry on Sepolia; Hono backend; React console; an LLM through any SDK for the watcher. Partner prizes: World (+ IDKit through the Council option). Uniswap "Build with Uniswap" only if the protected object is a v4 pool whose hook pause stops swaps but never blocks LP withdrawals; **Judgement:** that is weak for Uniswap's centrality test, so do not count on it. Chainlink CRE as the monitoring job is possible but adds a third story.

**Difficulty.** Medium. Module, direction table and invariants about 12 hours; OIDC about 5; planted bug and exploit script about 4; watcher and console about 8.

**Scores.**

| H | AG | J | B | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 9 | 9 | 8 | 7 | **8.2** |

**Judge notes (Judgement).**
- World judge: "The agent being allowed to act alone in one direction is what makes this agentic, not decorative. Say that sentence in the video."
- Veteran: "Do not replay a real mainnet exploit on a fork. A planted bug you wrote is enough, and it will not break at 3 a.m."
- Veteran: "Upgrade Pass and Breakglass share 70% of the code. Build one; mention the other as a second policy in the README."

---

### 5.5 Rank 3. Owed: a bug bounty where only a human can say no, and only the finder can get paid

**Pitch.** Bug bounties are now flooded from both sides: AI agents file slop, and programs answer with AI triage that auto-rejects. Owed is an escrowed bounty where both ends have a human of record. A finder's audit agent files a report only after the finder completes Agent Pass, with a small stake. The program's triage agent may label, deduplicate and ask questions, but closing a High or Critical (pay, reject, or mark duplicate) needs a fresh approval from a named program reviewer. If no human decides within the program's SLA, the escrow pays the posted minimum. Payout is released only to the same finder, freshly verified.

**Falsifiable promise.** "A triage agent cannot reject a critical report: without a reviewer's fresh approval, the SLA lapses and the escrow pays the minimum. A copied report filed from another account, or a stolen agent key, cannot collect the payout, because claiming needs a fresh check by the human who filed."

**Demo moment (20 seconds).** The finder's agent files a critical; the CLI shows a code; the finder approves on their phone; the report and stake land in the escrow. The program's triage agent tries `decide(reject)` and it reverts. The SLA (two minutes in the demo) lapses, and the minimum becomes claimable. A teammate with the finder's agent key tries to claim to their own address: the claim needs Agent Pass with the filer's `sub`, and gets `access_denied`. The real finder claims. In a second report, the reviewer rejects as invalid with an approval bound to the reason hash, and the junk filer's stake is slashed.

**How it works.**
- `Owed.sol` (test USDC on Sepolia): programs deposit a bond and per-severity minimums; `file(reportHash, finderTag, severity)` takes a stake and is called by our relayer after Agent Pass validation; `decide(reportId, decision, amount, reasonHash, approval)` needs a backend signature after the reviewer's fresh approval with the requested `sub`; `lapse(reportId)` pays the minimum after the SLA; `claim(reportId, to, approval)` needs a fresh approval whose `sub` matches the filing.
- `finderTag` is `keccak256(sub, salt)` with a server-held salt, so the pairwise `sub` is never published.
- The finder's agent is an API client; our API answers with an `insufficient_user_authentication` challenge in the style of RFC 9470 and starts the device flow on our side.
- No quotas and no scores: the stake and the human of record are the only anti-slop measures, so the Lisbon "Agent reputation" and "benefits" patterns do not apply.

**Requirement checklist.**
- [x] R1: Agent Pass at filing, at program decisions and at payout.
- [x] R2: request, completion, validated result and protected action (filing, a decision, a payout) each shown once.
- [x] R3: triage agent rejection refused; expired device code at filing; wrong human at payout (`access_denied`).
- [x] R4: confidential client; the contract trusts only the backend signature; `sub` stays server side.
- [x] R5: debrief. Not a login. Fresh build.
- [ ] Risk: three Agent Pass moments in four minutes. Cut the reviewer-reject path from the video if needed; keep it in the README.

**Why it beats rivals (Judgement).** The human step settles an obligation in both directions, the Surety and Lifeline pattern, in a domain this team lives in. curl ended its bug bounty after a flood of AI-generated reports ([BleepingComputer](https://bleepingcomputer.com/news/security/curl-ending-bug-bounty-program-after-flood-of-ai-slop-reports/); [Hackaday, 26 Jan 2026](https://hackaday.com/2026/01/26/the-curl-project-drops-bug-bounties-due-to-ai-slop)), so the problem is real. The "only a human can say no" rule is new: approvals in past entries guard spending, not refusals.

**Closest prior winners.**
- [Surety](https://ethglobal.com/showcase/surety-ms4gx) and [Creance](https://ethglobal.com/showcase/creance-egdz5): claim paid only to the same human, freshly checked. Owed applies it to bounty payouts.
- [not so secret agent](https://ethglobal.com/showcase/not-so-secret-agent-vmnas) (London 2024, Best World ID Usage 3rd): stakers who are slashed cannot return under a new account.
- [Mars](https://ethglobal.com/showcase/mars-ua1qc) (NY 2026, AgentKit 2nd): human-backed auditor agents. Owed is the program and payout side, with no reputation.

**Stack.** Solidity and Foundry on Sepolia; Hono backend; React dashboard for the program; a Node CLI for the finder's agent. Partner prizes: World only. **Judgement:** Arc would fit a USDC payout but requires building in Arc Studio; not worth the slot.

**Difficulty.** Medium. Escrow and tests about 8 hours; three Agent Pass flows about 8; CLI and dashboard about 10.

**Scores.**

| H | AG | J | B | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 9 | 9 | 8 | 6 | **7.9** |

**Judge notes (Judgement).**
- World judge: "A human who must say no is a nice inversion. Make sure the program side reads as a real program's choice, not a punishment."
- Veteran: "Default payout on silence will be the first question. Answer it in one line: programs opt in to show researchers that a person reads every critical."

---

### 5.6 Rank 4. Name Lock: an agent runs your ENS name, only you can change where money or users go

**Pitch.** A merchant or protocol lets an operations agent manage its ENSv2 name (text records, hours, menus, social links). The records that redirect money or users (`addr`, coin addresses and `contenthash`) are held by a gate contract that alone has those resolver roles and writes them only with the owner's fresh Agent Pass approval, bound to the new value. Payee redirection and frontend redirection are the two frauds it stops.

**Falsifiable promise.** "A prompt-injected agent that tries to point `shop.<team>.eth` at an attacker's address, or its `contenthash` at an attacker's frontend, is refused onchain. The owner's approved change lands; an approval for value A cannot set value B."

**Demo moment (20 seconds).** A fake supplier email tells the agent to "update our USDC payout address". The agent's direct resolver write reverts (no role); its request through the gate opens an approval; the owner sees old and new address with a warning that the first and last four characters match a known contact (address poisoning) and denies. Then the agent tries a `contenthash` change and the owner sees the old and new IPFS CIDs side by side.

**How it works.** A Permissioned Resolver where the agent holds key-scoped text roles only, and `NameLockGate` holds the roles for `addr`, coin types and `contenthash`; the gate executes with a backend EIP-712 approval over `(node, key, newValueHash)`. Foundry tests cover each record type and replay.

**Requirement checklist.**
- [x] R1 to R5 as in the common build; the protected action is the resolver write by the gate.
- [x] R3: deny, expiry, and replay with a different value.
- [x] ENS R1 (Sepolia) and "central, not cosmetic": the role split in the resolver is the product ([Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)).
- [ ] Risk: overlap with our ENS file's Quarantine, which already gates role widening with Agent Pass (`track_ideas/ideas/ens.md`). Do not build both.

**Why it beats rivals (Judgement).** It protects where money goes rather than how much, and adds the frontend record, which no World entry has guarded. It is still recognisably the "agent edits, human approves sensitive edits" shape, so its World novelty is medium; most of its value is the ENS stack.

**Closest prior winners.** [Airlock](https://ethglobal.com/showcase/airlock-ph6bx) (ENSv2 approver roles plus World approval); non-winners [Proviso](https://ethglobal.com/showcase/proviso-0c5ea) (ENSv2 rules plus World approvals) and [Meigi](https://ethglobal.com/showcase/meigi-mingyi-qzc2i) (confirmation of payee).

**Stack.** ENSv2 contracts on Sepolia (`ensdomains/contracts-v2`), ENSjs 5.2.5 or later, viem; Hono backend; React. Partner prizes: World + ENS "Best Use of ENSv2" ($7,000). Third slot: none.

**Difficulty.** Medium (ENSv2 role setup on Sepolia is the unknown).

**Scores.**

| H | AG | J | B | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 8 | 8 | 9 | 8 | 6 | 7 | **7.4** |

**Judge notes (Judgement).**
- World judge: "We have seen ENS plus World approvals twice. The `contenthash` case is the new part; lead with it."
- Veteran: "This is an ENS entry with World attached. Choose it only if ENS is the main target."

---

### 5.7 Rank 5. Two-Key Rover: restricted zones need a named supervisor, fresh

**Pitch.** A delivery rover inside a hospital (simulated) moves freely, but entering a restricted zone (pharmacy, ICU) needs two keys: the planner's recorded decision and a fresh Agent Pass approval from the zone's named supervisor, bound to `(robotId, zone, missionHash, window)`. The policy contract refuses the move otherwise, and the rover returns to base when the window expires.

**Falsifiable promise.** "The rover never crosses a restricted boundary without a validated approval from that zone's supervisor; a different person's approval, a cancelled request or an expired window leaves it outside."

**Demo moment (20 seconds).** The rover stops at the pharmacy line; a judge's phone (enrolled as supervisor for the demo) gets the prompt; the judge cancels and the rover waits; on the second try they approve and it enters. A teammate approves for the ICU, where they are not the supervisor, and gets `access_denied`.

**How it works.** As in our 0G file (`track_ideas/ideas/0g.md`, section 5.6): a zerobot simulator rover, a policy contract on 0G Galileo testnet that checks the backend's approval signature, and the planner's decision recorded on 0G Storage. The World half is the common build with a per-zone supervisor `sub`.

**Requirement checklist.**
- [x] R1 to R5; the protected action is the move across the boundary.
- [x] R3: cancel, expiry, wrong supervisor.
- [x] 0G "Physical AI" qualifications per `track_ideas/ideas/0g.md`.
- [ ] Risk: robotics is the team's weakest skill; the simulator setup must work in hour 2.

**Why it beats rivals (Judgement).** A physical action plainly "needs a human approval layer", and World's 2026 judges rewarded robots twice. Novelty is capped because Hands Unchained already paired a robot, World and 0G.

**Closest prior winners.** [Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3) (Lisbon, World Identity Check 1st, 0G 2nd, finalist); [pinch](https://ethglobal.com/showcase/pinch-fvnm7) (NY 2026, World Track B 1st).

**Stack.** zerobot simulator, 0G Galileo policy contract, 0G Storage, Hono backend. Partner prizes: World + 0G "Physical AI: Agents with a Body" (0G pays that track "at 0G's discretion", `00_current_tracks.md`).

**Difficulty.** Medium to high for this team.

**Scores.**

| H | AG | J | B | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 9 | 8 | 8 | 7 | 5 | **7.3** |

**Judge notes (Judgement).**
- World judge: "Physical consequences make the approval obviously meaningful. We still need the denied path on video."
- Veteran: "Only if World plus 0G is the target. It wastes the team's audit skills."

---

## 6. Track 2: Best Use of IDKit ($2,500, 2 x $1,250)

### 6.1 Final ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Distinct Quorum: a 3-of-5 Safe that provably means three people | 8.3 | Keep (one fix, done below) | World; Safe guard on World Chain with onchain `WorldIDVerifier` |
| 2 | Rescue Gas: one sponsored rescue per victim, proportionate to a few dollars of gas | 8.1 | Revise (done below) | World; EIP-7702 sponsored transaction on Sepolia, Selfie Check on the server |
| 3 | Small Holders First: a post-hack recovery waterfall that is per human, not per wallet | 8.0 | New (replaces Licence Gate) | World; recovery fund on World Chain with onchain verification |
| 4 | Same Human: a leaked key alone cannot change your delegate, owner or withdrawal list | 7.1 | Revise (done below) | World + EF "Best CROPS App" (only with onchain verification) |
| 5 | Warden One: one human, one share in an audit contest, unlinkable across contests | 7.0 | Revise (done below) | World only |

### 6.2 Common pattern (Judgement)

One credential per build; a README table "trust event, what goes wrong with a weaker credential, what a stronger one over-collects"; the `signal` bound to the exact object; the action string scoped to the object (per Safe, per incident, per contest) and hashed with `hash_to_field` for onchain use; nullifier uniqueness enforced in the contract or database; the ineligible path on video; and one sentence on what the proof does not verify.

### 6.3 Rank 1. Distinct Quorum: a 3-of-5 Safe that provably means three people

**Pitch.** A Safe guard that binds every owner address to a distinct Proof of Human nullifier for that Safe, so a threshold counts humans, not keys. One person cannot hold two seats, and adding or swapping an owner without an enrolled, distinct human reverts.

**Falsifiable promise.** "One person enrolling a second key for the same Safe gets the same nullifier and is refused; no owner change can make two owners belong to one human; a user with no Orb credential cannot take a seat, and the guard says why."

**Demo moment (20 seconds).** The treasurer tries to add their second laptop key as owner 4: IDKit returns the same nullifier and `enroll` reverts with `SameHuman(owner2)`. The `addOwnerWithThreshold` call for the unenrolled key reverts in `checkTransaction`. A third teammate enrolls, the owner change executes, and a 3-of-5 treasury transaction goes through. A simulator user without the Orb credential sees "this seat needs Proof of Human; Selfie Check is not enough for a treasury".

**How it works.**
- `HumanQuorumGuard` (Safe guard) on World Chain: `enroll(owner, root, nullifier, proof)` calls `WorldIDVerifier.verify(...)` with `signal = owner` and `action = hash_to_field("quorum:" + safe)`; stores `nullifier -> owner` and rejects a nullifier already mapped to a current owner. `checkTransaction` blocks `addOwnerWithThreshold`, `swapOwner` and `setGuard` unless the incoming owner is enrolled; removal frees the nullifier.
- Install requires every existing owner to enroll first.
- Invariant: the number of distinct nullifiers among owners equals the number of owners, after any sequence of owner-management calls the fuzzer can find.
- If simulator proofs do not verify on the staging verifier (question 3), the backend verifies through `POST /api/v4/verify/{rp_id}` and signs an enrollment the guard checks; the README says the guard then trusts our backend.

```solidity
interface IHumanQuorumGuard {
    error SameHuman(address existingOwner);
    error NotEnrolled(address owner);
    error InvalidProof();
    function enroll(address owner, uint256 root, uint256 nullifier, uint256[8] calldata proof) external;
    function humanOf(address owner) external view returns (uint256 nullifier);
    function distinctHumans() external view returns (uint256);
}
```

**Trust event and credential choice (Q3).** The event is "someone takes a seat on a treasury". What the Safe must know is that the seat holder is a different person from every other seat holder, nothing about who they are. Proof of Human is the minimum that gives distinctness at treasury stakes. Selfie Check is "medium-assurance" and returns a Sybil score, which suits small benefits, not a seat that moves millions. Passport proves possession of a document; dual nationals hold two, and it over-collects. Honest limit for the README: distinct humans do not stop a lying signing UI (Bybit's signers were distinct people, [The Block](https://www.theblock.co/post/343530/lazarus-appears-to-compromise-safe-developer-machine-in-lead-up-to-1-5-billion-bybit-hack-report)) or a person who rents their identity to a colleague; it stops one insider or one stolen laptop counting as two seats.

**Requirement checklist.**
- [x] Q1: onchain flow (Safe, guard, enrollment page).
- [x] Q2: Proof of Human, verified onchain on World Chain (fallback stated).
- [x] Q3: the table above in the README.
- [x] Q4: same human refused; user without the credential refused; cancellation.
- [x] Q5: debrief. One credential. Fresh build.
- [ ] Risk: Safe deployment and the staging verifier network on World Chain testnet (questions 3 and 4).

**Why it beats rivals (Judgement).** Nobody in World's window applied distinctness to a wallet's signer set [H] 5, and the minimum-assurance argument is unusually clean. It is "one human, one seat", but a seat whose duplicates are a known custody failure, not a ticket.

**Closest prior winners.** [0xPoll](https://ethglobal.com/showcase/0xpoll-4j05w) (Sydney 2024, Best Governance App) and [Votelik Pollerin](https://ethglobal.com/showcase/votelik-pollerin-u0dcs) (London 2024 1st, a `SignUpWorldcoinGatekeeper` for MACI): one human, one vote, not one human, one signing seat. [Placed](https://ethglobal.com/showcase/placed-eijhx) (Tokyo IDKit): proofs bound to wallets, with an honest limit.

**Stack.** Safe contracts and a guard in Solidity with Foundry on World Chain (testnet); IDKit 4.x React widget; Hono backend for RP request signing (`signRequest`, key kept as a secret). Partner prizes: World only (or with Upgrade Pass or Breakglass as the Council build).

**Difficulty.** Low to medium. Guard and invariants about 8 hours; IDKit and RP signing about 5; enrollment UI about 6.

**Scores.**

| T | P | X | Alt | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 9 | 7 | 9 | 8 | 8 | **8.3** |

**Judge notes (Judgement).**
- World judge: "This is the answer to 'why this credential' we want: distinctness, nothing more, and why Selfie Check is not enough here."
- World judge: "Use the per-Safe action so seats on different Safes cannot be linked."
- Veteran: "If the onchain verifier fights you, switch to backend verification by Friday 10:00 and say so."

---

### 6.4 Rank 2. Rescue Gas: one sponsored rescue per victim, proportionate to a few dollars of gas

**Pitch.** When a key leaks, a sweeper bot takes any ETH sent to the address, so victims cannot pay gas to move remaining tokens, claims or unlocking vesting. Rescue Gas pays for one EIP-7702 transaction that delegates the victim's address to a minimal rescue contract and moves the listed tokens to a safe address in the same transaction, so no ETH ever touches the compromised address. Each person gets one sponsored rescue, checked with Selfie Check, because the benefit is a few dollars and most victims have no Orb.

**Falsifiable promise.** "A compromised wallet with zero ETH moves its tokens out in one sponsored transaction and the sweeper gets nothing; the same face asking again is refused; a low Sybil score goes to manual review instead of auto-approval."

**Demo moment (20 seconds).** On Sepolia, a sweeper script watches the victim address. A teammate sends 0.001 ETH the normal way and it is swept in the next block. Then the victim passes Selfie Check, signs a 7702 authorization in our page, and the relayer submits one type-4 transaction: the tokens land at the safe address and the sweeper's log shows nothing to take. The victim asks for a second rescue and is refused ("already used").

**How it works.**
- `RescueDelegate` (about 60 lines, fuzzed): `rescue(tokens, to, sig)` checks the address's own signature over `(tokens, to, nonce)` and transfers; nothing else.
- Relayer (Hono): verifies the IDKit Selfie Check result through the v4 verify API, checks the nullifier for `action = "rescue-v1"`, routes by `sybil_score` (auto above a threshold, review queue below), then submits the type-4 transaction with the victim's authorization and pays gas.
- Gas budget per rescue is capped; the relayer simulates the transaction first and refuses calls that are not `rescue`.

**Trust event and credential choice (Q3).** The scarce benefit is a gas subsidy worth a few dollars; abuse means farming the relayer for free gas. Proof of Human would exclude most victims in the moment they need help; Passport over-collects and NFC is slow in a panic; Selfie Check is "medium-assurance", proportionate to a few dollars, and its Sybil score decides auto-approval versus review. Honest limit for the README: the proof says nothing about who owns the wallet; whoever holds the key (including the thief) could request the rescue, so Rescue Gas only lets the victim act without ETH, and one person can use it once.

**Requirement checklist.**
- [x] Q1: functioning web app and relayer.
- [x] Q2: Selfie Check verified on the server.
- [x] Q3: the paragraph above, including why the Sybil score matters.
- [x] Q4: used nullifier refused; low score routed to review; cancellation.
- [x] Q5: debrief, including what the Sybil score was useful for (World asked for this at Lisbon, [H] 2.6).
- [ ] Risk: whether simulator proofs return a `sybil_score` and whether Selfie Check needs a real device (question 5).

**Why it beats rivals (Judgement).** It is the only idea here built on the Mumbai text's own headline ("Selfie Check (Now live with Sybil score)") with a reason why low assurance is enough, the ArcAsset and Creance argument, in a security setting judges will recognise in the week of a 7702 drain. No World entry has helped hack victims.

**Closest prior winners.** [ArcAsset](https://ethglobal.com/showcase/arcasset-av1gr) and [Creance](https://ethglobal.com/showcase/creance-egdz5) (ETHOnline 2026 Selfie Check): low-assurance credential, argued. [DEWDROP.](https://ethglobal.com/showcase/dewdrop-nyhug) (Brussels 2024, Public Goods): a sybil-resistant faucet; Rescue Gas is a faucet with a reason to exist.

**Stack.** Solidity and Foundry; viem with 7702 authorization signing; Hono relayer; IDKit 4.x. Partner prizes: World only. **Judgement:** EF "Frame Transaction Alternative Mempool" would fit a sponsor frame on the EF devnet but doubles the plumbing; skip.

**Difficulty.** Medium. 7702 transaction assembly and the sweeper race are the risks (about 10 hours); delegate and tests about 4; IDKit about 5.

**Scores.**

| T | P | X | Alt | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 9 | 6 | **8.1** |

**Judge notes (Judgement).**
- World judge: "Finally, someone who uses the Sybil score for a decision. Tell us what values you saw."
- Veteran: "Write the honest limit in bold. A judge who notices the thief can also call it will mark you down if you hid it."

---

### 6.5 Rank 3. Small Holders First: a post-hack recovery waterfall that is per human, not per wallet

**Pitch.** After an exploit, protocols often repay victims from a partial recovery fund. Paying small holders first is fair and common in spirit, but a per-address priority tier is gamed by splitting a whale across hundreds of addresses. Small Holders First pays a priority tier of up to a fixed cap per human (Proof of Human, one claim per person per incident) and pays everyone else pro rata with no credential at all.

**Falsifiable promise.** "A holder who split a large balance across 50 addresses gets one priority claim, not 50; their other addresses fall to the pro rata tier, and the small holders' recovery rate on the dashboard rises accordingly. A user without World ID still receives their pro rata share."

**Demo moment (20 seconds).** A simulated incident with a published snapshot: the dashboard shows "small holders recover 38% under per-address priority, 91% under per-human priority". A whale's second address tries the priority claim with the same human: the contract reverts with `AlreadyClaimed`, and the address shows its pro rata amount instead. A user without the credential claims pro rata only.

**How it works.**
- `RecoveryFund` on World Chain testnet: a Merkle root of pre-incident balances; `claimPriority(addr, amount, merkleProof, worldIdProof)` verifies onchain with `signal = addr` and `action = hash_to_field("incident:" + id)`, pays `min(amount, CAP)` at 100% and records the nullifier; `claimProRata(addr, amount, merkleProof)` is open to all after the priority window; the address signs both claims.
- A simulation script computes small-holder recovery under per-address and per-human rules on a synthetic or public holder distribution, and the dashboard plots it.
- Invariant: total paid never exceeds the fund; a nullifier pays at most once per incident.

**Trust event and credential choice (Q3).** The event is "claiming the priority tier of a recovery fund". Up to the cap (for example $1,000) per person is at stake, which is worth farming faces for, so Selfie Check's medium assurance is not enough; Passport over-collects and dual nationals hold two; Proof of Human gives exactly "one person, one priority claim". Ineligible users lose nothing they would otherwise have had: the pro rata tier is open to all. Honest limit: the proof does not prove the claimant was a victim (the Merkle proof and the address signature do that).

**Requirement checklist.**
- [x] Q1: onchain flow and a claim page.
- [x] Q2: Proof of Human verified onchain (fallback: backend verification, stated).
- [x] Q3: the paragraph above.
- [x] Q4: second claim by the same human refused; user without the credential routed to pro rata.
- [x] Q5: debrief. One credential. Fresh build.
- [ ] Risk: the number on the dashboard depends on the distribution; publish the script and the inputs.

**Why it beats rivals (Judgement).** It uses World ID for the economics of a mechanism, the style that won in 2024 (PopuliDAO's per-person cap) but on a 2026 problem: DefiLlama counts 322 incidents in 2026 so far ([DefiLlama hacks API](https://api.llama.fi/hacks); `00_season.md` 1.1). It is close in shape to our Uniswap file's Humancap (per-human cap in a CCA); do not build both.

**Closest prior winners.** [PopuliDAO](https://ethglobal.com/showcase/populidao-ffbb2) (Superhack 2024 HM, "a token cap per individual"); [Relief Link](https://ethglobal.com/showcase/relief-link-mbfmy) and [Free the Aid](https://ethglobal.com/showcase/free-the-aid-etztn) (Sydney 2024, aid payouts); [Surety](https://ethglobal.com/showcase/surety-ms4gx) (claims).

**Stack.** Solidity and Foundry on World Chain testnet; IDKit 4.x; a TypeScript simulation and React dashboard. Partner prizes: World only.

**Difficulty.** Low to medium.

**Scores.**

| T | P | X | Alt | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 9 | 8 | 9 | 7 | 7 | **8.0** |

**Judge notes (Judgement).**
- World judge: "The pro rata tier for people without World ID is what makes this fair rather than exclusive. Say it early."
- Veteran: "The simulation is the demo. Without a chart, this is one more claim page."

---

### 6.6 Rank 4. Same Human: a leaked key alone cannot change your delegate, owner or withdrawal list

**Pitch.** A smart account (ERC-4337, or an EIP-7702 delegate) whose three dangerous actions (change delegate, rotate the owner key, add a withdrawal address) need a World ID proof whose nullifier equals the one recorded at setup, with the new configuration hash as `signal`. Key-loss recovery uses the same proof plus a 48 hour delay the current key can cancel.

**Falsifiable promise (narrowed after vetting).** "An attacker with only the private key (a leaked seed or a malicious extension) cannot change the delegate, rotate the owner or add a withdrawal address; a different World ID with a valid proof is refused; the real user can recover with no server of ours running."

**Demo moment (20 seconds).** The attacker calls `setDelegate` with the key and it reverts; a teammate's valid proof carries the wrong nullifier and reverts; the enrolled human proves, the change queues, the timer runs; the backend is switched off live and recovery completes from the contract.

**Trust event and credential choice (Q3).** "This is the same person who set up the account." Proof of Human with the same nullifier is the minimum; Passport proves possession of a document a thief may also have; Selfie Check could be enrolled by whoever holds the phone. Honest limit: an attacker who holds the user's phone and can pass World App's own checks defeats it; this protects against key-only theft, the common case.

**Requirement checklist.** [x] Q1 onchain flow; [x] Q2 onchain on World Chain (else stated fallback); [x] Q3; [x] Q4 wrong human, cancellation, timelock cancelled; [x] Q5. [ ] Risk: 7702 support on the World Chain testnet; use a 4337 account if absent.

**Why it beats rivals (Judgement).** "Recovery or protection of an important account action" is in the track text, and the Binance drain makes the delegate-change case current. Novelty is limited because Cache Coherence already won recovery with World ID.

**Closest prior winners.** [Cache Coherence](https://ethglobal.com/showcase/cache-coherence-1nq6z) (Sydney 2024, Best World ID Usage 2nd: lost-key 4337 recovery with World ID over CCIP). Difference: protection before recovery, same-nullifier binding, no server in the path.

**Stack.** Solidity and Foundry on World Chain testnet; IDKit 4.x. Partner prizes: World + EF "Best CROPS App" ($3,500), whose list starts with "a wallet a user can fully recover with nothing from you" (`00_current_tracks.md`), only with onchain verification and a CROPS section; **Judgement:** the EF may be cool on biometric identity, so treat EF as a bonus.

**Difficulty.** Medium to high.

**Scores.**

| T | P | X | Alt | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 7 | 8 | 6 | 6 | **7.1** |

**Judge notes (Judgement).**
- World judge: "Do not claim the phone case. The narrowed promise is the honest one."
- Veteran: "Two sponsors' standards (CROPS and World) pull in different directions on identity. Pick World as the lead."

---

### 6.7 Rank 5. Warden One: one human, one share in an audit contest, unlinkable across contests

**Pitch.** Audit contests split pots between duplicate findings, so one auditor filing the same finding from three accounts takes three shares. Warden One binds each warden account to a Proof of Human nullifier scoped to that contest, so one person gets one share per contest, and contests cannot link the same auditor across contests.

**Falsifiable promise.** "Three accounts run by one person submit the same High; one is payout-eligible; the honest warden's share rises from 25% to 50% on the live leaderboard. The same auditor's nullifiers in two contests are different values."

**Demo moment (20 seconds).** The leaderboard before and after: three duplicates collapse into one and the honest share doubles; two contests' nullifiers for the same simulator user are shown side by side, different.

**Trust event and credential choice (Q3).** "A finding becomes payout-eligible." The question is how many accounts one person runs, so uniqueness is enough; Passport or KYC would expose auditors who stay pseudonymous; Selfie Check is too weak for payouts of thousands of dollars. Per-contest actions keep the platform from building a cross-contest profile.

**Requirement checklist.** [x] Q1 web app; [x] Q2 backend verification with `UNIQUE (nullifier, action)`; [x] Q3; [x] Q4 duplicate human, cancellation, no credential (compete unpaid); [x] Q5.

**Why it beats rivals (Judgement).** Clean, cheap and true to the team's world, but it is the "one human, one entry" shape that lost at Tokyo; the per-contest unlinkability is the only new property.

**Closest prior winners.** Non-winners [ScalpLess](https://ethglobal.com/showcase/scalpless-15fnr) and Tenjō (Tokyo); [Void Tactics](https://ethglobal.com/showcase/void-tactics-ag25f) (NY 2026, Continuity).

**Stack.** Next.js, Postgres, IDKit 4.x. Partner prizes: World only.

**Difficulty.** Low.

**Scores.**

| T | P | X | Alt | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 8 | 6 | 8 | 5 | 9 | **7.0** |

**Judge notes (Judgement).**
- World judge: "Correct, but we have paid for sybil gates since 2023."
- Veteran: "A fallback for a team that loses its main build on Friday night, not a plan."

---

## 7. Track combination pass (Judgement)

Rules (sourced: [event page FAQ](https://ethglobal.com/events/mumbai), [details page](https://ethglobal.com/events/mumbai/info/details)): at most 3 partner prizes; "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize"; the EF places a project in at most one EF prize; the ETHGlobal finalist track is separate and does not count. Partner prizes are judged only from the repo, README and video.

### 7.1 One project, both World tracks, one partner slot

| Combined build | Agent Pass event | IDKit event and its single credential | Coherent? |
|---|---|---|---|
| **Upgrade Council** (Upgrade Pass + Distinct Quorum) | Fresh approval of a named engineer, bound to the code hash | Engineers enroll as upgrade approvers with distinct Proof of Human; a two-person rule then needs two distinct humans | Yes: distinctness at enrollment, presence at the action. Best single World build |
| **Breakglass Council** (Breakglass + Distinct Quorum) | Fresh approval of the on-call guardian | Guardians enroll with distinct Proof of Human, so a council of 3 is 3 people | Yes |
| Owed + Warden One | Filing and payout | One human, one share | Weak: two stories about bounties; Warden One adds little |
| Name Lock + anything IDKit | Owner approves payout changes | none natural | Avoid |

The IDKit README must still argue its own trust event and one credential; the Agent Pass README must still show its own failed paths.

### 7.2 Cross-sponsor stacks within the 3-partner cap

| Idea | Partner 1 | Partner 2 | Partner 3 | EF (at most one) | Extra files | Verdict |
|---|---|---|---|---|---|---|
| Upgrade Council | World (both tracks) | none | none | none | `WORLD_DEBRIEF.md` | Narrow and deep; best finalist fit |
| Breakglass Council | World (both) | Uniswap (weak) | Chainlink CRE (optional) | none | debrief, `FEEDBACK.md` and form if Uniswap | Good; do not rely on Uniswap |
| Owed | World | none | none | none | debrief | Narrow |
| Name Lock | World | ENS ($7,000) | none | none | debrief, live demo link | ENS-led |
| Two-Key Rover | World | 0G Physical AI | none | none | debrief, 0G request IDs | 0G-led |
| Rescue Gas | World | none | none | Alt mempool (heavy, skip) | debrief | Narrow |
| Small Holders First | World | none | none | none | debrief | Narrow; not with Humancap |
| Same Human | World | none | none | CROPS App | CROPS section | Depends on onchain verification |

### 7.3 World as the second slot of another sponsor's idea (from the other judged files)

| Other file's idea | World track | World judges' view (Judgement) |
|---|---|---|
| ENS Quarantine (`ideas/ens.md`): role widening gated by Agent Pass | Agent Pass | Decent: widening a role is a meaningful action; overlaps Name Lock |
| 0G Two-Key Rover (`ideas/0g.md`) | Agent Pass | Included above as rank 5 |
| Definitive Last Out and Called It (`ideas/definitive.md`): one ranked leader profile per human | IDKit | Good: "a leader with a bad record cannot start again" is the "not so secret agent" ban-a-person pattern |
| Definitive Leash: copy above a cap needs Agent Pass | Agent Pass | Weak: the Tokyo spend-cap shape |
| Arc Bhishi (`ideas/arc.md`): one seat per human in a credit co-op | IDKit | Medium: one human, one seat; Arc has a production `WorldIDSatellite` ([IDKit onchain verification](https://docs.world.org/world-id/idkit/onchain-verification)), so onchain verification is possible if the build runs on Arc mainnet |
| Arc Ask Me First: payments to new payees or above 0.50 USDC need Agent Pass | Agent Pass | Weak: exactly the Axis and DSAP shape that lost at Tokyo |
| Uniswap Humancap (`ideas/uniswap.md`): per-human budget in a CCA | IDKit | Medium to good: the split attack shown failing is a measured property, but "CCA plus World ID" will be common after Kura |
| Whitechain Coupon Clock and Yield Auction (`ideas/whitechain.md`), IDKit optional | IDKit | Weak unless the credential gates something a bot could game |

### 7.4 Combos to avoid

- World with EF Anon-RPC or the alt mempool as the core story: an identity gate cuts against those prizes' privacy story (`plans/A_verified_anon_reads.md` and `plans/D_alt_mempool.md` both skipped World for this reason).
- Breakglass and Upgrade Pass as two separate projects: same code, same story; build one and mention the other as a second policy.
- Small Holders First with Uniswap Humancap: the same per-human cap mechanism twice.
- Any World build with Arc unless it starts in Arc Studio, which Arc requires (`00_current_tracks.md`).

---

## 8. World's top 3 overall

1. **Upgrade Pass (8.4), built as Upgrade Council.** The highest novelty against World's history (no upgrade gate in the window), squarely on the team's audit skills, anchored to a 2026 loss every judge knows, and it reaches both World tracks for one partner slot when engineers enroll with distinct Proof of Human. The upgrade card turns a familiar approval into one a judge has not seen: the human approves facts the agent could not forge.
2. **Distinct Quorum (8.3).** The cleanest "minimum sufficient assurance" argument in either track, now verifiable onchain on World Chain, low build risk, and the natural IDKit half of the top idea. If the team builds only one IDKit entry, this is it.
3. **Breakglass (8.2).** The best agentic story: the agent acts alone in the safe direction and is powerless in the unsafe one, with a live prompt injection that fails onchain. It shares most of its code with Upgrade Pass, so it is the pivot if the upgrade witness (compile and compare) breaks by Friday morning.

Best fallback outside this list: Rescue Gas (8.1) if the workshop confirms that simulator proofs return a Sybil score; it is the most original IDKit idea but has the most plumbing risk.

---

## 9. Questions for the World workshop and booth

Workshop: Thu 5 Nov 17:30 to 18:00 IST, Workshop Room 1, "World Workshop" (status "proposal", no speaker yet). It clashes with 1inch Aqua (17:30, Room 2), so send one person to each ([event page](https://ethglobal.com/events/mumbai)). Ask in the ETHGlobal Discord World channel before Thursday, and at the booth before hacking starts at 21:00 IST. Most decisive first.

1. **Event environment for Agent Pass:** is `https://auth.world.org` itself the mocked-proof environment for Mumbai, or is there an event issuer like Tokyo's `sandbox.auth.world.org`? How do teams register a client in the portal, is approval needed, and how many distinct mocked humans can one team use? Do mocked identities return `acr` values such as `orb-face`, and do they honour an essential `claims` request? (Every Agent Pass idea needs at least two distinct mocked humans for the wrong-human path.)
2. **Requested `sub` in the device flow:** does an essential `claims.id_token.sub` request work in the RFC 8628 device flow as well as the code flow, with mocked identities, and is the pairwise `sub` stable for the same mocked human across days? (Upgrade Pass, Owed, Breakglass.)
3. **Onchain verification for IDKit:** do simulator or staging proofs verify against the staging `WorldIDVerifier` (`0x703a6316c975DEabF30b637c155edD53e24657DB`), and is that on World Chain mainnet or World Chain Sepolia? Is a `WorldIDSatellite` planned on Ethereum Sepolia or Base Sepolia? Does onchain `verify` enforce anything beyond the proof (for example `require_user_presence`)? (Distinct Quorum, Small Holders First, Same Human.)
4. **Both tracks, one project:** can one project place in both Agent Pass and Best Use of IDKit, and will the IDKit judges see an IDKit enrollment inside an Agent Pass product (Upgrade Council) as central or as an add-on?
5. **Selfie Check in testing:** does the simulator support Selfie Check and return a `sybil_score` and `integrity_bundle`? What is the score's range and meaning, is there a recommended threshold, and does the verify API check the integrity bundle? (Rescue Gas.)
6. **Validated result for onchain actions:** is "backend validates the ID token, then signs a one-time EIP-712 approval that the contract verifies" the pattern judges expect for R4, or do they want something closer to the token itself onchain? Is an RFC 9470 style challenge from our own API the right shape for headless agents? (All Agent Pass ideas.)
7. **What counts as agentic:** is a coding agent (Claude Code or similar) running `forge script`, or a rule-plus-LLM watcher, agentic enough, or do judges want an autonomous agent that plans? (Upgrade Pass, Breakglass.)
8. **Showing the action:** the issuer "does not receive, display, or approve the pending business action". Is there any plan for authorization details (RFC 9396) or a display string on the World App prompt, and should teams show the action on their own page before the redirect? (All Agent Pass ideas; changes the demo.)
9. **Debrief format:** is there a required file name or location, is it scored, and which topics matter most (Orb versus Selfie cohorts, Sybil score, device flow friction)?
10. **Proportionality calls:** would judges accept Proof of Human as the minimum for a treasury seat (Distinct Quorum) or a $1,000 priority claim (Small Holders First), even though it excludes people without an Orb, or would they prefer Selfie Check with a Sybil score threshold?
11. **Freshness details:** do mocked tokens carry a real `auth_time`, what is the ID token lifetime, and how often do World's JWKS keys rotate? (Approval expiry logic.)
12. **Judging mechanics:** do World's judges watch the booth demo, run the code, or only read the repo, README and video? Did any of Tokyo's World judges judge Mumbai, and in their words what separated Airlock, Surety and Lifeline from correct entries such as Axis?
13. **Identity Check:** is it enabled for Mumbai teams at all? (No final idea depends on it after vetting; ask only if time allows.)

---

## 10. Gaps and caveats

- No Mumbai judges are named (`00_current_tracks.md`); "what the judges reward" is inferred from Tokyo and earlier winners in [H], whose summaries are self-reported.
- Not verified from here: whether simulator proofs verify onchain on the staging verifier, which World Chain network the staging address is on, whether mocked Agent Pass identities support essential `acr` and `sub` requests, and whether Selfie Check returns a Sybil score in testing. Each idea names the question it depends on.
- Agent Pass guide quotes come from the dossier's same-day re-read, not from a fresh fetch in this pass.
- Drift's "proxy upgrade hijack" label comes from DefiLlama's classification via the season brief; Drift has not been re-researched here.
- ETHGlobal pages were not re-fetched; the verbatim World text is the 2026-10-31 snapshot in `00_current_tracks.md`.
