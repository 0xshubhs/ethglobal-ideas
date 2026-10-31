# 14 Ghostproof: build guide

New idea (2026-11-01), not from the harness lists (no package-publishing idea exists in `track_ideas/`, `reports/` or `plans/`). Track: World "Best Use of IDKit". Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** An npm release counts only if the package's enrolled maintainer did a fresh World ID Selfie Check bound to that exact tarball. The maintainer runs `ghostproof publish` and gets an approval page on their phone. The page shows what changed in plain words, with new install scripts in red. A Selfie Check with the release's hash as the signal follows, and the backend checks it is the same person who enrolled. The attestation is written onchain. Consumers run `ghostproof verify` in CI or before install, and it refuses any locked version of an opted-in package that has no attestation. A stolen token, or a worm holding one, can still push to npm, but nobody using Ghostproof will install what it pushed. The registry does not need to cooperate.

**The problem in one line.** In September 2025 the Shai-Hulud worm stole npm tokens and used them to republish its victims' other packages with itself inside, hitting more than 180 packages ([Help Net Security](https://www.helpnetsecurity.com/2025/09/16/self-replicating-worm-hits-180-npm-packages-in-largely-automated-supply-chain-attack/)). No person was needed at any step. For crypto, a poisoned frontend dependency is a wallet drainer: the Ledger Connect Kit incident (December 2023) shipped one through a phished npm account (verify the figures before quoting).

**Falsifiable promise.** "A release of an opted-in package passes `ghostproof verify` only if an enrolled maintainer did a fresh Selfie Check bound to that release's tarball hash. A stolen token alone, someone else's World ID, an approval for a different tarball, and a cancelled approval all produce a version that consumers refuse."

**Prize stack (one partner).**

| Prize | Verbatim requirement (Facts, [World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | How this build meets it |
|---|---|---|
| World "Best Use of IDKit" ($1,250 x 2) | "Build a product that uses IDKit to solve a real trust moment: an event where a product needs to know something meaningful about a person before it grants access, completes an action, or changes a user's experience."; "Integrate IDKit in a functioning application, mini app, or onchain flow."; "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate."; "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance."; "Demonstrate a successful verification and one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user."; debrief. "We are not rewarding the most credentials used." and the strong example "recovery or protection of an important account action" | Trust event: a release that thousands will install is about to become real. Credential: Selfie Check (Proof of Presence), verified on the server, attested onchain. Alternative paths: worm with a stolen token, wrong person, approval for a different tarball, cancelled after seeing a new install script |

Judgement: one partner. Agent Pass is not entered: this is a trust moment with a credential choice, not an agent approving its own work.

## 2. Architecture

```
  maintainer laptop: ghostproof publish
     npm pack -> tarball + integrity hash + file list
     diff against the last attested version: new files, changed install scripts, new dependencies
        |  pending release id -> approval link and QR
        v
  [approval page, phone]  "left-pad-demo 1.0.2: 3 files changed, no install scripts, 1 new dependency"
        |  IDKit Selfie Check, action "maintainer:left-pad-demo", signal = hash(name, version, integrity)
        v
  [backend, Hono]  rp_context signing; POST /api/v4/verify/{rp_id}; signal matches the pending release?
        |          nullifier is an enrolled maintainer of this package?
        v
  [ReleaseRegistry, Sepolia]  attestation (package, version, integrity, time, maintainer slot)
        v
  ghostproof publish continues: npm publish of that exact tarball file

  consumer CI: ghostproof verify
     package-lock.json -> for each opted-in package, locked integrity attested onchain? else fail

  worm: stolen token -> npm publish 1.0.1 with a postinstall
     our Verdaccio registry: refused at publish;  public npm: published, but every verify refuses it
```

**Components in plain English.**
- **ReleaseRegistry contract:** for each package it stores the maintainer slots (hashes of nullifiers), an opt-in flag and the attestations: version, tarball integrity hash, time, approving slot. Only the attester key (our backend) can write. Adding or removing a maintainer needs an attestation backed by a fresh proof from an existing maintainer. Anyone can read.
- **Enrollment (bootstrap):** `ghostproof enroll <package>` gets a one-time code from the backend. The maintainer proves npm control by adding a dist-tag named with that code to an existing version, which needs publish rights and creates no new version (verify that dist-tags are readable from the registry document). The maintainer then does a Selfie Check with action `maintainer:<package>`, and the nullifier becomes slot 1. This is trust on first use, stated in the README.
- **Backend:** signs the IDKit request (`rp_context`) with the RP key held as a secret. It verifies the proof through World's v4 endpoint and checks the signal equals the hash of the pending release. It also checks the nullifier equals an enrolled slot: the same person on the same action always gives the same nullifier, so here a match is required rather than a repeat being refused. Then it writes the attestation.
- **CLI:** `enroll`, `publish` (pack, diff, approval, then `npm publish` of the exact file) and `verify` (lockfile against the registry).
- **Demo registry:** Verdaccio 7.0.2 with a small plugin that refuses a publish whose tarball integrity has no attestation. This shows what a registry could enforce; `verify` works on public npm without it.

## 3. Repo layout and scaffold

```
ghostproof/
  contracts/      ReleaseRegistry, Foundry tests and fuzz
  backend/        Hono: rp_context, IDKit verify, enrollment codes, attester
  cli/            enroll, publish, verify
  app/            approval page (mobile), package page, enrollment page
  registry/       Verdaccio config and the attestation plugin
  demo/           demo package, consumer project, worm script (local registry only)
  WORLD_DEBRIEF.md
```

At 21:00: common scaffold; backend `npm i hono@4.13.14 @worldcoin/idkit-core@4.6.0 viem@2.57.13`; app `npm i @worldcoin/idkit@4.6.0`; registry `npm i verdaccio@7.0.2`. Register the IDKit app in the [Developer Portal](https://developer.worldcoin.org) in the first hour; timestamp in `WORLD_DEBRIEF.md`.

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Selfie Check | "A medium-assurance biometric credential using the device camera for liveness and facial similarity"; returning users do a camera check to "Confirm a returning user is the same person who originally enrolled"; responses carry `nullifier`, `sybil_score`, `integrity_bundle` | Fact ([Selfie Check](https://docs.world.org/world-id/credentials/11); [IDKit integrate](https://docs.world.org/world-id/idkit/integrate), read 2026-11-01) |
| Nullifiers | "The same person verifying the same action always produces the same nullifier"; one-time checks store `UNIQUE (nullifier, action)`; returning users can use session proofs with a `session_nullifier` | Fact (IDKit integrate). Whether repeat proofs for one action or session proofs fit best (verify at the workshop) |
| Signal | binds context into the proof; "Your backend should enforce the same value" | Fact (IDKit integrate) |
| Server verify | `POST https://developer.world.org/api/v4/verify/{rp_id}`, payload forwarded as-is, `environment` checked; RP key never on the client | Fact (IDKit integrate) |
| Proofs at the event | "We are mocking proofs now" | Fact (World prizes) |
| Packages | `@worldcoin/idkit` and `@worldcoin/idkit-core` 4.6.0; `verdaccio` 7.0.2; `hono` 4.13.14; `viem` 2.57.13 | Fact (npm, 2026-11-01) |
| npm | `npm pack --json` reports the tarball integrity; dist-tags need publish rights | (verify both on the day) |
| Chain | Ethereum Sepolia | Fact |

## 5. Core algorithms in plain English

**Release diff (shown on the approval page).** Compare the new tarball with the last attested one: files added, removed and changed; any change to `preinstall`, `install` or `postinstall` scripts (red, top of the page, because install scripts are how a worm runs on every machine that installs it); new or changed dependencies; size change. First release: everything is new, said plainly.

**Approval.**
1. CLI packs, hashes, diffs, registers a pending release with the backend, shows a link and QR.
2. The phone page shows the diff summary and "Approve with Selfie Check" or "Cancel".
3. IDKit runs Selfie Check with action `maintainer:<package>` and signal = hash(name, version, integrity).
4. Backend verifies with World, checks `environment`, checks the signal is the pending release's hash, and checks the nullifier hashes to an enrolled slot of this package.
5. Backend writes the attestation; the CLI sees it onchain and publishes that exact tarball file.

**Verify.** For each entry in the lockfile, look up the package in ReleaseRegistry. Not opted in: skip and report "not covered". Opted in: the locked integrity must match an attestation, or the check fails with the version, and its install scripts are named. The output is a short table and an exit code for CI.

**Fuzz property.** For any sequence of registry calls, a version is attested only by the attester key, only for a package with at least one slot, and maintainer changes happen only through an attestation from an existing slot.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Selfie Check end to end | a mocked Selfie Check verified on the server; the same identity twice on one action gives the same nullifier; a second identity gives a different one | B (hours 1 to 3) |
| M2 | ReleaseRegistry and tests | `test_attest_only_by_attester`, `test_attest_requires_slot`, `test_add_maintainer_needs_existing`, `test_remove_last_maintainer_reverts`, `test_opt_in_flag` | A |
| **Gate 1, Fri 01:00** | M1 | same nullifier for the same person, different for another; else pivot rule | B |
| M3 | Pack, diff and pending release | the diff of the demo package's three versions matches the expected summary | A |
| M4 | Approval page | a judge reads "adds a postinstall script" in five seconds | C |
| M5 | Attestation write and `publish` | approved release attested and published to Verdaccio | B |
| **Spine, Fri 09:00** | enroll, approve on the phone, attested, published, consumer `verify` passes | on Sepolia and the local registry | all |
| M6 | `verify` failure paths | worm version, wrong person, other tarball: each fails with its own message | A, B |
| M7 | Verdaccio plugin | worm publish refused at the registry | B |
| M8 | Enrollment by dist-tag | enrollment code checked against the registry document | B |
| M9 | Fuzz and counts | counts for the README | A |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M10 | Debrief, README, video | `00_common.md` section 7 checklist | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold; demo package with three planned versions | Register IDKit app; **M1** | Design system; approval page on fixtures |
| 22:00 to 01:00 | M2 registry and tests | M1 two identities; backend verify | Package page; enrollment page |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M3 pack and diff | M5 attester and CLI publish | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | Deploy registry to Sepolia | Sleep 07:30 to 11:30 | Approval page wired to the backend |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M6 verify failure paths | (from 11:30) M7 Verdaccio plugin | Verify output styling; CI screenshot |
| 12:00 to 16:00 | Sleep (start the M9 fuzz first) | M8 dist-tag enrollment | Demo mode keys; How-it-works page |
| 16:00 to 18:00 | M9 counts | Worm script on the local registry | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Security read of registry and backend | Debrief; error paths | Copy pass |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Pre-send attestations for the demo versions | Re-verify mocked identities | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README limits | Debrief final | README layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30 | | |

**Pivot rule.** If mocked Selfie Check gives no stable nullifier for repeat proofs on one action, try session proofs. If neither works by Fri 01:00, use Proof of Human for the demo (stable nullifier per action is documented) and keep the Selfie Check argument in the README as the production choice, said honestly. **Cut order:** Verdaccio plugin (verify alone is the product), dist-tag enrollment (manual enrollment, stated), fuzz counts; never the worm beat, the wrong-person refusal or the install-script warning.

## 8. Pre-event checklist

- [ ] Read the IDKit integrate, credentials, Selfie Check and verification flows pages; Verdaccio plugin docs; npm docs on `pack`, dist-tags, provenance and trusted publishing.
- [ ] World Discord and workshop (Thu 17:30, Room 1). Deciding questions: does a repeat Selfie Check on one action return the same nullifier with mocked proofs; are session proofs available for Selfie Check; can mocked proofs give two distinct people.
- [ ] Sepolia ETH on three wallets; two phones.
- [ ] Not allowed before 21:00: registry, backend, CLI, plugin, screens, the demo package.

## 9. Test plan

- **Unit:** each registry revert; attester rotation.
- **Fuzz:** the property in section 5.
- **Backend:** wrong signal, wrong package, unknown nullifier, `environment` mismatch, expired pending release, double approval.
- **CLI:** verify against a lockfile with one good, one unattested and one uncovered package; exit codes.
- **Fixtures:** the three demo versions and their diffs, recorded phone screens, Sepolia attestation links.

## 10. Demo

**20 second hook (C).** "Last year a worm stole npm tokens and used them to publish itself into more than 180 packages. It never needed a person. With Ghostproof a release only counts if its maintainer is present, on camera, right now, for that exact file."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Hook; the demo package and a consumer app that depends on it | none |
| 0:25 | **The moment:** the worm script uses a stolen token to publish 1.0.1 with a postinstall; the registry refuses; on public npm it would land, and the consumer's `ghostproof verify` fails: "1.0.1 was not released by a present maintainer" | recorded clip |
| 1:10 | The maintainer publishes 1.0.2: the phone page says "3 files changed, no install scripts"; Selfie Check; attested onchain; published; consumer verify passes | pre-sent attestation |
| 1:50 | A teammate tries to approve with their own World ID: refused, not an enrolled maintainer | recorded |
| 2:15 | A malicious 1.0.3 shows "adds a postinstall script" in red; the maintainer cancels; nothing attested | recorded |
| 2:45 | The credential table and the onchain attestation list | slide |
| 3:10 | Test counts, limits | slide |

**Video (2:00 to 2:59).** Hook; the worm refused inside 40 seconds; the real release; the wrong person; the red install-script warning; the credential argument in one sentence; end card.

## 11. README draft

Order: promise; screenshot of the failed verify; quick start (registry, backend, CLI, demo); how it works (diagram); failure paths table (stolen token, wrong person, other tarball, cancelled), each with a test and an onchain or CLI output; **IDKit section**:

| Credential | Why not, or why |
|---|---|
| Proof of Human | answers "is this a unique human", which we do not need; most maintainers cannot reach an Orb |
| Passport or Identity Check | names a legal identity; many maintainers are pseudonymous; over-collects |
| **Selfie Check (chosen)** | answers "is the enrolled maintainer present right now": liveness plus "the same person who originally enrolled". A token, a worm or a CI job cannot do a live camera check. We do not use the Sybil score: we are not counting people, we are checking one known person |

Then: honest limits (a maintainer fooled into approving at that moment, which the diff page fights; a coerced maintainer; Selfie Check is medium assurance; enrollment is trust on first use; the attester key is our backend); how this differs from npm provenance (provenance says which CI built it, not that a person approved it); `WORLD_DEBRIEF.md`; AI usage; licence.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Approval page (mobile) | Package and version large; three plain lines ("3 files changed", "no install scripts", "1 new dependency: x"); install-script changes in a red banner at the top; Approve with Selfie Check, Cancel | expired, already approved, cancelled, refused (not a maintainer) |
| Package page | Maintainer slots (no names), attested versions with chain links, unattested versions marked | not opted in, empty |
| Verify output (terminal) | A short table: package, version, ATTESTED or REFUSED or NOT COVERED, reason | all pass, some refused (exit 1) |
| Enrollment | Steps: get code, add dist-tag, Selfie Check | code expired, dist-tag not found |

Copy: "present", "release", "approve". Never "nullifier" or "signal" outside the technical drawer.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| No stable nullifier on repeat Selfie Check | Gate 1 | Session proofs, then Proof of Human with the argument kept |
| Only one mocked identity | M1 | Wrong-person beat via a second app id or a labelled fixture |
| Verdaccio plugin fights us | M7 | Cut; `verify` is the product |
| `npm pack` integrity format differs | M3 | Hash the tarball file ourselves and say so |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "npm already has 2FA." | Tokens for automation skip it, and the worm used tokens. Our check is bound to one tarball hash, so it cannot be reused for another file | worm beat |
| "What about npm provenance?" | Provenance says which CI built it. A compromised workflow still gets provenance; it never says a person approved | README |
| "Can Selfie Check be fooled?" | It is medium assurance, and we say so. The attacker here is automated: a worm cannot pass a live camera check | credential table |
| "Why onchain?" | Anyone can verify without trusting our server, and the attestation log is append only | attestation list |
| "What if your backend is hacked?" | It could attest; rotating the attester and k of n maintainers limit it, and onchain verification on World Chain would remove it | limits |
| "Pseudonymous maintainers?" | Selfie Check does not tell us who they are, only that the same person is present | IDKit section |
| "Who adopts first?" | Consumers: `verify` works on public npm today without npm's help | verify output |
| "Why not Proof of Human?" | We are not counting people; we check one known person, and the Orb would shut out most maintainers | credential table |

## 15. AI usage

Follow `00_common.md` section 8. A writes the registry and its tests by hand. The worm script is a harmless local simulation that only targets our own Verdaccio registry.
