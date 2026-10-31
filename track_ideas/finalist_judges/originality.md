# Originality check: 16 finalist candidates for ETHGlobal Mumbai

Written 2026-10-31 for ETHGlobal Mumbai (hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST). Lens: Originality, the finalist criterion "Is your project introducing a new idea or creatively solving an existing problem?" ([details page](https://ethglobal.com/events/mumbai/info/details)). Scope: fresh builds on the Classic track only. Continuity-only tracks and Continuity winners are used here only as prior art (a Continuity winner still counts as "already shown").

## How this check was done

- **Compared against:** every finalist row in the five catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` (320 finalists, ETHOnline 2023 to Tokyo 2026), and every winner and named non-winner in all twelve partner histories in `track_ideas/history/` (0G, 1inch, Arc, Arkiv, Chainlink, Definitive, EF, ENS, Hedera, Uniswap, Whitechain, World). Keyword passes per candidate (for example clear signing, upgrade, pause and circuit breaker, floor and stabilisation, backing and reserve, CCA and bidder, fuzz and exploit, escrow and name sale, mempool and nonce, frontend and exit, forced transfer and schedule, relayer and drain, invoice and factoring, copy trading and influencer, voice and co-sign, gas and hardfork), then the matching rows were read in full.
- **No ETHGlobal page was fetched in this pass.** The catalogues and histories were written between 2026-10-27 and 2026-10-31, several ETHGlobal fetches this week hit Cloudflare checks and HTTP 429 (noted in `history/ef.md`, `history/arc.md`, `history/chainlink.md`), and the notes are fresh enough for prior-art matching. Every showcase URL below comes from those notes, not from a fresh read.
- **Limits:** the catalogues read showcase text, not judge notes or videos. Partner histories list non-winners as samples, not a census, so "not found" means "not in these notes". Work outside ETHGlobal (security vendors, audit firms, academic tools) is mentioned only as labelled general knowledge.
- **Scoring rule (Judgement):** 1 to 10 for finalist potential through the originality lens only. 9 to 10: no finalist or partner winner made the core claim, and the claim is not a recombination of shown parts. 7 to 8: the core claim is new but the mechanism family or demo format has been seen. 5 to 6: the core claim is partly shown, or the novelty sits in a secondary feature. 1 to 4: the core claim has already been shown, or the sponsor's own prize text lists the idea so the Mumbai room will hold several copies. No 9s or 10s were given: every candidate leans on at least one shown pattern.

## Summary (scores, verdicts and "already shown" calls are Judgement)

| # | Candidate | Score | Verdict | Core claim already shown? | Closest prior project(s) |
|---|---|---|---|---|---|
| 1 | Truthsign | 8 | keep | No | Octopus AI, maki, Safe City, Clear Signing Studio |
| 2 | Upgrade Council | 7 | keep | No (pattern yes, object no) | Commitment Issues, Airlock |
| 3 | Pause Fast, Unpause By A Person | 5 | revise | Partly | SentinelCRE (Chainlink Convergence), Umbra, Sentinel, Tripwire |
| 4 | Greenshoe | 7 | keep | No | watermark, Brick Finance, Holster, Lotus |
| 5 | Reserve Gate | 6 | revise | Partly (demo format and refusal shape) | coldcascade, Solvent, Ballast, Wamia |
| 6 | Bidproof | 7 | keep | No | Kura, Recycle CCA, ETHOnline 2026 hook-risk scanners |
| 7 | HookBreak | 5 | revise | Partly | Aegis402, HookLens, KSwap-VM, TARE |
| 8 | Residue | 8 | keep | No | SubnodeSymphony, rent.eth, ENS Drive |
| 9 | Lanes | 7 | keep | No | none on alt mempools; Patio Station, ZKFOCIL |
| 10 | Walkaway | 6 | revise | Partly, and the EF lists it | Trust Issues, RageQuit Kit, UNSU |
| 11 | Issuer Brake | 6 | revise | No (target new, mechanism old) | Rialto, F2F Cross-Border, Aivy Quorum |
| 12 | Gas Ledger | 4 | drop | Mostly, and Whitechain asks for the twist | Paybot, router402, ArcBeam, PayWiser |
| 13 | Hundi | 3 | drop | Yes | OpenPop, Facture, Finvoice, cashmeifyoucan, Seikyu, invoice3.xyz |
| 14 | Last Out | 8 | keep | No | KOLlateral, KagamiAI |
| 15 | Witness | 6 | revise | Partly | OmiSwap, Octopus AI, LeekDIYHardwareWallet |
| 16 | Regas | 8 | keep | No (insight public, tool new) | forge flamegraphs, TARE; ChainSecurity's manual finding |

Flags in one line each (Judgement): **Hundi** repeats a shown core claim (invoice financing with automatic due-date settlement); **Gas Ledger** repeats a shown core claim (gasless stablecoin checkout) and its twist is the sponsor's own question; **Pause Fast** repeats "anomaly pauses the protocol" and is new only in its finality asymmetry; **HookBreak** repeats "detect a hook with missing access control" and is new only if a stateful exploit (Bunni) falls; **Walkaway** repeats "exit when the operator is gone" and the EF's own prize text names it; **Witness** repeats "speak a payment to a device" and "AI co-signer that refuses".

---

## 1. Truthsign: 8, keep

**Facts (prior projects).**
- [Octopus AI](https://ethglobal.com/showcase/octopus-ai-2xcne) (Trifecta 2025, Agents track finalist): an AI co-signer inside a Safe that auto-rejects malicious proposals, "framed as a defense against Bybit-style blind-signing hacks" (`finalists_2025q1_2025q3.md`).
- [maki](https://ethglobal.com/showcase/maki-564eg) (Cannes 2026 finalist): "every write is simulated" before approval (`finalists_2026.md`).
- [LeekDIYHardwareWallet](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg) (ETHOnline 2026 finalist): refuses "anything the device cannot display clearly" (`finalists_2026.md`).
- [Oh Snap!](https://ethglobal.com/showcase/oh-snap-4u2kv) (Brussels 2024 finalist): community notes on a contract before you sign (`finalists_2024q3_2025q1.md`).
- [Safe City](https://ethglobal.com/showcase/safe-city-qbgmm) (Brussels 2024, Chainlink Connect the World winner): "MetaMask Snap showing a contract's safety score before you interact" (`history/chainlink.md`). Not cited in the draft.
- [S.C.I](https://ethglobal.com/showcase/s-c-i-0760q) (Istanbul 2023 finalist): website owners declare which contracts their domain may call (`finalists_2023q4_2024q2.md`). Not cited in the draft.
- [Clear Signing Studio](https://ethglobal.com/showcase/clear-signing-studio-6hs1z) (Cannes 2025): ERC-7730 metadata toolkit that generates descriptors (`research_notes/EF tracks and Whitechain ideas/privacy_stack_gaps.md`). [ENShell](https://ethglobal.com/showcase/enshell-6t95y) (Cannes 2026 finalist, Chainlink CRE winner) used "Ledger clear-signing (ERC-7730)" to display its own verdicts (`finalists_2026.md`).
- The finalist report lists "Signing and frontend integrity" as open with "no verified frontend, no descriptor checker" (`reports/ETHGlobal finalist ideas 2023 to 2026.md`).

**Judgement.** Nobody in the 320 finalists or the partner histories checks an ERC-7730 descriptor against the transaction's actual effect. That is a new core claim. The risk is the surface: "we simulated it and refused" is what maki, Octopus AI and Safe City already showed, and a generalist judge who has seen wallet simulators (general knowledge: commercial pre-sign simulators are common) will hear the refusal beat as familiar.

**Single most important fix.** Lead with the differential result (the count of registry descriptor fields that disagree with their contracts, each with a replay), and only then show the wallet refusal as the consequence; do not open on "the screen lied, we refused", which reads as maki or Octopus AI.

---

## 2. Upgrade Council: 7, keep

**Facts (prior projects).**
- [Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h) (Tokyo 2026, World Selfie Check Beta 2nd): a human check "before an agent's git commit is signed" (`history/world.md`).
- [Airlock](https://ethglobal.com/showcase/airlock-ph6bx) (Tokyo 2026, World ID for Agents): pauses the agent until a human approves; "The OIDC nonce is a hash of the approval id and payloadHash" (`history/world.md`). [Surety](https://ethglobal.com/showcase/surety-ms4gx) (same track): a backend-signed one-time EIP-712 approval verified by contracts, plus a live prompt-injection attack (`history/world.md`).
- Agent-limiting finalists: [maki](https://ethglobal.com/showcase/maki-564eg), [Omamori](https://ethglobal.com/showcase/omamoris-rn3nc), [Cordon](https://ethglobal.com/showcase/cordon-vw3kh), [ALMA](https://ethglobal.com/showcase/alma-07pzd) (selector whitelist and 30-day expiry) (`finalists_2026.md`, `history/uniswap.md`).
- `history/world.md` section 7: no World-tagged project from 2023 to Tokyo 2026 "gated a contract upgrade, a multisig signer set, a bug bounty intake or a pause and unpause ratchet".

**Judgement.** The pattern (an agent action held until a verified human approves a hash-bound payload) is exactly what Airlock and Surety won with, and Commitment Issues already put a human check in front of an agent's code. The new parts are the object (a proxy upgrade that holds money) and the bytecode and storage-layout witness on the approval card. Storage layout checks exist in standard upgrade tooling (general knowledge), so the diff alone is not new; binding it to a named, distinct human is.

**Single most important fix.** Make the five-second upgrade card (storage collision, new `sweep` selector, code hash) the headline and name Airlock and Commitment Issues in the README as the pattern being extended, so judges credit the new object instead of discounting a third "human approves the agent" entry.

---

## 3. Pause Fast, Unpause By A Person: 5, revise

**Facts (prior projects).**
- SentinelCRE, 1st place at Chainlink's own Convergence hackathon: "anomaly detection that triggers circuit breakers" ([Convergence winners](https://chain.link/blog/convergence-hackathon-winners), via `history/chainlink.md`). Outside ETHGlobal, but judged by the same sponsor. Not cited in the draft.
- Lisbon 2026 Uniswap API winners include Umbra, a "circuit breaker that evacuates before pools collapse" (place not read), and [Sentinel](https://ethglobal.com/showcase/sentinel-yaqmj), 1st, which "watches pool health, depegs and exploit intel, then withdraws LP" (`history/uniswap.md`; [Lisbon showcase](https://ethglobal.com/showcase?events=lisbon2026)). Not cited in the draft.
- [Tripwire](https://ethglobal.com/showcase/tripwire-7bqxn) (Tokyo 2026, no prize): pauses with no human (`history/world.md`). [Igris AI](https://ethglobal.com/showcase/igris-ai-nvfh6) (New Delhi 2025 finalist): an AI agent that "moves funds to safety" (`finalists_2025q3_2026q1.md`). [Canary](https://ethglobal.com/showcase/canary-kh3h7) (NYC 2026 finalist, Chainlink CRE winner) used CRE plus CCIP (`history/chainlink.md`).
- `history/chainlink.md` 4.2 item 7: agent firewalls and security workflows are "now crowded" at Chainlink.

**Judgement.** "A detector sees a drain and pauses vaults" is shown (SentinelCRE, Umbra, Tripwire). The human-only unpause is shown in spirit by the World winners. The one claim nobody has made is the finality asymmetry: the safe direction travels at block depth, the unsafe direction only at full finality, using CCIP 2.0 per-sender finality. The ledger reconciliation and the LLM triage dilute that.

**Single most important fix.** Rebuild the promise and the 20 second hook around the finality asymmetry alone ("pause in seconds, unpause only after finality, enforced by the receiver") and cut the ticket ledger and LLM triage to a footnote, or the panel will file it next to SentinelCRE with a World button.

---

## 4. Greenshoe: 7, keep

**Facts (prior projects).**
- [watermark](https://ethglobal.com/showcase/watermark-68230) (Tokyo 2026, 1inch 3rd and finalist): "A DAO treasury quotes both sides from its Safe" on Aqua with "One fill cannot move more than 50 ETH" (`history/1inch.md`).
- [Lotus](https://ethglobal.com/showcase/lotus-9vnou) (NYC 2026, 1inch 2nd): "sell on the way up, never re-buy" (`history/1inch.md`).
- [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, Uniswap 1st): a CCA whose settlement "opens a v4 pool at the clearing price" (`history/uniswap.md`).
- Tokyo 2026 non-winners: Brick Finance, "RWA hook with a standing floor bid" (`history/uniswap.md`), and [Holster](https://ethglobal.com/showcase/holster-hmwie), "TWAP band" on Aqua (`history/1inch.md`). [Burra Vault](https://ethglobal.com/showcase/burra-vault-ptohp) (LFGHO 2024 finalist): a facilitator vault "whose borrow rate follows GHO's market price to defend the peg" (`finalists_2023q4_2024q2.md`). None cited in the draft.

**Judgement.** The structure (an issuer's Safe quoting both sides on Aqua) is watermark's, and a standing floor bid and a band were tried and lost at Tokyo. What is new is the combination that makes it a greenshoe: the anchor is the auction's own clearing price, the budget is only the overallotment, and the quote dies at day 30. That is a new idea with a familiar chassis, and the TradFi name helps judges see the difference.

**Single most important fix.** Put one sentence in the demo and README that names watermark and Brick Finance and states the difference (anchored to the CCA clearing price, funded only by overallotment, expires), because the 1inch judges placed watermark and will otherwise see a repeat.

---

## 5. Reserve Gate: 6, revise

**Facts (prior projects).**
- [coldcascade](https://ethglobal.com/showcase/coldcascade-4rfos) (ETHOnline 2026, 1inch 2nd): replay of a dated cascade where an arbitrageur "takes $222 from the oracle-pegged maker, $3,558 from a plain curve, and $0 from this desk" (`history/1inch.md`). This is the split-screen "same sale, one maker pays, one refuses" demo. Not cited in the draft.
- [Solvent](https://ethglobal.com/showcase/solvent-7uphp) (ETHOnline 2026, 1inch 1st): a `SolvencyFloor` instruction that "declines at quote time" (`history/1inch.md`).
- [Ballast](https://ethglobal.com/showcase/ballast-7jpyp) (NYC 2026, 1inch 4th): an oracle anchor with a with-versus-without number (11.9 ETH versus 5.94 WETH) (`history/1inch.md`). [Wamia](https://ethglobal.com/showcase/wamia-z11ah) (Tokyo 2026, 1inch 2nd): a dated attack replayed on a fork (`history/1inch.md`).
- Tokyo non-winners [RateSpace](https://ethglobal.com/showcase/ratespace-ke33e) and [Aquawrap](https://ethglobal.com/showcase/aquawrap-povv5): oracle-rate pegs (`history/1inch.md`). [Canary](https://ethglobal.com/showcase/canary-kh3h7): depeg insurance from feed history (`history/chainlink.md`).

**Judgement.** The refusal-instruction shape (Solvent), the dated-attack fork replay (Wamia) and the two-maker split screen (coldcascade, Ballast) are the 1inch winning template, so the format is not original. The signal is: no prior entry gates a maker on the L1 escrow backing of a bridged token. The current demo compares against a rate-pegged maker, which is the weakest comparator and invites "so Ballast's oracle anchor would also have stopped it?"

**Single most important fix.** Make the comparison three-way (rate-pegged, a Ballast-style price-anchored maker, Reserve Gate) and show that only the backing check refuses during the Kelp replay, because the rate and the price did not move; that single result is the original claim.

---

## 6. Bidproof: 7, keep

**Facts (prior projects).**
- [Kura](https://ethglobal.com/showcase/kura-so3wx) (Tokyo 2026 finalist, Uniswap 1st, first CCA winner): CCA on the seller's side (`history/uniswap.md`).
- Recycle CCA (Tokyo 2026, no prize): "Recycle stranded capital from strictly outbid Uniswap CCA bids", the only bidder-side CCA entry in the notes (`history/uniswap.md`; [Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026)). Not cited in the draft.
- [Placed](https://ethglobal.com/showcase/placed-eijhx) (Tokyo 2026, World IDKit): revenue tokens sold through CCA (`history/world.md`).
- At ETHOnline 2026 at least five hook-risk scanners won nothing (Pool Party, AlphaScanner, ALFQuote, SwapGuard, reCEPTION Swap), and HookLens at Open Agents won nothing; [TARE](https://ethglobal.com/showcase/tare-ozced) won with replayable rows (`history/uniswap.md`).

**Judgement.** Validating CCA parameters for the bidder has not been built (the docs even assign it to the bidder). The risk is category, not novelty: a population table of "risky" auctions looks like the scanners that lost, and Uniswap judges paid for "a mechanism whose failure is visible" (`history/uniswap.md` 4.5).

**Single most important fix.** Open on the router reverting a bid into a rigged auction and the live handoff-price push, with the population table as supporting evidence afterwards; never let the first minute look like a scanner.

---

## 7. HookBreak: 5, revise

**Facts (prior projects).**
- [Aegis402](https://ethglobal.com/showcase/aegis402-o8x6z) (Open Agents 2026 finalist): "blocks payments to a deliberately vulnerable Uniswap v4 hook before signing (missing access control, tx.origin auth, replayable IDs)" (`finalists_2026.md`). Cork's bug is the missing-access-control class ([Dedaub](https://dedaub.com/blog/the-11m-cork-protocol-hack-a-critical-lesson-in-uniswap-v4-hook-security/), via the draft).
- HookLens (Open Agents, no prize): "Discover, inspect, and simulate Uniswap v4 hooks"; five ETHOnline 2026 hook-risk scanners, no prize (`history/uniswap.md`). Not cited in the draft.
- [KSwap-VM](https://ethglobal.com/showcase/kswap-vm-aix5n) (Lisbon 2026, 1inch 3rd): formal checks on deployed bytecode with "counterexamples replayed as failing forge tests" (`history/1inch.md`). Not cited in the draft.
- [TARE](https://ethglobal.com/showcase/tare-ozced) measured hook take; [UniV4Backtester](https://ethglobal.com/showcase/univ4backtester-ht1e6) won a track listing "Testing toolkits" (`history/uniswap.md`).

**Judgement.** "Find the hook that anyone can call" has been shown (Aegis402) and is a static check, so rediscovering Cork proves little about fuzzing; the draft admits this. "A tool emits a failing Foundry test from a counterexample" was shown by KSwap-VM. Fuzzers that reproduce historical exploits are an established line outside ETHGlobal (general knowledge). The one original claim is a generic stateful harness rediscovering a compounding exploit like Bunni's 44-withdrawal rounding drain on the real block.

**Single most important fix.** Make Bunni the headline and gate the whole entry on it (Cork becomes a ten-second warm-up); if Bunni does not reproduce from generic properties by Friday, this is a scanner and should not be the finalist bet.

---

## 8. Residue: 8, keep

**Facts (prior projects).**
- [SubnodeSymphony](https://ethglobal.com/showcase/subnodesymphony-91p6r) (NY 2023, ENS subnames winner): "auctions subnames of vanity names held in escrow"; [rent.eth](https://ethglobal.com/showcase/rent-eth-asm1t) (Bangkok 2024, ENS creative): Dutch-auction rentals of names. `history/ens.md` says to avoid "name marketplaces without a new rule (rent.eth and SubnodeSymphony did this in 2023 and 2024)". Neither cited in the draft.
- [ENS Drive](https://ethglobal.com/showcase/ens-drive-qu2m2) (Tokyo 2026, ENSv2 2nd): a PermissionedRegistry subclass with team-inherited roles, differential fuzz plus Halmos; [Verdict.eth](https://ethglobal.com/showcase/verdict-eth-zsmpv) (ETHOnline 2026, 3rd): scoped setter roles; [Capsule](https://ethglobal.com/showcase/capsule-yq59u): kill switch as a resolver role revoke; [Kura](https://ethglobal.com/showcase/kura-so3wx): non-transferable revocable names (`history/ens.md`).
- `history/ens.md` section 3: the question "after a name or subname changes hands, who can still change where it resolves or what sits under it?" is one "no past winner addressed".

**Judgement.** The core claim (a sale settles only when no residual role survives) is new and is the "new rule" ENS's history says marketplaces lacked. Originality depends on one fact: if the only residue comes from `unsafeTransfer`, the claim shrinks to "do not use the unsafe path", which ENS's own docs already say.

**Single most important fix.** Never call it a name marketplace; pitch "control residue after an ENSv2 transfer" with the escrow as enforcement, and lead with a residue that survives `safeTransferFrom` (confirm at the ENS workshop), because that is the part nobody, including ENS's docs, has shown.

---

## 9. Lanes: 7, keep

**Facts (prior projects).**
- Mempool finalists: [Patio Station](https://ethglobal.com/showcase/patio-station-17k0a) (Tokyo 2026, media through the Hoodi mempool), [ZKFOCIL](https://ethglobal.com/showcase/zkfocil-private-ils-0oos6) (Trifecta 2025, private inclusion lists), [TX Delay Insurance](https://ethglobal.com/showcase/tx-delay-insurance-5fhae) (NY 2025) (`finalists_2025q1_2025q3.md`, `finalists_2026.md`). Nearest EF winner: [REIL](https://ethglobal.com/showcase/reil-v8bq8) (Buenos Aires 2025, EIL 2nd) (via the draft).
- `history/ef.md`: "No Anon-RPC or alt-mempool prize was found at any earlier hackathon"; the alt mempool track is new at Mumbai.
- EF prize text: "Multiple devnets will run during the hackathon with keyed nonces and recent roots live" ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), via the draft).

**Judgement.** No prior project used frame transactions at all, so anything here is new against history. The crowd risk is at Mumbai itself: the EF names keyed nonces as a live devnet feature, so "many parallel withdrawals from one account" will be a common demo. Cold-key approval of hot-wallet withdrawals is a standard custody pattern (general knowledge), so the original part is narrower: pre-signed transactions from a stolen hot key are inadmissible because validation reads the account's own approval root.

**Single most important fix.** Add one slide answering "why not a 4337 account with session keys?", showing what admission-time refusal (no gas burned, nothing pending) gives that onchain validation does not; without it, judges map Lanes to existing account-abstraction withdrawal policies.

---

## 10. Walkaway: 6, revise

**Facts (prior projects).**
- [Trust Issues](https://ethglobal.com/showcase/trust-issues-3wnx4) (Bangkok 2024, Uniswap Unichain 1st): "Desktop app that lets users force-exit an L2 through L1 escape hatches, sitting man-in-the-middle in WalletConnect" (`history/uniswap.md`). Not cited in the draft.
- [RageQuit Kit](https://ethglobal.com/showcase/ragequit-kit-jb53p) (Buenos Aires 2025, 1inch API winner): "Exit risky tokens across many chains with one click" (`history/1inch.md`). Not cited in the draft.
- [UNSU](https://ethglobal.com/showcase/unsu-o1e71) (NYC 2026 finalist, Continuity): a wallet with no app, extension or account; [Carte Bleue](https://ethglobal.com/showcase/carte-bleue-ftuuc) (Lisbon 2026 finalist); [BackItUp](https://ethglobal.com/showcase/backitup-oghff) (ETHIndia 2023, EF 1st) (`finalists_2026.md`, `history/ef.md`).
- The EF CROPS prize lists "a frontend that keeps working when its domain, backend or RPC provider disappears" as an idea ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation), via the draft).

**Judgement.** The finalist report is right that no finalist exits third-party protocol positions without their frontends, but "get out when the operator is gone" was rewarded at Bangkok (Trust Issues) and the blocked-sites exit is the EF's own listed idea, so several Mumbai teams will build it. The original element is the second half: naming the exact key, keeper or hook permission that can still stop the exit, and proving it on a fork with that party switched off.

**Single most important fix.** Swap the order: open on "this file tells you who can still stop your exit" (the hook `beforeRemoveLiquidity` verdict and the keeper-off fork), then show the blocked-sites USB withdrawal as proof the file works, so the headline is the part nobody, including the EF's example list, has shown.

---

## 11. Issuer Brake: 6, revise

**Facts (prior projects).**
- Hedera winners built on schedules: [Rialto](https://ethglobal.com/showcase/rialto-psod2) closed loans with "a HIP-1215 scheduled call"; [F2F Cross-Border](https://ethglobal.com/showcase/f2f-cross-border-xcxmu) (Continuity) executes "the moment the second of two required signatures lands"; [Aivy Quorum](https://ethglobal.com/showcase/aivy-quorum-1b5u1) (Continuity) used "a pre-signed schedule needing agent plus 2-of-3 oracle keys"; Dead Men Tell Tales used the Schedule Service for a release deadline (`history/hedera.md`).
- RWA finalists: [explorador.pt](https://ethglobal.com/showcase/explorador-pt-35okq) and [Kura](https://ethglobal.com/showcase/kura-so3wx) (`finalists_2026.md`). Hedera tokenization winners were invoice products ([cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz), [Facture](https://ethglobal.com/showcase/facture-jy21t)) (`history/hedera.md`).

**Judgement.** Nobody has treated an issuer's forced-transfer power as the attack surface, so the target is new. The mechanism (a delay on a privileged action that a guardian can cancel) is the standard governance timelock with a veto (general knowledge), and schedule-as-enforcement has won on Hedera several times. A judge who knows timelocks will ask what is new.

**Single most important fix.** State in the hook what a Hedera network-enforced schedule gives that a Solidity timelock on any EVM chain cannot (the delay is enforced by consensus, not by the contract the stolen keys administer); if that difference does not hold up at gate (b), the originality claim does not either.

---

## 12. Gas Ledger: 4, drop

**Facts (prior projects).**
- Facilitator and gasless finalists: [Paybot](https://ethglobal.com/showcase/paybot-q7grd) (Buenos Aires 2025, facilitator pays gas), [router402](https://ethglobal.com/showcase/router402-b717q) (HackMoney 2026); checkout finalists [Kyma Pay](https://ethglobal.com/showcase/kyma-pay-yn65a), [Century Pay](https://ethglobal.com/showcase/century-pay-12dy7), [AutoPay](https://ethglobal.com/showcase/autopay-n8ot7) (`finalists_2025q1_2025q3.md`, `finalists_2025q3_2026q1.md`).
- Gasless partner winners: [PayWiser](https://ethglobal.com/showcase/paywiser-i4i5r), [ArcBeam](https://ethglobal.com/showcase/arcbeam-e0bey), [Full Circle](https://ethglobal.com/showcase/full-circle-b091b); 64 gasless or paymaster submissions with 14 winners in the analog tracks (`history/whitechain.md`).
- Whitechain's Scale text asks "how your relayer gets its WBT, and what stops someone from draining it" ([Whitechain prizes](https://ethglobal.com/events/mumbai/prizes/whitechain), via `history/whitechain.md`).

**Judgement.** The product (a gasless stablecoin checkout) is one of the most repeated finalist and partner shapes in the notes. The twist (a printed drain bound and a script handed to the judges) is a strong presentation, but it answers a question Whitechain wrote into the prize, so every serious Scale entrant will answer it too. Against the finalist panel this reads as a checkout.

**Single most important fix (reason to drop).** Keep it only as a Whitechain prize entry if the team wants that money; do not bet the finalist slot on it, because the core claim is shown and the only new element is the sponsor's own requirement.

---

## 13. Hundi: 3, drop

**Facts (prior projects).**
- [OpenPop](https://ethglobal.com/showcase/openpop-grkq2) (NYC 2026, Arc Advanced Stablecoin Logic 1st and Chainlink CRE winner): invoice financing where a `ProofGatedEscrow` "releases investor USDC only on a verified proof" (`history/arc.md`, `history/chainlink.md`). Not cited in the draft.
- Hedera tokenization winners: [Finvoice](https://ethglobal.com/showcase/finvoice-xu0sz), [cashmeifyoucan](https://ethglobal.com/showcase/cashmeifyoucan-qzyzw), [Facture](https://ethglobal.com/showcase/facture-jy21t) (each invoice an ATS zero-coupon bond), plus [Wafer](https://ethglobal.com/showcase/wafer-r4uab) (`history/hedera.md`).
- Tokyo 2026 non-winners: Tegata ("Invoices tokenized and sold for JPYC on Uniswap v4") and [Seikyu](https://ethglobal.com/showcase/seikyu-dyqh3) (invoices as ENSv2 names that expire on their due date, sold to World ID investors); about 18 invoice-financing submissions at 2026 events (`history/whitechain.md`, `history/ens.md`). Not cited in the draft.
- Finalist: [invoice3.xyz](https://ethglobal.com/showcase/invoice3-xyz-3fb87) (LFGHO 2024) (`finalists_2023q4_2024q2.md`). Whitechain's Tokenize text lists invoice financing with automatic due-date settlement as an idea (`history/whitechain.md`).

**Judgement.** The core claim (tokenize an invoice, finance it at a discount, settle automatically on the due date to the holder) has been shown and paid at least four times in 2026. Double-financing prevention through the debtor's acknowledgement is how buyer-accepted receivables platforms such as TReDS already work (general knowledge). The "Hundi" frame is a label, and the finalist report notes that Indian labels alone did not place at New Delhi.

**Single most important fix (reason to drop).** Drop it as a finalist candidate; if the team still wants Whitechain Tokenize money, add OpenPop, Facture and Seikyu to the README's prior-art list and claim only the two reverts as the contribution.

---

## 14. Last Out: 8, keep

**Facts (prior projects).**
- [KOLlateral](https://ethglobal.com/showcase/kollateral-ho1d1) (Lisbon 2026 finalist, 0G 3rd, Uniswap API 1st): a verifiable track record of influencer calls priced against DEX history, after the fact (`finalists_2026.md`, `history/uniswap.md`).
- [KagamiAI](https://ethglobal.com/showcase/kagamiai-h7yq4) (New Delhi 2025 finalist): copy trading of AI workflows with mock payments (`finalists_2025q3_2026q1.md`). Copy-trading winners on 1inch API: [Segugio](https://ethglobal.com/showcase/segugio-zu2tw), [Nakal](https://ethglobal.com/showcase/nakal-qabnf) (`history/1inch.md`).
- Definitive lists "Copy trading using Flash for trade execution" as a direction ([Definitive prizes](https://ethglobal.com/events/mumbai/prizes/definitive), via `history/definitive.md`).

**Judgement.** Prior work measures or copies leaders; none treats the leader as the attacker and enforces an exit order through the leader's own account signature. That is new. The sponsor names copy trading, so the Definitive room will hold several copy-trading apps, but the lock is a claim they will not have.

**Single most important fix.** Show the side-wallet answer in the first 30 seconds (the claim covers the ranked account, and IDKit stops a second ranked profile for the same human), because the first judge question will be "he just sells from another wallet", and an unanswered bypass makes the lock look trivial.

---

## 15. Witness: 6, revise

**Facts (prior projects).**
- [OmiSwap](https://ethglobal.com/showcase/omiswap-b3ma8) (San Francisco 2024 finalist): "Speak to an Omi AI wearable to send or swap ETH and USDC on Base", for example "send five bucks to Rohan on Polygon" (`finalists_2024q3_2025q1.md`). Not cited in the draft.
- [Octopus AI](https://ethglobal.com/showcase/octopus-ai-2xcne) (Trifecta 2025 finalist): an AI co-signer in a Safe that auto-rejects malicious proposals (`finalists_2025q1_2025q3.md`). Not cited in the draft for this candidate.
- [LeekDIYHardwareWallet](https://ethglobal.com/showcase/leekdiyhardwarewallet-5qssg) (ETHOnline 2026 finalist), [maki](https://ethglobal.com/showcase/maki-564eg) (Secure Enclave or Ledger approval), [Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3) (Lisbon 2026 finalist, 0G grading behind real hardware) (`finalists_2026.md`, `history/0g.md`).

**Judgement.** Each part has been on the finalist stage: voice-to-transaction on a wearable (OmiSwap), an AI second signer that refuses (Octopus AI), a device that refuses what it cannot show (LeekDIY). Address-poisoning warnings are a common wallet feature (general knowledge). The new claim is narrow: a device holding the second key refuses when decoded calldata disagrees with the spoken intent, decided by sealed inference with a logged request ID. That is a recombination, and a judge who remembers OmiSwap will say so.

**Single most important fix.** Pick a demo case a standard poisoning check would pass and only spoken intent catches (for example the right recipient but the wrong amount or token, or "about fifty" against 500), so the originality rests on intent-versus-calldata, not on a red light for a look-alike address.

---

## 16. Regas: 8, keep

**Facts (prior projects).**
- Gas and measurement finalists measure other things: [forge flamegraphs](https://ethglobal.com/showcase/forge-flamegraphs-0gr0p) (Scaling Ethereum 2024, gas profiling for optimisation), [EVMTrace](https://ethglobal.com/showcase/evmtrace-z6vh8) (Circuit Breaker 2024), [TARE](https://ethglobal.com/showcase/tare-ozced) and [LPlens](https://ethglobal.com/showcase/lplens-7sijq) (2026) (`finalists_2023q4_2024q2.md`, `finalists_2026.md`). No partner history mentions a hardfork or gas-rule regression entry; the only Glamsterdam mention is a CRE release-note caution (`history/chainlink.md`).
- Outside ETHGlobal: ChainSecurity raised the gas-griefing risk on 13 Oct 2026 and found 13 susceptible production contracts ([Parameter](https://parameter.io/chainsecurity-warning-prompts-ethereum-to-halt-hoodi-testnet-upgrade/), via the draft).

**Judgement.** No finalist or partner winner built a fork-rule regression tool, so the tool is new. The insight is not: an audit firm published the risk two weeks ago, so judges who follow core-dev news will credit the timing more than the idea. The bigger originality risk is the demo: a forwarder the team wrote and planted can look contrived.

**Single most important fix.** Deploy an unmodified, widely used open-source forwarder template (public code, the team's own deployment, no third-party contracts named) and show the Hoodi versus Sepolia flip on it, so the evidence is not only a contract built to fail.

---

## Cross-cutting findings (Judgement)

- **Prior art missing from the draft's "Why it is not already done" sections** (each should be added, because a judge who saw it will raise it): Safe City and S.C.I (Truthsign); SentinelCRE, Sentinel and Umbra (Pause Fast); Brick Finance, Holster and Burra Vault (Greenshoe); coldcascade (Reserve Gate); Recycle CCA (Bidproof); HookLens, the five ETHOnline scanners by name, and KSwap-VM (HookBreak); SubnodeSymphony and rent.eth (Residue); Trust Issues and RageQuit Kit (Walkaway); OpenPop, Seikyu and Tegata (Hundi); OmiSwap and Octopus AI (Witness).
- **Sponsor-listed ideas carry a crowd penalty at Mumbai, separate from history.** Walkaway (EF lists the frontend that survives), Gas Ledger (Whitechain asks the drain question), Hundi (Whitechain lists invoice financing), Last Out (Definitive lists copy trading) and Lanes (EF advertises keyed nonces) will each meet look-alikes in the same room. Only Last Out and Lanes have a mechanism the obvious version lacks.
- **The strongest originality positions** are the three that answer a question nobody asked before because the primitive is weeks old or the gap is named but unbuilt: Truthsign (descriptor versus effect), Residue (control residue after an ENSv2 transfer) and Regas (fork-rule regressions). Last Out is the strongest among consumer-facing ideas.
