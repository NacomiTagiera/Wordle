import { Stack } from "@mui/system";

import Board from "./Gameboard";
import Header from "./Header";
import Keyboard from "./Keyboard";
import Message from "./Message";
import { useDispatchWordle } from "@/slices/wordleSlice";

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
    <Stack
      component="main"
      alignItems="center"
      justifyContent="center"
      spacing={10}
    >
      <Header />
      <Message />
      <Board />
      <Keyboard
        onBackspaceClick={handleBackspaceClick}
        onEnterClick={handleEnterClick}
        onLetterClick={handleLetterClick}
      />
    </Stack>
  );
}
