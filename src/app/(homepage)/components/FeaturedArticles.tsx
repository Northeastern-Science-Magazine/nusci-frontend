"use client";

import MediaCard from "@/design-system/components/MediaCard";
import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";
import Button from "@/design-system/primitives/Button";
import Divider from "@/design-system/primitives/Divider";
import { ChevronRight } from "lucide-react";
import Image from "@/design-system/primitives/Image";
import Text from "@/design-system/primitives/Text";
import Box from "@/design-system/primitives/Box";
import Link from "@/design-system/primitives/Link";
import Font from "@/design-system/primitives/Font";
import { ParallaxScrollSection } from "@/design-system/components/ParallaxScrollSection";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  category?: string;
  slug: string;
}

interface FeaturedArticlesProps {
  featuredArticles: Article[];
  recentArticles: Article[];
  content: {
    title: string;
    viewAllText: string;
  };
}

export default function FeaturedArticles({
  featuredArticles,
  recentArticles,
  content,
}: FeaturedArticlesProps) {
  const mainArticle1 = featuredArticles[0];
  const mainArticle2 = featuredArticles[1];
  const sidebarArticles = recentArticles.slice(0, 2);
  const gridArticles = recentArticles.slice(2, 5);

  return (
    <Font serif>
      <ParallaxScrollSection imageSrc={"/succulent.png"}>
        <Box className="relative px-4 laptop:px-16 py-16">
          <Box className="flex flex-col items-start justify-between gap-4 laptop:flex-row laptop:items-end">
            <Text size={48} className="mt-2 tracking-tight laptop:text-[56px]">
              {content.title}
            </Text>

            <Link
              href="/article-search"
              className="group inline-flex items-center gap-2 border-b-2 border-black/20 pb-1 text-[14px] font-medium text-black/80 transition-all hover:border-black/40 hover:text-black"
            >
              {content.viewAllText}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Box>

          <Divider my={8} />

          <Box className="grid gap-8 laptop:grid-cols-12">
            {/* Newspaper Layout - Multi-column */}
            <div className="laptop:col-span-8 space-y-8">
              {/* First Main Article */}
              {mainArticle1 && (
                <OverlayMedia className="overflow-hidden border-2 border-black/10 shadow-lg">
                  <Image
                    src={mainArticle1.imageUrl}
                    alt={mainArticle1.title}
                    width="w-full"
                    ratio={16 / 10}
                  />
                  <Overlay background="gradient-black">
                    <Box className="flex h-full w-full items-end">
                      <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                        <Text
                          size={48}
                          color="white"
                          className="mt-4 tracking-tight max-laptop:text-[28px] max-sm:text-[28px]"
                        >
                          {mainArticle1.title}
                        </Text>
                        <Text
                          size={18}
                          color="white"
                          className="mt-3 max-w-2xl font-light leading-relaxed opacity-95 max-sm:text-[16px]"
                        >
                          {mainArticle1.description}
                        </Text>
                        <Box className="mt-6">
                          <Link href={mainArticle1.slug}>
                            <Button
                              className="inline-flex"
                              color="marigold"
                              size="lg"
                            >
                              Read article
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Overlay>
                </OverlayMedia>
              )}

              {/* Second Main Article */}
              {mainArticle2 && (
                <OverlayMedia className="overflow-hidden border-2 border-black/10 shadow-lg">
                  <Image
                    src={mainArticle2.imageUrl}
                    alt={mainArticle2.title}
                    width="w-full"
                    ratio={16 / 10}
                  />
                  <Overlay background="gradient-black">
                    <Box className="flex h-full w-full items-end">
                      <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                        <Text
                          size={48}
                          color="white"
                          className="mt-4 tracking-tight max-laptop:text-[28px] max-sm:text-[28px]"
                        >
                          {mainArticle2.title}
                        </Text>
                        <Text
                          size={18}
                          color="white"
                          className="mt-3 max-w-2xl font-light leading-relaxed opacity-95 max-sm:text-[16px]"
                        >
                          {mainArticle2.description}
                        </Text>
                        <Box className="mt-6">
                          <Link href={mainArticle2.slug}>
                            <Button
                              className="inline-flex"
                              color="marigold"
                              size="lg"
                            >
                              Read article
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Overlay>
                </OverlayMedia>
              )}
            </div>
            {/* Sidebar Articles - Right Column */}
            <div className="laptop:col-span-4">
              <Box className="space-y-6 border-l-2 border-black/10 pl-6 laptop:pl-8">
                {sidebarArticles.map((article) => (
                  <Link href={article.slug}>
                    <MediaCard
                      key={article.id}
                      mediaType="image"
                      imageProps={{ src: article.imageUrl, alt: article.title }}
                      subtitle={article.subtitle || "Article"}
                      title={article.title}
                      description={article.description}
                      mediaDirection="top"
                      size="sm"
                      rounded="none"
                      shadow="none"
                      color="white"
                      className="w-full max-w-none border-b border-black/10 pb-6"
                    />
                  </Link>
                ))}
              </Box>
            </div>
          </Box>

          {/* Secondary Articles Grid - Newspaper Style */}
          <div className="mt-12 border-t-2 border-black/10 pt-12">
            <Box className="grid gap-6 laptop:grid-cols-3">
              {gridArticles.map((article) => (
                <Link href={article.slug}>
                  <MediaCard
                    key={article.id}
                    mediaType="image"
                    imageProps={{ src: article.imageUrl, alt: article.title }}
                    subtitle={article.subtitle || "Article"}
                    title={article.title}
                    description={article.description}
                    mediaDirection="top"
                    size="sm"
                    rounded="none"
                    shadow="none"
                    color="white"
                    className="w-full max-w-none border border-black/10"
                  />
                </Link>
              ))}
            </Box>
          </div>
        </Box>
      </ParallaxScrollSection>
    </Font>
  );
}
