"use client";

/**
 * /dashboard — Experiment Dashboard (INTERNAL, read-only).
 *
 * Visualizes the events already collected in localStorage ("goat-battle:events").
 * No backend, no aggregation layer, no tracking of its own — it only READS.
 */

import { useCallback, useEffect, useState } from "react";

const LOG_KEY = "goat-battle:events";
const VARIANT_KEY = "goat-battle:variant";

type RawEvent = {
  event: string;
  ts: string | number;
  ref?: string | null;
  myRef?: string | null;
  variant?: unknown;
  [k: string]: unknown;
};

type Variant = "A" | "B";

/** Accepts both this device's ISO-string events and pasted numeric-ts events. */
function isValidEvent(e: unknown): e is RawEvent {
  return (
    !!e &&
    typeof e === "object" &&
    typeof (e as RawEvent).event === "string" &&
    (typeof (e as RawEvent).ts === "string" || typeof (e as RawEvent).ts === "number")
  );
}

/** Dedup key — (event + ts + variant). Identical events merge to one. */
function eventKey(e: RawEvent): string {
  return `${e.event}|${e.ts}|${typeof e.variant === "string" ? e.variant : ""}`;
}

/**
 * Tolerantly extract every top-level JSON array from pasted text, so a founder
 * can paste several `goat-battle:events` arrays at once (newline-separated) or
 * one at a time. Balanced-bracket scan; unparseable chunks are skipped.
 */
function extractEvents(text: string): RawEvent[] {
  const out: RawEvent[] = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "[") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "]") {
      depth--;
      if (depth <= 0 && start >= 0) {
        try {
          const parsed = JSON.parse(text.slice(start, i + 1));
          if (Array.isArray(parsed)) out.push(...parsed.filter(isValidEvent));
        } catch {
          /* skip malformed chunk */
        }
        start = -1;
        depth = 0;
      }
    }
  }
  return out;
}

const VOTE_EVENTS = ["vote_messi", "vote_ronaldo"];

const VARIANT_INFO: Record<Variant, { name: string }> = {
  A: { name: "CONFRONTATION" },
  B: { name: "TRIBAL DEFENSE" },
};

/** The variant tagged on an event, if it's a valid A/B literal. */
function eventVariant(e: RawEvent): Variant | null {
  return e.variant === "A" ? "A" : e.variant === "B" ? "B" : null;
}

/**
 * Variant is device-sticky (assigned once in localStorage), so EVERY event in
 * this log belongs to one variant — but only share_click carries the tag.
 * Resolve the device's variant from a tagged event, falling back to the stored
 * assignment key. This lets us bucket untagged vote/landing events correctly.
 */
function resolveDeviceVariant(events: RawEvent[]): Variant | null {
  for (let i = events.length - 1; i >= 0; i--) {
    const v = eventVariant(events[i]);
    if (v) return v;
  }
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(VARIANT_KEY);
    if (stored === "A" || stored === "B") return stored;
  }
  return null;
}

type VariantMetrics = {
  votes: number;
  shares: number;
  shareRate: number; // 0..1
  inviteConversion: number; // 0..1
  k: number;
};

function variantMetrics(
  events: RawEvent[],
  v: Variant,
  deviceVariant: Variant | null,
): VariantMetrics {
  // effective variant: own tag if present, else the device's sticky variant
  const effective = (e: RawEvent): Variant | null => eventVariant(e) ?? deviceVariant;
  const evs = events.filter((e) => effective(e) === v);

  const votes = evs.filter((e) => VOTE_EVENTS.includes(e.event)).length;
  const shares = evs.filter((e) => e.event === "share_click").length;
  const referredLandings = evs.filter((e) => e.event === "landing_view" && e.ref).length;
  const referredVotes = evs.filter((e) => VOTE_EVENTS.includes(e.event) && e.ref).length;

  const shareRate = votes > 0 ? shares / votes : 0;
  const inviteConversion = referredLandings > 0 ? referredVotes / referredLandings : 0;
  return { votes, shares, shareRate, inviteConversion, k: shareRate * inviteConversion };
}

function readEvents(): RawEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEvent); // keep only well-formed records
  } catch {
    return [];
  }
}

function pct(num: number, den: number): number {
  return den > 0 ? (num / den) * 100 : 0;
}

function kLabel(k: number): { text: string; color: string } {
  if (k > 1.0) return { text: "VIRAL POTENTIAL", color: "text-win" };
  if (k >= 0.8) return { text: "STRONG", color: "text-gold" };
  if (k >= 0.5) return { text: "MODERATE", color: "text-ronaldo" };
  return { text: "WEAK", color: "text-lose" };
}

export default function DashboardPage() {
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [ready, setReady] = useState(false);
  const [mergeText, setMergeText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setEvents(readEvents());
    setReady(true);
  }, []);

  // client-only read (avoids SSR/hydration mismatch)
  useEffect(() => {
    refresh();
  }, [refresh]);

  function flashToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }

  // Pure additive, in-memory merge — never writes localStorage.
  function mergeData() {
    const incoming = extractEvents(mergeText);
    if (incoming.length === 0) {
      flashToast("No valid events found in paste");
      return;
    }
    const seen = new Set(events.map(eventKey));
    const additions: RawEvent[] = [];
    for (const e of incoming) {
      const k = eventKey(e);
      if (!seen.has(k)) {
        seen.add(k); // dedup vs existing AND within the paste
        additions.push(e);
      }
    }
    setEvents([...events, ...additions]);
    setMergeText("");
    flashToast(
      additions.length > 0
        ? `Data merged successfully — +${additions.length} new events`
        : "Nothing new — all events were duplicates",
    );
  }

  const count = (type: string) => events.filter((e) => e.event === type).length;

  // --- funnel ---------------------------------------------------------------
  const landingViews = count("landing_view");
  const voteStarts = count("vote_started");
  const votesCompleted = events.filter((e) => VOTE_EVENTS.includes(e.event)).length;
  const shareClicks = count("share_click");
  const referralCreated = count("referral_created");

  const landingToVote = pct(votesCompleted, landingViews);
  const voteToShare = pct(shareClicks, votesCompleted);
  const shareToReferral = pct(referralCreated, shareClicks);

  // --- K-factor -------------------------------------------------------------
  // users ≈ landing views (device loads) — best no-auth proxy available
  const users = landingViews;
  const sharesPerUser = users > 0 ? shareClicks / users : 0;

  // invite conversion = referred landings that complete a vote
  const referredLandings = events.filter((e) => e.event === "landing_view" && e.ref).length;
  const referredVotes = events.filter((e) => VOTE_EVENTS.includes(e.event) && e.ref).length;
  // fall back to overall landing→vote when no referred traffic has arrived yet
  const inviteConversion =
    referredLandings > 0 ? referredVotes / referredLandings : landingToVote / 100;

  const k = sharesPerUser * inviteConversion;
  const label = kLabel(k);

  // --- A/B experiment -------------------------------------------------------
  const deviceVariant = resolveDeviceVariant(events);
  const metricsA = variantMetrics(events, "A", deviceVariant);
  const metricsB = variantMetrics(events, "B", deviceVariant);
  const shareWinner: Variant | null =
    metricsA.shareRate === metricsB.shareRate ? null : metricsA.shareRate > metricsB.shareRate ? "A" : "B";
  const kWinner: Variant | null =
    metricsA.k === metricsB.k ? null : metricsA.k > metricsB.k ? "A" : "B";

  // --- event log (newest first, last 20) ------------------------------------
  const recent = [...events].slice(-20).reverse();

  const funnel = [
    { name: "Landing Views", value: landingViews },
    { name: "Vote Starts", value: voteStarts },
    { name: "Votes Completed", value: votesCompleted },
    { name: "Share Clicks", value: shareClicks },
    { name: "Referral Created", value: referralCreated },
  ];
  const funnelMax = Math.max(...funnel.map((f) => f.value), 1);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-8">
      {/* header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase tracking-tight text-gold">
            Experiment Dashboard
          </h1>
          <button
            onClick={refresh}
            className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-bold uppercase text-muted active:scale-95"
          >
            ↻ Refresh
          </button>
        </div>
        <p className="mt-1 text-xs text-muted">
          Data is client-side only (no backend aggregation).
        </p>
      </div>

      {/* IMPORT PANEL — always available, even on an empty dashboard */}
      <section className="mb-5 rounded-2xl border border-dashed border-gold/40 bg-surface/50 p-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gold">
          Paste Experiment Logs
        </h2>
        <p className="mb-2 mt-1 text-[11px] text-muted">
          Paste one or more testers&apos; <code className="text-gold">goat-battle:events</code>{" "}
          arrays. Additive &amp; deduped — never overwrites your data.
        </p>
        <textarea
          value={mergeText}
          onChange={(e) => setMergeText(e.target.value)}
          rows={4}
          placeholder='[ { "event": "vote_messi", "ts": 123, "variant": "A" }, ... ]'
          className="w-full resize-y rounded-lg border border-hairline bg-surface-2 p-2 font-mono text-[11px] text-white placeholder:text-muted/50 focus:border-gold focus:outline-none"
        />
        <button
          onClick={mergeData}
          disabled={!mergeText.trim()}
          className="mt-2 w-full rounded-lg bg-gradient-to-r from-gold to-gold-deep py-2 text-sm font-black uppercase tracking-wide text-ink disabled:opacity-40"
        >
          Merge Data
        </button>
      </section>

      {!ready ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-hairline bg-surface/60 p-5 text-sm text-muted">
          No events recorded yet on this device. Open <code className="text-gold">/</code>, vote,
          and share — then refresh.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* K-FACTOR CARD */}
          <section className="rounded-2xl border border-hairline bg-surface/70 p-5 shadow-glow-gold">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted">K-Factor</h2>
              <span className={`text-xs font-black uppercase ${label.color}`}>{label.text}</span>
            </div>
            <p className={`mt-1 text-5xl font-black ${label.color}`}>{k.toFixed(2)}</p>
            <p className="mt-2 text-xs text-muted">
              shares/user <span className="font-bold text-white">{sharesPerUser.toFixed(2)}</span> ×
              invite conv.{" "}
              <span className="font-bold text-white">{(inviteConversion * 100).toFixed(0)}%</span>
            </p>
            <div className="mt-3 grid grid-cols-4 gap-1 text-[10px] font-bold uppercase">
              <span className={k < 0.5 ? "text-lose" : "text-muted/50"}>&lt;0.5 weak</span>
              <span className={k >= 0.5 && k < 0.8 ? "text-ronaldo" : "text-muted/50"}>
                .5 mod
              </span>
              <span className={k >= 0.8 && k <= 1 ? "text-gold" : "text-muted/50"}>.8 strong</span>
              <span className={k > 1 ? "text-win" : "text-muted/50"}>&gt;1 viral</span>
            </div>
          </section>

          {/* FUNNEL CARD */}
          <section className="rounded-2xl border border-hairline bg-surface/70 p-5">
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-muted">Funnel</h2>
            <div className="flex flex-col gap-3">
              {funnel.map((f) => (
                <div key={f.name}>
                  <div className="mb-1 flex justify-between text-sm font-bold">
                    <span>{f.name}</span>
                    <span className="text-white">{f.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-messi to-gold"
                      style={{ width: `${pct(f.value, funnelMax)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-hairline pt-4 text-center">
              <div>
                <p className="text-lg font-black text-white">{landingToVote.toFixed(0)}%</p>
                <p className="text-[10px] uppercase text-muted">Landing→Vote</p>
              </div>
              <div>
                <p className="text-lg font-black text-white">{voteToShare.toFixed(0)}%</p>
                <p className="text-[10px] uppercase text-muted">Vote→Share</p>
              </div>
              <div>
                <p className="text-lg font-black text-white">{shareToReferral.toFixed(0)}%</p>
                <p className="text-[10px] uppercase text-muted">Share→Referral</p>
              </div>
            </div>
          </section>

          {/* A/B EXPERIMENT CARD */}
          <section className="rounded-2xl border border-hairline bg-surface/70 p-5">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted">
              A/B Experiment Results
            </h2>
            <p className="mb-4 text-sm font-bold text-white">Which message drives virality?</p>

            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { v: "A", m: metricsA, accent: "text-messi", border: "border-messi/50" },
                  { v: "B", m: metricsB, accent: "text-ronaldo", border: "border-ronaldo/50" },
                ] as const
              ).map(({ v, m, accent, border }) => (
                <div key={v} className={`rounded-xl border ${border} bg-surface-2/40 p-3`}>
                  <p className={`text-lg font-black ${accent}`}>Variant {v}</p>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                    {VARIANT_INFO[v].name}
                  </p>
                  <Metric
                    label="Share Rate"
                    value={`${(m.shareRate * 100).toFixed(0)}%`}
                    sub={`${m.shares}/${m.votes}`}
                    badge={shareWinner === v ? { text: "WIN", cls: "bg-win/20 text-win" } : null}
                  />
                  <Metric
                    label="Invite Conv."
                    value={`${(m.inviteConversion * 100).toFixed(0)}%`}
                  />
                  <Metric
                    label="Est. K"
                    value={m.k.toFixed(2)}
                    badge={kWinner === v ? { text: "WIN", cls: "bg-gold/20 text-gold" } : null}
                  />
                </div>
              ))}
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-muted/70">
              Each device is one sticky variant, so a single browser fills only its own column.
              True cross-user A/B needs the event logs aggregated (no backend here).
            </p>
          </section>

          {/* EVENT LOG CARD */}
          <section className="rounded-2xl border border-hairline bg-surface/70 p-5">
            <h2 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-muted">
              Live Event Log · last 20
            </h2>
            <ul className="flex flex-col divide-y divide-hairline">
              {recent.map((e, i) => (
                <li key={i} className="flex items-center justify-between py-2 text-xs">
                  <span className="font-mono font-bold text-gold">[{e.event}]</span>
                  <span className="text-muted">{formatTs(e.ts)}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="pb-6 text-center text-[10px] uppercase tracking-widest text-muted/60">
            Internal analytics · not a product page
          </p>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-0 bottom-8 z-50 mx-auto w-fit max-w-[90%] rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink shadow-glow-gold">
          {toast}
        </div>
      )}
    </main>
  );
}

function Metric({
  label,
  value,
  sub,
  badge,
}: {
  label: string;
  value: string;
  sub?: string;
  badge?: { text: string; cls: string } | null;
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-1">
      <span className="text-[11px] uppercase text-muted">{label}</span>
      <span className="flex items-center gap-1.5">
        {sub && <span className="text-[10px] text-muted/60">{sub}</span>}
        <span className="text-sm font-black text-white">{value}</span>
        {badge && (
          <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase ${badge.cls}`}>
            {badge.text}
          </span>
        )}
      </span>
    </div>
  );
}

function formatTs(ts: string | number): string {
  const d = new Date(ts);
  if (isNaN(d.getTime())) return String(ts); // malformed timestamp → show raw
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
