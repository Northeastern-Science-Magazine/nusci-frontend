import type { Meta, StoryObj } from "@storybook/react";
import MediaCarousel from "./MediaCarousel";

const meta: Meta<typeof MediaCarousel> = {
  title: "Components/Carousel/MediaCarousel",
  component: MediaCarousel,
  argTypes: {
    visibleCount: {
      control: { type: "number", min: 1, step: 2 },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaCarousel>;

const imageUrls = [
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue60.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue58.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue56.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue54.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue52.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue50.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue48.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue46.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue44.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue42.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue40.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue38.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue36.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue34.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue32.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue30.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue28.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue26.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue24.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue22.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue20.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue18.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue16.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue14.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue12.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue10.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue8.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue6.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue4.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue2.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue1.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue3.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue5.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue7.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue9.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue11.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue13.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue15.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue17.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue19.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue21.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue23.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue25.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue27.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue29.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue31.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue33.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue35.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue37.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue39.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue41.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue43.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue45.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue47.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue49.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue51.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue53.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue55.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue57.png",
  "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue59.png",
];

export const Small: Story = {
  args: {
    media: imageUrls,
    visibleCount: 5,
    size: "sm",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const Medium: Story = {
  args: {
    media: imageUrls,
    visibleCount: 5,
    size: "md",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: {
    media: imageUrls,
    visibleCount: 5,
    size: "lg",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const Default: Story = {
  args: {
    media: imageUrls,
    visibleCount: 5,
    size: "lg",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const OnePanel: Story = {
  args: {
    media: imageUrls,
    visibleCount: 1,
    size: "lg",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const ThreePanels: Story = {
  args: {
    media: imageUrls,
    visibleCount: 3,
    size: "lg",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const SevenPanels: Story = {
  args: {
    media: imageUrls,
    visibleCount: 7,
    size: "lg",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};
