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
  const customStyles: React.CSSProperties = {};
  
  if (props.customMinWidth) customStyles.minWidth = props.customMinWidth;
  if (props.customMaxWidth) customStyles.maxWidth = props.customMaxWidth;
  if (props.customMinHeight) customStyles.minHeight = props.customMinHeight;
  if (props.customMaxHeight) customStyles.maxHeight = props.customMaxHeight;

  return (<div className={clsx(boxVariants(props), className)} style={customStyles}>{props.children}</div>);
};
