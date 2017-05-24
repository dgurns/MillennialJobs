import { INTEREST_SELECTED } from './types';

export const selectInterest = (interest) => {
  return { type: INTEREST_SELECTED, payload: interest };
};
