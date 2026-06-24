import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B12",
        surface: "#15151F",
        "surface-2": "#1F1F2C",
        hairline: "#2A2A38",
        muted: "#9A9AB0",
        gold: "#F5C542",
        "gold-deep": "#C9961E",
        "gold-glow": "#FFE08A",
        // VS CORE identity — semantic energy poles (topic-agnostic).
        // The system speaks side-blue / side-red; messi/ronaldo are subject aliases
        // kept for backwards-compat. See docs/16-vs-identity-system.md.
        "side-blue": "#3AA0FF",
        "side-blue-light": "#7FD0FF",
        "side-blue-deep": "#1146CF",
        "side-red": "#FF4F44",
        "side-red-light": "#FF9B8F",
        "side-red-deep": "#C8121F",
        messi: "#4FA8E0",
        "messi-deep": "#2E7CC4",
        ronaldo: "#E5343D",
        "ronaldo-deep": "#B11E2A",
        win: "#36D399",
        lose: "#F5556B",
        warn: "#FF8A3D",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-gold": "0 0 40px -8px rgba(245,197,66,0.55)",
        "glow-messi": "0 0 40px -8px rgba(79,168,224,0.6)",
        "glow-ronaldo": "0 0 40px -8px rgba(229,52,61,0.6)",
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translateY(-160px) scale(0.3)", opacity: "0" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        rise: "rise linear infinite",
        pulseDot: "pulseDot 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
