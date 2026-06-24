"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { useApp } from "@/lib/AppContext";
import { FACTION_LABEL } from "@/lib/mockData";
import { formatNumber } from "@/lib/format";

export default function SuccessPage() {
  const router = useRouter();
  const { side, rank, messi, ronaldo, total, messiPct, ronaldoPct } = useApp();
  const [toast, setToast] = useState<string | null>(null);

  // no vote yet → back to the start
  useEffect(() => {
    if (!side) router.replace("/");
  }, [side, router]);

  if (!side) return null;

  const isMessi = side === "messi";
  const myPct = isMessi ? messiPct : ronaldoPct;
  const winning = (isMessi ? messi : ronaldo) >= (isMessi ? ronaldo : messi);

  async function challenge() {
    const url = typeof window !== "undefined" ? window.location.origin : "https://goatbattle.app";
    const text = `I just joined the ${FACTION_LABEL[side as "messi" | "ronaldo"]} ARMY 🐐 WHO IS THE GOAT — Messi or Ronaldo? Pick a side 👉`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "WHO IS GOAT?", text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setToast("Link copied — send it to someone who's WRONG 😈");
        window.setTimeout(() => setToast(null), 2400);
      }
    } catch {
      /* user dismissed the share sheet */
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center">
      <Confetti side={side} />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-sm font-bold uppercase tracking-[0.3em] text-muted"
      >
        You joined
      </motion.p>

      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 13 }}
        className={`relative z-10 text-5xl font-black uppercase leading-none ${
          isMessi ? "text-messi drop-shadow-[0_0_30px_rgba(79,168,224,0.7)]" : "text-ronaldo drop-shadow-[0_0_30px_rgba(229,52,61,0.7)]"
        }`}
      >
        {FACTION_LABEL[side]}
        <br />
        ARMY
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 rounded-full border border-hairline bg-surface/70 px-5 py-2 text-lg font-black"
      >
        🎖️ Soldier #{rank ? formatNumber(rank) : "—"}
      </motion.div>

      {/* current global score */}
      <div className="relative z-10 w-full">
        <div className="mb-1 flex justify-between text-sm font-black">
          <span className="text-messi">MESSI {messiPct.toFixed(1)}%</span>
          <span className="text-ronaldo">{ronaldoPct.toFixed(1)}% RONALDO</span>
        </div>
        <div className="relative flex h-3.5 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full bg-messi"
            initial={{ width: "50%" }}
            animate={{ width: `${messiPct}%` }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
          />
          <div className="h-full flex-1 bg-ronaldo" />
          <motion.div
            className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-white shadow-glow-gold"
            initial={{ left: "50%" }}
            animate={{ left: `${messiPct}%` }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <p className="mt-1 text-xs text-muted">{formatNumber(total)} soldiers in battle</p>
      </div>

      <motion.p
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className={`relative z-10 text-sm font-black ${winning ? "text-win" : "text-lose"}`}
      >
        ⚡ Your vote changed the battle — {FACTION_LABEL[side]} is {winning ? "WINNING" : "LOSING"} at{" "}
        {myPct.toFixed(1)}%
      </motion.p>

      <motion.button
        onClick={challenge}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 24px -6px rgba(245,197,66,0.5)", "0 0 50px -4px rgba(245,197,66,0.85)", "0 0 24px -6px rgba(245,197,66,0.5)"] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="relative z-10 mt-2 w-full rounded-2xl bg-gradient-to-r from-gold to-gold-deep py-5 text-xl font-black uppercase tracking-wide text-ink"
      >
        👉 Challenge a Friend
      </motion.button>

      <button onClick={() => router.push("/vote")} className="relative z-10 text-xs text-muted">
        switch sides
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-10 z-50 mx-auto w-fit max-w-[90%] rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink shadow-glow-gold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
