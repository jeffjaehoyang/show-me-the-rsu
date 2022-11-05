import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Triangle } from 'react-loader-spinner';
import { GlobalStateContext } from 'src/providers/GlobalStateProvider';

import { formButtonStyle, formErrorTextStyle, formInputStyle, formLabelStyle } from '@/css/styles';
import { Grant, GrantSchedule, GrantType } from '@/lib/types';

const RSUForm = () => {
  const { stockData, setStockData, setShouldShowForm } =
    useContext(GlobalStateContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Grant>();
  const onSubmit: SubmitHandler<Grant> = (data, e) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShouldShowForm(false);
      if (stockData === null) {
        setStockData([data]);
      } else {
        setStockData([...stockData, data]);
      }
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
              <option>{GrantSchedule.MONTHLY}</option>
              <option>{GrantSchedule.QUARTERLY}</option>
              <option>{GrantSchedule.SEMI_ANNUAL}</option>
              <option>{GrantSchedule.ANNUAL}</option>
            </select>
          </label>
          <label className="block">
            <span className={formLabelStyle}>
              When was (or is) your first RSU vest date?
            </span>
            <input
              type="date"
              className={formInputStyle}
              {...register('startDate')}
            />
          </label>
          <label className="block">
            <span className={formLabelStyle}>Stock Vest Duration (yrs)</span>
            <input
              type="number"
              className={formInputStyle}
              {...register('grantDuration')}
            />
          </label>
          <button
            className={formButtonStyle}
            style={{ minHeight: 45, maxHeight: 45 }}
            type="submit"
          >
            {isLoading ? (
              <Triangle height="25" width="25" color="white" />
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
