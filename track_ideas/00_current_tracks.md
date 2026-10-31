# ETHGlobal Mumbai 2026: current prize tracks (refreshed 2026-10-31)

Event: ETHGlobal Mumbai, Thu 5 Nov to Sat 7 Nov 2026, Jio World Convention Centre, Mumbai, alongside Devcon 8 India. Hacking runs Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST.

## How this file was made

- Fetched on 2026-10-31 (IST morning) from the raw HTML and embedded Next.js flight data of [the prizes page](https://ethglobal.com/events/mumbai/prizes), all twelve sponsor subpages (`https://ethglobal.com/events/mumbai/prizes/<sponsor>`), [the event page](https://ethglobal.com/events/mumbai) and [the details page](https://ethglobal.com/events/mumbai/info/details). Requests were sent one at a time with pauses. No bot check was shown.
- The event page answered HTTP 500 on all three attempts, but the response body still carried the full event data (schedule, FAQ, speakers). The schedule below comes from that body and matches the schedule embedded in the prizes page. Nothing had to fall back to the 2026-10-26 notes.
- Every sponsor subpage carried prize data identical to the main prizes page (names, amounts, descriptions, qualifications), so each sponsor's subpage URL is given as its source.
- Sponsor text is quoted verbatim inside blockquotes, with four mechanical changes: every em dash in the source is replaced by "[dash replaced]"; emojis are dropped; Markdown headings inside sponsor text are shown as bold labels; non-breaking spaces are shown as normal spaces. Times are IST (UTC+5:30), converted from the UTC timestamps in the event data.
- Facts carry a URL. Anything labelled **Judgement** is our own reading, not a sponsor statement.
- Team context: 3 people, DeFi and smart contract security background, Classic (from scratch) track, fresh build only. Continuity-only tracks are listed for completeness and flagged **CONTINUITY ONLY: not eligible for us**.

## Prize pool at a glance

Sourced from [the prizes page](https://ethglobal.com/events/mumbai/prizes) (sponsor `prizeAmount` and per-prize `amount` fields, which agree for every sponsor).

| Sponsor | Total | Open to fresh builds | Continuity only | Workshop (Thu 5 Nov, IST) |
|---|---|---|---|---|
| Hedera | $15,000 | $13,500 | $1,500 | 15:30, Workshop Room 2, 20 min |
| 0G | $15,000 | $12,000 | $3,000 | 15:30, Workshop Room 1, 20 min |
| ENS | $10,000 | $7,000 | $3,000 | 16:00, Workshop Room 1, 20 min |
| Arkiv | $15,000 | $10,500 | $4,500 | 16:00, Workshop Room 2, 20 min |
| Uniswap Foundation | $15,000 | $10,000 | $5,000 | 16:30, Workshop Room 1, 20 min |
| Whitechain | $15,000 | $12,000 | $3,000 | 16:30, Workshop Room 2, 20 min |
| Arc | $15,000 | $12,000 | $3,000 | 17:00, Workshop Room 1, 20 min |
| Ethereum Foundation | $15,000 | $13,500 | $1,500 | 17:00, Workshop Room 2, 30 min |
| World | $12,500 | $7,500 | $5,000 | 17:30, Workshop Room 1, 30 min |
| 1inch | $7,000 | $5,000 | $2,000 | 17:30, Workshop Room 2, 30 min |
| Definitive | $5,000 | $2,500 | $2,500 | none listed |
| Chainlink | $5,000 | $5,000 | $0 | none listed |
| **All 12 sponsors** | **$144,500** | **$110,500** | **$34,000** | |

All amounts are paid in USDC according to each prize's `token` field. The prizes page still has no ETHGlobal Finalist entry. ([prizes page](https://ethglobal.com/events/mumbai/prizes))

## Stacking and submission rules

All verbatim. Sources: [event page FAQ](https://ethglobal.com/events/mumbai), [details page](https://ethglobal.com/events/mumbai/info/details), [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv).

- Partner cap (FAQ): "You can apply for a maximum of **3** Partner Prizes for your project. When you submit your project, you can choose up to 3 partners to apply for. For each partner, you'll need to explain how you've used or integrated their tools, provide feedback, and share some comments." and "If a Partner has multiple tracks, you can be eligible for all of them, but they still count as just 1 Partner Prize."
- Finalist track (FAQ): "**Note:** The ETHGlobal Finalist Track is separate and does not count as a Partner Prize."
- Details page: "On the last step of the submission form, you can select up to 3 Partner Prizes to apply for. If a partner has multiple tracks, you can be eligible for all of them while only counting as 1 Partner Prize. Please ensure to select these prizes carefully as it is the only way for partners to assess your project."
- EF: "One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best."
- Arkiv: "Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it." and "Arkiv's prizes count as one partner prize on ETHGlobal, so it does not use another of your three picks."
- Two submission options (details page): "1. Finalist and Partner Prizes: Opting for this will require you to present your project to judges in the Finalist judging session. You may optionally present to partners at their booths for feedback and networking; this is not required for judging [dash replaced] partners will evaluate submissions based on the materials you provide." and "2. Partner Prizes Only: You can select up to 3 Partner Prizes during submission."
- Finalist session (details page): "Each team has 7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A with the judges." Common questions: "What inspired your project? What tools did you use, and why? What challenges did you solve, and how?"
- Finalist criteria (details page): "Judges will evaluate your project based on five categories:" Technicality ("How complex is the problem you're addressing, and how sophisticated is your solution?"), Originality ("Is your project introducing a new idea or creatively solving an existing problem?"), Practicality ("How complete and functional is your project? Could it be used by its target audience today?"), Usability (UI/UX/DX) ("How intuitive is your project? Have you made it easy for users to interact with your solution?"), WOW Factor ("Does your project leave a lasting impression? This is the catch-all for anything unique or impressive that may not fit into the other categories.").
- Classic track (details page): "Start Fresh (Classic Track): If you're entering the Classic "From Scratch" track, all work on your project must begin after the hackathon officially starts. Any prior project-specific code, designs, or assets are not allowed unless they're from public libraries or starter kits. Projects built before the event may still participate but won't qualify for partner prizes or the Finalist category."
- Demo video (details page): "Must be between 2 and 4 minutes: Videos under 2 minutes or over 4 minutes will be automatically rejected during upload." Also "DO NOT use a text to speech synthesizer / AI Voiceover".
- Version control (details page): "Use version control to track your code during the event. Submissions with large single commits or missing histories may be disqualified."
- AI rules (details page): attribution of where AI tools were used is required, and "If you use one [a spec-driven workflow], you must include all spec files, prompts, and planning artifacts in your submission repository."
- Team size (FAQ): "Each team can have up to a maximum of **five** members in total."
- Still on the FAQ, and still contradicting the Continuity text: "Can I start working on my project before the event? **No**. ... we do not allow participants to work on pre-existing projects." (Irrelevant to us as a fresh build.)

Per-sponsor video limits (from the sponsor sections below): ETHGlobal 2 to 4 min; EF CROPS "3 minutes max"; 0G "under 3 mins"; Whitechain "2 to 4 minutes"; Hedera "5 minutes or less". **Judgement:** a cut between 2:00 and 2:59 satisfies every combination.

## Event timeline (IST)

Source: schedule data on [the event page](https://ethglobal.com/events/mumbai) (identical copy embedded in [the prizes page](https://ethglobal.com/events/mumbai/prizes)). Length is the `length` field in minutes.

| When (IST) | Item | Length | Location |
|---|---|---|---|
| Tue 27 Oct 17:00 | Virtual Team Formation & Idea Brainstorming Session (ETHGlobal) | 90 | virtual |
| Thu 29 Oct 19:30 | Beginner's Workshop: What to Expect at ETHGlobal Mumbai (ETHGlobal) | 60 | virtual |
| Fri 30 Oct 18:00 | Virtual Team Formation & Idea Brainstorming Session (ETHGlobal) | 90 | virtual |
| Fri 30 Oct 23:59 | Deadline to Apply | | |
| Thu 5 Nov 13:00 | Event registration OPENS! (runs 540 min, to 22:00) | 540 | Pavilion 2 |
| Thu 5 Nov 14:30 | Technical Workshops block (to 18:30) | 240 | |
| Thu 5 Nov 15:30 to 18:00 | Sponsor workshops (full table below) | 20 to 30 each | Workshop Rooms 1 and 2 |
| Thu 5 Nov 18:30 | Dinner | 60 | Catering Area |
| Thu 5 Nov 20:00 | Welcome & Opening Ceremonies (speakers Kartik Talwar, Balaji Srinivasan) | 90 | Main Stage |
| Thu 5 Nov 21:00 | Hacking Begins! | | |
| Thu 5 Nov 21:30 | Team Formation & Idea Brainstorming Session (Pascal Rüger, ETHGlobal) | 90 | Workshop Room 1 |
| Thu 5 Nov 22:00 | Registration CLOSED | | |
| Thu 5 Nov 23:59 | Late Night Snack | 60 | Catering Area |
| Fri 6 Nov 10:00 | Brunch | 60 | Catering Area |
| Fri 6 Nov 13:00 | Diwali Lantern Making (Infiwick, 240 min), Diya Candle Painting (Infiwick, 240 min), Mehndi (180 min) | | |
| Fri 6 Nov 18:00 | Dinner | 60 | Catering Area |
| Fri 6 Nov 23:59 | Late Night Snack | 60 | Catering Area |
| Sat 7 Nov 08:00 | Breakfast | 60 | Catering Area |
| **Sat 7 Nov 09:00** | **Project Submissions Due** | | |
| Sat 7 Nov 09:30 to 12:30 | Main Finalist Judging | 180 | Live Judging Rooms |
| Sat 7 Nov 09:30 to 12:30 | Partner Prize Judging | 180 | Partner Booths |
| Sat 7 Nov 12:30 | Lunch | 60 | Catering Area |
| Sat 7 Nov 15:15 | Finalists Notified | | |
| Sat 7 Nov 15:30 to 17:30 | Closing Ceremonies (Kartik Talwar) | 120 | Main Stage |
| Sat 7 Nov 18:00 | ETHGlobal Mumbai 2026 Ends | | |

Submission deadline, verbatim: "All projects must be submitted by Saturday, November 7th 2026 at 09:00 am IST. Late submissions won't be accepted, so be sure to plan ahead!" ([details page](https://ethglobal.com/events/mumbai/info/details))

## Sponsor workshop schedule (Thu 5 Nov, IST)

Source: [event page](https://ethglobal.com/events/mumbai) schedule data. Emojis dropped from titles. "Status" is the schedule item's `status` field as published (ETHGlobal's internal state; "draft" and "proposal" items may still move).

| Start | End | Room | Sponsor | Title | Speaker | Status | Abstract (verbatim) |
|---|---|---|---|---|---|---|---|
| 15:30 | 15:50 | Workshop Room 1 | 0G | One API, All of AI: Building on 0G Private Computer | Gathin T (DevRel, 0G) | draft | "One API for 100+ verified AI models. Learn how to build apps, agents and robots on 0G Private Computer, and how to win our Mumbai tracks." |
| 15:30 | 15:50 | Workshop Room 2 | Hedera | Hedera X Claude Code - AI Skills for Hackathon Builders | Pathorn Teng | finalized | "In this hands-on workshop from ETHGlobal Mumbai 2026, hackathon builders install the open-source Hedera Skills plugin and connect the Hedera Docs MCP server to give Claude Code Hedera expertise and live access to official documentation. Along the way, they use the Hackathon Helper skills to turn a rough idea into a scoped MVP plan and to review their project like a judge before submitting." |
| 16:00 | 16:20 | Workshop Room 1 | ENS | ENSv2 - Identity for Apps, Agents & Beyond | Yash Goyal (ENS Labs) | draft | "An introduction to ENS as identity infrastructure for apps, AI agents and beyond, and what changes in ENSv2. Covers turning hex addresses into human-readable names, how ENS names become full Web3 profiles with avatars, addresses and text records, and agent use cases like subname namespaces. Then covers ENSv2's updated registry and resolver architecture for apps and agents." |
| 16:00 | 16:20 | Workshop Room 2 | Arkiv | Arkiv Workshop | Santiago Trujillo Zuluaga (DevRel, Arkiv) | draft | "Details coming soon." |
| 16:30 | 16:50 | Workshop Room 1 | Uniswap Foundation | How to Navigate the Uniswap Stack | Angela Ocando (Developer Community Manager, Uniswap) | finalized | "A hands-on intro to the full Uniswap ecosystem: the Uniswap API, v4 hooks, Uniswap AI, and open-source tooling. Covering the key concepts behind each, a quick demo, and how to find answers and get support while you build." |
| 16:30 | 16:50 | Workshop Room 2 | Whitechain | Whitechain Workshop | none listed | draft | none |
| 17:00 | 17:20 | Workshop Room 1 | Arc | Build Apps Powered by Smart Contracts with Arc Studio | Corey Cooper (Circle) | draft | "Go from idea to deployed smart contract and integrate onchain functionality into your application." |
| 17:00 | 17:30 | Workshop Room 2 | Ethereum Foundation | Ethereum Foundation Workshop | none listed | draft | none |
| 17:30 | 18:00 | Workshop Room 1 | World | World Workshop | none listed | proposal | none |
| 17:30 | 18:00 | Workshop Room 2 | 1inch | Reimagining the AMM with 1inch Aqua | Tanner Moore (1inch) | finalized | "1inch Aqua solves many of the drawbacks of modern AMM design with self-custodial onchain liquidity. Join us as we explore the implementation and benefits of this new DeFi infrastructure." |

No workshop is scheduled for Definitive or Chainlink. ([event page](https://ethglobal.com/events/mumbai))

**Judgement:** both rooms run in parallel, so these pairs clash: 0G and Hedera (15:30), ENS and Arkiv (16:00), Uniswap and Whitechain (16:30), Arc and EF (17:00), World and 1inch (17:30). A team of three can cover at most two of each pair at once if it splits up, and every slot ends before dinner at 18:30, well before hacking starts at 21:00.

## Changes since 2026-10-26

Compared against sections Q1 to Q4 of `research_notes/EF tracks and Whitechain ideas/judging_criteria.md` (snapshot of 2026-10-26). Where the snapshot quoted only part of a text, a phrase missing from it may be new or may simply not have been recorded; those are listed separately.

**Confirmed changes**

1. **Arkiv published its prizes** ($15,000 total, unchanged). On 2026-10-26 the page said "Prize details coming soon". It now lists six prizes: "Mirror something Ethereum depends on" ($4,000: $3,000 / $1,000), "Build on Arkiv (from scratch)" ($4,000: $3,000 / $1,000), "Build on Arkiv (existing projects)" ($4,000, Continuity only), "Node tooling" ($2,000, single winner), "Arkiv + Swarm bonus (from scratch)" ($500) and "Arkiv + Swarm bonus (existing projects)" ($500, Continuity only). Each main track is judged on four published criteria at 25% each, answered in files under `/arkiv/`. New testnet facts: RPC `https://rpc.rabdi.db-chain.testnet.arkiv.network`, chain ID 7794095. The Arkiv workshop abstract is still "Details coming soon." ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv); [event page](https://ethglobal.com/events/mumbai))
2. **0G renamed and reshaped "Build with iAI"** into "Build with 0G PC" ($5,000, same split). On 2026-10-26 spending iAI credits was a requirement ("Credits being spent inside your app or by your agent"); now the requirement is "Inference on **0G Private Computer** in your main user flow, with **request IDs**", and iAI sign-in is a bonus ("For the iAI bonus: a user signing in with their 0G account and their credit balance going down as they use your app"). The track now targets a consumer app ("something people open, use, and come back to tomorrow"), publishes a model table, says "Every participating team gets **0G compute credits**", and adds "Apps where the AI call could be removed without anyone noticing" to Not wanted. ([0G prizes](https://ethglobal.com/events/mumbai/prizes/0g))
3. **0G replaced "Wildcard: the Weirdest Thing on 0G"** ($2,000, 2 x $1,000, "Judged on novelty first") with **"Agents That Pay for Themselves"** ($2,000, 2 x $1,000): an agent whose earnings fund its own 0G Compute inference with no human top-up, with comfy (the 0G token launchpad) as the recommended path. ([0G prizes](https://ethglobal.com/events/mumbai/prizes/0g))
4. **0G discretion clause narrowed.** On 2026-10-26 the snapshot recorded "Prizes are paid at 0G's discretion..." for all 0G prizes. It now appears only on "Physical AI: Agents with a Body" and "Keep Building on 0G", not on "Build with 0G PC" or "Agents That Pay for Themselves". ([0G prizes](https://ethglobal.com/events/mumbai/prizes/0g))
5. **Whitechain now presents with Optimism.** The About text changed from "An EVM Layer 2 on the OP Stack" to "An EVM Layer 2 built on the OP Stack" and adds "At ETHGlobal Mumbai together with Optimism." Optimism links (optimism.io, OP Stack docs, Optimism on X) were added at sponsor level, and optimism.io plus OP Stack docs on every Whitechain track. Prize names, amounts and all track text are unchanged. ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain))
6. **Judges section un-hidden but still empty.** The event's judges section rank moved from -10 (hidden) to 10, but the judges list is still `[]`. No Mumbai judges are named. ([event page](https://ethglobal.com/events/mumbai))
7. **Workshop details now known.** The snapshot had times only. Titles, speakers, rooms and lengths are now in the schedule data (table above). Times and rooms are unchanged.

**Checked and unchanged**

- EF: all four prizes, amounts, splits and text unchanged. **"(tbc: final review pending)" is still present** on both "Best CROPS App" and "Best CROPS Upgrade to an Existing Project". The CROPS Upgrade prize data shows a single $1,500 award (quantity 1), which answers the snapshot's "no place split" gap. ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation))
- Arc: all five prizes unchanged. **Placeholders are still unfilled**: "[Add API docs link.]" in the Marketplace Discovery API prize and "[confirm reachable from Studio]" in the Advanced Stablecoin Logic prize. The prize data shows each Arc prize as a single $3,000 award (quantity 1), which answers the snapshot's "split not shown" gap. ([Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc))
- ENS: unchanged, including the duplicate "3rd place $1,000" entry ($3,000 / $2,000 / $1,000 / $1,000). ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens))
- World, 1inch, Uniswap Foundation, Hedera, Definitive, Chainlink: amounts, splits and the requirement text the snapshot quoted are unchanged.
- No new sponsors and no removed sponsors: still 12, still $144,500 in total. No ETHGlobal Finalist entry yet.
- Schedule times, the submission deadline, the 7 minute finalist format, the five judging categories, the 3-partner cap and the AI rules are unchanged. ([details page](https://ethglobal.com/events/mumbai/info/details))

**Present now, not in the snapshot's quotes (new or unrecorded; cannot tell)**

- World "World ID Agent Pass" (fresh) description opens with "[We are mocking proofs now, so you don't need sandbox app anymore]". ([World prizes](https://ethglobal.com/events/mumbai/prizes/world))
- World IDKit text names "Selfie Check (Now live with Sybil score)". ([World prizes](https://ethglobal.com/events/mumbai/prizes/world))
- Uniswap scope sentence "This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem." ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation))
- 0G "Physical AI" lanes, zerobot SDK and simulator list. ([0G prizes](https://ethglobal.com/events/mumbai/prizes/0g))

## Judgement: quick fit notes for this team (not sourced)

Kept short; the per-sponsor passes will go deeper. Fresh-eligible tracks only.

- **Strongest skill matches:** EF "Frame Transaction Alternative Mempool" explicitly invites "DoS vectors and vulnerabilities, new rules, simulators and fuzzers", which is a fuzzing and auditing team's home ground. Arkiv "Node tooling" (slow query finder, a measurement harness) and 1inch Aqua/SwapVM (custom opcodes, sophisticated positions, "scored higher" with SwapVM) also reward low-level Solidity and testing depth. Uniswap v4 hooks fit the DeFi background and carry the biggest single fresh pool ($10,000, four places).
- **New openings since 2026-10-26:** Arkiv "Mirror something Ethereum depends on" (for example function signatures or address labels, both named ideas) is a data-engineering track with a 4 x 25% rubric that is easy to satisfy precisely. 0G "Build with 0G PC" no longer forces iAI, which lowers the integration cost but now asks for a consumer app with retention.
- **Watch items:** EF CROPS criteria may still change ("tbc"); recheck at the EF workshop (17:00, Room 2). Arc placeholders unresolved; Arc also requires Arc Studio as the starting point and showing Studio in the demo. 0G pays "at 0G's discretion" on two tracks. Arkiv allows only one Arkiv track win per team (plus the Swarm bonus).
- **Stack arithmetic:** three partner slots, EF counts as one and places a project in at most one EF prize, Arkiv counts as one and pays at most one track plus the $500 Swarm bonus. Partner judging uses only repo, README and video, so each extra partner adds README and feedback-file work (Uniswap FEEDBACK.md plus form, WHITECHAIN_FEEDBACK.md, Arkiv `/arkiv/*.md` files, World debrief).

# Sponsors and tracks (verbatim)

Order follows the prizes page. Each track lists: title, total and split, Continuity flag, then the verbatim description and verbatim qualifications, then a field index saying where the ideas, "What we want to see", "Won't place", qualification and judging text sit in the sponsor's own wording, then resources.

## World ($12,500)

Source: [World prizes](https://ethglobal.com/events/mumbai/prizes/world), fetched 2026-10-31.

- Total: $12,500 across 4 prizes; $7,500 open to fresh builds.
- Workshop: Thu 5 Nov 17:30 to 18:00 IST, Workshop Room 1, "World Workshop" (30 min, status proposal, no speaker listed). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> World’s developer stack helps builders create products for verified humans and AI-assisted interactions. World ID enables apps to confirm someone is a unique human without revealing their identity.

Sponsor resources:

- World ID Simulator: https://simulator.worldcoin.org/id/0x18310f83
- iOS Sandbox App: https://testflight.apple.com/join/Tub7zuyD

### World ID Agent Pass (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "World ID Agent Pass"
- Total: $2,500 USDC
- Place split: 1st place $1,500; 2nd place $1,000
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: none published
- What we want to see: description: "Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product."
- Won't place: implied by the same sentence ("not simply a login screen")
- Qualification requirements: the five-item list under Qualifications
- Judging criteria: no separate rubric; the Qualifications list and the "Strong submissions" sentence are the criteria

Description (verbatim):

> Integrate World ID Agent Pass into your project. We are especially interested in agentic products, but any compelling use case is eligible.
>
> Show what becomes possible when an application can ask a person to authenticate or complete a fresh verification at the moment.
>
> Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product.

Qualifications (verbatim):

> - Integrate with the official World ID Agent Pass.
> - Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action.
> - Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur.
> - Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization.
> - Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact.

Resources:

- World ID Agent Pass: https://auth.world.org/
- World ID Agent Pass Docs: https://auth.world.org/docs
- World ID Agent Pass Portal: https://auth.world.org/portal

### World ID Agent Pass

- Verbatim title: "World ID Agent Pass"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: "We are especially interested in agentic products, but any compelling use case is eligible."
- What we want to see: description: "Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product."
- Won't place: implied by "not simply a login screen"
- Qualification requirements: the five-item list under Qualifications
- Judging criteria: no separate rubric; the Qualifications list and the "Strong submissions" sentence are the criteria

Description (verbatim):

> ![We are mocking proofs now, so you don't need sandbox app anymore]!
>
> Build an application using World ID Agent Pass. We are especially interested in agentic products, but any compelling use case is eligible.
>
> Show what becomes possible when an application can ask a person to authenticate or complete a fresh verification at the moment.
>
> Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product.
>
> NOTE: Proofs are using fake identities, DO NOT rely in them for production

Qualifications (verbatim):

> - Integrate with the official World ID Agent Pass.
> - Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action.
> - Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur.
> - Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization.
> - Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact.

Resources:

- World ID Agent Pass: https://auth.world.org/
- World ID Agent Pass Portal: https://auth.world.org/portal
- World ID Agent Pass Docs: https://auth.world.org/docs

### Best Use of IDKit

- Verbatim title: "Best Use of IDKit"
- Total: $2,500 USDC
- Place split: Best Use of IDKit $1,250 x 2
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: "Strong examples could include fair access to a scarce benefit, a privacy-preserving eligibility check, recovery or protection of an important account action, or a workflow that becomes safer or simpler..."
- What we want to see: description: "We are rewarding the best decision about which credential is needed, why it is needed, and how it improves a real product experience."
- Won't place: description: "We are not rewarding the most credentials used."
- Qualification requirements: the five-item list under Qualifications
- Judging criteria: the "We are rewarding..." sentence; no numeric rubric

Description (verbatim):

> Build a product that uses IDKit to solve a real trust moment: an event where a product needs to know something meaningful about a person before it grants access, completes an action, or changes a user’s experience.
>
> Use the credential that is proportionate to your use case [dash replaced] such as Proof of Human, Passport/NFC, or Selfie Check (Now live with Sybil score). We are not rewarding the most credentials used. We are rewarding the best decision about which credential is needed, why it is needed, and how it improves a real product experience.
>
> Strong examples could include fair access to a scarce benefit, a privacy-preserving eligibility check, recovery or protection of an important account action, or a workflow that becomes safer or simpler because it can verify the right level of human trust.

Qualifications (verbatim):

> - Integrate IDKit in a functioning application, mini app, or onchain flow.
> - Use at least one supported World ID credential and verify the result on the server or onchain as appropriate.
> - Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance.
> - Demonstrate a successful verification and one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user.
> - Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact.

Resources:

- IDKit JS Example: https://idkit-js-example.vercel.app/
- IDKit integration guide: https://docs.world.org/world-id/idkit/integrate
- Configure credentials: https://docs.world.org/world-id/idkit/credentials
- Proof of Human credential: https://docs.world.org/world-id/credentials/1
- Passport/NFC credential: https://docs.world.org/world-id/credentials/9303
- Selfie Check Beta: https://docs.world.org/world-id/credentials/11
- Verification flows: https://docs.world.org/world-id/idkit/verification-flows
- Developer Portal: https://developer.worldcoin.org

### [Cont] Best IDKit Use Case (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "[Cont] Best IDKit Use Case"
- Total: $2,500 USDC
- Place split: [Cont] Best IDKit Use Case $1,250 x 2
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: same as Best Use of IDKit
- What we want to see: same as Best Use of IDKit
- Won't place: "We are not rewarding the most credentials used."
- Qualification requirements: the five-item list under Qualifications
- Judging criteria: as Best Use of IDKit

Description (verbatim):

> Build a product that uses IDKit to solve a real trust moment: an event where a product needs to know something meaningful about a person before it grants access, completes an action, or changes a user’s experience.
>
> Use the credential that is proportionate to your use case [dash replaced] such as Proof of Human, Passport/NFC, or Selfie Check (Now live with Sybil score). We are not rewarding the most credentials used. We are rewarding the best decision about which credential is needed, why it is needed, and how it improves a real product experience.
>
> Strong examples could include fair access to a scarce benefit, a privacy-preserving eligibility check, recovery or protection of an important account action, or a workflow that becomes safer or simpler because it can verify the right level of human trust.

Qualifications (verbatim):

> - Integrate IDKit in a functioning application, mini app, or onchain flow.
> - Use at least one supported World ID credential and verify the result on the server or onchain as appropriate.
> - Clearly explain the specific product event requiring trust and why the chosen credential is the minimum sufficient assurance.
> - Demonstrate a successful verification and one meaningful alternative path, such as cancellation, unavailable credential, rejection, or an ineligible user.
> - Include a short integration debrief/feedback: time to first success, friction encountered, missing capability or documentation, and the one improvement with the greatest impact.

Resources:

- IDKit Docs: https://docs.world.org/world-id/overview


## 1inch ($7,000)

Source: [1inch prizes](https://ethglobal.com/events/mumbai/prizes/1inch), fetched 2026-10-31.

- Total: $7,000 across 2 prizes; $5,000 open to fresh builds.
- Workshop: Thu 5 Nov 17:30 to 18:00 IST, Workshop Room 2, "Reimagining the AMM with 1inch Aqua" (30 min, Tanner Moore). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> 1inch is a network of decentralized protocols that focus on unifying DeFi liquidity. Most known for our DEX aggregator launched in 2019, we have continued to improve and ship protocol, maintaining our position as one of the premiere players in the token swapping space.
>
> Our most recent release, Aqua, reimagines how DEXes are designed and is a perfect candidate for creative hackathon teams.

Sponsor resources:

- SwapVM Whitepaper: https://github.com/1inch/swap-vm/blob/release/1.1/docs/whitepaper-swap-vm-1.0.pdf
- Aqua Whitepaper: https://github.com/1inch/aqua/blob/main/docs/whitepaper-aqua-1.0.pdf

### Build an Aqua App

- Verbatim title: "Build an Aqua App"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: "a sophisticated DeFi position"; "you may modify SwapVM opcodes and define your own instructions"
- What we want to see: description: "Projects that utilize SwapVM will be scored higher during the final judging."
- Won't place: none published
- Qualification requirements: the three-item list under Qualifications
- Judging criteria: only the SwapVM scoring note

Description (verbatim):

> Create a custom Aqua app that implements a sophisticated DeFi position. If you use SwapVM, you may modify SwapVM opcodes and define your own instructions. The final positions must be demonstrated through tests scripts or a UI.
>
> Projects that utilize SwapVM will be scored higher during the final judging.

Qualifications (verbatim):

> - Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)
> - Onchain execution of token transfers should be presented during the final demo (local forks are ok)
> - Proper Git commit history (no single-commit entries on the final day)

Resources:

- SwapVM Smart Contracts: https://github.com/1inch/swap-vm/tree/main
- Aqua Smart Contracts: https://github.com/1inch/aqua
- Aqua SDK: https://github.com/1inch/sdks/tree/master/typescript/aqua

### Build an Aqua App - Continuity Track (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Build an Aqua App - Continuity Track"
- Total: $2,000 USDC
- Place split: 1st place $1,500; 2nd place $500
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: as Build an Aqua App
- What we want to see: as Build an Aqua App
- Won't place: none published
- Qualification requirements: as Build an Aqua App
- Judging criteria: only the SwapVM scoring note

Description (verbatim):

> Create a custom Aqua app that implements a sophisticated DeFi position. If you use SwapVM, you may modify SwapVM opcodes and define your own instructions. The final positions must be demonstrated through tests scripts or a UI.
>
> Projects that utilize SwapVM will be scored higher during the final judging.

Qualifications (verbatim):

> - Official Aqua/SwapVM contracts must be used (redeployments of a modified SwapVM contract is allowed)
> - Onchain execution of token transfers should be presented during the final demo (local forks are ok)
> - Proper Git commit history (no single-commit entries on the final day)

Resources:

- SwapVM Contracts: https://github.com/1inch/swap-vm/tree/main
- Aqua Smart Contracts: https://github.com/1inch/aqua
- Aqua SDK: https://github.com/1inch/sdks/tree/master/typescript/aqua


## 0G ($15,000)

Source: [0G prizes](https://ethglobal.com/events/mumbai/prizes/0g), fetched 2026-10-31.

- Total: $15,000 across 4 prizes; $12,000 open to fresh builds.
- Workshop: Thu 5 Nov 15:30 to 15:50 IST, Workshop Room 1, "One API, All of AI: Building on 0G Private Computer" (20 min, Gathin T). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> 0G is the trust layer for AI. Private compute, encrypted storage and an AI-native EVM L1 chain in one stack, so every AI action is verified and audited. **0G Private Computer** gives you one OpenAI-compatible API for 100+ models, with verified runs, privacy on demand and proof of which model produced every result. **0G Storage** holds AI datasets, model weights and live state, and **0G Chain** settles every model run, payment and ownership record onchain.

Sponsor resources:

- 0G Docs: https://docs.0g.ai
- 0G Builder Hub: https://build.0g.ai
- 0G Private Computer: https://pc.0g.ai
- 0G Faucet: https://faucet.0g.ai

### Build with 0G PC

- Verbatim title: "Build with 0G PC"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: model table and "Creative image, video, and voice apps are welcome here."
- What we want to see: description "Bonus points: plug into iAI"; Qualifications "Must show"
- Won't place: description "Not wanted" list
- Qualification requirements: Qualifications "Must show" and "Submission requirements"
- Judging criteria: no rubric beyond "Must show" and the iAI bonus ("it scores higher with judges")

Description (verbatim):

> **0G Private Computer** gives you one OpenAI-compatible API for 100+ models, with verified runs and privacy on demand. If you've used the OpenAI SDK, you already know how to build on it.
>
> Build a consumer app where AI on 0G *is* the product: something people open, use, and come back to tomorrow. Creative image, video, and voice apps are welcome here.
>
> Every participating team gets **0G compute credits** to build and test with.
>
> **Models to play with**
>
> | Category | Models |
> |---|---|
> | Image | `seedream`, `hy-image`, `z-image` |
> | Video | `seedance`, `minimax-h3` |
> | Speech | `whisper-large-v3` |
> | Multimodal | `qwen omni`, `qwen vision` |
> | 0G native | `0gm-1.0` |
>
> **Bonus points: plug into iAI**
>
> iAI holders get fresh 0G compute credits every day: **1.271 credits per staked iAI**, refreshed at **00:00 UTC**. Unused credits expire, so thousands go to waste daily. These users already hold credits and need good apps to spend them on.
>
> If your app lets users **sign in with their 0G account and spend their own daily credits**, it scores higher with judges. Standout apps may be invited to discuss a **revenue share with 0G** after the hackathon.
>
> **How:**
> - We'll share 0G's credit balance for building
> - You don't need to buy or mint iAI. Test with the 0G credits we give your team.
>
> **Not wanted**
>
> - Generic chat wrappers
> - Apps where the AI call could be removed without anyone noticing

Qualifications (verbatim):

> **Must show**
>
> - Inference on **0G Private Computer** in your main user flow, with **request IDs**
> - A working app a judge can try, with a clear reason someone comes back tomorrow
> - One sentence on what breaks if 0G is removed
> - **For the iAI bonus:** a user signing in with their 0G account and their credit balance going down as they use your app
>
> **Submission requirements**
>
> - Project name and a short description
> - Public GitHub repo (README + setup instructions)
> - Demo video (under 3 mins) and a live demo link
> - Contract deployment addresses (if any)
> - Team member names and contact info (Telegram and X)

Resources:

- Introducing Infinite AI (iAI): https://0g.ai/blog/introducing-infinite-ai
- iAI app: https://iai.finance
- iAI docs: https://iai.finance/docs
- 0G Private Computer: https://pc.0g.ai
- 0G Compute docs: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/overview
- iAI availability and legal: https://iai.finance/docs#p-legal

### Physical AI: Agents with a Body

- Verbatim title: "Physical AI: Agents with a Body"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; Best build on real hardware $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Lanes" and "Build without hardware"
- What we want to see: Qualifications "Must show"
- Won't place: description "Not wanted"; Qualifications "A fallback that fakes the decision disqualifies."
- Qualification requirements: Qualifications "Must show" and "Submission requirements"
- Judging criteria: no rubric; 3rd prize reserved for "Best build on real hardware"; discretion clause

Description (verbatim):

> A robot, drone, wearable or pocket device whose decisions run on 0G. You don't need hardware: simulated builds are eligible for every prize, and one prize is held for the best build on real hardware. 0G is the brain, not the spinal cord: motion stays on the device, while 0G makes the decisions at key checkpoints and keeps the record.
>
> **Lanes:**
> - **Robots and machines:** arms, rovers, drones, in simulation or hardware
> - **Personal devices:** an open, verifiable alternative to Meta's Muse assistant, on glasses, a pocket device or a desktop companion, with the user's memory on 0G Storage and sealed inference
>
> **Build without hardware:** start from zerobot, 0G's open-source robot control SDK, which includes a mock robot so you can build and test with no hardware (it currently targets the Unitree Go2 on 0G Galileo testnet). Or bring your own simulator: MuJoCo, PyBullet, Gazebo + ROS 2 or LeRobot.
>
> **Not wanted:** a chatbot with a robot avatar, pre-recorded motion, 0G used only for logs.

Qualifications (verbatim):

> **Must show:**
> - A 0G call inside the decision loop: vision, voice or decision model
> - An episode log on 0G Storage with a request id per decision
> - A replayable simulation, or a live hardware demo at the 0G booth
> - A safe-stop fallback if 0G is unreachable. A fallback that fakes the decision disqualifies.
>
> **Submission requirements:**
> - Project name and a short description
> - Public GitHub repo (README + setup instructions)
> - Demo video (under 3 mins) and a live demo link
> - Contract deployment addresses
> - Team member names and contact info (Telegram and X)
>
> *Prizes are paid at 0G's discretion. We only pay out to projects that meet our quality threshold, so not every place is guaranteed to be awarded.*

Resources:

- zerobot: on-chain robot control on 0G: https://github.com/0gfoundation/zerobot
- 0G Compute models: https://pc.0g.ai/models
- 0G Storage SDK: https://docs.0g.ai/developer-hub/building-on-0g/storage/sdk
- MuJoCo: https://mujoco.org
- PyBullet: https://pybullet.org
- Gazebo: https://gazebosim.org

### Keep Building on 0G (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Keep Building on 0G"
- Total: $3,000 USDC
- Place split: Keep Building on 0G $1,500 x 2
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: none published
- What we want to see: description: "new features, production hardening, user readiness, and trajectory toward real usage"
- Won't place: description "Not wanted"
- Qualification requirements: Qualifications "Must show" and "Submission requirements"
- Judging criteria: description: "We are judging meaningful progress during the Mumbai hackathon window"

Description (verbatim):

> For teams iterating on an existing 0G project started at a previous ETHGlobal event, ETHGlobal Open Agents, Zero Cup, an AKINDO wave, or independent prior work. We are not judging polish on old demos. We are judging meaningful progress during the Mumbai hackathon window: new features, production hardening, user readiness, and trajectory toward real usage.
>
> **Not wanted:** old demos re-presented as new work, cosmetic changes only.

Qualifications (verbatim):

> **Must show:**
> - A link to prior state: a dated commit hash or the previous submission page marking where you started
> - A dated changelog of work done during the Mumbai hackathon window
> - 0G in the new work: a 0G Compute request id, a 0G Storage root hash or a 0G Chain contract address from this hackathon
> - A short "What's next" statement to show trajectory
>
> **Submission requirements:**
> - Project name and a short description
> - Public GitHub repo (README + setup instructions)
> - Demo video (under 3 mins) and a live demo link
> - Contract deployment addresses
> - Team member names and contact info (Telegram and X)
>
> *Prizes are paid at 0G's discretion. We only pay out to projects that meet our quality threshold, so not every place is guaranteed to be awarded.*

Resources:

- ETHGlobal Continuity Track: https://x.com/ETHGlobal/status/2056399209767866682
- 0G Builder Hub: https://build.0g.ai
- 0G project showcase: https://build.0g.ai/showcase
- 0G Docs: https://docs.0g.ai

### Agents That Pay for Themselves

- Verbatim title: "Agents That Pay for Themselves"
- Total: $2,000 USDC
- Place split: Agents That Pay for Themselves $1,000 x 2
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Recommended path: comfy"; "Other ways of earning count too"
- What we want to see: description "What we'd love to see"
- Won't place: description "Not wanted"
- Qualification requirements: Qualifications "Must show" and "Submission requirements"
- Judging criteria: no rubric beyond "Must show"

Description (verbatim):

> Most agents stop running the day their owner stops paying the API bill. Build one that earns its keep. It should make money, and that money should pay for its own inference on **0G Compute** without a human topping it up.
>
> **Recommended path: comfy**
>
> **comfy** is the token launchpad on 0G, and it's built for exactly this loop:
>
> 1. **Register your agent** with the comfy CLI. This mints its onchain identity on 0G.
> 2. **Launch its token and keep the compute share on.** Part of the creator fees from every trade lands as credit in the agent's 0G compute account.
> 3. **Mint a capped compute key.** The agent pays for its own model calls with it, and comfy never holds the key.
>
> Other ways of earning count too, such as charging for a service or getting paid by other agents. The money just has to reach 0G Compute **without a human in the loop**.
>
> **What we'd love to see**
>
> - Agents that do a job worth paying for or trading on, not a mascot with a token
> - **Budget-aware agents** that read their own balance and adapt, for example by switching to a cheaper model, slowing down, or pausing when funds run low
> - Agents that hire or pay other agents
>
> **Not wanted**
>
> - A token launch with a chatbot attached
> - "Revenue" that only exists because the team trades its own token
> - An agent whose wallet a human refills

Qualifications (verbatim):

> **Must show**
>
> - **The full loop:** money in, credit landing in the agent's 0G compute account, and inference paid from that balance, with **tx hashes** and **request IDs**
> - The agent running on its own during the demo with **no manual top-up**
> - A **spend cap**, and what the agent does when funds run low (it should degrade gracefully, not crash)
> - **If using comfy:** your agent ID, its token address, and the token's fees tab showing compute delivered
>
> **Submission requirements**
>
> - Project name and a short description
> - Public GitHub repo (README + setup instructions)
> - Demo video (under 3 mins) and a live demo link
> - Contract deployment addresses
> - Team member names and contact info (Telegram and X)

Resources:

- 0G Compute models: https://pc.0g.ai/models
- 0G Compute docs: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/overview
- Comfy docs: https://www.comfy.fun/docs
- Comfy Cli: https://www.npmjs.com/package/comfy-cli
- Comfy plugin for Claude Code: https://github.com/0g-axion/comfy-plugin


## Uniswap Foundation ($15,000)

Source: [Uniswap Foundation prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation), fetched 2026-10-31.

- Total: $15,000 across 2 prizes; $10,000 open to fresh builds.
- Workshop: Thu 5 Nov 16:30 to 16:50 IST, Workshop Room 1, "How to Navigate the Uniswap Stack" (20 min, Angela Ocando). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> The Uniswap Protocol is one of the largest decentralized exchange protocol for swapping value onchain across Ethereum and other supported blockchains. The Uniswap ecosystem has evolved into a full stack platform for onchain finance, including smart contracts such as v2, v3, and v4, developer tools, APIs, and emerging infrastructure like Unichain. This enables developers to build applications on top of shared, permissionless liquidity.

Sponsor resources:

- Uniswap Docs: https://developers.uniswap.org/docs?utm_medium=eco&utm_source=platform&utm_campaign=20261104-ethglobal_mumbai&utm_content=callout&utm_term=self-serve
- Uniswap Developer Platform: https://developers.uniswap.org/dashboard/welcome
- Uniswap AI Skills: https://www.skills.sh/uniswap/uniswap-ai

### Build with Uniswap

- Verbatim title: "Build with Uniswap"
- Total: $10,000 USDC
- Place split: 1st place $4,000; 2nd place $3,000; 3rd place $2,000; 4th place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description scope sentence (API, v2/v3/v4 AMM, CCA, v4 hooks, extensions, tooling)
- What we want to see: none published
- Won't place: none published
- Qualification requirements: Qualifications paragraph (repo, FEEDBACK.md, feedback form)
- Judging criteria: no rubric; "Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration."

Description (verbatim):

> Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol. This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem.

Qualifications (verbatim):

> A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file.
>
> Submissions without it will be reviewed and audited before winners are finalized. Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration.

Resources: none listed on this prize.

### Build with Uniswap (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Build with Uniswap"
- Total: $5,000 USDC
- Place split: 1st place $1,250; 2nd place $1,250; 3rd place $1,250; 4th place $1,250
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: as Build with Uniswap
- What we want to see: none published
- Won't place: none published
- Qualification requirements: as Build with Uniswap
- Judging criteria: as Build with Uniswap

Description (verbatim):

> Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol. This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem.

Qualifications (verbatim):

> A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file.
>
> Submissions without it will be reviewed and audited before winners are finalized. Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration.

Resources: none listed on this prize.


## Arc ($15,000)

Source: [Arc prizes](https://ethglobal.com/events/mumbai/prizes/arc), fetched 2026-10-31.

- Total: $15,000 across 5 prizes; $12,000 open to fresh builds.
- Workshop: Thu 5 Nov 17:00 to 17:20 IST, Workshop Room 1, "Build Apps Powered by Smart Contracts with Arc Studio" (20 min, Corey Cooper). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> Arc is Circle’s purpose-built, EVM-compatible L1 blockchain and the Economic OS for the internet. Arc Studio is the fastest way to build and deploy on it. Describe the onchain app you want, and Arc Studio works out what it needs in one place, including writing and testing any smart contracts, then builds the app around them. It has access to Arc and Circle products (USDC, EURC, Gateway, CCTP, Wallets) and other onchain skills, and you can bring your own skills into Arc Studio too.
> Every Arc prize requires using Arc Studio as the starting point. Please state which bounty you’re submitting for in your submission.

### Best DeFi / Onchain Finance App Built End to End in Arc Studio

- Verbatim title: "Best DeFi / Onchain Finance App Built End to End in Arc Studio"
- Total: $3,000 USDC
- Place split: Best DeFi / Onchain Finance App Built End to End in Arc Studio $3,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "What we're looking for"
- What we want to see: description "What we're looking for"
- Won't place: none published
- Qualification requirements: Qualifications list ("Submissions will be evaluated based on the following parameters")
- Judging criteria: the same Qualifications list is the evaluation parameters

Description (verbatim):

> Build a DeFi or onchain finance application on Arc, using USDC or EURC for settlement. Prompt Arc Studio with the app you want. If it needs smart contracts, Arc Studio writes and tests them for you.
>
> **What we’re looking for:**
>
> *   Trading apps, including trading with tokenized real-world assets (RWAs)
> *   Lending and borrowing, credit, and collateral systems
> *   Payments and liquidity infrastructure (for example, a credit co-op)
> *   Neobanks for consumers or businesses

Qualifications (verbatim):

> Submissions will be evaluated based on the following parameters. Please be clear what bounty you are submitting for as part of your submission.
> - **Built in Arc Studio.** Include your Arc Studio project URL and show Studio in your demo.
> - **Functional MVP and diagram:** Projects must demonstrate a working frontend and backend plus an architecture diagram.
> - **Video demonstration + presentation:** Succinctly outline the project's core functions and its effective use of Arc - Studio and Circle's developer tools, supported by detailed documentation.
> - **Link to GitHub/Replit repo**

Resources:

- Arc studio: http://studio.arc.com
- Arc: http://arc.io

### Best Mobile Web Consumer Agent Using the Marketplace Discovery API

- Verbatim title: "Best Mobile Web Consumer Agent Using the Marketplace Discovery API"
- Total: $3,000 USDC
- Place split: Best Mobile Web Consumer Agent Using the Marketplace Discovery API $3,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "What we're looking for"
- What we want to see: description "What we're looking for"
- Won't place: none published
- Qualification requirements: Qualifications list
- Judging criteria: the Qualifications list is the evaluation parameters; note unfilled placeholder "[Add API docs link.]"

Description (verbatim):

> Build the best mobile web consumer agent experience using our marketplace discovery API. Use Arc Studio to build a web app where a consumer’s agent discovers services through the API and pays for them in USDC on Arc, with no crypto knowledge needed from the user. [Add API docs link.]
>
> **What we’re looking for:**
> - An agent that finds and selects services through the marketplace discovery API
> - Per-use payments with Nanopayments
> - Consumer controls such as spend limits, approvals, and a history of what the agent bought
> - A mobile-first experience a non-crypto user could pick up immediately

Qualifications (verbatim):

> Submissions will be evaluated based on the following parameters. Please be clear what bounty you are submitting for as part of your submission.
> - **Built in Arc Studio.** Include your Arc Studio project URL and show Studio in your demo.
> - **Functional MVP and diagram:** Projects must demonstrate a working frontend and backend plus an architecture diagram.
> - **Video demonstration + presentation:** Succinctly outline the project's core functions and its effective use of Arc Studio and Circle's developer tools, supported by detailed documentation.
> - **Link to GitHub/Replit repo**

Resources:

- Arc Studio: https://studio.arc.com
- Arc: https://arc.io

### Best Smart Contracts with Advanced Stablecoin Logic, In Arc Studio

- Verbatim title: "Best Smart Contracts with Advanced Stablecoin Logic, In Arc Studio"
- Total: $3,000 USDC
- Place split: Best Smart Contracts with Advanced Stablecoin Logic, In Arc Studio $3,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "What we're looking for"
- What we want to see: description "What we're looking for", including "Bonus consideration for contracts designed to be reused by other builders"
- Won't place: none published
- Qualification requirements: Qualifications list
- Judging criteria: the Qualifications list is the evaluation parameters; note unfilled placeholder "[confirm reachable from Studio]"

Description (verbatim):

> Write, test, and deploy smart contracts in Arc Studio that demonstrate advanced programmable logic using USDC or EURC, such as conditional flows, onchain automation, or multi-step settlement. Then connect them to a web or mobile app, new or existing, without leaving Studio.
>
> **What we’re looking for:**
> - Conditional escrow with onchain dispute and automatic release
> - Programmable payroll or vesting in USDC or EURC
> - Treasury management and payment splitting, such as revenue splits and team or DAO payouts
> - Software-to-software payments, where one service or agent pays another
> - Crosschain “conditional transfer” (escrow on source, release on destination via Circle Forwarder) [confirm reachable from Studio]
> - Bonus consideration for contracts designed to be reused by other builders

Qualifications (verbatim):

> Submissions will be evaluated based on the following parameters. Please be clear what bounty you are submitting for as part of your submission.
> - **Built in Arc Studio.** Include your Arc Studio project URL and show Studio in your demo.
> - **Functional MVP and diagram:** Projects must demonstrate a working frontend and backend plus an architecture diagram.
> - **Video demonstration + presentation:** Succinctly outline the project's core functions and its effective use of Arc Studio and Circle's developer tools, supported by detailed documentation.
> - **Link to GitHub/Replit repo**

Resources:

- Arc Studio: https://studio.arc.com
- Arc: https://arc.io

### Best Use of Bridge Kit for Non-USDC Assets, Built in Arc Studio

- Verbatim title: "Best Use of Bridge Kit for Non-USDC Assets, Built in Arc Studio"
- Total: $3,000 USDC
- Place split: Best Use of Bridge Kit for Non-USDC Assets, Built in Arc Studio $3,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "What we're looking for"
- What we want to see: description "What we're looking for"
- Won't place: none published
- Qualification requirements: Qualifications list
- Judging criteria: the Qualifications list is the evaluation parameters

Description (verbatim):

> Use Arc Studio to build an application, protocol, or developer tool that uses CCTP via Bridge Kit for non-USDC assets to make assets meaningfully crosschain.
>
> **What we’re looking for: **
> - Applications that move non-USDC assets across chains in a single, simple user flow
> - Protocols or developer tools that make a new asset crosschain
> - Crosschain flows that settle or pair with USDC or EURC on Arc

Qualifications (verbatim):

> Submissions will be evaluated based on the following parameters. Please be clear what bounty you are submitting for as part of your submission.
> - **Built in Arc Studio.** Include your Arc Studio project URL and show Studio in your demo.
> - **Functional MVP and diagram:** Projects must demonstrate a working frontend and backend plus an architecture diagram.
> - **Video demonstration + presentation:** Succinctly outline the project's core functions and its effective use of Arc Studio and Circle's developer tools, supported by detailed documentation.
> - **Link to GitHub/Replit repo**

Resources:

- Arc Studio: https://studio.arc.com
- Arc: https://arc.io

### Arc Studio Continuity Track: Bring Your Project to Arc (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Arc Studio Continuity Track: Bring Your Project to Arc"
- Total: $3,000 USDC
- Place split: Arc Studio Continuity Track: Bring Your Project to Arc $3,000
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: description "What we're looking for"
- What we want to see: description "What we're looking for"
- Won't place: none published
- Qualification requirements: Qualifications list
- Judging criteria: the Qualifications list is the evaluation parameters

Description (verbatim):

> Are you a founder, or do you have an MVP from a previous hackathon? Take a project you already own and use Arc Studio to add a working Arc integration, by extending the existing app or rebuilding it. Open source repos and live products both qualify.
>
> **What we’re looking for:**
> - USDC or EURC payment flows added to an existing commerce, fintech, or wallet product
> - Crosschain transfers or unified balance integrated into a project already in production
> - Nanopayment infrastructure shipped into an existing AI agent or API monetization tool
> - Stablecoin settlement or escrow logic added to an existing DeFi protocol or marketplace
> - Arc-powered treasury or FX features built into a live multi-chain product

Qualifications (verbatim):

> Submissions will be evaluated based on the following parameters. Please be clear what bounty you are submitting for as part of your submission.
> - **Built in Arc Studio.** Include your Arc Studio project URL and show Studio in your demo.
> - **Functional MVP and diagram:** Projects must demonstrate a working frontend and backend plus an architecture diagram.
> - **Video demonstration + presentation:** Succinctly outline the project's core functions and its effective use of Arc Studio and Circle's developer tools, supported by detailed documentation.
> - **Link to GitHub/Replit repo**

Resources:

- Arc Stuido: https://studio.arc.com
- Arc: https://arc.io


## Hedera ($15,000)

Source: [Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera), fetched 2026-10-31.

- Total: $15,000 across 4 prizes; $13,500 open to fresh builds.
- Workshop: Thu 5 Nov 15:30 to 15:50 IST, Workshop Room 2, "Hedera X Claude Code - AI Skills for Hackathon Builders" (20 min, Pathorn Teng). ([event page](https://ethglobal.com/events/mumbai))
- About: none published.

### AI Agents That Pay: x402 on Hedera

- Verbatim title: "AI Agents That Pay: x402 on Hedera"
- Total: $6,500 USDC
- Place split: 1st place $3,000; 2nd place $2,000; 3rd place $1,500
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas"
- What we want to see: Qualifications "Extra points"
- Won't place: none published
- Qualification requirements: Qualifications list before "Extra points"
- Judging criteria: "Extra points" list; no numeric rubric

Description (verbatim):

> AI agents can reason, plan, and call tools, but most still can't pay for what they use. x402 gives them a way: it brings back the HTTP 402 Payment Required status code so a server can quote a price and a client can pay inside an ordinary request. There's no checkout page, signup, or API key.
>
> On Hedera, an x402 payment settles in HBAR or HTS tokens (including USDC) with low, fixed fees and fast finality. The facilitator pays the network fee, so the paying agent doesn't need to hold HBAR for gas. That makes it practical to charge per call, per token, or per second.
>
> Build the economy that agents run on: services that charge for each request, and agents that discover, compare, and pay for those services on their own.
>
> Ideas
>
> *   A pay-per-call AI inference or data API: model access, translation, OCR, market data, or regional-language speech-to-text, priced per request.
> *   An agent marketplace where agents hire other agents for subtasks and pay each one through x402.
> *   A metered MCP server whose tools charge per call.
> *   A research agent that works within a budget: it compares the prices of paid sources, chooses which ones to use, and reports what it spent.
> *   Micropaywalls for creators: pay a few cents per article, image, or dataset query instead of a subscription.
> *   An open-source Hedera x402 facilitator with its own safety checks and replay protection.

Qualifications (verbatim):

> - At least one x402-protected endpoint that settles on Hedera testnet or mainnet through any facilitator listed in the Hedera docs (Official x402, Ax402, or Blocky402), or through a facilitator you run yourself.
> - An agent or client that finds the endpoint and completes at least one paid request end to end, with no human approving.
> - A public GitHub repo with a README that covers setup, architecture, and the payment flow, including the Hedera transaction ID of at least one settled payment.
> - A demo video of 5 minutes or less that shows a payment settling and links to it on HashScan.
>
> Extra points
> - Spending controls for agents: budgets, per-merchant limits, allowlists, or a human-in-the-loop approval above a set amount.
> - Agent identity and reputation through HCS-14 or ERC-8004
> - An HCS topic used as a tamper-evident audit log of each agent's spending.
> - Multi-agent negotiation (A2A or ACP) before the payment is made.
> - Settling in an HTS token such as USDC, or using HTS custom fees to split revenue.
> - Recurring or subscription-style payments through Scheduled Transactions.
> - Use of the Hedera Agent Kit or Hedera Network MCP.

Resources:

- x402 on Hedera docs: https://docs.hedera.com/solutions/ai/x402
- How x402 works: https://docs.hedera.com/solutions/ai/x402/how-it-works
- Pay with x402 (client and agent setup): https://docs.hedera.com/solutions/ai/x402/pay-with-x402
- Merchant integration: https://docs.hedera.com/solutions/ai/x402/merchant-integration
- Facilitators (testnet and mainnet): https://docs.hedera.com/solutions/ai/x402/facilitators
- Hedera's exact scheme spec: https://docs.hedera.com/solutions/ai/x402/exact-scheme
- x402 protocol repo: https://github.com/x402-foundation/x402
- Blog post, "Hedera and the x402 Payment Standard": https://hedera.com/blog/hedera-and-the-x402-payment-standard/
- Hedera Agent Kit: https://docs.hedera.com/solutions/ai/agent-kit
- Hedera Network MCP: https://docs.hedera.com/solutions/ai/hosted-mcp-server
- Scaffold HBAR: https://docs.hedera.com/solutions/tools/scaffold-hbar
- Hedera Discord: https://hedera.com/discord

### Tokenize Anything with Hedera Studios

- Verbatim title: "Tokenize Anything with Hedera Studios"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas"
- What we want to see: Qualifications "Extra points"
- Won't place: none published
- Qualification requirements: Qualifications list before "Extra points"
- Judging criteria: "Extra points" list; no numeric rubric

Description (verbatim):

> Use Hedera's open-source studios to put a real-world asset or payment flow on-chain. Asset Tokenization Studio (ATS) covers the full lifecycle of security tokens, bonds, and equities, and supports ERC-3643 and ERC-1400. Stablecoin Studio covers minting and managing fiat-backed stablecoins, with admin and reserve controls built in.
>
> Pick something that exists today in finance, trade, or commerce, and show how it works when it's issued, managed, and settled on Hedera.
>
> Ideas
> - Fractional ownership of invoices or receivables for small businesses, sold to investors.
> - Tokenized bonds with on-chain coupon schedules.
> - Fractional ownership of gold, real estate, or warehouse receipts.
> - A stablecoin for cross-border remittances, with compliance controls.
> - A secondary market or order book for ATS assets.
> - An x402 service that sells data about tokenized assets, such as NAV or price feeds (this also links to Track 1).

Qualifications (verbatim):

> - Use ATS or Stablecoin Studio (SDK, contracts, web app, or a combination) to issue or manage a tokenized asset or stablecoin.
> - Deploy and demo on Hedera testnet.
> - A public GitHub repo, with contracts verified on HashScan where applicable.
> - A demo video of 5 minutes or less that covers issuance, configuration, and at least one lifecycle operation (for example a coupon payment, redemption, freeze, or reserve update).
>
> Extra points
> - Compliance controls: KYC, freezes, transfer restrictions, pauses.
> - Custom fees and distributions.
> - Oracle pricing or NAV feeds.
> - Scheduled Transactions for coupons, vesting, or recurring payouts.
> - Contributions back to ATS or Stablecoin Studio.

Resources:

- Asset Tokenization Studio: https://docs.hedera.com/solutions/tokenization/ats
- Stablecoin Studio: https://docs.hedera.com/solutions/tokenization/stablecoin
- Scaffold HBAR: https://docs.hedera.com/solutions/tools/scaffold-hbar
- Hedera Discord: https://hedera.com/discord

### "No Solidity Allowed": Build with Hedera SDKs

- Verbatim title: ""No Solidity Allowed": Build with Hedera SDKs"
- Total: $2,000 USDC
- Place split: "No Solidity Allowed": Build with Hedera SDKs $1,000 x 2
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: none published
- What we want to see: Qualifications "Extra points"
- Won't place: Qualifications: "with no Solidity smart contracts"
- Qualification requirements: Qualifications list before "Extra points"
- Judging criteria: "Extra points" list; no numeric rubric

Description (verbatim):

> Build a complete app on Hedera without writing a single smart contract. Hedera's native services cover tokens (HTS), verifiable messaging and data (HCS), scheduled and multi-signature transactions, and accounts, all through the SDKs. Show what you can ship when the network does the heavy lifting.

Qualifications (verbatim):

> - Use the Hedera JavaScript/TypeScript SDK or Python SDK, with no Solidity smart contracts.
> - Use at least two native Hedera services (for example, HTS and HCS).
> - A public GitHub repo with a README covering setup and usage.
> - A demo video of 5 minutes or less.
>
> Extra points
> - A coherent end-to-end user experience.
> - Integration with the Hedera Mirror Node REST API.
> - Creative use of HCS for data integrity, logging, or messaging.
> - The Hedera Agent Kit for AI-driven workflows.
> - A thoughtful security approach (key management, access controls).

Resources:

- Hedera SDKs: https://docs.hedera.com/hedera/sdks-and-apis
- Hedera Token Service: https://docs.hedera.com/learn/core-concepts/tokens/hts-overview
- Hedera Consensus Service: https://docs.hedera.com/reference/protobuf/consensus/consensus-service
- Mirror Node REST API: https://docs.hedera.com/reference/rest-api
- Hedera Agent Kit: https://docs.hedera.com/solutions/ai/agent-kit
- Hedera code snippets: https://github.com/hedera-dev/hedera-code-snippets
- Hedera Discord: https://hedera.com/discord

### Built on Hedera (Continuity Track) (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Built on Hedera (Continuity Track)"
- Total: $1,500 USDC
- Place split: Built on Hedera (Continuity Track) $750 x 2
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: none published
- What we want to see: description: "move it forward significantly"
- Won't place: description: "Polish and bug fixes alone don't qualify."
- Qualification requirements: Qualifications list
- Judging criteria: none published

Description (verbatim):

> Take a project that already exists on Hedera and move it forward significantly. Polish and bug fixes alone don't qualify.

Qualifications (verbatim):

> - The project was built for a previous hackathon or already exists on Hedera.
> - Substantive new work from this event: new features, new Hedera services, or a major architectural change.
> - A public GitHub repo with a README that separates what existed before from what's new, ideally with commit history or a diff.
> - A demo video of 5 minutes or less that focuses on the new work.

Resources: none listed on this prize.


## Arkiv ($15,000)

Source: [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv), fetched 2026-10-31.

- Total: $15,000 across 6 prizes; $10,500 open to fresh builds.
- Workshop: Thu 5 Nov 16:00 to 16:20 IST, Workshop Room 2, "Arkiv Workshop" (20 min, Santiago Trujillo Zuluaga; abstract "Details coming soon."). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> **Arkiv is the Web3 database**, an Ethereum-aligned DB-Chain. Your app's data lives in Arkiv entities: each one is owned by a wallet, can be queried with SQL-like filters, and expires when you choose.
>
> Most prizes are for projects built from scratch. Build on Arkiv and the Arkiv + Swarm bonus also have a prize for existing projects that add Arkiv at the event. RPC: https://rpc.rabdi.db-chain.testnet.arkiv.network · Explorer: https://rabdi.explorer.arkiv.network · Indexer: https://indexer.rabdi.db-chain.testnet.arkiv.network · Faucet: https://hub.arkiv.network/faucet · Access keys: https://hub.arkiv.network/access-keys · Chain ID: 7794095

Sponsor resources:

- Docs: https://docs.arkiv.network
- Arkiv Hub: https://hub.arkiv.network
- AI tools (MCP + plugin): https://hub.arkiv.network/ai-tools
- Discord: https://discord.gg/arkiv

### Mirror something Ethereum depends on

- Verbatim title: "Mirror something Ethereum depends on"
- Total: $4,000 USDC
- Place split: 1st place $3,000; 2nd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Example" and "Ideas"
- What we want to see: description "How we judge" questions
- Won't place: Qualifications: "Not Sourcify data, from any chain."
- Qualification requirements: Qualifications list
- Judging criteria: description "How we judge": Arkiv feedback 25%, Reach 25%, Why Arkiv 25%, Data quality 25%

Description (verbatim):

> Pick public data that Ethereum apps and developers rely on, and mirror it into Arkiv entities that anyone can query without asking you for access.
>
> **Example:** Sourcify's API looks up its 7.9 million verified Ethereum mainnet contracts by address. We mirrored them to Arkiv at [sourcify.arkiv.network](https://sourcify.arkiv.network), and now anyone can filter them by name, ABI, compiler version, deployer and more.
>
> **Ideas:** token lists, chain and RPC registries, address labels, wallet ratings, function signatures.
>
> **How we judge:**
> - **Arkiv feedback (25%):** `/arkiv/friction.md`
>   - What should we improve today to make Arkiv better: something that got in your way, or something we don't have yet that would make building easier?
>   - When something broke, what did you expect, what happened, and how can we reproduce it?
> - **Reach (25%):** `/arkiv/reach.md`
>   - How many people or projects already use or depend on this data?
>   - Who would use your copy on Arkiv after Mumbai, and for what?
> - **Why Arkiv (25%):** `/arkiv/why-arkiv.md`
>   - If this data sat in Postgres or any other database instead of Arkiv, what could people no longer do?
>   - What can people do with your copy on Arkiv that they can't do with the original source today?
> - **Data quality (25%):** `/arkiv/data-quality.md`
>   - Is the data up to date, and how does your import keep it that way?
>   - Can people filter it the way they actually search for it?

Qualifications (verbatim):

> - Built from scratch at ETHGlobal Mumbai, following ETHGlobal's rules.
> - The data's license allows republishing. Link it in your README.
> - Not Sourcify data, from any chain.
> - Your import script is in the repo, and we can re-run it.
> - Your project writes to Arkiv's current testnet (see the docs) with `@arkiv-network/sdk` or the JSON-RPC API, and a feature or query people use reads the data from Arkiv.
> - In your README: the wallet address(es) that wrote your entities, and one query we can run.
> - `/arkiv/schema.md`: your entities, the fields you query, who owns them and when they expire. `/arkiv/friction.md`: your feedback.
> - One file per criterion in How we judge, at the path next to it, answering its questions with links, numbers or a query we can run.
> - A public repo with an open-source license. Say how you used AI, as ETHGlobal's rules require.
> - Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it.

Resources:

- Sourcify on Arkiv (example): https://sourcify.arkiv.network
- Docs: https://docs.arkiv.network

### Build on Arkiv (from scratch)

- Verbatim title: "Build on Arkiv (from scratch)"
- Total: $4,000 USDC
- Place split: 1st place $3,000; 2nd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Some directions"
- What we want to see: description "How we judge" questions
- Won't place: Qualifications: "Not counted: the SDK installed but never used to read, or Arkiv used only as a log that nothing reads."
- Qualification requirements: Qualifications list
- Judging criteria: description "How we judge": Arkiv feedback 25%, Reach 25%, Why Arkiv 25%, How you use Arkiv 25%

Description (verbatim):

> Build a new app whose data lives in Arkiv. You query its entities with SQL-like filters, and each one has an owner wallet and an expiration you choose.
>
> Some directions:
> - **Agents:** ephemeral coordination state: tasks, bids and claims that agents share, query and let expire.
> - **Markets:** listings or offers that expire at their deadline.
> - **Publishing and media:** posts, profiles and follows that any app can read.
> - **Names and identity:** profiles or service directories keyed by ENS names.
>
> **How we judge:**
> - **Arkiv feedback (25%):** `/arkiv/friction.md`
>   - What should we improve today to make Arkiv better: something that got in your way, or something we don't have yet that would make building easier?
>   - When something broke, what did you expect, what happened, and how can we reproduce it?
> - **Reach (25%):** `/arkiv/reach.md`
>   - Who is it for, and would they use it?
>   - Can they try it today, and will you keep building it after Mumbai?
> - **Why Arkiv (25%):** `/arkiv/why-arkiv.md`
>   - If you swapped Arkiv for Postgres or any other database, what would your users lose?
>   - What did you keep off Arkiv, and why?
> - **How you use Arkiv (25%):** `/arkiv/how-you-use-arkiv.md`
>   - Do the things you filter on, who can edit each entity, and when it expires fit what your app does?
>   - Does each Arkiv feature you use change something your users see?

Qualifications (verbatim):

> - Built from scratch at ETHGlobal Mumbai, following ETHGlobal's rules.
> - Your app writes to Arkiv's current testnet (see the docs) with `@arkiv-network/sdk` or the JSON-RPC API, and at least one feature users see reads its data from Arkiv.
> - In your README: the wallet address(es) that wrote your entities, and one query we can run.
> - `/arkiv/schema.md`: your entities, the fields you query, who owns them and when they expire. `/arkiv/friction.md`: your feedback.
> - One file per criterion in How we judge, at the path next to it, answering its questions with links, numbers or a query we can run.
> - A public repo with an open-source license. Say how you used AI, as ETHGlobal's rules require.
> - Not counted: the SDK installed but never used to read, or Arkiv used only as a log that nothing reads.
> - Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it.

Resources:

- Docs: https://docs.arkiv.network
- AI tools (MCP + plugin): https://hub.arkiv.network/ai-tools

### Build on Arkiv (existing projects) (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Build on Arkiv (existing projects)"
- Total: $4,000 USDC
- Place split: 1st place $3,000; 2nd place $1,000
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: description "Some directions"
- What we want to see: description "How we judge" questions
- Won't place: Qualifications "Not counted" line
- Qualification requirements: Qualifications list
- Judging criteria: description "How we judge": four criteria at 25% each

Description (verbatim):

> Already building a product? Bring it to ETHGlobal Mumbai and move part of its data into Arkiv. You query Arkiv entities with SQL-like filters, and each one has an owner wallet and an expiration you choose.
>
> Some directions:
> - **Data your users own:** profiles, posts or settings that stay with each user's wallet and that other apps can read.
> - **Shared state:** listings, orders or tasks that several parties query, and that expire when they are done.
> - **Agents:** ephemeral coordination state that your agents share, query and let expire.
>
> **How we judge:**
> - **Arkiv feedback (25%):** `/arkiv/friction.md`
>   - What should we improve today to make Arkiv better: something that got in your way, or something we don't have yet that would make adding Arkiv easier?
>   - When something broke, what did you expect, what happened, and how can we reproduce it?
> - **Reach (25%):** `/arkiv/reach.md`
>   - Who uses your product today, and will they use the part on Arkiv?
>   - Will it ship to them after Mumbai?
> - **Why Arkiv (25%):** `/arkiv/why-arkiv.md`
>   - If this data stayed in your current database, what would your users lose?
>   - What did you keep off Arkiv, and why?
> - **How you use Arkiv (25%):** `/arkiv/how-you-use-arkiv.md`
>   - Do the things you filter on, who can edit each entity, and when it expires fit what your product does?
>   - Does each Arkiv feature you use change something your users see?

Qualifications (verbatim):

> - An existing project in ETHGlobal's Continuity batch, following ETHGlobal's rules.
> - The Arkiv part is new work done at ETHGlobal Mumbai. In your README, say what existed before the event and what you added; we judge only what you added.
> - Your app writes to Arkiv's current testnet (see the docs) with `@arkiv-network/sdk` or the JSON-RPC API, and at least one feature users see reads its data from Arkiv.
> - In your README: the wallet address(es) that wrote your entities, and one query we can run.
> - `/arkiv/schema.md`: your entities, the fields you query, who owns them and when they expire. `/arkiv/friction.md`: your feedback.
> - One file per criterion in How we judge, at the path next to it, answering its questions with links, numbers or a query we can run.
> - A public repo with an open-source license. Say how you used AI, as ETHGlobal's rules require.
> - Not counted: the SDK installed but never used to read, or Arkiv used only as a log that nothing reads.
> - Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it.

Resources:

- Docs: https://docs.arkiv.network
- AI tools (MCP + plugin): https://hub.arkiv.network/ai-tools

### Node tooling

- Verbatim title: "Node tooling"
- Total: $2,000 USDC
- Place split: Node tooling $2,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: "Operator dashboard" and "Slow query finder"
- What we want to see: description "How we judge" questions
- Won't place: Qualifications: "A pull request to an existing repo is not from scratch."; slow query shapes must not be published
- Qualification requirements: Qualifications list
- Judging criteria: description "How we judge": Arkiv feedback 25%, Real use 25%, What's new 25%, Easy to run 25%

Description (verbatim):

> Build a tool for the people who run Arkiv nodes. Two directions:
> - **Operator dashboard:** a collector that runs next to a node and shows how many days are left before the disk is full (with an alert), requests and latency per method, peers, sync, CPU and memory.
> - **Slow query finder:** load data into your own node and measure which query shapes are slow. Run it only on your own node, never on a public endpoint.
>
> **For reference:** [nodes.arkiv.network](https://nodes.arkiv.network) shows Arkiv's community nodes from the outside. You don't have to rebuild it: use it as a guide, and show what only a tool next to the node can see.
>
> **How we judge:**
> - **Arkiv feedback (25%):** `/arkiv/friction.md`
>   - What should we improve today to make running or querying an Arkiv node better: something that got in your way, or something we don't have yet?
>   - When something broke, what did you expect, what happened, and how can we reproduce it?
> - **Real use (25%):** `/arkiv/real-use.md`
>   - Would people who run Arkiv nodes, or Arkiv's engineers, actually use this?
>   - What does it tell them that they need to know?
> - **What's new (25%):** `/arkiv/whats-new.md`
>   - What does it show or find that the node's built-in tools don't?
>   - Is it more than putting an existing dashboard together?
> - **Easy to run (25%):** `/arkiv/easy-to-run.md`
>   - Can someone else install and run it from your README in a few minutes?
>   - Does the README say what it needs and what to do when it fails?

Qualifications (verbatim):

> - Built from scratch at ETHGlobal Mumbai: a new repo that runs next to the node. A pull request to an existing repo is not from scratch.
> - It works against an Arkiv node in your demo. A node on your own machine is enough.
> - In your README: which node you used, and how to reproduce the demo. If your tool writes Arkiv entities, also the wallet address(es) that wrote them and a `/arkiv/schema.md`.
> - `/arkiv/friction.md`: your feedback on running and querying the node.
> - One file per criterion in How we judge, at the path next to it, answering its questions with links, numbers or a query we can run.
> - Slow query shapes you find go to us privately (we will share how at the Arkiv booth), never into your public repo, `/arkiv/friction.md` or demo.
> - A public repo with an open-source license. Say how you used AI, as ETHGlobal's rules require.
> - Each team can win one Arkiv track prize; the Arkiv + Swarm bonus can come on top of it.

Resources:

- Arkiv community nodes (reference): https://nodes.arkiv.network
- Arkiv node client: https://github.com/Arkiv-Network/arkiv
- Docs: https://docs.arkiv.network

### Arkiv + Swarm bonus (from scratch)

- Verbatim title: "Arkiv + Swarm bonus (from scratch)"
- Total: $500 USDC
- Place split: Arkiv + Swarm bonus (from scratch) $500
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: keep user files on Swarm referenced from Arkiv entities, or upload them encrypted
- What we want to see: description: "The most useful integration wins."
- Won't place: Qualifications: "A project that uses only Swarm does not qualify."
- Qualification requirements: Qualifications list (`/arkiv/swarm.md` contents)
- Judging criteria: "The most useful integration wins."

Description (verbatim):

> Use Swarm ([ethswarm.org](https://www.ethswarm.org)) in your project in a meaningful way, and you are also in the running for $500. For example, keep the files your users see on Swarm and point to them from your Arkiv entities, or upload them encrypted so only the people who get the reference can open them. The most useful integration wins. It comes on top of any track prize: you can win a track and this bonus.
>
> **To enter:** when you submit a from-scratch project to Mirror, Build on Arkiv or Node tooling, also select this bonus. Arkiv's prizes count as one partner prize on ETHGlobal, so it does not use another of your three picks. Existing projects have their own Arkiv + Swarm bonus.

Qualifications (verbatim):

> - Your project uses both Arkiv and Swarm. A project that uses only Swarm does not qualify.
> - `/arkiv/swarm.md` in your repo, with:
>   - What you keep on Swarm, what you keep on Arkiv, and which entity field holds the Swarm reference or feed.
>   - One Arkiv entity key and the Swarm reference it points to, with a link we can open.
>   - The postage stamp batch ID you uploaded with and the wallet that bought it (or who gave you the batch), and the Bee node or service you uploaded through.
>   - The files in your repo that upload to Swarm and read from it.
>   - Steps to run one upload and one read yourself, what they need, and what we should see.
>   - The moment in your demo video where Swarm is used.
>   - What got in your way with Swarm.
> - Careful: an encrypted Swarm reference contains its key, and Arkiv entities are public. Never store one in an entity as it is: encrypt it first or keep it off Arkiv.

Resources:

- Swarm: https://www.ethswarm.org
- Swarm docs: https://docs.ethswarm.org

### Arkiv + Swarm bonus (existing projects) (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Arkiv + Swarm bonus (existing projects)"
- Total: $500 USDC
- Place split: Arkiv + Swarm bonus (existing projects) $500
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: as the from-scratch bonus
- What we want to see: "The most useful integration wins."
- Won't place: "A project that uses only Swarm does not qualify."
- Qualification requirements: Qualifications list
- Judging criteria: "The most useful integration wins."

Description (verbatim):

> Use Swarm ([ethswarm.org](https://www.ethswarm.org)) in what you add to your product at ETHGlobal Mumbai, and you are also in the running for $500. For example, keep the files your users see on Swarm and point to them from your Arkiv entities, or upload them encrypted so only the people who get the reference can open them. The most useful integration wins. It comes on top of the Build on Arkiv prize for existing projects: you can win both.
>
> **To enter:** when you submit your project to Build on Arkiv (existing projects), also select this bonus. Arkiv's prizes count as one partner prize on ETHGlobal, so it does not use another of your three picks.

Qualifications (verbatim):

> - An existing project in ETHGlobal's Continuity batch that uses both Arkiv and Swarm. A project that uses only Swarm does not qualify.
> - How Swarm works with your Arkiv entities is new work done at ETHGlobal Mumbai. In `/arkiv/swarm.md`, say what existed before the event; we judge only what you added.
> - `/arkiv/swarm.md` in your repo, with:
>   - What you keep on Swarm, what you keep on Arkiv, and which entity field holds the Swarm reference or feed.
>   - One Arkiv entity key and the Swarm reference it points to, with a link we can open.
>   - The postage stamp batch ID you uploaded with and the wallet that bought it (or who gave you the batch), and the Bee node or service you uploaded through.
>   - The files in your repo that upload to Swarm and read from it.
>   - Steps to run one upload and one read yourself, what they need, and what we should see.
>   - The moment in your demo video where Swarm is used.
>   - What got in your way with Swarm.
> - Careful: an encrypted Swarm reference contains its key, and Arkiv entities are public. Never store one in an entity as it is: encrypt it first or keep it off Arkiv.

Resources:

- Swarm: https://www.ethswarm.org
- Swarm docs: https://docs.ethswarm.org


## Whitechain ($15,000)

Source: [Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain), fetched 2026-10-31.

- Total: $15,000 across 4 prizes; $12,000 open to fresh builds.
- Workshop: Thu 5 Nov 16:30 to 16:50 IST, Workshop Room 2, "Whitechain Workshop" (20 min, no speaker listed). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> Whitechain is The Onchain Economy Layer: the core for onchain business to launch, operate and scale on. An EVM Layer 2 built on the OP Stack, supported by developer tooling and a partner ecosystem, with mainnet arriving in November. At ETHGlobal Mumbai together with Optimism.

Sponsor resources:

- Whitechain Docs: https://docs.whitechain.io
- Faucet: https://faucet.testnet.whitechain.io
- Explorer: https://explorer.testnet.whitechain.io
- Whitechain Builders Program: https://whitechain.io/builders
- YetiTrade testnet: https://testnet.yetitrade.fi
- Optimism: https://optimism.io
- OP Stack docs: https://docs.optimism.io
- Optimism on X: https://x.com/Optimism

### Operate · Stablecoin Payments for Business

- Verbatim title: "Operate · Stablecoin Payments for Business"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas to start from"
- What we want to see: description "What we want to see"
- Won't place: description "Won't place."
- Qualification requirements: Qualifications 1 to 6
- Judging criteria: no numeric rubric; "What we want to see" and "Won't place" are the de facto rubric

Description (verbatim):

> Give a business everything it needs to get paid in USDT on Whitechain, from the first checkout to what happens after it. Build a payment flow a real merchant could plug into their app or store, and show it working end to end with test stablecoins on Whitechain. It is plain EVM, so use any tooling you like.
>
> **Ideas to start from**
>
> *   A drop in checkout for online stores with order webhooks and an onchain receipt
> *   Payment links and invoices for remote studios, contractors and cross-border teams billing global clients, with due dates and reminders
> *   Subscriptions and recurring billing with permit based pulls and cancel anytime
> *   Refunds and partial refunds a merchant issues in one click, with a record the customer can check
>
> **What we want to see**
>
> *   A drop in piece, widget, SDK, payment link API or plugin that a separate demo app adds in about 20 lines
> *   Both views in the demo, the merchant and the paying customer
> *   Extra credit if your flow goes past the first payment, like a refund, a renewal or an export the accountant can use
>
> **Won't place.** A pay button that sends a plain transfer, tipping jars, bill splitters, or custodial bridges into a local currency token. Payroll, escrow and revenue splits on their own.

Qualifications (verbatim):

> 1. Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer
> 2. At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count
> 3. A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here
> 4. A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations
> 5. A demo video of 2 to 4 minutes that shows each party involved
> 6. A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing
>
> **Good to know before you build**
> All tracks, contracts, and test tokens (WBT, USDT) run strictly on the Whitechain Sepolia testnet and carry no monetary value. They are playground fuel for technical prototyping. Prize distribution is managed directly by ETHGlobal in USDC (or equivalent) under standard event eligibility and compliance guidelines.

Resources:

- Whitechain Docs: https://docs.whitechain.io
- Faucet: https://faucet.testnet.whitechain.io
- Explorer: https://explorer.testnet.whitechain.io
- Optimism: https://optimism.io
- OP Stack docs: https://docs.optimism.io

### Tokenize · Real World Finance on Whitechain

- Verbatim title: "Tokenize · Real World Finance on Whitechain"
- Total: $4,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas to start from"
- What we want to see: description "What we want to see"
- Won't place: description "Won't place." plus the Operate/Tokenize boundary sentence
- Qualification requirements: Qualifications 1 to 6
- Judging criteria: as Operate

Description (verbatim):

> Model real-world asset (RWA) lifecycles and compliance logic onchain. Build an issuance, settlement or lifecycle flow for a real world asset on Whitechain, where every payment happens in USDT, and show it working end to end with test stablecoins.
>
> **Ideas to start from**
> - Tokenized bonds or notes with an investor allowlist, coupon payments in USDT and repayment at maturity
> - Invoice financing where a business tokenizes an invoice, a buyer funds it at a discount and settlement happens automatically on the due date
> - Repo or short term lending agreements with delivery versus payment, where the asset and the stablecoin move in one transaction
> - Trade finance flows where importer, exporter and bank each confirm their step before funds are released
>
> **What we want to see**
> - Real transfer rules enforced in the contract, such as allowlists, transfer restrictions, maturity or settlement conditions, not just a token with a UI on top
> - A clear issuer, investor or business user and at least one full lifecycle step in the demo, from issuance to payment or settlement
>
> **Won't place.** A token with a mint button and no rules, or ownership NFTs where nothing is enforced onchain.
>
> Paying an invoice belongs in Operate. Financing or selling an invoice belongs in Tokenize.

Qualifications (verbatim):

> 1. Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer
> 2. At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count
> 3. A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here
> 4. A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations
> 5. A demo video of 2 to 4 minutes that shows each party involved
> 6. A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing
>
> **Good to know before you build**
> All tracks, contracts, and test tokens (WBT, USDT) run strictly on the Whitechain Sepolia testnet and carry no monetary value. They are playground fuel for technical prototyping. Prize distribution is managed directly by ETHGlobal in USDC (or equivalent) under standard event eligibility and compliance guidelines.

Resources:

- Whitechain Docs: https://docs.whitechain.io
- Faucet: https://faucet.testnet.whitechain.io
- Explorer: https://explorer.testnet.whitechain.io
- Optimism: https://optimism.io
- OP Stack docs: https://docs.optimism.io

### Scale · Payments Nobody Notices

- Verbatim title: "Scale · Payments Nobody Notices"
- Total: $3,000 USDC
- Place split: 1st place $2,000; 2nd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas to start from"
- What we want to see: description "What we want to see"
- Won't place: description "Won't place."
- Qualification requirements: Qualifications 1 to 6
- Judging criteria: as Operate

Description (verbatim):

> Businesses scale when their customers never have to learn crypto, and when software can pay software. Build a payment flow on Whitechain where the payer, a person or an AI agent, pays in stablecoins without holding WBT for gas, writing down a seed phrase or knowing what chain they are on.
>
> **Ideas to start from**
> - Gasless checkout where the merchant covers gas, using permit or transferWithAuthorization (EIP 3009) and your own relayer
> - Checkout with an embedded wallet or smart account from any provider that supports Whitechain Sepolia (chain ID 1874)
> - Pay per request APIs where an AI agent pays a business in USDT over x402, settled on Whitechain through a facilitator you run
>
> **What we want to see**
> - A payer flow with zero crypto steps visible, shown in the demo
> - How the business side pays for the gas, how your relayer gets its WBT, and what stops someone from draining it
>
> **Won't place.** Flows where the payer still signs a transaction that costs them gas, or AI chats that never actually pay anyone.

Qualifications (verbatim):

> 1. Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer
> 2. At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count
> 3. A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here
> 4. A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations
> 5. A demo video of 2 to 4 minutes that shows each party involved
> 6. A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing
>
> **Good to know before you build**
> All tracks, contracts, and test tokens (WBT, USDT) run strictly on the Whitechain Sepolia testnet and carry no monetary value. They are playground fuel for technical prototyping. Prize distribution is managed directly by ETHGlobal in USDC (or equivalent) under standard event eligibility and compliance guidelines.

Resources:

- Whitechain Docs: https://docs.whitechain.io
- Faucet: https://faucet.testnet.whitechain.io
- Explorer: https://explorer.testnet.whitechain.io
- Optimism: https://optimism.io
- OP Stack docs: https://docs.optimism.io

### Continuity · Bring Your Product to Whitechain (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Continuity · Bring Your Product to Whitechain"
- Total: $3,000 USDC
- Place split: 1st place $1,500; 2nd place $1,500
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: none published
- What we want to see: description "What we want to see"
- Won't place: description "Won't place."
- Qualification requirements: Qualifications 1 to 8
- Judging criteria: as Operate

Description (verbatim):

> Already have a product with users? Add Whitechain to it during the hackathon. Accept USDT payments, move a feature onchain or deploy your contracts on Whitechain. It can be a live product or an open source repo, either works.
>
> **What we want to see**
> - Real progress made this weekend, like a new feature or a new payment flow. A nicer UI on what you already had is not enough
> - Real users or a real business behind the product count in your favour
>
> **Won't place.** Projects that only repackage something built before the hackathon.
>
> **Good to know before you build**
> All tracks, contracts, and test tokens (WBT, USDT) run strictly on the Whitechain Sepolia testnet and carry no monetary value. They are playground fuel for technical prototyping. Prize distribution is managed directly by ETHGlobal in USDC (or equivalent) under standard event eligibility and compliance guidelines.

Qualifications (verbatim):

> 1. Contracts deployed on Whitechain Sepolia (chain ID 1874) and verified on the Whitechain explorer
> 2. At least one payment in USDT (0xcedfB56113143d55b2358b8CFbB0dEB5Ad2f55a7) settled on Whitechain in your main flow, with the explorer link in your README. Payments in a test token you minted yourself won't count
> 3. A line in your README on why this flow needs onchain stablecoin settlement on Whitechain and what a regular payment rail couldn't do here
> 4. Proof of your starting point, for example a dated commit from before the hackathon or the page of your earlier submission
> 5. A short "before and during" part in your README so judges can tell the old code from the Whitechain work added at this hackathon
> 6. A public GitHub repo that shows steady progress through the hackathon rather than one big upload at the end, with a README that explains setup, architecture and current limitations
> 7. A demo video of 2 to 4 minutes that shows each party involved
> 8. A WHITECHAIN_FEEDBACK.md in your repo, a few honest lines on what worked, where you got stuck and what our docs were missing

Resources:

- Whitechain Docs: https://docs.whitechain.io
- Faucet: https://faucet.testnet.whitechain.io
- Explorer: https://explorer.testnet.whitechain.io
- Optimism: https://optimism.io
- OP Stack docs: https://docs.optimism.io


## Ethereum Foundation ($15,000)

Source: [Ethereum Foundation prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), fetched 2026-10-31.

- Total: $15,000 across 4 prizes; $13,500 open to fresh builds.
- Workshop: Thu 5 Nov 17:00 to 17:30 IST, Workshop Room 2, "Ethereum Foundation Workshop" (30 min, no speaker listed). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> The Ethereum Foundation's Access Layer team builds the pieces that keep apps and wallets censorship resistant, open source, private and secure (CROPS) all the way to the user. At Mumbai we're bringing two of them: **Anon-RPC**, which anonymizes a wallet's or app's RPC reads, and the **alternative mempool for EIP-8141 frame transactions**, which opens up transaction types the public mempool won't accept. Build with either, or build any app where one CROPS property is the reason it exists.

Sponsor resources:

- What CROPS means (EF Mandate): https://blog.ethereum.org/2026/03/13/ef-mandate
- Anon-RPC: https://ethereum.github.io/anon-rpc/
- Anon-RPC GitHub: https://github.com/ethereum/anon-rpc
- Documentation: https://docs.altmempool.wtf/
- Alt Mempool Devnet Explorer: https://explorer.altmempool.wtf/
- Alt Mempool Starter Page: https://www.altmempool.wtf/
- EIP-8141: https://eips.ethereum.org/EIPS/eip-8141
- ERC-7562: https://eips.ethereum.org/EIPS/eip-7562

### Best Use of Anon-RPC

- Verbatim title: "Best Use of Anon-RPC"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas we'd love to see"
- What we want to see: none published
- Won't place: none published
- Qualification requirements: Qualifications sentence
- Judging criteria: description "Judging criteria"

Description (verbatim):

> Use Anon-RPC as an app that consumes it, or produces anonymity via a new Anon-RPC worker, or both. You could also implement/fork the anon-rpc harness to bring anon-rpc to a new platform or improve support for an existing one.
>
> **Ideas we'd love to see**
>
> *   portfolio dashboard
> *   block explorer
> *   fork of an existing dApp
> *   network health checker / playground: run anon-rpc against multiple networks and measure/compare
> *   combine anon-rpc with a light client or proof verification
> *   new network
> *   new harness
>
> **Judging criteria**
>
> *   works end to end in the demo
>
> *   quality of user experience in demo
>
> *   how much of the app's traffic goes through Anon-RPC (if an app)
>
>     *   if you choose to exclude some traffic as an intentional performance/anonymity tradeoff instead of implementation difficulty, that can be a good thing, just let us know
>
> *   could this be shipped for real after the hackathon
>
> *   technical depth

Qualifications (verbatim):

> Your app routes its RPC reads through Anon-RPC by default. If you're building a worker or the harness, a simple demo app is enough.

Resources:

- Homepage + demo: https://ethereum.github.io/anon-rpc/
- Wallet / app guide: https://ethereum.github.io/anon-rpc/wallets/
- Network guide: https://ethereum.github.io/anon-rpc/networks/
- GitHub: https://github.com/ethereum/anon-rpc
- Browser harness (npm): https://www.npmjs.com/package/@anon-rpc/browser-harness
- Browser extension harness (npm): https://www.npmjs.com/package/@anon-rpc/browser-extension-harness

### Best use of the Frame Transaction Alternative Mempool

- Verbatim title: "Best use of the Frame Transaction Alternative Mempool"
- Total: $5,000 USDC
- Place split: 1st place $2,500; 2nd place $1,500; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Build in any of three areas"
- What we want to see: none published
- Won't place: none published
- Qualification requirements: Qualifications sentence
- Judging criteria: description "Judging criteria"

Description (verbatim):

> EIP-8141 frame transactions bring native account abstraction to Ethereum: the account's own code decides what's valid. The public mempool only accepts the simple ones. The alternative mempool (ERC-8421) takes the rest, with ERC-7562-style staking and reputation rules.
>
> Build in any of three areas:
> - **something only an alt mempool makes possible:** applications that *need* (a) frame transactions with verification budget higher than 100k (e.g. PQ-secure smart wallets, or PQ-secure privacy protocols), or (b) more flexible state access in sender or paymaster (e.g. ERC20 paymasters, daily quota paymasters)
> - **developer tooling:** a viem/ethers SDK with the developer experience people expect today, an admission simulator, mempool monitoring
> - **break the rules and improve them:** DoS vectors and vulnerabilities, new rules, simulators and fuzzers
>
> **Judging criteria**
> - creativity
> - usefulness
> - practicality
> - how well it works
> - relation to the alt mempool
>
> Multiple devnets will run during the hackathon with keyed nonces and recent roots live, plus a faucet. Pierre and Alex from the alt mempool team will be on site to help.

Qualifications (verbatim):

> Show real alt mempool usage: a link to your admitted transaction on the devnet explorer, or code that submits one. Your team must be able to explain the design, the code and the trade-offs.

Resources:

- Devnet explorer: https://altmempoolexplorer.forshtat.com
- Bundler / workshop sidecar repo: https://github.com/forshtat/mempool-workshop-sidecar
- ethrex EIP-8141 tracer branch: https://github.com/forshtat/ethrex/tree/eip8141-tracer
- Devnet 1 RPC: https://devnet1.altmempool.wtf
- Devnet 1 gateway: https://gateway1.altmempool.wtf
- Devnet 3 gateway: https://gateway3.altmempool.wtf
- Devnet 3 RPC: https://devnet3.altmempool.wtf
- Devnet 2 gateway: https://gateway2.altmempool.wtf
- Devnet 2 RPC: https://devnet2.altmempool.wtf

### Best CROPS App: Censorship Resistant, Open Source, Private, Secure

- Verbatim title: "Best CROPS App: Censorship Resistant, Open Source, Private, Secure"
- Total: $3,500 USDC
- Place split: 1st place $2,000; 2nd place $1,000; 3rd place $500
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Ideas, others welcome"
- What we want to see: none published
- Won't place: Qualifications 4: "No third-party trackers or analytics in the client."
- Qualification requirements: Qualifications 1 to 5
- Judging criteria: description "Judging criteria", marked "(tbc: final review pending)"

Description (verbatim):

> CROPS = censorship resistant, open source, private, secure. Most apps lose at least one on the way to users: a frontend that only lives on one domain, a wallet you can't recover without the vendor's server, a dapp whose RPC provider sees every address you look at.
>
> Build an app, wallet feature or dev tool where one CROPS property is the reason it exists, without giving up the other three. EF tooling is optional: anon-rpc (private reads) and the alt mempool (private sends, new tx shapes) have their own EF prizes.
>
> Ideas, others welcome:
> - a wallet a user can fully recover with nothing from you: no server, API or relayer
> - a frontend that keeps working when its domain, backend or RPC provider disappears
> - a payment, messaging or social app where your server learns nothing about who talks to whom
> - a tool that shows what an app leaks (RPC calls, trackers, metadata)
> - a tool that proves the shipped frontend or extension matches the public repo
>
> **Judging criteria**
> - works end to end in the demo
> - depth of the lead property: structural (works without you) beats cosmetic (a setting)
> - the other three still hold, or trade-offs are stated in the README
> - UX: would someone use it without knowing what CROPS means
> - could it ship after the hackathon
>
> (tbc: final review pending)

Qualifications (verbatim):

> 1. Public repo under a free and open-source license (MIT, Apache-2.0, GPL, MPL or similar), with a README a judge can run it from.
> 2. The README has a section titled CROPS, one or two lines per letter:
>    - C: what you control that the user depends on (domain, server, RPC, relayer) and what happens if it goes away or refuses them
>    - O: the license, and whether a user can build and run it from the repo alone
>    - P: what each third party (your server, RPC provider, analytics, indexers) learns about the user
>    - S: how keys and user data are protected, and the trust assumptions
> 3. A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters: for example you switch off your backend, swap the RPC provider, or show server logs with nothing identifying in them.
> 4. No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not.
> 5. One EF prize per project. You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one. EF judges decide where it fits best.

Resources:

- What CROPS means (EF Mandate): https://blog.ethereum.org/2026/03/13/ef-mandate
- Scaffold-ETH 2: https://github.com/scaffold-eth/scaffold-eth-2
- Scaffold-ETH docs: https://scaffoldeth.io
- Private reads: Anon-RPC: https://ethereum.github.io/anon-rpc/
- Anon-RPC wallet and app guide: https://ethereum.github.io/anon-rpc/wallets/
- Private sends: alt mempool explorer: https://altmempoolexplorer.forshtat.com
- Privacy SDK: Kohaku: https://github.com/ethereum/kohaku
- How wallets get rated on these properties: Walletbeat: https://walletbeat.eth.limo

### Best CROPS Upgrade to an Existing Project (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Best CROPS Upgrade to an Existing Project"
- Total: $1,500 USDC
- Place split: Best CROPS Upgrade to an Existing Project $1,500
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: description first paragraph
- What we want to see: none published
- Won't place: Qualifications 5
- Qualification requirements: Qualifications 1 to 6
- Judging criteria: description "Judging criteria", marked "(tbc: final review pending)"

Description (verbatim):

> Already have a project? Add one CROPS property to it during the hackathon: recovery that needs nothing from you, a frontend that survives losing its domain or RPC provider, a server that learns nothing, a build users can verify. Show us the before and after.
>
> CROPS = censorship resistant, open source, private, secure. The new property should be the reason the upgrade matters, without giving up the other three. EF tooling is optional: anon-rpc (private reads) and the alt mempool (private sends, new tx shapes) can help.
>
> **Judging criteria**
> - works end to end in the demo
> - depth of the new property: structural (works without you) beats cosmetic (a setting)
> - the other three still hold, or trade-offs are stated in the README
> - UX: would someone use it without knowing what CROPS means
> - could it ship after the hackathon
>
> Only the new work done during the hackathon is judged.
>
> (tbc: final review pending)

Qualifications (verbatim):

> 1. Public repo under a free and open-source license (MIT, Apache-2.0, GPL, MPL or similar), with a README a judge can run it from.
> 2. The README has a section titled CROPS, one or two lines per letter:
>    - C: what you control that the user depends on (domain, server, RPC, relayer) and what happens if it goes away or refuses them
>    - O: the license, and whether a user can build and run it from the repo alone
>    - P: what each third party (your server, RPC provider, analytics, indexers) learns about the user
>    - S: how keys and user data are protected, and the trust assumptions
> 3. The README states what the project looked like before the hackathon and which property is new.
> 4. A demo video (3 minutes max) showing the before and after, including the moment the new property matters.
> 5. No third-party trackers or analytics in the client. Keys and personal data stay on the user's device, or the README says why not.
> 6. One EF prize per project. EF judges decide where it fits best.

Resources:

- What CROPS means (EF Mandate): https://blog.ethereum.org/2026/03/13/ef-mandate
- Private reads: Anon-RPC: https://ethereum.github.io/anon-rpc/
- Private sends: alt mempool explorer: https://altmempoolexplorer.forshtat.com
- Privacy SDK: Kohaku: https://github.com/ethereum/kohaku
- How wallets get rated on these properties: Walletbeat: https://walletbeat.eth.limo


## ENS ($10,000)

Source: [ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens), fetched 2026-10-31.

- Total: $10,000 across 2 prizes; $7,000 open to fresh builds.
- Workshop: Thu 5 Nov 16:00 to 16:20 IST, Workshop Room 1, "ENSv2 - Identity for Apps, Agents & Beyond" (20 min, Yash Goyal). ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> ENS is the universal pointer for anything on the internet. It turns wallet addresses into human-readable names like yourname.eth: a portable, onchain profile that works across every app, chain, and wallet.
>
> Developers use ENS to replace raw addresses with real identities, build decentralized websites, and create scalable subname ecosystems. As AI agents become first-class onchain actors, ENS is how you give them a name, a reputation, and a place to be found.

Sponsor resources:

- ENSv2 docs: https://docs.ens.domains/ensv2/overview/
- Agent-native CLI: https://github.com/ensdomains/ens-cli
- Agent Text Records: https://docs.ens.domains/ensip/26/
- Building with AI: https://docs.ens.domains/building-with-ai/
- AI Agent Registry ENS Name Verification: https://docs.ens.domains/ensip/25/

### Best Use of ENSv2

- Verbatim title: "Best Use of ENSv2"
- Total: $7,000 USDC
- Place split: 1st place $3,000; 2nd place $2,000; 3rd place $1,000; 3rd place $1,000
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description: wildcard resolution, subname registries, Enhanced Access Control, Permissioned Resolver, aliasing, subname setups
- What we want to see: description: "Bonus points if you bring AI agents into the mix."
- Won't place: Qualifications: "not a cosmetic add-on"; "not just include hard-coded values"
- Qualification requirements: Qualifications paragraph
- Judging criteria: no rubric beyond Qualifications and the AI agents bonus

Description (verbatim):

> ENSv2 is now live on Ethereum mainnet. Be among the first to build on it. Explore the new hierarchical registry structure: resolve subnames straight off a parent's resolver with wildcard resolution, or deploy your own subname registry to tokenize and manage subnames under your own rules. Use Enhanced Access Control, the shared, role-based permission system behind both registries and resolvers, to delegate specific rights, like letting an account edit only certain text records on a name. Give subnames their own Permissioned Resolver so they fully own their data, mix in record aliasing at the resolver level or namespace aliasing via a shared registry, and combine it all to build subname setups: expiring, revocable, non-transferable vs. transferable, even forever names with no parent control. Bonus points if you bring AI agents into the mix. Think agents as namespaces, each with their own identity and permissions.

Qualifications (verbatim):

> Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values. Upon submission, your project showcase must have a link to a live demo and the code needs to be open source and accessible on Github or a similar platform.

Resources:

- Permissioned Registry docs: https://docs.ens.domains/ensv2/permissioned-registry
- Permissioned Resolver docs: https://docs.ens.domains/ensv2/permissioned-resolver/
- Enhanced Access Control docs: https://docs.ens.domains/ensv2/enhanced-access-control/
- Guide for Contract Developers: https://docs.ens.domains/ensv2/tutorial-contract-developers/

### Best Integration of ENSv2 into an Existing Project (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Best Integration of ENSv2 into an Existing Project"
- Total: $3,000 USDC
- Place split: 1st place $2,000; 2nd place $1,000
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: description feature list
- What we want to see: none published
- Won't place: Qualifications: "not just a cosmetic add-on"
- Qualification requirements: Qualifications paragraph
- Judging criteria: none published

Description (verbatim):

> ENSv2 is now live on Ethereum mainnet. Explore how ENSv2's feature set, including the new registry hierarchy, Enhanced Access Control, Permissioned Resolvers, and record and namespace aliasing, can plug into an existing protocol or project to improve the user experience or unlock entirely new use cases. Take a project you already know, yours or an open one, and integrate it against ENSv2 on Ethereum mainnet.

Qualifications (verbatim):

> Integration must use ENSv2 on Ethereum mainnet and integrate it into an existing project. It should be clear how ENSv2 improves the project, not just a cosmetic add-on. Your demo must be functional and not just include hard-coded values. Upon submission, your project showcase must have a link to a live demo and the code needs to be open source and accessible on Github or a similar platform.

Resources:

- Guide for App Developers: https://docs.ens.domains/ensv2/tutorial-app-developers/


## Definitive ($5,000)

Source: [Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive), fetched 2026-10-31.

- Total: $5,000 across 2 prizes; $2,500 open to fresh builds.
- Workshop: none listed in the schedule. ([event page](https://ethglobal.com/events/mumbai))
- About (verbatim):

> Definitive Finance (www.definitive.fi) is an onchain trading platform offering professional-grade trade execution for any ERC-20 or SPL asset. Definitive’s web, mobile, and API products serve pro-traders and builders everywhere, with a track record of $3B+ notional spot volume settled over millions of transactions onchain. Definitive delivers a CeFi-like experience in DeFi: advanced orders (DCA, Limit, Stop Loss, Take Profit, Cross-Chain, Bracket, Market) and access to 900+ unique liquidity sources across 12 EVM chains and Solana, in one terminal and API. Our newest release, Flash API, exposes that same execution engine, order types, routing, and managed execution in a single REST API and MCP server, built for both human builders and AI agents.

Sponsor resources:

- Docs: https://flash.definitive.fi/docs
- Get API Key: https://flash.definitive.fi/docs/getting-started
- Agentic Integration Quickstart: https://flash.definitive.fi/docs/for-agents
- MCP Server Setup: https://flash.definitive.fi/docs/flash-mcp

### Best Use of Flash Advanced Orders in a Social App

- Verbatim title: "Best Use of Flash Advanced Orders in a Social App"
- Total: $2,500 USDC
- Place split: Best Use of Flash Advanced Orders in a Social App $2,500
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description list (copy trading, signals or leaderboards, agent-run products)
- What we want to see: description "A few helpful tips"
- Won't place: none published
- Qualification requirements: Qualifications list
- Judging criteria: none published

Description (verbatim):

> Trading is more fun, and stickier, when it's not a solo activity. Build the best social trading agent or app on top of Flash's advanced order types and show us what trading looks like when people are in it together. We encourage creativity - your product could involve:
> -  Copy trading using Flash for trade execution
> -  Trade signals or leaderboards shared to X, TikTok and other social channels
> -  Agent-run products (e.g Grok bot) other users can follow
> -  Your own take, any product that makes trading a shared experience
>
> A few helpful tips:
> -  Flash is non-custodial, and works seamlessly with any EOA wallet or embedded wallet solution like Privy, Dynamic or Coinbase Embedded Wallets.
> -  Every order type (DCA, Limit, Stop Loss, Stop Buy, Take Profit, TWAP, Bracket) runs through the same orders endpoint, and Flash handles the trade execution end-to-end, landing the trade onchain for you.
> -  You can attach a fee to every trade you route through Flash, so your social trading product can be monetized from Day 1.
> -  Flash is AI-native and agent-friendly, and has an MCP server and LLM-optimized docs for fast integration.

Qualifications (verbatim):

> -  A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP).
> -  Onchain execution shown in the final demo.
> -  Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X.

Resources:

- Flash Docs: https://flash.definitive.fi/docs
- Get an API Key: https://flash.definitive.fi/docs/getting-started
- Agentic Integration Quickstart: https://flash.definitive.fi/docs/for-agents
- MCP Server Setup: https://flash.definitive.fi/docs/flash-mcp
- Trade Order Types: https://flash.definitive.fi/docs/placing-orders
- Quote Endpoint Reference: https://flash.definitive.fi/docs/api-reference/flash/quote
- Order Endpoint Reference: https://flash.definitive.fi/docs/api-reference/flash/order

### Most Creative Use of Definitive Flash Advanced Orders (CONTINUITY ONLY: not eligible for us)

- Verbatim title: "Most Creative Use of Definitive Flash Advanced Orders"
- Total: $2,500 USDC
- Place split: Most Creative Use of Definitive Flash Advanced Orders $2,500
- Continuity-only: **yes** (category `continuity-track`)
- Listed ideas: description "Examples include..."
- What we want to see: none published
- Won't place: none published
- Qualification requirements: Qualifications list
- Judging criteria: description: "originality of the integration, technical creativity, and how well the demo shows off what Flash can do"

Description (verbatim):

> Awarded to the team that takes Flash's advanced orders somewhere unexpected, incorporated in a bigger agent workflow, paired with another protocol's tools, or given a strategy nobody has imagined.
>
> Examples include multi-agent systems where Flash is one tool among several, voice or chat interfaces for trading, or workflows that combine Flash with other MCP servers or onchain data sources.
>
> Projects will be judged based on originality of the integration, technical creativity, and how well the demo shows off what Flash can do.
>
> A few helpful tips:
> -  Flash is non-custodial, and works seamlessly with any EOA wallet or embedded wallet solution like Privy, Dynamic or Coinbase Embedded Wallets.
> -  Every order type (DCA, Limit, Stop Loss, Stop Buy, Take Profit, TWAP, Bracket) runs through the same orders endpoint, and Flash handles the trade execution end-to-end, landing the trade onchain for you.
> -  You can attach a fee to every trade you route through Flash, so your social trading product can be monetized from Day 1.
> -  Flash is AI-native and agent-friendly, and has an MCP server and LLM-optimized docs for fast integration.

Qualifications (verbatim):

> -  A working trading flow powered by Flash API or Flash MCP advanced orders (DCA, Limit, Stop, Stop Loss, Take Profit, TWAP).
> -  Onchain execution shown in the final demo.
> -  Submit a short demo video on both Discord and X featuring your product. Tag @DefinitiveFi on X.

Resources:

- Flash Docs: https://flash.definitive.fi/docs
- Get an API Key: https://flash.definitive.fi/docs/getting-started
- Agentic Integration Quickstart: https://flash.definitive.fi/docs/for-agents
- MCP Server Setup: https://flash.definitive.fi/docs/flash-mcp
- Trade Order Types: https://flash.definitive.fi/docs/placing-orders
- Quote Endpoint Reference: https://flash.definitive.fi/docs/api-reference/flash/quote
- Order Endpoint Reference: https://flash.definitive.fi/docs/api-reference/flash/order
- Monetize Your Integration: https://flash.definitive.fi/docs/monetizing-your-integration


## Chainlink ($5,000)

Source: [Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink), fetched 2026-10-31.

- Total: $5,000 across 2 prizes; $5,000 open to fresh builds.
- Workshop: none listed in the schedule. ([event page](https://ethglobal.com/events/mumbai))
- About: none published.

### Best workflow with CRE

- Verbatim title: "Best workflow with CRE"
- Total: $1,500 USDC
- Place split: Best workflow with CRE $1,500
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: none published
- What we want to see: none published
- Won't place: none published
- Qualification requirements: Qualifications "Goal" and "Your workflow should"
- Judging criteria: none published

Description (verbatim):

> *Build your workflow with CRE!* Chainlink Runtime Environment (CRE) is an all-in-one orchestration layer that enables developers to build institutional-grade smart contracts [dash replaced] data-connected, compliance-ready, privacy-preserving, and interoperable across blockchains and traditional systems. With CRE, you can connect blockchains to external APIs, enterprise systems, data sources, LLMs, or AI agents.

Qualifications (verbatim):

> *Requirements:*
>
>  *Goal:*
>  Build, simulate, or deploy a CRE Workflow that’s used as an orchestration layer within your project. *Note*: It is NOT mandatory to deploy it during the hackathon, simulation is enough!
>
>  *Your workflow should:*
> - Integrate at least one blockchain with an external API, system, data source, LLM, or AI agent.
> - Demonstrate a successful simulation (via the CRE CLI) or a live deployment on the CRE network.
> - Be meaningfully used in your project

Resources:

- CRE Docs: https://docs.chain.link/cre
- Intro to CRE: https://www.youtube.com/playlist?list=PLVP9aGDn-X0S-JmwQKGTao6o_CMitvv2_
- CRE Templates: https://github.com/smartcontractkit/cre-templates/

### Best use of Chainlink CCIP 2.0

- Verbatim title: "Best use of Chainlink CCIP 2.0"
- Total: $3,500 USDC
- Place split: Best use of Chainlink CCIP 2.0 $1,750 x 2
- Continuity-only: no (category `building-from-scratch`)
- Listed ideas: description "Possible use cases"
- What we want to see: Qualifications: "you are encouraged to utilize Chainlink Runtime Environment (CRE), Chainlink Data Feeds, Chainlink Data Streams and Chainlink VRF"
- Won't place: Qualifications: "a front end simply reading from Chainlink Data Feeds doesn't count"
- Qualification requirements: Qualifications paragraph
- Judging criteria: none published

Description (verbatim):

> Build something awesome using Chainlink CCIP 2.0! The Chainlink Cross-Chain Interoperability Protocol (CCIP) provides a single simple interface through which applications can securely meet all their cross-chain needs, including token transfers and arbitrary messaging. CCIP 2.0 begins a new era for the digital asset industry by laying the rails for hundreds of trillions of dollars in capital from existing financial systems to flow onchain.
>
> Possible use cases: Cross-chain DeFi app with liquidity across multiple chains Cross Chain DeFi yield aggregator Token bridge powered by CCIP Multihop CCIP Router. You want to send cross-chain message from blockchain A to blockchain B without worrying if the lane between them exists.
>
> Use our CCIP Local Simulator to speed up your development on your local Hardhat, Foundry or Remix network, then use our Faucet to easily get testnet funds when you're ready for testnet. Links to both at the bottom in the 'Resources' Section!

Qualifications (verbatim):

> Each project must use Chainlink CCIP in some form to make a state change on a blockchain, otherwise it will not be eligible for the Chainlink core prizes. This means that a front end simply reading from Chainlink Data Feeds doesn't count. Using Chainlink CCIP inside your smart contracts is required, though you are encouraged to utilize Chainlink Runtime Environment (CRE), Chainlink Data Feeds, Chainlink Data Streams and Chainlink VRF.

Resources:

- CCIP Documentation: https://docs.chain.link/ccip

