# Arkiv: idea draft for ETHGlobal Mumbai (fresh builds only)

Drafted 2026-10-31 for a 3-person team with a DeFi and smart contract security background (Solidity, Foundry, fuzzing, auditing, TypeScript, React). Classic track, built from scratch, no continuity entries. The history and sources behind this draft are in `track_ideas/history/arkiv.md` (cited as [H section]). Prize text comes from `track_ideas/00_current_tracks.md` ([Arkiv Mumbai prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)). Everything in this file that is not a quote or a cited fact is **Judgement**.

## Ground rules this draft designs against

**Stacking.** Arkiv counts as one partner pick, and its tracks plus the Swarm bonus share that pick. A team wins at most one Arkiv track, plus the $500 Swarm bonus on top. That leaves two more partner picks. EF counts as one partner, and a project is placed in at most one EF prize. The ETHGlobal finalist track is separate. Partner judges see only the repo, README and video.

**Arkiv's judges, from their own record** [H 4.2]: one primitive (expiry, extension, `$creator`, ownership transfer) carries the product's main rule; lifetimes differ by entity type; trust comes from `$creator`, never from a writable field; on-chain evidence a judge can click; reusable output (SDK, MCP, plugin); and a rigorous `friction.md` ("Invented complaints score 0"). Polish alone is worth nothing: Design and UX has had no weight since October.

**Hard facts that shape every idea** [H 1, 8]:
- No smart contracts run on Arkiv. Solidity lives on Ethereum or a fork.
- Use Rabdi (chain 7794095). SDK 1.0.0 is two days old, so pin it.
- Anyone can write your schema tag, so filter reads by `$creator`.
- Only `$key`, `$owner`, `$creator` and `$expiresAt` can be filtered. `$createdAt` cannot be filtered or sorted.
- A `str` holds at most 128 bytes; `bytes` hold at most 128 KiB per write; a page is at most 100 rows.
- Access keys carry a monthly quota.
- Sourcify's signature database already includes 4byte.directory and openchain.

### Verbatim requirement checklists (each idea below is mapped to these codes)

**Mirror something Ethereum depends on**
- MR1 "Built from scratch at ETHGlobal Mumbai, following ETHGlobal's rules."
- MR2 "The data's license allows republishing. Link it in your README."
- MR3 (won't place) "Not Sourcify data, from any chain."
- MR4 "Your import script is in the repo, and we can re-run it."
- MR5 "Your project writes to Arkiv's current testnet (see the docs) with `@arkiv-network/sdk` or the JSON-RPC API, and a feature or query people use reads the data from Arkiv."
- MR6 "In your README: the wallet address(es) that wrote your entities, and one query we can run."
- MR7 "`/arkiv/schema.md`: your entities, the fields you query, who owns them and when they expire. `/arkiv/friction.md`: your feedback."
- MR8 "One file per criterion in How we judge": `friction.md`, `reach.md`, `why-arkiv.md`, `data-quality.md`.
- MR9 "A public repo with an open-source license. Say how you used AI, as ETHGlobal's rules require."

**Build on Arkiv (from scratch)**
- BR1 "Built from scratch at ETHGlobal Mumbai, following ETHGlobal's rules."
- BR2 "Your app writes to Arkiv's current testnet ... and at least one feature users see reads its data from Arkiv."
- BR3 "In your README: the wallet address(es) that wrote your entities, and one query we can run."
- BR4 `/arkiv/schema.md` and `/arkiv/friction.md`.
- BR5 One file per criterion: `friction.md`, `reach.md`, `why-arkiv.md`, `how-you-use-arkiv.md`.
- BR6 "A public repo with an open-source license. Say how you used AI".
- BR7 (won't place) "Not counted: the SDK installed but never used to read, or Arkiv used only as a log that nothing reads."

**Node tooling**
- NR1 "Built from scratch at ETHGlobal Mumbai: a new repo that runs next to the node. A pull request to an existing repo is not from scratch." (won't place: a PR)
- NR2 "It works against an Arkiv node in your demo. A node on your own machine is enough."
- NR3 "In your README: which node you used, and how to reproduce the demo. If your tool writes Arkiv entities, also the wallet address(es) that wrote them and a `/arkiv/schema.md`."
- NR4 "`/arkiv/friction.md`: your feedback on running and querying the node."
- NR5 One file per criterion: `friction.md`, `real-use.md`, `whats-new.md`, `easy-to-run.md`.
- NR6 (won't place) "Slow query shapes you find go to us privately ... never into your public repo, `/arkiv/friction.md` or demo."
- NR7 "A public repo with an open-source license. Say how you used AI".
- Brief: "show what only a tool next to the node can see." It must be "more than putting an existing dashboard together".

**Arkiv + Swarm bonus (from scratch)**
- SR1 (won't place) "Your project uses both Arkiv and Swarm. A project that uses only Swarm does not qualify."
- SR2 `/arkiv/swarm.md` containing: what is on Swarm versus Arkiv and "which entity field holds the Swarm reference or feed"; "One Arkiv entity key and the Swarm reference it points to, with a link we can open"; "The postage stamp batch ID ... and the wallet that bought it (or who gave you the batch), and the Bee node or service"; "The files in your repo that upload to Swarm and read from it"; "Steps to run one upload and one read yourself"; "The moment in your demo video where Swarm is used"; "What got in your way with Swarm."
- SR3 (won't place in practice) "an encrypted Swarm reference contains its key, and Arkiv entities are public. Never store one in an entity as it is: encrypt it first or keep it off Arkiv."
- SR4 Enter by selecting the bonus with a Mirror, Build on Arkiv or Node tooling submission. Judging: "The most useful integration wins."

Every idea below satisfies MR1, BR1 and NR1 (built fresh, no prior code; public libraries and starter kits only) and MR9, BR6 and NR7 (MIT licence, AI-use section). Those codes are not repeated per idea.

---

## Track 1: Mirror something Ethereum depends on ($3,000 / $1,000)

What this track rewards, from the rubric: a dataset people already use (Reach), a copy that does something the source cannot (Why Arkiv), and freshness plus filters that match how people actually search (Data quality). Arkiv built the reference itself (Sourcify, 7.9M contracts), so a security dataset with real consumers is the gap [H 6].

### M1. Clearsight: the ERC-7730 clear-signing registry on Arkiv, with code-drift flags

- **Pitch.** Every clear-signing descriptor, queryable by chain, contract and selector, each one stamped with whether the deployed code still matches what was reviewed.
- **Falsifiable promise.** Judges pick any (chain, contract, selector) in the registry. Arkiv returns the same descriptor as GitHub HEAD, at the commit named in the entity. The drift flag agrees with what `eth_getCode` and the EIP-1967 implementation slot say right now.
- **20 second demo.** Type the Uniswap router plus a selector, and the descriptor renders as a wallet signing screen. Switch to a proxy whose implementation changed after its descriptor was merged: a red badge reads "code changed since descriptor merged at commit abc123". Block github.com in the browser and run the lookup again: it still works.
- **Data and schema.** Source: `ethereum/clear-signing-erc7730-registry`, CC0-1.0, 931 descriptor files, 82 commits since 1 Oct [H 8].
  - `descriptor`: chainId `u64`, address `addr`, owner label `str`, commit `str`, contentHash `str`; the JSON goes gzipped in `bytes`. Created `readonly`. Expires 1 year after import, extended while the file is still at HEAD.
  - `binding`: chainId, address, selector `str` (indexed), descriptorKey `key`.
  - `drift_check`: address, implementation `addr`, codehash `str`, selectorPresent `bool`, checkedAtBlock `u64`. Written by a separate checker wallet; expires after 7 days.
  - Two writer wallets: `$creator` = importer for descriptors, `$creator` = checker for checks. A binding with no live check reads as "unchecked".
- **Requirements.** MR2: link the CC0 licence. MR3: the registry is not Sourcify data. Do not copy verification status from Sourcify; link to Arkiv's own Sourcify mirror by address instead. MR4: `import.ts --since <sha>` is idempotent by content hash, and a GitHub Action runs it every 30 minutes. MR5: the lookup UI and an SDK function `getDescriptor(chainId, to, selector)` both read from Arkiv. MR6: two wallets and a query in the README. MR7 and MR8: the four files, with numbers (descriptors, bindings, lag from HEAD in minutes).
- **Why Arkiv's judges pick it.** The `$creator` split (importer versus checker) and lifetimes per entity type are exactly the scored features [H 3.7]. Expiring checks follow the ideathon pattern where "absence is the signal" (Capability Canary). The "Why Arkiv" answer is concrete: GitHub cannot filter by selector across 931 files, a force-push can rewrite history, and readonly entities keyed by commit cannot be rewritten. Reach has named users: Ledger, Trezor (shipped ERC-7730 on 8 Sep, per `00_season.md`) and every wallet adopting the standard.
- **Closest past work.** Truthsign in the team's own finalist report (fork-proves the signing screen, never built). Ideathon "ClauseGuard Registry" and "AuditClock" (unplaced). **Twist:** a live CC0 dataset that a wallet can query today, plus a security check on bytecode drift that none of them have.
- **Stack options.** Arkiv (Mirror) plus EF "Best CROPS App" (Secure leads: clear signing that needs no GitHub, CDN or team; the demo moment is blocking GitHub). With the Truthsign fork check bolted on, it becomes a finalist entry. A third pick is still free: Swarm (S4) costs no slot.
- **Difficulty.** Medium. The importer is easy; the drift checker (proxy slots, PUSH4 dispatch scan) is the security work.
- **Team fit.** High: proxies, bytecode and selectors are audit skills.

### M2. Exploit Atlas: DeFiHackLabs as queryable incidents, with reproduction proofs that expire (narrow, Arkiv only)

- **Pitch.** 898 exploit PoCs become filterable incidents and attacker or victim address records. "Reproduces today" stays true only while someone has re-run the PoC recently.
- **Falsifiable promise.** For any incident, a judge runs one command. It forks at the attack block, replays the PoC and writes a fresh `repro` entity, which appears in the UI within one block. Incidents nobody has re-run in 30 days show "unverified".
- **20 second demo.** Query "price-manipulation incidents on BSC over $1M in 2026", and a list appears. Open one: "reproduced 2 days ago by runner 0xab..". Run `atlas repro <incidentKey>` live. The new repro streams in through `watchEntityEvents`, and the badge turns fresh.
- **Data and schema.** Source: `SunWeb3Sec/DeFiHackLabs`, repo licence Apache-2.0. Each PoC header holds an "@KeyInfo - Total Lost" line with attacker, victim and transaction links [H 8].
  - `incident`: date `u64`, chain `str`, lossUsd `dec`, attackClass `str`, protocol `str`, pocPath `str`, txHash `str`, sourceCommit `str`. Expires after 5 years.
  - `address_role`: address `addr` (indexed), role `str`, incidentKey `key`.
  - `repro`: incidentKey, forkBlock `u64`, passed `bool`, foundryVersion `str`; `$creator` = runner; expires after 30 days.
- **Requirements.** MR2: the repo is Apache-2.0, but individual PoC files say `SPDX-License-Identifier: UNLICENSED` (checked on 2026-10 files). So mirror only facts (dates, amounts, addresses, transaction hashes) and link to the PoC path. State this in the README and `data-quality.md`. MR3: not Sourcify. MR4: `import.ts` parses headers from a pinned commit and re-runs on new commits. MR5: the search UI reads Arkiv. MR6 to MR8: as M1, with parse-coverage numbers (for example, "812 of 898 headers parsed; failures listed").
- **Why Arkiv's judges pick it.** The DeFi host's 3rd place in the ideathon was "Wallet Guardian ... an exploit-and-reputation graph that lives on Arkiv" [H 3.6]. This is the built, live version, on a real dataset. Expiring repro proofs and runner attribution by `$creator` hit two scored features. "Lifetime IS" the claim: the evidence is only as good as its last re-run.
- **Closest past work.** Wallet Guardian (an idea, not built); Socrates and Vulnproof (unplaced ideas). **Twist:** a real dataset, plus expiring reproduction proofs that anyone can add to.
- **Stack options.** Arkiv only, deliberately tuned to Arkiv's judges. Optional Swarm (S3) for traces. No natural second partner, which leaves the team two picks for an unrelated main build.
- **Difficulty.** Medium. Header parsing is messy free text ("~783K USD (reported, across both exploit txs)"). Repro needs archive RPC, so limit it to 2026 incidents.
- **Team fit.** Very high. The team reads and runs these PoCs anyway.

### M3. RPC Truth Table: the chain and RPC registry with signed honesty probes (stacks with EF Anon-RPC)

- **Pitch.** ethereum-lists/chains on Arkiv, plus probes that expire hourly and check that each public RPC is alive and not lying, measured both directly and through Anon-RPC.
- **Falsifiable promise.** For any chain ID, one Arkiv query returns the RPCs that answered correctly in the last hour, filtered by the probers you trust. If a test RPC we control starts lying about chain ID or head, it drops out within one probe cycle.
- **20 second demo.** Chain 1 shows green rows. Flip our own proxy RPC to return a stale head. One cycle later it turns red, with the reason "head lag 1,204 blocks versus median". A side panel shows latency for the same probes direct versus through Anon-RPC, per network.
- **Data and schema.** Source: `ethereum-lists/chains`, MIT, 2,853 chain files [H 8].
  - `chain`: chainId `u64`, name, shortName, nativeSymbol, status. Expires after 1 year, extended on import.
  - `rpc`: chainId, url `str`; URLs over 128 bytes are hashed, with the full URL kept in `bytes`.
  - `probe`: rpcKey `key`, ok `bool`, latencyMs `i32`, headLag `i32`, chainIdMatch `bool`, viaAnonRpc `bool`. Expires after 1 hour; `$creator` = prober.
- **Requirements.** MR2: the MIT licence, linked. MR3: not Sourcify. MR4: the importer and prober are both scripts anyone can run. MR5: the table and an `npx rpc-truth best <chainId>` CLI read from Arkiv.
- **Why Arkiv's judges pick it.** Expiry is the product (an hour-old health result is wrong). It is permissionless: anyone runs a prober, and readers choose which `$creator` set to trust. Reach is large: the chains list has 9.8k stars.
- **Closest past work.** "Chain and RPC registries" is a listed idea, so expect rivals. Ideathon "Capability Canary" (claims die unless re-proved). **Twist:** honesty checks (chain ID, head lag, cross-provider state roots), not just a ping, plus Anon-RPC cost measured per network.
- **Stack options.** Arkiv (Mirror) plus EF "Best Use of Anon-RPC". EF lists "network health checker / playground: run anon-rpc against multiple networks and measure/compare". The direct lane is an intentional baseline, which EF allows ("let us know"). Third pick is free.
- **Difficulty.** Low to medium.
- **Team fit.** Medium (systems and measurement rather than security). Workshop risk: the obvious listed idea.

### M4. Delegation Lens: Ethereum's EIP-7702 delegations as a wallet-queryable index (stacks with EF CROPS)

- **Pitch.** For any address, see whether it is delegated, to what code, how many other EOAs share that code, and whether the delegation arrived in a multi-nonce batch like the Binance drain.
- **Falsifiable promise.** A judge pastes any mainnet address. From Arkiv alone, Delegation Lens returns its delegation status for the indexed window. It flags any type-4 transaction carrying many authorizations across consecutive nonces, the pattern TRM describes for Binance ("50 EIP-7702 authorizations signed by the hot wallet for 50 consecutive nonces", `00_season.md`).
- **20 second demo.** A wallet preview pane shows "Sign 7702 authorization to 0x5f..". The Lens badge reads "delegate first seen 2 h ago, 1 delegator, unrecognised bytecode", and the sign button greys out. Then query a well-known wallet delegator: 41,000 delegators, recognised.
- **Data and schema.** Source: Ethereum mainnet blocks (public chain data; the README says so and links the RPC used). L1 had 2.40M type-4 transactions by May 2026 (`00_season.md`), so do not write one entity per transaction.
  - `delegate`, one per target: address, codehash `str`, firstSeenBlock `u64`, lastSeenBlock `u64`, delegatorCount `u64`, knownImpl `str` (taken from vendors' MIT deployment lists such as `safe-global/safe-deployments`), sweeperHeuristic `bool` (the team's own bytecode rule). Patched by the indexer.
  - `delegation_change`: eoa `addr`, from, to, block, authsInTx `i32`, nonceSpan `i32`. Expires after 30 days.
- **Requirements.** MR2: public chain data; state the licence position plainly. MR3: never copy Sourcify's "verified" flag. If needed, cross-link Arkiv's Sourcify mirror by address on the client. MR4: `backfill.ts --from <block>` plus a follower. Honest scope: the last 30 days plus live, stated in `data-quality.md`. MR5: the badge and the address page read Arkiv.
- **Why Arkiv's judges pick it.** The news peg is the Binance hack on 29 Oct, which every judge knows. The "Why Arkiv" answer: today this needs a paid indexer or a Dune account, while here a wallet queries Arkiv directly and can compare indexers by `$creator`. Different lifetimes (permanent delegates, 30-day changes) follow product logic.
- **Closest past work.** Dune dashboards and Wintermute's 2025 study (cited via Protos in `00_season.md`) are analytics, not a wallet-facing feed. No finalist built a 7702 index (`00_season.md` section 5). **Twist:** open and queryable from a wallet, with detection of batches spanning a nonce range.
- **Stack options.** Arkiv (Mirror) plus EF "Best CROPS App" (Secure: the wallet warning works without our server). Finalist potential is high because of timing.
- **Difficulty.** Medium to high (indexing and quota). Keep the window narrow.
- **Team fit.** High.

### M5. Denylist Ledger: sanctions and phishing lists with tamper-evident delisting history, looked up privately (stacks with EF Anon-RPC)

- **Pitch.** One query across OFAC's crypto addresses, ScamSniffer and MetaMask's phishing list, showing who listed what and when, and whether it was quietly removed. The lookup goes through Anon-RPC, so nobody learns which address you were about to pay.
- **Falsifiable promise.** For any address or domain, the Ledger shows every source that flags it and the source commit it came from. A removal never deletes the listing; it adds a `delisting` entity. The client's lookup traffic never reaches Arkiv's RPC from the user's IP.
- **20 second demo.** Paste a drainer address: "ScamSniffer since commit 9f1c, MetaMask since 2026-08-02". Then show an address removed upstream last week: the listing is still there, struck through, with "removed at commit 77ab".
- **Data and schema.**
  - `listing`: subject `str`, kind `str`, source `str`, firstSeenCommit `str`. Created `readonly`; expires after 5 years.
  - `delisting`: listingKey `key`, removedAtCommit `str`.
  - Sources: OFAC SDN (US government work); `scamsniffer/scam-database` (GPL-3.0); `MetaMask/eth-phishing-detect` (DBAD licence) [H 8].
- **Requirements.** MR2: link all three licences; GPL-3.0 means the dataset must carry the GPL notice. MR3: not Sourcify. MR4: a diff-based importer per source commit. MR5: the lookup UI reads Arkiv.
- **Why Arkiv's judges pick it.** `readonly` plus separate removal entities is a creation flag used for a reason. The answer to "what can't the source do?" is that GitHub history can be rewritten and is hard to query.
- **Closest past work.** Ideathon "ThreatWindow" (unplaced). **Twist:** real lists, delisting history, private lookups.
- **Stack options.** Arkiv (Mirror) plus EF Anon-RPC. This depends on Anon-RPC forwarding non-Ethereum JSON-RPC; see workshop questions. The fallback is EF CROPS (Private).
- **Difficulty.** Medium; the Anon-RPC path is the risk.
- **Team fit.** Medium to high.

---

## Track 2: Build on Arkiv (from scratch) ($3,000 / $1,000)

What this track rewards: "Does each Arkiv feature you use change something your users see?", "If you swapped Arkiv for Postgres ... what would your users lose?", and "Can they try it today, and will you keep building it after Mumbai?"

### B1. Quorum Room: a multisig pending-transaction board where a tampered signer UI cannot collect a signature (stacks with ENSv2 and EF CROPS)

- **Pitch.** Proposals, independent decodes and signatures live on Arkiv. A signer's client only enables "Sign" when its own decode matches signed verdicts from a quorum of independent verifiers, and the org's ENSv2 name defines who those verifiers are.
- **Falsifiable promise.** Inject a script that swaps the recipient into one signer's frontend. That signer's screen disagrees with 2 of 2 verifier verdicts on Arkiv, and the Sign button stays disabled. The clean signer can sign.
- **20 second demo.** Two browser windows. On the left, the tampered UI says "Send 100 USDC to alice.eth". The red bar reads "your decode differs from verifiers v1.treasury.eth and v2.treasury.eth: recipient 0xA77..". On the right, the clean window signs, and the Sepolia Safe executes once the threshold is met.
- **Real-world hook (sourced).** Bybit lost about $1.5B in Feb 2025. SlowMist says "the attackers modified Safe{Wallet}'s front-end JavaScript files" ([SlowMist](https://slowmist.medium.com/bybits-1-5-billion-theft-unveiled-safe-wallet-front-end-code-tampered-84b78f0fa9c2); [BleepingComputer](https://www.bleepingcomputer.com/news/security/lazarus-hacked-bybit-via-a-breached-safe-wallet-developer-machine/)). The India hook is WazirX: $234.9M, "Signer Phishing" (DefiLlama, cited in `00_season.md`).
- **Schema.**
  - `proposal`: safe `addr`, chainId `u64`, nonce `u64`, safeTxHash `str`; calldata in `bytes`. `readonly`; expires at the proposal deadline (72 h).
  - `verdict`: proposalKey `key`, intentHash `str`, ok `bool`; `$creator` = verifier. Expires after 24 h, because state changes make old simulations stale.
  - `signature`: proposalKey, sig `bytes`. Expires with its proposal.
  - Writes: proposal plus first signature land in one `executeBatch`. `watchEntityEvents` over WebSocket updates both windows live.
- **ENSv2 role.** The org name has its own Permissioned Registry with signer and verifier subnames. Enhanced Access Control roles say who may add verifiers. A text record on each subname holds that verifier's Arkiv writer address. The client resolves the roster live and filters verdicts with `createdBy(roster)`. **Judgement:** that makes ENSv2 the authorization source, not decoration, which is what "central to the product" needs. An AI-agent verifier as one subname picks up ENS's "Bonus points if you bring AI agents into the mix."
- **Requirements.** BR2: the board, the verdicts and the gate all read Arkiv. BR3 to BR5: the files, with `how-you-use-arkiv.md` explaining each lifetime. BR7: the verdicts are read and they gate signing, so this is not a log.
- **Why Arkiv's judges pick it.** Every feature changes what the user sees: expiry kills stale verdicts, `$creator` defines trust, batches make writes atomic, events drive the live UI. It is the Global Tour "Security" pillar in product form [H 3.7]. Reach: Safe users, Indian exchanges.
- **Closest past work.** Team plan E (SameBuild) proves a frontend build matches its repo; Truthsign (report) proves the screen matches a fork result. **Twist:** a multi-party quorum over decoded intent on a public database, with no Safe Transaction Service in the path.
- **Stack options.** Arkiv (Build) plus ENS "Best Use of ENSv2" plus EF "Best CROPS App". That fills all three partner picks. Add Swarm (S2) at no slot cost. Strong finalist candidate.
- **Difficulty.** High: Safe SDK, ENSv2 on Sepolia and Arkiv in 36 h. Cut line: drop the AI verifier first.
- **Team fit.** High.

### B2. Fuzzfarm: a fuzzing campaign with no coordinator, where shard leases expire and every bug replays (stacks with Swarm)

- **Pitch.** Maintainers post an invariant campaign. Anyone's machine leases a seed shard, keeps the lease alive by extending it, and posts counterexamples. A finding counts only when another wallet reproduces it.
- **Falsifiable promise.** Kill a worker mid-run, and another worker picks up its shard within one lease period, with no coordinator. A judge replays any reported bug on their own laptop with `fuzzfarm replay <key>`, which pulls the call sequence from Swarm and fails the invariant.
- **20 second demo.** Three terminals fuzz a deliberately broken vault with Medusa, Echidna and Foundry invariants. `kill -9` one worker; its lease bar runs out on the dashboard and the shard turns blue on another worker. A counterexample lands with "confirmed by 2 of 2". The judge's laptop replays it and the invariant fails.
- **Schema.**
  - `campaign`: repoCommit `str`, target `str`. Expires at campaign end.
  - `shard`: campaignKey, seedStart `u64`, seedEnd `u64`.
  - `lease`: shardKey; `$creator` = worker. Expires after 10 min; `extendEntity` every 3 min is the heartbeat.
  - `finding`: propertyId `str`, sequenceHash `str`, swarmRef `str`.
  - `confirmation`: findingKey, reproduced `bool`; `$creator` must differ from the finder's.
- **Requirements.** BR2: workers and the dashboard read leases and findings from Arkiv. BR7: claims and leases drive scheduling, so this is not a log.
- **Why Arkiv's judges pick it.** It uses Agents, the first listed direction ("tasks, bids and claims that agents share, query and let expire"). It uses the Global Tour line "`extendEntity` as a lease renewed by activity" literally. Credit for findings rests on `$creator`, which no campaign owner can reassign.
- **Closest past work.** Ideathon "Shared Compute Lease Board" (Marketplaces 2nd), "Handoff" and "ClaimLedger". **Twist:** the task's output can be checked by anyone (counterexamples replay), and confirmation requires independent `$creator`s.
- **Stack options.** Arkiv (Build) plus Swarm (S1). There is no natural second partner, which suits a narrow, Arkiv-tuned entry. EF CROPS (Open Source, Censorship resistant) is plausible but weak.
- **Difficulty.** Medium. Use Foundry invariant tests as the common worker first.
- **Team fit.** Very high.

### B3. Aqua Board: a permissionless SwapVM offer board where an offer lives exactly as long as its deadline (stacks with 1inch)

- **Pitch.** Makers post signed SwapVM orders to Arkiv. Takers query by pair and price range and fill on chain. An offer stays listed only while the maker's keeper keeps extending it, which it does only while balance and allowance still cover the offer.
- **Falsifiable promise.** A taker finds and fills the best offer using only Arkiv and the chain. An expired or revoked offer cannot be found, and no cleanup job ever runs.
- **20 second demo.** A maker posts a three-step ladder. The taker UI runs `tokenIn = addr(USDC) AND tokenOut = addr(WETH) AND price <= dec(3100) ORDER BY price:dec ASC` and fills on a mainnet fork, with token transfers shown. The maker revokes its allowance. The keeper stops extending, and the remaining ladder steps disappear at their next expiry.
- **Schema.**
  - `offer`: tokenIn `addr`, tokenOut `addr`, price `dec`, remaining `u256`, programHash `str`; order in `bytes`. Expiry: `atDate(deadline)` cap, with a 10-min lease extended by the keeper.
  - `fill_receipt`: offerKey, txHash. Expires after 7 days.
- **1inch side.** It uses the official Aqua and SwapVM contracts. A custom instruction (for example, a price step-down by block) makes it "a sophisticated DeFi position", and "Projects that utilize SwapVM will be scored higher". On-chain transfers are shown on a fork ("local forks are ok").
- **Requirements.** BR2: the taker UI reads offers from Arkiv. BR7: offers are discovered by query.
- **Why Arkiv's judges pick it.** It uses the Markets direction ("listings or offers that expire at their deadline") and the ideathon Marketplaces winner's mechanism, "A listing that stays alive only while the seller keeps proving they still have the item", applied to DeFi.
- **Closest past work.** ArcBook (Lisbon 2026 finalist: an on-chain order book of executable pricing curves on Aqua and SwapVM). **Twist:** discovery happens off chain on a public, expiring, queryable board, and liveness is proved by extension rather than by a solver.
- **Stack options.** Arkiv (Build) plus 1inch "Build an Aqua App". A third pick is free; Uniswap is a poor fit.
- **Difficulty.** Medium to high (learning SwapVM).
- **Team fit.** High (DeFi).

### B4. First Blood: tamper-proof precedence for audit-contest findings (narrow, Arkiv only)

- **Pitch.** At the moment a researcher finds a bug, they commit a salted hash of the finding to Arkiv. When dupes are judged, the commit's block proves who found it first, without revealing anything while the contest runs.
- **Falsifiable promise.** A commit reveals nothing before reveal: it is a salted hash with no plaintext. After reveal, anyone can check that the pre-image matches. `$createdAt` and `$creator` cannot be edited by the researcher or the platform.
- **20 second demo.** Two wardens find the same bug at different times. After the contest ends, both reveal. The precedence page shows "0x91.. committed 4 h 12 min earlier (block 1,204,331)". An unrevealed commit vanishes at the end of its window.
- **Schema.**
  - `commit`: contestId `str`, severityClaim `str`, findingHash `str`. `readonly`; expires at contest end plus 14 days.
  - `reveal`: commitKey, preimageHash `str`. Expires after 1 year.
  - Because `$createdAt` cannot be filtered or sorted [H 1], the page reads it and sorts on the client. That limitation goes into `friction.md` with exact reproduction steps.
- **Requirements.** BR2: the precedence page reads Arkiv. BR7: commits are read for adjudication.
- **Why Arkiv's judges pick it.** Expiry cleans up unrevealed commits, `readonly` makes them immutable, and `$creator` is identity. It sits in the same family as the ideathon's "On the Clock" (disclosure embargo as an entity) [H 3.6]. Reach: Code4rena, Sherlock and Cantina wardens (**Judgement:** thousands of active researchers).
- **Closest past work.** On the Clock, and ideathon "prove" (duplicate agent bug reports). **Twist:** contest precedence that hides content until reveal.
- **Stack options.** Arkiv only. Cheap enough to sit beside a big main build on other prizes.
- **Difficulty.** Low to medium.
- **Team fit.** Very high (auditors).

### B5. Contactable: a security contact directory keyed by ENS names, where a contact vanishes unless the team keeps answering (narrow, ENSv2 optional)

- **Pitch.** During a live exploit, a whitehat asks "who answers for contract 0x..?" The answer is either a contact whose team responded to a liveness challenge in the last 30 days, or "no live contact". It is never a stale email.
- **Falsifiable promise.** A judge queries any covered contract and gets a live contact or an explicit absence. When the team stops answering challenges, the contact disappears at its expiry block, and nobody has to remove it.
- **20 second demo.** Query a covered contract and get "SEAL-style contact for protocol.eth, renewed 3 days ago". Switch to a team that ignored the last challenge: "no live contact, last renewed 34 days ago". The "Why" tab shows the expired lease on the explorer.
- **Schema.**
  - `contact`: ensName `str`, channel `str`, pgpFingerprint `str`, slaHours `i32`. Owned by the wallet the ENS name resolves to, with the check done client side. Expires after 30 days; `extendEntity` happens only after a signed challenge response.
  - `scope`: contract `addr`, contactKey `key`.
- **Requirements.** BR2: the lookup reads Arkiv. BR7: lookups are the product.
- **Why Arkiv's judges pick it.** It uses the "Names and identity: profiles or service directories keyed by ENS names" direction. Expiry is truth ("Half-Life" pattern), and trust comes from on-chain ownership rather than a field.
- **Closest past work.** Ideathon "Half-Life" and "Warranti" mechanics, applied to security response. **Twist:** a liveness challenge before every renewal.
- **Stack options.** Arkiv only by default. Add ENSv2 only if the workshop agrees that per-protocol Permissioned Resolver records pointing to the contact count as "central".
- **Difficulty.** Low to medium.
- **Team fit.** High.

---

## Track 3: Node tooling ($2,000, single winner)

What this track rewards: "Would people who run Arkiv nodes, or Arkiv's engineers, actually use this?", "What does it show or find that the node's built-in tools don't?", and "Can someone else install and run it from your README in a few minutes?" The node is `arkiv-reth` in Rust, with a Kurtosis devnet in the public repo [H 1].

### N1. Grammarsmith: a grammar fuzzer and differential tester for `arkiv_query` on your own node (narrow, Arkiv only)

- **Pitch.** It generates query shapes from the documented grammar, loads synthetic data with controlled cardinality, measures latency per shape class, and delta-debugs each slow class down to a minimal reproducer. It also checks that equivalent queries return the same rows.
- **Falsifiable promise.** Against a local node, within 10 minutes it reports (a) the slowest query classes as counts and ratios to the median, with minimal reproducers written only to a local encrypted report, and (b) any pair of logically equivalent queries that return different rows.
- **20 second demo.** A live histogram fills as the fuzzer runs. A counter ticks "slow classes found: 3 (sent privately)". Then a differential panel shows "`a BETWEEN 1 AND 5` vs `a >= 1 AND a <= 5`: 0 mismatches over 40,000 pairs", or a mismatch if one exists. Shapes stay hidden, as the rules require.
- **Requirements.**
  - NR1: a new repo, a CLI plus Docker Compose running next to the node.
  - NR2: runs against a Kurtosis devnet from `Arkiv-Network/arkiv` or a local Rabdi follower.
  - NR3: README names the node image tag and gives reproduction steps. It writes no entities, so no `schema.md` is needed.
  - NR4: `friction.md` covers running the node.
  - NR5: the four files.
  - NR6: slow shapes go to an encrypted `report.age` sent to Arkiv through the channel given at the booth. The public repo has a redaction test that fails CI if a generated shape appears in any tracked file.
- **Why Arkiv's judges pick it.** It does the brief's "Slow query finder", plus a correctness oracle that no dashboard has, which answers "What's new" directly. Arkiv already maintains `docs/query-language-conformance.md` in the node repo [H 1], so its engineers clearly care about conformance.
- **Closest past work.** ETHWarsaw 2025 consoles (GolemDB Studio query playground) were manual [H 3.1]. **Twist:** automated generation, minimisation and differential testing.
- **Stack options.** Arkiv only, a narrow entry. It is the team's strongest skill fit for the smallest pool.
- **Difficulty.** Medium.
- **Team fit.** Excellent (fuzzing).

### N2. Diskclock: an operator dashboard whose "days until full" accounts for entities already scheduled to expire

- **Pitch.** It runs as a sidecar next to the node. It combines disk growth, per-method request rate and latency (through a tiny reverse proxy), and the node's own expiry schedule (`arkiv_getEntityCount` over `$expiresAt` ranges) into an honest days-until-full figure, with an alert.
- **Falsifiable promise.** On a devnet with a scripted expiry cliff (50,000 entities expiring at once), Diskclock's forecast before the cliff predicts disk use after it more accurately than a linear forecast, and the error is shown on screen. If the node does not reclaim space on expiry, the tool shows that, and it is a real finding for Arkiv.
- **20 second demo.** Two lines: "naive: full in 2.1 days" and "Diskclock: steady state 61%". The cliff passes, and the actual line follows Diskclock's (or visibly does not, which goes into `friction.md`).
- **Requirements.** NR2: devnet, with a Rabdi follower if available. The listed operator dashboard items ("days are left before the disk is full (with an alert), requests and latency per method, peers, sync, CPU and memory") are all covered. NR6: no query shapes are involved.
- **Why Arkiv's judges pick it.** Only a tool next to the node can see the expiry schedule and the disk together, which answers "show what only a tool next to the node can see." It is not a repackaged Grafana board, because the forecasting model is new.
- **Closest past work.** nodes.arkiv.network sees nodes from the outside. **Twist:** a forecast that knows about expiry.
- **Stack options.** Arkiv only. Swarm (S5) can archive the daily reports.
- **Difficulty.** Low to medium.
- **Team fit.** Medium.

### N3. Proofwatch: a sidecar that catches your node serving wrong answers, not just slow ones

- **Pitch.** It continuously compares the local node with peer nodes on head, state root and the result sets of canary queries. It spot-checks sampled entities with `eth_getProof` against the state root, and alerts when the local index diverges.
- **Falsifiable promise.** Stop the local node's sync for 2 minutes, or corrupt its view by pointing it at a forked devnet. Proofwatch raises "divergent: 37 of 200 canary results differ, state root mismatch at block N" within one check interval.
- **20 second demo.** Two nodes, one paused. The dashboard flips from "agreeing with 3 peers" to "stale by 64 blocks; 12% of canary queries differ".
- **Requirements.** NR2: devnet with two followers. NR3: if it publishes signed status entities (5-minute expiry), the wallets and a `schema.md` go in the README.
- **Why Arkiv's judges pick it.** It answers "What does it tell them that they need to know?" directly. An operator cannot see from inside their own node that it disagrees with the network, and outside monitors cannot check proofs.
- **Closest past work.** None in Arkiv's record. Ethereum client diff tools exist for EL clients, not for DB-chain query results.
- **Stack options.** Arkiv only, or EF Anon-RPC if canaries also run through Anon-RPC (weak).
- **Difficulty.** Medium.
- **Team fit.** High (differential testing mindset).

### N4. Quiet Arkiv: let node operators serve `arkiv_query` through Anon-RPC, and see their load without logging who asked (stacks with EF Anon-RPC)

- **Pitch.** An operator package that sits next to an Arkiv node. It registers the node as an Anon-RPC network endpoint and shows the operator per-method load and latency as k-anonymised counts with no client IPs. Arkiv queries reveal intent (which label, contract or listing you looked up), so the Arkiv network needs private reads too.
- **Falsifiable promise.** A client using the Anon-RPC harness completes `arkiv_query` against our node. The node's access log and the operator dashboard contain no client IP, while the dashboard still shows correct per-method counts.
- **20 second demo.** Split screen. On the left, a browser app queries Arkiv through Anon-RPC. On the right, the operator view counts "arkiv_query 1,204/min, p95 180 ms" and `grep` over the server logs finds no client address.
- **Requirements.** NR1 to NR5 as above. EF: "produces anonymity via a new Anon-RPC worker" or "new network". "If you're building a worker or the harness, a simple demo app is enough."
- **Why Arkiv's judges pick it.** It gives operators a new reason to run a node (serving private queries) and a new metric. **Judgement:** it also helps Arkiv's CROPS story, which Arkiv used as its October theme [H 3.7].
- **Closest past work.** Team plan A (Lightfoot) and the report's "Quiet Port" (Anon-RPC as an endpoint), both for Ethereum reads. **Twist:** a new network type and an operator view with privacy-preserving metrics.
- **Stack options.** Arkiv (Node tooling) plus EF "Best Use of Anon-RPC". A third pick is free.
- **Difficulty.** High. It depends on Anon-RPC accepting non-Ethereum JSON-RPC; workshop questions A1 and E1.
- **Team fit.** Medium.

### N5. Beacon: operator heartbeats as expiring entities, with daily snapshots archived on Swarm (stacks with Swarm)

- **Pitch.** A sidecar writes the operator's signed `node_status` entity: version, head, peers, sync lag, disk days left. It expires in 5 minutes and is extended every minute while the node is healthy. A dead node disappears from every status page built on Arkiv. Daily metric bundles go to Swarm.
- **Falsifiable promise.** Kill the node, and within 5 minutes its status entity is gone from the community view, with no scraper or central server. Any day's report opens from its Swarm reference.
- **20 second demo.** Three operator tiles. `docker stop` one, and its tile fades out at expiry. Click yesterday's report, and a CSV and chart load from a Bee gateway.
- **Requirements.** NR3: wallets and `schema.md`, since it writes entities. SR1 to SR3 for Swarm.
- **Why Arkiv's judges pick it.** The decentralised node program can then build its own status page without crawling. It uses the "lease renewed by activity" pattern [H 3.7].
- **Closest past work.** nodes.arkiv.network, an outside view. **Twist:** operator-signed internals, with absence meaning "down".
- **Stack options.** Arkiv (Node tooling) plus Swarm bonus (S5).
- **Difficulty.** Low to medium.
- **Team fit.** Medium.

---

## Track 4: Arkiv + Swarm bonus (from scratch, $500, stacks on a track prize)

"The most useful integration wins." **Judgement:** that means files a user actually opens through the product, with the envelope-encryption rule handled visibly. Each idea below is the Swarm half of a track idea above, so it never needs a separate project.

### S1. Fuzzfarm corpora and replay bundles (with B2)

- **Pitch.** Campaign corpora and every counterexample's call sequence and trace live on Swarm. Arkiv `finding.swarmRef` points to them, and a Swarm feed per campaign gives the latest corpus.
- **Falsifiable promise.** `fuzzfarm replay <findingKey>` on a clean laptop fetches the sequence from Swarm through the reference in Arkiv and reproduces the failure.
- **20 second demo.** The judge-laptop replay moment from B2, with the Swarm URL visible.
- **Requirements.** SR1: both systems are used. SR2: the `swarm.md` fields map to `finding.swarmRef` and `campaign.feedAddress`. SR3: corpora are public, so references are stored unencrypted, and the README says why.
- **Why it wins the bonus.** The Swarm file is the product's output (the bug), not an attachment.
- **Closest past work.** Walrus replays in Void Tactics (New York 2026 finalist, `research_notes/`). **Twist:** an evidence file anyone can check.
- **Stack options.** Arkiv only, as part of the Build track entry. **Difficulty.** Low on top of B2. **Team fit.** High.

### S2. Quorum Room encrypted proposal bundles (with B1)

- **Pitch.** The full Safe transaction bundle and simulation trace are uploaded encrypted to Swarm. The encrypted Swarm reference is then wrapped (ECIES) to each signer's key, and only the wrapped references go into Arkiv entities.
- **Falsifiable promise.** An outsider who reads every Arkiv entity cannot open the bundle. Each signer can, from their own key.
- **20 second demo.** Open the entity on the explorer: ciphertext only. Open it in a signer's client: the trace renders.
- **Requirements.** SR3, handled in full: "encrypt it first". This is the envelope pattern ETHNS rated 5 ("encrypted-payload patterns with envelope encryption") [H 3.4].
- **Why it wins the bonus.** It is the bonus's own example ("upload them encrypted so only the people who get the reference can open them"), done correctly.
- **Closest past work.** ETHNS privacy entries (ArkivRoom, VEIL), none of which won. **Twist:** a multisig audit trail, where the security property matters.
- **Stack options.** Rides inside B1's three-partner stack at no extra slot. **Difficulty.** Medium. **Team fit.** High.

### S3. Exploit Atlas evidence packs (with M2)

- **Pitch.** Each `repro` entity points to a Swarm bundle: the Foundry trace, the runner's environment and the exact PoC commit hash (a link, not copied source, because of the per-file UNLICENSED headers).
- **Falsifiable promise.** Every "reproduced" badge opens a trace a judge can read.
- **20 second demo.** Click the badge, and the trace opens from a Bee gateway.
- **Requirements.** SR1 to SR3 (public traces, references stored unencrypted).
- **Why it wins the bonus.** The evidence is opened in the product's main flow.
- **Stack options.** Arkiv only. **Difficulty.** Low on top of M2. **Team fit.** High.

### S4. A mirror frontend that outlives its domain (with M1 or M3; stacks with EF CROPS)

- **Pitch.** The Clearsight or RPC Truth Table UI is published to Swarm. A `release` entity, `readonly` with `$creator` = the release key, holds the current manifest reference. Any Bee gateway serves the UI, and the UI reads Arkiv directly.
- **Falsifiable promise.** Take down our domain and Vercel deployment, and the UI still loads from Swarm and answers queries.
- **20 second demo.** `vercel remove`, refresh through a Bee gateway, run the query.
- **Requirements.** SR1 to SR3. EF CROPS asks for "a frontend that keeps working when its domain, backend or RPC provider disappears", and its demo requirement ("you switch off your backend") is the same moment.
- **Why it wins the bonus.** Users open it every visit.
- **Closest past work.** Team plan E (SameBuild: proves the build matches the repo). **Twist:** release pointers on Arkiv signed by `$creator`.
- **Stack options.** Arkiv plus EF CROPS. **Difficulty.** Low to medium. **Team fit.** Medium.

### S5. Beacon daily reports (with N5)

- **Pitch.** Each operator's daily metrics bundle goes to Swarm, and `node_report` entities (90-day expiry) point to it.
- **Falsifiable promise.** Any listed day opens.
- **20 second demo.** Click yesterday's report.
- **Requirements.** SR1 to SR3.
- **Why it wins the bonus.** It is useful but small. **Judgement:** the weakest of the five on "most useful".
- **Stack options.** Arkiv only. **Difficulty.** Low. **Team fit.** Medium.

---

## Track combo pass

Picks are capped at 3 partners, with Arkiv as one and EF as one with a single EF placement. The finalist track is outside the cap.

| Idea | Arkiv track | Swarm bonus | Partner 2 | Partner 3 (EF prize, at most one) | Finalist odds (Judgement) | Arkiv-only upside |
|---|---|---|---|---|---|---|
| B1 Quorum Room | Build | S2 | ENS Best Use of ENSv2 | EF Best CROPS App | High | $3,500 |
| M4 Delegation Lens | Mirror | optional | none or ENS (weak) | EF Best CROPS App | High (Binance timing) | $3,000 |
| M1 Clearsight (+Truthsign fork check) | Mirror | S4 | free | EF Best CROPS App | Medium to high | $3,500 |
| B3 Aqua Board | Build | none | 1inch Build an Aqua App | free (or none) | Medium | $3,000 |
| M3 RPC Truth Table | Mirror | S4 | free | EF Best Use of Anon-RPC | Low to medium | $3,500 |
| M5 Denylist Ledger | Mirror | none | free | EF Anon-RPC (or CROPS) | Low to medium | $3,000 |
| N4 Quiet Arkiv | Node tooling | none | free | EF Best Use of Anon-RPC | Low | $2,000 |
| B2 Fuzzfarm | Build | S1 | none | none | Medium | $3,500 |
| M2 Exploit Atlas | Mirror | S3 | none | none | Low | $3,500 |
| B4 First Blood | Build | none | none | none | Low | $3,000 |
| B5 Contactable | Build | none | ENS only if central | none | Low | $3,000 |
| N1 Grammarsmith | Node tooling | none | none | none | Low | $2,000 |
| N2 Diskclock / N3 Proofwatch / N5 Beacon | Node tooling | N5 only | none | none | Low | $2,000 to $2,500 |

**Recommended combos (Judgement).**
1. **Main build with full stack:** B1 Quorum Room plus S2: Arkiv Build, ENSv2 and EF CROPS, entered as a finalist. Best use of all three picks, a security story judges already know (Bybit, WazirX, Binance), and every Arkiv feature visible in the demo. Biggest scope risk; the cut order is AI verifier, then Swarm, then live WebSocket updates.
2. **Mirror path for a lighter build:** M1 Clearsight plus S4 with EF CROPS, or M4 Delegation Lens with EF CROPS. Either leaves one pick free for whichever main build the team chooses from plans A to E. Both feed a signing-safety story (`00_season.md` section 5).
3. **If the team's main project targets other sponsors entirely:** add M2 Exploit Atlas or B4 First Blood as a small Arkiv-only side entry. **Caution:** Arkiv's track must be part of the same submitted project, so a side entry is only possible if it is integrated into that project, for example the main build reading Exploit Atlas data. Otherwise, choose one Arkiv track for the one project.
4. **Node tooling only if the main build already covers Arkiv's pick poorly:** N1 Grammarsmith is the team's best skill match, but $2,000 is the smallest pool, and it cannot share a project with a Build or Mirror win (one Arkiv track per team).

**Fit with existing plans A to E (Judgement, no copying).** Plan A (Lightfoot) pairs with M3 or M5 for an Arkiv pick, because both use Anon-RPC. Plan E (SameBuild) pairs with S4. Plan D (alt mempool) shares 7702 and authorization expertise with M4. Plans B and C have no natural Arkiv fit.

## Workshop questions

The Arkiv workshop is Thu 5 Nov at 16:00 in Room 2 and clashes with ENS at 16:00 in Room 1, so split the team.

**Arkiv (Thu 16:00, Room 2, Santiago Trujillo Zuluaga)**
- A1. Does a function-signature mirror from 4byte.directory or `ethereum-lists/4bytes` count as "Sourcify data", given that Sourcify's 4byte database contains 4byte.directory and openchain data?
- A2. Is the ERC-7730 clear-signing registry "something Ethereum depends on"? What import freshness do you expect (minutes, hours)?
- A3. Is public chain data (for example, EIP-7702 delegations) acceptable under "The data's license allows republishing", and what should the README link?
- A4. What is the Rabdi access-key quota in cost units? How many entity writes and indexed attributes fit in 36 hours, and can teams get a raised quota for mirrors?
- A5. Which SDK should we use: 1.0.0 (published 30 Oct) or 0.8.x? Does `watchEntityEvents` work over WebSocket on Rabdi, given the docs say it polls?
- A6. Can `$createdAt` be filtered or sorted (the docs say no)? Is that a known gap or by design?
- A7. Node tooling: which node image do community operators run on Rabdi? Can we run a Rabdi follower locally, or only the Kurtosis devnet? Is there a Prometheus metrics endpoint? Does disk space come back when entities expire?
- A8. How do we send slow query shapes privately? Do correctness mismatches (equivalent queries, different rows) count, and may the demo show counts only?
- A9. Swarm: will postage batches be handed out, and through which Bee gateway or service? Is ACT supported for the encrypted case?
- A10. For Reach, are figures from the source (GitHub stars, dependents, known consumers) acceptable evidence?
- A11. When are Arkiv results announced, and who judges?
- A12. Were the Global Tour Stop winners announced? Which projects won the Security and Open Source pillars?

**EF (Thu 17:00, Room 2)**
- E1. Can an Anon-RPC worker or harness forward a non-Ethereum JSON-RPC network such as Arkiv (`arkiv_query`)? Would that count as "new network"?
- E2. For CROPS, does a mirror that works without GitHub and without our server (M1 or M4) count as a structural lead property?

**ENS (Thu 16:00, Room 1, clashes with Arkiv)**
- N1. Is a signer and verifier roster held in an ENSv2 Permissioned Registry with Enhanced Access Control roles "central to the product"? Is ENSv2 fully usable on Sepolia this week?

**1inch (Thu 17:30, Room 2)**
- I1. Does an off-chain SwapVM offer board with a custom step-down instruction count as "a sophisticated DeFi position"? Must orders be filled through Aqua, or is direct SwapVM fine?

## Open risks (Judgement)

- **Testnet or SDK breakage during the 36 hours** is the single biggest risk for every Arkiv idea (ETHNS slipped 48 h). Mitigation: pin SDK 1.0.0, keep a local Kurtosis devnet as a fallback for development only (submissions must write to Rabdi), and log everything in `friction.md` as it happens.
- **Quota:** mirrors must batch writes and set lifetimes sparingly. Measure cost on day one.
- **Listed ideas attract rivals:** M3 (registries) and "function signatures". Prefer M1, M2 or M4 for Mirror.
- **Swarm logistics:** without a provided batch, buying one needs xBZZ on Gnosis. Confirm at the booth (A9) before planning the Swarm demo.
