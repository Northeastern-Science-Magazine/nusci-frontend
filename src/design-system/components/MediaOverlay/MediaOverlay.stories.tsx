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
      <Overlay background="solid-black">
        <div className="flex items-center justify-center h-full text-2xl">Overlay Text</div>
      </Overlay>
    </OverlayMedia>
  ),
};

export const Solid: Story = {
  render: () => {
    const solids = [
      "solid-black",
      "solid-white",
      "solid-red",
      "solid-aqua",
      "solid-aqua-light",
      "solid-forest-green",
      "solid-sage-green",
      "solid-border",
      "solid-neutral",
      "solid-purple",
      "solid-pink",
      "solid-maroon",
      "solid-coral",
      "solid-marigold",
    ] as const;

    return (
      <div className="flex flex-col gap-8">
        {solids.map((solid, index) => (
          <OverlayMedia key={index}>
            <Image
              ratio={1}
              src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"}
              alt="cat"
              width="w-[300px]"
              emphasis="default"
              rounded="default"
            />
            <Overlay background={solid}>
              <div className={`flex flex-col justify-end h-full p-4`}>
                <div className="flex items-center gap-2 text-lg">
                  <Icon icon="share" color="text" />
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

export const Gradient: Story = {
  render: () => {
    const gradients = [
      "gradient-black",
      "gradient-white",
      "gradient-red",
      "gradient-aqua",
      "gradient-aqua-light",
      "gradient-forest-green",
      "gradient-sage-green",
      "gradient-border",
      "gradient-neutral",
      "gradient-purple",
      "gradient-pink",
      "gradient-maroon",
      "gradient-coral",
      "gradient-marigold",
    ] as const;

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
            <Overlay background={gradient}>
              <div className={`flex flex-col justify-end h-full p-4`}>
                <div className="flex items-center gap-2 text-lg">
                  <Icon icon="share" color="text" />
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
          <Overlay background="gradient-black">
            <div className="flex flex-col justify-end h-full p-4 text-white">
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
