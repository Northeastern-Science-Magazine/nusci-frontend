import { Checkbox as RadixCheckbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { checkboxVariants, CheckboxProps } from "./variants";
import { useState } from 'react';

/**
 * Checkbox Component
 *
 * @param { CheckboxProps } props
 * @returns Checkbox Component
 */
export const Checkbox = (props: CheckboxProps) => {

    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    const handleCheckedChange = (option: string, value: boolean ) => {
        setCheckedValues(prev =>
            value ? [...prev, option] : prev.filter(val => val !== option)
          );
    }  

    const renderChecked = (option: string) : boolean  => {
        return checkedValues.includes(option); 
    }

    return  (
        <div>
          {props.options.map(option => {
            return (
              <label key={option} className="flex items-center gap-2 cursor-pointer mb-3">
                <RadixCheckbox.Root
                  className={checkboxVariants(props)}
                  checked={renderChecked(option)}
                  onCheckedChange={value => handleCheckedChange(option, !!value)}
                  disabled={props.disabled || false}
                  required={props.required || false}
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
