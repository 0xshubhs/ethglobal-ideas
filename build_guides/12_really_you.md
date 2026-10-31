# 12 Really You: build guide

New idea (2026-11-01), not from the harness lists. Track: World "World ID Agent Pass". The backend and token checks reuse the plumbing described in `03_upgrade_council.md` section 5; the product is different. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** A company treasury pays new payees only after the named person asking for the payment passes a fresh World ID check, on their own phone, at that moment. Requests come into an AI finance agent through chat. When the "CFO" asks to pay a new address, the agent sends that person a check link. Only the enrolled CFO's World ID can pass it. A deepfake voice, a cloned face on a video call, a hijacked chat account or a SIM swap cannot. The treasury contract releases the money only with a backend approval bound to that exact amount and payee, so the agent cannot pay on its own even if it is tricked.

**The problem in one line.** In 2024 an Arup employee sent HK$200M across 15 transfers after a video call in which the CFO and colleagues were deepfakes ([SCMP](https://scmp.com/news/hong-kong/law-and-crime/article/3263151/uk-multinational-arup-confirmed-victim-hk200-million-deepfake-scam-used-digital-version-cfo-dupe)). The usual control, calling the requester back, fails when the call itself is the attack.

**Falsifiable promise.** "A payment to a new payee leaves the treasury only after the enrolled requester passes a fresh World ID check for that request. Someone else's World ID is refused, an unanswered check expires, a forwarded link lets the real person raise an alarm, and an agent told to skip the check gets a contract revert. In every failed path the treasury balance is unchanged."

**Prize stack (one partner).**

| Prize | Verbatim requirement (Facts, [World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | How this build meets it |
|---|---|---|
| World "World ID Agent Pass" ($2,500 / $1,500 / $1,000) | "Integrate with the official World ID Agent Pass."; "Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action."; "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur."; "Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization."; "Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact." Also "Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product." and "We are especially interested in agentic products" | Request: the agent's check link. Completion: the requester on World ID. Validated result: the backend checks the ID token and that `(iss, sub)` is the enrolled requester. Protected action: an onchain treasury payment. Failed paths: wrong person, expiry, "this isn't me", agent bypass, each with the balance unchanged. Client secret only on the backend. `WORLD_DEBRIEF.md` from hour one |

**Why it is not the crowded entry.** The obvious Agent Pass entries are "an agent spends, a human approves above a limit" (`track_ideas/ideas/world.md` section 1). Here the check is not on the agent's owner but on the person asking the agent for money, which is where real payment fraud happens. Tokyo's winners bound approvals to a payload or to the buyer (Airlock, Surety); none checked the requester of a money request.

## 2. Architecture

```
  [finance chat, our UI]  "Pay 50,000 USDC to 0xNew..., confidential"  (from "CFO")
        v
  [AP agent, LLM with tools]  create_payment_request -> send_check_link -> get_check_status -> execute_payment
        v
  [backend, Hono]  pending payment: id, amount, payee, requester role, expiry (3 min, our policy)
        |  device authorization (client secret here only) ----> auth.world.org
        |  check link -> our check page, which holds World's verification_uri_complete
        |  poll token endpoint; validate ID token: iss, RS256 via JWKS, aud, exp, acr, amr, auth_time
        |  (iss, sub) == enrolled requester? -> sign EIP-712 approval (id, payee, amount, token, expiry)
        v
  [check page, mobile]  "Finance is asking: are YOU requesting 50,000 USDC to 0xNew...?"
        |  Yes -> World ID (World's own link)      No, this isn't me -> alarm, request killed
        v
  [Treasury contract, Sepolia]  pays only with a valid approval: right signer, unused id,
                                not expired, exact payee and amount; otherwise a named revert
```

**Components in plain English.**
- **Treasury contract:** holds a test USDC (an OpenZeppelin ERC-20 we deploy). Its pay function takes a payment id, payee, amount, expiry and the backend's approval signature. It refuses when the signature is not from the approval signer, the id was used, the expiry passed, or the payee or amount differ from what was signed. Each refusal has its own named error. An admin can rotate the approval signer and set a daily cap.
- **Enrollment:** the CFO signs in once with World ID (authorization code flow with PKCE) while logged in to the finance app. The backend stores `(iss, sub)` against the role "CFO". The step-up guide says to "link it while the user is signed in" (Fact, [human-in-the-loop](https://auth.world.org/docs/guides/human-in-the-loop)).
- **Check:** the backend starts the device flow for each payment, optionally requesting the enrolled `sub`, and keeps the pending payment keyed by `device_code`.
- **Check page:** served by us. It shows the request in plain words and offers "Yes, continue to World ID" (opening World's `verification_uri_complete` exactly as given) or "No, this isn't me" (which kills the request and alerts the finance channel).
- **AP agent:** an LLM (Claude via the Anthropic API) with four tools. It never holds approval power: `execute_payment` only submits what the backend approved.

## 3. Repo layout and scaffold

```
really-you/
  contracts/      Treasury, test USDC, Foundry tests and fuzz
  backend/        Hono app: OIDC client, enrollment, device flow, token validation, approval signer
  agent/          tool definitions, system prompt, the injected email fixture
  app/            finance chat, check page, treasury page, enrollment page
  WORLD_DEBRIEF.md
```

At 21:00: common scaffold, `forge install OpenZeppelin/openzeppelin-contracts`, backend `npm i hono@4.13.14 openid-client@6.8.8 jose@6.2.14 viem@2.57.13`, agent `npm i @anthropic-ai/sdk` (pin the version on the day). Register the OIDC client in the [Agent Pass portal](https://auth.world.org/portal) in the first hour and write the timestamp into `WORLD_DEBRIEF.md`.

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Device flow | start `POST https://auth.world.org/api/v1/device_authorization`, poll `POST https://auth.world.org/api/v1/token`; response has `device_code`, `user_code`, `verification_uri`, `verification_uri_complete`, `expires_in`, `interval`; "Never build the approval link yourself"; the device code "expires 20 minutes after creation ... and can be redeemed once" | Fact ([OIDC guide](https://auth.world.org/docs/guides/oidc), read 2026-11-01) |
| Polling | `authorization_pending` keep polling; `slow_down` add 5 s; `access_denied`, `expired_token`, `invalid_grant` stop; HTTP 503 is "never approval" | Fact (same page) |
| Token checks | issuer exactly `https://auth.world.org`; RS256 from `jwks_uri`; `aud` is our client id; reject after `exp`; "Device tokens omit `nonce`"; `acr`, `amr`, `auth_time` "are required" for device tokens; identify the account by `(iss, sub)` | Fact (same page) |
| Same person | "A requested `claims.id_token.sub` value must match the authenticating account. A mismatch ends the request with `access_denied`", "including during device token polling" | Fact ([step-up guide](https://auth.world.org/docs/guides/step-up)); the OIDC page lists `claims` for `acr` only, so the backend compares `sub` itself either way (verify) |
| What World shows | the issuer "does not receive, display, or approve the pending business action"; `binding_message` is unsupported | Fact (human-in-the-loop guide; OIDC guide). This is why our check page exists |
| Proofs at the event | "We are mocking proofs now, so you don't need sandbox app anymore"; outside the event a sandbox issuer `https://sandbox.auth.world.org` and a sandbox World ID app exist | Fact ([World prizes](https://ethglobal.com/events/mumbai/prizes/world); [testing guide](https://auth.world.org/docs/guides/testing)) |
| Libraries | `openid-client` 6.8.8, `hono` 4.13.14, `jose` 6.2.14, `viem` 2.57.13 | Fact (npm, 2026-11-01) |
| Chain | Ethereum Sepolia | Fact |

## 5. Core algorithms in plain English

**Payment request.** The agent extracts payee, amount and claimed requester from the chat message and calls `create_payment_request`. The backend stores the pending payment with a 3 minute expiry (our policy; World's device code lives 20 minutes) and starts the device flow. The agent posts the check link back to the requester in the chat.

**Check.**
1. The requester opens our check page, sees "Are you requesting 50,000 USDC to 0xNew...?" and chooses Yes or No.
2. Yes opens World's `verification_uri_complete`. The person approves in World ID.
3. The backend polls at `interval`. On a token: verify signature against the JWKS, `iss`, `aud`, `exp`, `acr`, `amr`, `auth_time` (after the request started), then `(iss, sub)` against the enrolled requester.
4. Match: sign an EIP-712 approval over payment id, payee, amount, token and an expiry 5 minutes out; mark the request approved. Mismatch or `access_denied`: mark it refused, "this is not the CFO". Expiry: stop polling, mark it expired. No: mark it refused, alert the channel.
5. The agent's `execute_payment` sends the treasury transaction with the approval. Without one there is nothing to send.

**Agent bypass.** An email fixture contains hidden text telling the agent to skip the check and call `execute_payment`. Whatever the agent does, the treasury contract has no valid approval to accept and reverts.

**Fuzz property.** For any sequence of pay calls with mutated fields (payee, amount, id, expiry, signer), the treasury balance changes only by exactly the amount of an approval signed by the approval signer, once per id, before expiry.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Two mocked identities | two validated tokens with two distinct stable `sub` values, logged in the debrief | B (hour 1) |
| M2 | Treasury and tests | `test_pay_with_valid_approval`, `test_wrong_payee_reverts`, `test_wrong_amount_reverts`, `test_replay_reverts`, `test_expired_reverts`, `test_forged_signer_reverts` | A |
| M3 | Device flow and validation | link printed, approval returns a validated token, wrong `sub` refused, denial returns `access_denied`, nothing signed | B |
| **Gate 1, Fri 01:00** | M1 and M3 | two humans and a working check; else see pivot rule | B |
| M4 | Check page and "this isn't me" alarm | a judge understands the question in five seconds; No kills the request | C |
| M5 | Finance chat with a scripted requester | request, link, check, approval, payment, explorer link | B, C |
| **Spine, Fri 09:00** | wrong person refused, real person paid, on Sepolia | treasury balance before and after on screen | all |
| M6 | AP agent with four tools | the agent runs the whole flow from a chat message | B |
| M7 | Injected email | the agent tries to pay without approval; the contract reverts with its named error | A, B |
| M8 | Fuzz property and counts | counts printed for the README | A |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M9 | `WORLD_DEBRIEF.md`, README, video | `00_common.md` section 7 checklist | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold; test USDC and treasury skeleton | Register the OIDC client; **M1 two mocked identities** | Design system; chat, check page and verdict cards on fixtures |
| 22:00 to 01:00 | M2 treasury and tests | M3 device flow and token validation | Check page states; enrollment page |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | Deploy to Sepolia; daily cap; signer rotation | Enrollment with code flow and PKCE; approval signer | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | Approval verification against the deployed contract | Sleep 07:30 to 11:30 | M4 wired to the backend |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M7 contract side of the bypass | (from 11:30) M6 agent tools | M5 chat polish; treasury page |
| 12:00 to 16:00 | Sleep (start the M8 fuzz first) | M6 system prompt; M7 email fixture | Alarm toast; demo mode keys |
| 16:00 to 18:00 | M8 counts | Rehearsal | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Security read of the treasury; README contract table | Debrief; backend error paths | Copy pass; How-it-works page |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Pre-send the paid transaction; save receipts | Re-authenticate both mocked identities | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README limits | Debrief final | README layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30; **re-authenticate both phones minutes before the slot** | | |

**Pivot rule.** Only one mocked identity by Fri 01:00: the wrong-person beat dies. Keep expiry, "this isn't me" and the agent bypass, and show the wrong-person path with a token from a second client or a signed local fixture, labelled as such. If the device flow will not run at all, use the code flow on the requester's phone browser with the agent waiting. **Cut order:** daily cap, signer rotation, the LLM (replace with a scripted agent, say so); never a failed path or the onchain payment.

## 8. Pre-event checklist

- [ ] Read every Agent Pass guide: getting started, OIDC, step-up, human-in-the-loop, testing, app registration.
- [ ] Create the World developer accounts; find out whether client registration needs approval.
- [ ] World Discord, then the World workshop (Thu 17:30, Room 1). Deciding questions: how to get two distinct mocked identities; is the requested `sub` honoured in the device flow; which `acr` values the mocked flow returns; does an AI finance agent count as "agentic".
- [ ] Sepolia ETH on three wallets; two phones.
- [ ] Not allowed before 21:00: the treasury, the backend, the agent prompt, the screens.

## 9. Test plan

- **Unit:** each named revert of the treasury.
- **Fuzz:** the property in section 5.
- **Backend:** expired request, reused device code, wrong `sub`, missing `acr`, token for another client, `auth_time` older than the request, HTTP 503 during polling (must never count as approval).
- **Agent:** the injected email fixture and two normal requests, replayed before every rehearsal.
- **Fixtures:** Sepolia deployment record, pre-sent payment receipt, recorded phone screens of each path.

## 10. Demo

**20 second hook (C).** "Arup lost $25 million to a video call where the CFO was a deepfake. Calling back doesn't help when the call is the attack. Our finance agent pays nobody new until the person asking passes a fresh World ID check on their own phone. Watch a fake CFO try."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Hook; the finance chat; treasury balance | none |
| 0:25 | **The moment:** "CFO" asks for 50,000 USDC to a new address; the agent sends a check link; the impostor verifies with their own World ID; "This is not the CFO. Payment refused." Balance unchanged | recorded clip |
| 1:05 | The impostor forwards the link to the real CFO; the check page asks the CFO plainly; "No, this isn't me"; the alarm lands in the channel | recorded |
| 1:40 | An unanswered request expires; nothing paid | recorded |
| 2:00 | The real CFO asks; verifies on the phone; approved 12 seconds ago; the agent pays; explorer link | pre-sent receipt |
| 2:40 | Injected email tells the agent to skip the check; the contract reverts with its named error | recorded |
| 3:10 | Test counts, limits, debrief headline | slide |

"OIDC", "device flow" and "sub" are never said on stage; they are in the README and Q and A.

**Video (2:00 to 2:59).** Hook; the impostor refused within 40 seconds; the alarm; the real payment; the agent bypass failing; end card.

## 11. README draft

Order: promise; screenshot of the refused card; quick start; how it works (diagram); failed paths table (wrong person, expiry, "this isn't me", agent bypass, replay), each with a test name and a Sepolia transaction or revert; **World Agent Pass section** (request, completion, validated result and protected action mapped to files and lines; where the client secret lives; why the check page exists: World's screen cannot show the action and `binding_message` is unsupported); trust assumptions (the backend's approval key is the authority; daily cap and signer rotation limit the damage; the requester's phone is the root of the check); limits (an enrolled requester who is coerced still passes; this checks who asks, not whether the payment is wise); prior art (Airlock, Surety, Axis) named as patterns this extends; `WORLD_DEBRIEF.md`; AI usage; licence.

`WORLD_DEBRIEF.md`: time to first success, each friction point with a timestamp as it happened, missing capability or docs (a message on World's approval screen), and the one improvement with the greatest impact.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Finance chat | A clean team-chat layout: requests, the agent's replies, check status chips | waiting on check (countdown), refused, expired, alarm, paid |
| Payment request card | Payee, amount, requester, "new payee" badge, status | each status its own colour, icon and word |
| Check page (mobile) | "Finance is asking: are you requesting 50,000 USDC to 0xNew...? If not, tap No." Two large buttons, No first | already answered, expired, invalid link |
| Verdict cards | "Payment refused: this is not the CFO." / "Paid. Verified 12 seconds ago." with the transaction | same layout for every path |
| Treasury page | Balance, approvals log, refusals log | empty state explains enrollment |
| Enrollment | "Link your World ID to your role", one sentence on why | already linked, wrong account |

Copy: plain money language. Never "OIDC", "token" or "sub" outside the technical drawer.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Only one mocked identity | Gate 1 | Pivot rule above |
| Requested `sub` ignored in the device flow | M3 | Backend comparison of `sub` is the authority anyway |
| Mocked session expires before the slot | Sat morning | Re-authenticate minutes before |
| LLM output varies on stage | rehearsal | Scripted agent replay with the real backend and contract; say so if asked |
| Sepolia slow | demo | Pre-sent receipt with timestamp |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Why not call back on a known number?" | A SIM swap moves the number, and a deepfake answers in the right voice. A World ID check needs the enrolled person's own World ID, now | hook |
| "Can't the scammer forward the link?" | Yes, and the real person then sees exactly what is being asked and raises the alarm | alarm beat |
| "What if the CFO is fooled into approving?" | Our page shows amount and payee before World's screen, since World's screen cannot show them; a coerced but real CFO still passes, and we say so | check page |
| "The backend can sign anything." | Yes, it is the approval authority; the contract caps daily outflow and the signer can be rotated; the README states it | README |
| "Why World ID and not a passkey?" | A passkey proves a device. This proves the enrolled World ID account approved, fresh, in World ID | debrief |
| "Is this agentic?" | The agent runs payables end to end; the check is what keeps a fooled agent from paying | agent pane |
| "Why onchain?" | The agent's key cannot move money alone, and every approval and payment is publicly checkable | contract |
| "Mocked identities?" | World mocks proofs at this event; our checks are the same against production tokens | debrief |

## 15. AI usage

Follow `00_common.md` section 8. A writes the treasury and its tests by hand. The demo agent is an LLM by design; its system prompt, tools and the injected email are committed in `agent/`.
