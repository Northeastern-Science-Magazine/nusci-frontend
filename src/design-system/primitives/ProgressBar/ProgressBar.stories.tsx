import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Primitives/ProgressBar",
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

/** Story for Default Variant */
export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <ProgressBar percentComplete={50} />
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
        <ProgressBar percentComplete={25} color="red" />
        <ProgressBar
          percentComplete={50}
          backgroundColor="black"
          color="aqua-light"
        />
        <ProgressBar percentComplete={75} />
        <ProgressBar percentComplete={100} />
      </div>
    );
  },
};
