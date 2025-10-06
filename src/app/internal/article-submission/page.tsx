"use client";

import React from "react";
import { Form, FormField } from "../../../design-system/primitives/Form/Form";
import Box from "../../../design-system/primitives/Box";
import TextInput from "../../../design-system/primitives/TextInput";
import Checkbox from "../../../design-system/primitives/Checkbox";
import Text from "../../../design-system/primitives/Text";
import { SubmitHandler } from "react-hook-form";

/* IDEAS: 
    - Author selection: would be cool to have a dropdown that updates as you type system
    - Image upload: drag and drop area with preview of image
    - Checkboxes on the side that update as you fill out the form (progress bar)
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
};

const onSubmit: SubmitHandler<ArticleSubmissionFormValues> = (data) => {
  alert(JSON.stringify(data, null, 2));
};

async function fetchCurrentUser() {
  // Simulate an API call to fetch user data
  return undefined;
}

export default function PublicProfilePage() {
  // const currentUser = await fetchCurrentUser();
  const currentUser = { name: "John Doe", email: "john@nusci.org" }; // Placeholder user data
  return (
    <Box className="mx-auto w-full max-w-4xl px-4">
      <Text
        color="sage-green"
        size={36}
        style="bold"
        className="mb-6 text-center"
      >
        Submit an Article
      </Text>
      <Form<ArticleSubmissionFormValues>
        onSubmit={onSubmit}
        options={{
          defaultValues: {
            author: "",
            title: "",
            categories: [],
            content: "",
            pullQuote: "",
            image: undefined,
          },
        }}
        className="space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5"
      >
        {/* Author selection */}
        <FormField<ArticleSubmissionFormValues> name="author">
          <TextInput
            placeholder={currentUser.name}
            value={currentUser.name}
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
          <div className="flex flex-wrap gap-2 p-2">
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
            label="content"
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

        {/* Image upload */}
        {/* <FormField<ArticleSubmissionFormValues> name="image"></FormField> */}
      </Form>
    </Box>
  );
}
