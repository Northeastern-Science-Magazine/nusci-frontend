import { tv, type VariantProps } from "tailwind-variants";

export const basicColorVariants = tv({
  variants: {
    color: {
      black: "text-white bg-black",
      white: "text-black bg-white",
      red: "text-white bg-red-500 ",
      aqua: "text-white bg-aqua ",
      "aqua-light": "text-black bg-aqua-light",
      "forest-green": "text-white bg-forest-green",
      "sage-green": "text-black bg-sage-green",
      border: "text-white bg-border",
      neutral: "text-black bg-neutral",
      purple: "text-white bg-purple",
      pink: "text-black bg-pink",
      maroon: "text-white bg-maroon",
      coral: "text-black bg-coral",
      marigold: "text-black bg-marigold",
    },
  },
});

export type BasicColorProps = VariantProps<typeof basicColorVariants>;
