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

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Components/Toggle",
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
        {colors.map((colors) => (
          <div key={colors} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{colors}</h3>
            <div className={`flex gap-4 ${colors === 'white' ? 'bg-zinc-400 p-4 rounded-lg w-fit -ml-4' : ''}`}>
              <Toggle color={colors} defaultChecked />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
