import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const linkVariants = tv({
  base: "",
});

/** Create the typing for Link Variant Props */
export type LinkVariants = VariantProps<typeof linkVariants>;

/** Export LinkProps as one type */
export interface LinkProps extends LinkVariants {
  className?: string;
  href: string;
  newWindow?: boolean;
  children: React.ReactNode;
}
