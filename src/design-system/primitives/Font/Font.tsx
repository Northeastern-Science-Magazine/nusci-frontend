
import { FontProps } from "./variants";

/**
 * Font Component
 *
 * @param { FontProps } props
 * @returns Font Component
 */
export const Font = ({ fontName, children }: FontProps) => {
  return (
    <div className={fontName}>{children}</div>
  );
};
