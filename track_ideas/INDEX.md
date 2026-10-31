# ETHGlobal Mumbai track idea harness: index

Written 2026-10-31 for ETHGlobal Mumbai, 5 to 7 November 2026 (hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST), Jio World Convention Centre, Mumbai, alongside Devcon 8 India. Prize page: [ethglobal.com/events/mumbai/prizes](https://ethglobal.com/events/mumbai/prizes).

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build only, no existing project.

**Fresh builds only.** Every idea in this folder starts from an empty repo at Thu 21:00 and uses only public libraries, SDKs and starter kits. The Continuity-only tracks were skipped and appear only in the list in section 3.2.

**How to read this file.** Lines marked **Fact** carry a URL or name the repo note that carries it. Everything marked **Judgement** is opinion: scores, rankings, picks, hour figures. No ETHGlobal page was re-fetched for this index; prize and rule text is the 2026-10-31 snapshot in [`00_current_tracks.md`](00_current_tracks.md), taken that morning with no bot check shown. ETHGlobal pages returned Cloudflare checks and HTTP 429 at other points this week (`history/ef.md`, `history/arc.md`, `history/chainlink.md`), so later phases reused the snapshot rather than fetching again.

---

## 1. How this harness works

The harness is a multi-agent workflow described in [`../harness/README.md`](../harness/README.md). Each phase writes files that the next phase reads.

| Phase | What runs | Files it wrote |
|---|---|---|
| 1. Tracks | A live-tracks agent and a market-season agent, in parallel | [`00_current_tracks.md`](00_current_tracks.md) (verbatim prize, rule and schedule text, workshop table, changes since 26 Oct); [`00_season.md`](00_season.md) (what is in season this week: Binance drain, Glamsterdam delay, ENSv2, Anon-RPC 0.4.0, frame transactions, clear signing, Aqua) |
| 2. Sponsor history | One historian per sponsor | `history/<sponsor>.md`: past tracks, winners and named non-winners, why they won ([0G](history/0g.md), [1inch](history/1inch.md), [Arc](history/arc.md), [Arkiv](history/arkiv.md), [Chainlink](history/chainlink.md), [Definitive](history/definitive.md), [EF](history/ef.md), [ENS](history/ens.md), [Hedera](history/hedera.md), [Uniswap](history/uniswap.md), [Whitechain](history/whitechain.md), [World](history/world.md)) |
| 3. Sponsor ideas | One idea designer per sponsor | `ideas_draft/<sponsor>.md` (raw drafts, superseded) |
| 4. Sponsor judges | One judge panel per sponsor, playing that sponsor's judges plus a feasibility skeptic | `ideas/<sponsor>.md`: vetted, repaired, ranked ideas per track, a combo pass, top 3 and workshop questions (table in section 4) |
| 5. Workshop questions | One agent, alongside phases 6 and 7 | [`workshop_questions.md`](workshop_questions.md): questions by workshop slot, who attends, what each answer changes, pre-event asks, Friday booth plan |
| 6. Track combos | A combo designer, then an adversarial checker | [`track_combos.md`](track_combos.md) (eight stacks within the 3-partner cap); [`track_combos_check.md`](track_combos_check.md) (verdicts and required trims) |
| 7. Finalist ideas | A candidate generator, then three judges | [`finalist_ideas_draft.md`](finalist_ideas_draft.md) (16 candidates); [`finalist_judges/generalist.md`](finalist_judges/generalist.md), [`finalist_judges/originality.md`](finalist_judges/originality.md), [`finalist_judges/feasibility.md`](finalist_judges/feasibility.md) |
| 8. Synthesis | One editor | [`finalist_ideas.md`](finalist_ideas.md) (ten ranked finalist ideas) and this index |

Reused research from earlier work (not re-researched): `reports/ETHGlobal finalist ideas 2023 to 2026.md` (320 finalists, patterns, open lanes), `reports/EF tracks and Whitechain ideas.md`, `research_notes/` (EF, Anon-RPC, alt mempool, Whitechain, privacy notes and the five finalist catalogues), and `plans/` with `plans/reviews/`.

**Finalist merge rule (phase 8).** Keep a candidate if the three finalist judges average at least 7 and at most one says "drop". Four passed as written (Truthsign 8.00, Residue 7.67, Upgrade Council 7.00, Regas 7.00). Six near-misses were revised against the judges' objections and are marked as revised in [`finalist_ideas.md`](finalist_ideas.md).

---

## 2. Rules that bound every build (Facts)

- "You can apply for a maximum of **3** Partner Prizes for your project"; "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize"; "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize." ([event page FAQ](https://ethglobal.com/events/mumbai))
- "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one." ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it." ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv))
- Partners judge "based on the materials you provide"; finalists get "7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A", judged on Technicality, Originality, Practicality, Usability (UI/UX/DX) and WOW Factor. Classic track: "Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits." ([details page](https://ethglobal.com/events/mumbai/info/details))

**Judgement:** an EF entry uses one of the three picks. A second track inside one partner is upside until that sponsor confirms on Thursday.

---

## 3. Prize map for fresh builds

### 3.1 Tracks open to fresh builds (Facts, from [`00_current_tracks.md`](00_current_tracks.md))

| Sponsor | Track | Split | Source |
|---|---|---|---|
| World | World ID Agent Pass | $2,500 / $1,500 / $1,000 | [World prizes](https://ethglobal.com/events/mumbai/prizes/world) |
| World | Best Use of IDKit | $1,250 x 2 | same |
| 1inch | Build an Aqua App | $2,500 / $1,500 / $1,000 | [1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch) |
| 0G | Build with 0G PC | $2,500 / $1,500 / $1,000 | [0G prizes](https://ethglobal.com/events/mumbai/prizes/0g) |
| 0G | Physical AI: Agents with a Body | $2,500 / $1,500 / $1,000 real hardware | same |
| 0G | Agents That Pay for Themselves | $1,000 x 2 | same |
| Uniswap Foundation | Build with Uniswap | $4,000 / $3,000 / $2,000 / $1,000 | [Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation) |
| Arc | DeFi / Onchain Finance App in Arc Studio | $3,000 | [Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc) |
| Arc | Mobile Web Consumer Agent (Marketplace Discovery API) | $3,000 | same |
| Arc | Smart Contracts with Advanced Stablecoin Logic | $3,000 | same |
| Arc | Bridge Kit for Non-USDC Assets | $3,000 | same |
| Hedera | AI Agents That Pay: x402 on Hedera | $3,000 / $2,000 / $1,500 | [Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera) |
| Hedera | Tokenize Anything with Hedera Studios | $2,500 / $1,500 / $1,000 | same |
| Hedera | "No Solidity Allowed" | $1,000 x 2 | same |
| Arkiv | Mirror something Ethereum depends on | $3,000 / $1,000 | [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv) |
| Arkiv | Build on Arkiv (from scratch) | $3,000 / $1,000 | same |
| Arkiv | Node tooling | $2,000 | same |
| Arkiv | Arkiv + Swarm bonus (from scratch) | $500 | same |
| Whitechain | Operate | $2,500 / $1,500 / $1,000 | [Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain) |
| Whitechain | Tokenize | $2,500 / $1,500 | same |
| Whitechain | Scale | $2,000 / $1,000 | same |
| Ethereum Foundation | Best Use of Anon-RPC | $2,500 / $1,500 / $1,000 | [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation) |
| Ethereum Foundation | Frame Transaction Alternative Mempool | $2,500 / $1,500 / $1,000 | same |
| Ethereum Foundation | Best CROPS App | $2,000 / $1,000 / $500 | same |
| ENS | Best Use of ENSv2 | $3,000 / $2,000 / $1,000 / $1,000 | [ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens) |
| Definitive | Flash Advanced Orders in a Social App | $2,500 | [Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive) |
| Chainlink | Best workflow with CRE | $1,500 | [Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink) |
| Chainlink | Best use of Chainlink CCIP 2.0 | $1,750 x 2 | same |

Fresh-eligible total across all twelve sponsors: $110,500 of $144,500 ([prizes page](https://ethglobal.com/events/mumbai/prizes), via `00_current_tracks.md`).

### 3.2 Skipped: Continuity-only tracks (not eligible for this team)

World Agent Pass (Continuity) and [Cont] Best IDKit Use Case; 1inch Aqua App Continuity Track; 0G Keep Building on 0G; Uniswap Build with Uniswap (Continuity); Arc Studio Continuity Track; Built on Hedera (Continuity Track); Arkiv Build on Arkiv (existing projects) and its Swarm bonus twin; Whitechain Continuity; EF Best CROPS Upgrade to an Existing Project; ENS Best Integration into an Existing Project; Definitive Most Creative Use (Continuity). Total $34,000. No idea in this harness targets them.

---

## 4. Master table of every sponsor idea

Every idea that survived its sponsor judge panel, five per track. Scores are the sponsor panels' "Overall" (Judgement, out of 10). Stack is the partner picks the sponsor file recommends. Click the sponsor for the full idea, its gates and its workshop questions. Bold rows are each sponsor file's own top 3.

| Sponsor | Track | Rank | Idea | Score | Stack |
|---|---|---|---|---|---|
| [World](ideas/world.md) | Agent Pass | 1 | **Upgrade Pass (built as Upgrade Council): agents can ship, only a named person can change code that holds money** | 8.4 | World (both tracks with the council) |
| [World](ideas/world.md) | Agent Pass | 2 | **Breakglass: the agent may only make things safer** | 8.2 | World (+ IDKit council); Uniswap optional, weak |
| [World](ideas/world.md) | Agent Pass | 3 | Owed: a bug bounty where only a human can say no, and only the finder can get paid | 7.9 | World only |
| [World](ideas/world.md) | Agent Pass | 4 | Name Lock: an agent runs your ENS name, only you can change where money or users go | 7.4 | World + ENS |
| [World](ideas/world.md) | Agent Pass | 5 | Two-Key Rover: restricted zones need a named supervisor, fresh | 7.3 | World + 0G Physical AI |
| [World](ideas/world.md) | IDKit | 1 | **Distinct Quorum: a 3-of-5 Safe that provably means three people** | 8.3 | World; onchain verifier on World Chain |
| [World](ideas/world.md) | IDKit | 2 | Rescue Gas: one sponsored rescue per victim | 8.1 | World |
| [World](ideas/world.md) | IDKit | 3 | Small Holders First: a post-hack recovery waterfall per human, not per wallet | 8.0 | World |
| [World](ideas/world.md) | IDKit | 4 | Same Human: a leaked key alone cannot change your delegate, owner or withdrawal list | 7.1 | World + EF CROPS (onchain verification only) |
| [World](ideas/world.md) | IDKit | 5 | Warden One: one human, one share in an audit contest | 7.0 | World only |
| [1inch](ideas/1inch.md) | Build an Aqua App | 1 | **Greenshoe: a post-auction stabilisation book funded by its own overallotment, in the issuer's Safe** | 8.5 | 1inch + Uniswap |
| [1inch](ideas/1inch.md) | Build an Aqua App | 2 | **Reserve Gate: an L2 LST maker that stops buying when the bridge escrow no longer backs the token** | 7.9 | 1inch + Chainlink CRE |
| [1inch](ideas/1inch.md) | Build an Aqua App | 3 | **Replica: an oracle-free covered call, the RMM-01 curve as a SwapVM instruction** | 7.8 | 1inch only |
| [1inch](ideas/1inch.md) | Build an Aqua App | 4 | Standing Repo: a repo facility whose buyback leg only the original borrower can take | 7.4 | 1inch only |
| [1inch](ideas/1inch.md) | Build an Aqua App | 5 | Plimsoll: a shared maker vault that ships only programs passing six SwapVM safety rules | 7.1 | 1inch only |
| [0G](ideas/0g.md) | Build with 0G PC | 1 | **Drill: a daily scam call you have to beat** | 7.9 | 0G only |
| [0G](ideas/0g.md) | Build with 0G PC | 2 | Daily Bug: yesterday's exploit as today's five-minute audit | 7.4 | 0G only |
| [0G](ideas/0g.md) | Build with 0G PC | 3 | Rug Odds: you against a sealed model, scored by tomorrow's chain | 7.3 | 0G only |
| [0G](ideas/0g.md) | Build with 0G PC | 4 | Delegate Desk: does the calldata do what the proposal says | 6.5 | 0G; optional Chainlink CRE |
| [0G](ideas/0g.md) | Build with 0G PC | 5 | Upgrade Watch: your approvals, re-read on every upgrade | 6.0 | 0G; Arkiv; optional EF CROPS |
| [0G](ideas/0g.md) | Physical AI | 1 | **Robot That Pays For Its Brain** | 7.7 | 0G (Physical AI + Agents That Pay) |
| [0G](ideas/0g.md) | Physical AI | 2 | Black Box Courier: a delivery rover you can take to court | 7.7 | 0G only |
| [0G](ideas/0g.md) | Physical AI | 3 | **Witness: a desk companion that co-signs only what you said out loud** | 7.6 | 0G only |
| [0G](ideas/0g.md) | Physical AI | 4 | Deaf to Signs: a rover that cannot be steered by what it reads | 7.4 | 0G only |
| [0G](ideas/0g.md) | Physical AI | 5 | Two-Key Rover: restricted zones need a verified human | 6.9 | 0G + World Agent Pass |
| [0G](ideas/0g.md) | Agents That Pay | 1 | Metered Oracle: an arbiter that reprices itself as its balance falls | 7.6 | 0G only |
| [0G](ideas/0g.md) | Agents That Pay | 2 | Solvent Auditor: refuses any job it cannot afford to finish | 7.4 | 0G only |
| [0G](ideas/0g.md) | Agents That Pay | 3 | Delegation Notary: 7702 alerts paid for by subscribers | 7.4 | 0G; optional Chainlink CRE |
| [0G](ideas/0g.md) | Agents That Pay | 4 | Hire Board: a seller that swaps in a cheaper model does not get paid | 7.1 | 0G; ENSv2; Arkiv optional |
| [0G](ideas/0g.md) | Agents That Pay | 5 | Rug Radar: a self-funding risk card for every comfy launch | 6.7 | 0G only |
| [Uniswap](ideas/uniswap.md) | Build with Uniswap | 1 | **Bidproof: every real CCA checked before you bid, and a bid that refuses a rigged one** | 8.4 | Uniswap only |
| [Uniswap](ideas/uniswap.md) | Build with Uniswap | 2 | **Jarwatch: a replayable ledger of every protocol-fee release, and a jar for your own hook** | 7.5 | Uniswap (+ Arkiv, weak) |
| [Uniswap](ideas/uniswap.md) | Build with Uniswap | 3 | **HookBreak: a hook fuzz kit that rediscovers the Cork and Bunni exploits** | 7.3 | Uniswap only |
| [Uniswap](ideas/uniswap.md) | Build with Uniswap | 4 | Exit Ledger: what it costs an LP to leave each hooked pool, and who can change that tomorrow | 7.2 | Uniswap + Arkiv Mirror |
| [Uniswap](ideas/uniswap.md) | Build with Uniswap | 5 | Humancap: one budget per human across all wallets in a CCA | 6.6 | Uniswap + World IDKit |
| [Arc](ideas/arc.md) | A: DeFi in Arc Studio | 1 | **Net: a netting co-op where settlement cannot fail** | 7.6 | Arc only |
| [Arc](ideas/arc.md) | A: DeFi in Arc Studio | 2 | Lock Rate: oracle-free EURC/USDC forwards for freelancers | 7.3 | Arc only |
| [Arc](ideas/arc.md) | A: DeFi in Arc Studio | 3 | Bhishi: a credit co-op with a published worst case | 7.3 | Arc + World IDKit |
| [Arc](ideas/arc.md) | A: DeFi in Arc Studio | 4 | Solvent: a neobank whose hot key cannot drain what it owes | 7.2 | Arc + Chainlink CRE (optional) |
| [Arc](ideas/arc.md) | A: DeFi in Arc Studio | 5 | Overnight: intraday cirBTC repo against USDC | 7.0 | Arc only |
| [Arc](ideas/arc.md) | B: Consumer agent | 1 | Forward Check: a scam second opinion the scam cannot talk round | 7.4 | Arc + 0G PC |
| [Arc](ideas/arc.md) | B: Consumer agent | 2 | Pocket: an allowance vault the agent cannot outspend | 7.3 | Arc only |
| [Arc](ideas/arc.md) | B: Consumer agent | 3 | Blinkers: a shopping agent paid content cannot steer | 7.2 | Arc only |
| [Arc](ideas/arc.md) | B: Consumer agent | 4 | Bolo: a voice errand agent for people who do not type English | 6.7 | Arc + 0G PC |
| [Arc](ideas/arc.md) | B: Consumer agent | 5 | Ask Me First: a fresh human check for new payees and big buys | 6.5 | Arc + World Agent Pass |
| [Arc](ideas/arc.md) | C: Advanced Stablecoin Logic | 1 | **Final Offer: escrow whose disputes end in baseball arbitration** | 7.6 | Arc only |
| [Arc](ideas/arc.md) | C: Advanced Stablecoin Logic | 2 | Deposit: a rental deposit that earns for the tenant and comes back on time | 7.4 | Arc only |
| [Arc](ideas/arc.md) | C: Advanced Stablecoin Logic | 3 | Either Way: escrow on Arc, release on any chain, refund if nobody says yes | 7.2 | Arc only |
| [Arc](ideas/arc.md) | C: Advanced Stablecoin Logic | 4 | Tally: an x402 scheme for smart-account payers | 7.1 | Arc only |
| [Arc](ideas/arc.md) | C: Advanced Stablecoin Logic | 5 | ArcSafe Split: a payout splitter one bad payee cannot jam | 6.9 | Arc only |
| [Arc](ideas/arc.md) | D: Bridge Kit non-USDC | 1 | **Preflight: a crosschain token launcher that refuses to ship a bricked token** | 7.9 | Arc only (or + Chainlink CRE with Tripwire) |
| [Arc](ideas/arc.md) | D: Bridge Kit non-USDC | 2 | Tripwire: a circuit breaker for unbacked crosschain mints | 7.1 | Arc + Chainlink CRE |
| [Arc](ideas/arc.md) | D: Bridge Kit non-USDC | 3 | Born Crosschain: an RWA note with issuer controls on every chain | 7.1 | Arc only |
| [Arc](ideas/arc.md) | D: Bridge Kit non-USDC | 4 | Exact: euro invoices that settle exactly, or wait safely for a refund | 7.0 | Arc only |
| [Arc](ideas/arc.md) | D: Bridge Kit non-USDC | 5 | BTC Desk: cirBTC to a USDC loan in one flow that survives a crash | 7.0 | Arc only |
| [Hedera](ideas/hedera.md) | x402 on Hedera | 1 | **Subscribe402: x402 subscriptions the merchant cannot speed up, enlarge or repeat** | 7.5 | Hedera (also No Solidity) |
| [Hedera](ideas/hedera.md) | x402 on Hedera | 2 | KeyCheck: agents pay a cent to learn whether a token's keys can hurt them | 7.5 | Hedera + Arkiv (optional) |
| [Hedera](ideas/hedera.md) | x402 on Hedera | 3 | Leash: the agent's spending limit lives in the settlement transaction | 7.3 | Hedera + World Agent Pass |
| [Hedera](ideas/hedera.md) | x402 on Hedera | 4 | Strict402: a facilitator that checks what the payee actually received | 6.5 | Hedera only |
| [Hedera](ideas/hedera.md) | x402 on Hedera | 5 | FuzzMeter: a metered fuzzing tool whose receipts anyone can replay | 6.4 | Hedera only |
| [Hedera](ideas/hedera.md) | Tokenize | 1 | **Issuer Brake: every value-moving power ATS gives an issuer, on a public clock a trustee can stop** | 8.0 | Hedera (+ World Agent Pass) |
| [Hedera](ideas/hedera.md) | Tokenize | 2 | ATS Proof Pack: invariant fuzzing for the Asset Tokenization Studio, sent upstream | 7.2 | Hedera only |
| [Hedera](ideas/hedera.md) | Tokenize | 3 | Settle or Nothing: one-transaction DvP across both studios | 6.9 | Hedera only |
| [Hedera](ideas/hedera.md) | Tokenize | 4 | Coupon Clock: escrowed coupons the issuer cannot skip | 6.6 | Hedera only |
| [Hedera](ideas/hedera.md) | Tokenize | 5 | Warehouse Lien: grain receipts pledged with an ATS hold | 6.4 | Hedera (+ CCIP stretch) |
| [Hedera](ideas/hedera.md) | No Solidity | 1 | **Slowvault: a treasury no stolen keys can drain in one block** | 8.1 | Hedera only |
| [Hedera](ideas/hedera.md) | No Solidity | 2 | Freeze Desk: trace stolen HTS funds and get them frozen in under a minute | 8.0 | Hedera only |
| [Hedera](ideas/hedera.md) | No Solidity | 3 | Schedule Lens: clear signing for Hedera scheduled transactions | 7.5 | Hedera only |
| [Hedera](ideas/hedera.md) | No Solidity | 4 | First Finder: a disclosure ledger with provable priority | 7.4 | Hedera + Arkiv Build |
| [Hedera](ideas/hedera.md) | No Solidity | 5 | Ask a Human: an ops agent that drafts every transaction and can execute none | 7.1 | Hedera + World Agent Pass |
| [Arkiv](ideas/arkiv.md) | Mirror | 1 | **M1 Clearsight: ERC-7730 clear-signing registry with code-drift checks** | 8.0 | Arkiv Mirror + Swarm + EF CROPS |
| [Arkiv](ideas/arkiv.md) | Mirror | 2 | M2 Keyring Atlas: L2BEAT permissions, searchable by the key that holds them | 7.7 | Arkiv; EF CROPS optional |
| [Arkiv](ideas/arkiv.md) | Mirror | 3 | M3 RPC Truth Table: chain registry with signed honesty probes | 7.2 | Arkiv + EF Anon-RPC |
| [Arkiv](ideas/arkiv.md) | Mirror | 4 | M5 Denylist Ledger: scam lists with delisting history and private lookups | 7.0 | Arkiv; EF optional |
| [Arkiv](ideas/arkiv.md) | Mirror | 5 | M4 Delegation Lens: EIP-7702 delegate targets as a wallet-queryable index | 6.8 | Arkiv + EF CROPS |
| [Arkiv](ideas/arkiv.md) | Build (from scratch) | 1 | **B1 Second Screen: Safe transaction verdicts a tampered frontend cannot touch** | 7.7 | Arkiv Build + Swarm + EF CROPS |
| [Arkiv](ideas/arkiv.md) | Build (from scratch) | 2 | B4 Delegate Desk: expiring 7702 delegate attestations checked before signing | 7.7 | Arkiv Build + Swarm + EF CROPS |
| [Arkiv](ideas/arkiv.md) | Build (from scratch) | 3 | B2 Fuzzfarm: coordinator-free fuzz campaigns with expiring shard leases | 7.5 | Arkiv Build + Swarm |
| [Arkiv](ideas/arkiv.md) | Build (from scratch) | 4 | B5 Contactable: security contacts that vanish unless the channel answers | 7.5 | Arkiv Build |
| [Arkiv](ideas/arkiv.md) | Build (from scratch) | 5 | B3 Aqua Board: SwapVM offers that live only while the maker can fill them | 6.7 | Arkiv Build + 1inch |
| [Arkiv](ideas/arkiv.md) | Node tooling | 1 | **N1 Grammarsmith: query fuzzer with a reference-model oracle** | 8.4 | Arkiv only |
| [Arkiv](ideas/arkiv.md) | Node tooling | 2 | N3 Divergence Watch: catch your follower serving different answers | 7.7 | Arkiv only |
| [Arkiv](ideas/arkiv.md) | Node tooling | 3 | N4 Upgrade Canary: replay your node's traffic against the next image | 7.4 | Arkiv only |
| [Arkiv](ideas/arkiv.md) | Node tooling | 4 | N2 Diskclock: an expiry-aware days-until-full forecast | 7.2 | Arkiv only |
| [Arkiv](ideas/arkiv.md) | Node tooling | 5 | N5 Beacon: operator heartbeats as expiring entities | 6.7 | Arkiv only |
| [Arkiv](ideas/arkiv.md) | Swarm bonus | 1 | S2 Second Screen encrypted transaction bundles | 7.8 | On top of B1 |
| [Arkiv](ideas/arkiv.md) | Swarm bonus | 2 | S1 Fuzzfarm replay bundles and corpus feed | 7.6 | On top of B2 |
| [Arkiv](ideas/arkiv.md) | Swarm bonus | 3 | S3 Delegate Desk review reports | 7.6 | On top of B4 |
| [Arkiv](ideas/arkiv.md) | Swarm bonus | 4 | S5 Sealed Disclosure: encrypted slow-query reports | 7.4 | On top of N1 |
| [Arkiv](ideas/arkiv.md) | Swarm bonus | 5 | S4 Clearsight frontend and registry snapshots that outlive the domain | 7.3 | On top of M1 |
| [Whitechain](ideas/whitechain.md) | Operate | 1 | **Closebook: a checkout whose books a stranger can check** | 7.8 | Whitechain (Operate + Scale with Gas Ledger) |
| [Whitechain](ideas/whitechain.md) | Operate | 2 | Clerk Key: refunds a shop clerk can issue but cannot abuse | 7.7 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Operate | 3 | Deposit Desk: per-order USDT addresses exchange withdrawals can pay | 7.5 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Operate | 4 | Mandate: subscriptions the customer can cancel without the merchant | 7.2 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Operate | 5 | Payee Lock: invoice links whose pay-to cannot be swapped | 7.0 | Whitechain + ENS |
| [Whitechain](ideas/whitechain.md) | Tokenize | 1 | **Assignee Pays: a receivable whose payment follows its owner** | 8.0 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Tokenize | 2 | Repo Desk: overnight repo with delivery against payment | 7.9 | Whitechain (+ Chainlink CRE optional) |
| [Whitechain](ideas/whitechain.md) | Tokenize | 3 | Coupon Clock: a note that defaults by itself, without a keeper | 7.6 | Whitechain (+ World IDKit optional) |
| [Whitechain](ideas/whitechain.md) | Tokenize | 4 | Clean Bill: a negotiable bill of lading where payment follows title | 7.5 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Tokenize | 5 | Yield Auction: a clearing auction sets the note's interest rate | 6.8 | Whitechain + Uniswap |
| [Whitechain](ideas/whitechain.md) | Scale | 1 | **Gas Ledger: a relayer with a drain bound per merchant that refills from Whitechain's own pool** | 8.0 | Whitechain (Scale + Operate with Closebook) |
| [Whitechain](ideas/whitechain.md) | Scale | 2 | Face Pay: Face ID pays USDT through the token's own authorization | 7.7 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Scale | 3 | Facilitator Under Fire: an x402 facilitator with a published abuse suite | 7.6 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Scale | 4 | Metered Tab: agents pay per request, the business pays gas once | 7.4 | Whitechain only |
| [Whitechain](ideas/whitechain.md) | Scale | 5 | No Single Relayer: a gasless checkout that survives its relayer | 7.1 | Whitechain + EF CROPS |
| [EF](ideas/ef.md) | Anon-RPC | 1 | **A1 Slowlane: a timelocked worker specifier, a delayed-pin policy and a watchdog** | 7.6 | EF only |
| [EF](ideas/ef.md) | Anon-RPC | 2 | A2 Blindfork: a localhost Anon-RPC endpoint for Foundry and wallets | 7.4 | EF only |
| [EF](ideas/ef.md) | Anon-RPC | 3 | A3 Twofold: Oblivious HTTP as a new Anon-RPC network | 7.4 | EF only |
| [EF](ideas/ef.md) | Anon-RPC | 4 | A4 Afterdrain: a private 7702 and approval checkup that fails closed | 7.3 | EF + Uniswap (gated) |
| [EF](ideas/ef.md) | Anon-RPC | 5 | A5 Hush: private ENSv2 resolution with role-scoped address rotation | 6.9 | EF + ENS |
| [EF](ideas/ef.md) | Alt mempool | 1 | **B1 RuleDiff: fuzz the admission node against its own spec** | 7.6 | EF only |
| [EF](ideas/ef.md) | Alt mempool | 2 | B2 Paymaster Gauntlet: attack any alt mempool paymaster first | 7.4 | EF only |
| [EF](ideas/ef.md) | Alt mempool | 3 | B3 Lanes: a hot wallet with parallel, single-use, cold-approved withdrawals | 7.1 | EF only |
| [EF](ideas/ef.md) | Alt mempool | 4 | B4 Brakeline: a spend budget and guardian freeze read from outside the account | 6.6 | EF only |
| [EF](ideas/ef.md) | Alt mempool | 5 | B5 Swapgas: pay gas from a Uniswap v4 swap | 6.3 | EF + Uniswap |
| [EF](ideas/ef.md) | CROPS | 1 | **C1 Truthsign: the clear-signing screen must match what the transaction does** | 7.3 | EF + Arkiv Mirror (+ Chainlink CRE optional) |
| [EF](ideas/ef.md) | CROPS | 2 | C2 Walkaway: leave a DeFi position with its site, API and RPC companies gone | 7.1 | EF + Uniswap |
| [EF](ideas/ef.md) | CROPS | 3 | C3 CROPS Check: a CI gate that keeps trackers and keyed RPCs out of what ships | 7.1 | EF only |
| [EF](ideas/ef.md) | CROPS | 4 | C4 Fire Drill: prove a wallet can be recovered if its company disappears | 7.0 | EF only |
| [EF](ideas/ef.md) | CROPS | 5 | C5 Sieve: local signing rules fed by lists no single host controls | 6.9 | EF + Arkiv Mirror |
| [ENS](ideas/ens.md) | Best Use of ENSv2 | 1 | **Residue: buy an ENSv2 name and inherit nobody** | 8.3 | ENS (+ Arkiv Mirror) |
| [ENS](ideas/ens.md) | Best Use of ENSv2 | 2 | **Moving Day: a verified dry run of your v1 to v2 upgrade** | 8.0 | ENS only |
| [ENS](ideas/ens.md) | Best Use of ENSv2 | 3 | **Quarantine: here is an agent's private key, try to do damage** | 7.3 | ENS + World Agent Pass |
| [ENS](ideas/ens.md) | Best Use of ENSv2 | 4 | Descriptor Desk: descriptors whose authority is a frozen ENSv2 permission set | 6.9 | ENS + Arkiv + EF CROPS |
| [ENS](ideas/ens.md) | Best Use of ENSv2 | 5 | Shelf: an issuer namespace where an expiring name is eligibility | 6.8 | ENS + Uniswap |
| [Definitive](ideas/definitive.md) | Flash social | 1 | **Last Out: copy trading where the leader cannot dump on followers** | 7.5 | Definitive + World IDKit |
| [Definitive](ideas/definitive.md) | Flash social | 2 | **Called It: a leaderboard of calls committed before the move, one human per rank** | 7.2 | Definitive + World IDKit |
| [Definitive](ideas/definitive.md) | Flash social | 3 | **Chart to Bracket: a drawn chart becomes a resting bracket for the group** | 7.1 | Definitive + 0G PC |
| [Definitive](ideas/definitive.md) | Flash social | 4 | Desk: a trading desk as an ENSv2 name with expiring seats | 6.9 | Definitive + ENS |
| [Definitive](ideas/definitive.md) | Flash social | 5 | Leash: follower accounts that cap what any copier can spend | 6.5 | Definitive + World Agent Pass |
| [Chainlink](ideas/chainlink.md) | CRE | 1 | **Sealed PoC Bounty: pays only when the exploit moves funds on a pinned fork** | 7.9 | Chainlink only |
| [Chainlink](ideas/chainlink.md) | CRE | 2 | Veto Window: a timelocked upgrade a CRE workflow cancels if its simulation breaks the protocol | 7.8 | Chainlink; EF CROPS weak |
| [Chainlink](ideas/chainlink.md) | CRE | 3 | **Ledger Match: the hot wallet refills only when every outflow matches a ticket** (with Pause Fast as K1) | 7.7 | Chainlink (CRE + CCIP) |
| [Chainlink](ideas/chainlink.md) | CRE | 4 | FTF Governor: tighten a token's fast-finality budget when the source chain looks unsafe | 7.3 | Chainlink (CRE + CCIP) |
| [Chainlink](ideas/chainlink.md) | CRE | 5 | Descriptor Notary: descriptors checked against bytecode, and a wallet that refuses on a FAIL | 7.1 | Chainlink + EF CROPS + Arkiv |
| [Chainlink](ideas/chainlink.md) | CCIP 2.0 | 1 | **Pause Fast, Unpause Slow: pauses travel faster than finality, unpauses never do** (K1) | 8.2 | Chainlink (both tracks) |
| [Chainlink](ideas/chainlink.md) | CCIP 2.0 | 2 | **Receiver Lab: an invariant fuzz kit for CCIP 2.0 receivers on Chainlink Local** | 7.8 | Chainlink only |
| [Chainlink](ideas/chainlink.md) | CCIP 2.0 | 3 | Conservation Verifier: a custom CCV whose policy hook refuses unbacked mints | 7.6 | Chainlink (both tracks) |
| [Chainlink](ideas/chainlink.md) | CCIP 2.0 | 4 | Remote Bidder: bid in a Uniswap CCA from another chain, refunds exact to the wei | 6.3 | Chainlink + Uniswap |
| [Chainlink](ideas/chainlink.md) | CCIP 2.0 | 5 | Float: instant merchant refunds on Arc inside a priced reorg budget | 6.1 | Chainlink + Arc |

Judgement: sponsor panel scores are not comparable across sponsors (each panel used its own rubric). Use them to rank inside a sponsor, and use the finalist judges in section 6 to compare across sponsors.

---

## 5. Sound track combos

From [`track_combos.md`](track_combos.md) and its adversarial check [`track_combos_check.md`](track_combos_check.md). "Sum of 1st places" is a ceiling, not a forecast (Fact for the arithmetic, Judgement for its use).

| Combo | Partner picks | Check verdict | Required change (applied in `finalist_ideas.md`) | Sum of 1st places |
|---|---|---|---|---|
| Greenshoe | 1inch Aqua + Uniswap | Sound | No mainnet fill; fork test for the CCA checkpoint warning | $6,500 |
| Residue | ENS + Arkiv Mirror | Sound | The go or no-go test must cover all three transfer paths, not only the guarded one | $6,000 |
| Reserve Gate | 1inch Aqua + Chainlink CRE | Sound | The external API must feed a number the fork cannot, or be called a freshness check | $4,000 |
| Last Out | Definitive + World IDKit | Sound | Claim narrowed to the leader's ranked account; demo token not WETH | $3,750 |
| Truthsign | EF CROPS + Arkiv Mirror (+ Swarm) | Sound after trim | ENS dropped (about 12 hours, least central) | $5,500 |
| Pause Fast, Unpause By A Person | Chainlink CRE + CCIP + World | Sound after a design fix | The unpause needs the backend attestation plus the guardian's enrolled key; the finalist judges then advise cutting World entirely | $7,000 (Chainlink only: $3,250) |
| Brake | Hedera Tokenize + World Agent Pass | Sound after trim | "No Solidity Allowed" dropped (core action calls ATS Solidity) | $5,000 |
| Closebook on Gas Ledger | Whitechain Operate + Scale | Sound after trim | EF CROPS dropped (single sequencer, freezable USDT); one contract for one authorization format | $4,500 |

Also sound but outside the eight (Judgement): **Walkaway** (EF CROPS + Uniswap; checked in the draft only, no chain or rule conflict found); and single-partner, multi-track builds that use one pick: **Upgrade Council** (World Agent Pass + IDKit), **K1 Ledger Match plus Pause Fast** (Chainlink CRE + CCIP), **Robot That Pays For Its Brain** (0G Physical AI + Agents That Pay), **Subscribe402** (Hedera x402 + No Solidity). Every multi-track entry inside one partner waits on that sponsor's Thursday answer.

Combos that do not work (Judgement, `track_combos.md` section 5): one payments app for Arc and Whitechain (two chains, two tokens, Studio forced); ENSv2 names on a Whitechain or Arc app (cosmetic ENS); Aqua on Arc (no Aqua on Arc testnet); Gas Ledger as an alt mempool paymaster for Whitechain and EF (two chains); Breakglass or Upgrade Pass for World plus EF CROPS (the backend breaks C); four picks for Truthsign; Arkiv Mirror plus Node tooling in one submission.

---

## 6. Top 10 builds overall: a finalist shot plus partner prizes

Finalist average is the three finalist judges' score (Judgement; "rev." means revised, with the editor's projection in brackets). P(demo) is the feasibility judge's estimate. Ceiling sums 1st places of the tracks entered.

| # | Build | Finalist avg | Partner picks and tracks | Ceiling | Places in reach | P(demo) | Decisive gate |
|---|---|---|---|---|---|---|---|
| 1 | Truthsign | 8.00 | EF Best CROPS App; Arkiv Mirror + Swarm | $5,500 | 3 + 2 + 1 | 70% | EF: CROPS rubric final and libraries equal; Arkiv: ERC-7730 in scope |
| 2 | Residue | 7.67 | ENS Best Use of ENSv2; Arkiv Mirror | $6,000 | 4 + 2 | 75% | ENS: residue survives `safeTransferFrom`, no clean hand-over flow |
| 3 | Greenshoe | 6.67 rev. (7.0) | 1inch Aqua; Uniswap | $6,500 | 3 + 4 | 50% | 1inch: appended opcodes official; Safe as maker |
| 4 | Walkaway | 6.67 rev. (7.3) | EF Best CROPS App (or Anon-RPC); Uniswap | $6,000 | 3 + 4 | 50% | Hour 1: harness runs from `file://`; own gateway on port 443 |
| 5 | Upgrade Council | 7.00 | World Agent Pass + IDKit | $3,750 | 3 + 2 | 60% | World: two stable mocked `sub` values; both tracks allowed |
| 6 | Bidproof | 6.67 rev. (7.0) | Uniswap | $4,000 | 4 | 80% | Pre-event count of real CCAs (at least about 10) |
| 7 | Last Out | 6.67 rev. (7.0) | Definitive Flash social; World IDKit | $3,750 | 1 + 2 | 55% | Definitive: Flash accepts the 1271 funder, rechecked at settlement |
| 8 | Reserve Gate | 6.00 rev. (7.0) | 1inch Aqua; Chainlink CRE | $4,000 | 3 + 1 | 55% | Hour 2: CRE simulation reads local fork RPCs |
| 9 | HookBreak | 5.67 rev. (6.7) | Uniswap | $4,000 | 4 | 45% | Fri 18:00: Bunni-class drain from generic properties |
| 10 | Pause Fast, Unpause Slow (Chainlink only) | 4.67 (trimmed) | Chainlink CRE + CCIP 2.0 | $3,250 | 1 + 2 | 35% as drafted; higher trimmed | Chainlink: both tracks for one project; block-depth lanes or Chainlink Local |

**Judgement on the order.** Truthsign and Residue lead because both passed every judge as written and both have their decisive moment under the team's control. Greenshoe and Walkaway carry the largest money (Uniswap's four places) with a strong finalist moment, but each needs a fix that is not yet proven. Upgrade Council is the strongest single-partner build. Regas (finalist average 7.00) is left out of this table only because it has no partner prize; it is the best pure finalist bet if the team accepts zero partner money.

---

## 7. Recommended pick for this team (Judgement)

The team builds **one** project. These three are the preferred order, each with the Thursday answer that would switch to the next. All three passed the finalist merge as written, each depends on a different sponsor's answer, and each puts Foundry invariants and differential testing at the centre.

1. **Truthsign (EF Best CROPS App + Arkiv Mirror and Swarm).** Highest finalist average (8, 8, 8), a gap the EF names in its own clear-signing post, and differential fuzzing is the team's daily craft. The registry is CC0, so the Arkiv half is a real mirror, not a badge. Main risks are a small sweep yield and the CROPS "tbc" rubric; both are answered by 17:30 Thursday. Switch away if the EF says end-user apps are strongly favoured over libraries and the team does not want to ship it as a wallet extension, or if the Arkiv answer removes the registry from Mirror and the sweep count is also weak.
2. **Residue (ENS Best Use of ENSv2 + Arkiv Mirror).** The highest P(demo) among strong candidates (75%), a primitive that went live on 27 Oct, four ENS places, and an escrow plus invariant suite that is pure Foundry. It is the pivot if Truthsign's answers go badly. Switch away if ENS says only `unsafeTransfer` leaves residue, or that a clean hand-over flow already exists and its Explorer shows it.
3. **Upgrade Council (World Agent Pass + IDKit).** Three "keep" verdicts, no dependency on EF, ENS or Arkiv answers, and the strongest agent story in the file (a storage collision caught by a person). It costs one partner pick, so World's two tracks are the whole prize stack. Take it if both of the above fail, provided World confirms two stable mocked humans.

Swap-ins (Judgement): **Walkaway** instead of pick 1 if the team wants the highest generalist WOW (8) and accepts the Tor and `file://` risk; **Greenshoe** instead of pick 3 if the team wants the most partner money and 1inch rules for appended opcodes and a Safe maker; **Regas** only as a deliberate finalist-only bet.

Timeline (from [`workshop_questions.md`](workshop_questions.md) section 2): collect answers 15:30 to 18:00 Thursday, pick at dinner (18:30), confirm at the booths before the 20:00 opening, start at 21:00.

---

## 8. Decisive workshop and pre-event questions

Full sheet, with who attends which slot and what each answer changes: [`workshop_questions.md`](workshop_questions.md). The questions below decide the three recommended picks and the main swap-ins.

### 8.1 Before the event (ask 1 to 4 Nov; questions and public-data checks only, no project code)

| Question or check | Where | Decides |
|---|---|---|
| Are idea notes with contract interface sketches written before Thu 21:00 allowed under the Classic rule, given the AI rule requires committing planning artifacts? | ETHGlobal staff (Discord, or registration desk from Thu 13:00) | Every build (`track_combos_check.md` section 1.1) |
| Is the CROPS rubric "(tbc: final review pending)" final; do libraries and dev tools compete equally with end-user apps? | ETHGlobal Discord EF channel | Truthsign, Walkaway |
| Is the ERC-7730 registry in scope for Mirror; per-entity cost units and quota; is a Rabdi snapshot published (manifest returned 404 on 31 Oct)? | [Arkiv Discord](https://discord.gg/arkiv) | Truthsign, Residue (Arkiv half) |
| Which ENSv2 features are live on mainnet versus Sepolia this week? | ETHGlobal Discord ENS channel | Residue |
| Mumbai World environment: event issuer, client registration, number of mocked humans; both World tracks for one project? | ETHGlobal Discord World channel | Upgrade Council, Last Out |
| Does a redeployed `AquaSwapVMRouter` with appended opcodes count as official, and may a Safe be the maker? | ETHGlobal Discord 1inch channel | Greenshoe, Reserve Gate |
| Does an analysis or fuzz tool on CCAs and hooks the team did not deploy count as "build on or integrate"; what is the disclosure path? | ETHGlobal Discord Uniswap channel | Bidproof, HookBreak, Walkaway |
| Will Flash accept an EIP-1271 funder, checked again at settlement? | ETHGlobal Discord Definitive channel; X @DefinitiveFi | Last Out |
| Count real CCAs on the v2 factories (Ethereum, Base, Unichain, Arbitrum) from public explorers | Public data | Bidproof as a finalist bet |
| Count ERC-7730 registry descriptors, and check whether a Universal Router descriptor exists anywhere in the registry | [registry](https://github.com/ethereum/clear-signing-erc7730-registry) | Truthsign sweep scope |
| Check that public Sepolia and Hoodi RPCs accept `eth_call` state overrides, and whether Hoodi's Glamsterdam date has been set | Public RPCs; [EF blog](https://blog.ethereum.org) | Regas |

Channel names other than those with links are the sponsor files' guidance and are not verified (Judgement, per `workshop_questions.md` section 5).

### 8.2 Thursday 5 Nov (IST), in the order the answers arrive

| Slot | Who (sheet labels) | The question that decides | If the answer is bad (Judgement) |
|---|---|---|---|
| 16:00 Room 1, ENS | C | After `safeTransferFrom`, can the seller keep root roles and the resolver pointer; is there a clean hand-over flow; does inspecting and enforcing ENSv2 state count as built on ENSv2? | Residue drops to ENS-only or pivots to Moving Day |
| 16:00 Room 2, Arkiv | B | ERC-7730 registry and public chain events in scope for Mirror; quota; will Rabdi be wiped before judging? | Drop Arkiv from Truthsign or Residue; enter EF or ENS alone |
| 16:30 Room 1, Uniswap | A | Analysis tools count; disclosure path; are fork demos with replay commands enough? | Bidproof and HookBreak need team-deployed contracts at the core |
| 17:00 Room 2, EF | A and B | CROPS rubric final; library inside the signing path counts as structural; must writes go through Anon-RPC; may the README name a preferred EF prize? | Ship Truthsign as an extension or wallet fork; route Walkaway broadcasts through the worker |
| 17:30 Room 1, World | C | Two stable mocked `sub` values; both tracks for one project; "backend attestation plus enrolled key" as the R4 pattern | Upgrade Council becomes Upgrade Pass alone, or Breakglass |
| 17:30 Room 2, 1inch | A | Appended opcodes official; Safe as maker; storage-writing instructions allowed | Greenshoe moves to an EOA maker or one external instruction, or pivots to Replica |
| Booths (no workshop) | A and B | Chainlink: both tracks for one project; simulation enough; block-depth lanes. Definitive: 1271 funder | Pause Fast stays on Chainlink Local; Last Out pivots to Called It |

A short or "we will check" answer counts as "no" until confirmed in writing (`workshop_questions.md` section 3).

---

## 9. What else to add in this mindset

Concrete angles this harness does not yet cover (all Judgement, unless a line names a source).

1. **A hostile Q and A pack per pick.** The three finalist judges each predicted the first question ("Did you write the bad descriptor yourselves?", "Isn't this Airlock?", "Only `unsafeTransfer`?", "He sells from another wallet"). Nothing in the harness writes the 20 second answers and names the screen that proves each one. Add a phase that writes five hostile questions per pick with answers and a timed rehearsal script for the 3 minute Q and A.
2. **A README-only partner judge.** Partners judge only "the materials you provide" ([details page](https://ethglobal.com/events/mumbai/info/details)). On Friday night, give a fresh agent only the README, the per-partner sections and the video script, and ask it to place the entry in each selected track. Fix whatever it misreads before 09:00.
3. **A pre-count sheet for every population number.** Every leading pick depends on a real count (registry descriptors, real CCAs, ENSv2 names transferred since 27 Oct, v4 hooks holding `beforeRemoveLiquidity`, verified contracts with the stipend-guard shape). Collecting public counts is research, not project code; doing it before Thursday turns four hour-4 gates into dinner-time decisions.
4. **An event-wide collision map.** Each sponsor file lists the "obvious entries" for its own tracks, but nothing maps them across sponsors for the chosen pick (for example clear-signing builds that will hit EF CROPS, Arkiv Build and Chainlink CRE at once). Estimate same-room rivals per selected track and write the one sentence that separates the pick from each.
5. **A Devcon 8 announcement watch.** Devcon runs alongside the event (`00_season.md`), and Hoodi's Glamsterdam rescheduling is expected after Devcon ([Parameter](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/)). Assign one person to check EF, ENS, ERC-7730 and Anon-RPC channels at fixed times (Fri 10:00 and 18:00) for news that flips a gate, Regas and Truthsign above all.
6. **A disclosure playbook before the first scan.** Truthsign's sweep, Bidproof, HookBreak and Regas can each find a live problem mid-hack. Write the idea-level protocol now: who to tell first (registry maintainers, the Uniswap Foundation path asked on Thursday, a security emergency contact such as SEAL 911, named here from general knowledge and not checked in this pass), the embargo rule ("counts only on stage, no names"), and where the evidence stays private.
7. **Demo-money and agent hygiene.** Walkaway moves real mainnet money and Last Out fills on Base. Plan fresh keys with small floats, a hardware signer for anything on mainnet, and a rule that no key that ever entered a coding agent's context touches money. Pair it with the Flash finding (`ideas/definitive.md` section 2): sandboxed agents, pinned package versions and a lockfile diff review, since several SDKs here are days old.
8. **A commit and AI-attribution plan.** "Submissions with large single commits or missing histories may be disqualified", and spec-driven workflows must commit "all spec files, prompts, and planning artifacts" ([details page](https://ethglobal.com/events/mumbai/info/details)). Write the cadence (one commit per passed gate at least), an AI usage note, and which planning files from after 21:00 go into the repo.
9. **A team-level 36 hour schedule per pick.** The draft gives per-idea gates; nothing assigns A, B and C hour by hour with sleep, kill times and the video slot. Add one sheet per recommended pick so the pivot point (for example Truthsign to Residue at Fri 01:00) is agreed before hacking starts.
10. **A Saturday staffing plan.** Main Finalist Judging and Partner Prize Judging both run Sat 09:30 to 12:30 ([event page](https://ethglobal.com/events/mumbai)). Decide now who presents in the finalist room and who stays at the selected partners' booths, since booth visits are optional but useful when Friday feedback raised a point the README cannot settle.
11. **Real-user evidence for Practicality.** Devcon week brings wallet teams, Safe signers and name marketplace operators to Mumbai. A linked upstream PR or issue opened during the hack (the ERC-7730 registry, `uniswap-ai`, the ENS docs) is evidence the judges can click, and it answers Arkiv's Reach line ("Can they try it today?", [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).
12. **A calibration loop after the event.** Record which entries won each track and the finalist slots at Mumbai, compare them with each sponsor panel's predicted "obvious entries" and scores, and adjust the rubric weights before the harness runs for the next event, as its README suggests.

---

## 10. Gaps

- No ETHGlobal page was re-fetched for this index. Every prize figure and quote is the 2026-10-31 snapshot; EF CROPS criteria were "(tbc: final review pending)" and two Arc placeholders were unfilled.
- Scores come from simulated judge panels that read showcase text and sponsor pages, not from real judges. Sponsor panel scores use different rubrics and should not be compared across sponsors.
- Projected scores for revised finalist ideas are the editor's estimates and were not re-scored by the three finalist judges.
- None of the gates listed in section 6 has been run. Several sponsor questions (multi-track wins, Flash 1271, CRE against forks, appended SwapVM opcodes, mocked World humans) are still open.
