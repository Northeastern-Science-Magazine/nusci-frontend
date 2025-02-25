import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const avatarVariants = tv({
  base: "rounded-full",
  variants: {
    size: {
      sm: "w-24 h-24 text-lg",
      md: "w-32 h-32 text-xl",
      lg: "w-40 h-40 text-2xl",
    },
  }, 
  defaultVariants: {
    size: "md", 
  },
});

/** Create the typing for Avatar Variant Props */
export type AvatarVariants = VariantProps<typeof avatarVariants>;