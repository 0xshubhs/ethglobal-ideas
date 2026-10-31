# Generalist finalist panel: scorecard for the 16 Mumbai candidates

Written 2026-10-31 for ETHGlobal Mumbai (hacking Thu 5 Nov 21:00 IST to submissions Sat 7 Nov 09:00 IST, Jio World Convention Centre). Input: `track_ideas/finalist_ideas_draft.md`. Team: three people, DeFi and smart contract security, Classic track, fresh build only. Continuity-only tracks are ignored; every candidate below was checked for dependence on pre-existing project code and none has any.

Panel stance: founders, VCs and protocol engineers who see about 25 teams in a morning and pick a top 10. We reward one sharp promise we can repeat in deliberation and one live moment, inside the first minute, that proves it. We stop following at about the third acronym we do not know.

## Sourced facts this scorecard leans on

No ETHGlobal page was re-fetched for this pass, to avoid rate limits; everything below comes from the repo notes, which carry the original links.

- Finalists get "7 minutes to present: 4 minutes for the demo, followed by 3 minutes for Q&A" and are judged on Technicality, Originality, Practicality, Usability (UI/UX/DX) and WOW Factor ([details page](https://ethglobal.com/events/mumbai/info/details), via `track_ideas/finalist_ideas_draft.md` section 0).
- "The ETHGlobal Finalist Track is separate and does not count as a Partner Prize" ([event page](https://ethglobal.com/events/mumbai), same source).
- Calibration finalists, as their showcase pages describe them (via `research_notes/ETHGlobal finalist ideas 2023 to 2026/finalists_2026.md`):
  - [VEIL VPN](https://ethglobal.com/showcase/veil-vpn-c643n) (Cannes 2026): "Open source lets you read the code. Attestation proves it's running." Three partner 1st places.
  - [Carte Bleue](https://ethglobal.com/showcase/carte-bleue-ftuuc) (Lisbon 2026): recover a smart wallet with a bank card; "The private key never leaves the card"; no partner prize.
  - [UNSU](https://ethglobal.com/showcase/unsu-o1e71) (NYC 2026, a Continuity entry): a wallet in any browser "with no app, extension or account".
  - [TARE](https://ethglobal.com/showcase/tare-ozced) (ETHOnline 2026): "the gap IS what the hook took"; "125,072 measurements", each replayable; "96.74 bps quoted, 96.74 bps executed, to the wei".
  - [Takarabako](https://ethglobal.com/showcase/takarabako-qmgg5) (Tokyo 2026, a Continuity entry): a cash kiosk where "If it doesn't match, that kiosk stops accepting deposits".
  - [Cordon](https://ethglobal.com/showcase/cordon-vw3kh) (ETHOnline 2026): "1,200 adversarial strategies across 45,360 draws, zero got past a bound"; no partner prize.
- 26 of 53 finalists in 2026 showed no partner prize on their page, and 9 of 53 depended on a physical device (same catalogue).

UNSU and Takarabako came through Continuity, so the panel takes them as examples of how to pitch, not of how much to build. A fresh team cannot match their build depth.

## How this panel scores (Judgement)

- **Score** (1 to 10) is the chance of reaching the top 10 after a clean run and a hard Q and A, compared with the six calibration finalists. 8 means we would argue for it in deliberation; 6 means it needs a weak field; 4 or below means it will not survive deliberation.
- **Keep** means pitch as written, with the note applied. **Revise** means the idea can be a finalist but the draft's version will not be. **Drop** means drop it as a finalist bet (it may still be a fine partner prize play).
- What the panel prizes, from the calibration set: a sentence a VC can repeat (VEIL VPN, UNSU, Carte Bleue), a number with a replay (TARE, Cordon), and something physical or with real money in it (Takarabako, Carte Bleue). What it punishes: a moment only a specialist can read, a moment the team planted against itself, and anything that needs two phones and four panels to follow.

## Scorecard at a glance (all Judgement)

| # | Candidate | Sentence we would repeat | Proof moment lands by | Score | Verdict |
|---|---|---|---|---|---|
| 10 | Walkaway | "They blocked Aave's site and took real money out of Aave from a USB stick" | 1:00 | 8 | Keep |
| 1 | Truthsign | "The screen said Alice, the money went to a stranger, the wallet refused" | 0:55 | 8 | Keep |
| 8 | Residue | "Buy an ENS name and the seller kept a spare key; their escrow refused" | 0:45 | 7 | Keep |
| 2 | Upgrade Council | "The AI held the deploy key and still could not slip in a hidden sweep" | 0:25 to 0:55 | 7 | Keep |
| 4 | Greenshoe | "An IPO greenshoe for token launches, enforced by bytes" | 1:30 | 7 | Revise |
| 5 | Reserve Gate | "Same code, one instruction different: one wallet paid the Kelp dumpers, one refused" | 1:40 | 6 | Revise |
| 14 | Last Out | "The influencer pressed sell and the signature was refused" | 1:30 | 6 | Revise |
| 15 | Witness | "A box on the desk turned red because the transaction was not what I said" | 0:50 | 6 | Revise |
| 7 | HookBreak | "A generic fuzzer found the Cork exploit on the real block" | 1:10 | 6 | Revise |
| 16 | Regas | "Same signature, two testnets, one silently lost the user's action" | 1:40 | 6 | Revise |
| 6 | Bidproof | "Every real token auction checked, and a bid that refuses a rigged one" | 1:20 | 6 | Revise |
| 3 | Pause Fast | "Three chains froze in seconds and only a person could unfreeze them" | 0:55 | 5 | Revise |
| 9 | Lanes | "Fifty stolen signatures, zero admitted" | 1:10 | 4 | Drop |
| 11 | Issuer Brake | "A trustee killed a forced bond transfer while the network made it wait" | 1:30 | 4 | Drop |
| 13 | Hundi | "An invoice that cannot be financed twice" | 0:55 | 4 | Drop |
| 12 | Gas Ledger | "They handed us a script to drain their relayer" | 1:00 | 3 | Drop |

## Candidate notes (all Judgement unless a URL is given)

### 1. Truthsign: 8, keep
- **Sentence:** "The screen said Send 100 USDC to alice.eth, the transaction paid a stranger, and the wallet refused." Every judge gets it by 0:55, and the WazirX and Bybit hook gives it billions in stakes.
- **Risk in Q and A:** the lying descriptor in the demo is one the team wrote. A protocol engineer will ask, "Did you write the bad descriptor yourselves?" If the registry sweep finds zero real disagreements, the whole moment is a strawman.
- **Single most important fix:** set up the planted case as the real attack: a malicious descriptor submitted to the registry, or served by a tampered frontend the way Bybit's was. Then open the sweep card at once, with a real count and a replay row, even if the count is zero for "wrong field" and the only findings are "effect not displayed". Cut the GitHub-off Arkiv beat from the live 4 minutes. It is a second story; keep it for the Arkiv video.

### 2. Upgrade Council: 7, keep
- **Sentence:** Fact: AI agents were the primary tag on 13 of 53 finalists in 2026, and on 5 of 8 at ETHOnline 2026 ([Showcase ETHOnline 2026](https://ethglobal.com/showcase?events=ethonline2026), via `finalists_2026.md`). Judgement: "The AI holds the deploy key and still cannot upgrade the vault" fits that wave and the Drift loss.
- **Risk:** "a human approves the agent" is a pattern judges have seen (Omamori, Airlock, Commitment Issues per the draft). If the remembered moment is the World prompt on a phone, it reads as one more approval app.
- **Single most important fix:** make the upgrade card the star, and do it by 0:30. Show the hidden `sweep(address)` and the storage collision in plain words ("this upgrade adds a function that can empty the vault"), then the deny. The two-signature and nullifier beats belong in Q and A, not on stage. Say "proxy" once and never say "OIDC" out loud.

### 3. Pause Fast, Unpause By A Person: 5, revise
- **Sentence:** "Fast to stop, slow to restart" is a good line, and three chains freezing is visual.
- **Risk:** four chains, CRE, CCIP, an LLM triage step, World and two phones. We lose the thread by the third acronym. The live part runs on Chainlink Local, and the attack hits the team's own wallet, so the freeze is a simulation of a simulation. At 63 to 65 hours there is no slack for a clean stage run.
- **Single most important fix:** cut to one partner and one asymmetry. Keep Chainlink (CRE plus CCIP), drop World and the LLM triage, and make the 4 minutes about one sentence: the pause crosses at block depth, the unpause waits for finality, both shown with real message IDs.

### 4. Greenshoe: 7, revise
- **Sentence:** VCs and founders know "greenshoe" from IPOs, and the panel can repeat "an IPO greenshoe for token launches, paid for by the launch's own buyers". Aqua entries have a strong finalist record (OddsFlow, watermark, ArcBook, per the catalogue).
- **Risk:** the proof moment arrives at 1:30, after a slide and a buyer rush. Someone on the panel will say "price support is market manipulation" before the team does.
- **Single most important fix:** open on the whale dump. By 0:30 the fills land exactly on the 0.97 line and the Safe's USDC falls. Then rewind to show where that budget came from. Say the manipulation answer in the first 20 seconds ("disclosed, time-boxed, the same rule regulated IPOs use"), not at 3:30.

### 5. Reserve Gate: 6, revise
- **Sentence:** the two-wallet split ("same code, one instruction different") is the clearest visual contrast in the file, and the Kelp loss is recent and large ([CoinDesk](https://www.coindesk.com/tech/2026/04/19/2026-s-biggest-crypto-exploit-kelp-dao-hit-for-usd292-million-with-wrapped-ether-stranded-across-20-chains), via the draft).
- **Risk:** "LST", "rsETH", "adapter", "coverage", "LayerZero" and "CRE" all come before the moment, so the VCs drop out. Several rate-pegged LST makers will be in the room, which makes the category feel crowded.
- **Single most important fix:** put the split first, by 0:45, with one plain line: "the token's price said 1:1; the vault behind it held 26 cents on the dollar". Cut the supply-velocity beat and say "backing" instead of "coverage" all the way through.

### 6. Bidproof: 6, revise
- **Sentence:** "Uniswap's docs say checking the auction is your job; nobody built the checker." That is a good opener for protocol engineers, and a population table with replay rows is the TARE pattern.
- **Risk:** the rigged auction is one the team built. If fewer than about 10 real CCA auctions exist, the population number, which is the only part a judge can't take for a strawman, disappears. Generalists don't know what a CCA is.
- **Single most important fix:** let the hour-4 count decide. If the real population is small, don't pitch Bidproof as a finalist bet; enter it for the Uniswap prize only. If it is large, lead with the scan header and one real row a judge picks, and show the planted auction second.

### 7. HookBreak: 6, revise
- **Sentence:** "A generic fuzzer found a real $11M exploit on the real block, with no hint" is the team's craft on stage, and protocol engineers will lean in.
- **Risk:** Cork's bug is a missing caller check that static tools flag. The first Q and A question will be "Slither finds that in a second", the second "you picked properties knowing the answer". A climbing call counter is not a visual moment for VCs.
- **Single most important fix:** the finalist claim lives or dies on a bug that only fuzzing finds. Either reproduce the Bunni rounding drain (or an equally non-static historical bug) by the Fri 18:00 gate and lead with it, or pitch HookBreak to Uniswap only. Lead with the drained balance on the fork, not with the counter.

### 8. Residue: 7, keep
- **Sentence:** "You bought the house and the seller kept a key." A judge clicks Buy, the escrow refuses by 0:45, and the reason is concrete. It is timely: "Today, ENSv2 is live on Ethereum mainnet", 27 Oct 2026 ([ENS blog](https://ens.domains/blog/post/ensv2-live-on-mainnet), via the draft).
- **Risk:** stakes are small (ENS name sales, not billions). If residue survives only `unsafeTransfer`, the claim narrows to a path few sellers use. After one week of ENSv2 on mainnet, the "paste any name" lens may have little real data.
- **Single most important fix:** use the house-key metaphor in the first sentence and keep "subregistry", "EAC" and "emancipated" off the stage. If the Thursday ENS answer is "only `unsafeTransfer` leaves residue", lower this to a 6 and enter it for the ENS prize rather than as the finalist lead.

### 9. Lanes: 4, drop
- **Sentence:** "Fifty stolen signatures, zero admitted" is crisp.
- **Risk:** a generalist asks "doesn't a cold-key multisig already stop that on today's chain?", and the honest answer is mostly yes. The novelty only an alt mempool allows is the twenty parallel lanes, and parallel lanes on a devnet explorer are not a WOW moment. Practicality 5 (Hegota is 2027) and an explorer-heavy UI.
- **Single most important fix (reason to drop):** no generalist sees this as a finalist. It is a sound EF alt mempool prize entry, which is where it belongs.

### 10. Walkaway: 8, keep
- **Sentence:** "Block the app, block the API, block the RPC companies, and still take real money out from a file on a USB stick." This is the UNSU and Carte Bleue pattern (nothing from the vendor, works anyway), with real mainnet money, which the catalogue notes as a recurring finalist trait. Usability and WOW are the highest in the file.
- **Risk:** the first question will be "Etherscan's write tab or an IPFS copy of the frontend does this". The original part, naming the key, keeper or hook that can still stop you, arrives at 1:50. Anon-RPC latency on venue Wi-Fi can stall the money moment.
- **Single most important fix:** bring the "who can still stop you" verdict into the first minute next to the withdrawal, and answer the Etherscan question unprompted ("Etherscan is a site too; it is blocked; and it cannot tell you a hook can trap your LP"). Use a phone hotspot and a pre-warmed worker, and have a recorded fallback ready for the exact 1:00 beat.

### 11. Issuer Brake: 4, drop
- **Sentence:** "A trustee killed a forced transfer while the network made it wait" is reasonable, but tokenized bond issuer powers are niche for this panel.
- **Risk:** ATS, HCS, KeyLists, scheduled ContractExecute and Agent Pass add up to five unfamiliar terms, and the Hedera stack is the weakest team fit in the file. Gate (b) could remove the core mechanism.
- **Single most important fix (reason to drop):** too much glossary for too small an audience. Keep it only as a Hedera prize play.

### 12. Gas Ledger: 3, drop
- **Sentence:** "Please drain our relayer" is a bold invitation, but what follows is a loss meter turning grey. That is a bound holding, not a moment.
- **Risk:** checkouts are among the most crowded hackathon categories, and a capped relayer loss is an operations detail. The whole stack depends on getting prize USDT.
- **Single most important fix (reason to drop):** no generalist remembers it. Enter it for Whitechain only, if the USDT source is confirmed.

### 13. Hundi: 4, drop
- **Sentence:** "An invoice that cannot be sold twice" is clear, and the hundi frame will land with Mumbai judges.
- **Risk:** a duplicate-check revert sounds trivial to a protocol engineer. The panel will say the hard problem, a supplier and debtor colluding on a fake invoice, is the honest limit the draft names. Technicality 6.
- **Single most important fix (reason to drop):** it is the cheapest Whitechain Tokenize build, and that is where it should stay. It is not a finalist bet.

### 14. Last Out: 6, revise
- **Sentence:** "The influencer pressed sell and it was refused" is the most consumer-legible moment in the file, and VCs know the pump-and-dump problem.
- **Risk:** the first question is "he just sells from another wallet". IDKit stops a second ranked profile, not a side wallet, so the promise shrinks to "his ranked account". Once that's said on stage, the sentence loses most of its punch. The leader's own triggers are held offchain by Flash ([Non-custodial](https://flash.definitive.fi/docs/non-custodial.md), via the draft).
- **Single most important fix:** reframe it as visible skin in the game, not dump prevention. "Before you copy, you can see that the leader's position is locked behind yours" is a promise the mechanism keeps against the side-wallet question.

### 15. Witness: 6, revise
- **Sentence:** "A box on the desk turned red because the transaction was not what I said" is the most WOW-heavy moment here, and hardware is a finalist pattern (9 of 53 in 2026).
- **Risk:** the deterministic decoder plus a contacts list catches the poisoned address on its own, so Q and A asks "why is the AI there?". Transcription on a noisy expo floor, a Pi, and sealed inference latency stack three live failure modes on one beat. The team is DeFi security, not hardware.
- **Single most important fix:** make the moment survive bad audio. Use push-to-talk, a close mic, and a typed-intent fallback shown on the same screen. Give the model a job the decoder cannot do, such as resolving "Mom" or "about fifty", and show it in the first minute.

### 16. Regas: 6, revise
- **Sentence:** "Same signature, same gas, two testnets: one did what you asked, the other said success and did nothing." Protocol engineers will love the timing. The EF postponed Hoodi "to allow for further investigation of interactions of EIP-8037 with mainnet smart contracts" ([EF blog, 22 Oct 2026](https://blog.ethereum.org/en/2026/10/22/glamsterdam-hoodi-delay), via the draft).
- **Risk:** VCs drop out at "EIP-8037" and "state gas". The forwarder is the team's own, so the failing contract is one the team wrote to fail. If Hoodi activates Glamsterdam before Saturday, the two-testnet contrast disappears. Feasibility is the least verified in the file.
- **Single most important fix:** say no EIP numbers on stage and lead with the user's lost action. Back the planted forwarder with a population count over a real, public guard shape, the one ChainSecurity's warning describes, without naming contracts. Recheck Hoodi's schedule on Thursday morning before committing.

## Cross-cutting notes (Judgement)

- **Lead with the refusal, then the population.** In the calibration set, the planted case convinces only when a real number backs it (TARE's 125,072 measurements, Cordon's 45,360 draws). Truthsign, Bidproof, HookBreak and Regas all depend on their real count. Decide each one at its hour-4 gate, not on Saturday.
- **Three candidates open with the Binance theft.** That is fine for one team. But the finalist judges will have heard "Binance" from other teams that morning, so the second sentence must be the product, not the hack.
- **Jargon budget.** Each pitch gets two terms of art in the first minute. Candidates 3, 9, 11 and 16 spend more than that before the proof moment.
- **Panel's pick if the team commits to one finalist bet:** Walkaway (10) or Truthsign (1), with Residue (8) as the pivot if the EF Thursday answers go badly. This agrees with the draft's section 5. The difference is that the panel puts Walkaway level with or ahead of Truthsign, because its moment uses real money and nothing the team planted.

## Gaps

- No ETHGlobal page was re-fetched; prize and judging text is the 2026-10-31 snapshot in the repo notes.
- Calibration finalist descriptions are self-reported showcase text, not judge notes.
- Scores assume a clean run of the draft's 4 minute script after the named fix. None of the hour-4 gates has been tested.
