import clsx from "clsx";
import { BadgeProps, badgeVariants } from "./variants";

/**
 * Badge Component
 *
 * @param { BadgeProps } props
 * @returns Badge Component
 */
export const Badge = ({ className, color, variant, children }: BadgeProps) => {
  return <span className={clsx(badgeVariants({ color, variant }), className)}>{children}</span>;
};
