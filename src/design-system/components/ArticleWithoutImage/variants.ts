import { tv, type VariantProps } from "tailwind-variants";

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

export interface Source {
  text: string;
  href: string;
}

export interface ArticleWithoutImageProps
  extends VariantProps<typeof articleTemplateVariants> {
  title: string;
  author: string;
  editor?: string;
  categories?: string[];
  issueNumber?: string;
  publishDate: string;
  content: ContentBlock[];
  sources?: Source[];
  className?: string;
}
