import type { ArticleContent } from '@/lib/types/types';

/*
 * Equations are stored as LaTeX inside regular text segments:
 *   $$ ... $$  or  \[ ... \]  -> display equation on its own line
 *   \( ... \)                 -> inline equation within a sentence
 * A single $ is not a delimiter, so prices like "$5" stay plain text.
 */

export type MathPart =
  | { type: 'text'; content: string }
  | { type: 'math'; latex: string; display: boolean };

const MATH_PATTERN =
  /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;

// Split text into plain text and LaTeX equation parts.
export function splitMath(text: string): MathPart[] {
  const parts: MathPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(MATH_PATTERN)) {
    const [whole, dollars, brackets, parens] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, index) });
    }

    parts.push({
      type: 'math',
      latex: (dollars ?? brackets ?? parens).trim(),
      display: parens === undefined,
    });
    lastIndex = index + whole.length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
}

export function hasMath(text: string): boolean {
  return splitMath(text).some((part) => part.type === 'math');
}

// Every LaTeX equation in the article, in order (used for the editor preview).
export function findEquations(
  content: ArticleContent[],
): Extract<MathPart, { type: 'math' }>[] {
  return content.flatMap((paragraph) =>
    paragraph.flatMap((segment) =>
      segment.contentType === 'text'
        ? splitMath(segment.content).filter(
            (part): part is Extract<MathPart, { type: 'math' }> =>
              part.type === 'math',
          )
        : [],
    ),
  );
}

function paragraphText(paragraph: ArticleContent): string {
  return paragraph
    .filter((segment) => segment.contentType === 'text')
    .map((segment) => segment.content)
    .join('');
}

// True when a display equation is opened but not closed in this text.
function hasOpenDisplayMath(text: string): boolean {
  const dollars = (text.match(/\$\$/g) ?? []).length;
  const opens = (text.match(/\\\[/g) ?? []).length;
  const closes = (text.match(/\\\]/g) ?? []).length;
  return dollars % 2 === 1 || opens > closes;
}

function joinParagraphs(
  first: ArticleContent,
  second: ArticleContent,
): ArticleContent {
  const last = first[first.length - 1];
  const [next, ...rest] = second;

  if (last?.contentType === 'text' && next?.contentType === 'text') {
    return [
      ...first.slice(0, -1),
      { ...last, content: `${last.content}\n${next.content}` },
      ...rest,
    ];
  }

  return [...first, ...second];
}

/*
 * Pasting a multi-line equation into Quill splits it into one paragraph per
 * line. Rejoin those lines so the equation is stored, and rendered, as one.
 * An equation that is never closed is left as is.
 */
export function joinSplitEquations(
  content: ArticleContent[],
): ArticleContent[] {
  const result: ArticleContent[] = [];
  let i = 0;

  while (i < content.length) {
    let paragraph = content[i];
    let end = i;

    if (hasOpenDisplayMath(paragraphText(paragraph))) {
      let joined = paragraph;
      for (let j = i + 1; j < content.length; j++) {
        // never pull a quote or image into an equation
        if (content[j].some((segment) => segment.contentType !== 'text')) {
          break;
        }
        joined = joinParagraphs(joined, content[j]);
        if (!hasOpenDisplayMath(paragraphText(joined))) {
          paragraph = joined;
          end = j;
          break;
        }
      }
    }

    result.push(paragraph);
    i = end + 1;
  }

  return result;
}
