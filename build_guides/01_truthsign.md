# 01 Truthsign: build guide

Rank 1 of 10 (judge average 8.00, P(demo) 70%). Source design: `track_ideas/finalist_ideas.md` section 3.1, `track_ideas/ideas/ef.md` C1, `track_ideas/ideas/arkiv.md` M1 and S4, `track_ideas/finalist_judges/feasibility.md` candidate 1. Read `00_common.md` first: roles, skeleton, scaffold, UI standards and the no-code rule apply here.

## 1. Summary, promise, prize stack

**Summary.** A library a wallet calls before it clear-signs. It runs the transaction on a fork, extracts what actually happens (token transfers, approvals, native value), and compares that with every field the ERC-7730 descriptor would put on screen. If a field disagrees with the effect, or the transaction moves value the screen never mentions, the wallet refuses to clear-sign and falls back to raw calldata with a red reason. A registry-wide sweep publishes how many public descriptor fields disagree with their contracts (including zero), each with a replay command. Descriptors and verdicts are mirrored on Arkiv so the check works with GitHub and our server switched off.

**Falsifiable promise.** "For any transaction a wallet is about to clear-sign, Truthsign refuses clear signing if any displayed field disagrees with the fork effect, or if the transaction moves value or grants an approval the screen never mentions. Across the public registry we publish how many descriptor fields disagree with their contracts, including zero, each with a one-line replay command."

**Prize stack (two partner picks).**

| Prize | Verbatim requirement (Facts) | How this build meets it |
|---|---|---|
| EF "Best CROPS App" ($2,000 / $1,000 / $500) | "Build an app, wallet feature or dev tool where one CROPS property is the reason it exists, without giving up the other three"; FOSS licence and runnable README; "a README section titled CROPS" with C, O, P, S lines; "A demo video (3 minutes max) that shows the lead property working end to end, including the moment it matters"; "No third-party trackers or analytics in the client. If the project handles keys or personal data, they stay on the user's device, or the README says why not."; one EF prize per project ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) | Lead property S, structural: the refusal sits in the signing path. MIT. CROPS section drafted in section 11. Video 2:00 to 2:59 with the refusal at 0:20. No analytics; no keys leave the device |
| Arkiv "Mirror something Ethereum depends on" ($3,000 / $1,000) | MR2 "The data's license allows republishing. Link it in your README."; MR3 not Sourcify data; MR4 "Your import script is in the repo, and we can re-run it."; MR5 writes to Arkiv's current testnet and "a feature or query people use reads the data from Arkiv"; MR6 wallet addresses and one query in the README; MR7 and MR8 `/arkiv/schema.md`, `friction.md`, `reach.md`, `why-arkiv.md`, `data-quality.md` ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv), via `ideas/arkiv.md` section 3) | Registry is CC0-1.0 ([registry](https://github.com/ethereum/clear-signing-erc7730-registry)). Importer in repo, idempotent by content hash. The wallet reads descriptors and verdicts from Arkiv. Two writer wallets (importer, checker) with different lifetimes |
| Arkiv + Swarm bonus ($500, on top) | SR2 `/arkiv/swarm.md` with entity field holding the Swarm reference, one entity key and reference, postage batch ID and buyer, upload and read files, steps, video moment, friction; SR3 never store an encrypted reference as is ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)) | UI build and registry snapshot per import commit on Swarm, public unencrypted references, held in a `release` entity |

Judgement: the optional Chainlink CRE slot is dropped (feasibility judge: a single $1,500 prize costs the hours the video needs). The EF may move the entry to Anon-RPC; that is fine.

## 2. Architecture

```
  Registry (GitHub, CC0)                         Mainnet fork (anvil, saved state)
        |                                                   ^
        | import at commit SHA                              | impersonate signer, send tx,
        v                                                   | read receipt + call trace, revert
  [importer] --writes--> Arkiv Rabdi <--reads-- [truthsign core] <--- tx + descriptor --- [demo wallet]
                          ^   entities:                  |                                   ^
  [checker]  --writes-----+   descriptor, binding,       | verdict (PASS / REFUSE / NOT VERIFIED)
   (drift + verdicts)         drift_check, verdict        v                                   |
                                                    [renderer subset] -- screen fields ------+
  [sweep runner] -- every descriptor x K fuzzed calls --> verdict table + replay commands
                                                                   |
                                                    static dashboard (Vite) + Swarm copy
  User-side reads (token metadata, names) -> Anon-RPC worker.fetch (tor-js or Nym)
```

- **Renderer subset** (TypeScript): turns (descriptor, calldata, tx container) into the list of screen fields a wallet would show: label, raw value, formatted value, the calldata path it came from. Supported formats: `tokenAmount`, `amount`, `addressName`, `raw`, `date`, `enum` (verify the exact format names in the ERC-7730 spec on day one). Anything else renders as "not verified", never green.
- **Effect extractor** (TypeScript against Anvil): runs the transaction from the signer on a fork snapshot and returns every value movement: ERC-20 `Transfer` and `Approval`, ERC-721 and ERC-1155 transfers and `ApprovalForAll`, Permit2 allowance events, native ETH movements from the call trace, and token balance deltas of the signer.
- **Checker**: applies per-format rules that relate each screen field to the effects (section 5), then a completeness rule (every outflow or approval from the signer must be covered by some field).
- **Fuzzer and sweep**: for every calldata descriptor on chain 1, decode the ABI, generate K random but valid calls per function, fund the signer on the fork, run the checker, record disagreements with the seed.
- **Demo wallet**: an EIP-1193 provider wrapper in the browser that intercepts `eth_sendTransaction`, asks the core for a verdict, and shows either the clear-sign screen or the refusal.
- **Arkiv layer**: importer and checker write entities on Rabdi; the wallet reads descriptors and verdicts from Arkiv by (chainId, address, selector).

**Trust assumptions (state them in the README).** The fork's state source (any RPC, or the user's own node). The descriptor's ABI matches the deployed contract (the checker's selector scan flags when it does not). Arkiv entities are trusted only by `$creator` (importer wallet for descriptors, checker wallet for verdicts), never by a writable field ([define a schema](https://docs.arkiv.network/schemas/define/), via `ideas/arkiv.md`).

## 3. Repo layout and scaffold

```
truthsign/
  contracts/            Foundry: fork fixtures and the planted-attack test only
  packages/core/        renderer subset, effect extractor, checker
  packages/sweep/       fuzzer, registry walker, sweep runner, replay CLI
  packages/arkiv/       importer, checker writer, reader (getDescriptor)
  app/                  demo dApp, tampered frontend, demo wallet, sweep dashboard
  fixtures/             fork states, sweep output with block number, registry commit SHA
  arkiv/                schema.md, friction.md, reach.md, why-arkiv.md, data-quality.md, swarm.md
```

At 21:00: the common scaffold from `00_common.md` section 3, then `npm init -w packages/core -w packages/sweep -w packages/arkiv`, `git submodule add https://github.com/ethereum/clear-signing-erc7730-registry fixtures/registry` pinned to a commit, and `pipx install erc7730` for Ledger's validator (package name on PyPI (verify); repo [python-erc7730](https://github.com/LedgerHQ/python-erc7730), Apache-2.0).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| ERC-7730 registry | `ethereum/clear-signing-erc7730-registry`, CC0-1.0, last push 2026-10-31, about 931 files | Fact (`ideas/arkiv.md` section 2) |
| Demo descriptor | Uniswap `UniswapV3SwapRouter` calldata descriptor in `registry/uniswap` (flat `exactInputSingle` fields); no Universal Router file seen | Fact (`finalist_judges/feasibility.md` candidate 1; listing may be truncated) |
| Validator | Ledger `python-erc7730`, "ERC-7730 descriptors validation and utilities" | Fact (same) |
| Fork | Anvil from Foundry, mainnet archive RPC for the snapshot block | (verify archive access) |
| Arkiv | `@arkiv-network/sdk` 1.0.0 (pin it; `next` is 0.9.0-next.5); Rabdi RPC `https://rpc.rabdi.db-chain.testnet.arkiv.network`, WSS `wss://rpc.rabdi.db-chain.testnet.arkiv.network`; rate limit header `limit=2000` per 10 s | Fact (npm 2026-10-31; `ideas/arkiv.md` section 2) |
| Arkiv entity model | typed attributes plus `bytes`, no free payload; `bytes` "stored but never indexed" | Fact ([arkiv-transaction-decoder](https://github.com/Arkiv-Network/arkiv-transaction-decoder)); confirm 1.0 vs 0.9 at the workshop |
| Anon-RPC | `@anon-rpc/browser-harness` 0.4.0; `new AnonRpcWorker({ address, config })`, then pass `worker.fetch` to viem `http(url, { fetchFn })`; tor-js specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e` on mainnet; demo gateway "may disappear at any time"; Nym needs no config | Fact (`research_notes/EF tracks and Whitechain ideas/anon_rpc.md`; npm 2026-10-31) |
| Swarm | a Bee node or gateway and a postage stamp batch | Unknown: Arkiv workshop question 6 |
| Libraries | `viem` 2.57.13, React, Tailwind 4, shadcn/ui | Fact (npm) |

## 5. Components in plain English (write the code after 21:00)

**Renderer subset.** Input: descriptor JSON, the transaction (`to`, `data`, `value`, `from`, `chainId`). Steps: find the descriptor's deployment entry matching `chainId` and `to`; find the format whose function signature matches the 4-byte selector; ABI-decode the calldata; for each field resolve its path (calldata paths and container paths such as the sender, value and target (verify the `@.` container path syntax in the spec)); format the value; output an ordered list of screen fields, each with its source path. Fields with a format outside the subset are emitted with status "not verified".

**Effect extractor.** Input: transaction and a fork. Steps: take an `evm_snapshot`; `anvil_impersonateAccount(from)`; fund the signer where the sweep needs it (native balance with `anvil_setBalance`; ERC-20 balance by writing the balance slot found by probing `balanceOf`); send the transaction; read the receipt logs and decode transfers and approvals for ERC-20, ERC-721, ERC-1155 and Permit2; read native movements from `debug_traceTransaction` with the call tracer (verify Anvil's tracer support; fallback: native balance diff of every address in the logs plus `to`); compute the signer's net delta per token; `evm_revert`. Output: a list of effects (kind, token, from, to, amount) plus success or revert.

**Checker rules (per format).**
1. A `tokenAmount` field that the descriptor presents as what the user sends must equal an outflow of that token from the signer (or the value of an approval to the target, for approve-style functions).
2. An `addressName` field labelled as recipient or beneficiary must equal the final receiver of the output token's inflow (the last transfer of the output token that leaves the pool or router).
3. An `addressName` field labelled as spender or operator must equal the spender in the emitted approval.
4. An `amount` field on native value must equal the transaction value and the native outflow from the signer.
5. A `date` field labelled as deadline must be the value the contract enforced (fuzz a past deadline and expect a revert).
6. **Completeness:** every signer outflow, every approval granted by the signer and every `ApprovalForAll` must be covered by at least one field; anything left over is "effect not displayed".
7. A field whose label and role cannot be classified is "not verified", never "pass".

Classifying a field's role from its label is the soft spot; keep a small table (recipient, beneficiary, to, receiver, spender, operator, amount, deadline) and list unclassified labels in the sweep output so judges see the denominator.

**Fuzzer and sweep.** For each calldata descriptor with a chain 1 deployment: decode the ABI (from the descriptor's context or a verified ABI); for each function, generate K calls (start K = 8) with fuzzed arguments drawn from realistic pools (real token addresses from the descriptor's own constants, the signer and two fixed third-party addresses as recipients, amounts as powers of ten); run extractor and checker; keep the seed. A disagreement is reported only if it reproduces on replay from the seed. Output: one JSON row per (descriptor, function, field, verdict, seed, block) plus a replay command (`truthsign replay <rowId>`), committed with the fork block number.

**Demo wallet.** An injected EIP-1193 provider that wraps a real signer. On `eth_sendTransaction`: fetch the descriptor (from Arkiv first, from the frontend's copy second), run the check against the saved fork, then show the clear-sign screen or the refusal card. The refusal offers "show raw calldata" and never offers "sign anyway" in one click.

**Planted attack (the real attack shape).** A copy of a swap frontend whose JavaScript was modified to serve a malicious descriptor for the real Uniswap V3 SwapRouter: the "Beneficiary" field points at the sender container value (so it shows the user's own name, alice.eth) while the calldata `recipient` is 0xA77... (verify that the spec's container paths allow this; if not, use a descriptor that labels `tokenIn` as the beneficiary). This is the Bybit shape: the attacker controls what the frontend serves, not the contract ([SlowMist](https://slowmist.medium.com/bybits-1-5-billion-theft-unveiled-safe-wallet-front-end-code-tampered-84b78f0fa9c2)).

**Arkiv layer** (schema from `ideas/arkiv.md` M1, typed attributes):

| Entity | Attributes | Creator | Lifetime |
|---|---|---|---|
| `descriptor` | chainId u64, address addr, owner str, commit str, contentHash str, json bytes (gzipped) | importer wallet | 365 days, extended while the file is at HEAD |
| `binding` | chainId u64, address addr, selector str, descriptorKey key | importer wallet | as its descriptor |
| `drift_check` | bindingKey key, implementation addr, codehash str, selectorPresent bool, checkedAtBlock u64 | checker wallet | 7 days (expiry means "unchecked") |
| `verdict` | bindingKey key, field str, result str, seed str, forkBlock u64, replay str | checker wallet | 30 days minimum (judges may look after Saturday) |
| `release` | uiRef str, snapshotRef str, commit str | release wallet | 365 days |

Query a judge can run: `chainId = u64(1) AND selector = str('0x...')` (syntax per the [query language page](https://docs.arkiv.network/reference/query-language/), confirm on day one). The selector check is a scan for `PUSH4 <selector>` in the runtime code: reliable for Solidity, "not checked" for Vyper.

## 6. Milestones in dependency order

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Fork snapshot at a fixed block with a funded signer (alice) holding USDC | `anvil --load-state fixtures/main.json` then `cast balance` and `cast call USDC balanceOf(alice)` return the funded amounts | A |
| M2 | Effect extractor | an `exactInputSingle` swap from alice returns exactly: USDC alice to pool, WETH pool to recipient; same output twice from the snapshot | A |
| M3 | Renderer subset on three Trezor-launch descriptors (Uniswap V3 SwapRouter plus two of Aave, Lido, 1inch) | the screen-field list matches what the descriptor would show, checked by hand against the JSON; `erc7730 lint` passes on the inputs | B |
| **Gate 1, Fri 01:00** | M1 to M3 done | three descriptors rendered and their effects extracted on the fork | A, B |
| M4 | Checker rules 1 to 7 | the honest V3 swap passes; the tampered descriptor fails rule 2 with "beneficiary shows alice.eth, money went to 0xA77"; a bundled unlimited `approve` fails rule 6 | A |
| M5 | Arkiv write and read on Rabdi | importer writes 3 descriptors and bindings; a query by selector returns them filtered by `$creator` | B (gate by Fri 01:00 too) |
| M6 | Demo wallet and two frontends (honest, tampered) | clicking Swap on the tampered page shows the refusal card; the honest page shows the green clear-sign screen | C |
| M7 | Fuzzer on one descriptor | 8 seeds per function run in under a minute; each row replays identically | A |
| **Spine, Fri 09:00** | M4, M6 work from the CLI and UI | the demo moment (0:20 beat) runs end to end | all |
| M8 | Sweep over every chain 1 calldata descriptor | a JSON table with counts: descriptors, functions, fields, PASS, REFUSE (wrong field), REFUSE (not displayed), NOT VERIFIED; committed with block number | A (starts the long run before sleeping) |
| M9 | Full importer for the registry and the checker writer | all descriptors on Arkiv; verdict entities for every sweep row; `data-quality.md` numbers filled | B |
| M10 | Anon-RPC for user-side reads | the wallet's token metadata and name reads go through `worker.fetch`; a network panel shows no direct RPC host | B |
| M11 | Sweep dashboard | header counts, filterable table, row page with replay command | C |
| **Demo path, Fri 18:00** | every beat of section 10 from the UI | timed run under 4:00 | all |
| M12 | Swarm: UI build and registry snapshot uploaded; `release` entity points at both | open the Bee gateway URL and the UI loads and queries Arkiv | B (only if stamps were obtained) |
| M13 | Disclosure of any live finding to the registry maintainers | message sent before the video names any count | A |
| M14 | README, CROPS, `/arkiv/*.md`, video | section 7 of `00_common.md` checklist all ticked | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A (contracts, fork, checker) | B (renderer, Arkiv, Anon-RPC) | C (product, UI, video) |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold, fork RPC, choose snapshot block | Registry submodule pinned; `erc7730 lint` running | Design system, screen list, wallet frame on fixtures |
| 22:00 to 01:00 | M1, M2 | M3 | Clear-sign screen and refusal card on hard-coded fixtures |
| **Fri 01:00** | **Gate 1**: three descriptors rendered and extracted, or pivot (section 12) | **Arkiv gate**: one write and one read on Rabdi | Review both gates; cut list agreed |
| 01:00 to 07:00 | M4 checker rules | M5 Arkiv basics, then start M9 importer | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M7 fuzzer on the V3 descriptor | Sleep 07:30 to 11:30 | M6 demo wallet wired to the core |
| **Fri 09:00** | **Spine check**: demo moment runs | (asleep) | Spine check |
| 09:00 to 12:00 | M8 sweep harness; start the full sweep run, then sleep | M9 importer (from 11:30) | M11 dashboard on partial sweep output |
| 12:00 to 16:00 | Sleep (sweep running on the spare laptop) | M9 checker writer, M10 Anon-RPC | M6 polish, tampered frontend realism (same look as the honest one) |
| 16:00 to 18:00 | Triage sweep output; replay every disagreement | `data-quality.md`, `schema.md` | Demo mode, keyboard beats |
| **Fri 18:00** | **Demo path complete** (dinner review) | | |
| 18:00 to 00:00 | Second sweep pass with K = 16 on functions that disagreed; M13 disclosure draft | M12 Swarm if stamps exist, else drop | Rehearsal 1; copy pass; How-it-works page |
| **Sat 00:00** | **Feature freeze**; final snapshot | Final import at a fixed commit; Arkiv verdicts written | Rehearsals 2 and 3 |
| 00:00 to 02:00 | Pre-run every live beat; record each as fallback | `friction.md`, `reach.md`, `why-arkiv.md`, `swarm.md` | Video script final |
| 02:00 to 04:30 | Q and A prep (section 13) | Nap 02:30 to 04:00 | Record and edit the video |
| 04:30 to 07:00 | README contract links and limits; nap 04:00 to 05:30 then review | README Arkiv section with wallets and query | README layout, screenshots, CROPS section |
| 07:00 to 09:00 | Submit draft at 07:00; final at 08:30 | | |

**Pivot rule.** If Gate 1 fails because the renderer cannot handle the registry's formats, narrow to the three descriptors that work and make the sweep "every descriptor of these protocols"; state the denominator. If the effect extractor cannot run on the fork, pivot to Clearsight alone (Arkiv M1 drift checker) and enter Arkiv plus EF. **Cut order:** Swarm first, then the second sweep pass, then the Anon-RPC reads (state them as future work), never the refusal moment or the sweep header.

## 8. Pre-event checklist (until Thu 21:00)

- [ ] Count the public data (research only, throwaway one-liners, nothing kept): registry files, calldata vs EIP-712 descriptors, descriptors with chain 1 deployments, formats used and how many fields use formats outside the subset. This sets the honest denominator.
- [ ] Read the ERC-7730 spec end to end, including container paths and every format.
- [ ] Read the six Trezor-launch descriptors (1inch, Aave, Lido, Tether, LiFi, Hyperliquid) ([Crypto Briefing](https://cryptobriefing.com/trezor-clear-signing-erc-7730/)).
- [ ] Mainnet archive RPC key; check Anvil forks the chosen block quickly from home.
- [ ] Arkiv Discord: Mirror scope for ERC-7730, quota units per entity, SDK 1.0 vs 0.9, Rabdi wipe date, Swarm stamps (`ideas/arkiv.md` section 10, items 1, 2, 3, 6, 7).
- [ ] EF Discord: is the CROPS rubric final; does a library called before rendering compete with end-user apps; is a CI sweep with the team's RPC key acceptable if user-side reads use Anon-RPC (`ideas/ef.md` section 8, items 10, 11, 14).
- [ ] Workshops: B at Arkiv 16:00 Room 2; A at EF 17:00 Room 2.
- [ ] Ask the EF who should receive private disclosure of a wrong registry descriptor.
- [ ] Not allowed before 21:00: the renderer, the checker, screens, schemas written as files.

## 9. Test plan

- **Unit (TypeScript):** renderer field lists for the three gate descriptors; each checker rule with one passing and one failing effect list.
- **Fork tests (Foundry, `contracts/test`):** the honest V3 swap and the tampered descriptor transaction both executed from the snapshot, asserting the exact transfers the checker expects, so the checker's ground truth is itself tested.
- **Property tests:** for random effect lists, adding an undisplayed outflow always produces "effect not displayed" (rule 6 cannot be bypassed by ordering); a "not verified" field never yields PASS for the whole transaction.
- **Replay determinism:** every sweep row replays to the same verdict from the snapshot (run all rows twice, diff the output).
- **Fixtures the demo relies on:** `fixtures/main.json` (snapshot), `fixtures/sweep-<block>.json`, the registry commit SHA, the tampered descriptor file, and the Arkiv entity keys used on stage.

## 10. Demo

**20 second hook (C).** "WazirX's signers approved a screen that lied, and Bybit's frontend served one. We checked every descriptor in the public clear-signing registry: here is the count. Now watch a tampered frontend say 'pay alice.eth' while the money goes to a stranger. The wallet refuses."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Sweep header: descriptors checked, fields fuzzed, disagreements, "effect not displayed" findings, not verified (real numbers) | static screenshot of the same header |
| 0:20 | **The moment:** tampered swap page, click Swap. Left pane "Swap 100 USDC, beneficiary alice.eth"; right pane the fork's transfer pays 0xA77; REFUSED card, raw calldata below. Lands by 0:55 | recorded clip |
| 1:00 | Same call bundled with an unlimited `approve`: REFUSED, "effect not displayed: unlimited USDC approval to 0x..." | recorded clip |
| 1:40 | A judge picks any sweep row; its replay command runs on the snapshot and prints the same verdict | pre-run terminal output |
| 2:20 | Honest green path: the real registry descriptor for V3 SwapRouter `exactInputSingle` renders and passes | screenshot |
| 2:50 | CROPS on one slide: fork source is the stated trust assumption; user reads through Anon-RPC; descriptors and verdicts also served from Arkiv | slide |
| 3:30 | Limits: Vyper selector checks "not checked"; formats outside the subset "not verified", never green | slide |

**Video (2:00 to 2:59).** 0:00 hook and the count; 0:20 the refusal; 0:50 the approval completeness case; 1:20 the GitHub-off moment for Arkiv (block github.com and our server in the hosts file, the wallet still fetches the descriptor from Arkiv and the UI from Swarm); 1:50 the sweep table and one replay; 2:20 CROPS lines and limits; end card with repo, Arkiv query and wallets.

## 11. README draft

Order: title and one-line promise; the 20 second story with the screenshot pair; the sweep numbers with denominator and block; quick start (`npm i`, `anvil --load-state`, `npm run demo`); how it works (diagram from section 2); checker rules (section 5); limits; **CROPS**; **Arkiv**; **Swarm**; prior art; disclosure note; how we used AI; licence.

**CROPS section (draft text).**
- **C (Censorship resistant):** verification needs only a fork source, which can be the user's own node. Descriptors and verdicts are served from Arkiv and the UI from Swarm, so the check works with GitHub and our server gone. Remaining dependencies: the fork RPC, the Arkiv network, the Anon-RPC gateway.
- **O (Open source):** MIT; every number in this README is reproducible with `truthsign replay` from the committed snapshot; the Arkiv import script re-runs from any registry commit.
- **P (Private):** user-side reads go through Anon-RPC by default; no analytics or trackers in the client; the CI sweep uses our own RPC key, which is stated here and touches no user data.
- **S (Secure), the lead property:** the wallet refuses to clear-sign when the screen and the effect disagree, or when the effect includes something the screen never shows. The check runs inside the signing path, not in a report. Trust assumption: the fork's state source.

**Arkiv section.** Licence link (CC0-1.0); importer and checker wallet addresses; one runnable query; what the copy does that the source cannot (filter by selector across every file, commit-pinned read-only entities, verdicts by a second creator with a 7 day lifetime). The five `/arkiv/*.md` files: `schema.md` (table above), `friction.md` (started at hour 0: versions, expected, actual, repro, links to `reported-issues`), `reach.md` (who consumes the registry: Trezor, Ledger, the EF; npm package `getDescriptor`), `why-arkiv.md`, `data-quality.md` (counts, lag from HEAD, share of bindings checked in 7 days).

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Sweep dashboard (home) | Five big numbers with denominators: descriptors checked, fields fuzzed, wrong field, effect not displayed, not verified; the block and registry commit under them; a filterable table (chain, contract, function, field, verdict, replay) | loading shows sweep progress by protocol; live findings show counts only until disclosed |
| Demo dApp, honest and tampered | Two visually identical swap pages ("Swap 100 USDC for WETH"); the tampered one differs only in the descriptor it serves | the presenter switches with a key, not a URL |
| Wallet pane | A hardware-wallet style frame (device outline, paged fields, two buttons) so judges recognise a clear-sign screen at once | PASS shows the normal screen with a small green check; REFUSE replaces the buttons with the refusal card |
| "The screen says / The chain says" split | Left: the fields the descriptor shows. Right: a flow diagram of the fork effects (You -> Pool -> 0xA77) with amounts. The mismatched field and the mismatched arrow pulse in the same colour | NOT VERIFIED fields shown in grey with the reason |
| Row page | One sweep row: descriptor link at the commit, the seed, the replay command with a copy button, the verdict card | replay runs in the browser against the snapshot when the local fork is up; otherwise shows the saved output |
| How it works | One diagram (section 2) and the seven checker rules in plain words | |

Copy: the only term of art in the first minute is "clear signing". The refusal sentence always has the shape "The screen says X. The transaction does Y." Never name a live protocol on stage.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Sweep finds zero wrong-field cases | sweep complete, no rule 1 to 5 failures | Report zero honestly; lead with "effect not displayed" counts, which are likelier |
| Sweep does not finish | not done by Sat 00:00 | Scope to the six Trezor-launch protocols and state the denominator |
| Container-path attack not expressible | spec check at hour 1 | Tampered descriptor that labels another argument as beneficiary |
| Arkiv down Saturday | Rabdi unreachable at 07:00 | Wallet reads a signed local snapshot, labelled "snapshot" |
| Real finding in a live descriptor | any reproduced disagreement | Private disclosure before the demo; stage shows counts, not protocol names |
| Gate 1 fails | renderer or extractor not working at Fri 01:00 | Narrow scope, or pivot to Clearsight (Arkiv plus EF) on the same importer |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Isn't this just simulation, like maki or Blockaid?" | Simulation tells you what happens. We check that the screen the descriptor builds says the same thing, field by field, and refuse when it does not. Nobody checks descriptors against effects; we also did it for the whole registry | split pane plus sweep header |
| "The fork source can lie to you." | Yes, it is the stated trust assumption. Point it at your own node; a verified light client for the fork reads is the next step | CROPS slide |
| "State can change between check and inclusion." | Path errors (wrong field mapped) are independent of state, and those are the findings. Amount-dependent fields are checked against current state and we say so | checker rules page |
| "How do you know which field is the recipient?" | A small role table from labels; anything unclassified is "not verified" and counted, never passed | sweep "not verified" column |
| "False positives?" | A disagreement counts only if it replays from its seed; every row has the command | replay terminal |
| "Did you find real bugs, and did you tell anyone?" | Here are the counts; each live finding went to the maintainers before today | disclosure note |
| "Why Arkiv and not just GitHub?" | Query by selector across every file, commit-pinned read-only copies a force-push cannot rewrite, and verdicts written by a second key that expire if not re-checked | Arkiv query result |
| "Would Trezor or Ledger use this?" | It is a library called before rendering, with one function in and a verdict out; the EF says clear signing still needs "accuracy verification" | README quick start |

## 15. AI usage

Follow `00_common.md` section 8. Specific to Truthsign: A writes and reviews every checker rule and fork test by hand, because the checker is the security claim. AI may generate renderer boilerplate for formats, UI components and test fixtures; each generated rule is checked against the spec text.
