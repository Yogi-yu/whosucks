"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { useApp } from "@/lib/AppContext";
import { createReferral, getMyRef, getVariant, track, ShareVariant } from "@/lib/attribution";
import { FACTION_LABEL } from "@/lib/mockData";
import { formatNumber } from "@/lib/format";

/**
 * The ONE share-URL builder. Always origin + URLSearchParams, ref validated.
 * Synchronous so it can run inside the click gesture (critical for iOS share).
 * Guaranteed to return a well-formed absolute URL — never undefined/empty.
 */
function makeShareUrl(ref: string): string {
  const url = new URL(window.location.origin);
  if (ref && typeof ref === "string") url.searchParams.set("ref", ref);
  return url.toString(); // e.g. https://yourdomain.com/?ref=abc123
}

export default function SuccessPage() {
  const router = useRouter();
  const { side, rank, messi, ronaldo, total, messiPct, ronaldoPct } = useApp();
  const [toast, setToast] = useState<string | null>(null);
  const [variant, setVariant] = useState<ShareVariant>("A");

  // sticky A/B assignment (client-only → no hydration mismatch)
  useEffect(() => {
    setVariant(getVariant());
  }, []);

  // no vote yet → back to the start
  useEffect(() => {
    if (!side) router.replace("/");
  }, [side, router]);

  // reaching success = this user can now spread → log the view + mint referral (once)
  useEffect(() => {
    if (side) {
      track("success_view");
      createReferral();
    }
  }, [side]);

  if (!side) return null;

  const isMessi = side === "messi";
  const myPct = isMessi ? messiPct : ronaldoPct;
  const winning = (isMessi ? messi : ronaldo) >= (isMessi ? ronaldo : messi);

  // standardized loss-aversion: always one urgency sentence (score shown separately)
  const urgencyLine = winning
    ? "They are closing the gap — don't lose momentum."
    : "Your side is falling behind — send reinforcements.";

  // A/B share experiment — copy is driven by the sticky variant, NOT win/loss,
  // so each user sees ONE consistent treatment all session.
  const VARIANT_SHARE: Record<ShareVariant, string> = {
    A: `You're WRONG if you don't pick ${isMessi ? "Messi" : "Ronaldo"} 🐐\nMy vote just shifted the battle — prove me wrong 👉`,
    B: "Messi vs Ronaldo is getting heated 🔥\nI just defended my GOAT. What about you?",
  };
  const VARIANT_CTA: Record<ShareVariant, string> = {
    A: "⚔️ PUSH THE SCORE",
    B: "🛡️ DEFEND YOUR ARMY",
  };
  const shareText = VARIANT_SHARE[variant];
  const ctaLabel = VARIANT_CTA[variant];

  function flashToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }

  // Copy with graceful degradation: async Clipboard API → legacy execCommand.
  // Returns false only if every method fails.
  async function copyLink(payload: string): Promise<boolean> {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(payload);
        return true;
      }
    } catch {
      /* secure-context / permission failure → try legacy path */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = payload;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  async function challenge() {
    // --- everything here is SYNCHRONOUS up to navigator.share() ---
    // No awaits before the share call → preserves the iOS user-gesture context.
    const url = makeShareUrl(getMyRef()); // single, always-valid URL
    const text = shareText;
    console.log("[SHARE URL]", url); // TEMP debug — verify URL correctness
    track("share_click", { variant }); // sync (localStorage + console) — gesture safe

    // 1. Native share — invoked directly inside the gesture (mobile / iOS Safari)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "WHO IS GOAT?", text, url });
        flashToast("Shared successfully ✅");
        return; // outcome: native share
      } catch (err) {
        // User dismissed the sheet → intentional, a valid outcome. Stay quiet.
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Any real failure → fall through to clipboard. No dead end.
      }
    }

    // 2. Clipboard fallback: writeText → execCommand → raw link (copyLink chain)
    const copied = await copyLink(`${text} ${url}`);
    flashToast(
      copied
        ? "Link copied — send it to someone who's WRONG 😈" // outcome: copied
        : `Couldn't copy — share this: ${url}`, // outcome: raw link shown
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center">
      <Confetti side={side} />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-sm font-bold uppercase tracking-[0.3em] text-muted"
      >
        You are now
      </motion.p>

      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 13 }}
        className={`relative z-10 text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl ${
          isMessi
            ? "text-messi drop-shadow-[0_0_45px_rgba(79,168,224,0.95)]"
            : "text-ronaldo drop-shadow-[0_0_45px_rgba(229,52,61,0.95)]"
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
        className={`relative z-10 rounded-2xl border bg-surface/80 px-6 py-3 text-2xl font-black tracking-tight ${
          isMessi
            ? "border-messi/60 text-messi shadow-glow-messi"
            : "border-ronaldo/60 text-ronaldo shadow-glow-ronaldo"
        }`}
      >
        🎖️ SOLDIER #{rank ? formatNumber(rank) : "—"}
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
        className={`relative z-10 text-base font-black ${winning ? "text-gold" : "text-lose"}`}
      >
        ⚠️ {FACTION_LABEL[side]} {myPct.toFixed(1)}% — {urgencyLine}
      </motion.p>

      <motion.button
        onClick={challenge}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 24px -6px rgba(245,197,66,0.5)", "0 0 50px -4px rgba(245,197,66,0.85)", "0 0 24px -6px rgba(245,197,66,0.5)"] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="relative z-10 mt-2 w-full rounded-2xl bg-gradient-to-r from-gold to-gold-deep py-5 text-xl font-black uppercase tracking-wide text-ink"
      >
        {ctaLabel}
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
