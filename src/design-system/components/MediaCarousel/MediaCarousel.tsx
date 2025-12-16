import { useState } from "react";
import { motion } from "framer-motion";
import Image from "@/design-system/primitives/Image";
import { mediaCarouselSizes, type MediaCarouselSize } from "./variants";

export default function MediaCarousel({
  media,
  visibleCount = 7,
  size = "lg",
}: {
  visibleCount: number;
  media: Array<string>;
  size?: MediaCarouselSize;
}) {
  const sizeConfig = mediaCarouselSizes[size];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, +1 = right (used for animation)

  if (!media.length) {
    return <div className="p-8 text-center text-gray-500">No items to display</div>;
  }

  const half = Math.floor(visibleCount / 2);
  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const visibleItems = Array.from({ length: visibleCount }, (_, i) => {
    const offset = i - half;
    const itemIndex = mod(index + offset, media.length);
    return { url: media[itemIndex], index: itemIndex, offset };
  });

  const paginate = (steps: number) => {
    if (steps === 0) return;
    setDirection(steps > 0 ? 1 : -1);
    setIndex((prev) => mod(prev + steps, media.length));
  };

  return (
    <div className="relative w-full" style={{ minHeight: `${sizeConfig.minHeight}px`, padding: "40px 0" }}>
      {/* Carousel panels */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ perspective: "1000px", height: `${sizeConfig.containerHeight}px` }}
      >
        {visibleItems.map(({ url, index: itemIndex, offset }) => {
          const scale = 1 - Math.abs(offset) * 0.08;
          const x = offset * sizeConfig.offset;
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
              whileHover={{
                scale: 1.05,
                cursor: "pointer",
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => isInteractive && paginate(offset)}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex,
                transformStyle: "preserve-3d",
              }}
              className={`${sizeConfig.width} ${sizeConfig.height} shadow-2xl bg-neutral-900 overflow-hidden rounded-2xl`}
            >
              <Image src={url} alt={`Carousel image ${itemIndex + 1}`} raw width="auto" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
