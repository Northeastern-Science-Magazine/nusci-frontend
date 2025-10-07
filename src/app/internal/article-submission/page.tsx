"use client";

import React, { useState, useEffect } from "react";
import { Form, FormField } from "../../../design-system/primitives/Form/Form";
import { useWatch } from "react-hook-form";
import Box from "../../../design-system/primitives/Box";
import { Grid, GridCol } from "../../../design-system/primitives/Grid";
import TextInput from "../../../design-system/primitives/TextInput";
import Checkbox from "../../../design-system/primitives/Checkbox";
import Text from "../../../design-system/primitives/Text";
import Button from "../../../design-system/primitives/Button";
import { ProgressSidebar } from "./components/ProgressSidebar";
import { SourcesInput } from "./components/SourcesInput";

/* IDEAS: 
    - Author selection: would be cool to have a dropdown that updates as you type system
    - Image upload: drag and drop area with preview of image
    - Need file/image upload handling component
    - Need to be able to handle multiple authors (like a checkbox in the dropdown somehow)
*/

type ArticleSubmissionFormValues = {
  author: string;
  title: string;
  categories?: string[];
  content: string;
  pullQuote: string;
  image?: string | File;
  sources?: string[];
};

type FormProgress = {
  author: boolean;
  title: boolean;
  categories: boolean;
  content: boolean;
  pullQuote: boolean;
  image: boolean;
  sources: boolean;
};

/* FORM CONTENT COMPONENT */
const FormContent = () => {
  const currentUser = { name: "John Doe", email: "john@nusci.org" };

  const [progress, setProgress] = useState<FormProgress>({
    author: true, // Pre-filled with current user
    title: false,
    categories: false,
    content: false,
    pullQuote: false,
    image: false,
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
        categories:
          Array.isArray(watchedFields.categories) &&
          watchedFields.categories.length > 0,
        content:
          !!watchedFields.content && watchedFields.content.trim().length > 0,
        pullQuote:
          !!watchedFields.pullQuote &&
          watchedFields.pullQuote.trim().length > 0,
        image: !!watchedFields.image,
        sources:
          Array.isArray(watchedFields.sources) &&
          watchedFields.sources.length > 0 &&
          watchedFields.sources[0]?.trim().length > 0,
      });
    };
    updateProgress();
  }, [watchedFields]);

  return (
    <Grid col span={3} gap={8}>
      <GridCol span={2}>
        <Box className="space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          {/* Author */}
          <FormField<ArticleSubmissionFormValues> name="author">
            <TextInput
              placeholder={currentUser.name}
              label="Author"
              className="w-full"
            />
          </FormField>

          {/* Title */}
          <FormField<ArticleSubmissionFormValues> name="title">
            <TextInput
              placeholder="Enter article title"
              label="Title"
              className="w-full"
            />
          </FormField>

          {/* Categories */}
          <FormField<ArticleSubmissionFormValues> name="categories">
            <div className="[&>div]:flex [&>div]:flex-wrap [&>div]:gap-x-6 [&>div]:gap-y-2 [&_label]:mb-0">
              <Checkbox
                options={[
                  "Biology",
                  "Chemistry",
                  "Environment",
                  "Health",
                  "Newsletter",
                  "Opinion",
                  "Physics",
                  "Psychology",
                  "Space",
                  "Technology",
                  "World",
                ]}
              />
            </div>
          </FormField>

          {/* Content */}
          <FormField<ArticleSubmissionFormValues> name="content">
            <TextInput
              placeholder="Enter article content"
              label="Content"
              className="w-full"
              rows={15}
              resize={true}
            />
          </FormField>

          {/* Pull Quote */}
          <FormField<ArticleSubmissionFormValues> name="pullQuote">
            <TextInput
              placeholder="Enter a pull quote"
              label="Pull Quote"
              className="w-full"
              rows={3}
            />
          </FormField>

          {/* Sources */}
          <FormField<ArticleSubmissionFormValues> name="sources">
            <SourcesInput placeholder="Enter source URL or citation" />
          </FormField>

          {/* Image Upload */}
          <Text color="black" size={12} style="bold" className="text-center">
            Image Upload Coming Soon!
          </Text>

          {/* Submit */}
          <Button
            color={
              !progress.author ||
              !progress.title ||
              !progress.content ||
              !progress.pullQuote ||
              !progress.categories ||
              !progress.sources
                ? "border"
                : "purple"
            }
            className="w-full"
            onClick={onSubmit}
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

      <GridCol span={1}>
        <ProgressSidebar progress={progress} />
      </GridCol>
    </Grid>
  );
};

// TODO: Implement actual submission logic
const onSubmit = () => {
  alert("Article submitted!");
};

/* PAGE EXPORT */
export default function PublicProfilePage() {
  const currentUser = { name: "John Doe", email: "john@nusci.org" };

  return (
    <Box className="mx-auto w-full max-w-7xl px-4 py-8">
      <Text
        color="sage-green"
        size={36}
        style="bold"
        className="mb-8 text-center"
      >
        Submit an Article
      </Text>

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
