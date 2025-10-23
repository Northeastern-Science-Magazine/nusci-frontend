import type { Meta, StoryObj } from "@storybook/react";
import { Font } from "./Font";
import React from "react";
import Text from "../Text";



const fontNames = 
["sans",
"serif", 
"mono",
"arial",
"helvetica",
"times-new-roman",
"georgia",
"poppins"
] as const;


/** Define the control fields for Storybook */
const meta: Meta<typeof Font> = {
  component: Font,
  title: "Primitives/Font",
  argTypes: {
    fontName: {
      control: "select",
      options: fontNames,
    }
  },
};

export default meta;
type Story = StoryObj<typeof Font>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Hello",
    fontName: "sans"
  },
};

/** Gallery Story for all Button Variants */
export const Gallery: Story = {
  args: {},
  render: () => {
    return (
      <div>
        {fontNames.map((font) => {
            return (
            <Font fontName={font}>
                <Text> {font} </Text>
            </Font>
            );
        })}
        </div>
    );
  },
};
