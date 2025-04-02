import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const cardVariants = tv({
  base: "overflow-hidden",
  variants: {
    variant: {
      default: "",
      shadow: "drop-shadow-2xl",
      rounded: "rounded-lg",
      border: "rounded-lg border"
    },
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg"
    },
    backgroundColor: {
      white: "bg-white",
      black: "bg-black"
    },
    textColor: {
      white: "text-[#fafafa]",
      black: "text-[#0f0f0f]",
      red: "text-[#fc1c03]",
      green: "text-[#2beb00]",
      brown: "text-[#964B00]",
      yellow: "text-[#FFFF00]",
      blue: "text-[#0000FF]",
      lightBlue: "text-[#87CEEB]"
    }
  },
  compoundVariants: [
    // Default variant combinations
    {
      variant: "default",
      backgroundColor: "white",
      class: "border border-gray-200"
    },
    {
      variant: "default",
      backgroundColor: "black",
      class: "border border-gray-800"
    },
    
    // Shadow variant combinations
    {
      variant: "shadow",
      backgroundColor: "white",
      class: "shadow-gray-300"
    },
    {
      variant: "shadow",
      backgroundColor: "black",
      class: "shadow-gray-900"
    },
    
    // Rounded variant combinations
    {
      variant: "rounded",
      backgroundColor: "white",
      class: "overflow-hidden"
    },
    {
      variant: "rounded",
      backgroundColor: "black",
      class: "overflow-hidden"
    },
    
    // Border variant combinations
    {
      variant: "border",
      backgroundColor: "white",
      class: "border-gray-200"
    },
    {
      variant: "border",
      backgroundColor: "black",
      class: "border-gray-800"
    },
    
    // Size combinations
    {
      size: "sm",
      class: "p-3"
    },
    {
      size: "md",
      class: "p-4"
    },
    {
      size: "lg",
      class: "p-5"
    },
    
    // Text color with background combinations
    {
      backgroundColor: "white",
      textColor: "black",
      class: "shadow-sm"
    },
    {
      backgroundColor: "black",
      textColor: "white",
      class: "shadow-md"
    },
    {
      backgroundColor: "white",
      textColor: "red",
      class: "shadow-sm border-red-100"
    },
    {
      backgroundColor: "black",
      textColor: "red",
      class: "shadow-md border-red-900"
    },
    
    // Additional combinations for other text colors
    {
      backgroundColor: "white",
      textColor: "green",
      class: "shadow-sm border-green-100"
    },
    {
      backgroundColor: "black",
      textColor: "green",
      class: "shadow-md border-green-900"
    },
    {
      backgroundColor: "white",
      textColor: "blue",
      class: "shadow-sm border-blue-100"
    },
    {
      backgroundColor: "black",
      textColor: "blue",
      class: "shadow-md border-blue-900"
    }
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    backgroundColor: "black",
    textColor: "white"
  }
});

/** Create the typing for Card Variant Props */
export type CardVariants = VariantProps<typeof cardVariants>;

/** Ascertain default HTML Card attributes */
type HTMLCardProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> & ClassAttributes<HTMLDivElement>;

/** Export CardProps as one type */
export interface CardProps extends CardVariants, HTMLCardProps {
  imageURL?: string;
  title?: string;
  paragraph?: string;
  children?: React.ReactNode;
}