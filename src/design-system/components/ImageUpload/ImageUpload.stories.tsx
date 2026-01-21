import type { Meta, StoryObj } from "@storybook/react";
import ImageUpload from "./ImageUpload";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof ImageUpload> = {
  component: ImageUpload,
  title: "Components/ImageUpload",
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

/** Story for Default Variant */
export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <ImageUpload/>
      </div>
    );
  },
};

/** Gallery story showing every combination of style and size for each color */
export const DropdownGallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <ImageUpload />
      </div>
    );
  },
};
