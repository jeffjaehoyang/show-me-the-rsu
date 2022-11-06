import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import React, { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';
import { calculatePercentageDifference } from 'src/utils';
import { EffectCube, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import { Grant, StockPriceResponse } from '@/lib/types';

import GrantCard from './GrantCard';

export const grantCardCompanyLogoStyle =
  'object-contain w-12 h-12 p-1 mb-3 rounded-full mx-auto';
export const formButtonStyle =
  'block flex items-center justify-center w-full p-3 mt-5 text-white bg-slate-800 rounded-md focus:ring-indigo-200 focus:ring-opacity-50';

const RSUDetail = () => {
  const {
    stockData,
    setCurrentPrice,
    setShouldShowForm,
    currentCompany,
    setCurrentCompany,
  } = useContext(GlobalStateContext);
  const { data, error } = useSWR<StockPriceResponse>(
    `/api/stocks?ticker=${stockData[0].companyTicker}`,
    fetcher,
  );
  setCurrentPrice(parseFloat(data?.price));
  setCurrentCompany(stockData[0].companyTicker);

  return data && !data.errorMessage ? (
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
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: false,
            slideShadows: false,
          }}
          pagination={true}
          modules={[EffectCube, Pagination]}
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
                  idx={idx}
                  id={grant.id}
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
      <div className="flex flex-col mt-10">
        <div className="text-sm font-bold text-center">Compare with</div>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/google.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/meta.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/apple.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/netflix.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/amazon.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/uber.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/airbnb.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/lyft.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/dropbox.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/block.xyz'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/snap.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/doordash.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/roblox.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/tesla.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/robinhood.com'}
            alt={'company logo'}
          />
          <img
            className={grantCardCompanyLogoStyle}
            src={'https://logo.clearbit.com/coinbase.com'}
            alt={'company logo'}
          />
        </div>
      </div>
    </React.Fragment>
  ) : data && data.errorMessage ? (
    <React.Fragment>
      <div className="flex items-center justify-center w-full h-full font-bold text-center">
        {data.errorMessage}
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="flex items-center justify-center w-full h-full font-bold text-center">
        <ThreeDots
          height="50"
          width="50"
          radius="7"
          ariaLabel="three-dots-loading"
          color="rgb(41 37 36)"
        />
      </div>
    </React.Fragment>
  );
};

export default RSUDetail;
