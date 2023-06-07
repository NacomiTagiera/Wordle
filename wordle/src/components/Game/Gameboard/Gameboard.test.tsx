import { render } from "@testing-library/react";
import { useGetBoardRows } from "@/redux/slices/wordleSlice";
import Board from ".";
import Row from "./Row";
import { LetterState } from "@/types";

jest.mock("../../../redux/slices/wordleSlice");

describe("Board", () => {
  const mockRows = [
    { letters: "ABC", lettersState: ["correct", "present", "absent"] },
    { letters: "DEF", lettersState: ["correct", "correct", "correct"] },
  ];

  beforeEach(() => {
    useGetBoardRows.mockReturnValue(mockRows);
  });

  it("renders correctly with board rows", () => {
    const { getByLabelText } = render(<Board />);

    const boardContainer = getByLabelText("Board container");
    const rowElements = boardContainer.querySelectorAll(".row");

    expect(rowElements).toHaveLength(2);

    rowElements.forEach((row, index) => {
      const rowProps = mockRows[index];
      expect(row).toHaveAttribute(`aria-label`, `Row ${index + 1}`);
      expect(row).toHaveTextContent(rowProps.letters);

      const tileElements = row.querySelectorAll(".tile");
      expect(tileElements).toHaveLength(rowProps.letters.length);
    });
  });

  it("uses the correct props for each row", () => {
    const { getAllByRole } = render(<Board />);

    const rowElements = getAllByRole("group");
    rowElements.forEach((row, index) => {
      const rowProps = mockRows[index];
      const rowComponent = (rowProps) => (
        <Row
          ariaLabel={`Row ${index + 1}`}
          letters={rowProps.letters}
          lettersState={rowProps.lettersState}
        />
      );

      expect(row).toContainElement(rowComponent(rowProps));
    });
  });
});
