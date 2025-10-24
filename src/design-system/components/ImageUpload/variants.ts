import React, { ClassAttributes, HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** Define Button Variants using Tailwind Variant Definitions */
export const imageUploadVariants = tv({
  base: "items-center justify-center font-medium transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    color: {
      black:
        "text-white bg-black border-black hover:bg-black hover:border-black focus:ring-black",
      white:
        "text-black bg-white border-white hover:bg-white hover:border-white focus:ring-white",
      red: "text-white bg-red-500 border-red-500 hover:bg-red-500 hover:border-red-500 focus:ring-red-500",
      aqua: "text-white bg-aqua border-aqua hover:bg-aqua hover:border-aqua focus:ring-aqua",
      "aqua-light":
        "text-black bg-aqua-light border-aqua-light hover:bg-aqua-light hover:border-aqua-light focus:ring-aqua-light",
      "forest-green":
        "text-white bg-forest-green border-forest-green hover:bg-forest-green hover:border-forest-green focus:ring-forest-green",
      "sage-green":
        "text-black bg-sage-green border-sage-green hover:bg-sage-green hover:border-sage-green focus:ring-sage-green",
      border:
        "text-white bg-border border-border hover:bg-border hover:border-border focus:ring-border",
      neutral:
        "text-black bg-neutral border-neutral hover:bg-neutral hover:border-neutral focus:ring-neutral",
      purple:
        "text-white bg-purple border-purple hover:bg-purple hover:border-purple focus:ring-purple",
      pink: "text-black bg-pink border-pink hover:bg-pink hover:border-pink focus:ring-pink",
      maroon:
        "text-white bg-maroon border-maroon hover:bg-maroon hover:border-maroon focus:ring-maroon",
      coral:
        "text-black bg-coral border-coral hover:bg-coral hover:border-coral focus:ring-coral",
      marigold:
        "text-black bg-marigold border-marigold hover:bg-marigold hover:border-marigold focus:ring-marigold",
    },
  },
});

/** Create the typing for ImageUpload Variant Props */
export type ImageUploadVariants = VariantProps<typeof imageUploadVariants>;

/** Export ImageUploadProps as one type */
export interface ImageUploadProps extends ImageUploadVariants {
  className?: string;
  onChange?: (file: File | undefined) => void;
  value?: undefined | File;
  disabled?: boolean;
}
