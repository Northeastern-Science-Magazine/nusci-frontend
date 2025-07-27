import { tv, type VariantProps } from "tailwind-variants";

export const checkboxVariants = tv({
  base: "relative flex items-center justify-center rounded-md border shrink-0",
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "	w-6 h-6",
    },
    color: {
        black: "bg-white border-black",
        white: "bg-white border-white",
        red: "bg-white border-red-500",
        aqua: "bg-white border-aqua",
        "aqua-light":
          "bg-white border-aqua-light",
        "forest-green":
          "bg-white border-forest-green",
        "sage-green":
          "bg-white border-sage-green",
        border: "bg-white border-border",
        neutral: "bg-white border-neutral",
        purple: "bg-white border-purple",
        pink: "bg-white border-pink",
        maroon: "bg-white border-maroon",
        coral: "bg-white border-coral",
        marigold: "bg-white border-marigold",
      },
  },
  defaultVariants: {
    color: "black",
    size: "md",
  }, 
});

export interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
    options: Array<string>;
    disabled?: boolean;
    checkedValues: Array<string>;
    handleCheckedChange: (option: string, value: boolean) => void;
}

export const indicatorVariants = tv({
  base: "relative flex items-center justify-center rounded-md shrink-0",
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "	w-6 h-6",
    },
    color: {
      black: "bg-black border-black",
      white: "bg-black",
      red: "bg-red-500 border-red-500",
      aqua: "bg-aqua",
      "aqua-light": "bg-aqua-light",
      "forest-green": "bg-forest-green",
      "sage-green": "bg-sage-green",
      border: "bg-border",
      neutral: "bg-neutral",
      purple: "bg-purple",
      pink: "bg-pink",
      maroon: "bg-maroon",
      coral: "bg-coral",
      marigold: "bg-marigold",
      },
  },
  defaultVariants: {
    color: "black",
    size: "md",
  }, 
});

export interface IndicatorProps extends VariantProps<typeof indicatorVariants> {}

