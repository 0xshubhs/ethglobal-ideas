export const meta = {
  name: 'ethglobal-track-ideas',
  description: 'Per-sponsor track history and winners, idea generation and sponsor judge panels for fresh builds, then track combos, workshop questions, a finalist idea panel and synthesis',
  whenToUse: 'Before an ETHGlobal hackathon, to turn live sponsor prize tracks, past winners and the current market season into vetted, winnable fresh-build project ideas',
  phases: [
    { title: 'Tracks', detail: 'refresh live prize tracks and research the market season' },
    { title: 'Sponsors', detail: 'per sponsor: past tracks, winners and why they won, then draft ideas per fresh track' },
    { title: 'Sponsor judges', detail: 'per sponsor: judge panel scores, repairs and ranks ideas, and lists workshop questions' },
    { title: 'Workshop questions', detail: 'one question sheet ordered by the workshop schedule' },
    { title: 'Track combos', detail: 'multi-sponsor prize stacks, then an adversarial combo check' },
    { title: 'Finalist ideas', detail: 'cross-track finalist candidates and a three-lens judge panel' },
    { title: 'Synthesis', detail: 'final finalist list and master index' },
  ],
}

const A = args
const OUT = A.outDir
const REFS = A.references.map(p => '- ' + p).join('\n')
const RULES = [
  'House rules: never use an em dash (U+2014) or en dash (U+2013) anywhere; after writing each file, run grep -cP "\\x{2014}|\\x{2013}" on it and fix it until it prints 0.',
  'Never put comments inside code snippets.',
  'Separate sourced facts (each with a URL) from your own judgement, and label judgement as such.',
  'Write only to the output paths named in this task. Do not commit or push.',
  'ETHGlobal pages may rate-limit or show bot checks: fetch slowly, never try to circumvent a bot check, and fall back to the existing notes when blocked, saying so.',
].join('\n')
const FRESH = 'Fresh builds only: the team enters the Classic track with no existing project, so ignore Continuity-only tracks entirely and never propose an idea that depends on pre-existing project code. Public libraries, SDKs and starter kits are fine.'
const CONTEXT = [
  `Event: ${A.event.name}, ${A.event.dates}, ${A.event.venue}. Prize page: ${A.event.prizesUrl}. Today is ${A.today}.`,
  `Team: ${A.team}`,
  FRESH,
  'Stacking rules: a project may select at most 3 partner prizes; a partner with several tracks counts as 1; the Ethereum Foundation places a project in at most one EF prize; the ETHGlobal finalist track is separate and does not count as a partner prize. Partner prizes are judged only from the repo, README and video; finalists are judged in a 7 minute live session (4 minute demo, 3 minute Q and A) on Technicality, Originality, Practicality, Usability and WOW Factor.',
  'Existing research and notes you should reuse instead of re-researching (read what is relevant):',
  REFS,
].join('\n')

const TRACKS_SCHEMA = {
  type: 'object',
  properties: {
    sponsors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          slug: { type: 'string' },
          total: { type: 'string' },
          workshop: { type: 'string' },
          tracks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                amount: { type: 'string' },
                continuityOnly: { type: 'boolean' },
              },
              required: ['title', 'continuityOnly'],
            },
          },
        },
        required: ['name', 'slug', 'tracks'],
      },
    },
    changesSinceSnapshot: { type: 'string' },
  },
  required: ['sponsors', 'changesSinceSnapshot'],
}

const DRAFT_SCHEMA = {
  type: 'object',
  properties: {
    sponsor: { type: 'string' },
    historyFile: { type: 'string' },
    draftFile: { type: 'string' },
    pastEventsCovered: { type: 'number' },
    keyLessons: { type: 'array', items: { type: 'string' } },
    ideaCount: { type: 'number' },
  },
  required: ['sponsor', 'historyFile', 'draftFile', 'keyLessons', 'ideaCount'],
}

const FINAL_SCHEMA = {
  type: 'object',
  properties: {
    sponsor: { type: 'string' },
    finalFile: { type: 'string' },
    tracks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          track: { type: 'string' },
          ideas: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                oneLiner: { type: 'string' },
                score: { type: 'number' },
                stack: { type: 'string' },
              },
              required: ['title', 'oneLiner', 'score', 'stack'],
            },
          },
        },
        required: ['track', 'ideas'],
      },
    },
    top3: { type: 'array', items: { type: 'string' } },
    workshopQuestions: { type: 'array', items: { type: 'string' } },
  },
  required: ['sponsor', 'finalFile', 'tracks', 'top3', 'workshopQuestions'],
}

const SHEET_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    slots: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          time: { type: 'string' },
          sponsor: { type: 'string' },
          mustAsk: { type: 'array', items: { type: 'string' } },
        },
        required: ['time', 'sponsor', 'mustAsk'],
      },
    },
    askBeforeEvent: { type: 'array', items: { type: 'string' } },
  },
  required: ['file', 'slots', 'askBeforeEvent'],
}

const COMBO_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    combos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          coreIdea: { type: 'string' },
          prizes: { type: 'array', items: { type: 'string' } },
          extraHours: { type: 'number' },
          conflicts: { type: 'string' },
        },
        required: ['name', 'coreIdea', 'prizes', 'extraHours', 'conflicts'],
      },
    },
  },
  required: ['file', 'combos'],
}

const COMBO_CHECK_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          verdict: { type: 'string', enum: ['sound', 'trim', 'broken'] },
          issue: { type: 'string' },
        },
        required: ['name', 'verdict', 'issue'],
      },
    },
  },
  required: ['file', 'results'],
}

const GEN_SCHEMA = {
  type: 'object',
  properties: {
    draftFile: { type: 'string' },
    ideas: {
      type: 'array',
      items: {
        type: 'object',
        properties: { title: { type: 'string' }, oneLiner: { type: 'string' }, stack: { type: 'string' } },
        required: ['title', 'oneLiner', 'stack'],
      },
    },
  },
  required: ['draftFile', 'ideas'],
}

const VOTES_SCHEMA = {
  type: 'object',
  properties: {
    lens: { type: 'string' },
    file: { type: 'string' },
    votes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          score: { type: 'number' },
          verdict: { type: 'string', enum: ['keep', 'revise', 'drop'] },
          note: { type: 'string' },
        },
        required: ['title', 'score', 'verdict', 'note'],
      },
    },
  },
  required: ['lens', 'file', 'votes'],
}

const SYNTH_SCHEMA = {
  type: 'object',
  properties: {
    finalistFile: { type: 'string' },
    indexFile: { type: 'string' },
    finalistCount: { type: 'number' },
    finalistTop: {
      type: 'array',
      items: {
        type: 'object',
        properties: { title: { type: 'string' }, oneLiner: { type: 'string' }, stack: { type: 'string' } },
        required: ['title', 'oneLiner', 'stack'],
      },
    },
    teamPicks: { type: 'array', items: { type: 'string' } },
    whatElseToAdd: { type: 'array', items: { type: 'string' } },
  },
  required: ['finalistFile', 'indexFile', 'finalistCount', 'finalistTop', 'teamPicks', 'whatElseToAdd'],
}

phase('Tracks')

const seasonP = agent(`Research what is "in season" for builders and judges at ${A.event.name} as of ${A.today}.

${CONTEXT}

Cover, with dated sources:
1. Crypto market narratives that are bullish or rising right now (October to November 2026): stablecoins and payments (including regulation such as GENIUS Act follow-ups and MiCA), AI agents and agent payments (x402, ERC-8004), prediction markets, perps and onchain trading, RWA and tokenization, privacy, Bitcoin DeFi, restaking, consumer apps, L2 and interop, and anything new this quarter. Include India-specific context (regulation, tax, UPI and stablecoin rails, the Indian crypto market, Devcon 8 India themes).
2. What the Ethereum protocol and ecosystem just shipped or is about to ship, because "a standard that just shipped" is a recurring finalist pattern: Glamsterdam and Fusaka status, Hegota scope (EIP-8141 frame transactions, FOCIL), EIP-7702 adoption, ENSv2, Uniswap v4 and Continuous Clearing Auctions, 1inch Aqua and SwapVM, Chainlink CRE, Circle Arc and Arc Studio, World ID 4.0 and AgentKit, Hedera x402, 0G, Arkiv, Whitechain mainnet, Anon-RPC 0.4.0, Clear Signing ERC-7730, zkAPI.
3. What ETHGlobal judges rewarded at the last three events (use the finalist report in the references).
4. Narratives that are fading or overcrowded.

${RULES}

Write ${OUT}/00_season.md. Return a summary of at most 350 words: the top 10 in-season signals with one line each on why they matter for a hackathon idea, then 5 fading or crowded ones.`, { label: 'market season', phase: 'Tracks' })

const tracks = await agent(`Refresh the live prize tracks for ${A.event.name}.

${CONTEXT}

Fetch ${A.event.prizesUrl} (read the raw HTML or embedded Next.js data if the rendered text is thin), each sponsor's prize subpage, and the event schedule on the event page (for each sponsor workshop: time, room, length). A snapshot taken on 2026-10-26 is in judging_criteria.md (sections Q1 to Q4) in the references; compare against it and record every change (for example Arkiv publishing its prizes, the EF CROPS "tbc" text changing, Arc placeholders being filled, new sponsors or tracks).

Write ${OUT}/00_current_tracks.md containing, for every sponsor and every track: the verbatim title, total and place split, whether it is Continuity-only, the verbatim description, the listed ideas, "What we want to see", "Won't place", qualification requirements, judging criteria, and resources. Add the stacking rules, the event timeline and the full workshop schedule at the top, and a "Changes since 2026-10-26" section.

${RULES}

Return the structured list of sponsors and their tracks (slug should be a short lowercase file-safe id such as "uniswap" or "ef"; workshop should give the sponsor's workshop time and room if listed). Mark every Continuity-only track with continuityOnly true.`, { label: 'live tracks', phase: 'Tracks', schema: TRACKS_SCHEMA, effort: 'medium' })

if (!tracks || !tracks.sponsors || tracks.sponsors.length === 0) {
  log('No sponsors returned by the live tracks agent; stopping.')
  return { error: 'no sponsors' }
}

const sponsors = tracks.sponsors
  .map(s => ({ ...s, fresh: s.tracks.filter(t => !t.continuityOnly) }))
  .filter(s => s.fresh.length > 0)
const skippedTracks = tracks.sponsors.flatMap(s => s.tracks.filter(t => t.continuityOnly).map(t => `${s.name}: ${t.title}`))
const skippedSponsors = tracks.sponsors.filter(s => s.tracks.every(t => t.continuityOnly)).map(s => s.name)
const freshCount = sponsors.reduce((n, s) => n + s.fresh.length, 0)
log(`${sponsors.length} sponsors with ${freshCount} fresh-build tracks. Skipped ${skippedTracks.length} Continuity-only tracks${skippedSponsors.length ? ' and sponsors with only Continuity tracks: ' + skippedSponsors.join(', ') : ''}.`)
log(`Changes since 2026-10-26: ${tracks.changesSinceSnapshot}`)

const results = await pipeline(
  sponsors,
  async (s) => {
    const season = (await seasonP) || 'Season brief unavailable; read ' + OUT + '/00_season.md if it exists.'
    const trackList = s.fresh.map(t => `- ${t.title}${t.amount ? ' (' + t.amount + ')' : ''}`).join('\n')
    return agent(`You are the track historian and idea designer for the sponsor "${s.name}" at ${A.event.name}.

${CONTEXT}

Current ${s.name} tracks open to fresh builds at ${A.event.name} (full verbatim text is in ${OUT}/00_current_tracks.md, read this sponsor's section first; ignore any Continuity-only track):
${trackList}

Market season summary (full brief in ${OUT}/00_season.md):
${season}

PART 1, HISTORY. Write ${OUT}/history/${s.slug}.md.
- List every ETHGlobal hackathon from late 2023 to October 2026 where ${s.name} offered prizes (use https://ethglobal.com/events/<event-slug>/prizes and sponsor prize subpages, and the event list at https://ethglobal.com/events). For each: the track titles and problem statements, verbatim where possible, and prize amounts.
- For each past track, find the winners (1st, 2nd, 3rd or pool winners) and what they built. Showcase project pages show "Winner of" badges naming the sponsor prize; showcase listings (https://ethglobal.com/showcase?events=<event-slug>&page=N) carry each project's prize organizations. The finalist catalogues in the references already record partner prizes won by finalists; start there, then fill gaps. Sponsor blogs or posts announcing hackathon winners are also good sources.
- Explain why winners won over other entries in the same track: compare the winners with a sample of non-winning projects at the same events that used this sponsor's technology, and infer what the sponsor's judges reward (depth and centrality of the integration, novelty, real usage, polish, compliance with specific requirements, a clear demo). Be concrete and cite examples.
- Show how this sponsor's problem statements changed over time and what that signals about what they want now (for example Uniswap v4 hooks tracks in 2024 and 2025 versus "Build with Uniswap" and Continuous Clearing Auctions in 2026; 1inch Fusion+ versus Aqua and SwapVM; Chainlink CCIP and Functions versus CRE; World ID versus World ID 4.0, Mini apps, IDKit and Agent Pass). Map each current track to its nearest past tracks and mark it new, changed or repeated.
- If ${s.name} has little or no ETHGlobal history, use its other hackathons (Devfolio, ETHIndia, its own events) and analogous tracks from similar sponsors (for a payments chain, compare Circle and Arc, Coinbase CDP and PayPal PYUSD merchant payment tracks), and say so.
- Keep the dossier dense and sourced; aim for depth over length.

PART 2, IDEAS. Write ${OUT}/ideas_draft/${s.slug}.md.
- For each fresh-build track listed above, propose ${A.ideasPerTrack} ideas that can be built from scratch in 36 hours.
- For each idea give: title; one-line pitch; the one falsifiable promise judges can watch being proven live; the 20 second demo moment; how it satisfies each verbatim requirement of the track and avoids every "Won't place" item; why this sponsor's judges would pick it over likely rival entries, tied to the winner patterns you found; the closest past winners or finalists and how it differs; stack options (which other partner prizes, and at most one EF prize, it could also enter, within the 3 partner cap); difficulty for 36 hours; team fit.
- In each track, at least one idea should stack naturally with another sponsor and at least one should be a narrow entry tuned only to this sponsor's judges.
- Avoid ideas that past finalists or winners already built unless you add a clear twist, and say what the twist is. The team's existing plans are in plans/ A to E; you may build on them but do not copy them.

${RULES}

Return the structured summary.`, { label: `history and ideas: ${s.name}`, phase: 'Sponsors', schema: DRAFT_SCHEMA, effort: 'high' })
  },
  (draft, s) => {
    if (!draft) return null
    return agent(`You are the judging panel for the sponsor "${s.name}" at ${A.event.name}: role-play ${s.name}'s own prize judges, joined by one skeptical hackathon veteran who checks feasibility.

${CONTEXT}

Read: this sponsor's section of ${OUT}/00_current_tracks.md (the verbatim criteria are your rubric), the history dossier ${draft.historyFile} (what this sponsor's judges rewarded before), the idea draft ${draft.draftFile}, and the season brief ${OUT}/00_season.md. Judge only fresh-build tracks; ignore Continuity-only tracks.

For every idea:
- Score 1 to 10 on each verbatim judging criterion of its track (where a track has no numeric criteria, use its "What we want to see" items), plus Novelty versus past winners and Feasibility in 36 hours for this team.
- Check every qualification requirement and every "Won't place" item; mark violations. Drop any idea that depends on pre-existing project code.
- Verdict: keep, revise or drop. For revise, write the improved version. For drop, replace it with a better idea so each track still ends with ${A.ideasPerTrack} vetted ideas.
- Be adversarial: assume several other teams will submit the obvious idea for each track.

Then write ${OUT}/ideas/${s.slug}.md: a short intro on what ${s.name}'s judges reward (from the dossier); then per track a ranked table (rank, idea, overall score, verdict, stack); then each final idea in full (pitch, falsifiable promise, demo moment, requirement checklist, why it beats rivals, closest prior winners, stack, difficulty, scores, judge notes). End with ${s.name}'s top 3 ideas overall and why, and a section "Questions for the ${s.name} workshop and booth": the questions whose answers would change which idea to build or how to qualify (eligibility, tokens or credits, testnets and faucets, SDK versions, what the judges want to see, whether a specific design counts as central or cosmetic), most decisive first.

${RULES}

Return the structured result with every final idea per track (overall score out of 10), the top 3 titles, and the workshop questions in priority order.`, { label: `judges: ${s.name}`, phase: 'Sponsor judges', schema: FINAL_SCHEMA, effort: 'high' })
  },
)

const ok = results.filter(Boolean)
const failed = sponsors.filter((s, i) => !results[i]).map(s => s.name)
if (failed.length) log(`Sponsors that did not complete: ${failed.join(', ')}`)
const ideaTotal = ok.reduce((n, r) => n + r.tracks.reduce((m, t) => m + t.ideas.length, 0), 0)
log(`${ok.length} sponsors judged, ${ideaTotal} vetted fresh-build ideas.`)

const sponsorFiles = ok.map(r => `- ${r.sponsor}: ${r.finalFile} (top 3: ${r.top3.join('; ')})`).join('\n')
const questionDump = ok.map(r => `${r.sponsor} (workshop: ${(sponsors.find(s => s.name === r.sponsor) || {}).workshop || 'see schedule'}):\n${r.workshopQuestions.map(q => '- ' + q).join('\n')}`).join('\n\n')

const sheetP = agent(`You are preparing the team's workshop and booth question sheet for ${A.event.name}.

${CONTEXT}

The workshop schedule is at the top of ${OUT}/00_current_tracks.md. Each sponsor judge panel listed the questions below (full context in each sponsor's ideas file):
${sponsorFiles}

${questionDump}

Also read the open verification items in the existing notes (for example the Whitechain prize USDT supply, the alt mempool devnet profile and staked gas budget, Colibri through Anon-RPC, the EF CROPS criteria marked "tbc").

Tasks:
1. Merge and de-duplicate the questions, keep the ones whose answer would change what the team builds or whether it qualifies, and order them by the event's workshop schedule (time, room, sponsor).
2. For each workshop slot give: who on a 3-person team should attend (split them so no decisive slot is missed when workshops overlap), the 3 to 5 must-ask questions, and what to do with each possible answer (for example "if no prize USDT faucet, switch to idea X").
3. List questions that should be asked before the event (Discord, Telegram, X, email), with the channel for each, because their answers decide the build before Thursday.
4. Add a short booth plan for Friday: which sponsors to show a 60 second demo to, and what feedback to ask for.

${RULES}

Write ${OUT}/workshop_questions.md and return the structured sheet.`, { label: 'workshop question sheet', phase: 'Workshop questions', schema: SHEET_SCHEMA, effort: 'medium' })

phase('Track combos')

const combos = await agent(`You are designing multi-sponsor prize stacks for fresh builds at ${A.event.name}.

${CONTEXT}

Read ${OUT}/00_current_tracks.md and every vetted sponsor idea file:
${sponsorFiles}

Find the best ${A.comboTarget} combinations where one codebase and one demo can credibly enter up to 3 partner prizes plus at most one EF prize. For each combo:
- the core idea and its single falsifiable promise;
- each prize entered, and exactly what that prize requires (chain, token, SDK, files such as FEEDBACK.md or WHITECHAIN_FEEDBACK.md, video length, live demo link) and how the build meets it;
- conflicts between the prizes' rules (for example Arc requires Arc Studio and settlement in USDC or EURC on Arc while Whitechain requires its prize USDT on Whitechain Sepolia; ENS requires ENSv2 to be central, not cosmetic; World Agent Pass requires backend validation, which can clash with CROPS; the alt mempool prize runs on EF devnets only) and how the combo resolves or avoids them;
- whether the extra integrations dilute the main demo or the finalist story, and the extra hours each adds;
- the README and video structure that lets each partner judge find its part in under a minute.
Also list the 5 tempting combos that do not work, and why.

${RULES}

Write ${OUT}/track_combos.md and return the structured combos.`, { label: 'track combos', phase: 'Track combos', schema: COMBO_SCHEMA, effort: 'high' })

let comboCheck = null
if (combos && combos.combos && combos.combos.length) {
  comboCheck = await agent(`You are an adversarial reviewer of prize stacks for ${A.event.name}. Try to break every combo in ${combos.file}.

${CONTEXT}

For each combo, using the verbatim prize text in ${OUT}/00_current_tracks.md: check every qualification requirement of every prize it enters, find rule conflicts the designer missed, check that each partner integration is central enough to place rather than cosmetic, estimate whether the extra work fits 36 hours for 3 people alongside the core build, and judge whether stacking weakens the finalist demo. Verdict: sound, trim (name the prize to drop) or broken (say why).

${RULES}

Write ${OUT}/track_combos_check.md and return the structured verdicts.`, { label: 'combo check', phase: 'Track combos', schema: COMBO_CHECK_SCHEMA, effort: 'high' })
} else {
  log('Combo design failed; skipping the combo check.')
}

phase('Finalist ideas')

const comboFiles = [combos ? combos.file : null, comboCheck ? comboCheck.file : null].filter(Boolean).map(f => '- ' + f).join('\n') || '- none'

const gen = await agent(`You are designing ETHGlobal finalist candidates for ${A.event.name}.

${CONTEXT}

Read: the finalist report (reports/ETHGlobal finalist ideas 2023 to 2026.md in the references: patterns, saturated and open lanes, India lessons, 11 proposals), ${OUT}/00_season.md, ${OUT}/00_current_tracks.md, the track combo files:
${comboFiles}
and every vetted sponsor idea file:
${sponsorFiles}

Produce ${A.finalistCandidates} candidate finalist ideas, all fresh builds, aiming for at least ${A.finalistTarget} to survive a hard judge panel. Mix multi-track stacks (finalist plus up to 3 partner prizes, at most one EF prize; prefer combos the combo check rated sound) and single-track builds. You may promote and sharpen the strongest sponsor ideas and the report's proposals, but improve them rather than copy them.

For each candidate: title; the one-sentence falsifiable promise; the 20 second hook; a 4 minute demo outline with the single moment that proves the claim; why it is not already done (name the closest prior finalists from the 320-finalist catalogue and partner winners); fit to Technicality, Originality, Practicality, Usability and WOW Factor; the prize stack; why it is in season now; difficulty in 36 hours; what could fail live and the fallback.

${RULES}

Write ${OUT}/finalist_ideas_draft.md and return the list of candidate titles with one-liners and stacks.`, { label: 'finalist candidates', phase: 'Finalist ideas', schema: GEN_SCHEMA, effort: 'high' })

let votes = []
if (gen && gen.ideas && gen.ideas.length) {
  const LENSES = [
    { key: 'generalist', brief: 'You are an ETHGlobal finalist judging panel (founders, VCs, protocol engineers) who see about 25 teams in a morning and pick a top 10. You reward one sharp, verifiable promise proven live in the first minute and punish jargon. Calibrate on recent finalists such as VEIL VPN, Carte Bleue, UNSU, TARE, Takarabako and Cordon.' },
    { key: 'originality', brief: 'You are the originality checker. Compare every candidate against all 320 finalists in the finalist catalogues (research_notes/ETHGlobal finalist ideas 2023 to 2026/) and against the partner winners in ' + OUT + '/history/ (all files). Flag any candidate whose core claim was already shown, name the prior project, and score originality strictly.' },
    { key: 'feasibility', brief: 'You are a senior engineer red-teaming feasibility for a 3-person DeFi and smart contract security team with 36 hours and no existing code. Check dependencies (devnets, prize tokens, faucets, SDK maturity, browser APIs, hardware), the critical path, and what fails live on venue Wi-Fi. Score how likely a working end-to-end demo is at 09:00 Saturday.' },
  ]
  votes = (await parallel(LENSES.map(l => () => agent(`${l.brief}

${CONTEXT}

Judge every candidate in ${gen.draftFile} (the context files it cites are in ${OUT}). For each: score 1 to 10 for finalist potential through your lens, a verdict (keep, revise or drop) and a note with the single most important fix or reason.

${RULES}

Write your scorecard to ${OUT}/finalist_judges/${l.key}.md and return the structured votes.`, { label: `finalist judge: ${l.key}`, phase: 'Finalist ideas', schema: VOTES_SCHEMA, effort: 'high' })))).filter(Boolean)
} else {
  log('Finalist candidate generation failed; skipping the finalist judge panel.')
}

const sheet = await sheetP

phase('Synthesis')

const voteFiles = votes.map(v => `- ${v.lens}: ${v.file}`).join('\n') || '- none'

const synth = await agent(`You are the editor who produces the final deliverables of this idea harness for ${A.event.name}.

${CONTEXT}

Inputs:
- Live tracks: ${OUT}/00_current_tracks.md
- Season brief: ${OUT}/00_season.md
- Sponsor idea files (vetted by sponsor judge panels):
${sponsorFiles}
- Track combos and their adversarial check:
${comboFiles}
- Workshop question sheet: ${sheet ? sheet.file : 'missing'}
- Finalist candidates: ${gen ? gen.draftFile : 'missing'}
- Finalist judge scorecards:
${voteFiles}

Tasks:
1. Merge the three finalist scorecards. Keep candidates that average at least 7 and that no more than one judge dropped. If fewer than ${A.finalistTarget} survive, revise the best near-misses to fix the judges' objections until at least ${A.finalistTarget} remain, and mark them as revised. Write ${OUT}/finalist_ideas.md: ranked, each with promise, hook, demo outline, prize stack, why now, closest prior finalists, the three judge scores and notes, difficulty, risks and fallbacks.
2. Write ${OUT}/INDEX.md: how this harness works (the phases and files); a master table of every sponsor idea (sponsor, track, idea, score, stack) linking to the sponsor files; the sound track combos; the top 10 builds overall that combine a finalist shot with partner prizes; a recommended pick of three builds for this team with reasons; the decisive workshop and pre-event questions (link the question sheet); and a section "What else to add in this mindset" with concrete further angles not already covered by this harness.

All ideas are fresh builds; do not list Continuity-only tracks except to say they were skipped.

${RULES}

Return the structured summary.`, { label: 'synthesis', phase: 'Synthesis', schema: SYNTH_SCHEMA, effort: 'high' })

return {
  sponsors: ok.map(r => ({ sponsor: r.sponsor, file: r.finalFile, top3: r.top3 })),
  failedSponsors: failed,
  skippedContinuityTracks: skippedTracks,
  ideaTotal,
  combos: combos ? combos.file : null,
  comboCheck: comboCheck ? comboCheck.file : null,
  workshopSheet: sheet ? sheet.file : null,
  finalist: synth,
}
