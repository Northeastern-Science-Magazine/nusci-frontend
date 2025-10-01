import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import Icon from "@/design-system/primitives/Icon";
import Button from "@/design-system/primitives/Button";
import {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  carouselVariants,
  carouselContentVariants,
  carouselItemVariants,
  carouselContainerVariants,
  carouselSizeVariants,
  carouselNavigationVariants,
} from "./variants";

/**
 * Carousel Component
    * Horizontal and vertical scroll orientations (independent of child content)
    * Single or multiple items per view
    * Autoplay with pause on hover
    * Navigation arrows
    * Loop functionality
    * Customizable sizing and gaps
    * Takes any children (cards, images, videos, custom components, etc.)
 */
export default function Carousel({
  children,
  className,
  orientation = "horizontal", // Direction of carousel scrolling
  size = "md", // Overall size of the carousel container
  showNavigation = true, // Whether to show prev/next arrows
  autoplay = false, // Auto-advance slides
  autoplayDelay = 3000, // Milliseconds between auto-advances
  loop = true, // Whether to loop back to start after last slide
  itemsPerView = 1, // Number of items visible simultaneously
  gap = "md", // Space between items
  onSlideChange, // Callback when slide changes
  ...props
}: CarouselProps) {
  // Current active slide/page index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Prevents rapid clicking during transitions
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Total number of slides
  const [totalSlides, setTotalSlides] = useState(0);

  // Updates total slides
  useEffect(() => {
    const slides = React.Children.count(children);
    setTotalSlides(slides);
  }, [children]);

  // Calculates total pages based on items per view
  const totalPages = itemsPerView === 1 ? totalSlides : Math.ceil(totalSlides / itemsPerView);

  // Starts autoplay timer -- only runs if autoplay is enabled and there are multiple pages
  const startAutoplay = useCallback(() => {
    if (!autoplay || totalPages <= 1) return;
    
    autoplayRef.current = setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1);
        return nextIndex;
      });
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, loop, totalPages]);

  /// Stops and clears autoplay timer -- prevents memory leakage
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Manages autoplay lifecycle - starts timer and ensures cleanup
  useEffect(() => {
    startAutoplay();
    return stopAutoplay; 
  }, [startAutoplay, stopAutoplay, currentIndex]);

  // Navigates to previous slide/page
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prev) => {
      const newIndex = loop ? (prev - 1 + totalPages) % totalPages : Math.max(prev - 1, 0);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay(); 
  }, [isAnimating, loop, totalPages, stopAutoplay]);

  // Navigates to next slide/page
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prev) => {
      const newIndex = loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay();
  }, [isAnimating, loop, totalPages, stopAutoplay]);

  // Pauses autoplay when user hovers over carousel
  const handleMouseEnter = () => {
    if (autoplay) stopAutoplay();
  };

  // Resumes autoplay when user stops hovering
  const handleMouseLeave = () => {
    if (autoplay) startAutoplay();
  };

  // Calculates CSS transform for slide movement
  const getTransform = () => {
    if (itemsPerView === 1) {
      // Single item: move by 100% per slide
      if (orientation === "vertical") {
        return `translateY(-${currentIndex * 100}%)`;
      }
      return `translateX(-${currentIndex * 100}%)`;
    } else {
      // Multi-item: move by 100% per page (group of items)
      const moveDistance = currentIndex * 100;
      if (orientation === "vertical") {
        return `translateY(-${moveDistance}%)`;
      }
      return `translateX(-${moveDistance}%)`;
    }
  };

  // Determines if navigation buttons should be enabled
  const canGoPrevious = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < totalPages - 1;

  // Renders carousel content based on viewing mode
  const renderContent = () => {
    if (itemsPerView === 1) {
      // Single item mode: wrap each child in a slide container
      return React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="flex-shrink-0 h-full w-full"
        >
          {child}
        </div>
      ));
    } else {
      // Multi-item mode: group children into pages
      const childArray = React.Children.toArray(children);
      const pages = [];
      
      // Create pages by slicing children array
      for (let i = 0; i < childArray.length; i += itemsPerView) {
        const pageItems = childArray.slice(i, i + itemsPerView);
        pages.push(
          <div
            key={i}
            className={clsx(
              "flex-shrink-0 h-full w-full flex items-center justify-center",
              orientation === "vertical" ? "flex-col" : "flex-row",
              gap === "none" ? "" : "gap-4",
              "px-2"
            )}
          >
            {pageItems.map((child, childIndex) => (
              <div
                key={childIndex}
                className="flex-1 h-full flex items-center justify-center"
              >
                {child}
              </div>
            ))}
          </div>
        );
      }
      
      return pages;
    }
  };

  return (
    // Main carousel container with navigation buttons
    <div className={clsx(carouselContainerVariants({ orientation, size }), className)}>
      <div
        ref={containerRef}
        className={clsx(
          carouselVariants({ orientation }),
          carouselSizeVariants({ size, orientation })
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {/* Sliding content container */}
          <div
            className={clsx(
              "flex h-full transition-transform duration-300 ease-in-out",
              orientation === "vertical" ? "flex-col" : "flex-row"
            )}
            style={{ 
              transform: getTransform()
            }}
          >
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Navigation buttons - only show if enabled and there are multiple pages */}
      {showNavigation && totalPages > 1 && (
        <>
          {/* Previous button */}
          <Button
            className={carouselNavigationVariants({ orientation, position: "previous" })}
            onClick={goToPrevious}
            variant="outline"
            color="neutral"
            size="sm"
          >
            <Icon 
              icon={orientation === "vertical" ? "arrowright" : "arrowleft"} 
              size="md" 
            />
          </Button>
          
          {/* Next button */}
          <Button
            className={carouselNavigationVariants({ orientation, position: "next" })}
            onClick={goToNext}
            variant="outline"
            color="neutral"
            size="sm"
          >
            <Icon 
              icon={orientation === "vertical" ? "arrowleft" : "arrowright"} 
              size="md" 
            />
          </Button>
        </>
      )}
    </div>
  );
}

// Carousel Content Component
export function CarouselContent({ 
  children, 
  className, 
  orientation = "horizontal",
  gap = "md",
  ...props 
}: CarouselContentProps) {
  return (
    <div 
      className={clsx(carouselContentVariants({ orientation, gap }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Carousel Item Component

export function CarouselItem({ 
  children, 
  className,
  orientation = "horizontal",
  basis = "full",
  gap = "md",
  ...props 
}: CarouselItemProps) {
  return (
    <div 
      className={clsx(
        carouselItemVariants({ orientation, basis, gap }), 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}