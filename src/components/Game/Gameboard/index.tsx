'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectBoardRows } from '@/redux/slices/wordleSlice';

import { Row } from './Row';

import styles from './Gameboard.module.scss';

export const Board = () => {
  const rows = useAppSelector(selectBoardRows);

  return (
    <div className={styles.board__container}>
      <div className={styles.board}>
        {rows.map(({ letters, lettersState }, index) => (
          <Row
            key={index}
            ariaLabel={'Row' + (index + 1)}
            letters={letters}
            lettersState={lettersState}
          />
        ))}
      </div>
    </div>
  );
};
