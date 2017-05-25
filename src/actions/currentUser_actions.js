import { Alert } from 'react-native';
import * as firebase from 'firebase';
import * as types from './types';

export const selectInterest = (interest) => {
  return { type: types.INTEREST_SELECTED, payload: interest };
};

export const signUpUser = ({ username, password, profilePhotoUri }) => async dispatch => {
  const email = `${username}@yourowndomain.com`;

  try {
    firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    let errorMessage = 'Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This username is already taken. Please choose a different one.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'This password is too weak. Please make it more complicated.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Something is wrong with your email. Did you use some weird symbols?';
    }
    Alert.alert(
      'Oops',
      errorMessage
    );
  }
};
