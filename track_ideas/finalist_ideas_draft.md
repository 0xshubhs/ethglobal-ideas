# ETHGlobal Mumbai: 16 finalist candidates for a fresh build (draft)

Written 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India. Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build only. Continuity-only tracks are ignored everywhere in this file, and no candidate depends on code that existed before Thursday 21:00.

## How this draft was made

- Inputs read: `reports/ETHGlobal finalist ideas 2023 to 2026.md` (320 finalists, patterns, open lanes, 11 proposals), `track_ideas/00_season.md`, `track_ideas/00_current_tracks.md`, `track_ideas/track_combos.md`, `track_ideas/track_combos_check.md`, `track_ideas/workshop_questions.md`, all twelve vetted sponsor files in `track_ideas/ideas/`, and the five finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/`.
- **No ETHGlobal page was re-fetched for this pass.** Prize, rule and schedule text comes from the snapshot fetched this morning (2026-10-31) in `00_current_tracks.md`, and its links point to the live pages it came from. The combo check re-fetched the prizes page once today and found it unchanged. Recheck wording at the Thursday workshops.
- **Fact** lines carry a URL (or name the repo note that carries it). Everything marked **Judgement** is this draft's opinion, including every score, hour estimate and survival rating.
- **No code appears in this file on purpose.** The Classic rule says "Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits" ([details page](https://ethglobal.com/events/mumbai/info/details)), and the combo check warns that contract interfaces written before Thursday read as prior designs (`track_combos_check.md` section 1.1). Everything below is idea level: pitch, promise, gates, prize rules. Interfaces get written after 21:00.

## 0. Rules that bound every candidate (Facts)

- "You can apply for a maximum of **3** Partner Prizes for your project" and "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize." "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize." ([event page FAQ](https://ethglobal.com/events/mumbai))
- EF: "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best." Arkiv: "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it." ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation); [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv))
- Partner judging uses the submission only: "partners will evaluate submissions based on the materials you provide." Finalists get "7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A", judged on Technicality, Originality, Practicality, Usability (UI/UX/DX) and WOW Factor. ([details page](https://ethglobal.com/events/mumbai/info/details))
- Video "Must be between 2 and 4 minutes"; EF CROPS "3 minutes max"; 0G "under 3 mins"; Hedera "5 minutes or less"; no AI voiceover. History: "Submissions with large single commits or missing histories may be disqualified." ([details page](https://ethglobal.com/events/mumbai/info/details); sponsor pages via `00_current_tracks.md`)

**Judgement applied below:** EF uses one of the three picks. One video cut between 2:00 and 2:59 serves every stack here. A second track inside one partner is upside, never the plan, until the sponsor confirms on Thursday (`track_combos_check.md` section 1.2). Budget: about 75 to 80 person-hours of build plus 6 to 8 for README, feedback files and video (`track_combos.md`).

---

## 1. The 16 at a glance

Survival odds are this draft's guess at whether the idea survives a hard simulated judge panel and stays a credible finalist after Q and A. **All columns except the stack are Judgement.**

| # | Candidate | One-liner | Partner picks (max 3) and tracks | Shape | Difficulty | Survival |
|---|---|---|---|---|---|---|
| 1 | Truthsign | Before a wallet clear-signs, a fork proves every field on screen matches what the transaction does, or the wallet refuses | EF (Best CROPS App), Arkiv (Mirror + Swarm bonus); Chainlink CRE optional third | Stack | Medium-high | High |
| 2 | Upgrade Council | The coding agent holds the deploy key and still cannot upgrade a proxy that holds money without two distinct, named humans | World (Agent Pass + IDKit) | One partner, two tracks | Medium | High |
| 3 | Pause Fast, Unpause By A Person | One unticketed outflow pauses vaults on three chains at block depth; only a named human, at full finality, can restart them | Chainlink (CRE + CCIP 2.0), World (Agent Pass + IDKit) | Stack | High | Medium |
| 4 | Greenshoe | An IPO-style stabilisation book for a CCA launch, funded only by its own overallotment, quoting from the issuer's Safe | 1inch (Aqua), Uniswap Foundation | Stack | Medium-high | High |
| 5 | Reserve Gate | An Aqua LST maker that refuses to buy a bridged token once the L1 escrow stops backing it | 1inch (Aqua), Chainlink (CRE) | Stack | Medium | Medium-high |
| 6 | Bidproof | Every real CCA checked against the bidder rules Uniswap's docs leave to the bidder, and a bid router that refuses a rigged auction | Uniswap Foundation | Single | Medium | High |
| 7 | HookBreak | A drop-in v4 hook fuzz kit that rediscovers the Cork exploit on the block before it happened, with no hint | Uniswap Foundation | Single | High | Medium-high |
| 8 | Residue | An ENSv2 escrow that settles a name sale only when nobody but the buyer can still change it | ENS (Best Use of ENSv2), Arkiv (Mirror) | Stack | Medium | High |
| 9 | Lanes | A frame-transaction hot wallet where fifty withdrawals pre-signed by a stolen hot key are all refused at admission | EF (alt mempool) | Single | Medium-high | Medium |
| 10 | Walkaway | One local file exits Aave and a Uniswap v4 position with their sites, APIs and RPC companies blocked, and names who can still stop you | EF (Best CROPS App), Uniswap Foundation | Stack | Medium | High |
| 11 | Issuer Brake | Every court-order power ATS gives a bond issuer waits on a network-enforced clock that a trustee can kill | Hedera (Tokenize), World (Agent Pass) | Stack | Medium-high | Medium |
| 12 | Gas Ledger | A gasless prize-USDT checkout whose relayer the judges are handed a drain script for, with the loss bound printed | Whitechain (Scale + Operate) | One partner, two tracks | Medium | Medium-low |
| 13 | Hundi | An invoice that mints only with the debtor's signature, can be financed once, and pays whoever holds it on the due date | Whitechain (Tokenize) | Single | Medium | Medium-low |
| 14 | Last Out | Copy trading where the leader's ranked account cannot sell the called token except through the bracket followers are already ahead of | Definitive (Flash social), World (IDKit) | Stack | Medium | Medium-high |
| 15 | Witness | A desk device that co-signs only a transaction matching what you said out loud, decided by sealed inference, amber when unsure | 0G (Physical AI, real-hardware place) | Single | High | Medium |
| 16 | Regas | The same signed call works on Hoodi and silently loses its inner call on Sepolia: Glamsterdam gas regressions found before mainnet | None (finalist only); EF CROPS as a long shot | Finalist only | High | Medium |

Mix: eight multi-partner stacks (1, 3, 4, 5, 8, 10, 11, 14), two single-partner builds that reach two tracks of that partner (2, 12), five single-track builds (6, 7, 9, 13, 15) and one finalist-only bet (16). Every stack respects the cap and the one-EF rule. The combo check rated combos 1 (Greenshoe), 5 (Residue), 7 (Reserve Gate) and 8 (Last Out) sound as written, and combos 2, 3, 4 and 6 sound after a fix or a trim; each fix is applied below.

---

## 2. What changed from the source ideas (Judgement)

The sponsor files and the report already contain most of these ideas. The pass below changed each one where a hard judge would have found a hole:

- **Every World build now needs two signatures, not one.** The combo check showed that a backend-signed Agent Pass approval means a stolen backend key can approve alone (`track_combos_check.md`, combo 2). Candidates 2, 3 and 11 now require the backend's attestation and a signature from the approving human's own enrolled key, which also makes IDKit central instead of decorative.
- **Every demo leads with the refusal and ends with a number** (the 2026 finalist pattern in `00_season.md` section 3), and every "replay" claim names what was replayed versus synthesised.
- **Trims from the combo check are applied:** ENS out of Truthsign, No Solidity out of Issuer Brake, EF CROPS out of the Whitechain stack, the mainnet fill out of Greenshoe.
- **Claims are narrowed to what the mechanism proves:** Last Out says "the leader's ranked position", not "the leader"; Greenshoe says "while the budget lasts"; Reserve Gate names the L2 holders, not the attacker; HookBreak leads with Cork and treats Bunni as a stretch.
- **New in this pass:** Regas (16) uses live Sepolia, which runs Glamsterdam, against Hoodi, which does not, so it no longer needs a custom client for its core demo (the EF file dropped the earlier Gasdiff draft for that reason, `ideas/ef.md` section 5.2). Lanes (9) is rebuilt around the Binance nonce-range pattern. Walkaway (10) gains a Uniswap slot through v4 hook permission decoding.

---

## 3. The candidates in full

Each section gives: the falsifiable promise; the 20 second hook; a 4 minute demo with the one moment that proves the claim; why it is not already done; fit to the five criteria; the prize stack; why now; difficulty; what could fail live and the fallback; and the Thursday question that decides it.

---

### 1. Truthsign: the signing screen must match what the transaction does

**Promise.** "For any transaction the wallet is about to clear-sign, Truthsign runs it on a fork and refuses clear signing if any field the ERC-7730 descriptor puts on screen disagrees with the effect, or if the transaction moves value or grants an approval the screen never mentions; across the registry we publish how many descriptor fields disagree with their contracts, including zero, each with a replay command."

**20 second hook.** "WazirX's signers approved a screen that lied. Here is a screen that says 'Send 100 USDC to alice.eth'. Here is what the transaction really does: 100 USDC to a stranger. Our wallet refuses to clear-sign it, and it found N fields like this in the public registry."

**4 minute demo.**
- 0:00 One sentence on blind signing, with the WazirX and Bybit figures on one slide.
- 0:25 A real registry descriptor for a real Uniswap Universal Router call on a mainnet fork renders on the demo wallet; Truthsign's check runs; green, clear-signed.
- 0:55 **The moment that proves it:** a descriptor maps "recipient" to the wrong argument. Left pane: "Send 100 USDC to alice.eth". Right pane: the fork's Transfer log sends 100 USDC to 0xA77. The wallet refuses to clear-sign and drops to raw calldata with a red reason.
- 1:40 Completeness: the same call bundled with an unlimited `approve` the screen never shows; refused for "effect not displayed".
- 2:20 The registry sweep card: descriptors checked, fields fuzzed, disagreements found, each row with its one-line replay; disclosed upstream before the demo names anything.
- 3:00 Switch off GitHub and the team's server in front of the judges; the wallet still gets descriptors and Truthsign verdicts from Arkiv, and a drift badge shows "implementation changed since descriptor commit".
- 3:35 Limits: the fork source is a stated trust assumption; Vyper selector checks marked "not checked".

**Why it is not already done.**
- Facts: the EF says Clear Signing still needs "accuracy verification and expert attestations" ([EF blog, 12 May 2026](https://blog.ethereum.org/en/2026/05/12/clear-signing-announcement)). Signing-safety finalists check something else: [LeekDIYHardwareWallet](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg) (ETHOnline 2026) refuses what it cannot display; [maki](https://ethglobal.com/showcase/maki-564eg) (Cannes 2026) simulates and policy-checks writes; [Octopus AI](https://ethglobal.com/showcase/octopus-ai-2xcne) (Trifecta 2025 track finalist) is an AI co-signer in a Safe; [Oh Snap!](https://ethglobal.com/showcase/oh-snap-4u2kv) (Brussels 2024) shows community notes; [ENShell](https://ethglobal.com/showcase/enshell-6t95y) (Cannes 2026, Chainlink CRE winner) used ERC-7730 to display its own verdicts. Partner winner [Clear Signing Studio](https://ethglobal.com/showcase/clear-signing-studio-6hs1z) (Cannes 2025) generates descriptors without verifying them.
- Judgement: no finalist and no partner winner checks the descriptor against the effect. The method is differential fuzzing, the team's daily craft.

**Fit to the five criteria (Judgement).** Technicality 8: descriptor rendering, fork effect extraction and field fuzzing. Originality 9: the gap the EF names. Practicality 7: a library plus a registry sweep; adoption needs a wallet. Usability 7: "the screen lied, so we stopped" needs no glossary. WOW 8: the GitHub-off moment and a registry-wide number.

**Prize stack.**
- EF "Best CROPS App", lead S. Facts: "Build an app, wallet feature or dev tool where one CROPS property is the reason it exists, without giving up the other three"; a README section "titled CROPS"; a video "3 minutes max" showing "the moment it matters"; "No third-party trackers"; criteria still "(tbc: final review pending)" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)).
- Arkiv "Mirror something Ethereum depends on" plus the Swarm bonus. Facts: "The data's license allows republishing"; "Not Sourcify data, from any chain"; "Your import script is in the repo, and we can re-run it" ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)); the registry is CC0-1.0 ([registry](https://github.com/ethereum/clear-signing-erc7730-registry)).
- Optional third: Chainlink "Best workflow with CRE" running the registry sweep as a scheduled workflow, only if the Arkiv gate passes by Fri 01:00 IST (`track_combos_check.md`, combo 3).
- Judgement: what changed from combo 3. ENS is dropped (the least central part and about 12 hours). Truthsign's verdicts are written to Arkiv by a separate checker wallet with a 7-day lifetime, so the Arkiv entry and the EF entry are one product, not two. The CROPS P line says plainly that fork reads go to an RPC the user chooses, which learns the target contract; ENS-free lookups go through Anon-RPC. A per-transaction fork through Anon-RPC is not claimed, because at about 1 s per read a fork check would take minutes (`research_notes/EF tracks and Whitechain ideas/anon_rpc.md`).

**Why now.** Facts: Trezor shipped ERC-7730 on 8 Sep 2026 with descriptors from 1inch, Aave, Lido, Tether, LiFi and Hyperliquid and falls back to blind signing with a warning ([Crypto Briefing](https://cryptobriefing.com/trezor-clear-signing-erc-7730/)). The largest theft on record (Binance, 29 Oct 2026, about $6.36B) used signed EIP-7702 authorizations ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)). DefiLlama lists WazirX (18 Jul 2024, $234.9M, "Signer Phishing") ([DefiLlama hacks API](https://api.llama.fi/hacks)). Bybit's attackers "modified Safe{Wallet}'s front-end JavaScript files" ([SlowMist](https://slowmist.medium.com/bybits-1-5-billion-theft-unveiled-safe-wallet-front-end-code-tampered-84b78f0fa9c2)).

**Difficulty in 36 hours (Judgement).** Medium-high: about 50 to 55 person-hours after the ENS trim (renderer subset 10, fork effect extraction and fuzzing 14, Arkiv importer and checker 12, demo wallet 8, sweep and disclosure 6). Gates: hours 0 to 4, render three Trezor-launch descriptors and extract their effects on a fork; Arkiv write and read on the current testnet by Fri 01:00 IST.

**What could fail live, and the fallback (Judgement).** The registry sweep may not finish: scope it to the six Trezor-launch protocols first and report the denominator honestly. Arkiv testnet down on Saturday: the wallet reads a signed local snapshot, labelled as such, and the video carries the live GitHub-off moment. ERC-7730 formats outside the subset render as "not verified" rather than green.

**Thursday question that decides it.** EF 17:00 Room 2: is the CROPS rubric final, and do libraries and dev tools compete equally with end-user apps? Arkiv 16:00 Room 2: is the ERC-7730 registry in scope for Mirror, and what are the per-entity quota units? (`workshop_questions.md` section 5, items 3 and 9)

---

### 2. Upgrade Council: the agent holds the deploy key and still cannot change code that holds money

**Promise.** "The AI coding agent holds the deployer key and still cannot upgrade the vault proxy. An upgrade lands only with a fresh Agent Pass approval from a named engineer plus that engineer's own key, enrolled to the council with a distinct Proof of Human; an approval for implementation A cannot install implementation B; a second key for an already-seated human is refused; a denied, expired or wrong-person approval leaves the proxy unchanged."

**20 second hook.** "Drift lost $295M to a proxy upgrade. Our agent ships code all day and holds the deploy key. Watch it try to upgrade a vault with a hidden `sweep` function: the engineer's phone shows what the bytecode really changes, and the chain refuses until a real person says yes."

**4 minute demo.**
- 0:00 The Drift line and the setup: an agent with full deploy rights on Sepolia, a vault behind a proxy whose upgrade role belongs to the gate.
- 0:25 The agent runs its upgrade script; the gate answers with a challenge; World's prompt appears on the engineer's phone; the laptop shows the upgrade card computed from the team's own pinned compile: storage slot collision, new external selector `sweep(address)`.
- 0:55 The engineer denies; the proxy is unchanged. A prompt-injected "release note" makes the agent retry with `sweep` renamed; the card catches it again.
- 1:35 **The moment that proves it:** a clean build is approved and lands; then the same approval is replayed against a tampered implementation and reverts with a code hash mismatch, and the backend's approval alone, without the engineer's enrolled key, also reverts.
- 2:15 IDKit chapter: the engineer tries to enroll a second laptop key; same nullifier; refused. A teammate with no Orb credential is told why Selfie Check is not enough for this seat.
- 2:50 Optional second policy (only if built): a 7702 delegate change for the protocol hot wallet, bound to one exact nonce; a request covering a nonce range is refused.
- 3:20 Test counts from the Foundry suite (replay, expiry, wrong hash, wrong approver, forged signature) and the limits.

**Why it is not already done.**
- Facts: agent-limiting finalists cap spending or check intent, not code changes: [maki](https://ethglobal.com/showcase/maki-564eg) (Cannes 2026: "The model interprets intent but never moves funds"), [Omamori](https://ethglobal.com/showcase/omamoris-rn3nc) (Tokyo 2026: an agent's attempt to raise its own limit reverts), [Cordon](https://ethglobal.com/showcase/cordon-vw3kh) (ETHOnline 2026: hierarchical budgets), [Igris AI](https://ethglobal.com/showcase/igris-ai-nvfh6) (New Delhi 2025: 7702 guard agent). World partner winners near it: [Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h) (Lisbon 2026, human check before an agent's git commit), [Airlock](https://ethglobal.com/showcase/airlock-ph6bx) (Tokyo 2026, approval bound to a payload hash), [Surety](https://ethglobal.com/showcase/surety-ms4gx) (Tokyo 2026, live prompt injection plus onchain enforcement). One-human-one-seat precedents bind votes, not signers: [0xPoll](https://ethglobal.com/showcase/0xpoll-4j05w), [Votelik Pollerin](https://ethglobal.com/showcase/votelik-pollerin-u0dcs).
- Judgement: no finalist gates a proxy upgrade, and none shows the human facts the agent cannot forge (`ideas/world.md` section 5.3 finds no World entry that did).

**Fit to the five criteria (Judgement).** Technicality 8: gate contract, bytecode witness with immutables masked, storage layout diff, OIDC device flow. Originality 8. Practicality 8: any team with an upgradeable protocol and an AI coding agent can use it today. Usability 7: the card is the product; it must be readable in five seconds. WOW 8: a storage collision caught by a person on stage.

**Prize stack.**
- World "World ID Agent Pass". Facts: "Integrate with the official World ID Agent Pass"; "Demonstrate the complete journey"; "Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur"; "Validate identity results in a secure backend; do not expose client secrets"; an integration debrief; mocked proofs are in use ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- World "Best Use of IDKit" in the same slot. Facts: "Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance"; "Demonstrate a successful verification and one meaningful alternative path" (same page).
- Judgement: what changed from `ideas/world.md`. The gate checks two signatures over the same action hash: the backend's Agent Pass attestation and the engineer's enrolled key. That closes the hole the combo check found in the one-signature design and makes IDKit the second half of the rule. A two-person rule (two distinct enrolled humans) applies only to upgrades whose card shows a storage layout change. No EF prize: the backend weakens the C in CROPS (`track_combos.md` section 5, item 5).

**Why now.** Facts: Drift, 1 Apr 2026, $295M, classed "proxy upgrade hijack", after attackers spent six months building trust with contributors ([DefiLlama hacks](https://defillama.com/hacks); [TRM Labs](https://trmlabs.com/resources/blog/north-korean-hackers-attack-drift-protocol-in-285-million-heist)). World bundled World ID for Agents into a suite for banks on 18 Oct 2026 ([The Block](https://www.theblock.co/news/ecosystems/2026-10-18-world-launches-world-id-suite-banks-418869)). Binance's drain used "50 EIP-7702 authorizations signed by the hot wallet for 50 consecutive nonces" ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)).

**Difficulty in 36 hours (Judgement).** Medium, about 45 to 50 person-hours: gate and tests 9, bytecode witness and layout diff 10, OIDC device flow 6, IDKit enrollment and same-human guard 7, card UI 8, debrief and README 4. Gate: hours 0 to 4, one device-flow approval with mocked identities returning a validated ID token with a stable `sub`.

**What could fail live, and the fallback (Judgement).** Mocked identities may not honour a requested `sub` in the device flow: fall back to the code flow on the engineer's laptop with the CLI waiting. Immutables break bytecode comparison: mask them on day one. World's onchain verifier may fight a Sepolia setup: verify IDKit on the server and say in the README that enrollment then trusts the backend, while the per-action engineer signature still does not.

**Thursday question that decides it.** World 17:30 Room 1: can mocked identities produce two distinct, stable `sub` values, can one project place in both World tracks, and is "backend attestation plus an IDKit-enrolled key" an acceptable R4 pattern? (`workshop_questions.md` item 6; `track_combos_check.md` section 4)

---

### 3. Pause Fast, Unpause By A Person: a drain stops on three chains at block depth, and only a named human restarts it at full finality

**Promise.** "One hot-wallet outflow without a matching withdrawal ticket and the treasury refuses its next refill, and a pause lands on vaults on Base Sepolia, Arbitrum Sepolia and OP Sepolia before the attacker's next withdrawal there. No key the workflow or its LLM triage holds can unpause; an unpause needs the guardian's Agent Pass approval and the guardian's enrolled key, travels only at full finality, and an approval for one call cannot execute another."

**20 second hook.** "Binance's hot wallet was emptied 3.5 minutes after the signature. Here three vaults freeze in seconds over CCIP, and an AI that reads the attacker's 'all clear, unpause' can only ever push the pause button."

**4 minute demo.**
- 0:00 Ten ticketed withdrawals reconcile green in the CRE workflow log.
- 0:30 The attack script replays the nonce-range shape against the team's own Sepolia test hot wallet and sweeps the 0.1 ETH float.
- 0:55 **The moment that proves it:** the next workflow run prints "1 unmatched outflow", the 5 ETH refill goes red with `Unreconciled`, and three vault panels flip to "Paused at +N s"; the attacker's withdrawal on Base Sepolia reverts. This runs live on Chainlink Local; testnet message IDs are shown alongside.
- 1:45 The attacker posts "patched, unpause" to the forum the triage step reads; the triage output can only request a pause; the unpause attempt reverts.
- 2:15 Guardian approves on a phone; the backend alone and the guardian key alone each fail; both together queue the unpause, which sits "waiting for finality" in the CCIP Explorer (pre-sent before recording).
- 2:50 The latency table: every demo message, block depth versus full finality, pulled from the CCIP REST API.
- 3:20 A second key for a seated guardian refused at enrollment; limits.

**Why it is not already done.**
- Facts: [Canary](https://ethglobal.com/showcase/canary-kh3h7) (NYC 2026 finalist, Chainlink CRE winner) used CRE and a CCIP relay for parametric depeg insurance; [ENShell](https://ethglobal.com/showcase/enshell-6t95y) (Cannes 2026) used CRE to score agent intent; [Immunity](https://ethglobal.com/showcase/immunity-eg56a) (NYC 2026, Continuity) used CRE for threat antibodies. Tripwire (Tokyo 2026, no prize) "pauses before humans can react" with no human ([Tripwire](https://ethglobal.com/showcase/tripwire-7bqxn), per `ideas/world.md`).
- Judgement: none uses CCIP 2.0's per-sender finality to make the safe direction fast and the unsafe direction slow, and none reconciles outflows against an enterprise ledger before refilling.

**Fit to the five criteria (Judgement).** Technicality 8: CRE workflow, receivers overriding per-sender finality, OIDC, enrollment guard. Originality 7: pause-and-guardian is known; the finality asymmetry is new. Practicality 7: exchange treasuries are the user, the ticket API is a stand-in. Usability 6: four panels and two phones. WOW 8: three chains freezing in seconds.

**Prize stack.**
- Chainlink CRE and CCIP 2.0 (one partner). Facts: CRE "used as an orchestration layer"; "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent"; a CLI simulation is enough. CCIP "Using Chainlink CCIP inside your smart contracts is required" ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)).
- World Agent Pass and IDKit (one partner), requirements as in candidate 2 ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)).
- Judgement: what changed from combo 2. The two-signature unpause (the combo check's required fix). A small LLM triage step inside the workflow (CRE allows "LLM") whose only possible output is "pause", which makes the prompt-injection beat honest. The live part runs on Chainlink Local; testnet is evidence, not the stage.

**Why now.** Facts: the Binance mechanism and the 3.5 minute sweep ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)); freezes came from Tether, Circle and Arbitrum's Security Council (same source). CCIP 2.0 receivers can set finality per sender via `getCCVsAndFinalityConfig`, and Sepolia full finality takes about 13 to 17 minutes ([CCIP docs bundle](https://docs.chain.link/ccip/llms-full.txt), via `ideas/chainlink.md`).

**Difficulty in 36 hours (Judgement).** High, about 63 to 65 person-hours (the combo check's estimate plus the fix), with little slack. Testnet logistics across four chains cost 3 to 4 hours alone.

**What could fail live, and the fallback (Judgement).** Fast-finality data lanes may not be open on testnet: show the asymmetry on Chainlink Local and the waiting unpause on testnet. CRE `--broadcast` may not reach a chain: a keeper posts the exact report bytes the simulation produced, with the hash in the README. If World says one project cannot place in both tracks, keep the enrolled-key check anyway and enter Agent Pass only.

**Thursday question that decides it.** Chainlink booth (no workshop): can one project win both CRE and CCIP 2.0, and which testnet lanes accept block-depth data messages? (`workshop_questions.md` item 10)

---

### 4. Greenshoe: an IPO stabilisation book for a CCA launch, funded by its own overallotment, in the issuer's Safe

**Promise.** "For 30 days after the auction graduates, while the bid budget lasts, nobody can sell the token into the issuer's Safe below 97% of the clearing price or buy the issuer's tokens below 103% of it; every USDC paid out arrives in the same transaction as the tokens; the budget grows by exactly what the overallotment raised; and after day 30 the strategy quotes zero on both sides."

**20 second hook.** "Every IPO has a greenshoe: the underwriter oversells 15% and uses that cash to defend the price. Token launches have nothing. Here a whale dumps 5% of supply and lands exactly on a line, paid for by the launch's own buyers, and the cash never left the issuer's Safe."

**4 minute demo.**
- 0:00 One slide on the greenshoe; the 15-second explainer.
- 0:20 Base fork: a CCA created through the real factory graduates at P; the LBPStrategy seeds the v4 pool.
- 0:50 A buyer rush: the overallotment side sells at 1.03 P and the "remaining defence" counter rises by exactly the USDC received.
- 1:30 **The moment that proves it:** a whale dumps 5% of supply into the v4 pool; every arbitrage fill lands on the 0.97 P line; the Safe's token balance rises as USDC leaves; the counter falls; then the budget runs out on screen and the band stops holding, as promised.
- 2:30 Warp 31 days: the same dump finds a zero quote and the swap reverts with "window closed".
- 3:00 The fork test that pins the anchor and shows it equals the final clearing price after a checkpoint; the 1inch CoreInvariants result; the swap-vm tag redeployed.
- 3:30 Answer the manipulation question before it is asked: a disclosed, regulated practice in equity markets, every parameter in the program bytes.

**Why it is not already done.**
- Facts: Aqua finalists so far: [watermark](https://ethglobal.com/showcase/watermark-68230) (Tokyo 2026, 1inch 3rd: a DAO Safe quoting with a 50 ETH fill cap), [ArcBook](https://ethglobal.com/showcase/arcbook-twp2a) (Lisbon 2026, 1inch 1st), [OddsFlow](https://ethglobal.com/showcase/oddsflow-fwsnb) (Tokyo 2026, 1inch 1st), [Takarabako](https://ethglobal.com/showcase/takarabako-qmgg5) (Tokyo 2026, Continuity). The CCA finalist is [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026, Uniswap 1st, ENSv2 3rd), which ends at the launch. Partner winner [Lotus](https://ethglobal.com/showcase/lotus-9vnou) (NYC 2026, 1inch 2nd) is one-way sell liquidity.
- Judgement: nobody has built a two-sided, self-funding, expiring defence anchored to an auction's own price. Greenshoe starts where Kura ends.

**Fit to the five criteria (Judgement).** Technicality 9: appended SwapVM instructions, a pinned anchor written only in swaps, fork tests against the real CCA factory and official Aqua. Originality 9. Practicality 7: an issuer could ship it tomorrow; the 30-day window is a product rule. Usability 6: the issuer page is simple, but the concept needs the explainer. WOW 7: a TradFi name every judge knows, enforced by bytes.

**Prize stack.**
- 1inch "Build an Aqua App". Facts: "Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)"; "Onchain execution of token transfers should be presented during the final demo (local forks are ok)"; "Proper Git commit history (no single-commit entries on the final day)" ([1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch)).
- Uniswap Foundation "Build with Uniswap". Facts: scope includes "CCA"; "a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form"; "Make sure your README clearly points to the relevant contracts and lines of code" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- Judgement: what changed from combo 1. No mainnet fill (it would mean launching a real token for a prize). A fork test for the CCA getter warning. The Uniswap README section lists the CCA read, the LBPStrategy seeding and the v4 pool as separate integration points. Uniswap centrality is moderate; expect 3rd or 4th place there.

**Why now.** Facts: Aqua opened to all users on 28 Jul 2026 across 13 EVM chains, tokens stay in the LP's wallet until a fill ([Decrypt](https://decrypt.co/374533/1inchs-shared-liquidity-layer-aqua-goes-live)). CCA launched in Nov 2025 and gained no-code creation in Jun 2026 ([The Block](https://www.theblock.co/post/378864/uniswap-continuous-clearing-auctions); [ChainCatcher](https://www.chaincatcher.com/en/article/2273518)). The CCA getter says "Callers MUST ensure that the latest checkpoint is up to date before using this function" ([IContinuousClearingAuction.sol](https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IContinuousClearingAuction.sol)).

**Difficulty in 36 hours (Judgement).** Medium-high, about 50 to 60 person-hours including about 5 for Uniswap. Gate: hours 0 to 4, graduate one CCA on a Base fork and read a non-zero clearing price; one Aqua fill through the redeployed router.

**What could fail live, and the fallback (Judgement).** CCA setup on the fork fails: deploy from the public factory code on an Ethereum fork. The appended-opcode router is ruled out by 1inch: the same logic as one external instruction target on the deployed router. If both fail by Fri 01:00 IST, pivot to Replica on the same harness (`ideas/1inch.md` rank 3).

**Thursday question that decides it.** 1inch 17:30 Room 2: does a redeployed router with appended opcodes count as official, and may a Safe be the maker? (`workshop_questions.md` item 4)

---

### 5. Reserve Gate: an Aqua LST maker that stops buying when the bridge escrow no longer backs the token

**Promise.** "Replay a Kelp-sized escrow release on an Ethereum fork, post the coverage to an Arbitrum fork, and let any holder of L2 rsETH sell into Reserve Gate: not one wei of the maker's ETH leaves the wallet, while the same sale into a rate-pegged program built from the same pricing code fills in full, and an honest wstETH sale on Reserve Gate still fills."

**20 second hook.** "In April, Kelp's bridge escrow fell to about 26% backing and the L2 token's exchange rate did not move. Every rate-pegged maker kept buying. Two wallets, same code, one instruction different: one pays out in full, one refuses."

**4 minute demo.**
- 0:00 The Kelp numbers from Galaxy's post-mortem on one slide; the actor named correctly (L2 holders dumping, not the L1 attacker).
- 0:30 Split screen on an Arbitrum fork with official Aqua: left wallet rate-pegged, right wallet Reserve Gate, one shared ETH balance each.
- 1:00 A script empties the adapter on the Ethereum fork to the Galaxy figures; the CRE simulation reads both forks plus the LayerZero message status and writes "coverage 26.5%".
- 1:40 **The moment that proves it:** an L2 rsETH holder sells 500 rsETH into both: left pays out in full; right reverts with the coverage below the floor; then 1 wstETH sells into the right wallet and fills.
- 2:30 The supply-velocity instruction refuses a sudden local mint jump (the Liquid Network shape).
- 3:05 The fuzz property: for any release sequence that drops coverage below the floor, maker ETH out is zero; the report hash the keeper posted equals the simulation output.
- 3:35 Limits: synthetic release on real contracts, not Kelp's transaction.

**Why it is not already done.**
- Facts: the Aqua finalists in candidate 4 quote from oracles or caps, not backing. [Canary](https://ethglobal.com/showcase/canary-kh3h7) (NYC 2026 finalist) used price-feed history for depeg insurance. 1inch partner winners: [Wamia](https://ethglobal.com/showcase/wamia-z11ah) (Tokyo 2026 2nd, guards a bid against PT price manipulation), [Solvent](https://ethglobal.com/showcase/solvent-7uphp) (ETHOnline 2026 1st, maker overcommitment); [Ballast](https://ethglobal.com/showcase/ballast-7jpyp) (NYC 2026 4th). Rate-pegged makers without a prize: [RateSpace](https://ethglobal.com/showcase/ratespace-ke33e), [Aquawrap](https://ethglobal.com/showcase/aquawrap-povv5), [Aquifer](https://ethglobal.com/showcase/aquifer-gy9hw).
- Judgement: a price-depeg guard would not have fired in April because the rate never moved. Nobody checks backing.

**Fit to the five criteria (Judgement).** Technicality 8: two forks, a cross-fork workflow, three instructions. Originality 7: five rate-pegged LST makers will appear this weekend; this one has the refusal they lack. Practicality 8. Usability 6: maker-facing. WOW 8: the two-wallet split.

**Prize stack.**
- 1inch "Build an Aqua App", requirements as in candidate 4.
- Chainlink "Best workflow with CRE" ($1,500, one winner). Facts: "Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent"; "It is NOT mandatory to deploy it during the hackathon, simulation is enough!" ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)).
- Judgement: what changed from combo 7. The external API now supplies a number the fork cannot (in-flight LayerZero messages not yet minted on the L2), or it is presented honestly as a freshness check. If a keeper writes the value, it posts the simulation's exact report bytes with the hash in the README.

**Why now.** Facts: Kelp, 18 Apr 2026, about $292M, rsETH stranded across 20 chains ([CoinDesk](https://www.coindesk.com/tech/2026/04/19/2026-s-biggest-crypto-exploit-kelp-dao-hit-for-usd292-million-with-wrapped-ether-stranded-across-20-chains)); the adapter held 40,373 rsETH against 152,577 outstanding on L2s ([Galaxy Research](https://www.galaxy.com/insights/research/kelpdao-layerzero-exploit-defi)). Liquid Network, 6 Sep 2026, $320M, "unbacked cross-chain mint" ([DefiLlama hacks API](https://api.llama.fi/hacks)).

**Difficulty in 36 hours (Judgement).** Medium, about 50 to 60 person-hours including about 10 for CRE. Gate: hours 0 to 4, read the real adapter balance on an Ethereum fork and the L2 supply on an Arbitrum fork; one CRE simulation against fork RPC URLs.

**What could fail live, and the fallback (Judgement).** CRE cannot target forks: the keeper path above, Chainlink still entered on the simulation. Archive RPC slow for two forks: cache state locally Thursday night. If the 1inch opcode question goes against appended instructions, use one external instruction target.

**Thursday question that decides it.** 1inch 17:30 Room 2 (as candidate 4) and the Chainlink booth: is `cre workflow simulate --broadcast` enough evidence when the chain is a fork? (`workshop_questions.md` items 4 and 10)

---

### 6. Bidproof: every real CCA checked before you bid, and a bid that refuses a rigged one

**Promise.** "For every auction the v2 factories created on Ethereum, Base, Unichain and Arbitrum, our table states its final-step share, tick spacing against floor, token transfer behaviour, validation hook and LP recipient lock, and one command recomputes any row from chain state at the stated block. The same bid that fills on an honest auction reverts on a rigged one, and for any auction marked 'handoff movable' we push the handoff price by the stated amount on a fork in front of you."

**20 second hook.** "Uniswap's own docs say it is the bidder's job to validate every auction, and a bid cannot leave before graduation. Nobody built the bidder's side. Here is every real auction checked, and a bid that refuses to enter a rigged one."

**4 minute demo.**
- 0:00 The docs quote on screen; the scan header with the real counts, whatever they are.
- 0:40 A judge picks any row; its replay command recomputes it live.
- 1:20 **The moment that proves it:** two auctions of the same token on a Sepolia fork, both from the real factory: the honest one fills; the rigged one (final step 0.2% of supply, LP recipient a bare EOA) reverts with the failed rules named.
- 2:10 The simulator spends the printed amount in the last block, and the v4 pool initializes at the predicted tick.
- 2:50 Who loses, stated exactly: last-block buyers and whoever trades against the seeded pool, not every bidder.
- 3:20 FEEDBACK.md highlights (the CCA docs disagree with themselves on exits) and the optional skill PR to `uniswap-ai`.

**Why it is not already done.**
- Facts: [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, Uniswap 1st) made a CCA safe for the seller against bots; [TARE](https://ethglobal.com/showcase/tare-ozced) (ETHOnline 2026 finalist, Uniswap pool) measured hooks with replayable rows; [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6) (San Francisco 2024 finalist, Uniswap 1st) replayed real pools. At ETHOnline 2026 at least five hook-risk scanners won nothing (`ideas/uniswap.md` section 1, citing the history dossier).
- Judgement: every CCA entry so far is on the creator side. Bidproof's verdicts are recomputable facts, not risk scores, which is what separated TARE from the scanners.

**Fit to the five criteria (Judgement).** Technicality 7: multi-chain indexer, router, last-block simulator. Originality 9. Practicality 8: any bidder can use the table today. Usability 7: one page and one router. WOW 8: a population number plus a live refusal plus a live price push.

**Prize stack.**
- Uniswap Foundation "Build with Uniswap" ($10,000, four places). Facts: scope "CCA" and "tooling or solutions built for the broader ecosystem"; FEEDBACK.md and the form; README pointing to "the relevant contracts and lines of code" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)). The CCA docs: "It is the responsibility of the bidder to validate all parameters before participating in an auction"; "the last block of the auction MUST sell a significant amount of tokens" ([CCA technical docs](https://raw.githubusercontent.com/Uniswap/continuous-clearing-auction/main/docs/TechnicalDocumentation.md)).
- Judgement: Uniswap only, by design. A second partner would add a second story.

**Why now.** Facts: CCA reached the Uniswap web app in Feb 2026 and no-code creation in Jun 2026 ([Uniswap blog](https://blog.uniswap.org/token-auctions-are-coming-to-the-uniswap-web-app); [ChainCatcher](https://www.chaincatcher.com/en/article/2273518)). Factory v2.1.0 is live on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain and Sepolia ([deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)).

**Difficulty in 36 hours (Judgement).** Medium, about 45 person-hours; the indexer is the sink, capped at four chains and two factory versions. Gate: hours 0 to 4, count real auctions (if fewer than 10, the scan becomes an appendix and the router plus simulator carry it), confirm step schedule and recipient are readable on chain, fill one bid on Sepolia.

**What could fail live, and the fallback (Judgement).** Few real auctions exist: lead with the router and the simulator, and show the scan as "all N auctions, here are their rows". Naming live auctions as unsafe: show counts and failed rules, never "rigged", per the sponsor's own likely preference.

**Thursday question that decides it.** Uniswap 16:30 Room 1: does an analysis tool on auctions the team did not deploy count as "build on or integrate", and what is the disclosure path? (`workshop_questions.md` item 7)

---

### 7. HookBreak: a hook fuzz kit that rediscovers the Cork exploit on the block before it happened

**Promise.** "Fork mainnet at the block before the Cork exploit, point HookBreak at the hook address and press run: within minutes it prints a call sequence that breaks 'only the PoolManager can drive a callback', as a Foundry test that fails on the vulnerable block and drains the same asset on the fork; for hooks that pass, it prints the number of calls survived. Every hint the harness was given is listed in the README."

**20 second hook.** "Two Uniswap v4 hooks lost about $20M last year. We pointed a generic fuzzer at the real Cork hook, on the real block, with no hint. Watch the counter."

**4 minute demo.**
- 0:00 The two exploits and their losses on one slide; the hint list (none beyond the generic properties).
- 0:30 The CLI takes a hook address, pool key and fork block; the call counter climbs.
- 1:10 **The moment that proves it:** the direct-callback property fails; a ten-line Foundry test appears; run on the fork, it drains the same asset the attacker took.
- 2:00 The Bunni campaign from a recorded overnight run: call count, wall-clock time, and whether the round-trip property broke; the generated test replays live in seconds if it did.
- 2:50 The same kit on the team's own planted-bug hook in CI, green after the fix.
- 3:20 Disclosure rule: live hooks only privately; the public repo shows only historical exploits and pass counts.

**Why it is not already done.**
- Facts: [TARE](https://ethglobal.com/showcase/tare-ozced) measured hook take, not safety; [Aegis402](https://ethglobal.com/showcase/aegis402-o8x6z) (Open Agents 2026 finalist, no partner prize) blocked payments to a hook it wrote itself; [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6) won in a track that listed testing toolkits; [Detox-Hook](https://ethglobal.com/showcase/detox-hook-mppeg) (2025 finalist) is an LP-protection hook.
- Judgement: no finalist has reproduced a real hook exploit from a generic harness. "AI audits your hook" entries produce opinions; this produces a failing test on the real block.

**Fit to the five criteria (Judgement).** Technicality 9. Originality 7: hook fuzzing is known; reproduction on the real block is the new claim. Practicality 8: runs in CI for any hook author. Usability 6: a CLI; the video must narrate. WOW 8 if Cork falls live.

**Prize stack.**
- Uniswap Foundation "Build with Uniswap", requirements as in candidate 6 ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)). Plus an upstream property-list PR to `v4-security-foundations` in `uniswap-ai` ([Uniswap skills](https://developers.uniswap.org/docs/uniswap-ai/skills)).
- Judgement: Uniswap only. No EF prize fits (the alt mempool track invites mempool fuzzers, not hook fuzzers).

**Why now.** Facts: Cork, 28 May 2025, about $11M to $12M, `beforeSwap` callable by anyone ([Dedaub](https://dedaub.com/blog/the-11m-cork-protocol-hack-a-critical-lesson-in-uniswap-v4-hook-security/)); Bunni v2, 2 Sep 2025, about $8.4M, a withdrawal rounding error compounded over 44 tiny withdrawals ([BlockSec](https://blocksec.com/blog/bunni-incident-repeated-small-withdrawals-compound-a-rounding-error-into-an-8.4m-drain)). The Uniswap Foundation reports 700+ initialized v4 hooks ([Uniswap Foundation](https://uniswapfoundation.org/blog/a-roadmap-for-programmable-liquidity)).

**Difficulty in 36 hours (Judgement).** High, about 55 person-hours; fork fuzzing is slow. Gate: Cork reproduced on a fork by Fri 06:00 IST; Bunni is a stretch until Fri 18:00 IST.

**What could fail live, and the fallback (Judgement).** A judge may call Cork a static check: say so first, and let Bunni (or a planted rounding bug) carry the fuzzing claim. Live fork too slow on venue Wi-Fi: replay from a locally cached fork state. If Cork does not reproduce by the gate, the entry ships the properties against planted-bug hooks and drops to Uniswap-prize strength only.

**Thursday question that decides it.** Uniswap 16:30 Room 1: the private disclosure channel for any live finding (`workshop_questions.md` item 7).

---

### 8. Residue: buy an ENSv2 name and inherit nobody

**Promise.** "If `settle()` succeeds, no address except the buyer can change this name's address or text records, register or remove its subnames, or upgrade the contracts behind either; the invariant suite tries every role, link, operator and upgrade path we know of; and for any key, the Arkiv mirror returns every name where it still holds a role, matching the on-chain role count or marked UNKNOWN."

**20 second hook.** "ENSv2 went live on mainnet last week. In ENSv2 a transfer moves the token, not the control. A judge clicks Buy on our name and the escrow refuses: the seller could still mint `pay.shop.eth` to himself after the sale."

**4 minute demo.**
- 0:00 One diagram: token roles, subregistry, resolver; a transfer moves only the first.
- 0:25 A teammate lists `shop.<team>.eth` on Sepolia; a judge clicks Buy.
- 0:45 **The moment that proves it:** `settle()` reverts naming the surface, the role and the holder (the seller still holds the registrar role on the subregistry); the seller hands the role over; settle succeeds; the old seller's `register("pay")` fails on screen.
- 1:50 A judge pastes any mainnet ENSv2 name into the lens: every key that can still change what, each line linked to the event that proves it.
- 2:40 Reverse lookup from Arkiv: every name where this key still holds a role.
- 3:10 Invariant counts; UNKNOWN semantics; limits (which transfer path leaves residue).

**Why it is not already done.**
- Facts: ENSv2 finalists so far used it for access control, registries or identity: [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026, ENSv2 3rd), [watermark](https://ethglobal.com/showcase/watermark-68230) (Tokyo 2026, ENS-named counterparties), [ETH Arcade](https://ethglobal.com/showcase/eth-arcade-96wyn) (ETHOnline 2026); [npmguard](https://ethglobal.com/showcase/npmguard-aeihd) (Cannes 2026, ENS Most Creative 3rd) published verdicts under ENS names. ENS partner winners near it: [Capsule](https://ethglobal.com/showcase/capsule-yq59u) (ETHOnline 2026 runner-up), [Relay](https://ethglobal.com/showcase/relay-abxnx) (Tokyo 2026 1st).
- Judgement: nobody has asked "who still controls this name after a sale" or enforced the answer in an escrow, and the question only exists because of ENSv2's split.

**Fit to the five criteria (Judgement).** Technicality 8: hierarchy walker, EAC role reconstruction, implementation checks, stateful invariant suite. Originality 9. Practicality 8: every name marketplace needs it. Usability 7: one Buy button and one lens. WOW 8: a judge-chosen name and a revert on the money path.

**Prize stack.**
- ENS "Best Use of ENSv2" ($7,000, four places). Facts: "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values"; "a link to a live demo" ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)).
- Arkiv "Mirror something Ethereum depends on", requirements as in candidate 1 ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).
- Judgement: what changed from combo 5. The gate tests three transfer paths, because "`safeTransferFrom` reverts with `TransferUnsafeUntilRegistryIsEmancipated` or `TransferUnsafeWithMultipleAssignees`; `unsafeTransfer` skips both" ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)); the residue that survives `safeTransferFrom` leads the pitch. The escrow reads chain state; the mirror serves only the lens. Expect 2nd place at most from Arkiv (thin Reach).

**Why now.** Facts: "Today, ENSv2 is live on Ethereum mainnet", 27 Oct 2026, with per-name registries and scoped permissions ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)). ENS's own prize text: "ENSv2 is now live on Ethereum mainnet. Be among the first to build on it." ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens))

**Difficulty in 36 hours (Judgement).** Medium, about 45 person-hours core plus about 14 for Arkiv. Gate: hours 0 to 4 on a Sepolia fork, the three transfer paths.

**What could fail live, and the fallback (Judgement).** Only `unsafeTransfer` leaves residue: the pitch becomes "for every sale that uses `unsafeTransfer`", weaker but true; if ENS added a hook that moves subregistry roles, pivot to Moving Day on the same walker (`ideas/ens.md` rank 2). Arkiv rules chain events out of "license allows republishing": drop Arkiv and enter ENS alone.

**Thursday question that decides it.** ENS 16:00 Room 1: which residue survives `safeTransferFrom` on an emancipated subregistry, and which ENSv2 features are live on Sepolia this week? Arkiv 16:00 Room 2: do public chain events meet the licence line? (`workshop_questions.md` item 8; `track_combos_check.md` section 4)

---

### 9. Lanes: a hot wallet that cannot be pre-signed away

**Promise.** "Twenty approved withdrawals sit pending at once from one frame-transaction account in the alt mempool, while canonical ethrex refuses the second; a stolen hot key signing fifty unapproved withdrawals over fifty nonce keys gets none admitted and burns no gas; revoking one approval invalidates exactly one pending transaction."

**20 second hook.** "Binance's attacker pre-signed fifty authorizations so one would still be valid. Here the hot key alone cannot pre-sign anything that stays valid: fifty signatures, zero admitted. And the same account runs twenty withdrawals in parallel, which today's mempool cannot."

**4 minute demo.**
- 0:00 The TRM sentence about fifty consecutive nonces.
- 0:30 Explorer: twenty pending lanes from one account on the devnet; the same batch to canonical ethrex stops at one.
- 1:10 **The moment that proves it:** the attacker script signs fifty withdrawals with the stolen hot key; the admission node rejects all fifty with the reason shown (no cold approval leaf); the account's balance and gas are untouched.
- 2:00 The cold key revokes one withdrawal ID: one lane disappears, nineteen settle with explorer links.
- 2:40 Validation gas measured per withdrawal, own storage only, under the 100k budget; which per-sender limits the team hit.
- 3:20 Honest limit: both the hot key and the cold approval pipeline compromised still drains.

**Why it is not already done.**
- Facts: mempool finalists so far: [Patio Station](https://ethglobal.com/showcase/patio-station-17k0a) (Tokyo 2026, audio through the Hoodi mempool), [ZKFOCIL](https://ethglobal.com/showcase/zkfocil-private-ils-0oos6) (Trifecta 2025, private inclusion lists), [TX Delay Insurance](https://ethglobal.com/showcase/tx-delay-insurance-5fhae) (2025). None targets alternative mempools (`reports/ETHGlobal finalist ideas 2023 to 2026.md`). Nearest EF-adjacent partner winner: [REIL](https://ethglobal.com/showcase/reil-v8bq8) (Buenos Aires 2025 EIL 2nd, batch construction).
- Judgement: nobody has used keyed nonces as single-use withdrawal lanes or tied the alt mempool to the week's headline.

**Fit to the five criteria (Judgement).** Technicality 9: a frame-transaction account with Merkle approvals validated against its own storage. Originality 8. Practicality 5: devnet only; Hegota is 2027. Usability 5: explorer-heavy. WOW 7: fifty signatures, zero admitted.

**Prize stack.**
- EF "Best use of the Frame Transaction Alternative Mempool" ($5,000, three places). Facts: area "something only an alt mempool makes possible"; "Show real alt mempool usage: a link to your admitted transaction on the devnet explorer, or code that submits one. Your team must be able to explain the design, the code and the trade-offs"; "Multiple devnets will run during the hackathon with keyed nonces and recent roots live" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). Canonical rule: at most one pending frame transaction per sender ([EIP-8141](https://eips.ethereum.org/EIPS/eip-8141#mempool)).
- Judgement: EF only; the devnet cannot share a chain with any partner (`track_combos.md` section 5). What changed from `ideas/ef.md` B3: the demo opens on the Binance shape and the refusal, and the throughput contrast is the second beat, not the first. If the team prefers depth for the EF judges, fold RuleDiff's divergence table in as an appendix, not a second demo.

**Why now.** Facts: the Binance drain mechanism ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)); EIP-8141 is Scheduled for Inclusion in Hegota and the EF tier list puts it at S (`00_season.md` section 2, citing [EF Hegota EIPs](https://blog.ethereum.org/en/2026/09/07/protocol-hegota-eips)); the EF's transaction assertions post asks wallet and protocol teams to come forward ([EF blog, 5 Oct 2026](https://blog.ethereum.org/en/2026/10/05/transaction-assertions)).

**Difficulty in 36 hours (Judgement).** Medium-high, about 45 person-hours; the account contract is small, the devnet is the risk. Gate: keyed nonces and the staked budget confirmed on a live devnet at 21:00 Thu; else a local ethrex plus sidecar stack (`forshtat/ethrex` branch `eip8141-tracer`).

**What could fail live, and the fallback (Judgement).** Devnet down Saturday: pre-recorded admitted transactions with explorer links plus the local stack live. Per-sender keyed-nonce caps lower than twenty: show the cap as a finding and run as many lanes as admitted.

**Thursday question that decides it.** EF 17:00 Room 2 and Pierre and Alex afterwards: which devnets are up, which rule set each runs, and is a per-sender lane count capped? (`workshop_questions.md` item 2)

---

### 10. Walkaway: leave Aave and Uniswap v4 with their sites, APIs and RPC companies gone

**Promise.** "With app.aave.com, the Uniswap interface and the major RPC hosts blocked in the hosts file, a real $5 mainnet position leaves Aave from one HTML file on a USB stick, with reads through Anon-RPC; where you cannot leave, Walkaway names the exact key, keeper or hook permission that can stop you, and on a fork with that party switched off, it shows the exit failing."

**20 second hook.** "Teams disappear, frontends get hijacked, RPC companies block regions. We block all of them on this laptop, open a file from a USB stick, and take real money out of Aave. Then the same file tells you which of your Uniswap positions a hook can trap."

**4 minute demo.**
- 0:00 Hosts file edited on screen; `app.aave.com`, the Uniswap interface and the big RPC hosts all fail to load.
- 0:30 `walkaway.html` opens from a USB stick; the Aave card reads the position through Anon-RPC.
- 1:00 **The moment that proves it:** a real $5 position withdraws from Aave on mainnet; the explorer, opened on a phone off the venue network, confirms it.
- 1:50 The Uniswap v4 card: the position's pool hook has `beforeRemoveLiquidity` permission; red, with the hook address and what it can refuse.
- 2:30 A fork with a vault's keeper switched off: the withdrawal queue never pays; the card names the keeper.
- 3:10 The CROPS lines on one slide: what remains in the path (the Anon-RPC gateway, the signing wallet), and which RPC the signer used for the broadcast.

**Why it is not already done.**
- Facts: [UNSU](https://ethglobal.com/showcase/unsu-o1e71) (NYC 2026 finalist, Continuity) is a wallet with no app or account; [Carte Bleue](https://ethglobal.com/showcase/carte-bleue-ftuuc) (Lisbon 2026) recovers a wallet with nothing from a vendor; EF partner winner [BackItUp](https://ethglobal.com/showcase/backitup-oghff) (ETHIndia 2023, EF 1st) did recovery without the vendor. The report finds no finalist that exits third-party positions without their frontends (`reports/ETHGlobal finalist ideas 2023 to 2026.md`, open lanes table).
- Judgement: rivals will pin an IPFS copy of one frontend; Walkaway exits positions the user already holds across protocols and states who can still block them.

**Fit to the five criteria (Judgement).** Technicality 7: raw exit calldata, hook permission decoding, Anon-RPC reads. Originality 8. Practicality 8: a file anyone can keep. Usability 8: "get your money out if the app is gone". WOW 9: blocked sites, a USB stick and real money moving.

**Prize stack.**
- EF "Best CROPS App", lead C. Facts: the listed idea "a frontend that keeps working when its domain, backend or RPC provider disappears"; the criterion "structural (works without you) beats cosmetic (a setting)" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)). The EF may place it in Anon-RPC instead; either is fine.
- Uniswap Foundation "Build with Uniswap": the v4 position exit and the hook permission check are "tooling or solutions built for the broader ecosystem" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)).
- Judgement: this stack is not one of the eight the combo check examined. Own check: no chain conflict (both on Ethereum), no rule conflict, Uniswap centrality moderate (one of three adapters plus the hook check), FEEDBACK.md and form cost about 2 hours. What changed from the report: three adapters maximum (Aave and Uniswap v4 first), and the Uniswap slot is new.

**Why now.** Facts: the EF Mandate's walkaway test asks layers to keep working "even if the Foundation and today's core developers disappeared tomorrow" ([Mandate PDF](https://ethereum.foundation/ef-mandate.pdf)). Anon-RPC 0.4.0 packages reached npm on 28 Oct 2026 ([npm browser-harness](https://www.npmjs.com/package/@anon-rpc/browser-harness)). Colibri documents a custom `fetch` "to route traffic through Tor" ([Colibri on npm](https://www.npmjs.com/package/@corpus-core/colibri-stateless)).

**Difficulty in 36 hours (Judgement).** Medium, about 45 to 50 person-hours. Gate: hours 0 to 4, one Anon-RPC read and one raw Aave withdrawal broadcast from the single-file build.

**What could fail live, and the fallback (Judgement).** Tor latency on venue Wi-Fi: pre-warm the worker, and keep a phone hotspot. Colibri through the worker does not compose: a two-endpoint cross-check, stated in the README (the report's own fallback). The signing wallet's broadcast leaks the RPC: sign raw and broadcast through Anon-RPC, or say which RPC was used.

**Thursday question that decides it.** EF 17:00 Room 2: does a single-file exit tool count as a CROPS App, and which EF prize would they place it in? (`workshop_questions.md` section 6, EF row)

---

### 11. Issuer Brake: every court-order power ATS gives a bond issuer, on a public clock a trustee can stop

**Promise.** "Steal all three officer keys and you still cannot move one bond unit out of an investor's account before the delay (3 minutes in the demo), and the trustee can stop it; without a fresh Agent Pass approval from the named officer plus that officer's own key, the validator signs nothing; a sanctioned holder can still be frozen in seconds."

**20 second hook.** "Tokenized bonds give issuers the power to move investors' tokens without consent. Whoever steals the issuer's keys holds that power. Here the attacker has every officer key, schedules a million-unit forced transfer to himself, and the trustee kills it with one click while the network makes it wait."

**4 minute demo.**
- 0:00 The ATS "Forced Transfer" capability quoted on screen.
- 0:25 A bond issued on Hedera testnet through ATS, KYC and control list set.
- 0:55 The attacker, holding officer keys, asks for a forced transfer; no fresh Agent Pass approval, no validator signature, nothing scheduled.
- 1:30 **The moment that proves it:** with a valid approval obtained by social engineering, a schedule appears on the HCS brake topic ("executes in 3:00"); the trustee deletes it; the Mirror Node shows it deleted and balances unchanged.
- 2:20 The fast path: a freeze of a sanctioned holder lands in seconds.
- 2:50 A legitimate redemption executes when its clock ends.
- 3:20 What bypasses the brake (officers plus validator together), stated.

**Why it is not already done.**
- Facts: RWA finalists are rare and none brakes issuer powers: [explorador.pt](https://ethglobal.com/showcase/explorador-pt-35okq) (Lisbon 2026) and [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026). Hedera tokenization partner winners were invoice products: [cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz), [Facture](https://ethglobal.com/showcase/facture-jy21t). 2026 Hedera winners used native primitives in unexpected ways (Rialto closed loans with a HIP-1215 scheduled call) (`ideas/hedera.md` section 1).
- Judgement: no finalist treats issuer key risk, and none uses network-enforced schedules as the brake.

**Fit to the five criteria (Judgement).** Technicality 7: nested KeyLists, scheduled ContractExecute, a stateless validator. Originality 8. Practicality 7: trustees exist for exactly this. Usability 6: the trustee console is simple; Hedera concepts are not. WOW 7.

**Prize stack.**
- Hedera "Tokenize Anything with Hedera Studios". Facts: "Use ATS or Stablecoin Studio ... to issue or manage a tokenized asset or stablecoin"; "Deploy and demo on Hedera testnet"; "contracts verified on HashScan where applicable"; video covering "issuance, configuration, and at least one lifecycle operation" ([Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)).
- World "World ID Agent Pass", requirements as in candidate 2.
- Judgement: what changed from combo 4. "No Solidity Allowed" is dropped (the core action calls ATS Solidity, which conflicts with "with no Solidity smart contracts"), and Slowvault leaves the main story; it returns only as the pivot. The validator checks the officer's own key as well as the Agent Pass token, the same two-signature lesson as candidate 2.

**Why now.** Facts: ATS lists "Forced Transfer: Move tokens between accounts without holder consent" and "Forced Redemption" ([ATS capabilities](https://github.com/hashgraph/asset-tokenization-studio/blob/main/docs/ats/getting-started/capabilities-overview.md)). Hedera announced Agent Accounts with caps and allowlists on 13 Oct 2026 ([ChainCatcher](https://www.chaincatcher.com/en/article/2295860)). Bitget lost $387M to a hot wallet key on 24 Sep 2026 ([DefiLlama hacks API](https://api.llama.fi/hacks)). Tokenized stocks and ETFs did over $37B of onchain volume in Q3 2026 (single secondary source: [SpendNode](https://www.spendnode.io/blog/tokenized-stocks-etfs-37b-q3-volume-october-2026/)).

**Difficulty in 36 hours (Judgement).** Medium-high, about 55 person-hours; the weakest team fit here (Hedera key model and ATS SDK are new to an EVM team). Gate: hours 0 to 4, (a) an ATS role on a threshold-key account's EVM address is exercisable by ContractExecute, (b) a scheduled ContractExecute keeps the brake account as `msg.sender`, (c) exact ATS role names in the deployed version.

**What could fail live, and the fallback (Judgement).** Gate (b) fails: pivot to Slowvault plus World (pure SDK, No Solidity then fits). Testnet schedules slow on Saturday: pre-created schedules with HashScan links, the delete done live.

**Thursday question that decides it.** Hedera 15:30 Room 2: can one project place in two Hedera tracks, and does calling Hedera-authored contracts break No Solidity (only if pivoting)? (`workshop_questions.md` item 11)

---

### 12. Gas Ledger: a gasless USDT checkout whose relayer the judges are invited to drain

**Promise.** "Here is our relayer's address and a script that tries to drain it. Run it: the WBT lost stops at the bound printed on screen for that merchant, every other merchant keeps working, every refill is an onchain USDT-to-WWBT swap you can click, and the merchant's 'settled' webhook never fires before the payment is behind the L2 safe head."

**20 second hook.** "Gasless checkouts all say 'the merchant pays gas'. Nobody says what stops a stranger from draining the relayer. Here is the drain script. Please run it."

**4 minute demo.**
- 0:00 The Whitechain question quoted: where does the relayer get its WBT, and what stops someone draining it?
- 0:25 A customer pays 4.00 prize USDT by fingerprint with no WBT; "paid" at once, "settled" later with the safe block number.
- 1:00 **The moment that proves it:** the attack script runs (front-run `cancelAuthorization` races, bad signatures, dust spam); Merchant A's loss meter hits its cap and turns grey; Merchant B's customer still pays.
- 1:50 The refill: the keeper swaps 12 USDT into WWBT on the pool; the explorer link opens.
- 2:30 Refund 1.50 of 4.00 to the recorded payer only; a second refund of 3.00 reverts; the accountant's export verifies line by line until a judge edits a cell.
- 3:20 Limits: pre-funded payer USDT, single sequencer, the issuer's block list.

**Why it is not already done.**
- Facts: facilitator finalists paid gas without an adversarial test: [Paybot](https://ethglobal.com/showcase/paybot-q7grd) (Buenos Aires 2025), [router402](https://ethglobal.com/showcase/router402-b717q) (HackMoney 2026). Checkout finalists: [Kyma Pay](https://ethglobal.com/showcase/kyma-pay-yn65a) (NYC 2025), [Century Pay](https://ethglobal.com/showcase/century-pay-12dy7) (Superhack 2024), [AutoPay](https://ethglobal.com/showcase/autopay-n8ot7) (2025, no partner prize). Gasless partner winners: [PayWiser](https://ethglobal.com/showcase/paywiser-i4i5r), [ArcBeam](https://ethglobal.com/showcase/arcbeam-e0bey), [Full Circle](https://ethglobal.com/showcase/full-circle-b091b). Mumbai is Whitechain's first ETHGlobal sponsorship (`ideas/whitechain.md` section 1.1).
- Judgement: nobody has handed judges the attack and printed the bound.

**Fit to the five criteria (Judgement).** Technicality 7. Originality 6: checkouts are crowded; the drain bound is the twist. Practicality 8. Usability 8: the payer sees an amount and a fingerprint. WOW 6.

**Prize stack.**
- Whitechain Scale (primary) and Operate (same slot). Facts: contracts "deployed on Whitechain Sepolia (chain ID 1874) and verified"; "At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow ... Payments in a test token you minted yourself won't count"; a video "that shows each party involved"; `WHITECHAIN_FEEDBACK.md`; Scale asks how the relayer gets its WBT and what stops a drain ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain)).
- Judgement: what changed from combo 6. EF CROPS is dropped (a single-sequencer L2 and a freezable USDT are not why a checkout exists). The three contracts that each wanted to be the `to` of `receiveWithAuthorization` become one contract with one authorization format, because EIP-3009 requires the caller to be the payee (`track_combos_check.md`, combo 6).

**Why now.** Facts: Whitechain mainnet has been live since 26 Oct 2026; the WWBT/USDT pool held about 117,546 prize USDT on 31 Oct and its observation cardinality was 1, so `observe()` over any past window reverts today (`ideas/whitechain.md` section 1.2, [pool balances](https://explorer.testnet.whitechain.io/api/v2/addresses/0x5645101Ca8d2F7BaBC27b10359555767a1BdF999/token-balances)). CoinDCX confirmed a $15.99M USDT loss from retired wallets on 25 Oct 2026, with some user deposits sent to compromised addresses ([The Block](https://theblock.co/news/business/2026-10-25-coindcx-confirms-16-million-loss-from-retired-wallets-days-after-ceo-called-breach-reports-a-false-alarm-431617)).

**Difficulty in 36 hours (Judgement).** Medium, about 55 to 60 person-hours. Gate: prize USDT obtainable (faucet, booth, or the pool) before 21:00 Thu; `increaseObservationCardinalityNext` called at 21:00.

**What could fail live, and the fallback (Judgement).** No source of prize USDT: the stack does not exist, so decide before Thursday. TWAP still thin on Saturday: keep the deviation band and say the pool mostly sees the team's own swaps. Public RPC rate limits during the attack: run the script against a private endpoint and show its log.

**Thursday question that decides it.** Ask before the event, in the Whitechain dev Telegram: how do hackers get prize USDT, and can one project place in both Operate and Scale? (`workshop_questions.md` item 1)

---

### 13. Hundi: an invoice that can be financed exactly once, and whose payment follows its owner

**Promise.** "An invoice mints only with the debtor's signed acknowledgement; a second financing of the same invoice reverts; only allowlisted financiers can buy it, with delivery against USDT in one transaction; and on the due date the debtor's payment goes to whoever holds the receivable, never to the supplier, even if the debtor tries."

**20 second hook.** "Factoring breaks in two places: the same invoice sold twice, and the money going to the supplier instead of the financier. Here both are reverts. Hundi is the traditional Indian bill of exchange, enforced by a contract."

**4 minute demo.**
- 0:00 Three panes: supplier, debtor, financier.
- 0:25 The debtor acknowledges an invoice by passkey; the receivable mints.
- 0:55 **The moment that proves it:** the supplier tries to tokenize the same invoice again (revert, already acknowledged), then tries to sell it to a second financier (revert); a non-allowlisted wallet tries to buy (revert).
- 1:50 The allowlisted financier buys at 980 USDT; one transaction swaps receivable and prize USDT.
- 2:30 Due date (warped on a short schedule): the debtor pays 1,000 prize USDT; the explorer shows it landing at the financier.
- 3:10 Overdue and default states; the honest limit (a colluding supplier and debtor can acknowledge a fake invoice).

**Why it is not already done.**
- Facts: RWA is the emptiest finalist category; the only invoice finalist, [invoice3.xyz](https://ethglobal.com/showcase/invoice3-xyz-3fb87) (LFGHO 2024), paid invoices with borrowed GHO and financed none. About 18 invoice financing projects were submitted at 2026 events and the three partner winners all won Hedera tokenization: [cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz), [Facture](https://ethglobal.com/showcase/facture-jy21t) (`ideas/whitechain.md` section 1.1).
- Judgement: the invoice crowd competes on pricing or AI underwriting; none shows double financing and misrouted payment as reverts.

**Fit to the five criteria (Judgement).** Technicality 6. Originality 7. Practicality 8: buyer-accepted receivables platforms such as India's TReDS are the model (general knowledge, Judgement). Usability 7. WOW 6: the India frame lands only because a mechanism carries it.

**Prize stack.**
- Whitechain Tokenize. Facts: the listed idea "Invoice financing where a business tokenizes an invoice, a buyer funds it at a discount and settlement happens automatically on the due date"; "Real transfer rules enforced in the contract"; "Financing or selling an invoice belongs in Tokenize"; plus the six shared Whitechain qualifications ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain)).
- Judgement: Whitechain only. The report's optional second slots are weak here: IDKit's Proof of Human proves distinctness, not financier eligibility, and CRE support for Whitechain is unconfirmed. Merged from the report's Hundi and `ideas/whitechain.md` Assignee Pays.

**Why now.** Facts: Whitechain mainnet live since 26 Oct 2026 and judged on Sepolia (`00_season.md` section 1.2, [rpc.testnet.whitechain.io](https://rpc.testnet.whitechain.io)); the prize USDT implementation exposes `receiveWithAuthorization` and `permit` (`ideas/whitechain.md` section 1.2, selector probe only). RWA was the primary tag of only two 2026 finalists, [explorador.pt](https://ethglobal.com/showcase/explorador-pt-35okq) and [Kura](https://ethglobal.com/showcase/kura-so3wx), and of none in 2025 (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Difficulty in 36 hours (Judgement).** Medium, about 40 person-hours; the cheapest strong build in this file, so spend the rest on the video and the invariant suite. Gate: prize USDT source, as candidate 12.

**What could fail live, and the fallback (Judgement).** Prize USDT unobtainable: no Whitechain prize; the finalist demo survives on the reverts alone, but the prize does not. Passkey signing on chain 1874 fails: EOA signatures, with the passkey path in the video.

**Thursday question that decides it.** Whitechain prize USDT source (as candidate 12) and, at the 16:30 Room 2 workshop, whether a financier allowlist counts as "Real transfer rules".

---

### 14. Last Out: copy trading where the leader's ranked position cannot exit before yours

**Promise.** "Until the lock expires, the leader's ranked account refuses every sell of the called token except the bracket it published, refuses transfers of that token, and refuses any change to its own triggers; each follower's stop sits above the leader's stop and each target below the leader's target; and one human holds one ranked profile."

**20 second hook.** "Influencers call a coin, followers pile in, the influencer sells into them. Here the leader presses 'Market sell now' and the signature is refused, because his ranked account can only leave through an exit his followers are already ahead of."

**4 minute demo.**
- 0:00 The first sentence answers the side-wallet question: the claim covers the ranked account, and the README says so.
- 0:25 The leader posts a call on a thin Base token Flash routes (small size); an X card appears with a Copy link.
- 0:55 Two phones copy with embedded wallets; all three limit entries fill on Base with explorer links.
- 1:30 **The moment that proves it:** the leader presses "Market sell now"; Flash rejects the order because the lock account's `isValidSignature` refuses it; a direct token transfer out of the account reverts; an attempt to move the leader's own stop is refused the same way.
- 2:20 A recorded segment: the price touches the followers' stop first; followers out; the leader's stop still resting.
- 2:55 IDKit chapter: the leader's second wallet tries to open a fresh ranked profile; same human; refused.
- 3:25 The invariant counts and the trust split (lock onchain, triggers held by Flash).

**Why it is not already done.**
- Facts: [KOLlateral](https://ethglobal.com/showcase/kollateral-ho1d1) (Lisbon 2026 finalist, 0G 3rd, Uniswap API 1st) catches the influencer dump after it happens ("said accumulate, sold four hours later"); [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4) (New Delhi 2025) copies AI workflows with mock payments.
- Judgement: no finalist treats the leader as the attacker and uses the order engine's own brackets as the protection.

**Fit to the five criteria (Judgement).** Technicality 7: an EIP-1271 account that recomputes Flash's EIP-712 digest onchain. Originality 8. Practicality 7. Usability 8: followers use ordinary wallets. WOW 7.

**Prize stack.**
- Definitive "Best Use of Flash Advanced Orders in a Social App" ($2,500, one winner). Facts: "A working trading flow powered by Flash API or Flash MCP advanced orders"; "Onchain execution shown in the final demo"; "Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X." ([Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive)). Flash "accepts EIP-1271 smart-wallet signatures on all EVM chains"; trigger prices "are held offchain by Flash's execution engine" ([EVM overview](https://flash.definitive.fi/docs/evm-overview.md); [Non-custodial](https://flash.definitive.fi/docs/non-custodial.md)).
- World "Best Use of IDKit", requirements as in candidate 2: trust event "someone takes a ranked leader profile", Proof of Human for distinctness.
- Judgement: what changed from combo 8. The claim is narrowed to the ranked position. The demo token is a thin Base token, not WETH (nobody dumps WETH on followers). Trigger changes are refused through 1271 too.

**Why now.** Facts: Hyperliquid's builder-deployed markets topped $62B in May 2026 ([The Block](https://www.theblock.co/news/markets/2026-06-03-hyperliquid-record-share-global-perps-market-hip-3-tops-62-billion-monthly-volume-403384)); World ID 4.0 shipped 17 Apr 2026 ([World](https://world.org/blog/announcements/world-id-full-stack-proof-of-human)).

**Difficulty in 36 hours (Judgement).** Medium, about 47 person-hours. Gate: hours 0 to 4 from a minimal 1271 account on Base, one approved limit and one refused order; a 5 minute TWAP to learn whether 1271 is rechecked at settlement.

**What could fail live, and the fallback (Judgement).** Flash does not recheck 1271 at settlement: the lock still blocks the account's own signatures; say exactly what is and is not covered. Base fills slow on stage: pre-fill entries, do the refusal live. Gate fails: pivot to Called It on the same stack (`ideas/definitive.md` rank 2).

**Thursday question that decides it.** Definitive booth (no workshop): will Flash accept an EIP-1271 funder and check it again at settlement? (`workshop_questions.md` item 13)

---

### 15. Witness: a desk device that co-signs only what you said out loud

**Promise.** "If the transaction's recipient, token or amount differs from what you said, the device does not sign; if 0G is unreachable it turns amber and does not sign; every sign or refusal is logged to 0G Storage with its request ID; there is no path where it signs without a recorded decision."

**20 second hook.** "You say 'send 20 USDC to Mom'. The dapp built a transaction to a poisoned look-alike address. The little box on the desk glows red: 'recipient differs from Mom's usual address, matches 4 of 40 characters'. It holds the second key, so nothing moves."

**4 minute demo.**
- 0:00 The device on the table: a Pi with a mic, a light, a button and a small screen; it holds one key of a 2-of-2 wallet on 0G Galileo.
- 0:25 A judge says "send 20 USDC to Mom"; the dapp builds the transaction.
- 0:50 **The moment that proves it:** the dapp's transaction goes to an address-poisoning look-alike; the device decodes it deterministically, the sealed model compares it with the spoken intent and stored contacts, and it glows red and refuses; the request ID scrolls on its screen.
- 1:40 The judge corrects the address; green; the device co-signs; the transfer lands with an explorer link.
- 2:15 Unplug the Wi-Fi: amber, no signature, and the log reads "no decision: 0G unreachable".
- 2:50 The episode log on 0G Storage, each decision with its request ID; a replay.
- 3:20 Limits: the model judges fuzzy intent ("Mom", "about fifty"); facts come from the decoder, never the model.

**Why it is not already done.**
- Facts: device finalists: [LeekDIYHardwareWallet](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg) (ETHOnline 2026, refuses what it cannot display), [Carte Bleue](https://ethglobal.com/showcase/carte-bleue-ftuuc) (Lisbon 2026), [Takarabako](https://ethglobal.com/showcase/takarabako-qmgg5) (Tokyo 2026). [Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3) (Lisbon 2026, 0G 2nd) put 0G grading behind a robot arm; [maki](https://ethglobal.com/showcase/maki-564eg) approves through Secure Enclave or Ledger. Nine of 53 finalists in 2026 depended on a device the team built or wired (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).
- Judgement: no device finalist checks a transaction against spoken intent, and none uses sealed inference to decide a signature.

**Fit to the five criteria (Judgement).** Technicality 7. Originality 9. Practicality 5: voice signing is a new habit. Usability 7: talk to it. WOW 9: a physical box refusing on the table.

**Prize stack.**
- 0G "Physical AI: Agents with a Body", aiming at "Best build on real hardware" ($1,000) or a top place. Facts: the "Personal devices" lane names "a pocket device or a desktop companion, with the user's memory on 0G Storage and sealed inference"; must show "A 0G call inside the decision loop", "An episode log on 0G Storage with a request id per decision", "A safe-stop fallback if 0G is unreachable. A fallback that fakes the decision disqualifies"; "Prizes are paid at 0G's discretion" ([0G prizes](https://ethglobal.com/events/mumbai/prizes/0g)). The private trust mode "never silently falls back" (`ideas/0g.md` section 1.2, citing the [0G Router privacy docs](https://docs.0g.ai/developer-hub/building-on-0g/compute-network/router/privacy)).
- Judgement: 0G only; a second partner would cost demo time. What changed from `ideas/0g.md`: the address-poisoning case is the lead (a case the decoder can prove), and amber is shown live, because the safe-stop line is where 0G disqualifies.

**Why now.** Facts: a hardware implant in Ledger devices sold through a reseller took about $93M from about 315 wallets (9 to 12 Oct 2026, [Crypto Times](https://www.cryptotimes.io/2026/10/12/ledger-cryptobilis-hack-explained-93m-stolen-wallets-tampered/)); the Binance drain was a signing compromise ([TRM Labs](https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history)); 0G Private Computer passed 27M TEE attestations by 5 Oct 2026 (sponsored post: [The Block](https://www.theblock.co/sponsored/2026-10-05-0g-private-computer-passes-400-billion-tokens-as-compute-finance-goes-live-417714)).

**Difficulty in 36 hours (Judgement).** High, about 50 person-hours plus hardware risk. Buy and test the Pi, mic and screen before Thursday; write all code after 21:00. Gate: hours 0 to 4, one sealed transcription plus one sealed decision call from the device with request IDs.

**What could fail live, and the fallback (Judgement).** The Pi fails on Saturday: the same agent on a laptop with the LED on USB, labelled. 0G judges read a still device as "not a body" (risk P5 in `ideas/0g.md`): confirm at the booth before committing. Venue noise breaks transcription: a push-to-talk button and a close mic. If the device risk is too high, Drill (`ideas/0g.md` Build with 0G PC rank 1) is the safer 0G consumer entry.

**Thursday question that decides it.** 0G 15:30 Room 1: does a desktop companion with no motion count for Physical AI, and is the real-hardware place judged at the booth? (`ideas/0g.md` question 5)

---

### 16. Regas: the transaction that works on Hoodi and silently loses its inner call on Sepolia

**Promise.** "For a contract and a set of its transactions, Regas executes each one under today's gas rules and under Glamsterdam's EIP-8037 and EIP-8038 rules and lists every transaction whose inner-call outcome changes while the outer call still succeeds; on our own planted relayer the same signed request with the same gas limit executes on Hoodi and is silently lost on Sepolia, and Regas flagged it before we sent it."

**20 second hook.** "Ethereum core developers paused a fork last week because new gas rules may break safeguards in live contracts. Same contract, same signature, same gas: it works on one testnet and quietly fails on the other. Regas tells you before mainnet does."

**4 minute demo.**
- 0:00 The EF's delay notice on screen: Hoodi postponed "to allow for further investigation of interactions of EIP-8037 with mainnet smart contracts".
- 0:30 The team's own meta-transaction forwarder, deployed identically on Hoodi (pre-Glamsterdam) and Sepolia (Glamsterdam live).
- 1:00 Regas runs the forwarder's test corpus under both rule sets; one row flips red: "outer success, inner out of gas, nonce consumed".
- 1:40 **The moment that proves it:** the same signed request with the same gas limit is sent to both chains live: on Hoodi the inner action lands; on Sepolia the forwarder reports success, the nonce is burned, and the user's action never happened; both explorer links side by side.
- 2:40 The fix (a gas check that accounts for the new state-gas dimension) and the re-run, all green.
- 3:10 A pattern count over verified mainnet contracts: how many use the same guard shape, counts only, no names.
- 3:40 Limits: Glamsterdam includes other EIPs, so each flip is attributed by trace, not assumed.

**Why it is not already done.**
- Facts: measurement finalists measure economics, not protocol regressions: [TARE](https://ethglobal.com/showcase/tare-ozced) (ETHOnline 2026) and [LPlens](https://ethglobal.com/showcase/lplens-7sijq) (Open Agents 2026); [Patio Station](https://ethglobal.com/showcase/patio-station-17k0a) (Tokyo 2026) used the mempool for media. ChainSecurity raised the gas-griefing risk on 13 Oct and found 13 susceptible production contracts ([Parameter](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/)).
- Judgement: no finalist and no partner winner has built a fork-rule regression tool, and the question is open in protocol land this week. The EF file dropped an earlier Gasdiff draft because it needed a custom client (`ideas/ef.md` section 5.2); using live Sepolia against live Hoodi removes that dependency for the core demo.

**Fit to the five criteria (Judgement).** Technicality 9: dual-rule execution, trace attribution, griefing pattern detection. Originality 9. Practicality 6: the audience is auditors and protocol teams before the fork. Usability 5: a CLI and a table. WOW 8: the same signature, two chains, one silent failure.

**Prize stack.**
- None needed: a finalist-only bet. Fact: "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize" ([event page FAQ](https://ethglobal.com/events/mumbai)), and about half of recent finalists won no partner prize (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).
- Long shot: EF "Best CROPS App" as a dev tool leading on S ("Things must do what they claim to do"). Judgement: weak; enter only if the EF workshop says protocol-safety dev tools compete, since the CROPS property is not the reason Regas exists.

**Why now.** Facts: Glamsterdam is live on Sepolia since 6 Oct 2026 and the Hoodi activation was postponed ([EF blog, 22 Oct 2026](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay)); EIP-8037 "State Creation Gas Cost Increase" and EIP-8038 "State-Access Gas Cost Update" are in Last Call until 1 Nov 2026 ([EIP-8037](https://eips.ethereum.org/EIPS/eip-8037); [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)).

**Difficulty in 36 hours (Judgement).** High, about 55 person-hours, and the feasibility of the mainnet-corpus half is unverified. Gates: hours 0 to 4, reproduce one inner-call flip on the team's own contract between Hoodi and Sepolia; hours 4 to 10, find any local EVM (Foundry hardfork flag, a client dev chain with a fork override, or a library EVM) that executes mainnet prestate under EIP-8037 rules.

**What could fail live, and the fallback (Judgement).** No flip reproduces on the team's contract by Fri 01:00 IST: abandon; this is the riskiest candidate. No local EVM with the new rules: drop the mainnet pattern count to a static scan and say so; the two-testnet beat still stands. Never name third-party contracts; ChainSecurity's list stays theirs.

**Thursday question that decides it.** EF 17:00 Room 2: would a gas-rule regression tool be welcome in any EF prize, and which devnet or client exposes EIP-8037 rules for local replay? (new; not in `workshop_questions.md`)

---

## 4. Reserve bench (Judgement)

Near-misses kept for pivots, one line each, all fresh builds:

- **Drill** (0G Build with 0G PC): a daily scam call by a sealed model that a judge can lose live; safer 0G entry than Witness, lower Technicality.
- **Sealed PoC Bounty** (Chainlink CRE): an encrypted exploit is paid only if it moves funds on a pinned simulation; strong beat, single $1,500 winner.
- **Moving Day** (ENS): a verified fork dry run of a v1 to v2 upgrade, records and subnames included; the pivot from Residue on the same walker.
- **RuleDiff** (EF alt mempool): differential fuzzing of the admission sidecar against ERC-8421 with a mergeable PR; highest EF odds, low finalist WOW.
- **Second Screen** (Arkiv Build + Swarm + EF CROPS): Safe transaction verdicts read on a second device keyed by the hash the hardware wallet shows; overlaps Truthsign.
- **Preflight** (Arc Bridge Kit track): a CCTPx launcher that refuses to register a token with a silently broken bridge; needs Arc Studio as the starting point.
- **Net** (Arc DeFi track): a netting co-op where a credit limit makes settlement failure impossible; legible but close to "onchain Splitwise".
- **Slowlane** (EF Anon-RPC): a timelocked, vetoable worker specifier; fixes an open item in the EF's own threat map; low WOW.
- **Grammarsmith** (Arkiv Node tooling): a query fuzzer with a reference-model oracle; highest Arkiv score, single $2,000 winner.
- **Replica** (1inch): the RMM-01 covered-call curve as a SwapVM instruction; the pivot from Greenshoe on the same harness.

## 5. How to choose (Judgement)

- **Best finalist odds with a solid prize stack:** Truthsign (1), Walkaway (10), Residue (8). All three lead with a refusal or a blocked-site moment the team controls, and all three sit in lanes the report marks open.
- **Best prize money per hour:** Greenshoe (4) for 1inch plus the largest fresh Uniswap pool; Bidproof (6) if the team wants one sponsor and depth.
- **Best use of the team's audit craft on stage:** HookBreak (7) if Cork reproduces by Fri 06:00 IST; Upgrade Council (2) if the World workshop confirms mocked identities behave.
- **Highest ceiling, highest risk:** Regas (16) and Lanes (9). Take one only with a named pivot inside the same harness.
- **Avoid as the primary unless a Thursday answer is already in:** Gas Ledger (12) and Hundi (13) until the prize USDT source is confirmed; Issuer Brake (11) until gate (b) passes; Witness (15) until 0G confirms a still device counts.
- Decide at dinner (18:30 Thu), confirm at the booths before 20:00, start at 21:00 (`workshop_questions.md` section 2).

## 6. Gaps and caveats

- No ETHGlobal page was re-fetched for this draft; all prize text is the 2026-10-31 snapshot. The EF CROPS criteria are still "(tbc: final review pending)".
- Every survival rating, score and hour figure is this draft's judgement; the simulated judge panel has not yet read this file.
- Finalist names and prizes come from the five catalogues, which read showcase text, not judge notes; event attributions for 2025 track finalists (Octopus AI, ZKFOCIL, TX Delay Insurance, Detox-Hook) are given by year only.
- Unverified gates that could remove a candidate: mocked World identities (2, 3, 11, 14), CCIP fast lanes on testnet (3), appended SwapVM opcodes (4, 5), live CCA count (6), ENSv2 residue under `safeTransferFrom` (8), keyed nonces on the devnets (9), Colibri through Anon-RPC (10), scheduled ContractExecute sender (11), prize USDT source (12, 13), Flash 1271 at settlement (14), 0G "body" reading (15), a reproducible gas flip (16).
- Some "Fact" lines rest on a repo note that carries the original URL rather than on a page re-read today (for example the Whitechain pool and selector probes in `ideas/whitechain.md` and the 0G Router behaviour in `ideas/0g.md`); those notes are dated 2026-10-31.
