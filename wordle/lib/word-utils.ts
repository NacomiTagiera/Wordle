import { words } from "@/db";

export const NUMBER_OF_ROWS = 6;
export const NUMBER_OF_LETTERS = 5;

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
};
