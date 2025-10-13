import { Checkbox as RadixCheckbox } from "radix-ui";
import { checkboxVariants, CheckboxProps, indicatorVariants } from "./variants";

/**
 * Checkbox Component
 *
 * @param { CheckboxProps } props
 * @returns Checkbox Component
 */
export const Checkbox = ({ options, size, color, disabled = false, value, onChange }: CheckboxProps) => {
  const handleToggle = (option: string, checked: boolean) => {
    if (value && onChange) {
      let newValue: string[];
      if (checked) {
        newValue = [...value, option];
      } else {
        newValue = value.filter((v) => v !== option);
      }
      onChange?.(newValue);
    }
  };

  return (
    <div>
      {options.map((option) => {
        const isChecked = value?.includes(option);
        return (
          <label
            key={option}
            className={`flex items-center gap-2 mb-3 relative ${disabled ? "pointer-events-none opacity-50" : ""}`}
          >
            <RadixCheckbox.Root
              className={`${checkboxVariants({ size, color: disabled ? "neutral" : color })} relative`}
              checked={isChecked}
              onCheckedChange={(checked) => handleToggle(option, !!checked)}
              disabled={disabled}
              name={option}
            >
              <RadixCheckbox.Indicator className={indicatorVariants({ size, color: disabled ? "neutral" : color })} />
            </RadixCheckbox.Root>
            <span>{option}</span>
            {disabled && <div className="absolute inset-0 bg-gray-100 opacity-60 rounded-md z-10"></div>}
          </label>
        );
      })}
    </div>
  );
};
