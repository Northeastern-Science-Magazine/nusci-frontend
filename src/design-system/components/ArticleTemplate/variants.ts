import { tv, type VariantProps } from "tailwind-variants";
import { ImageProps } from "@/primitives/Image";
import { ArticleSource, ArticleContent } from "@/lib/types/types";

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

export type ContentSegment =
  | { type: "text"; content: string }
  | { type: "link"; text: string; href: string; newWindow?: boolean };

export type ContentBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; segments: ContentSegment[] }
  | { type: "quote"; content: string };

export interface ArticleTemplateProps extends VariantProps<typeof articleTemplateVariants> {
  title: string;
  author: string;
  editor?: string;
  categories?: string[];
  issueNumber?: string;
  publishDate: string;
  featuredImage?: ImageProps;
  imageCaption?: string;
  articleContent: ArticleContent[];
  sources?: ArticleSource[];
  className?: string;
}