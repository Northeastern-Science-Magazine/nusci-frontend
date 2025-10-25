import React from "react";
import { LinkProps } from "./variants";
import { linkVariants } from "./variants";
import clsx from "clsx";

export default function Link({
  className,
  children,
  href,
  newWindow = false,
  ...variantProps
}: LinkProps) {
  const targetParameter = newWindow ? "_blank" : "";
  return (
    <a
      className={clsx(linkVariants(variantProps), className)}
      href={href}
      target={targetParameter}
    >
      {children}
    </a>
  );
}
