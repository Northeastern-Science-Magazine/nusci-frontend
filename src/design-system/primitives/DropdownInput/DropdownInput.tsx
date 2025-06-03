import { Select } from "radix-ui";

import {
  dropdownInputVariants,
  dropdownItemVariants,
  DropdownInputProps,
  DropdownItemProps,
} from "./variants";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export function DropdownItem({
  text,
  disabled,
  ...variantProps
}: DropdownItemProps) {
  return (
    <Select.Item value={text} disabled={disabled}>
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator />
    </Select.Item>
  );
}

export function DropdownInput({
  children,
  placeholder,
  ...variantProps
}: DropdownInputProps) {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>{children}</Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
