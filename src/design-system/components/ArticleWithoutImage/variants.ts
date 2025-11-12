import { tv, type VariantProps } from "tailwind-variants";
import { IconProps, IconName } from "@/primitives/Icon";

export const articleTemplateVariants = tv({
  base: "max-w-4xl mx-auto px-4 pt-24 pb-8 bg-white",
  variants: {
    width: {
      narrow: "max-w-2xl",
      default: "max-w-4xl",
      wide: "max-w-6xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

// Using the colors from the Icon primitive
export type IconColor = NonNullable<IconProps["color"]>;
export type IconType = IconName;

// Add a variant for icon container backgrounds
export const iconContainerVariants = tv({
  base: "mb-8 rounded-lg overflow-hidden flex items-center justify-center",
  variants: {
    color: {
      black: "bg-black/10",
      white: "bg-white",
      red: "bg-red-500/20",
      aqua: "bg-aqua/20",
      "aqua-light": "bg-aqua-light",
      "forest-green": "bg-forest-green/20",
      "sage-green": "bg-sage-green",
      border: "bg-border",
      neutral: "bg-neutral/20",
      purple: "bg-purple/20",
      pink: "bg-pink/20",
      maroon: "bg-maroon/20",
      coral: "bg-coral/20",
      marigold: "bg-marigold/20",
      text: "bg-neutral/10",
    },
  },
  defaultVariants: {
    color: "aqua-light",
  },
});

export type ContentSegment =
  | { type: "text"; content: string }
  | { type: "link"; text: string; href: string; newWindow?: boolean };

export type ContentBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; segments: ContentSegment[] }
  | { type: "quote"; content: string };

export interface Source {
  text: string;
  href: string;
}

export interface ArticleIcon {
  icon: IconType;
  color?: IconColor;
}

export interface ArticleWithoutImageProps extends VariantProps<typeof articleTemplateVariants> {
  title: string;
  author: string;
  editor?: string;
  categories?: string[];
  issueNumber?: string;
  publishDate: string;
  articleIcon: ArticleIcon;  
  content: ContentBlock[];
  sources?: Source[];
  className?: string;
}