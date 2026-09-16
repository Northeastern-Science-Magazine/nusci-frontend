import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import React from "react";
import Text from "@/design-system/primitives/Text";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

/* Modify this when adding variants to Badge */
const variants = ["default", "outline", "blur"] as const;
const colors = storyColors;
const roundedOptions = ["sm", "md", "lg"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Primitives/Badge",
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    color: {
      control: "select",
      options: colors,
    },
    rounded: {
      control: "select",
      options: roundedOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Culture",
    variant: "default",
    color: "black",
  },
};

/** Story for Outline Variant */
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    color: "black",
  },
};

/** Story for Rounded Variants */
export const RoundedVariants: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-8 p-4">
        {roundedOptions.map((rounded) => (
          <div key={rounded} className="flex items-center gap-4">
            <Text size={14} style="bold" className="min-w-[100px]">
              rounded: {rounded}
            </Text>
            <div className="flex gap-4">
              <Badge variant="default" color="black" rounded={rounded}>
                Default
              </Badge>
              <Badge variant="outline" color="black" rounded={rounded}>
                Outline
              </Badge>
              <Badge variant="blur" color="white" rounded={rounded}>
                Blur
              </Badge>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/** Story for Blur Variant on Background Image */
export const Blur: Story = {
  args: {},
  render: () => {
    return (
      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/succulent.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col gap-6 items-center">
          <div className="flex flex-wrap gap-4 justify-center">
            {colors.map((color) => (
              <Badge key={color} variant="blur" color={color}>
                {color}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/** Gallery Story for all Badge Variants */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="space-y-8 p-4">
        {colors.map((color) => {
          const isWhiteColor = color === "white";
          const needsBackground =
            isWhiteColor ||
            color === "aqua-light" ||
            color === "sage-green" ||
            color === "neutral" ||
            color === "pink" ||
            color === "coral" ||
            color === "marigold";
          return (
            <div key={color} className={needsBackground ? "bg-zinc-300 p-4 rounded" : ""}>
              <Text size={16} style="bold" className="mb-4 capitalize">
                {color}
              </Text>
              <div className="flex flex-wrap gap-4">
                {variants.map((variant) => (
                  <Badge key={`${variant}-${color}`} color={color} variant={variant}>
                    {`${variant} | ${color}`}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
