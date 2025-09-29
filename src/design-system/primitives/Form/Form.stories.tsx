import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Form, FormField } from "./Form"; // adjust import path
import TextInput from "../TextInput";
import Checkbox from "../Checkbox";
import RadioButton from "../RadioButton";
import Toggle from "../Toggle";
import { SubmitHandler } from "react-hook-form";

type ExampleFormValues = {
  username: string;
  email: string;
  terms: string[]; // checkbox returns an array
  color: string; // radio returns string
  notifications: boolean; // toggle returns boolean
};

const meta: Meta<typeof Form<ExampleFormValues>> = {
  title: "Forms/Form",
  component: Form,
};
export default meta;

type Story = StoryObj<typeof Form<ExampleFormValues>>;

export const Basic: Story = {
  render: () => {
    const onSubmit: SubmitHandler<ExampleFormValues> = (data) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <div className="max-w-md mx-auto p-6">
        <Form<ExampleFormValues>
          onSubmit={onSubmit}
          options={{ defaultValues: { terms: [], notifications: false } }}
          className="space-y-6 p-4 border rounded-lg shadow bg-white"
        >
          {/* Username input */}
          <FormField<ExampleFormValues> name="username" label="Username" rules={{ required: "Username is required" }}>
            <TextInput label="Username" placeholder="Enter your username" />
          </FormField>

          {/* Email input */}
          <FormField<ExampleFormValues>
            name="email"
            label="Email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
          >
            <TextInput label="Email" placeholder="Enter your email" />
          </FormField>

          {/* Checkbox */}
          <FormField<ExampleFormValues>
            name="terms"
            label="Agree to terms"
            rules={{
              validate: (value) => (Array.isArray(value) && value.includes("agree") ? true : "You must accept terms"),
            }}
          >
            <Checkbox options={["agree"]} value={[]} onChange={() => {}} />
          </FormField>

          {/* Radio buttons */}
          <FormField<ExampleFormValues> name="color" label="Favorite Color" rules={{ required: "Pick a color" }}>
            <RadioButton
              name="color"
              options={[
                { label: "Red", value: "red" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
              ]}
            />
          </FormField>

          {/* Toggle */}
          <FormField<ExampleFormValues> name="notifications" label="Enable Notifications">
            <Toggle />
          </FormField>

          {/* Submit button */}
          <div className="pt-2">
            <button type="submit" className="w-full px-4 py-2 rounded-lg bg-purple-600 text-black hover:bg-purple-700">
              Submit
            </button>
          </div>
        </Form>
      </div>
    );
  },
};
