import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [direction, setDirection] = useState(0); // -1 = left, +1 = right

  // Track previous visible ids to detect entering panel
  const prevIds = useRef<string[]>([]);

  if (!items.length) {
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
    };
  });

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => mod(prev + dir, items.length));
  };

  return (
    <div className="relative w-full" style={{ minHeight: "600px", padding: "40px 0" }}>
      {/* Previous */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 p-3 text-white hover:bg-black"
        aria-label="Previous panel"
      >
        <ChevronRight size={24} />
      </button>

      <div
        className="relative w-full flex items-center justify-center"
        style={{
          perspective: "1000px",
          height: "600px",
        }}
      >
        {visibleItems.map(({ id, content, offset }) => {
          const scale = 1 - Math.abs(offset) * 0.08;
          const x = offset * 120;
          const rotateY = offset * -15;
          const zIndex = 20 - Math.abs(offset);

          // Detect newly entered panel
          const isEntering = !prevIds.current.includes(id);

          return (
            <motion.div
              key={id}
              initial={
                isEntering
                  ? {
                      x: `calc(-50% + ${-direction * 240}px)`,
                      y: "-50%",
                      rotateY: -direction * 25,
                      scale: 0.85,
                    }
                  : false
              }
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: "-50%",
                rotateY,
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
                zIndex,
                transformStyle: "preserve-3d",
              }}
              className={`${width} ${height} rounded-2xl shadow-2xl bg-neutral-900 overflow-hidden`}
            >
              {content}
            </motion.div>
          );
        })}

        {/* update previous ids AFTER render */}
        {(prevIds.current = visibleItems.map((i) => i.id)) && null}
      </div>

      {/* Next */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 p-3 text-white hover:bg-black"
        aria-label="Next panel"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}
