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

export type DropdownOption = {
  label: string;
  value: string;
};

export const dropdownVariants = tv({
  slots: {
    input: "w-full rounded-md px-3 py-2 border focus:outline-none",
    popup: "fixed z-50 bg-white rounded-b-md shadow-lg overflow-hidden",
    popupContent: "overflow-auto p-1",
    optionRow: "w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-border rounded-md",
    iconContainer: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center",
    chevronContainer: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center",
    emptyState: "px-3 py-2 text-sm text-gray-500 text-center",
  },
  variants: {
    multiSelect: {
      true: "",
      false: "",
    },
    typeahead: {
      true: "",
      false: "",
    },
    color: {
      black: {
        input: "border-black",
      },
      white: {
        input: "border-white",
      },
      red: {
        input: "border-red-500",
      },
      aqua: {
        input: "border-aqua",
      },
      "aqua-light": {
        input: "border-aqua-light",
      },
      "forest-green": {
        input: "border-forest-green",
      },
      "sage-green": {
        input: "border-sage-green",
      },
      border: {
        input: "border-border",
      },
      neutral: {
        input: "border-neutral",
      },
      purple: {
        input: "border-purple",
      },
      pink: {
        input: "border-pink",
      },
      maroon: {
        input: "border-maroon",
      },
      coral: {
        input: "border-coral",
      },
      marigold: {
        input: "border-marigold",
      },
    },
    icon: {
      true: {
        input: "pl-9",
      },
      false: {
        input: "pl-3",
      },
    },
    chevron: {
      true: {
        input: "pr-9",
      },
      false: {
        input: "",
      },
    },
    open: {
      true: {
        input: "rounded-b-none",
      },
      false: {
        input: "",
      },
    },
  },
  defaultVariants: {
    multiSelect: false,
    typeahead: false,
    color: "border",
    icon: true,
    chevron: false,
    open: false,
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;

export interface DropdownProps
  extends Omit<DropdownVariants, "multiSelect" | "typeahead">,
    AnimationProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  options: DropdownOption[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  maxVisibleItems?: number;
  itemHeight?: number;
  className?: string;
  icon?: boolean;
  multiSelect?: boolean;
  typeahead?: boolean;
}

export const dropdownVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    dropdownVariants(variantProps),
    animationVariants(variantProps),
    basicColorVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className,
  );
