import React, { ClassAttributes, InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Define Basic Text Variants using Tailwind Variant Definitions */
export const textVariants = tv({
  base: "rounded px-3 py-2 focus:outline-none focus:ring-2",
  variants: {
    variant: {
      outline: "border-2 border-gray-500 focus:bg-grey-200",
      filled: "bg-black text-white focus:ring-gray focus:bg-whitesmoke",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

/** Create TextProp types for variants */
export type TextVariants = VariantProps<typeof textVariants>;

/** Utilize HTML Text attributes excluding size and color */
type HTMLTextProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
  ClassAttributes<HTMLInputElement>;

/** Export the text props as one type */
export interface TextProps extends TextVariants, HTMLTextProps {
  placeholder?: string;
  label: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
