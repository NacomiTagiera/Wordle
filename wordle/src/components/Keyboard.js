import { useEffect } from "react";

import { keys } from "../constants/constants";
import styles from "./Keyboard.module.css";

const Keyboard = ({ boardData, handleKeyPress }) => {
  function handleKeyboard(key) {
    if (key.key === "Enter") handleKeyPress("ENTER");
    if (key.key === "Backspace") handleKeyPress("⌫");
    if (key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase())
      handleKeyPress(key.key.toUpperCase());
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.keyboardRows}>
      {keys.map((item, index) => (
        <div className={styles.row} key={index}>
          {item.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={
                boardData && boardData.correctCharArray.includes(key)
                  ? styles.keyCorrect
                  : boardData && boardData.presentCharArray.includes(key)
                  ? styles.keyPresent
                  : boardData && boardData.absentCharArray.includes(key)
                  ? styles.keyAbsent
                  : ""
              }
              onClick={() => {
                handleKeyPress(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
