import type { Meta, StoryObj } from "@storybook/react";
import { Tab, TabContent, TabList, TabTrigger } from "./Tab";
import React from "react";

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: "Primitives/Tab",
};

export default meta;
type Story = StoryObj<typeof Tab>;

/** Story for Default Variant */
export const Default: Story = {
  render: (args) => {
    return (
      <Tab defaultValue="tab0">
        <TabList>
          <TabTrigger value="tab0">trigger1</TabTrigger>
          <TabTrigger value="tab1">trigger2</TabTrigger>
        </TabList>
        <TabContent value="tab0">child1</TabContent>
        <TabContent value="tab1">child2</TabContent>
      </Tab>
    );
  },
};

/** Gallery Story for all Tab Variants */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <Tab defaultValue="tab0">
          <TabList>
            <TabTrigger value="tab0">trigger1</TabTrigger>
            <TabTrigger value="tab1">trigger2</TabTrigger>
          </TabList>
          <TabContent value="tab0">child1</TabContent>
          <TabContent value="tab1">child2</TabContent>
        </Tab>

        <Tab>
          <TabList>
            <TabTrigger value="tab0">trigger1</TabTrigger>
            <TabTrigger value="tab1">trigger2</TabTrigger>
            <TabTrigger value="tab2">trigger3</TabTrigger>
          </TabList>
          <TabContent value="tab0">child1</TabContent>
          <TabContent value="tab1">child2</TabContent>
          <TabContent value="tab2">child3</TabContent>
        </Tab>
      </div>
    );
  },
};
