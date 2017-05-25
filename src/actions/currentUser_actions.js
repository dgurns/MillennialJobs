import { Alert, Platform } from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import * as types from './types';

export const selectInterest = (interest) => {
  return { type: types.INTEREST_SELECTED, payload: interest };
};

export const signUpUser = ({
  username, password, profilePhotoUri, interestName
}) => async dispatch => {
  const email = `${username}@yourowndomain.com`;
  const { SIGN_UP_ATTEMPTED, SIGN_UP_SUCCESSFUL, SIGN_UP_FAILED } = types;

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
    interestName
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

  console.log(`uid: ${uid}`);

  // And start uploading the profile photo to Firebase storage
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  const uploadImage = (inputUri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? inputUri.replace('file://', '') : inputUri;
      let uploadBlob = null;
      const storageRef = firebase.storage().ref();
      const imageStorageRef = storageRef.child(`profilePhotos/${uid}/profilePhoto.jpg`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageStorageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageStorageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  uploadImage(profilePhotoUri)
    .then((url) => console.log(url))
    .catch((error) => console.log(error));

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
