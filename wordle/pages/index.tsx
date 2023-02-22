import Head from "next/head";

import { useDispatchWordle } from "@/slices/wordleSlice";
import Header from "@/components/Header";
import Keyboard from "@/components/keyboard";

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
    <>
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
      <Keyboard
        onBackspaceClick={handleBackspaceClick}
        onEnterClick={handleEnterClick}
        onLetterClick={handleLetterClick}
      />
    </>
  );
}
