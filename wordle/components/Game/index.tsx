import Board from "./Gameboard";
import Header from "../UI/Header";
import Keyboard from "./Keyboard";
import Message from "../UI/Message";
import { useDispatchWordle } from "@/slices/wordleSlice";

import styles from "./Game.module.scss";

export default function Game() {
  const { addLetter, removeLetter, submitGuess } = useDispatchWordle();

  const handleLetterClick = (letter: string) => {
    addLetter(letter);
  };

  const handleEnterClick = () => {
    submitGuess();
  };

  const handleBackspaceClick = () => {
    removeLetter();
  };

  return (
    <>
      <Header />
      <Message />
      <main className={styles.game}>
        <Board />
        <Keyboard
          onBackspaceClick={handleBackspaceClick}
          onEnterClick={handleEnterClick}
          onLetterClick={handleLetterClick}
        />
      </main>
    </>
  );
}
