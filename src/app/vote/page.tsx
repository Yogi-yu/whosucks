"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/AppContext";
import { track } from "@/lib/attribution";
import { Side } from "@/lib/types";

export default function VotePage() {
  const router = useRouter();
  const { castVote } = useApp();
  const [chosen, setChosen] = useState<Side | null>(null);

  // reaching the duel screen = vote intent started (denominator for share rate)
  useEffect(() => {
    track("vote_started");
  }, []);

  function pick(side: Side) {
    if (chosen) return;
    castVote(side);
    // per-side event carries inbound ref → measures referred conversion
    track(side === "messi" ? "vote_messi" : "vote_ronaldo", { side });
    setChosen(side);
    window.setTimeout(() => router.push("/success"), 850);
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden">
      {/* MESSI side */}
      <motion.button
        onClick={() => pick("messi")}
        whileTap={{ scale: 0.98 }}
        animate={
          chosen === "messi"
            ? { x: [0, -10, 10, -7, 7, 0], boxShadow: "0 0 80px 10px rgba(79,168,224,0.9) inset" }
            : {}
        }
        transition={{ duration: 0.45 }}
        className="relative flex flex-1 flex-col items-center justify-center gap-4 border-r border-white/10 bg-gradient-to-b from-messi/25 to-messi-deep/5"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl"
        >
          🇦🇷
        </motion.span>
        <span className="text-4xl font-black uppercase text-messi drop-shadow-[0_0_20px_rgba(79,168,224,0.6)]">
          Messi
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">Tap to choose</span>
      </motion.button>

      {/* RONALDO side */}
      <motion.button
        onClick={() => pick("ronaldo")}
        whileTap={{ scale: 0.98 }}
        animate={
          chosen === "ronaldo"
            ? { x: [0, 10, -10, 7, -7, 0], boxShadow: "0 0 80px 10px rgba(229,52,61,0.9) inset" }
            : {}
        }
        transition={{ duration: 0.45 }}
        className="relative flex flex-1 flex-col items-center justify-center gap-4 bg-gradient-to-b from-ronaldo/25 to-ronaldo-deep/5"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="text-7xl"
        >
          🇵🇹
        </motion.span>
        <span className="text-4xl font-black uppercase text-ronaldo drop-shadow-[0_0_20px_rgba(229,52,61,0.6)]">
          Ronaldo
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">Tap to choose</span>
      </motion.button>

      {/* VS badge */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-ink text-xl font-black text-gold shadow-glow-gold"
        >
          VS
        </motion.div>
      </div>

      {/* full-screen color flash on choice */}
      <AnimatePresence>
        {chosen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background:
                chosen === "messi"
                  ? "radial-gradient(120% 120% at 50% 45%, rgba(79,168,224,0.97), #0E1B26)"
                  : "radial-gradient(120% 120% at 50% 45%, rgba(229,52,61,0.97), #220E12)",
            }}
          >
            <motion.span
              initial={{ scale: 0.2, rotate: -15 }}
              animate={{ scale: [0.2, 1.3, 1], rotate: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-8xl"
            >
              {chosen === "messi" ? "🇦🇷" : "🇵🇹"}
            </motion.span>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-2 text-5xl font-black uppercase text-white drop-shadow"
            >
              {chosen === "messi" ? "Messi!" : "Ronaldo!"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
