/**
 * metrics.ts — SINGLE SOURCE OF TRUTH for viral measurement.
 *
 * Every share rate, invite conversion, and K-factor in the app is produced by
 * computeMetrics() and ONLY by computeMetrics(). The global cards and each A/B
 * variant call the identical function on different slices of the same event
 * array, so there is exactly one formula in the codebase — two engineers reading
 * this file compute identical numbers.
 *
 * ── Canonical user lifecycle ────────────────────────────────────────────────
 *   landing_view (optionally ?ref)
 *      → vote_messi | vote_ronaldo
 *         → share_click            (the ONLY propagation-intent event)
 *            → new landing_view (?ref)   ← "referred landing", DERIVED below
 *
 * ── Canonical metrics (no fallbacks, no proxies, no synthetic events) ────────
 *   Share Rate        = share_click       / vote
 *   Invite Conversion = referred_landings / share_click
 *   K-Factor          = Share Rate × Invite Conversion   (= referred_landings / vote)
 *
 *   • referred_landings is DERIVED here (a landing_view that carried a ?ref) — it
 *     is NOT a stored event type.
 *   • referral_created is deprecated and intentionally NOT referenced anywhere in
 *     this file. It must never feed a metric.
 *
 * ── Insufficient data, never a guess ────────────────────────────────────────
 *   A ratio whose denominator is 0 is `null` ("insufficient data"). There are no
 *   fallback estimates. K is the literal product of the two displayed ratios, so
 *   if either is `null`, K is `null` — the dashboard shows "—", not a proxy.
 */

export type MetricEvent = {
  event: string;
  ts: string | number;
  ref?: string | null;
  myRef?: string | null;
  variant?: unknown;
  [k: string]: unknown;
};

export const VOTE_EVENTS = ["vote_messi", "vote_ronaldo"] as const;

/** Behavioral decision event (either side). */
export function isVoteEvent(e: MetricEvent): boolean {
  return (VOTE_EVENTS as readonly string[]).includes(e.event);
}

/** DERIVED, not stored: a landing_view that arrived with a ?ref. */
export function isReferredLanding(e: MetricEvent): boolean {
  return e.event === "landing_view" && !!e.ref;
}

export type CanonicalMetrics = {
  // raw counts — each directly traceable to events
  landingViews: number;
  votes: number;
  shares: number;
  referredLandings: number;
  // canonical ratios — null === insufficient data (denominator is 0)
  shareRate: number | null; // shares / votes
  inviteConversion: number | null; // referredLandings / shares
  k: number | null; // shareRate × inviteConversion (= referredLandings / votes)
};

/**
 * The one and only metric computation. Pass the full event log for global
 * numbers, or a variant-filtered slice for per-variant numbers — same formula.
 */
export function computeMetrics(events: MetricEvent[]): CanonicalMetrics {
  const landingViews = events.filter((e) => e.event === "landing_view").length;
  const votes = events.filter(isVoteEvent).length;
  const shares = events.filter((e) => e.event === "share_click").length;
  const referredLandings = events.filter(isReferredLanding).length;

  const shareRate = votes > 0 ? shares / votes : null;
  const inviteConversion = shares > 0 ? referredLandings / shares : null;

  // K is the LITERAL product of the two ratios above. When shares > 0 this equals
  // referredLandings / votes; when shares === 0 invite conversion is unmeasurable,
  // so K is null (insufficient) rather than a fabricated number.
  const k =
    shareRate !== null && inviteConversion !== null ? shareRate * inviteConversion : null;

  return { landingViews, votes, shares, referredLandings, shareRate, inviteConversion, k };
}

/** Format a 0..1 ratio as a percent, or "—" when insufficient (null). */
export function fmtRatioPct(r: number | null): string {
  return r === null ? "—" : `${(r * 100).toFixed(0)}%`;
}

/** Format a K-factor (can exceed 1), or "—" when insufficient (null). */
export function fmtK(k: number | null): string {
  return k === null ? "—" : k.toFixed(2);
}
