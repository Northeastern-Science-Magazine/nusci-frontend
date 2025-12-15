import { ButtonProps, buttonVariantsCN } from "./variants";

/**
 * Button Component
 *
 * @param { ButtonProps } props
 * @returns Button Component
 */
export default function Button({ className, onClick, children, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} className={buttonVariantsCN(props, className)}>
      {children}
    </button>
  );
}
