// app/components/PrintMagazines.tsx (REPLACE entire file)
"use client";

import MediaCarousel from "@/design-system/components/MediaCarousel";
import Box from "@/design-system/primitives/Box";
import Divider from "@/design-system/primitives/Divider";
import Link from "@/design-system/primitives/Link";
import Text from "@/design-system/primitives/Text";
import { breakpoints } from "../../../../tailwind.config";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { useMemo } from "react";

interface Magazine {
  id: string;
  issueNumber: number;
  thumbnailUrl: string;
  title: string;
  date: string;
}

interface PrintMagazinesProps {
  magazines: Magazine[];
  content: {
    title: string;
    description: string;
    archiveButtonText: string;
  };
}

export default function PrintMagazines({
  magazines,
  content,
}: PrintMagazinesProps) {
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
    [],
  );

  return (
    <Box id="featured-issues" className="scroll-mt-24 bg-white">
      <Box className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10">
        <Box className="flex flex-col items-start justify-between gap-6 laptop:flex-row laptop:items-end">
          <Box>
            <Text size={36} className="tracking-tight">
              {content.title}
            </Text>
            <Text size={16} className="mt-2 max-w-2xl text-black/70">
              Look through our print archive - click a cover to bring it front
              and center.
            </Text>
          </Box>

          <Box className="flex items-center gap-3">
            <Link
              href="https://northeasternsciencemagazine.github.io/nusci-issuu/"
              newWindow
              className="rounded-full border border-black/15 px-4 py-2 text-[14px] text-black/80 hover:bg-black/5"
            >
              {content.archiveButtonText}
            </Link>
          </Box>
        </Box>
        <Divider mt={8} />

        <MediaCarousel
          media={issueThumbnails}
          size={width && width > breakpoints.laptop ? "lg" : "md"}
          visibleCount={width && width > breakpoints.laptop ? 7 : 3}
          initialIndex={0}
          centerLink={() => {
            return "https://northeasternsciencemagazine.github.io/nusci-issuu/";
          }}
        />

        <Divider mt={8} />
      </Box>
    </Box>
  );
}
