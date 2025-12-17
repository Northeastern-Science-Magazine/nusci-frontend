import { dividerVariantsCN, DividerProps } from "./variants";
import clsx from "clsx";

export function Divider({ className, ...props }: DividerProps) {
  return <div className={clsx(dividerVariantsCN(props), className)} />;
}
