import { Select } from "radix-ui";
import clsx from "clsx";

import { dropdownItemVariants, DropdownInputProps, DropdownItemProps, dropdownInputVariants } from "./variants";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export function DropdownItem({ className, value, children, disabled, ...variantProps }: DropdownItemProps) {
  return (
    <Select.Item value={value} disabled={disabled} className={clsx(dropdownItemVariants(variantProps), "relative flex h-[25px] select-none items-center pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[disabled]:text-neutral data-[highlighted]:outline-none", className)}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export function DropdownInput({ onChange, className, children, placeholder, ...variantProps }: DropdownInputProps) {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger
        className={clsx(
          "inline-flex h-[35px] min-w-[150px] items-center justify-between gap-[5px] rounded px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] border-2",
          className
        , dropdownInputVariants(variantProps))}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={5}
          className="z-[60] max-h-[250px] overflow-y-auto rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton />
          <Select.Viewport>{children}</Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
