import React from "react";
import { BoxProps, boxVariants } from "./variants";
import clsx from "clsx";
import { animationVariants } from "@/design-system/utilities/animation";

/**
 * Box Component
 *
 * Box is used for layout purposes
 *
 * @param { BoxProps } props
 * @returns Box Component
 */
export const Box = ({ className, children, ...variantProps }: BoxProps) => {
  return <div className={clsx(boxVariants(variantProps), animationVariants(variantProps), className)}>{children}</div>;
};
