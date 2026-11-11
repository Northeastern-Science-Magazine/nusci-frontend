import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import clsx from 'clsx';
import { splitMath } from '@/lib/helpers/articleMath';

export interface MathTextProps {
  /** Text that may contain LaTeX in \begin{equation}...\end{equation}, equation*, or \(...\) */
  text: string;
  className?: string;
}

/** Renders a LaTeX equation. Invalid LaTeX shows in red instead of throwing. */
export function Equation({
  latex,
  display = false,
  className,
}: {
  latex: string;
  display?: boolean;
  className?: string;
}) {
  // KaTeX escapes its input, and trust is off, so this HTML is safe to inject
  const html = useMemo(
    () =>
      katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
      }),
    [latex, display],
  );

  return (
    <span
      className={clsx(display && 'block overflow-x-auto', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Renders text with any embedded LaTeX equations typeset. */
export default function MathText({ text, className }: MathTextProps) {
  const parts = splitMath(text);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.type === 'text' ? (
          <React.Fragment key={index}>{part.content}</React.Fragment>
        ) : (
          <Equation key={index} latex={part.latex} display={part.display} />
        ),
      )}
    </span>
  );
}
