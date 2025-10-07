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
  orientation = "horizontal",
  size = "md",
  showNavigation = true,
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  itemsPerView = 1,
  gap = "md",
  onSlideChange,
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

  // Check if children are CarouselItem components
  const childArray = React.Children.toArray(children);
  const isUsingCarouselItem = childArray.some(
    child => React.isValidElement(child) && child.type === CarouselItem
  );

  // Update total slides
  useEffect(() => {
    const slides = React.Children.count(children);
    setTotalSlides(slides);
  }, [children]);

  // Calculate total pages
  const totalPages = isUsingCarouselItem 
    ? totalSlides
    : (itemsPerView === 1 ? totalSlides : Math.ceil(totalSlides / itemsPerView));

  // Starts autoplay timer -- only runs if autoplay is enabled and there are multiple pages
  const startAutoplay = useCallback(() => {
    if (!autoplay || totalPages <= 1) return;
    
    autoplayRef.current = setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1);
        if (onSlideChange) onSlideChange(nextIndex);
        return nextIndex;
      });
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, loop, totalPages, onSlideChange]);

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
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay(); 
  }, [isAnimating, loop, totalPages, stopAutoplay, onSlideChange]);

  // Navigates to next slide/page
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((prev) => {
      const newIndex = loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1);
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay();
  }, [isAnimating, loop, totalPages, stopAutoplay, onSlideChange]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (autoplay) stopAutoplay();
  };

  // Resumes autoplay when user stops hovering
  const handleMouseLeave = () => {
    if (autoplay) startAutoplay();
  };

  // Calculate transform
  const getTransform = () => {
    const moveDistance = currentIndex * 100;
    if (orientation === "vertical") {
      return `translateY(-${moveDistance}%)`;
    }
    return `translateX(-${moveDistance}%)`;
  };

  // Render content based on usage pattern
  const renderContent = () => {
    if (isUsingCarouselItem) {
      // Using CarouselItem - render directly
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CarouselItem) {
          return React.cloneElement(child as React.ReactElement<CarouselItemProps>, {
            orientation,
          });
        }
        return child;
      });
    }

    // Legacy mode - wrap children
    if (itemsPerView === 1) {
      // Single item mode
      return React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full h-full"
        >
          {child}
        </div>
      ));
    } else {
        // Multi-item mode - group into pages
        const pages = [];
        
        for (let i = 0; i < childArray.length; i += itemsPerView) {
          const pageItems = childArray.slice(i, i + itemsPerView);
          
          pages.push(
            <div
              key={i}
              className={clsx(
                "flex-shrink-0 w-full h-full flex overflow-hidden",
                orientation === "vertical" ? "flex-col gap-4" : "flex-row gap-4"
              )}
            >
              {pageItems.map((child, childIndex) => {
                // Hardcoded calculations to avoid template literal math issues
                let itemStyle = {};
                
                if (orientation === "vertical") {
                  if (itemsPerView === 3) {
                    itemStyle = { height: "calc((100% - 2rem) / 3)", width: "100%" };
                  } else if (itemsPerView === 6) {
                    itemStyle = { height: "calc((100% - 5rem) / 6)", width: "100%" };
                  } else {
                    itemStyle = { height: "100%", width: "100%" };
                  }
                } else {
                  if (itemsPerView === 3) {
                    itemStyle = { height: "100%", width: "calc((100% - 2rem) / 3)" };
                  } else {
                    itemStyle = { height: "100%", width: "100%" };
                  }
                }
                
                return (
                  <div
                    key={childIndex}
                    className="flex-shrink-0 overflow-hidden"
                    style={itemStyle}
                  >
                    {child}
                  </div>
                );
              })}
            </div>
          );
        }
        
        return pages;
      }
    }

  const canGoPrevious = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < totalPages - 1;

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

// CarouselItem Component
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
        "flex-shrink-0 h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}