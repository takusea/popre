import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PopulationTypeChips from ".";

describe("components/molecules/PopulationTypeChips", () => {
  it("すべての種類のChipがあること", () => {
    const {getByText} = render(
      <PopulationTypeChips
        currentIndex={0}
        onChange={()=>{null}}
      />
    );

    const populationTypes = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

    populationTypes.forEach((populationType) => {
      expect(getByText(populationType)).toBeInTheDocument();
    })

  });

  it("クリック時にonChange関数が実行されること", async () => {
    const changedHandler = jest.fn();
    const user = userEvent.setup();
    const {getAllByRole} = render(
      <PopulationTypeChips
        currentIndex={0}
        onChange={changedHandler}
      />
    );

    const onChipElements = getAllByRole("button");
    await user.click(onChipElements[0]);

    expect(changedHandler).toHaveBeenCalled();
  });
});
