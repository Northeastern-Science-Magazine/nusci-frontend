import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Form, FormField } from "./Form";
import TextInput from "../TextInput";
import Checkbox from "../Checkbox";
import RadioButton from "../RadioButton";
import Toggle from "../Toggle";
import { SubmitHandler } from "react-hook-form";
import Box from "../Box";
import Text from "../Text";

type ExampleFormValues = {
  username: string;
  email: string;
  password: string;
  terms: string[];
  interests: string[];
  color: string;
  gender: string;
  notifications: boolean;
};

const meta: Meta<typeof Form<ExampleFormValues>> = {
  title: "Primitives/Form",
  component: Form,
};
export default meta;

type Story = StoryObj<typeof Form<ExampleFormValues>>;

export const BasicForm: Story = {
  render: () => {
    const onSubmit: SubmitHandler<ExampleFormValues> = (data) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Box className="mx-auto w-full max-w-2xl px-4">
        <Form<ExampleFormValues>
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              username: "",
              email: "",
              password: "",
              terms: [],
              interests: [],
              color: "",
              gender: "",
              notifications: false,
            },
          }}
          className="space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5"
        >
          {/* ===================== Identity ===================== */}
          <section>
            <Box className="mb-4">
              <Text size={16} style="bold" className="text-slate-900">
                Example Form
              </Text>
              <Text size={12}>Showcasing the input field capabilities</Text>
            </Box>

            <Box className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Username */}
              <Box className="md:col-span-1">
                <Box className="mb-2">
                  <Text size={16}>What should we call you?</Text>
                  <Text size={12} color="sage-green">
                    This is how you’ll appear across the app.
                  </Text>
                </Box>
                <FormField<ExampleFormValues> name="username" rules={{ required: "Please tell us your username" }}>
                  <TextInput label="Username" placeholder="Choose a unique username" className="w-full" />
                </FormField>
              </Box>

              {/* Email */}
              <Box className="md:col-span-1">
                <Box className="mb-2">
                  <Text size={16}>What’s your email address?</Text>
                  <Text size={12} color="sage-green">
                    We’ll send confirmations and security alerts here.
                  </Text>
                </Box>
                <FormField<ExampleFormValues>
                  name="email"
                  rules={{
                    required: "We need your email address",
                    pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" },
                  }}
                >
                  <TextInput label="Email" placeholder="name@company.com" className="w-full" />
                </FormField>
              </Box>

              {/* Password */}
              <Box className="md:col-span-2">
                <Box className="mb-2">
                  <Text size={16}>What password would you like to use?</Text>
                  <Text size={12} color="sage-green">
                    Tip: Use at least 6 characters with a mix of symbols.
                  </Text>
                </Box>
                <FormField<ExampleFormValues>
                  name="password"
                  rules={{
                    required: "Please set a password",
                    minLength: { value: 6, message: "Use at least 6 characters" },
                  }}
                >
                  <TextInput label="Password" placeholder="Create a secure password" className="w-full" />
                </FormField>
              </Box>
            </Box>
          </section>

          <hr className="border-slate-200" />

          {/* ===================== Preferences ===================== */}
          <section>
            <Box className="mb-4">
              <Text size={16} style="bold" className="text-slate-900">
                Preferences
              </Text>
              <Text size={12} color="sage-green">
                Help us tailor your experience.
              </Text>
            </Box>

            <Box className="space-y-6">
              {/* Interests */}
              <Box>
                <Box className="mb-2">
                  <Text size={16}>Which topics are you interested in?</Text>
                  <Text size={12} color="sage-green">
                    Choose as many as you like.
                  </Text>
                </Box>
                <FormField<ExampleFormValues>
                  name="interests"
                  rules={{
                    validate: (value) => (Array.isArray(value) && value.length > 0 ? true : "Pick at least one interest"),
                  }}
                >
                  <Checkbox options={["Sports", "Music", "Travel"]} color="sage-green" value={[]} onChange={() => {}} />
                </FormField>
              </Box>

              {/* Favorite Color */}
              <Box>
                <Box className="mb-2">
                  <Text size={16}>What’s your favorite color?</Text>
                  <Text size={12} color="sage-green">
                    We’ll use it to personalize certain accents.
                  </Text>
                </Box>
                <FormField<ExampleFormValues> name="color" rules={{ required: "Select a favorite color" }}>
                  <RadioButton
                    name="color"
                    options={[
                      { label: "Red", value: "red" },
                      { label: "Green", value: "green" },
                      { label: "Blue", value: "blue" },
                    ]}
                  />
                </FormField>
              </Box>

              {/* Gender */}
              <Box>
                <Box className="mb-2">
                  <Text size={16}>How do you identify?</Text>
                  <Text size={12} color="sage-green">
                    Optional—choose the option you’re most comfortable with.
                  </Text>
                </Box>
                <FormField<ExampleFormValues> name="gender" rules={{ required: "Please choose an option" }}>
                  <RadioButton
                    name="gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other / Prefer not to say", value: "other" },
                    ]}
                  />
                </FormField>
              </Box>

              {/* Notifications */}
              <Box className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <Box className="pr-4">
                  <Text size={16}>Would you like to receive notifications?</Text>
                  <Text size={12} color="sage-green">
                    Get product updates, tips, and important alerts.
                  </Text>
                </Box>
                <Box>
                  <FormField<ExampleFormValues> name="notifications">
                    <Toggle />
                  </FormField>
                </Box>
              </Box>
            </Box>
          </section>

          <hr className="border-slate-200" />

          {/* ===================== Agreements ===================== */}
          <section>
            <Box className="mb-4">
              <Text size={16} style="bold" className="text-slate-900">
                Agreements
              </Text>
              <Text size={12} color="sage-green">
                Legal bits to keep everyone safe.
              </Text>
            </Box>

            <Box className="rounded-xl border border-slate-200 p-4">
              <Text size={16}>Do you agree to the Terms & Conditions?</Text>
              <Text size={12} color="sage-green">
                Please confirm you’ve read and agree to our Terms & Conditions and Privacy Policy.
              </Text>
              <Box className="mt-3">
                <FormField<ExampleFormValues>
                  name="terms"
                  rules={{
                    validate: (value) =>
                      Array.isArray(value) && value.includes("Agree to terms and conditions")
                        ? true
                        : "You must agree before continuing",
                  }}
                >
                  <Checkbox options={["Agree to terms and conditions"]} value={[]} onChange={() => {}} />
                </FormField>
              </Box>
            </Box>
          </section>

          {/* ===================== Submit ===================== */}
          <Box className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Create account
            </button>
            <Text size={12} color="sage-green" className="mt-2 text-center">
              By continuing, you confirm your information is accurate and agree to receive account-related communications.
            </Text>
          </Box>
        </Form>
      </Box>
    );
  },
};
