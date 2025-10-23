"use client";

import { Form, FormField } from "@/primitives/Form";
import { SubmitHandler } from "react-hook-form";
import MediaCard from "@/design-system/components/MediaCard";
import TextInput from "@/primitives/TextInput";
import Button from "@/primitives/Button";
import Box from "@/primitives/Box";
import Text from "@/primitives/Text";
import { Flex } from "@/primitives/Flex";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Login data:", data);
    // Handle login logic here
  };

  return (
    <Flex className="min-h-screen items-center justify-center p-4 bg-sage-green" >
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
          Welcome back to NU Sci!
        </Text>
        <Form<LoginFormValues>
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              email: "",
              password: "",
            },
          }}
          className="space-y-8 mt-6 p-5"
        >
            <FormField<LoginFormValues>
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

          <Box>
            <FormField<LoginFormValues>
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            >
              <TextInput
                variant="outline"
                size="md"
                color="black"
                label="Password"
                placeholder="Enter your password"
                className="w-full"
                type="password"
              />
            </FormField>
          </Box>

          <Button 
            variant="default"
            size="md"
            color="forest-green"
             className="w-full"
          >
            Sign In
          </Button>

          <Box className="text-left">
            <Text size={12} color="sage-green">
              Don&#39;t have an account?{" "}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </Text>
          </Box>
        </Form>
      </MediaCard>
    </Flex>
  );
}