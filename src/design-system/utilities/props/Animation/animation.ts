import { tv, type VariantProps } from "tailwind-variants";

export const animationVariants = tv({
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
    duration: {
      100: "[animation-duration:100ms]",
      200: "[animation-duration:200ms]",
      300: "[animation-duration:300ms]",
      400: "[animation-duration:400ms]",
      500: "[animation-duration:500ms]",
      600: "[animation-duration:600ms]",
      700: "[animation-duration:700ms]",
    },
  },
});

export type AnimationProps = VariantProps<typeof animationVariants>;
