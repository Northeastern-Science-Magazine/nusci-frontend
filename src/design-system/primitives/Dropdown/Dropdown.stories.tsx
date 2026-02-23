import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, type DropdownOption } from "./index";
import React from "react";
import { storyColors } from "@/design-system/utilities/storyTypes/storyColors";

const FRUITS: DropdownOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Lemon", value: "lemon" },
];

const STATES: DropdownOption[] = [
  { label: "Alabama", value: "al" },
  { label: "Alaska", value: "ak" },
  { label: "Arizona", value: "az" },
  { label: "Arkansas", value: "ar" },
  { label: "California", value: "ca" },
  { label: "Colorado", value: "co" },
  { label: "Connecticut", value: "ct" },
  { label: "Delaware", value: "de" },
  { label: "Florida", value: "fl" },
  { label: "Georgia", value: "ga" },
  { label: "Hawaii", value: "hi" },
  { label: "Idaho", value: "id" },
  { label: "Illinois", value: "il" },
  { label: "Indiana", value: "in" },
  { label: "Iowa", value: "ia" },
  { label: "Kansas", value: "ks" },
  { label: "Kentucky", value: "ky" },
  { label: "Louisiana", value: "la" },
  { label: "Maine", value: "me" },
  { label: "Maryland", value: "md" },
  { label: "Massachusetts", value: "ma" },
  { label: "Michigan", value: "mi" },
  { label: "Minnesota", value: "mn" },
  { label: "Mississippi", value: "ms" },
  { label: "Missouri", value: "mo" },
  { label: "Montana", value: "mt" },
  { label: "Nebraska", value: "ne" },
  { label: "Nevada", value: "nv" },
  { label: "New Hampshire", value: "nh" },
  { label: "New Jersey", value: "nj" },
  { label: "New Mexico", value: "nm" },
  { label: "New York", value: "ny" },
  { label: "North Carolina", value: "nc" },
  { label: "North Dakota", value: "nd" },
  { label: "Ohio", value: "oh" },
  { label: "Oklahoma", value: "ok" },
  { label: "Oregon", value: "or" },
  { label: "Pennsylvania", value: "pa" },
  { label: "Rhode Island", value: "ri" },
  { label: "South Carolina", value: "sc" },
  { label: "South Dakota", value: "sd" },
  { label: "Tennessee", value: "tn" },
  { label: "Texas", value: "tx" },
  { label: "Utah", value: "ut" },
  { label: "Vermont", value: "vt" },
  { label: "Virginia", value: "va" },
  { label: "Washington", value: "wa" },
  { label: "West Virginia", value: "wv" },
  { label: "Wisconsin", value: "wi" },
  { label: "Wyoming", value: "wy" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Primitives/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  args: {
    options: FRUITS,
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

export const DropdownGallery: Story = {
  render: () => {
    return (
      <div className="space-y-12 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Single Select</h3>
          <Dropdown options={FRUITS} placeholder="Select a fruit..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Multi Select</h3>
          <Dropdown options={FRUITS} multiSelect placeholder="Select fruits..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Single Select</h3>
          <Dropdown options={STATES} typeahead placeholder="Search for a state..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Multi Select</h3>
          <Dropdown options={STATES} multiSelect typeahead placeholder="Search and select states..." />
        </div>
      </div>
    );
  },
};

export const PreselectedGallery: Story = {
  render: () => {
    return (
      <div className="space-y-12 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Single Select (Preselected)</h3>
          <Dropdown options={FRUITS} defaultValue="apple" placeholder="Select a fruit..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Multi Select (Preselected)</h3>
          <Dropdown options={FRUITS} multiSelect={true} defaultValue={["apple", "banana"]} placeholder="Select fruits..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Single Select (Preselected)</h3>
          <Dropdown options={STATES} typeahead={true} defaultValue="ca" placeholder="Search for a state..." />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Typeahead Multi Select (Preselected)</h3>
          <Dropdown
            options={STATES}
            multiSelect={true}
            typeahead={true}
            defaultValue={["ca", "ny"]}
            placeholder="Search and select states..."
          />
        </div>
      </div>
    );
  },
};

export const SingleSelectGallery: Story = {
  args: {
    options: FRUITS,
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
                <Dropdown {...args} color={color} placeholder="Select a fruit..." />
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
    options: FRUITS,
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
                <Dropdown {...args} color={color} placeholder="Select fruits..." />
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
    options: STATES,
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
                <Dropdown {...args} color={color} placeholder="Search for a state..." />
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
    options: STATES,
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
                <Dropdown {...args} color={color} placeholder="Search and select states..." />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
