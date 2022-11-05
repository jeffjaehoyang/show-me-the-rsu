import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

// UserDetailsProvider.js
import { Grant } from '@/lib/types';

interface IGlobalStateContext {
  stockData: Grant[] | null;
  setStockData?: Dispatch<SetStateAction<Grant[]>>;
  currentPrice?: number;
  setCurrentPrice?: Dispatch<SetStateAction<number>>;
  shouldShowForm: boolean;
  setShouldShowForm?: Dispatch<SetStateAction<boolean>>;
}

//create a context, with createContext api
export const GlobalStateContext = createContext<IGlobalStateContext>({
  stockData: null,
  shouldShowForm: true,
});

const GlobalStateProvider = (props) => {
  const [stockData, setStockData] = useState<Grant[]>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(null);
  const [shouldShowForm, setShouldShowForm] = useState<boolean>(true);

  return (
    <GlobalStateContext.Provider
      value={{
        stockData,
        setStockData,
        currentPrice,
        setCurrentPrice,
        shouldShowForm,
        setShouldShowForm,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
