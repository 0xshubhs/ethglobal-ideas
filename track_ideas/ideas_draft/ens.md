# ENS ideas for ETHGlobal Mumbai: Best Use of ENSv2 ($7,000)

Draft of 2026-10-31. Fresh builds only (Classic track): every idea starts after Thu 5 Nov 21:00 IST from public libraries (`ensdomains/contracts-v2`, viem, ENSjs, Foundry) and nothing else. The Continuity twin is ignored. History and sources: `track_ideas/history/ens.md` (cited below as [H §n]). Verbatim track text: `track_ideas/00_current_tracks.md`.

## The track in one screen

- **Prize:** $7,000; 1st $3,000, 2nd $2,000, 3rd $1,000, 3rd $1,000 ([ENS prizes](https://ethglobal.com/events/mumbai/prizes/ens)).
- **Verbatim requirements** (numbered so each idea can answer them):
  - R1 "Project must be built on ENSv2 on Ethereum mainnet or Sepolia."
  - R2 "ENSv2 features should be central to the product, not a cosmetic add-on."
  - R3 "Your demo must be functional and not just include hard-coded values."
  - R4 "your project showcase must have a link to a live demo"
  - R5 "the code needs to be open source and accessible on Github or a similar platform."
  - Bonus B: "Bonus points if you bring AI agents into the mix. Think agents as namespaces, each with their own identity and permissions."
- **Won't place:** W1 a cosmetic add-on; W2 hard-coded values; W3 (implied by R4) a video with no live link.
- **Feature checklist ENS names in the description:** wildcard resolution, subname registries, Enhanced Access Control (EAC), Permissioned Resolver, record aliasing, namespace aliasing, expiring, revocable, non-transferable and transferable names, forever names with no parent control.

**What placed before (from [H §3.1]).** Of about 90 ENSv2 entries at ETHOnline and Tokyo 2026, 8 placed. Winners put the ENSv2 rule on the path an attacker cannot skip (Batas, Capsule, Herit), extended ENSv2 itself with proofs (ENS Drive), or used one ENSv2 property for its exact reason inside a strong product (Kura, Tide, Verdict.eth). More than ten "agent subname with scoped, revocable records" entries lost; only Capsule placed, as runner-up. Relay took 1st at Tokyo with a clear delegation tree and, by its own page, "no ENS contracts" integrated. **Judgement:** do not count on that leniency now that mainnet is live.

---

## Idea 1. Residue: buy an ENSv2 name and inherit nobody (narrow entry, tuned to ENS judges)

**Pitch.** A checker and an escrow for ENSv2 names and subnames. Before you pay, it lists every key that could still change where the name resolves, what sits under it, or the code that holds it. The escrow settles only when that list is just the buyer.

**Falsifiable promise.** "If `settle()` succeeds, no address except the buyer can change this name's records, its subnames, or the contracts behind either. Try it: every attempt reverts."

**20 second demo moment.** The seller lists `shop.<team>.eth` on Sepolia. A judge clicks Buy, and `settle()` reverts with `ResidueFound(resolver, ROLE_SET_ADDRESS, 0xSeller2)`: a second seller key still holds the address role on the seller's Permissioned Resolver. The seller revokes it and settlement goes through. The old seller then calls `setAddress` on the name, and the call fails on screen.

**Why the gap exists (sourced facts, then judgement).**
- Resolver write roles are separate from ownership: "Name ownership alone does not grant those roles" ([app developers](https://docs.ens.domains/ensv2/tutorial-app-developers/)). Every account gets "its own Permissioned Resolver proxy" ([overview](https://docs.ens.domains/ensv2/overview/)), and a resolver role "can write the covered records on every name served by the resolver instance" ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver/)).
- A subname with no resolver of its own "is served by the closest ancestor resolver" (app developers). Unlinked names fall back to "the default record" of root name 0x00 (Permissioned Resolver).
- `safeTransferFrom` guards only two cases: `TransferUnsafeUntilRegistryIsEmancipated` and `TransferUnsafeWithMultipleAssignees`. Operator approval is "all-or-nothing". You "rely on isEmancipated() only after verifying which implementation the registry runs: an arbitrary contract can simply always return true". "True emancipation requires the entire chain from root down to be secured" ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)).
- EAC reports how many accounts hold a role (`roleCount`) but not which accounts. Holders have to be rebuilt from `EACRolesChanged` events ([EAC](https://docs.ens.domains/ensv2/enhanced-access-control/)).
- **Judgement:** a buyer receives the token and its token roles. The previous owner can still keep resolver roles, root roles on the name's subregistry (including `ROLE_UPGRADE` on a UUPS UserRegistry), operator approvals, and control through any ancestor that is not emancipated. Nothing in the transfer checks these. **Gate G1 (Fri 01:00 IST):** reproduce this on Sepolia in a Foundry fork test. If ENS already blocks it, pivot to Idea 5.

**What we build.**
1. `ResidueLens` (Solidity view contract plus a TypeScript walker). It walks root to leaf with `getSubregistry` and `getParent`. It checks each registry's ERC-1967 implementation against the canonical `UserRegistryImpl` and Verifiable Factory deployment ([deployments](https://docs.ens.domains/learn/deployments/)). It rebuilds role holders from `EACRolesChanged` and checks them against `roleCount`: if the counts disagree, the verdict is UNKNOWN, never SAFE. It also lists resolver root roles and `ROLE_UPGRADE`, records linked to other names, default-record fallback, `ApprovalForAll` operators, and ancestors that are not emancipated.
2. `CleanHandover` escrow (USDC on Sepolia). Settlement calls `safeTransferFrom`, then asserts the post-conditions on chain: the resolver is a fresh factory proxy whose only role holder is the buyer (or the buyer's own resolver); the subregistry is empty or held only by the buyer; there are no other assignees; and the ancestors are emancipated. If any check fails, it reverts with a typed error.
3. A web page that takes any mainnet or Sepolia name and shows "who can change what", with each line linked to the event that proves it.
4. A Foundry invariant suite. The handler grants random roles, links, operators and subregistries, then settles. The invariant: after a successful settle, the set of accounts able to change `addr(name)` is exactly the buyer.

**Requirements.** R1: reads mainnet names live; the escrow and its demo names are on Sepolia (or mainnet with one cheap name). R2: the whole product is about the ENSv2 hierarchy, EAC and the Permissioned Resolver, with nothing else in it. R3 and W2: every verdict is computed from chain state and events; the judge picks the name. R4: hosted lens with the escrow UI. R5: MIT repo. B (optional): a buyer agent that refuses to pay until the lens returns CLEAN.

**Why ENS judges would pick it.** It is the only entry that makes mainnet ENSv2 safer in its launch week. It uses the "audit writing" winners showed (Herit, ENS Drive, Capsule) [H §3.1, judgement 4]. Its refusal sits on the money path, the Batas pattern. Rivals will be agent registries. The ENS Explorer "see who controls it" view ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)) shows current control. Residue adds the transfer-time check, the escrow that enforces it, and the implementation check that `isEmancipated()` alone cannot give.

**Closest past entries.** SubnodeSymphony (NY 2023, escrowed subname auctions) and rent.eth (Bangkok 2024 rentals) traded names but did not prove clean control. ENS Drive (Tokyo 2nd) changed role lookup and did not audit residue. Herit handed names to heirs. The twist: verified post-conditions at transfer, across resolver, subregistry, upgrade roles and ancestors.

**Stack options (at most 3 partners, at most 1 EF prize).** ENS, plus Arkiv "Mirror something Ethereum depends on" (mirror the ENSv2 role graph from `EACRolesChanged`, `Linked` and `ApprovalForAll` events into Arkiv, so anyone can query "names where 0x... holds any role"; that is public chain data, and the repo must link its license status), plus optionally EF "Best CROPS App" (lead property S, secure). Do not add a third partner: the Arkiv paperwork (`/arkiv/*.md`) already costs time.

**Difficulty for 36 hours.** Medium. The walker and lens take about 10 hours, the escrow and invariants about 10, the UI about 8. The rest is buffer and G1.

**Team fit.** Excellent. It is an audit turned into a product, built mostly in Foundry, plus one React page.

---

## Idea 2. Quarantine: agents as namespaces, and we hand the judges an agent's private key (stacks with World ID Agent Pass)

**Pitch.** Each agent gets a subname, its own Permissioned Resolver and a lease. A compromised agent key can change exactly the records it was given, and nothing else. Any attempt to widen its rights needs a fresh human World ID approval, checked on chain.

**Falsifiable promise.** "Here is agent A's private key (QR on screen). With it you can change exactly two records: `agent-endpoint[mcp]` and `agent-context` on `a.fleet.eth`. Every other write, on any sibling, the treasury name or the parent, reverts."

**20 second demo moment.** A judge scans the QR and tries three writes from the explorer page: repoint sibling B's endpoint, change the fleet's treasury `addr`, and grant themselves `ROLE_SET_ADDRESS`. All three revert. Then the naive setup, one shared resolver as in many past entries, lets the same key rewrite B's `agent-context`. That follows from the docs: "There is no per-name scoping" ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver/)).

**What we build.**
1. `FleetRegistrar` over a UserRegistry, using the managed pattern ([registry template](https://docs.ens.domains/ensv2/registry-template/)). Each agent name is non-transferable (`ROLE_CAN_TRANSFER_ADMIN` withheld), expires as a lease, and can be revoked by the owner (`ROLE_UNREGISTER`).
2. One Permissioned Resolver per agent from the Verifiable Factory. `initialize(grants, calls)` sets the starting records, and `grantSetterRoles` scopes the agent to two text keys ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver/)). ENSIP-25 and ENSIP-26 records are filled ([ENSIP-25](https://docs.ens.domains/ensip/25/); [ENSIP-26](https://docs.ens.domains/ensip/26/)).
3. `RoleBroker`, the only holder of admin roles. It grants a wider role only when given an EIP-712 attestation from our backend, which validates a fresh World ID Agent Pass result. The attestation has a short expiry and a nonce, the pattern Herit used for liveness [H §3.1].
4. A "blast radius" view: for any key, list every name and record it can change. A Foundry invariant checks that for any sequence of calls signed by an agent key, nothing outside that agent's declared scope changes.

**Requirements.** R1: Sepolia (the fleet parent on mainnet is optional). R2: a registry per fleet, EAC, a Permissioned Resolver per agent, and expiring, revocable, non-transferable names are the product. R3: judges choose the writes live. R4: hosted explorer and fleet console. R5: MIT. B: this idea is the bonus.

**Why ENS judges would pick it over rivals.** Rival agent entries assert scoping. This one hands over the key and lets the judges try, and it shows the shared-resolver footgun next to the fix, which teaches something about ENSv2. It answers Batas's question, "what stops it, and where is the stop enforced?" ([Batas](https://ethglobal.com/showcase/batas-ns7pr)), for ENS records.

**Closest past entries and the twist.** Capsule (ETHOnline runner-up: one-key heartbeat role, kill switch by revoke), ReputAI, Agent Grove and Leash Layer (ETHOnline, scoped agent records, unplaced), Ghost in the Machine (Cannes 2026, state in text records). The twist has three parts: one resolver per agent as a structural fix, an adversarial live demo with the real key, and widening that is gated by a human on chain. **Risk (Judgement):** the agent-permission lane is crowded [H §3.1]; without the live key handover this becomes the eleventh copy.

**Stack options.** ENS plus World "World ID Agent Pass" ($5,000, fresh). It requires "a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur", backend validation, and an integration debrief (`00_current_tracks.md`); an expired attestation that leaves the role unchanged covers this. Third slot optional: 0G "Agents That Pay for Themselves" only if the agents really pay. No EF prize fits naturally.

**Difficulty.** Medium. Contracts take about 12 hours, the World ID backend about 6, the explorer and blast-radius view about 8.

**Team fit.** Good. The adversarial framing and invariants are the team's strengths; the World ID backend is ordinary TypeScript.

---

## Idea 3. Shelf: an issuer namespace for a tokenized bond, where an ENSv2 name is the investor's eligibility (stacks with Uniswap CCA)

**Pitch.** The issuer owns `issuer.eth`. The bond's canonical name `bond-2027.issuer.eth` publishes its token address on each chain in records nobody can rewrite. Each investor holds an expiring, non-transferable subname under `kyc.issuer.eth`, issued by a KYC agent that can register names and do nothing else. A Uniswap Continuous Clearing Auction and the bond token both check that name on chain.

**Falsifiable promise.** "Revoke an investor's name, or let it expire, and their next bid or transfer reverts in the same block. The KYC agent's key can admit investors but cannot change the bond's address or anyone's records."

**20 second demo moment.** Two investors bid in the live CCA on Sepolia. The issuer revokes `bob.kyc.issuer.eth`, and Bob's next bid reverts with `NotEligible`. Then the KYC agent's key tries to repoint `bond-2027.issuer.eth` to a fake token, and that reverts too.

**What we build.**
1. An issuer UserRegistry with separated duties. The KYC agent contract holds only `ROLE_REGISTRAR` and `ROLE_RENEW` on `kyc.issuer.eth`. The issuer keeps `ROLE_UNREGISTER`. Investor names withhold `ROLE_CAN_TRANSFER_ADMIN` ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry)).
2. The bond's canonical name gets a resolver with no writers, sealed after `initialize` ("The calls array is executed as a multicall during initialization, with role checks skipped", [Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver/)). It carries ENSIP-11 addresses per chain plus a document hash.
3. A CCA validation hook (Kura used one to admit only World ID bidders, [Kura](https://ethglobal.com/showcase/kura-so3wx)) and an ERC-20 transfer check. Both read `getState`, owner and expiry of the investor's label in the KYC registry.
4. A wallet-side check: "is this token the one `bond-2027.issuer.eth` names?" This catches impersonation, which ENS's own blog raises: "An issuer could organize its products under names it controls" ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)).
5. Bonus B: the KYC agent is a namespace with a single role, so a prompt-injected KYC agent can at worst admit a name, and every admission is visible and revocable.

**Requirements.** R1: Sepolia (the CCA and ENSv2 are both there). R2: eligibility is the ENSv2 name state; expiring, revocable and non-transferable names plus EAC separation are the mechanism. R3: live bids and revocations. R4: hosted auction page. R5: MIT.

**Why ENS judges would pick it.** It is ENS's own "naming everything" example made real in launch week, with three named lifecycle features each doing a job. It matches Kura (Tokyo: Uniswap 1st, ENSv2 3rd, finalist) and Verdict.eth (ETHOnline 3rd, separation of setter roles).

**Closest past entries and the twist.** Kura (World ID-gated CCA, ENS card names); Verdict.eth (RWA profiles, auditor-only roles, no enforcement in settlement); Seikyu and NameGate (unplaced: invoice or bond state on ENSv2 names; NameGate enforced on Hedera). The twist: the name is the eligibility, enforced in the auction and the token on the same chain, with the KYC agent's limits proven.

**Stack options.** ENS plus Uniswap Foundation "Build with Uniswap" ($10,000: needs `FEEDBACK.md`, the feedback form, and a README pointing at contract lines). Optional third: Chainlink "Best workflow with CRE" if the KYC agent runs as a CRE workflow, which the Mumbai CRE prize accepts as a CLI simulation (`00_season.md`). No EF prize. Whitechain Tokenize does not fit, because ENSv2 lives on Ethereum and a Whitechain contract cannot read it (Judgement).

**Difficulty.** High. A CCA plus hook plus token plus registries is a lot for 36 hours; cut the wallet check first.

**Team fit.** Good for DeFi and Solidity, with fork tests against the real CCA as Kura did.

---

## Idea 4. Descriptor Desk: clear-signing descriptors published under the protocol's own ENSv2 name, with auditors on separate keys (stacks with Arkiv and EF CROPS)

**Pitch.** ERC-7730 descriptors tell hardware wallets what a transaction means, and today nobody checks them against the code. A protocol names its contracts through ENSv2 reverse resolution. It publishes the descriptor hash in a data record under `clear-signing.<protocol>.eth`, which only its security key can write. Independent reviewers each hold their own key-scoped role to attest. A signer page refuses to show "clear" unless the descriptor resolves, matches the contract's selectors and ABI types, and carries the reviews the user requires.

**Falsifiable promise.** "Swap in a descriptor that labels `transferFrom(victim, attacker, x)` as 'Claim rewards' and the signer shows MISMATCH: the label's selector and parameter types are checked against the contract, and the swapped descriptor has no review signature."

**20 second demo moment.** The same calldata on two screens. On the left, a lookalike descriptor from an unofficial source says "Claim rewards". On the right, Descriptor Desk resolves the target's ENSv2 primary name to `clear-signing.demo-protocol.eth`, finds the reviewer attestations missing, and decodes the call as a transfer to an unknown address.

**What we build.** Data records via `setData` (ENSIP-24), with `ROLE_SET_DATA` scoped to single data keys by `grantSetterRoles`. Protocol and reviewer roles are separated ([Permissioned Resolver](https://docs.ens.domains/ensv2/permissioned-resolver/)). Contract naming uses `ROLE_CAN_NAME` and reverse resolution, and the Universal Resolver already checks that a primary name forward-resolves back ([app developers](https://docs.ens.domains/ensv2/tutorial-app-developers/)). The verifier is the team's own code: it checks selectors against the bytecode dispatcher, ABI types against descriptor paths, and the review set. An Arkiv mirror of every published descriptor and review makes them filterable by protocol, selector and reviewer.

**Requirements.** R1: Sepolia (mainnet for one real demo protocol name if cheap). R2: the per-key scoped roles and contract reverse names are the trust model. R3: live calldata chosen by the judges. R4: hosted signer page. R5: MIT. B: optional reviewer agents holding one data-key role each, and nothing more.

**Why judges would pick it.** It ties ENSv2 to the most visible security story of the week: blind signing (WazirX 2024), plus Trezor shipping ERC-7730 on 8 Sep 2026 with descriptors that are "falling back to blind signing" when missing (`00_season.md`). It is the separation-of-duties pattern that placed Verdict.eth, applied to signing.

**Closest past entries and the twist.** Verdict.eth (auditor-scoped roles for RWAs), Aegis (NY 2026 agents 1st: skill files pinned by hash in ENS, reviewed by an LLM), npmguard (verdicts under ENS names), ENShell (finalist using Ledger clear signing, no ENS-based verification). The twist: the descriptor's authority comes from the contract's own ENSv2 name and per-key EAC roles, and the semantics are checked against the code.

**Stack options.** ENS, plus Arkiv "Mirror something Ethereum depends on" ($4,000; descriptors are public data, so check the registry's license), plus EF "Best CROPS App" (lead property S). Partners: ENS, Arkiv, EF, which is exactly 3.

**Difficulty.** Medium to high. The ABI and descriptor checking is the hard part, so limit it to 2 demo protocols and 4 functions.

**Team fit.** Very good. Reading bytecode and ABIs is audit work.

---

## Idea 5. RegistryLint: a property suite and onchain badge for custom ENSv2 registries and resolvers (narrow entry, dev tooling)

**Pitch.** ENSv2 invites everyone to subclass `PermissionedRegistry` (ENS Drive did; registrars and gates did). RegistryLint forks the chain, runs a generic invariant suite against any deployed registry or resolver, and shows a counterexample trace. It writes the result to a sealed record under `<registry>.lint.eth`, so apps can check whether a registry passed before trusting it.

**Falsifiable promise.** "Paste any ENSv2 registry address. In under 2 minutes you get either PASS on N named properties, or a replayable transaction sequence that breaks one."

**20 second demo moment.** The team deploys a deliberately buggy subclass live: it re-grants an admin role after registration. RegistryLint prints the four-call sequence that escalates `ROLE_SET_RESOLVER_ADMIN`, replays it on the fork, and the badge record turns red.

**Properties, all taken from the docs ([Permissioned Registry](https://docs.ens.domains/ensv2/permissioned-registry); [EAC](https://docs.ens.domains/ensv2/enhanced-access-control/)).**
- Admin roles on names can only be granted at registration.
- A role change regenerates the token ID, so stale approvals fail.
- `isEmancipated()` agrees with `roleCount(ROOT_RESOURCE)` for the dangerous roles, and the implementation is a known one.
- A transfer moves roles atomically, and other holders are unaffected.
- `unregister` burns the token and bumps both version counters.
- A stale token ID's `ownerOf` is zero.
- Hooks fail closed on undecodable returns (ENS Drive found that Solidity's try/catch misses these, [ENS Drive](https://ethglobal.com/showcase/ens-drive-qu2m2)).
- The 15-holder cap cannot be used to block an owner's legitimate grant.

**Requirements.** R1: reads Sepolia and mainnet deployments, and badges are written on Sepolia. R2: the product is about the ENSv2 contracts, and publishes its results through a resolver with no writers. R3: any address can be submitted live. R4: hosted runner page. R5: MIT, with the suite as a Foundry library others can import.

**Why ENS judges would pick it.** ENS has paid for infrastructure before (Taipei "Best ENS Infrastructure": ENSPin; London open-source library prize) [H §1]. ENS Drive placed 2nd partly for its Halmos proof and differential fuzzing. ENS is in its "refinement, security fixes" phase ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet)).

**Closest past entries and the twist.** ENS Drive (proved one subclass), ENSPin (infra), ENS Bounties (library work). Nobody built a reusable checker for every registry. **Risk (Judgement):** "Best Use" judges may rank a developer tool below a product; Relay's 1st place suggests a product story matters. Disclose any finding in a public hackathon repo to its authors before the demo.

**Stack options.** ENS only (narrow). Arkiv "Node tooling" does not fit: it is about Arkiv's own nodes (slow query finder, measurement harness, `00_current_tracks.md`). Arkiv "Build on Arkiv (from scratch)" could fit only if apps really read the lint results from Arkiv, which adds four rubric files for little gain. No EF prize.

**Difficulty.** Medium. The property suite takes about 14 hours, the fork runner about 8, the badge resolver and page about 6.

**Team fit.** The best fit of the five for fuzzing skills. The weakest finalist story.

---

## Ranking and recommendation (Judgement)

| Rank | Idea | ENS fit | Finalist potential | Stack value | Risk |
|---|---|---|---|---|---|
| 1 | Residue | Highest: new, launch-week, security-native | High (a refusal plus a judge-chosen name) | Arkiv Mirror, optional CROPS | G1: if the residue does not exist, pivot to 5 |
| 2 | Shelf | High (Kura and Verdict patterns, ENS's own RWA example) | High | Uniswap $10,000 | Scope |
| 3 | Descriptor Desk | High | Medium to high | Arkiv plus EF CROPS | ABI and descriptor checking scope |
| 4 | Quarantine | Medium (crowded lane, saved by the live key) | Medium | World Agent Pass | Looks like Capsule unless the handover is the centre of the demo |
| 5 | RegistryLint | Medium | Low | Little | Tool versus product judging |

- **Narrow entry tuned only to ENS:** Residue (or RegistryLint).
- **Natural stack with another sponsor:** Shelf (Uniswap), Quarantine (World), Descriptor Desk (Arkiv plus EF).
- **Existing plans:** plan E (SameBuild) already holds an ENSv2 release-namespace mode as a stretch with a Fri 12:00 go/no-go (`plans/E_verified_frontend.md` §2.2). It is not repeated here. If the team runs plan E, Residue's lens can audit E's release namespace for free.

## Track combo pass (how the ENS prize sits with others, within the 3-partner cap)

| Combo | Partner picks (max 3) | EF prize (max 1) | Extra paperwork | Notes |
|---|---|---|---|---|
| Residue | ENS, Arkiv (Mirror) | optional CROPS (S) | `/arkiv/schema.md`, `friction.md`, `reach.md`, `why-arkiv.md`, `data-quality.md`; CROPS README section (C, O, P, S) and a video of 3 minutes max | Arkiv wins at most one Arkiv track. A 2:00 to 2:59 cut satisfies ETHGlobal and CROPS |
| Shelf | ENS, Uniswap, optional Chainlink | none | `FEEDBACK.md` plus the Uniswap form; README line pointers | Kura stacked exactly ENS plus Uniswap and also made finalist |
| Descriptor Desk | ENS, Arkiv (Mirror), EF | CROPS (S) | Arkiv files plus the CROPS section | Uses all 3 slots; nothing else can be added |
| Quarantine | ENS, World (Agent Pass) | none | World debrief (time to first success, friction, missing capability, top improvement) | The World workshop is at 17:30 Room 1 and does not clash with ENS |
| RegistryLint | ENS | none | none beyond the README | Cheapest paperwork; leaves two partner slots for a separate build |
| Plan E plus ENS mode | ENS | CROPS | CROPS section | Already planned; keep the go/no-go |

Schedule clash: ENS (16:00, Workshop Room 1) runs alongside Arkiv (16:00, Room 2) (`00_current_tracks.md`). For the Residue and Descriptor Desk combos, send one person to each.

## Workshop questions for ENS (Thu 5 Nov, 16:00 to 16:20 IST, Workshop Room 1, Yash Goyal)

1. Which ENSv2 paths are live on mainnet this week: .eth registration, UserRegistry deployment via the Verifiable Factory, per-account Permissioned Resolvers, `linkToNode`, `ContractNamer` and data records? The app-developer docs still say "ENSv2 is currently deployed on Sepolia for testing" ([docs](https://docs.ens.domains/ensv2/tutorial-app-developers/)).
2. Will a Sepolia-only build be judged equally with a mainnet one, and is any testnet mainnet-mirror (a staging deployment, as ENSignv2 used) acceptable?
3. After `safeTransferFrom` of a name, does the previous owner keep roles on their Permissioned Resolver, and root roles (including `ROLE_UPGRADE`) on the name's UserRegistry? Is there an intended clean-handover flow? Would ENS see a transfer-time checker as useful, or as duplicating the new Explorer? (Residue gate)
4. EAC exposes counts but not holders. Is there an official indexer or subgraph for `EACRolesChanged`, and does the Explorer list role holders per name?
5. Does subclassing `PermissionedRegistry` or deploying a custom resolver count as "built on ENSv2" (the ENS Drive precedent)?
6. What exactly must the "live demo" link be: a hosted URL that reads live chain state? Is a hosted read-only explorer plus testnet write flows enough?
7. For the agent bonus: should agents use ENSIP-25 and ENSIP-26 records, and which ERC-8004 registry on Sepolia should ENSIP-25 point to?
8. Are data records (ENSIP-24) supported by the mainnet Permissioned Resolver, and are there size limits we should design around (Descriptor Desk)?
9. Where are the canonical `UserRegistryImpl` and Verifiable Factory addresses for implementation checks, and are they the same on Sepolia and mainnet?
10. Will judges verify on chain that the submitted contracts and names are used, and how should the README point to them?

## Gates and fallbacks

- G1 (Fri 01:00 IST): the Residue fork test reproduces leftover control after a transfer. If not, switch to RegistryLint, which reuses the same walker and invariants.
- G2 (Fri 12:00 IST): one live ENSv2 write path works end to end from the hosted demo (R4). If mainnet paths are not live, use Sepolia only.
- G3 (Sat 06:00 IST): the hosted demo reads live state with no fixture JSON in the bundle (W2), checked by grepping the build output.
