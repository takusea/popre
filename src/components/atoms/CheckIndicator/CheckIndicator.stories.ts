import type { Meta, StoryObj } from "@storybook/react";

import CheckIndicator from ".";

type T = typeof CheckIndicator;

const meta: Meta<T> = {
  component: CheckIndicator,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
