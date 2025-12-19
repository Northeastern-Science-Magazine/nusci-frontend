import { GridColProps, GridProps, GridRowProps, gridColVariants, gridRowVariants, gridVariantsCN } from "./variants";
import clsx from "clsx";

export function Grid({ className, children, ...props }: GridProps) {
  return <div className={gridVariantsCN(props, className)}>{children}</div>;
}

export function GridCol({ className, children, ...variantProps }: GridColProps) {
  return <div className={clsx(gridColVariants(variantProps), className)}>{children}</div>;
}

export function GridRow({ className, children, ...variantProps }: GridRowProps) {
  return <div className={clsx(gridRowVariants(variantProps), className)}>{children}</div>;
}
