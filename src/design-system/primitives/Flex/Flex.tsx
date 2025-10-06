import {
  FlexProps,
  flexVariants,
  FlexChildProps,
  flexChildVariants,
} from "./variants";
import clsx from "clsx";

/**
 * Flex Component
 *
 * @param { flexVariants } props
 * @returns Flex Component
 */
export function Flex({ children, className, ...props }: FlexProps) {
  return (
    <FlexChild className={clsx(flexVariants(props), className)}>
      {children}
    </FlexChild>
  );
}

export function FlexChild({ className, children, ...props }: FlexChildProps) {
  return (
    <div className={clsx(flexChildVariants(props), className)}>{children}</div>
  );
}
