import type { Meta, StoryObj } from "@storybook/react";

import Header from ".";

type T = typeof Header;

const meta: Meta<T> = {
  component: Header,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
