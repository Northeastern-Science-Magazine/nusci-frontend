import type { Meta, StoryObj } from "@storybook/react";
import { DropdownInput, DropdownItem } from "./DropdownInput";
import React from "react";
import Image from "../Image";

const sizes = ["xl", "lg", "md", "sm", "xs"] as const;
const colors = [
    "black",
    "white",
    "red",
    "aqua",
    "aqua-light",
    "forest-green",
    "sage-green",
    "border",
    "neutral",
    "purple",
    "pink",
    "maroon",
    "coral",
    "marigold",
  ] as const;

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

/** Gallery story showing every combination of style and size for each color */
export const DropdownGallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        {colors.map((color) => (
          <div key={color} className="flex flex-col gap-y-2 my-2">
            {sizes.map((size) => (
              <div key={`${color}-${size}`}>
                <DropdownInput size={size} color={color} placeholder="select here">
                  <DropdownItem size={size} color={color} value="item1">{`${color} | ${size} (1)`}</DropdownItem>
                  <DropdownItem size={size} color={color} value="item2">{`${color} | ${size} (2)`}</DropdownItem>
                  <DropdownItem size={size} color={color} value="item3" disabled={true}>
                    <Image
                      ratio={16 / 9}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
                      alt="cat"
                      width="w-[20px]"
                    />
                  </DropdownItem>
                  <DropdownItem size={size} color={color} value="item4">{`${color} | ${size} (3)`}</DropdownItem>
                  <DropdownItem size={size} color={color} value="item5">{`${color} | ${size} (4)`}</DropdownItem>
                  <DropdownItem size={size} color={color} value="item6">{`${color} | ${size} (5)`}</DropdownItem>
                  <DropdownItem size={size} color={color} value="item7" disabled={true}>
                    <Image
                      ratio={16 / 9}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
                      alt="cat"
                      width="w-[80px]"
                    />
                  </DropdownItem>
                </DropdownInput>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
