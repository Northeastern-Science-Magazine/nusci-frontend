import { tv, type VariantProps } from "tailwind-variants";

export const displayVariants = tv({
  variants: {
    display: {
      inline: "inline",
      block: "block",
      "inline-block": "inline-block",
      hidden: "hidden",
    },
  },
});

export type DisplayProps = VariantProps<typeof displayVariants>;
