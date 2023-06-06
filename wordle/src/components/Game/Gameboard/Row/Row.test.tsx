import { render } from "@testing-library/react";
import Row from ".";

describe("Row", () => {
  it("renders correctly with given props", () => {
    const { getByRole } = render(
      <Row
        ariaLabel="Row label"
        letters="ABC"
        lettersState={["correct", "present", "absent"]}
      />
    );

    const rowElement = getByRole("group");
    const tileElements = rowElement.querySelectorAll(".tile");

    expect(rowElement).toHaveAttribute("aria-label", "Row label");
    expect(tileElements).toHaveLength(5);

    expect(tileElements[0]).toHaveTextContent("A");
    expect(tileElements[0]).toHaveAttribute("data-state", "correct");

    expect(tileElements[1]).toHaveTextContent("B");
    expect(tileElements[1]).toHaveAttribute("data-state", "present");

    expect(tileElements[2]).toHaveTextContent("C");
    expect(tileElements[2]).toHaveAttribute("data-state", "absent");
  });

  it("renders correctly without letters", () => {
    const { getByRole } = render(<Row ariaLabel="Empty row" letters="" />);

    const rowElement = getByRole("group");
    const tileElements = rowElement.querySelectorAll(".tile");

    expect(tileElements).toHaveLength(5);

    tileElements.forEach((tile) => {
      expect(tile).toHaveTextContent("");
      expect(tile).toHaveAttribute("data-state", "empty");
    });
  });

  it("renders correctly without lettersState", () => {
    const { getByRole } = render(
      <Row ariaLabel="No lettersState" letters="ABC" />
    );

    const rowElement = getByRole("group");
    const tileElements = rowElement.querySelectorAll(".tile");

    expect(tileElements).toHaveLength(5);

    tileElements.forEach((tile) => {
      expect(tile.textContent).not.toBe("");
      expect(tile).toHaveAttribute("data-state", "tbd");
    });
  });
});
