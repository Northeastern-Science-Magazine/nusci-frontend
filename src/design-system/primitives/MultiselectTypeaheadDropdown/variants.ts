import { tv, VariantProps } from "tailwind-variants";
import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import { BasicColorProps, basicColorVariants } from "@/design-system/utilities/props/BasicColor/basiccolor";

/* ============================================================
   Types
   ============================================================ */

export type MultiSelectOption = {
  label: string;
  value: string;
};

export const multiselectTypeaheadDropdownVariants = tv({
  base: "rounded px-3 py-2 border focus:outline-none",
  variants: {
    color: {
      black: "border-black",
      white: "border-white",
      red: "border-red-500",
      aqua: "border-aqua",
      "aqua-light": "border-aqua-light",
      "forest-green": "border-forest-green",
      "sage-green": "border-sage-green",
      border: "border-border",
      neutral: "border-neutral",
      purple: "border-purple",
      pink: "border-pink",
      maroon: "border-maroon",
      coral: "border-coral",
      marigold: "border-marigold",
    },
  },
  defaultVariants: {
    color: "border",
  },
});

export type MultiselectTypeaheadDropdownVariants = VariantProps<typeof multiselectTypeaheadDropdownVariants>;

export interface MultiselectTypeaheadDropdownProps
  extends MultiselectTypeaheadDropdownVariants,
    AnimationProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  options: MultiSelectOption[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  maxVisibleItems?: number;
  itemHeight?: number;
  className?: string;
  icon?: boolean;
}

export const multiselectTypeaheadDropdownVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    multiselectTypeaheadDropdownVariants(variantProps),
    animationVariants(variantProps),
    basicColorVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );
