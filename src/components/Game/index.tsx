'use client';

import { useDispatchWordle } from '@/redux/slices/wordleSlice';

import { Gameboard } from './Gameboard';
import { Keyboard } from './Keyboard';

import styles from './Game.module.scss';

export const Game = () => {
  const { addLetter, removeLetter, submitGuess } = useDispatchWordle();

  return (
    <main className={styles.game}>
      <Gameboard />
      <Keyboard
        onBackspaceClick={() => removeLetter()}
        onEnterClick={() => submitGuess()}
        onLetterClick={(letter: string) => addLetter(letter)}
      />
    </main>
  );
};
