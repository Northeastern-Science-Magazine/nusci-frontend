import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";
import React from "react";

const ratio = [1, 2, 3] as const;

const meta: Meta<typeof Image> = {
  component: Image,
  title: "Components/Image",
  argTypes: {
    ratio: {
      control: "select",
      options: ratio,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    ratio: 3,
  },
};
