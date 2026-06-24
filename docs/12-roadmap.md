# 12 — Implementation Roadmap

Phased so a professional team can execute incrementally, shipping a viral-capable MVP first,
then hardening monetization and scale.

## Phase 0 — Foundations (Week 0–1)
- Repo/monorepo setup (`apps/web`, `apps/api`, `packages/contracts`), CI/CD, envs (dev/staging/prod).
- Cloudflare + domain, Vercel project, API container infra, Postgres + Redis provisioned.
- Auth.js (email + Google), base schema migrations, seed factions + packs.
- Analytics (PostHog) + Sentry + OpenTelemetry skeleton.
- **Legal review kicked off in parallel** (gambling/consumer/privacy) — blocks paid launch.

## Phase 1 — MVP: the viral loop (Week 2–5)
Goal: a shareable, live, anonymous-votable balloon with referral attribution. **No payments yet.**

Must-have:
- `<Balloon />` with 3 states + transitions + particles (respect reduced-motion).
- Anonymous identity + 1 free vote/day (idempotent, Redis counter + Postgres durable write via queue).
- `GET /stats/live` (edge-cached) + SSE live updates.
- Faction assignment + identity reveal + confetti.
- Referral codes, `/r/:code` attribution, qualify-on-first-vote, referral_stats.
- Personal share page `/u/[username]` + dynamic OG image.
- Supporter + faction leaderboards (Redis ZSET).
- Basic anti-abuse: edge WAF, rate limits, fingerprint capture, daily-allowance enforcement, dual counter.
- Core analytics funnels (land→vote→share→referred-vote).

Exit criteria: K-factor measurable, balloon stable under synthetic spike, fraud baseline in place.

## Phase 2 — Monetization + hardening (Week 6–9)
Goal: turn on revenue + deepen retention. **Gated on legal sign-off + 18+ + disclosure.**

- Stripe integration via `PaymentProvider` port: packs, checkout, webhooks, wallet ledger, purchase history.
- Paid votes spend from wallet (atomic with vote write); disclosure copy everywhere.
- Payment fraud: Radar, 3DS, velocity caps, manual-hold review.
- Gamification: achievements rules engine, badges, streaks, progress bars.
- Async deep fraud scoring (velocity, IP cluster, fingerprint reuse, referral-ring detection) + quarantine + admin review queue + shadowban.
- Account upgrade (anon→registered) polish; notifications ("your side is losing", streak reminders).
- Pricing/localization experiments; reconciliation + finance exports.
- Pen test + bug bounty; load test to spike targets.

## Phase 3 — Scale + platform expansion (Week 10+)
- Scale-out: SSE sharding, queue→Kafka/SQS, partition maintenance, read replicas, PgBouncer tuning.
- Subscriptions ("GOAT Club"), seasonal faction-war events, double-points weekends to re-trigger virality.
- Regional PSPs (PayPal, Mercado Pago), multi-currency, tax automation.
- **Platform generalization:** multi-debate engine (any rivalry) — topic-scoped sharding; user-created debates (moderated).
- ML-based fraud scoring with labeled feedback loop; transparency "verified votes" dashboard.
- Native PWA/app polish, push notifications, deeper social integrations.

---

## Team & sequencing (suggested)
- 2 backend (votes/wallet/fraud/payments), 2 frontend (balloon/share/leaderboards/store), 1 platform/infra, 1 design, fractional legal + data analyst.
- Critical path: balloon + vote counter + referral attribution (Phase 1) → payments + fraud (Phase 2).

## Definition of Done per feature
- Tests (unit + integration on money/fraud paths), analytics events wired, feature-flagged,
  observability dashboards, docs updated, security review for anything touching auth/payments/PII.

## Top risks to manage actively
1. Legal classification (block paid launch until cleared).
2. Counter credibility (fraud defense must ship with Phase 1, deepen in Phase 2).
3. Virality decay after initial spike → Phase 3 events/seasons planned early.
4. Spike resilience → load test before any marketing push.
