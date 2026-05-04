import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";
import React from "react";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

/* Modify this when adding variants to Box */
const positions = ["static", "fixed", "absolute", "relative", "sticky"] as const;
const displays = ["inline", "block", "inline-block", "hidden"] as const;
const widths = [
  "full",
  "screen",
  "auto",
  "min",
  "max",
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96,
  128,
  256,
  324,
  400,
  500,
  600,
  700,
  700,
  900,
  1000,
] as const;
const minWidths = [
  "full",
  "screen",
  "auto",
  "min",
  "max",
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96,
  128,
  256,
  324,
  400,
  500,
  600,
  700,
  700,
  900,
  1000,
] as const;
const maxWidths = [
  "full",
  "screen",
  "auto",
  "min",
  "max",
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96,
  128,
  256,
  324,
  400,
  500,
  600,
  700,
  700,
  900,
  1000,
] as const;
const heights = [
  "full",
  "screen",
  "auto",
  "min",
  "max",
  "fit",
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96,
  128,
  256,
  324,
  400,
  500,
  600,
  700,
  700,
  900,
  1000,
] as const;
const minHeights = [
  "full",
  "screen",
  "auto",
  "min",
  "max",
  "fit",
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96,
  128,
  256,
  324,
  400,
  500,
  600,
  700,
  700,
  900,
  1000,
] as const;
const maxHeights = [
  "full",
  "screen",
  "auto",
  "min",
  "max",
  "fit",
  4,
  8,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96,
  128,
  256,
  324,
  400,
  500,
  600,
  700,
  700,
  900,
  1000,
] as const;
const tops = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const bottoms = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const lefts = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const rights = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const ms = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const mxs = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const mys = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const mts = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const mbs = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const mrs = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const mls = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const ps = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const pxs = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const pys = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const pts = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const pbs = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const prs = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const pls = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;
const colors = storyColors;

/** Define the control fields for Storybook */
const meta: Meta<typeof Box> = {
  component: Box,
  title: "Primitives/Box",
  argTypes: {
    position: {
      control: "select",
      options: positions,
    },
    display: {
      control: "select",
      options: displays,
    },
    width: {
      control: "select",
      options: widths,
    },
    height: {
      control: "select",
      options: heights,
    },
    minWidth: {
      control: "select",
      options: minWidths,
    },
    maxWidth: {
      control: "select",
      options: maxWidths,
    },
    minHeight: {
      control: "select",
      options: minHeights,
    },
    maxHeight: {
      control: "select",
      options: maxHeights,
    },
    top: {
      control: "select",
      options: tops,
    },
    bottom: {
      control: "select",
      options: bottoms,
    },
    left: {
      control: "select",
      options: lefts,
    },
    right: {
      control: "select",
      options: rights,
    },
    m: {
      control: "select",
      options: ms,
    },
    mx: {
      control: "select",
      options: mxs,
    },
    my: {
      control: "select",
      options: mys,
    },
    mt: {
      control: "select",
      options: mts,
    },
    mb: {
      control: "select",
      options: mbs,
    },
    mr: {
      control: "select",
      options: mrs,
    },
    ml: {
      control: "select",
      options: mls,
    },
    p: {
      control: "select",
      options: ps,
    },
    px: {
      control: "select",
      options: pxs,
    },
    py: {
      control: "select",
      options: pys,
    },
    pt: {
      control: "select",
      options: pts,
    },
    pb: {
      control: "select",
      options: pbs,
    },
    pr: {
      control: "select",
      options: prs,
    },
    pl: {
      control: "select",
      options: pls,
    },
    color: {
      control: "select",
      options: colors,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Text to put within box",
    color: "red",
    width: "full",
    m: 8,
    height: "full",
    p: 4,
  },
};
