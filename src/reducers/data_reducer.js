import * as types from '../actions/types';

const INITIAL_STATE = {
  subcategories: [],
  posts: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UDEMY_SUBCATEGORIES_REFRESHED:
      return {
        ...state,
        subcategories: action.payload
      };
    default:
      return state;
  }
}
