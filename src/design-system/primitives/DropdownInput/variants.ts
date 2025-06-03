import { tv, VariantProps } from "tailwind-variants";
import { ReactElement } from "react";

export const dropdownInputVariants = tv({
  base: "",
});

export type DropdownInputVariants = VariantProps<typeof dropdownInputVariants>;

export interface DropdownInputProps extends DropdownInputVariants {
  className?: string;
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[];
  placeholder?: string;
}

export const dropdownItemVariants = tv({
  base: "",
});

export type DropdownItemVariants = VariantProps<typeof dropdownItemVariants>;

export interface DropdownItemProps extends DropdownItemVariants {
  className?: string;
  text: string;
  disabled?: boolean;
}
