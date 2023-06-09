import type { Meta, StoryObj } from "@storybook/react";

import Text from ".";

type T = typeof Text;

const meta: Meta<T> = {
  component: Text,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    children: "Text",
  },
};
