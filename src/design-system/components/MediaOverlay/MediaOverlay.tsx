import { MediaOverlayProps, OverlayProps, overlayVariants } from "./variants";
import React from "react";
import clsx from "clsx";
import Box from "@/primitives/Box";

export function Overlay({ children, ...variantProps }: OverlayProps) {
  return <div className={clsx("absolute inset-0", overlayVariants(variantProps))}>{children}</div>;
}

export function OverlayMedia({ className, onClick, children }: MediaOverlayProps) {
  const [imageChild, overlayChild] = children;

  return (
    <Box className={clsx("relative", className)} onClick={onClick}>
      {imageChild}
      {overlayChild}
    </Box>
  );
}
