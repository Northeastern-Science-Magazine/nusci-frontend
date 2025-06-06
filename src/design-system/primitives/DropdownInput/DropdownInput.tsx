import { Select } from "radix-ui";
import clsx from "clsx";

import {
  dropdownItemVariants,
  DropdownInputProps,
  DropdownItemProps,
} from "./variants";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export function DropdownItem({
  className,
  text,
  disabled,
  ...variantProps
}: DropdownItemProps) {
  return (
    <Select.Item
      value={text}
      disabled={disabled}
      className={clsx(dropdownItemVariants(variantProps), className)}
    >
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export function DropdownInput({
  onChange,
  className,
  children,
  placeholder,
  ...variantProps
}: DropdownInputProps) {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton />
          <Select.Viewport>{children}</Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
