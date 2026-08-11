# coupons

Protocol docs for **La Crypta coupons** — the Nostr framework to advertise a coupon manager, mint vouchers, and redeem them once.

Live implementation: [merchant.lacrypta.ar](https://merchant.lacrypta.ar)  
Canonical implementation repo: [`lacrypta/merchant`](https://github.com/lacrypta/merchant)

Intended host: `coupons.lacrypta.ar` (Vercel-friendly Next.js app).

## Stack

- [Fumadocs](https://www.fumadocs.dev) + Next.js App Router
- OpenAPI + Scalar playground against production Merchant
- La Crypta dark / lime branding (Standerd)

## Develop

```bash
nvm use   # Node 22.14+
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What |
|---|---|
| `npm run dev` | Local docs site |
| `npm run build` | Production build |
| `npm run start` | Serve the build |
| `npm run types:check` | TypeScript |

## Content map

| Path | Topic |
|---|---|
| `/` | Branded landing → Merchant CTA |
| `/docs` | Roles, why Postgres + Nostr |
| `/docs/protocol/*` | Discovery 30078, voucher 20402, auth, benefits |
| `/docs/flows` | Activate → mint → claim |
| `/docs/api` | OpenAPI + live playground |
| `/docs/guides/*` | POS checklist, practices |
| `/docs/examples` | Compact snippets |

Protocol narrative is rewritten from `merchant/docs/cupones*.md`. Merchant remains the implementation; this site is the public protocol surface.

## Deploy

Any Node 22 host that runs Next.js (Vercel recommended). Set the project root to this repo and build with `npm run build`.
