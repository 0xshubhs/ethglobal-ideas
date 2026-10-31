# Arc at ETHGlobal Mumbai: idea draft (fresh builds only)

Written 2026-10-31. Inputs: `track_ideas/00_current_tracks.md` (Arc section, verbatim prize text), `track_ideas/00_season.md`, `track_ideas/history/arc.md` (past Arc tracks, 30 winners, non-winner comparison), the finalist catalogues and `plans/`. The Arc Continuity track ("Bring Your Project to Arc") is ignored: every idea below starts from an empty repo after Thu 5 Nov 21:00 IST and uses only public libraries, SDKs and starter kits.

Sourced facts carry a link or point to the history file (H, with section number). Everything else is **Judgement**.

## 0. Rules every Arc idea must meet

Four tracks, each "$3,000 (single winner)" ([Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc)). Arc counts as one partner slot whichever tracks you enter. Sponsor-level rule, verbatim: "Every Arc prize requires using Arc Studio as the starting point. Please state which bounty you're submitting for in your submission."

Shared qualifications, verbatim (identical on all four tracks):

- R1 "**Built in Arc Studio.** Include your Arc Studio project URL and show Studio in your demo."
- R2 "**Functional MVP and diagram:** Projects must demonstrate a working frontend and backend plus an architecture diagram."
- R3 "**Video demonstration + presentation:** Succinctly outline the project's core functions and its effective use of Arc Studio and Circle's developer tools, supported by detailed documentation."
- R4 "**Link to GitHub/Replit repo**"

No "Won't place" list is published on any Arc track. From history (H 4.2) the implicit loss factors are: a pass-through integration with no Arc contract holding funds, a mocked core dependency, generic crosschain UX, and (new at Mumbai) not using Studio.

**Judgement: how to satisfy R1 without losing control of the code.** The Arc Studio sandbox "is a Vite and Foundry app"; the CLI round-trips our own files with `--file src/X.sol:contracts/X.sol` and returns diffs, deploys to Arc testnet (5 to 20 minutes per deploy) and `pull`s artifacts back ([Arc Studio CLI](https://docs.arc.io/ai/arc-studio-cli.md)). Plan: create the app in the Studio web workbench in the first hour (prompt, template, first deploy, so the project URL exists), then drive it from Claude Code with `arc-studio skills install --tool claude-code`, keep every prompt and diff under `/studio/` in the repo (this also meets ETHGlobal's AI attribution rule), and record 15 seconds of the Studio workbench (chat, deployments list, live preview) for the video. Contracts we write by hand still go through Studio's compile, test and deploy so Studio is visibly "the starting point". Ask at the workshop whether that is enough (question W1).

Shared deliverables for every idea: README with the bounty named in the first line, the Studio URL, an architecture diagram (PNG plus Mermaid source), a "Circle tools used" table with file and line links, a short Studio feedback section (HackMoney weighted feedback heavily; H 3.2), a 2:00 to 2:59 video.

## 1. Track A: Best DeFi / Onchain Finance App Built End to End in Arc Studio

Verbatim ask: "Build a DeFi or onchain finance application on Arc, using USDC or EURC for settlement. Prompt Arc Studio with the app you want. If it needs smart contracts, Arc Studio writes and tests them for you." Looking for: "Trading apps, including trading with tokenized real-world assets (RWAs)"; "Lending and borrowing, credit, and collateral systems"; "Payments and liquidity infrastructure (for example, a credit co-op)"; "Neobanks for consumers or businesses".

Nearest past winner: T-REX Capital Market (ETHOnline 2026, ERC-3643 capital markets) and ArcFlow (HackMoney payroll treasury). History says this track rewards institutional vocabulary, an Arc contract that holds USDC, and two to four Circle products (H 4.2).

### A1. Bhishi: a credit co-op whose books always balance (stacks with World IDKit)

- **Pitch.** A Mumbai bhishi (rotating savings and credit group) on Arc: members pay USDC each month, the month's pot goes to the member who accepts the deepest discount in a sealed-bid auction, the discount is shared among the others as interest, and a member who misses a payment loses their bond instead of breaking the group.
- **Falsifiable promise.** With 8 members and 8 rounds, a member who misses a payment cannot bid, their bond covers the shortfall, and `sum(paid out) + sum(refunded) == sum(paid in)` to the wei at every round; the Medusa campaign started on stage finds no counterexample, while the same campaign breaks our deliberately buggy v0 contract within a minute.
- **20 second demo.** Four phones in a row; one member skips; their "Bid" button greys out with "bond used: 25 USDC"; the screen cuts to the fuzzer, red on v0 and green on v1.
- **Requirements.** USDC settlement on Arc; "Payments and liquidity infrastructure (for example, a credit co-op)" is the sponsor's own example, and the bond and discount make it a "credit, and collateral" system too. R1: Studio generates the UI scaffold and the test harness; our auction and bond contracts are round-tripped and deployed through Studio. R2: Next.js frontend, a small backend that runs the monthly clock and reveal reminders, diagram. Arc-specific detail: `PREVRANDAO` "Always returns `0`" on Arc ([EVM differences](https://docs.arc.io/arc/references/evm-differences.md)), so the draw is an auction, never a lottery; we say that in the README.
- **Why Arc judges pick it.** It matches a listed bullet literally, a contract holds the money and refuses, and it has the social impact the Cannes recap praised. Cumulant won New York with "fuzz invariants for market solvency" (H 3.4); this makes the same proof the centre of the demo.
- **Closest prior work.** cheat.fund (New Delhi 2025 finalist, transparent chit funds) and ROSCA-Guard (PYUSD savings circles) in the finalist catalogue; Trust Circle (Cannes 2026, no Arc prize). Twist: discount auction plus default bonds plus a conservation invariant proven live, settled in native Arc USDC, with no INR ramp.
- **Stack options.** World "Best Use of IDKit" (the text asks for "fair access to a scarce benefit"; one human, one seat, so a member cannot join twice and bid against themself). Arc plus World is two partner slots. No EF prize fits. Finalist track: yes.
- **Difficulty.** Medium (about 24 hours of contract and test work, 8 of UI).
- **Team fit.** High: auction and accounting invariants are audit work.

### A2. Solvent: a neobank that proves it can pay everyone, every epoch (stacks with Chainlink CRE)

- **Pitch.** A consumer neobank on Arc with instant internal transfers on an offchain ledger, where each epoch the operator commits a Merkle sum tree of all balances and the reserve vault refuses any operator withdrawal that would leave reserves below committed liabilities; if commitments stop, users exit with their own inclusion proof.
- **Falsifiable promise.** The operator key tries to move 1 USDC of reserves while reserves equal liabilities: the vault reverts with `ReservesBelowLiabilities`. A user's phone verifies their own inclusion proof against the onchain root; a root posted without the independent attestation is rejected; after two missed epochs a user withdraws their balance with only their proof.
- **20 second demo.** "Binance lost $6.36B on 29 Oct. Can your bank prove it is solvent right now?" Tap "verify me", green tick; operator drain attempt, revert on the explorer.
- **Requirements.** "Neobanks for consumers or businesses"; USDC settlement on Arc. R1: Studio builds the consumer app and the vault; R2: ledger backend, CRE workflow, app, diagram.
- **Why Arc judges pick it.** A contract that refuses on stage, a proof any user can check, and a timely hook (`00_season.md` signal 1). Five past Arc winners used Chainlink CRE (H 4.2).
- **Closest prior work.** Exchange proof-of-reserves with Merkle sum trees is old, but those are reports, not enforcement. No Arc winner did proof of liabilities. VEIL VPN won by proving a claim instead of asserting it (H 3.3). Twist: the solvency check gates withdrawals onchain, plus a rollup-style escape hatch.
- **Stack options.** Chainlink "Best workflow with CRE": the workflow reads the ledger API, recomputes the root and writes a signed report that the vault requires ("Integrate at least one blockchain with an external API" and "simulation via the CRE CLI" are both met). Optional third: World IDKit for account recovery. No EF prize.
- **Difficulty.** Medium to high (Merkle sum proofs in Solidity and TypeScript, escape hatch, CRE simulation).
- **Team fit.** High.

### A3. Two Key: a business account where a stolen key is not enough (narrow, Arc only)

- **Pitch.** A business neobank account on Arc held in a contract account whose signers are revocable keys: new payees cool off for 24 hours above a small amount, transfers above a threshold need a second passkey, and the confirmation screen decodes the exact calldata the contract will check.
- **Falsifiable promise.** We hand the finance lead's signer key to an "attacker" on stage: a 50,000 USDC transfer to a fresh address reverts with `PayeeCoolingOff`, and a transfer to a known payee above the cap waits for the second passkey; revoking the stolen signer takes one transaction and its next signature fails.
- **20 second demo.** Split screen: attacker terminal versus the CFO's phone getting "approve 50,000 USDC to 0x9f...?" and pressing Deny.
- **Requirements.** "Neobanks for ... businesses" and "Payments"; USDC on Arc. We state in the README why the money is not in an EIP-7702-delegated EOA: whoever holds the root key can re-delegate (the Binance drain used 50 pre-signed authorizations; `00_season.md` signal 1), and Arc supports EIP-7702 ([EVM differences](https://docs.arc.io/arc/references/evm-differences.md)).
- **Why Arc judges pick it.** A named contract refusing a real attack. **Risk:** guards are crowded (`00_season.md` calls "a guard alone" the sixth of its kind), and AutoPay and xpayables lost Arc tracks with policy layers (H 4.1). Ranked low for that reason.
- **Closest prior work.** AutoPay (`ArcPolicyManager`, HackMoney finalist, no Arc prize), xpayables (offchain gateway, no prize), Manila (offchain policy engine, won private nanopayments). Twist: enforcement in the account plus a live key-theft replay.
- **Stack options.** Narrow: Arc only (optional World IDKit as the second factor, which would make it a stack).
- **Difficulty.** Medium. **Team fit.** High.

### A4. Overnight: a six-hour repo of tokenized T-bills against USDC (narrow, Arc only)

- **Pitch.** Intraday repo on Arc: a lender sends USDC, a borrower posts USYC (tokenized money market fund shares, which Arc's docs list among supported stablecoin-model assets; [EVM differences](https://docs.arc.io/arc/references/evm-differences.md)) with a haircut, and at maturity the contract unwinds as delivery versus payment; on default the lender takes the collateral in the same transaction.
- **Falsifiable promise.** At maturity one call closes the repo; if the borrower is short by any amount, the collateral moves to the lender atomically, and a fuzz campaign over price paths shows the lender is never under water at close while the price move stays within the haircut.
- **20 second demo.** A clock runs to maturity; the borrower's repay button is not pressed; at T the lender's balance shows the USYC; the invariant panel stays green.
- **Requirements.** "Trading with tokenized real-world assets" and "Lending and borrowing, credit, and collateral systems"; USDC settlement. Gate: USYC must exist on Arc testnet for hackathon wallets (workshop W7). If it does not, the collateral leg becomes EURC against USDC (a cross-currency repo), never a mock token, because mocked core dependencies lost before (H 4.2).
- **Why Arc judges pick it.** Institutional vocabulary (T-REX and Thurman's DvP won; H 3.4, 3.5) and an RWA the sponsor itself issues.
- **Closest prior work.** Thurman (DvP loan sales, Continuity), T-REX (regulated issuance). Twist: time-boxed repo with haircut and atomic default.
- **Stack options.** Narrow. Optional Chainlink CRE for the NAV feed if the team wants a second slot.
- **Difficulty.** Medium. **Team fit.** High.

### A5. Band: an EURC/USDC pool whose hook will not trade off-market (stacks with Uniswap Foundation, gated)

- **Pitch.** A Uniswap v4 EURC/USDC pool with a hook that refuses swaps priced outside a band around a reference EUR/USD rate, so FX liquidity providers on Arc cannot be picked off when the rate moves, with a simple FX app for euro earners on top.
- **Falsifiable promise.** After we move the reference rate by 1%, a swap at the stale pool price reverts in the hook with `OutsideBand`; a swap inside the band fills; over a replayed day of EUR/USD ticks, LP loss to stale-price arbitrage is shown as a number next to an unbanded pool.
- **20 second demo.** Two charts: unbanded pool bleeding to an arbitrage bot, banded pool flat; then the revert.
- **Requirements.** "Trading apps" with EURC and USDC on Arc. **Gate:** only if Uniswap v4 is deployed on Arc testnet (Arc Studio is said to integrate Uniswap; [crypto.news](https://crypto.news/circle-launches-arc-studio-ai-agent-for-building-onchain-apps/)); verify at the Uniswap (16:30) and Arc (17:00) workshops (W10). If not, drop this idea.
- **Why Arc judges pick it.** FX is in Arc's own About text and arctan(x) won with FX (H 3.2). **Risk:** oracle-band hooks are common in Uniswap tracks; the twist must be the FX framing and the replayed number.
- **Closest prior work.** arctan(x) (FX perps), BulwArc and Prediction FX (no Arc prize; one used a mocked feed).
- **Stack options.** Uniswap Foundation "Build with Uniswap" ($10,000, four places; needs FEEDBACK.md and the feedback form). Arc plus Uniswap is two slots.
- **Difficulty.** Medium. **Team fit.** High.

## 2. Track B: Best Mobile Web Consumer Agent Using the Marketplace Discovery API

Verbatim ask: "Use Arc Studio to build a web app where a consumer's agent discovers services through the API and pays for them in USDC on Arc, with no crypto knowledge needed from the user." Looking for: "An agent that finds and selects services through the marketplace discovery API"; "Per-use payments with Nanopayments"; "Consumer controls such as spend limits, approvals, and a history of what the agent bought"; "A mobile-first experience a non-crypto user could pick up immediately". The prize text still says "[Add API docs link.]".

Facts that shape every idea here (H 6): the public endpoint is `https://api.circle.com/v2/x402/discovery/resources` with no key; on 2026-10-31 it listed 2,839 services, 2,185 accepting Arc mainnet, 134 on Arc testnet, 277 on Arc mainnet with Gateway at $0.01 or less. Nanopayments "require EOA signatures and do not support ERC-1271" ([Circle](https://developers.circle.com/gateway/nanopayments.md)), and the buyer's Gateway deposit is what authorizations spend. Agent Wallet spending policies "apply to mainnet agent wallets only".

**Judgement on this track.** It will be the most crowded Arc field: 98% of Cannes entries were agentic (H 3.3). Winning needs controls that the agent cannot talk its way past, shown on a phone, plus real service purchases.

### B1. Fixed Price: your agent cannot pay more than the listing said (narrow, Arc only)

- **Pitch.** A mobile web assistant that answers questions by buying from Discovery API services, where each purchase is bound to the terms captured at discovery (`payTo`, `amount`, `asset`, `network`); if the service's 402 challenge differs, the agent refuses and records why.
- **Falsifiable promise.** Through a test proxy that rewrites a real listing's 402 to ask 50 times the listed price and a different `payTo`, the agent refuses, the spend counter does not move, and history shows "refused: terms changed after discovery"; every paid answer in history links its Gateway authorization.
- **20 second demo.** Phone: "Ask: best SIP for 5 years?" Three services bought for $0.004 total, receipts listed; then the tampered service, a red "refused" row.
- **Requirements.** Discovery API selection by category and `maxUsdPrice`; Nanopayments per use; spend limits (daily cap enforced by the signer service, hard ceiling equal to the Gateway deposit), approvals above a per-purchase threshold, purchase history; mobile-first PWA with email sign-in and no seed phrase. R1: the app is generated and iterated in Studio.
- **Why Arc judges pick it.** Every bullet is visible on one screen, and the refusal is the kind of guarantee winners showed (OpenBook's `SlaNotMet`; H 3.5).
- **Closest prior work.** OnchainRouter ("No answer, no charge", ETHOnline finalist, no Arc prize), Agent Bazaar and Spigot (no prize), xpayables (policy gateway, no prize). Twist: binding payment to discovery terms, consumer-facing.
- **Stack options.** Narrow: Arc only.
- **Difficulty.** Low to medium. **Team fit.** Good (it is a signing-safety product).

### B2. Forward Check: a scam second opinion for WhatsApp forwards (stacks with 0G)

- **Pitch.** Share a forwarded message or screenshot ("guaranteed 3% a day", a token tip, a job offer) and the agent buys two to four independent checks (web search, social intelligence, financial analysis) for a few cents, then answers in plain Hindi or English with the evidence and receipts.
- **Falsifiable promise.** Each verdict cites the services bought, what each cost and its receipt; the session never exceeds the 5 cent cap; a fifth purchase that would cross it asks the user, and "No" stops the agent with nothing charged.
- **20 second demo.** A grandparent's phone receives a forward, taps Share to Forward Check, and gets "Likely scam: 3 sources" in Hindi with the receipts.
- **Requirements.** All four bullets; services chosen per claim type through the API's `category` filter. **Judgement:** the India consumer framing is the hook, not an INR ramp (INR ramps are fading; `00_season.md`).
- **Why Arc judges pick it.** Non-crypto users and social impact won before (Text-to-Chain, Onda; H 3.2, 3.3).
- **Closest prior work.** C.E.S.T.A (voice consumer agent, Cannes 2nd); no past entry did misinformation checks. Twist: verdict with paid, cited evidence.
- **Stack options.** 0G "Build with 0G PC": screenshot reading and reasoning on 0G Private Computer with request IDs in the main flow (`qwen vision` is in 0G's model table); the AI call cannot be removed without breaking the product, which answers 0G's "Not wanted" line. Arc plus 0G is two slots.
- **Difficulty.** Medium. **Team fit.** Medium (more product than security).

### B3. Ask Me First: purchases above a line need a fresh human check (stacks with World Agent Pass)

- **Pitch.** A consumer agent that buys freely below a threshold, but for anything above it, or in a new category, pauses and asks the owner to complete a fresh World ID Agent Pass verification on their phone before it signs.
- **Falsifiable promise.** Above $0.50 the agent stops; cancel or expiry leaves the cap and balance unchanged and no authorization is signed; approval is validated in the backend before the signer releases the payment.
- **20 second demo.** "Buy a full company report ($0.80)?" World prompt, cancel, nothing charged; retry, approve, report delivered.
- **Requirements.** All four Arc bullets; World asks for "a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur" and backend validation, which this demo contains by design.
- **Why Arc judges pick it.** Approvals are an explicit bullet. **Risk:** World and Arc stacks are common (VEIL, Vouch, Mars; H 3.3, 3.4), so originality is moderate.
- **Closest prior work.** Verified Agent Rails (World plus Arc caps, no prize), Mars (World AgentKit plus Arc escrow, won).
- **Stack options.** World "World ID Agent Pass" ($5,000, three places). Arc plus World is two slots.
- **Difficulty.** Medium. **Team fit.** Medium.

### B4. Pocket: the cap is the deposit (narrow, Arc only)

- **Pitch.** A student allowance agent: a parent tops up a per-student Gateway balance each week, and that balance is the hard ceiling no software bug can exceed; inside it, per-category budgets and approval requests go to the parent's phone.
- **Falsifiable promise.** We export the agent's signing key and sign authorizations worth 3 USDC against a 2 USDC weekly deposit: Gateway settles at most 2, and the app's ledger matches Gateway's to the cent.
- **20 second demo.** The parent's phone shows "2.00 left this week"; the raw-key attack runs; the counter stops at 0.00.
- **Requirements.** All four bullets. Gate: confirm that Gateway refuses authorizations beyond the deposited balance at verify time, not only at batch settlement (W4).
- **Why Arc judges pick it.** It turns a Circle product limit (EOA-only signatures) into a safety feature, which shows the team read the docs.
- **Closest prior work.** Piggy Wallet (kids' savings, Circle Dollar Access winner 2024), C.E.S.T.A (`GroupTreasury` caps). Twist: the ceiling lives in Circle's own balance, not in our code.
- **Stack options.** Narrow.
- **Difficulty.** Low to medium. **Team fit.** Good.

### B5. Bolo: a voice errand agent for people who do not type English (stacks with 0G)

- **Pitch.** Speak in Hindi or Marathi; the agent transcribes, picks research services from the Discovery API, pays per call and reads the answer back, with a weekly cap and a spoken "approve" for anything above it.
- **Falsifiable promise.** Every spoken request ends in a history row with the service, price and receipt; the weekly cap is never exceeded; asking for a paid item above the per-item limit without the spoken approval leaves the balance unchanged.
- **20 second demo.** "Kal Pune mein baarish hogi kya, aur train late hai kya?" Two services bought, answer spoken back, two rows in history.
- **Requirements.** All four bullets, voice first on mobile web.
- **Why Arc judges pick it.** C.E.S.T.A won 2nd at Cannes with a voice agent (H 3.3); this one is for a user who cannot use a text UI at all.
- **Closest prior work.** C.E.S.T.A; Text-to-Chain (feature-phone access, HackMoney 2nd).
- **Stack options.** 0G "Build with 0G PC" with `whisper-large-v3` from 0G's model table ("voice apps are welcome here"). Arc plus 0G; optional World Agent Pass as the approval.
- **Difficulty.** Medium. **Team fit.** Medium.

## 3. Track C: Best Smart Contracts with Advanced Stablecoin Logic, In Arc Studio

Verbatim ask: "Write, test, and deploy smart contracts in Arc Studio that demonstrate advanced programmable logic using USDC or EURC, such as conditional flows, onchain automation, or multi-step settlement. Then connect them to a web or mobile app, new or existing, without leaving Studio." Looking for: "Conditional escrow with onchain dispute and automatic release"; "Programmable payroll or vesting in USDC or EURC"; "Treasury management and payment splitting, such as revenue splits and team or DAO payouts"; "Software-to-software payments, where one service or agent pays another"; "Crosschain "conditional transfer" (escrow on source, release on destination via Circle Forwarder) [confirm reachable from Studio]"; "Bonus consideration for contracts designed to be reused by other builders".

This track repeats for the fourth time (H 5.1). Past winners: OneTx, Coco, Onda, PayMate, OpenPop, WorldColony. **Judgement:** this is the team's strongest track; the reuse bonus rewards exactly the kind of tested library auditors write.

### C1. ArcSafe Split: a payout splitter that one bad payee cannot jam (narrow, Arc only)

- **Pitch.** A reusable splitter and payroll contract for Arc that survives Arc's own failure modes: a recipient that is blocklisted or rejects native USDC, 18-decimal native versus 6-decimal ERC-20 truncation, value sent to the zero address, and `SELFDESTRUCT` moving a contract's USDC out; a failed share is escrowed for a pull claim instead of reverting the batch.
- **Falsifiable promise.** A 50-payee DAO payout where one payee is a contract that rejects native USDC: a naive splitter reverts all 50; ArcSafe pays 49 and escrows 1; the invariant `paid + escrowed == funded` holds over a million fuzz runs; the 18-decimal dust case leaves zero unaccounted wei.
- **20 second demo.** Two "Run payroll" buttons side by side: naive (red, all reverted) and ArcSafe (49 green, 1 amber "claimable").
- **Requirements.** "Treasury management and payment splitting, such as revenue splits and team or DAO payouts"; "Bonus consideration for contracts designed to be reused by other builders" (published as a Foundry package with an ERC-7730 descriptor so wallets show "Pay 50 recipients 12,400 USDC"). Written, tested and deployed in Studio, with a DAO payout web app generated in Studio. Source for every failure mode: "The blocklist is enforced at runtime", "Sending native value to a contract isn't guaranteed to succeed", "Transfers to the zero address are forbidden", and the two-interface USDC model ([EVM differences](https://docs.arc.io/arc/references/evm-differences.md)).
- **Why Arc judges pick it.** A reusable contract that only makes sense on Arc, which shows the team read the EVM differences, plus a visible guarantee. Rival entries in this track have been apps (Onda, PayMate, OpenPop), so a library is a different shape of entry.
- **Closest prior work.** ArcFlow, starc and Manila (payroll on Arc), 0xSplits (not Arc-aware). Twist: Arc-specific failure isolation and invariants.
- **Stack options.** Narrow.
- **Difficulty.** Low to medium (about 20 hours). **Team fit.** Excellent.

### C2. Final Offer: escrow with baseball-arbitration disputes (narrow, Arc only)

- **Pitch.** Milestone escrow in EURC or USDC for European clients hiring Indian freelancers: funds release automatically after a review window; a dispute starts final-offer arbitration, where both sides commit sealed offers, reveal them, and a staked arbiter must pick one of the two numbers and cannot split the difference.
- **Falsifiable promise.** The client disputes, both commit, the client fails to reveal in time, and the freelancer's offer wins with no arbiter call; any arbiter call that names a third amount reverts; with no dispute, anyone can trigger release at the deadline and the client cannot stop it.
- **20 second demo.** A timeline with three lanes (no dispute, dispute with both reveals, dispute with a no-show), each ending in the onchain payout.
- **Requirements.** "Conditional escrow with onchain dispute and automatic release". Arc has no native scheduler, so "automatic" is a permissionless `release()` after the deadline plus a small keeper in the backend; we say so.
- **Why Arc judges pick it.** A named market (cross-border freelance) and a new mechanism rather than another escrow. Generic task escrows lost (Clawback, arbiter; H 4.2).
- **Closest prior work.** Clawback (AI-adjudicated, no Arc prize), arbiter (challenge and timeout, no prize), OpenPop (proof-gated release, won). Twist: final-offer arbitration with commit and reveal.
- **Stack options.** Narrow.
- **Difficulty.** Medium. **Team fit.** High (mechanism and game-theory review is audit work).

### C3. Landed: trade escrow released by an attested delivery, with a bonded challenge (stacks with Chainlink CRE)

- **Pitch.** An importer funds USDC; a Chainlink CRE workflow reads a shipment-tracking or e-invoice API and posts a signed "shipped" and then "delivered" report; 30% releases on shipment and 70% after a challenge window in which the importer can freeze the release by posting a bond.
- **Falsifiable promise.** A report not signed by the workflow is rejected; a delivered report releases nothing until the window closes; a bonded challenge freezes the 70% and routes it to dispute; without a challenge the release completes in one permissionless call.
- **20 second demo.** A map pin moves to Mumbai port; 30% lands; the importer challenges; the 70% stays locked.
- **Requirements.** "Conditional escrow with onchain dispute and automatic release" and "multi-step settlement".
- **Why Arc judges pick it.** OpenPop won this track at New York with a CRE-gated escrow (H 3.4), so the judges already like the shape. **Risk:** it is close to a past winner; the staged release and bonded challenge are the twist and must be in the first 30 seconds.
- **Closest prior work.** OpenPop (won), PayMate (CRE role), Thurman (DvP).
- **Stack options.** Chainlink "Best workflow with CRE". Arc plus Chainlink is two slots.
- **Difficulty.** Medium. **Team fit.** High.

### C4. Tally: per-call payments for smart-account payers (narrow, Arc only)

- **Pitch.** Gateway Nanopayments only accept EOA signatures ([Circle](https://developers.circle.com/gateway/nanopayments.md)), so a DAO treasury or any smart account cannot pay per call. Tally is a reusable contract: the smart account deposits USDC and sets a per-period cap and a scoped session key; the paid service submits the latest cumulative usage receipt, and the contract pays the difference since the last claim, never above the cap.
- **Falsifiable promise.** Replaying an old receipt pays nothing, a receipt above the cap reverts, and a receipt signed after the session key was revoked reverts; a service that submits receipt 900 after receipt 1,000 gets zero.
- **20 second demo.** A meter ticks as an agent calls a service; the attacker tab replays receipts; the contract balance does not move.
- **Requirements.** "Software-to-software payments, where one service or agent pays another" and the reuse bonus.
- **Why Arc judges pick it.** It fills a gap in Circle's own stack and says so with the doc quote.
- **Closest prior work.** Payment channels are old; Sidekick and VEIL used Nanopayments directly (H 3.3, 3.4). Twist: built for ERC-1271 payers on Arc with a cap and revocation.
- **Stack options.** Narrow.
- **Difficulty.** Medium. **Team fit.** High.

### C5. Either Way: crosschain conditional transfer with a refund if nobody says yes (stacks with Chainlink CCIP, gated)

- **Pitch.** A buyer escrows USDC on Base Sepolia; when the seller's delivery is confirmed on Arc, a message releases the escrow, which burns through CCTP with the Forwarding Service so the seller's USDC is minted on Arc without the seller holding a Base wallet; if no confirmation arrives by the deadline, anyone can refund the buyer on Base.
- **Falsifiable promise.** Timeout path: after the deadline the buyer gets 100% back on Base and a late confirmation reverts; release path: one confirmation on Arc ends with the seller's USDC on Arc, minted by the Forwarding Service.
- **20 second demo.** Two lanes, release and refund, each with a Base and an Arc explorer tab.
- **Requirements.** The listed bullet "Crosschain "conditional transfer" (escrow on source, release on destination via Circle Forwarder) [confirm reachable from Studio]". **Gate:** Studio must be able to build or reach the Base side (W2). The Forwarding Service is documented in App Kit ([use Forwarding Service](https://docs.arc.io/app-kit/tutorials/bridge/use-forwarding-service.md)).
- **Why Arc judges pick it.** It is a listed bullet that few teams will finish because it crosses chains. Thurman used `depositForBurnWithHook()` with the Forwarding Service and won Continuity (H 3.4).
- **Closest prior work.** Thurman. Twist: the refund path and the Arc-side confirmation.
- **Stack options.** Chainlink "Best use of Chainlink CCIP 2.0" if a CCIP lane to Arc testnet exists (W10): the Arc confirmation travels to Base by CCIP, which is the "state change" Chainlink requires. Otherwise narrow, with our own relayer.
- **Difficulty.** High. **Team fit.** Medium.

## 4. Track D: Best Use of Bridge Kit for Non-USDC Assets, Built in Arc Studio

Verbatim ask: "Use Arc Studio to build an application, protocol, or developer tool that uses CCTP via Bridge Kit for non-USDC assets to make assets meaningfully crosschain." Looking for: "Applications that move non-USDC assets across chains in a single, simple user flow"; "Protocols or developer tools that make a new asset crosschain"; "Crosschain flows that settle or pair with USDC or EURC on Arc".

Facts (H 6): Bridge Kit accepts `token: 'cirBTC' | 'wETH' | 'EURC'` or a bytes32 token id and routes those through CCTPx ([README](https://cdn.jsdelivr.net/npm/@circle-fin/bridge-kit@1.17.0/README.md)); EVM domains Ethereum, Avalanche, OP, Arbitrum, Base, Polygon and Arc Testnet; custom tokens keep "rate limits, denylist, pause, and upgrade controls"; hooks are atomic and need self-relay; documented traps include a zero rate limit, a missing minter role, ownerless configuration on more than one chain ("will lock supply") and a denylist provider that "replaces, it does not chain".

**Judgement on this track.** Likely the thinnest Arc field at Mumbai: the product shipped on 16 to 23 Sep, it needs two chains, and the last Bridge Kit track (Buenos Aires) went to a single gasless sender. It is also where a security team's habits (reading every revert in the contract reference) show best.

### D1. Preflight: catch the misconfigurations that brick a crosschain token before you ship (narrow, Arc only)

- **Pitch.** A developer tool and web dashboard that takes a token and its intended CCTPx domains, reads both sides, and flags every documented trap before the first transfer: decimals mismatch, `TokenManager` without the minter role, `rateLimit` of zero, one-sided domain trust, ownerless configuration on more than one chain, a missing pauser, a replaced denylist provider; then it runs a real Bridge Kit transfer by bytes32 token id and checks supply conservation across chains.
- **Falsifiable promise.** Pointed at our deliberately misconfigured token on Base Sepolia and Arc testnet, it reports exactly the three faults we planted and predicts the revert each would cause; after the fixes it goes green, a Bridge Kit transfer succeeds, and `supply(home) == locked + supply(remote) + in flight` holds to the unit.
- **20 second demo.** Red checklist with the predicted revert names, one click "explain", fixes applied, green, transfer lands on Arc.
- **Requirements.** "Protocols or developer tools that make a new asset crosschain" and uses CCTP via Bridge Kit for a non-USDC asset. R1: Studio generates the dashboard and the sample token, and deploys the Arc side. Each check cites the doc sentence it enforces (custom token, ownerless token and contract reference pages linked in H 6).
- **Why Arc judges pick it.** It lowers Circle's support load on a product launched five weeks earlier, and every check is backed by Circle's own docs. No past Arc entry built tooling.
- **Closest prior work.** None in Arc history; generic bridge monitors exist elsewhere. Twist: CCTPx-specific, predictive rather than post-mortem.
- **Stack options.** Narrow. (Arkiv "Node tooling" does not fit; it is about Arkiv nodes.)
- **Difficulty.** Medium (about 20 hours, mostly reads and simulations). **Team fit.** Excellent.

### D2. Bound: euro invoices that convert on arrival within your limit, or not at all (narrow, Arc only)

- **Pitch.** An Indian freelancer issues a euro invoice; the client pays EURC from Base or Ethereum through Bridge Kit; on arrival a hook on Arc converts to USDC only if the rate is within the freelancer's bound, otherwise the hook reverts and, because "If the hook reverts, the entire transfer reverts", the client's EURC never leaves the source.
- **Falsifiable promise.** With the bound set 0.5% above the market, the transfer reverts at delivery and the client's source balance is intact; with a fair bound, one flow ends with USDC in the freelancer's Arc wallet and a receipt that ties invoice, rate and both transaction hashes together.
- **20 second demo.** "Pay invoice INV-042", two explorer tabs, the bound slider, revert, then success.
- **Requirements.** "Applications that move non-USDC assets across chains in a single, simple user flow" and "Crosschain flows that settle or pair with USDC or EURC on Arc". Hook transfers need our own relayer (Iris does not relay hook transfers; [Hooks](https://developers.circle.com/cctp/expanded-assets/concepts/hooks.md)). The conversion venue must be real: StableFX if hackathon access exists (W7), else our own EURC/USDC pool seeded on testnet and labelled as such.
- **Why Arc judges pick it.** It uses the one property that only CCTPx hooks have (atomic delivery) to make a promise a bank wire cannot.
- **Closest prior work.** arctan(x) (FX), BulwArc (FX hedge, no prize). Twist: all-or-nothing settlement across chains.
- **Stack options.** Narrow.
- **Difficulty.** Medium to high (hook receiver, self-relay). **Team fit.** High.

### D3. One Tap Credit: bring your cirBTC to Arc and borrow USDC in one flow (narrow, Arc only)

- **Pitch.** A user holding cirBTC on Ethereum taps once: Bridge Kit moves it to Arc via CCTPx, and the app opens a Borrow Kit loan against it ("Borrow Kit lets users borrow USDC against cirBTC collateral on Arc"; [Arc docs](https://docs.arc.io/llms.txt)), with a health screen and one-tap repay that bridges the collateral home.
- **Falsifiable promise.** From one signature on Ethereum to USDC spendable on Arc, with every intermediate state shown and recoverable (Bridge Kit `retry` on a partial transfer); the round trip ends with the same cirBTC amount back on Ethereum minus the fees shown up front.
- **20 second demo.** A progress rail: burn, attestation, mint, borrow, with a timer.
- **Requirements.** "Applications that move non-USDC assets across chains in a single, simple user flow" and "pair with USDC ... on Arc". cirBTC routes are Arc and Ethereum only ([crypto.news](https://crypto.news/circle-expands-cctp-to-eurc-and-cirbtc-on-arc/)); confirm the testnet route and Borrow Kit testnet (W5, W7).
- **Why Arc judges pick it.** It composes three Circle launches (cirBTC, CCTPx, Borrow Kit). **Risk:** it is a thin wrapper unless the recovery and fee honesty are excellent.
- **Closest prior work.** ArcBeam (Bridge Kit USDC, Buenos Aires), Slipstream (Bridge Kit timeline, no prize).
- **Stack options.** Narrow.
- **Difficulty.** Low to medium. **Team fit.** Medium.

### D4. Born Crosschain: an RWA token that launches by auction and settles on Arc (stacks with Uniswap Foundation, gated)

- **Pitch.** An issuer launches a tokenized receivables-pool share as a native `CrossChainToken` (deployed by CREATE3 with a denylist provider and per-window rate limits), sells it through a Uniswap Continuous Clearing Auction on Base, and buyers move it to Arc through Bridge Kit by token id, where coupons are paid in USDC.
- **Falsifiable promise.** A denylisted buyer's bridge attempt reverts with `AccountDenylisted`; a transfer above the rate-limit window reverts; total supply across Base and Arc equals the auctioned amount at every block.
- **20 second demo.** Auction clears on Base; a buyer bridges to Arc and receives the first USDC coupon; a denylisted wallet tries the same and fails.
- **Requirements.** "Protocols or developer tools that make a new asset crosschain" and "pair with USDC ... on Arc". **Gate:** CCA must be deployed on a CCTPx chain (Base Sepolia or Ethereum Sepolia); verify at the Uniswap workshop (W10).
- **Why Arc judges pick it.** RWA issuance with issuer controls is what Circle's CCTPx page targets ("Typical fits include fiat-backed stablecoins, RWAs"; [CCTP for non-USDC](https://developers.circle.com/cctp/expanded-assets.md)), and T-REX won the DeFi track with regulated tokens (H 3.5).
- **Closest prior work.** T-REX (ERC-3643 on Arc), Kura (Uniswap v4 hook plus CCA, Tokyo 2026 finalist per `00_season.md`). Twist: native crosschain issuance with CCTPx controls.
- **Stack options.** Uniswap Foundation "Build with Uniswap" (CCA is named in scope). Arc plus Uniswap is two slots.
- **Difficulty.** High. **Team fit.** Medium to high.

### D5. Tripwire: a circuit breaker for crosschain tokens (stacks with Chainlink CRE)

- **Pitch.** A reusable guardian for CCTPx custom tokens: a Chainlink CRE workflow watches outflows on every domain and the guardian contract, holding the `TokenManager` pauser role, pauses a domain when outflow exceeds a rolling baseline or supply conservation breaks, leaving the issuer's rate limit as the second line.
- **Falsifiable promise.** We replay an exploit-style burst of 40 transfers on Base Sepolia: within one workflow run the guardian pauses the Base `TokenManager`, at most the rate-limit window's amount leaves, and supply conservation across chains still holds; a forged pause request from any other address reverts.
- **20 second demo.** An outflow chart spikes, the line goes flat, "PAUSED by guardian" on Base, Arc untouched.
- **Requirements.** "Protocols or developer tools that make a new asset crosschain"; the live transfers run through Bridge Kit by token id. Pause and pauser management are documented ([manage TokenManager roles](https://developers.circle.com/cctp/expanded-assets/howtos/manage-token-manager-roles.md)).
- **Why Arc judges pick it.** Bridge exploits are the obvious fear for any issuer making a token crosschain (`00_season.md` notes the Kelp exploit and the Binance drain), and this uses CCTPx's own controls instead of inventing new ones.
- **Closest prior work.** No Arc entry; Canary used CRE plus Arc for depeg insurance (won Chainlink, not Arc). Twist: automated use of CCTPx pause and rate limits.
- **Stack options.** Chainlink "Best workflow with CRE" (the workflow reads chain events and an external alert API). Arc plus Chainlink is two slots; a third could be Arkiv "Mirror something Ethereum depends on" only if the guardian's alert log were mirrored, which is a stretch.
- **Difficulty.** Medium. **Team fit.** Excellent.

## 5. Track combo pass (fresh builds only)

Cap arithmetic (verbatim rules in `00_current_tracks.md`): at most 3 partner prizes; Arc's four tracks count as one partner; at most one EF prize; the finalist track is separate.

| Idea | Arc track | Other partners | Slots used | Notes (Judgement) |
|---|---|---|---|---|
| A1 Bhishi | DeFi | World IDKit | 2 | Social impact plus fuzzing; good finalist story |
| A2 Solvent | DeFi | Chainlink CRE (plus optional World IDKit) | 2 or 3 | Best finalist candidate in Arc's set: timely hook, refusal on stage |
| A5 Band | DeFi | Uniswap Foundation | 2 | Only if v4 is on Arc testnet |
| B2 Forward Check | Consumer agent | 0G PC | 2 | Strong consumer story; 0G requires request IDs |
| B3 Ask Me First | Consumer agent | World Agent Pass | 2 | Needs the denied path on video |
| B5 Bolo | Consumer agent | 0G PC (plus optional World Agent Pass) | 2 or 3 | Voice model is in 0G's table |
| C3 Landed | Stablecoin logic | Chainlink CRE | 2 | Close to OpenPop; lead with the twist |
| C5 Either Way | Stablecoin logic | Chainlink CCIP 2.0 | 2 | Only if a CCIP lane reaches Arc testnet |
| D4 Born Crosschain | Bridge Kit | Uniswap Foundation | 2 | Only if CCA is on a CCTPx chain |
| D5 Tripwire | Bridge Kit | Chainlink CRE | 2 | Best security fit with a stack |
| A3, A4, B1, B4, C1, C2, C4, D1, D2, D3 | one each | none | 1 | Narrow entries tuned to Arc's judges |

Pairings to avoid, with reasons:
- **EF (any prize).** Arc is a stablecoin chain whose launch validators include BlackRock and Visa ([The Block](https://www.theblock.co/news/ecosystems/2026-09-16-circle-launches-arc-mainnet-blackrock-and-visa-among-validators-mints-10-billion-arc-tokens-415250)) and whose USDC carries a runtime blocklist, which undercuts CROPS "censorship resistant"; Arc Studio is a hosted builder, which `judging_criteria.md` already flags against CROPS "open"; the Anon-RPC and alt mempool prizes are about Ethereum infrastructure, not Arc. Keep EF for the team's plans A, B, D or E instead.
- **Whitechain.** Its tracks require USDT on Whitechain, so one settlement path cannot serve both (`plans/C_private_invoicing_whitechain.md` reached the same conclusion).
- **Hedera x402.** Settles on Hedera; doing both is two payment stacks for one demo (OnchainRouter did it and won neither; H 4.1).

Combining with the team's existing plans: none of plans A to E settles on Arc, and none should be bent to; Arc works as a separate build or not at all. **Judgement:** if the team builds one project for EF (for example plan D), Arc is not a natural second slot; if the team chooses an Arc idea as the main build, its stack partners are Chainlink, World, 0G or Uniswap.

Within Arc: one project is eligible for all four Arc tracks but Arc asks you to "state which bounty". **Judgement:** name one track, and name a second only where it fits without stretching (C1 ArcSafe Split also reads as "Payments and liquidity infrastructure" for Track A; D1 and D5 belong to Track D alone).

## 6. Questions for the Arc workshop (Thu 5 Nov 17:00 to 17:20 IST, Workshop Room 1, Corey Cooper, Circle)

It clashes with the EF workshop (17:00, Room 2), so one teammate covers Arc while another covers EF. Ask in this order; the gated ideas depend on W2, W4, W7 and W10.

- W1. What exactly proves "Built in Arc Studio"? Is a Studio project created at the start, then driven by the Arc Studio CLI with our own files round-tripped through `--file`, acceptable? Do judges want the chat history, the deployments list, or both?
- W2. Can a Studio app build, deploy to, or call contracts on Base Sepolia or Ethereum Sepolia, or only Arc testnet? What does "[confirm reachable from Studio]" on the Forwarder bullet resolve to?
- W3. For the consumer agent track, which docs link replaces "[Add API docs link.]"? Is paying real Arc mainnet listings acceptable in the demo, or must we use the 134 Arc testnet listings? Can a team list its own test service?
- W4. Nanopayments are EOA-only. What spend-limit pattern does Circle recommend for consumer agents? Does Gateway refuse an authorization above the remaining deposit at verify time or only at batch settlement?
- W5. Which CCTPx routes are live on testnet today for EURC, cirBTC and WETH to and from Arc testnet, and do teams need access to the Iris fee-quote endpoint (the custom-token quickstart lists it as a prerequisite)?
- W6. Can Bridge Kit pass `hookData` with `autoExecuteHookData` on CCTPx routes, given that hook transfers need self-relay?
- W7. Are USYC, StableFX and Borrow Kit usable by hackathon wallets on Arc testnet?
- W8. Does `arc-anvil` emulate the native USDC blocklist, or is there a known blocklisted test address, so a blocklist failure can be shown honestly?
- W9. With one winner per track, will a project be considered for a second Arc track if it fits, or only the bounty it names?
- W10. Is Uniswap v4 (and CCA) deployed on Arc testnet? Is there a Chainlink CCIP lane or Data Feeds on Arc testnet? (Also ask Uniswap at 16:30.)
- W11. Is there any mainnet condition this time (ETHOnline 2026 paid part of each prize only for an Arc mainnet deployment)?
- W12. Do they want written Studio feedback in the submission, and how much does it weigh (HackMoney said "clear and actionable feedback will heavily influence the judgement")?

## 7. Shortlist (Judgement)

1. **D1 Preflight** (Track D, narrow): thinnest field, every check backed by Circle's docs, pure security work.
2. **C1 ArcSafe Split** (Track C, narrow): earns the reuse bonus, Arc-specific, about 20 hours, leaves time for polish.
3. **A2 Solvent** (Track A, with Chainlink CRE): strongest finalist story of the set (post-Binance, refusal on stage, user-verifiable proof).
4. **D5 Tripwire** (Track D, with Chainlink CRE): the best stacked security build; pick it over D1 if the team wants a second partner slot.
5. **A1 Bhishi** (Track A, with World IDKit): best social-impact entry; the fuzzing demo is the differentiator.

Avoid as a main bet: A3 (crowded guard pattern), B3 (common World plus Arc stack), and any gated idea (A5, C5, D4) until the workshop answers W2 and W10.
