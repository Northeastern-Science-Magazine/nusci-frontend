import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    label: "Airplane Mode",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Variants: Story = {
  render: () => {
    const [checks, setChecks] = useState({
      default: false,
      color: false,
      success: false,
      danger: false,
    });

    return (
      <div className="flex flex-col gap-4">
        {Object.entries(checks).map(([key, value]) => (
          <Toggle
            key={key}
            label={`${key.charAt(0).toUpperCase() + key.slice(1)} Variant`}
            variant={key as any}
            checked={value}
            onCheckedChange={(checked) => setChecks((prev) => ({ ...prev, [key]: checked }))}
          />
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [checks, setChecks] = useState({
      sm: false,
      md: false,
      lg: false,
    });

    return (
      <div className="flex flex-col gap-4">
        {Object.entries(checks).map(([key, value]) => (
          <Toggle
            key={key}
            label={`${key.toUpperCase()} Size`}
            size={key as any}
            checked={value}
            onCheckedChange={(checked) => setChecks((prev) => ({ ...prev, [key]: checked }))}
          />
        ))}
      </div>
    );
  },
};
