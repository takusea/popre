import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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

describe("components/molecules/PrefectureCheckList", () => {
  it("すべての都道府県が表示されていること", () => {
    const {getByText} = render(
      <PrefectureCheckList
        prefectures={prefectures}
        checkedIndexes={[0]}
        onChange={()=>{null}}
      />
    );

    prefectures.forEach((prefecture) => {
      expect(getByText(prefecture.name)).toBeInTheDocument();
    })
  });

  it("クリック時にonChange関数が実行されること", async () => {
    const changedHandler = jest.fn();
    const user = userEvent.setup();
    const {getAllByRole} = render(
      <PrefectureCheckList
        prefectures={prefectures}
        checkedIndexes={[0]}
        onChange={changedHandler}
      />
    );

    const onChipElements = getAllByRole("button");
    await user.click(onChipElements[0]);

    expect(changedHandler).toHaveBeenCalled();
  });
});
