import Image from 'next/image';
import React, { useContext, useState } from 'react';
import GlobalStateProvider, { GlobalStateContext } from 'src/providers/GlobalStateProvider';
import { calculatePercentageDifference } from 'src/utils';
import useSWR from 'swr';

import RSUDetail from '@/components/RSUDetail';
import RSUForm from '@/components/RSUForm';
import { mockData } from '@/data/mock';
import fetcher from '@/lib/fetcher';

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
  const { stockData, setStockData, shouldShowForm } =
    useContext(GlobalStateContext);

  return (
    <React.Fragment>
      {shouldShowForm ? <RSUForm /> : <RSUDetail />}
    </React.Fragment>
  );
};

export default Home;
