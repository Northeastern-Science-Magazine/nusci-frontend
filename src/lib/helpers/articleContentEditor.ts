import type { ArticleContent, ArticleContentSegment } from '@/lib/types/types';
import { isMediaPath } from '@/lib/helpers/media';

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
  return paragraph.length === 1 && paragraph[0].contentType === 'pull_quote';
}

// Submission saves the uploaded image as the first paragraph, on its own.
// It is edited separately from the body, like pull quotes.
export function splitFeaturedImage(content: ArticleContent[]): {
  featuredImage: string | undefined;
  body: ArticleContent[];
} {
  const [first, ...rest] = content;

  if (
    first?.length === 1 &&
    first[0].contentType === 'image' &&
    isMediaPath(first[0].content)
  ) {
    return { featuredImage: first[0].content, body: rest };
  }

  return { featuredImage: undefined, body: content };
}

export function getPullQuotes(content: ArticleContent[]): string[] {
  return content.filter(isPullQuote).map((paragraph) => paragraph[0].content);
}

// Replace non-breaking spaces from earlier saves so article text can wrap.
export function normalizeArticleSpaces(
  content: ArticleContent[],
): ArticleContent[] {
  return content.map((paragraph) =>
    paragraph.map((segment) =>
      segment.contentType === 'image'
        ? segment
        : { ...segment, content: segment.content.replace(/\u00A0/g, ' ') },
    ),
  );
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

          // Standalone quotes are edited separately. Mixed quote paragraphs
          // cannot safely round-trip through this editor.
          if (segment.contentType === 'pull_quote') {
            throw new Error(
              'This article contains a pull quote mixed into a text paragraph. Its layout needs review before editing.',
            );
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
          segment.contentType === 'image' || segment.content.trim().length > 0,
      )
    ) {
      paragraphs.push(segments);
    }

    segments = [];
  }

  // Quill emits every space as &nbsp;. Saving those as non-breaking spaces
  // stops the article text from wrapping, so store regular spaces instead.
  function normalizeSpaces(value: string): string {
    return value.replace(/\u00A0/g, ' ');
  }

  function addText(value: string) {
    value = normalizeSpaces(value);
    if (!value) return;

    const previous = segments[segments.length - 1];

    if (previous?.contentType === 'text') {
      previous.content += value;
    } else {
      segments.push({ contentType: 'text', content: value });
    }
  }
  // Preserve line breaks inside links.
  function getLinkText(element: HTMLElement): string {
    const clone = element.cloneNode(true) as HTMLElement;

    clone.querySelectorAll('br').forEach((lineBreak) => {
      lineBreak.replaceWith(document.createTextNode('\n'));
    });

    return normalizeSpaces(clone.textContent ?? '');
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
        content: getLinkText(element),
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
