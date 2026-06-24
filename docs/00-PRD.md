# GOAT VOTE — Product Requirements Document (PRD)

> Codename: **GOAT VOTE** · Working domain: `goatvote.com`
> Status: Draft v1.0 · Owner: Product · Last updated: 2026-06-24

---

## 1. Summary

GOAT VOTE is a viral, share-driven voting platform built around a single, endlessly
debatable question: **"Who is the true football GOAT — Messi or Ronaldo?"**

The product is intentionally *not* a neutral poll. It is a **social movement engine**:
every visitor is converted into a *supporter* of a faction, given a personal share page,
a referral link, a rank, and badges — then nudged to recruit friends and (optionally) buy
extra votes to push their side ahead.

The hero artifact is an **animated floating balloon** that always displays the *current
global leader* (`MESSI GOAT` / `RONALDO GOAT` / `GOAT BATTLE IS TIED`). The balloon is the
thing people screenshot and share.

### One-line positioning
> "It's not a poll. It's a war. Pick your GOAT and recruit your army."

---

## 2. Goals & Non-Goals

### Primary goals
1. **Virality** — maximize K-factor (invites per user × conversion per invite). Target K > 1 during launch spikes.
2. **Engagement** — daily voting habit (free daily vote = built-in retention hook).
3. **Repeat visits** — leaderboards, faction momentum, streaks bring people back.
4. **Monetization** — paid vote packs as the primary revenue line; clearly disclosed as entertainment.

### Secondary goals
- Build a reusable "viral debate" platform that can be re-skinned for other rivalries (see Phase 3).
- Capture first-party data (acquisition source, referral graph) for growth analytics.

### Non-goals (v1)
- Not a sportsbook / gambling product. Votes are entertainment, **not** wagers with cash payout.
- Not a general-purpose polling tool (multi-topic) in MVP.
- No native mobile apps in MVP (responsive PWA only).
- No user-generated debates in MVP.

---

## 3. Legal, Ethical & Trust Positioning (read first)

Paid voting is the monetization core, so trust and disclosure are **product requirements**, not afterthoughts.

| Concern | Decision |
|---|---|
| Is this gambling? | **No.** There is no cash/prize payout based on outcome. Votes influence a public counter only. This keeps it out of most gambling regulation, but **confirm per-jurisdiction with counsel** before launch (esp. US states, DE, etc.). |
| Disclosure | Persistent, unmissable copy: *"Paid votes are part of the entertainment experience and are included in the public total."* Shown on the vote screen, the purchase screen, and the footer. |
| Refunds | Digital-goods (vote credits) policy with a clear "credits are consumable, generally non-refundable once cast" term + statutory exceptions (EU 14-day right of withdrawal handling for digital content). |
| Minors | Payments gated to 18+. Age affirmation at checkout. No targeted ads to minors. |
| Honesty of counter | The public total is **real** (free + paid votes combined). We never fabricate the count. Anti-fraud removes fake votes from the public total. |
| Data privacy | GDPR/CCPA compliant. Device fingerprinting disclosed in privacy policy; lawful basis = legitimate interest (fraud prevention) + consent for analytics. |

> ⚠️ **Action item for the team:** a 1-page legal review covering (a) gambling classification, (b) consumer protection / refunds, (c) right-to-withdraw for digital goods, (d) fingerprinting consent. Block launch on this.

---

## 4. Target Users & Personas

| Persona | Motivation | Key feature |
|---|---|---|
| **The Partisan** ("Messi is simply better") | Tribal loyalty, wants their side to win | Voting, faction identity, paid packs |
| **The Recruiter** | Status & competition; wants top of leaderboard | Referral system, supporter leaderboard, badges |
| **The Casual** | Saw a friend's screenshot, curious | Frictionless vote, instant result, low-commitment |
| **The Whale** | Wants to single-handedly swing the count | Legend Pack, big purchases, ambassador status |

---

## 5. Core User Flow (canonical)

```
Land (referral / social / direct)
  → See balloon + live leader + total + % split
  → Vote (Messi | Ronaldo)            ← conversion event #1
  → Instant updated result + confetti
  → "You're now a {Faction} Supporter" identity reveal
  → Get personal share page + referral link   ← viral loop start
  → Prompts: Share to 3 friends | Buy votes to push your side
  → Optional: sign up to save progress / claim rank   ← account conversion
  → Return next day for free daily vote   ← retention loop
```

See `docs/journey-diagrams.md` for full diagrams.

---

## 6. Feature Requirements

### 6.1 Visitor Arrival
- Live balloon with current global leader.
- Total vote count (formatted: `1,247,822`).
- Percentage split (`Messi 58.2% / Ronaldo 41.8%`).
- Loads fast; **anonymous voting allowed** (no signup wall before first vote — critical for virality).
- Referral code in URL (`/r/ABC123`) attributed before any action.

### 6.2 Voting
- Anonymous users: **1 free vote / 24h**, tracked by device fingerprint + cookie + IP heuristics.
- Registered users: 1 free vote / 24h + any purchased credits.
- After vote: confirmation, updated % and total (optimistic UI + server reconciliation).
- Vote is idempotent within the daily window (can't double-spend the free vote).

### 6.3 Referral System
- Each user (incl. lightweight anon identity) gets a unique short code → `/r/{code}`.
- On arrival via code: store referral edge (referrer → visitor) once visitor performs a qualifying action (a vote — to prevent empty-click farming).
- Referrer earns **referral points** + their "referral vote count" increments.
- Personal referral page: invited count, votes generated, current rank.
- Referral leaderboard (global + per-faction).

### 6.4 Viral Identity Layer
- After voting, user is assigned a **faction** (Messi / Ronaldo Supporter).
- Auto-generated **share page**: `"{Username} supports MESSI GOAT"` with:
  - people invited, votes generated, personal ranking, badges.
  - Rich OpenGraph/Twitter card image (dynamic OG image with their faction + stats).
- Designed for competition: "You're #4,201 of Messi supporters. Invite 3 to crack top 4,000."

### 6.5 Balloon System
| Condition | Display |
|---|---|
| Messi > Ronaldo (diff ≥ 1%) | `MESSI GOAT` |
| Ronaldo > Messi (diff ≥ 1%) | `RONALDO GOAT` |
| `|diff| < 1%` | `GOAT BATTLE IS TIED` |

- Smooth animated transitions between states (color, text morph).
- Particle effects + subtle idle motion (float/bob).
- Updates in near-real-time (polling/SSE; see architecture).

### 6.6 Paid Voting
- Free: 1 vote/day. Paid: vote packs.

| Pack | Votes | Indicative price (USD) |
|---|---|---|
| Starter | 5 | $1.99 |
| Supporter | 25 | $6.99 |
| Legend | 100 | $19.99 |

- Vote credit **wallet** per user, purchase **history**, fraud checks.
- Disclosure copy mandatory (see §3).
- Credits never expire in v1 (revisit for revenue/liability later).

### 6.7 Anti-Abuse
- Device fingerprinting, rate limiting, IP monitoring, anomaly detection.
- Two counters: **public total** (cleaned) vs **raw total** (internal). Suspicious votes quarantined, excluded from public total.
- See `docs/07-anti-fraud.md`.

### 6.8 Leaderboards
- **Supporter leaderboard** (top referrers): invited, votes generated, conversions.
- **Faction leaderboard**: Messi vs Ronaldo on supporters, votes, growth rate, referral efficiency.

### 6.9 Gamification
- Achievements: First Vote, 10 Friends Invited, 100 Votes Generated, GOAT Ambassador, Legend Supporter, streaks, etc.
- Badges + progression bars on the share page.
- See `docs/08-gamification.md`.

---

## 7. Success Metrics (North Star + supporting)

- **North Star:** Net new *attributed* votes per day (votes that arrived via a referral edge).
- Virality: K-factor, invite rate, invite→vote conversion.
- Engagement: DAU/MAU, daily-vote return rate, D1/D7 retention.
- Monetization: payer conversion %, ARPPU, ARPU, pack mix.
- Funnel: land→vote, vote→share, share→referred-vote, vote→signup, vote→purchase.
- Quality: % votes flagged fraudulent, dispute/refund rate.

Targets (launch quarter, indicative):
- land→vote ≥ 45% · vote→share ≥ 25% · K ≈ 0.7–1.2 at peaks · payer conversion 1–3%.

---

## 8. Constraints & Assumptions

- Global, English-first; i18n-ready architecture (copy externalized).
- Mobile-first (most viral traffic is mobile social).
- Must survive viral spikes (10–100× baseline within minutes) → caching + queue-based write path.
- Stripe primary; pluggable PSP interface for regional providers (PayPal, Mercado Pago for LATAM — relevant to a Messi/Ronaldo audience).

---

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Gambling/consumer-law classification | Legal shutdown | Counsel review pre-launch; framing as entertainment; no payouts |
| Vote fraud destroys credibility | Trust collapse | Dual-counter, fingerprint, anomaly detection, public "votes verified" badge |
| Pay-to-win backlash ("rich side wins") | PR / churn | Transparency; show free-vote split separately; cap implied by disclosure |
| Viral spike overwhelms write path | Outage at worst time | Redis counters + async durable write queue; read from cache |
| One-topic novelty fatigue | Decay after spike | Phase 3 multi-debate platform; seasonal events; daily streaks |
| Chargebacks / payment fraud | Revenue loss | Stripe Radar, velocity limits, 3DS, risk scoring |

---

## 10. Deliverable Index

| # | Deliverable | Document |
|---|---|---|
| 1 | Product architecture | `docs/01-architecture.md` |
| 2 | User journey diagrams | `docs/journey-diagrams.md` |
| 3 | Database schema | `docs/02-database-schema.md` |
| 4 | ERD | `docs/02-database-schema.md` (Mermaid ERD) |
| 5 | Backend API spec | `docs/03-api-spec.md` |
| 6 | Frontend page structure | `docs/04-frontend.md` |
| 7 | Referral tracking | `docs/05-referral.md` |
| 8 | Payment architecture | `docs/06-payments.md` |
| 9 | Anti-fraud architecture | `docs/07-anti-fraud.md` |
| 10 | Gamification architecture | `docs/08-gamification.md` |
| 11 | Scaling strategy (1M+) | `docs/09-scaling.md` |
| 12 | Monetization analysis | `docs/10-monetization.md` |
| 13 | Security recommendations | `docs/11-security.md` |
| 14–15 | MVP + Phase 2/3 roadmap | `docs/12-roadmap.md` |
