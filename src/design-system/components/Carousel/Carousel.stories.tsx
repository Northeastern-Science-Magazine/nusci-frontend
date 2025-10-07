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
 * Size Comparison
 * Shows all different sizes side by side
 */
export const SizeComparison: Story = {
  render: () => (
    <Box className="space-y-12 p-8 bg-white">
      <Box>
        <Text className="text-lg font-bold mb-4 text-black">Extra Small (xs) - 160px height</Text>
        <Carousel size="xs" showNavigation={true} loop={true}>
          {[1, 2, 3].map((num) => (
            <CarouselItem key={num} basis="full">
              <Card className="w-full h-full flex items-center justify-center bg-coral border border-border rounded-2xl">
                <Box className="text-center">
                  <Text className="text-lg font-bold text-maroon">XS {num}</Text>
                  <Text className="text-xs text-maroon">Compact</Text>
                </Box>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>

      <Box>
        <Text className="text-lg font-bold mb-4 text-black">Small (sm) - 192px height</Text>
        <Carousel size="sm" showNavigation={true} loop={true}>
          {[1, 2, 3].map((num) => (
            <CarouselItem key={num} basis="full">
              <Card className="w-full h-full flex items-center justify-center bg-marigold border border-border rounded-2xl">
                <Text className="text-xl font-bold text-maroon">SM Slide {num}</Text>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>

      <Box>
        <Text className="text-lg font-bold mb-4 text-black">Medium (md) - 256px height</Text>
        <Carousel size="md" showNavigation={true} loop={true}>
          {[1, 2, 3].map((num) => (
            <CarouselItem key={num} basis="full">
              <Card className="w-full h-full flex items-center justify-center bg-aqua-light border border-border rounded-2xl">
                <Text className="text-xl font-bold text-aqua">MD Slide {num}</Text>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>

      <Box>
        <Text className="text-lg font-bold mb-4 text-black">Large (lg) - 384px height</Text>
        <Carousel size="lg" showNavigation={true} loop={true}>
          {[1, 2, 3].map((num) => (
            <CarouselItem key={num} basis="full">
              <Card className="w-full h-full flex items-center justify-center bg-sage-green border border-border rounded-2xl">
                <Text className="text-xl font-bold text-forest-green">LG Slide {num}</Text>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>

      <Box>
        <Text className="text-lg font-bold mb-4 text-black">Extra Large (xl) - 512px height</Text>
        <Carousel size="xl" showNavigation={true} loop={true}>
          {[1, 2, 3].map((num) => (
            <CarouselItem key={num} basis="full">
              <Card className="w-full h-full flex items-center justify-center bg-pink border border-border rounded-2xl">
                <Text className="text-xl font-bold text-purple">XL Slide {num}</Text>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    </Box>
  ),
};

/**
 * Basic Cards with CarouselItem
 */
export const BasicCards: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <Box className="w-full max-w-4xl mx-auto p-8 bg-white">
      <Text className="text-xl font-bold mb-6 text-black">Basic Card Carousel</Text>
      <Carousel {...args}>
        {[
          { bg: "bg-aqua", text: "text-white" },
          { bg: "bg-sage-green", text: "text-forest-green" },
          { bg: "bg-coral", text: "text-white" },
          { bg: "bg-pink", text: "text-purple" },
          { bg: "bg-marigold", text: "text-maroon" },
        ].map((card, num) => (
          <CarouselItem key={num} basis="full">
            <Card className={`w-full h-full flex items-center justify-center ${card.bg} border border-border rounded-2xl shadow-sm`}>
              <Box className="text-center">
                <Box className={`w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center ${card.text}`}>
                  <Text className="text-2xl font-bold">{num + 1}</Text>
                </Box>
                <Text className={`text-xl font-bold ${card.text}`}>Card {num + 1}</Text>
                <Text className={`text-sm ${card.text}`}>Sample content</Text>
              </Box>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </Box>
  ),
};

/**
 * Image Carousel
 * Images as direct children with object-contain
 */
export const ImageCarousel: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <Box className="w-full max-w-4xl mx-auto p-8 bg-white">
      <Text className="text-xl font-bold mb-6 text-black">Image Carousel</Text>
      <Text className="text-sm text-black mb-4">
        Images as direct children with object-contain
      </Text>
      <Carousel {...args}>
        {[
          { src: "/eclipse-image.png", alt: "Eclipse", fallback: "bg-coral" },
          { src: "/insta.png", alt: "Instagram", fallback: "bg-sage-green" },
          { src: "/linkedin.png", alt: "LinkedIn", fallback: "bg-aqua" },
          { src: "/logo.png", alt: "Logo", fallback: "bg-purple" },
          { src: "/tiktok.png", alt: "TikTok", fallback: "bg-marigold" },
        ].map((image, index) => (
          <CarouselItem key={index} basis="full">
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = `w-full h-full ${image.fallback} rounded-xl flex items-center justify-center text-white text-xl font-bold`;
                fallbackDiv.textContent = image.alt;
                e.currentTarget.replaceWith(fallbackDiv);
              }}
            />
          </CarouselItem>
        ))}
      </Carousel>
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
          { name: "Headphones", price: "$199", rating: 4.8, bg: "bg-neutral" },
          { name: "Smart Watch", price: "$299", rating: 4.6, bg: "bg-aqua-light" },
          { name: "Laptop Stand", price: "$79", rating: 4.9, bg: "bg-gray" },
          { name: "Keyboard", price: "$149", rating: 4.7, bg: "bg-coral" },
          { name: "Mouse Pad", price: "$29", rating: 4.5, bg: "bg-sage-green" },
          { name: "Webcam", price: "$89", rating: 4.4, bg: "bg-marigold" },
        ].map((product, index) => (
          <CarouselItem key={index} basis="1/3" gap="sm">
            <Card className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
              <Box className={`h-40 ${product.bg} flex items-center justify-center`}>
                <Text className="text-sm text-black">Product Image</Text>
              </Box>
              <Box className="p-4">
                <Text className="text-base font-bold text-black mb-2">{product.name}</Text>
                <Box className="flex items-center justify-between mb-2">
                  <Text className="text-lg font-bold text-aqua">{product.price}</Text>
                  <Box className="flex items-center">
                    <Text className="text-marigold mr-1">★</Text>
                    <Text className="text-sm text-black">{product.rating}</Text>
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
 * Vertical Carousel - Clearly Shows Vertical Scrolling
 * Shows multiple items per page with vertical navigation
 */
export const VerticalCarousel: Story = {
  args: {
    orientation: "vertical",
    size: "xl",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    itemsPerView: 3,
  },
  render: (args) => (
    <Box className="flex justify-center p-8 bg-gray">
      <Box className="space-y-4">
        <Text className="text-xl font-bold text-center text-black">Vertical Scrolling Carousel</Text>
        <Text className="text-sm text-center text-black mb-6">
          Scroll direction is VERTICAL
        </Text>
        <Carousel {...args}>
          {[
            { bg: "bg-aqua-light", text: "text-aqua", icon: "📊", title: "Analytics", subtitle: "Real-time metrics and insights" },
            { bg: "bg-sage-green", text: "text-forest-green", icon: "👥", title: "Users", subtitle: "Admin controls and permissions" },
            { bg: "bg-marigold", text: "text-maroon", icon: "📄", title: "Reports", subtitle: "Custom reports and exports" },
            { bg: "bg-pink", text: "text-purple", icon: "⚙️", title: "Settings", subtitle: "Configuration and preferences" },
            { bg: "bg-coral", text: "text-maroon", icon: "🔔", title: "Notifications", subtitle: "Alerts and updates" },
            { bg: "bg-aqua", text: "text-white", icon: "💬", title: "Messages", subtitle: "Team communication" },
          ].map((feature, index) => (
            <Card key={index} className={`w-full flex items-center ${feature.bg} rounded-2xl shadow-sm border border-border`}>
              <Box className="flex items-center px-6 w-full gap-4 py-3">
                <Box className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center ${feature.text} text-xl flex-shrink-0`}>
                  {feature.icon}
                </Box>
                <Box className="flex-1">
                  <Text className={`text-base font-bold ${feature.text}`}>{feature.title}</Text>
                  <Text className={`text-xs ${feature.text}`}>{feature.subtitle}</Text>
                </Box>
              </Box>
            </Card>
          ))}
        </Carousel>
      </Box>
    </Box>
  ),
};

/**
 * Testimonial Cards - Responsive text that adapts to card size
 * Using XL size with proper card dimensions
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
        Text scales responsively with card size
      </Text>
      <Carousel {...args}>
        {[
          { bg: "bg-aqua-light", text: "text-aqua", person: "Sarah Chen", role: "Lead Designer", quote: "This tool revolutionized our design workflow. The intuitive interface and powerful features have made our team significantly more productive." },
          { bg: "bg-pink", text: "text-purple", person: "Mike Johnson", role: "Senior Developer", quote: "Clean code and excellent documentation made integration seamless. Best developer experience I've had in years." },
          { bg: "bg-coral", text: "text-maroon", person: "Emily Davis", role: "Product Manager", quote: "Our team productivity increased by 40% within the first month. The ROI has been incredible and continues to improve." },
          { bg: "bg-sage-green", text: "text-forest-green", person: "Alex Rivera", role: "UX Researcher", quote: "The user feedback has been overwhelmingly positive. Our customers love the new experience we've been able to create." },
        ].map((testimonial, index) => (
          <CarouselItem key={index} basis="full">
            <Card className={`w-full h-full max-w-md mx-auto flex flex-col justify-between ${testimonial.bg} border border-border rounded-2xl shadow-sm p-4 sm:p-6 md:p-8`}>
              <Box className="flex-1 flex flex-col justify-center min-h-0 overflow-auto">
                <Text className={`text-sm sm:text-base md:text-lg ${testimonial.text} mb-3 sm:mb-4 md:mb-6 italic leading-relaxed`}>
                  "{testimonial.quote}"
                </Text>
              </Box>
              
              <Box className="flex items-center pt-3 sm:pt-4 md:pt-6 border-t border-black/10 flex-shrink-0">
                <Box className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center ${testimonial.text} mr-3 md:mr-4 flex-shrink-0`}>
                  <Text className="text-xs sm:text-sm md:text-base font-bold">
                    {testimonial.person.split(' ').map(n => n[0]).join('')}
                  </Text>
                </Box>
                <Box>
                  <Text className={`text-sm sm:text-base font-bold ${testimonial.text}`}>
                    {testimonial.person}
                  </Text>
                  <Text className={`text-xs sm:text-sm ${testimonial.text}`}>
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
          <Card className="w-full h-full flex items-center justify-center bg-purple border border-border rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-2xl font-bold text-white">Full Width</Text>
              <Text className="text-sm text-white mt-2">basis="full"</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="1/2">
          <Card className="w-full h-full flex items-center justify-center bg-aqua border border-border rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-xl font-bold text-white">Half</Text>
              <Text className="text-xs text-white mt-2">basis="1/2"</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="1/2">
          <Card className="w-full h-full flex items-center justify-center bg-sage-green border border-border rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-xl font-bold text-forest-green">Half</Text>
              <Text className="text-xs text-forest-green mt-2">basis="1/2"</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="1/3">
          <Card className="w-full h-full flex items-center justify-center bg-coral border border-border rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-lg font-bold text-maroon">Third</Text>
              <Text className="text-xs text-maroon mt-2">1/3</Text>
            </Box>
          </Card>
        </CarouselItem>
        
        <CarouselItem basis="2/3">
          <Card className="w-full h-full flex items-center justify-center bg-marigold border border-border rounded-2xl p-8">
            <Box className="text-center">
              <Text className="text-xl font-bold text-maroon">Two Thirds</Text>
              <Text className="text-xs text-maroon mt-2">basis="2/3"</Text>
            </Box>
          </Card>
        </CarouselItem>
      </Carousel>
    </Box>
  ),
};