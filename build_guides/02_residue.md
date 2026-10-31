# 02 Residue: build guide

Rank 2 of 10 (judge average 7.67, P(demo) 75%). Source design: `track_ideas/finalist_ideas.md` section 3.2, `track_ideas/ideas/ens.md` rank 1 (and rank 2 Moving Day as the pivot), `track_ideas/finalist_judges/feasibility.md` candidate 8. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** In ENSv2 a name is a token, but control is spread across the token's roles, the name's subregistry and the name's resolver. A transfer moves only the token's roles. Residue has two parts: a **lens** that shows, for any ENSv2 name on mainnet or Sepolia, every key that can still change where it resolves, what sits under it, or the contracts behind it; and an **escrow** that settles a sale only when that list is the buyer alone. The house-key line carries the pitch: "You bought the house and the seller kept a key."

**Falsifiable promise.** "If `settle()` succeeds, no address except the buyer can change the name's address or text records, register or remove its subnames, or upgrade the contracts behind either. The invariant suite tries every role, link, operator and upgrade path we know of, and for any key the lens returns every name where it still holds a role, matching the onchain role count or marked UNKNOWN."

**Prize stack (two partner picks).**

| Prize | Verbatim requirement (Facts) | How this build meets it |
|---|---|---|
| ENS "Best Use of ENSv2" ($3,000 / $2,000 / $1,000 / $1,000) | "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values. Upon submission, your project showcase must have a link to a live demo and the code needs to be open source and accessible on Github or a similar platform." ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)) | The product is the ENSv2 control model (hierarchy, EAC roles, Permissioned Resolver, Verifiable Factory). Escrow on Sepolia; lens reads mainnet and Sepolia; every verdict computed from chain state for a name the judge picks; static live demo |
| Arkiv "Mirror something Ethereum depends on" ($3,000 / $1,000), optional | MR2 to MR8 as in `01_truthsign.md` section 1 ([Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)) | Mirror the ENSv2 role graph (`EACRolesChanged`, links, `ApprovalForAll`) so anyone can ask "every name where this key holds a role". Only after the hour-4 gate; licence of chain events is an open question |

Judgement: ENS's four places make it worth more per hour than its 1st-place figure suggests (`track_ideas/track_combos_check.md` section 1.3). Expect at most 2nd from Arkiv. No EF prize fits honestly.

## 2. Architecture

```
            mainnet / Sepolia RPC (public fallback list)
                     |
   [lens walker, TypeScript]  root -> getSubregistry / getResolver per label
        |   verifyContract on every proxy  -> canonical impl?   (else UNKNOWN)
        |   EACRolesChanged logs -> role holders per resource  -> roleCount cross-check
        |   links, ApprovalForAll operators, non-emancipated ancestors
        v
   "who can change what" report  --->  static web app (live demo link)
        |                                   |
        |                                   +--> Listing page --> Buy --> CleanHandover.settle()
        v                                                            (Sepolia, MockUSDC)
   [Arkiv mirror, optional]  role graph entities, reverse lookup by key
```

**CleanHandover escrow (Sepolia), in plain English.**
- **List:** the seller deposits the name into the escrow with `safeTransferFrom` (which already forces the seller to clear third-party token holders, per the docs' `TransferUnsafeWithMultipleAssignees` revert) and sets a price in a test ERC-20 (Sepolia `MockUSDC`).
- **Check (view):** for a listing, a buyer and the buyer's resolver, returns clean or the first residue found: which surface (subregistry root, resolver root, resolver key-scoped, link, operator, implementation), which role bitmap, and a holder hint.
- **Settle:** in one transaction the escrow, now the token owner, points the name's resolver at the buyer's own factory-deployed resolver; for each dangerous role on the subregistry's root resource requires `roleCount` to be at most 1 and, if 1, `hasRoles(buyer)`; calls `verifyContract` on the subregistry and the buyer's resolver and requires the published canonical implementations; then transfers the name to the buyer and pays the seller. Any failure reverts with a named residue error.
- **Hand over (helper, UI-driven):** the seller grants the buyer the subregistry's root roles and revokes their own; the UI shows each residue line turning green as those transactions land.

**Trust assumptions.** The canonical implementation list (`UserRegistryImpl`, `WrapperRegistryImpl`, `PermissionedResolverImpl`) from the ENS deployments page; the RPC serving logs (the lens marks UNKNOWN when its log-rebuilt counts disagree with `roleCount`).

## 3. Repo layout and scaffold

```
residue/
  contracts/
    src/            CleanHandover escrow
    test/           unit, fork (Sepolia), invariant suite with handler
    lib/            forge-std, ensdomains/contracts-v2 (public library)
  packages/lens/    walker, role rebuilder, report model, CLI (residue <name>)
  packages/mirror/  Arkiv importer and reverse lookup (optional)
  app/              lens UI, listing and buy flow, seller hand-over flow
  fixtures/         cached log ranges per chain with block numbers; Sepolia deployment record
```

At 21:00: common scaffold, then `forge install ensdomains/contracts-v2` (pin a commit, (verify) repo name and build instructions), `npm i @ensdomains/ensjs@5.2.10` (ENSjs 5.2.5 or later "provides stable ENSv2 write support", [ENSv2 readiness](https://docs.ens.domains/web/ensv2-readiness)).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Transfer semantics | "When a token transfers, all roles are atomically moved from the old owner to the new owner ... Roles granted to other accounts on the same name are unaffected."; `safeTransferFrom` reverts with `TransferUnsafeUntilRegistryIsEmancipated` or `TransferUnsafeWithMultipleAssignees`; `unsafeTransfer` skips both | Fact ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)) |
| Role checks | `roleCount(resource)` ("nybble per role"), `hasRoles(resource, roleBitmap, account)`, event `EACRolesChanged(resource, account, oldRoleBitmap, newRoleBitmap)` | Fact ([EAC](https://docs.ens.domains/ensv2/enhanced-access-control); [Indexing](https://docs.ens.domains/ensv2/indexing)) |
| Implementation checks | Verifiable Factory `verifyContract(proxy)` returns the current implementation; upgrades need `ROLE_UPGRADE` on the proxy's `ROOT_RESOURCE`; UserRegistry treats `ROLE_UPGRADE` and `ROLE_UPGRADE_ADMIN` as dangerous | Fact ([Verifiable Factory](https://docs.ens.domains/ensv2/verifiable-factory); [Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)) |
| Resolver | roles have "no per-name scoping"; `initialize(grants, calls)`; record linking ("link a new name to the old name's record") | Fact ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver)) |
| Deployments | mainnet and Sepolia list `UserRegistryImpl`, `WrapperRegistryImpl`, `PermissionedResolverImpl`, `VerifiableFactory`, `UniversalResolverV2`, migration controllers; Sepolia lists `MockUSDC`; the page still says mainnet resolution continues through v1 "Until the launch completes" | Fact ([Deployments](https://docs.ens.domains/learn/deployments)); live status is workshop question 1 |
| Launch | "Today, ENSv2 is live on Ethereum mainnet", 27 Oct 2026 | Fact ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)) |
| SDK | `@ensdomains/ensjs` 5.2.10, `viem` 2.57.13 (minimum read versions viem 2.35.0, ENSjs 4.2.3) | Fact (npm 2026-10-31; readiness page) |
| Arkiv | `@arkiv-network/sdk` 1.0.0, Rabdi RPC | as in `01_truthsign.md` |
| Sepolia names and USDC | a free path to Sepolia .eth names; whether `MockUSDC` is mintable by anyone | (verify): ENS question 12 |

## 5. Core algorithms in plain English

**Lens walk.** Input: a name. Steps: split into labels; from the root registry, for each label read the subregistry and resolver; for every registry and resolver proxy call `verifyContract` and compare with the canonical implementation (different or unverifiable means UNKNOWN for that node); for each resource (the token, the subregistry root, the resolver root, each key-scoped resolver resource) rebuild holders from `EACRolesChanged` logs since ENSv2 deployment; compare each role's holder count with `roleCount`; if any count disagrees, mark the whole report UNKNOWN, never SAFE; add record links, `ApprovalForAll` operators on the registry, default-record fallback, and ancestors that are not emancipated. Output: a list of powers (change records, create or remove subnames, upgrade contracts, move the name) with holders, the path, and the transaction that granted each.

**Residue rule used by settle.** For each dangerous role on the subregistry root: count at most one holder, and that holder is the buyer. Resolver: the buyer's own factory resolver with a canonical implementation and the buyer as sole root holder. Links and operators: none pointing at the seller. Implementation: canonical for both proxies.

**Invariant suite.** Actors: seller, buyer, three strangers, a seller-controlled contract. Handler actions: grant and revoke random role bitmaps on every resource, link records, set and unset operators, swap subregistries, attempt upgrades, list, hand over, settle. Invariant after any successful settle: every attempt by any actor other than the buyer to set an address or text record, register or remove a subname, or upgrade either proxy reverts. Folded-in properties from the draft's RegistryLint: token regeneration on role change, admin roles only at registration, stale token IDs own nothing. Run locally against contracts deployed from the `contracts-v2` source (fast), and confirm the key cases on a Sepolia fork (real deployments).

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Sepolia fork plus local deploy of ENSv2 from source | `forge test --match-test test_registerName` registers `shop.<team>.eth` with a factory subregistry on both | A |
| M2 | **Transfer path gate** | three tests, one per path (`safeTransferFrom`, `unsafeTransfer`, operator transfer via `ApprovalForAll`; confirm the third path name in the docs): each records which residue survives (old owner can still `register` under the subregistry; resolver still the seller's) | A |
| **Gate 1, Fri 01:00** | M2 result | at least one residue survives `safeTransferFrom` (then Residue leads), or only `unsafeTransfer` leaves residue (narrow the claim; Residue is ENS-only and Moving Day becomes the finalist lead) | A |
| M3 | Lens walker CLI | `residue shop.<team>.eth --chain sepolia` prints every holder with the granting tx; `roleCount` cross-check printed | B |
| M4 | CleanHandover escrow | `test_settle_reverts_on_subregistry_registrar_residue`, `test_settle_reverts_on_seller_resolver`, `test_settle_succeeds_after_handover`, `test_old_seller_cannot_register_after_settle` | A |
| M5 | Invariant suite | `forge test --match-contract ResidueInvariant` with depth 50, runs 500: no violation; counts of each attempted path printed | A |
| **Spine, Fri 09:00** | list, Buy, revert with named residue, hand over, settle, failed `register` | runs from the CLI on Sepolia | A, B |
| M6 | UI: lens, listing, buy, hand-over | a judge can do the 0:20 to 1:50 beats without a terminal | C |
| M7 | Mainnet lens on real names | 20 random ENSv2 mainnet names walked; any UNKNOWN explained; cached copies saved | B |
| M8 | Static hosting with RPC fallback list | live demo link loads on a phone and walks a mainnet name | C |
| **Arkiv gate, Fri 13:00** | only if M1 to M6 are done | one role-graph entity written and queried by holder | B |
| M9 | Arkiv mirror and reverse lookup | "every name where 0x... holds a role" returns from Arkiv, filtered by `$creator` | B |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M10 | README, ENS section with contract links, `/arkiv/*.md` if entered, video | checklist in `00_common.md` section 7 | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold, `contracts-v2` installed and building | Lens package skeleton, Sepolia and mainnet RPC list | Design system, house-key visual language, screens on fixtures |
| 22:00 to 01:00 | M1, M2 transfer-path tests | M3 walker against Sepolia | Lens result screen and Buy flow on fixtures |
| **Fri 01:00** | **Gate 1**: which residue survives which path; claim chosen | Walker prints holders | Copy updated to the chosen claim |
| 01:00 to 07:00 | M4 escrow and unit tests | M3 cross-checks; UNKNOWN logic | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M5 handler and invariants | Sleep 07:30 to 11:30 | M6 wired to Sepolia |
| **Fri 09:00** | **Spine** from the CLI | | |
| 09:00 to 12:00 | Deploy escrow to Sepolia, verify on Etherscan; start long invariant run | (from 11:30) M7 mainnet walks | M6 seller hand-over checklist |
| 12:00 to 16:00 | Sleep (invariant run continues) | **Arkiv gate 13:00**, then M9 or drop | M8 static hosting, phone layout |
| 16:00 to 18:00 | Review invariant output; gas numbers | M9 | Demo mode |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Fork test for each listed residue error; README contract table | `/arkiv/*.md` or ENS FEEDBACK notes | Rehearsals; reverse-lookup screen if Arkiv passed |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Pre-send the Sepolia demo transactions as fallback receipts | Cache mainnet lens outputs | Video script |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README limits | README Arkiv section | README layout and screenshots |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30 | | |

**Pivot rule.** If ENS has added a hook that moves subregistry roles on transfer, or the docs and the fork disagree with the claim, pivot to **Moving Day** (`ideas/ens.md` rank 2) on the same walker: a verified dry run of a v1 to v2 upgrade, records and subnames included. **Cut order:** Arkiv first, then reverse lookup, then the mainnet sample size; never the Buy refusal or the invariant suite.

## 8. Pre-event checklist

- [ ] Read the Permissioned Registry, EAC, Permissioned Resolver, Verifiable Factory, Migration and Indexing pages end to end; note every role name and every revert.
- [ ] Count ENSv2 mainnet activity since 27 Oct (public explorer research, nothing kept): how many names upgraded, how many `EACRolesChanged` events.
- [ ] Get Sepolia ETH on three wallets; find out how to get a Sepolia .eth name and `MockUSDC`.
- [ ] ENS Discord before Thursday, then the 16:00 Room 1 workshop (A attends; B goes to Arkiv in Room 2): questions 1, 3, 4, 5, 9, 10, 12 in `ideas/ens.md` section 8. The deciding one: "After `safeTransferFrom` can the seller keep root roles on the subregistry and the resolver pointer; is there an intended clean hand-over flow; does a project that inspects and enforces ENSv2 state count as built on ENSv2?"
- [ ] Arkiv: are chain events in scope for "license allows republishing"?
- [ ] Not allowed before 21:00: the escrow, the walker, schemas, screens.

## 9. Test plan

- **Unit:** each residue error from `check` and `settle`, one test per surface.
- **Fork (Sepolia):** the three transfer paths; settle against real deployed implementations; a judge-style end-to-end test (list, buy reverts, hand over, buy succeeds, stranger `register` reverts).
- **Invariant:** the suite in section 5, with the count of each attempted path printed in the README ("tried N grant sequences, M upgrade attempts, 0 violations").
- **Lens differential:** for 20 mainnet names, compare the walker's holders with the ENS Explorer's "who controls it" view by hand; any difference is either a finding or a bug, written down.
- **Fixtures:** Sepolia deployment addresses, the pre-sent demo transactions, cached log ranges with their block numbers, the mainnet lens outputs.

## 10. Demo

**20 second hook (C).** "You bought the house and the seller kept a key. ENSv2 went live last week, and in ENSv2 a transfer moves the name, not the control. A judge clicks Buy, and our escrow refuses: the seller could still hand out `pay.shop.eth` to himself after the sale."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | The house-key sentence; no "subregistry", "EAC" or "emancipated" | none needed |
| 0:20 | Teammate lists `shop.<team>.eth` on Sepolia; a judge clicks Buy on the demo phone | pre-listed name |
| 0:45 | **The moment:** settle reverts and the card says "The seller can still create names under shop.<team>.eth" with the path; seller presses "Hand over all keys", lines turn green; settle succeeds; the old seller's attempt to create `pay` fails on screen | pre-sent receipts |
| 1:50 | A judge pastes any mainnet ENSv2 name into the lens: every key that can still change what, each line linked to its event | cached lens output |
| 2:40 | Reverse lookup through the Arkiv mirror (only if the Arkiv gate passed) | skip |
| 3:10 | Invariant counts, UNKNOWN semantics, which transfer path leaves which residue | slide |

Never say "name marketplace": Residue is a settlement rule any marketplace can call.

**Video (2:00 to 2:59).** Hook; the refused Buy; hand over and the clean settle; the stranger's failed `register`; a mainnet name in the lens; the invariant count and the UNKNOWN state; end card with the live demo link.

## 11. README draft

Order: promise; the house-key story with two screenshots (refused, settled); live demo link; quick start (`npm run lens -- <name>`, `forge test`); how it works; the residue rule; transfer paths table (which residue survives which path, from Gate 1); invariant counts; limits and UNKNOWN; **ENS integration** (a table of every ENSv2 call with permalinks: `getSubregistry`, `getResolver`, `verifyContract`, `roleCount`, `hasRoles`, `EACRolesChanged` indexing, the escrow's settle lines; Sepolia addresses and tx hashes); **Arkiv** if entered (wallets, query, five files); prior art (ENS Drive, Herit, SubnodeSymphony, rent.eth); disclosure note; AI usage; licence.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Lens home | One input "Paste an ENS name", three example chips (a clean name, a name with residue, a mainnet name) | empty with examples; loading skeleton listing what is being read ("reading roles on the subregistry..."); error per RPC with fallback note |
| Lens report | Headline: "Only the owner can change this name" (green) or "3 keys besides the owner can still change this name" (amber) or "We could not confirm this" (grey UNKNOWN). Four groups in plain words: change where it points; create or remove names under it; replace the contracts behind it; move the name itself. Each row: holder (ENS name or short address), a key icon, the path in plain words, a link to the granting transaction | UNKNOWN explains which count disagreed |
| Listing | Price, seller, a "Before you pay" panel that runs `check` live and lists residue | clean listing shows green "Nothing stays with the seller" |
| Buy result | The verdict card from `00_common.md` section 6: REFUSED, "The seller could still create pay.shop.<team>.eth after the sale", Proof row, technical drawer with role bitmap and resource | success shows the settle tx and the new owner |
| Seller hand-over | A checklist of residue lines, each with one button; lines turn green as transactions confirm | pending, confirmed, failed |
| Reverse lookup (Arkiv) | "Every name where this key still holds a role" | only if the gate passed |

Copy rule: the technical drawer is the only place the words subregistry, EAC, root resource and emancipated appear.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Only `unsafeTransfer` leaves residue | Gate 1 result | Claim narrows to "for every sale that uses `unsafeTransfer`"; enter ENS only; Moving Day becomes the finalist lead |
| ENS confirms a clean hand-over flow already exists in the Explorer | workshop answer | Rank Residue below Moving Day; keep the escrow as the enforcement the Explorer lacks |
| Arkiv rules chain events out of "license allows republishing" | Arkiv answer | Enter ENS alone |
| Mainnet logs slow or capped on venue Wi-Fi | lens over 10 s | Cached copies with block numbers; hotspot |
| Seller front-runs settle by granting a role | (design case) | Settle checks at execution in the same transaction; covered by a test |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Doesn't the new ENS Explorer already show who controls a name?" | It shows control; we enforce it at the moment money changes hands, across the subregistry and resolver, and we say UNKNOWN when the counts disagree | lens plus refused settle |
| "Why not just use `safeTransferFrom`?" | Here is what survives each transfer path, tested on a fork | transfer paths table |
| "What about a role you did not model?" | Counts come from the chain's own `roleCount`; if our rebuilt holders disagree we say UNKNOWN, never safe | UNKNOWN state |
| "Can the seller grant a role after the check?" | Settle re-checks in the same transaction that moves the name and the money | test name in the README |
| "What if the buyer wants to keep existing subnames?" | Default is strict; an explicit accepted-residue list is the next step, and it would still be shown to the buyer | listing panel |
| "Is this a marketplace?" | No, it is a settlement rule any marketplace or OTC deal can call | escrow lines in the README |
| "How much gas?" | The numbers from the tests | gas table |
| "Did you find residue on real names?" | Counts only on stage; any real case went to ENS first | disclosure note |

## 15. AI usage

Follow `00_common.md` section 8. A writes the escrow and every invariant by hand; AI may help with the walker's log pagination, UI components and test scaffolding, all reviewed.
