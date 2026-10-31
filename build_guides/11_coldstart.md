# 11 Coldstart: build guide

New idea (2026-11-01), not from the harness lists. Track: EF "Best use of the Frame Transaction Alternative Mempool". The mechanism (one nonce lane per item from a shared sender) is the same trick as B3 Lanes in `track_ideas/ideas/ef.md` section 4.5; the product and the story are new. Read `00_common.md` first.

## 1. Summary, promise, prize stack

**Summary.** A link that pays a brand-new wallet holding 0 ETH, with no relayer and no backend. The sender funds an **envelope**: an EIP-8141 frame account holding N packets, each tied to a one-time key that exists only inside its link. Opening a link builds a frame transaction whose sender is the envelope. The envelope's own validation code checks the link key, that the packet is unclaimed, and that the transaction does nothing except "pay this packet to this address". The envelope pays the gas out of the packet, and the recipient gets the packet minus the fee. Every packet has its own nonce lane (EIP-8250 keyed nonces), so 20 claims against one envelope sit in the alt mempool at once, while the canonical mempool allows one pending transaction per sender.

**The problem in one line.** To receive your first dollar on Ethereum you need ETH, so every app hires a relayer: a company that pays your gas and can block you, log you, or disappear.

**Falsifiable promise.** "A wallet created seconds ago, holding 0 ETH, receives a payment from a link with no relayer and no backend. Twenty claims against one envelope are pending at once in the alt mempool while the canonical rules admit one. A link holder cannot redirect a claim, replay a claimed packet, claim one packet twice in parallel, or make the envelope do anything except pay their own packet: each attempt is refused at validation and costs the envelope nothing."

**Prize stack (one partner).**

| Prize | Verbatim requirement (Facts, [EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)) | How this build meets it |
|---|---|---|
| EF "Best use of the Frame Transaction Alternative Mempool" ($2,500 / $1,500 / $1,000) | "something only an alt mempool makes possible: applications that need (a) frame transactions with verification budget higher than 100k (e.g. PQ-secure smart wallets, or PQ-secure privacy protocols), or (b) more flexible state access in sender or paymaster (e.g. ERC20 paymasters, daily quota paymasters)"; judging "creativity", "usefulness", "practicality", "how well it works", "relation to the alt mempool"; "Show real alt mempool usage: a link to your admitted transaction on the devnet explorer, or code that submits one. Your team must be able to explain the design, the code and the trade-offs." | Many pending claims from one shared sender is a shape the canonical rules forbid ("At most one pending frame tx is allowed per sender", [EIP-8141 mempool](https://eips.ethereum.org/EIPS/eip-8141#mempool)) and the alt mempool admits; every claim is an admitted transaction with an explorer link. Stretch M10 adds area (b): USDC packets whose gas is paid through an ERC-20 paymaster |

Judgement: EF places each project in at most one EF prize ("EF judges decide where it fits best"), so the README also carries a CROPS section (section 11) in case they place it in Best CROPS App. No second partner: nothing else fits without a second story.

## 2. Architecture

```
  [create page, static]  amount and packet count -> N one-time keys made in the browser
        |  deploys and funds the envelope, registers N packet key addresses
        v
  [Envelope frame account, alt mempool devnet]
        storage: packet id -> key address, amount, claimed; fee cap; creator; refund date
        VERIFY frame (read only):
          signer of signature 0 (SIGPARAM) is the key of packet P; P unclaimed
          nonce key of this tx == P            (one lane per packet)
          frames are exactly [VERIFY self, SENDER self.payout(P, recipient)], value 0
          max cost <= fee cap
          -> APPROVE execution and payment
        SENDER frame: payout(P, recipient) marks P claimed, sends amount minus fee cap
        ^
  [claim page, static]  link fragment holds P and its key; recipient address made in the browser
        |  builds the frame tx with hegota-support, signs with the packet key
        v
  [sidecar gateway] eth_sendFrameTransaction -> ethrex devnet -> explorer
  [canonical check] same shape via eth_sendRawTransaction straight to ethrex: canonical rules
```

**The envelope in plain English.**
- **Stores** the creator address, a fee cap per claim, a refund date, and one record per packet: the packet key's address, the amount, a claimed flag.
- **Validation path** (the VERIFY frame, read only, runs before anything is paid):
  1. Reads the resolved signer of signature 0 with SIGPARAM and finds the packet whose key it is.
  2. Refuses if that packet is claimed.
  3. Refuses unless the transaction's nonce key equals that packet's id, so two claims of one packet compete for one lane and become replacements of each other, never parallel claims.
  4. Reads the transaction's own frames (FRAMEPARAM, FRAMEDATALOAD or FRAMEDATACOPY) and refuses unless there are exactly two: this VERIFY frame and one SENDER frame that targets the envelope with value 0 and calldata "payout(this packet, some recipient)".
  5. Refuses if the transaction's maximum cost exceeds the fee cap (TXPARAM).
  6. Calls APPROVE with execution and payment scope.
- **Execution path:** `payout` may be called only by the envelope itself (in a SENDER frame the caller is the sender). It marks the packet claimed and sends the amount minus the fee cap to the recipient.
- **Why step 4 is the security core:** approving execution authorises every later SENDER frame (`research_notes/EF tracks and Whitechain ideas/frame_tx_alt_mempool.md` Q3, "APPROVE_EXECUTION authorizes every later SENDER frame"). The link key is a bearer key; without frame introspection a link holder could add a frame that sends the envelope's whole balance to themselves.
- **Refund** (milestone M10): after the refund date the creator's key can sweep unclaimed packets. The date is checked in the execution body, because TIMESTAMP is banned in the validation prefix (Fact, EIP-8141 mempool rules).
- **Recipient:** any address, including one with no code and no history. A transfer to a new account costs at least 204,600 gas on the devnet's gas model because of 183,600 state gas (Fact, `frame_tx_alt_mempool.md` Q2), so the fee cap must cover it.

## 3. Repo layout and scaffold

```
coldstart/
  contracts/      Envelope, devnet test scripts (Forge cannot execute the frame opcodes)
  packages/tx/    frame tx builder on hegota-support: build, sign, estimate, send, status
  app/            create page, claim page, lanes board, attack panel (static build)
  scripts/        probe tx, opcode probe, 20-claim burst, canonical comparison, attacks, simulate fuzz
  fixtures/       devnet profile notes, explorer links, recorded receipts and rejections
```

At 21:00: common scaffold, then `npm i @forshtat/hegota-support@0.0.1 viem@2.57.13` in `packages/tx` and `app`. `HegotaSupport.sol` ships inside the npm package; map it into Foundry with a remapping to `node_modules`. Forge compiles the envelope; tests run against the devnet through scripts, because "Forge and Hardhat cannot execute these opcodes" (Fact, hegota-support README via `frame_tx_alt_mempool.md` Q3).

## 4. Dependencies

| What | Detail | Status |
|---|---|---|
| Tx toolkit | `@forshtat/hegota-support` 0.0.1 (published 2026-10-25): `/tx` build, encode, sign; `/rpc` with `explainRejection()`; `/profiles`; `HegotaSupport.sol` | Fact (npm, checked 2026-11-01). Ask the alt mempool team which version and profile match the event devnets |
| Event devnets | RPCs `devnet1/2/3.altmempool.wtf`, gateways `gateway1/2/3.altmempool.wtf`, explorer `altmempoolexplorer.forshtat.com`, faucet on site, "keyed nonces and recent roots live" | Fact ([EF prizes](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)); chain IDs and faucet URL (verify) |
| Fallback devnet | chain 1337: RPC `https://altmempool.forshtat.com`, sidecar `/rpc`, explorer `explorer.altmempool.wtf`, 6 s blocks | Fact (`frame_tx_alt_mempool.md` Q2); may be reset |
| Opcodes | on chain 1337 only APPROVE and SIGPARAM were verified on the devnet; TXPARAM, FRAMEDATALOAD, FRAMEDATACOPY, FRAMEPARAM are "from the EIP text" and "may differ from what the client implements" | Fact (hegota-support README). **Gate 1 checks this** |
| Keyed nonces | EIP-8250, NONCE_MANAGER at `0x...8250` on the devnet; the sidecar has no cap on keyed transactions per sender but caps linear ones at 4 | Fact (`frame_tx_alt_mempool.md`; `track_ideas/ideas/ef.md` section 4.2) |
| Canonical contrast | sending a type 0x06 tx straight to ethrex with `eth_sendRawTransaction` "applies the canonical rules instead" | Fact (alt mempool devnet docs via `frame_tx_alt_mempool.md` Q2) |
| Status and simulate | `skandha_frameTransactionStatus`, `eth_estimateFrameTransactionGas`, `ethrex_simulateFrameTransaction(rawTx, block, {trace:true})` returning `valid`, `prefixShape`, `violation` | Fact (rpc-methods docs) |
| Gas | new-account transfer at least 204,600 gas; contract creation needed a gas limit of about 6M | Fact (devnet docs) |

## 5. Core algorithms in plain English

**Create.** In the browser: generate N secp256k1 keys; deploy the envelope with the N key addresses, the amounts and the fee cap; fund it with the total. Each link is `https://<host>/c#<chainId>.<envelope>.<packetId>.<packetKey>`. The fragment after `#` is never sent to any server, so a static host never sees a key. Output: link cards with QR codes and a CSV download.

**Claim.**
1. Parse the fragment. Read the packet's record from the devnet: unclaimed or not, amount.
2. Recipient: a fresh address generated in the browser (default, with a "save this key" step), a pasted address, or a connected wallet.
3. Build the frame transaction: sender is the envelope; nonce key is the packet id at sequence 0; frames are VERIFY on the envelope and SENDER on the envelope calling `payout(packetId, recipient)`; signature 0 is a SECP256K1 signature by the packet key over the sig hash, which commits to every frame including the recipient.
4. Estimate with `eth_estimateFrameTransactionGas`, set the max fee under the fee cap, send with `eth_sendFrameTransaction`, poll `skandha_frameTransactionStatus`, show the explorer link.

**Burst.** A script opens 20 links at once: 20 transactions from one sender on 20 nonce lanes; the lanes board shows all 20 pending, then included.

**Canonical comparison.** Twenty fresh claims against a second envelope go straight to ethrex with `eth_sendRawTransaction`. Expected: one accepted, nineteen refused under the one-pending-per-sender rule; `explainRejection()` turns each error into a rule family for the screen.

**Attacks (all refused at validation, so no gas is spent).**
- Redirect: change the recipient in a claim seen in the mempool; the signature no longer matches.
- Replay: claim a packet that was already paid.
- Parallel double claim: the same packet on a second nonce key; refused by step 3.
- Drain: a link holder adds a third frame that sends the envelope's balance to themselves; refused by step 4.
- Fee grab: max fee above the fee cap; refused by step 5.

**Fuzz through simulate, not the shared mempool.** A script generates 1,000 frame layouts signed by a valid packet key (extra frames, other targets, non-zero values, other packets, other lanes) and runs each through `ethrex_simulateFrameTransaction`. Property: the envelope approves exactly the one allowed layout. Counts go in the README. Only a handful of transactions are sent to the shared devnet (etiquette, `frame_tx_alt_mempool.md` Q8).

## 6. Milestones

| # | Build | Acceptance test | Owner |
|---|---|---|---|
| M0 | Probe | one frame tx from a default-code EOA admitted through the event sidecar; profile and chain ID written to `fixtures/` | B (hour 1) |
| M1 | Opcode probe | a tiny frame account that approves only if FRAMEPARAM, FRAMEDATALOAD (or FRAMEDATACOPY) and TXPARAM return the expected values; admitted means introspection works on this devnet | A (hours 1 to 3) |
| **Gate 1, Fri 01:00** | M0, M1 and one envelope claim | explorer link of a claim paid to a 0 ETH address | A, B |
| M2 | Full envelope validation and payout | devnet script: each of steps 1 to 5 refuses its case; a good claim pays amount minus fee | A |
| M3 | Tx package | build, sign, estimate, send, status for one claim and for 20 claims on 20 lanes | B |
| M4 | Create and claim pages | a fresh browser profile with no wallet claims a packet in under 30 seconds | C (on fixtures from hour 0) |
| **Spine, Fri 09:00** | create 3 packets, claim one from a fresh profile with 0 ETH | explorer link | all |
| M5 | Burst and lanes board | 20 pending lanes on screen, then 20 included | B, C |
| M6 | Canonical comparison | 1 accepted, 19 refused, reasons recorded | B |
| M7 | Attack scripts and panel | five attacks, five refusals with the rule shown | A, C |
| M8 | Simulate fuzz | 1,000 layouts, exactly one approved shape, counts printed | A |
| **Demo path, Fri 18:00** | every beat of section 10 | timed under 4:00 | all |
| M9 | Two static hosts | the claim page works from an IPFS gateway and from GitHub Pages; the "site off" beat | C |
| M10 | Stretch (cut first) | refund after date; USDC packets through an ERC-20 paymaster (area (b)) | A, B |
| M11 | README with CROPS section, video | `00_common.md` section 7 checklist | C, B |

## 7. Hour-by-hour plan

| Time (IST) | A | B | C |
|---|---|---|---|
| Thu 21:00 to 22:00 | Scaffold; read the event devnet profile with Pierre or Alex | **M0 probe** | Design system; create and claim screens on fixtures |
| 22:00 to 01:00 | **M1 opcode probe**, then the envelope's validation | M3 builder for one claim; faucet funds | Claim flow states: empty wallet, sending, paid, refused |
| **Fri 01:00** | **Gate 1** | | |
| 01:00 to 07:00 | M2 refusals one by one on the devnet | M3 keyed lanes; status polling | Sleep 02:00 to 07:00 |
| 07:00 to 09:00 | M2 payout and fee accounting | Sleep 07:30 to 11:30 | Wire claim page to the builder |
| **Fri 09:00** | **Spine** | | |
| 09:00 to 12:00 | M7 attack scripts | (from 11:30) M5 burst script | Lanes board; create page polish |
| 12:00 to 16:00 | Sleep (start the M8 simulate fuzz first) | M6 canonical comparison | Attack panel; demo mode keys |
| 16:00 to 18:00 | M8 counts | Rehearsal of burst and comparison | Rehearsal 1 |
| **Fri 18:00** | **Demo path** | | |
| 18:00 to 00:00 | Security read of the envelope; M10 only if green | M9 hosting; README run steps | Copy pass; How-it-works page with the lane diagram |
| **Sat 00:00** | **Freeze** | | |
| 00:00 to 02:00 | Pre-send the burst and the attacks; save explorer links | Re-check the faucet balance; record fallbacks | Rehearsals 2 and 3 |
| 02:00 to 04:30 | Q and A prep | Nap 02:30 to 04:00 | Record and edit |
| 04:30 to 07:00 | Nap 04:00 to 05:30; README trade-offs | CROPS section | README layout |
| 07:00 to 09:00 | Submit draft 07:00; final 08:30 | | |

**Pivot rule.**
- No admitted frame tx at all by Fri 01:00 and the alt mempool team cannot fix it: switch tracks to `12_really_you.md` (World Agent Pass). C's design system carries over.
- Transactions work but frame introspection does not (M1 fails): one envelope per packet (each a frame account created with a deploy frame) removes the drain risk, but different senders no longer show the one-sender contrast. Then the alt mempool relation must come from area (b): build M10's ERC-20 paymaster as the core.

**Cut order.** Refund, USDC stretch, second static host, lanes animation. Never the 0 ETH claim, the burst contrast, or the attacks.

## 8. Pre-event checklist

- [ ] Read EIP-8141 at the commit the devnet pins, the ERC-8421 draft (PR #2028), the hegota-support README, the workshop repo and docs (`frame_tx_alt_mempool.md` has the links).
- [ ] EF Discord, then the EF workshop (Thu 17:00, Room 2) and Pierre and Alex in person. Deciding questions: which hegota-support profile matches devnets 1 to 3; are FRAMEPARAM, FRAMEDATALOAD, FRAMEDATACOPY and TXPARAM live; is there any cap on keyed lanes per sender at the sidecar; how to read a transaction's nonce key inside VERIFY; where the faucet is; how to show a canonical rejection.
- [ ] Node 22, Foundry, a phone hotspot; a second browser profile with no wallet extension for the "brand-new user" beat.
- [ ] Not allowed before 21:00: the envelope, the builder, the pages, the scripts.

## 9. Test plan

- **Devnet scripts:** one per refusal (steps 1 to 5) and one good claim, each printing the rejection reason or the receipt.
- **Simulate fuzz:** 1,000 layouts, exactly one approved shape.
- **Builder tests:** encode and decode round trip against the profile; sig hash changes when the recipient changes.
- **UI:** each claim state reachable in demo mode; the claim page works with JavaScript storage blocked.
- **Fixtures:** explorer links for the claim, the burst, the canonical rejections and each attack; recorded screen of every beat.

## 10. Demo

**20 second hook (C).** "To receive your first dollar on Ethereum you need ETH. So every app hires a relayer: a company that pays your gas and can block you or log you. This browser has no wallet and no ETH. Watch it get paid anyway, with no relayer and no server."

| Time | On screen | Fallback |
|---|---|---|
| 0:00 | Hook; the fresh browser profile; "0 ETH" | none |
| 0:25 | **The moment:** open a link, a new address is made, "Claim" pressed; paid within one or two blocks; explorer shows the envelope paid the gas | recorded clip and explorer link |
| 1:05 | Burst: 20 links opened at once; the lanes board fills with 20 pending claims from one sender; the canonical column shows 1 accepted, 19 refused with the rule | pre-sent burst, saved board |
| 1:50 | Attacks: redirect, replay, double claim, drain, fee grab: five REFUSED rows, no gas spent | recorded |
| 2:40 | "Site off": the hosting is switched off; the same link works from a saved copy of the page | recorded |
| 3:10 | Fuzz count (1,000 layouts, one approved), trade-offs, close | slide |

"Frame transaction" is said once, after the first claim lands. "Nonce key" and "APPROVE" are for Q and A.

**Video (2:00 to 2:59).** Hook; the 0 ETH claim inside the first 45 seconds; the 20-lane contrast; the attack panel; the site-off beat; end card with the explorer link.

## 11. README draft

Order: promise; screenshot of the paid card; quick start (one command for the devnet, one for the pages); how it works (the diagram); the five validation checks and why each exists; the attack table (attack, check that stops it, explorer or simulate output); the canonical versus alt mempool table with the rule cited; trade-offs (bearer links, fee cap above real gas, devnet only until Hegota); fuzz counts; AI usage; licence (MIT).

**CROPS section (draft lines).**
- **C:** no server and no relayer. The page is static and can be served from anywhere; claims go to any alt mempool node. If our hosting disappears, a saved copy of the page or the CLI still claims.
- **O:** MIT; the repo builds the contract, the builder and the pages with no service accounts.
- **P:** no backend exists to learn anything. The link key stays in the URL fragment and the browser. The recipient address is not linked to any funding transaction. The node that receives the claim sees the transaction and the submitter's IP (stated; routing the submit through Anon-RPC is possible and out of scope).
- **S:** a link is a bearer key for one packet; validation limits that key to "pay this packet to this address". The creator's exposure is one packet per leaked link. Trust assumptions: the devnet clients and our envelope code.

## 12. UI/UX

| Screen | What it shows | States |
|---|---|---|
| Create | Amount per packet, number of packets, "gas comes out of each packet: about X" in plain words | invalid amount, not enough funds, deploying, ready |
| Links | One card per packet: QR, copy, share; "Anyone with this link can claim this packet once" | claimed cards turn grey with the explorer link |
| Claim (mobile first) | Large amount; "This wallet has 0 ETH. You do not need any."; one Claim button | checking link, sent, included in block N (verdict card PAID), already claimed, link not valid, network busy |
| Save your key | Only for a burner recipient: the key, a copy button, a one-line warning | skipped shows a persistent reminder |
| Lanes board | 20 lanes from one sender filling in live; a canonical column beside it | pending, included, refused with the rule |
| Attack panel | Five rows: attack, what it tried, REFUSED, the check that stopped it | each row expands to the raw rejection |

Copy: the first minute never says "frame transaction", "nonce" or "mempool"; it says "a transaction that pays for itself". Numbers carry units ("0.0021 ETH fee from your 0.05 ETH packet").

## 13. Risks and fallbacks

| Risk | Trigger | Fallback |
|---|---|---|
| Profile mismatch with the event devnets | M0 | Ask on site; use chain 1337 as a fallback devnet and say so |
| Introspection opcodes not live | M1 | Pivot rule: one envelope per packet plus the ERC-20 paymaster as the alt mempool relation |
| Nonce key not readable in VERIFY | M2 | Accept parallel duplicates and state the bounded invalidation in the README (the loser is invalid at inclusion and pays nothing) |
| Sidecar caps lanes per sender below 20 | M5 | Show as many as admitted and cite the cap; the canonical contrast is still 1 |
| Devnet reset during the event | any | One command redeploys and re-funds; links regenerate |
| Faucet empty | any | Ask the alt mempool team; keep a funded key from Thursday |

## 14. Q and A prep

| Question | 20 second answer | Screen |
|---|---|---|
| "Isn't this a paymaster?" | No third party pays. The money being delivered pays its own gas, and the envelope's code decides validity | diagram |
| "Why not ERC-4337?" | 4337 needs a bundler, which is a relayer by another name and can refuse you. Frame transactions are protocol native; any node can carry the claim | README |
| "What stops a link holder from draining the envelope?" | Validation reads the transaction's own frames and approves exactly one shape: pay this packet to this address | attack panel, fuzz count |
| "Mass invalidation?" | Claims touch different packets, so one claim never invalidates another; a second claim of one packet sits on the same lane and replaces, never multiplies | lanes board |
| "Why does the canonical pool refuse?" | One pending transaction per sender is a canonical rule; a shared sender needs the alt mempool's rules | canonical column |
| "Two people open the same link?" | One lane per packet: the first one in wins, the other is refused and pays nothing | demo |
| "Who learns what?" | No backend; the node sees the claim and the submitter's IP | CROPS section |
| "When does this reach mainnet?" | Frame transactions are scheduled for Hegota; until then this is the reference for what relayer-free onboarding looks like | slide |

## 15. AI usage

Follow `00_common.md` section 8. A writes the envelope's validation by hand and reads every line the README links. The simulate fuzz generator may be AI-assisted; its properties are written by A.
