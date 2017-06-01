import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';
import axios from 'axios';
import qs from 'qs';

import { udemyConfig } from '../udemy/udemy_config';
import * as constants from '../constants';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

// User-related helper functions

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

// Udemy-related helper functions

export const buildCoursesInSubcategoryQueryUrl = (subcategory, page) => {
  const queryParams = {
      page,
      page_size: 20,
      subcategory,
      ordering: 'most_reviewed'
  };
  const query = qs.stringify(queryParams);
  return `${constants.UDEMY_API_ROOT_URL}/?${query}`;
};

export const buildCourseDetailsQueryUrl = (courseId) => {
  return (
    `${constants.UDEMY_API_ROOT_URL}/${courseId}?fields[course]=title,headline,avg_rating,image_50x50,url`
  );
};

export const buildSearchQueryUrl = (searchTerm) => {
  const queryParams = {
      search: searchTerm,
      page: 1,
      pageSize: 20,
      ordering: 'relevance'
  };
  const query = qs.stringify(queryParams);
  return `${constants.UDEMY_API_ROOT_URL}/?${query}`;
};

export const fetchCourseDetails = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = buildCourseDetailsQueryUrl(courseId);

      let resultsObject = await axios({
        method: 'get',
        url,
        auth: {
          username: udemyConfig.clientId,
          password: udemyConfig.clientSecret
        }
      });
      const results = resultsObject.data;

      resolve(results);
    } catch (error) {
      console.log(error.response);
      reject(error);
    }
  });
};

export const searchForCourses = (searchTerm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = buildSearchQueryUrl(searchTerm);

      let resultsObject = await axios({
        method: 'get',
        url,
        auth: {
          username: udemyConfig.clientId,
          password: udemyConfig.clientSecret
        }
      });
      const results = resultsObject.data;

      resolve(results);
    } catch (error) {
      console.log(error.response);
      reject(error);
    }
  });
};
