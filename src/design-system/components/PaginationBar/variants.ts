import { tv, type VariantProps } from "tailwind-variants";
import Text from "../../primitives/Text";
import Icon from "../../primitives/Icon";
import React from "react";

export const paginationItemVariants = tv({
  base: "",
  variants: {
    color: {
      black:
        "text-white bg-black border-black hover:bg-black hover:border-black focus:ring-black",
      white:
        "text-black bg-white border-white hover:bg-white hover:border-white focus:ring-white",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 focus:ring-red-500",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua focus:ring-aqua",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light focus:ring-aqua-light",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green focus:ring-forest-green",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green focus:ring-sage-green",
      border:
        "text-white bg-border border-border hover:bg-border hover:border-border focus:ring-border",
      neutral:
        "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral focus:ring-neutral",
      purple:
        "text-white bg-purple border-purple hover:bg-purple hover:border-purple focus:ring-purple",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink focus:ring-pink",
      maroon:
        "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon focus:ring-maroon",
      coral:
        "text-black bg-coral border-coral hover:bg-coral hover:border-coral focus:ring-coral",
      marigold:
        "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold focus:ring-marigold",
    },
  },
  defaultVariants: { color: "black" },
});

export interface PaginationItemProps
  extends VariantProps<typeof paginationItemVariants> {
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  text: string;
}

export const paginationBarVariants = tv({
  base: "",
  variants: {
    color: {
      black:
        "text-white bg-black border-black hover:bg-black hover:border-black focus:ring-black",
      white:
        "text-black bg-white border-white hover:bg-white hover:border-white focus:ring-white",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 focus:ring-red-500",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua focus:ring-aqua",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light focus:ring-aqua-light",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green focus:ring-forest-green",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green focus:ring-sage-green",
      border:
        "text-white bg-border border-border hover:bg-border hover:border-border focus:ring-border",
      neutral:
        "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral focus:ring-neutral",
      purple:
        "text-white bg-purple border-purple hover:bg-purple hover:border-purple focus:ring-purple",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink focus:ring-pink",
      maroon:
        "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon focus:ring-maroon",
      coral:
        "text-black bg-coral border-coral hover:bg-coral hover:border-coral focus:ring-coral",
      marigold:
        "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold focus:ring-marigold",
    },
  },
  defaultVariants: { color: "black" },
});

export interface PaginationBarProps
  extends VariantProps<typeof paginationBarVariants> {
  className?: string;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  children:
    | React.ReactElement<PaginationItemProps>
    | React.ReactElement<PaginationItemProps>[]
    | React.ReactElement<typeof Icon>;
}
