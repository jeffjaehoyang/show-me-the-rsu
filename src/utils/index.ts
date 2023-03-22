import { HistoricalResult } from 'yahoo-finance2/dist/esm/src/modules/historical';

// util functions module
import { StockStatus } from '@/lib/types';

export const calculatePercentageDifference = (
  p1: string, // past price
  p2: string, // current price
): {
  difference: string;
  status: StockStatus;
} => {
  const pastPrice = parseFloat(p1);
  const currentPrice = parseFloat(p2);
  const difference = ((pastPrice - currentPrice) / pastPrice) * 100;
  return {
    difference:
      currentPrice < pastPrice
        ? Math.max(difference * -1, -100).toFixed(2)
        : difference.toFixed(2),
    status: currentPrice > pastPrice ? StockStatus.UP : StockStatus.DOWN,
  };
};

export const getRandomXFromArray = (arr: any[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const extractValue = (arr: any[], property: string): any[] => {
  if (!arr) return [];
  // extract value from property
  const extractedValue = arr.map((item) => item[property]);
  return extractedValue;
};
