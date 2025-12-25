import type { Meta, StoryObj } from "@storybook/react";
import { ParallaxScrollSection } from "./ParallaxScrollSection";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import MediaCard from "@/design-system/components/MediaCard";
import React from "react";

const meta: Meta<typeof ParallaxScrollSection> = {
  title: "Components/ParallaxScrollSection",
  component: ParallaxScrollSection,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    height: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    parallaxIntensity: {
      control: "select",
      options: ["light", "medium", "strong"],
    },
    offset: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    imageSrc: {
      control: "text",
    },
    imageAlt: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParallaxScrollSection>;

const heights = ["sm", "md", "lg"] as const;
const parallaxIntensities = ["light", "medium", "strong"] as const;

// Helper component for consistent content
const SampleContent = () => (
  <Box className="relative px-4 laptop:px-16 py-16">
    <Text size={48} className="mt-2 tracking-tight laptop:text-[56px] mb-8">
      Sample Content
    </Text>
    <Text size={18} className="mb-6">
      This is a sample content area within the parallax scroll section. The newspaper-style container animates in when it comes
      into view.
    </Text>
    <Box className="grid gap-6 laptop:grid-cols-3">
      <MediaCard
        mediaType="image"
        imageProps={{ src: "/icy.png", alt: "Sample" }}
        subtitle="Example"
        title="Sample Card 1"
        description="This is a sample media card."
        mediaDirection="top"
        size="sm"
        rounded="none"
        shadow="none"
        color="white"
        className="w-full max-w-none border border-black/10"
      />
      <MediaCard
        mediaType="image"
        imageProps={{ src: "/eclipse-image.png", alt: "Sample" }}
        subtitle="Example"
        title="Sample Card 2"
        description="This is another sample media card."
        mediaDirection="top"
        size="sm"
        rounded="none"
        shadow="none"
        color="white"
        className="w-full max-w-none border border-black/10"
      />
      <MediaCard
        mediaType="image"
        imageProps={{ src: "/logo.png", alt: "Sample" }}
        subtitle="Example"
        title="Sample Card 3"
        description="This is a third sample media card."
        mediaDirection="top"
        size="sm"
        rounded="none"
        shadow="none"
        color="white"
        className="w-full max-w-none border border-black/10"
      />
    </Box>
  </Box>
);

/** Default ParallaxScrollSection with default parameters */
export const Default: Story = {
  args: {
    imageSrc: "/succulent.png",
    imageAlt: "Parallax background image",
    height: "md",
    parallaxIntensity: "medium",
    offset: "md",
    children: <SampleContent />,
  },
};

/** Small height variant */
export const SmallHeight: Story = {
  args: {
    ...Default.args,
    height: "sm",
  },
};

/** Medium height variant */
export const MediumHeight: Story = {
  args: {
    ...Default.args,
    height: "md",
  },
};

/** Large height variant */
export const LargeHeight: Story = {
  args: {
    ...Default.args,
    height: "lg",
  },
};

/** Light parallax intensity */
export const LightParallax: Story = {
  args: {
    ...Default.args,
    parallaxIntensity: "light",
  },
};

/** Medium parallax intensity */
export const MediumParallax: Story = {
  args: {
    ...Default.args,
    parallaxIntensity: "medium",
  },
};

/** Strong parallax intensity */
export const StrongParallax: Story = {
  args: {
    ...Default.args,
    parallaxIntensity: "strong",
  },
};

/** Gallery showing all permutations of height and parallax intensity */
export const Gallery: Story = {
  args: {},
  render: () => {
    return (
      <div className="space-y-32">
        {heights.map((height) => (
          <div key={height}>
            <h2 className="text-2xl font-bold mb-8 px-4">Height: {height}</h2>
            <div className="space-y-32">
              {parallaxIntensities.map((parallaxIntensity) => (
                <div key={`${height}-${parallaxIntensity}`}>
                  <h3 className="text-xl font-semibold mb-4 px-4">Parallax Intensity: {parallaxIntensity}</h3>
                  <ParallaxScrollSection
                    imageSrc="/succulent.png"
                    imageAlt="Parallax background image"
                    height={height}
                    parallaxIntensity={parallaxIntensity}
                    offset="md"
                  >
                    <SampleContent />
                  </ParallaxScrollSection>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
