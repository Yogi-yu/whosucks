"use client";

import { motion } from "framer-motion";

// App Router `template.tsx` re-mounts on every navigation, so this gives us
// a smooth cross-page transition. Opacity-only (no transform) so it never
// breaks the sticky live ticker or the fixed leaderboard "YOU" row.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
