import { tv, type VariantProps } from "tailwind-variants";

export const imageVariants = tv({
  base: "",
  variants: {
    ratio: {
      1: 1 / 1,
      2: 16 / 9,
      3: 4 / 3,
    },
  },
  defaultVariants: {
    ratio: 3,
  },
});

export type ImageVariants = VariantProps<typeof imageVariants>;

export interface ImageProps extends ImageVariants {
  src: string;
  alt: string;
}
