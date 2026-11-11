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
  | {
      type: 'math';
      // What KaTeX renders: the whole environment for display equations
      latex: string;
      display: boolean;
      // The LaTeX inside the delimiters, for rendering a display equation inline
      body: string;
      // The original text, delimiters included
      source: string;
    };

type MathEquation = Extract<MathPart, { type: 'math' }>;

const MATH_PATTERN =
  /\\begin\{(equation\*?)\}([\s\S]+?)\\end\{\1\}|\\\(([\s\S]*?)\\\)/g;

// Split text into plain text and LaTeX equation parts.
export function splitMath(text: string): MathPart[] {
  const parts: MathPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(MATH_PATTERN)) {
    const [whole, environment, displayBody, inline] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, index) });
    }
    lastIndex = index + whole.length;

    const display = environment !== undefined;
    const body = (display ? displayBody : inline).trim();

    // An empty \(\) has nothing to render (saving reports it as an error)
    if (!body) continue;

    // Equation environments are passed whole, so KaTeX can number them.
    parts.push({
      type: 'math',
      latex: display ? whole.trim() : body,
      display,
      body,
      source: whole,
    });
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
}

// Every LaTeX equation in the article, in order (used for the editor preview).
export function findEquations(content: ArticleContent[]): MathEquation[] {
  return content.flatMap((paragraph) =>
    paragraph.flatMap((segment) =>
      segment.contentType === 'text'
        ? splitMath(segment.content).filter(
            (part): part is MathEquation => part.type === 'math',
          )
        : [],
    ),
  );
}

// Shorten text to a word limit without cutting an equation in half.
// Each equation counts as one word.
export function truncateMathText(text: string, wordLimit: number): string {
  let result = '';
  let words = 0;

  for (const part of splitMath(text)) {
    const pieces =
      part.type === 'math' ? [part.source] : part.content.split(/(\s+)/);

    for (const piece of pieces) {
      if (!piece) continue;
      const isSpace = part.type === 'text' && /^\s+$/.test(piece);

      if (!isSpace) {
        if (words >= wordLimit) return result.trimEnd() + '...';
        words++;
      }
      result += piece;
    }
  }

  return text;
}

const TOKEN_PATTERN =
  /\\begin\{(equation\*?)\}|\\end\{(equation\*?)\}|\\\(|\\\)/g;

type EquationScan =
  | { state: 'closed' }
  // An equation environment is opened but not closed yet
  | { state: 'open'; error: string }
  | { state: 'invalid'; error: string };

// Show the start of a broken equation so the writer can find it.
function excerpt(text: string, index: number): string {
  const snippet = text.slice(index).replace(/\s+/g, ' ');
  return snippet.length > 40 ? `${snippet.slice(0, 40)}…` : snippet;
}

// Check that every equation delimiter in the text is opened and closed
// in order, with matching environments.
function scanEquations(text: string): EquationScan {
  // The open display environment, and where it started
  let environment: { name: string; index: number } | null = null;
  // Where the open inline equation started
  let inlineStart: number | null = null;

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    const [token, begin, end] = match;
    const index = match.index ?? 0;

    if (begin !== undefined) {
      if (environment) {
        return {
          state: 'invalid',
          error: `The equation starting "${excerpt(text, environment.index)}" is never closed with \\end{${environment.name}}.`,
        };
      }
      if (inlineStart !== null) break;
      environment = { name: begin, index };
    } else if (end !== undefined) {
      if (inlineStart !== null) break;
      if (!environment) {
        return {
          state: 'invalid',
          error: `"${excerpt(text, index)}" closes an equation that was never started with \\begin{${end}}.`,
        };
      }
      if (end !== environment.name) {
        return {
          state: 'invalid',
          error: `The equation starting "${excerpt(text, environment.index)}" opens with \\begin{${environment.name}} but closes with \\end{${end}}.`,
        };
      }
      environment = null;
    } else if (environment) {
      // \( and \) inside a display equation are left to KaTeX
      continue;
    } else if (token === '\\(') {
      if (inlineStart !== null) break;
      inlineStart = index;
    } else {
      if (inlineStart === null) {
        return {
          state: 'invalid',
          error: `"${excerpt(text, index)}" closes an inline equation that was never started with \\(.`,
        };
      }
      if (!text.slice(inlineStart + 2, index).trim()) {
        return {
          state: 'invalid',
          error: `"${excerpt(text, inlineStart)}" is an empty inline equation.`,
        };
      }
      inlineStart = null;
    }
  }

  if (inlineStart !== null) {
    return {
      state: 'invalid',
      error: `The inline equation starting "${excerpt(text, inlineStart)}" is never closed with \\).`,
    };
  }

  if (environment) {
    return {
      state: 'open',
      error: `The equation starting "${excerpt(text, environment.index)}" is never closed with \\end{${environment.name}}.`,
    };
  }

  return { state: 'closed' };
}

/*
 * The first equation problem in the article, as a message for the writer,
 * or null when every equation is closed. Run on content after
 * joinSplitEquations, so an equation pasted across several lines counts
 * as one.
 */
export function findEquationError(content: ArticleContent[]): string | null {
  for (const [index, paragraph] of content.entries()) {
    for (const segment of paragraph) {
      if (segment.contentType !== 'text') continue;

      const scan = scanEquations(segment.content);
      if (scan.state !== 'closed') {
        return `Paragraph ${index + 1}: ${scan.error}`;
      }
    }
  }

  return null;
}

function paragraphText(paragraph: ArticleContent): string {
  return paragraph
    .filter((segment) => segment.contentType === 'text')
    .map((segment) => segment.content)
    .join('');
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
 * Like joinSplitEquations, and also returns, for each resulting paragraph,
 * the index in the original content where it starts.
 */
export function joinSplitEquationsWithStarts(content: ArticleContent[]): {
  content: ArticleContent[];
  starts: number[];
} {
  const result: ArticleContent[] = [];
  const starts: number[] = [];
  let i = 0;

  while (i < content.length) {
    let paragraph = content[i];
    let end = i;

    if (
      isTextOnly(paragraph) &&
      scanEquations(paragraphText(paragraph)).state === 'open'
    ) {
      let joined = paragraph;
      const last = Math.min(content.length, i + MAX_EQUATION_LINES);
      for (let j = i + 1; j < last; j++) {
        if (!isTextOnly(content[j])) break;
        joined = joinParagraphs(joined, content[j]);

        const { state } = scanEquations(paragraphText(joined));
        if (state === 'open') continue;
        // A new equation starting first means this one was never closed
        if (state === 'closed') {
          paragraph = joined;
          end = j;
        }
        break;
      }
    }

    result.push(paragraph);
    starts.push(i);
    i = end + 1;
  }

  return { content: result, starts };
}

/*
 * Pasting a multi-line equation into Quill splits it into one paragraph per
 * line. Rejoin those lines so the equation is stored, and rendered, as one.
 * Only plain-text lines are joined (no links, quotes or images), so the
 * result is always a single text segment. An equation that is never closed
 * is left as is, and findEquationError reports it.
 */
export function joinSplitEquations(
  content: ArticleContent[],
): ArticleContent[] {
  return joinSplitEquationsWithStarts(content).content;
}
