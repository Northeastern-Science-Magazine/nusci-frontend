import { Select } from "radix-ui";
import clsx from "clsx";

import { DropdownInputProps, DropdownItemProps, dropdownInputVariantsCN, dropdownItemVariantsCN } from "./variants";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export function DropdownItem({ className, value, children, disabled, ...variantProps }: DropdownItemProps) {
  return (
    <Select.Item
      value={value}
      disabled={disabled}
      className={clsx(
        dropdownItemVariantsCN(variantProps),
        "relative flex px-[25px] text-[13px] select-none items-center leading-none data-[disabled]:pointer-events-none data-[disabled]:text-neutral data-[highlighted]:outline-none",
        className
      )}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export function DropdownInput({ onChange, className, children, placeholder, ...props }: DropdownInputProps) {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger
        className={clsx(
          dropdownInputVariantsCN(props),
          "flex justify-between items-center gap-[12px] rounded leading-none outline-none",
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={5} className="z-[60] max-h-[250px] overflow-y-auto rounded-md bg-white">
          <Select.ScrollUpButton />
          <Select.Viewport>{children}</Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
