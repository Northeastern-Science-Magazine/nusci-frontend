import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "Components/Footer",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

/** Story for Default Header */
export const Default: Story = {
  args: {},
};
