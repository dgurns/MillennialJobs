import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const uploadImage = (imageUri, uid, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    let uploadBlob = null;
    const storageRef = firebase.storage().ref();
    const databaseRef = firebase.database().ref(`users/${uid}`);
    const imageStorageRef = storageRef.child(`profilePhotos/${uid}/profilePhoto.jpg`);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageStorageRef.put(blob, { contentType: mime });
      })
      .then(async () => {
        uploadBlob.close();
        let downloadUrl = await imageStorageRef.getDownloadURL();

        databaseRef.update({
          profilePhotoUrl: downloadUrl
        });

        return downloadUrl;
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const checkIfOnboarded = async (uid) => {
  return new Promise((resolve, reject) => {
    const databaseRef = firebase.database().ref(`users/${uid}`);

    databaseRef.once('value').then(snapshot => {
      const hasOnboarded = snapshot.val().hasOnboarded;
      resolve(hasOnboarded);
    }).catch(error => {
      reject(error);
    });
  });
};
