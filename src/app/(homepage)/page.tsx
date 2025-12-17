"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MediaCarousel from "@/design-system/components/MediaCarousel";
import { Overlay, OverlayMedia } from "@/design-system/components/MediaOverlay";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import Image from "@/design-system/primitives/Image";
import Button from "@/design-system/primitives/Button";
import Link from "@/design-system/primitives/Link";

export default function Homepage() {
  const router = useRouter();

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

  const [activeIssueIndex, setActiveIssueIndex] = useState(0);
  const activeIssueNumber = useMemo(() => {
    const url = issueThumbnails[activeIssueIndex] ?? "";
    const m = url.match(/issue(\d+)\.png/i);
    return m?.[1] ?? "Latest";
  }, [activeIssueIndex, issueThumbnails]);

  const scrollToFeatured = () => {
    document.getElementById("featured-issues")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-gradient-to-b from-black via-black to-white">
      {/* HERO */}
      <OverlayMedia className="w-full h-[620px] md:h-[700px] lg:h-[760px] overflow-hidden">
        {/* Fixed-height hero image: height stays consistent regardless of viewport width */}
        <Image raw src="/moss.png" alt="Moss texture background" width="w-full" />
        <Overlay background="gradient-black">
          <Box className="h-full w-full">
            <Box className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
              <Text size={12} color="white" className="uppercase tracking-[0.35em] opacity-90">
                Northeastern University's student-run science magazine
              </Text>

              <Box className="mt-4">
                <Text size={96} color="white" className="leading-none tracking-tight max-md:text-[72px] max-sm:text-[56px]">
                  NU Sci
                </Text>
                <Text size={30} color="white" className="mt-4 max-w-2xl font-light opacity-95 max-sm:text-[20px]">
                  Science communication for the community. Written, designed, photographed, and built by students.
                </Text>
              </Box>

              <Box className="mt-10 flex flex-wrap gap-3">
                <Button className="inline-flex" color="aqua" size="lg" onClick={scrollToFeatured}>
                  Browse articles
                </Button>
                <Button className="inline-flex" variant="outline" color="white" size="lg" onClick={() => router.push("/")}>
                  Print Archive
                </Button>
              </Box>

              <Box className="mt-10 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                <Box className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <Text size={12} color="white" className="uppercase tracking-[0.25em] opacity-80">
                    Legacy
                  </Text>
                  <Text size={24} color="white" className="mt-1 font-semibold">
                    17 Years
                  </Text>
                </Box>
                <Box className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <Text size={12} color="white" className="uppercase tracking-[0.25em] opacity-80">
                    Published
                  </Text>
                  <Text size={24} color="white" className="mt-1 font-semibold">
                    66 Issues
                  </Text>
                </Box>
                <Box className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <Text size={12} color="white" className="uppercase tracking-[0.25em] opacity-80">
                    Reach
                  </Text>
                  <Text size={24} color="white" className="mt-1 font-semibold">
                    1300+ Articles
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Overlay>
      </OverlayMedia>

      {/* FEATURED ISSUES (carousel is first featured item) */}
      <Box id="featured-issues" className="scroll-mt-24 bg-white">
        <Box className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10">
          <Box className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Box>
              <Text size={36} className="tracking-tight">
                Our Magazines
              </Text>
              <Text size={16} className="mt-2 max-w-2xl text-black/70">
                Spin through our print archive—click a cover to bring it front and center.
              </Text>
            </Box>

            <Box className="flex items-center gap-3">
              <Box className="rounded-full bg-black/5 px-4 py-2">
                <Text size={14} className="text-black/70">
                  Currently viewing: <span className="font-semibold text-black">Issue {activeIssueNumber}</span>
                </Text>
              </Box>
              <Link
                href="https://northeasternsciencemagazine.github.io/nusci-issuu/"
                newWindow
                className="rounded-full border border-black/15 px-4 py-2 text-[14px] text-black/80 hover:bg-black/5"
              >
                View the archive
              </Link>
            </Box>
          </Box>

          <MediaCarousel media={issueThumbnails} visibleCount={7} initialIndex={0} onIndexChange={setActiveIssueIndex} />

          <Text size={14} className="mt-2 text-center text-black/60">
            Tip: click side covers to navigate • hover to zoom
          </Text>
        </Box>
      </Box>

      {/* CTA OVERLAY */}
      <Box className="bg-white pb-16">
        <OverlayMedia className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl">
          <Image src="/moss.png" alt="A textured green moss background" width="w-full" ratio={1920 / 700} />
          <Overlay background="gradient-black">
            <Box className="flex h-full w-full items-end">
              <Box className="w-full px-6 pb-10 pt-24 md:px-10 md:pb-12">
                <Text size={36} color="white" className="tracking-tight max-sm:text-[30px]">
                  Made by students. Read by everyone.
                </Text>
                <Text size={16} color="white" className="mt-3 max-w-2xl font-light opacity-95">
                  Want to write, design, photograph, or build with us? NU Sci is a community for curious people.
                </Text>
                <Box className="mt-6 flex flex-wrap gap-3">
                  <Button className="inline-flex" color="marigold" size="lg" onClick={() => router.push("/about-us")}>
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
