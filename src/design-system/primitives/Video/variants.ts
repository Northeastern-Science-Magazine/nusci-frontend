import { tv, type VariantProps } from "tailwind-variants";

export const videoVariants = tv({
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
    rounded: "default",
    emphasis: "default",
  },
});

export type VideoVariants = VariantProps<typeof videoVariants>;

export interface VideoProps extends VideoVariants {
  src: string;
  ratio?: number;
  raw?: boolean;
  width: string;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  preload?: string;
  poster?: string;
}
