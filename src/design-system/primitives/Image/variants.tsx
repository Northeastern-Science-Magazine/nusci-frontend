import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import { tv, type VariantProps } from "tailwind-variants";

export const imageVariants = tv({
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
    ratio: "1/1",
    rounded: "default",
    emphasis: "default",
  },
});

export type ImageVariants = VariantProps<typeof imageVariants>;

export interface ImageProps extends ImageVariants, AnimationProps, DisplayProps, MarginProps, PaddingProps, PositionProps {
  ratio?: number;
  raw?: boolean;
  src: string;
  alt: string;
  width: string;
  height?: string;
}

export const imageVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    imageVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );
