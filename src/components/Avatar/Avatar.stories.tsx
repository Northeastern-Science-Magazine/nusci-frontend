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
    args: {}
}