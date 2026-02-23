import type { Meta, StoryObj } from "@storybook/react";
import { MultiselectTypeaheadDropdown, MultiSelectOption } from "./index";
import React from "react";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

const OPTIONS: MultiSelectOption[] = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "ts" },
  { label: "JavaScript", value: "js" },
  { label: "Node.js", value: "node" },
  { label: "Next.js", value: "next" },
  { label: "GraphQL", value: "graphql" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "k8s" },
  { label: "Tailwind", value: "tailwind" },
  { label: "Vite", value: "vite" },
  { label: "Redux", value: "redux" },
  { label: "Zustand", value: "zustand" },
];

const meta: Meta<typeof MultiselectTypeaheadDropdown> = {
  title: "Components/MultiselectTypeaheadDropdown",
  component: MultiselectTypeaheadDropdown,
  parameters: {
    layout: "centered",
  },
  args: {
    options: OPTIONS,
    placeholder: "Search technologies...",
  },
};

export default meta;

type Story = StoryObj<typeof MultiselectTypeaheadDropdown>;

export const Default: Story = {};

export const Preselected: Story = {
  args: {
    defaultValue: ["react", "ts"],
  },
};

/** Gallery Story for all Color Variants */
export const Gallery: Story = {
  args: {},
  render: (args) => {
    const colors = storyColors;
    return (
      <div className="space-y-8">
        {colors.map((color) => {
          const isWhite = color === "white";
          return (
            <div key={color} className={isWhite ? "bg-zinc-300 p-4 rounded" : ""}>
              <h2 className="text-xl font-bold mb-4 capitalize">{color}</h2>
              <div className="max-w-md">
                <MultiselectTypeaheadDropdown {...args} color={color} placeholder={"Search..."} />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
