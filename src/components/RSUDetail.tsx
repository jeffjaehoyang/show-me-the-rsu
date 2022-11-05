import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';

import React, { useContext } from 'react';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';
import { calculatePercentageDifference } from 'src/utils';
import { EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';

import { formButtonStyle } from '@/css/styles';
import fetcher from '@/lib/fetcher';
import { Grant, StockPriceResponse } from '@/lib/types';

import GrantCard from './GrantCard';

const RSUDetail = () => {
  const {
    stockData,
    setStockData,
    currentPrice,
    setCurrentPrice,
    setShouldShowForm,
  } = useContext(GlobalStateContext);
  const { data } = useSWR<StockPriceResponse>(
    `/api/stocks?ticker=${stockData[0].companyTicker}`,
    fetcher,
  );
  console.log('data: ', data);
  setCurrentPrice(parseFloat(data?.price));

  return (
    data && (
      <React.Fragment>
        <div className="w-full bg-white border-gray-700 rounded-lg">
          <div className="flex flex-col mx-auto mb-5 text-lg font-bold text-center max-w-fit">
            <span>Results</span>
            <span
              className="font-normal"
              style={{ fontSize: 10, lineHeight: 'initial' }}
            >
              Powered by Yahoo Finance API
            </span>
          </div>

          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {stockData.map((grant: Grant, idx: number) => {
              const percentageDifference = calculatePercentageDifference(
                grant.strikePrice.toString(),
                data?.price,
              );
              return (
                <SwiperSlide key={idx}>
                  <GrantCard
                    grantType={grant.grantType}
                    companyTicker={grant.companyTicker.toUpperCase()}
                    logoURI={`https://logo.clearbit.com/${data?.domain}`}
                    strikePrice={grant.strikePrice}
                    currentPrice={data?.price}
                    nextVestDollarValue={parseFloat(
                      (parseFloat(data?.price) * (grant.numUnits / 16)).toFixed(
                        2,
                      ),
                    ).toLocaleString('en-US')}
                    percentageDifference={percentageDifference}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button
            className={formButtonStyle}
            style={{ minHeight: 45, maxHeight: 45 }}
            type="submit"
            onClick={() => setShouldShowForm(true)}
          >
            Add more
          </button>
        </div>
      </React.Fragment>
    )
  );
};

export default RSUDetail;
