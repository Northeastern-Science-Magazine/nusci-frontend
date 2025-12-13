import { tv, type VariantProps } from "tailwind-variants";

export const dialogTriggerVariants = tv({});

export type DialogTriggerVariants = VariantProps<typeof dialogTriggerVariants>;

export interface DialogTriggerProps extends DialogTriggerVariants {
  children?: React.ReactNode;
}

export const dialogWindowVariants = tv({
  base: "fixed inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-md",
  variants: {
    size: {
      xs: "max-w-xs",
      sm: "max-w-md",
      md: "max-w-xl",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    },
    color: {
      black: "text-white bg-black",
      white: "text-black bg-white",
      red: "text-white bg-red-500 border-red-500",
      aqua: "text-white bg-aqua",
      "aqua-light": "text-black bg-aqua-light",
      "forest-green": "text-white bg-forest-green",
      "sage-green": "text-black bg-sage-green",
      border: "text-white bg-border",
      neutral: "text-black bg-neutral",
      purple: "text-white bg-purple",
      pink: "text-black bg-pink",
      maroon: "text-white bg-maroon",
      coral: "text-black bg-coral",
      marigold: "text-black bg-marigold",
    },
  },
  defaultVariants: { size: "md", color: "white" },
});

export type DialogWindowVariants = VariantProps<typeof dialogWindowVariants>;

export interface DialogWindowProps extends DialogWindowVariants {
  children?: React.ReactNode;
  className?: string;
}

type DialogTriggerElement = React.ReactElement<DialogTriggerProps>;
type DialogWindowElement = React.ReactElement<DialogWindowProps>;
export type DialogChildren = [DialogTriggerElement, DialogWindowElement];

export const dialogVariants = tv({});

export type DialogVariants = VariantProps<typeof dialogVariants>;

export interface DialogProps extends DialogVariants {
  children: DialogChildren;
}
