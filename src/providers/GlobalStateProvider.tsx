import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

// UserDetailsProvider.js
import { Grant } from '@/lib/types';

interface IGlobalStateContext {
  stockData: Grant[] | null;
  setStockData?: Dispatch<SetStateAction<Grant[]>>;
  currentPrice?: number;
  setCurrentPrice?: Dispatch<SetStateAction<number>>;
  currentCompany?: string;
  setCurrentCompany?: Dispatch<SetStateAction<string>>;
  shouldShowForm: boolean;
  setShouldShowForm?: Dispatch<SetStateAction<boolean>>;
  nextId: number;
  setNextId?: Dispatch<SetStateAction<number>>;
}

//create a context, with createContext api
export const GlobalStateContext = createContext<IGlobalStateContext>({
  stockData: null,
  shouldShowForm: true,
  nextId: 0,
});

const GlobalStateProvider = (props) => {
  const [stockData, setStockData] = useState<Grant[]>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(null);
  const [shouldShowForm, setShouldShowForm] = useState<boolean>(true);
  const [nextId, setNextId] = useState<number>(0);
  const [currentCompany, setCurrentCompany] = useState<string>(null);

  return (
    <GlobalStateContext.Provider
      value={{
        stockData,
        setStockData,
        currentPrice,
        setCurrentPrice,
        shouldShowForm,
        setShouldShowForm,
        nextId,
        setNextId,
        currentCompany,
        setCurrentCompany,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
