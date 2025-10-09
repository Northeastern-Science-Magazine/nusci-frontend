import { tv, type VariantProps } from "tailwind-variants";

export const dividerVariants = tv({
  base: "bg-border shrink-0",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    margin: {
      
    },
  },
});

type DividerVariants = VariantProps<typeof dividerVariants>;

export interface DividerProps extends DividerVariants {
  className?: string;
}
