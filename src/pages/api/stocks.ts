import cache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from 'yahoo-finance2';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ticker = req.query['ticker'];
  const apiKey = process.env.ALPHAVANTAGE_API_KEY;
  const endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
  const cachedData = cache.get(ticker);
  const domain = await extractDomain(ticker as string);

  if (cachedData) {
    const latestPrice = extractPriceFromResponse(cachedData);
    return res.status(200).json({
      price: parseFloat(latestPrice).toFixed(2),
      domain: domain,
    });
  } else {
    const hours = 12;
    const response = await fetch(endpoint, { method: 'GET' });
    const stockData = await response.json();
    // save response data to cache
    cache.put(ticker, stockData, hours * 1000 * 60 * 60);
    const latestPrice = extractPriceFromResponse(stockData);
    return res.status(200).json({
      price: parseFloat(latestPrice).toFixed(2),
      domain: domain.toString(),
    });
  }
}

const extractDomain = async (ticker: string): Promise<string> => {
  if (ticker === 'META') return 'meta.com';
  const response = await yahooFinance.quoteSummary(ticker, {
    modules: ['assetProfile'],
  });
  const website = response?.assetProfile?.website;
  const url = new URL(website);
  const domain = url.hostname.replace('www.', '');
  return domain;
};

const extractPriceFromResponse = (data): string => {
  try {
    const latestPrice = data['Global Quote']
      ? data['Global Quote']['05. price']
      : null;
    return latestPrice;
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
};
