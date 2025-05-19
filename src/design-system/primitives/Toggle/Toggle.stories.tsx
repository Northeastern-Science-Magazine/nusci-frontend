import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
import React from "react";

const colors = [
  "white",
  "black",
  "light-orange",
  "dark-orange",
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
const sizes = ["sm", "md", "lg"] as const;

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Components/Toggle",
  argTypes: {
    toggleColor: {
      control: "select",
      options: colors,
    },
    size: {
      control: "select",
      options: sizes,
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
    toggleColor: "black",
    size: "md",
  },
};

export const Gallery: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        {colors.map((colors) => (
          <div key={colors} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{colors}</h3>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <span className="text-sm capitalize">{size}</span>
                  <Toggle toggleColor={colors} size={size} defaultChecked />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
