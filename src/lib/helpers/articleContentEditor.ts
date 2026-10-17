import type {
  ArticleContent,
  ArticleContentSegment,
} from '@/lib/types/types';

// Escape saved text before placing it inside editor HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Standalone pull quotes are edited separately, like in submission.
function isPullQuote(paragraph: ArticleContent): boolean {
  return (
    paragraph.length === 1 &&
    paragraph[0].contentType === 'pull_quote'
  );
}

export function getPullQuotes(content: ArticleContent[]): string[] {
  return content
    .filter(isPullQuote)
    .map((paragraph) => paragraph[0].content);
}

// Convert saved paragraphs into the HTML expected by ArticleInput.
export function articleContentToHtml(content: ArticleContent[]): string {
  return content
    .filter((paragraph) => !isPullQuote(paragraph))
    .map((paragraph) => {
      const html = paragraph
        .map((segment) => {
          // Preserve line breaks when loading saved text into the editor.
          const text = escapeHtml(segment.content).replace(/\r?\n/g, '<br>');

          if (segment.contentType === 'image') {
            if (!isHttpUrl(segment.content)) {
              throw new Error(
                'An existing image has an unsupported URL. It has not been changed.',
              );
            }

            return `<img src="${escapeHtml(segment.content)}" />`;
          }

          if (segment.contentType === 'link') {
            if (!isHttpUrl(segment.href ?? '')) {
              throw new Error(
                'An existing link has an unsupported URL. It has not been changed.',
              );
            }

            return `<a href="${escapeHtml(segment.href!)}">${text}</a>`;
          }

          // Preserve an inline quote if an older article contains one.
          if (segment.contentType === 'pull_quote') {
            return `<blockquote>${text}</blockquote>`;
          }

          return text;
        })
        .join('');

      return `<p>${html}</p>`;
    })
    .join('');
}

// Convert editor HTML back into backend paragraphs and segments.
export function htmlToArticleContent(html: string): ArticleContent[] {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs: ArticleContent[] = [];
  let segments: ArticleContent = [];

  function flushParagraph() {
    if (
      segments.some(
        (segment) =>
          segment.contentType === 'image' ||
          segment.content.trim().length > 0,
      )
    ) {
      paragraphs.push(segments);
    }

    segments = [];
  }

  function addText(value: string) {
    if (!value) return;

    const previous = segments[segments.length - 1];

    if (previous?.contentType === 'text') {
      previous.content += value;
    } else {
      segments.push({ contentType: 'text', content: value });
    }
  }

  function walk(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      addText(node.textContent ?? '');
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const element = node as HTMLElement;
    const tag = element.tagName;

    if (tag === 'SCRIPT' || tag === 'STYLE') return;

    if (tag === 'A') {
      const href = element.getAttribute('href') ?? '';

      if (!isHttpUrl(href)) {
        throw new Error('Article links need valid http or https URLs.');
      }

      segments.push({
        contentType: 'link',
        content: element.textContent ?? '',
        href,
      });
      return;
    }

    if (tag === 'IMG') {
      const src = element.getAttribute('src') ?? '';

      if (!isHttpUrl(src)) {
        throw new Error('Article images need valid http or https URLs.');
      }

      segments.push({ contentType: 'image', content: src });
      return;
    }

    if (tag === 'BR') {
      addText('\n');
      return;
    }

    if (tag === 'BLOCKQUOTE') {
      flushParagraph();
      paragraphs.push([
        {
          contentType: 'pull_quote',
          content: element.textContent ?? '',
        },
      ]);
      return;
    }

    const isBlock = [
      'P',
      'DIV',
      'LI',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
    ].includes(tag);

    if (isBlock) flushParagraph();

    element.childNodes.forEach(walk);

    if (isBlock) flushParagraph();
  }

  document.body.childNodes.forEach(walk);
  flushParagraph();

  return paragraphs;
}

// Keep existing quotes near their original paragraph positions.
// Newly added quotes are placed at the end.
export function restorePullQuotes(
  body: ArticleContent[],
  quotes: string[],
  originalContent: ArticleContent[],
): ArticleContent[] {
  const result = [...body];

  const originalPositions = originalContent
    .map((paragraph, index) => (isPullQuote(paragraph) ? index : -1))
    .filter((index) => index !== -1);

  quotes
    .map((quote, index) => ({ quote: quote.trim(), index }))
    .filter(({ quote }) => quote.length > 0)
    .forEach(({ quote, index }) => {
      const position = Math.min(
        originalPositions[index] ?? result.length,
        result.length,
      );

      const segment: ArticleContentSegment = {
        contentType: 'pull_quote',
        content: quote,
      };

      result.splice(position, 0, [segment]);
    });

  return result;
}