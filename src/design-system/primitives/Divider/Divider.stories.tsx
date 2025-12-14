import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { Flex, FlexChild } from "../Flex";

const orientations = ["horizontal", "vertical"] as const;
const widths = ["thin", "thick"] as const;
const colors = ["black", "white", "neutral"] as const;
const margins = [2, 4, 6] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Divider> = {
  component: Divider,
  title: "Primitives/Divider",
  argTypes: {
    orientation: { control: "select", options: orientations },
    margin: { control: "select", options: margins },
    color: { control: "select", options: colors },
    width: { control: "select", options: widths },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

/** Story for Default Variant */
export const Default: Story = {
  args: {
    color: "black",
    width: "thin",
    margin: 2,
  },
  render: (args) => (
    <div className="space-y-6">
      <Flex className="">
        <FlexChild className="flex-none">NU Sci</FlexChild>
        <FlexChild> {<Divider {...args} orientation="vertical" />}</FlexChild>
        <FlexChild className="flex-none">NU Sci</FlexChild>
        <FlexChild> {<Divider {...args} orientation="vertical" />}</FlexChild>
        <FlexChild className="flex-none">NU Sci</FlexChild>
      </Flex>

      <Flex className="w-[50px]" direction="col">
        <FlexChild className="flex-none">NU Sci</FlexChild>
        <FlexChild> {<Divider {...args} orientation="horizontal" />}</FlexChild>
        <FlexChild className="flex-none">NU Sci</FlexChild>
        <FlexChild> {<Divider {...args} orientation="horizontal" />}</FlexChild>
        <FlexChild className="flex-none">NU Sci</FlexChild>
      </Flex>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="space-y-8">
      {orientations.map((orientation) => (
        <div key={orientation} className="space-y-4">
          <h4 className="font-semibold">{orientation.toUpperCase()}</h4>
          <div className="grid grid-cols-6 gap-4">
            {widths.map((width) =>
              margins.map((margin) =>
                colors.map((color) => {
                  return (
                    <Flex
                      gap={8}
                      direction="col"
                      key={`${orientation}-${width}-${margin}-${color}`}
                      className={` ${
                        color === "white" ? "bg-neutral p-4 rounded-md" : ""
                      } `}
                    >
                      <Flex
                        className={"w-[50px]"}
                        direction={orientation === "horizontal" ? "col" : "row"}
                      >
                        <FlexChild className="flex-none">NU Sci</FlexChild>
                        <FlexChild>
                          <Divider
                            orientation={orientation}
                            width={width}
                            margin={margin}
                            color={color}
                          />
                        </FlexChild>
                        <FlexChild className="flex-none">NU Sci</FlexChild>
                      </Flex>
                      <div className="text-sm text-muted-foreground mt-2 text-center">
                        <p>Orientation: {orientation}</p>
                        <p>Width: {width}</p>
                        <p>Margin: {margin}</p>
                        <p>Color: {color}</p>
                      </div>
                    </Flex>
                  );
                })
              )
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};
