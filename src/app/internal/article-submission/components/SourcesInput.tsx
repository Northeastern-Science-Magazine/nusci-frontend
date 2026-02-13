"use client";

import React, { useState, useEffect } from "react";
import TextInput from "@/design-system/primitives/TextInput";
import Icon from "@/design-system/primitives/Icon";
import Button from "@/design-system/primitives/Button";
import Text from "@/design-system/primitives/Text";
import { Grid, GridCol } from "@/design-system/primitives/Grid";
import { ArticleSource } from "@/lib/types/types";

type SourcesInputProps = {
  value?: ArticleSource[];
  onChange?: (sources: ArticleSource[]) => void;
  label?: string;
  placeholder?: string;
};

export function SourcesInput({
  value = [],
  onChange,
  label = "Sources",
}: SourcesInputProps) {
  const [sources, setSources] = useState<ArticleSource[]>(
    value.length > 0 ? value : [{ text: "", href: "" }],
  );

  useEffect(() => {
    if (value && value.length > 0) {
      setSources(value);
    }
  }, [value]);

  const handleSourceTextChange = (index: number, newText: string) => {
    const updatedSources = [...sources];
    updatedSources[index] = { ...updatedSources[index], text: newText };
    setSources(updatedSources);
    onChange?.(updatedSources);
  };

  const handleSourceHrefChange = (index: number, newHref: string) => {
    const updatedSources = [...sources];
    updatedSources[index] = { ...updatedSources[index], href: newHref };
    setSources(updatedSources);
    onChange?.(updatedSources);
  };

  const addSource = () => {
    const updatedSources = [...sources, { text: "", href: "" }];
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
            <label>{"Sources"}</label>
            <Grid col span={2} gap={2}>
              <GridCol span={1}>
                <TextInput
                  value={source.text}
                  label=""
                  onChange={(newValue) => handleSourceTextChange(index, newValue)}
                  placeholder="Enter source title"
                  className="w-full"
                />
              </GridCol>
              <GridCol span={1}>
                <TextInput
                  value={source.href}
                  label=""
                  onChange={(newValue) => handleSourceHrefChange(index, newValue)}
                  placeholder="Enter source URL or citation"
                  className="w-full"
                />
              </GridCol>
            </Grid>
          </div>
          {sources.length > 1 && (
            <Button
              onClick={() => removeSource(index)}
              aria-label="Remove source"
              variant="outline"
              color="red"
            >
              <Icon icon="trash" size="sm" color="red" />
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
