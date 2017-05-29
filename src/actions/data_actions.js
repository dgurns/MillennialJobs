import { Alert } from 'react-native';
import * as firebase from 'firebase';
import * as types from './types';
import * as helpers from '../helpers';

export const refreshDataState = (filterType) => {
  if (filterType === 'udemy_subcategories') {
    // Pull Udemy subcategories and save them to Redux state
  } else if (filterType === 'posts') {
    // Pull posts from Firebase and save them to Redux state
  }
};
