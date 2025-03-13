import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";
import React from "react";

const ratio = [1, 2, 3] as const;
type Ratio = (typeof ratio)[number];

const emphasis = ["default", "emphasis"] as const;
const rounded = ["default", "rounded"] as const;

const meta: Meta<typeof Image> = {
  component: Image,
  title: "Components/Image",
  argTypes: {
    ratio: {
      control: "select",
      options: ratio,
    },
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
    ratio: 3,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: 300,
    emphasis: "default",
    rounded: "default",
  },
};

export const Ratio: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: 300,
    emphasis: "default",
    rounded: "default",
  },
};

export const Rounded: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: 300,
    emphasis: "default",
    rounded: "rounded",
  },
};

export const Emphasis: Story = {
  args: {
    ratio: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    alt: "cat",
    width: 300,
    emphasis: "emphasis",
    rounded: "default",
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
      <div className="space-y-8">
        {ratios.map((ratio) => (
          <div key={ratio.value} className="space-y-4">
            <h3 className="text-lg font-bold">{ratio.label}</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {rounded.map((rounded) =>
                emphasis.map((emphasis) => (
                  <div
                    key={`${ratio.value}-${rounded}-${emphasis}`}
                    className="flex flex-col gap-2"
                  >
                    <Image
                      ratio={ratio.value}
                      rounded={rounded}
                      emphasis={emphasis}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
                      alt="cat"
                      width={300}
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
        ))}
      </div>
    );
  },
};
