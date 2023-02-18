export interface GameState {
  boardState: string[];
  currentRowIndex: number;
  letterStatus: Record<string, LetterStatus>;
  message: string;
  solution: string;
  status: GameStatus;
}

export type GameStatus = "FAIL" | "IN_PROGRESS" | "WIN";

export type LetterStatus = "absent" | "correct" | "present";
