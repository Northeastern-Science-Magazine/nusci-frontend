import type { Meta, StoryObj } from "@storybook/react";
import { AvatarCustom } from "./Avatar";
import React from "react";

const meta: Meta<typeof AvatarCustom> = {
  component: AvatarCustom,
  title: "Components/Avatar"
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
      fallback: "SXU"
  }
}