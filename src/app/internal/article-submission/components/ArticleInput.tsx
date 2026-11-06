'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { Equation } from '@/design-system/components/MathText';
import { findEquations, joinSplitEquations } from '@/lib/helpers/articleMath';
import type { ArticleContent } from '@/lib/types/types';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type ArticleInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

// Plain text of each editor paragraph, enough to find the equations in it.
function htmlToTextParagraphs(html: string): ArticleContent[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return [...doc.body.children].map((block) => [
    { contentType: 'text', content: block.textContent ?? '' },
  ]);
}

export function ArticleInput({ value = '', onChange }: ArticleInputProps) {
  const [localValue, setLocalValue] = useState<string>(value);

  // keep local state in sync with incoming prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // DOMParser only exists in the browser, so find equations after render
  const [equations, setEquations] = useState<ReturnType<typeof findEquations>>(
    [],
  );

  useEffect(() => {
    setEquations(
      findEquations(joinSplitEquations(htmlToTextParagraphs(localValue))),
    );
  }, [localValue]);

  return (
    <div>
      <label className="mb-1">Content</label>
      <p className="text-sm opacity-70">
        Equations: type LaTeX between <code>\(</code> and <code>\)</code> for an
        inline equation, or between <code>$$</code> and <code>$$</code> for one
        on its own line.
      </p>
      <ReactQuill
        value={localValue}
        onChange={(v) => {
          setLocalValue(v);
          onChange?.(v);
        }}
        modules={{ toolbar: false }}
        placeholder="Enter article content"
        className={
          'focus-within:[&_.ql-container]:!ring-2 focus-within:[&_.ql-container]:!ring-black py-3 ' +
          '[&_.ql-container]:!border-[2px] [&_.ql-container]:!border-black [&_.ql-container]:!rounded-md [&_.ql-container]:!shadow-none ' +
          '[&_.ql-editor]:!font-sans [&_.ql-editor]:!text-black [&_.ql-editor]:!text-base ' +
          '[&_.ql-editor.ql-blank::before]:not-italic [&_.ql-editor.ql-blank::before]:font-sans ' +
          '[&_.ql-editor.ql-blank::before]:text-black [&_.ql-editor.ql-blank::before]:opacity-50 [&_.ql-editor.ql-blank::before]:text-base'
        }
      />
      {equations.length > 0 && (
        <div className="rounded-md border-2 border-black p-4">
          <p className="mb-2 text-sm font-bold">
            Equation preview ({equations.length})
          </p>
          <div className="flex flex-col gap-3">
            {equations.map((equation, index) => (
              <Equation key={index} latex={equation.latex} display />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleInput;
