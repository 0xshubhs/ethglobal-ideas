# World (formerly Worldcoin) at ETHGlobal: track history, winners and what the judges reward

Research date: 2026-10-31. Sponsor: World (Tools for Humanity; listed as "Worldcoin" on ETHGlobal until mid 2024). Target: ETHGlobal Mumbai, 5 to 7 November 2026, fresh build (Classic track) only. Continuity-only tracks are recorded for history but never proposed.

## How this file was made

- Prize text: fetched on 2026-10-31 from `https://ethglobal.com/events/<slug>/prizes/world` (2024 Bangkok onward) or `.../prizes/worldcoin` (2023 to Singapore 2024), one request at a time with pauses. The main prize pages of every other ETHGlobal event from ETHOnline 2023 to Open Agents 2026 were checked for a World or Worldcoin sponsor slug; none was found (list in section 1). Prize text below is verbatim, with emojis dropped and one em dash in World's Tokyo text shown as "[dash replaced]".
- Winners: each event's showcase listing (`https://ethglobal.com/showcase?events=<slug>&page=N`) was parsed for cards carrying World's organisation logo (`cdn.ethglobal.com/organizations/3zpxc/...`), then the project pages were read for the exact "Winner of" line and the build notes. The finalist catalogues in `research_notes/ETHGlobal finalist ideas 2023 to 2026/` were used first and cross-checked.
- Bot checks: a Cloudflare "Just a moment" page appeared on a handful of project pages when two fetch streams overlapped (other research agents share the network). Those pages were not retried around the check; they were dropped and fetched later one at a time with longer pauses. Where a page could not be read, the gap is stated.
- Second pass (same day): the 2023 to 2024 winners in section 3.7 come from 146 more project pages, fetched one at a time about every 4 to 6 seconds, with no bot check hit. The Agent Pass and IDKit docs were re-read on `auth.world.org` and `docs.world.org`. Sections 4 to 8 (comparisons, synthesis, evolution and track mapping) were added in this pass.
- Every fact has a URL. Lines marked **Judgement** are this researcher's inference, not World's words.

## 1. Every ETHGlobal event with World prizes, late 2023 to October 2026

World sponsored 18 ETHGlobal hackathons in the window. It skipped every online async event except ETHOnline 2026, and skipped San Francisco 2024 and New York 2025.

| Event (slug) | Dates | World pool | Tracks and amounts | Source |
|---|---|---|---|---|
| Istanbul (`istanbul`) | 17 to 19 Nov 2023 | $20,000 | Best Overall $5,000; Most Creative $2,500; Best Governance App $2,500; Best AI Use Case $2,500; Best Sign In with Worldcoin App $2,500; Honorable Mentions 2 x $1,000; Pool Prize $3,000 (up to 34 teams, $88 cap) | [prizes](https://ethglobal.com/events/istanbul/prizes/worldcoin) |
| London (`london2024`) | 15 to 17 Mar 2024 | $20,000 | Best World ID Usage $10,000 ($4,000 / $3,000 / $2,000 / HM $1,000); Most Creative Use Case $2,500; Best Governance App $2,500; Best Public Goods Use Case $2,500; Pool $2,500 (up to 36 teams) | [prizes](https://ethglobal.com/events/london2024/prizes/worldcoin) |
| Sydney (`sydney`) | 3 to 5 May 2024 | $20,000 | Same four tracks as London; Public Goods split 2 x $1,250; Pool $2,500 (up to 21 teams) | [prizes](https://ethglobal.com/events/sydney/prizes/worldcoin) |
| Brussels (`brussels`) | 12 to 14 Jul 2024 | $20,000 | Best Use of World ID $10,000 ($4,000 / $3,000 / $2,000 / HM $1,000); Most Creative; Governance; Public Goods ($2,500 each); Pool $2,500 (up to 34 teams) | [prizes](https://ethglobal.com/events/brussels/prizes/worldcoin) |
| Superhack 2024 (`superhack2024`, online) | 2 to 16 Aug 2024 | $20,000 | Best Use of World ID $10,000; Gas Subsidy with World ID & Reth $4,000 (2 x $2,000); Transaction Priority with World ID & Reth $4,000; Pool $2,000 (up to 66 teams) | [prizes](https://ethglobal.com/events/superhack2024/prizes/worldcoin) |
| Singapore (`singapore2024`) | 20 to 22 Sep 2024 | $20,000 | Best Use of World ID $10,000 ($4,000 / $3,000 / $2,000 / 4th 2 x $500); Most Creative; Governance; Public Goods ($2,500 each); Pool $2,500 (up to 49 teams) | [prizes](https://ethglobal.com/events/singapore2024/prizes/worldcoin) |
| Bangkok (`bangkok`) | 15 to 17 Nov 2024 | $20,000 | Best Mini App $17,500 ($10,000 / 2 x $2,500 / 2 x $1,250); World Pool Prize $2,500 (up to 72 teams) | [prizes](https://ethglobal.com/events/bangkok/prizes/world) |
| Taipei (`taipei`) | 4 to 6 Apr 2025 | $20,000 | Best Mini App $17,500 ($10,000 / $5,000 / $2,500); Pool $2,500 (up to 34 teams) | [prizes](https://ethglobal.com/events/taipei/prizes/world) |
| Prague (`prague`) | 30 May to 1 Jun 2025 | $10,000 | Best Mini App $10,000 ($4,000 / $3,000 / $2,000 / HM 2 x $500) | [prizes](https://ethglobal.com/events/prague/prizes/world) |
| Cannes (`cannes`) | 4 to 6 Jul 2025 | $20,000 | Best Mini App $17,000 ($6,500 / $4,500 / $2,000 / HM 4 x $1,000); Pool $3,000 (up to 38 teams) | [prizes](https://ethglobal.com/events/cannes/prizes/world) |
| New Delhi (`newdelhi`) | 26 to 28 Sep 2025 | $10,000 | Best Mini App $10,000 ($4,000 / $3,000 / $2,000 / HM 2 x $500) | [prizes](https://ethglobal.com/events/newdelhi/prizes/world) |
| Buenos Aires (`buenosaires`) | 21 to 23 Nov 2025 | $20,000 | Best Mini App $17,000 ($6,500 / $4,500 / $2,000 / HM 4 x $1,000); Pool $3,000 (up to 30 teams) | [prizes](https://ethglobal.com/events/buenosaires/prizes/world) |
| Cannes 2026 (`cannes2026`) | 3 to 5 Apr 2026 | $20,000 | Best use of Agent Kit $8,000 ($4,000 / $2,500 / $1,500); Best use of World ID 4.0 $8,000 (same split); Best use of Minikit 2.0 $4,000 ($2,000 / $1,250 / $750) | [prizes](https://ethglobal.com/events/cannes2026/prizes/world) |
| New York 2026 (`newyork2026`) | 12 to 14 Jun 2026 | $15,000 | Track A (AgentKit) $7,500 ($3,500 / $2,500 / $1,500); Track B (World ID) $2,500 ($1,500 / $1,000); Track C (Existing Projects, Continuity only) $2,500; Track D (ProveKit) $2,500 | [prizes](https://ethglobal.com/events/newyork2026/prizes/world) |
| Lisbon 2026 (`lisbon2026`) | 24 to 26 Jul 2026 | $15,000 | AgentKit New Use Cases $8,000 ($4,000 / $2,500 / $1,500); Selfie Check Beta $1,750 ($1,000 / $750); Identity Check Beta Test $1,750; plus Continuity twins of both beta tracks ($1,750 each) | [prizes](https://ethglobal.com/events/lisbon2026/prizes/world) |
| ETHOnline 2026 (`ethonline2026`, online) | 4 to 16 Sep 2026 | $7,000 | AgentKit Continuity $3,500 (Continuity only, 3 x $1,166); Selfie Check $3,500 (3 x $1,166) | [prizes](https://ethglobal.com/events/ethonline2026/prizes/world) |
| Tokyo 2026 (`tokyo2026`) | 25 to 27 Sep 2026 | $15,000 | Best Use of IDKit $5,000 (2 x $2,500); Best Use of World ID for Agents $7,500 (3 x $2,500); [Cont] Best IDKit Use Case $2,500 (Continuity only) | [prizes](https://ethglobal.com/events/tokyo2026/prizes/world) |
| **Mumbai 2026** (`mumbai`) | 5 to 7 Nov 2026 | $12,500 | World ID Agent Pass $5,000 ($2,500 / $1,500 / $1,000); Best Use of IDKit $2,500 (2 x $1,250); Continuity twins of both ($2,500 each) | [prizes](https://ethglobal.com/events/mumbai/prizes/world) |

Checked and absent (no World or Worldcoin sponsor slug on the prize page): ETHOnline 2023, ETHIndia 2023, LFGHO, Circuit Breaker, Frameworks, Scaling Ethereum 2024, HackFS 2024, StarkHack, ETHOnline 2024, San Francisco 2024, Agentic Ethereum, Trifecta, Unite DeFi, New York 2025, ETHOnline 2025, HackMoney 2026, Open Agents. (Prize pages at `https://ethglobal.com/events/<slug>/prizes`, fetched 2026-10-31.)

Dates come from `research_notes/ETHGlobal finalist ideas 2023 to 2026/` (each catalogue cites its source).

## 2. Problem statements, verbatim, by era

### 2.1 Istanbul 2023: "Sign In with Worldcoin" and stated judging questions

The only World page in the window that publishes a judging rubric ([Istanbul prizes](https://ethglobal.com/events/istanbul/prizes/worldcoin)):

> Here's a few things we'll consider while judging your project:
> - Is there a meaningful problem being solved with World ID? Does the project have potential to solve a real problem in production?
> - Was the project fully integrated on both the frontend and backend? Does the integration work end-to-end?
> - Is the project introducing novel implementations or new tech?
> - Is the project posing a creative solution to a problem? Is World ID being used in a new way?

Best Overall: "This prize is for the best overall use of World ID! You can use either Anonymous Actions or Sign In with Worldcoin." Qualification: "If you're using Anonymous Actions, this means you must verify the proof returned from IDKit using our API or smart contracts. Projects that do not verify the proof correctly will not be eligible for this prize." Most Creative: "We're looking for applications that make us say, \"Why didn't we think of that?\"" Best AI Use Case: "AI safety, AI detection, or ensuring training data isn't tainted by AI-generated content ... simply using AI without World ID does not make your project eligible." Best Sign In with Worldcoin App: "your project must use Sign In with Worldcoin by leveraging our OIDC provider."

### 2.2 London to Singapore 2024: anti-bot, anti-sybil, proof validation required

Repeated almost word for word at London, Sydney, Brussels, Superhack and Singapore ([London](https://ethglobal.com/events/london2024/prizes/worldcoin), [Brussels](https://ethglobal.com/events/brussels/prizes/worldcoin), [Singapore](https://ethglobal.com/events/singapore2024/prizes/worldcoin)):

> These prizes are for the best overall use cases of World ID, Worldcoin's privacy-preserving proof of personhood protocol. Show us your ideas for where anti-bot and anti-sybil have the greatest impact!
>
> - Integrate Sign in with World ID or Incognito Actions.
> - World ID must be fully integrated. Proof validation is required and needs to occur in a web backend or smart contract.

Most Creative: "Past winners have included dating apps, coupon programs, agricultural finance, and more!" Governance: "DAO governance, private voting, etc." Public Goods: "public goods funding, quadratic funding/matching, or anything else that's primarily for a public benefit!"

Superhack 2024 added two infrastructure tracks for the then-upcoming World Chain ([Superhack prizes](https://ethglobal.com/events/superhack2024/prizes/worldcoin)):

> Gas Subsidy with World ID & Reth: Implement chain-wide gas subsidy for World ID-verified users with Reth. ... The gas subsidy should not require any integration work for contracts or applications deployed on your chain.
>
> Transaction Priority with World ID & Reth: Transactions from World ID-verified users should be included in blocks before transactions from unverified users. ... You should deploy your own OP Stack Testnet for this prize.

### 2.3 Bangkok 2024 to Buenos Aires 2025: Mini Apps only

([Bangkok](https://ethglobal.com/events/bangkok/prizes/world), [Taipei](https://ethglobal.com/events/taipei/prizes/world), [Buenos Aires](https://ethglobal.com/events/buenosaires/prizes/world))

> Building a mini app means you will get instant exposure to the 23 million World App users. ... We will be working closely with teams that want to build a real app reaching millions of people this weekend.
>
> Show us your best Mini Apps! Projects that build and deploy a Mini App using MiniKit are eligible for this prize.
> - build a Mini App with MiniKit
> - integrate any of the Minikit SDK Commands
> - if your Mini App uses on-chain activity, deploy your contracts to World Chain
> - your project must not be gambling or chance based
> - proof validation is required and needs to occur in a web backend or smart contract

(Bangkok said "15 million" users and required "World ID or the World App Wallet"; the gambling ban and the proof-validation line arrived at Taipei.)

### 2.4 Cannes 2026: three SDKs, "products that break without proof of human"

([Cannes 2026](https://ethglobal.com/events/cannes2026/prizes/world))

> Use MiniKit to ship a Mini App in World App, IDKit to add World ID 4.0 verification anywhere, and AgentKit to power agentic workflows. Together, they let you build human only products
>
> Best use of Agent Kit: Apps that use AgentKit to ship agentic experiences where World ID improves safety, fairness, or trust. ... Submissions that only use World ID or MiniKit without the Agent Kit layer will not qualify for this specific track.
>
> Best use of World ID 4.0: Leverage the new World ID 4.0 building products that break without proof of human. Uses World ID 4.0 as a real constraint (eligibility, uniqueness, fairness, reputation, rate limits). Proof validation is required and needs to occur in a web backend or smart contract.

### 2.5 New York 2026: free trials for human-backed agents, "what breaks without it", ProveKit

([New York 2026](https://ethglobal.com/events/newyork2026/prizes/world))

> Track A (AgentKit): Apps that utilize AgentKit to deliver agentic experiences, where Delegated World ID enhances safety, fairness, or trust, especially products that unlock free trials for agents and free access to initial usage.
> - Uses AgentKit in a meaningful way (not just a wrapper).
> - Implements a clear "trial / initial usage" mechanic ... gated by verifiable humans via World ID.
> - Not only register an agent, but actually build a product that enables Human Backed Agents to operate.
>
> Track B (World ID): Apps where the product breaks without proof of human. ... World ID justification: what breaks without it.
>
> Track D (ProveKit): Compile Noir circuits to R1CS; Generate WHIR or Groth16 proofs client-side; Verify proofs in at least one target environment.

### 2.6 Lisbon 2026: new credentials, beta testing, and an explicit "will not qualify" list

([Lisbon 2026](https://ethglobal.com/events/lisbon2026/prizes/world))

> AgentKit New Use Cases: New AgentKit use cases where a service can tell the difference between "a bot" and "an agent acting on behalf of a real, unique human." Explore where Human-Backed Agents change access, authorization, rate limits, economic terms, payments, commerce, moderation, or accountability.
>
> Will not qualify: Projects that reuse patterns from prior hackathons without a genuinely new workflow, vertical, or trust model, for example:
> - Agent reputation
> - Human-backed agent interactions in simple content generation use cases
> - Human-backed benefits for AI agents (i. e API calls,discounts)
>
> Identity Check Beta Test: ... Explains why the requested attribute is necessary and how the app minimizes data collection.
>
> Selfie Check Beta: Uses Selfie Check in a meaningful way (risk, eligibility, fairness, continuity, or abuse-prevention signal, not generic login)

Lisbon also listed preferred feedback topics, including "Value of the Sybil score - once we enable it in the future" and "POH ( orb verified ) vs. Selfie Check users - any differences you observe between cohorts".

### 2.7 ETHOnline 2026: Selfie Check as "low-assurance" signal; mandatory feedback documents

([ETHOnline 2026](https://ethglobal.com/events/ethonline2026/prizes/world))

> Selfie Check: Build and demo a realistic Selfie Check flow that validates where a low-friction, low-assurance biometric credential is useful for risk, eligibility, fairness, continuity, or abuse prevention.
> - Includes feedback document on: SelfieCheck docs and integration flow. Developer Portal navigation, search, product discovery, and debugging guidance. Sandbox App states, proof flows, test users, errors, and edge cases. What was confusing, missing, broken, or hard to test.

### 2.8 Tokyo 2026: the direct parent of both Mumbai fresh tracks

([Tokyo 2026](https://ethglobal.com/events/tokyo2026/prizes/world))

Best Use of IDKit ($5,000, 2 x $2,500): word for word the Mumbai IDKit text, including "Use the credential that is proportionate to your use case[dash replaced]such as Proof of Human, Passport/NFC, or Selfie Check (Now live with Sybil score). We are not rewarding the most credentials used."

Best Use of World ID for Agents ($7,500, 3 x $2,500):

> ![We are mocking proofs now, so you don't need sandbox app anymore]!
> Build an application using World ID for Agents. We are especially interested in agentic products, but any compelling use case is eligible.
> Show what becomes possible when an application can ask a person to authenticate or complete a fresh verification at the moment.
> Strong submissions will show a meaningful action that needs a human identity or approval layer, not simply a login screen added to an existing product.
> - Integrate with the official World ID for Agents on dev environment provided for the event.
> - Demonstrate the complete journey: identity or verification request, user completion, validated result, and the protected application or agent action.
> - Demonstrate a denied, expired, cancelled, or otherwise unsuccessful path where the protected action does not occur.
> - Validate identity results in a secure backend; do not expose client secrets or treat an unvalidated client response as authorization.
> - Include a short integration debrief/feedback: ...

Resources: "World ID for Agents documentation http://sandbox.auth.world.org/docs", "AgentPlugin https://github.com/worldcoin/world-id-agent-plugin", "World ID for Agents Portal http://sandbox.auth.world.org/portal". Workshop: "World's latest products (IDP vs IDKit)".

### 2.9 Mumbai 2026 (current)

"World ID Agent Pass" uses the Tokyo "World ID for Agents" text with three edits: "World ID for Agents" becomes "World ID Agent Pass"; "Integrate with the official World ID for Agents on dev environment provided for the event" becomes "Integrate with the official World ID Agent Pass"; the resource links move from `sandbox.auth.world.org` to `https://auth.world.org/` (docs, portal). The pool is $5,000 in three places instead of $7,500 as 3 x $2,500. "Best Use of IDKit" is unchanged in text and halves in money ($2,500 as 2 x $1,250). Full verbatim text: `track_ideas/00_current_tracks.md`, World section ([Mumbai prizes](https://ethglobal.com/events/mumbai/prizes/world)).

### 2.10 What Agent Pass is, technically (from World's docs)

- Agent Pass is World's OpenID Connect issuer at `https://auth.world.org` ("Human continuity"). Discovery `https://auth.world.org/.well-known/openid-configuration`; authorize `/api/v1/authorize`; token `/api/v1/token`; device authorization `/api/v1/device_authorization` ([OIDC guide](https://auth.world.org/docs/guides/oidc)).
- Freshness: "`max_age=0` or `prompt=login` forces a new World proof per attempt"; assurance classes `https://world.org/oidc/acr/orb`, `.../orb-face`, `.../selfie`, `.../selfie-face`; `amr` values such as `["pop", "iris"]` and `["pop", "face"]`; an essential `claims` request enforces a class, while `acr_values` "is a preference" ([step-up guide](https://auth.world.org/docs/guides/step-up)).
- The issuer does not see the business action: "The World ID issuer does not receive, display, or approve the pending business action." and "Authentication alone does not authorize a payment, redemption, or account change." ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop), [step-up guide](https://auth.world.org/docs/guides/step-up)).
- Headless agents use the RFC 8628 device flow: `device_code` "expires 20 minutes after creation and can be redeemed once"; poll errors `authorization_pending`, `slow_down`, `access_denied`, `expired_token` ([OIDC guide](https://auth.world.org/docs/guides/oidc)). These give the denied and expired paths the track demands for free.
- Re-read 2026-10-31: the device flow "already requires fresh authentication and explicit approval. It does not implement `max_age` or `prompt`"; for APIs and MCP servers, "use the authentication challenge and retry flow (RFC 9470)" ([human-in-the-loop guide](https://auth.world.org/docs/guides/human-in-the-loop)). A requested `claims.id_token.sub` that does not match "ends the request with `access_denied`"; in the device flow an unmet essential requirement "returns `access_denied`, never a downgraded token"; "Do not send the ID token from the World ID issuer directly to a downstream MCP server" ([step-up guide](https://auth.world.org/docs/guides/step-up)).
- Tokyo winners describe the same thing as "Human Continuity OIDC on the event sandbox, using the authorization code flow with PKCE" ([Airlock](https://ethglobal.com/showcase/airlock-ph6bx)).

IDKit 4.x (for the IDKit track): backend signs an RP request with `signRequest` (the "signing key ... should be stored as a secret"); client calls `IDKit.request` or `IDKitRequestWidget`; the payload goes unchanged to `POST https://developer.world.org/api/v4/verify/{rp_id}`; "the Portal confirms cryptographic validity, but your backend must check that the nullifier has not been used before" ([IDKit integrate](https://docs.world.org/world-id/idkit/integrate)). Presets: `proofOfHuman`, `passport`, `selfieCheck` ("medium-assurance"), `identityCheck` (preview; attributes `document_type`, `issuing_country`, `minimum_age`, `nationality` and others), legacy presets, and a `require_user_presence` modifier that fails with `user_presence_failed`; Selfie Check returns a `sybil_score` and `integrity_bundle` to forward to the backend ([IDKit credentials](https://docs.world.org/world-id/idkit/credentials)).

## 3. Winners by event and what they built

Winner lines are quoted from each project's "Winner of" badge on its showcase page. Pool-prize recipients are counted but not listed. "Finalist" marks an ETHGlobal finalist badge.

### 3.1 Tokyo 2026 (direct parent of Mumbai)

| Project | World prize | What it built and how World ID for Agents or IDKit is used |
|---|---|---|
| [Airlock](https://ethglobal.com/showcase/airlock-ph6bx) | Best Use of World ID for Agents | OpenAI-compatible gateway that redacts confidential data before agents call frontier models; for confidential payloads it "pauses the agent until a human approves through World ID for Agents. The approval is bound to the payload's hash"; "Human Continuity OIDC ... authorization code flow with PKCE. The OIDC nonce is a hash of the approval id and payloadHash"; ENSv2 approver roles; 35 unit tests plus runs against the real sandbox |
| [Surety](https://ethglobal.com/showcase/surety-ms4gx) | Best Use of World ID for Agents | Parametric insurance for money-handling agents; rules as ENSv2 records enforced by a Uniswap v4 hook; "To get paid, the policyholder files a claim and passes a fresh World ID for Agents check, bound to the same human who bought the policy. Our backend validates it and signs a one-time EIP-712 approval that the contracts verify. If the check is cancelled or fails, the claim is held and never paid"; a live prompt-injection attack on a real LLM agent; "135 Foundry tests" |
| [Lifeline](https://ethglobal.com/showcase/lifeline-mygz6) | Best Use of World ID for Agents (also Sui 3rd) | Credit line for agents that pay x402 paywalls; "the debt goes to the human, not the agent"; "World ID for Agents is how they approve payments their agents couldn't make on their own"; Move contract on Sui, Arc credit line, MCP server for Claude Code |
| [Placed](https://ethglobal.com/showcase/placed-eijhx) | Best Use of IDKit | Global ad-space auction with revenue tokens sold through Uniswap CCA; "IDKit provides human-verification proofs that the backend validates and binds to participant wallets. This makes duplicate-account spam and self-bidding through multiple wallets harder ... It verifies participant uniqueness, not asset ownership or fulfillment." |
| [Pupille](https://ethglobal.com/showcase/pupille-2o0q0) | Best Use of IDKit | iOS camera whose photos carry a proof of human authorship: "A World IDKit Proof of Human is generated with a signal that commits to the user's pseudonymous handle and device public key"; Secure Enclave and App Attest; offline verifier; "Editing one pixel ... causes verification to fail"; reusable Swift SDK and a mock Amazon review integration |
| [Lortnoc Tahc](https://ethglobal.com/showcase/lortnoc-tahc-49c6e) | [Cont] Best IDKit Use Case (Continuity) | Natural-language steganography with gated readers; "checks every proof twice, with World's v4 verify API and the WorldIDVerifier contract on World Chain"; nationality via Identity Check |

Tokyo non-winners that used World's tools (from the listing and project pages; none has a World badge): Axis, DSAP Protocol, Proviso, x402 Interlock, JPYC EC Agents, hanko, Human Gate, Maat JEV Gate, GuardPay, Handshake, Dead or Alive Agent, Trinity Guardian, Agent Bank, TradeBridge, mantis, coffer, Itonami Cloud, Agent's List, Omamori (snyca), Re:Leash (agent side); ScalpLess, AntiScalper Protocol, Tenjō, GomiGo, Haulie, Basecamp Pass, CryptoWill, Legacy, Seikyu, Rebind, FamilyProof, Truth Skills, Dedan, KawaiPay (IDKit side). ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026))

### 3.2 ETHOnline 2026

| Project | World prize | Note |
|---|---|---|
| [ArcAsset](https://ethglobal.com/showcase/arcasset-av1gr) | Selfie Check | "Selfie Check gates issuance and nothing else"; "A nullifier verifies at most one address, ever, and is deliberately not reassignable" |
| [Creance](https://ethglobal.com/showcase/creance-egdz5) | Selfie Check | Cover against job automation; the nullifier "ties a cover to a single person. When someone claims, we ask for a fresh check with liveness and compare that nullifier against the one we captured at purchase" |
| [Automator](https://ethglobal.com/showcase/automator-z7ono) | Selfie Check | Visual onchain workflow canvas with IDKit verification |
| [hors-luma](https://ethglobal.com/showcase/hors-luma-dq9yf), [Maneki](https://ethglobal.com/showcase/maneki-epah3), [Novi Corpus](https://ethglobal.com/showcase/novi-corpus-qtfxd) (finalist) | AgentKit Continuity | Continuity only |

### 3.3 Lisbon 2026

| Project | World prize | Note |
|---|---|---|
| [HORS](https://ethglobal.com/showcase/hors-9j0w8) | AgentKit New Use Cases 1st | "CORS for AI agents": per-function policy that can require "no additional assurance, a live World Selfie Check, or a World Identity Check"; "Selfie Check proves that a live person is present for a specific invocation; it is not used as generic login, reputation, or KYC" |
| [BookerBob](https://ethglobal.com/showcase/bookerbob-6zjih) | AgentKit New Use Cases 2nd (also The Graph 2nd) | "Who's behind an agent changes terms, not price. Bots prepay; humans get deposit & pay later"; detailed bug report on Orb versus Selfie users in the feedback |
| [Turing Swap](https://ethglobal.com/showcase/turing-swap-ck2y6) | AgentKit New Use Cases 3rd | Custom 1inch SwapVM instruction `_humanGate` reading AgentBook during every swap, on World Chain mainnet |
| [BananaMesh](https://ethglobal.com/showcase/bananamesh-bpn7n) | Selfie Check Beta 1st | BLE radio tomography; Selfie Check as "anti-bot gate" for data sources |
| [Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h) | Selfie Check Beta 2nd | Selfie Check before an agent's git commit is signed; "deliberately not all or nothing, because a selfie on every commit is obnoxious"; commit SHA as signal; nonce minted "within the last sixty seconds" |
| [Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3) | Identity Check Beta Test 1st (badge reads "World - 1st place"; also 0G 2nd; finalist) | Remote robot-arm labour market; "Identity Check credential (minimum_age: 18) before the lease is granted. Data minimization is strict: one attribute requested, one value kept" |
| [Human Bond](https://ethglobal.com/showcase/human-bond-dd010), [TreasureHunt](https://ethglobal.com/showcase/treasurehunt-ctkmi), [Novi Corpus](https://ethglobal.com/showcase/novi-corpus-0qdc8), [NpmGuard](https://ethglobal.com/showcase/npmguard-wt7wh) | Continuity twins | Continuity only |

Non-winners with World in the tagline: Billie, Creator Signature, ProofOfPool ("Uniswap v4 hook that gives World ID-verified humans (selfie) a lower swap fee than bots"), Yareon. ([Lisbon showcase](https://ethglobal.com/showcase?events=lisbon2026))

### 3.4 New York 2026

| Project | World prize | Note |
|---|---|---|
| [Proof-of-Human](https://ethglobal.com/showcase/proof-of-human-1cg2d) | Track A (AgentKit) 1st | Scarce-goods raffle for "two kinds of shoppers at once": web users with World ID v4 and AI agents over a remote MCP server with AgentKit; "one human, one slot per drop, enforced at the database layer by a UNIQUE(drop_id, human_key) constraint" |
| [Mars](https://ethglobal.com/showcase/mars-ua1qc) | Track A 2nd (also Arc 1st, Hedera) | Audited skill marketplace; AgentKit "make auditor agents human-backed and sybil-resistant" |
| [AgentRank](https://ethglobal.com/showcase/agentrank-c7p3r) | Track A 3rd (also ENS) | Trust API for ERC-8004 agents; "The World team clarified that agent trust should use AgentKit/AgentBook" |
| [pinch](https://ethglobal.com/showcase/pinch-fvnm7) | Track B (World ID) 1st | Robots post bounties when stuck; World ID-verified humans claim them |
| [Distro](https://ethglobal.com/showcase/distro-h393v) | Track B 2nd (finalist) | Clipping marketplace paying per thousand real views |
| [Justify](https://ethglobal.com/showcase/justify-pob50), [Void Tactics](https://ethglobal.com/showcase/void-tactics-ag25f) (finalist) | Track C (Continuity) 1st and 2nd | Continuity only |
| [Aragorn](https://ethglobal.com/showcase/aragorn-5if7q), [Vouch DeFi](https://ethglobal.com/showcase/vouch-defi-hfvw3) | Track D (ProveKit) 1st and 2nd | Noir proving |

Non-winners with World in the tagline: Creditz, DreamNet Quorum Lab, FairPass, Fiado, HongBao, Jàmm, vouch, WLD5050, World App Forge. ([NY 2026 showcase](https://ethglobal.com/showcase?events=newyork2026))

### 3.5 Cannes 2026

| Project | World prize | Note |
|---|---|---|
| [AgentGate](https://ethglobal.com/showcase/agentgate-scs65) | Best use of Agent Kit 1st | x402 gateway on Hedera; human-backed agents "unlock 3 free trial calls, or pay directly in HBAR" |
| [Groundtruth](https://ethglobal.com/showcase/groundtruth-mz4us) | Agent Kit 2nd (also ENS 2nd) | Human and agent reporters on an intelligence map |
| [CaaS](https://ethglobal.com/showcase/caas-ivt4s) | Agent Kit 3rd (also 0G) | Human-verified hosted agents paid in WLD |
| [VEIL VPN](https://ethglobal.com/showcase/veil-vpn-c643n) | Best use of World ID 4.0 1st (also Arc 1st, ENS 1st; finalist) | TEE-attested no-logs VPN; "Human Only Servers with World ID" |
| [HumanAttentionToken](https://ethglobal.com/showcase/humanattentiontoken-q09yz) | World ID 4.0 2nd | Paid ad attention for Orb-verified viewers |
| [equitas](https://ethglobal.com/showcase/equitas-rzw7i) | World ID 4.0 3rd | Tokenised SNAP eligibility with ZK and backend proof validation |
| [DIVE](https://ethglobal.com/showcase/dive-5hxbp) | Best use of Minikit 2.0 1st (also Hedera, 0G 2nd; finalist) | AI-swarm oracle, "1-human-1-node" |
| [Genie](https://ethglobal.com/showcase/genie-4nmue), [Joust](https://ethglobal.com/showcase/joust-world-miniapp-nekgn) | MiniKit 2.0 2nd and 3rd | DeFi agent mini app; social staking settled by humans or AgentBook agents |

Non-winners with World in the tagline include AgentPass ("on-chain identity + spending policy for AI agents"), HumanGate, human backed copilot, signet, Execution Market, Open Human, Onvo. ([Cannes 2026 showcase](https://ethglobal.com/showcase?events=cannes2026))

### 3.6 Mini App era, Bangkok 2024 to Buenos Aires 2025 (placed winners only)

| Event | 1st | 2nd | 3rd | Honourable mentions |
|---|---|---|---|---|
| Buenos Aires 2025 | [Halo](https://ethglobal.com/showcase/halo-hi8bv) (receipts to rewards for verified humans; finalist; also Fluence) | [GlobalPhone](https://ethglobal.com/showcase/globalphone-isaok) (x402 plus mini app: anyone can call you at your price, live on World mainnet) | [Impossibl](https://ethglobal.com/showcase/impossibl-tcxy3) (skill-based dash game; also XMTP) | LEXI, NOMA, png.fun, Tanda |
| New Delhi 2025 | [FlashArb](https://ethglobal.com/showcase/flasharb-r239w) (MEV profit sharing with Uniswap v4 hooks; "World ID verification with 1-hour rate limiting") | [ShieldRamp](https://ethglobal.com/showcase/shieldramp-okrzw) (P2P crypto to INR off-ramp over UPI with Pluto TEE web proofs; "one-human-one-account") | [MoFo](https://ethglobal.com/showcase/mofo-p8aak) (EEG-matched dating agents; also ASI 3rd) | GhostLink, WorldBNB |
| Cannes 2025 | [BetterBoxd](https://ethglobal.com/showcase/betterboxd-v3zn5) (film ratings with zkTLS proof of viewing and a verifier on World Chain; "World ID nullifiers guarantee one human = one account") | [Livus](https://ethglobal.com/showcase/livus-9y0k8) (health challenges with real Oura and Whoop data; also The Graph 2nd) | [Nudge](https://ethglobal.com/showcase/nudge-t6db2) (DCA for first-time investors with native onramp) | Amply, ChromaMind (finalist), SwagMe, WRLD Relief |
| Prague 2025 | [WorldStream](https://ethglobal.com/showcase/worldstream-r4bss) (streaming inside World App with MiniKit payments) | [Wrld Map](https://ethglobal.com/showcase/wrld-map-v64h2) (zk-proven travel atlas; finalist) | [REVIEWs](https://ethglobal.com/showcase/reviews-dryvi) (barcode reviews by verified humans) | CapyData, SnakeDuel |
| Taipei 2025 | [Realove](https://ethglobal.com/showcase/realove-siv7w) (event-based dating mini app using MiniKit commands and UI kit) | [WLDLE Today](https://ethglobal.com/showcase/wldle-today-n97w1) (daily Wordle with World ID claims) | [DeepTruth](https://ethglobal.com/showcase/deeptruth-nx3h1) (tamper-proof video; also ENS 2nd) | none listed |
| Bangkok 2024 | [ProofOfTruth](https://ethglobal.com/showcase/proofoftruth-g31wn) ("Proof-of-Personhood Truth Oracle (think UMA but with WorldID)", oracle contract on World Chain plus mini app) | [World.fun](https://ethglobal.com/showcase/world-dot-fun-1zgpr) (sybil-resistant social tokens) and [World Fun](https://ethglobal.com/showcase/world-fun-2bex4) (swipe-to-buy meme tokens) | [Malu](https://ethglobal.com/showcase/malu-bnppc) (sybil-resistant Luma) and [Predict](https://ethglobal.com/showcase/predict-ab2ba) (free prediction game, one guess per human) | none (split 2 x 2nd, 2 x 3rd) |

Pool recipients counted from showcase badges: Buenos Aires 30, Cannes 2025 38, Taipei 34, Bangkok 72 (World's caps were 30, 38, 34 and 72). New Delhi and Prague had no pool.

### 3.7 World ID era, Istanbul 2023 to Singapore 2024 (placed winners)

Prize names are the "Winner of" lines on each project page; one-line descriptions are from the same pages. Pool-prize recipients are counted at the end.

| Event | Prize | Project | What it built and how World ID was used |
|---|---|---|---|
| Istanbul 2023 | Best Overall | [Morvo](https://ethglobal.com/showcase/morvo-u0hph) | Privacy for journalists selling articles: a credential linked to World ID plus a private Lens profile; a second branch used "anonymous actions in order to proof that a public key is part of a list of keys" (also Lens) |
| Istanbul 2023 | Most Creative | [Trippy](https://ethglobal.com/showcase/trippy-kzvih) | "Access ZK Verified event / storage information on any EVM L2" (also Axiom, WalletConnect) |
| Istanbul 2023 | Best Governance App | [Rexo](https://ethglobal.com/showcase/rexo-65v0u) | Social network where "Each account is associated with a unique person" and can post one review per place attended |
| Istanbul 2023 | Best AI Use Case | [Protocol GPT](https://ethglobal.com/showcase/protocol-gpt-bisnw) | Protocol-specific GPTs; "In order to validate users uniqueness we use Proof of personhood of WorldCoin" |
| Istanbul 2023 | Best Sign In with Worldcoin App | [DecentraleX](https://ethglobal.com/showcase/decentralex-jdj8i) | Freelancing platform with DAO dispute voting |
| Istanbul 2023 | Honorable Mentions | [AirdropFi](https://ethglobal.com/showcase/airdropfi-6f65w), [HomoSapienSays](https://ethglobal.com/showcase/homosapiensays-h1f2h) | Vested-position airdrops claimable only by World ID holders; reviews by "real people" who also tap an Arx NFC card at the place |
| London 2024 | Best World ID Usage 1st | [Votelik Pollerin](https://ethglobal.com/showcase/votelik-pollerin-u0dcs) | Sybil- and bribery-resistant Farcaster polls; "Contract SignUpWorldcoinGatekeeper: This contract allows to gatekeep MACI signups by requiring new voters to verify with World ID" (also EF MACI 4th) |
| London 2024 | Best World ID Usage 2nd | [Vota Protocol](https://ethglobal.com/showcase/vota-protocol-qxf3z) | Private election system; "unique person on-chain verification via Orb or mobile device check" (also EF MACI 3rd) |
| London 2024 | Best World ID Usage 3rd | [not so secret agent](https://ethglobal.com/showcase/not-so-secret-agent-vmnas) | AI web-scraping oracle with staked reporters; "if they get slashed and banned for incorrect data, they can't re-stake from a new account" (also Nethermind 1st) |
| London 2024 | Best World ID Usage HM | [FastGrant](https://ethglobal.com/showcase/fastgrant-x1mm4) | USDC lending to businesses against public grants |
| London 2024 | Most Creative Use Case | [Synapsic](https://ethglobal.com/showcase/synapsic-i2r2o) | Neural data exchange with World ID verification |
| London 2024 | Best Governance App | [AnonVote](https://ethglobal.com/showcase/anonvote-uc7w0) | "An on-chain anonymous voting solution with guaranteed proof of personhood" (also EF MACI 4th) |
| London 2024 | Best Public Goods Use Case | [WNS.Vote](https://ethglobal.com/showcase/wns-vote-cw6na) | Sybil-resistant quadratic voting with ENS at the core (also ENS 2nd) |
| Sydney 2024 | Best World ID Usage 1st | [Freema](https://ethglobal.com/showcase/freema-x0nf0) | Telegram C2C marketplace; "A World ID-based rating system prevents manipulation and rating resets" |
| Sydney 2024 | Best World ID Usage 2nd | [Cache Coherence](https://ethglobal.com/showcase/cache-coherence-1nq6z) | Lost-key recovery for a 4337 wallet with World ID, bridged over CCIP (also Base 4337 1st; finalist) |
| Sydney 2024 | Best World ID Usage 3rd | [FitWifFrens](https://ethglobal.com/showcase/fitwiffrens-2zo8n) | Fitness commitment device linking address, Strava id and World ID (also Chainlink) |
| Sydney 2024 | Best World ID Usage HM | [GimmeMyBloodyMoney!](https://ethglobal.com/showcase/gimmemybloodymoney-vi6xx) | Payment-request links whose creator can verify with World ID; recipients mark spam by signing with World ID |
| Sydney 2024 | Most Creative Use Case | [The Rizz Camp](https://ethglobal.com/showcase/the-rizz-camp-1juqr) | Free first mentoring call gated by World ID "not on dealing with bots" |
| Sydney 2024 | Best Governance App | [0xPoll](https://ethglobal.com/showcase/0xpoll-4j05w) | One-citizen-one-vote mirror of Australian federal bills (also Base 2nd; finalist) |
| Sydney 2024 | Best Public Goods Use Case (2) | [Free the Aid](https://ethglobal.com/showcase/free-the-aid-etztn), [Relief Link](https://ethglobal.com/showcase/relief-link-mbfmy) | Direct humanitarian aid access; automated post-disaster payouts through Chainlink oracles (Relief Link a finalist) |
| Brussels 2024 | Best Use of World ID 1st | [WorldCare](https://ethglobal.com/showcase/worldcare-9x3z0) | Patient and doctor platform; "By utilizing the World ID passport, we ensure the verification of patients' identities" (also ENS 2nd, Blockscout) |
| Brussels 2024 | Best Use of World ID 2nd | [Proof Pals](https://ethglobal.com/showcase/proof-pals-vmfza) | Real-life connections onchain as a human social graph (also Base consumer UX) |
| Brussels 2024 | Best Use of World ID 3rd | [PetitionVault](https://ethglobal.com/showcase/petitionvault-pppkx) | Petitions safe "from malicious activities by both the signers and the creators" (also Arbitrum) |
| Brussels 2024 | Best Use of World ID HM | [Web3 Checkout](https://ethglobal.com/showcase/web3-checkout-jfp3h) | Cross-border crypto checkout; "purchases can be limited to a single human person" |
| Brussels 2024 | Most Creative Use Case | [Travel Protocol](https://ethglobal.com/showcase/travel-protocol-1skiq) | Book travel "without sharing sensitive personal data with booking platforms" (also Polygon ZK 2nd) |
| Brussels 2024 | Best Governance App | [zkWhistleBlower](https://ethglobal.com/showcase/zkwhistleblower-m66e1) | TLS Notary evidence publication with anonymous donations (also Scroll) |
| Brussels 2024 | Best Public Goods Use Case | [DEWDROP.](https://ethglobal.com/showcase/dewdrop-nyhug) | "a sybil resistant MAINNET faucet deployed on 9 chains" (also Blockscout) |
| Superhack 2024 | Best Use of World ID 1st | [Hotspots](https://ethglobal.com/showcase/hotspots-c3781) | Crypto-paid Wi-Fi captive portal; the page says only "it uses World coin for verification" |
| Superhack 2024 | Best Use of World ID 2nd | [Repo Rewards](https://ethglobal.com/showcase/repo-rewards-su0bh) | Rewards for GitHub contributions; "With GitHub login and World ID integration, we ensure that only unique, verified users participate" (also EAS 2nd, Optimism 1st) |
| Superhack 2024 | Best Use of World ID 3rd | [Governaut](https://ethglobal.com/showcase/governaut-nip9i) | Grant-proposal and voting dashboard with an `IdentityManager` that verifies World ID |
| Superhack 2024 | Best Use of World ID HM | [PopuliDAO](https://ethglobal.com/showcase/populidao-ffbb2) | DAO with "a token cap per individual" enforced through proof of personhood |
| Superhack 2024 | Gas Subsidy with World ID & Reth (2) | [GasFrees](https://ethglobal.com/showcase/gasfrees-1yqdp), [EthDrive](https://ethglobal.com/showcase/ethdrive-f47r7) | Testnet chain with gas subsidy for verified humans; NFT-folder wallet whose World ID users "deposit gas on a custom OPStack chain" (EthDrive also Celo 1st, Goldsky 1st) |
| Superhack 2024 | Transaction Priority with World ID & Reth | [Rethos](https://ethglobal.com/showcase/rethos-amrv9) | "Modified Reth node with World ID gas subsidy and priority lane"; a hashmap registry of verified addresses inside the node. Only one badge found for this $4,000 track |
| Singapore 2024 | Best Use of World ID 1st | [TrendMarket](https://ethglobal.com/showcase/trendmarket-kummv) | LLM-created prediction markets (also AirDAO 1st); the page does not describe its World ID use |
| Singapore 2024 | Best Use of World ID 2nd | [Clarity](https://ethglobal.com/showcase/clarity-c2us8) | Payment gateway whose reviews are tied to purchases and to "proof of personhood via WorldID" (also The Graph, Sign Protocol; finalist) |
| Singapore 2024 | Best Use of World ID 3rd | [ZkScholar](https://ethglobal.com/showcase/zkscholar-yiqo9) | Private financial-aid applications "using zk-SNARKs, World ID, and USDC" with Mina |
| Singapore 2024 | Best Use of World ID 4th (2) | [Factify](https://ethglobal.com/showcase/factify-7x8ja), [Ollie Cookies](https://ethglobal.com/showcase/ollie-cookies-t632w) | Research publication with World ID and Sign Protocol; browsing-data marketplace with World ID and Oasis Sapphire |
| Singapore 2024 | Most Creative Use Case | [sidekick.ai](https://ethglobal.com/showcase/sidekick-ai-votxi) | Client-side LLM agent that fills forms; "Worldcoin's SDK enabled us to verify human requests" (also Gaia 2nd), an early agent-acting-for-a-human design |
| Singapore 2024 | Best Governance App | [ChillVille](https://ethglobal.com/showcase/chillville-6zo6g) | Private voting with MACI and zkTLS (also EF MACI 3rd, Nethermind 1st) |
| Singapore 2024 | Best Public Goods Use Case | [Cointributors](https://ethglobal.com/showcase/cointributors-9iaiy) | Automated donation splits to open-source contributors and dependencies |

Pool-prize recipients counted from "Winner of" lines on the World-logo cards in each listing: Istanbul 34, London 35, Sydney 21, Brussels 34, Superhack 66, Singapore 49 (World's caps were 34, 36, 21, 34, 66 and 49) ([Istanbul showcase](https://ethglobal.com/showcase?events=istanbul); [London showcase](https://ethglobal.com/showcase?events=london2024); [Sydney showcase](https://ethglobal.com/showcase?events=sydney); [Brussels showcase](https://ethglobal.com/showcase?events=brussels); [Superhack showcase](https://ethglobal.com/showcase?events=superhack2024); [Singapore showcase](https://ethglobal.com/showcase?events=singapore2024)).

**Judgement on this era:** placed winners were broad consumer or governance apps where World ID was one feature among several, and several top pages (Hotspots, TrendMarket) do not even describe the integration. That bar has risen sharply: from Cannes 2026 onward every placed winner explains what breaks without World ID and how the proof is bound and validated.

## 4. Why winners won: comparisons inside the same track

Method: for each track, the winners' showcase pages are compared with non-winning projects at the same event that used the same World product (identified from taglines and project pages in the showcase listing; quotes are from each project page). A tagline search is a lower bound: at Tokyo 2026, 37 of 254 listed projects mention World ID, IDKit, World App or human-backed agents in the one-line tagline, and 6 carry a World prize badge (5 fresh, 1 Continuity) ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026)).

### 4.1 Tokyo 2026, the direct parent of both Mumbai tracks

**World ID for Agents ($7,500, 3 x $2,500).** Winners: Airlock, Surety, Lifeline (section 3.1). Non-winners that used the same product, with what they built:

| Non-winner | What the human check protected | Quality of integration (quoted) |
|---|---|---|
| [Axis](https://ethglobal.com/showcase/axis-ybtp8) | AI treasury trades above a size | "A World ID approval is bound to a single proposal and can only be used once. It has to be recent (≤ 120s), and it must come from the same verified human who owns the treasury, matched on World ID's pairwise subject." Cancel, expiry and wrong-person paths all reject |
| [DSAP Protocol](https://ethglobal.com/showcase/dsap-protocol-87152) | Agent spending limits | "In our World mini app they see the exact action, sign Approve with their World App wallet, and then complete a fresh World ID for Agents check. Our backend validates World's token before anything runs." |
| [x402 Interlock](https://ethglobal.com/showcase/x402-interlock-hduph) | Risky x402 payments | high-value payments are "escalated to a human, who countersigns through World ID for Agents", described as a fresh verification tied to that payment |
| [hanko](https://ethglobal.com/showcase/hanko-ocn48) | Higher-value agent payments | "World supplies the human verification step through its confidential device flow." |
| [JPYC EC Agents](https://ethglobal.com/showcase/jpyc-ec-agents-41htg) | Chat-shopping orders | "World verifies you when an order needs your approval." |
| [Human Gate](https://ethglobal.com/showcase/human-gate-bwwpj) | Generic agent operations (middleware) | "a human, verified with World ID at that moment, authorizes that exact operation" |
| [Proviso](https://ethglobal.com/showcase/proviso-0c5ea) | Shopping agent spends | "bound by rules on ENSv2 and World ID approvals" |
| [Re:Leash](https://ethglobal.com/showcase/re-leash-385c6) | Agent permission that decays unless renewed | used IDKit v4 and mapped three credentials to caps: "Orb 15,000 / Passport 7,500 / Selfie 2,000 USDC" |
| Trinity Guardian, Dead or Alive Agent, Itonami Cloud, GuardPay, Agent Bank, coffer | Payment screening and approval | taglines only ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026)) |

What the three winners had that these did not:

1. **The human check creates or settles an obligation, not a spend limit.** Surety pays an insurance claim only after "a fresh World ID for Agents check, bound to the same human who bought the policy"; Lifeline makes "the debt go to the human, not the agent"; Airlock makes a person the consent point for data leaving the company. Eight of the nine non-winner rows above are "agent spends, a human approves above a threshold", and Axis shows that doing this correctly was not enough.
2. **Binding to a hash of the exact object, explained in the README.** Airlock: "The OIDC nonce is a hash of the approval id and payloadHash"; Surety: the backend "signs a one-time EIP-712 approval that the contracts verify. If the check is cancelled or fails, the claim is held and never paid" ([Airlock](https://ethglobal.com/showcase/airlock-ph6bx); [Surety](https://ethglobal.com/showcase/surety-ms4gx)).
3. **Evidence of rigour and an adversary on screen.** Surety ran a live prompt-injection attack on a real LLM agent and cites "135 Foundry tests"; Airlock cites 35 unit tests plus runs against the real sandbox.
4. **Stacking was not the reason.** Airlock and Surety list only the World prize in their "Winner of" lines, although both also integrated ENSv2 (and Surety a Uniswap v4 hook); Lifeline also won Sui 3rd ([Airlock](https://ethglobal.com/showcase/airlock-ph6bx); [Surety](https://ethglobal.com/showcase/surety-ms4gx); [Lifeline](https://ethglobal.com/showcase/lifeline-mygz6)).

**Best Use of IDKit ($5,000, 2 x $2,500).** Winners: Placed and Pupille. Non-winners that used IDKit:

| Non-winner | Trust event | Credential decision (quoted) |
|---|---|---|
| [ScalpLess](https://ethglobal.com/showcase/scalpless-15fnr) | Bot-proof Shopify drops | "Every entrant verifies with World ID. Winners re-confirm with World ID before claiming", plus layaway and "an uncollateralized loan backed by their World ID passport", so several features and two credentials |
| [Tenjō](https://ethglobal.com/showcase/tenjo-7m0fp) | Ticket ballot with a pity counter | "each entrant proves they're one unique human"; "22 World ID entries verified on production so far" |
| [GomiGo](https://ethglobal.com/showcase/gomigo-t4eai) | Unlocking private dumpsters | "World ID proof + ENSv2 registry" |
| [Haulie](https://ethglobal.com/showcase/haulie-i7srf) | Courier handoffs | "the courier approves a fresh World ID check on their phone in seconds" at accept and pickup |
| [Basecamp Pass](https://ethglobal.com/showcase/basecamp-pass-yfa52) | Guest check-in | "The guest proves a passport or My Number Card in World App (the contract holder also passes a live face check at check-in)", two credentials |
| [CryptoWill](https://ethglobal.com/showcase/cryptowill-7q149) | Dead man's switch | "prove you're alive with World ID, or your heir inherits" |
| AntiScalper Protocol, Legacy, Seikyu, Rebind, FamilyProof, Truth Skills, Dedan, KawaiPay | Drops, inheritance, invoices, reviews | taglines ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026)) |

What the winners had:

1. **The proof becomes a portable artefact or a constraint on a market.** Pupille commits the proof's signal to "the user's pseudonymous handle and device public key", so photos carry their authorship offline and "Editing one pixel ... causes verification to fail"; it also ships a reusable Swift SDK. Placed binds proofs to wallets in an auction so that "duplicate-account spam and self-bidding through multiple wallets" become harder ([Pupille](https://ethglobal.com/showcase/pupille-2o0q0); [Placed](https://ethglobal.com/showcase/placed-eijhx)).
2. **An honest limit, stated.** Placed: "It verifies participant uniqueness, not asset ownership or fulfillment." That sentence is the "minimum sufficient assurance" reasoning the track asks for.
3. **One credential.** Both winners use Proof of Human only; ScalpLess and Basecamp Pass added a second credential or a financial product on top and did not place. **Judgement:** consistent with "We are not rewarding the most credentials used".
4. **"One human, one entry" alone did not win.** ScalpLess, AntiScalper and Tenjō are textbook sybil gates; Tenjō even had production verifications. **Judgement:** World's judges have seen this pattern since 2023 and now want it applied to something new.

### 4.2 Lisbon and ETHOnline 2026, the credential beta tracks

Winners argued why that credential and no more. HORS lets each function require "no additional assurance, a live World Selfie Check, or a World Identity Check" and says Selfie Check "is not used as generic login, reputation, or KYC" ([HORS](https://ethglobal.com/showcase/hors-9j0w8)); Commitment Issues is "deliberately not all or nothing, because a selfie on every commit is obnoxious" ([Commitment Issues](https://ethglobal.com/showcase/commitment-issues-y1t2h)); Hands Unchained: "one attribute requested, one value kept" ([Hands Unchained](https://ethglobal.com/showcase/hands-unchained-6kdf3)); ArcAsset: "Selfie Check gates issuance and nothing else" ([ArcAsset](https://ethglobal.com/showcase/arcasset-av1gr)); Creance compares the nullifier from a fresh check at claim time with the one captured at purchase ([Creance](https://ethglobal.com/showcase/creance-egdz5)), the same same-human pattern Surety used a month later.

Non-winner contrast at Lisbon: ProofOfPool, a "Uniswap v4 hook that gives World ID-verified humans (selfie) a lower swap fee than bots" ([Lisbon showcase](https://ethglobal.com/showcase?events=lisbon2026)), is the "human-backed benefits ... discounts" pattern World listed under "Will not qualify" for its AgentKit track at the same event ([Lisbon prizes](https://ethglobal.com/events/lisbon2026/prizes/world)). BookerBob, AgentKit 2nd, included a detailed bug report about Orb versus Selfie users in its feedback ([BookerBob](https://ethglobal.com/showcase/bookerbob-6zjih)), the cohort question World had asked for; **Judgement:** that probably helped, but World did not say so.

### 4.3 Cannes 2026 and New York 2026, AgentKit and "what breaks without it"

- Winners did the literal ask. Cannes AgentKit 1st: human-backed agents "unlock 3 free trial calls, or pay directly in HBAR" ([AgentGate](https://ethglobal.com/showcase/agentgate-scs65)); NY Track A asked for "a clear 'trial / initial usage' mechanic", and its 1st place sold a scarce drop to web users and agents at once with "one human, one slot per drop, enforced at the database layer by a UNIQUE(drop_id, human_key) constraint" ([Proof-of-Human](https://ethglobal.com/showcase/proof-of-human-1cg2d)).
- AgentRank (NY Track A 3rd) records that "The World team clarified that agent trust should use AgentKit/AgentBook" ([AgentRank](https://ethglobal.com/showcase/agentrank-c7p3r)): teams that used World's newest primitive the way World intended were rewarded.
- Breadth plus depth: VEIL VPN won World ID 4.0 1st, Arc 1st and ENS 1st and was a finalist, with "Human Only Servers with World ID" inside a TEE-attested VPN ([VEIL VPN](https://ethglobal.com/showcase/veil-vpn-c643n)).
- Non-winners with World in the tagline at Cannes 2026 include AgentPass ("on-chain identity + spending policy for AI agents"), HumanGate, human backed copilot and signet; at NY 2026, FairPass, WLD5050, HongBao, vouch and World App Forge ([Cannes 2026 showcase](https://ethglobal.com/showcase?events=cannes2026); [NY 2026 showcase](https://ethglobal.com/showcase?events=newyork2026)). **Judgement:** the spending-policy and generic gate shapes lost here too, three events before Tokyo.

### 4.4 Mini App era, Bangkok 2024 to Buenos Aires 2025

- World paid wide pools (up to 72 teams at Bangkok) for any qualifying Mini App, and the placed prizes went to apps with a consumer loop and onchain enforcement on World Chain: ProofOfTruth ("an oracle contract deployed on Worldchain connected to the Mini App"), BetterBoxd ("The proof and title_id are submitted to a verifier contract on World Chain; a ProofVerified event unlocks the rating UI"), GlobalPhone (live on World mainnet), Halo (receipt rewards for verified humans) ([ProofOfTruth](https://ethglobal.com/showcase/proofoftruth-g31wn); [BetterBoxd](https://ethglobal.com/showcase/betterboxd-v3zn5); [GlobalPhone](https://ethglobal.com/showcase/globalphone-isaok); [Halo](https://ethglobal.com/showcase/halo-hi8bv)).
- **India precedent, New Delhi 2025:** 1st went to a DeFi build, FlashArb ("Uniswap V4 hooks, Pyth oracles, and World ID verification"; "World ID verification with 1-hour rate limiting prevents abuse"), and 2nd to ShieldRamp, a UPI off-ramp with "One-Human-One-Account: Enforced via World ID" ([FlashArb](https://ethglobal.com/showcase/flasharb-r239w); [ShieldRamp](https://ethglobal.com/showcase/shieldramp-okrzw)). **Judgement:** World's own panel in India was happy to reward DeFi and India-specific flows, even though UPI ramps did not reach the finalist stage (`track_ideas/00_season.md`, fading list).

### 4.5 World ID era, 2023 to 2024

See section 3.7 for the full winner list. Patterns:

- Governance and public goods prizes went to one-person-one-vote systems, often with MACI: Votelik Pollerin (London 1st overall) gated MACI signups onchain with a `SignUpWorldcoinGatekeeper` contract, and Votelik, Vota Protocol, AnonVote and ChillVille all also won EF MACI prizes ([Votelik Pollerin](https://ethglobal.com/showcase/votelik-pollerin-u0dcs); [ChillVille](https://ethglobal.com/showcase/chillville-6zo6g)).
- "Best Use" prizes went to broad apps where World ID was one feature among several (Freema, Hotspots, TrendMarket, WorldCare), and some 1st-place pages do not describe the integration at all (Hotspots, TrendMarket). Several of the more interesting winners used World ID for the economics of a mechanism: a slashed oracle staker "can't re-stake from a new account" (not so secret agent), a per-person token cap (PopuliDAO), lost-key recovery (Cache Coherence).
- Proof validation in a backend or contract was a stated eligibility rule throughout ([Istanbul prizes](https://ethglobal.com/events/istanbul/prizes/worldcoin); [London prizes](https://ethglobal.com/events/london2024/prizes/worldcoin)).
- **Judgement:** with up to 66 pool winners per event, World paid for adoption in this era; placed prizes rewarded polish and breadth more than depth. The bar is now much higher (sections 4.1 to 4.3).

## 5. What World's judges reward (synthesis)

Sourced rules (World's own words):

- Proof validation is mandatory and has been since 2023: "Projects that do not verify the proof correctly will not be eligible" (Istanbul); "Proof validation is required and needs to occur in a web backend or smart contract" (2024 and Mini App era); "Validate identity results in a secure backend; do not expose client secrets" (Tokyo and Mumbai).
- World ID must be load-bearing: "products that break without proof of human" (Cannes 2026); "World ID justification: what breaks without it" (NY 2026); "not simply a login screen added to an existing product" (Tokyo and Mumbai).
- Proportionality: "Explains why the requested attribute is necessary and how the app minimizes data collection" (Lisbon Identity Check); "We are not rewarding the most credentials used" (Tokyo and Mumbai IDKit).
- Novelty against World's own history: "Projects that reuse patterns from prior hackathons without a genuinely new workflow, vertical, or trust model" will not qualify (Lisbon AgentKit).
- Feedback is a deliverable: mandatory feedback documents since ETHOnline 2026, and a five-part debrief in both Mumbai tracks.

Inferred from winners versus non-winners (**Judgement**):

1. **Centrality over breadth.** Every Tokyo fresh winner except Lifeline won only the World prize; World judged World's part on its own merit.
2. **A new relationship, not a gate.** Winners used the human to create, settle or carry an obligation (claim, debt, consent, authorship, a bid). Spend-approval and "one human, one entry" gates lost even when correct (Axis, ScalpLess, Tenjō).
3. **Binding is shown, not claimed.** Winners name the bound object (payload hash, policy holder, device key, wallet) and show the mismatch failing.
4. **An honest limit.** Placed's "not asset ownership or fulfillment" and HORS's "not used as generic login, reputation, or KYC" are the style.
5. **Rigour signals.** Test counts, real sandbox runs and a live attack (Surety, Airlock).
6. **Use the newest primitive the way World intends** (AgentRank's note; Agent Pass now, not AgentKit).
7. **Empty ground:** no World-tagged project in the saved listings for any event from 2023 to Tokyo 2026 gated a contract upgrade, a multisig signer set, a bug bounty intake or a pause and unpause ratchet (keyword search of the listings' taglines; the only near hits are Tripwire, a circuit breaker with no human, and Cache Coherence, recovery only) ([Tokyo showcase](https://ethglobal.com/showcase?events=tokyo2026); [Sydney showcase](https://ethglobal.com/showcase?events=sydney)).

## 6. How World's problem statements changed, and what that signals

| Period | Ask (short) | Money | Signal |
|---|---|---|---|
| Istanbul 2023 | Sign In with Worldcoin (OIDC) or Anonymous Actions; categories (governance, AI, creative) | $20,000 | Get World ID into any app |
| London to Singapore 2024 | "anti-bot and anti-sybil"; proof validation required; governance, public goods, creative | $20,000 each | Sybil resistance as a public good |
| Superhack 2024 | Gas subsidy and transaction priority for verified users on Reth / OP Stack | $20,000 | World Chain preparation |
| Bangkok 2024 to Buenos Aires 2025 | Mini Apps only, MiniKit, deploy on World Chain, no gambling | $10,000 to $20,000 | Distribution to World App users (15M, later 23M) |
| Cannes 2026 | MiniKit 2.0, IDKit with World ID 4.0, AgentKit: "human only products" | $20,000 | Platform split into three SDKs |
| NY 2026 | AgentKit trial mechanic; "what breaks without it"; ProveKit | $15,000 | Agents get a human backer |
| Lisbon 2026 | AgentKit new use cases with a "Will not qualify" list; Selfie Check and Identity Check betas | $15,000 | New credentials, beta testers wanted |
| ETHOnline 2026 | Selfie Check as "low-assurance" signal; feedback documents | $7,000 | Feedback as the product |
| Tokyo 2026 | IDKit proportionate credential; World ID for Agents (OIDC "human continuity") on a sandbox | $15,000 | Standards-based step-up for agents |
| Mumbai 2026 | Agent Pass (renamed, on `auth.world.org`, mocked proofs); IDKit unchanged | $12,500 | Productised Agent Pass; less money per prize |

Signals (**Judgement**, with the dated facts they rest on):

- From consumer distribution to identity infrastructure. Mini App prizes ended after Buenos Aires 2025; in October World bundled the World ID app, World ID for Zoom and World ID for Agents into a suite for banks ([The Block, 18 Oct 2026](https://www.theblock.co/news/ecosystems/2026-10-18-world-launches-world-id-suite-banks-418869)). Builds that look like an enterprise control (approval, recovery, eligibility) fit the current pitch better than consumer apps.
- From "use World ID" to "use the least credential and justify it", which arrived with the new credentials (Selfie Check, Identity Check) in mid 2026.
- From World-specific agent tooling (AgentKit, AgentBook, x402) to a standard OIDC issuer with step-up (`max_age`, `acr`, RFC 8628 device flow, RFC 9470 challenges) ([step-up guide](https://auth.world.org/docs/guides/step-up)). World wants to be the human checkpoint inside other people's auth stacks.
- Falling pools ($20,000 to $12,500) and mandatory debriefs suggest the hackathon is now partly a beta test; a precise debrief is cheap points.

## 7. Current Mumbai tracks mapped to past tracks

| Mumbai track | Nearest past track | Status | What changed |
|---|---|---|---|
| World ID Agent Pass ($5,000: $2,500 / $1,500 / $1,000) | Tokyo 2026 "Best Use of World ID for Agents" ($7,500, 3 x $2,500) | **Repeated** (text identical apart from the name, issuer and the qualification line about the event dev environment) | Name; resources move from `sandbox.auth.world.org` to `auth.world.org`; "We are mocking proofs now"; ranked prizes instead of equal ones; one third less money |
| (lineage) | Lisbon "AgentKit New Use Cases", NY "Track A (AgentKit)", Cannes "Best use of Agent Kit" | **Changed** | Product moves from AgentKit (delegated World ID, AgentBook, x402) to an OIDC step-up issuer; trial-mechanic and benefits patterns are retired |
| Best Use of IDKit ($2,500, 2 x $1,250) | Tokyo 2026 "Best Use of IDKit" ($5,000, 2 x $2,500) | **Repeated** (word for word) | Half the money |
| (lineage) | Lisbon Selfie Check Beta and Identity Check Beta Test; ETHOnline Selfie Check; NY Track B (World ID); Cannes "Best use of World ID 4.0"; 2024 "Best Use of World ID" | **Changed** | One credential at the right level, with an alternative path shown, replaces "fully integrate World ID" |

Neither fresh track is new. **Judgement:** if World's Mumbai judges overlap with Tokyo's (not confirmed), they saw at least 37 World entries six weeks ago, so a Mumbai entry that resembles a Tokyo non-winner (agent spend approval, one-human drops) starts behind, and the Tokyo winners' traits in section 5 are the best available calibration.

## 8. Gaps and caveats

- World publishes no numeric rubric after Istanbul 2023; section 5's inferences come from comparing winners and non-winners, not from judges' notes.
- Non-winner lists come from taglines and project pages, so projects that used World but did not say so are missed.
- Pool-prize recipients are counted, not described.
- ETHGlobal pages were fetched one at a time with pauses on 2026-10-31; no bot check was hit on this pass (see section 3.7 for coverage).
