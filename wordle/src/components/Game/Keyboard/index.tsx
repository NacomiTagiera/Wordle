import { useCallback, useEffect } from "react";

import BackspaceIcon from "@mui/icons-material/Backspace";

import Key from "./Key";
import {
  useGetGameStatus,
  useGetLetterState,
} from "@/redux/slices/wordleSlice";
import { keyboardRows } from "@/lib/constants";

import styles from "./Keyboard.module.scss";

interface Props {
  onBackspaceClick: () => void;
  onEnterClick: () => void;
  onLetterClick: (letter: string) => void;
}

export default function Keyboard({
  onBackspaceClick,
  onEnterClick,
  onLetterClick,
}: Props) {
  const letterState = useGetLetterState();
  const gameStatus = useGetGameStatus();

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "Backspace") {
        onBackspaceClick();
      } else if (key === "Enter") {
        onEnterClick();
      } else if (key.match(/^[a-z]$/i)) {
        onLetterClick(key.toLowerCase());
      }
    },
    [onBackspaceClick, onEnterClick, onLetterClick]
  );

  useEffect(() => {
    if (gameStatus === "playing") {
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStatus, handleKeyUp]);

  return (
    <div className={styles.keyboard}>
      {keyboardRows.map((row, index) => (
        <div key={index} className={styles.row}>
          {Array.from(row).map((letter, letterIndex) => {
            if (letter === "enter") {
              return (
                <Key key={letterIndex} onClick={onEnterClick} large>
                  enter
                </Key>
              );
            } else if (letter === "backspace") {
              return (
                <Key key={letterIndex} onClick={onBackspaceClick} large>
                  <BackspaceIcon sx={{ fontSize: "2rem" }} />
                </Key>
              );
            } else if (letter === "") {
              return (
                <div key={letterIndex} className={styles["key--empty"]}></div>
              );
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
}
