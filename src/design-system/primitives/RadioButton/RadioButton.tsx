import * as React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { RadioButtonProps, radioButtonVariants } from "./variants";
import clsx from "clsx";

/**
 * RadioButton Component
 *
 * Uncontrolled component — selection managed by DOM using defaultValue
 */
export default function RadioButton({
  options,
  name,
  value,
  defaultValue,
  onChange,
  className,
  color,
  direction = "horizontal",
  ...props
}: RadioButtonProps) {
  return (
    <RadixRadioGroup.Root
      className={clsx("flex gap-4", direction === "vertical" ? "flex-col" : "flex-row", className)}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      {...props}
    >
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <div key={option.value} className="flex items-center space-x-2">
            <RadixRadioGroup.Item
              id={id}
              value={option.value}
              className={clsx(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                radioButtonVariants({ color })
              )}
            >
              <RadixRadioGroup.Indicator
                className={clsx(
                  "w-2.5 h-2.5 rounded-full bg-white transition-transform",
                  "group-radix-state-checked:scale-100 scale-0"
                )}
              />
            </RadixRadioGroup.Item>
            <label htmlFor={id} className="cursor-pointer text-sm">
              {option.label}
            </label>
          </div>
        );
      })}
    </RadixRadioGroup.Root>
  );
}
