import { ButtonProps, buttonVariantsCN } from "./variants";

/**
 * Button Component
 *
 * @param { ButtonProps } props
 * @returns Button Component
 */
export default function Button({ className, onClick, children, type = "button", disabled, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={buttonVariantsCN(props, className)}>
      {children}
    </button>
  );
}
