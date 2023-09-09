'use client';

import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import Header from './UI/Header';
import Message from './UI/Message';
import Game from './Game';

export default function Wordle() {
  return (
    <Provider store={store}>
      <Message />
      <Header />
      <Game />
    </Provider>
  );
}
