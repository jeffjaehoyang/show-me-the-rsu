import cache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import yf from 'yahoo-finance2';
import { HistoricalResult } from 'yahoo-finance2/dist/esm/src/modules/historical';
import { Quote, QuoteEquity } from 'yahoo-finance2/dist/esm/src/modules/quote';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ticker1 = req.query['ticker1'].toString().toUpperCase();
  const ticker2 = req.query['ticker2'].toString().toUpperCase();
  const startDate = req.query['startDate'].toString();

  const cachedDataOne = cache.get(`${ticker1}-${startDate}`);
  const cachedDataTwo = cache.get(`${ticker2}-${startDate}`);

  if (cachedDataOne && cachedDataTwo) {
    return res.status(200).json({
      data: {
        1: cachedDataOne,
        2: cachedDataTwo,
      },
      errorMessage: null,
    });
  } else {
    const hours = 12;
    try {
      const historicalDataOne = await getHistoricalData(ticker1, startDate);
      const historicalDataTwo = await getHistoricalData(ticker2, startDate);
      const currentDataOne = await getCurrentData(ticker1);
      const currentDataTwo = await getCurrentData(ticker2);
      // save response data to cache
      cache.put(
        `${ticker1}-${startDate}`,
        {
          history: historicalDataOne,
          current: currentDataOne,
        },
        hours * 1000 * 60 * 60,
      );
      cache.put(
        `${ticker2}-${startDate}`,
        {
          history: historicalDataTwo,
          current: currentDataTwo,
        },
        hours * 1000 * 60 * 60,
      );
      return res.status(200).json({
        data: {
          1: {
            history: historicalDataOne,
            current: currentDataOne,
          },
          2: {
            history: historicalDataTwo,
            current: currentDataTwo,
          },
        },
        errorMessage: null,
      });
    } catch (e) {
      return res.status(500).json({
        data: null,
        errorMessage: e.message,
      });
    }
  }
}

const getHistoricalData = async (
  ticker: string,
  startDate: string,
): Promise<HistoricalResult> => {
  const data = await yf.historical(ticker, {
    period1: startDate,
    interval: '1wk',
  });
  return data;
};

const getCurrentData = async (
  ticker: string,
): Promise<{
  currentPrice: number;
  displayName: string;
  companyTicker: string;
}> => {
  const stockData = await yf.quote(ticker, {
    fields: ['regularMarketPrice', 'displayName', 'symbol'],
  });
  console.log('stock data: ', stockData);
  return {
    currentPrice: stockData.regularMarketPrice,
    displayName: stockData.displayName,
    companyTicker: stockData.symbol,
  };
};
