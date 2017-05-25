import * as types from '../actions/types';

const INITIAL_STATE = {
  interestName: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INTEREST_SELECTED:
      return {
        ...state,
        interestName: action.payload
      };
    default:
      return state;
  }
}
