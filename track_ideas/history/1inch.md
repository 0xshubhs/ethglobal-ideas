# 1inch at ETHGlobal, November 2023 to October 2026: tracks, winners, and what the judges reward

Research date: 2026-10-31. Purpose: input for the team's 1inch entry at ETHGlobal Mumbai (5 to 7 Nov 2026), where the only fresh-build track is "Build an Aqua App" ($5,000). Ideas are in `track_ideas/ideas_draft/1inch.md`.

## How this dossier was made

- **Prize text:** fetched one page at a time from each event's `https://ethglobal.com/events/<slug>/prizes/1inch` subpage (Istanbul's slug is `1inch-network`). Every event in ETHGlobal's event list from ETHOnline 2023 onward was checked; the 15 events below are the ones whose prizes page has a 1inch section. ETHOnline 2023, LFGHO, Circuit Breaker, London 2024, Scaling Ethereum 2024, Frameworks, Sydney, HackFS 2024, StarkHack, Superhack 2024, ETHOnline 2024, San Francisco 2024, Agentic Ethereum, Trifecta, Autonomous, ETHOnline 2025, New York 2025, HackMoney 2026, Cannes 2026 and Open Agents had no 1inch prize section ([ETHGlobal events](https://ethglobal.com/events); each `/events/<slug>/prizes` page).
- **Winners:** the showcase listings (`https://ethglobal.com/showcase?events=<slug>&page=N`) embed each project's prize organizations; 1inch's organization id is `if0ri`. Every page of each 1inch event's listing was read, and each project whose prizes include 1inch is a winner. Place names come from the "Winner of" badges on project pages. The finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` and 1inch's own Unite DeFi post were used first and then extended.
- **Bot checks:** ETHGlobal served a Cloudflare "Just a moment" page and later HTTP 429 to some project-page requests on 31 Oct (other research agents were fetching at the same time). Those pages were dropped, nothing was retried around the check, and fetching resumed only after a long pause at a slower rate. Where a place could not be read, the row says "place not read".
- **Non-winner samples:** projects at the same event whose tagline or ETHGlobal auto-summary mentions 1inch, Aqua, SwapVM, Fusion or the Limit Order Protocol, but whose prizes do not include 1inch. This is a keyword match, so the counts are lower bounds.
- Facts carry a URL. **Judgement** marks this researcher's inference.

---

## 1. Every 1inch prize at ETHGlobal, at a glance

| # | Event (dates) | 1inch total | Tracks (amount) | Era |
|---|---|---|---|---|
| 1 | Istanbul (17 to 19 Nov 2023) | $20,000 in 1INCH | Fusion API ($5,000); Token Plugins ($5,000); Developer Portal APIs ($5,000); Open Track ($5,000) | A: APIs and plugins |
| 2 | Brussels (12 to 14 Jul 2024) | $4,500 headline | Developer Portal APIs | A |
| 3 | Singapore (20 to 22 Sep 2024) | $20,000 | Integrate Fusion+ ($8,000); Dev Portal APIs ($6,000); ERC20 Token Plugins ($6,000) | A, Fusion+ appears |
| 4 | Bangkok (15 to 17 Nov 2024) | $20,000 | Integrate Fusion+ ($8,000); Dev Portal APIs ($6,000); Track Portfolios ($6,000) | A |
| 5 | Taipei (4 to 6 Apr 2025) | $20,000 | same three as Bangkok, plus a commit-history rule | A |
| 6 | Prague (May to Jun 2025) | $20,000 | Fusion+ extensions to a non-EVM chain ($12,000); Extend Limit Order Protocol ($6,500); Utilize 1inch APIs ($1,500) | B: protocol extensions |
| 7 | Cannes (4 to 6 Jul 2025) | $20,000 | Non-EVM Extensions for Fusion+ ($12,000); Extend LOP ($6,500); Utilize APIs ($1,500) | B |
| 8 | Unite DeFi (online, 25 Jul to 8 Aug 2025) | $500,000 on the prize page; "up to $525,000" per 1inch | Expand LOP ($65,000); Full Application using APIs ($30,000); 15 "Extend Fusion+ to <chain>" tracks ($20,000 to $32,000 each); Judges Pick ($1,000) | B, 1inch's own event |
| 9 | New Delhi (26 to 28 Sep 2025) | $18,000 | Non-EVM Fusion+ ($10,000); Extend LOP ($6,500); Utilize APIs ($1,500) | B |
| 10 | Buenos Aires (21 to 23 Nov 2025) | $20,000 | Build an Aqua App ($17,000); Utilize 1inch APIs ($3,000) | C: Aqua and SwapVM |
| 11 | New York 2026 (12 to 14 Jun 2026) | $7,000 | Build an Aqua App ($7,000, four places) | C |
| 12 | Lisbon 2026 (24 to 26 Jul 2026) | $7,000 | Build an Aqua App ($5,000); Continuity ($2,000) | C |
| 13 | ETHOnline 2026 (online, 4 to 16 Sep 2026) | $7,000 | Build an Aqua App ($5,000); Continuity ($2,000) | C |
| 14 | Tokyo 2026 (25 to 27 Sep 2026) | $7,000 | Build an Aqua App ($5,000); Continuity ($2,000) | C |
| 15 | **Mumbai (5 to 7 Nov 2026)** | $7,000 | Build an Aqua App ($5,000); Continuity ($2,000, not eligible for us) | C |

Sources: [Istanbul](https://ethglobal.com/events/istanbul/prizes/1inch-network), [Brussels](https://ethglobal.com/events/brussels/prizes/1inch), [Singapore](https://ethglobal.com/events/singapore2024/prizes/1inch), [Bangkok](https://ethglobal.com/events/bangkok/prizes/1inch), [Taipei](https://ethglobal.com/events/taipei/prizes/1inch), [Prague](https://ethglobal.com/events/prague/prizes/1inch), [Cannes](https://ethglobal.com/events/cannes/prizes/1inch), [Unite](https://ethglobal.com/events/unite/prizes/1inch), [New Delhi](https://ethglobal.com/events/newdelhi/prizes/1inch), [Buenos Aires](https://ethglobal.com/events/buenosaires/prizes/1inch), [New York 2026](https://ethglobal.com/events/newyork2026/prizes/1inch), [Lisbon 2026](https://ethglobal.com/events/lisbon2026/prizes/1inch), [ETHOnline 2026](https://ethglobal.com/events/ethonline2026/prizes/1inch), [Tokyo 2026](https://ethglobal.com/events/tokyo2026/prizes/1inch), [Mumbai](https://ethglobal.com/events/mumbai/prizes/1inch). Totals are the sponsor figures on each event's main prizes page. Workshop dates (from each subpage) fix the event dates where the prize page gives no range. Unite totals: [Unite prizes](https://ethglobal.com/events/unite/prizes) and [1inch blog, 11 Aug 2025](https://1inch.com/blog/post/1inch-reveals-hackathon-winners).

**Judgement, one line:** 1inch has sponsored 15 ETHGlobal events in three years, so it has deep ETHGlobal history; no fallback to Devfolio or analogous sponsors was needed.

---

## 2. Era A (Nov 2023 to Apr 2025): use our APIs, Fusion, Fusion+ and token plugins

### 2.1 Istanbul 2023 ($20,000, paid in 1INCH)

Verbatim problem statements ([Istanbul 1inch](https://ethglobal.com/events/istanbul/prizes/1inch-network)):
- **Most Innovative Application on top of 1inch Network's Fusion API** ($5,000: $2,500 / $1,500 / $1,000): "Build an innovative application that leverages the power of 1inch Network's Fusion API. Your application should provide unique functionalities and value-added features to users within the Defi ecosystem." Criteria: "(1) Utilize the 1inch Network's Fusion API to access and interact with the Fusion protocol. (2) The utilization of Fusion API should have a meaningful purpose (3) Your application should be an open-source project accompanied by clear documentation explaining its usage."
- **Most Innovative Solution on top of 1inch Network's Token Plugins** ($5,000; 1st $2,500 shown): "Try to hack using such library. That is it." Criteria: "(1) Use Token Plugins repo (see link) (2) The utilization of token-plugins should have a meaningful purpose".
- **Enhance your app with 1inch Developer Portal APIs** ($5,000: $2,500 / $1,500 / $1,000): "1inch Developer Portal do have multiple APIs (Balances, Fiat Prices, Portfolio, Swap, Limit Order). Use any of it to enhance your project. Apps with the best use cases will be eligible for bounties".
- **Open Track** ($5,000: $2,500 / $1,500 / $1,000): "Develop an innovative DeFi solution on a supported EVM that has a meaningful impact on the community." Requirements: "(1) Open source (2) Clear documentation about / explanation about project (3) Nice to Have: Incorporate any 1inch Product."

Winners: 10 of the 428 projects in the [Istanbul showcase](https://ethglobal.com/showcase?events=istanbul) carry a 1inch prize. Places were not read.

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [Autogov](https://ethglobal.com/showcase/autogov-at7jp) | place not read | Making DAOs safer and more accessible by automating code generation with AI |
| [TradeSphere](https://ethglobal.com/showcase/tradesphere-5vdrw) | place not read | Empowering DeFi Traders with a Social Layer Powered By GearBOX , 1inch , Lens |
| [Collateralisation St](https://ethglobal.com/showcase/collateralisation-st-y64hz) | place not read | Collateralisation Station: Trustless liquidity for your autonomous agent service NFTs. #OLAS #API3 #PWN #1Inch #Aave #SAFE  #IPFS #DeFi |
| [nft-folder-macos](https://ethglobal.com/showcase/nft-folder-macos-dbw63) | place not read | create a .eth folder on macos and watch it getting filled with nfts |
| [Stabilan](https://ethglobal.com/showcase/stabilan-1x4fg) | place not read | Stabilan is a Decentralized Trustless Insurance Protocol. We present a use case where users can protect their assets from price crashes or stablecoins from depegging. |
| [Cabal Chat](https://ethglobal.com/showcase/cabal-chat-gtw49) | place not read | Cabal Chat allows a first-time Web3 user to ask questions, analyze token markets, and complete transactions in simple and minimal chat based prompts. |
| [Onay](https://ethglobal.com/showcase/onay-cxoby) | place not read | Gives permission to a Security Council to revoke any allowances you have (only to revoke). In case of a security breach, they can send a TX on your users behalf to revoke everyone's allowance to affected contracts, even if you are sleeping. Still non-custodial solution. |
| [Toaster](https://ethglobal.com/showcase/toaster-f5t8e) | place not read | Experience the ultimate UX-friendly Uniswap V3 investment tool! Our platform combines gasless transactions, auto-compounding, and auto-rebalancing for a seamless DeFi journey. Simplify your trades with ease and efficiency. Your go-to for stress-free Uniswap V3 investing! |
| [IntentBoost](https://ethglobal.com/showcase/intentboost-nbfin) | place not read | Use IntentBoost to get leverage or go short tokens on 1inch Fusion, CoW and Uniswap X |
| [Decentralized Intent](https://ethglobal.com/showcase/decentralized-intent-2nrx1) | place not read | Project focuses on leveraging Waku technology to decentralize the communication flow within the 1inch Fusion Mode API, thereby enhancing privacy, security, and censorship resistance for users engaged in swaps. |

### 2.2 Brussels 2024 ($4,500 headline)

**Enhance your app with 1inch Developer Portal APIs**: 1st $3,000; 2nd $1,500 x 2; 3rd $1,000; "Cool Project" $500. Same text as Istanbul's portal track: "Use portal.1inch.dev APIs (Any of it)" and "The utilization of 1inch Developer Portal should have a meaningful purpose" ([Brussels 1inch](https://ethglobal.com/events/brussels/prizes/1inch)). (The listed places add up to more than the $4,500 headline.)

Winners: 5 of the 353 projects in the [Brussels showcase](https://ethglobal.com/showcase?events=brussels) carry a 1inch prize. Tap Ether was 3rd (`finalists_2024q3_2025q1.md`).

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [Merkle Card](https://ethglobal.com/showcase/merkle-card-qjamw) | place not read | Generate your personal or business cards using data from your wallet. |
| [Alpha Blue](https://ethglobal.com/showcase/alpha-blue-nvi4a) | place not read | Alpha Blue enables secure, peer-to-peer asset swaps across multiple blockchains. Our technology eliminates the need for liquidity pools on both sides, reducing gas fees and providing a safer, more efficient, and trustless experience for users. |
| [Tap Ether](https://ethglobal.com/showcase/tap-ether-ote2h) | Developer Portal APIs 3rd (finalist catalogue) | Send crypto assets by bringing two phones close together using NFC technology. Fast and secure! |
| [EVM Actions](https://ethglobal.com/showcase/evm-actions-2gdki) | place not read | EVM Actions is a standard to perform web3 interactions within any (web2) website such as social networks or chat apps without leaving a website. EVM Actions is super easy-to-use to develop with and empowers web3 accessibility and ease of use for anyone. |
| [ETHFlow](https://ethglobal.com/showcase/ethflow-btx5x) | place not read | EthFlow is an interactive tool for visualizing Ethereum transactions. Explore wallet interactions, transaction details, and suspicious addresses using 1inch and Blockscout APIs. |

### 2.3 Singapore 2024 ($20,000)

([Singapore 1inch](https://ethglobal.com/events/singapore2024/prizes/1inch))
- **Integrate Fusion+ into your project** ($8,000: $4,000 / $2,500 / $1,500): "Give your users the power of efficient cross-chain swaps with our brand new Fusion+ mode!" Requirement: "Fusion+ integration should have a meaningful purpose in your project".
- **Use the Dev Portal APIs in your dApp** ($6,000: $3,000 / $2,000 / $1,000): "Use the Developer portal APIs to power your dApp"; "The integration should provide value your project's main use case".
- **Innovate with 1inch's ERC20 Token Plugins** ($6,000: $3,000 / $2,000 / $1,000): "Your project must an ERC-20 token that utilizes Token Plugins to do something relevant".

Winners: 9 of the 309 projects in the [Singapore showcase](https://ethglobal.com/showcase?events=singapore2024) carry a 1inch prize. Places were not read. Finalists SQUIDL and Clarity used 1inch APIs but won no 1inch prize (`finalists_2024q3_2025q1.md`).

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [sToken](https://ethglobal.com/showcase/stoken-xigf0) | place not read | sToken is a Liquid Staking rollup based token working on across multiple chains allowing users to bridge ETH from any chain, using HyperLane to get LST tokens in return. It also implements a reward mechanism using 1inch ERC20 Plugins. |
| [BetOnBuild](https://ethglobal.com/showcase/betonbuild-rsvjq) | place not read | Interactive betting platform where users can bet on hackathon projects. |
| [Token-Techie](https://ethglobal.com/showcase/token-techie-vmjhn) | place not read | Introducing TokenTechies: a user-friendly platform for seamless investment and management of crypto assets. Connect your wallet, explore unique buckets, and maximize your investment potential with ease. Join us in revolutionizing the way you invest!  #Crypto #Investing |
| [ChopChop](https://ethglobal.com/showcase/chopchop-6dkpc) | place not read | Cross-chain spendings spliting app (like splitwise but for web3) |
| [co(IN)munity](https://ethglobal.com/showcase/co-in-munity-d9m3d) | place not read | A community-building token launchpad with bonding curve, serving as a public good among NFT communities |
| [BlockElf](https://ethglobal.com/showcase/blockelf-qxtw5) | place not read | An on-chain LLM search engine that enables user to query on-chain data through natural language. |
| [XChain Investments](https://ethglobal.com/showcase/xchain-investments-4fu2t) | place not read | With privacy, xchain functionality, and AI-driven management, We offer a secure env for participants to join investment pools, contribute funds, and bid privately. Key features include private bidding with Worldcoin’s anonymous authenticationdynamic liquidity management |
| [Grand Nouns Auto](https://ethglobal.com/showcase/grand-nouns-auto-tw1ut) | place not read | Grand Nouns Auto is a gangster-themed game blending action gameplay with DeFi education. Players complete missions involving real DeFi tasks, tracked by AI NPCs. Success yields attestations on the Gnosis Chain, featuring characters from the Nouns DAO and the NFT ecosystem. |
| [1cmBot](https://ethglobal.com/showcase/1cmbot-gqv7t) | place not read | 1cmBot is a Telegram bot that offers easy trading on Telegram by leveraging 1inch API to support swaps on multiple chains and get the best rates with 1inch's aggregation router. |

### 2.4 Bangkok 2024 and Taipei 2025 ($20,000 each)

([Bangkok 1inch](https://ethglobal.com/events/bangkok/prizes/1inch); [Taipei 1inch](https://ethglobal.com/events/taipei/prizes/1inch))
- **Integrate Fusion+ into your project** ($8,000): "Skip bridging entirely with 1inch Fusion+. Your users simply pick the tokens they want to swap, sign a message, and let our Fusion+ system do the rest."
- **Use the Dev Portal APIs to streamline your dApp development** ($6,000).
- **Track Portfolios with 1inch** ($6,000: $3,000 / $2,000 / $1,000): "Integrate our portfolio API into your application and give your users visibility into their balances and profits!" Requirement: "Portfolio API integration should be used in a meaningful way that improves your project".
- Taipei added to every track: "Consistent commit history should be in the GitHub project. No low or single-commit entries allowed!"

Bangkok winners: 9 of the 713 projects in the [Bangkok showcase](https://ethglobal.com/showcase?events=bangkok) carry a 1inch prize. LootGO (finalist) used 1inch and won no 1inch prize.

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [Burner](https://ethglobal.com/showcase/burner-pyzet) | place not read | Receiving money should be joyful. Burner helps you manage payments with ease and privacy, not pain. |
| [hAUTH](https://ethglobal.com/showcase/hauth-ngzy6) | place not read | Telegram application for Human Authentication and Management of onchain AI Agents. |
| [SimplifAI](https://ethglobal.com/showcase/simplifai-qiab0) | place not read | SimplifAI: Making Crypto Easier for Me, for You. Our AI assistant simplifies crypto with voice commands & an AI portfolio manager. Features: Voice Commands, Real-Time AI Analysis, AI Portfolio Manager, Trusted Execution, Real-Time Notifications. |
| [Dongle Party](https://ethglobal.com/showcase/dongle-party-st5g0) | place not read | An infrastructural tool for AI agent-powered memecoin trading |
| [Plutus](https://ethglobal.com/showcase/plutus-pizwb) | place not read | Introducing Plutus: your cross-chain liquidity manager!  Seamlessly transform any token from any EVM-chain into LP or supply positions on any other EVM-chain via 1inch Fusion+ & LayerZero. Simplify your DeFi journey across chains with Plutus! |
| [MoonGang](https://ethglobal.com/showcase/moongang-xqjrc) | place not read | Your Go-To Party Trading Bot. MoonGang is a Telegram bot that lets you and your friends trade tokens together effortlessly. Deposit funds, share a token's contract address, and the bot handles synchronized buys for everyone. |
| [Segugio](https://ethglobal.com/showcase/segugio-zu2tw) | place not read | Deploy copy-trading bots directly from a chat bot using human-readable commands and see portfolio analytics. |
| [Liquid++](https://ethglobal.com/showcase/liquid-kzmsj) | place not read | Cross-chain AI agents that can swap between any asset, any chain |
| [Deflate](https://ethglobal.com/showcase/deflate-n4dau) | place not read | Deflate allows you to save smarter in an inflationary world. Select your risk profile, seamlessly on-ramp and off-ramp USD to USDC and start fighting back inflation! |

Taipei winners: 9 of the 226 projects in the [Taipei showcase](https://ethglobal.com/showcase?events=taipei) carry a 1inch prize. Ask CaiShen (finalist) used 1inch APIs and won no 1inch prize (`finalists_2025q1_2025q3.md`).

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [Unisight](https://ethglobal.com/showcase/unisight-ix2jt) | place not read | Unisight: AI-powered on-chain data analysis and visualization using natural language. |
| [7Inch](https://ethglobal.com/showcase/7inch-zs4q9) | place not read | Securing blockchain transactions by leveraging multiple LLMs to reach consensus on critical actions |
| [EthereumFighter](https://ethglobal.com/showcase/ef-ethereumfigther-7hq6d) | Integrate Fusion+ 3rd (finalist catalogue) | Pin AI-Agents against each other to make them compete in DeFi trading competition using FHE. |
| [AgentActs.eth](https://ethglobal.com/showcase/agentacts-eth-89iga) | place not read | AI agents builder using multiple MCPs to automate any workflows! |
| [NewsQuantar](https://ethglobal.com/showcase/newsquantar-i7c1b) | place not read | News-Driven Trading Agent: Powered by Polygon MCP & 1inch APIs |
| [OrbitGO](https://ethglobal.com/showcase/orbitgo-rsf9w) | place not read | OrbitGO: A multichain token dashboard for DAOs to track, visualize, and manage assets in real time. |
| [QryptoPay](https://ethglobal.com/showcase/qryptopay-gbvkm) | place not read | Settles QR payments across the world without having local bank account |
| [How Doxxed Am I?](https://ethglobal.com/showcase/how-doxxed-am-i-ftbux) | Track Portfolios with 1inch 1st (finalist catalogue) | "Chainalysis for privacy hygiene." What is your public on-chain behavior revealing? |
| [MemestCutestPlatform](https://ethglobal.com/showcase/memestcutestplatform-pbgyj) | place not read | A gamified cross-service based MCP platform in a TEE to unify dApps and Web2 apps |

---

## 3. Era B (May to Sep 2025): extend our protocols

### 3.1 Prague 2025 ($20,000)

([Prague 1inch](https://ethglobal.com/events/prague/prizes/1inch))
- **Extensions for 1inch Cross-chain Swap (Fusion+)** ($12,000, "Split with up to 6 teams (capped at $2,000 per team)"): "Build an extension for 1inch Cross-chain Swap (Fusion+) that enable swaps between Ethereum and a non-EVM chain." Requirements: "Integration of one new chain ... (command line script for the implementation is perfectly fine, no UI needed)"; "Fully functional 1inch Cross-chain Swap (Fusion+) swap between Ethereum and a non-EVM chain"; "Demonstrates handling of execution guarantees and refund logic"; "Proper Git commit history (no single-commit entries on the final day)". Judging criteria: "UX simplicity and abstraction", "Security and reliability of the flow", "Code quality/completeness", "Documentation quality".
- **Extend Limit Order Protocol** ($6,500: $3,000 / $2,000 / $1,500): "Build advanced strategies and hooks for the 1inch Limit Order Protocol." Ideas: "Develop an options hook", "Integrate concentrated liquidity", "TWAP swap". Judging: "Innovation and originality", "Code quality/completeness", "Documentation quality".
- **Utilize 1inch APIs** ($1,500, "Up to 5 teams will receive $300"). Judging: "Practicality and usefulness", "Code quality/completeness".

Winners: 14 of the 217 projects in the [Prague showcase](https://ethglobal.com/showcase?events=prague) carry a 1inch prize. Fusion+ ports that did not win include FusionPlusTON and Syntheos (Solana), matched by tagline. DUST.OPS (finalist) used the 1inch API and won Blockscout, not 1inch.

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [8inch](https://ethglobal.com/showcase/8inch-o3wq7) | place not read | EVM <-> APTOS Cross-Chain intent-based swap powered by Fusion+ |
| [CrossChainer](https://ethglobal.com/showcase/crosschainer-bdcdz) | place not read | Allows Flow's Cadence fungible tokens to be traded using 1inch fusion+ |
| [HTLC AVM-EVM](https://ethglobal.com/showcase/htlc-avm-evm-vqxg8) | place not read | Production ready HTLC solution for AVM, fit for purposes of 1inch |
| [goulHash](https://ethglobal.com/showcase/goulhash-19gnf) | place not read | PoC to enable swaps between EVM chains and Cardano in Fusion+ |
| [MoleSwap](https://ethglobal.com/showcase/moleswap-a7w12) | place not read | Cross-chain swap from TON to Ethereum using 1inch Fusion+ & BlockScout tracking |
| [VectorPlus](https://ethglobal.com/showcase/vectorplus-p8qg3) | place not read | Options on order execution rights + volatility-aware TWAP execution for 1inch limit orders |
| [QuantumLeap  ](https://ethglobal.com/showcase/quantumleap-r31vu) | place not read | Automated multi-chain OHCLV data to optimized, risk-adjusted DeFi portfolio suggestions. |
| [gm](https://ethglobal.com/showcase/gm-e0rim) | place not read | Terminal based wallet written in Rust with features like smart address book |
| [Smart TWAPer](https://ethglobal.com/showcase/smart-twaper-pr2yi) | place not read | Smart TWAPer splits big swaps into secure, automated trades using 1inch and EIP-7702 smart accounts. |
| [InspectiFI](https://ethglobal.com/showcase/inspectifi-tu6n1) | place not read | Ask blockchain questions in plain language and get clear, real-time answers easy to understand!! |
| [donnut](https://ethglobal.com/showcase/donnut-333a6) | place not read | Donnut: Send crypto donations across any chain, creators get USDC. Simple, transparent, and sweet! |
| [WeSplit](https://ethglobal.com/showcase/wesplit-jsbqa) | place not read | Cross-chain bill splitting app with a focus on user experience. |
| [Cucumber Moped Bot](https://ethglobal.com/showcase/cucumber-moped-bot-hjhfn) | place not read | Cross-chain Telegram trading bot you can trade any token across 9 EVM networks with |
| [ChainFlash Pro ](https://ethglobal.com/showcase/chainflash-pro-tpwb3) | place not read | ChainFlash Pro is a revolutionary cross-chain high-frequency trading platform |

### 3.2 Cannes 2025 ($20,000)

([Cannes 1inch](https://ethglobal.com/events/cannes/prizes/1inch))
- **Non-EVM Extensions for 1inch Cross-chain Swap (Fusion+)** ($12,000: $6,000 / $4,000 / $2,000), naming "Sui, Aptos, Bitcoin/Bitcoin cash/Doge/Litecoin, Tron, Ton, Monad, Near, Starknet, Cardano, Stellar, XRP Ledger, ICP, Tezos, Polkadot, EOS, or Cosmos". Requirements: "Preserve hashlock and timelock functionality for the non-EVM implementation"; "Swap functionality should be bidirectional"; "Onchain execution of token transfers should be presented during the final demo"; "Proper Git commit history".
- **Extend Limit Order Protocol** ($6,500) and **Utilize 1inch APIs** ($1,500, "Up to 4 teams will receive $375"), text as Prague.

Winners: 10 of the 333 projects in the [Cannes 2025 showcase](https://ethglobal.com/showcase?events=cannes) carry a 1inch prize.

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [Hashlocked](https://ethglobal.com/showcase/hashlocked-jwaq6) | Non-EVM Extensions for Fusion+ 1st (finalist catalogue) | Trustless EVM ↔ Bitcoin atomic swaps using 1inch battle-tested contracts |
| [Giant Anteaters](https://ethglobal.com/showcase/giant-anteaters-s4t20) | place not read | Cross-chain atomic swaps: trustlessly swap BTC ⇄ ETH using Bitcoin HTLCs |
| [SwappaTEE](https://ethglobal.com/showcase/swappatee-j0ovm) | place not read | A Fusion+ powered cross-chain swap between any EVM-supported chain and XRP Ledger |
| [Romi](https://ethglobal.com/showcase/romi-kwa9t) | place not read | Romi is a simple, secure crypto wallet integrating multiple chains and tokens into a pair (Tok/Cha) |
| [Make Cat Fat & Save](https://ethglobal.com/showcase/make-cat-fat-and-save-nbzqj) | place not read | Bridge your leftover tokens from other L2s to Zircuit to a savings vault |
| [Funding rate arb.](https://ethglobal.com/showcase/funding-rate-arb-vuh0s) | place not read | Funding rate arbitrage with  hedging on 1inch limit order protocol and Hyperliquid for shorts |
| [prism_orders](https://ethglobal.com/showcase/prism-orders-pzs2r) | place not read | Automated DCA, TWAP & Grid trading via 1inch Limit Order Book API, smart & gas-optimized. |
| [Zenny](https://ethglobal.com/showcase/zenny-ynkim) | place not read | Earn passive returns on stablecoins without losing custody. Activate zen-mode, earn pennies. |
| [GasGenius](https://ethglobal.com/showcase/gasgenius-q6nf6) | place not read | GasGenie: AI-driven gas fee forecasts, 1inch multi-route cost simulation, and cross-chain execution. |
| [Dr. Gloo](https://ethglobal.com/showcase/dr-gloo-gzzsc) | place not read | The simplest token aggregator experience yet. Gloo your tokens! |

### 3.3 Unite DeFi 2025 (online, 1inch's own ETHGlobal event)

([Unite 1inch](https://ethglobal.com/events/unite/prizes/1inch))
- **Expand Limit Order Protocol** ($65,000: 1st $10,000 x 3, 2nd $7,000 x 3, 3rd $3,500 x 4): "Build advanced strategies and hooks for the 1inch Limit Order Protocol like options, concentrated liquidity, TWAP swaps, etc." Requirements: "Onchain execution of strategy should be presented during the final demo"; "Custom Limit Orders should not be posted to official Limit Order API"; commit history.
- **Build a full Application using 1inch APIs** ($30,000: $5,000 x 3, $3,000 x 3, $1,500 x 4): "Create a full dApp using as many 1inch APIs as possible." Requirement: "Application should use 1inch API as much as possible".
- **Extend Fusion+ to Aptos, Bitcoin (Doge/LTC/etc.), Cosmos, Near, Sui, Tron, Stellar** ($32,000 each: $12,000 / $7,500 / $5,000 / $4,000 / $3,500) and **to Ton, Monad, Starknet, Cardano, XRP Ledger, ICP, Tezos, Polkadot, Any Other Chain** ($20,000 each: $7,500 / $5,000 / $3,000 / $2,500 / $2,000): "Preserve hashlock and timelock functionality"; "Swap functionality should be bidirectional"; "Onchain (mainnet/L2 or testnet) execution of token transfers should be presented during the final demo (EVM testnets will require the deployment of Limit Order Protocol contracts)"; stretch goals "UI" and "Enable partial fills".
- **Judges Pick** ($1,000).

Winners: the showcase lists 40 of 400 Unite projects with a 1inch prize ([Unite showcase](https://ethglobal.com/showcase?events=unite)). 1inch's post names, by track and without places: cross-chain "Sui: Nether Swap; Bitcoin: GattaiSwap; Aptos: AptosIntegration; Tron: 1inch Fusion+ Bridge; Monad: GattaiSwap; Starknet: StarknetFusion+; Tezos: XRoute; Cardano: CardanoSwap; TON: CellJMP; NEAR: X3 Fusion; ICP: AvgInch"; Limit Order Protocol "Super Order" and "1delta Unite"; APIs "1inchTeleport" and "BYOB" ([1inch blog](https://1inch.com/blog/post/1inch-reveals-hackathon-winners)). Finalist catalogue places: 1inchTeleport (APIs 1st), DungeonHeim (APIs 2nd), zkFusion and 1Option (LOP 2nd), Enju (Tron 3rd) (`finalists_2025q1_2025q3.md`). Other 1inch winners in the listing include Rosetta ("multi-asset orders" on LOP), DynamicSpreadLO ("Dynamic pricing for limit orders based on real-time market volatility"), Yeti (TradingView strategies as limit orders), FusionJar, Unite Escrow (ICP), AlgoSwap (Algorand), and about 20 more Fusion+ chain ports ([Unite showcase](https://ethglobal.com/showcase?events=unite)).

### 3.4 New Delhi 2025 ($18,000)

([New Delhi 1inch](https://ethglobal.com/events/newdelhi/prizes/1inch))
- **Non-EVM Extensions for 1inch Cross-chain Swap (Fusion+)** ($10,000 headline; places $6,000 / $4,000 / $2,000): as Cannes, plus "(Solana is excluded because we have already built it)", "It is required to directly integrate with the 1inch Limit Order Protocol contract code on the EVM side for this bounty", and "Escrow contract on the EVM side should be deployed using Limit Order Protocol's "fillOrderArgs"".
- **Extend Limit Order Protocol** ($6,500) and **Utilize 1inch APIs** ($1,500, "Up to 3 teams will receive $500").

Winners: 9 of the 614 projects in the [New Delhi showcase](https://ethglobal.com/showcase?events=newdelhi) carry a 1inch prize. About 23 more listed projects mention 1inch, Fusion+ or the Limit Order Protocol and won nothing, among them CardanoSwap, AptosBridge, SuiFused, Supernova (Stellar), Cardatron, ekinch (LOP batching) and Opex (options on LOP).

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [Tzunami](https://ethglobal.com/showcase/tzunami-o3jpp) | Extend Limit Order Protocol 3rd place | Privacy-first DeFi with ZK-Compliance and encrypted ERC20s. Compliant, private, future-proof. |
| [Nakal](https://ethglobal.com/showcase/nakal-qabnf) | Utilize 1inch APIs | ASI uagents for copy trading: analyze trades, suggest tokens & swap via Polygon x402 + 1inch. |
| [fusion](https://ethglobal.com/showcase/fusion-40ska) | Non-EVM Extensions for 1inch Cross-chain Swap (Fusion+) 3rd place | Cross-chain swaps using Limit Order Protocol and Fusion+ on Sepolia, Monad and Starknet. |
| [Melswap](https://ethglobal.com/showcase/melswap-1mid8) | Non-EVM Extensions for 1inch Cross-chain Swap (Fusion+) 1st place | Cross-chain swaps via 1inch Fusion+ with Aptos and Sui blockchains |
| [Hide&Seek](https://ethglobal.com/showcase/hide-and-seek-3e5jh) | Non-EVM Extensions for 1inch Cross-chain Swap (Fusion+) 2nd place | Unlink wallet transactions & analyze wallet privacy via on-chain knowledge graphs. |
| [DeFiDuck](https://ethglobal.com/showcase/defiduck-nk5xj) | Extend Limit Order Protocol 1st place | DeFiDuck: Helping users duck volatility, MEV, and high fees since ETH Global New Delhi 2025! |
| [CrossYield](https://ethglobal.com/showcase/crossyield-bibfd) | Extend Limit Order Protocol 2nd place | CrossYield is like modern Laxmi chit fund but no scams, just real USDC growth from top DeFi yields. |
| [d8n](https://ethglobal.com/showcase/d8n-nfft1) | Utilize 1inch APIs | d8n is the ultimate no-code DeFi workflow builder. Automate complex logic with drag-and-drop. |
| [Singularity](https://ethglobal.com/showcase/singularity-gs507) | Utilize 1inch APIs | Trustless cross-chain autopay via atomic swaps, smart contracts, 1inch & PayPal. |

---

## 4. Era C (Nov 2025 to now): build an Aqua app, preferably on SwapVM

### 4.1 How the Aqua track text changed

| Event | Amount and places | Change in the text |
|---|---|---|
| Buenos Aires 2025 | $17,000: 1st $7,000; 2nd $3,000; 2nd $2,000 x 2; 4th $1,000 x 3 | "Create a custom Aqua app **based on SwapVM** that implements a sophisticated DeFi position. You may modify SwapVM opcodes and define your own instructions." Examples "Leverage, AMM, Lending, Options". Requirement "SwapVM is used to power Aqua app". |
| New York 2026 | $7,000: $2,500 / $2,000 / $1,500 / $1,000 | SwapVM becomes optional: "If you use SwapVM, you may modify SwapVM opcodes"; adds "Projects that utilize SwapVM will be scored higher during the final judging." Adds "(local forks are ok)". Links the SwapVM template. |
| Lisbon 2026 | $5,000: $2,500 / $1,500 / $1,000, plus Continuity $2,000 | Adds "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)". Drops the examples. |
| ETHOnline 2026, Tokyo 2026, Mumbai | as Lisbon | Unchanged word for word. |

Sources: the five prize subpages in section 1. Aqua's developer preview opened 17 Nov 2025 and the public launch was 28 Jul 2026 across 13 EVM chains ([Decrypt, Nov 2025](https://decrypt.co/349073/1inch-gives-developers-early-access-new-shared-liquidity-protocol-aqua); [Decrypt, Jul 2026](https://decrypt.co/374533/1inchs-shared-liquidity-layer-aqua-goes-live)). Workshops: "The Art of AMM" by co-founder Anton Bukov at Buenos Aires; "Reimagining the AMM with 1inch Aqua" by Tanner Moore at New York, Lisbon, Tokyo and Mumbai.

### 4.2 Winners, event by event

**Buenos Aires 2025** (473 projects in the listing; 10 with a 1inch prize across the Aqua and API tracks) ([BA showcase](https://ethglobal.com/showcase?events=buenosaires)):

| Project | 1inch prize (badge) | Tagline (as listed) |
|---|---|---|
| [aqua-flash-loans](https://ethglobal.com/showcase/aqua-flash-loans-egocw) | Build an Aqua App 2nd | Gas-Optimized Flash Loans on Aqua Protocol. More tokens for lenders. More yeild for LPs! |
| [Omni402](https://ethglobal.com/showcase/omni402-dvpjd) | Utilize 1inch APIs | Pay x402 from any chain, any token. Settle instantly in USDC on Base |
| [1Wave](https://ethglobal.com/showcase/1wave-9ypfs) | Build an Aqua App 4th | Permissionless basket asset vaults Market Maker powered by 1"Aqua Protocol |
| [Aqua Outcome Market](https://ethglobal.com/showcase/aqua-outcome-market-0va0j) | Build an Aqua App 1st | Capital Efficient, AMM Enabling Credit Based Market Making For Prediction Markets & Long Tail Assets |
| [Coco](https://ethglobal.com/showcase/coco-dvaxo) | Build an Aqua App 2nd (also Circle Arc 2nd) | High-yield, non-custodial savings via 1inch Aqua; earn and do nothing. |
| [RageQuit Kit](https://ethglobal.com/showcase/ragequit-kit-jb53p) | Utilize 1inch APIs | RageQuit: Exit risky tokens across many chains with one click and telegram bot alerts. |
| [Cleverly Using Money](https://ethglobal.com/showcase/cleverly-using-money-pogqu) | Build an Aqua App 2nd | Privacy-preserving shared liquidity provisioning powered by Aqua’s capital efficiency. |
| [MEGA Quant](https://ethglobal.com/showcase/mega-quant-6bvz2) | Utilize 1inch APIs | MEGA QUANT: Multi-chain Delta Neutral Trading Desktop Application with trustless EIL Integration |
| [ProaqctiveMM](https://ethglobal.com/showcase/proaqctivemm-f0y6v) | Build an Aqua App 4th | We have build a Proctive Auto Market Maker using 1inch Aqua, SwapVM and Pyth oracle |
| [Aqua0](https://ethglobal.com/showcase/aqua0-u2krx) | Build an Aqua App 4th (finalist catalogue) | Mini App for Cross-Chain shared liquidity via Aqua AMMs and LayerZero |

**New York 2026** (232 projects; 4 winners, and only about 5 Aqua entries matched by keyword, so nearly every Aqua entry placed) ([NYC showcase](https://ethglobal.com/showcase?events=newyork2026)):

| Place | Project | What it built (from its page) |
|---|---|---|
| 1st | [RiverSwap](https://ethglobal.com/showcase/riverswap-bat5v) | An auction-managed AMM on Aqua and SwapVM: the right to set and collect the fee is auctioned, implementing Adams et al.'s am-AMM research and extending it to concentrated liquidity; custom opcode `_aquaAccountedDynamicFeeAmountInXD`; a Tycho indexer integration so solvers can rebuild pool state |
| 2nd | [Lotus](https://ethglobal.com/showcase/lotus-9vnou) | "A directional liquidity for big holders, sell on the way up, never re-buy"; LotusSwapVMRouter with three custom opcodes (ONEWAY_FILL, ONEWAY_FILL_BEST, ONEWAY_FILL_LIFI); 159 tests, many forked against Base; a fork test found the deployed router was an older 28-opcode build; also won Uniswap API 1st |
| 3rd | [TenorFi](https://ethglobal.com/showcase/tenorfi-06wnb) | "On-Chain Fixed Funding Rate for Perpetual Markets on Hyperliquid"; custom `_fundingSettle` opcode nets fixed against floating each period; collateral stays in the wallet and is pulled hourly; Chainlink CRE writes the funding index |
| 4th | [Ballast](https://ethglobal.com/showcase/ballast-7jpyp) | "leveraged, oracle-anchored liquidity on 1inch Aqua"; two opcodes (leverage, Chainlink anchor); 17 tests; mainnet fork with real WETH, DAI and the ETH/USD feed; on a pool set 2x off-market a trader takes about 11.9 ETH for 10,000 DAI without the anchor and 5.94 WETH with it |

Non-winner with Aqua at NYC: [smile](https://ethglobal.com/showcase/smile-fictr) (options; it later won ETHOnline's Continuity 2nd).

**Lisbon 2026** (173 projects; 19 matched Aqua or SwapVM; 3 fresh winners, 2 Continuity) ([Lisbon showcase](https://ethglobal.com/showcase?events=lisbon2026)):

| Place | Project | What it built |
|---|---|---|
| 1st | [ArcBook](https://ethglobal.com/showcase/arcbook-twp2a) (also The Graph AI Tooling 2nd; ETHGlobal finalist) | An order book where "every maker position is itself a bounded, executable pricing curve"; a fixed-point curve kernel; a custom SwapVM instruction that recycles fills into the opposite curve; multi-maker routes where "a route either completes within its aggregate limit or fully reverts"; Foundry unit, integration, security and fuzz tests, a Python reference model, a "zero-localhost release verifier"; Base Sepolia |
| 2nd | [Votive](https://ethglobal.com/showcase/votive-p78qo) | Fund "wishes" that an AI agent executes once models can; each token wish is an Aqua position on an AquaSwapVMRouter "extended ... append-only with seven custom SwapVM opcodes"; the browser "refuses to ship unless keccak(program) matches the router's own hash(order)" |
| 3rd | [KSwap-VM](https://ethglobal.com/showcase/kswap-vm-aix5n) | "A formal semantics for 1inch's swap-vm, and formal verification for it's modules"; Kontrol on KEVM on K; proofs on deployed bytecode; counterexamples replayed as failing forge tests before reporting bugs; a small verified Aqua app ("sweeper") |
| Continuity 1st | [Pool Party](https://ethglobal.com/showcase/pool-party-s7i6a) | USDC neobank routing into Aqua-based strategies (also Uniswap 1st) |
| Continuity 2nd | [Agora Markets](https://ethglobal.com/showcase/agora-markets-0ke7v) | Futarchy markets whose live trading phase runs on Aqua and SwapVM |

Lisbon non-winners with Aqua (sample): [AquaPilot](https://ethglobal.com/showcase/aquapilot-03izt) ("a sentence in, validated bytecode out"), [QilinSwap](https://ethglobal.com/showcase/qilinswap-pzccy) ("draw a graph, it compiles to SwapVM bytecode"), [Sluice](https://ethglobal.com/showcase/sluice-mxbqy) (natural language to strategies in a 0G TEE), [Wave](https://ethglobal.com/showcase/wave-i97sc) ("1inch built a swap-strategy VM with no compiler. We wrote it"), [Baywatch](https://ethglobal.com/showcase/baywatch-x1az9) (toxic-flow pricing), [ScubaSwap](https://ethglobal.com/showcase/scubaswap-4k2jm) and [Turing Swap](https://ethglobal.com/showcase/turing-swap-ck2y6) (World ID gated pricing), [Doca](https://ethglobal.com/showcase/doca-finance-rjm24), [Superpose](https://ethglobal.com/showcase/superpose-ai0gv), [Aqua Prime](https://ethglobal.com/showcase/aqua-prime-p8wjj), [Vortex](https://ethglobal.com/showcase/vortex-aowex), [Alba](https://ethglobal.com/showcase/alba-ma7bi), [Sealevel](https://ethglobal.com/showcase/sealevel-qg699), [RWA Outlet](https://ethglobal.com/showcase/rwa-outlet-wogh8), [Signalflo](https://ethglobal.com/showcase/signalflo-k8jiw), [Intentional](https://ethglobal.com/showcase/intentional-so-77n1c).

**ETHOnline 2026** (811 projects; 62 matched; 3 fresh winners, 2 Continuity) ([ETHOnline showcase](https://ethglobal.com/showcase?events=ethonline2026)):

| Place | Project | What it built |
|---|---|---|
| 1st | [Solvent](https://ethglobal.com/showcase/solvent-7uphp) | Overcommitment made part of price: "We rebuilt every maker's balance sheet across Aqua's entire history on Base"; "115 makers shipped 443 strategies. 78 of the 88 books that ever held more than $100 were under-backed at some point"; instructions `SolvencySkew` (spread widens with utilisation, "from 3,106.67 to 3,202.86 at 87% utilisation") and `SolvencyFloor` (declines at quote time "instead of reverting at settlement"), placed in reserved opcode slots "so no official opcode moves"; subgraph on four chains; npm SDK |
| 2nd | [coldcascade](https://ethglobal.com/showcase/coldcascade-4rfos) | A HyperEVM maker that reads Hyperliquid's book through precompiles inside the swap and clamps to it; replay of the 10 Oct 2025 cascade: an arbitrageur "takes $222 from the oracle-pegged maker, $3,558 from a plain curve, and $0 from this desk"; program `XYCSwap || Extruction(CoreQuote)` on "the official AquaSwapVMRouter on chain 999 at release 1.0.2"; hedges on the perp; mainnet |
| 3rd | [Superposition](https://ethglobal.com/showcase/superposition-iozs5) | Idle Aqua balances earn yield: hooks JIT-withdraw from Aave, ERC-4626, Stargate, Pendle PT or a v4 hook on fill and redeposit after; two "append-only meta-opcodes" (`YieldAdjustedRateXD`, `MakerCapitalGuardXD`); pins "1inch/swap-vm v1.0.2, 1inch/aqua v1.0.0" |
| Continuity 1st | [Aqua0](https://ethglobal.com/showcase/aqua0-qpagf) | Stablecoin FX strategies on Arc from one USDC deposit (began at Buenos Aires) |
| Continuity 2nd | [smile](https://ethglobal.com/showcase/smile-mfvz7) | Options marketplace on Aqua (began at NYC) |

ETHOnline non-winners (sample of 57): five other solvency, overcommitment or exposure-guard entries, [Solvent-aqua](https://ethglobal.com/showcase/solvent-aqua-mnxcm) ("the sum 1inch Aqua never computes"), [Overdraft](https://ethglobal.com/showcase/overdraft-xf731), [Bone Dry](https://ethglobal.com/showcase/bone-dry-y7dzm), [AquaQoS](https://ethglobal.com/showcase/aquaqos-ug4ie), [Counterweight](https://ethglobal.com/showcase/counterweight-2b1zg); agent-permission entries [Batas](https://ethglobal.com/showcase/batas-ns7pr), [mandate](https://ethglobal.com/showcase/mandate-v6m92), [mandate-app](https://ethglobal.com/showcase/mandate-app-65r78), [Subfloor](https://ethglobal.com/showcase/subfloor-4bagx), [Moor](https://ethglobal.com/showcase/moor-bps0m), [Speakeasy](https://ethglobal.com/showcase/speakeasy-j4fws), [Substrat](https://ethglobal.com/showcase/substrat-9rxh4); strategy research or AI arenas [AutoAMM](https://ethglobal.com/showcase/autoamm-azq6f), [Naumachy](https://ethglobal.com/showcase/naumachy-nfou5); products such as [Tremor](https://ethglobal.com/showcase/tremor-q9ye1) (variance receipts), [Glasshouse](https://ethglobal.com/showcase/glasshouse-9eww7) (sealed-bid auctions in SwapVM), [Strikeline](https://ethglobal.com/showcase/strikeline-bthin) (covered calls), [Ladder](https://ethglobal.com/showcase/ladder-nw7uj) (grid), [Freeboard](https://ethglobal.com/showcase/freeboard-finance-j6s5z) (Aave health-factor basket), [Breakwater](https://ethglobal.com/showcase/breakwater-qneyd), [Firmdepth](https://ethglobal.com/showcase/firmdepth-74qjd), [Tempo](https://ethglobal.com/showcase/tempo-cdv2j), [Ratchet Range](https://ethglobal.com/showcase/ratchet-range-cd111), [Aquifer](https://ethglobal.com/showcase/aquifer-gy9hw).

**Tokyo 2026** (254 projects; about 30 matched; 3 fresh winners, 2 Continuity) ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026)):

| Place | Project | What it built |
|---|---|---|
| 1st | [OddsFlow](https://ethglobal.com/showcase/oddsflow-fwsnb) (ETHGlobal finalist) | One sDAI balance backs fixed-price orders on many Seer prediction markets; three opcodes (`FixedPriceSwap`, `OnlyUnresolvedCondition`, `OnlyUnansweredQuestion`) "appended after the official set, so no official index moves"; "The rule that cannot fail: the maker's sDAI never leaves the wallet unless their tokens arrive in the same transaction, at their price"; Gnosis mainnet fork with real Aqua and a real Seer market; "55 Foundry tests: every forbidden path reverts, SwapVM's own CoreInvariants run against our opcode, and a fuzz test shows the maker never pays more than their price. Contract coverage is 97%"; Foundry-to-Vitest byte parity |
| 2nd | [Wamia](https://ethglobal.com/showcase/wamia-z11ah) | A standing bid for Pendle PT during manipulation; anchored on a dated attack: "On Aug 25, 2026, an attacker forced Pendle's router to sell millions of PT reUSD"; "$37.35M in debt became eligible for liquidation"; in a fork replay "5M SY of Wamia liquidity took liquidatable debt from $37.35M down to $0"; runs "entirely on 1inch's deployed, unmodified contracts" as one `Extruction`; prices "never from taker-supplied data"; parity test; FEEDBACK.md |
| 3rd | [watermark](https://ethglobal.com/showcase/watermark-68230) (ETHGlobal finalist) | A DAO treasury quotes both sides from its Safe; opcodes `EnsGate` (#34, walks ENSv2 registries so only named counterparties fill) and `DeskPrice` (#35); "One fill cannot move more than 50 ETH"; anchored on ENS DAO's Feb 2023 sale of 10,000 ETH at 2% slippage; official Aqua registry, not redeployed |
| Continuity 1st | [VexiHakari](https://ethglobal.com/showcase/vexihakari-y7trp) (also Uniswap 1st) | Options vault on one Aqua balance with `ExposureGuard` and `DeltaSkew`; proved a 59% pool-push attack on a Robinhood Chain fork, then guarded it |
| Continuity 2nd | [Takarabako](https://ethglobal.com/showcase/takarabako-qmgg5) (ETHGlobal finalist) | Cash kiosk to dollar savings, positions on Aqua |

Tokyo non-winners (sample of about 25): [Iceberg](https://ethglobal.com/showcase/iceberg-ea5f9) and [Tide](https://ethglobal.com/showcase/tide-b14pr) (partially active AMMs on Aqua and v4), [Holster](https://ethglobal.com/showcase/holster-hmwie) (TWAP band), [RateSpace](https://ethglobal.com/showcase/ratespace-ke33e) and [Aquawrap](https://ethglobal.com/showcase/aquawrap-povv5) (oracle-rate pegs), [Trim](https://ethglobal.com/showcase/trim-76d99) (Aave rebalancing via a custom instruction), [AquaTerm](https://ethglobal.com/showcase/aquaterm-mdmbt) (term lending), [AquaVol](https://ethglobal.com/showcase/aquavol-uyeam), [MAMORI](https://ethglobal.com/showcase/mamori-6t9de) and [SeaWall](https://ethglobal.com/showcase/seawall-umh78) (options and puts), [CorrFi](https://ethglobal.com/showcase/corrfi-ju0md), [PDFi +](https://ethglobal.com/showcase/pdfi-ar8v8) (invoices), [DayTrader](https://ethglobal.com/showcase/daytrader-2mkp6), and agent-plus-Aqua apps [My Agent Ohana](https://ethglobal.com/showcase/my-agent-ohana-v04gz), [AegisNet](https://ethglobal.com/showcase/aegisnet-3zc9u), [SuwappuBot](https://ethglobal.com/showcase/suwappubot-rfcyu), [Otomo](https://ethglobal.com/showcase/otomo-49izc), [Re:Leash](https://ethglobal.com/showcase/re-leash-385c6), [PayGuard](https://ethglobal.com/showcase/payguard-2g5cw), [Jev Market Factory](https://ethglobal.com/showcase/jev-market-factory-uvzqp). (Names and auto-summaries from the listing.)

---

## 5. Why winners won (Judgement, with the evidence above)

Compared within each Aqua event, the winners share seven traits that most non-winners lack. Counts are over the 13 fresh Aqua winners from NYC 2026 to Tokyo 2026 whose pages were read (NYC 4, Lisbon 3, ETHOnline 3, Tokyo 3; Buenos Aires is treated separately below).

1. **SwapVM carries the core rule (13 of 13).** Every fresh winner since NYC used custom opcodes on a redeployed router (RiverSwap, Lotus, TenorFi, Ballast, ArcBook, Votive, Solvent, Superposition, OddsFlow, watermark) or an `Extruction` on the deployed router (Wamia, coldcascade); KSwap-VM verified SwapVM itself. Many non-winners used Aqua with a stock curve or treated it as a settlement leg behind an agent or a UI (Tokyo's agent apps, Lisbon's Sealevel, Signalflo, Turing Swap). This is the "scored higher" sentence in action.
2. **A named financial position, not a tool around Aqua.** Composers and compilers (AquaPilot, QilinSwap, Sluice, Wave at Lisbon; AutoAMM, Naumachy at ETHOnline) and external checkers (Solvent-aqua, Overdraft, AquaQoS) placed nowhere. The overcommitment pair is the cleanest comparison. Both measured real under-backing on Base and both wrote an instruction. Solvent (1st) made the position itself better: utilisation widens its price and a floor refusal lives in "the program bytes, so any taker can read the covenant before trading". Solvent-aqua (no prize) led with a reader contract, a Uniswap v4 hook that rejects fills from insolvent makers, Graph exposure data and a size clamp, so its story was infrastructure around Aqua rather than a better Aqua position. KSwap-VM is the exception that proves the rule: it is tooling, but it targets SwapVM's own correctness and ships a verified app.
3. **A dated real failure and a replay with numbers.** Wamia (25 Aug 2026 Pendle attack, $37.35M to $0), coldcascade (10 Oct 2025 cascade, $222 / $3,558 / $0), Solvent (78 of 88 books under-backed, from an archive node), watermark (ENS DAO 2023 sale), Ballast (11.9 ETH versus 5.94 WETH). Non-winners in the same lanes usually described a mechanism without a measured before-and-after (Iceberg, Tide, Holster, RateSpace, Aquawrap).
4. **Evidence a judge can rerun.** Fork tests against live protocols (Lotus 159 tests, OddsFlow 55 tests and 97% coverage, Ballast, Wamia), SwapVM's `CoreInvariants` (OddsFlow), fuzzing (ArcBook, OddsFlow), byte-for-byte TypeScript and Solidity parity (OddsFlow, Wamia, Votive's `keccak(program)` check), formal proofs (KSwap-VM), release verifiers (ArcBook).
5. **Respect for the official contracts.** Winners pin release tags ("1inch/swap-vm v1.0.2, 1inch/aqua v1.0.0" in Superposition; "deployed, unmodified contracts" in Wamia), append opcodes without moving official indices (OddsFlow, Solvent, Superposition, Votive), and document mismatches with the deployed build (Lotus). The rule "Official Aqua/SwapVM contracts must be used" arrived at Lisbon, after NYC.
6. **Two 1st places implemented a published AMM paper as SwapVM logic.** RiverSwap (NYC 1st) says it implemented Adams et al.'s auction-managed AMM research; Aqua Outcome Market (Buenos Aires 1st) "Implements a novel AMM invariant describe by Ciamac Moallemi and Dan Robinson in pm-AMM: A Uniform AMM for Prediction Markets" using "swapVM's bespoke instruction architecture" ([Aqua Outcome Market](https://ethglobal.com/showcase/aqua-outcome-market-0va0j)). A citable mechanism gives judges a yardstick for correctness.
7. **Feedback to 1inch.** Wamia's FEEDBACK.md, KSwap-VM's bug reports, Lotus's and Solvent-aqua's notes on the opcode table. 1inch has never required it, but the winners who did it are the ones whose pages read like a code review of SwapVM.

What did not matter much: front-end polish (KSwap-VM and Wamia have modest UIs), a second sponsor (only Lotus, ArcBook and the Continuity winners also won elsewhere), and the agent theme (Votive is the only agent-themed fresh winner, and it won on seven opcodes; a dozen agent-plus-Aqua entries at Tokyo and ETHOnline won nothing).

**Buenos Aires was different.** With Aqua one week into its developer preview, SwapVM mandatory ("SwapVM is used to power Aqua app") and seven Aqua places worth $17,000, Buenos Aires paid for breadth, and only about 11 Aqua entries matched by keyword. The places went to a pm-AMM prediction-market invariant with JIT borrowing through Euler (1st), flash loans from Aqua balances, a self-custodial savings app and a Noir private vault feeding Aqua (the three 2nd places), and an oracle-rebalanced basket vault, a Pyth-anchored market maker and Aqua0's cross-chain mini app (4th). The three API prizes went to Omni402, RageQuit Kit and MEGA Quant. **Judgement:** a land grab for a new primitive in which most working SwapVM entries placed. The bar has risen at every event since, and the "official contracts" rule plus the fall to three places make Buenos Aires a poor guide for Mumbai, except for its 1st place, which already showed the research-paper pattern.

**Era A and B patterns.** 

- **Era A (API, Fusion+ and plugin tracks).** The API prizes went to apps where a 1inch call sits in the user's main flow: wallet analysis and dashboards (How Doxxed Am I, Portfolio 1st at Taipei; OrbitGO; Unisight), Telegram and AI trading bots that execute through 1inch (MoonGang, Segugio, Liquid, SimplifAI at Bangkok; NewsQuantar, AgentActs at Taipei) and payments (Burner at Bangkok, QryptoPay at Taipei, Tap Ether at Brussels). Finalists that used 1inch only at the edge won no 1inch prize: SQUIDL and Clarity at Singapore, LootGO at Bangkok, Ask CaiShen at Taipei (`finalists_2024q3_2025q1.md`, `finalists_2025q1_2025q3.md`). Fusion+ drew few entries; Taipei's 3rd went to EthereumFighter, a game. Istanbul's winners (places not read) show the same taste plus an early security streak: Onay ("Gives permission to a Security Council to revoke any allowances you have (only to revoke)"), Stabilan (trustless insurance against price crashes), IntentBoost (leverage or shorts through Fusion, CoW and UniswapX) and a Waku transport for the Fusion API. **Judgement:** "meaningful purpose" meant that removing 1inch breaks the product.
- **Era B (protocol extensions).** Tracks below are inferred from taglines where the badge was not read. Fusion+ winners delivered the hard requirements on a real non-EVM chain: hashlock, timelock, refund and both directions (Hashlocked, Non-EVM 1st at Cannes, with native Bitcoin HTLCs; Giant Anteaters and Swappatee at Cannes; 8inch for Aptos, Crosschainer for Flow Cadence, HTLC-AVM for Algorand, Goulhash for Cardano and MoleSwap for TON at Prague; at New Delhi MelSwap 1st for Aptos and Sui, "Escrows are enforced with hashlocks + timelocks guarantees", Hide and Seek 2nd and Fusion 3rd for Monad and Starknet). LOP winners invented order semantics that 1inch's own docs list as ideas: options (1Option; VectorPlus at Prague), a ZK sealed-bid auction (zkFusion), stop, iceberg and OCO (Super Order), margin via Aave and Morpho (1delta Unite), multi-asset orders (Rosetta), volatility-aware spreads (DynamicSpreadLO), funding-rate arbitrage (Cannes). New Delhi's LOP places show the judging was not literal: 1st went to DeFiDuck, which describes itself as "a v4 Hook" for volatility-aware TWAP execution, 2nd to CrossYield and 3rd to Tzunami (encrypted ERC-20s with ZK compliance) ([DeFiDuck](https://ethglobal.com/showcase/defiduck-nk5xj); [Tzunami](https://ethglobal.com/showcase/tzunami-o3jpp)). At Unite, 40 of about 275 keyword-matched 1inch entries won, so a working port was necessary but not sufficient; the privacy finalists Zeroinch and PonyHof won no 1inch prize. **Judgement:** 1inch's engineers judged against their own requirement list first and then rewarded new mechanisms; New Delhi's added rule (escrows deployed through the LOP's `fillOrderArgs`) shows them closing the door on ports that skipped their contracts, the same move the Aqua track made at Lisbon with "Official Aqua/SwapVM contracts must be used".

---

## 6. How the problem statements moved, and what 1inch wants now

| Period | What 1inch asked for | Signal (Judgement) |
|---|---|---|
| Istanbul 2023 to Taipei 2025 | "Use any of it to enhance your project"; Fusion API, Fusion+, Portfolio API, Token Plugins; "meaningful purpose" | Distribution: get developers to call 1inch APIs and its new cross-chain swap. Low bar, many small prizes |
| Prague 2025 to New Delhi 2025, Unite | Extend Fusion+ to non-EVM chains with hashlocks, timelocks, refunds and bidirectional swaps; extend the Limit Order Protocol (options, TWAP, concentrated liquidity); judging names "Security and reliability of the flow" and "Code quality/completeness" | Protocol work: 1inch paid teams to do its chain expansion and LOP research, then tightened the rules (New Delhi: integrate LOP contract code, deploy escrows via `fillOrderArgs`) as low-effort ports multiplied |
| Buenos Aires 2025 | "Create a custom Aqua app based on SwapVM", examples Leverage, AMM, Lending, Options | Launch marketing for a new primitive one week after its developer preview |
| NYC 2026 to Mumbai | SwapVM optional but "scored higher"; "Official Aqua/SwapVM contracts must be used"; one track at $5,000 since Lisbon | Quality over quantity: fewer, larger-effort entries on the canonical contracts; 1inch wants proof that SwapVM's opcode model can express positions nobody can build in a pool contract |

**What 1inch says it is paying for (sourced).** A 1inch DAO temperature check posted on 30 Apr 2026 by the Degensoft events team asks for $695,000 to cover 21 events, including the New York, Lisbon, ETHOnline, Tokyo and Mumbai hackathons of 2026; its core focus is supporting the development and adoption of 1inch Aqua, and its KPIs include hackathon submissions, protocol integrations and technical leads, and "Aqua-related integrations and experimentation"; in replies the team says it will prioritise Aqua-related outcomes as a primary KPI and is discussing post-hackathon support for promising teams through introductions, incubation and grants ([1inch governance forum](https://gov.1inch.network/t/1inch-ethglobal-events-grant-proposal-2026-2027/935); read through a page summary). **Judgement:** a Mumbai entry that could become a real Aqua integration after the event (a reusable opcode, a maker product with a named user) speaks to the KPI the sponsor reports upward.

Constants across all 15 events: "meaningful purpose" or "sophisticated" use; onchain token transfers in the demo (from Cannes 2025); "Proper Git commit history" (from Taipei 2025); no published "won't place" list.

### Mapping Mumbai's track to past tracks

| Mumbai track | Nearest past tracks | Status |
|---|---|---|
| Build an Aqua App ($5,000; 1st $2,500, 2nd $1,500, 3rd $1,000) | Tokyo 2026, ETHOnline 2026 and Lisbon 2026 "Build an Aqua App" (identical text and split); NYC 2026 (same idea, four places, no official-contracts rule); Buenos Aires 2025 (SwapVM mandatory, $17,000) | **Repeated** (fourth identical run). Its ancestors are Extend Limit Order Protocol (strategies on a 1inch primitive, judged on "Innovation and originality") rather than the API tracks |
| Build an Aqua App - Continuity ($2,000) | Lisbon, ETHOnline, Tokyo Continuity | Repeated; not eligible for a fresh build |

**Judgement on what this signals for Mumbai.** With identical text four times running, the judges' taste is the variable, and it is visible in the 13 fresh places since NYC: custom SwapVM logic, a position with a named user, a dated failure replayed with numbers, and evidence on the official contracts. Competition is rising (about 5 Aqua entries at NYC, 19 at Lisbon, about 30 at Tokyo, 62 at ETHOnline by keyword), so "uses Aqua with custom opcodes" no longer separates an entry. Crowded lanes to avoid unless the twist is structural: overcommitment and solvency (six entries at ETHOnline), agent permissions over Aqua positions, options on Aqua, partially active or dual-venue AMMs, natural-language or visual strategy builders, oracle-rate pegs without a new risk check.

---

## 7. Gaps

- Places were read for every Aqua-era winner and for New Delhi. For Istanbul, Brussels, Singapore, Bangkok, Taipei, Prague and Cannes, only places already in the finalist catalogues are given; the other rows say "place not read", because project pages hit a Cloudflare check and then HTTP 429 on 31 Oct and fetching was kept to the minimum.
- Unite's 40 winners are listed by category from the showcase and 1inch's post; places beyond the finalist catalogue were not read.
- Non-winner samples are keyword matches on taglines and ETHGlobal auto-summaries; projects that used 1inch without saying so are missed, and one Tokyo match (Reel Deal, "aquaculture") is a false positive.
- Workshop recordings and slides were not reviewed; NYC's prize page links Tanner Moore's slides ([NYC 2026 prizes](https://ethglobal.com/events/newyork2026/prizes/1inch)).
