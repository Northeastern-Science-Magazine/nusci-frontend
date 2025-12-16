import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * LayeredCarousel
 * ----------------
 * Props:
 * - items: Array<{ id: string; content: React.ReactNode }>
 * - visibleCount: odd number (1,3,5,7,...) controlling how many panels are visible
 * - width / height: tailwind width/height classes for panels
 */
export default function LayeredCarousel({
  items,
  visibleCount = 5,
  width = "w-[320px]",
  height = "h-[520px]",
}: {
  visibleCount: number;
  items: Array<{ id: string; content: React.ReactNode }>;
  width: string;
  height: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, +1 right

  if (!items || items.length === 0) {
    return <div className="p-8 text-center text-gray-500">No items to display</div>;
  }

  const half = Math.floor(visibleCount / 2);

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const visibleItems = Array.from({ length: visibleCount }, (_, i) => {
    const offset = i - half;
    const itemIndex = mod(index + offset, items.length);
    return {
      ...items[itemIndex],
      offset,
      position: i, // Stable position identifier for animation
    };
  });

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => mod(prev + dir, items.length));
    // Reset direction after animation
    setTimeout(() => setDirection(0), 600);
  };

  return (
    <div className="relative w-full" style={{ minHeight: "600px", padding: "40px 0" }}>
      {/* Left Arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 p-3 text-white hover:bg-black transition-colors"
        aria-label="Previous panel"
      >
        <ChevronRight size={24} />
      </button>

      {/* Panels */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          perspective: "1000px",
          height: "600px",
          minHeight: "600px",
        }}
      >
        {visibleItems.map(({ id, content, offset, position }) => {
          const scale = 1 - Math.abs(offset) * 0.08;
          const x = offset * 120;
          const rotateY = offset * -15;
          const z = 20 - Math.abs(offset);
          const opacity = Math.abs(offset) > half ? 0 : 1;

          // Calculate previous position based on direction
          // When going left (dir=-1), items were one position to the right (offset+1)
          // When going right (dir=1), items were one position to the left (offset-1)
          const prevOffset = direction === 0 ? offset : offset - direction;
          const prevX = prevOffset * 120;
          const prevRotateY = prevOffset * -15;
          const prevScale = 1 - Math.abs(prevOffset) * 0.08;
          const prevOpacity = Math.abs(prevOffset) > half ? 0 : 1;

          return (
            <motion.div
              key={id}
              initial={
                direction === 0
                  ? false
                  : {
                      x: `calc(-50% + ${prevX}px)`,
                      y: "-50%",
                      rotateY: prevRotateY,
                      opacity: prevOpacity,
                      scale: prevScale,
                    }
              }
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: "-50%",
                rotateY,
                opacity,
                scale,
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex: z,
                transformStyle: "preserve-3d",
              }}
              className={`${width} ${height} rounded-2xl shadow-2xl bg-neutral-900 overflow-hidden`}
            >
              {content}
            </motion.div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 p-3 text-white hover:bg-black transition-colors"
        aria-label="Next panel"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}
