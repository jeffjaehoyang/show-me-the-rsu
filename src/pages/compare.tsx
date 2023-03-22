import {
    CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip
} from 'chart.js';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';
import { calculatePercentageDifference, extractValue } from 'src/utils';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import { HistoricalStockPriceResponse } from '@/lib/types';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Compare = () => {
  const router = useRouter();
  const { data } = useSWR<HistoricalStockPriceResponse>(
    `/api/historical-stocks?ticker1=${router.query['ticker1']}&ticker2=${router.query['ticker2']}&startDate=${router.query['startDate']}`,
    fetcher,
  );
  const { stockData, currentPrice } = useContext(GlobalStateContext);
  const labels = extractValue(data?.data[1].history, 'date').map((date) =>
    new Date(date).toLocaleDateString(),
  );
  // const data1 = extractValue(data?.data[1].history, 'close').map(
  //   (pastPrice) =>
  //     calculatePercentageDifference(
  //       pastPrice,
  //       data?.data[1].current.currentPrice.toString(),
  //     )['difference'],
  // );
  // const data2 = extractValue(data?.data[2].history, 'close').map(
  //   (pastPrice) =>
  //     calculatePercentageDifference(
  //       pastPrice,
  //       data?.data[2].current.currentPrice.toString(),
  //     )['difference'],
  // );
  const data1 = extractValue(data?.data[1].history, 'close');
  const data2 = extractValue(data?.data[2].history, 'close');
  const ticker1 = data?.data[1].current.companyTicker;
  const ticker2 = data?.data[2].current.companyTicker;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Stock Performance of ${ticker1} vs. ${ticker2}`,
      },
    },
  };
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: ticker1,
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: '#8181d2',
        borderDashOffset: 0.0,
        pointBorderColor: '#8181d2',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#8181d2',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data1,
      },
      {
        label: ticker2,
        fill: true,
        lineTension: 0.3,
        borderColor: '#81d281',
        backgroundColor: 'rgba(34,192,134,0.2)',
        borderDashOffset: 0.0,
        pointBorderColor: '#81d281',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#81d281',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data2,
      },
    ],
  };

  return <LineChart data={chartData} options={options} />;
};

export default Compare;
