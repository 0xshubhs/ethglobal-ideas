# 05 Walkaway: build guide

Rank 5 of 10 (revised; judge average 6.67, projected 7.3; P(demo) 50% to 60%). Source design: `track_ideas/finalist_ideas.md` section 3.5, `track_ideas/ideas/ef.md` C2, `track_ideas/finalist_judges/feasibility.md` candidate 10, `research_notes/EF tracks and Whitechain ideas/anon_rpc.md`. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** One local HTML file that tells you who can still stop you leaving a DeFi position (the exact key, keeper or hook permission), proves each one on a fork with that party turned against you or switched off, and then takes your money out with the protocol's site, Etherscan and the big RPC companies blocked. Reads go through Anon-RPC; transactions are signed in the page and broadcast through Anon-RPC.

**Falsifiable promise.** "For a wallet's positions in Aave and a Uniswap v4 pool, Walkaway names the exact key, keeper or hook permission that can still stop the exit, and proves each one on a fork with that party switched off. With app.aave.com, the Uniswap interface and the major RPC hosts blocked, the same local file takes a real $5 mainnet position out of Aave, with reads through Anon-RPC."

**Prize stack (two partner picks).**

| Prize | Verbatim requirement (Facts) | How this build meets it |
|---|---|---|
| EF "Best CROPS App" ($2,000 / $1,000 / $500) | Listed idea: "a frontend that keeps working when its domain, backend or RPC provider disappears"; criterion "structural (works without you) beats cosmetic (a setting)"; qualifications as in `01_truthsign.md` (CROPS section, 3 minute video, no trackers, keys stay on the device) ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) | Lead property C, structural: nothing of the team's or the protocol's is in the exit path. EF may place it in Anon-RPC instead (reads through Anon-RPC by default); either is fine |
| Uniswap Foundation "Build with Uniswap" ($4,000 / $3,000 / $2,000 / $1,000) | Scope includes "tooling or solutions built for the broader ecosystem"; "A public GitHub repository with open-source code, a FEEDBACK.md file, and a completed submission to the Uniswap Developer Feedback Form ... that includes the link to your FEEDBACK.md file"; "Make sure your README clearly points to the relevant contracts and lines of code" ([Uniswap prizes](https://ethglobal.com/events/mumbai/prizes/uniswap-foundation)) | v4 hook permission decoding is the "who can stop you" core for LPs; v4 position exit through PositionManager; FEEDBACK.md written during the build |

Judgement: this stack was checked in the draft, not by the combo checker; no chain or rule conflict was found. EF judge note: "The write path is where CROPS apps usually cheat. Tell us exactly which RPC your signer used." (`ideas/ef.md` C2)

## 2. Architecture

```
  walkaway.html (single file, opened from a USB stick; or file + tiny local static server)
    |
    |-- AnonRpcWorker (browser-harness 0.4.0), worker hash PINNED in the file
    |      tor-js worker -> OUR tor-js-gateway on a VPS, port 443  -> Tor -> RPC endpoints
    |      fallback network: Nym (no config)
    |-- viem client with http(rpc, { fetchFn: worker.fetch })   (no direct fetch path: fail closed)
    |-- Colibri light client with fetch: worker.fetch           (verified reads; else 2-endpoint cross-check)
    |-- adapters: Aave v3 (withdraw), Uniswap v4 (decrease + take), Lido withdrawal queue (claim)
    |-- verdict engine: who can stop this exit (roles, pause flags, hook permission bits, keepers)
    |-- local signer: burner key loaded at runtime from the user's own file, never stored
    |      eth_sendRawTransaction through worker.fetch
    v
  verdict cards + exit buttons

  walkaway-prove (CLI, Foundry + Anvil): for each named party, on a fork,
    impersonate it and take its one allowed action (pause, freeze, upgrade), or stop it (no oracle report),
    then show the exit fails; results bundled into the file as JSON with block numbers
```

**Who can stop which exit (the verdict engine, plain English).**
- **Aave v3 supply position:** read the reserve's configuration for paused and frozen flags and available liquidity (the underlying held by the aToken); read the ACL manager's role holders that can pause or freeze (emergency admin, pool admin, risk admin); name each holder (verify the exact role names and getters in Aave's v3 docs on day one).
- **Uniswap v4 LP position:** decode the hook's permission bits from the pool's hook address; red if `beforeRemoveLiquidity` is set (the hook can refuse your exit) or if `afterRemoveLiquidity` with return-delta is set (the hook can take part of what you remove); then check whether the hook is upgradeable or owner-pausable and name the key.
- **Lido withdrawal request (the keeper case):** a request is paid only after the oracle's report finalizes it; name the oracle committee and show, on a fork with time warped and no report, that the request never becomes claimable.

**Trust assumptions (the C line).** Remaining in the path: our tor-js gateway (the user can add others), the Tor network, the RPC endpoints reached through Tor, the Colibri prover, the signing key on the user's device. Nothing from Aave's or Uniswap's websites or APIs.

## 3. Repo layout and scaffold

```
walkaway/
  app/              Vite single-file build: verdict engine, adapters, signer, UI
  prove/            Foundry fork scripts and a small CLI that writes proof JSON
  gateway/          deployment notes and config for our tor-js-gateway on the VPS
  fixtures/         fork states, proof JSON with block numbers, pre-sent mainnet tx hashes
  FEEDBACK.md
```

At 21:00: common scaffold, then `npm i -D vite-plugin-singlefile@2.3.4` and `npm i @anon-rpc/browser-harness@0.4.0 @corpus-core/colibri-stateless@3.0.3 @uniswap/v4-sdk@2.4.4`. Bring up the tor-js-gateway on the VPS rented before the event (from the public `ethereum/tor-js` repo, `crates/tor-js-gateway`) (verify its build steps).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Harness | `new AnonRpcWorker(init)`; `WorkerInit` has `address` (specifier), `config`, `iframeUrl` ("same-origin bootstrap page for strict CSP"), `preExisting.rpcProvider` (used only to read the specifier); `fetch` is this-bound and assignable to `typeof fetch` | Fact (SPEC section 5 via `anon_rpc.md`) |
| tor-js | specifier `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e` (mainnet); demo gateway `152.236.3.22:12298:...` "may disappear at any time"; bench about 0.8 to 1.2 s p50 per call, about 8 s boot | Fact (`anon_rpc.md`) |
| Pinning | Privacy Pools pins the worker hash client side and fails closed ("It does not fall back to a direct fetch") | Fact ([tor-fetch.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts); [egress-transport.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/egress-transport.ts)) |
| viem | `http()` has a `fetchFn` option in source (not in the docs page) | Fact (`anon_rpc.md`, viem 2.57.11 source); pin 2.57.13 |
| Colibri | `new Colibri({ chainId: 1, fetch: worker.fetch, ... })` routes RPC, beacon and prover calls through the worker | Inference in `anon_rpc.md`, untested (verify) |
| Tor and RPCs | some RPC providers refuse Tor traffic (Kiwi News fails over) | Fact ([adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)); find two that accept Tor exits before Thursday |
| `file://` origin | the iframe bootstrap may refuse an opaque origin; untested | Risk (feasibility candidate 10) |
| Protocol facts | Aave v3 Pool and ACL manager; Uniswap v4 PositionManager and hook permission bits; Lido WithdrawalQueue | (verify) addresses and getters on day one from official docs |

## 5. Core flows in plain English

**Boot.** Load the pinned worker bundle by hash (no specifier read needed when the hash is pinned); start the worker with our gateway first and the demo gateway second; build the viem client with `fetchFn: worker.fetch`; there is no other transport, so if the worker fails the page says so and does nothing (fail closed). Start Colibri on the same fetch; if it does not compose, read every value from two independent RPC endpoints through the worker and show "cross-checked by 2 endpoints" instead of "verified".

**Find positions.** For the entered address: Aave aToken balances for the main reserves; v4 positions from PositionManager by owner (or a token id the user pastes, which is cheaper over Tor); Lido withdrawal requests by owner.

**Verdict.** Per position, the rules in section 2. Output per card: "You can leave now" (green) or "Someone can stop you" (red) with the named key, keeper or permission, plus the proof bundled from `walkaway-prove` with its block number.

**Exit.** Build the exit transaction (Aave withdraw; v4 decrease liquidity and take; Lido claim), estimate gas through the worker, sign in the page with the key the user loads from their own keystore file, send `eth_sendRawTransaction` through the worker to an RPC that accepts Tor exits, poll for the receipt, show the explorer link (which opens on a phone, since Etherscan is blocked on the laptop). The page names the RPC used for the broadcast.

**Proofs (CLI).** For each named party on a fork from a saved state: impersonate it and take its single allowed action (Aave emergency admin pauses the reserve; a hook owner pauses or upgrades), then attempt the exit and record the revert; for keepers, warp time without an oracle report and record that the request stays unclaimable. Write JSON with block, party, action, exit result; the file embeds it.

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M1 | Own gateway on the VPS, port 443 | a tor-js read through our gateway from a normal page returns `eth_blockNumber` | B (hour 1) |
| M2 | Single file under `file://` | the built `walkaway.html` opened from disk boots the worker and reads a block number through our gateway with RPC hosts blocked in the hosts file; if `file://` fails, the same with `python3 -m http.server` from the USB stick, stated in the CROPS section | B |
| M3 | Raw Aave withdraw on mainnet | a small real position withdrawn by a transaction signed in the page and broadcast through the worker | A, B |
| **Gate 1, Fri 01:00** | M2 and M3 | one Anon-RPC read from the single file and one raw Aave withdrawal broadcast | B |
| M4 | Verdict engine for Aave and v4 | the Aave card names the emergency admin; a v4 position in a pool whose hook has `beforeRemoveLiquidity` shows red with the hook address | A |
| M5 | Fork proofs | `walkaway-prove aave` shows the withdraw reverting after the impersonated pause; `walkaway-prove lido` shows a request never claimable without a report | A |
| M6 | UI cards, connection panel, exit flow | a judge understands the red card in five seconds | C |
| **Spine, Fri 09:00** | verdict plus real exit from the file with sites blocked | demo moment runs | all |
| M7 | Colibri through the worker | verified badge on reads, or the two-endpoint cross-check | B |
| M8 | v4 exit through the file (fork first, mainnet stretch) | decrease and take land on a fork; tokens arrive | A |
| M9 | Hosts-file demo script and phone explorer setup | one command applies and one removes the block list | C |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00, on the hotspot | all |
| M10 | FEEDBACK.md and the Uniswap form, README, video | checklist done | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Fund the burner and open a small Aave supply on mainnet (after 21:00); fork state | **M1 gateway on 443** | Single-file shell, connection panel design |
| 22:00 to 01:00 | M3 raw withdraw path | M2 `file://` boot | Verdict card on fixtures |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M4 verdict engine | M7 Colibri | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M5 proofs | Sleep 07:30 to 11:30 | M6 wired to the engine |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M8 v4 exit on a fork | (from 11:30) failover between gateways and networks | Exit flow states |
| 12:00 to 16:00 | Sleep | Broadcast RPC failover; name the RPC in the UI | M9 hosts script; demo mode |
| 16:00 to 18:00 | Proof JSON embedded | Latency pre-warm (boot the worker before the slot) | Rehearsal 1 on the hotspot |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | README protocol links | FEEDBACK.md | Copy pass; How-it-works |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Pre-send one real withdrawal; record every beat | Verify both gateways up | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30 | README CROPS lines | Layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30 | | |

**Pivot rule.** If neither `file://` nor the local static server boots the worker by Fri 01:00, ship as a static page served from Swarm or IPFS and say so; the C property weakens but holds. If no RPC accepts a Tor broadcast, broadcast through a named RPC and state it on the card (EF's question 13). **Cut order:** Lido case, then v4 mainnet exit (keep the fork), then Colibri (keep the cross-check); never the hosts-file withdrawal.

## 8. Pre-event checklist

- [ ] Rent a small VPS reachable on port 443; read the tor-js-gateway README; do not write project code.
- [ ] Find two RPCs that accept requests from Tor exits (manual tests, nothing kept).
- [ ] A burner wallet with a few dollars of ETH and USDC on mainnet; open the Aave position after 21:00.
- [ ] Read Aave v3's ACL roles, Uniswap v4 hook permission flags, Lido's withdrawal finalization.
- [ ] EF Discord, then 17:00 Room 2: does a single-file exit tool count as a CROPS App; must writes go through Anon-RPC; where would the EF place it (`ideas/ef.md` section 8, items 8 and 13; `workshop_questions.md` section 4.8).
- [ ] Uniswap 16:30 Room 1: is a cross-protocol exit tool with v4 hook decoding "tooling for the broader ecosystem"?
- [ ] Not allowed before 21:00: the file, the adapters, the verdict engine.

## 9. Test plan

- **Fork tests:** each adapter's exit on a saved state; each proof (pause, freeze, no report) makes the exit fail; each verdict rule against a known position.
- **Egress test:** with the hosts file applied, the browser's network panel shows no request to any host except the gateway; a test page that tries a direct fetch is blocked by the fail-closed transport.
- **Fixtures:** fork states, proof JSON, the hosts list, the pinned worker hash, pre-sent mainnet tx hashes.

## 10. Demo

**20 second hook (C).** "Etherscan is a website too, and we blocked it. This file tells you who can still stop you from leaving: this hook can refuse your withdrawal, this keeper can freeze your queue. Then, with every site and RPC company blocked on this laptop, it takes real money out of Aave."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Hosts file applied on screen; app.aave.com, the Uniswap interface, Etherscan and the big RPC hosts fail to load | recorded |
| 0:20 | `walkaway.html` opens; the v4 card is red: the hook holds `beforeRemoveLiquidity`; the hook address and what it can refuse | screenshot |
| 0:45 | **The moment:** a real $5 Aave position withdraws on mainnet through the file; a phone off the venue network confirms on the explorer. Lands by 1:00 | pre-sent tx and recording |
| 1:30 | A fork with the keeper switched off: the withdrawal queue never pays; the card names the keeper | proof JSON |
| 2:20 | Unprompted: Etherscan's write tab is blocked too, and it cannot tell you a hook can trap your LP | none |
| 2:50 | CROPS lines: what remains in the path (our gateway, the signing key) and which RPC the broadcast used | slide |

**Video (2:00 to 2:59).** Hook; the red card; the blocked sites; the real withdrawal with the phone; the keeper proof; CROPS lines.

## 11. README draft

Order: promise; screenshot pair (blocked Aave site, Walkaway card); quick start (download the file, open it; or `npx serve` from the folder); how it works; who-can-stop-you rules per protocol; proofs and how to re-run them; **CROPS**; **Uniswap** (permalinks to the hook permission decoding and the v4 exit code; FEEDBACK.md link); prior art (Trust Issues, RageQuit Kit, UNSU, Carte Bleue, BackItUp); limits; AI usage; licence.

**CROPS section (draft).**
- **C, the lead:** with the protocol's site, its API, Etherscan and the major RPC companies blocked, the file still finds your positions and exits them. Remaining in the path: our tor-js gateway (you can add your own), Tor, the RPC endpoints reached through it, the Colibri prover, and your own key.
- **O:** MIT; a single file you can read; proofs re-run with one command.
- **P:** reads and the broadcast go through Anon-RPC; the transport fails closed; no analytics.
- **S:** keys are loaded from your own file at runtime and never stored; reads are verified by a light client where possible, otherwise cross-checked by two endpoints, and the card says which.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Connection panel (always visible) | "Reads: through Tor via gateway gw1 (ours)", "Verified: light client" or "Cross-checked: 2 endpoints", "Broadcast: through Tor to <rpc>" | booting with progress (8 s typical), degraded, failed closed ("No private route. Nothing was sent.") |
| Start | Paste an address or load a key file; one example address | empty, loading positions |
| Position cards | Protocol, amount, and the headline: "You can leave now" or "Someone can stop you". Red cards name who and how in one sentence: "This pool's hook can refuse your withdrawal (hook 0x...)", "Aave's emergency admin can pause this market" | each card has "Show the proof" (fork result with block) and "Exit" |
| Exit flow | Review the transaction in plain words, sign in page, sending through Tor, waiting for receipt, done with a QR code for the explorer link | stuck: retry through the other network; failed: reason |
| How it works | Diagram and the CROPS lines | |

Copy: say "blocked sites", "private route", "someone can stop you"; never "specifier", "KPS" or "worker" outside the technical drawer. The QR code matters: Etherscan is blocked on the laptop, so the phone shows the proof.

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Tor latency on venue Wi-Fi | boot over 15 s | own gateway on 443, phone hotspot, pre-warmed worker, recorded fallback for 0:45 |
| `file://` refused | M2 | file plus a two-line local static server, stated |
| Colibri does not compose with the worker | M7 | two-endpoint cross-check, stated |
| Broadcast RPC refuses Tor exits | M3 | another RPC through Tor, or name the RPC used |
| Demo gateway gone | any time | our own gateway; Nym as second network |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Which RPC did your signer use?" | Signed in the page, sent through Tor to this RPC, named on the card | connection panel |
| "Isn't your gateway a central point?" | It is a blind relay and replaceable; the file accepts any tor-js gateway and Nym needs none | gateway list |
| "How is this different from an IPFS copy of Aave's frontend?" | It exits positions across protocols and tells you who can still stop you; a copied frontend tells you nothing about the hook | red card |
| "Can a hook really refuse an exit?" | If it holds `beforeRemoveLiquidity`, it runs before your removal and can revert; here is the fork proof | proof |
| "What if the reads lie?" | Light-client verified where Colibri composes, cross-checked otherwise, and the card says which | verified badge |
| "Adapters rot when protocols upgrade." | Three adapters, each a few calls; the verdict engine flags upgrades as a stopper too | adapter code |
| "Why not just use Etherscan's write tab?" | It is a website, so we blocked it, and it does not tell you a hook can trap your LP | blocked page |
| "Where are the keys?" | Loaded from your own file, kept in memory, never stored or sent | S line |

## 15. AI usage

Follow `00_common.md` section 8. A writes the verdict rules and proofs by hand; AI may help with the single-file build, adapters' boilerplate and UI.
