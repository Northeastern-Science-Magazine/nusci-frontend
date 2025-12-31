import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: "items-center justify-center font-medium py-2 px-4 border-2",
  variants: {
    variant: {
      default: "bg-opacity-100",
      outline: "",
      blur: "",
    },
    color: {
      black: "text-white bg-black border-black",
      white: "text-black bg-white border-white",
      red: "text-white bg-red-500 border-red-500",
      aqua: "text-white bg-aqua border-aqua",
      "aqua-light": "text-black bg-aqua-light border-aqua-light",
      "forest-green": "text-white bg-forest-green border-forest-green",
      "sage-green": "text-black bg-sage-green border-sage-green",
      border: "text-white bg-border border-border",
      neutral: "text-black bg-neutral border-neutral",
      purple: "text-white bg-purple border-purple",
      pink: "text-black bg-pink border-pink",
      maroon: "text-white bg-maroon border-maroon",
      coral: "text-black bg-coral border-coral",
      marigold: "text-black bg-marigold border-marigold",
    },
    rounded: {
      sm: "rounded",
      md: "rounded-2xl",
      lg: "rounded-3xl",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      color: "black",
      class: "bg-transparent border-2 border-black text-black",
    },
    {
      variant: "outline",
      color: "white",
      class: "bg-transparent border-2 border-white text-white",
    },
    {
      variant: "outline",
      color: "red",
      class: "bg-transparent border-2 border-red-600 text-red-600",
    },
    {
      variant: "outline",
      color: "aqua",
      class: "bg-transparent border-2 border-aqua text-aqua",
    },
    {
      variant: "outline",
      color: "aqua-light",
      class: "bg-transparent border-2 border-aqua-light text-aqua-light",
    },
    {
      variant: "outline",
      color: "forest-green",
      class: "bg-transparent border-2 border-forest-green text-forest-green",
    },
    {
      variant: "outline",
      color: "sage-green",
      class: "bg-transparent border-2 border-sage-green text-sage-green",
    },
    {
      variant: "outline",
      color: "border",
      class: "bg-transparent border-2 border-border text-border",
    },
    {
      variant: "outline",
      color: "neutral",
      class: "bg-transparent border-2 border-neutral text-neutral",
    },
    {
      variant: "outline",
      color: "purple",
      class: "bg-transparent border-2 border-purple text-purple",
    },
    {
      variant: "outline",
      color: "pink",
      class: "bg-transparent border-2 border-pink text-pink",
    },
    {
      variant: "outline",
      color: "maroon",
      class: "bg-transparent border-2 border-maroon text-maroon",
    },
    {
      variant: "outline",
      color: "coral",
      class: "bg-transparent border-2 border-coral text-coral",
    },
    {
      variant: "outline",
      color: "marigold",
      class: "bg-transparent border-2 border-marigold text-marigold",
    },
    {
      variant: "blur",
      color: "black",
      class: "bg-black/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "white",
      class: "bg-white/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "red",
      class: "bg-red-600/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "aqua",
      class: "bg-aqua/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "aqua-light",
      class: "bg-aqua-light/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "forest-green",
      class: "bg-forest-green/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "sage-green",
      class: "bg-sage-green/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "border",
      class: "bg-border/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "neutral",
      class: "bg-neutral/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "purple",
      class: "bg-purple/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "pink",
      class: "bg-pink/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "maroon",
      class: "bg-maroon/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "coral",
      class: "bg-coral/10 backdrop-blur text-white",
    },
    {
      variant: "blur",
      color: "marigold",
      class: "bg-marigold/10 backdrop-blur text-white",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "black",
    rounded: "lg",
  },
});

/** Create the typing for Button Variant Props */
export type BadgeVariants = VariantProps<typeof badgeVariants>;

/** Export ButtonProps as one type */
export interface BadgeProps extends BadgeVariants {
  className?: string;
  children: React.ReactNode;
}
