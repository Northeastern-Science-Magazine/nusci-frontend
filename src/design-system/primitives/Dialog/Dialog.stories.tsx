import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogTrigger, DialogWindow } from "./Dialog";
import Button from "../Button";
import Box from "../Box";
import Text from "../Text";
import { Grid, GridCol, GridRow } from "../Grid";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

const colors = storyColors;

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

type DialogStoryArgs = {
  windowSize: (typeof sizes)[number];
  windowColor: (typeof colors)[number];
};

const meta: Meta<DialogStoryArgs> = {
  component: Dialog,
  title: "Primitives/Dialog",
  argTypes: {
    windowSize: {
      control: "select",
      options: sizes,
    },
    windowColor: {
      control: "select",
      options: colors,
    },
  },
};

export default meta;
type Story = StoryObj<DialogStoryArgs>;

export const Default: Story = {
  args: {
    windowSize: "md",
    windowColor: "white",
  },
  render: (args) => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>

        <DialogWindow size={args.windowSize} color={args.windowColor}>
          <Box p={4}>
            <Text size={16}>Customizable Dialog Content</Text>
            <Text>
              Size: <strong>{args.windowSize}</strong>
            </Text>
            <Text>
              Color: <strong>{args.windowColor}</strong>
            </Text>
          </Box>
        </DialogWindow>
      </Dialog>
    );
  },
};

export const Gallery: Story = {
  render: () => {
    return (
      <>
        {colors.map((color, i) => (
          <Grid col span={5} key={i}>
            {sizes.map((size) => (
              <GridCol key={`${color}-${size}`} span={1}>
                <Box px={1} py={2}>
                  <Dialog>
                    <DialogTrigger>
                      <Button color={color} className="w-full">
                        {size.toUpperCase()}
                      </Button>
                    </DialogTrigger>

                    <DialogWindow size={size} color={color}>
                      <Box p={4}>
                        <Text size={16}>{size.toUpperCase()} Dialog</Text>
                        <Text>
                          Window color: <strong>{color}</strong>
                        </Text>
                      </Box>
                    </DialogWindow>
                  </Dialog>
                </Box>
              </GridCol>
            ))}
          </Grid>
        ))}
      </>
    );
  },
};
