import React from "react";
import { LinkProps } from "./variants";
import { linkVariants } from "./variants";

export default function ({
  className,
  children,
  href,
  target,
  ...variantProps
}: LinkProps) {
  const targetParameter = target === "_blank" ? "_blank" : "";
  return (
    <a
      className={`${linkVariants(variantProps)} ${className}`}
      href={href}
      target={targetParameter}
    >
      {children}
    </a>
  );
}
