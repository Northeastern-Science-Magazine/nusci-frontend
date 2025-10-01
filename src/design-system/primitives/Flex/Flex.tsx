import { FlexProps, flexVariants } from "./variants";
import clsx from "clsx";
import { FlexChild } from "./FlexChild";

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
