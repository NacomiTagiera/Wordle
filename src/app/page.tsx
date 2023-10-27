import { Game } from '@/components/Game';
import { Header } from '@/components/UI/Header';
import { Message } from '@/components/UI/Message';
import { ReduxProvider } from '@/redux/Provider';

export default function Home() {
  return (
    <ReduxProvider>
      <Message />
      <Header />
      <Game />
    </ReduxProvider>
  );
}
