import type { Meta, StoryObj } from "@storybook/react";
import { DropdownInput, DropdownItem } from "./DropdownInput";
import React from "react";
import Image from "../Image";

/** Define the control fields for Storybook */
const meta: Meta<typeof DropdownInput> = {
  component: DropdownInput,
  title: "Primitives/DropdownInput",
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
          <DropdownItem value="item1">Item 1</DropdownItem>
          <DropdownItem value="item2">Item 2</DropdownItem>
          <DropdownItem value="item3" disabled={true}>
            Item 3
          </DropdownItem>
          <DropdownItem value="item4">Item 4</DropdownItem>
          <DropdownItem value="item5">Item 5</DropdownItem>
          <DropdownItem value="item6">Item 6</DropdownItem>
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
          <DropdownItem value="item1">Item 1</DropdownItem>
          <DropdownItem value="item2">Item 2</DropdownItem>
          <DropdownItem value="item3" disabled={true}>
            <Image
              ratio={16 / 9}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
              alt="cat"
              width="w-[40px]"
            />
          </DropdownItem>
          <DropdownItem value="item4">Item 4</DropdownItem>
          <DropdownItem value="item5">Item 5</DropdownItem>
          <DropdownItem value="item6">Item 6 With a Really Long Name</DropdownItem>
        </DropdownInput>
      </div>
    );
  },
};
