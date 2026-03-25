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

type EmailFormValues = {
  email: string;
};

type OTPFormValues = {
  otp: string;
};

export default function OTPPage() {
  const [step, setStep] = useState<"email" | "otp">("email");

  const onEmailSubmit: SubmitHandler<EmailFormValues> = async (data) => {
    console.log("Sending OTP to:", data.email);
    // Add API logic to send OTP here
    setStep("otp");
  };

  const onOTPSubmit: SubmitHandler<OTPFormValues> = async (data) => {
    console.log("Verifying OTP:", data.otp);
    // Add API logic to verify OTP here
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
          Sign In with Code
        </Text>

        {step === "email" ? (
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
              Enter your email address and we will send you a one-time password to sign in.
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
                placeholder="name@company.com"
                className="w-full"
              />
            </FormField>

            <Button variant="default" size="md" color="forest-green" className="w-full">
              Send Code
            </Button>

            <Box className="flex flex-col gap-2 text-left mt-4">
              <Text size={12} color="sage-green">
                Remember your password?{" "}
                <a href="/login" className="underline hover:text-forest-green">
                  Sign in
                </a>
              </Text>
            </Box>
          </Form>
        ) : (
          <Form<OTPFormValues>
            onSubmit={onOTPSubmit}
            options={{
              defaultValues: {
                otp: "",
              },
            }}
            className="space-y-8 mt-6 p-5"
          >
            <Text size={16} color="black">
              Enter the 6-digit code sent to your email.
            </Text>

            <FormField<OTPFormValues>
              name="otp"
              rules={{
                required: "Code is required",
                minLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
              }}
            >
              <TextInput
                variant="outline"
                size="md"
                color="black"
                label="One-Time Password"
                placeholder="123456"
                className="w-full"
              />
            </FormField>

            <Button variant="default" size="md" color="forest-green" className="w-full">
              Verify Code
            </Button>

            <Box className="flex flex-col gap-2 text-left mt-4">
              <Text size={12} color="sage-green">
                Didn't receive a code?{" "}
                <button type="button" onClick={() => setStep("email")} className="underline hover:text-forest-green">
                  Try another email
                </button>
              </Text>
            </Box>
          </Form>
        )}
      </MediaCard>
    </Flex>
  );
}
