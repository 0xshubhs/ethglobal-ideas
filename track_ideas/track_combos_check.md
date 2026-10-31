# ETHGlobal Mumbai 2026: adversarial check of the eight prize stacks

Reviews `track_ideas/track_combos.md` (written 2026-10-31) against the verbatim prize text in `track_ideas/00_current_tracks.md`. Written 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build only. Continuity-only tracks are ignored everywhere below; no fix proposed here depends on code that existed before Thursday 21:00.

## How this check was made

- Prize, rule and schedule text: `track_ideas/00_current_tracks.md`, fetched 2026-10-31 from [the prizes page](https://ethglobal.com/events/mumbai/prizes), the sponsor subpages, [the event page](https://ethglobal.com/events/mumbai) and [the details page](https://ethglobal.com/events/mumbai/info/details).
- One re-fetch of [the prizes page](https://ethglobal.com/events/mumbai/prizes) on 2026-10-31 for this check. No bot check was shown. Every prize name, amount and split it returned matches `00_current_tracks.md`, and "(tbc: final review pending)" is still on both CROPS prizes. The fetch tool cut the page before the Chainlink section, so Chainlink text comes from the notes only. No other ETHGlobal page was fetched.
- Supporting facts come from the sponsor files in `track_ideas/ideas/`, `research_notes/EF tracks and Whitechain ideas/anon_rpc.md` and `plans/reviews/judge_ef_access_layer.md`. Where a line repeats a fact from those files, the URL they cite is given.
- **Fact** lines carry a URL. **Judgement** lines are this reviewer's opinion. Hour figures are person-hours, measured against the combos file's own budget of about 75 to 80 build hours plus 6 to 8 for submission material.

## Verdicts at a glance (Judgement)

| # | Combo | Verdict | One-line reason |
|---|---|---|---|
| 1 | Greenshoe (1inch + Uniswap) | **Sound** | Every rule met on one Base fork; Uniswap is thin but costs only about 5 hours. Do not do the mainnet fill |
| 2 | Pause Fast (Chainlink + World) | **Sound, one design fix required** | Rules met, but the claim that a stolen backend key cannot unpause is false as designed. Fix it with the IDKit-enrolled key and IDKit becomes central |
| 3 | Truthsign Desk (EF + Arkiv + ENS) | **Trim: drop ENS** | About 65 of 75 to 80 hours before the Anon-RPC fork work the CROPS P line needs; ENS is the least central part and the third badge on one screen |
| 4 | Brake (Hedera + World) | **Trim: drop Hedera "No Solidity Allowed"** | The product's core action calls ATS Solidity contracts, which conflicts with "with no Solidity smart contracts"; it also drags in Slowvault as a second story |
| 5 | Residue (ENS + Arkiv) | **Sound** | Clean on rules; Arkiv is the lens's index. Fix the go or no-go test, which uses the one transfer function ENSv2 already guards |
| 6 | Closebook on Gas Ledger (Whitechain + EF) | **Trim: drop EF CROPS** | CROPS is bolted on: a single-sequencer L2, a freezable USDT, and a README that tells EF and Whitechain opposite stories about the relayer |
| 7 | Reserve Gate (1inch + Chainlink CRE) | **Sound** | CRE is the instruction's only input; weak points are the fork write path and an external API that does not feed the number |
| 8 | Last Out (Definitive + World IDKit) | **Sound** | No rule conflicts. The pitch overclaims: a leader's side wallet is untouched, so the WETH demo shows no real dump threat |

---

## 1. Cross-cutting findings the combos file missed

### 1.1 Pre-event designs and the AI planning rule (affects every combo)

**Facts.** Classic track: "all work on your project must begin after the hackathon officially starts. Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits." AI rules: "If you use one [a spec-driven workflow], you must include all spec files, prompts, and planning artifacts in your submission repository." ([details page](https://ethglobal.com/events/mumbai/info/details), via `00_current_tracks.md`)

**Fact (repo).** The sponsor files contain Solidity interfaces and function bodies for the exact contracts these combos would build, for example `interface IGreenshoe` in `ideas/1inch.md`, `getCCVsAndFinalityConfig` in `ideas/chainlink.md` and `interface ILockAccount` in `ideas/definitive.md`. A count of `interface I` or `function ` lines gives 1 to 13 per sponsor file (`ideas/ef.md` has none).

**Judgement.** Section 6.1 of the combos file says to commit these notes under `planning/` if they drive the build. That would put project-specific interfaces dated before Thursday 21:00 into the submission, which reads as the "prior ... designs" the Classic rule excludes. Bringing ideas to a hackathon is normal; bringing contract interfaces is the grey area. Two safer options: (a) hand the build only idea-level notes (pitch, promise, gates, sponsor rules), never the code blocks, and write every interface fresh after 21:00; or (b) ask ETHGlobal staff at registration (Thu 13:00 onward) whether idea notes with interface sketches are allowed, and get the answer in writing. The workshop question list quotes the rule but asks no question about it.

### 1.2 Multi-track wins inside one partner are the plan for four combos, not upside

**Fact.** "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize." ([event page FAQ](https://ethglobal.com/events/mumbai)) Nothing on any sponsor page says whether one project can *win* two tracks of the same partner.

**Judgement.** The combos file calls the second track upside (section 1), but combos 2, 4 and 6 spend 6 to 12 extra hours on work that exists only for that second track: IDKit enrollment in combo 2, Slowvault in combo 4, the Scale relayer economics in combo 6 (that one is also the Operate relayer, so it is cheaper). Spend those hours only after the sponsor answers at its workshop or booth on Thursday. Until then, design each combo so the primary track places on its own.

### 1.3 The "Sum of 1st places" column is arithmetically right but misleading

**Fact.** All eight sums check out against the amounts in `00_current_tracks.md` (for example combo 2: CRE $1,500 + CCIP $1,750 + Agent Pass $2,500 + IDKit $1,250 = $7,000).

**Judgement.** Four combos reach their sum only if a single-winner or two-winner track also pays out (CRE $1,500 one winner, Definitive $2,500 one winner, IDKit 2 x $1,250, No Solidity 2 x $1,000). For ranking, weigh by number of places: Uniswap's four places and ENS's four places are worth more per hour than their 1st-place figure suggests, and CRE's single place is worth less.

### 1.4 Finalist demo and testnet latency

**Facts.** Finalists get "7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A". Main Finalist Judging and Partner Prize Judging both run Sat 7 Nov 09:30 to 12:30. ([details page](https://ethglobal.com/events/mumbai/info/details); [event page](https://ethglobal.com/events/mumbai))

**Judgement.** Combos 2 (CCIP across four testnets), 4 (Hedera schedules), 6 (Whitechain settlement and an L1 forced-inclusion recording) and 8 (real fills on Base) all have steps that cannot be shown live inside four minutes. Combos 1, 5 and 7 run on forks or a single testnet and are the safest live demos. That supports the combos file's ranking of 1 and 7, and it counts against 2 and 4 as finalist bets more than the file admits.

---

## 2. The combos in detail

Each section gives: every qualification of every prize entered, checked; conflicts the designer missed; whether each partner is central; hours; effect on the finalist demo; verdict.

### Combo 1. Greenshoe: 1inch Aqua + Uniswap Foundation

**Qualification check (Facts from [1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch) and [Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| 1inch: "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)" | Met: official Aqua plus a redeployed `AquaSwapVMRouter` with appended opcodes |
| 1inch: "Onchain execution of token transfers should be presented during the final demo (local forks are ok)" | Met on a Base fork |
| 1inch: "Proper Git commit history (no single-commit entries on the final day)" | Process item; met if the branch plan is followed |
| 1inch: "The final positions must be demonstrated through tests scripts or a UI" | Met (tests plus band chart) |
| Uniswap: "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form ... that includes the link to your FEEDBACK.md file" | Planned; the form must be submitted after FEEDBACK.md has a public URL, so do it before 09:00 Saturday, not after |
| Uniswap: "Make sure your README clearly points to the relevant contracts and lines of code" | Planned (permalinks) |
| Uniswap scope: "Build on or integrate any part of the Uniswap stack, including ... CCA" | Met in letter |

**Missed conflicts and risks.**
- **Fact.** `ideas/1inch.md` lists the CCA getter warning "Callers MUST ensure that the latest checkpoint is up to date before using this function." ([IContinuousClearingAuction.sol](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IContinuousClearingAuction.sol)) The design pins the value on the first swap after graduation. **Judgement:** add a fork test showing that the pinned value equals the final clearing price after a checkpoint, or a judge who reads the NatSpec will ask.
- **Judgement.** The optional "one tiny real fill on Base mainnet" needs a real CCA on Base mainnet, which means launching a real token publicly to win a prize. Drop it. Uniswap's own question (fork-only demos) is the right way to settle evidence.
- **Judgement.** The Uniswap half has a framing risk the file does not name: the stabilisation book sits on 1inch Aqua and takes the flow that would otherwise trade in the v4 pool. Uniswap judges may read it as "a 1inch app that reads one Uniswap getter". The README fix in the file (no CCA means no anchor, no window, no pool) is the right one; also put the LBPStrategy and v4 pool seeding lines in the Uniswap section, so there is more than one integration point.
- **Judgement.** Custom instructions that write storage in swaps, and a Safe as the maker, are both open 1inch questions (`ideas/1inch.md` questions 4 and 5). Neither is a rule, but a "no" on either costs hours, not the prize.

**Centrality (Judgement).** 1inch: central. Uniswap: real but thin (one getter plus a pool the team seeds itself); likely 3rd or 4th place territory, which still pays.

**Hours (Judgement).** About 5 extra hours for Uniswap is credible because CCA creation is already in the 1inch gate. Core about 45 to 55. Fits with slack.

**Finalist (Judgement).** Unaffected; the Uniswap chapter is setup footage. A fork demo is safe live. WOW is moderate: a TradFi name needs a 15-second explainer.

**Verdict: Sound.** Keep both. Do not add a third partner and do not do the mainnet fill.

### Combo 2. Pause Fast, Unpause Only By A Person: Chainlink CRE + CCIP 2.0 + World Agent Pass + IDKit

**Qualification check (Facts from [Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink) and [World prizes](https://ethglobal.com/events/mumbai/prizes/world); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| CRE: "Build, simulate, or deploy a CRE Workflow that's used as an orchestration layer within your project" | Met: the workflow is the only refiller and the pause trigger |
| CRE: "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent" | Met in letter, but the "system" is a team-built ticket API; Chainlink question 6 is open |
| CRE: "Demonstrate a successful simulation (via the CRE CLI) or a live deployment on the CRE network" | Planned (`cre workflow simulate --broadcast`) |
| CRE: "Be meaningfully used in your project" | Met |
| CCIP: "use Chainlink CCIP in some form to make a state change on a blockchain"; "Using Chainlink CCIP inside your smart contracts is required" | Met: senders and receivers are contracts |
| Agent Pass: "Integrate with the official World ID Agent Pass" | Planned (OIDC against `https://auth.world.org`) |
| Agent Pass: "Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action" | Planned (unpause) |
| Agent Pass: "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur" | Planned (three failed paths) |
| Agent Pass: "Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization" | Planned (Hono confidential client) |
| Agent Pass and IDKit: "Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact" | Planned (`WORLD_DEBRIEF.md`); make sure it answers all four items for each track |
| IDKit: "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate" | Met (server) |
| IDKit: "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance" | Met (guardian seat, Proof of Human) |
| IDKit: "Demonstrate a successful verification and one meaningful alternative path" | Met (`SameHuman`) |

**Missed conflicts and risks.**
- **Design hole (Judgement, from Facts in `ideas/world.md`).** The World file's own binding rule is "The contract must then trust only a backend EIP-712 signature over the same hash", and the backend "signs an EIP-712 `HumanApproval{actionHash, approver, expiry, nonce}` that the contract verifies once". So on chain, `AdminSender` sees only the backend's signature. The combos file's resolution says "A stolen backend key alone still cannot unpause (it also needs the guardian and the finality wait)". That is false: a stolen backend key can sign a valid approval with no guardian at all, and the finality wait is a delay with no veto, not a check. A security-team judge will find this in Q and A. **Fix:** make `AdminSender` require two signatures over the same `keccak256(target, calldata)`: the backend's Agent Pass attestation and a signature from the guardian's own key, which must be a key enrolled in the IDKit council. Then the promise holds (backend key alone, guardian key alone, and workflow key all fail), and IDKit stops being a separate enrollment story and becomes the second half of the unpause rule. Cost: about 2 extra hours.
- **Judgement.** The promise says "a prompt-injected 'all clear'", but nothing in the combo is an LLM; the detector is a deterministic CRE workflow. Either add a small LLM triage step in the workflow (CRE lists "LLM" among allowed integrations) whose output can only pause, or drop "prompt-injected" from the promise. World's text says "We are especially interested in agentic products" ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)), so a real agent helps Agent Pass too.
- **Judgement.** With server-side IDKit verification and a backend-signed enrollment, both World tracks rest on one backend key. The README must say so in the IDKit section, not only in the Agent Pass section.
- **Fact.** Data-only block-depth messages from Sepolia are documented as supported, but which lanes accept them is open (`ideas/chainlink.md` question 2, citing [the CCIP docs bundle](https://docs.chain.link/ccip/llms-full.txt)). **Judgement:** four testnets means four faucets of ETH and LINK and three lane configurations; budget 3 to 4 hours of pure testnet logistics that the file does not count.

**Centrality (Judgement).** CRE and CCIP: central, and CCIP 2.0 per-sender finality is the feature itself. Agent Pass: central (the only path to unpause). IDKit: peripheral as written (an enrollment screen), central after the fix above.

**Hours (Judgement).** The file prices World at about 18 hours but gives no figure for the Chainlink core. Estimate: CRE workflow and ticket API 12, senders, receivers and vaults with tests 12, four-chain deployment and lane setup 6, three-panel UI 8, attack script and fuzzing 5, so about 43. Total about 63 with World plus 2 for the fix: inside 75 to 80, little slack.

**Finalist (Judgement).** Strong story, weak live demo: CCIP latency on four testnets and a 13 to 17 minute finality wait cannot run in four minutes. Pre-send everything and run the live part on Chainlink Local; show testnet evidence as explorer links.

**Verdict: Sound, provided the two-signature fix goes in.** No prize to drop. If World says on Thursday that one project cannot place in both World tracks, keep the enrolled-key check anyway (it is what makes the security claim true) and enter Agent Pass only.

### Combo 3. Truthsign Desk: EF Best CROPS App + Arkiv Mirror (+ Swarm bonus) + ENS Best Use of ENSv2

**Qualification check (Facts from [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv) and [ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| CROPS 1: "Public repo under a free and open-source license ... with a README a judge can run it from" | Planned (MIT) |
| CROPS 2: "The README has a section titled CROPS, one or two lines per letter" | Planned |
| CROPS 3: "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters" | Planned (2:50 cut, server and GitHub switched off) |
| CROPS 4: "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not." | Met if the wallet wrapper keeps keys local |
| CROPS 5: "One EF prize per project" | Met (CROPS only; Anon-RPC as a component) |
| Arkiv: "Built from scratch at ETHGlobal Mumbai, following ETHGlobal's rules." | Met |
| Arkiv: "The data's license allows republishing. Link it in your README." | Met: the ERC-7730 registry is CC0-1.0 ([registry](https://github.com/ethereum/clear-signing-erc7730-registry), via `ideas/arkiv.md`) |
| Arkiv: "Not Sourcify data, from any chain." | Met if no Sourcify field is written |
| Arkiv: "Your import script is in the repo, and we can re-run it." | Planned |
| Arkiv: writes to "Arkiv's current testnet ... and a feature or query people use reads the data from Arkiv" | Met (wallet sync and lookup page) |
| Arkiv: README wallets and "one query we can run"; `/arkiv/schema.md`, `/arkiv/friction.md` and one file per criterion (`reach.md`, `why-arkiv.md`, `data-quality.md`); open-source licence; AI use | Planned |
| Swarm bonus: "Your project uses both Arkiv and Swarm"; `/arkiv/swarm.md` with the seven listed items; "Never store one [an encrypted reference] in an entity as it is" | Planned (public references only) |
| ENS: "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values." and a "link to a live demo" | At risk: see below |

**Missed conflicts and risks.**
- **CROPS P resolution does not work as written.** **Facts:** Anon-RPC's measured latency is "tor-js about 0.8 to 1.2 s p50 with a boot of about 8 s; Nym about 0.8 s p50"; the node harness is "Not yet a conforming harness"; a local JSON-RPC proxy that would let Foundry go through Anon-RPC is listed as an open idea, not a shipped tool (`research_notes/EF tracks and Whitechain ideas/anon_rpc.md`, citing [the anon-rpc repo](https://github.com/ethereum/anon-rpc) and [the node-harness README](https://github.com/ethereum/anon-rpc/blob/main/impl/node-harness/README.md)). **Judgement:** a fork run fetches state slot by slot. A swap through a router touches tens to hundreds of slots, so at about 1 s each a per-transaction fork check through Anon-RPC takes minutes, and the team would first have to build the proxy. The honest P line is: "fork reads go to an RPC the user chooses; that provider learns which contract you are about to call", stated as a trade-off, which the CROPS criterion allows ("trade-offs are stated in the README"). ENS lookups can still go through Anon-RPC.
- **ENS badge only works on the team's own demo protocol.** **Fact:** the Descriptor Desk demo resolves `clear-signing.demo-protocol.eth` (`ideas/ens.md`). **Judgement:** no real protocol has a frozen ENSv2 desk, so for every real registry descriptor the ENS check shows "unverified source". That is functional, not hard-coded, but a judge will see that the ENS feature changes the verdict only for a name the team made. `ideas/ens.md` itself scores the idea 6.7 to 6.9 and marks centrality "[~]".
- **Fact.** The combos file's own budget: core about 35, extras about 30, "almost no slack in a 75 to 80 hour budget". **Judgement:** that total leaves out the Anon-RPC routing above and the wallet wrapper's integration with a real wallet, so it is closer to 70 to 75 before testing.

**Centrality (Judgement).** EF CROPS: central (S is structural, in the signing path). Arkiv Mirror: central (the wallet's descriptor source and drift facts). Swarm: useful, cheap. ENS: weakest; a provenance badge.

**Hours (Judgement).** Dropping ENS saves about 12 hours and one video chapter, which pays for the CROPS P fix and gives back some testing time.

**Finalist (Judgement).** Three badges on one screen is the most diluted demo in the file. With ENS gone the story is two questions ("does it tell the truth", "is it current") and the switch-off moment, which is cleaner.

**Verdict: Trim: drop ENS "Best Use of ENSv2".** If the team wants a third pick after the trim, the combos file's Chainlink CRE swap (Descriptor Notary, about 8 hours, $1,500 single winner) is cheaper and fits the registry story; take it only if the Arkiv gate passes by Fri 01:00 IST.

### Combo 4. Brake: Hedera Tokenize + No Solidity + World Agent Pass

**Qualification check (Facts from [Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera) and [World prizes](https://ethglobal.com/events/mumbai/prizes/world); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| Tokenize: "Use ATS or Stablecoin Studio (SDK, contracts, web app, or a combination) to issue or manage a tokenized asset or stablecoin." | Met (ATS bond) |
| Tokenize: "Deploy and demo on Hedera testnet." | Met |
| Tokenize: "A public GitHub repo, with contracts verified on HashScan where applicable." | Met if any team-deployed ATS instance is verified; check whether the ATS factory deploy counts as "applicable" |
| Tokenize: "A demo video of 5 minutes or less that covers issuance, configuration, and at least one lifecycle operation" | Met (freeze, forced transfer, redemption) |
| No Solidity: "Use the Hedera JavaScript/TypeScript SDK or Python SDK, with no Solidity smart contracts." | **Conflict**: the brake's core action is a scheduled `ContractExecuteTransaction` into ATS Solidity contracts |
| No Solidity: "Use at least two native Hedera services"; README with setup and usage; video of 5 minutes or less | Met (KeyList accounts, Schedules, HCS, HTS, Mirror Node) |
| Agent Pass: the five qualifications listed under combo 2 | Met: the validator is the secure backend and checks `sub` |

**Missed conflicts and risks.**
- **Fact.** The No Solidity description reads "Build a complete app on Hedera without writing a single smart contract." and the qualification reads "with no Solidity smart contracts" ([Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)). **Judgement:** the combos file treats the conflict as only about whether calling ATS is allowed, and parks it as Hedera question 2. The deeper problem is presentation: the same README has a Tokenize section about ATS bond contracts and a No Solidity section claiming an app without contracts. Even if the workshop says calls into Hedera's contracts are fine, the No Solidity judges reward "what you can ship when the network does the heavy lifting", and the heavy lifting here is ATS. The Slowvault half (pure SDK) is what really fits No Solidity, and it is a second product (a treasury) in a bond-issuer demo.
- **Judgement.** Gate (b) (a scheduled `ContractExecute` keeps the brake account as `msg.sender`) failing kills the core; the pivot is "Slowvault plus World (No Solidity only)", a different product mid-hack. That pivot is the only reason to keep No Solidity in the plan, so keep it as the pivot, not as part of the main stack.
- **Judgement.** Team fit is the weakest of the eight: Hedera's account and key model, the ATS SDK and Scheduled Transactions are new to an EVM security team, and the team's Solidity and fuzzing strength is barely used. Expect the 0 to 4 hour gates to take 6.
- **Fact.** Agent Pass mocked proofs: "NOTE: Proofs are using fake identities, DO NOT rely in them for production" ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)). **Judgement:** the "wrong officer" path needs two distinct mocked identities with stable `sub` values; that is World question 2 in `ideas/world.md` and must be tested in the first four hours.

**Centrality (Judgement).** Tokenize: central. Agent Pass: central (no approval, no co-signature). No Solidity: only through Slowvault, which is a second story.

**Hours (Judgement).** Dropping No Solidity and Slowvault saves about 5 hours and the 1:20 video chapter. Core about 45 plus World 9 leaves room for the unfamiliar SDK.

**Finalist (Judgement).** "Steal all three officer keys and the trustee still stops it" is strong; Slowvault distracts from it.

**Verdict: Trim: drop Hedera "No Solidity Allowed".** Keep Tokenize plus Agent Pass. Re-enter No Solidity only if gate (b) fails and the team pivots to Slowvault.

### Combo 5. Residue: ENS Best Use of ENSv2 + Arkiv Mirror

**Qualification check (Facts from [ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens) and [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| ENS: "built on ENSv2 on Ethereum mainnet or Sepolia" | Met (`CleanHandover.sol` on Sepolia, walker on both) |
| ENS: "ENSv2 features should be central to the product, not a cosmetic add-on" | Met: the product is the ENSv2 control model |
| ENS: "Your demo must be functional and not just include hard-coded values" | Met: the judge picks the name |
| ENS: "a link to a live demo" and open-source code | Planned |
| Arkiv: "The data's license allows republishing. Link it in your README." | Open: public chain events carry no licence; Arkiv question 1 |
| Arkiv: "Not Sourcify data, from any chain." | Met |
| Arkiv: import script re-runnable; writes to current testnet and "a feature or query people use reads the data from Arkiv"; README wallets and query; the five `/arkiv/*.md` files; licence and AI note | Planned (importer from a block, reverse lookup) |

**Missed conflicts and risks.**
- **Fact.** "`safeTransferFrom` reverts with `TransferUnsafeUntilRegistryIsEmancipated` or `TransferUnsafeWithMultipleAssignees`; `unsafeTransfer` skips both" ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry), via `ideas/ens.md`). **Judgement:** the combos file's go or no-go test is "transfer it with `safeTransferFrom`, and show the old owner can still `register` under it". With a factory subregistry that is not emancipated, `safeTransferFrom` may simply revert, which would look like a gate failure when it is really ENSv2 guarding one case. Test three paths in hours 0 to 4: `safeTransferFrom` on an emancipated subregistry, `safeTransferFrom` with extra assignees, and `unsafeTransfer`. The residue that survives `safeTransferFrom` is the one to lead with; if only `unsafeTransfer` leaves residue, the pitch must say "for every sale that uses `unsafeTransfer`" and is weaker.
- **Judgement.** Arkiv "Reach" asks "How many people or projects already use or depend on this data?" ENSv2 role data is days old on mainnet, and the ENS Explorer's "see who controls it" view already exists (`ideas/ens.md`). Expect 2nd place ($1,000) at best for Arkiv, which the file already says.
- **Judgement.** The licence question is a real gate: if Arkiv says chain events do not satisfy "The data's license allows republishing", the 14 Arkiv hours are lost. Ask at 16:00 Thursday before writing the importer, and have the ENS-only plan ready.

**Centrality (Judgement).** ENS: central. Arkiv: central to the lens (reverse lookup), not to the escrow, which is the right split.

**Hours (Judgement).** Arkiv 14 plus core about 45. Fits.

**Finalist (Judgement).** Strong: a judge-chosen name and a revert on the money path. Arkiv takes 25 seconds near the end and does not dilute it.

**Verdict: Sound.** Fix the gate test before Thursday.

### Combo 6. Closebook on Gas Ledger: Whitechain Operate + Scale + EF Best CROPS App

**Qualification check (Facts from [Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain) and [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| Whitechain 1: "Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer" | Planned |
| Whitechain 2: "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count" | Feasible: the prize USDT implementation has `receiveWithAuthorization` and `permit` selectors (`ideas/whitechain.md`, selector probe only), and the WWBT/USDT pool held about 117,546 prize USDT on 31 Oct (`workshop_questions.md`, citing [pool balances](https://explorer.testnet.whitechain.io/api/v2/addresses/0x5645101Ca8d2F7BaBC27b10359555767a1BdF999/token-balances)) |
| Whitechain 3: README line on why the flow needs onchain stablecoin settlement | Planned |
| Whitechain 4: steady commit history; README with setup, architecture and current limitations | Planned |
| Whitechain 5: "A demo video of 2 to 4 minutes that shows each party involved" | Tight with five roles in 2:55 |
| Whitechain 6: "A WHITECHAIN_FEEDBACK.md in your repo" | Planned |
| Scale: "A payer flow with zero crypto steps visible"; gas, WBT source and drain bound explained; won't place "Flows where the payer still signs a transaction that costs them gas" | Met (typed data only) |
| CROPS 1 to 5 | Formally met; "the moment it matters" is the relayer kill |
| CROPS description: "Build an app, wallet feature or dev tool where one CROPS property is the reason it exists, without giving up the other three." | **Not met in spirit**: see below |

**Missed conflicts and risks.**
- **Fact.** The earlier simulated EF review of a Whitechain checkout plan concluded "No placement is the most likely outcome; 3rd at best. The CROPS story is bought with a single-sequencer L2, a freezable stablecoin and a relayer whose failover breaks the lead property." and noted "Forced inclusion with a custom gas token is claimed but untested" (`plans/reviews/judge_ef_access_layer.md`, Plan C). The prize USDT contains `addToBlockedList(address)` (`ideas/whitechain.md`). **Judgement:** the same three weaknesses apply to this combo. Censorship resistance is not why a merchant checkout exists, which is what the CROPS description asks for.
- **Judgement.** The combos file resolves the Whitechain versus EF tension with "two framings" (uptime for Whitechain, "works without us" for EF). Both judges read the same public README. One section saying "one reliable relayer, with failover" and another saying "relayers are replaceable, anyone can run one" will look like a pitch to each judge, and the Whitechain judge's stated preference ("our merchants want one reliable relayer, not a race", `ideas/whitechain.md`) is the one that pays more.
- **Judgement.** The combo merges three contracts from the Whitechain file, each written to be the `to` of `receiveWithAuthorization`: `CheckoutRouter.pay`, `GasRelay.relayPay` and `RelayRouter.relay`. EIP-3009's `receiveWithAuthorization` requires the caller to be the payee, so they must become one contract with one authorization format. That merge (about 3 to 4 hours, plus re-running the invariant suites) is not in the estimate.
- **Fact.** The pool's `observationCardinality` was 1 on 31 Oct, so "`observe()` over any past window reverts today" (`ideas/whitechain.md`). **Judgement:** a TWAP on a pool that mostly sees the team's own swaps guards little; keep the deviation band and say so in the limits.

**Centrality (Judgement).** Whitechain Operate and Scale: central and sharing one codebase. EF CROPS: cosmetic relative to the product's reason to exist.

**Hours (Judgement).** Whitechain core about 50 to 55 (router, receipts, refunds, webhooks, export verify, relay, gas vault, widget, demo shop, invariants). EF adds about 12 plus the merge. Dropping EF puts the build back to about 55 to 60 with time for the accountant export, which is the memorable beat.

**Finalist (Judgement).** Medium either way; the five-role video is the bigger dilution than the extra prize.

**Verdict: Trim: drop EF "Best CROPS App".** Enter Whitechain Operate and Scale only, with the relayer pitched as uptime. The third slot stays empty, as the file's own avoid list leaves no honest fit.

### Combo 7. Reserve Gate: 1inch Aqua + Chainlink CRE

**Qualification check (Facts from [1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch) and [Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| 1inch: the three qualifications and the tests-or-UI line, as combo 1 | Met on an Arbitrum fork |
| CRE: "used as an orchestration layer within your project" | Met if the CRE output is what the receiver holds; weaker if a keeper writes it |
| CRE: "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent" | Met in letter (LayerZero scan API), but see below |
| CRE: "Demonstrate a successful simulation (via the CRE CLI)"; "It is NOT mandatory to deploy it during the hackathon, simulation is enough!" | Met even on the fallback path |
| CRE: "Be meaningfully used in your project" | Met: coverage is the instruction's only input |

**Missed conflicts and risks.**
- **Judgement.** The demo replays an escrow release on an Ethereum fork, but the LayerZero scan API returns today's real mainnet state, not the fork's. So the external API cannot feed the coverage number in the replay; it is decoration, and the CRE judge reading the workflow will see that the number comes only from the two chains. Either use the API for a quantity the formula needs and that the fork cannot supply (for example in-flight messages not yet minted on the L2), or present the external input honestly as "LayerZero message status, used as a freshness check".
- **Judgement.** If `--broadcast` cannot reach the fork and a TypeScript keeper writes the value, CRE is "simulated alongside" rather than orchestrating. The file already says to state which path ran. Add one more thing: have the keeper post exactly the report bytes the simulation produced, with its hash in the README, so the CRE output is still the value the instruction reads.
- **Fact.** World and 1inch workshops clash at 17:30 ([event page](https://ethglobal.com/events/mumbai)); combo 7 needs only 1inch, and Chainlink has no workshop, so ask at the booth. No conflict.

**Centrality (Judgement).** 1inch: central. CRE: central as the only input, if the write path holds.

**Hours (Judgement).** About 10 for CRE, of which about 3 would be needed for a keeper anyway. Core about 50. Fits with slack.

**Finalist (Judgement).** Strong and fork-based, so safe live. The CRE chapter is 35 seconds and supports the story.

**Verdict: Sound.**

### Combo 8. Last Out: Definitive Flash + World Best Use of IDKit

**Qualification check (Facts from [Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive) and [World prizes](https://ethglobal.com/events/mumbai/prizes/world); status is Judgement).**

| Requirement (verbatim) | Status |
|---|---|
| Definitive: "A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP)." | Met (`limit` entries with attached brackets) |
| Definitive: "Onchain execution shown in the final demo." | Met (Base mainnet fills) |
| Definitive: "Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X." | Planned; posting must happen before judging, and the X post needs an account that can upload the cut |
| IDKit: the five qualifications listed under combo 2 | Met (ranked profile, Proof of Human, server verify, "already verified human") |

**Missed conflicts and risks.**
- **Fact.** "Flash accepts **EIP-1271 smart-wallet signatures** on all EVM chains"; the signed payload "does not encode a minimum output", and "limit price, TWAP schedule, or trigger price are held offchain by Flash's execution engine" ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md); [Non-custodial](https://flash.definitive.fi/docs/non-custodial.md), via `ideas/definitive.md`). **Judgement:** 1271 support is documented, which lowers the gate risk the combos file implies. But the lock can bind token and amount, not price, so a PATCH to move the leader's triggers must also be refused through 1271 (Definitive question 4).
- **Judgement.** The pitch "copy trading where the leader cannot dump on followers" is broader than the mechanism. The lock binds only the lock account. A leader can buy the token from a second, unranked wallet before posting the call and sell it into the followers' entries; IDKit stops a second *ranked profile*, not a second *trading wallet*. The sponsor file says rivals leave "what stops the leader buying first and selling into the followers?" unanswered, and this design does not answer it either. Narrow the claim to "the leader's ranked position cannot exit before yours" and say the side-wallet limit in the README, or Q and A will find it.
- **Judgement.** The demo trades WETH. No leader can dump WETH on followers, so the refusal looks staged. Use a thinner Base token that Flash routes, with small amounts, so the threat is real.

**Centrality (Judgement).** Definitive: central (brackets are the protection). IDKit: real, but it guards reputation reset, not the dump.

**Hours (Judgement).** About 7 for IDKit; core about 40 (onchain EIP-712 rebuild is the hard part). Fits with the most slack of the eight.

**Finalist (Judgement).** Good live moment ("dump refused"), but the side-wallet question is the obvious first Q and A question. Answer it in the first minute of the pitch.

**Verdict: Sound.** Fix the claim and the demo token; no prize to drop.

---

## 3. Checks on the combos file's own rule section (Judgement unless marked)

- **Fact check passed.** The cap, multi-track, EF one-prize, Arkiv one-pick, finalist, Classic, video and history rules in section 1 of the combos file match `00_current_tracks.md` word for word, and the 2026-10-31 re-fetch of the prizes page agrees on the EF and Arkiv lines ([prizes page](https://ethglobal.com/events/mumbai/prizes)).
- **Agreed.** EF uses one of the three partner picks; nothing on the pages exempts it.
- **Agreed.** One cut between 2:00 and 2:59 meets ETHGlobal (2 to 4 minutes), EF CROPS (3 minutes max), Whitechain (2 to 4 minutes) and Hedera (5 minutes or less). Definitive's X and Discord clip is a separate short cut.
- **Missed.** The Classic rule against prior designs, applied to the interface code in the sponsor files, given that the AI rule would require committing them (section 1.1 above).
- **Missed.** "Please ensure to select these prizes carefully as it is the only way for partners to assess your project." ([details page](https://ethglobal.com/events/mumbai/info/details)) For combos with several tracks inside one partner (2, 4, 6), check on the form that each track is selected, not only the partner; whether the form lists tracks separately was not verified here.

## 4. What changes in the workshop plan

Add these to `track_ideas/workshop_questions.md` for whichever combo is chosen (Judgement):

- ETHGlobal staff at registration: are idea notes with contract interface sketches written before Thursday 21:00 allowed under the Classic rule, given that the AI rule requires committing planning artifacts? (All combos)
- World, 17:30 Room 1: is "backend Agent Pass attestation plus a signature from an IDKit-enrolled key" an acceptable R4 pattern, and can mocked identities produce two distinct, stable `sub` values? (Combos 2, 4)
- ENS, 16:00 Room 1: which residue survives `safeTransferFrom` on an emancipated subregistry, and is `unsafeTransfer` expected in marketplace flows? (Combo 5)
- Hedera, 15:30 Room 2: only if gate (b) fails and the team pivots to Slowvault, ask whether No Solidity is still open. (Combo 4)

## 5. Gaps and caveats

- Only the main prizes page was re-fetched, and the fetch was cut before Chainlink; Chainlink and all sponsor-subpage text are from the 2026-10-31 snapshot in `00_current_tracks.md`.
- All hour figures and all verdicts are this reviewer's judgement, not measurements.
- Flash's 1271 behaviour, CCIP fast-finality lanes, CRE against forks, Arkiv's view of chain-data licences and multi-track wins are unverified and are sponsor questions.
- No Mumbai judges are named on the event page, so every "a judge will ask" line is inferred from the sponsor files and earlier simulated reviews.
