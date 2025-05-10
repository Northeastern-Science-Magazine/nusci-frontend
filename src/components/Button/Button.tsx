import { ButtonProps, buttonVariants } from "./variants";

/**
 * Button Component
 *
 * @param { ButtonProps } props
 * @returns Button Component
 */
export default function Button({ className, onClick, children, ...variantProps }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${buttonVariants(variantProps)} ${className}`}>
      {children}
    </button>
  );
}
