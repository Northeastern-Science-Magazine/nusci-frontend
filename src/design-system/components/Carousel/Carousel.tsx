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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [totalSlides, setTotalSlides] = useState(0);


  useEffect(() => {
    const slides = React.Children.count(children);
    setTotalSlides(slides);
  }, [children]);


  const totalPages = itemsPerView === 1 ? totalSlides : Math.ceil(totalSlides / itemsPerView);


  const startAutoplay = useCallback(() => {
    if (!autoplay || totalPages <= 1) return;
    
    autoplayRef.current = setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1);
        return nextIndex;
      });
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, loop, totalPages]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);


  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay, currentIndex]);


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

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay();
  }, [isAnimating, currentIndex, stopAutoplay]);


  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);


  const handleMouseEnter = () => {
    if (autoplay) stopAutoplay();
  };

  const handleMouseLeave = () => {
    if (autoplay) startAutoplay();
  };


  const getTransform = () => {
    if (itemsPerView === 1) {

      if (orientation === "vertical") {
        return `translateY(-${currentIndex * 100}%)`;
      }
      return `translateX(-${currentIndex * 100}%)`;
    } else {

      const moveDistance = currentIndex * 100;
      if (orientation === "vertical") {
        return `translateY(-${moveDistance}%)`;
      }
      return `translateX(-${moveDistance}%)`;
    }
  };

  const canGoPrevious = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < totalPages - 1;

  const renderContent = () => {
    if (itemsPerView === 1) {
      return React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="flex-shrink-0 h-full w-full"
        >
          {child}
        </div>
      ));
    } else {
      const childArray = React.Children.toArray(children);
      const pages = [];
      
      for (let i = 0; i < childArray.length; i += itemsPerView) {
        const pageItems = childArray.slice(i, i + itemsPerView);
        pages.push(
          <div
            key={i}
            className={clsx(
              "flex-shrink-0 h-full w-full flex items-center",
              orientation === "vertical" ? "flex-col" : "flex-row",
              gap === "none" ? "" : "gap-4"
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

      {showNavigation && totalPages > 1 && (
        <>
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