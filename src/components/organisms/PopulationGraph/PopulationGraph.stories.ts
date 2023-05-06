import type { Meta, StoryObj } from "@storybook/react";

import PopulationGraph from ".";

type T = typeof PopulationGraph;

const meta: Meta<T> = {
  component: PopulationGraph,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    populations: [],
    checkedIndexes: [0],
    prefectures: [
      {
        name: "a",
        code: 0
      },
      {
        name: "b",
        code: 1
      },
      {
        name: "c",
        code: 2
      },
      {
        name: "d",
        code: 3
      }
    ],
  },
};
