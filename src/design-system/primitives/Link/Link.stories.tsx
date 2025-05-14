import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import React from "react";

/* Modify this when adding variants to Text */
const options = ["", "_blank"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Link> = {
  component: Link,
  title: "Components/Link",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Link>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: <p>example text</p>,
    href: "https://www.google.com",
    target: "",
  },
};

/** Gallery story showing every combination of style and size for each color */
export const LinkGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-8 bg-white">
      {options.map((option) => (
        <Link href={"https://www.google.com"} target={option}>
          <p>example text</p>
        </Link>
      ))}
    </div>
  ),
};
