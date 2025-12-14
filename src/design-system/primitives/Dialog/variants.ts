import { BasicColorProps, basicColorVariants } from "@/design-system/utilities/props/BasicColor/basiccolor";
import clsx from "clsx";
import { tv, type VariantProps } from "tailwind-variants";

/** Dialog Trigger */
export const dialogTriggerVariants = tv({});
export type DialogTriggerVariants = VariantProps<typeof dialogTriggerVariants>;
export interface DialogTriggerProps extends DialogTriggerVariants {
  children?: React.ReactNode;
}

/** Dialog Window */
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
  },
  defaultVariants: { size: "md", color: "white" },
});

export type DialogWindowVariants = VariantProps<typeof dialogWindowVariants>;

export interface DialogWindowProps extends DialogWindowVariants, BasicColorProps {
  children?: React.ReactNode;
  className?: string;
}

export const dialogWindowVariantsCN = (variantProps: VariantProps<any>) =>
  clsx(dialogWindowVariants(variantProps), basicColorVariants(variantProps));

/** Dialog */
type DialogTriggerElement = React.ReactElement<DialogTriggerProps>;
type DialogWindowElement = React.ReactElement<DialogWindowProps>;
export type DialogChildren = [DialogTriggerElement, DialogWindowElement];

export const dialogVariants = tv({});

export type DialogVariants = VariantProps<typeof dialogVariants>;

export interface DialogProps extends DialogVariants {
  children: DialogChildren;
}
