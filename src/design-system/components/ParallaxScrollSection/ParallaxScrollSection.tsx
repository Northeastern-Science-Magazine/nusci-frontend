"use client";

import { useRef } from "react";
import { useScroll, useInView, useTransform, motion } from "framer-motion";
import { parallaxScrollSectionVariants, ParallaxScrollSectionProps } from "./variants";
import clsx from "clsx";
import Image from "@/design-system/primitives/Image"

/**
 * ParallaxScrollSection Component
 *
 * A component that creates a parallax scrolling background image with an animated
 * newspaper-style content section that appears on top.
 *
 * @param {ParallaxScrollSectionProps} props
 * @returns ParallaxScrollSection Component
 */
export function ParallaxScrollSection({
  imageSrc,
  imageAlt = "",
  children,
  className,
  maxWidth = "max-w-6xl",
  padding = "px-6 laptop:px-8",
  height = "md",
  parallaxIntensity = "medium",
  offset = "md",
}: ParallaxScrollSectionProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const newspaperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: dividerScroll } = useScroll({
    target: dividerRef,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(newspaperRef, { once: true, amount: 0 });

  // Calculate parallax transform based on intensity
  const parallaxMap: Record<"light" | "medium" | "strong", [string, string]> = {
    light: ["-0%", "0%"],
    medium: ["-10%", "10%"],
    strong: ["-20%", "20%"],
  };

  const imageY = useTransform(dividerScroll, [0, 1], parallaxMap[parallaxIntensity || "medium"]);

  return (
    <div className={clsx(parallaxScrollSectionVariants({ height, parallaxIntensity, offset }), className)}>
      {/* Parallax Divider Background */}
      <div ref={dividerRef} className="parallax-container relative w-full overflow-hidden">
        <motion.div style={{ y: imageY }} className="parallax-image absolute top-[-25%] left-0 w-full h-[150%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={imageSrc} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover object-center" />
        </motion.div>
      </div>

      {/* Newspaper Section - Paper overlay */}
      <motion.div
        ref={newspaperRef}
        initial={{ opacity: 0, y: 100, rotateX: 15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: 15 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ perspective: "1000px" }}
        className={clsx("newspaper-section relative mx-auto w-full", maxWidth, padding)}
      >
        {/* Paper container with defined width */}
        <div className="relative bg-white shadow-2xl border border-border">{children}</div>
      </motion.div>
    </div>
  );
}
