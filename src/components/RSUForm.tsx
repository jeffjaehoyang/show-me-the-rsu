import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StockDataContext } from 'src/providers/StockDataProvider';

import { Grant, GrantSchedule, GrantType } from '@/lib/types';

const labelStyle = 'block text-sm font-medium text-gray-700';
const inputStyle =
  'block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';
const buttonStyle =
  'block w-full p-3 mt-2 text-gray-700 bg-indigo-100 rounded-md focus:ring-indigo-200 focus:ring-opacity-50';

const RSUForm = () => {
  const { stockData, setStockData } = useContext(StockDataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Grant>();
  const onSubmit: SubmitHandler<Grant> = (data, e) => {
    setStockData(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-lg mx-auto mt-8">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className={labelStyle}>Company Ticker</span>
            <input
              type="text"
              className={inputStyle}
              {...register('companyTicker')}
            />
          </label>
          <label className="block">
            <span className={labelStyle}>Strike Price</span>
            <input
              type="number"
              className={inputStyle}
              {...register('strikePrice')}
            />
          </label>
          <label className="block">
            <span className={labelStyle}>Number of Units Awarded</span>
            <input
              type="number"
              className={inputStyle}
              {...register('numUnits')}
            />
          </label>
          <label className="block">
            <span className={labelStyle}>Grant Type</span>
            <select className={inputStyle} {...register('grantType')}>
              <option>{GrantType.INITIAL_GRANT}</option>
              <option>{GrantType.REFRESHER}</option>
              <option>{GrantType.ADDITIONAL_EQUITY}</option>
            </select>
          </label>
          <label className="block">
            <span className={labelStyle}>Grant Schedule</span>
            <select className={inputStyle} {...register('grantSchedule')}>
              <option>{GrantSchedule.MONTHLY}</option>
              <option>{GrantSchedule.QUARTERLY}</option>
              <option>{GrantSchedule.SEMI_ANNUAL}</option>
              <option>{GrantSchedule.ANNUAL}</option>
            </select>
          </label>
          <label className="block">
            <span className={labelStyle}>
              When was (or is) your first RSU vest date?
            </span>
            <input
              type="date"
              className={inputStyle}
              {...register('startDate')}
            />
          </label>
          <label className="block">
            <span className={labelStyle}>Stock Vest Duration (yrs)</span>
            <input
              type="number"
              className={inputStyle}
              {...register('grantDuration')}
            />
          </label>
          <input className={buttonStyle} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default RSUForm;
