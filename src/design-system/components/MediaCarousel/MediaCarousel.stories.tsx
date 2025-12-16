import type { Meta, StoryObj } from "@storybook/react";
import LayeredCarousel from "./MediaCarousel";

const meta: Meta<typeof LayeredCarousel> = {
  title: "Components/Carousel/LayeredCarousel",
  component: LayeredCarousel,
  argTypes: {
    visibleCount: {
      control: { type: "number", min: 1, step: 2 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LayeredCarousel>;

const panels = [
  {
    id: "dolphins",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-sky-500 to-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold">DOLPHINS</h2>
          <p className="uppercase tracking-wide text-sm opacity-80">Up Close</p>
        </div>
        <button className="self-start rounded-md bg-yellow-400 px-4 py-2 text-black font-semibold">Watch Now</button>
      </div>
    ),
  },
  {
    id: "desert",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-amber-400 to-orange-700 text-black p-6">
        <h2 className="text-3xl font-bold">DESERTS</h2>
        <p className="mt-2 opacity-80">The New Frontier</p>
      </div>
    ),
  },
  {
    id: "arctic",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-cyan-200 to-blue-500 text-black p-6">
        <h2 className="text-3xl font-bold">ARCTIC</h2>
        <p className="mt-2 opacity-80">Frozen Worlds</p>
      </div>
    ),
  },
  {
    id: "jungle",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-green-400 to-emerald-800 text-white p-6">
        <h2 className="text-3xl font-bold">JUNGLES</h2>
        <p className="mt-2 opacity-80">Hidden Life</p>
      </div>
    ),
  },
  {
    id: "ocean",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-indigo-500 to-blue-900 text-white p-6">
        <h2 className="text-3xl font-bold">OCEANS</h2>
        <p className="mt-2 opacity-80">Deep Blue</p>
      </div>
    ),
  },
  {
    id: "mountains",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-slate-400 to-slate-800 text-white p-6">
        <h2 className="text-3xl font-bold">MOUNTAINS</h2>
        <p className="mt-2 opacity-80">Peak Adventures</p>
      </div>
    ),
  },
  {
    id: "forest",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-lime-400 to-green-700 text-black p-6">
        <h2 className="text-3xl font-bold">FORESTS</h2>
        <p className="mt-2 opacity-80">Ancient Trees</p>
      </div>
    ),
  },
  {
    id: "coral",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-400 to-rose-600 text-white p-6">
        <h2 className="text-3xl font-bold">CORAL REEFS</h2>
        <p className="mt-2 opacity-80">Underwater Gardens</p>
      </div>
    ),
  },
  {
    id: "savanna",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-yellow-300 to-amber-600 text-black p-6">
        <h2 className="text-3xl font-bold">SAVANNA</h2>
        <p className="mt-2 opacity-80">Wide Open Plains</p>
      </div>
    ),
  },
  {
    id: "volcano",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-red-500 to-orange-900 text-white p-6">
        <h2 className="text-3xl font-bold">VOLCANOES</h2>
        <p className="mt-2 opacity-80">Fire and Earth</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: panels,
    visibleCount: 5,
    width: "w-[360px]",
    height: "h-[560px]",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <LayeredCarousel {...args} />
    </div>
  ),
};

export const ThreePanels: Story = {
  args: {
    items: panels,
    visibleCount: 3,
    width: "w-[360px]",
    height: "h-[560px]",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <LayeredCarousel {...args} />
    </div>
  ),
};

export const SevenPanels: Story = {
  args: {
    items: panels,
    visibleCount: 7,
    width: "w-[320px]",
    height: "h-[520px]",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <LayeredCarousel {...args} />
    </div>
  ),
};

export const SinglePanel: Story = {
  args: {
    items: panels,
    visibleCount: 1,
    width: "w-[360px]",
    height: "h-[560px]",
  },
  render: (args) => (
    <div className="w-full" style={{ minHeight: "100vh", padding: "40px" }}>
      <LayeredCarousel {...args} />
    </div>
  ),
};
