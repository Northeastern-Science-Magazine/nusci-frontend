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
                    <Link href="/articles" newWindow={false} className="text-sm">More</Link>
                  </div>
                  
                  <div className="space-y-3">
                    {articles.slice(0, 4).map((a) => (
                      <Card key={a.href} className="hover:shadow-md transition-shadow">
                        <div className="flex gap-3">
                          <div className="w-20 flex-shrink-0">
                            <Image src={a.img} alt={a.title} width="w-full" ratio={16/9} />
                          </div>
                          <div className="flex-1">
                            <Text className="text-sm font-semibold">{a.title}</Text>
                            <Text className="text-xs text-zinc-600 mt-1 line-clamp-2">{a.excerpt}</Text>
                            <div className="mt-2">
                              <Link href={a.href} newWindow={false} className="text-xs">Read →</Link>
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
                        <Text className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                          {hero.title}
                        </Text>
                        <div className="mt-6 flex gap-3">
                          <Link href={hero.href} newWindow={false} className="inline-block">
                            <Button size="md" variant="default" color="black">Click to read!</Button>
                          </Link>
                          <Link href="/issues" newWindow={false} className="inline-block">
                            <Button size="md" variant="outline" color="black">Browse issues</Button>
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
                  <Link href="/issues" newWindow={false} className="text-sm">See all</Link>
                </div>
  
                {/* Horizontal scroll strip for issues */}
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-2">
                    {issues.map((iss) => (
                      <Card key={iss.number} className="min-w-[220px] max-w-[220px] hover:shadow-md transition-shadow">
                        <div className="relative">
                          <Image src="/eclipse-image.png" alt={iss.title} width="w-full" ratio={4/5} />
                          <div className="p-3">
                            <Text className="text-sm font-medium">Issue {iss.number}</Text>
                            <Text className="text-sm">{iss.title}</Text>
                            <div className="mt-2">
                              <Link href={iss.href} newWindow={false} className="text-sm">Open issue</Link>
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
      {/* Top area: constrained container with two-column layout */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Grid col span={12} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Lead article (left: 8 cols) */}
          <GridCol className="lg:col-span-8">
            <Card className="bg-zinc-50 border border-zinc-200">
              <div className="overflow-hidden rounded-t-lg">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
              </div>
              <div className="p-6">
                <Text className="text-3xl font-extrabold">{hero.title}</Text>
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
          </GridCol>

          {/* Right rail: Issues (prominent) - 4 cols */}
          <GridCol className="lg:col-span-4">
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
          </GridCol>
        </Grid>
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
      {/* Intro / header constrained */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Text className="text-3xl font-bold">Magazine Mosaic</Text>
          <Text className="text-sm text-zinc-600 mt-1">A magazine-style layout blending feature tiles and issues.</Text>
        </div>
      </Box>

      {/* Mosaic (using grid with varied col spans) */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Grid col span={12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Big feature tile */}
          <GridCol className="lg:col-span-3 sm:col-span-2">
            <Card className="h-full hover:shadow-lg transition-shadow bg-zinc-50">
              <div className="overflow-hidden rounded-t-lg">
                <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
              </div>
              <div className="p-4">
                <Text className="text-xl font-semibold">{hero.title}</Text>
                <div className="mt-3">
                  <Link href={hero.href} newWindow={false} className="text-sm">
                    Read →
                  </Link>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Issue tiles integrated into mosaic - larger presence */}
          {issues.slice(0, 2).map((iss) => (
            <GridCol key={iss.number} className="lg:col-span-1 sm:col-span-1">
              <Card className="h-full hover:shadow-md transition-shadow bg-zinc-50">
                <div className="overflow-hidden rounded-t-lg">
                  <Image src="/eclipse-image.png" alt={iss.title} width="w-full" ratio={4 / 3} />
                </div>
                <div className="p-3">
                  <Text className="text-sm font-medium">Issue {iss.number}</Text>
                  <Text className="text-sm">{iss.title}</Text>
                  <div className="mt-2">
                    <Link href={iss.href} newWindow={false} className="text-xs">
                      Open issue
                    </Link>
                  </div>
                </div>
              </Card>
            </GridCol>
          ))}

          {/* Smaller article tiles */}
          {articles.slice(0, 3).map((a, i) => (
            <GridCol key={a.href + i} className="lg:col-span-1 sm:col-span-1">
              <Card className="h-full hover:shadow-sm transition-shadow bg-zinc-50">
                <div className="overflow-hidden rounded-t-lg">
                  <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                </div>
                <div className="p-3">
                  <Text className="text-sm font-semibold">{a.title}</Text>
                  <Text className="text-xs text-zinc-600 mt-1">{a.excerpt}</Text>
                </div>
              </Card>
            </GridCol>
          ))}

          {/* Another large issue tile */}
          <GridCol className="lg:col-span-2 sm:col-span-2">
            <Card className="h-full hover:shadow-md transition-shadow bg-zinc-50">
              <div className="overflow-hidden rounded-t-lg">
                <Image src="/eclipse-image.png" alt="Big Issue" width="w-full" ratio={3 / 2} />
              </div>
              <div className="p-4">
                <Text className="text-lg font-semibold">Special Issue — Deep Tech</Text>
                <Text className="text-sm text-zinc-600 mt-1">
                  A special collection of longform features and perspectives.
                </Text>
                <div className="mt-3">
                  <Link href="/issue/special" newWindow={false} className="text-sm">
                    Open issue
                  </Link>
                </div>
              </div>
            </Card>
          </GridCol>

          {/* Fill remaining slots with articles to complete mosaic */}
          {articles.slice(3).map((a) => (
            <GridCol key={a.href} className="lg:col-span-1 sm:col-span-1">
              <Card className="h-full hover:shadow-sm transition-shadow bg-zinc-50">
                <div className="overflow-hidden rounded-t-lg">
                  <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                </div>
                <div className="p-3">
                  <Text className="text-sm font-semibold">{a.title}</Text>
                  <div className="mt-2">
                    <Link href={a.href} newWindow={false} className="text-xs">
                      Read →
                    </Link>
                  </div>
                </div>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Box>
    </section>
  );
}
