# Plan C: Chupke, private invoices and checkout on Whitechain

ETHGlobal Mumbai, 5 to 7 Nov 2026, Jio World Convention Centre, alongside Devcon 8 India. Plan written 2026-10-27. Status: pre-event plan only. No project code exists, and none may be written before Thu 5 Nov 21:00 IST (Classic track).

Working name: **Chupke** (Hindi and Urdu for "quietly"). Check for name collisions before kickoff.

**Legend.** `[S:XX ref]` marks a sourced fact from the research notes in `research_notes/EF tracks and Whitechain ideas/`:
JC = judging_criteria.md, WC = whitechain.md, CP = confidential_payroll.md (sections 1 to 8), EG = ef_goals_and_gaps.md, AR = anon_rpc.md, PS = privacy_stack_gaps.md (cited by section).
`[J]` marks our own judgement, estimate or design choice. Architecture, timeline, demo and Q&A sections are design work, so treat any untagged statement there as judgement.

---

## 0. Decisions at a glance

- **Product [J].** A drop-in USDT checkout and invoice widget for Whitechain. Each payment lands at a fresh ERC-5564 stealth address. The payer pays with a passkey and no gas, through EIP-3009. The merchant then refunds customers, pays its contractors and closes the month, without ever funding those stealth addresses with gas or merging them.
- **Sharpest technical idea [J, on S facts].** The prize USDT implements `receiveWithAuthorization` and `transferWithAuthorization` [S:WC Q6]. A stealth address holding USDT can therefore move its funds by signing an authorization that anyone can relay, so it never needs gas. That removes two of the five withdrawal habits that let researchers trace 38.92% of withdrawn stealth addresses: H5 (gas funding) and H4 (unique priority fee) [S:PS stack section]. It also answers the PSE finding that "spending without linking to a public gas payer remains difficult" [S:PS stack section].
- **Privacy level [J].** We provide recipient unlinkability, with withdrawal hygiene enforced in code. We do not hide amounts or the sender. The MVP has no ZK pool and no eERC; section 5.1 gives the reasons.
- **Prizes.**
  - Whitechain Operate plus Scale, which share one partner slot [S:JC Q3].
  - EF Best CROPS App, with Private as the lead property [S:JC Q2].
  - The ETHGlobal finalist track.
  - No third partner. None fits without weakening the lead property (2.3) [J].
- **Biggest risk.** Getting the prize USDT `0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7`. There is no documented faucet or mint path, the token has 10 holders, and a payment in it is a hard qualification gate [S:WC Q1, Q6]. Ask for it this week (7.1).

---

## 1. Verifiable promise and pitch

**One-sentence verifiable promise.**
> Watch a customer pay a Whitechain merchant in USDT with a fingerprint and no gas. Then search our relayer's live log, the app's RPC traffic and the block explorer: you will not find the merchant. Only when the merchant's accountant opens one month's key do that month's payments, and only that month's, appear and reconcile.

**Three-line pitch.**
1. Businesses will not take stablecoins on a public chain while every payment publishes their client list, revenue and contractor pay to anyone with a block explorer.
2. Chupke is a checkout and invoice widget a shop adds in about 20 lines. Customers pay USDT on Whitechain with a passkey and no gas, and each payment lands at a fresh stealth address. The merchant refunds, pays contractors and exports the books without ever linking those addresses.
3. There is no invoice server. The only server, a relayer, can be replaced by anyone and learns nothing about who was paid. Reads go through Anon-RPC. The accountant gets a key for exactly one period and can check that nothing was left out.

**Framing per audience [J].**
- **Whitechain judges.** Open with "everything a business needs to get paid, and its customer list stays private". Privacy is not a stated Whitechain goal [S:WC Q7], so present it as the reason a business would accept stablecoins, not as the product itself.
- **EF judges.** Open with "the server learns nothing about who talks to whom, and the server is optional". This mirrors the listed CROPS idea and the "structural beats cosmetic" criterion [S:JC Q2].

---

## 2. Prize targets

### 2.1 Whitechain (one partner slot, every track eligible)

[S:JC Q1] "If a partner has multiple tracks, you can be eligible for all of them while only counting as 1 Partner Prize."

| Track | Amount [S:JC Q3] | Our role | Why it fits [J] |
|---|---|---|---|
| Operate: Stablecoin Payments for Business | $5,000 (2,500 / 1,500 / 1,000) | **Primary** | Covers 3 of the 4 listed ideas (the drop-in checkout with webhooks and receipt, invoice links with due dates, refunds) and all three "What we want to see" items |
| Scale: Payments Nobody Notices | $3,000 (2,000 / 1,000) | **Secondary** | Its first listed idea is exactly ours: EIP-3009 gasless checkout through our own relayer. The passkey payer sees zero crypto steps, and the relayer's economics and anti-drain rules are written up |
| Tokenize | skip | none | Whitechain's own text: "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize." [S:JC Q3] |
| Continuity | skip | none | Continuity track only; we enter Classic |

### 2.2 EF (one EF prize per project)

- **Target: Best CROPS App** ($3,500: 2,000 / 1,000 / 500). The lead property is **Private**, matching the listed idea "a payment, messaging or social app where your server learns nothing about who talks to whom" [S:JC Q2]. The criteria still carry "(tbc: final review pending)", so re-read them on 5 Nov [S:JC Q2].
- **Possible placement: Best Use of Anon-RPC.** EF judges "decide where it fits best" [S:JC Q2]. All browser reads go through Anon-RPC by default, so EF could place us there. The README traffic table (10.6) costs little and covers that case [J].
- **Skipped.**
  - Alt Mempool: it needs an admitted transaction on EF devnets, not on Whitechain [S:WC Q8].
  - Best CROPS Upgrade: Continuity only [S:JC Q2].

### 2.3 Third partner: none, by decision

| Candidate | Verbatim requirement [S:JC Q4] | Verdict [J] |
|---|---|---|
| World IDKit | "verify the result on the server or onchain as appropriate"; "why the chosen credential is the minimum sufficient assurance" | **Skip.**<br>• The only plausible use is a per-human quota on gas sponsorship. Our fee model makes sponsorship self-funding (5.7), so there is no scarce benefit to gate.<br>• A per-action nullifier would let the relayer link every payment made by the same human, which breaks the lead property.<br>• The EF Mandate also rejects treating wrapped "government, biometric or corpoid" ID as automatically CROPS [S:EG Q1]. |
| Uniswap Foundation | "Build on or integrate any part of the Uniswap stack"; FEEDBACK.md plus the feedback form | **Skip.** The notes show no Uniswap deployment on Whitechain Sepolia, and the prize USDT has 10 holders [S:WC Q6], so there is no liquidity to swap against. A self-deployed pool would be a bolt-on. |
| Chainlink CRE | "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent"; simulation is enough | **Skip.** The natural CRE job (watch payments, call the merchant's webhook) needs the viewing key, so the DON would learn who was paid. An FX feed can be computed client side, which makes it cosmetic. |
| ENSv2 | "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product" | **Skip.** It adds a second chain and a new name-lookup read leak, and ENSv2 would not be central. |
| Arc | "Every Arc prize requires using Arc Studio as the starting point"; USDC or EURC on Arc | **Skip.** Conflicts with USDT on Whitechain and with CROPS "O" [S:JC Q4]. |
| Arkiv | "Prize details coming soon" | **Re-check at its Thu 5 Nov 16:00 workshop.** Accept only if the text rewards storing encrypted data with no server, and the work fits in 4 hours (stretch 6, encrypted invoice blobs). |
| Hedera, 0G, 1inch, Definitive | Settlement on Hedera; 0G Compute and Storage; Aqua contracts; Flash orders | **Skip.** No fit [S:JC Q4]. |

Leaving the slot empty costs no hours and keeps the CROPS story intact. Adding a third partner that does not fit would weaken both [J].

### 2.4 ETHGlobal finalist track

- **Format** [S:JC Q1]. The finalist track is separate from partner prizes. Each team gets a 7 minute live session (4 minute demo, 3 minute Q&A) on Sat 7 Nov, 09:30 to 12:30, scored on five categories. Recent events then named a top 10 [S:JC Q1].
- **Pattern** [S:JC Q5]. About a third of recent in-person finalists were security, privacy or self-custody projects that made one sharp, verifiable claim (the researcher's own classification).
- **Our fit** [J]. The promise in section 1 is built for that pattern.

---

## 3. Criteria matrix

Each row gives the verbatim item [S], how we score on it, and where a judge sees the evidence [J].

### 3.1 ETHGlobal finalist: five categories [S:JC Q1]

| Category (verbatim) | How we score | Evidence |
|---|---|---|
| "Technicality: How complex is the problem you're addressing, and how sophisticated is your solution?" | The problem: hide who was paid while keeping refunds, webhooks and audits. The solution has five parts:<br>• a nonce-bound EIP-3009 router (a relayer cannot redirect funds, and anyone can relay)<br>• ERC-5564 scheme 1 with encrypted memos<br>• hardened per-period viewing keys with an independent completeness check<br>• an Anon-RPC transport that batches and fails closed<br>• passkey PRF keys | Foundry tests, including a malicious-relayer redirect test; the invariant suite; the accountant reconciling live |
| "Originality: Is your project introducing a new idea or creatively solving an existing problem?" | • Gasless stealth spending through EIP-3009, which removes the gas top-up leak that Mercury named [S:CP s1].<br>• A payout is simply paying a contractor's own invoice.<br>• Invoices never touch a server.<br>• Accountant keys are scoped per period. No EVM product in the notes ships scoped disclosure plus a completeness check [S:CP s4, s5]. | README "Prior art"; demo beats 3 to 6 |
| "Practicality: How complete and functional is your project? Could it be used by its target audience today?" | • End to end on Whitechain Sepolia with the prize USDT.<br>• A separate shop app integrates it in about 20 lines.<br>• Mainnet uses the same contracts if mainnet USDT supports EIP-3009 (verify).<br>• Whitechain's Builders Program offers "subsidized Hacken audit coverage" [S:WC Q2]. | Explorer links; `examples/chai-shop` |
| "Usability (UI/UX/DX): How intuitive is your project? Have you made it easy for users to interact with your solution?" | • Customer: an amount, a fingerprint prompt, a receipt. No chain name, gas or address.<br>• Merchant: Create invoice, Paid, Refund, Pay contractor, Export.<br>• Developer: two imports, one component, one watcher. | Demo; README "Integrate in 20 lines" |
| "WOW Factor: Does your project leave a lasting impression? This is the catch-all for anything unique or impressive that may not fit into the other categories." | • A "find the merchant" challenge on the explorer.<br>• The relayer is killed mid-demo and payments still go through.<br>• The accountant's key opens one month only.<br>• Optional: a judge pays from their own phone. | Live demo 1:25 to 3:50 |

### 3.2 Whitechain Operate [S:JC Q3]

| Item (verbatim) | How we score | Evidence |
|---|---|---|
| "Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it. Build a payment flow a real merchant could plug into their app or store, and show it working end to end with test stablecoins on Whitechain." | • First checkout: the widget and invoice links.<br>• After it: webhooks, refunds, contractor payouts and the accountant export.<br>• Everything runs on Sepolia with the prize USDT. | Video 0:30 to 2:30; README explorer links |
| Idea: "A drop in checkout for online stores with order webhooks and an onchain receipt" | • `<ChupkeCheckout>` runs in the demo shop.<br>• `merchant-node` posts an HMAC-signed order webhook to the shop's own backend.<br>• The onchain receipt is the Announcement plus Transfer events, and the customer checks it on the receipt page. | `examples/chai-shop` |
| Idea: "Payment links and invoices for remote studios, contractors and cross-border teams billing global clients, with due dates and reminders" | Invoice links carry a due date and show an overdue state. Reminders are one-click text or mailto, sent by hand (disclosed in 6.4). | Merchant dashboard |
| Idea: "Subscriptions and recurring billing with permit based pulls and cancel anytime" | Not built (non-goal). Every authorization is single-use and expires within minutes, so no standing pulls exist. | README non-goals |
| Idea: "Refunds and partial refunds a merchant issues in one click, with a record the customer can check" | One click refunds all or part of a payment from the stealth address that received it. The customer's receipt page finds the refund by a reference only the two parties can compute. | Demo beat 4 |
| WWTS: "A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines" | `@chupke/react` plus `@chupke/merchant-node`, about 22 lines in a separate app. The README shows the line count. | README; video 0:12 |
| WWTS: "Both views in the demo, the merchant and the paying customer" | Split screen in both the live demo and the video. The contractor and the accountant also appear. | Video, live demo |
| WWTS: "Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use" | A refund, a contractor payout from revenue, and a per-period export the accountant verifies independently | Demo beats 4 to 6 |
| Won't place: "A pay button that sends a plain transfer" | Payments go through a router that binds the stealth destination, fee and announcement into the EIP-3009 nonce. Each payment also carries stealth derivation and an encrypted memo. | `contracts/src/ChupkeRouter.sol` |
| Won't place: "tipping jars, bill splitters, or custodial bridges into a local currency token" | None of these. No custody: the router holds funds only inside a single transaction. | Router invariant test |
| Won't place: "Payroll, escrow and revenue splits on their own" | No payroll runs, no escrow, no splits. A contractor payout is the merchant paying the contractor's invoice from revenue, a step after getting paid. | Pitch; README scope |

### 3.3 Whitechain Scale [S:JC Q3]

| Item (verbatim) | How we score | Evidence |
|---|---|---|
| "Build a payment flow on Whitechain where the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on." | The payer key is derived from a passkey (WebAuthn PRF). No WBT, no seed phrase, no chain name in the UI. | Video customer beat |
| Idea: "Gasless checkout where the merchant covers gas, using permit or transferWithAuthorization (EIP 3009) and your own relayer" | Exactly this: `receiveWithAuthorization` through our relayer. The fee comes out of the merchant's received amount. | README "Relayer economics" |
| Idea: "Checkout with an embedded wallet or smart account from any provider that supports Whitechain Sepolia (chain ID 1874)" | We use our own embedded passkey key, because the notes show no provider working on 1874: Pimlico rejects the chain and Reown embedded wallets fail [S:WC Q6]. | README |
| Idea: "Pay per request APIs where an AI agent pays a business in USDT over x402, settled on Whitechain through a facilitator you run" | Not built. | Non-goals |
| WWTS: "A payer flow with zero crypto steps visible, shown in the demo" | The payer sees an amount, a fingerprint prompt and a receipt. Funding the passkey wallet happens beforehand and is disclosed. | Video 0:30 to 0:58 |
| WWTS: "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it" | • Who pays: the merchant, through the fee deducted from each payment.<br>• Relayer WBT: the faucet on testnet; selling the USDT fees for WBT in production (not built).<br>• Drain resistance: the relayer simulates first, the fee covers the gas in the same transaction, and there is a daily budget cap, a per-address revert ban and a short validity window (5.7). | README section |
| Won't place: "Flows where the payer still signs a transaction that costs them gas" | The payer only signs EIP-712 typed data, never a transaction. | Widget code; video |
| Won't place: "AI chats that never actually pay anyone" | Not applicable | none |

### 3.4 Whitechain qualification (identical for Operate, Tokenize and Scale) [S:JC Q3]

| Requirement (verbatim) | How we meet it |
|---|---|
| "Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer" | `ChupkeRouter`, `ERC5564Announcer` and `ERC6538Registry` are deployed and verified on Blockscout. Thu night target. |
| "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count" | The first scripted payment lands by Fri 01:30 (integration point 1). The README links the pay, refund and payout transactions. |
| "A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here" | Drafted in 10.3 |
| "A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations" | Everyone commits at least every 45 minutes, plus tags at each integration point. README skeleton in section 10. |
| "A demo video of 2 to 4 minutes that shows each party involved" | A 2:40 to 2:55 cut showing the customer, merchant, contractor, accountant and relayer operator |
| "A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing" | Outline in 10.5; we take notes throughout the event |

### 3.5 EF Best CROPS App [S:JC Q2]

| Item (verbatim) | How we score | Evidence |
|---|---|---|
| "Build an app, wallet feature or dev tool where one CROPS property is the reason it exists, without giving up the other three." | Lead property: P. Businesses do not take onchain payments because those payments expose who pays whom. C, O and S are covered in the CROPS section (10.2). | README CROPS |
| Idea: "a payment, messaging or social app where your server learns nothing about who talks to whom" | • There is no invoice server: the invoice lives in the URL fragment and the onchain memo is encrypted.<br>• The relayer sees only what the chain shows plus a Tor exit IP.<br>• The merchant verifies payments from the chain with its own key. | Relayer log shown live |
| "works end to end in the demo" | Pay, detect, refund, payout and export all run on Sepolia | Live demo |
| "depth of the lead property: structural (works without you) beats cosmetic (a setting)" | • Privacy is the default, not a setting.<br>• We kill our relayer and the payment still goes through (merchant relay, or anyone who relays for the fee).<br>• Links open on any static host.<br>• Hygiene is enforced in code, not left to the user. | Demo beat 3 |
| "the other three still hold, or trade-offs are stated in the README" | The C line names the single sequencer, the USDT issuer's freeze power, the passkey domain binding and third-party Anon-RPC gateways. | README CROPS and Limitations |
| "UX: would someone use it without knowing what CROPS means" | No privacy jargon in the customer UI. The merchant sees "Paid", "Refund", "Export". | Video |
| "could it ship after the hackathon" | Same contracts on mainnet (subject to the USDT EIP-3009 check), Apache-2.0, npm packages, and a merchant-run relay option | README "Shipping" |
| Qualification: "Public repo under a free and open-source license (MIT, Apache-2.0, GPL, MPL or similar), with a README a judge can run it from." | Apache-2.0. Setup is `pnpm i && pnpm dev` plus `forge build`, with no API keys. | LICENSE; README |
| Qualification: README "section titled CROPS, one or two lines per letter" with C, O, P and S prompts | Draft in 10.2 | README |
| Qualification: "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters: for example you switch off your backend, swap the RPC provider, or show server logs with nothing identifying in them." | The cut is at most 2:55 and shows two of the three examples: we switch off the relayer and show the server log. | Video 0:58 to 1:25 |
| Qualification: "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not." | • No analytics; fonts self-hosted.<br>• Keys stay on the device.<br>• `merchant-node` holds viewing keys on the merchant's own server; the README explains why (webhooks need a server, and the key is read-only). | Network-panel check in the final checklist |
| "One EF prize per project. ... you will be placed in at most one." | We declare CROPS App as our target in the submission. | Submission form |

### 3.6 In case EF places us in Best Use of Anon-RPC [S:JC Q2]

| Item (verbatim) | Our position |
|---|---|
| "Your app routes its RPC reads through Anon-RPC by default." | Yes for every browser surface (widget, dashboard, receipt, accountant). |
| "how much of the app's traffic goes through Anon-RPC (if an app)" | The README table lists every call (10.6). |
| "if you choose to exclude some traffic as an intentional performance/anonymity tradeoff instead of implementation difficulty, that can be a good thing, just let us know" | Three exclusions, each stated and justified:<br>• The relayer's own server-side calls (it is a server, not a user).<br>• `merchant-node` (no Node harness exists [S:AR Q1]).<br>• The specifier bootstrap read (the spec requires a pre-existing connection [S:EG Q3]). |
| "works end to end in the demo"; "quality of user experience in demo"; "could this be shipped for real after the hackathon"; "technical depth" | We pre-warm the worker so boot time is hidden, batch calls, and fail closed with visible state. |

### 3.7 EF Mandate and access-layer alignment (not judging criteria, but EF's own vocabulary) [S:EG Q1, Q3]

- **Zero option:** "for every affordance that has an intermediated path, any intermediary-free path that is possible must be built". Our relayer is the intermediated path. The zero option is that anyone can submit the same signed payment and collect its fee.
- **P-1 counterparty privacy:** stealth recipients.
- **P-2:** "No intermediary can block a payment" ("Relayer- and paymaster-based flows need a user-broadcastable equivalent"). Covered by open relaying, plus forced inclusion through L1.
- **P-3 bounded recurring authority:** no approvals at all, only single-use authorizations that expire in 10 minutes.
- **P-4 independently verifiable settlement:** "A merchant who learns 'you were paid' from a hosted API has re-created the acquiring bank". Our merchant learns it from the chain, with its own key.
- **Mandate Quandary 5, the "unhappy case":** "third-party dependencies ... disappear or break". The kill-the-relayer beat in the demo is this case.

---

## 4. Prior art and differentiation

| Project | Event and prize [S] | What it does [S] | Gap that Chupke fills [J] |
|---|---|---|---|
| Warden | Cannes 2026, "Unlink - Best Private DeFi Integration" [S:JC Q5] | Private payroll: USDC goes into a shielded pool, with email onboarding [S:JC Q5] | Payroll on its own, which Operate excludes; relies on a vendor SDK; no merchant checkout, refunds or export |
| Manila | NYC 2026: Unlink, Dynamic (twice), Arc [S:JC Q5] | Confidential USDC payroll on Arc through Unlink. The employer audits through Unlink's admin API, the vesting path is fully public, plus a policy engine [S:CP s5] | Payroll again. The audit goes through a vendor API, so a server learns. Settles on Arc, not Whitechain |
| PAYLOAD | ETHOnline 2025 [S:CP s5] | Railgun payroll with POI certificates and CSV upload. Its own backend "is not secure and was built for hackathon demo purposes" [S:CP s5] | Payroll; Railgun is not on Whitechain |
| RollPay | ETHGlobal Cannes [S:CP s5] | INTMAX rollup plus EIP-7702 accounts; amounts hidden; no compliance features [S:CP s5] | Separate system; no disclosure |
| zkPay | ETHGlobal Trifecta, 1st in the ZK Email track [S:CP s5] | Email and UPI invoices; a central relayer holds liquidity [S:CP s5] | A custodial central relayer is a chokepoint |
| **Cloak** | Cannes 2026 [S:PS ETHGlobal section] | "private freelancer invoicing" [S:PS] | **Closest match by name.** The notes do not describe its mechanism, so read its showcase page before 5 Nov (7.1). Expected differentiators: gasless stealth spending, no invoice server, per-period accountant keys, refunds the customer can verify, and Whitechain USDT. |
| CloakPay | Cannes 2026, 1 prize [S:PS] | "merchant never sees payer address" [S:PS] | The opposite threat model. We hide the merchant from the public and from servers. The merchant does know the payer, which refunds require. |
| Mercury | ETHGlobal showcase [S:CP s5] | An iOS ERC-5564 wallet on Arc. Notes that a per-payment stealth address "needs a gas top-up that can deanonymize the recipient" [S:CP s1] | We remove the top-up entirely through EIP-3009 |
| POAPrivacy, Stealth Safes, ENStealth Unlinked, Kondor | Cannes 2025 and 2026 [S:CP s5, PS] | Stealth addresses for POAPs, Safes and ENS [S:CP s5, PS] | Not business payments |
| GrimSwap | HackMoney 2026 finalist [S:JC Q5] | Shielded pool, ERC-5564 outputs, Groth16 proved in the browser in about 1 s [S:JC Q5] | Evidence that stealth-plus-ZK can reach the finalist round; it is a DEX, not payments |
| Pampalo Private Swap | NYC 2026, Uniswap [S:JC Q5] | Keys "derived from your passkey (WebAuthn PRF)"; "the backend only ever stores ciphertext" [S:JC Q5] | We reuse the passkey-PRF pattern for payer keys |
| Umbra, Fluidkey | Production [S:CP s3] | Umbra: over $500M across 270,000 stealth payments (self-reported). Fluidkey: according to a Dedaub audit, its server uses the private viewing key [S:CP s3] | Fluidkey's server learns who was paid. Neither ships merchant refunds or period-scoped accountant keys. |
| Privacy Pools v2 | Launched 21 Oct 2026 [S:PS stack section] | Private payments to any EVM address, payment links, ASP approval; on Ethereum, Arbitrum, Base, BNB, Citrea, OP and Robinhood Chain [S:PS] | Not on Whitechain. Refunds and per-period accountant keys are not among its listed features. |
| Hinkal Prime | 2026 [S:CP s3] | Groth16 pool with a payroll dashboard, viewing keys for auditors, and KYT [S:CP s3] | A single-vendor stack whose open-source status is not stated [S:CP s3] |
| Zama/Bron, Avalanche eERC | 2026 [S:CP s1, s3] | Hide amounts; "sender and recipient addresses stay public" [S:CP s1] | They do not hide who pays whom, which is our lead property |
| Request Finance and Toku on Aleo, Canton | 2025 to 2026 [S:CP s3] | Private payroll on non-EVM systems [S:CP s3] | Not EVM, not Whitechain |

**What is new in Chupke [J].**
1. **Stealth addresses that never need gas.** EIP-3009 lets them spend their USDT, which removes the H5 and H4 linkage habits by construction. A guard in the code refuses H1 to H3.
2. **One router for paying and announcing.** Payment and announcement happen atomically. Every parameter is bound into the EIP-3009 nonce, so a relayer cannot redirect funds and anyone may relay.
3. **No invoice server.** The invoice lives in the URL fragment, the onchain memo is encrypted to the merchant's viewing key, and the merchant verifies settlement itself (P-4).
4. **Per-period accountant keys with an independent completeness check.** This is the "no fabrication, no omission" target from the Starknet payroll RFP [S:CP s4], applied to merchant revenue.
5. **Receipts and refunds the customer can verify without revealing the merchant publicly.**
6. **Whitechain-native and self-deployed.** No vendor privacy SDK; the whole stack is deployed by us on chain 1874.

---

## 5. Architecture

### 5.1 How much privacy 36 hours buys (decision)

| Option | What it hides | Cost on Whitechain | 36 h feasibility for 3 people | Verdict [J] |
|---|---|---|---|---|
| ERC-5564 stealth addresses plus EIP-3009 router (our design) | The recipient's identity, and links between payments to the same merchant. Does not hide the sender, the amount or the timing [S:CP s2] | About 140k to 180k gas per payment [J estimate] at the 5 gwei floor [S:WC Q3] | High. Pure Solidity plus secp256k1; nothing is deployed on Whitechain yet, so we deploy it ourselves [S:WC Q5] | **MVP** |
| ZK note pool (Groth16, Tornado or Privacy Pools style) | The link between deposit and withdrawal | Groth16 verification costs about 207k gas plus 7.16k per public signal [S:CP s2]; needs a trusted setup or a published ptau plus a demo phase 2 [S:CP s7] | Low to medium: circuits, Merkle tree, browser proving and integration come to about 12 to 16 person-hours [J]. Anonymity set near zero on a fresh testnet: "A pool with ten participants offers weak unlinkability regardless of the cryptography" [S:CP s1] | **Stretch 8 only** (an off-ramp step), never on the critical path |
| eERC (ElGamal plus Groth16) | Amounts and balances only; "sender and receiver addresses, and timestamps" stay public [S:CP s1] | About 947,000 gas per confidential transfer [S:CP s2] | Medium. The registrar probably conflicts with one-time addresses [S:CP s7, inference] | **Rejected.** It does not hide who pays whom, which is the lead property |
| FHE (Zama) or TEE (Inco, Oasis) | Amounts | Needs coprocessors or operators that the provider must run on Whitechain [S:CP s2] | Not available on Whitechain | **Rejected** |

**What the MVP honestly hides, and from whom [J]:**
- **Hidden from the public, our relayer, the RPC provider and the static host:**
  - which merchant or contractor received each payment;
  - which payments went to the same merchant;
  - the invoice contents;
  - merchant revenue totals;
  - who the merchant's contractors are;
  - the customer's IP address, which the relayer and RPC do not see because traffic goes through Anon-RPC.
- **Not hidden:**
  - the payer's address;
  - every amount and time;
  - the fact that a payment went through the Chupke router.
- **Weak spots, stated plainly:**
  1. **The anonymity set is the set of Chupke recipients.** If only one merchant uses Chupke, "paid a Chupke address" means "paid that merchant". The demo has three recipients (shop, studio, contractor).
  2. **Amount correlation.** A payment of 4.00 followed by an outgoing 3.97 can be matched.
  3. **Off-ramp consolidation.** Sending many stealth balances to one exchange deposit address links them.
  4. **Relayer clustering.** The relayer can link sweeps submitted in one session by exit IP and timing, because no merged Anon-RPC worker honours `isolationKey` yet [S:AR Q6].

### 5.2 CROPS trade-offs of a single-sequencer L2 and a relayer

| Dependency | Fact [S] | What it can do to a user | Our mitigation [J] |
|---|---|---|---|
| Whitechain sequencer | A single sequencer. Fault proofs are permissioned. A Guardian can pause withdrawals. Forced inclusion goes through OptimismPortal "within the sequencing window, about 12 hours" [S:WC Q3] | Delay or censor Router calls; see every transaction first | • Forced inclusion through L1 Sepolia, documented (stretch 5 adds a script).<br>• The app works on any EVM chain with an EIP-3009 token.<br>• We add no new chokepoint on top of the chain. |
| USDT issuer | TetherTokenV2 sits behind an EIP-1967 proxy [S:WC Q6]; Tether contracts typically include blocklist functions (verify in the source) [J] | Freeze any address, including the Router or a stealth address | None possible. Stated in the C line. |
| Our relayer | Our own service; Scale requires "your own relayer" [S:JC Q3] | Refuse to relay; log metadata; be griefed | • It cannot steal or redirect (nonce binding, 5.4).<br>• Failover to the merchant's own relay, then to open relaying.<br>• Logs are minimal.<br>• The payer's IP is hidden behind the worker. |
| Anon-RPC worker and gateway | The demo gateway "may disappear at any time"; bundles are hash-pinned by single-EOA specifier owners [S:AR Q1] | Go down; serve updated code if the owner repoints the specifier | • Pin the expected hash client side (the Privacy Pools pattern [S:AR Q2]).<br>• Nym as a fallback.<br>• Our own gateway or our own specifier (stretch 3). |
| Whitechain public RPC | 50 rps per IP; behind Cloudflare; Tor exit behaviour untested [S:WC Q3, AR Q9] | Rate limit or block Tor exits | Batching (up to 100 calls), Multicall3, caching, Nym, our own op-reth node (stretch 4) |
| Passkey provider | A WebAuthn credential is bound to its RP ID (the domain) [J, general WebAuthn knowledge] | If the hosting domain disappears, the payer's passkey wallet on that domain cannot be reached | • The shop widget uses the shop's own domain.<br>• Payers can always use any EIP-712 wallet instead.<br>• Merchant seeds have a mandatory backup. |

### 5.3 Components

1. **Contracts (Foundry), on Whitechain Sepolia:**
   - `ChupkeRouter`: immutable, no owner;
   - `ERC5564Announcer` and `ERC6538Registry`: canonical reference code, deployed by us.
2. **`@chupke/core` (TypeScript):**
   - key derivation, ERC-5564 scheme 1 stealth math with view tags, memo encryption;
   - EIP-712 builders for `ReceiveWithAuthorization`, router calldata;
   - a bulk-log scanner and the hygiene guard;
   - the Anon-RPC transport;
   - export and verify.
3. **`@chupke/react`:** `<ChupkeCheckout>` for shops, plus the invoice pay view.
4. **`@chupke/merchant-node`:** watches payments with viewing keys only and calls the shop's webhook. An optional relay mode serves the merchant's own payments.
5. **`apps/web` (static):** pay page, receipt page, merchant dashboard and accountant page, served from IPFS plus one HTTPS mirror, and buildable locally.
6. **`apps/relayer` (Node, Hono):** quote, simulate, submit; policy; minimal logs.
7. **`examples/chai-shop`:** a separate, fictional demo store showing the roughly 20-line integration and a tiny webhook backend.

### 5.4 Contracts

- **Compiler.** solc 0.8.28 with `evm_version = "cancun"`. Whitechain's own example uses these settings, and testnet lacks Karst/CLZ, so we avoid an Osaka target [S:WC Q4].
- **Deployment.** We deploy the Announcer and Registry ourselves; the canonical addresses have no code on Whitechain [S:WC Q5]. The deterministic deployer `0x4e59b44847b379578588920cA78FbF26c0B4956C` exists there [S:WC Q5], so stretch 1 tries to reproduce the canonical addresses.

Router sketch (finalize in SPEC.md at kickoff):

```solidity
pragma solidity 0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IUSDT3009 {
    function receiveWithAuthorization(
        address from, address to, uint256 value, uint256 validAfter, uint256 validBefore,
        bytes32 nonce, uint8 v, bytes32 r, bytes32 s
    ) external;
}

interface IERC5564Announcer {
    function announce(uint256 schemeId, address stealthAddress, bytes memory ephemeralPubKey, bytes memory metadata) external;
}

contract ChupkeRouter {
    using SafeERC20 for IERC20;

    struct Auth {
        address from;
        uint256 value;
        uint256 validAfter;
        uint256 validBefore;
        bytes32 salt;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    bytes32 public constant PAY_TAG = keccak256("chupke.pay.v1");
    bytes32 public constant SEND_TAG = keccak256("chupke.send.v1");

    IUSDT3009 public immutable usdt;
    IERC5564Announcer public immutable announcer;

    event Sent(bytes32 indexed ref);
    error FeeTooHigh();

    constructor(IUSDT3009 usdt_, IERC5564Announcer announcer_) {
        usdt = usdt_;
        announcer = announcer_;
    }

    function payNonce(
        address stealth, uint256 fee, address feeRecipient,
        bytes calldata ephemeralPubKey, bytes calldata metadata, bytes32 salt
    ) public view returns (bytes32) {
        return keccak256(abi.encode(
            PAY_TAG, block.chainid, address(this), stealth, fee, feeRecipient,
            keccak256(ephemeralPubKey), keccak256(metadata), salt
        ));
    }

    function sendNonce(address to, uint256 fee, address feeRecipient, bytes32 ref, bytes32 salt)
        public view returns (bytes32)
    {
        return keccak256(abi.encode(SEND_TAG, block.chainid, address(this), to, fee, feeRecipient, ref, salt));
    }

    function pay(
        Auth calldata a, address stealth, uint256 fee, address feeRecipient,
        bytes calldata ephemeralPubKey, bytes calldata metadata
    ) external {
        if (fee > a.value) revert FeeTooHigh();
        bytes32 nonce = payNonce(stealth, fee, feeRecipient, ephemeralPubKey, metadata, a.salt);
        usdt.receiveWithAuthorization(a.from, address(this), a.value, a.validAfter, a.validBefore, nonce, a.v, a.r, a.s);
        IERC20(address(usdt)).safeTransfer(stealth, a.value - fee);
        if (fee != 0) IERC20(address(usdt)).safeTransfer(feeRecipient == address(0) ? msg.sender : feeRecipient, fee);
        announcer.announce(1, stealth, ephemeralPubKey, metadata);
    }

    function send(Auth calldata a, address to, uint256 fee, address feeRecipient, bytes32 ref) external {
        if (fee > a.value) revert FeeTooHigh();
        bytes32 nonce = sendNonce(to, fee, feeRecipient, ref, a.salt);
        usdt.receiveWithAuthorization(a.from, address(this), a.value, a.validAfter, a.validBefore, nonce, a.v, a.r, a.s);
        IERC20(address(usdt)).safeTransfer(to, a.value - fee);
        if (fee != 0) IERC20(address(usdt)).safeTransfer(feeRecipient == address(0) ? msg.sender : feeRecipient, fee);
        emit Sent(ref);
    }
}
```

**Why this shape [J].**
- **Nonce binding.** Only the Router can call `receiveWithAuthorization`, because it requires `msg.sender == to`. The EIP-3009 nonce commits to every other parameter, so a relayer or a mempool watcher who changes the stealth address, fee, fee recipient, memo or refund reference produces a different nonce, and the signature fails. Whitechain Sepolia's WebSocket serves `newPendingTransactions` [S:WC Q3], so mempool copycats are a real threat model, not a hypothetical one.
- **Fee recipient binding.** Binding `feeRecipient` means a copycat who front-runs our relayer gains nothing. Setting it to zero switches on open relaying, where whoever submits the transaction collects the fee. That is the zero option.
- **`pay` versus `send`.**
  - `pay` serves both customers and stealth sources (contractor payouts).
  - `send` serves refunds and sends to plain addresses.
- **No custody, no admin.** No upgrade path, no owner and no stored state. USDT balance in the Router is zero after every call, which is an invariant test.

**Tests (Foundry)** run on an anvil fork of Whitechain Sepolia against the real USDT bytecode, with balances set by `deal`.
- **Unit tests:**
  - happy paths for `pay` and `send`;
  - every redirect attempt reverts (changed `stealth`, `fee`, `feeRecipient`, `metadata`, `ref`);
  - replay reverts;
  - expired authorizations revert;
  - `fee > value` reverts.
- **Invariants:**
  - the Router never holds USDT;
  - the recipient receives exactly `value - fee`.
- **Fuzz suite:** generated with the `fizz` skill for Echidna/Medusa (13).

### 5.5 Keys and cryptography

- **Merchant root seed `S`.** 32 random bytes generated in the browser. It is stored in IndexedDB, encrypted under a key derived from the merchant's passkey PRF output, and onboarding forces a download of an encrypted backup file.
- **Spending key.** `k_spend = HKDF-SHA256(S, "chupke/spend/v1") mod n`, with public key `K_spend`.
- **Per-period viewing keys (hardened).** `k_view(p) = HKDF-SHA256(S, "chupke/view/v1/" || p) mod n`, where `p` is a label such as `2026-11`.
  - Each period's public key `K_view(p)` is published in the merchant's public `chupke.merchant.json`.
  - The derivation is hardened. Holding `k_view(p)` reveals nothing about `S`, `k_spend` or any other period.
  - Non-hardened tweaks would let `k_view(p) - H(p)` recover a master key, so we do not use them [J].
- **Stealth payment (ERC-5564 scheme 1, secp256k1 with view tags) [S:CP s2].**
  - The payer picks an ephemeral key `r` and publishes `R = rG`. The shared secret comes from `r * K_view(p)`.
  - The view tag is the first byte of the hashed shared secret.
  - The stealth public key is `K_spend + h * G`.
  - The merchant recovers the shared secret from `k_view(p) * R`. The stealth private key is `k_spend + h`.
- **Memo.**
  - Key: `HKDF(shared, "chupke/memo/v1")`.
  - Ciphertext: AES-256-GCM (WebCrypto) over `{invoiceId, period, orderId}`.
  - Layout: `metadata = viewTag || version || iv || ciphertext`.
  - Check ERC-5564's recommended token-metadata layout at kickoff and follow it if it does not leak more than the Transfer event already does [J].
- **Who can read what.**
  - Holders of a viewing key can detect that period's payments and decrypt their memos, but cannot spend.
  - Customers keep `r`. It lets them prove to a third party that a given payment went to merchant M, and it reveals nothing about other payments.
- **Refund reference.** `ref = keccak256("chupke.refund.v1", shared, index)`. It looks random to the public; the customer and the merchant can both compute it.
- **Payer passkey wallet.** `k_payer = HKDF(PRF(credential, "chupke/payer/v1"), "chupke/payer/v1") mod n`. It is a plain EOA, so it signs EIP-712 directly, with no smart account and no bundler. Payers can also pay with any wallet that signs EIP-712.

### 5.6 Data flows

- **F1. Create an invoice.**
  - The dashboard builds the invoice JSON (merchant name, `K_spend`, period and `K_view(p)`, a 128-bit invoice ID, line items, the amount in 6-decimal units, the due date).
  - The link is `https://<any host>/i#<base64url>`.
  - No network request is made. The static host never receives the fragment.
- **F2. Pay.**
  1. The widget decodes the invoice, derives the stealth address and builds the encrypted memo.
  2. It gets a quote from the relayer through `worker.fetch`.
  3. The payer signs `ReceiveWithAuthorization`, with `to = Router` and a nonce bound to the payment parameters.
  4. The widget POSTs the authorization to `/relay`.
  5. The relayer simulates and submits `Router.pay`.
  6. The widget polls for the receipt through Anon-RPC.
  7. A receipt (including `r`) is saved locally and offered as a link.
- **F3. Detect.**
  1. The dashboard or `merchant-node` bulk-downloads `eth_getLogs` for the Announcer and for USDT Transfer events, in chunks.
  2. It filters by view tag, then by the full check, decrypts each memo and matches it to an invoice.
  3. Balances come from the Transfer logs, never from per-address `balanceOf` calls. A per-address call would show the RPC which addresses belong together.
  4. `merchant-node` posts the HMAC-signed webhook to the shop.
- **F4. Refund.**
  - The merchant picks an invoice and an amount `x`.
  - The source is the stealth address that received the payment, or exactly one other source; inputs are never merged.
  - The source signs `Router.send(to = payer, value = x + fee, ref)`, and the transaction is relayed.
  - The customer's receipt page finds the `Sent(ref)` event.
- **F5. Pay a contractor from revenue.**
  - The contractor sends their own Chupke invoice link.
  - Coin selection uses one source per output. If no single balance covers the invoice, the payment is split into several outputs to fresh contractor stealth addresses, all carrying the same encrypted invoice ID.
  - Each output is signed by its source key and relayed with jitter: seconds in the demo, minutes to hours in production.
- **F6. Export.**
  - The dashboard produces CSV and JSON for period `p`, signed by `k_spend`.
  - The accountant link is `/accountant#k=<k_view(p)>&K=<K_spend>&p=<label>&from=<block>`, so the key never leaves the fragment.
- **F7. Verify.**
  - The accountant's page scans the chain independently with `k_view(p)` through Anon-RPC.
  - It checks that every export line matches the chain (no fabrication) and that every detected payment appears in the export (no omission).
  - It shows "N of N match, 0 missing, 0 unknown".
- **Hygiene guard (in `@chupke/core`; the UI refuses or warns).** The rules map to the five habits [S:PS stack section]:
  - **H1, registrant reuse.** Never send to the merchant's registrant or other known addresses.
  - **H2, sender equals receiver.** Never send back to the original payer, except through an explicit refund.
  - **H3, collector clusters.** Never merge two stealth inputs, and never send two sources to one destination. Warn before an off-ramp consolidation.
  - **H4, unique priority fee.** Removed by construction: the relayer applies one fee policy to every transaction.
  - **H5, gas funding.** Removed by construction: stealth addresses never receive WBT.

### 5.7 Relayer: economics and anti-drain (answers Scale and the CROPS C line)

- **Who pays for gas.** The merchant does. The payer signs for exactly the invoice amount, and the Router sends `value - fee` to the stealth address and `fee` to the bound fee recipient. The dashboard shows the fee as a network fee, much like a card processor's merchant fee.
- **Quote.** `fee = ceil((l2GasEstimate * gasPrice + l1Fee) * usdtPerWbt * 1.25)`.
  - The L1 data fee comes from `getL1Fee` on the GasPriceOracle predeploy `0x420000000000000000000000000000000000000F` [S:WC Q3].
  - `usdtPerWbt` is fixed on testnet (disclosed).
  - A quote is valid for 60 s.
- **Where its WBT comes from.**
  - Testnet: the faucet gives 0.5 WBT per 24 h per GitHub account at least 30 days old [S:WC Q3].
  - At about 0.001 WBT per payment including the L1 fee [J estimate], that is hundreds of payments per account-day.
  - Production: sell accumulated USDT fees for WBT on a Whitechain DEX (not built).
- **What stops draining [J].**
  1. **Allowlisted target.** Only the Router address, and only the `pay` and `send` selectors.
  2. **Simulate first.** `eth_call` against the latest block just before submitting; drop anything that reverts.
  3. **Self-funding.** The fee must cover gas plus margin, and it is paid in the same transaction. A successful relay therefore never loses money, so spam that succeeds just pays the relayer.
  4. **Short validity.** `validBefore` is at most now plus 10 minutes, so nobody can stockpile authorizations for griefing.
  5. **Gas cap.** At most 300k gas per transaction.
  6. **One in flight.** One pending transaction per `from` address.
  7. **Revert ban.** Any `from` address that causes a revert after a passing simulation is banned for 24 h.
  8. **Daily budget.** A hard WBT budget per day, 0.2 WBT on testnet. Once it is spent, the relayer returns 503 and the widget fails over.
  9. **Small hot wallet.** The hot key holds only one day's budget; top-ups are manual.
  10. **No per-IP limits as a defence.** Tor exits are shared, so IP limits are meaningless. Any IP counters stay in memory only, hashed with a salt that rotates daily, and are never logged.
- **The residual risk is a race.** A payer can spend their balance or call `cancelAuthorization` between our simulation and inclusion. Blocks take about 1 s [S:WC Q3], the race is bounded by items 7 and 8, and it costs the attacker real USDT to set up.
- **Logs.** Each line holds only `txHash, selector, fee, gasUsed, ts`. No IPs, no request bodies.
- **Failover order in the widget.**
  1. The Chupke relayer.
  2. The merchant's own relay (`merchant-node` relay mode, funded by the merchant).
  3. Open relaying: re-sign with `feeRecipient = 0`. The README ships a CLI that lets any WBT holder submit and earn the fee.

### 5.8 Read path (Anon-RPC)

- **Transport.** viem `http("https://rpc.testnet.whitechain.io", { fetchFn: worker.fetch, batch: true })`. `fetchFn` is in viem's source [S:AR Q2]. The Whitechain RPC returns `access-control-allow-origin: *` and accepts JSON-RPC batches [S:AR Q9].
- **Worker.**
  - Default: tor-js through mainnet specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e`.
  - Fallback: Nym, specifier `0x3aCD9742C68F6d993066Ae25533e09b9e1f60eD0`, which needs no config [S:AR Q1].
  - We pin the expected `workerHash` on the client and refuse a different one, following the Privacy Pools pattern [S:AR Q2].
- **Latency budget.**
  - tor-js boots in about 8 s, with a median call of about 0.8 to 1.2 s.
  - Nym boots in about 11 s, with a median call of about 0.8 s [S:AR Q6].
  - So the worker starts when the widget mounts (pre-warm), and calls are batched through Multicall3 (`0xcA11...CA11`) [S:WC Q3].
  - Initial log scans are chunked and cached in IndexedDB.
- **Fail closed.**
  - No silent direct fallback, following the Privacy Pools precedent [S:AR Q2].
  - A 90 s boot timeout, following the Kiwi News pattern [S:AR Q2], with visible state.
  - An explicit "Continue without private connection" button, off by default and disclosed.
- **Relay POSTs** also go through `worker.fetch`, which hides the payer's IP from our own relayer.
- **Not routed (stated in the README).**
  - `merchant-node` reads directly: there is no Node harness on npm [S:AR Q1].
  - The relayer's server-side calls go direct.
  - The specifier bootstrap read goes to a public mainnet RPC.

### 5.9 What runs where

| Component | Runs on | Operated by | Holds | Replaceable by |
|---|---|---|---|---|
| ChupkeRouter, Announcer, Registry | Whitechain Sepolia | nobody (no owner) | nothing between transactions | a redeploy from the repo |
| Static web apps | IPFS, one HTTPS mirror, or a local build | us, or the merchant | nothing; state lives in the user's browser | any static host |
| Widget and core | inside the merchant's own bundle | the merchant | the payer key, in that browser | not applicable |
| Relayer | a small container on any VPS | us | a hot WBT wallet up to the daily cap | the merchant relay, or any WBT holder |
| merchant-node | the merchant's server | the merchant | viewing keys, plus WBT if relay mode is on | the merchant's choice |
| Anon-RPC worker | a browser iframe sandbox | bundles from specifier owners; gateways and exits run by third parties | nothing | Nym, our own gateway, our own specifier |
| Whitechain RPC | Whitechain infrastructure | Whitechain | none | our own op-reth node from `whitechain-labs/node` [S:WC Q3] (stretch 4) |

### 5.10 Packages and versions

| Package or tool | Version | Source |
|---|---|---|
| viem | 2.57.11 or later 2.x; `whitechainSepolia` is in `viem/chains` | `fetchFn` confirmed in the 2.57.11 source [S:AR Q2]; Whitechain docs tested 2.55.13 [S:WC Q3] |
| @anon-rpc/browser-harness | 0.3.3 (npm) | [S:AR Q1]. Version 0.4.0, which adds `isolationKey`, exists only on the repo's main branch; we do not depend on it |
| tor-js worker | the bundle pinned by specifier 0x700d...659e (tor-js@0.4.3) | [S:AR Q1] |
| @nymproject/anon-rpc-worker | 0.1.0, through specifier 0x3aCD...0eD0 | [S:AR Q1] |
| solc | 0.8.28, `evm_version = "cancun"` | [S:WC Q4] |
| Foundry (forge, anvil, cast) | stable channel at kickoff; pin in CI | [J] |
| @openzeppelin/contracts | latest 5.x at kickoff (SafeERC20 only) | [J] |
| @noble/curves, @noble/hashes | latest at kickoff, pinned in the lockfile | [J] |
| React | 18.3.1 | [J] |
| Vite | latest stable at kickoff, pinned | [J]; Whitechain ships a Vite template [S:WC Q3] |
| Hono (relayer) | latest 4.x at kickoff, pinned | [J] |
| Node.js, pnpm | Node 22 LTS, pnpm 9 or later | [J] |
| Echidna or Medusa | through the `fizz` skill | [J] |
| @scopelift/stealth-address-sdk | optional, as a test-vector cross-check only; verify its license and that it accepts custom Announcer addresses | [J] |

### 5.11 Repos and code to reuse (allowed under Classic as public libraries and starter kits [S:JC Q1])

- **`whitechain-labs/templates`** (the Foundry and Vite templates) to scaffold the repo at 21:00 [S:WC Q3].
- **ERC-5564 Announcer and ERC-6538 Registry reference contracts.** The EIPs give the canonical addresses and the deterministic deployer [S:CP s2]. Copy the reference implementation; verify the repository name and license before 5 Nov [J].
- **`ethereum/anon-rpc`**, `docs/integrate-wallet.md`.
- **Patterns to study, then write our own code:**
  - Privacy Pools' `egress-transport.ts` and `tor-fetch.ts` (fail closed, hash pinning);
  - Kiwi News' `anon-transport.mjs` (boot timeout) [S:AR Q2].
- **Kohaku issue #324:** the receive-side withdrawal rules and their 18 conformance vectors [S:PS stack section], for stretch 2.
- **`whitechain-labs/node`**, for stretch 4 [S:WC Q3].

### 5.12 Diagram

```
 CUSTOMER BROWSER (shop site or invoice link)        MERCHANT (shop or studio)
 +-------------------------------------------+       +-----------------------------------------+
 | ChupkeCheckout widget / pay page          |       | Dashboard (static, local state)         |
 |  passkey PRF -> payer EOA key             |       |  seed S -> k_spend, k_view(period)      |
 |  invoice from URL #fragment               |       |  create invoice links, scan, refund,    |
 |  derive stealth addr + encrypted memo     |       |  pay contractor invoices, export        |
 |  sign EIP-712 ReceiveWithAuthorization    |       | merchant-node (viewing keys only)       |
 |  Anon-RPC harness: tor-js or Nym iframe   |       |  bulk scan -> HMAC webhook to shop      |
 +---------------------+---------------------+       |  optional relay mode (merchant's WBT)   |
                       |                             +-------------------+---------------------+
                       | quote + signed auth, sent through worker.fetch  |
                       v                                                 | (failover relay)
            +-----------------------+   any WBT holder may submit the    |
            | Chupke relayer        |   same calldata and earn the fee   |
            | allowlist, simulate,  | <----------------------------------+
            | fee >= cost, caps     |
            +-----------+-----------+
                        | Router.pay / Router.send
                        v
 WHITECHAIN SEPOLIA (chain 1874, op-reth, single sequencer, forced inclusion via L1 ~12 h)
 +----------------------------------------------------------------------------------------+
 | USDT 0xcedf...55a7 (TetherTokenV2, EIP-3009)                                           |
 | ChupkeRouter: receiveWithAuthorization(nonce = H(all params)) -> stealth gets value-fee |
 |               -> fee to bound recipient -> Announcer.announce(1, stealth, R, memo)      |
 | ERC5564Announcer        ERC6538Registry        (no owner, no admin, no stored funds)   |
 +----------------------------------------------------------------------------------------+
                        ^  bulk eth_getLogs / receipts, via Anon-RPC worker
                        |
 ACCOUNTANT BROWSER: link with k_view(period) in #fragment -> independent scan -> N of N match
 CUSTOMER RECEIPT:   link with r in #fragment -> payment and refunds verified on chain
```

---

## 6. Scope

### 6.1 MVP (must work end to end on Whitechain Sepolia with the prize USDT)

1. `ChupkeRouter` (`pay`, `send`), `ERC5564Announcer` and `ERC6538Registry` deployed and verified, with unit, redirect-attack and invariant tests.
2. `@chupke/core`:
   - key derivation, stealth math, memo encryption;
   - EIP-712 signing against the real USDT domain;
   - bulk scanner, balances from logs;
   - hygiene guard (H1 to H3 refused, H4 and H5 removed by construction);
   - export and verify.
3. The relayer with the full section 5.7 policy, running as two instances (ours, plus the merchant relay in `merchant-node`).
4. Pay page and `<ChupkeCheckout>`:
   - a passkey payer with zero crypto steps;
   - an "any wallet" payer through EIP-712.
5. Merchant dashboard:
   - onboarding with a seed backup;
   - invoice links with due dates and overdue state;
   - the payment list;
   - full and partial refunds;
   - paying a contractor's invoice from revenue (one source per output);
   - period export and the accountant link.
6. Accountant page (independent scan and reconciliation) and receipt page (payment and refunds verified on chain).
7. Anon-RPC on by default for every browser read and for relay POSTs, failing closed with visible state.
8. `examples/chai-shop`: about 20 lines of integration plus an order webhook from `merchant-node`.
9. Docs: README with the CROPS section and Whitechain line, `WHITECHAIN_FEEDBACK.md`, `AI_USAGE.md`, `SPEC.md`; a video of 2:40 to 2:55.

**Definition of done (check at the freeze, Fri 22:00):**
- [ ] One payment, one partial refund and one contractor payout in prize USDT, with all three explorer links in the README.
- [ ] Killing our relayer mid-demo still lets a payment succeed through the merchant relay.
- [ ] The relayer log shows no merchant, invoice or IP.
- [ ] The accountant page reconciles period A and cannot see period B.
- [ ] A fresh browser profile completes the passkey payment with no wallet extension installed.
- [ ] The network panel shows no direct page-origin request to `rpc.testnet.whitechain.io` and no third-party analytics.
- [ ] All contracts verified on Blockscout.
- [ ] The setup steps in the README work from a clean clone.

**Cut list, in order, if integration point 2 is not green by Fri 14:00:**
1. Registry lookup for contractors (use the invoice link only).
2. The accountant page's UI becomes a CLI verifier.
3. The "any wallet" payer path (passkey only).
4. Receipt-page polish.

Never cut: the refund, the export, the moment-it-matters beat, or the qualifying USDT payment.

### 6.2 Stretch goals, in priority order

1. **Canonical addresses (30 minute timebox).** Reproduce the canonical ERC-5564 and ERC-6538 addresses through the 0x4e59 deployer, so existing stealth tooling recognises them.
2. **Kohaku #324 conformance vectors.** Run the 18 vectors as tests of the hygiene guard, if they are machine-readable.
3. **Our own Anon-RPC specifier on Whitechain Sepolia** (about 1.1M gas [S:AR Q1]), pinned to the tor-js hash, with a self-hosted resolver and renounced ownership. This removes the CDN and the mainnet bootstrap read.
4. **Our own op-reth follower node** as an alternative RPC, pre-synced from published artifacts (see 7.1). Add a "use my node" switch.
5. **Forced inclusion script.** Build an OptimismPortal deposit on L1 Sepolia that calls `Router.pay`: the documented zero option against sequencer censorship. Record it; do not attempt it live.
6. **Encrypted blob store for short links and QR codes.** AES-GCM with the key in the fragment. It is our only other server, so ship it only if Arkiv's prize makes it serverless.
7. **Onchain commitment of each period's viewing public key at the start of the period**, so completeness is checked against a declared set.
8. **Fixed-denomination ZK note pool for the contractor's off-ramp.** Start only if integration point 3 is green by Fri 18:30 and two people are free. Otherwise it stays the documented next step.

### 6.3 Non-goals

- Payroll runs and batch payroll
- Escrow, revenue splits, subscriptions, x402
- Amount privacy or sender privacy
- Fiat off-ramp, KYC and AML screening
- Mainnet deployment
- Multiple tokens or chains
- Mobile apps
- Server-sent email reminders
- Smart-contract-wallet payers (EIP-3009 with v, r, s does not cover EIP-1271)

### 6.4 Mocked or simplified parts (disclose in the README and the video)

1. **Customer funding.** The team pre-funds passkey wallets with prize USDT. A real customer would fund theirs from an exchange or another wallet, which is a visible crypto step we do not hide.
2. **Relayer funding and pricing.** WBT comes from the faucet, the WBT/USDT rate is fixed, and USDT fees are not converted back into WBT.
3. **Reminders.** Copy-to-clipboard or mailto only; nothing is scheduled.
4. **Periods.** The period is a label chosen when an invoice is issued. The demo issues both "2026-10" and "2026-11" invoices during the event.
5. **Anonymity set.** Only the demo recipients. On a fresh testnet recipient privacy is weak in practice, whatever the cryptography.
6. **merchant-node reads directly from the Whitechain RPC.** No Node Anon-RPC harness is published [S:AR Q1].
7. **Third-party Anon-RPC infrastructure.** We use third-party worker bundles and gateways, and `isolationKey` is not honoured, so unlinkability of sweeps at the relayer is best effort.
8. **Passkey wallets are bound to their domain.** The fallback is any EIP-712 wallet.
9. **Invoice links are not signed by the merchant.** The phishing risk is the same as for any payment link or QR code.
10. **The shop and the studio are fictional.** The contractor and the accountant are played by teammates.
11. **The phone faucet for judges** (optional) is a team-funded convenience, not part of the product.

---

## 7. Pre-event de-risking (no project code) and day-one checks

### 7.1 Before Thu 5 Nov (all research, accounts or environment setup; no project code, designs or assets [S:JC Q1])

| # | Item | Owner | Due |
|---|---|---|---|
| 0 | Confirm all three teammates have applied (deadline 30 Oct 23:59 [S:JC Q1]) | all | 29 Oct |
| 1 | **Prize USDT.** Ask on Whitechain Discord (`discord.gg/7GwAXYmaW9`) and the Telegram dev chat (`t.me/Whitechaindevs`) [S:WC Q3] how to get `0xcedf...55a7`; request about 200 USDT per team; find out who the 10 holders are [S:WC Q6] | A | 28 Oct, chase daily |
| 2 | Claim faucet WBT daily on all three GitHub accounts, which must be at least 30 days old. Limits apply per wallet, IP and account [S:WC Q3], so claim from separate networks | all | daily from 27 Oct |
| 3 | Read the verified TetherTokenV2 source on Blockscout (implementation `0x2642...26f7` [S:WC Q6]). Confirm:<br>• the exact `receiveWithAuthorization` signature (v, r, s or bytes);<br>• the EIP-712 domain name and version (`DOMAIN_SEPARATOR`, EIP-5267 if present);<br>• blocklist and pause functions | B | 30 Oct |
| 4 | Find out who called `transferWithAuthorization` on 2026-10-24 [S:WC Q6]; an existing user is a hint about how others got the token | A | 30 Oct |
| 5 | Open the public Anon-RPC demo page [S:AR Q1] with tor-js and with Nym against `https://rpc.testnet.whitechain.io`. Does Cloudflare block or challenge exits [S:AR Q9 gap]? Record latency | B | 1 Nov |
| 6 | Use `cast` on the public RPC to find the maximum `eth_getLogs` block range, batch behaviour and 429 behaviour | B | 1 Nov |
| 7 | Test WebAuthn PRF on the demo laptops and browsers with a public PRF test page; note which platform authenticator works | C | 2 Nov |
| 8 | Read the Cloak and CloakPay showcase pages; update section 4 and the pitch | C | 31 Oct |
| 9 | Locate the ERC-5564 and ERC-6538 reference contracts and their deploy salts; confirm licenses (also for anon-rpc, tor-js, noble, OpenZeppelin) | A | 1 Nov |
| 10 | Check Blockscout verification with Foundry (`--verifier blockscout`) using a generic hello-world contract unrelated to the project | A | 2 Nov |
| 11 | Read the Kohaku #324 conformance vector format | B | 2 Nov |
| 12 | Optional: start syncing an op-reth follower for Whitechain Sepolia from `whitechain-labs/node`. This is infrastructure setup; disclose it in the README | A | 31 Oct |
| 13 | Dev environment on all laptops (Node 22, pnpm, Foundry, a recording tool, a microphone); a test recording at 1080p; no phones [S:JC Q1] | all | 3 Nov |
| 14 | Re-read the CROPS prize text for changes to "(tbc: final review pending)" [S:JC Q2] | B | 4 Nov and 5 Nov |
| 15 | Prepare the workshop question lists (7.2) | A, B | 4 Nov |
| 16 | Do not create the project repo, mockups, logos or code. This plan stays in the ideas repo | all | always |

### 7.2 Thu 5 Nov at the venue, before 21:00

- **16:30, Whitechain workshop (A and C)** [S:JC Q1]. Ask:
  - how to get the prize USDT;
  - whether mainnet USDT supports EIP-3009;
  - `getLogs` range limits;
  - whether Cloudflare blocks Tor exits;
  - the Blockscout API URL;
  - whether the partner RPC tier (200 rps [S:WC Q3]) is available for the event.
- **17:00, EF workshop (B)** [S:JC Q1]. Ask:
  - whether a single-sequencer L2 plus a replaceable relayer is acceptable when the trade-offs are stated;
  - whether the CROPS text changed.
- **16:00, Arkiv workshop (C, if it does not clash):** read the prize text and apply the 2.3 rule.

### 7.3 Day-one checks after 21:00 (all within the first two hours)

1. First commit by 21:15, then interfaces frozen in `SPEC.md` by 22:15.
2. The prize USDT balance is in the team wallets (otherwise escalate to Whitechain staff in person).
3. `cast call` against USDT: `name`, `version` or `eip712Domain`, `DOMAIN_SEPARATOR`. Sign one `receiveWithAuthorization` and submit it from a script by 23:30.
4. The Announcer and Registry are deployed and verified by 00:30.
5. The Anon-RPC worker boots in our app shell and returns `eth_chainId = 0x752`.
6. Passkey PRF works in the chosen browser profile.

---

## 8. 36-hour timeline (IST)

**Roles.**
- **A, Solidity lead:** contracts, relayer, security review, README.
- **B, protocol and TypeScript core:** keys, stealth math, scanner, Anon-RPC, merchant-node.
- **C, frontend and product:** widget, pages, dashboard, demo shop, video.

**Team-mix note [J].** About 80% of the work is TypeScript and React, while the contracts are small. Put the strongest React person in C. If all three are Solidity-first:
- A joins C on Friday morning once the relayer is done;
- the accountant page becomes a CLI (cut list item 2).

**Commit rules.** Everyone pushes to `main` at least every 45 minutes, with no squash merges. Tags mark `ip1`, `ip2`, `ip3` and `freeze` [S:JC Q1 version-control rule].

| IST | A: Solidity lead | B: protocol and TS core | C: frontend and product |
|---|---|---|---|
| Thu 13:00 to 20:00 | Registration, Whitechain workshop 16:30, USDT check | EF workshop 17:00, re-read prize pages | Whitechain workshop, Arkiv text, venue Wi-Fi test |
| Thu 20:00 to 21:00 | Opening ceremony. No code. | Same | Same |
| Thu 21:00 to 21:30 | **All:** create the repo, Apache-2.0 LICENSE, README stub, scaffold from Whitechain templates, first commits | Same | Same |
| Thu 21:30 to 22:15 | **All:** write `SPEC.md`: Router ABI, nonce formula, key labels, invoice and config schema, memo layout, relayer API, core signatures. **Interface freeze.** | Same | Same |
| Thu 22:15 to Fri 01:30 | Router plus tests on an anvil fork with the real USDT; deploy Announcer, Registry and Router; start verification | `keys`, `stealth`, `memo`, `eip3009` modules; a CLI that pays prize USDT through the Router to a stealth address | Vite app shell (pay, receipt, dashboard, accountant routes), invoice link codec, passkey PRF key, Anon-RPC boot reading `eth_chainId` |
| Fri 01:30 to 02:00 | **Integration point 1 (all):** a scripted prize-USDT payment through the deployed Router, found by B's CLI scanner. Save the explorer link. Tag `ip1`. | Same | Same |
| Fri 02:00 to 03:30 | Finish Blockscout verification. **Sleep 02:30 to 07:00** | Scanner: chunked `getLogs`, view-tag filter, memo decryption, balances from Transfer logs | **Sleep 02:00 to 06:30** |
| Fri 03:30 to 07:00 | (asleep) | **Sleep 03:30 to 08:00** | (asleep until 06:30), then wire the widget to core signing |
| Fri 07:00 to 12:00 | Relayer: quote (`getL1Fee`), simulation, policy, budget, minimal logs; deploy our instance; relay mode inside merchant-node | From 08:00: Anon-RPC transport (`fetchFn`, batching, cache, fail closed, 90 s timeout), relay POSTs through `worker.fetch`, merchant-node watcher | Merchant dashboard: onboarding with seed backup and config download, invoice creation with due date, payment list, status |
| Fri 12:00 to 12:30 | **Integration point 2 (all):** browser flow: invoice link, passkey payment through the relayer, the dashboard shows Paid. Tag `ip2`. Apply the cut list if this is not green by 14:00. | Same | Same |
| Fri 12:30 to 13:30 | Lunch, triage | Same | Same |
| Fri 13:30 to 18:00 | `Router.send` plus tests; invariant and fuzz suite (`fizz`); audit pass (`solidity-auditor`) with human triage; fixes | Refunds; contractor payouts with the hygiene guard; period keys; signed export; accountant verifier | Refund button, receipt page, contractor invoice and "Pay from revenue", accountant page |
| Fri 18:00 to 18:30 | **Integration point 3 (all):** the full MVP on Sepolia with Anon-RPC on. Tag `ip3`. Decide which stretch goals to attempt. | Same | Same |
| Fri 18:30 to 19:30 | Dinner | Same | Same |
| Fri 19:30 to 22:00 | Stretch 1 or 2; README architecture, relayer economics and CROPS draft; notes for `WHITECHAIN_FEEDBACK.md` | merchant-node webhook into the shop; the merchant relay instance; Anon-RPC traffic table; performance pass | `examples/chai-shop` with the 20-line integration; widget copy with no crypto words; a "naive merchant" comparison address for the demo hook |
| **Fri 22:00** | **FEATURE FREEZE.** Tag `freeze`. Bug fixes, docs and video only from here. | Same | Same |
| Fri 22:00 to Sat 00:30 | **All:** bug bash in fresh browser profiles; run the 4-minute demo twice against a timer; collect the explorer links; confirm every contract is verified; check the network panel for trackers; follow the README from a clean clone | Same | Same |
| Sat 00:30 to 02:30 | Final README (limitations, mocked parts, new versus reused, Q&A appendix), `AI_USAGE.md` | **Record the video with C** (team voices, 1080p) | Record and edit to 2:40 to 2:55; upload unlisted by 02:45 |
| Sat 02:30 to 05:00 | **Sleep 02:30 to 05:00** | **Sleep 02:30 to 05:00** | Check the upload, then **sleep 03:00 to 05:00** |
| Sat 05:00 to 07:00 | **All:** final checklist (10.8); fill in the submission form; select Whitechain and EF; write each partner's integration and feedback text. **Submit by 07:00.** | Same | Same |
| Sat 07:00 to 09:00 | **Buffer:** fix any form issues (edits are possible until the deadline; verify on the dashboard); rehearse the live demo; pre-boot workers and tabs; charge devices. Deadline 09:00 [S:JC Q1]. | Same | Same |
| Sat 09:30 to 12:30 | Finalist judging session; partner booths are optional [S:JC Q1] | Same | Same |

Each person sleeps about 7 hours in total.

---

## 9. Demo scripts

### 9.1 Live finalist demo: 4 minutes, then 3 minutes of Q&A

**Setup.**
- **Laptop 1 (customer view):**
  - the chai-shop in a clean Chrome profile with a funded passkey wallet;
  - a receipt tab;
  - the explorer.
- **Laptop 2 (merchant view):**
  - the merchant dashboard;
  - the shop's admin page;
  - a terminal tailing the relayer log;
  - an accountant tab;
  - a contractor tab.
- **Both:** workers pre-booted 2 minutes before the slot; a printed QR code of a 1 USDT invoice for an optional judge payment.
- **Backup:** the submission video, saved locally.

| Time | Speaker | On screen | Beat |
|---|---|---|---|
| 0:00 to 0:20 | A | Explorer page of a "naive merchant" address that took plain USDT transfers | "This is a studio's whole client list and revenue, public. Chupke makes this page impossible to build, without giving up refunds, webhooks or an accountant." |
| 0:20 to 0:40 | C | The shop's code, with the 22 integration lines highlighted | "A separate shop adds us in about 20 lines: one component, one watcher." |
| 0:40 to 1:20 | C | **Customer view:** add tea to the cart, "Pay 4.00 USDT", fingerprint prompt, Paid in about 5 s, receipt | "No wallet, no gas, no chain name, no seed phrase." Optional: a judge scans the QR code and pays 1 USDT from their own phone (only if their browser supports PRF; otherwise skip). |
| 1:20 to 2:05 | B | **The moment it matters.** The explorer shows payer, then Router, then `0x7f..` (fresh), plus an Announcement. Then the relayer terminal: one line with a hash, the fee and the gas, nothing else. Then the DevTools network panel: the page never contacted the Whitechain RPC directly. Then **Ctrl-C the relayer**, the customer pays again, and the widget fails over to the merchant's relay: Paid. | "Find the merchant. You can't, and neither can our server, which we just switched off." |
| 2:05 to 2:45 | C | **Merchant view.** The dashboard scans locally with the merchant's key and shows both payments; the shop admin shows the order paid through the webhook (no Chupke API involved); click "Refund 1.00"; switch to the customer receipt tab: "Refunded 1.00, verified on chain". | "The merchant verifies its own money. The customer verifies its own refund." |
| 2:45 to 3:15 | A | **Contractor.** Open the contractor's invoice link, then "Pay from revenue". The guard shows "one source per payment, fresh address, no merging". Paid. The contractor's tab shows it arrive. | "Paying a contractor is just paying their invoice. Nothing links the studio's revenue to the contractor." |
| 3:15 to 3:50 | B | **Accountant.** Open the November key link: the November payments appear, "6 of 6 match, 0 missing". Open the October key: only October's payments. | "One month's key, one month's books, and the accountant checked the chain itself." |
| 3:50 to 4:00 | A | Closing slide (no more than 4 bullets) | "Fingerprint to pay, refunds, payouts, books. Nobody in between learned who paid whom." |

**If running long:** cut the second relayer-down payment first, then shorten the contractor beat to 15 s.

**Q&A:** answers in section 12. The three prepared ETHGlobal prompts (inspiration, tools and why, challenges) [S:JC Q1] map to Q12.9, Q12.10 and Q12.3.

### 9.2 Submission video: target 2:45, hard window 2:00 to 2:59

**Rules [S:JC Q1]:**
- no more than 20 s of backstory;
- no more than 4 bullets per slide;
- at least 720p (we record at 1080p);
- no speed-up;
- no music with on-screen text instead of talking;
- no phone recording;
- no AI voiceover.

The EF cap is 3:00 and Whitechain requires 2 to 4 minutes [S:JC Q2, Q3].

| Time | View | Content |
|---|---|---|
| 0:00 to 0:12 | Explorer | Hook: the naive merchant's address shows every client and every amount. |
| 0:12 to 0:30 | Slide plus code | "Chupke: private USDT invoices and checkout on Whitechain" (3 bullets), then the 22-line integration diff. |
| 0:30 to 0:58 | **Customer** | Shop checkout, passkey, Paid, receipt. The caption notes the wallet was pre-funded. |
| 0:58 to 1:25 | **Moment it matters** | Explorer (fresh address), the relayer log (nothing identifying), the network panel (reads through Anon-RPC), then kill the relayer and pay again through the merchant relay. |
| 1:25 to 1:50 | **Merchant** | Dashboard detection, the shop webhook marks the order paid, a partial refund, then the customer's receipt shows it. |
| 1:50 to 2:10 | **Contractor** | "Pay from revenue", the no-merge guard, the contractor receives. |
| 2:10 to 2:30 | **Accountant** | The period key, independent scan, "N of N match"; the other period stays dark. |
| 2:30 to 2:48 | Slide | CROPS in 4 bullets; Whitechain contracts and explorer links; "relayer economics and limitations in the README". |
| 2:48 to 2:55 | End card | Repo URL, team names. |

Every party appears: the customer, the merchant, the contractor, the accountant and the relayer operator (its log).

---

## 10. README skeleton and partner files

### 10.1 README.md sections

1. **Chupke.** The one-line promise and the 3-line pitch.
2. **Demo:** video link, live IPFS link and mirror, and the local-build command.
3. **Why onchain stablecoin settlement on Whitechain** (10.3).
4. **Onchain evidence:** verified contracts and the explorer links for the pay, partial refund and contractor payout transactions in prize USDT.
5. **Quick start:** prerequisites, `pnpm i`, `forge build`, env vars (none secret except the relayer's hot key), running the relayer, running the shop example.
6. **Integrate in 20 lines:** the two snippets below, with a line count.
7. **Architecture:** the diagram, components, the Router and nonce binding, keys, data flows F1 to F7.
8. **Privacy model:** a table of what each party learns, plus the weak spots from 5.1.
9. **CROPS** (10.2).
10. **Relayer economics and anti-drain** (section 5.7 verbatim).
11. **Anon-RPC traffic** (10.6).
12. **Security:** Router invariants, the test list, the fuzz suite, findings from the audit pass and how they were fixed.
13. **Limitations and mocked parts** (6.4) and **Non-goals** (6.3).
14. **What is new and what is reused** (Classic track; list every library and template).
15. **Prior art** (section 4, condensed).
16. **Shipping after the hackathon:** check mainnet USDT for EIP-3009; audit; Whitechain Builders Program [S:WC Q2].
17. **AI usage** (link to `AI_USAGE.md`).
18. **License:** Apache-2.0, with a pledge not to relicense.

**Integration snippets for item 6:**

```tsx
import { ChupkeCheckout } from "@chupke/react";
import merchant from "./chupke.merchant.json";

export function PayButton({ order }: { order: Order }) {
  return (
    <ChupkeCheckout
      merchant={merchant}
      amount={order.totalUsdt}
      orderId={order.id}
      dueDate={order.dueDate}
      onPaid={(receipt) => showThankYou(order.id, receipt)}
    />
  );
}
```

```ts
import { watchPayments } from "@chupke/merchant-node";

watchPayments({
  config: "./chupke.merchant.json",
  viewingKeys: process.env.CHUPKE_VIEW_KEYS!,
  rpcUrl: process.env.WHITECHAIN_RPC ?? "https://rpc.testnet.whitechain.io",
  relay: { enabled: true, privateKey: process.env.MERCHANT_RELAY_KEY! },
  onPaid: async (p) => markOrderPaid(p.orderId, p.amount, p.txHash),
});
```

### 10.2 Draft CROPS section (answers EF's four prompts verbatim [S:JC Q2])

> **Lead property: P.** A business can take USDT from customers and pay its contractors while neither our servers, the RPC provider nor anyone reading the chain can tell who was paid.
>
> **C** (what we control that you depend on, and what happens if it goes away or refuses you): We run a relayer and a static site, and we choose the default Anon-RPC worker. If the relayer refuses or disappears:
> - the merchant's own relay takes over;
> - otherwise any WBT holder can submit the same signed payment and collect its fee.
>
> If our domain disappears, the same invoice link opens on IPFS or a local build, because the invoice lives in the URL fragment. If the RPC refuses Tor, the app fails closed and you can switch to Nym or your own node. Whitechain itself is a single sequencer with forced inclusion through L1 within about 12 hours, and the USDT issuer can freeze any address; no app can change either.
>
> **O** (license, and building from the repo alone): Apache-2.0. Contracts, SDK, widget, relayer, dashboard and example all build from this repo with `pnpm i && pnpm build` and `forge build`. No API keys are needed, and we pledge not to relicense.
>
> **P** (what each third party learns):
> - **Our relayer:** the payer address, a one-time recipient address and the amount, all of which are public onchain anyway, plus a Tor exit IP. It never sees the merchant or the invoice.
> - **The Whitechain RPC:** bulk log downloads and the payer's own balance read, through Anon-RPC.
> - **The static host:** never receives the invoice, which stays in the URL fragment.
> - **Analytics:** there are none.
> - **The public chain:** the payer, the amount and the time, but not who was paid.
>
> What still leaks: amounts, timing, a small anonymity set, and consolidation at the off-ramp.
>
> **S** (how keys and data are protected; trust assumptions):
> - Payer and merchant keys are derived on the device from a passkey (WebAuthn PRF), and the merchant keeps an encrypted seed backup.
> - Viewing keys are read-only and scoped to one period.
> - The Router is immutable, has no owner, and binds every parameter into the EIP-3009 nonce, so no relayer can redirect funds.
>
> We trust the Whitechain sequencer to stay live, the USDT contract and its issuer, the browser and passkey provider, and the hash-pinned Anon-RPC worker.

### 10.3 Whitechain "why onchain stablecoin settlement" line (required [S:JC Q3])

> A Mumbai studio billing a client in Berlin gets final USDT settlement in about a second with no acquirer, correspondent bank or processor in the middle that sees both parties. Taking that middleman out is the only way "the server learns nothing" can be true. Refunds and a quarter's books can be checked by anyone holding the right key, not by asking a bank. Whitechain's EIP-3009 USDT lets one-time stealth addresses move funds without ever holding gas, which no card network or bank transfer can express.

### 10.4 Privacy model table (README item 8)

| Party | Learns | Does not learn |
|---|---|---|
| Public chain observer | Payer address, amount, time, use of the Chupke Router | The merchant, the contractor, the invoice, merchant revenue totals |
| Chupke relayer | The above, plus a Tor exit IP and the time of each relay request | The merchant, the invoice, the customer's IP |
| Whitechain RPC | That someone bulk-downloaded logs; the payer's own balance read (via Anon-RPC) | Which stealth addresses belong together; the customer's IP |
| Static host or IPFS gateway | That a page was loaded | The invoice (fragment) |
| Merchant | The payer address (needed for refunds), its own invoices | Other merchants' payments |
| Accountant | Every payment in the periods it was given | Other periods; it cannot spend |
| Customer | Its own payment and refunds; it can prove payment to merchant M | Other customers |

### 10.5 WHITECHAIN_FEEDBACK.md outline

Write only what the team actually experiences. The candidate items below come from the notes and must be confirmed during the event.

- **What worked:**
  - `whitechainSepolia` in viem;
  - the prize USDT supports EIP-3009 and permit;
  - the RPC answers with CORS `*` and accepts batches;
  - deterministic deployers and Multicall3 are present;
  - Blockscout verification;
  - llms.txt and the `whitechain-dev` skill [S:WC Q3, Q5, Q6, AR Q9].
- **Where we got stuck:**
  - the path to obtain the prize USDT;
  - the token list's USDT.e (`0xaa79...`) is a different contract without EIP-3009 [S:WC Q6];
  - no hosted bundler and failing Reown embedded wallets [S:WC Q6];
  - `getLogs` limits;
  - Tor exits at Cloudflare;
  - testnet lacks Karst [S:WC Q4].
- **What the docs were missing:**
  - a prize USDT faucet and its EIP-712 domain;
  - ERC-5564 and ERC-6538 deployments;
  - how to do forced inclusion with a custom gas token;
  - RPC `getLogs` limits;
  - guidance on privacy and RPC.
- **Suggestions:**
  - deploy canonical stealth registries;
  - publish a USDT test faucet;
  - offer an onion or KPS RPC endpoint.

### 10.6 Anon-RPC traffic table (README item 11; also serves EF's Anon-RPC criteria)

| Call | Made by | Route | Reason |
|---|---|---|---|
| `eth_getLogs` on the Announcer and on USDT Transfer events (chunked) | dashboard, accountant, receipt page | Anon-RPC | Bulk downloads, so the RPC learns nothing per address |
| `eth_call balanceOf(payer)`, `eth_getTransactionReceipt` | widget | Anon-RPC | Hides the payer's IP |
| `POST /quote`, `POST /relay` | widget | `worker.fetch` (Tor or Nym) | Hides the payer's IP from our relayer |
| Specifier bootstrap read | harness | Direct, to a public mainnet RPC | The spec requires a pre-existing connection [S:EG Q3]; stretch 3 moves it to Whitechain |
| `eth_call` simulation, `eth_sendRawTransaction` | relayer (server) | Direct | Server-side; these are the relayer's own transactions |
| `eth_getLogs` | merchant-node (server) | Direct, or the merchant's own node | No Node harness is published [S:AR Q1] |

### 10.7 Other partner files

- **No third partner, so no FEEDBACK.md for Uniswap or any other partner.**
- **The ETHGlobal form** asks, for each selected partner, how we integrated its tools and for our feedback [S:JC Q1]. Draft both texts on Friday evening:
  - Whitechain: the contracts, the USDT flow and a pointer to `WHITECHAIN_FEEDBACK.md`;
  - EF: the CROPS section and the moment the lead property matters.
- **Repo files:** `LICENSE`, `SPEC.md`, `AI_USAGE.md`, and `docs/ai/` (prompts and spec files) [S:JC Q1 spec-driven rule].

### 10.8 Final checklist (Sat 05:00)

- [ ] The video is 2:00 to 2:59, 1080p, team voices, and shows every party.
- [ ] Explorer links for the pay, refund and payout transactions are in the README.
- [ ] Every contract is verified.
- [ ] The CROPS section has all four letters.
- [ ] The Whitechain line is present.
- [ ] `WHITECHAIN_FEEDBACK.md` and `AI_USAGE.md` are committed.
- [ ] The license file is present.
- [ ] No analytics or third-party scripts: check the network panel and grep the bundle.
- [ ] The commit history is steady (no large single commit).
- [ ] New and reused work are listed.
- [ ] The partner prizes selected are Whitechain and EF only.
- [ ] The house style is followed: no em or en dashes in our docs (`grep -cP '\x{2014}|\x{2013}'` prints 0 for each file).

---

## 11. Risks and fallbacks

| # | Risk | Likelihood and impact [J] | Early signal | Fallback |
|---|---|---|---|---|
| 1 | **No prize USDT.** There is no documented faucet and the token has 10 holders [S:WC Q6]; a payment in it is a qualification gate [S:JC Q3] | Medium likelihood, critical impact | No answer by 2 Nov | • Escalate in person at the 16:30 workshop.<br>• Even 10 USDT is enough: demo amounts are 1 to 4 USDT, and refunds recycle the funds.<br>• Develop against an anvil fork with `deal` on the real contract until the token arrives.<br>• Never substitute USDT.e: it does not count [S:WC Q6]. |
| 2 | **TetherTokenV2 differs from the EIP-3009 reference** (signature format, domain) | Low to medium, high impact | Pre-event item 3 | Fall back to EIP-2612 `permit` plus a payer-signed EIP-712 `PayIntent` checked by the Router (which then uses `transferFrom`). It is still gasless for the payer and still bound to the destination; it costs about 3 hours. |
| 3 | **Relayer down, drained or griefed** | Medium, medium | Budget alarm; 503 errors | • Daily cap and revert ban.<br>• Failover to the merchant relay, then open relaying.<br>• Test the failover in the demo itself. |
| 4 | **Stealth linkage undermines the claim** | High that a judge asks, medium impact | Q&A | • Present the weak spots ourselves (5.1).<br>• The guard enforces H1 to H3; H4 and H5 are removed by construction.<br>• The pool is the documented next step. |
| 5 | **The Whitechain RPC blocks Tor or Nym exits, or 429s rate-limit them** (50 rps per IP [S:WC Q3]) | Medium, high for the P claim | Pre-event item 5 | • Batches of up to 100 calls, Multicall3, cache.<br>• Switch to Nym.<br>• Use our own op-reth node (stretch 4) reached through Tor.<br>• Last resort: direct reads behind an explicit banner, declared as an exclusion in the README. |
| 6 | **Anon-RPC boot is slow, or the demo gateway dies** ("may disappear at any time" [S:AR Q1]) | Medium, medium | Boot takes more than 30 s | Pre-warm on mount; pre-boot tabs before judging; Nym fallback; run our own tor-js gateway. |
| 7 | **`getLogs` range limits make scans slow** | Medium, low | Pre-event item 6 | Chunking, an IndexedDB cache, starting from the deployment block; our own node. |
| 8 | **WebAuthn PRF is unsupported on the demo device or a judge's phone** | Low on our laptops, high on judges' phones | Pre-event item 7 | Use a known-good laptop profile; fall back to signing in any EIP-712 wallet (still gasless); skip the judge-phone beat. |
| 9 | **Blockscout verification fails** | Low, high (qualification) | The 00:30 check | `forge verify-contract` with standard JSON input, or manual verification of the flattened source; ask Whitechain staff. |
| 10 | **Integration slips** | Medium, high | Integration point 2 not green by 14:00 | Apply the cut list (6.1); the interfaces are frozen at 22:15 Thu. |
| 11 | **Prior-art overlap (Cloak)** | Medium, medium | Pre-event item 8 | Sharpen section 4; lead with gasless stealth spending and the accountant reveal. |
| 12 | **The CROPS criteria change** ("tbc") [S:JC Q2] | Low, medium | Re-reads on 4 and 5 Nov | Adjust the README and the video's moment beat. |
| 13 | **Sequencer outage during judging** | Low, high | Explorer stalls | Play the submission video; describe the forced-inclusion path. |
| 14 | **Venue network fails** | Medium, high | Wi-Fi test on Thu | A phone hotspot for the laptops (live demo only); the local video. |
| 15 | **A Classic-track breach** (pre-written code, or one large commit) [S:JC Q1] | Low, critical | none | Nothing project-specific before 21:00; commit every 45 minutes; disclose pre-synced node infrastructure. |

---

## 12. Likely judge Q&A

1. **"Stealth addresses get traced about 39% of the time. Why would yours hold up?"**
   The 38.92% figure comes from withdrawal habits, H1 to H5 [S:PS].
   - H5 (gas funding) and H4 (unique priority fee) are impossible in our design: stealth addresses spend through EIP-3009, so they never hold gas, and our relayer applies one fee policy to everyone.
   - Our guard refuses H1 to H3.
   - What remains: amounts, timing, consolidation at the off-ramp, and a small anonymity set. We show those weaknesses ourselves.
2. **"Your relayer sees every payment. How is that 'the server learns nothing'?"**
   - It sees only what the chain will show anyway (payer, a one-time address, the amount), plus a Tor exit IP.
   - It never sees the merchant or the invoice.
   - And it is optional: you watched us kill it.
3. **"What stops the relayer, or a bot watching the mempool, from redirecting a payment?"**
   - The EIP-3009 nonce is a hash of the stealth address, the fee, the fee recipient, the memo and a salt, so changing any of them invalidates the payer's signature.
   - `receiveWithAuthorization` requires the Router to be the caller.
   - The fee recipient is bound too, so a front-runner gains nothing.
   - The test suite contains each of these attacks.
4. **"Why not a shielded pool or eERC? They hide more."**
   - eERC hides amounts, not who pays whom [S:CP s1], and costs about 947k gas per transfer [S:CP s2].
   - A pool on a fresh testnet has an anonymity set near zero [S:CP s1] and needs a trusted setup.
   - We shipped the layer that works today. A pool fits cleanly at the contractor's off-ramp; that is next.
5. **"Whitechain has one sequencer, permissioned fault proofs and a Guardian [S:WC Q3]. Isn't CROPS lost at the base layer?"**
   - Those are chain-level trade-offs, and our C line states them.
   - Forced inclusion through L1 bounds censorship to about 12 hours.
   - We add no new chokepoint, and the same code runs on any EVM chain with an EIP-3009 token.
6. **"If only one merchant uses Chupke, isn't 'paid a Chupke address' the same as 'paid that merchant'?"**
   - Yes. The anonymity set is the set of Chupke recipients, and we say so.
   - It grows with adoption, because every merchant and contractor shares one Announcer.
7. **"How can the accountant know the export is complete?"**
   - They scan the chain themselves with the period key, and every detected payment must appear in the export.
   - The limit: a merchant could issue links to an undeclared key, like opening a second bank account. Stretch 7 commits each period's public key onchain at the start of the period.
8. **"How does the merchant know it was paid, and can it trust that?"**
   - Its own merchant-node scans the chain with its own viewing key.
   - There is no "you were paid" API from us, which is EF's P-4 [S:EG Q3].
9. **"Why does this need onchain settlement at all?"** The 10.3 line, in short:
   - no middleman who sees both sides;
   - final in about a second, cross-border;
   - verifiable refunds and books;
   - gasless stealth spending, which only an EIP-3009 token on a chain can express.
10. **"What did you build and what did you reuse? How did you use AI?"**
    - Reused: the reference ERC-5564 and ERC-6538 contracts, the Anon-RPC harness and workers, viem, noble, OpenZeppelin's SafeERC20, the Whitechain templates.
    - Built: everything else.
    - AI use is attributed per file in `AI_USAGE.md`, the Router and key logic were written and reviewed by hand, and the narration is ours.
11. **"What if a customer loses their passkey, or your domain disappears?"**
    - Shop payments use the shop's own domain, and any EIP-712 wallet also works.
    - Merchants keep an encrypted seed backup.
    - Invoice links open on any host, because nothing lives on our server.

---

## 13. AI usage and attribution plan

**Rules we follow (sourced) [S:JC Q1]:**
- **Attribution:** "Clearly document in your submission where and how AI tools were used in the project", per file.
- **Involvement:** AI must "assist your development process, not ... create the entire project", or the project may lose finalist and partner eligibility.
- **Spec-driven development:** "include all spec files, prompts, and planning artifacts in your submission repository".
- **No AI voiceover** in the video.

**Plan [J]:**

1. **Tools.** Claude Code is the primary assistant. List any others the team actually uses. Whitechain publishes `llms.txt`, `llms-full.txt` and a `whitechain-dev` Agent Skill [S:WC Q3]; if we load them, record that.
2. **Spec first.**
   - `SPEC.md` is written by the team at 21:30 Thu and drives every AI prompt.
   - Prompts and agent transcripts that produced committed code are saved under `docs/ai/` as they happen.
3. **Human-owned, written or line-reviewed by named teammates:**
   - the `ChupkeRouter` logic and nonce binding;
   - the stealth math and key derivation;
   - the hygiene guard;
   - the relayer policy;
   - the demo script, video narration and pitch.
4. **AI-assisted, human-reviewed:**
   - React components and styling;
   - test scaffolding;
   - the Echidna/Medusa fuzz suite (the `fizz` skill);
   - a security audit pass (the `solidity-auditor` skill), whose findings are triaged by A and fixed by hand;
   - README drafts, edited by the team.
   - `WHITECHAIN_FEEDBACK.md` is human-written.
5. **`AI_USAGE.md` format:** a table with columns path, tool, what the AI produced, what humans changed, reviewer. Update it at every integration point, not only at the end.
6. **Commits.** Commit messages carry no AI trailers (the user's standing rule). All attribution lives in `AI_USAGE.md` and the README.
7. **House style for AI-generated code.** No code comments; explanations go in `SPEC.md` and the README (the user's global rule).
8. **This pre-event plan.** It was drafted with an AI assistant before the event; it contains ideas and research only, no code. Disclose it in `AI_USAGE.md` and include a copy under `docs/planning/`. If unsure whether that counts as prior work, ask ETHGlobal staff at check-in [J].
