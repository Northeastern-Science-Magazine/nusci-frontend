'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';
import TextInput from '@/design-system/primitives/TextInput';
import Checkbox from '@/design-system/primitives/Checkbox';
import Button from '@/design-system/primitives/Button';
import { Dropdown } from '@/design-system/primitives/Dropdown';

import ArticleInput from '@/app/internal/article-submission/components/ArticleInput';
import { EditPullQuoteInput } from './EditInputs';
import { SourcesInput } from '@/app/internal/article-submission/components/SourcesInput';

import { updateArticle } from '@/lib/api/articles';
import type { BasicUser } from '@/lib/api/users';
import {
  Category,
  type Article,
  type ArticleSource,
} from '@/lib/types/types';

import {
  articleContentToHtml,
  getPullQuotes,
  htmlToArticleContent,
  restorePullQuotes,
} from '@/lib/helpers/articleContentEditor';

type ArticleEditFormProps = {
  article: Article;
  basicUsers: BasicUser[];
};

type EditValues = {
  title: string;
  issueNumber: number | undefined;
  authors: string[];
  categories: string[];
  content: string;
  pullQuotes: string[];
  noPullQuotes: boolean;
  sources: ArticleSource[];
  noSources: boolean;
};

// Only accept http and https URLs for sources.
function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Uses the submission form's input components with existing article values.
 * Converts editor HTML into backend content before saving.
 */
export default function ArticleEditForm({
  article,
  basicUsers,
}: ArticleEditFormProps) {
  const router = useRouter();

  // Prevent duplicate requests before the saving state updates.
  const saving = useRef(false);

  // Load saved content into the same editor used for submission.
  const [initialEditor] = useState(() => {
    try {
      return {
        html: articleContentToHtml(article.articleContent ?? []),
        error: null as string | null,
      };
    } catch (error) {
      return {
        html: '',
        error:
          error instanceof Error
            ? error.message
            : 'Unable to load article content.',
      };
    }
  });

  const [values, setValues] = useState<EditValues>(() => {
    const pullQuotes = getPullQuotes(article.articleContent ?? []);
    const sources = (article.sources ?? []).map((source) => ({
      text: source.text ?? '',
      href: source.href ?? '',
    }));

    return {
      title: article.title,
      issueNumber: article.issueNumber ?? undefined,
      authors: (article.authors ?? []).map((author) => author.email),
      categories: [...(article.categories ?? [])],
      content: initialEditor.html,
      pullQuotes,
      noPullQuotes: pullQuotes.length === 0,
      sources,
      noSources: sources.length === 0,
    };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update a field and clear the previous error.
  function changeField<K extends keyof EditValues>(
    field: K,
    value: EditValues[K],
  ) {
    if (saving.current) return;

    setValues((previous) => ({ ...previous, [field]: value }));
    setError(null);
  }

  // Keep existing authors available even if absent from the user list.
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

  const labelForEmail = (email: string) =>
    authorOptions.find((option) => option.value === email)?.label ??
    email;

  // Match submission's options and retain the article's existing issue.
  const issueOptions = [
    { label: 'Issue 67: Intrepid', value: '67' },
    { label: 'Issue 68: Dissonance', value: '68' },
  ];

  if (
    article.issueNumber != null &&
    !issueOptions.some(
      (option) => option.value === String(article.issueNumber),
    )
  ) {
    issueOptions.push({
      label: `Issue ${article.issueNumber}`,
      value: String(article.issueNumber),
    });
  }

  const categoryOptions = Array.from(
    new Set([
      ...Object.values(Category),
      ...(article.categories ?? []),
    ]),
  );

  // Validate edited fields and preserve unchanged saved content.
  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving.current) return;

    setError(null);

    if (!values.title.trim()) {
      setError('Please enter a title.');
      return;
    }

    // Older articles may have no issue assigned.
    if (
      values.issueNumber !== undefined &&
      (!Number.isInteger(values.issueNumber) || values.issueNumber < 1)
    ) {
      setError('Please select a valid issue.');
      return;
    }

    if (!values.authors.length || !values.categories.length) {
      setError('Select at least one author and category.');
      return;
    }

    if (
      !values.noPullQuotes &&
      !values.pullQuotes.some((quote) => quote.trim())
    ) {
      setError('Enter a pull quote or select no pull quotes.');
      return;
    }

    const originalSources = (article.sources ?? []).map((source) => ({
      text: source.text ?? '',
      href: source.href ?? '',
    }));

    const sourcesChanged =
      values.noSources !== (originalSources.length === 0) ||
      JSON.stringify(values.sources) !== JSON.stringify(originalSources);

    // Do not force users to repair old sources when editing another field.
    const sources = !sourcesChanged
      ? originalSources
      : values.noSources
        ? []
        : values.sources
            .map((source) => ({
              text: (source.text ?? '').trim(),
              href: (source.href ?? '').trim(),
            }))
            .filter((source) => source.text || source.href);

    if (sourcesChanged) {
      if (!values.noSources && !sources.length) {
        setError('Enter a source or select no sources.');
        return;
      }

      if (
        sources.some(
          (source) => !source.text || !source.href || !isHttpUrl(source.href),
        )
      ) {
        setError('Each source needs a title and a valid http or https URL.');
        return;
      }
    }

    saving.current = true;
    setIsSaving(true);

    try {
      const originalContent = article.articleContent ?? [];

      // Compare parsed content because the editor may normalize HTML
      // when loading, without the user changing the article.
      const body = htmlToArticleContent(values.content);
      const initialBody = htmlToArticleContent(initialEditor.html);

      const contentChanged =
        JSON.stringify(body) !== JSON.stringify(initialBody);

      const originalQuotes = getPullQuotes(originalContent);
      const quotesChanged =
        values.noPullQuotes !== (originalQuotes.length === 0) ||
        JSON.stringify(values.pullQuotes) !== JSON.stringify(originalQuotes);

      if (contentChanged && !body.length) {
        setError('Please enter article content.');
        return;
      }

      // Keep the original structure intact when only metadata is edited.
      let articleContent = originalContent;

      if (contentChanged || quotesChanged) {
        const bodyWithoutQuotes = contentChanged
          ? body
          : originalContent.filter(
              (paragraph) =>
                !(
                  paragraph.length === 1 &&
                  paragraph[0].contentType === 'pull_quote'
                ),
            );

        articleContent = restorePullQuotes(
          bodyWithoutQuotes,
          values.noPullQuotes ? [] : values.pullQuotes,
          originalContent,
        );
      }

      const result = await updateArticle(
        article.slug,
        {
          title: values.title.trim(),
          issueNumber: values.issueNumber,
          authors: values.authors,
          categories: values.categories,
          articleContent,
          sources,
        },
        new Date(article.modificationTime).toISOString(),
      );

      if (!result.ok) {
        setError(result.error);
        return;
      }

      // Updating the title does not change the article's URL.
      router.push(`/${encodeURIComponent(article.slug)}`);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to save changes. Please try again.',
      );
    } finally {
      saving.current = false;
      setIsSaving(false);
    }
  }

  return (
    <Box className="mx-auto w-full max-w-3xl px-4 py-8">
      <form onSubmit={handleSave}>
        <Box className="space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <Text
            color="sage-green"
            size={36}
            style="bold"
            className="mb-8 text-left"
          >
            Edit an Article
          </Text>

          <fieldset
            disabled={isSaving}
            className="min-w-0 space-y-8"
          >
            {/* Issue Number */}
            <div className="flex flex-col gap-1">
              <Text size={16} color="black">
                Issue Number
              </Text>
              <Dropdown
                color="black"
                options={issueOptions}
                value={
                  values.issueNumber === undefined
                    ? ''
                    : String(values.issueNumber)
                }
                placeholder="Select issue"
                onChange={(value) =>
                  changeField(
                    'issueNumber',
                    typeof value === 'string' && value
                      ? Number(value)
                      : undefined,
                  )
                }
              />
            </div>

            {/* Title */}
            <TextInput
              placeholder="Enter article title"
              label="Title"
              className="w-full"
              value={values.title}
              onChange={(value) => changeField('title', value)}
            />

            {/* Authors */}
            <div className="flex flex-col gap-1">
              <Text size={16} color="black">
                Authors
              </Text>
              <Dropdown
                color="black"
                typeahead
                multiSelect
                options={authorOptions}
                value={values.authors}
                placeholder="Search authors…"
                onChange={(value) =>
                  changeField(
                    'authors',
                    Array.isArray(value)
                      ? value
                      : value
                        ? [value]
                        : [],
                  )
                }
              />

              {values.authors.length > 0 && (
                <Box className="mt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Text
                      size={14}
                      color="black"
                      className="mr-2 opacity-70"
                    >
                      Selected authors:
                    </Text>

                    {values.authors.map((email) => (
                      <Box
                        key={email}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-forest-green/30 bg-forest-green/10 px-4 py-1.5 text-sm text-forest-green transition-colors hover:bg-forest-green/20"
                      >
                        <span>{labelForEmail(email)}</span>
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() =>
                            changeField(
                              'authors',
                              values.authors.filter(
                                (author) => author !== email,
                              ),
                            )
                          }
                          className="rounded-full p-0.5 transition-colors hover:bg-forest-green/20"
                          aria-label={`Remove ${labelForEmail(email)}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Box>
                    ))}
                  </div>
                </Box>
              )}
            </div>

            {/* Categories */}
            <div>
              <label>Categories</label>
              <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0">
                <Checkbox
                  options={categoryOptions}
                  value={values.categories}
                  onChange={(value) =>
                    changeField('categories', value)
                  }
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Content */}
            <ArticleInput
              value={values.content}
              onChange={(value) => changeField('content', value)}
            />

            {/* Pull Quotes */}
            <div className="space-y-3">
              <EditPullQuoteInput
                value={values.pullQuotes}
                onChange={(value) => changeField('pullQuotes', value)}
                disabled={isSaving || values.noPullQuotes}
              />
              <Checkbox
                options={['This article has no pull quotes']}
                value={
                  values.noPullQuotes
                    ? ['This article has no pull quotes']
                    : []
                }
                onChange={(value) =>
                  changeField(
                    'noPullQuotes',
                    value.includes('This article has no pull quotes'),
                  )
                }
                disabled={isSaving}
              />
            </div>

            {/* Sources */}
            <div className="space-y-3">
              <SourcesInput
                value={values.sources}
                onChange={(value) => changeField('sources', value)}
                placeholder="Enter source URL or citation"
                disabled={isSaving || values.noSources}
              />
              <Checkbox
                options={['This article has no sources']}
                value={
                  values.noSources
                    ? ['This article has no sources']
                    : []
                }
                onChange={(value) =>
                  changeField(
                    'noSources',
                    value.includes('This article has no sources'),
                  )
                }
                disabled={isSaving}
              />
            </div>

            {/* Save button without the submission progress sidebar. */}
            <Button
              type="submit"
              color="forest-green"
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? 'Saving…' : 'Save changes'}
            </Button>
          </fieldset>

          {error && (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          )}
        </Box>
      </form>
    </Box>
  );
}