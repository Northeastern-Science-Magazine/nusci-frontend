import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { OverlayMedia, Overlay } from "@/components/MediaOverlay";
import Image from "@/primitives/Image";
import Icon from "@/primitives/Icon";
import Badge from "@/primitives/Badge";
import Box from "@/primitives/Box";
import Text from "@/primitives/Text";

/** Define the control fields for Storybook */
const meta: Meta<typeof OverlayMedia> = {
  component: OverlayMedia,
  title: "Components/MediaOverlay",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OverlayMedia>;

export const Default: Story = {
  render: () => (
    <OverlayMedia>
      <Image
        ratio={1}
        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"}
        alt="cat"
        width="w-[300px]"
        emphasis="default"
        rounded="default"
      />
      <Overlay>
        <div className="flex items-center justify-center h-full text-white text-2xl bg-black/50">Overlay Text</div>
      </Overlay>
    </OverlayMedia>
  ),
};

export const Gradient: Story = {
  render: () => {
    const gradients = [
      "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
      "bg-gradient-to-t from-aqua/80 via-aqua-light/40 to-transparent",
      "bg-gradient-to-t from-forest-green/80 via-sage-green/40 to-transparent",
      "bg-gradient-to-t from-purple/80 via-pink/40 to-transparent",
      "bg-gradient-to-t from-maroon/80 via-coral/40 to-transparent",
      "bg-gradient-to-t from-coral/80 via-marigold/40 to-transparent",
      "bg-gradient-to-t from-neutral/80 via-gray/40 to-transparent",
    ];

    return (
      <div className="flex flex-col gap-8">
        {gradients.map((gradient, index) => (
          <OverlayMedia key={index}>
            <Image
              ratio={1}
              src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"}
              alt="cat"
              width="w-[300px]"
              emphasis="default"
              rounded="default"
            />
            <Overlay>
              <div className={`flex flex-col justify-end h-full p-4 text-white ${gradient}`}>
                <div className="flex items-center gap-2 text-lg">
                  <Icon icon="share" color="white" />
                  <span>Gradient {index + 1}</span>
                </div>
              </div>
            </Overlay>
          </OverlayMedia>
        ))}
      </div>
    );
  },
};

export const Ratios: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {[1, 3 / 2, 16 / 9, 4 / 3, 9 / 16].map((ratio) => (
        <OverlayMedia key={ratio}>
          <Image
            ratio={ratio}
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"}
            alt={`cat ${ratio}`}
            width="w-[300px]"
            emphasis="default"
            rounded="default"
          />
          <Overlay>
            <div className="flex flex-col justify-end h-full p-4 text-white bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center gap-2 text-lg">
                <span className="font-bold">Ratio: {ratio}</span>
              </div>
            </div>
          </Overlay>
        </OverlayMedia>
      ))}
    </div>
  ),
};

export const Gallery: Story = {
  render: () => {
    const overlays = [
      <Box
        key="article-cta"
        className="flex flex-col justify-end h-full p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent group"
      >
        <Text color="white" style="bold" size={16}>
          New Research Breakthrough
        </Text>
        <Box className="flex items-center gap-1">
          <Text color="white" style="bold" size={14}>
            Read Now
          </Text>
          <Icon
            icon="arrowright"
            color="white"
            size="sm"
            className="transform transition-transform duration-200 group-hover:translate-x-2"
          />
        </Box>
      </Box>,
      <Badge key="photographer" color="black" className="absolute bottom-2 right-2 bg-white/70" variant="outline">
        Photographer: Jia^2
      </Badge>,
      <Box
        key="save"
        className="flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent group"
      >
        <Box className="flex items-center gap-2 text-sm">
          <Icon icon="bookmark" color="white" />
          <Text color="white" style="bold" size={20}>
            Save
          </Text>
        </Box>
      </Box>,
      <Badge key="new-issue" color="marigold" className="absolute top-2 left-2">
        NEW ISSUE
      </Badge>,
      <Box key="biology" className="h-full flex items-center justify-center text-center bg-black/70 to-transparent">
        <Text color="white" style="bold" size={24}>
          Biology
        </Text>
      </Box>,
      <Box key="progress-bar" className="absolute top-0 left-0 right-0 h-6 bg-neutral/80">
        <Box className="h-full bg-sage-green text-black text-xs font-bold flex items-center justify-center w-[70%]">70%</Box>
      </Box>,
    ];

    const ratios = [1, 4 / 3, 16 / 9, 9 / 16];

    return (
      <div className="grid grid-cols-3 gap-8">
        {ratios.map((ratio) =>
          overlays.map((overlayContent, index) => (
            <OverlayMedia key={`${ratio}-${index}`}>
              <Image
                ratio={ratio}
                src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"}
                alt={`cat ratio ${ratio}`}
                width="w-[300px]"
                emphasis="default"
                rounded="default"
              />
              <Overlay>{overlayContent}</Overlay>
            </OverlayMedia>
          ))
        )}
      </div>
    );
  },
};
