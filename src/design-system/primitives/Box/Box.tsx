import React from "react";
import { BoxProps, boxVariantsCN } from "./variants";
import clsx from "clsx";

/**
 * Box Component
 *
 * Box is used for layout purposes
 *
 * @param { BoxProps } props
 * @returns Box Component
 */
export const Box = ({ className, children, ...variantProps }: BoxProps) => {
  return <div className={clsx(boxVariantsCN(variantProps), className)}>{children}</div>;
};
