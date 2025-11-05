import { tv, VariantProps } from "tailwind-variants";
import { ReactElement } from "react";

export const dropdownInputVariants = tv({
  base: "px-3 py-2 text-black bg-white hover:bg-stone-100",
  variants: {
    size : {
      xs: "px-2 py-1 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-4 text-base",
      lg: "px-12 py-4 text-lg",
      xl: "px-16 py-6 text-xl",
    },
    color: {
      black: "text-white bg-black hover:bg-black hover:bg-opacity-75",
      white: "text-black bg-white hover:bg-stone-100",
      red: "text-white bg-red-500 hover:bg-red-500 hover:bg-opacity-75",
      aqua: "text-white bg-aqua hover:bg-aqua hover:bg-opacity-75",
      "aqua-light": "text-black bg-aqua-light hover:bg-aqua-light hover:bg-opacity-75",
      "forest-green": "text-white bg-forest-green hover:bg-forest-green hover:bg-opacity-75",
      "sage-green": "text-black bg-sage-green hover:bg-sage-green hover:bg-opacity-75",
      border: "text-black bg-border hover:bg-border hover:bg-opacity-75",
      neutral: "text-black bg-neutral hover:bg-neutral hover:bg-opacity-75",
      purple: "text-white bg-purple hover:bg-purple hover:bg-opacity-75",
      pink: "text-black bg-pink hover:bg-pink hover:bg-opacity-75",
      maroon: "text-white bg-maroon hover:bg-maroon hover:bg-opacity-75",
      coral: "text-black bg-coral hover:bg-coral hover:bg-opacity-75",
      marigold: "text-black bg-marigold hover:bg-marigold hover:bg-opacity-75",
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
  base: "px-3 py-2 text-black bg-white hover:bg-stone-100",
  variants: {
    size : {
      xs: "px-2 py-1 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-4 text-base",
      lg: "px-12 py-4 text-lg",
      xl: "px-16 py-6 text-xl",
    },
    color: {
      black: "text-white bg-black hover:bg-black hover:bg-opacity-75",
      white: "text-black bg-white hover:bg-stone-100",
      red: "text-white bg-red-500 hover:bg-red-500 hover:bg-opacity-75",
      aqua: "text-white bg-aqua hover:bg-aqua hover:bg-opacity-75",
      "aqua-light": "text-black bg-aqua-light hover:bg-aqua-light hover:bg-opacity-75",
      "forest-green": "text-white bg-forest-green hover:bg-forest-green hover:bg-opacity-75",
      "sage-green": "text-black bg-sage-green hover:bg-sage-green hover:bg-opacity-75",
      border: "text-black bg-border hover:bg-border hover:bg-opacity-75",
      neutral: "text-black bg-neutral hover:bg-neutral hover:bg-opacity-75",
      purple: "text-white bg-purple hover:bg-purple hover:bg-opacity-75",
      pink: "text-black bg-pink hover:bg-pink hover:bg-opacity-75",
      maroon: "text-white bg-maroon hover:bg-maroon hover:bg-opacity-75",
      coral: "text-black bg-coral hover:bg-coral hover:bg-opacity-75",
      marigold: "text-black bg-marigold hover:bg-marigold hover:bg-opacity-75",
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
