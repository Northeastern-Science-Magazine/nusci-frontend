"use client";

import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";
import Button from "@/design-system/primitives/Button";
import Box from "@/design-system/primitives/Box";
import Image from "@/design-system/primitives/Image";
import Text from "@/design-system/primitives/Text";
import { useEffect, useState } from "react";
import Badge from "@/design-system/primitives/Badge";

interface HeroProps {
  stats: {
    legacyYears: number;
    publishedIssues: number;
    reachArticles: number;
  };
  content: {
    subtitle: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

function useCountUp(target: number, durationMs: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

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

export default function Hero({ stats, content }: HeroProps) {
  const legacyYears = useCountUp(stats.legacyYears, 1500);
  const publishedIssues = useCountUp(stats.publishedIssues, 2500);
  const reachArticles = useCountUp(stats.reachArticles, 3500);

  return (
    <OverlayMedia className="w-full h-[620px] laptop:h-[700px] overflow-hidden">
      <Image raw src="/moss.png" alt="Moss texture background" width="w-full" />
      <Overlay background="solid-black">
        <Box height="full" width="full">
          <Box className="mx-auto w-full max-w-6xl px-6 py-16 laptop:py-20">
            <Text
              size={12}
              color="white"
              spacing="xl"
              opacity={90}
              className="uppercase"
            >
              {content.subtitle}
            </Text>

            <Box mt={4}>
              <Text
                size={96}
                color="white"
                spacing="sm"
                className="leading-none max-laptop:text-[72px] max-sm:text-[56px]"
              >
                {content.title}
              </Text>
              <Text
                size={30}
                color="white"
                opacity={95}
                className="mt-4 max-w-2xl font-light max-sm:text-[20px]"
              >
                {content.description}
              </Text>
            </Box>

            <Box mt={10} className="flex flex-wrap gap-3">
              <Button className="inline-flex" color="aqua" size="lg">
                {content.primaryButtonText}
              </Button>
              <Button
                className="inline-flex"
                variant="outline"
                color="white"
                size="lg"
              >
                {content.secondaryButtonText}
              </Button>
            </Box>

            {/* Stats Badges */}
            <Box
              mt={10}
              className="grid grid-cols-3 gap-3 max-sm:grid-cols-1 mobile:invisible laptop:visible"
            >
              <Badge rounded="md" color="white" variant="blur" py={4}>
                <Text
                  size={12}
                  color="white"
                  spacing="lg"
                  opacity={80}
                  className="uppercase"
                >
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
              </Badge>
              <Badge rounded="md" color="white" variant="blur" py={4}>
                <Text
                  size={12}
                  color="white"
                  spacing="lg"
                  opacity={80}
                  className="uppercase"
                >
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
              </Badge>
              <Badge rounded="md" color="white" variant="blur" py={4}>
                <Text
                  size={12}
                  color="white"
                  spacing="lg"
                  opacity={80}
                  className="uppercase"
                >
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
              </Badge>
            </Box>
          </Box>
        </Box>
      </Overlay>
    </OverlayMedia>
  );
}
