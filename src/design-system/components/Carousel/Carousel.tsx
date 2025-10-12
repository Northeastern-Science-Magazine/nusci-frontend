import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
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

// Context to pass itemsPerView, orientation, and size to CarouselItems
const CarouselContext = createContext<{
  itemsPerView: number;
  orientation: "horizontal" | "vertical";
  size: "xs" | "sm" | "md" | "lg" | "xl";
}>({
  itemsPerView: 1,
  orientation: "horizontal",
  size: "md",
});

/**
 * Carousel Component - Simplified with itemsPerView
 * 
 * Features:
 * - Clean horizontal and vertical scrolling
 * - Multiple items per view using itemsPerView prop
 * - Infinite loop support
 * - Autoplay with pause on hover
 * - Navigation arrows
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

  // Calculate total pages based on items per view
  const totalPages = Math.ceil(totalSlides / itemsPerView);
  
  // Enable continuous loop for all cases when loop is true
  const useContinuousLoop = loop && totalPages > 1;

  const getInfiniteChildren = () => {
    if (!useContinuousLoop || totalSlides === 0) return childArray;
    
    // Clone enough items at start and end for seamless looping
    // We need at least itemsPerView items on each side
    const itemsToClone = Math.min(itemsPerView, totalSlides);
    
    // Clone last N items to put at the beginning
    const lastItems = childArray.slice(-itemsToClone);
    // Clone first N items to put at the end
    const firstItems = childArray.slice(0, itemsToClone);
    
    return [...lastItems, ...childArray, ...firstItems];
  };

  const infiniteChildren = getInfiniteChildren();
  const infiniteTotalSlides = infiniteChildren.length;
  
  // Adjust start index based on cloned items
  const getStartIndex = () => {
    if (!useContinuousLoop) return 0;
    return Math.min(itemsPerView, totalSlides);
  };

  const [currentIndex, setCurrentIndex] = useState(getStartIndex());
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle transition end for continuous loop
  const handleTransitionEnd = useCallback(() => {
    if (!useContinuousLoop) return;

    const cloneCount = Math.min(itemsPerView, totalSlides);
    const lastRealIndex = cloneCount + totalSlides;
    
    // If we've scrolled past the last real item, jump to the beginning
    if (currentIndex >= lastRealIndex) {
      setIsTransitioning(false);
      setCurrentIndex(cloneCount);
    } 
    // If we've scrolled before the first real item, jump to the end
    else if (currentIndex < cloneCount) {
      setIsTransitioning(false);
      setCurrentIndex(lastRealIndex - itemsPerView);
    }
  }, [currentIndex, useContinuousLoop, itemsPerView, totalSlides]);

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
        if (useContinuousLoop) {
          return prev + itemsPerView;
        } else {
          // Non-loop: stop at the end or wrap around
          const nextIndex = prev + itemsPerView;
          if (loop) {
            return nextIndex >= totalSlides ? 0 : nextIndex;
          } else {
            return Math.min(nextIndex, totalSlides - itemsPerView);
          }
        }
      });
      setTimeout(() => setIsAnimating(false), 300);
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, loop, useContinuousLoop, totalPages, totalSlides, itemsPerView]);

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
      if (useContinuousLoop) {
        return prev - itemsPerView;
      } else {
        const newIndex = prev - itemsPerView;
        if (loop) {
          return newIndex < 0 ? Math.max(0, totalSlides - itemsPerView) : newIndex;
        } else {
          return Math.max(0, newIndex);
        }
      }
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay(); 
  }, [isAnimating, loop, useContinuousLoop, totalSlides, itemsPerView, stopAutoplay]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      if (useContinuousLoop) {
        return prev + itemsPerView;
      } else {
        const nextIndex = prev + itemsPerView;
        if (loop) {
          return nextIndex >= totalSlides ? 0 : nextIndex;
        } else {
          return Math.min(nextIndex, totalSlides - itemsPerView);
        }
      }
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    stopAutoplay();
  }, [isAnimating, loop, useContinuousLoop, totalSlides, itemsPerView, stopAutoplay]);

  const handleMouseEnter = () => {
    if (autoplay) stopAutoplay();
  };

  const handleMouseLeave = () => {
    if (autoplay) startAutoplay();
  };

  // Get the height value for vertical carousel in rem units
  const getVerticalHeightRem = () => {
    const heightMap = {
      xs: "18rem",    // h-72
      sm: "24rem",    // h-96
      md: "32rem",    // h-[32rem]
      lg: "40rem",    // h-[40rem]
      xl: "48rem",    // h-[48rem]
    };
    return heightMap[size];
  };

  // Calculate transform based on itemsPerView and currentIndex
  const getTransform = () => {
    if (orientation === "vertical") {
      // For vertical, use rem-based transforms to match grid row heights
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
      // For horizontal, calculate based on how many items we've scrolled
      // Each item takes up (100 / itemsPerView)% of the viewport
      const percentagePerItem = 100 / itemsPerView;
      const moveDistance = currentIndex * percentagePerItem;
      return `translateX(-${moveDistance}%)`;
    }
  };

  const shouldShowNavigation = totalSlides > itemsPerView;

  return (
    <CarouselContext.Provider value={{ itemsPerView, orientation, size }}>
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
                orientation === "vertical" ? "grid grid-flow-row" : "flex flex-row",
                "h-full",
                isTransitioning ? "transition-transform duration-300 ease-in-out" : ""
              )}
              style={{ 
                transform: getTransform(),
                // For vertical, set each row to viewport height in rem units
                ...(orientation === "vertical" 
                  ? { gridTemplateRows: `repeat(${infiniteChildren.length}, ${getVerticalHeightRem()})` } 
                  : {})
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {React.Children.map(infiniteChildren, (child, index) => (
                <CarouselItem key={`slide-${index}`}>
                  {child}
                </CarouselItem>
              ))}
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
    </CarouselContext.Provider>
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

// CarouselItem Component - Uses context to get itemsPerView
export function CarouselItem({ 
  children, 
  className,
  gap = "md",
  ...props 
}: CarouselItemProps) {
  const { itemsPerView, orientation } = useContext(CarouselContext);
  
  // Calculate width/height based on itemsPerView
  const getSize = () => {
    if (orientation === "vertical") {
      // For vertical with grid, items fill the grid cell automatically
      return "h-full w-full";
    }
    
    if (itemsPerView === 1) {
      return "w-full h-full";
    }
    
    // For horizontal with multiple items, divide space equally
    const percentage = 100 / itemsPerView;
    return { width: `${percentage}%` };
  };

  const sizeStyle = getSize();
  const sizeClass = typeof sizeStyle === "string" ? sizeStyle : "";
  const inlineStyle = typeof sizeStyle === "object" ? sizeStyle : undefined;

  return (
    <div 
      className={clsx(
        carouselItemVariants({ orientation, gap }), 
        "flex-shrink-0",
        sizeClass,
        className
      )}
      style={inlineStyle}
      {...props}
    >
      {children}
    </div>
  );
}