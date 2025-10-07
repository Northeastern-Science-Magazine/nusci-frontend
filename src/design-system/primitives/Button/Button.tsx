import { ButtonProps, buttonVariants } from "./variants";

/**
 * Button Component
 *
 * @param { ButtonProps } props
 * @returns Button Component
 */
export default function Button({
  className,
  onClick,
  children,
  disabled = false,
  ...variantProps
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${buttonVariants(variantProps)} ${className}`}
    >
      {children}
    </button>
  );
}
