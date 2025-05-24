import React, { useState } from "react";
import { TextInputProps, textInputVariants } from "./variants";

/**
 * Text Input Component
 *
 * @param {TextProps} props
 * @returns Text Input Component
 */
export const TextInput = (props: TextInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    // for external features based on prop
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className="flex flex-col items-start">
      {props.label && (
        <label htmlFor={props.id} className="mb-1">
          {" "}
          {props.label}{" "}
        </label>
      )}
      <input
        type="text"
        id={props.id}
        value={inputValue}
        placeholder={props.placeholder || "Enter text"}
        onChange={handleChange}
        className={textInputVariants(props)}
      />
    </div>
  );
};