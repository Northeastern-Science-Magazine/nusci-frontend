import React from "react";
import { ArticleTemplateProps, articleTemplateVariants } from "./variants";
import clsx from "clsx";
import Text from "@/primitives/Text";
import Link from "@/primitives/Link";
import Image from "@/primitives/Image";
import Badge from "@/primitives/Badge";
import { OverlayMedia, Overlay } from "@/components/MediaOverlay";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
  className,
  ...variantProps
}: ArticleTemplateProps) {
  return (
    <>
    {/* Header Section */}
      <Header />
      <article className={clsx(articleTemplateVariants(variantProps), className)}>
      <header className="mb-8 mt-10">
        {/* Categories and Issue Number */}
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Title */}
        <div className="mb-4">
          <Text size={48} style="bold" color="black">
            {title}
          </Text>
        </div>

        {/* Publish Date */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Text size={14} color="neutral">
            {publishDate}
          </Text>
        </div>

        {/* Author and Editor Info */}
        <div className="flex flex-wrap items-center gap-2">
          <Text size={14} color="neutral">
            By
          </Text>
          <Text size={14} style="bold" color="black">
            {author.name}
          </Text>
          {editor && (
            <>
              <Text size={14} color="neutral">
                • Edited by
              </Text>
              <Text size={14} style="bold" color="black">
                {editor.name}
              </Text>
            </>
          )}
        </div>
      </header>

      {/* Image with Media Overlay */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <OverlayMedia>
          <Image {...featuredImage} />
          <Overlay background="gradient-black">
            {imageCaption && (
              <div className="flex flex-col justify-end h-full p-4">
                <Text size={14} color="white">
                  {imageCaption}
                </Text>
              </div>
            )}
          </Overlay>
        </OverlayMedia>
      </div>

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
                        <Link href={segment.href} newWindow={segment.newWindow ?? true} className="font-bold">
                          {segment.text}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </Text>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Footer */}
      <Footer />
    </article>
    </>
  );
}