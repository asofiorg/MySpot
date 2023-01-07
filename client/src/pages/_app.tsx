import { type AppType } from "next/dist/shared/lib/utils";
import Footer from "../components/Footer";
import Head from "next/head";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MySpot Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MyApp;
