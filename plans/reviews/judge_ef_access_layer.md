# EF Access Layer panel review: five ETHGlobal Mumbai build plans

Panel: the EF Access Layer team, judging "Best Use of Anon-RPC", "Best CROPS App" and "Best CROPS Upgrade to an Existing Project", and deciding the single EF prize each project is placed in. Review date: 27 Oct 2026. Event: 5 to 7 Nov 2026.

Basis: the verbatim EF criteria and qualification rules in `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` (Q2), plus `ef_goals_and_gaps.md` and `anon_rpc.md` in the same folder. Mandate text is quoted where applied. Anything from my own memory outside the notes is marked "(verify)".

All five plans are Classic track, so "Best CROPS Upgrade to an Existing Project" (Continuity only) is out of play for every one of them.

## How we scored

- Each row is one verbatim criterion of the prize we place the project in. Scores run 1 to 10 and assume the plan is executed as written, with its own risks priced in.
- Overall is the plain mean of the rows. EF publishes no weights, and we invented none. When plans tie, we break the tie on the prize's own test: "structural (works without you) beats cosmetic (a setting)".
- The Anon-RPC prize lists six bullets. The fourth ("if you choose to exclude some traffic ...") qualifies the third. We score it as its own row so disclosure work shows.
- Forecasts assume what we expect on Saturday: several leak tools, several opt-in Tor toggles and viem `fetchFn` forks, and several recovery wallets.
- Mandate lenses applied:
  - CROPS "as an indivisible whole".
  - The walkaway test.
  - The "zero option": "any intermediary-free path that is possible must be built".
  - Quandary 5's unhappy case: "third-party dependencies (whether APIs, content delivery networks, or otherwise) disappear or break, or worse, where the team itself disappears".
  - Quandary 5's red flags: "closed components, whitelists, soft-default routing, discretionary upgrade ability, or dependency-heavy integrations".
- Plan D is scored only on placement and its CROPS claims. The alt mempool reviewers judge it in depth.

## Summary

| Plan | EF placement | Overall | Forecast | Lead property | Single most important fix |
|---|---|---|---|---|---|
| A Lightfoot | Best Use of Anon-RPC | 7.8 | 1st (2nd if verification falls back to cross-check) | Private reads that are also verified | Make the lying-RPC beat a well-formed forgery that both panels read from one endpoint, with Colibri verifying locally |
| B Dapp Leak Report | Best CROPS App | 6.8 | 2nd | P, measured rather than delivered | Emit and enforce a CSP allowlist, and give the fixture a real Anon-RPC transport, so the tool changes what ships |
| C Chupke | Best CROPS App | 5.6 | No placement (3rd at best) | P, recipient privacy | Admit and fix that relayer failover links every stealth address to the merchant |
| D NullRelay | Frame Transaction Alternative Mempool | Deferred (CROPS counterfactual 5.2) | Deferred; would not place in CROPS | CROPS claims only | Drop the "zero option" claim and send submissions and tree reads through Anon-RPC |
| E SameBuild | Best CROPS App | 7.0 | 1st | S, verified frontend | Hash every same-origin file (JSON and WASM included) and add a user override for revoke |

---

## Plan A: Lightfoot, verified anonymous reads

### Placement: Best Use of Anon-RPC

- It combines two items from that prize's own idea list: "portfolio dashboard" and "combine anon-rpc with a light client or proof verification".
- Anon-RPC is the default and only route. That is the qualification.
- The CROPS README is good hygiene. But we place by fit, and this fits Anon-RPC best.

### Scores (verbatim criteria, Best Use of Anon-RPC)

| Criterion | Score | Justification |
|---|---|---|
| "works end to end in the demo" | 7 | The path is designed, with fallbacks. But G1 (Colibri through `worker.fetch`), D4 (proof bytes over Tor) and D6 (memory for four Colibri instances plus two workers) are all open until day one. |
| "quality of user experience in demo" | 7 | Cached first paint, staged boot and plain badges are right. The demo is mostly plumbing (terminal, DevTools, ledger), and a watch-only view of three addresses is a thin product. |
| "how much of the app's traffic goes through Anon-RPC (if an app)" | 9 | 100% of RPC by construction: one egress module, a lint rule, a runtime guard, and a ledger that reports this criterion live. Only the static host and the user's wallet (for revokes) sit outside, and both are disclosed. |
| "if you choose to exclude some traffic as an intentional performance/anonymity tradeoff instead of implementation difficulty, that can be a good thing, just let us know" | 9 | Four exclusions, each with a reason. The shared public lane for head and price reads is a real trade-off, stated as one. |
| "could this be shipped for real after the hackathon" | 6 | Static, MIT, no backend. But desktop Chrome only, a heavy tab, one prover operator behind verified reads, curated token and spender lists, and pinned workers that need a rebuild to take a security fix. |
| "technical depth" | 9 | A light client under the anonymity transport, lane-scoped batching that does not link accounts, a fail-closed router with a hot standby, a pinned boot with a private re-check, and measured exit acceptance. |

Qualification ("Your app routes its RPC reads through Anon-RPC by default."): pass. There is no direct mode to switch to.

**Overall: 7.8**

### Forecast

1st, if G1 passes and the lying-RPC beat is a real forgery. 2nd, if it ships in cross-check mode, because "two endpoints agree" is a much weaker claim. The Tor toggles and `fetchFn` forks we expect will not reach it on depth. What could beat it is a well-built new worker or harness (OHTTP, Deno, a local JSON-RPC proxy), because those produce anonymity rather than consume it.

### Structural or cosmetic? The README CROPS section

- **Structural.** No direct code path exists to switch on. A guard blocks library leaks. The app pauses instead of leaking.
- One caveat: verification also fails closed, so the app's liveness now depends on whoever runs the Colibri prover.
- **README CROPS: mostly convincing.** The weakest line is **C**.
  - It says "We run no backend, relayer or RPC in your path". Yet verified reads go to "Colibri provers" (plan 5.6), which the C line never names, and the app pauses if they go.
  - It leans on the EF demo gateway, which our own adopters file says "may disappear at any time".
  - It leans on an IPFS CID that is only stretch S6.
- The S line still carries a "(verify the wording ...)" placeholder.

### Top 3 strengths

1. **It builds the composition we keep asking for.** Our notes record Kohaku's anon, Helios and Colibri providers as separate and mutually exclusive. Lightfoot aims at a gap our Reads team states in its own words: "Origin privacy and correctness proofs remain an open problem at RPC latency and cost."
2. **Fail closed by construction, not by a toggle.**
   - No direct route exists in the code, and a lint rule keeps it that way.
   - A runtime guard covers `sendBeacon` and `EventSource` too.
   - A ledger measures our traffic-share criterion live.
   - This is the opposite of what adopters ship today: Privacy Pools and Kiwi are opt-in and off by default.
3. **An honest threat model.**
   - Per-account lanes, no batches across lanes, and public reads that do not depend on the user's holdings.
   - `isolationKey` is passed but disclosed as not honoured.
   - TRAP and the PIR limit are stated before we ask.
   - The exit-acceptance matrix is data our notes say nobody publishes.

### Top 5 weaknesses and red flags (most serious first)

1. **The lying-RPC beat may be staged.**
   - The plan offers Walletbeat's proxy "or a byte-flipping proxy if Colibri runs in remote-prover mode". Garbage bytes fail any check.
   - If the unverified panel reads a JSON-RPC proxy while Colibri reads a prover, the two panels are not facing the same lie. Then "it cannot be lied to" is not shown.
2. **An unnamed single dependency.** Verified reads need Colibri's prover and checkpoint source, and the plan marks a self-hostable prover "(verify)". If that operator disappears, every read pauses. That is quandary 5's unhappy case, and the C line is silent on it.
3. **The promise overstates.**
   - "Every read ... is checked against Ethereum's own consensus" is false for CCIP-read gateway data, for the bundled token metadata, and for anything in cross-check mode.
   - A light client trusts a sync-committee supermajority and a pinned checkpoint, not "consensus".
4. **"Zero clearnet RPC reads" is an increment, and it moves trust rather than removing it.**
   - Privacy Pools already pins the hash by intercepting `0x3898587d`.
   - Answering locally means trusting the build. That is fine, but say so.
   - Pinning freezes users on an old tor-js until a rebuild. A worker security fix does not reach them. The banner informs; it does not update.
5. **The approvals feature misses the approvals that matter.**
   - A fixed matrix of about 20 tokens by 8 well-known spenders cannot see a drainer's approval, which goes to an unknown spender.
   - The Practicality row's "security responders checking a victim's approvals" is not served unless S4 (Approval logs by owner) ships.
   - Meanwhile the Uniswap stretch spends 4 to 5 hours on Permit2 lockdown and TWAP prices, which earn nothing in this prize.

### Must-fix changes

1. **Make the forgery real** (sections 1, 5.1 "Lying proxy", 9.1 beat 2:20).
   - In pre-event check 5, pick a Colibri mode where execution data comes from a JSON-RPC you choose (`eth_getProof`) and is verified locally.
   - Build one lying proxy that returns a forged `eth_getBalance` and a matching forged `eth_getProof` for the same account.
   - Point both the unverified panel and Colibri at that one proxy.
   - If Colibri cannot be fed by an RPC you choose, rename the beat "a lying prover is refused" and say so.
2. **Name the prover** (section 10, C and P lines).
   - Say who runs the Colibri prover and checkpoint source, and what they learn: addresses, seen from an exit IP.
   - Say what happens when they go: Paused, no leak. Say whether a self-hosted prover exists.
   - Add "stop the prover" to the kill-switch beat or the video.
3. **Narrow the promise** (section 1).
   - "Every read" becomes "every onchain read".
   - List CCIP-read responses and token metadata as unverified.
   - Replace "Ethereum's own consensus" with "sync-committee light-client proofs from a checkpoint pinned in the build".
4. **Add an update path for pinned workers** (section 5.3(a) step 6 and Q&A 6). When the private, verified re-check finds a new on-chain hash, offer a one-click accept of that verified value. A worker fix then reaches users without a rebuild. State the staleness trade-off in the README.
5. **Make measurements a deliverable** (section 6.1 M8).
   - Build a README table from at least 10 runs on venue Wi-Fi and a hotspot, per network.
   - Columns: cold boot, first verified paint, full refresh time, proof bytes per account, peak tab memory.
   - That table is the contribution to "at RPC latency and cost".
6. **Trade Uniswap for real approvals** (section 6.2). Move S4 (Approval events by owner topic, verified or cross-checked) into the MVP and drop S1 Uniswap. If not, remove the security-responder audience from section 3.2.

### Nice-to-haves

- S9 as a real upstream issue on ethereum/anon-rpc, with:
  - the exit matrix as JSON, so our bench can ingest it;
  - the pinned-bootstrap pattern written up as a spec note.
- S8 published as an EIP-1193 provider, plus a Kohaku PR that composes the anon and Colibri providers.
- Share beacon header sync across lanes (headers carry no addresses), and route only execution proofs per lane. This saves bytes and memory and eases D6.
- S7 constant-rate refresh, measured against the jitter-only default.

### Q&A we would use to break it

1. "Stop the Colibri prover now. What does the user see, and for how long?"
2. "Show the lying proxy's response next to the honest one. Is it well-formed? Do both panels read from it?"
3. "Four Colibri instances: does each sync the light client separately? How many bytes over Tor per refresh, measured?"
4. "tor-js ships a security fix tomorrow. How does a Lightfoot user get it, and when?"
5. "`isolationKey` is ignored. Two lanes refresh in the same second on one circuit. What does the exit learn, and what does the RPC learn from timing?"
6. "Your guard wraps fetch, XHR, WebSocket, EventSource and sendBeacon. What about RTCPeerConnection? Does anything in the tab gather ICE candidates from a public STUN server?" (verify for KPS)
7. "A drainer got an approval to an unknown spender. Does Lightfoot show it?"
8. "Which Colibri prover mode do you run, and does the prover see the addresses?"

---

## Plan B: Dapp Leak Report

### Placement: Best CROPS App

- The prize lists this idea verbatim: "a tool that shows what an app leaks (RPC calls, trackers, metadata)".
- Not Anon-RPC:
  - the tool's own reads are a handful of calls;
  - fix mode reroutes someone else's dapp inside a test browser;
  - the plan itself says most findings sit outside RPC.
- If S2 (the Anon-RPC coverage audit) became the main product, we would reconsider.

### Scores (verbatim criteria, Best CROPS App)

| Criterion | Score | Justification |
|---|---|---|
| "works end to end in the demo" | 7 | The fixture with 9 planted leaks is a solid floor. Live auto-connect on a judge-picked real dapp is the plan's own biggest risk, and its fallback is a cached report. |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | 5 | The evidence is structural: a fresh canary proves itself, and nothing of the team's has to stay up. The privacy is not. No user is more private unless a dapp team acts. Fix mode is a simulation, and the CI gate is a setting a team opts into. |
| "the other three still hold, or trade-offs are stated in the README" | 7 | C, O and S are clean: it runs locally, it is GPL, and the throwaway key stays in Node. But the P line claims "Our tool sends nothing about you anywhere" while the plan calls check.torproject.org directly and visits every third party from the user's IP. |
| "UX: would someone use it without knowing what CROPS means" | 8 | "4 companies received your wallet address" needs no glossary. One URL box, evidence drawers, and the guarantees tucked away. |
| "could it ship after the hackathon" | 7 | An npm CLI and an Action with zero infrastructure can ship. Connect recipes and the entity map will rot as dapps change, and someone has to maintain them. |

Qualification: GPL-3.0-or-later; CROPS section drafted; video target 2:45; no trackers in the UI; key in Node memory. Pass.

**Overall: 6.8**

### Forecast

2nd. It is likely the most rigorous of the several leak tools we expect, and the canary is the easiest evidence to trust. But a measurement tool loses the structural tiebreak to any working serverless recovery wallet or frontend verifier. With must-fix 1 it can contend for 1st.

### Structural or cosmetic? The README CROPS section

- **The measurement is structural. The privacy outcome is cosmetic.** Today the tool tells you that you leak. It stops no leak for any real user. Enforcement flips this: a browser-enforced allowlist that the tool generates and CI keeps true.
- **README CROPS: partly convincing.** The weakest line is the **first P bullet**.
  - "Our tool sends nothing about you anywhere" is contradicted by the plan's own data flow:
    - the direct call to check.torproject.org;
    - the scan itself, which contacts the dapp's third parties from your IP;
    - the bootstrap RPC;
    - the gateway.
  - The C line's "At run time, nothing" also needs the fix-mode dependencies stated first, not after a colon.

### Top 3 strengths

1. **Self-proving evidence.** A 160-bit address born in the session can only reach a vendor through that session, and the drawer shows the bytes.
2. **Ground truth plus a regression gate.** Nine planted leaks with a vitest check, and an Action that turns a Privacy Pools-style regression ("108 per-nullifier `eth_call`s issued by SDK internals during a single send") into a red check.
3. **Local, serverless and honest.** It is GPL, and its lower bounds are disclosed: empty canary, connect flow only, the W-2 residual, and salted hashes it cannot see.

### Top 5 weaknesses and red flags (most serious first)

1. **It measures P but does not deliver it.** "Fix mode changes the transport, which is what a dapp gets by adopting Anon-RPC" is wrong. Playwright route interception skips the boot time, CORS, failure handling and UX that a real adoption must solve.
2. **False assurance.**
   - An empty canary, a connect-only flow and a fixed encoding list will make many dapps look clean.
   - A "Grade A" or "W-1 PASS" from that can mislead.
   - So can a generated P line that other teams paste into their READMEs.
3. **A crowded lane and overstated novelty.**
   - Several leak tools are expected.
   - Planting a unique identifier and searching for it in plain, hashed and encoded forms is standard web-privacy method. The Leaky Forms study did it with planted email addresses (verify).
   - "Is Your Wallet Snitching On You?" already measured 616 dapps.
   - What is new is the wallet-aware packaging, not the method.
4. **The P line contradiction** (above). It sits in the one section the EF qualification requires.
5. **It reads as an EF rating, and the probe changes what it measures.**
   - Grading third-party dapps with EF guarantee IDs on a public leaderboard looks like an EF rating. The Mandate says EF is not "an Accreditation Body": "We do not certify or endorse projects".
   - The `metamask-compat` profile changes what dapps do, so the results may not match real users.

### Must-fix changes

1. **Generate enforcement, not just a report** (sections 6.1 and 9.1 beat 3:00).
   - From the observed allowlist, emit a strict CSP (`connect-src`, `script-src`, `frame-src`) and a viem/wagmi transport patch.
   - Apply both for real in the fixture repo.
   - Show the browser itself blocking a newly added tracker in a production build, and CI going green.
2. **Make the "after" real** (sections 5.3 and 9.1 beat 2:00).
   - The fixture dapp gets a real Anon-RPC integration (`http(url, { fetchFn: worker.fetch })` in its own source), measured by your meter.
   - Keep route interception only as "preview on a dapp you do not own", labelled "simulated" everywhere.
3. **Replace grades with coverage** (section 5.6).
   - Remove letter grades and PASS.
   - Report "not observed in: load, connect, account switch; not tested: signing, swaps, funded accounts".
   - Put that coverage line inside the generated P line.
4. **Fix the P line** (section 10).
   - Delete "Our tool sends nothing about you anywhere".
   - List every outbound contact:
     - the target dapp and its third parties;
     - check.torproject.org, called directly by design for the "before" value;
     - the bootstrap RPC and the gateway;
     - the worker resolvers;
     - the Playwright browser download at install.
5. **Swap the stretch order** (sections 6.1 and 6.3). Move S2 (Anon-RPC coverage audit) into the MVP and cut S1 (leaderboard). S2 is new, it measures our own traffic-share criterion for Privacy Pools and Kiwi News, and it is the part we would use.
6. **Credit the method, disclaim EF** (section 4). Credit planted-identifier taint tracking as prior method, and claim the packaging. Add "Not an EF rating" to every report. Keep W-IDs in the methodology, not in public grades.

### Nice-to-haves

- S4, the local anonymized JSON-RPC proxy. It is close to a new harness, which the Anon-RPC prize values.
- A funded canary on a testnet or fork, for dapps that hide UI from empty accounts.
- Upstream the web3 entity map to Walletbeat.
- An `ANON_RPC_FEEDBACK.md` built from the fix-mode pain points.

### Q&A we would use to break it

1. "Scan app.uniswap.org with your empty canary. If it grades well, is that true for a user who swaps?"
2. "Name one real user who is more private on Sunday because of this tool."
3. "Why should a dapp team run your gate instead of shipping a CSP that the browser enforces for every user?"
4. "You announce as MetaMask. Do dapps send different telemetry for MetaMask users? How do you know?"
5. "A vendor salts and hashes on its server, or encrypts the payload. What share of leaks do you miss?"
6. "W-1 is a wallet guarantee, and the dapp does not choose the wallet's RPC. What does a dapp W-1 FAIL mean?"
7. "Fix mode excludes WebSocket RPC. How many of your demo dapps subscribe over wss?"

---

## Plan C: Chupke, private invoices and checkout on Whitechain

### Placement: Best CROPS App

- It matches the listed idea "a payment, messaging or social app where your server learns nothing about who talks to whom".
- Not Anon-RPC:
  - `merchant-node` and the relayer read directly;
  - the browser part is `fetchFn` wiring plus a "Continue without private connection" button, which we have seen many times.

### Scores (verbatim criteria, Best CROPS App)

| Criterion | Score | Justification |
|---|---|---|
| "works end to end in the demo" | 6 | Contracts, stealth math, memo encryption, period keys, a relayer with ten anti-drain rules, a widget, four pages, merchant-node and a demo shop, all in 36 hours. The qualifying USDT has 10 holders and no faucet. |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | 5 | Stealth derivation in the client and no invoice server are structural. But merchant-side privacy depends on the shared relayer. When "you" go away, the failover links the merchant's addresses. That is privacy on the happy path only. |
| "the other three still hold, or trade-offs are stated in the README" | 5 | Sequencer, issuer freeze and passkey domain binding are stated. Forced inclusion with a custom gas token is claimed but untested; the plan's own feedback outline lists it as undocumented. The passkey wallet's recovery risk is not stated. |
| "UX: would someone use it without knowing what CROPS means" | 8 | Amount, fingerprint, receipt. No chain name, no gas. The merchant sees Paid, Refund, Export. |
| "could it ship after the hackathon" | 4 | Mainnet USDT EIP-3009 support is "(verify)". Detecting payments by downloading every USDT Transfer log does not scale on a busy chain. The anonymity set is whoever else adopts it, on a new L2. |

Qualification: Apache-2.0, CROPS section, video under 3:00, no trackers, viewing keys on the merchant's server with a reason given. Pass on paper. Risk: "a README a judge can run it from", when the main flow needs a token judges cannot get.

**Overall: 5.6**

### Forecast

No placement is the most likely outcome; 3rd at best. The CROPS story is bought with a single-sequencer L2, a freezable stablecoin and a relayer whose failover breaks the lead property. Stealth-address payments are also the most crowded privacy category at ETHGlobal. This is a strong Whitechain Operate and Scale plan that happens to have a CROPS section.

### Structural or cosmetic? The README CROPS section

- **Partly structural.**
  - Customer-to-merchant privacy is structural on the happy path.
  - On the unhappy path (our relayer gone), privacy becomes something the merchant has to manage. That is a setting.
- **README CROPS: not convincing as drafted.** The weakest line is **C**.
  - It presents "the merchant's own relay takes over" as resilience. That fallback makes the merchant's relay EOA the `tx.from` of its payments and sweeps.
  - It states "forced inclusion through L1 within about 12 hours" as fact.

### Top 3 strengths

1. **Nonce binding in the router.**
   - Every parameter goes into the EIP-3009 nonce.
   - `receiveWithAuthorization` forces the router as the caller.
   - The fee recipient is bound too.
   - So neither a relayer nor a mempool copycat can redirect funds. The router has no owner, no upgrade path and no custody, and redirect-attack tests cover it.
2. **Per-period hardened viewing keys** with an independent "no fabrication, no omission" check. That is selective disclosure on top of default privacy, as the Mandate asks: "end users should always selectively negotiate their disclosures ... on top of a base of freely available, unconditional privacy".
3. **No invoice server, chain-checked settlement, hygiene in code.**
   - Invoices live in URL fragments.
   - The merchant checks settlement from the chain with its own key (P-4).
   - A hygiene guard enforces H1 to H3 in code.

### Top 5 weaknesses and red flags (most serious first)

1. **Failover deanonymizes the merchant.**
   - When the merchant relay submits, its funded EOA is visible on every payment and sweep it relays. That links all the merchant's stealth addresses to one gas payer: H5 in a new costume.
   - H4 comes back too, because a different relayer means a different fee policy.
   - The demo's "moment it matters" performs this failover on stage.
   - CROPS is an indivisible whole. Here C is bought with P.
2. **Base-layer CROPS.**
   - One sequencer, a Guardian that can pause withdrawals, and permissioned fault proofs.
   - An issuer that can freeze any address.
   - Forced inclusion untested with WBT as the gas token.
   - Most of this is stated, but the prize says "without giving up the other three".
3. **A domain-bound passkey wallet.**
   - The prize description names "a wallet you can't recover without the vendor's server" as a failure.
   - A PRF key bound to the shop's RP ID is the same failure, with a domain in place of a server. Any balance left in it is gone if the domain goes.
   - The plan does not say what decrypts the merchant's backup file. If it is the passkey, the backup shares the same failure.
4. **Overstated novelty and privacy claims.**
   - Gasless, relayed token spends from stealth addresses are not new. Umbra's contract has had a sponsor-paid token withdrawal for years (verify `withdrawTokenOnBehalf`).
   - "The server learns nothing", yet the relayer can cluster one session's sweeps by timing and exit.
   - The demo's anonymity set is three recipients, all of them the team.
5. **Scope and qualification risk dilute the EF story.** Two audiences, five parties, a six-beat four-minute demo, and a hard gate on a token with 10 holders.

### Must-fix changes

1. **Fix or label the failover** (sections 5.7 and 10.2 C).
   - State that merchant-relay failover links the merchant's addresses.
   - Make the kill-switch beat fail over to an unrelated, shared relayer run by a different operator, or to the customer's own wallet for `pay`.
   - Label the merchant relay "liveness only, not private".
2. **Complete the P line** (section 10.2 P). Add three facts:
   - the relayer can link one session's sweeps (no `isolationKey`);
   - every payment is visibly a Chupke Router payment;
   - the demo's anonymity set is three recipients.
3. **Fix passkey recovery** (section 5.5).
   - Either keep the payer passkey wallet at zero between payments (fund exactly per checkout), or show an exportable key at setup.
   - Make the merchant seed backup decryptable with a passphrase, not the passkey.
   - Put both in the S line.
4. **Correct the novelty** (sections 0 and 4).
   - Claim what is new: no escrow contract, a token-native authorization bound into the router nonce, and per-period disclosure keys.
   - Lead the EF pitch with the accountant key and P-4, not "gasless stealth".
5. **Prove or soften forced inclusion** (section 10.2 C). Either run stretch 5 and link the forced-inclusion transaction, or write "documented by Whitechain, untested by us".
6. **Give judges a runnable path** (section 10.1 item 5). Without prize USDT a judge cannot run the main flow, so add an anvil fork of Whitechain Sepolia with `deal`. Then "a README a judge can run it from" holds.

### Nice-to-haves

- Run the Kohaku #324 vectors (stretch 2) and report the pass count.
- Cut the contractor beat from the live demo, and give the privacy proof that time.
- Measure whether Whitechain's Cloudflare front accepts Tor and Nym exits, and publish the result.
- Commit each period's viewing public key onchain (stretch 7), so completeness is checked against a declared set.

### Q&A we would use to break it

1. "You killed your relayer and the merchant relay submitted. Open the explorer. Who is `tx.from`, and who funded it?"
2. "A merchant off-ramps 50 stealth balances to one exchange. Walk me through it without linking them."
3. "The shop's domain is seized. A customer has 20 USDT left in the passkey wallet. How do they get it?"
4. "Three merchants use Chupke. What is the anonymity set of 'paid a Chupke address'?"
5. "Whitechain's sequencer ignores your router. Show forced inclusion with WBT as the gas token."
6. "Umbra relayed token withdrawals from stealth addresses. What exactly is new?"
7. "How many gigabytes is 'download every USDT Transfer log' on a busy mainnet?"

---

## Plan D: NullRelay (placement and CROPS claims only)

### Placement: Best use of the Frame Transaction Alternative Mempool

- It submits frame transactions that need a staked payer, reads non-entity storage, and attacks the reputation rules. That is alt mempool work.
- Not CROPS: it runs on a devnet only, Hegota is not live, and the UX is "paste a Tornado note".
- Not Anon-RPC: no reads are routed.
- Depth scoring belongs to the alt mempool reviewers.

### CROPS counterfactual (if placed in Best CROPS App, which we would not do)

| Criterion | Score | Justification |
|---|---|---|
| "works end to end in the demo" | 7 | An admitted withdrawal on a devnet is end to end, for a devnet. |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | 6 | Replacing the off-chain relayer with a contract payer is structural. Privacy from the gateway is not addressed, and the stated fallback undoes the property. |
| "the other three still hold, or trade-offs are stated in the README" | 6 | The contracts have no upgrade path, which is good. The owner can unstake and withdraw the float, and the owner key type is not stated. |
| "UX: would someone use it without knowing what CROPS means" | 4 | A Tornado note, a devnet and lane cards. It is built for protocol judges. |
| "could it ship after the hackathon" | 3 | It needs Hegota and ERC-8421 live, and the FOCIL eligibility of alt-mempool-only transactions is open. |

**CROPS counterfactual: 5.2.** Alt mempool scores: deferred.

### Forecast

Deferred to the alt mempool reviewers. From the Access Layer side it looks like a credible podium entry in that prize. It would not place in CROPS.

### Structural or cosmetic? The CROPS claims

- **Structural removal of the off-chain relayer.** The payer has no allowlist, so it can stop for everyone but cannot single anyone out. That is censorship resistance in the Mandate's sense: "No actor can selectively exclude valid use".
- Privacy along the submission path is not addressed.
- **CROPS section: partly convincing.** The weakest line is **C**: "This is the 'zero option' ..., W-4 and P-2".
  - The stated fallback, "withdraw directly", needs gas in the fresh address. That is the exact linkage the project exists to remove.
  - A staked, owner-run paymaster is an intermediary: minimized, but present.
- The P line is honest that the gateway sees the IP. But it treats as a footnote what is the main leak for a mixer withdrawal.

### Top 3 strengths (CROPS lens)

1. The payer is a contract with no allowlist. Nobody can be selectively excluded.
2. The fan-out attack finds a censorship lever, an honest payer's reputation burned for the price of one note, and proposes a fix. That is chokepoint prevention, which the Mandate lists as core work.
3. The mocked list is honest: the devnet anonymity set is the team's own deposits, and the gateway sees the IP.

### Top 5 weaknesses and red flags (CROPS claims, most serious first)

1. **"Zero option, W-4 and P-2" is overstated** (above).
2. **P understates the leaks.**
   - The gateway sees the IP, the fresh sender and the recipient.
   - The tree rebuild downloads Deposit events from the devnet RPC directly, close to the time of withdrawal.
   - Both leaks are avoidable with an Anon-RPC worker, since `eth_sendFrameTransaction` is an HTTPS JSON-RPC call.
3. **C is unproven at the protocol level.** The plan admits that alt-mempool-only transactions "may not be FOCIL-eligible while EIP-8369 is unsettled", but only in the trade-offs, not in the C line.
4. **Owner powers are missing from C.**
   - `withdrawFloat`, `unlockStake` and the owner key type are not in the C line.
   - "Anyone can redeploy it" omits two things: a redeploy needs about $1000 of stake under ERC-8421, and it starts with no reputation.
5. **The use case is partly done already.** MacWha's 4337 privacy-paymaster, minimal-shielded-pool and Himitsu all cover it. The novelty is the attack, which is alt mempool work, not CROPS.

### Must-fix changes (CROPS claims)

1. **Rewrite C** (section 10, CROPS). Replace "zero option" with: "intermediary-minimized: the payer is a contract that cannot selectively exclude users; stopping it stops everyone; without it, the fallback is a self-funded withdrawal that links you".
2. **Route the leaks through Anon-RPC.** Send `eth_sendFrameTransaction` and the Deposit-event reads through an Anon-RPC worker (`worker.fetch` to the gateway and RPC URLs). If not, make the IP leak the first bullet of P.
3. **Complete C.** Add the owner key type and powers, the stake cost of a redeploy, and FOCIL eligibility.
4. **Do not tick CROPS** in the submission form. Keep the CROPS section as hygiene.

### Nice-to-haves

- S5, in-browser proving. It removes the localhost prover service and simplifies the O and S lines.
- S6, posting the rule proposal on the ERC-8421 Magicians thread: build in the open, as the Mandate asks.

### Q&A we would use (CROPS only)

1. "Your owner unstakes. The user withdraws directly. Doesn't that need gas in the fresh address?"
2. "The gateway sees the IP and recipient of a mixer withdrawal. Why not send it through Anon-RPC?"
3. "Who holds the paymaster owner key, and what can it do tonight?"
4. "Is an alt-mempool-only withdrawal protected by FOCIL? If not, who can censor it?"

---

## Plan E: SameBuild, verified frontend

### Placement: Best CROPS App

- It is the prize's own idea: "a tool that proves the shipped frontend or extension matches the public repo".
- The 1TS control "Verifiable Frontend Hashes" sits at "Research stage".
- Not Anon-RPC: the extension's chain reads all go through Anon-RPC, but page traffic does not, and integrity is why it exists.

### Scores (verbatim criteria, Best CROPS App)

| Criterion | Score | Justification |
|---|---|---|
| "works end to end in the demo" | 7 | The tamper beat is robust, and every link is real: tag, Action, Sepolia, rebuild, extension. Chromium pre-execution blocking (D3, D4) and Colibri over Nym in an offscreen document (D5) are open risks. |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | 9 | Enforcement on the device against immutable contracts with no admin. Mirrors are untrusted. Anyone can rebuild. It keeps verifying if the team, the org and the domain all disappear. |
| "the other three still hold, or trade-offs are stated in the README" | 7 | O is excellent: reproducible, extension included. P is thoughtful: Nym, timer refresh, nothing on navigation. C has a guardian revoke with no user override, unstated rebuilder liveness, and trust-on-first-use enrollment. |
| "UX: would someone use it without knowing what CROPS means" | 6 | The badge and block page are plain. But Chrome's debugging banner, a 10 to 20 second cold-start hold, and enrollment by origin plus specifier address will stop a normal user. |
| "could it ship after the hackathon" | 6 | The Action, contracts and verifier library can ship. The extension cannot ship to normal users on `chrome.debugger`. Only Vite static builds reproduce, and independent rebuilders do not exist yet. |

Qualification: MIT and GPL, a CROPS section titled as required, video under 3:00, no trackers, settings stay local. Pass.

**Overall: 7.0** (only 0.2 above B on the mean, but well ahead on the structural tiebreak)

### Forecast

1st, if the tamper beat runs on Chromium and the data hole is closed. 2nd, if interception falls back to F2, because "stopped before it could run" becomes "killed after it loaded". It shares the structural tiebreak with any good serverless recovery wallet, and it beats most leak tools on it.

### Structural or cosmetic? The README CROPS section

- **Structural.** The check runs on the user's device against Ethereum state, and it holds when the dapp's own server lies. It is the clearest walkaway-test pass of the five.
- **README CROPS: mostly convincing.** The weakest line is **C**.
  - It says a guardian revoke "can only make the extension block". That is true, and it is a kill switch: a compromised or coerced guardian Safe locks out every protected user, with no user override.
  - It does not say what happens when rebuilders stop. New releases never reach K of N.
- The O line also claims `samebuild verify-dir`, which is stretch S4.

### Top 3 strengths

1. **Structural to the core.**
   - It blocks bytes on the device before they execute.
   - The contracts have no admin.
   - Mirrors are untrusted.
   - No-rollback and the activation delay are enforced by contract and fuzzed.
2. **It reuses the Access Layer's own patterns.**
   - A specifier-shaped registry (`releaseHash()`, `releaseResolvers()`) and "verify resolvers before spending gas", both from anon-rpc.
   - Colibri over Anon-RPC (Nym) with timer refresh, so checks do not reveal browsing.
   - A WEBCAT-shaped manifest that composes with the 1TS-funded work instead of competing with it.
3. **An unambiguous moment.**
   - Tamper, red page, attacker log 0; unprotected browser, attacker log 1.
   - It rebuilds from source instead of trusting a hash the developer asserts. That is the gap over TEE Shield that our notes point at.

### Top 5 weaknesses and red flags (most serious first)

1. **An enforcement hole: "JSON data is allowed"** for same-origin responses not in the manifest.
   - A CDN attacker edits `/config.json` (contract address, treasury, token list) instead of a JS chunk, and the badge stays green.
   - WASM fetched as data, workers, service workers and iframes are also outside the MVP.
   - Cross-origin APIs that return calldata (quote or routing APIs) are outside the model, and the README does not say so.
2. **A kill switch with no override.**
   - The Mandate's quandary 3 asks for "clear override paths". A guardian revoke blocks every protected user.
   - A 24 to 72 hour activation delay also blocks emergency fixes, and the plan does not say what users do meanwhile.
3. **The trust root is not there yet.**
   - The demo rebuilders are the team's laptop and VPS. Nobody else runs a rebuilder, or has a reason to.
   - Enrollment is trust on first use.
   - Reproducibility covers Vite static builds only.
4. **Claims rest on stretch goals and overclaims.**
   - The one-sentence promise includes "make the RPC lie ... and Chrome refuses it", which is stretch S1.
   - The O line claims `verify-dir`, which is stretch S4.
   - "Not even the dapp's own team can get different code past it" overclaims: the team can ship anything, just publicly and after a delay.
5. **Scope.**
   - CI, contracts, Chromium interception, Colibri over Nym in an offscreen document, rebuilds, and 7 to 9 hours of ENSv2, all in 36 hours.
   - The ENS stretch competes with interception hardening, and the EF score depends on the hardening.

### Must-fix changes

1. **Close the data hole** (section 5.3 step 5).
   - Every same-origin file in `dist/` must be in the manifest, JSON and WASM included.
   - Unhashed runtime data passes only at paths the manifest declares.
   - Add a README boundary: cross-origin APIs are not covered. Use the quote-API example.
2. **Add an override** (sections 5.4 and 10 C).
   - After a revoke or a mismatch, let the user choose "run this version anyway", with a warning and a local log.
   - State the emergency-fix story against the delay.
3. **Stop claiming stretch work** (section 1 and the O line).
   - Either move S1 (lying RPC, 2 to 3 hours) into the MVP, or remove it from the promise.
   - Remove `verify-dir` from the O line unless S4 ships.
4. **Complete C** (section 10).
   - Say what users see when rebuilders stop (the last verified release stays; the update stays pending), and whether users can lower K.
   - Name Colibri's prover and checkpoint in the C line as availability dependencies, not only in the mocked list.
5. **Fix the overclaim** (section 1 pitch). Replace "not even the dapp's own team" with "nobody can ship different code silently: every release is public, delayed and rebuilt".
6. **Protect the critical path** (section 2.2). Keep the ENS go/no-go, but take it at integration point 1 (Fri 09:30), not at 12:00. Never move the extension owner off interception hardening for it.

### Nice-to-haves

- S3: the Sigstore check inside the extension, using WEBCAT's own browser verifier.
- S4: `verify-dir` run on the extension itself.
- Query each enrolled app's release on its own lane, so no single RPC sees the set of apps a user has enrolled.
- Write up the specifier-shaped release loader for the anon-rpc "Springboard" idea, so a harness can pin a whole frontend.

### Q&A we would use to break it

1. "I change `/config.json` on your CDN to point at my treasury. Does the badge stay green?"
2. "Your rebuilders are your laptop and your VPS. Who rebuilds Uniswap's frontend every release, and why would they?"
3. "The guardian Safe revokes. Every protected user is locked out. How is that not a kill switch? How does a user override it?"
4. "At enrollment I control the origin and serve a well-known file pointing to my specifier. What stops me?"
5. "A critical bug ships in the active release, and your delay is 72 hours. What do users do?"
6. "Would you ship the debugging banner to a normal user? What is the path off `chrome.debugger`?"
7. "The Colibri prover is down and the cache is past max age. Does the page load?"

---

## Cross-plan ranking for EF prizes

1. **A, Lightfoot** (Best Use of Anon-RPC; 1st likely). It fits its prize's criteria most deeply, and that prize has the largest first place ($2,500).
2. **E, SameBuild** (Best CROPS App; 1st likely). The most structural CROPS app of the five.
3. **D, NullRelay** (alt mempool; deferred). Strong in its own lane. We do not rank it within that prize.
4. **B, Dapp Leak Report** (Best CROPS App; 2nd likely). Probably the best of the leak tools, but leak tools lose the structural tiebreak.
5. **C, Chupke** (Best CROPS App; likely no placement). Its real home is Whitechain.

A and E share their riskiest piece: Colibri running through `worker.fetch`. Whichever is built, prove that path in the first hours.

## The plan we most want built: A

- It attacks a gap our Reads team named in its own words: "Origin privacy and correctness proofs remain an open problem at RPC latency and cost".
- Its measurements are useful to us even if nobody uses the app afterwards: boot time, proof bytes over Tor and Nym, and exit acceptance per provider.
- It ships the pattern we want adopters to copy instead of opt-in toggles: private by default, verified, fail closed, nothing to switch on.
- E is a close second. It is the most structural CROPS entry, and it brings our specifier pattern to frontends.
