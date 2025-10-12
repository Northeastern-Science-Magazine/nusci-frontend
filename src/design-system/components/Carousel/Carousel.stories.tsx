import type { Meta, StoryObj } from "@storybook/react";
import Carousel, { CarouselItem } from "./Carousel";
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
      description: "Scroll direction of the carousel",
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

/**
 * Basic Cards with CarouselItem
 */
export const BasicCards: Story = {
  args: {
    size: "md",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <Box className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
      <Box className="w-full">
        <Text className="text-2xl font-bold mb-2 text-center text-black">Basic Card Carousel</Text>
        <Text className="text-sm text-center text-gray-600 mb-6">
          {args.orientation === "vertical" ? "↕ Vertical scrolling ↕" : "← Horizontal scrolling →"}
        </Text>
        <Carousel {...args}>
          {[
            { bg: "bg-blue-500", text: "text-white", icon: "🎯" },
            { bg: "bg-green-500", text: "text-white", icon: "🌟" },
            { bg: "bg-purple-500", text: "text-white", icon: "💎" },
            { bg: "bg-orange-500", text: "text-white", icon: "🚀" },
            { bg: "bg-pink-500", text: "text-white", icon: "✨" },
          ].map((card, num) => (
            <CarouselItem key={num} basis="full">
              <Card className={`w-full h-full flex items-center justify-center ${card.bg} border-0 rounded-2xl shadow-lg`}>
                <Box className="text-center p-8">
                  <Text className="text-6xl mb-4">{card.icon}</Text>
                  <Box className={`w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center ${card.text}`}>
                    <Text className="text-2xl font-bold">{num + 1}</Text>
                  </Box>
                  <Text className={`text-2xl font-bold ${card.text} mb-2`}>Card {num + 1}</Text>
                  <Text className={`text-base ${card.text} opacity-90`}>Beautiful card design</Text>
                </Box>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    </Box>
  ),
};

/**
 * Multiple Items Per View
 * Show 3 products at once using basis="1/3"
 */
export const MultipleItems: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <Box className="w-full max-w-7xl mx-auto p-8 bg-white">
      <Text className="text-2xl font-bold mb-6 text-black">Multiple Items (3 visible)</Text>
      <Text className="text-sm text-black mb-4">
        Each CarouselItem has basis="1/3"
      </Text>
      <Carousel {...args}>
        {[
          { name: "Headphones", price: "$199", rating: 4.8, bg: "bg-gray-100" },
          { name: "Smart Watch", price: "$299", rating: 4.6, bg: "bg-blue-50" },
          { name: "Laptop Stand", price: "$79", rating: 4.9, bg: "bg-gray-100" },
          { name: "Keyboard", price: "$149", rating: 4.7, bg: "bg-red-50" },
          { name: "Mouse Pad", price: "$29", rating: 4.5, bg: "bg-green-50" },
          { name: "Webcam", price: "$89", rating: 4.4, bg: "bg-yellow-50" },
        ].map((product, index) => (
          <CarouselItem key={index} basis="1/3" gap="sm">
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
              <Box className={`h-40 ${product.bg} flex items-center justify-center`}>
                <Text className="text-sm text-gray-600">Product Image</Text>
              </Box>
              <Box className="p-4">
                <Text className="text-base font-bold text-black mb-2">{product.name}</Text>
                <Box className="flex items-center justify-between mb-2">
                  <Text className="text-lg font-bold text-blue-600">{product.price}</Text>
                  <Box className="flex items-center">
                    <Text className="text-yellow-500 mr-1">★</Text>
                    <Text className="text-sm text-gray-700">{product.rating}</Text>
                  </Box>
                </Box>
              </Box>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </Box>
  ),
};

/**
 * Mixed Basis Sizes
 * Demonstrates using different basis values for varied layouts
 */
export const MixedSizes: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: false,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <Box className="w-full max-w-6xl mx-auto p-8 bg-white">
      <Text className="text-2xl font-bold mb-6 text-black">Mixed Item Sizes</Text>
      <Text className="text-sm text-black mb-4">
        Different CarouselItem basis values in one carousel
      </Text>
      <Carousel {...args}>
        <CarouselItem basis="full">
          <Card className="w-full h-full flex items-center justify-center bg-purple-500 border border-gray-200 rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-2xl font-bold text-white">Full Width</Text>
              <Text className="text-sm text-white mt-2">basis="full"</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="1/2">
          <Card className="w-full h-full flex items-center justify-center bg-blue-500 border border-gray-200 rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-xl font-bold text-white">Half</Text>
              <Text className="text-xs text-white mt-2">basis="1/2"</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="1/2">
          <Card className="w-full h-full flex items-center justify-center bg-green-500 border border-gray-200 rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-xl font-bold text-white">Half</Text>
              <Text className="text-xs text-white mt-2">basis="1/2"</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="1/3">
          <Card className="w-full h-full flex items-center justify-center bg-orange-500 border border-gray-200 rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-lg font-bold text-white">Third</Text>
              <Text className="text-xs text-white mt-2">1/3</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="2/3">
          <Card className="w-full h-full flex items-center justify-center bg-yellow-500 border border-gray-200 rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-xl font-bold text-white">Two Thirds</Text>
              <Text className="text-xs text-white mt-2">basis="2/3"</Text>
            </Box>
          </Card>
        </CarouselItem>
      </Carousel>
    </Box>
  ),
};

/**
 * Testimonial Cards
 */
export const Testimonials: Story = {
  args: {
    orientation: "horizontal",
    size: "xl",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
  },
  render: (args) => (
    <Box className="w-full max-w-6xl mx-auto p-8 bg-white">
      <Text className="text-xl font-bold mb-2 text-center text-black">Customer Testimonials</Text>
      <Text className="text-sm text-center text-black mb-8">
        Hear what our customers have to say
      </Text>
      <Carousel {...args}>
        {[
          { bg: "bg-blue-50", text: "text-blue-900", person: "Sarah Chen", role: "Lead Designer", quote: "This tool revolutionized our design workflow. The intuitive interface and powerful features have made our team significantly more productive." },
          { bg: "bg-purple-50", text: "text-purple-900", person: "Mike Johnson", role: "Senior Developer", quote: "Clean code and excellent documentation made integration seamless. Best developer experience I've had in years." },
          { bg: "bg-orange-50", text: "text-orange-900", person: "Emily Davis", role: "Product Manager", quote: "Our team productivity increased by 40% within the first month. The ROI has been incredible and continues to improve." },
          { bg: "bg-green-50", text: "text-green-900", person: "Alex Rivera", role: "UX Researcher", quote: "The user feedback has been overwhelmingly positive. Our customers love the new experience we've been able to create." },
        ].map((testimonial, index) => (
          <CarouselItem key={index} basis="full">
            <Card className={`w-full h-full max-w-md mx-auto flex flex-col justify-between ${testimonial.bg} border border-gray-200 rounded-2xl shadow-sm p-8`}>
              <Box className="flex-1 flex flex-col justify-center">
                <Text className={`text-lg ${testimonial.text} mb-6 italic leading-relaxed`}>
                  "{testimonial.quote}"
                </Text>
              </Box>
              
              <Box className="flex items-center pt-6 border-t border-gray-300">
                <Box className={`w-14 h-14 bg-white rounded-full flex items-center justify-center ${testimonial.text} mr-4`}>
                  <Text className="text-base font-bold">
                    {testimonial.person.split(' ').map(n => n[0]).join('')}
                  </Text>
                </Box>
                <Box>
                  <Text className={`text-base font-bold ${testimonial.text}`}>
                    {testimonial.person}
                  </Text>
                  <Text className={`text-sm ${testimonial.text} opacity-75`}>
                    {testimonial.role}
                  </Text>
                </Box>
              </Box>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </Box>
  ),
};

/**
 * Vertical Story Feed
 * Demonstrates vertical scrolling orientation
 */
export const VerticalStoryFeed: Story = {
  args: {
    orientation: "vertical",
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
  },
  render: (args) => (
    <Box className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center">
      <Box className="flex items-center gap-8">
        <Box className="text-center">
          <Text className="text-2xl font-bold mb-2 text-black">Story Feed</Text>
          <Text className="text-sm text-gray-600 mb-4">↕ Vertical scrolling ↕</Text>
          <Text className="text-xs text-gray-500">Swipe up/down to navigate</Text>
        </Box>
        
        <Carousel {...args}>
          {[
            { 
              bg: "bg-gradient-to-br from-pink-400 to-rose-500", 
              icon: "🎨", 
              title: "Design Inspiration",
              subtitle: "Creative Showcase",
              content: "Explore stunning visual designs and creative concepts from around the world."
            },
            { 
              bg: "bg-gradient-to-br from-blue-400 to-cyan-500", 
              icon: "💻", 
              title: "Tech Updates",
              subtitle: "Latest News",
              content: "Stay updated with the newest developments in technology and innovation."
            },
            { 
              bg: "bg-gradient-to-br from-violet-400 to-purple-500", 
              icon: "🚀", 
              title: "Product Launch",
              subtitle: "New Release",
              content: "Discover our latest features and improvements designed for your success."
            },
            { 
              bg: "bg-gradient-to-br from-amber-400 to-orange-500", 
              icon: "⚡", 
              title: "Power Tips",
              subtitle: "Pro Techniques",
              content: "Master advanced workflows and unlock hidden productivity features."
            },
            { 
              bg: "bg-gradient-to-br from-emerald-400 to-green-500", 
              icon: "🌟", 
              title: "Success Stories",
              subtitle: "User Highlights",
              content: "Real stories from our community achieving amazing results every day."
            },
          ].map((story, index) => (
            <CarouselItem key={index} basis="full">
              <Card className={`w-full h-full flex flex-col justify-between ${story.bg} border-0 rounded-3xl shadow-2xl overflow-hidden`}>
                <Box className="p-8 flex-1 flex flex-col justify-between">
                  {/* Header */}
                  <Box className="text-center">
                    <Box className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Text className="text-4xl">{story.icon}</Text>
                    </Box>
                    <Text className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      {story.subtitle}
                    </Text>
                    <Text className="text-3xl font-bold text-white mb-4">
                      {story.title}
                    </Text>
                  </Box>
                  
                  {/* Content */}
                  <Box className="flex-1 flex items-center justify-center px-4">
                    <Text className="text-lg text-white text-center leading-relaxed opacity-95">
                      {story.content}
                    </Text>
                  </Box>
                  
                  {/* Footer */}
                  <Box className="flex items-center justify-between pt-6 border-t border-white/20">
                    <Box className="flex items-center gap-2">
                      <Box className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                        <Text className="text-xs font-bold text-white">{index + 1}</Text>
                      </Box>
                      <Text className="text-sm text-white/80">Story {index + 1} of 5</Text>
                    </Box>
                    <Text className="text-sm text-white/60">Swipe for more</Text>
                  </Box>
                </Box>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    </Box>
  ),
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
  },
  render: function VerticalSizeTestRender(args) {
    const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
    
    return (
      <Box className="w-full min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
        <Box className="max-w-4xl mx-auto">
          {/* Size Controls */}
          <Box className="mb-8 text-center">
            <Text className="text-3xl font-bold text-slate-900 mb-4">
              Vertical Carousel - Size Test
            </Text>
            <Text className="text-base text-slate-600 mb-6">
              Change the size to see cards resize properly
            </Text>
            
            <Box className="flex items-center justify-center gap-2 mb-2">
              <Text className="text-sm font-semibold text-slate-700">Size:</Text>
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    size === s
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </Box>
            
            <Text className="text-xs text-slate-500 mt-2">
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
                { bg: "from-red-400 to-pink-500", title: "Card 1", icon: "🎯" },
                { bg: "from-blue-400 to-cyan-500", title: "Card 2", icon: "🚀" },
                { bg: "from-purple-400 to-violet-500", title: "Card 3", icon: "💎" },
                { bg: "from-green-400 to-emerald-500", title: "Card 4", icon: "🌟" },
                { bg: "from-orange-400 to-amber-500", title: "Card 5", icon: "⚡" },
              ].map((card, index) => (
                <CarouselItem key={index} basis="full">
                  <Card className={`
                    w-full h-full 
                    bg-gradient-to-br ${card.bg}
                    border-0 rounded-2xl shadow-2xl
                    flex flex-col items-center justify-center
                    p-8
                  `}>
                    {/* Icon */}
                    <Text className="text-7xl mb-6">{card.icon}</Text>
                    
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
                </CarouselItem>
              ))}
            </Carousel>
          </Box>
          
          {/* Info */}
          <Box className="mt-8 text-center text-sm text-slate-600">
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