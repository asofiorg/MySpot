import { type AppType } from "next/dist/shared/lib/utils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MySpot</title>
        <meta
          name="description"
          content="DIY Wi-Fi educational hotposts for offline locations."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="MySpot" />
        <meta
          property="og:description"
          content="DIY Wi-Fi educational hotposts for offline locations."
        />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <Header />
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
