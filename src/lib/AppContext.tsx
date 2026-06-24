"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Leader, Side } from "./types";
import { INITIAL_MESSI, INITIAL_RONALDO } from "./mockData";

interface AppState {
  messi: number;
  ronaldo: number;
  total: number;
  messiPct: number;
  ronaldoPct: number;
  leader: Leader;
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

  // live "war" — the score shifts every few seconds
  useEffect(() => {
    const t = setInterval(() => {
      setMessi((m) => m + Math.floor(Math.random() * 50));
      setRonaldo((r) => r + Math.floor(Math.random() * 50));
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

  const total = messi + ronaldo;
  const messiPct = (messi / total) * 100;
  const ronaldoPct = (ronaldo / total) * 100;
  const leader: Leader =
    Math.abs(messiPct - ronaldoPct) < 1 ? "tie" : messiPct > ronaldoPct ? "messi" : "ronaldo";

  return (
    <Ctx.Provider
      value={{ messi, ronaldo, total, messiPct, ronaldoPct, leader, side, rank, castVote }}
    >
      {children}
    </Ctx.Provider>
  );
}
