import * as types from '../actions/types';
import { primarySubcategories, secondarySubcategories } from './subcategories_list';

const INITIAL_STATE = {
  primarySubcategories,
  secondarySubcategories,
  courses: [],
  coursesLoading: false
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
    default:
      return state;
  }
}
