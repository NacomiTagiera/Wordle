import { useGetBoardRows } from '@/redux/slices/wordleSlice';

import Row from './Row';

import styles from './Gameboard.module.scss';

export default function Board() {
  const rows = useGetBoardRows();

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
}