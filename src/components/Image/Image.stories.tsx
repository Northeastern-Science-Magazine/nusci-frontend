import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";
import React from "react";

const ratio = [1, 2, 3] as const;
type Ratio = typeof ratio[number];

const meta: Meta<typeof Image> = {
  component: Image,
  title: "Components/Image",
  argTypes: {
    ratio: {
      control: "select",
      options: ratio,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    ratio: 3,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
  },
};

/** Story for 16/9 Variant */
export const Video: Story = {
  args: {
    ratio: 2,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
  },
};

/** Story for 4/3 Variant */
export const Square: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    const ratios: { label: string; value: Ratio }[] = [
      { label: "1:1", value: 1 },
      { label: "16:9", value: 2 },
      { label: "4:3", value: 3 },
    ];
    return (
      <div>
        {ratios.map((ratioVal) => (
          <React.Fragment key={ratioVal.label}>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 p-2">
                <span className="font-medium min-w-[60px]">
                  {ratioVal.label}
                </span>
                <Image
                  ratio={ratioVal.value}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
                  alt="cat"
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  },
};
