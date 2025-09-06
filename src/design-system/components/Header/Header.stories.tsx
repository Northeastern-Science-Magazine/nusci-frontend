import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof Header> = {
  component: Header,
  title: "Components/Header",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

/** Story for Default Header */
export const Default: Story = {
  args: {},
};
