import { GridColProps, GridProps, GridRowProps, gridVariants, gridColVariants, gridRowVariants } from "./variants";
import clsx from "clsx";

export function Grid({ className, children, ...variantProps }: GridProps) {
  return <div className={clsx(gridVariants(variantProps), className)}>{children}</div>;
}

export function GridCol({ className, children, ...variantProps }: GridColProps) {
  return <div className={clsx(gridColVariants(variantProps), className)}>{children}</div>;
}

export function GridRow({ className, children, ...variantProps }: GridRowProps) {
  return <div className={clsx(gridRowVariants(variantProps), className)}>{children}</div>;
}
