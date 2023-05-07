import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Chip from ".";

describe("components/atoms/Chip", () => {
  it("[role=button]であること", () => {
    const { getByRole } = render(
      <Chip
        checked={false}
        onClick={() => {
          null;
        }}
      >
        Test
      </Chip>
    );

    expect(getByRole("button")).toBeInTheDocument();
  });

  it("テキストが表示されること", () => {
    const text = "Test";
    const { getByText } = render(
      <Chip
        checked={false}
        onClick={() => {
          null;
        }}
      >
        {text}
      </Chip>
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it("クリック時にonClick関数が実行されること", async () => {
    const clickedHandler = jest.fn();
    const user = userEvent.setup();
    const { getByRole } = render(
      <Chip checked={false} onClick={clickedHandler}>
        Test
      </Chip>
    );

    const onChipElement = getByRole("button");
    await user.click(onChipElement);

    expect(clickedHandler).toHaveBeenCalled();
  });
});
