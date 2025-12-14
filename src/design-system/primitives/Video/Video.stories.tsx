import type { Meta, StoryObj } from "@storybook/react";
import { Video } from "./Video";
import React from "react";

const emphasis = ["default", "emphasis"] as const;
const rounded = ["default", "rounded"] as const;

const meta: Meta<typeof Video> = {
  component: Video,
  title: "Primitives/Video",
  argTypes: {
    emphasis: {
      control: "select",
      options: emphasis,
    },
    rounded: {
      control: "select",
      options: rounded,
    },
    ratio: {
      control: "number",
    },
    controls: {
      control: "boolean",
    },
    autoPlay: {
      control: "boolean",
    },
    muted: {
      control: "boolean",
    },
    loop: {
      control: "boolean",
    },
    preload: {
      control: "select",
      options: ["none", "metadata", "auto"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Video>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    ratio: 16 / 9,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    width: "w-[400px]",
    emphasis: "default",
    rounded: "default",
    controls: true,
    muted: true,
  },
};

export const AspectRatio: Story = {
  args: {
    ratio: 1,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    width: "w-[300px]",
    emphasis: "default",
    rounded: "default",
    controls: true,
    muted: true,
  },
};

export const Rounded: Story = {
  args: {
    ratio: 16 / 9,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    width: "w-[400px]",
    emphasis: "default",
    rounded: "rounded",
    controls: true,
    muted: true,
  },
};

export const WithEmphasis: Story = {
  args: {
    ratio: 16 / 9,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    width: "w-[400px]",
    emphasis: "emphasis",
    rounded: "default",
    controls: true,
    muted: true,
  },
};

export const AutoplayLoop: Story = {
  args: {
    ratio: 16 / 9,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    width: "w-[400px]",
    emphasis: "default",
    rounded: "default",
    controls: false,
    autoPlay: true,
    muted: true, // Required for autoplay in most browsers
    loop: true,
  },
};

export const WithPoster: Story = {
  args: {
    ratio: 16 / 9,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    width: "w-[400px]",
    emphasis: "default",
    rounded: "default",
    controls: true,
    poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
    preload: "metadata",
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="space-y-8">
        <h3 className="text-lg font-bold">Video Variants Gallery</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {rounded.map((roundedVariant) =>
            emphasis.map((emphasisVariant) => (
              <div key={`${roundedVariant}-${emphasisVariant}`} className="flex flex-col gap-2">
                <Video
                  ratio={16 / 9}
                  rounded={roundedVariant}
                  emphasis={emphasisVariant}
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  width="w-[200px]"
                  controls={true}
                  muted={true}
                  preload="metadata"
                />
                <div className="text-sm text-muted-foreground">
                  <p>Rounded: {roundedVariant}</p>
                  <p>Emphasis: {emphasisVariant}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  },
};
