import { tv, type VariantProps } from "tailwind-variants";

export const dividerVariants = tv({
  base: "shrink-0",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    width: {
      thin: "",
      thick: "",
    },
    margin: {
      2: "",
      4: "",
      6: "",
    },
    color: {
      black: "bg-black border-black",
      white: "bg-white border-white",
      neutral: "bg-neutral border-neurtral"
    },
  },

  compoundVariants: [
    // Width + Orientation
    { orientation: "horizontal", width: "thin", class: "border-t" },
    { orientation: "horizontal", width: "thick", class: "h-1" },
    { orientation: "vertical", width: "thin", class: "border-l" },
    { orientation: "vertical", width: "thick", class: "w-1" },

    // Margin + Orientation
    { orientation: "horizontal", margin: 2, class: "my-2" },
    { orientation: "horizontal", margin: 4, class: "my-4" },
    { orientation: "horizontal", margin: 6, class: "my-6" },

    { orientation: "vertical", margin: 2, class: "mx-2" },
    { orientation: "vertical", margin: 4, class: "mx-4" },
    { orientation: "vertical", margin: 6, class: "mx-6" },
  ],

  defaultVariants: {
    orientation: "horizontal",
    width: "thin",
    margin: 2,
    color: "black",
  },
})


type DividerVariants = VariantProps<typeof dividerVariants>;

export interface DividerProps extends DividerVariants {
  className?: string;
}
