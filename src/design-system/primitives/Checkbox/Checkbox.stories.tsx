import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import React from "react";

/* Modify this when adding variants to Avatar */
const sizes = ["sm", "md", "lg"] as const;
const colors = [ "black", "white", "red", "aqua", "aqua-light", "forest-green", "sage-green", "border",
    "neutral", "purple", "pink", "maroon", "coral", "marigold"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Components/Checkbox",
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    color: {
        control: "select",
        options: colors
    }
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** Story for Default Checkbox */
export const Default: Story = {
  args: {
    options: ['first option', 'second option', 'third option'],
    disabled: false,
    required: false,
  },
};

/** Story for Disabled Checkbox */
export const Disabled: Story = {
    args: {
      options: ['first option', 'second option', 'third option'],
      disabled: true,
      required: false,
    },
  };

  /** Story for Required Checkbox */
export const Required: Story = {
    args: {
      options: ['first option', 'second option', 'third option'],
      disabled: false,
      required: true,
    },
  };

/** Gallery Story for all Button Variants */
export const Gallery: Story = {
    args: {},
    render: () => {
      return (
        <div>
          {colors.map((color) => {
            const isWhiteColor = color === "white";
            return (
              <div key={color}>
                <div className={`grid grid-cols-3 gap-2 ${isWhiteColor ? "bg-zinc-300" : ""}`}>
                        {sizes.map((size) => (
                          <div key={`${size}`} className="flex justify-left p-2">
                            <Checkbox size={size} color={color} options={ ['first option', 'second option', 'third option']}/>
                          </div>
                        ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  };
  
