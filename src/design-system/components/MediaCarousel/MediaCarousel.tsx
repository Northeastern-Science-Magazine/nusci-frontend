import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Image from "@/primitives/Image";
import {
  mediaCarouselEmptyStateVariants,
  mediaCarouselLayoutBySize,
  mediaCarouselPanelVariants,
  mediaCarouselRootVariants,
  mediaCarouselViewportVariants,
  type MediaCarouselProps,
} from "./variants";

export function MediaCarousel({
  media,
  visibleCount = 7,
  size = "lg",
  initialIndex = 0,
  onIndexChange,
  className,
}: MediaCarouselProps) {
  const layout = mediaCarouselLayoutBySize[size];
  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const [index, setIndex] = useState(() => (media.length ? mod(initialIndex, media.length) : 0));
  const [direction, setDirection] = useState<-1 | 0 | 1>(0); // -1 = left, +1 = right

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  if (!media.length) {
    return <div className={mediaCarouselEmptyStateVariants()}>No items to display</div>;
  }

  const safeVisibleCount = Math.max(1, Math.floor(visibleCount));
  const half = Math.floor(safeVisibleCount / 2);

  const visibleItems = Array.from({ length: safeVisibleCount }, (_, i) => {
    const offset = i - half;
    const itemIndex = mod(index + offset, media.length);
    return { url: media[itemIndex], index: itemIndex, offset };
  });

  const paginate = (steps: number) => {
    if (steps === 0) return;
    setDirection(steps > 0 ? 1 : -1);
    setIndex((prev) => {
      const next = mod(prev + steps, media.length);
      return next;
    });
  };

  return (
    <div className={clsx(mediaCarouselRootVariants({ size }), className)} aria-roledescription="carousel">
      <div className={mediaCarouselViewportVariants({ size })}>
        {visibleItems.map(({ url, index: itemIndex, offset }) => {
          const scale = 1 - Math.abs(offset) * 0.08;
          const x = offset * layout.offsetPx;
          const rotateY = offset * -15;
          const zIndex = 20 - Math.abs(offset);

          const isInteractive = offset !== 0;

          return (
            <motion.div
              key={`${url}-${itemIndex}`}
              initial={{
                x: `calc(-50% + ${-direction}px)`,
                y: "-50%",
                rotateY: -direction * 25,
                scale: 0.85,
              }}
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: "-50%",
                rotateY,
                scale,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={isInteractive ? () => paginate(offset) : undefined}
              style={{ zIndex }}
              className={clsx(
                "absolute left-1/2 top-1/2 [transform-style:preserve-3d]",
                mediaCarouselPanelVariants({ size }),
                isInteractive && "cursor-pointer"
              )}
            >
              <Image src={url} alt={`Carousel image ${itemIndex + 1}`} raw width="auto" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default MediaCarousel;
