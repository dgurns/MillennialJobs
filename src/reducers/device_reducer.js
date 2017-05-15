import { SET_DEVICE_DIMENSIONS } from '../actions/types';

const INITIAL_STATE = {
  screenWidth: 0,
  screenHeight: 0
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DEVICE_DIMENSIONS:
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
        screenHeight: action.payload.screenHeight
      };
    default:
      return state;
  }
}
