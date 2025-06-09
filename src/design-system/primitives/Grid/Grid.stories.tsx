import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridCol, GridRow } from "./Grid";
import React from "react";
import { GridColVariants, GridVariants } from "./variants";

const spans = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const gaps = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 64, 72, 96, 128] as const;

/** Define the control fields for Storybook */
const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Primitives/Grid",
  argTypes: {
    col: { control: "boolean" },
    row: { control: "boolean" },
    span: { control: "select", options: spans },
    gap: { control: "select", options: gaps },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

/** Default Col Grid Example */
/** Gallery of GridCol with span 2–15 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {spans.map((span) => (
        <div key={span}>
          <p className="mb-2 font-medium">Grid col span = {span}</p>
          <Grid col span={span} gap={2} className="border border-black p-2">
            {Array.from({ length: span }).map((_, i) => (
              <GridCol key={i} span={1} className="bg-gray-100 text-center border border-dashed border-gray-400 py-4">
                {i + 1}
              </GridCol>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

/** Gallery of GridRow with span 2–15 */
export const GalleryRows: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {spans.map((span) => (
        <div key={span}>
          <p className="mb-2 font-medium">Grid row span = {span}</p>
          <Grid row span={span} gap={2} className="border border-black p-2 h-[700px]">
            {Array.from({ length: span }).map((_, i) => (
              <GridRow key={i} span={1} className="bg-gray-100 text-center border border-dashed border-gray-400 py-4">
                {i + 1}
              </GridRow>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const MutliLengthSpan: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {[
        { total: 2, parts: [1, 1] },
        { total: 3, parts: [1, 2] },
        { total: 4, parts: [2, 2] },
        { total: 5, parts: [1, 1, 3] },
        { total: 6, parts: [2, 1, 3] },
        { total: 7, parts: [1, 2, 4] },
        { total: 8, parts: [4, 2, 2] },
        { total: 9, parts: [3, 3, 3] },
        { total: 10, parts: [2, 4, 4] },
        { total: 11, parts: [3, 1, 1, 2, 4] },
        { total: 12, parts: [2, 2, 2, 3, 3] },
      ].map(({ total, parts }, i) => (
        <div key={i}>
          <p className="mb-2 font-medium">Grid col span = {total}</p>
          <Grid col span={total as GridVariants["span"]} gap={2} className="border border-black p-2">
            {parts.map((p, j) => (
              <GridCol
                key={j}
                span={p as GridColVariants["span"]}
                className="bg-gray-100 text-center border border-dashed border-gray-400 py-4"
              >
                Span {p}
              </GridCol>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
