import { DEVICE_DIMENSIONS_SET } from '../actions/types';

const INITIAL_STATE = {
  screenWidth: 0,
  screenHeight: 0
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DEVICE_DIMENSIONS_SET:
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
        screenHeight: action.payload.screenHeight
      };
    default:
      return state;
  }
}
