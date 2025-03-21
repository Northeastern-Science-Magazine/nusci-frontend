import React, { ClassAttributes, InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

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

export type TextVariants = VariantProps<typeof textVariants>;

type HTMLTextProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
  ClassAttributes<HTMLInputElement>;

export interface TextProps extends TextVariants, HTMLTextProps {
  placeholder?: string;
  label?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
