import axios from 'axios';
import qs from 'qs';

import * as types from './types';
import * as constants from '../constants';
import { udemyConfig } from '../udemy/udemy_config';

const buildCoursesUrl = (subcategory, page) => {
  const queryParams = {
      page,
      page_size: 20,
      subcategory,
      ordering: 'most_reviewed'
  };
  const query = qs.stringify(queryParams);
  return `${constants.UDEMY_API_ROOT_URL}${query}`;
};

export const fetchCourses = (subcategory, page) => async dispatch => {
  // Fetch a page of 20 courses from Udemy API and add them to Redux state
  dispatch({
    type: types.FETCH_COURSES_ATTEMPTED
  });

  try {
    const url = buildCoursesUrl(subcategory, page);

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
