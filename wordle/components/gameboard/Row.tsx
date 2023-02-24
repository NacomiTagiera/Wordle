import { LetterState } from "@/types";
import { NUMBER_OF_LETTERS } from "@/lib/word-utils";
import Tile from "./Tile";

export interface RowProps {
  ariaLabel: string;
  letters: string;
  lettersState?: Array<LetterState>;
}

export default function Row({ ariaLabel, letters, lettersState }: RowProps) {
  const lettersArray = Array.from(letters);

  while (lettersArray.length < NUMBER_OF_LETTERS) {
    lettersArray.push("");
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        gap: "5px",
        marginBlock: "2.5px",
      }}
    >
      {lettersArray.map((letter, index) => (
        <Tile
          key={index}
          letter={letter}
          letterState={lettersState?.at(index)}
        />
      ))}
    </div>
  );
}
