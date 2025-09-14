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
  title: "Components/TextInput",
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
          const defaultValue = "username";
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
                        value={defaultValue}
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