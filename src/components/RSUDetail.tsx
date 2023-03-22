import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';
import { calculatePercentageDifference, extractValue, getRandomXFromArray } from 'src/utils';
import { EffectCube, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';

import { popularCompanies } from '@/data/popularCompanies';
import fetcher from '@/lib/fetcher';
import { Grant, StockPriceResponse } from '@/lib/types';

import GrantCard from './GrantCard';

export const grantCardCompanyLogoStyle =
  'object-contain w-12 h-12 p-1 mb-3 rounded-full mx-auto';
export const formButtonStyle =
  'block flex items-center justify-center w-full p-3 mt-5 text-white bg-slate-800 rounded-md focus:ring-indigo-200 focus:ring-opacity-50';

const RSUDetail = () => {
  const router = useRouter();
  const { stockData, setCurrentPrice, currentCompany } =
    useContext(GlobalStateContext);
  const { data } = useSWR<StockPriceResponse>(
    `/api/stocks?ticker=${router.query['companyTicker']}`,
    fetcher,
  );
  setCurrentPrice(parseFloat(data?.price));

  return data && !data.errorMessage && stockData ? (
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
          cubeEffect={{
            shadow: false,
            slideShadows: false,
          }}
          pagination={true}
          modules={[EffectCube, Pagination]}
          loop={stockData?.length > 1 ? true : false}
          className="mySwiper"
        >
          {stockData?.map((grant: Grant, idx: number) => {
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
          onClick={() => router.push('/')}
        >
          Add more
        </button>
      </div>
      <div className="flex flex-col mt-10">
        <div className="text-sm font-bold text-center">Compare with</div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {getRandomXFromArray(
            popularCompanies.filter(
              (company) => company.domain !== data?.domain,
            ),
            8,
          ).map((company) => (
            <img
              className={grantCardCompanyLogoStyle}
              src={`https://logo.clearbit.com/${company.domain}`}
              alt={'company logo'}
              onClick={() =>
                router.push({
                  pathname: '/compare',
                  query: {
                    ticker1: company.ticker,
                    ticker2: currentCompany,
                    startDate: stockData[0].startDate,
                  },
                })
              }
            />
          ))}
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
