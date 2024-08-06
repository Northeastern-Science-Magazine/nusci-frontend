import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'light-orange': '#ee7a51',
        'dark-orange': '#a64510',
        'gray': '#f5f5f5',
      }
    },
    screens: {
      tablet: "768px",
      laptop: "1024px",
    },
  },
  plugins: [],
};
export default config;
