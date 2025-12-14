import { tv, type VariantProps } from "tailwind-variants";
import React, { HTMLAttributes } from "react";
import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { BasicColorProps, basicColorVariants } from "@/design-system/utilities/props/BasicColor/basiccolor";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";

/** Tailwind Variants Declaration */
export const boxVariants = tv({
  base: "box-border",
  defaultVariants: {
    position: "relative",
    display: "block",
  },
});

/** Create Typing for Variants */
export type BoxVariants = VariantProps<typeof boxVariants>;
type HTMLBoxProps = Omit<HTMLAttributes<HTMLDivElement>, "color">;

/** Export Props */
export interface BoxProps
  extends HTMLBoxProps,
    BoxVariants,
    AnimationProps,
    BasicColorProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  className?: string;
  children: React.ReactNode;
}

/** Export Variant className Generator */
export const boxVariantsCN = (variantProps: VariantProps<any>) =>
  clsx(
    boxVariants(variantProps),
    animationVariants(variantProps),
    basicColorVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps)
  );
