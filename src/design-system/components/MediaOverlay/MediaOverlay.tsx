import { MediaOverlayProps, OverlayProps } from "./variants";
import React from "react";
import clsx from "clsx";
import Box from "@/primitives/Box";

export function Overlay({ children }: OverlayProps) {
  return <div className="absolute inset-0">{children}</div>;
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
