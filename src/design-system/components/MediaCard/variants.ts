import { CardProps } from "../../primitives/Card/variants";
import { BoxProps } from "@/primitives/Box/variants";
import { ImageProps } from "../../primitives/Image/variants";
import { VideoProps } from "../../primitives/Video/variants";
import { tv, type VariantProps } from "tailwind-variants";

// variants.ts
export const mediaCardVariants = tv({
  base: "flex transition-transform ease-in-out hover:-translate-y-1",
  variants: {
    mediaDirection: {
      default: "flex-row",
      left: "flex-row-reverse",
      top: "flex-col-reverse",
      bottom: "flex-col",
    },
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
    shadow: {
      default: "shadow-lg",
      none: "",
    },
    border: {
      default: "border border-border",
      none: "",
    }, 
    rounded: {
      default: "rounded-3xl overflow-hidden",
      none: "",
    },
    backgroundOpacity: {
      100: "bg-opacity-100",
      90: "bg-opacity-90",
      80: "bg-opacity-80",
      70: "bg-opacity-70",
      60: "bg-opacity-60",
      50: "bg-opacity-50",
      40: "bg-opacity-40",
      30: "bg-opacity-30",
      20: "bg-opacity-20",
      10: "bg-opacity-10",
      none: "",
    },
    color: {
      black: "",
      white: "",
      red: "",
      aqua: "",
      "aqua-light": "",
      "forest-green": "",
      "sage-green": "",
      border: "",
      neutral: "",
      purple: "",
      pink: "",
      maroon: "",
      coral: "",
      marigold: "",
    },
  },
  compoundVariants: [
    // Horizontal layouts - add self-center to text content
    {
      mediaDirection: ["default", "left"],
      class: "[&>div:first-child]:self-center"
    },
    // Horizontal - keep fixed square sizes
    {
      size: "sm",
      mediaDirection: ["default", "left"],
      class:
        "[&_.media-container]:w-48 [&_.media-container]:h-auto [&_.media-container]:flex-shrink-0 max-w-md",
    },
    {
      size: "md",
      mediaDirection: ["default", "left"],
      class:
        "[&_.media-container]:w-56 [&_.media-container]:h-auto [&_.media-container]:flex-shrink-0 max-w-lg",
    },
    {
      size: "lg",
      mediaDirection: ["default", "left"],
      class:
        "[&_.media-container]:w-64 [&_.media-container]:h-auto [&_.media-container]:flex-shrink-0 max-w-xl",
    },

    // VERTICAL LAYOUTS (top, bottom) - Fixed height, full width
    {
      size: "sm",
      mediaDirection: ["top", "bottom"],
      class:
        "[&_.media-container]:w-full [&_.media-container]:h-48 [&_.media-container]:flex-shrink-0  max-w-xs",
    },
    {
      size: "md",
      mediaDirection: ["top", "bottom"],
      class:
        "[&_.media-container]:w-full [&_.media-container]:h-56 [&_.media-container]:flex-shrink-0  max-w-sm",
    },
    {
      size: "lg",
      mediaDirection: ["top", "bottom"],
      class:
        "[&_.media-container]:w-full [&_.media-container]:h-64 [&_.media-container]:flex-shrink-0  max-w-md",
    },

    // Text colors based on Box color prop - light backgrounds
    {
      color: "white",
      class: "text-black"
    },
    {
      color: "aqua-light",
      class: "text-black"
    },
    {
      color: "sage-green",
      class: "text-black"
    },
    {
      color: "neutral",
      class: "text-black"
    },
    {
      color: "pink",
      class: "text-black"
    },
    {
      color: "coral",
      class: "text-black"
    },
    {
      color: "marigold",
      class: "text-black"
    },
    
    // Text colors based on Box color prop - dark backgrounds
    {
      color: "black",
      class: "text-white"
    },
    {
      color: "red",
      class: "text-white"
    },
    {
      color: "aqua",
      class: "text-white"
    },
    {
      color: "forest-green",
      class: "text-white"
    },
    {
      color: "border",
      class: "text-white"
    },
    {
      color: "purple",
      class: "text-white"
    },
    {
      color: "maroon",
      class: "text-white"
    },
  ],
  defaultVariants: {
    mediaDirection: "default",
    size: "md",
  },
});

export const mediaCardTextSizes = {
  sm: { subtitle: 12, title: 18, description: 14 },
  md: { subtitle: 14, title: 20, description: 14 },
  lg: { subtitle: 20, title: 30, description: 16 },
} as const;

export type MediaCardSize = keyof typeof mediaCardTextSizes;

export type MediaCardVariants = VariantProps<typeof mediaCardVariants>;

// Base props shared by all media cards
interface BaseMediaCardProps
  extends Omit<BoxProps, "children">,
    MediaCardVariants {
  subtitle?: string;
  title?: string;
  description?: string;
}

// Image-specific media card
export interface ImageMediaCardProps extends BaseMediaCardProps {
  mediaType: "image";
  imageProps: Omit<ImageProps, "width" | "ratio">;
}

// Video-specific media card
export interface VideoMediaCardProps extends BaseMediaCardProps {
  mediaType: "video";
  videoProps: Omit<VideoProps, "width" | "ratio">;
}

// Union type for the component
export type MediaCardProps = ImageMediaCardProps | VideoMediaCardProps;
