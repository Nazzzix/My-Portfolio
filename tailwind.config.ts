import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6F3EE",
        ink: "#16181D",
        stone: {
          DEFAULT: "#5E5A54",
          muted: "#76726A",
        },
        paper: "#FFFFFF",
        sand: {
          DEFAULT: "#ECE7DF",
          subtle: "#F2EFEB",
        },
        line: "#DDD7CE",
        vermilion: {
          DEFAULT: "#E4572E",
          deep: "#C2441F",
          ember: "#FF7A55",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-space-grotesk)", "Space Grotesk", "-apple-system", "sans-serif"],
        mono: ["var(--font-dm-mono)", "DM Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 16px rgba(22, 24, 29, 0.06)",
        card: "0 2px 8px rgba(22, 24, 29, 0.04)",
      },
      borderRadius: {
        button: "6px",
        field: "6px",
        card: "12px",
        frame: "12px",
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        label: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;

