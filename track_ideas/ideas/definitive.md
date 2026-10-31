# Definitive: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: Definitive's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only.

In scope: **Best Use of Flash Advanced Orders in a Social App** ($2,500, one winner, category `building-from-scratch`). Out of scope: "Most Creative Use of Definitive Flash Advanced Orders", which is Continuity only. ([Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and the judge notes are this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria), `track_ideas/history/definitive.md` (dossier), `track_ideas/ideas_draft/definitive.md` (draft), `track_ideas/00_season.md` (season brief), and the finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/`. I fetched eight Flash docs pages on 2026-10-31 to check facts the ideas depend on; I did not re-fetch ETHGlobal pages, since the 31 Oct snapshot already holds them verbatim.

---

## 1. What Definitive's judges reward

### Sourced facts

- Mumbai is Definitive's first ETHGlobal event. A sweep of 37 ETHGlobal prize pages from late 2023 to October 2026 found no earlier Definitive sponsorship (`track_ideas/history/definitive.md`, section 1). Flash API launched in summer 2026; the changelog begins on 6 Aug 2026 ([Flash changelog](https://flash.definitive.fi/docs/changelog.md)).
- The track's problem statement: "Build the best social trading agent or app on top of Flash's advanced order types and show us what trading looks like when people are in it together." Listed directions: copy trading, signals or leaderboards shared to X and TikTok, agent-run products other users can follow, "any product that makes trading a shared experience". ([Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive))
- No numeric rubric and no "Won't place" list are published. The "A few helpful tips" list is the closest thing to "What we want to see": non-custodial with "any EOA wallet or embedded wallet solution like Privy, Dynamic or Coinbase Embedded Wallets"; every order type through "the same orders endpoint"; "attach a fee to every trade"; "AI-native and agent-friendly, and has an MCP server". (same page)
- Qualifications, verbatim: "A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP)."; "Onchain execution shown in the final demo."; "Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X." (same page)
- The only judging words Definitive has written anywhere are on the Continuity track: "originality of the integration, technical creativity, and how well the demo shows off what Flash can do". (same page)
- No Definitive workshop is on the schedule. ([event page](https://ethglobal.com/events/mumbai))

### Flash facts checked on 2026-10-31 that change the ideas

- "Flash accepts **EIP-1271 smart-wallet signatures** on all EVM chains", and "If the address has any code, Flash validates the signature via EIP-1271 (`isValidSignature`)". The page does not say whether this check runs at submit, at settlement, or both. ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md))
- The signed payload "commits to the specific trade: the token pair, the exact amount, the recipient, and an expiration deadline"; it "does not encode a minimum output", and "limit price, TWAP schedule, or trigger price are held offchain by Flash's execution engine". **Consequence:** a smart account can bound amount, token, recipient and time, but not price. ([Non-custodial](https://flash.definitive.fi/docs/non-custodial.md))
- Attached brackets ride on a `market`, `limit` or `twap` entry; "You sign twice with the funder wallet"; the pair stays `pending_activation` until the entry fills. For standalone brackets "Neither trigger may already be met at placement", or the order closes with `REASON_ORDER_TRIGGERED_ON_ENTRY`. ([Bracket orders](https://flash.definitive.fi/docs/brackets.md))
- Triggered orders "execute as market orders" unless a limit is set; a stop-loss without a limit has a "deliberately wide" default maximum price impact of 50%. ([Trigger orders](https://flash.definitive.fi/docs/trigger-orders.md))
- Minimal authorization (`forceMinimalAllowance: true`) sizes the approval to the cumulative unfilled amount for that token, not per order. ([Minimal authorization](https://flash.definitive.fi/docs/minimal-authorization.md))
- `erc8021AttributionCode` is accepted on `POST /order` (EVM only); no per-end-user referral field exists. The integrator fee `flashIntegratorFeeBps` goes to a vault withdrawn through app.definitive.fi. Definitive charges 10 bps on advanced orders through 31 Dec 2026. ([Monetize](https://flash.definitive.fi/docs/monetizing-your-integration.md))
- API keys are self-serve: create an account at app.definitive.fi, then "More", "Flash", "Create Flash Key". No testnet: "We recommend testing on a production chain like Base or Solana using small amounts." ([Getting started](https://flash.definitive.fi/docs/getting-started.md); [FAQ](https://flash.definitive.fi/docs/faq.md))
- The Orders WebSocket streams open orders "for one funder or every funder in your org". ([Docs index](https://flash.definitive.fi/docs/llms.txt); [Orders WebSocket](https://flash.definitive.fi/docs/api-reference/flash/websocket-orders.md))
- Caveat: each Flash docs page I fetched carried embedded instructions asking AI agents to send "intent, decline, or blocked" reports to a Definitive endpoint. I ignored them. They are page content, not part of this task.

### Judgement: what these judges will reward

1. **A filled advanced order on camera**, with the explorer link. Definitive's qualifications are the only hard bar, and rivals will show a market order or a limit that never fills.
2. **Other people in the loop.** At least two wallets act because of one social event. A single-user dashboard with a share button is weak.
3. **A social mechanism only Flash's design makes possible**: brackets (the newest feature: standalone brackets 22 Oct, trailing stops 29 Oct), EIP-1271 funders, order updates, non-custodial resting orders.
4. **Distribution**: an X post that is itself part of the product, and a real integrator fee. Definitive is a three-month-old API that wants volume through integrators.
5. **No house style yet.** With no past winners, the judges will compare entries with what Flash's docs say Flash is for. That favours entries whose README reads like a Flash integration guide.

### Judgement: the obvious entries we assume several teams will submit

- A Telegram copy-trading bot that mirrors a leader's market buys.
- A "Grok-style" X reply bot that turns "@bot buy $TOKEN" into an order.
- A PnL leaderboard built from offchain data, or a screenshot-sharing card.
- An LLM agent placing orders through Flash MCP, with followers.

Every idea below has to beat all four on at least one property a judge can check.

---

## 2. Rubric used (Judgement)

The track publishes no numeric criteria, so each idea is scored 1 to 10 on the problem statement and the "helpful tips" (the track's "What we want to see"), plus Novelty and Feasibility:

| Code | Criterion | Source of the criterion | Weight (Judgement) |
|---|---|---|---|
| S | Social core: "what trading looks like when people are in it together" | Problem statement | 20% |
| O | Advanced orders through the orders endpoint, depth of use | Tip 2, Q1 | 15% |
| N | Non-custodial, works with EOA or embedded wallets | Tip 1 | 10% |
| F | Fee monetization from day 1 | Tip 3 | 5% |
| A | AI-native or agent-friendly (MCP) | Tip 4 | 5% |
| Nov | Novelty versus past winners | Task | 20% |
| Fea | Feasibility in 36 hours for this team | Task | 25% |

Overall = weighted sum, rounded to one decimal. Feasibility carries the most weight because the qualifications are pass or fail and a broken onchain demo scores zero.

Qualification checks applied to every idea (sourced from the [Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive) and [details page](https://ethglobal.com/events/mumbai/info/details)):

- **Q1** advanced order type from the named list. Because brackets and trailing stops are not on the list, every final idea makes the filled order a `limit` or `twap` entry, so it qualifies whatever the answer on brackets.
- **Q2** onchain execution in the final demo. Plan: a marketable limit entry for speed, plus a 5 minute TWAP (`durationSeconds` 300, [TWAP](https://flash.definitive.fi/docs/twap-order.md)) recorded in full and cut, as the fill nobody can call "just a market order".
- **Q3** the video posted on X tagging @DefinitiveFi and on the ETHGlobal Discord; a 2:00 to 2:59 cut meets ETHGlobal's 2 to 4 minutes and every partner limit.
- ETHGlobal rules: all code written after 5 Nov 21:00 IST, steady commit history, AI-use attribution, spec files committed if a spec workflow is used.
- "Won't place": none published. Implied disqualifiers (Judgement): only market orders, a mocked or simulated fill, no X post.

---

## 3. Vetting the five draft ideas

| Draft idea | S | O | N | F | A | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 1. Called It | 7 | 7 | 8 | 7 | 4 | 5 | 8 | 6.8 | None. Lisbon 2026 finalist KOLlateral already built "a verifiable track record for crypto influencers' trading calls" (`finalists_2026.md`), which the draft did not cite. Sybil gap: a leader can spray calls from 50 wallets and promote the winner | **Revise** (sybil defence, positioning against KOLlateral) |
| 2. Leash | 6 | 7 | 7 | 7 | 6 | 8 | 4 | 6.2 | None formal. The account cannot bound price (not in the signature), so the "cannot overspend" claim must be about amount, not value. Every follower must deploy and fund a smart account, against tip 1's EOA or embedded wallet path. Unfollow-by-pause relies on a settlement-time 1271 check the docs do not promise | **Revise** (allowance-as-cap, honest scope) |
| 3. Desk | 7 | 8 | 8 | 6 | 6 | 7 | 5 | 6.7 | None. An ENS record as a trade signal is contrived unless ENSv2 also carries membership | **Revise** (expiring subname seats) |
| 4. Siren | 5 | 6 | 8 | 5 | 6 | 6 | 4 | 5.5 | The demo trigger is our own proxy while the asset sold is WETH, so the story does not hold up. Real hacks drain in minutes (Binance: about 3.5 minutes, `00_season.md` section 1.1) and a crashing token will not fill a limit "a hair under spot". Social layer is thin. Three tools new to the team (CRE, detectors, follower agents) | **Drop**, replaced by Last Out |
| 5. Chart to Bracket | 7 | 8 | 8 | 7 | 8 | 5 | 7 | 6.9 | None. Risk of reading as a toy | **Revise** (refusal path, calibration record) |

No draft idea depends on pre-existing project code; the team's plans A to E all skip Definitive (`ideas_draft/definitive.md`, "Track combination pass").

---

## 4. Final ranked table: Best Use of Flash Advanced Orders in a Social App

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Last Out: copy trading where the leader cannot dump on followers | 7.5 | New (replaces Siren) | Definitive + World "Best Use of IDKit" |
| 2 | Called It: a leaderboard of calls committed before the move, one human per rank | 7.2 | Revise (done below) | Definitive + World "Best Use of IDKit" |
| 3 | Chart to Bracket: a drawn chart becomes a resting bracket for the whole group | 7.1 | Revise (done below) | Definitive + 0G "Build with 0G PC" |
| 4 | Desk: a trading desk as an ENSv2 name with expiring seats | 6.9 | Revise (done below) | Definitive + ENS "Best Use of ENSv2" (+ World IDKit optional) |
| 5 | Leash: follower accounts that cap what any copier can spend | 6.5 | Revise (done below) | Definitive + World "World ID Agent Pass" |

**Shared gate (Judgement).** Ideas 1 and 5 both need Flash to accept an EIP-1271 funder that approves a stored digest. Build only one of them, and run the gate test in the first four hours (see Last Out). If the gate fails, pivot to Called It, which reuses the leader and follower UI and the fill indexer.

---

## 5. The final ideas in full

### Rank 1. Last Out: copy trading where the leader cannot dump on followers

**Pitch.** A leader posts a call from a lock account. From that moment the account will sign only one exit for that token, the published bracket, until the lock expires. Followers copy from their own Privy or EOA wallets with brackets whose triggers sit just inside the leader's, so the price reaches the followers' exits first. KOLlateral caught the influencer dump after it happened; Last Out makes it impossible.

**Falsifiable promise.** "Until the lock expires, the leader's account refuses every sell of the called token except the bracket it published, and refuses transfers of that token. Each follower's stop sits above the leader's stop and each follower's target below the leader's target. Try to dump: the signature is refused."

**Demo moment (20 seconds).** The leader posts "WETH long, target +1.5%, stop -0.4%, lock 24h" from the app; an X card appears with a Copy link. Two phones copy it with embedded wallets; all three limit entries fill on Base and the explorer links appear. The leader then presses "Market sell now": Flash answers `PERMISSION_DENIED: signature verification failed`, and the card shows "dump refused" with the account's `isValidSignature` result. A teammate tries `transfer(WETH)` out of the account: revert. A recorded segment shows the price touching the followers' stop first, followers out, the leader's stop still resting.

**How it works.**
- `LockAccount` is a small EIP-1271 smart account owned by the leader's key. Publishing a call calls `openCall(token, lockUntil, entryDigest, pairDigest)`, which stores the two digests Flash returned for a `limit` entry with an `attachedBracket` (two signatures per the [bracket docs](https://flash.definitive.fi/docs/brackets.md)).
- `isValidSignature(digest, sig)` returns the magic value only if the owner signed it and, for any locked token, only if the digest is one of the stored call digests. The account decodes Flash's EIP-712 order fields (taken from `orderTypedData` at quote time) and recomputes the hash on chain, so it knows which token a digest sells. `execute` refuses `transfer`, `approve` changes and calls on a locked token.
- Followers' orders are plain Flash quotes from their own wallets: `limit` entry plus `attachedBracket` with `takeProfit` set a margin below the leader's and `stopLoss` a margin above it. `flashIntegratorFeeBps` (for example `"20"`) is the app's revenue.
- The public call page reads `lockUntil` and the stored digests from the chain, and the bracket triggers from `GET /orders/{orderId}`. README states the trust split: the lock is onchain; trigger levels are held by Flash ([Non-custodial](https://flash.definitive.fi/docs/non-custodial.md)).
- Foundry invariant suite: no digest outside the call set validates while locked; no locked-token balance leaves the account; unlocking happens only at `lockUntil`. This is the README's centrepiece.

```solidity
interface ILockAccount {
    function openCall(address token, uint64 lockUntil, bytes32 entryDigest, bytes32 pairDigest) external;
    function isValidSignature(bytes32 digest, bytes calldata sig) external view returns (bytes4);
    function lockedUntil(address token) external view returns (uint64);
    function execute(address target, uint256 value, bytes calldata data) external returns (bytes memory);
}
```

**Go or no-go gate (hours 0 to 4).** From a minimal 1271 account on Base: (a) place a 2 USDC limit with a digest the account approves; (b) place a second order the account refuses and confirm Flash rejects it; (c) place a 5 minute TWAP and record whether slices still settle after the account starts refusing (tells us if 1271 is checked at settlement). If (a) or (b) fails, pivot to Called It.

**Requirement checklist.**
- [x] Q1: `limit` entries (named type), with attached take-profit and stop-loss legs.
- [x] Q2: three entry fills on Base mainnet with explorer links; the follower stop-out recorded.
- [x] Q3: the "dump refused" clip is the X post, tagging @DefinitiveFi; same file on Discord.
- [x] Fresh build; only public libraries (Foundry, viem, Privy SDK, Flash API).
- [x] No pre-existing code. Won't place: none published; no implied disqualifier hit.
- [ ] Risk: depends on the 1271 gate and on Flash's handling of the second (pair) signature through 1271.

**Why it beats rivals (Judgement).** Every copy-trading rival has the same unanswered question: what stops the leader buying first and selling into the followers? This one answers it with a refusal on stage. It uses brackets, Flash's newest feature, as the protection itself, not decoration. Followers need no new wallet (tip 1), and the fee is set from the first trade (tip 3).

**Closest prior winners.**
- [KOLlateral](https://ethglobal.com/showcase/kollateral-ho1d1), Lisbon 2026 finalist (0G 3rd, Uniswap API 1st): flags "said accumulate, sold four hours later" after the fact. Last Out prevents it in advance.
- [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4), New Delhi 2025 finalist: copy trading with follower vaults, mocked payments, no partner prize.
- [watermark](https://ethglobal.com/showcase/watermark-68230), Tokyo 2026 finalist: a Safe signs once and a fill cannot exceed a cap. Same "the account refuses" beat, different venue.
- [TradeSphere](https://ethglobal.com/showcase/tradesphere-5vdrw), Istanbul 2023: social layer with CoW stop-losses (CoW Hooks 2nd).

**Stack.** Definitive (core). World "Best Use of IDKit" ($2,500, 2 x $1,250): Proof of Human when a leader opens a profile, so a leader with a bad record cannot start again under a fresh address. Show the "already verified human" rejection path and verify on the server ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world)). Third slot optional: none fits cleanly. EF CROPS is weak because Flash is a centralized executor.

**Difficulty.** High on the gate, medium after it. The onchain EIP-712 rebuild is the hard part (half a day); the app is a standard React and Privy build.

**Scores.**

| S | O | N | F | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 7 | 5 | 9 | 6 | **7.5** |

**Judge notes (Judgement).**
- Definitive judge: "This is the first copy-trading pitch that treats the leader as the threat. I want to see our bracket doing the protecting."
- Veteran: "Gap risk is real. If price gaps through both stops in one tick, who lands first is up to Flash's engine. Say so in the README and show the ordering on a calm pair. Do not promise 'always first'."
- Veteran: "The pair signature is the trap. Test that Flash runs both entry and pair signatures through `isValidSignature`, not just the entry."

---

### Rank 2. Called It: a leaderboard of calls committed before the move, one human per rank

**Pitch.** A trader's call counts only if it was a resting Flash order whose levels were committed onchain before the fill, and only one verified human can hold a ranked profile. Anyone can rebuild the board from Base logs.

**Falsifiable promise.** "Every rank can be recomputed by a stranger from Base logs alone. A call edited, deleted or back-dated after the move falls off the board, and a second wallet controlled by the same person cannot rank."

**Demo moment (20 seconds).** The leader posts "stop-buy WETH, with bracket" from the app; an X card with a Copy link appears. A second phone copies with a Privy wallet. The entries fill (marketable limit) and the card flips to "filled at block N" with two Basescan links. A teammate then edits the call in our own database: the public verifier page marks it "not committed: removed from ranking". Finally the leader's second wallet tries to create a ranked profile and IDKit rejects it.

**How it works.**
- Before `POST /order`, the app writes `keccak256(pair, side, entryLimit, takeProfit, stopLoss, expiry, salt)` and the funder address to a small `CallRegistry` on Base; the salt is revealed when the call is published. Commitment covers the levels directly, because Flash does not put trigger prices in the signature ([Non-custodial](https://flash.definitive.fi/docs/non-custodial.md)).
- The verifier is a static page: it reads `CallRegistry` events, then each fill's `transactionId` from `GET /orders/{orderId}` ([Post-trade reporting](https://flash.definitive.fi/docs/post-trade-reporting.md)), and checks the fill on chain: transfers from the leader's address in a transaction to the settlement contract `0x5d00000873b6BF41539e6f5365B0Ff7d3c368f78` ([Security](https://flash.definitive.fi/docs/security.md)), in a block after the commitment, at a price consistent with the committed levels. Hit rate counts every commitment, including losers.
- One ranked profile per human: IDKit Proof of Human, verified on the server; the nullifier is stored against the profile.
- Followers copy the same levels in their own wallets with `flashIntegratorFeeBps` set.

**Requirement checklist.**
- [x] Q1: `limit` entries with attached take-profit and stop-loss; optional `stop` order type.
- [x] Q2: two fills on Base mainnet shown with explorer links.
- [x] Q3: the X card is the product; video tagged @DefinitiveFi and posted on Discord.
- [x] Fresh build, public libraries only; no Won't place hit.
- [x] IDKit: trust moment (getting a rank), minimum credential (Proof of Human, not Passport), success and rejection path, debrief.

**Why it beats rivals (Judgement).** Rival leaderboards rank PnL from offchain data or screenshots, and the sybil trick (many wallets, promote the lucky one) breaks all of them. This board survives both attacks on stage. It is also the cheapest idea to make polished, which matters with a single $2,500 winner.

**Closest prior winners.**
- [KOLlateral](https://ethglobal.com/showcase/kollateral-ho1d1), Lisbon 2026 finalist: scores influencers' posted calls against DEX history with 0G TEE attestation. Called It differs: the call is an executable order committed before the move, and followers copy that exact order.
- [μMoo](https://ethglobal.com/showcase/mmoo-3fzgd), CoW Programmatic Orders 1st, Bangkok 2024: verifiable data behind orders.
- [CastSense](https://ethglobal.com/showcase/castsense-oz4tw), [Frames Hub](https://ethglobal.com/showcase/frames-hub-w77f9): social leaderboards without commitments (from the draft).

**Stack.** Definitive + World "Best Use of IDKit" (a strong fit: "fair access to a scarce benefit" is a rank). Third slot optional: Arc only if Flash quotes on Arc and the build starts in Arc Studio (unverified; see questions).

**Difficulty.** Medium. Registry about 60 lines; fill matching from settlement transactions is the half-day task.

**Scores.**

| S | O | N | F | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 7 | 4 | 6 | 8 | **7.2** |

**Judge notes (Judgement).**
- Definitive judge: "Leaderboards shared to X is literally our brief. The commitment makes it the one we would link to."
- Veteran: "KOLlateral will be in some judge's memory. Lead with 'the call is the order', not 'verifiable track record', or it sounds like a repeat."
- Veteran: "Fallback for the Last Out gate. Keep the indexer generic from hour one."

---

### Rank 3. Chart to Bracket: a drawn chart becomes a resting bracket for the whole group

**Pitch.** In a Telegram group, post a chart screenshot with entry, target and stop lines drawn. A bot reads the lines with a 0G vision model, shows exactly what it read, and replies with a one-tap Flash limit plus bracket at those levels. Others tap "same levels", and the group board ranks whose charts actually hit target.

**Falsifiable promise.** "Any chart with three horizontal lines becomes a resting Flash bracket at those prices within 30 seconds. The overlay shows what the model read before anyone signs, and a chart whose levels are inconsistent with the live price is refused, not guessed."

**Demo moment (20 seconds).** A judge sends their own chart to the group. The bot replies with the image, the three detected lines drawn over it, and the 0G request ID. The judge taps, signs with an embedded wallet; a second member taps "same levels". The entry fills on Base and the bot posts the Basescan link. Then a scribble with lines in the wrong order is refused with the reason.

**How it works.**
- Telegram bot and mini app, Privy embedded wallets (tip 1).
- 0G Private Computer with `qwen vision` returns strict JSON (pair, entry, target, stop, axis reading) plus a request ID ([Mumbai 0G prizes](https://ethglobal.com/events/mumbai/prizes/0g)). The code checks ordering (target above entry above stop for a long), distance from the live Flash price via `/search`, and refuses implausible reads.
- Flash `limit` entry with `attachedBracket` (take-profit above stop-loss, as the docs require, [Bracket orders](https://flash.definitive.fi/docs/brackets.md)); fills tracked on the Orders WebSocket.
- Calibration record: each member's charts, whether the model's read was accepted or corrected, and outcomes. This is the "come back tomorrow" reason for 0G.

**Requirement checklist.**
- [x] Q1: `limit` entry with take-profit and stop-loss legs.
- [x] Q2: the judge's entry fills on Base.
- [x] Q3: the "judge's chart becomes an order" clip on X tagging @DefinitiveFi, and on Discord.
- [x] 0G: inference in the main flow with request IDs, a working app to try, "what breaks if 0G is removed" (nothing can read the chart), video under 3 minutes, live demo link.
- [x] Fresh build; no Won't place hit (0G's "Not wanted": not a chat wrapper; the AI call cannot be removed unnoticed).

**Why it beats rivals (Judgement).** It is the most retweetable demo and lives inside the social channel, the pattern of PolySwap and Poukav. The refusal path and overlay keep it honest where rival "AI trades for you" bots are opaque.

**Closest prior winners.**
- [PolySwap](https://ethglobal.com/showcase/polyswap-t53br), CoW Programmatic Orders 2nd, Bangkok 2024: Telegram mini app, external signal triggers swaps.
- [Poukav](https://ethglobal.com/showcase/poukav-i0j57), Euler Telegram Integration 1st, Bangkok 2024.
- [Tgwap](https://ethglobal.com/showcase/tgwap-qryok), CoW Wonderful Widgets, Istanbul 2023: non-custodial Telegram sell automation.

**Stack.** Definitive + 0G "Build with 0G PC" ($5,000; 1st $2,500). Not 0G "Agents That Pay for Themselves": fee withdrawal is documented only as a manual click ([Monetize](https://flash.definitive.fi/docs/monetizing-your-integration.md)).

**Difficulty.** Medium. Vision accuracy on messy charts is the risk; the overlay plus refusal is the mitigation.

**Scores.**

| S | O | N | F | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 7 | 8 | 8 | 7 | 8 | 6 | 7 | **7.1** |

**Judge notes (Judgement).**
- Definitive judge: "Fun, and the bracket is the product. I would retweet it. Does the group actually trade together, or just near each other?"
- Veteran: "Several teams will ship 'AI reads a chart'. The refusal on a bad chart and the calibration board are what make this one different. Uses the team's security skills least."

---

### Rank 4. Desk: a trading desk as an ENSv2 name with expiring seats

**Pitch.** A desk is an ENSv2 name. Seats are expiring, revocable subnames issued by the desk's own registry, and each seat owns its own Permissioned Resolver holding its cap and auto-follow flag. The captain may edit only the desk's `call` record; when it changes, every seated member's bracket moves, and an expired seat stops following.

**Falsifiable promise.** "One edit to the desk's call record moves every seated member's stop. The captain cannot change any member's cap or wallet, and a member whose seat has expired is never copied."

**Demo moment (20 seconds).** The captain edits `alpha.desk.eth`'s call record to raise the stop. Within seconds three members' Flash brackets show the new trigger (member agents update automatically; humans approve one tap). The captain tries to edit `bob.alpha.desk.eth`'s cap record and Enhanced Access Control reverts. A seat whose expiry has passed shows "not following". A member's limit entry fills on Base.

**How it works.**
- A custom ENSv2 subname registry (Sepolia allowed) issues `desk.eth` and expiring member subnames; each member subname gets its own Permissioned Resolver; Enhanced Access Control grants the captain role only the desk's `call` text record ([Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)).
- A watcher reads resolver events, checks each member's seat expiry and cap record, and builds per-member Flash quotes (`limit` with `attachedBracket`). Stop moves use `PATCH /orders/{orderId}` on the active pair ([Updating orders](https://flash.definitive.fi/docs/updating-orders.md); [Bracket orders](https://flash.definitive.fi/docs/brackets.md)).
- Agent members are subnames with their own keys, running a Flash MCP or API client within their recorded cap, which earns ENS's "bring AI agents into the mix" bonus.

**Requirement checklist.**
- [x] Q1: `limit` entry with take-profit and stop-loss legs, plus bracket updates.
- [x] Q2: at least one member fill on Base mainnet.
- [x] Q3: the "one ENS edit moves three orders" clip on X tagging @DefinitiveFi, and on Discord.
- [x] ENS: built on ENSv2 (Sepolia allowed), central (membership, permissions and the call all live there), no hard-coded values, open source, live demo link.
- [x] Fresh build; no Won't place hit.

**Why it beats rivals (Judgement).** "People in it together" is literally a desk with one call, and membership is a real object (an expiring seat) rather than a Telegram group. It uses the newest Flash features (bracket updates and limit legs, late October) and the newest ENS release.

**Closest prior winners.**
- [minidao](https://ethglobal.com/showcase/minidao-ahbhs), Bangkok 2024 finalist: pooled group wallet voting on trades. Desk has no pooling and no vote.
- [calendefi](https://ethglobal.com/showcase/calendefi-6d3ji): ENS subnames as approvals (ENS 3rd, from the draft).
- [watermark](https://ethglobal.com/showcase/watermark-68230) and [ETH Arcade](https://ethglobal.com/showcase/eth-arcade-96wyn), Tokyo 2026 finalists: ENSv2 access control and registries.

**Stack.** Definitive + ENS "Best Use of ENSv2" ($7,000; 1st $3,000). Optional third: World "Best Use of IDKit" (one seat per human on public desks).

**Difficulty.** Medium to high. ENSv2 docs are about a week old (`00_season.md`, signal 3); human members must sign each `PATCH`, so the "everyone moves" beat is automatic only for agent members.

**Scores.**

| S | O | N | F | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 6 | 6 | 7 | 5 | **6.9** |

**Judge notes (Judgement).**
- Definitive judge: "Good group mechanic. The ENS part is invisible to our users; make the desk page feel like a trading room, not a registry."
- Veteran: "The best expected value per hour if the team wants the ENS money. ENS on Sepolia and trades on Base is fine, but say why in the README."

---

### Rank 5. Leash: follower accounts that cap what any copier can spend

**Pitch.** Followers copy a leader, human or agent, through their own small smart account, which allows only listed tokens, a per-order and daily amount, and an off switch. A leaked copier key or a rogue leader cannot spend more than the follower set.

**Falsifiable promise (narrowed after vetting).** "We put the copier bot's private key on the slide. Nobody can use it to make this follower's account spend more than 50 USDC a day, trade a token outside its list, or trade after the follower taps Unfollow." Price is not in Flash's signature, so the promise is about amount, token and time, and the per-order cap bounds worst-case slippage loss.

**Demo moment (20 seconds).** The leader opens a call; three follower accounts mirror it and fill on Base. A teammate uses the published copier key to try a 500 USDC order on an unlisted token: the account refuses and Flash rejects it. The follower taps Unfollow; the account revokes its allowance to Flash in the same transaction, and a resting copied order can no longer pull funds.

**How it works (revised).**
- `FollowerAccount` holds the follower's USDC and is owned by the follower's Privy embedded wallet. Policy: token allowlist, per-order maximum, daily cap, allowed leaders, expiry.
- The copier calls `authorize(order)`; the account rebuilds Flash's EIP-712 digest from the order fields, checks policy, books the amount, and **raises its ERC-20 allowance to Flash's spender by exactly that amount**. `isValidSignature` approves only stored digests.
- The allowance is the hard cap, so the account protects the follower even if Flash checks 1271 only at submit. `unfollow()` pauses the account and sets the allowance to zero.
- Foundry invariants: total allowance granted never exceeds the daily cap; nothing validates after pause; the digest matches Flash's typed-data hash for recorded quotes.

**Requirement checklist.**
- [x] Q1: `limit` entries with attached take-profit and stop-loss legs.
- [x] Q2: follower fills on Base mainnet.
- [x] Q3: the "key on the slide" clip on X tagging @DefinitiveFi, and on Discord.
- [x] World Agent Pass (if stacked): a copy above the cap or a new leader needs a fresh human verification; show the denied path; validate on the backend; debrief.
- [ ] Risk: shares the 1271 gate with Last Out; each follower deploys and funds an account.

**Why it beats rivals (Judgement).** It answers the follower's first question, what happens if the bot is hacked, in the week of the Binance drain (`00_season.md`, signal 1). It ranks last here because Last Out reuses the same gate with a more social story and no smart account per follower.

**Closest prior winners.** [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4) (follower vaults, no partner prize); [watermark](https://ethglobal.com/showcase/watermark-68230) (capped fills); [minidao](https://ethglobal.com/showcase/minidao-ahbhs) (shared wallet).

**Stack.** Definitive + World "World ID Agent Pass" ($5,000; 1st $2,500) ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world)).

**Difficulty.** High: the EIP-712 rebuild plus per-follower account onboarding.

**Scores.**

| S | O | N | F | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 6 | 7 | 7 | 7 | 6 | 8 | 5 | **6.5** |

**Judge notes (Judgement).**
- Definitive judge: "Strong security story, weaker social one. Followers protected from a bot is not quite 'people in it together'."
- Veteran: "If the gate passes and there is time left on Saturday morning, add the follower caps to Last Out as one contract with two policies. Do not build both from scratch."

---

## 6. Track combination pass (Judgement)

Rules (sourced, [event page FAQ](https://ethglobal.com/events/mumbai) and [details page](https://ethglobal.com/events/mumbai/info/details)): at most 3 partner prizes; a partner with several tracks counts as one; EF places a project in at most one EF prize; the finalist track is separate.

| Build | Partner picks | Extra submission work | Finalist fit |
|---|---|---|---|
| Last Out | Definitive, World (IDKit) | IDKit debrief, minimum-credential paragraph | Best: a live refusal plus a filled order |
| Called It | Definitive, World (IDKit) (+ Arc only if Flash quotes on Arc and the build starts in Arc Studio) | IDKit debrief | Good: "rebuild the board yourself" |
| Chart to Bracket | Definitive, 0G (PC) | Request IDs on screen, live link, video under 3 minutes | Medium: fun, light technical depth |
| Desk | Definitive, ENS (ENSv2), World (IDKit, optional) | Live demo link, open source, no hard-coded values | Medium |
| Leash | Definitive, World (Agent Pass) | Denied path, backend validation, debrief | Good, but overlaps Last Out |

---

## 7. Definitive's top 3 overall

1. **Last Out (7.5).** Highest novelty: it is the only idea that treats the leader as the attacker, and it uses Flash's brackets as the protection. Followers keep ordinary wallets, which matches tip 1. It has the strongest 4 minute finalist beat (a dump refused on stage). Its risk is a single, testable gate in hours 0 to 4.
2. **Called It (7.2).** The safest high scorer, the designated pivot if the gate fails, and a direct hit on "leaderboards shared to X". IDKit adds a cheap second prize and closes the sybil hole that breaks every rival leaderboard.
3. **Chart to Bracket (7.1).** Lowest technical risk with a real second prize (0G, $5,000) and the most retweetable demo, at the cost of novelty and of using the team's security edge the least.

---

## 8. Questions for the Definitive workshop and booth

No Definitive workshop is scheduled ([event page](https://ethglobal.com/events/mumbai)). Ask on the Definitive channel of the ETHGlobal Discord now, and at the booth before 21:00 IST on Thu 5 Nov. Most decisive first.

1. **EIP-1271 funders:** will Flash accept a smart-account funder whose `isValidSignature` approves a pre-stored digest and ignores the signature bytes? Is the check run at submit only, or again at settlement, for each TWAP slice and for the attached bracket's pair signature? (Decides Last Out and Leash.)
2. **What counts as "advanced orders":** the qualification lists DCA, Limit, Stop, Stop Loss, Take Profit and TWAP. Does a `limit` entry with an `attachedBracket` qualify, and do standalone `bracket` and `trailing-stop` count? Is a TWAP the intended "DCA", since the API has no `dca` type?
3. **What onchain execution must show:** does a marketable limit that fills at once satisfy "Onchain execution shown in the final demo", or must a trigger fire? Is a recorded and cut 5 minute TWAP acceptable in the video?
4. **Updates and cancels for 1271 funders:** what typed data does a `PATCH /orders/{id}` or a cancel sign, and is it also validated through `isValidSignature`? (Last Out's lock, Desk's stop moves.)
5. **Execution ordering:** when two resting orders on the same pair are triggered in the same price move, does Flash execute them in trigger-price order, and what is typical trigger-to-landing latency on Base? (Last Out's "followers out first" claim.)
6. **Fan-out:** may one integrator key place orders for many end-user funders in a copy-trading flow, and can hackathon keys get more than 5 requests per second per endpoint?
7. **What the judges want to see:** do they weigh real users or volume during the hackathon, MCP or agent use, or a set integrator fee? Is an MCP layer central or just a bonus?
8. **Social surface:** is a Telegram mini app or a Farcaster product acceptable as the "social app", given the video must be on X? Does the X post's engagement matter?
9. **Fees:** is there a maximum `flashIntegratorFeeBps`, and can the integrator vault be withdrawn onchain by contract (not only by clicking in app.definitive.fi)? May `erc8021AttributionCode` carry a per-creator code for revenue sharing?
10. **Chains and sizes:** what is the practical minimum order size on Base, which pair gives the most reliable demo fills, and does Flash quote on Arc today (Arc track stacking for Called It)?
11. **Access and support:** is key creation instant for a new account, and will a Definitive engineer be reachable overnight on 5 to 6 Nov?

---

## 9. Gaps and caveats

- Definitive has no ETHGlobal history; "what judges reward" is inferred from its own wording and from analogous CoW, Euler and Gaia tracks (`track_ideas/history/definitive.md`).
- I did not call the Flash API. The 1271 behaviour, trigger ordering and Arc liquidity are unverified, hence questions 1, 5 and 10.
- ETHGlobal pages were not re-fetched; the verbatim text is the 2026-10-31 snapshot in `track_ideas/00_current_tracks.md`.
