import type { Meta, StoryObj } from "@storybook/react";
import { Font } from "./Font";
import React from "react";
import Card from "../Card"

const fontNames = 
["sans",
"serif", 
"mono",
"arial",
"georgia",
"poppins",
"comic-sans",
"verdana",
"tahoma",
"lucida-console",
"futura",
] as const;


/** Define the control fields for Storybook */
const meta: Meta<typeof Font> = {
  component: Font,
  title: "Primitives/Font",
  argTypes: {
    sans: { control: "boolean" },
    serif: { control: "boolean" },
    mono: { control: "boolean" },
    arial: { control: "boolean" },
    georgia: { control: "boolean" },
    poppins: { control: "boolean" },
    "comic-sans": {control:"boolean"},
    verdana: {control:"boolean"},
    tahoma: {control:"boolean"},
    courier: {control:"boolean"},
    "lucida-console": {control:"boolean"},
    futura: {control:"boolean"},
  },
};

export default meta;
type Story = StoryObj<typeof Font>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Hello",
    sans: true
  },
  render: (args) => <Font {...args}>{args.children}</Font>,
}

/** Gallery Story for all Button Variants */
export const Gallery: Story = {
  args: {},
  render: () => {
    return (
      <div>
        {fontNames.map((font) => {
            return (
            <Font {...{ [font]: true }}>
                <Card height="auto" width="auto" color="red"> {font} </Card>
            </Font>
            );
        })}
        </div>
    );
  },
};
