import type { Meta, StoryObj } from "@storybook/react";
import MultiselectDropdown from "./MultiselectDropdown";
import React from "react";
import { DropdownInput } from "@/design-system/primitives/DropdownInput/DropdownInput";

/** Define the control fields for Storybook */
const meta: Meta<typeof MultiselectDropdown> = {
  component: MultiselectDropdown,
  title: "Primitives/MultiselectDropdown",
};

export default meta;
type Story = StoryObj<typeof MultiselectDropdown>;

/** Story for Default Variant */
export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <MultiselectDropdown
          options={["item1", "item2", "item3", "this is a really long item"]}
        />
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
        <MultiselectDropdown options={["item1", "item2", "item3"]} />
      </div>
    );
  },
};
