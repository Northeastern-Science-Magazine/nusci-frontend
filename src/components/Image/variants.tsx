import { tv, type VariantProps } from "tailwind-variants";

export const imageVariants = tv({
  base: "",
  variants: {
    ratio: {
      1: 1 / 1,
      2: 16 / 9,
      3: 4/ 3
    },
  },
  defaultVariants: {
    ratio: 3
  }
});

export type ImageVariants = VariantProps<typeof imageVariants>;

/** Ascertain default HTML img attributes (disabled, etc) */
// type HTMLButtonProps = Omit<HTMLAttributes<HTMLImageElement>, "color"> & ClassAttributes<HTMLImageElement>;

export interface ImageProps extends ImageVariants {
    children: React.ReactNode;
  
}
