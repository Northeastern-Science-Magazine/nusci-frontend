import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import React from "react";

/* Modify this when adding variants to Button */
const variants = ["default", "emphasis", "outline"] as const;
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
const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
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
type Story = StoryObj<typeof Button>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Hello",
    size: "md",
    variant: "default",
    color: "black",
  },
};

/** Story for Emphasis Variant */
export const Emphasis: Story = {
  args: {
    children: "Click Me",
    size: "md",
    variant: "emphasis",
    color: "black",
  },
};

/** Story for Outline Variant */
export const Outline: Story = {
  args: {
    children: "Outline",
    size: "md",
    variant: "outline",
    color: "black",
  },
};

/** Gallery Story for all Button Variants */
export const Gallery: Story = {
  args: {},
  render: () => {
    return (
      <div>
        {colors.map((color) => {
          const isWhiteColor = color === "white";
          return (
            <div key={color}>
              <div className={`grid grid-cols-3 gap-2 ${isWhiteColor ? "bg-zinc-300" : ""}`}>
                {variants.map((variant) => (
                  <React.Fragment key={variant}>
                    <div className="flex flex-col">
                      {sizes.map((size) => (
                        <div key={`${variant}-${size}`} className="flex justify-left p-2">
                          <Button size={size} color={color} variant={variant}>
                            {`${size} | ${variant} | ${color}`}
                          </Button>
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
