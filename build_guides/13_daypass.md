# 13 Daypass: build guide

New idea (2026-11-01), not from the harness lists (a search of `track_ideas/`, `reports/` and `plans/` found no blind-token or rate-limit idea for Anon-RPC). Tracks: EF "Best Use of Anon-RPC" (lead) and World "Best Use of IDKit" (second partner, same story). Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** Anonymous RPC has an abuse problem. Everyone using Tor shares a few exit IPs, so an RPC provider cannot tell one abuser from everyone else. Providers block the exit, and every honest anonymous wallet breaks with it. Daypass gives every human a daily allowance of anonymous RPC calls. Once a day the user does a quick World ID Selfie Check. Our issuer then signs a batch of tokens it never sees, using RFC 9474 blind signatures. Each RPC request carries one token through Anon-RPC to a Daypass gateway in front of the provider. The gateway checks the token and that it is unspent, then forwards the request. The provider can cap abuse per human per day and still learns nothing about who anyone is: the issuer cannot link tokens to the person, the gateway cannot link tokens to each other, and Tor hides the IP.

**The problem in one line.** "Shared exit IPs get blocked by RPC providers (Kiwi News fails over to another provider)" (repo `README.md`, Anon-RPC known limits). Anonymous means unaccountable, and unaccountable gets blocked.

**Falsifiable promise.** "With Daypass, an abuser on the same Tor exit is cut off after one allowance while honest wallets keep working. The issuer cannot say which tokens it issued to whom, the gateway cannot link two tokens, one person cannot get two passes on one day, and every read and send in the demo app goes through Anon-RPC."

**Prize stack (two partners, one story).**

| Prize | Verbatim requirement (Facts, [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), [World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | How this build meets it |
|---|---|---|
| EF "Best Use of Anon-RPC" ($2,500 / $1,500 / $1,000) | "Use Anon-RPC as an app that consumes it, or produces anonymity via a new Anon-RPC worker, or both."; judging "works end to end in the demo", "quality of user experience in demo", "how much of the app's traffic goes through Anon-RPC (if an app)", "if you choose to exclude some traffic as an intentional performance/anonymity tradeoff instead of implementation difficulty, that can be a good thing, just let us know", "could this be shipped for real after the hackathon", "technical depth"; qualification "Your app routes its RPC reads through Anon-RPC by default." | The demo wallet sends 100% of reads, sends and pass issuance through Anon-RPC (tor-js). The one exclusion is World ID's own flow, stated. Shippable: any provider can run the gateway in front of its RPC. Depth: blind signatures, a daily key and spent set, and pass size from the Sybil score |
| World "Best Use of IDKit" ($1,250 x 2) | "Integrate IDKit in a functioning application, mini app, or onchain flow."; "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate."; "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance."; "Demonstrate a successful verification and one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user."; debrief. "We are not rewarding the most credentials used." | Trust event: handing out today's allowance of a shared, abusable resource. Credential: Selfie Check (Proof of Presence), verified on our server. Alternative paths: a second pass on the same day is refused; a high Sybil risk score gets a small pass; cancellation leaves the wallet on the slow public lane |

Judgement: two partners, one promise ("anonymous, but abuse has a ceiling"). EF places the project in at most one EF prize; Anon-RPC is the natural one.

## 2. Architecture

```
  [demo wallet, browser]  Anon-RPC worker (tor-js, hash pinned by the specifier)
        |  1. IDKit Selfie Check, action "daypass-YYYY-MM-DD" ---> World ID app
        |  2. proof + blinded token batch --(worker.fetch over Tor)--> [issuer]
        |                                   POST /api/v4/verify/{rp_id}; nullifier unused today?
        |                                   Sybil band -> pass size; blind-sign with today's key
        |  3. unblind locally; tokens kept in IndexedDB
        |  4. each JSON-RPC request: worker.fetch(gateway, header Daypass-Token) over Tor
        v
  [gateway]  verify token with today's public key; unspent? mark spent; forward upstream
             no token -> 402 with "get today's pass"; spent -> 409; wrong day -> 401
        v
  [upstream RPC]  our own key on a commercial provider (the provider's view)

  [abuser script]  no pass -> 402; one pass -> stops after its allowance; honest wallets unaffected
```

**Components in plain English.**
- **Issuer** (Hono): signs the IDKit request (`rp_context`) with the RP signing key held as a secret. It forwards the IDKit payload as-is to World's verify endpoint, rejects a nullifier already used for today's action, and reads the Sybil score. It then blind-signs up to the pass size of tokens. It stores only today's nullifiers and a counter per nullifier, never token values.
- **Gateway** (Hono reverse proxy): verifies each token's signature with today's public key, keeps a spent set per day, forwards to the upstream RPC, and publishes its public keys at `/.well-known/daypass`. It logs method, token status and timing, never identity (it has none).
- **Client library** (TypeScript): blinds, unblinds and stores tokens, and attaches one per HTTP request. It is a viem transport whose `fetchFn` is the Anon-RPC worker's fetch with a token header added, and it fails closed: no worker or no token means an error, never a direct request.
- **Demo wallet:** balances, token list and send on Sepolia, with a "Today's pass: 4,812 calls left" meter.
- **Provider dashboard:** requests served, tokens spent, refusals by reason, and the IPs seen (all Tor exits).

## 3. Repo layout and scaffold

```
daypass/
  packages/client/   blind and unblind, token store, viem transport over the Anon-RPC worker
  issuer/            Hono: rp_context signing, IDKit verify, nullifier per day, blind signing
  gateway/           Hono: token verify, spent set, upstream proxy, public keys, dashboard API
  app/               demo wallet, pass flow, provider dashboard
  scripts/           abuser script (rate limited, our gateway only), load test, privacy check
  WORLD_DEBRIEF.md
```

At 21:00: common scaffold; `npm i @cloudflare/blindrsa-ts@0.4.6` in issuer, gateway and client; `npm i @anon-rpc/browser-harness@0.4.0 @worldcoin/idkit@4.6.0` in app; `npm i hono@4.13.14 @worldcoin/idkit-core@4.6.0` in issuer. Register the IDKit app in the [Developer Portal](https://developer.worldcoin.org) in the first hour; timestamp in `WORLD_DEBRIEF.md`.

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Anon-RPC | `@anon-rpc/browser-harness` 0.4.0; integration is "construct `AnonRpcWorker`, then pass `worker.fetch` wherever a custom fetch is accepted"; viem `http()` accepts `fetchFn`; tor-js specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e` | Fact (`research_notes/EF tracks and Whitechain ideas/anon_rpc.md`; npm 2026-11-01) |
| Headers through the worker | spec 0.4.0 forwards fetch-init entries; tor-js terminates TLS inside the worker, so the token header travels inside TLS to our gateway | Fact for the spec (`anon_rpc.md`); header pass-through on tor-js (verify in hour 1) |
| Latency | tor-js p50 about 0.8 to 1.2 s, boot about 8 s | Fact (official bench via `anon_rpc.md`) |
| Blind signatures | RFC 9474 RSA blind signatures; `@cloudflare/blindrsa-ts` 0.4.6 | Fact (npm 2026-11-01); the RFC variant to pin (verify) |
| Selfie Check | returns `nullifier`, `sybil_score` and `integrity_bundle`; docs example action is date-stamped (`selfie-check-2026-09-02`); "The same person verifying the same action always produces the same nullifier"; one-time checks store nullifiers with `UNIQUE (nullifier, action)` | Fact ([IDKit integrate](https://docs.world.org/world-id/idkit/integrate), read 2026-11-01) |
| Sybil score | integer-like 0 to 10, recalculated at enrollment and renewal; "It is a risk signal, not a uniqueness verdict"; "Choose and validate your own thresholds"; Selfie Check "does not provide a strict one-person-one-account guarantee" | Fact ([Selfie Check](https://docs.world.org/world-id/credentials/11)); which end of the scale is riskier (verify with World) |
| Server verify | `POST https://developer.world.org/api/v4/verify/{rp_id}`, "Forward the IDKit result payload as-is"; check `environment`; "Never generate RP signatures on the client" | Fact (IDKit integrate) |
| Proofs at the event | "We are mocking proofs now" | Fact (World prizes) |

## 5. Core algorithms in plain English

**Daily key.** The issuer makes a fresh RSA key pair per day and publishes the public key with its date. Tokens are valid only on their day, so the spent set resets daily and stays small.

**Getting today's pass.**
1. The wallet generates the batch locally: N random 32-byte token values, each blinded under today's public key.
2. The user completes Selfie Check with action `daypass-YYYY-MM-DD`; the signal binds a hash of the blinded batch, so a proof cannot be reused for another batch.
3. The wallet sends the proof and the blinded batch to the issuer through `worker.fetch`, so the issuer never sees the user's IP either.
4. The issuer verifies with World, checks the nullifier is unused for today, maps the Sybil score to a pass size (for example 5,000, 500 or 0 calls by band, thresholds set and stated on the day), and blind-signs that many.
5. The wallet unblinds and stores the tokens, and waits a random few seconds before the first use, so the time of issuance does not line up with the first spend.

**Spending.** One token per HTTP request; a JSON-RPC batch of up to 20 calls counts as one request. The gateway verifies the signature, refuses spent or wrong-day tokens, records the token as spent, and forwards.

**Who learns what.**

| Party | Learns | Does not learn |
|---|---|---|
| World | that someone verified for our app's action today | your RPC requests, your addresses |
| Issuer | today's nullifier and how many tokens it signed for it; a Tor exit IP | the token values, so it cannot link any request to you |
| Gateway | the request contents, a valid token, a Tor exit IP | who you are, which other tokens are yours |
| Upstream RPC | the requests, coming from our gateway | your IP, your pass |
| Tor exit | traffic to our gateway, inside TLS | contents |

Honest limit: requests sent over one Tor circuit share an exit IP, so the gateway can group them by IP. `isolationKey` is not honoured by any merged worker (Fact, `anon_rpc.md`), and the README says so.

**Abuse model.** One human gets one pass a day. Sharing or selling a pass is possible, like a day ticket, but the total abuse capacity is bounded by verified humans times the pass size. The abuser script runs only against our own gateway at a modest rate. Never load-test the public Tor network or the tor-js demo gateways.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Worker to our gateway | a page request through tor-js reaches our gateway with a custom header intact; the gateway logs a Tor exit IP | B (hours 1 to 2) |
| M2 | Blind token round trip | browser blinds, server signs, browser unblinds, gateway verifies; tampered and wrong-day tokens fail | A |
| M3 | Selfie Check verified on the server | a mocked Selfie Check proof verified via the v4 endpoint; nullifier stored for today; second attempt refused | B |
| **Gate 1, Fri 01:00** | M1 and M3 | header through tor-js and a verified proof; else pivot rule | A, B |
| M4 | Gateway spent set and refusals | 402, 409 and 401 each reachable; upstream forwarding works | A |
| M5 | Client transport | viem reads through the worker with tokens; fails closed without either | B |
| **Spine, Fri 09:00** | verify once, 100 reads through Tor with tokens, abuser refused | dashboard counts match | all |
| M6 | Demo wallet and pass flow | a new user gets a pass and sees balances in under a minute (after Tor boot) | C |
| M7 | Abuse beat and provider dashboard | "IP mode" blocks the exit for everyone; "Daypass mode" cuts only the abuser | A, C |
| M8 | Pass size from the Sybil band | three bands produce three pass sizes; the README explains the thresholds | B |
| M9 | Measurements | tokens per second at the gateway, added latency per request, Tor p50 in our runs | A |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M10 | Debrief, README with CROPS and IDKit sections, video | `00_common.md` section 7 checklist | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold; daily key generation | Register IDKit app; **M1 worker to gateway** | Design system; wallet and pass screens on fixtures |
| 22:00 to 01:00 | M2 blind round trip | M3 Selfie Check on the server | Pass flow states; meter component |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M4 spent set and refusals | M5 transport | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | Upstream forwarding; key publication | Sleep 07:30 to 11:30 | Wallet wired to the transport |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M7 abuser script and IP mode | (from 11:30) M8 Sybil bands | Provider dashboard |
| 12:00 to 16:00 | Sleep (start the M9 load run first) | Issuance over the worker; jitter | Demo mode keys; How-it-works diagram |
| 16:00 to 18:00 | M9 numbers | Rehearsal | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Security read of issuer and gateway; privacy table check | Debrief; error paths | Copy pass |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Warm Tor boot on the demo laptop; record fallbacks | Re-verify mocked identity; fresh day key if past midnight UTC (verify which clock) | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README limits | Debrief final | README layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30 | | |

**Pivot rule.** If the token header does not survive tor-js by Fri 01:00, put the token in the JSON-RPC request body as an extra field the gateway strips, or in the URL path, and say so. If Selfie Check cannot be verified at all, use Proof of Human for the demo and argue in the README that Selfie Check is the right production choice: an honest note beats a broken flow. **Cut order:** Sybil bands (fixed pass size instead), issuance over the worker (state it), measurements; never the fail-closed transport, the abuse beat or the second-pass refusal.

## 8. Pre-event checklist

- [ ] Read the Anon-RPC SPEC 0.4.0, the wallet guide, the tor-js README; RFC 9474; the IDKit integrate, credentials and Selfie Check pages.
- [ ] Run the official Anon-RPC demo page from home and time the tor-js boot on each laptop.
- [ ] EF Discord and EF workshop (Thu 17:00, Room 2): does a gateway plus client library count as "produces anonymity" or as an app; is excluding World ID's own flow fine as a stated trade-off.
- [ ] World Discord and workshop (Thu 17:30, Room 1): which end of the Sybil score is riskier; does Selfie Check support daily actions with mocked proofs; can one project enter Anon-RPC and IDKit.
- [ ] A VPS with a TLS certificate for the gateway, reachable from Tor exits.
- [ ] Not allowed before 21:00: issuer, gateway, client, screens.

## 9. Test plan

- **Unit:** blind, sign, unblind, verify; tampered token; wrong-day token; double spend; batch size limits.
- **Issuer:** reused nullifier on the same day; new day accepted; proof with a signal that does not match the batch; `environment` mismatch.
- **Gateway:** 402, 409, 401; upstream error passes through as an error, never as success.
- **Client:** fail closed when the worker is down, when tokens run out, when the gateway is unreachable.
- **Privacy check script:** issuer log and gateway log side by side contain no common value.
- **Fixtures:** recorded Tor boot, dashboard screenshots, abuser runs in both modes.

## 10. Demo

**20 second hook (C).** "Anonymous RPC has a problem: on a Tor exit, one abuser looks like everyone, so providers block the exit and every private wallet breaks. Daypass gives every human a daily allowance. Providers can stop abusers without ever knowing who anyone is."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Hook; provider dashboard in "IP mode" | none |
| 0:20 | Today's reality: the abuser script floods; the provider blocks the exit; the honest wallet next to it errors | recorded |
| 0:50 | **The moment:** switch to Daypass; the honest user does a Selfie Check once; "Today's pass: 5,000 calls"; balances load through Tor; the dashboard shows tokens and Tor exits, no identity | recorded clip |
| 1:40 | The abuser with no pass gets 402; with one pass, it is cut off after its allowance; the honest wallet keeps working | recorded |
| 2:20 | The same person asks for a second pass today: refused, same nullifier | recorded |
| 2:40 | The privacy table: issuer log and gateway log share nothing; 100% of the wallet's traffic went through Anon-RPC | slide |
| 3:10 | Numbers (added latency per request, gateway throughput), limits | slide |

**Video (2:00 to 2:59).** Hook; the blocked-exit problem in 20 seconds; the pass and the working wallet by 1:00; the abuser cut off; the second-pass refusal; the privacy table; end card.

## 11. README draft

Order: promise; dashboard screenshot; quick start (issuer, gateway, app); how it works (diagram); the "who learns what" table; traffic share (100% of reads, sends and issuance through Anon-RPC; the World ID app's own connection excluded and why); the abuse model with numbers; **IDKit section** (trust event: handing out today's allowance of a shared resource; why Selfie Check is the minimum: the resource is worth cents, so medium assurance with a Sybil score is proportionate; Proof of Human would shut out the people who most need private access, since most have never seen an Orb; Passport over-collects for a rate limit; honest limit: Selfie Check is not strict one-person-one-account, so the pass size is set by the Sybil band); `WORLD_DEBRIEF.md`; limits (circuit linkability, pass resale); AI usage; licence.

**CROPS section (draft lines).**
- **C:** the gateway is ours, and if it refuses you the wallet falls back to the public lane, slower and stated. Anyone can run an issuer and a gateway from the repo.
- **O:** MIT; the repo runs issuer, gateway and app with no service accounts beyond World's developer portal.
- **P:** the table above.
- **S:** tokens are bearer tokens in your browser; losing them costs you one day's calls. No keys or personal data leave the device except the World ID proof.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Pass card | "Today's pass: 5,000 private calls" with a meter and a reset time | no pass yet, issuing, active, low, used up (public lane), refused today |
| Get a pass | One sentence: "A quick selfie check proves you are a person. We never learn which calls are yours." The IDKit button | cancelled (stays on public lane), second pass today refused, small pass with a one-line reason |
| Wallet | Balances, tokens, send; a small "via Tor" badge on every request row | Tor booting (with the seconds left), offline, gateway down (fails closed, says why) |
| Provider dashboard | Requests served, tokens spent, refusals by reason, IPs seen (all exits), "identities known: 0" | IP mode versus Daypass mode toggle for the demo |
| How it works | The diagram and the who-learns-what table | none |

Copy: "private calls", "today's pass", "public lane". Never "blind RSA", "nullifier" or "Sybil" outside the technical drawer.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Header lost in tor-js | M1 | Token in the body or path |
| Selfie Check not available with mocked proofs | M3 | Proof of Human for the demo, argument kept in the README |
| Tor boot slow on stage | rehearsal | Warm worker before the slot; boot time shown honestly |
| Gateway VPS blocked or down | demo | Second VPS; recorded runs |
| Sybil score direction unclear | workshop | Fixed pass size; bands described as future work |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Can't the issuer link tokens to the person?" | It signs tokens it cannot see; that is what a blind signature is | diagram |
| "Can passes be shared or sold?" | Yes, like a day ticket; abuse is still capped per verified person per day | abuse model |
| "Why Selfie Check, not Orb?" | The resource is cheap. Orb would exclude most people who need private access; Selfie Check with a Sybil score is proportionate | IDKit section |
| "Why not just pay per call?" | Payment links identity unless it is itself private; a daily human allowance works for people with no crypto yet | README |
| "Does the gateway still see my addresses?" | Yes, as any RPC does; it does not know whose they are, and Tor hides the IP. Calls on one circuit can be grouped; we say so | who-learns-what table |
| "Would providers deploy this?" | It is one reverse proxy in front of an existing RPC, open source, and it lets them stop blocking Tor | gateway folder |
| "Latency?" | Tor adds about a second per call at p50; the token check adds well under a millisecond (our measured number on screen) | numbers slide |
| "What does World learn?" | That someone verified for our app's daily action; nothing about RPC use | privacy table |

## 15. AI usage

Follow `00_common.md` section 8. A writes the token verification, the spent set and the issuer's nullifier logic by hand. The blind signature library is a public package; we do not reimplement the cryptography.
