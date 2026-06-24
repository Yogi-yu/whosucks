"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Side } from "@/lib/types";

interface Piece {
  id: number;
  left: number;
  delay: number;
  rotate: number;
  color: string;
}

const COLORS: Record<Side, string[]> = {
  messi: ["#4FA8E0", "#9ad1f2", "#FFFFFF", "#F5C542"],
  ronaldo: ["#E5343D", "#f4a0a4", "#FFFFFF", "#F5C542"],
};

export default function Confetti({ side }: { side: Side }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  // generate on the client only — avoids SSR hydration mismatch
  useEffect(() => {
    const palette = COLORS[side];
    const next: Piece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      rotate: Math.random() * 360,
      color: palette[i % palette.length],
    }));
    setPieces(next);
  }, [side]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 h-2.5 w-1.5 rounded-sm"
          style={{ left: `${p.left}%`, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: p.rotate }}
          animate={{ y: "110vh", opacity: [1, 1, 0], rotate: p.rotate + 240 }}
          transition={{ duration: 2.4, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
