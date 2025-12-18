"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MediaCarousel from "@/design-system/components/MediaCarousel";
import MediaCard from "@/design-system/components/MediaCard";
import { Overlay, OverlayMedia } from "@/design-system/components/MediaOverlay";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import Image from "@/design-system/primitives/Image";
import Button from "@/design-system/primitives/Button";
import Link from "@/design-system/primitives/Link";
import Divider from "@/design-system/primitives/Divider";
import useWindowSize from "@/lib/hooks/useWindowSize";

function useCountUp(target: number, durationMs: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion || durationMs <= 0) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const next = Math.round(target * (1 - Math.pow(1 - t, 3)));
      setValue(next);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);

  return value;
}

export default function Homepage() {
  const router = useRouter();
  const { width } = useWindowSize();

  const issueThumbnails = useMemo(
    () => [
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue60.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue58.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue56.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue54.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue52.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue50.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue48.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue46.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue44.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue42.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue40.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue38.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue36.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue34.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue32.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue30.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue28.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue26.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue24.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue22.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue20.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue18.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue16.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue14.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue12.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue10.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue8.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue6.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue4.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue2.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue1.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue3.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue5.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue7.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue9.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue11.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue13.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue15.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue17.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue19.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue21.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue23.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue25.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue27.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue29.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue31.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue33.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue35.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue37.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue39.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue41.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue43.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue45.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue47.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue49.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue51.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue53.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue55.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue57.png",
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue59.png",
    ],
    []
  );

  const scrollToFeatured = () => {
    document.getElementById("featured-issues")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const legacyYears = useCountUp(17, 1000);
  const publishedIssues = useCountUp(66, 2000);
  const reachArticles = useCountUp(1300, 3000);

  return (
    <main>
      {/* HERO */}
      <OverlayMedia className="w-full h-[620px] laptop:h-[700px] overflow-hidden">
        {/* Fixed-height hero image: height stays consistent regardless of viewport width */}
        <Image raw src="/moss.png" alt="Moss texture background" width="w-full" />
        <Overlay background="solid-black">
          <Box className="h-full w-full">
            <Box className="mx-auto w-full max-w-6xl px-6 py-16 laptop:py-20">
              <Text size={12} color="white" className="uppercase tracking-[0.35em] opacity-90">
                Northeastern University&apos;s student-run science magazine
              </Text>

              <Box mt={4}>
                <Text size={96} color="white" className="leading-none tracking-tight max-laptop:text-[72px] max-sm:text-[56px]">
                  NU Sci
                </Text>
                <Text size={30} color="white" className="mt-4 max-w-2xl font-light opacity-95 max-sm:text-[20px]">
                  Science communication for the community. Written, designed, photographed, and developed by students.
                </Text>
              </Box>

              <Box mt={10} className="flex flex-wrap gap-3">
                <Button className="inline-flex" color="aqua" size="lg" onClick={scrollToFeatured}>
                  Browse articles
                </Button>
                <Button className="inline-flex" variant="outline" color="white" size="lg" onClick={() => router.push("/")}>
                  Learn more
                </Button>
              </Box>

              {/* Stats Badges */}
              <Box mt={10} className="grid grid-cols-3 gap-3 max-sm:grid-cols-1 mobile:invisible laptop:visible">
                <Box py={4} className="rounded-2xl bg-white/10 px-5 backdrop-blur">
                  <Text size={12} color="white" className="uppercase tracking-[0.25em] opacity-80">
                    Legacy
                  </Text>
                  <Box className="mt-1 flex items-baseline gap-2">
                    <Text
                      as="span"
                      size={24}
                      color="white"
                      className="inline-block min-w-[2ch] text-right font-semibold tabular-nums"
                    >
                      {legacyYears.toLocaleString()}
                    </Text>
                    <Text as="span" size={24} color="white">
                      Years
                    </Text>
                  </Box>
                </Box>
                <Box className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <Text size={12} color="white" className="uppercase tracking-[0.25em] opacity-80">
                    Published
                  </Text>
                  <Box className="mt-1 flex items-baseline gap-2">
                    <Text
                      as="span"
                      size={24}
                      color="white"
                      className="inline-block min-w-[2ch] text-right font-semibold tabular-nums"
                    >
                      {publishedIssues.toLocaleString()}
                    </Text>
                    <Text as="span" size={24} color="white">
                      Issues
                    </Text>
                  </Box>
                </Box>
                <Box className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <Text size={12} color="white" className="uppercase tracking-[0.25em] opacity-80">
                    Reach
                  </Text>
                  <Box className="mt-1 flex items-baseline gap-2">
                    <Text
                      as="span"
                      size={24}
                      color="white"
                      className="inline-block min-w-[5.5ch] text-right font-semibold tabular-nums"
                    >
                      {reachArticles.toLocaleString()}+
                    </Text>
                    <Text as="span" size={24} color="white">
                      Articles
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Overlay>
      </OverlayMedia>

      {/* FEATURED ISSUES (carousel is first featured item) */}
      <Box id="featured-issues" className="scroll-mt-24 bg-white">
        <Box className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10">
          <Box className="flex flex-col items-start justify-between gap-6 laptop:flex-row laptop:items-end">
            <Box>
              <Text size={36} className="tracking-tight">
                Our Magazines
              </Text>
              <Text size={16} className="mt-2 max-w-2xl text-black/70">
                Look through our print archive - click a cover to bring it front and center.
              </Text>
            </Box>

            <Box className="flex items-center gap-3">
              <Link
                href="https://northeasternsciencemagazine.github.io/nusci-issuu/"
                newWindow
                className="rounded-full border border-black/15 px-4 py-2 text-[14px] text-black/80 hover:bg-black/5"
              >
                View the archive
              </Link>
            </Box>
          </Box>

          <Divider mt={8} />

          <MediaCarousel
            media={issueThumbnails}
            size={width && width > 834 ? "lg" : "md"}
            visibleCount={width && width > 834 ? 7 : 3}
            initialIndex={0}
          />

          {/* <hr className="mb-8" /> */}
        </Box>
      </Box>

      {/* ARTICLE SPREAD MOCKUP */}
      <Box className="bg-aqua-light" py={12}>
        <Box className="mx-auto w-full max-w-6xl px-6 pb-14">
          <Box className="flex flex-col gap-2">
            <Text size={36} className="tracking-tight">
              Recent Articles
            </Text>
            <Text size={16} className="text-black/70">
              A quick mockup of what a featured spread could look like—hero story + supporting cards.
            </Text>
          </Box>

          <Divider mt={8} />

          {/* Structured layout: featured spread + supporting column + a 3-up grid */}
          <Box className="grid gap-6 lg:grid-cols-12" mt={8}>
            <Box className="lg:col-span-8">
              <OverlayMedia className="mt-3 overflow-hidden rounded border border-black/10 shadow-sm">
                <Image src="/eclipse-image.png" alt="A dramatic solar eclipse" width="w-full" ratio={16 / 10} />
                <Overlay background="gradient-black">
                  <Box className="flex h-full w-full items-end">
                    <Box className="w-full px-6 pb-6 pt-28 laptop:px-8 laptop:pb-8">
                      <Box className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                        <Text size={12} color="white" className="uppercase tracking-[0.25em]">
                          Feature
                        </Text>
                      </Box>
                      <Text size={36} color="white" className="mt-3 tracking-tight max-sm:text-[28px]">
                        Chasing Totality
                      </Text>
                      <Text size={16} color="white" className="mt-2 max-w-xl font-light opacity-95">
                        A photo-led story about the science (and spectacle) behind eclipses—built to read like a print spread.
                      </Text>
                      <Box className="mt-5 flex flex-wrap gap-3">
                        <Button className="inline-flex" color="marigold" size="md" onClick={() => router.push("/articles")}>
                          Read article
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Overlay>
              </OverlayMedia>
            </Box>

            <Box className="lg:col-span-4">
              <Box className="mt-3 grid gap-6">
                <MediaCard
                  mediaType="image"
                  imageProps={{ src: "/london.png", alt: "A misty city skyline" }}
                  subtitle="Science + Society"
                  title="Urban Heat Islands, Explained"
                  description="A tight, two-sentence dek that fits alongside a lead spread."
                  mediaDirection="top"
                  size="sm"
                  rounded="rounded"
                  shadow="shadow"
                  color="white"
                  className="w-full max-w-none"
                />

                <MediaCard
                  mediaType="image"
                  imageProps={{ src: "/moss.png", alt: "Green moss texture" }}
                  subtitle="Research Spotlight"
                  title="How Microbiomes Shape Our World"
                  description="A vertical card with room for a pull quote or a quick explainer."
                  mediaDirection="top"
                  size="sm"
                  rounded="rounded"
                  shadow="shadow"
                  color="white"
                  className="w-full max-w-none"
                />
              </Box>
            </Box>
          </Box>

          <Box className="mt-10">
            <Box className="mt-3 grid gap-6 laptop:grid-cols-3">
              <MediaCard
                mediaType="image"
                imageProps={{ src: "/icy.png", alt: "Icy texture" }}
                subtitle="Quick Read"
                title="5 Questions About CRISPR"
                description="Compact, fast-moving, and skimmable."
                mediaDirection="top"
                size="sm"
                rounded="rounded"
                shadow="shadow"
                color="white"
                className="w-full max-w-none"
              />
              <MediaCard
                mediaType="image"
                imageProps={{ src: "/eclipse-image.png", alt: "Solar eclipse" }}
                subtitle="Opinion"
                title="Why Science Needs Better Stories"
                description="A strong voice piece to balance the spread."
                mediaDirection="top"
                size="sm"
                rounded="rounded"
                shadow="shadow"
                color="white"
                className="w-full max-w-none"
              />
              <MediaCard
                mediaType="image"
                imageProps={{ src: "/logo.png", alt: "NU Sci logo mark" }}
                subtitle="Behind the Scenes"
                title="Designing an Issue Cover"
                description="A process piece that's perfect for a sidebar."
                mediaDirection="top"
                size="sm"
                rounded="rounded"
                shadow="shadow"
                color="white"
                className="w-full max-w-none"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* CTA OVERLAY */}
      <Box className="bg-white py-16">
        <OverlayMedia className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl">
          <Image src="/icy.png" alt="A textured green moss background" width="w-full" ratio={1920 / 700} />
          <Overlay background="gradient-black">
            <Box className="flex h-full w-full items-end">
              <Box className="w-full px-6 pb-10 pt-24 laptop:px-10 laptop:pb-12">
                <Text size={36} color="white" className="tracking-tight max-sm:text-[30px]">
                  Made by students. Read by everyone.
                </Text>
                <Text size={16} color="white" className="mt-3 max-w-2xl font-light opacity-95">
                  Want to write, design, photograph, or build with us? NU Sci is a community for curious people.
                </Text>
                <Box className="mt-6 flex flex-wrap gap-3">
                  <Button className="inline-flex" color="aqua-light" size="lg" onClick={() => router.push("/about-us")}>
                    Learn about NU Sci
                  </Button>
                  <Button
                    className="inline-flex"
                    variant="outline"
                    color="white"
                    size="lg"
                    onClick={() => router.push("/teams/web-and-software")}
                  >
                    Join the team
                  </Button>
                </Box>
              </Box>
            </Box>
          </Overlay>
        </OverlayMedia>
      </Box>
    </main>
  );
}
