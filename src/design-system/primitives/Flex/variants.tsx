import { tv, type VariantProps } from "tailwind-variants";

export const flexVariants = tv({
  base: "flex",
  variants: {
    wrap: {
      base: "",
      wrap: "flex-nowrap",
      reverse: "flex-wrap-reverse",
    },
    direction: {
      base: "",
      row: "flex-row",
      rowReverse: "flex-row-reverse",
      col: "flex-col",
      colReverse: "flex-col-reverse",
    },
  },
});

export const flexChild = tv({
  base: "",
  variants: {
    initial: {
      base: "flex-none",
      initial: "flex-initial",
    },
    auto: {
      base: "flex-none",
      auto: "flex-auto",
    },
    grow: {
      base: "flex-none",
      grow: "grow",
    },
    shrink: {
      base: "",
      shrink: "shrink-0",
    },
    basis: {
      base: "",
      xs: "basis-xs",
      sm: "basis-sm",
      md: "basis-md",
      lg: "basis-lg",
      xl: "basis-xl",
    },
  },
});

export type FlexVariants = VariantProps<typeof flexVariants>;

export interface FlexProps extends FlexVariants {
  children: React.ReactNode;
  className?: string;
  wrap?: FlexVariants["wrap"];
  direction?: FlexVariants["direction"];
}
