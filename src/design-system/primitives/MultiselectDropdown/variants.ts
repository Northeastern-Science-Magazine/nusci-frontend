import { tv, VariantProps } from "tailwind-variants";
import { ReactElement } from "react";

export const multiselectDropdownVariants = tv({
  base: "",
});

export type MultiselectDropdownVariants = VariantProps<
  typeof multiselectDropdownVariants
>;

export interface MultiselectDropdownProps extends MultiselectDropdownVariants {
  className?: string;
  options: string[];
}
