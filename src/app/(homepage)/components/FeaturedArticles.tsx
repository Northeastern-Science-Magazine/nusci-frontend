import MediaCard from "@/design-system/components/MediaCard";
import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";
import Button from "@/design-system/primitives/Button";
import Divider from "@/design-system/primitives/Divider";
import { useScroll, useInView, useTransform, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import Image from "@/design-system/primitives/Image";
import Text from "@/design-system/primitives/Text";
import Box from "@/design-system/primitives/Box";
import Link from "@/design-system/primitives/Link";

export default function FeaturedArticles() {
  const dividerRef = useRef<HTMLDivElement>(null);
  const newspaperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: dividerScroll } = useScroll({
    target: dividerRef,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(newspaperRef, { once: true, amount: 0 });

  // Image moves within fixed container
  const imageY = useTransform(dividerScroll, [0, 1], ["-20%", "20%"]);

  return (
    <div className="relative">
      {/* Parallax Divider Background */}
      <div ref={dividerRef} className="relative h-[400px] overflow-hidden laptop:h-[400px]">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <div className="absolute -inset-[20%] bg-[url('/succulent.png')] bg-cover bg-center" />
        </motion.div>
      </div>

      {/* Newspaper Section - Paper overlay */}
      <motion.div
        ref={newspaperRef}
        initial={{ opacity: 0, y: 100, rotateX: 15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 15 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ perspective: "1000px" }}
        className="relative -mt-32 mx-auto w-full max-w-6xl px-6 laptop:px-8"
      >
        {/* Paper container with defined width */}
        <div className="relative bg-white shadow-2xl border border-black/10">
          <Box className="relative px-4 laptop:px-16 py-16">
            <Box className="flex flex-col items-start justify-between gap-4 laptop:flex-row laptop:items-end">
              <Text size={48} className="mt-2 font-serif tracking-tight laptop:text-[56px]">
                Recent Articles
              </Text>

              <Link
                href="/articles"
                className="group inline-flex items-center gap-2 border-b-2 border-black/20 pb-1 text-[14px] font-medium text-black/80 transition-all hover:border-black/40 hover:text-black"
              >
                View all articles
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Box>

            <Divider my={8} />

            {/* Newspaper Layout - Multi-column */}
            <Box className="grid gap-8 laptop:grid-cols-12">
              {/* Main Feature Article - Left Column */}
              <div className="laptop:col-span-8 space-y-8">
                <OverlayMedia className="overflow-hidden border-2 border-black/10 shadow-lg">
                  <Image src="/icy.png" alt="A dramatic solar eclipse" width="w-full" ratio={16 / 10} />
                  <Overlay background="gradient-black">
                    <Box className="flex h-full w-full items-end">
                      <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                        <Text
                          size={48}
                          color="white"
                          className="mt-4 font-serif tracking-tight max-laptop:text-[28px] max-sm:text-[28px]"
                        >
                          Siberian Permafrost
                        </Text>
                        <Text
                          size={18}
                          color="white"
                          className="mt-3 max-w-2xl font-light leading-relaxed opacity-95 max-sm:text-[16px]"
                        >
                          A photo-led story about the science (and spectacle) behind ice—built to read like a print spread.
                        </Text>
                        <Box className="mt-6">
                          <Button className="inline-flex" color="marigold" size="lg">
                            Read article
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Overlay>
                </OverlayMedia>
                <OverlayMedia className="overflow-hidden border-2 border-black/10 shadow-lg">
                  <Image src="/succulent.png" alt="A dramatic solar eclipse" width="w-full" ratio={16 / 10} />
                  <Overlay background="gradient-black">
                    <Box className="flex h-full w-full items-end">
                      <Box className="w-full px-8 pb-8 pt-32 laptop:px-10 laptop:pb-10 laptop:pt-40">
                        <Text
                          size={48}
                          color="white"
                          className="mt-4 font-serif tracking-tight max-laptop:text-[28px] max-sm:text-[28px]"
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
                          <Button className="inline-flex" color="marigold" size="lg">
                            Read article
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Overlay>
                </OverlayMedia>
              </div>

              {/* Sidebar Articles - Right Column */}
              <div className="laptop:col-span-4">
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
              </div>
            </Box>

            {/* Secondary Articles Grid - Newspaper Style */}
            <div className="mt-12 border-t-2 border-black/10 pt-12">
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
            </div>
          </Box>
        </div>
      </motion.div>
    </div>
  );
}
