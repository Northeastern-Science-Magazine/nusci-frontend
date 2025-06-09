import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import React from "react";

/* Modify this when adding variants to Button */
const variants = ["default", "outline"] as const;
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
const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Primitives/Badge",
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    color: {
      control: "select",
      options: colors,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Culture",
    variant: "default",
    color: "black",
  },
};

/** Story for Outline Variant */
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    color: "black",
  },
};

/** Gallery Story for all Button Variants */
export const Gallery: Story = {
  args: {},
  render: (args) => {
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
                      <div key={`${variant}`} className="flex justify-left p-2">
                        <Badge color={color} variant={variant}>
                          {`${variant} | ${color}`}
                        </Badge>
                      </div>
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
