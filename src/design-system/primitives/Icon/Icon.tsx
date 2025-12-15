import { type IconProps, iconMap, iconVariantsCN } from "./variants";

/**
 * Icon Component
 *
 * @param { IconProps } props
 * @returns Icon Component
 */
export default function Icon({ icon, color, size, className, onClick, ...props }: IconProps) {
  const LucideIcon = iconMap[icon];

  if (!LucideIcon) {
    console.warn(`Icon "${icon}" not found in iconMap.`);
    return null;
  }

  return <LucideIcon onClick={onClick} className={iconVariantsCN(props, className)} />;
}
