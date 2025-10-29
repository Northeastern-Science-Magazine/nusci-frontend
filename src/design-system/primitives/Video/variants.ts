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
      emphasis: "shadow-[0_2px_10px] shadow-blackA4",
    },
  },
  defaultVariants: {
    ratio: "1/1",
    rounded: "default",
    emphasis: "default",
  },
});

export type VideoVariants = VariantProps<typeof videoVariants>;

export interface VideoProps extends VideoVariants {
  src: string;
  alt: string;
  width: string;

  // Video-specific HTML props
  ratio?: number;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "none" | "metadata" | "auto";
}
