# Whitechain at ETHGlobal: track history, analog winners, and what its judges reward

Research date: 2026-10-31 (IST). Scope: ETHGlobal hackathons from ETHOnline 2023 to ETHGlobal Tokyo 2026, plus Mumbai (5 to 7 Nov 2026). Team context: three people, DeFi and smart contract security, Classic track, fresh build only. Continuity-only tracks are ignored.

**How to read this file.** Lines under "Sourced" carry a link. Lines marked **Judgement** are this researcher's opinion. "Own probe" means a JSON-RPC or Blockscout API call made on 2026-10-31 against the public Whitechain endpoints; the cited URL is the endpoint queried.

**Method and access.** I fetched 34 ETHGlobal prize pages (`https://ethglobal.com/events/<slug>/prizes`) slowly, about 6 s apart, and parsed every track title, amount, description and qualification. I then parsed 4,555 project cards from showcase listings (`https://ethglobal.com/showcase?events=<slug>&page=N`) for 13 events. Each card records the organisations whose prizes the project won. Some of those listings I fetched myself; the rest were already saved by parallel research passes in this workspace. I also fetched project pages for the "Winner of" detail. At about 10:27 IST, project pages started returning a Cloudflare "Just a moment..." check. I stopped every ETHGlobal request at that point and did not retry or work around it. Exact track names for winners whose pages I could not reach therefore come from the listings (sponsor only), from the finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/`, or from search-engine snippets, and are marked as such.

---

## 0. Bottom line

- **Sourced.** Before Mumbai, Whitechain had never offered a prize at an ETHGlobal hackathon. The terms "whitechain", "whitebit" and "wb network" appear 0 times on the prize pages of 33 past events and 244 times on Mumbai's. Showcase searches for "whitechain" and "whitebit" return "No projects found" (section 1).
- **Sourced.** I found no Whitechain or WhiteBIT bounty on Devfolio, DoraHacks, Akindo or Taikai, and no hackathon post on the Whitechain blog. The only programmes open to outside builders are bug bounties (Whitechain Bridge and WhiteBIT programmes on HackenProof) and the Builders Program (up to $300K per team, released by milestone).
- **Judgement.** With no history of its own, the best evidence about Whitechain's taste is (a) how its Mumbai text is written and (b) what won comparable tracks from Circle and Arc, PayPal USD, Polygon, Coinbase CDP and Base, Hedera, HashKey, Curvegrid, Kadena and Canton. That evidence is in sections 3 to 7.
- **Judgement, the key finding.** Whitechain's "Won't place" lists read like a list of what won comparable tracks elsewhere:
  - payroll (Curvegrid Payroll; ArcFlow; Manila; Warden);
  - escrow (ETHJobs.cc, PYUSD);
  - bill splitting (C.E.S.T.A Agent, Arc);
  - a mint button with no rules;
  - AI chats that never pay.

  Whitechain has studied the same pool of past projects and closed off the easy wins. What it asks for instead has few precedents: a drop-in a separate app adds in about 20 lines, both the merchant and customer views, a flow that goes past the first payment, transfer rules enforced in the contract, and a relayer economics and anti-drain answer.
- **Judgement, crowding.** Invoice financing is not an empty lane at the submission level, although it is empty among ETHGlobal finalists. About 18 invoice-financing or factoring projects were submitted at 2026 events, and the 3 that won partner prizes all won Hedera tokenization tracks: Finvoice, cashmeifyoucan and Facture. At Mumbai, expect several invoice-financing entries in Tokenize; the winner will be the one whose contract enforces the most.
- **Judgement, chain facts that change plans (own probes today).**
  - The prize USDT now has 36 holders (10 on 26 Oct) and a supply of 1,945,270.
  - A verified UniswapV3Factory on Whitechain Sepolia has a WWBT/USDT pool holding about 1,498 WWBT and 117,546 prize USDT, plus ETH/USDT and USDC.e/USDT pools.
  - So a team can likely swap faucet WBT into the real prize USDT, and a relayer has a concrete onchain route to refill its WBT, which answers Scale's "how your relayer gets its WBT" (section 9).

---

## 1. Whitechain's ETHGlobal record: Mumbai is the first

### Sourced

- I counted matches for `whitechain|whitebit|wb network` in each prize page below, fetched 2026-10-31. Every past event scored 0; Mumbai scored 244. The events checked (all at `https://ethglobal.com/events/<slug>/prizes`) were:
  - **2023 to 2024:** ethonline2023, ethindia2023, istanbul, lfgho, circuitbreaker, scaling2024, starkhack, london2024, sydney, hackfs2024, brussels, superhack2024, sanfrancisco2024, ethonline2024, singapore2024, bangkok.
  - **2025:** agents, taipei, trifecta, cannes, prague, unite, newyork2025, ethonline2025, newdelhi, buenosaires.
  - **2026:** hackmoney2026, cannes2026, openagents, newyork2026, lisbon2026, ethonline2026, tokyo2026, and mumbai (244).

  Example: [Tokyo 2026 prizes](https://ethglobal.com/events/tokyo2026/prizes); [Mumbai prizes](https://ethglobal.com/events/mumbai/prizes).
- [Showcase search "whitechain"](https://ethglobal.com/showcase?q=whitechain) and [showcase search "whitebit"](https://ethglobal.com/showcase?q=whitebit) both render "No projects found" (fetched 2026-10-31).
- The Mumbai sponsor record lists Whitechain with package "Core" and a total of 15000 (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q1). It presents "together with Optimism", and Optimism links were added on 31 Oct ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain); `track_ideas/00_current_tracks.md`).
- Whitechain's blog has four posts, all from Jul to Sep 2026 (L2 migration, WBT on L2, developer guide, bridge testnet), and none is about hackathons ([Whitechain blog](https://whitechain.io/blog)).
- Programmes for outside builders:
  - HackenProof runs a "Whitechain Bridge" bug bounty (company: WhiteBIT) ([HackenProof](https://hackenproof.com/programs/whitechain-bridge)), and WhiteBIT pays up to $5,000 per critical bug across its programmes ([HackenProof blog](https://hackenproof.com/blog/for-hackers/whitebit-bug-bounty-reward)).
  - The Builders Program offers "up to $300K per eligible team, released in tranches as milestones are verified". Its reviewers look for "teams that ship, users that stay, commitment to Whitechain, and verifiable on-chain metrics" ([docs, For project partners](https://docs.whitechain.io/build/ecosystem/for-partners)).
- Searches for a Whitechain hackathon on Devfolio, DoraHacks, Akindo or Taikai, and for "Whitechain hackathon winners", found nothing relevant (web searches, 2026-10-31).

### Judgement

- The first-time-sponsor situation has three practical consequences:
  - The judges have no house style to fall back on, so they will lean hard on their written lists.
  - They will value `WHITECHAIN_FEEDBACK.md` as product research, since this is their first big developer cohort on a chain whose L2 mainnet launched on 26 Oct.
  - They have a Builders Program to feed, so "could this ship on our chain" is the implicit tiebreaker.
- The judging panel (presumably Whitechain staff) is not named. The workshop is Thu 5 Nov 16:30 to 16:50 IST in Workshop Room 2 and has no speaker listed ([event page](https://ethglobal.com/events/mumbai)). It clashes with the Uniswap workshop (`track_ideas/00_current_tracks.md`).

---

## 2. The Mumbai tracks (fresh-build ones), condensed

The full verbatim text is in `track_ideas/00_current_tracks.md`, lines 1393 to 1540. The phrases that act as rubric are quoted below ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain), fetched 2026-10-31).

| Track | Amount | Core ask (verbatim) | What we want to see (verbatim) | Won't place (verbatim) |
|---|---|---|---|---|
| Operate · Stablecoin Payments for Business | $5,000 (2,500 / 1,500 / 1,000) | "Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it." | "A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines"; "Both views in the demo, the merchant and the paying customer"; "Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use" | "A pay button that sends a plain transfer, tipping jars, bill splitters, or custodial bridges into a local currency token. Payroll, escrow and revenue splits on their own." |
| Tokenize · Real World Finance on Whitechain | $4,000 (2,500 / 1,500) | "Model real-world asset (RWA) lifecycles and compliance logic onchain ... where every payment happens in USDT" | "Real transfer rules enforced in the contract, such as allowlists, transfer restrictions, maturity or settlement conditions, not just a token with a UI on top"; "A clear issuer, investor or business user and at least one full lifecycle step in the demo" | "A token with a mint button and no rules, or ownership NFTs where nothing is enforced onchain." Also: "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize." |
| Scale · Payments Nobody Notices | $3,000 (2,000 / 1,000) | "the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on" | "A payer flow with zero crypto steps visible, shown in the demo"; "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it" | "Flows where the payer still signs a transaction that costs them gas, or AI chats that never actually pay anyone." |

The qualifications are the same for all three tracks:
1. Contracts deployed on chain ID 1874 and verified on the explorer.
2. At least one payment in USDT `0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7` in the main flow, with the explorer link in the README. "Payments in a test token you minted yourself won't count".
3. A README line on why this flow needs onchain stablecoin settlement on Whitechain.
4. Steady commit history and a README covering setup, architecture and limitations.
5. A video of 2 to 4 minutes "that shows each party involved".
6. `WHITECHAIN_FEEDBACK.md`.

---

## 3. Analog tracks from comparable sponsors (Whitechain has no past tracks)

### Sourced: the tracks, from the prize pages (amount is the track total)

**Merchant payments and business flows (Operate analogs)**

| Event | Sponsor | Track | Amount |
|---|---|---|---|
| London 2024, Brussels 2024 | Circle | Best Application for Cross-Border Payments; Best Application for Dollar Access | $2,000 each |
| Superhack 2024 | Base | Best apps built for payments on Base | $5,000 |
| San Francisco 2024 | Unlimit | Crypto Checkouts | $2,000 |
| San Francisco 2024 | Coinbase CDP | Future of Finance (stablecoins, fintech, etc.) | $2,000 |
| Bangkok 2024 | Coinbase CDP | Checkout component pool prize | $500 |
| Taipei 2025, Cannes 2025, New York 2025 | Circle | Build a Multichain USDC Payment System | $4,000 |
| Taipei 2025 | Polygon | Real World Payments | $2,000 |
| New York 2025 | PayPal USD | Grand Prize (Best Overall: Transformative Use of PYUSD); Most Innovative Payment-Focused Use of PYUSD | $4,500; $3,500 |
| ETHOnline 2025, New Delhi 2025 | PayPal USD | Best Overall Transformative Use of PYUSD (plus consumer and payments sub-prizes at ETHOnline) | $4,000; $10,000 |
| Buenos Aires 2025 | Polygon | Best Use of Payments on Polygon | $10,000 |
| Buenos Aires 2025 | Circle | Best Automated Treasury Operations with Circle Gateway and Arc | $2,000 |
| HackMoney 2026 | Arc | Build Global Payouts and Treasury Systems with USDC on Arc | $2,500 |
| New York 2026 | Canton Foundation | Payments & Neobanking | $2,500 |
| Cannes 2026 | WalletConnect | Best use of WalletConnect Pay | $4,000 |

**Real-world assets and tokenization (Tokenize analogs)**

| Event | Sponsor | Track | Amount |
|---|---|---|---|
| Taipei 2025 | HashKey Chain | Real-World Asset Tokenization Compliance | $3,000 |
| Taipei 2025 | Polygon | Real World Assets; Real World Anything | $2,000; $6,000 |
| Buenos Aires 2025, Tokyo 2026 | Curvegrid | Best RWA Tokenization Project | $2,000; $1,000 |
| New Delhi 2025 | Kadena | Best Institutional / Real-World Asset Use Case | $1,250 |
| HackMoney 2026 | Arc | Best Agentic Commerce App Powered by Real-World Assets on Arc | $2,500 |
| Cannes 2026, Lisbon 2026, New York 2026 | Hedera | Tokenization on Hedera | $2,500; $3,000; $3,000 |
| New York 2026 | Canton Foundation | TradFi, RWA & Tokenized Assets | $4,500 |
| ETHOnline 2026 | Hedera | Tokenization of Anything | $6,000 |
| Mumbai 2026 (competing track) | Hedera | Tokenize Anything with Hedera Studios | $5,000 |

**Invisible payments, gasless and account abstraction (Scale analogs)**

| Event | Sponsor | Track | Amount |
|---|---|---|---|
| Istanbul 2023, ETHIndia 2023 | Base | Best use of Account Abstraction and Base Paymaster | $5,000; $4,000 |
| London 2024, Sydney 2024 | Base | Best use of 4337 Account Abstraction | $5,000; $2,000 |
| Brussels 2024 | Celo | Best use of stable gas currency (USDC, USDT, cUSD) | $2,500 |
| Brussels 2024 | Dynamic | Abstract Away Crypto | $2,000 |
| Taipei 2025, Cannes 2025, New York 2025 | Circle | Enable end users to pay for gas using USDC | $2,000 |
| Cannes 2025, New York 2025 | Circle | Create a Gasless Experience | $2,000 |
| Buenos Aires 2025 | Privy | Best App Using Native Gas Sponsorship with Privy | n/a |
| New Delhi 2025 | Polygon | Best Use of x402 Agentic Payments on Polygon | $10,000 |
| Cannes 2026 | Arc | Best Agentic Economy with Nanopayments | $3,750 |
| New York 2026 | Arc, Unlink, Dynamic | Private nanopayments | $1,000 each |
| Cannes 2026 to ETHOnline 2026 | Hedera | AI & Agentic Payments on Hedera | $6,000 each |

Sources: [London 2024](https://ethglobal.com/events/london2024/prizes), [Brussels](https://ethglobal.com/events/brussels/prizes), [Superhack 2024](https://ethglobal.com/events/superhack2024/prizes), [San Francisco 2024](https://ethglobal.com/events/sanfrancisco2024/prizes), [Bangkok](https://ethglobal.com/events/bangkok/prizes), [Istanbul](https://ethglobal.com/events/istanbul/prizes), [ETHIndia 2023](https://ethglobal.com/events/ethindia2023/prizes), [Sydney](https://ethglobal.com/events/sydney/prizes), [Taipei](https://ethglobal.com/events/taipei/prizes), [Cannes 2025](https://ethglobal.com/events/cannes/prizes), [New York 2025](https://ethglobal.com/events/newyork2025/prizes), [ETHOnline 2025](https://ethglobal.com/events/ethonline2025/prizes), [New Delhi](https://ethglobal.com/events/newdelhi/prizes), [Buenos Aires](https://ethglobal.com/events/buenosaires/prizes), [HackMoney 2026](https://ethglobal.com/events/hackmoney2026/prizes), [Cannes 2026](https://ethglobal.com/events/cannes2026/prizes), [New York 2026](https://ethglobal.com/events/newyork2026/prizes), [Lisbon 2026](https://ethglobal.com/events/lisbon2026/prizes), [ETHOnline 2026](https://ethglobal.com/events/ethonline2026/prizes), [Tokyo 2026](https://ethglobal.com/events/tokyo2026/prizes), [Mumbai](https://ethglobal.com/events/mumbai/prizes). All fetched 2026-10-31.

### Sourced: verbatim lines that matter

- **Circle, "Build a Multichain USDC Payment System"** (Taipei 2025): "Build an application that enables multichain USDC payments and payouts using Fast Transfers from CCTP V2." One example use case: "Universal Merchant Payment Gateway [dash replaced] Implement a multi-chain checkout system for merchants to accept USDC payments across various blockchains". Circle's qualification across 2025: "Functional MVP and diagram: Projects must demonstrate a working frontend and backend plus an architecture diagram"; "Video demonstration + presentation" ([Taipei prizes](https://ethglobal.com/events/taipei/prizes)).
- **Circle, "Enable end users to pay for gas using USDC"** (Taipei 2025): "Develop an application that enables users to pay network fees in USDC instead of native tokens by leveraging Circle Paymaster." ([Taipei prizes](https://ethglobal.com/events/taipei/prizes))
- **Polygon, "Real World Payments"** (Taipei 2025):
  - Description: "Build a seamless web3 payment experience that feels as smooth and familiar as using a Web2 app like Venmo or Cash App. Your mission is to remove the typical friction points in crypto payments [dash replaced] wallet setup, gas fees, complex UX".
  - Qualifications: "Simplified onboarding"; "Gasless transactions: use account abstraction, meta-transactions, or paymaster models to eliminate gas for the user"; "Real-world use case: think peer-to-peer payments, tipping, subscriptions, marketplace checkout, or remittances". Note that Whitechain now excludes tipping.

  ([Taipei prizes](https://ethglobal.com/events/taipei/prizes))
- **Polygon, "Best Use of Payments on Polygon"** (Buenos Aires 2025): "Payment flows (not gambling! not defi per se) - merchant applications, services, payment processing middleware, wallets and mobile apps, etc. The more your idea can bring payment transaction count up (no botting!), the better!" ([Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes))
- **PayPal USD** (New York 2025, New Delhi 2025): "Submission must clearly demonstrate utilization of PYUSD (deployed on mainnet or testnet)"; "Project must be newly built and deployed"; "Submit a 2 [dash replaced] 4 minute demo video" ([New York 2025 prizes](https://ethglobal.com/events/newyork2025/prizes); [New Delhi prizes](https://ethglobal.com/events/newdelhi/prizes)).
- **Arc, "Best Smart Contracts on Arc with Advanced Stablecoin Logic"** (Buenos Aires 2025): "Contracts should go beyond simple transfers, like automation, conditional logic, or cross-chain interoperability." ([Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes))
- **Arc, "Build Global Payouts and Treasury Systems with USDC on Arc"** (HackMoney 2026): "Projects should show how onchain infrastructure can support real-world financial operations like payroll, revenue distribution, or fund settlements." It adds: "Product feedback - clear and actionable feedback will heavily influence the judgement of your submission". Arc invites the payroll and revenue distribution that Whitechain excludes ([HackMoney 2026 prizes](https://ethglobal.com/events/hackmoney2026/prizes)).
- **HashKey, "Real-World Asset Tokenization Compliance"** (Taipei 2025): "address core challenges such as asset verification, compliance auditing, and liquidity enhancement", with directions including "Supply chain finance and trade asset securitization solutions with regulatory audit trails" ([Taipei prizes](https://ethglobal.com/events/taipei/prizes)).
- **Curvegrid, "Best RWA Tokenization Project"** (Buenos Aires 2025): "Invoice Financing [dash replaced] Build tokenized invoice marketplaces with automated cashflow tracking" ([Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes)).
- **Hedera, "Tokenization on Hedera"** (Cannes 2026): "Projects that demonstrate a clear path from physical asset to on-chain token with meaningful compliance or lifecycle management will be favoured." Qualification: "a ≤ 5-minute demo video showing token creation, configuration, and at least one lifecycle operation (transfer, compliance check, fee distribution, etc.)" ([Cannes 2026 prizes](https://ethglobal.com/events/cannes2026/prizes)).
- **Hedera, "Tokenization of Anything"** (ETHOnline 2026):
  - Description: "Post tokenised treasuries against a repo agreement and the collateral leg becomes programmatic and provable instead of a parallel paper process"; "Real asset classes and real lifecycle management will be favoured over a token with a name on it."
  - Extra points: "Compliance controls in use: KYC grants, freezes, transfer restrictions, pauses", "Scheduled Transactions for vesting, coupon payments, or maturity settlement".

  ([ETHOnline 2026 prizes](https://ethglobal.com/events/ethonline2026/prizes))

### Judgement

- Whitechain's Tokenize wording ("Real transfer rules enforced in the contract", "at least one full lifecycle step in the demo") is close to Hedera's tokenization wording ("at least one lifecycle operation", "favoured over a token with a name on it"). Hedera has run that track five times. Its winners are the best evidence for Whitechain Tokenize.
- Whitechain's Scale track merges three older analog families: Circle's gasless and pay-gas-in-USDC tracks, the Base 4337 and paymaster tracks, and the Polygon and Hedera x402 tracks. It adds a requirement none of them had: show the relayer's WBT supply and its drain resistance.

---

## 4. Who won the analog tracks, and what they built

Basis: the prize organisation comes from the showcase listing for each event. The exact track name comes from the project page where I fetched one before the bot check, from the finalist catalogues, or from the arc research notes saved in this workspace. Otherwise the cell says "sponsor only". Taglines are verbatim from the listings.

### 4.1 Merchant, billing and treasury (Operate analogs)

| Project (event) | Prize won | What it built (sourced) |
|---|---|---|
| [CrossMeter](https://ethglobal.com/showcase/crossmeter-w9zay) (New York 2025) | Circle "Build a Multichain USDC Payment System" 2nd; Dynamic financial app | "Zero code billing infrastructure for web3". It "abstracts all that into a single API key and a few lines of code", settling in PYUSD and multichain USDC; "Billing-as-a-Service" with a vendor dashboard |
| [Swap Pay](https://ethglobal.com/showcase/swap-pay-4hpe9) (New York 2025) | PayPal USD Grand Prize; Chainlink | "Checkout SDK that pays a PYUSD bill from a mix of the user's tokens"; "One EIP-5792 transaction replaces several swaps and approvals" (finalist catalogue) |
| [ETHJobs.cc](https://ethglobal.com/showcase/ethjobs-cc-gx5fm) (New York 2025) | PayPal USD "Most Innovative Payment-Focused Use of PYUSD" | A task marketplace where "Payment is locked in a smart contract (not released until work is done)", verified through GitHub with Chainlink Functions. This is escrow, which Whitechain now excludes on its own |
| [Fluvia](https://ethglobal.com/showcase/fluvia-4wkgv) (New York 2025) | Circle "Enable instant, composable access to multichain USDC balances"; Hardhat | Business treasury: "deploy for you a multichain contract (same address on all chains)" that routes customer payments via CCTP; Privy session signers so users pay no gas |
| [PayWiser](https://ethglobal.com/showcase/paywiser-i4i5r) (New York 2025) | Circle "Create a Gasless Experience"; Hyperlane; Saga 3rd | Merchant face-payment terminal: "no wallets, phones, or PINs required", Bluetooth proximity check within 1 metre, biometric embeddings |
| [AnyAsset Checkout](https://ethglobal.com/showcase/anyasset-checkout-8h457) (New York 2026) | Arc "Best Chain Abstracted USDC Apps Using Arc as a Liquidity Hub" 2nd; Dynamic "Best Use of Flow" | "Checkout links where any EVM asset becomes merchant-settled USDC". The merchant "creates an ENS-branded checkout link, chooses where they want to receive USDC"; the UI tracks "burn, attestation, receive, and settlement progress" |
| [starc](https://ethglobal.com/showcase/starc-fo2d6) (Buenos Aires 2025) | Circle "Best AI Agent Wallet with Circle Wallets" (not a payments track) | "Unifying merchant payment layer. Accepts any stablecoin, settles in a single liquid asset vault": a StarcRouter and an ERC-4626 vault on Arc, with payroll, auto-sweep and an AI treasury agent |
| [ArcFlow](https://ethglobal.com/showcase/arcflow-rwysr) (HackMoney 2026) | Arc "Build Global Payouts and Treasury Systems"; ENS | Payroll whose idle funds sit in a Uniswap v4 USDC/USDT pool until payday |
| [Curvegrid Payroll](https://ethglobal.com/showcase/curvegrid-payroll-kzyix) (Taipei 2025) | Circle and Curvegrid (sponsor only) | "Spreadsheet-driven payroll tool with instant cross-chain USDC salaries" |
| [Solva](https://ethglobal.com/showcase/solva-map8t) (Taipei 2025) | Polygon "Real World Payments"; Curvegrid 1st; ENS | "Venmo-style payments" with "Email or social login, card top-up, and sending to usernames without ever seeing a signature modal or 'gas fees'" (finalist catalogue) |
| [Century Pay](https://ethglobal.com/showcase/century-pay-12dy7) (Superhack 2024) | Base "Best apps built for payments on Base"; Mode; Blockscout | Discord bot for payments using embedded accounts and a paymaster (finalist catalogue) |
| [ETHPark-QR](https://ethglobal.com/showcase/ethpark-qr-gvj0t) (Bangkok 2024) | CDP Checkout pool; Bitkub 1st | Pay Thai parking QR codes with crypto via volunteer settlers (finalist catalogue) |
| [Omma Cash](https://ethglobal.com/showcase/omma-cash-nkdrx) (Brussels 2024) | Circle "Best Applications for Emerging Use Cases" 1st | A WhatsApp wallet for remittances in "USDC or local fiat" (finalist catalogue). That is close to what Whitechain now excludes as "custodial bridges into a local currency token" |
| [Manila](https://ethglobal.com/showcase/manila-fv16y) (New York 2026) | Arc "Best Private Nanopayments"; Unlink; two Dynamic prizes | Confidential USDC payroll; "every run is checked against a deterministic policy engine (per-run cap, hard ceiling, pay band, recipient allowlist)" (arc research notes) |

### 4.2 Invisible and gasless payments (Scale analogs)

| Project (event) | Prize won | What it built (sourced) |
|---|---|---|
| [Full Circle](https://ethglobal.com/showcase/full-circle-b091b) (Cannes 2025) | Circle "Build a Multichain USDC Payment System" 2nd (search snippet) | "Multichain gas killer [dash replaced] pay with USDC, not ETH" |
| [Taparoo](https://ethglobal.com/showcase/taparoo-qmfc0), [Savio](https://ethglobal.com/showcase/savio-32w3s), [Credura](https://ethglobal.com/showcase/credura-rrsv6) (Cannes 2025) | Circle (sponsor only) | Taparoo: "NFC event wallet, smart spend rules, gasless USDC, instant kill-switch". Savio: group savings with "gasless UX". Credura: "Crypto-Backed Buy Now, Pay Later ... Direct Debit Repayments" |
| [Just Pay](https://ethglobal.com/showcase/just-pay-tfw2z), [Absynth](https://ethglobal.com/showcase/absynth-e2he9) (Taipei 2025) | Circle (sponsor only) | Just Pay: "sends USDC chainlessly in seconds [dash replaced] no bridges, one balance, one tap, any chain". Absynth: "Smart account powered by passkeys" |
| [ArcBeam](https://ethglobal.com/showcase/arcbeam-e0bey) (Buenos Aires 2025) | Circle (sponsor only) | "Send USDC to anyone, anywhere. No native token needed." |
| [TapTrust](https://ethglobal.com/showcase/taptrust-12smv) (Istanbul 2023) | Base AA and Base Paymaster 2nd; Arx | NFC chips as smart wallets, "no ETH needed" (finalist catalogue) |
| [Cache Coherence](https://ethglobal.com/showcase/cache-coherence-1nq6z) (Sydney 2024); [NFC wallet](https://ethglobal.com/showcase/nfc-wallet-xwuff) (London 2024) | Base 4337 1st; Base 4337 2nd | 4337 recovery with World ID over CCIP; NFC tags as 4337 accounts where "only whitelisted terminals can trigger payments" (finalist catalogue) |
| [C.E.S.T.A Agent](https://ethglobal.com/showcase/c-e-s-t-a-agent-wkud7) (Cannes 2026) | Arc (sponsor only) | "A voice AI agent that books, pays, and splits crypto without using crypto!" |

### 4.3 Tokenization and real-world finance (Tokenize analogs)

| Project (event) | Prize won | What it built (sourced) |
|---|---|---|
| [cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw) (New York 2026) | Hedera "Tokenization on Hedera" | Invoice factoring: "You upload your invoice and prove you're a real person with World ID ... a market of AI agents competes to fund you live, in about 30 seconds"; HTS tokens on acceptance |
| [Wafer](https://ethglobal.com/showcase/wafer-r4uab) (New York 2026) | Hedera "Tokenization on Hedera" | A "KYC-gated, NAV-appreciating" fund share financing DePIN operators. The fund "mints a claim NFT"; "on default the NAV writes down with the loss shared pro-rata"; "the hardware pays the vault directly" |
| [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz) (Cannes 2026) | Hedera (tokenization per search snippet) | "Private invoice factoring with AI attestation inside Flare TEE and tokenized invoices on Hedera" |
| [Facture](https://ethglobal.com/showcase/facture-jy21t) (ETHOnline 2026) | Hedera (sponsor only) | "An invoice is a zero-coupon bond nobody ever priced. Facture is the market that prices it." |
| [namegate](https://ethglobal.com/showcase/namegate-63d0m) (ETHOnline 2026) | Hedera (sponsor only) | "Tokenized bond on Hedera using ENSv2 subnames (roles, expiry, resolver records) as its KYC layer" |
| [Rialto](https://ethglobal.com/showcase/rialto-psod2) (ETHOnline 2026) | Hedera (sponsor only) | "Oracle-free lending for tokenized securities on Hedera. HIP-1215 scheduled call closes the loan." |
| [Folio](https://ethglobal.com/showcase/folio-xh7ak) (Cannes 2026); [Mint and Chill](https://ethglobal.com/showcase/mint-and-chill-cwo8n) (Lisbon 2026) | Hedera (sponsor only) | Folio: "0% interest credit line backed by your stocks". Mint and Chill: "Agent-operated marketplace for RWA token minting, compliance and lifecycle management" |
| [Thurman Protocol](https://ethglobal.com/showcase/thurman-protocol-q8iiy) (New York 2026, Continuity) | Arc Continuity 1st; Chainlink upgrade | Secondary loan sales: "designed around delivery-vs-payment, meaning in a single transaction the packages/loans and USDC swap hands", settled when DocuSign signatures arrive through Chainlink CRE |
| [T-REX Capital Market](https://ethglobal.com/showcase/t-rex-capital-market-mssaj) (ETHOnline 2026) | Arc (sponsor only) | "Regulated capital markets on Arc, powered by Privy wallets and USDC" |
| [KYCGuard](https://ethglobal.com/showcase/kycguard-xi02i), [Aura](https://ethglobal.com/showcase/aura-yragg), [luluchill](https://ethglobal.com/showcase/luluchill-sd81e), [BrickFi](https://ethglobal.com/showcase/brickfi-j6vg1) (Taipei 2025) | Organisation 6tfor, probably HashKey (inferred from its logo file and Taipei's tracks) | KYCGuard: "A KYC-compliant token transfer system ensuring verified users can securely exchange and mint tokens". Aura: "fractionalized RWA lending with fixed-income bond-like notes". luluchill: "RWA platform using Self Protocol and EAS to verify users and pools" |
| [AssetX](https://ethglobal.com/showcase/assetx-am8n0) (New Delhi 2025) | Kadena (sponsor only) | "The RWA launchpad for tokenizing, trading & investing in real assets" |
| [Wattwealth](https://ethglobal.com/showcase/wattwealth-eky7i) (New Delhi 2025) | PayPal USD (sponsor only) | "Decentralized platform for tokenized renewable energy investments" |
| [WrappedGGC](https://ethglobal.com/showcase/wrappedggc-8oq47) (Buenos Aires 2025) | Curvegrid (sponsor only) | "Tokenzied Virtual Asset backed by the Bank Of Ghana, Ghana Gold Coin" (spelling as in source) |
| [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026, finalist) | Uniswap Foundation 1st; ENS ENSv2 3rd | Card shards sold by Continuous Clearing Auction to World ID bidders "so bots can't sweep a Black Lotus"; an 80% holder can buy the card out (finalist catalogue) |

### 4.4 Payment finalists that won no partner prize in their own lane (sourced, finalist catalogues)

- [AutoPay](https://ethglobal.com/showcase/autopay-n8ot7) (HackMoney 2026 finalist): "Non-custodial USDC subscriptions". "The ArcPolicyManager contract can pull only what the user's policy allows ... the user can revoke at any time". Merchants got "an npm SDK (createCheckoutUrl, verifyWebhook)". Partner prizes: "None shown".
- [Xpack](https://ethglobal.com/showcase/xpack-myrx1) (HackMoney 2026 finalist): npm install-time payments via Circle Gateway to Arc. "None shown".
- [OpenPayAI](https://ethglobal.com/showcase/openpayai-89sbk) (ETHOnline 2025 finalist): license prices in PYUSD, but the PYUSD was a "mock injected locally via hardhat_setCode". "None shown".
- [SafeSend](https://ethglobal.com/showcase/safesend-e9r0p) (ETHOnline 2025 finalist): PYUSD escrow with automatic refunds when fraud is attested. "None shown".
- [CronPay](https://ethglobal.com/showcase/cronpay-ko3p4) (ETHOnline 2025 finalist): a merchant gateway ("Coming soon to Shopify") that won Avail Nexus 1st, not PYUSD.

---

## 5. Winners against non-winners in the same lanes

### Sourced: keyword census of 4,555 projects across 13 events (name plus tagline; my classification)

The events are Taipei, New York 2025, ETHOnline 2025 (633 cards), New Delhi, Buenos Aires, Cannes 2025, HackMoney 2026, Cannes 2026, Open Agents, New York 2026, Lisbon 2026, ETHOnline 2026 and Tokyo 2026 ([showcase listings](https://ethglobal.com/showcase)).

| Lane (keyword) | Projects | Won at least one partner prize | Rate |
|---|---|---|---|
| Invoice, factoring | 42 | 5 | 12% |
| Checkout, merchant, POS, storefront | 31 | 12 | 39% |
| Subscription, recurring, refund | 50 | 7 | 14% |
| Gasless, paymaster, "no gas" | 64 | 14 | 22% |
| RWA, tokenize, bond, treasury | 217 | 48 | 22% |

**Invoice financing in 2026: about 18 submissions, 3 winners.**
- Winners: Finvoice, cashmeifyoucan and Facture, all Hedera tokenization.
- Submissions with no partner prize shown:
  - Lisbon 2026: intentional.so.
  - New York 2026: CreditMesh ("Tokenized invoice financing with HTS claim tokens and HCS audit trails").
  - Tokyo 2026: Tegata ("Invoices tokenized and sold for JPYC on Uniswap v4, priced on the debtor's credit curve") and Seikyu ("Sell unpaid invoices as ENSv2 names that expire on their due date, to World ID-verified in[vestors]").
  - ETHOnline 2026: Sowee, DeFa By InvoiceMate, Factora, FactorFlow, Forfait ("non-recourse receivables financing on Hedera"), receivable.eth ("priced in a TEE, named on ENS") and Receivables Flow.
  - HackMoney 2026: Oliver, seed-finance, sugarc ("Tokenized invoice factoring with AI underwriting and USDC liquidity on Arc") and Invoice Financer.

  (Listings: [Tokyo 2026](https://ethglobal.com/showcase?events=tokyo2026), [ETHOnline 2026](https://ethglobal.com/showcase?events=ethonline2026), [HackMoney 2026](https://ethglobal.com/showcase?events=hackmoney2026), [New York 2026](https://ethglobal.com/showcase?events=newyork2026), [Lisbon 2026](https://ethglobal.com/showcase?events=lisbon2026).)

**Checkout and merchant tooling.**
- Winners: AnyAsset Checkout, starc and CrossMeter.
- No partner prize shown:
  - UWAPI ("Web3 checkout and invoicing tool"), MarketPay ("A Stripe-like API for crypto payments, subscriptions, and automated settlement") and Onvo (B2B invoices with World ID), all Cannes 2026.
  - StablePay ("demo store for crypto checkout, webhooks, and merchant payment automation"), PayR ("AI-powered invoices with verifiable USDC payments and automatic receipts on Arc"), ARCA (USDC subscriptions) and Reclaim ("Executable receipts that let buyers cancel, refund, transfer, or dispute onchain purchases"), all ETHOnline 2026.
  - FlexSub SDK, onchain-subscription and AutoPay (a finalist), all HackMoney 2026.
  - Swap-Pay Invoice, Tokyo 2026.

### Judgement: why the winners beat the others

These inferences come from the project text above, not from judge notes. They are ranked by how often the pattern recurs.

1. **The sponsor's own primitive is in the settlement path, and the project says exactly where.**
   - CrossMeter routes through CCTP and Fluvia's same-address deposit contract relies on CCTP. AnyAsset Checkout shows "burn, attestation, receive" states.
   - Wafer and cashmeifyoucan mint through the Hedera Token Service with KYC grants. Thurman's DvP settles in Arc USDC.
   - Non-winners like StablePay, MarketPay and UWAPI describe generic checkout features without a chain-specific mechanism a judge can point at.
   - For Whitechain, the equivalents are:
     - EIP-3009 and permit on the prize USDT;
     - the WWBT/USDT pool;
     - the P256 precompile;
     - the EntryPoint v0.7 and v0.8 preinstalls;
     - Permit2 and Safe on chain ID 1874;
     - verified contracts on its Blockscout.
2. **Lifecycle beyond the first transfer, enforced by code.**
   - The Hedera winners all show a state that changes over time: Wafer's NAV accrues and is written down on default, Facture prices a zero-coupon claim, and Rialto closes a loan with a scheduled call.
   - Tagline-level non-winners (FactorFlow, Forfait, Sowee) describe the same business but no visible state machine.
   - This matches Whitechain's "at least one full lifecycle step" and "maturity or settlement conditions".
3. **A developer artifact with a size claim.** CrossMeter's "single API key and a few lines of code" and Swap Pay's "Checkout SDK" won sponsor prizes. Whitechain made this explicit with "adds in about 20 lines". Expect its judges to open the separate demo app and count.
4. **The real token, not a stand-in.**
   - OpenPayAI made the finalist round on a PYUSD mock injected with `hardhat_setCode` but shows no PYUSD prize.
   - Whitechain wrote the rule down: "Payments in a test token you minted yourself won't count".
5. **A falsifiable one-liner.** "Fresh data or your money back" (OpenBook, Arc), "the hardware pays the vault directly" (Wafer) and "No native token needed" (ArcBeam) are all claims a judge can test. Generic "next-generation payment platform" copy appears on many non-winners.
6. **Polish and finalist status do not carry a partner prize.**
   - AutoPay had an SDK, webhooks, revocable pulls and a finalist slot, and won no Arc prize. The arc research notes list it among Arc non-winners.
   - Likely reasons, as inference: Arc's HackMoney tracks were "Chain Abstracted", "Payouts and Treasury" and "Agentic Commerce", and a single-chain subscription fit none of them squarely.
   - Lesson: fit the track's own nouns, not just quality.
7. **Categories that won elsewhere are now excluded.**
   - Payroll won Circle (Curvegrid Payroll), Arc (ArcFlow, Manila) and Unlink (Warden at Cannes 2026).
   - Escrow won PayPal (ETHJobs.cc), and bill splitting won Arc (C.E.S.T.A).
   - Remittance into local fiat won Circle (Omma Cash).
   - Whitechain's "Won't place" removes each of these, so a team copying past payment winners will lose here.

---

## 6. What Whitechain's own text reveals about its judges (Judgement, grounded in the verbatim text in section 2)

- **They think like a payment processor's product team, not a DeFi team.** The nouns are merchant, store, webhooks, receipt, due dates, reminders, renewal, refund, export, accountant, issuer and investor. The parent group runs Whitepay, which advertises "Mass payouts", "Business wallets", "Volatility prevention" and "Settlement USDT/USDC" ([Whitepay](https://whitepay.com)). The judges will recognise a credible merchant flow and spot a toy one.
- **They want integration evidence they can verify from the repo.** "Adds in about 20 lines" means a separate demo app with its own `package.json` and a diff they can count. "Explorer link in your README" means they will click it, and "steady progress" means they will read the commit graph.
- **They are worried about relayer economics, which is unusual.** No analog track asked "how your relayer gets its WBT, and what stops someone from draining it". This is an L2 whose gas token is an exchange coin, and Pimlico does not support chain 1874 (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q6). They need builders to run relayers and have thought about abuse. A security team's adversarial write-up is worth more here than anywhere else at Mumbai.
- **They separate Operate from Tokenize precisely.** "Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize." A team that blurs the two is guessing which track it is in, and the earlier simulated review (`plans/reviews/judge_whitechain.md`) asks the README to name the primary track.
- **Privacy is not on their list.** The simulated review in `plans/reviews/judge_whitechain.md` reaches the same reading: privacy counts only when it makes a business more willing to take USDT.
- **"Good to know" signals compliance caution.** "Prize distribution is managed directly by ETHGlobal in USDC (or equivalent) under standard event eligibility and compliance guidelines." Combined with Tokenize's "compliance logic onchain", it rewards rules that sit in contracts (allowlists, freezes, maturity), not KYC theatre in a UI.

---

## 7. How comparable sponsors' problem statements changed, and what it signals for Whitechain now

### Sourced timeline (prize pages linked in section 3)

| Family | 2023 to 2024 | 2025 | 2026 | Mumbai 2026 |
|---|---|---|---|---|
| Circle / Arc | "Dollar Access", "Cross-Border Payments", "Emerging Use Cases", Web3 Services, CCTP (London, Brussels, SF, Singapore, Bangkok) | "Build a Multichain USDC Payment System" (CCTP V2), "Enable end users to pay for gas using USDC" (Paymaster), "Create a Gasless Experience" (Taipei, Cannes, New York); Arc debuts at Buenos Aires with "Advanced Stablecoin Logic", Bridge Kit, Gateway treasury | Arc only: Liquidity Hub, Payouts and Treasury, RWA Agentic Commerce (HackMoney); Nanopayments, Prediction Markets (Cannes, New York); Agentic Economy, DeFi (ETHOnline) | Arc requires Arc Studio for every prize ("Built in Arc Studio") |
| PayPal USD | none | "Transformative Use of PYUSD", "Payment-Focused", "Consumer Champion" (New York, ETHOnline, New Delhi $10,000) | absent | absent |
| Polygon | zkEVM, Polygon ID, AggLayer | "Real World Payments" (Venmo-like, gasless), "Real World Assets" (Taipei); "Best Use of Payments on Polygon" with x402 plus merchant flows (Buenos Aires $10,000); x402 agentic (New Delhi $10,000) | absent | absent |
| Base / Coinbase CDP | AA and Base Paymaster, 4337, Onchain Product, payments on Base, Checkout component | CDP "Build a Great Onchain App" ($20,000), AgentKit | absent | absent |
| Hedera tokenization | EVM starter bounties | EVM and AI tracks | "Tokenization on Hedera" (HTS, lifecycle, Cannes, Lisbon, New York); "Tokenization of Anything" (Asset Tokenization Studio, ERC-3643, repo collateral, ETHOnline) | "Tokenize Anything with Hedera Studios" |
| Whitechain | none | none | none | Operate, Tokenize, Scale (plus Continuity) |

### Judgement: what the arc of these statements says about Whitechain now

- **Generic stablecoin payments have moved on to more specific briefs.** Circle went from "Build with USDC" (2024) to named mechanisms (CCTP V2 hooks, Paymaster, Gateway) to its own chain with its own builder tool (Arc Studio, Mumbai). Polygon went from "Venmo-like" to "bring payment transaction count up (no botting!)". Whitechain is earlier on this curve, as a new chain like Arc at Buenos Aires 2025. Its brief is still the generic form (merchant payments, RWA, invisible UX), but it already carries 2026-grade guardrails: real token only, a feedback file, an anti-drain answer, and transfer rules in the contract.
- **The x402 wave is tolerated, not sought.** Whitechain lists x402 as one of three Scale starting points, with "a facilitator you run". It also bans "AI chats that never actually pay anyone". Next to Hedera's $6,500 x402 track and 0G's agent track at the same event, x402 is not where Whitechain's own money is concentrated ($3,000 for the whole Scale track).
- **RWA briefs moved from "tokenize something" to "enforce lifecycle".**
  - In 2025, Polygon asked for "Pokémon-style digital collectibles, tokenized real estate".
  - In 2026, Hedera asked for "real lifecycle management ... favoured over a token with a name on it" and named repo collateral.
  - Whitechain's Tokenize is the 2026 form: four named instruments (notes with coupons, invoice financing, repo with DvP, trade finance with multi-party confirmation), plus "Real transfer rules enforced in the contract".
- **Signal for the team.** Whitechain is buying proof that its chain works for business. That means a reusable merchant component, a real RWA state machine, and a relayer that holds up under attack. It is not buying novelty for its own sake. Novelty still matters for the finalist round, and the "Finalist angle" in section 5 of the ideas file covers that split.

### Mapping each current track to its nearest past tracks

| Mumbai track | Nearest past tracks | Status | What changed |
|---|---|---|---|
| Operate · Stablecoin Payments for Business | Circle "Build a Multichain USDC Payment System" (Taipei, Cannes, New York 2025); PayPal "Payment-Focused Use of PYUSD" (New York 2025); Polygon "Best Use of Payments" (Buenos Aires 2025); Unlimit "Crypto Checkouts" (SF 2024); CDP Checkout pool (Bangkok 2024); Canton "Payments & Neobanking" (New York 2026) | **New for Whitechain; changed against the analogs** | Single chain, single token (USDT), no cross-chain angle. Adds the 20-line drop-in test, both views, post-payment extra credit, and bans payroll, escrow, revenue splits, tipping and bill splitters on their own |
| Tokenize · Real World Finance on Whitechain | Hedera "Tokenization on Hedera" and "Tokenization of Anything" (2026); HashKey "RWA Tokenization Compliance" (Taipei 2025); Curvegrid "Best RWA Tokenization Project" (Buenos Aires 2025, Tokyo 2026); Canton "TradFi, RWA & Tokenized Assets" (New York 2026); Kadena RWA (New Delhi 2025) | **New for Whitechain; repeated in substance** | Every payment must be USDT on Whitechain; four named instruments; the Operate and Tokenize boundary rule; an explicit ban on mint-button tokens and unenforced ownership NFTs |
| Scale · Payments Nobody Notices | Circle "Create a Gasless Experience" and "pay for gas using USDC" (2025); Base AA and Paymaster (2023 to 2024); Celo stable gas (Brussels 2024); Dynamic "Abstract Away Crypto" (Brussels 2024); Polygon "Real World Payments" (Taipei 2025) and x402 (Buenos Aires, New Delhi 2025); Arc nanopayments (2026) | **New for Whitechain; changed against the analogs** | Adds the relayer economics and anti-drain requirement, which no analog asked for, and bans payer-paid gas and AI chats that never pay. Self-run relayer or facilitator is expected (no hosted bundler supports 1874) |

---

## 8. Patterns from the existing repo notes that still apply

- From `reports/ETHGlobal finalist ideas 2023 to 2026.md`: about half of recent finalists won no partner prize, and the finalist demo and the partner submission are effectively two products sharing one codebase. RWA was the primary tag of only 4 of 320 finalists, and no finalist built invoice financing. Section 5 here shows the second fact does not hold at the submission level in 2026.
- From `plans/reviews/judge_whitechain.md` (simulated Whitechain review of Plan C): Operate 7/10, forecast 2nd. The main risks were the prize USDT gate, a "staged" zero-crypto payer, a checkout that can block, and a relayer "safe from theft but easy to take offline". The likely rival was "a plain but polished merchant SDK".
- From `track_ideas/00_season.md`: stablecoin supply is flat at about $300.6B, so the pitch should be controls a judge can verify, not growth. The Binance drain (29 Oct, 50 EIP-7702 authorizations) is the week's dominant security story, and CoinDCX lost $15.99M USDT from retired wallets on 25 Oct. Both are hooks for merchant key and refund controls.

---

## 9. Chain facts checked today that change the build

### Sourced (own probes, 2026-10-31)

- **Prize USDT `0xcedf...55a7`.**
  - totalSupply 1,945,270.000000 (6 decimals) and 36 holders, up from 10 holders on 26 Oct.
  - The largest holder has 999,999 USDT and the second 633,720. Three contracts each hold 20k to 162k.
  - `paused()` reverts (no such function), so pausing is not exposed that way.
  - Docs `llms-full.txt` (366 KB) contains no faucet or distribution path for this address, and the WBT faucet page does not mention USDT.

  ([Blockscout token API](https://explorer.testnet.whitechain.io/api/v2/tokens/0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7); [holders](https://explorer.testnet.whitechain.io/api/v2/tokens/0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7/holders); [rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io); [docs llms-full.txt](https://docs.whitechain.io/llms-full.txt); [faucet](https://faucet.testnet.whitechain.io))
- **DEX liquidity in the prize USDT.** A verified `UniswapV3Factory` at `0x94afa2ab80e44163362d2952bdf1e95b81900738` (creator `0xd453c3e2...`) has pools that `factory()` reports as its own:
  - WWBT (`0x4200...0006`) and USDT pool `0x5645101C...F999`: 1,498.39 WWBT and 117,545.55 USDT, fee 3000;
  - ETH and USDT pool `0x426614fC...b5D`: 66.25 ETH and 162,185.68 USDT, fee 3000;
  - USDC.e and USDT pool `0x55be7666...B900`: 22,792.66 and 20,466.74, fee 100.

  A `SwapRouter02` is verified at `0xe208cC685cD95D56E8ec6DEC9816476567fc6962`. The Whitechain docs' Blockscout examples also show a "UniswapV3Pool" holder.

  ([factory](https://explorer.testnet.whitechain.io/api/v2/addresses/0x94afa2ab80e44163362d2952bdf1e95b81900738); [WWBT/USDT pool balances](https://explorer.testnet.whitechain.io/api/v2/addresses/0x5645101Ca8d2F7BaBC27b10359555767a1BdF999/token-balances); [router search](https://explorer.testnet.whitechain.io/api/v2/smart-contracts?q=SwapRouter); [docs llms-full.txt](https://docs.whitechain.io/llms-full.txt))
- **Head block** 11,826,556 on Whitechain Sepolia ([rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io)).

### Judgement

- **Getting the prize USDT.** The implied pool price is about 78 USDT per WBT. One faucet drip (0.5 WBT per 24 h per GitHub account) should buy about 39 prize USDT through SwapRouter02, so three accounts give about 117 USDT a day. That is likely enough for a demo with refunds recycling funds. It is the real token, so it does not fall under "a test token you minted yourself". It removes most of the binary risk flagged in `plans/reviews/judge_whitechain.md`.
  - Verify before relying on it: quote the swap with QuoterV2 and confirm the pool is not paused or permissioned.
  - Doing the swap before Thursday 21:00 is environment setup, not project code.
- **The relayer's WBT supply.** Scale's question has a concrete answer: a refill job swaps USDT fees into WWBT on this pool and unwraps. The price is visible onchain, and with a TWAP from the pool's `observe()` it is harder to manipulate than the spot price.
- **The Uniswap fit is open.** This is a Uniswap v3 deployment by a third party (probably the YetiTrade testnet listed in Whitechain's resources), not one Uniswap Labs runs. Whether Uniswap Foundation's "integrate any part of the Uniswap stack" counts it is unknown; ask at the event (their workshop clashes with Whitechain's at 16:30).

---

## 10. Gaps and caveats

- Whitechain has no past winners, so every claim about "what Whitechain's judges reward" is inference from its text and from analog sponsors.
- Project pages returned a bot check from about 10:27 IST, and I stopped. These winners' exact track names are therefore unconfirmed (sponsor only): Taipei Circle and organisation 6tfor; Cannes 2025 Circle; Hedera at Cannes 2026, Lisbon 2026 and ETHOnline 2026 (except Finvoice, via search snippet); Arc at Cannes 2026 and ETHOnline 2026.
- Organisation 6tfor is identified as HashKey only from its logo file name (WechatIMG538.jpg) and the Taipei track list. Treat it as unconfirmed.
- The keyword census uses name and tagline only, and listings do not show which tracks a non-winner entered. So "non-winner" means "no partner prize shown", not "lost this track".
- The ETHOnline 2025 listing parsed 633 of the 634 projects ETHGlobal reported ("10 projects that stuck out from 634 built", in the finalist catalogue).
- The judging panel is unnamed, and no numeric rubric is published.
