import { tv, VariantProps } from "tailwind-variants";
import { ReactElement } from "react";

export const dropdownInputVariants = tv({
  base: "",
  variants: {
    size : {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    },
    color: {
      black: "text-white bg-black border-black hover:bg-black hover:border-black hover:bg-opacity-75",
      white: "text-black bg-white border-white hover:bg-white hover:border-white hover:bg-opacity-75",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 hover:bg-opacity-75",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua hover:bg-opacity-75",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light hover:bg-opacity-75",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green hover:bg-opacity-75",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green hover:bg-opacity-75",
      border: "text-white bg-border border-border hover:bg-border hover:border-border hover:bg-opacity-75",
      neutral: "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral hover:bg-opacity-75",
      purple: "text-white bg-purple border-purple hover:bg-purple hover:border-purple hover:bg-opacity-75",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink hover:bg-opacity-75",
      maroon: "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon hover:bg-opacity-75",
      coral: "text-black bg-coral border-coral hover:bg-coral hover:border-coral hover:bg-opacity-75",
      marigold: "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold hover:bg-opacity-75",
    },
  }
});

export type DropdownInputVariants = VariantProps<typeof dropdownInputVariants>;

export interface DropdownInputProps extends DropdownInputVariants {
  onChange?: (value: string) => void;
  className?: string;
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[];
  placeholder?: string;
}

export const dropdownItemVariants = tv({
  base: "",
  variants: {
    color: {
      black: "text-white bg-black border-black hover:bg-black hover:border-black hover:bg-opacity-75",
      white: "text-black bg-white border-white hover:bg-white hover:border-white hover:bg-opacity-75",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 hover:bg-opacity-75",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua hover:bg-opacity-75",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light hover:bg-opacity-75",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green hover:bg-opacity-75",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green hover:bg-opacity-75",
      border: "text-white bg-border border-border hover:bg-border hover:border-border hover:bg-opacity-75",
      neutral: "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral hover:bg-opacity-75",
      purple: "text-white bg-purple border-purple hover:bg-purple hover:border-purple hover:bg-opacity-75",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink hover:bg-opacity-75",
      maroon: "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon hover:bg-opacity-75",
      coral: "text-black bg-coral border-coral hover:bg-coral hover:border-coral hover:bg-opacity-75",
      marigold: "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold hover:bg-opacity-75",
    },
  }
});

export type DropdownItemVariants = VariantProps<typeof dropdownItemVariants>;

export interface DropdownItemProps extends DropdownItemVariants {
  className?: string;
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}
