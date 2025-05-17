import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";
import React from "react";

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: "Components/Tab",
};

export default meta;
type Story = StoryObj<typeof Tab>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    triggers: ["test1", <p>child1</p>],
    children: [<p>child1</p>, <p>child2</p>],
  },
};

/** Gallery Story for all Tab Variants */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        <Tab
          triggers={["test1", <p>child1</p>]}
          children={[<p>child1</p>, <p>child2</p>]}
        />
      </div>
    );
  },
};
