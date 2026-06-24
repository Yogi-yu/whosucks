# 04 — Frontend Page Structure

Next.js 14 App Router · TypeScript · Tailwind · Framer Motion.

## 1. Routes

```
app/
  (marketing)/
    page.tsx                 # "/" HOME — balloon hero + live stats + vote CTA
  r/[code]/page.tsx          # referral landing → sets attribution cookie → redirects to /
  vote/page.tsx              # focused vote screen (also inline on home)
  me/page.tsx                # my dashboard: faction, referral stats, badges, wallet
  u/[username]/page.tsx      # PUBLIC share page (SSR + dynamic OG) "X supports MESSI GOAT"
  leaderboard/
    page.tsx                 # tabs: Supporters | Factions
  store/page.tsx             # vote packs + checkout
  wallet/page.tsx            # balance + purchase history
  achievements/page.tsx      # badge gallery + progress
  legal/{terms,privacy,refunds}/page.tsx
  api/og/route.tsx           # dynamic OG image generation (share cards)
```

## 2. Key components

| Component | Responsibility |
|---|---|
| `<Balloon />` | The hero. Framer Motion float/bob, particle layer, morphs text between `MESSI GOAT` / `RONALDO GOAT` / `GOAT BATTLE IS TIED`, color theme per leader |
| `<LiveStats />` | Total votes (animated count-up), % bars, subscribes to SSE `/stream/live` |
| `<VoteButtons />` | Messi / Ronaldo CTAs, optimistic update, allowance + out-of-votes handling |
| `<IdentityReveal />` | Post-vote "You're a {Faction} Supporter" moment + confetti |
| `<ShareSheet />` | Native share API, copy link, prefilled social text, share-card preview |
| `<ReferralCard />` | invited / votes generated / rank; "invite 3 to climb" nudge |
| `<Leaderboard />` | virtualized list, my-rank pin |
| `<PackGrid />` + `<CheckoutModal />` | packs, Stripe Elements, disclosure copy |
| `<BadgeShelf />` | earned + locked badges with progress |
| `<DisclosureBanner />` | persistent paid-votes disclosure |

## 3. Balloon state machine

```
states: messiLead | ronaldoLead | tied | loading
transition on /stream/live tick:
  if |diff%| < 1  -> tied        (neutral gold theme, "GOAT BATTLE IS TIED")
  elif messi>ron  -> messiLead   (theme A, "MESSI GOAT")
  else            -> ronaldoLead (theme B, "RONALDO GOAT")
animations: layout text morph (AnimatePresence), color crossfade 600ms,
            idle bob (y: ±8px, 3s loop), particle burst on lead-change
reduced-motion: respect prefers-reduced-motion → static balloon, no particles
```

## 4. Rendering strategy

| Page | Strategy | Why |
|---|---|---|
| `/` home | SSR shell + client-hydrated live data | fast paint, SEO, live counter via SSE |
| `/u/[username]` | SSR + cached, dynamic OG image | shareability, social unfurls |
| `/r/[code]` | edge middleware → set cookie → redirect | instant attribution, no flash |
| `/leaderboard` | ISR (revalidate 30–60s) | cheap, fresh-enough |
| `/store`, `/wallet`, `/me` | client + auth | personalized, dynamic |

## 5. State & data
- Server state via React Query (TanStack) with the API; SSE for live counters.
- Optimistic vote: bump local counter immediately, reconcile on server response.
- Shared types/validation from `packages/contracts` (zod) — no drift with backend.
- Analytics events fired at each funnel step (land, vote, share_click, share_success, signup, checkout_start, purchase).

## 6. Share card (OG image)
`/api/og?u=:userId` renders faction-themed card: avatar, `"{username} supports MESSI GOAT"`,
invited count, votes generated, rank. Used as `og:image` on `/u/[username]`. This is the single
most important growth surface — invest in making it screenshot-worthy.
