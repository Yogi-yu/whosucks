# 13 — Viral Growth PRD

> Role: Growth hacking / viral mechanics / social-product design
> Objective: **Maximize K-factor and viral spread.** Engineering is downstream; this doc is about behavior.
> Status: v1.0 · 2026-06-24

---

## 0. The reframe (read this first)

The original PRD treats **voting as the product** and sharing as a polite afterthought
("here's your referral link"). That is a poll. Polls don't go viral.

**The redesign:** the *argument* is the product. The *vote* is just the price of admission.
The *share* is the win condition.

> You are not a voter. You are a **soldier in an army**, fighting to prove your GOAT is the
> real one — and the only way to win is to **drag other people into the fight.**

Everything below optimizes for one thing: making the share the most natural, highest-status,
most irresistible action in the entire experience — and making the *click* impossible to ignore.

This works because Messi-vs-Ronaldo is the **single most-argued debate in global culture**, it is
**identity-defining**, **tribal**, **national**, and **never resolvable** — which means the engagement
never has a natural endpoint. We are not creating an argument. We are giving an existing, eternal,
billion-person argument a **scoreboard**.

---

## 1. The four questions

### 1. Why would a user *share*?
Not because we asked. People share when sharing **does something for *them***:

| Driver | In our product |
|---|---|
| **Identity signaling** | "I'm Team Messi" is a statement about who I am. Sharing = self-expression. |
| **Tribal defense** | My side is losing → sharing is *defending my tribe*, an act of loyalty. |
| **Winning an argument** | I can send live "proof" to someone who's wrong. Receipts. |
| **Status / clout** | A great share card / TikTok makes *me* look good to *my* audience. |
| **Competition** | My rank only goes up if I recruit. Sharing = playing the game. |
| **Reciprocity / belonging** | I joined a captain's army / a clan; recruiting helps *us*. |

The losing-side and the argument-ender are the two strongest — they're emotional and *recurring*.

### 2. Why would a friend *click*?
Links don't get clicked. **Curiosity gaps, rivalry, and named people** get clicked.

- **Direct challenge:** "I picked my GOAT. Bet you can't guess who. And bet you're wrong." (curiosity + rivalry)
- **Named social proof:** "[Carlos] challenged you" beats "someone shared a link" 10:1.
- **Drama / FOMO:** "Ronaldo just took the lead 🚨" — the score is *moving*, I need to see it.
- **National/group stakes:** "Argentina is 92% Messi — where do you stand?"
- **Low cognitive load:** a binary question. No reading. You already have an opinion. That's the genius.

### 3. Why would a friend *vote*?
Because **they already have an opinion and we removed every obstacle to expressing it.**

- **Zero friction:** no signup, no app, one tap, instant.
- **Pre-loaded emotion:** they clicked *because* they disagree → voting is the release.
- **Their side might be losing:** loss aversion converts a spectator into a participant instantly.
- **Instant gratification:** confetti, the counter moves, "you're now a Messi Supporter."

### 4. Why would a friend *share again*?
This is the whole ballgame — **the loop only compounds if the new voter becomes a new sharer.** So we make the *moment of voting* immediately hand them a reason to recruit:

- **Instant identity + rank:** "You're Messi Supporter #5,402,118. Your friends will out-rank you in minutes."
- **Their side needs them:** "Messi is losing by 0.3%. 12 friends could flip it."
- **The challenge reflex:** the second they vote, "Now challenge someone who disagrees."
- **A reward they can only get by inviting:** more votes, a spin, a badge, a rank.

> **Design law:** the share prompt must fire at the **peak of emotion — the instant the vote lands** —
> not on a separate "invite friends" screen nobody visits.

---

## 2. The equation we're optimizing

```
K (viral coefficient) = i × c
   i = invites sent per active user
   c = conversion per invite (click → vote)
Sustained growth requires K > 1.  Also minimize CYCLE TIME (invite → friend votes → friend invites).
```

We pull **four** levers, not one:

| Lever | Tactic family |
|---|---|
| ↑ **i** (invites/user) | make sharing the win condition; rewards-for-invites; captains; recurring drama triggers |
| ↑ **c** (conversion) | direct named challenges > broadcast links; curiosity gaps; rivalry; social proof; zero-friction vote |
| ↓ **cycle time** | hand the share prompt at the vote moment; real-time drama re-triggers |
| ↑ **frequency** | daily vote + streaks + live momentum notifications = many cycles per user, not one |

A user who completes the loop **5 times over their life** at K=0.4 per loop is worth more than one
who completes it once at K=0.9. **Frequency × K**, not K alone.

---

## 3. The 20+ viral loops

Each: **Trigger · Motivation · Reward · Friction · Expected viral impact** (impact 1–5 ⚡).

### L1 — The 1v1 Challenge (Duel) ⚡⚡⚡⚡⚡
- **Trigger:** immediately after voting → "Challenge someone who disagrees."
- **Motivation:** settle a real argument you already have with a specific person; rivalry.
- **Reward:** you see what they picked; head-to-head bragging; "you converted them."
- **Friction:** very low — pick a contact, send pre-written taunt.
- **Impact:** ⚡⚡⚡⚡⚡ Direct + named + rivalry = highest click-through of any loop. This is the spine.

### L2 — Losing-Side SOS ⚡⚡⚡⚡⚡
- **Trigger:** your faction falls behind / lead margin shrinks (live state).
- **Motivation:** loss aversion + tribal loyalty — *your side needs you*.
- **Reward:** watch the counter move after you rally; "you helped flip it."
- **Friction:** very low — one-tap "Rally my squad."
- **Impact:** ⚡⚡⚡⚡⚡ Recurring, emotional, tied to live drama. Re-fires forever.

### L3 — Rival Surge Drama (two-sided back-and-forth) ⚡⚡⚡⚡⚡
- **Trigger:** the *other* faction surges; lead flips.
- **Motivation:** FOMO + tribal anger — "they're winning, not on my watch."
- **Reward:** participate in live drama; pride when you push back.
- **Friction:** very low — notification → vote/share in one tap.
- **Impact:** ⚡⚡⚡⚡⚡ Creates a perpetual-motion rivalry between the two notification audiences.

### L4 — Country vs Country ⚡⚡⚡⚡⚡
- **Trigger:** on load → "🇦🇷 Argentina is 92% Messi. Defend your country."
- **Motivation:** national pride (football is nationalistic) — represent your flag.
- **Reward:** your country's rank on a global map; you moved your nation.
- **Friction:** low — geo auto-detected.
- **Impact:** ⚡⚡⚡⚡⚡ Football + nationalism is rocket fuel; creates dozens of parallel tribal battles.

### L5 — Unlock Votes by Inviting (Temu engine) ⚡⚡⚡⚡
- **Trigger:** out of daily votes / wanting more impact.
- **Motivation:** more influence on the score *without paying*.
- **Reward:** +5 votes for your side per 3 friends who vote.
- **Friction:** medium — friends must actually vote (qualified).
- **Impact:** ⚡⚡⚡⚡ Direct incentive; converts desire-for-impact into recruiting. Temu's core trick.

### L6 — Argument-Ender Receipts ⚡⚡⚡⚡⚡
- **Trigger:** real-world argument; "send to someone who's wrong."
- **Motivation:** win an argument with *data* — the live score is your proof.
- **Reward:** vindication; the share card *is* the scoreboard.
- **Friction:** very low.
- **Impact:** ⚡⚡⚡⚡⚡ Maps 1:1 onto the millions of organic Messi/Ronaldo arguments happening daily.

### L7 — TikTok/Reels Content Templates ⚡⚡⚡⚡⚡
- **Trigger:** lead change / post-vote → "Make a video: POV — Messi just took the lead."
- **Motivation:** easy clout; ready-made content for *their* audience.
- **Reward:** views/likes on *their* TikTok; we ride their distribution.
- **Friction:** low–medium — one-tap export with live-stat overlay + watermark/link.
- **Impact:** ⚡⚡⚡⚡⚡ Turns users into creators on external platforms → off-platform reach we don't pay for.

### L8 — Captain & Army (super-spreader) ⚡⚡⚡⚡
- **Trigger:** recruit your Nth friend → unlock "Captain"; invitees join "[Name]'s Army."
- **Motivation:** status (visible army size) for captain; belonging for recruits.
- **Reward:** public army count, captain badge, perks; recruits get a "home."
- **Friction:** medium.
- **Impact:** ⚡⚡⚡⚡ Concentrates virality in the few who spread most — 5% of users drive 50% of invites.

### L9 — GOAT Clans (Clash Royale) ⚡⚡⚡⚡
- **Trigger:** invited to / create a clan; clan totals compete on a ladder.
- **Motivation:** collective competition + belonging; persistent recruiting pressure from peers.
- **Reward:** clan rank, shared identity, clan-vs-clan wins.
- **Friction:** medium.
- **Impact:** ⚡⚡⚡⚡ Social obligation to teammates = durable, peer-enforced virality.

### L10 — Mystery Reveal / "Guess who I picked" ⚡⚡⚡⚡
- **Trigger:** post-vote share option: "Can you guess my GOAT? Open to find out."
- **Motivation:** curiosity gap (sender), curiosity (receiver).
- **Reward:** the reveal; then receiver is prompted to vote/guess back.
- **Friction:** low.
- **Impact:** ⚡⚡⚡⚡ Curiosity is one of the strongest click drivers; reciprocal by design.

### L11 — Faction War Seasons ⚡⚡⚡⚡
- **Trigger:** season approaching end; "48h left — Messi leads by 1.2%."
- **Motivation:** tribe wants to *win the season*; resettable stakes.
- **Reward:** winning-faction badge, permanent record, season MVP titles.
- **Friction:** low.
- **Impact:** ⚡⚡⚡⚡ Manufactures recurring climaxes → re-triggers virality after each spike decays.

### L12 — Daily + Squad Streaks (Duolingo) ⚡⚡⚡
- **Trigger:** daily reminder; streak about to break.
- **Motivation:** loss aversion (don't break the streak); squad multiplier if your recruits vote too.
- **Reward:** streak flame, vote multiplier, streak leaderboard.
- **Friction:** low.
- **Impact:** ⚡⚡⚡ Mostly retention/frequency, but squad-streak ties your loyalty to recruiting + keeping recruits active.

### L13 — Recruit-to-Rank ⚡⚡⚡⚡
- **Trigger:** view your supporter rank — "you only climb by recruiting."
- **Motivation:** status/competition; leaderboard climbing.
- **Reward:** rank up, MVP titles, public position.
- **Friction:** medium.
- **Impact:** ⚡⚡⚡⚡ Makes recruiting *the* progression mechanic, not a side quest.

### L14 — Live Lead-Flip Notification ⚡⚡⚡⚡
- **Trigger:** the global lead changes hands.
- **Motivation:** FOMO/drama — "the war just turned."
- **Reward:** re-engagement, the thrill, a reason to vote+share now.
- **Friction:** very low.
- **Impact:** ⚡⚡⚡⚡ High-frequency re-trigger during contested periods (which we can engineer to be frequent).

### L15 — Spin / Variable Daily Reward (Temu) ⚡⚡⚡
- **Trigger:** daily open; "invite a friend for an extra spin."
- **Motivation:** variable-reward dopamine; free bonus votes.
- **Reward:** random bonus votes/credits/badge shards.
- **Friction:** low.
- **Impact:** ⚡⚡⚡ Retention + light recruiting; cheap habit former.

### L16 — Prediction Layer (Polymarket-style, no cash) ⚡⚡⚡
- **Trigger:** "Predict the % at season end. Lock it in."
- **Motivation:** be right; skin in the game; identity as a "caller."
- **Reward:** accuracy badge, "I called it" share card, prediction leaderboard.
- **Friction:** medium.
- **Impact:** ⚡⚡⚡ Adds a second engagement axis + a *new* brag ("I predicted it") → fresh shares.

### L17 — Milestone Broadcast ("we did it") ⚡⚡⚡
- **Trigger:** total crosses 10M / a faction hits a record.
- **Motivation:** collective achievement; be part of history.
- **Reward:** commemorative badge; "I was there" share.
- **Friction:** low.
- **Impact:** ⚡⚡⚡ Periodic coordinated spike; strengthens tribe identity.

### L18 — Referral Reward on Friend's Purchase ⚡⚡⚡
- **Trigger:** an invited friend buys a vote pack.
- **Motivation:** incentive — their spend rewards *you*.
- **Reward:** bonus votes/credits to you.
- **Friction:** low (passive).
- **Impact:** ⚡⚡⚡ Aligns monetization with virality; motivates recruiting high-intent friends.

### L19 — Win-Back: "Your side needs you" ⚡⚡⚡
- **Trigger:** lapsed user + their faction now losing.
- **Motivation:** guilt + loyalty.
- **Reward:** rejoin the fight; restore streak.
- **Friction:** very low.
- **Impact:** ⚡⚡⚡ Reactivation loop; recovers decayed cohorts cheaply.

### L20 — Named Social-Proof Onboarding ⚡⚡⚡⚡
- **Trigger:** friend clicks your link → lands on "[Carlos] is Messi #3,201. Out-rank him."
- **Motivation:** rivalry with a *specific* known person; instant belonging.
- **Reward:** beat your friend; immediate identity.
- **Friction:** very low.
- **Impact:** ⚡⚡⚡⚡ Not a loop itself but a **conversion multiplier (↑c)** on every other loop. Huge.

### L21 — Vanity Profile / Bio Link ⚡⚡⚡
- **Trigger:** claim `goatvote.com/u/yourname` after voting.
- **Motivation:** ownership/vanity; a flex to put in your social bio.
- **Reward:** a personal, embeddable supporter page with live stats.
- **Friction:** low.
- **Impact:** ⚡⚡⚡ Passive evergreen distribution via bios/profiles.

### L22 — Group-Chat Bomb (broadcast share) ⚡⚡⚡⚡
- **Trigger:** post-vote → "Drop this in your group chat."
- **Motivation:** start chaos among friends; everyone has an opinion.
- **Reward:** the chat erupts; you started it; live score settles it.
- **Friction:** very low — WhatsApp/iMessage/Telegram one-tap.
- **Impact:** ⚡⚡⚡⚡ Group chats are the densest social graph; one share → many votes.

### L23 — Badge-Gated Status (social-proof unlock) ⚡⚡⚡
- **Trigger:** progress bar near completion — "1 more invite for GOAT Ambassador."
- **Motivation:** completion + rare status.
- **Reward:** prestige badge displayed on profile/share card.
- **Friction:** medium.
- **Impact:** ⚡⚡⚡ Pulls users over the line right at the share moment.

### L24 — City/School/Club Micro-Tribes ⚡⚡⚡⚡
- **Trigger:** "Your city is 60% Ronaldo. Represent." (or school, or favorite club's fans)
- **Motivation:** local pride; smaller pond = easier to be a hero.
- **Reward:** local leaderboard top spot; local bragging rights.
- **Friction:** low.
- **Impact:** ⚡⚡⚡⚡ Infinite parallel small battles → many people can be "#1 somewhere" (status abundance).

---

## 4. Loop scoring → the chosen spine

Ranked by **impact × frequency × low-friction**:

| Tier | Loops | Why |
|---|---|---|
| **THE SPINE (build first)** | L1 Duel, L2 Losing-Side SOS, L3 Rival Surge, L6 Argument-Ender, L7 TikTok Templates, L22 Group-Chat Bomb, L20 Named Onboarding | Highest click-through, emotional, recurring, exploit existing real-world arguments, externalize reach |
| **TRIBE ENGINE** | L4 Country, L24 Micro-Tribes, L8 Captains, L9 Clans, L11 Seasons | Create *many* parallel battles + super-spreaders + recurring climaxes |
| **FREQUENCY/RETENTION** | L12 Streaks, L14 Lead-Flip, L15 Spin, L19 Win-Back | Maximize *number of cycles* per user |
| **INCENTIVE** | L5 Unlock-by-Invite, L13 Recruit-to-Rank, L18 Purchase-reward, L23 Badge-gate | Convert desire-for-impact/status into invites |
| **SECONDARY** | L10 Mystery, L16 Prediction, L17 Milestone, L21 Vanity | Add engagement axes + fresh brag reasons |

**The non-negotiable insight:** L1 + L2 + L3 + L6 + L22 all fire off the **same two emotions**
(rivalry, tribal loss-aversion) at the **same moment** (the vote / a live state change). Build that
moment exceptionally well and 80% of the virality is there.

---

## 5. Product redesign around the spine

### 5.1 New core experience: "Pick a side, then go to war"

```
LAND (via named challenge / country stat / drama notif / group chat)
  → Instant emotional hook: "[Carlos] says Ronaldo is the GOAT. Prove him wrong." 🔥
  → ONE-TAP VOTE (no signup) → confetti + "You're Messi Soldier #5,402,118"
  → PEAK-EMOTION SHARE WALL (this is now the main screen, not an afterthought):
       ① ⚔️ Challenge whoever's wrong   (L1)  ← default, biggest button
       ② 💣 Drop in your group chat     (L22)
       ③ 🎬 Make a TikTok               (L7)
       ④ 🚨 Your side is losing — rally (L2, shown when behind)
  → Each share unlocks a tangible reward (votes / rank / streak / spin)  (L5/L13/L15)
  → Live drama keeps re-pulling them back (L3/L14) → loop repeats at high frequency
```

The **share wall replaces the "thank you for voting" screen.** Voting is no longer the destination;
it's the on-ramp to recruiting.

### 5.2 Identity redesign (status > points)
- You are a **Soldier → Recruiter → Captain → General** (military progression tied to recruits).
- Your **rank only rises by recruiting** (L13). Points from your own votes are cosmetic.
- Your **army** (people you recruited) is your visible asset and flex.
- You belong to nested tribes: **Faction → Country → City → Clan** — so almost everyone can be **#1 somewhere** (L4/L24). Status abundance keeps the long tail engaged.

### 5.3 The drama engine (the recurring re-trigger)
The score must *feel alive and contested*. Operationally:
- Surface **live momentum** ("Ronaldo +0.3% in the last hour") prominently.
- Notification system fires on: lead flip (L14), your side falling behind (L2), rival surge (L3),
  season ending (L11), milestone (L17), streak risk (L12), your recruit voted, friend out-ranked you.
- **Keep the race close in copy/visualization** even when totals are large — a blowout kills urgency,
  a knife-edge maximizes it. (Honest totals; emphasize the *recent* delta and the *local* battle.)

### 5.4 Onboarding redesign (↑ conversion, L20)
A clicked link **never** lands on a generic homepage. It lands on a **personalized battle context:**
- "[Carlos] (Messi #3,201) challenged you. He thinks you're wrong."
- Pre-loads the rivalry → vote in one tap → immediately handed the share wall.
- The new voter is *already* set up to challenge someone back before the dopamine fades.

### 5.5 Reward redesign (invites buy impact, L5)
- The thing everyone wants is **impact on the score**. Sell it for *recruiting*, not just money:
  3 friends vote → +5 votes for your side; a Captain's army votes → faction multiplier.
- This keeps the **free** path viral while the **paid** path (packs) monetizes the impatient — and
  L18 ties the two together (your recruit's purchase rewards you).

### 5.6 What we de-prioritize
- Static leaderboards as a *destination* (keep them, but they're not the hook).
- "Share your referral link" as a discrete screen — **dissolve it into the vote moment.**
- Neutral/poll framing anywhere — every surface takes a side and picks a fight.

---

## 6. The reframed funnel & targets

```
Reach (named challenge / TikTok / group chat / country hook)
  → CLICK  (curiosity + rivalry + named proof)        target CTR ≥ 35%
  → VOTE   (zero friction, pre-loaded emotion)         target click→vote ≥ 60%
  → SHARE  (peak-emotion share wall is the main screen) target vote→share ≥ 40%
  → invites per sharer × downstream conversion = K
```

K math we're aiming for at peaks:
`i ≈ 3 invites/sharer × 0.4 sharer-rate × c ≈ 0.45 conversion` → **K ≈ 0.5–1.3**, and crucially
**5–15 loop cycles/user** via the daily drama engine → cumulative spread ≫ one-shot.

| Metric | Why it's the one to watch |
|---|---|
| **K-factor** (by channel: duel vs group-chat vs TikTok) | the engine |
| **Cycle time** (invite → friend's first vote) | compounding speed |
| **Loops per user per week** | frequency multiplier on K |
| **Share-wall CTR** (vote → share action) | the redesign's core bet |
| **Named-link conversion vs broadcast-link** | proves L1/L20 thesis |
| **TikTok/off-platform attributed arrivals** | unpaid external reach |
| **Captain concentration** (% invites from top 5% users) | super-spreader health |

---

## 7. Risks & integrity (growth without self-destruction)

| Risk | Mitigation |
|---|---|
| **Notification fatigue / annoyance** | Cap frequency; make every notif *dramatic and earned* (real state change), not spammy; smart quiet hours; let users pick their faction's "war alerts" only. |
| **Platform spam bans** (WhatsApp/TikTok flag us) | No automated mass-DMs; user-initiated shares only; high-quality native content (L7) not link spam; vary share assets. |
| **Virality decay after the spike** | Seasons (L11), milestones (L17), prediction layer (L16), and the perpetual rival-surge engine (L3) manufacture fresh climaxes. |
| **Blowout kills urgency** | Emphasize *recent momentum* and *local battles* (L4/L24) so there's always a close fight somewhere. |
| **Integrity / "is the score fake?"** | The total stays real (per anti-fraud doc). Drama comes from *framing* the real data, never fabricating it. Trust is the moat. |
| **Dark-pattern backlash** | Guilt/loss-aversion are fine; deception isn't. No fake "friend voted" notifications, no fake scarcity. Long-term trust > one viral week. |
| **Reward inflation** (vote-unlocks debase the score) | Cap free unlocks; keep them modest vs the global total; disclose; quarantine farmed invites (anti-fraud). |

---

## 8. Build priority (growth-first sequencing)

1. **Vote → Share Wall** with L1 (Duel) + L22 (Group-chat) + L20 (Named onboarding). *This alone is the MVP of virality.*
2. **Live drama engine** + notifications: L2 (Losing-side), L3 (Rival surge), L14 (Lead-flip).
3. **L7 TikTok templates** (off-platform reach) + L6 argument-ender share cards.
4. **Tribe layer:** L4 Country + L24 Micro-tribes + L13 Recruit-to-Rank identity.
5. **Incentive layer:** L5 Unlock-by-invite + L15 Spin + L12 Streaks.
6. **Super-spreaders & retention seasons:** L8 Captains, L9 Clans, L11 Seasons.
7. **Secondary axes:** L16 Prediction, L18 purchase-reward, L21 vanity, L17 milestones, L19 win-back.

Ship 1–2, measure share-wall CTR and named-link conversion, then layer the rest. **Instrument K per
loop and kill anything below K-contribution threshold.** Growth is empirical — these are hypotheses,
the dashboard is the judge.
