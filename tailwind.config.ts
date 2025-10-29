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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translate3d(0, -100%, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translate3d(-100%, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translate3d(100%, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        moveUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-0.25rem)" }, 
        },
        moveDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0.25rem)" },
        },
        moveRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(0.25rem)" }, 
        },
        moveLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-0.25rem)" }, 
        }, 
        scaleUp: {
          "0%": { transform: "scale(1)" },    
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        'fade-in': 'fade-in 500ms ease-out forwards',
        'fade-in-down': 'fade-in-down 500ms ease-out forwards',
        'fade-in-up': 'fade-in-up 500ms ease-out forwards',
        'fade-in-left': 'fade-in-left 500ms ease-out forwards',
        'fade-in-right': 'fade-in-right 500ms ease-out forwards',
        moveUp: "moveUp 500ms ease-out",
        moveDown: "moveDown 500ms ease-out",
        moveRight: "moveRight 500ms ease-out",
        moveLeft: "moveLeft 500ms ease-out",
        scaleUp: "scaleUp 500ms ease-out"
      },
    screens: {
      tablet: "768px",
      laptop: "1024px",
    },
  },
},
  plugins: [],
};
export default config;
