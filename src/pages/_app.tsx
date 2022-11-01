import "@/css/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import LayoutWrapper from "@/components/LayoutWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </>
  );
}
