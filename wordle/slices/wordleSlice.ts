import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { GameState } from "@/types";
import {
  getRandomWord,
  NUMBER_OF_LETTERS,
  NUMBER_OF_ROWS,
} from "@/lib/word-utils";
import { words } from "@/db";

const initialState: GameState = {
  boardRowState: [],
  boardState: new Array(NUMBER_OF_ROWS).fill(""),
  currentRowIndex: 0,
  keyboardLetterState: {},
  solution: getRandomWord(),
  status: "playing",
};

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.status !== "playing") return;
      if (state.boardState[state.currentRowIndex].length === NUMBER_OF_LETTERS)
        return;

      state.boardState[state.currentRowIndex] += action.payload;
    },
    removeLetter: (state) => {
      if (state.status !== "playing") return;
      if (!state.boardState[state.currentRowIndex].length) return;

      state.boardState[state.currentRowIndex] = state.boardState[
        state.currentRowIndex
      ].slice(0, -1);
    },
    resetGame: (state) => {
      state.boardRowState = [];
      state.boardState = new Array(NUMBER_OF_ROWS).fill("");
      state.currentRowIndex = 0;
      state.keyboardLetterState = {};
      state.solution = getRandomWord();
      state.status = "playing";
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
    submitGuess: (state) => {
      if (
        state.boardState[state.currentRowIndex].length === NUMBER_OF_LETTERS
      ) {
        if (words.includes(state.boardState[state.currentRowIndex])) {
          const guessArray = state.boardState[state.currentRowIndex].split("");

          state.boardRowState.push(
            guessArray.map((guessedLetter, guessedLetterIndex) => {
              if (state.solution.at(guessedLetterIndex) === guessedLetter) {
                state.keyboardLetterState[guessedLetter] = "correct";
                return "correct";
              } else if (state.solution.includes(guessedLetter)) {
                if (!state.keyboardLetterState[guessedLetter])
                  state.keyboardLetterState[guessedLetter] = "present";
                return "present";
              } else {
                if (!state.keyboardLetterState[guessedLetter])
                  state.keyboardLetterState[guessedLetter] = "absent";
                return "absent";
              }
            })
          );

          state.currentRowIndex++;
        }
      }
    },
  },
});

export const useDispatchWordle = () => {
  const { actions } = wordleSlice;
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};

export const useGetBoardRows = () =>
  useAppSelector((state) =>
    state.boardState.map((letters, rowIndex) => ({
      letters,
      lettersState: state.boardRowState[rowIndex],
    }))
  );

export const useGetLetterState = () =>
  useAppSelector((state) => state.keyboardLetterState);

export default wordleSlice.reducer;
