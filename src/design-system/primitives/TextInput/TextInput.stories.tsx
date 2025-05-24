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
    id: ""
  },
};

/** Story for Filled Variant */
export const Filled: Story = {
  args: {
    size: "md",
    variant: "filled",
    color: "black",
    label: "", 
    id: "",
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        {colors.map((color) => {
          const isWhiteColor = color === "white";
          return (
            <div key={color}>
              <div
                className={`grid grid-cols-2 gap-2 ${
                  isWhiteColor ? "bg-zinc-300" : ""
                }`}
              >
                {variants.map((variant) => (
                  <React.Fragment key={variant}>
                    <div className="flex flex-col">
                      {sizes.map((size) => (
                        <div
                          key={`${variant}-${size}`}
                          className="flex justify-left p-2"
                        >
                          <TextInput
                            size={size}
                            color={color}
                            variant={variant}
                            label={`${size}-${variant}-${color}`}
                            id={`${size}-${variant}-${color}`}
                          >
                            {`${size} | ${variant} | ${color}`}
                          </TextInput>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};