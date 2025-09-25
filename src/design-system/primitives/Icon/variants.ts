import { tv, type VariantProps } from "tailwind-variants";
import {
  Search,
  Loader,
  Share,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  CircleUser,
  Ellipsis,
  EllipsisVertical,
  Image,
  Star,
  Trash2,
  ZoomIn,
  ZoomOut,
  Mail
} from "lucide-react";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export const iconVariants = tv({
  base: "items-center justify-center",
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
      xl: "w-8 h-8",
    },
    color: {
      black: "text-black",
      white: "text-white",
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
      text: "text",
    },
  },

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
  instagram: InstagramLogoIcon,
  linkedin: LinkedInLogoIcon,
  star: Star,
  trash: Trash2,
  zoomin: ZoomIn,
  zoomout: ZoomOut,
  email: Mail,
};

export type IconName = keyof typeof iconMap;

/** Export IconProps as one type */
export interface IconProps extends IconVariants {
  icon: IconName;
  className?: string;
  onClick?: () => void;
}
