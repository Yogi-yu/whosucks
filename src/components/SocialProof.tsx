"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/AppContext";
import { FACTION_LABEL } from "@/lib/mockData";
import { formatNumber } from "@/lib/format";

/**
 * Read-only social-proof + FOMO layer. Pure UI over existing AppContext signals —
 * no backend, no real counts, no analytics. Three stacked cues, each reinforcing
 * "this is happening RIGHT NOW and I might miss it":
 *
 *   1. participation density  — live headcount + votes/60s
 *   2. momentum FOMO          — which way the war is tilting (or "too close to call")
 *   3. live activity signal   — subtle pulsing micro-text
 *
 * Lightweight: no own timers/state — it just renders whatever the shared tick emits.
 */
export default function SocialProof({ className = "" }: { className?: string }) {
  const { total, votesLastMinute, momentum, leader } = useApp();

  // momentum FOMO — close race overrides direction; else follow the live shift.
  const fomo =
    leader === "tie"
      ? { text: "⚠️ Battle is too close to call", color: "text-gold" }
      : (() => {
          const side = momentum ?? leader; // live tick wins; fall back to standing leader
          return {
            text: `⚡ Momentum is shifting toward ${FACTION_LABEL[side]}`,
            color: side === "messi" ? "text-messi" : "text-ronaldo",
          };
        })();

  return (
    <div className={`flex w-full flex-col items-center gap-1.5 ${className}`}>
      {/* 1. participation density */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs font-bold text-muted">
        <span>
          🔥 <span className="text-white">{formatNumber(total)}</span> in this battle
        </span>
        <span className="hidden text-muted/40 sm:inline">·</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={votesLastMinute}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            ⚡ <span className="text-white">{formatNumber(votesLastMinute)}</span> votes / 60s
          </motion.span>
        </AnimatePresence>
      </div>

      {/* 2. momentum FOMO — swaps text + color as the war tilts */}
      <AnimatePresence mode="wait">
        <motion.p
          key={fomo.text}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          className={`text-xs font-black uppercase tracking-wide ${fomo.color}`}
        >
          {fomo.text}
        </motion.p>
      </AnimatePresence>

      {/* 3. live activity signal — subtle, never blocking */}
      <motion.span
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-lose" />
        new votes incoming…
      </motion.span>
    </div>
  );
}
