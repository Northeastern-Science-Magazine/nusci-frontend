import React from "react";
import { TextInputProps, textInputVariantsCN } from "./variants";
import clsx from "clsx";

/**
 * Text Input Component
 *
 * @param {TextInputProps} props
 * @returns Text Input Component (input or textarea based on multiline prop)
 */
export const TextInput = (props: TextInputProps) => {
  const { label, id, value, placeholder, onChange, variant, size, color, className, ...restProps } = props;

  const autoId = React.useId();
  const propId = id ?? autoId;
  const multiline = props.multiline ?? false;

  const baseClassName = clsx(textInputVariantsCN({ variant, size, color, ...restProps }), className);

  return (
    <div className="flex flex-col items-start">
      {label && (
        <label htmlFor={propId} className="mb-1">
          {label}
        </label>
      )}
      {multiline ? (
        (() => {
          const textareaProps = props as Extract<TextInputProps, { multiline: true }>;
          const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (textareaProps.rows === 1 && e.key === "Enter") {
              e.preventDefault();
            }
          };
          return (
            <textarea
              id={propId}
              value={value}
              placeholder={placeholder || "Enter text"}
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              className={clsx(baseClassName, textareaProps.resize ? "resize-y" : "resize-none min-h-0")}
              rows={textareaProps.rows ?? 1}
              style={{ maxHeight: textareaProps.rows === 1 ? "2.5rem" : undefined }}
              {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          );
        })()
      ) : (
        <input
          type="text"
          id={propId}
          value={value}
          placeholder={placeholder || "Enter text"}
          onChange={(e) => onChange?.(e.target.value)}
          className={baseClassName}
          {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};
