import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PrefectureCheckList from ".";

import { Prefecture } from '@/types/Prefecture';

const prefectures: Prefecture[] = [
  {
    code: 0,
    name: "a",
  },
  {
    code: 1,
    name: "b",
  },
  {
    code: 2,
    name: "c",
  },
  {
    code: 3,
    name: "d",
  }
]

describe("components/organisms/PrefectureCheckList", () => {
  it("すべての都道府県が表示されていること", () => {
    const {getByText} = render(
      <PrefectureCheckList
        prefectures={prefectures}
        onChange={()=>{null}}
      />
    );

    prefectures.forEach((prefecture) => {
      expect(getByText(prefecture.name)).toBeInTheDocument();
    })
  });

  it("クリック時にcheckedIndexが切り替わること", async () => {
    const changedHandler = jest.fn((checked: boolean): boolean => checked);
    const user = userEvent.setup();
    const {getAllByRole} = render(
      <PrefectureCheckList
        prefectures={prefectures}
        onChange={changedHandler}
      />
    );

    const onChipElements = getAllByRole("button");
    await act(async() => {
      await user.click(onChipElements[0]);
      expect(changedHandler.mock.results[0].value).not.toBeTruthy();
    })

    await act(async() => {
      await user.click(onChipElements[0]);
      expect(changedHandler.mock.results[1].value).toBeTruthy();
      })
  });
});
