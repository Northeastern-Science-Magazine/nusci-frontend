"use client";

import React, { useState, useEffect } from "react";
import TextInput from "../../../../design-system/primitives/TextInput";
import Icon from "../../../../design-system/primitives/Icon";

type SourcesInputProps = {
  value?: string[];
  onChange?: (sources: string[]) => void;
  label?: string;
  placeholder?: string;
};

export function SourcesInput({
  value = [],
  onChange,
  label = "Sources",
  placeholder = "Enter source URL or citation",
}: SourcesInputProps) {
  const [sources, setSources] = useState<string[]>(
    value.length > 0 ? value : [""]
  );

  useEffect(() => {
    if (value && value.length > 0) {
      setSources(value);
    }
  }, [value]);

  const handleSourceChange = (index: number, newValue: string) => {
    const updatedSources = [...sources];
    updatedSources[index] = newValue;
    setSources(updatedSources);
    onChange?.(updatedSources);
  };

  const addSource = () => {
    const updatedSources = [...sources, ""];
    setSources(updatedSources);
    onChange?.(updatedSources);
  };

  const removeSource = (index: number) => {
    if (sources.length > 1) {
      const updatedSources = sources.filter((_, i) => i !== index);
      setSources(updatedSources);
      onChange?.(updatedSources);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {sources.map((source, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1">
            <TextInput
              value={source}
              label="Source"
              onChange={(newValue) => handleSourceChange(index, newValue)}
              placeholder={placeholder}
              className="w-full"
            />
          </div>
          {sources.length > 1 && (
            <button
              type="button"
              onClick={() => removeSource(index)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 transition-colors hover:text-maroon hover:bg-maroon hover:bg-opacity-20 hover:text-maroon"
              aria-label="Remove source"
            >
              <Icon icon="trash" size="md" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addSource}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:border-sage-green hover:bg-sage-green hover:text-black"
      >
        <Icon icon="plus" size="md" />
        Add Source
      </button>
    </div>
  );
}
