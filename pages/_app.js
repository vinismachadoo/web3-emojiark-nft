import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div className="overscroll-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white hover:scrollbar-thumb-gray-100 scrollbar-track-transparent">
      <Head>
        <title>EmojiArk NFT</title>
        <link rel="icon" href="/unicorn.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
