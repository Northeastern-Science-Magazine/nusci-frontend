import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./MediaCard";
import React from "react";

const mediaDirections = ["right", "left", "top", "bottom"] as const;
const mediaTypes = ["image", "video"] as const;
const sizes = ["sm", "md", "lg"] as const;
const roundedOptions = ["rounded", "none"] as const;
const shadow = ["shadow", "none"] as const;
const border = ["bordered", "none"] as const;
const opacity = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, "none"] as const;

const meta: Meta<typeof MediaCard> = {
  component: MediaCard,
  title: "Components/MediaCard",
  argTypes: {
    mediaDirection: {
      control: "select",
      options: mediaDirections,
    },
    mediaType: {
      control: "select",
      options: mediaTypes,
    },
    size: {
      control: "select",
      options: sizes,
    },
    shadow: {
      control: "select",
      options: shadow,
    },
    border: {
      control: "select",
      options: border,
    },
    rounded: {
      control: "select",
      options: roundedOptions,
    },
    backgroundOpacity: {
      control: "select",
      options: opacity,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

const sampleDescription =
  "A paragraph is a distinct section of writing, consisting of one or more sentences, that focuses on a single, unified idea or topic.";
const sampleImage = 
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
const sampleVideo =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Basic Examples
export const Default: Story = {
  args: {
    mediaType: "image",
    mediaDirection: "right",
    size: "md",
    title: "Beautiful Landscape",
    subtitle: "Mountain Landscape",
    description: sampleDescription,
    imageProps: {
      src: sampleImage,
      alt: "Mountain landscape",
    },
  },
};

export const Vertical: Story = {
  args: {
    mediaType: "image",
    mediaDirection: "top",
    size: "sm",
    rounded: "rounded",
    border: "bordered",
    title: "Beautiful Landscape",
    subtitle: "Mountain Landscape",
    description: sampleDescription,
    imageProps: {
      src: sampleImage,
      alt: "Mountain landscape",
    },
  },
};

// Rounding Comparison
export const RoundingVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4">
      {roundedOptions.map((r) => (
        <div key={r}>
          <p className="mb-2 font-semibold">{r}</p>
          <MediaCard
            mediaType="image"
            mediaDirection="right"
            size="md"
            rounded={r}
            border="bordered"
            title="Rounding Demo"
            subtitle="Demo"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
      ))}
    </div>
  ),
};

// Direction Comparison
export const DirectionVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4 flex-wrap">
      {mediaDirections.map((direction) => (
        <div key={direction}>
          <p className="mb-2 font-semibold capitalize">{direction}</p>
          <MediaCard
            mediaType="image"
            mediaDirection={direction}
            size="md"
            rounded="rounded"
            border="bordered"
            title="Sample Card"
            subtitle="Layout Demo"
            description={`Media positioned ${direction}`}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
      ))}
    </div>
  ),
};

// Image vs Video Comparison
export const MediaTypeComparison: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Image vs Video</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="mb-2 font-medium">Image - Horizontal</p>
          <MediaCard
            mediaType="image"
            mediaDirection="right"
            size="md"
            title="Image Card"
            subtitle="Size md"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Video - Horizontal</p>
          <MediaCard
            mediaType="video"
            mediaDirection="right"
            size="md"
            title="Video Card"
            subtitle="Size md"
            description={sampleDescription}
            videoProps={{
              src: sampleVideo,
              alt: "Sample video",
              controls: true,
              muted: true,
            }}
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Image - Vertical</p>
          <MediaCard
            mediaType="image"
            mediaDirection="top"
            size="md"
            title="Image Card"
            subtitle="Size md"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Video - Vertical</p>
          <MediaCard
            mediaType="video"
            mediaDirection="top"
            size="md"
            title="Video Card"
            subtitle="Size md"
            description={sampleDescription}
            videoProps={{
              src: sampleVideo,
              alt: "Sample video",
              controls: true,
              muted: true,
            }}
          />
        </div>
      </div>
    </div>
  ),
};

// Image Size Variants - Horizontal
export const ImageSizesHorizontal: Story = {
  render: () => (
    <div className="p-4">
      {sizes.map((size) => (
        <div key={size} className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Size: {size}</h3>
          <div className="flex gap-8 flex-wrap">
            <div>
              <p className="mb-2 font-medium">Media Right</p>
              <MediaCard
                mediaType="image"
                mediaDirection="right"
                size={size}
                rounded="rounded"
                border="bordered"
                title="Media Right"
                subtitle={`Size ${size}`}
                description={sampleDescription}
                imageProps={{
                  src: sampleImage,
                  alt: "Sample image",
                }}
              />
            </div>
            <div>
              <p className="mb-2 font-medium">Media Left</p>
              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size={size}
                rounded="rounded"
                border="bordered"
                title="Media Left"
                subtitle={`Size ${size}`}
                description={sampleDescription}
                imageProps={{
                  src: sampleImage,
                  alt: "Sample image",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Image Size Variants - Vertical
export const ImageSizesVertical: Story = {
  render: () => (
    <div className="p-4">
      {sizes.map((size) => (
        <div key={size} className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Size: {size}</h3>
          <div className="flex gap-8 flex-wrap">
            <div>
              <p className="mb-2 font-medium">Media Top</p>
              <MediaCard
                mediaType="image"
                mediaDirection="top"
                size={size}
                rounded="rounded"
                border="bordered"
                title="Vertical Top"
                subtitle={`Size ${size}`}
                description={sampleDescription}
                imageProps={{
                  src: sampleImage,
                  alt: "Sample image",
                }}
              />
            </div>
            <div>
              <p className="mb-2 font-medium">Media Bottom</p>
              <MediaCard
                mediaType="image"
                mediaDirection="bottom"
                size={size}
                rounded="rounded"
                border="bordered"
                title="Vertical Bottom"
                subtitle={`Size ${size}`}
                description={sampleDescription}
                imageProps={{
                  src: sampleImage,
                  alt: "Sample image",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Shadow Variants
export const ShadowVariants: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Shadow Variants</h2>
      <div className="flex gap-8 flex-wrap">
        {shadow.map((s) => (
          <div key={s}>
            <p className="mb-2 font-semibold">Shadow: {s}</p>
            <MediaCard
              mediaType="image"
              mediaDirection="right"
              size="md"
              shadow={s}
              title="Shadow Demo"
              subtitle="Box Container"
              description={sampleDescription}
              imageProps={{
                src: sampleImage,
                alt: "Sample image",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

// Border Variants
export const BorderVariants: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Border Variants</h2>
      <div className="flex gap-8 flex-wrap">
        {border.map((b) => (
          <div key={b}>
            <p className="mb-2 font-semibold">Border: {b}</p>
            <MediaCard
              mediaType="image"
              mediaDirection="right"
              size="md"
              border={b}
              title="Border Demo"
              subtitle="Box Container"
              description={sampleDescription}
              imageProps={{
                src: sampleImage,
                alt: "Sample image",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

// Shadow + Border Combination
export const ShadowAndBorderCombination: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Shadow + Border Combinations</h2>
      <div className="flex gap-8 flex-wrap">
        <div>
          <p className="mb-2 font-medium">Shadow: shadow, Border: bordered</p>
          <MediaCard
            mediaType="image"
            mediaDirection="right"
            size="md"
            shadow="shadow"
            border="bordered"
            title="Combined Demo"
            subtitle="Shadow + Border"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Shadow: shadow, Border: none</p>
          <MediaCard
            mediaType="image"
            mediaDirection="right"
            size="md"
            shadow="shadow"
            title="Combined Demo"
            subtitle="Shadow Only"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Shadow: none, Border: bordered</p>
          <MediaCard
            mediaType="image"
            mediaDirection="right"
            size="md"
            shadow="none"
            border="bordered"
            title="Combined Demo"
            subtitle="Border Only"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Shadow: none, Border: none</p>
          <MediaCard
            mediaType="image"
            mediaDirection="right"
            size="md"
            shadow="none"
            title="Combined Demo"
            subtitle="Plain"
            description={sampleDescription}
            imageProps={{
              src: sampleImage,
              alt: "Sample image",
            }}
          />
        </div>
      </div>
    </div>
  ),
};

// Opacity Variants
export const OpacityVariants: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Opacity Variants</h2>
      <div className="grid grid-cols-2 gap-8">
        {opacity.map((o) => (
          <div key={o}>
            <p className="mb-2 font-semibold">Opacity: {o}%</p>
            <MediaCard
              mediaType="image"
              mediaDirection="right"
              size="md"
              rounded="rounded"
              color="aqua"
              backgroundOpacity={o}
              title="Opacity Demo"
              subtitle={`${o}% opacity`}
              description={sampleDescription}
              imageProps={{
                src: sampleImage,
                alt: "Sample image",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};