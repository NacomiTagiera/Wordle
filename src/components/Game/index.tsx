import { Provider } from 'react-redux';

import { useDispatchWordle } from '@/redux/slices/wordleSlice';
import { store } from '@/redux/store';

import Header from '../UI/Header';
import Message from '../UI/Message';

import Board from './Gameboard';
import Keyboard from './Keyboard';

import styles from './Game.module.scss';

export default function Game() {
  const { addLetter, removeLetter, submitGuess } = useDispatchWordle();

  return (
    <Provider store={store}>
      <Header />
      <Message />
      <main className={styles.game}>
        <Board />
        <Keyboard
          onBackspaceClick={() => removeLetter()}
          onEnterClick={() => submitGuess()}
          onLetterClick={(letter: string) => addLetter(letter)}
        />
      </main>
    </Provider>
  );
}
