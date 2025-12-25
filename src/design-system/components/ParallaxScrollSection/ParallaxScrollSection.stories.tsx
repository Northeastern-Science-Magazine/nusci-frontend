import type { Meta, StoryObj } from "@storybook/react";
import { ParallaxScrollSection } from "./ParallaxScrollSection";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import MediaCard from "@/design-system/components/MediaCard";

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

export const Default: Story = {
  args: {
    imageSrc: "/succulent.png",
    imageAlt: "Parallax background image",
    height: "md",
    parallaxIntensity: "medium",
    offset: "md",
    children: (
      <Box className="relative px-4 laptop:px-16 py-16">
        <Text size={48} className="mt-2 tracking-tight laptop:text-[56px] mb-8">
          Sample Content
        </Text>
        <Text size={18} className="mb-6">
          This is a sample content area within the parallax scroll section. The newspaper-style container animates in when it
          comes into view.
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
    ),
  },
};

export const SmallHeight: Story = {
  args: {
    ...Default.args,
    height: "sm",
  },
};

export const LargeHeight: Story = {
  args: {
    ...Default.args,
    height: "lg",
  },
};

export const LightParallax: Story = {
  args: {
    ...Default.args,
    parallaxIntensity: "light",
  },
};

export const StrongParallax: Story = {
  args: {
    ...Default.args,
    parallaxIntensity: "strong",
  },
};

export const CustomMaxWidth: Story = {
  args: {
    ...Default.args,
    maxWidth: "max-w-4xl",
  },
};
