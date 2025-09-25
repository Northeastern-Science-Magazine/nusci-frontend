import { FlexProps, flexVariants } from "./variants";
import clsx from "clsx";

/**
 * Flex Component
 *
 * @param { flexVariants } props
 * @returns Flex Component
 */
export function Flex({ children, className, ...props }: FlexProps) {
  return <div className={clsx(flexVariants(props), className)}>{children}</div>;
}
