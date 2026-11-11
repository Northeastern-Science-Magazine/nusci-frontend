import type { ArticleContent } from '@/lib/types/types';

/*
 * Equations are stored as LaTeX inside regular text segments:
 *   \begin{equation} ... \end{equation}   -> numbered equation on its own line
 *   \begin{equation*} ... \end{equation*} -> unnumbered equation on its own line
 *   \( ... \)                             -> inline equation within a sentence
 * Dollar signs are never delimiters, so prose like "$5" or "US$$" stays text.
 */

export type MathPart =
  | { type: 'text'; content: string }
  | { type: 'math'; latex: string; display: boolean };

const MATH_PATTERN =
  /\\begin\{(equation\*?)\}[\s\S]+?\\end\{\1\}|\\\(([\s\S]+?)\\\)/g;

// Split text into plain text and LaTeX equation parts.
export function splitMath(text: string): MathPart[] {
  const parts: MathPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(MATH_PATTERN)) {
    const [whole, environment, inline] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, index) });
    }

    // Equation environments are passed whole, so KaTeX can number them.
    parts.push({
      type: 'math',
      latex: environment ? whole.trim() : inline.trim(),
      display: environment !== undefined,
    });
    lastIndex = index + whole.length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
}

// Text with every equation removed, for places that cannot typeset LaTeX.
export function mathToPlainText(text: string): string {
  return splitMath(text)
    .map((part) => (part.type === 'text' ? part.content : ' '))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
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

// True when an equation environment is opened but not closed in this text.
function hasOpenEquation(text: string): boolean {
  const opens = (text.match(/\\begin\{equation\*?\}/g) ?? []).length;
  const closes = (text.match(/\\end\{equation\*?\}/g) ?? []).length;
  return opens > closes;
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

function isTextOnly(paragraph: ArticleContent): boolean {
  return paragraph.every((segment) => segment.contentType === 'text');
}

// Longest equation, in lines, that will be rejoined.
const MAX_EQUATION_LINES = 30;

/*
 * Pasting a multi-line equation into Quill splits it into one paragraph per
 * line. Rejoin those lines so the equation is stored, and rendered, as one.
 * Only plain-text lines are joined (no links, quotes or images), so the
 * result is always a single text segment. An equation that is never closed
 * is left as is. LaTeX that crosses a link inside one paragraph is not
 * valid and stays as raw text.
 */
export function joinSplitEquations(
  content: ArticleContent[],
): ArticleContent[] {
  const result: ArticleContent[] = [];
  let i = 0;

  while (i < content.length) {
    let paragraph = content[i];
    let end = i;

    if (isTextOnly(paragraph) && hasOpenEquation(paragraphText(paragraph))) {
      let joined = paragraph;
      const last = Math.min(content.length, i + MAX_EQUATION_LINES);
      for (let j = i + 1; j < last; j++) {
        if (!isTextOnly(content[j])) break;
        joined = joinParagraphs(joined, content[j]);
        if (!hasOpenEquation(paragraphText(joined))) {
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
