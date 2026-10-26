# Whitechain judging review: Plan C, "Chupke"

Reviewer stance: the Whitechain judging team at ETHGlobal Mumbai (5 to 7 Nov 2026). We judge Operate, Tokenize, Scale and Continuity from the repo, README and video only. We publish no numeric rubric, so our "What we want to see" and "Won't place" lists and the six qualification items are the rubric, quoted verbatim below from `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` (Q3) and `whitechain.md`.

Basis: `plans/C_private_invoicing_whitechain.md` as of 27 Oct 2026. We judge the plan as if the repo, README and video end up exactly as the plan describes. A feature that does not show up in those three places scores zero, however good it is live. The finalist-room demo (killing the relayer live, a judge paying from a phone) earns nothing with us unless it is also in the video.

What we care about: could a merchant plug this in on Monday? Are both the merchant and the paying customer views shown? Does the flow go past the first payment? Does the payer see zero crypto steps and hold no WBT? Where does the relayer's WBT come from, and what stops it being drained? Are all six qualification items met? Privacy only counts with us when it makes a business more willing to take USDT on Whitechain.

---

## 0. Verdict in brief

- **Enter Operate (primary) and Scale (secondary).** Both sit inside the one Whitechain partner slot, so Scale is free to add. Do not count on Tokenize, and Continuity is closed to a Classic team.
- **Operate: 7/10, forecast 2nd.** Few teams will go this far past the first payment: a webhook, a receipt, one-click partial refunds the customer can check, and an export the accountant can verify. It is held back by the parts a real merchant has to carry: the merchant holds its own keys, the period keys change, a merchant server is needed, the customer needs a wallet funded beforehand, and nothing gets the revenue to an exchange.
- **Scale: 6/10, forecast none (2nd is the upside).** It is our first listed Scale idea, and done well. But the "zero crypto steps" is staged by pre-funding the payer wallet. The Anon-RPC boot and the fail-closed design put latency and a privacy button into the checkout. The production WBT answer is "not built".
- **Overall: 7/10 as planned, about 8/10 with the must-fixes in section 8.** The whole thing is worth 0 if no payment in prize USDT `0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7` reaches the README. That is the one binary risk.

---

## 1. Which tracks, track by track

| Track | Enter? | Why |
|---|---|---|
| **Operate: Stablecoin Payments for Business** | **Yes, primary** | It covers 3 of the 4 listed ideas and all three "What we want to see" items. The refund and accountant-export work is exactly the "what happens after it" we asked for. |
| **Scale: Payments Nobody Notices** | **Yes, secondary** | It is our first listed idea almost word for word: EIP-3009 through your own relayer, with the merchant covering gas. The relayer write-up is above average. Its privacy work earns nothing in Scale and adds latency. If it places in Operate, we are less likely to give the same team a Scale prize too. |
| **Tokenize: Real World Finance** | **No** | Our own text says "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize." There is no asset, no issuance and no transfer rule. It would take a different product (invoice financing with an allowlisted buyer). |
| **Continuity** | **Not eligible** | "only available to Continuity Track participants", and the team enters Classic. |

Tell us in the README which track is primary. If a team ticks every track, we have to guess what it wants judged.

---

## 2. Item-by-item verdicts

Key: **Pass** = meets it on the plan as written. **At risk** = meets it only if something specific goes right, or a judge could reasonably read it the other way. **Fail** = does not meet it.

### 2.1 Operate: description and ideas

| Item (verbatim) | Verdict | Why |
|---|---|---|
| "Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it. Build a payment flow a real merchant could plug into their app or store, and show it working end to end with test stablecoins on Whitechain. It is plain EVM, so use any tooling you like." | **At risk** | "From the first checkout to what happens after it" is a strong pass: checkout, webhook, receipt, refund, export. "A real merchant could plug into" is at risk. The merchant must:<br>• hold a seed and keep a backup of it;<br>• ship a `chupke.merchant.json` that carries per-period keys;<br>• run `merchant-node` with viewing keys, plus a WBT-funded hot key if relay mode is on;<br>• accept that every order's revenue sits at its own address, with a guard that resists sweeping it to an exchange. Customers need a passkey wallet, bound to the shop's domain, that already holds USDT. |
| Idea: "A drop in checkout for online stores with order webhooks and an onchain receipt" | **Pass** | `<ChupkeCheckout>`, an HMAC webhook from `merchant-node`, and a receipt that checks the Announcement and Transfer events. The webhook's delivery rules are not specified: how many confirmations, retries, an idempotency key (section 9). |
| Idea: "Payment links and invoices for remote studios, contractors and cross-border teams billing global clients, with due dates and reminders" | **Pass (thin on reminders)** | Fragment-encoded invoice links with a due date and an overdue state. Reminders are mailto or copy only. That is honest, and fine for a hackathon. |
| Idea: "Subscriptions and recurring billing with permit based pulls and cancel anytime" | Not built (no penalty) | Ideas are starting points. A cheap "renew" invoice would still earn the "renewal" in our extra credit (section 9). |
| Idea: "Refunds and partial refunds a merchant issues in one click, with a record the customer can check" | **Pass, strong** | The refund comes from the address that received the payment. `Sent(ref)` uses a reference only the two parties can compute, and the customer's receipt page shows "Refunded 1.00, verified on chain". This is the best part of the plan for us. |

### 2.2 Operate: "What we want to see"

| Item (verbatim) | Verdict | Why |
|---|---|---|
| "A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines" | **Pass, at risk on honesty** | The two snippets come to about 21 non-blank lines, so the code count is real. The integration effort is larger (section 4.1). Show it as a real `git diff --stat` of one commit in `examples/chai-shop`, with its own `package.json`. Also list the non-code steps, or a judge who reads the dashboard section will feel misled. |
| "Both views in the demo, the merchant and the paying customer" | **Pass** | Split screen in both the video and the live demo, and the contractor and accountant appear too. In the video the merchant gets about 25 s (1:25 to 1:50) plus the integration diff. We would like closer to 45 to 60 s, including merchant onboarding. |
| "Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use" | **Pass** | It has a refund, a partial refund and an export with an independent "N of N match" check. No renewal. The accounting model has gaps an accountant would hit in the first month (section 3.3): outflows are scoped to the period the funds came in, and the export columns are not specified. |

### 2.3 Operate: "Won't place"

| Item (verbatim) | Verdict | Why |
|---|---|---|
| "A pay button that sends a plain transfer" | **Pass (low risk)** | `ChupkeRouter.pay` binds the destination, the fee, the fee recipient and the memo into the EIP-3009 nonce, transfers atomically and announces. The one risk is how the explorer reads: a judge who clicks the README link sees "USDT to 0x7f.. (unknown)", which can look like a plain transfer. Put a note under the link that names each event in the transaction (section 4.3). |
| "tipping jars, bill splitters, or custodial bridges into a local currency token" | **Pass** | None of these. No custody: the Router holds nothing between calls. |
| "Payroll, escrow and revenue splits on their own" | **Pass, low to moderate risk** | The main flow is customer checkout, so this is not payroll "on its own". But "pay its contractors" is in the product's first sentence, the prior-art table is mostly payroll projects (Warden, Manila, PAYLOAD, RollPay), and 20 s of the video goes to a contractor payout. Contractor payouts are not on our list at all (section 4.3). |

### 2.4 Scale

| Item (verbatim) | Verdict | Why |
|---|---|---|
| "Businesses scale when their customers never have to learn crypto, and when software can pay software. Build a payment flow on Whitechain where the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on." | **Pass on WBT and seed phrase; at risk on "knowing what chain"** | The payer holds no WBT and signs only EIP-712, and the key comes from a passkey, so there is no seed phrase. But the passkey wallet only works because the team put USDT in it. A real customer has to send USDT on Whitechain to an address derived on that shop's domain, and that step is pure "knowing what chain". The plan states this (6.4 item 1). Stating it is honest; it does not solve it. |
| Idea: "Gasless checkout where the merchant covers gas, using permit or transferWithAuthorization (EIP 3009) and your own relayer" | **Pass** | `receiveWithAuthorization` through its own relayer, with the fee taken from the merchant's proceeds. |
| Idea: "Checkout with an embedded wallet or smart account from any provider that supports Whitechain Sepolia (chain ID 1874)" | Not applicable (justified) | They built their own passkey PRF EOA, because no hosted provider works on 1874 (Pimlico rejects the chain, Reown embedded wallets fail). That is a sensible choice, and it belongs in the feedback file. |
| Idea: "Pay per request APIs where an AI agent pays a business in USDT over x402, settled on Whitechain through a facilitator you run" | Not built | No penalty. Expect strong x402 entries to compete for Scale's two places. |
| "A payer flow with zero crypto steps visible, shown in the demo" | **At risk** | On screen the payer sees an amount, a fingerprint and a receipt, which is good. Three things work against it:<br>• Pre-funding is hidden behind a caption.<br>• The tor-js boot takes about 8 s (Nym about 11 s), with a 90 s fail-closed timeout. If the checkout opens with a cold worker, the customer waits.<br>• The off-by-default "Continue without private connection" button is privacy jargon in a checkout. We count anything that makes the payer think about networks as a crypto step. |
| "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it" | **Pass on who pays; at risk on WBT sourcing and drain** | The fee is deducted in the same transaction, which is clear and correct. WBT comes from the faucet on testnet, and in production from "sell accumulated USDT fees for WBT on a Whitechain DEX (not built)". The drain rules stop theft but leave cheap denial of service open, and the merchant has no fee cap (section 4.2). |
| "Flows where the payer still signs a transaction that costs them gas, or AI chats that never actually pay anyone." | **Pass** | The payer only signs typed data. There is no AI chat. |

### 2.5 Tokenize (for completeness)

| Item (verbatim) | Verdict | Why |
|---|---|---|
| "Model real-world asset (RWA) lifecycles and compliance logic onchain. Build an issuance, settlement or lifecycle flow for a real world asset on Whitechain, where every payment happens in USDT, and show it working end to end with test stablecoins." | **Fail** | There is no asset and no issuance. |
| "Real transfer rules enforced in the contract, such as allowlists, transfer restrictions, maturity or settlement conditions, not just a token with a UI on top" | **Fail** | The Router enforces parameter binding, not a transfer rule on an asset. |
| "A clear issuer, investor or business user and at least one full lifecycle step in the demo, from issuance to payment or settlement" | **Fail** | It has a business user, but no issuance. |
| "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize." | Rules it out | Chupke pays invoices. |

### 2.6 Qualification (identical for Operate, Tokenize and Scale)

| Item (verbatim) | Verdict | Why |
|---|---|---|
| 1. "Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer" | **Pass (low risk)** | The Router, Announcer and Registry are deployed and verified on Blockscout by Thu night. Verification gets a pre-event dry run on a generic contract (7.1 item 10), and solc 0.8.28 / cancun matches our own docs. If cut-list item 1 drops the Registry lookup, the Registry is deployed but unused. That is harmless, but do not list it as part of the flow. |
| 2. "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count" | **At risk (supply)** | The design passes: `Router.pay` moves prize USDT in the main flow, and the README links the pay, refund and payout transactions. Getting the token is the risk: the notes find no faucet and 10 holders. See section 11. |
| 3. "A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here" | **At risk (wording)** | The draft in 10.3 says "final USDT settlement in about a second". Our own docs say about 1 s is a soft confirmation, with "safe" up to about 30 min and "finalized" about 13 min after the batch lands on L1. A Whitechain judge will notice. The draft leans on "the server learns nothing" and on a technical EIP-3009 claim. It never answers the question a Mumbai judge will ask: why not UPI or a card? It is also four sentences, not "a line". A rewrite is in section 8. |
| 4. "A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations" | **Pass** | Commits every 45 minutes with no squash, tags at each integration point, and README sections for setup, architecture, limitations and mocked parts. Watch two things. The 18-section README is ordered for EF, with the merchant material buried (fix in section 8). The pre-event plan copied into `docs/planning/` should go in as its own labelled commit, not mixed with code. |
| 5. "A demo video of 2 to 4 minutes that shows each party involved" | **Pass, at risk on density** | 2:40 to 2:55 showing the customer, merchant, contractor, accountant and relayer operator. That is nine segments in under three minutes, and the merchant gets the least time relative to what we judge. |
| 6. "A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing" | **Pass, at risk on authenticity** | The outline in 10.5 is good, and its "write only what the team actually experiences" rule is right. Several items come from the research notes, not from anything the team will hit (testnet lacking Karst while they compile for cancun; Reown embedded wallets they never try). If those go in unchanged, the file reads as research, not feedback. See section 12. |

---

## 3. Does privacy help or hurt, in our eyes?

### 3.1 Where it helps

- **It is a real adoption blocker, framed the right way.** A studio does not want its client list, revenue and supplier costs readable on an explorer. The plan pitches privacy as the reason a business would accept USDT at all (1, "Framing per audience"). That is the only framing we reward, and the "naive merchant" explorer hook makes it concrete in 12 seconds.
- **The stealth design makes incoming reconciliation easier, not harder.** One fresh address per payment plus an encrypted `{invoiceId, orderId}` memo works like a virtual account number at a bank: every payment matches its order exactly, with no amount-matching guesswork. That is better than the plain-transfer checkouts most teams will submit. Plain transfers carry no memo, so merchants match by amount and time.
- **It removes the processor's classic gas problem.** Every crypto payment processor that issues per-invoice deposit addresses has to fund each address with gas before it can sweep it. Here, EIP-3009 on our prize USDT lets one-time addresses spend without ever holding WBT. **This is the most commercially interesting thing in the plan, and the plan buries it under privacy language.** Pitch it to us as "per-order deposit addresses with no gas top-ups", and privacy as the bonus.
- **Selective disclosure suits a compliance-minded ecosystem.** A per-period viewing key handed to an accountant or auditor gives us a better answer to "how would WhiteBIT compliance see this?" than "it's private". Lead with it when compliance comes up.

### 3.2 Where it hurts

- **The name and the vocabulary.** "Chupke" means "quietly". In Mumbai, "chupke chupke" reads as "secretly". On a finance chain whose ecosystem is anchored by a KYC'd exchange, a product called "secretly", pitched as "you will not find the merchant", sets off compliance alarms before anyone reads the accountant section. Say "confidential", lead with "auditable by the people you choose", and keep "find the merchant" for the EF audience.
- **Anon-RPC sits in the payer path, failing closed.** That trades checkout reliability for the customer's IP privacy. But the customer's IP is not the lead property; the merchant's identity is. A checkout that stops selling when Tor, Nym or Cloudflare misbehaves is a checkout no merchant will install. There is a subtlety the plan handles correctly: a direct relay POST from the shop page would send `Origin: <shop domain>` to the relayer and reveal the merchant. So the fallback cannot be a naive direct POST. Section 8 gives a fix that keeps the merchant hidden without blocking payment.
- **Treasury fragmentation.** Revenue sits as many small balances, one per order. The hygiene guard refuses to merge inputs and warns before consolidating at an off-ramp. Yet the most common thing a merchant does with revenue is send it to an exchange (WhiteBIT) or a business wallet and convert it. Example: 500 orders a month, swept to one WhiteBIT deposit address, is 500 relayed transactions, all linked at the deposit address. That is about $25 at the docs' hypothetical $50/WBT and the plan's estimate of about 0.001 WBT per transaction. Alternatively the guard simply gets in the way. Either way, privacy ends at the off-ramp, and the plan never shows the merchant getting its money out.
- **Contractor payouts fan out.** "One source per output" turns a 600 USDT supplier invoice paid from 25 USDT orders into 24 outputs to 24 fresh addresses, relayed "with jitter: seconds in the demo, minutes to hours in production". For a business, a supplier paid in 24 instalments over several hours is a support ticket, not a feature.
- **Privacy removes the relayer's best anti-abuse tool.** A normal relayer gives each merchant an API key and a gas tank. Chupke's relayer, by design, cannot tell merchants apart. So it falls back to a global daily budget, which a single attacker can exhaust for everyone (section 4.2).
- **Third-party tooling goes blind.** Crypto accounting tools, explorers and exchange KYT systems work with addresses, not ERC-5564 viewing keys. The merchant's only accounting interface is Chupke's own accountant page. And when a WhiteBIT deposit arrives from a string of fresh addresses that all touched a "privacy router", it may well be flagged by the exchange's KYT. The plan does not mention this.

### 3.3 Reconciliation, refunds and exports under stealth addresses: does the plan solve them?

| Business task | Harder or easier than plain transfers? | Plan's answer | Convincing? |
|---|---|---|---|
| Match a payment to an order | **Easier** | Encrypted memo with the order ID; one address per payment | **Yes** |
| Tell the shop backend an order is paid | Same | `merchant-node` scans with viewing keys and sends an HMAC webhook | **Mostly.** Confirmation depth, retries, idempotency and replay protection of the HMAC are unspecified. |
| One-click full or partial refund | Slightly harder (funds are scattered) | Refund from the address that received the payment, or exactly one other source; the customer checks `Sent(ref)` | **Yes, nicely.** One open edge: several partial refunds after part of that balance has already gone to a supplier. |
| Refunds automated from the shop's backend | **Harder** | Not supported: spending needs `k_spend`, which lives in the passkey-protected browser dashboard | **No.** A small shop can live with this; a store with daily returns cannot. Say so. |
| Staff roles (a clerk can refund but not withdraw) | **Harder** (one seed controls everything) | Not addressed | **No.** Whitepay offers "user management with custom permissions". A Whitechain judge will ask. |
| Month-end export the accountant can use | Harder | CSV and JSON per period, signed by `k_spend`; an accountant link with `k_view(p)`; an independent "N of N match" | **Partly.** The verification idea is excellent. But:<br>• the period is the invoice's label, not when the cash moved;<br>• no columns are specified (gross, network fee, net, refund, fiat value at time, counterparty label, tx hash, explorer link);<br>• nothing says the file opens cleanly in a spreadsheet or in the accounting software Indian SMEs use. |
| Outflows in the period (refunds, supplier payments) | **Much harder** | Not addressed | **No, and this is the most serious accounting gap.** Viewing keys reveal incoming payments for the period whose key received the funds. Take a November refund or supplier payment made from an address funded in October. The November key holder cannot see it, the October key holder sees a November expense, and the completeness check covers income only. An accountant closing November would find the books incomplete. |
| Proving completeness to an auditor | Harder | Independent scan; stretch 7 commits period keys onchain | **Partly.** Acknowledged: the merchant can issue links to an undeclared key. Fine for a hackathon. |
| Getting revenue to an exchange or bank | **Much harder** | "Warn before an off-ramp consolidation" | **No.** There is no settlement path at all (section 3.2). |

**Bottom line on privacy:** on balance it is a net positive for Operate, because it produces the best reconciliation and refund story we expect to see, and the per-order-address-without-gas architecture is commercially valuable in its own right. It is a net negative for Scale, where it adds latency and a failure mode to the payer path and earns no credit. On the business side, the plan solves reconciliation and refunds convincingly. It does not yet solve outflow accounting, treasury and off-ramp, or staff roles.

---

## 4. Three specific questions

### 4.1 Is the "about 20 lines" integration real?

**The code count is real; the integration is not 20 lines.** The `PayButton` component is 13 non-blank lines and the `watchPayments` call is 8: about 21 in total, consistent with the "about 22" claim. What the snippets do not show:

1. **Merchant onboarding** in a separate dashboard: create a passkey, generate the seed `S`, download an encrypted backup, export `chupke.merchant.json`. The README must show this as step 0 of the integration.
2. **Period-key rotation.** `chupke.merchant.json` is imported at build time and carries per-period public keys, and `CHUPKE_VIEW_KEYS` holds the private ones. As written, the shop rebuilds its frontend and updates its server env every month. Fix: publish 24 months of `K_view(p)` at onboarding (hardened derivation makes this free) and load the private keys for the matching window.
3. **A long-running watcher process** on the merchant's server, which most Shopify-style merchants do not have.
4. **A WBT-funded hot key** (`MERCHANT_RELAY_KEY`) if relay mode is on. The merchant now holds WBT and a hot key. Scale only requires that the payer holds no WBT, so this is allowed, but it is a crypto step at onboarding and should be listed.
5. **CSP changes.** A shop with a strict Content-Security-Policy must allow the Anon-RPC worker iframe and the gateway connections.
6. **Two admin surfaces.** Orders live in the shop's admin, while refunds and exports live in the Chupke dashboard.

Verdict: a pass on our item as worded. The "a real merchant could plug into" line in the description is where this costs points. Fix it by showing the integration as a real one-commit diff in a separate example app with its own `package.json`, plus a "What else a merchant does" box listing items 1 to 6 honestly. A judge who finds the hidden steps without being told marks down more than one who reads them in the README.

### 4.2 Is the relayer anti-drain design convincing?

**Against theft: yes, clearly the best we expect to see.**
- The nonce binds every parameter, with domain separation between `pay` and `send`, plus `chainid` and `address(this)`.
- `receiveWithAuthorization` forces the Router to be the caller.
- The fee recipient is bound, so a front-runner gains nothing.
- Open relaying is available as the zero option.
- Malicious-relayer redirect tests are on the test list.

**Against denial of service and griefing: not yet.**

1. **The global daily budget turns a drain into an outage.** A griefer signs a valid authorization and the simulation passes. Then, inside the about 1 s window, the griefer moves the USDT (for example with their own `transferWithAuthorization` from another address) or calls `cancelAuthorization`. Our relayer's transaction reverts, and it pays for the revert.
   - On testnet the attacker's WBT is free (faucet), and Whitechain Sepolia's WebSocket serves `newPendingTransactions`, which makes the timing easy.
   - Somewhere between about 130 reverts (at the 300k gas cap) and several hundred (early reverts, plus the L1 fee) exhaust the 0.2 WBT daily cap. After that, every merchant's checkout gets 503 and fails over.
   - On mainnet the attacker pays roughly what the relayer loses, so it is pure griefing, but cheap.
   - Because the relayer cannot tell merchants apart, it cannot ring-fence one merchant's budget.
2. **The revert ban is Sybil-free for the attacker.** Passkey EOAs cost nothing to create, so a 24 h ban per `from` address barely slows anyone down.
3. **The revert ban punishes victims.** Anyone watching the testnet mempool can copy an honest payer's `Router.pay` call with identical parameters and land it first. The payment still succeeds and the fee still goes to the bound recipient. But our relayer's copy reverts, and the honest payer's address is banned for 24 h. Exempt reverts where the authorization was consumed with identical parameters.
4. **The merchant has no fee cap.** The payer signs the invoice amount, and the fee comes out of the merchant's revenue, so the payer never notices the fee. A greedy or compromised relayer could quote 20% and the widget would accept it. The merchant must set `maxFeeBps` or `maxFee` in `chupke.merchant.json`, the widget must refuse quotes above it, and the dashboard and export must show the fee on every line.
5. **The WBT supply has no production answer.**
   - On testnet, "faucet, 0.5 WBT per 24 h per GitHub account" is honest.
   - For production, "sell USDT fees on a Whitechain DEX (not built)" is not an answer. Our own resource list includes the YetiTrade testnet, and the Whitechain launch materials name a native DEX and oracle among the "Day 1 primitives".
   - The minimum: a refill script with a documented trigger (refill at X WBT), the swap route, and a price source to replace the fixed `usdtPerWbt`.
   - If no USDT/WBT pool exists on testnet, document the route through WhiteBIT and show the inventory accounting.
6. **Merchant-relay failover undoes the merchant's privacy.** When our relayer is down, the merchant's own relay EOA becomes `msg.sender` (and possibly the fee recipient) of that payment. That publicly links every failover payment to the merchant's relay address. Moments after the "find the merchant: you can't" beat, the demo makes the merchant findable. Demo the failover through open relaying by an unrelated EOA (`feeRecipient = 0`, submitted by "any WBT holder"), and state the merchant-relay trade-off in the README.
7. **Gas cap and reverts.** Most griefing reverts fail early at `receiveWithAuthorization`, so they cost far less than the 300k cap. Say so, with a measured number: it makes the drain bound much more convincing than "300k max".

Verdict: convincing on custody, not yet on availability. Items 3, 4 and 7 are each under an hour of work and make it convincing.

### 4.3 Is there any risk it reads as "payroll on its own" or "a pay button that sends a plain transfer"?

- **Payroll: low to moderate.** Nothing runs payroll. But the reader meets contractor payouts in the product's first sentence, in a prior-art table full of payroll projects, and in a 20 s video beat. Contractor payouts are not on our Operate list; our extra credit names "a refund, a renewal or an export the accountant can use". From Whitechain's side, the payout feature costs the most build complexity (coin selection, fan-out, jitter) and earns the fewest points. Recommendations:
  - rename it "pay a supplier's invoice";
  - cut it from the Whitechain-facing video, or cut it to 10 s;
  - move it to the top of the cut list, above the accountant page and the "any wallet" path;
  - in the README, put the payroll prior art below a merchant-checkout comparison.
- **Plain transfer: low.** The Router really is more than a transfer, and the "naive merchant" hook in the demo even contrasts the two. The risk is how the explorer looks. Under each README explorer link, add one line: "Router.pay: receiveWithAuthorization (payer to Router), transfer to a one-time address, fee transfer, ERC-5564 Announcement". Also link the verified Router source. A judge who clicks through should never see an unexplained transfer to a random address.

---

## 5. Scores and placement forecast

Scores are 1 to 10 against our own list items, on the plan as written. The "with fixes" column assumes the section 8 must-fixes land.

| Track | Item scores | Track score | With fixes | Forecast |
|---|---|---|---|---|
| **Operate** | • Description fit 6<br>• 20-line drop-in 7<br>• Both views 8<br>• Past the first payment 8<br>• Clear of "Won't place" 8<br>• Ideas coverage 8 | **7/10** | 8 to 9 | **2nd** (1st if the merchant story leads and the accounting gaps close; none if the prize-USDT gate fails) |
| **Scale** | • Description fit 7<br>• Zero crypto steps visible 6<br>• Gas, WBT and drain 6<br>• Clear of "Won't place" 9 | **6/10** | 7 to 8 | **None** (base case); **2nd** if the checkout never blocks, the fee cap and refill exist, and it has not already placed in Operate |
| **Tokenize** | Every item fails | **1/10** | 1 | **None** |
| **Continuity** | Ineligible (Classic) | n/a | n/a | **None** |
| **Overall (Whitechain)** | Operate-weighted | **7/10** | **8/10** | One Whitechain prize, most likely Operate 2nd |

Why not Operate 1st as planned: the strongest rival will be a plain but polished merchant SDK, perhaps with permit-based renewals, a clean dashboard and a CSV export. It will not have Tor latency, per-period key files or fragmented balances. Chupke beats it after the first payment and loses to it on how easy it is to plug in. Close that gap and Chupke is our pick.

---

## 6. Top 3 strengths

1. **The deepest "after the first payment" flow we expect to see.** A webhook, an onchain receipt, one-click partial refunds the customer verifies on their own receipt page, and an accountant export checked independently against the chain. Our extra-credit line could have been written for it.
2. **A sound, Whitechain-specific gasless architecture.** It uses the prize USDT's own EIP-3009 support, so per-payment addresses never need WBT, which solves the deposit-address gas top-up problem every processor has. The nonce-bound Router lets anyone relay without anyone being able to redirect funds, and there are redirect tests to prove it.
3. **Discipline on what we actually judge.** A relayer-economics section, an honest list of mocked parts, a video planned to show every party, steady commits with tags, a qualification checklist, and a pre-event plan to chase the prize USDT and dry-run Blockscout verification. Most teams discover our requirements at 05:00 on Saturday.

---

## 7. Top 5 weaknesses (most serious first)

1. **The prize USDT gate.** There is no documented faucet or mint path, and the token has 10 holders. Without one payment in `0xcedf...55a7` in the main flow and in the README, nothing else matters. Asking for it is in hand (7.1 item 1), but it needs to land in wallets by 2 Nov, not at our workshop on 5 Nov.
2. **The payer's "zero crypto steps" is staged.**
   - The passkey wallet is per domain (bound to the shop's RP ID) and must already hold USDT.
   - A customer who shops at two Chupke merchants has two wallets to fund, each funded by a Whitechain transfer.
   - Invoice links "on any host", including IPFS gateways with per-CID origins, each get a different wallet, or none.
   - There is no path for WhiteBIT users to pay from an exchange balance, which is the largest pool of USDT holders in our ecosystem.
3. **The checkout depends on Anon-RPC and fails closed.** An 8 to 11 s worker boot, a 90 s timeout, Cloudflare and Tor-exit risk on our 50 rps-per-IP public RPC, and a privacy button in the checkout. For a merchant, a checkout that can refuse to take money is disqualifying, and it protects the customer's IP, not the property the product exists for.
4. **The accounting and treasury model breaks in the first real month.** The export shows income only, and only for the period whose key received the funds; outflows across periods are invisible. No export columns are specified. Revenue is fragmented with no path to an exchange or bank. Supplier payments fan out over hours. There are no staff roles, and the backend cannot issue refunds.
5. **The relayer is safe from theft but easy to take offline, and the merchant cannot cap fees.** The global budget is a lever for denying service to every merchant. The revert ban is Sybil-free for attackers and bans victims of copycats. There is no merchant fee cap, no production WBT refill, and the merchant-relay failover links that merchant's payments.

Also worth noting:
- **Mainnet viability is unverified.** The token list's USDT.e has permit but no EIP-3009. If mainnet USDT is like that, the gasless design needs the permit fallback from risk 2, so say so in the README.
- **The scope is very large for three people in 36 h**: contracts, stealth crypto, passkey PRF, Anon-RPC, a relayer, `merchant-node`, a dashboard, accountant and receipt pages, a demo shop and a video. The likely casualties under time pressure are the merchant dashboard and the shop integration, which are exactly what we judge.

---

## 8. Must-fix changes

1. **Get the prize USDT before the event** (section 11), and document where it came from in the README: the transaction that funded the team, so we can see it is the real token.
2. **Make the checkout never block, without revealing the merchant.**
   - If the private route is not ready within about 3 s, send the quote and relay POSTs from a sandboxed, opaque-origin iframe over plain HTTPS. A sandbox without `allow-same-origin` should send `Origin: null`; verify this in Chrome and Safari.
   - The relayer then learns the customer's IP but still not the shop.
   - Keep fail-closed for the merchant dashboard, the accountant scans and the merchant's own reads, where it protects the merchant.
   - Let the merchant choose `transport: "required" | "preferred"`, and state the default in the README.
   - Remove the "Continue without private connection" button from the customer UI.
   - This conflicts with EF's "no silent direct fallback" preference, so pick the default deliberately and state it in both the CROPS section and the Whitechain section.
3. **Add a merchant fee cap.** Put `maxFee` (or bps) in `chupke.merchant.json`, enforced by the widget, and show the fee as its own column in the dashboard and the export.
4. **Fix the accountant model.**
   - Define the period by block time of the cash movement (assign the period key in the widget at payment time).
   - Include outflows (refunds, supplier payments, sweeps) in the signed export, each with its source address and tx hash, so the accountant can verify them onchain.
   - Fix the CSV columns: date, invoice ID, order ID, gross, network fee, net, refund, counterparty label, tx hash, explorer link, plus a reference fiat rate column (fixed and disclosed on testnet).
   - Show the file open in a spreadsheet in the video.
   - State the remaining limits in the README.
5. **Give the merchant a way to get paid out.** A "Settle to my exchange or business wallet" action that consolidates, with a plain-language warning that this links the swept payments at the destination. Show it in the README with a transaction link. The guard can warn, but it must not stand between a merchant and its money.
6. **Fix the failover demo and the relayer policy.**
   - Demo failover through open relaying from an unrelated EOA, not the merchant relay.
   - Exempt "consumed with identical parameters" reverts from the ban.
   - Publish a measured gas cost for an early revert.
   - Write the production WBT refill loop: trigger, route, price source. If a USDT/WBT pool exists on YetiTrade testnet, script it; if not, document the WhiteBIT route.
7. **Re-order for us.**
   - Add a "Whitechain judges: start here" box at the top of the README: the tracks entered and which is primary, verified contract links, the prize-USDT pay, refund and export transaction links with one-line event annotations, the Whitechain line, video timestamps for each party, the relayer economics link, the 20-line diff link, and `WHITECHAIN_FEEDBACK.md`.
   - Then a "For merchants" section, before Privacy, CROPS and H1 to H5.
   - In the video, give the merchant 45 to 60 s, including onboarding, and cut the contractor beat to 10 s or less.
8. **Rewrite the Whitechain line.** Suggested wording:
   > "A Mumbai studio billing a client in Berlin is paid in USDT on Whitechain, confirmed in about a second and final on Ethereum shortly after, with no card acquirer, correspondent bank or chargeback window in between; UPI cannot take that payment, and no card or bank rail gives every order its own one-time account that never needs topping up, a refund the customer can verify without asking anyone, or books an accountant can check against the ledger itself."
9. **Be honest about the 20 lines.** Show a one-commit diff in a separate example app, plus a "What else a merchant does" box (section 4.1). Publish 24 months of period public keys at onboarding so nothing needs rebuilding monthly.
10. **Rename contractor payouts to "pay a supplier's invoice"** and move them to the top of the cut list.

---

## 9. Nice-to-haves

- **A "renew" invoice.** One click clones an invoice with the next due date, and the customer approves it with a fingerprint. No standing pull, so the single-use authorization design stays intact, and it earns the "renewal" in our extra credit cheaply.
- **A "Pay from exchange" path for invoices.** Show a one-time stealth deposit address and the amount as a QR code; a WhiteBIT user withdraws to it; the invoice page or `merchant-node` posts the Announcement separately. Keep it secondary and clearly labelled, because it is a plain transfer.
- **Webhook hygiene.** A confirmation-depth setting, retries with backoff, an idempotency key, a timestamp in the HMAC to stop replays, and a "send test webhook" button.
- **Signed merchant identity.** Register the merchant's meta-address in the deployed ERC-6538 Registry from a known merchant address, and have the widget and receipt check it. Today a compromised shop bundle or a forged invoice link can swap `K_spend`. Every payment would then go silently to an attacker, and the privacy would hide the theft from public view. Keep the Registry lookup off the cut list for this reason.
- **A merchant-funded gas tank, or prepaid unlinkable relay tickets** (blind-signed, Privacy Pass style). These would give per-merchant quotas without identifying merchants. Post-hackathon, but name it as the answer to the global-budget problem.
- **The mainnet path in the README.** Say whether Whitechain mainnet USDT supports EIP-3009 (ask at our workshop). If it does not, sketch a `payWithPermit` entry point using EIP-2612, which the token-list USDT.e does support.
- **Show prices in local currency** (INR, EUR) at a fixed disclosed rate, and offer an export template that imports into common SME accounting tools.
- **Staff roles.** Even a read-only "orders and refund requests" view for staff, with refunds approved by the passkey holder, answers the multi-user question.
- **Stretch 1 (canonical ERC-5564 and ERC-6538 addresses).** It is valuable to our ecosystem; we would happily link to it.
- **Measure the anonymity set and the latency** (worker boot, quote to Paid) and put the numbers in the README. Numbers persuade us more than adjectives.
- **Router invariant wording.** Anyone can send USDT to the Router directly, so "the Router never holds USDT" can be broken by a donation. Phrase the invariant as "pay and send leave the Router's balance unchanged".

---

## 10. Questions we would ask

1. Where does a real customer's passkey wallet get its USDT? If they shop at two Chupke merchants, do they hold two balances?
2. Start the checkout with a cold worker on venue Wi-Fi: how many seconds until the customer can pay? What happens if Tor and Nym both fail?
3. How does a merchant with 500 orders a month get that revenue into WhiteBIT or a bank? How many transactions, what total fee, and what does the guard do?
4. Who caps the relayer's fee? If a relayer quotes 20%, does anyone notice before month end?
5. An attacker uses fresh passkey addresses and races each authorization with a transfer. How much WBT a day can they burn, and what happens to every other merchant once the 0.2 WBT budget is gone?
6. When our relayer is down and the merchant relay submits, doesn't the merchant relay's address publicly cluster those payments?
7. An accountant closing November: does she see November refunds and supplier payments funded by October revenue? Does "N of N match" cover outflows?
8. How many confirmations before the webhook says "paid"? What happens on a retry or a duplicate?
9. Does Whitechain mainnet USDT support EIP-3009? If not, what changes in the Router?
10. What is the merchant's seed backup encrypted with? If the shop owner loses both the passkey and the laptop, what is recovered?
11. Can a shop clerk issue a refund without being able to drain the treasury?
12. If the USDT issuer blocks the Router address, does every Chupke merchant stop at once? What is the recovery path?
13. Why would a Whitepay merchant switch to this, or why would Whitepay adopt it?
14. Does TetherTokenV2 on our testnet expose a `bytes signature` variant of the authorization functions (which would allow EIP-1271 smart-account payers), or only v, r, s? Show us the verified source.
15. What did our chain, docs or tooling cost you in hours? (We read the answer in `WHITECHAIN_FEEDBACK.md`.)

---

## 11. The prize USDT: what the team must do before the event

As Whitechain, this is what we would want from the team:

1. **Ask now, in writing, in both channels.** That means Discord `discord.gg/7GwAXYmaW9` and the Telegram dev chat `t.me/Whitechaindevs`, by 28 Oct. Quote the exact address `0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7`. Ask three things:
   - Is there an official faucet or distribution for hackers?
   - Will staff hand it out at the venue?
   - How much does a team get?
   
   Chase daily. Treat 2 Nov as the latest acceptable arrival and our 16:30 workshop on 5 Nov as the escalation, not the first ask.
2. **Ask for a specific, modest amount with a reason.** About 100 to 200 USDT to one team treasury address, which the team then distributes. Demo amounts are 1 to 4 USDT, refunds recycle funds, and a few pre-funded passkey wallets plus fee headroom fit easily. Offer to return what is unused. Never share a private key to receive it.
3. **Investigate the existing holders.** Look up the 10 holders and the `transferWithAuthorization` calls of 24 Oct on Blockscout (7.1 item 4). Whoever is distributing may already be doing it with EIP-3009, which is useful to know.
4. **Never substitute.** Not USDT.e `0xaa7962d073935D387e8d442DA1D7149C81388f46` from our token list (it is a different contract, without EIP-3009), not a Portal bridge from Tron, and not a self-minted token. Our rule is explicit: "Payments in a test token you minted yourself won't count".
5. **Read the token before 21:00 Thursday** (allowed as research; 7.1 item 3). Record:
   - decimals (6);
   - the EIP-712 domain name and version (via `eip712Domain` or `DOMAIN_SEPARATOR`);
   - the exact `receiveWithAuthorization` signature, and whether a `bytes signature` overload exists;
   - the blocklist and pause functions, and whether the token is currently paused;
   - the proxy admin, so the team can ask us whether an upgrade or reset is planned during the event.
6. **Keep pre-event work generic.** Holding the tokens and reading the contract is environment setup. Signing a test authorization belongs in the Thursday 23:30 day-one check, inside the project repo. Do not deploy the Router or commit project code before 21:00.
7. **Keep evidence.** Record the funding transaction hash, and later link the pay, partial refund and settlement transactions on `explorer.testnet.whitechain.io`, each annotated (section 4.3). Make sure the explorer shows the token as "USDT" at `0xcedf...55a7`, not "USDT.e".
8. **Have a fallback that keeps you qualified.** Until the token arrives, develop on an anvil fork with `deal` against the real bytecode, as planned. But the qualifying payment must be live on 1874 in prize USDT. A fork transaction does not count.

---

## 12. What we want to read in `WHITECHAIN_FEEDBACK.md`

We read these files closely; they shape our docs and tooling roadmap. We want lived experience, specific and ranked. We do not want praise, a copy of the research notes, or AI-written filler.

**Structure we would like:**
1. **Time to milestones.** Time to the first verified contract, the first prize-USDT payment, and the first successful relayed payment.
2. **What worked.** Only what you used. Examples: `whitechainSepolia` in viem (did its explorer and Multicall3 fields work as-is?); EIP-3009 and permit on the prize USDT; CORS `*` and JSON-RPC batching on the public RPC; Multicall3 and the CREATE2 deployers being present; the Blockscout verification command that worked; whether `llms.txt` or the `whitechain-dev` skill saved time.
3. **Where you got stuck.** For each one: time lost, the exact error message, and what unblocked you. The items we most want covered:
   - How you obtained the prize USDT, and how long it took.
   - The token-list USDT.e versus prize USDT confusion. If our docs sent you to the wrong token, tell us where.
   - `eth_getLogs` range limits and 429s during scans (at 50 rps per IP).
   - Tor and Nym exits against our RPC behind Cloudflare. This is data we do not have.
   - Faucet limits (0.5 WBT per 24 h, GitHub account at least 30 days old) as they affect running a relayer.
   - Blockscout verification of the Router and the reference contracts.
   - Anything that behaved differently on Whitechain than on another OP Stack chain.
4. **What the docs were missing.** Examples: a prize-USDT faucet and its EIP-712 domain; ERC-5564 and ERC-6538 deployments; RPC limits on `getLogs`; forced inclusion with a custom gas token; guidance on running a relayer or paymaster. Also the mismatch between "mainnet arriving in November" on the prize page and "live since 26 October" in the docs, if it confused you.
5. **What you would need to ship on mainnet.** EIP-3009 on mainnet USDT, canonical stealth registries, partner-tier RPC access, a hosted bundler or relayer, Safe on mainnet, and Builders Program contact.
6. **Your top three asks, ranked.**

**What to leave out:** anything you did not actually hit. If you compiled for cancun, do not report "testnet lacks Karst". If you never tried Reown embedded wallets, do not report them as failing; say "we skipped them because the docs warn transactions may fail". Mark second-hand items as second-hand.

---

## 13. Plans A, B, D and E: could any credibly enter a Whitechain track?

- **A, "Lightfoot" (verified anonymous reads, watch-only wallet companion).** No. It has no payment flow and no contracts, and adding a Whitechain read arm would be anonymous but unverified. To enter, it would have to become a different product: a merchant-side payment watcher that light-client-verifies USDT receipts. That would read as a thin Operate add-on and would not place.
- **B, "Dapp Leak Report" (canary-wallet leak tracing).** No. It is a dev tool with no USDT flow, and none of our tracks rewards auditing. Its best use for this team is running it against Chupke's checkout to show no trackers and no address leaks. That helps C's EF case, not a Whitechain entry.
- **D, "NullRelay" (relayerless Tornado withdrawal on the ERC-8421 alt mempool).** No. It runs in ETH on EF devnets, and frame transactions are an EF devnet feature, not something the notes show on Whitechain. Its idea, a payer with no gas whose fee is repaid in the same transaction, is a cousin of Scale. But a port would need a USDT pool on Whitechain and a merchant payment flow, which is a new project.
- **E, "SameBuild" (verified frontend).** No. It targets Ethereum Sepolia and has no payment. Its relevant insight is a feature for C, not an entry for E: a checkout widget whose served bundle is verified cannot have the merchant's keys swapped. That matters more under stealth payments, because the redirected payments are invisible to the public.

Only Plan C is a credible Whitechain entry, and it should go in as Operate first, Scale second.
