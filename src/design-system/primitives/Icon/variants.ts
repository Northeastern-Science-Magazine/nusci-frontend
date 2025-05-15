import { tv, type VariantProps } from "tailwind-variants";
import { Search, Loader, Share, ArrowRight, ArrowLeft, Bookmark, 
  CircleUser, Ellipsis, EllipsisVertical, Image, Instagram, Linkedin, 
  Star, Trash2, ZoomIn, ZoomOut} from "lucide-react"

export const iconVariants = tv({
    base: "items-center justify-center",
    variants: {
      size: {
        sm: "w-3 h-1.5",  // based on the size fo the button variant
        md: "w-4 h-2",    // based on the size fo the button variant
        lg: "w-5 h-3",    // based on the size fo the button variant
      },
      color: {
        black: "text-black",
        white: "text-white bg-black", // here a background is included so that the white icon can be seen
        red: "text-red-500",
        aqua: "text-aqua",
        "aqua-light": "text-aqua-light",
        "forest-green": "text-forest-green",
        "sage-green": "text-sage-green",
        border: "text-border",
        neutral: "text-neutral",
        purple: "text-purple",
        pink: "text-pink",
        maroon: "text-maroon",
        coral: "text-coral",
        marigold: "text-marigold",
      },
},
compoundVariants: [
  {
    color: "black",
    size: "sm",
    class: "text-black",
  },
  {
    color: "black",
    size: "lg",
    class: "text-black",
  },
  {
    color: "white",
    size: "sm",
    class: "text-white",
  },
  {
    color: "white",
    size: "md",
    class: "text-white",
  },
  {
    color: "white",
    size: "lg",
    class: "text-white",
  },
  {
    color: "red",
    size: "sm",
    class: "text-red-500",
  },
  {
    color: "red",
    size: "md",
    class: "text-red-500",
  },
  {
    color: "red",
    size: "lg",
    class: "text-red-500",
  },
  {
    color: "aqua",
    size: "sm",
    class: "text-aqua",
  },
  {
    color: "aqua",
    size: "md",
    class: "text-aqua",
  },
  {
    color: "aqua",
    size: "lg",
    class: "text-aqua",
  },
  {
    color: "border",
    size: "sm",
    class: "text-border",
  },
  {
    color: "border",
    size: "md",
    class: "text-border",
  },
  {
    color: "border",
    size: "lg",
    class: "text-border",
  },
  {
    color: "neutral",
    size: "sm",
    class: "text-neutral",
  },
  {
    color: "neutral",
    size: "md",
    class: "text-neutral",
  },
  {
    color: "neutral",
    size: "lg",
    class: "text-neutral",
  },
  {
    color: "purple",
    size: "sm",
    class: "text-purple",
  },
  {
    color: "purple",
    size: "md",
    class: "text-purple",
  },
  {
    color: "purple",
    size: "lg",
    class: "text-purple",
  },
  {
    color: "pink",
    size: "sm",
    class: "text-pink",
  },
  {
    color: "pink",
    size: "md",
    class: "text-pink",
  },
  {
    color: "pink",
    size: "lg",
    class: "text-pink",
  },
  {
    color: "maroon",
    size: "sm",
    class: "text-maroon",
  },
  {
    color: "maroon",
    size: "md",
    class: "text-maroon",
  },
  {
    color: "maroon",
    size: "lg",
    class: "text-maroon",
  },
  {
    color: "coral",
    size: "sm",
    class: "text-coral",
  },
  {
    color: "coral",
    size: "md",
    class: "text-coral",
  },
  {
    color: "coral",
    size: "lg",
    class: "text-coral",
  },
  {
    color: "marigold",
    size: "sm",
    class: "text-marigold",
  },
  {
    color: "marigold",
    size: "md",
    class: "textmarigold",
  },
  {
    color: "marigold",
    size: "lg",
    class: "text-marigold",
  },
],
defaultVariants: {
  size: "md",
  color: "black",
},
});

/** Create the typing for Icon Variant Props */
export type IconVariants = VariantProps<typeof iconVariants>;

// the available icons to use
export const iconMap = {
  search: Search, 
  loader: Loader, 
  share: Share, 
  arrowright: ArrowRight,
  arrowleft: ArrowLeft,
  bookmark: Bookmark,
  user: CircleUser,
  ellipsis: Ellipsis, 
  ellipsisv: EllipsisVertical, 
  image: Image,
  instagram: Instagram,
  linkedin: Linkedin,
  star: Star, 
  trash: Trash2,
  zoomin: ZoomIn,
  zoomout: ZoomOut
};

export type IconName = keyof typeof iconMap; 

/** Export IconProps as one type */
export interface IconProps extends IconVariants{
  icon: IconName;
  className?: string;
  onClick?: () => void;
}
