# WHO IS GOAT? — Messi vs Ronaldo

A pure **viral social conflict** prototype. One question, one decision, one share.
Not a data product. Not analytics. Not stats. Just: **pick a side.**

> Self-contained. No backend · no database · no auth · no menus · no dashboards.
> Mock data + `localStorage` only.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Run
```bash
npm install
npm run dev
```
Open **<http://localhost:3001>**.

## The 3 pages (that's the whole app)
| Route | Job | Viral principle |
|---|---|---|
| `/` | **WHO IS GOAT?** + Messi / Ronaldo buttons + live score & tension bar | Instant understanding (≤2s) |
| `/vote` | Full-screen split duel — tap a side → glow + shake + color flash | Emotional polarity (choose) |
| `/success` | "YOU JOINED MESSI ARMY" + soldier rank + confetti + live score → **CHALLENGE A FRIEND** | Identity shift + share pressure |

## Behavior
- **Identity (localStorage):** chosen `side` + `soldier rank`, persisted across reloads (`goat-battle:identity`).
- **Live simulation:** the global score shifts every ~2.5s — feels like a live war.
- **Challenge a Friend:** uses the native share sheet (`navigator.share`) where available, else copies a link to the clipboard.

## Visual style
Dark stadium background · Messi = blue/white glow · Ronaldo = red/gold glow · high-contrast neon · game-like.

## Structure
```
src/
  app/
    layout.tsx        # AppProvider, no chrome
    template.tsx      # Framer Motion page transitions
    page.tsx          # 1. Landing
    vote/page.tsx     # 2. Vote
    success/page.tsx  # 3. Success
  components/
    Confetti.tsx
  lib/
    AppContext.tsx    # live score sim + identity (side + rank)
    mockData.ts  types.ts  format.ts
  styles/globals.css
```
