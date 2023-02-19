import { words } from "@/db";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
};
