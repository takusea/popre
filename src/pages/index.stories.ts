import type { Meta, StoryObj } from "@storybook/react";

import Home from ".";

type T = typeof Home;

const meta: Meta<T> = {
  component: Home,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    prefectures: [
      {
        name: "北海道",
        code: 0
      },
      {
        name: "青森県",
        code: 1
      },
      {
        name: "岩手県",
        code: 2
      },
      {
        name: "宮城県",
        code: 3
      }
    ],
  },
};
