"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/lib/AppContext";
import { captureRef, track } from "@/lib/attribution";

export default function Landing() {
  const router = useRouter();
  const { messiPct, ronaldoPct } = useApp();

  // first-touch: store inbound ?ref, then log the visit (with that ref attached)
  useEffect(() => {
    captureRef();
    track("landing_view");
  }, []);

  function enter() {
    router.push("/vote");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-9 px-6 text-center">
      {/* live tag */}
      <motion.div
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex items-center gap-2 rounded-full border border-lose/50 bg-lose/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-lose"
      >
        <span className="h-2 w-2 rounded-full bg-lose" /> Live battle
      </motion.div>

      {/* the only question */}
      <h1 className="text-6xl font-black leading-none tracking-tight sm:text-7xl">
        WHO IS
        <br />
        <span className="text-gold drop-shadow-[0_0_25px_rgba(245,197,66,0.5)]">GOAT?</span>
      </h1>

      {/* live animated score + tension bar */}
      <div className="w-full">
        <div className="mb-2 flex justify-between text-lg font-black">
          <motion.span key={Math.round(messiPct)} className="text-messi">
            MESSI {messiPct.toFixed(0)}%
          </motion.span>
          <motion.span key={Math.round(ronaldoPct)} className="text-ronaldo">
            {ronaldoPct.toFixed(0)}% RONALDO
          </motion.span>
        </div>
        <div className="relative flex h-5 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full bg-gradient-to-r from-messi-deep to-messi"
            animate={{ width: `${messiPct}%` }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="h-full flex-1 bg-gradient-to-l from-ronaldo-deep to-ronaldo"
            animate={{ width: `${ronaldoPct}%` }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-white shadow-glow-gold"
            animate={{ left: `${messiPct}%` }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* two buttons — the whole product */}
      <div className="grid w-full grid-cols-2 gap-4">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={enter}
          className="flex flex-col items-center gap-2 rounded-3xl border-2 border-messi/60 bg-gradient-to-b from-messi/30 to-messi-deep/10 py-7 text-2xl font-black uppercase text-messi shadow-glow-messi"
        >
          <span className="text-4xl">🇦🇷</span>
          Messi
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={enter}
          className="flex flex-col items-center gap-2 rounded-3xl border-2 border-ronaldo/60 bg-gradient-to-b from-ronaldo/30 to-ronaldo-deep/10 py-7 text-2xl font-black uppercase text-ronaldo shadow-glow-ronaldo"
        >
          <span className="text-4xl">🇵🇹</span>
          Ronaldo
        </motion.button>
      </div>

      <p className="text-sm font-bold uppercase tracking-widest text-muted">Tap your GOAT</p>
    </main>
  );
}
