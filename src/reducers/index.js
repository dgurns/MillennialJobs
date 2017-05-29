import { combineReducers } from 'redux';
import device from './device_reducer';
import interests from './interests_reducer';
import currentUser from './currentUser_reducer';
import data from './data_reducer';

export default combineReducers({
  device, interests, currentUser, data
});
