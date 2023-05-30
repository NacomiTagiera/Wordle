import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Game from "@/components/Game";

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Wordle Clone</title>
        <meta
          name="description"
          content="This is a clone of the popular word game - Wordle - built with Next.js, TypeScript, Redux Toolkit, Material UI, and Sass."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game />
    </Provider>
  );
}
