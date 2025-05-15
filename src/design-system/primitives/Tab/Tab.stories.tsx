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
    triggers: ["test1", "test2"],
    children: [<p>child1</p>, <p>child2</p>], 
  },
};

export const Gallery: Story = {
  args: {},
  render: (args) => {
    return <Tab triggers={["test1", "test2"]} children={[<p>child1</p>, <p>child2</p>]}/>;
  },
};
