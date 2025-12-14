import { type IconProps, iconMap, iconVariants } from "./variants";
import clsx from "clsx";
import { type AnimationProps, animationVariants } from "../../utilities/animation"

/**
 * Icon Component
 *
 * @param { IconProps } props
 * @returns Icon Component
 */
export default function Icon({ icon, color, size, className, onClick, animation }: IconProps & AnimationProps) {
  const LucideIcon = iconMap[icon];

  if (!LucideIcon) {
    console.warn(`Icon "${icon}" not found in iconMap.`);
    return null;
  }

  return (
    <LucideIcon
      onClick={onClick}
      className={clsx(
        iconVariants({ color, size }), // text color + w/h
        animationVariants({animation}),
        className
      )}
    />
  );
}
