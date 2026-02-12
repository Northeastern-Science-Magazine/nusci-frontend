import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";
import type { IconProps } from "./variants";
import React from "react";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

const stringSizes: IconProps["size"][] = ["xs", "sm", "md", "lg", "xl"];
const numericSizes: IconProps["size"][] = [4, 8, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128, 256, 324, 400, 500, 600, 700, 800, 900, 1000];
const allSizes: IconProps["size"][] = [...stringSizes, ...numericSizes];
const colors = storyColors;

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
  "cross",
  "email",
  "menu",
  "x",
  "plus",
  "info",
  "camera",
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
      options: allSizes,
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
    animation: "scale125Hover",
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
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold">String Sizes</h3>
        <div className="flex flex-row items-end gap-4">
          {stringSizes.map((size) => (
            <div key={size} className="flex flex-col items-center">
              <Icon {...args} size={size} />
              <span className="text-xs mt-1">{size}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold">Numeric Sizes</h3>
        <div className="flex flex-row items-end gap-4 flex-wrap">
          {numericSizes.map((size) => (
            <div key={size} className="flex flex-col items-center">
              <Icon {...args} size={size} />
              <span className="text-xs mt-1">{size}px</span>
            </div>
          ))}
        </div>
      </div>
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
          stringSizes.map((size) => {
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
          }),
        ),
      )}
    </div>
  ),
};

export const NumericSize: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Numeric Size Values</h3>
        <p className="mb-4 text-sm text-gray-600">
          The size prop accepts numeric values (pixels) from the Tailwind variants. All sizes use Tailwind classes for consistent styling.
        </p>
        <div className="flex flex-wrap gap-6 items-end">
          {numericSizes.map((size) => (
            <div key={size} className="flex flex-col items-center">
              <Icon icon="star" color="purple" size={size} />
              <span className="text-xs mt-2">{size}px</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Large Icons (Image Replacement)</h3>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center p-4 border rounded">
            <Icon icon="camera" color="aqua" size={128} />
            <span className="text-xs mt-2">128px</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded">
            <Icon icon="image" color="forest-green" size={256} />
            <span className="text-xs mt-2">256px</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded">
            <Icon icon="star" color="marigold" size={324} />
            <span className="text-xs mt-2">324px</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded">
            <Icon icon="camera" color="purple" size={400} />
            <span className="text-xs mt-2">400px</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded">
            <Icon icon="star" color="pink" size={500} />
            <span className="text-xs mt-2">500px</span>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    icon: "star",
    color: "purple",
  },
};
