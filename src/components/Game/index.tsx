'use client';

import { useDispatchWordle } from '@/redux/slices/wordleSlice';

import { Board } from './Gameboard';
import { Keyboard } from './Keyboard';

import styles from './Game.module.scss';

export const Game = () => {
  const { addLetter, removeLetter, submitGuess } = useDispatchWordle();

  return (
    <main className={styles.game}>
      <Board />
      <Keyboard
        onBackspaceClick={() => removeLetter()}
        onEnterClick={() => submitGuess()}
        onLetterClick={(letter: string) => addLetter(letter)}
      />
    </main>
  );
};
