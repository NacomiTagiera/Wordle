import {
  bindActionCreators,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { type GameState, type GameStatus, type LetterState } from '@/types';
import { NUMBER_OF_LETTERS, NUMBER_OF_ROWS } from '@/utils/constants';
import { appraiseGuess, getRandomWord, isGuessComplete, isValidWord } from '@/utils/word-utils';

import { useAppDispatch } from '../hooks';

const initialState: GameState = {
  boardRowState: [],
  boardState: new Array(NUMBER_OF_ROWS).fill('') as string[],
  currentRowIndex: 0,
  keyboardLetterState: {} as Record<string, LetterState>,
  message: { message: '', duration: 1500 },
  solution: getRandomWord(),
  status: 'playing' as GameStatus,
};

export const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.status !== 'playing') return;
      if (state.boardState[state.currentRowIndex].length === NUMBER_OF_LETTERS) return;

      state.boardState[state.currentRowIndex] += action.payload;
    },
    removeLetter: (state) => {
      if (state.status !== 'playing') return;
      if (!state.boardState[state.currentRowIndex].length) return;

      state.boardState[state.currentRowIndex] = state.boardState[state.currentRowIndex].slice(
        0,
        -1
      );
    },
    resetGame: (state) => {
      state.boardRowState = [];
      state.boardState = new Array(NUMBER_OF_ROWS).fill('') as string[];
      state.currentRowIndex = 0;
      state.keyboardLetterState = {};
      state.message = { message: '', duration: 1500 };
      state.solution = getRandomWord();
      state.status = 'playing';
    },
    resetMessage: (state) => {
      state.message = { message: '', duration: 1500 };
    },
    submitGuess: (state) => {
      if (state.status !== 'playing') return;

      const guess = state.boardState[state.currentRowIndex];

      if (!isGuessComplete(guess)) {
        state.message.message = 'Not enough letters';
        return;
      }

      if (!isValidWord(guess)) {
        state.message.message = 'Not in word list';
        return;
      }

      const boardRowState = appraiseGuess(guess, state.solution);

      state.boardRowState.push(boardRowState);

      boardRowState.forEach((letterState, index) => {
        const currentLetterState = state.keyboardLetterState[guess[index]];

        if (currentLetterState !== 'present' && currentLetterState !== 'correct') {
          state.keyboardLetterState[guess[index]] = letterState;
        }
      });

      if (state.currentRowIndex === state.boardState.length - 1) {
        state.status = 'fail';
        state.message = { message: state.solution, duration: 0 };
      }

      if (boardRowState.every((state) => state === 'correct')) {
        state.status = 'win';
        state.message = { message: 'You win!', duration: 0 };
      }

      state.currentRowIndex++;
    },
  },
});

export const { addLetter, removeLetter, resetGame, resetMessage, submitGuess } =
  wordleSlice.actions; //for tests

export const useDispatchWordle = () => {
  const { actions } = wordleSlice;
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};

const selectGameState = (state: GameState) => state;

export const selectBoardRows = createSelector(selectGameState, (state) =>
  state.boardState.map((letters, rowIndex) => ({
    letters,
    lettersState: state.boardRowState[rowIndex],
  }))
);

export const selectGameStatus = (state: GameState) => state.status;

export const selectLetterState = (state: GameState) => state.keyboardLetterState;

export const selectMessage = (state: GameState) => state.message;

export const { reducer } = wordleSlice;
