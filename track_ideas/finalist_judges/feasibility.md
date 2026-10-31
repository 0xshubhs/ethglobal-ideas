# Feasibility red team: the 16 finalist candidates

Written 2026-10-31 by a simulated senior engineer judging one thing: will a three-person DeFi and smart contract security team (Solidity, Foundry, fuzzing, auditing; TypeScript and React) have a working end-to-end demo at **Sat 7 Nov 09:00 IST**, after starting from an empty repo at Thu 5 Nov 21:00 IST at the Jio World Convention Centre? Classic track and fresh builds only. Continuity-only tracks are ignored, and no fix below relies on code written before Thursday 21:00.

Input judged: `track_ideas/finalist_ideas_draft.md` (16 candidates). Context reused: `track_ideas/ideas/*.md`, `track_ideas/workshop_questions.md`, `track_ideas/track_combos_check.md`, `research_notes/EF tracks and Whitechain ideas/whitechain.md` and `anon_rpc.md`.

## How to read this file

- **Fact** lines carry a URL, or name the repo note that carries the URL and was written on 2026-10-31.
- **Judgement** marks this reviewer's opinion. That covers every score, every probability, every hour figure and every venue Wi-Fi prediction.
- **Fetched today:** two GitHub pages (the ERC-7730 registry's Uniswap folder and Ledger's `python-erc7730`) and one web search on EIP-8037 support in revm. **No ETHGlobal page was fetched for this pass.** Prize and rule text comes from the 2026-10-31 snapshot in `track_ideas/00_current_tracks.md`.
- **"P(demo)"** is my estimate of the chance that the candidate's main moment works end to end from the team's own build at 09:00 Saturday, as the draft describes it, without falling back to a recording. **"Score"** is finalist potential through the feasibility lens (1 to 10). It weighs P(demo), whether the moment survives the live 4 minute slot on venue Wi-Fi, and whether the hour budget leaves time for the video and README.

## 1. Dependencies that cut across candidates

### 1.1 Facts

- **Per-IP rate limits:** Whitechain's public RPC allows "50 requests/s per IP, burst 500", with no third-party RPC providers yet ([Whitechain network reference](https://docs.whitechain.io/learn/network/reference)). The Whitechain faucet gives "0.5 WBT per 24h", needs a GitHub account at least 30 days old, and limits per wallet, IP and GitHub account ([Whitechain faucet docs](https://docs.whitechain.io/learn/get-started/get-testnet-wbt)). Arkiv's Rabdi RPC returned `ratelimit: limit=2000, remaining=1999, reset=10` (`track_ideas/ideas/arkiv.md` section 2, direct call to [Rabdi RPC](https://rpc.rabdi.db-chain.testnet.arkiv.network)).
- **Prize USDT price:** the WWBT/USDT pool held about 1,498 WWBT and 117,546 prize USDT on 31 Oct, at an implied 79.32 USDT per WBT, with observation cardinality 1 (`track_ideas/ideas/whitechain.md` section 1.2, [pool balances](https://explorer.testnet.whitechain.io/api/v2/addresses/0x5645101Ca8d2F7BaBC27b10359555767a1BdF999/token-balances)).
- **Anon-RPC transport:** tor-js runs at about 0.8 to 1.2 s p50 with an 8 s boot, and Nym at about 0.8 s with an 11 s boot ([anon-rpc bench](https://github.com/ethereum/anon-rpc/actions/runs/40303047893), via `anon_rpc.md`). The wallet guide configures tor-js with a gateway given as a raw `IP:port:key` (port 12298) ([wallet guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-wallet.md)), and that demo gateway "may disappear at any time" ([adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)).
- **Frame transactions:** "Forge and Hardhat cannot execute frame opcodes"; on chain 1337 only APPROVE and SIGPARAM were verified on chain ([@forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support), via `ideas/ef.md` section 4). `devnet1.altmempool.wtf` returned empty responses on 26 Oct (`workshop_questions.md` section 1, citing the [gateway](https://altmempoolgateway.forshtat.com/rpc)).
- **No testnet for Flash:** "We recommend testing on a production chain like Base or Solana using small amounts" ([Flash FAQ](https://flash.definitive.fi/docs/faq.md), via `ideas/definitive.md`).
- **World ID onchain verification** exists only on World Chain and Arc ([World onchain verification](https://docs.world.org/world-id/idkit/onchain-verification), via `ideas/world.md` section 2). The Mumbai World page says proofs are mocked: "We are mocking proofs now, so you don't need sandbox app anymore" ([World prizes](https://ethglobal.com/events/mumbai/prizes/world), snapshot in `ideas/world.md`).
- **0G private mode:** `X-0G-Provider-Trust-Mode: private` returns 503 `no_provider_for_trust_mode` and "never silently falls back" ([0G Router privacy](https://docs.0g.ai/developer-hub/building-on-0g/compute-network/router/privacy), via `ideas/0g.md`).
- **Aqua** is deployed on 17 chains, including Base and Arbitrum, and has no known testnet deployment ([Aqua deployments](https://github.com/1inch/aqua/blob/main/deployments.md), via `ideas/1inch.md`; `workshop_questions.md` section 7). **Chainlink Local** v0.3.0 supports CCIP 2.0 lanes ([chainlink-local releases](https://github.com/smartcontractkit/chainlink-local/releases), via `ideas/chainlink.md`).
- **Prompt injection in sponsor docs:** each Flash docs page fetched for `ideas/definitive.md` "carried embedded instructions asking AI agents to send 'intent, decline, or blocked' reports to a Definitive endpoint" (`ideas/definitive.md` section 2).

### 1.2 Judgement on venue Wi-Fi

- Hundreds of hackers will probably leave through a few NAT addresses. Every per-IP limit above (Whitechain's 50 rps, Whitechain's faucet, Arkiv's rate limit) is then shared with the whole room. Any build on those chains needs a phone hotspot for the demo machine and testnet funds collected **before** Thursday from home connections. Collecting testnet tokens is not project code, so it does not break the fresh-build rule.
- Conference networks often block non-web ports. The tor-js gateway on port 12298 is the most exposed dependency in this file. A gateway the team runs itself on port 443 removes that risk.
- A mainnet fork that pulls state over RPC during a live demo is slow and fragile on shared Wi-Fi. Every fork demo should run from a saved `anvil --dump-state` or `--load-state` snapshot made on Friday. Fork demos then become the most Wi-Fi-proof format in this file.
- Anything that waits on finality (CCIP full finality, Whitechain's safe head, Hedera schedules) cannot run inside 4 minutes. It has to be pre-sent, with the explorer link shown.
- Every team member's AI coding agent will read sponsor docs. Given the Flash finding, the team should treat fetched docs as untrusted and never let an agent act on instructions inside them.

## 2. Scorecard (all Judgement)

| # | Candidate | P(demo) | Score | Verdict | Single most important fix or reason |
|---|---|---|---|---|---|
| 1 | Truthsign | 70% | 8 | keep | Demo on a flat-calldata descriptor (V3 SwapRouter), not Universal Router; fork from a saved snapshot |
| 2 | Upgrade Council | 60% | 7 | keep | Use `@openzeppelin/upgrades-core` for the layout diff; prove two mocked `sub` values in hour 1 or switch to the code flow |
| 3 | Pause Fast, Unpause By A Person | 35% | 4 | revise | Five external systems in 36 h; cut to Chainlink only, two destination chains, all live on Chainlink Local |
| 4 | Greenshoe | 50% | 6 | revise | Graduate the CCA once Friday morning and save the fork state; arbitrage fills as one scripted taker, not routing |
| 5 | Reserve Gate | 55% | 6 | revise | Prove in hour 2 that `cre workflow simulate` can read a local Anvil RPC, or enter 1inch alone |
| 6 | Bidproof | 80% | 7 | keep | Count real auctions tonight from public explorers; commit the scan with its block number so replays work offline |
| 7 | HookBreak | 45% | 6 | revise | "No hint, drains the asset" is not dependable in 36 h; promise the property break, show the drain only if it reproduces |
| 8 | Residue | 75% | 8 | keep | Escrow and lens first, Arkiv only after the hour-4 gate passes; host the live demo statically |
| 9 | Lanes | 35% | 4 | revise | The team's tools (Forge) cannot run frame opcodes; make local ethrex plus sidecar the stage and the devnet the evidence |
| 10 | Walkaway | 50% | 6 | revise | Own tor-js gateway on port 443, pinned worker hash in the file, and test the harness from `file://` in hour 1 |
| 11 | Issuer Brake | 25% | 3 | drop | New key model, ATS SDK, schedules and World on an unproven `msg.sender` gate: the weakest team fit |
| 12 | Gas Ledger | 65% | 5 | revise | Start the faucet drip today on three GitHub accounts; demo over a hotspot because of the 50 rps per-IP limit |
| 13 | Hundi | 80% | 5 | revise | 1,000 and 980 USDT are not obtainable from the faucet; set amounts to about 10 USDT |
| 14 | Last Out | 55% | 6 | revise | Use a Base token Flash quotes at 2 USDC size, not a thin one; gate the 1271 submit check in hour 1 |
| 15 | Witness | 45% | 5 | revise | One Wi-Fi blip turns the green beat amber on stage; USB-tether the Pi to a phone and add text input as a fallback |
| 16 | Regas | 60% | 7 | keep | Use `eth_call` with state overrides on Sepolia and Hoodi as the two-rule executor instead of hunting for a local EVM |

**Judgement summary.** Six candidates are likely (65% or better) to have a working demo at 09:00: Bidproof, Hundi, Residue, Truthsign, Gas Ledger and, on its core beat, Regas. Of those, only Truthsign and Residue also carry a strong finalist moment, which is why they top the scores. Pause Fast, Lanes and Issuer Brake each depend on three or more things the team neither controls nor has verified, and each fails on the critical path in hours 0 to 6.

## 3. Candidate notes

### 1. Truthsign (score 8, keep, P(demo) 70%)

- **Dependencies (Facts).** The registry is CC0-1.0 ([registry](https://github.com/ethereum/clear-signing-erc7730-registry)). The visible Uniswap folder lists calldata descriptors for `UniswapV2Router02`, `UniswapV3SwapRouter`, `UniswapV3Router02` and `UniswapV3NonfungiblePositionManager`, plus EIP-712 descriptors for UniswapX and Permit2, but **no Universal Router file appears** ([registry/uniswap](https://github.com/ethereum/clear-signing-erc7730-registry/tree/master/registry/uniswap), fetched today; the listing may be truncated). Ledger publishes `python-erc7730`, "ERC-7730 descriptors validation and utilities", under Apache-2.0 ([python-erc7730](https://github.com/LedgerHQ/python-erc7730), fetched today). `@arkiv-network/sdk` 1.0.0 was published on 30 Oct with 0.9 still on `next` (`ideas/arkiv.md` section 2, [npm](https://www.npmjs.com/package/@arkiv-network/sdk)).
- **Critical path (Judgement).** Renderer subset, then effect extraction on a fork, then the field fuzzer, then the Arkiv importer and checker, then the sweep. The first two are on the path to the demo moment; Arkiv and the sweep are not. The draft's 0:25 beat uses "a real registry descriptor for a real Uniswap Universal Router call". Universal Router calldata is a command byte string plus nested inputs, which a field-level renderer handles badly. If no Universal Router descriptor exists, that beat cannot be built at all. Use the V3 SwapRouter `exactInputSingle` descriptor, whose fields are flat. Validate inputs with `python-erc7730` instead of writing a validator, which saves 3 to 4 hours of the 10 budgeted for the renderer.
- **What fails live (Judgement).** An Anvil fork pulling mainnet state on venue Wi-Fi; the fix is a saved state snapshot. The GitHub-off moment needs Arkiv's RPC to be reachable through a shared NAT; run it over a hotspot and keep the signed local snapshot as the labelled fallback. The registry sweep may not finish, which the draft already covers.
- **Fix.** Swap the demo descriptor and fork from a snapshot. Drop the optional Chainlink CRE third slot: it buys a $1,500 single-winner prize at the cost of the hours the video needs.

### 2. Upgrade Council (score 7, keep, P(demo) 60%)

- **Dependencies (Facts).** Mocked World proofs; backend verification at `POST https://developer.world.org/api/v4/verify/{rp_id}`; onchain verification only on World Chain and Arc, so a Sepolia gate must trust a backend signature (`ideas/world.md` section 2, [World onchain verification](https://docs.world.org/world-id/idkit/onchain-verification)). Whether mocked identities honour a requested `sub` in the RFC 8628 device flow is open (`workshop_questions.md` World item 1).
- **Critical path (Judgement).** The gate contract and Foundry tests are the team's home ground. The two unknowns are the World environment (two distinct mocked humans with stable `sub`) and the bytecode witness. For the storage-layout diff, OpenZeppelin's public `@openzeppelin/upgrades-core` already compares layouts between implementations. Using it instead of writing one cuts the 10-hour witness estimate roughly in half and removes the most bug-prone part. Mask immutables and strip the metadata hash before comparing code hashes.
- **What fails live (Judgement).** World's prompt reaches the engineer's phone over cellular, so venue Wi-Fi matters only for the laptop's OIDC callback. The likely live failure is a mocked-identity session expiring between rehearsal and the slot. Re-authenticate both phones minutes before going on.
- **Fix.** In hour 1, get one validated ID token for each of two mocked humans. If only one exists, the wrong-human beat dies; keep the replay-against-tampered-implementation beat, which needs no second human.

### 3. Pause Fast, Unpause By A Person (score 4, revise, P(demo) 35%)

- **Dependencies (Facts).** Four testnets (Sepolia plus Base, Arbitrum and OP Sepolia), each needing ETH and LINK. Data-only fast-finality sends are documented, but which lanes accept them is open, and Sepolia full finality takes about 13 to 17 minutes (`ideas/chainlink.md` section 2, [CCIP docs bundle](https://docs.chain.link/ccip/llms-full.txt)). Chainlink Local v0.3.0 supports CCIP 2.0 lanes ([chainlink-local releases](https://github.com/smartcontractkit/chainlink-local/releases)). On top of that comes the World environment from candidate 2.
- **Critical path (Judgement).** The CRE workflow, receivers on three chains, the CCIP 2.0 finality configuration, the LLM triage step, the World device flow and the IDKit enrollment add up to five external systems. The draft itself puts the build at 63 to 65 person-hours "with little slack" against a 75 to 80 hour budget, before the 3 to 4 hours of testnet logistics. One slipped gate leaves no video time.
- **What fails live (Judgement).** Everything that crosses a testnet. The draft already moves the live part to Chainlink Local, which is right. But then the four-chain testnet setup is evidence nobody sees in the room.
- **Fix.** Make it a Chainlink-only build: CRE plus CCIP 2.0, two destination chains, everything live on Chainlink Local, and one pre-sent testnet message per direction as evidence. Keep the "unpause needs a second signature" rule as a plain onchain guardian key. Then it fits in about 45 hours and the finality asymmetry still carries the demo.

### 4. Greenshoe (score 6, revise, P(demo) 50%)

- **Dependencies (Facts).** Official Aqua on Base ([Aqua deployments](https://github.com/1inch/aqua/blob/main/deployments.md)); CCA factory v2.1.0 on Base ([deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)); the AquaSwapVMRouter opcode set is small, and appended opcodes need a redeployed router from the matching swap-vm tag (`ideas/1inch.md` section 2). Two rulings are open: appended opcodes, and a Safe as the maker (`workshop_questions.md` 1inch item).
- **Critical path (Judgement).** Three systems new to most auditors must compose on one fork: a CCA run through its block steps to graduation, LBPStrategy seeding a v4 pool, and a SwapVM program with three new instructions. Any one of them can eat Friday morning. Because everything is fork-local, it is the most Wi-Fi-proof DeFi demo here once the state is saved.
- **What fails live (Judgement).** Nothing network-related if the state is saved. The risk is a long Anvil replay timing out mid-demo; run the CCA graduation once Friday morning and `--dump-state` it.
- **Fix.** Pre-graduate and snapshot. Replace "every arbitrage fill lands on the 0.97 P line" (which needs a router across the v4 pool and Aqua) with one scripted arbitrage taker whose fills are printed. Use an EOA maker until 1inch confirms that a Safe counts.

### 5. Reserve Gate (score 6, revise, P(demo) 55%)

- **Dependencies (Facts).** Two mainnet forks (Ethereum for the adapter, Arbitrum for L2 supply); official Aqua on Arbitrum ([Aqua deployments](https://github.com/1inch/aqua/blob/main/deployments.md)); CRE "simulation is enough" ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink), snapshot); in-flight LayerZero message status from an external API.
- **Critical path (Judgement).** The Aqua side is the shared 1inch harness and well within the team's range. The CRE half is the doubt: the workflow must read two local forks, and whether the CRE simulator accepts a `localhost` RPC in its config is not established in any repo note. The external API also runs over venue Wi-Fi.
- **What fails live (Judgement).** The LayerZero API call; cache the response with its timestamp and show it as a freshness input.
- **Fix.** Test `cre workflow simulate` against a local Anvil RPC by hour 2. If it fails, enter 1inch alone and spend the 10 CRE hours on the fuzz property and the video.

### 6. Bidproof (score 7, keep, P(demo) 80%)

- **Dependencies (Facts).** Factory v2.1.0 on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain and Sepolia ([CCA deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)). Everything else is public chain state and the team's own contracts.
- **Critical path (Judgement).** The lowest external-dependency count in the file: an indexer, a router and a last-block simulator, all in the team's core skills. The one unknown is the size of the population. If fewer than about 10 auctions exist, the headline number is small.
- **What fails live (Judgement).** A judge-chosen replay command hitting public RPC block-range caps over a shared NAT. Commit the scan output with its block number, and have the replay read a cached log set by default with `--live` as an option.
- **Fix.** Count real auctions tonight from public explorers. That is research, not code. It decides whether the scan or the router leads the demo before Thursday.

### 7. HookBreak (score 6, revise, P(demo) 45%)

- **Dependencies (Facts).** Cork: `beforeSwap` callable by anyone, 28 May 2025 ([Dedaub](https://dedaub.com/blog/the-11m-cork-protocol-hack-a-critical-lesson-in-uniswap-v4-hook-security/)). Bunni v2: a rounding error compounded over 44 small withdrawals ([BlockSec](https://blocksec.com/blog/bunni-incident-repeated-small-withdrawals-compound-a-rounding-error-into-an-8.4m-drain)). Both need archive state from 2025.
- **Critical path (Judgement).** A generic harness will find "a non-PoolManager caller reached a callback" in seconds; that is close to a static check, as the draft admits. Turning that into a sequence that drains the same asset with no protocol-specific hint means guessing the attacker's market setup and hook data. I would not bet a finalist slot on that happening by the Fri 06:00 gate. Fork fuzzing over remote RPC is slow; one overnight Bunni campaign on a laptop that also has to record the video is optimistic.
- **What fails live (Judgement).** A live fork fuzz run on venue Wi-Fi; the draft's cached-state fallback is mandatory, not optional.
- **Fix.** Rewrite the promise to what is dependable: the property break plus a generated failing test on the real block, with the drain claimed only if it reproduces by the gate. Run every campaign against a dumped fork state, never live RPC.

### 8. Residue (score 8, keep, P(demo) 75%)

- **Dependencies (Facts).** ENSv2 contracts are listed for mainnet and Sepolia, including `UserRegistryImpl`, `PermissionedResolverImpl`, `VerifiableFactory` and `UniversalResolverV2`, and Sepolia lists `MockUSDC` ([ENS deployments](https://docs.ens.domains/learn/deployments)). ENSjs 5.2.5 or later has stable v2 write support ([ENSv2 readiness](https://docs.ens.domains/web/ensv2-readiness)). The deployments page still says mainnet resolution "continue[s] through the ENSv1 contracts" until the launch completes, so the docs lag the 27 Oct blog (`ideas/ens.md` section 2).
- **Critical path (Judgement).** A Foundry escrow plus invariant suite is the team's strongest skill. The TypeScript walker rebuilds roles from `EACRolesChanged`, which is a week of mainnet logs since launch: small. Arkiv adds about 14 hours and the five `/arkiv/*.md` files, and none of it is on the path to the Buy-button moment.
- **What fails live (Judgement).** A judge clicking Buy on Sepolia is about 12 s per block and survives Wi-Fi. The mainnet lens is one RPC call per event range; keep a cached copy. ENS requires "a link to a live demo", so host the front end statically and point it at public RPCs with a fallback list.
- **Fix.** Build the escrow and the lens first. Start Arkiv only after the hour-4 three-transfer-path gate passes, and drop it without regret if Friday afternoon is tight.

### 9. Lanes (score 4, revise, P(demo) 35%)

- **Dependencies (Facts).** Forge cannot execute frame opcodes; chain 1337 verified only APPROVE and SIGPARAM; the event devnets had no public parameters before the event; devnet1 returned empty responses on 26 Oct; the sidecar runs older PR #6 rules with "no cap on keyed ones" (`ideas/ef.md` section 4, citing [hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support) and [docs: differences](https://github.com/forshtat/mempool-workshop-documentation/blob/HEAD/src/content/docs/project/differences.md)). The EF page promises "Multiple devnets ... with keyed nonces and recent roots live, plus a faucet" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), snapshot).
- **Critical path (Judgement).** The team's main advantage, Foundry testing and fuzzing, does not work here: every test must be a devnet or local-stack transaction. The demo also needs a canonical-rules path (direct `eth_sendRawTransaction` to ethrex), which a public devnet may not expose. And "revoking one approval invalidates exactly one pending transaction" depends on the sidecar re-validating pending transactions after a state change, which no note verifies.
- **What fails live (Judgement).** A shared devnet on Saturday morning, used by every alt mempool team at once.
- **Fix.** Make the local ethrex plus sidecar stack in Docker (`forshtat/ethrex` branch `eip8141-tracer`) the stage, so the demo needs no network. Use the devnet only for the qualifying admitted-transaction links. Gate in hours 0 to 4: one admitted keyed-nonce transaction, and one pending transaction dropped after a storage write.

### 10. Walkaway (score 6, revise, P(demo) 50%)

- **Dependencies (Facts).** Anon-RPC 0.4.0 packages on npm since 28 Oct ([browser-harness](https://www.npmjs.com/package/@anon-rpc/browser-harness)); the tor-js demo gateway may disappear and is addressed by IP and port 12298; `WorkerInit` takes an `iframeUrl` "same-origin bootstrap page" and a `preExisting.rpcProvider` used to read the specifier ([SPEC section 5](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md), via `anon_rpc.md`); Privacy Pools pins the worker hash client side ([tor-fetch.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts)); Kiwi News fails over "If an RPC provider refuses Tor traffic" ([adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)).
- **Critical path (Judgement).** Three integration risks sit on the critical path, and none is the team's craft. (1) A single HTML file opened from a USB stick runs on a `file://` origin, which is opaque. The harness's same-origin iframe bootstrap may refuse to load there; nobody has tested it. (2) With RPC hosts blocked in the hosts file, the specifier read through `preExisting.rpcProvider` has nowhere to go unless the worker hash is pinned in the file. (3) Broadcasting a mainnet transaction through Tor needs an RPC that accepts Tor exits. The Colibri-through-worker question comes on top.
- **What fails live (Judgement).** Port 12298 blocked by venue Wi-Fi; Tor boot plus five sequential reads at 1 s each; the demo gateway gone on Saturday.
- **Fix.** Run the team's own tor-js-gateway on a VPS behind port 443, pin the worker hash in the file (the Privacy Pools pattern), and test `file://` in hour 1. If `file://` fails, the USB stick carries the file plus a two-line static server, and the CROPS line says so.

### 11. Issuer Brake (score 3, drop, P(demo) 25%)

- **Dependencies (Facts).** The ATS factory and resolver IDs come from an `.env.example` "verify that both are current"; gate (b), whether a scheduled `ContractExecute` keeps the brake account as `msg.sender`, is unverified (`ideas/hedera.md` section 5, Issuer Brake). World Agent Pass as in candidate 2.
- **Critical path (Judgement).** Hedera's key model, KeyLists, HCS, scheduled transactions and the ATS SDK are all new to an EVM audit team. The whole mechanism hangs on gate (b), and a World integration sits on top of that. The draft itself calls it "the weakest team fit here". A testnet schedule with a 3 minute delay also eats 3 of the 4 demo minutes unless pre-created.
- **Fix or reason.** Drop it as a primary. If the team wants Hedera, the draft's own Slowvault pivot (pure SDK) is the only shape that fits 36 hours, and it is a partner-prize play, not a finalist one.

### 12. Gas Ledger (score 5, revise, P(demo) 65%)

- **Dependencies (Facts).** Prize USDT can be bought from the WWBT/USDT pool with faucet WBT (`ideas/whitechain.md` section 3, Q2); the faucet gives 0.5 WBT per 24 h per GitHub account, limited per IP; the RPC allows 50 rps per IP; "safe" takes up to about 30 min ([Whitechain finality](https://docs.whitechain.io/learn/network/transaction-finality)); the WebSocket supports `newPendingTransactions` (`whitechain.md` research note).
- **Critical path (Judgement).** Plain EVM contracts, a relayer and a keeper: squarely in the team's range. The two real risks are funding and rate limits, not code. Three accounts dripping from today to Thursday give about 7.5 WBT, about 590 USDT at today's price. That is plenty for 4.00 USDT checkouts, but only if the drip starts now from home IPs. On venue NAT the faucet's IP limit will probably be exhausted by other teams.
- **What fails live (Judgement).** The judge-run drain script plus the relayer plus the dashboard can exceed a 50 rps budget shared with the room. The "settled" webhook cannot fire inside 4 minutes; show a pre-settled payment for that line.
- **Fix.** Start the faucet drip today on all three GitHub accounts and swap a working float at Thursday 21:00. Demo over a hotspot. Batch reads through Multicall3, which the docs name as the mitigation.

### 13. Hundi (score 5, revise, P(demo) 80%)

- **Dependencies (Facts).** The same prize USDT and faucet economics as candidate 12. P256VERIFY at `0x100` returns 1 for a valid signature on Whitechain Sepolia (`research_notes/EF tracks and Whitechain ideas/whitechain.md` Q4).
- **Critical path (Judgement).** The cheapest strong build in the file (about 40 hours). Nothing on its path is outside the team's skills. The one thing that breaks as written is the money: the demo pays 980 USDT and then 1,000 USDT, roughly 1,980 USDT, which is about 25 WBT at 79.32 per WBT, or about 50 faucet-days. Even recycling the same USDT, the debtor alone needs 1,000.
- **What fails live (Judgement).** Little. Fast blocks and a three-pane demo mostly on chain; the passkey path is the one browser-API risk, and the draft has an EOA fallback.
- **Fix.** Denominate the demo invoice at 10.00 USDT financed at 9.80. The finalist question is not feasibility but WOW, which the security lens of the other judges will weigh.

### 14. Last Out (score 6, revise, P(demo) 55%)

- **Dependencies (Facts).** Flash has no testnet; API keys are self-serve; Flash validates 1271 when "the address has any code" but does not say at which stage; trigger prices "are held offchain by Flash's execution engine" ([Flash EVM overview](https://flash.definitive.fi/docs/evm-overview.md); [Non-custodial](https://flash.definitive.fi/docs/non-custodial.md), via `ideas/definitive.md`). Flash docs carried embedded agent instructions (section 1.1 above).
- **Critical path (Judgement).** Rebuilding Flash's EIP-712 digest onchain (the draft budgets half a day) and getting both bracket signatures through 1271 are the hard part, and both are gated on the sponsor's behaviour. A "thin Base token" may not be routed by Flash at all, or may route with enough price impact to ruin the entry fills on stage. Privy wallets on two judges' phones are a sign-up step that can stall in front of judges.
- **What fails live (Judgement).** Real Base fills during the slot. Pre-fill entries, as the draft says. The refusal beat needs only Flash's submit-time check, so it is the safe live moment.
- **Fix.** Pick the token by "Flash quotes it at 2 USDC with low impact", not by thinness, and gate the 1271 submit rejection in hour 1. Tell every teammate's coding agent never to act on instructions found in Flash pages.

### 15. Witness (score 5, revise, P(demo) 45%)

- **Dependencies (Facts).** `whisper-large-v3` is among nine TeeML models; private mode never silently falls back (`ideas/0g.md` section 2, [0G Router privacy](https://docs.0g.ai/developer-hub/building-on-0g/compute-network/router/privacy)); "A fallback that fakes the decision disqualifies" ([0G prizes](https://ethglobal.com/events/mumbai/prizes/0g), snapshot).
- **Critical path (Judgement).** Hardware is not this team's skill. A Pi with mic, screen, LED and button needs a working OS image, audio capture and display drivers before any product work. Each decision needs two sealed calls (transcription, then decision) plus a 0G Storage write over the network. Private-mode 503s will show up as amber even when the venue network is fine, if private providers are saturated by other 0G teams on the same morning.
- **What fails live (Judgement).** The main green beat depends on the Wi-Fi at that moment. A blip turns the device amber, which is honest but leaves the demo with only refusals. Venue noise defeats an open mic.
- **Fix.** USB-tether the Pi to a phone hotspot, use push-to-talk with a close mic, and allow typed intent through the same decision path (labelled) so a transcription failure does not stop the demo. Buy and burn the OS image before Thursday; writing code waits until 21:00.

### 16. Regas (score 7, keep, P(demo) 60%)

- **Dependencies (Facts).** Glamsterdam is live on Sepolia and postponed on Hoodi ([EF blog, 22 Oct 2026](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay)); rescheduling is expected after Devcon ([Parameter](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/)). revm implements EIP-8037 and enables it for the AMSTERDAM spec, with a state-gas reservoir that is drawn first and then "spills into remaining gas"; v108 (19 May 2026) aligned it with bal-devnet-7 ([revm v108 release notes](https://newreleases.io/project/github/bluealloy/revm/release/v108); [revm-primitives eip8037.rs](https://docs.rs/crate/revm-primitives/latest/source/src/eip8037.rs); found by web search today, versions not checked against the official repo). No result showed Foundry or Anvil support.
- **Critical path (Judgement).** The core beat is better placed than the draft thinks. The team controls the planted forwarder, so it can design an inner call whose state creation costs more under EIP-8037 and run out of gas behind a fixed gas stipend. Both chains are public, and both faucets are standard. The open risk is the reservoir model: if state gas is charged from a separate reservoir, a `gasleft()`-based guard may behave differently from what the team expects. The hour 0 to 4 gate finds that out. For the "Regas flagged it before we sent it" half, the draft's hours 4 to 10 search for a local EVM is not needed. `eth_call` with a state override on Sepolia and on Hoodi runs any bytecode under each chain's real live rules, which also avoids a mismatch between a local spec version and what Sepolia actually runs.
- **What fails live (Judgement).** Two public testnets over venue Wi-Fi with about 12 s blocks: acceptable, with both transactions pre-sent as a fallback. The mainnet pattern count is a static scan and needs no network on stage.
- **Fix.** Use dual `eth_call` state overrides as the executor, and check before Thursday that the chosen public Sepolia and Hoodi RPCs accept state overrides. The prize stack is empty by design, so the score assumes the team accepts a finalist-only bet.

## 4. Choosing under feasibility (Judgement)

- **Safest finalist bets:** Truthsign (1) and Residue (8). Both have their decisive moment on a fork or on Sepolia under the team's control, and their partner extras (Arkiv) are off the critical path and can be dropped.
- **Safe but limited ceiling:** Bidproof (6) and Hundi (13). They are very likely to work; whether they become finalists depends on the auction count (6) and WOW (13), not on engineering.
- **Worth it only with the stated fix:** Upgrade Council (2), Walkaway (10), Regas (16), Greenshoe (4).
- **Do not pick as the primary:** Pause Fast (3), Lanes (9) and Issuer Brake (11). Each needs three or more unverified external behaviours to line up before the first demo moment exists.
- **Before Thursday, no code needed:** start the Whitechain faucet drip on three accounts; count real CCAs; check whether public Sepolia and Hoodi RPCs accept `eth_call` state overrides; rent a small VPS for a tor-js gateway on port 443 if Walkaway stays in play; confirm each laptop can tether to a phone hotspot.

## 5. Gaps

- No ETHGlobal page was re-fetched; prize text is the 2026-10-31 snapshot.
- Nothing here was run against a live devnet, testnet or SDK. Every P(demo) is a judgement from repo notes plus three checks made today.
- The Uniswap registry listing fetched today may be truncated ("View all files"), so a Universal Router descriptor could still exist elsewhere in the registry.
- Venue Wi-Fi behaviour at the Jio World Convention Centre is predicted, not observed.
