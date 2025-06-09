import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";
import React from "react";

const emphasis = ["default", "emphasis"] as const;
const rounded = ["default", "rounded"] as const;

const meta: Meta<typeof Image> = {
  component: Image,
  title: "Primitives/Image",
  argTypes: {
    emphasis: {
      control: "select",
      options: emphasis,
    },
    rounded: {
      control: "select",
      options: rounded,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    ratio: 16 / 9,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: "w-[300px]",
    emphasis: "default",
    rounded: "default",
  },
};

export const Ratio: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: "w-[300px]",
    emphasis: "default",
    rounded: "default",
  },
};

export const Rounded: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: "w-[300px]",
    emphasis: "default",
    rounded: "rounded",
  },
};

export const Emphasis: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: "w-[300px]",
    emphasis: "emphasis",
    rounded: "default",
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="space-y-8">
        <h3 className="text-lg font-bold"></h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {rounded.map((rounded) =>
            emphasis.map((emphasis) => (
              <div key={`${rounded}-${emphasis}`} className="flex flex-col gap-2">
                <Image
                  ratio={1}
                  rounded={rounded}
                  emphasis={emphasis}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
                  alt="cat"
                  width="w-[300px]"
                />
                <div className="text-s text-muted-foreground">
                  <p>Rounded: {rounded}</p>
                  <p>Emphasis: {emphasis}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  },
};
