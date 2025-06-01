import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
import { toggleVariants } from "./variants";
import type { ToggleProps } from "./variants";

export const Toggle = ({ className, onChange, color = "black", ...props }: ToggleProps) => {
  return (
      <Switch.Root onChange={onChange} className={toggleVariants({ color, className })} {...props}>
        <Switch.Thumb className="block rounded-full bg-white transition-transform duration-100 will-change-transform my-0.5" />
      </Switch.Root>
  );
};