import { CardProps } from "../../primitives/Card/variants";
import { BoxProps } from "@/primitives/Box/variants";
import { ImageProps } from "../../primitives/Image/variants";
import { VideoProps } from "../../primitives/Video/variants";
import { tv, type VariantProps } from "tailwind-variants";

export const mediaCardVariants = tv({
  base: "flex gap-4",
  variants: {
    mediaDirection: {
      default: "flex-row",
      left: "flex-row-reverse",
      top: "flex-col-reverse",
      bottom: "flex-col",
    },
    size: {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-5",
    },
  },
  compoundVariants: [
    // Horizontal: Use aspect-square with maxWidth constraints
  { 
    size: "sm", 
    mediaDirection: ["default", "left"],
    class: "[&_.media-container]:max-w-[12rem] [&_.media-container]:min-w-[6rem] [&_.media-container]:w-auto [&_.media-container]:h-auto [&_.media-container]:flex-none"
  },
  { 
    size: "md",
    mediaDirection: ["default", "left"], 
    class: "[&_.media-container]:max-w-[16rem] [&_.media-container]:min-w-[8rem] [&_.media-container]:w-auto [&_.media-container]:h-auto [&_.media-container]:flex-none"
  },
  { 
    size: "lg",
    mediaDirection: ["default", "left"],
    class: "[&_.media-container]:max-w-[20rem] [&_.media-container]:min-w-[12rem] [&_.media-container]:w-auto [&_.media-container]:h-auto [&_.media-container]:flex-none"
  },
    
    // Vertical: Aspect-video with maxWidth constraints  
    { 
      size: "sm",
      mediaDirection: ["top", "bottom"], 
      class: "[&_.media-container]:w-full [&_.media-container]:max-w-56"
    },
    { 
      size: "md",
      mediaDirection: ["top", "bottom"],
      class: "[&_.media-container]:w-full [&_.media-container]:max-w-64"
    },
    { 
      size: "lg",
      mediaDirection: ["top", "bottom"],
      class: "[&_.media-container]:w-full [&_.media-container]:max-w-96"
    },
  ],
  defaultVariants: {
    mediaDirection: "default",
    size: "md",
  },
});

export const mediaCardTextSizes = {
  sm: { title: 16, subtitle: 18, description: 14 },
  md: { title: 18, subtitle: 20, description: 14 },
  lg: { title: 24, subtitle: 30, description: 16 },
} as const;

export type MediaCardSize = keyof typeof mediaCardTextSizes;

export type MediaCardVariants = VariantProps<typeof mediaCardVariants>;

// Base props shared by all media cards
interface BaseMediaCardProps
  extends Omit<BoxProps, "children">,
    MediaCardVariants {
  title?: string;
  subtitle?: string;
  description?: string;
  rounded: "rounded" | "none";
}

// Image-specific media card
export interface ImageMediaCardProps extends BaseMediaCardProps {
  mediaType: "image";
  imageProps: Omit<ImageProps, "width" | "ratio">  ;
  // imageProps: ImageProps;
}

// Video-specific media card
export interface VideoMediaCardProps extends BaseMediaCardProps {
  mediaType: "video";
  videoProps: Omit<VideoProps, "width" | "ratio">;
  // videoProps: VideoProps;
}

// Union type for the component
export type MediaCardProps = ImageMediaCardProps | VideoMediaCardProps;
