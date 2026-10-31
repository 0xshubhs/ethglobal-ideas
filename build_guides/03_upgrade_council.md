# 03 Upgrade Council: build guide

Rank 3 of 10 (judge average 7.00, P(demo) 60%). Source design: `track_ideas/finalist_ideas.md` section 3.3, `track_ideas/ideas/world.md` sections 5.2, 5.3 (Upgrade Pass), 6.3 (Distinct Quorum) and 7.1 (Upgrade Council), `track_ideas/finalist_judges/feasibility.md` candidate 2. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** An AI coding agent keeps full deploy rights, but the upgrade role on a vault proxy belongs to a gate contract. An upgrade lands only when a named engineer approves it through World ID Agent Pass on their phone and signs the same approval with the key they enrolled to the council. The engineer approves an **upgrade card** that our backend computed from chain and from its own compilation, never from the agent's description: new functions, storage layout changes, and what each new function does to the vault's money on a fork. Engineers join the council with IDKit Proof of Human, so one person cannot hold two seats.

**Falsifiable promise.** "The AI coding agent holds the deployer key and still cannot upgrade the vault proxy. An upgrade lands only with a fresh Agent Pass approval from a named engineer plus that engineer's own key, enrolled to the council with a distinct Proof of Human. An approval for implementation A cannot install implementation B, a second key for an already-seated human is refused, and a denied, expired or wrong-person approval leaves the proxy unchanged."

**Prize stack (one partner, two tracks).**

| Prize | Verbatim requirement (Facts, [World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | How this build meets it |
|---|---|---|
| World "World ID Agent Pass" ($2,500 / $1,500 / $1,000) | "Integrate with the official World ID Agent Pass."; "Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action."; "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur."; "Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization."; "Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact." Also: "We are mocking proofs now, so you don't need sandbox app anymore"; "Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen" | Request: the gate challenge from the agent's CLI. Completion: the engineer on World's prompt. Validated result: the backend checks the ID token and `sub` against the roster. Protected action: the proxy upgrade. Failed paths: deny, expiry, wrong human, tampered implementation, each with the proxy unchanged. Client secret only on the backend. `WORLD_DEBRIEF.md` from hour one |
| World "Best Use of IDKit" ($1,250 x 2) | "Integrate IDKit in a functioning application, mini app, or onchain flow."; "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate."; "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance."; "Demonstrate a successful verification and one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user."; debrief as above. "We are not rewarding the most credentials used." | Trust event: someone takes a seat on the upgrade council. Credential: Proof of Human, because the council needs distinct people and nothing about who they are. Alternative path: a second key for the same human is refused |

Judgement: one partner slot, both World tracks (World item 4 asks whether one project can place in both). No EF prize: the backend signer weakens the C in CROPS (`track_ideas/track_combos.md` section 5). Optional second partner only if hours allow: Chainlink CRE as Veto Window (`ideas/chainlink.md` CRE rank 2), noted as coherent but weaker.

## 2. Architecture

```
  [coding agent]  runs "forge script Upgrade" with the deployer key
        |  calls gate -> no approval -> CLI asks our API for an approval
        v
  [backend, Hono]  ---- device authorization (client secret here only) ----> auth.world.org
        |   witness: compile agent's source with pinned solc, compare to extcodehash(impl)
        |            (immutables masked, metadata stripped), storage layout diff
        |            (@openzeppelin/upgrades-core), new selectors, fork probe of each new function
        |   card stored server side; actionHash = hash(card, proxy, impl, codehash, dataHash)
        |   on valid ID token (iss, aud, auth_time, acr, sub in roster): sign EIP-712 attestation
        v
  [approval page]  shows the card from OUR database, engineer approves on World's prompt,
        |          then signs the same approval with the enrolled council key
        v
  [UpgradeGate, Sepolia]  owns ProxyAdmin; requires backend attestation + enrolled key signature;
        |                 re-checks impl codehash; single-use approval id; expiry
        v
  [Vault proxy]  upgraded, or unchanged with a named revert

  [IDKit enrollment page] Proof of Human, action "council:<gate>", signal = engineer key
        -> backend verifies (POST /api/v4/verify/{rp_id}), nullifier unused -> signs enrollment
        -> gate stores nullifier -> seat key; second key with the same nullifier refused
```

**Contracts in plain English.**
- **Vault** (OpenZeppelin 5.6.1 transparent proxy): an ERC-20 vault holding test USDC with deposits from two demo users.
- **UpgradeGate:** the only owner of the vault's `ProxyAdmin`. Stores the council (seat key, nullifier, active flag), the backend attestation signer, and used approval ids. Its upgrade entry point takes proxy, implementation, init data, an approval struct (proxy, implementation, implementation codehash, init data hash, expiry, approval id, approver seat key) and two signatures. It refuses if: the approval id was used; expiry passed; the backend signature does not recover to the attestation signer; the seat key signature does not recover to an active seat; the implementation's current codehash differs from the approved one; the data hash differs. Each refusal has its own named error (codehash mismatch, approval expired, approval used, bad approver, bad attestation). On success it calls the `ProxyAdmin` upgrade and marks the id used.
- **Council enrollment** (same contract or a small registry): accepts an enrollment (seat key, nullifier) signed by the backend after IDKit verification; refuses a nullifier that already maps to an active seat. If simulator proofs verify on the staging `WorldIDVerifier`, verification can move onchain only on World Chain (`ideas/world.md` section 3); on Sepolia the README states the gate trusts our backend for enrollment.
- **Malicious VaultV2** (demo fixture, written at the event): inserts a `feeBps` variable before existing storage (collision) and adds a `sweep(address)` that moves all vault USDC to the caller. **Disguised VaultV2b:** same sweep renamed to an innocent name. **Clean VaultV2c:** appends a variable correctly and adds a read-only function.

## 3. Repo layout and scaffold

```
upgrade-council/
  contracts/      Vault, UpgradeGate, council, demo V2 variants, Foundry tests and fuzz
  backend/        Hono app: OIDC client, device flow, witness service, attestation signer
  agent/          the coding agent's task file, the upgrade script, the injected "release note"
  app/            approval page (card), enrollment page (IDKit), council dashboard
  fixtures/       compiled artifacts per variant, layout files, fork state
  WORLD_DEBRIEF.md
```

At 21:00: common scaffold, `forge install OpenZeppelin/openzeppelin-contracts-upgradeable`, backend `npm i hono@4.13.14 openid-client@6.8.8 @openzeppelin/upgrades-core@1.47.0 viem@2.57.13`, app `npm i @worldcoin/idkit@4.6.0`. Register the OIDC client in the [Agent Pass portal](https://auth.world.org/portal) and the IDKit app in the [Developer Portal](https://developer.worldcoin.org) in the first hour; write the timestamp into `WORLD_DEBRIEF.md`.

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Agent Pass issuer | `https://auth.world.org` (or an event issuer if World names one) | (verify): World question 1 |
| Freshness and identity | `max_age=0` or `prompt=login` forces a new proof (code flow); essential `claims` for `acr` and `sub`; a mismatched requested `sub` "ends the request with `access_denied`"; device flow "already requires fresh authentication and explicit approval. It does not implement `max_age` or `prompt`"; the `device_code` "expires 20 minutes after creation and can be redeemed once"; the issuer "does not receive, display, or approve the pending business action" | Fact ([step-up guide](https://auth.world.org/docs/guides/step-up); [human-in-the-loop](https://auth.world.org/docs/guides/human-in-the-loop); [OIDC guide](https://auth.world.org/docs/guides/oidc), via `ideas/world.md` section 3) |
| Client secret | token endpoint called with the secret, so the backend starts and polls the device flow; the agent only gets the `user_code` and link | Judgement from the same facts |
| IDKit | `@worldcoin/idkit` and `@worldcoin/idkit-core` 4.6.0 ("Use the latest `4.x` version"); backend verification `POST https://developer.world.org/api/v4/verify/{rp_id}`, "Forward the IDKit result payload as-is", "your backend must check that the nullifier hasn't been used before"; action hashed with `hash_to_field`, not raw keccak | Fact ([IDKit integrate](https://docs.world.org/world-id/idkit/integrate); [onchain verification](https://docs.world.org/world-id/idkit/onchain-verification); npm 2026-10-31) |
| Onchain verifier | `WorldIDVerifier` staging on World Chain `0x703a6316c975DEabF30b637c155edD53e24657DB`; production only on World Chain and Arc | Fact (same page); network of the staging address (verify) |
| Layout diff | `@openzeppelin/upgrades-core` 1.47.0 | Fact (npm) |
| OIDC | `openid-client` 6.8.8; `hono` 4.13.14 | Fact (npm) |
| Chain | Ethereum Sepolia, about 12 s blocks | Fact |

## 5. Core algorithms in plain English

**Upgrade witness (backend).** Input from the agent: proxy address, new implementation address, source files and exact compiler settings. Steps:
1. Compile with the pinned `solc` through Forge using the given settings.
2. Read the deployed runtime code; strip the CBOR metadata tail from both sides; replace immutable positions (from the compiler's immutable references) with zeros on both sides; compare. Mismatch means "the code you showed us is not the code you deployed" and the card cannot be approved.
3. Storage layout diff between the current implementation and the new one with `@openzeppelin/upgrades-core`; translate each finding to a sentence ("overwrites where balances are stored: `feeBps` inserted at slot 5 before `owner`").
4. Selector diff: list external functions added, removed or changed.
5. **Fork probe:** on a fork of the current state with the new implementation installed, call each new or changed external function with fuzzed arguments from three callers (the proxy admin, the vault owner, a stranger); record any decrease of the vault's asset balance. A finding reads "a function the old code did not have can move 100% of vault USDC to the caller". This is what catches the renamed sweep: the card does not care about the name.
6. Flag `delegatecall` and `selfdestruct` in the new runtime code.
7. Store the card; `actionHash` commits to the card's content hash plus proxy, implementation, codehash and init data hash.

**Approval binding.** The approval page renders the card from our own database (never from the agent's text). In the device flow, the pending action is keyed by `device_code`; in the code flow, the `nonce` is a hash of the approval id and `actionHash` (`ideas/world.md` section 5.2). On a valid token the backend checks `iss`, `aud`, `nonce` (code flow), `auth_time`, `acr` and that `sub` is the named engineer's seat, then signs the EIP-712 attestation. The engineer's enrolled key then signs the same approval in the browser. The gate needs both.

**Fuzz property.** For any sequence of agent calls (direct upgrade calls, replays of old approvals, approvals with altered fields, calls through the `ProxyAdmin`), the implementation slot changes only with a valid pair of signatures over that exact implementation codehash.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Two mocked humans | one validated ID token for each of two mocked humans, two distinct stable `sub` values, logged in the debrief | B (hour 1) |
| M2 | Vault, gate, council contracts | `test_agent_cannot_upgrade_directly`, `test_upgrade_with_valid_pair`, `test_replay_reverts`, `test_expired_reverts`, `test_wrong_codehash_reverts`, `test_wrong_approver_reverts`, `test_forged_attestation_reverts` | A |
| M3 | Device flow end to end in the backend | the CLI prints a code and link; approval on the phone returns a validated token; denial returns `access_denied` and nothing is signed | B |
| **Gate 1, Fri 01:00** | M1 and M3 | two humans and a working device flow; else switch to the code flow on the engineer's laptop with the CLI waiting | B |
| M4 | Witness steps 1 to 4 | malicious V2 card lists the storage collision and the new `sweep`; clean V2c card shows "storage appended safely, one read-only function" | A, B |
| M5 | Fork probe (step 5) | renamed sweep in V2b is flagged as "can move 100% of vault USDC" | A |
| M6 | Approval page and card UI | a judge reads the card and understands the risk in five seconds (tested on someone outside the team) | C |
| **Spine, Fri 09:00** | agent tries V2, card appears, deny, proxy unchanged; approve V2c, upgrade lands | runs on Sepolia | all |
| M7 | IDKit enrollment | engineer 1 and 2 enrol; engineer 1's second laptop key is refused with "this person already holds a seat" | B, C |
| M8 | The agent and the prompt injection | the coding agent, given a release note with an injected instruction, retries with V2b; the card catches it | B |
| M9 | Replay against a tampered implementation | the approval for V2c replayed with a different implementation reverts with the codehash error | A |
| M10 | Fuzz property and suite counts | counts printed for the README | A |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M11 | `WORLD_DEBRIEF.md`, README, video | section 7 checklist of `00_common.md` | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold; vault behind a transparent proxy on a local chain | Register OIDC and IDKit apps; **M1 two mocked humans** | Card design on fixtures: three example cards (malicious, disguised, clean) |
| 22:00 to 01:00 | M2 gate and tests | M3 device flow | Approval page, deny and approve states |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M4 compile and compare, immutables masking | M4 layout diff with upgrades-core; card storage | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M5 fork probe | Sleep 07:30 to 11:30 | Wire approval page to the backend |
| **Fri 09:00** | **Spine** on Sepolia | | |
| 09:00 to 12:00 | M9; deploy and verify contracts on Sepolia | (from 11:30) M7 IDKit backend | M7 enrollment page; council dashboard |
| 12:00 to 16:00 | Sleep (start the M10 fuzz run first) | M8 agent and injected release note | Terminal styling for the agent pane; demo mode |
| 16:00 to 18:00 | M10 counts | M8 rehearsal | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Security review of the gate; README contract table | Debrief writing; error paths in the backend | Copy pass; How-it-works page |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Pre-send the Sepolia upgrade transactions; record fallbacks | Re-authenticate both mocked humans; check token lifetimes | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README limits | Debrief final | README layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30; **re-authenticate both phones minutes before the slot** | | |

**Pivot rule.** Only one mocked human by Fri 01:00: the wrong-person beat dies; keep the replay-against-tampered-implementation beat (needs no second human); IDKit enrollment still shows the same-human refusal. If the witness compile-and-compare breaks by Fri 09:00, pivot to **Breakglass** (`ideas/world.md` rank 2) on the same gate and backend: the agent may only make things safer. **Cut order:** Chainlink option, then the fork probe's stranger caller, then the council dashboard; never the card or a failed path.

## 8. Pre-event checklist

- [ ] Read every page of the Agent Pass docs (step-up, human-in-the-loop, OIDC, device flow) and the IDKit integrate and verification-flows pages.
- [ ] Create the World developer accounts; find out whether client registration needs approval (World question 1).
- [ ] World Discord, then the 17:30 Room 1 workshop (B attends; A goes to 1inch only if no 1inch idea is in play): questions 1, 2, 4, 6, 7 in `ideas/world.md` section 9. The deciding ones: two distinct stable `sub` values from mocked identities; can one project place in both World tracks; is "backend attestation plus an IDKit-enrolled key" acceptable for R4; is a coding agent running a deploy script "agentic" enough.
- [ ] Sepolia ETH on three wallets; two phones with World App or whatever the mocked flow needs.
- [ ] Not allowed before 21:00: the gate, the witness, the card design, the vault variants.

## 9. Test plan

- **Unit:** each named revert of the gate and the council.
- **Fuzz:** the property in section 5, plus fuzzed approval fields (each single-field change must revert).
- **Witness tests:** fixtures of the three V2 variants with expected cards; a test that a metadata-only difference does not fail the compare; a test that an immutable difference does not fail it either.
- **Backend tests:** expired device code, reused device code, wrong `sub`, missing `acr`, token for another client.
- **Fixtures:** compiled artifacts and layouts of each variant, the Sepolia deployment record, pre-sent upgrade receipts, recorded phone screens.

## 10. Demo

**20 second hook (C).** "Drift lost $295M to a proxy upgrade. Our agent ships code all day and holds the deploy key. This upgrade adds a function that can empty the vault. Watch the engineer's phone say so in plain words, and the chain refuse until a real person says yes."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | The Drift line; the agent's terminal with full deploy rights on Sepolia; the vault with real test deposits | none |
| 0:25 | **The moment:** the agent runs its upgrade; the card appears by 0:30 ("this upgrade adds a function that can empty the vault", "this upgrade overwrites where balances are stored"); the engineer denies on the phone; the proxy is unchanged. Lands by 0:55 | recorded clip of the same run |
| 1:00 | An injected "release note" makes the agent retry with `sweep` renamed; the card catches it again (fork probe line) | recorded |
| 1:40 | The clean build is approved and lands; the same approval replayed against a tampered implementation reverts | pre-sent receipts |
| 2:20 | IDKit, short: a second laptop key for the same engineer is refused | recorded |
| 2:50 | Foundry counts (replay, expiry, wrong hash, wrong approver, forged signature) and limits | slide |

"Proxy" is said once; "OIDC" never. The two-signature rule and the nullifier are for Q and A.

**Video (2:00 to 2:59).** Hook; card and denial within the first 40 seconds; the disguised retry; the clean approval landing; the replay failing; the second-key refusal with the one-sentence credential argument; the test counts; end card.

## 11. README draft

Order: promise; the card screenshot; quick start; how it works (diagram); the gate's rules; the witness (what it checks and what it cannot see: a malicious function that only misbehaves under conditions the fork probe did not reach); failed paths table (deny, expiry, wrong human, tampered implementation, second key) each with a test name and a Sepolia tx; **World Agent Pass section** (request, completion, validated result, protected action mapped to files and lines; where the client secret lives; the device flow note that it ignores `max_age` but "already requires fresh authentication"); **IDKit section** (the trust event, why Proof of Human is the minimum: distinctness only; why not Selfie Check, which is medium assurance for a seat that controls upgrades; why not Passport, which over-collects and dual nationals hold two; honest limit: distinct humans do not stop a lying signing UI or a person renting their identity); prior art (Airlock, Commitment Issues, Surety, Axis) named as the pattern being extended; `WORLD_DEBRIEF.md` link; AI usage; licence.

`WORLD_DEBRIEF.md` (required for both tracks): time to first success for Agent Pass and for IDKit, each friction point with a timestamp as it happened, missing capability or docs (for example a way to show the pending action on World's prompt), and the one improvement with the greatest impact.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Agent terminal pane | A styled terminal (large mono font) where the agent's run and the gate's challenge appear, with the code and link printed big | waiting for approval shows a live countdown to device-code expiry |
| Upgrade card (approval page) | Title "VaultV2 wants to replace the code that holds 12,400 USDC". Three to five findings, each one plain sentence with a severity icon: "Adds a function that can move all funds out", "Overwrites where balances are stored", "Code you deployed matches the code you showed us". Under each, a technical line (slot numbers, selector, codehash). Two buttons: Deny (default focus) and Approve on World ID | clean card: green, "Storage appended safely. One new read-only function." |
| Result | Verdict card: "Upgrade refused. Proxy unchanged." with the tx or the revert; or "Upgrade landed" with the tx | expired, denied, wrong person, tampered: each its own sentence |
| Enrollment (IDKit) | "Take a seat on the upgrade council", why Proof of Human (one sentence), the IDKit widget | refused second key: "This person already holds seat 1. One person, one seat." |
| Council dashboard | Seats, last approvals, pending requests | empty state explains how to enrol |

Copy: the card never says "proxy", "OIDC", "selector" or "slot" outside the technical lines. Deny is the visually primary button.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Only one mocked human | Gate 1 | Keep the tampered-implementation replay; drop wrong-person beat; or Breakglass |
| Requested `sub` not honoured in the device flow | M3 | Code flow on the engineer's laptop, CLI polls our API |
| World says one project places in one track only | workshop | Enter Agent Pass alone; keep enrollment as a feature |
| Mocked session expires before the slot | Sat morning | Re-authenticate both phones minutes before going on |
| Agent run is not deterministic on stage | rehearsal | Scripted replay of the agent's commands with the real gate and backend; say so if asked |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Isn't this a multisig with extra steps?" | A multisig signer sees a hash. Our approver sees what the new code does to the money, computed from our own compile and a fork, not from whoever proposed it | card |
| "The backend can sign anything." | Yes, so the gate also needs the engineer's own enrolled key over the same approval; the backend alone cannot upgrade | two-signature test |
| "How do you know the deployed code matches the source?" | We compile it ourselves and compare runtime code with immutables masked and metadata stripped | witness output |
| "What if the malicious path only triggers later?" | The fork probe catches value moving now; time bombs need deeper analysis, and the README says so | limits |
| "Why World ID and not a hardware key?" | The key proves possession; Agent Pass proves a fresh, named human acted now, and IDKit stops one person holding two seats | IDKit section |
| "Why Proof of Human and not Selfie Check?" | The seat controls code that holds money; Selfie Check is medium assurance with a Sybil score, fit for small benefits | README table |
| "Is the coding agent really agentic?" | It plans and runs the deploy itself; the gate does not care how smart it is, which is the point | agent pane |
| "What about the Drift details?" | We use the public classification, "proxy upgrade hijack"; the gate removes the single key that can upgrade | slide |

## 15. AI usage

Follow `00_common.md` section 8. A writes the gate and its tests by hand. The demo agent itself is an AI coding agent by design; its task file and the injected release note are committed in `agent/` so judges can see exactly what it was told.
