import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import { ImageProps } from "@/primitives/Image";

export const overlayVariants = tv({
  base: "",
  variants: {
    background: {
      "gradient-black": "bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white",
      "gradient-white": "bg-gradient-to-t from-white/80 via-white/40 to-transparent text-black",
      "gradient-red": "bg-gradient-to-t from-red-500/80 via-red-500/40 to-transparent text-white",
      "gradient-aqua": "bg-gradient-to-t from-aqua/80 via-aqua/40 to-transparent text-white",
      "gradient-aqua-light": "bg-gradient-to-t from-aqua-light/80 via-aqua-light/40 to-transparent text-black",
      "gradient-forest-green": "bg-gradient-to-t from-forest-green/80 via-forest-green/40 to-transparent text-white",
      "gradient-sage-green": "bg-gradient-to-t from-sage-green/80 via-sage-green/40 to-transparent text-black",
      "gradient-border": "bg-gradient-to-t from-border/80 via-border/40 to-transparent text-black",
      "gradient-neutral": "bg-gradient-to-t from-neutral/80 via-neutral/40 to-transparent text-black",
      "gradient-purple": "bg-gradient-to-t from-purple/80 via-purple/40 to-transparent text-white",
      "gradient-pink": "bg-gradient-to-t from-pink/80 via-pink/40 to-transparent text-black",
      "gradient-maroon": "bg-gradient-to-t from-maroon/80 via-maroon/40 to-transparent text-white",
      "gradient-coral": "bg-gradient-to-t from-coral/80 via-coral/40 to-transparent text-black",
      "gradient-marigold": "bg-gradient-to-t from-marigold/80 via-marigold/40 to-transparent text-black",
      "solid-black": "bg-black/50 text-white",
      "solid-white": "bg-white/50 text-black",
      "solid-red": "bg-red-500/50 text-white",
      "solid-aqua": "bg-aqua/50 text-white",
      "solid-aqua-light": "bg-aqua-light/50 text-black",
      "solid-forest-green": "bg-forest-green/50 text-white",
      "solid-sage-green": "bg-sage-green/50 text-black",
      "solid-border": "bg-border/50 text-black",
      "solid-neutral": "bg-neutral/50 text-black",
      "solid-purple": "bg-purple/50 text-white",
      "solid-pink": "bg-pink/50 text-black",
      "solid-maroon": "bg-maroon/50 text-white",
      "solid-coral": "bg-coral/50 text-black",
      "solid-marigold": "bg-marigold/50 text-black",
    },
  },
  defaultVariants: {},
});

export interface OverlayProps extends VariantProps<typeof overlayVariants> {
  className?: string;
  children: React.ReactNode;
}

export const mediaOverlayVariants = tv({
  base: "",
  variants: {},
  defaultVariants: {},
});

type OverlayElement = React.ReactElement<OverlayProps>;
type ImageElement = React.ReactElement<ImageProps>;
export type MediaOverlayChildren = [ImageElement, OverlayElement];

export interface MediaOverlayProps extends VariantProps<typeof mediaOverlayVariants> {
  className?: string;
  onClick?: () => void;
  children: MediaOverlayChildren;
}
