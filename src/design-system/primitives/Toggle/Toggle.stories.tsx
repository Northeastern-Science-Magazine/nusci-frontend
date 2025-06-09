import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
import React from "react";

const colors = [
  //"white", // white exists but doesn't really serve a purpose
  "black",
  "gray",
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

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Primitives/Toggle",
  argTypes: {
    color: {
      control: "select",
      options: colors,
    },
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    color: "black",
  },
};

export const Gallery: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <h3 className="text-lg font-semibold">Toggle Gallery</h3>
        <div className="grid grid-cols-3 gap-6">
          {colors.map((color) => (
            <div key={color} className="flex flex-col items-start gap-2">
              <span className="text-sm font-medium capitalize">{color}</span>
              <Toggle color={color} defaultChecked />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
