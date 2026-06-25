import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#0b1326",

        primary: "#4edea3",
        "primary-container": "#10b981",

        surface: "#0b1326",
        "surface-container": "#171f33",
        "surface-container-low": "#131b2e",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",

        outline: "#86948a",
        "outline-variant": "#3c4a42",

        "on-background": "#dae2fd",

        "on-surface": "#dae2fd",
        "on-surface-variant": "#bbcabf",

        "on-primary": "#003824",
        "on-primary-container": "#00422b",

        error: "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",

        secondary: "#45dfa4",
        "secondary-container": "#00bd85",

        tertiary: "#c0c1ff",
        "tertiary-container": "#9699ff",
      },

      fontFamily: {
        h1: ["Space Grotesk", "sans-serif"],
        h2: ["Space Grotesk", "sans-serif"],
        h3: ["Space Grotesk", "sans-serif"],

        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],

        "label-caps": ["Inter", "sans-serif"],
      },

      fontSize: {
        h1: [
          "48px",
          {
            lineHeight: "1.1",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          },
        ],

        h2: [
          "32px",
          {
            lineHeight: "1.2",
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],

        h3: [
          "24px",
          {
            lineHeight: "1.3",
            fontWeight: "600",
          },
        ],

        "body-lg": [
          "18px",
          {
            lineHeight: "1.6",
          },
        ],

        "body-md": [
          "16px",
          {
            lineHeight: "1.5",
          },
        ],

        "body-sm": [
          "14px",
          {
            lineHeight: "1.4",
          },
        ],

        "label-caps": [
          "12px",
          {
            lineHeight: "1",
            letterSpacing: "0.05em",
            fontWeight: "600",
          },
        ],
      },

      spacing: {
        unit: "4px",

        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "2xl": "64px",

        gutter: "24px",
      },

      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "9999px",
      },

      maxWidth: {
        container_max: "1440px",
      },

      boxShadow: {
        glow: "0 0 30px rgba(78,222,163,.15)",
      },
    },
  },

  plugins: [],
};

export default config;
