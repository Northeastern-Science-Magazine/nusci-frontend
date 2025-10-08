import { tv, type VariantProps } from "tailwind-variants";
import { ImageProps } from "@/primitives/Image";

export const articleTemplateVariants = tv({
  base: "max-w-4xl mx-auto px-4 py-8 bg-white",
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

export interface Author {
  name: string;
  role?: string;
  avatar?: string;
}

export interface Editor {
  name: string;
  role?: string;
}

export type ContentSegment =
  | { type: "text"; content: string }
  | { type: "link"; text: string; href: string; newWindow?: boolean };

export type ContentBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; segments: ContentSegment[] };

export interface ArticleTemplateProps extends VariantProps<typeof articleTemplateVariants> {
  title: string;
  author: Author;
  editor?: Editor;
  categories?: string[];
  issueNumber?: string;
  publishDate: string;
  featuredImage: ImageProps;
  imageCaption?: string;
  content: ContentBlock[];
  className?: string;
}