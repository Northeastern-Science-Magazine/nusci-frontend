import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const avatarVariants = tv({
  base: "rounded-full",
  variants: {
    size: {
      sm: "w-12 h-12 text-sm",
      md: "w-24 h-24 text-base",
      lg: "w-48 h-48 text-lg",
    },
  }, 
  defaultVariants: {
    size: "md", 
  },
});

/** Create the typing for Avatar Variant Props */
export type AvatarVariants = VariantProps<typeof avatarVariants>;