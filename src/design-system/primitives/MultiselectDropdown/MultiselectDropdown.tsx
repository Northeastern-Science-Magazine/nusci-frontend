import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import {
  multiselectDropdownVariants,
  MultiselectDropdownProps,
} from "./variants";
import { Icon } from "../Icon";
// import Button from "../../primitives/Button/Button";

export default function MultiselectDropdown({
  className,
  options,
  ...variantProps
}: MultiselectDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const toggleItem = (item: string, checked: boolean | "indeterminate") => {
    console.log("Items previously selected:", selectedItems);
    console.log("Toggling item:", item, "Checked:", checked);
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((i) => i !== item));
    }
    console.log("Selected items now:", selectedItems);
  };

  return (
    <div>
      <div>
        {selectedItems.map((item) => (
          <span className="inline-flex items-center rounded border border-zinc-300 bg-white px-2 py-1 text-sm">
            {item}
            <Icon
              icon="x"
              size="xs"
              className="ml-1 cursor-pointer"
              onClick={() => toggleItem(item, false)}
            />
          </span>
        ))}
      </div>
      <div
        className={clsx(multiselectDropdownVariants(variantProps), className)}
      >
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <button className="inline-flex items-center justify-center border focus:shadow-black">
              Select here
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={6}
              className={clsx(
                "z-50 rounded-md border border-zinc-200 bg-white p-1 shadow-md",
                "min-w-[14rem] max-h-64 overflow-auto"
              )}
            >
              {options.map((item) => {
                const isChecked = selectedItems.includes(item);
                return (
                  <DropdownMenu.CheckboxItem
                    key={item}
                    checked={isChecked}
                    onCheckedChange={(checked) => toggleItem(item, !!checked)}
                    className={clsx(
                      "relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm",
                      "outline-none focus:bg-zinc-100 data-[state=checked]:bg-zinc-100"
                    )}
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-white">
                      {isChecked && <Icon icon="check" size="xs" />}
                    </span>
                    <span className="truncate">{item}</span>
                  </DropdownMenu.CheckboxItem>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
