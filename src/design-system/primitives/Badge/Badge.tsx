import clsx from "clsx";
import { BadgeProps, badgeVariants } from "./variants";

/**
 * Badge Component
 *
 * @param { BadgeProps } props
 * @returns Badge Component
 */
export const Badge = ({ className, color, variant, size, children }: BadgeProps) => {
  return <span className={clsx(badgeVariants({ color, variant, size }), className)}>{children}</span>;
};
