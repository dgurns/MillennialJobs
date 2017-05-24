import { INTEREST_SELECTED } from '../actions/types';

const INITIAL_STATE = {
  interestName: '',
  token: '',
  userId: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INTEREST_SELECTED:
      return {
        ...state,
        interestName: action.payload
      };
    default:
      return state;
  }
}
