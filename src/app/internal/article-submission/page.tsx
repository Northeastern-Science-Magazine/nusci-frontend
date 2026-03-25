"use client";

import React, { useState, useEffect } from "react";
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
import {
  Category,
  ArticleSource,
  ArticleContent,
  ArticleContentSegment,
  ArticleStatus,
  WritingStatus,
  DesignStatus,
  PhotographyStatus,
  Article,
  ArticleComment,
} from "@/lib/types/types";
import {
  Dropdown,
  type DropdownOption,
} from "@/design-system/primitives/Dropdown";
import { createArticle } from "@/lib/api/articles";

/* IDEAS: 
    - Author selection: would be cool to have a dropdown that updates as you type system
    - Image upload: drag and drop area with preview of image
    - Need file/image upload handling component
    - Need to be able to handle multiple authors (like a checkbox in the dropdown somehow)
*/

type ArticleSubmissionFormValues = {
  author: string;
  title: string;
  issueNumber: number;
  categories: string[];
  content: string;
  pullQuote: string;
  image?: File;
  sources: ArticleSource[];
};

const AUTHORS: DropdownOption[] = [
  { label: "Maddie Zhang", value: "Maddie Zhang" },
  { label: "Treyton Mehta", value: "Treyton Mehta" },
  { label: "Colten Gardner", value: " Colten Gardner" },
  { label: "Keegan Huntley", value: "Keegan Huntley" },
  { label: "Jean Gipson", value: "Jean Gipson" },
  { label: "Elana Voss", value: "Elana Voss" },
  { label: "Christin McCray", value: "Christin McCray" },
];

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
          if (text || href)
            segments.push({ contentType: "link", content: text, href });
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
  pullQuote: boolean;
  sources: boolean;
};

/* FORM CONTENT COMPONENT */
const FormContent = () => {
  const currentUser = { name: "John Doe", email: "john@nusci.org" }; // TODO: Fetch current user

  const [progress, setProgress] = useState<FormProgress>({
    author: true, // Pre-filled with current user
    title: false,
    categories: false,
    content: false,
    pullQuote: false,
    sources: false,
  });

  // Watch all form fields
  const watchedFields = useWatch<ArticleSubmissionFormValues>();

  useEffect(() => {
    const updateProgress = () => {
      setProgress({
        author:
          !!watchedFields.author && watchedFields.author.trim().length > 0,
        title: !!watchedFields.title && watchedFields.title.trim().length > 0,
        issueNumber:
          !!watchedFields.issueNumber && watchedFields.issueNumber > 0,
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
        pullQuote:
          !!watchedFields.pullQuote &&
          watchedFields.pullQuote.trim().length > 0,
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
          <Text
            color="sage-green"
            size={36}
            style="bold"
            className="mb-8 text-left"
          >
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
                      { label: "Issue 1", value: "1" },
                      { label: "Issue 2", value: "2" },
                      { label: "Issue 3", value: "3" },
                      { label: "Issue 67: Intrepid", value: "67" },
                    ]}
                    defaultValue={"67"}
                    placeholder="Select issue"
                    onChange={(value) => {
                      const num =
                        typeof value === "string" && value
                          ? Number(value)
                          : NaN;
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
              <TextInput
                placeholder="Enter article title"
                label="Title"
                className="w-full"
              />
            </FormField>
          </div>

          <div id="author" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="author">
              <Dropdown options={AUTHORS} multiSelect typeahead />
            </FormField>
          </div>

          {/* Categories */}
          <div id="categories" className="scroll-mt-[80px]">
            <Controller
              name="categories"
              render={({ field }) => (
                <div>
                  <label>{"Categories"}</label>
                  <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0">
                    <Checkbox
                      options={Object.values(Category)}
                      value={field.value || []}
                      onChange={field.onChange}
                    />
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

          {/* Pull Quote */}
          <div id="pull-quote" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="pullQuote">
              <TextInput
                placeholder="Enter a pull quote"
                label="Pull Quote"
                className="w-full"
                rows={3}
                multiline={true}
              />
            </FormField>
          </div>

          {/* Sources */}
          <div id="sources" className="scroll-mt-[80px]">
            <Controller
              name="sources"
              render={({ field }) => (
                <SourcesInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter source URL or citation"
                />
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
          {/* Submit */}
          <Button
            type="submit"
            color={
              !progress.title ||
              !progress.author ||
              !progress.issueNumber ||
              !progress.content ||
              !progress.pullQuote ||
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
              !progress.pullQuote ||
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

const onSubmit = async (data: ArticleSubmissionFormValues) => {
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const articleContent = reactQuillHtmlToArticleContent(data.content);

  const articleData = {
    title: data.title,
    slug: slug,
    issueNumber: data.issueNumber,
    categories: data.categories,
    articleContent: articleContent,
    sources: data.sources,
    pageLength: 1, // by default, will matter later during issue map spreads
    comments: [] as ArticleComment[],
    articleStatus: ArticleStatus.Print,
    writingStatus: WritingStatus.EICApproved,
    designStatus: DesignStatus.Completed,
    photographyStatus: PhotographyStatus.NoPhoto,
    authors: [data.author], // only 1 author for now, no designers, etc attributed yet
  } as Article;
  console.log(articleData);
  await createArticle(articleData);
  alert("Created New Article");
};

/* PAGE EXPORT */
export default function PublicProfilePage() {
  const currentUser = { name: "John Doe", email: "john@nusci.org" };

  return (
    <Box className="mx-auto w-full max-w-7xl px-4 py-8">
      <Form<ArticleSubmissionFormValues>
        onSubmit={onSubmit}
        options={{
          defaultValues: {
            title: "",
            author: currentUser.name,
            issueNumber: 67,
            categories: [],
            content: "",
            pullQuote: "",
            image: undefined,
            sources: [],
          },
        }}
      >
        <FormContent />
      </Form>
    </Box>
  );
}
