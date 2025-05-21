import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const checkboxVariants = tv({
  base: "flex items-center justify-center rounded-md border border-slate-400",
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "	w-6 h-6",
    },
    color: {
        black: "text-white bg-black border-black hover:bg-black",
        white: "text-black bg-white border-white hover:bg-white",
        red: "text-white bg-red-500 border-red-500 hover:bg-red-500",
        aqua: "text-white bg-aqua border-aqua hover:bg-aqua",
        "aqua-light":
          "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light",
        "forest-green":
          "text-white bg-forest-green border-forest-green",
        "sage-green":
          "text-black bg-sage-green border-sage-green",
        border: "text-white bg-border border-border",
        neutral: "text-black bg-neutral border-neutral",
        purple: "text-white bg-purple border-purple",
        pink: "text-black bg-pink border-pink",
        maroon: "text-white bg-maroon border-maroon",
        coral: "text-black bg-coral border-coral",
        marigold: "text-black bg-marigold border-marigold",
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
