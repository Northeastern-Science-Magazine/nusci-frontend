import React from "react";
import { BoxProps, boxVariants } from "./variants";
import clsx from "clsx";

/**
 * Box Component
 *
 * Box is used for layout purposes
 *
 * @param { BoxProps } props
 * @returns Box Component
 */
export const Box = ({ className, ...props }: BoxProps) => {
  return <div className={clsx(boxVariants(props), className)}>{props.children}</div>;
};
