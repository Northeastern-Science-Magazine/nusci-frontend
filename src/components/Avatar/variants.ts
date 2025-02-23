import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Define Button Variants using Tailwind Variant Definitions */
export const avatarVariants = tv({
  base: "",
  variants: {
    variant: {
      default: "",
    },
    shape: {
        round: "rounded-full"
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    },
  }, 
  compoundVariants: [
    {variant: "default"}
  ],
//   defaultVariants: {
//     variant: "default",
//     size: "md",
//     color: "black",
//   },
});

/** Create the typing for Button Variant Props */
export type AvatarVariants = VariantProps<typeof avatarVariants>;
//export type ButtonVariants = VariantProps<typeof buttonVariants>;

/** Ascertain default HTML Button attributes (disabled, etc) */
// type HTMLAvatarProps = Omit<HTMLAttributes<HTMLButtonElement>, "color"> & ClassAttributes<HTMLButtonElement>;

/** Export ButtonProps as one type */
export interface AvatarProps extends AvatarVariants {
    children: React.ReactNode;
    onClick?: () => void;
  }

// export interface ButtonProps extends ButtonVariants, HTMLButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
// }
