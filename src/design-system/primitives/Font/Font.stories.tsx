import type { Meta, StoryObj } from "@storybook/react";
import { Font } from "./Font";
import React from "react";
import Card from "../Card";
import Box from "../Box";

const fontNames = [
  "sans",
  "serif",
  "mono",
  "arial",
  "georgia",
  "poppins",
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
    verdana: { control: "boolean" },
    tahoma: { control: "boolean" },
    courier: { control: "boolean" },
    "lucida-console": { control: "boolean" },
    futura: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Font>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Hello",
    sans: true,
  },
  render: (args) => <Font {...args}>{args.children}</Font>,
};

/** Scoped Fonts */
export const NestedFonts: Story = {
  args: {},
  render: () => {
    return (
      <Box>
        <Font arial>
          This should be arial font.
          <Font courier> This should be courier font.</Font>
          This should be arial font.
        </Font>
      </Box>
    );
  },
};

/** Gallery Story for all Button Variants */
export const Gallery: Story = {
  args: {},
  render: () => {
    return (
      <Box>
        {fontNames.map((font) => {
          return (
            <Font {...{ [font]: true }} key={font}>
              <Card>{font}</Card>
            </Font>
          );
        })}
      </Box>
    );
  },
};
