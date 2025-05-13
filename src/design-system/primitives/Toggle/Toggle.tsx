import * as Switch from "@radix-ui/react-switch";
import { ToggleProps, toggleVariants } from "./variants";

/**
 * Toggle Component
 *
 * A wrapper around Radix UI's Switch component that provides toggle functionality
 * with consistent styling and behavior.
 *
 * @param {ToggleProps} props
 * @returns Toggle Component
 */
export default function Toggle({
  className,
  checked,
  onCheckedChange,
  disabled,
  required,
  id,
  label,
  ...variantProps
}: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <label className="text-sm font-medium leading-none" htmlFor={id}>
          {label}
        </label>
      )}
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        className={`${toggleVariants(variantProps)} ${className}`}
      >
        <Switch.Thumb className="block h-5 w-5 rounded-full bg-white transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[21px]" />
      </Switch.Root>
    </div>
  );
}
