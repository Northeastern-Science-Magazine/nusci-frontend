"use client";

import { useState } from "react";
import { Form, FormField } from "@/primitives/Form";
import { SubmitHandler } from "react-hook-form";
import MediaCard from "@/design-system/components/MediaCard";
import TextInput from "@/primitives/TextInput";
import Button from "@/primitives/Button";
import Box from "@/primitives/Box";
import Text from "@/primitives/Text";
import { Flex } from "@/primitives/Flex";
import { apiSendEmail } from "@/lib/api/email";
import { EmailType } from "@/lib/types/types";

type EmailFormValues = {
  email: string;
};

export default function OTPPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const onEmailSubmit: SubmitHandler<EmailFormValues> = async (data) => {
    await apiSendEmail({ to: [data.email], type: EmailType.OTP });
    console.log({ to: [data.email], type: EmailType.OTP });
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
  };
  return (
    <Flex className="min-h-screen items-center justify-center p-4 bg-sage-green">
      <MediaCard
        mediaType="image"
        mediaDirection="right"
        imageProps={{
          src: "https://media.istockphoto.com/id/488961976/photo/exploding-nebula.jpg?s=612x612&w=0&k=20&c=QEfXvnU0ckq0SWNEXTzZnzUpjBDwmweU3a8VoIcBveA=",
          alt: "landing",
        }}
        size="lg"
        rounded="rounded"
        className="max-w-7xl w-full [&_.media-container]:flex-1"
        color="white"
      >
        <Text size={48} style="bold" color="forest-green" className="p-5 pb-0">
          {isSubmitted ? "Check your email" : "Sign In with Email"}
        </Text>

        {isSubmitted ? (
          <Box className="space-y-8 mt-6 p-5">
            <Text size={16} color="black">
              We&#39;ve sent a one-time link to <strong className="font-semibold">{submittedEmail}</strong>. Please check your
              inbox and click the link to sign in.
            </Text>
            <Text size={12} color="sage-green">
              If the link expired before you used it, see{" "}
              <a href="/otp/link-expired" className="underline hover:text-forest-green">
                what to do next
              </a>
              .
            </Text>
            <Button
              variant="outline"
              size="md"
              color="forest-green"
              className="w-full mt-4"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </Box>
        ) : (
          <Form<EmailFormValues>
            onSubmit={onEmailSubmit}
            options={{
              defaultValues: {
                email: "",
              },
            }}
            className="space-y-8 mt-6 p-5"
          >
            <Text size={16} color="black">
              Enter your email address to sign in.
            </Text>

            <FormField<EmailFormValues>
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
                placeholder="email@northeastern.edu"
                className="w-full"
              />
            </FormField>

            <Button variant="default" size="md" color="forest-green" className="w-full" type="submit">
              Sign In
            </Button>

            <Box className="flex flex-col gap-2 text-left mt-4">
              <Text size={12} color="sage-green">
                Remember your password?{" "}
                <a href="/login" className="underline hover:text-forest-green">
                  Sign in with password
                </a>
              </Text>
              <Text size={12} color="sage-green">
                Link expired or doesn&apos;t work?{" "}
                <a href="/otp/link-expired" className="underline hover:text-forest-green">
                  What to do next
                </a>
              </Text>
            </Box>
          </Form>
        )}
      </MediaCard>
    </Flex>
  );
}
