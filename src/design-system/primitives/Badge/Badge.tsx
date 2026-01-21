import { BadgeProps, badgeVariantsCN } from "./variants";

/**
 * Badge Component
 *
 * @param { BadgeProps } props
 * @returns Badge Component
 */
export const Badge = ({ className, color, variant, rounded, children, ...props }: BadgeProps) => {
  return <span className={badgeVariantsCN({ color, variant, rounded, ...props }, className)}>{children}</span>;
};
