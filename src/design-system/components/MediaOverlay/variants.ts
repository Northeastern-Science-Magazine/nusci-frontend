import { tv, type VariantProps } from "tailwind-variants";
import React from "react";
import { ImageProps } from "@/primitives/Image";

export const overlayVariants = tv({
  base: "",
  variants: {},
  defaultVariants: {},
});

export interface OverlayProps extends VariantProps<typeof overlayVariants> {
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
