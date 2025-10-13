import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import Button from "../Button";

const colors = [
  "black",
  "white",
  "red",
  "aqua",
  "aqua-light",
  "forest-green",
  "sage-green",
  "border",
  "neutral",
  "purple",
  "pink",
  "maroon",
  "coral",
  "marigold",
] as const;

const sizes = ["sm", "md", "lg"] as const;

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: "Primitives/Dialog",
  argTypes: {
    size: { control: "select", options: sizes },
    color: { control: "select", options: colors },
    showClose: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// default story
export const Default: Story = {
  args: {
    size: "md",
    color: "white",
    title: "Example Dialog",
    description: "Description.",
    showClose: true,
    footer: (
      <>
        <Button className="rounded-md bg-black text-white px-3 py-1">
          Confirm
        </Button>
      </>
    ),
  },
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    return (
      <div style={{ minHeight: 300 }}>
        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          trigger={
            <Button variant= "default" size = "md">
              Open Dialog
            </Button>
          }
        >
          <div className="mt-4">Body content goes here.</div>
        </Dialog>
      </div>
    );
  },
};
