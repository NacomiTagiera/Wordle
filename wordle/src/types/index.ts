export interface GameState {
  boardRowState: LetterState[][];
  boardState: string[];
  currentRowIndex: number;
  keyboardLetterState: Record<string, LetterState>;
  message: Message;
  solution: string;
  status: GameStatus;
}

export type GameStatus = "fail" | "playing" | "win";

export type LetterState = "absent" | "correct" | "present";

export interface Message {
  message: string;
  duration: number;
}
