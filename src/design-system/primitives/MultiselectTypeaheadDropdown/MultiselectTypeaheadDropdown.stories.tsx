import type { Meta, StoryObj } from "@storybook/react";
import { MultiselectTypeaheadDropdown, MultiSelectOption } from "./MultiselectTypeaheadDropdown";

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

export const WithDefaults: Story = {
  args: {
    defaultValue: ["react", "ts"],
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `opt-${i + 1}`,
    })),
  },
};

export const OnChangeLogger: Story = {
  args: {
    onChange: (values) => {
      console.log("Selected:", values);
    },
  },
};
