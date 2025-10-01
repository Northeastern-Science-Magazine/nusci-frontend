import { FlexChildProps, flexChildVariants } from "./variants";
import clsx from "clsx";

export function FlexChild({ className, children, ...props }: FlexChildProps) {
  return (
    <div className={clsx(flexChildVariants(props), className)}>{children}</div>
  );
}
