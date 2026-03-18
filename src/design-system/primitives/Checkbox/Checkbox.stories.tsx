import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import React, { useState } from "react";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

const sizes = ["sm", "md", "lg"] as const;
const colors = storyColors;

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Primitives/Checkbox",
  argTypes: {
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
type Story = StoryObj<typeof Checkbox>;

/** Default Checkbox */
export const Default: Story = {
  render: (args) => {
    const [checkedValues, setCheckedValues] = useState<string[]>(args.value || []);

    const handleChange = (newValue: string[]) => {
      setCheckedValues(newValue);
    };

    return <Checkbox {...args} value={checkedValues} onChange={handleChange} color="red" />;
  },
  args: {
    options: ["default first option", "default second option", "default third option"],
    disabled: false,
  },
};

/** Disabled Checkbox */
export const Disabled: Story = {
  render: (args) => {
    const [checkedValues, setCheckedValues] = useState<string[]>(args.value || []);

    const handleChange = (newValue: string[]) => {
      setCheckedValues(newValue);
    };

    return <Checkbox {...args} value={checkedValues} onChange={handleChange} color="red" />;
  },
  args: {
    options: ["disabled first option", "disabled second option", "disabled third option"],
    disabled: true,
  },
};

/** Gallery */
export const Gallery: Story = {
  render: () => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    const handleChange = (newValue: string[]) => {
      setCheckedValues(newValue);
    };

    return (
      <div className="space-y-4">
        {colors.map((color) => {
          const isWhiteColor = color === "white";
          return (
            <div key={color}>
              <div className={`grid grid-cols-3 gap-2 ${isWhiteColor ? "bg-zinc-300" : ""}`}>
                {sizes.map((size) => (
                  <div key={`${color}-${size}`} className="flex p-2">
                    <Checkbox
                      size={size}
                      color={color}
                      options={[`${color}-${size}`]}
                      value={checkedValues}
                      onChange={handleChange}
                    />
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
