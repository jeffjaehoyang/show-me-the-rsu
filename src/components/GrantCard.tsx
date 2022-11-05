import cn from 'classnames';
import React from 'react';

import {
    grantCardBackgroundColorDown, grantCardBackgroundColorUp, grantCardCompanyInfoWrapper,
    grantCardCompanyLogoStyle, grantCardCompanyNameWrapper, grantCardContainer,
    grantCardDeleteButton, grantCardLabelStyle, grantCardStockStatus, grantCardTextColorDown,
    grantCardTextColorUp
} from '@/css/styles';
import { GrantType, StockStatus } from '@/lib/types';

import {
    DeleteIcon, DollarIcon, InfoCircleIcon, LockIcon, MagnifyingIcon, StockDownArrowIcon,
    StockUpArrowIcon, VerifiedIcon
} from './icons';

interface IGrantCardProps {
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

const GrandCard: React.FunctionComponent<IGrantCardProps> = ({
  grantType,
  companyTicker,
  logoURI,
  strikePrice,
  currentPrice,
  nextVestDollarValue,
  percentageDifference,
}) => {
  return (
    <div className={grantCardContainer}>
      <div className="absolute top-4 right-4">
        <button className={grantCardDeleteButton} type="button">
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
              {percentageDifference.difference}%
            </span>
          </div>
        </div>
        <div className={grantCardCompanyInfoWrapper}>
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

export default GrandCard;
