import { tv, type VariantProps } from "tailwind-variants";

export const borderVariants = tv({
  variants: {
    borderWidth: {
      0: "border-0",
      1: "border",
      2: "border-2",
      4: "border-4",
      8: "border-8",
    },
    borderColor: {
      black: "border-black",
      white: "border-white",
      red: "border-red-500 ",
      aqua: "border-aqua ",
      "aqua-light": "border-aqua-light",
      "forest-green": "border-forest-green",
      "sage-green": "border-sage-green",
      border: "border-border",
      neutral: "border-neutral",
      purple: "border-purple",
      pink: "border-pink",
      maroon: "border-maroon",
      coral: "border-coral",
      marigold: "border-marigold",
    },
    borderTop: {
      true: "border-t",
    },
    borderBottom: {
      true: "border-b",
    },
    borderLeft: {
      true: "border-l",
    },
    borderRight: {
      true: "border-r",
    },
  },
});

export type BorderProps = VariantProps<typeof borderVariants>;
