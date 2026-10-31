# ETHGlobal Mumbai: ten finalist ideas for a fresh build (final)

Written 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, Mumbai, alongside Devcon 8 India. Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build only, no existing project.

Fresh builds only: every Continuity-only track was skipped, and no idea below depends on code that existed before Thursday 21:00. Public libraries, SDKs and starter kits are used where named.

## How this file was made

- **Inputs:** the 16 candidates in `track_ideas/finalist_ideas_draft.md` and the three finalist scorecards: `finalist_judges/generalist.md` (founders, VCs and protocol engineers, calibrated on six recent finalists), `finalist_judges/originality.md` (each core claim checked against 320 finalists and the 12 partner histories) and `finalist_judges/feasibility.md` (a senior engineer asking whether a working demo exists at Sat 09:00). Context from `track_combos.md`, `track_combos_check.md`, `workshop_questions.md` and the twelve sponsor files in `ideas/`.
- **Merge rule (from the task):** keep a candidate if the three judge scores average at least 7 and no more than one judge said "drop". Four candidates passed as written. The rule asks for at least ten, so the six best near-misses were revised against the judges' own objections and are marked **Revised**. Their original judge scores are shown unchanged; the "projected" score is this editor's estimate after the revision, not a judge's score.
- **Ranking (Judgement):** candidates that passed as written come first, ordered by average and then by the generalist score, because the generalist panel is the closest match to the finalist room. Revised candidates follow, ordered by original average, then by feasibility.
- **No ETHGlobal page was re-fetched for this pass.** Prize, rule and schedule text is the 2026-10-31 snapshot in `00_current_tracks.md`, whose links point to the live pages. The combo check re-fetched the prizes page once today and found it unchanged. ETHGlobal pages showed Cloudflare checks and HTTP 429 earlier this week (noted in `history/ef.md`, `history/arc.md` and `history/chainlink.md`), so the notes were used instead of fetching again.
- **Fact** lines carry a URL, or name the repo note that carries it. Everything marked **Judgement** is opinion: every score, hour figure, probability and ranking.
- **No code appears in this file.** The Classic rule forbids "prior project-specific code, designs, or assets" ([details page](https://ethglobal.com/events/mumbai/info/details)), and the combo check warns that interfaces written before Thursday read as prior designs (`track_combos_check.md` section 1.1). Everything here is idea level.

## 0. Rules that bound every candidate (Facts)

- "You can apply for a maximum of **3** Partner Prizes for your project"; "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize"; "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize." ([event page FAQ](https://ethglobal.com/events/mumbai))
- "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one." ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it." ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv))
- Partner judging: "partners will evaluate submissions based on the materials you provide." Finalists: "Each team has 7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A with the judges", judged on Technicality, Originality, Practicality, Usability (UI/UX/DX) and WOW Factor. ([details page](https://ethglobal.com/events/mumbai/info/details))
- Video "Must be between 2 and 4 minutes", no AI voiceover; EF CROPS "3 minutes max"; 0G "under 3 mins"; Hedera "5 minutes or less". "Submissions with large single commits or missing histories may be disqualified." ([details page](https://ethglobal.com/events/mumbai/info/details); sponsor pages via `00_current_tracks.md`)
- Main Finalist Judging and Partner Prize Judging both run Sat 7 Nov 09:30 to 12:30. ([event page](https://ethglobal.com/events/mumbai))

**Judgement:** an EF entry uses one of the three partner picks. One video cut between 2:00 and 2:59 serves every stack below. A second track inside one partner is upside until the sponsor confirms it on Thursday.

---

## 1. Merge result: all 16 candidates

Scores are the judges' (Judgement). "Drops" counts judges whose verdict was "drop".

| Draft # | Candidate | Generalist | Originality | Feasibility (P demo) | Average | Drops | Outcome |
|---|---|---|---|---|---|---|---|
| 1 | Truthsign | 8 keep | 8 keep | 8 keep (70%) | **8.00** | 0 | **Passes** |
| 8 | Residue | 7 keep | 8 keep | 8 keep (75%) | **7.67** | 0 | **Passes** |
| 2 | Upgrade Council | 7 keep | 7 keep | 7 keep (60%) | **7.00** | 0 | **Passes** |
| 16 | Regas | 6 revise | 8 keep | 7 keep (60%) | **7.00** | 0 | **Passes** |
| 10 | Walkaway | 8 keep | 6 revise | 6 revise (50%) | 6.67 | 0 | Revised, kept |
| 4 | Greenshoe | 7 revise | 7 keep | 6 revise (50%) | 6.67 | 0 | Revised, kept |
| 6 | Bidproof | 6 revise | 7 keep | 7 keep (80%) | 6.67 | 0 | Revised, kept |
| 14 | Last Out | 6 revise | 8 keep | 6 revise (55%) | 6.67 | 0 | Revised, kept |
| 5 | Reserve Gate | 6 revise | 6 revise | 6 revise (55%) | 6.00 | 0 | Revised, kept |
| 7 | HookBreak | 6 revise | 5 revise | 6 revise (45%) | 5.67 | 0 | Revised, kept (conditional) |
| 15 | Witness | 6 revise | 6 revise | 5 revise (45%) | 5.67 | 0 | Cut; first alternate |
| 9 | Lanes | 4 drop | 7 keep | 4 revise (35%) | 5.00 | 1 | Cut |
| 3 | Pause Fast, Unpause By A Person | 5 revise | 5 revise | 4 revise (35%) | 4.67 | 0 | Cut; second alternate (trimmed) |
| 11 | Issuer Brake | 4 drop | 6 revise | 3 drop (25%) | 4.33 | 2 | Cut (two drops) |
| 12 | Gas Ledger | 3 drop | 4 drop | 5 revise (65%) | 4.00 | 2 | Cut (two drops) |
| 13 | Hundi | 4 drop | 3 drop | 5 revise (80%) | 4.00 | 2 | Cut (two drops) |

**Judgement on the cut line.** HookBreak and Witness tie at 5.67. HookBreak takes the tenth place because the team's fuzzing craft is the whole product and its feasibility score is higher; Witness depends on hardware, which none of the three judges thinks this team can carry. HookBreak is kept only with a hard gate (section 3.10), and Witness is the named replacement if that gate fails.

## 2. The ten at a glance

Columns other than the prize stack are Judgement.

| Rank | Idea | Status | One-liner | Partner picks (max 3) | Judge avg | Projected after revision | Difficulty | P(demo) |
|---|---|---|---|---|---|---|---|---|
| 1 | Truthsign | Passes | The signing screen must match what the transaction does, or the wallet refuses | EF (Best CROPS App), Arkiv (Mirror + Swarm bonus) | 8.00 | n/a | Medium-high | 70% |
| 2 | Residue | Passes | Buy an ENSv2 name and nobody else keeps a key to it | ENS (Best Use of ENSv2), Arkiv (Mirror) | 7.67 | n/a | Medium | 75% |
| 3 | Upgrade Council | Passes | The AI holds the deploy key and still cannot slip a hidden sweep into the vault | World (Agent Pass + IDKit) | 7.00 | n/a | Medium | 60% |
| 4 | Regas | Passes | Same signature, two testnets: one did what you asked, one said success and did nothing | None (finalist only); EF CROPS long shot | 7.00 | n/a | High | 60% |
| 5 | Walkaway | Revised | This file tells you who can still stop your exit, then proves it by taking real money out of Aave with every site blocked | EF (Best CROPS App), Uniswap Foundation | 6.67 | 7.3 | Medium | 50% to 60% |
| 6 | Greenshoe | Revised | An IPO greenshoe for token launches, paid for by the launch's own buyers, enforced by bytes | 1inch (Aqua), Uniswap Foundation | 6.67 | 7.0 | Medium-high | 50% to 60% |
| 7 | Bidproof | Revised | Every real token auction checked, and a bid that refuses a rigged one | Uniswap Foundation | 6.67 | 7.0 if at least about 10 real auctions exist | Medium | 80% |
| 8 | Last Out | Revised | Before you copy, see that the leader's ranked position is locked behind yours | Definitive (Flash social), World (IDKit) | 6.67 | 7.0 | Medium | 55% to 65% |
| 9 | Reserve Gate | Revised | The price and the rate said 1:1; the vault behind the token held 26 cents on the dollar; only one maker refused | 1inch (Aqua), Chainlink (CRE) | 6.00 | 7.0 if CRE reads local forks | Medium | 55% |
| 10 | HookBreak | Revised, conditional | A generic fuzzer rediscovers a compounding hook exploit on the real block | Uniswap Foundation | 5.67 | 6.7 if a Bunni-class drain reproduces; otherwise Uniswap-only | High | 45% |

---

## 3. The ten in full

Each entry gives the promise, the 20 second hook, a 4 minute demo with the moment that proves the claim, the prize stack, why now, the closest prior finalists, the three judge scores and notes, difficulty, risks and fallbacks, and the Thursday question that decides it. For entries that passed, the judges' "single most important fix" is already applied. For revised entries, a "What the revision changed" line lists each objection and its fix.

---

### 3.1 Truthsign: the signing screen must match what the transaction does (passes, 8.00)

**Promise.** For any transaction a wallet is about to clear-sign, Truthsign runs it on a fork and refuses clear signing if any field the ERC-7730 descriptor puts on screen disagrees with the effect, or if the transaction moves value or grants an approval the screen never mentions. Across the public registry we publish how many descriptor fields disagree with their contracts, including zero, each with a one-line replay command.

**20 second hook.** "WazirX's signers approved a screen that lied, and Bybit's frontend served one. We checked every descriptor in the public clear-signing registry: here is the count. Now watch a tampered frontend serve one that says 'pay alice.eth' while the money goes to a stranger. The wallet refuses."

**4 minute demo (judge fixes applied).**
- 0:00 The sweep header first, as the originality judge asked: descriptors checked, fields fuzzed, disagreements found, and "effect not displayed" findings, whatever the real count is.
- 0:20 **The moment that proves it:** a tampered frontend serves a malicious descriptor (the Bybit shape, not a descriptor the team says it "wrote wrong"). Left pane: "Swap 100 USDC, beneficiary alice.eth". Right pane: the fork's Transfer log pays 0xA77. The wallet refuses to clear-sign and drops to raw calldata with a red reason. Lands by 0:55.
- 1:00 Completeness: the same call bundled with an unlimited `approve` the screen never shows; refused for "effect not displayed".
- 1:40 A judge picks any row of the sweep; its replay command re-runs on the saved fork state.
- 2:20 The honest green path: the real registry descriptor for Uniswap V3 SwapRouter `exactInputSingle` (flat fields) renders and passes.
- 2:50 The CROPS lines on one slide: the fork source is a stated trust assumption; ENS-free lookups go through Anon-RPC; descriptors and verdicts are also served from Arkiv. The GitHub-off Arkiv moment stays in the Arkiv video, not the live 4 minutes.
- 3:30 Limits: Vyper selector checks marked "not checked"; formats outside the renderer subset show "not verified", never green.

**Prize stack.**
- Facts: EF "Best CROPS App": "Build an app, wallet feature or dev tool where one CROPS property is the reason it exists, without giving up the other three"; a README section "titled CROPS"; a video "3 minutes max"; "No third-party trackers"; criteria still "(tbc: final review pending)" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). Arkiv "Mirror something Ethereum depends on": "The data's license allows republishing"; "Your import script is in the repo, and we can re-run it"; the Swarm bonus can come on top ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)). The registry is CC0-1.0 ([registry](https://github.com/ethereum/clear-signing-erc7730-registry)).
- Judgement: two partner picks. The optional Chainlink CRE third slot is dropped, as the feasibility judge advised: it buys a single $1,500 prize with hours the video needs. ENS was already dropped by the combo check.

**Why now.** Facts: the EF says clear signing still needs "accuracy verification and expert attestations" ([EF blog, 12 May 2026](https://blog.ethereum.org/en/2026/05/12/clear-signing-announcement)). Trezor shipped ERC-7730 on 8 Sep 2026 and falls back to blind signing with a warning ([Crypto Briefing](https://cryptobriefing.com/trezor-clear-signing-erc-7730/)). Binance lost about $6.36B on 29 Oct 2026 through signed EIP-7702 authorizations ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). Bybit's attackers "modified Safe{Wallet}'s front-end JavaScript files" ([SlowMist](https://slowmist.medium.com/bybits-1-5-billion-theft-unveiled-safe-wallet-front-end-code-tampered-84b78f0fa9c2)). DefiLlama lists WazirX, 18 Jul 2024, $234.9M, "Signer Phishing" ([DefiLlama hacks API](https://api.llama.fi/hacks)).

**Closest prior finalists and winners (Facts, via `finalist_judges/originality.md`).** [Octopus AI](https://ethglobal.com/showcase/octopus-ai-2xcne) (Trifecta 2025 track finalist, AI co-signer that rejects malicious Safe proposals); [maki](https://ethglobal.com/showcase/maki-564eg) (Cannes 2026, "every write is simulated"); [LeekDIYHardwareWallet](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg) (ETHOnline 2026, refuses what it cannot display); [Safe City](https://ethglobal.com/showcase/safe-city-qbgmm) (Brussels 2024, Chainlink winner, safety score before you interact); [S.C.I](https://ethglobal.com/showcase/s-c-i-0760q) (Istanbul 2023, domains declare their contracts); [Clear Signing Studio](https://ethglobal.com/showcase/clear-signing-studio-6hs1z) (Cannes 2025, generates descriptors, does not verify them); [ENShell](https://ethglobal.com/showcase/enshell-6t95y) (Cannes 2026, used ERC-7730 for its own verdicts). Judgement: nobody checks a descriptor against the effect; the refusal surface is familiar, so the sweep number must lead.

**Judge scores and notes (Judgement).**
- Generalist **8, keep:** "The screen said Alice, the money went to a stranger, the wallet refused" lands by 0:55. Fix: make the planted case the real attack (a tampered frontend or a malicious registry submission), open the sweep card at once, cut the GitHub-off beat from the live slot.
- Originality **8, keep:** new core claim; the refusal alone reads as maki or Octopus AI. Fix: lead with the differential count, then the refusal as its consequence.
- Feasibility **8, keep, P(demo) 70%:** no Universal Router descriptor appeared in the registry's Uniswap folder when fetched today, and its nested command calldata renders badly; use V3 SwapRouter. Validate with Ledger's `python-erc7730` instead of writing a validator (saves 3 to 4 hours). Fork from a saved Anvil state.

**Difficulty (Judgement).** Medium-high, about 46 to 50 person-hours after the fixes: renderer subset 6 to 7 (validator reused), fork effect extraction and field fuzzing 14, Arkiv importer and checker 12, demo wallet 8, sweep and disclosure 6. Gates: hours 0 to 4, render three Trezor-launch descriptors and extract their effects on a fork; Arkiv write and read on Rabdi by Fri 01:00 IST.

**Risks and fallbacks (Judgement).** The sweep finds zero "wrong field" cases: report zero honestly and lead with "effect not displayed" findings, which are likelier. The sweep does not finish: scope to the six Trezor-launch protocols and state the denominator. Arkiv down Saturday: the wallet reads a signed local snapshot, labelled. Any live finding is disclosed to the registry maintainers before the demo, and the stage shows counts, not protocol names.

**Thursday question that decides it.** EF 17:00 Room 2: is the CROPS rubric final, and does a library a wallet calls before rendering compete equally with an end-user app? Arkiv 16:00 Room 2: is the ERC-7730 registry in scope for Mirror, and what are the per-entity quota units? (`workshop_questions.md` sections 4.4 and 4.8)

---

### 3.2 Residue: buy an ENSv2 name and inherit nobody (passes, 7.67)

**Promise.** If `settle()` succeeds, no address except the buyer can change the name's address or text records, register or remove its subnames, or upgrade the contracts behind either. The invariant suite tries every role, link, operator and upgrade path we know of, and for any key the lens returns every name where it still holds a role, matching the onchain role count or marked UNKNOWN.

**20 second hook.** "You bought the house and the seller kept a key. ENSv2 went live last week, and in ENSv2 a transfer moves the name, not the control. A judge clicks Buy, and our escrow refuses: the seller could still hand out `pay.shop.eth` to himself after the sale."

**4 minute demo (judge fixes applied).**
- 0:00 The house-key sentence. No "subregistry", "EAC" or "emancipated" on stage.
- 0:20 A teammate lists `shop.<team>.eth` on Sepolia; a judge clicks Buy.
- 0:45 **The moment that proves it:** `settle()` reverts and names what the seller still controls and through which path, using the residue that survives `safeTransferFrom` (confirmed at the ENS workshop). The seller hands control over; settle succeeds; the old seller's attempt to create `pay` fails on screen.
- 1:50 A judge pastes any mainnet ENSv2 name into the lens: every key that can still change what, each line linked to the event that proves it (cached copy as fallback).
- 2:40 Reverse lookup through the Arkiv mirror: every name where this key still holds a role (only if the Arkiv gate passed).
- 3:10 Invariant counts, UNKNOWN semantics, and which transfer path leaves which residue.
- Never called a "name marketplace", as the originality judge warned.

**Prize stack.**
- Facts: ENS "Best Use of ENSv2" ($3,000 / $2,000 / $1,000 / $1,000): "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values"; "a link to a live demo" ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)). Arkiv Mirror as in 3.1 ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).
- Judgement: two picks. ENS's four places make it worth more per hour than its 1st-place figure suggests (`track_combos_check.md` section 1.3). Expect at most 2nd from Arkiv.

**Why now.** Facts: "Today, ENSv2 is live on Ethereum mainnet", 27 Oct 2026 ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)); "ENSv2 is now live on Ethereum mainnet. Be among the first to build on it." ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)). "`safeTransferFrom` reverts with `TransferUnsafeUntilRegistryIsEmancipated` or `TransferUnsafeWithMultipleAssignees`; `unsafeTransfer` skips both" ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)).

**Closest prior finalists and winners (Facts).** [SubnodeSymphony](https://ethglobal.com/showcase/subnodesymphony-91p6r) (NY 2023, ENS winner, subname auctions from escrow) and [rent.eth](https://ethglobal.com/showcase/rent-eth-asm1t) (Bangkok 2024, name rentals), which `history/ens.md` says to avoid without "a new rule"; [ENS Drive](https://ethglobal.com/showcase/ens-drive-qu2m2) (Tokyo 2026, ENSv2 2nd, inherited roles with differential fuzzing); [Verdict.eth](https://ethglobal.com/showcase/verdict-eth-zsmpv) (ETHOnline 2026, 3rd); [Capsule](https://ethglobal.com/showcase/capsule-yq59u) (ETHOnline 2026); [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, ENSv2 3rd). Judgement: `history/ens.md` records "who can still change it after a sale" as a question no past winner addressed.

**Judge scores and notes (Judgement).**
- Generalist **7, keep:** a judge's own click and a concrete reason by 0:45. Risk: small stakes, and thin real data after one week. Fix: house-key metaphor first, no jargon; if only `unsafeTransfer` leaves residue, drop to a 6 and enter ENS only, not as the finalist lead.
- Originality **8, keep:** the escrow is the "new rule" marketplaces lacked. Fix: lead with a residue that survives `safeTransferFrom`.
- Feasibility **8, keep, P(demo) 75%:** the escrow and invariant suite are the team's strongest skill; the role walker reads one week of logs. Fix: escrow and lens first, Arkiv only after the hour-4 gate; host the demo statically with a public RPC fallback list.

**Difficulty (Judgement).** Medium, about 45 person-hours core plus about 14 for Arkiv. Gate: hours 0 to 4 on a Sepolia fork, test all three transfer paths and record which residue survives each.

**Risks and fallbacks (Judgement).** Only `unsafeTransfer` leaves residue: the claim narrows to "for every sale that uses `unsafeTransfer`", and Residue stops being the finalist lead; pivot to Moving Day on the same walker (`ideas/ens.md` rank 2). Arkiv rules chain events out of "license allows republishing": enter ENS alone. ENS confirms a clean hand-over flow already shown in its Explorer: rank it below Moving Day.

**Thursday question that decides it.** ENS 16:00 Room 1: after `safeTransferFrom` can the seller keep root roles on the subregistry and the resolver pointer, is there an intended clean hand-over flow, and does a project that inspects and enforces ENSv2 state count as built on ENSv2? (`workshop_questions.md` section 4.3, items 4 and 5)

---

### 3.3 Upgrade Council: the agent holds the deploy key and still cannot change code that holds money (passes, 7.00)

**Promise.** The AI coding agent holds the deployer key and still cannot upgrade the vault proxy. An upgrade lands only with a fresh Agent Pass approval from a named engineer plus that engineer's own key, enrolled to the council with a distinct Proof of Human. An approval for implementation A cannot install implementation B, a second key for an already-seated human is refused, and a denied, expired or wrong-person approval leaves the proxy unchanged.

**20 second hook.** "Drift lost $295M to a proxy upgrade. Our agent ships code all day and holds the deploy key. This upgrade adds a function that can empty the vault. Watch the engineer's phone say so in plain words, and the chain refuse until a real person says yes."

**4 minute demo (judge fixes applied).**
- 0:00 The Drift line; an agent with full deploy rights on Sepolia; a vault behind a proxy.
- 0:25 **The moment that proves it:** the agent runs its upgrade; the upgrade card appears by 0:30 in plain words ("this upgrade adds a function that can empty the vault", "this upgrade overwrites where balances are stored"); the engineer denies; the proxy is unchanged. Lands by 0:55.
- 1:00 A prompt-injected "release note" makes the agent retry with `sweep` renamed; the card catches it again.
- 1:40 A clean build is approved and lands; the same approval replayed against a tampered implementation reverts.
- 2:20 IDKit chapter, short: a second laptop key for the same engineer is refused.
- 2:50 Foundry suite counts (replay, expiry, wrong hash, wrong approver, forged signature) and limits.
- "Proxy" is said once; "OIDC" never. The two-signature rule and the nullifier are for Q and A.

**Prize stack.**
- Facts: World "World ID Agent Pass" ($2,500 / $1,500 / $1,000): "Integrate with the official World ID Agent Pass"; "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur"; "Validate identity results in a secure backend; do not expose client secrets"; proofs are mocked ("We are mocking proofs now, so you don't need sandbox app anymore"). "Best Use of IDKit" ($1,250 x 2): "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance." ([World prizes](https://ethglobal.com/events/mumbai/prizes/world))
- Judgement: one partner, two tracks. No EF prize: the backend weakens the C in CROPS (`track_combos.md` section 5, item 5). Optional second partner if hours allow: Chainlink CRE as Veto Window (`ideas/chainlink.md` CRE rank 2), noted in `track_combos.md` as coherent but weaker.

**Why now.** Facts: Drift, 1 Apr 2026, $295M, "proxy upgrade hijack" ([DefiLlama hacks](https://defillama.com/hacks); [TRM Labs](https://trmlabs.com/resources/blog/north-korean-hackers-attack-drift-protocol-in-285-million-heist)). World bundled World ID for Agents into a suite for banks on 18 Oct 2026 ([The Block](https://www.theblock.co/news/ecosystems/2026-10-18-world-launches-world-id-suite-banks-418869)). AI agents were the primary tag on 13 of 53 finalists in 2026 ([ETHOnline 2026 showcase](https://ethglobal.com/showcase?events=ethonline2026), via `finalists_2026.md`).

**Closest prior finalists and winners (Facts).** [Airlock](https://ethglobal.com/showcase/airlock-ph6bx) (Tokyo 2026, World ID for Agents: approval bound to a payload hash); [Surety](https://ethglobal.com/showcase/surety-ms4gx) (Tokyo 2026, live prompt injection plus onchain enforcement); [Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h) (Lisbon 2026, Selfie Check Beta 2nd: a human check before an agent's git commit; `history/world.md` section 3.3; the originality scorecard dates it Tokyo, the history file says Lisbon); [maki](https://ethglobal.com/showcase/maki-564eg), [Omamori](https://ethglobal.com/showcase/omamoris-rn3nc), [Cordon](https://ethglobal.com/showcase/cordon-vw3kh) (agent limits on spending, not code). `history/world.md` section 7: no World entry gated a contract upgrade. Judgement: the pattern is shown; the object (an upgrade that holds money) and the bytecode witness are new.

**Judge scores and notes (Judgement).**
- Generalist **7, keep:** fits the agent wave and the Drift loss; risk of reading as one more approval app. Fix: the upgrade card is the star by 0:30.
- Originality **7, keep:** name Airlock and Commitment Issues in the README as the pattern being extended.
- Feasibility **7, keep, P(demo) 60%:** use `@openzeppelin/upgrades-core` for the storage layout diff instead of writing one (halves the witness estimate); mask immutables and strip metadata before comparing code hashes; in hour 1 get one validated ID token for each of two mocked humans, or switch to the code flow.

**Difficulty (Judgement).** Medium, about 40 to 45 person-hours with the reused layout diff: gate and tests 9, bytecode witness 5 to 6, device or code flow 6, IDKit enrollment 7, card UI 8, debrief and README 4.

**Risks and fallbacks (Judgement).** Only one mocked human: the wrong-person beat dies; keep the replay-against-tampered-implementation beat, which needs no second human, or fall back to Breakglass (`ideas/world.md` rank 2). World says one project places in one track only: enter Agent Pass alone. A mocked session expires before the slot: re-authenticate both phones minutes before going on.

**Thursday question that decides it.** World 17:30 Room 1: can mocked identities produce two distinct, stable `sub` values; can one project place in both World tracks; is "backend attestation plus an IDKit-enrolled key" an acceptable R4 pattern; is a coding agent running a deploy script "agentic" enough? (`workshop_questions.md` section 4.9)

---

### 3.4 Regas: the transaction that works on Hoodi and silently loses its inner call on Sepolia (passes, 7.00)

**Promise.** For a contract and a set of its transactions, Regas executes each one under today's gas rules and under Glamsterdam's rules and lists every transaction whose inner-call outcome changes while the outer call still succeeds. On a widely used open-source forwarder template, deployed by the team, the same signed request with the same gas limit executes on Hoodi and is silently lost on Sepolia, and Regas flagged it before we sent it.

**20 second hook.** "Ethereum's core developers paused a network upgrade last week because new gas rules might break safeguards in live contracts. Same contract, same signature, same gas: on one testnet your action happens, on the other the contract says success and your action never happened. Regas tells you before mainnet does."

**4 minute demo (judge fixes applied).**
- 0:00 The EF's delay notice on screen; no EIP numbers spoken.
- 0:25 An unmodified public forwarder template, deployed identically on Hoodi (pre-Glamsterdam) and Sepolia (Glamsterdam live). Not a contract written to fail.
- 0:55 Regas runs the corpus under both rule sets through `eth_call` with state overrides on each chain; one row flips red: "outer success, inner out of gas, nonce consumed".
- 1:30 **The moment that proves it:** the same signed request goes to both chains; on Hoodi the user's action lands; on Sepolia the forwarder reports success, the nonce is burned, the action never happened; explorer links side by side (pre-sent copies as fallback).
- 2:30 The fix (a gas check that accounts for the new state-gas dimension) and the re-run, all green.
- 3:00 A population count over verified mainnet contracts with the same guard shape (the shape ChainSecurity's warning describes), counts only, no names.
- 3:30 Limits: each flip is attributed by trace, not assumed.

**Prize stack.**
- Facts: "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize" ([event page FAQ](https://ethglobal.com/events/mumbai)); 26 of 53 finalists in 2026 showed no partner prize (`research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2026.md`).
- Judgement: finalist only by design. EF "Best CROPS App" leading on S is a long shot, entered only if the EF workshop says protocol-safety dev tools compete.

**Why now.** Facts: Glamsterdam is live on Sepolia since 6 Oct 2026 and Hoodi was postponed "to allow for further investigation of interactions of EIP-8037 with mainnet smart contracts" ([EF blog, 22 Oct 2026](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay)). ChainSecurity raised the gas-griefing risk on 13 Oct and found 13 susceptible production contracts; rescheduling is expected after Devcon ([Parameter](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/)). EIP-8037 and EIP-8038 are in Last Call until 1 Nov 2026 ([EIP-8037](https://eips.ethereum.org/EIPS/eip-8037); [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)). revm enables EIP-8037 for the AMSTERDAM spec ([revm v108 release notes](https://newreleases.io/project/github/bluealloy/revm/release/v108); found by web search in the feasibility pass, versions not checked against the official repo).

**Closest prior finalists and winners (Facts).** [forge flamegraphs](https://ethglobal.com/showcase/forge-flamegraphs-0gr0p) (Scaling Ethereum 2024, gas profiling); [EVMTrace](https://ethglobal.com/showcase/evmtrace-z6vh8) (Circuit Breaker 2024); [TARE](https://ethglobal.com/showcase/tare-ozced) (ETHOnline 2026, replayable measurements); [LPlens](https://ethglobal.com/showcase/lplens-7sijq) (2026). No partner history mentions a hardfork regression tool. Judgement: the tool is new; the insight was published by an audit firm, so the timing earns more credit than the idea.

**Judge scores and notes (Judgement).**
- Generalist **6, revise:** protocol engineers love it; VCs drop out at "EIP-8037"; a forwarder the team wrote looks planted; Hoodi may activate before Saturday. Fix: no EIP numbers on stage, lead with the lost action, back it with a population count, recheck Hoodi on Thursday morning.
- Originality **8, keep:** deploy an unmodified, widely used public forwarder template so the evidence is not only a contract built to fail.
- Feasibility **7, keep, P(demo) 60%:** dual `eth_call` with state overrides on Sepolia and Hoodi runs code under each chain's real live rules, removing the hunt for a local EVM; check before Thursday that public RPCs accept state overrides.

**Difficulty (Judgement).** High, about 45 to 50 person-hours once the local EVM search is dropped. Gate: hours 0 to 4, reproduce one inner-call flip on the public template between Hoodi and Sepolia; abandon by Fri 01:00 IST if none.

**Risks and fallbacks (Judgement).** Hoodi activates Glamsterdam before Saturday: the two-testnet contrast disappears; fall back to the dual-rule `eth_call` table plus a pre-activation recording, and say so. No flip reproduces: abandon; this is the riskiest of the four that passed. The state-gas reservoir behaves differently from what a `gasleft()` guard expects: that is itself a finding, but the demo needs a flip. Never name third-party contracts.

**Thursday question that decides it.** Thursday morning, before the event: has Hoodi's Glamsterdam date been set (EF blog and All Core Devs notes)? EF 17:00 Room 2: would a gas-rule regression tool be welcome in any EF prize? (Not in `workshop_questions.md`; see INDEX section 8.)

---

### 3.5 Walkaway: who can still stop your exit, proved with every site blocked (revised, 6.67, projected 7.3)

**Promise.** For a wallet's positions in Aave and a Uniswap v4 pool, Walkaway names the exact key, keeper or hook permission that can still stop the exit, and proves each one on a fork with that party switched off. With app.aave.com, the Uniswap interface and the major RPC hosts blocked, the same local file takes a real $5 mainnet position out of Aave, with reads through Anon-RPC.

**20 second hook.** "Etherscan is a website too, and we blocked it. This file tells you who can still stop you from leaving: this hook can refuse your withdrawal, this keeper can freeze your queue. Then, with every site and RPC company blocked on this laptop, it takes real money out of Aave."

**4 minute demo (revised).**
- 0:00 Hosts file edited on screen: `app.aave.com`, the Uniswap interface, Etherscan and the big RPC hosts fail to load.
- 0:20 `walkaway.html` opens; the verdict card is the headline: the v4 position's pool hook holds `beforeRemoveLiquidity` permission; red, with the hook address and what it can refuse.
- 0:45 **The moment that proves it:** a real $5 Aave position withdraws on mainnet through the file; a phone off the venue network confirms on the explorer. Lands by 1:00, next to the verdict.
- 1:30 A fork with a vault's keeper switched off: the withdrawal queue never pays; the card names the keeper.
- 2:20 The Etherscan answer, unprompted: Etherscan's write tab is blocked too, and it cannot tell you a hook can trap your LP.
- 2:50 The CROPS lines: what remains in the path (our own Anon-RPC gateway, the signing wallet) and which RPC the broadcast used.

**What the revision changed.**
- Originality 6 ("the EF lists the frontend that survives; Trust Issues did exit-without-operator"): the headline is now "who can still stop you", the part nobody has shown; the blocked-sites withdrawal becomes the proof that the file works. Trust Issues and RageQuit Kit go into the README's prior art.
- Generalist note ("the original part arrives at 1:50"): the verdict now opens at 0:20 and sits next to the money moment.
- Feasibility 6 (tor-js gateway on port 12298 and a demo gateway that "may disappear"; untested `file://` origin; specifier read with RPC hosts blocked): run the team's own tor-js gateway on a VPS on port 443; pin the worker hash in the file (the Privacy Pools pattern); test `file://` in hour 1, and if it fails ship the file plus a two-line local static server and say so in the CROPS section. Phone hotspot, pre-warmed worker, recorded fallback for the 0:45 beat.

**Prize stack.**
- Facts: EF "Best CROPS App": the listed idea "a frontend that keeps working when its domain, backend or RPC provider disappears"; "structural (works without you) beats cosmetic (a setting)" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). Uniswap Foundation "Build with Uniswap" ($4,000 / $3,000 / $2,000 / $1,000): scope includes "tooling or solutions built for the broader ecosystem"; FEEDBACK.md and the feedback form ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- Judgement: two picks; the EF may place it in Anon-RPC instead, which is fine. This stack was checked in the draft, not by the combo checker; no chain or rule conflict found.

**Why now.** Facts: the EF Mandate asks layers to keep working "even if the Foundation and today's core developers disappeared tomorrow" ([Mandate PDF](https://ethereum.foundation/ef-mandate.pdf)). Anon-RPC 0.4.0 packages reached npm on 28 Oct 2026 ([browser-harness](https://www.npmjs.com/package/@anon-rpc/browser-harness)).

**Closest prior finalists and winners (Facts).** [Trust Issues](https://ethglobal.com/showcase/trust-issues-3wnx4) (Bangkok 2024, Unichain 1st, force-exit an L2 through L1 escape hatches); [RageQuit Kit](https://ethglobal.com/showcase/ragequit-kit-jb53p) (Buenos Aires 2025, 1inch API winner); [UNSU](https://ethglobal.com/showcase/unsu-o1e71) (NYC 2026 finalist, Continuity, a wallet with no app or account); [Carte Bleue](https://ethglobal.com/showcase/carte-bleue-ftuuc) (Lisbon 2026 finalist); [BackItUp](https://ethglobal.com/showcase/backitup-oghff) (ETHIndia 2023, EF 1st).

**Judge scores and notes (Judgement).**
- Generalist **8, keep:** "They blocked Aave's site and took real money out of Aave from a USB stick"; the UNSU and Carte Bleue pattern with real money; highest Usability and WOW in the file.
- Originality **6, revise:** sponsor-listed, so several look-alikes in the room; the original element is naming who can still stop the exit.
- Feasibility **6, revise, P(demo) 50%:** three integration risks outside the team's craft (file origin, specifier read, Tor-accepting broadcast RPC).
- Projected after revision (editor): Generalist 8, Originality 7, Feasibility 7.

**Difficulty (Judgement).** Medium, about 45 to 50 person-hours plus a VPS gateway (2 to 3 hours). Gate: hours 0 to 4, one Anon-RPC read from the single file under `file://`, and one raw Aave withdrawal broadcast.

**Risks and fallbacks (Judgement).** Tor latency on venue Wi-Fi: own gateway on 443 and a hotspot. Colibri through the worker does not compose: a two-endpoint cross-check, stated. Broadcast RPC refuses Tor exits: sign raw and broadcast through the worker, or name the RPC used.

**Thursday question that decides it.** EF 17:00 Room 2: does a single-file exit tool count as a CROPS App, must writes go through Anon-RPC for traffic share, and where would the EF place it? (`workshop_questions.md` section 4.8, items 3 and 5)

---

### 3.6 Greenshoe: an IPO stabilisation book for a token auction, funded by its own overallotment (revised, 6.67, projected 7.0)

**Promise.** For 30 days after a Uniswap CCA graduates, while the bid budget lasts, nobody can sell the token into the issuer's book below 97% of the clearing price or buy the issuer's tokens below 103% of it. Every USDC paid out arrives in the same transaction as the tokens, the budget grows by exactly what the overallotment raised, and after day 30 the strategy quotes zero on both sides.

**20 second hook.** "This is disclosed, time-boxed price support: the same rule regulated IPOs use, called a greenshoe. Watch a whale dump 5% of supply. Every fill lands exactly on the line, paid for by the launch's own buyers, and the cash never left the issuer's wallet."

**4 minute demo (revised).**
- 0:00 The manipulation answer first, in one sentence (disclosed, time-boxed, every parameter in the program bytes), as the generalist asked.
- 0:15 **The moment that proves it:** on a saved Base fork state where the CCA already graduated, a whale dumps 5% of supply; one scripted arbitrage taker's fills print on the 0.97 line; the book's USDC falls as its token balance rises. Lands by 0:30.
- 0:50 Rewind: where the budget came from; the overallotment side sold at 1.03 and the "remaining defence" counter rose by exactly the USDC received.
- 1:40 The budget runs out on screen and the band stops holding, as promised.
- 2:20 Warp 31 days: the same dump finds a zero quote and reverts "window closed".
- 2:50 The one-sentence difference from watermark and Brick Finance (anchored to the auction's own clearing price, funded only by overallotment, expires), the fork test pinning the anchor, and 1inch CoreInvariants.

**What the revision changed.**
- Generalist (proof moment at 1:30; manipulation question unanswered): open on the dump by 0:30; answer manipulation in the first 15 seconds.
- Originality (the structure is watermark's; a floor bid and a band lost at Tokyo): README and demo name watermark, Brick Finance, Holster and Burra Vault and state the three-part difference.
- Feasibility 6 (three unfamiliar systems on one fork; long Anvil replay): graduate the CCA once on Friday morning and `--dump-state` it; replace "every arbitrage fill across the v4 pool and Aqua" with one scripted taker whose fills are printed; use an EOA maker until 1inch confirms a Safe counts.

**Prize stack.**
- Facts: 1inch "Build an Aqua App" ($2,500 / $1,500 / $1,000): "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)"; "Onchain execution of token transfers should be presented during the final demo (local forks are ok)" ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)). Uniswap Foundation "Build with Uniswap": scope includes "CCA" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- Judgement: combo 1 in `track_combos.md`, rated "Sound" by the checker; no mainnet fill. Uniswap centrality is moderate: expect 3rd or 4th there.

**Why now.** Facts: Aqua opened to all users on 28 Jul 2026 ([Decrypt](https://decrypt.co/374533/1inchs-shared-liquidity-layer-aqua-goes-live)). CCA launched in Nov 2025 and gained no-code creation in Jun 2026 ([The Block](https://www.theblock.co/post/378864/uniswap-continuous-clearing-auctions); [ChainCatcher](https://www.chaincatcher.com/en/article/2273518)).

**Closest prior finalists and winners (Facts).** [watermark](https://ethglobal.com/showcase/watermark-68230) (Tokyo 2026, 1inch 3rd and finalist, a DAO Safe quoting both sides on Aqua); [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, Uniswap 1st, CCA that opens a v4 pool); [Lotus](https://ethglobal.com/showcase/lotus-9vnou) (NYC 2026, 1inch 2nd); [Holster](https://ethglobal.com/showcase/holster-hmwie) (Tokyo 2026, TWAP band, no prize); Brick Finance (Tokyo 2026, standing floor bid, no prize, `history/uniswap.md`); [Burra Vault](https://ethglobal.com/showcase/burra-vault-ptohp) (LFGHO 2024 finalist).

**Judge scores and notes (Judgement).** Generalist **7, revise** (VCs know "greenshoe"; Aqua has a strong finalist record). Originality **7, keep** (new idea on a familiar chassis). Feasibility **6, revise, P(demo) 50%** (most Wi-Fi-proof DeFi demo once state is saved). Projected after revision (editor): 7, 7, 7.

**Difficulty (Judgement).** Medium-high, about 50 to 55 person-hours including about 5 for Uniswap. Gate: hours 0 to 4, graduate one CCA on a Base fork and read a non-zero clearing price; one Aqua fill through the redeployed router.

**Risks and fallbacks (Judgement).** 1inch rejects appended opcodes: one external instruction target on the deployed router. 1inch rejects a contract maker: the issuer's EOA. Both CCA and router fail by Fri 01:00 IST: pivot to Replica on the same harness (`ideas/1inch.md` rank 3).

**Thursday question that decides it.** 1inch 17:30 Room 2: does a redeployed router with appended opcodes count as official, may a Safe be the maker, and are instructions that write storage in swaps acceptable? (`workshop_questions.md` section 4.10)

---

### 3.7 Bidproof: every real CCA checked before you bid, and a bid that refuses a rigged one (revised, 6.67, projected 7.0 if the population is real)

**Promise.** For every auction the v2 factories created on Ethereum, Base, Unichain and Arbitrum, our table states its final-step share, tick spacing against floor, token transfer behaviour, validation hook and LP recipient lock, and one command recomputes any row from chain state at the stated block. The same bid that fills on an honest auction reverts on a rigged one, and for any auction marked "handoff movable" we push the handoff price by the stated amount on a fork in front of you.

**20 second hook.** "Uniswap's own docs say checking a token auction is the bidder's job, and you cannot leave before it ends. Nobody built the checker. Here is every real auction, checked. Pick a row."

**4 minute demo (revised).**
- 0:00 The docs quote and the scan header with the real counts, counted before Thursday.
- 0:25 A judge picks a row; its replay recomputes from the committed scan output at the stated block (`--live` optional).
- 1:00 **The moment that proves it:** two auctions of the same token from the real factory on a Sepolia fork: the honest one fills; the rigged one (final step 0.2% of supply, LP recipient a bare EOA) reverts with the failed rules named. Lands by 1:20.
- 2:00 The simulator spends the printed amount in the last block; the v4 pool initializes at the predicted tick.
- 2:40 Who loses, stated exactly: last-block buyers and whoever trades the seeded pool.
- 3:10 FEEDBACK.md highlights and the optional `uniswap-ai` skill PR.

**What the revision changed.**
- Generalist 6 ("let the hour-4 count decide"; generalists do not know what a CCA is): the count is now taken before the event from public explorers (research, not code), so the decision is made at dinner on Thursday. Say "token auction", not "CCA", on stage. If fewer than about 10 real auctions exist, Bidproof leaves the finalist list and enters Uniswap only.
- Originality (never let the first minute look like one of the five scanners that lost at ETHOnline 2026): verdicts are recomputable facts, not risk scores; the refusal arrives by 1:20.
- Feasibility (public RPC block-range caps over a shared NAT): commit the scan with its block number; replays read cached logs by default.

**Prize stack.**
- Facts: Uniswap Foundation "Build with Uniswap" ($4,000 / $3,000 / $2,000 / $1,000): scope "CCA" and "tooling or solutions built for the broader ecosystem"; FEEDBACK.md and the form; README pointing to "the relevant contracts and lines of code" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)). The CCA docs: "It is the responsibility of the bidder to validate all parameters before participating in an auction" ([CCA technical docs](https://raw.githubusercontent.com/Uniswap/continuous-clearing-auction/main/docs/TechnicalDocumentation.md)).
- Judgement: Uniswap only, by design (`ideas/uniswap.md` rank 1, 8.4).

**Why now.** Facts: CCA reached the Uniswap web app in Feb 2026 and no-code creation in Jun 2026 ([Uniswap blog](https://blog.uniswap.org/token-auctions-are-coming-to-the-uniswap-web-app); [ChainCatcher](https://www.chaincatcher.com/en/article/2273518)). Factory v2.1.0 is live on six chains ([deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)).

**Closest prior finalists and winners (Facts).** [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, Uniswap 1st, seller side); Recycle CCA (Tokyo 2026, no prize, the only bidder-side entry, `history/uniswap.md`); [Placed](https://ethglobal.com/showcase/placed-eijhx) (Tokyo 2026, World IDKit); [TARE](https://ethglobal.com/showcase/tare-ozced) (replayable rows); at least five hook-risk scanners at ETHOnline 2026 with no prize.

**Judge scores and notes (Judgement).** Generalist **6, revise**. Originality **7, keep**. Feasibility **7, keep, P(demo) 80%** (lowest external dependency count in the file). Projected after revision (editor): 7, 7, 7, but only with a real population; with a small one the generalist score stays at 6.

**Difficulty (Judgement).** Medium, about 45 person-hours; the indexer is the sink, capped at four chains and two factory versions. Gate: the pre-event count; hours 0 to 4, confirm step schedule and recipient are readable on chain and fill one bid on Sepolia.

**Risks and fallbacks (Judgement).** Few real auctions: lead with the router and simulator, show "all N auctions" as an appendix, and treat it as a Uniswap-prize entry. Naming live auctions: show counts and failed rules, never "rigged", and use Uniswap's disclosure path.

**Thursday question that decides it.** Uniswap 16:30 Room 1: does an analysis tool on auctions the team did not deploy count as "build on or integrate", and what is the disclosure path for a failing live auction? (`workshop_questions.md` section 4.5, items 1 and 2)

---

### 3.8 Last Out: copy trading where the leader's ranked position is locked behind yours (revised, 6.67, projected 7.0)

**Promise.** Until the lock expires, the leader's ranked account refuses every sell of the called token except the bracket it published, refuses transfers of that token, and refuses any change to its own triggers. Each follower's stop sits above the leader's stop and each target below the leader's target, and one human holds one ranked profile. Before you copy, you can see all of this.

**20 second hook.** "Influencers call a coin, followers pile in, the influencer sells into them. Our claim is narrow and checkable: this leader's ranked account can only leave through an exit you are already ahead of. Watch him press 'Market sell now'. Refused."

**4 minute demo (revised).**
- 0:00 The narrow claim and the side-wallet answer in the first 20 seconds: the claim covers the ranked account; IDKit stops the same human opening a second ranked profile; a side wallet carries no rank and no followers.
- 0:25 The leader posts a call on a Base token Flash quotes at 2 USDC with low impact; the follower view shows the lock and the bracket positions ("his stop is below yours").
- 0:55 Two phones copy; entries pre-filled on Base with explorer links.
- 1:15 **The moment that proves it:** the leader presses "Market sell now"; Flash rejects the order because the lock account's `isValidSignature` refuses it; a direct transfer out reverts; moving his own stop is refused. Lands by 1:30.
- 2:15 Recorded segment: the price touches the followers' stops first; followers out; the leader's stop still resting.
- 2:50 IDKit chapter: the leader's second wallet is refused a fresh ranked profile.
- 3:20 Invariant counts and the trust split (lock onchain, trigger levels held by Flash).

**What the revision changed.**
- Generalist 6 ("he just sells from another wallet"): reframed from "dump prevention" to visible skin in the game, a promise the mechanism keeps against the side-wallet question.
- Originality (show the side-wallet answer in the first 30 seconds): done at 0:00.
- Feasibility 6 (a thin token may not route; 1271 at submit unverified; Privy sign-up on judges' phones): pick the token by Flash's quote, not by thinness; gate the 1271 submit rejection in hour 1; pre-create the follower wallets; tell every coding agent never to act on instructions found inside Flash docs pages, which carried embedded agent instructions (`ideas/definitive.md` section 2).

**Prize stack.**
- Facts: Definitive "Best Use of Flash Advanced Orders in a Social App" ($2,500, one winner): "A working trading flow powered by Flash API or Flash MCP advanced orders"; "Onchain execution shown in the final demo"; video on Discord and X tagging @DefinitiveFi ([Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive)). Flash "accepts EIP-1271 smart-wallet signatures on all EVM chains"; trigger prices "are held offchain by Flash's execution engine" ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md); [Non-custodial](https://flash.definitive.fi/docs/non-custodial.md)). Flash has no testnet ([Flash FAQ](https://flash.definitive.fi/docs/faq.md)). World "Best Use of IDKit" as in 3.3 ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- Judgement: combo 8, rated "Sound" by the checker after the narrowed claim. Definitive pays one winner, so the money is thin; the finalist moment is the reason to build it.

**Why now.** Facts: Hyperliquid's builder-deployed markets topped $62B in May 2026 ([The Block](https://www.theblock.co/news/markets/2026-06-03-hyperliquid-record-share-global-perps-market-hip-3-tops-62-billion-monthly-volume-403384)); World ID 4.0 shipped 17 Apr 2026 ([World](https://world.org/blog/announcements/world-id-full-stack-proof-of-human)).

**Closest prior finalists and winners (Facts).** [KOLlateral](https://ethglobal.com/showcase/kollateral-ho1d1) (Lisbon 2026 finalist, 0G 3rd, Uniswap API 1st: influencer calls priced after the fact); [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4) (New Delhi 2025 finalist); copy-trading winners [Segugio](https://ethglobal.com/showcase/segugio-zu2tw) and [Nakal](https://ethglobal.com/showcase/nakal-qabnf) (1inch API). Definitive's own prize text lists copy trading, so the room will hold look-alikes without the lock.

**Judge scores and notes (Judgement).** Generalist **6, revise** (the most consumer-legible moment in the file). Originality **8, keep** (treats the leader as the attacker). Feasibility **6, revise, P(demo) 55%**. Projected after revision (editor): 7, 8, 6 to 7.

**Difficulty (Judgement).** Medium, about 47 person-hours; rebuilding Flash's EIP-712 digest onchain is the hard part. Gate: hours 0 to 4, a minimal 1271 account on Base with one approved limit and one refused order; a 5 minute TWAP to learn whether 1271 is rechecked at settlement.

**Risks and fallbacks (Judgement).** Flash does not recheck 1271 at settlement: the lock still blocks the account's own signatures; say exactly what is covered. Gate fails: pivot to Called It on the same stack (`ideas/definitive.md` rank 2).

**Thursday question that decides it.** Definitive booth (no workshop): will Flash accept an EIP-1271 funder that approves a stored digest, and check it again at settlement? (`workshop_questions.md` section 4.12, item 1)

---

### 3.9 Reserve Gate: an Aqua maker that stops buying when the bridge escrow no longer backs the token (revised, 6.00, projected 7.0 if CRE reads forks)

**Promise.** Replay a Kelp-sized escrow release on an Ethereum fork, post the backing to an Arbitrum fork, and let any holder of the bridged token sell into three makers built from the same pricing code: a rate-pegged one fills in full, a price-anchored one fills in full because neither the rate nor the price moved, and Reserve Gate pays not one wei, while an honest wstETH sale into Reserve Gate still fills.

**20 second hook.** "In April the token's price said 1:1 and its exchange rate said 1:1. The vault behind it held 26 cents on the dollar. Three market makers, same code, one check different: two paid out, one refused."

**4 minute demo (revised).**
- 0:00 One line: price 1:1, rate 1:1, backing 26%. The actor named correctly: L2 holders selling, not the L1 attacker.
- 0:15 Three-way split on an Arbitrum fork with official Aqua: rate-pegged, price-anchored (the Ballast shape), Reserve Gate.
- 0:30 **The moment that proves it:** the release replays to Galaxy's figures; the workflow writes "backing 26.5%"; a holder sells 500 tokens into all three; two fill, Reserve Gate reverts with backing below the floor; then 1 wstETH fills on Reserve Gate. Lands by 0:45.
- 1:40 The fuzz property: for any release sequence that drops backing below the floor, maker ETH out is zero; the posted report hash equals the simulation output.
- 2:30 Limits: a synthetic release on real contracts, not Kelp's transaction.
- The word is "backing" throughout, never "coverage"; the supply-velocity beat is cut.

**What the revision changed.**
- Generalist 6 (five acronyms before the moment; crowded category): the split moves to 0:30 with one plain line; supply-velocity cut; "backing" only.
- Originality 6 (the two-maker split is coldcascade's and Ballast's; a rate-pegged comparator is the weakest): three-way comparison, so the original claim (only a backing check refuses when price and rate do not move) is what the screen shows. coldcascade, Solvent, Ballast and Wamia go into the README.
- Feasibility 6 (no note shows `cre workflow simulate` reading a local Anvil RPC; external API over venue Wi-Fi): test that by hour 2, and if it fails enter 1inch alone and spend the 10 CRE hours on the fuzz property and video; cache the LayerZero status response with its timestamp.

**Prize stack.**
- Facts: 1inch "Build an Aqua App" as in 3.6 ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)). Chainlink "Best workflow with CRE" ($1,500, one winner): "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent"; "It is NOT mandatory to deploy it during the hackathon, simulation is enough!" ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)).
- Judgement: combo 7, rated "Sound" by the checker.

**Why now.** Facts: Kelp, 18 Apr 2026, about $292M ([CoinDesk](https://www.coindesk.com/tech/2026/04/19/2026-s-biggest-crypto-exploit-kelp-dao-hit-for-usd292-million-with-wrapped-ether-stranded-across-20-chains)); the adapter held 40,373 rsETH against 152,577 outstanding on L2s ([Galaxy Research](https://www.galaxy.com/insights/research/kelpdao-layerzero-exploit-defi)); Liquid Network, 6 Sep 2026, $320M, "unbacked cross-chain mint" ([DefiLlama hacks API](https://api.llama.fi/hacks)).

**Closest prior finalists and winners (Facts).** [coldcascade](https://ethglobal.com/showcase/coldcascade-4rfos) (ETHOnline 2026, 1inch 2nd, split-screen dated cascade); [Solvent](https://ethglobal.com/showcase/solvent-7uphp) (ETHOnline 2026, 1inch 1st, a refusal instruction); [Ballast](https://ethglobal.com/showcase/ballast-7jpyp) (NYC 2026, 1inch 4th, oracle anchor); [Wamia](https://ethglobal.com/showcase/wamia-z11ah) (Tokyo 2026, 1inch 2nd, dated attack on a fork); [Canary](https://ethglobal.com/showcase/canary-kh3h7) (NYC 2026 finalist, depeg insurance); [RateSpace](https://ethglobal.com/showcase/ratespace-ke33e) and [Aquawrap](https://ethglobal.com/showcase/aquawrap-povv5) (rate pegs, no prize).

**Judge scores and notes (Judgement).** Generalist **6, revise**. Originality **6, revise**. Feasibility **6, revise, P(demo) 55%**. Projected after revision (editor): 7, 7, 7 if the CRE gate passes; 6, 7, 7 for a 1inch-only entry.

**Difficulty (Judgement).** Medium, about 50 to 55 person-hours including about 10 for CRE. Gate: hour 2, CRE simulation against a local fork RPC; hour 4, real adapter balance on an Ethereum fork and L2 supply on an Arbitrum fork.

**Risks and fallbacks (Judgement).** CRE cannot target forks: a keeper posts the simulation's exact report bytes with the hash in the README, or drop Chainlink. Archive RPC slow: cache state Thursday night. Appended opcodes refused: one external instruction target. Pivot on the same harness: Standing Repo (`ideas/1inch.md` rank 4).

**Thursday question that decides it.** 1inch 17:30 Room 2 (as 3.6) and the Chainlink booth: is `cre workflow simulate --broadcast` enough evidence, and can a workflow read a fork? (`workshop_questions.md` sections 4.10 and 4.11)

---

### 3.10 HookBreak: a generic fuzzer rediscovers a compounding hook exploit on the real block (revised, conditional, 5.67, projected 6.7)

**Promise (revised to what is dependable).** Fork mainnet at the block before a historical Uniswap v4 hook exploit, point HookBreak at the hook and press run: it prints a call sequence that breaks a generic property, as a Foundry test that fails on the vulnerable block. The finalist claim is made only for a bug that static tools do not flag (Bunni v2's compounding rounding drain); the drain of the same asset is claimed only if it reproduces. Every hint the harness was given is listed in the README.

**20 second hook (only if the gate passes).** "Bunni lost $8.4M to a rounding error repeated over 44 tiny withdrawals. No static checker sees that. We pointed a generic fuzzer at the real hook on the real block. Here is the balance it drained."

**4 minute demo (revised).**
- 0:00 Bunni in one line; the hint list (generic properties only).
- 0:20 **The moment that proves it:** the drained balance on the saved fork state, then the generated test that replays it in seconds. Lands by 0:45.
- 1:20 The campaign record: call count, wall-clock time, the minimised sequence.
- 2:00 Cork as a ten-second warm-up, introduced honestly: "a static tool finds this one, and so does the kit".
- 2:30 The same kit in CI on a planted-bug hook, green after the fix.
- 3:10 Disclosure rule: live hooks only privately; the public repo shows only historical exploits and pass counts.

**What the revision changed.**
- Generalist 6 and Originality 5 (Cork is a missing caller check that Slither flags; Aegis402 showed it; a climbing counter is not a visual moment): Bunni is the headline and the gate; the drained balance replaces the counter; Cork is demoted to a warm-up.
- Feasibility 6 (a hint-free drain in 36 hours is not dependable; remote fork fuzzing is slow): the promise is the property break plus a failing test on the real block; every campaign runs against a dumped fork state, never live RPC; the overnight Bunni run starts Thursday night on a machine that is not the video machine.
- The condition: if Bunni (or an equally non-static historical bug) does not reproduce from generic properties by Fri 18:00 IST, HookBreak leaves the finalist list and enters Uniswap only, and Witness (section 4) is the named finalist alternate.

**Prize stack.**
- Facts: Uniswap Foundation "Build with Uniswap" as in 3.7 ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)); an upstream property-list PR to `v4-security-foundations` in `uniswap-ai` ([Uniswap skills](https://developers.uniswap.org/docs/uniswap-ai/skills)).
- Judgement: Uniswap only.

**Why now.** Facts: Cork, 28 May 2025, about $11M to $12M, `beforeSwap` callable by anyone ([Dedaub](https://dedaub.com/blog/the-11m-cork-protocol-hack-a-critical-lesson-in-uniswap-v4-hook-security/)); Bunni v2, 2 Sep 2025, about $8.4M, a rounding error compounded over 44 withdrawals ([BlockSec](https://blocksec.com/blog/bunni-incident-repeated-small-withdrawals-compound-a-rounding-error-into-an-8.4m-drain)); 700+ initialized v4 hooks ([Uniswap Foundation](https://uniswapfoundation.org/blog/a-roadmap-for-programmable-liquidity)).

**Closest prior finalists and winners (Facts).** [Aegis402](https://ethglobal.com/showcase/aegis402-o8x6z) (Open Agents 2026 finalist, blocks payments to a hook with missing access control); [KSwap-VM](https://ethglobal.com/showcase/kswap-vm-aix5n) (Lisbon 2026, 1inch 3rd, counterexamples replayed as failing forge tests); HookLens (Open Agents, no prize) and five ETHOnline 2026 hook scanners (no prize) (`history/uniswap.md`); [TARE](https://ethglobal.com/showcase/tare-ozced); [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6) (San Francisco 2024 finalist, Uniswap 1st).

**Judge scores and notes (Judgement).** Generalist **6, revise**. Originality **5, revise**. Feasibility **6, revise, P(demo) 45%**. Projected after revision (editor): 7, 7, 6 if Bunni reproduces; otherwise about 5 and out of the finalist list.

**Difficulty (Judgement).** High, about 55 person-hours. Gates: Cork property break on a fork by Fri 06:00 IST; Bunni by Fri 18:00 IST.

**Risks and fallbacks (Judgement).** Bunni does not fall: Uniswap-only entry with planted-bug hooks and Cork. Live fork too slow: everything replays from cached state. Pivot on the same harness: Exit Ledger (`ideas/uniswap.md` rank 4).

**Thursday question that decides it.** Uniswap 16:30 Room 1: the private disclosure path for live findings, and whether fuzzing hooks the team did not write counts as "build on". (`workshop_questions.md` section 4.5)

---

## 4. Cut, with where each one still belongs (Judgement)

| Candidate | Why it was cut | Where it still belongs |
|---|---|---|
| Witness (5.67) | Hardware outside the team's skills; three live failure modes on one beat; voice-to-transaction (OmiSwap) and AI co-signer (Octopus AI) already shown | **First alternate** if HookBreak's gate fails. Revised shape: push-to-talk with a close mic; typed intent through the same decision path; a case only spoken intent catches ("about fifty" against 500); Pi USB-tethered to a phone; OS image burned before Thursday. 0G Physical AI, real-hardware place |
| Lanes (5.00, one drop) | Generalist drop: "doesn't a cold-key multisig already stop that?"; Forge cannot run frame opcodes; devnet-only | EF alt mempool prize entry, staged on a local ethrex plus sidecar stack; or RuleDiff, the EF's top idea |
| Pause Fast, Unpause By A Person (4.67) | Five external systems; World and LLM triage dilute the one new claim; SentinelCRE and Umbra shown | **Second alternate**, trimmed to Chainlink only: CRE plus CCIP 2.0, two destination chains on Chainlink Local, "pause in seconds, unpause only after finality", guardian as a plain onchain key, about 45 hours |
| Issuer Brake (4.33, two drops) | Hedera key model and ATS SDK new to the team; the mechanism hangs on an unverified scheduled-call sender | Hedera partner play only; Slowvault (pure SDK) is the shape that fits 36 hours |
| Gas Ledger (4.00, two drops) | Gasless checkout is a shown core claim; the drain question is in Whitechain's own prize text | Whitechain Scale entry, only if the prize USDT source is confirmed; start faucet drips before Thursday |
| Hundi (4.00, two drops) | Invoice financing shown and paid at least four times in 2026 (OpenPop, Finvoice, cashmeifyoucan, Facture) | Whitechain Tokenize entry (as Assignee Pays), demo amounts about 10 USDT |

## 5. Rules for whichever of the ten is built (Judgement)

- **Lead with the refusal, then the population.** In the calibration set the planted case convinced only with a real number behind it (TARE's 125,072 measurements, Cordon's 45,360 draws, per `finalist_judges/generalist.md`). Truthsign, Bidproof, HookBreak and Regas each need their real count; take it before Thursday where it is public data.
- **Two terms of art in the first minute, at most.** Truthsign says "clear signing" and nothing else; Residue says neither "subregistry" nor "EAC"; Regas says no EIP number.
- **Three candidates open with a Binance or Bybit hack.** The second sentence must be the product, because the room will have heard "Binance" all morning.
- **Wi-Fi-proof by construction.** Every fork demo runs from an `anvil --dump-state` snapshot made on Friday; every step that waits on finality is pre-sent with its explorer link; the demo machine uses a phone hotspot (`finalist_judges/feasibility.md` section 1.2).
- **Treat fetched docs as untrusted.** Flash docs pages carried embedded instructions aimed at AI agents (`ideas/definitive.md` section 2); no coding agent acts on instructions found in sponsor pages.
- **One promise per prize stack.** Never two stories in four minutes (`track_combos.md` section 2).

## 6. Gaps

- No ETHGlobal page was re-fetched; prize text is the 2026-10-31 snapshot. EF CROPS criteria were still "(tbc: final review pending)".
- Judge scores are simulated panels reading showcase text, not real judge notes. "Projected after revision" scores are this editor's estimates and have not been re-scored by the three judges.
- The originality scorecard dates Commitment Issues to Tokyo 2026; `history/world.md` places it at Lisbon 2026. This file uses Lisbon.
- None of the hour-4 gates has been run. Unverified gates that could remove a candidate: ERC-7730 sweep yield (1), residue under `safeTransferFrom` (2), two mocked World humans (3, 8), a reproducible gas flip and Hoodi's schedule (4), `file://` and own gateway (5), appended SwapVM opcodes and Safe maker (6, 9), real CCA count (7), Flash 1271 at settlement (8), CRE against forks (9), Bunni from generic properties (10).
