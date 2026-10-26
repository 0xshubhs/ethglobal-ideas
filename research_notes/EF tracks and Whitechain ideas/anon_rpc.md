# Anon-RPC: how it works, its gaps, and what to build at ETHGlobal Mumbai (5 to 7 Nov 2026)

Research date: 2026-10-26. Sources: full clones of ethereum/anon-rpc (main at merge commit c8980fb, PR #15, spec 0.4.0), ethereum/tor-js, ethereum/kps, nymtech/anon-rpc-worker and hisoka-io/nox-sdk; npm registry metadata; live on-chain reads (eth_call via publicnode, 2026-10-26); GitHub issues, PRs and code search; EF Reads site; ETHGlobal prize pages. "Cited Findings" are documented facts. "Inferences" are my own reasoning. Corrections to the brief's starting context are flagged as such.

## Q1. What repos, packages, docs and examples exist, and what is the minimal integration?

### Takeaway
Everything lives in github.com/ethereum/anon-rpc (spec, guides, reference harnesses, specifier contract, demo and bench site), with sibling repos ethereum/kps (transport) and ethereum/tor-js (Tor worker plus gateway). Two harnesses are on npm, but npm is one spec version behind main, and that matters for `isolationKey`. Integration takes about 10 lines: construct `AnonRpcWorker`, then pass `worker.fetch` wherever a custom fetch is accepted.

### Cited Findings
**Repos and docs**
- Main repo: SPEC.md (normative, Draft, v0.4.0, dated 2026-10-23), CHANGELOG.md, adopters.json5, docs/integrate-wallet.md, docs/integrate-network.md, plus `impl/` containing browser-harness, browser-extension-harness, harness-core, node-harness, passthrough-worker, test-worker, specifier, site and demo-extension. [repo](https://github.com/ethereum/anon-rpc)
- The site has a homepage, a live "balance watcher" demo, adopters, rendered spec, wallet guide and network guide. [site](https://ethereum.github.io/anon-rpc/), [demo](https://ethereum.github.io/anon-rpc/demo/), [adopters](https://ethereum.github.io/anon-rpc/adopters/), [wallets](https://ethereum.github.io/anon-rpc/wallets/), [networks](https://ethereum.github.io/anon-rpc/networks/)
- Repo activity: created 2026-06-18, 8 stars, 7 forks, last push 2026-10-24. Only 4 issues and 15 PRs in total. [repo](https://github.com/ethereum/anon-rpc)
- The proposal article is "Power to the Edges: Unlocking Direct Browser-P2P Communication" by Andrew Morris and Ali Atiia, 2026-06-02. It sketched an `IChainFetchProvider` contract, a sandboxed worker, and KPS or WebRTC Direct. [EF Reads blog](https://reads.ethereum.foundation/blog/anon-rpc/) (the old `privreads.../feed/anon-rpc/` URL redirects here)
- KPS has a spec (draft v0.2.1), a SECURITY.md, Go, Rust and JS libs (`@kpstreams/core`, `webrtc-client`, `quic-client`, `server`, all at 0.2.1), and a chat plus eth-rpc block explorer demo served over KPS. [kps](https://github.com/ethereum/kps), [SPEC](https://github.com/ethereum/kps/blob/main/SPEC.md), [demo](https://github.com/ethereum/kps/tree/main/demos/chat)
- A non-EF knowledge-base entry rates anon-rpc "usable", notes no audits and no production deployments, and says "only a browser harness exists so far". It was last reviewed 2026-08-19 and is now stale. [access-layer-resources](https://github.com/ethereum/access-layer-resources/blob/HEAD/tooling/anon-rpc.md)
- The EF Reads projects page still links the spec as 0.3.0 at the old `privacy-ethereum` org URLs. [projects](https://reads.ethereum.foundation/projects)

**npm packages (registry, 2026-10-26)**
- `@anon-rpc/browser-harness`: versions 0.1.0, 0.2.1, 0.3.0, 0.3.2 and 0.3.3. Latest 0.3.3 published 2026-10-13. Deps: `@kpstreams/webrtc-client ^0.2.1`, `@noble/hashes`. [npm](https://www.npmjs.com/package/@anon-rpc/browser-harness)
- `@anon-rpc/browser-extension-harness`: 0.3.2 and 0.3.3. Latest published 2026-10-13. [npm](https://www.npmjs.com/package/@anon-rpc/browser-extension-harness)
- In the repo, both are at 0.4.0 and depend on a new `@anon-rpc/harness-core@0.4.0`. `harness-core` and `node-harness` return 404 on npm. [browser-harness package.json](https://github.com/ethereum/anon-rpc/blob/main/impl/browser-harness/package.json), [harness-core](https://github.com/ethereum/anon-rpc/blob/main/impl/harness-core/README.md)
- Spec 0.4.0 added forwarding of unmodelled fetch-init entries, `anonOptions.isolationKey` and plain values. Before it, the maintainer wrote that "the reference harness drops unknown fields". [CHANGELOG](https://github.com/ethereum/anon-rpc/blob/main/CHANGELOG.md), [tor-js PR #17 comment](https://github.com/ethereum/tor-js/pull/17)
- Worker packages: `@nymproject/anon-rpc-worker` 0.1.0 (2026-10-12) and `@hisoka-io/anon-rpc-worker` 0.4.1 (2026-10-26). `tor-js` 0.4.3 ships `dist/anon-rpc-worker.js`. Workers are distributed by hash through resolvers, and npm serves only as a CDN resolver. [nym worker](https://github.com/nymtech/anon-rpc-worker), [nox worker](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker), [impl README](https://github.com/ethereum/anon-rpc/blob/main/impl/README.md)

**Host API (SPEC §5)**
- `new AnonRpcWorker(init: WorkerInit)`. `ready: Promise<void>`. `fetch: AnonFetch` must be this-bound and assignable to `typeof fetch`. Also `acceptLog(opts?: {signal}) : Promise<LogEntry>` and `close()`. [SPEC §5](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- `WorkerInit` fields: `address` (specifier); `config?: PlainValue` (opaque to the harness); `iframeUrl?` (same-origin bootstrap page for strict CSP); `preExisting?: { rpcProvider?: RpcProvider }` (EIP-1193-style, used only to read the specifier). [SPEC §5](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- `ready` rejects when no bundle matches the hash, the worker throws an uncaught error, or the worker calls `signalFailed`. All pending and future fetches then fail. [SPEC §5](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- Per-call options: `worker.fetch(url, { ..., anonOptions: { isolationKey } })`. This expresses intent that calls under different keys be unlinkable. "Whether and how a worker acts on this intent ... is up to the worker." [SPEC §9.3](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- Errors: `RpcError` carries the worker's `code`, and hosts branch on `code`, never on `message`. [wallet guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-wallet.md)

**Specifier contract (SPEC §4)**
- The required interface is `workerHash() returns (bytes32)` (keccak256 of the bundle bytes) and `workerResolvers() returns (string[])` (advisory). Resolver entries can be `https:` URLs, `kps:<ip>:<port>:<certhash>/<path>` strings (one HTTP/1.1 GET per KPS stream, EOF-delimited, no Transfer-Encoding, no redirects, gzip allowed, hash checked over decoded bytes), or `blob:` for local development. Unknown entries are ignored. [SPEC §4](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- The reference `WorkerSpecifier.sol` is single-owner and has `setWorker(bytes32,string[])`, `transferOwnership` and `renounceOwnership` (which freezes the hash forever), and emits `WorkerUpdated`. Deploy cost is about 1.1M gas. `publish-worker.mjs` rebuilds the bundle, verifies each resolver serves the pinned bytes before spending gas, deploys, reads back, and optionally verifies on Etherscan or Sourcify. `--github` publishes to a content-addressed `keccak` branch. [WorkerSpecifier.sol](https://github.com/ethereum/anon-rpc/blob/main/impl/specifier/src/WorkerSpecifier.sol), [specifier README](https://github.com/ethereum/anon-rpc/blob/main/impl/specifier/README.md), [network guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-network.md)
- Nox publishes one immutable specifier per release plus a stable owner-updatable one that is repointed by `setWorker`. [nox worker README](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker)

**Worker capability API (SPEC §7 to §13). Correction to the brief: there is no `fetch` capability.**
- `anonRpcWorker` exposes `signalReady()`, `signalFailed(reason?)`, `acceptCall({signal}?) : Promise<IncomingCall>`, `config`, `kps`, `storage` and `log`. Nothing else is in the standard. [SPEC §7](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- `IncomingCall` has a single member, `FetchCall { kind: "fetch", url, requestInit?, respond() }`. Future kinds are discriminated by `kind`. [SPEC §8](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- `kps.dial(addr)` returns a `KpsConn` with `openStream`, `acceptStream`, `sendDatagram`, `receiveDatagram`, `close`, `closed` and `remoteAddress`. `kps.openStream(addr)` is sugar for dial plus open. Streams are WHATWG readable and writable, with `closeWrite`, `cancelRead`, `resetWrite` and `close`. [SPEC §10](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- `storage`: async binary KV (`get`, `set`, `delete`, `has`, `list({prefix})`, `clear({prefix})`) scoped to the specifier address. The browser harness backs it with IndexedDB and falls back to memory. [SPEC §11](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md), [impl README](https://github.com/ethereum/anon-rpc/blob/main/impl/README.md)
- Workers may use ambient APIs such as `fetch` and `WebSocket`, but "Usage of other APIs will prevent the worker from functioning on platforms which do not provide them". The passthrough worker uses ambient `fetch`. Nym uses ambient WebSocket. tor-js and Nox use only KPS. [SPEC §3.2](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md), [passthrough-worker.ts](https://github.com/ethereum/anon-rpc/blob/main/impl/passthrough-worker/src/passthrough-worker.ts), [nym README](https://github.com/nymtech/anon-rpc-worker), [PR #4](https://github.com/ethereum/anon-rpc/pull/4)
- A worker is a single standalone IIFE file. The template copies spec-types instead of importing them. [network guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-network.md)

**Live workers (on-chain reads, 2026-10-26)**

| id | specifier | chain | owner | bundle |
|---|---|---|---|---|
| passthrough | [0x4fd7...8d27](https://etherscan.io/address/0x4fd77be300f31c5fe6ab266d35d27750a3478d27#readContract) | mainnet | EOA 0x6d25...0915 | 1,704 bytes; resolver still under `privacy-ethereum` raw URL (serves 200) |
| tor-js | [0x700d...659e](https://etherscan.io/address/0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e#readContract) | mainnet | same EOA 0x6d25...0915 | 6,767,013 bytes (tor-js@0.4.3 via jsdelivr); resolvers are jsdelivr, unpkg, GitHub keccak branch and one `kps:` |
| nym | [0x3aCD...0eD0](https://etherscan.io/address/0x3aCD9742C68F6d993066Ae25533e09b9e1f60eD0#readContract) | mainnet | EOA 0xD8d4...4518 | 18,283,862 bytes |
| nox | [0x3513...7A9A](https://sepolia.etherscan.io/address/0x35133267A8F7EC35046a83DCA0f4Ca8A6e1b7A9A#readContract) | Sepolia | EOA 0xb18d...69C5 | 1,831,246 bytes (652,831 gzipped); 3 https plus 3 `kps:` resolvers |

All three owners are EOAs (`cast code` returns empty), and none has been renounced. Bundle sizes come from my own downloads, except Nox, which is [documented](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker). The addresses match [adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5).

**Adopters (verified)**
- Privacy Pools v2 web app: optional "Connect with Tor", off by default, user picks the gateway. Kiwi News: "anon-rpc switch", fails over to the next provider "If an RPC provider refuses Tor traffic". Both use tor-js. [adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)
- Another wallet, the "Anon wallet" (browser extension, development builds), runs anon-rpc with tor-js according to its developer (GitHub user 0xpaulio). [issue #10](https://github.com/ethereum/anon-rpc/issues/10)

**Minimal integration (documented)**
```ts
import { AnonRpcWorker } from "@anon-rpc/browser-harness";
const worker = new AnonRpcWorker({
  address: "0x4fd77be300f31c5fe6ab266d35d27750a3478d27",
  config: undefined,
  preExisting: { rpcProvider: { request: ({ method, params }) => myExistingProvider.request({ method, params }) } },
});
const res = await worker.fetch("https://rpc.example/", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
});
```
Source: [wallet guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-wallet.md). For tor-js, use address `0x700dA3193D35fA54Cd3fBf29B66f2a2A0385659e` with `config: { gateways: ["152.236.3.22:12298:uEiCH0VdbhryzJcMtCfB0vLA4sOvHdQ4hq5w7CopcwU59bQ"] }`. That gateway is a demo with limited capacity that "may disappear at any time". [adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5) Nym needs no config. [Nym docs](https://github.com/nymtech/nym/blob/HEAD/documentation/docs/content/developers/anon-rpc.mdx)

### Inferences
- A team that wants `isolationKey` today must install the harness from the repo main branch (0.4.0), not from npm (0.3.3). Even then, no merged worker honours the key (see Q6). Plan the demo so it does not depend on this.
- Treat the demo gateway as unreliable for a live judging slot. Run your own tor-js-gateway, or pick Nym as a no-config fallback.

### Gaps
- I did not verify whether a 0.4.0 npm release is imminent, or whether one will land before 5 Nov.

## Q2. Is there a viem, ethers or wagmi adapter, an EIP-1193 wrapper, a Snap, or a wallet-side integration?

### Takeaway
The official repo publishes no adapter package. The docs just say "pass `worker.fetch`" to viem or ethers. Adopters have hand-rolled their own: Privacy Pools wraps viem `http({ fetchFn })` behind an egress allowlist, Kiwi News has a failover requester, and Kohaku ships an EIP-1193-style `@kohaku-eth/provider/anon` (browser-only PoC). No MetaMask Snap exists. Wallet-side integrations exist in Privacy Pools (web and React Native), the Anon wallet (dev builds) and Kohaku's provider package.

### Cited Findings
- The wallet guide says `worker.fetch` is this-bound, so "pass it as a free function to anything that accepts a custom `fetch` or transport (a viem custom transport, an ethers `FetchRequest` getUrl hook, your own JSON-RPC wrapper)". No adapter ships. [wallet guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-wallet.md)
- viem's `http()` transport has a `fetchFn` option in source (viem 2.57.11, `clients/transports/http.ts`, passed through to `utils/rpc/http.ts` as `options.fetchFn ?? fetch`). The docs page does not list it. [viem source](https://github.com/wevm/viem/blob/main/src/clients/transports/http.ts), [viem docs](https://viem.sh/docs/clients/transports/http)
- ethers v6.17.0 exposes `FetchRequest.getUrlFunc` (per request) and `FetchRequest.registerGetUrl` (global). Type: `FetchGetUrlFunc = (req, signal?) => Promise<{statusCode, statusMessage, headers, body: Uint8Array|null}>`. [ethers fetch.ts](https://github.com/ethers-io/ethers.js/blob/main/src.ts/utils/fetch.ts)
- Privacy Pools' `policedHttp()` wraps viem `http()`. It applies an egress allowlist at the EIP-1193 `request` level and again inside `fetchFn`, then sends with `torFetchIfActive() ?? fetch`, using `redirect: 'error'`, `credentials: 'omit'` and `referrerPolicy: 'no-referrer'`. It fails closed: "It does not fall back to a direct fetch." It also records a real incident: "the 2026-08-26 leak was 108 per-nullifier `eth_call`s issued by SDK internals during a single send". [egress-transport.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/egress-transport.ts), [tor-fetch.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts)
- Privacy Pools pins the expected `workerHash` on the client side by intercepting the `eth_call` with selector `0x3898587d` and refusing a different hash ("The anon-rpc client named on-chain is not the one this build accepts"). [tor-fetch.ts](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts)
- Kiwi News loads the harness via dynamic `import()` only when "Private RPC" is on. It adds a 90 s boot timeout ("the harness itself has no boot timeout"), a 60 s fail-fast after a failed boot, one shared worker per page, and `fetchWithFailover` across endpoints. [anon-transport.mjs](https://github.com/attestate/kiwistand/blob/HEAD/src/web/src/anon-transport.mjs)
- Kohaku `@kohaku-eth/provider/anon` (0.1.0-alpha.11 and later, current 0.1.0-alpha.13) wraps the harness as an `EthereumProvider` with `bootTimeoutMs` (default 120 s) and Tor-sized receipt polling (4 s interval, 5 min timeout). It is described as a "Browser-only proof of concept". [anon/index.ts](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/src/anon/index.ts), [CHANGELOG](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/CHANGELOG.md), [PoC](https://github.com/ethereum/kohaku/tree/HEAD/examples/anon-rpc-poc)
- A BuidlGuidl-adjacent research repo built a spike of "viem reads through the sandboxed mainnet worker". [clawd-research](https://github.com/clawdbotatg/clawd-research/tree/HEAD/anon-rpc)
- GitHub repo search for "anon-rpc snap" returns nothing. [GitHub search, 2026-10-26]

### Inferences
- viem adapter, to verify in your build: `http(rpcUrl, { fetchFn: worker.fetch, batch: true })`. The Privacy Pools code is the precedent. A published `@anon-rpc/viem` or wagmi connector helper would be new, but thin on its own. Ship it alongside an app.
- ethers adapter, an untested sketch: set `req.getUrlFunc = async (r) => { const x = await worker.fetch(r.url, { method: r.method, headers: r.headers, body: r.body ?? undefined }); return { statusCode: x.status, statusMessage: x.statusText, headers: Object.fromEntries(x.headers), body: new Uint8Array(await x.arrayBuffer()) }; }` on a `FetchRequest`, then pass it to `new JsonRpcProvider(req)`.
- Snap: I believe Snaps cannot replace MetaMask's internal network provider, so a Snap could only serve dapp-originated private reads through `wallet_invokeSnap`. Whether the Snaps execution environment offers the WebRTC that KPS needs is unverified. High risk; avoid unless someone on the team knows Snaps well.
- A better extension idea: an MV3 extension, built on `@anon-rpc/browser-extension-harness`, that wraps `window.ethereum` and EIP-6963 providers. It would route read methods through anon-rpc and pass signing methods to the user's real wallet. Reads the wallet makes internally would still leak, and the team should say so.

### Gaps
- I found no ethers-specific adopter code.

## Q3. Which platforms lack a harness, and what does building one take?

### Takeaway
Public and conforming: browser page and MV3 extension (Chromium plus Firefox). Public but non-conforming: a Node prototype that runs workers in QuickJS-WASM without KPS, storage or WebAssembly, so only passthrough works there. A private Rust stack (0xbow-io/anon-rpc-rs) claims browser, extension, Swift, Kotlin, React Native, Flutter and Node packages. Its native sandbox has no WebAssembly, so on native, Tor runs as built-in Arti instead of as a hash-pinned worker. No public harness exists for Node/CLI, Deno, Bun, Electron, Tauri, iOS, Android or server-side.

### Cited Findings
- Browser harness: a Web Worker inside a `sandbox="allow-scripts"` null-origin iframe, with capability traffic over a MessagePort. KPS streams ride transferable WHATWG streams. Firefox refuses `importScripts(blob:)` in opaque-origin workers, so the harness uses `data:` there. [browser-harness README](https://github.com/ethereum/anon-rpc/blob/main/impl/browser-harness/README.md), [impl README](https://github.com/ethereum/anon-rpc/blob/main/impl/README.md)
- Extension harness: Chromium hosts the iframe in an offscreen document and Firefox uses the background page. Manifest needs: `offscreen` permission, `sandbox.pages: ["anon-rpc/*/sandbox.html"]`, and a sandbox CSP with `blob:` in `script-src`. Known issues: Chrome stops idle service workers after about 30 s, so a long-quiet response stream can die ("Not yet measured, and not worked around"); log args arrive as rendered strings; base64 is used on every hop. Chrome's MV3 remote-code ban has a carve-out for sandboxed iframes. "Firefox (AMO) has no such carve-out." [extension README](https://github.com/ethereum/anon-rpc/blob/main/impl/browser-extension-harness/README.md)
- Node harness (`impl/node-harness`, private 0.0.0): "Not yet a conforming harness". §10 KPS and §11 storage are "stubs that throw `unsupported`". §9 bodies are buffered. It has a proposed `socket` capability (raw TCP, so tor-js would need no gateway) and a `fetch` capability with a default address policy that denies loopback, RFC1918 and link-local. Guest JS runs about 50x slower than V8, recursion is capped near 276 frames, and `crypto.subtle` is absent. The bare-isolate probe lists `WebAssembly` among the globals that are undefined, and the prelude it documents does not add it. [node-harness README](https://github.com/ethereum/anon-rpc/blob/main/impl/node-harness/README.md)
- A superseded Linux-only strategy (Landlock plus seccomp around `node:vm`) was abandoned because `fn.constructor` escapes `node:vm`. [node-harness README](https://github.com/ethereum/anon-rpc/blob/main/impl/node-harness/README.md)
- The 0xbow React Native package (`@0xbow/anon-rpc-rs-react-native` 0.4.0-alpha.1, peer deps Expo 54+ and RN 0.81+) is vendored in a public repo. Its source repo, 0xbow-io/anon-rpc-rs, is private. Its README says iOS and Android "run the hash-pinned worker bundle in an embedded sandbox" via Swift and Kotlin SDKs, and also says "the sandbox has no `WebAssembly`, so the tor-js worker does not run here". Native Tor goes through `AnonRpcWorker.tor()` (Arti). The browser package's README lists "the Rust crate and the Swift, Kotlin, React Native (on iOS and Android), Flutter, and Node packages". [vendor dir](https://github.com/0xbow-io/privacy-pools-website-v2/tree/HEAD/vendor), [package.json](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/package.json)
- The 0xbow browser harness needed a local patch: "Upstream `close()` rejects `ready`, but its asynchronous bootstrap can still finish a bundle download and create an iframe after the caller closes it". [ANON_RPC_PATCHES.md](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/vendor/ANON_RPC_PATCHES.md)
- The proposal noted iframe isolation "does not work out of the box in Node, Bun, or Deno" and suggested Deno sandboxed workers. [blog](https://reads.ethereum.foundation/blog/anon-rpc/)
- The Nym worker needs `Worker`, `WebAssembly`, `Blob`, `WebSocket` and `fetch` ("Browser-like harnesses only"). Nox fails with `unsupported-platform` without KPS, `crypto.getRandomValues` or WebAssembly. [nym README](https://github.com/nymtech/anon-rpc-worker), [nox README](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker)
- KPS has native QUIC clients (Go, Rust, Node `@kpstreams/quic-client`) that share one UDP port with WebRTC. [kps README](https://github.com/ethereum/kps)

### Inferences
- The biggest platform gap is a non-browser sandbox that can run WASM workers. Every real anonymizing worker today (tor-js, Nym, Nox) is a WASM bundle, and neither the public Node prototype nor the private native harness runs WASM inside its sandbox.
- Realistic in 36 h:
  1. **Electron (Low).** Its renderer is Chromium, so the browser harness probably works as-is. The work is a packaged demo and a local JSON-RPC proxy.
  2. **Deno harness (Medium).** Run the bundle in a Deno Worker with per-worker permissions (`net` only), bridge KPS host-side through `@kpstreams/quic-client`, and back storage with files. Deno Workers have WebAssembly natively.
  3. **Node "local RPC proxy" (Medium).** Use the Node prototype or Deno to expose `http://127.0.0.1:8545`, so MetaMask, Rabby, Frame, Foundry and cast all get anonymized reads. Not having WebAssembly in QuickJS limits this to passthrough plus `socket`-based workers.
  4. **React Native via react-native-webview (Medium).** Host the browser harness in a WebView to run unmodified WASM workers. The isolation story needs care.
  5. **Tauri (Medium).** System WebView. Nym is "Not yet confirmed working on Safari", and WebKit WebRTC behaviour in WKWebView is unverified.
- Hardest and most valuable (High): finishing the Node harness's KPS bridge plus storage and adding WebAssembly to the isolate. That would make it the first public conforming non-browser harness.

### Gaps
- Exact capabilities of the private anon-rpc-rs native SDKs (does its embedded sandbox expose KPS and storage?). The source is private.

## Q4. Which anonymizing networks lack a worker, and which are realistic in WASM within a weekend?

### Takeaway
Workers exist for Tor (tor-js), Nym and Nox, plus passthrough. Missing: OHTTP (most weekend-feasible), a bring-your-own-proxy worker (proposed by the Anon wallet team), Katzenpost/ZKNet, HOPR, PIR-backed reads, I2P, Lokinet, Waku and libp2p. Only OHTTP and proxy-js look realistic in 36 hours.

### Cited Findings
- The proposal invited teams including "Fileverse, Tor, Nox, Anyone, Nym, and HOPR". The EF access-layer project names "Tor, Nym, HOPR, Nox, and others" as interchangeable targets. [blog](https://reads.ethereum.foundation/blog/anon-rpc/), [projects](https://reads.ethereum.foundation/projects)
- tor-js is Arti in WASM, with `wasm-base64` at 2.5 MB. A browser reaches Tor relays through a tor-js-gateway, a blind KPS relay that uses HTTP CONNECT per relay connection and also serves a zstd directory snapshot and keccak-addressed bundles. `.onion` clients were enabled by PR #15. Status: "Experimental", with an open security-validation issue (#6). [tor-js README](https://github.com/ethereum/tor-js), [gateway README](https://github.com/ethereum/tor-js/blob/main/crates/tor-js-gateway/README.md), [issue #6](https://github.com/ethereum/tor-js/issues/6)
- Nym worker: mix-fetch, then smolmix WASM (Sphinx plus smoltcp plus TLS), then a WebSocket to a Nym gateway, the mixnet, and an IP Packet Router. Cover traffic is on by default. Identity is ephemeral because the sandbox denies IndexedDB and it is shimmed in memory. "No KPS transport yet". [nym README](https://github.com/nymtech/anon-rpc-worker)
- Nox worker: Sphinx over KPS. TLS runs inside the worker. Requests are padded to buckets. It has bridge mode and a NoxRegistry on Arbitrum Sepolia with a 2-exit quorum. The `trust` and `checkpoint` config keys are "reserved for proof-backed discovery". It sends no cover traffic from the worker, and "today one team runs every node in one cloud". [nox README](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker), [threat map](https://andyguzmaneth.github.io/anon-rpc-threat-map/)
- Proposed "proxy-js": a worker plus client with tor-js's `fetch` and no Tor client. It would do CONNECT over KPS to a gateway that forwards to a SOCKS5 upstream (Tor daemon, Nym, VPN or SSH), with the isolation key as SOCKS username. The authors measured an MV3 sandbox bootstrapping Tor through a loopback gateway in 2.0 s. [issue #10](https://github.com/ethereum/anon-rpc/issues/10), [kps PR #8](https://github.com/ethereum/kps/pull/8)
- OHTTP precedent: an Algorand demo encapsulates RPC with HPKE (`ohttp-js`), sends it through a Fastly relay to a Nodely gateway, and on to algod. `ohttp-ts` 0.6.1 (updated 2026-09-30) is on npm. [algorand demo](https://github.com/algorandecosystem/algorand-anonymous-rpc-demo), [ohttp-ts](https://www.npmjs.com/package/ohttp-ts)
- Katzenpost: the ZKNet demo runs a Katzenpost client in Docker, exposes "WalletShield" RPC over HTTP plus KPS (`:9201`), and uses a VPS mixnet. It is native, not an anon-rpc worker. [zknet demo](https://github.com/zknet-labs/zknet-anon-rpc-demo)
- HOPR RPCh SDK `@rpch/sdk` 4.0.0 was last modified 2024-08-27. [npm](https://www.npmjs.com/package/@rpch/sdk)
- PIR: the EF roadmap has a "Live demo on mainnet" (Q4 2026, Kohaku reads through GPU-served PIR), batch PIR, and "Verifiable PIR" (Q1 2027). Reference specs exist for Plinko, RMS24 and VIA, plus insPIRe on GPU and a "Universal PIR interface" design. [roadmap](https://reads.ethereum.foundation/roadmap), [projects](https://reads.ethereum.foundation/projects)
- The threat map verdict says every network hides the IP, "and none hides what the wallet asks (that needs PIR)". [threat map model](https://github.com/andyguzmaneth/anon-rpc-threat-map)

### Inferences
Weekend feasibility for a 2 to 3 person team:

| Network | Worker exists? | 36 h feasibility | Notes |
|---|---|---|---|
| OHTTP | No | **Medium** | HPKE in JS is mature. The team must run an OHTTP gateway in front of an Ethereum RPC and use a separate relay. Self-running both removes the non-collusion property, so disclose that. Uses ambient fetch to the relay, or KPS. |
| proxy-js / BYO SOCKS | No (proposed) | **Medium to High** | Reuses tor-js gateway code (Rust). The proposers may build it themselves first. |
| PIR worker (toy) | No | **High** | 2-server XOR PIR or simple LWE over a small balance snapshot, with Tor for the rest. Very novel, risky. |
| Katzenpost / ZKNet via KPS | No | **High** | A worker could dial WalletShield over KPS, but that is a trusted proxy. A real Sphinx client in WASM is a Go to WASM port. |
| HOPR | No | **High** | Tooling looks stale. |
| I2P, Lokinet | No | **Not realistic** | No browser WASM clients known. Would need a tor-js-style gateway. |
| Waku, libp2p | No | **Low value** | They are not sender-anonymous RPC transports. |
| Tor onion-only config | Covered by tor-js | **Low** | App-level choice. Removes exit blocking. |

### Gaps
- I found no public Ethereum OHTTP gateway. If one exists it would cut the OHTTP effort a lot.

## Q5. How does Anon-RPC combine with light clients (Helios, Lodestar, Colibri, Kevlar) so responses are verified, not just anonymized?

### Takeaway
I found no existing composition. Kohaku ships anon, Helios and Colibri as separate, mutually exclusive providers. Composition is very achievable: Colibri v3 takes a custom `fetch` (documented for Tor), and Lodestar's prover wraps any EIP-1193 provider. Helios has no fetch hook. This is one of the most novel, judge-aligned directions, because the prize explicitly lists "Combining anon-rpc with a light client or proof verification".

### Cited Findings
- The wallet guide's own trust model: a malicious worker "can observe, censor, or lie", and the bootstrap provider "is trusted for one read" (the `workerHash()` value). [wallet guide](https://github.com/ethereum/anon-rpc/blob/main/docs/integrate-wallet.md)
- Colibri (`@corpus-core/colibri-stateless` 3.0.2) `Config` includes `fetch?: typeof globalThis.fetch`, documented as "Custom fetch function replacing `globalThis.fetch` for all HTTP requests. Use this to route traffic through Tor, a SOCKS proxy, or any other transport layer". It also has `prover_mode` (local, remote, hybrid, proxy, light_client), `zk_proof`, `oblivious_nodes` (TEE `eth_getProof` endpoints) and `logs_completeness`. [npm](https://www.npmjs.com/package/@corpus-core/colibri-stateless) (types.d.ts in the package)
- `@lodestar/prover` 1.43.0 `createVerifiedExecutionProvider(provider, { transport: LCTransport.Rest, urls, network })` wraps web3.js, ethers or "any eip1193 compatible providers". It verifies `eth_getBalance`, `eth_getCode`, `eth_call`, `eth_estimateGas` and `eth_getBlockByHash/Number`, and does not support batch requests. [npm](https://www.npmjs.com/package/@lodestar/prover)
- Helios TS `@a16z/helios` 0.12.0 `Config` has only `executionRpc`, `verifiableApi`, `consensusRpc`, `checkpoint`, `network` and `dbType`. There is no fetch injection. [npm](https://www.npmjs.com/package/@a16z/helios)
- Kohaku's Helios provider sends `eth_getLogs` directly with plain `fetch` when `bypassLogs` is set. Its anon provider is separate. [helios/index.ts](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/src/helios/index.ts), [anon/index.ts](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/src/anon/index.ts)
- The EF roadmap lists "Wallet, SDK and light-client integrations" and "Broader SDK and light-client rollout" (Q3 2026) under Anonymous RPC. The verifiable binary trie work is "Paused". [roadmap](https://reads.ethereum.foundation/roadmap)
- Nox already does a 2-of-2 exit/provider byte-for-byte quorum for its own registry reads (`chainQuorum`). [nox README](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker)

### Inferences
- **Colibri plus anon-rpc (Low to Medium).** `new Colibri({ chainId: 1, fetch: worker.fetch, ... })` routes every Colibri HTTP call (RPC, beacon, prover) through the worker. It is verified and anonymized with one integration. The most straightforward high-depth build.
- **Lodestar prover over an anon EIP-1193 provider (Medium).** Verified EL reads go through anon-rpc. The beacon REST calls are made by Lodestar's own client, so they may leave directly unless patched. They carry no addresses, but they do reveal usage.
- **Helios with an injectable fetch (High).** Requires changing Helios's Rust/WASM HTTP layer. Upstreamable and novel.
- **Verified specifier read (Medium, high novelty).** Use `eth_getProof` on the specifier's `workerHash` storage slot plus a light-client header, so the "bootstrap provider is trusted for one read" gap closes. Note: the reference contract keeps `_workerHash` private, so find the storage slot from the layout.
- **Cross-network quorum (Low to Medium).** Send the same read through two workers (for example Tor and Nym) or two providers, and alert on mismatch. A simpler correctness story than a light client.

### Gaps
- Whether Lodestar's prover REST transport can take a custom fetch. I did not check its source.
- Kevlar: not researched.

## Q6. Known limitations, and what tooling would address them

### Takeaway
Measured latency from the official weekly bench: direct about 15 to 22 ms p50; tor-js about 0.8 to 1.2 s p50 with a boot of about 8 s; Nym about 0.8 s p50 with a boot of about 11 s; Nox does not boot in the bench because its specifier is on Sepolia. Other limitations: large bundles, a demo-only gateway, exit IP blocking, single-EOA specifier owners, a non-anonymized bootstrap read, no `isolationKey` in any merged worker, no subscriptions call kind, unspecified fail-open behaviour, and non-RPC calls that leak.

### Cited Findings
**Measured numbers.** Official bench, `eth_getBalance` via Alchemy, n=50 per arm, GitHub-hosted runner. Bootstrap is "one sample per arm", so treat it as indicative.

| run | arm | boot | p50 | p90 | p99 |
|---|---|---|---|---|---|
| 2026-10-26 | direct | n/a | 22 ms | 54 ms | 131 ms |
| 2026-10-26 | passthrough | 761 ms | 40 ms | 46 ms | 128 ms |
| 2026-10-26 | tor-js | 8,093 ms | 810 ms | 920 ms | 1,763 ms |
| 2026-10-26 | nym | 10,737 ms | 764 ms | 1,083 ms | 6,059 ms |
| 2026-10-26 | nox | did not boot ("short bytes32 return") | | | |
| 2026-10-19 | tor-js | 7,640 ms | 1,159 ms | 1,834 ms | 7,984 ms (7 of 50 discarded) |
| 2026-10-19 | nym | 11,017 ms | 818 ms | 1,207 ms | 7,647 ms |

Sources: [run 2026-10-26](https://github.com/ethereum/anon-rpc/actions/runs/40303047893), [run 2026-10-19](https://github.com/ethereum/anon-rpc/actions/runs/39233057278) (artifacts bench-results-14 and -13).
- The first bench in August measured tor-js boot at 21.1 s (range 13.8 to 21.1 s) and p50 at 1,424 ms. It found passthrough paid a CORS preflight on every request (about 280 ms) because the opaque origin cannot share the page's preflight cache. "Bandwidth is not measured ... need counters in the KPS gateway". The bench page is dev-only and "does not reach Pages". [PR #4](https://github.com/ethereum/anon-rpc/pull/4)
- Nox cannot be benched because the bench reads every specifier via one mainnet `--rpc`. A `--extra-arms` with a per-arm `bootstrapRpc` was proposed. [issue #9](https://github.com/ethereum/anon-rpc/issues/9)
- Wallet-shaped tor-js numbers from the Anon wallet team: a typical call is "~1.5 s either way, against ~0.1 s direct". Keying per address set caused 60 s cold refreshes and 9 failures, while keying per account matched the shared circuit's cost and produced 5 exits for 5 accounts. [issue #10](https://github.com/ethereum/anon-rpc/issues/10)
- Mobile boot: a tor-js cold start downloads a 3 MB `/bootstrap.zip.zst` snapshot, which took a median 13.1 s (up to 48 s) over 114 Android emulator loads. With a host-supplied snapshot (merged PR #21, `config.bootstrap`), that step fell from 8.1 s to 0.4 s, and Tor was ready in 2.3 to 2.6 s. [tor-js PR #21](https://github.com/ethereum/tor-js/pull/21)
- Nym docs: "The first response takes tens of seconds while the mixnet tunnel bootstraps". [Nym docs](https://github.com/nymtech/nym/blob/HEAD/documentation/docs/content/developers/anon-rpc.mdx)

**Gateway and transport**
- Demo gateway: "limited capacity, and it may disappear at any time". [adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)
- tor-js multi-gateway support is simple sticky failover. Issue #9 asks for Tor guard-style persistent selection, because "each gateway observes all of a client's relay connections". [tor-js issue #9](https://github.com/ethereum/tor-js/issues/9)
- KPS has no DNS, so "an IP change means updating every published copy" of a gateway address. [gateway README](https://github.com/ethereum/tor-js/blob/main/crates/tor-js-gateway/README.md)
- KPS threat model: endpoint IP blocking is out of scope (it needs "private endpoints", a later story). Under DTLS 1.2, a 200-year certificate validity looks unusual for WebRTC. [kps SECURITY.md](https://github.com/ethereum/kps/blob/main/SECURITY.md)

**isolationKey**
- No merged worker implements it. tor-js PR #20 (per-key circuits read from the request init, plus no TLS session resumption across keys) is open, and PR #17 is open. The Nym and Nox worker sources do not reference `isolationKey` or `anonOptions` (my grep of main, 2026-10-26). [tor-js PR #20](https://github.com/ethereum/tor-js/pull/20)

**Trust and governance (threat map, labelled DRAFT, personal notes by an EF-adjacent author, "not an EF publication")**
- Listed as gaps or open: "Upgrade governance for specifiers" (the spec defines none); "Fail-closed default" (not specified); "Clearnet bootstrap" reveals anon-rpc use; "Everything outside RPC" (price APIs and indexers leak); query content is still visible (needs PIR); timing attacks.
- Proposed but unimplemented defenses: "Timing-safe tx watch"; size buckets plus coalescing; delayed broadcast; jurisdiction-diverse RPC pool; bridges and pluggable transports.
- The TRAP attack, cited at 95.33% IP-to-address on mainnet tests, works from the user's link plus the public chain. [threat map](https://andyguzmaneth.github.io/anon-rpc-threat-map/), [model.js](https://github.com/andyguzmaneth/anon-rpc-threat-map), [TRAP paper](https://arxiv.org/abs/2508.21440)
- Specifier owner key "is the supply chain for every host pinned to that address". [specifier README](https://github.com/ethereum/anon-rpc/blob/main/impl/specifier/README.md) Live owners are single EOAs (Q1 table).

**Other limits**
- Only the `fetch` call kind exists, so there are no WebSocket or `eth_subscribe` calls. [SPEC §8](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md)
- The harness has no boot timeout. Adopters add 90 s or 120 s. [Kiwi](https://github.com/attestate/kiwistand/blob/HEAD/src/web/src/anon-transport.mjs), [Kohaku](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/src/anon/index.ts)
- Nox: "`eth_sendRawTransaction` is sent once and never resent". `wasm-blocked` requires `'wasm-unsafe-eval'` in the embedder's CSP. [nox README](https://github.com/hisoka-io/nox-sdk/tree/main/packages/anon-rpc-worker)
- Nym: "Abort is not cancel". [nym README](https://github.com/nymtech/anon-rpc-worker)
- Exit blocking: Kiwi News fails over "If an RPC provider refuses Tor traffic". [adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5)

### Inferences
Tooling that maps directly onto these limits:
- **Public network health dashboard.** Boot time, p50/p90/p99, failure rate, exit IP, provider-by-worker acceptance matrix, bundle size, resolver liveness, and owner type (EOA, multisig, renounced). Supports a Sepolia arm, which fixes the issue #9 gap.
- **Leak detector / egress auditor** that computes "% of RPC traffic through Anon-RPC", which is itself a judging criterion.
- **Gateway operator kit** with byte counters (the bench says bandwidth needs them), a one-click deploy, and an on-chain gateway directory.
- **Specifier watchdog** that alerts on `WorkerUpdated` events.
- **Timelock or multisig specifier.**
- **Snapshot mirror** for tor-js fast boot.
- **Request coalescer and cache layer** in front of `worker.fetch` (viem `batch: true` plus multicall3) to cut round trips at about 1 s each.
- **Fail-closed wrapper**, following the Privacy Pools pattern.

### Gaps
- No public per-provider data on which RPC endpoints block Tor, Nym or Nox exits. A team would have to measure it, which makes it a deliverable.
- Gateway capacity numbers are undocumented.

## Q7. What do the authors and ecosystem say they want built next, and what is the exact prize?

### Takeaway
The EF prize at ETHGlobal Mumbai explicitly rewards apps that route reads by default, new workers and new harnesses, with depth and shippability weighted. The roadmap and threat model point at light-client integration, SDK rollout, governance, timing defenses, PIR and native transports. No ethresear.ch or Magicians thread about anon-rpc itself turned up.

### Cited Findings
- **Prize.** "Best Use of Anon-RPC", $5,000 (1st $2,500, 2nd $1,500, 3rd $1,000).
  - Scope: "Use Anon-RPC as an app that consumes it, or produces anonymity via a new Anon-RPC worker, or both". Teams may also implement or fork the harness for a new platform.
  - Ideas: portfolio dashboard, block explorer, dApp fork, network health checker or playground, light client or proof verification, new network, new harness.
  - Qualification: "Your app routes its RPC reads through Anon-RPC by default. If you're building a worker or the harness, a simple demo app is enough."
  - Judging: works end to end; demo UX; "how much of the app's traffic goes through Anon-RPC (if an app)" (disclosed intentional exclusions are acceptable); shippable after the hackathon; technical depth.
  - [ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes), [EF page](https://ethglobal.com/events/mumbai/prizes/ethereum-foundation)
- **Prize stacking.** "One EF prize per project ... You can submit to anon-rpc, the alt mempool and CROPS, but you will be placed in at most one". Other EF prizes: Frame Tx Alt Mempool ($5,000), Best CROPS App ($3,500, links Anon-RPC, Kohaku and Walletbeat; ideas include "a tool that reveals what an app leaks"), Best CROPS Upgrade ($1,500, Continuity Track). [ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- **Event.** ETHGlobal Mumbai, 5 to 7 Nov 2026, Mumbai. [ETHGlobal events](https://ethglobal.com/events)
- **Roadmap (Anonymous RPC and access layer).** Wallet, SDK and light-client integrations ("ethers.js first"); upstream to the Tor Project; WebRTC transport; messenger protocol survey; external security audit; "Edge-to-P2P transaction broadcasting"; hybrid PQ key exchange; a unified WebRTC transport spec; a "Pilot deployment" (wallet to Tor to execution node); formal methods (Lean); "Privacy-preserving RPC aggregation". [roadmap](https://reads.ethereum.foundation/roadmap)
- **Open problems.** Browsers cannot dial native node transports; ENRs do not advertise edge-dialable transports or certhashes; NATed home nodes cannot serve; no protocol enumerates serving endpoints; the CA certificate barrier. [open problems](https://reads.ethereum.foundation/open-problems)
- **Threat map open questions.** TRAP success per network; Nym cover-rate sufficiency; Nox cover traffic; per-request latency for Nym and Nox; PIR query size padding; fail-closed spec text; specifier governance; moving non-RPC wallet calls behind the worker. [threat map](https://andyguzmaneth.github.io/anon-rpc-threat-map/)
- **Maintainer direction (voltrevo).** Favoured forwarding unknown init fields over a header for isolation (shipped in 0.4.0) and committed to building on the Anon wallet team's changes. [tor-js PR #17](https://github.com/ethereum/tor-js/pull/17)
- **Open tor-js asks.** ExitNodes/ExcludeExitNodes, which the maintainer says "should be possible". [tor-js issue #14](https://github.com/ethereum/tor-js/issues/14)
- **Proposal-era deferred items.** Secondary discovery (gossip, mirrors, IPFS), successor contracts, community-endorsed upgrades, SSZ and stateless-friendly RPC queries, and a "Springboard" loader in an extension or browser. [blog](https://reads.ethereum.foundation/blog/anon-rpc/)

### Inferences
- Disclosing intentional exclusions is allowed, so a "privacy ledger" panel that lists every non-anon request (and why) both scores the traffic-share criterion and documents trade-offs honestly.
- Pick one EF prize target. A leak-auditor tool might fit CROPS better, while an app plus worker fits Anon-RPC.

### Gaps
- No ethresear.ch, Magicians or X posts by the authors about anon-rpc next steps turned up in search. Not found does not mean none exist.

## Q8. Which open-source dapps and wallets make good forks, and how hard is the swap?

### Takeaway
The easiest high-impact forks are viem/wagmi dapps (pass `fetchFn` in one place) and Scaffold-ETH 2 (linked by the EF). Otterscan needs an `ots_`-capable node. Wallet forks (Ambire/Kohaku, Rabby, Safe, Frame) are heavy because of internal backends and extension or Electron plumbing.

### Cited Findings
- Kohaku's first version is a browser extension built on Ambire, and its provider package already has an anon backend. [Cointelegraph](https://cointelegraph.com/news/ethereum-devs-unveil-kohaku-wallet-privacy-roadmap), [Kohaku provider](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/src/anon/index.ts)
- Otterscan (MIT) is "designed to be run locally with an archive node companion, Erigon" and uses ethers. [otterscan](https://github.com/otterscan/otterscan)
- The CROPS prize links Scaffold-ETH 2. [ETHGlobal Mumbai prizes](https://ethglobal.com/events/mumbai/prizes)
- The extension harness exists for MV3 wallets, and Chrome's sandboxed-iframe carve-out covers remote code. [extension README](https://github.com/ethereum/anon-rpc/blob/main/impl/browser-extension-harness/README.md)

### Inferences
Effort for 2 to 3 people in 36 h:

| Fork | Swap effort | Main blocker | Notes |
|---|---|---|---|
| Scaffold-ETH 2 extension | **Low** | wagmi config only | Ship as an SE-2 extension so every SE-2 app is private by default. Good distribution story. |
| Any viem/wagmi dapp (Uniswap-style swap UI, Aave UI, ENS app) | **Low to Medium** for RPC | Non-RPC APIs (routing, quotes, token lists, GraphQL) | `worker.fetch` handles general web requests for tor-js, Nym and Nox, so those APIs can also be routed, or disclosed. |
| Otterscan | **Medium** | `ots_` namespace node (Erigon; Reth and Anvil likely support it, unverified) | ethers custom getUrl hook. Strong "block explorer" match to the prize ideas. |
| Custom lightweight explorer on standard JSON-RPC | **Low to Medium** | None | Avoids the `ots_` dependency. |
| Ambire / Kohaku extension | **High** | Large codebase; the wallet's internal backends | Use `@kohaku-eth/provider/anon` plus the extension harness. |
| Rabby, Rainbow | **High** | Rely on their own portfolio backends (general knowledge, unverified here) | Traffic share would be low unless the backends are replaced. |
| Safe{Wallet} | **Medium to High** | Safe Transaction Service API calls | Could route them through `worker.fetch` too. |
| Frame (Electron) | **Medium to High** | Electron main-process RPC | Pairs with an Electron harness idea. |

### Gaps
- I did not inspect the Uniswap interface, Rabby, Rainbow or Safe{Wallet} code for exact fetch injection points.

## Q9. Can Whitechain (OP Stack L2, testnet chain ID 1874) be added as an Anon-RPC network?

### Takeaway
Not as an "anonymizing network". Whitechain is a chain, and anon-rpc networks are transports. It fits three other ways: (a) as a destination chain reachable today through any general-web worker; (b) as a chain hosting a specifier contract; (c) as a place to run a KPS-native or onion RPC endpoint. The 50 rps per IP limit is the main hazard, because all users behind a shared exit share one budget.

### Cited Findings
- Live probe of `https://rpc.testnet.whitechain.io` on 2026-10-26:
  - `eth_chainId` returned `0x752` (1874), and `eth_blockNumber` worked.
  - The CORS preflight with `Origin: null` returned `access-control-allow-origin: *` and `access-control-allow-headers: *`.
  - JSON-RPC batch requests work.
  - Responses are served by `server: cloudflare`.
  - Latest block: `miner` is `0x4200...0011` and the first tx has type `0x7e` from `0xdead...0001` to `0x4200...0015` (OP Stack deposit and L1Block markers).
  - [probe of rpc.testnet.whitechain.io]
- A conforming worker must provide "general web request access" or serve RPC at a nominated URL. tor-js, Nym and Nox all forward to arbitrary https RPC URLs (for example "Any `https://` RPC endpoint works through the worker"). [SPEC §3.2](https://github.com/ethereum/anon-rpc/blob/main/SPEC.md), [nym README](https://github.com/nymtech/anon-rpc-worker)
- `adopters.json5` `chainId` is "The chain the specifier contract lives on ... not the chain the anonymized fetch can reach". Workers published on a testnet can still read other chains. [adopters.json5](https://github.com/ethereum/anon-rpc/blob/main/adopters.json5), [demo main.ts](https://github.com/ethereum/anon-rpc/blob/main/impl/site/src/demo/main.ts)
- The bench cannot measure a specifier on a non-mainnet chain without the proposed `--extra-arms` and `bootstrapRpc`. [issue #9](https://github.com/ethereum/anon-rpc/issues/9)
- The KPS demo already includes a Go server with an `eth-rpc` handler serving a browser block explorer over KPS, with no domain or CA. [kps chat demo](https://github.com/ethereum/kps/tree/main/demos/chat)

### Inferences
- **Works today.** A Whitechain dapp can point viem `http("https://rpc.testnet.whitechain.io", { fetchFn: worker.fetch })` at tor-js or Nym with no Whitechain-side changes. tor-js and Nox do TLS inside the worker, so CORS is irrelevant for them. CORS `*` also makes passthrough work.
- **Rate-limit risk.** 50 rps per IP is per exit. A Tor exit or Nym IPR aggregates many users, so a popular exit could hit 429s. Cloudflare may also challenge Tor exits. I could not test this (see Gaps). Mitigations: a Whitechain-run onion service or KPS-native RPC endpoint (no exit IP, so no shared-exit limit), an allowlist for known exit ranges, or anonymous rate-limit tokens (Privacy Pass style) instead of per-IP limits.
- **Specifier on Whitechain.** Possible (about 1.1M gas for the reference contract). It gives little privacy benefit and costs a non-mainnet bootstrap read. Its real use is a Whitechain-governed worker (for example a Whitechain-specific passthrough plus onion endpoint config).
- **Best Whitechain-flavoured builds:**
  1. "Whitechain private explorer or portfolio" with all reads through tor-js or Nym and a rate-limit-aware request coalescer (Low to Medium).
  2. A Whitechain RPC served over KPS and/or as a Tor onion service, plus a worker config pointing at it (Medium). This closes both exit blocking and the shared 50 rps budget.
  3. A health dashboard row per chain (mainnet, Sepolia, Whitechain testnet) showing exit acceptance.

### Gaps
- Not verified: whether Whitechain's Cloudflare front blocks or challenges Tor, Nym or Nox exit IPs. My live Tor test was blocked by the local permission policy. Test this before the event with the demo page set to the tor-js worker and the Whitechain URL.
- Not verified: Whitechain mainnet chain ID and RPC limits.

## Q10. Inventory of hackathon-buildable prototypes (36 h, 2 to 3 people)

### Takeaway
The strongest balance of novelty, depth and finishability:
1. Verified plus anonymized reads (Colibri `fetch` or Lodestar prover over anon-rpc) inside a real app.
2. A leak detector that measures the judged "share of traffic through Anon-RPC".
3. A public multi-network health dashboard including Sepolia and Whitechain arms.
4. An OHTTP worker.
5. A local JSON-RPC proxy harness (Deno, Electron or Node) so any wallet gets anonymized reads.

Already done, so avoid pitching these as new: a basic opt-in Tor toggle (Privacy Pools, Kiwi), an EIP-1193 wrapper (Kohaku), viem `fetchFn` wiring (Privacy Pools), a balance watcher and MV3 demo (official demo), a threat map (andyguzmaneth), an RN harness (0xbow, private).

### Cited Findings
- Existing prior art: [Privacy Pools](https://github.com/0xbow-io/privacy-pools-website-v2/blob/HEAD/services/tor-fetch.ts), [Kiwi News](https://github.com/attestate/kiwistand/blob/HEAD/src/web/src/anon-transport.mjs), [Kohaku anon provider](https://github.com/ethereum/kohaku/blob/HEAD/packages/provider/src/anon/index.ts), [official demo](https://ethereum.github.io/anon-rpc/demo/), [demo extension](https://github.com/ethereum/anon-rpc/tree/main/impl/demo-extension), [dev-only bench](https://github.com/ethereum/anon-rpc/pull/4), [Nox demo app](https://github.com/hisoka-io/nox-demo), [threat map](https://github.com/andyguzmaneth/anon-rpc-threat-map), [Nym PoC](https://github.com/voltrevo/poc-nym-anon-rpc), [ZKNet native demo](https://github.com/zknet-labs/zknet-anon-rpc-demo)

### Inferences
Difficulty: **L** = core works in under 12 h; **M** = 12 to 24 h; **H** = risky to finish. Novelty: **Open** = no prior art found; **Partial** = pieces exist; **Done** = already exists.

**A. Apps that route reads by default (the core prize shape)**
1. **Verified private portfolio.** viem multicall3 reads through tor-js or Nym, verified with Colibri (`fetch: worker.fetch`). Price API also routed via `worker.fetch`. A "privacy ledger" lists excluded calls. Difficulty M. Novelty Open (composition).
2. **Private airdrop or allowlist eligibility checker.** Checking eligibility normally leaks address plus IP. All reads go via anon-rpc, with a Merkle proof verified locally. Difficulty L. Novelty Open.
3. **Private approvals and revoke checker** (revoke.cash-style). `eth_getLogs` and `allowance` reads via anon-rpc. Difficulty L to M. Novelty Partial.
4. **Private ENS or name lookup and contact book.** Difficulty L. Novelty Partial.
5. **Anon block explorer.** An Otterscan fork with an ethers getUrl hook (needs an `ots_` node), or a minimal explorer on standard RPC. Difficulty M. Novelty Partial (the KPS demo has a basic explorer).
6. **Scaffold-ETH 2 "anon-rpc by default" extension**, plus one demo dapp. Difficulty L to M. Novelty Open.
7. **Fork of a viem dapp** (swap or lending UI) with all RPC and non-RPC fetches through the worker, and a traffic-share meter. Difficulty M. Novelty Partial.
8. **Whitechain private explorer or portfolio** with a rate-limit-aware coalescer (Q9). Difficulty L to M. Novelty Open.

**B. Privacy-hardening layers (judge "technical depth")**
9. **Timing-safe tx watcher.** Per-block background receipt and nonce queries that run whether or not a tx is pending, defeating TRAP's receipt-poll signal. Listed as "proposed" in the threat map. Difficulty M. Novelty Open.
10. **Request shaping.** Pad to size buckets, coalesce bursts, constant-rate polling, plus a traffic visualizer. Difficulty M. Novelty Open (Nox pads requests only).
11. **isolationKey policy library.** One key per account and per tx-plus-receipt, following the measured guidance in issue #10. Demo with an exit-IP readout. Needs the tor-js PR #20 build and harness main. Difficulty M. Novelty Partial.
12. **Fail-closed network router.** Choose among specifiers with ordered fallbacks, never fall back to direct, and show user-visible state. Difficulty L. Novelty Partial (Privacy Pools does fail-closed for one network).

**C. Verification**
13. **Colibri plus anon-rpc provider package** (EIP-1193). Difficulty L to M. Novelty Open.
14. **Lodestar prover wrapping an anon EIP-1193 provider**, with beacon calls also routed if patchable. Difficulty M. Novelty Open.
15. **Helios with injectable fetch** (Rust/WASM patch, upstream PR). Difficulty H. Novelty Open.
16. **Verified specifier bootstrap.** `eth_getProof` on the `workerHash` slot plus a light-client header, removing trust in the one bootstrap read. Difficulty M. Novelty Open.
17. **Cross-network response quorum** (Tor vs Nym vs two providers). Difficulty L to M. Novelty Partial (Nox does this internally for its registry).

**D. Tooling and infrastructure**
18. **Leak detector / egress auditor.** DevTools extension or in-page shim on fetch, XHR, WebSocket and EventSource. Classifies anon vs direct requests and outputs the judged traffic-share percentage. Difficulty M. Novelty Open (Privacy Pools has an in-app allowlist only). Fits Anon-RPC or CROPS.
19. **Public network health dashboard and playground.** All adopters workers plus Sepolia and Whitechain arms, an exit-acceptance matrix per RPC provider, resolver liveness, owner type, and history. Difficulty M. Novelty Partial (dev-only bench exists).
20. **Specifier scanner and watchdog.** Reads hash, resolvers, owner and code type, verifies every resolver, replays `WorkerUpdated` history, links to the reproducible build, sends alerts. Difficulty L to M. Novelty Open.
21. **Governed specifiers.** A timelocked specifier, a Safe-owned one, a "user opts into version N" registry, and harness-side support for honouring a delay. Difficulty L (contracts) to M (with harness). Novelty Open (Nox has immutable-per-release only).
22. **Gateway operator kit.** Dockerized tor-js-gateway, KPS byte counters and Prometheus metrics, a one-click deploy, and an on-chain gateway directory with liveness attestations. Difficulty M. Novelty Open.
23. **tor-js snapshot mirror** (PR #21 `config.bootstrap`) as a drop-in service plus harness helper. Difficulty L. Novelty Partial.
24. **Guard-style gateway selection** for tor-js (issue #9). Difficulty M (Rust/TS). Novelty Open.
25. **Harness conformance test suite** runnable against any harness (official, 0xbow, a new one). Difficulty M. Novelty Open.

**E. New workers**
26. **OHTTP worker** (HPKE via `ohttp-ts`, self-run gateway in front of an Ethereum RPC, disclosed relay trust). Difficulty M. Novelty Open.
27. **proxy-js / BYO SOCKS worker** (issue #10 design). Difficulty M to H. Novelty Partial (proposed by others).
28. **Toy PIR worker** (2-server XOR PIR over a balance snapshot, Tor for everything else). Difficulty H. Novelty Open.
29. **Onion-RPC config pack.** tor-js to a `.onion` RPC (no exit, no exit blocking), self-hosted node as an onion service. Difficulty L to M. Novelty Partial (the threat map says it "Works in the demo against one provider's onion endpoint").
30. **Katzenpost or ZKNet worker over KPS.** Difficulty H. Novelty Open.

**F. New harnesses and platforms**
31. **Local JSON-RPC proxy** (`127.0.0.1:8545`) on Deno or Electron, so MetaMask custom networks, Foundry and cast all go anonymized. Difficulty M. Novelty Open.
32. **Deno harness** (sandboxed Worker permissions, host-side KPS via quic-client, file storage). Difficulty M to H. Novelty Open.
33. **Finish the Node harness** (KPS bridge plus storage plus WASM in the isolate). Difficulty H. Novelty Open.
34. **Electron or Tauri harness** plus a Frame-style desktop demo. Difficulty L (Electron) or M (Tauri). Novelty Open.
35. **React Native WebView harness** running unmodified WASM workers (Nym, Nox, tor-js) on mobile. Difficulty M. Novelty Partial (0xbow native exists but has no WASM workers).
36. **"Anon reads for any dapp" MV3 extension** wrapping `window.ethereum` and EIP-6963 read methods. Difficulty M. Novelty Open.
37. **Subscriptions call kind prototype.** A spec-extension proposal plus harness and worker support for WebSocket or `eth_subscribe`. Difficulty H. Novelty Open.

**G. Economic and abuse layer**
38. **Anonymous paid RPC credits.** Unlinkable tokens (Privacy Pass style) redeemed per request through the worker, replacing per-IP rate limits that punish shared exits (Whitechain's 50 rps per IP is the concrete example). Difficulty H. Novelty Open (a design was sketched in [clawd-research](https://github.com/clawdbotatg/clawd-research/tree/HEAD/anon-rpc)).

Suggested top picks:
- (1) plus (13) for an app.
- (18) for CROPS or traffic share.
- (19) plus (20) for tooling.
- (26) for a new network.
- (31) for a new harness.
- (8) or Q9 item 2 for a Whitechain angle.

### Gaps
- Difficulty estimates are my judgement and were not validated by builds.
- Latency at a Mumbai venue (WebRTC egress, gateway distance) is unknown. Run your own gateway near the venue or rely on Nym.
