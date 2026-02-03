import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import { SizeProps, sizeVariants } from "@/design-system/utilities/props/Size/size";
import clsx from "clsx";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export const gridVariants = tv({
  base: "grid",
  variants: {
    col: {
      true: "",
    },
    row: {
      true: "",
    },
    span: {
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
      11: "",
      12: "",
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
  compoundVariants: [
    { col: true, span: 2, class: "grid-cols-2" },
    { col: true, span: 3, class: "grid-cols-3" },
    { col: true, span: 4, class: "grid-cols-4" },
    { col: true, span: 5, class: "grid-cols-5" },
    { col: true, span: 6, class: "grid-cols-6" },
    { col: true, span: 7, class: "grid-cols-7" },
    { col: true, span: 8, class: "grid-cols-8" },
    { col: true, span: 9, class: "grid-cols-9" },
    { col: true, span: 10, class: "grid-cols-10" },
    { col: true, span: 11, class: "grid-cols-11" },
    { col: true, span: 12, class: "grid-cols-12" },
    { row: true, span: 2, class: "grid-rows-2" },
    { row: true, span: 3, class: "grid-rows-3" },
    { row: true, span: 4, class: "grid-rows-4" },
    { row: true, span: 5, class: "grid-rows-5" },
    { row: true, span: 6, class: "grid-rows-6" },
    { row: true, span: 7, class: "grid-rows-7" },
    { row: true, span: 8, class: "grid-rows-8" },
    { row: true, span: 9, class: "grid-rows-9" },
    { row: true, span: 10, class: "grid-rows-10" },
    { row: true, span: 11, class: "grid-rows-11" },
    { row: true, span: 12, class: "grid-rows-12" },
  ],
});

export type GridVariants = VariantProps<typeof gridVariants>;
export interface GridPropsBase {
  span: GridVariants["span"];
  className?: string;
  children: React.ReactNode;
  gap?: GridVariants["gap"];
}

type GridColOnly = GridPropsBase & { col: true; row?: never };
type GridRowOnly = GridPropsBase & { row: true; col?: never };

export type GridProps = (GridColOnly | GridRowOnly) &
  AnimationProps &
  DisplayProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  SizeProps;

export const gridVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    gridVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    sizeVariants(variantProps),
    className
  );

const gridColVariants = tv({
  base: "",
  variants: {
    span: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
    },
  },
});

export type GridColVariants = VariantProps<typeof gridColVariants>;
export const gridColVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    gridColVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    className
  );

export interface GridColProps extends GridColVariants {
  className?: string;
  children: React.ReactNode;
}

const gridRowVariants = tv({
  base: "",
  variants: {
    span: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      7: "row-span-7",
      8: "row-span-8",
      9: "row-span-9",
      10: "row-span-10",
      11: "row-span-11",
      12: "row-span-12",
    },
  },
});

export type GridRowVariants = VariantProps<typeof gridRowVariants>;
export const gridRowVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    gridRowVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    className
  );

export interface GridRowProps extends GridRowVariants {
  className?: string;
  children: React.ReactNode;
}
