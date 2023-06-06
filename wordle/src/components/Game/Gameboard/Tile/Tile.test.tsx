import { render } from "@testing-library/react";
import Tile from ".";

describe("Tile", () => {
  it("renders correctly with default props", () => {
    const { getByText, getByRole } = render(<Tile letter="A" />);

    const tileElement = getByRole("img");
    const letterElement = getByText("A");

    expect(tileElement).toHaveAttribute("aria-label", "empty");
    expect(tileElement).toHaveAttribute("data-state", "tbd");
    expect(letterElement).toBeInTheDocument();
  });

  it("renders correctly with letterState prop", () => {
    const { getByRole } = render(<Tile letter="A" letterState="correct" />);

    const tileElement = getByRole("img");

    expect(tileElement).toHaveAttribute("aria-label", "A correct");
    expect(tileElement).toHaveAttribute("data-state", "correct");
  });

  it("renders correctly with small prop", () => {
    const { getByRole } = render(<Tile letter="A" small />);

    const tileElement = getByRole("img");

    expect(tileElement).toHaveClass("tile--small");
  });
});
