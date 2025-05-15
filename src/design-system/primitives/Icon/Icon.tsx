import { IconProps } from "./variants";
import * as LucideIcons from "lucide-react";

/**
 * Icon Component
 *
 * @param { IconProps } props
 * @returns Icon Component
 */
export const Icon = (props: IconProps) => {

  const LucideIcon = LucideIcons[props.iconName as keyof typeof LucideIcons] as React.ElementType;

  if (!LucideIcon) {
    console.warn(`Icon "${props.iconName}" not found.`);
    return null;
  }

  return (
    <span onClick={props.onClick} >
      <LucideIcon size={props.size} color={props.color} />
    </span>
  );
};
