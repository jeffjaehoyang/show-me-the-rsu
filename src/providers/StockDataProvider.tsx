import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

// UserDetailsProvider.js
import { Grant, GrantSchedule, GrantType } from '@/lib/types';

interface IStockDataContext {
  stockData: Grant | null;
  setStockData?: Dispatch<SetStateAction<Grant>>;
}

//create a context, with createContext api
export const StockDataContext = createContext<IStockDataContext>({
  stockData: null,
});

const StockDataProvider = (props) => {
  // this state will be shared with all components
  const [stockData, setStockData] = useState<Grant>(null);

  return (
    // this is the provider providing state
    <StockDataContext.Provider value={{ stockData, setStockData }}>
      {props.children}
    </StockDataContext.Provider>
  );
};

export default StockDataProvider;
