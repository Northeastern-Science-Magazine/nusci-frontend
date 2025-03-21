import React, { useState, useEffect } from "react";
import { TextProps, textVariants } from "./textVariants";

/**
 * Text Input Component
 *
 * @param {TextProps} props
 * @returns Text Input Component
 */
export const Text = (props: TextProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    // for external features
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
        className={textVariants(props)}
      />
    </div>
  );
};
