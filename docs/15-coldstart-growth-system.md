# 15 — Cold-Start Growth System (GOAT Battle)

> Goal: validate **Share Rate, Invite Conversion, K-factor** with real users.
> Constraints: solo founder, ~$0–100, no contracted influencers, no ad scaling yet.
> Style: execution over theory. Speed over perfection.

---

## 0. TWO BLOCKERS — fix these first or the test is fake

**B1 — You cannot share `localhost:3001`.** Deploy to a public URL. Push to GitHub → import to
**Vercel** (free, 5 min, zero config for Next.js). Buy a cheap domain or use the `*.vercel.app` URL.
*Nothing below works until there is a clickable link.*

**B2 — Pure `localStorage` cannot measure K.** K is a *cross-user* metric (your invite → someone
else's vote, on a different device). You need attribution. Minimal, no real backend:
- Add **PostHog** (free tier, one script snippet) for events: `vote`, `share_click`, `challenge_click`, `landing_view`.
- Append a **referral code** to every share link: `...?ref=<soldierId>`. On landing, read `ref`,
  store it, and fire a `referred_arrival` event with that code. Now: invited arrivals are attributable,
  and **K = (shares per voter) × (votes per referred click)** is computable.

> Without B1+B2 you will get vibes, not K. With them, ~150 seed users gives a directional read.

---

## 1. DISTRIBUTION STRATEGY — exact channels for the first 100–300 users

**Core principle:** do **not** "post a link." Links get downranked and ignored. **Start an argument;
the link is the weapon to settle it.** The comment war *is* the funnel. Drop GOAT Battle where the
Messi/Ronaldo fight is *already happening*.

### A. Reddit (highest intent, strict rules — read each sub's rules first)
Best subs, in priority order:

| Subreddit | Why | How to post |
|---|---|---|
| r/Messi, r/cristiano | Dedicated, hyper-tribal, link-tolerant | Direct: "Live count — get your army in" + screenshot, link in post or first comment |
| r/Barca, r/realmadrid | Manufacture **inter-sub rivalry** | "r/realmadrid is beating us in the live GOAT vote, embarrassing 🔵" |
| r/soccer, r/football | Huge but **self-promo = instant ban** | Comment your link inside existing GOAT threads only; or a genuinely fun no-link post, link in comments |
| r/FIFA, r/EAFC | Gamers love debates | "Settled the GOAT debate with a live vote, current score is cooked" |
| r/WebGames, r/InternetIsBeautiful, r/playmygame, r/SideProject | "Cool web toy" angle | Frame as an interactive toy, not a poll |
| r/argentina, r/portugal | National pride | Use sparingly, on-topic risk |

- **Post style:** title = the provocation; image = screenshot of the live bar or the "MESSI ARMY #4,210" card; link in post (if allowed) or pinned first comment.
- **Mechanics that matter:** Reddit ranks on **early velocity** — reply to *every* comment in the first 60 min. Post 1×/sub/day max (more = spam ban). Post when the sub is awake (evenings local / match nights).
- **Why it shares:** Redditors argue GOAT compulsively; you hand them a *scoreboard to prove it*. Correction behavior + tribal defense.

### B. Twitter / X (the epicenter of Messi/Ronaldo war)
- **Don't post into the void — ride existing threads.** Quote-tweet / reply under big football accounts and trending GOAT tweets, *especially around events* (Champions League nights, El Clásico, Ballon d'Or, a big goal). That's when the tribe is hottest.
- **Two motions per day:**
  1. **Reply-dunk** (5–10/day): under a viral "X is the GOAT" tweet → "the live vote disagrees 👀 [link]".
  2. **Original** (1–2/day): screenshot of the close score → "It's 50.4 vs 49.6 right now. Your one vote flips the GOAT. Don't let [rival] win 👉 [link]".
- **Tags:** #Messi #Ronaldo #GOAT #MessivsRonaldo.
- **Why it shares:** X rewards conflict; the **quote-tweet dunk** is the native viral unit; fans screenshot scores to flex.

### C. TikTok / Reels (widest cold reach, comment-driven)
- **Format:** vertical, ≤15s, hook in the first 1 second, trending audio, captions baked (sound-off).
- **Best scripts:**
  - *"POV: you just found out which GOAT army you're in"* → screen-record vote → "MESSI ARMY" reveal → "comment your army 👇".
  - *"Messi fans vs Ronaldo fans deciding the GOAT in real time"* → show the live bar moving.
  - *"I let the internet pick the GOAT and it's too close"* → tension.
- **Caption + CTA:** "Which army are you? 🐐 link in bio" — **drive comments** (comments = algorithm fuel). Post **2–3/day**, it's a volume + variance game.
- **Why it shares:** binary "pick a side" is perfect comment bait; the army reveal is duet/stitch/screenshot-able.

### D. Discord / Telegram football communities (dense, high-trust, fast seeding)
- **Where:** r/soccer's official Discord, big EA FC / FIFA servers, club fan Discords, football meme servers; Telegram football-news discussion groups, club fan groups, tipster/betting chats (huge debate audiences).
- **How:** join, be present, then in #general/#off-topic: *"made a dumb thing to settle the GOAT argument once and for all — current score is X, which side are you on?"* Frame as community fun, never spam. Run a **"this server's GOAT count"** challenge.
- **Why it shares:** one drop in a 5k-member active group seeds dozens of votes and the argument spreads *in-thread* without you.

---

## 2. TEN READY-TO-USE POSTS (copy, paste, tweak the bracket)

**1 — Manufactured sub-rivalry (Reddit r/Barca):**
> 🔵 r/realmadrid is currently BEATING us in the live GOAT vote and it's embarrassing. They think Ronaldo is the GOAT. Are we really going to let that stand? Get in here and vote. [link]

**2 — Army flex screenshot (X / IG / Reddit):**
> I am officially Messi Army Soldier #4,210 🐐🇦🇷 What army are you? Don't lie. [screenshot of Success page] [link]

**3 — Controversial bait (X / Reddit):**
> Ronaldo is statistically the GOAT and Messi fans physically cannot handle the live numbers. Prove me wrong. The vote is public. 😏 [link]

**4 — Poll-style neutral (works everywhere):**
> No bias. No agenda. One tap. Messi or Ronaldo — who is the GOAT? Live count updating in real time 👇 [link]

**5 — Close-score urgency (X / Telegram / Discord):**
> It's 50.4% vs 49.6% RIGHT NOW. One vote flips the GOAT of all time. Are you really going to sit this out? [link]

**6 — Correction behavior (X reply under a GOAT tweet):**
> if you genuinely believe [Messi/Ronaldo] is the GOAT, the live vote says you're outnumbered 👀 go check [link]

**7 — National pride (X / country subs / Telegram):**
> 🇦🇷 vs 🇵🇹 — your country is LOSING the GOAT war right now. This is a national emergency. Go defend your flag. [link]

**8 — "I was today years old" curiosity (Reddit r/InternetIsBeautiful / X):**
> someone built a live Messi vs Ronaldo war where every vote moves a real-time scoreboard and it's weirdly addictive. the current score is cooked. [link]

**9 — TikTok caption + on-screen script:**
> *Caption:* "Which army are you actually in? 🐐 (be honest) link in bio"
> *Script:* [0s] "POV: the internet is deciding the GOAT" → [3s] tap Messi → [5s] "MESSI ARMY #X" reveal → [8s] "comment YOUR army 👇 they're losing btw"

**10 — Challenge-a-friend / tag bait (X / IG / WhatsApp):**
> Tag the friend who's WRONG about the GOAT and make them vote. Loser buys the next round. 🐐 [link]

> Rotate these. Reusing the same post on the same audience kills reach. Each is built on **curiosity
> gap** (what's the score / which army), **tribal conflict** (your side vs theirs), and a **comment
> trigger** (a claim people *must* correct).

---

## 3. 72-HOUR EXECUTION PLAN (solo founder)

### Hour 0–6 — Arm the test (do not skip)
- Deploy to Vercel (B1). Wire PostHog + `?ref=` codes (B2). Click through your own funnel once on phone.
- **Soft seed in the safest, most tribal pools** (low ban risk, high conversion): post template **#1/#2** to **r/Messi + r/cristiano**, and drop **#4** in **3 Discords + 2 Telegram groups**.
- **Observe:** does the funnel hold? Landing→Vote→Share with zero drop-off bugs? First 30–50 votes. Fix any obvious friction *now*.

### Hour 6–24 — Open the wider channels
- **TikTok #1** (template #9). **X:** 1 original (#5) + 8 reply-dunks (#6) under trending football tweets.
- **Reddit:** fire the **manufactured rivalry** — #1 in r/Barca AND a mirror in r/realmadrid ("r/Barca thinks Messi's the GOAT, prove them wrong"). 1 post/sub.
- **Observe:** **Share Rate** (vote→share_click) by channel. Are comments **angry/tribal** (good) or indifferent (bad)?

### Day 2 — Double down on the winner
- Identify the channel with the best **share rate + referred votes**. Pour effort there.
- **TikTok #2 + #3** (volume). More X dunks. Re-post fresh hooks (#3, #7) to *new* subs/groups you haven't touched.
- Push **#10 (challenge-a-friend)** explicitly to early voters ("tag who's wrong").
- **Observe:** first referral generation — are referred clicks **converting to votes**? Compute early K.

### Day 3 — Squeeze the loop + decide
- Push **close-score urgency** (#5) everywhere — engineer the "your side is losing" panic.
- DM/ask your ~10 most active sharers to share once more (power-sharers drive most of K).
- **Decide** against the thresholds in §4. Lock learnings, plan iteration.

**Cadence caps (avoid bans):** Reddit ≤1/sub/day · X 1–2 originals + 5–10 replies/day · TikTok 2–3/day · each Discord/Telegram group once, spaced out.

---

## 4. SUCCESS / FAILURE CRITERIA

**Definitions**
- **Share Rate** = `share_click ÷ votes` (did voting trigger a share action?)
- **Invite Conversion** = `referred votes ÷ referred clicks` (did the invite convert?)
- **K-factor** = `(shares per voter) × (votes per referred click)` ≈ Share Rate × invites-opened × Invite Conversion.

**Thresholds**

| Metric | Weak (iterate) | OK | Strong | Breakout |
|---|---|---|---|---|
| Share Rate (vote→share) | <15% | 20–30% | ≥35% | ≥50% |
| Invite Conversion (click→vote) | <20% | 25–35% | ≥40% | ≥55% |
| **K-factor** | **<0.4** | **0.4–0.8** | **0.8–1.0** | **>1.3** |

- **Minimum viable K ≈ 0.8** — strong signal you can engineer to self-sustaining. (Honest note: most cold organic apps sit at K≈0.1–0.3. **0.4–0.8 is already promising** and fixable — don't kill it there.)
- **Self-sustaining K > 1.0** — each user brings >1 user; the loop runs on its own. Scale.
- **Breakout K > 1.3** — pour fuel; this is rare and real.
- **Kill/Pivot floor:** Share Rate <10% **and** comments indifferent (not tribal) → the **hook**, not the funnel, is wrong. Change the message before touching anything else.

**Sample-size honesty:** at 100–300 users K is *directional*, not statistically clean. Require ≥100
voters and ≥1 complete referral generation before trusting the number.

---

## 5. BEHAVIORAL INSIGHTS

**Why they share without being asked**
- The share is a **costless identity flex** ("I'm Messi Army") *and* a **weapon in an argument they're
  already having**. Sharing = recruiting your side = defending your tribe. "Challenge a Friend" is just
  sending a provocation — which is *fun*.

**Dominant emotional trigger (ranked)**
1. **Tribalism** — "my side vs your side." The strongest, most durable driver.
2. **Correction behavior** — "someone is wrong on the internet, I must fix it." Comment-and-share rocket fuel.
3. **Pride** — "my GOAT, my flex."
4. **Anger / loss-aversion** — "the rival is winning — not on my watch." Spikes sharing when your side trails.

**Why they click from the feed**
- **Curiosity gap:** what's the live score / which army am I? (You can't know without tapping.)
- **Near-zero effort, pre-loaded opinion:** it's binary, you *already* have a take — one tap to express it.
- **Tribal/named provocation:** "your side is losing" / "[friend] challenged you" is impossible to scroll past.
- **Urgency:** *live, real-time, currently close* = "my vote matters right now."

---

## 6. ITERATION LOGIC

### If K < 1 — fix the loop, not the product
**Messaging**
- Sharpen the conflict: announcements ("I voted Messi") → **provocations** ("tag who's wrong").
- Raise stakes: lead with the **close score** and **"your side is losing."**
- Pre-fill the share text with a taunt; never make them write it.

**UI**
- Make the share **bigger and earlier**; one-tap native share, zero typing.
- Make the Success reveal **more screenshot-worthy** (cleaner army card, rank, flag) — the card *is* the ad.
- Make the score **feel closer/more urgent** (emphasize recent momentum, keep it knife-edge).
- Add a tangible incentive: **"+5 votes for your army if a friend joins."**

**What NOT to change**
- The **binary question.** The **tribal identity** framing. The **dark/neon emotional** aesthetic. The **3-step flow.**
- Do **not** add features, menus, stats, or "fairness." Do not soften the conflict. Complexity kills virality.

### If K > 1 — scale without breaking it
- **Scale the winning channel** first; add **light paid seeding** ($20–50 TikTok Spark / promoted Reddit in fan subs) to widen the mouth of the funnel.
- **Recruit power-sharers** (the ~5% driving most invites) — give them status (leaderboard, captain title).
- **Avoid fatigue:** rotate hooks, run **seasons/resets**, keep the score close, never show the same audience the same post repeatedly.
- **Expand into new versus battles** — the product is a **versus-battle factory**: Jordan vs LeBron, Ronaldo vs Mbappé, country vs country, "best [anything] ever." Same engine, fresh tribes, compounding network.

---

## TL;DR for the solo founder
1. Deploy + add PostHog + `?ref=` codes (or you're measuring nothing).
2. Don't post links — **start arguments** in r/Messi, r/cristiano, r/Barca↔r/realmadrid, football Discords/Telegram, and **reply-dunk** on football X.
3. TikTok the army-reveal, 2–3×/day.
4. Watch **Share Rate** and **Invite Conversion**; compute **K**.
5. K 0.4–0.8 → iterate messaging/UI. K >1 → scale the winning channel + spin up new battles.
