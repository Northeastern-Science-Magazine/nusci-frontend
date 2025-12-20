import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import React from "react";
import Image from "@/primitives/Image";
import Text from "@/primitives/Text";

const options = [true, false, undefined] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Link> = {
  component: Link,
  title: "Primitives/Link",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Link>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    children: (
      <Text color="sage-green" style="underline" size={24} className="hover:text-forest-green">
        example text
      </Text>
    ),
    href: "https://www.google.com",
  },
};

/** Gallery story showing every combination of style and size for each color */
export const LinkGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-8 bg-white">
      {options.map((option, index) => (
        <Link href={"https://www.google.com"} newWindow={option} key={index}>
          <Text color="sage-green" style="underline" size={24} className="hover:text-forest-green">
            example text
          </Text>
        </Link>
      ))}
      <Link href={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"} newWindow={true}>
        <Image
          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg"}
          alt={"cat"}
          ratio={1}
          width={"w-[300px]"}
        />
      </Link>
    </div>
  ),
};
