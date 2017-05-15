import { Dimensions } from 'react-native';
import { SET_DEVICE_DIMENSIONS } from './types';

export const setDeviceDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return { type: SET_DEVICE_DIMENSIONS, payload: { screenWidth, screenHeight } };
};
