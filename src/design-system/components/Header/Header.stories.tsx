import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof Header> = {
  component: Header,
  title: "Components/Header",
  argTypes: {
    isLoggedIn: {
      control: "boolean",
      description: "Whether the user is logged in",
    },
    userProfile: {
      control: "object",
      description: "User profile information",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const FullMenuDisplay: Story = {
  args: {
    isLoggedIn: false,
    forceFullMenu: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)" }}>
        <Story />
        <div style={{ padding: "100px 20px" }}>
          <h1>Full Menu Display Header</h1>
          <p>All menu items are visible in the header without hamburger menu.</p>
        </div>
      </div>
    ),
  ],
};

/** Story for Logged In User with Full Menu */
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userProfile: {
      name: "John Doe",
      avatar: "/logo.png",
    },
    forceFullMenu: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)" }}>
        <Story />
        <div style={{ padding: "100px 20px" }}>
          <h1>Logged In User with Full Menu Display</h1>
          <p>All menu items are visible in the header without hamburger menu.</p>
        </div>
      </div>
    ),
  ],
};

/** Story for Mobile View */
export const Mobile: Story = {
  args: {
    isLoggedIn: false,
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
          <h1>Mobile Header with Hamburger Menu</h1>
          <p>Tap the menu button to see the mobile navigation.</p>
        </div>
      </div>
    ),
  ],
};

/** Story for Mobile Logged In User */
export const MobileLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userProfile: {
      name: "John Doe",
      avatar: "/logo.png",
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
          <h1>Mobile Header with Logged In User</h1>
          <p>Tap the menu button to see the mobile navigation with user profile.</p>
        </div>
      </div>
    ),
  ],
};
