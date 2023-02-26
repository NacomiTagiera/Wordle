import { words } from "@/db";
import { LetterState } from "@/types";

export const NUMBER_OF_ROWS = 6;
export const NUMBER_OF_LETTERS = 5;

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
};

export const isValidWord = (word: string) => {
  return words.includes(word);
};

export const isGuessComplete = (guess: string) => {
  return guess.length === NUMBER_OF_LETTERS;
};

export const appraiseGuess = (
  guess: string,
  solution: string
): LetterState[] => {
  const result: LetterState[] = [];

  const guessArray = Array.from(guess);
  const solutionArray = Array.from(solution);

  const matches = guessArray.map((letter) => ({
    letter,
    state: "absent" as LetterState,
  }));

  for (let i = guessArray.length - 1; i >= 0; i--) {
    if (solutionArray[i] === guessArray[i]) {
      matches[i].state = "correct";
      solutionArray.splice(i, 1);
    }
  }

  guessArray.forEach((letter, i) => {
    if (solutionArray.includes(letter) && matches[i].state !== "correct") {
      matches[i].state = "present";
      solutionArray.splice(solutionArray.indexOf(letter), 1);
    }
  });

  matches.forEach((letter) => {
    result.push(letter.state);
  });

  return result;
};
