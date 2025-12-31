import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";
import Button from "@/design-system/primitives/Button";
import Box from "@/design-system/primitives/Box";
import Image from "@/design-system/primitives/Image";
import Text from "@/design-system/primitives/Text";
import { useEffect, useState } from "react";

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

export default function Hero() {
  const legacyYears = useCountUp(17, 1500);
  const publishedIssues = useCountUp(66, 2500);
  const reachArticles = useCountUp(1300, 3500);

  return (
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
              <Button className="inline-flex" color="aqua" size="lg">
                Browse articles
              </Button>
              <Button className="inline-flex" variant="outline" color="white" size="lg">
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
  );
}
