import { LetterState } from "@/types";
import { NUMBER_OF_LETTERS } from "./constants";
import { words } from "@/db";

interface Match {
  letter: string;
  state: LetterState;
}

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

  const matches: Match[] = guessArray.map((letter) => ({
    letter,
    state: "absent",
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
