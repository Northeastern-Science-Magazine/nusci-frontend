import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";
import Card from "@/design-system/primitives/Card";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import React from "react";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "Components/Carousel",
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
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

export const SingleCardWithArrows: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel {...args}>
        {[1, 2, 3, 4, 5].map((num) => (
          <Card key={num} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm">
            <Box className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Text size={24} style="bold">{num}</Text>
              </div>
              <Text size={20} style="bold" className="text-blue-900">Card {num}</Text>
              <Text size={14} className="text-blue-700 mt-2">Sample content</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const SingleCardNoArrows: Story = {
  args: {
    size: "lg",
    showNavigation: false,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel {...args}>
        {[1, 2, 3, 4].map((num) => (
          <Card key={num} className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl shadow-sm">
            <Box className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Text size={24} style="bold">{num}</Text>
              </div>
              <Text size={20} style="bold" className="text-green-900">Card {num}</Text>
              <Text size={14} className="text-green-700 mt-2">Clean view</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const ThreeCardsWithArrows: Story = {
  args: {
    size: "xl",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
    orientation: "horizontal",
    itemsPerView: 3,
  },
  render: (args) => (
    <div className="w-full max-w-6xl mx-auto p-8">
      <Text size={20} style="bold" className="mb-6">Three Cards Showcase</Text>
      <Carousel {...args}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Card key={num} className="flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl shadow-sm">
            <Box className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center text-white">
                <Text size={18} style="bold">{num}</Text>
              </div>
              <Text size={16} style="bold" className="text-purple-900">Item {num}</Text>
              <Text size={12} className="text-purple-700 mt-1">Multi-view</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const ThreeCardsNoArrows: Story = {
  args: {
    size: "xl",
    showNavigation: false,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
    orientation: "horizontal",
    itemsPerView: 3,
  },
  render: (args) => (
    <div className="w-full max-w-6xl mx-auto p-8">
      <Text size={20} style="bold" className="mb-6">Three Cards - Clean View</Text>
      <Carousel {...args}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Card key={num} className="flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl shadow-sm">
            <Box className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <Text size={18} style="bold">{num}</Text>
              </div>
              <Text size={16} style="bold" className="text-orange-900">Item {num}</Text>
              <Text size={12} className="text-orange-700 mt-1">Clean display</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const VerticalSingleWithArrows: Story = {
  args: {
    orientation: "vertical",
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3500,
    loop: true,
  },
  render: (args) => (
    <div className="flex justify-center p-8">
      <Carousel {...args}>
        {[
          { color: "from-violet-50 to-violet-100", border: "border-violet-200", bg: "bg-violet-500", text: "text-violet-900", textLight: "text-violet-700", title: "Step 1", subtitle: "Planning Phase" },
          { color: "from-rose-50 to-rose-100", border: "border-rose-200", bg: "bg-rose-500", text: "text-rose-900", textLight: "text-rose-700", title: "Step 2", subtitle: "Design Phase" },
          { color: "from-amber-50 to-amber-100", border: "border-amber-200", bg: "bg-amber-500", text: "text-amber-900", textLight: "text-amber-700", title: "Step 3", subtitle: "Development" },
          { color: "from-emerald-50 to-emerald-100", border: "border-emerald-200", bg: "bg-emerald-500", text: "text-emerald-900", textLight: "text-emerald-700", title: "Step 4", subtitle: "Launch" },
        ].map((slide, index) => (
          <Card key={index} className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${slide.color} ${slide.border} rounded-2xl shadow-sm`}>
            <Box className="text-center px-8">
              <div className={`w-16 h-16 mx-auto mb-4 ${slide.bg} rounded-full flex items-center justify-center text-white`}>
                <Text size={24} style="bold">{index + 1}</Text>
              </div>
              <Text size={24} style="bold" className={slide.text}>{slide.title}</Text>
              <Text size={18} className={`${slide.textLight} mt-2`}>{slide.subtitle}</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const VerticalSingleNoArrows: Story = {
  args: {
    orientation: "vertical",
    size: "lg",
    showNavigation: false,
    autoplay: true,
    autoplayDelay: 3500,
    loop: true,
  },
  render: (args) => (
    <div className="flex justify-center p-8">
      <Carousel {...args}>
        {[
          { color: "from-sky-50 to-sky-100", border: "border-sky-200", bg: "bg-sky-500", text: "text-sky-900", textLight: "text-sky-700", title: "Feature A", subtitle: "Enhanced Performance" },
          { color: "from-lime-50 to-lime-100", border: "border-lime-200", bg: "bg-lime-500", text: "text-lime-900", textLight: "text-lime-700", title: "Feature B", subtitle: "Better Security" },
          { color: "from-fuchsia-50 to-fuchsia-100", border: "border-fuchsia-200", bg: "bg-fuchsia-500", text: "text-fuchsia-900", textLight: "text-fuchsia-700", title: "Feature C", subtitle: "Improved UX" },
          { color: "from-indigo-50 to-indigo-100", border: "border-indigo-200", bg: "bg-indigo-500", text: "text-indigo-900", textLight: "text-indigo-700", title: "Feature D", subtitle: "Faster Loading" },
        ].map((slide, index) => (
          <Card key={index} className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${slide.color} ${slide.border} rounded-2xl shadow-sm`}>
            <Box className="text-center px-8">
              <div className={`w-16 h-16 mx-auto mb-4 ${slide.bg} rounded-full flex items-center justify-center text-white`}>
                <Text size={24} style="bold">{String.fromCharCode(65 + index)}</Text>
              </div>
              <Text size={24} style="bold" className={slide.text}>{slide.title}</Text>
              <Text size={18} className={`${slide.textLight} mt-2`}>{slide.subtitle}</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

export const MixedLayout: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <Text size={24} style="bold" className="mb-6">Mixed Card Orientations</Text>
        <Text size={16} className="mb-8">One carousel with vertical → horizontal → vertical card orientations</Text>
      </div>
      
      <div className="flex justify-center">
        <Carousel
          size="xl"
          showNavigation={true}
          autoplay={true}
          autoplayDelay={3000}
          loop={true}
          orientation="horizontal"
          itemsPerView={3}
        >
          <Card className="w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm" style={{ aspectRatio: '3/5' }}>
            <Box className="text-center py-8">
              <div className="w-12 h-16 mx-auto mb-4 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                <Text size={18} style="bold">V</Text>
              </div>
              <Text size={16} style="bold" className="text-blue-900">Vertical Card</Text>
              <Text size={12} className="text-blue-700 mt-2">Portrait format</Text>
            </Box>
          </Card>

          <Card className="w-full flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl shadow-sm" style={{ aspectRatio: '5/3' }}>
            <Box className="text-center py-6">
              <div className="w-16 h-12 mx-auto mb-3 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                <Text size={18} style="bold">H</Text>
              </div>
              <Text size={16} style="bold" className="text-green-900">Horizontal Card</Text>
              <Text size={12} className="text-green-700 mt-2">Landscape format</Text>
            </Box>
          </Card>

          <Card className="w-full flex items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 border border-purple-200 rounded-2xl shadow-sm" style={{ aspectRatio: '3/5' }}>
            <Box className="text-center py-8">
              <div className="w-12 h-16 mx-auto mb-4 bg-purple-500 rounded-2xl flex items-center justify-center text-white">
                <Text size={18} style="bold">V</Text>
              </div>
              <Text size={16} style="bold" className="text-purple-900">Vertical Card</Text>
              <Text size={12} className="text-purple-700 mt-2">Portrait format</Text>
            </Box>
          </Card>

          <Card className="w-full flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl shadow-sm" style={{ aspectRatio: '5/3' }}>
            <Box className="text-center py-6">
              <div className="w-16 h-12 mx-auto mb-3 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                <Text size={18} style="bold">H</Text>
              </div>
              <Text size={16} style="bold" className="text-orange-900">Horizontal Card</Text>
              <Text size={12} className="text-orange-700 mt-2">Landscape format</Text>
            </Box>
          </Card>

          <Card className="w-full flex items-center justify-center bg-gradient-to-b from-red-50 to-red-100 border border-red-200 rounded-2xl shadow-sm" style={{ aspectRatio: '3/5' }}>
            <Box className="text-center py-8">
              <div className="w-12 h-16 mx-auto mb-4 bg-red-500 rounded-2xl flex items-center justify-center text-white">
                <Text size={18} style="bold">V</Text>
              </div>
              <Text size={16} style="bold" className="text-red-900">Vertical Card</Text>
              <Text size={12} className="text-red-700 mt-2">Portrait format</Text>
            </Box>
          </Card>

          <Card className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 rounded-2xl shadow-sm" style={{ aspectRatio: '5/3' }}>
            <Box className="text-center py-6">
              <div className="w-16 h-12 mx-auto mb-3 bg-cyan-500 rounded-2xl flex items-center justify-center text-white">
                <Text size={18} style="bold">H</Text>
              </div>
              <Text size={16} style="bold" className="text-cyan-900">Horizontal Card</Text>
              <Text size={12} className="text-cyan-700 mt-2">Landscape format</Text>
            </Box>
          </Card>
        </Carousel>
      </div>
    </div>
  ),
};