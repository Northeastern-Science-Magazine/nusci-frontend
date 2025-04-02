import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import React from "react";

/* Modify this when adding variants to Icon */
const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"] as const;
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
const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Components/Icon",
  argTypes: {
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
type Story = StoryObj<typeof Icon>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Icon within default",
    size: "base",
    color: "black",
  },
};

/** Gallery Story for all Story Variants */
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
                {sizes.map((size) => (
                  <React.Fragment key={size}>
                        <div key={`${color}-${size}`} className="flex justify-left p-2">
                          <Icon size={size} color={color} iconName={`${size}x${color}`}>
                            {`${size} | ${color}`}
                          </Icon>
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
