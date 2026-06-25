import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        background: "#0b1326",
        surface: "#171f33",

        primary: "#4edea3",
        "primary-container": "#10b981",

        "on-background": "#dae2fd",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#bbcabf",

        outline: "#86948a",
        "outline-variant": "#3c4a42",

        "surface-container": "#171f33",
        "surface-container-low": "#131b2e",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "2xl": "64px",
        gutter: "24px",
        "container-max": "1440px",
      },

      fontFamily: {
        body: ["Inter", "sans-serif"],
        h1: ["Space Grotesk", "sans-serif"],
        h2: ["Space Grotesk", "sans-serif"],
        h3: ["Space Grotesk", "sans-serif"],
      },

      fontSize: {
        "body-sm": [
          "14px",
          {
            lineHeight: "1.4",
          },
        ],

        "body-md": [
          "16px",
          {
            lineHeight: "1.5",
          },
        ],

        "body-lg": [
          "18px",
          {
            lineHeight: "1.6",
          },
        ],

        h1: [
          "48px",
          {
            lineHeight: "1.1",
          },
        ],

        h2: [
          "32px",
          {
            lineHeight: "1.2",
          },
        ],

        h3: [
          "24px",
          {
            lineHeight: "1.3",
          },
        ],

        "label-caps": [
          "12px",
          {
            lineHeight: "1",
          },
        ],
      },

      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "9999px",
      },

      maxWidth: {
        "container-max": "1440px",
      },
    },
  },

  plugins: [],
};

export default config;
