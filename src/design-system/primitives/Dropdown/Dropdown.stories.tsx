import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, type DropdownOption } from "./index";
import React from "react";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

const OPTIONS: DropdownOption[] = [
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

const meta: Meta<typeof Dropdown> = {
  title: "Primitives/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  args: {
    options: OPTIONS,
    placeholder: "Select an option...",
  },
  argTypes: {
    multiSelect: {
      control: "boolean",
    },
    typeahead: {
      control: "boolean",
    },
    color: {
      control: "select",
      options: storyColors,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

/* ============================================================
   Dropdown Gallery
   ============================================================ */

export const DropdownGallery: Story = {
  render: () => {
    return (
      <div className="space-y-12 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Single Select</h3>
          <Dropdown options={OPTIONS} placeholder="Select a technology..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Multi Select</h3>
          <Dropdown options={OPTIONS} multiSelect={true} placeholder="Select technologies..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Single Select</h3>
          <Dropdown options={OPTIONS} typeahead={true} placeholder="Search and select..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Multi Select</h3>
          <Dropdown options={OPTIONS} multiSelect={true} typeahead={true} placeholder="Search and select multiple..." />
        </div>
      </div>
    );
  },
};

/* ============================================================
   Preselected Gallery
   ============================================================ */

export const PreselectedGallery: Story = {
  render: () => {
    return (
      <div className="space-y-12 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Single Select (Preselected)</h3>
          <Dropdown options={OPTIONS} defaultValue="react" placeholder="Select a technology..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Multi Select (Preselected)</h3>
          <Dropdown options={OPTIONS} multiSelect={true} defaultValue={["react", "ts"]} placeholder="Select technologies..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Single Select (Preselected)</h3>
          <Dropdown options={OPTIONS} typeahead={true} defaultValue="react" placeholder="Search and select..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Multi Select (Preselected)</h3>
          <Dropdown
            options={OPTIONS}
            multiSelect={true}
            typeahead={true}
            defaultValue={["react", "ts"]}
            placeholder="Search and select multiple..."
          />
        </div>
      </div>
    );
  },
};

/* ============================================================
   Color Gallery Stories
   ============================================================ */

export const SingleSelectGallery: Story = {
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
                <Dropdown {...args} color={color} placeholder="Select an option..." />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const MultiSelectGallery: Story = {
  args: {
    multiSelect: true,
  },
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
                <Dropdown {...args} color={color} placeholder="Select options..." />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const TypeaheadSingleGallery: Story = {
  args: {
    typeahead: true,
  },
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
                <Dropdown {...args} color={color} placeholder="Search and select..." />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

export const TypeaheadMultiGallery: Story = {
  args: {
    multiSelect: true,
    typeahead: true,
  },
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
                <Dropdown {...args} color={color} placeholder="Search and select multiple..." />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
