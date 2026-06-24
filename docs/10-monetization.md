# 10 — Monetization Analysis

## 1. Revenue lines

| Line | v1 | Description |
|---|---|---|
| **Vote packs** (primary) | ✅ | Starter / Supporter / Legend consumable credits |
| Subscriptions | Phase 2 | "GOAT Club": daily bonus votes, exclusive badge, ad-free, profile flair |
| Sponsorships / brand | Phase 2 | Sponsored faction events, branded skins ("Powered by …") |
| Ads | optional | Interstitial/banner on free tier; risk to UX & virality — gate behind experiments |
| Merch / affiliate | Phase 3 | Faction merch, affiliate football content |

## 2. Pack economics (indicative)

| Pack | Votes | Price | $/vote | Role |
|---|---|---|---|---|
| Starter | 5 | $1.99 | $0.398 | Low-friction entry / impulse |
| Supporter | 25 | $6.99 | $0.280 | Value anchor (most volume) |
| Legend | 100 | $19.99 | $0.200 | Whale tier / status |

- Decreasing $/vote rewards bigger packs → lifts AOV.
- Stripe fees ≈ 2.9% + $0.30 → the $1.99 pack nets ~$1.40 (fees hurt small packs; consider $2.99 floor or bundling).
- Gross margin is high (digital goods); main costs = payment fees + infra + fraud/refunds.

## 3. Funnel & key levers

```
Visitors → Voters (land→vote ~45%) → Sharers (~25%) → Registered → Payers (1–3%) → Repeat payers
```

| Lever | Impact |
|---|---|
| land→vote conversion | top of everything; keep anon voting frictionless |
| K-factor (virality) | free user acquisition; the whole growth engine |
| payer conversion % | revenue; driven by "push your side" urgency when losing |
| ARPPU | pack mix + repeat purchase; whales matter disproportionately |
| retention (daily vote) | more sessions = more purchase windows |

## 4. Revenue model (illustrative, monthly)
Assume 1,000,000 MAU, 2% payer conversion, $8 ARPPU:
- Payers = 20,000 → Gross ≈ **$160,000/mo**.
- Net after ~5% fees/refunds/chargebacks ≈ **$152k/mo**.
- Sensitivity: payer conv 1%→3% swings gross $80k→$240k. ARPPU is the other big dial (whales).

> These are planning illustrations, not forecasts — instrument the real funnel and iterate.

## 5. Psychological design (ethical guardrails)
- Drivers: tribal loyalty, competition (leaderboard), urgency ("your side is losing"), status (titles/badges).
- **Guardrails:** clear disclosure, no deceptive scarcity, no loot-box randomness, spend caps / cooldowns, easy refunds, 18+ gate, no targeting minors. Avoid dark patterns — they invite regulatory and reputational risk and kill long-term trust (which is the asset here).

## 6. Pricing experiments to run
- Price points & pack sizes (A/B), currency localization, limited-time "double impact" events,
  first-purchase discount, bundle with subscription, dynamic "your side is losing → boost now" offers.

## 7. Unit-economics watch list
- CAC ≈ near-zero if K stays high (viral) — protect virality above monetization friction early.
- LTV = ARPPU × repeat rate × payer lifetime. Track refund + chargeback rate (target < 1%); chargebacks above card-network thresholds risk Stripe account health.
- Infra cost/user should stay tiny given edge caching; watch fraud cost (fingerprinting vendor, manual review).
