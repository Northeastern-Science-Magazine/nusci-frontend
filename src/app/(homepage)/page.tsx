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
    title: "Arctic Melting: The Tipping Points and other such things in order to get a long title",
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
          {/* Left: Recent Articles (not sticky) */}
          <div className="w-1/3 mt-2">
            <div className="space-y-6">
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Text size={18} style="bold">
                    Recent Articles
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    color="black"
                    onClick={() => {
                      window.location.href = "/articles";
                    }}
                  >
                    All
                  </Button>
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
                        rounded="none"
                        color="white"
                        subtitle={article.category}
                        title={article.title}
                        imageProps={{ src: article.img, alt: article.title }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Section */}
          <div className="w-2/3">
            <div className="mb-6 mt-2">
              <OverlayMedia className="w-full">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
                <Overlay background="gradient-black">
                  <Box className="p-8 h-full flex items-end">
                    <div className="max-w-3xl w-full">
                      <Text size={48} style="bold" color="white" className="sm:text-7xl lg:text-7xl leading-tight">
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

            {/* Carousel Placeholder - Extended height to match Recent Articles */}
            <div className="mb-6 h-[31.1rem] flex items-center justify-center">
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 w-full h-full flex items-center justify-center">
                <Text size={18} style="bold">
                  Carousel coming soon
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <Box className="mt-10 border-t border-zinc-200 pt-6">
          <Text size={24} style="bold" className="mb-4">
            Categories
          </Text>
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
            const placeholdersNeeded = 4 - items.length;

            return (
              <Box key={cat} className={`${i > 0 ? "border-t border-zinc-200 mt-6 pt-6" : ""} mb-6`}>
                <div className="flex items-center justify-between mb-3">
                  <Text size={20} style="bold">
                    {cat}
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    color="black"
                    onClick={() => {
                      window.location.href = `/articles?category=${encodeURIComponent(cat.toLowerCase())}`;
                    }}
                  >
                    See all
                  </Button>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2.5 justify-start">
                  {items.map((article) => (
                    <Link key={article.href} href={article.href} newWindow={false} className="block">
                      <MediaCard
                        mediaType="image"
                        mediaDirection="top"
                        size="sm"
                        shadow="none"
                        border="none"
                        rounded="rounded"
                        color="white"
                        subtitle={article.category}
                        title={article.title}
                        imageProps={{ src: article.img, alt: article.title }}
                      />
                    </Link>
                  ))}

                  {Array.from({ length: placeholdersNeeded }, (_, index) => (
                    <div key={`placeholder-${index}`} className="w-full" >
                      <MediaCard
                        mediaType="image"
                        mediaDirection="top"
                        size="sm"
                        shadow="none"
                        border="none"
                        rounded="rounded"
                        color="white"
                        className="[&_.media-container]:h-32 opacity-80 w-full"
                        subtitle={cat}
                        title="Coming soon"
                        imageProps={{ src: "/eclipse-image.png", alt: `${cat} placeholder` }}
                      />
                    </div>
                  ))}
                </div>
              </Box>
            );
          })}
        </Box>
      </Box>
    </section>
  );
}
