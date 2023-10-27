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

  while (lettersArray.length < NUMBER_OF_LETTERS) {
    lettersArray.push('');
  }

  return (
    <div className={styles.row} role='group' aria-label={ariaLabel}>
      {lettersArray.map((letter, index) => (
        <Tile key={index} letter={letter} letterState={lettersState?.at(index)} />
      ))}
    </div>
  );
};
