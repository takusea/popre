import type { Meta, StoryObj } from "@storybook/react";

import Chip from ".";

type T = typeof Chip;

const meta: Meta<T> = {
  component: Chip,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
