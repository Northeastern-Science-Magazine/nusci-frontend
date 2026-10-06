'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import TextInput from '@/design-system/primitives/TextInput';
import Button from '@/design-system/primitives/Button';
import { Dropdown } from '@/design-system/primitives/Dropdown';
import { SourcesInput } from '@/app/internal/article-submission/components/SourcesInput';

import { updateArticle } from '@/lib/api/articles';
import type { BasicUser } from '@/lib/api/users';
import {
  Category,
  type Article,
  type ArticleContentSegment,
  type ArticleUpdate,
} from '@/lib/types/types';

type ArticleEditFormProps = {
  article: Article;
  basicUsers: BasicUser[];
};

// Only accept http and https URLs for sources, links, and images.
function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Separate form for editing an existing article.
 * Preserves paragraph segments and displays save, success, and error states.
 */
export default function ArticleEditForm({
  article,
  basicUsers,
}: ArticleEditFormProps) {
  const router = useRouter();
  // Prevent duplicate submissions before the saving state updates.
  const saving = useRef(false);

  const [values, setValues] = useState<ArticleUpdate>(() => ({
    title: article.title,
    issueNumber: article.issueNumber,
    authors: (article.authors ?? []).map((author) => author.email),
    categories: [...article.categories],
    articleContent: (article.articleContent ?? []).map((paragraph) =>
      paragraph.map((segment) => ({ ...segment })),
    ),
    // Existing records may contain null source titles or URLs.
    sources: (article.sources ?? []).map((source) => ({
      text: source.text ?? '',
      href: source.href ?? '',
    })),
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Update a field and clear feedback from the previous save attempt.
  function changeField<K extends keyof ArticleUpdate>(
    field: K,
    value: ArticleUpdate[K],
  ) {
    if (saving.current) return;

    setValues((previous) => ({ ...previous, [field]: value }));
    setError(null);
    setSuccess(false);
  }

  // Update one segment while preserving the remaining paragraphs and segments.
  function changeSegment(
    paragraphIndex: number,
    segmentIndex: number,
    changes: Partial<ArticleContentSegment>,
  ) {
    changeField(
      'articleContent',
      values.articleContent.map((paragraph, currentParagraph) =>
        paragraph.map((segment, currentSegment) =>
          currentParagraph === paragraphIndex && currentSegment === segmentIndex
            ? { ...segment, ...changes }
            : segment,
        ),
      ),
    );
  }

  // Keep existing authors available even if missing from the user list.
  const authorOptions = Array.from(
    new Map(
      [
        ...basicUsers.map((user) => ({
          label: user.name,
          value: user.email,
        })),
        ...(article.authors ?? []).map((author) => ({
          label: `${author.firstName} ${author.lastName}`.trim(),
          value: author.email,
        })),
      ].map((option) => [option.value, option]),
    ).values(),
  );

  // Include existing categories even if they are absent from the current enum.
  const categoryOptions = Array.from(
    new Set([...Object.values(Category), ...article.categories]),
  ).map((category) => ({
    label: category,
    value: category,
  }));

  // Validates the form and submits changes without discarding edits on failure.
  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving.current) return;

    setError(null);
    setSuccess(false);

    if (!values.title.trim()) {
      setError('Please enter a title.');
      return;
    }

    // TODO(BACKEND-339): Confirm whether an existing issue number
    // can be cleared and what value the backend expects for that.
    if (article.issueNumber !== undefined && values.issueNumber === undefined) {
      setError('Please enter an issue number for this article.');
      return;
    }

    if (
      values.issueNumber !== undefined &&
      (!Number.isInteger(values.issueNumber) || values.issueNumber < 1)
    ) {
      setError('Please enter a valid issue number.');
      return;
    }

    if (!values.authors.length || !values.categories.length) {
      setError('Select at least one author and category.');
      return;
    }

    if (
      !values.articleContent.some((paragraph) =>
        paragraph.some((segment) => segment.content.trim()),
      )
    ) {
      setError('Please enter article content.');
      return;
    }

    const sources = values.sources
      .map((source) => ({
        text: (source.text ?? '').trim(),
        href: (source.href ?? '').trim(),
      }))
      .filter((source) => source.text || source.href);

    if (sources.some((source) => !source.text || !source.href)) {
      setError('Each source needs both a title and URL.');
      return;
    }

    const invalidContentUrl = values.articleContent.some((paragraph) =>
      paragraph.some((segment) => {
        if (segment.contentType === 'link') {
          return !isHttpUrl(segment.href ?? '');
        }

        if (segment.contentType === 'image') {
          return !isHttpUrl(segment.content);
        }

        return false;
      }),
    );

    if (
      sources.some((source) => !isHttpUrl(source.href)) ||
      invalidContentUrl
    ) {
      setError('Sources, links, and images need valid http or https URLs.');
      return;
    }

    saving.current = true;
    setIsSaving(true);

    try {
      // Backend endpoint details are handled in updateArticle().
      const result = await updateArticle(article.slug, {
        ...values,
        title: values.title.trim(),
        sources,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError('Unable to save changes. Please try again.');
    } finally {
      saving.current = false;
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <fieldset disabled={isSaving} className="space-y-6">
        <TextInput
          label="Title"
          value={values.title}
          onChange={(value) => changeField('title', value)}
        />

        <div>
          <label htmlFor="issueNumber" className="mb-2 block">
            Issue number
          </label>

          <input
            id="issueNumber"
            type="number"
            min={1}
            step={1}
            value={values.issueNumber ?? ''}
            onChange={(event) =>
              changeField(
                'issueNumber',
                event.target.value === ''
                  ? undefined
                  : Number(event.target.value),
              )
            }
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <p className="mb-2">Authors</p>

          {isSaving ? (
            <p>Saving selections…</p>
          ) : (
            <Dropdown
              color="black"
              typeahead
              multiSelect
              options={authorOptions}
              value={values.authors}
              placeholder="Select authors"
              onChange={(value) =>
                changeField(
                  'authors',
                  Array.isArray(value) ? value : value ? [value] : [],
                )
              }
            />
          )}
        </div>

        <div>
          <p className="mb-2">Categories</p>

          {isSaving ? (
            <p>Saving selections…</p>
          ) : (
            <Dropdown
              color="black"
              multiSelect
              options={categoryOptions}
              value={values.categories}
              placeholder="Select categories"
              onChange={(value) =>
                changeField(
                  'categories',
                  Array.isArray(value) ? value : value ? [value] : [],
                )
              }
            />
          )}
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold">Article content</h2>

          {values.articleContent.map((paragraph, paragraphIndex) => (
            <div key={paragraphIndex} className="space-y-3 rounded border p-4">
              <h3>Paragraph {paragraphIndex + 1}</h3>

              {paragraph.map((segment, segmentIndex) => (
                <div
                  key={segmentIndex}
                  className="space-y-2 rounded border p-3"
                >
                  <label className="block">
                    Segment type
                    <select
                      value={segment.contentType}
                      className="ml-2 rounded border p-2"
                      onChange={(event) =>
                        changeSegment(paragraphIndex, segmentIndex, {
                          contentType: event.target
                            .value as ArticleContentSegment['contentType'],
                        })
                      }
                    >
                      <option value="text">Text</option>
                      <option value="pull_quote">Pull quote</option>
                      <option value="image">Image URL</option>
                      <option value="link">Link</option>
                    </select>
                  </label>

                  <label
                    htmlFor={`content-${paragraphIndex}-${segmentIndex}`}
                    className="block"
                  >
                    {segment.contentType === 'image'
                      ? 'Image URL'
                      : segment.contentType === 'pull_quote'
                        ? 'Pull quote'
                        : segment.contentType === 'link'
                          ? 'Link text'
                          : 'Text'}
                  </label>

                  <textarea
                    id={`content-${paragraphIndex}-${segmentIndex}`}
                    value={segment.content}
                    onChange={(event) =>
                      changeSegment(paragraphIndex, segmentIndex, {
                        content: event.target.value,
                      })
                    }
                    rows={segment.contentType === 'text' ? 4 : 2}
                    className="w-full rounded border p-2"
                  />

                  {segment.contentType === 'link' && (
                    <TextInput
                      label="Link URL"
                      value={segment.href ?? ''}
                      onChange={(value) =>
                        changeSegment(paragraphIndex, segmentIndex, {
                          href: value,
                        })
                      }
                    />
                  )}

                  <Button
                    type="button"
                    color="border"
                    onClick={() =>
                      changeField(
                        'articleContent',
                        values.articleContent.map((existing, index) =>
                          index === paragraphIndex
                            ? existing.filter(
                                (_, index) => index !== segmentIndex,
                              )
                            : existing,
                        ),
                      )
                    }
                  >
                    Remove segment
                  </Button>
                </div>
              ))}

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  color="border"
                  onClick={() =>
                    changeField(
                      'articleContent',
                      values.articleContent.map((existing, index) =>
                        index === paragraphIndex
                          ? [
                              ...existing,
                              {
                                contentType: 'text' as const,
                                content: '',
                              },
                            ]
                          : existing,
                      ),
                    )
                  }
                >
                  Add segment
                </Button>

                <Button
                  type="button"
                  color="border"
                  onClick={() =>
                    changeField(
                      'articleContent',
                      values.articleContent.filter(
                        (_, index) => index !== paragraphIndex,
                      ),
                    )
                  }
                >
                  Remove paragraph
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            color="border"
            onClick={() =>
              changeField('articleContent', [
                ...values.articleContent,
                [{ contentType: 'text', content: '' }],
              ])
            }
          >
            Add paragraph
          </Button>
        </section>

        <SourcesInput
          value={values.sources}
          onChange={(sources) => changeField('sources', sources)}
          disabled={isSaving}
        />

        <Button type="submit" color="forest-green" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save changes'}
        </Button>
      </fieldset>

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-green-700">
          Changes saved.
        </p>
      )}
    </form>
  );
}
