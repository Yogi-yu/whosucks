"use client";

/**
 * Minimal viral attribution — no backend, no analytics SDK, no dashboards.
 *
 * Two ideas only:
 *   1. Inbound  — capture `?ref=xxx` on landing (who referred ME). First-touch wins.
 *   2. Outbound — every device gets its own stable referral code, baked into the
 *                 share link so the next hop is attributable to this user.
 *
 * Events are emitted as a single tagged console line AND buffered in localStorage,
 * so K-factor is computable by scraping logs or reading `goat-battle:events` —
 * without standing up any infrastructure.
 *
 *   K  ≈  invites_per_user × conversion_rate
 *      =  (referral_created / unique users) × (vote w/ ref / landing_view w/ ref)
 */

const VARIANT_KEY = "goat-battle:variant"; // sticky A/B share-copy assignment
const REF_KEY = "goat-battle:ref"; // who referred ME (inbound ?ref) — first-touch
const MYREF_KEY = "goat-battle:myref"; // MY own code, propagated in share links
const CREATED_KEY = "goat-battle:ref-created"; // guards one-time referral_created
const LOG_KEY = "goat-battle:events"; // local ring buffer of events
const LOG_TAG = "[goat-event]"; // grep this in logs to compute K-factor
const LOG_MAX = 200;

export type ShareVariant = "A" | "B";

export type AnalyticsEvent =
  | "landing_view"
  | "vote_started"
  | "vote_messi"
  | "vote_ronaldo"
  | "success_view"
  | "share_click"
  | "referral_created";

const hasWindow = () => typeof window !== "undefined";

function randomCode(): string {
  return Math.random().toString(36).slice(2, 8);
}

// --- inbound referral (who referred ME) -------------------------------------

/** Read `?ref=xxx` from the current URL (client only). */
export function readRefFromUrl(): string | null {
  if (!hasWindow()) return null;
  const raw = new URLSearchParams(window.location.search).get("ref");
  if (!raw) return null;
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32) || null; // basic hygiene
}

/**
 * Capture an inbound ref on landing and persist it (first-touch attribution —
 * we never overwrite an existing referrer). Returns the stored ref, if any.
 */
export function captureRef(): string | null {
  if (!hasWindow()) return null;
  const existing = localStorage.getItem(REF_KEY);
  if (existing) return existing;
  const incoming = readRefFromUrl();
  if (incoming) {
    localStorage.setItem(REF_KEY, incoming);
    return incoming;
  }
  return null;
}

export function getRef(): string | null {
  if (!hasWindow()) return null;
  return localStorage.getItem(REF_KEY);
}

// --- A/B share-copy assignment ----------------------------------------------

/**
 * Sticky 50/50 variant per device. Assigned once, then stable for every session
 * so a user never sees mixed A/B copy. Tag this onto share_click to measure.
 */
export function getVariant(): ShareVariant {
  if (!hasWindow()) return "A";
  const stored = localStorage.getItem(VARIANT_KEY);
  if (stored === "A" || stored === "B") return stored;
  const assigned: ShareVariant = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(VARIANT_KEY, assigned);
  return assigned;
}

// --- outbound referral (MY code) --------------------------------------------

/** Stable per-device referral code used in MY share links. Created on first use. */
export function getMyRef(): string {
  if (!hasWindow()) return "";
  let code = localStorage.getItem(MYREF_KEY);
  if (!code) {
    code = randomCode();
    localStorage.setItem(MYREF_KEY, code);
  }
  return code;
}

/**
 * Origin-aware share URL carrying MY referral code → attributes the next hop.
 * Client: uses the live origin (correct on any domain). SSR/fallback: the
 * production URL from NEXT_PUBLIC_SITE_URL (set in Vercel), so links are never
 * stamped with a localhost or placeholder host.
 */
export function buildShareUrl(): string {
  const fallback =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://goatbattle.app";
  const origin = hasWindow() ? window.location.origin : fallback;
  return `${origin}/?ref=${getMyRef()}`;
}

/**
 * Mark this device as a spreader exactly once (the moment its share link first
 * exists). This is the numerator of "invites per user" in the K-factor.
 */
export function createReferral(): string {
  const code = getMyRef();
  if (hasWindow() && !localStorage.getItem(CREATED_KEY)) {
    localStorage.setItem(CREATED_KEY, "1");
    track("referral_created", { myRef: code });
  }
  return code;
}

// --- event log ---------------------------------------------------------------

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}): void {
  if (!hasWindow()) return;
  const payload = {
    event,
    ts: new Date().toISOString(),
    ref: getRef(), // who referred this user (inbound)
    myRef: localStorage.getItem(MYREF_KEY) ?? null, // this user's own code
    ...props,
  };

  // 1. tagged console line — scrape `[goat-event]` from logs
  console.log(LOG_TAG, JSON.stringify(payload));

  // 2. capped local buffer — dump `goat-battle:events` to compute K-factor offline
  try {
    const log = JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]");
    log.push(payload);
    localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-LOG_MAX)));
  } catch {
    /* quota / parse — drop silently */
  }
}
