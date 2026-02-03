import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import { tv, type VariantProps } from "tailwind-variants";

export const videoVariants = tv({
  base: "w-full h-full object-cover",
  variants: {
    rounded: {
      default: "",
      rounded: "rounded-md",
    },
    emphasis: {
      default: "",
      emphasis: "shadow-lg",
    },
  },
  defaultVariants: {
    rounded: "default",
    emphasis: "default",
  },
});

export type VideoVariants = VariantProps<typeof videoVariants>;

export interface VideoProps
  extends VideoVariants,
    AnimationProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  src: string;
  ratio?: number;
  raw?: boolean;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  preload?: string;
  poster?: string;
  className?: string;
}

export const videoVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    videoVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );
