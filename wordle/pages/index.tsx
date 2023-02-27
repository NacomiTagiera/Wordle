import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Game from "@/components/Game";

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Wordle Clone</title>
        <meta
          name="description"
          content="NextJS + Redux Toolkit Wordle clone. Guess the hidden five-letter word in 6 tries."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game />
    </Provider>
  );
}
