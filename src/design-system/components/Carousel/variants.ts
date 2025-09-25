import { tv, type VariantProps } from "tailwind-variants";
import { ReactNode, HTMLAttributes } from "react";

export const carouselContainerVariants = tv({
  base: "relative flex items-center justify-center",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      xs: "gap-6",
      sm: "gap-8", 
      md: "gap-10", 
      lg: "gap-12", 
      xl: "gap-16",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export const carouselVariants = tv({
  base: "relative flex-1",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      class: "h-64",
    },
    {
      orientation: "vertical", 
      class: "w-80 h-96", 
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselSizeVariants = tv({
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    orientation: {
      horizontal: "",
      vertical: "",
    },
  },
  compoundVariants: [
    { size: "xs", orientation: "horizontal", class: "h-30" },    
    { size: "sm", orientation: "horizontal", class: "h-50" },    
    { size: "md", orientation: "horizontal", class: "h-70" },    
    { size: "lg", orientation: "horizontal", class: "h-90" },    
    { size: "xl", orientation: "horizontal", class: "h-110" },    
    
    { size: "xs", orientation: "vertical", class: "w-64 h-48" }, 
    { size: "sm", orientation: "vertical", class: "w-72 h-64" }, 
    { size: "md", orientation: "vertical", class: "w-80 h-80" },
    { size: "lg", orientation: "vertical", class: "w-96 h-96" }, 
    { size: "xl", orientation: "vertical", class: "w-[28rem] h-[28rem]" }, 
  ],
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});


export const carouselContentVariants = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    gap: {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    gap: "md",
  },
});


export const carouselItemVariants = tv({
  base: "min-w-0 shrink-0 grow-0",
  variants: {
    orientation: {
      horizontal: "",
      vertical: "",
    },
    basis: {
      full: "basis-full",
      "1/2": "basis-1/2",
      "1/3": "basis-1/3",
      "2/3": "basis-2/3",
      "1/4": "basis-1/4",
      "3/4": "basis-3/4",
      "1/5": "basis-1/5",
      auto: "basis-auto",
    },
    gap: {
      none: "",
      xs: "p-1",
      sm: "p-2", 
      md: "p-2",
      lg: "p-3",
      xl: "p-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    basis: "full",
    gap: "md",
  },
});


export const carouselNavigationVariants = tv({
  base: "absolute z-10",
  variants: {
    orientation: {
      horizontal: "",
      vertical: "",
    },
    position: {
      previous: "",
      next: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      position: "previous",
      class: "left-0 top-1/2 -translate-y-1/2",
    },
    {
      orientation: "horizontal",
      position: "next",
      class: "right-0 top-1/2 -translate-y-1/2",
    },
    {
      orientation: "vertical",
      position: "previous", 
      class: "top-0 left-1/2 -translate-x-1/2",
    },
    {
      orientation: "vertical",
      position: "next",
      class: "bottom-0 left-1/2 -translate-x-1/2",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    position: "previous",
  },
});

export const carouselDotVariants = tv({
  base: "w-2 h-2 rounded-full transition-all duration-200 cursor-pointer",
  variants: {
    active: {
      true: "bg-blue-500 scale-125",
      false: "bg-gray-300 hover:bg-gray-400 hover:scale-110",
    },
  },
  defaultVariants: {
    active: false,
  },
});


export type CarouselProps = VariantProps<typeof carouselVariants> & 
  VariantProps<typeof carouselContainerVariants> & {
  children: ReactNode;
  className?: string;
  showNavigation?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  itemsPerView?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  onSlideChange?: (index: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export type CarouselContentProps = VariantProps<typeof carouselContentVariants> & {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export type CarouselItemProps = VariantProps<typeof carouselItemVariants> & {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;