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
import { Category, ArticleSource } from "@/lib/types/types";

/* IDEAS: 
    - Author selection: would be cool to have a dropdown that updates as you type system
    - Image upload: drag and drop area with preview of image
    - Need file/image upload handling component
    - Need to be able to handle multiple authors (like a checkbox in the dropdown somehow)
*/

type ArticleSubmissionFormValues = {
  author: string;
  title: string;
  categories: string[];
  content: string;
  pullQuote: string;
  image?: File;
  sources: ArticleSource[];
};

type FormProgress = {
  author: boolean;
  title: boolean;
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
        author: !!watchedFields.author && watchedFields.author.trim().length > 0,
        title: !!watchedFields.title && watchedFields.title.trim().length > 0,
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
        pullQuote: !!watchedFields.pullQuote && watchedFields.pullQuote.trim().length > 0,
        sources:
          Array.isArray(watchedFields.sources) &&
          watchedFields.sources.length > 0 &&
          watchedFields.sources[0]?.text?.trim().length > 0 &&
          watchedFields.sources[0]?.href?.trim().length > 0,
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

          {/* Author */}
          <div id="author" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="author">
              <TextInput placeholder={currentUser.name} label="Author" className="w-full" />
            </FormField>
          </div>

          {/* Title */}
          <div id="title" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="title">
              <TextInput placeholder="Enter article title" label="Title" className="w-full" />
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

          {/* Pull Quote */}
          <div id="pull-quote" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="pullQuote">
              <TextInput placeholder="Enter a pull quote" label="Pull Quote" className="w-full" rows={3} multiline={true} />
            </FormField>
          </div>

          {/* Sources */}
          <div id="sources" className="scroll-mt-[80px]">
            <FormField<ArticleSubmissionFormValues> name="sources">
              <SourcesInput placeholder="Enter source URL or citation" />
            </FormField>
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
        <Box className="sticky top-8 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
          <ProgressSidebar progress={progress} />
          {/* Submit */}
          <Button
            type="submit"
            color={
              !progress.author ||
              !progress.title ||
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

// TODO: Implement actual submission logic
const onSubmit = (data: ArticleSubmissionFormValues) => {
  alert("Article submitted!" + JSON.stringify(data) + " image name: " + data.image?.name);
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
            author: currentUser.name,
            title: "",
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
