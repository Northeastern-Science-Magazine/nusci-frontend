import { tv, type VariantProps } from "tailwind-variants";

export const parallaxScrollSectionVariants = tv({
  base: "relative",
  variants: {
    height: {
      sm: "[&_.parallax-container]:h-[300px]",
      md: "[&_.parallax-container]:h-[400px]",
      lg: "[&_.parallax-container]:h-[500px]",
    },
    parallaxIntensity: {
      light: "[&_.parallax-image]:translate-y-[-10%]",
      medium: "[&_.parallax-image]:translate-y-[-20%]",
      strong: "[&_.parallax-image]:translate-y-[-30%]",
    },
    offset: {
      sm: "[&_.newspaper-section]:-mt-24",
      md: "[&_.newspaper-section]:-mt-32",
      lg: "[&_.newspaper-section]:-mt-40",
    },
  },
  defaultVariants: {
    height: "md",
    parallaxIntensity: "medium",
    offset: "md",
  },
});

export type ParallaxScrollSectionVariants = VariantProps<typeof parallaxScrollSectionVariants>;

export interface ParallaxScrollSectionProps extends ParallaxScrollSectionVariants {
  /** Source URL for the parallax background image */
  imageSrc: string;
  /** Alt text for the parallax background image */
  imageAlt?: string;
  /** Children content to display in the newspaper layout section */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Maximum width of the newspaper section container */
  maxWidth?: string;
  /** Padding for the newspaper section container */
  padding?: string;
}
