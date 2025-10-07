import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import Button from "../Button";

const colors = ["blue", "neutral", "green", "red"] as const;

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
    color: "blue",
    title: "Example Dialog",
    description: "Hello World.",
    showClose: true,
    footer: (
      <>
        <Button className="rounded-md border px-3 py-1">Cancel</Button>
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
            <Button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
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
