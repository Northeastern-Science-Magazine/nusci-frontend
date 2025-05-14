import React, { ClassAttributes, HTMLAttributes } from "react";
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
  },
  defaultVariants: {
    color: "black",
    size: 12,
  },
});

/** Create the typing for Text Variant Props */
export type TextVariants = VariantProps<typeof textVariants>;

/** Export TextProps as one type */
export interface TextProps extends TextVariants {
  className?: string;
  as?: "p" | "span";
  children: React.ReactNode;
}
