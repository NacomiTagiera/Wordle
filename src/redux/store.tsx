import { combineReducers, configureStore, type PreloadedState } from '@reduxjs/toolkit';

import { reducer as wordleReducer } from './slices/wordleSlice';

const rootReducer = combineReducers({
  wordle: wordleReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
