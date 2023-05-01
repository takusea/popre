import type { Meta, StoryObj } from "@storybook/react";

import CheckBox from ".";

type T = typeof CheckBox;

const meta: Meta<T> = {
  component: CheckBox,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
