import { tv, type VariantProps } from "tailwind-variants";
import type { IconProps } from "@/primitives/Icon/variants";

export const mediaCarouselRootVariants = tv({
  base: "relative w-full py-10",
  variants: {
    size: {
      sm: "min-h-[440px]",
      md: "min-h-[560px]",
      lg: "min-h-[640px]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const mediaCarouselViewportVariants = tv({
  base: "relative w-full flex items-center justify-center [perspective:1000px]",
  variants: {
    size: {
      sm: "h-[400px]",
      md: "h-[520px]",
      lg: "h-[600px]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const mediaCarouselPanelVariants = tv({
  base: "shadow-2xl bg-neutral-900 overflow-hidden rounded",
  variants: {
    size: {
      sm: "w-[150px] h-[200px]",
      md: "w-[225px] h-[300px]",
      lg: "w-[300px] h-[400px]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const mediaCarouselEmptyStateVariants = tv({
  base: "p-8 text-center text-gray-500",
});

export type MediaCarouselVariants = VariantProps<
  typeof mediaCarouselRootVariants
>;
export type MediaCarouselSize = NonNullable<MediaCarouselVariants["size"]>;

export const mediaCarouselLayoutBySize: Record<
  MediaCarouselSize,
  {
    offsetPx: number;
    navIconSize: NonNullable<IconProps["size"]>;
  }
> = {
  sm: { offsetPx: 60, navIconSize: "sm" },
  md: { offsetPx: 80, navIconSize: "md" },
  lg: { offsetPx: 120, navIconSize: "lg" },
};

export interface MediaCarouselProps extends MediaCarouselVariants {
  /** Image URLs (strings) */
  media: string[];
  /** Number of visible panels. (Odd numbers look best: 3, 5, 7) */
  visibleCount?: number;
  /** Optional starting index. */
  initialIndex?: number;
  /** Optional callback when the active index changes. */
  onIndexChange?: (index: number) => void;
  /** Show left/right controls (in addition to clicking side panels). */
  showControls?: boolean;
  className?: string;
  //** If the center link brings you somewhere**/
  centerLink?: (index: number) => string;
}
