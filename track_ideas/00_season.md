# What is in season for ETHGlobal Mumbai (as of 31 October 2026)

Research date: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India (3 to 6 Nov). Team: three people, DeFi and smart contract security, Classic track, fresh build only.

**How to read this file.** Every line under "Sourced facts" carries a dated link. Lines marked **Judgement** are this researcher's opinion and are not sourced. Many web results this week came from aggregators that disagree with each other; where a figure rests on one weak source it is marked "(single secondary source)". Primary data pulled directly today: the DefiLlama stablecoin and hacks APIs, the npm registry for Anon-RPC, the Whitechain RPC endpoints, and the ETHGlobal Mumbai prize page (fetched twice, slowly, no bot check met). Existing repo notes (dated 26 to 28 Oct) were reused rather than re-researched and are cited by path.

**Fresh-build filter.** Continuity-only tracks are ignored throughout: Uniswap "Build with Uniswap" Continuity, World "[Cont] Best IDKit Use Case" and Continuity Agent Pass, 1inch "Aqua App - Continuity Track", 0G "Keep Building on 0G", Arc "Bring Your Project to Arc", Hedera "Built on Hedera (Continuity Track)", ENS "Integration into an Existing Project", Definitive "Most Creative Use" (Continuity), Arkiv "existing projects" and its Swarm bonus twin, EF "Best CROPS Upgrade to an Existing Project", and the Whitechain Continuity track ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes); `research_notes/EF tracks and Whitechain ideas/judging_criteria.md`).

---

## 0. The ten signals that matter most this week (Judgement)

| Rank | Signal | Dated anchor | Why it matters for a fresh 36 hour build |
|---|---|---|---|
| 1 | Largest theft in crypto history, done with EIP-7702 delegation | Binance, 29 Oct 2026, about $6.36B | Every judge and sponsor will have read about it by Thursday. A signing-policy or authorization-monitoring build has a live, falsifiable demo and sits on the team's audit skills |
| 2 | Glamsterdam held back over gas griefing | Hoodi postponed 22 Oct; EIP-8037/8038 Last Call ends 1 Nov | Core devs paused a fork to find which mainnet contracts break. A fork-replay measurement tool is the TARE recipe applied to a question the protocol is asking right now |
| 3 | ENSv2 is live on mainnet | 27 Oct 2026 | The "standard that just shipped" pattern, with a $7,000 ENS prize that requires ENSv2 to be central |
| 4 | Anon-RPC 0.4.0 reached npm, zkAPI is on mainnet | 28 Oct and 1 Oct 2026 | Fresh EF privacy artifacts during Devcon week; no finalist has yet routed reads through an anonymity network |
| 5 | Frame transactions and the alt mempool, plus transaction assertions | EIP-8141 scheduled for Hegota; EF assertions post 5 Oct | After the Binance drain, "what you authorized is enforced at inclusion" is the obvious story, and the EF pays $5,000 for alt mempool builds |
| 6 | Clear signing exists but is unverified | Trezor shipped ERC-7730 on 8 Sep with six protocols | Blind signing caused WazirX (2024) and the descriptor registry needs attestations; a security team can verify descriptors against bytecode |
| 7 | 1inch Aqua and SwapVM | Public launch 28 Jul 2026 | 4 of the last 26 finalists used Aqua; 1inch scores SwapVM higher |
| 8 | Stablecoin rails on brand-new chains | Arc mainnet 16 Sep, Whitechain mainnet 26 Oct | Sponsors fund payments, but supply is flat at about $300B, so the winning story is controls and verifiability, not growth |
| 9 | Agents get bounded, private accounts | Hedera Agent Accounts 13 Oct, World ID for Agents 18 Oct, zkAPI 1 Oct | Agent prizes are large (Hedera $6,500, World $5,000), but measured agent payment volume is tiny, so the angle has to be enforcement or privacy |
| 10 | Tokenized equities and RWA | Tokenized stocks about $37B onchain volume in Q3 | An open lane at the finalist level with Whitechain Tokenize, Hedera Tokenize and Uniswap CCA prizes behind it |

Fading or crowded, in brief: x402 pay-per-call wrappers and agent firewalls; prediction markets; memecoin launchpads; restaking and Bitcoin DeFi; UPI, INR and Aadhaar wrappers. Details in section 4.

---

## 1. Market narratives, October to November 2026

### 1.1 Security: a record year, and the week's dominant story

Sourced facts:
- 29 Oct 2026: about $6.36B left Binance wallets across ten chains; TRM calls it "the largest crypto theft on record" and attributes it to TraderTraitor (North Korea) "with high confidence" ([TRM Labs, 29 to 30 Oct 2026](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)).
- Mechanism on Ethereum: one transaction carried 50 EIP-7702 authorizations signed by the hot wallet for 50 consecutive nonces, so "one would still be valid when the transaction executed"; the wallet became a sweeper contract and was emptied about 3.5 minutes later. TRM assesses "a compromise of Binance's hot wallet signing infrastructure"; Binance has not published a root cause ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)).
- Chainalysis: attacker "submit[ted] valid signed authorizations that allowed a Binance hot wallet to run attacker-deployed code"; about $2.8B frozen; stablecoins swapped through UniswapX-style fills ([Chainalysis, 30 Oct 2026](https://www.chainalysis.com/blog/binance-exploit-latest-findings-and-response/); [Axios, 29 Oct 2026](https://www.axios.com/2026/10/29/binance-cyberattack-crypto-heist)).
- Freezes came from Tether, Circle, Ripple, World Liberty Financial and Arbitrum's Security Council ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)).
- Vendor mitigations already published: reject unexpected 7702 authorizations and chain ID 0, treat a batch over a nonce range as compromise, allowlist delegate contracts, monitor hot-wallet delegations ([Hacken](https://hacken.io/insights/binance-hack/); [Fireblocks](https://www.fireblocks.com/blog/binance-hack-eip-7702); [Hypernative](https://www.hypernative.io/insights/blog/inside-the-largest-crypto-theft-of-all-time-the-6-3b-binance-hot-wallet-drain)). No EIP change to 7702 was found.
- DefiLlama hacks dataset, pulled 31 Oct: 322 incidents in 2026 totalling $8.73B, or $2.37B excluding Binance. By quarter: Q1 $168M, Q2 $818M, Q3 $1.25B, Q4 so far $6.50B. Largest: Binance $6.36B (29 Oct, key leaked via infrastructure), Bitget $387M (24 Sep, hot wallet key), Liquid Network $320M (6 Sep, unbacked cross-chain mint), Drift $295M (1 Apr, proxy upgrade hijack), Kelp $293M (18 Apr, cross-chain message spoofing), Tectonic $124.5M (30 Aug, donation attack), COLDCARD $116M (31 Jul, weak key generation), Ledger supply chain $93M (9 Oct) ([DefiLlama hacks API](https://api.llama.fi/hacks); [DefiLlama hacks](https://defillama.com/hacks)).
- Drift: attackers spent six months building trust with contributors before draining about $285M in 12 minutes; TRM links it to North Korea ([TRM Labs, Apr 2026](https://trmlabs.com/resources/blog/north-korean-hackers-attack-drift-protocol-in-285-million-heist)).
- Kelp: "2026's biggest crypto exploit" at the time, rsETH stranded across 20 chains ([CoinDesk, 19 Apr 2026](https://www.coindesk.com/tech/2026/04/19/2026-s-biggest-crypto-exploit-kelp-dao-hit-for-usd292-million-with-wrapped-ether-stranded-across-20-chains)); secondary reports say about $10B left DeFi that weekend ([KuCoin flash, single secondary source](https://www.kucoin.com/news/flash/defi-users-withdraw-10-billion-after-292m-kelpdao-exploit)).
- Bitget, 24 Sep 2026: $387M, "year's largest" until Binance ([PYMNTS, Sep 2026](https://www.pymnts.com/cryptocurrency/2026/bitget-suffers-years-largest-crypto-hack-as-losses-top-387-million/)).
- Ledger confirmed an unauthorized hardware implant in a device sold through reseller CryptoBilis; about $93M from about 315 wallets ([Crypto Times, 12 Oct 2026](https://www.cryptotimes.io/2026/10/12/ledger-cryptobilis-hack-explained-93m-stolen-wallets-tampered/)).
- Q2 2026 was the most-hacked quarter by DeFi incident count, about 70 exploits ([The Defiant](https://thedefiant.io/q2-2026-most-hacked-quarter-defi-70-exploits-746m)).
- OpenClaw self-hosted agents exposed users to theft; CertiK warned on 31 Mar 2026 (secondary: [Let's Data Science](https://letsdatascience.com/news/openclaw-exposes-users-to-crypto-theft-aad10137); [Blockeden, Mar 2026](https://blockeden.xyz/blog/2026/03/12/openclaw-lobster-ai-gateway-web3-security-crisis/)).

**Judgement.** This is the strongest in-season narrative for this team. The 2026 losses are about signing infrastructure, keys, supply chains, cross-chain messages and accounting, not classic reentrancy (DefiLlama classes "Reentrancy" at $0 for 2026). Builds that make a signer refuse, a delegation visible, or an exit possible without the team will read as timely. Avoid anything that looks like an exploit kit; the framing must be defensive and the demo must use the team's own test wallets.

### 1.2 Stablecoins and payments

Sourced facts:
- Total stablecoin supply (all pegs) was $300.6B on 31 Oct 2026, down from a $317.1B peak on 17 May 2026 and below $305.5B on 1 Nov 2025 ([DefiLlama stablecoin API](https://stablecoins.llama.fi/stablecoincharts/all); [DefiLlama stablecoins](https://defillama.com/stablecoins)).
- Crypto card spending hit a record $748.7M in July 2026, the fifth straight monthly gain; stablecoin neobanks topped $1B in monthly flows ([The Defiant](https://thedefiant.io/news/tradfi-and-fintech/crypto-card-volume-hits-748-7m-in-july-a-fifth-straight-monthly-gain-paymentscan)).
- GENIUS Act: regulators missed the 18 Jul 2026 deadline for final rules ([Crowdfund Insider, Jul 2026](https://www.crowdfundinsider.com/2026/07/292568-the-genius-act-deadline-passes-without-final-stablecoin-rules-from-us-regulators/)); agencies ran five rulemakings in ten weeks in spring 2026 ([Cahill, 5 May 2026](https://www.cahill.com/publications/client-alerts/2026-05-05-five-rulemakings-in-ten-weeks-inside-the-genius-act-implementation-sprint/_pdfx/2026-05-05-five-rulemakings-in-ten-weeks-inside-the-genius-act-implementation-sprint.pdf)); the Act takes effect by 18 Jan 2027 at the latest ([Arnold & Porter resource center](https://www.arnoldporter.com/en/perspectives/topics/the-genius-act-and-stablecoin-regulation-resource-center)). No final rule was found as of 31 Oct.
- CLARITY Act (market structure): cleared Senate Banking 15 to 9 on 14 May 2026 ([ThinkAdvisor, 14 May 2026](https://www.thinkadvisor.com/amp/2026/05/14/long-stalled-crypto-bill-wins-key-senate-committee-vote/)); a first floor cloture vote was set for 15 Sep ([Crypto Briefing](https://cryptobriefing.com/senate-clarity-act-vote-tuesday/)). Outcome not found; treat as unverified.
- MiCA: the transitional period ended 1 Jul 2026 with no extension ([Coinpaprika citing ESMA](https://coinpaprika.com/news/mica-transitional-period-ends-1-july-2026/)); USDT is not MiCA-authorised and EU venues restricted it ([Stablecoin Insider](https://stablecoininsider.org/micas-july-1-hard-deadline-is-here-what-changes-today-for-stablecoins-in-europe/)).
- Circle's Arc public mainnet opened 16 Sep 2026 with USDC as gas, Arc Studio (an AI coding agent that generates contracts and app code) and Arc App Kits ([The Block, 16 Sep 2026](https://www.theblock.co/news/ecosystems/2026-09-16-circle-launches-arc-mainnet-blackrock-and-visa-among-validators-mints-10-billion-arc-tokens-415250)).
- Stripe and Paradigm's Tempo went to mainnet with the Machine Payments Protocol ([Bankless, Mar 2026](https://www.bankless.com/read/news/stripe-deploys-tempo-blockchain-to-mainnet-introduces-machine-payments-protocol.md)).
- Whitechain L2 mainnet (chain 1875) has been live since 26 Oct 2026 (`research_notes/EF tracks and Whitechain ideas/whitechain.md`); today's probe returned block 51,398,769 at 2026-10-31 04:34 UTC on mainnet and block 11,824,875 on Sepolia ([rpc.whitechain.io](https://rpc.whitechain.io); [rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io)). Prizes are judged on Sepolia.

**Judgement.** Payments are in season because three Mumbai sponsors pay for them (Whitechain, Arc, Hedera), not because the market is expanding: supply has been flat for a year. A payment build should carry a mechanism a judge can check (a refusal, a cap, a proof) rather than a growth pitch. Arc and Whitechain cannot share one settlement path cheaply, so pick one.

### 1.3 AI agents and agent payments

Sourced facts:
- TRM measured about $52.7M across 198.9M x402 settlements on Base, Solana and Polygon since May 2025; agent-driven volume has stayed at "roughly USD 5,000 to 11,000 a month" and the agentic share of screened commerce is bounded at 0.6% to 7.5% ([TRM Labs, 9 Sep 2026](https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain)).
- ERC-8004 (Trustless Agents) launched on Ethereum mainnet in the last week of January 2026 ([The Block](https://theblock.co/post/387345/ethereum-ai-agentic-economy-mainnet); [CoinDesk, 28 Jan 2026](https://www.coindesk.com/markets/2026/01/28/ethereum-s-erc-8004-aims-to-put-identity-and-trust-behind-ai-agents)).
- World ID 4.0 announced 17 Apr 2026 ([World](https://world.org/blog/announcements/world-id-full-stack-proof-of-human)); AgentKit beta tied World ID to x402 in March ([The Register, 17 Mar 2026](https://www.theregister.com/2026/03/17/worldcoin_identity_ai_agents_whatever/)); on 18 Oct 2026 World bundled the World ID app, World ID for Zoom and World ID for Agents into a suite for banks ([The Block, 18 Oct 2026](https://www.theblock.co/news/ecosystems/2026-10-18-world-launches-world-id-suite-banks-418869)).
- Hedera Agent Accounts: "programmable, non-custodial spending accounts" with caps, per-transaction limits and payee allowlists in smart contracts, x402-compatible; limited partner testnet Q4 2026, mainnet target Q2 2027 ([ChainCatcher, 13 Oct 2026](https://www.chaincatcher.com/en/article/2295860)). Hedera announced x402 support in February 2026 ([Hedera blog](https://hedera.com/blog/hedera-and-the-x402-payment-standard/)).
- zkAPI is live on Ethereum mainnet: USDC credits in a vault, Groth16 proofs authorize metered calls so payment and identity cannot be linked; use cases include AI agents and blockchain RPC; stated limits are "the lack of network anonymity, and privacy leakage via prompt contents" ([EF blog, 1 Oct 2026](https://blog.ethereum.org/en/2026/10/01/introducing-zkapi)).
- 0G Private Computer passed 400B inference tokens and 27M TEE attestations as of 5 Oct 2026 (sponsored post: [The Block, 5 Oct 2026](https://www.theblock.co/sponsored/2026-10-05-0g-private-computer-passes-400-billion-tokens-as-compute-finance-goes-live-417714)).
- Among finalists, agents were the primary tag of 16 of 63 in 2026, and about 16 of 53 used x402 (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** Agents are in season for sponsor money (Hedera x402 $6,500, World Agent Pass $5,000, 0G iAI $5,000, Arc consumer agent $3,000) and out of season for originality. The open seam is where agents meet the security narrative: an agent whose delegation cannot be widened, or whose payments are private (zkAPI plus Anon-RPC). A guard alone is now the sixth of its kind.

### 1.4 Prediction markets

Sourced facts:
- Kalshi recorded $19.03B of weekly contract volume for 5 to 11 Oct 2026; Polymarket US trade volume nearly tripled in six weeks; the platforms report volume differently and should not be summed ([Defirate, 12 Oct 2026](https://defirate.com/news/kalshi-hits-record-19-billion-week-as-polymarket-us-triples-fall-trade-volume/)).
- The CFTC and DOJ sued Arizona, Connecticut and Illinois in April 2026 over state regulation of prediction markets ([PBS NewsHour, Apr 2026](https://www.pbs.org/newshour/amp/politics/federal-government-sues-three-states-for-trying-to-regulate-prediction-markets); [Fortune, 4 Apr 2026](https://fortune.com/2026/04/04/feds-sue-3-states-for-trying-to-bring-kalshi-and-polymarket-under-more-control)).
- Finalists: 5 of 40 (Sep 2025 to Feb 2026), then 7 of 53 in 2026 (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** The market is booming and the hackathon lane is saturated. No Mumbai track names prediction markets. Only use one as plumbing (OddsFlow used Seer markets inside an Aqua strategy).

### 1.5 Perps and onchain trading

Sourced facts:
- Hyperliquid's builder-deployed (HIP-3) markets topped $62B in May 2026 and pushed Hyperliquid to a record share of global perps ([The Block, 3 Jun 2026](https://www.theblock.co/news/markets/2026-06-03-hyperliquid-record-share-global-perps-market-hip-3-tops-62-billion-monthly-volume-403384)); a later tracker shows $64.7B in the last 30 days, 26.7% of Hyperliquid volume (undated tracker: [CoinPerps](https://www.coinperps.com/learn/hyperliquid-hip-3-statistics)).
- 1inch opened Aqua to all users on 28 Jul 2026 across 13 EVM chains; tokens stay in the LP's wallet until a fill ([Decrypt, Jul 2026](https://decrypt.co/374533/1inchs-shared-liquidity-layer-aqua-goes-live)).
- Drift (Solana's largest perps venue) lost about $285M on 1 Apr 2026 (see 1.1).

**Judgement.** Perps venues and perps-in-hooks are crowded (UniPerp, Nox, Hubble). The sponsor-backed trading lane at Mumbai is Aqua and SwapVM (1inch $5,000) and Definitive Flash orders ($2,500 fresh), where a security team can add hard limits that the strategy itself enforces.

### 1.6 RWA and tokenization

Sourced facts:
- Tokenized stocks and ETFs did over $37B of onchain volume in Q3 2026 (single secondary source citing Dune: [SpendNode, Oct 2026](https://www.spendnode.io/blog/tokenized-stocks-etfs-37b-q3-volume-october-2026/)); tokenized-stock holders reached about 82% of onchain RWA holders ([Crypto Briefing citing The Block Research](https://cryptobriefing.com/tokenized-stocks-82-percent-rwa-holders/)).
- Headline RWA totals for mid-2026 conflict, from about $22B to over $43B depending on what is counted ([Eco guide, May 2026](https://eco.com/support/en/articles/15002235-rwa-tokens-2026-guide); [KuCoin, Jun 2026](https://www.kucoin.com/blog/th-rwa-tokenization-market-43-billion)). Treat as "large and growing", not a number.
- Uniswap's Continuous Clearing Auction launched in November 2025 with Aztec's sale ([The Block](https://www.theblock.co/post/378864/uniswap-continuous-clearing-auctions)), reached the Uniswap web app in February 2026 ([Uniswap blog, 28 Jan 2026](https://blog.uniswap.org/token-auctions-are-coming-to-the-uniswap-web-app)) and got no-code creation in June 2026 ([ChainCatcher](https://www.chaincatcher.com/en/article/2273518)).
- RWA was a primary tag for 0 finalists in 2025 and 2 in 2026 (explorador.pt, Kura); no finalist has built invoice financing (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** In season in markets, nearly empty at the finalist table, and funded at Mumbai by Whitechain Tokenize (which names invoice financing), Hedera "Tokenize Anything with Hedera Studios" ($5,000) and Uniswap (CCA is in scope). Kura (Tokyo finalist, Uniswap 1st, ENSv2 3rd) shows the shape: a physical asset, a CCA, and a rule a bot cannot game.

### 1.7 Privacy

Sourced facts:
- Devcon 8 tracks include "Privacy & Consent", "Security", "Applied Cryptography", "Permissionless Networks" and "Open & Verifiable Stack"; speakers include Roger Dingledine ([devcon.org](https://devcon.org/)).
- EF privacy artifacts shipped this quarter: zkAPI on mainnet (1 Oct), Anon-RPC 0.4.0 on npm (28 Oct, see section 2); the EF names private reads and writes, Kohaku and the IPTF as initiatives (`research_notes/EF tracks and Whitechain ideas/ef_goals_and_gaps.md`).
- Chainlink planned Confidential Compute early access through CRE in early 2026 and general access later in 2026 ([Chainlink blog](https://chain.link/blog/chainlink-confidential-compute)); general access was not confirmed.
- Zcash rose more than tenfold in 2025 as investors bet on privacy ([DL News](https://www.dlnews.com/articles/markets/zcash-surges-tenfold-as-investors-bet-on-privacy-as-ban-looms/)).
- Among finalists, privacy as a primary tag fell from 18% (late 2023) to 5% (2026) but survives as a built-in property: TEE attestation, keys on device, client-only wallets (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** Privacy is in season with this event's judges (EF Access Layer, Devcon week) and as a property of another product, not as a standalone mixer or dark pool.

### 1.8 Bitcoin DeFi

Sourced facts:
- BTCfi TVL was about $7B in April 2026, down from a $9.1B peak in October 2025, with Babylon holding most of it (low-confidence blog sources: [Blockeden, 28 Apr 2026](https://blockeden.xyz/blog/2026/04/28/bitcoin-backed-stablecoin-economy-babylon-sbtc-tbtc-exsat-programmable-collateral/); [Blockeden, 22 Jan 2026](https://blockeden.xyz/blog/2026/01/22/btcfi-reality-check-bitcoin-l2-tvl-decline-babylon-dominance/)).
- No Mumbai sponsor names Bitcoin ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)).

**Judgement.** Out of season for this event.

### 1.9 Restaking

Sourced facts:
- EigenLayer production slashing went live on 17 Apr 2026 (low-confidence: [Blockeden, 18 Apr 2026](https://blockeden.xyz/blog/2026/04/18/eigenlayer-avs-slashing-activation-15b-restaking-reality-check/)); the liquid restaking sector slumped as incentives dried up ([The Defiant](https://thedefiant.io/news/defi/ethereum-liquid-restaking-sector-slumps-as-incentives-dry-up)).
- The Kelp rsETH exploit (18 Apr 2026) is the year's restaking event (see 1.1).

**Judgement.** Fading, no sponsor. Only useful as a case study for cross-chain message verification.

### 1.10 Consumer apps

Sourced facts:
- Card spend records (see 1.2) and tokenized equities (see 1.6) are the consumer flows that grew in 2026.
- Pump.fun's seven-day token graduation rate fell to 0.26% in mid-June 2026 and Solana daily fees fell about 84% from January to June (single secondary source: [KuCoin flash](https://www.kucoin.com/news/flash/solana-s-memecoin-activity-slows-impacting-network-fees)).
- Finalists with a good live experience and a light crypto core still place (Pomodoki, Accrue, Happy Hour) (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** Consumer polish helps the Usability score, but speculation-driven consumer apps are out of season.

### 1.11 L2s and interop

Sourced facts:
- The EF's Ethereum Interop Layer opened for public testnet use on 18 Nov 2025, with mainnet after audits ([The Block, Nov 2025](https://theblock.co/post/379355/ethereum-foundation-interop-layer-l2-ecosystem-feel-like-one-chain)); no mainnet launch was found.
- ENS scrapped its planned Namechain L2 and moved ENSv2 to L1 ([CoinDesk, 6 Feb 2026](https://www.coindesk.com/tech/2026/02/06/ethereum-s-ens-identity-system-scraps-planned-rollup-amid-vitalik-s-warning-about-layer-2-networks)).
- The EF asks L2s to pass the "walkaway" test so users can exit to L1 even under a malicious operator ([EF blog, 23 Mar 2026](https://blog.ethereum.org/en/2026/03/23/l1-l2-ethereum), via `ef_goals_and_gaps.md`).

**Judgement.** Generic bridging and chain abstraction are fading for this event (only Chainlink CCIP, $3,500, pays for it). The live angle is exits and verifiable cross-chain messages, which ties to Kelp and Liquid Network.

### 1.12 India context

Sourced facts:
- Devcon 8 runs 3 to 6 Nov 2026 at Jio World Centre, BKC; the page warns of Diwali season overlap ([devcon.org](https://devcon.org/)); Diwali is 8 Nov ([Crypto Briefing](https://cryptobriefing.com/devcon-8-mumbai-november-2026/)).
- Budget 2026 kept the 30% tax on crypto gains and the 1% TDS and added reporting penalties for exchanges and platforms ([Decrypt, Feb 2026](https://decrypt.co/356601/no-relief-for-crypto-investors-as-india-retains-current-crypto-tax-in-budget-2026)).
- The RBI favours CBDCs over stablecoins and warns of risks to monetary sovereignty ([Business Standard, 31 Dec 2025](https://www.business-standard.com/finance/news/rbi-cautious-on-crypto-assets-stablecoins-advocates-cbdcs-125123100867_1.html); [ThePrint](https://theprint.in/economy/adoption-of-stablecoins-could-pose-risk-to-monetary-sovereignty-rbi/2816056)). The finance minister said in October 2025 that nations "must prepare to deal with stablecoins" ([Vision IAS summary of The Hindu, 4 Oct 2025](https://visionias.in/current-affairs/upsc-daily-news-summary/article/2025-10-04/the-hindu/economy/nations-must-prepare-to-deal-with-stablecoins-finance-minister-sitharaman)).
- ARC, a rupee-pegged token from Polygon and Anq, was planned for Q1 2026 ([crypto.news, Nov 2025](https://crypto.news/india-launches-rupee-pegged-digital-asset-arc-with-polygon-and-anq/)); a tracker found no live supply or RBI confirmation by mid-2026 ([stablecoin dashboard](https://stablecoin-dashboard.pages.dev/stablecoin/arc-anq/)).
- India ranked first in Chainalysis's 2025 Global Crypto Adoption Index for the third straight year ([Crypto Briefing, Sep 2025](https://cryptobriefing.com/india-top-crypto-adoption-chainalysis-2025/)).
- Indian exchange security: CoinDCX confirmed a $15.99M USDT loss from retired wallets on 25 Oct 2026, days after its CEO called reports a "false alarm"; some user deposits had been sent to the compromised addresses ([The Block, 25 Oct 2026](https://theblock.co/news/business/2026-10-25-coindcx-confirms-16-million-loss-from-retired-wallets-days-after-ceo-called-breach-reports-a-false-alarm-431617)). DefiLlama lists WazirX (18 Jul 2024, $234.9M, "Signer Phishing") and CoinDCX (19 Jul 2025, $44.2M) ([DefiLlama hacks API](https://api.llama.fi/hacks)).
- Precedent: none of New Delhi 2025's ten finalists mentioned UPI, Aadhaar, INR or India, although at least 18 submissions used those terms; ETHIndia 2023's zkP2M placed because its Razorpay leg was proven with TLSNotary (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** The India hook that will land is security, not rails. WazirX (a multisig that signed what it could not see) and CoinDCX (deposits routed to dead, compromised wallets) are local stories carried by global mechanisms, which is the pattern that places. A UPI or INR ramp is fighting the RBI's stance, a crowded precedent and an unlaunched rupee token.

---

## 2. What Ethereum and the Mumbai sponsors just shipped or are about to ship

"A standard that just shipped" is a recurring finalist pattern (blobs one month after Dencun, EIP-7702 before wallets supported it, ERC-8004 directories, Aqua in three of Tokyo's eight finalists). Status below is as of 31 Oct 2026.

| Item | Status and date | Source | Hackathon implication (Judgement) |
|---|---|---|---|
| Fusaka | Mainnet activation scheduled 3 Dec 2025 with PeerDAS and blob-parameter-only forks; Whitechain mainnet runs Osaka opcodes such as CLZ, Sepolia does not | [Blockworks](https://blockworks.co/news/ethereum-fusaka-dec3-launch); `whitechain.md` | Compile Whitechain Sepolia contracts for `prague` |
| Glamsterdam | Live on Sepolia since 6 Oct 2026; Hoodi activation (26 Oct) postponed on ACDE #248 "to allow for further investigation of interactions of EIP-8037 with mainnet smart contracts"; no new date | [EF blog, 22 Oct 2026](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay) | Signal 2 |
| EIP-8037 and EIP-8038 | "State Creation Gas Cost Increase" (adds a separate state-gas dimension) and "State-Access Gas Cost Update"; both Last Call, deadline 2026-11-01 | [EIP-8037](https://eips.ethereum.org/EIPS/eip-8037); [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038) | A fork-replay tool that diffs contract behaviour under old and new gas rules is timely |
| ChainSecurity finding | Raised 13 Oct that the changes "could diminish existing safeguards against insufficient gas griefing exploits"; found 13 susceptible production contracts; rescheduling expected after Devcon | [Parameter, 23 Oct 2026](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/) | Do not publish victims; demo on the team's own contracts |
| Hegota scope | Meta EIP-8081 lists EIP-8141 frame transactions and EIP-7805 FOCIL as Scheduled for Inclusion, EIP-8250 keyed nonces and EIP-8272 recent roots as Considered; EF tier list puts 8141 at S; EIP-7906 transaction assertions "currently running with Frames on a public devnet"; timeline 2027 per secondary sources | `frame_tx_alt_mempool.md`; `ef_goals_and_gaps.md`; [EF Hegota EIPs, 7 Sep 2026](https://blog.ethereum.org/en/2026/09/07/protocol-hegota-eips) | Alt mempool builds use a standard that is scheduled but not live: the blob pattern |
| Transaction assertions | EF post: "A useful rule must come from independently approved user intent, a standing account policy or protocol logic"; asks wallet and protocol teams to come forward | [EF blog, 5 Oct 2026](https://blog.ethereum.org/en/2026/10/05/transaction-assertions) | Pairs directly with the Binance drain |
| EIP-7702 | Base led L2s with 4.37M type-4 transactions all-time and Ethereum L1 had 2.40M as of 27 May 2026; early studies linked a large share of delegations to sweeper contracts; now the vector in the largest theft ever | [growthepie](https://www.growthepie.com/answers/most-smart-account-activity-ethereum-l2); [Protos](https://protos.com/48-of-ethereum-eip-7702-uses-linked-to-crime-says-wintermute); TRM above | Authorization-policy tooling is suddenly mainstream |
| ENSv2 | "Today, ENSv2 is live on Ethereum mainnet"; per-name registries, scoped permissions, record linking via the permissioned resolver; name upgrades start the same day | [ENS blog, 27 Oct 2026](https://ens.domains/blog/post/ensv2-live-on-mainnet); [permissioned resolver docs](https://docs.ens.domains/ensv2/permissioned-resolver#use-cases) | ENS prize: ENSv2 "central to the product, not a cosmetic add-on", live demo link required |
| Uniswap v4 and CCA | CCA live since Nov 2025, web app auctions Feb 2026, no-code creation Jun 2026; Uniswap Foundation reports 700+ initialized v4 hooks | Section 1.6; [Uniswap Foundation](https://uniswapfoundation.org/blog/a-roadmap-for-programmable-liquidity) | Uniswap prize needs FEEDBACK.md and the feedback form |
| 1inch Aqua and SwapVM | Developer preview 17 Nov 2025; public launch 28 Jul 2026 on 13 chains | [Decrypt, Nov 2025](https://decrypt.co/349073/1inch-gives-developers-early-access-new-shared-liquidity-protocol-aqua); [Decrypt, Jul 2026](https://decrypt.co/374533/1inchs-shared-liquidity-layer-aqua-goes-live) | 1inch requires official contracts, onchain transfers in the demo, and real commit history |
| Chainlink CRE | Launched at SmartCon on 4 Nov 2025; Confidential Compute early access in early 2026, general access planned later in 2026 | [CoinDesk, 4 Nov 2025](https://coindesk.com/web3/2025/11/04/chainlink-introduces-cre-to-fast-track-institutional-tokenization); [Chainlink blog](https://chain.link/blog/chainlink-confidential-compute) | Mumbai CRE prize accepts a CLI simulation |
| Circle Arc and Arc Studio | Mainnet 16 Sep 2026; Arc Studio is the required starting point for every Arc prize | Section 1.2; `judging_criteria.md` | Arc's AI-builder requirement pulls against CROPS "open" claims |
| World ID 4.0, AgentKit | 4.0 on 17 Apr 2026; AgentKit in March; bank suite 18 Oct | Section 1.3 | World rewards "the minimum sufficient assurance" and a demonstrated denied path |
| Hedera x402 | x402 support Feb 2026; Agent Accounts announced 13 Oct, not on mainnet until 2027 | Section 1.3 | Mumbai track needs an x402 endpoint settling on Hedera, no human approval, a tx ID in the README |
| 0G | Private Computer and iAI credits live (sponsor-reported) | Section 1.3 | 0G says "Not wanted: generic chat wrappers" and needs a fallback that does not fake a decision |
| Arkiv | Prizes now published (they were "coming soon" on 26 Oct): "Mirror something Ethereum depends on" ($4,000), "Build on Arkiv (from scratch)" ($4,000), "Node tooling" ($2,000), Swarm bonus ($500); writes must hit Arkiv's current testnet with a user-visible read | [ETHGlobal Mumbai prizes, fetched 31 Oct](https://ethglobal.com/events/mumbai/prizes) | The mirror track lists function signatures, address labels and wallet ratings, which suits a security team |
| Whitechain mainnet | Live since 26 Oct; producing blocks today | Section 1.2 | Build and judge on Sepolia (chain 1874) |
| Anon-RPC 0.4.0 | `@anon-rpc/browser-harness`, `@anon-rpc/browser-extension-harness` and the new `@anon-rpc/harness-core` published 0.4.0 to npm on 2026-10-28 (previous: 0.3.3 on 13 Oct); `@anon-rpc/node-harness` is still not on npm; spec 0.4.0 adds `anonOptions.isolationKey` | [npm browser-harness](https://www.npmjs.com/package/@anon-rpc/browser-harness); [npm harness-core](https://www.npmjs.com/package/@anon-rpc/harness-core); `anon_rpc.md` | Updates the notes: isolationKey no longer needs a main-branch install; whether any worker honours it still needs checking at the EF workshop |
| Clear Signing (ERC-7730) | EF launch 12 May 2026; Trezor shipped it on Safe 7, Safe 5, Safe 3 and Model T on 8 Sep 2026 with descriptors from 1inch, Aave, Lido, Tether, LiFi and Hyperliquid, falling back to blind signing with a warning | [EF blog, 12 May 2026](https://blog.ethereum.org/en/2026/05/12/clear-signing-announcement); [Crypto Briefing, 8 Sep 2026](https://cryptobriefing.com/trezor-clear-signing-erc-7730/) | The registry asks experts to "review and attest"; nobody verifies descriptors against code yet |
| zkAPI | Live on mainnet, 1 Oct 2026 | Section 1.3 | Combine with Anon-RPC to cover the network-anonymity gap zkAPI itself names |
| ERC-8004 | Mainnet since late Jan 2026 | Section 1.3 | Plumbing now, not novelty |

---

## 3. What ETHGlobal judges rewarded at the last three events

Events: Lisbon 2026 (July, 10 finalists), ETHOnline 2026 (September, online, 8) and Tokyo 2026 (September, 8). The rows come from `research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2026.md`; the counts below are this researcher's tally from those rows, one project counted once per feature.

Sourced facts (from the catalogue and its showcase links):

| Feature among the 26 finalists | Count | Examples |
|---|---|---|
| Won no partner prize | 13 | Lean Silicon, Carte Bleue, Cordon, Petri, LeekDIYHardwareWallet, Patio Station, yohaku, Enconomy |
| World ID in the build | 9 | Hands Unchained, Glassbox402, explorador.pt, Kura, Takarabako, yohaku, Enconomy |
| ENS in the build (ENSv2 in at least 4) | 9 | ETH Arcade and watermark (ENSv2 access control and registries), Kura (ENS "Best Use of ENSv2" 3rd), yohaku |
| x402 at the core | 7 | Glassbox402, Cordon, OnchainRouter, OpenBook, Omamori |
| A device the team built or wired | 6 | Hands Unchained (robot arm), Lean Silicon (FPGA), Carte Bleue (bank card), LeekDIY (ESP32), ETH Arcade (Pi), Takarabako (kiosk) |
| Arc | 5 | Cordon, OnchainRouter, OpenBook, ETH Arcade |
| 1inch Aqua or SwapVM | 4 | ArcBook (1inch 1st), watermark (3rd), OddsFlow (1st), Takarabako |
| 0G TEE inference | 4 | KOLlateral, Hands Unchained, Lortnoc Tahc (all Lisbon) |
| Uniswap | 3 | TARE (v4 hook measurement), Kura (v4 hook plus CCA), KOLlateral (API) |
| RWA primary | 2 | explorador.pt, Kura |
| Prediction markets | 1 | OddsFlow (as plumbing) |
| Continuity entries | 4 | ethui, Happy Hour, Novi Corpus, Takarabako (irrelevant to a fresh build, noted for completeness) |

Stage lines that worked, quoted from showcase pages: TARE "96.74 bps quoted, 96.74 bps executed, to the wei" ([TARE](https://ethglobal.com/showcase/tare-ozced)); yohaku "That is the output of npm run verify, not a claim" ([yohaku](https://ethglobal.com/showcase/yohaku-m2d72)); OpenBook "reverts with SlaNotMet" ([OpenBook](https://ethglobal.com/showcase/openbook-8ngw6)); watermark caps any fill at 50 ETH ([watermark](https://ethglobal.com/showcase/watermark-68230)); LeekDIYHardwareWallet: "anything the device cannot display clearly is refused" ([LeekDIYHardwareWallet](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg)); Carte Bleue: "The private key never leaves the card" ([Carte Bleue](https://ethglobal.com/showcase/carte-bleue-ftuuc)).

The judging format is unchanged: 4 minute demo, 3 minute Q and A, scored on Technicality, Originality, Practicality, Usability and WOW Factor with no published weights ([Mumbai details](https://ethglobal.com/events/mumbai/info/details)).

**Judgement.** The three most recent rooms rewarded, in order: (1) a contract or device that refuses something on stage; (2) a replayable number; (3) a sponsor primitive that shipped within the previous few months (Aqua, ENSv2 on testnet, Arc). Half the finalists won no partner prize, so the finalist demo can be built for generalists while the README targets the sponsor. Security-flavoured refusals (LeekDIY, Omamori, watermark, OddsFlow) make up 4 of the last 26 finalists, which favours this team.

---

## 4. Fading or overcrowded

| Theme | Evidence | Status for Mumbai (Judgement) |
|---|---|---|
| x402 pay-per-call wrappers, agent routers and agent firewalls | About 16 of 53 finalists in 2026 used x402; 7 of the last 26; guards already include ENShell, Immunity, Aegis402, Omamori, Cordon and maki; measured agent volume is $5,000 to $11,000 a month ([TRM, 9 Sep 2026](https://www.trmlabs.com/trm-tech-blog/whos-actually-paying-measuring-ai-agent-payments-onchain); finalist report) | Crowded. Use x402 only as plumbing for a Hedera or Whitechain Scale entry |
| Prediction markets | Kalshi record week, but 7 of 53 finalists in 2026 and heavy state litigation (section 1.4) | Crowded, no Mumbai track |
| Memecoin launchpads and speculative consumer apps | Pump.fun graduation 0.26% in June 2026 (single secondary source, section 1.10) | Fading |
| Restaking | Outflows after slashing and the Kelp exploit (section 1.9) | Fading, no sponsor |
| Bitcoin DeFi | TVL down from its October 2025 peak, no sponsor (section 1.8) | Out of scope |
| UPI, INR ramps, Aadhaar wrappers | 0 of 18 such New Delhi 2025 submissions placed; RBI prefers CBDCs; ARC rupee token not confirmed live (section 1.12) | Avoid as the core claim |
| Private payroll, stealth payment links, dark pools, shielded swaps | SQUIDL, POAPrivacy, GrimSwap, Zeroinch, PonyHof, Nox as finalists; Manila and Warden as partner winners (finalist report; `judging_criteria.md`) | Crowded unless the twist is structural |
| AI trading and yield agents, chat wallets | Nimble, YieldSeeker, DeFlow, KagamiAI; Omma Cash, Sippy, cellfi (finalist report) | Crowded |
| Generic L2 bridging and chain abstraction | EIL still on testnet; only CCIP pays at Mumbai (section 1.11) | Fading for this event |
| Generic LLM wrappers | 0G's prize text: "Not wanted: generic chat wrappers" (`judging_criteria.md`) | Explicitly unwanted |

---

## 5. What this means for a fresh build by this team (Judgement)

- The best overlap of market season, protocol timing and judge taste is **signing and authorization safety after the Binance drain**: a wallet or signer policy that refuses nonce-range 7702 authorization batches or unknown delegates, enforced through frame transactions and EIP-7906-style assertions on the alt mempool devnet (EF alt mempool prize), or through clear-signing descriptors verified against bytecode (EF CROPS App). It reuses the existing Truthsign and Tripwire proposals in `reports/ETHGlobal finalist ideas 2023 to 2026.md` and gives them a headline judges already know.
- **Gas-rule regression measurement** (EIP-8037/8038 on a mainnet fork, the team's own vulnerable test contracts, a replayable diff) is the most original timely idea found this week. Its prize fit is weaker (CROPS App as a Secure dev tool, or finalist-only), so treat it as a finalist bet.
- **ENSv2** is the cheapest "just shipped" add-on, but only if per-name registries or scoped permissions carry the core rule (for example, which ENS-named counterparties may fill, as watermark did on testnet).
- **Arkiv "Mirror something Ethereum depends on"** is a natural third partner slot for any signing-safety build: mirror function signatures, address labels or verified descriptors into Arkiv so the wallet's decoder has no single gatekeeper.
- Every idea here must start from public libraries and starter kits only, with Continuity tracks ignored.

Questions this research raises for the workshops (input to the workshop pass):
- EF (Thu 17:00): Does any merged Anon-RPC worker honour `isolationKey` in 0.4.0? Do the alt mempool devnets accept 7702-style authorization lists inside frame transactions, and does EIP-7906 work there today? Would a 7702 authorization-policy tool count as a CROPS App?
- ENS (Thu 16:00): Which ENSv2 features are callable on mainnet versus Sepolia this week, and is a permissioned-resolver rule "central" enough?
- Arkiv (Thu 16:00): Is a mirror of ERC-7730 descriptors or function signatures in scope for "Mirror something Ethereum depends on", and what freshness is expected?
- 1inch (Thu 17:30): Are custom SwapVM opcodes allowed under "official Aqua/SwapVM contracts must be used"?
- Uniswap Foundation (Thu 16:30): Does a CCA-based RWA sale with a hook-enforced rule score as "integrate any part of the Uniswap stack"?

---

## Gaps and caveats

- No final GENIUS Act rule, no CLARITY Act floor result, no October 2026 RWA total, no October 2026 perps share and no BTCfi figure newer than April 2026 could be confirmed; those lines are marked or omitted.
- Binance figures are one to two days old and may be revised; Binance has not published a root cause.
- The DefiLlama derivatives endpoint is paywalled, so perps shares rely on press and trackers.
- The Chainlink section of the Mumbai prize page was cut off in today's fetch; Chainlink requirements come from the 26 Oct notes.
- Finalist counts in section 3 are this researcher's tally from self-reported showcase text, not judge notes.
