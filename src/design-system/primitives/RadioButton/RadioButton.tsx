import * as React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { RadioButtonProps, radioButtonVariants } from "./variants";
import clsx from "clsx";

/**
 * RadioButton Component
 *
 * Wraps Radix RadioGroup with state
 */

export default function RadioButton({
  options,
  name,
  defaultValue,
  onChange,
  className,
  color,
  ...props
}: RadioButtonProps) {
// internal state for selected option
  const [selected, setSelected] = React.useState(defaultValue || "");

  const handleValueChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <RadixRadioGroup.Root
      className={clsx("flex gap-4", className)}
      name={name}
      value={selected}
      onValueChange={handleValueChange}
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
              <RadixRadioGroup.Indicator className="w-2.5 h-2.5 bg-white rounded-full" />
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