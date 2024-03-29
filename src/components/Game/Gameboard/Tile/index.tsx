import { type LetterState } from '@/types';

import styles from './Tile.module.scss';

type Props = {
  letter: string;
  letterState?: LetterState;
  small?: boolean;
};

export const Tile = ({ letter, letterState, small }: Props) => {
  let ariaLabel = small ? letter : 'empty';
  let dataState = letter && !letterState ? 'tbd' : 'empty';

  switch (letterState) {
    case 'absent':
      ariaLabel = `${letter} absent`;
      dataState = 'absent';
      break;
    case 'correct':
      ariaLabel = `${letter} correct`;
      dataState = 'correct';
      break;
    case 'present':
      ariaLabel = `${letter} present`;
      dataState = 'present';
      break;
  }

  return (
    <div
      className={`${styles.tile} ${small ? styles.tile_small : ''}`}
      role='img'
      aria-roledescription='tile'
      aria-label={ariaLabel}
      data-state={dataState}
      data-testid='tile'
    >
      {letter}
    </div>
  );
};
