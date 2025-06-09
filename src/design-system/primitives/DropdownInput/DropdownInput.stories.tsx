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
          <DropdownItem value="item1" children={"item1"} />
          <DropdownItem value="item2" children={"item2"} />
          <DropdownItem value="item3" children={"item3"} disabled={true} />
          <DropdownItem value="item4" children={"item4"} />
          <DropdownItem value="item5" children={"item5"} />
          <DropdownItem value="item6" children={"item6"} />
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
          <DropdownItem value="item1" children={"item1"} />
          <DropdownItem value="item2" children={"item2"} />
          <DropdownItem value="item3">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
              }
              alt={"cat"}
              width="200"
            />
          </DropdownItem>
          <DropdownItem value="item4" children={"item4"} disabled={true} />
          <DropdownItem value="item5" children={"item5"} />
          <DropdownItem value="item6" children={"item6"} />
        </DropdownInput>
      </div>
    );
  },
};
