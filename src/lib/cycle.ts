/**
 * cycle.ts — weekly battle cycle. Pure, deterministic, NO backend.
 *
 * Every client computes the SAME week number and the SAME end time from one fixed
 * epoch, so "Week 7" and the countdown are globally consistent without a server.
 * A battle is exactly 7 days; the next cycle begins the instant the last one ends.
 */

export const CYCLE_MS = 7 * 24 * 60 * 60 * 1000; // exactly 7 days

// Anchor: Mon 2024-01-01 00:00:00 UTC (a Monday) = start of Week 1.
export const CYCLE_EPOCH = Date.UTC(2024, 0, 1);

export type Cycle = {
  week: number; // 1-based week number since epoch — "Week N"
  index: number; // 0-based cycle index
  startTime: number; // ms epoch — battleStartTime
  endTime: number; // ms epoch — battleEndTime = start + 7 days
  msRemaining: number; // time left in THIS cycle (never negative)
};

/** Resolve which 7-day cycle `now` falls in, plus its start/end and time left. */
export function getCycle(now: number): Cycle {
  const index = Math.floor((now - CYCLE_EPOCH) / CYCLE_MS);
  const startTime = CYCLE_EPOCH + index * CYCLE_MS;
  const endTime = startTime + CYCLE_MS;
  return { week: index + 1, index, startTime, endTime, msRemaining: Math.max(0, endTime - now) };
}

/** "3d 14h 22m 10s" — always D/H/M/S, clamped at zero. */
export function formatCountdown(ms: number): string {
  const t = Math.max(0, ms);
  const s = Math.floor(t / 1000) % 60;
  const m = Math.floor(t / 60000) % 60;
  const h = Math.floor(t / 3600000) % 24;
  const d = Math.floor(t / 86400000);
  return `${d}d ${h}h ${m}m ${s}s`;
}

/**
 * Deterministic per-week seed for the mock scoreboard, so each new cycle opens
 * with a fresh-but-tight race instead of always the same numbers. Pure function
 * of the week → identical on every device for the same week.
 */
export function weekSeed(week: number): { messi: number; ronaldo: number } {
  const base = 480000 + ((week * 37) % 40) * 1000; // ~480k–519k
  const messi = base + ((week * 7919) % 45000);
  const ronaldo = base + ((week * 6271) % 45000);
  return { messi, ronaldo };
}
