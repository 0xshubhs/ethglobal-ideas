# 07 Bidproof: build guide

Rank 7 of 10 (revised; judge average 6.67, projected 7.0 if at least about 10 real auctions exist; P(demo) 80%, the highest in the set). Source design: `track_ideas/finalist_ideas.md` section 3.7, `track_ideas/ideas/uniswap.md` rank 1, `track_ideas/finalist_judges/feasibility.md` candidate 6. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** Uniswap's CCA documentation says "It is the responsibility of the bidder to validate all parameters before participating in an auction", and a bid is locked once placed. Bidproof does that validation for every auction the factories have created, publishes each result with a one-line replay command, and ships a router that places a bid only if the auction passes the bidder's policy. A last-block simulator shows how much it costs to push the price at which the auction hands off to its v4 pool.

**Falsifiable promise.** "For every auction the v2 factories created on Ethereum, Base, Unichain and Arbitrum, our table states its final-step share, tick spacing against floor, token transfer behaviour, validation hook and LP recipient lock, and one command recomputes any row from chain state at the stated block. The same bid that fills on an honest auction reverts on a rigged one, and for any auction marked 'handoff movable' we push the handoff price by the stated amount on a fork in front of you."

**Prize stack (Uniswap only, by design).**

| Prize | Verbatim requirement (Facts, [Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)) | How this build meets it |
|---|---|---|
| Uniswap Foundation "Build with Uniswap" ($4,000 / $3,000 / $2,000 / $1,000) | "Build on or integrate any part of the Uniswap stack, including the Uniswap API, the Uniswap AMM (v2, v3, or v4), CCA, or any other Uniswap protocol. This also includes new v4 hooks, extensions or improvements to official Uniswap repositories, and tooling or solutions built for the broader ecosystem."; "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form (https://developers.uniswap.org/hackathon-feedback) that includes the link to your FEEDBACK.md file."; "Make sure your README clearly points to the relevant contracts and lines of code so we can verify your integration." | CCA, Liquidity Launcher, LBPStrategy and the v4 handoff are the subject; the scan is "tooling ... for the broader ecosystem"; an optional skill PR to `uniswap/uniswap-ai` is an official-repo improvement; FEEDBACK.md written during the build (the docs contradict themselves on exits) |

Judgement: if fewer than about 10 real auctions exist (counted before Thursday), Bidproof leaves the finalist list and is a Uniswap-prize entry that leads with the router and simulator.

## 2. Architecture

```
  [scan]  factory creation events on 4 chains (v2.0.0 and v2.1.0 factories)
     |     per auction: parameters, step schedule (from calldata if not readable on chain),
     |     LBPStrategy and position recipient, validation hook code hash,
     |     token probe on a fork (decimals, fee-on-transfer via a reverting balance probe)
     v
  table.json  (each row: block, values, rule results, replay command)  -> static report page
     |
  [BidproofRouter, Sepolia and forks]  reads the same fields on chain, checks a caller policy,
     |                                  then forwards the bid; otherwise reverts naming the failed rules
  [sim]  Foundry script: cheapest last-block bid that moves lbpInitializationParams() clearing price
         by a target; prints the cost; the v4 pool initializes at the predicted tick
```

**Router in plain English.** A `check` view that returns pass or a failure bitmask for an auction against a policy; a `submitBidIfSafe` entry point that runs the same checks and forwards to the auction's bid function with the caller's max price, amount and hook data, or reverts naming each failed rule. Policy fields: minimum final-step share of supply, minimum tick spacing as a share of the floor price, minimum token decimals, whether the LP recipient must be a locked contract, an allowlist of validation-hook code hashes, and that the LBPStrategy is on the published deployments list.

**Rules (from the CCA docs, Facts).** "the last block of the auction MUST sell a significant amount of tokens"; small tick spacing "can result in a DoS attack where the auction cannot finish"; the validation hook is `validate(uint256 maxPrice, uint128 amount, address owner, address sender, bytes hookData)`; `lbpInitializationParams()` returns the final clearing price, tokens cleared and post-fee currency raised for the strategy that initializes the v4 pool ([CCA TechnicalDocumentation.md](https://raw.githubusercontent.com/Uniswap/continuous-clearing-auction/main/docs/TechnicalDocumentation.md)).

## 3. Repo layout and scaffold

```
bidproof/
  contracts/      BidproofRouter, tests, sim script (lib: continuous-clearing-auction, v4-core, v4-periphery)
  packages/scan/  indexer, token probe, rule engine, replay CLI
  app/            report page, auction detail, bid flow
  fixtures/       table.json with block numbers, cached logs, Sepolia fork state with two auctions
  FEEDBACK.md
```

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Factory | CCA Factory v2.1.0 `0x000000001F26a0044BaA66024e7b6599c61963F8` on Ethereum, Unichain, Base, Arbitrum, Robinhood Chain, Sepolia; "versions before v2.0.0 should not be used" | Fact ([deployments](https://developers.uniswap.org/docs/liquidity/liquidity-launchpad/deployments)); v2.0.0 factory addresses (verify) |
| Strategy | LiquidityLauncher v3.2.0 `0x0000FffFBE8efE702c8703aE3477FF5dE3d319C0`; LBPStrategy v3.3.0 incl. Sepolia `0x95434E898Af471945Cab33D5064d2aC1A6Ba2000` | Fact (same page) |
| Docs conflict | "no bids can be exited before the auction has graduated" versus the `exitBid` section | Fact (technical doc); Uniswap question 8 |
| Population | number of real auctions per chain | **Count before Thursday** |
| RPC limits | public RPC block-range caps; commit the scan with its block and replay from cached logs by default (`--live` optional) | Judgement (feasibility candidate 6) |

## 5. Core algorithms in plain English

**Scan.** For each chain and factory: page through creation events from the factory's deployment block; for each auction read every parameter the policy uses; if the step schedule is not readable on chain, decode it from the creation transaction's calldata; read the LBPStrategy and the position recipient, and classify the recipient (EOA, known lock contract, other contract); hash the validation hook's runtime code; probe the token on a fork: decimals, and a transfer inside a call that always reverts and reports the balance delta (catches fee-on-transfer and rebasing). Evaluate each rule; write one row per auction with the block number and the replay command.

**Replay.** `bidproof replay <chain>:<auction>` recomputes the row from cached logs at the stated block, or from live chain state with `--live`, and diffs it against the committed row.

**Simulator.** On a fork just before the last block: search bid sizes (coarse brute force, then bisection) for the cheapest bid that moves the final clearing price by the target percentage; print the cost; then finish the auction and show the v4 pool initializing at the predicted tick. State exactly who loses: last-block buyers and whoever trades against the seeded pool, not every bidder (`ideas/uniswap.md` judge note).

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M0 (pre-event) | Count of real auctions | a number per chain, written down Thursday evening | B |
| M1 | Read one real auction's parameters and step schedule | all policy fields printed for one mainnet auction | B |
| M2 | Create one auction through the Sepolia factory and fill one bid | bid id returned, tokens escrowed | A |
| **Gate 1, Fri 01:00** | M1, M2 | both done | A, B |
| M3 | BidproofRouter with policy checks | `test_honest_auction_fills`, `test_rigged_final_step_reverts`, `test_unlocked_recipient_reverts`, `test_unknown_hook_reverts`, `test_fee_on_transfer_token_reverts` | A |
| M4 | Indexer over four chains, two factory versions | table.json with every auction and block numbers | B |
| M5 | Two auctions of the same token on a Sepolia fork (honest; final step 0.2% and EOA recipient) | the same bid fills on one and reverts on the other naming both rules | A |
| **Spine, Fri 09:00** | M3 to M5 | demo moment runs | A, B |
| M6 | Simulator | prints the cost to move the handoff price by the target and the predicted tick; the pool initializes there | A |
| M7 | Report page | header counts, filter by rule, auction detail with replay command | C |
| M8 | Bid flow UI | a judge places a bid through the router on the fork and sees the refusal card | C |
| M9 | Optional `uniswap-ai` skill PR | PR opened with the bidder-check skill | B |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M10 | FEEDBACK.md, form, README with lines, video | checklist done | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 01:00 | M2 Sepolia auction and bid | M1 one real auction | Report page and detail on fixtures |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M3 router and tests | M4 indexer (start long backfills before sleeping) | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M5 two auctions | Sleep 07:30 to 11:30 | Bid flow UI |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M6 simulator | (from 11:30) token probe, rule engine | M7 report page with real table |
| 12:00 to 16:00 | Sleep | Replay CLI; cached logs | M8 |
| 16:00 to 18:00 | Simulator tick check | M9 skill PR | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Security review of the router | FEEDBACK.md | Copy pass |
| **Sat 00:00 onward** | as in `00_common.md` section 2 | | |

**Pivot rule.** Few real auctions: lead with the router and the simulator, show "all N auctions" as an appendix, and treat it as a Uniswap-prize entry. If the indexer eats Friday: cap at mainnet and Base. If Uniswap says analysis tools do not count as "build on": pivot to **Humancap** (`ideas/uniswap.md` rank 5) on the same CCA harness. **Cut order:** the skill PR, then Unichain and Arbitrum, then the simulator's tick prediction; never the refusal.

## 8. Pre-event checklist

- [ ] **Count real auctions** from public explorers (research, not code): creation events of each factory per chain. This decides the demo order at dinner on Thursday.
- [ ] Read the CCA technical documentation and the interface; note the exit contradiction for FEEDBACK.md.
- [ ] Sepolia ETH on three wallets; archive RPCs for four chains.
- [ ] Uniswap Discord, then 16:30 Room 1 (A attends): questions 1, 2, 4, 7, 8 in `ideas/uniswap.md` section 8. Deciding: does an analysis tool on auctions the team did not deploy count as "build on or integrate", and what is the disclosure path for a failing live auction?
- [ ] Not allowed before 21:00: the indexer, the router, the rule engine.

## 9. Test plan

- **Router unit and fork tests** in M3 and M5; a fuzz test that `submitBidIfSafe` never forwards when `check` fails.
- **Replay determinism:** every row of table.json replays identically from cached logs.
- **Simulator:** predicted tick equals the initialized tick on the fork.
- **Fixtures:** table.json with blocks, cached logs, the Sepolia fork state with the two auctions.

## 10. Demo

**20 second hook (C).** "Uniswap's own docs say checking a token auction is the bidder's job, and you cannot leave before it ends. Nobody built the checker. Here is every real auction, checked. Pick a row."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | The docs quote and the scan header with the real counts | screenshot |
| 0:25 | A judge picks a row; its replay recomputes from the committed output at the stated block | saved terminal output |
| 1:00 | **The moment:** two auctions of the same token from the real factory on a Sepolia fork; the honest one fills; the rigged one (final step 0.2%, LP recipient a bare EOA) reverts naming both rules. Lands by 1:20 | recording |
| 2:00 | The simulator spends the printed amount in the last block; the v4 pool initializes at the predicted tick | saved output |
| 2:40 | Who loses, exactly: last-block buyers and whoever trades the seeded pool | slide |
| 3:10 | FEEDBACK.md highlights and the skill PR | slide |

Say "token auction", not "CCA", on stage.

**Video (2:00 to 2:59).** Docs quote, count, refusal by 0:50, simulator, who loses, end card.

## 11. README draft

Order: promise; the counts with block numbers; quick start (`npx bidproof replay <row>`); the rules with doc quotes; the table and how to read it; router and policy; simulator; **Uniswap integration** (permalinks to every factory read, the `lbpInitializationParams` call, the bid forwarding line, the fork tests; Sepolia addresses and tx hashes); FEEDBACK.md link; disclosure path; limits (rule failures are facts, not accusations); prior art (Kura, Recycle CCA, TARE, the hook scanners that did not place); AI usage; licence.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Report home | "N token auctions checked across 4 chains at block ...", counts per rule, a table with chain, token, end time, and one chip per rule (pass, fail, unknown) | filter by rule; empty filter state |
| Auction detail | Each rule as one plain sentence with the value and the threshold ("The last block sells 0.2% of supply; the docs say it must be significant"), the replay command with copy, a "Bid safely" button | live auction banner; ended auction shows the handoff price |
| Bid flow | Amount and max price; the router's check runs first and shows the verdict card | refusal lists each failed rule; pass shows the tx |
| Simulator view | "Moving the handoff price by 5% costs X USDC in the last block" with a small before and after chart | |

Copy: never "rigged" in the product; say "fails rule: last-block share". Rule names are plain words with the doc quote on hover.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Few real auctions | pre-event count under about 10 | Router and simulator lead; Uniswap-only entry |
| Step schedule not readable on chain | M1 | decode from creation calldata |
| Public RPC range caps on the venue NAT | scan or replay slow | cached logs by default, `--live` optional, hotspot |
| Naming live auctions | any failing live auction | counts and failed rules only; Uniswap's disclosure path |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Isn't this another risk scanner?" | Every verdict is a recomputable fact with a replay command, and the router enforces it before your money is locked | replay plus refusal |
| "Who actually loses?" | Last-block buyers and whoever trades against the seeded pool, not every bidder | slide |
| "Why can't bidders just read the parameters?" | They can; the docs tell them to; nobody does it across every auction, and the router makes it automatic | docs quote |
| "What about honest auctions with odd parameters?" | The policy is the bidder's; defaults follow the docs' own warnings | policy fields |
| "Did you deploy anything on mainnet?" | No; the router is on Sepolia and forks, and the scan reads mainnet | addresses |
| "What did you find?" | Counts by rule; names only through Uniswap's disclosure path | header |
| "What is in FEEDBACK.md?" | The exit contradiction in the docs, schedule readability, factory version discovery | FEEDBACK.md |
| "Does this help Uniswap?" | It is the bidder half the launchpad lacks, and the skill PR puts it inside Uniswap AI | PR link |

## 15. AI usage

Follow `00_common.md` section 8. A writes the router and its tests by hand; AI may help with the indexer pagination, the token probe harness and the report page.
