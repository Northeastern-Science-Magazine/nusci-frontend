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
type Article = { title: string; href: string; img: string; excerpt?: string };

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
    excerpt: "New CRISPR tech pushes boundaries...",
  },
  {
    title: "Quantum Sensors: Smarter Measurements",
    href: "/articles/2",
    img: "/eclipse-image.png",
    excerpt: "Tiny devices, huge impact...",
  },
  {
    title: "Arctic Melting: The Tipping Points",
    href: "/articles/3",
    img: "/eclipse-image.png",
    excerpt: "How fast and what follows...",
  },
  {
    title: "Microplastics in the Food Chain",
    href: "/articles/4",
    img: "/eclipse-image.png",
    excerpt: "Tracking plastics across ecosystems",
  },
  {
    title: "AI for Lab Automation",
    href: "/articles/5",
    img: "/eclipse-image.png",
    excerpt: "Robots and algorithms in the lab",
  },
  {
    title: "Exoplanet Atmospheres",
    href: "/articles/6",
    img: "/eclipse-image.png",
    excerpt: "Looking for signs of life",
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
          {/* Left: Featured articles (1/4 width) */}
          <div className="w-1/4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Text className="text-lg font-semibold">Featured</Text>
                  <Link href="/articles" newWindow={false} className="text-sm">
                    More
                  </Link>
                </div>

                <div className="space-y-3">
                  {articles.slice(0, 4).map((a) => (
                    <Card key={a.href} className="hover:shadow-md transition-shadow">
                      <div className="flex gap-3">
                        <div className="w-20 flex-shrink-0">
                          <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                        </div>
                        <div className="flex-1">
                          <Text className="text-sm font-semibold">{a.title}</Text>
                          <Text className="text-xs text-zinc-600 mt-1 line-clamp-2">{a.excerpt}</Text>
                          <div className="mt-2">
                            <Link href={a.href} newWindow={false} className="text-xs">
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

          {/* Right: Hero (3/4 width) */}
          <div className="w-3/4">
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

            {/* Issues strip below hero */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Text className="text-xl font-semibold">Issues</Text>
                <Link href="/issues" newWindow={false} className="text-sm">
                  See all
                </Link>
              </div>

              {/* Horizontal scroll strip for issues */}
              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-2">
                  {issues.map((iss) => (
                    <Card key={iss.number} className="min-w-[220px] max-w-[220px] hover:shadow-md transition-shadow">
                      <div className="relative">
                        <Image src="/eclipse-image.png" alt={iss.title} width="w-full" ratio={4 / 5} />
                        <div className="p-3">
                          <Text className="text-sm font-medium">Issue {iss.number}</Text>
                          <Text className="text-sm">{iss.title}</Text>
                          <div className="mt-2">
                            <Link href={iss.href} newWindow={false} className="text-sm">
                              Open issue
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
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Left: Lead article + article list (2/3 width) */}
          <div className="w-2/3">
            {/* Lead article */}
            <Card className="bg-zinc-50 border border-zinc-200">
              <div className="overflow-hidden rounded-t-lg">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
              </div>
              <div className="p-6">
                <Text className="text-4xl font-extrabold">{hero.title}</Text>
                <div className="mt-4">
                  <Link href={hero.href} newWindow={false}>
                    <Button size="md" variant="default" color="black">
                      Continue reading
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

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
                        <Text className="text-sm text-zinc-600 mt-1">{a.excerpt}</Text>
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
                  <Text className="text-lg font-semibold">Issues</Text>
                  <Link href="/issues" newWindow={false} className="text-sm">
                    All
                  </Link>
                </div>

                <div className="space-y-3">
                  {issues.map((iss) => (
                    <Card key={iss.number} className="flex items-center gap-3 p-3 hover:shadow-sm transition-shadow">
                      <div className="w-20 flex-shrink-0">
                        <Image src="/eclipse-image.png" alt={iss.title} width="w-full" ratio={4 / 5} />
                      </div>
                      <div>
                        <Text className="text-sm font-medium">Issue {iss.number}</Text>
                        <Text className="text-sm text-zinc-600">{iss.title}</Text>
                        <div className="mt-1">
                          <Link href={iss.href} newWindow={false} className="text-xs">
                            Open
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

/* ----------------------------------------
   Layout C - Mosaic / magazine-style grid: integrates issues into the tile mosaic
   Science.org-style — tiles of variable sizes, issues integrated as large tiles
   -----------------------------------------*/
function LayoutC() {
  return (
    <section>
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mosaic Grid Layout */}
        <Grid col span={12} gap={6} className="auto-rows-[200px]">
          {/* Hero Issue - Large tile spanning 6 columns and 2 rows */}
          <GridCol span={6} className="row-span-2">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Text className="text-2xl font-bold text-white mb-2">{hero.title}</Text>
                  <div className="flex gap-2">
                    <Link href={hero.href} newWindow={false}>
                      <Button size="sm" variant="default" color="white">
                        Read Issue
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Featured Article 1 - Medium tile */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={articles[0].img} alt={articles[0].title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-semibold text-white line-clamp-2">{articles[0].title}</Text>
                  <div className="mt-2">
                    <Link href={articles[0].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Featured Article 2 - Medium tile */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={articles[1].img} alt={articles[1].title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-semibold text-white line-clamp-2">{articles[1].title}</Text>
                  <div className="mt-2">
                    <Link href={articles[1].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Issue 21 - Large tile spanning 3 columns */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src="/eclipse-image.png" alt={issues[0].title} width="w-full" ratio={4 / 5} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-bold text-white">Issue {issues[0].number}</Text>
                  <Text className="text-xs text-white/90 line-clamp-2">{issues[0].title}</Text>
                  <div className="mt-2">
                    <Link href={issues[0].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Open Issue →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Featured Article 3 - Medium tile */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={articles[2].img} alt={articles[2].title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-semibold text-white line-clamp-2">{articles[2].title}</Text>
                  <div className="mt-2">
                    <Link href={articles[2].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Issue 20 - Large tile spanning 3 columns */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src="/eclipse-image.png" alt={issues[1].title} width="w-full" ratio={4 / 5} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-bold text-white">Issue {issues[1].number}</Text>
                  <Text className="text-xs text-white/90 line-clamp-2">{issues[1].title}</Text>
                  <div className="mt-2">
                    <Link href={issues[1].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Open Issue →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Featured Article 4 - Medium tile */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={articles[3].img} alt={articles[3].title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-semibold text-white line-clamp-2">{articles[3].title}</Text>
                  <div className="mt-2">
                    <Link href={articles[3].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Issue 19 - Large tile spanning 3 columns */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src="/eclipse-image.png" alt={issues[2].title} width="w-full" ratio={4 / 5} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-bold text-white">Issue {issues[2].number}</Text>
                  <Text className="text-xs text-white/90 line-clamp-2">{issues[2].title}</Text>
                  <div className="mt-2">
                    <Link href={issues[2].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Open Issue →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Featured Article 5 - Medium tile */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={articles[4].img} alt={articles[4].title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-semibold text-white line-clamp-2">{articles[4].title}</Text>
                  <div className="mt-2">
                    <Link href={articles[4].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Issue 18 - Large tile spanning 3 columns */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src="/eclipse-image.png" alt={issues[3].title} width="w-full" ratio={4 / 5} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-bold text-white">Issue {issues[3].number}</Text>
                  <Text className="text-xs text-white/90 line-clamp-2">{issues[3].title}</Text>
                  <div className="mt-2">
                    <Link href={issues[3].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Open Issue →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Featured Article 6 - Medium tile */}
          <GridCol span={3}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full">
                <Image src={articles[5].img} alt={articles[5].title} width="w-full" ratio={16 / 9} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-sm font-semibold text-white line-clamp-2">{articles[5].title}</Text>
                  <div className="mt-2">
                    <Link href={articles[5].href} newWindow={false} className="text-xs text-white/80 hover:text-white">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </GridCol>
        </Grid>

        {/* View All Links */}
        <div className="mt-8 flex justify-center gap-6">
          <Link href="/articles" newWindow={false}>
            <Button size="md" variant="outline" color="black">
              View All Articles
            </Button>
          </Link>
          <Link href="/issues" newWindow={false}>
            <Button size="md" variant="outline" color="black">
              View All Issues
            </Button>
          </Link>
        </div>
      </Box>
    </section>
  );
}
