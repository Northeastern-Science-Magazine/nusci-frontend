import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import React from "react";

/* Modify this when adding variants to Avatar */
const sizes = ["sm", "md", "lg"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Primitives/Avatar",
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/** Story for Default Avatar */
export const Default: Story = {
  args: {
    src: "https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg",
    alt: "a blue surgeonfish avatar",
    fallback: "SX",
  },
};

/** Story for Text Avatar */
export const TextAvatar: Story = {
  args: {
    src: "",
    alt: undefined,
    fallback: "SXU",
  },
};

/** Gallery Story for all Avatar Variants */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    const srcs = ["https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg", ""];
    return (
      <div>
        {sizes.map((size) => {
          return (
            <div key={size} className="flex flex-row p-1 gap-7 place-content-evenly">
              <Avatar
                src="https://cdn.britannica.com/73/9173-050-9D9EA4BA/Surgeonfish.jpg"
                alt="a blue surgeonfish avatar"
                fallback="SX"
                size={size}
              ></Avatar>
              <Avatar src="" alt="a blue surgeonfish avatar" fallback="SX" size={size}></Avatar>
            </div>
          );
        })}
      </div>
    );
  },
};
