import { animationVariants, AnimationProps } from "@/design-system/utilities/props/Animation/animation";
import { displayVariants, DisplayProps } from "@/design-system/utilities/props/Display/display";
import { marginVariants, MarginProps } from "@/design-system/utilities/props/Margin/margin";
import { paddingVariants, PaddingProps } from "@/design-system/utilities/props/Padding/padding";
import { positionVariants, PositionProps } from "@/design-system/utilities/props/Position/position";
import { sizeVariants, SizeProps } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import { tv, type VariantProps } from "tailwind-variants";

export const flexVariants = tv({
  base: "flex",
  variants: {
    wrap: {
      noWrap: "flex-nowrap",
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
    },
    direction: {
      base: "",
      row: "flex-row",
      rowReverse: "flex-row-reverse",
      col: "flex-col",
      colReverse: "flex-col-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      14: "gap-14",
      16: "gap-16",
      18: "gap-18",
      20: "gap-20",
      24: "gap-24",
      28: "gap-28",
      32: "gap-32",
      64: "gap-64",
      72: "gap-72",
      96: "gap-96",
      128: "gap-128",
    },
  },
  defaultVariants: {
    wrap: "noWrap",
    direction: "base",
  },
});

export const flexChildVariants = tv({
  base: "flex",
  variants: {
    auto: {
      base: "",
      auto: "flex-auto",
    },
    grow: {
      grow: "grow",
      noGrow: "grow-0",
    },
    shrink: {
      shrink: "shrink",
      noShrink: "shrink-0",
    },
    basis: {
      base: "",
      full: "basis-full",
    },
  },
});

type FlexVariants = VariantProps<typeof flexVariants>;
export const flexVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    flexVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );

type FlexChildVariants = VariantProps<typeof flexChildVariants>;

export interface FlexProps
  extends FlexVariants,
    AnimationProps,
    DisplayProps,
    MarginProps,
    PaddingProps,
    PositionProps,
    SizeProps {
  children: React.ReactElement<FlexChildVariants> | React.ReactElement<FlexChildVariants>[];
  className?: string;
}

export interface FlexChildProps extends FlexChildVariants {
  className?: string;
  children: React.ReactNode;
}
