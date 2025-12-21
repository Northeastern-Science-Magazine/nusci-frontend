import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Define Button Variants using Tailwind Variant Definitions */
export const buttonVariants = tv({
  base: "items-center justify-center font-medium transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    variant: {
      default: "shadow bg-opacity-100 hover:brightness-125",
      emphasis: "shadow-lg bg-opacity-100 hover:shadow-xl hover:brightness-125",
      outline: "",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    },
    color: {
      black:
        "text-white bg-black border-black hover:bg-black hover:border-black focus:ring-black",
      white:
        "text-black bg-white border-white hover:bg-white hover:border-white focus:ring-white",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 focus:ring-red-500",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua focus:ring-aqua",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light focus:ring-aqua-light",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green focus:ring-forest-green",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green focus:ring-sage-green",
      border: "text-black bg-border border-border hover:bg-border hover:border-border focus:ring-border",
      neutral: "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral focus:ring-neutral",
      purple: "text-white bg-purple border-purple hover:bg-purple hover:border-purple focus:ring-purple",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink focus:ring-pink",
      maroon:
        "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon focus:ring-maroon",
      coral:
        "text-black bg-coral border-coral hover:bg-coral hover:border-coral focus:ring-coral",
      marigold:
        "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold focus:ring-marigold",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      color: "black",
      class: "bg-transparent border-2 border-black text-black hover:text-white",
    },
    {
      variant: "outline",
      color: "white",
      class: "bg-transparent border-2 border-white text-white hover:text-black",
    },
    {
      variant: "outline",
      color: "red",
      class:
        "bg-transparent border-2 border-red-600 text-red-600 hover:text-white",
    },
    {
      variant: "outline",
      color: "aqua",
      class: "bg-transparent border-2 border-aqua text-aqua hover:text-white",
    },
    {
      variant: "outline",
      color: "aqua-light",
      class:
        "bg-transparent border-2 border-aqua-light text-aqua-light hover:text-black",
    },
    {
      variant: "outline",
      color: "forest-green",
      class:
        "bg-transparent border-2 border-forest-green text-forest-green hover:text-white",
    },
    {
      variant: "outline",
      color: "sage-green",
      class:
        "bg-transparent border-2 border-sage-green text-sage-green hover:text-black",
    },
    {
      variant: "outline",
      color: "border",
      class:
        "bg-transparent border-2 border-border text-border hover:text-white",
    },
    {
      variant: "outline",
      color: "neutral",
      class:
        "bg-transparent border-2 border-neutral text-neutral hover:text-black",
    },
    {
      variant: "outline",
      color: "purple",
      class:
        "bg-transparent border-2 border-purple text-purple hover:text-white",
    },
    {
      variant: "outline",
      color: "pink",
      class: "bg-transparent border-2 border-pink text-pink hover:text-black",
    },
    {
      variant: "outline",
      color: "maroon",
      class:
        "bg-transparent border-2 border-maroon text-maroon hover:text-white",
    },
    {
      variant: "outline",
      color: "coral",
      class: "bg-transparent border-2 border-coral text-coral hover:text-black",
    },
    {
      variant: "outline",
      color: "marigold",
      class:
        "bg-transparent border-2 border-marigold text-marigold hover:text-white",
    },

    // Emphasis variant for each color
    {
      variant: "emphasis",
      color: "black",
      class: "shadow-black",
    },
    {
      variant: "emphasis",
      color: "white",
      class: "shadow-black",
    },
    {
      variant: "emphasis",
      color: "red",
      class: "shadow-red-500",
    },
    {
      variant: "emphasis",
      color: "aqua",
      class: "shadow-aqua",
    },
    {
      variant: "emphasis",
      color: "aqua-light",
      class: "shadow-aqua-light",
    },
    {
      variant: "emphasis",
      color: "forest-green",
      class: "shadow-forest-green",
    },
    {
      variant: "emphasis",
      color: "sage-green",
      class: "shadow-sage-green",
    },
    {
      variant: "emphasis",
      color: "border",
      class: "shadow-border",
    },
    {
      variant: "emphasis",
      color: "neutral",
      class: "shadow-neutral",
    },
    {
      variant: "emphasis",
      color: "purple",
      class: "shadow-purple",
    },
    {
      variant: "emphasis",
      color: "pink",
      class: "shadow-pink",
    },
    {
      variant: "emphasis",
      color: "maroon",
      class: "shadow-maroon",
    },
    {
      variant: "emphasis",
      color: "coral",
      class: "shadow-coral",
    },
    {
      variant: "emphasis",
      color: "marigold",
      class: "shadow-marigold",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    color: "black",
  },
});

/** Create the typing for Button Variant Props */
export type ButtonVariants = VariantProps<typeof buttonVariants>;

/** Ascertain default HTML Button attributes (disabled, etc) */
type HTMLButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, "color"> &
  ClassAttributes<HTMLButtonElement>;

/** Export ButtonProps as one type */
export interface ButtonProps
  extends ButtonVariants,
    HTMLButtonProps,
    AnimationProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const buttonVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    buttonVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );
