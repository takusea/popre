import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckBox from ".";

describe("components/molecules/CheckBox", () => {
  it("テキストが表示されること", () => {
    const label = "Label";
    const {getByText} = render(
      <CheckBox
      label={label}
      checked={false}
      onClick={() => {null}}
      />
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it("クリック時にonClick関数が実行されること", async () => {
    const clickedHandler = jest.fn();
    const user = userEvent.setup();
    const {getByRole} = render(
      <CheckBox
        label="Label"
        checked={false}
        onClick={clickedHandler}
      />
    );

    const onChipElement = getByRole("button");
    await user.click(onChipElement);

    expect(clickedHandler).toHaveBeenCalled();
  });
});
