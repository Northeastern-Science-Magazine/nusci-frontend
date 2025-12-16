"use client";

import MediaCarousel from "@/design-system/components/MediaCarousel";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";

export default function Homepage() {
  return (
    <>
      <Text size={96}>NU Sci</Text>
      <Box color="sage-green" className="shadow-lg">
        <MediaCarousel
          media={[
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
          ]}
        />
        <Text size={24} className="text-center">
          Click to read our print magazines!
        </Text>
      </Box>
    </>
  );
}
