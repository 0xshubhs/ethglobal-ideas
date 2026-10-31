# 04 Regas: build guide

Rank 4 of 10 (judge average 7.00, P(demo) 60%, finalist only). Source design: `track_ideas/finalist_ideas.md` section 3.4, `track_ideas/finalist_ideas_draft.md` candidate 16, `track_ideas/finalist_judges/feasibility.md` candidate 16. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** Glamsterdam's new gas rules are live on Sepolia and postponed on Hoodi, because new state-creation gas costs may break gas safeguards in live contracts. Regas replays transactions under both rule sets, using each testnet's real node as the executor (`eth_call` with state overrides), and lists every transaction whose inner call changes outcome while the outer call still succeeds. On an unmodified, widely used forwarder template, deployed by the team on both testnets, the same request with the same gas lands on Hoodi and is silently lost on Sepolia, and Regas flagged it before it was sent.

**Correction to the earlier wording (Judgement).** An EIP-712 forwarder signature commits to the chain id in its domain, so "the same signature on two chains" is not literally possible. Say "the same request, signed the same way, with the same gas" on stage and in the README.

**Falsifiable promise.** "For a contract and a set of its transactions, Regas executes each one under today's gas rules and under Glamsterdam's rules and lists every transaction whose inner-call outcome changes while the outer call still succeeds. On a widely used open-source forwarder template, deployed by the team, the same request with the same gas limit executes on Hoodi and is silently lost on Sepolia, and Regas flagged it before we sent it."

**Prize stack.**
- Fact: "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize" ([event page FAQ](https://ethglobal.com/events/mumbai)); 26 of 53 finalists in 2026 showed no partner prize (`research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2026.md`).
- Judgement: finalist only by design. EF "Best CROPS App" leading on S ("Things must do what they claim to do") is a long shot, entered only if the EF workshop says protocol-safety dev tools compete. If entered, write the CROPS section as in section 11.

## 2. Architecture

```
  corpus: (a) the team's forwarder requests   (b) mainnet transactions to a target contract
        |
        v
  [prestate builder]  for (b): mainnet prestate of every touched account (archive trace)
        |              for (a): the forwarder's code and storage as deployed
        v
  [probe]  a small contract placed by state override that:
        |    calls the target with the transaction's gas, then reads
        |    (outer success, inner effect happened, nonce consumed, gas left)
        v
  eth_call + state override  ------>  Hoodi node (today's rules)
                             ------>  Sepolia node (Glamsterdam rules)
        |
        v
  [diff]  rows where outer success is equal but the inner effect differs  ->  FLIP
        |
        v
  report: CLI table, JSON, web page; GitHub Action for CI
  [population scan]  verified mainnet sources with the same guard shape -> counts only
```

**Why `eth_call` with state overrides (Fact and Judgement).** The feasibility judge's fix: it runs any bytecode under each chain's real live rules, so no local EVM with Glamsterdam support is needed and there is no mismatch between a local spec version and what Sepolia runs (`finalist_judges/feasibility.md` candidate 16). Judgement: the probe contract avoids needing `debug_traceCall` on public RPCs, because it reports the inner outcome in its own return data.

**Trust assumptions.** The two public RPCs report their chain's rules faithfully; block context (number, timestamp, base fee) differs between chains and from mainnet, which the README states; every flip is attributed by trace on our own node or by a minimal reproduction, not assumed.

## 3. Repo layout and scaffold

```
regas/
  contracts/       probe contract, the unmodified forwarder template (from its public package), a fixed variant
  packages/cli/    corpus loaders, prestate builder, dual executor, diff, report
  packages/scan/   population scan over verified sources (counts only)
  app/             report page (two-rule table, row detail, side-by-side explorer links)
  action/          GitHub Action wrapper
  fixtures/        signed requests per chain, saved responses with block numbers, pre-sent tx hashes
```

At 21:00: common scaffold; install the forwarder template from its public package at a pinned version (see section 4); `npm i viem@2.57.13` in the CLI.

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Rule split | Glamsterdam live on Sepolia since 6 Oct 2026; Hoodi postponed "to allow for further investigation of interactions of EIP-8037 with mainnet smart contracts" | Fact ([EF blog, 22 Oct 2026](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay)) |
| The risk | ChainSecurity raised the gas-griefing risk on 13 Oct and found 13 susceptible production contracts; rescheduling expected after Devcon | Fact ([Parameter](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/)) |
| The EIPs | EIP-8037 "State Creation Gas Cost Increase" and EIP-8038 "State-Access Gas Cost Update", Last Call until 1 Nov 2026 | Fact ([EIP-8037](https://eips.ethereum.org/EIPS/eip-8037); [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)) |
| Reservoir model | revm enables EIP-8037 for the AMSTERDAM spec with a state-gas reservoir drawn first that then "spills into remaining gas" | Fact by web search, not checked against the official repo ([revm v108 notes](https://newreleases.io/project/github/bluealloy/revm/release/v108)) (verify) |
| Forwarder template | an unmodified, widely used public forwarder with a post-call gas check (candidates: OpenZeppelin `ERC2771Forwarder` in `@openzeppelin/contracts` 5.6.1, OpenZeppelin's older `MinimalForwarder`); which one flips is the hour 0 to 4 question | (verify) at the event |
| RPCs | public Sepolia and Hoodi RPCs that accept `eth_call` state overrides | (verify) before Thursday |
| Archive | a mainnet archive RPC with a prestate tracer, for corpus (b) | (verify) provider support |
| Verified sources | a public dataset of verified contract sources for the population scan (for example Sourcify's export) | (verify) licence and access |

## 5. Core algorithms in plain English

**Dual executor.** For each transaction in the corpus: build the state override (the target's code and storage, the probe's code at a fixed address, the sender's balance); call the probe with `eth_call` on Hoodi and on Sepolia using the transaction's own gas limit; the probe calls the target, then reads the effect the transaction should have caused (a counter, a balance, a storage slot the corpus names), the forwarder's nonce for the signer, and `gasleft`, and returns all of them. Store both results with the block number each call used.

**Flip rule.** A row is a FLIP when the outer call succeeds on both chains and the inner effect happened on one chain and not on the other, or when the outer call succeeds on one chain and reverts on the other with an out-of-gas cause. A FLIP with "nonce consumed, effect missing" is the silent-loss class and is ranked first.

**Attribution.** For every FLIP: rerun on a local node or with `debug_traceCall` where available and record which opcode's cost changed between the two traces (state creation versus access versus other Glamsterdam changes). If no trace is available, shrink the transaction to the smallest gas limit range where the flip holds and report the range. Never claim EIP-8037 caused a flip without a trace or a reproduction.

**Corpus (b), mainnet transactions.** For a target contract, take its last N transactions from mainnet; for each, fetch the prestate of every touched account from an archive node's prestate tracer; replay with that prestate as the override. Limits to state in the README: block context differs, override size limits on public RPCs, contracts that read block hashes or timestamps.

**Population scan.** Over verified mainnet sources: count contracts that compare `gasleft()` after an external call (the post-call 63/64 check) or forward a fixed gas stipend to a call that creates state. Output counts by pattern, never names. ChainSecurity's list stays theirs.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Forwarder template deployed unmodified on Hoodi and Sepolia (same deployer, CREATE2 where possible) and verified on both explorers | both addresses verified; bytecode identical apart from immutables | A |
| M2 | Probe contract and dual executor for one request | the CLI prints the same five fields from both chains with block numbers | B |
| M3 | **Flip search** | a request (target creates new storage; gas set near the boundary) whose inner effect lands on Hoodi and not on Sepolia while the outer call succeeds on both | A |
| **Gate 1, Fri 01:00** | M3 | one reproducible flip on the public template; if none, **abandon Regas** and start the named pivot (section 7) | A |
| M4 | Live send of the request on both chains | Hoodi receipt shows the effect; Sepolia receipt shows success, nonce burned, effect absent; both explorer links | A |
| M5 | Attribution by trace for the flip | the README states which cost changed, with the trace | A |
| M6 | Corpus (a): the forwarder's own test requests at many gas limits | a table with the exact gas range where the silent loss happens | B |
| **Spine, Fri 09:00** | M4 to M6 | the demo moment runs from the CLI | A, B |
| M7 | Fixed variant of the forwarder (a gas check that accounts for the new state gas) | the same corpus on Sepolia is all green | A |
| M8 | Corpus (b) on one mainnet contract | N mainnet transactions replayed under both rules; zero or more flips with attribution | B |
| M9 | Population scan | counts by pattern over verified sources, with the dataset date | B |
| M10 | Report page and GitHub Action | a judge sees the two-rule table, opens a row, sees both explorer links; the Action runs on a sample repo | C |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M11 | README, video | section 7 of `00_common.md` | C |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu morning | **Check whether Hoodi's Glamsterdam date has been set** (EF blog, All Core Devs notes) | | |
| Thu 21:00 to 22:00 | Deploy the template on both chains | Probe and executor skeleton | Report page design on fixtures |
| 22:00 to 01:00 | M3 flip search (sweep gas limits and inner-call shapes) | M2 | Row detail and side-by-side layout |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M4, M5 | M6 | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M7 fixed variant | Sleep 07:30 to 11:30 | Wire report page to CLI JSON |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M7 tests | (from 11:30) M8 | M10 GitHub Action |
| 12:00 to 16:00 | Sleep | M8, M9 | Demo mode; EF notice slide |
| 16:00 to 18:00 | Review every flip's attribution | M9 counts final | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Re-send the live pair on fresh blocks | README methodology | Copy pass |
| **Sat 00:00** | **Freeze**; recheck Hoodi status | | |
| 00:00 to 02:00 | Pre-send final live pair; save receipts | Save every RPC response used on stage | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README limits | README | Layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30 | | |

**Pivot rule.** No flip by Fri 01:00: abandon. This is the riskiest of the four candidates that passed. Pivot to **Truthsign** (`01_truthsign.md`) if its pre-event research is done, or to **Bidproof** (`07_bidproof.md`), which has the lowest dependency count; both reuse the team's fork tooling. If Hoodi activates Glamsterdam before Saturday: the two-testnet contrast disappears; fall back to the dual-rule table plus the pre-activation receipts, and say so. **Cut order:** the GitHub Action, then corpus (b), then the population scan; never the live pair.

## 8. Pre-event checklist

- [ ] Check that public Sepolia and Hoodi RPCs accept `eth_call` with state overrides (a one-off manual request, nothing kept); list two RPCs per chain.
- [ ] Sepolia and Hoodi ETH on three wallets from home connections.
- [ ] Read EIP-8037 and EIP-8038 in full, the EF delay post and the ChainSecurity coverage.
- [ ] Find which public forwarder templates use a post-call gas check, and read their source.
- [ ] Find a verified-source dataset and check its licence and size.
- [ ] Thursday morning: Hoodi's Glamsterdam date (EF blog, All Core Devs notes).
- [ ] EF 17:00 Room 2: would a gas-rule regression tool be welcome in any EF prize?
- [ ] Not allowed before 21:00: the probe, the executor, the flip search code.

## 9. Test plan

- **Determinism:** every corpus row run three times on each chain gives the same result (block-context differences noted).
- **Control rows:** transactions that create no state and do not touch the guard must never flip.
- **Fixed variant:** the same gas range that flipped is green on Sepolia.
- **Fixtures:** both deployments, the signed requests, the pre-sent receipts, every saved RPC response with its block number, the scan output with the dataset date.

## 10. Demo

**20 second hook (C).** "Ethereum's core developers paused a network upgrade last week because new gas rules might break safeguards in live contracts. Same contract, same request, same gas: on one testnet your action happens, on the other the contract says success and your action never happened. Regas tells you before mainnet does."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | The EF's delay notice; no EIP numbers spoken | slide |
| 0:25 | The unmodified public forwarder template, deployed identically on Hoodi and Sepolia, both verified | screenshots |
| 0:55 | Regas runs the corpus under both rule sets; one row flips red: "outer success, inner out of gas, nonce consumed" | saved report |
| 1:30 | **The moment:** the same request goes to both chains; Hoodi: the action lands; Sepolia: success, nonce burned, action missing; explorer links side by side | pre-sent receipts |
| 2:30 | The fix and the re-run, all green | saved report |
| 3:00 | Population count over verified mainnet contracts with the same guard shape, counts only | slide |
| 3:30 | Limits: each flip attributed by trace, not assumed | slide |

**Video (2:00 to 2:59).** Same beats compressed; the side-by-side explorer moment by 0:50.

## 11. README draft

Order: promise; the side-by-side receipts; quick start (`npx regas run --corpus <dir> --chains hoodi,sepolia`); how it works (diagram); the flip rule; attribution method; the gas range table for the template; the fix; population counts with method and dataset date; limits (block context, override limits, other Glamsterdam changes); disclosure note (no third-party names); AI usage; licence.

If the EF prize is entered, a CROPS section: S lead ("Things must do what they claim to do": Regas checks that a contract still does what it says under the next fork's rules); C (runs against any RPC, including the user's own node); O (MIT, reproducible from saved responses); P (no data leaves the user's machine except the RPC calls, which can go through Anon-RPC).

## 12. UI/UX

Judgement: the draft scored Usability 5 because Regas was a CLI and a table. Raise it with a report a non-protocol judge can read.

| Screen | What it shows | States |
|---|---|---|
| Fork readiness report | Header: "N transactions checked under today's rules and the next upgrade's rules. K behave differently." Two columns per row, "Today (Hoodi)" and "After the upgrade (Sepolia)", each with a chip: Did it / Said success, did nothing / Failed | all green: "Nothing changes for these transactions" |
| Row detail | The request in plain words ("Pay 5 test tokens to bob"), gas limit, the two outcomes, nonce before and after, the explorer links side by side, and the attribution line | no trace available: shows the gas range instead |
| Gas range chart | A single bar from low to high gas limit with the silent-loss band highlighted | |
| CI view | The GitHub Action's summary with the same table | |

Copy: never "EIP-8037" on the main screen; say "the next upgrade's gas rules". The silent-loss chip is the only red element.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| No flip reproduces | Gate 1 | Abandon; pivot as in section 7 |
| Hoodi activates Glamsterdam before Saturday | Thursday or Saturday check | Pre-activation receipts plus the dual-rule table, stated |
| Public RPCs refuse state overrides | pre-event check | Run our own Sepolia and Hoodi nodes (heavy) or use a provider that allows overrides |
| Reservoir behaves unlike a `gasleft` guard expects | M3 | It is a finding, but the demo still needs a flip |
| Naming third-party contracts | any time | Counts only |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Is it really the same signature on both chains?" | No: the signature commits to the chain id. It is the same request, signed the same way, with the same gas | request detail |
| "Didn't you just write a contract that fails?" | It is an unmodified public template; here are both verified deployments | explorer pages |
| "How do you know it is EIP-8037 and not something else in Glamsterdam?" | Every flip is attributed by trace; here is the opcode cost that changed | attribution line |
| "Hoodi will upgrade soon; then what?" | Then Regas compares a pre-upgrade node with a post-upgrade node; the method does not depend on Hoodi | method section |
| "Who uses this?" | Auditors and protocol teams in the weeks before a fork; it runs in CI | GitHub Action |
| "Why not a local EVM?" | The real node is the ground truth; a local spec version can disagree with what Sepolia runs | architecture |
| "How many mainnet contracts are at risk?" | Counts by pattern from verified sources; names stay private | population slide |
| "Did you tell anyone?" | Any real finding goes privately to the contract's team and the EF | disclosure note |

## 15. AI usage

Follow `00_common.md` section 8. A designs the flip search and checks every attribution by hand; AI may help with corpus loaders, the report page and the Action.
