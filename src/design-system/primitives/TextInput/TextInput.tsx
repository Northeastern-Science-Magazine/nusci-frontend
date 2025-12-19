import React from "react";
import { TextInputProps, textInputVariants, textInputVariantsCN } from "./variants";

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
        className={textInputVariantsCN({ variant, size, color, ...props }, className)}
        {...props}
      />
    </div>
  );
};
