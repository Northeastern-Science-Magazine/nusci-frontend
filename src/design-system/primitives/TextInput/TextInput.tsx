import React, { useState } from "react";
import { TextInputProps, textInputVariants } from "./variants";
import clsx from "clsx";

/**
 * Text Input Component
 *
 * @param {TextProps} props
 * @returns Text Input Component
 */
export const TextInput = ({
  label,
  id,
  value,
  placeholder,
  onChange,
  variant,
  size,
  color,
  className,
  ...props
}: TextInputProps) => {
  const autoId = React.useId();
  const propId = id ?? autoId;
  return (
    <div className="flex flex-col items-start">
      {label && (
        <label htmlFor={propId} className="mb-1">
          {" "}
          {label}{" "}
        </label>
      )}
      <input
        type="text"
        id={propId}
        value={value}
        placeholder={placeholder || "Enter text"}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(textInputVariants({ variant, size, color }), className)}
        {...props}
      />
    </div>
  );
};
