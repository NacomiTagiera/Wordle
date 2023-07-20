'use client';

import { Provider } from 'react-redux';

import Game from '@/components/Game';
import Header from '@/components/UI/Header';
import Message from '@/components/UI/Message';
import { store } from '@/redux/store';

export default function Home() {
  return (
    <Provider store={store}>
      <Message />
      <Header />
      <Game />
    </Provider>
  );
}
