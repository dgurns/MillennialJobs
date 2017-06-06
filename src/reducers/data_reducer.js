import * as types from '../actions/types';
import {
  primarySubcategories,
  secondarySubcategories
} from './subcategories_list';

const INITIAL_STATE = {
  primarySubcategories,
  secondarySubcategories,
  courses: [],
  coursesLoading: false,
  courseDetails: [],
  feedItems: [],
  feedItemsLoading: false,
  millennialsSaved: 0
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_COURSES_ATTEMPTED:
      return {
        ...state,
        coursesLoading: true
      };
    case types.FETCH_COURSES_SUCCESSFUL:
      return {
        ...state,
        courses: state.courses.concat(action.payload),
        coursesLoading: false
      };
    case types.FETCH_COURSES_FAILED:
      return {
        ...state,
        coursesLoading: false
      };
    case types.COURSES_CLEARED:
      return {
        ...state,
        courses: []
      };
    case types.FETCH_FEED_ATTEMPTED:
      return {
        ...state,
        feedItemsLoading: true
      };
    case types.FETCH_FEED_FAILED:
      return {
        ...state,
        feedItemsLoading: false
      };
    case types.FETCH_FEED_SUCCESSFUL:
      return {
        ...state,
        feedItemsLoading: false,
        feedItems: action.payload
      };
    case types.MILLENNIALS_SAVED_FETCHED:
      return {
        ...state,
        millennialsSaved: action.payload
      };
    default:
      return state;
  }
}
