import Tile from "../Tile";
import { LetterState } from "@/types";
import { NUMBER_OF_LETTERS } from "@/lib/constants";

import styles from "./Row.module.scss";

interface Props {
  ariaLabel: string;
  letters: string;
  lettersState?: Array<LetterState>;
}

export default function Row({ ariaLabel, letters, lettersState }: Props) {
  const lettersArray = Array.from(letters);

  while (lettersArray.length < NUMBER_OF_LETTERS) {
    lettersArray.push("");
  }

  return (
    <div className={styles.row} role="group" aria-label={ariaLabel}>
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
