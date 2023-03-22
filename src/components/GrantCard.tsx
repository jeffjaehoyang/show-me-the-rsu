import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';

import { GrantType, StockStatus } from '@/lib/types';

import {
    DeleteIcon, DollarIcon, InfoCircleIcon, LockIcon, MagnifyingIcon, StockDownArrowIcon,
    StockUpArrowIcon, VerifiedIcon
} from './icons';

// GrantCard Styles
export const grantCardContainer =
  'p-8 border border-gray-100 rounded-lg shadow-md bg-gray-50';
export const grantCardDeleteButton =
  'inline-block hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5';
export const grantCardBackgroundColorUp = 'bg-green-100';
export const grantCardBackgroundColorDown = 'bg-red-100';
export const grantCardTextColorUp = 'text-green-700';
export const grantCardTextColorDown = 'text-red-700';
export const grantCardLabelStyle =
  'ml-3 flex flex-row items-center text-3xl font-medium';
export const grantCardCompanyLogoStyle =
  'object-contain w-24 h-24 p-1 mb-3 bg-white rounded-full';
export const grantCardCompanyInfoWrapper =
  'flex flex-col items-center justify-center';
export const grantCardCompanyNameWrapper =
  'flex flex-row items-center mb-1 text-xl font-medium';
export const grantCardStockStatus =
  'flex flex-row items-center text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3';
export const grantCardGrantInfoWrapper =
  'flex flex-col max-w-sm p-4 mx-auto mt-4 text-xs rounded-md bg-indigo-50';

interface IGrantCardProps {
  idx: number;
  id: number;
  grantType: GrantType;
  companyTicker: string;
  logoURI: string;
  strikePrice: number;
  currentPrice: string;
  nextVestDollarValue: string;
  percentageDifference: {
    difference: string;
    status: StockStatus;
  };
}

const GrantCard: React.FunctionComponent<IGrantCardProps> = ({
  idx,
  id,
  grantType,
  companyTicker,
  logoURI,
  strikePrice,
  currentPrice,
  nextVestDollarValue,
  percentageDifference,
}) => {
  const { stockData, setStockData } = useContext(GlobalStateContext);
  const router = useRouter();

  const onDelete = () => {
    const newStockData = stockData.filter((data) => data.id !== id);
    if (newStockData.length === 0) {
      router.push('/');
    }
    setStockData(newStockData);
  };

  return (
    <div className={grantCardContainer}>
      <div className="absolute top-4 left-4">
        <div className="flex items-center justify-center object-contain w-5 h-5 p-1 mb-3 text-xs text-white bg-white bg-red-500 rounded-full">
          {idx + 1}
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className={grantCardDeleteButton}
          type="button"
          onClick={onDelete}
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <img
          className={grantCardCompanyLogoStyle}
          src={logoURI}
          alt={'company logo'}
        />
        <div className={grantCardCompanyInfoWrapper}>
          <div className={grantCardCompanyNameWrapper}>
            <VerifiedIcon />
            <span>{`RSU Grant from ${companyTicker}`}</span>
          </div>
          <div className={grantCardLabelStyle}>
            <span
              className={
                percentageDifference.status === StockStatus.DOWN
                  ? cn(
                      grantCardStockStatus,
                      grantCardBackgroundColorDown,
                      grantCardTextColorDown,
                    )
                  : cn(
                      grantCardStockStatus,
                      grantCardBackgroundColorUp,
                      grantCardTextColorUp,
                    )
              }
            >
              {percentageDifference.status === StockStatus.UP ? (
                <StockUpArrowIcon />
              ) : (
                <StockDownArrowIcon />
              )}
              {percentageDifference.status.toUpperCase()}{' '}
              {Math.abs(parseFloat(percentageDifference.difference))}%
            </span>
          </div>
        </div>
        <div className={grantCardGrantInfoWrapper}>
          <div className="flex flex-row items-center">
            <InfoCircleIcon />
            <span>{grantType}</span>
          </div>
          <div className="flex flex-row items-center mt-2">
            <LockIcon />
            <span>
              Grant was based on{' '}
              <span className="font-bold">${strikePrice}</span> per stock
            </span>
          </div>
          <div className="flex flex-row items-center mt-2">
            <MagnifyingIcon />
            <span>
              Current price per stock is{' '}
              <span className="font-bold">${currentPrice}</span>
            </span>
          </div>
          <div className="flex flex-row items-center mt-2">
            <DollarIcon />
            <span>
              At current price levels, your next vest will be worth{' '}
              <span className="font-bold">${nextVestDollarValue}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantCard;
