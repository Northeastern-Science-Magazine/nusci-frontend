import clsx from "clsx";
import { DividerProps, dividerVariantsCN } from "./Variants";

export function Divider({ className, ...props }: DividerProps) {
  return <div className={clsx(dividerVariantsCN(props), className)} />;
}
