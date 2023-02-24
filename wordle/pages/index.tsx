import Head from "next/head";
import { Stack } from "@mui/system";

import { useDispatchWordle } from "@/slices/wordleSlice";
import Board from "@/components/Gameboard";
import Header from "@/components/Header";
import Keyboard from "@/components/Keyboard";

export default function Home() {
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
      <Head>
        <title>Wordle Clone</title>
        <meta
          name="description"
          content="NextJS + Redux Toolkit Wordle clone. Guess the hidden five-letter word in 6 tries."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Board />
      <Keyboard
        onBackspaceClick={handleBackspaceClick}
        onEnterClick={handleEnterClick}
        onLetterClick={handleLetterClick}
      />
    </Stack>
  );
}
