import { Side } from "./types";

// Seed a TIGHT race (52 / 48) — the closer it feels, the more it matters.
export const INITIAL_MESSI = 520000;
export const INITIAL_RONALDO = 480000;

export const FACTION_LABEL: Record<Side, string> = {
  messi: "MESSI",
  ronaldo: "RONALDO",
};

// Deterministic seed for the "votes in the last 60s" social-proof signal.
// Used as the SSR/first-render value so it stays hydration-safe; the live tick
// overwrites it within ~2.5s. (Pure mock — no real counts, no backend.)
export const SEED_VOTES_PER_MIN = 740;
