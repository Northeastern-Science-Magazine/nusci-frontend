import { tv, VariantProps } from "tailwind-variants";
import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import { BasicColorProps, basicColorVariants } from "@/design-system/utilities/props/BasicColor/basiccolor";

export const multiselectTypeaheadDropdownVariants = tv({
  base: "rounded px-3 py-2 border border-neutral focus:outline-none",
});

export type MultiselectTypeaheadDropdownVariants = VariantProps<typeof multiselectTypeaheadDropdownVariants>;

export interface MultiselectTypeaheadDropdownProps
  extends MultiselectTypeaheadDropdownVariants,
    AnimationProps,
    BasicColorProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  className?: string;
  placeholder?: string;
  options: string[];
  selectedValues?: string[];
  onSelectionChange?: (selected: string[]) => void;
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
