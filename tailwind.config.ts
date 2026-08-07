import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0F",
          elevated: "#111219",
          surface: "#14151D",
        },
        paper: "#F3F1EC",
        muted: "#96959F",
        line: "rgba(255,255,255,0.08)",
        gold: {
          DEFAULT: "#C9A15C",
          soft: "#E8CD97",
          dim: "#8A703F",
        },
        violet: "#6C5CE0",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(108,92,224,0.18), transparent 60%)",
        "gold-glow":
          "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(201,161,92,0.15), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(201,161,92,0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        spark: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
      },
      animation: {
        spark: "spark 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
