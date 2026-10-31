# Chainlink at ETHGlobal, late 2023 to October 2026: track history, winners and what the judges reward

Research date: 2026-10-31. Prepared for ETHGlobal Mumbai (hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST). Team: three people, DeFi and smart contract security, Classic track, fresh build only. Continuity-only tracks are listed for completeness only and are marked **(Continuity only)**; none of them is a target.

**How to read this file.** Lines under "Sourced" carry a URL. Lines marked **Judgement** are this researcher's reading, not a Chainlink or ETHGlobal statement. Sponsor text is quoted verbatim, with two mechanical changes: every em dash in the source is shown as "[dash replaced]" and emojis are dropped.

---

## 0. Method and caveats

- Event list: the ETHGlobal events data on [ethglobal.com/events](https://ethglobal.com/events) was parsed for every event of type "hackathon" from October 2023 to October 2026 (34 events). Each event's prize page (`https://ethglobal.com/events/<slug>/prizes`) was fetched once, slowly, and checked for a Chainlink sponsor block. 17 events had Chainlink prizes; 17 did not (section 1).
- Prize text: each Chainlink sponsor subpage (`https://ethglobal.com/events/<slug>/prizes/chainlink`) was fetched and converted to text. Track titles, amounts and requirement text below come from those pages.
- Winners: every page of each event's showcase listing (`https://ethglobal.com/showcase?events=<slug>&page=N`, about 33 cards a page, 5,900 cards in total) was scraped for cards carrying the Chainlink organization logo (`organizations/f8ku2`, the same logo shown on the Chainlink prize pages). That gave 81 projects. Each project page was then opened for its "Winner of" lines.
- Bot checks: on the first pass 22 of the 81 project pages returned an ETHGlobal "Enable JavaScript and cookies to continue" check. No attempt was made to get around it. After a pause, a second pass at one request every 10 seconds loaded 21 of them normally. One page ([Chaser](https://ethglobal.com/showcase/chaser-cte1q), ETHOnline 2023) still showed the check, so its Chainlink track is unknown; it is listed from its showcase card only.
- Non-winner sample: showcase cards whose name or tagline mentions Chainlink, CCIP or CRE but which carry no Chainlink logo were listed per event (about 400 such cards across the 17 events), and nine of them were opened for comparison (section 4.4).
- Existing notes reused rather than re-researched: the finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` (which already record Chainlink prizes for PrivacyLinks, Swap Pay, ENShell, Canary, Immunity, BMCP, GhoShare, Ephi, EthDrive and others) and `track_ideas/00_current_tracks.md` (Mumbai text, fetched 2026-10-31).
- Limits: a showcase page shows what the team wrote, not what the judges saw. Partner judges also watch the video and read the repo, which this research did not do. The "why they won" sections are inferences from descriptions and are labelled as such.

---

## 1. Which events had Chainlink prizes

Sourced from each event's prizes page and Chainlink subpage (URLs in the table). Pools are the sponsor total shown on the Chainlink subpage.

| Event (slug) | Dates | Chainlink pool | Tracks (verbatim titles) and amounts | Source |
|---|---|---|---|---|
| ETHOnline 2023 (`ethonline2023`) | 6 to 27 Oct 2023 | $5,000 | "Chainlink": $1,500 x 2 "for the 2 best projects that use Chainlink CCIP or Chainlink Functions"; $1,000 x 2 "for the 2 best projects that build something awesome with other Chainlink services" | [prizes](https://ethglobal.com/events/ethonline2023/prizes/chainlink) |
| ETHGlobal Istanbul (`istanbul`) | 17 to 19 Nov 2023 | $10,000 (in LINK) | "Chainlink CCIP" $4,000 (Winner $2,500, Runner-up $1,500); "Chainlink Functions" $4,000 (same split); "Other Chainlink Services" $2,000 | [prizes](https://ethglobal.com/events/istanbul/prizes/chainlink) |
| ETHIndia 2023 (`ethindia2023`) | 8 to 10 Dec 2023 | $5,000 | "Best use of Chainlink CCIP" $2,000 (2 x $1,000); "Best use of Chainlink Functions" $2,000 (2 x $1,000); "Best use of other Chainlink Services" $1,000 | [prizes](https://ethglobal.com/events/ethindia2023/prizes/chainlink) |
| LFGHO (`lfgho`) | 12 to 24 Jan 2024 | $5,000 (in LINK) | "Best Projects Built with CCIP and GHO" $5,000 (3 x $1,666) | [prizes](https://ethglobal.com/events/lfgho/prizes/chainlink) |
| ETHGlobal London (`london2024`) | 15 to 17 Mar 2024 | $5,000 (in LINK) | "Chainlink CCIP" $4,000 (2 x $2,000); "Connect the world with Chainlink" $1,000 | [prizes](https://ethglobal.com/events/london2024/prizes/chainlink) |
| ETHGlobal Sydney (`sydney`) | 3 to 5 May 2024 | $10,000 (in LINK) | "Best use of Chainlink CCIP" $5,000 (2 x $2,500); "Connect the World with Chainlink" $5,000 (3 x $1,666) | [prizes](https://ethglobal.com/events/sydney/prizes/chainlink) |
| ETHGlobal Brussels (`brussels`) | 12 to 14 Jul 2024 | $10,000 | "Best use of Chainlink CCIP" $6,000 (3 x $2,000); "Connect the World with Chainlink" $4,000 (2 x $2,000) | [prizes](https://ethglobal.com/events/brussels/prizes/chainlink) |
| Superhack 2024 (`superhack2024`) | 2 to 16 Aug 2024 | $5,000 | "Best use of Chainlink CCIP" $5,000 (2 x $2,500), "on Optimism or Base" | [prizes](https://ethglobal.com/events/superhack2024/prizes/chainlink) |
| ETHOnline 2024 (`ethonline2024`) | 23 Aug to 13 Sep 2024 | $10,000 | "Best use of Chainlink CCIP" $6,000 (3 x $2,000); "Connect the World with Chainlink" $4,000 (2 x $2,000) | [prizes](https://ethglobal.com/events/ethonline2024/prizes/chainlink) |
| ETHGlobal Singapore (`singapore2024`) | 20 to 22 Sep 2024 | $10,000 | Same two tracks, $6,000 (3 x $2,000) and $4,000 (2 x $2,000) | [prizes](https://ethglobal.com/events/singapore2024/prizes/chainlink) |
| ETHGlobal Bangkok (`bangkok`) | 15 to 17 Nov 2024 | $20,000 | "Best use of Chainlink CCIP" $12,000 (3 x $4,000); "Connect the World with Chainlink" $8,000 (4 x $2,000) | [prizes](https://ethglobal.com/events/bangkok/prizes/chainlink) |
| ETHGlobal Cannes (`cannes`) | 4 to 6 Jul 2025 | $10,000 | "Best usage of Chainlink CCIP and/or CCT" $6,000 (3 x $2,000); "Connect the World with Chainlink" $4,000 (2 x $2,000) | [prizes](https://ethglobal.com/events/cannes/prizes/chainlink) |
| ETHGlobal New York 2025 (`newyork2025`) | 15 to 17 Aug 2025 | $10,000 | "Best usage of Chainlink CCIP and/or CCT" $4,000 (2 x $2,000); "Connect the World with Chainlink" $6,000 (3 x $2,000) | [prizes](https://ethglobal.com/events/newyork2025/prizes/chainlink) |
| ETHGlobal Buenos Aires (`buenosaires`) | 21 to 23 Nov 2025 | $15,000 | "Connect the World with Chainlink" $6,000 (3 x $2,000); "Best workflow with Chainlink CRE" $9,000 (3 x $3,000) | [prizes](https://ethglobal.com/events/buenosaires/prizes/chainlink) |
| ETHGlobal Cannes 2026 (`cannes2026`) | 3 to 5 Apr 2026 | $7,000 | "Best workflow with Chainlink CRE" $4,000 (2 x $2,000); "Connect the World with Chainlink" $1,000; "Best usage of Chainlink privacy standard" $2,000 (2 x $1,000) | [prizes](https://ethglobal.com/events/cannes2026/prizes/chainlink) |
| ETHGlobal New York 2026 (`newyork2026`) | 12 to 14 Jun 2026 | $14,000 | "Best workflow with CRE" $6,000 (3 x $2,000); "Connect the World with Chainlink" $2,000 (2 x $1,000); "Best usage of Chainlink Confidential AI Attester" $4,000 (2 x $2,000); "Best Chainlink-Powered Upgrade" $2,000 (2 x $1,000, Continuity only) | [prizes](https://ethglobal.com/events/newyork2026/prizes/chainlink) |
| ETHOnline 2026 (`ethonline2026`) | 4 to 16 Sep 2026 | $3,000 | "Best Confidential Workflow" $2,000 (2 x $1,000); "Best Chainlink-Powered Upgrade" $500 (Continuity only); "Automated Liquidation Protection Challenge" $500 | [prizes](https://ethglobal.com/events/ethonline2026/prizes/chainlink) |
| **ETHGlobal Mumbai (`mumbai`)** | **5 to 7 Nov 2026** | **$5,000** | **"Best workflow with CRE" $1,500 (single winner); "Best use of Chainlink CCIP 2.0" $3,500 (2 x $1,750)** | [prizes](https://ethglobal.com/events/mumbai/prizes/chainlink) |

Events with no Chainlink prize (checked on each prizes page): Circuit Breaker, Frameworks, Scaling Ethereum 2024, HackFS 2024, StarkHack, San Francisco 2024, Agentic Ethereum, Trifecta, Taipei, Prague, Unite DeFi, New Delhi 2025, ETHOnline 2025, HackMoney 2026, Open Agents, Lisbon 2026 and Tokyo 2026. On several of these other sponsors name Chainlink inside their own tracks (for example Hedera's New Delhi and Lisbon 2026 tracks list "Oracles (Chainlink, Pyth, Supra)" as optional extras), which is not a Chainlink prize ([New Delhi prizes](https://ethglobal.com/events/newdelhi/prizes); [Lisbon 2026 prizes](https://ethglobal.com/events/lisbon2026/prizes)).

**Judgement.** Chainlink skipped the last India event (New Delhi 2025) and the last two in-person events (Lisbon, Tokyo). Mumbai's $5,000 is the smallest in-person Chainlink pool since London 2024 and the CRE prize is the first CRE track with a single winner. Fewer, larger-scope prizes mean fewer chances, but likely fewer serious entrants too.

---

## 2. Problem statements over time (verbatim where possible)

### 2.1 Late 2023: a product menu (CCIP, Functions, everything else)

- ETHOnline 2023: "Anything that came from the Chainlink Documentation counts, using Price Feeds, VRF, Automation, Chainlink Functions or Chainlink CCIP!" Rules: "You must use Chainlink to make a state change on the blockchain to be eligible." "It must be possible for the judges to find the Chainlink use in your code. Only the intention to use is not valid." "You must present your project for the Chainlink judges! Projects whose team does not present will not be evaluated." Published criteria: "UI/UX/DX - How useful is your application? Is it visually appealing?", "Blockchain technology application - How valuable this project is for decentralization and adoption of Blockchain and Web3", "Wow Factor - Anything not covered above!" ([ETHOnline 2023](https://ethglobal.com/events/ethonline2023/prizes/chainlink))
- Istanbul: one prize per product, "awarded to the best project that meaningfully uses Chainlink CCIP" (and the same for Functions). ([Istanbul](https://ethglobal.com/events/istanbul/prizes/chainlink))
- ETHIndia 2023 introduced the sentence that survives to Mumbai: "Each project must use Chainlink CCIP in some form to make a state change on a blockchain, otherwise it will not be eligible. This means that a front end simply reading from Chainlink data feeds doesn't count", plus "Using Chainlink CCIP inside your smart contracts is required". ([ETHIndia 2023](https://ethglobal.com/events/ethindia2023/prizes/chainlink))
- LFGHO: a co-marketing track, "the best three projects that meaningfully use Chainlink CCIP with GHO". ([LFGHO](https://ethglobal.com/events/lfgho/prizes/chainlink))

### 2.2 March 2024 to August 2025: the "CCIP plus Connect the World" template

- From London 2024 the CCIP description is fixed: "Build something awesome using Chainlink CCIP! The Chainlink Cross-Chain Interoperability Protocol (CCIP) provides a single simple interface through which dApps and web3 entrepreneurs can securely meet all their cross-chain needs, including token transfers and arbitrary messaging." "Possible use cases: Cross-chain DeFi app with liquidity across multiple chains Cross Chain DeFi yield aggregator Token bridge powered by CCIP Multihop CCIP Router. You want to send cross-chain message from blockchain A to blockchain B without worrying if the lane between them exists." ([London 2024](https://ethglobal.com/events/london2024/prizes/chainlink); [Sydney](https://ethglobal.com/events/sydney/prizes/chainlink))
- London and Sydney add: "there will be bonus points given to projects that use Chainlink CCIP together with other Chainlink services in a meaningful way." ([London 2024](https://ethglobal.com/events/london2024/prizes/chainlink))
- From Brussels 2024 the CCIP track adds "Use our CCIP Local Simulator to speed up your development on your local Hardhat, Foundry or Remix network, then use our Faucet ..." and the encouraged list reads "Chainlink Data Feeds, Chainlink Data Streams, Chainlink VRF, and Chainlink Proof of Reserve". ([Brussels](https://ethglobal.com/events/brussels/prizes/chainlink); [ETHOnline 2024](https://ethglobal.com/events/ethonline2024/prizes/chainlink); [Bangkok](https://ethglobal.com/events/bangkok/prizes/chainlink))
- "Connect the World with Chainlink": "Build something awesome using Chainlink! Anything that came from the Chainlink Documentation counts - using Price Feeds, Data Streams, PoR, VRF, Automation or Chainlink Functions!" with "bonus points given to projects that use multiple Chainlink services in a meaningful way." ([Sydney](https://ethglobal.com/events/sydney/prizes/chainlink))
- Cannes 2025 and New York 2025 rename the CCIP track to "Best usage of Chainlink CCIP and/or CCT" and add: "This track purely focuses on implementations that make sense in a multi-chain world and use CCIP and/or CCT standard to enable seamless interoperability." The workshop that season was "Create Cross-Chain Tokens with CCT Standard". ([Cannes 2025](https://ethglobal.com/events/cannes/prizes/chainlink); [New York 2025](https://ethglobal.com/events/newyork2025/prizes/chainlink))

### 2.3 November 2025 onward: CRE replaces Functions and Automation, then privacy

- Buenos Aires (the first CRE track, about three weeks after CRE's launch at SmartCon on 4 Nov 2025 per [CoinDesk](https://coindesk.com/web3/2025/11/04/chainlink-introduces-cre-to-fast-track-institutional-tokenization)): "Build your first workflow with CRE! Chainlink Runtime Environment (CRE) is an all-in-one orchestration layer that enables developers to build institutional-grade smart contracts [dash replaced] data-connected, compliance-ready, privacy-preserving, and interoperable across blockchains and traditional systems." Requirements: "Build, simulate, or deploy a CRE Workflow that's used as an orchestration layer within your project", "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent", "Demonstrate a successful simulation (via the CRE CLI) or a live deployment on the CRE network", "Be meaningfully used in your project", and "If you show us a successfully simulated workflow execution, our team will deploy it to the live CRE network for you during the hackathon!" The Connect track adds: "Note: Please use CRE instead of using Chainlink Functions or Automation. These products will be deprecated". CCIP loses its own track and becomes one item in Connect ("using CCIP, Price Feeds, Data Streams, PoR or VRF"). ([Buenos Aires](https://ethglobal.com/events/buenosaires/prizes/chainlink))
- Cannes 2026 adds "Best usage of Chainlink privacy standard": "For projects that use Chainlink Confidential Compute (early access) for private transactions and/or CRE's Confidential HTTP capability to build privacy-preserving workflows, where API credentials selected request and response data, and value flows are protected". ([Cannes 2026](https://ethglobal.com/events/cannes2026/prizes/chainlink))
- New York 2026 adds "Best usage of Chainlink Confidential AI Attester": "Use the provided Chainlink Confidential AI inference APIs", "Submit at least one confidential inference request using the sandbox environment", "Process sensitive inputs such as financial documents, identity information, compliance records, or other private data". The CRE track adds "You do NOT need to deploy it during the hackathon, simulation is fine!" ([New York 2026](https://ethglobal.com/events/newyork2026/prizes/chainlink))
- ETHOnline 2026 narrows to Confidential Workflows: "The workflow must register and use a confidential TEE handler, such as handlerInTee in TypeScript or cre.HandlerInTee in Go" and "A placeholder handler or an isolated example that does not contribute to the application will not qualify." It also ran a scored contest, "Automated Liquidation Protection Challenge", in which "Chainlink team will run the scenarios" after the deadline. ([ETHOnline 2026](https://ethglobal.com/events/ethonline2026/prizes/chainlink))

### 2.4 Mumbai 2026 (current)

Full verbatim text is in `track_ideas/00_current_tracks.md` ([Mumbai Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)). Differences from the nearest past text, found by comparing the pages above:

- **"Best workflow with CRE" ($1,500, one winner).** Opens "*Build your workflow with CRE!*" (the word "first" is gone). The same three "Your workflow should" bullets as Buenos Aires, Cannes 2026 and New York 2026. Dropped: the SDK paragraph ("Using the CRE SDK (available in Go and TypeScript) ...") and the offer to deploy a simulated workflow for the team. Kept in a new form: "It is NOT mandatory to deploy it during the hackathon, simulation is enough!" No Confidential HTTP or TEE requirement, and no separate privacy prize this time.
- **"Best use of Chainlink CCIP 2.0" ($3,500, two winners).** The description is the 2024 Brussels to Bangkok CCIP text almost word for word (same "Possible use cases", same Local Simulator sentence), with two edits: "dApps and web3 entrepreneurs" becomes "applications", and a new sentence: "CCIP 2.0 begins a new era for the digital asset industry by laying the rails for hundreds of trillions of dollars in capital from existing financial systems to flow onchain." The qualification sentence is the 2024 one, but the encouraged list now reads "Chainlink Runtime Environment (CRE), Chainlink Data Feeds, Chainlink Data Streams and Chainlink VRF" (CRE added, Proof of Reserve removed). There is no "and/or CCT" wording and no explicit requirement to use any CCIP 2.0 feature.
- No Chainlink workshop is on the Mumbai schedule, unlike Istanbul, ETHIndia 2023, Sydney, Brussels, Singapore, Bangkok, Cannes 2025, New York 2025, Buenos Aires and New York 2026, which each listed one on the Chainlink prize page ([event page](https://ethglobal.com/events/mumbai); past pages above).

---

## 3. Winners (81 projects with the Chainlink prize badge)

Source: showcase listings and project pages (links in the table). "Track" is the "Winner of" line on the project page. "Also won" lists the project's other prizes as shown on its page (pool prizes included).

| Event | Chainlink track won | Project | What it built (team's own tagline, trimmed) | Also won |
|---|---|---|---|---|
| ethonline2023 | Build Something Awesome | [RecurraPay](https://ethglobal.com/showcase/recurrapay-zc8e0) | Automate sending recurring payment on your favourite chain and across chains. | none |
| ethonline2023 | Best Use of CCIP/Functions | [AnyApe](https://ethglobal.com/showcase/anyape-mmh8x) | Gasless Cross-chain ApeCoin payment protocol implemented on an NFT marketplace. | ApeCoin DAO: Most innovative; Scroll: Pool Prize |
| ethonline2023 | Build Something Awesome | [GRP](https://ethglobal.com/showcase/grp-7sddn) | ZK trustless activity scoring protocol for gas reimbursement (Axiom) | Scroll: Pool Prize |
| ethonline2023 | not readable (bot check) | [Chaser](https://ethglobal.com/showcase/chaser-cte1q) | Graph subgraphs and the UMA optimistic oracle for investment strategies on historical DeFi data | unknown |
| istanbul | Chainlink Functions Winner | [MindShare](https://ethglobal.com/showcase/mindshare-asnw8) | A decentralized platform empowering professionals to monetize their expertise. | Scroll; Gnosis Chain; Worldcoin pool prizes |
| istanbul | Other Chainlink Services | [ActionForge](https://ethglobal.com/showcase/actionforge-09b09) | Brings Snapshot results onchain (Functions) and auto-executes attached transactions (Automation) | Scroll: Deploy on Scroll |
| istanbul | Chainlink CCIP Runner-up | [N-hub](https://ethglobal.com/showcase/n-hub-js2of) | Multi-chain EAS attestations over CCIP with Push notifications | WalletConnect pool; MetaMask: Best Dapp for Snaps 2nd |
| istanbul | Chainlink Functions Runner-up | [Open Gate](https://ethglobal.com/showcase/open-gate-23uyd) | Permissioned access for DAOs | Filecoin, WalletConnect, Scroll pools |
| istanbul | Chainlink CCIP Winner | [Donat3](https://ethglobal.com/showcase/donat3-0nsq3) | Donations in any token on any chain; orgs sign in with Google; CCIP to withdraw to Base | Scroll pool; Safe 4th; ENS: Best use of subname |
| ethindia2023 | Best use of Chainlink Functions; Best use of other Chainlink Services | [DailyGM](https://ethglobal.com/showcase/dailygm-8euj9) | A Permissionless Questing Protocol | none |
| ethindia2023 | Best use of Chainlink CCIP | [UNIFI](https://ethglobal.com/showcase/unifi-4vx0h) | One wallet, multichains, single-click cross-chain payments | Scroll: Deploy on Scroll |
| ethindia2023 | Best use of Chainlink CCIP | [Samvad](https://ethglobal.com/showcase/samvad-mpnxv) | Paid-reply social forum deployed cross-chain, with a two-way CCIP round trip | none |
| ethindia2023 | Best use of Chainlink Functions | [Moderatore](https://ethglobal.com/showcase/moderatore-shp5e) | Decentralised moderation mechanism | none |
| lfgho | Best Projects Built with CCIP and GHO | [Gho-Tip](https://ethglobal.com/showcase/gho-tip-i4t9o) | Tip anyone with GHO by link; claim on a chosen chain via CCIP | Family pool |
| lfgho | Best Projects Built with CCIP and GHO | [Bankless Wallet](https://ethglobal.com/showcase/bankless-wallet-yuhe8) | ZK passkey wallet; CCIP factory for multi-chain wallets; gas paid in GHO via price feeds | none |
| lfgho | Best Projects Built with CCIP and GHO | [GhoShare](https://ethglobal.com/showcase/ghoshare-nggb3) | iOS expense splitting settled in GHO with credit delegation and cross-chain transfers | Aave: Payments 1st; LFGHO Finalist |
| london2024 | Chainlink CCIP | [warp](https://ethglobal.com/showcase/warp-z5gzd) | Cross-chain vault that batches bridging and socializes costs (CCIP plus CCTP) | Arbitrum pool |
| london2024 | Connect the world with Chainlink | [BlocuSign](https://ethglobal.com/showcase/blocusign-a8dzd) | Multi-sig accounts that sign PDFs | Safe 4337 2nd; Chiliz, Arbitrum pools |
| london2024 | Chainlink CCIP | [Adaptum Finance](https://ethglobal.com/showcase/adaptum-finance-g7xxe) | Cross-chain DCA sized by a CBBI index (CCIP, Functions, CCTP, Hyperlane) | Arbitrum pool |
| sydney | Best use of Chainlink CCIP | [OpinionSwap](https://ethglobal.com/showcase/opinionswap-7i953) | Opinion trading with bets moved from Optimism to Base via CCIP | Unlimit; Worldcoin pool |
| sydney | Connect the World with Chainlink | [FitWifFrens](https://ethglobal.com/showcase/fitwiffrens-2zo8n) | Commitment device for fitness goals | Worldcoin: Best World ID Usage 3rd |
| sydney | Connect the World with Chainlink | [Rebalancor](https://ethglobal.com/showcase/rebalancor-f6pgy) | Automated portfolio rebalancing pools (Automation plus feeds) | none |
| sydney | Connect the World with Chainlink | [ConneKt](https://ethglobal.com/showcase/connekt-6y5hh) | Meet people, win raffles with NFT avatars | Mantle; Worldcoin pool |
| sydney | Best use of Chainlink CCIP | [CrossLink](https://ethglobal.com/showcase/crosslink-owxsp) | CCIP USDC transfers between Fuji and Sepolia | none |
| brussels | Best use of Chainlink CCIP | [Bazaara](https://ethglobal.com/showcase/bazaara-49peb) | Cross-chain marketplace standard: order flow routed over CCIP to a matching hub on Arbitrum | Blockscout pool |
| brussels | Connect the World with Chainlink | [Cukka](https://ethglobal.com/showcase/cukka-pzps8) | Send money to X and GitHub accounts without asking for addresses | none |
| brussels | Best use of Chainlink CCIP | [Ephi](https://ethglobal.com/showcase/ephi-1txc9) | Blinks anywhere on the web; one example is a CCIP USDC bridge | Zircuit, Neon EVM, Rootstock, Arbitrum, ApeCoin; Brussels Finalist |
| brussels | Connect the World with Chainlink | [Safe City](https://ethglobal.com/showcase/safe-city-qbgmm) | MetaMask Snap showing a contract's safety score before you interact | MetaMask and Linea 3rd; Blockscout pool |
| brussels | Best use of Chainlink CCIP | [Palmcivet Perpetuals](https://ethglobal.com/showcase/palmcivet-perpetuals-y90h4) | Perps on Base using liquidity on Arbitrum (CCIP, CCTP, Chainlink and Pyth prices, Local simulator) | Worldcoin pool |
| superhack2024 | Best use of Chainlink CCIP | [EthDrive](https://ethglobal.com/showcase/ethdrive-f47r7) | "Google Drive for your assets"; drag and drop moves assets across chains | 9 other prizes; Superhack Finalist |
| superhack2024 | Best use of Chainlink CCIP | [medX](https://ethglobal.com/showcase/medx-fdmxz) | Medical records and prescriptions | EAS 1st; Blockscout, Worldcoin pools |
| ethonline2024 | Best use of Chainlink CCIP | [Scaffold Chainlink](https://ethglobal.com/showcase/scaffold-chainlink-pwkxb) | Scaffold-ETH 2 extension and starter kit for CCIP | none |
| ethonline2024 | Connect the World with Chainlink | [ZkDNS](https://ethglobal.com/showcase/zkdns-0fo7m) | Privacy-preserving multi-chain domain resolver with ZK proofs | Envio, Tableland, Sign, Avail |
| ethonline2024 | Best use of Chainlink CCIP | [Link-proxy](https://ethglobal.com/showcase/link-proxy-92s2y) | Pay for AI APIs with LINK credits from several chains; Sign Protocol attests messages before finality | Sign pool |
| ethonline2024 | Best use of Chainlink CCIP | [EthBus](https://ethglobal.com/showcase/ethbus-39iua) | Batched L2 to L1 bridging over CCIP, cost shared by riders | none |
| ethonline2024 | Connect the World with Chainlink | [TrailMix Loop](https://ethglobal.com/showcase/trailmix-loop-7fkdr) | Trailing-stop vaults with Chainlink ETH/USD and Uniswap TWAP | none |
| singapore2024 | Connect the World with Chainlink | [Waste Protocol](https://ethglobal.com/showcase/waste-protocol-f1b3o) | Waste tracking and carbon credits priced with oracle data | MetaMask Linea; Worldcoin pool |
| singapore2024 | Best use of Chainlink CCIP | [TapPay](https://ethglobal.com/showcase/tappay-941om) | NFC card payments, any token on any chain (CCIP plus LayerZero) | none |
| singapore2024 | Best use of Chainlink CCIP | [C6credits](https://ethglobal.com/showcase/c6credits-onfcy) | NFC carbon credit offsetting; credits move between Celo and Base via CCIP | Worldcoin pool |
| singapore2024 | Connect the World with Chainlink | [DeReal](https://ethglobal.com/showcase/dereal-b9tsg) | Spontaneous photo moments triggered by smart contracts | none |
| singapore2024 | Best use of Chainlink CCIP | [DualSign](https://ethglobal.com/showcase/dualsign-q0exs) | Sender and recipient both sign (EIP-712) before tokens move, cross-chain via CCIP | none |
| bangkok | Best use of Chainlink CCIP | [ScrollX](https://ethglobal.com/showcase/scrollx-y8cx6) | Influencer onboarding with crypto rewards | none |
| bangkok | Best use of Chainlink CCIP | [Migrator ETHBelgrade](https://ethglobal.com/showcase/migrator-ethbelgrade-7x4pc) | L1 to Scroll token migration verified with L1SLOAD; token deployable as a CCT | Blockscout pool; Scroll L1SLOAD 2nd |
| bangkok | Best use of Chainlink CCIP | [ETHAY](https://ethglobal.com/showcase/ethay-echdf) | Browser extension that turns social platforms into a marketplace | Blockscout, Pyth, World pools |
| bangkok | Connect the World with Chainlink | [Miracam](https://ethglobal.com/showcase/miracam-cyiwp) | Photos minted with hardware-generated signatures | The Graph: Best Substream |
| bangkok | Connect the World with Chainlink | [PLANTY](https://ethglobal.com/showcase/planty-gybgw) | Tokenized rare plants | Rootstock; Morph |
| bangkok | Connect the World with Chainlink | [DeESG](https://ethglobal.com/showcase/deesg-2me7g) | ESG data from AI agents and an IoT node via Chainlink oracles, FHE sentiment | Scroll 5th |
| bangkok | Connect the World with Chainlink | [ETHVercel](https://ethglobal.com/showcase/ethvercel-inezg) | Deploy apps with ZK location validation, proof-of-deployment tokens | Blockscout, Chronicle pools |
| cannes | Connect the World with Chainlink | [Full Circle](https://ethglobal.com/showcase/full-circle-b091b) | Pay gas with USDC on many chains | Circle: Multichain USDC 2nd |
| cannes | Connect the World with Chainlink | [RainGuard](https://ethglobal.com/showcase/rainguard-vgfqo) | P2P parametric weather insurance | none |
| cannes | Best usage of Chainlink CCIP and/or CCT | [Romi](https://ethglobal.com/showcase/romi-kwa9t) | Auto-convert incoming tokens to a chosen token and chain (Graph, 1inch, CCIP, ENS L2) | 1inch: Utilize 1inch APIs |
| cannes | Best usage of Chainlink CCIP and/or CCT | [PrivacyLinks](https://ethglobal.com/showcase/privacylinks-y30gr) | Privacy-by-default browser wallet funded through Privacy Pools (demo used a simplified pool) | Cannes 2025 Finalist |
| cannes | Best usage of Chainlink CCIP and/or CCT | [CCTUP](https://ethglobal.com/showcase/cctup-cp7sa) | Indexing, record and replay of transactions across forked chains | Hedera 1st; The Graph 1st |
| newyork2025 | Best usage of Chainlink CCIP and/or CCT | [Defi Guardian](https://ethglobal.com/showcase/defi-guardian-223a5) | Community insurance: PYUSD premiums, policies on Hedera, votes mirrored and payouts sent via CCIP | none |
| newyork2025 | Connect the World with Chainlink | [OpenGrid](https://ethglobal.com/showcase/opengrid-68swe) | Smart meter data exchange | Flow pool |
| newyork2025 | Best usage of Chainlink CCIP and/or CCT | [AnyPay](https://ethglobal.com/showcase/anypay-t4xox) | Cross-chain payment settlement with AI analysis | Flow pool |
| newyork2025 | Connect the World with Chainlink | [Swap Pay](https://ethglobal.com/showcase/swap-pay-4hpe9) | EIP-5792 SDK pays a PYUSD bill from mixed tokens priced by Data Feeds | PayPal USD Grand Prize; NY 2025 Finalist |
| newyork2025 | Connect the World with Chainlink | [VoiceDoc](https://ethglobal.com/showcase/voicedoc-ayzev) | AI consults, NFT records, USDC escrow; Functions signs the visit summary | Circle: gas in USDC |
| buenosaires | Connect the World with Chainlink | [MultiSub](https://ethglobal.com/showcase/multisub-c1kh4) | Curated multisig with delegated liquidity management | Zircuit AA 2nd |
| buenosaires | Best workflow with Chainlink CRE | [AIMM](https://ethglobal.com/showcase/aimm-ajcan) | AI market makers for illiquid prediction markets; CRE as a private pricing environment | Pyth 2nd |
| buenosaires | Connect the World with Chainlink | [Saving Circles](https://ethglobal.com/showcase/saving-circles-bmgxr) | Onchain ROSCAs with weighted VRF draws and tradable seats | none |
| buenosaires | Connect the World with Chainlink; Best workflow with Chainlink CRE | [BMCP](https://ethglobal.com/showcase/bmcp-pfm11) | Sign on Bitcoin (Taproot, OP_RETURN), execute on EVM chains via CCIP | Citrea 1st; Buenos Aires Finalist |
| buenosaires | Best workflow with Chainlink CRE | [Wolfy](https://ethglobal.com/showcase/wolfy-r87tb) | EIP-7702 smart wallet with NFC hardware (HaLo, Firefly) and CRE | Octav; Zircuit |
| cannes2026 | Best usage of Chainlink privacy standard | [OpenCompliance](https://ethglobal.com/showcase/opencompliance-b89x9) | 4 CRE workflows run Sumsub, Chainalysis checks in TEEs; 7 contracts on Arc write ACE credentials | none |
| cannes2026 | Best usage of Chainlink privacy standard | [Meridian](https://ethglobal.com/showcase/meridian-1x2ef) | Treasury FX agent; CRE calls the strategy over Confidential HTTP every 60 s | none |
| cannes2026 | Connect the World with Chainlink | [DeltaFX](https://ethglobal.com/showcase/deltafx-9fewc) | FX options priced onchain (Garman-Kohlhagen); CCIP carries policy metadata Arc to Sepolia | none |
| cannes2026 | Best workflow with Chainlink CRE | [Flow Broker](https://ethglobal.com/showcase/flow-broker-ez5rr) | AI brokers paying per call via Arc x402; CRE triggers each 60 s cycle | Uniswap API 3rd |
| cannes2026 | Best workflow with Chainlink CRE | [ENShell](https://ethglobal.com/showcase/enshell-6t95y) | Agent firewall: Vault DON decrypts, Claude scores via Confidential HTTP, verdict written by KeystoneForwarder | Cannes 2026 Finalist |
| newyork2026 | Connect the World with Chainlink | [Nyx](https://ethglobal.com/showcase/nyx-prk3o) | Private perp DEX on Canton using Data Streams | Canton 1st |
| newyork2026 | Best workflow with CRE | [Vouch DeFi](https://ethglobal.com/showcase/vouch-defi-hfvw3) | Undercollateralized credit; CRE calls Confidential AI on income in a TEE; LoanVault releases only on attestation | Arc 1st; World ProveKit 2nd |
| newyork2026 | Best usage of Chainlink Confidential AI Attester | [Lineage](https://ethglobal.com/showcase/lineage-yrpx6) | Pharma dossier drafted in an enclave, citations checked, digests anchored | ENS pool |
| newyork2026 | Best Chainlink-Powered Upgrade (Continuity only) | [Thurman Protocol](https://ethglobal.com/showcase/thurman-protocol-q8iiy) | Automated secondary loan sales | Arc Continuity 1st |
| newyork2026 | Best workflow with CRE | [Canary](https://ethglobal.com/showcase/canary-kh3h7) | Depeg insurance priced by an onchain order book, settled from feed round history | NY 2026 Finalist |
| newyork2026 | Best Chainlink-Powered Upgrade (Continuity only) | [Immunity](https://ethglobal.com/showcase/immunity-eg56a) | Onchain immune system for AI agents | ENS; NY 2026 Finalist |
| newyork2026 | Connect the World with Chainlink | [WillowOne](https://ethglobal.com/showcase/willowone-7gjip) | Polymarket terminal fed by Data Streams; CRE job on window expiry | none |
| newyork2026 | Best usage of Chainlink Confidential AI Attester | [goHealthMe](https://ethglobal.com/showcase/gohealthme-us1an) | Health goal bounties paid privately in USDC | none |
| newyork2026 | Best workflow with CRE | [OpenPop](https://ethglobal.com/showcase/openpop-grkq2) | Invoice screening workflow (KYB, x402 USDA price, underwriting) gates a ProofGatedEscrow on Arc | Arc Advanced Stablecoin Logic 1st |
| ethonline2026 | Best Chainlink-Powered Upgrade (Continuity only) | [Karwan](https://ethglobal.com/showcase/karwan-yf694) | Trade marketplace with protected USDC payments | none |
| ethonline2026 | Best Confidential Workflow | [Deflow](https://ethglobal.com/showcase/deflow-4it5u) | Checkout escrow with two exits; Sumsub KYC and GoPlus KYT run in a Go handlerInTee | none |
| ethonline2026 | Automated Liquidation Protection Challenge | [AquaGhost Protocol](https://ethglobal.com/showcase/aquaghost-protocol-0hcss) | LP defense with private thresholds in handlerInTee, Uniswap v4, 1inch Aqua | none |
| ethonline2026 | Best Confidential Workflow | [Sovereign](https://ethglobal.com/showcase/sovereign-zgw7i) | Agent financial agreements; CRE evaluates private policy, Sepolia to Arc escrow | none |

Tallies from this table (this researcher's count):
- 31 CCIP-track winners, 8 "Best workflow with CRE" winners, 4 Functions winners, 28 "Connect" or "other services" winners, 7 privacy or confidential winners, 3 Continuity-only winners.
- All 8 CRE-track winners won at least one other prize or an ETHGlobal finalist slot: 6 won another partner prize (Pyth, Citrea, Octav and Zircuit, Uniswap, Arc twice, World) and 3 were finalists (BMCP, ENShell, Canary).
- 21 of 31 CCIP winners also won another prize, but mostly pool prizes; 4 were finalists (GhoShare, Ephi, EthDrive, PrivacyLinks).
- Only 1 of the 7 privacy or confidential winners (Lineage, an ENS pool prize) won anything else. Those tracks were won by Chainlink-only entries.
- No winner has yet used CCIP 2.0: it launched on 28 Sep 2026 ([Chainlink blog](https://chain.link/blog/introducing-ccip-2-0)), after the last Chainlink CCIP track (New York 2025) and after ETHOnline 2026 judging.

---

## 4. Why the winners won (Judgement, with cited examples)

### 4.1 CCIP tracks (2023 to 2025)

1. **CCIP carried a product's core flow, with contracts on both sides.** Palmcivet Perpetuals split the system into "The Vault and CCIPVaultManager contract on Arbitrum. The Positions, CCIPPositionsManager and AutomatedLiquidator on Base" ([Palmcivet](https://ethglobal.com/showcase/palmcivet-perpetuals-y90h4)). Bazaara routes order flow through a hub where "receivers double as applications that are directly referred to by the execution logic of the matching engine" ([Bazaara](https://ethglobal.com/showcase/bazaara-49peb)). Defi Guardian runs a six-contract, three-chain insurance loop in which policies, vote mirrors and payouts all travel over CCIP ([Defi Guardian](https://ethglobal.com/showcase/defi-guardian-223a5)). Compare [Remote Minter](https://ethglobal.com/showcase/remote-minter-oehth) (Brussels, no prize), which is Chainlink's own cross-chain NFT example: "Using a set of smart contract templates provided by Chainlink, I was able to mint on Base via Arbitrum."
2. **Two-way and multi-step messaging beat one-way bridging.** Samvad's description stresses a send "from source to destination chain which triggered another send from destination to source" ([Samvad](https://ethglobal.com/showcase/samvad-mpnxv)); Defi Guardian and Bazaara also round-trip. [InfiniteDAO](https://ethglobal.com/showcase/infinitedao-inqai) (Bangkok, no prize) used a one-way proxy registration over CCIP.
3. **Several Chainlink services, used for a reason.** London and Sydney promised "bonus points" for this. Palmcivet (CCIP, CCTP under CCIP, Chainlink plus Pyth prices, Local simulator), Adaptum (CCIP, Functions, CCTP), Bankless Wallet (CCIP plus price feeds for gas in GHO) all describe it.
4. **A security or trust property won repeatedly**: DualSign (both parties sign before tokens move cross-chain) ([DualSign](https://ethglobal.com/showcase/dualsign-q0exs)); Link-proxy (attest messages before finality to cut waiting) ([Link-proxy](https://ethglobal.com/showcase/link-proxy-92s2y)); Safe City (Connect track, contract safety score before signing); Defi Guardian (hack insurance). This is the team's lane.
5. **Developer tooling counts.** Scaffold Chainlink, a Scaffold-ETH 2 extension for CCIP, won a CCIP prize with no other prize ([Scaffold Chainlink](https://ethglobal.com/showcase/scaffold-chainlink-pwkxb)); CCTUP (indexing and replay) won CCIP plus Hedera 1st and The Graph 1st ([CCTUP](https://ethglobal.com/showcase/cctup-cp7sa)).
6. **The bar was sometimes low.** CrossLink (Sydney) is a plain USDC transfer between Fuji and Sepolia and still won 1 of 2 CCIP places in a 66-project event ([CrossLink](https://ethglobal.com/showcase/crosslink-owxsp); [Sydney showcase](https://ethglobal.com/showcase?events=sydney)). ScrollX's page barely mentions CCIP ([ScrollX](https://ethglobal.com/showcase/scrollx-y8cx6)). Judgement: in small or CCIP-light fields, a working, honest integration places; what the judges saw in the video is not visible here.
7. **Overclaiming did not help.** [CrossChainPort](https://ethglobal.com/showcase/crosschainport-5sota) (Bangkok) made CCIP its core ("Say goodbye to burns, wraps, and intermediaries") and won four other prizes but not Chainlink's. Judgement: a claim to bridge native assets "without wrapping" over CCIP is the kind of statement an interop team checks and discounts.

### 4.2 CRE tracks (Buenos Aires 2025 to New York 2026)

1. **The workflow's report is the only key that moves value.** ENShell: "those records can only be updated by the ChainLink CRE final forwarding call. Meaning nobody, not even me or the agent owner or the bot itself can edit those fields" ([ENShell](https://ethglobal.com/showcase/enshell-6t95y)). Vouch DeFi: "LoanVault handles conditional disbursement, releasing USDC only when a valid attestation and good standing exist" ([Vouch DeFi](https://ethglobal.com/showcase/vouch-defi-hfvw3)). OpenPop: "a ProofGatedEscrow contract ... holds investor USDC and releases it automatically when the screening proof is verified" ([OpenPop](https://ethglobal.com/showcase/openpop-grkq2)). Deflow: "The contract has only two exits: forward to the merchant on approval, or refund to the payer" ([Deflow](https://ethglobal.com/showcase/deflow-4it5u)).
2. **Real external systems, named.** Sumsub and Chainalysis (OpenCompliance), Claude (ENShell), a USDA price bought with x402 (OpenPop), Sumsub and GoPlus (Deflow), SOFR from the NY Fed and eSTR from the ECB (DeltaFX). Mocks appear only where access failed, and the teams say so.
3. **The newest Chainlink capability, adopted within weeks.** Cannes 2026 winners used the Vault DON and Confidential HTTP; New York 2026 CRE winners used Confidential AI in a TEE (Vouch) or a TEE workflow (OpenPop); ETHOnline 2026 winners used `handlerInTee`. Compare [Plumb](https://ethglobal.com/showcase/plumb-rkfp4) (New York 2026, no prize): a clean cron plus HTTP workflow reading NYC's HPD violation data and settling a rent escrow through "the Chainlink Keystone forwarder" and `ReceiverTemplate`, but using none of that season's new capabilities. It lost to three entries that did, or that were finalists.
4. **Evidence of a real write.** ENShell wrote through "the real Chainlink KeystoneForwarder on Sepolia (thanks to --broadcast)"; Sovereign used "CRE's MockKeystoneForwarder simulation path" plus "real Sepolia and Arc Testnet transactions" ([Sovereign](https://ethglobal.com/showcase/sovereign-zgw7i)). [Envelope](https://ethglobal.com/showcase/envelope-duqqa) (ETHOnline 2026, no prize) computed payroll in the enclave, but "Since Arc does not yet have a CRE Forwarder, the enclave computes and the backend submits the transaction", so the onchain write was not the workflow's.
5. **CRE winners are whole products that other sponsors also rewarded** (section 3 tallies: 8 of 8 won something else). The single Mumbai CRE winner will very likely be a strong all-round build, not a narrow demo.
6. **Copying the official templates did not win.** [Enclave Portfolio](https://ethglobal.com/showcase/enclave-portfolio-8ykd7) (ETHOnline 2026, no prize) was technically careful (it even notes Chainlink's template "has it commented out in the wrong argument slot") but its two workflows are the two official starter templates, rebalancing and liquidation protection ([ETHOnline 2026 resources](https://ethglobal.com/events/ethonline2026/prizes/chainlink)). The winners (Deflow, Sovereign) were products with compliance and agreement logic of their own. Similarly [Ketchup](https://ethglobal.com/showcase/ketchup-5cige) (Buenos Aires, no prize) produced a generic "riskScore (0 to 100)" that nothing enforced.
7. **Security framing is welcome.** ENShell (agent firewall) and Immunity (agent immune system, Continuity) won Chainlink prizes and finalist slots; Chainlink's own Convergence hackathon gave 1st places to SentinelCRE (anomaly detection triggering circuit breakers) and Aegis-Gate (yes or no compliance attestations) ([Convergence winners](https://chain.link/blog/convergence-hackathon-winners)). Agent firewalls are now crowded (ENShell, Immunity, Aegis, CRE Risk Router, Mandate Treasury), so the angle has to be something other than an LLM scoring an agent's intent.

### 4.3 Privacy and Confidential tracks (2026)

- Winners were narrow, Chainlink-only builds with a specific sensitive input: KYC documents and AML data (OpenCompliance, Deflow), a treasury strategy (Meridian), a confidential source document (Lineage), private agreement policy (Sovereign). 6 of 7 won no other prize.
- Judgement: when Chainlink publishes a feature-specific track, depth on that feature beats breadth. Mumbai has no such track, but "CCIP 2.0" in a title plays the same role (section 5).

### 4.4 Non-winner comparisons (all used Chainlink at the same events)

| Non-winner | Event | What it did | Nearest winner | Judgement on the gap |
|---|---|---|---|---|
| [Remote Minter](https://ethglobal.com/showcase/remote-minter-oehth) | Brussels | Chainlink's cross-chain NFT template | Palmcivet, Bazaara | template, no product |
| [InfiniteDAO](https://ethglobal.com/showcase/infinitedao-inqai) | Bangkok | Cross-chain DAO registration by proxy | Migrator, ETHAY | one-way message, thin |
| [CrossChainPort](https://ethglobal.com/showcase/crosschainport-5sota) | Bangkok | CCIP-linked liquidity pools; won 4 other prizes | ETHAY | overclaim on native bridging |
| [Ketchup](https://ethglobal.com/showcase/ketchup-5cige) | Buenos Aires | CRE risk score written to a contract | BMCP, AIMM, Wolfy | score with no enforcement |
| [Kondor](https://ethglobal.com/showcase/kondor-4bvt5) | Cannes 2026 | Encrypted ENS policies executed by CRE; won ENS 2nd | ENShell, Flow Broker | deep, but the judges preferred a security verdict path and a finalist; cannot tell more |
| [Plumb](https://ethglobal.com/showcase/plumb-rkfp4) | New York 2026 | Cron and HTTP workflow on NYC open data settles escrow | Vouch, OpenPop, Canary | no new capability that season |
| [Enclave Portfolio](https://ethglobal.com/showcase/enclave-portfolio-8ykd7) | ETHOnline 2026 | Two `handlerInTee` workflows | Deflow, Sovereign | mirrors the official templates |
| [Envelope](https://ethglobal.com/showcase/envelope-duqqa) | ETHOnline 2026 | Confidential payroll; backend submits the tx | Deflow | workflow does not own the write; payroll is crowded |
| [Mandate Treasury](https://ethglobal.com/showcase/mandate-treasury-r853v) | ETHOnline 2026 | Confidential payment firewall | Deflow | thin write-up, crowded lane |

### 4.5 What Chainlink's judges reward, in order (Judgement)

1. The Chainlink output is the gate on a real state change (money, permission, pause) and the README shows the exact contract line that enforces it.
2. The newest capability of the season, used for its intended purpose (CCT in 2025, CRE in late 2025, Confidential HTTP and TEE in 2026). At Mumbai that is CCIP 2.0.
3. A real external system or a real second chain, not a mock, with the honest gaps stated.
4. Code the judges can find quickly ("It must be possible for the judges to find the Chainlink use in your code" has been in the rules since 2023), plus evidence of execution (CLI simulation logs, broadcast tx hashes, CCIP Explorer links).
5. A complete product that other sponsors would also reward, for the general CRE prize. A deep, feature-specific build, for a feature-named prize.
6. Not a template, not a generic score, not an overclaim.

---

## 5. How the problem statements changed, and what Chainlink wants now (Judgement on top of the sourced texts in section 2)

| Period | Headline product | What the text asked for | Signal |
|---|---|---|---|
| Oct to Dec 2023 | CCIP and Functions | "meaningfully uses"; any service from the docs | product menu, breadth |
| Jan 2024 | CCIP with GHO | partner co-marketing | CCIP adoption push |
| Mar 2024 to Nov 2024 | CCIP | fixed text with four "Possible use cases"; Local simulator from Jul 2024 | CCIP as general messaging |
| Jul to Aug 2025 | CCIP and CCT | "implementations that make sense in a multi-chain world" | token issuers, CCT standard |
| Nov 2025 | CRE | "orchestration layer"; Functions and Automation "will be deprecated" | CRE replaces offchain compute |
| Apr to Sep 2026 | CRE plus privacy | Confidential HTTP, Confidential Compute, Confidential AI, `handlerInTee` | institutional privacy |
| **Nov 2026 (Mumbai)** | **CRE and CCIP 2.0** | **2024 CCIP text renamed "CCIP 2.0"; CRE text without the "first" or the privacy tracks** | **CCIP 2.0 launch showcase; CRE as a standing track** |

- Functions and Automation went from headline tracks (2023) to "please use CRE instead" (Buenos Aires onward). An idea that needs offchain compute must use CRE.
- CCIP was folded into "Connect the World" for a year (Buenos Aires to ETHOnline 2026) and comes back at Mumbai as its own track, renamed for a protocol version launched five weeks earlier ([Chainlink blog, 28 Sep 2026](https://chain.link/blog/introducing-ccip-2-0)). Judgement: the judges will be looking for the first credible CCIP 2.0 showcases; a v1-style token bridge satisfies the text but not the reason the track exists.
- Privacy is no longer a separate prize at Mumbai, but the CRE description still says "privacy-preserving", and Confidential HTTP and Confidential Workflows remain the capabilities Chainlink built bootcamps for in 2026 ([ETHOnline 2026 resources](https://ethglobal.com/events/ethonline2026/prizes/chainlink)).
- The CCIP encouraged list now names CRE first. Judgement: an entry that uses CRE to decide when to send a CCIP message is the combination Chainlink is advertising (its own `multi-chain-token-manager` and `stablecoin-ace-ccip` templates do exactly this: [cre-templates](https://github.com/smartcontractkit/cre-templates)).

### 5.1 Mapping current tracks to past tracks

| Mumbai track | Nearest past tracks | Status | What differs |
|---|---|---|---|
| Best workflow with CRE ($1,500, 1 winner) | Buenos Aires "Best workflow with Chainlink CRE" (3 x $3,000); Cannes 2026 (2 x $2,000); New York 2026 "Best workflow with CRE" (3 x $2,000) | **Repeated** (text nearly identical) | one winner instead of two or three; no "first"; no deploy-for-you offer; simulation explicitly enough |
| Best use of Chainlink CCIP 2.0 ($3,500, 2 winners) | Brussels to Bangkok 2024 "Best use of Chainlink CCIP"; Cannes and New York 2025 "Best usage of Chainlink CCIP and/or CCT" | **Changed** (same text, new protocol version in the title, CRE added to the encouraged list) | no CCT wording; no Proof of Reserve; no "bonus points" bullet; the protocol underneath now has CCVs, faster-than-finality and ACE hooks |
| (none) Connect the World, privacy standard, Confidential AI, Confidential Workflow | Buenos Aires to ETHOnline 2026 | **Dropped** at Mumbai | a Data Feeds, VRF or Data Streams entry now has to fit inside the CCIP track |

---

## 6. CCIP 2.0 and CRE facts a builder needs (sourced)

CCIP 2.0:
- Launched 28 Sep 2026: "CCIP 2.0 is now live and available to all institutions and digital asset issuers"; "The default Chainlink Committee Verifier consists of 16 independent, security-reviewed node operators"; issuers can run their own Cross-Chain Verifiers (CCVs) and both must sign; integrates the Automated Compliance Engine (ACE) with "allowlist, denylist, and sanctions screening"; issuers define "how much value they are comfortable moving faster-than-finality"; "A redesigned API, SDK, and CLI". Lombard adopts custom CCVs; Aave, Re and Maple use faster-than-finality ([Chainlink blog](https://chain.link/blog/introducing-ccip-2-0)). Secondary coverage ties the launch to the Kelp exploit ([Crypto Briefing, 28 Sep 2026](https://cryptobriefing.com/chainlink-ccip-2-launch-cross-chain-security/)).
- Message lifecycle: send, offchain verification, indexing of attestations, execution. New integrations use `ExtraArgsV3` (CCVs, executor, finality, gas limit, token args). Receivers implement `ccipReceive` and, optionally, `getCCVsAndFinalityConfig(sourceChainSelector, sender)` to declare required and optional CCVs and the allowed finality. Anyone can call `OffRamp.execute(...)` for manual execution ([CCIP message lifecycle](https://docs.chain.link/ccip/concepts/message-lifecycle.md)).
- The receiver's return values are `requiredCCVs`, `optionalCCVs`, `optionalThreshold` and `allowedFinalityConfig` (a `bytes4` from `FinalityCodec`) ([CCIP docs, send arbitrary data receiver](https://docs.chain.link/ccip/llms-full.txt)).
- Faster-than-finality: "Applications control finality at send time (via requestedFinalityConfig in ExtraArgsV3) and receive time (via allowedFinalityConfig on the destination receiver)". A legacy receiver "Cannot accept FTF traffic under any circumstances"; a V2 receiver built on `CCIPReceiver` defaults to full finality. Block depth is 1 to 65,535; `0x00000000` means full finality. A destination rejection leaves the message in FAILURE, "and the message can be re-executed once the receiver's finality configuration admits it" ([FTF for dApps](https://docs.chain.link/ccip/concepts/execution-latency/ftf-dapps)).
- Custom verifier: the CCV Starter Kit has an onchain contracts kit and an offchain Helm chart (verifier plus aggregator), with "a `local/` folder for experimentation only: a docker-compose stack". A policy hook is "an HTTPS endpoint that you build and run; the verifier calls it with each message as the last check before it signs, and the endpoint returns PASS or FAIL". Until a cell is onboarded "the default executor cannot fetch your attestation and a message sits at UNTOUCHED"; the documented test is a receiver that requires your CCV, then `ccip-cli manual-exec <src-tx> --verifiers grpcs://<your-aggregator-host>:443` ([CCV Starter Kit pages in the CCIP docs](https://docs.chain.link/ccip/llms-full.txt); [policy hook](https://docs.chain.link/ccip/ccv-starter-kit/how-to/add-a-custom-policy-hook); [test your setup](https://docs.chain.link/ccip/ccv-starter-kit/evm/test-your-setup)).
- ACE hooks: "A source preflight hook can reject an outbound transfer before lock or burn", and "A destination postflight hook can reject release or mint after the source transfer has started" ([CryptoSlate, 29 Sep 2026](https://cryptoslate.com/chainlink-ccip-2-0-lets-issuers-delay-delivery-after-a-cross-chain-transfer-starts/)).
- Tooling: Chainlink Local v0.3.0 (5 Oct 2026) supports "CCIP 2.0 (CCV-based) lanes, which is the protocol version live testnet and mainnet lanes run today" in Foundry and Hardhat 3, with `@chainlink/contracts-ccip` 2.0.0 ([chainlink-local releases](https://github.com/smartcontractkit/chainlink-local/releases)). The `ccip-tools-ts` CLI is at v1.16.1 (17 Oct 2026) ([ccip-tools-ts releases](https://github.com/smartcontractkit/ccip-tools-ts/releases)).
- Testnet lanes exist for Arc testnet, Hedera testnet, 0G Galileo, World Chain Sepolia, Unichain Sepolia, Ethereum Hoodi and the usual Sepolias; Whitechain is not listed ([CCIP testnet directory](https://docs.chain.link/ccip/directory/testnet)).

CRE:
- Triggers: Cron, HTTP, EVM Log, Solana Log; in simulation "triggers are manually selected and executed immediately" ([Triggers](https://docs.chain.link/cre/capabilities/triggers)). Minimum cron interval 30 seconds ([Service quotas](https://docs.chain.link/cre/service-quotas)). The simulator does a dry run of writes unless `--broadcast` is passed ([Simulating workflows](https://docs.chain.link/cre/guides/operations/simulating-workflows)).
- Confidential Workflows (CLI 1.29.0, 7 Aug 2026; TS SDK 1.18.0 `handlerInTee`), Confidential HTTP in production since 25 Feb 2026, Solana read and log trigger (19 Oct 2026), Ethereum Hoodi support (18 Sep 2026); current CLI 1.39.0 (21 Oct 2026). The release notes carry a Glamsterdam caution: "No action is required unless your workflow sets a gas limit" ([CRE release notes](https://docs.chain.link/cre/release-notes)).
- Confidential Workflows can be run "using the local simulator" without waiting for early access ([CRE TS docs](https://docs.chain.link/cre/ts/llms-full.txt)).
- Supported networks include Arc Testnet and World Chain Sepolia, not Hedera or Whitechain ([Supported networks](https://docs.chain.link/cre/supported-networks-ts.md)).
- Official starter templates (avoid copying them as the idea): circuit-breaker, prediction-market, stablecoin-ace-ccip, multi-chain-token-manager, tokenized-asset-servicing, confidential-workflows, keeper-bot, vault-harvester, verifiable-build and others ([cre-templates](https://github.com/smartcontractkit/cre-templates)).

---

## 7. Chainlink's own hackathon (outside ETHGlobal), for calibration

- Convergence: A Chainlink Hackathon (winners announced 6 Apr 2026): 554 submissions on CRE across DeFi and Tokenization, CRE and AI, Prediction Markets, Risk and Compliance, Privacy, and Autonomous Agents. 1st places included FlowVault (four CRE workflows scoring cross-chain signals, executing "with risk gates"), SentinelCRE (anomaly detection that triggers circuit breakers), Aegis-Gate (KYC, AML or accredited status as a yes or no onchain attestation), SSL (dark pool settlement with Confidential Compute) and InControl. The closing note praises systems that are "verifiable, automated, and capable of operating seamlessly across onchain and offchain environments" ([Convergence winners](https://chain.link/blog/convergence-hackathon-winners)).
- Judgement: Chainlink's internal judges reward the same three things as its ETHGlobal judges: a gate on execution, compliance or risk logic, and multiple workflows working together.
- Chainlink's general hackathon advice: a README that is "well-formatted and easy-to-follow", a video that proves the project works, and "some of the more technically-minded judges will appreciate the little things, such as incorporating tests" ([Chainlink blog, 2021](https://chain.link/blog/blockchain-hackathon-tips)).

---

## 8. Questions for Chainlink at Mumbai (no workshop is scheduled; ask at the sponsor desk or in the ETHGlobal partner channel on Thursday before 21:00)

1. CCIP 2.0 track: does a receiver that uses `getCCVsAndFinalityConfig` (required CCVs or faster-than-finality) count as "Best use of CCIP 2.0", or will a v1-style `ccipSend` integration be judged equally?
2. Which testnet lanes accept a block-depth `requestedFinalityConfig` today (for example Ethereum Sepolia to Base Sepolia or Arbitrum Sepolia), and what pool floor do the CCIP-BnM test token pools allow?
3. Can a hackathon team require its own CCV on a public testnet lane and execute with `ccip-cli manual-exec --verifiers`, using the CCV Starter Kit `local/` docker-compose stack, or must the cell be onboarded first?
4. Is ACE (preflight and postflight hooks, identity and credential registries) available on testnet for a fresh team without an access request, and on which chains?
5. CRE track: is a `cre workflow simulate --broadcast` run with tx hashes enough evidence, or do the judges want a live deployment? Is deploy access being granted at Mumbai?
6. Will a project entering both Chainlink tracks be judged separately in each, or placed in one?
7. Is Arc testnet getting a CRE Forwarder for writes (Envelope reported it missing in September), and is Hoodi preferred over Sepolia for CRE writes during the Glamsterdam window?

---

## 9. Gaps

- The Chainlink track of [Chaser](https://ethglobal.com/showcase/chaser-cte1q) (ETHOnline 2023) could not be read because of a bot check; the other 80 winners were read in full.
- Placements within a pool (1st versus 2nd) are not shown on most Chainlink "Up to N teams" prizes, so the table records the track only. Istanbul is the exception ("Winner" and "Runner-up").
- Videos and repos of winners were not reviewed. The analysis in section 4 rests on written descriptions.
- No Chainlink blog post announcing ETHGlobal winners for 2025 or 2026 events was found; a search returned only the prize pages and the Convergence winners page.
- Whether CCIP 2.0 testnet lanes accept faster-than-finality or custom CCVs from arbitrary senders is not confirmed in the docs; it is question 2 and 3 above.
