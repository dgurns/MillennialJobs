import { Dimensions } from 'react-native';
import { DEVICE_DIMENSIONS_SET } from './types';

export const setDeviceDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return {
    type: DEVICE_DIMENSIONS_SET,
    payload: { screenWidth, screenHeight }
  };
};
