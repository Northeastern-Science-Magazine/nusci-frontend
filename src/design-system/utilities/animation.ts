import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const animationVariants = tv({
  base: "transition-all duration-700 ease-out",
  variants: {
    animation: {
        fadeIn: "opacity-0 animate-fadeIn",
        fadeInRight: "opacity-0 animate-fadeInRight",
        fadeInLeft: "opacity-0 animate-fadeInLeft",
        fadeInTop: "opacity-0 animate-fadeInTop",
        fadeInBottom: "opacity-0 animate-fadeInBottom",
        moveUpHover: "hover:-translate-y-3",
        moveDownHover: "hover:translate-y-3",
        moveRightHover: "hover:translate-x-3",
        moveLeftHover: "hover:-translate-x-3",
        scale125Hover: "hover:scale-125",
    },
  },
  defaultVariants: {
    animation: "fadeIn"
  },
});

export type AnimationVariants = VariantProps<typeof animationVariants>;

export interface AnimationProps extends AnimationVariants {
  className?: string;
  children?: React.ReactNode;
}
