import type { Meta, StoryObj } from "@storybook/react";
import { ProfileSpotlightCard } from "./index";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof ProfileSpotlightCard> = {
  component: ProfileSpotlightCard,
  title: "Components/ProfileSpotlightCard",
};

export default meta;
type Story = StoryObj<typeof ProfileSpotlightCard>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    firstName: "Catherine",
    lastName: "Felinious",
    pronouns: ["she", "her"],
    graduationYear: 2025,
    major: "Environmental Science with a minor in Behavioural Neuroscience",
    profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/A-Cat.jpg/2560px-A-Cat.jpg",
    email: "jdoe@northeastern.edu",
  },
};
