import React from "react";
import { TextProps, textVariantsCN } from "./variants";

export default function Text({ className, as = "p", children, ...props }: TextProps) {
  const Component = as === "p" ? "p" : "span";
  return <Component className={textVariantsCN(props, className)}>{children}</Component>;
}
