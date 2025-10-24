"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type ArticleInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function ArticleInput({ value = "", onChange }: ArticleInputProps) {
  const [localValue, setLocalValue] = useState<string>(value);
  const quillRef = useRef<any>(null);

  // keep local state in sync with incoming prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div>
      <label className="mb-1">Content</label>
      <ReactQuill
        ref={quillRef}
        value={localValue}
        onChange={(v) => {
          setLocalValue(v);
          onChange?.(v);
        }}
        modules={{ toolbar: false }}
        placeholder="Enter article content"
        className={
          "focus-within:[&_.ql-container]:!ring-2 focus-within:[&_.ql-container]:!ring-black py-3 " +
          "[&_.ql-container]:!border-[2px] [&_.ql-container]:!border-black [&_.ql-container]:!rounded-md [&_.ql-container]:!shadow-none " +
          "[&_.ql-editor]:!font-sans [&_.ql-editor]:!text-black [&_.ql-editor]:!text-base " +
          "[&_.ql-editor.ql-blank::before]:not-italic [&_.ql-editor.ql-blank::before]:font-sans " +
          "[&_.ql-editor.ql-blank::before]:text-black [&_.ql-editor.ql-blank::before]:opacity-50 [&_.ql-editor.ql-blank::before]:text-base"
        }
      />
    </div>
  );
}

export default ArticleInput;
