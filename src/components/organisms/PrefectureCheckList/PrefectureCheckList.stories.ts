import type { Meta, StoryObj } from "@storybook/react";

import PrefectureCheckList from ".";

type T = typeof PrefectureCheckList;

const meta: Meta<T> = {
  component: PrefectureCheckList,
};
export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    prefectures: [
      {
        name: "a",
        code: 0,
      },
      {
        name: "b",
        code: 1,
      },
      {
        name: "c",
        code: 2,
      },
      {
        name: "d",
        code: 3,
      },
    ],
  },
};
