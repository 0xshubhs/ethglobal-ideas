# Ethereum Foundation at ETHGlobal: track history, winners and what the judges reward (late 2023 to October 2026)

Written 2026-10-31 for the ETHGlobal Mumbai pass (5 to 7 Nov 2026). Companion file: `track_ideas/ideas_draft/ef.md`.

## 0. Method and sources

- **Event list:** parsed the `type:"hackathon"` objects in the raw Next.js data of [ethglobal.com/events](https://ethglobal.com/events) (fetched 2026-10-31). 34 hackathons fall between ETHOnline 2023 (Oct 2023) and Tokyo 2026 (Sep 2026), plus Mumbai.
- **Prize text:** fetched `https://ethglobal.com/events/<slug>/prizes` for all 34 (one request every 3 seconds, all HTTP 200, no bot check) and decoded the embedded sponsor objects (`name`, `prizeAmount`, each prize's `description`, `qualifications` and `items`). Every sponsor named "Ethereum Foundation" or "Privacy + Scaling Explorations" (PSE, an EF team) was kept. Quotes below are verbatim from those objects, with emojis dropped. The EF sponsor subpage of each event is `https://ethglobal.com/events/<slug>/prizes/ethereum-foundation` (PSE at Circuit Breaker: `/prizes/privacy-scaling-explorations`).
- **Winners:** paged through every showcase listing `https://ethglobal.com/showcase?events=<slug>&page=N` for the nine EF events and kept each project whose prize list carries the EF organization (uuid `362vt`) or PSE (`pxs8d`). Each such project page was then opened for its sponsor, prize and place badges, description and "How it's made" text.
- **Comparison set:** projects whose name or tagline names the EF technology (Fe, Anon Aadhaar, MACI, TLSNotary, ZK Email, Mopro, zkPDF, EIL) but which won no EF prize. 21 were opened. Tagline matching misses projects that mention the technology only in their body text, so the set is a sample, not a census.
- **Bot checks:** Cloudflare "Just a moment" pages appeared on 11 project pages fetched at 8 to 10 second spacing (other workflow agents were fetching ethglobal.com at the same time). We did not try to get around them. We retried each once, 25 seconds apart; 10 then loaded. One page (CryptoForce, Brussels) stayed blocked, so its placement is inferred from the listing data and marked as such.
- **Reused notes:** `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` (Q5, past EF and privacy winners), `research_notes/ETHGlobal finalist ideas 2023 to 2026/` (finalist catalogues), and the Mopro team's own winner posts ([Cannes 2025](https://zkmopro.org/blog/ethglobal-cannes-2025), [New Delhi 2025](https://zkmopro.org/blog/ethglobal-new-delhi)).
- Anything labelled **Judgement** is our inference, not an EF statement.

## 1. Summary: nine EF events in three years, then the largest EF pool yet

| Event (slug) | Dates | EF team or product | Tracks and pool | Winners found |
|---|---|---|---|---|
| ETHGlobal Istanbul (`istanbul`) | 17 to 19 Nov 2023 | Fe language | "Build something with Fe", $5,000 (3 x $1,666.67) | 3 of 3 |
| ETHIndia 2023 (`ethindia2023`, run by Devfolio, listed on ETHGlobal) | Dec 2023 | PSE Anon Aadhaar | 3 tracks, $10,000 | 5 of 5 |
| Circuit Breaker (`circuitbreaker`, online, ZK themed) | 2 to 21 Feb 2024 | PSE (Proof of Email, Bandada, Semaphore, Anon Aadhaar, MACI) | 5 tracks, $5,000 ($1,000 each) | 5 of 5 (4 projects) |
| ETHGlobal London (`london2024`) | 15 to 17 Mar 2024 | PSE MACI | "Best use of MACI", $6,000 | 5 of 5 |
| ETHGlobal Brussels (`brussels`) | 12 to 14 Jul 2024 | PSE TLSNotary and ZK Email | 3 tracks, $6,713 | 8 of 8 (1 inferred) |
| ETHGlobal Singapore (`singapore2024`) | 20 to 22 Sep 2024 | PSE MACI | "Best Overall Use of MACI", $7,500 | 5 of 5 |
| ETHGlobal Cannes (`cannes`) | Jul 2025 | Mopro | "Best use of ZK on Mopro", $5,000 | 3 of 3 |
| ETHGlobal New Delhi (`newdelhi`) | 26 to 28 Sep 2025 | Mopro and zkPDF (client-side privacy) | 2 tracks, $5,000 | 4 of 4 |
| ETHGlobal Buenos Aires (`buenosaires`) | 21 to 23 Nov 2025 | Ethereum Interop Layer (EIL) SDK, ERC-4337 lineage | "Best use of the EIL SDK", $6,000 | 2 of 2 |
| **ETHGlobal Mumbai** (`mumbai`) | 5 to 7 Nov 2026 | **Access Layer cluster: Anon-RPC, alt mempool, CROPS** | **4 tracks, $15,000 ($13,500 fresh)** | not yet held |

Sources: the prize pages named in each row; showcase listings; project pages linked below.

Events in the window with **no EF or PSE prize** (checked on their prize pages): ETHOnline 2023, LFGHO, Scaling Ethereum 2024, Sydney, HackFS 2024, StarkHack, Superhack 2024, ETHOnline 2024, San Francisco 2024, **Bangkok (Devcon SEA week)**, Agentic Ethereum, Trifecta, Taipei, Prague, Unite DeFi, New York 2025, ETHOnline 2025, HackMoney 2026, Cannes 2026, Open Agents, New York 2026, Lisbon 2026, ETHOnline 2026 and Tokyo 2026. (The Sydney, HackFS and Scaling 2024 pages mention the EF only as the giver of a Devcon ticket discount to finalists.)

Three facts frame Mumbai:
1. **There was no EF prize at any ETHGlobal event in 2026 before Mumbai** (prize pages above). The Mumbai prizes come from the Access Layer cluster created in the June 2026 restructuring ([EF structure](https://blog.ethereum.org/en/2026/06/23/ef-structure), via `reports/EF tracks and Whitechain ideas.md`). This is a new judging team at ETHGlobal.
2. **$15,000 is the largest EF pool in the window.** The previous maximum was $10,000 at ETHIndia 2023.
3. **The place splits are inherited.** Anon-RPC and alt mempool ($2,500 / $1,500 / $1,000) match Cannes 2025 Mopro exactly. CROPS App ($2,000 / $1,000 / $500) matches New Delhi 2025 "Best Applications on General Privacy" exactly ([Cannes prizes](https://ethglobal.com/events/cannes/prizes); [New Delhi prizes](https://ethglobal.com/events/newdelhi/prizes)).

Outside ETHGlobal, the EF ran its own x402 hackathon, whose winners were announced on 19 Jan 2026 (x402-sf, Cheddr Payment Channels, x402r), according to a KuCoin item republishing BlockBeats, a secondary source ([KuCoin](https://www.kucoin.com/news/flash/ethereum-foundation-announces-x402-hackathon-winners-including-x402-sf-and-cheddr-payment-channels-x402)). No Anon-RPC or alt-mempool prize was found at any earlier hackathon (web search, 2026-10-31).

## 2. Event by event: tracks (verbatim) and winners

### 2.1 Istanbul, Nov 2023: "Build something with Fe" ($5,000, three equal prizes)

- Description: "This prize is meant to encourage the development of things using Fe. It could be a set of contracts that solve some kind of on-chain problem or a library that provides broadly useful functionality."
- Qualification: "Whatever it may be, it must be written in Fe to qualify for one of these prizes. Project evaluation will be based on the complexity, usefulness, and quality of the implementation." Example ideas: "DAO/Multisig contracts", "Cryptography libraries", "Memory map type". ([Istanbul prizes](https://ethglobal.com/events/istanbul/prizes))
- Winners (badge "Build something with Fe"):
  - **FeFe**: "Ethereum flash loans written in Fe, tested with Fe, using Foundry cheatcodes". It reimplemented "a subset of Foundry's VM interface" in Fe so that Fe tests could use `prank`. ([FeFe](https://ethglobal.com/showcase/fefe-ats5h))
  - **Fe-bernace**: a Merkle airdrop "fully made with Fe defaults feature, from deployment to tests", deployed on Scroll Sepolia, with an honest limit: "because there is no dynamic array types, the version is not generic". ([Fe-bernace](https://ethglobal.com/showcase/fe-bernace-701kp))
  - **TripBloc**: decentralized hotel bookings, which also collected six other sponsors' pool prizes. ([TripBloc](https://ethglobal.com/showcase/tripbloc-qm9c8))
- Comparison: the listing shows no other project naming Fe in its tagline, so this track was barely contested.

### 2.2 ETHIndia 2023, Dec 2023: Anon Aadhaar ($10,000)

- "Best use of Anon Aadhaar SDK" ($8,000: $4,000 / $2,500 / $1,500): "This prize will reward the best apps built with the Anon Aadhaar SDK." Qualification text: "Show off your technical prowess, exceptional UX/UI, and problem-solving capabilities."
- "Best implementation of Anon Aadhaar on mobile" ($1,000), judged on "Technical implementation excellence", "Demonstrated efficiency in proving time" and "Exceptional UX/UI design".
- "Best social good build with Anon Aadhaar" ($1,000): "Anon Aadhaar Use: Effective integration for impact. Social Impact Potential: Measureable and sustainable change." ([ETHIndia 2023 prizes](https://ethglobal.com/events/ethindia2023/prizes))
- Winners:
  - 1st **BackItUp**: "login with your signed Aadhaar card, and setup recovery for your wallets", with recovery decentralized through a Safe recovery module, Chainlink Functions and Airstack. ([BackItUp](https://ethglobal.com/showcase/backitup-oghff))
  - 2nd **agoraCrypt**: voting that "Stops potential doxxing and deanonimization of users and their votes", built with "Multiple ZK Primitves". ([agoraCrypt](https://ethglobal.com/showcase/agoracrypt-fc51h))
  - 3rd **Aadhaar Shield**: a mobile app whose hard problem was compressing "the large ZK proofs generated by the Anon Aadhar SDK into a QR code's size limitations ... because QR makes the UX seamless". ([Aadhaar Shield](https://ethglobal.com/showcase/aadhaar-shield-peokf))
  - Mobile: **VerifyChainX**, which rewrote parts of the SDK for React Native: "Implemetation of Anon-aadhar sdk with react native due to its incompatable ... rewriting own sdk". ([VerifyChainX](https://ethglobal.com/showcase/verifychainx-1rete))
  - Social good: **Crypto Aid**, donations to Aadhaar-verified recipients. ([Crypto Aid](https://ethglobal.com/showcase/crypto-aid-z81zg))
- Non-winners that used or named Anon Aadhaar: **AadhaarChain** (Flutter app for "Aadhar updation", no proof mechanism described; won only "Deploy on Scroll", [page](https://ethglobal.com/showcase/aadhaarchain-duh5d)), **EtherHarbor Fund** (text is mostly a list of hypothetical benefits; won two Scroll prizes, [page](https://ethglobal.com/showcase/etherharbor-fund-n8t3k)), **ZeroLend** (microloans "based on on-chain reputation enabled by anon-aadhaar"; the build notes say "It was initially challenging to understand anon-aadhaar"; no prize, [page](https://ethglobal.com/showcase/zerolend-ghzuf)).

### 2.3 Circuit Breaker, Feb 2024: PSE tool suite ($5,000, five tracks of $1,000)

- Each track rewards projects that integrate one PSE tool, with the same two qualifications: "Integrating [tool] into a NEW project in a useful way" and "Integrating [tool] into an existing project can be accepted, but the utility must be high." MACI's text listed ideas such as "A frontend to manage MACI rounds" and "Build out a Subgraph for MACI to aid frontend development and data querying". ([Circuit Breaker prizes](https://ethglobal.com/events/circuitbreaker/prizes))
- Winners:
  - MACI: **maci-subgraph**, "a data layer for every frontend developers can be build on top of", plus "some love and contribution to the protocol, which I created PR at https://github.com/privacy-scaling-explorations/maci/pull/1203". It built one of the sponsor's own listed ideas. ([maci-subgraph](https://ethglobal.com/showcase/maci-subgraph-89h7c))
  - Anon Aadhaar: **Banganoir**, "an ERC4337 Wallet controlled by your Aadhaar identity", where the proof acts as the userOp signature (`signalHash` is "the hash of `userOpHash` ... to prevent on-chain front-running"), with NoirOTP as a second factor. ([Banganoir](https://ethglobal.com/showcase/banganoir-sozqd))
  - Proof of Email and Semaphore (both): **zkGitPerks**, anonymous perks for open-source contributors proven by zkEmail and claimed through Semaphore. ([zkGitPerks](https://ethglobal.com/showcase/zkgitperks-9af3e))
  - Bandada: **DAOConnect**, DAO creation with Bandada group membership verified "using Merkle proofs". ([DAOConnect](https://ethglobal.com/showcase/daoconnect-6jor6))
- Non-winners: **Semaphore Wallet** (a 4337 wallet with Semaphore identity in the iOS Secure Enclave, no prize, [page](https://ethglobal.com/showcase/semaphore-wallet-s7ja9)); **AnonUBI** (UBI claimed once per Anon Aadhaar proof, no prize, [page](https://ethglobal.com/showcase/anonubi-bd8xg)); **Annon Aadhaar** ("A simple example of Anon Aadhar", no prize).

### 2.4 London, Mar 2024: "Best use of MACI" ($6,000: $2,500 / $1,500 / $1,000 / 2 x $500)

- Description: "This prize is for the best overall use of MACI! Your integration should be fully functional end-to-end and deployed in testnet or mainnet."
- Qualifications, verbatim: "Is there a meaningful problem being solved with MACI? Does the project have potential to solve a real problem in production?"; "Was the project fully integrated on both the frontend and backend? Does the integration work end-to-end?"; "Is the project introducing novel implementations or new tech?"; "Is the project posing a creative solution to a problem? Is MACI being used in a new way?" ([London prizes](https://ethglobal.com/events/london2024/prizes))
- Winners (EF badge "Best use of MACI"):
  - 1st **Demokratia**: privacy-preserving AI agents vote in DAOs for apathetic voters. It has an iOS app with an on-device BERT encoder, a "trust-minimised zkML coordinator", "a modified MACI coordinator service", and manual override. It also won Nethermind 2nd. ([Demokratia](https://ethglobal.com/showcase/demokratia-c7bab))
  - 2nd **SkaffoldMACI+ZkOSIOS**: a reusable Scaffold-ETH 2 UI for all MACI contracts, an end-to-end CLI test script, and an upstream fix: "I found and fixed a minor bug, for which I submitted a pull request (PR #1304)". ([SkaffoldMACI](https://ethglobal.com/showcase/skaffoldmaci-zkosios-2no6q))
  - 3rd **Vota Protocol**: multichain public voting with World ID onboarding (also World "Best World ID Usage" 2nd). ([Vota Protocol](https://ethglobal.com/showcase/vota-protocol-qxf3z))
  - 4th **AnonVote**: MACI plus World ID through "a gatekeeper contract to MACI that allows only World ID verified users". ([AnonVote](https://ethglobal.com/showcase/anonvote-uc7w0))
  - 4th **Votelik Pollerin**: Farcaster Frame polls on MACI with a `SignUpWorldcoinGatekeeper` and a Pimlico Safe per voter for gasless votes (also World 1st). ([Votelik Pollerin](https://ethglobal.com/showcase/votelik-pollerin-u0dcs))
- Non-winner: **WNS.Vote** (quadratic voting with ENS and World ID, forked Compound Governance; won ENS and World prizes, not MACI, [page](https://ethglobal.com/showcase/wns-vote-cw6na)).

### 2.5 Brussels, Jul 2024: TLSNotary and ZK Email ($6,713)

- "Best Overall Use Case of TLSNotary" ($1,677, 2 x $838.50): "Awarded to the project that demonstrates exceptional innovation, social impact, privacy, and originality in utilizing TLSNotary." Qualification: "Use TLSNotary natively (Rust) or via the Browser extension to verify user data and do something useful with it."
- "Prize Pool for Plugin Developers" ($1,036, 3 x $345.33): "Develop and use a working TLSNotary plugin for verifying user data in your project".
- "Best Overall Use Case or Research with ZK Email" ($4,000: $1,500 / 2 x $750): "Must use any code, SDKs, or inspiration from the ZK Email open source repositories and tooling" and "Please have some sort of descriptive writeup or readme explaining how to build/use/understand your code". (The description field reads only "$43", a placeholder.) ([Brussels prizes](https://ethglobal.com/events/brussels/prizes))
- Winners:
  - ZK Email 1st **dnsRegistry-AVS**: a decentralized DKIM key registry built because "There is a need for a decentralised oracle network to provide such a service to projects like zkEmail by PSE. Currently they use oracle service from DFINITY". In other words, infrastructure for the sponsor's own stack. ([dnsRegistry-AVS](https://ethglobal.com/showcase/dnsregistry-avs-wb52m))
  - ZK Email 2nd **SHILL.WTF**: "Shillers register by proving they own a zkemail twitter NFT". ([SHILL.WTF](https://ethglobal.com/showcase/shill-wtf-q3ec9))
  - ZK Email 2nd **CryptoForce** (CRM rewards for sales teams). Inferred: the listing tags it with the EF organization, and its page stayed behind a bot check. ([CryptoForce](https://ethglobal.com/showcase/cryptoforce-jc4wq))
  - TLSNotary overall **Individuum**: an escrowed web-task market whose completion is proven with TLSNotary MPC, with a Stylus verifier. Also an ETHGlobal Brussels Finalist. ([Individuum](https://ethglobal.com/showcase/individuum-nyee0))
  - TLSNotary overall **Proof Royale**: wagers on web2 game results proven with TLSNotary. The team states it "ran into many issues trying to get TLSNotary working across almost all production sites, with the exception of Twitter". ([Proof Royale](https://ethglobal.com/showcase/proof-royale-fsivf))
  - Plugin pool: **Butlerian Jihad** (an Instagram-ownership TLSNotary extension, [page](https://ethglobal.com/showcase/butlerian-jihad-vw6s0)), **ZapDL** ("a wallet extension, forked from the tlsn team, but with a lot of changes", [page](https://ethglobal.com/showcase/zapdl-q05vf)) and **Notar Exchange** (P2P fiat swaps proven against Wise, [page](https://ethglobal.com/showcase/notar-exchange-dwgr5)).
- Non-winner: **zkWhistleBlower** (TLSNotary proofs of DMs plus World ID; won Scroll and World prizes, not EF, [page](https://ethglobal.com/showcase/zkwhistleblower-m66e1)).

### 2.6 Singapore, Sep 2024: "Best Overall Use of MACI" ($7,500: $3,000 / $2,000 / $1,250 / $750 / $500)

- Same rubric as London, plus the qualification: "Projects should be using maci libraries directly (SDK, contracts, circuits, etc.) or build on top of MACI Platform or the MACI Wrapper." ([Singapore prizes](https://ethglobal.com/events/singapore2024/prizes))
- Winners: 1st **PriVote** (open-source MACI polls with several sign-in options, Anon Aadhaar among them, [page](https://ethglobal.com/showcase/privote-hertg)); 2nd **PolyVote** (MACI on Linea, with Nillion MPC for private recommendation weights, [page](https://ethglobal.com/showcase/polyvote-6hwky)); 3rd **ChillVille** (MACI plus zkTLS via zkPass for sybil resistance, plus zkML; it also won Nethermind 1st, AirDAO 2nd and World, [page](https://ethglobal.com/showcase/chillville-6zo6g)); 4th **MACPI** ("Minimal Anti-Collusion Physical Infrastructure": NFC voting for people without smartphones, [page](https://ethglobal.com/showcase/macpi-r3i87)); 5th **Silent Wars** (a Telegram mini-app game whose governance runs on MACI, [page](https://ethglobal.com/showcase/silent-wars-dpayg)).
- Non-winners naming MACI: **EZKPoll** (polling and A/B tests on MACI, with a "Nodejs, Postgres DB for saving polling data", [page](https://ethglobal.com/showcase/ezkpoll-x37xw)); **zkElect** (elections with MACI on Optimism Sepolia, [page](https://ethglobal.com/showcase/zkelect-31ho6)); **maci-tbd**, **clr.wiki** (no prize); **QIVE** (MACI quadratic funding plus LST yield; won only a World pool prize, [page](https://ethglobal.com/showcase/qive-8nzq4)).

### 2.7 Cannes, Jul 2025: "Best use of ZK on Mopro" ($5,000: $2,500 / $1,500 / $1,000)

- Description: "Build a mobile-native ZK app using Mopro ... The only requirement is that the ZK proof must be generated client-side." Qualifications: "Generate mobile-native bindings (iOS/Android) using the Mopro SDK."; "All ZK proofs must be generated directly on the client (mobile device). Relaying proofs from a backend/server is not eligible."; "Apps that generate ZK proofs through embedded webviews or browser-based contexts are not eligible."; "Your app should be run on an iOS or Android simulator or physical device". ([Cannes prizes](https://ethglobal.com/events/cannes/prizes))
- Winners, with the Mopro team's own reasons ([Mopro blog, 29 Jul 2025](https://zkmopro.org/blog/ethglobal-cannes-2025)):
  - 1st **MobiScale**: "a complete end-to-end proof of photo-ID verification running entirely on a mobile device in under 90 seconds" (Secure Enclave, RISC Zero, Noir). Reason: "What makes this project remarkable is its practical approach to identity verification." ([MobiScale](https://ethglobal.com/showcase/mobiscale-n9vj6))
  - 2nd **Zkipper**: EIP-7702 roles, with Falcon post-quantum admin signatures and wristband-chip ZK signatures for low-risk actions. Reason: it "successfully integrated Gnark with Mopro within the 36-hour timeframe". Its write-up separates "Preexisting pieces", "Accomplished work" and "Mocked parts" (`judging_criteria.md` Q5). ([Zkipper](https://ethglobal.com/showcase/zkipper-czc3z))
  - 3rd **Proov**: tamper-proof media capsules. Reason: it "stood out not just for its technical implementation but for its exceptional UI/UX design". ([Proov](https://ethglobal.com/showcase/eyes-proov-at10u))
- Non-winners: **ZKAge Proof Mobile** (an age proof via Mopro and Circom on Flutter, [page](https://ethglobal.com/showcase/zkage-proof-mobile-2yroo)); **ProofOfFunds** (balance-threshold proofs on Android, [page](https://ethglobal.com/showcase/proofoffunds-zczod)); **BreedProof** (an animal DNA registry, [page](https://ethglobal.com/showcase/breedproof-fu7db)); **MoirPro** ("Minimal Flutter template"). The Mopro post lists ProofOfParticipation, ZKAge Proof Mobile, Bidet and ProofOfFunds as "notable" but unranked.

### 2.8 New Delhi, Sep 2025: client-side privacy ($5,000)

- "Best Infrastructure on Client-Side Privacy" ($1,500), with suggested topics "Unified ZK Registry System" and "NFC Feature Exploration".
- "Best Applications on General Privacy" ($3,500: $2,000 / $1,000 / $500): "All kinds of projects are welcome, especially innovative solutions for real-world problems", with "Credential Sharing", "Mobile Gaming" and "Matching Apps" as ideas.
- Both tracks share the qualifications "Built with, or integrated with, the Mopro stack or zkPDF", "If using Mopro, PoC must be capable of running on mobile devices; live demo preferred" and, for zkPDF, "without requiring a full server deployment for proof generation". ([New Delhi prizes](https://ethglobal.com/events/newdelhi/prizes))
- Winners, with the Mopro team's comments ([Mopro blog, 20 Oct 2025](https://zkmopro.org/blog/ethglobal-new-delhi)):
  - Infrastructure: **AccessFi**, NFC tap-to-pay event payments ("5-second NFC transactions that work on any EVM chain"), with physical cards demonstrated. ([AccessFi](https://ethglobal.com/showcase/accessfi-8v4ns))
  - 1st **zkETHer**: an ERC-20 mixer with proofs made on the phone through Mopro. Comment: "The circuit implementation is robust, though real-world feasibility needs improvement for production deployment." ([zkETHer](https://ethglobal.com/showcase/zkether-geppk))
  - 2nd **Wisk**: background checks from DigiLocker PDFs, with zkPDF compiled "Rust to WebAssembly" and run "entirely in the browser". ([Wisk](https://ethglobal.com/showcase/wisk-gdvfw))
  - 3rd **ZeroSurf**: a mobile browser with Anon Aadhaar age proofs made on device by Mopro. Comment: "how deeplinks can bridge mobile browsers and ZK proving apps". ([ZeroSurf](https://ethglobal.com/showcase/zerosurf-9988k))
- Non-winners: **Credora** (zkPDF plus Self plus PYUSD loans, described in feature bullets, [page](https://ethglobal.com/showcase/credora-fby45)); **ZLOB** (a private CLOB with Mopro and SP1, an ambitious "original idea was to build a rollup", [page](https://ethglobal.com/showcase/zlob-4do87)); **SewaChain** (uses Self for Aadhaar, not Mopro or zkPDF, so outside the gate, [page](https://ethglobal.com/showcase/sewachain-k2pxr)); ProofHire and ZK-AfterLife (zkPDF named in taglines, no prize).

### 2.9 Buenos Aires, Nov 2025: "Best use of the EIL SDK" ($6,000: 2 x $3,000)

- Description: "Build the best application using the EIL SDK, which is designed to make ETH and ERC-20 tokens seamlessly transferable across all L2 chains. Projects should demonstrate seamless token movement across multiple chains. ... As the EIL SDK is designed to boost usability, good UX will also play a role. Judges will evaluate creativity, functionality, and how effectively the project leverages the EIL SDK."
- Qualification: "Must demonstrate actual usage of the EIL SDK with relevant transaction payloads attached in the submission." The sponsor text states that EIL "is closely integrated with ERC-4337 and build on top of Account Abstraction". ([Buenos Aires prizes](https://ethglobal.com/events/buenosaires/prizes))
- Winners:
  - 1st **Open Paymaster**: "a decentralized, trustless paymaster built on ERC-4337 that enables gasless blockchain transactions through community-funded liquidity pools", with "Permissionless rebalancing". It is pitched against centralized paymasters' "Trust dependency" and "Liveness risk". Its EIL role is complementary: "While EIL CrossChainPaymaster covers gas on destination chains, the Open Paymaster covers the gas on the origin chain." ([Open Paymaster](https://ethglobal.com/showcase/open-paymaster-61jq1))
  - 2nd **REIL**: a cross-chain Aave rebalancer that "started with the provided eil-react-demo app as a boilerplate" (repo under `eth-infinitism`); "Most of the work was done on figure out how to create the proper batch of transactions". ([REIL](https://ethglobal.com/showcase/reil-v8bq8))
- Non-winners: **eil-rs** (a Rust port of the TypeScript SDK, no prize, [page](https://ethglobal.com/showcase/eil-rs-hfqp9)); **oneSig** ("EIL inspired" Merkle-root multichain signing; by its own text it does not use the SDK, [page](https://ethglobal.com/showcase/onesig-6wdvo)); **InteropSafe** (cut scope because of "the current constraints of the EIL SDK", [page](https://ethglobal.com/showcase/interopsafe-6mos8)); **MEGA Quant** (an Electron trading desk with EIL; won 1inch API only, [page](https://ethglobal.com/showcase/mega-quant-6bvz2)).

## 3. Why winners beat other entries in the same track (Judgement, from the comparisons above)

1. **The sponsor technology is the mechanism.** Banganoir makes the Aadhaar proof the userOp signature. ChillVille and AnonVote gate MACI sign-up with a second proof. Wisk runs zkPDF in the browser because the PDF must never leave. Losers named the technology without a mechanism: AadhaarChain describes "Aadhar updation" with Flutter issues as its challenges, EtherHarbor lists hypothetical benefits, and ZKAge Proof Mobile proves age, which is the tool's demo case.
2. **The hard gate is met literally.** Cannes excluded webviews and server proving; every winner proved natively on device. New Delhi's gate was "Mopro stack or zkPDF", and SewaChain (Self Aadhaar) sits outside it. Buenos Aires asked for "transaction payloads attached", and oneSig ("EIL inspired") did not use the SDK.
3. **Work that helps the sponsor team itself wins.** maci-subgraph built a listed idea and sent PR #1203. SkaffoldMACI sent PR #1304 and a reusable UI. dnsRegistry-AVS solved zkEmail's own oracle dependency. FeFe built Fe test tooling. Open Paymaster is AA infrastructure that removes a trusted operator. Not every SDK port wins, though: eil-rs (a pure port) placed nowhere.
4. **Composition of two or three primitives into one product.** Votelik (MACI, World ID, Pimlico), ChillVille (MACI, zkTLS, zkML), Zkipper (7702, Falcon, ZK) and MobiScale (Secure Enclave, RISC Zero, Noir). Single-primitive apps at the same events (EZKPoll, zkElect, ProofOfFunds) took nothing.
5. **Honesty about limits does not hurt.** Fe-bernace names its missing dynamic arrays, Proof Royale names TLSNotary's site failures, and Zkipper lists "Mocked parts"; all placed. Mopro's own comment on its 1st place (zkETHer) concedes that "real-world feasibility needs improvement".
6. **Polish and UX decide the lower places.** Proov (3rd, "exceptional UI/UX"), ZeroSurf (3rd, deeplinks and an NPM button), Aadhaar Shield (3rd, QR compression "because QR makes the UX seamless").
7. **Many EF winners also won other sponsors' prizes.** ChillVille won four prizes, Votelik and Vota Protocol stacked with World, Demokratia with Nethermind, Individuum with Arbitrum and the finalist badge. EF judging did not penalize stacking.
8. **Finalist overlap is rare.** Of the 39 EF or PSE winning projects above, only Individuum was also an ETHGlobal finalist (badge on its page). EF prizes and finalist slots reward different things; plan the demo and the README separately.

## 4. How the EF's problem statements changed, and what that signals

| Period | Who sets the track | Shape of the ask | Example wording |
|---|---|---|---|
| Nov 2023 | Fe team | Adopt a language | "it must be written in Fe" |
| Dec 2023 to Sep 2024 | PSE (Anon Aadhaar, MACI, TLSNotary, ZK Email, Semaphore, Bandada) | Integrate our SDK into an app; end to end and deployed | "Integrating [tool] into a NEW project in a useful way"; "fully functional end-to-end and deployed" |
| Jul to Sep 2025 | Mopro and zkPDF (client-side proving) | A property of where computation happens, enforced as a gate | "All ZK proofs must be generated directly on the client"; "without requiring a full server deployment" |
| Nov 2025 | EIL (ERC-4337 lineage) | Use the SDK, attach real transactions | "relevant transaction payloads attached in the submission" |
| Nov 2026 | Access Layer cluster | Build to a property (CROPS); produce or consume anonymity; break and improve mempool rules | "structural (works without you) beats cosmetic (a setting)"; "how much of the app's traffic goes through Anon-RPC"; "a link to your admitted transaction" |

What the shift signals (**Judgement**):
- **From "use our tool" to "prove the property".** PSE-era tracks rewarded integration and social impact. Mopro introduced a hard architectural gate (client-side only). Mumbai generalizes it: CROPS is tool-agnostic ("EF tooling is optional"), and its scoring asks whether the property survives the team disappearing. The Mandate (Mar 2026) explains why: CROPS "must never be traded away for convenience" and the EF wants a credible "zero option" for every intermediated flow (`reports/EF tracks and Whitechain ideas.md`).
- **Criteria became explicit and measurable.** Earlier tracks used adjectives ("innovation, social impact, privacy, and originality"). Mumbai gives counts and artifacts: traffic share, an admitted tx link, a README CROPS section with four lines, a video moment where the backend is switched off.
- **Identity proofs are out.** Anon Aadhaar was the centre of three tracks in 2023 to 2024 and appeared again as a winner in 2025 (ZeroSurf). Mumbai names no identity tool, and the Mandate's identity quandary warns against treating a government ID wrapped in ZK as automatically CROPS (`reports/EF tracks and Whitechain ideas.md`). An India-flavoured Aadhaar build is no longer the safe EF bet it was at ETHIndia 2023.
- **Infrastructure lanes are now explicit.** Circuit Breaker's MACI text hinted at it ("Build out a Subgraph"), and New Delhi had a separate infrastructure track. Mumbai writes it into two tracks: "produces anonymity via a new Anon-RPC worker", "implement/fork the anon-rpc harness", "developer tooling", "break the rules and improve them".
- **The AA lineage continues.** The EIL track (ERC-4337 based, demo boilerplate under `eth-infinitism`) is the direct predecessor of the alt mempool track, which applies "ERC-7562-style staking and reputation rules" (the 4337 mempool rules) to EIP-8141 frames. Alex Forshtat, named as on site for the alt mempool, is an ERC-4337 co-author ([ERC-4337 authors](https://eips.ethereum.org/EIPS/eip-4337)). Judgement: the same values that made Open Paymaster win (permissionless, no trusted operator, real transactions) are the likeliest tiebreakers for the alt mempool judges.

## 5. Current Mumbai tracks mapped to their nearest past tracks

| Mumbai track (fresh) | Nearest past EF tracks | Status | What carried over | What is new |
|---|---|---|---|---|
| Best Use of Anon-RPC ($5,000) | New Delhi "Best Infrastructure on Client-Side Privacy"; Cannes Mopro (client-side gate); Circuit Breaker PSE tool tracks (adopt a tool, infra welcome) | **New** (first EF network-privacy prize at ETHGlobal) | Same split as Cannes Mopro; a "by default" gate like "proofs must be generated directly on the client"; infra lanes | Privacy of reads, not of data; a traffic-share criterion; worker and harness lanes that "produce" anonymity |
| Best use of the Frame Transaction Alternative Mempool ($5,000) | Buenos Aires "Best use of the EIL SDK" | **Changed** (same AA lineage, new technology) | Real transactions as the gate ("payloads attached" becomes "admitted transaction"); creativity and "how well it works" in the criteria | Devnet-only technology; "break the rules" lane (DoS, fuzzers); the team must "explain the design, the code and the trade-offs" |
| Best CROPS App ($3,500) | New Delhi "Best Applications on General Privacy" (identical $2,000 / $1,000 / $500 split); Singapore and London MACI ("fully functional end-to-end") | **Changed** | Same money and split; "works end to end"; real-world problem | Tool-agnostic; "structural beats cosmetic"; README CROPS section; no trackers; video kill-switch moment; "(tbc: final review pending)" |
| Best CROPS Upgrade (Continuity) | none | New, **not eligible for us** | | |

Analogous sponsor tracks (since the EF itself had no 2026 ETHGlobal prize before Mumbai): Unlink's private DeFi and payments prizes at Cannes 2026 and NYC 2026 (Warden, Manila, Pampalo) and the CROPS-flavoured 2026 finalists (VEIL VPN, UNSU, Carte Bleue, EVM PORST). They show the same pattern of one verifiable claim proven live (`judging_criteria.md` Q5).

## 6. Pattern tags used by the idea draft

- **H1 Centrality** (section 3 item 1). **H2 Hard gate first** (item 2). **H3 Ecosystem contribution** (item 3). **H4 Honest, demo-able claim** (item 5). **H5 Composition** (item 4). **H6 UX for the lower places** (item 6). **H7 Thin wrappers lose** (items 1 and 4, the non-winner side).

## 7. What this means for Mumbai (Judgement)

1. **Gate first, then depth.** Each Mumbai track has one literal gate: reads by default; an admitted tx link; the README CROPS section with a 3 minute video. Past EF judges dropped entries that missed the gate (SewaChain, oneSig) regardless of quality.
2. **Build something the Access Layer team would merge or reuse.** maci-subgraph, SkaffoldMACI, dnsRegistry-AVS and Open Paymaster are the strongest precedent. A harness, worker, paymaster test suite or SDK that the team can link from its docs is the safest route to 1st.
3. **Compose two EF artifacts or one EF artifact plus one partner primitive.** Anon-RPC plus proof verification; frames plus a quota or keystore; CROPS plus ENSv2 or Arkiv. Single-feature entries placed third at best in past events.
4. **State limits in the README.** The Anon-RPC rubric invites declared exclusions, and CROPS asks for "trade-offs ... stated in the README". Past winners that disclosed mocks placed anyway.
5. **Expect a new judging culture.** This is the Access Layer team's first ETHGlobal judging (no 2026 EF prize before Mumbai), and its rubrics read like engineering acceptance tests, not like PSE's adoption prizes. Use the workshop (Thu 17:00, Room 2) to confirm what counts.

## 8. Gaps

- Placements come from badges on project pages. ETHIndia 2023 badges are generic ("1st place"), so the sponsor was taken from the badge's prize object (sponsor "Ethereum Foundation", prize "Best use of Anon Aadhaar SDK").
- CryptoForce (Brussels) stayed behind a bot check; its ZK Email 2nd place is inferred by elimination.
- London's five slots (1st to 3rd plus two 4th places) are all accounted for by the five EF-tagged projects in the London listing.
- The comparison set is tagline-based (21 projects). It cannot prove why a specific project lost; the reasons above are inferred from what each page claims.
- No EF judge notes or scores are public for any event, except the Mopro team's two blog posts.
- ETHIndia 2023 dates are from the finalist catalogue (Dec 2023); the exact days were not re-checked.
