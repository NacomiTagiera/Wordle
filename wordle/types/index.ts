export interface GameState {
  boardRowState: Array<Array<LetterState>>;
  boardState: Array<string>;
  currentRowIndex: number;
  keyboardLetterState: Record<string, LetterState>;
  solution: string;
  status: GameStatus;
}

export type GameStatus = "fail" | "playing" | "win";

export type LetterState = "absent" | "correct" | "present";
