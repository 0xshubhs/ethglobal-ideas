# ETHGlobal Mumbai: workshop and booth question sheet

Team: 3 people (DeFi and smart contract security, strong Solidity, Foundry, fuzzing and auditing; TypeScript and React). Classic track, fresh build only, no existing project. Continuity-only tracks are ignored everywhere in this sheet, and no idea here depends on pre-existing project code (public libraries, SDKs and starter kits only).

Written 2026-10-31. Event: ETHGlobal Mumbai, Thu 5 Nov to Sat 7 Nov 2026, Jio World Convention Centre, alongside Devcon 8 India. Hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST.

## How this sheet was made

- No web page was fetched for this pass. Everything sourced comes from the team's notes, which fetched the ETHGlobal pages earlier today (2026-10-31) with no bot check shown: `track_ideas/00_current_tracks.md` (schedule, rules, verbatim prize text), the twelve sponsor files in `track_ideas/ideas/`, `track_ideas/00_season.md`, and the notes in `research_notes/EF tracks and Whitechain ideas/`. If a page has changed since this morning, this sheet will not show it.
- The sponsor question lists were merged and de-duplicated. A question stays only if its answer changes what the team builds or whether the entry qualifies. Questions dropped as nice-to-know are listed in the last section.
- **Sourced facts** carry a URL. Anything marked **Judgement** is our own reading. Every "if the answer is X, do Y" line is Judgement.
- Teammate labels: **A** = Solidity and DeFi lead, **B** = fuzzing and audit lead, **C** = TypeScript and React lead. Swap the names in as you like; the split is what matters.

---

## 1. Sourced facts this sheet relies on

**Schedule and rooms** ([event page](https://ethglobal.com/events/mumbai), copied in `00_current_tracks.md`), Thu 5 Nov, IST:

| Start | End | Workshop Room 1 | Workshop Room 2 |
|---|---|---|---|
| 13:00 | 22:00 | Registration open (Pavilion 2) | |
| 15:30 | 15:50 | 0G: "One API, All of AI: Building on 0G Private Computer" (Gathin T) | Hedera: "Hedera X Claude Code - AI Skills for Hackathon Builders" (Pathorn Teng) |
| 16:00 | 16:20 | ENS: "ENSv2 - Identity for Apps, Agents & Beyond" (Yash Goyal) | Arkiv: "Arkiv Workshop" (Santiago Trujillo Zuluaga; abstract "Details coming soon.") |
| 16:30 | 16:50 | Uniswap Foundation: "How to Navigate the Uniswap Stack" (Angela Ocando) | Whitechain: "Whitechain Workshop" (no speaker listed) |
| 17:00 | 17:20 (Room 1), 17:30 (Room 2) | Arc: "Build Apps Powered by Smart Contracts with Arc Studio" (Corey Cooper) | Ethereum Foundation: "Ethereum Foundation Workshop" (30 min, no speaker listed) |
| 17:30 | 18:00 | World: "World Workshop" (status "proposal", no speaker) | 1inch: "Reimagining the AMM with 1inch Aqua" (Tanner Moore) |
| 18:30 | | Dinner | |
| 20:00 | | Opening ceremony (Main Stage) | |
| 21:00 | | Hacking begins | |

No workshop is scheduled for Definitive or Chainlink ([event page](https://ethglobal.com/events/mumbai)). Several workshops are still "draft" or "proposal" in the schedule data, so times may move.

**Rules that shape every answer below** ([event page FAQ](https://ethglobal.com/events/mumbai); [details page](https://ethglobal.com/events/mumbai/info/details); [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation); [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)):

- At most 3 partner prizes; "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize."
- EF: "you will be placed in at most one" EF prize. Arkiv: "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it."
- The ETHGlobal Finalist Track "is separate and does not count as a Partner Prize". Finalists get 7 minutes (4 minute demo, 3 minute Q and A), judged on Technicality, Originality, Practicality, Usability and WOW Factor.
- Partner prizes: "partners will evaluate submissions based on the materials you provide"; booth presentations are optional. Partner Prize Judging runs Sat 7 Nov 09:30 to 12:30 at Partner Booths.
- Classic track: "all work on your project must begin after the hackathon officially starts. Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits."
- Video 2 to 4 minutes; EF CROPS "3 minutes max", 0G "under 3 mins", Hedera "5 minutes or less" (`00_current_tracks.md`). **Judgement:** cut every video to between 2:00 and 2:59.

**Open verification items carried over from the notes:**

- **Whitechain prize USDT supply.** Qualifying payments must use USDT `0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7`; "Payments in a test token you minted yourself won't count" ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain)). The token had 10 holders when probed ([Blockscout implementation](https://explorer.testnet.whitechain.io/api/v2/smart-contracts/0x26425662d126412128967ecf0a02ec48573026f7)). The docs' token-list USDT `0xaa79...8f46` is a different contract ([Whitechain token list](https://docs.whitechain.io/build/block-explorer/token-list)), so bridging probably gives the wrong token. A WWBT/USDT v3 pool held about 117,546 prize USDT on 31 Oct ([pool balances](https://explorer.testnet.whitechain.io/api/v2/addresses/0x5645101Ca8d2F7BaBC27b10359555767a1BdF999/token-balances)). The prize page does not say how hackers obtain the token.
- **Alt mempool devnet profile and staked gas budget.** The ERC-8421 draft sets MAX_VERIFY_GAS_PER_ENTITY 100,000 and MAX_VERIFY_GAS_STAKED_ENTITY 1,000,000 ([ERC-8421 draft](https://github.com/ethereum/ERCs/blob/493ba8ac3be97dc5cf6335eb97d2e8e9f95983c5/ERCS/erc-8421.md)). The workshop sidecar pins the older rules from `forshtat/ERCs` PR #6, which "predate ERC-8421 and are not equivalent" ([workshop README](https://github.com/forshtat/mempool-workshop)). On 26 Oct devnet1.altmempool.wtf returned empty responses, and the existing gateway reported minStake 0.01 ETH ([gateway](https://altmempoolgateway.forshtat.com/rpc)). SIGDATACOPY is unverified on chain 1337 and halts on chain 3151908 ([@forshtat/hegota-support](https://www.npmjs.com/package/@forshtat/hegota-support)). The EF page says "Multiple devnets will run during the hackathon with keyed nonces and recent roots live, plus a faucet. Pierre and Alex from the alt mempool team will be on site to help." ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation))
- **Colibri through Anon-RPC.** Colibri 3.0.2 documents a custom `fetch` "to route traffic through Tor" ([npm](https://www.npmjs.com/package/@corpus-core/colibri-stateless)), but no composition with the Anon-RPC worker has been seen working (`research_notes/EF tracks and Whitechain ideas/anon_rpc.md` Q5). This matters for Plan A and EF A-series ideas.
- **EF CROPS criteria still "(tbc: final review pending)"** on both CROPS prizes as of this morning ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)).
- **Arc placeholders still unfilled:** "[Add API docs link.]" and "[confirm reachable from Studio]" ([Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc)).
- **Arkiv Rabdi snapshot manifest** `https://testnet.snapshots.arkiv.network/rabdi/latest.json` returned 404 on 31 Oct (`ideas/arkiv.md` section 10).

---

## 2. The builds these questions decide between (Judgement)

The team has not picked a build. These are the front-runners from the sponsor files, each within the 3-partner cap and the one-EF-prize rule. The workshop answers below are what confirm or kill each one.

| # | Build | Partner picks | Answers that decide it |
|---|---|---|---|
| S1 | **Signing-safety stack:** EF C1 Truthsign (CROPS) + Arkiv M1 Clearsight (Mirror) + Chainlink CRE Descriptor Notary | EF, Arkiv, Chainlink (3) | EF CROPS rubric final and dev tools equal; Arkiv Mirror scope and quota; CRE simulation counts |
| S2 | **EF B1 RuleDiff** (fuzz the admission node against its own spec), with B2 paymaster checks folded in | EF (1) | Devnets live at 21:00, which rule set, whether local admissions count |
| S3 | **Uniswap Bidproof** (every live CCA checked; a bidder contract that refuses a rigged one) | Uniswap (1, +1 optional) | Analysis tools count as "build on"; disclosure path; demo chain |
| S4 | **World Upgrade Council** (Upgrade Pass + Distinct Quorum) | World, both tracks (1) | Mocked humans, both tracks for one project, R4 pattern, "agentic" bar |
| S5 | **1inch Greenshoe + Uniswap CCA** | 1inch, Uniswap (2) | Official contracts with appended opcodes; Safe as maker; stateful instructions; Uniswap centrality |
| S6 | **Chainlink K1** (Ledger Match detects, Pause Fast, Unpause Slow fans out) | Chainlink, both tracks (1) | Both Chainlink tracks for one project; FTF lanes on testnet |
| S7 | **Whitechain merchant stack** (Closebook on Gas Ledger, Clerk Key refunds) | Whitechain (1) | Prize USDT source; Operate plus Scale for one project |
| S8 | **ENS Residue** (buy an ENSv2 name and inherit nobody) | ENS (+ Arkiv Mirror) | Residue real and not already shown; analysis tools central; fork demo accepted |

Alternates if every front-runner fails a gate: Hedera "Brake" (Issuer Brake + Slowvault), Arc Preflight, 0G Robot That Pays For Its Brain, Definitive Last Out.

**Decision deadline (Judgement):** pick the build at dinner (18:30 to 19:30 Thu) from the answers collected, confirm at the booths before the 20:00 opening ceremony, start at 21:00.

---

## 3. Who goes where on Thursday (Judgement)

Two rooms run in parallel, so each slot needs at most two people; the third works the booths (Chainlink and Definitive have no workshop) and follows up with speakers. EF is the most decisive slot for this team (it holds S1 and S2), so it gets two people.

| Time (Thu 5 Nov IST) | Room 1 | Room 2 | Booths / floating |
|---|---|---|---|
| 13:00 to 15:30 | All register. A and B: ask booth questions early (Whitechain prize USDT, Chainlink, Definitive) | | |
| 15:30 to 15:50 | **C** at 0G | **B** at Hedera | **A**: Chainlink booth, then Definitive booth |
| 16:00 to 16:20 | **C** at ENS | **B** at Arkiv | **A**: World booth (mocked-human environment) and Whitechain booth if the USDT question is still open |
| 16:30 to 16:50 | **A** at Uniswap | **C** at Whitechain | **B**: Chainlink booth (CRE simulation, CCIP 2.0 testnet lanes) |
| 17:00 to 17:30 | **C** at Arc (to 17:20) | **A and B** at EF (to 17:30). B asks the alt mempool questions, A asks Anon-RPC and CROPS | |
| 17:30 to 18:00 | **C** at World (stays in Room 1) | **A** at 1inch (stays in Room 2) | **B**: Pierre and Alex (alt mempool team) for follow-ups |
| 18:00 to 18:30 | All: last booth follow-ups on whatever is still unanswered | | |
| 18:30 to 19:30 | Dinner: compare answers, pick the build | | |

If the team has already ruled out a sponsor before Thursday (for example Whitechain because the prize USDT has no source), the person freed from that slot goes to the booth of the leading build's sponsor instead.

Each attendee writes the answer and the speaker's name next to each question. A short, unclear or "we will check" answer counts as "no" for planning until confirmed in writing (Discord or Telegram), because partner judging reads only the repo, README and video.

---

## 4. Workshop slots: must-ask questions and what to do with each answer

All "if" lines are **Judgement**.

### 4.1 Thu 15:30 to 15:50, Workshop Room 1: 0G (attendee: C)

Context: low skill fit for this team; 0G is in play only through Robot That Pays For Its Brain (Physical AI + Agents That Pay, $7,000 of pools), Drill or Witness (`ideas/0g.md`).

1. **Can one project win in both Physical AI and Agents That Pay (or place in two 0G tracks)?**
   - Yes: Robot That Pays becomes the 0G candidate.
   - No: 0G is worth one track only. Drill (Build with 0G PC) is the candidate, and for this team 0G drops below every S1 to S8 build.
2. **For Agents That Pay, does a testnet Router balance funded through the testnet Payment Layer count as money in? Do payments from judges or other hackers count as outside revenue? Can the team's 0G credits be the seed balance without reading as a human refill?**
   - All yes: the testnet loop is enough.
   - Mainnet only, or credits count as a refill: drop Agents That Pay and with it Robot That Pays' second track.
3. **What qualifies for Physical AI: does a desktop companion with no motion (Witness) count, what counts as real hardware, and is a refuse-and-ask-a-human safe-stop treated as faking the decision?**
   - Witness counts: it is the candidate for the less contested real-hardware place.
   - Safe-stop counts as faking: Robot That Pays needs the model to choose its own degraded action, so redesign the ladder or drop it.
4. **Must Physical AI and Agents That Pay contracts be on 0G Chain, or may parts live elsewhere (for example ENSv2 on Sepolia)?**
   - 0G Chain only: no cross-sponsor stack with 0G; keep it 0G-only.
   - Other chains allowed: Hire Board + ENS is possible.
5. **Is `x_0g_trace.request_id` from the Router the evidence judges check, or the broker's `ZG-Res-Key`, and can a third party look one up publicly?**
   - Either way: put the right ID on screen and in the README.
   - Public lookup with TEE signature exists: Hire Board becomes viable.

### 4.2 Thu 15:30 to 15:50, Workshop Room 2: Hedera (attendee: B)

Context: Hedera's best builds for this team are "Brake" (Issuer Brake + Slowvault), Subscribe402 and Leash (`ideas/hedera.md`). A Hedera build stacks with no EF prize.

1. **Can one project place in two Hedera tracks at once (for example Tokenize and No Solidity, or x402 and No Solidity)?**
   - Yes: Brake (Tokenize + No Solidity) or Subscribe402 (x402 + No Solidity) as dual-track entries.
   - No: only Issuer Brake in Tokenize ($2,500 1st) is worth the build.
2. **Does calling Hedera-authored contracts the team did not write (ATS, Stablecoin Studio, HTS system contracts) through `ContractExecuteTransaction` break "with no Solidity smart contracts"?**
   - Allowed: Brake enters both tracks.
   - Not allowed: Slowvault must stay pure SDK, and Issuer Brake enters Tokenize only.
3. **Which facilitators count for R1 (the prize text says Official x402, Ax402, Blocky402; the docs say Official x402, Launa, Blocky402)? Does a self-run facilitator built from the open `transferExecutor` PR #4030 count fully?**
   - The self-run PR #4030 facilitator counts: Leash is possible, if PR #4030 settles on testnet by Fri 03:00.
   - Only listed facilitators count: build Subscribe402, with period 1 through a listed facilitator.
4. **Is the testnet schedule whitelist the code default (no TokenFreeze, Unfreeze or Wipe), and is `msg.sender` of a scheduled `ContractExecute` the schedule payer?**
   - The payer is the sender and the whitelist is the default: Issuer Brake's gate passes.
   - Otherwise: Issuer Brake needs redesign, and the Hedera candidate becomes Slowvault or Subscribe402.
5. **What is the private disclosure channel for bugs in ATS, Stablecoin Studio or x402, and may we run attack cases against the hosted testnet facilitators?**
   - No live attacks allowed: Strict402's attack range runs only against our own local facilitator.

### 4.3 Thu 16:00 to 16:20, Workshop Room 1: ENS (attendee: C)

Context: decides S8 (Residue) and Moving Day, and whether ENS is a credible extra slot for any other build (`ideas/ens.md`). ENS stacks only where a contract on Ethereum reads ENSv2 state.

1. **What is live where this week: on mainnet, are .eth registration, name upgrades through the Unlocked and Locked MigrationControllers, factory resolvers and UserRegistries, `linkToNode` and data records all live (the [deployments page](https://docs.ens.domains/learn/deployments) still says mainnet runs through ENSv1 "until the launch completes")? Is there any v1 to v2 upgrade path on Sepolia?**
   - Mainnet live, no Sepolia path: Moving Day and Residue run on a mainnet fork (see question 3).
   - Not live on mainnet: both drop to Sepolia-only flows, which weakens Moving Day.
2. **When someone upgrades in the ENS App, does it copy v1 resolver records into the new resolver and re-register unemancipated v1 subnames? What does an unmigrated v1 subname resolve to after its parent upgrades?**
   - The App copies records and subnames: drop Moving Day (it duplicates the App).
   - It does not: Moving Day becomes the ENS 1st-place favourite and rivals S8.
3. **Is a hosted page that runs a mainnet-fork simulation acceptable as the live demo and as "built on mainnet", or must every write happen on mainnet or Sepolia? Are mainnet and Sepolia builds judged equally?**
   - Fork accepted: Residue and Moving Day ship as fork demos with replay commands.
   - Real writes required: Residue's escrow must deploy on Sepolia or mainnet, and the budget needs a small mainnet transaction.
4. **After `safeTransferFrom` the seller can keep root roles on the subregistry and the resolver pointer. Is there an intended clean hand-over flow, and does the Explorer already show subregistry root holders and key-scoped resolver holders?**
   - Clean flow exists and the Explorer shows it: Residue shrinks to the escrow, so rank it below Moving Day.
   - Neither exists: Residue stands as S8.
5. **Does a project that inspects and enforces ENSv2 state on users' names count as built on ENSv2, or must the team's own registry or resolver be the core?**
   - Own core required: lead with Quarantine or Descriptor Desk, or drop ENS as a slot.
   - Also ask here, for the Arkiv B1 stack: is a verifier roster held in an ENSv2 Permissioned Registry, resolved live to filter Arkiv entities by `$creator`, "central to the product"?

### 4.4 Thu 16:00 to 16:20, Workshop Room 2: Arkiv (attendee: B)

Context: decides the Arkiv half of S1 (M1 Clearsight), the Node tooling pick N1 Grammarsmith and B1 Second Screen (`ideas/arkiv.md`).

1. **Do the ERC-7730 clear-signing registry and L2BEAT's `discovered.json` permissions count as "public data that Ethereum apps and developers rely on"? Does linking out to Arkiv's Sourcify mirror by address, copying no Sourcify fields, break "Not Sourcify data, from any chain"?**
   - ERC-7730 in scope: M1 Clearsight stays in S1.
   - Out of scope: swap in B1 Second Screen (Build track) or M2 Keyring Atlas.
   - Link-out not allowed: remove the Sourcify link from M1.
2. **How many cost units does creating one entity with N indexed attributes cost on Rabdi, what is the monthly quota per access key, are batched creates cheaper, and can mirror teams get a raised quota?**
   - Small quota: M1 only (small import).
   - Raised quota available: M2 and M4 also fit.
3. **Will Rabdi be wiped or replaced before judging ends, and when do judges look? What minimum lifetime should evidence entities have?**
   - Set every entity lifetime past the judging date.
   - Wipe planned: add a Swarm or GitHub snapshot of the evidence.
4. **For Node tooling: which writable node should we load-test (the Kurtosis devnet in `Arkiv-Network/arkiv` or a local network on the Rabdi engine), is there a metrics endpoint, and how do we report slow-query shapes and result mismatches privately?**
   - Writable local node exists: N1 Grammarsmith is feasible.
   - None exists: N1 drops.
   - Private channel named: use it, and show counts only in the demo.
5. **Can one submission select several Arkiv tracks and let judges place it, and is the Swarm bonus judged by Arkiv or by Swarm?**
   - One track only: frame the README for Mirror alone.
   - Swarm judged by Swarm: write the S4 section in Swarm's terms.

### 4.5 Thu 16:30 to 16:50, Workshop Room 1: Uniswap Foundation (attendee: A)

Context: largest single fresh pool ($10,000 over four places). Decides S3 (Bidproof), S5's second half, and HookBreak and Jarwatch (`ideas/uniswap.md`).

1. **Does a project that scans and guards CCAs it did not create, measures protocol-fee releases, or fuzzes hooks it did not write count as "build on or integrate" the stack, or must the team also deploy its own Uniswap contracts?**
   - Analysis counts: Bidproof is S3 as planned.
   - Own contracts expected: Bidproof's refusing bidder contract and a team-created CCA become the core of the demo; HookBreak ships its own hooked pools.
2. **If a scan or fuzz campaign flags a live auction or hook during the event, what reporting path does Uniswap want (UF security contact, hook author, bug bounty)? Is an entry that reports only counts and historical exploits complete, and may we name live auctions that fail a rule?**
   - Naming not allowed: Bidproof shows aggregate counts and a planted rigged auction.
   - "Counts only" is incomplete: lead with HookBreak's historical reproductions instead.
3. **Which chain should CCA and v4 demos use (Sepolia, Base Sepolia, Unichain Sepolia or mainnet forks)? Are fork-only demos with replay commands enough, or do judges want testnet or mainnet transaction hashes?**
   - Fork enough: build on a mainnet fork, where real auctions exist.
   - Hashes required: pick the chain where a CCA factory is deployed and plan real transactions on Friday.
4. **Does a missing FEEDBACK.md or feedback form make an entry ineligible or only delay it, and what does "audited" involve?**
   - Either way: write FEEDBACK.md and fill the form.
   - "Audited" means a code review: keep a clean, buildable repo history.
5. **For v2.1.0, can a bid be exited before graduation (the technical doc says no; the `exitBid` section says when outbid or at auction end)? Are step schedules and the position recipient readable on chain?**
   - The answer fixes Bidproof's rule set.
   - Recipient not readable on chain: drop the "who receives the LP" rule.

### 4.6 Thu 16:30 to 16:50, Workshop Room 2: Whitechain (attendee: C)

Context: decides S7 and every Whitechain idea (`ideas/whitechain.md`). Whitechain stacks with no EF alt mempool, Uniswap (no Labs deployment), Arc, Hedera, 0G or 1inch build.

1. **Is there an official way to get prize USDT `0xcedf...55a7` (drip, faucet, booth top-up)? If not, does buying it on the WWBT/USDT v3 pool `0x5645...F999` count as a valid source for the qualifying payment, who operates those pools, and will they stay liquid through Saturday?**
   - Official source: S7 is viable.
   - Pool buy accepted: buy enough prize USDT on Thursday night before others drain the pool, and pre-fund the demo payer wallets.
   - Neither: drop Whitechain entirely and move the person to S1 to S6.
2. **Can one project place in both Operate and Scale, and how is the primary track declared (README, submission form or both)?**
   - Yes: build the merchant stack (Closebook on Gas Ledger), Operate primary.
   - No: Gas Ledger alone in Scale, or Assignee Pays alone in Tokenize.
3. **Do the prize USDT's `receiveWithAuthorization(..., bytes signature)` and `permit(..., bytes)` verify EIP-1271 signatures from contracts, and will mainnet USDT on 1875 behave the same?**
   - Yes: Face Pay (passkey smart account, no bundler) is the payer.
   - No: drop Face Pay; use EOA EIP-3009 signatures through Gas Ledger.
4. **For Scale, is a pre-funded payer balance acceptable in the demo, is a passkey prompt fine, and what onboarding path counts as "zero crypto steps"?**
   - Pre-funding and passkeys OK: the S7 demo stands as designed.
   - Not OK: an onboarding flow must be built, which costs about a day, so rank S7 lower.
5. **Does a customer's plain USDT transfer into a per-order deposit address, swept by a forwarder contract with an order state machine and refunds, fall under "A pay button that sends a plain transfer" (Won't place)?**
   - Yes: drop Deposit Desk.
   - No: Deposit Desk joins the merchant stack.

### 4.7 Thu 17:00 to 17:20, Workshop Room 1: Arc (attendee: C)

Context: every Arc prize "requires using Arc Studio as the starting point" ([Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc)). Arc stacks with no EF, Whitechain, Hedera or Uniswap build, so Arc is a separate build or nothing (`ideas/arc.md`).

1. **What proves "Built in Arc Studio": is creating the project in the Studio workbench, then driving it with the Arc Studio CLI from Claude Code (our own Solidity round-tripped through `--file`, compiled, tested and deployed by Studio) acceptable? Must the video show the chat, the deployments list, the preview, or all three?**
   - CLI round-trip accepted: Arc stays an alternate.
   - Contracts must be written in Studio chat: drop Arc, since the team's Foundry and fuzzing workflow is the edge.
2. **Studio deploys to Arc testnet only. For Bridge Kit, is deploying the Base Sepolia or Ethereum Sepolia side with Foundry outside Studio acceptable, or does it cost points?**
   - Acceptable: Preflight (Track D) is the Arc pick.
   - Costs points: switch to Net (Track A), which is Arc-only.
3. **Which CCTPx non-USDC routes are live today between Arc testnet and Base Sepolia or Ethereum Sepolia, and can Bridge Kit move a custom token we register this week by bytes32 token id without an API key or Circle approval?**
   - Custom tokens work self-serve: Preflight is viable.
   - Approval needed or no live routes: drop Preflight, use Net.
4. **Does a developer tool (web launcher plus CLI) count as "a working frontend and backend", and are developer tools weighed equally with applications?**
   - No: Net or Final Offer instead of Preflight.
5. **Is there any Arc mainnet deployment condition at Mumbai, as at ETHOnline 2026? With one winner per track, is a project considered for a second Arc track it fits?**
   - Mainnet condition: budget a mainnet deploy on Friday night.
   - Second track possible: prefer Net (also reads as Track C treasury).

### 4.8 Thu 17:00 to 17:30, Workshop Room 2: Ethereum Foundation (attendees: A and B)

Context: the most decisive slot. It decides S1 (CROPS) and S2 (alt mempool), plus Plans A to E. B asks questions 1 and 2 (alt mempool); A asks 3 to 5 (CROPS and Anon-RPC). Follow up with Pierre and Alex on site.

1. **(B) Which of devnets 1, 2 and 3 are up from 21:00 Thursday, which `hegota-support` profile matches each, which rule set runs (sidecar PR #6 or the ERC-8421 draft), and does any enforce per-entity budgets (BUDGET-010, staked 1,000,000) instead of the flat 100,000 prefix cap applied before stake? What are minimum stake, unstake delay and the faucet URL and amount?**
   - Devnets up with a known profile: S2 RuleDiff fuzzes the live node, using that profile's encoders.
   - Not up at 21:00: S2 runs on a local ethrex plus sidecar stack (see question 2).
   - Flat 100k cap and no staked budgets: drop any build that needs more than 100k verify gas (PQ wallets, heavy paymasters), and log the gap as a RuleDiff finding.
2. **(B) Is fuzzing and exploit traffic against our own contracts welcome on the shared devnets, and at what rate? Does an admission on a local ethrex plus sidecar stack count, or must the qualifying transaction be on the public explorer? Will you review a sidecar PR during the event, and does a mergeable PR count toward "usefulness"?**
   - Local counts and a PR counts: S2 is the top EF pick.
   - Must be public with a low rate: run the campaign locally, and replay only the minimised divergences on the devnet.
   - Fuzzing traffic unwelcome on devnets: S2 is local only, and its PR becomes the deliverable.
3. **(A) Is the CROPS rubric marked "(tbc: final review pending)" now final, and has any of the five qualifications changed? Do a library a wallet calls before rendering (Truthsign), a CI gate and a test tool compete equally with end-user apps, and does running inside the signing path count as structural?**
   - Final and libraries equal: S1 stands, with Truthsign as a library plus a small demo wallet.
   - End-user apps favoured: ship Truthsign as a browser extension or wallet fork that refuses to sign.
   - Rubric changed: rewrite the README CROPS section before Friday.
4. **(A) Would you judge a timelocked worker specifier plus a host pin policy (Slowlane), or a Node host running the official browser harness in headless Chromium behind `localhost:8545` (Blindfork), as harness work for Best Use of Anon-RPC, or move it to CROPS? Has anyone run Colibri with its `fetch` routed through the worker?**
   - Anon-RPC: A1 Slowlane is a third EF option alongside S1 and S2.
   - Moved to CROPS: it competes with Truthsign for the one EF placement, so build only one.
   - Colibri plus worker known to work: Plan A's verification layer is low risk; unknown means test it in hour 1.
5. **(A) For traffic share, do writes count or reads only? If the user's wallet broadcasts through its own RPC, is a stated trade-off enough? Should we name a preferred EF prize in the README, and does that limit where you place us?**
   - Writes must go through Anon-RPC: route broadcasts through the worker in any A-series build and in C2 Walkaway.
   - Naming is welcome: name CROPS for S1 and the alt mempool for S2.

Ask Pierre and Alex afterwards (B, 17:30): whether FRAMEPARAM (status 0x05), FRAMEDATALOAD, TXPARAM and the state-writing `pre_verify` frame are verified on the event devnets (B2 Paymaster Gauntlet), the keyed-nonce limits per (sender, key) (B3 Lanes), and whether Uniswap v4, Permit2, USDT and USDC are deployed on devnets 1 to 3 (B5 Swapgas).

### 4.9 Thu 17:30 to 18:00, Workshop Room 1: World (attendee: C)

Context: decides S4 (Upgrade Council) and World as a second slot for Definitive Last Out or Called It (`ideas/world.md`). World does not mix with EF Anon-RPC or alt mempool stories.

1. **Is `https://auth.world.org` itself the mocked-proof environment for Mumbai, or is there an event issuer like Tokyo's `sandbox.auth.world.org`? How do teams register a client, is approval needed, how many distinct mocked humans can one team use, and do mocked identities return `acr` values and honour an essential `claims` request (including `claims.id_token.sub` in the RFC 8628 device flow)?**
   - Self-serve client, at least two mocked humans, `sub` requests honoured: S4 is buildable on Thursday night.
   - One mocked human only: the wrong-human denied path cannot be shown live, so S4 loses its key beat. Fall back to Breakglass, whose denial does not need a second human.
2. **Can one project place in both Agent Pass and Best Use of IDKit, and will IDKit judges see an IDKit enrollment inside an Agent Pass product (Upgrade Council) as central or as an add-on?**
   - Both, and central: build Upgrade Council.
   - One World prize only, or "add-on": build Upgrade Pass alone (Agent Pass, $5,000 pool), or Distinct Quorum as a separate IDKit entry.
3. **Do simulator or staging IDKit proofs verify against the staging WorldIDVerifier `0x703a6316c975DEabF30b637c155edD53e24657DB`, and is that on World Chain mainnet or Sepolia? Does onchain `verify` enforce anything beyond the proof?**
   - Verifies on a reachable testnet: Distinct Quorum verifies onchain.
   - Not verifiable: use backend verification plus an EIP-712 approval (question 4).
4. **For R4, is "the backend validates the ID token and signs a one-time EIP-712 approval that the contract verifies" the expected pattern for onchain actions? What counts as agentic: is a coding agent running `forge script`, or a rule-plus-LLM watcher, enough?**
   - Pattern accepted: build it as designed.
   - The coding agent is not agentic enough: lead with Breakglass (the watcher agent acts alone in the safe direction).
5. **Does the simulator support Selfie Check and return a `sybil_score`? Would judges accept Proof of Human as the minimum for a treasury seat?**
   - Proof of Human accepted: Distinct Quorum keeps Proof of Human.
   - Selfie Check with a score is preferred and works in the simulator: Rescue Gas becomes a live IDKit alternate.

### 4.10 Thu 17:30 to 18:00, Workshop Room 2: 1inch (attendee: A)

Context: decides S5 (Greenshoe + Uniswap) and the Aqua alternates Reserve Gate and Replica (`ideas/1inch.md`). No official Aqua on Whitechain.

1. **Does a redeployed `AquaSwapVMRouter` with our instructions appended in `0xd0..0xef`, pointed at the official Aqua, satisfy "Official Aqua/SwapVM contracts must be used"? Does one `Extruction` on the deployed router score as well as custom opcodes under "scored higher"?**
   - Redeployed router accepted: custom opcodes as planned.
   - Not accepted, but Extruction scores equally: build on the deployed router with one Extruction.
   - Neither: drop 1inch, and Greenshoe's value falls to Uniswap only.
2. **Which swap-vm release tag and `AquaOpcodes` table match the deployed router `0x111111338c5091e8440b67b168bae16a668ac0de` (a 28-opcode build was seen), and is `0xd0..0xef` safe to use?**
   - The answer fixes the opcode table the team builds against.
   - Range unsafe: use whatever range 1inch allocates.
3. **Does a Safe, an ERC-4626 vault or a treasury contract count as the maker of a "position", or must it be an end-user wallet?**
   - Contracts OK: Greenshoe holds its stabilisation book in the issuer's Safe.
   - End-user wallet only: switch S5 to Replica (a covered call from the user's own wallet).
4. **Are instructions that write storage in swaps (pinned anchors, budgets, supply snapshots) acceptable, must they pass `CoreInvariants`, and is reading another protocol's getter (CCA `clearingPrice`, a Chainlink feed) inside an instruction preferred over an Extruction?**
   - Allowed: Greenshoe and Reserve Gate stand.
   - Stateless only: Replica leads.
5. **Is a video of fork transactions with hashes and a one-command replay enough for "Onchain execution of token transfers should be presented during the final demo", or do judges want a booth demo on Sat 09:30 to 12:30 or a small mainnet transaction?**
   - Video enough: fork demo.
   - Booth demo wanted: plan the Saturday booth slot.
   - Mainnet wanted: budget a small mainnet transaction on Base.

### 4.11 No workshop: Chainlink (booth; attendee A at 15:30, B at 16:30)

Context: decides S6 and the CRE third of S1 (`ideas/chainlink.md`). Ask at the booth on Thursday before 21:00.

1. **Can one project win both "Best workflow with CRE" and a CCIP 2.0 place, or is it placed in one?**
   - Both: S6 (K1) is one repo for two tracks.
   - One only: K1 still stands for CCIP, or use Sealed PoC Bounty for CRE.
2. **Is `cre workflow simulate --broadcast` with tx hashes through the real Sepolia forwarder enough? Can it broadcast to Base Sepolia or Arc testnet? Which CLI and TS SDK versions should we pin?**
   - Simulation enough: the CRE third of S1 (Descriptor Notary) and K1's Ledger Match are cheap.
   - Live deployment expected: ask for deploy access, or drop the CRE slot from S1.
3. **Which testnet lanes accept a block-depth `requestedFinalityConfig` for data-only messages today, does the default executor pick them up, and what latency should we expect? Is per-sender `allowedFinalityConfig` the intended pattern?**
   - Live lane: Pause Fast, Unpause Slow runs on public testnet.
   - None: run it on Chainlink Local, or pick Receiver Lab instead.
4. **Is a team-built stand-in enterprise system (an exchange withdrawal-ticket API) acceptable as R2's external system?**
   - No: Ledger Match needs a third-party API, so use Sealed PoC Bounty for CRE.
5. **Any concern with a planted vulnerable vault and a working PoC in a public repo that targets only the team's own contracts?**
   - Concern: keep the PoC in a separate, clearly labelled test-only directory, or use Veto Window instead.

### 4.12 No workshop: Definitive (booth; attendee A at 15:30)

Context: only via Last Out or Called It, optionally with World IDKit (`ideas/definitive.md`).

1. **Will Flash accept an EIP-1271 smart-account funder whose `isValidSignature` approves a pre-stored digest and ignores the signature bytes? Is the check run at submit only, or again at settlement for each TWAP slice and for an attached bracket's pair signature?**
   - Yes, and re-checked at settlement: Last Out is buildable.
   - No: pivot to Called It.
2. **Does a `limit` with an `attachedBracket` qualify as an advanced order? Do standalone `bracket` and `trailing-stop` count, and is TWAP the intended DCA?**
   - The answer decides which order types the demo uses.
3. **Does a marketable limit that fills at once satisfy "Onchain execution shown in the final demo", or must a trigger fire? Is a recorded and cut 5 minute TWAP acceptable in the video?**
   - A trigger must fire: plan a resting order near the market on Base, and record it early.
4. **May one integrator key place orders for many end-user funders in copy trading, and can hackathon keys get more than 5 requests per second per endpoint?**
   - No: Last Out caps followers in the demo, or drops.
5. **Is a Telegram mini app or a Farcaster product acceptable as the "social app", given the video must be on X? Will a Definitive engineer be reachable overnight on 5 to 6 Nov?**
   - No overnight support: treat Definitive as high risk.

---

## 5. Ask before the event (answers decide the build before Thursday)

Channels marked "sourced" come from sponsor pages or docs. "ETHGlobal Discord <sponsor> channel" is where the sponsor files say to ask; the exact channel names are not verified (**Judgement**). Ask today or tomorrow (1 to 2 Nov) so the answers are in before the team commits on Thursday. Classic track rules forbid project code before 21:00 Thu, so these are questions and public-data checks only.

| # | Question | Channel | Decides |
|---|---|---|---|
| 1 | How do hackers get prize USDT `0xcedf...55a7` on Whitechain Sepolia (drip, faucet, booth top-up), and is buying it on the WWBT/USDT v3 pool `0x5645...F999` a valid source? Can one project place in both Operate and Scale? | Whitechain Telegram dev chat https://t.me/Whitechaindevs and Discord https://discord.gg/7GwAXYmaW9 (sourced, [Whitechain Builders](https://whitechain.io/builders)) | Whether S7 exists |
| 2 | Which alt mempool devnets will be up at 21:00 Thu, which `hegota-support` profile and rule set (PR #6 or ERC-8421) each runs, and is fuzzing traffic against our own contracts welcome there? | ETHGlobal Discord EF channel; also an issue on https://github.com/forshtat/mempool-workshop (repo sourced, using it for questions is Judgement) | S2 RuleDiff baseline |
| 3 | Is the CROPS rubric "(tbc: final review pending)" final, and do libraries and dev tools compete equally with end-user apps? | ETHGlobal Discord EF channel | S1 |
| 4 | Does a redeployed `AquaSwapVMRouter` with appended opcodes count as "Official Aqua/SwapVM contracts", and may a Safe be a maker? | ETHGlobal Discord 1inch channel | S5 and every Aqua idea |
| 5 | Is the Arc Studio CLI driven from Claude Code with `--file` acceptable proof of "Built in Arc Studio"? | ETHGlobal Discord Arc channel | Whether Arc is in the pool at all |
| 6 | Mumbai World environment: event issuer, client registration, number of mocked humans; can one project place in both World tracks? | ETHGlobal Discord World channel | S4 |
| 7 | Does an analysis or fuzz tool on CCAs and hooks the team did not deploy count as "build on or integrate", and what is the disclosure path for live findings? | ETHGlobal Discord Uniswap channel | S3, S5 |
| 8 | Does the ENS App upgrade copy v1 records and subnames, and which ENSv2 features are live on mainnet versus Sepolia this week? | ETHGlobal Discord ENS channel | S8 versus Moving Day |
| 9 | Is the ERC-7730 registry in scope for Mirror; what are the per-entity cost units and quota; is a Rabdi snapshot published (the manifest returned 404 on 31 Oct)? | Arkiv Discord https://discord.gg/arkiv (sourced, [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)) | Arkiv third of S1 |
| 10 | Can one project win both CRE and CCIP 2.0, and is `cre workflow simulate --broadcast` enough evidence? | ETHGlobal Discord Chainlink channel | S6, CRE third of S1 |
| 11 | Can one project place in two Hedera tracks, and does calling Hedera-authored contracts break "No Solidity"? | Hedera Discord https://hedera.com/discord (sourced, [Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)) | Hedera alternate |
| 12 | Can one project win both Physical AI and Agents That Pay? | ETHGlobal Discord 0G channel | 0G alternate |
| 13 | Will Flash accept an EIP-1271 funder that ignores signature bytes, checked again at settlement? | ETHGlobal Discord Definitive channel; X @DefinitiveFi (the handle the prize text names, [Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive)) | Definitive alternate |

Public-data checks the team can do before Thursday without writing project code (**Judgement**): re-probe `devnet1.altmempool.wtf` and `gateway1.altmempool.wtf/rpc`; re-check the prize USDT holder count and the pool balance on the Whitechain explorer; read the deployed AquaSwapVMRouter's verified source on Basescan to find the swap-vm tag; re-fetch the EF and Arc prize pages on Wednesday 4 Nov for the "tbc" and placeholder text (slowly; fall back to `00_current_tracks.md` if a bot check appears).

---

## 6. Friday booth plan (Judgement)

When: Fri 6 Nov, after brunch (10:00 to 11:00) and once a vertical slice works; aim for 14:00 to 17:00, before dinner at 18:00. One person (C, who owns the frontend) does the demos while A and B keep building. Each demo is 60 seconds: one sentence of problem, the refusal or key moment live, one number. Then ask the two feedback questions below and write the answers down the same hour. Booth hours are not published in the notes, so check them on Thursday.

Show only to the sponsors the build will select (at most 3), plus the EF in every case, since most of the team's options touch an EF prize.

| Sponsor | Show it if the build is | 60 second demo shows | Feedback to ask |
|---|---|---|---|
| EF (Pierre and Alex for alt mempool; Access Layer team for CROPS and Anon-RPC) | S1, S2, or any Plan A to E | S1: Truthsign refusing a descriptor whose effect differs from the screen. S2: a minimised divergence between the sidecar and the spec | Which EF prize would you place this in? Which CROPS letter reads as cosmetic, and what would make it structural? (S2: is this divergence a real bug, and would you merge the PR?) |
| Arkiv | S1 (M1), S8 with Arkiv | The registry queried live from Arkiv with our server off; two writer wallets | Does this meet each of the four 25% criteria? Is the Reach evidence enough? Do the `/arkiv/*.md` files say what you need? |
| Chainlink | S1 (CRE third), S6 | S6: a mismatch detected and the pause crossing chains before finality, while the unpause waits | Is CRE "meaningfully used" here, or is it a side cron? For CCIP 2.0, which 2.0 feature would you expect us to show next? |
| Uniswap Foundation | S3, S5 | Bidproof: the population scan number, then the bidder contract refusing a rigged auction | Is this central to the Uniswap stack or an outside tool? What should FEEDBACK.md cover? |
| 1inch | S5 | Greenshoe's book buying under the clearing price from the Safe, with the swap on the official Aqua | Does this placement of the instructions meet "official contracts"? Is the onchain execution we show enough for the final demo rule? |
| World | S4 | An agent's upgrade blocked until a named engineer approves; the wrong human denied | Does the denied path meet R2? Is the debrief file in the right place and format? |
| Whitechain | S7 | A gasless checkout paid in prize USDT; a drain script stopping at the printed bound | Does this avoid "Won't place"? What is missing from WHITECHAIN_FEEDBACK.md? |
| ENS | S8 | Buying a name through the escrow, which refuses while the seller still holds a root role | Is ENSv2 central here? Do judges need it on Sepolia or mainnet, not a fork? |

Also ask one finalist-style passer-by (another hacker or a mentor) for the 4 minute version: "What did you remember after 60 seconds?" If the answer is not the refusal, re-cut the demo.

Saturday: partner judging at booths runs 09:30 to 12:30 and is optional ([details page](https://ethglobal.com/events/mumbai/info/details)). **Judgement:** attend only the booths of the sponsors selected, and only if Friday's feedback raised a point the README cannot settle.

---

## 7. Questions dropped as not decisive (Judgement)

These were merged away or dropped because no answer changes the build or qualification. Ask them only if time allows.

- World: JWKS rotation and ID token lifetime; the debrief's scoring weight; whether Identity Check is enabled; the display string or RFC 9396 authorization details (show the action on our own page before the redirect either way).
- 1inch: who is on the panel and how 3rd beats 2nd; AGPL licensing of a solstat port (only matters for Replica; keep the repo AGPL if used); testnet Aqua deployments (none known; build on forks).
- 0G: SDK version pins, comfy demo etiquette, consumer definition for Daily Bug and Delegate Desk, trust-tier weighting, credit amounts (ask at the booth only if 0G is chosen).
- Uniswap: Developer Platform credits, `uniroute-public` licence, World ID in `hookData`, TJAR addresses (only for Jarwatch, which is not a front-runner), whether unmerged PRs count.
- Arc: Discovery API docs link, Gateway `depositFor`, Forwarder reachability, ERC-8183 hooks, StableFX, blocklist testing, Earn Kit, cirBTC amounts (each decides only one non-front-runner idea).
- Hedera: endpoint discovery in R2, PR #1133, ATS v8 addresses, faucet limits, README rubric, HCS audit credit, identity standard, Agent Accounts testnet (ask only if Hedera becomes the build).
- Arkiv: SDK version (pin 1.0.0 unless told otherwise), query features, licences, who judges.
- Whitechain: EIP-1271 on mainnet USDT, "20 lines", Optimism on the panel, Safe on Sepolia, embedded wallet providers (none support 1874 today, so plan for none).
- EF: OHTTP worker, tor-js gateway capacity and `isolationKey`, mainnet-fork sweeps with our own RPC key, EIP-7906 assertions on devnets.
- ENS: per-agent resolvers, frozen permission sets, canonical implementation addresses, indexing, Sepolia faucet, SDK paths (all for non-front-runner ideas or decidable by reading docs).
- Chainlink: custom CCV aggregator setup, HTTP limits, roles held by workflows, Confidential HTTP credit, faucets, Hoodi versus Sepolia, sequencer feeds.
- Definitive: fee caps, `PATCH` typed data, execution ordering, minimum sizes, Arc quotes (ask only if Last Out is chosen).
