import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCustom } from "./Avatar";
import React from "react";


/* Modify this when adding variants to Avatar */
const variants = ["default", "emphasis", "outline"] as const;
const shapes = ["rounded"] as const;

const meta: Meta<typeof AvatarCustom> = {
  component: AvatarCustom,
  title: "Components/Avatar",
  argTypes: {
    
    // variant: {
    //   control: "select",
    //   options: variants,
    // },
    // size: {
    //   control: "select",
    //   options: sizes,
    // },
    // color: {
    //   control: "select",
    //   options: colors,
    // },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarCustom>;

export const Default: Story = {
    args: {
        src: "https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg",
        alt: "a blue surgeonfish avatar",
        fallback: "SX"
    }
}

export const TextAvatar: Story = {
  args: {
      src: "",
      alt: undefined,
      fallback: "SXU"
  }
}