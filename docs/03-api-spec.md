# 03 — Backend API Specification

Base URL: `https://api.goatvote.com/v1`. JSON over HTTPS. Auth via session cookie (web) or Bearer JWT.
Anonymous identity carried by a signed `gv_anon` cookie (httpOnly) + device fingerprint header.

Common headers:
- `Idempotency-Key` (required on `POST /votes` and `POST /payments/checkout`)
- `X-Device-FP` (fingerprint token from client SDK)
- `X-Referral-Code` (optional, also accepted via cookie set on `/r/:code`)

Standard error envelope:
```json
{ "error": { "code": "RATE_LIMITED", "message": "...", "retryAfter": 12 } }
```

---

## Auth

| Method | Path | Body | Returns | Notes |
|---|---|---|---|---|
| POST | `/auth/anon` | `{ fingerprint }` | `{ userId, anonToken }` | bootstrap anonymous identity on first load |
| POST | `/auth/email/start` | `{ email }` | `202` | magic-link / OTP |
| POST | `/auth/email/verify` | `{ email, otp }` | `{ session }` | upgrades anon → registered |
| GET | `/auth/google` | — | redirect | OAuth |
| GET | `/auth/callback/:provider` | — | session | OAuth callback |
| POST | `/auth/logout` | — | `204` | |
| GET | `/me` | — | `{ user, faction, wallet, stats, badges }` | hydrate session |
| PATCH | `/me` | `{ username }` | `{ user }` | claim username (validated, unique) |

## Stats & Balloon

| Method | Path | Returns |
|---|---|---|
| GET | `/stats/live` | `{ messi, ronaldo, total, leader: "messi"|"ronaldo"|"tie", messiPct, ronaldoPct, diffPct }` (edge-cached 1–2s) |
| GET | `/stats/history?range=24h` | time series for charts |
| GET | `/stats/factions` | faction-level supporter counts, growth rate |
| GET | `/stream/live` | **SSE** stream of `{messi,ronaldo,total,leader}` deltas |

`leader` logic: `tie` when `|messiPct - ronaldoPct| < 1.0`, else the higher side. Drives balloon text.

## Voting

| Method | Path | Body | Returns | Errors |
|---|---|---|---|---|
| GET | `/votes/allowance` | — | `{ freeAvailable: bool, resetsAt, paidCredits }` | |
| POST | `/votes` | `{ side: "messi"|"ronaldo" }` + `Idempotency-Key` | `{ accepted, usedCredit: "free"|"paid", live: {...}, allowance: {...} }` | `409 ALREADY_VOTED_TODAY`, `402 NO_CREDITS`, `429 RATE_LIMITED`, `403 BLOCKED` |

Spend order: free daily vote first, then paid credits. Each vote: pre-fraud check → Redis INCR → enqueue durable write.

## Referrals

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/referrals/me` | — | `{ code, link, invited, qualified, votesGenerated, points, rank }` |
| POST | `/referrals/attribute` | `{ code }` | `{ attributed: bool }` (called when arriving via `/r/:code`; finalized on first vote) |
| GET | `/referrals/share-card.png?u=:id` | — | dynamic OG image (PNG) |

## Leaderboards

| Method | Path | Query | Returns |
|---|---|---|---|
| GET | `/leaderboards/referrers` | `?faction=&limit=&cursor=` | ranked referrers + my position |
| GET | `/leaderboards/factions` | — | `{ messi:{supporters,votes,growth,refEfficiency}, ronaldo:{...} }` |

## Wallet & Payments

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/wallet` | — | `{ balanceCredits, ledger: [...] }` |
| GET | `/packs` | — | `[{ id, key, name, credits, priceCents, currency }]` |
| POST | `/payments/checkout` | `{ packId, ageAffirmed: true }` + `Idempotency-Key` | `{ provider, clientSecret | redirectUrl, orderId }` |
| GET | `/orders` | — | purchase history |
| POST | `/payments/webhook/:provider` | (raw, signed) | `200` | verifies signature; credits wallet idempotently |

## Gamification

| Method | Path | Returns |
|---|---|---|
| GET | `/achievements` | catalog with my progress |
| GET | `/me/achievements` | earned badges + progress bars |

## Admin (internal, RBAC-guarded)

| Method | Path | Purpose |
|---|---|---|
| GET | `/admin/fraud/queue` | review quarantined votes/users |
| POST | `/admin/users/:id/ban` | ban / shadowban |
| POST | `/admin/flags/:flag` | toggle kill switches (purchases, anon-voting, counter-freeze) |
| GET | `/admin/reconcile/status` | Redis↔Postgres drift report |

---

## Rate limits (defaults; tune by anomaly data)

| Scope | Limit |
|---|---|
| `POST /votes` per user | 1 free/day + paid credits; max 30 actions/min burst |
| `POST /votes` per IP | 60/min, 600/hour (shared NAT tolerance) |
| `POST /payments/checkout` per user | 10/hour |
| `/auth/*` | 5/min per IP |
| anon bootstrap per fingerprint | 1/min |

## Validation
All payloads validated with shared zod schemas (`packages/contracts`). Reject unknown fields. Server is authoritative on totals, allowances, and pricing (never trust client amounts).
