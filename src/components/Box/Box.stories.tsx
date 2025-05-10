import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";
import React from "react";

/* Modify this when adding variants to Box */
const positions = ["static", "fixed", "absolute", "relative", "sticky"] as const;
const displays = ["inline", "block", "inline-block", "hidden"] as const;
const widths = ["full", "screen", "auto", "min", "max"] as const;
const heights = ["full", "screen", "auto", "min", "max", "fit"] as const;
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
const colors = [ "black", "white", "red", "aqua", "aqua-light", "forest-green", "sage-green", "border",
  "neutral", "purple", "pink", "maroon", "coral", "marigold"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Box> = {
  component: Box,
  title: "Components/Box",
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
      options: widths
    },
    height: {
      control: "select",
      options: heights
    },
    top: {
      control: "select",
      options: tops
    },
    bottom: {
      control: "select",
      options: bottoms
    },
    left: {
      control: "select",
      options: lefts
    },
    right: {
      control: "select",
      options: rights
    },
    m: {
      control: "select",
      options: ms
    },
    mx: {
      control: "select",
      options: mxs
    },
    my: {
      control: "select",
      options: mys
    },
    mt: {
      control: "select",
      options: mts
    },
    mb: {
      control: "select",
      options: mbs
    },
    mr: {
      control: "select",
      options: mrs
    },
    ml: {
      control: "select",
      options: mls
    },
    p: {
      control: "select",
      options: ps
    },
    px: {
      control: "select",
      options: pxs
    },
    py: {
      control: "select",
      options: pys
    },
    pt: {
      control: "select",
      options: pts
    },
    pb: {
      control: "select",
      options: pbs
    },
    pr: {
      control: "select",
      options: prs
    },
    pl: {
      control: "select",
      options: pls
    },
    color: {
      control: "select",
      options: colors
    }
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
    p: 4
  }
};

/** Gallery Story for some box variants with ranging background color, width, and height */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        {colors.map((backgroundColor) => {
          return (
            <div key={backgroundColor}>
              <div className={`grid grid-cols-3 gap-2`}>
                {widths.map((width) => (
                  <React.Fragment key={width}>
                    <div className="flex flex-col">
                      {heights.map((height) => (
                        <div key={`${width}-${height}`} className="flex justify-left p-2">
                          <Box height={height} width={width} color={backgroundColor}>
                          {width} x {height}
                          </Box>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
