import { combineReducers } from 'redux';
import device from './device_reducer';
import interests from './interests_reducer';

export default combineReducers({
  device, interests
});
