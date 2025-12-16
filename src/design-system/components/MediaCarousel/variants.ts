export type MediaCarouselSize = "sm" | "md" | "lg";

export interface MediaCarouselSizeConfig {
  width: string;
  height: string;
  offset: number;
  containerHeight: number;
  minHeight: number;
  buttonSize: number;
}

export const mediaCarouselSizes: Record<MediaCarouselSize, MediaCarouselSizeConfig> = {
  sm: {
    width: "w-[150px]",
    height: "h-[200px]",
    offset: 60,
    containerHeight: 400,
    minHeight: 440,
    buttonSize: 20,
  },
  md: {
    width: "w-[225px]",
    height: "h-[300px]",
    offset: 80,
    containerHeight: 520,
    minHeight: 560,
    buttonSize: 22,
  },
  lg: {
    width: "w-[300px]",
    height: "h-[400px]",
    offset: 120,
    containerHeight: 600,
    minHeight: 640,
    buttonSize: 24,
  },
};
