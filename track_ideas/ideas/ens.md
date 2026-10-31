# ENS: judged ideas for ETHGlobal Mumbai (fresh builds only)

Panel: ENS's prize judges (role-played), plus one skeptical hackathon veteran checking feasibility. Date of judging: 2026-10-31. Event: ETHGlobal Mumbai, hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre, alongside Devcon 8 India.

Team: three people, DeFi and smart contract security (Solidity, Foundry, fuzzing, auditing), TypeScript and React. Classic track, fresh build, no existing project code. Public libraries, SDKs and starter kits only (`ensdomains/contracts-v2`, ENSjs, viem, Foundry).

In scope: **Best Use of ENSv2** ($7,000 USDC; 1st $3,000, 2nd $2,000, 3rd $1,000, 3rd $1,000; category `building-from-scratch`). Out of scope: "Best Integration of ENSv2 into an Existing Project" ($3,000), which is Continuity only. ([Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens))

**How to read this file.** Text under "Sourced facts" carries a URL or a repo path. Everything marked **Judgement**, every score, every ranking and every judge note is this panel's opinion. Inputs reused: `track_ideas/00_current_tracks.md` (verbatim criteria, fetched 2026-10-31), `track_ideas/history/ens.md` (dossier, cited as [H]), `track_ideas/ideas_draft/ens.md` (draft), `track_ideas/00_season.md` (season brief), the other sponsors' judged files in `track_ideas/ideas/`, and `plans/`. ETHGlobal pages were not re-fetched: the 31 Oct snapshot already holds them verbatim. On 2026-10-31 I re-read the ENSv2 docs pages the ideas depend on (migration, permissioned registry and resolver, EAC, Verifiable Factory, indexing, deployments, readiness) and the ENS launch blog post; links are inline. No bot check was met on those sites.

---

## 1. What ENS's judges reward

### Sourced facts

- The Mumbai track is the third "Best Use of ENSv2" in a row. ETHOnline 2026 and Tokyo 2026 used the same description; Tokyo had the same $7,000 split and the same "link to a live demo" rule; Mumbai adds mainnet ("ENSv2 is now live on Ethereum mainnet"; "Project must be built on ENSv2 on Ethereum mainnet or Sepolia") ([H] section 1.4; [Tokyo 2026 ENS prizes](https://ethglobal.com/events/tokyo2026/prizes/ens); [Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)).
- Qualifications, verbatim: "Project must be built on ENSv2 on Ethereum mainnet or Sepolia. ENSv2 features should be central to the product, not a cosmetic add-on. Your demo must be functional and not just include hard-coded values. Upon submission, your project showcase must have a link to a live demo and the code needs to be open source and accessible on Github or a similar platform." ([Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens))
- The only "what we want" sentence beyond the feature list: "Bonus points if you bring AI agents into the mix. Think agents as namespaces, each with their own identity and permissions." (same page)
- Features the description names: wildcard resolution, subname registries, Enhanced Access Control (EAC), Permissioned Resolver, record aliasing, namespace aliasing, and subname setups that are "expiring, revocable, non-transferable vs. transferable, even forever names with no parent control" (same page).
- ENSv2-era winners: ETHOnline 2026 1st [Herit](https://ethglobal.com/showcase/herit-i56y4) (inheritance wired into EAC bits, World ID liveness), 2nd [Batas](https://ethglobal.com/showcase/batas-ns7pr) (an agent mandate that is the Aqua strategy, revocable in ENS), 3rd [Verdict.eth](https://ethglobal.com/showcase/verdict-eth-zsmpv) (auditor-only setter roles), runner-up [Capsule](https://ethglobal.com/showcase/capsule-yq59u) (kill switch is a resolver role revoke). Tokyo 2026 1st [Relay](https://ethglobal.com/showcase/relay-abxnx) (org to agent to subagent delegation tree), 2nd [ENS Drive](https://ethglobal.com/showcase/ens-drive-qu2m2) (a PermissionedRegistry subclass with a Halmos proof and a differential fuzz test), 3rd [Tide](https://ethglobal.com/showcase/tide-b14pr) (strategy parameters as records under record-scoped roles) and [Kura](https://ethglobal.com/showcase/kura-so3wx) (non-transferable, revocable card names; also Uniswap 1st and finalist) ([H] section 3.1).
- Field size: about 49 ENSv2 entries at ETHOnline 2026 and 44 at Tokyo 2026 for four places each, so roughly 1 in 11 placed ([H] section 3.1).
- At least ten "agent subname with scoped, revocable records" entries across those two events did not place (Leash Layer, Revoke.eth, ReputAI, Agent Grove, RelayDesk, Proviso, Leash, Fleet Naming Service, Omamori, yohaku); only Capsule placed, as runner-up ([H] section 3.1).
- Relay's own page says "no ENS contracts ... are integrated in this version", and it still took 1st at Tokyo ([Relay](https://ethglobal.com/showcase/relay-abxnx)).
- ENS's launch post (27 Oct 2026): "Today, ENSv2 is live on Ethereum mainnet", "Starting today, you can upgrade your names to ENSv2 directly in the ENS App", the Explorer lets people "inspect a name's history, see who controls it", and "Since Beta, the focus has been on refinement, security fixes and preparing them for production" ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)).
- Workshop: Thu 5 Nov 16:00 to 16:20 IST, Workshop Room 1, "ENSv2 - Identity for Apps, Agents & Beyond", Yash Goyal (ENS Labs); it clashes with Arkiv (16:00, Room 2) ([event page](https://ethglobal.com/events/mumbai); `00_current_tracks.md`).

### Judgement: what these judges will reward (ranked)

1. **The ENSv2 rule sits on the path that matters.** Every placed entry enforced its limit where an attacker cannot route around it (Batas in the opcode, Capsule in the resolver, Herit in EAC bits). "Read a policy from ENS, then decide in our backend" lost every time.
2. **One ENSv2 primitive used for its exact reason**, inside a real product: Kura's non-transferable names, Tide's record-scoped roles, Verdict's separated setter roles.
3. **Teaching ENS something about its own protocol.** ENS Drive (fail-closed lookups, gas numbers, a proof), Herit ("three ENSv2 behaviors the hard way"), Capsule ("That ordering is the security model"). ENS is in a hardening phase in launch week, so findings about sharp edges are welcome.
4. **A legible delegation picture**, the "agents as namespaces" sentence made concrete. Relay shows the picture alone can win; do not rely on that leniency now that mainnet is live.
5. **Launch-week relevance.** Mumbai is the first ENS prize after mainnet launch and after name upgrades opened. Builds that help real names cross from v1 to v2, or change hands, safely are what ENS needs this month.
6. **Not rewarded:** ENS as a display name, an agent registry with scoped text records and nothing else, a name marketplace without a new rule, and a video without a live link.

### Judgement: the obvious entries we assume several teams will submit

- An agent fleet registry: each agent a subname with ENSIP-25 and ENSIP-26 records, scoped text roles, revoke button.
- A Relay-style org to agent to subagent delegation tree, this time with real contracts.
- Expiring subnames as memberships, tickets or subscriptions (Devcon week makes "event passes" very likely).
- A "migrate my v1 name to v2" UI wrapper around the migration controllers.
- Pay-by-name handles, possibly UPI-flavoured (`name@bank` mapped to subnames) for the Mumbai crowd.

Each final idea below must beat all five on at least one property a judge can check.

---

## 2. Rubric used (Judgement)

The track has no numeric criteria. Its "What we want to see" content is the qualification paragraph, the feature list and the agent bonus, so the criteria are taken from those sentences.

| Code | Criterion | Verbatim source | Weight |
|---|---|---|---|
| C | ENSv2 central, not cosmetic | "ENSv2 features should be central to the product, not a cosmetic add-on." | 20% |
| F | Depth and fit of the named ENSv2 features (each used for its exact reason) | "Explore the new hierarchical registry structure ... Enhanced Access Control ... Permissioned Resolver ... aliasing ... subname setups" | 15% |
| L | Functional live demo on mainnet or Sepolia, no hard-coded values | "Your demo must be functional and not just include hard-coded values"; "a link to a live demo" | 15% |
| A | Agent bonus | "Bonus points if you bring AI agents into the mix." | 5% |
| Nov | Novelty versus past ENS winners and the expected Mumbai field | Task | 25% |
| Fea | Feasibility in 36 hours for this team | Task | 20% |

Overall = weighted sum, rounded to one decimal. The agent bonus is weighted low because the text calls it "bonus points", and because the agent lane is the most crowded one in the dossier.

Qualification checks applied to every idea (sources: [Mumbai ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens), [details page](https://ethglobal.com/events/mumbai/info/details)):

- **R1** built on ENSv2 on Ethereum mainnet or Sepolia.
- **R2** ENSv2 central (the "won't place" line: "not a cosmetic add-on").
- **R3** functional demo, "not just include hard-coded values" (second "won't place" line).
- **R4** live demo link in the showcase.
- **R5** open source on GitHub or similar.
- **ETHGlobal rules:** all code written after Thu 5 Nov 21:00 IST; steady commits ("Submissions with large single commits or missing histories may be disqualified"); AI-use attribution and any spec files committed; video 2 to 4 minutes, human voice.
- **Fresh build:** no pre-existing project code. All five drafts pass; none depends on earlier code. Plan E's optional ENSv2 release-namespace mode (`plans/E_verified_frontend.md`) is a plan for the event, not existing code, and is treated as a combo only.

---

## 3. Vetting the five draft ideas

| Draft idea | C | F | L | A | Nov | Fea | Draft overall | Violations or blocking issues | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 1. Residue (who can still change a name after you buy it, plus escrow) | 10 | 8 | 9 | 3 | 8 | 7 | 8.1 | None. The draft's onchain check rebuilt holders from events, which a contract cannot do; gate G1 was open | **Revise**: the docs now confirm the residue exists (below); the escrow holds the name and checks sole holders with `roleCount` plus `hasRoles`, and implementations with `verifyContract` |
| 2. Quarantine (agents as namespaces, judges get an agent key) | 9 | 8 | 9 | 10 | 3 | 7 | 7.0 | None formal. Saturated lane: more than ten unplaced copies | **Revise**: lead with the key handover and the shared-resolver footgun, gate widening on World ID Agent Pass, and reuse Residue's walker for the blast-radius view |
| 3. Shelf (issuer namespace for a bond, ENSv2 name is eligibility) | 8 | 7 | 8 | 5 | 6 | 5 | 6.6 | The promise "records nobody can rewrite" is false as drafted: the issuer keeps `ROLE_SET_RESOLVER` on the bond name and can repoint it. Scope too large for 36 hours | **Revise**: register the bond name as a forever name with no parent control; cut the wallet check and CRE |
| 4. Descriptor Desk (ERC-7730 descriptors under the protocol's ENSv2 name) | 7 | 8 | 8 | 3 | 7 | 5 | 6.7 | R2 risk: ENS reads as a hash store unless the permission set is the trust model. As drafted, whoever holds admin roles on the resolver could grant themselves review keys, so "separated duties" was not enforced | **Revise**: freeze the permission set at `initialize` (no root admin holders), have the signer page verify that frozen set, and share the descriptor checker with Arkiv's Clearsight and EF's Truthsign |
| 5. RegistryLint (property suite and badge for custom registries) | 8 | 6 | 8 | 1 | 6 | 7 | 6.7 | None formal. In launch week there are very few custom registries to lint, so the population result is near empty and the live demo needs a planted bug; ENS Drive already took the "proof on a registry subclass" lane; "Best Use" judges ranked a product above a tool at Tokyo | **Drop**, replaced by Moving Day (same fork harness, a real population, launch-week need). Its best properties move into Residue's invariant suite |

### Facts re-checked on 2026-10-31 that change the ideas

- **Transfers move token roles only.** "When a token transfers, all roles are atomically moved from the old owner to the new owner ... Roles granted to other accounts on the same name are unaffected." `safeTransferFrom` reverts with `TransferUnsafeUntilRegistryIsEmancipated` or `TransferUnsafeWithMultipleAssignees`; `unsafeTransfer` skips both ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)). **Consequence (Judgement):** the name's subregistry is a separate contract whose root roles stay with whoever holds them, and the name's resolver stays whatever it was. That is the residue Residue checks. Gate G1 in the draft is now mostly settled by the docs; a fork test still confirms it in hour 1.
- **Sole-holder checks are possible on chain.** EAC exposes `roleCount(resource)` ("nybble per role") and `hasRoles(resource, roleBitmap, account)`, and emits `EACRolesChanged(resource, account, oldRoleBitmap, newRoleBitmap)` ([EAC](https://docs.ens.domains/ensv2/enhanced-access-control); [Indexing](https://docs.ens.domains/ensv2/indexing)). A count of 1 plus `hasRoles(buyer)` proves the buyer is the only holder without enumerating events.
- **Implementation checks are possible on chain.** The Verifiable Factory has `function verifyContract(address proxy) external view returns (address implementation);`, which "proves that proxy was deployed by this factory and returns the proxy's current implementation"; upgrades need `ROLE_UPGRADE` on the proxy's `ROOT_RESOURCE` ([Verifiable Factory](https://docs.ens.domains/ensv2/verifiable-factory)).
- **Upgrade roles.** "UserRegistry additionally treats ROLE_UPGRADE and ROLE_UPGRADE_ADMIN as dangerous because upgrades can replace its implementation without an allowlist" and "WrapperRegistry restricts upgrades to approved implementations" ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)).
- **Migration is live and has two sharp edges.** "Starting today, you can upgrade your names to ENSv2 directly in the ENS App" ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)). For names that are not locked with `CANNOT_SET_RESOLVER`, "the v1 resolver is cleared during migration. The v2 resolver is set from the migration transfer data (or can be set up afterwards)"; a carried-over PublicResolver is replaced with PublicResolverV2 and "records may need to be copied separately"; "Non-emancipated 3LD+ subnames cannot be migrated through the migration controllers. They must be registered directly in v2 once their parent has a v2 registry"; and "the unemancipated subname namespace under the migrated name is left unchanged" in v1 ([Migration](https://docs.ens.domains/ensv2/migration)). Fuses map to roles by a published table (for example `CANNOT_SET_RESOLVER` burned means `ROLE_SET_RESOLVER` not granted; `ROLE_RENEW`, `ROLE_UPGRADE` and `ROLE_CAN_NAME` are "Always granted" on the WrapperRegistry root) (same page). **Consequence (Judgement):** this is the basis of the new idea Moving Day.
- **Record linking has a named migration use.** "Name migration: link a new name to the old name's record, then unlink the old name." Resolver roles have "no per-name scoping"; `initialize(grants, calls)` grants roles "on ROOT_RESOURCE exactly as passed" and runs "the calls array ... as a multicall during initialization" ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver)).
- **Deployments.** Mainnet and Sepolia both list ENSv2 contracts including `UserRegistryImpl`, `WrapperRegistryImpl`, `PermissionedResolverImpl`, `VerifiableFactory`, `UniversalResolverV2`, `UnlockedMigrationController`, `LockedMigrationController`, `MigrationHelper`, `Graveyard` and `RegistryUpgradeSet`; Sepolia also lists `MockUSDC` and `MockDAI`. The mainnet section still says "Until the launch completes, resolution and registrations on Mainnet continue through the ENSv1 contracts below", and the Sepolia v1 contracts "are no longer in use" ([Deployments](https://docs.ens.domains/learn/deployments)). The docs lag the blog; which paths are live is workshop question 1.
- **SDK.** "ENSjs 5.2.5 or later provides stable ENSv2 write support through its v2 wallet actions"; minimum read versions include viem 2.35.0 and ENSjs 4.2.3 ([ENSv2 readiness](https://docs.ens.domains/web/ensv2-readiness)).

---

## 4. Final ranked table: Best Use of ENSv2

| Rank | Idea | Overall | Verdict | Stack (partner prizes, max 3) |
|---|---|---|---|---|
| 1 | Residue: buy an ENSv2 name and inherit nobody | 8.3 | Revise (done below) | ENS (+ Arkiv "Mirror something Ethereum depends on", optional) |
| 2 | Moving Day: a verified dry run of your v1 to v2 upgrade, records and subnames included | 8.0 | New (replaces RegistryLint) | ENS only (finalist track separately) |
| 3 | Quarantine: here is an agent's private key, try to do damage | 7.3 | Revise (done below) | ENS + World "World ID Agent Pass" |
| 4 | Descriptor Desk: clear-signing descriptors whose authority is a frozen ENSv2 permission set | 6.9 | Revise (done below) | ENS + Arkiv Mirror + EF "Best CROPS App" |
| 5 | Shelf: an issuer namespace where an expiring ENSv2 name is the investor's eligibility | 6.8 | Revise (done below) | ENS + Uniswap Foundation "Build with Uniswap" |

**Shared harness (Judgement).** Ideas 1, 2 and 3 share one TypeScript walker (root to leaf via `getSubregistry` and `getResolver`, `verifyContract` on every proxy, role holders rebuilt from `EACRolesChanged` and cross-checked against `roleCount`) and one Foundry fork harness on Sepolia and a mainnet fork. Build the walker in hours 0 to 6 whichever idea is chosen. Pivot pairs: Residue to Moving Day, Quarantine to Residue.

---

## 5. The final ideas in full

### Rank 1. Residue: buy an ENSv2 name and inherit nobody

**Pitch.** In ENSv2 a name is a token, but control is spread across the token's roles, the name's subregistry and the name's resolver. A transfer moves only the first. Residue shows, for any name on mainnet or Sepolia, every key that could still change where it resolves or what sits under it, and ships an escrow that settles a sale only when that list is the buyer alone.

**Falsifiable promise.** "If `settle()` succeeds, no address except the buyer can change this name's address or text records, register or remove its subnames, or upgrade the contracts behind either. The repo's invariant test tries every role, link, operator and upgrade path we know of, and every attempt by anyone else reverts."

**Demo moment (20 seconds).** A teammate lists `shop.<team>.eth` on Sepolia. A judge clicks Buy, and `settle()` reverts with `ResidueFound(SUBREGISTRY_ROOT, ROLE_REGISTRAR, 0x5e11...)`: the seller still holds the registrar role on the name's subregistry and could mint `pay.shop.<team>.eth` to themselves after the sale. The seller hands the role over, settlement succeeds, and the old seller's `register("pay", ...)` call fails on screen. Then a judge pastes any mainnet ENSv2 name into the lens and gets its "who can change what" list, each line linked to the event that proves it.

**How it works.**
- `lens` (TypeScript, viem): walks the hierarchy; for each registry and resolver calls `verifyContract` and compares the implementation with the published `UserRegistryImpl`, `WrapperRegistryImpl` and `PermissionedResolverImpl`; rebuilds role holders per resource from `EACRolesChanged` and marks the result UNKNOWN, never SAFE, if any count disagrees with `roleCount`; lists token-role holders, subregistry root holders (including `ROLE_UPGRADE`), resolver root holders and key-scoped holders, `linkToNode` links, default-record fallback, `ApprovalForAll` operators and ancestors that are not emancipated.
- `CleanHandover.sol` (Sepolia, payment in a test ERC-20): the seller deposits the name with `safeTransferFrom`, which already forces the seller to clear third-party token holders. At `settle()` the escrow, now the owner, points the resolver at the buyer's own factory resolver, checks every dangerous root role on the subregistry with `roleCount` plus `hasRoles(buyer)`, checks both implementations with `verifyContract`, then transfers the name to the buyer and pays the seller in the same transaction.
- Foundry invariant suite: a handler grants and revokes random roles, links names, sets operators, swaps subregistries and attempts upgrades, then calls `settle()`. Invariant: after a successful settle, the set of accounts able to change `addr(name)` or the subregistry is exactly `{buyer}`. The RegistryLint properties (token regeneration on role change, admin roles only at registration, stale token IDs own nothing) are folded in.
- Optional agent bonus: a buyer agent with a spend cap whose only permitted call is `settle()`.

```solidity
interface ICleanHandover {
    error ResidueFound(uint8 surface, uint256 roleBitmap, address holderHint);
    error UnknownImplementation(address proxy, address implementation);
    function list(address registry, uint256 tokenId, address payToken, uint256 price) external returns (uint256 listingId);
    function settle(uint256 listingId, address buyerResolver) external;
    function check(uint256 listingId, address buyer, address buyerResolver) external view returns (bool clean, uint8 surface, uint256 roleBitmap);
}
```

**Go or no-go gate (hours 0 to 4).** On a Sepolia fork: register a name, give it a subregistry from the factory, transfer it with `safeTransferFrom`, and show the old owner can still `register` under it. Expected to pass from the docs. If ENS has added a transfer hook that moves subregistry roles, pivot to Moving Day on the same walker.

**Requirement checklist.**
- [x] R1: escrow and demo names on Sepolia; lens reads mainnet and Sepolia.
- [x] R2: the product is the ENSv2 control model (hierarchy, EAC, Permissioned Resolver, emancipation); nothing else is in it.
- [x] R3: every verdict is computed from chain state; the judge picks the name.
- [x] R4: hosted lens plus escrow UI.
- [x] R5: MIT repo with the invariant suite as an importable Foundry library.
- [x] Fresh build; public libraries only. No "won't place" item hit.
- [ ] Risk: naming real mainnet names that have residue. Show counts and the team's own names on stage; ask ENS how to handle findings (question 9).

**Why it beats rivals (Judgement).** No expected Mumbai entry looks at transfers; the agent registries and membership passes all assume control is where the token is. Residue uses the auditor writing that placed Herit, ENS Drive and Capsule, puts its refusal on the money path (the Batas pattern), and adds two things the new Explorer's "see who controls it" view does not claim: a check at transfer time and an escrow that enforces it.

**Closest prior winners.**
- [ENS Drive](https://ethglobal.com/showcase/ens-drive-qu2m2), Tokyo 2026 2nd: changed role lookup inside a registry, proved it. Residue audits control across contracts.
- [Herit](https://ethglobal.com/showcase/herit-i56y4), ETHOnline 2026 1st: hands names to heirs through EAC. Residue proves a hand-over left nothing behind.
- [SubnodeSymphony](https://ethglobal.com/showcase/subnodesymphony-91p6r) (New York 2023) and [rent.eth](https://ethglobal.com/showcase/rent-eth-asm1t) (Bangkok 2024): traded names in escrow without proving clean control.

**Stack.** Solidity and Foundry against `ensdomains/contracts-v2` on Sepolia; viem 2.35 or later; React. Partner prizes: ENS; optionally Arkiv "Mirror something Ethereum depends on" (mirror the ENSv2 role graph from `EACRolesChanged`, `Linked` and `ApprovalForAll` so anyone can query "every name where 0x... holds a role"; it costs the five `/arkiv/*.md` files). No EF prize fits honestly.

**Difficulty.** Medium. Walker and lens about 10 hours, escrow and invariants about 10, UI about 8, the rest buffer.

**Scores.**

| C | F | L | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 10 | 8 | 9 | 3 | 8 | 8 | **8.3** |

**Judge notes (Judgement).**
- ENS judge: "This is the question we would ask before buying a name on a marketplace this month. If the lens agrees with our Explorer and then goes further, we will use it."
- ENS judge: "Show the UNKNOWN state. A tool that never says 'I am not sure' is not a security tool."
- Veteran: "The escrow is the demo, the lens is the product. Do not let the UI eat the invariant suite's hours."

---

### Rank 2. Moving Day: a verified dry run of your v1 to v2 upgrade, records and subnames included

**Pitch.** Name upgrades to ENSv2 opened on 27 Oct. Per the migration docs, an upgrade clears the v1 resolver unless the name is locked, and v1 subnames that are not emancipated cannot migrate and must be re-registered in v2. Moving Day takes any mainnet `.eth` name, inventories every record and subname it has in v1, builds the v2 setup that reproduces them (a factory resolver initialized with the records, a subregistry with the subnames, links where records are shared), runs the whole upgrade on a mainnet fork, and prints a resolution diff before anyone signs.

**Falsifiable promise.** "For any mainnet name you type, our plan's post-upgrade resolution on a fork equals today's resolution for every record and every subname we found, or we list exactly which ones differ and why. The same plan, signed on mainnet, produces the same diff on the real chain."

**Demo moment (20 seconds).** A judge types a real mainnet name with subnames. The left column is "upgrade with an empty transfer payload": on the fork, the name's text records go blank and a subname stops resolving (or resolves somewhere else). The right column is Moving Day's plan on the same fork: every row green, with the transaction list that produced it. Then the README shows the tx hashes of one teammate's own name upgraded on mainnet with the same plan.

**How it works.**
- **Inventory:** token type and fuses from the BaseRegistrar and NameWrapper; records from the v1 resolver's events; subnames from v1 `NewOwner` and NameWrapper events, with labels from NameWrapper names or the ENS subgraph; unknown labels are listed, never guessed.
- **Baseline:** resolve every (name, record) pair through the Universal Resolver at block B on a mainnet fork.
- **Plan:** deploy the owner's Permissioned Resolver through the Verifiable Factory with `initialize(grants, calls)` carrying all records in one multicall; deploy a UserRegistry for the subnames and register each unemancipated subname to its v1 owner; use `linkToNode` where a subname shared the parent's records; rely on ancestor-resolver fallback only where v1 did the same; finally transfer the v1 token to the right migration controller with label, owner, resolver and subregistry in the transfer data.
- **Fork run and diff:** execute the plan on Anvil with the owner impersonated, resolve everything through `UniversalResolverV2`, and diff. Locked names get a fuse parity check against the docs' fuse-to-role table, plus `verifyContract` on the new WrapperRegistry.
- **Ship:** a hosted page (fork backend on a VPS), an exported transaction batch the owner signs in any wallet, and a re-run of the diff on mainnet after the real upgrade. Optional: the same command as an `ens-cli` style skill, the sponsor's "agent-native CLI" ([ens-cli](https://github.com/ensdomains/ens-cli)).

**Go or no-go gate (hours 0 to 4).** (a) On a mainnet fork, migrate one real unwrapped name through `UnlockedMigrationController` by impersonation and resolve it through `UniversalResolverV2`. (b) Confirm what a v1 unemancipated subname resolves to after its parent upgrades. If (a) fails because mainnet paths are not live, run on Sepolia only if Sepolia has a v1 to v2 path (question 1); otherwise pivot to Residue.

**Requirement checklist.**
- [x] R1: built on mainnet ENSv2 (migration controllers, Verifiable Factory, UserRegistry, Permissioned Resolver, Universal Resolver V2), with at least one real mainnet upgrade.
- [x] R2: the whole product is the ENSv2 upgrade; four named features carry it (subname registry, Permissioned Resolver, record linking, ancestor fallback).
- [x] R3: the judge picks any name; nothing is precomputed.
- [?] R4: hosted page with a fork backend. Whether a fork simulation counts as a "live demo" on mainnet is question 3; the real mainnet upgrade is the fallback evidence.
- [x] R5: MIT repo.
- [x] Fresh build. The teammate's own name pre-dates the event, but it is a user asset, not project code or design.
- [ ] Risk: ENS's own App may already copy records and recreate subnames. Question 2 decides whether this idea lives.

**Why it beats rivals (Judgement).** The obvious "migration helper" entries will wrap the controllers in a nicer form, which duplicates ENS's App. Moving Day is the only one that proves the upgrade preserved behaviour, covers subnames the controllers cannot move, and is checkable on any real name. It is a launch-week need for ENS itself, which matches the ENSPin precedent of building exactly what ENS needs ([ENSPin](https://ethglobal.com/showcase/enspin-ef1xz)).

**Closest prior winners.**
- [ENSPin](https://ethglobal.com/showcase/enspin-ef1xz), Taipei 2025 infrastructure prize: built the named infrastructure ENS asked for.
- [ENS Drive](https://ethglobal.com/showcase/ens-drive-qu2m2), Tokyo 2026 2nd: deep contract work with measured results.
- [Resolving ENS on L2](https://ethglobal.com/showcase/resolving-ens-on-l2-0a071), Brussels 2024 4th: resolution correctness across a structural change.

**Stack.** Anvil mainnet fork, Foundry scripts, viem, ENSjs 5.2.5 v2 wallet actions for the signed batch, a small Node backend, React. Partner prizes: ENS only. EF CROPS does not fit (no CROPS property is why it exists). Finalist track: strong, because the diff is a replayable fact on a judge-chosen name.

**Difficulty.** Medium to high. The inventory (labels and records from logs) is the time sink; cap record types at addresses, text, contenthash and ABI, and subnames at depth 2.

**Scores.**

| C | F | L | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 10 | 9 | 9 | 2 | 8 | 6 | **8.0** |

**Judge notes (Judgement).**
- ENS judge: "Upgrades are the thing we care most about this month. If the diff catches something our App misses, tell us before the demo, not on stage."
- ENS judge: "Do not claim our App breaks names unless the fork shows it. Say what your tool checks."
- Veteran: "Two teams will build a migration button. Lead with the diff, not the button, and have the mainnet tx hash in the README before Friday night."

---

### Rank 3. Quarantine: here is an agent's private key, try to do damage

**Pitch.** Agents as namespaces, built so that a stolen agent key is boring. Each agent is an expiring, revocable, non-transferable subname in the fleet's own registry, with its own Permissioned Resolver where the agent key may write two records and nothing else. Widening an agent's rights needs a fresh human World ID Agent Pass approval, enforced by a broker contract.

**Falsifiable promise.** "Here is agent A's private key. With it you can change exactly `agent-endpoint[mcp]` and `agent-context` on `a.fleet.<team>.eth`. Every other write, on any sibling, on the fleet's treasury name or on the parent, reverts, and no role can be widened without an unexpired human approval."

**Demo moment (20 seconds).** A judge scans a QR with agent A's Sepolia key and tries three writes from the page: repoint sibling B's endpoint, change the treasury `addr`, grant themselves `ROLE_SET_ADDRESS`. All three revert. Then the same key on the "one shared resolver" setup that most past entries used rewrites B's `agent-context`, because resolver roles have "no per-name scoping" ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver)). Finally an expired World ID approval leaves A's roles unchanged.

**How it works.**
- `FleetRegistry`: a UserRegistry from the Verifiable Factory; agents registered with an expiry (the lease), without `ROLE_CAN_TRANSFER_ADMIN` (non-transferable) and with `ROLE_UNREGISTER` kept by the owner (revocable).
- One Permissioned Resolver per agent, deployed by the fleet owner with a per-agent salt; `initialize(grants, calls)` writes ENSIP-25 `agent-registration[...]` and ENSIP-26 `agent-context` and `agent-endpoint[mcp]` records and scopes the agent key to those two keys ([ENSIP-25](https://docs.ens.domains/ensip/25/); [ENSIP-26](https://docs.ens.domains/ensip/26/)).
- `RoleBroker`: the only holder of admin roles; grants a wider role only with an EIP-712 attestation from the backend, which validates a fresh World ID Agent Pass result; short expiry and a nonce.
- Blast-radius view: for any key, every name and record it can change, computed by Residue's walker. A Foundry invariant checks that no sequence of agent-signed calls changes anything outside that agent's declared scope.

**Go or no-go gate (hours 0 to 4).** Deploy two factory resolvers from one owner on Sepolia and confirm the Universal Resolver and the ENS App resolve both; if per-agent resolvers are not supported, fall back to one resolver per agent owner account (each agent key owns its own name).

**Requirement checklist.**
- [x] R1: Sepolia (fleet parent optionally on mainnet).
- [x] R2: registry per fleet, EAC, per-agent Permissioned Resolvers and expiring, revocable, non-transferable names are the product.
- [x] R3: judges choose the writes live with a real key.
- [x] R4: hosted fleet console and attack page.
- [x] R5: MIT.
- [x] A: this idea is the bonus.
- [x] World Agent Pass (if stacked): denied path shown (expired approval), backend validation, integration debrief.
- [ ] Risk: the agent lane is saturated; without the live key handover this is the eleventh copy.

**Why it beats rivals (Judgement).** Rival agent entries assert scoping; this one hands over the key and lets judges try, and it shows the shared-resolver footgun beside the fix, which teaches ENS judges something true about ENSv2. It answers Batas's question, "what stops it, and where is the stop enforced", for ENS records.

**Closest prior winners.** [Capsule](https://ethglobal.com/showcase/capsule-yq59u) (ETHOnline 2026 runner-up: one-key heartbeat role, kill switch by revoke); [Relay](https://ethglobal.com/showcase/relay-abxnx) (Tokyo 2026 1st: delegation tree, simulated); [Ghost in the Machine](https://ethglobal.com/showcase/ghost-in-the-machine-x21o8) (Cannes 2026 agents 1st: agent state in text records). Unplaced: Leash Layer, ReputAI, Agent Grove, Fleet Naming Service ([H] section 3.1).

**Stack.** Solidity on Sepolia, Node backend for World ID validation, React console. Partner prizes: ENS + World "World ID Agent Pass" ($5,000 fresh). Third slot optional: 0G "Agents That Pay for Themselves" only if the agents really pay for their own inference.

**Difficulty.** Medium. Contracts about 12 hours, World ID backend about 6, console and blast-radius view about 8.

**Scores.**

| C | F | L | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 9 | 8 | 9 | 10 | 4 | 7 | **7.3** |

**Judge notes (Judgement).**
- ENS judge: "This is our bonus sentence done properly. We have seen the fleet registry many times; we have not been handed the key."
- World-minded veteran: "Make the expired-approval path a first-class screen, or World will not count it."
- Veteran: "Fund the demo key with a little Sepolia ETH only. Someone in the room will drain it for fun."

---

### Rank 4. Descriptor Desk: clear-signing descriptors whose authority is a frozen ENSv2 permission set

**Pitch.** ERC-7730 descriptors tell wallets what a transaction means, and today a lookalike descriptor is hard to tell from the real one. A protocol names its contract through ENSv2 reverse resolution and publishes its descriptor hash under `clear-signing.<protocol>.eth`, on a Permissioned Resolver whose permissions were frozen at `initialize`: the protocol's key can write only the descriptor data key, each named reviewer can write only its own review key, and nobody holds an admin role. A signer page shows "clear" only if that frozen set checks out on chain and the descriptor matches the contract's selectors and ABI types.

**Falsifiable promise.** "Swap in a descriptor that labels `transferFrom(victim, attacker, x)` as 'Claim rewards' and the signer shows MISMATCH. Try to add a fake reviewer to a real protocol's desk: there is no account that can grant the role, and the page proves it from `roleCount`."

**Demo moment (20 seconds).** The same calldata on two screens. Left: a descriptor from an unofficial source says "Claim rewards". Right: Descriptor Desk resolves the target contract's primary name to `clear-signing.demo-protocol.eth`, verifies the resolver implementation and its frozen permission set, finds no reviewer signatures on the swapped descriptor, and decodes the call as a transfer to an unknown address.

**How it works.**
- ENS side: `setData` data records (ENSIP-24) for the descriptor hash; key-scoped `ROLE_SET_DATA` for the protocol key and one key-scoped role per reviewer, all set in the `initialize` calls; no admin roles granted, so the set cannot change ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver)). Contract naming through `ContractNamer` and reverse resolution ([Deployments](https://docs.ens.domains/learn/deployments)).
- Verifier: `verifyContract` on the resolver; `roleCount(ROOT_RESOURCE)` shows zero admin holders; expected key-scoped holders match; descriptor selectors and parameter types match the contract's dispatcher and ABI.
- Shared with other sponsor files: the descriptor checker is the same component as EF's Truthsign and Arkiv's Clearsight (`track_ideas/ideas/ef.md`, `track_ideas/ideas/arkiv.md`), so one build can enter all three.

**Go or no-go gate (hours 0 to 4).** Initialize a factory resolver on Sepolia with two key-scoped roles and no admin holders, write one data record, and read it through the Universal Resolver. If data records or key-scoped data roles are not live, use text records holding the hash and say so.

**Requirement checklist.**
- [x] R1: Sepolia (mainnet for one demo protocol name if cheap).
- [~] R2: central only if the frozen permission set is the trust model and the page verifies it; otherwise it reads as a hash store (the npmguard and Aegis pattern).
- [x] R3: judges choose the calldata.
- [x] R4: hosted signer page.
- [x] R5: MIT.
- [x] A (optional): reviewer agents that each hold one key-scoped role and nothing more.

**Why it beats rivals (Judgement).** It ties ENSv2 to the most visible security story of the week (blind signing at WazirX; Trezor's ERC-7730 rollout falling back to blind signing when descriptors are missing, `00_season.md`), and it uses a property most teams will not notice: a resolver whose permissions can be frozen and verified. It is the Verdict.eth pattern (separated setter roles) applied to signing.

**Closest prior winners.** [Verdict.eth](https://ethglobal.com/showcase/verdict-eth-zsmpv) (ETHOnline 2026 3rd: auditor-only setter roles); [Aegis](https://ethglobal.com/showcase/aegis-p4gj2) (New York 2026 agents 1st: skill files pinned by hash in ENS); [npmguard](https://ethglobal.com/showcase/npmguard-aeihd) (Cannes 2026 creative 3rd: verdicts under ENS names).

**Stack.** TypeScript descriptor and ABI checker, Solidity setup scripts, React signer page. Partner prizes: ENS + Arkiv "Mirror something Ethereum depends on" (the ERC-7730 registry is CC0-1.0 per `track_ideas/ideas/arkiv.md`) + EF "Best CROPS App" (lead property: Secure). That uses all three slots.

**Difficulty.** Medium to high. Limit to two demo protocols and four functions; the ABI checker is the hard part.

**Scores.**

| C | F | L | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 7 | 8 | 8 | 3 | 7 | 6 | **6.9** |

**Judge notes (Judgement).**
- ENS judge: "The frozen resolver is the part we would quote. Put it in the first 30 seconds of the video, not the last."
- Veteran: "As a three-sponsor build it has the best expected value in this file; as an ENS entry alone it is fourth. Decide which you are optimizing before Thursday."

---

### Rank 5. Shelf: an issuer namespace where an expiring ENSv2 name is the investor's eligibility

**Pitch.** The issuer owns `issuer.eth`. The bond's canonical name `bond-2027.issuer.eth` is a forever name with no parent control that publishes the token address. Each investor holds an expiring, non-transferable subname under `kyc.issuer.eth`, issued by a KYC agent that can register and renew names and do nothing else. A Uniswap Continuous Clearing Auction validation hook and the bond token's transfer check both read that name on chain.

**Falsifiable promise.** "Revoke an investor's name, or let it expire, and their next bid or transfer reverts in the same block. The KYC agent's key can admit investors but cannot change the bond's address, anyone's records, or its own permissions; and nobody, including the issuer, can repoint `bond-2027.issuer.eth`."

**Demo moment (20 seconds).** Two investors bid in a live CCA on Sepolia. The issuer revokes `bob.kyc.issuer.eth`; Bob's next bid reverts with `NotEligible`. The KYC agent's key tries to repoint the bond name to a fake token and reverts; then the issuer's own key tries the same and reverts too.

**What changed from the draft.** The draft let the issuer keep `ROLE_SET_RESOLVER` on the bond name, so "records nobody can rewrite" was false. Now the bond name is registered in an emancipated registry without `ROLE_SET_RESOLVER` or `ROLE_SET_SUBREGISTRY`, its resolver is initialized with no writers, and the lens from Residue proves the "no parent control" claim. The wallet-side impersonation check and the CRE workflow are cut.

**How it works.**
- Issuer registries with separated duties: the KYC agent contract holds only `ROLE_REGISTRAR` and `ROLE_RENEW` on the `kyc` registry; the issuer keeps `ROLE_UNREGISTER`; investor names withhold `ROLE_CAN_TRANSFER_ADMIN` ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)).
- CCA validation hook `validate(maxPrice, amount, owner, sender, hookData)` and an ERC-20 transfer check, both reading owner, state and expiry of the investor's label (signature from `track_ideas/ideas/uniswap.md`, citing the CCA technical documentation).
- Bonus: the KYC agent is a namespace with a single role, so a prompt-injected KYC agent can at worst admit a name, visibly and revocably.

**Go or no-go gate (hours 0 to 4).** Create one CCA through the Sepolia factory with a custom validation hook and fill one bid; register one expiring, non-transferable subname. If the CCA fails, keep the ENS mechanism and gate a plain ERC-20 transfer only (and lose the Uniswap stack).

**Requirement checklist.**
- [x] R1: Sepolia (ENSv2 and the CCA factory both listed there).
- [x] R2: eligibility is the ENSv2 name state; expiring, revocable, non-transferable and forever names plus EAC separation are the mechanism.
- [x] R3: live bids and revocations.
- [x] R4: hosted auction page.
- [x] R5: MIT.
- [x] Uniswap (if stacked): `FEEDBACK.md`, the Developer Feedback Form, README line pointers.

**Why it beats rivals (Judgement).** It is ENS's own "issuers organize products under names they control" direction from the launch post, with four named lifecycle features each doing a job. The weakness is novelty: it is the Kura shape with a name instead of World ID, and the Uniswap judges list "CCA gated launchpad" among their obvious entries.

**Closest prior winners.** [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026: World ID-gated CCA, ENSv2 card names; ENS 3rd, Uniswap 1st, finalist); [Verdict.eth](https://ethglobal.com/showcase/verdict-eth-zsmpv) (separated setter roles for RWAs). Unplaced: Seikyu and NameGate ([H] section 3.1).

**Stack.** Solidity and Foundry fork tests against the real CCA factory, viem, React. Partner prizes: ENS + Uniswap Foundation "Build with Uniswap" ($10,000). No EF prize. Whitechain Tokenize does not fit: ENSv2 lives on Ethereum and a Whitechain contract cannot read it.

**Difficulty.** High even after cuts: registries, a hook, a token and an auction.

**Scores.**

| C | F | L | A | Nov | Fea | Overall |
|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 5 | 6 | 6 | **6.8** |

**Judge notes (Judgement).**
- ENS judge: "The forever bond name is the most interesting line. Lead with the issuer failing to repoint its own product."
- Veteran: "Two sponsors' worth of contracts in 36 hours. Only pick this if the Uniswap prize is the main target."

---

## 6. Track combination pass (Judgement)

Rules (sourced: [event page FAQ](https://ethglobal.com/events/mumbai), [details page](https://ethglobal.com/events/mumbai/info/details), [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), [Arkiv prizes](https://ethglobal.com/events/mumbai/prizes/arkiv)): at most 3 partner prizes; a partner with several tracks counts as one; the EF places a project in at most one EF prize; the ETHGlobal finalist track is separate and does not count; Arkiv pays at most one Arkiv track per team (plus the Swarm bonus). Partner prizes are judged only from the repo, README and video.

| Build | Partner picks | EF prize | Extra submission work | Finalist fit |
|---|---|---|---|---|
| Residue | ENS (+ Arkiv Mirror) | none | five `/arkiv/*.md` files if Arkiv | Strong: a refusal on stage and a judge-chosen name |
| Moving Day | ENS | none | none beyond the README | Strong if the fork diff finds a real difference |
| Quarantine | ENS + World Agent Pass (+ 0G only if agents pay) | none | World integration debrief | Medium: crowded theme, saved by the key handover |
| Descriptor Desk (with Clearsight and Truthsign) | ENS + Arkiv Mirror + EF | CROPS App (Secure) | Arkiv files, CROPS README section (C, O, P, S), video of 3 minutes max | Strong, through the EF framing |
| Shelf | ENS + Uniswap | none | `FEEDBACK.md`, feedback form, line pointers | Medium |

ENS as the second or third slot of an idea led by another sponsor (from the other judged files):
- EF A5 Hush (Anon-RPC private ENSv2 resolution with a role-scoped rotating address): EF + ENS (`track_ideas/ideas/ef.md`). ENS centrality depends on the rotation role being visible.
- 0G Hire Board (sellers' `price` and `model` records editable only by their own key): 0G + ENS (`track_ideas/ideas/0g.md`).
- Definitive Desk (a trading desk as an ENSv2 name with expiring seats): Definitive + ENS (`track_ideas/ideas/definitive.md`).
- World draft A4 Payee Lock (agent manages a merchant's name, `addr` changes need Agent Pass): World + ENS (`track_ideas/ideas_draft/world.md`). Close to Quarantine; do not build both.
- Plan E's ENSv2 release-namespace mode (`plans/E_verified_frontend.md`): keep its go/no-go; Residue's lens can audit that namespace for free.

Combos to avoid (Judgement):
- **ENS + Whitechain or ENS + Arc:** ENSv2 is on Ethereum only; a contract on those chains cannot read it, so ENS would be a frontend lookup (cosmetic).
- **ENS added to Plans A, B, C or D:** each plan's own review already rejected ENS as cosmetic (`plans/A_verified_anon_reads.md`, `plans/B_dapp_leak_report.md`, `plans/C_private_invoicing_whitechain.md`, `plans/D_alt_mempool.md`).
- **Residue and Moving Day merged:** they share a walker, but two stories in four minutes dilute both. Pick one and mention the other as "also ships".

Workshop logistics (sourced, [event page](https://ethglobal.com/events/mumbai)): ENS (16:00, Room 1) clashes with Arkiv (16:00, Room 2). For the Residue plus Arkiv or Descriptor Desk combos, send one person to each. ENS does not clash with World (17:30, Room 1), Uniswap (16:30, Room 1) or EF (17:00, Room 2).

---

## 7. ENS's top 3 overall

1. **Residue (8.3).** The highest centrality and the best fit for a security team: it answers "who still controls this name after a sale", a question that only exists because of ENSv2's split between token, subregistry and resolver, and it enforces the answer in an escrow. The docs already confirm the residue, so the main risk is gone; the walker it needs is reused by ideas 2 and 3.
2. **Moving Day (8.0).** The most timely idea: name upgrades opened on 27 Oct, and the docs say upgrades clear v1 resolvers and leave unemancipated subnames behind. It is checkable on any real mainnet name. Ranked second only for feasibility and because the ENS App may already cover part of it (workshop question 2). If the App does not carry records and subnames, it becomes the 1st place favourite.
3. **Quarantine (7.3).** The best answer to the agent bonus. It survives a saturated lane only because judges hold the key and see the shared-resolver footgun, and it stacks cleanly with World Agent Pass.

Best multi-sponsor alternative: Descriptor Desk with Arkiv Clearsight and EF Truthsign as one build (6.9 here, but three prizes in reach).

---

## 8. Questions for the ENS workshop and booth

Workshop: Thu 5 Nov 16:00 to 16:20 IST, Workshop Room 1, "ENSv2 - Identity for Apps, Agents & Beyond", Yash Goyal (ENS Labs) ([event page](https://ethglobal.com/events/mumbai)). Ask in the ETHGlobal Discord ENS channel now and at the booth before 21:00 IST. Most decisive first.

1. **What is live where:** on mainnet this week, are .eth registration, name upgrades through `UnlockedMigrationController` and `LockedMigrationController`, factory resolvers and UserRegistries, `linkToNode`, data records and `ContractNamer` all live? The deployments page still says "Until the launch completes, resolution and registrations on Mainnet continue through the ENSv1 contracts" ([Deployments](https://docs.ens.domains/learn/deployments)). Is there any v1 to v2 upgrade path on Sepolia, given the Sepolia v1 contracts "are no longer in use"?
2. **The App's upgrade flow (decides Moving Day):** when someone upgrades in the ENS App, does it copy the v1 resolver's records into the new resolver, and does it re-register unemancipated v1 subnames in a new subregistry? After a parent upgrades, what does an unmigrated v1 subname resolve to? Would ENS welcome a fork-verified dry run, or see it as duplicating the App?
3. **What counts as the "live demo" and as "built on mainnet":** is a hosted page that runs a mainnet-fork simulation acceptable, or must every write happen on mainnet or Sepolia? Are mainnet and Sepolia builds judged equally?
4. **Transfer residue (decides Residue):** after `safeTransferFrom`, the seller can keep root roles on the name's subregistry and the name can keep pointing at the seller's resolver. Is there an intended clean hand-over flow, and does the Explorer already show subregistry root holders and key-scoped resolver holders? Would a transfer-time checker and escrow be useful to you?
5. **Central or cosmetic for analysis tools:** does a project that inspects and enforces ENSv2 state (Residue, Moving Day) count as "built on ENSv2" if most of its contracts are ours and the names are users', or do judges expect the team to deploy its own registry or resolver as the core?
6. **Agent bonus:** how much weight does it carry relative to the main criteria? Should agents use ENSIP-25 and ENSIP-26 records, and which ERC-8004 registry on Sepolia should ENSIP-25 point to?
7. **Per-agent resolvers (Quarantine):** is one owner deploying several Permissioned Resolvers through the Verifiable Factory (different salts) supported by the Universal Resolver, the App and the Explorer?
8. **Frozen permission sets (Descriptor Desk, Shelf):** is a resolver initialized with key-scoped roles and no admin holders a supported pattern? Are ENSIP-24 data records and key-scoped `ROLE_SET_DATA` live on mainnet, and with what size limits?
9. **Disclosure:** if our walker finds unexpected control on a real, valuable name, or a migration that misresolves, what path does ENS want, and may we show real mainnet names in the demo and README?
10. **Canonical implementations:** which addresses should `verifyContract` results be compared against (`UserRegistryImpl`, `WrapperRegistryImpl`, `PermissionedResolverImpl`), are they identical in role on Sepolia and mainnet, and where is the list of implementations `RegistryUpgradeSet` approves for WrapperRegistry?
11. **Indexing:** is there an official indexer or subgraph for `EACRolesChanged` and links, so role holders per name can be listed without scanning logs ourselves?
12. **Tokens and testnets:** is there a faucet or a free path to Sepolia .eth names for teams, and is the Sepolia `MockUSDC` mintable by anyone for demo payments?
13. **SDK:** is ENSjs 5.2.5 with v2 wallet actions the recommended write path, and does viem 2.35 or later walk v2 subregistries fully for reads ([ENSv2 readiness](https://docs.ens.domains/web/ensv2-readiness))?
14. **Judging mechanics:** do judges run the live demo or read only the README and video, will they verify contract addresses on chain, and is a booth presentation required (it was at Taipei 2025 and Cannes 2026, [H] section 1)?

---

## 9. Gaps and caveats

- No Mumbai ENS judges are named (`00_current_tracks.md`); "what judges reward" is inferred from past winners in [H], whose summaries are self-reported.
- Not verified from here: whether mainnet migration controllers accept upgrades today (the blog says yes, the deployments page lags), what the ENS App does with records and subnames during an upgrade, and what an unmigrated v1 subname resolves to after its parent upgrades. Each idea names its gate.
- The residue claim in Residue rests on the docs' transfer text; the hour 1 fork test is still required.
- ENSv2 docs were read on 2026-10-31 and may change during launch week.
- ETHGlobal pages were not re-fetched; the verbatim track text is the 2026-10-31 snapshot in `00_current_tracks.md`.
