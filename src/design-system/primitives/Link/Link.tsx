import React from "react";
import { LinkProps, linkVariantsCN } from "./variants";

export default function Link({ className, children, href, newWindow = false, ...variantProps }: LinkProps) {
  const targetParameter = newWindow ? "_blank" : "";
  return (
    <a className={linkVariantsCN(variantProps, className)} href={href} target={targetParameter}>
      {children}
    </a>
  );
}
