import { dividerVariants, DividerProps } from "./Variants";
import clsx from "clsx";

export function Divider({className, ...props}: DividerProps) {
  return <div className={clsx(dividerVariants(props), className)}/>
}