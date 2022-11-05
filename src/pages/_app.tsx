import '@/css/tailwind.css';

import Head from 'next/head';
import StockDataProvider from 'src/providers/GlobalStateProvider';

import LayoutWrapper from '@/components/LayoutWrapper';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StockDataProvider>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </StockDataProvider>
  );
}
