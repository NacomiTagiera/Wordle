import {
  bindActionCreators,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { GameState } from "@/types";
import {
  appraiseGuess,
  getRandomWord,
  isGuessComplete,
  isValidWord,
  NUMBER_OF_LETTERS,
  NUMBER_OF_ROWS,
} from "@/lib/word-utils";

const initialState: GameState = {
  boardRowState: [],
  boardState: new Array(NUMBER_OF_ROWS).fill(""),
  currentRowIndex: 0,
  keyboardLetterState: {},
  message: { message: "", duration: 1500 },
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
      state.message = { message: "", duration: 1500 };
      state.solution = getRandomWord();
      state.status = "playing";
    },
    resetMessage: (state) => {
      state.message = { message: "", duration: 1500 };
    },
    submitGuess: (state) => {
      const guess = state.boardState[state.currentRowIndex];

      if (!isGuessComplete(guess)) {
        state.message.message = "Not enough letters";
        return;
      }

      if (!isValidWord(guess)) {
        state.message.message = "Not in word list";
        return;
      }

      const boardRowState = appraiseGuess(guess, state.solution);

      state.boardRowState.push(boardRowState);

      boardRowState.forEach((letterState, index) => {
        const currentLetterState = state.keyboardLetterState[guess[index]];

        switch (currentLetterState) {
          case "present":
            if (letterState === "absent") break;

          case "correct":
            break;

          default:
            state.keyboardLetterState[guess[index]] = letterState;
            break;
        }
      });

      if (boardRowState.every((state) => state === "correct")) {
        state.status === "win";
        state.message = { message: "You win!", duration: 0 };
      }

      state.currentRowIndex++;

      if (state.currentRowIndex === state.boardState.length) {
        state.status = "fail";
        state.message = { message: state.solution, duration: 0 };
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

export const useGetGameStatus = () => useAppSelector((state) => state.status);

export const useGetLetterState = () =>
  useAppSelector((state) => state.keyboardLetterState);

export const useGetMessage = () => useAppSelector((state) => state.message);

export default wordleSlice.reducer;
