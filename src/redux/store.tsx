import { configureStore } from '@reduxjs/toolkit';

import { reducer as wordle } from './slices/wordleSlice';

export const store = configureStore({
  reducer: wordle,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
