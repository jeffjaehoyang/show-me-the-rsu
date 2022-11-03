// util functions module

import { StockStatus } from "@/lib/types";

export const calculatePercentageDifference = (
  p1: string,
  p2: string
): {
  difference: string;
  status: StockStatus;
} => {
  const basePrice = parseFloat(p1);
  const comparePrice = parseFloat(p2);
  const difference = (Math.abs(basePrice - comparePrice) / basePrice) * 100;
  return {
    difference: difference.toFixed(2),
    status: comparePrice - basePrice > 0 ? StockStatus.UP : StockStatus.DOWN,
  };
};
