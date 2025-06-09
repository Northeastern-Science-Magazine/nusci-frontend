import { Checkbox as RadixCheckbox } from "radix-ui";
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

    const checkedBgColors: Record<string, string> = {
      black: "bg-black border-black",
      white: "bg-black",
      red: "bg-red-500 border-red-500",
      aqua: "bg-aqua",
      "aqua-light": "bg-aqua-light",
      "forest-green": "bg-forest-green",
      "sage-green": "bg-sage-green",
      border: "bg-border",
      neutral: "bg-neutral",
      purple: "bg-purple",
      pink: "bg-pink",
      maroon: "bg-maroon",
      coral: "bg-coral",
      marigold: "bg-marigold",
    };

    const indicatorSizes: Record<string, string> = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
        <div>
          {options.map(option => (
              <label key={option} className={`flex items-center gap-2 mb-3 relative ${disabled ?  "pointer-events-none opacity-50" : ""}`}>
                <RadixCheckbox.Root
                  className={`${checkboxVariants({size, color: disabled ? "neutral" : color})} relative`}
                  checked={renderChecked(option)}
                  onCheckedChange={value => handleCheckedChange(option, !!value)}
                  disabled={disabled || false}
                  name={option}
                >
                  <RadixCheckbox.Indicator className={`relative flex items-center justify-center rounded-md shrink-0 
                    ${indicatorSizes[size ?? "md"]} 
                    ${checkedBgColors[disabled ? "neutral" : color ?? "black"]}`}/>
                </RadixCheckbox.Root>
                <span>{option}</span>
                {disabled && (
            <div className="absolute inset-0 bg-gray-100 opacity-60 rounded-md z-10"></div>
                )}
              </label>
            )
          )}
        </div>
  )
};
