import React from "react";
import {
  ArticleTemplateProps,
  articleTemplateVariants,
  ContentBlock,
} from "./variants";
import clsx from "clsx";
import Text from "@/primitives/Text";
import Link from "@/primitives/Link";
import Image from "@/primitives/Image";
import Badge from "@/primitives/Badge";
import { OverlayMedia, Overlay } from "@/components/MediaOverlay";

// Convert ArticleContent to ContentBlock format
function convertArticleContentToContentBlocks(
  articleContent: ArticleTemplateProps["articleContent"],
): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  type ParagraphBlock = Extract<ContentBlock, { type: "paragraph" }>;
  const paragraphSegments: ParagraphBlock["segments"] = [];

  let prevType:
    | ArticleTemplateProps["articleContent"][number]["contentType"]
    | null = null;

  const flushParagraph = () => {
    if (paragraphSegments.length === 0) return;
    blocks.push({
      type: "paragraph",
      segments: [...paragraphSegments],
    });
    paragraphSegments.length = 0;
  };

  articleContent.forEach((item) => {
    if (item.contentType === "image") {
      flushParagraph();
      prevType = item.contentType;
      return;
    }

    if (item.contentType === "pull_quote") {
      flushParagraph();
      blocks.push({
        type: "quote",
        content: item.content,
      });
      prevType = item.contentType;
      return;
    }

    if (item.contentType === "body_paragraph") {
      if (prevType === "body_paragraph") {
        flushParagraph();
      }

      paragraphSegments.push({
        type: "text",
        content: item.content,
      });
      prevType = item.contentType;
      return;
    }

    if (item.contentType === "link") {
      paragraphSegments.push({
        type: "link",
        text: " " + item.content + " ",
        href: item.href ?? "#",
      });
      prevType = item.contentType;
      return;
    }
  });

  flushParagraph();
  return blocks;
}

export default function ArticleTemplate({
  title,
  author,
  editor,
  categories = [],
  issueNumber,
  publishDate,
  featuredImage,
  imageCaption,
  articleContent,
  sources,
  className,
  ...variantProps
}: ArticleTemplateProps) {
  // Convert articleContent to ContentBlock format
  const content = convertArticleContentToContentBlocks(articleContent);
  return (
    <>
      <article
        className={clsx(articleTemplateVariants(variantProps), className)}
      >
        {/* Header Section */}
        <header className="mb-8 mt-8">
          {/* Title */}
          <div className="mb-4">
            <Text size={48} style="bold" color="black">
              {title}
            </Text>
          </div>

          {/* Publish Date */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Text size={14} color="black">
              {publishDate}
            </Text>
          </div>

          {/* Author and Editor Info */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Text size={14} color="black">
              By
            </Text>
            <Text size={14} style="bold" color="black">
              {author}
            </Text>
            {editor && (
              <>
                <Text size={14} color="black">
                  • Edited by
                </Text>
                <Text size={14} style="bold" color="black">
                  {editor}
                </Text>
              </>
            )}
          </div>

          {/* Categories and Issue Number */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category, index) => (
              <Badge key={index} color="aqua" variant="default">
                {category}
              </Badge>
            ))}
            {issueNumber && (
              <Badge color="neutral" variant="outline">
                {issueNumber}
              </Badge>
            )}
          </div>
        </header>

        {/* Featured Image with Media Overlay */}
        {featuredImage && (
          <>
            <div className="mb-2 rounded-lg overflow-hidden">
              <OverlayMedia>
                <Image {...featuredImage} />
                <Overlay background="gradient-black">{undefined}</Overlay>
              </OverlayMedia>
            </div>

            {/* Image Caption Below */}
            {imageCaption && (
              <div className="mb-8">
                <Text size={14} style="italic" color="black">
                  {imageCaption}
                </Text>
              </div>
            )}
          </>
        )}

        {/* Article Content */}
        <div className="flex flex-col gap-6">
          {content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <div key={index} className="mt-8 mb-4">
                  <Text size={30} style="bold" color="black">
                    {block.content}
                  </Text>
                </div>
              );
            }

            if (block.type === "paragraph") {
              return (
                <div key={index} className="leading-relaxed">
                  <Text size={18} color="black">
                    {block.segments.map((segment, segIndex) => (
                      <React.Fragment key={segIndex}>
                        {segment.type === "text" && segment.content}
                        {segment.type === "link" && (
                          <Link
                            href={segment.href}
                            newWindow={true}
                            className="font-bold underline text-aqua hover:text-forest-green"
                          >
                            {segment.text}
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </Text>
                </div>
              );
            }

            if (block.type === "quote") {
              return (
                <div
                  key={index}
                  className="my-8 border-l-4 border-aqua pl-6 py-4 bg-aqua-light/20"
                >
                  <Text size={24} style="italic" color="black">
                    {block.content}
                  </Text>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Sources Section */}
        {sources && sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-black">
            <div className="mb-4">
              <Text size={24} style="bold" color="black">
                Sources
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              {sources.map((source, index) => (
                <div key={index} className="leading-relaxed">
                  <Link
                    href={source.href}
                    newWindow={true}
                    className="underline text-aqua hover:text-forest-green"
                  >
                    <Text size={14} color="black">
                      {source.text}
                    </Text>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
