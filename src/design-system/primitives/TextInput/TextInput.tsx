import React, { useState } from "react";
import { TextInputProps, textInputVariants } from "./variants";

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
  onValueChange,
  variant,
  size,
  color,
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
        onChange={(e) => onValueChange?.(e.target.value)}
        className={textInputVariants({ variant, size, color })}
        {...props}
      />
    </div>
  );
};
