import * as Switch from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

export const toggleVariants = cva(
  "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-200 data-[state=checked]:bg-black",
        success: "bg-zinc-200 data-[state=checked]:bg-green-500",
        danger: "bg-zinc-200 data-[state=checked]:bg-red-500",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-[52px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof Switch.Root>,
  VariantProps<typeof toggleVariants> {
  label: string;
  labelClassName?: string;
}