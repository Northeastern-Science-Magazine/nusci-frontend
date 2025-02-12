import { ButtonProps, buttonVariants } from "./variants";

/**
 * Button Component
 *
 * @param { ButtonProps } props
 * @returns Button Component
 */
export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={buttonVariants(props)}>
      {props.children}
    </button>
  );
};
