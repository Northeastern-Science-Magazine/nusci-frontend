import type { Config } from "tailwindcss";

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
    },
    screens: {
      tablet: "768px",
      laptop: "1024px",
    },
  },
  plugins: [],
};
export default config;
