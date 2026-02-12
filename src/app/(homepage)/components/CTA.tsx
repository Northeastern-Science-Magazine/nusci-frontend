"use client";

import { OverlayMedia, Overlay } from "@/design-system/components/MediaOverlay";
import Button from "@/design-system/primitives/Button";
import Text from "@/design-system/primitives/Text";
import Image from "@/design-system/primitives/Image";
import Box from "@/design-system/primitives/Box";

interface CTAProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
}

export default function CTA({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  backgroundImageSrc,
  backgroundImageAlt,
}: CTAProps) {
  return (
    <Box py={16} className="bg-white">
      <OverlayMedia className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl">
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
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
                {title}
              </Text>
              <Text
                size={16}
                color="white"
                className="mt-3 max-w-2xl font-light opacity-95"
              >
                {description}
              </Text>
              <Box className="mt-6 flex flex-wrap gap-3">
                <Button
                  className="inline-flex"
                  color="aqua-light"
                  size="lg"
                  onClick={() => {}}
                >
                  {primaryButtonText}
                </Button>
                <Button
                  className="inline-flex"
                  variant="outline"
                  color="white"
                  size="lg"
                  onClick={() => {}}
                >
                  {secondaryButtonText}
                </Button>
              </Box>
            </Box>
          </Box>
        </Overlay>
      </OverlayMedia>
    </Box>
  );
}
