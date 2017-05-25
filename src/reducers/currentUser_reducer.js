import * as types from '../actions/types';

const INITIAL_STATE = {
  interestName: '',
  authLoading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INTEREST_SELECTED:
      return {
        ...state,
        interestName: action.payload
      };
    case types.SIGN_UP_ATTEMPTED:
      return {
        ...state,
        authLoading: true
      };
    case types.SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        authLoading: false
      };
    case types.SIGN_UP_FAILED:
      return {
        ...state,
        authLoading: false
      };
    case types.LOG_IN_ATTEMPTED:
      return {
        ...state,
        authLoading: true
      };
    case types.LOG_IN_SUCCESSFUL:
      return {
        ...state,
        authLoading: false
      };
    case types.LOG_IN_FAILED:
      return {
        ...state,
        authLoading: false
      };
    default:
      return state;
  }
}
