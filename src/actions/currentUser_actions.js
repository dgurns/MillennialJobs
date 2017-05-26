import { Alert } from 'react-native';
import * as firebase from 'firebase';
import * as types from './types';
import * as helpers from '../helpers';

export const selectInterest = (interest) => {
  return { type: types.INTEREST_SELECTED, payload: interest };
};

export const signUpUser = ({
  username, password, profilePhotoUri, interestName
}) => async dispatch => {
  const email = `${username}@yourowndomain.com`;
  const {
    SIGN_UP_ATTEMPTED,
    SIGN_UP_SUCCESSFUL,
    SIGN_UP_FAILED,
    PHOTO_UPLOAD_ATTEMPTED,
    PHOTO_UPLOAD_SUCCESSFUL,
    PHOTO_UPLOAD_FAILED
  } = types;

  dispatch({
    type: SIGN_UP_ATTEMPTED
  });

  // Sign up the user via Firebase auth
  let signedUpUser = await firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
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

    dispatch({
      type: SIGN_UP_FAILED
    });
    return;
  });

  // Then save the user meta info to Firebase database
  const uid = signedUpUser.uid;

  await firebase.database().ref(`users/${uid}`).set({
    interestName,
    profilePhotoUrl: ''
  }).catch(() => {
    firebase.auth().currentUser.delete().then(() => {
      Alert.alert(
        'Oops',
        'There was an issue with your internet connection. Please sign up again.'
      );
    });
    dispatch({
      type: SIGN_UP_FAILED
    });
  });

  // Upload profile image and then save the download URL to Firebase database
  dispatch({
    type: PHOTO_UPLOAD_ATTEMPTED
  });
  try {
    let photoDownloadUrl = await helpers.uploadImage(profilePhotoUri, uid);
    await firebase.database().ref(`users/${uid}`).update({
      profilePhotoUrl: photoDownloadUrl
    });
    dispatch({
      type: PHOTO_UPLOAD_SUCCESSFUL
    });
  } catch (error) {
    dispatch({
      type: PHOTO_UPLOAD_FAILED
    });
  }

  dispatch({
    type: SIGN_UP_SUCCESSFUL
  });
};

export const logInUser = ({ username, password }) => async dispatch => {
  const email = `${username}@yourowndomain.com`;
  const { LOG_IN_ATTEMPTED, LOG_IN_SUCCESSFUL, LOG_IN_FAILED } = types;

  dispatch({
    type: LOG_IN_ATTEMPTED
  });

  await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
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

    dispatch({
      type: LOG_IN_FAILED
    });
  });

  // Log in was successful
  dispatch({
    type: LOG_IN_SUCCESSFUL
  });
};

export const refreshUserState = () => async dispatch => {
  const userState = {
    uid: '',
    profilePhotoUrl: '',
    interestName: ''
  };

  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    const uid = currentUser.uid;
    userState.uid = uid;

    const databaseRef = firebase.database().ref(`users/${uid}`);
    await databaseRef.once('value').then(snapshot => {
      const profilePhotoUrl = snapshot.val().profilePhotoUrl;
      const interestName = snapshot.val().interestName;
      userState.profilePhotoUrl = profilePhotoUrl;
      userState.interestName = interestName;
    });

    dispatch({
      type: types.USER_STATE_REFRESHED,
      payload: userState
    });
  } else {
    dispatch({
      type: types.USER_STATE_REFRESHED,
      payload: userState
    });
  }
};
