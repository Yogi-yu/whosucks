# 14 — Visual Design Specification (GOAT VOTE)

> Role: World-class product / growth / UI-UX design. **No code.** Mockups + UX specs only.
> Feel: Duolingo (delight + guilt) × Clash Royale (tribal arena) × Fantasy Football (season narrative)
> × Polymarket (live odds tension) × TikTok (full-bleed, swipe, share-native).
> Scale assumption: 10M users — every screen is mobile-first, thumb-reachable, instantly legible.

Legend for wireframes: `▓` filled/primary · `░` muted/secondary · `[ Button ]` · `( • )` icon ·
`〜` animated element · `▲▼` live delta.

---

## 0. Design north stars

1. **Pick a side in <2 seconds.** Binary, emotional, no reading.
2. **The score is alive.** Numbers tick, the balloon breathes, the lead is always *contested*.
3. **Every screen takes a side.** Nothing is neutral. The UI itself has a temperature.
4. **The share is the hero action**, styled bigger and brighter than anything else.
5. **Status is visible everywhere** — rank, army, badges, faction color on every surface.

The whole app lives on two team temperatures:
- **MESSI** = cool — Albiceleste sky blue + white, calm-confident.
- **RONALDO** = hot — crimson/black + gold, aggressive-royal.
The neutral chrome is near-black with gold accents (the "GOAT" gold) so both teams pop.

---

# PART A — THE 15 SCREENS

---

## 1. Landing Page (the arena entrance)

```
┌─────────────────────────────────┐
│ ( • GOAT )      LIVE ●  1,247,822│  ← top bar: logo + live global vote ticker (counts up 〜)
├─────────────────────────────────┤
│                                 │
│         〜  ◯◯◯  〜             │  ← floating GOLDEN BALLOON, gently bobbing + particles
│        〜 ( BALLOON ) 〜         │
│          MESSI  GOAT             │  ← balloon text = current global leader (morphs live)
│                                 │
│   ░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓       │  ← the SCOREBOARD bar (blue vs red), animated fill
│   MESSI 58.2%        41.8% RON   │
│   ▲ +0.3% last hour              │  ← live momentum line (Polymarket tension)
│                                 │
│   THE GREATEST DEBATE EVER.      │  ← H1, huge
│   PICK YOUR GOAT. START A WAR.   │  ← subhead, taunting
│                                 │
│   ┌───────────┐ ┌─────────────┐ │
│   │ 〜 MESSI   │ │  RONALDO 〜  │ │  ← TWO giant team buttons (cool left / hot right)
│   │  ⚽ VOTE   │ │   VOTE ⚽    │ │
│   └───────────┘ └─────────────┘ │
│                                 │
│   🌍 Argentina is 92% Messi     │  ← rotating tribal hook (country / city / clan)
│   👥 4.2M soldiers have picked   │  ← social proof
│   ──────────────────────────    │
│   Paid votes are part of the    │  ← persistent honest disclosure (small, footer)
│   entertainment & in the total. │
└─────────────────────────────────┘
```
- **Layout:** balloon hero (top 40%) → scoreboard → headline → dual vote CTA → tribal hook → disclosure.
- **Visual hierarchy:** Balloon > Scoreboard > Vote buttons > headline > social proof.
- **Copy:** "Pick your GOAT. Start a war." / rotating "🌍 Argentina is 92% Messi."
- **CTAs:** the two VOTE buttons (no other competing action above the fold).
- **Emotion:** awe (balloon) → tension (live score) → tribal pull ("my country needs me").
- **Growth triggers:** live ticker (FOMO), country hook (tribe), momentum delta (drama), social proof.
- **Conversion goal:** land → vote (target ≥ 60%). One decision, two buttons.
- **Viral objective:** make the *first impression* a live, contested war so the visitor feels they're joining something in motion — and is primed to recruit the moment they vote.

> Referral arrivals (`/r/code`) skip the generic version — see screen 5's "Named Onboarding" variant.

---

## 2. Vote Screen (the moment of choice)

Often the landing buttons ARE the vote (one-tap). The dedicated screen is the full-bleed,
swipeable, TikTok-style commitment moment used for challenges / re-votes.

```
┌─────────────────────────────────┐
│  ‹ back            ⏱ 1 free vote │  ← allowance indicator
│                                 │
│      WHO IS THE TRUE GOAT?       │  ← question, centered, bold
│                                 │
│  ┌─────────────┐ ┌────────────┐ │
│  │             │ │            │ │
│  │   〜 MESSI   │ │  RONALDO   │ │  ← two full-height tappable panels
│  │    photo     │ │   photo    │ │     (swipe left = Messi, right = Ronaldo)
│  │   #10 🐐     │ │   #7 🐐    │ │
│  │             │ │            │ │
│  │  [ I PICK   │ │ [ I PICK   │ │  ← in-panel CTA, team-colored
│  │    MESSI ]  │ │  RONALDO ] │ │
│  └─────────────┘ └────────────┘ │
│                                 │
│   ░░░░░░░░░▓▓▓▓▓▓  58 ░ 42      │  ← thin live bar at bottom, ever-present
│   👆 Tap or swipe your side      │  ← micro-instruction
└─────────────────────────────────┘
```
- **Layout:** split-screen duel, each half a team's world (color, photo, crest).
- **Hierarchy:** the two faces > the CTA > the live bar.
- **Copy:** "WHO IS THE TRUE GOAT?" / "Tap or swipe your side."
- **CTA:** "I PICK MESSI" / "I PICK RONALDO" — first-person, identity-claiming language.
- **Emotion:** decisiveness, tribal allegiance, a tiny adrenaline spike of commitment.
- **Growth triggers:** the live bar shows the stakes; swiping = TikTok muscle memory = effortless.
- **Conversion goal:** complete the vote (≥ 90% of those who reach this screen).
- **Viral objective:** frame the vote as **declaring allegiance**, not answering a poll — so the next screen can immediately weaponize that identity.

---

## 3. Vote Success Screen (peak emotion — DO NOT WASTE)

```
┌─────────────────────────────────┐
│        🎉 confetti burst 🎉      │  ← team-colored confetti, haptic thump
│                                 │
│         ✓  YOU'RE IN.            │
│                                 │
│      〜 MESSI SOLDIER 〜         │  ← identity reveal, faction-colored
│         #5,402,118              │  ← your rank, big — instantly makes it personal
│                                 │
│   Your vote moved the war:       │
│   MESSI 58.2% ▲   RONALDO 41.8% │  ← show THEIR impact on the live score
│   "+1 for the blue side."        │
│                                 │
│   ⚠ But Ronaldo gained +0.4%    │  ← immediate tension / loss-aversion hook
│      in the last hour.           │
│                                 │
│   ┌───────────────────────────┐ │
│   │ ⚔  CHALLENGE A DOUBTER    │ │  ← HERO CTA (biggest, glowing) → Share Wall
│   └───────────────────────────┘ │
│   ┌───────────────────────────┐ │
│   │ 💣  DROP IN GROUP CHAT    │ │
│   └───────────────────────────┘ │
│   [ see my profile ]  [ vote+ ] │  ← secondary, de-emphasized
└─────────────────────────────────┘
```
- **Layout:** celebration → identity+rank → impact proof → tension hook → share CTAs.
- **Hierarchy:** "YOU'RE IN / rank" > the challenge CTA > everything else.
- **Copy:** "YOU'RE IN." / "MESSI SOLDIER #5,402,118" / "But Ronaldo gained +0.4%…"
- **CTAs:** ⚔ Challenge a Doubter (hero) · 💣 Drop in Group Chat.
- **Emotion:** pride + belonging (the reveal) instantly converted into anxiety (your side is threatened).
- **Growth triggers:** rank vanity, live-impact proof, loss-aversion ("Ronaldo gained"), one-tap share.
- **Conversion goal:** vote → share action (target ≥ 40%). **This screen's only job is to make you share.**
- **Viral objective:** capture the dopamine spike of voting and immediately spend it on a recruit. This is the single most important screen in the product.

---

## 4. Share Wall (the recruiting console)

```
┌─────────────────────────────────┐
│ ‹            SPREAD THE WAR      │
│                                 │
│  Pick your weapon:               │  ← framing: sharing = a weapon, not a chore
│                                 │
│  ┌───────────────────────────┐  │
│  │ ⚔ CHALLENGE A FRIEND       │  │  ← L1 Duel (default highlighted, pulsing)
│  │   "Bet you're wrong."       │  │
│  └───────────────────────────┘  │
│  ┌─────────────┐ ┌────────────┐ │
│  │ 💣 GROUP CHAT│ │ 🎬 TIKTOK   │ │  ← L22 + L7, side by side
│  │  WhatsApp    │ │  /Reels     │ │
│  └─────────────┘ └────────────┘ │
│  ┌─────────────┐ ┌────────────┐ │
│  │ 📸 STORY     │ │ 🔗 COPY     │ │
│  │  IG/Snap     │ │  link        │ │
│  └─────────────┘ └────────────┘ │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🎁 UNLOCK +5 VOTES          │  │  ← L5 reward: invite 3 → bonus votes
│  │ Invite 3 friends who vote   │  │
│  │ ▓▓▓▓▓░░░░░  2 / 3           │  │  ← progress bar (near-complete pull)
│  └───────────────────────────┘  │
│                                 │
│  ↓ PREVIEW your share card ↓     │
│  ┌───────────────────────────┐  │
│  │  [ live share-card image ]  │  │  ← shows exactly what friends will see
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
- **Layout:** weapon menu (challenge hero → channel grid) → invite-reward bar → card preview.
- **Hierarchy:** Challenge > channel grid > reward bar > preview.
- **Copy:** "Pick your weapon." / "Bet you're wrong." / "Unlock +5 votes."
- **CTAs:** Challenge / Group Chat / TikTok / Story / Copy.
- **Emotion:** agency, mischief ("start chaos"), goal-pull (2/3 progress).
- **Growth triggers:** reward-for-invite, progress bar, channel choice = match to user's strongest graph, live preview reduces uncertainty.
- **Conversion goal:** ≥ 3 invites per sharer; channel match.
- **Viral objective:** maximize *invites per user (i)* and route each to the channel with the densest graph (group chat) or widest reach (TikTok).

---

## 5. 1v1 Challenge Screen (two faces: send + receive)

### 5a — SEND (the challenger composes)
```
┌─────────────────────────────────┐
│ ‹           CHALLENGE A DOUBTER  │
│                                 │
│  You: 〜 MESSI                   │
│   ┌───────────────────────────┐ │
│   │   VS preview card           │ │  ← "MESSI ⚔ ???" mystery card
│   │  MESSI 🐐  ⚔  who are you?  │ │
│   └───────────────────────────┘ │
│  Add a taunt:                    │
│  ┌───────────────────────────┐  │
│  │ "Messi's the GOAT and you   │  │  ← pre-written, editable taunts (cycle)
│  │  know it. Prove me wrong 🐐" │  │
│  └───────────────────────────┘  │
│  Send to:  [WhatsApp][DM][Copy]  │
│  ┌───────────────────────────┐  │
│  │     ⚔  SEND CHALLENGE       │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 5b — RECEIVE (Named Onboarding — the highest-converting landing)
```
┌─────────────────────────────────┐
│              LIVE ● 1,247,822    │
│                                 │
│   ┌───────────────────────────┐ │
│   │  CARLOS  ⚔  YOU             │ │  ← named rivalry, his avatar + faction
│   │  Messi #3,201               │ │
│   └───────────────────────────┘ │
│                                 │
│   "Messi's the GOAT and you      │  ← the taunt, front and center
│    know it. Prove me wrong 🐐"   │
│                                 │
│   Carlos challenged you.         │
│   Is he right… or dead wrong?    │  ← curiosity + rivalry gap
│                                 │
│  ┌───────────┐ ┌─────────────┐  │
│  │ 〜 AGREE   │ │ NAH, RONALDO │  │  ← two-tap reply = a vote
│  │  (Messi)  │ │   IS GOAT    │  │
│  └───────────┘ └─────────────┘  │
│   ⚡ Reply in 1 tap. No signup.  │
└─────────────────────────────────┘
```
- **Hierarchy (receive):** the named matchup + taunt > the two reply buttons.
- **Copy:** "Carlos challenged you. Is he right… or dead wrong?"
- **Emotion (send):** competitiveness, smugness. **(receive):** "oh it's ON" — personal provocation.
- **Growth triggers:** named person (not a faceless link), curiosity, instant 1-tap reply, no-signup.
- **Conversion goal:** challenge link → vote ≥ 70% (named + emotional = best CTR in the app).
- **Viral objective:** the duel is the spine loop — and the receiver's vote screen immediately flips them into a *sender* (after they reply, they get their own Vote Success → Share Wall).

---

## 6. Referral Profile Page (your war record / recruiter HQ)

```
┌─────────────────────────────────┐
│ ‹            MY ARMY             │
│                                 │
│   〜 ( your avatar, blue ring )  │
│   @carlos10   ·  🇦🇷             │
│   MESSI CAPTAIN                  │  ← title tier (Soldier→Recruiter→Captain→General)
│   Rank #3,201 of 4.2M Messis     │
│                                 │
│  ┌─────────┬─────────┬────────┐ │
│  │ INVITED │ VOTES   │ POINTS  │ │  ← 3 key stats, big numbers
│  │  47     │ GEN'D   │  1,240  │ │
│  │         │  312    │         │ │
│  └─────────┴─────────┴────────┘ │
│                                 │
│  YOUR ARMY  ▓▓▓▓▓▓▓▓░░ 47/50     │  ← progress to next title (General at 50)
│  3 more to become a GENERAL ⭐    │  ← near-complete pull
│                                 │
│  Recent recruits:                │
│  • Ana 🇦🇷 voted Messi  +10       │  ← live feed of your impact
│  • Leo 🇧🇷 voted Ronaldo 😤       │  ← even "betrayals" create drama
│  • Sam 🇺🇸 voted Messi  +10       │
│                                 │
│  ┌───────────────────────────┐  │
│  │  ⚔  RECRUIT MORE SOLDIERS  │  │  ← persistent CTA back into Share Wall
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
- **Hierarchy:** identity+title > stats > army progress > recruit feed > CTA.
- **Copy:** "MESSI CAPTAIN" / "3 more to become a GENERAL ⭐."
- **Emotion:** pride, ownership ("my army"), ambition (next tier).
- **Growth triggers:** title progression, recruit feed (variable reward), defection drama, always-present recruit CTA.
- **Conversion goal:** return → recruit again.
- **Viral objective:** turn the leaderboard-climbing instinct into a permanent recruiting motor; the page exists to push you back into the Share Wall.

---

## 7. Global Leaderboard (the world stage)

```
┌─────────────────────────────────┐
│  GLOBAL  | Messi Army | Ronaldo  │  ← top tab bar (3 boards)
│  ─────────                       │
│  Filter: 🌍 World  ▾  | Season ▾ │
│                                 │
│  TOP RECRUITERS — ALL FACTIONS   │
│  ┌───────────────────────────┐  │
│  │ 🥇 1  @MessiKing 🇦🇷  9,820 │  │  ← gold/silver/bronze top 3 emphasized
│  │ 🥈 2  @CR7Legion 🇵🇹  9,540 │  │
│  │ 🥉 3  @LaPulga10 🇦🇷  8,910 │  │
│  │ ───────────────────────── │  │
│  │  4  @Siuuu_  🇧🇷    7,205   │  │
│  │  5  @TenGoat 🇪🇸    6,880   │  │
│  │  …                        │  │
│  └───────────────────────────┘  │
│  ╔═══════════════════════════╗  │
│  ║ ➤ YOU  #3,201  🔼 +120 ▲   ║  │  ← STICKY "your rank" pinned at bottom
│  ║   142 to pass @ProMessi    ║  │  ← rivalry: who's just ahead
│  ╚═══════════════════════════╝  │
│  ┌───────────────────────────┐  │
│  │  ⚔  CLIMB — RECRUIT NOW    │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
- **Hierarchy:** top-3 podium > the list > your sticky rank > CTA.
- **Copy:** "142 to pass @ProMessi." (always frame the *next* target)
- **Emotion:** aspiration, FOMO, competitive itch.
- **Growth triggers:** sticky personal rank, "X to pass next person," season filter (resettable hope).
- **Conversion goal:** view → recruit to climb.
- **Viral objective:** make rank a *recruiting-only* currency so the leaderboard is a virality pump, not a vanity wall.

---

## 8. Messi Army Leaderboard (tribal home — cool theme)

```
┌─────────────────────────────────┐
│  Global | ▣ MESSI ARMY | Ronaldo │  ← Messi tab active, whole screen turns BLUE
│                                 │
│   〜 MESSI ARMY 〜               │
│   ░░░░░░░░░░░░░░  58.2%          │  ← faction's share of the war, big
│   4,201,455 soldiers  ▲ growing  │
│                                 │
│   ⚔ WAR STATUS: WINNING by 16.4% │  ← morale banner (green when ahead)
│   🔥 Daily growth: +82,140        │
│                                 │
│   TOP MESSI GENERALS             │
│   🥇 @MessiKing 🇦🇷   9,820       │
│   🥈 @LaPulga10 🇦🇷   8,910       │
│   🥉 @D10S_fan  🇦🇷   8,100       │
│   …                              │
│   ➤ YOU #1,204 in the Army        │  ← your standing *within your tribe*
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🛡 DEFEND THE LEAD — INVITE │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
- **Theme:** entire screen adopts Messi blue — you're *home*.
- **Copy:** "WAR STATUS: WINNING by 16.4%" / "DEFEND THE LEAD."
- **Emotion:** belonging, pride, protectiveness.
- **Growth triggers:** morale banner (winning = defend, losing = rescue), tribe-internal rank, growth stats.
- **Viral objective:** convert tribe identity into collective recruiting; both winning *and* losing states drive shares (defend vs comeback).

---

## 9. Ronaldo Army Leaderboard (tribal home — hot theme)

```
┌─────────────────────────────────┐
│  Global | Messi | ▣ RONALDO ARMY │  ← Ronaldo tab active, whole screen turns RED/GOLD
│                                 │
│   〜 RONALDO ARMY 〜             │
│   ▓▓▓▓▓▓▓▓▓  41.8%               │
│   3,016,367 soldiers  ▲▲ surging │
│                                 │
│   ⚔ WAR STATUS: BEHIND by 16.4%  │  ← red morale banner = urgency
│   "We're closing the gap. SIUUU."│  ← faction voice/personality
│   🔥 Daily growth: +94,500 (>Messi)│ ← "we're growing faster" hope
│                                 │
│   TOP RONALDO GENERALS           │
│   🥇 @CR7Legion 🇵🇹   9,540       │
│   🥈 @Siuuu_    🇧🇷   7,205       │
│   …                              │
│   ➤ YOU #880 in the Army          │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🚨 COMEBACK TIME — RECRUIT  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
- **Mirror of #8 but emotionally opposite:** the underdog narrative ("closing the gap") is engineered to be *more* mobilizing than complacent winning.
- **Copy:** "We're closing the gap. SIUUU." / "COMEBACK TIME."
- **Growth triggers:** underdog urgency, "growing faster than them" hope-spot, faction catchphrase identity.
- **Viral objective:** weaponize loss-aversion — a losing tribe shares harder than a winning one. Keep both armies feeling the war is winnable.

---

## 10. User Profile (public-facing identity / the flex)

```
┌─────────────────────────────────┐
│  〜 cover: faction-colored 〜    │  ← blue or red banner = instant team read
│      ( avatar w/ team ring )     │
│   @carlos10  🇦🇷  ✓              │
│   MESSI CAPTAIN · since 2026     │
│   "Messi is simply better."      │  ← user tagline (self-expression)
│                                 │
│  ┌────────┬────────┬──────────┐ │
│  │ RANK   │ ARMY   │ STREAK    │ │
│  │ #3,201 │  47    │ 🔥 23d    │ │
│  └────────┴────────┴──────────┘ │
│                                 │
│  🏅 BADGES                       │
│  [First Vote][10 Invites][Amb.] │  ← earned badges, tappable
│  [🔒 General][🔒 Legend]         │  ← locked = aspiration
│                                 │
│  WAR CONTRIBUTION                │
│  ░░░░░░░░░░  312 votes generated │
│                                 │
│  ┌───────────────────────────┐  │
│  │ ⚔ CHALLENGE @carlos10      │  │  ← visitors can challenge directly
│  └───────────────────────────┘  │
│  goatvote.com/u/carlos10  🔗     │  ← vanity URL (bio-link distribution)
└─────────────────────────────────┘
```
- **Hierarchy:** faction banner + identity > stats > badges > challenge CTA.
- **Copy:** user-set tagline; "CHALLENGE @carlos10."
- **Emotion:** pride, identity, the urge to be challenged/admired.
- **Growth triggers:** vanity URL (evergreen bio distribution), "challenge this user" turns every profile into a viral entry point, locked badges = aspiration.
- **Viral objective:** make the profile a **shareable identity asset** (put it in your IG bio) AND a challenge funnel.

---

## 11. Achievement Page (the trophy room)

```
┌─────────────────────────────────┐
│ ‹            ACHIEVEMENTS        │
│   12 / 30 unlocked   ▓▓▓▓░░░░    │  ← collection progress (completion drive)
│                                 │
│  ⭐ RECRUITING                   │
│  ┌───────────────────────────┐  │
│  │ 🟢 First Blood   — 1 invite │  │  ← earned (glowing, colored)
│  │ 🟢 Squad Builder — 10       │  │
│  │ 🟡 Ambassador ▓▓▓▓░ 32/50   │  │  ← in-progress w/ bar (the pull)
│  │ 🔒 General      — 50 army   │  │  ← locked (greyed, mysterious)
│  └───────────────────────────┘  │
│  🔥 LOYALTY                      │
│  │ 🟢 7-Day Streak  🟡 30-Day…  │
│  🐐 LEGEND                       │
│  │ 🔒 Legend Supporter (Legend  │
│  │    Pack) 🔒 Faction MVP      │
│                                 │
│  Next up: "1 invite from         │  ← the single nearest unlock, surfaced
│  Ambassador 🏅"  [ INVITE NOW ]  │
└─────────────────────────────────┘
```
- **Hierarchy:** progress meter > categories > the *nearest* unlock callout.
- **Emotion:** collection compulsion, pride, near-miss tension.
- **Growth triggers:** "1 invite from Ambassador" surfaces the cheapest recruiting nudge; locked badges drive aspiration.
- **Viral objective:** convert completionism into invites; badges become share fuel ("I just hit Ambassador 🏅").

---

## 12. Notification Center (the drama feed)

```
┌─────────────────────────────────┐
│ ‹            ALERTS         ⚙    │
│  🔴 3 new                        │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🚨 RONALDO TOOK THE LEAD!   │  │  ← live drama (red, urgent) — taps to vote
│  │ Your side is losing. 2m ago │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ ⚔ Leo replied to your       │  │  ← personal: challenge outcome
│  │ challenge — he picked       │  │
│  │ Ronaldo 😤  Re-challenge?   │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 🔥 Streak ends in 3h!       │  │  ← loss-aversion retention
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 🏅 Ana joined your army     │  │  ← reward / recruit confirmation
│  │ (+10). You're #3,189 ▲      │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ ⭐ Season ends in 48h —      │  │  ← season climax
│  │ Messi leads by 1.2%         │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
- **Hierarchy:** newest + most dramatic on top; color-coded by type (red=war, blue/gold=personal/reward).
- **Copy:** punchy, emotional, always with a tap-action ("Re-challenge?").
- **Emotion:** urgency, curiosity, validation, FOMO.
- **Growth triggers:** every notification is a re-entry into a loop (vote / challenge / share / streak).
- **Viral objective:** the drama engine — manufacture frequent, *earned* re-triggers so users complete many loop-cycles per week.

---

## 13. Golden Balloon Store (monetization, on-brand)

```
┌─────────────────────────────────┐
│ ‹         GOLDEN BALLOON STORE   │
│      〜 ( big gold balloon ) 〜  │  ← aspirational hero, premium gold glow
│   Push your GOAT ahead. ⚡        │
│   Wallet: 🎈 12 votes            │  ← current balance
│                                 │
│  ┌───────────────────────────┐  │
│  │  STARTER     🎈 x5          │  │
│  │  $1.99            [ BUY ]   │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  SUPPORTER   🎈 x25  ⭐BEST │  │  ← "best value" anchor badge
│  │  $6.99            [ BUY ]   │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  LEGEND      🎈 x100 👑     │  │  ← whale tier, gold, crown
│  │  $19.99           [ BUY ]   │  │
│  │  "Become a Legend Supporter"│  │
│  └───────────────────────────┘  │
│                                 │
│  ⚔ Your side is losing — every   │  ← contextual urgency (when behind)
│     vote counts double today 2x  │  ← event multiplier
│  ──────────────────────────────  │
│  Paid votes are part of the      │  ← honest disclosure, always visible
│  entertainment & in the total.   │
│  Consumable digital goods · 18+  │
└─────────────────────────────────┘
```
- **Hierarchy:** gold balloon > Supporter (anchored "best") > Legend (aspirational) > disclosure.
- **Copy:** "Push your GOAT ahead." / "Become a Legend Supporter 👑."
- **Emotion:** desire for impact, status (Legend crown), urgency (losing + 2x).
- **Growth triggers:** contextual "your side is losing," 2x event, best-value anchoring, badge tie-in (Legend Pack → Legend Supporter badge).
- **Conversion goal:** payer conversion + AOV via the Supporter anchor.
- **Viral objective (indirect):** the Legend badge is a *flex* that shows on profile/share cards → spend becomes status becomes more sharing. Disclosure keeps trust (the moat) intact.

---

## 14. Mobile Version (the canonical form — everything above IS mobile)

```
┌───────────────┐
│ top: live tick │  ← persistent live counter, never scrolls away
├───────────────┤
│               │
│   〜BALLOON〜  │  ← hero
│               │
│  scoreboard    │
│               │
│  CONTENT       │  ← screen body, single column, thumb-reachable
│               │
├───────────────┤
│ 🏠 ⚔ 🏆 🔔 👤 │  ← bottom tab bar (Home/Challenge/Leaderboard/Alerts/Profile)
└───────────────┘     thumb zone — primary nav lives at the BOTTOM
```
- **Rules:** single column; primary CTA always in the bottom thumb-zone; full-bleed media; swipe between Messi/Ronaldo; sticky live ticker top + sticky nav bottom; sheets (not new pages) for share/vote to keep context; haptics on vote/win.
- **Emotion:** fast, native, app-like — TikTok-grade responsiveness.
- **Viral objective:** mobile is where social shares are received and sent; zero-friction one-thumb operation maximizes both *c* and *i*.

---

## 15. Desktop Version (the spectator arena / shareable big-screen)

```
┌──────────────────────────────────────────────────────────────────────┐
│ (•GOAT)   Home  Leaderboards  Store        LIVE ● 1,247,822   [Profile]│
├───────────────┬──────────────────────────────────┬───────────────────┤
│  LEFT RAIL     │            CENTER STAGE           │   RIGHT RAIL       │
│               │                                  │                   │
│  Your card:    │        〜  GOLDEN BALLOON  〜      │  LIVE WAR FEED     │
│  @carlos10     │            MESSI GOAT             │  • Ana → Messi     │
│  Messi Captain │                                  │  • Lead flipped 🚨 │
│  Rank #3,201   │   ░░░░░░░░░▓▓▓▓▓  58.2 ░ 41.8     │  • Season 48h ⏱   │
│               │   ▲ +0.3% last hour               │  • Leo → Ronaldo   │
│  [⚔ Recruit]   │                                  │                   │
│               │  ┌─────────┐   ┌──────────┐       │  TOP RECRUITERS    │
│  Mini-nav      │  │〜 MESSI  │   │ RONALDO 〜│       │  🥇 @MessiKing     │
│  · Home        │  │  VOTE   │   │   VOTE   │       │  🥈 @CR7Legion     │
│  · Leaderboard │  └─────────┘   └──────────┘       │  🥉 @LaPulga10     │
│  · Achievements│                                  │  [see all]         │
│  · Store       │  Argentina 92% Messi · 4.2M cast │                   │
└───────────────┴──────────────────────────────────┴───────────────────┘
   footer: disclosure · terms · privacy · 18+
```
- **Layout:** 3-column — identity rail (L) · balloon+vote stage (C) · live war feed + leaderboard (R).
- **Hierarchy:** center balloon/score is the show; rails provide social proof + identity persistence.
- **Emotion:** "command center" / live-sports-broadcast energy; great for streamers/second-screen.
- **Growth triggers:** the live war feed (right) makes the page feel like a stadium; ideal for screen-sharing/streaming where the balloon becomes ambient broadcast content.
- **Viral objective:** desktop = the "big screen" that gets screen-shared on streams and embedded; optimize the balloon+scoreboard to look incredible as ambient/broadcast content.

---

# PART B — ASSET & MOTION DESIGN

## B1. Balloon animations
| State | Visual | Motion |
|---|---|---|
| **Idle** | gold balloon, soft inner glow, string sway | bob ±8px @ 3s ease-in-out loop; gentle rotate ±2°; ambient gold particles rising 〜 |
| **Messi leading** | balloon tints cool blue-gold, "MESSI GOAT" | calm steady float; slow shimmer |
| **Ronaldo leading** | balloon tints crimson-gold, "RONALDO GOAT" | slightly faster, more energetic bob |
| **Tied (<1%)** | neutral gold, "GOAT BATTLE IS TIED", lightning ⚡ flickers | tense micro-vibration; faster particles |
| **Lead flip** | burst of confetti in new leader's color; text morphs (letters tumble/re-form) | scale-pop 1.0→1.15→1.0, 600ms; particle explosion; haptic |
| **You voted** | balloon "inhales" then pulses your color | single triumphant pulse + confetti |
| **Reduced motion** | static balloon, crossfade text, no particles | respects `prefers-reduced-motion` |

Text morph between MESSI/RONALDO/TIED uses a letter-by-letter crossfade (AnimatePresence-style),
never a hard cut — the balloon should feel like a living scoreboard.

## B2. Scoreboard design
- A single horizontal **tug-of-war bar**: Messi blue fills from left, Ronaldo red from right, meeting at a glowing **frontline** marker that slides live.
- Percentages on each end; total vote count above; **momentum delta** (`▲ +0.3% last hour`) below in the leader's color.
- The frontline marker pulses and emits a tiny spark when it moves — Polymarket-style live tension.
- Numbers **tick up digit-by-digit**, never snap. The bar animates its fill on every update.

## B3. Share cards (the OG image — single most important growth asset)
```
┌──────────────────────────────────┐
│  〜 gold balloon 〜   GOAT VOTE    │
│                                  │
│   @carlos10  supports             │
│   ▒▒▒▒  MESSI GOAT  ▒▒▒▒          │  ← huge, faction-colored
│                                  │
│   🐐 Rank #3,201  ·  Army 47      │
│   ⚔ "Bet you're wrong."           │
│                                  │
│   MESSI 58.2% ░░░▓▓ 41.8% RONALDO │  ← live score baked in
│   1,247,822 votes · join the war  │
└──────────────────────────────────┘
```
- Faction-themed (blue or red), the user's name + rank + taunt, **live score baked in as "proof,"** balloon + logo, clear "join the war" CTA. Generated per-user, cached.

## B4. Social media preview cards (link unfurls)
- **Twitter/X (summary_large_image):** balloon + "MESSI vs RONALDO — pick your GOAT" + live %; title "Carlos says Messi is the GOAT. Prove him wrong." → curiosity.
- **WhatsApp/iMessage:** square thumbnail of the share card; title line is the taunt; subtitle = live score.
- **Facebook/LinkedIn:** wider crop, more stats, "4.2M have voted."
- Each unfurl is **personalized to the sharer** (name + faction + taunt) — never a generic site card.

## B5. TikTok / Reels sharing templates
Pre-rendered vertical (9:16) video templates the user one-taps to export:
| Template | Hook (first 1s) | Body | End card |
|---|---|---|---|
| "POV: Messi just took the lead" | balloon flips to MESSI GOAT | live counter ticking, blue particles | "Vote → goatvote.com" + sound |
| "Which one are YOU?" | split Messi/Ronaldo faces | "comment your GOAT 👇" prompt | join CTA |
| "My side is LOSING 😭" | red alert overlay | personal rank + "I need backup" | "tap to help" |
| "I called the score 🔮" | prediction reveal | their predicted vs actual | flex CTA |
- All include: live-score overlay, faction color grade, trending-audio slot, watermark + short link, captions baked (sound-off viewing).
- **Goal:** users post these to *their* audience → unpaid off-platform reach we don't control but benefit from.

## B6. Push notification styles
| Type | Example copy | Tone / color |
|---|---|---|
| **War alert** | "🚨 Ronaldo just took the lead. Your side needs you." | red, urgent |
| **Rival surge** | "Ronaldo fans are surging +0.4%. Not on your watch. ⚔" | red, taunting |
| **Personal** | "Leo dodged your challenge 😏 Re-challenge him?" | neutral/gold, playful |
| **Recruit win** | "Ana joined your army (+10). You're #3,189 ▲" | blue/gold, rewarding |
| **Streak** | "🔥 Your 23-day streak ends in 3h. Don't break it." | orange, loss-aversion |
| **Season** | "⭐ 48h left. Messi leads by 1.2%. Make it count." | gold, climactic |
| **Win-back** | "Your side fell behind while you were gone. Come back? 🐐" | blue/red, guilt |
- Rules: one emotional hook + one tap-action; rich image (balloon/score) where supported; frequency-capped; user-tunable ("war alerts only").

---

# PART C — DESIGN SYSTEM

## C1. Design principles
1. **Take a side** — no neutral surfaces; the UI has a team temperature.
2. **Alive, not static** — motion, ticking numbers, live deltas everywhere.
3. **Thumb-first** — primary actions in the bottom zone, one-handed.
4. **Status is currency** — rank/army/badges visible on every screen.
5. **Share is the hero** — the share CTA outshines all others.
6. **Honest drama** — emotion from real data, never fabricated (trust = the moat).

## C2. Color palette
```
NEUTRAL CHROME (the arena)
  Ink/BG          #0B0B12  (near-black, stadium-at-night)
  Surface         #15151F
  Surface-2       #1F1F2C
  Hairline        #2A2A38
  Text-primary    #F5F6FA
  Text-muted      #9A9AB0

GOAT GOLD (brand / balloon / premium)
  Gold            #F5C542
  Gold-deep       #C9961E
  Gold-glow       #FFE08A

MESSI (cool team)
  Messi-blue      #4FA8E0   (Albiceleste sky)
  Messi-blue-deep #2E7CC4
  Messi-tint bg   #0E1B26

RONALDO (hot team)
  Ronaldo-red     #E5343D   (crimson)
  Ronaldo-red-deep#B11E2A
  Ronaldo-tint bg #220E12

SEMANTIC
  Win/positive    #36D399   Lose/alert  #F5556B
  Warning/streak  #FF8A3D
```
- Dark-first (drama, glow, balloon pops). Optional light mode inverts chrome, keeps team hues.
- Gradients: balloon gold radial glow; scoreboard blue→red with a bright frontline.

## C3. Typography
```
Display / Balloon / Scores : "Clash Display" or "Druk" — heavy, condensed, sporty caps
                             (MESSI GOAT, big numbers, leaderboard ranks)
Headings / UI titles       : "Satoshi" / "General Sans" — geometric, confident, modern
Body / labels              : "Inter" — neutral, legible at small sizes, great i18n coverage
Numerals                   : tabular figures for all counters/scores (no width jitter on tick)

Scale (mobile → desktop):
  Balloon text  40 / 64    H1  28 / 40    H2  22 / 28
  Title 18/20   Body 15/16  Caption 13   Micro 11
Weights: 800 display, 600 titles, 400/500 body.
```

## C4. Component library
| Component | Spec / states |
|---|---|
| **Balloon** | hero; states per §B1; gold default, team-tinted by leader |
| **Scoreboard bar** | tug-of-war; animated fill, sliding frontline, momentum delta |
| **Team Vote Button** | full-bleed, team-colored, photo/crest, first-person label; hover/press/disabled/loading |
| **Share CTA (hero)** | gold gradient, glow, pulse; the brightest button on any screen |
| **Channel chip** | WhatsApp/TikTok/Story/Copy mini-buttons w/ platform icon |
| **Stat block** | 3-up big-number stats (rank/army/points) |
| **Leaderboard row** | rank · avatar · name · flag · score · ▲delta; podium variant (gold/silver/bronze); sticky "you" row |
| **Title chip** | Soldier/Recruiter/Captain/General — tier color + icon |
| **Badge** | earned (glow/color) · in-progress (ring %) · locked (grey) |
| **Progress bar** | "X to next" near-complete emphasis |
| **Notification card** | color-coded by type, emoji hook, tap-action |
| **Pack card** | price, balloon count, "best value"/crown badge, BUY |
| **Morale banner** | WINNING(green) / BEHIND(red) faction status |
| **Live ticker** | top-bar count-up, tabular numerals, pulse dot |
| **Bottom tab bar** | Home/Challenge/Leaderboard/Alerts/Profile, thumb-zone |
| **Sheet** | bottom sheets for vote/share to preserve context |
| **Toast/Confetti** | team-colored celebration + haptic |
- Tokens: radius 16 (cards) / 24 (hero) / pill (buttons); spacing 4-pt grid; elevation via glow not hard shadow; motion 200ms (UI) / 600ms (celebrations), ease-out.

## C5. Mobile-first responsive strategy
```
Breakpoints:  base ≤640 (mobile, canonical)  ·  md 641–1024 (tablet)  ·  lg ≥1025 (desktop)

MOBILE (design here first)
  · single column, full-bleed media, bottom tab nav, sticky live ticker
  · primary CTA pinned in thumb zone; share/vote as bottom sheets
  · swipe gestures (Messi↔Ronaldo); haptics; 44px+ tap targets

TABLET
  · widen content, 2-col where useful (leaderboard + your-rank side panel)
  · nav can move to top; balloon scales up

DESKTOP
  · 3-column command-center (identity rail · balloon stage · live feed/leaderboard)
  · balloon + scoreboard optimized as broadcast/stream-friendly ambient content
  · hover states, keyboard nav, larger leaderboards

Always: fluid type (clamp), responsive images/video (9:16 share assets, 1:1 cards, 16:9 desktop),
respect prefers-reduced-motion + prefers-color-scheme, RTL-ready, WCAG AA contrast on all text,
focus-visible rings, alt text on balloon/score for screen readers.
```

## C6. Accessibility & trust (non-negotiable at 10M scale)
- WCAG AA contrast (team colors tested on dark chrome); never color-only meaning (icons + text).
- Reduced-motion path for all animations; captions on all share videos.
- Disclosure ("paid votes… entertainment… in the total") persistent on vote/store/footer.
- 18+ gate on store; honest, real scoreboard — the credibility of the number is the brand.
```
```
