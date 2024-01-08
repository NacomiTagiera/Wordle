import { useCallback, useEffect } from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';

import { useAppSelector } from '@/redux/hooks';
import { selectGameStatus, selectLetterState } from '@/redux/slices/wordleSlice';
import { keyboardRows } from '@/utils/constants';

import { Key } from './Key';

import keyStyles from './Key/Key.module.scss';
import styles from './Keyboard.module.scss';

type Props = {
  onBackspaceClick: () => void;
  onEnterClick: () => void;
  onLetterClick: (letter: string) => void;
};

export const Keyboard = ({ onBackspaceClick, onEnterClick, onLetterClick }: Props) => {
  const letterState = useAppSelector(selectLetterState);
  const gameStatus = useAppSelector(selectGameStatus);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key === 'Backspace') {
        onBackspaceClick();
      } else if (key === 'Enter') {
        onEnterClick();
      } else if (key.match(/^[a-z]$/)) {
        onLetterClick(key.toLowerCase());
      }
    },
    [onBackspaceClick, onEnterClick, onLetterClick]
  );

  useEffect(() => {
    if (gameStatus === 'playing') {
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStatus, handleKeyUp]);

  return (
    <div className={styles.keyboard}>
      {keyboardRows.map((row, index) => (
        <div key={index} className={styles.row}>
          {Array.from(row).map((letter, letterIndex) => {
            if (letter === 'enter') {
              return (
                <Key key={letterIndex} data-key='↵' onClick={onEnterClick} large>
                  enter
                </Key>
              );
            } else if (letter === 'backspace') {
              return (
                <Key
                  key={letterIndex}
                  ariaLabel='backaspace'
                  dataKey='←'
                  onClick={onBackspaceClick}
                  large
                >
                  <BackspaceIcon aria-hidden sx={{ fontSize: '2rem' }} />
                </Key>
              );
            } else if (letter === '') {
              return <div key={letterIndex} className={keyStyles['key--empty']} />;
            } else {
              return (
                <Key
                  key={letterIndex}
                  letterState={letterState[letter]}
                  onClick={() => onLetterClick(letter)}
                >
                  {letter}
                </Key>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};
