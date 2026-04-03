import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3D1A5C",
          light: "#F0EDF5",
          dark: "#2E1147",
        },
        accent: {
          DEFAULT: "#B8962E",
          light: "#D4B44A",
          dark: "#9A7D26",
        },
        surface: "#F5F5F5",
        dark: "#2D2D2D",
        mid: "#555555",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "slide-down": "slideDown 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      boxShadow: {
        premium: "0 4px 30px rgba(61,26,92,0.06)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        heartbeat: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "14%": { transform: "scale(1.3)", opacity: "1" },
          "28%": { transform: "scale(1)", opacity: "0.7" },
          "42%": { transform: "scale(1.25)", opacity: "1" },
          "56%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1)", opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
