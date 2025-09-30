import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./MediaCard";
import React from "react";

const mediaDirections = ["default", "left", "top", "bottom"] as const;
const mediaTypes = ["image", "video"] as const;
const sizes = ["sm", "md", "lg"] as const;
const roundedOptions = ["rounded", "none"] as const;

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
    rounded: {
      control: "select",
      options: roundedOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    mediaType: "image",
    mediaDirection: "default",
    size: "md",
    rounded: "none",
    title: "Beautiful Landscape",
    subtitle: "Mountain Landscape",
    description: "A stunning view of mountains and forests",
    imageProps: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
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
    title: "Beautiful Landscape",
    subtitle: "Mountain Landscape",
    description: "A stunning view of mountains and forests",
    imageProps: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Mountain landscape",
    },
  },
};

/** Gallery Story showing all media directions and types */
export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-bold mb-6">Rounding Variants</h2>
        <div className="flex flex-wrap gap-10">
          {roundedOptions.map((r) => (
            <div key={r} className="w-80">
              <h4 className="text-sm font-medium mb-2">{r}</h4>
              <MediaCard
                mediaType="image"
                mediaDirection="default"
                size="md"
                rounded={r}
                title="Rounding Demo"
                subtitle="Demo"
                description="Shows rounded vs none"
                imageProps={{
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                  alt: "Sample image",
                }}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Direction Variants */}
      <section>
        <h2 className="text-xl font-bold mb-6">Layout Directions</h2>
        <div className="flex flex-wrap gap-6">
          {mediaDirections.map((direction) => (
            <div key={direction} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600 capitalize">
                {direction === "default" ? "Horizontal" : direction}
              </h3>
              <MediaCard
                mediaType="image"
                mediaDirection={direction}
                size="md"
                rounded={"rounded"}
                title="Sample Card"
                subtitle="Layout Demo"
                description={`Media positioned ${
                  direction === "default" ? "right" : direction
                }`}
                imageProps={{
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                  alt: "Sample image",
                }}
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-6">MediaCard Size Variants</h2>
        {sizes.map((size) => (
          <div key={size} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">Size: {size}</h3>

            <div className="flex flex-wrap gap-6">
              <MediaCard
                mediaType="image"
                mediaDirection="default"
                size={size}
                rounded={"rounded"}
                title="Media Right"
                subtitle={`Size ${size}`}
                description="Sample description text"
                imageProps={{
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                  alt: "Sample image",
                }}
              />

              <MediaCard
                mediaType="image"
                mediaDirection="left"
                size={size}
                rounded={"rounded"}
                title="Media Left"
                subtitle={`Size ${size}`}
                description="Sample description text"
                imageProps={{
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                  alt: "Sample image",
                }}
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <MediaCard
                mediaType="image"
                mediaDirection="top"
                size={size}
                rounded={"rounded"}
                title="Vertical Top"
                subtitle={`Size ${size}`}
                description="Sample description text"
                imageProps={{
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                  alt: "Sample image",
                }}
              />

              <MediaCard
                mediaType="image"
                mediaDirection="bottom"
                size={size}
                rounded={"rounded"}
                title="Vertical Bottom"
                subtitle={`Size ${size}`}
                description="Sample description text"
                imageProps={{
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                  alt: "Sample image",
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Video Size Variants */}
      <section>
        <h2 className="text-xl font-bold mb-6">Video Size Variants</h2>
        {sizes.map((size) => (
          <div key={size} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">Size: {size}</h3>

            <div className="flex flex-wrap gap-6">
              <MediaCard
                mediaType="video"
                mediaDirection="default"
                size={size}
                rounded={"none"}
                title="Horizontal Video"
                subtitle={`Size ${size}`}
                description="Sample description text"
                videoProps={{
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  alt: "Sample video",
                  controls: true,
                  muted: true,
                }}
              />

              <MediaCard
                mediaType="video"
                mediaDirection="left"
                size={size}
                rounded={"none"}
                title="Media Left Video"
                subtitle={`Size ${size}`}
                description="Sample description text"
                videoProps={{
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  alt: "Sample video",
                  controls: true,
                  muted: true,
                }}
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <MediaCard
                mediaType="video"
                mediaDirection="top"
                size={size}
                rounded={"none"}
                title="Vertical Top Video"
                subtitle={`Size ${size}`}
                description="Sample description text"
                videoProps={{
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  alt: "Sample video",
                  controls: true,
                  muted: true,
                }}
              />

              <MediaCard
                mediaType="video"
                mediaDirection="bottom"
                size={size}
                rounded={"none"}
                title="Vertical Bottom Video"
                subtitle={`Size ${size}`}
                description="Sample description text"
                videoProps={{
                  src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  alt: "Sample video",
                  controls: true,
                  muted: true,
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
};
