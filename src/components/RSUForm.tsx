import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';

import { Grant, GrantSchedule, GrantType } from '@/lib/types';

export const formLabelStyle = 'block text-sm font-medium';
export const formInputStyle =
  'block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-slate-500 focus:ring focus:ring-slate-200 focus:ring-opacity-50';
export const formButtonStyle =
  'block flex items-center justify-center w-full p-3 mt-2 text-white bg-slate-800 rounded-md focus:ring-indigo-200 focus:ring-opacity-50';
export const formErrorTextStyle = 'text-xs text-red-500';

const RSUForm = () => {
  const {
    stockData,
    setStockData,
    nextId,
    setNextId,
    currentCompany,
    setCurrentCompany,
  } = useContext(GlobalStateContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Grant>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Grant> = (data, _) => {
    setIsLoading(true);
    data.id = nextId;
    setNextId((data.id += 1));
    setCurrentCompany(data.companyTicker);
    if (stockData === null) {
      setStockData([data]);
    } else {
      setStockData([...stockData, data]);
    }
    router.push({
      pathname: '/detail',
      query: {
        companyTicker: data.companyTicker,
      },
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-lg mx-auto mt-8">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className={formLabelStyle}>Company Ticker</span>
            <input
              type="text"
              className={formInputStyle}
              {...register('companyTicker', {
                required: 'Company ticker is required',
              })}
              placeholder={'AAPL'}
              defaultValue={currentCompany ?? null}
            />
            {errors.companyTicker && (
              <span className={formErrorTextStyle}>
                {errors.companyTicker.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className={formLabelStyle}>Strike Price</span>
            <input
              type="number"
              className={formInputStyle}
              {...register('strikePrice', {
                required: 'Strike price is required',
              })}
            />
            {errors.strikePrice && (
              <span className={formErrorTextStyle}>
                {errors.strikePrice.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className={formLabelStyle}>Number of Units Awarded</span>
            <input
              type="number"
              className={formInputStyle}
              {...register('numUnits', {
                required: 'Number of units awarded is required',
              })}
            />
            {errors.numUnits && (
              <span className={formErrorTextStyle}>
                {errors.numUnits.message}
              </span>
            )}
          </label>
          <label className="block">
            <span className={formLabelStyle}>Grant Type</span>
            <select className={formInputStyle} {...register('grantType')}>
              <option>{GrantType.INITIAL_GRANT}</option>
              <option>{GrantType.REFRESHER}</option>
              <option>{GrantType.ADDITIONAL_EQUITY}</option>
            </select>
          </label>
          <label className="block">
            <span className={formLabelStyle}>Grant Schedule</span>
            <select className={formInputStyle} {...register('grantSchedule')}>
              <option>{GrantSchedule.QUARTERLY}</option>
            </select>
          </label>
          <label className="block">
            <span className={formLabelStyle}>
              When was (or is) your first RSU vest date?
            </span>
            <input
              type="date"
              className={formInputStyle}
              {...register('startDate', { required: 'Start date is required' })}
            />
            {errors.startDate && (
              <span className={formErrorTextStyle}>
                {errors.startDate.message}
              </span>
            )}
          </label>
          {/* <label className="block">
            <span className={formLabelStyle}>Stock Vest Duration (yrs)</span>
            <input
              type="number"
              className={formInputStyle}
              {...register('grantDuration')}
            />
          </label> */}
          <button
            className={formButtonStyle}
            style={{ minHeight: 45, maxHeight: 45 }}
            type="submit"
          >
            {isLoading ? (
              <ThreeDots
                height="25"
                width="25"
                radius="7"
                ariaLabel="three-dots-loading"
                color="white"
              />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RSUForm;
