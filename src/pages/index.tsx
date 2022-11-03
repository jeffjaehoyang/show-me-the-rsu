import Image from 'next/image';
import React, { useContext, useState } from 'react';
import StockDataProvider, { StockDataContext } from 'src/providers/StockDataProvider';
import { calculatePercentageDifference } from 'src/utils';
import useSWR from 'swr';

import RSUDetail from '@/components/RSUDetail';
import RSUForm from '@/components/RSUForm';
import { mockData } from '@/data/mock';
import fetcher from '@/lib/fetcher';
import { Grant, StockPriceResponse } from '@/lib/types';

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
  const { stockData, setStockData } = useContext(StockDataContext);

  return (
    <React.Fragment>
      {stockData === null && <RSUForm />}
      {stockData !== null && <RSUDetail />}
    </React.Fragment>
  );
};

export default Home;
