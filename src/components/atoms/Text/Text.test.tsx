import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Text from ".";

describe("components/atoms/Text", () => {
  it("テキストが表示されること", () => {
    const text = "Test";
    const { getByText } = render(<Text>{text}</Text>);

    expect(getByText(text)).toBeInTheDocument();
  });
});
