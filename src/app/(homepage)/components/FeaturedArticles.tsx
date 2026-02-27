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
import categoryToIcon from "@/lib/helpers/categoryToIcon";
import categoryToIconColor from "@/lib/helpers/categoryToIconColor";
import { IconName } from "@/design-system/primitives/Icon";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  category?: string;
  slug: string;
}

const truncateByWords = (text: string, wordLimit: number): string => {
  if (!text) return "No description available.";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const truncateTitle = (text: string, charLimit: number): string => {
  if (!text) return "";
  if (text.length <= charLimit) {
    return text;
  }
  return text.slice(0, charLimit) + "...";
};

interface FeaturedArticlesProps {
  featuredArticles: Article[];
  recentArticles: Article[];
  content: {
    title: string;
    viewAllText: string;
  };
}

export default function FeaturedArticles({ featuredArticles, recentArticles, content }: FeaturedArticlesProps) {
  // Use first 2 recent articles for MediaOverlay
  const overlayArticle1 = recentArticles[0];
  const overlayArticle2 = recentArticles[1];
  // Remaining articles for MediaCards
  const sidebarArticles = recentArticles.slice(2, 4);
  const gridArticles = recentArticles.slice(4, 7);

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
              {overlayArticle1 && (
                <OverlayMedia
                  className="overflow-hidden border-2 border-black/10 shadow-lg w-full aspect-[16/10]"
                  iconProps={
                    !overlayArticle1.imageUrl && overlayArticle1.category
                      ? {
                          icon: categoryToIcon(overlayArticle1.category) as IconName,
                          size: 256,
                          color: categoryToIconColor(overlayArticle1.category),
                        }
                      : undefined
                  }
                >
                  {overlayArticle1.imageUrl ? (
                    <Image src={overlayArticle1.imageUrl} alt={overlayArticle1.title} width="w-full" ratio={16 / 10} />
                  ) : null}
                  <Overlay background="gradient-black">
                    <Box className="flex h-full w-full items-end">
                      <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                        <Text size={48} color="white" className="mt-4 tracking-tight max-laptop:text-[28px] max-sm:text-[28px]">
                          {truncateTitle(overlayArticle1.title, 40)}
                        </Text>
                        <Text
                          size={18}
                          color="white"
                          className="mt-3 max-w-2xl font-light leading-relaxed opacity-95 max-sm:text-[16px]"
                        >
                          {truncateByWords(overlayArticle1.description, 15)}
                        </Text>
                        <Box className="mt-6">
                          <Link href={overlayArticle1.slug}>
                            <Button className="inline-flex" color="marigold" size="lg">
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
              {overlayArticle2 && (
                <OverlayMedia
                  className="overflow-hidden border-2 border-black/10 shadow-lg w-full aspect-[16/10]"
                  iconProps={
                    !overlayArticle2.imageUrl && overlayArticle2.category
                      ? {
                          icon: categoryToIcon(overlayArticle2.category) as IconName,
                          size: 256,
                          color: categoryToIconColor(overlayArticle2.category),
                        }
                      : undefined
                  }
                >
                  {overlayArticle2.imageUrl ? (
                    <Image src={overlayArticle2.imageUrl} alt={overlayArticle2.title} width="w-full" ratio={16 / 10} />
                  ) : null}
                  <Overlay background="gradient-black">
                    <Box className="flex h-full w-full items-end">
                      <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                        <Text size={48} color="white" className="mt-4 tracking-tight max-laptop:text-[28px] max-sm:text-[28px]">
                          {truncateTitle(overlayArticle2.title, 40)}
                        </Text>
                        <Text
                          size={18}
                          color="white"
                          className="mt-3 max-w-2xl font-light leading-relaxed opacity-95 max-sm:text-[16px]"
                        >
                          {truncateByWords(overlayArticle2.description, 15)}
                        </Text>
                        <Box className="mt-6">
                          <Link href={overlayArticle2.slug}>
                            <Button className="inline-flex" color="marigold" size="lg">
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
                {sidebarArticles.map((article) =>
                  article.imageUrl ? (
                    <Link href={article.slug} key={article.id}>
                      <MediaCard
                        mediaType="image"
                        imageProps={{ src: article.imageUrl, alt: article.title }}
                        subtitle={article.subtitle || "Article"}
                        title={truncateTitle(article.title, 40)}
                        description={truncateByWords(article.description, 15)}
                        mediaDirection="top"
                        size="sm"
                        rounded="none"
                        shadow="none"
                        color="white"
                        className="w-full max-w-none border-b border-black/10 pb-6"
                      />
                    </Link>
                  ) : (
                    <Link href={article.slug} key={article.id}>
                      <MediaCard
                        mediaType="icon"
                        iconProps={{
                          icon: categoryToIcon(article.category || "uncategorized") as IconName,
                          size: 128,
                          color: categoryToIconColor(article.category || "uncategorized"),
                        }}
                        subtitle={article.subtitle || article.category || "Article"}
                        title={truncateTitle(article.title, 40)}
                        description={truncateByWords(article.description, 15)}
                        mediaDirection="top"
                        size="sm"
                        rounded="none"
                        shadow="none"
                        color="white"
                        className="w-full max-w-none border-b border-black/10 pb-6"
                      />
                    </Link>
                  ),
                )}
              </Box>
            </div>
          </Box>

          {/* Secondary Articles Grid - Newspaper Style */}
          <div className="mt-12 border-t-2 border-black/10 pt-12">
            <Box className="grid gap-6 laptop:grid-cols-3">
              {gridArticles.map((article) =>
                article.imageUrl ? (
                  <Link href={article.slug} key={article.id}>
                    <MediaCard
                      mediaType="image"
                      imageProps={{ src: article.imageUrl, alt: article.title }}
                      subtitle={article.subtitle || "Article"}
                      title={truncateTitle(article.title, 50)}
                      description={truncateByWords(article.description, 20)}
                      mediaDirection="top"
                      size="sm"
                      rounded="none"
                      shadow="none"
                      color="white"
                      className="w-full max-w-none border border-black/10"
                    />
                  </Link>
                ) : (
                  <Link href={article.slug} key={article.id}>
                    <MediaCard
                      mediaType="icon"
                      iconProps={{
                        icon: categoryToIcon(article.category || "uncategorized") as IconName,
                        size: 128,
                        color: categoryToIconColor(article.category || "uncategorized"),
                      }}
                      subtitle={article.subtitle || article.category || "Article"}
                      title={truncateTitle(article.title, 50)}
                      description={truncateByWords(article.description, 20)}
                      mediaDirection="top"
                      size="sm"
                      rounded="none"
                      shadow="none"
                      color="white"
                      className="w-full max-w-none border border-black/10"
                    />
                  </Link>
                ),
              )}
            </Box>
          </div>
        </Box>
      </ParallaxScrollSection>
    </Font>
  );
}
