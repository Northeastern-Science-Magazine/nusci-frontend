import { tv, type VariantProps } from "tailwind-variants";

/** Define Button Variants using Tailwind Variant Definitions */
export const avatarVariants = tv({
  base: "",
  variants: {
    shape: {
        round: "rounded-full"
    },
    size: {
      sm: "w-8 h-8 text-sm",
      md: "w-12 h-12 text-base",
      lg: "w-16 h-16 text-lg",
    },
  }, 
});

/** Create the typing for Avatar Variant Props */
export type AvatarVariants = VariantProps<typeof avatarVariants>;