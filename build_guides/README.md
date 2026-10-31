# Build guides for the ten finalist ideas

Written 2026-10-31 for ETHGlobal Mumbai (hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST). One guide per idea from `track_ideas/finalist_ideas.md`, plus `00_common.md` for everything they share. Each guide covers: summary, promise and prize stack with verbatim requirements; architecture; repo layout and scaffold commands; dependencies with versions checked on npm today; components in plain English; milestones with acceptance tests and owners; an hour-by-hour plan for A, B and C with gates, pivot rule and cut order; pre-event checklist; test plan; the 4 minute demo and the 2:00 to 2:59 video; README draft (CROPS section where an EF prize is in the stack); UI/UX screens, states and copy; risks; the 8 hardest Q and A questions; AI usage.

**No code in these files, by design.** The Classic rule forbids "prior project-specific code, designs, or assets" ([details page](https://ethglobal.com/events/mumbai/info/details)). Contracts are described in plain English; every interface, line of code and screen is written after Thursday 21:00. Ask ETHGlobal staff at registration whether these notes may be committed under `planning/` (`00_common.md` section 0).

## The ten at a glance

Everything except the prize names is Judgement. Hours are person-hours from `track_ideas/finalist_ideas.md`; a three-person weekend has roughly 75 to 80 working hours after sleep.

| # | Guide | Prizes (max 3 partners) | Person-hours | P(demo) | Critical path | Gate 1 (the hour that decides it) | Pivot on the same harness |
|---|---|---|---|---|---|---|---|
| 1 | [Truthsign](01_truthsign.md) | EF Best CROPS App; Arkiv Mirror + Swarm bonus | 46 to 50 | 70% | renderer subset, fork effect extraction, checker rules, then the sweep | Fri 01:00: three descriptors rendered and their effects extracted on a fork; Arkiv write and read | Clearsight (Arkiv M1) |
| 2 | [Residue](02_residue.md) | ENS Best Use of ENSv2; Arkiv Mirror (optional) | 45 core + 14 Arkiv | 75% | transfer-path tests, escrow, invariant suite, lens | Fri 01:00: which residue survives `safeTransferFrom` | Moving Day (ENS rank 2) |
| 3 | [Upgrade Council](03_upgrade_council.md) | World Agent Pass + IDKit (one partner) | 40 to 45 | 60% | two mocked humans, device flow, gate, witness | hour 1: two distinct mocked `sub` values; Fri 01:00 device flow | Breakglass (World rank 2) |
| 4 | [Regas](04_regas.md) | none (finalist only); EF CROPS long shot | 45 to 50 | 60% | template deployed on Hoodi and Sepolia, probe and dual `eth_call`, flip search | Fri 01:00: one reproducible inner-call flip, or abandon | Truthsign or Bidproof |
| 5 | [Walkaway](05_walkaway.md) | EF Best CROPS App; Uniswap | 45 to 50 + VPS | 50% to 60% | own gateway on 443, single file under `file://`, raw broadcast through Anon-RPC | Fri 01:00: one Anon-RPC read from the file and one raw Aave withdrawal | static page on Swarm or IPFS, stated |
| 6 | [Greenshoe](06_greenshoe.md) | 1inch Aqua; Uniswap | 50 to 55 | 50% to 60% | router harness, CCA graduated on a fork, three instructions, saved state | Fri 01:00: graduated CCA with a non-zero clearing price and one Aqua fill | Replica (1inch rank 3) |
| 7 | [Bidproof](07_bidproof.md) | Uniswap | 45 | 80% | pre-event auction count, router, indexer, simulator | pre-event count of real auctions; Fri 01:00 one Sepolia bid | Humancap (Uniswap rank 5) |
| 8 | [Last Out](08_last_out.md) | Definitive; World IDKit | 47 | 55% to 65% | 1271 account, Flash submit check, onchain EIP-712 rebuild | Fri 01:00: Flash rejects an order the account refuses | Called It (Definitive rank 2) |
| 9 | [Reserve Gate](09_reserve_gate.md) | 1inch Aqua; Chainlink CRE | 50 to 55 | 55% | CRE against a local fork, two forks, three makers | hour 2: `cre workflow simulate` reads a local Anvil RPC | Standing Repo (1inch rank 4) |
| 10 | [HookBreak](10_hookbreak.md) | Uniswap | 55 | 45% | dumped states, harness, overnight Bunni campaign | Fri 06:00 Cork; Fri 18:00 Bunni (finalist claim only if it falls) | Exit Ledger (Uniswap rank 4) |

## How to choose (Judgement)

- **Pick one.** One promise per prize stack; never two stories in four minutes (`track_ideas/track_combos.md` section 2).
- **Default pick: Truthsign.** Highest judge average, strongest finalist moment, the team's craft (differential fuzzing), and both partner extras sit off the critical path. Choose it unless the EF workshop says the CROPS rubric changed against libraries, or the Arkiv workshop rules the registry out of scope (then it is EF only, still the finalist lead).
- **Safest demo: Residue or Bidproof.** Residue if the ENS workshop confirms residue survives `safeTransferFrom`; Bidproof if the pre-event count finds at least about 10 real auctions.
- **Agent-wave pick: Upgrade Council,** only if World confirms two distinct mocked humans by Thursday evening.
- **High ceiling, high risk: Regas and HookBreak.** Take one only with its named pivot ready.
- **Decide at Thursday dinner (18:30)** with the workshop answers in hand. `track_ideas/workshop_questions.md` maps each answer to the idea it changes.

## Shared components (build once if you pivot)

| Component | Used by |
|---|---|
| Mainnet fork with `--dump-state` snapshots and impersonation | 1, 5, 6, 7, 9, 10 |
| 1inch harness: official Aqua, redeployed `AquaSwapVMRouter` with appended instructions, encoder with byte parity | 6, 9 (pivots Replica, Standing Repo) |
| CCA on a fork or Sepolia through the real factory | 6, 7 |
| ENSv2 walker (subregistry, resolver, `verifyContract`, `EACRolesChanged`) | 2 (pivot Moving Day) |
| World backend (OIDC device flow, IDKit verification, EIP-712 attestation) | 3, 8 |
| Anon-RPC worker with viem `fetchFn` | 1, 5 |
| Arkiv importer and `/arkiv/*.md` files | 1, 2 |
| Verdict card and demo mode (UI) | all |

## Before Thursday (all ideas)

See `00_common.md` section 9 and each guide's section 8. The three that cannot wait: count the public data the chosen idea leads with (registry descriptors, real auctions), get testnet and mainnet test funds onto three wallets from home connections, and post the deciding questions in the sponsors' Discord channels.
