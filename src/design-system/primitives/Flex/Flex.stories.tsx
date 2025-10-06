import type { Meta, StoryObj } from "@storybook/react";
import { Flex, FlexChild } from "./Flex";
import React from "react";

const wraps = ["noWrap", "wrap", "reverse"] as const;
const directions = ["row", "rowReverse", "col", "colReverse"] as const;
const gaps = [
  0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128,
] as const;
const auto = ["base", "auto"] as const;
const basis = ["base", "full"] as const;
const grow = ["grow", "noGrow"] as const;
const shrink = ["shrink", "noShrink"] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Flex> = {
  component: Flex,
  title: "Primitives/Flex",
  argTypes: {
    gap: { control: "select", options: gaps },
    wrap: { control: "select", options: wraps },
    direction: { control: "select", options: directions },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const WrapDirection: Story = {
  render: () => (
    <div>
      {wraps.map((wrap) => (
        <div key={wrap}>
          <h2 className="font-bold mb-2">wrap: {wrap}</h2>
          <div className="grid grid-cols-2 gap-6">
            {directions.map((direction) => (
              <div key={direction}>
                <h3 className="text-sm mb-1">direction: {direction}</h3>
                <Flex
                  className="border border-black h-100 w-150 p-2"
                  wrap={wrap}
                  direction={direction}
                  gap={2}
                >
                  <FlexChild className="bg-sage-green p-2 rounded text-white">
                    1
                  </FlexChild>
                  <FlexChild className="bg-sage-green p-2 rounded text-white">
                    2
                  </FlexChild>
                  <FlexChild
                    className="bg-sage-green p-2 rounded text-white"
                    basis="full"
                  >
                    3
                  </FlexChild>
                  <FlexChild className="bg-sage-green p-2 rounded text-white">
                    4
                  </FlexChild>
                </Flex>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ChangingSize: Story = {
  render: () => (
    <div className="space-y-12">
      {/* Auto variants */}
      <div>
        <h2 className="font-bold mb-2">Auto Variants</h2>
        <Flex
          className="border border-black w-[300px] h-[100px] p-2"
          gap={2}
          direction="row"
          wrap="wrap"
        >
          {auto.map((a) => (
            <FlexChild
              key={a}
              className="bg-sage-green p-4 text-white rounded"
              auto={a}
            >
              {a}
            </FlexChild>
          ))}
        </Flex>
      </div>

      {/* Basis variants */}
      <div>
        <h2 className="font-bold mb-2">Basis Variants</h2>
        <Flex
          className="border border-black w-[300px] h-[150px] p-2"
          gap={2}
          direction="row"
          wrap="wrap"
        >
          {basis.map((b) => (
            <FlexChild
              key={b}
              className="bg-sage-green p-4 text-white rounded"
              basis={b}
            >
              {b}
            </FlexChild>
          ))}
        </Flex>
      </div>

      <div>
        <h2 className="font-bold mb-2">Grow Variants</h2>
        <Flex
          className="border border-black w-[200px] h-[100px] p-2 mb-4"
          gap={2}
          direction="row"
          wrap="wrap"
        >
          <FlexChild className="bg-sage-green p-4 text-white rounded" grow="grow">
            {"grow"}
          </FlexChild>
          <FlexChild
            className="bg-forest-green p-4 text-white rounded"
            grow="noGrow"
          >
            {"noGrow"}
          </FlexChild>
        </Flex>
        <Flex
          className="border border-black w-[300px] h-[100px] p-2 mb-4"
          gap={2}
          direction="row"
          wrap="wrap"
        >
          <FlexChild className="bg-sage-green p-4 text-white rounded" grow="grow">
            {"grow"}
          </FlexChild>
          <FlexChild
            className="bg-forest-green p-4 text-white rounded"
            grow="noGrow"
          >
            {"noGrow"}
          </FlexChild>
        </Flex>
      </div>

      <div>
        <h2 className="font-bold mb-2">Shrink Variants</h2>
        <Flex
          className="border border-black w-[300px] h-[100px] p-2 mb-4"
          gap={2}
          direction="row"
          wrap="noWrap"
        >
          <FlexChild className="bg-sage-green p-4 text-white rounded w-14">
            base
          </FlexChild>
          <FlexChild
            className="bg-forest-green p-4 text-white rounded w-64"
            shrink="shrink"
          >
            shrink
          </FlexChild>
          <FlexChild
            className="bg-sage-green p-4 text-white rounded w-14"
            basis="full"
          >
            full
          </FlexChild>
        </Flex>
        <Flex
          className="border border-black w-[400px] h-[100px] p-2 mb-4"
          gap={2}
          direction="row"
          wrap="noWrap"
        >
          <FlexChild className="bg-sage-green p-4 text-white rounded w-14">
            base
          </FlexChild>
          <FlexChild
            className="bg-forest-green p-4 text-white rounded w-64"
            shrink="noShrink"
          >
            noShrink
          </FlexChild>
          <FlexChild
            className="bg-sage-green p-4 text-white rounded w-14"
            basis="full"
          >
            full
          </FlexChild>
        </Flex>
      </div>
    </div>
  ),
};
