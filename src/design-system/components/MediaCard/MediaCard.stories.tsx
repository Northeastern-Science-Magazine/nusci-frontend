import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./MediaCard";
import React from "react";

const mediaDirections = ["default", "left", "top", "bottom"] as const;
const mediaTypes = ["image", "video"] as const;
const sizes = ["lg", "md", "sm"] as const;

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
      options: ["image", "video"],
    },
    // size: {
    //   control: "select",
    //   options: sizes,
    // },
  },
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    mediaType: "image",
    mediaDirection: "default",
    // size: "lg",
    title: "Beautiful Landscape",
    subtitle: "Mountain Landscape",
    description: "A stunning view of mountains and forests",
    imageProps: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Mountain landscape",
      ratio: 4 / 3,
    },
  },
};

export const Vertical: Story = {
  args: {
    mediaType: "image",
    mediaDirection: "top",
    // size: "md",
    title: "Beautiful Landscape",
    subtitle: "Mountain Landscape",
    description: "A stunning view of mountains and forests",
    imageProps: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      alt: "Mountain landscape",
      ratio: 4 / 3,
    },
  },
};

/** Gallery Story showing all media directions and types */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        {/* {sizes.map((size) => (
          <div className={size}> */}
            <h2 className="text-xl font-bold">MediaCard Gallery</h2>

            {mediaTypes.map((mediaType) => (
              <div key={mediaType} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mediaDirections.map((direction) => (
                    <div
                      key={`${mediaType}-${direction}`}
                      className="space-y-2"
                    >
                      {mediaType === "image" ? (
                        <MediaCard
                          color="marigold"
                          mediaType="image"
                          mediaDirection={direction}
                          title="Image Card"
                          subtitle={mediaType}
                          description={`Media ${direction}`}
                          imageProps={{
                            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                            alt: `Sample ${direction} image`,
                            ratio: 4 / 3,
                          }}
                        />
                      ) : (
                        <MediaCard
                          color="marigold"
                          mediaType="video"
                          mediaDirection={direction}
                          title="Video Card"
                          subtitle={mediaType}
                          description={`Media ${direction}`}
                          videoProps={{
                            src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                            alt: `Sample ${direction} video`,
                            ratio: 16 / 9,
                            controls: true,
                            muted: true,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        // ))}
      // </div>
    );
  },
};

/** Compact Gallery - All variants in a tighter grid */
export const CompactGallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">All MediaCard Variants</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mediaTypes.map((mediaType) =>
            mediaDirections.map((direction) => (
              <div key={`${mediaType}-${direction}`} className="space-y-2">
                {mediaType === "image" ? (
                  <MediaCard
                    color="neutral"
                    mediaType="image"
                    mediaDirection={direction}
                    title={`image ${direction}`}
                    imageProps={{
                      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                      alt: "Sample image",
                      ratio: 3 / 2,
                    }}
                  />
                ) : (
                  <MediaCard
                    color="neutral"
                    mediaType="video"
                    mediaDirection={direction}
                    title={`video ${direction}`}
                    videoProps={{
                      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                      alt: "Sample video",
                      ratio: 16 / 9,
                      controls: true,
                      muted: true,
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  },
};
