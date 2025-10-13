"use client";

import React, { useState, useEffect } from "react";
import TextInput from "@/design-system/primitives/TextInput";
import Icon from "@/design-system/primitives/Icon";
import Button from "@/design-system/primitives/Button";
import Text from "@/design-system/primitives/Text";

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
        <div key={index} className="flex items-end gap-2">
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
            <Button
              onClick={() => removeSource(index)}
              aria-label="Remove source"
              variant="outline"
              color="red"
            >
              <Icon icon="trash" size="sm" />
            </Button>
          )}
        </div>
      ))}
      <Button
        onClick={addSource}
        className="flex w-full items-center justify-center gap-2"
        variant="outline"
        color="sage-green"
      >
        <div className="flex items-center gap-2">
          <Icon icon="plus" size="md" />
          <Text>Add Source</Text>
        </div>
      </Button>
    </div>
  );
}
