import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Instructions from ".";

describe("Instructions component", () => {
  test("renders correctly", () => {
    render(<Instructions open={true} onClose={() => {}} />);

    expect(screen.getByText(/how to play/i)).toBeInTheDocument();
    expect(screen.getByText(/Guess the/i)).toBeInTheDocument();
    expect(screen.getByText(/Examples/i)).toBeInTheDocument();
    expect(screen.getByText(/Press the reset button/i)).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    const onClose = jest.fn();
    render(<Instructions open={true} onClose={onClose} />);

    await userEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalled();
  });
});
