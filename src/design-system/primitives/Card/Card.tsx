import Box from "@/primitives/Box";
import { CardProps } from "./variants";
import clsx from "clsx";

/**
 * Card Component
 *
 * Opinionated Box Wrapper Design-wise
 *
 * @param
 * @returns
 */
export default function Card({ className, children, ...props }: CardProps) {
  return (
    <Box {...props} className={clsx("rounded-3xl border border-border overflow-hidden shadow-sm", className)}>
      {children}
    </Box>
  );
}
