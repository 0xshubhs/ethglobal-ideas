# Whitechain ideas for ETHGlobal Mumbai (fresh builds only)

Draft date: 2026-10-31. Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, no existing project, hacking from Thu 5 Nov 21:00 to Sat 7 Nov 09:00 IST (36 hours). Continuity tracks are ignored.

**Basis.** The track text is in `track_ideas/00_current_tracks.md`, quoted from the [Whitechain prizes page](https://ethglobal.com/events/mumbai/prizes/whitechain) as fetched 2026-10-31. The winner patterns come from `track_ideas/history/whitechain.md` ("History" below, with its section numbers). Everything in this file is **Judgement** unless it carries a link or a path. Partner stacking rules:
- at most 3 partner prizes per project, and Whitechain's tracks count as 1;
- at most one EF prize;
- the ETHGlobal finalist track is separate;
- partner judges see only the repo, README and video ([Mumbai](https://ethglobal.com/events/mumbai)).

**Partners that cannot share a Whitechain build.** Arc requires Arc Studio and its own chain. Hedera, 0G and 1inch Aqua require their own chains or official contracts. The EF alternative mempool runs on EF devnets. Definitive does not fit. That leaves the EF prizes (CROPS App, Anon-RPC), World IDKit, ENS (ENSv2), Arkiv, Chainlink CRE and, with a question mark, Uniswap Foundation (`track_ideas/00_current_tracks.md`).

---

## 0. Picks in brief

| Rank | Build | Track(s) | Partners | Why |
|---|---|---|---|---|
| 1 | **O1 Closebook + S1 Gas Ledger** as one product | Operate (primary), Scale | Whitechain only | It answers the two questions no analog winner did: books that verify themselves, and a relayer whose drain is bounded. Both rest on the team's invariant and adversarial skills (History 5, 6) |
| 2 | **T4 Repo Desk** | Tokenize | Chainlink CRE | A Whitechain-named instrument with almost no ETHGlobal winners of its own. Close-out logic is the team's home ground, and it is less crowded than invoice financing (History 5) |
| 3 | **O5 Clerk Key** | Operate | Whitechain only | The cheapest build with a clear single beat: the audience gets the clerk key and cannot steal. It suits a week dominated by the Binance and CoinDCX key losses (`track_ideas/00_season.md`) |
| 4 | **T1 Coupon Clock** | Tokenize | World IDKit | A note that defaults by itself. The World credential choice is easy to defend as "minimum sufficient assurance" |
| 5 | **O3 Payee Lock** | Operate | ENS ENSv2 ($7,000) | ENSv2 roles are central, not cosmetic, and the setting is a familiar fraud (a changed payee) |

---

## 1. Qualification checklist shared by every idea

These are Whitechain's six qualifications, verbatim in `track_ideas/00_current_tracks.md`. Each idea below names only its own payment transaction (Q2) and its README line (Q3).

1. **"Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer".** Compile with `evm_version = "prague"`, because Sepolia lacks Karst and CLZ (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q4). Do a Blockscout verify dry run within the first hour.
2. **"At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow".**
   - Funding route found today: swap faucet WBT into prize USDT on the WWBT/USDT pool `0x5645...F999` via SwapRouter02 `0xe208...6962` (History 9).
   - Quote with QuoterV2 first. Record the funding transaction in the README.
   - Never use USDT.e `0xaa79...8f46`.
3. **"A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here".** Each idea gives its line.
4. **"A public GitHub repo that shows steady progress".** Commit every 1 to 2 hours, and tag `t+6h`, `t+12h`, `t+24h`. The README covers setup, architecture and limitations.
5. **"A demo video of 2 to 4 minutes that shows each party involved".** Cut it to 2:00 to 2:59, which also satisfies the CROPS cap of 3 minutes.
6. **"A WHITECHAIN_FEEDBACK.md".** Record time to first verified contract, time to first USDT payment, and the exact errors hit (the shape is in `plans/reviews/judge_whitechain.md` section 12).

---

## 2. Operate · Stablecoin Payments for Business ($5,000; 1st $2,500, 2nd $1,500, 3rd $1,000)

The verbatim items each idea must meet:
- **D:** "Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it ... a payment flow a real merchant could plug into their app or store".
- **W1:** "A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines".
- **W2:** "Both views in the demo, the merchant and the paying customer".
- **W3:** "Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use".
- **X (Won't place):** "A pay button that sends a plain transfer, tipping jars, bill splitters, or custodial bridges into a local currency token. Payroll, escrow and revenue splits on their own."

### O1. Closebook: a checkout whose books check themselves (narrow, Whitechain only)

- **Pitch.** A drop-in USDT checkout where every order writes an onchain receipt. Refunds are possible only against a receipt and only up to what is left on it. Each month closes with a posted period root, so the accountant's CSV can be checked against the chain with one command.
- **Falsifiable promise.** "Change any number in the accountant's export and `closebook verify` names the line that no longer matches Whitechain. Try to refund more than was paid, or to anyone but the payer, and the contract reverts."
- **20 second demo moment.**
  - The customer pays 4.00 USDT.
  - The merchant clicks "refund 1.50", and the customer's receipt page flips to "Refunded 1.50 of 4.00, verified on chain".
  - The accountant runs verify and sees "142 of 142 lines match". A judge edits one cell, and the check fails on line 37.
- **Track fit.**
  - D: checkout, webhook, receipt, refund and period close cover "from the first checkout to what happens after it".
  - W1: the demo shop in `examples/shop` (its own `package.json`) adds `<CloseCheckout orderId amount onPaid>` plus `verifyWebhook()`; show the `git diff --stat`.
  - W2: split screen with the merchant dashboard beside the customer checkout and receipt.
  - W3: refund, partial refund and an export the accountant can verify.
  - X:
    - Not a plain transfer: the Router pulls with `receiveWithAuthorization`, writes the receipt and emits `OrderPaid(orderIdHash)`. Annotate the explorer link.
    - No tipping, splitting, bridge, payroll, escrow or revenue split.
  - Q2: the customer's `Router.pay` transaction. Q3: "A receipt that the refund logic and the accountant can both verify against public settlement, with a refund cap no card processor exposes to the customer."
- **Why Whitechain's judges would pick it.**
  - The likely rival is "a plain but polished merchant SDK" (`plans/reviews/judge_whitechain.md` section 5). Closebook matches that rival on fit, then wins on what happens after the first payment.
  - It follows the winning pattern of a size claim ("a few lines", CrossMeter) and code-enforced lifecycle (History 5, patterns 2 and 3).
  - Whitepay already sells reporting to merchants ([Whitepay](https://whitepay.com)), so the judges know the problem.
- **Closest past work, and the difference.**
  - [CrossMeter](https://ethglobal.com/showcase/crossmeter-w9zay) (Circle 2nd) and [Swap Pay](https://ethglobal.com/showcase/swap-pay-4hpe9) (PYUSD Grand Prize) are billing SDKs.
  - [StablePay](https://ethglobal.com/showcase/stablepay-rkwy9), [PayR](https://ethglobal.com/showcase/payr-au332) and [Reclaim](https://ethglobal.com/showcase/reclaim-jywde) (ETHOnline 2026, no prize shown) cover a demo store with webhooks, receipts and executable refunds.
  - Plan C (Chupke) has refunds and an export inside a privacy design.
  - The twist: the refund cap and period close are contract invariants, and the export is independently checkable. There is no privacy layer, so the checkout never blocks.
- **Stack options.** Whitechain Operate, with Scale in the same slot if S1 is merged in. No EF prize. A third partner is not needed.
- **Difficulty.** Medium-low.
- **Team fit.** High. The invariants (sum of refunds never exceeds paid; period root equals the fold of receipts) suit Foundry invariant tests and Medusa.

### O2. Mandate: subscriptions that cannot overcharge (narrow, Whitechain only)

- **Pitch.** Recurring billing with permit-based pulls through Permit2 (preinstalled on 1874; `research_notes/EF tracks and Whitechain ideas/whitechain.md` Q5). A `MandateManager` enforces exactly what the customer signed:
  - a ceiling, an interval, a maximum number of periods and the merchant;
  - cancellation at any time;
  - a price increase needs a new customer signature;
  - failed renewals follow a dunning schedule (retry, grace, pause) with reminders.
- **Falsifiable promise.** "The merchant's own admin key cannot pull more, sooner, or after cancellation than the customer signed. Here is the invariant suite with its call count; try it live."
- **20 second demo moment.**
  - The merchant presses "charge now" twice in one period, and the second reverts `IntervalNotElapsed`.
  - The merchant raises the price, and the renewal is blocked until the customer re-signs.
  - The customer cancels from the receipt page, and the next pull reverts.
- **Track fit.**
  - D and the listed idea, verbatim: "Subscriptions and recurring billing with permit based pulls and cancel anytime".
  - W1: `<SubscribeButton plan="pro-monthly">` plus a webhook verifier.
  - W2: the merchant plan dashboard beside the customer's subscription page.
  - W3: the renewal is named extra credit, and a proration refund on cancel adds a refund.
  - X: the pull goes through the mandate contract, not a plain transfer, and there is no escrow or payroll.
  - Q2: the first renewal pull. Q3: "A customer-signed ceiling the merchant cannot exceed, checked by settlement itself; card-on-file billing gives the merchant open-ended pull rights."
- **Why Whitechain's judges would pick it.**
  - It matches one of Whitechain's own four starting ideas word for word, and it reaches the renewal extra credit.
  - It carries a security claim that rivals in this lane did not make.
- **Closest past work, and the difference.**
  - [AutoPay](https://ethglobal.com/showcase/autopay-n8ot7) (HackMoney 2026 finalist) had capped pulls, revoke at any time and an npm SDK, but no Arc prize (History 4.4).
  - [ARCA](https://ethglobal.com/showcase/arca-kw3zh), [FlexSub SDK](https://ethglobal.com/showcase/flexsub-sdk-athv9) and [onchain-subscription](https://ethglobal.com/showcase/onchain-subscription-fe4zq) show no prizes.
  - The twist: price-change consent and dunning as contract states, plus a published fuzz suite as the headline.
  - The risk is that AutoPay already exists, so lead with the overcharge-proof claim, not with "subscriptions".
- **Stack options.** Whitechain Operate, plus Scale in the same slot if renewals are relayed and the payer never holds WBT. No other partner fits naturally.
- **Difficulty.** Medium.
- **Team fit.** Very high (fuzzing).

### O3. Payee Lock: invoice links whose pay-to cannot be swapped (stacks with ENS)

- **Pitch.** Payment links and invoices for remote studios billing global clients.
  - Each invoice is an ENSv2 subname such as `inv-1042.studio.eth`, expiring at its due date plus a grace period. Its pay-to address for Whitechain (an ENSIP-11 coin type for chain 1874) sits in a Permissioned Resolver.
  - Enhanced Access Control gives the billing bot a role that can write only the `status` and `paid_tx` records, never the address.
  - The widget refuses to pay silently if the pay-to record changed within a cooling window, which it reads from resolver events.
- **Falsifiable promise.** "Steal the billing bot's key: you can mark invoices paid, but you cannot change where a client's money goes. If the owner changes it, every open invoice warns the payer for 48 hours."
- **20 second demo moment.**
  - The bot key tries `setAddr`, and ENSv2 reverts.
  - The owner changes the address, and the client's checkout shows "payee changed 3 hours ago, confirm with the studio".
  - The client pays after confirming, the receipt lands, and the overdue reminder fires on another invoice.
- **Track fit.**
  - Listed idea, verbatim: "Payment links and invoices for remote studios, contractors and cross-border teams billing global clients, with due dates and reminders".
  - W1: `<PayInvoice name="inv-1042.studio.eth">`.
  - W2: the studio's invoice dashboard beside the client's pay page.
  - W3: reminders, an overdue state, a receipt record and an export.
  - X: payment goes through a Router with an invoice reference; it is not a plain transfer and has no escrow.
  - ENS qualifications: "built on ENSv2 on Ethereum mainnet or Sepolia" (Sepolia); the features are "central to the product"; there is a live demo link.
  - Q3: "The client pays a named, expiring invoice and settles in USDT within a second; a bank wire's beneficiary details can be swapped in an email with nothing to warn the payer."
- **Why the judges would pick it.**
  - For Whitechain, it covers the invoice idea in full, with reminders and a fraud control a merchant would actually want.
  - For ENS, it uses the exact features ENS lists (subname registries, Enhanced Access Control, Permissioned Resolver, expiring subnames) for a real permission boundary. That is the "central, not cosmetic" test.
- **Closest past work, and the difference.**
  - [AnyAsset Checkout](https://ethglobal.com/showcase/anyasset-checkout-8h457) (Arc 2nd) has ENS-branded checkout links.
  - [PDFi +](https://ethglobal.com/showcase/pdfi-ar8v8) (Tokyo 2026) is an invoice that "pays itself, only to the vault its ENS name publishes".
  - [Seikyu](https://ethglobal.com/showcase/seikyu-dyqh3) uses expiring ENSv2 names for financing.
  - [namegate](https://ethglobal.com/showcase/namegate-63d0m) uses ENSv2 roles as KYC.
  - The twist: role-scoped write permissions as the fraud control, plus the cooling-window warning, with settlement on Whitechain.
- **Stack options.** Whitechain Operate plus ENS "Best Use of ENSv2". A third partner is not needed. No EF prize.
- **Difficulty.** Medium. The risk is which ENSv2 calls work on Sepolia this week (ask at the ENS workshop, Thu 16:00).
- **Team fit.** Medium-high.

### O4. Duebook: invoices that live in Arkiv and expire on schedule (stacks with Arkiv, optional EF CROPS)

- **Pitch.** An invoice and payment-link API.
  - Invoices are Arkiv entities owned by the merchant wallet. They are queryable by status, due date and client, and they expire 30 days after the due date.
  - The checkout reads the invoice from Arkiv rather than from a merchant server, and payment settles on Whitechain.
  - A watcher writes a receipt entity. Reminders are an Arkiv query for overdue invoices, and the accountant export is a query anyone can rerun.
- **Falsifiable promise.** "Shut down our server. The client can still open the link, see the invoice and pay, and the accountant can rebuild the month from Arkiv and Whitechain alone."
- **20 second demo moment.** Run `docker stop api` on screen. The client's link still loads and the payment settles. The "overdue" query lists two invoices, each with a reminder.
- **Track fit.**
  - W1: `createInvoice()` and `<PayLink id>`.
  - W2: the merchant's invoice list beside the client's link.
  - W3: reminders, a receipt and a re-runnable export.
  - X: payment goes through the Router with an invoice reference.
  - Arkiv "Build on Arkiv (from scratch)": its listed direction "Markets: listings or offers that expire at their deadline" fits, and a user-visible feature reads from Arkiv. Write the `/arkiv/*.md` files to its 4 x 25% rubric.
  - Q3: "The invoice and its payment are both public facts the client can check without trusting the studio's server; a card or wire invoice lives only in the issuer's system."
- **Why the judges would pick it.**
  - Whitechain gets a working invoice flow with reminders and an export.
  - Arkiv gets a clean answer to "If you swapped Arkiv for Postgres ... what would your users lose?": invoices would disappear with the merchant's server.
- **Closest past work, and the difference.**
  - [UWAPI](https://ethglobal.com/showcase/uwapi-uz7n4), [MarketPay](https://ethglobal.com/showcase/marketpay-j4buj) and [Onvo](https://ethglobal.com/showcase/onvo-f69m7) (Cannes 2026) show no prizes and depend on their servers.
  - The twist: the invoice store has no gatekeeper and expires by design.
- **Stack options.**
  - Whitechain Operate plus Arkiv Build ($4,000).
  - Optionally EF Best CROPS App as the third partner, leading on C: a frontend that keeps working when its backend disappears.
  - Trade-off: invoice data is public on Arkiv. Hash client names, keep line items client-encrypted, and state this in the CROPS section.
- **Difficulty.** Medium.
- **Team fit.** Medium. It is more product than security, and its novelty sits in Arkiv.

### O5. Clerk Key: refunds a shop clerk can issue but cannot abuse (narrow, Whitechain only)

- **Pitch.** The merchant treasury is a Safe on Whitechain; Safe 1.3.0 and 1.4.1 singletons are present on 1874 (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q6).
  - A Safe module gives clerk keys exactly one power: refund an order, only to the address that paid it, only up to its unrefunded balance, and only under a daily cap.
  - Larger refunds queue for the owner. Every refund links to its receipt.
  - It plugs into any checkout through the `OrderPaid` event, including O1.
- **Falsifiable promise.** "We put the clerk's private key on screen. Anyone can refund customers with it; nobody can move a cent anywhere else."
- **20 second demo moment.**
  - A volunteer imports the clerk key and tries to send to themselves: revert `NotOriginalPayer`.
  - They refund the same order twice: revert `ExceedsPaid`.
  - A third refund over the daily cap goes to "queued for owner".
  - The customer's receipt shows the one refund that was legitimate.
- **Track fit.**
  - Listed idea, verbatim: "Refunds and partial refunds a merchant issues in one click, with a record the customer can check".
  - W1: `enableClerkRefunds(safe, { dailyCap })` plus the `<RefundButton order>` widget in the demo shop.
  - W2: the clerk or merchant console beside the customer receipt.
  - W3: the refund is the extra credit.
  - X: this is neither escrow nor payroll; the payment itself goes through the checkout Router.
  - Q3: "Refund authority bounded by settlement records, enforced where the money sits; a POS refund key on a card terminal can usually refund to any card."
- **Why Whitechain's judges would pick it.**
  - It answers a question the simulated Whitechain judge asked: "Can a shop clerk issue a refund without being able to drain the treasury?" (`plans/reviews/judge_whitechain.md` section 10, question 11).
  - The headline suits the week: Binance lost about $6.36B through a hot signing key, and CoinDCX lost $15.99M USDT from retired wallets (`track_ideas/00_season.md` section 1.1 and 1.12).
- **Closest past work, and the difference.**
  - [Taparoo](https://ethglobal.com/showcase/taparoo-qmfc0) (Circle, Cannes 2025) has spend rules and a kill switch.
  - Circle's "Build a Smart Wallet with Dynamic Security Controls" track ran at Taipei and Cannes 2025 ([Cannes prizes](https://ethglobal.com/events/cannes/prizes)).
  - [Unwind](https://ethglobal.com/showcase/unwind-pqp3a) (Cannes 2026) is refund infrastructure.
  - The twist: a refund-only authority bound to receipts, on the merchant side, demonstrated by handing out the key.
- **Stack options.** Whitechain Operate only. Pair it with O1 for a fuller merchant product in the same slot.
- **Difficulty.** Low-medium.
- **Team fit.** Very high.

---

## 3. Tokenize · Real World Finance on Whitechain ($4,000; 1st $2,500, 2nd $1,500)

The verbatim items:
- **D:** "Model real-world asset (RWA) lifecycles and compliance logic onchain. Build an issuance, settlement or lifecycle flow ... where every payment happens in USDT".
- **W1:** "Real transfer rules enforced in the contract, such as allowlists, transfer restrictions, maturity or settlement conditions, not just a token with a UI on top".
- **W2:** "A clear issuer, investor or business user and at least one full lifecycle step in the demo, from issuance to payment or settlement".
- **X:** "A token with a mint button and no rules, or ownership NFTs where nothing is enforced onchain."
- **B (boundary):** "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize."

**Crowding warning (History 5).** About 18 invoice-financing projects were submitted at 2026 events, and the 3 winners were all Hedera tokenization entries. Notes, repo and trade finance are thinner.

### T1. Coupon Clock: a note that defaults by itself (stacks with World IDKit)

- **Pitch.** A tokenized 90-day SME note.
  - An investor allowlist is enforced in the token's `_update` against an eligibility registry. Investors qualify by verifying a World ID Passport (NFC) credential, checked on the team's server, which then writes to the registry.
  - Coupons in USDT are paid by a crank anyone can call, drawing on the issuer's coupon reserve.
  - A missed coupon moves the note to Default: transfers freeze, and holders' pro-rata claims on posted USDT collateral open. At maturity, principal repays and the tokens burn.
- **Falsifiable promise.** "Miss a coupon by one block and nobody presses anything: the token stops trading and every holder can claim their share of the collateral."
- **20 second demo moment.**
  - The issuer drains the coupon reserve.
  - The crank call flips the note to `Default` on the explorer.
  - An investor's transfer reverts, and the same investor claims 1,000.00 USDT of collateral in one click.
- **Track fit.**
  - Listed idea, verbatim: "Tokenized bonds or notes with an investor allowlist, coupon payments in USDT and repayment at maturity".
  - W1: the allowlist, the transfer freeze, and maturity and default conditions are all in the contract.
  - W2: the issuer issues, the investor buys and receives a coupon, then default or repayment.
  - X: rules everywhere.
  - Q2: the investor's purchase in USDT, plus a coupon. Q3: "Coupons, default and collateral claims execute from settlement state the instant a deadline passes; a paper note needs a trustee, a court and weeks."
- **Why the judges would pick it.**
  - It follows the Hedera winner pattern of a visible state machine (Wafer's NAV writedown on default) with Whitechain's own named instrument.
  - It meets the World IDKit qualifications:
    - "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate".
    - "minimum sufficient assurance": a passport-holding unique human, standing in for issuer KYC.
    - "Demonstrate ... one meaningful alternative path", here an ineligible investor whose transfer is rejected.
- **Closest past work, and the difference.**
  - [namegate](https://ethglobal.com/showcase/namegate-63d0m) is a Hedera bond with ENSv2 as the KYC layer.
  - [Wafer](https://ethglobal.com/showcase/wafer-r4uab) is a KYC-gated fund with a default writedown.
  - [Aura](https://ethglobal.com/showcase/aura-yragg) (Taipei) offers "bond-like notes".
  - The twist: default is an automatic transition enforced in the transfer path, with a proportionate human credential, settled in Whitechain USDT.
- **Stack options.** Whitechain Tokenize plus World "Best Use of IDKit" ($2,500). Third partner optional. No EF prize.
- **Difficulty.** Medium. Use 5-minute coupon intervals on testnet.
- **Team fit.** High (state machines, solvency invariants).
- **Honest limit.** The registry trusts the team's server that verified the World ID proof. Say so in the README.

### T2. Yield Auction: let a clearing auction set the note's interest rate (stacks with Uniswap, optional World)

- **Pitch.** Primary issuance of a short-term note through Uniswap's Continuous Clearing Auction (CCA).
  - The team deploys the CCA on Whitechain Sepolia, with bids in prize USDT and a validation hook that admits only allowlisted investors.
  - The clearing price sets the yield. Settlement delivers notes and USDT together.
  - After the auction, the note keeps its transfer rules and repays at maturity.
- **Falsifiable promise.** "Nobody sets the interest rate; the auction does. A wallet that is not on the allowlist cannot place a bid at all."
- **20 second demo moment.** Three investors bid over 5 minutes and the clearing curve moves. A non-allowlisted bid reverts inside the hook. The auction clears at an implied 11.8% yield, and notes and USDT swap in one settlement.
- **Track fit.**
  - D: issuance and settlement in USDT.
  - W1: allowlist and settlement conditions in the auction hook and the token.
  - W2: the issuer, investors and the clearing step.
  - X: not a mint button.
  - Uniswap: "Build on or integrate any part of the Uniswap stack, including ... CCA". Needs `FEEDBACK.md` and the feedback form, with the README pointing to the contracts and lines.
  - Q3: "Price discovery and delivery against payment in one onchain settlement; a private placement fixes the rate by negotiation and settles days later."
- **Why the judges would pick it.**
  - Whitechain: the most "real finance" issuance demo in the room.
  - Uniswap: [Kura](https://ethglobal.com/showcase/kura-so3wx) won Uniswap 1st at Tokyo with a CCA and verified-human bidders, and this applies the same mechanism to debt.
- **Closest past work, and the difference.**
  - Kura: CCA plus World ID bidders, for collectibles.
  - [Tegata](https://ethglobal.com/showcase/tegata-ydmgu) (Tokyo 2026): invoices sold on Uniswap v4 and priced on a credit curve; no prize shown.
  - The twist: CCA as yield discovery for an allowlisted note, with lifecycle rules after the auction, on Whitechain USDT.
- **Stack options.** Whitechain Tokenize, Uniswap "Build with Uniswap" ($10,000) and optionally World IDKit for the allowlist, which uses all three partner slots.
- **Difficulty.** High. Deploying the CCA on 1874 must be a day-one check, and whether Uniswap counts a team-deployed CCA on a chain it does not support is unknown (workshop question U1).
- **Team fit.** High (DeFi mechanism design).

### T3. Assignee Pays: a receivable whose payment follows its owner (narrow, Whitechain only)

- **Pitch.** Invoice financing.
  - A supplier can tokenize an invoice only after the debtor acknowledges it onchain. The debtor's registered key signs EIP-712 over the invoice hash, amount and due date, modelled (as a judgement) on buyer-accepted receivables platforms such as India's TReDS.
  - A financier buys the receivable at a discount, with delivery against USDT.
  - On the due date, the debtor pays through a pay link, and the contract routes the USDT to whoever holds the receivable, never to the supplier.
  - Late payment moves it to Overdue with penalty accrual. A debtor can acknowledge an invoice hash only once, so it cannot be financed twice.
- **Falsifiable promise.** "After the sale, the supplier cannot be paid on this invoice even if the debtor tries: the money reaches whoever owns the receivable, and the same invoice cannot be sold twice."
- **20 second demo moment.**
  - Three panes show the supplier, debtor and financier.
  - The supplier tries to tokenize the same invoice again: revert `AlreadyAcknowledged`.
  - The debtor pays 1,000 USDT, and the explorer shows it landing at the financier, who bought at 980.
- **Track fit.**
  - Listed idea, verbatim: "Invoice financing where a business tokenizes an invoice, a buyer funds it at a discount and settlement happens automatically on the due date".
  - B: financing makes this Tokenize; the debtor's pay link is part of the lifecycle, not an Operate entry.
  - W1: acknowledgement gating, single financing, holder routing and the overdue state are all in the contract.
  - W2: issuance, the sale and settlement.
  - X: rules everywhere.
  - Q3: "Assignment, discounting and repayment routing are one enforced state; factoring offline needs notices of assignment and trust that the supplier forwards the money."
- **Why Whitechain's judges would pick it over the invoice crowd.**
  - The 2026 invoice entries mostly compete on pricing or AI underwriting (cashmeifyoucan, Facture, sugarc, FactorFlow).
  - This one enforces the leg factoring actually breaks on, which is that payment reaches the right party. Its rule shows in a single revert, and it maps word for word to Whitechain's listed idea.
- **Closest past work, and the difference.**
  - [cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz) and [Facture](https://ethglobal.com/showcase/facture-jy21t) won Hedera prizes.
  - [CreditMesh](https://ethglobal.com/showcase/creditmesh-cs51c), [Sowee](https://ethglobal.com/showcase/sowee-wux84), [Forfait](https://ethglobal.com/showcase/forfait-eam6y) and [sugarc](https://ethglobal.com/showcase/sugarc-vcvhv) show no prizes.
  - Hundi in `reports/ETHGlobal finalist ideas 2023 to 2026.md` covers single financing only.
  - The twist: debtor acknowledgement plus payment routing to the holder.
- **Stack options.** Whitechain Tokenize only. Operate shares the slot, but name Tokenize as primary.
- **Difficulty.** Medium.
- **Team fit.** High.
- **Honest limit.** A colluding supplier and debtor can acknowledge a fake invoice. State it.

### T4. Repo Desk: overnight repo with delivery against payment and automatic close-out (stacks with Chainlink CRE)

- **Pitch.** Tokenized money-market fund shares serve as repo collateral against USDT.
  - The shares are an allowlisted, issuer-controlled token. Their NAV is published by a Chainlink CRE workflow that reads a mock fund administrator API.
  - The opening leg swaps collateral and cash atomically. A margin check runs against NAV with a haircut, and a shortfall opens a margin-call window.
  - If the call is missed, the lender takes the collateral without anyone's approval. At maturity, the repurchase leg is atomic.
- **Falsifiable promise.** "Both legs move in one transaction or neither does. If the borrower misses a margin call, the lender owns the collateral without asking anyone."
- **20 second demo moment.**
  - The explorer shows one transaction with both transfers.
  - The CRE simulation posts a 4% NAV drop, and a margin call starts its countdown.
  - The countdown expires and close-out executes, leaving the collateral in the lender's wallet.
- **Track fit.**
  - Listed idea, verbatim: "Repo or short term lending agreements with delivery versus payment, where the asset and the stablecoin move in one transaction".
  - W1: the collateral can move only between allowlisted repo parties; maturity and margin conditions are in the contract.
  - W2: borrower, lender, open, margin call, close-out.
  - X: rules everywhere.
  - Chainlink CRE: "Integrate at least one blockchain with an external API ... Demonstrate a successful simulation (via the CRE CLI)"; NAV is "meaningfully used".
  - Q3: "Atomic two-leg settlement and rule-based close-out at 1 second blocks; tri-party repo relies on an agent and end-of-day batches."
- **Why the judges would pick it.**
  - Repo is a Whitechain-named instrument, and Hedera's ETHOnline 2026 brief led with "tokenised collateral for repo" (History 3).
  - Delivery-versus-payment is the mechanism behind [Thurman Protocol](https://ethglobal.com/showcase/thurman-protocol-q8iiy)'s Arc Continuity 1st place.
  - Few fresh-build entries will have a tested close-out.
- **Closest past work, and the difference.**
  - Thurman: DvP loan sales, Continuity.
  - [Rialto](https://ethglobal.com/showcase/rialto-psod2): oracle-free lending against tokenized securities on Hedera.
  - The twist: a full repo lifecycle on Whitechain USDT, with an invariant-tested margin and close-out machine and an external NAV through CRE.
- **Stack options.** Whitechain Tokenize plus Chainlink "Best workflow with CRE" ($1,500). Third partner optional.
- **Difficulty.** Medium-high. The risk is whether CRE can write to chain 1874 (workshop question C1).
  - Fallback: the workflow emits a signed NAV report that the team relays to 1874.
  - The workflow still satisfies "Integrate at least one blockchain with an external API" if it reads Whitechain state. Confirm this at the event.
- **Team fit.** Very high (liquidations and margining).

### T5. Clean Bill: trade finance where the bill of lading moves only against USDT (narrow, Whitechain only)

- **Pitch.** An electronic bill-of-lading token, issued by a carrier role, that can move only through the settlement contract.
  - The exporter uploads document hashes, the importer's bank funds the deal in USDT, and the importer confirms inspection.
  - Once every step is confirmed, title goes to the importer and USDT to the exporter in one transaction.
  - A missed deadline expires the deal and refunds the bank.
- **Falsifiable promise.** "The importer cannot take title without the exporter being paid in the same transaction, and no single party, including us, can release either leg early."
- **20 second demo moment.** Four panes show the checklist. An early release attempt reverts `PendingConfirmations(bank)`. The final confirmation swaps title and 25,000 USDT in one explorer row.
- **Track fit.**
  - Listed idea, verbatim: "Trade finance flows where importer, exporter and bank each confirm their step before funds are released".
  - W1: the title token is transfer-restricted and the settlement conditions are in the contract.
  - W2: all four parties and a full settlement.
  - X: ownership is enforced onchain, which is the opposite of the excluded "ownership NFTs where nothing is enforced".
  - Q3: "Title and payment swap atomically on confirmations every party can see; documentary credit runs on couriered paper and bank cut-offs."
- **Why the judges would pick it.** It is a Whitechain-named flow with almost no ETHGlobal precedent among winners. HashKey's Taipei brief named "Supply chain finance and trade asset securitization" without a winner being identifiable in this exact shape (History 3, 4.3).
- **Closest past work, and the difference.** Thurman's DvP pattern and HashKey-lane winners such as [KYCGuard](https://ethglobal.com/showcase/kycguard-xi02i). The twist: a multi-party confirmation gate on an atomic title-for-cash swap.
- **Stack options.** Whitechain Tokenize only.
- **Difficulty.** Medium-low.
- **Team fit.** Medium-high.
- **Risk.** Judges may find it less flashy. Lead with the early-release revert.

---

## 4. Scale · Payments Nobody Notices ($3,000; 1st $2,000, 2nd $1,000)

The verbatim items:
- **D:** "Build a payment flow on Whitechain where the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on."
- **W1:** "A payer flow with zero crypto steps visible, shown in the demo".
- **W2:** "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it".
- **X:** "Flows where the payer still signs a transaction that costs them gas, or AI chats that never actually pay anyone."

### S1. Gas Ledger: a relayer with a gas budget per merchant that refills itself (narrow, Whitechain only)

- **Pitch.** A gasless EIP-3009 checkout.
  - Each merchant prepays a USDT gas budget into a `GasVault`.
  - Every relayed payment reimburses the relayer in USDT from that merchant's budget in the same transaction. The price is a TWAP read from the WWBT/USDT pool's `observe()`, which exists on 1874 today (History 9).
  - A keeper swaps collected USDT into WWBT through SwapRouter02 and unwraps it to refill the relayer.
  - Before submitting, the relayer simulates each payment and stops when that merchant's daily loss bound is reached. A griefer who races `cancelAuthorization` burns only their own merchant's budget.
  - The payer holds a browser key encrypted by a passkey and sees no seed phrase.
- **Falsifiable promise.** "Here is our relayer's address and a script that tries to drain it. Run it: the WBT lost stops at the bound printed on screen for that merchant, every other merchant keeps working, and the refill is an onchain swap you can click."
- **20 second demo moment.**
  - The attack script runs (cancel races, bad signatures, dust spam).
  - Merchant A's gas budget meter hits its cap and turns grey.
  - Merchant B's checkout still completes with Face ID.
  - The refill transaction swaps 12 USDT into WWBT on the explorer.
- **Track fit.**
  - Listed idea, verbatim: "Gasless checkout where the merchant covers gas, using permit or transferWithAuthorization (EIP 3009) and your own relayer".
  - W1: the payer uses Face ID or a fingerprint and sees an amount, with no chain, gas or seed phrase on screen.
  - W2: each of the three questions has a mechanism and a number.
  - X: the payer never signs a gas-costing transaction.
  - Q3: "Settlement that a third party can submit for the payer with the merchant's budget enforced in the same transaction; a card network hides this cost inside the merchant discount rate and offers no public bound."
- **Why Whitechain's judges would pick it.**
  - W2 is the requirement no analog sponsor ever set (History 6), and the simulated review found Plan C's relayer "safe from theft but easy to take offline" (`plans/reviews/judge_whitechain.md` section 4.2).
  - This build answers that criticism with per-merchant isolation and a measured bound.
  - It uses Whitechain's own liquidity for the refill.
- **Closest past work, and the difference.**
  - [PayWiser](https://ethglobal.com/showcase/paywiser-i4i5r) (Circle gasless) and [ArcBeam](https://ethglobal.com/showcase/arcbeam-e0bey) are gasless payments.
  - [Paybot](https://ethglobal.com/showcase/paybot-q7grd) is a facilitator that pays gas.
  - Tollgate in `reports/ETHGlobal finalist ideas 2023 to 2026.md` is the parent idea.
  - The twist: atomic USDT reimbursement per merchant, and a refill route through the real pool.
- **Stack options.** Whitechain Scale, plus Operate in the same slot when merged with O1. No other partner.
- **Difficulty.** Medium.
- **Team fit.** Very high.

### S2. No Single Relayer: gasless checkout that survives its relayer (stacks with EF CROPS)

- **Pitch.** The payer's signed EIP-3009 authorization is the payment. It binds the payee, amount, fee cap and deadline.
  - The widget broadcasts it to several independent relayers: the merchant's, the team's, and a "relay node" anyone can run with faucet WBT.
  - The first to land wins, and the nonce prevents a double spend. Relayers earn the bound fee in USDT and refill through the pool.
  - The README states the last-resort path, forced inclusion through OptimismPortal within about 12 hours (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q3), and its limits.
- **Falsifiable promise.** "Kill our relayer and the merchant's relayer mid-checkout. The payment still lands within seconds through a relay node you can run yourself, and no relayer could change the amount or the payee."
- **20 second demo moment.** Two terminals run `kill` on the main relayers while the payer taps Pay. A third laptop's relay node lights up, and the receipt shows who relayed and the capped fee.
- **Track fit.**
  - D, W1 and X: as in S1.
  - W2: the business pays through the fee bound; relayers refill from the fees through the pool; nobody can drain anyone, because relaying is voluntary and paid inside the transaction.
  - EF CROPS:
    - It leads on C: "a payment ... app where your server learns nothing" sits next to C's "what happens if it goes away or refuses them".
    - It needs a FOSS license, a CROPS section in the README, no trackers, and a video of 3 minutes or less.
  - Q3: "A payment that any party can carry once the payer has signed; an acquirer can refuse a merchant and the payment simply fails."
- **Why the judges would pick it.**
  - Whitechain gets a full Scale flow.
  - The EF gets a structural C property ("works without you" beats "a setting", per its judging line), and the EF payments domain asks that "Relayer- and paymaster-based flows need a user-broadcastable equivalent" (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).
- **Closest past work, and the difference.**
  - [OnchainRouter](https://ethglobal.com/showcase/onchainrouter-8r4jm): "holds no wallet".
  - Plan C's open-relaying option, and Tollgate.
  - The twist: a live multi-relayer race in the checkout widget, with a kill demo.
- **Stack options.** Whitechain Scale plus EF "Best CROPS App" ($3,500). A third partner is optional; Arkiv could serve as the public directory of relay nodes under "service directories". There is one EF prize only.
- **Difficulty.** Medium.
- **Team fit.** High.
- **Trade-off to state.** Whitechain has a single sequencer and permissioned fault proofs.

### S3. Facilitator Under Fire: an x402 facilitator with a published abuse suite (narrow, Whitechain only)

- **Pitch.** A self-run x402 facilitator settling prize USDT on 1874 through EIP-3009.
  - It comes with a business API (a paid data endpoint) and an agent that pays it.
  - It also ships an adversarial harness: replays, reuse across resources, payTo and amount mutation, expired windows, `cancelAuthorization` races, nonce collisions and concurrent double spends.
  - Budgets apply per payer and per resource.
- **Falsifiable promise.** "Our harness fires 10,000 malicious x402 payments at the facilitator live. None settles twice or for the wrong amount, and the facilitator's WBT loss stays under the bound on screen."
- **20 second demo moment.** The agent pays 0.01 USDT per call and the explorer link updates. The harness starts, the counters race to 10,000, and the panel reads "double settles 0, wrong amount 0, WBT lost 0.0031 (bound 0.01)".
- **Track fit.**
  - Listed idea, verbatim: "Pay per request APIs where an AI agent pays a business in USDT over x402, settled on Whitechain through a facilitator you run".
  - W1: the agent is the payer and holds no WBT.
  - W2: answered by the harness numbers.
  - X: the agent actually pays, with explorer links.
  - Q3: "Per-request settlement in under a second with no account or API key; card rails cannot price a 1 cent call."
- **Why Whitechain's judges would pick it.** It is their own listed idea plus their own anti-drain question, answered with evidence rather than prose.
- **Closest past work, and the difference.**
  - [Glassbox402](https://ethglobal.com/showcase/glassbox402-qyepd), [router402](https://ethglobal.com/showcase/router402-b717q) and [x402-flash](https://ethglobal.com/showcase/x402-flash-yj9wd).
  - [Cordon](https://ethglobal.com/showcase/cordon-vw3kh): 1,200 adversarial strategies on the agent side, and no partner prize.
  - The twist: adversarial verification on the facilitator side, on a new chain.
  - Caveat: x402 is crowded at the finalist level (`track_ideas/00_season.md` section 4), so treat this as a Whitechain-only entry.
- **Stack options.** Whitechain Scale only. Hedera's and 0G's agent tracks need their own chains.
- **Difficulty.** Medium-low.
- **Team fit.** Very high.

### S4. Tap and Go: an NFC card that pays USDT with no phone and no gas, with limits in the contract (stacks with World IDKit)

- **Pitch.** An NFC signing card (Arx HaLo type) has a secp256k1 key, so the card is an EOA that holds USDT.
  - At setup, the card signs an EIP-7702 authorization delegating to a minimal `CardLimits` contract: per-tap and daily caps, and a merchant allowlist.
  - The merchant's phone reads the card over Web NFC and gets a payment intent signed. The merchant's relayer submits it.
  - Raising the limit, or freezing a lost card, requires the owner's World ID proof, bound at setup.
- **Falsifiable promise.** "Tap twice for 5 USDT each. The tap over the daily cap is refused by the contract, not by our app, and the payer never sees a wallet."
- **20 second demo moment.** The first tap pays. The second tap shows a red "limit reached (onchain)". The owner verifies with World ID and raises the limit, and the third tap pays.
- **Track fit.**
  - W1: the payer only taps a card.
  - W2: the merchant relayer pays gas, refills through the pool, and bounds its loss per terminal per day.
  - X: the card signs a payment intent, not a gas transaction.
  - World IDKit:
    - "recovery or protection of an important account action": the limit change and the freeze.
    - The alternative path is a different human's proof being rejected.
    - "minimum sufficient assurance" is Proof of Human bound to the owner.
  - Q3: "Spending limits the card's own contract enforces at settlement; a card network enforces them in the issuer's private system."
- **Why the judges would pick it.**
  - It is a device demo, a pattern ETHGlobal finalists favour (`track_ideas/00_season.md` section 3).
  - It ties to the season's 7702 story: a known delegate with hard caps, against the Binance drain's sweeper delegate.
- **Closest past work, and the difference.**
  - [TapTrust](https://ethglobal.com/showcase/taptrust-12smv) and [NFC wallet](https://ethglobal.com/showcase/nfc-wallet-xwuff) (Base AA 2nd).
  - [Taparoo](https://ethglobal.com/showcase/taparoo-qmfc0) (Circle).
  - [Kagi Wallet](https://ethglobal.com/showcase/kagi-wallet-tc9fp) (Tokyo 2026).
  - The twist: a 7702-delegated card EOA with caps in the contract, and limit changes gated by a human credential, settled in Whitechain USDT.
- **Stack options.** Whitechain Scale plus World "Best Use of IDKit". A third partner is optional.
- **Difficulty.** High, because of hardware: HaLo chips must be bought before the event. The fallback is a burner phone acting as the card.
- **Team fit.** Medium.

### S5. TWAP Paymaster: gas paid in USDT, priced from the pool and resistant to manipulation (stacks with Uniswap, if accepted)

- **Pitch.** Passkey smart accounts pay for gas in USDT.
  - P256VERIFY works on 1874, and EntryPoint v0.7 and v0.8 are preinstalled (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q4, Q6).
  - A self-hosted bundler (Alto or Rundler) submits the operations, because Pimlico does not support 1874.
  - An ERC-20 paymaster prices gas from the WWBT/USDT pool TWAP, refuses to sponsor when the spot price deviates from the TWAP beyond a band, and refills its EntryPoint deposit by swapping through the same pool.
  - Mode A charges the payer in USDT. Mode B has the merchant sponsor.
- **Falsifiable promise.** "Push the pool's spot price 10x within a block. The paymaster's USDT quote moves under 1%, and it pauses sponsorship until the pool is back in line."
- **20 second demo moment.** A Face ID checkout completes. An "attacker" swaps 1,000 WWBT into the pool and the spot chart spikes. The paymaster panel shows "quote 0.0021 USDT, unchanged, spot deviation 940%, sponsoring paused".
- **Track fit.**
  - Listed idea, verbatim: "Checkout with an embedded wallet or smart account from any provider that supports Whitechain Sepolia (chain ID 1874)".
  - W1: the payer sees a passkey prompt and an amount.
  - W2: the paymaster's economics, the refill route and the manipulation guard.
  - X: the payer pays in USDT, not WBT, and signs a user operation, not a gas-costing transaction.
  - Uniswap: integrating "the Uniswap AMM (v2, v3, or v4)". Needs `FEEDBACK.md` and the feedback form.
  - Q3: "Gas priced and settled in the payer's own dollars by a public onchain price; no card or wallet provider exposes how it prices network fees."
- **Why the judges would pick it.**
  - It answers W2 with the team's specific expertise, oracle manipulation.
  - Circle's "pay for gas using USDC" track was a recurring 2025 analog, and its winners did not publish a manipulation analysis (History 4.2).
- **Closest past work, and the difference.**
  - [Full Circle](https://ethglobal.com/showcase/full-circle-b091b) (Circle).
  - [Piggy Wallet](https://ethglobal.com/showcase/piggy-wallet-szyeh) (Pimlico paymaster).
  - The twist: a chain with no oracle provider, priced from its own pool and defended against manipulation.
- **Stack options.** Whitechain Scale, plus Uniswap if a third-party v3 deployment counts (workshop question U2). No EF prize.
- **Difficulty.** High (self-hosted bundler).
- **Team fit.** High.

---

## 5. Track combo pass (fresh builds only)

**Within Whitechain (one partner slot).**
- **Merge O1, O5 and S1** into "the merchant stack": a gasless checkout with bounded drain, self-checking books and clerk-safe refunds.
  - Enter Operate as primary and Scale as secondary, and name the primary in the README as `plans/reviews/judge_whitechain.md` asks.
  - Do not expect two Whitechain placements for one team; the simulated review judged that unlikely.
- **T3 with O3.** O3's payee lock becomes the debtor pay link for T3. Enter Tokenize only, because Whitechain's own boundary rule puts financing there.

**Cross-sponsor combos that respect the 3-partner cap and one EF prize.**

| Combo | Partners (max 3) | Shared mechanism | Fit risk |
|---|---|---|---|
| O3 Payee Lock | Whitechain, ENS | ENSv2 roles and expiring subnames as the invoice record | Which ENSv2 calls work on Sepolia |
| O4 Duebook | Whitechain, Arkiv, EF CROPS | Arkiv entities as the invoice store; C means works without our server | CROPS "P" trade-off for public invoices |
| T1 Coupon Clock | Whitechain, World IDKit | Passport credential to eligibility registry to transfer hook | Server-verified proof trust |
| T2 Yield Auction | Whitechain, Uniswap, World IDKit | CCA with an allowlist hook | Uniswap acceptance of a CCA on 1874 |
| T4 Repo Desk | Whitechain, Chainlink CRE | CRE NAV feed driving margin calls | CRE write support for 1874 |
| S2 No Single Relayer | Whitechain, EF CROPS, optional Arkiv | Relay node directory | Single sequencer trade-off |
| S4 Tap and Go | Whitechain, World IDKit | Limit change gated by World ID | Hardware supply |
| S5 TWAP Paymaster | Whitechain, Uniswap | Pool TWAP pricing and refill | Third-party v3 deployment |

**Not combinable with a Whitechain build:** Arc (Arc Studio and Arc chain), Hedera, 0G, 1inch Aqua, Definitive, and the EF alternative mempool (EF devnets) (`track_ideas/00_current_tracks.md`).

**Finalist angle.** Partner judging and finalist judging reward different things (History 8). The ideas with a single live beat for the 4-minute finalist demo are:
- O5: the audience holds the clerk key.
- S1: the drain script.
- T1: the note defaults by itself.
- O3: the stolen bot key.

Build the partner submission (README and a 2:00 to 2:59 video in Whitechain's vocabulary) separately from the finalist demo.

---

## 6. Workshop questions

**Whitechain (Thu 5 Nov 16:30 to 16:50 IST, Workshop Room 2; clashes with Uniswap's workshop, so split the team)**
1. W1. Is there an official route to the prize USDT `0xcedf...55a7`? Does swapping faucet WBT for it on the v3 pools (factory `0x94afa2ab...`, WWBT/USDT pool `0x5645...F999`) count as a qualifying USDT payment source? Who runs those pools, and is YetiTrade the operator?
2. W2. Does the mainnet USDT expose EIP-3009 like the testnet TetherTokenV2? Is there a `bytes signature` (EIP-1271) variant so smart-account payers can use `receiveWithAuthorization`?
3. W3. Is any upgrade, pause or blocklist action planned on the prize USDT during the event?
4. W4. Can one team place in both Operate and Scale with one product, and how should the primary track be declared?
5. W5. For "adds in about 20 lines": do you count only the demo app's diff, and do config and env lines count?
6. W6. For Tokenize, does an allowlist written by a server after an off-chain proof (World ID, KYC) count as "enforced in the contract" if the token checks it on every transfer?
7. W7. What production WBT source would you accept in a relayer write-up: the DEX, WhiteBIT, or a partner programme? Is the 200 rps partner RPC tier available to hackers?
8. W8. Is the Safe UI live for Whitechain Sepolia (`wch-sepolia:`), for O5?
9. W9. Will Sepolia activate Karst before judging, and which EVM target do you recommend?
10. W10. Which docs page should `WHITECHAIN_FEEDBACK.md` reference for gaps you already know about, so the team does not repeat them?

**Other sponsors, for the stacks above**
- U1 (Uniswap, Thu 16:30). Does a team-deployed CCA on Whitechain Sepolia count as "integrate any part of the Uniswap stack"?
- U2 (Uniswap). Does a third-party Uniswap v3 deployment (the 1874 factory) count, or must it be a Uniswap Labs deployment?
- C1 (Chainlink). Can a CRE workflow write to chain 1874? If not, does a CRE simulation that reads 1874 over HTTP and emits a signed report qualify?
- Y1 (World). Is server-side IDKit verification feeding an onchain registry on a non-World chain acceptable, and which credential would World call minimum sufficient for investor eligibility?
- E1 (ENS, Thu 16:00). Can an ENSv2 Permissioned Resolver hold an ENSIP-11 address for chain 1874, and can Enhanced Access Control scope a role to named text records only?
- A1 (Arkiv, Thu 16:00). Are invoice entities with expiry at the due date in scope for "Build on Arkiv", and what are the size and expiry limits on entities?
- F1 (EF, Thu 17:00). Does a multi-relayer checkout with a forced-inclusion fallback count as structural C for CROPS, given Whitechain's single sequencer?

---

## 7. Risks common to every idea

- **The prize USDT gate.** The pool route (History 9) is promising but unverified until a real swap lands. Do one small swap before Thursday 21:00, as environment setup with no project code, and record it.
- **The pool TWAP (S1, S5) is unverified.** The pools may hold only one observation slot. Read `slot0().observationCardinality` on day one, and if it is 1, call `increaseObservationCardinalityNext` and let the observations fill before relying on `observe()`.
- **Public RPC at 50 rps per IP.** Batch requests, use Multicall3, and keep the harnesses (S1, S3) behind rate-aware clients (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q3).
- **No hosted bundler or embedded wallet on 1874.** Self-host, or use EIP-3009 with a browser key (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q6).
- **Invoice crowding in Tokenize.** If the team picks T3, its README's first line must be the enforcement claim, not "invoice financing".
