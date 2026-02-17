import Image from "@/primitives/Image";
import { Overlay, OverlayMedia } from "@/components/MediaOverlay";
import { Box } from "../../../design-system/primitives/Box/Box";
import Text from "@/primitives/Text";
import React from "react";

export function AboutUsHero() {
  return (
    <OverlayMedia className="w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <Image raw src="/succulent.png" alt="Icy pine needles with icicles background" width="w-full" />
      </div>

      <Overlay background="solid-black" className="relative">
        {/* TODO: how to properly make overlay relative? */}
        <Box className="mx-auto max-w-6xl px-6 py-16">
          <Text size={48} style="bold" color="white" className="mb-4">
            About NU Sci
          </Text>
          <Text color="white" className="text-base tablet:text-base laptop:text-lg max-w-3xl leading-relaxed mb-8">
            NU Sci is Northeastern&#39;s student-run, student-written science magazine. We publish with the goal of informing our
            audience of the wonders of human discovery and progress in the world around us. Our magazine seeks to disseminate the
            latest information about science news, whether at the microscopic level or in the deepest reaches of space, in a
            simple and universally accessible format, bringing to our readers clear, high-quality, and well-researched journalism
            with an open mind and a sense of humor. We believe that when removed from a bland textbook format, science can be not
            only a field to discuss, but also something by which to be continually astounded and inspired.
          </Text>
        </Box>
      </Overlay>
    </OverlayMedia>
  );
}
