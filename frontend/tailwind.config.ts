import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        surface: "#ffffff",
        primary: "#7c3aed",
        
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        "primary-container": "#ede9fe",
        "on-background": "#111827",
        "on-surface": "#111827",
        "on-surface-variant": "#6b7280",

        outline: "#d1d5db",

        "outline-variant": "#e5e7eb",
        "surface-container": "#ffffff",
        "surface-container-low": "#f9fafb",
        "surface-container-high": "#f3f4f6",
        "surface-container-highest": "#eef2ff",

      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "2xl": "64px",
        gutter: "32px",
        "container-max": "1440px",
      },

      fontFamily: {
        body: ["Inter", "sans-serif"],

        display: ["Space Grotesk", "sans-serif"],

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
        sm: "0.5rem",
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },

      boxShadow: {
        card: "0 8px 30px rgba(15,23,42,.06)",
        floating: "0 16px 48px rgba(15,23,42,.10)",
      },

      maxWidth: {
        "container-max": "1440px",
      },
    },
  },

  plugins: [],
};

export default config;
