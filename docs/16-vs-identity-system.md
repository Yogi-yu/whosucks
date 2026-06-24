# VS CORE — Universal Versus Identity System

> A single visual identity that turns **any argument on the internet** into a live
> visual competition — without redesigning the UI per topic.
>
> The system depends ONLY on **contrast · energy polarity · competition framing**.
> It never depends on names, sports, logos, faces, or specific imagery.

**Golden rule:** design the *system*, never the *subject*. Left is always cold-blue
energy, right is always hot-red energy, the clash is always a central `VS`. The topic
is just two strings.

---

## 1. MASTER BRAND ASSET — "VS CORE IDENTITY"

**File:** [`public/logo.svg`](../public/logo.svg) → rasterized `public/logo.png` (512), `logo-1024/400`.

A single universal avatar/logo used everywhere — every domain, every matchup, every channel.

| Element | Spec |
|---|---|
| **Central symbol** | Dominant `VS` lockup, italic-skewed (−7°), heavy 900 weight. `V` = blue energy, `S` = red energy. |
| **Split energy** | Cold-blue field left, hot-red field right, meeting at a glowing white clash seam. |
| **Background** | Dark arena: radial `#1d2c47 → #0b1120 → #04060b`, twin floodlight beams. |
| **Aesthetic** | Neon glow (stacked Gaussian-blur halo) + crisp core layer for small-size legibility. |
| **Broadcast cues** | Concentric scoreboard rings + a single red "live" dot. |
| **Crop safety** | Composition centered inside the inscribed circle → safe for circular avatars (X/Discord). |

**Brand-safe by construction:** pure geometry + the letters `VS`. No faces, no athletes,
no copyrighted symbols, no real-world brand references. The mark is identical for Messi vs
Ronaldo and for Freedom vs Security — that is the point.

---

## 2. DESIGN SYSTEM RULES

### 2.1 Color system — semantic polarity, not subjects

Two energy poles + one neutral accent + an arena substrate + three alert states. Subject-named
tokens (`messi`/`ronaldo`) are kept as **aliases** for backwards-compat, but the system speaks
in **side-blue / side-red**.

| Semantic token | Hex | Role |
|---|---|---|
| `side-blue` (light/core/deep) | `#7FD0FF` / `#3AA0FF` / `#1146CF` | LEFT pole — cold energy |
| `side-red` (light/core/deep) | `#FF9B8F` / `#FF4F44` / `#C8121F` | RIGHT pole — hot energy |
| `accent` (gold) | `#F5C542` | neutral / live / "too close" / CTA |
| `arena` | `#04060B → #1D2C47` | dark stadium substrate (radial) |
| `alert` | `#E5343D` | final-hour red alert |

Rules: poles always carry **equal saturation and weight** — neither side is visually
favored. Gold is the only neutral; never use blue or red for chrome/neutral UI.

### 2.2 Layout rules — enforced symmetry

- **Mirror axis at 50% width.** Left content and right content are mirror images: same font
  size, same glow, same offset from center. The `VS` core sits exactly on the axis.
- **Z-order:** arena bg → floodlights → energy fields → status badge → side labels + VS core →
  time → score bar.
- **Safe lanes:** each side gets an equal lane (~30% width) for its label; labels fit by
  length-bucketed font size so long words ("SECURITY") and short ("TEA") stay balanced.
- **Never one-sided.** Any asymmetric emphasis (a leader pulse, a winning glow) must have a
  symmetric counterpart slot, even when empty.

### 2.3 Typography logic

| Use | Face | Treatment |
|---|---|---|
| Side labels / `VS` / scores | Heavy grotesque, **900**, UPPERCASE | the competition voice — loud, condensed, glow |
| Countdown / numbers | **Monospace, tabular-nums** | the system voice — stable, machine, "real-time engine" |
| Status / meta | Sans **700**, wide letter-spacing | the broadcast voice — calm chrome |

Numbers are always monospace tabular so live-changing values never reflow (no layout jitter).

### 2.4 Motion principles

- **Real-time feel:** scores tick on a shared clock; numbers cross-fade, they don't jump.
- **Momentum:** the side gaining this tick gets a brief glow pulse — always with a symmetric
  counterpart slot so the layout never lurches.
- **Urgency escalation (the core motion idea):**
  - `normal` → steady neutral glow, no motion.
  - `final 24h` → **gold pulsing** glow (≈1s breathe).
  - `final 1h` → **red alert** glow, faster pulse.
- Motion is *reserved for meaning* (momentum, urgency, closeness). Chrome never animates.

---

## 3. BATTLE UI TEMPLATE — the generic VS surface

Every battle — landing card, OG image, broadcast overlay, success screen — is the **same four
stacked layers**. The template is a pure function of a tiny prop contract; nothing topic-specific
is ever hard-coded.

```
battle = {
  left:  string,                 // "Messi" | "iPhone" | "Freedom"
  right: string,                 // "Ronaldo" | "Android" | "Security"
  status: string,                // "WEEK 7 · LIVE" | "FINAL DAY" | "FINAL HOUR"
  countdown: string,             // "2d 14h 09m"
  leftPct: number,               // 0..100  (rightPct = 100 - leftPct)
  urgency: "normal"|"final24"|"final1",
}
```

```
┌──────────────────────────────────────────────────────────┐
│                  (B) ● WEEK 7 · LIVE        status badge   │
│                                                            │
│   BLUE LABEL        ⟨ V S ⟩        RED LABEL   (A) conflict│
│   (left pole)     clash seam      (right pole)             │
│                                                            │
│                 TIME REMAINING                             │
│                  2d 14h 09m                  (C) time      │
│                                                            │
│  52% ───────────────●──────────── 48%        (D) score    │
│            ⚡ TOO CLOSE TO CALL (if |Δ|<5%)                │
└──────────────────────────────────────────────────────────┘
```

- **(A) Conflict layer** — blue field left / red field right, central `VS`, mirror-symmetric.
- **(B) Live status layer** — one of `LIVE` / `WEEK N` / `FINAL DAY` / `FINAL HOUR`; accent
  color follows `urgency`.
- **(C) Time layer** — monospace countdown; glow color follows `urgency` (neutral → gold → red).
- **(D) Score layer** — symmetric split bar with center marker; `<5%` margin triggers the gold
  "TOO CLOSE TO CALL" flag. Numbers tabular, never reflow.

Reference generator: `scratchpad/battlecard.js` builds this template from the prop contract.
In-app, the same four layers already exist as live React (landing/`Countdown`/`SocialProof`/score bar).

---

## 4. SCALABILITY EXAMPLES — one template, every domain

Rendered from the **identical** template — only the props change. Contact sheet:
[`public/identity/contact-sheet.png`](../public/identity/contact-sheet.png).

| Domain | left vs right | status | urgency | demonstrates |
|---|---|---|---|---|
| **Sports** | Messi vs Ronaldo | WEEK 7 · LIVE | normal | baseline live state, 52/48 closeness |
| **Tech** | iPhone vs Android | WEEK 7 · LIVE | normal | clear leader 61/39, longer labels balance |
| **Culture** | Coffee vs Tea | FINAL DAY | final24 | gold pulse urgency, short label ("TEA") |
| **Abstract** | Freedom vs Security | FINAL HOUR | final1 | red-alert state + 50/50 "too close to call" |

Individual renders: `public/identity/battle-{sports,tech,culture,abstract}.{svg,png}`.

**Proof of the extensibility rule:** "Freedom vs Security" — an abstract idea with no imagery,
no logo, no face — produces a complete, broadcast-grade competition surface with the same code
path as a sports rivalry. To launch a new battle you supply **two strings + a clock**; the
identity system supplies everything else.

---

## Non-goals honored
No per-matchup avatars, no real people/brands, no marketing copy, no product-logic changes —
this is purely the scalable visual identity layer.
