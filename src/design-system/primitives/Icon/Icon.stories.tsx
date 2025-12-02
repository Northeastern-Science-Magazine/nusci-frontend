import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";
import type { IconProps } from "./variants";
import React from "react";

const sizes: IconProps["size"][] = ["xs", "sm", "md", "lg", "xl"];
const colors: IconProps["color"][] = [
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
];

const icons: IconProps["icon"][] = [
  "search",
  "loader",
  "share",
  "arrowright",
  "arrowleft",
  "bookmark",
  "user",
  "ellipsis",
  "ellipsisv",
  "image",
  "instagram",
  "linkedin",
  "star",
  "trash",
  "zoomin",
  "zoomout",
  "email",
];

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Primitives/Icon",
  argTypes: {
    icon: {
      control: "select",
      options: icons,
    },
    size: {
      control: "select",
      options: sizes,
    },
    color: {
      control: "select",
      options: colors,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "search",
    color: "black",
    size: "md",
    animation: "scale125Hover"
  },
};

export const Color: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 items-center">
      {colors.map((color) => (
        <div key={color} className="flex flex-col items-center">
          <Icon {...args} color={color} />
          <span className="text-xs mt-1">{color}</span>
        </div>
      ))}
    </div>
  ),
  // default setting, but can changed in the story book
  args: {
    icon: "share",
    size: "md",
  },
};

export const Size: Story = {
  render: (args) => (
    <div className="flex flex-row items-end gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center">
          <Icon {...args} size={size} />
          <span className="text-xs mt-1">{size}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    // default setting, but can changed in the story book
    icon: "loader",
    color: "black",
  },
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      {icons.map((icon) =>
        colors.map((color) =>
          sizes.map((size) => {
            const isWhite = color === "white";

            return (
              <div key={`${icon}-${color}-${size}`} className="flex flex-col items-center text-center">
                <div className={`p-2 rounded ${isWhite ? "bg-zinc-300" : ""}`}>
                  <Icon icon={icon} color={color} size={size} />
                </div>
                <span className="text-[10px] mt-1">
                  {icon} | {size} | {color}
                </span>
              </div>
            );
          })
        )
      )}
    </div>
  ),
};
