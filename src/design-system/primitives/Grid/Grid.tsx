import { GridColProps, GridProps, GridRowProps, gridColVariantsCN, gridRowVariantsCN, gridVariantsCN } from "./variants";

export function Grid({ className, children, ...props }: GridProps) {
  return <div className={gridVariantsCN(props, className)}>{children}</div>;
}

export function GridCol({ className, children, ...variantProps }: GridColProps) {
  return <div className={gridColVariantsCN(variantProps, className)}>{children}</div>;
}

export function GridRow({ className, children, ...variantProps }: GridRowProps) {
  return <div className={gridRowVariantsCN(variantProps, className)}>{children}</div>;
}
