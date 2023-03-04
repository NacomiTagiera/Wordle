import { useEffect } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

import Key from "./Key";
import { useGetGameStatus, useGetLetterState } from "@/slices/wordleSlice";

import styles from "./Keyboard.module.scss";

interface Props {
  onBackspaceClick: () => void;
  onEnterClick: () => void;
  onLetterClick: (letter: string) => void;
}

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

export default function Keyboard({
  onBackspaceClick,
  onEnterClick,
  onLetterClick,
}: Props) {
  const letterStatus = useGetLetterState();
  const gameStatus = useGetGameStatus();

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "Backspace") {
        onBackspaceClick();
        return;
      }

      if (key === "Enter") {
        onEnterClick();
        return;
      }

      if (key.match(/^[a-z]$/i)) {
        onLetterClick(key.toLocaleLowerCase());
      }
    };

    if (gameStatus === "playing") window.addEventListener("keyup", handleKeyUp);
    else window.removeEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [onBackspaceClick, onEnterClick, onLetterClick, gameStatus]);

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
              return <div key={letterIndex} style={{ flex: "0.5" }}></div>;
            } else {
              return (
                <Key
                  key={letterIndex}
                  letterState={letterStatus[letter]}
                  onClick={onLetterClick.bind(null, letter)}
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
