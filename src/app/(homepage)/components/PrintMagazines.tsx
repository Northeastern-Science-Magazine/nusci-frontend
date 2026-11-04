'use client';

import MediaCarousel from '@/design-system/components/MediaCarousel';
import Box from '@/design-system/primitives/Box';
import Divider from '@/design-system/primitives/Divider';
import Link from '@/design-system/primitives/Link';
import Text from '@/design-system/primitives/Text';
import { breakpoints } from '../../../../tailwind.config';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { MagazineIssue } from '@/lib/api/archive';

interface PrintMagazinesProps {
  magazines: MagazineIssue[];
}

export default function PrintMagazines({ magazines }: PrintMagazinesProps) {
  const { width } = useWindowSize();

  return (
    <Box id="featured-issues" className="scroll-mt-24 bg-white">
      <Box className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10">
        <Box className="flex flex-col items-start justify-between gap-6 laptop:flex-row laptop:items-end">
          <Box>
            <Text size={36} className="tracking-tight">
              Our Magazines
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
              View the archive
            </Link>
          </Box>
        </Box>

        <Divider mt={8} />

        <MediaCarousel
          media={magazines.map((magazine) => magazine.thumbnailUrl)}
          size={width && width > breakpoints.laptop ? 'lg' : 'md'}
          visibleCount={width && width > breakpoints.laptop ? 7 : 3}
          initialIndex={magazines.length - 1}
          centerLink={(index) => magazines[index].href}
        />

        <Divider mt={8} />
      </Box>
    </Box>
  );
}
