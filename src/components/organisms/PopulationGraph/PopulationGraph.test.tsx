import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import PopulationGraph from ".";
import { Prefecture } from "@/types/Prefecture";

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
  },
];

describe("components/organisms/PopulationGraph", () => {
  it("未選択時に'都道府県を選択してください。'と表示されること", () => {
    const { getByText } = render(
      <PopulationGraph
        populations={[]}
        populationType={0}
        prefectures={prefectures}
      />
    );

    expect(getByText("都道府県を選択してください。")).toBeInTheDocument();
  });
});
