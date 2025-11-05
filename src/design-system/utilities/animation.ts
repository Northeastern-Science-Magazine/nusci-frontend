import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const animationVariants = tv({
  base: "transition-all duration-700 ease-out",
  variants: {
    animation: {
        fadeIn: "opacity-0 data-[visible=true]:opacity-100",
        fadeInRight:  "opacity-0 translate-x-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0",
        fadeInLeft: "opacity-0 -translate-x-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0",
        fadeInTop: "opacity-0 -translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
        fadeInBottom: "opacity-0 translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
        moveUpHover: "hover:-translate-y-1",
        moveDownHover: "hover:translate-y-1",
        moveRightHover: "hover:translate-x-1",
        moveLeftHover: "hover:-translate-x-1",
        scale105Hover: "hover:scale-105",
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
