import cache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import yf from 'yahoo-finance2';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ticker = req.query['ticker'].toString().toUpperCase();
  const cachedData = cache.get(ticker);

  if (cachedData) {
    return res.status(200).json(cachedData);
  } else {
    const hours = 12;
    try {
      const stockData = await yf.quote(ticker, {
        fields: ['regularMarketPrice', 'displayName', 'symbol'],
      });
      const domain = await extractDomain(ticker);
      // save response data to cache
      cache.put(
        ticker,
        {
          price: stockData?.regularMarketPrice.toFixed(2),
          domain: domain.toString(),
          displayName: stockData?.displayName,
        },
        hours * 1000 * 60 * 60,
      );
      return res.status(200).json({
        price: stockData?.regularMarketPrice.toFixed(2),
        domain: domain.toString(),
        displayName: stockData?.displayName,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const extractDomain = async (ticker: string): Promise<string> => {
  if (ticker === 'META') return 'meta.com';
  const response = await yf.quoteSummary(ticker, {
    modules: ['assetProfile'],
  });
  const website = response?.assetProfile?.website;
  const url = new URL(website);
  const domain = url.hostname.replace('www.', '');
  return domain;
};
