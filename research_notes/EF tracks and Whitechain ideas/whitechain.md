# Whitechain at ETHGlobal Mumbai (Nov 2026): prizes, chain facts, privacy deployability, and private business payment ideas

Research date: 2026-10-26. "Own probe" means a direct JSON-RPC or explorer API call made by the researcher on 2026-10-26 against the public Whitechain endpoints; the cited URL is the endpoint that was queried.

## Q1. Which ETHGlobal event is happening now or next, and is Whitechain a sponsor? What exactly are its prizes?

### Takeaway
The next ETHGlobal hackathon is ETHGlobal Mumbai, 5 to 7 November 2026, at the Jio World Convention Centre (BKC, Mumbai), held alongside Devcon 8 India. Whitechain is a confirmed sponsor with a $15,000 pool split across four tracks (Operate $5,000, Tokenize $4,000, Scale $3,000, Continuity $3,000). The Operate track explicitly says payroll "on its own" will not place, which matters a lot for a "private payroll" idea.

### Cited Findings

Event facts
- ethglobal.com/events lists ETHGlobal Mumbai (Mumbai, India, Nov 5 to 7, Thu to Sat, IRL hackathon, "Apply to Attend") and Pragma Mumbai (Nov 6) as the only upcoming October to December 2026 items; October items (New Delhi happy hour Oct 22, Vadodara/Kochi/Bengaluru coworks, Ethereum Stablecoin Summit at Money20/20 Oct 19) are meetups, not hackathons. No December 2026 hackathon is listed. ([ETHGlobal events](https://ethglobal.com/events))
- Event JSON on the Mumbai page: start 2026-11-05, end 2026-11-07, timezone Asia/Kolkata, venue "Jio World Convention Centre, Jio World Centre, G Block, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400098". FAQ text: "Taking place alongside Devcon 8 India in the same venue ... Build something new or take an existing project further through the Continuity Track!" ([ETHGlobal Mumbai](https://ethglobal.com/events/mumbai))
- Pre-event schedule: virtual team formation and brainstorming 2026-10-27 17:00 IST; beginner's workshop 2026-10-29 19:30 IST. ([ETHGlobal Mumbai](https://ethglobal.com/events/mumbai))
- A "Whitechain Workshop" (organization: Whitechain, 20 minutes, Workshop Room 2) is scheduled for 2026-11-05 11:00 UTC (16:30 IST). ([ETHGlobal Mumbai](https://ethglobal.com/events/mumbai))
- Whitechain is listed in the sponsor data as package "Core", totalPrizeAmount 15000, website https://whitechain.io/. ([ETHGlobal Mumbai](https://ethglobal.com/events/mumbai))
- Prize ledger on the prize page: World $12,500; 1inch $7,000; 0G $15,000; Uniswap Foundation $15,000; Arc $15,000; Hedera $15,000; Arkiv $15,000 (details "coming soon"); Whitechain $15,000; Ethereum Foundation $15,000; ENS $10,000; Definitive $5,000; Chainlink $5,000. ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- ETHGlobal rule: "You can apply for a maximum of 3 Partner Prizes for your project ... If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1" partner. FAQ also warns that submissions relying entirely on AI "may not be eligible for partner prizes or finalist consideration." ([ETHGlobal Mumbai](https://ethglobal.com/events/mumbai))

Whitechain sponsor blurb (verbatim)
- "Whitechain is The Onchain Economy Layer: the core for onchain business to launch, operate and scale on. An EVM Layer 2 on the OP Stack, supported by developer tooling and a partner ecosystem, with mainnet arriving in November." ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)). Note: this conflicts slightly with the docs, which say Mainnet has been live since 26 October 2026 (see Q3).

Whitechain prize 1, verbatim: "Operate · Stablecoin Payments for Business", $5,000 (1st $2,500, 2nd $1,500, 3rd $1,000) ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Description: "Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it. Build a payment flow a real merchant could plug into their app or store, and show it working end to end with test stablecoins on Whitechain. It is plain EVM, so use any tooling you like."
- Ideas to start from: "A drop in checkout for online stores with order webhooks and an onchain receipt"; "Payment links and invoices for remote studios, contractors and cross-border teams billing global clients, with due dates and reminders"; "Subscriptions and recurring billing with permit based pulls and cancel anytime"; "Refunds and partial refunds a merchant issues in one click, with a record the customer can check".
- What we want to see: "A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines"; "Both views in the demo, the merchant and the paying customer"; "Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use".
- Won't place: "A pay button that sends a plain transfer, tipping jars, bill splitters, or custodial bridges into a local currency token. Payroll, escrow and revenue splits on their own."

Whitechain prize 2, verbatim: "Tokenize · Real World Finance on Whitechain", $4,000 (1st $2,500, 2nd $1,500) ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Description: "Model real-world asset (RWA) lifecycles and compliance logic onchain. Build an issuance, settlement or lifecycle flow for a real world asset on Whitechain, where every payment happens in USDT, and show it working end to end with test stablecoins."
- Ideas to start from: "Tokenized bonds or notes with an investor allowlist, coupon payments in USDT and repayment at maturity"; "Invoice financing where a business tokenizes an invoice, a buyer funds it at a discount and settlement happens automatically on the due date"; "Repo or short term lending agreements with delivery versus payment, where the asset and the stablecoin move in one transaction"; "Trade finance flows where importer, exporter and bank each confirm their step before funds are released".
- What we want to see: "Real transfer rules enforced in the contract, such as allowlists, transfer restrictions, maturity or settlement conditions, not just a token with a UI on top"; "A clear issuer, investor or business user and at least one full lifecycle step in the demo, from issuance to payment or settlement".
- Won't place: "A token with a mint button and no rules, or ownership NFTs where nothing is enforced onchain." and "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize."

Whitechain prize 3, verbatim: "Scale · Payments Nobody Notices", $3,000 (1st $2,000, 2nd $1,000) ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Description: "Businesses scale when their customers never have to learn crypto, and when software can pay software. Build a payment flow on Whitechain where the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on."
- Ideas to start from: "Gasless checkout where the merchant covers gas, using permit or transferWithAuthorization (EIP 3009) and your own relayer"; "Checkout with an embedded wallet or smart account from any provider that supports Whitechain Sepolia (chain ID 1874)"; "Pay per request APIs where an AI agent pays a business in USDT over x402, settled on Whitechain through a facilitator you run".
- What we want to see: "A payer flow with zero crypto steps visible, shown in the demo"; "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it".
- Won't place: "Flows where the payer still signs a transaction that costs them gas, or AI chats that never actually pay anyone."

Whitechain prize 4, verbatim: "Continuity · Bring Your Product to Whitechain", $3,000 (1st $1,500, 2nd $1,500), "only available to Continuity Track participants" ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Description: "Already have a product with users? Add Whitechain to it during the hackathon. Accept USDT payments, move a feature onchain or deploy your contracts on Whitechain. It can be a live product or an open source repo, either works."
- What we want to see: "Real progress made this weekend, like a new feature or a new payment flow. A nicer UI on what you already had is not enough"; "Real users or a real business behind the product count in your favour".
- Won't place: "Projects that only repackage something built before the hackathon."

Qualification requirements, identical for Operate, Tokenize and Scale (verbatim) ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
1. "Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer"
2. "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count"
3. "A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here"
4. "A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations"
5. "A demo video of 2 to 4 minutes that shows each party involved"
6. "A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing"
- Continuity adds: "Proof of your starting point, for example a dated commit from before the hackathon or the page of your earlier submission" and "A short "before and during" part in your README so judges can tell the old code from the Whitechain work added at this hackathon".
- "Good to know before you build" (all tracks): "All tracks, contracts, and test tokens (WBT, USDT) run strictly on the Whitechain Sepolia testnet and carry no monetary value. They are playground fuel for technical prototyping. Prize distribution is managed directly by ETHGlobal in USDC (or equivalent) under standard event eligibility and compliance guidelines."
- Links given: Docs https://docs.whitechain.io, Faucet https://faucet.testnet.whitechain.io, Explorer https://explorer.testnet.whitechain.io.
- No numbered judging criteria are published for Whitechain; the "What we want to see" and "Won't place" lists are the de facto rubric. ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))

Ethereum Foundation prizes at the same event (summary; relevant to combining) ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Best Use of Anon-RPC $5,000 (2,500/1,500/1,000); qualification: "Your app routes its RPC reads through Anon-RPC by default." Listed ideas include "new network" and "new harness".
- Best use of the Frame Transaction Alternative Mempool $5,000 (2,500/1,500/1,000); qualification requires "a link to your admitted transaction on the devnet explorer, or code that submits one" (EF-run devnets, not Whitechain).
- Best CROPS App $3,500 (2,000/1,000/500), marked "(tbc: final review pending)". Ideas include "a payment, messaging or social app where your server learns nothing about who talks to whom". Judging: "works end to end in the demo"; "depth of the lead property: structural (works without you) beats cosmetic (a setting)"; "the other three still hold, or trade-offs are stated in the README"; "UX: would someone use it without knowing what CROPS means"; "could it ship after the hackathon". Qualification: FOSS license, README section titled CROPS with one or two lines per letter (C, O, P, S), demo video "(3 minutes max)" showing the lead property, "No third-party trackers or analytics in the client", keys and personal data stay on device or README explains why not. "One EF prize per project ... you will be placed in at most one."
- Best CROPS Upgrade to an Existing Project $1,500 (Continuity Track only); "Only the new work done during the hackathon is judged." Resources include Kohaku privacy SDK (https://github.com/ethereum/kohaku).

### Inferences
- A plain "private payroll" app is a poor fit for Whitechain's Operate track as written ("Payroll ... on their own" will not place), and also does not map to Scale (Scale is about a customer or agent paying a business). Payroll can still appear as the "what happens after" part of a business payments product (for example contractor invoicing, then private payout), or it can be pitched mainly to EF CROPS with Whitechain as the settlement chain.
- The "Tokenize" explicit ideas (invoice financing, investor allowlists, trade finance with multi-party confirmation) align best with "compliance logic onchain", which is the natural home for privacy-plus-compliance designs (ZK allowlists, selective disclosure).
- A single 2 to 3 minute demo video satisfies both Whitechain (2 to 4 minutes) and EF CROPS (3 minutes max).
- Because max 3 partner prizes apply and Whitechain's four tracks count as one partner, a team can enter Whitechain + EF + one more sponsor.

### Gaps
- No numeric weighting or judging panel for Whitechain prizes is published.
- The prize page does not say how hackers obtain the required prize USDT (0xcedf...); see Q3 and Q6 for the conflict with the docs' USDT address.
- Arkiv's prizes were "coming soon" at research time.

## Q2. If not ETHGlobal, where else does Whitechain run hackathons or grants?

### Takeaway
Whitechain is an ETHGlobal Mumbai sponsor, so this is secondary. Outside ETHGlobal, the main funding route is the Whitechain Foundation Builders Program (up to $300K per team, milestone-based). No other 2026 Whitechain-run hackathon was found.

### Cited Findings
- Builders Program: "up to $300K per eligible team, released in tranches as milestones are verified, together with technical, marketing, and ecosystem support." Three tracks: Builders Program (new builds), Strategic Ecosystem Deals (up to $300K for live projects that migrate), Chain Expansion Support (sized to users, no exclusivity). Reviewers look at "teams that ship, users that stay, commitment to Whitechain, and verifiable on-chain metrics"; target response 14 business days; not available to sanctioned or restricted jurisdictions. ([Whitechain docs, For project partners](https://docs.whitechain.io/build/ecosystem/for-partners))
- The Builders page also advertises "subsidized Hacken audit coverage", "Two weeks SLA for application decision", and ecosystem surfaces: DEX, Bridge, "Distribution Platform", "Token Launch Platform", WB Soul ("On-chain identity"), Soul Drop. ([Whitechain Builders](https://whitechain.io/builders))
- The August 18, 2026 relaunch press release (sponsored, Chainwire) describes a "distribution-first Ethereum Layer 2" and quotes Volodymyr Nosov (founder of W Group and WhiteBIT); it mentions "Day 1 primitives" (native DEX, oracle, bridge) and the Builder Program, and does not mention privacy, payroll, or hackathons. ([The Block press release](https://www.theblock.co/press-releases/whitechain-relaunches-as-w-groups-distribution-first-ethereum-layer-2-412097))
- Web searches for a Whitechain-run 2026 hackathon returned nothing relevant. ([search: "Whitechain hackathon 2026"; no Whitechain results], e.g. [ETHPrague 2026](https://ethprague2026.devfolio.co))

### Inferences
- A hackathon project that wins or places at Mumbai is a natural candidate for the Builders Program afterwards; the Builders criteria (shipping, verifiable on-chain metrics) match the "could this ship" style judging of both Whitechain and EF.

### Gaps
- No public list of past Whitechain hackathon winners or bounties was found.

## Q3. What is Whitechain technically, and what are the official developer resources?

### Takeaway
Whitechain (from the WhiteBIT / W Group ecosystem) is now an OP Stack Layer 2 settling on Ethereum, with WBT as the custom gas token, 1-second blocks, and a 5 gwei base-fee floor. The L2 Mainnet (chain ID 1875) went live on 26 October 2026 by migrating the legacy L1 state; the hackathon testnet is Whitechain Sepolia (chain ID 1874). The execution client is op-reth. It is not a BSC fork; the old L1 was a PoA go-ethereum fork.

### Cited Findings

Identity and history
- "Whitechain is an EVM-compatible Layer 2 blockchain built on the OP Stack, developed in strategic ecosystem alignment with WhiteBIT ... It settles on Ethereum via blob data availability and uses WBT (WhiteBIT Coin) as the native gas token." ([Whitechain docs, Introduction](https://docs.whitechain.io/learn/general/what-is-whitechain))
- Positioning: "a finance-focused Layer 2 for teams that build financial products: payment providers, fintechs, exchanges, asset-backed businesses, and infrastructure and oracle providers." ([Whitechain docs, Introduction](https://docs.whitechain.io/learn/general/what-is-whitechain))
- Previously "WB Network", rebranded as Whitechain (one source dates the rename to February 2024). ([GNcrypto](https://www.gncrypto.news/news/wb-network-rebrands-as-whitechain/))
- The legacy chain was described in WhiteBIT's GitHub as a Proof of Authority network built on a go-ethereum fork. ([whitebit-exchange/wbt](https://github.com/whitebit-exchange/wbt))
- Whitechain blog timeline: Jul 28 2026 "Whitechain Is Becoming an Ethereum Layer 2"; Jul 29 "WBT on L2: What Changes for Holders"; Jul 30 developer guide; Sep 8 "Whitechain Bridge Is Live on Public Testnet". ([Whitechain blog](https://whitechain.io/blog))
- Other entities named "Whitechain": searches surfaced only the WhiteBIT/W Group chain (plus unrelated jewelry "white chain" results); no competing crypto project with that name was found. ([search results incl. Decrypt PR](https://decrypt.co/375870))

Network parameters
- Mainnet: chain ID 1875 (0x753), L1 settlement Ethereum mainnet, gas token WBT 18 decimals, 1s blocks, "Live since 26 October 2026"; L2 genesis block 50961390 (one after last legacy L1 block 50961389), balances/contracts/addresses carried over. RPC https://rpc.whitechain.io, WS wss://rpc.whitechain.io/ws, explorer https://explorer.whitechain.io, legacy read-only RPC https://legacy.rpc.whitechain.io. Mainnet WS serves newHeads and logs; "newPendingTransactions is not available". ([Whitechain docs, Mainnet](https://docs.whitechain.io/learn/network/mainnet))
- Whitechain Sepolia: chain ID 1874 (0x752), L1 Ethereum Sepolia (11155111), short name "WCH Sepolia", RPC https://rpc.testnet.whitechain.io, WS wss://rpc.testnet.whitechain.io/ws (supports newHeads, logs, newPendingTransactions), explorer https://explorer.testnet.whitechain.io (Blockscout), faucet https://faucet.testnet.whitechain.io, bridge https://bridge.testnet.whitechain.io; Flashblocks not enabled. ([Whitechain docs, Testnet](https://docs.whitechain.io/learn/network/testnet))
- Public RPC limits (both networks): 50 requests/s per IP, burst 500, up to 100 calls per batch, 429 with Retry-After: 1; no API key; partner tier 200 rps. No third-party RPC providers yet. ([Whitechain docs, Network reference](https://docs.whitechain.io/learn/network/reference))
- Own probe: both endpoints answered web3_clientVersion "op-reth/v2.6.1-e16bffa1/x86_64-linux"; eth_chainId 0x752 (testnet) and 0x753 (mainnet); eth_gasPrice 5.001 gwei; mainnet head about block 51,014,485 (about 53,000 blocks after L2 genesis, consistent with a 26 Oct 2026 launch). ([rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io), [rpc.whitechain.io](https://rpc.whitechain.io))
- Fees: L2 execution fee plus OP Stack L1 data fee; minimum base fee 5 gwei; EIP-1559 elasticity 6, denominator 100; block gas limit 40,000,000; no operator fee. Example: WBT transfer 21,000 gas = 0.000105 WBT; minimal contract deploy 117,683 gas = about 0.00059 WBT (docs use a hypothetical $50/WBT). GasPriceOracle predeploy at 0x420000000000000000000000000000000000000F. ([Whitechain docs, Network fees](https://docs.whitechain.io/learn/network/network-fees))
- Finality: soft confirmation about 1s (sequencer's word), safe up to about 30 min, finalized about 13 min after the batch lands on L1; canonical-bridge withdrawals at least 7 days on Mainnet, about 1 to 3 hours on testnet. Fault proofs are permissioned today; a Guardian can pause withdrawals; censorship resistance via forced inclusion through OptimismPortal "within the sequencing window, about 12 hours". ([Whitechain docs, Transaction finality](https://docs.whitechain.io/learn/network/transaction-finality))
- Admin: Mainnet roles are Safes on Ethereum (Proxy Admin Owner 0x5684...6eAd, Guardian 0x5918...eeE0, SystemConfig owner 0x8da4...23aF); batcher, proposer, challenger, unsafe block signer are EOAs. ([Whitechain docs, Network reference](https://docs.whitechain.io/learn/network/reference))

Tokens, bridges, wallets
- Token list (Sepolia): USDC (contract reports USDC.e, "Bridged USDC (Whitechain)") 0x5Eb541ba8A2DD841aF7864c3389162a23ddA8401, 6 decimals; USDT (contract reports USDT.e, "Bridged USDT (Whitechain)") 0xaa7962d073935D387e8d442DA1D7149C81388f46, 6 decimals; WWBT is the ERC-20 form of WBT. ([Whitechain docs, Token list](https://docs.whitechain.io/build/block-explorer/token-list))
- Portal bridge: centralized bridge operated by Whitechain for USDC, USDT, WBT, ETH between Ethereum, Tron and Whitechain; "the only route that connects Tron to Whitechain"; daily limits such as USDC 10,000/day and USDT 10,000/day; Mainnet Portal at bridge.whitechain.io "from 27 October 2026". OP Stack canonical bridge for other ERC-20s. ([Whitechain docs, Portal bridge](https://docs.whitechain.io/build/bridge/portal-bridge); [For project partners](https://docs.whitechain.io/build/ecosystem/for-partners))
- Wallets: MetaMask, Rabby, Reown AppKit; Safe recommended for treasury, chain prefixes "wch-sepolia:" and "wch:" (Mainnet "once Safe is deployed there"). ([Whitechain docs, Wallets](https://docs.whitechain.io/build/wallet/wallets))
- Reown: connect/sign/transact work, but Whitechain is not in Reown's Blockchain API, so embedded wallets (email/social login) "Login completes, transactions may fail", and swaps, on-ramp, ENS resolution and tx history are unavailable. ([Whitechain docs, Reown](https://docs.whitechain.io/build/dapps/connect-wallet-with-reown))
- Faucet: test WBT only, 0.5 WBT per 24h, GitHub account at least 30 days old, captcha, limits per wallet, IP and GitHub account. ([Whitechain docs, Faucet](https://docs.whitechain.io/learn/get-started/get-testnet-wbt); [Faucet](https://faucet.testnet.whitechain.io))

Developer resources
- Docs: https://docs.whitechain.io, with https://docs.whitechain.io/llms.txt and llms-full.txt for AI tools, and a "whitechain-dev" Agent Skill. Guides cover Remix, Hardhat, Foundry, viem, Next and Vite templates, Blockscout API indexing, proxy verification. ([Whitechain llms.txt](https://docs.whitechain.io/llms.txt))
- viem ships `whitechainSepolia` in `viem/chains` (and AppKit re-exports it); tested versions include viem 2.55.13, wagmi 3.7.6, @reown/appkit 1.8.23. ([Whitechain docs, Reown](https://docs.whitechain.io/build/dapps/connect-wallet-with-reown); [Network reference](https://docs.whitechain.io/learn/network/reference))
- GitHub org whitechain-labs: repos templates (Foundry, Hardhat, whitechain-dapp-nextjs, whitechain-dapp-vite, indexer-gas-tracker, indexer-token-dashboard, indexer-wallet, whitechain-token-lists), whitechain-bootstrap (genesis/rollup configs, updated 2026-10-26), node, whitechain-state-migration, bridge-contracts, skills, skills-mcp, viem, chains, chainlist, safe-singleton-factory. ([GitHub whitechain-labs](https://github.com/whitechain-labs))
- Both chains are registered in the ethereum-lists registry (Whitechain Sepolia 1874 and Whitechain 1875, native WBT). ([chainid.network](https://chainid.network/chains.json))
- Support channels: Discord https://discord.gg/7GwAXYmaW9, Telegram dev chat https://t.me/Whitechaindevs, X @whitechain_io. ([Whitechain Builders](https://whitechain.io/builders); [Introduction](https://docs.whitechain.io/learn/general/what-is-whitechain))

### Inferences
- Treat the ETHGlobal blurb "mainnet arriving in November" as stale; RPC and docs both show Mainnet producing blocks on 26 Oct 2026. Prizes are still judged on Sepolia only.
- The 50 rps per-IP public RPC limit is fine for a demo but can bite indexers, relayers or an Anon-RPC worker fleet; batching and Multicall3 (predeployed at 0xcA11...CA11) are the documented mitigations, or run your own op-reth node from whitechain-labs/node.

### Gaps
- Not verified: Blockscout mainnet explorer feature parity, and whether Safe UI already supports Mainnet (docs say "once Safe is deployed there", though own probe found Safe 1.3.0 and 1.4.1 singletons and factories on Mainnet).

## Q4. EVM version, precompiles, and ZK verifier deployability

### Takeaway
Whitechain Sepolia runs every OP Stack upgrade through Jovian from genesis (so Cancun and Prague/Isthmus EVM features are active, including EIP-7702, BLS12-381, KZG point evaluation and the P256 precompile), and own probes confirm BN254 ecAdd/ecMul/ecPairing return correct results. Groth16 (Circom/snarkjs, Semaphore, Privacy Pools style) and Noir/Barretenberg verifiers should deploy unchanged, subject to the standard 24,576-byte contract size limit. Mainnet additionally activates "Karst" (CLZ opcode works there but not on testnet).

### Cited Findings
- "Every OP Stack upgrade through Jovian is active from genesis." Mainnet and Sepolia share L2 fee parameters. ([Whitechain docs, Mainnet](https://docs.whitechain.io/learn/network/mainnet); [Network fees](https://docs.whitechain.io/learn/network/network-fees))
- rollup.json: testnet has regolith through jovian at time 0 and `karst_time: null`; mainnet has regolith through jovian at 0 and `karst_time: 0`; `osaka_time` and `interop_time` null on both. ([whitechain-bootstrap mainnet rollup.json](https://raw.githubusercontent.com/whitechain-labs/whitechain-bootstrap/main/mainnet/rollup.json); [testnet rollup.json](https://raw.githubusercontent.com/whitechain-labs/whitechain-bootstrap/main/testnet/rollup.json))
- "The chain maintains full EVM compatibility, so any contract or toolchain that works on Ethereum works on Whitechain without modification." ([Whitechain docs, Introduction](https://docs.whitechain.io/learn/general/what-is-whitechain))
- Own probe, both networks, via eth_call:
  - BN254 ecAdd (0x06) of G1+G1 and ecMul (0x07) of G1*2 return the same correct point (0x030644e7...cfd3, 0x15ed738c...a2c4).
  - BN254 ecPairing (0x08): empty input returns 1; e(G1,G2)*e(-G1,G2) returns 1; e(G1,G2)*e(G1,G2) returns 0 (correct pairing behavior).
  - modexp (0x05) 3^5 mod 7 = 5; sha256 (0x02) of empty = e3b0c442...b855.
  - KZG point evaluation (0x0a) and BLS12-381 pairing (0x0f) reject empty input with "PrecompileError" (present); BLS12-381 G1ADD (0x0b) of two infinity points returns 128 zero bytes (present); a non-existent address (0x13) returns "0x".
  - P256VERIFY (0x100, RIP-7212) returns 1 for a freshly generated valid secp256r1 signature on both networks.
  - PUSH0, TSTORE/TLOAD, MCOPY, BLOBBASEFEE opcodes execute on both networks.
  - CLZ (EIP-7939, Osaka) returns 0xff for clz(1) on Mainnet but "EVM error: NotActivated" on Sepolia.
  - An account whose code is the EIP-7702 delegation designator (0xef0100 + Multicall3 address) executes Multicall3 code on both networks (state-override test), and latest Sepolia headers carry `requestsHash`, consistent with Isthmus (Prague) semantics.
  - Contract creation returning 24,576 bytes succeeds and 24,577 bytes fails with "CreateContractSizeLimit" on both networks (standard EIP-170 limit).
  ([rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io); [rpc.whitechain.io](https://rpc.whitechain.io))
- Block gas limit 40,000,000 (both). ([Whitechain docs, Network fees](https://docs.whitechain.io/learn/network/network-fees))
- Whitechain's own proxy-verification example compiles with "v0.8.28+commit.7893614a, EVM cancun". ([Whitechain docs, Verify a proxy contract](https://docs.whitechain.io/build/deploy/verify-proxy-contracts))
- Execution client is op-reth (v2.6.1 observed; node guide pins op-reth v2.3.3 image by default); op-geth can be initialized from the same genesis. ([Whitechain docs, Node configuration](https://docs.whitechain.io/operate/run-a-node/configuration); [Network artifacts](https://docs.whitechain.io/operate/run-a-node/network-artifacts))

### Inferences
- Groth16 verifiers (snarkjs/Circom export, Semaphore v4, Privacy Pools/0xbow, Tornado-style mixers, zk-email style) only need BN254 0x06/0x07/0x08, all working; gas cost should match Ethereum (same EVM gas schedule per docs).
- Noir (Barretenberg UltraHonk) Solidity verifiers also rely on BN254 precompiles and should work; large generated verifiers can approach the 24,576-byte limit, so test early and keep optimizer on (general Noir experience, not Whitechain-specific).
- BLS12-381 and KZG precompiles open the door to BLS signature aggregation and blob-related tricks, but are not needed for typical hackathon ZK.
- P256VERIFY makes passkey (WebAuthn) smart accounts cheap, which directly serves the Scale track's "no seed phrase" requirement.
- Testnet lacks Karst: if a toolchain targets an Osaka EVM version and emits CLZ, contracts could work on Mainnet but fail on Sepolia. Safer to compile with `evm_version = "prague"` (or "cancun") for the Sepolia deploys that judging requires.
- Whitechain is not a geth or BSC fork today; it is a stock OP Stack chain with op-reth, so OP Stack tooling (viem op-stack actions, GasPriceOracle getL1Fee) applies directly.

### Gaps
- No documentation on whether Whitechain will track future OP Stack hardforks on testnet (to add Karst) before the hackathon.
- Exact gas for a Noir UltraHonk or Semaphore verify call on Whitechain was not measured.

## Q5. Can privacy tooling be deployed on Whitechain (Semaphore, Privacy Pools, Railgun-like, ERC-5564, Noir/Circom)?

### Takeaway
Nothing privacy-specific is deployed or documented by Whitechain, but nothing blocks it: the precompiles and factories needed are present. Teams must deploy their own Semaphore, Poseidon, ERC-5564 Announcer and ERC-6538 Registry; Railgun-scale systems are out of scope for a weekend.

### Cited Findings
- Own probe (eth_getCode, both networks): ERC-5564 Announcer 0x55649E01B5Df198D18D95b5cc5051630cfD45564 and ERC-6538 Registry 0x6538E6bf4B0eBd30A8Ea093027Ac2422ce5d6538 have no code; Semaphore v4 canonical 0x8A1fd199516489B0Fb7153EB5f075cDAC83c693D and PoseidonT3 0x3333333C0A88F9BE4fd23ed0536F9B6c427e3B93 have no code. ([rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io); [rpc.whitechain.io](https://rpc.whitechain.io))
- Own probe: deterministic deployers exist on both networks: Arachnid CREATE2 proxy 0x4e59b44847b379578588920cA78FbF26c0B4956C, Safe Singleton Factory 0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7, OP Create2Deployer 0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2, CreateX 0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed; also Permit2 0x000000000022D473030F116dDEE9F6B43aC78BA3 and Multicall3. ([rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io))
- Docs list "Multicall3, Create2Deployer, DeterministicDeploymentProxy, Permit2, the Safe singletons, the ERC-4337 EntryPoints, CreateX" as preinstalls in the L2 genesis. ([Whitechain docs, How the migration works](https://docs.whitechain.io/operate/migration/how-migration-works))
- Whitechain docs contain no privacy, shielded-pool, stealth-address or ZK content (keyword search of llms-full.txt returned only "private key" handling notes). ([Whitechain llms-full.txt](https://docs.whitechain.io/llms-full.txt))
- The Whitechain homepage describes WB Soul as "Your onchain identity, backed by a WhiteBIT account and private by design." ([whitechain.io](https://whitechain.io))
- WB Soul is described by third-party coverage as a KYC-linked onchain identity with attributes such as IsVerified and HoldLevel, where personal data is not put onchain. ([GNcrypto, WB Soul](https://www.gncrypto.news/news/unlock-your-digital-soul-with-whitebit/)). The official page https://whitebit.com/wb-soul returned HTTP 403 to the fetcher.
- EF's CROPS prize lists Kohaku ("Privacy SDK") as a resource. ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))

### Inferences
- Stealth payouts (ERC-5564/6538) are the cheapest privacy primitive to ship on Whitechain: deploy Announcer and Registry yourself (ideally via the same CREATE2 deployer and salt used on other chains so the canonical addresses match, if the original deploy used 0x4e59; verify before relying on it).
- A fixed-denomination or note-based USDT shielded pool (Privacy Pools style, Groth16 + Poseidon Merkle tree) is feasible in a weekend if built from an existing open-source codebase; the ASP / association-set idea also gives a compliance story that fits Whitechain's "compliance logic onchain" language.
- Railgun-like full systems (relayer network, POI) are not realistic for a weekend; Semaphore groups are realistic for "verified employee / verified investor" membership proofs.
- WB Soul could in principle act as a KYC anchor for ZK allowlists (prove "I hold a verified WB Soul" without revealing which), but this depends on contract details that were not found.
- Privacy and the Whitechain requirement "explorer link" to a USDT payment are compatible: show the USDT deposit or a USDT transfer to a stealth address; the unlinkability is what is private, not the existence of a payment.

### Gaps
- WB Soul contract addresses, interface, and whether it exists on the L2 (testnet or mainnet) are undocumented in the developer docs.
- Whether Privacy Pools (0xbow) or Kohaku have any Whitechain-specific support was not checked.

## Q6. Account abstraction and gasless payments on Whitechain

### Takeaway
ERC-4337 EntryPoints v0.6, v0.7, v0.8 and v0.9 plus Safe 4337 Module are on Whitechain Sepolia (Mainnet has v0.6 and v0.7 only), EIP-7702 semantics work, and the prize USDT supports EIP-2612 permit and EIP-3009 transferWithAuthorization. But no hosted bundler or embedded-wallet provider was found for chain 1874 (Pimlico rejects it, Reown embedded wallets fail), so teams should run their own relayer or bundler.

### Cited Findings
- Own probe, Sepolia code sizes: EntryPoint v0.6 0x5FF137D4...2789 (23,689 B), v0.7 0x00000000...a032 (16,035 B), v0.8 0x4337084D...F108 (21,738 B), v0.9 0x43370900...D009 (22,425 B), Safe4337Module 0.3.0 0x75cf1146...c226 (8,373 B), Safe 1.3.0/1.4.1 singletons and proxy factories present. Mainnet: v0.6 and v0.7 present, v0.8, v0.9 and Safe4337Module absent. ([rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io); [rpc.whitechain.io](https://rpc.whitechain.io))
- Pimlico public bundler: `chain "1874" is not supported` (same for 1875). ([Pimlico public endpoint](https://public.pimlico.io/v2/1874/rpc); [Pimlico supported chains](https://docs.pimlico.io/guides/supported-chains))
- Reown embedded wallets: "Login completes, transactions may fail"; docs advise `features: { email: false, socials: false }`. ([Whitechain docs, Reown](https://docs.whitechain.io/build/dapps/connect-wallet-with-reown))
- Prize USDT 0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7: name "Tether USD", symbol "USDT", 6 decimals, EIP-1967 proxy to implementation 0x26425662d126412128967ecf0a02ec48573026f7, verified on Blockscout as "TetherTokenV2" (contracts/Tether/TetherTokenV2.sol, solc 0.8.4); implementation bytecode includes permit, nonces, transferWithAuthorization, receiveWithAuthorization, cancelAuthorization; 10 holders; recent transfers on 2026-10-24 used `transferWithAuthorization`. ([Blockscout API, implementation](https://explorer.testnet.whitechain.io/api/v2/smart-contracts/0x26425662d126412128967ecf0a02ec48573026f7); [Blockscout token](https://explorer.testnet.whitechain.io/token/0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7); own probe via [rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io))
- Token-list USDT 0xaa7962d073935D387e8d442DA1D7149C81388f46 is a different contract ("Bridged USDT (Whitechain)", USDT.e, OZ TransparentUpgradeableProxy) whose implementation exposes permit but not EIP-3009. ([Blockscout API](https://explorer.testnet.whitechain.io/api/v2/smart-contracts/0xaa7962d073935D387e8d442DA1D7149C81388f46); [Whitechain docs, Token list](https://docs.whitechain.io/build/block-explorer/token-list)); own probe of implementation 0x7b1b1b3f945305bd505afad5ff83e7ad90f7e70b.
- USDC.e 0x5Eb541ba8A2DD841aF7864c3389162a23ddA8401 reports version "2" (FiatToken-style). (own probe, [rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io))
- The Reown page notes that wagmi's connector barrel pulls in `@x402/core`, `@x402/evm` packages, and Whitechain's Scale track explicitly invites x402 with "a facilitator you run". ([Whitechain docs, Reown](https://docs.whitechain.io/build/dapps/connect-wallet-with-reown); [ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))

### Inferences
- The simplest "Payments Nobody Notices" stack is EIP-3009 transferWithAuthorization on the prize USDT, signed by a passkey or embedded key, submitted by your own relayer funded from the faucet (0.5 WBT/day is enough at about 0.0006 WBT per contract call). The anti-drain story judges ask for: per-payer quotas, signature binding to merchant, nonce checks, and a gas budget per merchant.
- For 4337, self-host a bundler (e.g. Alto or Rundler) against EntryPoint v0.7/v0.8 on Sepolia and write a USDT-charging paymaster; EIP-7702 lets an existing EOA upgrade in place without a new address.
- Because the docs' bridged USDT (0xaa79...) is not the prize token, bridging USDT from Tron Nile through the Portal will likely give the wrong token. Ask the Whitechain team (workshop on Nov 5, Discord, Telegram dev chat) how to get 0xcedf... USDT.

### Gaps
- No documented faucet or minting path for the prize USDT 0xcedf...; the WBT faucet does not dispense it.
- Support from Alchemy, thirdweb, ZeroDev, Biconomy, Privy, Dynamic, Coinbase CDP was not checked individually.

## Q7. Payroll, payments and business products in the WhiteBIT / Whitechain ecosystem; stated interest in privacy, compliance, enterprise

### Takeaway
The ecosystem is business-payments heavy (Whitepay merchant processing with mass payouts, business wallets and USDT/USDC settlement; WhiteBIT exchange distribution; White Wallet; WB Soul KYC-linked identity), and Whitechain positions itself as a finance L2 for payment providers, fintechs and asset-backed businesses. Privacy is not a stated chain feature; compliance shows up as KYC/AML framing and as the Tokenize track's "compliance logic onchain". No WhiteBIT payroll product was found.

### Cited Findings
- Whitepay (W Group) lists "Crypto payments", "Mass payouts: Allow you to send crypto to multiple recipients at once", POS, donations, "Business wallets", conversion and withdrawal, "Volatility prevention: Locks exchange rate and auto-converts crypto to stable assets", reporting, user management with custom permissions, whitelabel/h2h; tariffs mention "Settlement USDT/USDC or multi-balance accounts". It does not mention Whitechain, WBT, or payroll. ([Whitepay](https://whitepay.com))
- Whitepay is a W Group crypto payment processor alongside WhiteBIT and Whitechain. ([CryptoSlate WhiteBIT profile](https://cryptoslate.com/companies/whitebit-crypto-exchange/))
- Whitechain homepage ecosystem: WhiteBIT ("The exchange at the center of the ecosystem"), Whitechain Explorer, WBT, Whitewallet ("A self-custodial wallet built for Whitechain and beyond"), WB Soul ("Your onchain identity, backed by a WhiteBIT account and private by design"); partners shown include Safe, WhiteBIT, W Group, hashbank; claims 10M+ WhiteBIT users, 40M+ W Group users. ([whitechain.io](https://whitechain.io))
- Typical partners: "Payment providers, fintechs, and banks"; "Asset-backed and tokenization businesses". ([Whitechain docs, For project partners](https://docs.whitechain.io/build/ecosystem/for-partners))
- Compliance language: exchange listing and integrations "subject to independent corporate, legal, regulatory, and AML/KYC evaluation"; Portal and canonical-bridge use subject to "applicable regulatory, sanctions, and compliance" terms. ([Whitechain docs, Introduction](https://docs.whitechain.io/learn/general/what-is-whitechain); [Start building](https://docs.whitechain.io/learn/introduction/index))
- Prize framing: "the core for onchain business to launch, operate and scale on"; Tokenize asks to "Model real-world asset (RWA) lifecycles and compliance logic onchain". ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))

### Inferences
- Whitechain's sponsor goals are merchant acceptance (get paid in USDT), post-payment business operations (refunds, renewals, accountant exports), RWA compliance logic, and invisible UX. Privacy is not one of their stated goals, so a privacy angle must be presented as making business payments viable (confidential revenue, supplier and customer lists, salaries), not as privacy for its own sake.
- "An export the accountant can use" plus privacy suggests viewing keys or selective-disclosure proofs: the public sees nothing, the accountant or auditor sees everything for that business.

### Gaps
- No WhiteBIT/Whitepay payroll product, and no statement from Whitechain about confidential transactions, were found.
- hashbank's role on Whitechain was not researched.

## Q8. Concrete hackathon ideas for Whitechain, especially private business payroll, and how to combine with EF CROPS

### Takeaway
Reframe "private payroll" as private business payments where payouts are a downstream step: contractor invoicing with private settlement (Operate + CROPS), gasless passkey payouts to stealth addresses (Scale + CROPS), or confidential invoice financing with ZK allowlists (Tokenize + CROPS). Each must settle at least one real prize-USDT payment on Whitechain Sepolia and keep the CROPS "P" structural.

### Cited Findings
- Operate explicitly excludes "Payroll, escrow and revenue splits on their own" but explicitly invites "Payment links and invoices for remote studios, contractors and cross-border teams billing global clients" and "an export the accountant can use". ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Scale invites EIP-3009 gasless checkout with "your own relayer", smart accounts, and x402 with "a facilitator you run". ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Tokenize invites invoice financing, investor allowlists and trade-finance confirmation flows with "Real transfer rules enforced in the contract". ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- EF CROPS idea list includes "a payment, messaging or social app where your server learns nothing about who talks to whom", and judging favors "structural (works without you)" over "cosmetic (a setting)". ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Anon-RPC prize ideas include "new network", and qualification is "Your app routes its RPC reads through Anon-RPC by default." ([ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes))
- Whitechain's own CROPS-relevant facts: forced inclusion via OptimismPortal (about 12h window), permissioned fault proofs, a Guardian that can pause withdrawals, a single sequencer; anyone can run an op-reth follower node from published artifacts. ([Whitechain docs, Transaction finality](https://docs.whitechain.io/learn/network/transaction-finality); [Run a node](https://docs.whitechain.io/operate/run-a-node/run-a-node))

### Inferences (ideas; all are researcher proposals, not sponsor statements)
1. Private contractor invoicing SDK (Operate primary, EF CROPS "P" secondary). A contractor or studio creates a payment link or invoice; the client pays prize USDT through a drop-in widget; funds land at a fresh ERC-5564 stealth address (self-deployed Announcer/Registry) or into a small USDT note pool; the contractor withdraws unlinkably; the business gets a viewing-key encrypted ledger for the accountant export, plus one-click refunds. Payroll appears only as "pay my contractors from received revenue", which keeps it out of the "payroll on its own" exclusion. Server learns nothing: invoice metadata encrypted client side, reads via Anon-RPC or a self-run node. README needs the Whitechain "why onchain stablecoin settlement" line (e.g. cross-border contractors, instant final settlement, programmable refunds) and the EF CROPS section.
2. Gasless private payouts with passkeys (Scale primary). Recipient or payer uses a passkey smart account (P256VERIFY precompile verified on Whitechain) or EIP-7702 EOA; payments use EIP-3009 transferWithAuthorization on prize USDT through your own relayer; stealth recipient addresses hide who got paid. Demo must show "zero crypto steps" and the relayer anti-drain design.
3. Confidential invoice financing (Tokenize primary). Business tokenizes an invoice; only allowlisted investors can fund it, enforced in `transfer` via a Semaphore or Groth16 membership proof (members are KYC-verified investors; optionally anchored to WB Soul if its interface can be confirmed); amounts and debtor identity stay off public view, settlement in prize USDT on due date. Strongest "compliance logic onchain" story.
4. Private payroll as a Continuity upgrade. If the team already has a payroll or payouts repo, add Whitechain USDT settlement (Whitechain Continuity, $3,000) and one structural CROPS property (EF CROPS Upgrade, $1,500). Both are Continuity-only prizes.
5. Agent pay-per-request with private reads (Scale + EF Anon-RPC). An x402 facilitator settling prize USDT on Whitechain, with the client's reads routed through Anon-RPC after adding Whitechain as an Anon-RPC network. Watch the 50 rps per-IP limit. Only one EF prize can be won per project.
- Prize stacking: Whitechain (counts as 1 partner across its tracks) + EF (placed in at most one EF prize) + one more partner, max 3 total.
- The EF alt mempool prize uses EF devnets, so it does not combine naturally with a Whitechain-deployed product.
- Practical checklist: compile with prague EVM for Sepolia; verify every contract on Blockscout; get prize USDT early (ask at the Nov 5 Whitechain workshop); commit steadily; add WHITECHAIN_FEEDBACK.md; keep the demo at 3 minutes or less to satisfy both sponsors; no analytics in the client for CROPS.

### Gaps
- Whether Whitechain judges would score a privacy-first invoicing product above a conventional checkout is unknown; their rubric emphasizes merchant integrability and post-payment operations, not privacy.
- Whether EF CROPS judges accept a single-sequencer L2 as the settlement layer without penalty is unknown; stating the trade-off in the README (as the CROPS rules allow) is the documented mitigation.
