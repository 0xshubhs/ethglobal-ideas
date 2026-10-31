# 10 HookBreak: build guide

Rank 10 of 10 (revised, conditional; judge average 5.67, projected 6.7 if a Bunni-class drain reproduces; P(demo) 45%). Source design: `track_ideas/finalist_ideas.md` section 3.10, `track_ideas/ideas/uniswap.md` rank 3 (and rank 4 Exit Ledger as the pivot), `track_ideas/finalist_judges/feasibility.md` candidate 7. Read `00_common.md` first.

**The condition.** If Bunni v2 (or an equally non-static historical bug) does not reproduce from generic properties by **Fri 18:00 IST**, HookBreak leaves the finalist list and enters Uniswap only, and Witness (`track_ideas/finalist_ideas.md` section 4) is the named finalist alternate.

## 1. Summary, promise, prize stack

**Summary.** A drop-in Foundry and Medusa harness for any Uniswap v4 hook: it deploys or forks the hook inside a real PoolManager, drives swaps, liquidity changes, donations and direct callback calls from attacker actors, and checks properties every hook should keep. Pointed at the block before a historical hook exploit, it prints a call sequence that breaks a generic property as a Foundry test that fails on the vulnerable block. The headline is Bunni v2's compounding rounding drain, which static tools do not flag; Cork's missing caller check is a ten-second warm-up.

**Falsifiable promise (revised to what is dependable).** "Fork mainnet at the block before a historical Uniswap v4 hook exploit, point HookBreak at the hook and press run: it prints a call sequence that breaks a generic property, as a Foundry test that fails on the vulnerable block. The finalist claim is made only for a bug that static tools do not flag (Bunni v2's compounding rounding drain); the drain of the same asset is claimed only if it reproduces. Every hint the harness was given is listed in the README."

**Prize stack (Uniswap only).**

| Prize | Verbatim requirement (Facts) | How this build meets it |
|---|---|---|
| Uniswap Foundation "Build with Uniswap" ($4,000 / $3,000 / $2,000 / $1,000) | scope includes "new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem"; FEEDBACK.md and the form; README points to contracts and lines ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)) | v4 PoolManager and hooks are the subject; the property list goes upstream as a PR or issue to `v4-security-foundations` in `uniswap-ai` ([Uniswap skills](https://developers.uniswap.org/docs/uniswap-ai/skills)); FEEDBACK.md covers fork fuzzing friction and hook address mining |

## 2. Architecture

```
  fixtures/<exploit>-state.json   (anvil --dump-state at the block before the exploit; never live RPC)
        |
  [HookHarness]  real PoolManager + the hook + pool key
     actors: LP, trader, attacker EOA, attacker contract, attacker hook
     handler: unlock -> swap | modifyLiquidity | donate | take/settle   (tiny amounts and repeats weighted up)
     raw-call handler: calls each hook callback directly from a non-PoolManager caller
        |
  properties P1 to P5 checked after every call
        |
  Medusa (depth, long campaigns)  +  Foundry invariant tests (shippable suite, CI)
        |
  minimiser -> generated Foundry test that replays the sequence and fails on the vulnerable block
  CLI: hookbreak --hook <addr> --pool-key <...> --fork-state <file>
```

**Properties (generic, from `ideas/uniswap.md` rank 3).**
- **P1:** a direct callback from a non-PoolManager caller reverts or changes nothing.
- **P2:** every LP can exit (remove all liquidity and take).
- **P3:** no actor's value after a round trip (deposit then withdraw, swap then swap back) exceeds its start plus a tolerance.
- **P4:** PoolManager deltas net to zero after each unlock.
- **P5:** hook-held balances cover hook-tracked claims.

**Hints, listed honestly.** Action weights favour tiny amounts and repeated withdrawals (generic, not tuned to Bunni). If Bunni's custom accounting needs a protocol-specific adapter (how to deposit and withdraw through its hub), that adapter is listed as a hint in the README.

## 3. Repo layout and scaffold

```
hookbreak/
  contracts/
    lib/        v4-core, v4-periphery, forge-std (public libraries)
    src/        harness, handlers, actors, properties
    test/       Foundry invariant suite, generated reproduction tests, planted-bug hooks for CI
  medusa/       medusa.json configs per target
  cli/          wrapper that sets the target and the fork state, runs the campaign, minimises, writes the test
  fixtures/     dumped fork states for Cork and Bunni blocks, campaign records (call counts, wall-clock)
  FEEDBACK.md
```

At 21:00: common scaffold, `forge install Uniswap/v4-core Uniswap/v4-periphery`, install Medusa (verify version and that it can load a dumped state or fork from a local Anvil).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Cork | 28 May 2025, about $11M to $12M (3,761 wstETH); `CorkHook` did not restrict who could call `beforeSwap`; attacker called it directly | Fact ([Dedaub](https://dedaub.com/blog/the-11m-cork-protocol-hack-a-critical-lesson-in-uniswap-v4-hook-security/); [BlockSec](https://blocksec.com/blog/cork-protocol-incident-two-independent-flaws-combine-into-one-devastating-exploit-chain); [Cork post-mortem](https://www.cork.tech/blog/post-mortem)) |
| Bunni v2 | 2 Sep 2025, about $8.4M; rounding direction when updating idle balances during withdrawals; flash-loaned swap, 44 tiny withdrawals and a sandwich | Fact ([BlockSec](https://blocksec.com/blog/bunni-incident-repeated-small-withdrawals-compound-a-rounding-error-into-an-8.4m-drain); [The Block](https://www.theblock.co/post/369564/bunni-smart-contract-rounding-error)) |
| Scale | 700+ initialized v4 hooks | Fact ([Uniswap Foundation](https://uniswapfoundation.org/blog/a-roadmap-for-programmable-liquidity)) |
| Archive state | Ethereum archive RPC for 2025 blocks (Cork's chain and block, Bunni's chain and block (verify)) | (verify) |
| Tools | Foundry, Medusa | (verify) versions |
| Prior art | Aegis402 blocked payments to a deliberately vulnerable hook it wrote; KSwap-VM replayed counterexamples as failing forge tests; five hook scanners at ETHOnline 2026 won nothing | Fact (`history/uniswap.md`, `ideas/uniswap.md`) |

## 5. Core algorithms in plain English

**Campaign.** Load the dumped fork state into a local Anvil; deploy the harness pointing at the real hook and pool; fund actors from whales or storage writes; run Medusa with the handler for hours with a fixed seed list; check P1 to P5 after every call; on the first break, stop and save the sequence.

**Minimiser.** Remove calls one at a time while the property still breaks; merge repeated calls into loops; output a Foundry test that loads the same state, runs the minimised sequence and asserts the property fails, plus the attacker's balance delta of the drained asset.

**Planted-bug CI.** Three small hooks the team writes with known bugs (missing caller check, wrong rounding direction, unbounded hook-held claim); the suite must fail on each and pass after the fix. This is the dependable Uniswap-only entry if Bunni does not fall.

**Disclosure rule.** Live hooks are run only privately; the public repo shows only historical exploits, planted-bug hooks and pass counts. Any live finding goes to the hook author through the channel Uniswap names.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Dumped states for the Cork and Bunni blocks | both load in Anvil in seconds; the hook and pool read correctly | B (Thursday night) |
| M2 | Harness, handlers, actors, P1 to P5 | Foundry invariant run on a planted-bug hook fails P1 and P3 as expected | A |
| M3 | **Overnight Bunni campaign** started Thursday night on a machine that is not the video machine | campaign running with logs | A |
| M4 | **Cork gate, Fri 06:00** | P1 breaks on the Cork state and a generated test reproduces it | A |
| **Gate 1, Fri 06:00** | M4 | Cork reproduced; else the entry ships P1 to P5 on planted-bug hooks only | A |
| M5 | Minimiser and test generator | a generated test replays in seconds | B |
| M6 | CLI and CI template | `hookbreak --hook ... --fork-state ...` runs end to end; GitHub Action on the planted-bug hooks | B |
| **Bunni gate, Fri 18:00** | P3 (or P5) breaks on the Bunni state from generic properties | yes: finalist claim; no: Uniswap only, Witness is the finalist alternate | A |
| M7 | Campaign record view | call count, wall-clock, minimised sequence, drained balance | C |
| M8 | Upstream property PR or issue to `v4-security-foundations` | link | B |
| **Demo path, Fri 20:00** | every beat of section 10 | timed under 4:00 | all |
| M9 | FEEDBACK.md, README, video | checklist done | C |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 01:00 | M2 harness on a planted hook | M1 dumped states | Campaign view and test viewer on fixtures |
| Fri 01:00 | **Start the Bunni campaign (M3)** on the spare machine | | |
| 01:00 to 06:00 | Cork campaign | M5 minimiser | Sleep 02:00 to 07:00 |
| **Fri 06:00** | **Cork gate** | | |
| 06:00 to 12:00 | Watch Bunni; adjust generic weights only (log every change as a hint) | Sleep 07:30 to 11:30 | CI page, demo mode |
| 12:00 to 16:00 | Sleep (campaign continues) | M6 CLI and CI | M7 |
| 16:00 to 18:00 | Bunni triage | M8 | Rehearsal of the Uniswap-only version |
| **Fri 18:00** | **Bunni gate**: decide finalist or Uniswap-only story | | |
| 18:00 onward | as in `00_common.md` section 2 | | |

**Pivot rule.** Bunni does not fall: Uniswap-only entry with planted-bug hooks and Cork. Live fork too slow: everything replays from cached state. If the harness itself fails by Fri 06:00: **Exit Ledger** (`ideas/uniswap.md` rank 4) on the same fork-and-impersonate harness. **Cut order:** the upstream PR, then the CI template, never the generated failing test.

## 8. Pre-event checklist

- [ ] Read every public write-up of Cork and Bunni; find the exact chain, block and contracts (research, nothing written as code).
- [ ] Archive RPC access to those blocks; check download speed for a dump from home.
- [ ] A spare machine (or a rented server) for the overnight campaign.
- [ ] Install Foundry and Medusa; run their own examples.
- [ ] Uniswap 16:30 Room 1: the private disclosure path for live findings; whether fuzzing hooks the team did not write counts as "build on" (`workshop_questions.md` 4.5).
- [ ] Not allowed before 21:00: the harness, properties as files, configs.

## 9. Test plan

- **Planted-bug hooks:** each property fails on its planted bug and passes on the fixed version.
- **Reproduction tests:** generated tests fail on the vulnerable state and pass on a state after the fix (where a fixed state exists).
- **Determinism:** each reproduction runs identically three times.
- **Fixtures:** dumped states, campaign logs, minimised sequences.

## 10. Demo

**20 second hook (only if the Bunni gate passed).** "Bunni lost $8.4M to a rounding error repeated over 44 tiny withdrawals. No static checker sees that. We pointed a generic fuzzer at the real hook on the real block. Here is the balance it drained."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Bunni in one line; the hint list (generic properties only) | slide |
| 0:20 | **The moment:** the drained balance on the saved fork state, then the generated test replaying it in seconds. Lands by 0:45 | recording |
| 1:20 | Campaign record: call count, wall-clock, minimised sequence | saved view |
| 2:00 | Cork as a ten-second warm-up: "a static tool finds this one, and so does the kit" | recording |
| 2:30 | The same kit in CI on a planted-bug hook, green after the fix | CI page |
| 3:10 | Disclosure rule: live hooks only privately | slide |

If the Bunni gate failed: the Uniswap-only video leads with the CI story and Cork, and makes no finalist claim.

## 11. README draft

Order: promise; the hint list; quick start (`hookbreak --hook ... --fork-state fixtures/...`); properties P1 to P5; how the campaign and minimiser work; results (Cork, Bunni or "not reproduced", with call counts); CI template; **Uniswap integration** (permalinks to the handlers, PoolManager interactions, the reproduction tests; FEEDBACK.md; upstream PR); disclosure rule; prior art; limits; AI usage; licence.

## 12. UI/UX

Judgement: a fuzzer is a developer tool, so the UX is DX: a CLI that explains itself and one page that tells the story.

| Surface | What it shows | States |
|---|---|---|
| CLI | A live line per property ("P3 round trip: holding after 1.2M calls"), then on a break a boxed summary: property, actor, drained asset and amount, path to the generated test | no break: honest pass count and wall-clock |
| Campaign page | Big drained balance (before and after), the minimised sequence as a readable list ("withdraw 1 wei x 44"), the generated test with a copy button | not reproduced: "Not found in N calls with these hints" |
| CI page | The GitHub Action summary on the planted-bug hooks: red before the fix, green after | |

Copy: "property broke", "drained", "replays in seconds"; never "AI audit" or a risk score.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Bunni does not fall from generic properties | Fri 18:00 | Uniswap only; Witness as finalist alternate |
| Cork does not reproduce | Fri 06:00 | planted-bug hooks only |
| Remote fork fuzzing too slow | any run | dumped states only |
| Bunni needs a custom adapter | campaign | disclose it as a hint |
| Accidental public zero-day | any live hook run | never in the public repo |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Cork is a static check." | Yes, and we say so; it is the warm-up. Bunni is the one static tools do not flag | slide |
| "What hints did you give it?" | Here is the full list in the README, including any adapter | hint list |
| "How long did it take?" | The campaign record: calls and wall-clock | record |
| "Would it find a new bug?" | It finds property breaks; live hooks only privately | disclosure |
| "Why not Echidna or plain Foundry?" | Foundry for the shippable suite, Medusa for depth; the properties are the product | README |
| "Who uses it?" | Hook authors in CI before deployment | CI page |
| "Is this better than the scanners?" | Scanners label; this prints a failing test on the real block | generated test |
| "Did you write the hooks?" | Only the planted-bug ones; Cork and Bunni are the real deployed hooks | fixtures |

## 15. AI usage

Follow `00_common.md` section 8. A writes the properties and handlers by hand; AI may help with the CLI, the minimiser's plumbing and the pages.
