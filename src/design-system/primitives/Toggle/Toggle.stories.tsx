import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
import React from "react";

const variants = ["default", "success", "danger"] as const;
const sizes = ["default", "sm", "lg"] as const;

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Components/Toggle",
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    },
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    labelClassName: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    label: "Airplane Mode",
  },
};

export const Gallery: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{variant}</h3>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <span className="text-sm capitalize">{size}</span>
                  <Toggle
                    variant={variant}
                    size={size}
                    defaultChecked
                    label={`${variant} ${size}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};