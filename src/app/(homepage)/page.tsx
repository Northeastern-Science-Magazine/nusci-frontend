"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Overlay, OverlayMedia } from "@/components/MediaOverlay";
import Box from "@/primitives/Box";
import { Grid, GridCol, GridRow } from "@/primitives/Grid";
import Card from "@/primitives/Card";
import Text from "@/primitives/Text";
import Image from "@/primitives/Image";
import Button from "@/primitives/Button";
import Link from "@/primitives/Link";

export default function Homepage() {
  const [layout, setLayout] = useState<"A" | "B" | "C">("A");

  // Mock data (replace with API once ready)
  const hero = {
    title: "The Cosmic Ballet: Decoding the 2026 Total Solar Eclipse",
    subtitle: "Science behind the shadow and stories from the path of totality",
    img: "/eclipse-image.png",
    href: "/articles",
  };

  const issues = [
    { number: 21, title: "Issue 21 — Climate Frontiers", href: "/issue/21" },
    { number: 20, title: "Issue 20 — Quantum & Computation", href: "/issue/20" },
    { number: 19, title: "Issue 19 — Health & Society", href: "/issue/19" },
    { number: 18, title: "Issue 18 — Space & Time", href: "/issue/18" },
  ];

  const articles = [
    { title: "CRISPR’s Next Leap: In Vivo Editing", href: "/articles", img: "/eclipse-image.png" },
    { title: "Ocean Heat Records and Feedback Loops", href: "/articles", img: "/eclipse-image.png" },
    { title: "AI for Protein Folding at Scale", href: "/articles", img: "/eclipse-image.png" },
    { title: "Fusion Update: From Tokamaks to Stellarators", href: "/articles", img: "/eclipse-image.png" },
    { title: "Urban Air Microbiomes", href: "/articles", img: "/eclipse-image.png" },
    { title: "mRNA Vaccines Beyond COVID", href: "/articles", img: "/eclipse-image.png" },
  ];

  const IssueStrip = () => (
    <Box className="w-full">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="flex items-baseline justify-between mb-4">
          <Text className="text-xl font-semibold">Issues</Text>
          <Link href="/articles" newWindow={false} className="text-sm underline">
            View all
          </Link>
        </Box>
        <Grid col span={12} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {issues.map((iss) => (
            <Link key={iss.number} href={iss.href} newWindow={false}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <Box className="mb-2">
                  <Box className="text-xs uppercase tracking-wide text-gray-500">Issue</Box>
                  <Text className="text-2xl font-bold leading-tight">#{iss.number}</Text>
                </Box>
                <Text className="text-sm text-gray-700">{iss.title}</Text>
              </Card>
            </Link>
          ))}
        </Grid>
      </Box>
    </Box>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Box className="flex items-baseline justify-between mb-4">
      <Text className="text-xl font-semibold">{title}</Text>
      <Link href="/articles" newWindow={false} className="text-sm underline">
        More
      </Link>
    </Box>
  );

  const LayoutA = () => (
    <Box>
      {/* Hero */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OverlayMedia className="w-full">
          <Image src={hero.img} alt={hero.title} width="w-full" ratio={16 / 9} />
          <Overlay background="gradient-black">
            <Box className="h-full w-full flex items-end p-6 sm:p-8">
              <Box className="max-w-2xl">
                <Text className="text-3xl sm:text-4xl font-bold mb-2">{hero.title}</Text>
                <Text className="text-base sm:text-lg text-gray-100 mb-4">{hero.subtitle}</Text>
                <Link
                  href={hero.href}
                  newWindow={false}
                  className="inline-block bg-black text-white rounded-full px-4 py-2"
                >
                  Read more
                </Link>
              </Box>
            </Box>
          </Overlay>
        </OverlayMedia>
      </Box>

      {/* Issues prominent strip */}
      <Box className="mt-8">
        <IssueStrip />
      </Box>

      {/* Featured grid */}
      <Box className="mt-10">
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Featured" />
          <Grid col span={12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((a, i) => (
              <Link key={i} href={a.href} newWindow={false}>
                <Card className="hover:shadow-md transition-shadow">
                  <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                  <Box className="mt-3">
                    <Text className="text-lg font-semibold">{a.title}</Text>
                    <Text className="text-sm text-gray-600 mt-1">NU Sci — Science & Society</Text>
                  </Box>
                </Card>
              </Link>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );

  const LayoutB = () => (
    <Box>
      {/* Newspaper-style lead + rail */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GridRow className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GridCol className="lg:col-span-2">
            <OverlayMedia className="w-full">
              <Image src={hero.img} alt={hero.title} width="w-full" ratio={3 / 2} />
              <Overlay background="gradient-black">
                <Box className="h-full w-full flex items-end p-6 sm:p-8">
                  <Box className="max-w-2xl">
                    <Text className="text-3xl sm:text-4xl font-bold mb-2">{hero.title}</Text>
                    <Text className="text-base sm:text-lg text-gray-100 mb-4">{hero.subtitle}</Text>
                    <Link
                      href={hero.href}
                      newWindow={false}
                      className="inline-block bg-black text-white rounded-full px-4 py-2"
                    >
                      Read more
                    </Link>
                  </Box>
                </Box>
              </Overlay>
            </OverlayMedia>

            <Box className="mt-8">
              <SectionHeader title="Top Stories" />
              <Grid col span={12} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.slice(0, 4).map((a, i) => (
                  <Link key={i} href={a.href} newWindow={false}>
                    <Card className="hover:shadow-md transition-shadow">
                      <Image src={a.img} alt={a.title} width="w-full" ratio={16 / 9} />
                      <Box className="mt-3">
                        <Text className="text-lg font-semibold">{a.title}</Text>
                        <Text className="text-sm text-gray-600 mt-1">NU Sci — Research</Text>
                      </Box>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </Box>
          </GridCol>

          <GridCol className="lg:col-span-1">
            <SectionHeader title="Issues" />
            <Grid col span={12} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {issues.map((iss) => (
                <Link key={iss.number} href={iss.href} newWindow={false}>
                  <Card className="hover:shadow-md transition-shadow">
                    <Box className="mb-1">
                      <Box className="text-xs uppercase tracking-wide text-gray-500">Issue</Box>
                      <Text className="text-xl font-bold leading-tight">#{iss.number}</Text>
                    </Box>
                    <Text className="text-sm text-gray-700">{iss.title}</Text>
                  </Card>
                </Link>
              ))}
            </Grid>
          </GridCol>
        </GridRow>
      </Box>

      {/* Additional section */}
      <Box className="mt-10">
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="From the Magazine" />
          <Grid col span={12} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a, i) => (
              <Link key={i} href={a.href} newWindow={false}>
                <Card className="hover:shadow-md transition-shadow">
                  <Image src={a.img} alt={a.title} width="w-full" ratio={4 / 3} />
                  <Box className="mt-3">
                    <Text className="text-lg font-semibold">{a.title}</Text>
                    <Text className="text-sm text-gray-600 mt-1">NU Sci — Features</Text>
                  </Box>
                </Card>
              </Link>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );

  const LayoutC = () => (
    <Box>
      {/* Mosaic / Magazine tiles */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Grid col span={12} className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {/* Tall hero tile */}
          <GridCol className="sm:col-span-2 sm:row-span-2">
            <OverlayMedia className="w-full">
              <Image src={hero.img} alt={hero.title} width="w-full" ratio={3 / 4} />
              <Overlay background="gradient-black">
                <Box className="h-full w-full flex items-end p-6">
                  <Box className="max-w-md">
                    <Text className="text-2xl sm:text-3xl font-bold mb-2">{hero.title}</Text>
                    <Text className="text-sm text-gray-100 mb-3">{hero.subtitle}</Text>
                    <Link
                      href={hero.href}
                      newWindow={false}
                      className="inline-block bg-black text-white rounded-full px-4 py-2"
                    >
                      Read more
                    </Link>
                  </Box>
                </Box>
              </Overlay>
            </OverlayMedia>
          </GridCol>

          {/* Surrounding tiles */}
          {articles.slice(0, 6).map((a, i) => (
            <GridCol key={i} className="sm:col-span-1">
              <Link href={a.href} newWindow={false}>
                <Card className="hover:shadow-md transition-shadow">
                  <Image src={a.img} alt={a.title} width="w-full" ratio={1} />
                  <Box className="mt-3">
                    <Text className="text-base font-semibold">{a.title}</Text>
                    <Text className="text-sm text-gray-600 mt-1">NU Sci — Quick Read</Text>
                  </Box>
                </Card>
              </Link>
            </GridCol>
          ))}
        </Grid>
      </Box>

      {/* Issues row under mosaic */}
      <Box className="mt-10">
        <IssueStrip />
      </Box>
    </Box>
  );

  return (
    <Box>
      <Header forceFullMenu />

      {/* Content spacer for fixed header */}
      <Box className="pt-24" >{null}</Box>

      {/* Layout switcher */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Box className="flex items-center gap-2">
          <Text className="text-sm text-gray-600 mr-2">Layout:</Text>
          <Button
            size="sm"
            variant={layout === "A" ? "default" : "outline"}
            color="black"
            onClick={() => setLayout("A")}
          >
            A
          </Button>
          <Button
            size="sm"
            variant={layout === "B" ? "default" : "outline"}
            color="black"
            onClick={() => setLayout("B")}
          >
            B
          </Button>
          <Button
            size="sm"
            variant={layout === "C" ? "default" : "outline"}
            color="black"
            onClick={() => setLayout("C")}
          >
            C
          </Button>
        </Box>
      </Box>

      {/* Active layout */}
      {layout === "A" && <LayoutA />}
      {layout === "B" && <LayoutB />}
      {layout === "C" && <LayoutC />}

      {/* Footer spacer */}
      <Box className="h-20" >{null}</Box>
    </Box>
  );
}