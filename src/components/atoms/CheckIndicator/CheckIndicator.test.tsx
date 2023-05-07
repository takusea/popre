import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import CheckIndicator from ".";

describe("components/atoms/CheckIndicator", () => {
  it("[role=checkbox]であること", () => {
    const { getByRole } = render(
      <CheckIndicator checked={false} disabled={false} />
    );

    expect(getByRole("checkbox")).toBeInTheDocument();
  });
});
