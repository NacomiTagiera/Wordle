export interface GameState {
  boardState: Array<string>;
  currentRowIndex: number;
  keyboardLetterState: { [letter: string]: LetterState };
  solution: string;
  status: GameStatus;
}

export type GameStatus = "fail" | "playing" | "win";

export type LetterState = "absent" | "correct" | "present";
