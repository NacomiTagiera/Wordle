import { render, fireEvent } from "@testing-library/react";
import Key from ".";

describe("Key", () => {
  it("renders the button with correct children", () => {
    const { getByRole } = render(<Key onClick={() => {}}>A</Key>);
    const button = getByRole("button");
    expect(button).toHaveTextContent("A");
  });

  it("applies correct style when large prop is true", () => {
    const { getByRole } = render(
      <Key large onClick={() => {}}>
        B
      </Key>
    );
    const button = getByRole("button");
    expect(button).toHaveStyle("flex: 1.5; font-size: 12px");
  });

  it("applies letterState data attribute when letterState prop is provided", () => {
    const { getByRole } = render(
      <Key letterState="present" onClick={() => {}}>
        C
      </Key>
    );
    const button = getByRole("button");
    expect(button).toHaveAttribute("data-state", "present");
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(<Key onClick={onClickMock}>D</Key>);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
