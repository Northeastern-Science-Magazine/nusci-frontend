import React from "react";
import { TextInputProps, textInputVariantsCN } from "./variants";
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
  rows = 1,
  resize = false,
  ...props
}: TextInputProps) => {
  const autoId = React.useId();
  const propId = id ?? autoId;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (rows === 1 && e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="flex flex-col items-start">
      {label && (
        <label htmlFor={propId} className="mb-1">
          {" "}
          {label}{" "}
        </label>
      )}
      <textarea
        id={propId}
        value={value}
        placeholder={placeholder || "Enter text"}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className={clsx(
          textInputVariantsCN({ variant, size, color, ...props }),
          className,
          resize ? "resize-y" : "resize-none min-h-0"
        )}
        rows={rows}
        style={{ maxHeight: rows === 1 ? "2.5rem" : undefined }}
        {...props}
      />
    </div>
  );
};
