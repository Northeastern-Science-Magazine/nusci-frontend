import React from "react";
import { LinkProps } from "./variants";
import { linkVariants } from "./variants";

export default function ({ className = "", as = "p", children, href, ...variantProps }: LinkProps & { href?: string }) {
  const Component = as === "a" ? "a" : as === "p" ? "p" : "a";
  return <Component className={`${linkVariants(variantProps)} ${className}`} 
  href={as === "a" ? href : undefined}>{children}</Component>;
}