import { Grant, GrantSchedule, GrantType } from '@/lib/types';

export const mockData: Grant = {
  grantType: GrantType.INITIAL_GRANT,
  strikePrice: 198,
  grantSchedule: GrantSchedule.QUARTERLY,
  companyTicker: 'META',
  companyName: 'Meta Platforms',
  numUnits: 840,
  startDate: '2022-6-27',
  grantDuration: 4,
};
