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
  Mail,
  Menu,
  X,
  Plus,
  Info,
  Camera,
  Dna,
  FlaskConical,
  Brain,
  Sprout,
  Palette,
  HeartPulse,
  MapPin,
  Calculator,
  Mails,
  Handshake,
  ScrollText,
  Move,
  Vote,
  BrainCog,
  Rocket,
  Cpu,
  Globe,
  BookText,
  Check,
} from "lucide-react";
import { InstagramLogoIcon, LinkedInLogoIcon, Cross2Icon } from "@radix-ui/react-icons";
import { AnimationProps, animationVariants } from "@/design-system/utilities/props/Animation/animation";
import { DisplayProps, displayVariants } from "@/design-system/utilities/props/Display/display";
import { MarginProps, marginVariants } from "@/design-system/utilities/props/Margin/margin";
import { PaddingProps, paddingVariants } from "@/design-system/utilities/props/Padding/padding";
import { PositionProps, positionVariants } from "@/design-system/utilities/props/Position/position";
import clsx from "clsx";

export const iconVariants = tv({
  base: "items-center justify-center",
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
      xl: "w-8 h-8",
      4: "w-[4px] h-[4px]",
      8: "w-[8px] h-[8px]",
      12: "w-[12px] h-[12px]",
      14: "w-[14px] h-[14px]",
      16: "w-[16px] h-[16px]",
      18: "w-[18px] h-[18px]",
      20: "w-[20px] h-[20px]",
      24: "w-[24px] h-[24px]",
      30: "w-[30px] h-[30px]",
      36: "w-[36px] h-[36px]",
      48: "w-[48px] h-[48px]",
      60: "w-[60px] h-[60px]",
      72: "w-[72px] h-[72px]",
      96: "w-[96px] h-[96px]",
      128: "w-[128px] h-[128px]",
      256: "w-[256px] h-[256px]",
      324: "w-[324px] h-[324px]",
      400: "w-[400px] h-[400px]",
      500: "w-[500px] h-[500px]",
      600: "w-[600px] h-[600px]",
      700: "w-[700px] h-[700px]",
      800: "w-[800px] h-[800px]",
      900: "w-[900px] h-[900px]",
      1000: "w-[1000px] h-[1000px]",
    },
    color: {
      black: "text-black",
      white: "text-white",
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
      red: "text-red-500",
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
  cross: Cross2Icon,
  email: Mail,
  menu: Menu,
  x: X,
  plus: Plus,
  info: Info,
  camera: Camera,
  dna: Dna,
  flask: FlaskConical,
  palette: Palette,
  sprout: Sprout,
  heartPulse: HeartPulse,
  mapPin: MapPin,
  calculator: Calculator,
  brain: Brain,
  mails: Mails,
  handShake: Handshake,
  scroll: ScrollText,
  move: Move,
  vote: Vote,
  brainCog: BrainCog,
  rocket: Rocket,
  cpu: Cpu,
  globe: Globe,
  book: BookText,
  check: Check,
};

export type IconName = keyof typeof iconMap;

/** Size type limited to Tailwind variant values */
export type IconSize = IconVariants["size"];

/** Export IconProps as one type */
export interface IconProps extends IconVariants, AnimationProps, DisplayProps, MarginProps, PaddingProps, PositionProps {
  icon: IconName;
  className?: string;
  onClick?: () => void;
}

export const iconVariantsCN = (variantProps: VariantProps<any>, className?: string) =>
  clsx(
    iconVariants(variantProps),
    animationVariants(variantProps),
    displayVariants(variantProps),
    marginVariants(variantProps),
    paddingVariants(variantProps),
    positionVariants(variantProps),
    className,
  );
