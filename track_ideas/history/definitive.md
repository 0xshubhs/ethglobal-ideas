# Definitive at ETHGlobal: track history and judge patterns (as of 2026-10-31)

Sponsor: Definitive Finance (definitive.fi), sponsoring as "Definitive" at ETHGlobal Mumbai with $5,000: "Best Use of Flash Advanced Orders in a Social App" ($2,500, single winner, open to fresh builds) and "Most Creative Use of Definitive Flash Advanced Orders" ($2,500, Continuity only, so not open to us). ([Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive); verbatim text in `track_ideas/00_current_tracks.md`, section "Definitive ($5,000)")

**How to read this file.** Lines under "Sourced facts" carry a URL or a repo path. Lines marked **Judgement** are this researcher's inference. Definitive has no ETHGlobal history, so most of the "what judges reward" evidence comes from analogous tracks at past ETHGlobal events (conditional orders, Telegram trading, social trading), and the file says so wherever it does.

---

## 1. Definitive's ETHGlobal history: none before Mumbai

### Sourced facts

- On 2026-10-31 I fetched the prize pages of 37 ETHGlobal hackathons from late 2023 to October 2026, one at a time with pauses, and searched the embedded sponsor data for "Definitive". No bot check was shown on prize pages. The events: ethonline2023, istanbul, circuitbreaker, lfgho, frameworks, london2024, scaling2024, sydney, hackfs2024, starkhack, brussels, superhack2024, ethonline2024, singapore2024, sanfrancisco2024, bangkok, agents (Agentic Ethereum), trifecta, cannes, taipei, prague, unite, newyork2025, newdelhi, ethonline2025, buenosaires, hackmoney2026, newyork2026, lisbon2026, cannes2026, tokyo2026, openagents, ethonline2026, autonomous, buildquest, scaling, unicode (URL pattern `https://ethglobal.com/events/<slug>/prizes`, slugs from [the events list](https://ethglobal.com/events)).
- Result: no sponsor named Definitive on any of them. The only text matches were Blockscout's sponsor blurb ("your definitive gateway to the blockchain world") on brussels, superhack2024, bangkok, ethonline2025 and prague. The same search on the Mumbai page does find the sponsor (`"name":"Definitive"`, slug `definitive-finance`), so the method works. ([Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive))
- None of the five finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` (320 finalists with the partner prizes each won) mentions Definitive.
- Web searches for Definitive bounties at Devfolio, ETHIndia, ETHDenver, Solana or Colosseum hackathons found nothing. One company profile mentions only a co-hosted side event at ETHDenver ([BounceWatch](https://bouncewatch.com/company/definitive)). This is a weak negative result: search coverage of small sponsor bounties is poor.
- The product is new. Flash API's changelog begins "August 6, 2026: Updates since Flash API launched", and the integrator onboarding screenshots are dated July and August 2026. ([Flash changelog](https://flash.definitive.fi/docs/changelog.md); [Become an Integrator](https://flash.definitive.fi/docs/getting-started.md))

### Judgement

Mumbai is Definitive's first ETHGlobal event, and Flash is about three months old. No past winners exist to copy, which helps a fresh build: Definitive's judges have no house style yet, and they will compare every entry with what Flash's own docs say Flash is for. The rest of this file reconstructs what those judges are likely to reward, from (a) Definitive's own wording and product direction, and (b) the closest tracks other sponsors ran at ETHGlobal, together with their winners and non-winners.

---

## 2. The current Mumbai tracks, verbatim essentials

Sourced from [Mumbai Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive), fetched 2026-10-31 (full text in `track_ideas/00_current_tracks.md`).

**Best Use of Flash Advanced Orders in a Social App** ($2,500, one winner, `building-from-scratch`)
- Problem statement: "Trading is more fun, and stickier, when it's not a solo activity. Build the best social trading agent or app on top of Flash's advanced order types and show us what trading looks like when people are in it together."
- Listed directions: "Copy trading using Flash for trade execution"; "Trade signals or leaderboards shared to X, TikTok and other social channels"; "Agent-run products (e.g Grok bot) other users can follow"; "Your own take, any product that makes trading a shared experience".
- Tips: non-custodial, "works seamlessly with any EOA wallet or embedded wallet solution like Privy, Dynamic or Coinbase Embedded Wallets"; "Every order type (DCA, Limit, Stop Loss, Stop Buy, Take Profit, TWAP, Bracket) runs through the same orders endpoint"; "You can attach a fee to every trade you route through Flash, so your social trading product can be monetized from Day 1"; "Flash is AI-native and agent-friendly, and has an MCP server and LLM-optimized docs".
- Qualifications: "A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP)."; "Onchain execution shown in the final demo."; "Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X."
- No "Won't place" list and no judging rubric are published.

**Most Creative Use of Definitive Flash Advanced Orders** ($2,500, Continuity only; ignored for building, used only as evidence)
- "Awarded to the team that takes Flash's advanced orders somewhere unexpected, incorporated in a bigger agent workflow, paired with another protocol's tools, or given a strategy nobody has imagined."
- It is the only Definitive text with judging words: "originality of the integration, technical creativity, and how well the demo shows off what Flash can do".

No Definitive workshop is scheduled at Mumbai. ([event page](https://ethglobal.com/events/mumbai))

---

## 3. What Flash actually is (facts that shape what can be built)

All from the Flash docs, fetched 2026-10-31.

- **Flow:** `POST /quote` returns an EIP-712 `orderTypedData`; the funder signs it; `POST /order` submits it; Flash's "performers" land the transaction, with MEV protection and simulation. Base URL `https://flash.definitive.fi/v1`, header `x-definitive-api-key`. ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md))
- **Order types in the API enum:** `market`, `limit`, `twap`, `stop`, `stop-loss`, `take-profit`, `bracket`, `trailing-stop`, `trailing-stop-limit`. **There is no `dca` type**, although the track text and the qualifications list DCA. TWAP needs `durationSeconds` of at least 300. ([OpenAPI](https://flash.definitive.fi/v1/openapi.json); [TWAP](https://flash.definitive.fi/docs/twap-order.md))
- **Chains:** arbitrum, arc, avalanche, base, bsc, ethereum, hyperevm, ink, monad, optimism, plasma, polygon, robinhood, solana. Arc support went live on 16 Sep 2026. ([Supported chains](https://flash.definitive.fi/docs/supported-chains.md); [changelog](https://flash.definitive.fi/docs/changelog.md))
- **No testnet:** "We recommend testing on a production chain like Base or Solana using small amounts." ([FAQ](https://flash.definitive.fi/docs/faq.md))
- **Custody model:** a one-time ERC-20 approval (unlimited by default) or Permit2, plus an offchain order signature per order. "A Flash order signature authorizes an input debit, not a guaranteed receive amount", and "Conditional parameters such as a limit price, TWAP schedule, or trigger price are held offchain by Flash's execution engine and are not embedded in the signature." ([Non-custodial](https://flash.definitive.fi/docs/non-custodial.md))
- **Smart accounts:** "Flash accepts EIP-1271 smart-wallet signatures on all EVM chains." If the funder address has any code, including a 7702 delegation, Flash validates with `isValidSignature`. ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md))
- **Settlement contract:** `0x5d00000873b6BF41539e6f5365B0Ff7d3c368f78`, "deployed at the same address on every supported EVM chain". Each fill in `GET /orders/{orderId}` carries `transactionId`, `fillPrice`, `venues` and fee fields. ([Security](https://flash.definitive.fi/docs/security.md); [Post-trade reporting](https://flash.definitive.fi/docs/post-trade-reporting.md))
- **Fees:** integrator fee `flashIntegratorFeeBps`, sent identically on quote and order, paid into the integrator's Flash Portfolio vault. Withdrawal is documented only as a manual "Click Withdraw" in app.definitive.fi. Definitive itself charges a "10 bps (0.10%) promotional fee on advanced orders" through 31 Dec 2026, and market orders carry no added fee. Base builder codes via `erc8021AttributionCode`. ([Monetize](https://flash.definitive.fi/docs/monetizing-your-integration.md))
- **Limits:** 5 requests per second per endpoint per API key; the Orders WebSocket allows at least 50 connections per key, one funder per connection. ([Rate limits](https://flash.definitive.fi/docs/rate-limits.md))
- **MCP:** `@definitive-fi/flash-mcp`, MIT licensed, tools `flash_quote`, `flash_submit_order`, `flash_get_order`, `flash_list_orders`, `flash_cancel_order` and others. It reads the funder private key from the OS keychain or the `DEFINITIVE_PRIVATE_KEY` environment variable. ([Flash MCP](https://flash.definitive.fi/docs/flash-mcp.md))
- **Lifecycle:** resting orders are automatically cancelled with `REASON_INSUFFICIENT_FUNDER_BALANCE` when the wallet no longer holds the input (15 Oct 2026). `PATCH /orders/{id}` moves limit, trigger or bracket prices with a gasless signature. Batch cancel takes up to 25 orders under one signature. ([changelog](https://flash.definitive.fi/docs/changelog.md); [Updating orders](https://flash.definitive.fi/docs/updating-orders.md))

---

## 4. How the problem statement fits Definitive's own product direction

There are no earlier Definitive tracks to compare against, so the evolution below is of the product, from the changelog. It is the best available signal of what Definitive wants shown.

| Date (2026) | Shipped | What it signals (Judgement) |
|---|---|---|
| 6 Aug | Launch features: cross-chain market orders, post-trade reporting, integrator dashboard, order updates, asset search, cross-rate pricing, TWAP start time | Volume and reporting are first-class from day one |
| 17 to 19 Aug | Streaming quotes, wallet balances, setup transactions, trigger-price updates, **bracket orders** | Pushing beyond swaps into managed positions |
| 11 to 29 Sep | **Minimal authorization**, Ink and Arc chains, batch cancel, deadline-bounded Permit2 permits | Security-conscious integrators are a target audience |
| 15 Oct | Auto-cancel of depleted resting orders | Hygiene for many resting orders across many wallets (copy trading creates exactly this) |
| 22 to 29 Oct | **Standalone brackets**, bracket expiry, all-in market pricing, bracket limit legs, bracket updates, **trailing stops (29 Oct)** | The newest surface. A demo that uses brackets or trailing stops is showing features less than a week old |

Source: [Flash changelog](https://flash.definitive.fi/docs/changelog.md).

**Judgement.** The Mumbai social track asks for distribution, not new order types. Definitive already builds the order types itself (it shipped trailing stops a week before the event). What it lacks is products that bring other people's volume through its integrator key, plus public posts on X tagging @DefinitiveFi. The qualifications reveal the priorities: real onchain execution (no mock), a social surface, and marketing (an X video). The tips stress embedded wallets, integrator fees and MCP. The Continuity track's criteria ("originality of the integration, technical creativity, how well the demo shows off what Flash can do") are the closest thing to a rubric, and it is reasonable to expect the same people to judge both tracks.

---

## 5. Analogous past ETHGlobal tracks, their winners, and why they won

Because Definitive has no history, I took the tracks closest in spirit: sponsor-run conditional and advanced order tracks, Telegram trading tracks, and social or viral agent tracks. Winners come from "Winner of" badges on showcase pages. Candidates came from showcase listings (`https://ethglobal.com/showcase?events=<slug>&page=N`) whose cards carry the sponsor's logo. Two showcase pages returned HTTP 429 once; one recovered after a pause and one (UniRoll) did not, and I did not retry it further.

### 5.1 CoW Protocol, ETHGlobal Istanbul (Nov 2023)

Tracks (amounts from the prize data): "CoW Programmatic Framework" $4,000; "Creative CoW Hooks" $4,000; "Wonderful Widgets" $1,000; "MEV Blocker Madness" $400. Hooks brief, verbatim excerpt: "CoW Hooks allow traders to group DeFi actions like swapping, bridging, staking, borrowing, and more into a single intent ... Automated collateral manager ... via stop-loss orders ... Automated portfolio rebalancing". ([Istanbul prizes](https://ethglobal.com/events/istanbul/prizes); [CoW Istanbul](https://ethglobal.com/events/istanbul/prizes/cow-protocol)) The Gearbox workshop at the same event was titled "GearBots: Intent Agents": "Copy Trading, TWAP, DCA, stop loss, and many other intents a bot can do". ([Istanbul prizes](https://ethglobal.com/events/istanbul/prizes))

| Project | Prize (badge) | What it built |
|---|---|---|
| [4DLimitOrder](https://ethglobal.com/showcase/4dlimitorder-ew7xf) | CoW Programmatic Framework, 2nd | A new order type whose "target price ... can change over time", a superset of limit, market and Dutch auction orders; two of them "automatically trade an ascending channel" |
| [Karvest](https://ethglobal.com/showcase/karvest-1mv8r) | Creative CoW Hooks, 1st; Gnosis pool | Harvests lending and staking rewards on a schedule and swaps or restakes them, using hooks, programmatic orders and a Safe fallback handler, presented as a Safe app |
| [TradeSphere](https://ethglobal.com/showcase/tradesphere-5vdrw) | Creative CoW Hooks, 2nd; 1inch "Enhance your app with 1inch Developer Portal APIs", 3rd; 1inch "Best Use of Dev Portal APIs" (bronze); Gearbox "Best use of Credit Accounts + GearBot intents" ("Genius Gearbot") | "Social layer" for DeFi traders: Lens posts to share strategies, gasless composable CoW stop-loss orders through a Safe, Gearbox margin bots, in-app messaging |
| [Tgwap](https://ethglobal.com/showcase/tgwap-qryok) | CoW Wonderful Widgets; WalletConnect pool | Telegram bot for set-and-forget sells, pitched as non-custodial against Telegram bots that "keep Private keys in centralized servers" |

### 5.2 CoW DAO and Euler, ETHGlobal Bangkok (Nov 2024)

CoW DAO "Programmatic Orders" $4,000 (1st $2,500, 2nd $1,500). Verbatim: "Winners of this hackathon prize will develop advanced conditional order types with CoW Protocol's programmatic order framework ... Example submissions might include: Trailing stop loss orders, VWAP orders, Bracket orders, Funky conditionals (i.e. only buy when it rains in Dubai)". Qualifications include "Prizes will be awarded to the most innovative and unique use of Programatic Orders" and "Each submission should be capable of creating a working order on testnet or Mainnet". Also "Hooks" $4,000 and "Open Innovation" $2,000. ([CoW DAO Bangkok](https://ethglobal.com/events/bangkok/prizes/cow-dao))

Euler "Euler Telegram Integration" $5,000 (1st $3,000, 2nd 2 x $1,000): "awarded to the team who best delivers a consumer-ready Telegram integration for Euler V2 ... any other creative and viral market need integrating Telegram into Euler." ([Bangkok prizes](https://ethglobal.com/events/bangkok/prizes))

| Project | Prize (badge) | What it built |
|---|---|---|
| [μMoo](https://ethglobal.com/showcase/mmoo-3fzgd) | CoW Programmatic Orders, 1st; Brevis 1st | Brevis ZK coprocessor computes mean prices and z-scores over CoW settlement events; the proven statistics drive a ComposableCoW conditional order ("Verifiable data driven programatic orders") |
| [PolySwap](https://ethglobal.com/showcase/polyswap-t53br) | CoW Programmatic Orders, 2nd | Telegram mini app: Polymarket odds trigger swaps automatically ("trustlessly and automatically pull data from prediction markets to trigger DeFi swaps") |
| [CollaSwitch](https://ethglobal.com/showcase/collaswitch-ahx66) | **Not** placed in Programmatic Orders; won CoW "Open Innovation", Euler Telegram 2nd, Brevis 2nd, Pyth 2nd, Blockscout pool | Collateral or debt swap on Aave or Euler when a price or interest-rate condition is met, "powered by CowSwap Programmatic Order" |
| [Poukav](https://ethglobal.com/showcase/poukav-i0j57) | Euler Telegram Integration, 1st; Web3Auth mini apps | Telegram Mini App that monitors Euler vault positions and alerts on or automatically rebalances them toward better APY |
| [Telepay.cc](https://ethglobal.com/showcase/telepay-cc-20zcy) | Euler Telegram Integration, 2nd; Nillion; ENS Durin; Blockscout pool | Telegram micropayments with self-custody abstracted and USD DeFi yield underneath |

PolySwap later applied for a CoW grant that cites the Bangkok award. ([CoW forum](https://forum.cow.fi/t/grant-application-polyswap/3052))

### 5.3 Gaia and Collab.Land, Agentic Ethereum (Feb 2025)

"Most Viral Agent" $2,500: "Build an agent that captures attention and drives social engagement through creative interactions. Example Ideas: AI Meme Battle Agent, Onchain Storytelling Agent, Social Trading Character ...". Core requirements included "Viral content generation capabilities", "Social engagement mechanics", "Growth analytics", "Viral loops". ([Agentic Ethereum prizes](https://ethglobal.com/events/agents/prizes)) I did not look up this track's winners; it is cited only for its wording, which is the closest earlier text to Definitive's "agent-run products other users can follow".

### 5.4 1inch limit-order tracks, 2025 (from the repo's finalist catalogues)

All seven Unite DeFi finalists built on the 1inch Limit Order Protocol, Fusion+ or the 1inch APIs. Examples: [1Option](https://ethglobal.com/showcase/1option-0xw4f) (covered options minted only when a signed limit order fills; won the 1inch "Expand Limit Order Protocol" prize), [Zeroinch](https://ethglobal.com/showcase/zeroinch-cfkjq) (private 1inch limit orders) and [PonyHof](https://ethglobal.com/showcase/ponyhof-65wtr) (encrypted dark-pool relay for limit orders). (`research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2025q1_2025q3.md`)

### 5.5 Social trading at the finalist table, and what partner judges did with it

| Finalist | Event | Idea | Partner prizes |
|---|---|---|---|
| [minidao](https://ethglobal.com/showcase/minidao-ahbhs) | Bangkok 2024 | Telegram bot giving a group a shared wallet; members propose and vote on trades | Blockscout pool only |
| [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4) | New Delhi 2025 | Copy trading of AI trading workflows (TWAP, grid, LP), with strategy and follower vaults; the team "set up mock x402 payment flows" | None shown |
| [Hubble Trading Arena](https://ethglobal.com/showcase/hubble-trading-arena-oddx1) | Buenos Aires 2025 | Arena where trading agents hire and rate research agents (ERC-8004, x402, 0G), then trade | None shown |

Sources: `research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2024q3_2025q1.md` and `finalists_2025q3_2026q1.md`.

---

## 6. Why the winners won (Judgement, from the comparisons above)

1. **The novel part was the trigger or the shape, not the plumbing.** μMoo beat the field because its condition was a ZK-proven statistic, PolySwap because its condition was a prediction-market probability, and 4DLimitOrder because the price moves over time. CollaSwitch used the same programmatic-order framework on a plain price or interest-rate condition and did **not** place in that track; CoW gave it Open Innovation instead. Lesson for Flash, where the order types already exist: what decides when an order is placed, sized or moved must be the original part, and one an observer can check.
2. **Living inside the social channel wins channel-themed tracks.** Poukav (1st), PolySwap and Tgwap all ran inside Telegram, and the Euler brief said "consumer-ready". Being reachable from a link in a post or a chat is what made them feel finished.
3. **Non-custody is a selling point to trading-infra sponsors.** Tgwap pitched against key-holding Telegram bots. Flash's whole docs story is "non-custodial by design". A social trading app that keeps every follower self-custodied, and can show it, speaks the sponsor's language.
4. **Real execution beats mocks.** The three social-trading finalists in section 5.5 impressed the ETHGlobal judges but collected almost nothing from partners; KagamiAI openly mocked its payment flow. Definitive's "Onchain execution shown in the final demo" spells this rule out.
5. **Breadth stacks, depth places first.** TradeSphere collected four partner prizes by wiring several sponsors into one social layer, but its CoW prize was 2nd. The first places (μMoo, Karvest, Poukav) went to one deep, working loop.
6. **The demo shows the sponsor's product doing the work.** Every winner above showed an order actually created or executed with the sponsor's machinery; CoW's qualifications demanded "a working order on testnet or Mainnet". Definitive asks for the same, plus a public X post.

---

## 7. Current track mapped to its nearest past tracks

| Mumbai track | Nearest past tracks | Status | What changed (Judgement) |
|---|---|---|---|
| Best Use of Flash Advanced Orders in a Social App (fresh) | CoW Programmatic Framework (Istanbul 2023), CoW Programmatic Orders (Bangkok 2024), Euler Telegram Integration (Bangkok 2024), Gearbox GearBot intents with copy trading (Istanbul 2023), Gaia "Most Viral Agent" (Agentic Ethereum 2025) | **New** for Definitive; a repeated *theme* across ETHGlobal | CoW asked hackers to build order types; Flash gives them all through one endpoint, so the challenge moves to the social product and its distribution. Unlike CoW, mainnet only (no testnet), plus a marketing requirement (X video tagging @DefinitiveFi) |
| Most Creative Use of Definitive Flash Advanced Orders (Continuity) | CoW "most innovative and unique use of Programatic Orders" (Bangkok 2024) | New; not open to us | Same "creativity" wording as CoW 2024 |

---

## 8. What Definitive's judges will probably reward (Judgement)

Ranked by expected weight, for a single $2,500 winner judged from repo, README and video.

1. **A real advanced order filling onchain during the video**, with the fill's `transactionId` opened on an explorer. A market order is not enough; it must be one of the listed types (limit, stop, stop-loss, take-profit, TWAP, or a bracket containing take-profit and stop-loss legs).
2. **Other people in the loop.** At least two wallets acting because of one social event (a post, a follow, a group call). A single-user dashboard with a share button is weak.
3. **Flash used beyond quote and order:** brackets or trailing stops (the newest), `PATCH` updates, batch cancel, the Orders WebSocket, `flashIntegratorFeeBps` set to a real number, embedded wallets.
4. **A product Definitive can retweet.** The X video is a requirement; the best entries will make the X post itself part of the product (share cards, deep links that open a prefilled order).
5. **Something that only works because of Flash's design**: non-custodial resting orders, EIP-1271 smart-account funders, cross-chain, many chains under one API.

Likely rival entries (Judgement): Telegram copy-trading bots, "Grok-style" X bots that turn a post into a market buy, PnL leaderboards built from screenshots or offchain data, and LLM agents placing orders through MCP. Most will show a market order or a never-filled limit. An entry that shows a filled advanced order across several self-custodied wallets, plus a social mechanism a judge can verify, should stand out.

---

## 9. Questions to put to Definitive before building

No Definitive workshop is scheduled (event page). Ask on the ETHGlobal Discord partner channel or at the booth on Thu 5 Nov before 21:00 IST.

1. Does a marketable limit order (price set through the market so it fills at once) count as "advanced order" execution for the demo, or should the fill come from a trigger firing?
2. Do `bracket`, `trailing-stop` and `trailing-stop-limit` count toward the qualification list, which names only DCA, Limit, Stop, Stop Loss, Take Profit and TWAP? Is a recurring TWAP the intended "DCA"?
3. For EIP-1271 funders: is `isValidSignature` called with the order's EIP-712 digest both at submit and at settlement, and are the `userSignature` bytes passed through unchanged (any length limit)? Will a contract that pre-approves a digest and ignores the signature bytes be accepted? Is the check repeated for each TWAP slice?
4. Is the integrator vault withdrawal callable directly by the fee wallet onchain (contract and function), or only through app.definitive.fi?
5. Which pairs quote on Arc and on Robinhood Chain today, and what is the practical minimum order size on Base?
6. Can hackathon keys get a higher limit than 5 requests per second for copy-trading fan-out?
7. Is the settlement contract's event layout stable enough to index fills directly, not only through `GET /orders`?
8. Is a Farcaster or Telegram product acceptable as the "social app", given that the video must be on X?

---

## 10. Gaps and caveats

- The negative history result covers ETHGlobal prize pages only. Other hackathons were searched on the web, not exhaustively.
- Winners of the Istanbul "CoW Programmatic Framework" 1st place and of the Agentic Ethereum "Most Viral Agent" were not confirmed (one 429; one not looked up).
- I did not call the Flash API, so Arc and Robinhood Chain liquidity is unverified (question 5).
