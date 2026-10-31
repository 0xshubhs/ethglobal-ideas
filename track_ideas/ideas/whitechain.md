# Whitechain: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: Whitechain's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only.

In scope (all category `building-from-scratch`): **Operate · Stablecoin Payments for Business** ($5,000: $2,500 / $1,500 / $1,000), **Tokenize · Real World Finance on Whitechain** ($4,000: $2,500 / $1,500), **Scale · Payments Nobody Notices** ($3,000: $2,000 / $1,000). Out of scope: "Continuity · Bring Your Product to Whitechain", which is Continuity only and is ignored throughout. ([Mumbai Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria, fetched 2026-10-31), `track_ideas/history/whitechain.md` (dossier), `track_ideas/ideas_draft/whitechain.md` (draft), `track_ideas/00_season.md` (season brief), `research_notes/EF tracks and Whitechain ideas/whitechain.md` (chain facts) and `plans/reviews/judge_whitechain.md` (earlier simulated review of Plan C). I did not re-fetch ETHGlobal pages, since the 31 Oct snapshot already holds them verbatim. I made six read-only JSON-RPC calls against Whitechain Sepolia to check facts two ideas depend on (section 1.2).

---

## 1. What Whitechain's judges reward

### 1.1 Sourced facts

- Mumbai is Whitechain's first ETHGlobal sponsorship: "whitechain", "whitebit" and "wb network" appear 0 times on the prize pages of 33 earlier events and showcase searches return "No projects found" (`track_ideas/history/whitechain.md` section 1; [showcase search](https://ethglobal.com/showcase?q=whitechain)).
- Whitechain describes itself as "The Onchain Economy Layer: the core for onchain business to launch, operate and scale on. An EVM Layer 2 built on the OP Stack ... At ETHGlobal Mumbai together with Optimism." ([Mumbai Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain))
- The three fresh tracks share six qualifications: contracts deployed and verified on chain ID 1874; "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count"; a README line on why the flow needs onchain stablecoin settlement; a repo with steady progress and a README covering setup, architecture and limitations; "A demo video of 2 to 4 minutes that shows each party involved"; and a `WHITECHAIN_FEEDBACK.md`. (same page)
- The "Won't place" lists exclude what won comparable tracks elsewhere: payroll (Curvegrid Payroll, ArcFlow, Manila), escrow (ETHJobs.cc), bill splitting (C.E.S.T.A Agent), remittance into a local currency (Omma Cash), a mint button with no rules, and AI chats that never pay (`track_ideas/history/whitechain.md` sections 0 and 5; for example [ArcFlow](https://ethglobal.com/showcase/arcflow-rwysr), [ETHJobs.cc](https://ethglobal.com/showcase/ethjobs-cc-gx5fm)).
- Analog winners had the sponsor's own primitive visibly in the settlement path ([CrossMeter](https://ethglobal.com/showcase/crossmeter-w9zay), [AnyAsset Checkout](https://ethglobal.com/showcase/anyasset-checkout-8h457), [Wafer](https://ethglobal.com/showcase/wafer-r4uab)), while generic checkout entries with webhooks and receipts showed no prize ([StablePay](https://ethglobal.com/showcase/stablepay-rkwy9), [MarketPay](https://ethglobal.com/showcase/marketpay-j4buj), [Reclaim](https://ethglobal.com/showcase/reclaim-jywde)). A polished subscription finalist with an npm SDK won no partner prize ([AutoPay](https://ethglobal.com/showcase/autopay-n8ot7)).
- About 18 invoice financing projects were submitted at 2026 events; the 3 that won partner prizes all won Hedera tokenization ([cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz), [Facture](https://ethglobal.com/showcase/facture-jy21t)) (`track_ideas/history/whitechain.md` section 5).
- Whitechain Sepolia facts that shape the builds: 1 s blocks; soft confirmation about 1 s, "safe" up to about 30 min, finalized about 13 min after the batch lands on L1; forced inclusion through OptimismPortal "within the sequencing window, about 12 hours" ([finality docs](https://docs.whitechain.io/learn/network/transaction-finality)). Public RPC 50 requests per second per IP, batches of up to 100 ([network reference](https://docs.whitechain.io/learn/network/reference)). The testnet WebSocket serves `newPendingTransactions` ([testnet docs](https://docs.whitechain.io/learn/network/testnet)). Faucet: 0.5 WBT per 24 h per GitHub account ([faucet docs](https://docs.whitechain.io/learn/get-started/get-testnet-wbt)). Pimlico rejects chain 1874 ([Pimlico endpoint](https://public.pimlico.io/v2/1874/rpc)) and Reown embedded wallets "Login completes, transactions may fail" ([Reown docs](https://docs.whitechain.io/build/dapps/connect-wallet-with-reown)). EntryPoints v0.6 to v0.9, Safe 1.3.0 and 1.4.1, Permit2, Multicall3 and the P256 precompile are present on Sepolia (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q4 to Q6).
- A verified UniswapV3Factory on Sepolia has a WWBT/USDT pool holding about 1,498 WWBT and 117,546 prize USDT, and a SwapRouter02 is verified ([factory](https://explorer.testnet.whitechain.io/api/v2/addresses/0x94afa2ab80e44163362d2952bdf1e95b81900738); [pool balances](https://explorer.testnet.whitechain.io/api/v2/addresses/0x5645101Ca8d2F7BaBC27b10359555767a1BdF999/token-balances)).

### 1.2 Chain facts re-checked today (own probes, 2026-10-31 about 05:20 UTC, via [rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io))

- **WWBT/USDT pool `0x5645101C...F999`**: `token0` WWBT `0x4200...0006`, `token1` prize USDT, fee 3000. `slot0` returns `observationIndex 0, observationCardinality 1, observationCardinalityNext 1`; the single observation was written at 2026-10-31 00:24:29 UTC. Implied price 79.32 USDT per WBT; active liquidity 6.73e16. **Consequence:** `observe()` over any past window reverts today, so any TWAP needs `increaseObservationCardinalityNext` called at hacking start and then time to fill. A demo that pushes this pool's spot price "10x" is impossible for the team: the faucet gives 0.5 WBT a day against about 1,498 WWBT in the pool.
- **Prize USDT implementation `0x26425662...26f7`** contains the selectors of both signature forms: `transferWithAuthorization` and `receiveWithAuthorization` with `(v, r, s)` and with `bytes signature`, plus `permit` with `(v, r, s)` and with `bytes`, and `cancelAuthorization`. It also contains `addToBlockedList(address)`; `pause()` and `paused()` are absent. **Consequence:** a `bytes` signature path exists, which may accept EIP-1271 smart-account signatures; whether it actually calls `isValidSignature` was not verified (selector presence only). The issuer can block addresses.

### 1.3 Judgement: what these judges will reward

1. **A real merchant or issuer could install it on Monday.** The nouns are merchant, webhook, receipt, refund, renewal, export, accountant, issuer, investor. The parent group runs a payment processor ([Whitepay](https://whitepay.com)), so a toy flow is spotted fast.
2. **Verifiable integration evidence in the repo.** "Adds in about 20 lines" means a separate demo app with its own `package.json` and a diff they can count. "Explorer link in your README" means they will click it, and every event in the linked transaction should be named under the link.
3. **Rules enforced by contracts, shown as reverts.** Tokenize says "Real transfer rules enforced in the contract"; Operate's "Won't place" bans a pay button that is just a transfer. A revert on camera is the cheapest proof.
4. **A relayer economics answer with numbers.** Scale's "how your relayer gets its WBT, and what stops someone from draining it" was asked by no analog sponsor. A measured bound and an onchain refill route beat prose.
5. **The prize USDT, never a stand-in,** and a feedback file written from what the team actually hit.
6. **Track hygiene.** "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize." Name the primary track in the README's first lines.
7. **OP Stack literacy is a quiet bonus.** Optimism now presents with Whitechain. Using the safe head for "settled" webhooks or the OptimismPortal forced-inclusion path shows the team read the chain's own docs.

### 1.4 Judgement: the obvious entries we assume several teams will submit

- **Operate:** a "Stripe for USDT" checkout SDK with webhooks; invoice or payment links with a due date; a subscription SDK; a QR point-of-sale page.
- **Tokenize:** invoice financing marketplace (the crowded one); fractional real estate or gold; a bond with an allowlist and coupons; an ERC-3643 clone with a KYC admin panel.
- **Scale:** an AI agent paying a paywalled API over x402 (expect the most entries here); a gasless EIP-3009 checkout with a relayer funded from the faucet; a passkey wallet demo.

Every final idea below has to beat these on at least one property a judge can check from the repo or video.

---

## 2. Rubric used (Judgement)

Whitechain publishes no numeric rubric. Each idea is scored 1 to 10 on its track's description and "What we want to see" items, plus Novelty and Feasibility. Overall is the weighted sum, rounded to one decimal. Feasibility carries the most weight because the six qualifications are pass or fail, and a missing USDT payment scores zero.

| Track | Code | Criterion (verbatim source) | Weight |
|---|---|---|---|
| Operate | D | "Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it ... a payment flow a real merchant could plug into" | 15% |
| Operate | W1 | "A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines" | 15% |
| Operate | W2 | "Both views in the demo, the merchant and the paying customer" | 10% |
| Operate | W3 | "Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use" | 15% |
| Tokenize | D | "Model real-world asset (RWA) lifecycles and compliance logic onchain ... where every payment happens in USDT" | 15% |
| Tokenize | W1 | "Real transfer rules enforced in the contract, such as allowlists, transfer restrictions, maturity or settlement conditions, not just a token with a UI on top" | 20% |
| Tokenize | W2 | "A clear issuer, investor or business user and at least one full lifecycle step in the demo, from issuance to payment or settlement" | 15% |
| Scale | D | "the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on" | 15% |
| Scale | W1 | "A payer flow with zero crypto steps visible, shown in the demo" | 20% |
| Scale | W2 | "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it" | 20% |
| All | Nov | Novelty versus past winners (task) | 20% |
| All | Fea | Feasibility in 36 hours for this team (task) | Operate 25%, Tokenize 30%, Scale 25% |

**Won't place (verbatim, applied as hard checks):**
- Operate: "A pay button that sends a plain transfer, tipping jars, bill splitters, or custodial bridges into a local currency token. Payroll, escrow and revenue splits on their own."
- Tokenize: "A token with a mint button and no rules, or ownership NFTs where nothing is enforced onchain." Boundary: "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize."
- Scale: "Flows where the payer still signs a transaction that costs them gas, or AI chats that never actually pay anyone."

**Qualification checks applied to every idea** (codes used in the checklists):
- **Q1** deploy and verify on 1874. Compile with `evm_version = "prague"` (Sepolia lacks Karst and CLZ), and dry-run Blockscout verification in hour 1.
- **Q2** a prize USDT payment in the main flow with the explorer link. Funding route: swap faucet WBT on the WWBT/USDT pool through SwapRouter02 (about 39 USDT per 0.5 WBT at today's 79.32 price). Never use USDT.e `0xaa79...8f46`.
- **Q3** the README "why onchain on Whitechain" line (each idea gives one).
- **Q4** commit every 1 to 2 hours, no squash; README with setup, architecture, limitations.
- **Q5** a 2:00 to 2:59 video showing every party (also fits EF CROPS's 3 minute cap).
- **Q6** `WHITECHAIN_FEEDBACK.md` from real friction only.
- **ETHGlobal rules:** all code written after Thu 21:00 IST; AI use attributed; spec files committed if a spec workflow is used ([details page](https://ethglobal.com/events/mumbai/info/details)). No idea depends on pre-existing project code: plans A to E in `plans/` are paper plans with no code, and none is reused as code.

---

## 3. Vetting the fifteen draft ideas

### 3.1 Operate drafts

| Draft | D | W1 | W2 | W3 | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| O1 Closebook | 8 | 8 | 8 | 8 | 5 | 8 | 7.4 | None. The posted "period root" adds ceremony, not trust: the logs are already immutable, and a judge can say "Blockscout's CSV does this". The draft ignores Whitechain's soft versus safe confirmation, which the earlier review flagged | **Revise** (drop period root; two-stage webhooks on the safe head; line-level verify) |
| O2 Mandate | 8 | 8 | 8 | 7 | 4 | 7 | 6.8 | None. Subscriptions are a listed idea, so expect several rivals; AutoPay already shipped capped, revocable pulls with an SDK. "Merchant cannot overcharge" is true of every pull contract | **Revise** (cancel without the merchant, gasless renewals, price-change consent as the hook) |
| O3 Payee Lock | 7 | 8 | 8 | 7 | 7 | 5 | 6.8 | None. One ENSv2 subname per invoice is heavy, and whether Enhanced Access Control can fence the address record (not only text records) is unknown | **Revise** (invoice subnames alias the parent's payee record) |
| O4 Duebook | 7 | 7 | 8 | 6 | 6 | 6 | 6.5 | None formal. Invoices on Arkiv are public, which conflicts with merchant confidentiality and fails CROPS "P". Reminders still need a server, so "shut down our server" is half true. Three partners' paperwork for the weakest Whitechain fit | **Drop**, replaced by Deposit Desk |
| O5 Clerk Key | 7 | 7 | 8 | 8 | 8 | 8 | 7.7 | None. Needs its own minimal checkout so refunds have receipts to bind to. A published clerk key with WBT on it can be drained of gas | **Keep** (minor: relayed clerk actions, minimal Router) |

### 3.2 Tokenize drafts

| Draft | D | W1 | W2 | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|
| T1 Coupon Clock | 8 | 9 | 8 | 5 | 7 | 7.3 | None. "Nobody presses anything" is false as drafted: a crank must be called. Proof of Human is not a proportionate credential for securities eligibility | **Revise** (default computed lazily in the transfer path; credential reasoning) |
| T2 Yield Auction | 8 | 8 | 8 | 8 | 3 | 6.5 | None formal. Deploying a CCA on 1874, writing a validation hook, and the T1 note on top is the largest build in the file; Uniswap's acceptance on an unsupported chain is unknown | **Revise** (hour-0 to 4 gate, reuse the Coupon Clock note, fallback auction) |
| T3 Assignee Pays | 8 | 9 | 9 | 6 | 8 | 8.0 | None. Lane is crowded, but the enforced leg is different from rivals' pricing pitches | **Keep** (adds financier allowlist and default path) |
| T4 Repo Desk | 8 | 9 | 8 | 8 | 5 | 7.3 | None formal. CRE writing to chain 1874 is unverified; a CRE dependency in the margin path is a single point of failure | **Revise** (signed NAV with staleness rule in the core; CRE optional) |
| T5 Clean Bill | 7 | 7 | 8 | 6 | 8 | 7.3 | Reads close to escrow with confirmations. Operate's "escrow ... on their own" is not a Tokenize rule, but a judge may carry the instinct over | **Revise** (negotiable bill of lading: title endorsed at sea, payment follows title, cargo released only on surrender) |

### 3.3 Scale drafts

| Draft | D | W1 | W2 | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|
| S1 Gas Ledger | 8 | 7 | 9 | 7 | 6 | 7.3 | None. The TWAP it relies on does not exist today (cardinality 1, section 1.2). The `cancelAuthorization` race is real because the testnet WebSocket exposes pending transactions | **Revise** (cardinality bootstrap, deviation guard folded in from S5, front-run accounting) |
| S2 No Single Relayer | 8 | 7 | 8 | 7 | 6 | 7.1 | None. Forced inclusion through L1 needs Sepolia ETH, so it cannot be the payer's path without a crypto step | **Revise** (merchant-side forced inclusion; CROPS "P" trade-off stated) |
| S3 Facilitator Under Fire | 8 | 8 | 8 | 5 | 6 | 6.9 | None. "10,000 malicious payments live" at 50 rps cannot all touch the chain; x402 is the most crowded lane | **Revise** (honest counts, offchain rejection first, nonce reservation) |
| S4 Tap and Go | 8 | 9 | 7 | 7 | 3 | 6.6 | None formal. NFC chips must arrive in Mumbai within five days; Web NFC works only in Android Chrome; the fallback (a phone as the card) loses the point | **Drop**, replaced by Metered Tab |
| S5 TWAP Paymaster | 8 | 8 | 8 | 7 | 3 | 6.6 | None formal. Needs a self-hosted bundler; the headline manipulation demo needs about 1,000 WWBT the team cannot get; Uniswap fit on a third-party v3 deployment is unknown | **Drop**, replaced by Face Pay; its TWAP deviation guard moves into Gas Ledger |

---

## 4. Operate · Stablecoin Payments for Business

### 4.1 Ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Closebook: a checkout whose books a stranger can check | 7.8 | Revise (done below) | Whitechain (Operate primary, Scale secondary with Gas Ledger) |
| 2 | Clerk Key: refunds a shop clerk can issue but cannot abuse | 7.7 | Keep | Whitechain only |
| 3 | Deposit Desk: per-order USDT addresses that exchange withdrawals can pay | 7.5 | New (replaces Duebook) | Whitechain only (Scale secondary) |
| 4 | Mandate: subscriptions the customer can cancel without the merchant | 7.2 | Revise (done below) | Whitechain (Operate, Scale if renewals are relayed) |
| 5 | Payee Lock: invoice links whose pay-to cannot be swapped | 7.0 | Revise (done below) | Whitechain + ENS "Best Use of ENSv2" |

### 4.2 Rank 1. Closebook: a checkout whose books a stranger can check

**Pitch.** A drop-in USDT checkout where each order writes an onchain receipt, refunds are capped by that receipt, the merchant's webhooks distinguish "paid" (1 s soft confirmation) from "settled" (L2 safe head), and the accountant's CSV can be re-derived from the chain line by line.

**Falsifiable promise.** "Change any number in the accountant's export and `closebook verify` names the line that no longer matches Whitechain. Try to refund more than was paid, or to anyone but the payer, and the contract reverts. Our 'settled' webhook never fires before the block is behind the safe head."

**Demo moment (20 seconds).** Split screen: the customer pays 4.00 USDT with no WBT; the merchant dashboard shows "paid" at once and "settled" a few minutes later with the safe block number. The merchant clicks "refund 1.50"; the customer's receipt flips to "Refunded 1.50 of 4.00, verified on chain". A second refund of 3.00 reverts `ExceedsRemaining`. The accountant runs verify: "142 of 142 lines match"; a judge edits one cell and verify fails on line 37 with the transaction hash.

**How it works.**
- `CheckoutRouter.pay(order, auth)` calls the prize USDT's `receiveWithAuthorization` with the Router as `to`, forwards the funds to the merchant treasury in the same call, stores `Receipt{payer, merchant, amount, refunded}` and emits `OrderPaid(merchant, orderIdHash, payer, amount)`. The Router holds nothing between calls.
- `refund(orderIdHash, amount)` pulls from the treasury (allowance or a Safe module) to the recorded payer only, with `refunded + amount <= amount paid`.
- A thin relayer submits payments so the customer never holds WBT (Gas Ledger, section 6.2, is the hardened version).
- Webhooks: HMAC-signed, idempotency key `orderIdHash:stage`, retries with backoff; stage `paid` at inclusion, stage `settled` when `eth_getBlockByNumber("safe")` passes the payment block ([finality docs](https://docs.whitechain.io/learn/network/transaction-finality)).
- Export: one line per payment or refund with tx hash and log index. `closebook verify` refetches each log with batched RPC (under 50 rps) and diffs. No period root.
- Foundry invariants and a Medusa campaign: refunds never exceed paid; only the recorded payer receives refunds; the Router's USDT balance is zero after every call.

```solidity
interface ICheckoutRouter {
    function pay(Order calldata order, bytes calldata auth) external returns (bytes32 orderIdHash);
    function refund(bytes32 orderIdHash, uint256 amount) external;
    function receipt(bytes32 orderIdHash) external view returns (address payer, address merchant, uint256 paid, uint256 refunded);
}
```

**Requirement checklist.**
- [x] Q1 Router deployed and verified on 1874.
- [x] Q2 the customer's `pay` transaction in prize USDT, linked in the README with each event named under the link.
- [x] Q3 line: "A receipt that refunds and the accountant can both check against public settlement, with a refund cap the customer can verify; a card processor's refund and settlement records live only inside the processor."
- [x] Q4, Q5 (customer, merchant, accountant on screen), Q6.
- [x] W1 `examples/shop` with its own `package.json` adds `<CloseCheckout orderId amount onPaid />` and `verifyWebhook()`; show `git diff --stat`.
- [x] W2 split screen; W3 refund, partial refund and verifiable export.
- [x] Won't place: not a plain transfer (Router with receipt); no tipping, splitting, bridge, payroll, escrow or revenue split.

**Why it beats rivals (Judgement).** The obvious "Stripe for USDT" entry has a checkout, a webhook and maybe a refund button. Closebook matches it and then answers three questions those entries skip: when is a payment final on an OP Stack chain, can a refund be abused, and can the books be checked without trusting the merchant's database.

**Closest prior winners.** [CrossMeter](https://ethglobal.com/showcase/crossmeter-w9zay) (Circle 2nd, billing in a few lines); [Swap Pay](https://ethglobal.com/showcase/swap-pay-4hpe9) (PYUSD Grand Prize, checkout SDK). No-prize lookalikes: [StablePay](https://ethglobal.com/showcase/stablepay-rkwy9), [PayR](https://ethglobal.com/showcase/payr-au332), [Reclaim](https://ethglobal.com/showcase/reclaim-jywde).

**Stack.** Whitechain Operate (primary). With Gas Ledger as its relayer, enter Scale in the same partner slot. No other partner needed; see section 7 for an EF CROPS variant.

**Difficulty.** Medium-low. The safe-head watcher and the verify CLI are half a day each.

**Scores.**

| D | W1 | W2 | W3 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 9 | 6 | 8 | **7.8** |

**Judge notes (Judgement).**
- Whitechain judge: "The paid versus settled split is the first time a hackathon team has told me what final means on our chain. Put it in the README's first screen."
- Veteran: "Novelty is the weak spot. Lead with the judge-edits-a-cell beat, not with 'checkout SDK'. Keep the refund cap fuzz suite visible with its call count."

### 4.3 Rank 2. Clerk Key: refunds a shop clerk can issue but cannot abuse

**Pitch.** The merchant's treasury is a Safe on Whitechain Sepolia. A Safe module gives clerk keys exactly one power: refund an order, only to the address that paid it, only up to its unrefunded balance, under a daily cap per clerk. Larger refunds queue for the owner.

**Falsifiable promise.** "We put the clerk's private key on screen. Anyone can refund customers with it; nobody can move a cent anywhere else."

**Demo moment (20 seconds).** A volunteer scans the clerk key QR and tries to send USDT to themselves: revert `NotOriginalPayer`. They refund the same order twice: revert `ExceedsPaid`. A third refund over the daily cap shows "queued for owner". The customer's receipt shows the one legitimate refund.

**How it works.**
- A minimal `CheckoutRouter` (shared with Closebook) records receipts.
- `RefundModule.refund(orderIdHash, amount, clerkSig)` checks the receipt, the remaining balance and the clerk's daily cap, then calls `execTransactionFromModule(USDT, transfer(payer, amount))`.
- Clerk actions are EIP-712 signatures relayed by the merchant's relayer, so the published key holds no WBT and cannot be drained of gas.
- Owner can add, cap or revoke clerks; over-cap requests become owner-approval items.
- Invariants: the module can transfer only USDT, only to recorded payers; per-order refunds never exceed paid; per-clerk daily total never exceeds the cap.

**Requirement checklist.**
- [x] Q1 Router and module verified; Safe 1.4.1 singleton already on 1874 (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q6).
- [x] Q2 the customer's payment and the refund, both prize USDT.
- [x] Q3 line: "Refund authority bounded by settlement records and enforced where the money sits; a point-of-sale refund key can usually refund to any card."
- [x] Q4 to Q6; Q5 shows customer, clerk, owner.
- [x] W1 `enableClerkRefunds(safe, { dailyCap })` plus `<RefundButton order />` in the demo shop; W2 clerk console beside the customer receipt; W3 refunds.
- [x] Won't place: not escrow, not payroll; payment goes through the Router.
- [ ] Risk: Safe UI support for `wch-sepolia:` is unverified; script the Safe setup with the Safe SDK so the demo does not depend on it.

**Why it beats rivals (Judgement).** Rivals add a refund button that the merchant's hot key signs. In the week of the Binance hot-wallet drain and CoinDCX's lost USDT (`track_ideas/00_season.md` sections 1.1 and 1.12), a refund key that is safe to leak is the merchant control a payment processor's product team will remember.

**Closest prior winners.** [Taparoo](https://ethglobal.com/showcase/taparoo-qmfc0) (Circle, spend rules and kill switch); [Unwind](https://ethglobal.com/showcase/unwind-pqp3a) (refund infrastructure, Cannes 2026); [watermark](https://ethglobal.com/showcase/watermark-68230) (Tokyo 2026 finalist, the account refuses beyond a cap).

**Stack.** Whitechain Operate only. Best shipped inside Closebook as its refund authority.

**Difficulty.** Low-medium.

**Scores.**

| D | W1 | W2 | W3 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 7 | 8 | 8 | 8 | 8 | **7.7** |

**Judge notes (Judgement).**
- Whitechain judge: "On its own it is a refund feature, not 'everything a business needs'. Inside a checkout it is the reason we would pick that checkout."
- Veteran: "Best live beat in the Operate list. Never publish a key that holds WBT or USDT; relay its signatures."

### 4.4 Rank 3. Deposit Desk: per-order USDT addresses that exchange withdrawals can pay (new)

**Pitch.** Most people holding USDT for Whitechain will hold it on an exchange, and an exchange withdrawal can only send to an address; it cannot call a checkout contract. Deposit Desk gives each order its own counterfactual address. The customer pays from any wallet or exchange withdrawal; a sweeper contract deployed on first use moves the funds to the merchant and pays the relayer's gas in USDT, so neither the merchant nor the deposit address ever needs WBT.

**Falsifiable promise.** "Pay this order from any wallet that can send USDT on Whitechain. The order is matched without amount guessing, the merchant never tops up an address with gas, an underpayment can be completed to the same address, and an overpayment is refunded only to an address the customer confirms, never back to an exchange hot wallet."

**Demo moment (20 seconds).** The customer scans a QR from the shop and sends 25 USDT from a plain wallet's "Send" screen (standing in for an exchange withdrawal). The merchant dashboard flips to "paid"; the relayer sweeps it in one transaction that shows `Swept(order, 24.99, fee 0.01)`. A second order is underpaid by 5: its page says "5.00 USDT still due to the same address", the customer tops up, and it completes. A third is overpaid: the customer confirms a refund address on the receipt page and the excess goes there.

**How it works.**
- `DepositFactory.addressOf(merchant, orderId)` is a CREATE2 address of a minimal `Sweeper` clone. `sweep(merchant, orderId)` deploys it and moves the balance in one call: fee to the relayer (bounded by the merchant's per-sweep fee cap), the rest to the treasury.
- A watcher subscribes to USDT `Transfer` logs over the WebSocket for open order addresses ([testnet docs](https://docs.whitechain.io/learn/network/testnet)).
- Order state machine: Open, Underpaid, Paid, Overpaid, Expired, Late. Late payments still sweep to the merchant and are flagged for a refund.
- Refunds of excess go only to a customer-confirmed address: the `from` of an exchange withdrawal is the exchange's hot wallet, and refunding there loses the money.
- Webhooks and export reuse Closebook's format.

**Requirement checklist.**
- [x] Q1 factory and sweeper verified.
- [x] Q2 the deposit and the sweep, both prize USDT.
- [x] Q3 line: "A customer can pay from an exchange withdrawal with no wallet app, and each order reconciles to its own address without the merchant ever funding addresses with gas; a bank virtual account settles in days and a card has no push-to-address."
- [x] Q4 to Q6; Q5 shows customer, merchant, relayer.
- [x] W1 `createDepositIntent({ orderId, amount })` returns address, QR and status URL; `<DepositQR intent />` in the demo shop. W2 both views. W3 underpayment completion, overpayment refund, export.
- [ ] **Won't place, at risk:** the customer's own step is a plain transfer. Defence: the product is the deposit-address system, sweep, state machine and refunds, not a pay button. Put this sentence in the README's first paragraph and ask at the workshop (question 4 in section 9).

**Why it beats rivals (Judgement).** Every rival checkout assumes the customer has a browser wallet that can sign. This is the only entry in the file built for the customer Whitechain's own exchange ecosystem produces, and it is how payment processors already run deposit addresses, minus the gas top-ups.

**Closest prior winners.** [Fluvia](https://ethglobal.com/showcase/fluvia-4wkgv) (Circle, a same-address deposit contract that routes customer payments); [AnyAsset Checkout](https://ethglobal.com/showcase/anyasset-checkout-8h457) (Arc 2nd, checkout links); [CronPay](https://ethglobal.com/showcase/cronpay-ko3p4) (ETHOnline 2025 finalist, merchant gateway, Avail prize).

**Stack.** Whitechain Operate (primary); the sweep's gas economics also answer Scale's W2, so Scale is a secondary entry in the same slot. No other partner.

**Difficulty.** Medium-low.

**Scores.**

| D | W1 | W2 | W3 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 7 | 8 | 8 | 7 | 8 | **7.5** |

**Judge notes (Judgement).**
- Whitechain judge: "This is how our own processor thinks. My only worry is the plain transfer line; tell me in the README why this is not that."
- Veteran: "D is scored 7, not 9, purely for the Won't place reading. If the workshop answer is yes, this moves to rank 1."

### 4.5 Rank 4. Mandate: subscriptions the customer can cancel without the merchant

**Pitch.** Recurring USDT billing where the customer signs one mandate (ceiling, interval, number of periods, merchant), renewals are relayed so the customer never holds WBT, a price increase needs a new signature, and cancellation works from any client, even if the merchant's site is down.

**Falsifiable promise.** "The merchant's admin key cannot pull more, sooner, or after cancellation than the customer signed. Take our site offline: the customer can still cancel from a static page, and the next pull reverts."

**Demo moment (20 seconds).** The merchant presses "charge now" twice in one period: the second reverts `IntervalNotElapsed`. The merchant raises the price: the renewal is blocked until the customer re-signs. The team stops the merchant server; the customer cancels from a static page on IPFS-style hosting; the next pull reverts `Cancelled`, and a prorated refund lands.

**How it works.**
- The customer signs a USDT `permit` to `MandateManager` for ceiling times periods; the merchant's relayer submits it.
- `charge(mandateId)` enforces interval, ceiling, period count and current signed price; a failed pull emits `ChargeFailed` and enters a grace window, then auto-pauses (dunning).
- `cancel` accepts the customer's direct call or a relayed EIP-712 cancel; `cancelWithProration` refunds the unused share.
- Medusa and Foundry invariants on total pulled, interval spacing and post-cancel pulls.

**Requirement checklist.**
- [x] Q1; Q2 the first renewal pull in prize USDT; Q3 line: "A customer-signed ceiling and a cancel that does not depend on the merchant, both enforced by settlement; card-on-file gives the merchant open-ended pull rights."
- [x] Q4 to Q6; Q5 shows customer and merchant.
- [x] W1 `<SubscribeButton plan="pro-monthly" />` plus `verifyWebhook()`; W2; W3 renewal and proration refund.
- [x] Won't place: pulls go through the mandate contract; not escrow or payroll.

**Why it beats rivals (Judgement).** Several teams will ship "subscriptions with permit". The differentiator a judge can test is the cancel that works with the merchant offline, plus the price-change consent rule.

**Closest prior winners.** [AutoPay](https://ethglobal.com/showcase/autopay-n8ot7) (HackMoney 2026 finalist, no partner prize); no-prize lookalikes [ARCA](https://ethglobal.com/showcase/arca-kw3zh), [FlexSub SDK](https://ethglobal.com/showcase/flexsub-sdk-athv9), [onchain-subscription](https://ethglobal.com/showcase/onchain-subscription-fe4zq).

**Stack.** Whitechain Operate; Scale secondary if renewals are relayed and shown with zero crypto steps.

**Difficulty.** Medium.

**Scores.**

| D | W1 | W2 | W3 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 5 | 7 | **7.2** |

**Judge notes (Judgement).**
- Whitechain judge: "Exactly our third listed idea, so you will be compared side by side with others. Make the cancel-offline beat the first thing in the video."
- Veteran: "Two monthly cycles in a 2:30 video means 1 minute periods on testnet. Say so on screen."

### 4.6 Rank 5. Payee Lock: invoice links whose pay-to cannot be swapped (stacks with ENS)

**Pitch.** Payment links and invoices for remote studios billing global clients. A studio's ENSv2 name holds its Whitechain pay-to address (ENSIP-11 coin type for chain 1874) in a Permissioned Resolver. Each invoice is an expiring subname, `inv-1042.studio.eth`, that aliases the parent's payee record instead of carrying its own. The billing bot's Enhanced Access Control role can create invoice subnames and write their `status` text, never the address. A changed payee triggers a warning on every open invoice for a cooling window.

**Falsifiable promise.** "Steal the billing bot's key: you can mark invoices paid, but you cannot change where a client's money goes. If the owner changes it, every open invoice warns the payer for 48 hours."

**Demo moment (20 seconds).** The bot key calls `setAddr` on the studio name: ENSv2 reverts. The owner changes the address; the client's pay page shows "payee changed 3 hours ago, confirm with the studio". The client confirms and pays; the receipt lands and an overdue reminder fires for another invoice whose subname is near expiry.

**How it works.**
- ENSv2 on Sepolia (allowed by the ENS track): studio name with a Permissioned Resolver; invoice subnames from the studio's own registry with expiry at due date plus grace; record aliasing to the parent's address record.
- Widget reads ENS on Sepolia, checks resolver events for recent payee changes, then pays through `InvoiceRouter` on Whitechain with the invoice namehash in the event.
- Reminders from a small server keyed on subname expiry; export reuses Closebook's format.

**Requirement checklist.**
- [x] Whitechain Q1 to Q6; Q3 line: "The client pays a named, expiring invoice and settles in USDT in seconds; a wire's beneficiary details can be swapped in an email with nothing to warn the payer."
- [x] W1 `<PayInvoice name="inv-1042.studio.eth" />`; W2 studio dashboard and client page; W3 reminders, overdue state, export.
- [x] Won't place: Router with invoice reference, no escrow.
- [x] ENS: built on ENSv2 on Sepolia; ENSv2 roles, registries, expiry and aliasing carry the fraud control (central); no hard-coded values; live demo link; open source ([Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)).
- [ ] Risk: whether Enhanced Access Control can scope the address record and whether record aliasing works on Sepolia this week (question E1).

**Why it beats rivals (Judgement).** Rival invoice links are a URL with an amount. This one prevents the most common invoice fraud (a swapped payee), and it is the only Operate idea that earns a second partner prize with ENSv2 genuinely central.

**Closest prior winners.** [AnyAsset Checkout](https://ethglobal.com/showcase/anyasset-checkout-8h457) (ENS-branded checkout links); [PDFi +](https://ethglobal.com/showcase/pdfi-ar8v8) (pays only to the vault its ENS name publishes); [Seikyu](https://ethglobal.com/showcase/seikyu-dyqh3) (expiring ENSv2 invoice names, financing); [namegate](https://ethglobal.com/showcase/namegate-63d0m) (ENSv2 roles as KYC).

**Stack.** Whitechain Operate + ENS "Best Use of ENSv2" ($7,000: $3,000 / $2,000 / $1,000 / $1,000).

**Difficulty.** Medium-high (ENSv2 is days old on mainnet; two chains in one flow).

**Scores.**

| D | W1 | W2 | W3 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 8 | 8 | 7 | 8 | 5 | **7.0** |

**Judge notes (Judgement).**
- Whitechain judge: "Good invoice coverage, but ENS does the clever part. Make sure the Whitechain side has its own receipt and export."
- Veteran: "Highest expected value per hour if the team wants a second sponsor; lowest feasibility in Operate. Gate ENSv2 Sepolia calls in hours 0 to 3."

---

## 5. Tokenize · Real World Finance on Whitechain

### 5.1 Ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Assignee Pays: a receivable whose payment follows its owner | 8.0 | Keep (small additions below) | Whitechain only |
| 2 | Repo Desk: overnight repo with delivery against payment and automatic close-out | 7.9 | Revise (done below) | Whitechain (+ Chainlink "Best workflow with CRE" optional) |
| 3 | Coupon Clock: a note that defaults by itself, without a keeper | 7.6 | Revise (done below) | Whitechain (+ World "Best Use of IDKit" optional) |
| 4 | Clean Bill: a negotiable bill of lading where payment follows title | 7.5 | Revise (done below) | Whitechain only |
| 5 | Yield Auction: a clearing auction sets the note's interest rate | 6.8 | Revise (done below) | Whitechain + Uniswap "Build with Uniswap" (+ World IDKit optional) |

### 5.2 Rank 1. Assignee Pays: a receivable whose payment follows its owner

**Pitch.** Invoice financing where a supplier can tokenize an invoice only after the debtor acknowledges it onchain, an allowlisted financier buys it at a discount with delivery against USDT, and on the due date the debtor's payment is routed by the contract to whoever holds the receivable, never to the supplier.

**Falsifiable promise.** "After the sale, the supplier cannot be paid on this invoice even if the debtor tries: the money reaches whoever owns the receivable, and the same invoice cannot be financed twice."

**Demo moment (20 seconds).** Three panes: supplier, debtor, financier. The supplier tries to tokenize the same invoice again: revert `AlreadyAcknowledged`. A non-allowlisted wallet tries to buy: revert `NotEligibleFinancier`. The debtor pays 1,000 USDT on the due date and the explorer shows it landing at the financier, who bought at 980.

**How it works.**
- `Receivable` (ERC-721): minted only with the debtor's EIP-712 acknowledgement over invoice hash, amount and due date, from the debtor's registered key; `(debtor, invoiceHash)` can be acknowledged once.
- Transfers only between allowlisted financiers (the compliance rule) and only through `sell(id, price)`, which swaps the receivable and USDT atomically. Secondary sales before maturity are allowed among financiers; payment follows the token.
- `pay(id)` by the debtor sends USDT to `ownerOf(id)` and burns the token. Past due plus grace, state is Overdue with penalty accrual; after a longer window, Defaulted, and the holder can claim the supplier's posted first-loss reserve if one was set.
- Modelled (as a judgement) on buyer-accepted receivables platforms such as India's TReDS, which a Mumbai room will recognise.

**Requirement checklist.**
- [x] Q1; Q2 the financier's purchase and the debtor's payment, both prize USDT; Q3 line: "Assignment, discounting and repayment routing are one enforced state; offline factoring relies on notices of assignment and on the supplier forwarding the money."
- [x] Q4 to Q6; Q5 shows supplier, debtor, financier.
- [x] W1 acknowledgement gate, single financing, financier allowlist, holder routing, overdue and default states in the contract. W2 issuance, sale and settlement in the demo.
- [x] Won't place: rules everywhere, ownership enforced onchain. Boundary: financing, so Tokenize (name it as primary).
- [ ] Honest limit: a colluding supplier and debtor can acknowledge a fake invoice. State it.

**Why it beats rivals (Judgement).** The invoice crowd competes on pricing or AI underwriting. This one enforces the two legs factoring actually breaks on, double financing and payment reaching the wrong party, each shown in one revert, and it maps word for word to Whitechain's listed idea. Several invoice entries will arrive; the winner is the one whose contract enforces the most.

**Closest prior winners.** Hedera tokenization winners [cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz), [Facture](https://ethglobal.com/showcase/facture-jy21t). No-prize lookalikes: [CreditMesh](https://ethglobal.com/showcase/creditmesh-cs51c), [Sowee](https://ethglobal.com/showcase/sowee-wux84), [Forfait](https://ethglobal.com/showcase/forfait-eam6y), [sugarc](https://ethglobal.com/showcase/sugarc-vcvhv).

**Stack.** Whitechain Tokenize only. The debtor's pay link uses Closebook's Router, but enter Tokenize, not Operate, per the boundary rule.

**Difficulty.** Medium.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 9 | 9 | 6 | 8 | **8.0** |

**Judge notes (Judgement).**
- Whitechain judge: "The first line of the README must be the enforcement claim, not 'invoice financing'. We will read ten READMEs that start with 'invoice financing'."
- Veteran: "Cheapest strong Tokenize build. Spend the saved hours on the three-pane video and the invariant suite."

### 5.3 Rank 2. Repo Desk: overnight repo with delivery against payment and automatic close-out

**Pitch.** Tokenized money-market fund shares serve as repo collateral against USDT. The opening leg swaps collateral and cash in one transaction, a margin check runs against a signed NAV with a haircut, a shortfall opens a margin-call window, a missed call hands the collateral to the lender without anyone's approval, and the repurchase leg is atomic.

**Falsifiable promise.** "Both legs move in one transaction or neither does. If the borrower misses a margin call, the lender owns the collateral without asking anyone. A stale NAV freezes new repos instead of being trusted."

**Demo moment (20 seconds).** The explorer shows one transaction with both transfers. The fund administrator posts a 4% NAV drop; the margin call's countdown starts. The borrower does nothing; the countdown expires and close-out leaves the collateral in the lender's wallet. On a second repo, the borrower repurchases at maturity and both legs reverse in one transaction.

**How it works.**
- `wMMF`: team-issued, allowlisted share token; transfers only between allowlisted repo parties and the `RepoDesk` contract. It is the asset, not a payment, so it does not fall under "Payments in a test token you minted yourself"; every payment is prize USDT.
- NAV: an EIP-712 report signed by a fund administrator key, with a staleness limit (10 minutes on testnet); a stale NAV blocks new repos and margin releases but never blocks repurchase.
- Lifecycle: Open (DvP), Margin Call (deadline), Cured, Closed Out, Repurchased.
- Chainlink option: a CRE workflow fetches NAV from a mock administrator API and produces the signed report in a CLI simulation; the team relays it to 1874 if CRE cannot write there (question C1).
- Invariants: collateral leaves the contract only to the borrower on repurchase or to the lender on close-out; cash and collateral legs are atomic.

**Requirement checklist.**
- [x] Q1; Q2 the opening cash leg and the repurchase, both prize USDT; Q3 line: "Atomic two-leg settlement and rule-based close-out at 1 second blocks; tri-party repo relies on an agent and end-of-day batches."
- [x] Q4 to Q6; Q5 shows borrower, lender, fund administrator.
- [x] W1 allowlist, maturity, margin and close-out conditions in the contract. W2 open, margin call, close-out in the demo.
- [x] Won't place: rules everywhere.
- [x] CRE (if stacked): integrates an external API with a blockchain, CLI simulation shown, NAV meaningfully used ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)).

**Why it beats rivals (Judgement).** Repo is a Whitechain-named instrument with almost no ETHGlobal fresh-build precedent, and a tested margin and close-out machine is this team's home ground (liquidations).

**Closest prior winners.** [Thurman Protocol](https://ethglobal.com/showcase/thurman-protocol-q8iiy) (Arc Continuity 1st, DvP loan sales); [Rialto](https://ethglobal.com/showcase/rialto-psod2) (Hedera, oracle-free lending against tokenized securities); [Wafer](https://ethglobal.com/showcase/wafer-r4uab) (Hedera, NAV writedown on default).

**Stack.** Whitechain Tokenize; Chainlink "Best workflow with CRE" ($1,500) as an optional second partner.

**Difficulty.** Medium-high (lifecycle states and the margin math); CRE adds half a day.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 7 | **7.9** |

**Judge notes (Judgement).**
- Whitechain judge: "Real finance, and it is our listed idea. Explain repo in one sentence for judges who are payments people."
- Veteran: "Never let CRE sit on the critical path. The signed NAV with a staleness rule is the core; CRE is an add-on."

### 5.4 Rank 3. Coupon Clock: a note that defaults by itself, without a keeper

**Pitch.** A tokenized 90-day SME note with an investor allowlist enforced in the token's `_update`, coupons in USDT pulled by holders, and a default state that is a pure function of time and coupon funding, so a missed coupon freezes transfers the moment the deadline passes, with no keeper.

**Falsifiable promise.** "Miss a coupon by one second and no one has to call anything: the next transfer of the note reverts, and every holder can claim their share of the collateral."

**Demo moment (20 seconds).** The issuer leaves coupon 2 unfunded. The countdown passes; an investor's transfer reverts `NoteInDefault` with no transaction in between. The same investor claims 1,000.00 USDT of collateral in one click. A non-allowlisted wallet's purchase reverts.

**How it works.**
- `status()` view: Defaulted if `now > couponDue[i] + grace` and coupon `i` is unfunded; Matured after principal repayment. `_update` checks `status()` and the eligibility registry on every transfer.
- Coupons: the issuer funds each coupon in USDT; holders claim with a per-share accumulator so transfers do not lose accrued coupons.
- Default: holders claim pro rata from posted USDT collateral.
- Credential (if World is stacked): the issuer's eligibility check uses the World Passport/NFC credential, for example to admit only holders whose passport meets an offering restriction, if that attribute is available; Proof of Human alone is not proportionate for securities eligibility (question Y1). Without World, an issuer KYC role writes the registry.
- 5-minute coupon intervals on testnet, stated on screen.

**Requirement checklist.**
- [x] Q1; Q2 the purchase, a coupon and the collateral claim, all prize USDT; Q3 line: "Coupons, default and collateral claims follow from settlement state the instant a deadline passes; a paper note needs a trustee, a court and weeks."
- [x] Q4 to Q6; Q5 shows issuer and two investors.
- [x] W1 allowlist, transfer freeze, maturity and default in the contract; W2 issuance, coupon, default or repayment.
- [x] Won't place: rules everywhere.
- [x] World IDKit (if stacked): server-side verification writing the registry; the minimum-sufficient paragraph; an ineligible investor's rejection as the alternative path; integration debrief ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- [ ] Honest limit: the registry trusts the server that verified the proof.

**Why it beats rivals (Judgement).** A bond with an allowlist and coupons is the obvious Tokenize entry. The lazy default (no keeper, no admin, frozen on the deadline) is the one property a judge can test that the obvious entry will not have.

**Closest prior winners.** [namegate](https://ethglobal.com/showcase/namegate-63d0m) (tokenized bond, ENSv2 as KYC); [Wafer](https://ethglobal.com/showcase/wafer-r4uab) (KYC-gated fund, default writedown); [Aura](https://ethglobal.com/showcase/aura-yragg) (bond-like notes, Taipei).

**Stack.** Whitechain Tokenize; World "Best Use of IDKit" ($2,500, 2 x $1,250) optional.

**Difficulty.** Medium.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 9 | 8 | 5 | 8 | **7.6** |

**Judge notes (Judgement).**
- Whitechain judge: "Our first listed idea, so we will see several. The no-keeper default is what we will remember."
- Veteran: "Only add World if the credential argument survives the World workshop. A weak 'minimum sufficient' paragraph loses that prize anyway."

### 5.5 Rank 4. Clean Bill: a negotiable bill of lading where payment follows title

**Pitch.** An electronic bill of lading issued by a carrier role, transferable only by endorsement through the settlement contract, where every endorsement is title against USDT in one transaction, and the carrier can release cargo only to the holder who surrenders it.

**Falsifiable promise.** "The cargo can be released only to whoever holds the bill, every change of hands is paid in the same transaction, and no single party, including us, can release title or cash early."

**Demo moment (20 seconds).** The carrier issues the bill at loading. The exporter's bank buys it at a discount (title for 24,500 USDT). While the ship is "at sea", the importer buys it from the bank for 25,000 USDT after the inspector's certificate hash is confirmed; an early attempt reverts `PendingConfirmations(inspector)`. At port, the carrier's release to anyone but the holder reverts; the holder surrenders and the bill burns.

**How it works.**
- `BillOfLading` (ERC-721), mint by carrier role; transfers only via `endorse(id, to, price)` with DvP in USDT; allowlisted parties only.
- Conditions per endorsement (inspection certificate, insurance hash) signed by named roles; deadline expiry returns the bill to its holder.
- `release(id)` by carrier requires surrender by `ownerOf(id)`.

**Requirement checklist.**
- [x] Q1; Q2 two endorsements in prize USDT; Q3 line: "Title and payment swap atomically on confirmations every party can see; documentary trade runs on couriered paper and bank cut-offs."
- [x] Q4 to Q6; Q5 shows carrier, exporter, bank, importer, inspector.
- [x] W1 transfer restriction and settlement conditions in the contract; W2 issuance, sale and settlement.
- [x] Won't place: ownership enforced onchain (the opposite of "ownership NFTs where nothing is enforced").

**Why it beats rivals (Judgement).** Trade finance is a listed idea with no identifiable ETHGlobal winner in this shape. Negotiability at sea is what makes a bill of lading a real asset, and it keeps the build from reading as escrow.

**Closest prior winners.** [Thurman Protocol](https://ethglobal.com/showcase/thurman-protocol-q8iiy) (DvP pattern); HashKey-lane winners such as [KYCGuard](https://ethglobal.com/showcase/kycguard-xi02i) (Taipei, organisation inferred as HashKey).

**Stack.** Whitechain Tokenize only.

**Difficulty.** Medium.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 8 | 8 | 7 | 7 | **7.5** |

**Judge notes (Judgement).**
- Whitechain judge: "Five parties in a 2:30 video is a lot. Keep the bank and importer endorsement as the hero beat."
- Veteran: "Lower demo energy than Repo Desk. Lead with the early-release revert."

### 5.6 Rank 5. Yield Auction: a clearing auction sets the note's interest rate

**Pitch.** Primary issuance of the Coupon Clock note through Uniswap's Continuous Clearing Auction deployed on Whitechain Sepolia, bids in prize USDT, a validation hook that admits only allowlisted investors, and the clearing price setting the yield.

**Falsifiable promise.** "Nobody sets the interest rate; the auction does. A wallet that is not on the allowlist cannot place a bid at all."

**Demo moment (20 seconds).** Three investors bid over 5 minutes and the clearing curve moves. A non-allowlisted bid reverts inside the hook. The auction clears at an implied 11.8% yield; notes and USDT settle; the note then pays its first coupon.

**How it works.**
- Hours 0 to 4 gate: deploy the open-source CCA contracts on 1874 and place one bid in prize USDT through a validation hook. If the gate fails, fall back to a simple uniform-price auction and drop the Uniswap pick.
- After the auction, the note is exactly Coupon Clock (5.4).

**Requirement checklist.**
- [x] Whitechain Q1 to Q6; Q3 line: "Price discovery and delivery against payment in one onchain settlement; a private placement fixes the rate by negotiation and settles days later."
- [x] W1 allowlist in the hook and the token; W2 issuer, investors, clearing step.
- [x] Uniswap: public repo, `FEEDBACK.md`, the feedback form, README pointing to contracts and lines ([Mumbai Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- [ ] Risk: whether Uniswap counts a team-deployed CCA on an unsupported chain (question U1); whether CCA's validation hook works as assumed.

**Why it beats rivals (Judgement).** The most "real capital markets" issuance in the room, with the largest second prize available to a Tokenize idea.

**Closest prior winners.** [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, Uniswap 1st, CCA with verified bidders); [Tegata](https://ethglobal.com/showcase/tegata-ydmgu) (invoices on Uniswap v4, no prize shown).

**Stack.** Whitechain Tokenize + Uniswap "Build with Uniswap" ($10,000, four places), World IDKit optional (all three slots).

**Difficulty.** High.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 4 | **6.8** |

**Judge notes (Judgement).**
- Whitechain judge: "Impressive if it works, but our judges care that the note has rules, not how the price was found."
- Veteran: "Build Coupon Clock first. Add the CCA only if the gate passes by Friday 01:00."

---

## 6. Scale · Payments Nobody Notices

### 6.1 Ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Gas Ledger: a relayer with a drain bound per merchant that refills from Whitechain's own pool | 8.0 | Revise (done below) | Whitechain (Scale primary, Operate with Closebook) |
| 2 | Face Pay: Face ID pays USDT through the token's own authorization, no bundler | 7.7 | New (replaces TWAP Paymaster) | Whitechain only |
| 3 | Facilitator Under Fire: an x402 facilitator with a published abuse suite | 7.6 | Revise (done below) | Whitechain only |
| 4 | Metered Tab: agents pay per request, the business pays gas once per hundreds of calls | 7.4 | New (replaces Tap and Go) | Whitechain only |
| 5 | No Single Relayer: a gasless checkout that survives its relayer | 7.1 | Revise (done below) | Whitechain + EF "Best CROPS App" |

### 6.2 Rank 1. Gas Ledger: a relayer with a drain bound per merchant that refills from Whitechain's own pool

**Pitch.** A gasless EIP-3009 checkout where each merchant prepays a USDT gas budget, every relayed payment reimburses the relayer in USDT from that merchant's budget in the same transaction at a manipulation-guarded pool price, a keeper refills the relayer's WBT by swapping on the WWBT/USDT pool, and the relayer stops serving a merchant whose measured losses reach a printed bound.

**Falsifiable promise.** "Here is our relayer's address and a script that tries to drain it. Run it: the WBT lost stops at the bound printed on screen for that merchant, every other merchant keeps working, and the refill is an onchain swap you can click."

**Demo moment (20 seconds).** The attack script runs: front-run `cancelAuthorization` races (possible because the testnet WebSocket exposes pending transactions), bad signatures, dust spam. Merchant A's loss meter hits its cap and turns grey; Merchant B's customer still pays with no WBT. The refill transaction swaps 12 USDT into WWBT on the explorer.

**How it works.**
- `GasRelay.relayPay(merchant, auth, sig)`: calls `receiveWithAuthorization`, forwards to the merchant, and pays the relayer `min(gasUsed * basefee * price * markup, merchantFeeCap)` from the merchant's `GasVault` balance.
- Price: the pool's TWAP from `observe()` after the team calls `increaseObservationCardinalityNext` at hacking start (today cardinality is 1, section 1.2); if spot deviates from TWAP beyond a band, the contract uses the price less favourable to the relayer. This is the useful half of the dropped TWAP Paymaster.
- Relayer: simulates every payment with `eth_call` before sending; reverted sends are charged to that merchant's offchain loss ledger; per-merchant daily loss bound; payers with repeated failed authorizations are throttled.
- Refill keeper: when WBT is below a threshold, `exactInputSingle` USDT to WWBT on SwapRouter02 with `amountOutMinimum` from the TWAP, then unwrap WWBT.
- Payer: a passkey-derived key (or Face Pay's account, 6.3); the payer sees an amount and a fingerprint prompt.

**Requirement checklist.**
- [x] Q1 relay and vault verified; Q2 the customer's payment and the merchant's budget top-up, prize USDT; Q3 line: "A third party can submit the payer's signed payment while the merchant's gas budget is enforced in the same transaction; a card network hides this cost in the merchant discount rate with no public bound."
- [x] Q4 to Q6; Q5 shows payer, merchant, relayer operator, attacker.
- [x] D: no WBT, no seed phrase. W1: payer sees no chain, gas or seed. W2: who pays (merchant budget), WBT source (the pool, clickable), drain (bound with a number).
- [x] Won't place: the payer signs typed data only; no AI chat.
- [ ] Honest limit: the payer's USDT balance is pre-funded in the demo; state it on screen (question 6).

**Why it beats rivals (Judgement).** Every gasless rival will say "the merchant pays gas" and "rate limiting". This one answers all three halves of W2 with a mechanism, a number and an explorer link, which is the requirement no analog sponsor ever set.

**Closest prior winners.** [PayWiser](https://ethglobal.com/showcase/paywiser-i4i5r) (Circle "Create a Gasless Experience"); [ArcBeam](https://ethglobal.com/showcase/arcbeam-e0bey) ("No native token needed"); [Full Circle](https://ethglobal.com/showcase/full-circle-b091b) (pay with USDC, not ETH).

**Stack.** Whitechain Scale (primary); with Closebook on top, Operate in the same slot.

**Difficulty.** Medium. The TWAP bootstrap is a 10 minute task if done at 21:00 Thursday.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 7 | 10 | 7 | 8 | **8.0** |

**Judge notes (Judgement).**
- Whitechain judge: "This is the answer we wrote the question for. Put the bound and the refill link in the README, not only in the video."
- Veteran: "Cardinality first, or the TWAP reverts on stage. Ask before touching a third party's pool (question 7)."

### 6.3 Rank 2. Face Pay: Face ID pays USDT through the token's own authorization, no bundler (new)

**Pitch.** The payer's wallet is a tiny passkey account whose `isValidSignature` checks a WebAuthn signature with Whitechain's P256 precompile. The payer's Face ID signs an EIP-3009 authorization, and the merchant's relayer submits the prize USDT's `receiveWithAuthorization` with a `bytes` signature, so no bundler, no paymaster, no seed phrase and no WBT are involved.

**Falsifiable promise.** "The payer touches Face ID once and never sees a chain, a gas fee or a seed phrase. There is no bundler and no paymaster: the USDT contract itself checks the passkey through our account, and a signature from any other device is refused."

**Demo moment (20 seconds).** A judge's own phone opens the checkout, creates a passkey and pays 3.00 USDT from a pre-loaded account with one Face ID touch. The explorer shows one transaction: account deployment and payment together. A second phone tries to replay the signed authorization for a different amount: revert. The merchant view shows the payment and the relayer's gas cost.

**How it works.**
- `PasskeyAccount` stores a P256 public key; `isValidSignature(hash, sig)` parses a WebAuthn assertion and verifies it with P256VERIFY at `0x100`, which returns 1 for valid signatures on Sepolia (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q4).
- First payment: the relayer calls a factory that deploys the account at its CREATE2 address and submits `receiveWithAuthorization(..., bytes signature)` in one transaction.
- **Gate, hours 0 to 3:** with a software P256 key, confirm that the USDT `bytes` path calls `isValidSignature` on a contract signer. The selector is present (section 1.2); the behaviour is unverified. **Fallback:** the account executes `transfer` itself via a relayed `execute(sig)`, still gasless and passkey-only.
- Recovery: a second passkey added from a logged-in device; stated, not built, if time runs out.
- Public libraries for WebAuthn parsing and P256 verification (Judgement: OpenZeppelin's utilities or an audited open-source WebAuthn verifier; pin the version on day one).

**Requirement checklist.**
- [x] Q1 account factory and router verified; Q2 the passkey payment in prize USDT; Q3 line: "The token itself checks the payer's Face ID signature at settlement; a card wallet's biometric check happens inside the phone vendor's and issuer's private systems."
- [x] Q4 to Q6; Q5 shows payer and merchant.
- [x] D and W1: the payer flow is Face ID only. W2: merchant relayer pays gas, WBT from the faucet on testnet and the pool in production, drain limited by simulate-before-send and per-merchant budgets (Gas Ledger's mechanism, reused).
- [x] Won't place: the payer signs a WebAuthn assertion, never a transaction.
- [ ] Honest limit: the account must hold USDT; topping it up is a crypto step for a real customer today.

**Why it beats rivals (Judgement).** Rival passkey checkouts will need a bundler they cannot get on 1874 (Pimlico does not support it) or will stop at an EOA derived from a passkey. Using the token's own EIP-1271 path with the chain's P256 precompile is the smallest, most Whitechain-specific design in the room.

**Closest prior winners.** [Absynth](https://ethglobal.com/showcase/absynth-e2he9) (Circle, passkey smart account); [Solva](https://ethglobal.com/showcase/solva-map8t) (Polygon Real World Payments, no signature modals); [Cache Coherence](https://ethglobal.com/showcase/cache-coherence-1nq6z) (Base 4337 1st).

**Stack.** Whitechain Scale only; pairs with Gas Ledger as its relayer.

**Difficulty.** Medium (WebAuthn parsing is the hard part; the gate decides the elegant path).

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 9 | 9 | 7 | 8 | 6 | **7.7** |

**Judge notes (Judgement).**
- Whitechain judge: "If the USDT path really takes contract signatures, this is the demo we would show other builders."
- Veteran: "Everything hinges on a three-hour gate. The fallback still scores well, so the downside is small."

### 6.4 Rank 3. Facilitator Under Fire: an x402 facilitator with a published abuse suite

**Pitch.** A self-run x402 facilitator settling prize USDT on 1874 through EIP-3009, a business API that sells a data endpoint per request, an agent (a script, not a chat) that pays it, and an adversarial harness that fires malicious payments at the facilitator and reports what got through.

**Falsifiable promise.** "Our harness fires 2,000 malicious x402 payments across ten attack classes. None settles twice or for the wrong amount, and the facilitator's WBT loss stays under the bound on screen."

**Demo moment (20 seconds).** The agent pays 0.01 USDT per call and explorer links scroll. The harness starts; counters race; the panel reads "double settles 0, wrong amount 0, wrong payee 0, WBT lost 0.0031 (bound 0.01)".

**How it works.**
- x402 "exact" scheme with EIP-3009, network `eip155:1874`, using the public x402 packages that Whitechain's own docs note wagmi pulls in ([Reown docs](https://docs.whitechain.io/build/dapps/connect-wallet-with-reown)).
- Attack classes: replay, cross-resource reuse, `payTo` and amount mutation, expired windows, `cancelAuthorization` front-runs, nonce collisions, concurrent double submits, malformed signatures, dust floods, chain ID confusion.
- Most attacks are rejected offchain without RPC; only plausible payments are simulated (batched, under 50 rps); a nonce reservation table prevents concurrent double submits; per-payer and per-resource budgets.

**Requirement checklist.**
- [x] Q1 facilitator settlement contract (or a thin verifier) verified; Q2 the agent's payments in prize USDT; Q3 line: "Per-request settlement in about a second with no account or API key; card rails cannot price a 1 cent call."
- [x] Q4 to Q6; Q5 shows agent operator, business, facilitator operator.
- [x] D: the agent holds no WBT. W1: the agent's owner sees no chain steps. W2: harness numbers plus the pool refill route.
- [x] Won't place: the agent actually pays, with explorer links.

**Why it beats rivals (Judgement).** x402 is the lane every agent team will enter. The harness is the one thing the obvious entry will not ship, and it answers Whitechain's drain question with evidence.

**Closest prior winners.** [Glassbox402](https://ethglobal.com/showcase/glassbox402-qyepd), [router402](https://ethglobal.com/showcase/router402-b717q), [x402-flash](https://ethglobal.com/showcase/x402-flash-yj9wd); [Cordon](https://ethglobal.com/showcase/cordon-vw3kh) (agent-side adversarial strategies, finalist, no partner prize).

**Stack.** Whitechain Scale only (Hedera's x402 track requires Hedera).

**Difficulty.** Medium-low.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 8 | 9 | 5 | 8 | **7.6** |

**Judge notes (Judgement).**
- Whitechain judge: "Our listed idea plus our question, answered with numbers. Make the business side real: who buys this data?"
- Veteran: "Do not claim 10,000 live; the RPC limit makes that a lie on camera."

### 6.5 Rank 4. Metered Tab: agents pay per request, the business pays gas once per hundreds of calls (new)

**Pitch.** Per-request payments where an agent's owner opens a USDT tab once (relayed, no WBT), the agent's session key signs a cumulative voucher on every call, the business verifies it offchain in microseconds, and settles on Whitechain once every few hundred calls, so gas per request is a fraction of a cent and the business is never unpaid.

**Falsifiable promise.** "500 paid API calls, one settlement transaction. The business's gas per call is printed on screen, the agent's session key cannot withdraw a cent, and the business can never collect more than the agent's latest voucher."

**Demo moment (20 seconds).** An agent hammers the API; a counter shows 500 calls and "owed 5.00 USDT". The business clicks settle: one explorer transaction moves 5.00 USDT and shows gas per call. A forged voucher for 50 USDT is rejected; the owner closes the tab and the unspent deposit returns.

**How it works.**
- `TabChannel.open(owner permit, cap, expiry, sessionKey)`: relayed by the business; moves the deposit into the channel so the business cannot be left unpaid.
- Vouchers: EIP-712 `{channelId, cumulative}` signed by the session key; monotonic, so only the latest matters.
- `settle(voucher)` pays the business the delta and reimburses the relayer from the business's share; `close` after expiry returns the remainder to the owner.
- Served over HTTP 402 with the voucher in a header; the opening deposit uses the x402 "exact" scheme so the flow stays x402-shaped.

**Requirement checklist.**
- [x] Q1; Q2 the deposit and the settlement, prize USDT; Q3 line: "One settlement for hundreds of metered calls with the money already locked for the business; card rails have a fee floor above the price of a call."
- [x] Q4 to Q6; Q5 shows agent owner, agent, business.
- [x] D, W1: the agent holds no WBT; the owner opens a tab with one signature. W2: gas per call shown; the relayer only submits opens and settles that pay for themselves.
- [x] Won't place: the agent actually pays; no chat.
- [ ] Risk: the judges may prefer plain x402 per call for the listed idea; keep the opening deposit as x402.

**Why it beats rivals (Judgement).** Per-call x402 on Whitechain costs the facilitator a transaction per request, which makes Scale's drain question worse. A tab makes the economics work and is easy to show.

**Closest prior winners.** Arc's "Best Agentic Economy with Nanopayments" track at Cannes 2026 funded the same idea on Arc (`track_ideas/history/whitechain.md` section 3); [x402-flash](https://ethglobal.com/showcase/x402-flash-yj9wd) and [router402](https://ethglobal.com/showcase/router402-b717q).

**Stack.** Whitechain Scale only.

**Difficulty.** Medium.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 8 | 9 | 5 | 7 | **7.4** |

**Judge notes (Judgement).**
- Whitechain judge: "Better economics than per-call x402. Show that a human owner set it up without touching WBT."
- Veteran: "Payment channels are old. Novelty rests on the Whitechain numbers, so measure them."

### 6.6 Rank 5. No Single Relayer: a gasless checkout that survives its relayer (stacks with EF CROPS)

**Pitch.** The payer's signed authorization binds payee, amount, fee cap and deadline. The widget broadcasts it to several independent relayers (the merchant's, the team's, and a relay node anyone can run with faucet WBT); the first to land earns the capped fee; and if every relayer refuses, the merchant can force-include the signed payment from Ethereum Sepolia through OptimismPortal.

**Falsifiable promise.** "Kill our relayer and the merchant's relayer mid-checkout. The payment still lands within seconds through a relay node you can run yourself, and no relayer could change the amount, the payee or the fee."

**Demo moment (20 seconds).** Two terminals `kill` the main relayers while the payer taps Pay. A third laptop's relay node lights up; the receipt shows who relayed and the capped fee. The README shows a recorded forced-inclusion run from L1.

**How it works.**
- `RelayRouter.relay(intent, auth)`: the EIP-3009 nonce is the hash of `{merchant, amount, maxFee, deadline}`, so any change breaks the signature; the router pays the relayer at most `maxFee` from the payment.
- `relay-node` npm CLI; a static relay list in the repo.
- Forced inclusion: merchant-side only, because it needs Sepolia ETH and an L1 transaction, within the sequencing window of about 12 hours ([finality docs](https://docs.whitechain.io/learn/network/transaction-finality)).

**Requirement checklist.**
- [x] Whitechain Q1 to Q6; Q3 line: "A payment any party can carry once the payer has signed; an acquirer can refuse a merchant and the payment simply fails."
- [x] D, W1, W2: the fee bound pays the business side's gas; relayers refill from fees; nothing to drain because relaying is voluntary and paid inside the transaction after simulation.
- [x] Won't place: payer signs typed data only.
- [x] EF CROPS: FOSS license, CROPS section (C: relayers and our server are replaceable, with the L1 path as the last resort; O: build from the repo; P: relayers learn payer address, amount and merchant, stated as a trade-off; S: keys on device), no trackers, video under 3 minutes ([Mumbai EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)).
- [ ] Trade-off to state: Whitechain has a single sequencer and permissioned fault proofs.

**Why it beats rivals (Judgement).** Every gasless rival has one relayer as a single point of failure. This one makes the relayer replaceable on camera, which also gives the EF a structural C property.

**Closest prior winners.** [OnchainRouter](https://ethglobal.com/showcase/onchainrouter-8r4jm) ("holds no wallet"); [Paybot](https://ethglobal.com/showcase/paybot-q7grd) (a facilitator that pays gas).

**Stack.** Whitechain Scale + EF "Best CROPS App" ($3,500). One EF prize only.

**Difficulty.** Medium.

**Scores.**

| D | W1 | W2 | Nov | Fea | Overall |
|---|---|---|---|---|---|
| 8 | 7 | 8 | 7 | 6 | **7.1** |

**Judge notes (Judgement).**
- Whitechain judge: "Interesting, but our merchants want one reliable relayer, not a race. Pitch it to us as uptime."
- Veteran: "Best as an add-on module to Gas Ledger for the EF slot, not as a separate build."

---

## 7. Track combo pass (fresh builds only)

Rules (sourced, [event page FAQ](https://ethglobal.com/events/mumbai) and [details page](https://ethglobal.com/events/mumbai/info/details)): at most 3 partner prizes; a partner with several tracks counts as 1, and "you can be eligible for all of them"; the EF places a project in at most one EF prize; the ETHGlobal finalist track is separate and does not count. Partner prizes are judged only from repo, README and video. Continuity tracks (Whitechain, World, Uniswap, ENS, EF, Arkiv and others) are excluded throughout.

### 7.1 Inside Whitechain's one partner slot (Judgement)

- **The merchant stack: Closebook + Gas Ledger + Clerk Key (+ Face Pay as the payer).** One codebase that enters Operate (primary) and Scale (secondary). The Router, receipts, relayer and refund module are shared. Whether one project can place in two Whitechain tracks is unknown (question 2); the earlier simulated review judged a double placement unlikely (`plans/reviews/judge_whitechain.md` section 1).
- **Deposit Desk + Gas Ledger.** The sweep's fee logic is Gas Ledger's; enter Operate primary, Scale secondary.
- **Assignee Pays + Closebook's Router.** The debtor pays through the Router, but enter Tokenize only, per Whitechain's boundary rule.
- **Coupon Clock + Yield Auction.** The auction is an issuance front end for the same note.
- Do not try to cover all three Whitechain tracks with one build: Tokenize needs an asset with transfer rules, which none of the Operate or Scale builds has.

### 7.2 Cross-sponsor combos that respect the 3-partner cap and one EF prize

| Build | Partner picks (max 3) | Shared mechanism | Extra submission work | Fit risk |
|---|---|---|---|---|
| Merchant stack (Closebook + Gas Ledger) | Whitechain; EF "Best CROPS App" via No Single Relayer module; Uniswap only if the third-party v3 pool counts | Replaceable relayers (C); refill swap on the v3 pool | CROPS README section, FOSS license, video under 3 minutes; Uniswap `FEEDBACK.md` plus form | CROPS "P": relayers see payers; Uniswap acceptance of a non-Labs v3 deployment (U2) |
| Payee Lock | Whitechain, ENS | ENSv2 roles, expiring subnames, aliasing as the invoice record | Live demo link, open source, no hard-coded values | ENSv2 Sepolia support for address-record scoping (E1) |
| Repo Desk | Whitechain, Chainlink CRE | CRE workflow produces the NAV report | CRE CLI simulation recorded | CRE target chain (C1) |
| Coupon Clock | Whitechain, World IDKit | Credential to eligibility registry to transfer hook | Minimum-sufficient paragraph, denied path, debrief | Credential proportionality (Y1) |
| Yield Auction | Whitechain, Uniswap, World IDKit | CCA bids gated by the allowlist hook | Uniswap feedback; World debrief | CCA on 1874 (U1) |
| No Single Relayer (standalone) | Whitechain, EF CROPS | Multi-relayer race and L1 forced inclusion | CROPS section, under 3 minutes | Single sequencer trade-off (F1) |
| Clerk Key, Deposit Desk, Mandate, Assignee Pays, Clean Bill, Face Pay, Facilitator Under Fire, Metered Tab | Whitechain only | n/a | n/a | n/a |

**Not combinable with a Whitechain build** (they require their own chain, studio or contracts): Arc (Arc Studio and Arc chain), Hedera, 0G, 1inch Aqua, Definitive (Flash on its supported chains), and the EF alternative mempool (EF devnets) (`track_ideas/00_current_tracks.md`). Arkiv is combinable in principle but was dropped with Duebook.

### 7.3 Finalist angle (Judgement)

The finalist room scores Technicality, Originality, Practicality, Usability and WOW Factor in a 4 minute demo ([details page](https://ethglobal.com/events/mumbai/info/details)). The ideas with one live beat a generalist judge will remember:
- Clerk Key: the audience holds the clerk key and cannot steal.
- Gas Ledger: the drain script stops at the printed bound.
- Face Pay: a judge pays with their own Face ID, no bundler.
- Coupon Clock: the note freezes itself at the deadline.

Build the partner submission (README and a 2:00 to 2:59 video in Whitechain's vocabulary) separately from the finalist demo.

---

## 8. Whitechain's top 3 overall

1. **Gas Ledger (Scale, 8.0).** It is the only idea that answers every half of Whitechain's most unusual requirement (who pays, where the WBT comes from, what stops a drain) with a mechanism, a number and an explorer link, and it uses the team's adversarial skills directly. It is also the backbone of the merchant stack, so the same code competes in Operate.
2. **Assignee Pays (Tokenize, 8.0).** The cheapest strong Tokenize build, a word-for-word match to a listed idea, and the enforced legs (single financing, payment follows the holder) are shown in reverts that rival invoice entries will not have. It needs no second sponsor and leaves the most time for polish.
3. **Closebook (Operate, 7.8).** Operate is the largest pool ($5,000, three places). Closebook covers every "What we want to see" item, adds the safe-head webhook no rival will think of, and sits on top of Gas Ledger, so builds 1 and 3 are one codebase with Operate primary and Scale secondary. Repo Desk (7.9) scores a hair higher on paper but carries more demo and build risk for a two-place track.

**Recommended single build (Judgement):** Closebook on Gas Ledger, with Clerk Key as the refund authority and Face Pay as the payer if its gate passes. If the team prefers Tokenize, build Assignee Pays alone.

---

## 9. Questions for the Whitechain workshop and booth

Whitechain workshop: Thu 5 Nov 16:30 to 16:50 IST, Workshop Room 2, no speaker listed ([event page](https://ethglobal.com/events/mumbai)). It clashes with Uniswap's workshop (16:30, Room 1), so split the team. Ask the earliest questions on the Whitechain Discord or Telegram dev chat before Thursday ([Whitechain Builders](https://whitechain.io/builders)). Most decisive first.

1. **Prize USDT supply.** Is there an official way to get `0xcedf...55a7` (a drip, a faucet, a booth top-up)? If not, does buying it on the WWBT/USDT v3 pool (`0x5645...F999`) count as a valid source for the qualifying payment? Who operates those pools (YetiTrade?), and will they stay liquid through Saturday?
2. **One project, several Whitechain tracks.** Can one project place in both Operate and Scale? How do we declare the primary track: README, submission form or both?
3. **USDT contract signatures.** Does the prize USDT's `receiveWithAuthorization(..., bytes signature)` and `permit(..., bytes)` verify EIP-1271 signatures from contracts, and will mainnet USDT on 1875 behave the same? (Decides Face Pay's elegant path.)
4. **"A pay button that sends a plain transfer".** Does a customer's plain USDT transfer into a per-order deposit address, swept by a forwarder contract with an order state machine and refunds, count against us? (Decides Deposit Desk's rank.)
5. **Tokenize asset tokens and allowlists.** May the asset itself (a note, receivable, fund share or bill of lading) be a token we issue, as long as every payment is prize USDT? Does an allowlist written by a server after an offchain check (KYC, World ID) count as "Real transfer rules enforced in the contract" if the token checks it on every transfer?
6. **What counts as a crypto step in Scale.** Is a pre-funded payer balance acceptable in the demo? Is a passkey prompt fine? What USDT onboarding path would you accept as "zero crypto steps"?
7. **Relayer WBT in production and on testnet.** Which WBT source would you accept in the write-up (DEX, WhiteBIT, a partner programme)? May we call `increaseObservationCardinalityNext` on the WWBT/USDT pool? Can relayers get more faucet WBT or the 200 rps partner RPC tier during the event?
8. **"Adds in about 20 lines".** Do you count only the demo app's diff? Do config, env and import lines count?
9. **Chain and token changes during the event.** Any planned upgrade, pause or blocklist action on the prize USDT (it has `addToBlockedList`)? Will Sepolia activate Karst before judging? Which EVM target do you recommend?
10. **Wallet infrastructure.** Is any embedded wallet, bundler or paymaster provider supporting chain 1874 for hackers this week (Reown embedded wallets fail and Pimlico rejects 1874 today)?
11. **Safe on Sepolia.** Is the Safe UI and Transaction Service live for `wch-sepolia:`? (Clerk Key.)
12. **What the judges open.** Will judges run the repo or a live link, or judge from README and video only? Is a live link a plus?
13. **Optimism's role.** Are Optimism people on the panel, and do OP Stack features (safe head for settlement status, forced inclusion through OptimismPortal) count in a project's favour?
14. **Feedback file.** What makes `WHITECHAIN_FEEDBACK.md` useful to you, and which known doc gaps should we not repeat?

**Questions for other sponsors, only for the stacks above**
- **U1 (Uniswap, Thu 16:30, Room 1).** Does a team-deployed CCA on Whitechain Sepolia count as "integrate any part of the Uniswap stack"? Does CCA's validation hook support an allowlist?
- **U2 (Uniswap).** Does swapping through a third-party Uniswap v3 deployment on 1874 count, or must it be a Uniswap Labs deployment?
- **C1 (Chainlink, booth).** Can a CRE workflow write to chain 1874? If not, does a CLI simulation that reads an API and emits a signed report we relay ourselves qualify as "meaningfully used"?
- **Y1 (World, Thu 17:30, Room 1).** For investor eligibility, can the Passport/NFC credential disclose an attribute such as nationality or age, and would World call that the minimum sufficient assurance? Is server-side verification feeding a registry on a non-World chain acceptable?
- **E1 (ENS, Thu 16:00, Room 1).** Can Enhanced Access Control scope a role to text records while excluding address records, and does resolver-level record aliasing work on Sepolia this week?
- **F1 (EF, Thu 17:00, Room 2).** Does a multi-relayer checkout with merchant-side forced inclusion count as a structural C property for CROPS, given Whitechain's single sequencer?

---

## 10. Gaps and caveats

- Whitechain has no past winners, so "what its judges reward" is inferred from its own text and analog sponsors (`track_ideas/history/whitechain.md`).
- The USDT `bytes` signature paths were checked by selector presence only; their EIP-1271 behaviour is unverified (question 3).
- The pool probe is a snapshot; liquidity and price can move before Thursday.
- I did not test ENSv2 on Sepolia, CRE on 1874, CCA deployment, or World credential attributes; those are the gates named in each idea.
- ETHGlobal pages were not re-fetched; the verbatim text is the 2026-10-31 snapshot in `track_ideas/00_current_tracks.md`.
