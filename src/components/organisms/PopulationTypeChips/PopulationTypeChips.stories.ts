import type { Meta, StoryObj } from "@storybook/react";

import PopulationTypeChips from ".";

type T = typeof PopulationTypeChips;

const meta: Meta<T> = {
  component: PopulationTypeChips,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    currentIndex: 0,
  },
};
