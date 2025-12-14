import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";
import Card from "@/design-system/primitives/Card";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import Icon from "@/design-system/primitives/Icon";
import React from "react";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "Components/Carousel",
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Scroll direction of the carousel",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    itemsPerView: {
      control: "number",
      description: "Number of items visible at once",
    },
    showNavigation: {
      control: "boolean",
    },
    autoplay: {
      control: "boolean",
    },
    autoplayDelay: {
      control: "number",
    },
    loop: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

/**
 * Interactive itemsPerView Test
 */
export const InteractiveItemsPerView: Story = {
  args: {
    orientation: "horizontal",
    size: "lg",
    showNavigation: true,
    autoplay: false,
    loop: true,
    itemsPerView: 3,
    gap: "md",
  },
  render: function InteractiveItemsPerViewRender(args) {
    const [itemsPerView, setItemsPerView] = React.useState(3);
    
    return (
      <Box className="w-full min-h-screen bg-gray p-8">
        <Box className="max-w-7xl mx-auto">
          {/* Controls */}
          <Box className="mb-8 text-center">
            <Text className="text-3xl font-bold text-black mb-4">
              Interactive Items Per View
            </Text>
            <Text className="text-base text-neutral mb-2">
              Change how many items are visible at once
            </Text>
            <Text className="text-sm text-sage-green mb-6 font-medium">
              ⟳ Circular scrolling enabled for all values
            </Text>
            
            <Box className="flex items-center justify-center gap-2 mb-2">
              <Text className="text-sm font-semibold text-black">Items Per View:</Text>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setItemsPerView(n)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    itemsPerView === n
                      ? "bg-aqua text-white shadow-lg"
                      : "bg-white text-black hover:bg-border"
                  }`}
                >
                  {n}
                </button>
              ))}
            </Box>
            
            <Text className="text-xs text-neutral mt-2">
              Currently showing {itemsPerView} {itemsPerView === 1 ? 'item' : 'items'} at a time
            </Text>
          </Box>

          {/* Carousel */}
          <Carousel
            {...args}
            itemsPerView={itemsPerView}
          >
            {[
              { bg: "bg-coral", title: "Item 1", icon: "star" },
              { bg: "bg-aqua", title: "Item 2", icon: "arrowright" },
              { bg: "bg-purple", title: "Item 3", icon: "bookmark" },
              { bg: "bg-sage-green", title: "Item 4", icon: "star" },
              { bg: "bg-maroon", title: "Item 5", icon: "zoomin" },
              { bg: "bg-pink", title: "Item 6", icon: "image" },
              { bg: "bg-aqua-light", title: "Item 7", icon: "search" },
              { bg: "bg-purple", title: "Item 8", icon: "share" },
              { bg: "bg-sage-green", title: "Item 9", icon: "star" },
              { bg: "bg-marigold", title: "Item 10", icon: "trash" },
            ].map((item, index) => (
              <Card key={index} className={`
                w-full h-full 
                ${item.bg}
                border-0 rounded-2xl shadow-xl
                flex flex-col items-center justify-center
                p-6
              `}>
                <Box className="mb-4">
                  <Icon icon={item.icon as any} size="xl" color="white" />
                </Box>
                <Text className="text-2xl font-bold text-white mb-2">
                  {item.title}
                </Text>
                <Box className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Text className="text-sm font-semibold text-white">
                    {itemsPerView} per view
                  </Text>
                </Box>
              </Card>
            ))}
          </Carousel>
          
          {/* Info */}
          <Box className="mt-8 text-center text-sm text-neutral">
            <Text>Use arrow buttons to navigate • Try different itemsPerView values</Text>
            <Text className="mt-1 text-xs">The carousel seamlessly loops in both directions!</Text>
          </Box>
        </Box>
      </Box>
    );
  },
};

/**
 * Vertical Size Test
 * Interactive test to verify vertical carousel properly resizes cards
 */
export const VerticalSizeTest: Story = {
  args: {
    orientation: "vertical",
    size: "md",
    showNavigation: true,
    autoplay: false,
    loop: true,
    itemsPerView: 1,
  },
  render: function VerticalSizeTestRender(args) {
    const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
    
    return (
      <Box className="w-full min-h-screen bg-gray p-8">
        <Box className="max-w-4xl mx-auto">
          {/* Size Controls */}
          <Box className="mb-8 text-center">
            <Text className="text-3xl font-bold text-black mb-4">
              Vertical Carousel - Size Test
            </Text>
            <Text className="text-base text-neutral mb-6">
              Change the size to see cards resize properly
            </Text>
            
            <Box className="flex items-center justify-center gap-2 mb-2">
              <Text className="text-sm font-semibold text-black">Size:</Text>
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    size === s
                      ? "bg-aqua text-white shadow-lg"
                      : "bg-white text-black hover:bg-border"
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </Box>
            
            <Text className="text-xs text-neutral mt-2">
              Current: {size} • Cards should resize height with each selection
            </Text>
          </Box>

          {/* Vertical Carousel */}
          <Box className="flex justify-center">
            <Carousel
              {...args}
              size={size}
            >
              {[
                { bg: "bg-coral", title: "Card 1", icon: "star" },
                { bg: "bg-aqua", title: "Card 2", icon: "arrowright" },
                { bg: "bg-purple", title: "Card 3", icon: "bookmark" },
                { bg: "bg-sage-green", title: "Card 4", icon: "star" },
                { bg: "bg-maroon", title: "Card 5", icon: "zoomin" },
              ].map((card, index) => (
                <Card key={index} className={`
                  w-full h-full 
                  ${card.bg}
                  border-0 rounded-2xl shadow-2xl
                  flex flex-col items-center justify-center
                  p-8
                `}>
                  {/* Icon */}
                  <Box className="mb-6">
                    <Icon icon={card.icon as any} size="xl" color="white" />
                  </Box>
                  
                  {/* Title */}
                  <Text className="text-4xl font-bold mb-4 text-white">
                    {card.title}
                  </Text>
                  
                  {/* Size Badge */}
                  <Box className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-4">
                    <Text className="text-lg font-semibold text-white">
                      Size: {size.toUpperCase()}
                    </Text>
                  </Box>
                  
                  {/* Description */}
                  <Text className="text-center text-white/90 max-w-md">
                    This card should resize when you change the size above.
                    Try switching between xs, sm, md, lg, and xl.
                  </Text>
                  
                  {/* Card Number */}
                  <Box className="mt-6 w-14 h-14 bg-white/30 rounded-full flex items-center justify-center">
                    <Text className="text-2xl font-bold text-white">{index + 1}</Text>
                  </Box>
                </Card>
              ))}
            </Carousel>
          </Box>
          
          {/* Info */}
          <Box className="mt-8 text-center text-sm text-neutral">
            <Text>Use arrow buttons to navigate • Each card fills the viewport</Text>
            <Text className="mt-2">
              Height sizes: xs=18rem, sm=24rem, md=32rem, lg=40rem, xl=48rem
            </Text>
          </Box>
        </Box>
      </Box>
    );
  },
};