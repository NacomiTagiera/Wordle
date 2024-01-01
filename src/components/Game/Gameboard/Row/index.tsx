import { type LetterState } from '@/types';
import { NUMBER_OF_LETTERS } from '@/utils/constants';

import { Tile } from '../Tile';

import styles from './Row.module.scss';

type Props = {
  ariaLabel: string;
  letters: string;
  lettersState?: LetterState[];
};

export const Row = ({ ariaLabel, letters, lettersState }: Props) => {
  const lettersArray = Array.from(letters);

  if (lettersArray.length < NUMBER_OF_LETTERS) {
    lettersArray.push(...Array<''>(NUMBER_OF_LETTERS - lettersArray.length).fill(''));
  } else if (lettersArray.length > NUMBER_OF_LETTERS) {
    lettersArray.splice(NUMBER_OF_LETTERS);
  }

  return (
    <div className={styles.row} role='group' aria-label={ariaLabel} data-testid='gameboard-row'>
      {lettersArray.map((letter, index) => (
        <Tile key={index} letter={letter} letterState={lettersState?.at(index)} />
      ))}
    </div>
  );
};
