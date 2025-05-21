import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import React from "react";

/* Modify this when adding variants to Text */
const options = [true, false] as const;

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
    newWindow: false,
  },
};

/** Gallery story showing every combination of style and size for each color */
export const LinkGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-8 bg-white">
      {options.map((option, index) => (
        <Link href={"https://www.google.com"} newWindow={option} key={index}>
          <p>example text</p>
        </Link>
      ))}
      <Link
        href={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
        }
        newWindow={true}
      >
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"
          }
          alt={"cat"}
        />
      </Link>
    </div>
  ),
};
