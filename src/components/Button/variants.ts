import { tv, type VariantProps } from "tailwind-variants";

export const bv = tv({
  base: "items-center justify-center font-medium transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    variant: {
      default: "shadow bg-opacity-100 hover:bg-opacity-75",
      emphasis: "shadow-lg bg-opacity-100 hover:shadow-xl hover:bg-opacity-75",
      outline: "",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    },
    color: {
      black: "text-white bg-black border-black hover:bg-black hover:border-black focus:ring-black",
      white: "text-black bg-white border-white hover:bg-white hover:border-white focus:ring-white",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 focus:ring-red-500",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      color: "black",
      class: "bg-transparent border-2 border-black text-black hover:text-white",
    },
    {
      variant: "outline",
      color: "white",
      class: "bg-transparent border-2 border-white text-white hover:text-black",
    },
    {
      variant: "outline",
      color: "red",
      class: "bg-transparent border-2 border-red-600 text-red-600 hover:text-white",
    },
    {
      variant: "emphasis",
      color: "black",
      class: "shadow-black",
    },
    {
      variant: "emphasis",
      color: "white",
      class: "shadow-black",
    },
    {
      variant: "emphasis",
      color: "red",
      class: "shadow-black",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    color: "black",
  },
});

export type ButtonVariants = VariantProps<typeof bv>;

export interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  onClick?: () => void;
}
