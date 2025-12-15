import { animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import * as Switch from "@radix-ui/react-switch";
import clsx from "clsx";
import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  base: "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:h-5 [&>span]:w-5 [&>span]:translate-x-0.5 [&>span]:data-[state=checked]:translate-x-[22px]",
  variants: {
    color: {
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
  },
  defaultVariants: {
    color: "black",
  },
});

export interface ToggleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof Switch.Root>,
      "color" | "checked" | "defaultChecked" | "onCheckedChange" | "defaultValue" | "value" | "onChange"
    >,
    VariantProps<typeof toggleVariants>,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  defaultValue?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const toggleVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    toggleVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );
