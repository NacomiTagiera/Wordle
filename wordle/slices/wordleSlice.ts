import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "@/types";

const initialState: GameState = {
  boardState: ["", "", "", "", "", ""],
  currentRowIndex: 0,
  keyboardletterState: {},
  solution: "",
  status: "playing",
};

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      if (state.status !== "playing") return;
      if (state.boardState[state.currentRowIndex].length === 5) return;

      const letter = action.payload;
      state.boardState[state.currentRowIndex] += letter;
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
  },
});

export const { setSolution } = wordleSlice.actions;

export default wordleSlice.reducer;
