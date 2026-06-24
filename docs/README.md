# GOAT VOTE — Planning Package

Viral social voting platform: **"Who is the true football GOAT — Messi or Ronaldo?"**

This `docs/` folder is the complete PRD + technical architecture + database design + roadmap that an
engineering team can execute. **No application code yet — planning only**, as requested.

## Read in this order

| # | Doc | What's inside |
|---|---|---|
| 00 | [PRD](00-PRD.md) | Vision, goals, legal/trust positioning, features, metrics, risks |
| 01 | [Architecture](01-architecture.md) | Stack, system diagram, vote write/read paths, services |
| — | [Journey diagrams](journey-diagrams.md) | Visitor, returning, purchase, anti-fraud flows |
| 02 | [Database schema & ERD](02-database-schema.md) | ERD, DDL, Redis counters, anon→registered merge |
| 03 | [API spec](03-api-spec.md) | REST + SSE endpoints, rate limits, validation |
| 04 | [Frontend](04-frontend.md) | Routes, components, balloon state machine, rendering |
| 05 | [Referral architecture](05-referral.md) | Codes, attribution, points, ranking |
| 06 | [Payments](06-payments.md) | PSP abstraction, lifecycle, wallet ledger, compliance |
| 07 | [Anti-fraud](07-anti-fraud.md) | Threat model, layered defense, dual counter |
| 08 | [Gamification](08-gamification.md) | Achievements engine, badges, streaks |
| 09 | [Scaling](09-scaling.md) | 1M+ users, spike resilience |
| 10 | [Monetization](10-monetization.md) | Pack economics, funnel, revenue model |
| 11 | [Security](11-security.md) | Auth, payments, privacy, compliance checklist |
| 12 | [Roadmap](12-roadmap.md) | MVP + Phase 2/3 plan |
| 13 | [Viral Growth PRD](13-viral-growth-prd.md) | K-factor strategy, 24 viral loops, product redesign around virality |
| 14 | [Visual Design Spec](14-visual-design-spec.md) | 15 screen wireframes, balloon/scoreboard/share/notif assets, full design system |

## Headline decisions
- **Anonymous voting allowed before signup** — virality depends on zero-friction first vote.
- **Fast-accept / async-persist vote path** — Redis counters + durable queue survive viral spikes.
- **Dual counter (raw vs public)** — fraud is removed from the number people see; the public total is real.
- **Wallet = append-only ledger**, credited only on verified payment webhooks (idempotent).
- **Paid votes disclosed as entertainment, included in the public total** — non-negotiable copy.
- **Legal review blocks paid launch** (gambling classification, consumer protection, fingerprint consent).

## Mermaid diagrams
Render on GitHub automatically, or in VS Code with the "Markdown Preview Mermaid Support" extension.
