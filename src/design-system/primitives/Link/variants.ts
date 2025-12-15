import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const linkVariants = tv({});

/** Create the typing for Link Variant Props */
export type LinkVariants = VariantProps<typeof linkVariants>;

/** Export LinkProps as one type */
export interface LinkProps
  extends LinkVariants,
    AnimationProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  className?: string;
  href: string;
  newWindow?: boolean;
  children: React.ReactNode;
}

export const linkVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    linkVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );
