import * as Switch from "@radix-ui/react-switch";
import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  base: "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    toggleColor: {
      white: "bg-zinc-200 data-[state=checked]:bg-white",
      black: "bg-zinc-200 data-[state=checked]:bg-black",
      "light-orange": "bg-zinc-200 data-[state=checked]:bg-light-orange",
      "dark-orange": "bg-zinc-200 data-[state=checked]:bg-dark-orange",
      gray: "bg-zinc-200 data-[state=checked]:bg-gray",
      aqua: "bg-zinc-200 data-[state=checked]:bg-aqua",
      "aqua-light": "bg-zinc-200 data-[state=checked]:bg-aqua-light",
      "forest-green": "bg-zinc-200 data-[state=checked]:bg-forest-green",
      "sage-green": "bg-zinc-200 data-[state=checked]:bg-sage-green",
      border: "bg-zinc-200 data-[state=checked]:bg-border",
      neutral: "bg-zinc-200 data-[state=checked]:bg-neutral",
      purple: "bg-zinc-200 data-[state=checked]:bg-purple",
      pink: "bg-zinc-200 data-[state=checked]:bg-pink",
      maroon: "bg-zinc-200 data-[state=checked]:bg-maroon",
      coral: "bg-zinc-200 data-[state=checked]:bg-coral",
      marigold: "bg-zinc-200 data-[state=checked]:bg-marigold",
    },
    size: {
      sm: "h-4 w-9 [&>span]:h-4.5 [&>span]:w-4 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[17.5px]",
      md: "h-6 w-11 [&>span]:h-5 [&>span]:w-5 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[22px]",
      lg: "h-7 w-[52px] [&>span]:h-6 [&>span]:w-6 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[26px]",
    },
  },
  defaultVariants: {
    color: "black",
    size: "md",
  },
});

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof Switch.Root>,
    VariantProps<typeof toggleVariants> {
  onChange?: () => void;
}