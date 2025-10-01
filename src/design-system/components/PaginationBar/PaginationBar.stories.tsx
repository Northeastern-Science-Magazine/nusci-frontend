import type { Meta, StoryObj } from "@storybook/react";
import { PaginationItem, PaginationBar } from "@/components/PaginationBar";
import React from "react";

/** Define the control fields for Storybook */
const meta: Meta<typeof PaginationBar> = {
  component: PaginationBar,
  title: "Components/PaginationBar",
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PaginationBar>;

/** Story for Default Variant */
export const Default: Story = {
  render: (args) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <PaginationBar
          color="aqua-light"
          maxItems={10}
          activeItem={2}
          onClickFunctionGenerator={(index) => () =>
            alert(`Clicked on page ${index}`)}
          onClickLeft={() => alert("Clicked Left")}
          onClickRight={() => alert("Clicked Right")}
        />
      </div>
    );
  },
};

/** Gallery story showing every combination of style and size for each color */
export const PaginationGallery: Story = {
  args: {},
  render: (args) => {
    let bars = [];
    for (let i = 1; i <= 10; i++) {
      bars.push(
        <PaginationBar
          key={i}
          color="aqua-light"
          maxItems={10}
          activeItem={i}
          onClickFunctionGenerator={(index) => () =>
            alert(`Clicked on page ${index}`)}
          onClickLeft={() => alert("Clicked Left")}
          onClickRight={() => alert("Clicked Right")}
        />
      );
    }
    return (
      <div className="grid grid-cols-1 gap-2">
        {bars}
      </div>
    );
  },
};
