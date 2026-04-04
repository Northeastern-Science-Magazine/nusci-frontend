import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const avatarVariants = tv({
  base: "flex items-center justify-center rounded-full border-4 border-white shadow-xl",
  variants: {
    size: {
      sm: "w-16 h-16 md:w-24 md:h-24 text-lg",
      md: "w-20 h-20 md:w-32 md:h-32 text-xl",
      lg: "w-24 h-24 md:w-40 md:h-40 text-2xl",
      xl: "w-32 h-32 md:w-64 md:h-64 text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  onClick?: () => void;
  src?: string;
  alt?: string;
  fallback: string;
}
