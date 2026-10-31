# Hedera: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: Hedera's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only.

In scope, all category `building-from-scratch` ([Mumbai Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)):
- **Track 1.** "AI Agents That Pay: x402 on Hedera", $6,500 (1st $3,000, 2nd $2,000, 3rd $1,500).
- **Track 2.** "Tokenize Anything with Hedera Studios", $5,000 (1st $2,500, 2nd $1,500, 3rd $1,000).
- **Track 3.** ""No Solidity Allowed": Build with Hedera SDKs", $2,000 (2 x $1,000).

Out of scope: "Built on Hedera (Continuity Track)", $1,500. It is Continuity only and is ignored everywhere below.

**How to read this file.** Lines under "Sourced facts" or marked **Fact** carry a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria, fetched 2026-10-31), `track_ideas/history/hedera.md` (dossier, cited as [H] with its section), `track_ideas/ideas_draft/hedera.md` (draft, cited as [D]), `track_ideas/00_season.md` (season brief), the finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` and `plans/`. ETHGlobal pages were not re-fetched: the 31 Oct snapshot already holds them verbatim. On 2026-10-31 I re-checked the x402 repo, the Hedera docs, the ATS and Stablecoin Studio repos, the consensus node config and the Hedera mirror node (section 2). No bot check was met.

---

## 1. What Hedera's judges reward (from the dossier)

### Sourced facts

- Hedera has sponsored 14 ETHGlobal hackathons since August 2024; Mumbai is the 15th. Since Cannes 2026 the menu has been stable: agentic payments, tokenization and "No Solidity". Mumbai tightens each one: x402 is now mandatory, tokenization must use Hedera's own studios, and "No Solidity" is unchanged except for its smaller pool ([H] H0, H2, H7).
- Hedera's own hackathon rubric, shipped in the `hackathon-helper` plugin that the Mumbai workshop installs, has these weights: Innovation 10%, Feasibility 10%, Execution 20%, Integration 15%, Validation 15%, Success 20%, Pitch 10%. Integration scores 5 only when "A Hedera service is integrated in a way that was not obvious". The validator adds "Mirror node queries only = 1 point" ([judging-criteria.md](https://github.com/hedera-dev/hedera-skills/blob/master/plugins/hackathon-helper/skills/validate-submission/references/judging-criteria.md); [SKILL.md](https://github.com/hedera-dev/hedera-skills/blob/master/plugins/hackathon-helper/skills/validate-submission/SKILL.md); [H] H6).
- Partner prizes are judged "based on the materials you provide": the repo, the README and the video ([details page](https://ethglobal.com/events/mumbai/info/details)).
- 2026 winners used a native primitive in an unexpected way. Pastel used an HCS topic as an "event-sourced order book". In Wafer, a contract held its own HTS KYC and freeze keys. AutoVoyage paid through a HIP-336 allowance and a self-hosted facilitator. Rialto closed loans with a HIP-1215 scheduled call. F2F executed a scheduled HCS submit "the moment the second of two required signatures lands" ([H] H4, H5).
- Spending guards for agents mostly lost. Planbound, AEGIS, Yareon and Pixport (Lisbon 2026) and Bound and AegisPay (Cannes 2026) placed nothing. At ETHOnline 2026 the payment winners sold services people pay for ([H] H5 item 3).
- Hedera's own x402 bounty (closed 31 July 2026) paid Pinout, Tally, Xorv, Qisma and Mystic. Each one changed how the payment works (metering, an `upto` ceiling, splits); none just wrapped an API ([Hedera blog](https://hedera.com/blog/x402-bounty-on-hedera-winners-announced/); [H] H8).
- Only 6 of the 40 Hedera winners in 2026 also won another sponsor's prize ([H] H4 counts).

### Judgement: what these judges will reward (ranked)

1. **A native service doing a job a contract would otherwise do, named precisely.** Winners say what Schedule, HCS, HTS and Mirror Node each do. Losers say "logs to Hedera".
2. **The non-obvious primitive.** Wait-for-expiry schedules, threshold and nested keys, HIP-336 allowances to contracts, token keys and custom fees, schedule admin keys. These are Hedera-only, and they are where a security team can be original.
3. **A paid service with the enforcement inside the payment path**, not an off-chain guard in front of it.
4. **Real numbers and stated limits.** A population scan of mainnet, a measured time or fee, an honest "this part is simulated".
5. **Ecosystem and upstream contributions.** PRs to x402, ATS, Agent Kit or Stablecoin Studio.
6. **A README written for the rubric.** Lean Canvas, users, projected accounts and TPS, a services table. Validation and Success are 35% of the weight and most teams leave them blank.

### Judgement: the obvious entries we assume several teams will submit

- Track 1: a pay-per-call LLM or translation API; an agent marketplace with A2A; a metered MCP server; a research agent with a budget; an "agent firewall" with spending caps; regional-language speech-to-text for the Mumbai crowd (the track lists it).
- Track 2: invoice factoring; fractional real estate or gold; a remittance stablecoin with KYC (listed, and in Mumbai); a bond with a coupon schedule (listed); an order-book UI for ATS assets (listed).
- Track 3: an HCS notary or timestamped proof; a supply-chain tracker; token-gated access; a scheduled payment bot; an HCS chat. These come from Hedera's earlier idea list ([H] H3 era 4).

Every final idea below must beat all of these on at least one property a judge can check from the repo and video.

---

## 2. Facts re-checked on 2026-10-31 that change the ideas

1. **Facilitator names disagree.** The track text names "Official x402, Ax402, or Blocky402". Hedera's facilitators page lists the Official x402 facilitator (testnet only, `https://x402.org/facilitator`, fee payer `0.0.9185802`), **Launa** (testnet `https://testnet.facilitator.launa.dev`; mainnet needs an account) and Blocky402 (testnet `https://api.testnet.blocky402.com`, fee payer `0.0.7162784`; mainnet `https://api.blocky402.com`). It also gives four steps for running your own facilitator ([facilitators](https://docs.hedera.com/solutions/ai/x402/facilitators)). **Consequence (Judgement):** settle at least one payment through Blocky402 or the Official facilitator, which appear on both lists, and ask about Ax402 (question 1).
2. **`transferExecutor`.** The spec PR [#3205](https://github.com/x402-foundation/x402/pull/3205) merged on **2026-09-24**; the draft wrongly says 2026-08-19. The implementation PR [#4030](https://github.com/x402-foundation/x402/pull/4030), "feat(hedera): add transferExecutor asset transfer method", by a Blocky402 developer, is still **open** and was last updated 2026-10-29. The spec says:
   - the method is meant for HIP-336 allowances to "delegation, session-key, spend-policy, subscription and agent-wallet contracts";
   - admission is "default deny", and an executor not on the facilitator's `extra.executors` list is rejected;
   - an executor MUST bind the authorization to `from`, `asset`, `to` and `amount`, MUST make it single-use and MUST signal failure by reverting;
   - the prerequisites include "No custom fees on `asset`";
   - "A facilitator that cannot read a settled transaction's child records and logs MUST NOT advertise `transferExecutor`" ([scheme_exact_hedera.md](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme_exact_hedera.md)).
3. **The reference facilitator was already hardened.** PR [#2707](https://github.com/x402-foundation/x402/pull/2707), "Hardened Hedera facilitator verify", merged 2026-07-03. `verify()` now checks the payer's on-chain key, including KeyList and threshold accounts, and pre-checks balance and token association against the Mirror Node, "fail closed". The net-credit check is still open in PR [#3061](https://github.com/x402-foundation/x402/pull/3061), and so are `upto` [#2919](https://github.com/x402-foundation/x402/pull/2919), `batch-settlement` [#3466](https://github.com/x402-foundation/x402/pull/3466) and Go Hedera [#3752](https://github.com/x402-foundation/x402/pull/3752). **Consequence:** a "hardened facilitator" entry has to aim at what #2707 left open.
4. **Client spend controls are now built into x402.** PR [#3124](https://github.com/x402-foundation/x402/pull/3124), "feat(TS): spend controls", merged 2026-08-13. It gives every x402 TS client "a default $1 USD cap on recognized pegged assets (plus optional per-asset atomic caps and an asset allowlist)". **Consequence (Judgement):** a client-side budget is now a default, not a feature. A spending-control entry only counts if a compromised agent cannot bypass it.
5. **A subscription scheme exists only as an EVM proposal.** PR [#1133](https://github.com/x402-foundation/x402/pull/1133), "Add subscribe scheme specification for recurring payments", is open. It needs "an immutable registry contract" with a per-period cap, a monotonic cursor and time windows. PR [#2717](https://github.com/x402-foundation/x402/pull/2717) does subscriptions on Solana through a program. Nothing exists for Hedera.
6. **ATS already documents a DvP pattern, but it is a hash lock.** The ATS hold guide's "Payment vs Delivery (DvP)" steps are: "Token seller creates hold with lock hash", "Payment is made by buyer", "Seller reveals hash secret", "Hold is executed using the secret". The capabilities page lists "Delivery vs Payment (DVP)" and "Trade settlement with clearing house approval" ([hold-operations.md](https://github.com/hashgraph/asset-tokenization-studio/blob/main/docs/ats/user-guides/hold-operations.md); [capabilities-overview.md](https://github.com/hashgraph/asset-tokenization-studio/blob/main/docs/ats/getting-started/capabilities-overview.md)). ATS's latest release is `v.8.0.0-ats` (2026-06-24), and the repo was last pushed 2026-10-19. `apps/ats/web/.env.example` sets `REACT_APP_RPC_RESOLVER='0.0.9212226'` and `REACT_APP_RPC_FACTORY='0.0.9213391'` on testnet ([repo](https://github.com/hashgraph/asset-tokenization-studio)). Stablecoin Studio has a Hold domain with an escrow role and was last pushed 2026-06-29 ([repo](https://github.com/hashgraph/stablecoin-studio)). **Consequence:** the draft's claim that ATS lacks DvP is wrong. What ATS lacks is an atomic DvP across both studios.
7. **What can be scheduled.** The consensus node's default schedule whitelist is "ConsensusSubmitMessage, CryptoTransfer, TokenCreate, TokenUpdate, TokenMint, TokenBurn, CryptoCreate, CryptoUpdate, FileUpdate, SystemDelete, SystemUndelete, Freeze, ContractCall, ContractCreate, ContractUpdate, ContractDelete, CryptoApproveAllowance" plus node transactions. `TokenFreezeAccount`, `TokenUnfreezeAccount`, `TokenWipe` and `TokenAssociate` are **not** on it ([SchedulingConfig.java](https://github.com/hiero-ledger/hiero-consensus-node/blob/main/hedera-node/hedera-config/src/main/java/com/hedera/node/config/data/SchedulingConfig.java)). The docs add:
   - a schedule can wait up to 62 days;
   - with `wait_for_expiry` it executes "at the earliest available consensus time after their expiration time on a best-effort basis";
   - "If this key [admin] is not set upon creation, the transaction cannot be deleted";
   - a schedule "cannot be modified once submitted" ([scheduled transactions](https://docs.hedera.com/hedera/core-concepts/scheduled-transaction)).
   **Consequence:** a schedule with `wait_for_expiry` is a timelock the network enforces. A scheduled unfreeze is not possible by default.
8. **Historical balances are snapshots.** A testnet query for `/api/v1/balances?account.id=0.0.98&timestamp=lte:1761900000` returned the snapshot taken at `1761899877.976915520`, about two minutes before the requested time ([testnet mirror node](https://testnet.mirrornode.hedera.com/api/v1/balances?account.id=0.0.98&timestamp=lte:1761900000)). **Consequence:** the draft's 3D promise, "reserves at that exact consensus second", is false as written.
9. **USDC token keys.** On Hedera mainnet `0.0.456858` and on testnet `0.0.429274`, USDC has an admin key, a freeze key and a supply key. It has no wipe, KYC, pause or fee schedule key, and no custom fees ([mainnet token](https://mainnet.mirrornode.hedera.com/api/v1/tokens/0.0.456858); [testnet token](https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.429274)).
10. **Agent Kit.** Hedera Agent Kit JS `v4.2.0` was released 2026-10-28. It documents `AgentMode.RETURN_BYTES` ("returns frozen, unsigned transaction bytes for the calling host app, wallet, or runtime to sign and submit") and ships `sign_schedule_transaction_tool` and `schedule_delete_tool` ([hedera-agent-kit-js](https://github.com/hashgraph/hedera-agent-kit-js); [TRANSACTION_MODES.md](https://github.com/hashgraph/hedera-agent-kit-js/blob/main/docs/TRANSACTION_MODES.md)).
11. **Prior art: a finalist on Hedera.** OnchainRouter (2026 finalist, no partner prize) was an "OpenRouter for onchain tools" that settled in HBAR on Hedera through Blocky402, "No answer, no charge" (`research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2026.md`).

---

## 3. Rubric used (Judgement)

None of the three tracks publishes a numeric rubric or a "Won't place" list. Track 3's "with no Solidity smart contracts" works as one. Following the task, each track is scored on its verbatim "Extra points" items (its "What we want to see"), plus Novelty versus past winners and the expected Mumbai field, plus Feasibility in 36 hours for this team. Every item is scored 1 to 10.

**Track 1 extra points (verbatim):**
- X1 "Spending controls for agents: budgets, per-merchant limits, allowlists, or a human-in-the-loop approval above a set amount."
- X2 "Agent identity and reputation through HCS-14 or ERC-8004"
- X3 "An HCS topic used as a tamper-evident audit log of each agent's spending."
- X4 "Multi-agent negotiation (A2A or ACP) before the payment is made."
- X5 "Settling in an HTS token such as USDC, or using HTS custom fees to split revenue."
- X6 "Recurring or subscription-style payments through Scheduled Transactions."
- X7 "Use of the Hedera Agent Kit or Hedera Network MCP."

**Track 2 extra points (verbatim):**
- T1 "Compliance controls: KYC, freezes, transfer restrictions, pauses."
- T2 "Custom fees and distributions."
- T3 "Oracle pricing or NAV feeds."
- T4 "Scheduled Transactions for coupons, vesting, or recurring payouts."
- T5 "Contributions back to ATS or Stablecoin Studio."

**Track 3 extra points (verbatim):**
- Na "A coherent end-to-end user experience."
- Nb "Integration with the Hedera Mirror Node REST API."
- Nc "Creative use of HCS for data integrity, logging, or messaging."
- Nd "The Hedera Agent Kit for AI-driven workflows."
- Ne "A thoughtful security approach (key management, access controls)."

**Formula.** Overall = 0.4 x (mean of the best k extra-point scores) + 0.3 x Novelty + 0.3 x Feasibility, with k = 4 for Track 1 and k = 3 for Tracks 2 and 3. It is rounded to one decimal.

Why best k and not all: no 2026 winner touched every extra point, and the dossier shows that depth on a few beats a feature list ([H] H5). Qualifications are pass or fail. An idea that fails one cannot rank.

---

## 4. Vetting the fifteen draft ideas

No draft idea depends on pre-existing project code. None of plans A to E targets Hedera; all five mark it "Skip" ([D] "Relation to plans"). A Hedera entry is therefore a separate product.

### Track 1 (draft)

| Draft idea | X1 | X2 | X3 | X4 | X5 | X6 | X7 | Nov | Fea | Overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1A Leash | 10 | 4 | 7 | 2 | 8 | 3 | 6 | 7 | 5 | 6.7 | None formal. It depends on unmerged PR #4030 for the executor path, so R1 holds only through a self-run facilitator. Since x402's built-in spend controls (#3124), it reads like an off-chain guard unless the demo shows a compromised agent failing. Its paid service is incidental, so it is close to the losing guard pattern | **Revise**: put a real paid service behind it, prove on-chain binding, add a fallback |
| 1B Range402 | 4 | 2 | 7 | 1 | 9 | 2 | 3 | 6 | 7 | 6.2 | None formal. PR #2707 already closed the signature and association gaps the draft targets. Selling "the scorecard" as the paid service is thin | **Revise** into Strict402: aim at what #2707 left open; the paid service is a real endpoint |
| 1C KeyCheck | 7 | 5 | 6 | 2 | 8 | 2 | 7 | 6 | 8 | 7.0 | None. Risk: reads as a "rug checker" unless the verdicts are deterministic and replayable | **Revise**: deterministic rules, a mainnet population scan, ship as an Agent Kit plugin |
| 1D FuzzMeter | 7 | 2 | 8 | 1 | 8 | 2 | 5 | 5 | 6 | 6.1 | None formal. Hedera is only the payment rail plus receipts, so the Integration row is weak. "Metered MCP server" is a listed idea, so others will submit one | **Revise**: per-batch metering, HCS receipts as the replay key, Network MCP for budget reads |
| 1E Bolo Meter | 5 | 2 | 6 | 1 | 8 | 2 | 3 | 3 | 8 | 5.5 | None formal. It is the track's own listed idea in the host city, so the most-copied entry; low security depth; it needs a 0G slot to matter | **Drop**, replaced by Subscribe402 |

### Track 2 (draft)

| Draft idea | T1 | T2 | T3 | T4 | T5 | Nov | Fea | Overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 2A Settle or Nothing | 9 | 5 | 3 | 4 | 6 | 7 | 6 | 6.6 | None formal. Its premise ("the secondary market ATS lacks") overstates the gap: ATS documents a hash-lock DvP (section 2, item 6) | **Revise**: pitch atomic two-studio DvP against the documented hash-lock flow |
| 2B Reg S Gate | 9 | 3 | 1 | 6 | 1 | 5 | 5 | 5.4 | It depends on a World Passport nationality predicate nobody has confirmed. World-gated RWA (Covenant, Lisbon 2026) did not place | **Drop**, replaced by Issuer Brake |
| 2C Reserve-Locked Rupee Corridor | 7 | 6 | 6 | 2 | 1 | 3 | 8 | 5.8 | None. It shows the Studio's own Reserve feature, and a "remittance stablecoin" is listed and will be common in Mumbai | **Drop**, replaced by Coupon Clock |
| 2D ATS Proof Pack | 7 | 3 | 1 | 2 | 10 | 8 | 6 | 6.9 | None. A real finding cannot go into a public repo before disclosure. The Success row is weak | **Revise**: narrow to three invariant families, plan the disclosure, keep the testnet issuance |
| 2E Warehouse Lien | 8 | 4 | 6 | 7 | 3 | 6 | 4 | 5.8 | None formal. The CCIP lane and its version are unconfirmed, and two chains in 36 hours is the riskiest build | **Revise**: Hedera only, with CCIP as a stretch |

### Track 3 (draft)

| Draft idea | Na | Nb | Nc | Nd | Ne | Nov | Fea | Overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| 3A Slowvault | 7 | 8 | 6 | 3 | 4 | 7 | 8 | 7.3 | **Design flaw:** a 2-of-3 threshold key can sign a direct `CryptoTransfer`, so nothing forces transfers through a schedule. The promise is false as written | **Revise**: nested key with a stateless validator; `wait_for_expiry` enforces the delay (section 7) |
| 3B Ask a Human | 7 | 6 | 6 | 9 | 8 | 5 | 8 | 7.1 | None. Human-in-the-loop agents are crowded, and YourTurn Concierge won with a close design | **Revise** (minor): bind the approval to the schedule ID, use RETURN_BYTES |
| 3C First Finder | 6 | 7 | 9 | 2 | 8 | 6 | 8 | 7.4 | None | **Keep** (minor edits: salt, bind the account into the commit) |
| 3D Reserve Clock | 6 | 8 | 6 | 1 | 6 | 4 | 7 | 6.0 | Its promise is false: mirror balances are periodic snapshots (section 2, item 8). Proof of reserves is a well-worn genre | **Drop**, replaced by Freeze Desk |
| 3E Schedule Lens | 7 | 8 | 5 | 8 | 9 | 7 | 6 | 7.2 | None | **Revise**: use ScheduleInfoQuery decoding (cheaper than raw protobuf), cover the whitelist types that hand over control |

---

## 5. Track 1: AI Agents That Pay: x402 on Hedera ($6,500)

Verbatim qualifications ([Mumbai Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)):
- R1 "At least one x402-protected endpoint that settles on Hedera testnet or mainnet through any facilitator listed in the Hedera docs (Official x402, Ax402, or Blocky402), or through a facilitator you run yourself."
- R2 "An agent or client that finds the endpoint and completes at least one paid request end to end, with no human approving."
- R3 "A public GitHub repo with a README that covers setup, architecture, and the payment flow, including the Hedera transaction ID of at least one settled payment."
- R4 "A demo video of 5 minutes or less that shows a payment settling and links to it on HashScan."

The video must also be 2 to 4 minutes for ETHGlobal ([details page](https://ethglobal.com/events/mumbai/info/details)). Every idea assumes a cut of 2:00 to 2:59.

### Final ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Subscribe402: x402 subscriptions where every period is a schedule the merchant cannot speed up, enlarge or repeat | 7.5 | New (replaces Bolo Meter) | Hedera only; the same project also enters Track 3 |
| 2 | KeyCheck: agents pay a cent to learn whether a Hedera token's keys can hurt them | 7.5 | Revise | Hedera + Arkiv "Build on Arkiv" (optional) |
| 3 | Leash: the agent's spending limit lives in the settlement transaction | 7.3 | Revise | Hedera + World ID Agent Pass |
| 4 | Strict402: a facilitator that checks what the payee actually received, with an attack range to prove it | 6.5 | Revise (was Range402) | Hedera only |
| 5 | FuzzMeter: a metered fuzzing tool whose receipts anyone can replay | 6.4 | Revise | Hedera only |

Tie at 7.5 (Judgement): Subscribe402 ranks first because it fills an extra point (X6) that no Hedera payments winner has filled, and because one project can be judged in two Hedera tracks.

---

### Rank 1. Subscribe402: x402 subscriptions where every period is a schedule the merchant cannot speed up, enlarge or repeat

**Pitch.** x402 is pay-per-request. Real services sell subscriptions. On EVM, the open subscribe proposal (x402 PR #1133) needs an immutable registry contract with a per-period cap, a monotonic cursor and time windows. On Hedera every one of those guardrails is a property of a scheduled transfer: its amount is fixed in its body, it executes once, `wait_for_expiry` stops it running early, and the payer's admin key cancels it. Subscribe402 is an x402 extension and a Hedera binding for subscriptions, with no contract. Period 1 settles through Blocky402 as a normal `exact` payment. Periods 2 to N are schedules that the agent signs once.

**Falsifiable promise.** "The merchant cannot charge more, earlier or more often than the quote. Each period is an immutable scheduled transfer whose amount and time the network enforces, and the merchant holds no allowance and no key on the agent's account. The agent cancels any future period with one `ScheduleDelete`, and loses access exactly at that period's boundary, not before."

**Demo moment (20 seconds).** One-minute periods. The agent subscribes to a token-key-change alert feed. HashScan shows period 1 settling through Blocky402. At the next minute boundary, period 2 executes on its own and its HashScan link opens. The merchant's "greedy" button tries to pull an extra payment: `INVALID_SIGNATURE`, because it has no way to sign for the agent. The agent cancels period 4, and at minute 4 the feed answers `402` again.

**How it works.**
- **402 response.** It carries a standard `exact` requirement for period 1 and an `extra.subscription` object: `{ period, periods, amount, asset, payTo, scheduleFeePayer }`.
- **Client.** An x402 TS client with an Agent Kit agent pays period 1 through Blocky402. It then builds N-1 `ScheduleCreateTransaction`s, each wrapping a `TransferTransaction` of USDC `0.0.429274` from the agent to `payTo`, with:
  - `setWaitForExpiry(true)` and expiry = start + i x period;
  - admin key = the agent's key, so only the agent can cancel;
  - payer = the merchant, so the agent needs no HBAR;
  - a unique memo `sub:<id>:<i>`, to avoid `IDENTICAL_SCHEDULE_ALREADY_CREATED`.
  The agent signs the schedules and sends the bytes; the merchant co-signs as fee payer and submits.
- **Merchant verification.** It reads each schedule from the Mirror Node (`/api/v1/schedules/{id}`) and from `ScheduleInfoQuery`, and accepts only bodies that match the quote. An access token for period i is valid only if schedule i executed with `SUCCESS`.
- **Audit log.** An HCS topic records created, executed, failed and cancelled periods.
- **Budget.** The agent refuses any subscription whose committed outflow over the next 62 days exceeds its budget.
- **Upstream.** A short spec note, "subscribe on Hedera via scheduled transfers", posted as a comment on #1133 or a draft PR.

```ts
const tx = await new ScheduleCreateTransaction()
  .setScheduledTransaction(new TransferTransaction()
    .addTokenTransfer(usdc, agentId, -amount)
    .addTokenTransfer(usdc, merchantId, amount))
  .setWaitForExpiry(true)
  .setExpirationTime(Timestamp.fromDate(periodStart(i)))
  .setAdminKey(agentPublicKey)
  .setPayerAccountId(merchantId)
  .setScheduleMemo(`sub:${subId}:${i}`)
  .setTransactionId(TransactionId.generate(merchantId))
  .freezeWith(client);
const bytes = (await tx.sign(agentKey)).toBytes();
```

**Go or no-go gate (hours 0 to 3).** (a) On testnet, a schedule with merchant payer and `wait_for_expiry` executes within a few seconds of its expiry and shows `executed_timestamp` on the Mirror Node. (b) The agent's signature on the ScheduleCreate counts toward the inner transfer. (c) An agent `ScheduleDelete` with the admin key works. If (a) drifts by more than about 10 seconds, use 2-minute periods.

**Requirement checklist.**
- [x] R1: period 1 is a standard `exact` payment through Blocky402 testnet, a facilitator on both lists.
- [x] R2: the agent finds the feed through its 402 response and an HCS-11 style profile or a `.well-known` listing (ask what "finds" means, question 4), and pays with no human.
- [x] R3: README with setup, an architecture diagram, the Mirror Node checks, and the transaction IDs of period 1 and of an executed scheduled period.
- [x] R4: the video shows both settlements and opens HashScan.
- [x] Extra points: X6 is the core; X5 (HTS USDC); X3 (HCS lifecycle log); X1 (committed-outflow budget); X7 (Agent Kit client).
- [x] Track 3 eligible as well: TypeScript SDK only, no Solidity, and it uses HTS, Scheduled Transactions, HCS and the Mirror Node.
- [x] Fresh build; public libraries only (`@hashgraph/sdk`, `@x402/*`, Agent Kit).
- [ ] Risk: the later periods do not pass through a facilitator. Ask whether judges count them as x402 payments (question 5). Period 1 satisfies R1 regardless.
- [ ] Limit, stated in the README: 62 days at most per schedule, so a monthly plan keeps two periods in flight and renews on each payment. A period fails if the agent's balance is short, and the merchant then simply revokes access.

**Why it beats rivals (Judgement).** Pay-per-call wrappers will fill this track. A subscription is a different market (feeds, monitoring, API plans), and it shows the X6 extra point that no 2026 Hedera payments winner filled ([H] H4). It also beats the EVM design on its own terms: four guardrails with no contract to audit. That is the rubric's "integrated in a way that was not obvious".

**Closest prior winners.**
- Pinout (Hedera x402 bounty): one payment opens a metered session, settled with HCS checkpoints and a HIP-991 topic. Session metering, not recurring commitments ([Hedera blog](https://hedera.com/blog/x402-bounty-on-hedera-winners-announced/)).
- Tally (Hedera x402 bounty): `upto` with a consensus-enforced allowance cap. Subscribe402 needs no allowance at all.
- Aivy Quorum (ETHOnline 2026, Continuity): a pre-signed schedule for an insurance payout. It used the same primitive for a one-off payment.

**Stack.** Hedera only, judged in Track 1 and Track 3 for one partner slot. Its alert feed can reuse KeyCheck's rule engine if the team wants a real service quickly.

**Difficulty.** Low-medium. Mostly SDK and Mirror Node work.

**Scores.**

| X1 | X2 | X3 | X4 | X5 | X6 | X7 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|---|---|
| 6 | 2 | 6 | 2 | 8 | 10 | 4 | 8 | 7 | **7.5** |

**Judge notes (Judgement).**
- Hedera judge: "This is the extra point we keep writing and nobody builds. Show the scheduled period on HashScan, not just in your logs."
- Hedera judge: "Put the comparison with the EVM subscribe proposal in the README. That is the Hedera story."
- Veteran: "Do not demo month-long periods. One-minute periods with a visible clock. And have an answer ready for 'what if the agent runs dry', because someone will ask it."

---

### Rank 2. KeyCheck: agents pay a cent to learn whether a Hedera token's keys can hurt them

**Pitch.** An HTS token can carry admin, wipe, freeze, KYC, pause, supply and fee schedule keys, plus custom fees that shrink what a payee receives. No ERC-20 has these powers natively. KeyCheck is an x402-paid verdict endpoint and an Agent Kit plugin. An agent about to accept or pay a token asks what its keys and fees can do to it, and gets a deterministic verdict with a replay command. The same rules run over every fungible token on Hedera mainnet and publish one population table.

**Falsifiable promise.** "Every verdict is a pure function of the token's Mirror Node record at the cited timestamp, and one command recomputes it. A token with a live wipe key or a fractional fee is refused by the paying agent. Testnet USDC passes with 'issuer can freeze you; no wipe, KYC, pause or fee schedule key; no custom fees', which is exactly its record."

**Demo moment (20 seconds).** Two look-alike "USDC" tokens. The agent pays one cent for each verdict (two HashScan links). The real testnet USDC `0.0.429274` is accepted. The fake one, with a wipe key, a fee schedule key and a 5% fractional fee, is refused. The team then raises the fake's fee with its fee schedule key; the next verdict changes and cites the new timestamp. The population header reads "N of M mainnet fungible tokens have a live wipe key", whatever the real numbers turn out to be.

**How it works.**
- **Rule engine** (TypeScript, no LLM) over `/api/v1/tokens/{id}`. It flags:
  - key presence and key type (single key, threshold, contract, none);
  - custom fees: fixed, fractional, `net_of_transfers`;
  - pause status and the treasury account;
  - whether a missing key can ever be added later (encode the HIP-540 rules after checking them on testnet).
- **Account checks** on `/api/v1/accounts/{id}`: `receiver_sig_required`, key type, auto-association slots.
- **Paid endpoint.** `GET /verdict/{tokenId}`, x402 through Blocky402 at 0.01 USDC.
- **Agent Kit plugin.** `keycheck_verdict` and a `refuse_if` policy.
- **Records.** An HCS topic holds a hash of each paid verdict. An optional Arkiv cache holds verdict entities that expire after a set time.
- **Population scan.** Page through every mainnet fungible token, publish the counts by risk code, and make every row replayable.

**Go or no-go gate (hours 0 to 2).** Confirm on testnet which keys an admin key can add after creation (HIP-540 behaviour), because the "can never add a fee" verdict depends on it. If unclear, verdicts say "currently absent" and stop there.

**Requirement checklist.**
- [x] R1: the verdict endpoint settles through Blocky402 testnet in USDC.
- [x] R2: the agent finds the endpoint through the plugin's registry entry and its 402 response, and pays with no human.
- [x] R3: README with setup, architecture, the rule table, the population table and settled transaction IDs.
- [x] R4: the video shows a paid verdict settling and opens HashScan.
- [x] Extra points: X7 (Agent Kit plugin); X5 (USDC); X1 (an asset allowlist the agent builds from verdicts); X3 (HCS verdict log); X2 optional (an HCS-14 profile for the oracle).
- [x] Fresh build; no pre-existing code.
- [ ] Wording risk: describe keys as facts ("this key exists"), never as accusations against named projects.

**Why it beats rivals (Judgement).** Rug checkers are common on EVM. One that knows HTS keys and custom fees is a Hedera-only problem, and it answers the rubric's "could not be built cross-chain" question by itself. The population scan gives it the real-data weight that ZoneProof and Carpool had ([H] H5 item 4). It also serves facilitators: the spec now lists "No custom fees on `asset`" as a prerequisite for `transferExecutor`.

**Closest prior winners.**
- Turnstile (ETHOnline 2026, Hedera): paid analysis for agents. KeyCheck adds Hedera-native subject matter and deterministic replay.
- Price Feed Plugin and Hedera Agent Trust (Agent Kit plug-in prizes, Buenos Aires and ETHOnline 2025): plugins as products ([H] H4).
- npmguard (2026 finalist): paid verdicts on packages.

**Stack.** Hedera, plus optionally Arkiv "Build on Arkiv (from scratch)", where verdicts are expiring, owner-signed entities; it needs the `/arkiv/*.md` files (`track_ideas/ideas/arkiv.md`). A third slot stays open.

**Difficulty.** Low-medium.

**Scores.**

| X1 | X2 | X3 | X4 | X5 | X6 | X7 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|---|---|
| 7 | 5 | 6 | 2 | 8 | 2 | 9 | 7 | 8 | **7.5** |

**Judge notes (Judgement).**
- Hedera judge: "The population table is what makes this more than a scanner. Make sure HashPack or SaucerSwap people would want the feed. Name them in the README as target users, not as partners."
- Hedera judge: "Ship the plugin to npm; we have paid for Agent Kit plugins before."
- Veteran: "One cent per verdict times nobody is still nobody. Show an agent that changes its decision because of the verdict, live."

---

### Rank 3. Leash: the agent's spending limit lives in the settlement transaction

**Pitch.** Since x402 PR #3124, every client gets a default cap and an allowlist, but a compromised agent can switch them off. Leash moves the limit into the settlement transaction. The owner grants a HIP-336 allowance to an immutable `ITransferExecutor` policy contract. The agent signs single-use intents. Through the spec's new `transferExecutor` method, the facilitator can settle only intents that pass the owner's per-merchant caps, daily budget and allowlist. Above a threshold, a second approval is required, and it is issued only after a fresh World ID Agent Pass check. It is the open preview of Hedera's announced Agent Accounts.

**Falsifiable promise.** "Give the attacker the agent's session key and our facilitator's key: the most they can move is the remaining daily budget, to allowlisted merchants only, once per intent. Replaying an intent, changing its recipient or raising its amount reverts on chain."

**Demo moment (20 seconds).** A prompt-injected agent fires 20 paid requests at an attacker's 402 endpoint: 20 `invalid_exact_hedera_executor_*` or simulation reverts, and the attacker's HashScan page shows no inbound transfer. Our facilitator then replays one legitimate intent with a new `to`: reverted. A legitimate call to KeyCheck settles, and its HashScan link opens. A 25 USDC purchase waits for an Agent Pass approval; the judge taps deny, and nothing settles.

**How it works.**
- **`LeashExecutor.sol`.** Immutable: no proxy and no admin key on the contract. It does the following:
  - stores a per-owner policy (session keys, per-merchant daily caps, a global daily cap, an approval threshold, an approver key) that only the owner can change, with an optional delay;
  - verifies an EIP-712 intent `{from, asset, to, amount, nonce, deadline}` signed by a registered session key, plus an approver signature above the threshold;
  - consumes the nonce and calls HTS `transferFrom(asset, from, to, amount)` through the owner's allowance to the executor (HIP-336 and HIP-376).
- **Facilitator.** Self-run, built from `@x402/hedera` plus the public PR #4030 branch, credited in the README. It advertises `assetTransferMethods: ["cryptoTransfer","transferExecutor"]` and `executors: [<Leash address>]`. A second endpoint settles a plain `cryptoTransfer` through Blocky402, so R1 never depends on the branch.
- **Approval.** The approver backend verifies World ID Agent Pass on the server and signs the approval only on a validated result.
- **Logs.** The facilitator posts each settled or refused intent to an HCS topic.
- **Tests.** Foundry invariants: "settled spend per day never exceeds the cap", "no nonce settles twice", "no debit from any account other than `from`". They run with Hedera's HTS emulation for Foundry (`hashgraph/hedera-forking`, verify that it is current).

```solidity
interface ITransferExecutor {
    function executeTransfer(address from, address asset, address to, uint256 amount, bytes calldata authorization) external;
}

interface ILeashPolicy {
    function setPolicy(bytes32 policyHash, uint256 dailyCap, uint256 approvalThreshold, address approver) external;
    function setMerchantCap(address merchant, uint256 dailyCap) external;
    function addSessionKey(address key, uint64 expiry) external;
    function remainingToday(address owner, address merchant) external view returns (uint256);
}
```

**Go or no-go gate (hours 0 to 6).** (a) The PR #4030 branch builds and settles one `executeTransfer` on testnet. (b) A contract can spend an owner's HIP-336 USDC allowance through `transferFrom`. (c) Child records are readable from the Mirror Node. If (a) fails by hour 6, Leash runs without x402 on that path and R1 rests on the Blocky402 endpoint. That fallback is weak, so switch to Subscribe402 instead.

**Requirement checklist.**
- [x] R1: a self-run facilitator (explicitly allowed) and a Blocky402 endpoint.
- [x] R2: the agent finds the merchant endpoints through their 402 responses and pays below the threshold with no human. The above-threshold path is an extra point, not R2.
- [x] R3: README with setup, architecture, policy rules, the `transferExecutor` flow and transaction IDs.
- [x] R4: the video shows a settlement and opens HashScan.
- [x] Extra points: X1 (the core); X5 (USDC through the allowance); X3 (HCS log); X7 (Agent Kit agent).
- [x] Contract verified on HashScan; fresh build.
- [x] Not Track 3 eligible: it uses Solidity.
- [ ] Note: the spec says `transferExecutor` assets must have no custom fees. USDC has none (section 2, item 9).

**Why it beats rivals (Judgement).** The guard lane lost six times because its limits sat off chain ([H] H5 item 3). Leash is the first entry whose limit is checked inside the settlement, through the spec method Hedera's own facilitator developer is implementing this week. Its demo attacks the facilitator, not just the agent.

**Closest prior winners.**
- AutoVoyage (ETHOnline 2026, Hedera): a HIP-336 allowance to the agent's own key, so the only cap is the allowance total.
- Ognef (Lisbon 2026, Hedera "No Solidity"): default-deny mandates checked off chain.
- Planbound (Lisbon 2026, no Hedera prize): "Hedera-enforced spending accounts".

**Stack.** Hedera + World ID Agent Pass ($5,000). It meets "a meaningful action that needs a human identity or approval layer" and needs a deny path and a debrief ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)). No EF prize fits, because Hedera is not an Ethereum network.

**Difficulty.** Medium-high.

**Scores.**

| X1 | X2 | X3 | X4 | X5 | X6 | X7 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|---|---|
| 10 | 4 | 7 | 2 | 8 | 3 | 6 | 8 | 6 | **7.3** |

**Judge notes (Judgement).**
- Hedera judge: "If this runs on the `transferExecutor` path, it is the most on-roadmap entry we will see. Credit PR #4030 and tell us what broke."
- Hedera judge: "Spending caps alone do not win here. The facilitator-replay refusal is the part we will remember."
- Veteran: "It depends on an unmerged branch. Respect the hour-6 gate, or you will demo a contract with no x402 in front of it."

---

### Rank 4. Strict402: a facilitator that checks what the payee actually received, with an attack range to prove it

**Pitch.** The track lists "An open-source Hedera x402 facilitator with its own safety checks and replay protection". The reference facilitator already checks signatures and association (PR #2707). It still does not read the payee's net credit from the consensus record (open PR #3061), so a token with a fractional custom fee can report `SUCCESS` while the payee receives less. Strict402 is a self-run facilitator that verifies the effective credit after settlement. It refuses fee-bearing assets for exact quotes unless the quote is grossed up, and it keeps idempotency across resource servers. It is proven by a reproducible attack range run against itself and against the reference at a pinned commit.

**Falsifiable promise.** "Pay a 1,000-unit quote with a token that skims 5%: the reference flow at commit X reports success while the payee gets 950. Strict402 reports `settlement_transfer_amount_mismatch` with the transaction ID. Every case reruns from the repo with one command."

**Demo moment (20 seconds).** A grid of about ten cases turns red or green live against two facilitators the team runs: the reference and Strict402. The skim case opens on HashScan: 950 to the payee, 50 to the fee collector. Then a real paid endpoint (KeyCheck or any API) settles through Strict402.

**Cases (Judgement: check each against current `main` on day one and drop those #2707 already fixes).**
- A fractional fee, and a fractional fee with `net_of_transfers`.
- One payment presented to two resource servers that share a facilitator.
- The same bytes submitted inside the valid-start window.
- A `ScheduleCreate` wrapper.
- A second token in the transfer list.
- A wrong CAIP-2 network.
- Alias auto-creation for `payTo`.
- An unlisted executor (if #4030 lands).

**Responsible testing (Judgement).** Attack only facilitators the team deploys from public code. Ask before testing the hosted ones (question 9), and disclose privately.

**Requirement checklist.**
- [x] R1: a self-run facilitator settles a real endpoint on testnet.
- [x] R2: an agent pays that endpoint with no human.
- [x] R3: README with the case table, the architecture and transaction IDs.
- [x] R4: the video shows a settlement and HashScan.
- [x] Extra points: X5 (custom fees are the subject); X3 (an HCS receipt per settlement with the verified net credit).
- [x] Upstream: test vectors offered to #3061.
- [x] Fresh build.

**Why it beats rivals (Judgement).** Other teams will submit "a facilitator" because it is a listed idea, and most will fork the reference. This one shows a gap with numbers and closes it. Its weakness is the agent-facing extra points.

**Closest prior winners.** Hanvil and Scenario Engine (ETHOnline 2026, Hedera Harness track): tooling that improves Hedera's stack ([H] H4). Glassbox402 (Lisbon 2026, Hedera, finalist): an npm package wrapping APIs in x402 via Blocky402.

**Stack.** Hedera only.

**Difficulty.** Medium.

**Scores.**

| X1 | X2 | X3 | X4 | X5 | X6 | X7 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 2 | 7 | 1 | 9 | 2 | 3 | 6 | 8 | **6.5** |

**Judge notes (Judgement).**
- Hedera judge: "Useful to us directly. But the prize says agents that pay, so show one paying."
- Veteran: "Check PR #3061's status on Thursday; if it merges, your headline case is gone. Keep the replay and multi-server cases ready as the lead."

---

### Rank 5. FuzzMeter: a metered fuzzing tool whose receipts anyone can replay

**Pitch.** A metered MCP tool, `fuzz_invariant`, that sells batches of Foundry invariant runs over x402 on Hedera. A coding agent with a budget buys batches until it finds a counterexample or the budget ends. Each batch writes an HCS receipt with the target's code hash, the Foundry version, the seed, the run count and a result hash.

**Falsifiable promise.** "Every campaign an agent paid for can be replayed from its HCS receipts: same seed, same counterexample, same bill."

**Demo moment (20 seconds).** Claude Code with a 0.50 USDC budget fuzzes a deliberately vulnerable ERC-4626 vault. Batch three finds the share-inflation attack, at 0.06 USDC spent, with three HashScan links. A judge runs the receipt's seed with `forge test` on a clean machine and gets the same trace.

**How it works.** An MCP server whose HTTP transport is x402-protected through Blocky402, priced per batch of N runs. A sandboxed runner (Docker, no network, pinned Foundry). The agent reads its balance through the Hedera Network MCP (X7). An HCS receipt topic.

**Requirement checklist.**
- [x] R1 to R4 as standard.
- [x] Extra points: X3 (receipts are the core); X5; X1 (a budget-bounded agent); X7 (Network MCP).
- [x] Fresh build; the target vault is written at the event.

**Why it beats rivals (Judgement).** Metered MCP servers will be common, but a replayable proof of the work paid for is rare. The weakness: Hedera is only the rail, so Integration scores low.

**Closest prior winners.** AudiThor (Cannes 2026, Hedera "No Solidity"): audits billed by streamed micropayments. Pinout (Hedera x402 bounty): metered compute.

**Stack.** Hedera only.

**Difficulty.** Medium.

**Scores.**

| X1 | X2 | X3 | X4 | X5 | X6 | X7 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|---|---|
| 7 | 2 | 8 | 1 | 8 | 2 | 5 | 6 | 6 | **6.4** |

**Judge notes (Judgement).**
- Hedera judge: "Nice for the security crowd; what does Hedera do here that Base does not?"
- Veteran: "Foundry determinism across machines needs the same version and the same compiler settings. Pin both in the receipt or the replay claim fails in Q and A."

---

## 6. Track 2: Tokenize Anything with Hedera Studios ($5,000)

Verbatim qualifications ([Mumbai Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)):
- Q1 "Use ATS or Stablecoin Studio (SDK, contracts, web app, or a combination) to issue or manage a tokenized asset or stablecoin."
- Q2 "Deploy and demo on Hedera testnet."
- Q3 "A public GitHub repo, with contracts verified on HashScan where applicable."
- Q4 "A demo video of 5 minutes or less that covers issuance, configuration, and at least one lifecycle operation (for example a coupon payment, redemption, freeze, or reserve update)."

### Final ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Issuer Brake: every value-moving power ATS gives an issuer, on a public clock a trustee can stop | 8.0 | New (replaces Reg S Gate) | Hedera (+ World ID Agent Pass, optional) |
| 2 | ATS Proof Pack: invariant fuzzing for the Asset Tokenization Studio, sent upstream | 7.2 | Revise | Hedera only |
| 3 | Settle or Nothing: one-transaction DvP across both studios, against the documented hash-lock flow | 6.9 | Revise | Hedera only |
| 4 | Coupon Clock: escrowed coupons the issuer cannot skip, fired by schedules with no admin key | 6.6 | New (replaces Rupee Corridor) | Hedera only |
| 5 | Warehouse Lien: grain receipts pledged with an ATS hold and closed by a scheduled default | 6.4 | Revise | Hedera (+ Chainlink CCIP 2.0, stretch only) |

---

### Rank 1. Issuer Brake: every value-moving power ATS gives an issuer, on a public clock a trustee can stop

**Pitch.** ATS gives issuers court-order powers: "Forced Transfer: Move tokens between accounts without holder consent", "Forced Redemption", role grants and minting ([capabilities-overview.md](https://github.com/hashgraph/asset-tokenization-studio/blob/main/docs/ats/getting-started/capabilities-overview.md)). Whoever steals the issuer's key holds them all. Issuer Brake moves every ATS role onto a native Hedera account with a nested key: 2 of 3 officers, AND a stateless brake validator. The validator co-signs only a schedule that:
- wraps a `ContractExecuteTransaction` to the ATS diamond;
- has `wait_for_expiry` set and an expiry at least the per-function delay away;
- has the trustee's key as its admin key.

The network then refuses to run the call before the delay. The trustee sees it decoded on an HCS topic and can kill it with one `ScheduleDelete`. Defensive actions (freeze, pause) get a short or zero delay; value-moving actions (forced transfer, redemption, issue, role grant) get a long one.

**Falsifiable promise.** "Steal all three officer keys and you still cannot move one bond unit out of an investor's account for 24 hours (3 minutes in the demo), and the trustee can stop it. Steal the validator key instead and you can move nothing at all. Only officers plus validator together bypass the brake, and the README says so."

**Demo moment (20 seconds).** An "attacker" with two officer keys schedules a forced transfer of 1,000,000 bond units to himself. An HCS alert reads "controllerTransferByPartition 1,000,000 to 0.0.x, executes in 3:00". The trustee deletes it, and the Mirror Node shows the schedule deleted and balances unchanged. A legitimate freeze of a sanctioned holder goes through the fast path in seconds (HashScan link). A legitimate redemption executes when its clock ends.

**How it works.**
- **Issuance.** Issue an ATS bond on testnet through the ATS SDK or web app (factory `0.0.9213391`, resolver `0.0.9212226` per `.env.example`; verify that both are current). Set up KYC and the control list (Q4 "configuration").
- **Role account.** Grant the ATS roles to the brake account, whose key is `KeyList[ threshold(2, [A, B, C]), V ]`.
- **Validator V.** About 200 lines of TypeScript. It fetches the schedule by ID with `ScheduleInfoQuery` and never trusts the requester's bytes. It decodes the ATS call, applies the function's delay, and checks the admin key and the payer. Then it `ScheduleSign`s and posts the decode to the HCS brake topic.
- **Trustee console.** A React page that reads the Mirror Node and HCS, with a delete button.
- **Tests.** Foundry and TS tests against the validator's rules: it refuses `wait_for_expiry=false`, a short expiry, a missing or foreign admin key, an unknown target, and a nested schedule.
- No Solidity written by the team: ATS is Hedera's code. That makes it a candidate for Track 3 too (question 2).

**Go or no-go gate (hours 0 to 4).** (a) An ATS role granted to a threshold-key account's long-zero EVM address can be exercised by a `ContractExecuteTransaction` from that account. (b) A scheduled `ContractExecute` keeps the brake account as `msg.sender` when the schedule's payer is the brake account. (c) Find the exact ATS role names and function selectors in the deployed version (verify `controllerTransferByPartition` or its equivalent). If (b) fails, the brake account submits through a schedule whose inner payer is itself; test both.

**Requirement checklist.**
- [x] Q1: ATS issues and manages the bond.
- [x] Q2: testnet.
- [x] Q3: public repo; no new contracts to verify (if the team adds one, verify it on HashScan).
- [x] Q4: issuance, configuration (KYC, control list, role setup), and lifecycle operations: freeze (fast path), forced transfer (slow path, vetoed), redemption (slow path, executed).
- [x] Extra points: T1 (compliance powers made accountable); T4 (Scheduled Transactions are the mechanism); T5 (a docs PR to ATS describing the brake pattern for issuers).
- [x] Fresh build.

**Why it beats rivals (Judgement).** Every obvious Tokenize entry shows issuance plus KYC. None treats the issuer's own powers as attack surface, and that is the season's dominant story (Bybit, WazirX; `track_ideas/00_season.md` section 1.1). It is also the inverse of Wafer, which put the HTS keys inside a contract: here they sit on a timelocked native account, with no new contract at all. The brake is Hedera-only: on EVM it would need a timelock contract plus a guardian module.

**Closest prior winners.**
- Wafer (New York 2026, Hedera Tokenization): a contract holds the share token's KYC and freeze keys.
- NameGate and Rialto (ETHOnline 2026, Hedera ATS): issuance and compliance, with no issuer-key safety.
- F2F Cross-Border (Lisbon 2026, Continuity): a schedule that executes on the second signature.

**Stack.** Hedera. Optional World ID Agent Pass: the validator requires a fresh Agent Pass check from a named officer before co-signing a value-moving schedule, and a denied or expired check means nothing is scheduled ([World prizes](https://ethglobal.com/events/mumbai/prizes/world)).

**Difficulty.** Medium.

**Scores.**

| T1 | T2 | T3 | T4 | T5 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 9 | 2 | 1 | 10 | 5 | 9 | 7 | **8.0** |

**Judge notes (Judgement).**
- Hedera judge: "Institutions ask us about issuer key risk constantly. A brake built from schedules and key lists, with no new contract, is exactly 'the network does the heavy lifting'."
- Hedera judge: "Explain the fast path. If freezes are delayed too, compliance teams will reject it."
- Veteran: "Gate (b) is the whole idea. Prove the scheduled ContractExecute keeps the right sender before you write the console."

---

### Rank 2. ATS Proof Pack: invariant fuzzing for the Asset Tokenization Studio, sent upstream

**Pitch.** Issue a real bond with ATS on testnet, then ship an invariant suite for the ATS diamond as a PR to the ATS repo. It covers three families: partition conservation, hold accounting, and coupon entitlement against snapshots. Findings are disclosed privately first.

**Falsifiable promise.** "After ten million random operations across issue, transfer, hold, execute, release, reclaim, clear, freeze and snapshot, these all still hold:
- partition balances sum to total supply;
- held plus free equals each balance;
- an expired hold is reclaimable exactly once;
- every coupon entitlement equals snapshot balance times rate.

The suite is in the upstream PR for anyone to run."

**Demo moment (20 seconds).** Testnet issuance and a coupon run first. Then the fuzzer dashboard shows the counters climbing, and a one-line bug the team plants in a local fork of a facet is caught within seconds with a shrunk counterexample.

**How it works.** Foundry handlers over ATS's facets, deployed with the repo's own deployment order. The rough edges integrators reported become targeted properties: NameGate's "orphaned control list... silently blocked every transfer" and Rialto's "a blocked ERC-3643 transfer reverts with nothing at all" ([NameGate](https://ethglobal.com/showcase/namegate-63d0m); [Rialto](https://ethglobal.com/showcase/rialto-psod2)). Medusa is a stretch.

**Go or no-go gate (hours 0 to 6).** Deploy the diamond in a Foundry test. If that fails, run the invariants as Hardhat fast-check property tests against the repo's existing fixtures.

**Requirement checklist.**
- [x] Q1 to Q4: testnet issuance, configuration and a coupon or redemption in the video.
- [x] Q3: no new on-chain contracts (tests only).
- [x] T5, stated verbatim: "Contributions back to ATS".
- [ ] Disclosure: if a real bug turns up, keep it out of the public repo until Hedera acknowledges it, and ask for the channel (question 9).

**Why it beats rivals (Judgement).** It is the only entry built directly on the "contributions back" line, and it helps every future issuer. Its weakness is the rubric's Success row; the README must argue that safer ATS unblocks institutional issuers.

**Closest prior winners.** Hanvil and Scenario Engine (ETHOnline 2026, Hedera tooling). Nobody has tested ATS itself.

**Stack.** Hedera only.

**Difficulty.** Medium.

**Scores.**

| T1 | T2 | T3 | T4 | T5 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 7 | 3 | 1 | 2 | 10 | 8 | 7 | **7.2** |

**Judge notes (Judgement).**
- Hedera judge: "An open PR with a real suite is a contribution, even unmerged. Link it in the README."
- Veteran: "A planted bug is a weak demo. Lead with the counters and the upstream PR, and say plainly that the bug is planted."

---

### Rank 3. Settle or Nothing: one-transaction DvP across both studios, against the documented hash-lock flow

**Pitch.** ATS's documented DvP is a hash lock. The seller holds tokens under a hash, the buyer pays, and the seller reveals the secret. If the buyer pays outside a lock, the seller can walk away and reclaim when the hold expires. Settle or Nothing escrows both legs instead:
- the seller places an ATS hold, and the buyer places a Stablecoin Studio hold, both with the DvP contract as escrow;
- one `settle(tradeId)` call executes both holds, or neither;
- compliance is re-checked at execution.

**Falsifiable promise.** "Either both legs move in one transaction or neither does. A buyer who loses KYC between match and settlement gets nothing and keeps his cash. A seller frozen mid-trade keeps his bonds. Neither side ever holds a free option."

**Demo moment (20 seconds).** Two matched trades. The issuer revokes buyer two's KYC after the match. Trade one settles (one HashScan transaction with both legs). Trade two reverts, both holds expire, and the dashboard returns to the starting balances. A side panel replays the documented hash-lock flow, with the seller walking away after payment.

**How it works.** An ATS bond and a Stablecoin Studio cash token on testnet. `DvP.sol` is about 150 lines: it checks both holds' terms, re-runs the ATS transfer-eligibility view if `executeHoldByPartition` does not, then executes both holds. An RFQ matcher; a trade log on HCS. Foundry invariants: "no settlement changes either supply", "never one leg alone".

**Go or no-go gate (hours 0 to 5).** Both studios' holds accept an escrow address that is a contract, and the escrow can execute them. Find out whether ATS's hold execution re-checks KYC at execution.

**Requirement checklist.**
- [x] Q1: both studios.
- [x] Q2: testnet.
- [x] Q3: `DvP.sol` verified on HashScan.
- [x] Q4: issuance, configuration, and holds, executions, KYC revoke and a freeze.
- [x] Extra points: T1; T2 (a trading fee as a custom fee on the cash token, if the Studio exposes it); T5 (a docs PR to the hold guide).
- [x] Fresh build.

**Why it beats rivals (Judgement).** The listed "secondary market" idea will bring several order-book UIs. This is the only one whose claim is about settlement risk, and it names the gap in Hedera's own docs.

**Closest prior winners.** Rialto (ETHOnline 2026, Hedera ATS): auction lending against bonds. NameGate (ETHOnline 2026): KYC via ENS. Pastel (Lisbon 2026, Hedera "No Solidity"): an HCS order book, cited so the team does not claim the HCS log as new.

**Stack.** Hedera only.

**Difficulty.** Medium-high.

**Scores.**

| T1 | T2 | T3 | T4 | T5 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 9 | 5 | 3 | 4 | 6 | 8 | 6 | **6.9** |

**Judge notes (Judgement).**
- Hedera judge: "Be fair to our hash-lock doc: it is atomic if the payment is also locked. Your point is that nothing locks the cash today."
- Veteran: "Two studios' role setups on day one is a lot. Spike both holds before writing the matcher."

---

### Rank 4. Coupon Clock: escrowed coupons the issuer cannot skip, fired by schedules with no admin key

**Pitch.** ATS calculates coupons, and Mass Payout pays them through a backend scheduler with PostgreSQL ([ATS README](https://github.com/hashgraph/asset-tokenization-studio)). If the issuer's backend stops, coupons stop. Coupon Clock works differently:
- the issuer escrows the coupon cash, in Stablecoin Studio, at issuance;
- each coupon date is a scheduled `ContractExecute` of a permissionless `CouponPayer.pay(couponId)`;
- each schedule is created with **no admin key**, so nobody, including the issuer, can cancel it;
- frozen or non-KYC holders' coupons stay in escrow until they are cleared.

**Falsifiable promise.** "Once issued, the issuer cannot skip, delay or redirect an escrowed coupon. The schedule has no admin key, and the escrow has no withdrawal path before maturity except paying holders."

**Demo moment (20 seconds).** Coupons every two minutes. The issuer's backend is killed on camera. The next coupon still pays on time (HashScan, three holder credits). The issuer tries `ScheduleDelete`: `SCHEDULE_IS_IMMUTABLE`. A frozen holder's coupon sits in escrow and is paid on unfreeze.

**Go or no-go gate.** Find ATS's coupon entitlement view, and the gas for batch payment to about 20 holders. Beyond 62 days, the next coupon must be rescheduled from a call (HIP-1215 style, as Rialto did; verify on testnet). Otherwise the README states the 62-day horizon.

**Requirement checklist.**
- [x] Q1 to Q4: ATS bond and Stablecoin Studio cash; the coupon is the lifecycle operation; `CouponPayer` verified on HashScan.
- [x] Extra points: T4; T2 (distributions); T1 (freeze-aware payouts).

**Why it beats rivals (Judgement).** "Tokenized bonds with on-chain coupon schedules" is a listed idea, so several teams will build one. The edge is the immutable schedule and the escrow, a promise to investors that a cron job cannot make. Novelty is still moderate.

**Closest prior winners.** Rialto (HIP-1215 scheduled close). NameGate (a custom coupon distributor because the bond "has no payout function at all").

**Stack.** Hedera only.

**Difficulty.** Medium.

**Scores.**

| T1 | T2 | T3 | T4 | T5 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 6 | 9 | 3 | 10 | 5 | 5 | 6 | **6.6** |

**Judge notes (Judgement).**
- Hedera judge: "Compare with Mass Payout honestly; it is ours."
- Veteran: "The immutable-schedule error message is the demo. Record it once it works, in case testnet is slow on Saturday morning."

---

### Rank 5. Warehouse Lien: grain receipts pledged with an ATS hold and closed by a scheduled default

**Pitch.** Electronic warehouse receipts for stored grain are issued as ATS tokens, one unit per tonne. A lender advances Stablecoin Studio cash against a receipt:
- the lien is an ATS hold with the loan contract as escrow, so the pledged receipt cannot be sold, redeemed or pledged twice;
- repayment releases the hold;
- a scheduled `ContractExecute` at maturity executes the hold to the lender on default.

**Falsifiable promise.** "A pledged receipt cannot move except to the lender on default or back to the farmer on repayment, and the default fires at maturity without anyone pressing a button."

**Demo moment (20 seconds).** The farmer tries to sell a pledged receipt: reverted. One loan is repaid and its hold released. A second loan passes maturity, the schedule fires, and the receipt lands with the lender (HashScan).

**How it works.** ATS issuance (verify which ATS asset type fits a receipt). `LoanBook.sol` is about 200 lines. The price for haircuts is a signed warehouse attestation, stated honestly; CCIP from Sepolia is a stretch only.

**Requirement checklist.**
- [x] Q1 to Q4: issuance, configuration, hold, release, execution on default.
- [x] Extra points: T1, T4, T3 (attestation).

**Why it beats rivals (Judgement).** Warehouse receipts are listed, and no Hedera winner has done them. Lending against RWAs, though, has been done (KinXP, Rialto).

**Closest prior winners.** KinXP (ETHOnline 2025, Hedera EVM), Rialto (ETHOnline 2026, Hedera ATS).

**Stack.** Hedera. Chainlink "Best use of Chainlink CCIP 2.0" only if a Sepolia to Hedera testnet lane is confirmed live and is CCIP 2.0 ([Chainlink prizes](https://ethglobal.com/events/mumbai/prizes/chainlink)).

**Difficulty.** Medium (Hedera only), high with CCIP.

**Scores.**

| T1 | T2 | T3 | T4 | T5 | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 8 | 4 | 6 | 7 | 3 | 6 | 6 | **6.4** |

**Judge notes (Judgement).**
- Hedera judge: "Use the Hold facet as the lien. Do not reinvent it in your contract."
- Veteran: "Keep India as setting only. The judges will ask who the warehouse is."

---

## 7. Track 3: "No Solidity Allowed": Build with Hedera SDKs ($2,000)

Verbatim qualifications ([Mumbai Hedera prizes](https://ethglobal.com/events/mumbai/prizes/hedera)):
- N1 "Use the Hedera JavaScript/TypeScript SDK or Python SDK, with no Solidity smart contracts."
- N2 "Use at least two native Hedera services (for example, HTS and HCS)."
- N3 "A public GitHub repo with a README covering setup and usage."
- N4 "A demo video of 5 minutes or less."

Implied disqualifier: any Solidity contract written by the team (N1). Whether calling Hedera-authored contracts counts is open (question 2).

### Final ranked table

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Slowvault: a treasury no stolen keys can drain in one block, with the delay enforced by the network | 8.1 | Revise | Hedera only |
| 2 | Freeze Desk: trace stolen HTS funds and get them frozen in under a minute, with every freeze accountable | 8.0 | New (replaces Reserve Clock) | Hedera only |
| 3 | Schedule Lens: clear signing for Hedera scheduled transactions | 7.5 | Revise | Hedera only |
| 4 | First Finder: a vulnerability disclosure ledger with provable priority | 7.4 | Keep (minor edits) | Hedera + Arkiv "Build on Arkiv" |
| 5 | Ask a Human: an ops agent that drafts every transaction and can execute none | 7.1 | Revise | Hedera + World ID Agent Pass |

Also eligible here: **Subscribe402** (Track 1, rank 1), which is SDK only. It is listed in the combination pass, not twice.

---

### Rank 1. Slowvault: a treasury no stolen keys can drain in one block, with the delay enforced by the network

**Pitch.** A team treasury on a native Hedera account with the nested key `KeyList[ threshold(2, [A, B, C]), V ]`. V is a stateless validator that co-signs only schedules that:
- have `wait_for_expiry` set;
- have an expiry at least the delay away;
- have the guardian's key as admin key.

Once V has signed, the network itself refuses to run the transfer before expiry. During the delay, the guardian reads a plain-language decode on an HCS topic and can `ScheduleDelete` it. Key rotation (`CryptoUpdate`) goes through the same brake, so an attacker cannot swap the keys first.

**Falsifiable promise.** "With two of three signer keys stolen, no funds leave before the delay ends, and the guardian kills the transfer with one signature. With V's key stolen, nothing moves at all. Only both together bypass the brake, and the README says so."

**Demo moment (20 seconds).** The attacker signs a 9,000 HBAR transfer with two stolen keys and asks V to co-sign a schedule with no admin key: refused. He tries a direct transfer: `INVALID_SIGNATURE`. He schedules a valid one: a phone alert reads "9,000 HBAR to 0.0.x, an account created 4 minutes ago, executes in 10:00". The guardian deletes it. A legitimate USDC payroll schedule executes on time.

**How it works.**
- `@hashgraph/sdk`; V runs as a small service.
- **V's rules.**
  - It fetches the schedule by ID with `ScheduleInfoQuery`, never from the requester's bytes.
  - The inner body must be a `CryptoTransfer` or `CryptoUpdate`.
  - `wait_for_expiry` must be true, and expiry minus now must be at least the delay.
  - The admin key must equal the guardian key.
  - The payer must be the treasury.
- **Watcher.** Polls the Mirror Node `/api/v1/schedules`, posts decodes to HCS, and enriches each recipient with account age and history.
- **Guardian console.** React; deletes through the guardian's wallet.

**Go or no-go gate (hours 0 to 2).** A nested KeyList account, a schedule signed by 2 of 3 plus V, executed at expiry; and a `ScheduleDelete` by the admin key while it waits.

**Requirement checklist.**
- [x] N1: TypeScript SDK only, no Solidity.
- [x] N2: Scheduled Transactions, accounts with nested keys, HCS, HTS (USDC payroll) and the Mirror Node.
- [x] N3: README with setup and usage.
- [x] N4: the video.
- [x] Extra points: Ne (the product is the security approach); Nb; Na; Nc (decoded alerts as an HCS audit trail).
- [x] Fresh build.

**Why it beats rivals (Judgement).** The obvious "No Solidity" entries are notaries and trackers. This one shows a Safe plus a timelock plus a guardian module with zero contracts, and its central trick is unusual: the delay is enforced by `wait_for_expiry`, not by a server. The WazirX multisig loss (about $230M, July 2024) makes the pitch concrete (`track_ideas/00_season.md`).

**Closest prior winners.** Dead Men Tell Tales (New York 2026, Hedera "No Solidity"): schedule-driven release. Ognef (Lisbon 2026): default-deny mandates. Neither used a delay with a veto.

**Stack.** Hedera only. It shares its brake library with Issuer Brake (section 8).

**Difficulty.** Low-medium.

**Scores.**

| Na | Nb | Nc | Nd | Ne | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 7 | 8 | 6 | 3 | 10 | 8 | 8 | **8.1** |

**Judge notes (Judgement).**
- Hedera judge: "Nested keys plus wait-for-expiry is the cleanest use of native services we could ask for. Show the key structure on HashScan."
- Veteran: "The fixed draft had a hole any judge would find. Now the README must explain why the threshold key alone cannot sign directly. Put the key diagram first."

---

### Rank 2. Freeze Desk: trace stolen HTS funds and get them frozen in under a minute, with every freeze accountable

**Pitch.** USDC on Hedera has a freeze key (section 2, item 9), so stolen USDC on Hedera can in principle be frozen. In real incidents, coordination with issuers takes hours. Freeze Desk:
- traces stolen HTS tokens hop by hop from the Mirror Node in real time;
- posts evidence-backed freeze requests to an HCS incident topic;
- lets an issuer's responder service, holding the freeze key as a 2-of-3 threshold key, verify the evidence and freeze;
- logs every freeze and every unfreeze request publicly, so freezes are accountable too.

**Falsifiable promise.** "From the theft transaction to a frozen attacker account takes under 60 seconds on testnet. Every freeze cites the transaction IDs that justify it, and anyone can recheck them on the Mirror Node. No single insider can freeze an account, because the freeze key is 2 of 3."

**Demo moment (20 seconds).** An "exchange" hot wallet holding a demo token with USDC's key layout is drained. A graph grows as the attacker hops through three accounts. A freeze request appears on HCS, two responders approve, and the attacker's next transfer fails with `ACCOUNT_FROZEN_FOR_TOKEN`. A timer reads 41 seconds, or whatever it measures. An innocent recipient files an unfreeze request with a reason, also on HCS.

**How it works.**
- **Tracer.** Mirror Node `/api/v1/transactions` by account and token, polled every 2 seconds.
- **Request format.** Signed JSON on HCS.
- **Responders.** Verify against the Mirror Node, then build a `TokenFreezeTransaction` signed 2 of 3.
- **Real data.** A count of how many mainnet fungible tokens carry a freeze key (a population number, as in KeyCheck).
- **Not scheduled.** Freezes and unfreezes are not on the default schedule whitelist (section 2, item 7), so the README says so.

**Requirement checklist.**
- [x] N1: SDK only.
- [x] N2: HTS (freeze key, threshold key), HCS (incident channel), Mirror Node and accounts.
- [x] N3 and N4 as standard.
- [x] Extra points: Nb (tracing); Ne (threshold freeze key, authenticated requesters); Nc (an incident channel with evidence).
- [x] Ethics: only the team's own demo token is frozen; the population scan reports facts only.

**Why it beats rivals (Judgement).** Incident response is the season's top story, and Freeze Desk is the first entry to use HTS freeze keys for it. It shows a measured number, and it builds safeguards against misuse into the design.

**Closest prior winners.** None on Hedera. AlphaDawg's "Hedera = truth" framing and ZoneProof's HCS log are the nearest uses of HCS as an evidence channel ([H] H4).

**Stack.** Hedera only.

**Difficulty.** Medium (the graph tracing).

**Scores.**

| Na | Nb | Nc | Nd | Ne | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 7 | 9 | 8 | 4 | 9 | 8 | 7 | **8.0** |

**Judge notes (Judgement).**
- Hedera judge: "Freeze keys are controversial. The accountability log is what makes us comfortable putting our name on it."
- Veteran: "Do not imply Circle uses this. Say 'any issuer holding a freeze key could'."

---

### Rank 3. Schedule Lens: clear signing for Hedera scheduled transactions

**Pitch.** A schedule waiting for your signature can hide a `CryptoUpdate` that replaces your account key, a `CryptoApproveAllowance` to an unknown spender, or a `ContractCall` to an unverified contract. All three are on the default schedule whitelist. Schedule Lens is an Agent Kit plugin and a small web signer. It decodes any pending schedule through `ScheduleInfoQuery`, explains it in plain language, flags dangerous bodies, and refuses them by policy before `ScheduleSign`.

**Falsifiable promise.** "A scheduled key replacement disguised as 'Payroll October' is shown as 'This replaces your account key' and refused. The same schedule signed blind hands over the account, as the side-by-side wallet shows on HashScan."

**Demo moment (20 seconds).** A phishing link asks the user to co-sign "Payroll October". Lens shows the key replacement in red, and the agent refuses. In the blind wallet beside it, signing changes the account key on HashScan.

**How it works.** SDK decoding of `ScheduleInfo.scheduledTransaction`; Mirror Node enrichment (account age, contract verification); a guarded `sign_schedule` tool on top of Agent Kit v4.2.0; a signed decode posted to HCS.

**Requirement checklist.**
- [x] N1: SDK and Agent Kit only.
- [x] N2: Scheduled Transactions, accounts, Mirror Node, HCS.
- [x] N3 and N4 as standard.
- [x] Extra points: Ne, Nd, Nb.
- [ ] Prior art check on day one: HashPack's current view of schedules.

**Why it beats rivals (Judgement).** It brings clear signing to Hedera's own multi-signature primitive, and it works as Slowvault's guardian view.

**Closest prior winners.** Hedera Agent Trust (ETHOnline 2025, an Agent Kit plug-in).

**Stack.** Hedera only.

**Difficulty.** Medium-low.

**Scores.**

| Na | Nb | Nc | Nd | Ne | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 7 | 8 | 5 | 8 | 9 | 7 | 7 | **7.5** |

**Judge notes (Judgement).**
- Hedera judge: "Publish it as a plugin, and we will point wallet teams at it."
- Veteran: "If HashPack already decodes schedules well, your lead becomes the refusal policy, not the decode."

---

### Rank 4. First Finder: a vulnerability disclosure ledger with provable priority

**Pitch.** Researchers commit `H(report || salt || researcherAccount)` to an HCS topic, so the consensus timestamp fixes priority. Triage keys co-sign a scheduled bounty payout in HTS USDC (2 of 3). The reveal follows the embargo. A public board of open embargoes lives in Arkiv entities that expire at the end of each embargo.

**Falsifiable promise.** "Whoever committed first is provably first, by consensus time, even if a second researcher reveals the same bug earlier. A copied commit cannot be claimed, because the commit binds the account. The bounty executes only when 2 of 3 triage keys sign."

**Demo moment (20 seconds).** Two researchers submit the same bug, and B reveals first in chat. The HCS timestamps show A committed 41 seconds earlier. The schedule pays A, and the Arkiv board flips the embargo to "disclosed".

**Requirement checklist.**
- [x] N1 to N4: SDK only; HCS, Scheduled Transactions with threshold keys, HTS and Mirror Node.
- [x] Extra points: Nc, Ne, Nb.
- [x] Arkiv's `/arkiv/*.md` files if Arkiv is selected.

**Why it beats rivals (Judgement).** It is a notary with adversaries and a payout, not plain timestamping. The genre is close to ProvenanceChain, which caps its novelty.

**Closest prior winners.** ProvenanceChain (Cannes 2026, Hedera "No Solidity").

**Stack.** Hedera + Arkiv "Build on Arkiv (from scratch)".

**Difficulty.** Low-medium.

**Scores.**

| Na | Nb | Nc | Nd | Ne | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 6 | 7 | 9 | 2 | 8 | 6 | 8 | **7.4** |

**Judge notes (Judgement).**
- Hedera judge: "Good use of consensus time. Tell us who would run the topic: a bounty platform, a protocol?"
- Veteran: "Salt the commit, or a short report can be brute-forced from its hash."

---

### Rank 5. Ask a Human: an ops agent that drafts every transaction and can execute none

**Pitch.** A Hedera Agent Kit agent in `RETURN_BYTES` mode runs a small company's treasury chores (payroll, vendor payments, top-ups) by drafting schedules only. Its key is not on the treasury at all. A human officer co-signs after a fresh World ID Agent Pass check. The approval record on HCS binds the schedule ID to the validated result. Unsigned drafts die at expiry.

**Falsifiable promise.** "Nothing the agent drafts can execute without a verified human signature. A poisoned-email draft dies at expiry, and the Mirror Node shows no transfer."

**Demo moment (20 seconds).** A three-line payroll is approved on a phone and executes (HashScan). A draft of "send everything to vendor X" from a poisoned email is denied, and at expiry the schedule shows expired with no transfer.

**Requirement checklist.**
- [x] N1 to N4: SDK and Agent Kit; Scheduled Transactions, HTS, HCS, Mirror Node.
- [x] Extra points: Nd, Ne, Na.
- [x] World ID Agent Pass: deny path, backend validation, debrief.

**Why it beats rivals (Judgement).** Structural authority (no key at all) beats a policy prompt. But human-in-the-loop agents are crowded, so this ranks last.

**Closest prior winners.** YourTurn Concierge (New York 2026, Continuity): a bounded agent with human approval.

**Stack.** Hedera + World ID Agent Pass. Do not combine with Leash, which uses the World slot for the same story.

**Difficulty.** Low-medium.

**Scores.**

| Na | Nb | Nc | Nd | Ne | Nov | Fea | Overall |
|---|---|---|---|---|---|---|---|
| 7 | 6 | 6 | 9 | 8 | 5 | 8 | **7.1** |

**Judge notes (Judgement).**
- Hedera judge: "RETURN_BYTES is exactly what that mode is for."
- Veteran: "Everyone at the World booth will have an approve-or-deny agent. Lead with 'the agent has no key'."

---

## 8. Track combination pass (Judgement)

Rules (sourced: [event page FAQ](https://ethglobal.com/events/mumbai); [details page](https://ethglobal.com/events/mumbai/info/details)):
- at most 3 partner prizes per project;
- a partner with several tracks counts as 1, so all three Hedera tracks use one slot;
- the EF places a project in at most one EF prize;
- the ETHGlobal finalist track is separate and does not count;
- Arkiv pays one Arkiv track per team ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)).

Each team submits one project, so a "combo" means one product judged in several tracks.

| Build | Hedera tracks it can be judged in | Other partner picks | Extra submission work | Finalist fit |
|---|---|---|---|---|
| Subscribe402 | x402 + No Solidity (SDK only) | none needed | spec note on #1133 | Medium-strong: an on-chain clock and a refusal |
| Issuer Brake | Tokenize (+ No Solidity if Hedera-authored contracts do not count, question 2) | World Agent Pass (optional) | ATS docs PR; World debrief | Strong: a stolen-key attack stopped live |
| Issuer Brake + Slowvault in one product ("Brake": issuer powers and treasury on one clock) | Tokenize + No Solidity (question 2 decides) | World Agent Pass (optional) | one validator, two policies | Strong, if the story stays one sentence |
| Leash | x402 only (it uses Solidity) | World Agent Pass | executor verified on HashScan; World debrief | Strong if the facilitator-replay demo works |
| KeyCheck | x402 | Arkiv "Build on Arkiv" | `/arkiv/*.md` files; npm plugin | Medium |
| KeyCheck + Strict402 (verdicts as the facilitator's admission check) | x402 | Arkiv (optional) | case table | Medium |
| Settle or Nothing + a paid NAV or trade-data endpoint | Tokenize + x402 (the Tokenize track lists "An x402 service that sells data about tokenized assets") | none | x402 tx ID in README | Medium; the x402 part risks reading as bolted on |
| Freeze Desk | No Solidity | none | population scan | Medium-strong (a measured time-to-freeze) |
| First Finder | No Solidity | Arkiv "Build on Arkiv" | `/arkiv/*.md` files | Medium |
| Ask a Human | No Solidity | World Agent Pass | World debrief | Medium-low |

**Best combinations (Judgement).**
1. **Brake (Issuer Brake plus Slowvault)**: up to two Hedera tracks ($2,500 1st plus $1,000), one validator codebase, and the team's security story. Add World Agent Pass as a second partner only if the officer check is load-bearing.
2. **Subscribe402**: x402 ($3,000 1st) plus No Solidity ($1,000) with no Solidity written, the cleanest dual-track entry.
3. **Leash + World Agent Pass**: the highest ceiling in the biggest Hedera pool plus a $5,000 partner, but it carries the PR #4030 dependency.

**Combos to avoid (Judgement).**
- **Hedera + any EF prize.** EF prizes run on Ethereum networks; Hedera is not one. It also cannot pair with plans A to E, which mark Hedera "Skip".
- **Hedera + Whitechain or Arc.** Two settlement chains split the story, and Arc requires Arc Studio as the starting point (`track_ideas/00_current_tracks.md`).
- **Leash + Ask a Human.** Both spend the World slot on agent approval.
- **Subscribe402 with an added contract.** Any Solidity costs it Track 3.
- **Warehouse Lien + Chainlink CCIP** without a confirmed live lane.
- **0G "Agents That Pay for Themselves"** with any Hedera payment idea: its loop must reach 0G Compute, so Hedera would be a side rail.

Workshop logistics (sourced, [event page](https://ethglobal.com/events/mumbai)): Hedera runs Thu 5 Nov 15:30 to 15:50 IST in Workshop Room 2 ("Hedera X Claude Code - AI Skills for Hackathon Builders", Pathorn Teng). It clashes with 0G (15:30, Room 1). World is at 17:30 (Room 1) and Arkiv at 16:00 (Room 2), so neither clashes with Hedera.

---

## 9. Hedera's top 3 ideas overall (Judgement)

1. **Issuer Brake (8.0, Tokenize).**
   - The most original entry for the tokenize judges, and the one most likely to place 1st ($2,500): it treats issuer key risk, which institutions care about, with native schedules and nested keys and no new contract.
   - It can carry Slowvault in the same product for a second Hedera track.
   - Its risk is one testable gate (the scheduled ContractExecute sender) inside the first four hours.
2. **Subscribe402 (7.5, x402).**
   - The best entry in the biggest pool: it fills the unclaimed subscription extra point.
   - It beats the open EVM subscribe proposal on Hedera's own terms, and it qualifies for "No Solidity" too.
   - It is low risk and pure SDK work, so the team's audit time goes into the adversarial demo and the README.
3. **Slowvault (8.1, No Solidity).**
   - The highest score in any Hedera track, and the cheapest strong build.
   - Its fixed design (a stateless validator plus `wait_for_expiry`) is the clearest example of "the network does the heavy lifting".
   - It ranks third only because its pool is $1,000; built inside Issuer Brake, it costs a few hours.

Highest ceiling, highest risk: **Leash** (7.3). Build it instead of Subscribe402 only if PR #4030 settles on testnet by Friday 03:00 IST.

---

## 10. Questions for the Hedera workshop and booth

Workshop: Thu 5 Nov 15:30 to 15:50 IST, Workshop Room 2 ([event page](https://ethglobal.com/events/mumbai)). Ask in the Hedera Discord ([discord](https://hedera.com/discord)) now and at the booth before hacking starts at 21:00 IST. Most decisive first.

1. **Facilitators for R1.** The prize text names "Official x402, Ax402, or Blocky402", but the docs list Official x402, Launa and Blocky402. Which counts? Does a self-run facilitator built from the open `transferExecutor` PR #4030 count fully? Will Blocky402 support `transferExecutor` during the event? (Decides Leash versus Subscribe402.)
2. **What "No Solidity" means.** Does a project that calls Hedera-authored contracts it did not write (ATS, Stablecoin Studio, HTS system contracts) through `ContractExecuteTransaction` violate "with no Solidity smart contracts"? (Decides whether Issuer Brake can also enter Track 3.)
3. **Several Hedera tracks.** Can one project be judged and place in two Hedera tracks at once (for example x402 and No Solidity), or does it win at most one Hedera prize?
4. **What "finds the endpoint" means in R2.** Is a hard-coded URL enough, or do judges expect discovery (x402 Bazaar, an HCS-10 or HCS-11 profile, ERC-8004, a `.well-known` listing)?
5. **Subscriptions.** If period 1 settles through a listed facilitator and later periods are scheduled transfers the agent signed in advance, do judges count it as "Recurring or subscription-style payments through Scheduled Transactions" and as x402? Would Hedera welcome a Hedera subscribe binding on PR #1133?
6. **The schedule whitelist on testnet.** Is it the code default (CryptoTransfer, CryptoUpdate, ContractCall, ConsensusSubmitMessage, CryptoApproveAllowance; no TokenFreeze, Unfreeze or Wipe)? How precise is `wait_for_expiry` execution on testnet today? For a scheduled `ContractExecute`, is `msg.sender` the schedule's payer account? (Decides Issuer Brake, Slowvault, Coupon Clock and Subscribe402.)
7. **ATS setup.** Are resolver `0.0.9212226` and factory `0.0.9213391` the current testnet deployment for ATS v8? Can a role be granted to a threshold-key account's long-zero address? Does `executeHoldByPartition` re-run KYC and control-list checks at execution? Can both studios' holds use a contract as escrow? (Decides Issuer Brake and Settle or Nothing.)
8. **"Contributions back".** Does an opened but unmerged PR count, and do tests or docs count as much as code? (Decides ATS Proof Pack and the docs PRs.)
9. **Disclosure and testing.** If we find a bug in ATS, Stablecoin Studio or the x402 Hedera mechanism, what is the private disclosure channel, and does a submission that reports only "found and disclosed" count as complete? May we run attack cases against the hosted testnet facilitators?
10. **Faucets and tokens.** What are the testnet HBAR limits per account and per day? Is USDC `0.0.429274` the token to use for x402 on testnet, and where do teams get testnet USDC? Are there event credits for Launa mainnet or the hosted Network MCP?
11. **What judges want in the README.** Do Mumbai judges score with the `hackathon-helper` validate-submission rubric (Validation and Success at 35%)? Do they want a Lean Canvas and projected accounts and TPS, and is mainnet settlement scored above testnet?
12. **Central or cosmetic.** Is an HCS audit log still credited as "creative use of HCS", or now treated as default? Does Agent Kit `RETURN_BYTES` with a human co-signer count as "human-in-the-loop approval above a set amount"?
13. **Identity.** For extra point X2, do judges prefer HCS-14 or ERC-8004 on Hedera, and is there a deployed ERC-8004 registry on testnet?
14. **Agent Accounts.** Is there a partner testnet for the Agent Accounts announced 13 Oct that hackers can use, and would a `transferExecutor` policy contract be welcomed as their open preview, or seen as competing?

---

## 11. Gaps and caveats

- Mumbai's Hedera judges are not named; "what judges reward" is inferred from past winners and Hedera's published rubric ([H] H10).
- Not verified from here: the testnet schedule whitelist (only the code default was read), the sender of a scheduled `ContractExecute`, ATS role names and hold re-checks in v8, the current state of `hashgraph/hedera-forking`, HIP-540 key-addition rules, HashPack's schedule view, and any live CCIP lane to Hedera testnet. Each idea names its gate.
- The PR #4030 branch may change before the event, and PR #3061 may merge, which would remove Strict402's headline case.
- The novelty claims rest on the dossier's winner list and on a search of the x402 repo's PRs. I did not search every hackathon outside ETHGlobal.
- ETHGlobal pages were not re-fetched; the verbatim track text is the 2026-10-31 snapshot in `track_ideas/00_current_tracks.md`.
