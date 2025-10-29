import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const animationVariants = tv({
  base: "transition-all duration-500 ease-out",
  variants: {
    animation: {
        fadeIn: "animate-fade-in",
        fadeInRight: "animate-fade-in-right",
        fadeInLeft: "animate-fade-in-left",
        fadeInTop: "animate-fade-in-down",
        fadeInBottom: "animate-fade-in-up",
        moveUpHover: "hover:animate-moveUp",
        moveDownHover: "hover:animate-moveDown",
        moveRightHover: "hover:animate-moveRight",
        moveLeftHover: "hover:animate-moveLeft",
        scale105Hover: "hover:animate-scaleUp",
    },
  },
  defaultVariants: {
    animation: "fadeIn"
  },
});

export type AnimationVariants = VariantProps<typeof animationVariants>;

export interface AnimationProps extends AnimationVariants {
  className?: string;
  children: React.ReactNode;
}
