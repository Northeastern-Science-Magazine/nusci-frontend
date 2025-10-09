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
    bio: "Reshika Sai is a fourth-year health science major with a passion for science and a penchant for writing. NU Sci offered the perfect fusion of her interests, bridging the gap between her academic pursuits and creative expression. She has been an active member of the magazine since her first year and is now thrilled to serve as the magazine’s president. When she’s not delving into the mysteries of the human body within the pages of her textbooks, you can often find her engrossed in reading, writing, or experimenting in the kitchen. Reshika Sai is enthusiastic about her continued journey with NU Sci and is eager to foster a strong sense of community within the magazine this academic year. Her goal is for the NU Sci team to create interdisciplinary publications that inspire curiosity and ignite intellectual discussions.",
  },
};
