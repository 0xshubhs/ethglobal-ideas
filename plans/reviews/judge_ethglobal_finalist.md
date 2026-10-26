# Finalist panel review of plans A to E (ETHGlobal Mumbai, 5 to 7 Nov 2026)

Reviewer stance: an ETHGlobal finalist judging panel of founders, protocol engineers and VCs. It is Saturday 7 Nov in a live judging room, and each team gets 7 minutes (a 4 minute demo, then 3 minutes of Q&A). We see about 25 teams in a morning, and with the other rooms we pick a top 10 from roughly 400 to 700 submissions. We are generalists, not privacy specialists. Each plan is judged as if the team walked in and ran its section 9 four-minute script in front of us. Context and past finalists come from `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` (Q1, Q5).

## How this panel scores

- The five published categories, verbatim: "Technicality: How complex is the problem you're addressing, and how sophisticated is your solution?"; "Originality: Is your project introducing a new idea or creatively solving an existing problem?"; "Practicality: How complete and functional is your project? Could it be used by its target audience today?"; "Usability (UI/UX/DX): How intuitive is your project? Have you made it easy for users to interact with your solution?"; "WOW Factor: Does your project leave a lasting impression? This is the catch-all for anything unique or impressive that may not fit into the other categories."
- In deliberation, a project gets a top 10 slot when we can repeat one sentence about it and remember one moment that proved that sentence live. Examples: VEIL VPN ("Open source lets you read the code. Attestation proves it's running"), Carte Bleue (recover a wallet with a bank card) and UNSU (a wallet with no downloads or logins). We discount anything we have to take on trust, and we stop following at about the third acronym we don't know.
- **Overall** is a holistic call, not the mean. The strength of the one proven moment, and the chance that it fails live, count most. The mean is shown next to it.
- The top 10 of 400 to 700 is the top 1.5 to 2.5 percent. **Yes** means we would argue for it in deliberation. **Maybe** means it needs a clean run and a weak field. **No** means it will not survive deliberation even with a clean run.

## Scorecard at a glance

| Plan | What we would remember | Tech | Orig | Prac | Usab | WOW | Mean | Overall | Top 10 |
|---|---|---|---|---|---|---|---|---|---|
| A Lightfoot | A lying server said Vitalik had 10,000 ETH, and their app refused it | 8 | 6 | 5 | 6 | 6 | 6.2 | 6.0 | No |
| B Dapp Leak Report | A wallet created on screen turned up at a tracker 40 seconds later | 6 | 7 | 7 | 7 | 7 | 6.8 | 6.8 | Maybe |
| C Chupke | Pay with a fingerprint, and the accountant gets a one-month key; but payers and amounts stayed public | 7 | 5 | 5 | 7 | 5 | 5.8 | 5.5 | No |
| D NullRelay | A never-funded address withdrew from Tornado on a devnet, then they lost us | 9 | 6 | 2 | 4 | 5 | 5.2 | 5.0 | No |
| E SameBuild | They replayed the Bybit file swap, and the protected browser refused to run it | 8 | 6 | 5 | 6 | 9 | 6.8 | 7.0 | Maybe (strongest) |

---

## Plan A: Lightfoot (verified anonymous reads)

### What we would remember, and the first 20 seconds

**Remembered sentence:** "The portfolio app that caught a server lying about Vitalik's balance, and sends every read through Tor." That is two ideas, and in deliberation we would only repeat the first.

**First 20 seconds: partial hook.** The script spends 0:00 to 0:20 on a title card and one spoken line: "Your wallet's RPC provider sees your IP next to every address you check, and you believe whatever number it sends. Lightfoot makes both impossible."
- The VCs on the panel do not know what an RPC provider is, and there is nothing on screen to look at.
- The protocol engineer hears "impossible" and starts writing a question. The provider still sees which addresses are asked about, and the plan itself cites a timing attack that links 95% of them.
- The best beat in the demo, the lie, is buried at 2:20.

### Scores

| Category | Score | Justification |
|---|---|---|
| Technicality | 8 | A light client over an anonymity network, with per-account lanes, coalescing, a fail-closed router and a boot that makes no clearnet read, is real systems work, but none of it is visible on screen. |
| Originality | 6 | The composition is new in Ethereum (nobody ships Anon-RPC under a light client), but a generalist hears "Tor plus Helios", two things we already know. |
| Practicality | 5 | It runs on mainnet with real addresses and no backend, but the product is a watch-only portfolio viewer nobody in the room would switch to; the piece a wallet could adopt (the drop-in provider, S8) is a stretch goal. |
| Usability | 6 | "Paste an address, get badges" is simple; the privacy ledger, lanes and "proved / cross-checked / anon-only" states are an engineer's dashboard, and only pre-warming hides the 8 to 11 s boot. |
| WOW | 6 | The 10,000 ETH lie, rejected side by side, is a good verifiable moment; the Tor kill-switch looks like "the app froze, then came back", and the provider log comes from the team's own proxy. |
| **Overall** | **6.0** (mean 6.2) | Strong engineering in search of a product, and the one memorable moment arrives too late. |

### Top 10: No

A clean run earns a respectful "very solid infra" in deliberation, then loses to anything with a clearer user. Lightfoot is a much better fit for the EF Anon-RPC prize, where its ledger and its honesty count directly.

### Demo critique

**What lands**
- 2:20 to 3:05, the lying RPC. The unverified panel shows 10,000 ETH; Lightfoot shows "failed proof" and keeps the last checked value. Everyone understands "the server lied, the app caught it".
- "A normal app would quietly fall back to a direct connection. Ours has no code that can." is a good line.
- Stating the limits before we ask about them earns trust.

**What confuses a non-specialist**
- The vocabulary: "RPC provider", "light client", "Anon-RPC", "Nym", "exit IP", "specifier", "pinned", "zero clearnet RPC reads". The zero-read boot beat (3:05 to 3:35) means nothing to us. We can't tell why one trusted read matters, and we can't check the claim by looking.
- The provider log (1:05) is a terminal of IPs tagged `[tor-exit]`, from the team's own proxy. We have to trust that the tag means what you say, and that a real provider would see the same thing.
- The kill-switch goes amber, then red ("Paused"), then "Switched to Nym". To us that is a reconnect, not a guarantee. Failing closed is the property that something *doesn't* happen, which is the hardest thing to show on stage.
- The revoke beat (3:35, cancelled at the wallet popup) adds a fourth idea in the last 25 seconds.
- The layout won't read on a room monitor: Chrome with DevTools docked across two thirds of the screen, and a terminal in the last third.

**What could fail live on venue Wi-Fi**
- tor-js reaches its gateway over UDP and WebRTC, which venue Wi-Fi often blocks. The plan relies on a hotspot.
- The kill-switch is `ssh vps systemctl stop tor-js-gateway`. It needs outbound SSH from the hotspot, and an SSH hang means dead air in the middle of the key beat.
- The provider log and the lying proxy both run on the VPS, so three of the four proof beats need it reachable.
- The Nym takeover can outlast the beat: the notes cite a first response of "tens of seconds", and even a warm standby may switch slowly.
- Colibri provers or public RPCs may refuse Tor exits (Cloudflare challenges), and proof downloads for a 200-call multicall over Tor may be slow.
- Pre-warming 3 minutes before the slot assumes the laptop stays on one network from the queue into the room. Changing networks drops the circuits.

**Rewritten first 30 seconds**
> [Screen: two panes, both showing vitalik.eth. Left labelled "Ordinary wallet", right "Lightfoot".] "Your wallet doesn't know your balance. It asks a company's server and believes the answer. We just made that server lie." [Click.] "Left: Vitalik now has 10,000 ETH. Right: rejected, because Lightfoot checks every number against Ethereum's own signatures, here in the browser. And the server never learned who was asking: the question went through Tor." [Point at a public IP check showing a Tor exit, not the laptop's IP.]

### Top 3 strengths
1. A clean, binary, verifiable moment: an ordinary client shows a forged balance, and theirs refuses it.
2. Coherent, honest engineering: no backend, no keys, mainnet, and explicit limits (query content needs PIR, timing correlation, revokes sent by the user's own wallet) stated before judges find them.
3. It closes a real gap: reads that are private and verified at once. It also produces measurable outputs EF can reuse (traffic share, exit-acceptance data).

### Top 5 weaknesses (most serious first)
1. **No user.** A watch-only portfolio and approvals viewer is a demo shell. The asset that matters, a drop-in provider a wallet can ship, is stretch S8, so "who uses this tomorrow?" has no good answer.
2. **The key moment depends on gate G1,** Colibri working through the Anon-RPC worker, which is unproven. If it fails, "proved" becomes "two endpoints agree", and the lie beat shrinks to "a single lying provider gets caught", which is far less impressive.
3. **Six beats in four minutes,** two of them (the zero-read boot and the ledger header) pure jargon.
4. **Network dependence.** Four beats go over the venue network to a VPS (gateway, SSH kill, provider log, lying proxy), on top of Tor or Nym. This is the most network-dependent demo of the five.
5. **The privacy proof is self-attested.** The "provider's view" is their own proxy, and "makes both impossible" overclaims against the plan's own stated limits.

### Must-fix changes
- Open with the lie at 0:00, and run the lying proxy on localhost so the opening beat cannot depend on the VPS.
- Replace the self-hosted provider log with an independent check: call `check.torproject.org/api/ip` or an IP echo through the same worker, and show "IsTor: true" next to the laptop's real IP (Plan B already does this).
- Cut the zero-read boot beat and the revoke beat from the live demo, and keep them for Q&A and the README.
- Replace the SSH kill with a local, offline toggle (a firewall rule, or dropping the worker's connection from the laptop), rehearsed on the hotspot.
- Move S8 into the MVP and pitch it as the product: "one provider object makes any wallet private and lie-proof; Lightfoot is the reference app." Get one other team at the event to drop it in.
- Say "it can't lie to you, and it can't see who you are" instead of "impossible".

### Questions we would ask
1. "Who uses this next week? Name a wallet that would swap its provider for yours, and tell us what that costs it in latency."
2. "That log is your own proxy. Do the big providers even accept Tor traffic, and what does your user see when they refuse?"
3. "The provider still sees that someone is looking at vitalik.eth. In one sentence, what can it no longer do that it could before?"

---

## Plan B: Dapp Leak Report (canary-wallet leak tracing)

### What we would remember, and the first 20 seconds

**Remembered sentence:** "They created a wallet on screen, connected it to a dapp we picked, and 40 seconds later showed us a tracker holding it."

**First 20 seconds: yes.** "When you connect a wallet to a dapp, who gets your address? ... with an address that did not exist 10 seconds ago" is a question everyone in the room has asked, and the mechanism is instantly clear. Two cautions:
- "Nobody measures it" is false; the plan itself cites two academic studies that did.
- The hook is spoken over a title card instead of showing the address appear.

### Scores

| Category | Score | Justification |
|---|---|---|
| Technicality | 6 | A synthetic EIP-1193/EIP-6963 wallet injected into every frame, taint matching across hashed and encoded forms, and JSON-RPC rerouting are solid engineering; on screen it looks like a browser-automation script with string search, and protocol engineers will discount it. |
| Originality | 7 | The canary wallet is a genuinely creative twist that makes the evidence prove itself; but leak scanners (Blacklight style) and academic dapp studies are a known genre, and the idea is on the EF CROPS list, so expect lookalikes. |
| Practicality | 7 | It works on any existing dapp without that dapp's cooperation, from a CLI and a GitHub Action, today; but the plan's own acceptance bar is 3 of 5 real dapps, and an empty wallet can only show lower bounds. |
| Usability | 7 | One URL box and a plain headline ("4 companies got your address") is right; the W-1/W-2/W-3 verdicts and the "P line" are jargon. |
| WOW | 7 | A judge-picked dapp and a 40-second-old address inside a vendor's payload is memorable, if it works and the vendor is a surprise; the fix-mode and CI beats dilute it. |
| **Overall** | **6.8** (mean 6.8) | The most legible plan of the five, with the highest live variance on its key beat. |

### Top 10: Maybe

We would argue for it after a clean live scan that lands a *surprising* recipient (session replay, analytics or error telemetry, not the RPC or a screening vendor) plus a pre-computed "top 20 dapps" headline. If the judge's pick fails to connect and the team opens a cached report, it drops to "nice tool".

### Demo critique

**What lands**
- 0:20 to 1:20. The judge picks a dapp, the canary appears in large type, rows turn red, and the evidence drawer shows the raw request with the address highlighted. "From a wallet that is 40 seconds old" is the best line in any of the five plans.
- The plain headline: "N companies got your address. M saw your IP."
- 3:00 to 3:35. "Privacy is now a failing test, not a policy", over a red CI check, is a strong close for developers.

**What confuses a non-specialist**
- W-1, W-2, W-3, "P line", "EF access-layer guarantees", "Anon-RPC", "traffic share", "IsTor". The fix-mode beat (2:00 to 3:00) is the jargon peak, and it answers a question we did not ask.
- We can't tell necessary sharing from gratuitous sharing. An RPC provider or a compliance screening vendor receiving the address is expected; if those are the red rows, we shrug.
- The planted fixture's "tracker log", shown right after a real dapp scan, mixes real evidence with staged evidence.

**What could fail live on venue Wi-Fi**
- Real third-party dapps loaded through the venue's NAT IP, shared by hundreds of hackers, are prime targets for Cloudflare and bot challenges, and headless Chromium makes it worse.
- Auto-connecting to a dapp the judge names (custom modals, terms checkboxes) is the plan's own "High" risk.
- Timing doesn't fit. A baseline scan takes about 60 s and fix mode about 90 s, but the script gives fix mode 60 s including the explanation. It cannot run live in that slot.
- Fix mode runs tor-js inside a Playwright sidecar with CORS rerouting. Blocked UDP or WebRTC, or providers refusing Tor exits, will break it.
- The GitHub PR page and `check.torproject.org` both need the network.

**Rewritten first 30 seconds**
> "Pick any app on this list, or name one." [Judge picks.] "This wallet address was created three seconds ago. It has never existed anywhere, so if a company has it, it got it from this page." [Connect; rows stream in.] "Red means a company received it. This one is an analytics vendor: here is the exact request, here is the address, sent 12 seconds after we connected, together with this laptop's IP. You don't have to trust us. The address is brand new."

### Top 3 strengths
1. **Evidence that proves itself.** A fresh random address in a third party's payload needs no trust in the tool, its lists or the team.
2. **Unilateral and usable today.** It works on any dapp without that dapp's consent, and a dapp team can adopt the CLI and CI gate in an afternoon.
3. **Judges take part.** Letting us pick the target is rare and memorable.

### Top 5 weaknesses (most serious first)
1. **The key beat is the least controllable:** real dapps, the venue IP, bot checks, auto-connect. The cached fallback kills the "created 10 seconds ago" magic.
2. **Pacing.** Automated runs of 60 s and 90 s sit inside a four-minute script with six beats after the hook; fix mode will overrun or have to be faked.
3. **The findings may not surprise anyone** (RPC and compliance screening). Grading a legally required screening vendor as Medium will look naive to a founder.
4. **The technical depth isn't shown.** To a protocol engineer it looks like Playwright plus grep.
5. **The idea is crowded and touchy.** It is on the EF CROPS list and belongs to a known research genre, and naming specific dapps on stage carries reputational risk for both you and them. Also check what the NYC 2026 finalist "Canary" was, so the name doesn't look borrowed.

### Must-fix changes
- **Move S1 (the leaderboard) and S9 (scans for consenting teams at the event) into the MVP.** We will repeat a pre-verified, surprising finding on a well-known dapp, plus a headline number ("of the 20 most-used dapps, N send your address to someone other than their RPC"). "We scanned 12 teams here and 3 fixed a leak before submitting" is the best Practicality evidence you can bring.
- **Live demo:**
  - The judge picks from 5 pre-verified cards that have recipes, time-boxed to 30 s.
  - Show the evidence drawer, the headline and the red CI check.
  - Fix mode becomes one sentence and a 15 s clip.
- **Split the report** into "needed for the app to work" (the RPC) and "not needed" (analytics, replay, ads, fingerprinting), and lead with the second.
- **Remove the W and P codes from every screen;** keep them in the README.
- **Run headed, from a hotspot,** with a pre-warmed scan for every card.

### Questions we would ask
1. "Many front ends are legally required to screen addresses. How do you tell obeying the law apart from gratuitous sharing, and would you show this report to that dapp's founder?"
2. "Your canary is an empty wallet that never does anything. What share of real leaks (portfolio APIs, features for funded accounts, transaction flows) do you miss?"
3. "Has any team here run your Action on their repo, and what did it find?"

---

## Plan C: Chupke (private invoices and checkout on Whitechain)

### What we would remember, and the first 20 seconds

**Remembered sentence:** "Private USDT invoices on Whitechain: pay with a fingerprint, and the accountant gets a one-month key." In deliberation we would add the asterisk: "but payers and amounts were public, and there was one merchant."

**First 20 seconds: a visual hook that backfires.**
- The opener works: an explorer page showing a studio's clients and revenue is great for founders and VCs, and every business person in the room gets it.
- The line "Chupke makes this page impossible to build" is the problem. On a fresh testnet with one real merchant, the list of everyone who paid the Chupke router, with amounts, *is* that page. The protocol engineer on the panel sees this before you reach 0:40.

### Scores

| Category | Score | Justification |
|---|---|---|
| Technicality | 7 | The EIP-3009 router that binds every parameter into the nonce, stealth addresses that spend without gas, hardened per-period viewing keys with a completeness check, and the relayer's anti-drain policy are well thought out; most of it is invisible in the demo. |
| Originality | 5 | Stealth payments, private invoicing and private payroll make up the most crowded privacy category (Umbra, Fluidkey, Cloak at Cannes 2026, CloakPay, Warden, Manila); the genuinely new idea, stealth addresses that never need gas, is never said in plain words. |
| Practicality | 5 | It runs end to end on Whitechain Sepolia only if the team gets the prize USDT, which has no faucet; funding the customer's wallet is a visible crypto step, and privacy stays weak until many merchants use it. |
| Usability | 7 | Fingerprint, amount, receipt is clean for the payer, and the merchant side is simple buttons; but passkey checkout is now common, so it doesn't stand out. |
| WOW | 5 | The accountant key that opens one month and reconciles "6 of 6" is the one moment that sticks; killing the relayer reads as "a backup server". |
| **Overall** | **5.5** (mean 5.8) | A good partner-prize submission (Whitechain Operate and Scale) carrying a privacy claim that won't survive our Q&A. |

### Top 10: No

Even a perfect run shows a payments app in a category we have seen many times, and one question breaks its central claim. Spend the effort on Whitechain and EF CROPS instead.

### Demo critique

**What lands**
- The explorer hook at 0:00 to 0:20, before the overclaim.
- 0:40 to 1:20: "No wallet, no gas, no chain name, no seed phrase", with a fingerprint prompt.
- 3:15 to 3:50: the November key shows only November, with "0 missing". That is a privacy feature a business understands, and we haven't seen it done this simply.

**What confuses a non-specialist**
- There are too many parties and screens to follow, and we lose track by 2:05:
  - Parties: customer, merchant, shop admin, relayer operator, contractor, accountant, and a "naive merchant".
  - Screens: two laptops, the explorer, a receipt tab, the dashboard, the shop admin, a relayer terminal, the DevTools network panel, a contractor tab and an accountant tab.
- "Stealth address", "announcement", "Router", "fresh 0x7f..". To a generalist, an explorer showing payer to Router to a random address doesn't look private; it looks like a transfer.
- The 22-line integration slide at 0:20 is developer content in the most valuable 20 seconds.
- "Find the merchant. You can't." Our next question will be "how many merchants are there?"

**What could fail live on venue Wi-Fi**
- The Whitechain Sepolia RPC is behind Cloudflare, with 50 requests per second per IP. Reads go out through Tor or Nym exits that Cloudflare may challenge, and the whole venue shares one NAT IP.
- Many pieces must all work over the hotspot: Anon-RPC booting on two laptops at once, the VPS relayer, the merchant relay, and Blockscout page loads.
- The judge-phone payment (PRF support, faucet funding) is a coin flip. Skip it.
- If the room has one HDMI input, laptop 2 is either invisible or costs a swap mid-demo.
- Sequencer or explorer lag turns "Paid in about 5 s" into dead air.

**Rewritten first 30 seconds**
> [Explorer: a studio's address.] "This is a design studio that took stablecoins. Anyone can see every client, every invoice and every contractor it pays, forever. That's why businesses don't take crypto." [Switch to checkout.] "With Chupke, a customer pays with a fingerprint: no gas, no wallet. The explorer shows a payment to a one-time address nobody can tie to the studio. It hides who got paid, not who paid or how much. And at tax time the studio hands its accountant a key that opens November, and only November."

### Top 3 strengths
1. A business problem VCs grasp in five seconds, with both the merchant and the customer on screen.
2. A sharp technical insight, backed by redirect-attack tests and invariants:
   - EIP-3009 lets stealth addresses move USDT without ever holding gas. That removes gas top-ups, the main way stealth users get traced.
   - The nonce-bound router means no relayer can redirect funds.
3. Per-period accountant keys with an independent "nothing omitted" check are a new, easy-to-follow form of selective disclosure.

### Top 5 weaknesses (most serious first)
1. **The promise overclaims.** Payer addresses and amounts are public, and with a tiny anonymity set, "paid the Chupke router" means "paid this merchant". The hook invites exactly the question that breaks it.
2. **Overloaded script:** seven timed beats containing about a dozen separate actions, two laptops, three speakers and five parties in four minutes. It will overrun, and the room will remember none of it clearly.
3. **A hard external dependency.** The prize USDT (10 holders, no faucet) gates both qualification and the whole live flow.
4. **A crowded category with an invisible differentiator.** To us it looks like Umbra plus Stripe Checkout.
5. **Heavy live network surface** (a Cloudflare-fronted RPC reached through Tor, the VPS relayer, two Anon-RPC boots, the explorer), plus a pre-funded passkey wallet behind the "zero crypto steps" claim.

### Must-fix changes
- **Rewrite the promise to what is true:** "Nobody can look up a business on the explorer and see who pays it", plus the caveat on stage. Drop "impossible" and "you can't".
- **Make the anonymity set visible.** Seed several demo merchants and scripted decoy payments on the router before the slot, so "find the studio" is genuinely hard on screen.
- **Three beats only:**
  1. A customer pays with a fingerprint.
  2. The explorer shows no merchant, and the relayer is killed.
  3. The accountant key opens one month.

  Refunds, contractor payouts, webhooks and the 22 lines go to the video and the README.
- **One laptop, one screen.**
- **Secure the prize USDT this week,** or treat the plan as unbuildable.
- **Say the gasless-stealth idea in one plain sentence:** "the one-time addresses never need gas, so nobody can trace them by who topped them up".

### Questions we would ask
1. "If I list every payment into your router while one merchant is live, isn't that exactly the studio's client list and revenue? How many merchants does it take before your promise is true?"
2. "A 4.00 payment comes in and a 3.97 payment goes out ten minutes later. How are those not linked, and what happens when the studio cashes out to one exchange address?"
3. "What does this do that Fluidkey or Cloak doesn't, in one sentence?"

---

## Plan D: NullRelay (relayerless Tornado withdrawal on the alt mempool)

### What we would remember, and the first 20 seconds

**Remembered sentence:** "A never-funded address pulled 0.098 ETH out of the original Tornado contract on a devnet, with no relayer." After that, honestly: "then something about paymaster reputation that two of us couldn't follow."

**First 20 seconds: yes for the protocol engineer, no for everyone else.** "To get money out of a privacy pool into a fresh address, that address needs gas ... We made the relayer a contract" is the crispest problem statement in the five plans. But:
- "Privacy pool" and "relayer" are already specialist words, and the line is spoken over a title slide.
- Saying "Tornado Cash" in the next breath makes some of the panel uneasy, for reasons that have nothing to do with your code.

### Scores

| Category | Score | Justification |
|---|---|---|
| Technicality | 9 | Groth16 checked inside an EIP-8141 VERIFY frame against unmodified 2020 bytecode, binding across frames, staking and reputation economics, plus an attack the team found itself and a fix: the deepest work of the five. |
| Originality | 6 | The relayerless withdrawal has prior art (MacWha's 4337 privacy paymaster on the same pool; Himitsu at Tokyo 2026, using frames); the fan-out attack and the nonce-key fix are new, and they are the hardest part to show. |
| Practicality | 2 | Devnet only, Hegota is not live, and the anonymity set is the team's own deposits; no target user can use it today. |
| Usability | 4 | "Paste a note, new address, Withdraw" with three lane cards is fine for a researcher; the real value is a CLI and a findings document. |
| WOW | 5 | Lanes going red, red, green and a zero balance becoming 0.098 is a nice visual for people who know why it matters; the attack slide is an equation. |
| **Overall** | **5.0** (mean 5.2) | Probably the best EF alt mempool submission at the event, and a weak finalist candidate. |

### Top 10: No

EVM PORST (Cannes 2026) shows this room can reward pure protocol work, but its claim was one fact anyone could repeat ("post-quantum signatures, less verifier gas"). NullRelay needs five concepts before its first claim makes sense, and its most original part, the attack, is the least legible. A protocol-heavy panel might push it to "maybe".

### Demo critique

**What lands**
- 0:20 to 0:45: "This address has zero ETH", next to a real, unmodified contract.
- 0:45 to 1:45: the same transaction is sent three ways, two lanes go red and one goes green, and then the balance flips. Binary, visual, and checkable on an explorer.
- "We attack our own design" is an attitude judges like.

**What confuses a non-specialist**
- The vocabulary: frames, VERIFY, SENDER, the canonical versus the alternative mempool, staked versus unstaked payers, "non-sender storage, over 100k", reputation, blame, nonce keys, sequence 0, fan-out, throttle, ban. The attack and the fix (1:45 to 3:35) are a talk for the alt mempool team (Pierre and Alex), not for us.
- "About 120 duplicates throttle and about 520 ban" is the plan's own arithmetic, not a measurement; the workshop notes say organic reputation burn "cannot be reproduced reliably". Unmeasured numbers on a slide invite a question you can't answer.
- Some judges will hear "real Tornado Cash, unmodified" as "they're showing off a mixer that was sanctioned".

**What could fail live on venue Wi-Fi**
- The devnet itself (gateway, explorer, resets). The plan rates a devnet profile mismatch as High likelihood.
- Proving on the laptop takes seconds with websnark and much longer with snarkjs, so all 20 fan-out proofs must be generated in advance.
- Running the fan-out on a shared devnet during judging needs organiser permission, and it may not move reputation at all, which would leave beat 2 with no result.
- V2 is a stretch goal (gate G4 at Fri 19:00). If it is missing, beat 3 becomes a proposal slide.
- The first admitted withdrawal is gated at Fri 12:00, 15 hours in. There is a real chance of reaching Saturday with no admitted transaction.

**Rewritten first 30 seconds**
> [Explorer: an address holding 0 ETH.] "This address has never held a single wei. In one minute it will hold 0.098 ETH from a privacy pool deployed in 2020 and never changed, and no person or server will have paid its gas: a contract pays, and gets paid back in the same transaction. Ethereum's normal mempool refuses this kind of transaction. Watch it refuse, and watch the new one accept." [Click Withdraw: red, red, green.]

Then give the attack one sentence, with a measured number or none at all.

### Top 3 strengths
1. The highest technical ceiling in the set, with a built-in safety argument (the 12 checks) that a security team can defend line by line.
2. A contribution that outlasts the hackathon: a measured attack on a use case ERC-8421 itself names, a fix, and proposed rule text.
3. A crisp problem and a binary visual (zero balance; red, red, green; the balance flips) that needs no UI.

### Top 5 weaknesses (most serious first)
1. **Zero practicality on our rubric:** devnet only, nothing live, no users, no anonymity set.
2. **Jargon density.** Half the script is unreadable to a generalist panel.
3. **Extreme build risk:** opcodes not yet exercised on the devnet, shifting devnet profiles, and a 2020 proving toolchain. The demo may not exist by Saturday.
4. **The headline is prior art.** "No relayer" has been done; the new part (the fan-out) is the hardest to measure and to show.
5. **Optics:** the Tornado name, and mass-invalidating transactions on shared event infrastructure during judging.

### Must-fix changes
- Treat the finalist session as a 90-second story: the zero-balance address, three lanes, the balance flip, and one sentence on the finding. Everything else goes to Q&A.
- Don't say "Tornado Cash" in the first 20 seconds; say "a privacy pool deployed in 2020, unmodified".
- Show only measured numbers. If reputation didn't move, say "it isn't penalised today, and here is why that's dangerous".
- Generate every proof in advance, and keep a local stack ready as the live fallback; a recording is the last resort.
- Rehearse a one-line answer to "who uses this, and when?": "every privacy pool, from the first day of Hegota, with no migration".

### Questions we would ask
1. "When can a real user do this on mainnet, and what happens to this project until then?"
2. "Robert MacWha's privacy paymaster and Himitsu have both already removed the relayer. What's new here, in one sentence?"
3. "Did the paymaster actually get throttled on the real sidecar, or is that a projection? What exactly did you measure?"

---

## Plan E: SameBuild (verified frontend)

### What we would remember, and the first 20 seconds

**Remembered sentence:** "They replayed the Bybit hack on stage: the unprotected browser sent money to the attacker, and the protected one refused to run the swapped file."

**First 20 seconds: yes, the strongest of the five.** Every judge knows Bybit, and "one changed JavaScript file on a host; open source didn't help" names a 1.5-billion-dollar problem in one breath. Two cautions:
- The line is spoken over nothing; the attack doesn't appear until 0:55.
- The plan's stage line copies VEIL VPN's ("Open source lets you read the code...") almost word for word, and anyone who judged Cannes will notice.

### Scores

| Category | Score | Justification |
|---|---|---|
| Technicality | 8 | Four hard pieces composed: reproducible builds checked by independent rebuilders, an immutable release contract with a delay and no rollback, light-client reads over a mixnet, and blocking in Chromium before code runs. |
| Originality | 6 | Verified frontends are a known wish (WEBCAT, Meta Code Verify, SRI, IPFS CIDs, TEE Shield) and an idea on EF's CROPS list; checking a rebuild instead of a claimed hash, and blocking before anything runs on Chromium, are the new parts. |
| Practicality | 5 | It works for Vite static builds that adopt the Action, and for users who sideload an extension with the debugger permission; no real dapp is enrolled, and most production dapps are not Vite static builds. |
| Usability | 6 | A green badge and a plain "stopped before it could run" page are right; Chrome's "started debugging this browser" banner on screen undercuts both. |
| WOW | 9 | Same server, same file, one browser drained and one blocked, tied to the largest hack in crypto history: the most VEIL-like moment of the five, and fully under the team's control. |
| **Overall** | **7.0** (mean 6.8) | The best single moment, and the lowest live risk on that moment; Practicality is the soft spot. |

### Top 10: Maybe (the strongest maybe of the five)

A clean tamper beat inside the first 60 seconds, plus a confident answer about the debugger permission, puts it into our deliberation. It drops out if:
- interception has to fall back to detect-and-kill (fallback F2), or
- the script spends its second half on the RPC and rebuilder beats.

### Demo critique

**What lands**
- 0:55 to 1:55, the moment:
  - Tamper, reload: the red page says "stopped before it could run", and the attacker log reads 0.
  - In the unprotected profile the recipient silently changes, and the log reads 1.
  - It is binary and visible, and we don't have to trust anything.
- The popup copy: "Same as the public code at github.com/..., v1.0.1. Rebuilt by 2 of 2 builders you trust."
- "New releases wait out a delay, and old ones can never come back."

**What confuses a non-specialist**
- The lying RPC (1:55 to 2:40): "naive-check", "release record failed the light-client proof". After a stolen-money moment, an RPC lying about a hash is an anticlimax, and it takes three concepts to follow.
- The developer plumbing (2:40 to 3:25): the Actions run, Sigstore, the rebuilder terminal, the attest transaction, the ENS alias. It fills the last minute, when we should be leaving with the drain in our heads.
- "Light client", "Nym mixnet", "manifest", "specifier", "1TS control".
- The debugger banner at the top of the protected window makes the protector look like malware until you explain it.

**What could fail live on venue Wi-Fi**
- `npx samebuild rebuild` in the 2:40 beat runs a Docker build with an npm install. On venue Wi-Fi that takes minutes, not 45 seconds. Run it before the slot.
- The demo.samebuild.xyz DNS (a hosts-file fallback is planned) and the attack server: run both on localhost.
- The lying-RPC beat forces a fresh Colibri read over Nym; a cold read takes 10 s or more. The tamper beat is safe from cache; this one is not.
- In the unprotected profile, show the changed recipient; don't wait for a Sepolia confirmation.
- The GitHub Actions page needs the network. Use a recorded clip.

**Rewritten first 30 seconds**
> [Two browser windows on the same app, a terminal below.] "In February 2025 Bybit lost about 1.5 billion dollars because one JavaScript file was changed on a wallet's web server. The code on GitHub was fine. Nothing checks that the code in your browser is the code on GitHub. He's the hacker now." [Teammate runs tamper; both windows reload.] "Left, a normal browser: the payment now goes to the attacker. Right, with SameBuild: blocked, before a single line ran. Same server, same file."

Verify the Bybit wording before saying it on stage, as the plan already flags.

### Top 3 strengths
1. The best hook and the best moment: a disaster everyone knows, reproduced and stopped side by side in seconds.
2. A structural, verifiable design: a rebuild of the public commit is the authority. It is recorded in immutable contracts with a delay and no rollback, and checked without trusting an RPC.
3. The key beat runs on infrastructure the team controls, and from cache, so it survives bad Wi-Fi.

### Top 5 weaknesses (most serious first)
1. **The debugger permission and banner.** You ask users to install an extension with more power over their browser than the attacker had, and the banner says so on stage. The obvious judge question is "who protects me from SameBuild's update channel?"
2. **Two-sided adoption and narrow scope:** only dapps that adopt the Action, only Vite static builds, only users who sideload the extension, and no real dapp enrolled.
3. **The second half of the script** (RPC lie, Actions, rebuilder, ENS) is slow and jargon-heavy, and the live rebuild can't finish in time.
4. **A known idea, listed by EF, with close prior art,** and a stage line borrowed from a past finalist.
5. **The largest 36-hour scope of the five:** contracts, CLI, Action, reproducible builds, an MV3 extension using the DevTools Protocol, Colibri over Nym, attack and lying servers, and optional ENS. Reproducibility across machines and the reliability of CDP blocking stay untested until Friday.

### Must-fix changes
- **Restructure the demo around the tamper beat:**
  - Put it inside the first 30 seconds, and end the demo on it.
  - The lying RPC becomes a one-line claim plus Q&A.
  - The developer side becomes a 15-second recorded clip.
  - Run the rebuild before the slot, and show its attest transaction on screen.
- **Address the debugger banner before we notice it.** Say one sentence about it on stage. In the README, show a reproducible build of the extension itself, and move `verify-dir` (S4) into the MVP, so "who verifies the verifier?" has a demonstrated answer.
- **Write your own line** instead of VEIL's.
- **Enroll one real third-party open-source Vite dapp** (or another team's project at the event), built reproducibly from its public repo, so the demo isn't only your own toy app.
- **Narrow the claims.** The dapp's own team *can* get new code accepted, after the delay, and "any Vite dapp" is only true if its build reproduces. Say "a public, delayed, revocable release" instead of "not even the dapp's own team".

### Questions we would ask
1. "Your extension holds the debugger permission on every enrolled site. If your extension or its update key is compromised, the attacker owns every page. Why is that a better place to put trust?"
2. "In the Bybit attack the attackers had a developer's machine. They could have pushed a malicious commit and tagged it, and your rebuilders would faithfully reproduce it. What stops that?"
3. "Which real dapp would adopt this first, and what about Next.js, which most dapps use?"

---

## Cross-plan ranking for finalist potential

| Rank | Plan | Overall | Top 10 | Why it ranks here | Single most important fix |
|---|---|---|---|---|---|
| 1 | E SameBuild | 7.0 | Maybe (strongest) | Stakes everyone knows, one binary moment, and a demo the team controls | Open and close on the Bybit tamper beat, and answer the debugger-permission question before we ask it |
| 2 | B Dapp Leak Report | 6.8 | Maybe | The most legible and most usable today, but the key beat depends on real dapps and venue Wi-Fi | Pre-verify one surprising leak on a famous dapp and a top-20 headline number; cut fix mode from the live demo |
| 3 | A Lightfoot | 6.0 | No | Real engineering and a good lie-catching beat, but no user and too much network | Open with the lying-RPC beat on localhost, and ship the drop-in provider as the product |
| 4 | C Chupke | 5.5 | No | A strong partner-prize entry, but the privacy claim breaks in Q&A and the demo is overloaded | Rewrite the promise to what is true (who got paid is hidden, payers and amounts are not), and cut to three beats |
| 5 | D NullRelay | 5.0 | No | The best EF alt mempool entry, but unreadable and unusable for a generalist panel | Compress to the 90-second "zero-balance address withdraws, red, red, green" story, with measured numbers only |

### The single plan we would bet on: E (SameBuild)

B and E tie on the mean (6.8). We break the tie on the two things that decide a top 10 deliberation:

1. **The moment.** "The browser refused to run the file that stole 1.5 billion dollars" beats "an analytics vendor got a test address". The stakes are money, the reference is universal, and the proof is binary on one screen. It is the VEIL VPN pattern (a sharp promise proven live) applied to the frontend supply chain, the same area where npmguard reached the Cannes 2026 top 10.
2. **Control.** E's key beat uses E's own dapp, server, contracts and cached verified state, so venue Wi-Fi can't kill it. B's key beat needs a real third-party dapp to load and auto-connect through a NAT IP shared by hundreds of hackers. That is the plan's own "High" risk, and its fallback (a cached report) removes exactly the magic that earns the slot.

E also scores higher on Technicality, which carries weight with the protocol engineers in the room.

**What would flip the bet to B:**
- If E's Chromium blocking is not reliable by the Fri 03:00 check and the team falls back to detect-and-kill (F2), the core promise ("before it runs") is gone, and B moves to first.
- B can also win outright if it arrives with a pre-verified, genuinely surprising finding on a famous dapp, a top-20 headline, and teams at the event who used it. That would be the strongest Practicality story in the set.

Neither is a lock. As written, both are "maybe".

## Patterns across all five plans

1. **Every script has too many beats.** Each plan tries to prove two to four properties, and we remember one. Pick one moment, prove it in the first 60 seconds, and end on it.
2. **Four of the five spend the first 20 seconds talking over a title card** (A, B, D, E). Show the moment instead of describing it.
3. **Tor or Nym runs live in four of the five demos** (A, B, C, E), and it is their shared point of failure. Never make the key beat depend on a mixnet booting in the room.
4. **Jargon.** RPC, Anon-RPC, light client, specifier, frames, stealth, and the CROPS letter codes are EF's internal vocabulary, and generalist judges don't know it. Use it only in Q&A.
5. **Self-attested proofs are weak.** Your own proxy logs and your own planted fixtures carry less weight than independent checks: a public IP checker, a public explorer, or a target the judge chose.
6. **Screens that won't read on a room monitor.** Docked DevTools, tailing terminals and five-tab layouts can't be read from the judges' side of the table. Use one window and large text, and if the room has one HDMI input, use one laptop.
7. **Each plan was written to win an EF or partner prize, then adapted to the finalist room.** The Q&A prep is excellent for the EF and alt mempool judges but too specialist for us. Prepare a 20-second plain answer to "who uses this next week?" for every plan.
