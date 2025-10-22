import React from "react";
import { ArticleTemplateProps, articleTemplateVariants } from "./variants";
import clsx from "clsx";
import Text from "@/primitives/Text";
import Link from "@/primitives/Link";
import Image from "@/primitives/Image";
import Badge from "@/primitives/Badge";
import { OverlayMedia, Overlay } from "@/components/MediaOverlay";

export default function ArticleTemplate({
  title,
  author,
  editor,
  categories = [],
  issueNumber,
  publishDate,
  featuredImage,
  imageCaption,
  content,
  sources,
  className,
  ...variantProps
}: ArticleTemplateProps) {
  return (
    <>
      <article className={clsx(articleTemplateVariants(variantProps), className)}>
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
            {author.name}
          </Text>
          {editor && (
            <>
              <Text size={14} color="black">
                • Edited by
              </Text>
              <Text size={14} style="bold" color="black">
                {editor.name}
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
      <div className="mb-2 rounded-lg overflow-hidden">
        <OverlayMedia>
          <Image {...featuredImage} />
          <Overlay background="gradient-black" children={undefined} />
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
                        <Link href={segment.href} newWindow={segment.newWindow ?? true} className="font-bold underline text-aqua hover:text-forest-green">
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
              <div key={index} className="my-8 border-l-4 border-aqua pl-6 py-4 bg-aqua-light/20">
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
                <Text size={14} color="black">
                  {source}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
    </>
  );
}