# ETHGlobal Mumbai 2026: multi-sponsor prize stacks for one fresh build

Event: ETHGlobal Mumbai, Thu 5 Nov to Sat 7 Nov 2026, Jio World Convention Centre, alongside Devcon 8 India. Hacking runs Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST. Written 2026-10-31.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), comfortable in TypeScript and React. Classic track, fresh build only. Continuity-only tracks are ignored everywhere in this file, and no combo depends on code that existed before Thursday 21:00.

## How this file was made

- Inputs: `track_ideas/00_current_tracks.md` (verbatim prize, schedule and rule text fetched 2026-10-31 from [the prizes page](https://ethglobal.com/events/mumbai/prizes), the twelve sponsor subpages, [the event page](https://ethglobal.com/events/mumbai) and [the details page](https://ethglobal.com/events/mumbai/info/details)) and the twelve vetted sponsor files in `track_ideas/ideas/`, including each file's own combo pass and question list. Plans A to E and their reviews in `plans/` were read for the finalist angle.
- ETHGlobal pages were **not** re-fetched for this pass. Everything quoted below is the 2026-10-31 snapshot in `00_current_tracks.md`; links point to the live pages it came from. Recheck amounts and wording at the workshops on Thursday.
- **Fact** lines carry a URL (or name the sponsor file that carries the URL). Lines marked **Judgement** are our own reading.
- "Person-hours" means hours of one teammate's work. **Judgement:** three people over a 36 hour window, minus sleep, gives about 75 to 80 person-hours of build time, plus 6 to 8 for README, feedback files and video. Every hour estimate below is measured against that budget.

---

## 1. Rules that shape every combo (Facts)

All verbatim from [the event FAQ](https://ethglobal.com/events/mumbai), [the details page](https://ethglobal.com/events/mumbai/info/details), [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation) and [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv), via `00_current_tracks.md`.

- Cap: "You can apply for a maximum of **3** Partner Prizes for your project." For each partner "you'll need to explain how you've used or integrated their tools, provide feedback, and share some comments."
- Several tracks, one slot: "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize."
- EF: "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best."
- Arkiv: "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it." and "Arkiv's prizes count as one partner prize on ETHGlobal".
- Finalist: "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize." Session: "Each team has 7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A with the judges." Criteria: Technicality, Originality, Practicality, Usability (UI/UX/DX), WOW Factor.
- Partner judging: "partners will evaluate submissions based on the materials you provide." Booth visits are optional and "not required for judging".
- Classic track: "all work on your project must begin after the hackathon officially starts. Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits."
- Video: "Must be between 2 and 4 minutes"; "DO NOT use a text to speech synthesizer / AI Voiceover".
- History: "Submissions with large single commits or missing histories may be disqualified." AI: attribution required, and with a spec-driven workflow "you must include all spec files, prompts, and planning artifacts in your submission repository."

Per-sponsor video caps (sponsor pages via `00_current_tracks.md`): EF CROPS "3 minutes max"; 0G "under 3 mins"; Whitechain "2 to 4 minutes"; Hedera "5 minutes or less". Definitive also wants "a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X." ([Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive))

**Judgement, applied below:**
- EF is a sponsor on the prizes page and nothing exempts it from the cap, so an EF entry uses one of the three partner picks. "Up to 3 partner prizes plus at most one EF prize" therefore means three picks in total, at most one of which is EF.
- Whether one project can *win* two tracks of the same partner (World, Hedera, 0G, Chainlink, Whitechain) is not stated anywhere. Each sponsor file lists it as a workshop question. Count the second track as upside, never as the plan.
- One cut of the video between 2:00 and 2:59 satisfies every combination in this file, including CROPS and 0G.

---

## 2. How the eight combos were chosen (Judgement)

A combo makes this list only if all four hold:

1. **One promise.** Every prize entered is a part of the same falsifiable sentence, not a second product in the same repo. The sponsor files flag "two stories in four minutes" as the commonest way to lose both prizes (Bidproof plus Humancap, Residue plus Moving Day, Breakglass plus Upgrade Pass as separate builds).
2. **Every rule met on one chain plan.** No prize's settlement, chain or tooling rule fights another's. Where they touch, the resolution is stated.
3. **Each extra prize costs less than it adds.** Extra person-hours are weighed against the prize's pool, its number of places and the sponsor file's score for the idea.
4. **The finalist story survives.** The combined demo still has one moment a generalist judge will repeat.

Ranking weighs expected partner money (pool size and number of places, discounted by our fit score), finalist odds, team fit and risk at the go or no-go gates. These are estimates, not sourced figures.

## 3. The eight combos at a glance

| # | Combo | Partner picks (max 3) | Tracks reachable | Sum of 1st places | Extra person-hours | Finalist fit (Judgement) |
|---|---|---|---|---|---|---|
| 1 | Greenshoe | 1inch, Uniswap Foundation | Aqua; Build with Uniswap | $6,500 | about 5 | Good |
| 2 | Pause Fast, Unpause Only By A Person | Chainlink, World | CRE + CCIP 2.0; Agent Pass + IDKit | $7,000 | about 18 | Strong |
| 3 | Truthsign Desk | EF, Arkiv, ENS | CROPS; Mirror + Swarm bonus; ENSv2 | $8,500 | about 30 | Good (the best EF finalist case) |
| 4 | Brake | Hedera, World | Tokenize + No Solidity; Agent Pass | $6,000 | about 14 | Strong |
| 5 | Residue | ENS, Arkiv | ENSv2; Mirror | $6,000 | about 14 | Strong |
| 6 | Closebook on Gas Ledger | Whitechain, EF | Operate + Scale; CROPS | $6,500 | about 12 | Medium |
| 7 | Reserve Gate | 1inch, Chainlink | Aqua; CRE | $4,000 | about 10 | Strong |
| 8 | Last Out | Definitive, World | Flash social; IDKit | $3,750 | about 7 | Good |

"Sum of 1st places" adds the top award of every track the combo enters, from the prize amounts in `00_current_tracks.md`. It is a ceiling, not a forecast, and it assumes multi-track wins inside one partner are allowed (see section 1).

**Judgement on the order.** Greenshoe is first because its second partner costs about five hours and opens the largest fresh pool at the event ($10,000 over four places). Combo 2 is the best mix of finalist story and team craft. Combo 3 has the most money in reach but the heaviest build; take it only if the team wants the EF prize most. Combos 4 to 8 are strong, narrower alternatives. The team builds **one** of these.

---

## 4. The combos in full

Each combo has: the core idea and its single falsifiable promise; a prize table (what each prize requires, verbatim or near-verbatim from its sponsor page, and how the build meets it); conflicts and how they are resolved; dilution and extra hours; the go or no-go gates; and the README and video structure.

### Combo 1. Greenshoe: 1inch Aqua + Uniswap Foundation

**Core idea.** An IPO-style stabilisation book for a token launched through Uniswap's Continuous Clearing Auction (CCA). One Aqua strategy, shipped from the issuer's Safe, sells overallotment tokens only above the auction's clearing price and puts every USDC they raise into a bid below it, for a fixed window. Source idea: `ideas/1inch.md` rank 1 (8.5).

**Single falsifiable promise.** "For 30 days after the auction graduates, while the bid budget lasts, nobody can sell the token into the issuer's Safe below 97% of the clearing price or buy the issuer's tokens below 103% of it; every USDC paid out by the bid arrives in the same transaction as the tokens; and after day 30 the strategy quotes zero on both sides." (`ideas/1inch.md`)

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| 1inch "Build an Aqua App" ($5,000: $2,500 / $1,500 / $1,000) | "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)"; "Onchain execution of token transfers should be presented during the final demo (local forks are ok)"; "Proper Git commit history (no single-commit entries on the final day)"; "Projects that utilize SwapVM will be scored higher" ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)) | Official Aqua at `0x1111113ccf...6a90a` on a Base mainnet fork; `AquaSwapVMRouter` redeployed with three instructions appended in the unallocated `0xd0..0xef` range (`ClearingAnchor`, `GreenshoeBand`, `StabilisationWindow`); fills move USDC and the token in every swap, with hashes in the README; one branch per instruction from hour one |
| Uniswap Foundation "Build with Uniswap" ($10,000: $4,000 / $3,000 / $2,000 / $1,000) | "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file." and "Make sure your README clearly points to the relevant contracts and lines of code" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)) | The auction being defended is a real CCA created through Factory v2.1.0 on the Base fork; `clearingPrice()` is the anchor; the LBPStrategy seeds the v4 pool that the whale dumps into; `FEEDBACK.md` written during the build; form submitted with the link; README permalinks to every CCA and v4 line |

Chain facts used: Aqua and the SwapVM router are on 17 chains including Base, with "no testnet listed"; CCA Factory v2.1.0 `0x000000001F26a0044BaA66024e7b6599c61963F8` is on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain and Sepolia (`ideas/1inch.md`, citing [aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md); `ideas/uniswap.md`, citing [Liquidity Launchpad deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)).

**Conflicts and resolutions.**
- Chain: none. Both sponsors are present on Base, and 1inch explicitly allows forks. Aqua has no testnet, so the whole demo runs on a Base mainnet fork.
- Evidence from a fork: fork transaction hashes are not public, and partner judges read only the repo and video. **Judgement:** ship `make demo` that reproduces every fill from a pinned fork block and prints the hashes; optionally run one tiny real fill on Base mainnet for the Uniswap judges, who list "Chains and demos" as an open question (`ideas/uniswap.md` question 4).
- Uniswap centrality: `ideas/1inch.md` rates it "moderate (it reads one CCA getter and the dump happens in the v4 pool)". **Judgement:** answer it in the README's first screen: delete the CCA and there is no anchor, no window and no pool to defend.

**Dilution and extra hours (Judgement).** About 5 extra person-hours for Uniswap (FEEDBACK.md, form, permalinks); the CCA setup is already in the 1inch go or no-go gate. No dilution: the Uniswap part *is* the thing being defended. Third slot left empty on purpose: no other sponsor fits honestly, and adding Bidproof would put two CCA stories in four minutes (`ideas/1inch.md` section 6). Finalist: a named TradFi instrument, a moving "defence budget" counter and a `WindowClosed(endTs)` refusal.

**Go or no-go gates.** Hours 0 to 4: (a) create and graduate one CCA through the Base factory on the fork and read a non-zero `clearingPrice()`; (b) one Aqua fill through the redeployed router moves tokens. Pivot if (a) fails by Fri 01:00 IST: Replica on the same harness, 1inch only (`ideas/1inch.md`).

**README and video.**
- README order: one-line promise; prize map (section 6); `## 1inch: Aqua and SwapVM` (router tag, appended opcode table with byte values, proof no official index moved, `CoreInvariants` and fuzz counts, fill hashes); `## Uniswap: CCA and v4` (factory read, `clearingPrice()` call, LBPStrategy and v4 pool lines, link to `FEEDBACK.md`); limits ("the band holds while the budget lasts").
- Video (2:30): 0:00 promise and the band chart; 0:20 CCA graduates at P, pool seeded (Uniswap chapter); 0:45 buyer rush, overallotment sells at 1.03 P, counter rises (1inch chapter); 1:20 whale dumps, fills land on 0.97 P, counter falls; 1:55 warp 31 days, `WindowClosed`; 2:15 test and invariant counts.

---

### Combo 2. Pause Fast, Unpause Only By A Person: Chainlink CRE + CCIP 2.0 + World Agent Pass + IDKit

**Core idea.** An exchange treasury whose safety actions are asymmetric. A Chainlink CRE workflow reconciles every hot-wallet outflow against signed withdrawal tickets (Ledger Match) and, on one unmatched outflow, refuses the refill and fans a pause out to vaults on three chains over CCIP 2.0 at block depth. Nothing the workflow or any agent can do raises risk: an unpause travels only at full finality, and only after a fresh World ID Agent Pass approval from a named guardian whose seat on the guardian council was enrolled with a distinct Proof of Human through IDKit. Source ideas: `ideas/chainlink.md` combo K1 (CCIP 8.2, CRE 7.7), `ideas/world.md` Breakglass (8.2) with the Distinct Quorum council (8.3).

**Single falsifiable promise.** "One unticketed outflow and the treasury refuses its next refill, and the pause lands on Base Sepolia, Arbitrum Sepolia and OP Sepolia before the attacker's next withdrawal there. With the workflow's key and a prompt-injected 'all clear', no vault can be unpaused; the named guardian's approval unpauses it only after full finality; an approval for one call cannot execute another; and a second key held by an already-seated human cannot join the council."

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| Chainlink "Best workflow with CRE" ($1,500, one winner) | "Build, simulate, or deploy a CRE Workflow that's used as an orchestration layer within your project"; "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent"; "Demonstrate a successful simulation (via the CRE CLI) or a live deployment"; "Be meaningfully used in your project" ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)) | Cron plus EVM Log triggers; reads outflows on Sepolia and the team-built withdrawal-ticket API (disclosed as a stand-in enterprise system); writes refill or `Unreconciled(txHash)` through the forwarder; `cre workflow simulate --broadcast` hashes in the README. Delete the workflow and the treasury can never refill |
| Chainlink "Best use of Chainlink CCIP 2.0" ($3,500: 2 x $1,750) | "Each project must use Chainlink CCIP in some form to make a state change on a blockchain"; "Using Chainlink CCIP inside your smart contracts is required" (same page) | `GuardianSender` requests block-depth finality, `AdminSender` requests full finality; each vault's receiver overrides `getCCVsAndFinalityConfig` per sender, and guardian messages may only set `paused = true` (`ideas/chainlink.md`) |
| World "World ID Agent Pass" ($5,000: $2,500 / $1,500 / $1,000) | "Integrate with the official World ID Agent Pass"; "Demonstrate the complete journey"; "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur"; "Validate identity results in a secure backend"; "Include a short integration debrief/feedback" ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | The protected action is the unpause. Hono backend is a confidential OIDC client of `https://auth.world.org`; it checks the ID token and signs an EIP-712 approval bound to `keccak256(target, calldata)`; `AdminSender` sends only with it. Denied, expired and wrong-human paths leave every vault paused. `WORLD_DEBRIEF.md` from hour one |
| World "Best Use of IDKit" ($2,500: 2 x $1,250) | "Use at least one supported World ID credential and verify the result on the server or onchain as appropriate"; "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance"; "Demonstrate a successful verification and one meaningful alternative path" (same page) | Trust event: "someone takes a guardian seat". Credential: Proof of Human, for distinctness only (Selfie Check is "medium-assurance", Passport over-collects, `ideas/world.md`). Verified on the server; the same human enrolling a second key is refused with `SameHuman` |

**Conflicts and resolutions.**
- World asks for backend validation; Chainlink's story is "no single operator". **Resolution:** the backend sits only on the *risk-up* path. A stolen backend key alone still cannot unpause (it also needs the guardian and the finality wait); the README states that a stolen backend key plus a phished guardian is the residual risk.
- IDKit onchain verification lives on World Chain (`ideas/world.md` question 3), while the vaults are on Sepolia and the CCIP lanes start there. **Resolution:** verify IDKit on the server and have the council contract on Sepolia accept a backend-signed enrollment; the README says the guard then trusts the backend for enrollment. Do not add a World Chain leg.
- Finality waits: an unpause on Sepolia waits about 13 to 17 minutes (`ideas/chainlink.md`). **Resolution:** pre-send the unpause before recording and show it "waiting for finality" in the CCIP Explorer.
- Fast-finality lanes for data-only messages on testnet are not verified (Chainlink question 2). **Resolution:** fallback in `ideas/chainlink.md`: show the asymmetry on a Chainlink Local fork (v0.3.0 supports CCIP 2.0 lanes) plus the waiting unpause on testnet.
- No EF prize: Agent Pass's backend and confidential client weaken the C and P lines of CROPS (`ideas/world.md` section 7.4). Leave EF out.

**Dilution and extra hours (Judgement).** Core (K1: Ledger Match plus Pause Fast) is the Chainlink build. World adds about 18 person-hours: OIDC and device flow 6, backend approval signer and Breakglass direction table 4, IDKit enrollment and `SameHuman` guard 6, debrief and README 2. Dilution is moderate: four tracks, but one storyline (detect, pause fast, a person unpauses slowly). `ideas/chainlink.md` warns against a second Chainlink story; this adds none. Third slot left empty: Uniswap is "weak for Uniswap's centrality test" (`ideas/world.md` rank 2). Finalist: three vault timers turning red, a prompt-injected unpause reverting `RiskUpNeedsHuman()`, a phone approval, then the finality wait.

**Go or no-go gates.** Hours 0 to 4: one block-depth data message Sepolia to Base Sepolia into a V2 receiver; one CRE simulation writing through the Sepolia forwarder; one Agent Pass device flow returning a validated ID token with mocked identities (World question 1). If Agent Pass fails, keep the IDKit council and enter World IDKit only.

**README and video.**
- README order: promise; prize map; key diagram (who can pause, who can unpause, through which sender); `## Chainlink CRE` (workflow file, triggers, the external system, simulation log and hashes); `## Chainlink CCIP 2.0` (the `getCCVsAndFinalityConfig` function first, latency table from the CCIP REST API, explorer links); `## World ID Agent Pass` (journey, three failed paths with tx or log evidence, backend validation lines, `WORLD_DEBRIEF.md`); `## World IDKit` (trust event, why Proof of Human is the minimum, `SameHuman` refusal); limits.
- Video (2:50): 0:00 promise; 0:15 ten ticketed withdrawals green, then the drain (CRE chapter); 0:40 refill refused, pause lands on three chains with timers (CCIP chapter); 1:10 injected "patched, unpause" reverts; denied and wrong-human approvals fail (Agent Pass chapter, failed paths inside the first 90 seconds as `ideas/world.md` advises); 1:40 guardian approves, unpause waiting for finality, then landed (pre-sent); 2:10 second key of a seated guardian refused at enrollment (IDKit chapter); 2:30 limits and test counts.

---

### Combo 3. Truthsign Desk: EF Best CROPS App + Arkiv Mirror (+ Swarm bonus) + ENS Best Use of ENSv2

**Core idea.** A signing check a wallet runs before it clear-signs. It answers three questions on one screen: who published this ERC-7730 descriptor (an ENSv2 resolver whose permissions were frozen at `initialize`), is it still current (the descriptor registry mirrored to Arkiv with code-drift checks), and does it tell the truth (a fork run whose effects must match every field the descriptor puts on screen). If any answer fails, the wallet refuses to clear-sign. Source ideas: `ideas/ef.md` C1 Truthsign (7.3), `ideas/arkiv.md` M1 Clearsight (8.0) with S4, `ideas/ens.md` Descriptor Desk (6.9).

**Single falsifiable promise.** "For a descriptor that maps 'recipient' to the wrong argument, the wallet refuses to clear-sign every time and shows raw calldata; a descriptor not published under the protocol's frozen ENSv2 desk shows 'unverified source'; a descriptor whose contract implementation changed since import shows 'drifted'; and all three checks still work with our server and github.com switched off."

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| EF "Best CROPS App" ($3,500: $2,000 / $1,000 / $500; criteria still marked "(tbc: final review pending)") | FOSS licence and a runnable README; "a section titled CROPS" with C, O, P and S lines; "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters"; "No third-party trackers or analytics in the client"; keys and personal data stay on the device ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) | Lead property S ("things must do what they claim to do"), made structural by sitting in the signing path. MIT; one-command run; CROPS section per `ideas/ef.md`; the video's "moment it matters" is switching off GitHub and our server and repeating the check |
| Arkiv "Mirror something Ethereum depends on" ($4,000: $3,000 / $1,000) | "The data's license allows republishing. Link it in your README."; "Not Sourcify data, from any chain."; "Your import script is in the repo, and we can re-run it."; writes to Arkiv's current testnet "with `@arkiv-network/sdk` or the JSON-RPC API, and a feature or query people use reads the data from Arkiv"; README writer wallets and "one query we can run"; `/arkiv/schema.md`, `friction.md`, `reach.md`, `why-arkiv.md`, `data-quality.md`; open-source licence and AI use ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)) | The ERC-7730 registry (CC0-1.0 per `ideas/arkiv.md`) mirrored as `descriptor`, `binding` and `drift_check` entities, two writer wallets with different lifetimes; `import.ts --since <sha>` re-runnable; the wallet's sync and the lookup page read Arkiv; Sourcify is linked by address only, never copied |
| Arkiv + Swarm bonus ($500) | "Your project uses both Arkiv and Swarm"; `/arkiv/swarm.md` with the entity field holding the reference, one entity key and its reference, the postage batch ID and buyer, the Bee node, the upload and read files, run steps, the video moment and friction; never store an encrypted reference in a public entity as it is (same page) | S4: the frontend and a registry snapshot per imported commit on Swarm, referenced from a `readonly` `release` entity; public, unencrypted references |
| ENS "Best Use of ENSv2" ($7,000: $3,000 / $2,000 / $1,000 / $1,000) | "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values." and a showcase "link to a live demo" with open-source code ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)) | `clear-signing.<protocol>.eth` on a Permissioned Resolver on Sepolia: key-scoped `ROLE_SET_DATA` for the protocol key and one per reviewer, set at `initialize`, no admin holder; the checker proves the frozen set with `verifyContract` and `roleCount` (`ideas/ens.md`) |

**Swap option for the third pick.** If the ENS gate fails, replace ENS with Chainlink "Best workflow with CRE" through Descriptor Notary: an EVM Log trigger on registration, HTTP reads of the GitHub registry and Sourcify, an onchain PASS or FAIL ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink); `ideas/chainlink.md` CRE rank 5). It is cheaper (about 8 hours) but the smaller prize ($1,500) and "the weakest of the three sponsors here" by its own file.

**Conflicts and resolutions.**
- CROPS P against Arkiv and ENS lookups: a per-transaction query to the Arkiv RPC or an ENS resolver tells that provider which contract the user is about to sign. **Resolution (Judgement):** the registry is small (about 931 files, `ideas/arkiv.md`), so the wallet syncs the whole mirror from Arkiv and checks locally, and ENS and fork reads go through Anon-RPC. The Arkiv rule "a feature or query people use reads the data from Arkiv" still holds: the sync and the public lookup page read it.
- CROPS C against Arkiv testnet: if Arkiv's testnet goes away, the wallet falls back to its local copy and the Swarm snapshot. State it in the C line.
- EF places a project in one EF prize. Anon-RPC is used here as a component of a CROPS entry, not as a second EF entry; let EF judges place it.
- Arkiv "Not Sourcify data": the ABI check reads Sourcify live but never writes Sourcify fields to Arkiv.
- ENS centrality: `ideas/ens.md` marks it "[~] central only if the frozen permission set is the trust model and the page verifies it". The ENS badge must change the verdict on screen (a correct descriptor from an unfrozen source still shows "unverified source"), or ENS reads as a hash store.
- Videos: CROPS caps at 3:00, so the one cut runs 2:40 to 2:59.
- ENS "live demo" against CROPS "works without you": host the demo page on Swarm as well as a normal URL; both count as live.

**Dilution and extra hours (Judgement).** Core Truthsign (renderer, fork, fuzzer, wallet wrapper) is about 35 person-hours. Extras: Arkiv mirror and drift checker about 14, Swarm about 4, ENS desk and verifier about 12, for about 30 extra. That leaves almost no slack in a 75 to 80 hour budget. Dilution is the highest in this file: three badges on one screen. Keep the story to one sentence ("the screen must match the effect") and treat ENS and Arkiv as "who said so" and "is it current". Cut order if late: ENS, then Swarm, then the registry-wide sweep. Finalist: `ideas/ef.md` calls this "the only EF idea here with a realistic finalist case"; the finalist report in `reports/` lists Truthsign among eleven Mumbai builds that fit the finalist pattern.

**Go or no-go gates.** Hours 0 to 4: the planted wrong-recipient descriptor blocked on a fork; one Arkiv entity written and read back with the documented query; one Sepolia Permissioned Resolver initialized with two key-scoped data roles and no admin holder. Fail the ENS gate: swap to Chainlink CRE. Fail the Arkiv gate: drop to EF plus ENS.

**README and video.**
- README order: promise; prize map; `## CROPS` (C, O, P, S lines exactly as titled); `## Arkiv` (writer wallets, the query `chainId = u64(1) AND selector = str('0x3593564c')` or the confirmed syntax, links to the five `/arkiv/*.md` files and `/arkiv/swarm.md`); `## ENSv2` (desk name, `initialize` grants, `roleCount` proof, Sepolia addresses); upstream reports filed to the registry.
- Video (2:50): 0:00 "Send 100 USDC to alice.eth" on screen, fork shows the money going elsewhere, wallet refuses (EF chapter); 0:40 the ENS badge: same descriptor from an unofficial source shows "unverified source" (ENS chapter); 1:10 drift badge on a proxy whose implementation changed (Arkiv chapter); 1:40 github.com and our server switched off, the check repeats from the local mirror and the Swarm-hosted page (CROPS moment and Swarm chapter); 2:20 registry sweep count and replay command.

---

### Combo 4. Brake: Hedera Tokenize + No Solidity + World Agent Pass

**Core idea.** Every value-moving power the Asset Tokenization Studio (ATS) gives a bond issuer (forced transfer, redemption, issue, role grant) moves onto a native Hedera account whose key is "2 of 3 officers AND a stateless brake validator". The validator co-signs only schedules with `wait_for_expiry`, a per-function delay and the trustee as admin key, and only after a fresh Agent Pass approval from a named officer. The trustee can kill any pending schedule. The same validator also guards the issuer's treasury (Slowvault). Source ideas: `ideas/hedera.md` Issuer Brake (8.0) and Slowvault (8.1), World Agent Pass option from the same file.

**Single falsifiable promise.** "Steal all three officer keys and you still cannot move one bond unit out of an investor's account before the delay, and the trustee can stop it; without a fresh Agent Pass approval by the named officer, the validator signs nothing, so a denied or expired approval schedules nothing; a sanctioned holder can still be frozen in seconds."

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| Hedera "Tokenize Anything with Hedera Studios" ($5,000: $2,500 / $1,500 / $1,000) | "Use ATS or Stablecoin Studio (SDK, contracts, web app, or a combination) to issue or manage a tokenized asset or stablecoin."; "Deploy and demo on Hedera testnet."; "A public GitHub repo, with contracts verified on HashScan where applicable."; "A demo video of 5 minutes or less that covers issuance, configuration, and at least one lifecycle operation" ([Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)) | ATS bond issued on testnet; KYC and control list configured; freeze (fast path), forced transfer (slow path, vetoed) and redemption (slow path, executed) are the lifecycle operations; Scheduled Transactions are the mechanism (an extra point) |
| Hedera "No Solidity Allowed" ($2,000: 2 x $1,000) | "Use the Hedera JavaScript/TypeScript SDK or Python SDK, with no Solidity smart contracts."; "Use at least two native Hedera services"; README with setup and usage; video of 5 minutes or less (same page) | The team writes no Solidity: TypeScript SDK, nested KeyList accounts, Scheduled Transactions, HCS brake topic, HTS (USDC payroll in Slowvault), Mirror Node |
| World "World ID Agent Pass" ($5,000) | as in combo 2 ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | Protected action: the validator's co-signature on a value-moving schedule. The validator is the secure backend: it validates the Agent Pass ID token (`sub` must be the named officer) before `ScheduleSign`. Denied, expired and wrong-officer paths leave no schedule on the Mirror Node |

**Conflicts and resolutions.**
- "No Solidity" against ATS: ATS is Hedera-authored Solidity called through `ContractExecuteTransaction`. Whether that violates "with no Solidity smart contracts" is Hedera question 2 (`ideas/hedera.md`). **Resolution:** name Tokenize as primary; enter No Solidity only if the workshop says calls into Hedera's own contracts are fine. The Slowvault half is SDK-only either way.
- World backend validation fits here: the validator already is a backend. No conflict.
- Video lengths: Hedera allows up to 5 minutes but ETHGlobal caps at 4. One 2:50 cut serves both.
- No EF prize and no Ethereum-chain sponsor: "EF prizes run on Ethereum networks; Hedera is not one" (`ideas/hedera.md` section 8).

**Dilution and extra hours (Judgement).** Slowvault inside Brake costs about 5 person-hours (same validator, a second policy). World adds about 9 (OIDC client in the validator, approval card, debrief). Total about 14. Low dilution if the README keeps one sentence: "every dangerous power waits on a public clock, and a person signs off." Finalist: a stolen-key forced transfer stopped live by the trustee; `ideas/hedera.md` rates it "Strong".

**Go or no-go gates.** Hours 0 to 4: (a) an ATS role granted to a threshold-key account's long-zero EVM address can be exercised by a `ContractExecuteTransaction` from that account; (b) a scheduled `ContractExecute` keeps the brake account as `msg.sender`; (c) exact ATS role names and selectors in the deployed version. If (b) fails, Brake loses its core; pivot to Slowvault plus World (No Solidity only).

**README and video.**
- README order: promise; prize map; key diagram (`KeyList[ threshold(2, [A, B, C]), V ]`) with HashScan links; `## Hedera Tokenize` (ATS issuance, configuration, lifecycle operations with transaction IDs); `## Hedera No Solidity` (services used, Mirror Node calls, no `.sol` in the repo); `## World ID Agent Pass` (journey, failed paths, validator lines that check the token, `WORLD_DEBRIEF.md`); what bypasses the brake (officers plus validator together).
- Video (2:50): 0:00 promise and key diagram; 0:20 bond issued, KYC set (Tokenize chapter); 0:50 attacker with officer keys asks the validator, Agent Pass approval denied, nothing scheduled (World chapter); 1:20 a valid schedule appears on HCS, trustee deletes it (No Solidity chapter); 1:50 fast-path freeze; 2:10 redemption executes on its clock; 2:30 limits.

---

### Combo 5. Residue: ENS Best Use of ENSv2 + Arkiv Mirror

**Core idea.** In ENSv2 a transfer moves only the token's roles; the name's subregistry and resolver can stay under the seller's control. Residue's lens lists every key that could still change where a name resolves or what sits under it, and its escrow settles a sale only when that list is the buyer alone. The ENSv2 role graph (`EACRolesChanged`, links, operators) is mirrored to Arkiv so anyone can ask "every name where this key still holds a role". Source idea: `ideas/ens.md` rank 1 (8.3) with its optional Arkiv Mirror.

**Single falsifiable promise.** "If `settle()` succeeds, no address except the buyer can change this name's address or text records, register or remove its subnames, or upgrade the contracts behind either; and for any key, the Arkiv mirror returns every name where it holds a role, matching `roleCount` on chain or marked UNKNOWN." (first half verbatim from `ideas/ens.md`)

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| ENS "Best Use of ENSv2" ($7,000) | as in combo 3 ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)) | The product is the ENSv2 control model: hierarchy walk, EAC role counts, `verifyContract` on every proxy; `CleanHandover.sol` escrow on Sepolia; the judge picks the name, so nothing is hard-coded; hosted lens and escrow page as the live demo |
| Arkiv "Mirror something Ethereum depends on" ($4,000) | as in combo 3 ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)) | Importer follows ENSv2 events on mainnet and Sepolia and writes `role_grant` entities keyed by name, resource and holder; re-runnable from a block; the lens's reverse lookup and the public query page read Arkiv |

**Conflicts and resolutions.**
- Arkiv "The data's license allows republishing": the source is public chain data, not a licensed dataset. **Judgement:** say so in the README and ask the Arkiv booth (Arkiv question 1) on Thursday; if they disagree, drop Arkiv and enter ENS alone.
- The escrow must read chain state, not the mirror: `settle()` checks roles on chain. The mirror serves the lens and reverse lookups only, and the lens marks UNKNOWN whenever the mirror disagrees with `roleCount`. That keeps ENS's "enforced where an attacker cannot route around it" (`ideas/ens.md` judgement 1) intact.
- Naming live mainnet names with residue: show counts and the team's own names; ask ENS how to handle findings (ENS question 9 in `ideas/ens.md`).
- Tempting third pick, EF Anon-RPC (private name lookups so a buyer's interest does not leak): it conflicts with the Arkiv reads, which do not go through Anon-RPC, and EF judges score "how much of the app's traffic goes through Anon-RPC". **Judgement:** skip it, or replace Arkiv with Anon-RPC, never both.
- Workshop clash: ENS (16:00, Room 1) and Arkiv (16:00, Room 2) run at once ([event page](https://ethglobal.com/events/mumbai)); split up.

**Dilution and extra hours (Judgement).** Arkiv adds about 14 person-hours (importer 8, five `/arkiv/*.md` files 3, query page 3). Low dilution: the mirror is the lens's index. The Arkiv entry's weak spot is Reach and Why Arkiv against ENS's own indexing docs, so expect 2nd place odds there, not 1st. Finalist: a judge clicks Buy and `settle()` reverts with `ResidueFound(SUBREGISTRY_ROOT, ROLE_REGISTRAR, ...)`.

**Go or no-go gates.** Hours 0 to 4 on a Sepolia fork: register a name with a factory subregistry, transfer it with `safeTransferFrom`, and show the old owner can still `register` under it. If ENS added a transfer hook that moves subregistry roles, pivot to Moving Day on the same walker (ENS only).

**README and video.**
- README order: promise; prize map; `## ENSv2` (walker, escrow, invariant suite, Sepolia addresses, live link); `## Arkiv` (schema, writer wallet, one query, links to `/arkiv/*.md`); UNKNOWN semantics; disclosure policy.
- Video (2:40): 0:00 promise; 0:15 listing, judge clicks Buy, `ResidueFound` (ENS chapter); 0:50 seller hands over the role, settle succeeds, old seller's `register` fails; 1:30 paste any mainnet name, "who can change what" (ENS); 2:00 reverse lookup "every name this key controls" read from Arkiv (Arkiv chapter); 2:25 invariant count.

---

### Combo 6. Closebook on Gas Ledger: Whitechain Operate + Scale + EF Best CROPS App

**Core idea.** A drop-in USDT checkout on Whitechain Sepolia whose payer never holds WBT. Each order writes an onchain receipt that caps refunds; webhooks separate "paid" from "settled"; the accountant's export can be re-derived from chain. The relayer reimburses itself in USDT from each merchant's prepaid gas budget, refills WBT from the WWBT/USDT pool and stops at a printed loss bound per merchant. For the EF slot the widget broadcasts the signed authorization to several independent relayers, so killing ours does not stop a payment. Source ideas: `ideas/whitechain.md` Closebook (7.8), Gas Ledger (8.0), No Single Relayer (7.1).

**Single falsifiable promise.** "The payer pays 4.00 USDT with no WBT; a refund above what was paid reverts; the drain script against our relayer stops at the bound printed for that merchant while other merchants keep working; and when we kill our relayer and the merchant's mid-checkout, the payment still lands through a relay node anyone can run, with no relayer able to change amount, payee or fee."

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| Whitechain "Operate · Stablecoin Payments for Business" ($5,000: $2,500 / $1,500 / $1,000) | Contracts "deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer"; "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count"; a README line on why the flow needs onchain stablecoin settlement; steady commit history; "A demo video of 2 to 4 minutes that shows each party involved"; "A WHITECHAIN_FEEDBACK.md in your repo" ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain)) | `CheckoutRouter` with receipts and capped refunds, verified on 1874; payment in the prize USDT through `receiveWithAuthorization`; `examples/shop` adds the widget in about 20 lines; customer, merchant and accountant on screen |
| Whitechain "Scale · Payments Nobody Notices" ($3,000: $2,000 / $1,000) | same six qualifications; "A payer flow with zero crypto steps visible"; "How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it"; won't place "Flows where the payer still signs a transaction that costs them gas" (same page) | `GasRelay` pays the relayer from the merchant's `GasVault` at a TWAP-guarded price; the refill is a clickable swap on the WWBT/USDT v3 pool; the drain bound is a number on screen; the payer signs typed data only |
| EF "Best CROPS App" ($3,500) | as in combo 3 ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) | Lead property C: relayers are replaceable on camera, the authorization binds payee, amount, fee cap and deadline, and the merchant can force-include from Ethereum Sepolia through OptimismPortal "within the sequencing window, about 12 hours" ([finality docs](https://docs.whitechain.io/learn/network/transaction-finality)) |

**Conflicts and resolutions.**
- Whitechain's own judge: "our merchants want one reliable relayer, not a race. Pitch it to us as uptime" (`ideas/whitechain.md`, Judgement). EF wants censorship resistance. **Resolution:** the same module, two framings: the Whitechain section calls it failover and uptime; the CROPS section calls it "works without us".
- CROPS P: relayers and the public chain see payer, merchant and amount. State it as the trade-off in the P line (the "other three still hold, or trade-offs are stated" criterion).
- CROPS C against Whitechain: single sequencer and permissioned fault proofs; state it, and show the forced-inclusion path as recorded evidence, not live.
- Video: Whitechain wants every party; CROPS caps at 3:00. One 2:50 cut with five roles (payer, merchant, accountant, relayer operator, attacker) is tight but possible; the accountant gets 15 seconds.
- Uniswap is not claimable: the refill pool is a third-party v3 deployment, not a listed Uniswap deployment (`ideas/uniswap.md` combos to avoid). Do not enter Uniswap.
- Prize USDT supply: about 10 holders in an earlier probe (`ideas/uniswap.md`, citing `plans/C_private_invoicing_whitechain.md`); Whitechain question 1 asks for an official source. Buying it on the pool is the fallback, and the faucet gives only 0.5 WBT a day.
- TWAP: the pool's `observationCardinality` was 1 on 2026-10-31, so `increaseObservationCardinalityNext` must be called at 21:00 Thursday (`ideas/whitechain.md` section 1.2).

**Dilution and extra hours (Judgement).** The two Whitechain tracks share one codebase. EF adds about 12 person-hours (relay race 4, `relay-node` CLI 3, recorded forced inclusion 3, CROPS section and licence 2). Moderate dilution: the CROPS beat (killing relayers) and the Scale beat (drain bound) are both relayer stories, which helps. Finalist: medium; the judge-edits-a-cell export beat and the drain meter are the memorable moments. Whether one project can place in both Operate and Scale is Whitechain question 2.

**Go or no-go gates.** Hour 0: TWAP cardinality raised. Hours 0 to 4: one prize-USDT `receiveWithAuthorization` payment through the Router on 1874, verified contract, explorer link.

**README and video.**
- README order: promise; prize map; the Whitechain "why onchain" line in the first screen; `## Whitechain Operate` (Router, receipts, refunds, webhooks, export verify, payment link); `## Whitechain Scale` (who pays gas, where WBT comes from, the drain bound, refill swap link); `## CROPS` (C, O, P, S); `WHITECHAIN_FEEDBACK.md`; limits.
- Video (2:55): 0:00 promise; 0:10 payer taps Pay with no WBT, merchant sees "paid" then "settled" (Operate chapter); 0:45 refund 1.50, second refund reverts; accountant verify; a judge edits a cell; 1:20 drain script stops at the bound, refill swap on the explorer (Scale chapter); 1:55 two relayers killed, payment lands through a third laptop (CROPS chapter); 2:30 forced-inclusion recording and limits.

---

### Combo 7. Reserve Gate: 1inch Aqua + Chainlink CRE

**Core idea.** An Aqua maker on Arbitrum that quotes ETH against bridged LSTs from one shared ETH balance, but whose SwapVM program refuses to buy any token whose escrow coverage on Ethereum has fallen below the maker's floor. A Chainlink CRE workflow reads the escrow on Ethereum and the supply on each L2 and writes coverage to a receiver the instruction reads. Source idea: `ideas/1inch.md` rank 2 (7.9).

**Single falsifiable promise.** "Replay a Kelp-sized escrow release on an Ethereum fork, post the coverage to an Arbitrum fork, and let any holder of L2 rsETH sell into Reserve Gate: not one wei of the maker's ETH leaves the wallet. The same sale into a plain rate-pegged program built from the same pricing code without the coverage instruction fills in full. An honest wstETH sale on the same strategy still fills." (`ideas/1inch.md`)

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| 1inch "Build an Aqua App" ($5,000) | as in combo 1 ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)) | Official Aqua on an Arbitrum fork; redeployed router with `ReserveCoverage`, `SupplyVelocity` and `RateCurve` appended; WETH, rsETH and wstETH transfers on the fork |
| Chainlink "Best workflow with CRE" ($1,500) | as in combo 2 ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)) | The workflow is the only writer of the coverage receiver; it reads two chains and, per `ideas/1inch.md`, the LayerZero scan API as the off-chain source; `cre workflow simulate` log in the README |

Fact used: Galaxy Research reports "112,204 rsETH (roughly 15% of post-exploit supply) became unbacked on the bridge adapter" and the adapter holds 40,373 rsETH against 152,577 rsETH outstanding on L2s ([Galaxy Research](https://www.galaxy.com/insights/research/kelpdao-layerzero-exploit-defi), via `ideas/1inch.md`).

**Conflicts and resolutions.**
- CRE against forks: Aqua has no testnet, so the receiver lives on an Arbitrum fork, but CRE's `--broadcast` targets real networks through a forwarder. **Resolution (Judgement):** gate (b) in `ideas/1inch.md` tests CRE simulation against fork RPC URLs in hours 0 to 4; if broadcast cannot reach the fork, record the simulation's computed report, have a TypeScript keeper write the same value to the fork, and say in the README which path ran. If even simulation fails against forks, drop Chainlink; the 1inch entry is unaffected.
- CRE "external API, system": a two-chain read may be read as "blockchain only". Add the LayerZero scan API so the external source is unambiguous.
- "Why not Proof of Reserve feeds?" is the expected question (`ideas/1inch.md` judge notes): answer with the per-L2 coverage number no feed publishes.

**Dilution and extra hours (Judgement).** About 10 person-hours for CRE (workflow, receiver, simulation log). Low dilution: the workflow is the instruction's only input. Finalist: strong, with a dated 2026 loss, a replay and a refusal; get the actor right (L2 holders sell into the maker, not the attacker).

**Go or no-go gates.** Hours 0 to 4: (a) read the rsETH adapter balance on an Ethereum fork and L2 supply on an Arbitrum fork; (b) CRE CLI simulation against fork RPCs. Pivot on a harness failure: Standing Repo (1inch only).

**README and video.**
- README order: promise; prize map; numbers table from Galaxy; `## 1inch` (router tag, opcode table, fork tests, fills); `## Chainlink CRE` (workflow, sources, simulation log, which write path ran); actor note.
- Video (2:40): 0:00 split screen of two makers; 0:25 escrow emptied on the Ethereum fork, CRE writes "coverage 26.5%" (CRE chapter); 1:00 L2 rsETH sale: left pays out, right reverts `CoverageBelowFloor` (1inch chapter); 1:40 wstETH fills on the right; 2:10 invariants and limits.

---

### Combo 8. Last Out: Definitive Flash + World Best Use of IDKit

**Core idea.** Copy trading where the leader cannot dump on followers. The leader posts a call from an EIP-1271 lock account that will sign only the published bracket for that token until the lock expires; followers copy from their own wallets with brackets inside the leader's; each ranked leader profile is one verified human, so a leader with a bad record cannot start again from a fresh address. Source idea: `ideas/definitive.md` rank 1 (7.5), with Called It (7.2) as the pivot on the same app.

**Single falsifiable promise.** "Until the lock expires, the leader's account refuses every sell of the called token except the bracket it published, and refuses transfers of that token. Each follower's stop sits above the leader's stop and each follower's target below the leader's target. Try to dump: the signature is refused." (`ideas/definitive.md`) Plus: "a second wallet controlled by the same person cannot open a ranked leader profile."

| Prize | What it requires (Fact) | How the build meets it |
|---|---|---|
| Definitive "Best Use of Flash Advanced Orders in a Social App" ($2,500, one winner) | "A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP)."; "Onchain execution shown in the final demo."; "Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X." ([Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive)) | `limit` entries with an attached bracket, three fills on Base mainnet with explorer links; "dump refused" clip posted to X and Discord; `flashIntegratorFeeBps` set |
| World "Best Use of IDKit" ($2,500) | as in combo 2 ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)) | Trust event: opening a ranked leader profile ("fair access to a scarce benefit" is a rank). Proof of Human, verified on the server, nullifier stored per profile; rejection path: "already verified human" |

**Conflicts and resolutions.**
- Flash has no testnet ("We recommend testing on a production chain like Base or Solana using small amounts", `ideas/definitive.md` citing [Flash FAQ](https://flash.definitive.fi/docs/faq.md)), while World proofs are mocked ("Proofs are using fake identities, DO NOT rely in them for production", [World prizes](https://ethglobal.com/events/mumbai/prizes/world)). **Resolution:** real money on Base, mocked identities at the server; the README says the profile gate is a demo of the rule, not production identity.
- Onchain IDKit verification needs a verifier on the chain in use; none is confirmed on Base (`ideas/world.md` question 3). Verify on the server, which the qualification allows ("on the server or onchain as appropriate").
- Video formats: ETHGlobal wants 2 to 4 minutes; Definitive wants "a short demo video" on X and Discord. **Judgement:** post a 60 to 90 second cut to X and Discord and submit the full 2:30 to ETHGlobal. X limits upload length for many accounts; check the team account's limit before Saturday (not verified here).
- CROPS is "weak because Flash is a centralized executor" (`ideas/definitive.md`); no EF pick.

**Dilution and extra hours (Judgement).** About 7 person-hours for IDKit (widget, RP signing, server verify, debrief). Low dilution: the human gate closes the sybil hole every leaderboard has. Third slot empty: nothing else fits. Finalist: good, with a live "dump refused" moment. Prize ceiling is the lowest of the eight, which is why it is last.

**Go or no-go gates.** Hours 0 to 4 from a minimal 1271 account on Base: (a) a 2 USDC limit with a digest the account approves fills; (b) an order the account refuses is rejected by Flash; (c) record whether TWAP slices settle after the account starts refusing. If (a) or (b) fails, pivot to Called It (same app, same IDKit gate).

**README and video.**
- README order: promise; prize map; trust split (lock onchain, trigger levels held by Flash); `## Definitive Flash` (order types, fills, fee, the X post link); `## World IDKit` (trust event, minimum credential, rejection path, debrief); gap risk note.
- Video (2:30): 0:00 leader posts a call, X card; 0:25 two phones copy, fills land on Base (Definitive chapter); 1:00 leader presses "Market sell now", `PERMISSION_DENIED`; transfer reverts; 1:35 leader's second wallet refused a ranked profile (IDKit chapter); 2:00 recorded stop-out, followers first; 2:20 invariant counts.

---

### Also considered, not in the eight (Judgement)

- **Strong single-partner builds that should not be stacked:** EF B1 RuleDiff (alt mempool, 7.6; devnet-only, so nothing else can share its chain), EF A1 Slowlane (Anon-RPC, 7.6), Uniswap Bidproof (8.4, "Uniswap only" in its own file), Arkiv N1 Grammarsmith (8.4, single $2,000 winner), Hedera Subscribe402 (x402 plus No Solidity inside one Hedera slot). If the team prefers depth over stacking, these are the picks.
- **Preflight plus Tripwire (Arc Track D plus Chainlink CRE):** single $3,000 Arc winner plus $1,500; the off-Studio Base Sepolia leg and CRE's support for Arc are both unconfirmed (`ideas/arc.md` questions 2 and 4).
- **Robot That Pays For Its Brain plus Two-Key Rover (0G Physical AI and Agents That Pay plus World Agent Pass):** reachable but the weakest team fit; `ideas/0g.md` keeps Robot "0G only" because extra partners cost demo time, and two Physical AI tracks pay "at 0G's discretion".
- **Upgrade Council plus Veto Window (World plus Chainlink CRE):** coherent, but it is combo 2's shape with a weaker Chainlink half (one track instead of two). `ideas/world.md` says Breakglass and Upgrade Pass share about 70% of their code; build one and mention the other as a second policy.

---

## 5. Five tempting combos that do not work

1. **One stablecoin payments app for Arc and Whitechain.** Both sponsors want merchant payments, so one checkout looks like two prizes. It fails on settlement rules that cannot both be the main flow. Arc: "Build a DeFi or onchain finance application on Arc, using USDC or EURC for settlement" and "Every Arc prize requires using Arc Studio as the starting point" ([Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc)); "Arc Studio deploys to Arc testnet only" ([Arc Studio CLI](https://docs.arc.io/ai/arc-studio-cli.md), via `ideas/arc.md`). Whitechain: "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow" and contracts on "Whitechain Sepolia (chain ID 1874)" ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain)). **Judgement:** two chains, two tokens, two deploy pipelines (one forced through Studio), and each sponsor sees the other half as dead weight. Arc, Whitechain and Hedera files all list this pairing under "avoid".
2. **ENSv2 names on a Whitechain invoice or an Arc checkout.** "Pay alice.eth" reads well on an L2 payment screen. ENS requires "built on ENSv2 on Ethereum mainnet or Sepolia" and "central to the product, not a cosmetic add-on" ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)). **Judgement:** a contract on chain 1874 or Arc cannot read ENSv2, so the name becomes a frontend lookup, which is the cosmetic case ENS excludes (`ideas/ens.md` combos to avoid). The honest version keeps every ENS rule on Sepolia, which means it is a different product.
3. **1inch Aqua on Arc, because Aqua is deployed there.** Aqua lists Arc (chain 5042) among its 17 deployments with "no testnet listed" (`ideas/1inch.md`, citing [aqua deployments.md](https://github.com/1inch/aqua/blob/main/deployments.md)), so an Aqua position settling in USDC on Arc looks like a free Arc slot. It fails because Arc Studio deploys only to Arc testnet, where there is no Aqua, while 1inch requires "Official Aqua/SwapVM contracts" ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)). **Judgement:** a fork of Arc mainnet is not "Built in Arc Studio", and writing the SwapVM instructions outside Studio misses Arc's first evaluation line. Ask the Arc booth only if the team is set on Arc; do not plan on it.
4. **Gas Ledger as an alt mempool ERC-20 paymaster, entered for Whitechain Scale and the EF alt mempool.** The alt mempool track lists "ERC20 paymasters, daily quota paymasters" as things only it makes possible, and Whitechain Scale wants gasless USDT. It fails on chains: "Multiple devnets will run during the hackathon" with their own RPCs and explorer ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)), and EIP-8141 frame transactions are not on Whitechain Sepolia, while Whitechain needs the prize USDT paid on 1874. **Judgement:** the paymaster would have to be built twice, once per chain, with nothing shared but the idea (`ideas/ef.md` and `ideas/whitechain.md` both mark it "not combinable").
5. **Breakglass or Upgrade Pass entered for World Agent Pass and EF Best CROPS App.** A guardian gate is "Secure", so CROPS looks natural. Agent Pass requires "Validate identity results in a secure backend; do not expose client secrets" ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)), so the protected action depends on the team's confidential OIDC client and signer. CROPS asks the C line "what you control that the user depends on ... and what happens if it goes away" and scores "structural (works without you) beats cosmetic" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). **Judgement:** the World half needs a server the CROPS half must argue away; `ideas/world.md` (Upgrade Pass: "a backend signer weakens the C in CROPS") and `ideas/ef.md` both list it under "avoid". IDKit verified onchain does not have this problem, but IDKit is the smaller World prize and is not what Breakglass needs.

**Also fails, in one line each (Judgement):** 0G Agents That Pay with Hedera x402 (income settles on Hedera, and nothing moves it into a 0G compute account without a human, `ideas/0g.md`); Truthsign with ENS, Arkiv, Chainlink and EF together (four picks, over the cap); Arkiv Mirror and Node tooling in one submission (only one Arkiv track pays, `ideas/arkiv.md`); Bidproof and Humancap merged (two CCA stories, `ideas/uniswap.md`); Gas Ledger claiming Uniswap through the third-party v3 pool on Whitechain (not a listed Uniswap deployment, `ideas/uniswap.md`).

---

## 6. README and video structure that lets each judge find their part in under a minute

### 6.1 README skeleton (Judgement)

The first screen of every README carries a prize map. Each row links to an anchor further down, and each anchor starts with the requirement in the sponsor's own words, then the evidence.

```markdown
# <Name>: <one-line promise>

| Prize | What the prize asks for | Where it is in this repo | Evidence | Video |
|---|---|---|---|---|
| <Sponsor track> | <their qualification, quoted> | [section](#sponsor-anchor), `path/File.sol#L10-L42` | <tx hash, explorer link, query, simulation log> | 0:40 |

## <Sponsor>: <track name>
Requirement: "<verbatim line>"
How we meet it: <two lines>
Code: <permalinks>
Evidence: <links>
Feedback: <FEEDBACK.md | WHITECHAIN_FEEDBACK.md | WORLD_DEBRIEF.md | /arkiv/friction.md>
```

- One anchor per sponsor, named with the sponsor's own word (`#chainlink-cre`, `#world-id-agent-pass`, `#crops`, `#arkiv`), so the ETHGlobal submission form's per-partner "how you used it" text can link straight to it.
- Sponsor files sit where the sponsor said: `FEEDBACK.md` at the root plus the Uniswap form (Uniswap); `WHITECHAIN_FEEDBACK.md` (Whitechain); `/arkiv/schema.md`, `friction.md` and the criterion files, plus `/arkiv/swarm.md` (Arkiv); a section titled exactly `CROPS` (EF). World asks for a debrief but names no file; `WORLD_DEBRIEF.md` is our choice.
- Every evidence link must survive Saturday: Arkiv entities a judge reads get a lifetime of at least 30 days (`ideas/arkiv.md` judgement).
- AI section: where AI tools were used; if these notes drive the build, commit them under `planning/`, as the details page requires for spec-driven workflows.

### 6.2 Video rules (Judgement)

- Length 2:00 to 2:59 for every combo (meets ETHGlobal, EF CROPS, 0G, Whitechain and Hedera).
- A lower-third label on screen during each sponsor's segment ("Chainlink CCIP 2.0", "World ID Agent Pass") and the same timestamps as YouTube chapters in the description and in the README's Video column.
- The promise in the first 15 seconds; every sponsor segment ends on an explorer link, a revert or a log line that the README also links.
- Human voice only (details page: no AI voiceover).
- Separate finalist script: the 4 minute live demo uses the same order but spends its time on the one memorable moment; partner-specific evidence stays in the README.

---

## 7. Workshop and booth questions that decide these combos

All workshops are on Thu 5 Nov, before hacking starts at 21:00, in two parallel rooms ([event page](https://ethglobal.com/events/mumbai), via `00_current_tracks.md`). Clash pairs: 0G and Hedera (15:30), ENS and Arkiv (16:00), Uniswap and Whitechain (16:30), Arc and EF (17:00), World and 1inch (17:30). Chainlink and Definitive have no workshop; ask at their booths. **Judgement:** pick the combo at dinner (18:30) from these answers, and send one person to each half of a clash pair the chosen combo needs.

Ordered by time. Each question names the combo it decides; fuller lists are in each sponsor file's question section.

| Time, room | Sponsor | Question | Decides |
|---|---|---|---|
| 15:30, Room 2 | Hedera | Does calling Hedera-authored contracts (ATS) through `ContractExecuteTransaction` violate "with no Solidity smart contracts"? Can one project place in two Hedera tracks? For a scheduled `ContractExecute`, is `msg.sender` the schedule's payer? | Combo 4 |
| 16:00, Room 1 | ENS | Which ENSv2 paths are live on mainnet and Sepolia this week (factory resolvers, key-scoped data roles, data records)? After `safeTransferFrom`, is there an intended clean hand-over flow, and does the Explorer show subregistry root holders? Does an analysis-and-enforce tool count as "built on ENSv2"? | Combos 3, 5 |
| 16:00, Room 2 | Arkiv | Is the ERC-7730 registry in scope for Mirror? Does public chain data (ENSv2 role events) satisfy "The data's license allows republishing"? Will Rabdi survive until judging ends? Who hands out Swarm postage batches? | Combos 3, 5 |
| 16:30, Room 1 | Uniswap | Are fork-only CCA and v4 demos with replay commands enough, or do judges want testnet or mainnet hashes? Does a project that defends a CCA it launched count as central? | Combo 1 |
| 16:30, Room 2 | Whitechain | Is there an official source of prize USDT, or does buying it on the WWBT/USDT pool count? Can one project place in both Operate and Scale, and where is the primary declared? Is a pre-funded payer balance acceptable in Scale? | Combo 6 |
| 17:00, Room 2 | EF | Is CROPS still "(tbc: final review pending)", and what changed? Does a CROPS entry that uses Anon-RPC internally get placed in CROPS or Anon-RPC? Is a relayer race plus recorded L1 forced inclusion "structural" C? | Combos 3, 6 |
| 17:00, Room 1 | Arc | Only if the team leans to Arc: is Aqua on Arc usable from Studio, and is an off-Studio leg acceptable? | Tempting combo 3 |
| 17:30, Room 1 | World | Is `https://auth.world.org` the mocked-proof environment for Mumbai, and do mocked identities honour an essential `sub` request in the device flow? Can one project place in both Agent Pass and IDKit? Is "backend validates, then signs a one-time EIP-712 approval" the expected R4 pattern? Do staging IDKit proofs verify onchain, and on which network? | Combos 2, 4, 8 |
| 17:30, Room 2 | 1inch | Does a redeployed `AquaSwapVMRouter` with appended instructions satisfy "Official Aqua/SwapVM contracts"? Which swap-vm tag matches the deployed router? Is a fork video plus a one-command replay enough for "Onchain execution ... during the final demo"? Does a Safe count as the maker? | Combos 1, 7 |
| Booth, any time | Chainlink | Can one project win both CRE and a CCIP 2.0 place? Which testnet lanes accept block-depth finality for data-only messages today? Is a team-built stand-in for an enterprise system acceptable as the "external API, system"? Can `cre workflow simulate` target fork RPCs? | Combos 2, 7 |
| Booth, any time | Definitive | Will Flash accept a 1271 funder whose `isValidSignature` approves a pre-stored digest, and is it checked at settlement and for the bracket's pair signature? Does a `limit` entry with an attached bracket count as an advanced order? | Combo 8 |

---

## 8. Gaps and caveats

- No Mumbai judges are named on the event page (`00_current_tracks.md`); every "what judges reward" line is inferred from past winners in the sponsor files.
- Hour estimates and the person-hour budget are our own judgement, not measured.
- Multi-track wins inside one partner are unconfirmed for every sponsor; the "sum of 1st places" column assumes they are allowed.
- EF CROPS criteria were still marked "(tbc: final review pending)" on 2026-10-31; combos 3 and 6 depend on them.
- Several chain facts come from the sponsor files' own probes on 2026-10-31 (Whitechain pool state, Aqua deployments, CCA factory addresses) and were not rechecked here.
- ETHGlobal pages were not re-fetched for this file. Nothing here fell back to the 2026-10-26 notes, because `00_current_tracks.md` was fetched on 2026-10-31 with no bot check.
