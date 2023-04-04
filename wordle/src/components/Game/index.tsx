import { Fragment } from "react";

import Board from "./Gameboard";
import Header from "../UI/Header";
import Keyboard from "./Keyboard";
import Message from "../UI/Message";
import { useDispatchWordle } from "@/app/slices/wordleSlice";

import styles from "@/styles/components/Game.module.scss";

export default function Game() {
  const { addLetter, removeLetter, submitGuess } = useDispatchWordle();

  return (
    <Fragment>
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
    </Fragment>
  );
}
