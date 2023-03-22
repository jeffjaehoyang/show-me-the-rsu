import { HistoricalResult } from 'yahoo-finance2/dist/esm/src/modules/historical';

/**** Core Data Types & Enums ****/
export type Grant = {
  id: number;
  grantType: GrantType;
  strikePrice: number;
  grantSchedule: GrantSchedule;
  companyTicker: string;
  numUnits: number;
  startDate: string;
  grantDuration: number;
  companyName?: string;
};

export enum GrantType {
  INITIAL_GRANT = 'Initial Grant',
  REFRESHER = 'Refresher',
  ADDITIONAL_EQUITY = 'Additional Equity',
}

export enum GrantSchedule {
  ANNUAL = 'Annual',
  SEMI_ANNUAL = 'Semi Annual',
  QUARTERLY = 'Quarterly',
  MONTHLY = 'Monthly',
}

export enum StockStatus {
  DOWN = 'down',
  UP = 'up',
}

/*** API Return Types ***/
export type StockPriceResponse = {
  price: string;
  domain: string;
  displayName: string;
  errorMessage: string | null;
};

export type HistoricalStockPriceResponse = {
  data: {
    [key: number]: {
      history: HistoricalResult;
      current: {
        currentPrice: number;
        displayName: string;
        companyTicker: string;
      };
    };
  };
  domain: string;
  errorMessage: string | null;
};
