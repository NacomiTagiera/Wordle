export type GameStatus = 'fail' | 'playing' | 'win';

export type LetterState = 'absent' | 'correct' | 'present';

export type Message = {
  message: string;
  duration: number;
};

export type GameState = {
  boardRowState: LetterState[][];
  boardState: string[];
  currentRowIndex: number;
  keyboardLetterState: Record<string, LetterState>;
  message: Message;
  solution: string;
  status: GameStatus;
};
