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
  type = "button",
  ...variantProps
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${buttonVariants(variantProps)} ${className}`}
    >
      {children}
    </button>
  );
}
