import { MediaOverlayProps, OverlayProps, overlayVariants } from "./variants";
import React from "react";
import clsx from "clsx";
import Box from "@/primitives/Box";
import Icon from "@/primitives/Icon";

export function Overlay({ children, className, ...variantProps }: OverlayProps) {
  return <div className={clsx("absolute inset-0", overlayVariants(variantProps), className)}>{children}</div>;
}

export function OverlayMedia({ className, onClick, children, iconProps }: MediaOverlayProps) {
  const [imageChild, overlayChild] = children;

  return (
    <Box className={clsx("relative", className)} onClick={onClick}>
      {iconProps ? (
        <Box className="absolute inset-0 flex items-center justify-center" color="neutral">
          <Icon icon={iconProps.icon} size={iconProps.size} color={iconProps.color} />
        </Box>
      ) : (
        imageChild
      )}
      {overlayChild}
    </Box>
  );
}
