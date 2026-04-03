"use client";

import React from "react";
import TextInput from "@/design-system/primitives/TextInput";
import Icon from "@/design-system/primitives/Icon";
import Button from "@/design-system/primitives/Button";
import Text from "@/design-system/primitives/Text";

type PullQuoteInputProps = {
  value?: string[];
  onChange?: (quotes: string[]) => void;
  label?: string;
  placeholder?: string;
};

export function PullQuoteInput({
  value = [],
  onChange,
  label = "Pull Quotes",
  placeholder = "Enter a pull quote",
}: PullQuoteInputProps) {
  const quotes = value.length > 0 ? value : [""];

  const handleQuoteChange = (index: number, newText: string) => {
    const updatedQuote = [...quotes];
    updatedQuote[index] = newText;
    onChange?.(updatedQuote);
  };

  const addQuote = () => {
    const updatedQuote = [...quotes, ""];
    onChange?.(updatedQuote);
  };

  const removeQuote = (index: number) => {
    if (quotes.length > 1) {
      const updatedQuote = quotes.filter((_, i) => i !== index);
      onChange?.(updatedQuote);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block text-sm font-medium text-black">{label}</label>
      {quotes.map((quote, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1">
            <TextInput
              value={quote}
              label=""
              placeholder={placeholder}
              multiline={false}
              onChange={(newValue) => handleQuoteChange(index, newValue)}
              className="w-full"
            />
          </div>
          {quotes.length > 1 && (
            <Button
              type="button"
              onClick={() => removeQuote(index)}
              aria-label="Remove pull quote"
              variant="outline"
              color="red"
              className="group shrink-0 hover:bg-red-500"
            >
              <Icon
                icon="trash"
                size="sm"
                color="red"
                className="group-hover:text-white"
              />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        onClick={addQuote}
        className="flex w-full items-center justify-center gap-2"
        variant="outline"
        color="sage-green"
      >
        <div className="flex items-center gap-2">
          <Icon icon="plus" size="md" />
          <Text>Add Pull Quote</Text>
        </div>
      </Button>
    </div>
  );
}
