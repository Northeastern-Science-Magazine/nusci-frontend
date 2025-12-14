
import { fontVariants, FontProps } from "./variants";

/**
 * Font Component
 *
 * @param { FontProps } props
 * @returns Font Component
 */
export const Font = ({ children, ...variantProps }: FontProps) => {
  return (
    <div className={fontVariants(variantProps)}>{children}</div>
  );
};
