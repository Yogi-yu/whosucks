"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Leader, Side } from "./types";
import { INITIAL_MESSI, INITIAL_RONALDO, SEED_VOTES_PER_MIN } from "./mockData";
import { Cycle, formatCountdown, getCycle, weekSeed } from "./cycle";

interface AppState {
  messi: number;
  ronaldo: number;
  total: number;
  messiPct: number;
  ronaldoPct: number;
  leader: Leader;
  momentum: Side | null; // who gained more on the LAST tick — "the battle is shifting"
  votesLastMinute: number; // derived social-proof signal — "votes in the last 60s"
  cycle: Cycle | null; // current weekly battle cycle (null until mounted — SSR-safe)
  countdown: string | null; // live "3d 14h 22m 10s" until cycle end
  side: Side | null; // chosen army
  rank: number | null; // soldier id
  castVote: (s: Side) => void;
}

const Ctx = createContext<AppState | null>(null);
const STORAGE_KEY = "goat-battle:identity";

export function useApp(): AppState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used within <AppProvider>");
  return c;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [messi, setMessi] = useState(INITIAL_MESSI);
  const [ronaldo, setRonaldo] = useState(INITIAL_RONALDO);
  const [side, setSide] = useState<Side | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [momentum, setMomentum] = useState<Side | null>(null);
  const [votesLastMinute, setVotesLastMinute] = useState(SEED_VOTES_PER_MIN);
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const weekIndexRef = useRef<number | null>(null);

  // rehydrate identity (client only — keeps SSR markup deterministic)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const id = JSON.parse(raw);
        setSide(id.side ?? null);
        setRank(id.rank ?? null);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // weekly cycle clock — ticks every second so the countdown stays live, and
  // reseeds the scoreboard the instant a 7-day cycle ends (new season begins).
  useEffect(() => {
    const tick = () => {
      const c = getCycle(Date.now());
      setCycle(c);
      if (weekIndexRef.current === null) {
        // first mount → seed THIS week's opening scoreboard
        weekIndexRef.current = c.index;
        const seed = weekSeed(c.week);
        setMessi(seed.messi);
        setRonaldo(seed.ronaldo);
      } else if (c.index !== weekIndexRef.current) {
        // crossed into a new cycle while open → reset to the new season
        weekIndexRef.current = c.index;
        const seed = weekSeed(c.week);
        setMessi(seed.messi);
        setRonaldo(seed.ronaldo);
        setMomentum(null);
      }
    };
    tick(); // run immediately so the countdown appears without a 1s delay
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // live "war" — the score shifts every few seconds
  useEffect(() => {
    const t = setInterval(() => {
      const dm = Math.floor(Math.random() * 50);
      const dr = Math.floor(Math.random() * 50);
      setMessi((m) => m + dm);
      setRonaldo((r) => r + dr);
      // surplus this tick = which way the war is tilting RIGHT NOW
      setMomentum(dm === dr ? null : dm > dr ? "messi" : "ronaldo");
      // extrapolate this tick's activity to a busy, ever-changing "per-60s" figure
      setVotesLastMinute(Math.max(180, (dm + dr) * 22 + 120));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const castVote = useCallback(
    (s: Side) => {
      if (s === "messi") setMessi((m) => m + 1);
      else setRonaldo((r) => r + 1);
      const newRank = rank ?? Math.floor(100000 + Math.random() * 900000);
      setSide(s);
      setRank(newRank);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ side: s, rank: newRank }));
      } catch {
        /* ignore */
      }
    },
    [rank],
  );

  const countdown = cycle ? formatCountdown(cycle.msRemaining) : null;
  const total = messi + ronaldo;
  const messiPct = (messi / total) * 100;
  const ronaldoPct = (ronaldo / total) * 100;
  const leader: Leader =
    Math.abs(messiPct - ronaldoPct) < 1 ? "tie" : messiPct > ronaldoPct ? "messi" : "ronaldo";

  return (
    <Ctx.Provider
      value={{ messi, ronaldo, total, messiPct, ronaldoPct, leader, momentum, votesLastMinute, cycle, countdown, side, rank, castVote }}
    >
      {children}
    </Ctx.Provider>
  );
}
