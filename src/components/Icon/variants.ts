import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Define icon Variants using Tailwind Variant Definitions */
export const iconVariants = tv({
  base:  "items-center justify-center font-medium transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      '7xl': "text-7xl",
      "8xl": "text-8xl",
      "9xl": "text-9xl"  
    },
    color: {
      black: "text-white bg-black border-black hover:bg-black hover:border-black focus:ring-black",
      white: "text-black bg-white border-white hover:bg-white hover:border-white focus:ring-white",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 focus:ring-red-500",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua focus:ring-aqua",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light focus:ring-aqua-light",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green focus:ring-forest-green",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green focus:ring-sage-green",
      border: "text-white bg-border border-border hover:bg-border hover:border-border focus:ring-border",
      neutral: "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral focus:ring-neutral",
      purple: "text-white bg-purple border-purple hover:bg-purple hover:border-purple focus:ring-purple",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink focus:ring-pink",
      maroon: "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon focus:ring-maroon",
      coral: "text-black bg-coral border-coral hover:bg-coral hover:border-coral focus:ring-coral",
      marigold: "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold focus:ring-marigold",
    },
  },
  defaultVariants: {
    color: "black",
    size: "base",
  }
});

/** Create the typing for Icon Variant Props */
export type IconVariants = VariantProps<typeof iconVariants>;

/** Ascertain default HTML Icon attributes (disabled, etc) */
type HTMLIconProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & ClassAttributes<HTMLSpanElement>;

/** Export IconProps as one type */
export interface IconProps extends IconVariants, HTMLIconProps {
  children: React.ReactNode;
  iconName: string;
  onClick?: () => void;
}
