import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "@/types";

const initialState: GameState = {
  boardState: ["", "", "", "", "", ""],
  currentRowIndex: 0,
  letterStatus: {},
  message: "",
  solution: "",
  status: "IN_PROGRESS",
};

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.boardState[state.currentRowIndex].length === 5) return;
      if (state.status !== "IN_PROGRESS") return;

      state.boardState[state.currentRowIndex] += action.payload;
    },
    removeLetter: (state) => {
      if (state.status !== "IN_PROGRESS") return;
      if (!state.boardState[state.currentRowIndex].length) return;

      state.boardState[state.currentRowIndex] = state.boardState[
        state.currentRowIndex
      ].slice(0, -1);
    },
    revealLastTile: (state) => {
      const guess = state.boardState[state.currentRowIndex - 1];
      if (guess === state.solution) state.status = "WIN";
      else if (state.currentRowIndex === state.boardState.length)
        state.status = "FAIL";
      else state.status = "IN_PROGRESS";
    },
  },
});

export const { addLetter, removeLetter, revealLastTile } = wordleSlice.actions;

export default wordleSlice.reducer;
