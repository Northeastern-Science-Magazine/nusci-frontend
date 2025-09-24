import { Checkbox as RadixCheckbox } from "radix-ui";
import { checkboxVariants, CheckboxProps, indicatorVariants } from "./variants";

/**
 * Checkbox Component
 *
 * @param { CheckboxProps } props
 * @returns Checkbox Component
 */
export const Checkbox = ({ options, size, color, disabled = false, checkedValues, handleCheckedChange }: CheckboxProps) => {
  const renderChecked = (option: string): boolean => {
    return checkedValues.includes(option);
  };

  return (
    <div>
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center gap-2 mb-3 relative ${disabled ? "pointer-events-none opacity-50" : ""}`}
        >
          <RadixCheckbox.Root
            className={`${checkboxVariants({ size, color: disabled ? "neutral" : color })} relative`}
            checked={renderChecked(option)}
            onCheckedChange={(value) => handleCheckedChange(option, !!value)}
            disabled={disabled || false}
            name={option}
          >
            <RadixCheckbox.Indicator className={indicatorVariants({ size, color: disabled ? "neutral" : color })} />
          </RadixCheckbox.Root>
          <span>{option}</span>
          {disabled && <div className="absolute inset-0 bg-gray-100 opacity-60 rounded-md z-10"></div>}
        </label>
      ))}
    </div>
  );
};
