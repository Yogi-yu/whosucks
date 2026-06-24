"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/AppContext";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/**
 * Live "time remaining in this battle" timer, fed by the shared weekly cycle in
 * AppContext so it's identical on every screen. Escalates visually as the cycle
 * expires — the closer to reset, the louder the urgency (drives last-hours shares).
 */
export default function Countdown({ className = "" }: { className?: string }) {
  const { cycle, countdown } = useApp();

  // null until mounted (SSR-safe) — reserve height to avoid layout shift
  if (!cycle || !countdown) {
    return <div className={`h-[42px] ${className}`} aria-hidden />;
  }

  const critical = cycle.msRemaining < HOUR; // final hour
  const urgent = cycle.msRemaining < DAY; // final day
  const tone = critical ? "text-lose" : urgent ? "text-gold" : "text-white";

  return (
    <div className={`flex flex-col items-center gap-0.5 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
        ⏳ Time remaining in this battle
      </span>
      <motion.span
        // pulse only when it actually matters — quiet otherwise
        animate={urgent ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: urgent ? Infinity : 0 }}
        className={`font-mono text-lg font-black tabular-nums tracking-tight ${tone}`}
      >
        {countdown} left
      </motion.span>
      {urgent && (
        <span className={`text-[10px] font-black uppercase tracking-wide ${tone}`}>
          {critical ? "⚠️ Final hour — battle resets soon" : "⚠️ Final day — share before it resets"}
        </span>
      )}
    </div>
  );
}
