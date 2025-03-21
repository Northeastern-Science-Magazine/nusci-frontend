import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import React from "react";


const variants = ["outline", "filled"] as const;
const sizes = ["lg", "md", "sm"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Text> = {
  component: Text,
  title: "Components/Text",
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    }
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    size: "md",
    variant: "outline",
  },
};


