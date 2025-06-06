import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const avatarVariants = tv({
  base: "flex items-center justify-center rounded-full border border-slate-400",
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

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string; // add default alt text when not given
  fallback: string; // validate if it's 1-2 characters long in prop
}
