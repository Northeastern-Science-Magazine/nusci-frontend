"use client";

import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";
import Button from "@/design-system/primitives/Button";
import Text from "@/design-system/primitives/Text";
import Image from "@/design-system/primitives/Image";
import Box from "@/design-system/primitives/Box";

export default function CTA() {
  return (
    <Box py={16} className="bg-white">
      <OverlayMedia className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl">
        <Image
          src="/icy.png"
          alt="A textured green moss background"
          width="w-full"
          ratio={1920 / 700}
        />
        <Overlay background="gradient-black">
          <Box className="flex h-full w-full items-end">
            <Box className="w-full px-6 pb-10 pt-24 laptop:px-10 laptop:pb-12">
              <Text
                size={36}
                color="white"
                className="tracking-tight max-sm:text-[30px]"
              >
                Made by students. Read by everyone.
              </Text>
              <Text
                size={16}
                color="white"
                className="mt-3 max-w-2xl font-light opacity-95"
              >
                Want to write, design, photograph, or build with us? NU Sci is a
                community for curious people.
              </Text>
              <Box className="mt-6 flex flex-wrap gap-3">
                <Button
                  className="inline-flex"
                  color="aqua-light"
                  size="lg"
                  onClick={() => (window.location.href = "/teams/eboard")}
                >
                  Learn about NU Sci
                </Button>
                <Button
                  className="inline-flex"
                  variant="outline"
                  color="white"
                  size="lg"
                  onClick={() =>
                    (window.location.href = `mailto:northeasternsciencemagazine@gmail.com?subject=${encodeURIComponent(
                      "I'm Interested in Joining NU Sci!",
                    )}`)
                  }
                >
                  Join the team
                </Button>
              </Box>
            </Box>
          </Box>
        </Overlay>
      </OverlayMedia>
    </Box>
  );
}
