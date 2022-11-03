import cn from 'classnames';
import Image from 'next/image';
import React, { useContext } from 'react';
import { StockDataContext } from 'src/providers/StockDataProvider';
import { calculatePercentageDifference } from 'src/utils';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import { StockPriceResponse, StockStatus } from '@/lib/types';

const labelStyle =
  'ml-3 flex flex-row items-center text-3xl font-medium text-gray-700';
const inputStyle =
  'block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';
const buttonStyle =
  'block w-full p-3 mt-2 text-gray-700 bg-indigo-100 rounded-md focus:ring-indigo-200 focus:ring-opacity-50';
const backgroundColorUp = 'bg-green-100';
const backgroundColorDown = 'bg-red-100';
const textColorUp = 'text-green-700';
const textColorDown = 'text-red-700';

const RSUDetail = () => {
  const { stockData, setStockData } = useContext(StockDataContext);
  const { data } = useSWR<StockPriceResponse>(
    `/api/stocks?ticker=${stockData.companyTicker}`,
    fetcher,
  );
  const percentageDifference = calculatePercentageDifference(
    stockData.strikePrice.toString(),
    data?.price,
  );
  return (
    data && (
      <React.Fragment>
        <div className="w-full text-gray-700 bg-white border-gray-700 rounded-lg">
          <div className="mb-2 text-lg font-bold">
            Your RSU Grant from {stockData.companyTicker.toUpperCase()}
          </div>
          <div className="flex flex-row items-center">
            <Image
              alt="logo"
              src={`https://logo.clearbit.com/${data?.domain}`}
              className="bg-gray-200"
              width={70}
              height={70}
              style={{
                borderRadius: '10px',
              }}
            />
            <div className={labelStyle}>
              <span>${data?.price}</span>
              <span
                className={
                  percentageDifference.status === StockStatus.DOWN
                    ? cn(
                        'text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3',
                        backgroundColorDown,
                        textColorDown,
                      )
                    : cn(
                        'text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3',
                        backgroundColorUp,
                        textColorUp,
                      )
                }
              >
                {percentageDifference.status.toUpperCase()}{' '}
                {percentageDifference.difference}%
              </span>
            </div>
          </div>
          <div className="mt-5">
            {/* <div>Your start date: {stockData.startDate}</div>
          <div>Your RSU grant type: {stockData.grantType}</div>
          <div>Your RSU grant schedule: {stockData.grantSchedule}</div>
          <div>Number of units awarded: {stockData.numUnits}</div>
          <div>Vesting over: {stockData.grantDuration} years</div> */}
            <div>Strike Price: ${stockData.strikePrice}</div>
            <div>
              Dollar Value of Next Vest: $
              {(
                parseFloat(data?.price) *
                (stockData.numUnits / 16)
              ).toLocaleString('en-US')}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default RSUDetail;
