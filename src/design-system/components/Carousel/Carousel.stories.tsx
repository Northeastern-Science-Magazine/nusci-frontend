import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";
import Card from "@/design-system/primitives/Card";
import Box from "@/design-system/primitives/Box";
import Text from "@/design-system/primitives/Text";
import React from "react";

// Storybook Configuration
const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "Components/Carousel",
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Scroll direction of the carousel (independent of content orientation)",
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
    itemsPerView: {
      control: "number",
      description: "Number of items visible simultaneously",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

/**
 * Basic Card Carousel
 * Features:
    * Horizontal scrolling through vertical-oriented cards
    * Large size for prominence
    * Auto-play enabled with 3-second intervals
    * Blue gradient theme
 */
export const BasicCards: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    orientation: "horizontal", // Scroll direction
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Text className="text-xl font-bold mb-6">Basic Card Carousel</Text>
      <Carousel {...args}>
        {[1, 2, 3, 4, 5].map((num) => (
          <Card 
            key={num} 
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm"
          >
            <Box className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Text className="text-2xl font-bold">{num}</Text>
              </div>
              <Text className="text-xl font-bold text-blue-900">Card {num}</Text>
              <Text className="text-sm text-blue-700 mt-2">Sample content</Text>
            </Box>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

/**
 * Image Carousel
 * Features:
    * Images loaded from public folder
    * Responsive image handling
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
      <div className="w-full max-w-4xl mx-auto p-8">
        <Text className="text-xl font-bold mb-6">Image Carousel</Text>
        <Carousel {...args}>
          {[
            { 
              src: "/eclipse-image.png", 
              fallback: "bg-red-400"
            },
            { 
              src: "/insta.png", 
              fallback: "bg-green-400"
            },
            { 
              src: "/linkedin.png", 
              fallback: "bg-blue-400"
            },
            { 
              src: "/logo.png", 
              fallback: "bg-purple-400" 
            },
            { 
              src: "/tiktok.png", 
              fallback: "bg-orange-400"
            },
          ].map((image, index) => (
            <div 
              key={index}
              className="w-full h-full rounded-xl relative overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
            >
              {/* Centered image for logos/icons */}
              <img 
                src={image.src}
                className="max-w-[80%] max-h-[80%] object-contain"
                onError={(e) => {
                  // Fallback to colored background if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add(image.fallback.replace('bg-', 'bg-gradient-to-br from-').replace('-400', '-200 to-' + image.fallback.replace('bg-', '').replace('-400', '-300')));
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    ),
  };

/**
 * Video Player Carousel
 * Features:
    * Mock video players with play buttons
    * Different video content types
    * Interactive elements within carousel items
 */
export const VideoCarousel: Story = {
  args: {
    size: "xl",
    showNavigation: true,
    autoplay: false, // Disabled to not interfere with video playback
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-8">
      <Text className="text-xl font-bold mb-6">Video Player Carousel</Text>
      <Carousel {...args}>
        {[
          { bg: "bg-slate-800", title: "Product Demo", duration: "2:45", type: "Tutorial" },
          { bg: "bg-slate-700", title: "Customer Story", duration: "3:12", type: "Testimonial" },
          { bg: "bg-slate-600", title: "Behind Scenes", duration: "1:58", type: "Documentary" },
          { bg: "bg-slate-500", title: "Feature Overview", duration: "4:33", type: "Explainer" },
        ].map((video, index) => (
          <div 
            key={index}
            className={`w-full h-full ${video.bg} rounded-xl relative overflow-hidden shadow-lg flex items-center justify-center`}
          >
            {/* Mock video player interface */}
            <div className="text-center text-white">
              {/* Play button */}
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40 hover:bg-white/30 transition-colors cursor-pointer">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
              </div>
              {/* Video info */}
              <Text className="text-lg font-bold mb-2">{video.title}</Text>
              <Text className="text-sm opacity-80">{video.type} • {video.duration}</Text>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};

/**
 * Vertical Scroll with Horizontal Cards
 * Feature: 
    * Scroll direction is independent of card content orientation
 */
export const VerticalScrollHorizontalCards: Story = {
  args: {
    orientation: "vertical", // Scroll direction is vertical
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 3500,
    loop: true,
  },
  render: (args) => (
    <div className="flex justify-center p-8">
      <div className="space-y-4">
        <Text className="text-xl font-bold text-center">Vertical Scroll + Horizontal Cards</Text>
        <Text className="text-sm text-center text-gray-600 mb-6">
          Scroll direction (vertical) is independent of card orientation (horizontal)
        </Text>
        <Carousel {...args}>
          {[
            { color: "from-cyan-50 to-cyan-100", border: "border-cyan-200", bg: "bg-cyan-500", text: "text-cyan-900", title: "Dashboard Analytics", subtitle: "Real-time metrics and insights" },
            { color: "from-emerald-50 to-emerald-100", border: "border-emerald-200", bg: "bg-emerald-500", text: "text-emerald-900", title: "User Management", subtitle: "Admin controls and permissions" },
            { color: "from-amber-50 to-amber-100", border: "border-amber-200", bg: "bg-amber-500", text: "text-amber-900", title: "Report Generator", subtitle: "Custom reports and exports" },
            { color: "from-rose-50 to-rose-100", border: "border-rose-200", bg: "bg-rose-500", text: "text-rose-900", title: "Settings Panel", subtitle: "Configuration and preferences" },
          ].map((feature, index) => (
            <Card 
              key={index} 
              className={`w-full h-32 flex items-center bg-gradient-to-r ${feature.color} ${feature.border} rounded-2xl shadow-sm`}
            >
              <div className="flex items-center px-6 w-full">
                {/* Icon/number on the left */}
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center text-white mr-6 flex-shrink-0`}>
                  <Text className="text-lg font-bold">{index + 1}</Text>
                </div>
                {/* Content on the right */}
                <div className="flex-1">
                  <Text className={`text-lg font-bold ${feature.text}`}>{feature.title}</Text>
                  <Text className={`text-sm ${feature.text} opacity-70 mt-1`}>{feature.subtitle}</Text>
                </div>
              </div>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  ),
};

/**
 * Horizontal Scroll with Vertical Cards
 * Feature: 
    * Cards can be portrait while scrolling horizontally
 */
export const HorizontalScrollVerticalCards: Story = {
  args: {
    orientation: "horizontal", // Scroll direction is horizontal
    size: "xl",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
  },
  render: (args) => (
    <div className="w-full max-w-6xl mx-auto p-8">
      <Text className="text-xl font-bold mb-2 text-center">Horizontal Scroll + Vertical Cards</Text>
      <Text className="text-sm text-center text-gray-600 mb-8">
        Horizontal scrolling through portrait-oriented cards
      </Text>
      <Carousel {...args}>
        {[
          { color: "from-indigo-50 to-indigo-100", border: "border-indigo-200", bg: "bg-indigo-500", text: "text-indigo-900", person: "Sarah Chen", role: "Lead Designer", quote: "This tool revolutionized our design workflow." },
          { color: "from-violet-50 to-violet-100", border: "border-violet-200", bg: "bg-violet-500", text: "text-violet-900", person: "Mike Johnson", role: "Senior Developer", quote: "Clean code and excellent documentation made integration seamless." },
          { color: "from-pink-50 to-pink-100", border: "border-pink-200", bg: "bg-pink-500", text: "text-pink-900", person: "Emily Davis", role: "Product Manager", quote: "Our team productivity increased by 40% within the first month." },
          { color: "from-teal-50 to-teal-100", border: "border-teal-200", bg: "bg-teal-500", text: "text-teal-900", person: "Alex Rivera", role: "UX Researcher", quote: "The user feedback has been overwhelmingly positive." },
          { color: "from-orange-50 to-orange-100", border: "border-orange-200", bg: "bg-orange-500", text: "text-orange-900", person: "Jordan Kim", role: "Marketing Director", quote: "Perfect balance of features and simplicity." },
        ].map((testimonial, index) => (
          <Card 
            key={index} 
            className={`h-96 w-80 flex flex-col justify-between bg-gradient-to-b ${testimonial.color} ${testimonial.border} rounded-2xl shadow-sm p-6`}
          >
            {/* Quote content */}
            <div className="flex-1 flex flex-col justify-center">
              <Text className={`text-lg ${testimonial.text} mb-6 italic leading-relaxed`}>
                "{testimonial.quote}"
              </Text>
            </div>
            
            {/* Author info at bottom */}
            <div className="flex items-center pt-4 border-t border-white/20">
              <div className={`w-12 h-12 ${testimonial.bg} rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0`}>
                <Text className="text-base font-bold">{testimonial.person.split(' ').map(n => n[0]).join('')}</Text>
              </div>
              <div>
                <Text className={`text-base font-bold ${testimonial.text}`}>{testimonial.person}</Text>
                <Text className={`text-xs ${testimonial.text} opacity-70`}>{testimonial.role}</Text>
              </div>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

/**
 * Multi-Item Product Showcase
 * Features:
    * 3 items visible simultaneously
    * Product card design
    * Price and rating information
 */
export const ProductShowcase: Story = {
  args: {
    size: "xl",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    orientation: "horizontal",
    itemsPerView: 3,
  },
  render: (args) => (
    <div className="w-full max-w-7xl mx-auto p-8">
      <Text className="text-2xl font-bold mb-6">Featured Products</Text>
      <Carousel {...args}>
        {[
          { name: "Wireless Headphones", price: "$199", rating: 4.8, color: "bg-slate-200", reviews: 1247 },
          { name: "Smart Watch", price: "$299", rating: 4.6, color: "bg-blue-200", reviews: 892 },
          { name: "Laptop Stand", price: "$79", rating: 4.9, color: "bg-gray-200", reviews: 2156 },
          { name: "Keyboard", price: "$149", rating: 4.7, color: "bg-red-200", reviews: 567 },
          { name: "Mouse Pad", price: "$29", rating: 4.5, color: "bg-green-200", reviews: 3421 },
          { name: "Webcam", price: "$89", rating: 4.4, color: "bg-yellow-200", reviews: 789 },
          { name: "Speakers", price: "$129", rating: 4.8, color: "bg-purple-200", reviews: 1098 },
          { name: "Monitor", price: "$399", rating: 4.9, color: "bg-pink-200", reviews: 634 },
        ].map((product, index) => (
          <Card key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow mx-2">
            {/* Product image placeholder */}
            <div className={`h-48 ${product.color} flex items-center justify-center`}>
              <Text className="text-sm text-gray-600">Product Image</Text>
            </div>
            
            {/* Product details */}
            <div className="p-4">
              <Text className="text-base font-bold text-gray-900 mb-2">{product.name}</Text>
              <div className="flex items-center justify-between mb-2">
                <Text className="text-lg font-bold text-blue-600">{product.price}</Text>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <Text className="text-sm text-gray-600">{product.rating} ({product.reviews})</Text>
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                Add to Cart
              </button>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  ),
};

/**
 * Text Content Carousel
 * Features:
    * Blog post previews
    * Rich text content
    * Author information
 */
export const TextContent: Story = {
  args: {
    size: "lg",
    showNavigation: true,
    autoplay: true,
    autoplayDelay: 6000,
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Text className="text-2xl font-bold mb-6">Latest Articles</Text>
      <Carousel {...args}>
        {[
          {
            title: "The Future of Web Development",
            excerpt: "Exploring emerging technologies and frameworks that will shape how we build web applications in the coming years.",
            author: "Alex Thompson",
            date: "March 15, 2024",
            readTime: "5 min read",
            category: "Technology"
          },
          {
            title: "Design Systems at Scale",
            excerpt: "How to build and maintain consistent design systems across large organizations with multiple products and teams.",
            author: "Sarah Chen",
            date: "March 12, 2024",
            readTime: "8 min read",
            category: "Design"
          },
          {
            title: "Performance Optimization Techniques",
            excerpt: "Advanced strategies for optimizing web application performance, from bundle splitting to lazy loading.",
            author: "Mike Rodriguez",
            date: "March 10, 2024",
            readTime: "12 min read",
            category: "Performance"
          },
        ].map((article, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 h-full flex flex-col">
            {/* Category badge */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {article.category}
              </span>
            </div>
            
            {/* Article content */}
            <div className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {article.title}
              </Text>
              <Text className="text-base text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </Text>
            </div>
            
            {/* Article meta */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <Text className="text-sm font-bold text-gray-900">{article.author}</Text>
                  <Text className="text-xs text-gray-500">{article.date}</Text>
                </div>
              </div>
              <Text className="text-xs text-gray-500">{article.readTime}</Text>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};

/**
 * Mixed Content Types
 * Features:
    * Each item is a different type of component
    * Varied layouts and interactions
    * Demonstrates true carousel flexibility
 */
export const MixedContent: Story = {
  args: {
    size: "xl",
    showNavigation: true,
    autoplay: false, // Too much variety for autoplay
    loop: true,
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-8">
      <Text className="text-2xl font-bold mb-6">Mixed Content Carousel</Text>
      <Text className="text-sm text-gray-600 mb-8">Each item is a completely different type of component</Text>
      <Carousel {...args}>
        {/* Item 1: Weather Widget */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Text className="text-xl font-bold">San Francisco</Text>
              <Text className="text-sm opacity-80">Partly Cloudy</Text>
            </div>
            <div className="text-6xl">🌤️</div>
          </div>
          <div className="text-4xl font-bold mb-4">72°F</div>
          <div className="flex justify-between text-sm opacity-80">
            <span>High: 75°</span>
            <span>Low: 65°</span>
          </div>
        </div>

        {/* Item 2: Progress Tracker */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <Text className="text-xl font-bold text-gray-900 mb-6">Project Progress</Text>
          <div className="space-y-4">
            {[
              { task: "Research", progress: 100, color: "bg-green-500" },
              { task: "Design", progress: 80, color: "bg-blue-500" },
              { task: "Development", progress: 45, color: "bg-yellow-500" },
              { task: "Testing", progress: 20, color: "bg-red-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{item.task}</span>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{width: `${item.progress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  ),
};