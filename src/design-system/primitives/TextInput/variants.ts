import React, { ClassAttributes, InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Define Basic Text Variants using Tailwind Variant Definitions */
export const textInputVariants = tv({
  base: "rounded px-3 py-2 border focus:outline-none focus:ring-2",
  variants: {
    variant: {
      outline: "bg-transparent",
      filled: "",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    color: {
      black: "text-white border-black focus:ring-black",
      white: "text-black border-white focus:ring-white",
      red: "text-white border-red-500 focus:ring-red-500",
      aqua: "text-white border-aqua focus:ring-aqua",
      "aqua-light":
      "text-black border-aqua-light focus:ring-aqua-light",
      "forest-green":
      "text-white border-forest-green focus:ring-forest-green",
      "sage-green":
      "text-black border-sage-green focus:ring-sage-green" ,
      border: "text-white border-border focus:ring-border",
      neutral: "text-white border-neutral focus:ring-neutral",
      purple: "text-white border-purple focus:ring-purple",
      pink: "text-white border-pink focus:ring-pink",
      maroon: "text-white border-maroon focus:ring-maroon",
      coral: "text-white border-coral focus:ring-coral",
      marigold: "text-white border-marigold focus:ring-marigold", 
    }
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
      class: "bg-transparent border-2 border-red-500 text-red-500",
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

    //filled variants
    {
      variant: "filled", 
      color: "black",
      class: "bg-black",
    },
    {
      variant: "filled", 
      color: "white",
      class: "bg-white",
    },
    {
      variant: "filled", 
      color: "red",
      class: "bg-red-500",
    },
    {
      variant: "filled", 
      color: "aqua",
      class: "bg-aqua",
    },
    {
      variant: "filled", 
      color: "aqua-light",
      class: "bg-aqua-light",
    },
    {
      variant: "filled", 
      color: "forest-green",
      class: "bg-forest-green",
    },
    {
      variant: "filled", 
      color: "sage-green",
      class: "bg-sage-green",
    },
    {
      variant: "filled", 
      color: "border",
      class: "bg-border",
    },
    {
      variant: "filled", 
      color: "neutral",
      class: "bg-neutral",
    },
    {
      variant: "filled", 
      color: "purple",
      class: "bg-purple",
    },
    {
      variant: "filled", 
      color: "pink",
      class: "bg-pink",
    },
    {
      variant: "filled", 
      color: "maroon",
      class: "bg-maroon",
    },
    {
      variant: "filled", 
      color: "coral",
      class: "bg-coral",
    },
    {
      variant: "filled", 
      color: "marigold",
      class: "bg-marigold",
    },
  ],
  defaultVariants: {
    variant: "outline",
    size: "md",
    color: "black",
  },
});

/** Create TextInputProp types for variants */
export type TextInputVariants = VariantProps<typeof textInputVariants>;

/** Utilize HTML Text attributes excluding size and color */
type HTMLTextProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
  ClassAttributes<HTMLInputElement>;

/** Export the text props as one type */
export interface TextInputProps extends TextInputVariants, HTMLTextProps {
  placeholder?: string;
  label: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}