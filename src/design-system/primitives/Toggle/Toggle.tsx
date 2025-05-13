import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
import { toggleVariants } from "./variants";
import type { ToggleProps } from "./variants";

export const Toggle = React.forwardRef<
  React.ElementRef<typeof Switch.Root>,
  ToggleProps
>(({ className, variant = "default", size = "default", label, labelClassName, ...props }, ref) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Switch.Root
        ref={ref}
        className={toggleVariants({ variant, size, className })}
        {...props}
      >
        <Switch.Thumb className="block h-5 w-5 rounded-full bg-white transition-transform duration-100 translate-x-0.5 translate-y-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
      <span className={`text-sm font-medium ${labelClassName || ''}`}>{label}</span>
    </label>
  );
});

Toggle.displayName = "Toggle";