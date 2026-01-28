import type { Meta, StoryObj } from "@storybook/react";
import InternalHeader from "./InternalHeader";
import React from "react";

const meta: Meta<typeof InternalHeader> = {
  component: InternalHeader,
  title: "Components/InternalHeader",
  argTypes: {
    userProfile: {
      control: "object",
      description: "User profile information for logged-in members",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof InternalHeader>;

/** Default Internal Header for Club Members */
export const Default: Story = {
  args: {
    userProfile: {
      name: "John Doe",
      avatar: "/logo.png",
      role: "Writer",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)" }}>
        <Story />
        <div style={{ padding: "100px 20px" }}>
          <h1>Internal Member Portal</h1>
          <p>Navigation for logged-in club members with access to internal tools and pages.</p>
        </div>
      </div>
    ),
  ],
};

/** Editor Role */
export const Editor: Story = {
  args: {
    userProfile: {
      name: "Sarah Johnson",
      avatar: "/logo.png",
      role: "Editor",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)" }}>
        <Story />
        <div style={{ padding: "100px 20px" }}>
          <h1>Editor Portal</h1>
          <p>Navigation for editors with enhanced permissions.</p>
        </div>
      </div>
    ),
  ],
};

/** Admin Role */
export const Admin: Story = {
  args: {
    userProfile: {
      name: "Alex Chen",
      avatar: "/logo.png",
      role: "Admin",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)" }}>
        <Story />
        <div style={{ padding: "100px 20px" }}>
          <h1>Admin Portal</h1>
          <p>Navigation for administrators with full access.</p>
        </div>
      </div>
    ),
  ],
};

/** Mobile View */
export const Mobile: Story = {
  args: {
    userProfile: {
      name: "John Doe",
      avatar: "/logo.png",
      role: "Writer",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)" }}>
        <Story />
        <div style={{ padding: "100px 20px" }}>
          <h1>Mobile Internal Header</h1>
          <p>Tap the menu button to see the mobile navigation with member tools.</p>
        </div>
      </div>
    ),
  ],
};