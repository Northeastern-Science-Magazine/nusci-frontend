import type { Config } from "tailwindcss";

// Breakpoint constants - export for use in JavaScript/TypeScript
export const breakpoints = {
  mobile: 0,
  laptop: 834,
} as const;

// Helper function to convert pixel value to Tailwind screen format
const pxToScreen = (px: number) => `${px}px`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: "#f5f5f5",
        aqua: "#1B666B",
        "aqua-light": "#57AAB1",
        "forest-green": "#0E3309",
        "sage-green": "#82A67C",
        border: "#e5e5e5",
        neutral: "#CDCDCD",
        purple: "#87495D",
        pink: "#D4859D",
        maroon: "#A64510",
        coral: "#EE7A51",
        marigold: "#FFC443",
      },
      screens: {
        mobile: pxToScreen(breakpoints.mobile),
        laptop: pxToScreen(breakpoints.laptop),
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(1rem)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-1rem)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        fadeInTop: {
          "0%": { opacity: "0", transform: "translateY(-1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        fadeInBottom: {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.7s ease-out forwards",
        fadeInRight: "fadeInRight 0.7s ease-out forwards",
        fadeInLeft: "fadeInLeft 0.7s ease-out forwards",
        fadeInTop: "fadeInTop 0.7s ease-out forwards",
        fadeInBottom: "fadeInBottom 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
