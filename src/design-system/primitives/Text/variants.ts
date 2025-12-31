import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import clsx from "clsx";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "",
  variants: {
    style: {
      regular: "",
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      overline: "overline",
      strikethrough: "line-through",
    },
    color: {
      black: "text-black",
      white: "text-white",
      red: "text-red-500",
      aqua: "text-aqua",
      "aqua-light": "text-aqua-light",
      "forest-green": "text-forest-green",
      "sage-green": "text-sage-green",
      border: "text-border",
      neutral: "text-neutral",
      purple: "text-purple",
      pink: "text-pink",
      maroon: "text-maroon",
      coral: "text-coral",
      marigold: "text-marigold",
    },
    size: {
      8: "text-[8px]",
      12: "text-[12px]",
      14: "text-[14px]",
      16: "text-[16px]",
      18: "text-[18px]",
      20: "text-[20px]",
      24: "text-[24px]",
      30: "text-[30px]",
      36: "text-[36px]",
      48: "text-[48px]",
      60: "text-[60px]",
      72: "text-[72px]",
      96: "text-[96px]",
      128: "text-[128px]",
    },
    spacing: {
      xs: "tracking-tighter",
      sm: "tracking-tight",
      md: "tracking-normal",
      lg: "tracking-[0.25em]",
      xl: "tracking-[0.35em]",
    },
  },
  defaultVariants: {
    size: 12,
    spacing: "md",
  },
});

/** Create the typing for Text Variant Props */
export type TextVariants = VariantProps<typeof textVariants>;

/** Export TextProps as one type */
export interface TextProps extends TextVariants, AnimationProps, DisplayProps, MarginProps, PaddingProps, PositionProps {
  className?: string;
  as?: "p" | "span";
  children: React.ReactNode;
}

export const textVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    textVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    className
  );
