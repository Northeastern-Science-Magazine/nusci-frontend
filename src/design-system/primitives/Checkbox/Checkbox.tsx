import { Checkbox as RadixCheckbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { checkboxVariants, CheckboxProps } from "./variants";

/**
 * Checkbox Component
 *
 * @param { CheckboxProps } props
 * @returns Checkbox Component
 */
export const Checkbox = ({options, size, color, disabled = false, checkedValues, handleCheckedChange}: CheckboxProps) => {

    const renderChecked = (option: string) : boolean  => {
        return checkedValues.includes(option); 
    }

    return  (
        <div>
          {options.map(option => {
            return (
              <label key={option} className="flex items-center gap-2 cursor-pointer mb-3">
                <RadixCheckbox.Root
                  className={checkboxVariants({size, color: disabled ? "neutral" : color})}
                  checked={renderChecked(option)}
                  onCheckedChange={value => handleCheckedChange(option, !!value)}
                  disabled={disabled || false}
                  name={option}
                >
                  <RadixCheckbox.Indicator>
                    <CheckIcon />
                  </RadixCheckbox.Indicator>
                </RadixCheckbox.Root>
                <span>{option}</span>
              </label>
            );
          })}
        </div>
    );
};
