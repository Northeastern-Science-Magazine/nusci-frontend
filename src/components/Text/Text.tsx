import React from "react";
import { TextProps } from "./variants";
import { textVariants } from "./variants";

export default function Text({ className = "", as = "p", children, ...variantProps }: TextProps) {
  const Component = as === "p" ? "p" : "span";
  return <Component className={`${textVariants(variantProps)} ${className}`}>{children}</Component>;
}
