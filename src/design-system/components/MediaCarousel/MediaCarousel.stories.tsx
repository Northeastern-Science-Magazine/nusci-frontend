import type { Meta, StoryObj } from "@storybook/react";
import MediaCarousel from "./MediaCarousel";

const meta: Meta<typeof MediaCarousel> = {
  title: "Components/Carousel/LayeredCarousel",
  component: MediaCarousel,
  argTypes: {
    visibleCount: {
      control: { type: "number", min: 1, step: 2 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaCarousel>;

const imageUrls = [
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=1200&fit=crop",
];

export const Default: Story = {
  args: {
    media: imageUrls,
    visibleCount: 5,
    width: "w-[360px]",
    height: "h-[560px]",
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
    width: "w-[360px]",
    height: "h-[560px]",
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
    width: "w-[320px]",
    height: "h-[520px]",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};

export const SinglePanel: Story = {
  args: {
    media: imageUrls,
    visibleCount: 1,
    width: "w-[360px]",
    height: "h-[560px]",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <MediaCarousel {...args} />
    </div>
  ),
};
