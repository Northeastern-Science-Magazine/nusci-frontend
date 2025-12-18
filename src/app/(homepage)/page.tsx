"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
import { breakpoints } from "../../../tailwind.config";

// Parallax Divider Component
function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image moves within fixed container - using negative values to move image up as we scroll down
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="relative h-[400px] overflow-hidden laptop:h-[400px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <div className="absolute -inset-[20%] bg-[url('/icy.png')] bg-cover bg-center" />
      </motion.div>
    </div>
  );
}

// Newspaper Articles Section Component
function NewspaperArticlesSection({ router }: { router: ReturnType<typeof useRouter> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 15 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{ perspective: "1000px" }}
      className="relative bg-white py-16 shadow-2xl laptop:py-24"
    >
      {/* Newspaper texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTAgNTBIMTAwTTUwIDBWMTAwIiBzdHJva2U9IiNmNWY1ZjUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-30" />

      <Box className="relative mx-auto w-full max-w-7xl px-6">
        {/* Newspaper Header - Overlaps with divider */}
        <Box className="mb-12 border-b-2 border-black pb-6">
          <Box className="flex flex-col items-start justify-between gap-4 laptop:flex-row laptop:items-end">
            <Box>
              <Text size={14} className="uppercase tracking-[0.3em] text-black/60">
                Featured Stories
              </Text>
              <Text size={48} className="mt-2 font-serif tracking-tight laptop:text-[56px]">
                Recent Articles
              </Text>
            </Box>
            <Link
              href="/articles"
              className="group inline-flex items-center gap-2 border-b-2 border-black/20 pb-1 text-[14px] font-medium text-black/80 transition-all hover:border-black/40 hover:text-black"
            >
              View all articles
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Box>
        </Box>

        {/* Newspaper Layout - Multi-column */}
        <Box className="grid gap-8 laptop:grid-cols-12">
          {/* Main Feature Article - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="laptop:col-span-8"
          >
            <OverlayMedia className="overflow-hidden border-2 border-black/10 shadow-lg">
              <Image src="/eclipse-image.png" alt="A dramatic solar eclipse" width="w-full" ratio={16 / 10} />
              <Overlay background="gradient-black">
                <Box className="flex h-full w-full items-end">
                  <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                    <Box className="mb-3 inline-flex items-center border border-white/30 bg-white/10 px-3 py-1 backdrop-blur">
                      <Text size={12} color="white" className="uppercase tracking-[0.3em]">
                        Cover Story
                      </Text>
                    </Box>
                    <Text
                      size={48}
                      color="white"
                      className="mt-4 font-serif tracking-tight max-laptop:text-[36px] max-sm:text-[28px]"
                    >
                      Chasing Totality
                    </Text>
                    <Text
                      size={18}
                      color="white"
                      className="mt-3 max-w-2xl font-light leading-relaxed opacity-95 max-sm:text-[16px]"
                    >
                      A photo-led story about the science (and spectacle) behind eclipses—built to read like a print spread.
                    </Text>
                    <Box className="mt-6">
                      <Button className="inline-flex" color="marigold" size="lg" onClick={() => router.push("/articles")}>
                        Read article
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Overlay>
            </OverlayMedia>
          </motion.div>

          {/* Sidebar Articles - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="laptop:col-span-4"
          >
            <Box className="space-y-6 border-l-2 border-black/10 pl-6 laptop:pl-8">
              <MediaCard
                mediaType="image"
                imageProps={{ src: "/london.png", alt: "A misty city skyline" }}
                subtitle="Science + Society"
                title="Urban Heat Islands, Explained"
                description="How cities trap heat and what we can do about it—a deep dive into urban climate science."
                mediaDirection="top"
                size="sm"
                rounded="none"
                shadow="none"
                color="white"
                className="w-full max-w-none border-b border-black/10 pb-6"
              />

              <MediaCard
                mediaType="image"
                imageProps={{ src: "/moss.png", alt: "Green moss texture" }}
                subtitle="Research Spotlight"
                title="How Microbiomes Shape Our World"
                description="Exploring the invisible ecosystems that influence everything from our health to our environment."
                mediaDirection="top"
                size="sm"
                rounded="none"
                shadow="none"
                color="white"
                className="w-full max-w-none border-b border-black/10 pb-6"
              />
            </Box>
          </motion.div>
        </Box>

        {/* Secondary Articles Grid - Newspaper Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 border-t-2 border-black/10 pt-12"
        >
          <Box className="grid gap-6 laptop:grid-cols-3">
            <MediaCard
              mediaType="image"
              imageProps={{ src: "/icy.png", alt: "Icy texture" }}
              subtitle="Quick Read"
              title="5 Questions About CRISPR"
              description="A concise guide to understanding gene editing technology."
              mediaDirection="top"
              size="sm"
              rounded="none"
              shadow="none"
              color="white"
              className="w-full max-w-none border border-black/10"
            />
            <MediaCard
              mediaType="image"
              imageProps={{ src: "/eclipse-image.png", alt: "Solar eclipse" }}
              subtitle="Opinion"
              title="Why Science Needs Better Stories"
              description="How narrative can bridge the gap between research and public understanding."
              mediaDirection="top"
              size="sm"
              rounded="none"
              shadow="none"
              color="white"
              className="w-full max-w-none border border-black/10"
            />
            <MediaCard
              mediaType="image"
              imageProps={{ src: "/logo.png", alt: "NU Sci logo mark" }}
              subtitle="Behind the Scenes"
              title="Designing an Issue Cover"
              description="A look into the creative process behind our magazine design."
              mediaDirection="top"
              size="sm"
              rounded="none"
              shadow="none"
              color="white"
              className="w-full max-w-none border border-black/10"
            />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
}

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
                <Box className="rounded-2xl bg-white/10 backdrop-blur" px={4} py={4}>
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
                <Box className="rounded-2xl bg-white/10 backdrop-blur" px={4} py={4}>
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
                <Box className="rounded-2xl bg-white/10 backdrop-blur" px={4} py={4}>
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

          {/* Technically responsive - renders w/ different props at breakpoint laptop */}
          <MediaCarousel
            media={issueThumbnails}
            size={width && width > breakpoints.laptop ? "lg" : "md"}
            visibleCount={width && width > breakpoints.laptop ? 7 : 3}
            initialIndex={0}
          />

          <Divider mt={8} />
        </Box>
      </Box>

      {/* Parallax Scrolling Divider */}
      <ParallaxDivider />

      {/* ARTICLE SPREAD - Newspaper/Editorial Style */}
      <NewspaperArticlesSection router={router} />

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
