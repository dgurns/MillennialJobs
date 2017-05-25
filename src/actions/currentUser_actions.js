import { Alert } from 'react-native';
import * as firebase from 'firebase';
import * as types from './types';

export const selectInterest = (interest) => {
  return { type: types.INTEREST_SELECTED, payload: interest };
};

export const signUpUser = ({ username, password, profilePhotoUri }) => async () => {
  const email = `${username}@yourowndomain.com`;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
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
  });

  // Need to also save the profile picture on Firebase,
  // and associate the chosen interest with the new user.
};

export const logInUser = ({ username, password }) => async () => {
  const email = `${username}@yourowndomain.com`;

  firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    let errorMessage = 'Please check your info and try again.';
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Error with the username. Did you use a weird symbol?';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'Can\'t find that user. Maybe you need to sign up?';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Wrong password. Please try a different one.';
    }
    Alert.alert(
      'Oops',
      errorMessage
    );
  });
};
