import { tv, VariantProps } from "tailwind-variants";
import { ReactElement } from "react";

export const dropdownInputVariants = tv({
  base: "",
});

export type DropdownInputVariants = VariantProps<typeof dropdownInputVariants>;

export interface DropdownInputProps extends DropdownInputVariants {
  onChange?: (value: string) => void;
  className?: string;
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[];
  placeholder?: string;
}

export const dropdownItemVariants = tv({
  base: "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-aqua-light data-[disabled]:text-neutral data-[highlighted]:bg-aqua-light data-[highlighted]:outline-none",
});

export type DropdownItemVariants = VariantProps<typeof dropdownItemVariants>;

export interface DropdownItemProps extends DropdownItemVariants {
  className?: string;
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}
