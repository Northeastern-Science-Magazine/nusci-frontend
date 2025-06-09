import { MediaOverlayProps, OverlayProps } from "./variants";
import React from "react";
import clsx from "clsx";

export function Overlay({ children }: OverlayProps) {
  return <div className="absolute inset-0">{children}</div>;
}
export function OverlayMedia({ className, onClick, children }: MediaOverlayProps) {
  const [imageChild, overlayChild] = children;

  return (
    <div className={clsx("relative", className)} onClick={onClick}>
      {imageChild}
      {overlayChild}
    </div>
  );
}
