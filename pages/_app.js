import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EmojiArk NFT</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
