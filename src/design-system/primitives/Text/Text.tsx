import React from "react";
import { TextProps } from "./variants";
import { textVariants } from "./variants";
import clsx from "clsx";

export default function Text({ className, as = "p", children, ...variantProps }: TextProps) {
  const Component = as === "p" ? "p" : "span";
  return <Component className={clsx(textVariants(variantProps), className)}>{children}</Component>;
}
