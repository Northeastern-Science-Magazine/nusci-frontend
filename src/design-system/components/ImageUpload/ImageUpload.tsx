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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange?.(file);
  };
  return (
    <div>
      <label
        htmlFor="image-upload"
        className="p-4 border border-1 rounded-md cursor-pointer"
      >
        {value ? `Selected: ${value.name}` : "Upload Image"}
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
