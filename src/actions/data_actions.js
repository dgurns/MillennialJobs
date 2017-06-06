import _ from 'lodash';
import axios from 'axios';
import * as firebase from 'firebase';

import * as types from './types';
import * as helpers from '../helpers';
import { udemyConfig } from '../udemy/udemy_config';

export const fetchCourses = (subcategory, page) => async dispatch => {
  // Fetch a page of 20 courses from Udemy API and add them to Redux state
  dispatch({
    type: types.FETCH_COURSES_ATTEMPTED
  });

  try {
    const url = helpers.buildCoursesInSubcategoryQueryUrl(subcategory, page);

    let resultsObject = await axios({
      method: 'get',
      url,
      auth: {
        username: udemyConfig.clientId,
        password: udemyConfig.clientSecret
      }
    });

    const resultsArray = resultsObject.data.results;

    dispatch({
      type: types.FETCH_COURSES_SUCCESSFUL,
      payload: resultsArray
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: types.FETCH_COURSES_FAILED
    });
  }
};

export const clearCourses = () => {
  return {
    type: types.COURSES_CLEARED
  };
};

export const fetchFeed = () => async dispatch => {
  dispatch({
    type: types.FETCH_FEED_ATTEMPTED
  });

  try {
    // Fetch posts
    const postsArray = [];
    const postsDatabaseRef = firebase.database().ref('posts').limitToLast(20);
    await postsDatabaseRef.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        postsArray.splice(0, 0, childSnapshot.val());
      });
    });

    // Fetch isGoods since the oldest post timestamp
    const isGoodArray = [];
    const oldestTimestamp = postsArray[postsArray.length - 1].timestamp;

    const isGoodDatabaseRef = firebase.database().ref('isGood');
    const isGoodQuery = isGoodDatabaseRef.orderByChild('mostRecentTimestamp')
      .startAt(oldestTimestamp);

    await isGoodQuery.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const isGoodObject = childSnapshot.val();
        isGoodObject.userId = childSnapshot.key;
        if (isGoodObject.timesToggled === 1) {
          isGoodArray.splice(0, 0, isGoodObject);
        }
      });
    });

    // Merge them into one array in descending order of timestamps
    let combinedArray = postsArray;
    if (isGoodArray.length > 0) {
      combinedArray = postsArray.concat(isGoodArray);
    }
    const timestampArray = [];
    combinedArray.map(object => {
      return timestampArray.push(object.timestamp || object.mostRecentTimestamp);
    });
    timestampArray.sort((a, b) => (b - a));

    const findIndex = (index) => {
      const postIndex = _.findIndex(combinedArray, { timestamp: index });
      const isGoodIndex = _.findIndex(combinedArray, { mostRecentTimestamp: index });
      if (postIndex !== -1) {
        return postIndex;
      } else if (isGoodIndex !== -1) {
        return isGoodIndex;
      }
    };

    const finalArray = [];
    timestampArray.map(object => {
      const index = findIndex(object);
      return finalArray.push(combinedArray[index]);
    });

    dispatch({
      type: types.FETCH_FEED_SUCCESSFUL,
      payload: finalArray
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_FEED_FAILED
    });
  }
};

export const fetchMillennialsSaved = () => async dispatch => {
  // Get the current number of millennials saved and update Redux state
  const isGoodDatabaseRef = firebase.database().ref('isGood');
  const isGoodQuery = isGoodDatabaseRef.orderByChild('isGood').equalTo(true);

  await isGoodQuery.once('value').then(snapshot => {
    let millennialsSaved = 0;

    snapshot.forEach(() => {
      millennialsSaved += 1;
    });

    dispatch({
      type: types.MILLENNIALS_SAVED_FETCHED,
      payload: millennialsSaved
    });
  });
};
