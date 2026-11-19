import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import Button from '@/design-system/primitives/Button';
import React, { useState } from 'react';

/** Define the control fields for Storybook */
const meta: Meta<typeof ConfirmDialog> = {
  component: ConfirmDialog,
  title: 'Components/ConfirmDialog',
  argTypes: {
    tone: { control: 'select', options: ['default', 'danger'] },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function Demo(args: Partial<React.ComponentProps<typeof ConfirmDialog>>) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <ConfirmDialog
        title="Are you sure?"
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1500))}
        {...args}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

/** Story for Default Variant */
export const Default: Story = {
  args: {
    title: 'Publish this article?',
    description: 'It will be visible to everyone on the site.',
    confirmLabel: 'Publish',
    pendingLabel: 'Publishing...',
  },
  render: (args) => <Demo {...args} />,
};

/** Story for Danger Variant */
export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'Delete issue 61?',
    description:
      'It will be removed from the site, but its files are kept and it can be restored.',
    confirmLabel: 'Delete',
    pendingLabel: 'Deleting...',
  },
  render: (args) => <Demo {...args} />,
};
