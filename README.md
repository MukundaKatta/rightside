# RightSide

AI legal copilot for landlords, tenants, freelancers, and small claims. Cheaper than a lawyer. Faster than Google.

**Status:** v0 skeleton — landing page + mocked legal Q&A route. Full AI not yet wired.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 legal Q&A — paste a landlord/tenant question, get a plain-English answer from 5 hardcoded scenarios |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "rightside"` |

## What's next

- Wire real AI (legal analysis + letter drafting) behind `/try`
- Multi-jurisdiction support
- Auth + per-user case tracking
