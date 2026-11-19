'use client';

import { ImageUploadProps, imageUploadVariants } from './variants';
import clsx from 'clsx';
import React, { useId } from 'react';
import { IMAGE_TYPES } from '@/lib/helpers/media';

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
  // unique, so several uploads can live on one page
  const id = useId();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange?.(file);
  };
  return (
    <div>
      <label
        htmlFor={id}
        className="p-4 border border-1 rounded-md cursor-pointer"
      >
        {value ? `Selected: ${value.name}` : 'Upload Image'}
      </label>

      <input
        id={id}
        type="file"
        accept={IMAGE_TYPES.join(',')}
        disabled={disabled}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
