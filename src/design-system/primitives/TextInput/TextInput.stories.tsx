import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";
import React from "react";

const variants = ["outline", "filled"] as const;
const sizes = ["lg", "md", "sm"] as const;
const colors = [
  "black",
  "white",
  "red",
  "aqua",
  "aqua-light",
  "forest-green",
  "sage-green",
  "border",
  "neutral",
  "purple",
  "pink",
  "maroon",
  "coral",
  "marigold",
] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: "Primitives/TextInput",
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    },
    color: {
      control: "select",
      options: colors,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

/** Story for Outline Variant */
export const Outline: Story = {
  args: {
    size: "md",
    variant: "outline",
    color: "black",
    label: "",
  },
};

/** Story for Filled Variant */
export const Filled: Story = {
  args: {
    size: "md",
    variant: "filled",
    color: "black",
    label: "",
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="space-y-8">
        {colors.map((color) => {
          const isWhite = color == "white";
          return (
            <div key={color} className={isWhite ? "bg-zinc-300 p-4" : ""}>
              <h2 className="text-xl font-bold mb-4 capitalize">{color}</h2>
              <div className="grid grid-cols-2 gap-4">
                {variants.map((variant) => (
                  <div key={variant} className="space-y-2">
                    <h3 className="font-medium capitalize">{variant}</h3>
                    {sizes.map((size) => (
                      <TextInput
                        key={`${variant}-${size}-${color}`}
                        size={size}
                        color={color}
                        variant={variant}
                        label={`${size} | ${variant} | ${color}`}
                        id={`${size}-${variant}-${color}`}
                        value="username"
                        multiline={false}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

/** Story demonstrating single-line input (default behavior) */
export const SingleLineInput: Story = {
  args: {
    size: "md",
    variant: "outline",
    color: "black",
    label: "Email Address",
    placeholder: "Enter your email",
    multiline: false,
  },
};

/** Story demonstrating single-line input with different use cases */
export const SingleLineExamples: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Single-Line Input Examples</h3>
          <div className="space-y-4">
            <TextInput
              label="Email"
              placeholder="name@example.com"
              variant="outline"
              color="black"
              size="md"
              multiline={false}
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              variant="outline"
              color="black"
              size="md"
              multiline={false}
              type="password"
            />
            <TextInput
              label="Search"
              placeholder="Search..."
              variant="outline"
              color="sage-green"
              size="md"
              multiline={false}
              type="search"
            />
            <TextInput
              label="Phone Number"
              placeholder="(555) 123-4567"
              variant="filled"
              color="aqua"
              size="md"
              multiline={false}
              type="tel"
            />
          </div>
        </div>
      </div>
    );
  },
};

/** Story demonstrating multi-line textarea */
export const MultiLineTextarea: Story = {
  args: {
    size: "md",
    variant: "outline",
    color: "black",
    label: "Bio",
    placeholder: "Tell us about yourself...",
    multiline: true,
    rows: 4,
    resize: false,
  },
};

/** Story demonstrating multi-line textarea with different configurations */
export const MultiLineExamples: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Multi-Line Textarea Examples</h3>
          <div className="space-y-4">
            <TextInput
              label="Short Comment (1 row, no resize)"
              placeholder="Add a comment..."
              variant="outline"
              color="black"
              size="md"
              multiline={true}
              rows={1}
              resize={false}
            />
            <TextInput
              label="Bio (4 rows, no resize)"
              placeholder="Tell us about yourself..."
              variant="outline"
              color="black"
              size="md"
              multiline={true}
              rows={4}
              resize={false}
            />
            <TextInput
              label="Description (6 rows, resizable)"
              placeholder="Enter a detailed description..."
              variant="outline"
              color="sage-green"
              size="md"
              multiline={true}
              rows={6}
              resize={true}
            />
            <TextInput
              label="Long Form (10 rows, resizable)"
              placeholder="Write your thoughts here..."
              variant="filled"
              color="aqua"
              size="md"
              multiline={true}
              rows={10}
              resize={true}
            />
          </div>
        </div>
      </div>
    );
  },
};
