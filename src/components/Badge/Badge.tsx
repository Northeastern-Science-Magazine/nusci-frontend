import { BadgeProps, badgeVariants } from "./variants";

/**
 * Badge Component
 *
 * @param { BadgeProps } props
 * @returns Badge Component
 */
export const Badge = (props: BadgeProps) => {
  return (
    <span className={badgeVariants(props)}>
      {props.children}
    </span>
  );
};