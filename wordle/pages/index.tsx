import Head from "next/head";

import Header from "@/components/Header";

export default function Home() {
  const handleCloseInstructions = () => {
    return 0;
  };

  return (
    <>
      <Head>
        <title>Wordle Clone</title>
        <meta
          name="description"
          content="NextJS + Redux Toolkit Wordle clone"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
