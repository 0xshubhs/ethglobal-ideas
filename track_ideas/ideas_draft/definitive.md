# Definitive: idea draft for ETHGlobal Mumbai (fresh builds only)

Track in scope: **Best Use of Flash Advanced Orders in a Social App** ($2,500, single winner). The Continuity track "Most Creative Use of Definitive Flash Advanced Orders" is ignored. ([Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive))

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, no existing code. History and judge patterns are in `track_ideas/history/definitive.md`; pattern numbers below (P1 to P6) refer to its section 6.

**Labels.** Requirement quotes and Flash facts carry a URL. Everything under "Why judges would pick it", "Difficulty", "Team fit" and the rankings is **Judgement**.

---

## 0. The bar every idea must clear

Verbatim qualifications ([Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive)):

- **Q1** "A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP)."
- **Q2** "Onchain execution shown in the final demo."
- **Q3** "Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X."

"Won't place": none published. **Judgement:** the implied disqualifiers are (a) only market orders, (b) a mocked or simulated fill, (c) no X post.

Flash facts that every idea depends on:
- No testnet; Definitive recommends "a production chain like Base or Solana using small amounts". ([FAQ](https://flash.definitive.fi/docs/faq.md))
- The order-type enum has no `dca`; use a TWAP (minimum `durationSeconds` 300) as the DCA. ([OpenAPI](https://flash.definitive.fi/v1/openapi.json); [TWAP](https://flash.definitive.fi/docs/twap-order.md))
- A limit buy "executes at or below the limit price", so a buy limit set slightly above spot fills at once. That is the safe way to show Q2 on stage without waiting for the market. ([Placing orders](https://flash.definitive.fi/docs/placing-orders.md))
- Each fill returns `transactionId`. The settlement contract is `0x5d00000873b6BF41539e6f5365B0Ff7d3c368f78` on every EVM chain. ([Post-trade reporting](https://flash.definitive.fi/docs/post-trade-reporting.md); [Security](https://flash.definitive.fi/docs/security.md))
- 5 requests per second per endpoint per key, so fan-out to followers must be queued. ([Rate limits](https://flash.definitive.fi/docs/rate-limits.md))
- Resting orders are auto-cancelled when the funder's balance falls below the order amount, so follower UIs must show this. ([changelog, 15 Oct 2026](https://flash.definitive.fi/docs/changelog.md))

Budget (Judgement): about $60 USDC plus $10 of ETH on Base across five wallets covers every demo below. Definitive's fee on advanced orders is 10 bps through 31 Dec 2026. ([Monetize](https://flash.definitive.fi/docs/monetizing-your-integration.md))

Common Q3 plan for all ideas: a 2:00 to 2:59 cut satisfies ETHGlobal (2 to 4 minutes) and works as the "short" X video. Post it from the team's X account tagging @DefinitiveFi, and post the same file in the Definitive channel on the ETHGlobal Discord. Put both links in the README. ([details page](https://ethglobal.com/events/mumbai/info/details))

---

## Idea 1. Called It: a leaderboard that only counts calls made before the move (narrow, Definitive only)

**Pitch.** A trader's call counts only if it was a resting Flash order, committed onchain before the price moved and later filled; the leaderboard is rebuilt from chain logs, not screenshots.

**Falsifiable promise.** "Every rank on the board can be recomputed by a stranger from Base logs alone. A call that is edited, deleted or back-dated after the move falls off the board."

**20 second demo moment.** A leader posts "stop-buy WETH at X with a bracket" from the app; an X card appears with a "Copy this call" link. A second phone opens the link and copies it with a Privy embedded wallet. Both orders fill (marketable trigger) and the card flips to "filled at block N" with two Basescan links. Then a teammate edits the leader's call in our own database, and the public verifier page marks it "not committed: removed from ranking".

**How it works.**
- When a call is placed, the app sends `POST /quote` and `POST /order` with `orderType` `stop` or `limit` plus `attachedBracket`, then writes `keccak256(orderTypedData, userSignature, orderId)` and the trigger levels to a tiny `CallRegistry` contract on Base. That makes the call's existence and timing public before any fill.
- The verifier (a static page anyone can run) reads `CallRegistry` events and Flash settlement transactions to the leader's address, matches each fill to a commitment, and computes hit rate and realised PnL. `GET /orders/{id}` is used only as a hint; the chain is the source of truth.
- Follower copies reuse the leader's trigger and bracket in their own wallet, with `flashIntegratorFeeBps` set (for example `"25"`), which is the app's revenue.

**Requirements.** Q1: stop, limit, take-profit and stop-loss legs through Flash API. Q2: two fills on Base mainnet shown with explorer links. Q3: the X card is the product, and the demo video is posted on X tagging @DefinitiveFi and on Discord.

**Why Definitive's judges would pick it.** The original part is the rule for what counts as a call, not the order plumbing (P1). Every follower is self-custodied (P3), real fills are shown (P4), and the share card is built to be retweeted (P6, plus "leaderboards shared to X" from the brief). It routes copied volume through Definitive with a fee from day one, which is the tip they wrote into the brief. Rivals will rank PnL from offchain data or screenshots; this one is the leaderboard a judge cannot fake.

**Closest past projects and the twist.** [CastSense](https://ethglobal.com/showcase/castsense-oz4tw) and [Frames Hub](https://ethglobal.com/showcase/frames-hub-w77f9) (social analytics leaderboards), [ETH Arcade](https://ethglobal.com/showcase/eth-arcade-96wyn) (leaderboard kept in ENS), [μMoo](https://ethglobal.com/showcase/mmoo-3fzgd) (verifiable data behind orders). Twist: none of them commits the signed order before the outcome, so none can prove a call was made in advance.

**Stack options.** Narrow by design: Definitive only. Optional, if Flash quotes on Arc (unverified; see history Q5): rebuild in Arc Studio for Arc "Best DeFi / Onchain Finance App" (requires starting in Arc Studio and showing it in the demo). EF: none; a trading app that depends on a centralized execution API is a poor CROPS story.

**Difficulty (36 h).** Medium. The registry contract is about 60 lines. Fill matching against settlement transactions is the hard part (half a day).

**Team fit.** Strong: event indexing and an adversarial "try to fake it" demo are audit muscle memory.

---

## Idea 2. Leash: copy trading where the follower's wallet enforces the limits, not the bot (stacks with World)

**Pitch.** Followers copy a leader (human or agent) through a smart account whose EIP-1271 check enforces their own caps at Flash settlement, so a leaked copier key or a rogue leader cannot overspend.

**Falsifiable promise.** "We put the copier bot's private key on the slide. Nobody can use it to make this follower spend more than 50 USDC a day, buy a token outside its list, or trade after the follower taps Unfollow."

**20 second demo moment.** The leader opens a bracket; three follower accounts mirror it within seconds and fill onchain. A teammate takes the published copier key and tries a 500 USDC order on a token outside the list: Flash rejects it with the account's `isValidSignature` refusal. The follower taps Unfollow; a resting copied stop-loss now fails at the contract even though Flash still holds it.

**Why it is possible.** "Flash accepts EIP-1271 smart-wallet signatures on all EVM chains", and if the funder has code "Flash validates the signature via EIP-1271 (`isValidSignature`)". The signed order "caps the amount Flash can pull" and binds a deadline that is "verified onchain". ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md); [Non-custodial](https://flash.definitive.fi/docs/non-custodial.md))

**How it works.**
- `FollowerAccount` (one per follower) holds the follower's USDC, approves the Flash settlement contract up to the follower's cap, and stores a policy: token allowlist, per-order maximum, daily cap, expiry, allowed leaders, paused flag.
- The copier (a session key or an MCP-driven agent) gets a quote for the follower, then calls `authorize(order)` on the account. The contract rebuilds the EIP-712 digest from the order fields using Flash's domain from `orderTypedData`, checks the policy, books the amount against the daily cap, and stores the digest. `isValidSignature(digest, sig)` returns the magic value only for a stored, unpaused, unexpired digest.
- Unfollow sets `paused`, so every resting copied order becomes unsignable at settlement in one transaction, with no per-order cancels.
- Foundry invariant tests: total authorized never exceeds the daily cap; nothing is valid after pause; the digest matches Flash's typed-data hash for the recorded quotes.

```solidity
interface IFollowerAccount {
    function authorize(bytes calldata flashOrderStruct) external returns (bytes32 digest);
    function unfollow() external;
    function isValidSignature(bytes32 digest, bytes calldata sig) external view returns (bytes4);
}
```

**Go or no-go gate (first 4 hours).** Place one 2 USDC limit order from a minimal 1271 account on Base, submitting a placeholder signature for a digest the account has pre-approved. If Flash will not accept that funder, fall back to EOA session keys with the same policy checked offchain. That fallback is much weaker; switch to Idea 1 rather than ship it.

**Requirements.** Q1: brackets (take-profit and stop-loss legs) and limit orders via Flash API. Q2: the follower fills on Base mainnet, shown on Basescan. Q3: the "key on the slide" moment is the X clip.

**Why Definitive's judges would pick it.** It uses a Flash capability most rivals will not touch (1271 funders, P1 and section 8, point 5 of the history). It is non-custodial copy trading without vaults (P3), runs on real fills (P4), and lands the week after the 29 Oct Binance drain, which used 50 pre-signed EIP-7702 authorizations (`track_ideas/00_season.md`, signal 1). It answers the first thing a copy-trading user asks: what happens if the bot is hacked.

**Closest past projects and the twist.** [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4) (follower vaults, mocked payments, no partner prize), [minidao](https://ethglobal.com/showcase/minidao-ahbhs) (shared wallet), [watermark](https://ethglobal.com/showcase/watermark-68230) (Tokyo 2026 finalist: the Safe signs once and one fill "cannot move more than 50 ETH", on 1inch Aqua), [Igris AI](https://ethglobal.com/showcase/igris-ai-nvfh6) (7702 security agent). Twist: the cap lives in the follower's own account and is checked by the venue's settlement path; there is no pooled vault and nothing to trust in the copier.

**Stack options (3 partner cap).**
- **World "World ID Agent Pass"** ($5,000; 1st $2,500): a copy above the cap, or following a new leader, needs a fresh human verification. Show the denied path (the agent's request expires and the order is never authorized), validate on our backend, and include the debrief. The backend then signs an "approved by a verified human" attestation that `authorize` accepts once. State that trust assumption in the README. ([Mumbai World prizes](https://ethglobal.com/events/mumbai/prizes/world))
- **EF "Best CROPS App"** (weak, at most one EF prize): the lead property is S (a leaked key cannot drain the account). C is weak because Flash is a centralized executor; write that trade-off in the README's CROPS section. ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation))
- Recommended set: Definitive + World. Add EF only if the README work fits.

**Difficulty (36 h).** High. Matching Flash's EIP-712 digest onchain and getting the 1271 path accepted are the risks; everything else is routine.

**Team fit.** The best of the five: Solidity policy contract, invariant fuzzing, and an attack demo.

---

## Idea 3. Desk: trading desks as ENSv2 names, where one record moves everyone's bracket (stacks with ENS)

**Pitch.** A squad is an ENSv2 name. The captain, human or agent, may edit only the squad's "call" record. Each member's own bracket follows that record, and nobody else's funds or caps can be touched.

**Falsifiable promise.** "The captain moves every member's stop by editing one ENS record, and cannot change any member's size, cap or wallet. A member who edits their own cap changes only their own orders."

**20 second demo moment.** The captain edits `alpha.desk.eth`'s call record to raise the stop. Within seconds three members' Flash brackets show the new trigger (via `PATCH /orders/{id}`, one tap each, or automatically for agent members). The captain then tries to edit `bob.alpha.desk.eth`'s cap record and the Enhanced Access Control check reverts. Finally a member's entry fills on Base.

**How it works.**
- A custom ENSv2 subname registry under the team's name (Sepolia allowed) issues `squad.desk.eth` and member subnames. Each member's subname gets its own Permissioned Resolver, so the member owns its records (wallet, cap, auto-follow flag). Enhanced Access Control grants the captain role the right to edit only the squad's `call` text record. ([Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens))
- A watcher reads resolver events, turns each new call version into per-member Flash quotes (`limit` with `attachedBracket`), and pushes one-tap approvals. Member agents (bonus "if you bring AI agents into the mix") run with their own keys and an MCP or API client, and follow automatically within their recorded cap.
- Stop moves use the bracket update endpoint shipped 28 Oct ("`PATCH /orders/{orderId}` now accepts a `bracket` order"). ([changelog](https://flash.definitive.fi/docs/changelog.md))

**Requirements.** Q1: limit with attached bracket, plus bracket updates. Q2: at least one member fill on Base mainnet. Q3: the clip of one ENS edit moving three orders is the X post.

**Why Definitive's judges would pick it.** "People in it together" is literally a group with one call (P2). It uses the newest Flash features, bracket updates and limit legs from 27 and 28 Oct (history section 4). Every member is self-custodied (P3).

**Closest past projects and the twist.** [minidao](https://ethglobal.com/showcase/minidao-ahbhs) (a pooled group wallet that votes on trades), [calendefi](https://ethglobal.com/showcase/calendefi-6d3ji) (ENS subnames; RSVPs as approvals; ENS 3rd), [TradeSphere](https://ethglobal.com/showcase/tradesphere-5vdrw) (Lens social layer over trading). Twist: no pooling and no voting. ENSv2 roles decide who may move the shared call, and that call only reshapes orders each member already signed for.

**Stack options.** **ENS "Best Use of ENSv2"** ($7,000; 1st $3,000): ENSv2 registry, Permissioned Resolver and Enhanced Access Control are central, and agents earn the stated bonus. Must be open source with a live demo link and no hard-coded values. Optional **World "Best Use of IDKit"** (Proof of Human for one seat per human on public desks), if time allows. Recommended set: Definitive + ENS.

**Difficulty (36 h).** Medium to high. ENSv2 went live on 27 Oct, so the docs are a week old (`track_ideas/00_season.md`, signal 3).

**Team fit.** Good: access control is audit territory, and the "captain cannot touch your cap" test is a natural property test.

---

## Idea 4. Siren: security watchers whose alerts move their followers' exits (stacks with Chainlink CRE)

**Pitch.** Security researchers publish onchain detectors (proxy upgrade, owner change, unbacked mint, pause). Holders follow a watcher, and when a detector fires, a Chainlink CRE workflow turns the alert into self-custodied Flash exits at a limit price, never a market dump.

**Falsifiable promise.** "When the watched contract is upgraded, the alert is onchain first, and every following wallet's position exits through a Flash limit order within one minute. No wallet ever gives us custody or a signing key."

**20 second demo moment.** We upgrade a proxy we deployed on Base; this staged risk event is clearly labelled on screen. The CRE workflow (CLI simulation) catches the `Upgraded` log, writes the alert to `SirenRegistry`, and posts it to X. Two follower wallets' resting brackets are cancelled and replaced by sell limits a hair under spot, which fill on Base. The alert transaction precedes both fills.

**How it works.**
- Detectors are small Solidity or TypeScript rules, registered in a plain onchain registry: watcher address, watched contract, rule ID.
- The CRE workflow (EVM log trigger, an external call to an explorer or verification API to confirm, and an onchain write of the alert) is the orchestrator. "Simulation is enough" for Chainlink. ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink))
- Followers either tap a pushed "exit at limit" prompt (one signature), or run a follower agent with their own key that acts on onchain alerts from watchers they follow. Batch cancel handles up to 25 open orders under one signature. ([Cancelling orders](https://flash.definitive.fi/docs/cancelling-orders.md))
- Social layer: watcher pages with a public record (alerts, false positives, how much follower value exited before price impact).

**Requirements.** Q1: limit and bracket orders through Flash API. Q2: the exit fills on Base. Q3: the alert post and the video go to X tagging @DefinitiveFi.

**Why Definitive's judges would pick it.** The trigger is the original part (P1: like PolySwap's prediction-market trigger, but a security event). It is "agent-run products other users can follow" from the brief, built by people who write detectors for a living, and it protects user wallets in the week of the year's biggest hack (`track_ideas/00_season.md`).

**Closest past projects and the twist.** [Igris AI](https://ethglobal.com/showcase/igris-ai-nvfh6) (moves funds to safety on vulnerabilities; no partner prize), [CollaSwitch](https://ethglobal.com/showcase/collaswitch-ahx66) and [PolySwap](https://ethglobal.com/showcase/polyswap-t53br) (condition-triggered swaps). Twist: the trigger is a published security detector with a public track record that people follow, and the exit is a bounded limit order, not a market swap.

**Stack options.** **Chainlink "Best workflow with CRE"** ($1,500), where CRE is the orchestration layer. **World "World ID Agent Pass"** as a second stack: a watcher's alert above a value threshold requires the watcher to re-verify as a human before followers' agents act, which sybil-proofs fake watchers. Recommended set: Definitive + Chainlink CRE (+ World if time allows).

**Difficulty (36 h).** High: three moving parts (CRE, detectors, follower execution). Cut to one detector and two followers.

**Team fit.** Strong for the detector content; CRE is new to the team.

---

## Idea 5. Chart to Bracket: post a chart, get a resting bracket (stacks with 0G)

**Pitch.** In a Telegram group, post a chart screenshot with your entry, target and stop lines drawn; a bot reads the lines with a 0G vision model and replies with a one-tap Flash bracket at those levels. When it fills, the bot announces it to the group, and others can copy the same levels.

**Falsifiable promise.** "Any chart with three horizontal lines becomes a resting Flash bracket at those prices within 30 seconds, and the overlay shows exactly what the model read before anyone signs."

**20 second demo moment.** A judge sends their own chart screenshot to the group. The bot replies with the image, the three detected lines drawn over it, and the 0G request ID. The judge taps, signs with an embedded wallet, and the order rests; a second member taps "same levels". The entry, set marketable, fills on Base and the bot posts the Basescan link.

**How it works.**
- A Telegram bot and mini app, with Privy embedded wallets ("works seamlessly with ... Privy, Dynamic or Coinbase Embedded Wallets", from the brief).
- 0G Private Computer with a vision model (`qwen vision` is listed) returns strict JSON (pair, entry, target, stop) plus a request ID. The code sanity-checks the levels against the Flash `/search` price (ordering, distance from spot) and refuses implausible reads.
- Flash `limit` with `attachedBracket`; fills tracked over the Orders WebSocket. A group leaderboard ranks whose charts actually filled and hit target.

**Requirements.** Q1: limit plus bracket (take-profit and stop-loss legs). Q2: the fill on Base. Q3: the X clip of a judge's chart turning into an order.

**Why Definitive's judges would pick it.** It is the most retweetable demo of the five (P6), lives inside the social channel (P2, like PolySwap and Poukav), and the bracket, Flash's newest feature, is the product. The risk is that it reads as a toy; the overlay and the refusal path keep it honest.

**Closest past projects and the twist.** [PolySwap](https://ethglobal.com/showcase/polyswap-t53br) (Telegram mini app, CoW 2nd), [Tgwap](https://ethglobal.com/showcase/tgwap-qryok) (non-custodial Telegram sell automation), [Streme.fun](https://ethglobal.com/showcase/streme-fun-4dppy) (a Farcaster agent that acts on chat requests). Twist: the input is the trader's own drawn chart, and the output is a protected bracket rather than a market buy.

**Stack options.** **0G "Build with 0G PC"** ($5,000; 1st $2,500): inference "in your main user flow, with request IDs", a reason to come back tomorrow (open orders and the group leaderboard), and "what breaks if 0G is removed" (nothing can read the chart). ([Mumbai 0G prizes](https://ethglobal.com/events/mumbai/prizes/0g)) Not 0G "Agents That Pay for Themselves": Flash integrator fees land in a vault documented only with a manual "Click Withdraw", so a no-human loop is unproven (history question 4). Recommended set: Definitive + 0G.

**Difficulty (36 h).** Medium. Vision accuracy on messy charts is the risk; the confirmation overlay is the mitigation.

**Team fit.** Weakest on security depth, strongest on speed: the most frontend-heavy idea.

---

## Comparison and recommendation (Judgement)

| # | Idea | Promise strength | Definitive fit | Stack (partners) | Difficulty | Team fit |
|---|---|---|---|---|---|---|
| 1 | Called It | High (judges try to fake a call) | High | Definitive only (narrow) | Medium | Strong |
| 2 | Leash | Very high (key on the slide) | High, uses 1271 funders | Definitive + World (+ EF CROPS, weak) | High | Best |
| 3 | Desk | High | High, newest bracket features | Definitive + ENS (+ World IDKit) | Medium to high | Good |
| 4 | Siren | High, but the trigger is staged | Medium to high | Definitive + Chainlink CRE (+ World) | High | Strong content, new tooling |
| 5 | Chart to Bracket | Medium | High on virality | Definitive + 0G | Medium | Weakest |

- **Best for the Definitive prize alone:** Idea 2 if the 1271 gate passes by hour 4, otherwise Idea 1. Both show something no other entry can: an enforced limit, or an unfakeable leaderboard.
- **Best for stacking:** Idea 3 (ENS pays $7,000 and asks for agents) or Idea 2 with World.
- **Finalist potential:** Idea 2 is the only one with a single live, adversarial beat (a published key that cannot spend) that suits the 4 minute ETHGlobal demo.

## Track combination pass

Within the cap of 3 partner prizes (a partner with several tracks counts as one; EF places a project in at most one EF prize; the finalist track does not count).

| Build | Partner picks | Notes |
|---|---|---|
| Leash | Definitive, World (Agent Pass), EF (CROPS, optional) | World requires a denied path and a debrief; EF requires the README CROPS section, a demo of 3 minutes max, and no trackers |
| Desk | Definitive, ENS (ENSv2), World (IDKit) | ENS requires a live demo link and open source; IDKit requires the "minimum sufficient credential" explanation |
| Siren | Definitive, Chainlink (CRE), World (Agent Pass) | CRE simulation is enough; keep the staged trigger labelled |
| Chart to Bracket | Definitive, 0G (0G PC) | 0G needs request IDs on screen and a video under 3 minutes |
| Called It | Definitive | Optional Arc rebuild only if Flash quotes on Arc and the build starts in Arc Studio |

Combining with other Mumbai plans: the team's plans A to E all mark Definitive as "Skip" (`plans/A_verified_anon_reads.md` to `plans/E_verified_frontend.md`). None of these ideas reuses their code paths. Leash is the only one with a shared theme (signing safety), with `reports/ETHGlobal finalist ideas 2023 to 2026.md` "Tripwire" and "Truthsign". It enforces at the venue's settlement rather than at the mempool or the signing screen, so it is distinct.

## Questions to ask before committing

See `track_ideas/history/definitive.md` section 9. The two that decide the choice: question 3 (whether Flash calls the funder's `isValidSignature` with the order's EIP-712 digest at submit and at settlement, and accepts a placeholder signature for a pre-approved digest; decides Idea 2) and question 1 (whether a marketable limit counts as advanced-order execution; affects every demo).
