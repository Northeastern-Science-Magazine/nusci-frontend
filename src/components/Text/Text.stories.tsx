import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";
import React from "react";

/* Modify this when adding variants to Text */
const styles = ["regular", "bold", "italic", "underline", "overline", "strikethrough"] as const;
const sizes = [8, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128] as const;
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
const meta: Meta<typeof Text> = {
  component: Text,
  title: "Components/Text",
  argTypes: {
    style: {
      control: "select",
      options: styles,
    },
    color: {
      control: "select",
      options: colors,
    },
    size: {
      control: "select",
      options: sizes,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "The Quick Brown Fox Jumps Over The Lazy Dog",
    size: 12,
    color: "black",
  },
};

/** Gallery story showing every combination of style and size for each color */
export const TextGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-8 bg-white">
      {colors.map((color) => (
        <div key={color} className={`flex flex-col gap-8 ${color === "white" ? "bg-zinc-300 p-4 rounded-md" : ""}`}>
          {styles.map((style) => (
            <div key={`${color}-${style}`} className="flex flex-col gap-2">
              {sizes.map((size) => (
                <Text key={`${color}-${style}-${size}`} color={color} style={style} size={size}>
                  example text
                </Text>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
