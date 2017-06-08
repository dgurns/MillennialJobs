import axios from 'axios';
import qs from 'qs';

import { udemyConfig } from '../udemy/udemy_config';
import * as constants from '../constants';

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

export const createAffiliateUrl = (url) => {
  const affiliateRootUrl = constants.AFFILIATE_ROOT_URL;
  const processedUrl = url.replace(new RegExp('/', 'g'), '%2F').replace(new RegExp(':', 'g'), '%3A');
  const finalUrl = affiliateRootUrl + processedUrl;

  return finalUrl;
};
