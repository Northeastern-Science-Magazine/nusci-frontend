import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCustom } from "./Avatar";
import React from "react";


/* Modify this when adding variants to Avatar */
const variants = ["default", "emphasis", "outline"] as const;
const shapes = ["round"] as const;
const sizes = ["sm", "md", "lg"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof AvatarCustom> = {
  component: AvatarCustom,
  title: "Components/Avatar",
  argTypes: {
    shape: {
      control: "select",
      options: shapes,
    },
    size: {
      control: "select",
      options: sizes,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarCustom>;

/** Story for Default Avatar */
export const Default: Story = {
    args: {
        src: "https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg",
        alt: "a blue surgeonfish avatar",
        fallback: "SX"
    }
}

/** Story for Text Avatar */
export const TextAvatar: Story = {
  args: {
      src: "",
      alt: undefined,
      fallback: "SXU"
  }
}