# Arkiv: judged ideas for ETHGlobal Mumbai (fresh builds only)

Judged 2026-10-31 by a simulated panel: two Arkiv prize judges (a product judge who reads `reach.md` and `why-arkiv.md`, and a platform judge who checks the chain, the code and `friction.md`), plus one skeptical hackathon veteran who checks whether a 3-person DeFi and security team can ship it in 36 hours. Team: Classic track, built from scratch, no existing project. Continuity-only tracks ("Build on Arkiv (existing projects)" and its Swarm bonus twin) are ignored.

Inputs: the Arkiv section of `track_ideas/00_current_tracks.md` (verbatim prize text, fetched 2026-10-31 from [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)), the dossier `track_ideas/history/arkiv.md` (cited as [H n]), the draft `track_ideas/ideas_draft/arkiv.md`, and `track_ideas/00_season.md`. No ETHGlobal page was fetched for this step; the prize text comes from the 2026-10-31 snapshot. A few Arkiv and dataset facts were checked live today (section 2).

**How to read this file.** Lines with a URL are sourced facts. Everything labelled **Judgement**, every score and every verdict is the panel's own opinion.

**Scoring (Judgement).** Each idea gets 1 to 10 on each of its track's four published criteria, plus Novelty (against past Arkiv winners, ETHGlobal finalists and the rivals we expect) and Feasibility (36 hours, this team). Overall = 0.7 x mean of the four track criteria + 0.15 x Novelty + 0.15 x Feasibility. The Swarm bonus has no numeric rubric, so it is scored on three readings of "The most useful integration wins" (section 7).

---

## 1. What Arkiv's judges reward (from the dossier)

Mumbai is Arkiv's first ETHGlobal prize, so there are no ETHGlobal winners to copy [H 2]. Its own challenges from September 2025 to October 2026 show a clear pattern [H 3, 4]:

1. **One primitive carries the product's main rule.** In the winners, expiry is the access control (Susurro), forgetting (Cortex) or the legal validity (Layak); `changeOwnership` is the custody handover (NotarIA). Entries that just stored app data on Arkiv did not place [H 4.1].
2. **Lifetimes differ by entity type and follow product logic.** Agora gave 7 entity types 7 lifetimes. Every rubric from February to October scores this [H 3.3, 3.7].
3. **Trust comes from `$creator`, never from a writable field.** "Anyone can write an entity with your tag" ([define a schema](https://docs.arkiv.network/schemas/define/)). The October Security pillar scored exactly this [H 3.7].
4. **Evidence a judge can click.** Wallets, transactions, a query that runs. "a feature claimed but not found counts against you" ([Global Tour rubric](https://github.com/Arkiv-Network/global-tour-stop-pre-devcon/blob/main/docs/scoring-rubric.md)).
5. **Reusable output** (an npm SDK, MCP server or plugin), which feeds Mumbai's 25% Reach criterion (Cortex, Ark Hive) [H 3.4].
6. **A rigorous friction report.** It is 25% of every Mumbai track. "Invented complaints score 0" ([Global Tour rubric](https://github.com/Arkiv-Network/global-tour-stop-pre-devcon/blob/main/docs/scoring-rubric.md)).
7. **Not rewarded:** polish alone (Design and UX has weighed 0% since October), counting features, template verticals, personal data on chain [H 4.2].

**Judgement: what changed for Mumbai.** Two of the three fresh tracks pay for infrastructure: datasets that others depend on (Mirror) and tools for node operators (Node tooling). Reach replaced Functionality as a scored criterion. A mirror wins on whom the data already serves and what the Arkiv copy can do that the source cannot; a node tool wins on what only a process next to the node can see.

## 2. Facts checked today that change the ideas (sourced, 2026-10-31)

- **Rabdi is live and young.** `eth_blockNumber` on `https://rpc.rabdi.db-chain.testnet.arkiv.network` returned `0x49ac` (block 18,860) at 05:10 UTC. The response carried `ratelimit: limit=2000, remaining=1999, reset=10` and exposed the headers `Arkiv-Cost`, `Arkiv-Quota-Used-Percent` and `Arkiv-Block-Rewritten`. (Direct JSON-RPC call to the [Rabdi RPC](https://rpc.rabdi.db-chain.testnet.arkiv.network).)
- **Anyone can run a Rabdi follower with Docker.** "Docker is the only requirement ... `./run-node.sh`". The follower is "reth hosting the Arkiv entity engine ... stock reth cannot follow this chain", and it is read-only: "it holds no keys, needs no funding, and proposes nothing". The first sync restores a snapshot listed at `https://testnet.snapshots.arkiv.network/rabdi/latest.json`. The RPC is HTTP and "WebSocket at `wss://rpc.rabdi.db-chain.testnet.arkiv.network`" ([Rabdi network README](https://github.com/Arkiv-Network/db-chain-networks/tree/main/networks/testnet/rabdi)).
- **That snapshot manifest returned HTTP 404 today** (`https://testnet.snapshots.arkiv.network/rabdi/latest.json`). **Judgement:** if it is still missing on Thursday, a follower syncs from genesis, which is quick on a chain this young, and the 404 is a genuine `friction.md` item for Node tooling.
- **Arkiv is doing index and load work right now.** The network registry describes Sorbet as "Testnet prefilled with the Sourcify contract dataset; ... used for index rewrite and load work" ([db-chain-networks](https://github.com/Arkiv-Network/db-chain-networks)). **Judgement:** a slow-query finder or a result-correctness checker lands on a live engineering concern.
- **The entity model changed under the SDK.** Arkiv's own decoder targets "the UDC entity model of `@arkiv-network/sdk` 0.9: schema-typed attributes, no payload and no content type"; "`bytes` is stored but never indexed" ([arkiv-transaction-decoder](https://github.com/Arkiv-Network/arkiv-transaction-decoder)). npm dist-tags today: `latest` 1.0.0, `next` 0.9.0-next.5, `advanced` 0.8.0-advanced.3, last modified 2026-10-30 ([npm](https://www.npmjs.com/package/@arkiv-network/sdk)). **Judgement:** design every schema with typed attributes plus `bytes`, with no free payload field. Pin one SDK version on day one.
- **Security reports have a private channel.** "Do not open a public issue for security vulnerabilities. Please report them privately through GitHub Security Advisories" ([reported-issues](https://github.com/Arkiv-Network/reported-issues)). Public bugs go to the same repo, which makes it a natural link target for `friction.md`.
- **Dataset licences and freshness** (GitHub API today): `ethereum/clear-signing-erc7730-registry` CC0-1.0, last push 2026-10-31 ([repo](https://github.com/ethereum/clear-signing-erc7730-registry)); `l2beat/l2beat` MIT, last push 2026-10-30, 248 `discovered.json` files, each with a `permissions` map from holder address to `receivedPermissions` entries (`permission`, `from`, `role`, `description`) ([repo](https://github.com/l2beat/l2beat); [example file](https://github.com/l2beat/l2beat/blob/main/packages/config/src/projects/across/discovered.json)); `ethereum-lists/chains` MIT, 9,835 stars ([repo](https://github.com/ethereum-lists/chains)); `scamsniffer/scam-database` GPL-3.0 ([repo](https://github.com/scamsniffer/scam-database)); `MetaMask/eth-phishing-detect` shows NOASSERTION on GitHub, and its LICENSE is the "DON'T BE A DICK PUBLIC LICENSE" [H 8]; `SunWeb3Sec/DeFiHackLabs` Apache-2.0 at repo level [H 8].
- **Prior art for Safe hash checking.** `pcaversaccio/safe-tx-hashes-util` (AGPL-3.0, 415 stars, pushed 2026-10-26) "calculates the Safe transaction hashes" ([repo](https://github.com/pcaversaccio/safe-tx-hashes-util)); OpenZeppelin `safe-utils` is a UI that does the same ([repo](https://github.com/openzeppelin/safe-utils)). Octopus AI, an AI co-signer in a Safe "framed as a defense against Bybit-style blind-signing hacks", was a Trifecta track finalist ([showcase](https://ethglobal.com/showcase/octopus-ai-2xcne); `research_notes/.../finalists_2025q1_2025q3.md`).

## 3. Shared requirement checklist (verbatim, from [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv))

Every final idea is built fresh at the event from public libraries and starter kits only (MR1, BR1, NR1 pass), ships an MIT repo with an AI-use section (MR9, BR6, NR7 pass), and keeps each file to the paths given. Per-idea checklists below list only the codes where something idea-specific must be done or is at risk.

**Mirror something Ethereum depends on:** MR1 "Built from scratch at ETHGlobal Mumbai, following ETHGlobal's rules." MR2 "The data's license allows republishing. Link it in your README." MR3 (won't place) "Not Sourcify data, from any chain." MR4 "Your import script is in the repo, and we can re-run it." MR5 "Your project writes to Arkiv's current testnet ... and a feature or query people use reads the data from Arkiv." MR6 "In your README: the wallet address(es) that wrote your entities, and one query we can run." MR7 "`/arkiv/schema.md` ... `/arkiv/friction.md`". MR8 one file per criterion: `friction.md`, `reach.md`, `why-arkiv.md`, `data-quality.md`. MR9 "A public repo with an open-source license. Say how you used AI".

**Build on Arkiv (from scratch):** BR1 as MR1. BR2 "Your app writes to Arkiv's current testnet ... and at least one feature users see reads its data from Arkiv." BR3 as MR6. BR4 `schema.md` and `friction.md`. BR5 `friction.md`, `reach.md`, `why-arkiv.md`, `how-you-use-arkiv.md`. BR6 as MR9. BR7 (won't place) "Not counted: the SDK installed but never used to read, or Arkiv used only as a log that nothing reads."

**Node tooling:** NR1 "a new repo that runs next to the node. A pull request to an existing repo is not from scratch." NR2 "It works against an Arkiv node in your demo. A node on your own machine is enough." NR3 "In your README: which node you used, and how to reproduce the demo. If your tool writes Arkiv entities, also the wallet address(es) ... and a `/arkiv/schema.md`." NR4 `friction.md` on running and querying the node. NR5 `friction.md`, `real-use.md`, `whats-new.md`, `easy-to-run.md`. NR6 (won't place) "Slow query shapes you find go to us privately ... never into your public repo, `/arkiv/friction.md` or demo." NR7 as MR9.

**Arkiv + Swarm bonus (from scratch):** SR1 (won't place) "A project that uses only Swarm does not qualify." SR2 `/arkiv/swarm.md` with: what is on Swarm and on Arkiv and "which entity field holds the Swarm reference or feed"; "One Arkiv entity key and the Swarm reference it points to, with a link we can open"; "The postage stamp batch ID ... and the wallet that bought it (or who gave you the batch), and the Bee node or service"; "The files in your repo that upload to Swarm and read from it"; "Steps to run one upload and one read yourself"; "The moment in your demo video where Swarm is used"; "What got in your way with Swarm." SR3 "an encrypted Swarm reference contains its key, and Arkiv entities are public. Never store one in an entity as it is: encrypt it first or keep it off Arkiv." SR4 enter by selecting the bonus with a Mirror, Build or Node tooling submission.

**Cross-track:** "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it." Arkiv counts as one of the three partner picks.

**Judgement, applies to all:** (a) give every entity a judge must inspect a lifetime of at least 30 days, because results may be judged after Saturday; the October rubric asked for "Evidence that survives expiry" [H 3.7]; (b) every read that matters filters by `$creator` or `$owner`; (c) start `friction.md` at hour 0 with versions, expected and actual results and reproduction steps, and file each public bug in `reported-issues`.

---

## 4. Track 1: Mirror something Ethereum depends on ($3,000 / $1,000)

Rubric: Arkiv feedback 25%, Reach 25%, Why Arkiv 25%, Data quality 25%.

**Adversarial view (Judgement).** The listed ideas ("token lists, chain and RPC registries, address labels, wallet ratings, function signatures") will be copied by several teams each. Function signatures are a trap: Sourcify now runs the 4byte database, which ingests 4byte.directory and openchain [H 8]. Scraped explorer labels have a doubtful licence. The winning mirror is a dataset with known consumers that is *not* on the list, or a listed one with a feature the source cannot offer.

| Rank | Idea | Overall | Verdict | Stack |
|---|---|---|---|---|
| 1 | M1 Clearsight: ERC-7730 clear-signing registry with code-drift checks | 8.0 | revise | Arkiv Mirror + Swarm S4 + EF CROPS |
| 2 | M2 Keyring Atlas: L2BEAT permissions, searchable by the key that holds them | 7.7 | new (replaces Exploit Atlas) | Arkiv Mirror; EF CROPS optional |
| 3 | M3 RPC Truth Table: chain registry with signed honesty probes | 7.2 | revise | Arkiv Mirror + EF Anon-RPC |
| 4 | M5 Denylist Ledger: scam and sanctions lists with delisting history and bucketed private lookups | 7.0 | revise | Arkiv Mirror; EF Anon-RPC or CROPS optional |
| 5 | M4 Delegation Lens: EIP-7702 delegate targets as a wallet-queryable index | 6.8 | revise | Arkiv Mirror + EF CROPS |

Dropped: **M2 Exploit Atlas** (draft). Why: individual PoC files carry `SPDX-License-Identifier: UNLICENSED` (draft, checked on 2026-10 files), which puts MR2 at risk. A fork replay at a fixed historical block is deterministic, so "repro expires after 30 days" is expiry with no product meaning, and Arkiv's judges have not rewarded that [H 4.2]. An exploit archive is also a weaker answer to "How many people or projects already use or depend on this data?" than a registry that wallets consume. Its Swarm twin S3 goes with it.

### M1. Clearsight: the ERC-7730 clear-signing registry on Arkiv, with code-drift checks (revise)

- **Pitch.** Every clear-signing descriptor, queryable by chain, contract and selector, each binding stamped by an independent checker with whether the deployed code still contains that function and whether the proxy implementation has changed since the descriptor was imported.
- **Falsifiable promise.** A judge picks any (chain, contract, selector) in the registry. Arkiv returns the same descriptor as GitHub HEAD at the commit named in the entity, within 30 minutes of a merge. The drift badge agrees with what `eth_getCode` and the EIP-1967 implementation slot return at that moment.
- **Demo moment.** Type the Uniswap Universal Router and a selector: the descriptor renders as a wallet signing screen. Open a proxy whose implementation changed after import: the badge reads "implementation changed at block N since descriptor commit abc123". Block github.com in the browser and repeat the lookup: it still works.
- **Changes from the draft.** (1) Drift is measured forward from the first import (implementation and codehash recorded as a baseline), with backward drift to the merge block only where an archive RPC is available; this removes a hard dependency on archive state. (2) The selector check says what it is: a scan for `PUSH4 <selector>` in the dispatcher, reliable for Solidity and marked "not checked" for Vyper. (3) A tiny npm package `@clearsight/arkiv` exposes `getDescriptor(chainId, to, selector)` and a matching MCP tool, for Reach. (4) No `bytes` field holds anything wider than the descriptor JSON, gzipped.
- **Schema (fits the 1.0 typed-attribute model).** `descriptor`: chainId `u64`, address `addr`, owner `str`, commit `str`, contentHash `str`, json `bytes`; created `readonly`; lifetime 365 days, extended by the importer while the file is still at HEAD. `binding`: chainId `u64`, address `addr`, selector `str`, descriptorKey `key`; lifetime as its descriptor. `drift_check`: bindingKey `key`, implementation `addr`, codehash `str`, selectorPresent `bool`, checkedAtBlock `u64`; `$creator` = checker wallet; lifetime 7 days, so a binding with no live check reads "unchecked".
- **Query a judge can run** (syntax per the [query language page](https://docs.arkiv.network/reference/query-language/), confirm on day one):

```
chainId = u64(1) AND selector = str('0x3593564c')
```

- **Requirement checklist.** MR2 pass: CC0-1.0 ([registry](https://github.com/ethereum/clear-signing-erc7730-registry)), linked in README. MR3 pass: the registry is not Sourcify data; never copy Sourcify's verification flag (a link out to Arkiv's own [Sourcify mirror](https://sourcify.arkiv.network) by address is the most we do, and we ask first, see Q1). MR4 pass: `import.ts --since <sha>`, idempotent by contentHash, run by a scheduled GitHub Action. MR5 pass: the lookup UI, npm package and MCP tool read Arkiv. MR6 pass: importer and checker wallets plus the query above. MR7, MR8: `data-quality.md` reports descriptor count, binding count, lag from HEAD in minutes and the share of bindings checked in the last 7 days.
- **Why it beats rivals (Judgement).** Rival mirrors will copy a list; this one adds a security fact the source lacks, written by a second `$creator`, and gives each entity type its own lifetime, both scored features [H 3.7]. "What can people do with your copy that they can't with the original?" has three concrete answers: filter by selector across every descriptor file, trust a commit-pinned `readonly` entity that a force-push cannot rewrite, and see code drift. Reach: Trezor shipped ERC-7730 on 8 Sep 2026 with descriptors from 1inch, Aave, Lido, Tether, LiFi and Hyperliquid (`00_season.md`, [Crypto Briefing](https://cryptobriefing.com/trezor-clear-signing-erc-7730/)); the registry asks reviewers to attest, and nobody checks descriptors against code yet ([EF blog](https://blog.ethereum.org/en/2026/05/12/clear-signing-announcement)).
- **Closest prior work.** Truthsign (team report proposal, never built); ideathon "ClauseGuard Registry" and "AuditClock" (unplaced) [H 3.6]; Arkiv's own Sourcify mirror is the template, not a rival.
- **Stack.** Arkiv Mirror + Swarm S4 (frontend that outlives its domain) + EF "Best CROPS App" (Secure lead; the demo moment is switching off GitHub and our server). One partner pick left. With the Truthsign fork check added, this becomes the team's finalist candidate.
- **Difficulty.** Medium. Importer 6 hours; drift checker 8 hours; UI 6 hours.
- **Scores.** Feedback 8 | Reach 7 | Why Arkiv 8 | Data quality 9 | Novelty 8 | Feasibility 8 | **Overall 8.0**.
- **Judge notes.** Product judge: "The best `why-arkiv.md` in the track if you show the GitHub-off moment and the selector filter; give `reach.md` names of wallets and an npm download count after the event." Platform judge: "Two writer wallets with different lifetimes is exactly what we look for. Show me a `drift_check` expiring." Veteran: "Small dataset (about 931 files [H 8]) means no quota trouble; the risk is spending a day on archive RPC. Forward drift first."

### M2. Keyring Atlas: L2BEAT's permission data, searchable by the key that holds it (new)

- **Pitch.** Paste any address and see every contract, on every L2 and bridge L2BEAT tracks, that this address can upgrade or act on, with the role, the source commit and when L2BEAT last re-discovered it. The reverse lookup that incident responders need when a key leaks.
- **Falsifiable promise.** For any holder address in L2BEAT's `permissions` maps, one Arkiv query returns the same set of (project, target contract, permission, role) rows that a full scan of the 248 `discovered.json` files at the named commit returns; the README ships the scan script so a judge can diff the two.
- **Demo moment.** Paste a well-known multisig: "upgrade rights over 14 contracts across 3 projects; 2 with no delay". Then click a project, and its upgrade graph renders from Arkiv only. Finally run the import on the next L2BEAT commit and watch a changed permission appear as a new entity while the old one stays, struck through, until it expires.
- **Schema.** `permission`: holder `addr`, target `addr`, chain `str`, project `str`, permission `str` (upgrade, interact, act), role `str`, sourceCommit `str`, discoveredAt `u64`; created `readonly`; lifetime 180 days. `contract`: address `addr`, chain `str`, project `str`, proxyType `str`, sourceCommit `str`; lifetime 180 days, extended on each import that still lists it. `import_run`: commit `str`, files `i32`, permissions `i32`; lifetime 2 years, the audit trail for `data-quality.md`.
- **Requirement checklist.** MR2 pass: MIT ([l2beat/l2beat](https://github.com/l2beat/l2beat)); link it. MR3 pass with care: `discovered.json` carries `sourceHashes`; mirror permissions and proxy facts only, never source or verification fields. MR4 pass: `import.ts --commit <sha>` over the 248 files. MR5 pass: the address search reads Arkiv. MR6, MR7, MR8: as M1, with counts of permissions and projects per import.
- **Why it beats rivals (Judgement).** It is not on the listed-ideas line, so it avoids the crowd, and it is a security dataset that the whole L2 ecosystem already reads through L2BEAT's site. Why Arkiv: the source is 248 JSON files that cannot be searched across by holder address without cloning and parsing the repo; the Arkiv copy is commit-pinned and `readonly`, and anyone can build a "keys that control my bridge" alert on it. **Judgement, to verify on day one:** we believe L2BEAT's UI shows permissions per project, not a cross-project lookup by holder; if it does offer one, `why-arkiv.md` must lean on permissionless queries and history instead. Timely: Kelp ($293M, cross-chain message spoofing) and Liquid Network ($320M, unbacked cross-chain mint) are 2026 incidents (`00_season.md`, [DefiLlama hacks](https://defillama.com/hacks)).
- **Closest prior work.** No Arkiv or ETHGlobal precedent found. L2BEAT itself is the source, not a rival.
- **Stack.** Arkiv only by default, which suits a narrow, Arkiv-tuned entry. EF CROPS (Secure) is a stretch. Swarm adds little.
- **Difficulty.** Medium. Permission maps are structured; contract `values` are heterogeneous, so mirror only fixed fields.
- **Scores.** Feedback 8 | Reach 8 | Why Arkiv 7 | Data quality 8 | Novelty 8 | Feasibility 7 | **Overall 7.7**.
- **Judge notes.** Product judge: "Reach is easy to argue, but name who will query this after Mumbai: SEAL responders, L2 risk researchers, wallets showing stage." Platform judge: "Thousands of `readonly` writes will hit the quota; batch them and tell us the cost per entity in `friction.md`." Veteran: "Measure the permission count on day one; if it is above roughly 20,000, cut to Ethereum-settled projects."

### M3. RPC Truth Table: the chain registry with signed honesty probes (revise)

- **Pitch.** `ethereum-lists/chains` on Arkiv, plus probes that expire hourly and record whether each public RPC is alive and honest (chain ID matches, head within tolerance of the median, same block hash as peers), with probers chosen by the reader through `$creator`.
- **Falsifiable promise.** For any chain ID, one query returns the RPCs that passed in the last hour from the probers you trust. When our test RPC starts returning a stale head, it drops out within one probe cycle with the reason shown.
- **Demo moment.** Chain 1 rows are green. Flip our proxy RPC to serve a head 1,200 blocks old: one cycle later its row is red, "head lag 1,204 vs median". A side panel compares latency direct and through Anon-RPC.
- **Changes from the draft.** The pitch is honesty, not liveness, because chainlist.org already tests RPC liveness and latency in the browser (**Judgement**, from using it; verify before writing `why-arkiv.md`). The `rpc` entity stores the URL hash as `str` and the full URL in `bytes`, since a `str` is at most 128 bytes [H 1].
- **Schema.** `chain` (365 days, extended on import), `rpc` (365 days), `probe`: rpcKey `key`, ok `bool`, latencyMs `i32`, headLag `i32`, chainIdMatch `bool`, blockHashAgrees `bool`, viaAnonRpc `bool`; `$creator` = prober; lifetime 1 hour.
- **Requirement checklist.** MR2 pass: MIT ([chains](https://github.com/ethereum-lists/chains)). MR3 pass. MR4 pass: importer and prober are runnable scripts. MR5 pass: table and `npx rpc-truth best <chainId>` read Arkiv. Risk: the hourly probe volume across thousands of RPCs costs quota; probe the top 50 chains only.
- **Why it could beat rivals (Judgement).** Expect three or more chain-registry mirrors. Only a probe that catches a lying RPC, signed by a `$creator` the reader picks, makes expiry the product. Reach is the strongest in the track (9,835 stars, consumed by chainlist and wallets).
- **Closest prior work.** Ideathon "Capability Canary" (claims die unless re-proved) [H 3.6]; chainlist.org.
- **Stack.** Arkiv Mirror + EF "Best Use of Anon-RPC" ("network health checker / playground" is a listed EF idea; the direct lane is a declared baseline, which EF allows: "just let us know"). Swarm S4 also fits.
- **Difficulty.** Low to medium.
- **Scores.** Feedback 7 | Reach 9 | Why Arkiv 6 | Data quality 8 | Novelty 5 | Feasibility 8 | **Overall 7.2**.
- **Judge notes.** Product judge: "We will see this idea several times; the one that wins shows a lying RPC caught." Veteran: "Best fallback if a riskier mirror breaks on Friday."

### M5. Denylist Ledger: scam and sanctions lists with delisting history and bucketed private lookups (revise)

- **Pitch.** One query across OFAC's crypto addresses, ScamSniffer and MetaMask's phishing list, showing who listed what, at which source commit, and whether it was quietly removed. Lookups fetch a whole bucket by hash prefix, so no server learns which address you checked.
- **Falsifiable promise.** For any address or domain, the Ledger shows every source that flags it and the commit it came from. A removal upstream never deletes the listing; it adds a `delisting` entity. The client's query names only a 2-byte prefix bucket, never the address.
- **Demo moment.** Paste a drainer address: "ScamSniffer since commit 9f1c". Show an address removed upstream last week: the listing is still there, struck through, "removed at commit 77ab". Open the network tab: the only query is `bucket = str('3fa1')`.
- **Changes from the draft.** The draft's privacy depended on Anon-RPC forwarding Arkiv's JSON-RPC, which is unconfirmed. The revision uses an indexed `bucket` attribute (first 2 bytes of keccak of the subject) and checks membership on the client: k-anonymity built from Arkiv's own query language. Anon-RPC becomes an optional extra.
- **Schema.** `listing`: subject `str`, bucket `str`, kind `str`, source `str`, firstSeenCommit `str`; `readonly`; lifetime 5 years. `delisting`: listingKey `key`, removedAtCommit `str`; lifetime 5 years. `$creator` = importer for both.
- **Requirement checklist.** MR2 at risk: GPL-3.0 (ScamSniffer) allows republishing with the notice; MetaMask's DBAD licence permits redistribution; OFAC SDN is a US government work; link all three and ask (Q11). MR3 pass. MR4 pass: a diff importer per source commit. MR5 pass.
- **Why it could beat rivals (Judgement).** "Address labels" is listed, so scam lists will be common. Delisting history (tamper-evident via `readonly` plus separate removal entities) and bucketed private lookups are the two features the sources cannot offer.
- **Closest prior work.** Ideathon "ThreatWindow" (unplaced) [H 3.6]; S.C.I, Istanbul finalist anti-phishing registry ([showcase](https://ethglobal.com/showcase/s-c-i-0760q)).
- **Stack.** Arkiv Mirror; EF CROPS (Private) or Anon-RPC optional.
- **Difficulty.** Medium (three parsers, one of them OFAC XML).
- **Scores.** Feedback 7 | Reach 8 | Why Arkiv 7 | Data quality 7 | Novelty 6 | Feasibility 7 | **Overall 7.0**.
- **Judge notes.** Platform judge: "The bucket trick is a nice use of the query language; tell us in `friction.md` whether `STARTSWITH` on an indexed attribute would have been cheaper." Veteran: "Licence questions could sink it; ask before building."

### M4. Delegation Lens: EIP-7702 delegate targets as a wallet-queryable index (revise)

- **Pitch.** For every contract that EOAs delegate to with EIP-7702: its codehash, first and last seen block, how many EOAs delegate to it, whether its bytecode matches a sweeper pattern, and which type-4 transactions carried batches of authorizations over a nonce range, the pattern used against Binance.
- **Falsifiable promise.** For any delegate target seen in the indexed window, Arkiv returns its delegator count and sweeper flag, and these match a recount from the same blocks with the shipped script. Any type-4 transaction in the window with 10 or more authorizations from one signer over consecutive nonces appears as a `batch_alert`.
- **Demo moment.** A wallet preview pane reads "Sign 7702 authorization to 0x5f..". The Lens badge says "first seen 2 hours ago, 1 delegator, sweeper pattern" and the sign button greys out. Then a well-known delegator contract: tens of thousands of delegators, recognised.
- **Changes from the draft.** Per-EOA delegation status is dropped: any wallet gets it from one `eth_getCode` call (the code starts with `0xef0100`), so Arkiv adds nothing there and it would cost hundreds of thousands of writes. The index keeps only delegate targets and batch alerts, which needs a few thousand entities.
- **Schema.** `delegate`: address `addr`, codehash `str`, firstSeenBlock `u64`, lastSeenBlock `u64`, delegatorCount `u64`, sweeperHeuristic `bool`, knownImpl `str`; patched by the indexer; lifetime 365 days. `batch_alert`: txHash `str`, signer `addr`, authCount `i32`, nonceSpan `i32`, block `u64`; lifetime 90 days.
- **Requirement checklist.** MR2 at risk: public chain data, no formal licence; state it plainly and ask (Q11). `knownImpl` labels come only from MIT deployment lists such as `safe-global/safe-deployments` [H 8]. MR3 pass: never copy Sourcify's verified flag. MR4 pass: `backfill.ts --from <block>` plus a follower; honest window (last 30 days plus live) in `data-quality.md`. MR5 pass.
- **Why it could beat rivals (Judgement).** Timing: TRM describes "50 EIP-7702 authorizations signed by the hot wallet for 50 consecutive nonces" in the 29 Oct Binance theft ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). Weakness: this is a derived index, not a mirror of a dataset people already consume, so Reach and the track fit are softer, and coverage is bounded by our RPC budget.
- **Closest prior work.** Dune dashboards and the Wintermute study (`00_season.md`); no 7702 index among finalists.
- **Stack.** Arkiv Mirror + EF CROPS (Secure). Overlaps B4 Delegate Desk: pick one of the two, by which Arkiv track looks less crowded at the workshop.
- **Difficulty.** Medium to high (block scanning over 30 days of mainnet).
- **Scores.** Feedback 7 | Reach 7 | Why Arkiv 7 | Data quality 6 | Novelty 8 | Feasibility 6 | **Overall 6.8**.
- **Judge notes.** Product judge: "Is this mirroring something, or building an indexer? Tell us which public data you mirror." Veteran: "Scanning 200,000 blocks takes most of a night on a free RPC; start the backfill at hour 1."

---

## 5. Track 2: Build on Arkiv (from scratch) ($3,000 / $1,000)

Rubric: Arkiv feedback 25%, Reach 25% ("Who is it for, and would they use it? Can they try it today, and will you keep building it after Mumbai?"), Why Arkiv 25%, How you use Arkiv 25% ("Does each Arkiv feature you use change something your users see?").

**Adversarial view (Judgement).** The four listed directions will each draw template entries: agent task boards, expiring marketplace listings, a social feed, ENS profiles. The February challenge had 10 event platforms out of 19, and the job-board vertical placed nobody [H 4.1]. Winning here means a primitive that carries the rule plus a user who can try it today.

| Rank | Idea | Overall | Verdict | Stack |
|---|---|---|---|---|
| 1 | B1 Second Screen: independent Safe transaction verdicts a tampered frontend cannot touch | 7.7 | revise (was Quorum Room) | Arkiv Build + Swarm S2 + EF CROPS; ENSv2 optional |
| 2 | B4 Delegate Desk: expiring EIP-7702 delegate attestations that a wallet checks before signing | 7.7 | new (replaces First Blood) | Arkiv Build + Swarm S3 + EF CROPS |
| 3 | B2 Fuzzfarm: coordinator-free fuzz campaigns with expiring shard leases | 7.5 | revise | Arkiv Build + Swarm S1 |
| 4 | B5 Contactable: security contacts that vanish unless the channel answers | 7.5 | revise | Arkiv Build; ENSv2 only if central |
| 5 | B3 Aqua Board: SwapVM offers that live only while the maker can fill them | 6.7 | revise | Arkiv Build + 1inch Aqua |

Dropped: **B4 First Blood** (draft). Why: audit-contest platforms already timestamp submissions and split rewards among duplicates, so "who found it first" is rarely the dispute, and Reach ("would they use it?") is weak. Commit and reveal is also a template pattern.

### B1. Second Screen: independent Safe transaction verdicts that a tampered frontend cannot touch (revise)

- **Pitch.** Independent verifiers decode pending Safe transactions and publish signed verdicts to Arkiv, keyed by the EIP-712 domain hash and message hash the hardware wallet shows. Before signing, a signer opens Second Screen on a phone, enters or scans those hashes, and sees what the transaction really does, according to verifiers the signer chose.
- **Falsifiable promise.** A script in the desktop Safe UI swaps the recipient. The hardware wallet shows message hash `0x9f..`. Second Screen, reading only Arkiv entities created by the two chosen verifiers, shows "transfer 100 USDC to 0xA77.. (not in your address book)" for that hash. Nothing the tampered desktop does can change that, because the phone never talks to it.
- **Demo moment.** Desktop says "Send 100 USDC to alice.eth". The Ledger shows a hash. The phone shows a red card: "2 of 2 verifiers: recipient 0xA77..". Then we write a fake "all good" verdict from a third wallet: it does not appear, because it is not from a chosen `$creator`. The clean proposal shows green, and the Sepolia Safe executes.
- **Why the revision.** The draft gated the Sign button inside the signer's own frontend; a Bybit-style attacker who controls that JavaScript ("the attackers modified Safe{Wallet}'s front-end JavaScript files", [SlowMist](https://slowmist.medium.com/bybits-1-5-billion-theft-unveiled-safe-wallet-front-end-code-tampered-84b78f0fa9c2)) also controls the gate. The check has to run on a second device and bind to the hash the signing device displays. Signatures stay off Arkiv (Safe's own flow handles them), which also answers "What did you keep off Arkiv, and why?". ENSv2 is optional, which cuts the riskiest dependency.
- **Schema.** `proposal`: safe `addr`, chainId `u64`, nonce `u64`, domainHash `str`, messageHash `str`, tx `bytes`; written by any watcher; lifetime 72 hours. `verdict`: messageHash `str`, intent `str` (one line), ok `bool`, simBlock `u64`, decoded `bytes`; `$creator` = verifier; lifetime 24 hours, because a simulation goes stale; written with its decoded-call entity in one `executeBatch`. `roster`: owner `addr`, verifiers `bytes`; owned by the signer; lifetime 365 days. The verifier recomputes the EIP-712 hashes itself, so a forged `proposal` entity cannot produce a verdict for a different hash.
- **Requirement checklist.** BR2 pass: the phone view reads verdicts from Arkiv; verifiers read proposals from Arkiv. BR3: watcher and verifier wallets plus the query `messageHash = str('0x9f..')`. BR5: `how-you-use-arkiv.md` maps each feature to what the signer sees (expiry: "re-verify" card; `$creator`: spoofed verdict hidden; `watchEntityEvents` over the documented WSS endpoint: cards appear live; batch: verdict and decode land together). BR7 pass: verdicts are read and decide what the signer is told.
- **Why it beats rivals (Judgement).** It is the October Security pillar ("filters Arkiv entities by their on-chain creator") turned into a product [H 3.7], and every feature changes the screen. Reach: any Safe signer can try it today against a real Safe, since verifiers decode public proposals; no Safe integration needed. Against prior art: `safe-tx-hashes-util` and OpenZeppelin `safe-utils` compute hashes for one person on one machine ([repo](https://github.com/pcaversaccio/safe-tx-hashes-util), [repo](https://github.com/openzeppelin/safe-utils)); Second Screen adds several independent decoders whose output is public, attributable and expiring. Octopus AI (Trifecta finalist) was an AI co-signer inside the Safe, which a compromised signer UI can still mislead ([showcase](https://ethglobal.com/showcase/octopus-ai-2xcne)).
- **Closest prior work.** Octopus AI; Truthsign (report proposal); team plan E (SameBuild).
- **Stack.** Arkiv Build + Swarm S2 (encrypted full bundles) + EF "Best CROPS App" (Secure lead: works without Safe's frontend and without our server). ENS "Best Use of ENSv2" only if the verifier roster lives in an ENSv2 Permissioned Registry and the workshop calls that central. That is the full three-pick stack; strong finalist candidate.
- **Difficulty.** Medium to high. Cut order: ENSv2 roster, then Swarm, then live WSS updates.
- **Scores.** Feedback 8 | Reach 8 | Why Arkiv 8 | How you use Arkiv 9 | Novelty 6 | Feasibility 7 | **Overall 7.7**.
- **Judge notes.** Product judge: "Say who the verifiers are on day one: your team, a second team at the event, an AI decoder. One verifier is a single point of trust." Platform judge: "Verdict lifetime of 24 hours is a product rule; show it expiring." Veteran: "Check that Safe's transaction service API still works without a key, or have the watcher read proposals from the Safe contract events instead."

### B4. Delegate Desk: expiring EIP-7702 delegate attestations that a wallet checks before signing (new)

- **Pitch.** Reviewers publish attestations for 7702 delegate contracts by codehash; a wallet-side check refuses an authorization unless a reviewer the user trusts has a live attestation for that exact code, and always refuses chain ID 0 or a batch of authorizations over consecutive nonces.
- **Falsifiable promise.** The demo wallet refuses to sign an authorization to a freshly deployed sweeper, signs one to a reviewed delegator, and refuses the same delegator within one block after its reviewer writes a revocation.
- **Demo moment.** "Authorize 0x63c0.. as your account code?" Red: "no live attestation from your reviewers; bytecode matches sweeper pattern". Switch target: green, "reviewed by team.eth, 61 days left". The reviewer revokes; the screen turns red without a refresh.
- **Schema.** `attestation`: target `addr`, codehash `str`, chainId `u64`, verdict `str`, scope `str`, reportRef `str`; `$creator` = reviewer; created `readonly`; lifetime 90 days; extended only by the reviewer after re-review (no `permissionlessExtension`), so lapsed reviews disappear. `revocation`: attestationKey `key`, reason `str`; `$creator` = reviewer; lifetime 5 years. `alert`: target `addr`, pattern `str`; `$creator` = monitor; lifetime 7 days.
- **Requirement checklist.** BR2 pass: the wallet check reads attestations from Arkiv. BR3: reviewer and monitor wallets plus `codehash = str('0x..')`. BR5: each feature maps to the screen (expiry: "N days left"; `$creator`: the reviewer list; `readonly`: an attestation cannot be quietly edited; events: revocation turns the screen red). BR7 pass.
- **Why it beats rivals (Judgement).** After the Binance theft, vendors published "allowlist delegate contracts" and "treat a batch over a nonce range as compromise" as mitigations ([Hacken](https://hacken.io/insights/binance-hack/), [Fireblocks](https://www.fireblocks.com/blog/binance-hack-eip-7702)), but each vendor keeps its own list. Delegate Desk makes the allowlist a public, multi-reviewer, expiring dataset any wallet can read. The team are auditors, so they can be the first credible reviewer for three to five well-known delegates during the event, which answers "Can they try it today?".
- **Closest prior work.** Ideathon DeFi 3rd "Wallet Guardian" (approvals as shared security intelligence) and AI and DevTools 3rd "MCP Attest" (expiring attestations to an exact release hash) [H 3.6]; neither was built.
- **Stack.** Arkiv Build + Swarm S3 (review reports) + EF CROPS (Secure). Overlaps M4: choose one.
- **Difficulty.** Medium. A viem `signAuthorization` wrapper, a small React wallet pane, an attestation writer.
- **Scores.** Feedback 7 | Reach 8 | Why Arkiv 8 | How you use Arkiv 8 | Novelty 8 | Feasibility 7 | **Overall 7.7**.
- **Judge notes.** Product judge: "Call your reviews what they are (bytecode matches source, no sweeper pattern), not full audits." Platform judge: "Good: lifetime is the review's validity." Veteran: "Do not attempt real audits in 36 hours; scope the attestation honestly."

### B2. Fuzzfarm: coordinator-free fuzz campaigns with expiring shard leases (revise)

- **Pitch.** A maintainer posts an invariant campaign; any worker leases a seed shard, keeps the lease alive with `extendEntity`, and posts counterexamples; a finding counts only when a different wallet reproduces it.
- **Falsifiable promise.** `kill -9` a worker mid-run, and another worker takes its shard within one lease period, with no coordinator. A judge replays any reported bug with `fuzzfarm replay <key>` and the invariant fails.
- **Demo moment.** Three terminals fuzz a deliberately broken vault. One is killed; its lease bar empties on the dashboard and the shard moves. A counterexample lands, "confirmed by 2 of 2". The judge laptop replays it.
- **Changes from the draft.** Running a stranger's Foundry tests is arbitrary code execution (`ffi` cheatcodes can run shell commands), so workers run each campaign in a container with no network and `ffi` off, pinned to a repo commit. Reach is reframed: an audit team's own fleet and allied auditors in a contest, not anonymous volunteers.
- **Schema.** `campaign` (lifetime: campaign end), `shard` (campaignKey, seedStart `u64`, seedEnd `u64`), `lease` (`$creator` = worker, 10 minutes, extended every 3 minutes), `finding` (propertyId `str`, sequenceHash `str`, swarmRef `str`; 90 days), `confirmation` (findingKey, reproduced `bool`; `$creator` must differ from the finder; 90 days).
- **Requirement checklist.** BR2 pass: workers schedule from leases, the dashboard reads findings. BR7 pass. BR5: lease expiry is the failure detector users see.
- **Why it beats rivals (Judgement).** It uses the first listed direction literally ("tasks, bids and claims that agents share, query and let expire") and the October anchor "`extendEntity` as a lease renewed by activity" [H 3.7], and its output is checkable by anyone.
- **Closest prior work.** Ideathon Marketplaces 2nd "Shared Compute Lease Board" [H 3.6].
- **Stack.** Arkiv Build + Swarm S1. No natural second partner.
- **Difficulty.** Medium; the team's home ground.
- **Scores.** Feedback 8 | Reach 6 | Why Arkiv 8 | How you use Arkiv 9 | Novelty 6 | Feasibility 8 | **Overall 7.5**.
- **Judge notes.** Product judge: "Who runs this next month? Name the audit firm or contest." Veteran: "Lowest technical risk in the track; Reach is the weak quarter."

### B5. Contactable: security contacts that vanish unless the channel answers (revise)

- **Pitch.** During a live exploit, a whitehat asks "who answers for contract 0x..?" and gets either a contact whose channel answered a challenge in the last 30 days, or an explicit "no live contact".
- **Falsifiable promise.** A challenger bot sends a one-time code through the listed channel (email or Telegram). Only a response containing that code, signed by the contact's owner wallet, extends the entity. Stop answering, and the contact disappears at its expiry block with no one removing it.
- **Demo moment.** Query a covered contract: "contact for protocol.eth, channel answered 3 days ago". Switch to a team that ignored the last challenge: "no live contact, lapsed 4 days ago", with the expired lease on the explorer.
- **Changes from the draft.** The draft's challenge proved only that a key was alive; the revision proves the human channel works, which is what a responder needs.
- **Schema.** `contact`: ensName `str`, channel `str`, pgpFingerprint `str`, slaHours `i32`; owned by the wallet the ENS name resolves to (checked on the client); lifetime 30 days, extended only after a valid response. `scope`: contract `addr`, contactKey `key`. `challenge`: contactKey `key`, codeHash `str`; `$creator` = challenger; lifetime 72 hours.
- **Requirement checklist.** BR2 pass: lookups read Arkiv. BR7 pass. Personal data: store channel handles a team chose to publish, never personal emails; say so in the README (the October rubric excluded "real personal data stored in Arkiv in plaintext" [H 3.7]).
- **Why it beats rivals (Judgement).** It takes the "Names and identity" direction away from profile pages and gives it a security purpose; expiry is the truth (the "Half-Life" pattern) [H 3.6].
- **Closest prior work.** Ideathon "Half-Life", "Warranti"; SEAL 911 (a bot, not a dataset).
- **Stack.** Arkiv Build. ENSv2 only if per-protocol Permissioned Resolver records pointing to the contact count as central (Q16).
- **Difficulty.** Low to medium.
- **Scores.** Feedback 7 | Reach 7 | Why Arkiv 8 | How you use Arkiv 8 | Novelty 7 | Feasibility 8 | **Overall 7.5**.
- **Judge notes.** Product judge: "Seed it with ten real protocols that agree, or Reach is hypothetical." Veteran: "Cheap; good as a side feature of B1 or B4 if one of those slips."

### B3. Aqua Board: SwapVM offers that live only while the maker can fill them (revise)

- **Pitch.** Makers post signed SwapVM orders to Arkiv; takers query by pair and price; a keeper extends each offer only while the maker's balance and allowance still cover it.
- **Falsifiable promise.** A taker finds and fills the best offer using only Arkiv and the chain; after the maker revokes allowance, no remaining step can be found after its next expiry, and no cleanup job runs.
- **Demo moment.** A three-step ladder; the taker query `tokenIn = addr(0x..) AND tokenOut = addr(0x..) AND price <= dec(3100)` sorted by price; a fill on a mainnet fork with transfers shown; the maker revokes; the ladder fades.
- **Changes from the draft.** The keeper is the maker's own wallet, so `$owner` and `$creator` are the maker; takers filter by `$creator` to ignore spoofed offers.
- **Requirement checklist.** BR2, BR7 pass. 1inch: "Official Aqua/SwapVM contracts must be used"; "Onchain execution of token transfers should be presented during the final demo (local forks are ok)" (`00_current_tracks.md`).
- **Why it could beat rivals (Judgement).** "Markets: listings or offers that expire at their deadline" is the most obvious direction in the track; the SwapVM twist and proof-of-capacity extension ("Still Yours", ideathon Marketplaces 1st [H 3.6]) are what separate it.
- **Closest prior work.** ArcBook (Lisbon 2026 finalist, Aqua and SwapVM order book).
- **Stack.** Arkiv Build + 1inch "Build an Aqua App".
- **Difficulty.** Medium to high (SwapVM learning curve).
- **Scores.** Feedback 7 | Reach 6 | Why Arkiv 7 | How you use Arkiv 8 | Novelty 6 | Feasibility 6 | **Overall 6.7**.
- **Judge notes.** Product judge: "Why would a maker use this rather than 1inch's own order API? Answer that in `why-arkiv.md`." Veteran: "Only if the team wants the 1inch prize anyway."

---

## 6. Track 3: Node tooling ($2,000, single winner)

Rubric: Arkiv feedback 25%, Real use 25%, What's new 25%, Easy to run 25%. The brief asks to "show what only a tool next to the node can see" and warns it must be "more than putting an existing dashboard together".

**Adversarial view (Judgement).** Most entrants will build the listed "Operator dashboard" from Prometheus and Grafana. Few will build the "Slow query finder", and fewer a correctness oracle. A follower is easy to run (section 2), which raises the bar on "Easy to run" for everyone.

| Rank | Idea | Overall | Verdict | Stack |
|---|---|---|---|---|
| 1 | N1 Grammarsmith: query fuzzer with a reference-model oracle | 8.4 | revise | Arkiv only (+ Swarm S5 if allowed) |
| 2 | N3 Divergence Watch: catch your follower serving different answers | 7.7 | revise (was Proofwatch) | Arkiv only |
| 3 | N4 Upgrade Canary: replay your node's own traffic against the next image | 7.4 | new (replaces Quiet Arkiv) | Arkiv only |
| 4 | N2 Diskclock: an expiry-aware days-until-full forecast | 7.2 | revise | Arkiv only |
| 5 | N5 Beacon: operator heartbeats as expiring entities | 6.7 | keep | Arkiv only |

Dropped: **N4 Quiet Arkiv** (draft). Why: it depends on Anon-RPC forwarding non-Ethereum methods such as `arkiv_query`, which nobody has confirmed, and operators gain little from it, so Real use is weak. It was mostly an EF entry wearing a Node tooling badge.

### N1. Grammarsmith: a query fuzzer with a reference-model oracle (revise)

- **Pitch.** It generates query shapes from the documented grammar (`=`, ranges, `BETWEEN`, `STARTSWITH`, `EXISTS`, `TYPEOF`, `AND`, `OR`, `NOT`, `ORDER BY`), loads synthetic entities with controlled cardinality and skew into your own node, measures latency per shape class, shrinks slow classes to minimal reproducers, and checks every result set against an independent in-memory evaluator of the same grammar.
- **Falsifiable promise.** On a local node, within 10 minutes it reports (a) the number of slow shape classes and their ratio to the median, with reproducers written only to an encrypted local report, and (b) the number of queries whose result keys differ from the reference evaluator, over at least 40,000 queries.
- **Demo moment.** A histogram fills; a counter reads "slow classes: 3 (sent privately)", "result mismatches: 0 of 41,200" (or a non-zero count, also sent privately). The shapes never appear on screen.
- **Changes from the draft.** The draft only compared equivalent query pairs; a reference evaluator over the same rows is a stronger oracle, and it catches pagination and `ORDER BY` bugs too. Correctness mismatches are treated with the same privacy as slow shapes until Arkiv says otherwise (Q5).
- **Requirement checklist.** NR1 pass: new repo, CLI plus Docker Compose. NR2: needs a node we can write to; a Rabdi follower is read-only (section 2), so we use the writable local devnet the booth names (Q4). NR3: node image tag and reproduction steps; no entities written to Rabdi, so no `schema.md`. NR4, NR5 pass. NR6 pass by design: shapes go to an `age`-encrypted report sent through Arkiv's channel (or GitHub Security Advisories on `reported-issues`), and a CI test fails if any generated shape appears in a tracked file.
- **Why it beats rivals (Judgement).** It does the listed "Slow query finder" and adds a correctness oracle no dashboard has, which answers "What's new". Arkiv is doing "index rewrite and load work" on Sorbet ([db-chain-networks](https://github.com/Arkiv-Network/db-chain-networks)), so its engineers have a use for it this month.
- **Closest prior work.** ETHWarsaw 2025 consoles had a manual query playground [H 3.1].
- **Stack.** Arkiv only. Swarm S5 if Arkiv accepts an encrypted Swarm drop.
- **Difficulty.** Medium. Grammar generator 6 hours, reference evaluator 6 hours, loader and harness 8 hours.
- **Scores.** Feedback 9 | Real use 9 | What's new 9 | Easy to run 7 | Novelty 9 | Feasibility 7 | **Overall 8.4**.
- **Judge notes.** Platform judge: "This is what we would build ourselves. Make `easy-to-run.md` honest about how to stand up the devnet." Product judge: "The demo is numbers only; make the video narrate why they matter." Veteran: "Highest score, smallest pool, single winner; and it uses the team's one Arkiv track."

### N3. Divergence Watch: catch your follower serving different answers (revise)

- **Pitch.** A sidecar next to a Rabdi follower that compares it, block by block, with the public edge and community nodes: block hash, state root, entity count and the result hashes of canary queries, and alerts when the local node is stale, on the wrong chain or returning different rows.
- **Falsifiable promise.** `docker pause` the follower for 2 minutes, or start a second follower against the wrong network: within one interval the tool reports "stale by N blocks" or "state root mismatch at block N; 37 of 200 canary results differ".
- **Demo moment.** Two followers, one paused: the tile flips from "agrees with 3 sources" to "stale by 64 blocks".
- **Changes from the draft.** Entity-level `eth_getProof` checks are dropped unless the booth documents the trie layout; comparisons pin a block when `arkiv_query` accepts one (Q9), and otherwise compare at matched heads. It also counts responses carrying the `Arkiv-Block-Rewritten` header (section 2), whose meaning we ask about.
- **Requirement checklist.** NR2 pass: the documented Docker follower. NR3: if it publishes signed status entities (5-minute lifetime), wallets plus `schema.md`. NR6: canary queries are simple and public; no slow shapes.
- **Why it beats rivals (Judgement).** Only a tool next to the node can compare the node's own answers with the network's; nodes.arkiv.network sees nodes from outside.
- **Closest prior work.** Execution-client diff tools; none for DB-chain query results.
- **Stack.** Arkiv only.
- **Difficulty.** Medium.
- **Scores.** Feedback 7 | Real use 8 | What's new 8 | Easy to run 8 | Novelty 8 | Feasibility 7 | **Overall 7.7**.
- **Judge notes.** Platform judge: "If you find a real divergence, that is the best `friction.md` we will read." Veteran: "Good second choice if the writable devnet for N1 is not available."

### N4. Upgrade Canary: replay your node's own traffic against the next image (new)

- **Pitch.** A local reverse proxy records the queries your node actually serves (kept on the machine, encrypted at rest); before an upgrade, the tool clones the datadir, starts the candidate image on the clone with peers disabled so both sit at the same block, replays the workload against both, and reports result differences and latency changes per method.
- **Falsifiable promise.** For a recorded workload, the report lists the number of queries with different result hashes (expected 0) and p50 and p95 per method on both images; a deliberately broken candidate (wrong image tag or corrupted index) shows non-zero differences.
- **Demo moment.** "Candidate v0.x: 0 result differences over 12,400 queries; p95 +12% on `arkiv_query`; safe to upgrade". Then the broken candidate: "1,904 differences; do not upgrade".
- **Requirement checklist.** NR1, NR2 pass (follower plus a clone). NR6: recorded shapes never leave the machine; only aggregate counts are shown, and slow outliers go to Arkiv privately. NR5: `easy-to-run.md` gives disk needs, which are small while Rabdi is young (block 18,860 today, section 2).
- **Why it beats rivals (Judgement).** Operators fear upgrades; the snapshot manifest already warns when "the images that wrote the databases are not the ones this node runs" ([Rabdi README](https://github.com/Arkiv-Network/db-chain-networks/tree/main/networks/testnet/rabdi)). This turns that warning into a test.
- **Closest prior work.** Shadow-traffic testing in Web2 infrastructure; nothing for Arkiv.
- **Stack.** Arkiv only.
- **Difficulty.** Medium to high (holding two nodes at the same block).
- **Scores.** Feedback 8 | Real use 8 | What's new 8 | Easy to run 6 | Novelty 8 | Feasibility 6 | **Overall 7.4**.
- **Judge notes.** Veteran: "Ask which candidate images exist; with no second image, the demo has nothing to compare."

### N2. Diskclock: an expiry-aware days-until-full forecast (revise)

- **Pitch.** A sidecar that combines disk growth, per-method requests and latency (through a small proxy), peers, sync, CPU and memory with the node's own expiry schedule (counts and sizes of entities expiring in each future window) to forecast days until full, with an alert.
- **Falsifiable promise.** On a devnet with 50,000 entities set to expire together, the forecast made before the cliff predicts disk use after it better than a linear forecast, and the error is shown; if the node does not reclaim space on expiry, the tool shows that, and it goes into `friction.md`.
- **Demo moment.** "Linear: full in 2.1 days; Diskclock: steady at 61%". The cliff passes; the actual line follows one of them.
- **Changes from the draft.** All listed dashboard items are covered so the entry is complete, and the forecast is the claim of novelty. **Judgement:** MDBX-style stores often reuse freed pages without shrinking the file, so "disk reclaimed" may mean "growth pauses"; the tool measures both.
- **Requirement checklist.** NR2 pass (devnet for the cliff, follower for live numbers). NR6 not involved.
- **Why it could beat rivals (Judgement).** Several teams will build this dashboard; only an expiry-aware forecast is new.
- **Stack.** Arkiv only.
- **Difficulty.** Low to medium.
- **Scores.** Feedback 7 | Real use 8 | What's new 7 | Easy to run 8 | Novelty 6 | Feasibility 7 | **Overall 7.2**.
- **Judge notes.** Platform judge: "Tell us how you got the expiry schedule; if it needed many `arkiv_query` pages, that is feedback we want."

### N5. Beacon: operator heartbeats as expiring entities (keep)

- **Pitch.** A sidecar writes the operator's signed `node_status` entity (version, head, peers, sync lag, days until full) with a 5-minute lifetime, extended each minute while healthy; a dead node disappears from any status page built on Arkiv.
- **Falsifiable promise.** `docker stop` the node, and within 5 minutes its status is gone from the community view, with no scraper.
- **Demo moment.** Three tiles; one fades at expiry.
- **Requirement checklist.** NR3: wallets plus `schema.md` (it writes entities). Status is self-reported, so `real-use.md` must say what can be lied about.
- **Why it could place (Judgement).** Clean "lease renewed by activity" use [H 3.7], but self-reported internals are weaker than what nodes.arkiv.network measures from outside.
- **Stack.** Arkiv only (the draft's Swarm reports are dropped as the weakest Swarm use).
- **Difficulty.** Low.
- **Scores.** Feedback 6 | Real use 6 | What's new 6 | Easy to run 8 | Novelty 5 | Feasibility 9 | **Overall 6.7**.
- **Judge notes.** Veteran: "Fallback only."

---

## 7. Track 4: Arkiv + Swarm bonus (from scratch, $500, on top of a track prize)

Criterion: "The most useful integration wins." Scored (Judgement) on Usefulness (users open the Swarm file in the product's main flow), Reference design (which entity field holds the reference, and SR3 handled), and Evidence (every `swarm.md` item can be produced), plus Novelty and Feasibility. Each idea is the Swarm half of a final track idea, never a separate project.

**Adversarial view (Judgement).** Most entrants will put a profile image or a JSON blob on Swarm. Arkiv's own repos already show file chunking and web hosting on Arkiv (`usecases-filedb`, `usecases-webdb`, [Arkiv-Network org](https://github.com/Arkiv-Network)), so "a file on Swarm" alone is not new. Postage stamps are the logistics risk (Q6).

| Rank | Idea | Overall | Verdict | Parent idea |
|---|---|---|---|---|
| 1 | S2 Second Screen encrypted transaction bundles | 7.8 | revise | B1 |
| 2 | S1 Fuzzfarm replay bundles and corpus feed | 7.6 | keep | B2 |
| 3 | S3 Delegate Desk review reports | 7.6 | new (replaces Exploit Atlas packs) | B4 |
| 4 | S5 Sealed Disclosure: encrypted slow-query reports for Arkiv | 7.4 | new (replaces Beacon reports) | N1 |
| 5 | S4 Clearsight frontend and registry snapshots that outlive the domain | 7.3 | revise | M1 |

Dropped: **S3 Exploit Atlas evidence packs** (parent dropped) and **S5 Beacon daily reports** (the draft itself rated it the weakest; a CSV nobody opens in the main flow).

### S2. Second Screen encrypted transaction bundles (with B1)

- **Pitch.** Each verifier uploads the full transaction bundle and simulation trace to Swarm with Swarm encryption, wraps the encrypted reference to each signer's public key, and stores only the wrapped references in a `bundle_ref` entity.
- **Falsifiable promise.** Someone who reads every Arkiv entity cannot open a bundle; each signer opens it from the phone with their own key.
- **Demo moment.** The entity on the explorer shows ciphertext; the signer's phone renders the trace.
- **Checklist.** SR1 pass. SR2: `bundle_ref.wrapped` holds the wrapped references; batch ID, Bee gateway and files listed. SR3 handled in full: "encrypt it first". This is the envelope pattern the May rubric scored 5 [H 3.4].
- **Revision.** The bundle is optional reading: the phone card is driven by the verdict entity, so Swarm downtime never blocks a signer.
- **Scores.** Usefulness 8 | Reference design 9 | Evidence 8 | Novelty 7 | Feasibility 6 | **Overall 7.8**.
- **Judge notes.** "It is the bonus's own example, done correctly." Veteran: "Key wrapping adds 4 to 6 hours; cut first if B1 is late."

### S1. Fuzzfarm replay bundles and corpus feed (with B2)

- **Pitch.** Each counterexample's call sequence and trace live on Swarm, referenced by `finding.swarmRef`; a Swarm feed per campaign points to the latest corpus, its address in `campaign.feed`.
- **Falsifiable promise.** `fuzzfarm replay <findingKey>` on a clean laptop fetches the sequence from Swarm through Arkiv and reproduces the failure.
- **Checklist.** SR1, SR2 pass. SR3: corpora are public, so references are stored unencrypted, and the README says why.
- **Scores.** Usefulness 8 | Reference design 7 | Evidence 8 | Novelty 7 | Feasibility 8 | **Overall 7.6**.
- **Judge notes.** "The Swarm file is the product's output, the bug itself."

### S3. Delegate Desk review reports (with B4)

- **Pitch.** Each attestation's review report (scope, bytecode comparison, findings) is a Swarm file; `attestation.reportRef` holds its reference, and the entity stores the report's keccak so the file cannot be swapped.
- **Falsifiable promise.** Every green badge opens the exact report its reviewer signed, and a changed file fails the hash check.
- **Checklist.** SR1, SR2 pass. SR3: public reports, unencrypted references.
- **Scores.** Usefulness 8 | Reference design 7 | Evidence 8 | Novelty 6 | Feasibility 9 | **Overall 7.6**.
- **Judge notes.** "Users open it at the moment of decision, which is what 'most useful' means."

### S5. Sealed Disclosure: encrypted slow-query reports for Arkiv (with N1)

- **Pitch.** Grammarsmith uploads its findings report to Swarm encrypted, wraps the encrypted reference to Arkiv's published key, and writes a `disclosure` entity (reportHash `str`, wrapped `bytes`, embargoUntil `u64`; `$creator` = finder; lifetime embargo plus 90 days), giving a timestamped, private hand-off.
- **Falsifiable promise.** Only the holder of Arkiv's key can open the report; anyone can verify when it was filed and by whom.
- **Checklist.** SR1, SR2 pass. SR3 handled. NR6: the shapes are never public; only ciphertext is. **Only if Arkiv accepts it as, or alongside, its private channel (Q5).** Otherwise drop it and use the channel given at the booth.
- **Scores.** Usefulness 6 | Reference design 9 | Evidence 7 | Novelty 8 | Feasibility 7 | **Overall 7.4**.
- **Judge notes.** "Clever, but only Arkiv's engineers ever open the file."

### S4. Clearsight frontend and registry snapshots that outlive the domain (with M1)

- **Pitch.** The Clearsight UI and a full registry snapshot per imported commit are published to Swarm; a `release` entity (`readonly`, `$creator` = release key) holds the current manifest reference, and `import_run.snapshotRef` points to each snapshot.
- **Falsifiable promise.** Remove our Vercel deployment: the UI still loads through a Bee gateway and answers queries from Arkiv.
- **Checklist.** SR1, SR2 pass. SR3: public, unencrypted references. EF CROPS asks for "a frontend that keeps working when its domain, backend or RPC provider disappears".
- **Scores.** Usefulness 8 | Reference design 7 | Evidence 8 | Novelty 6 | Feasibility 7 | **Overall 7.3**.
- **Judge notes.** "Useful, but Arkiv's own `usecases-webdb` already hosts sites; the registry snapshots are what make it more than hosting."

---

## 8. Track combo pass (final ideas only)

Rules: at most 3 partner picks; Arkiv's tracks plus the Swarm bonus count as one pick, and a team wins at most one Arkiv track; EF counts as one pick and places a project in at most one EF prize; the finalist track is outside the cap ([event FAQ via `00_current_tracks.md`](https://ethglobal.com/events/mumbai)). Everything below is **Judgement**.

| Final idea | Arkiv track | Swarm | Pick 2 | Pick 3 | Finalist odds | Arkiv upside |
|---|---|---|---|---|---|---|
| B1 Second Screen | Build | S2 | EF Best CROPS App (Secure) | ENS ENSv2 (only if roster is central) | High | $3,500 |
| M1 Clearsight (+ Truthsign fork check) | Mirror | S4 | EF Best CROPS App (Secure) | free | Medium to high | $3,500 |
| B4 Delegate Desk / M4 Delegation Lens | Build / Mirror | S3 / none | EF Best CROPS App (Secure) | free (EF alt mempool is the same EF pick, so not both) | Medium to high (Binance timing) | $3,500 / $3,000 |
| M3 RPC Truth Table | Mirror | S4 variant | EF Best Use of Anon-RPC | free | Low to medium | $3,500 |
| M5 Denylist Ledger | Mirror | none | EF CROPS (Private) or Anon-RPC | free | Low | $3,000 |
| B3 Aqua Board | Build | none | 1inch Build an Aqua App | free | Medium | $3,000 |
| M2 Keyring Atlas | Mirror | none | none | none | Low to medium | $3,000 |
| B2 Fuzzfarm | Build | S1 | none | none | Medium | $3,500 |
| B5 Contactable | Build | none | ENS only if central | none | Low | $3,000 |
| N1 Grammarsmith | Node tooling | S5 if allowed | none | none | Low | $2,000 to $2,500 |
| N3, N4, N2, N5 | Node tooling | none | none | none | Low | $2,000 |

**Combos that do not work (Judgement).**
1. **Mirror plus Node tooling in one submission** to double the odds: only one Arkiv track can pay, and two tracks' worth of `/arkiv/*.md` files dilutes both.
2. **B1 with ENSv2, EF CROPS and 1inch:** four partner picks; over the cap.
3. **Any idea with both EF CROPS and EF alt mempool as separate picks:** EF is one pick and places in at most one EF prize.
4. **Swarm bonus on a Node tooling entry with no user-facing file** (the old Beacon reports): "most useful integration" will not be met.
5. **A side Arkiv entry bolted onto an unrelated main build:** the Arkiv track must be part of the submitted project, and a mirror nothing in the main product reads fails MR5 or BR7.

**Recommended (Judgement).** If the team's main build is a signing-safety finalist entry, attach M1 (Mirror) or B1 (Build) to it, since both share the story and fill the Arkiv and EF picks. If the main build targets other sponsors, N1 is the cleanest Arkiv-only entry, at the cost of the smaller pool.

## 9. Arkiv's top 3 ideas overall (Judgement)

1. **M1 Clearsight** (8.0, Mirror). The best balance of score, pool size and risk: a CC0 dataset with known consumers, two writer wallets with different lifetimes, a security fact the source lacks, a small import that will not exhaust the quota, and a natural stack with Swarm S4 and EF CROPS. It also feeds the team's signing-safety finalist story.
2. **N1 Grammarsmith** (8.4, Node tooling). The highest Arkiv score and the team's strongest skill match, and it lands on Arkiv's current index work. It ranks second only because the pool is $2,000 with a single winner, it stacks with nothing, and it uses the team's one Arkiv track.
3. **B1 Second Screen** (7.7, Build). The strongest finalist and multi-partner candidate: every Arkiv feature changes what the signer sees, Safe signers can try it today, and it fixes the flaw a security judge would find in the draft. It ties M2, B4 and N3 on score; it wins the tie on stack value and demo strength.

Alternates: M2 Keyring Atlas if the workshop says ERC-7730 is out of scope or crowded; B4 Delegate Desk if the Binance story dominates the event.

## 10. Questions for the Arkiv workshop and booth (most decisive first)

Workshop: Thu 5 Nov 16:00 to 16:20 IST, Workshop Room 2, Santiago Trujillo Zuluaga; it clashes with ENS in Room 1, so split the team (`00_current_tracks.md`).

1. **Scope of the Mirror track.** Do the ERC-7730 clear-signing registry (M1) and L2BEAT's `discovered.json` permissions (M2) count as "public data that Ethereum apps and developers rely on"? Does linking out to Arkiv's Sourcify mirror by address, without copying Sourcify fields, break "Not Sourcify data, from any chain"? (Decides M1 versus M2.)
2. **Quota for mirrors.** How many cost units does creating one entity with N indexed attributes cost on Rabdi, what is the monthly quota per access key, and can mirror teams get a raised quota? Are batched creates cheaper per entity? (Decides whether M2 and M4 fit; M1 fits either way.)
3. **Rabdi stability and judging date.** Will Rabdi be wiped or replaced before judging ends, and when do judges look? What minimum lifetime should evidence entities have? (Sets every lifetime in every schema.)
4. **A writable node for Node tooling.** Which node build should we load-test: the Kurtosis devnet in `Arkiv-Network/arkiv`, or a local network running the same engine as Rabdi? Is there a writable local setup with the Rabdi image? Is there a metrics endpoint? (Decides N1 and N2 feasibility.)
5. **Private findings.** How do we send slow query shapes privately? Are result-correctness mismatches handled the same way? May the demo and `whats-new.md` show counts only? Would an encrypted Swarm drop wrapped to Arkiv's key (S5) be acceptable, or must we use your channel or GitHub Security Advisories? (Decides N1's demo and S5.)
6. **Swarm logistics.** Will postage stamp batches be handed out, by whom, and through which Bee node or gateway? Is ACT or Swarm encryption supported on that gateway? (Decides whether any Swarm idea is worth the hours.)
7. **SDK and entity model.** Should we use `@arkiv-network/sdk` 1.0.0 (published 30 Oct) or 0.9? Does Rabdi run the UDC model ("no payload") that `arkiv-transaction-decoder` describes? Will the SDK change during the hackathon? (Avoids a schema rewrite on Friday.)
8. **Selecting tracks.** Can one submission select several Arkiv tracks and let judges place it, or should we pick one? Is the Swarm bonus judged by Arkiv or by Swarm? (Decides how to frame the README.)
9. **Query features.** Can `$createdAt` be filtered or sorted? Does `arkiv_query` accept a block number? What does the `Arkiv-Block-Rewritten` header mean? Does `watchEntityEvents` work over the documented WSS endpoint on Rabdi? (Decides N3's design and B1's live updates.)
10. **Reach evidence.** For Mirror, do GitHub stars, dependents and named consumers count as Reach evidence? For Build, does "Can they try it today?" accept a product that reads mainnet data while writing to Rabdi (B1, B4)?
11. **Licences.** Is GPL-3.0 data (ScamSniffer) acceptable under "The data's license allows republishing"? Is public chain data (M4) acceptable, and what should the README link?
12. **The snapshot manifest.** `https://testnet.snapshots.arkiv.network/rabdi/latest.json` returned 404 on 31 Oct. Is a Rabdi snapshot published, or should followers sync from genesis? (For `easy-to-run.md` and `friction.md`.)
13. **What judges want to see.** Who judges, and when are results announced? Were the Global Tour Stop winners (results due 23 Oct) announced, and which entries won the Security and Open Source pillars? (Closest precedent for scoring.)

Cross-sponsor questions that change an Arkiv stack (ask at those workshops):

14. **EF (Thu 17:00, Room 2).** Does a clear-signing mirror that works with GitHub and our server switched off (M1 with S4), or a second-screen Safe verifier (B1), count as a structural Secure lead for Best CROPS App?
15. **ENS (Thu 16:00, Room 1).** Is a verifier roster held in an ENSv2 Permissioned Registry, resolved live to filter Arkiv entities by `$creator`, "central to the product"? Is ENSv2 fully usable on Sepolia this week?
16. **ENS.** Would per-protocol Permissioned Resolver records pointing to a Contactable entry (B5) count as central?
