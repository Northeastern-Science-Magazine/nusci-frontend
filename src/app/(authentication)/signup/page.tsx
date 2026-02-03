"use client";

import { Form, FormField } from "@/primitives/Form";
import { SubmitHandler } from "react-hook-form";
import MediaCard from "@/design-system/components/MediaCard";
import TextInput from "@/primitives/TextInput";
import Button from "@/primitives/Button";
import Box from "@/primitives/Box";
import Text from "@/primitives/Text";
import { Flex } from "@/primitives/Flex";

type SignUpFormValues = {
  email: string;
  password: string;
  bio: string;
  year: string;
  major: string;
};

export default function SignUpPage() {
  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log("Sign up data:", data);
    // Handle sign up logic here
  };

  return (
    <Flex className="min-h-screen items-center justify-center p-4 bg-sage-green">
      <MediaCard
        mediaType="image"
        mediaDirection="left"
        imageProps={{
          src: "https://media.istockphoto.com/id/488961976/photo/exploding-nebula.jpg?s=612x612&w=0&k=20&c=QEfXvnU0ckq0SWNEXTzZnzUpjBDwmweU3a8VoIcBveA=",
          alt: "signup",
        }}
        size="lg"
        rounded="rounded"
        className="max-w-7xl w-full [&_.media-container]:flex-1 bg-white"
      >
        <Text size={48} style="bold" color="forest-green" className="p-5 pb-0">
          Join NU Sci!
        </Text>
        <Form<SignUpFormValues>
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              email: "",
              password: "",
              bio: "",
              year: "",
              major: "",
            },
          }}
          className="space-y-6 mt-6 p-5"
        >
          <FormField<SignUpFormValues>
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              },
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Email"
              placeholder="name@northeastern.edu"
              className="w-full"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Password"
              placeholder="Create a password"
              className="w-full"
              type="password"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="year"
            rules={{
              required: "Year is required",
              // pattern: {
              //   value: /^202\d$/,
              //   mes
              // sage: "Please enter a valid year",
              // },
              validate: (value) => {
                const currentYear = new Date().getFullYear();
                const minYear = currentYear;
                const maxYear = currentYear + 6; // Adjust range as needed

                // Check if it's 4 digits
                if (!/^\d{4}$/.test(value)) {
                  return "Year must be 4 digits";
                }

                // Check if it's in valid range
                const year = parseInt(value);
                if (year < minYear || year > maxYear) {
                  return `Year must be between ${minYear} and ${maxYear}`;
                }

                return true;
              },
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Year"
              placeholder="e.g., 2026"
              className="w-full"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="major"
            rules={{
              required: "Major is required",
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Major"
              placeholder="e.g., Computer Science"
              className="w-full"
            />
          </FormField>

          <FormField<SignUpFormValues>
            name="bio"
            rules={{
              required: "Bio is required",
              maxLength: {
                value: 500,
                message: "Bio must be less than 500 characters",
              },
            }}
          >
            <TextInput
              variant="outline"
              size="md"
              color="black"
              label="Bio"
              placeholder="Tell us about yourself..."
              className="w-full"
            />
          </FormField>

          <Button
            variant="default"
            size="md"
            color="forest-green"
            className="w-full"
          >
            Sign Up
          </Button>

          <Box className="text-left">
            <Text size={12} color="sage-green">
              Already have an account?{" "}
              <a href="/login" className="underline">
                Log in
              </a>
            </Text>
          </Box>
        </Form>
      </MediaCard>
    </Flex>
  );
}
