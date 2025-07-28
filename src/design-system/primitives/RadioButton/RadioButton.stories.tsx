import type { Meta, StoryObj } from "@storybook/react";
import RadioButton from "./RadioButton";
import React from "react";

// color vairants
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

// Define Storybook metadata
const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  title: "Primitives/RadioButton",
  argTypes: {
    color: {
      control: "select",
      options: colors,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// sample options
const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

// default story
export const Default: Story = {
  args: {
    name: "default-radio",
    color: "black",
    options,
    defaultValue: "a",
  },
};

export const Vertical: Story = {
  args: {
    name: "default-radio",
    color: "black",
    options,
    defaultValue: "a",
    direction: "vertical",
  },
};

// gallery for each color variant
export const Gallery: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      {colors.map((color) => {
        const isWhite = color === "white";
        return (
          <div key={color} className={isWhite ? "bg-zinc-300 p-4" : "p-4"}>
            <h4 className="mb-2 font-semibold capitalize">{color}</h4>
            <RadioButton name={`radio-${color}`} color={color} options={options} defaultValue="b" />
          </div>
        );
      })}
    </div>
  ),
};
