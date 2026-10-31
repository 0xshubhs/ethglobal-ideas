# Uniswap Foundation at ETHGlobal, September 2023 to October 2026: track history

Written 2026-10-31 for the ETHGlobal Mumbai "Build with Uniswap" track. Companion idea file: `track_ideas/ideas_draft/uniswap.md`.

## How this was made

- **Prize text** comes from the Next.js flight data embedded in each event's prize page, `https://ethglobal.com/events/<slug>/prizes` (and `/prizes/uniswap-foundation`), fetched 2026-10-31 one page at a time. All 18 past events below returned HTTP 200 with no bot check. Quotes are verbatim; emojis are dropped and any em dash in the source would be shown as "[dash replaced]" (none occurred).
- **Winners** come from the showcase listings `https://ethglobal.com/showcase?events=<slug>&page=N`, whose project records carry the organization of each prize won (Uniswap's organization id is `026zc`), and from individual showcase pages, whose prize records name the track and place. Both were fetched slowly (2.5 s, then 15 s between requests).
- **Bot checks.** From about 10:28 IST, ETHGlobal began answering some showcase requests with a Cloudflare "Just a moment..." challenge, probably because several research agents were crawling at once. Each time, fetching stopped, the challenge pages were deleted, and the run resumed later at a slower rate. No challenge was bypassed. Where data is missing because of this, the gap is named and the existing catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` are used instead (cited as [CAT]).
- **Non-winner samples** come from the same listings: every project whose tagline or ETHGlobal auto-summary mentions Uniswap but whose record carries no Uniswap prize.
- Facts carry a URL or a file reference. Anything marked **Judgement** is this dossier's own reading.

---

## 1. Every ETHGlobal event with a Uniswap Foundation prize (Sep 2023 to Nov 2026)

Dates are event start dates from the prize pages' event data. "Projects" is the showcase count from this crawl (partial where marked). "Mentions" counts showcase projects whose tagline or auto-summary mentions Uniswap.

| # | Event (slug) | Start | Uniswap pool | Tracks | Projects | Mentions | Uniswap winners found |
|---|---|---|---|---|---|---|---|
| 1 | ETHGlobal New York 2023 (`newyork2023`) | 2023-09-22 | $20,000 | Hookathon $12,000 pool; Developer Tooling $3,000 pool; Open/Innovation $5,000 pool | not crawled | | none confirmed |
| 2 | ETHOnline 2023 (`ethonline2023`) | 2023-10-06 | $5,000 | Hookathon (3 x $1,666.67 pool) | not crawled (stopped after bot checks) | | none confirmed |
| 3 | ETHGlobal London (`london2024`) | 2024-03-15 | $10,000 | Best Use of Hook Features $5,000; Hooks & External Integrations $2,500; Open Track $2,500 | not crawled (stopped after bot checks) | | none confirmed |
| 4 | ETHGlobal Brussels (`brussels`) | 2024-07-12 | $20,000 | Hooks, Hooks, and Hooks $10,000; Integrations $6,000; Research and Experimentation $4,000 | not crawled; [CAT] | | Cook some hooks |
| 5 | ETHGlobal Singapore (`singapore2024`) | 2024-09-20 | $20,000 | Hooks, Hooks, and Hooks $10,000; Integrations & Periphery $6,000; Research & Experimentation $4,000 | not crawled; [CAT] | | Marina Royale |
| 6 | ETHGlobal San Francisco (`sanfrancisco2024`) | 2024-10-18 | $20,000 | Hooks, Hooks, and Hooks $10,000; Integrations, Research, and Experiments $5,000; Unichain $5,000 | not crawled; [CAT] | | UniV4Backtester |
| 7 | ETHGlobal Bangkok (`bangkok`) | 2024-11-15 | $20,000 | as San Francisco (Hooks $10,000 in 4 places; Unichain with 4 honorable mentions) | 257 of 713 (partial) | | 6 of about 14 |
| 8 | ETHGlobal Taipei (`taipei`) | 2025-04-04 | $5,000 | Uniswap v4 Hook Integrations | 226 | 4 | 3 |
| 9 | ETHGlobal New York 2025 (`newyork2025`) | 2025-08-15 | $10,000 | v4 Hooks on Unichain | 275 | 8 | 3 |
| 10 | ETHGlobal New Delhi (`newdelhi`) | 2025-09-26 | $10,000 | Build with Uniswap v4 Hooks | 614 | 14 | 5 |
| 11 | ETHGlobal Buenos Aires (`buenosaires`) | 2025-11-21 | $20,000 | Uniswap v4 Stable-Asset Hooks $10,000; Uniswap v4 Volatile-Pairs Hooks $10,000 | 473 | 16 | 10 |
| 12 | HackMoney 2026 (`hackmoney2026`, online) | 2026-01-30 | $10,000 | Uniswap v4 Agentic Finance $5,000; Uniswap v4 Privacy DeFi $5,000 | 618 | 96 | 6 |
| 13 | ETHGlobal Cannes 2026 (`cannes2026`) | 2026-04-03 | $10,000 | Best Uniswap API Integration | 265 | 22 | 4 |
| 14 | Open Agents (`openagents`, online) | 2026-04-24 | $5,000 | Best Uniswap API integration | 467 | 54 | 3 |
| 15 | ETHGlobal New York 2026 (`newyork2026`) | 2026-06-12 | $10,000 | Best Uniswap API Integration $7,000 (fresh); Best Uniswap Stack Contribution $3,000 (continuity) | 232 | 12 | 6 |
| 16 | ETHGlobal Lisbon 2026 (`lisbon2026`) | 2026-07-24 | $10,000 | Best Uniswap API Integration $7,000 (fresh); Best Uniswap Stack Contribution $3,000 (continuity) | 173 | 19 | 8 |
| 17 | ETHOnline 2026 (`ethonline2026`, online) | 2026-09-04 | $5,000 | Best Uniswap Stack Contribution $3,000 (fresh); same $2,000 (continuity) | 811 | 80 | 5 |
| 18 | ETHGlobal Tokyo 2026 (`tokyo2026`) | 2026-09-25 | $10,000 | Best Uniswap Stack Contribution $6,000 (fresh); same $4,000 (continuity) | 254 | 50 | 6 |
| 19 | **ETHGlobal Mumbai** (`mumbai`) | 2026-11-05 | $15,000 | **Build with Uniswap** $10,000 (fresh); same $5,000 (continuity) | | | |

Sources: each event's `https://ethglobal.com/events/<slug>/prizes/uniswap-foundation` page; Mumbai from [Mumbai Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation) and `track_ideas/00_current_tracks.md`.

Events checked with **no** Uniswap Foundation prize (prize pages fetched 2026-10-31; Uniswap appears only in other sponsors' text or in the technology list): Circuit Breaker, LFGHO, Scaling Ethereum 2024, Sydney, HackFS 2024, StarkHack, Superhack 2024, ETHOnline 2024, Agentic Ethereum, Trifecta, Prague 2025, Cannes 2025, Unite DeFi, ETHOnline 2025, Istanbul 2023.

Other Uniswap Foundation hackathons (context, not ETHGlobal): the Uniswap Hook Incubator "UHI6 Hookathon" winners (azex, symbiote, flashfi, unilend, opswap, lge) are listed beside the New Delhi recap in [UF Builder Update #37](https://uniswapfoundation.org/blog/builder-update-37-uniswap-cup-genius-act-rollups-research), and a "Uniswap House demo day" ran beside Buenos Aires ([UF Builder Update #41](https://uniswapfoundation.org/blog/uf-builder-update-41-buenos-aires-went-hard)).

---

## 2. Problem statements, verbatim, by era

### 2.1 Pre-launch v4 "Hookathon" era (New York 2023, ETHOnline 2023)

- New York 2023, "Hookathon - $12,000 (Pool Prize)": "Prizes will be awarded to the most innovative and unique hooks!" Ideas: "Automated Position Managers", "User Experience Enhancers", "Social Token Hooks", "Reduce LVR: Designs for opinionated MEV / LVR mitigation hooks", "TradFi Adoption". Plus "Developer Tooling for Hooks/Uniswap V4 - $3,000" ("Hook Library", "Debugging Driven") and "Open/Innovation Prize - $5,000" ("Build on top of Uniswap V3 or V4"). Requirement: "your project must integrate the Uniswap V4 Protocol or Uniswap V3 Protocol, including hooks for the Hookathon prizes." ([NYC 2023](https://ethglobal.com/events/newyork2023/prizes/uniswap-foundation))
- ETHOnline 2023: the same Hookathon text and ideas, a $5,000 pool split three ways. ([ETHOnline 2023](https://ethglobal.com/events/ethonline2023/prizes/uniswap-foundation))

### 2.2 First-class hook features era (London, Brussels, Singapore, San Francisco, Bangkok 2024)

- London 2024, "Best Use of Hook Features" ($5,000): "Leverage one (or multiple!) first-class hook features": "Dynamic Fees", "Custom Curves", "Hook Fees - charge bespoke fees", "NoOp - Elect to skip or delay an operation". "Hooks & External Integrations" ($2,500): "Submissions must incorporate external providers with a hook" (Axiom, Brevis, Clique, SUAVE, Violet, Aethos). "Open Track - Pool Operators, Public Goods, Research" ($2,500). All three: "**Eligible projects MUST submit to uniswaphooks.com**". ([London 2024](https://ethglobal.com/events/london2024/prizes/uniswap-foundation))
- Brussels 2024, "Hooks, Hooks, and Hooks" ($10,000): "Implement a Hook, leveraging first-class features": Dynamic Fees, "Custom Curves - replace the v3 concentrated liquidity with an alternative pricing algorithm", Hook Fees, "NoOp - asynchronous swap logic for transaction reordering", General Hooks. "Integrations" ($6,000, "hooks are optional"); "Research and Experimentation" ($4,000): "ERC-7683 - Cross-chain intents", "LVR Minimization", "MEV minimization/redistribution", "Execution in SUAVE, MPC, or other environments". Qualification: "Having a proper interface for submission is not mandatory. **However, evidence of working code is required**." ([Brussels](https://ethglobal.com/events/brussels/prizes/uniswap-foundation))
- Singapore 2024 added "Asynchronous Swaps / App-level sequencing" and "Liquidity managing hooks"; "Integrations & Periphery" named "Batched liquidity operations" via Position Manager's command system and "Liquidity Staking (Subscribers)"; "Research & Experimentation" added "Oracle designs" and "Moonshot experiments". ([Singapore](https://ethglobal.com/events/singapore2024/prizes/uniswap-foundation))
- San Francisco and Bangkok 2024: "Hooks, Hooks, and Hooks" as above; "Integrations, Research, and Experiments" ("A catch-all category for anything using Uniswap v4, but is not directly implementing a hook"; examples include "Hook backtesting", "Testing toolkits", "Parallel transaction simulation", "general-purpose Uniswap X filler for Uniswap v4"; qualification "The project must be incorporating Uniswap v4 as a dependency in some capacity"); and "Unichain": "Deploy a DeFi app to Unichain Sepolia!" with "Tokenomics & issuance mechanisms", "Uniswap v4 :)", "Leverage and Credit", and "testnet transactions are REQUIRED". ([San Francisco](https://ethglobal.com/events/sanfrancisco2024/prizes/uniswap-foundation); [Bangkok](https://ethglobal.com/events/bangkok/prizes/uniswap-foundation))

### 2.3 Single hooks track era (Taipei, New York 2025, New Delhi, Buenos Aires 2025)

- Taipei 2025, "Uniswap v4 Hook Integrations" ($5,000): "Projects in this category must implement meaningful integrations using Uniswap v4 Hooks." Qualifications: "Must use **Uniswap v4 Hooks** as a **core component**", "Clear, working example", "README with architecture, purpose, and how to run", "Clean, consistent GitHub commit history". ([Taipei](https://ethglobal.com/events/taipei/prizes/uniswap-foundation))
- New York 2025, "v4 Hooks on Unichain" ($10,000): "This bounty is an open track for projects that push the limits of what's possible in DeFi innovation using Hooks on Unichain." ([NYC 2025](https://ethglobal.com/events/newyork2025/prizes/uniswap-foundation))
- New Delhi 2025, "Build with Uniswap v4 Hooks" ($10,000; 1st $4,000, two 2nd $2,000, two 3rd $1,000): "an open track for projects that push the limits of what's possible in DeFi innovation using Hooks, with bonus points for those deploying on Unichain." Submit: repo, README, demo link or setup, "Demo Video (Max 3 min)". ([New Delhi](https://ethglobal.com/events/newdelhi/prizes/uniswap-foundation))
- Buenos Aires 2025: "Uniswap v4 Stable-Asset Hooks" ("synthetic lending, credit-backed trading, or optimized stable AMM logic") and "Uniswap v4 Volatile-Pairs Hooks" ("enhances liquidity resilience, mitigates Loss Versus Rebalancing (LVR), or improves capital efficiency"), each $10,000. New requirement: "TxID transactions (testnet and/or mainnet)". ([Buenos Aires](https://ethglobal.com/events/buenosaires/prizes/uniswap-foundation))

### 2.4 Themed v4 era (HackMoney 2026)

- "Uniswap v4 Agentic Finance" ($5,000): "agents that programmatically interact with Uniswap v4 pools for liquidity management, trade execution, routing, coordination ... Submissions should emphasize reliability, transparency, and composability over speculative intelligence. The use of Hooks is optional".
- "Uniswap v4 Privacy DeFi" ($5,000): "reducing unnecessary information exposure, improving execution quality, or designing market behavior that is more resilient to adverse selection and extractive dynamics. Submissions should emphasize responsible, transparent system design that preserves onchain verifiability and protocol integrity." ([HackMoney 2026](https://ethglobal.com/events/hackmoney2026/prizes/uniswap-foundation))

### 2.5 Uniswap API era (Cannes 2026, Open Agents, New York 2026, Lisbon 2026)

- Cannes 2026, "Best Uniswap API Integration" ($10,000): "Projects must integrate the Uniswap API with a valid API key from the Uniswap Developer Platform for core functionality such as trade execution, routing, payments, or coordination between agents or systems ... Submissions should reflect forward-looking approaches to onchain finance". New requirements: "Transaction IDs demonstrating real onchain execution" and "A completed submission to the Uniswap Developer Feedback Form". ([Cannes 2026](https://ethglobal.com/events/cannes2026/prizes/uniswap-foundation))
- Open Agents, "Best Uniswap API integration" ($5,000): "Build the future of agentic finance with Uniswap ... Agents that trade, coordinate with other agents, or invent primitives we haven't imagined yet". First appearance of **FEEDBACK.md**: "A FEEDBACK.md file in the repo root, required for prize eligibility. Tell us everything about your builder experience with the Uniswap API and Developer Platform: what worked, what didn't, bugs you hit, docs gaps, DX friction, missing endpoints, and what you wish existed." ([Open Agents](https://ethglobal.com/events/openagents/prizes/uniswap-foundation))
- New York 2026: API Integration ($7,000, fresh) adds "liquidity provision"; the continuity "Best Uniswap Stack Contribution" ($3,000) introduces the wider scope ("integrate the Uniswap AMM (v2, v3, or v4) or any Uniswap protocol such as CCA, new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem") and a "Best Video Presentation" special prize. ([NYC 2026](https://ethglobal.com/events/newyork2026/prizes/uniswap-foundation))
- Lisbon 2026: API Integration ($7,000, fresh) adds "The Uniswap API now also supports tokenized stocks, giving teams a new asset class to build on top of." The qualification becomes today's wording: FEEDBACK.md plus the form, "Submissions without it will be reviewed and audited before winners are finalized", and "Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration." ([Lisbon 2026](https://ethglobal.com/events/lisbon2026/prizes/uniswap-foundation))

### 2.6 Whole-stack era (ETHOnline 2026, Tokyo 2026, Mumbai)

- ETHOnline 2026 and Tokyo 2026, "Best Uniswap Stack Contribution" (fresh and continuity): "Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol. This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem." Tokyo fresh: $6,000 (1st $3,000, 2nd $2,000, 3rd $1,000); ETHOnline fresh: 3 x $1,000 pool. Workshop at both Tokyo and Lisbon: "How to Navigate the Uniswap Stack" (Angela Ocando): "the Uniswap API, v4 hooks, Uniswap AI, and open-source tooling". ([ETHOnline 2026](https://ethglobal.com/events/ethonline2026/prizes/uniswap-foundation); [Tokyo 2026](https://ethglobal.com/events/tokyo2026/prizes/uniswap-foundation))
- Mumbai, "Build with Uniswap": **the same description and qualification text word for word**, a new title, and the largest fresh pool of the stack era, $10,000 in four places (1st $4,000, 2nd $3,000, 3rd $2,000, 4th $1,000). Same workshop title and speaker. ([Mumbai](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation))

---

## 3. Winners and what they built

Placements come from showcase pages; where a page could not be read, the place is "n/r" (not read) and only the Uniswap prize organization is confirmed from the listing.

Sources per row: the showcase page `https://ethglobal.com/showcase/<slug>` (prize records read 2026-10-31) or, where marked [L], only the event listing's prize organization and ETHGlobal's auto-summary; [CAT] marks rows taken from the finalist catalogues. Continuity winners are listed because they show what the same judges rewarded, but they are marked (C) and are not precedents for a fresh build.

### 3.1 2023 to 2024: hooks era

| Event | Track and place | Project | What it built |
|---|---|---|---|
| Brussels 2024 | Research and Experimentation, 2nd [CAT] | [Cook some hooks](https://ethglobal.com/showcase/cook-some-hooks-ehuy8) | AI that writes v4 hooks from a prompt, then deploys (CREATE2 salt mining) and verifies them; also PancakeSwap 3rd and an ETHGlobal finalist |
| Singapore 2024 | Hooks, Hooks, and Hooks, 2nd [CAT] | [Marina Royale](https://ethglobal.com/showcase/marina-royale-ykabv) | Lottery built on v4 hooks so any LP can spin up a pool, Pyth Entropy randomness, gas-free in Telegram; also Pyth and a finalist |
| San Francisco 2024 | Integrations, Research, and Experiments, 1st [CAT] | [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6) | Replays real v3 swaps, mints and burns into a hypothetical v4 pool with hooks to backtest LP positions; a finalist |
| Bangkok 2024 | Unichain, 1st | [Trust Issues](https://ethglobal.com/showcase/trust-issues-3wnx4) | Desktop app that lets users force-exit an L2 through L1 escape hatches, sitting man-in-the-middle in WalletConnect; Unichain as the L2 |
| Bangkok 2024 | Integrations, Research, and Experiments, 2nd | [Blinks](https://ethglobal.com/showcase/blinks-e8q7k) | Web3 actions embedded in Twitter cards through an iFrame layer |
| Bangkok 2024 | Integrations, Research, and Experiments, 3rd | [UnifAI](https://ethglobal.com/showcase/unifai-d0unn) | (description not read) |
| Bangkok 2024 | Hooks, Hooks, and Hooks, 3rd | [Custom Curves](https://ethglobal.com/showcase/custom-curves-sqeh9) | Two custom-invariant hooks (weighted product, Lambert W curve) with Solady fixed-point math, Foundry tests |
| Bangkok 2024 | Hooks, Hooks, and Hooks, 4th | [Starfish](https://ethglobal.com/showcase/starfish-65z3p) | ETF-style basket hook that rebalances components from Chronicle and Chainlink prices; also Chronicle 1st |
| Bangkok 2024 | Unichain, 3rd | [Boo Market](https://ethglobal.com/showcase/boo-market-oekxo) | (description not read) |

Not found: the Hookathon pool winners of New York 2023 and ETHOnline 2023, all three London 2024 winners, the remaining Brussels, Singapore and San Francisco winners, and Bangkok's Hooks 1st and 2nd and Integrations 1st (the listing crawl stopped at 257 of 713 projects after bot checks).

### 3.2 2025: single hooks track era

| Event | Track and place | Project | What it built |
|---|---|---|---|
| Taipei 2025 | v4 Hook Integrations (place n/r) [L] | Hook up to AMM | "Using Uniswap v4 Hooks to incentivize long-term liquidity with time-based rewards" |
| Taipei 2025 | same [L] | Watchtower | "Atomic Liquidation and Other Actions via 1-time Hooks 4 Sale on Uniswap V4" |
| Taipei 2025 | same [L] | Calary | Compliance toolkit with on-chain payroll, swaps and rewards |
| New York 2025 | v4 Hooks on Unichain (n/r) [L] | OpSwap on Unichain | "Options Protocol based JIT Pools on Uniswap via V4 Hooks in Swaps" |
| New York 2025 | same [L] | stETHer | v4 hook with dynamic fees and "proper rebasing token handling" |
| New York 2025 | same [L] | JIT Saving Vault | JIT liquidity via v4 hooks, idle funds in Aave |
| New Delhi 2025 | Build with v4 Hooks, 2nd [CAT] | [UniPerp](https://ethglobal.com/showcase/uniperp-g9sx1) | Perps inside v4 pools via a vAMM, Pyth funding, zk-TLS proofs of off-chain events; an ETHGlobal finalist |
| New Delhi 2025 | same (n/r) [L] | DepegSentinel | Dynamic fees that punish depeg-ward trades and reward peg-stabilizing ones |
| New Delhi 2025 | same (n/r) [L] | BondZero | Zero-coupon bonds: principal and yield tokens split via v4 hooks |
| New Delhi 2025 | same (n/r) [L] | Qlick | Decision market where all proposals trade at once without per-proposal capital |
| New Delhi 2025 | same (n/r) [L] | MEVengers | Telegram mechanism to hedge MEV: fee auctions plus MEV insurance |
| Buenos Aires 2025 | Stable-Asset Hooks, 1st | [Orbital Hook](https://ethglobal.com/showcase/orbital-hook-no27o) | Spherical-invariant stable AMM; "Hook-as-Vault" with `BEFORE_SWAP_RETURNS_DELTA`, Solady math, own ERC-4626 shares |
| Buenos Aires 2025 | Stable-Asset Hooks, 2nd | [Antidote](https://ethglobal.com/showcase/antidote-i18um) | Permissioned margin-call insurance hook with KYC-gated access and Pyth pull prices; also Pyth 3rd |
| Buenos Aires 2025 | Stable-Asset Hooks, 2nd | [OneTx](https://ethglobal.com/showcase/onetx-gtqrx) | Universal router: v4 intercepts transactions and extracts global IDs from calldata; also Circle 1st |
| Buenos Aires 2025 | Stable-Asset Hooks, 3rd | [SAGE Protocol](https://ethglobal.com/showcase/sage-protocol-tv19y) | Fees set from S&P Global stablecoin stability ratings |
| Buenos Aires 2025 | Stable-Asset Hooks, 3rd | [Anti-Toxicity Hook](https://ethglobal.com/showcase/anti-toxicity-hook-fxv68) | Rewards trades that go against the market to reduce impermanent loss |
| Buenos Aires 2025 | Volatile-Pairs Hooks, 1st | [P.A.T](https://ethglobal.com/showcase/p-a-t-s0c42) | Prop-AMM launchpad: custom curve plus async batch swaps priced inside an Oasis TEE; also Pyth 1st and Oasis 3rd |
| Buenos Aires 2025 | Volatile-Pairs Hooks, 2nd | [Orbswap Prediction](https://ethglobal.com/showcase/orbswap-prediction-hyxb2) | pm-AMM hook (prb-math) giving LPs an asymmetric payoff to host prediction markets |
| Buenos Aires 2025 | Volatile-Pairs Hooks, 2nd | [Private FHE Intents](https://ethglobal.com/showcase/private-fhe-intents-4hrso) | Encrypted swaps through FHE and intent matching to cut MEV |
| Buenos Aires 2025 | Volatile-Pairs Hooks, 3rd | [Redfish](https://ethglobal.com/showcase/redfish-v4g9r) | zkML (EZKL) anomaly detection for the hook; also vlayer 2nd |
| Buenos Aires 2025 | Volatile-Pairs Hooks, 3rd | [ALA](https://ethglobal.com/showcase/ala-nxpw2) | Crowdsourced market maker: data scientists' models set fees, deltas and liquidity; also The Graph 3rd |

The Uniswap Foundation's own recaps confirm the New Delhi five and the Buenos Aires ten ("we couldn't choose just 6. we ended up with 10 uniswap track winners") ([UF Builder Update #37](https://uniswapfoundation.org/blog/builder-update-37-uniswap-cup-genius-act-rollups-research); [UF Builder Update #41](https://uniswapfoundation.org/blog/uf-builder-update-41-buenos-aires-went-hard)).

### 3.3 2026: themed, API and whole-stack eras

| Event | Track and place | Project | What it built |
|---|---|---|---|
| HackMoney 2026 | v4 Agentic Finance, 1st | [CrossLiquid](https://ethglobal.com/showcase/crossliquid-mkd54) | Vault plus PositionManager contract plus dynamic-fee hook; an off-chain agent scores chains by yield, volatility and gas and moves USDC-ETH liquidity via LI.FI |
| HackMoney 2026 | v4 Agentic Finance, 2nd | [EIDOLON](https://ethglobal.com/showcase/eidolon-f351g) | "Ghost liquidity": LPs sign intents and funds stay in their wallets until a fill |
| HackMoney 2026 | v4 Agentic Finance (n/r) [L] | Uniforum | Social network where agents argue and trade on v4 when they agree |
| HackMoney 2026 | v4 Privacy DeFi, 1st | [PrivBatch](https://ethglobal.com/showcase/privbatch-d3sge) | Commit-reveal batched swaps on a v4 hook with Groth16 proofs; "only aggregate net deltas reach the AMM" |
| HackMoney 2026 | v4 Privacy DeFi (n/r) [L] | VeilSwap | MPC intent settlement layer |
| HackMoney 2026 | v4 Privacy DeFi, 3rd | [Waiola](https://ethglobal.com/showcase/waiola-ug402) | Private RFQ settled by a `beforeSwap`-only hook that checks 7 conditions incl. a Noir proof; makers discovered via ENS text records; also ENS |
| Cannes 2026 | Uniswap API, 1st | [αβγ' (Aetherius)](https://ethglobal.com/showcase/avg-1x2z2) | Tight-range v3 market making that arbitrages its own stale liquidity and hedges on Hyperliquid every block; Uniswap API for execution |
| Cannes 2026 | Uniswap API, 2nd | [Casper](https://ethglobal.com/showcase/casper-km2di) | "Like Honey, but for DeFi": a browser extension detects swap intents on any dapp and compares Uniswap API (incl. UniswapX) and LI.FI quotes |
| Cannes 2026 | Uniswap API, 3rd | [ALMA](https://ethglobal.com/showcase/alma-07pzd) | v4 LP rebalancing agent: Calibur (EIP-7702) delegation, GuardedExecutorHook selector whitelist, 30-day expiry, Trading API calldata; an ETHGlobal finalist |
| Cannes 2026 | Uniswap API, 3rd | [Flow Broker](https://ethglobal.com/showcase/flow-broker-ez5rr) | Agents buy paid intelligence via Arc, trade via Uniswap, orchestrated by Chainlink CRE; also Chainlink CRE |
| Open Agents | Uniswap API (places n/r) [L] | Alps; Zuno; Moai | Agent-managed Uniswap vault; four agents debate each v4 rebalance before the user signs; agent migrates idle LP positions to better vaults on Base |
| New York 2026 | Uniswap API, 3rd | [Smile](https://ethglobal.com/showcase/smile-fictr) | Options market: SwapVM prices the vol surface, Aqua holds collateral, Uniswap trades the option tokens and a hook "vetoes mispriced trades", Chainlink CRE settles |
| New York 2026 | Uniswap API, 1st and 2nd (order n/r) [L] | Lotus; Stream Vaults | Directional liquidity for large holders through LI.FI Composer, SwapVM opcodes and a v4 hook; USDC streamed to a Ledger-signed DCA agent "bounded to hours of flow, not TVL" |
| New York 2026 | Stack Contribution (C) | Pampalo Private Swap; Better Wallet; Chatter | Continuity pool (item `mqxk8` belongs to the continuity prize) |
| Lisbon 2026 | Uniswap API, 1st | [Sentinel](https://ethglobal.com/showcase/sentinel-yaqmj) | Portfolio stop-loss: watches pool health, depegs and exploit intel, then withdraws LP, swaps to stables and moves funds through the Trading and LP APIs |
| Lisbon 2026 | Uniswap API, 1st [CAT] | [KOLlateral](https://ethglobal.com/showcase/kollateral-ho1d1) | Verifiable influencer track record priced against DEX history, scored in a 0G TEE; also 0G 3rd |
| Lisbon 2026 | Uniswap API 2nd and 3rd, or continuity (n/r) [L] | Umbra; RWA Outlet; r00t.fund; Peregrine; Pool Party | Circuit breaker that evacuates before pools collapse; RWA liquidity via Aqua, v4 and ERC-7540 queues; ReFi hook arbitraging shielded and public pools; signal-to-trade flows; USDC neobank |
| Lisbon 2026 | Stack Contribution, 2nd (C) | [WallCard](https://ethglobal.com/showcase/wallcard-knavu) | Card-form wallet (number, CVV, PIN, OTP) with Uniswap-powered settlement |
| ETHOnline 2026 | Stack Contribution (fresh pool) | [TARE](https://ethglobal.com/showcase/tare-ozced) | Swaps a hook's bytecode for "an inert 89-byte stub" on a pinned fork; "125,072 measurements, 7,817 pools, 112 hooks"; notes only nine of 1,559 hooks emit the recommended HookSwap/HookFee events; an ETHOnline finalist |
| ETHOnline 2026 | Stack Contribution (fresh pool) | [Otter](https://ethglobal.com/showcase/otter-barha) | First implementation of an IACR ePrint MEV-resilient AMM as a v4 hook with an off-chain VCG solver; harness shows an attacker capturing 92% of a victim's trade on a plain pool |
| ETHOnline 2026 | Stack Contribution (fresh or C, n/r) [L] | Priime; ClosingBell-Hook; lpTOKEN.fun | Vault structuring venue; tokenized-stock fees priced off the market calendar and a Chainlink feed; LP positions traded as tokens |
| Tokyo 2026 | Stack Contribution, 1st | [Kura](https://ethglobal.com/showcase/kura-so3wx) | Physical cards vaulted and sharded; shards sold in a CCA whose validation hook admits only World ID humans; settlement opens a v4 pool at the clearing price, and the hook freezes trading after a buyout "but always lets LPs withdraw"; fork tests "against the real Uniswap, Permit2, USDC and ENS contracts"; also ENSv2 3rd and finalist |
| Tokyo 2026 | Stack Contribution, 2nd | [Bailiff](https://ethglobal.com/showcase/bailiff-368x0) | Any keeper, even with 0 USDC, liquidates restricted ERC-3643-style RWA collateral by selling it through a v4 permissioned pool in one transaction; "If the sale cannot cover the debt, everything reverts" |
| Tokyo 2026 | Stack Contribution, 3rd | [OniBlock](https://ethglobal.com/showcase/oniblock-4hnma) | Hook whose per-block fee sensitivity is set by an AI model and "loses power if it's wrong"; ENSv2 permissions |
| Tokyo 2026 | Stack Contribution 1st, 2nd, 3rd (C) | VexiHakari; XSwap; Reckn | Aqua options with a v4 TWAP quote guard; one-click buys from X cashtags via the Trading API with scam checks; ENS-settled escrow that opens a v4 pool |

Placement mapping for Tokyo uses the prize item ids in the prize page data: fresh 1st `0fmci`, 2nd `8ghq7`, 3rd `3p3h9`; continuity 1st `11pid`, 2nd `2s7po`, 3rd `jfkzv` ([Tokyo prizes](https://ethglobal.com/events/tokyo2026/prizes/uniswap-foundation)).

**Correction to existing notes.** `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` cites Pampalo Private Swap as a "Best Uniswap Stack Contribution" winner. At New York 2026 that prize was the **continuity** track (prize item `mqxk8`, category `continuity-track`), so Pampalo is a continuity precedent, not a fresh-build one ([NYC 2026 prizes](https://ethglobal.com/events/newyork2026/prizes/uniswap-foundation); [Pampalo](https://ethglobal.com/showcase/pampalo-private-swap-2g5bs)).

---

## 4. Why winners won: comparison with non-winners

### 4.1 Field size: winners are a small share of Uniswap entries

| Event | Uniswap-mentioning projects (listing text) | Uniswap winners | Share |
|---|---|---|---|
| HackMoney 2026 | 96 | 6 | 6% |
| Open Agents | 54 | 3 | 6% |
| ETHOnline 2026 | 80 | 5 (incl. continuity) | 6% |
| Tokyo 2026 | 50 | 6 (3 fresh, 3 continuity) | 6% fresh |
| Cannes 2026 | 22 | 4 | 18% |
| Lisbon 2026 | 19 | 8 (5 fresh, 3 continuity) | about 26% fresh |
| Buenos Aires 2025 | 16 | 10 | 63% |
| New Delhi 2025 | 14 | 5 | 36% |

Counts are this crawl's text match on taglines and auto-summaries, so they undercount projects that used Uniswap without naming it. **Judgement:** in-person events with a Uniswap-only theme had thin fields (Buenos Aires gave prizes to 10 of about 16 visible entrants), while online and agent-themed events drew 50 to 100 Uniswap entries for 3 to 6 prizes. Mumbai's prize page sits between: 4 fresh places, an India venue like New Delhi (14 visible entrants), and the general stack scope that drew 50 entries at Tokyo.

### 4.2 Hooks era (2023 to 2025): the listed idea, implemented with tests

- **Winners matched the bullet list.** UniV4Backtester won the San Francisco catch-all whose examples literally included "Hook backtesting" and "Testing toolkits"; Custom Curves and Orbital won hooks tracks that listed "Custom Curves - replace the v3 concentrated liquidity with an alternative pricing algorithm"; P.A.T used "NoOp/async swaps"; DepegSentinel, SAGE and Anti-Toxicity are dynamic-fee hooks for the "Dynamic Fees" bullet (sections 2.2, 3.1, 3.2).
- **Math and the deepest hook permissions.** The two Buenos Aires 1st places both bypass the default curve: Orbital with `BEFORE_SWAP_RETURNS_DELTA` and a spherical invariant, P.A.T with async batches priced in a TEE. Third places there were simpler fee rules (SAGE, Anti-Toxicity).
- **"Evidence of working code" was the only hard bar**, stated in every 2024 track ("unit tests with proper assertions", "successful testnet transactions" or "local testing on anvil") ([Brussels](https://ethglobal.com/events/brussels/prizes/uniswap-foundation)).
- **Non-winner contrast (Judgement).** The finalist catalogues show hook projects that reached the ETHGlobal finals without a Uniswap prize: Partycles (London 2024, a lottery hook minting ERC-404; London had three Uniswap tracks, each requiring submission to uniswaphooks.com, yet it won only an Arbitrum prize) and Detox-Hook (Prague 2025, arbitrage capture with Pyth; Prague had no Uniswap track) ([CAT] `finalists_2023q4_2024q2.md`, `finalists_2025q1_2025q3.md`). Where Uniswap had a track, its winners overlapped heavily with the finalist list (Cook some hooks, Marina Royale, UniV4Backtester, UniPerp), so Uniswap's judges and ETHGlobal's main judges largely agreed.

### 4.3 HackMoney 2026: themes reward a complete mechanism, not an agent wrapper

- **Winners**: CrossLiquid (vault, PositionManager contract, dynamic-fee hook and a scoring agent), EIDOLON (a new liquidity model), PrivBatch (hook plus Circom proofs plus agents), Waiola (hook that checks seven conditions including a Noir proof).
- **91 non-winners** mentioned Uniswap. A large share were agent LP managers or MEV-tax hooks with similar taglines: "Autonomous agent that rebalances Uniswap v4 LP positions" (cautious-palm-tree), "AI agent that autonomously manages your Uniswap v4 LP positions" (OmyBot), "AI-powered, MEV-resistant autonomous liquidity manager" (Sentinel Agent), "uniswap v4 hook that taxes mev bots" (meva), Kalman-filter and volatility fee hooks (KalmanGuard, ClearSwap), plus privacy hooks that did not place (Shadowswap, Arcanum, Effe, TLIS-Hook) and GrimSwap, which reached the ETHGlobal finals but won no Uniswap prize (listing data; [GrimSwap](https://ethglobal.com/showcase/grimswap-ntdmp)).
- **Judgement.** The track text asked for "reliability, transparency, and composability over speculative intelligence". Winners shipped contracts that enforce the claim (batch netting, condition checks), while losers mostly put an LLM in front of an existing action.

### 4.4 API era (Cannes, Open Agents, New York, Lisbon 2026): the API must be the engine of a real action

- **Winners used the API for execution, not decoration.** αβγ' routes its market-making trades through it; Sentinel runs "decrease liquidity, swap residuals to USDC/USDT/DAI, then transfer" through "Uniswap Trading + LP APIs"; ALMA takes "production-grade UniversalRouter calldata" from the Trading API inside a Calibur batch; Casper compares Uniswap API and LI.FI quotes on any dapp (section 3.3).
- **Constrained autonomy wins; chat does not.** ALMA's selector whitelist and 30-day expiry and Stream Vaults' "bounded to hours of flow, not TVL" are limits a judge can check. Cannes non-winners included a "Basic MCP Server built in Rust to allow AI Agent to interact with Uniswap API", chat front ends (Zuza, signet, Orchestra, ChainPilot) and several agent leagues (Koi, ScampIA). Lisbon non-winners included a "raccoon copilot" chat wallet (Procyon), a garden game whose plants are LP positions (Unigarden), and a World ID fee-discount hook (ProofOfPool) that sat in an API-only track.
- **Consumer utility counts.** Casper (2nd) and XSwap (Tokyo continuity 2nd) are browser extensions that put a Uniswap swap where users already are. **Judgement:** practicality and usability carry weight with these judges, not only protocol depth.
- **Stacking is normal.** Flow Broker also took Chainlink CRE, KOLlateral took 0G, Smile combined SwapVM, Aqua and CRE. Uniswap judges did not penalise multi-sponsor builds when Uniswap did the trading.

### 4.5 Whole-stack era (ETHOnline and Tokyo 2026): newest primitive, real contracts, a number or a refusal

- **Newest primitive.** Kura is the first CCA winner, two months after "CCA" entered the scope sentence; Bailiff uses Uniswap Labs' Permissioned Pools hook, whose docs present it as the route for tokenized and regulated assets ([Permissioned Pools](https://developers.uniswap.org/docs/protocols/uniswap-labs-hooks/permissioned-pools/overview)).
- **Tests against the real deployments.** Kura: "The tests fork Sepolia and run against the real Uniswap, Permit2, USDC and ENS contracts", and it names the hard part ("turning the auction's clearing price into a v4 pool price for both token orders"). Bailiff: "If the sale cannot cover the debt, everything reverts."
- **A replayable number.** TARE: "Every row carries its block, its size, its direction, its label and a command that reproduces it." Otter: an attacker "captures 92% of the victim's trade on a plain pool". OniBlock: an AI that "loses power if it's wrong".
- **Non-winners at the same events.** Tokyo had 45 Uniswap-mentioning non-winners, including the closest rivals to each winner: Hank0 ("ENS names as trading permissions for a Uniswap v4 permissioned pool holding a tokenized stock"), Recycle CCA ("Recycle stranded capital from strictly outbid Uniswap CCA bids"), Sworn ("makes the quote and the trade the same transaction, so hooks can't lie"), Klamp (canonical pools declared in ENSv2), Tegata (invoices sold on v4), Brick Finance (RWA hook with a standing floor bid), and many agent-permission builds (Leash, Kanoki, AegisNet, DSAP). ETHOnline 2026 had at least five hook-risk scanners that won nothing: Pool Party ("hookrisk for Uniswap v4 hook security"), AlphaScanner ("PASS, REJECT, or UNKNOWN"), ALFQuote ("Hook-aware discovery, assessment, quotes, and protected Uniswap v4 swap dry-runs"), SwapGuard and reCEPTION Swap. HookLens at Open Agents ("Discover, inspect, and simulate Uniswap v4 hooks") also won nothing.
- **Judgement.** At the stack-era events, the closest non-winning rival to each winner used the same primitive but made a softer claim: Hank0 used permissioned pools for permissions, Bailiff for an atomic liquidation that reverts if undercollateralized; the scanners labelled hooks, TARE measured them to the wei. The difference judges paid for is a mechanism whose failure is visible.

### 4.6 What these judges reward (Judgement, ranked)

1. **Centrality.** The Uniswap component cannot be removed without the product disappearing (every 1st place from Buenos Aires to Tokyo).
2. **The newest surface in the scope sentence**, used correctly: hooks with return deltas in 2025, the API in early 2026, CCA and permissioned pools in late 2026.
3. **Verifiable code**: fork tests against real deployments, transaction hashes, a README that points at lines (now written into R4).
4. **A measurable or refusable claim** rather than a dashboard, scanner or chat layer.
5. **Practicality**: browser extensions, stop-losses and LP managers that a normal LP or trader would use placed well in API tracks.
6. **Not rewarded**: generic agent wrappers, MCP servers, chat UIs, and hook scanners without exact measurements; plain dynamic-fee hooks placed only in thin fields (Buenos Aires, New Delhi).

---

## 5. How the problem statements changed, and what that signals now

### 5.1 Timeline (Facts from the prize pages in section 2)

| Period | What Uniswap asked for | New requirement introduced |
|---|---|---|
| Sep to Oct 2023 | Pre-launch v4 Hookathon pools, dev tooling for hooks, open v3/v4 | integrate v3 or v4 |
| Mar to Nov 2024 | "first-class hook features" (dynamic fees, custom curves, hook fees, NoOp/async), integrations and periphery, research (LVR, MEV, ERC-7683), Unichain from San Francisco | submit to uniswaphooks.com (London); "evidence of working code"; Unichain testnet transactions |
| Apr to Nov 2025 | One hooks track per event, "core component", Unichain bonus; Buenos Aires splits by market type (stable vs volatile) | clean commit history (Taipei); demo video max 3 min (New York 2025); TxIDs (Buenos Aires) |
| Jan to Feb 2026 | v4 themed: agentic finance, privacy DeFi | "reliability, transparency, and composability over speculative intelligence" |
| Apr to Jul 2026 | Uniswap API with a Developer Platform key, for agents and "new financial primitives"; tokenized stocks from Lisbon | API key; Developer Feedback Form (Cannes); FEEDBACK.md (Open Agents); README pointing at lines (Lisbon) |
| Jun 2026 on (continuity), Sep 2026 on (fresh) | "any part of the Uniswap stack": API, v2/v3/v4, CCA, hooks, official repos, ecosystem tooling | FEEDBACK.md plus form, "reviewed and audited before winners are finalized" |
| Nov 2026 (Mumbai) | the same whole-stack text, renamed "Build with Uniswap" | unchanged from Tokyo |

### 5.2 What the shift signals now (Judgement, with the facts it rests on)

- **Uniswap now treats hackathons as developer-platform research.** The feedback form appeared at Cannes 2026, FEEDBACK.md at Open Agents ("bugs you hit, docs gaps, DX friction, missing endpoints, and what you wish existed"), and both are mandatory at Mumbai. A FEEDBACK.md with specific, reproducible friction is likely read by the people who judge.
- **The scope widened while the money stayed.** Fresh pools went $10,000 (Cannes, API only) to $7,000 (New York, Lisbon) to $3,000 (ETHOnline) and $6,000 (Tokyo), then back to $10,000 at Mumbai with four places. Mumbai is the largest fresh Uniswap pool since Buenos Aires.
- **New products are being seeded.** CCA launched with Aztec in November 2025, reached the Uniswap web app in February 2026 and got no-code creation in June 2026 (`track_ideas/00_season.md`, citing [The Block](https://www.theblock.co/post/378864/uniswap-continuous-clearing-auctions) and the [Uniswap blog](https://blog.uniswap.org/token-auctions-are-coming-to-the-uniswap-web-app)); CCA entered the prize text in June 2026 and won at Tokyo in September. Uniswap's docs now also present Permissioned Pools, StablePair and VolatilePair hooks ("Uniswap Labs Hooks"), TJAR (Token Jar fee conversion, also used for Uniswap's own protocol fees with UNI burned), The Compact and the Calibur smart wallet ([docs index](https://developers.uniswap.org/llms.txt); [TJAR](https://developers.uniswap.org/docs/protocols/tjar/overview)). None of these is named in the Mumbai text, but "any other Uniswap protocol" covers them.
- **Uniswap AI is the other new surface.** The workshop abstract lists "Uniswap AI", and the official skills include `configurator` and `deployer` for CCA, `v4-security-foundations`, `swap-integration` and `pay-with-any-token` ([Uniswap Skills](https://developers.uniswap.org/docs/uniswap-ai/skills)). Contributions to `uniswap/uniswap-ai` would fit "improvements to official Uniswap repositories".
- **Unichain has faded from the prize text.** It was a separate track in late 2024, the host chain in New York 2025, a "bonus" in New Delhi, and is absent from every 2026 track; the Mumbai "About" still mentions it only as "emerging infrastructure like Unichain" ([Mumbai](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- **Hooks are now a subset, not the track.** "new v4 hooks" is one clause among six, and the 2026 winners that used hooks used them in service of a product (Kura's freeze-on-buyout, Bailiff's permissioned sale), not as the product.

### 5.3 The same pattern at other Mumbai sponsors (context, Judgement)

- **1inch** moved from Unite DeFi's 17 "Extend Fusion+ to <chain>" tracks plus Limit Order Protocol and API tracks (July 2025, [Unite prizes](https://ethglobal.com/events/unite/prizes)) to a single "Build an Aqua App" track where "Projects that utilize SwapVM will be scored higher" ([Mumbai 1inch](https://ethglobal.com/events/mumbai/prizes/1inch)).
- **Chainlink** at Mumbai pays for "Best workflow with CRE" and "Best use of Chainlink CCIP 2.0" ([Mumbai Chainlink](https://ethglobal.com/events/mumbai/prizes/chainlink)); CRE already appears inside Uniswap-prize winners (Flow Broker at Cannes 2026, Smile at New York 2026).
- **World** pays for IDKit ("the best decision about which credential is needed") and Agent Pass, where Cannes 2026 paid for World ID 4.0 (VEIL VPN won "Best use of World ID 4.0") ([Mumbai World](https://ethglobal.com/events/mumbai/prizes/world); `judging_criteria.md`).
- In each case the sponsor moved from "extend our protocol everywhere" to "use our newest product and tell us how it went", which is the same arc as Uniswap's hooks to API to whole-stack with mandatory feedback.

---

## 6. Mapping the Mumbai track to its nearest past tracks

| Mumbai track | Nearest past tracks | Status | What differs |
|---|---|---|---|
| **Build with Uniswap** ($10,000; 4 places; fresh) | Tokyo 2026 "Best Uniswap Stack Contribution" (fresh, $6,000, 3 places); ETHOnline 2026 same (fresh, 3 x $1,000) | **Repeated, renamed** | Description and qualifications identical word for word; new title; larger pool; a 4th place |
| same, for API builders | Cannes, New York and Lisbon 2026 "Best Uniswap API Integration" | **Changed** (absorbed) | No API key, transaction-ID or 3-minute-video requirement in the Uniswap text; FEEDBACK.md and README line pointers instead; the API is one option among six |
| same, for hook builders | 2024 "Hooks, Hooks, and Hooks"; 2025 single hooks tracks; HackMoney themed v4 tracks | **Changed** (absorbed) | Hooks are optional; no "first-class feature" list; no Unichain bonus |
| same, for CCA | none before June 2026; first in the New York 2026 continuity text | **New in fresh form since Tokyo** | Only one CCA winner so far (Kura) |
| Build with Uniswap (Continuity, $5,000) | New York, Lisbon, ETHOnline, Tokyo continuity Stack Contribution | Repeated | Ignored for this team (fresh build only) |

**Judgement for Mumbai.** Treat the track as Tokyo's Stack Contribution with more money: the bar is Kura, Bailiff and OniBlock (fresh) and TARE and Otter (ETHOnline), not the 2024 hooks winners. Expect a crowded field of agent and hook entries (50 to 100 if Mumbai resembles Tokyo or ETHOnline), so a narrow, verifiable build on CCA, permissioned pools or the hook population is the clearest way into the top four.

---

## 7. Gaps

- **Bot checks cut the winner crawl short.** Showcase listings were not crawled for New York 2023, ETHOnline 2023, London, Brussels, Singapore and San Francisco 2024, and Bangkok stopped at 257 of 713 projects. Those events rely on [CAT], which only records finalists, so most 2023 to 2024 Uniswap winners are missing. Re-crawl later at a low rate if needed.
- **Placements not read** for Taipei, New York 2025, most of New Delhi, Open Agents, New York 2026 API 1st and 2nd, Lisbon 2nd and 3rd, HackMoney third places, and which ETHOnline 2026 winners were fresh versus continuity.
- **No judge notes.** Uniswap's recaps list winners but say nothing about how they judged ([UF Builder Update #41](https://uniswapfoundation.org/blog/uf-builder-update-41-buenos-aires-went-hard)). Section 4 infers taste from what won.
- **Mention counts are text matches** on taglines and ETHGlobal's auto-summaries; projects that used Uniswap without naming it are missed, and continuity entries are not separated in the counts.
- **Showcase text is self-reported.** Claims such as TARE's measurement counts were not reproduced here.
- **Mumbai judging format for partner prizes** is repo, README and video only (`track_ideas/00_current_tracks.md`); whether Uniswap's judges also run code is unknown (workshop question 9 in the idea file).
