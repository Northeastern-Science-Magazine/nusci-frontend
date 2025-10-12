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
 * Carousel Component - Simplified for both Horizontal and Vertical
 * 
 * Features:
 * - Clean horizontal and vertical scrolling
 * - Infinite loop support
 * - Autoplay with pause on hover
 * - Navigation arrows
 * - Multiple items per view
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
  const childArray = React.Children.toArray(children);
  const totalSlides = childArray.length;

  // Check if children are CarouselItem components
  const isUsingCarouselItem = childArray.some(
    child => React.isValidElement(child) && child.type === CarouselItem
  );

  // Check if all items have basis="full"
  const allItemsFullBasis = React.Children.toArray(children).every(
    child => {
      if (!React.isValidElement(child)) return true;
      if (child.type !== CarouselItem) return true;
      const basis = (child.props as CarouselItemProps).basis;
      return !basis || basis === "full";
    }
  );

  const hasMixedBasis = isUsingCarouselItem && !allItemsFullBasis;

  const totalPages = isUsingCarouselItem 
    ? totalSlides
    : (itemsPerView === 1 ? totalSlides : Math.ceil(totalSlides / itemsPerView));

  const useContinuousLoop = loop && allItemsFullBasis && !hasMixedBasis;

  // For continuous loop, clone slides
  const getInfiniteChildren = () => {
    if (!useContinuousLoop || totalSlides === 0) return childArray;
    const lastSlide = childArray[childArray.length - 1];
    const firstSlide = childArray[0];
    return [lastSlide, ...childArray, firstSlide];
  };

  const infiniteChildren = getInfiniteChildren();
  const infiniteTotalPages = useContinuousLoop ? totalPages + 2 : totalPages;

  const [currentIndex, setCurrentIndex] = useState(useContinuousLoop ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle transition end for continuous loop
  const handleTransitionEnd = useCallback(() => {
    if (!useContinuousLoop) return;

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalPages);
    } else if (currentIndex === infiniteTotalPages - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }, [currentIndex, useContinuousLoop, totalPages, infiniteTotalPages]);

  // Re-enable transitions after instant jump
  useEffect(() => {
    if (!isTransitioning && useContinuousLoop) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, useContinuousLoop]);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (!autoplay || totalPages <= 1) return;
    
    autoplayRef.current = setTimeout(() => {
      setIsAnimating(true);
      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        const nextIndex = useContinuousLoop ? prev + 1 : (loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1));
        
        let realIndex = nextIndex;
        if (useContinuousLoop) {
          if (nextIndex === 0) realIndex = totalPages - 1;
          else if (nextIndex === infiniteTotalPages - 1) realIndex = 0;
          else realIndex = nextIndex - 1;
        }
        
        if (onSlideChange) onSlideChange(realIndex);
        return nextIndex;
      });
      setTimeout(() => setIsAnimating(false), 300);
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, loop, useContinuousLoop, totalPages, infiniteTotalPages, onSlideChange]);

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
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      const newIndex = useContinuousLoop ? prev - 1 : (loop ? (prev - 1 + totalPages) % totalPages : Math.max(prev - 1, 0));
      
      let realIndex = newIndex;
      if (useContinuousLoop) {
        if (newIndex === 0) realIndex = totalPages - 1;
        else if (newIndex === infiniteTotalPages - 1) realIndex = 0;
        else realIndex = newIndex - 1;
      }
      
      if (onSlideChange) onSlideChange(realIndex);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay(); 
  }, [isAnimating, loop, useContinuousLoop, totalPages, infiniteTotalPages, stopAutoplay, onSlideChange]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      const newIndex = useContinuousLoop ? prev + 1 : (loop ? (prev + 1) % totalPages : Math.min(prev + 1, totalPages - 1));
      
      let realIndex = newIndex;
      if (useContinuousLoop) {
        if (newIndex === 0) realIndex = totalPages - 1;
        else if (newIndex === infiniteTotalPages - 1) realIndex = 0;
        else realIndex = newIndex - 1;
      }
      
      if (onSlideChange) onSlideChange(realIndex);
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay();
  }, [isAnimating, loop, useContinuousLoop, totalPages, infiniteTotalPages, stopAutoplay, onSlideChange]);

  const handleMouseEnter = () => {
    if (autoplay) stopAutoplay();
  };

  const handleMouseLeave = () => {
    if (autoplay) startAutoplay();
  };

  // Get the height value for vertical carousel rows
  const getRowHeight = () => {
    const heightMap = {
      xs: "18rem",    // h-72
      sm: "24rem",    // h-96
      md: "32rem",    // h-[32rem]
      lg: "40rem",    // h-[40rem]
      xl: "48rem",    // h-[48rem]
    };
    return heightMap[size];
  };

  // Simple transform - works for both orientations
  const getTransform = () => {
    if (orientation === "vertical") {
      // For vertical, use rem values instead of percentages
      // because percentages are relative to the grid's total height, not viewport height
      const heightMap = {
        xs: 18,    // 18rem
        sm: 24,    // 24rem
        md: 32,    // 32rem
        lg: 40,    // 40rem
        xl: 48,    // 48rem
      };
      const heightInRem = heightMap[size];
      const moveDistance = currentIndex * heightInRem;
      return `translateY(-${moveDistance}rem)`;
    } else {
      // For horizontal, percentages work fine
      const moveDistance = currentIndex * 100;
      return `translateX(-${moveDistance}%)`;
    }
  };

  // Render carousel items
  const renderContent = () => {
    if (isUsingCarouselItem) {
      return React.Children.map(infiniteChildren, (child, index) => {
        if (React.isValidElement(child) && child.type === CarouselItem) {
          return React.cloneElement(child as React.ReactElement<CarouselItemProps>, {
            orientation,
            key: `carousel-item-${index}`,
          });
        }
        return child;
      });
    }

    // Legacy mode - simple wrapping
    return React.Children.map(infiniteChildren, (child, index) => (
      <div
        key={`slide-${index}`}
        className={clsx(
          "flex-shrink-0",
          orientation === "vertical" ? "w-full h-full" : "w-full h-full"
        )}
      >
        {child}
      </div>
    ));
  };

  const shouldShowNavigation = totalPages > 1;

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
          {/* Sliding content container */}
          <div
            className={clsx(
              orientation === "vertical" ? "grid grid-flow-row" : "flex flex-row h-full",
              isTransitioning ? "transition-transform duration-300 ease-in-out" : ""
            )}
            style={{ 
              transform: getTransform(),
              // For vertical, set each row to viewport height in rem units
              ...(orientation === "vertical" ? { gridTemplateRows: `repeat(${infiniteChildren.length}, ${getRowHeight()})` } : {})
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      {showNavigation && shouldShowNavigation && (
        <>
          <Button
            className={carouselNavigationVariants({ orientation, position: "previous" })}
            onClick={goToPrevious}
            variant="outline"
            color="neutral"
            size="sm"
          >
            <Icon 
              icon={orientation === "vertical" ? "arrowup" : "arrowleft"} 
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
              icon={orientation === "vertical" ? "arrowdown" : "arrowright"} 
              size="md" 
            />
          </Button>
        </>
      )}
    </div>
  );
}

// CarouselContent Component
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

// CarouselItem Component - SIMPLIFIED with proper vertical support
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
        "flex-shrink-0 w-full",
        // For vertical orientation, ensure items fill the full height of the grid cell
        orientation === "vertical" ? "h-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}