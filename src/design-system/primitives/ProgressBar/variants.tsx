import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { buttonVariants } from "../Button/variants";

/** Define ProgressBar Variants using Tailwind Variant Definitions */
export const progressBarVariants = tv({
  base: "",
  variants: {
    color: {
      black: "bg-black border-black outline-black",
      white: "bg-white border-white outline-white",
      red: "bg-red-500 border-red-500 outline-red-500",
      aqua: "bg-aqua border-aqua outline-aqua",
      "aqua-light": "bg-aqua-light border-aqua-light outline-aqua-light",
      "forest-green":
        "bg-forest-green border-forest-green outline-forest-green",
      "sage-green": "bg-sage-green border-sage-green outline-sage-green",
      border: "bg-border border-border outline-border",
      neutral: "bg-neutral border-neutral outline-neutral",
      purple: "bg-purple border-purple outline-purple",
      pink: "bg-pink border-pink outline-pink",
      maroon: "bg-maroon border-maroon outline-maroon",
      coral: "bg-coral border-coral outline-coral",
      marigold: "bg-marigold border-marigold outline-marigold",
    },
  },
  defaultVariants: {
    color: "black",
  },
});

/** Create the typing for ProgressBar Variant Props */
export type ProgressBarVariants = VariantProps<typeof progressBarVariants>;

/** Export ProgressBarProps as one type */
export interface ProgressBarProps extends ProgressBarVariants {
  className?: string;
  percentComplete: number;
  backgroundColor?: "black" | "white";
}
