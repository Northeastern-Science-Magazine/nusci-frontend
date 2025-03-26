import { IconProps, iconVariants } from "./variants";

/**
 * Icon Component
 *
 * @param { IconProps } props
 * @returns Icon Component
 */
export const Icon = (props: IconProps) => {
  return (
    <span onClick={props.onClick} className={iconVariants(props)}>
      {props.children}
    </span>
  );
};
