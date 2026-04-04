"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Form, FormField } from "../../../design-system/primitives/Form/Form";
import { useWatch } from "react-hook-form";
import Box from "@/design-system/primitives/Box";
import { Grid, GridCol } from "@/design-system/primitives/Grid";
import TextInput from "@/design-system/primitives/TextInput";
import Checkbox from "@/design-system/primitives/Checkbox";
import Text from "@/design-system/primitives/Text";
import Button from "@/design-system/primitives/Button";
import { ProgressSidebar } from "./components/ProgressSidebar";
import { SourcesInput } from "./components/SourcesInput";
import { Controller } from "react-hook-form";
import ImageUpload from "@/design-system/components/ImageUpload";
import ArticleInput from "./components/ArticleInput";
import { PullQuoteInput } from "./components/PullQuoteInput";
import {
  Category,
  ArticleSource,
  ArticleContent,
  ArticleContentSegment,
  ArticleStatus,
  WritingStatus,
  DesignStatus,
  PhotographyStatus,
  ArticleComment,
  ArticleCreate,
} from "@/lib/types/types";
import { Dropdown, type DropdownOption } from "@/design-system/primitives/Dropdown";
import { Dialog, DialogWindow } from "@/design-system/primitives/Dialog";
import Icon from "@/design-system/primitives/Icon";
import { createArticle } from "@/lib/api/articles";
import type { BasicUser } from "@/lib/api/users";
import { X } from "lucide-react";

type ArticleSubmissionFormValues = {
  authors: string[];
  title: string;
  issueNumber: number;
  categories: string[];
  content: string;
  pullQuotes: string[];
  image?: File;
  sources: ArticleSource[];
};

function reactQuillHtmlToArticleContent(html: string): ArticleContent[] {
  if (!html) return [];

  const normalize = (s: string) =>
    s
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const doc = new DOMParser().parseFromString(html, "text/html");

  return [...doc.querySelectorAll("p")]
    .map((p) => {
      const segments: ArticleContentSegment[] = [];
      let buf = "";

      const flush = () => {
        const text = normalize(buf);
        if (text) segments.push({ contentType: "text", content: text });
        buf = "";
      };

      const walk = (node: Node): void => {
        if (node.nodeType === Node.TEXT_NODE) {
          buf += node.textContent ?? "";
          return;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return;

        const el = node as HTMLElement;

        if (el.tagName === "A") {
          flush();
          const text = normalize(el.textContent ?? "");
          const href = el.getAttribute("href") || undefined;
          if (text || href) segments.push({ contentType: "link", content: text, href });
          return;
        }

        for (const child of el.childNodes) walk(child);
      };

      for (const n of p.childNodes) walk(n);
      flush();

      return segments.length ? (segments as ArticleContent) : null;
    })
    .filter((p): p is ArticleContent => !!p);
}

type FormProgress = {
  author: boolean;
  title: boolean;
  issueNumber?: boolean;
  categories: boolean;
  content: boolean;
  pullQuotes: boolean;
  sources: boolean;
};

type ArticleSubmissionFormProps = {
  basicUsers: BasicUser[];
  defaultAuthorEmails: string[];
};

/* FORM CONTENT COMPONENT */
const FormContent = ({
  authorOptions,
  defaultAuthorEmails,
}: {
  authorOptions: DropdownOption[];
  defaultAuthorEmails: string[];
}) => {
  const [progress, setProgress] = useState<FormProgress>({
    author: defaultAuthorEmails.length > 0,
    title: false,
    categories: false,
    content: false,
    pullQuotes: false,
    sources: false,
  });

  const watchedFields = useWatch<ArticleSubmissionFormValues>();

  useEffect(() => {
    const updateProgress = () => {
      setProgress({
        author: Array.isArray(watchedFields.authors) && watchedFields.authors.length > 0,
        title: !!watchedFields.title && watchedFields.title.trim().length > 0,
        issueNumber: !!watchedFields.issueNumber && watchedFields.issueNumber > 0,
        categories:
          Array.isArray(watchedFields.categories) &&
          watchedFields.categories.length > 0 &&
          watchedFields.categories[0]?.trim().length > 0,
        content:
          !!watchedFields.content &&
          watchedFields.content
            .replace(/<[^>]+>/g, " ")
            .replace(/\u200B/g, "")
            .replace(/\s+/g, " ")
            .trim().length > 0,
        pullQuotes: Array.isArray(watchedFields.pullQuotes) && watchedFields.pullQuotes.some((q) => q && q.trim().length > 0),
        sources:
          Array.isArray(watchedFields.sources) &&
          watchedFields.sources.length > 0 &&
          (watchedFields.sources[0]?.href?.trim()?.length ?? 0) > 0,
      });
    };
    updateProgress();
  }, [watchedFields]);

  return (
    <Grid col span={3} gap={8}>
      <GridCol span={2}>
        <Box className="space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <Text color="sage-green" size={36} style="bold" className="mb-8 text-left">
            Submit an Article
          </Text>

          {/* Issue Number */}
          <div id="issue-number" className="scroll-mt-[80px]">
            <Controller
              name="issueNumber"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Text size={16} color="black">
                    Issue Number
                  </Text>
                  <Dropdown
                    color="black"
                    options={[
                      { label: "Issue 67: Intrepid", value: "67" },
                      { label: "Issue 68: Dissonance", value: "68" },
                    ]}
                    defaultValue={"68"}
                    placeholder="Select issue"
                    onChange={(value) => {
                      const num = typeof value === "string" && value ? Number(value) : NaN;
                      field.onChange(Number.isNaN(num) ? undefined : num);
                    }}
                  />
                </div>
              )}
            />
          </div>

          {/* Title */}
          <div id="title" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="title">
              <TextInput placeholder="Enter article title" label="Title" className="w-full" />
            </FormField>
          </div>

          {/* Authors */}
          <div id="author" className="scroll-mt-[80px]">
            <Controller
              name="authors"
              render={({ field }) => {
                const selectedEmails = field.value ?? [];
                const labelForEmail = (email: string) => authorOptions.find((o) => o.value === email)?.label ?? email;

                return (
                  <div className="flex flex-col gap-1">
                    <Text size={16} color="black">
                      Authors
                    </Text>
                    <Dropdown
                      color="black"
                      typeahead
                      multiSelect
                      options={authorOptions}
                      value={selectedEmails}
                      placeholder={authorOptions.length ? "Search authors…" : "Loading authors…"}
                      onChange={(value) => {
                        field.onChange(Array.isArray(value) ? value : value ? [value] : []);
                      }}
                    />
                    {selectedEmails.length > 0 && (
                      <Box className="mt-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Text size={14} color="black" className="mr-2 opacity-70">
                            Selected authors:
                          </Text>
                          {selectedEmails.map((email: string) => (
                            <Box
                              key={email}
                              className="inline-flex items-center gap-2 rounded-full border-2 border-forest-green/30 bg-forest-green/10 px-4 py-1.5 text-sm text-forest-green transition-colors hover:bg-forest-green/20"
                            >
                              <span>{labelForEmail(email)}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(selectedEmails.filter((e: string) => e !== email));
                                }}
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
                );
              }}
            />
          </div>

          {/* Categories */}
          <div id="categories" className="scroll-mt-[80px]">
            <Controller
              name="categories"
              render={({ field }) => (
                <div>
                  <label>{"Categories"}</label>
                  <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0">
                    <Checkbox options={Object.values(Category)} value={field.value || []} onChange={field.onChange} />
                  </div>
                </div>
              )}
            />
          </div>

          {/* Content */}
          <div id="content" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="content">
              <ArticleInput />
            </FormField>
          </div>

          {/* Pull Quotes */}
          <div id="pull-quote" className="scroll-mt-[80px]">
            <Controller
              name="pullQuotes"
              render={({ field }) => (
                <PullQuoteInput value={field.value} onChange={field.onChange} placeholder="Enter a pull quote" />
              )}
            />
          </div>

          {/* Sources */}
          <div id="sources" className="scroll-mt-[80px]">
            <Controller
              name="sources"
              render={({ field }) => (
                <SourcesInput value={field.value} onChange={field.onChange} placeholder="Enter source URL or citation" />
              )}
            />
          </div>

          {/* Image Upload */}
          <div id="image" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="image">
              <ImageUpload />
            </FormField>
          </div>
        </Box>
      </GridCol>

      <GridCol span={1}>
        <Box className="sticky top-24 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
          <ProgressSidebar progress={progress} />
          <Button
            type="submit"
            color={
              !progress.author ||
              !progress.title ||
              !progress.issueNumber ||
              !progress.content ||
              !progress.pullQuotes ||
              !progress.categories ||
              !progress.sources
                ? "border"
                : "forest-green"
            }
            className="w-full"
            disabled={
              !progress.author ||
              !progress.title ||
              !progress.issueNumber ||
              !progress.content ||
              !progress.pullQuotes ||
              !progress.categories ||
              !progress.sources
            }
          >
            Submit Article
          </Button>
        </Box>
      </GridCol>
    </Grid>
  );
};

function insertPullQuotes(content: ArticleContent[], pullQuotes: string[]): ArticleContent[] {
  if (!pullQuotes.length) return content;

  const result = [...content];
  const slots = result.length + 1;

  const indices = Array.from({ length: slots - 2 }, (_, i) => i + 1);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const used = new Set<number>();
  const insertions: { index: number; quote: string }[] = [];

  for (const quote of pullQuotes) {
    const idx = indices.find((i) => !used.has(i) && !used.has(i - 1) && !used.has(i + 1));

    if (idx === undefined) {
      console.warn(`Could not insert pull quote: "${quote}"`);
      continue;
    }

    used.add(idx);
    insertions.push({ index: idx, quote });
  }

  insertions
    .sort((a, b) => b.index - a.index)
    .forEach(({ index, quote }) =>
      result.splice(index, 0, [
        {
          contentType: "pull_quote",
          content: quote,
        },
      ]),
    );

  return result;
}

export default function ArticleSubmissionForm({ basicUsers, defaultAuthorEmails }: ArticleSubmissionFormProps) {
  const authorOptions = useMemo<DropdownOption[]>(() => basicUsers.map((u) => ({ label: u.name, value: u.email })), [basicUsers]);

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleSuccessDialogOpenChange = useCallback((open: boolean) => {
    setSuccessDialogOpen(open);
    if (!open) {
      window.location.reload();
    }
  }, []);

  const onSubmitArticle = useCallback(async (data: ArticleSubmissionFormValues) => {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const originalContent = reactQuillHtmlToArticleContent(data.content);
    const articleContent = insertPullQuotes(originalContent, data.pullQuotes);

    const articleData = {
      title: data.title,
      slug: slug,
      issueNumber: data.issueNumber,
      categories: data.categories,
      articleContent: articleContent,
      sources: data.sources,
      pageLength: 1,
      comments: [] as ArticleComment[],
      articleStatus: ArticleStatus.Print,
      writingStatus: WritingStatus.EICApproved,
      designStatus: DesignStatus.Completed,
      photographyStatus: PhotographyStatus.NoPhoto,
      authors: data.authors,
      editors: [],
      designers: [],
      photographers: [],
      approvingUser: "",
      creationTime: new Date(),
      modificationTime: new Date(),
    } as ArticleCreate;
    console.log(articleData);
    await createArticle(articleData);
    setSuccessDialogOpen(true);
  }, []);

  return (
    <Box className="mx-auto w-full max-w-7xl px-4 py-8">
      <Dialog open={successDialogOpen} onOpenChange={handleSuccessDialogOpenChange}>
        <DialogWindow size="sm" color="white" className="max-w-lg p-8 pb-10 pt-12 shadow-2xl ring-2 ring-forest-green/20">
          <Box className="flex flex-col items-center gap-4 text-center">
            <Box className="flex items-end justify-center gap-3">
              <Icon icon="star" size={36} color="forest-green" className="drop-shadow-sm" />
              <Icon icon="book" size={36} color="marigold" className="drop-shadow-sm" />
              <Icon icon="rocket" size={36} color="coral" className="drop-shadow-sm" />
            </Box>
            <Text size={24} style="bold" color="forest-green" className="leading-tight">
              Article submitted, hooray!
            </Text>
            <Text size={14} color="black" className="leading-relaxed opacity-75">
              Thank you for writing and editing for this issue, and using the webteam&apos;s new tool.
            </Text>
          </Box>
        </DialogWindow>
      </Dialog>

      <Form<ArticleSubmissionFormValues>
        onSubmit={onSubmitArticle}
        options={{
          defaultValues: {
            authors: defaultAuthorEmails,
            title: "",
            issueNumber: 67,
            categories: [],
            content: "",
            pullQuotes: [],
            image: undefined,
            sources: [],
          },
        }}
      >
        <FormContent authorOptions={authorOptions} defaultAuthorEmails={defaultAuthorEmails} />
      </Form>
    </Box>
  );
}
