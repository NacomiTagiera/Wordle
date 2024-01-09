import { useAppSelector } from '@/redux/hooks';
import { selectBoardRows } from '@/redux/slices/wordleSlice';

import { Row } from './Row';

import styles from './Gameboard.module.scss';

export const Gameboard = () => {
  const rows = useAppSelector(selectBoardRows);

  return (
    <div className={styles.gameboard__container}>
      <div className={styles.gameboard__board}>
        {rows.map(({ letters, lettersState }, index) => (
          <Row
            key={index}
            ariaLabel={'Row ' + (index + 1)}
            letters={letters}
            lettersState={lettersState}
          />
        ))}
      </div>
    </div>
  );
};
