import { tv, type VariantProps } from "tailwind-variants";
import { ReactNode, HTMLAttributes } from "react";

/**
 * Carousel Container Variants
 */
export const carouselContainerVariants = tv({
  base: "relative flex items-center justify-center",
  variants: {
    orientation: {
      horizontal: "flex-row", // Navigation buttons -- left/right
      vertical: "flex-col",   // Navigation buttons --top/bottom
    },
    size: {
      // Gap between carousel and navigation buttons
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

/**
 * Carousel Base Variants
 * Core styles for the carousel viewport itself
 */
export const carouselVariants = tv({
  base: "relative flex-1",
  variants: {
    orientation: {
      horizontal: "w-full", // Full width, height controlled by size variants
      vertical: "",         // Width and height controlled by size variants
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

/**
 * Carousel Size Variants
 * Responsive sizing for different carousel dimensions
 * Uses compound variants to apply different sizes based on orientation
 */
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
    // Horizontal carousel heights 
    { size: "xs", orientation: "horizontal", class: "h-40" },     
    { size: "sm", orientation: "horizontal", class: "h-48" },    
    { size: "md", orientation: "horizontal", class: "h-64" },     
    { size: "lg", orientation: "horizontal", class: "h-96" },  
    { size: "xl", orientation: "horizontal", class: "h-[32rem]" }, 
    
    // Vertical carousel dimensions
    { size: "xs", orientation: "vertical", class: "w-64 h-72" },   
    { size: "sm", orientation: "vertical", class: "w-80 h-96" },   
    { size: "md", orientation: "vertical", class: "w-96 h-[32rem]" }, 
    { size: "lg", orientation: "vertical", class: "w-[28rem] h-[40rem]" }, 
    { size: "xl", orientation: "vertical", class: "w-[32rem] h-[48rem]" }, 
  ],
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

/**
 * Carousel Content Variants 
 * Styles for the sliding content container
 * Controls layout direction and spacing between items
 */
export const carouselContentVariants = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    gap: {
      // Spacing between carousel items
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

/**
 * Carousel Item Variants
 * Individual carousel item styling with flexible basis options
 * Allows for complex layouts with items of different sizes
 */
export const carouselItemVariants = tv({
  base: "min-w-0 shrink-0 grow-0", // Prevents flex items from shrinking/growing unexpectedly
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
      "1/6": "basis-1/6",     
      auto: "basis-auto",      
    },
    gap: {
      // Internal padding for each carousel item
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

/**
 * Carousel Navigation Variants 
 * Positioning and styling for navigation arrows
 * Uses compound variants to position buttons correctly for each orientation
 * Positions arrows outside the carousel content area to avoid overlap
 */
export const carouselNavigationVariants = tv({
  base: "absolute z-10 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow",
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
      class: "-left-6 top-1/2 -translate-y-1/2",
    },
    {
      orientation: "horizontal",
      position: "next",
      class: "-right-6 top-1/2 -translate-y-1/2",
    },
    {
      orientation: "vertical",
      position: "previous", 
      class: "-top-3 left-1/2 -translate-x-1/2",
    },
    {
      orientation: "vertical",
      position: "next",
      class: "-bottom-3 left-1/2 -translate-x-1/2", 
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    position: "previous",
  },
});

/**
 * Type Definitions
 * Combines variant props with standard HTML attributes
 */

// Main carousel component props
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
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & HTMLAttributes<HTMLDivElement>;      

// Carousel content wrapper props
export type CarouselContentProps = VariantProps<typeof carouselContentVariants> & {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

// Individual carousel item props
export type CarouselItemProps = VariantProps<typeof carouselItemVariants> & {
  children: ReactNode;
  className?: string;
  itemsPerView?: number; // Number of items visible per page
} & HTMLAttributes<HTMLDivElement>;