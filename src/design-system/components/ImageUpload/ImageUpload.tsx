import { ImageUploadProps, imageUploadVariants } from "./variants";
import clsx from "clsx";
import React from "react";

/**
 * ImageUpload Component
 *
 * @param { ImageUploadProps } props
 * @returns ImageUpload Component
 */
export default function ImageUpload({
  className,
  onChange,
  value,
  disabled = false,
  ...variantProps
}: ImageUploadProps) {
  return (
    <div>
      <label
        htmlFor="image-upload"
        className="p-4 border border-1 rounded-md cursor-pointer"
      >
        Upload Image
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}
