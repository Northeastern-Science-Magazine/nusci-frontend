import { tv, type VariantProps } from "tailwind-variants";

export const imageVariants = tv({
  base: "w-full h-full object-cover",
  variants: {
    rounded: {
      default: "",
      rounded: "rounded-md",
    },
    emphasis: {
      default: "",
      emphasis: "shadow-lg",
    },
  },
  defaultVariants: {
    ratio: "1/1",
    rounded: "default",
    emphasis: "default",
  },
});

export type ImageVariants = VariantProps<typeof imageVariants>;

export interface ImageProps extends ImageVariants {
  ratio?: number;
  raw?: boolean;
  src: string;
  alt: string;
  width: string;
}
