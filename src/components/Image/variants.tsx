import { tv, type VariantProps } from "tailwind-variants";

export const imageVariants = tv({
  base: "w-full h-full object-cover",
  variants: {
    ratio: {
      1: 1 / 1,
      2: 16 / 9,
      3: 4 / 3,
    },
    rounded: {
      default: "",
      rounded: "rounded-md",
    },
    emphasis: {
      default: "",
      emphasis: "shadow-[0_2px_10px] shadow-blackA4",
    },
  },
  defaultVariants: {
    ratio: 3,
    rounded: "default",
    emphasis: "default",
  },
});

export type ImageVariants = VariantProps<typeof imageVariants>;

export interface ImageProps extends ImageVariants {
  src: string;
  alt: string;
  width: string;
}
