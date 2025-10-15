"use client";

import React, { useState } from "react";
import { Overlay, OverlayMedia } from "@/components/MediaOverlay";

import Box from "@/primitives/Box";
import { Grid, GridCol, GridRow } from "@/primitives/Grid";
import Text from "@/primitives/Text";
import Card from "@/primitives/Card";
import Image from "@/primitives/Image";
import Button from "@/primitives/Button";
import Link from "@/primitives/Link";
import MediaCard from "@/components/MediaCard";

type Issue = { number: number; title: string; href: string };
type Article = { title: string; href: string; img: string; category: string };

const hero = {
  title: "Issue 60 Eclipse is now out",
  img: "/eclipse-image.png",
  href: "/articles",
};

const issues: Issue[] = [
  { number: 21, title: "Issue 21 — Climate Frontiers", href: "/issue/21" },
  { number: 20, title: "Issue 20 — Bioengineering", href: "/issue/20" },
  { number: 19, title: "Issue 19 — Space & Astronomy", href: "/issue/19" },
  { number: 18, title: "Issue 18 — Data & Society", href: "/issue/18" },
  // add more as needed
];

const articles: Article[] = [
  {
    title: "CRISPR's Next Leap: In Vivo Editing",
    href: "/articles/1",
    img: "/eclipse-image.png",
    category: "Biology",
  },
  {
    title: "Quantum Sensors: Smarter Measurements",
    href: "/articles/2",
    img: "/eclipse-image.png",
    category: "Physics",
  },
  {
    title: "Arctic Melting: The Tipping Points",
    href: "/articles/3",
    img: "/eclipse-image.png",
    category: "Environment",
  },
  {
    title: "Microplastics in the Food Chain",
    href: "/articles/4",
    img: "/eclipse-image.png",
    category: "Environment",
  },
  {
    title: "AI for Lab Automation",
    href: "/articles/5",
    img: "/eclipse-image.png",
    category: "Technology",
  },
  {
    title: "Exoplanet Atmospheres",
    href: "/articles/6",
    img: "/eclipse-image.png",
    category: "Space",
  },
];

export default function Page() {
  const [layout, setLayout] = useState<"A" | "B" | "C">("A");

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Spacer under fixed header */}
      <Box className="pt-20">{null}</Box>

      {/* Render selected layout */}
      <main>{layout === "A" && <LayoutA />}</main>

      {/* Footer spacer */}
      <Box className="py-24">{null}</Box>
    </div>
  );
}

/* ----------------------------------------
   Layout A - Hero (full-width) + Issues strip + Featured grid
   NatGeo-style — big hero visual, issues strip prominently below, then 3-col grid
   -----------------------------------------*/
function LayoutA() {
  return (
    <section>
      {/* Main content area with hero and featured articles side by side */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Left: Issues rail (1/3 width) */}
          <div className="w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Text className="text-lg font-semibold">Recent Articles</Text>
                  <Link href="/articles" newWindow={false} className="text-sm">
                    All
                  </Link>
                </div>

                <div className="space-y-3">
                  {articles.slice(0, 4).map((article) => (
                    <Link key={article.href} href={article.href} newWindow={false} className="block">
                      <MediaCard
                        mediaType="image"
                        mediaDirection="left"
                        size="sm"
                        shadow="none"
                        border="none"
                        rounded="rounded"
                        color="white"
                        className="h-24 overflow-hidden [&_.media-container]:h-24 [&_.media-container]:w-24"
                        subtitle={article.category}
                        title={article.title}
                        imageProps={{ src: article.img, alt: article.title }}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                <Text className="text-sm font-medium">Subscribe</Text>
                <Text className="text-sm text-zinc-600 mt-2">
                  Get new issues and feature updates delivered to your inbox.
                </Text>
                <div className="mt-3">
                  <Button size="sm" variant="default" color="black">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Lead article + article list (2/3 width) */}
          <div className="w-2/3">
            {/* Lead article */}
            <div className="mb-6 mt-2">
              <OverlayMedia className="w-full">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
                <Overlay background="gradient-black">
                  <Box className="p-8 h-full flex items-end">
                    <div className="max-w-3xl w-full">
                      <Text className="text-6xl sm:text-7xl lg:text-7xl font-extrabold text-white leading-tight">
                        {hero.title}
                      </Text>
                      <div className="mt-6 flex gap-3">
                        <Link href={hero.href} newWindow={false} className="inline-block">
                          <Button size="md" variant="default" color="black">
                            Click to read!
                          </Button>
                        </Link>
                        <Link href="/issues" newWindow={false} className="inline-block">
                          <Button size="md" variant="outline" color="white">
                            Browse issues
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Box>
                </Overlay>
              </OverlayMedia>
            </div>

            {/* Below lead: article list */}
            <Box className="mt-10 border-t border-zinc-200 pt-6">
              <Text className="text-3xl font-bold mb-4">Categories</Text>

              {[
                "Biology",
                "Chemistry",
                "Environment",
                "Health",
                "Newsletter",
                "Opinion",
                "Physics",
                "Psychology",
                "Space",
                "Technology",
                "World",
              ].map((cat, i) => {
                const items = articles.filter((a) => a.category === cat).slice(0, 4);
                const showPlaceholders = items.length === 0;
                const placeholders = Array.from({ length: 2 });

                return (
                  <Box key={cat} className={`${i > 0 ? "border-t border-zinc-200 mt-6 pt-6" : ""} mb-6`}>
                    <div className="flex items-center justify-between mb-3">
                      <Text className="text-xl font-semibold">{cat}</Text>
                      <Link
                        href={`/articles?category=${encodeURIComponent(cat.toLowerCase())}`}
                        newWindow={false}
                        className="text-sm"
                      >
                        See all
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2.5">
                      {(() => {
                        const items = articles.filter((a) => a.category === cat).slice(0, 4);
                        const needsSinglePlaceholder = items.length === 1;
                        const showPlaceholders = items.length === 0;

                        // Normal items
                        const nodes = items.map((article) => (
                          <Link key={article.href} href={article.href} newWindow={false} className="block">
                            <MediaCard
                              mediaType="image"
                              mediaDirection="top"
                              size="sm"
                              shadow="none"
                              border="none"
                              rounded="rounded"
                              color="white"
                              // Make the card fill the grid cell; override internal max-w-* from variants
                              className="w-full !max-w-none [&_.media-container]:h-32"
                              subtitle={article.category}
                              title={article.title}
                              imageProps={{ src: article.img, alt: article.title }}
                            />
                          </Link>
                        ));

                        // Add a single placeholder to make at least 2 per row if only 1 item
                        if (needsSinglePlaceholder) {
                          nodes.push(
                            <MediaCard
                              key={`${cat}-placeholder-0`}
                              mediaType="image"
                              mediaDirection="top"
                              size="sm"
                              shadow="none"
                              border="none"
                              rounded="rounded"
                              color="white"
                              className="w-full !max-w-none [&_.media-container]:h-32 opacity-80"
                              subtitle={cat}
                              title="Coming soon"
                              imageProps={{ src: "/eclipse-image.png", alt: `${cat} placeholder` }}
                            />
                          );
                        }

                        // If no items, show two placeholders so the first row is full
                        if (showPlaceholders) {
                          nodes.push(
                            <MediaCard
                              key={`${cat}-placeholder-0`}
                              mediaType="image"
                              mediaDirection="top"
                              size="sm"
                              shadow="none"
                              border="none"
                              rounded="rounded"
                              color="white"
                              className="w-full !max-w-none [&_.media-container]:h-32 opacity-80"
                              subtitle={cat}
                              title="Coming soon"
                              imageProps={{ src: "/eclipse-image.png", alt: `${cat} placeholder` }}
                            />,
                            <MediaCard
                              key={`${cat}-placeholder-1`}
                              mediaType="image"
                              mediaDirection="top"
                              size="sm"
                              shadow="none"
                              border="none"
                              rounded="rounded"
                              color="white"
                              className="w-full !max-w-none [&_.media-container]:h-32 opacity-80"
                              subtitle={cat}
                              title="Coming soon"
                              imageProps={{ src: "/eclipse-image.png", alt: `${cat} placeholder` }}
                            />
                          );
                        }

                        return nodes;
                      })()}
                    </div>
                  </Box>
                );
              })}
            </Box>
          </div>
        </div>
      </Box>
    </section>
  );
}
