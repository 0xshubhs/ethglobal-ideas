# Track idea harness

A multi-agent workflow that turns an ETHGlobal event's live sponsor tracks, each sponsor's past tracks and winners, and the current market season into vetted, winnable fresh-build project ideas. The script lives at `.claude/workflows/ethglobal-track-ideas.js`, so Claude Code can run it by name in this repo.

Fresh builds only: Continuity-only tracks are skipped and no idea may depend on pre-existing project code.

## What it does

| Phase | Agents | Output |
|---|---|---|
| Tracks | 1 live-tracks agent and 1 market-season agent, in parallel | `track_ideas/00_current_tracks.md` (verbatim tracks, workshop schedule, changes), `track_ideas/00_season.md` |
| Sponsors | 1 historian and idea designer per sponsor | `track_ideas/history/<sponsor>.md` (past tracks, winners, why they won, how problem statements changed), `track_ideas/ideas_draft/<sponsor>.md` |
| Sponsor judges | 1 judge panel per sponsor, playing that sponsor's judges plus a feasibility skeptic | `track_ideas/ideas/<sponsor>.md` (ranked, repaired ideas per track, workshop questions) |
| Workshop questions | 1 agent, running alongside the next phases | `track_ideas/workshop_questions.md` (questions by workshop slot, who attends, what each answer changes, pre-event asks, booth plan) |
| Track combos | 1 combo designer, then 1 adversarial combo checker | `track_ideas/track_combos.md`, `track_ideas/track_combos_check.md` |
| Finalist ideas | 1 candidate generator, then 3 judges (generalist finalist panel, originality against 320 past finalists, 36 hour feasibility) | `track_ideas/finalist_ideas_draft.md`, `track_ideas/finalist_judges/*.md` |
| Synthesis | 1 editor | `track_ideas/finalist_ideas.md`, `track_ideas/INDEX.md` |

Sponsors run as a pipeline: each sponsor moves from history to judging as soon as its own research is done.

## How to run it again

Ask Claude Code to run the `ethglobal-track-ideas` workflow with these arguments, changing the event, date and paths:

```json
{
  "repoDir": "/home/krsna/Desktop/hacks/ethglobalideas",
  "outDir": "/home/krsna/Desktop/hacks/ethglobalideas/track_ideas",
  "event": {
    "name": "ETHGlobal Mumbai",
    "dates": "5 to 7 November 2026 (hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST)",
    "venue": "Jio World Convention Centre, Mumbai, alongside Devcon 8 India",
    "prizesUrl": "https://ethglobal.com/events/mumbai/prizes"
  },
  "today": "2026-10-31",
  "team": "3 people with a DeFi and smart contract security background; Classic track, fresh build only",
  "ideasPerTrack": 5,
  "comboTarget": 8,
  "finalistCandidates": 16,
  "finalistTarget": 10,
  "references": ["paths to existing notes and reports the agents should reuse"]
}
```

For a new event, point `outDir` at a fresh folder so earlier runs are not overwritten.
