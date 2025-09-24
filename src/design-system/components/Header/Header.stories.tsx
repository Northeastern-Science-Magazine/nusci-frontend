import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import React from 'react';

/** Define the control fields for Storybook */
const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Header',
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Whether the user is logged in',
    },
    userProfile: {
      control: 'object',
      description: 'User profile information',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/** Story for Default Header (Not Logged In) */
export const Default: Story = {
  args: {
    isLoggedIn: false,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
        <Story />
        <div style={{ padding: '100px 20px' }}>
          <h1>Scroll down to see the header collapse</h1>
          <p>This is some content to demonstrate the scroll behavior.</p>
        </div>
      </div>
    ),
  ],
};

/** Story for Logged In User */
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userProfile: {
      name: 'John Doe',
      avatar: '/logo.png',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
        <Story />
        <div style={{ padding: '100px 20px' }}>
          <h1>Scroll down to see the header collapse</h1>
          <p>This is some content to demonstrate the scroll behavior.</p>
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
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
        <Story />
        <div style={{ padding: '100px 20px' }}>
          <h1>Mobile Header</h1>
          <p>Tap the menu button to see the mobile navigation.</p>
        </div>
      </div>
    ),
  ],
};
