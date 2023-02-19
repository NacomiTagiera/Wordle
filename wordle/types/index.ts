export interface GameState {
  boardState: string[];
  currentRowIndex: number;
  keyboardletterState: { [letter: string]: LetterState };
  solution: string;
  status: GameStatus;
}

export type GameStatus = "fail" | "playing" | "win";

export enum LetterState {
  Absent,
  Correct,
  Present,
}
