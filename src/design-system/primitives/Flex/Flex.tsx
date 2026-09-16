import { FlexProps, flexVariantsCN, FlexChildProps, flexChildVariantsCN } from "./variants";

/**
 * Flex Component
 *
 * @param { flexVariants } props
 * @returns Flex Component
 */
export function Flex({ children, className, ...props }: FlexProps) {
  return <FlexChild className={flexVariantsCN(props, className)}>{children}</FlexChild>;
}

export function FlexChild({ className, children, ...props }: FlexChildProps) {
  return <div className={flexChildVariantsCN(props, className)}>{children}</div>;
}
