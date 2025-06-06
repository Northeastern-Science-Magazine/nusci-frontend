import type { Meta, StoryObj } from "@storybook/react";
import { DropdownInput, DropdownItem } from "./DropdownInput";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof DropdownInput> = {
  component: DropdownInput,
  title: "Components/DropdownInput",
};

export default meta;
type Story = StoryObj<typeof DropdownInput>;

/** Story for Default Variant */
export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <DropdownInput placeholder="select here">
          <DropdownItem text="item1" />
          <DropdownItem text="item2" />
          <DropdownItem text="item3" disabled={true} />
          <DropdownItem text="item4" />
          <DropdownItem text="item5" />
          <DropdownItem text="item6" />
        </DropdownInput>
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
        <DropdownInput placeholder="select here">
          <DropdownItem text="item1" />
          <DropdownItem text="item2" />
          <DropdownItem text="item3" />
          <DropdownItem text="item4" disabled={true} />
          <DropdownItem text="item5" />
          <DropdownItem text="item6" />
        </DropdownInput>
      </div>
    );
  },
};
