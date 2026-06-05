import type { Config } from "tailwindcss";
// import forms from "@tailwindcss/forms";
// import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b1326",
        "on-background": "#dae2fd",
        primary: "#4edea3",
        "primary-container": "#10b981",
        surface: "#0b1326",
        "surface-container": "#171f33",
        "surface-container-high": "#222a3d",
        "surface-container-low": "#131b2e",
        "surface-container-highest": "#2d3449",
        outline: "#86948a",
        "outline-variant": "#3c4a42",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#bbcabf",
      },

      spacing: {
        xs: "4px",
        md: "16px",
        gutter: "24px",
        container_max: "1440px",
        sm: "8px",
        unit: "4px",
        xl: "40px",
        lg: "24px",
        "2xl": "64px",
      },

      fontFamily: {
        "body-md": ["var(--font-inter)"],
        h1: ["var(--font-space-grotesk)"],
        h2: ["var(--font-space-grotesk)"],
      },

      fontSize: {
        "body-md": ["16px", { lineHeight: "1.5" }],
        h1: ["48px", { lineHeight: "1.1" }],
        h2: ["32px", { lineHeight: "1.2" }],
      },

      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
