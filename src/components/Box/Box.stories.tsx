import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";
import React from "react";

/* Modify this when adding variants to Box */
const backgroundColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-purple-500", "bg-white-500"] as const;
const width = ["w-12", "w-20", "w-32", "w-64"] as const;
const margin = [ "m-4", "m-8", "m-16"] as const;
const height = ["h-12", "h-20", "h-32", "h-64"] as const;
const padding = ["p-4", "p-8", "p-12"] as const;


/** Define the control fields for Storybook */
const meta: Meta<typeof Box> = {
  component: Box,
  title: "Components/Box",
  argTypes: {
    backgroundColor: {
      control: "select",
      options: backgroundColors,
    },
    width: {
      control: "select",
      options: width,
    },
    margin: {
      control: "select",
      options: margin,
    },
    height: {
        control: "select",
        options: height,
    },
    padding: {
        control: "select",
        options: padding,
    }
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: "Text to put within box",
    backgroundColor: "bg-red-500",
    width: "w-32",
    margin: "m-8",
    height: "h-32",
    padding: "p-4"
  }
};

/** Gallery Story for some box variants with ranging background color, width, and height */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        {backgroundColors.map((backgroundColor) => {
          return (
            <div key={backgroundColor}>
              <div className={`grid grid-cols-3 gap-2`}>
                {width.map((width) => (
                  <React.Fragment key={width}>
                    <div className="flex flex-col">
                      {height.map((height) => (
                        <div key={`${width}-${height}`} className="flex justify-left p-2">
                          <Box height={height} width={width} backgroundColor={backgroundColor}>
                            {}
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
