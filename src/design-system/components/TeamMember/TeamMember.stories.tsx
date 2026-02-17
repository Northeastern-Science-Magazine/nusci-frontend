import type { Meta, StoryObj } from "@storybook/react";
import { TeamMember } from "./TeamMember";
import React from "react";

const sizes = ["sm", "md", "lg"] as const;
const roundedOptions = ["rounded", "none"] as const;
const shadowOptions = ["shadow", "none"] as const;
const borderOptions = ["bordered", "none"] as const;
const colorOptions = [
  "white",
  "black",
  "aqua",
  "aqua-light",
  "forest-green",
  "sage-green",
  "neutral",
  "purple",
  "pink",
  "maroon",
  "coral",
  "marigold",
  "red",
  "border",
] as const;

const meta: Meta<typeof TeamMember> = {
  component: TeamMember,
  title: "Components/TeamMember",
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    rounded: {
      control: "select",
      options: roundedOptions,
    },
    shadow: {
      control: "select",
      options: shadowOptions,
    },
    border: {
      control: "select",
      options: borderOptions,
    },
    color: {
      control: "select",
      options: colorOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamMember>;

const sampleMember = {
  name: "Jane Doe",
  pronouns: "she/her",
  role: "President",
  bio: "Jane is a senior studying computer science with a passion for building accessible web applications and mentoring new developers.",
  graduationYear: 2026,
  major: "Computer Science",
  email: "jane.doe@university.edu",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
};

const sampleMembers = [
  {
    ...sampleMember,
  },
  {
    name: "Alex Chen",
    pronouns: "they/them",
    role: "Vice President",
    bio: "Alex focuses on machine learning research and enjoys organizing hackathons for the club.",
    graduationYear: 2027,
    major: "Data Science",
    email: "alex.chen@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Marcus Johnson",
    pronouns: "he/him",
    bio: "Marcus is interested in systems programming and open-source contributions.",
    graduationYear: 2028,
    major: "Software Engineering",
    email: "marcus.j@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Priya Patel",
    pronouns: "she/her",
    role: "Treasurer",
    bio: "Priya combines her love for design and code, specializing in UI/UX and frontend development.",
    graduationYear: 2026,
    major: "Information Science",
    email: "priya.p@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

export const Default: Story = {
  args: {
    ...sampleMember,
    size: "md",
    rounded: "rounded",
    shadow: "shadow",
    border: "bordered",
    color: "white",
  },
};

export const Small: Story = {
  args: {
    ...sampleMember,
    size: "sm",
    rounded: "rounded",
    shadow: "shadow",
    border: "bordered",
  },
};

export const Large: Story = {
  args: {
    ...sampleMember,
    size: "lg",
    rounded: "rounded",
    shadow: "shadow",
    border: "bordered",
  },
};

export const WithoutRole: Story = {
  args: {
    ...sampleMembers[2],
    size: "md",
    rounded: "rounded",
    shadow: "shadow",
    border: "bordered",
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4 flex-wrap items-start">
      {sizes.map((size) => (
        <div key={size}>
          <p className="mb-2 font-semibold">Size: {size}</p>
          <TeamMember {...sampleMember} size={size} />
        </div>
      ))}
    </div>
  ),
};

export const RoundingVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4 flex-wrap items-start">
      {roundedOptions.map((r) => (
        <div key={r}>
          <p className="mb-2 font-semibold">Rounded: {r}</p>
          <TeamMember {...sampleMember} rounded={r} border="bordered" />
        </div>
      ))}
    </div>
  ),
};

export const ShadowVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4 flex-wrap items-start">
      {shadowOptions.map((s) => (
        <div key={s}>
          <p className="mb-2 font-semibold">Shadow: {s}</p>
          <TeamMember {...sampleMember} shadow={s} border="bordered" />
        </div>
      ))}
    </div>
  ),
};

export const BorderVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4 flex-wrap items-start">
      {borderOptions.map((b) => (
        <div key={b}>
          <p className="mb-2 font-semibold">Border: {b}</p>
          <TeamMember {...sampleMember} border={b} />
        </div>
      ))}
    </div>
  ),
};

export const ShadowAndBorderCombination: Story = {
  render: () => (
    <div className="flex gap-8 p-4 flex-wrap items-start">
      <div>
        <p className="mb-2 font-medium">Shadow + Border</p>
        <TeamMember {...sampleMember} shadow="shadow" border="bordered" />
      </div>
      <div>
        <p className="mb-2 font-medium">Shadow Only</p>
        <TeamMember {...sampleMember} shadow="shadow" border="none" />
      </div>
      <div>
        <p className="mb-2 font-medium">Border Only</p>
        <TeamMember {...sampleMember} shadow="none" border="bordered" />
      </div>
      <div>
        <p className="mb-2 font-medium">Plain</p>
        <TeamMember {...sampleMember} shadow="none" border="none" />
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      {colorOptions.map((c) => (
        <div key={c}>
          <p className="mb-2 font-semibold capitalize">{c}</p>
          <TeamMember {...sampleMember} color={c} />
        </div>
      ))}
    </div>
  ),
};

export const TeamGrid: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Team Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleMembers.map((member) => (
          <TeamMember key={member.email} {...member} size="md" />
        ))}
      </div>
    </div>
  ),
};

export const TeamGridSmall: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Compact Team Grid</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleMembers.map((member) => (
          <TeamMember key={member.email} {...member} size="sm" />
        ))}
      </div>
    </div>
  ),
};
