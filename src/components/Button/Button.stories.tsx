import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/* Modify this when adding variants to Button */
const variants = ["default", "emphasis", "outline"] as const;
const sizes = ["sm", "md", "lg"] as const;
const colors = ["black", "white", "red"] as const;

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  argTypes: {
    variant: {
      control: "select",
      options: variants,
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Hello",
    size: "md",
    variant: "default",
    color: "black",
  },
};

export const Emphasis: Story = {
  args: {
    children: "Click Me",
    size: "md",
    variant: "emphasis",
    color: "black",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    size: "md",
    variant: "outline",
    color: "black",
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant}>
            <div className="">
              {sizes.map((size) => (
                <div key={size}>
                  {/* When adding a color variant, +/- grid cols */}
                  <div className="grid grid-cols-3">
                    {colors.map((color) => {
                      const isWhiteColor = color === "white";
                      return (
                        <div key={color} className={`${isWhiteColor ? "bg-zinc-300" : ""} p-3`}>
                          <Button variant={variant} size={size} color={color}>
                            {`${variant} / ${size} / ${color}`}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
