import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
import { toggleVariantsCN } from "./variants";
import type { ToggleProps } from "./variants";

export const Toggle = ({ className, defaultValue, value, onChange, color = "black", ...props }: ToggleProps) => {
  return (
    <Switch.Root
      checked={value}
      defaultChecked={defaultValue}
      onCheckedChange={onChange}
      className={toggleVariantsCN({ ...props, color }, className)}
      {...props}
    >
      <Switch.Thumb className="block rounded-full bg-white transition-transform duration-100 will-change-transform my-0.5" />
    </Switch.Root>
  );
};
