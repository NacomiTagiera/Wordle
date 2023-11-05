'use client';

import { Provider } from 'react-redux';

import { setupStore } from './store';

const store = setupStore();

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
