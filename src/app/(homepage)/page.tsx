"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Overlay, OverlayMedia } from "@/components/MediaOverlay";

import Box from "@/primitives/Box";
import { Grid, GridCol, GridRow } from "@/primitives/Grid";
import Text from "@/primitives/Text";
import Card from "@/primitives/Card";
import Image from "@/primitives/Image";
import Button from "@/primitives/Button";
import Link from "@/primitives/Link";

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
      {/* Header */}
      <Header forceFullMenu />

      {/* Spacer under fixed header */}
      <Box className="pt-20">{null}</Box>

      {/* Layout Switcher */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-2xl font-bold">Homepage Layout</Text>
            <Text className="text-sm text-zinc-600">Choose one of the three layout options to preview structure.</Text>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={layout === "A" ? "default" : "outline"}
              color={"black"}
              onClick={() => setLayout("A")}
            >
              Layout A
            </Button>
            <Button
              size="sm"
              variant={layout === "B" ? "default" : "outline"}
              color={"black"}
              onClick={() => setLayout("B")}
            >
              Layout B
            </Button>
            <Button
              size="sm"
              variant={layout === "C" ? "default" : "outline"}
              color={"black"}
              onClick={() => setLayout("C")}
            >
              Layout C
            </Button>
          </div>
        </div>
      </Box>

      {/* Render selected layout */}
      <main>
        {layout === "A" && <LayoutA />}
        {layout === "B" && <LayoutB />}
        {layout === "C" && <LayoutC />}
      </main>

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
                    <Card key={article.href} className="flex items-center gap-3 p-3 hover:shadow-sm transition-shadow">
                      <div className="w-20 flex-shrink-0">
                        <Image src={article.img} alt={article.title} width="w-full" ratio={1 / 1} />
                      </div>
                      <div>
                        <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{article.category}</Text>
                        <Text className="text-sm font-medium mt-1">{article.title}</Text>
                        <div className="mt-1">
                          <Link href={article.href} newWindow={false} className="text-xs">
                            Read
                          </Link>
                        </div>
                      </div>
                    </Card>
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
            <div className="mb-6">
              <OverlayMedia className="w-full">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
                <Overlay background="gradient-black">
                  <Box className="p-8">
                    <div className="max-w-3xl">
                      <Text className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
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
            <div className="mt-6">
              <Text className="text-xl font-semibold mb-3">Latest articles</Text>
              <div className="space-y-4">
                {articles.map((a) => (
                  <Card key={a.href} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-36 flex-shrink-0">
                        <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                      </div>
                      <div>
                        <Text className="font-semibold">{a.title}</Text>
                        <div className="mt-2">
                          <Link href={a.href} newWindow={false} className="text-sm">
                            Read →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </section>
  );
}

/* ----------------------------------------
   Layout B - Newspaper style: lead article left, issues rail on right, list below
   NYTimes-style — lead story prominent, issues as right rail (prominent but secondary)
   -----------------------------------------*/
function LayoutB() {
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

                <div className="space-y-0">
                  {articles.slice(0, 4).map((article) => (
                    <div key={article.href} className="flex items-start gap-4 p-4 hover:bg-zinc-100 transition-colors rounded-lg">
                      <div className="w-24 flex-shrink-0">
                        <Image src={article.img} alt={article.title} width="w-full" ratio={1 / 1} />
                      </div>
                      <div className="flex-1 h-24 flex flex-col justify-between">
                        <div>
                          <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{article.category}</Text>
                          <Text className="text-sm font-medium mt-1 line-clamp-2">{article.title}</Text>
                        </div>
                        <div>
                          <Link href={article.href} newWindow={false} className="text-xs">
                            Read
                          </Link>
                        </div>
                      </div>
                    </div>
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
            <div className="mb-6">
              <OverlayMedia className="w-full">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
                <Overlay background="gradient-black">
                  <Box className="p-8">
                    <div className="max-w-3xl">
                      <Text className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
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
            <div className="mt-6">
              <Text className="text-xl font-semibold mb-3">Latest articles</Text>
              <div className="space-y-4">
                {articles.map((a) => (
                  <Card key={a.href} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-36 flex-shrink-0">
                        <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                      </div>
                      <div>
                        <Text className="font-semibold">{a.title}</Text>
                        <div className="mt-2">
                          <Link href={a.href} newWindow={false} className="text-sm">
                            Read →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </section>
  );
}

/* ----------------------------------------
   Layout C - Mosaic / magazine-style grid: integrates issues into the tile mosaic
   Science.org-style — tiles of variable sizes, issues integrated as large tiles
   -----------------------------------------*/
function LayoutC() {
  return (
    <section>
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Left: Lead article + article list (2/3 width) */}
          <div className="w-2/3">
            {/* Lead article */}
            <div className="mb-6">
              <OverlayMedia className="w-full">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
                <Overlay background="gradient-black">
                  <Box className="p-8">
                    <div className="max-w-3xl">
                      <Text className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
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
            <div className="mt-6">
              <Text className="text-xl font-semibold mb-3">Latest articles</Text>
              <div className="space-y-4">
                {articles.map((a) => (
                  <Card key={a.href} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-36 flex-shrink-0">
                        <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                      </div>
                      <div>
                        <Text className="font-semibold">{a.title}</Text>
                        <div className="mt-2">
                          <Link href={a.href} newWindow={false} className="text-sm">
                            Read →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Issues rail (1/3 width) */}
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
                    <Card key={article.href} className="flex items-center gap-3 p-3 hover:shadow-sm transition-shadow">
                      <div className="w-20 flex-shrink-0">
                        <Image src={article.img} alt={article.title} width="w-full" ratio={1 / 1} />
                      </div>
                      <div>
                        <Text className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{article.category}</Text>
                        <Text className="text-sm font-medium mt-1">{article.title}</Text>
                        <div className="mt-1">
                          <Link href={article.href} newWindow={false} className="text-xs">
                            Read
                          </Link>
                        </div>
                      </div>
                    </Card>
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
        </div>
      </Box>
    </section>
  );
}
