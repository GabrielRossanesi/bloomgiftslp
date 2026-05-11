import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bloom: {
          ink: "#1F1D20",
          graphite: "#1F1D20",
          forest: "#585551",
          green: "#C49346",
          mint: "#FDECA8",
          champagne: "#FDDC98",
          rose: "#B7A573",
          porcelain: "#F8F3E8",
        },
      },
      boxShadow: {
        soft: "0 24px 80px rgba(31, 29, 32, 0.12)",
        glow: "0 24px 70px rgba(196, 147, 70, 0.24)",
      },
      fontFamily: {
        sans: ['"Quicksand"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Arimo"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
