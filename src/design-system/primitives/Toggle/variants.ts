import * as Switch from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

export const toggleVariants = cva(
  "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        black: "bg-zinc-200 data-[state=checked]:bg-black",
        green: "bg-zinc-200 data-[state=checked]:bg-green-500",
        blue: "bg-zinc-200 data-[state=checked]:bg-blue-500",
        red: "bg-zinc-200 data-[state=checked]:bg-red-500",
      },
      size: {
        md: "h-6 w-11 [&>span]:h-5 [&>span]:w-5 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[22px]",
        sm: "h-4 w-9 [&>span]:h-4.5 [&>span]:w-4 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[17.5px]",
        lg: "h-7 w-[52px] [&>span]:h-6 [&>span]:w-6 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[26px]",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "md",
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof Switch.Root>,
    VariantProps<typeof toggleVariants> {
  label: string;
  labelClassName?: string;
}
